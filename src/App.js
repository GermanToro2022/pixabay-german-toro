import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  paginaAnterior = () => {
    // leer el state de la pagina actual
    let pagina = this.state.pagina;

    // si la pagina es 1 no volver hacia atras
    if(pagina === 1) return null;

    // restar uno a la pagina actual 
    pagina -= 1;
  
    // agregar el cambio al state
    this.setState({
      pagina
    }, () => {
    this.consultarApi();
    });
  
    // console.log(pagina);
  }

  paginaSiguiente = () => {
  // leer el state de la pagina actual
  let pagina = this.state.pagina;

  // sumar uno a la pagina actual 
  pagina += 1;

  // agregar el cambio al state
  this.setState({
    pagina
  }, () => {
    this.consultarApi()
  });

  // console.log(pagina);
  }



  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=32979334-60b1f78c3c6e743863dd2275d&q=${termino}&
    page=${pagina}`;

    console.log(url)

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))
    

  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }



  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>

          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className='row justify-content-center'>
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}




export default App;
