import { sonetosBD } from './model.js';
import { View } from './view.js';

export const Controller = {
  init() {
    View.renderizarSoneto(null); // Estado vacío inicial
    View.bindInputBusqueda(this.handleBusqueda.bind(this));
    View.bindSeleccionSugerencia(this.handleSeleccionSoneto.bind(this));
  },

  handleBusqueda(termino) {
    const busqueda = termino.trim().toLowerCase();
    
    if (busqueda.length === 0) {
      View.renderizarSugerencias([]);
      return;
    }

    // Filtrar por título o autor
    const resultados = sonetosBD.filter(soneto => 
      soneto.titulo.toLowerCase().includes(busqueda) || 
      soneto.autor.toLowerCase().includes(busqueda)
    );

    View.renderizarSugerencias(resultados);
  },

  handleSeleccionSoneto(idSoneto) {
    const sonetoEncontrado = sonetosBD.find(s => s.id === idSoneto);
    View.renderizarSoneto(sonetoEncontrado);
  }
};