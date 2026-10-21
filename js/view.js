export const View = {
  inputElem: document.getElementById('input-buscador'),
  sugerenciasElem: document.getElementById('lista-sugerencias'),
  containerElem: document.getElementById('soneto-container'),
  btnLimpiarElem: document.getElementById('btn-limpiar'), // Capturamos el botón X

  bindInputBusqueda(handler) {
    // Al escribir, mostramos u ocultamos la X
    this.inputElem.addEventListener('input', (e) => {
      const valor = e.target.value;
      this.toggleBotonLimpiar(valor);
      handler(valor);
    });

    // Evento al hacer clic en la X
    this.btnLimpiarElem.addEventListener('click', () => {
      this.inputElem.value = ''; // Vaciamos el input
      this.toggleBotonLimpiar(''); // Ocultamos la X
      this.inputElem.focus(); // Devolvemos el cursor para que pueda seguir escribiendo
      handler(''); // Enviamos un texto vacío al controlador para borrar las sugerencias
    });

    // Ocultar sugerencias si se hace clic fuera del buscador
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.buscador-wrapper')) {
        this.sugerenciasElem.classList.add('oculto');
      }
    });
  },

  // Método auxiliar para mostrar/ocultar el botón
  toggleBotonLimpiar(valor) {
    if (valor.length > 0) {
      this.btnLimpiarElem.classList.remove('oculto');
    } else {
      this.btnLimpiarElem.classList.add('oculto');
    }
  },

  bindSeleccionSugerencia(handler) {
    this.sugerenciasElem.addEventListener('click', (e) => {
      const item = e.target.closest('.sugerencia-item');
      if (item) {
        const idSoneto = item.dataset.id;
        const textoVisible = item.querySelector('.sugerencia-item__titulo').textContent;
        this.inputElem.value = textoVisible; 
        this.toggleBotonLimpiar(textoVisible); // Aseguramos que la X esté visible
        this.sugerenciasElem.classList.add('oculto');
        handler(idSoneto);
      }
    });
  },

  renderizarSugerencias(sugerencias) {
    if (sugerencias.length === 0) {
      this.sugerenciasElem.classList.add('oculto');
      this.sugerenciasElem.innerHTML = '';
      return;
    }

    const html = sugerencias.map(soneto => `
      <li class="sugerencia-item" data-id="${soneto.id}">
        <div class="sugerencia-item__titulo">${soneto.titulo}</div>
        <div class="sugerencia-item__autor">${soneto.autor}</div>
      </li>
    `).join('');

    this.sugerenciasElem.innerHTML = html;
    this.sugerenciasElem.classList.remove('oculto');
  },

  renderizarSoneto(soneto) {
    if (!soneto) {
      this.containerElem.innerHTML = `
        <div class="soneto-empty">
          <p>Usa el buscador para encontrar un soneto y comenzar la lectura.</p>
        </div>`;
      return;
    }

    const estrofasHTML = soneto.estrofas
      .map(estrofa => {
        const versosHTML = estrofa.join('<br>');
        return `<p class="estrofa">${versosHTML}</p>`;
      })
      .join('');

    this.containerElem.innerHTML = `
      <article class="soneto-card">
        <header class="soneto-card__header">
          <h2 class="soneto-card__titulo">${soneto.titulo}</h2>
          <p class="soneto-card__autor">por ${soneto.autor}</p>
        </header>
        <section class="soneto-card__cuerpo">
          ${estrofasHTML}
        </section>
      </article>
    `;

    const card = this.containerElem.querySelector('.soneto-card');
    if (card) {
      requestAnimationFrame(() => {
        card.classList.add('soneto-card--visible');
      });
    }
  }
};