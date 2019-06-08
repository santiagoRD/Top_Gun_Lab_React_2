import React, { Component } from 'react';
import './App.css';
import ColorCard from "./components/ColorCard";
import { COLORS } from "./mocked-data/colors";
import uuid from "uuid";

class App extends Component {
  state = {
    colors: COLORS,
    filterText: "",
    nameText:"",
    lightClassText:"",
    darkClassText:"",
    isLight: false
  }

  changeTone = (id) => {
    this.setState((prevState) => {
      const oldColors = prevState.colors;
      return ({
        colors: oldColors.map(color => {
          const isSelectedColor = color.id === id;
          return (
            isSelectedColor
            ? { ...color, isLight: !color.isLight }
            : color
          );
        })
      })
    })
  }

  deleteColor = (e, id) => {
    e.stopPropagation();
    this.setState((prevState) => {
      const oldColors = prevState.colors;
      return ({
        colors: oldColors.filter(color => color.id !== id)
      })
    })
  }


  handleFilter = (e) => {
    const value = e.target.value;
    this.setState({
      filterText: value
    })
  }

  handleInputName = (e) => {
    const value = e.target.value;
    this.setState({
      nameText: value
    })
  }

  handleInputLightClass = (e) => {
    const value = e.target.value;
    this.setState({
      lightClassText: value
    })
  }

  handleInputDarkClass = (e) => {
    const value = e.target.value;
    this.setState({
      darkClassText: value
    })
  }

  handleCheckbox = (e) =>{
    const opacity = e.target.checked ? true : false;
    this.setState({
      isLight: opacity
    })
  }

  createColor = (e) =>{
    e.preventDefault();
    const newColor = {
      id: uuid(),
      name: this.state.nameText,
      isLight: this.state.isLight,
      darkClass: this.state.darkClassText,
      lightClass: this.state.lightClassText
    }

    this.setState(prevState=> {
      const oldColors = prevState.colors;
      return({
        colors: [...oldColors, newColor],
        nameText:"",
        lightClassText:"",
        darkClassText:"",
        isLight: false
      })
    })
  }


  render() {
    const { colors, filterText, nameText, lightClassText, darkClassText, isLight } = this.state;
    const filteredColors = colors.filter( color => color.name.includes(filterText))

    return (
      <div className="App">
        <h1 className="color-cards__title">COLOR CARDS</h1>
        <div className="filter-container">
          <input
            placeholder="Filter by color name"
            className="filter-field"
            type="text"
            onChange={(e) => this.handleFilter(e)}
            value={filterText}
          />
        </div>
        <main className="color-cards-container">
          {filteredColors.map(color => (
            <ColorCard
              key={color.id}
              changeColor={() => this.changeTone(color.id)}
              deleteColor={(e) => this.deleteColor(e, color.id)}
              {...color}
            />
          ))}
        </main>
        <h2 className="create-color-title">Create a color!</h2>
        <form className="create-color-form" onSubmit={this.createColor}>
          <input
            type="text"
            placeholder="name"
            value={nameText}
            onChange={(e) => this.handleInputName(e)}
          />
          <input
            type="text"
            placeholder="light class"
            onChange={(e) => this.handleInputLightClass(e)}
            value={lightClassText}
          />
          <input
            type="text"
            placeholder="dark class"
            onChange={(e) => this.handleInputDarkClass(e)}
            value={darkClassText}
          />
          <input
            name="is-light"
            type="checkbox"
            className="is-light-checkbox"
            checked={isLight}
            onChange={(e) => this.handleCheckbox(e)}
          />
          <label htmlFor="is-light">Is light</label>
          <button type="submit" className="create-color" onSubmit={this.createColor}>Create!</button>
        </form>
      </div>
    );
  }
}

export default App;

// ------------------------------------------------------------------------

// 1. Crear un nuevo key en el estado llamado "filterText" e inicializarlo con
// un string vacío. OK

// 2. Agregar un evento en el input del filtro para que detecte cuando este texto
// cambia y igualar el valor del input al valor del estado. OK

// 3. crear un método en la componente para actualizar el texto del filtro
// en el estado cuando este sea cambiado. OK

// 4. Filtrar los colores del load en el método render y actualizar el arreglo al
//  que se le hace el map de modo que se muestren sólo los colores
// filtrados y no todos.OK

// 5. Realizar el mismo procedimiento que se hizo con en los pasos 1, 2 y 3, pero
// esta vez para los campos: "nameText", "lightClassText", "darkClassText".
// que están ubicados en el formulario para crear un color.

// 6. Crear un campo adicional en el estado para el campo "isLight" que corresponde
// al checkbox del formulario para crear un color, esta vez se debe inicializar el
// valor en el estado en false.
// PISTAS:
// * El valor de este tipo de input no se obtiene en el event.target.value, sino
//   en el event.target.checked.
// * Por esto el valor del estado debe ser agregado en el JSX no como el prop value,
//   sino como el prop checked.

// 7. Por último escuchar el evento submit en el form para crear un color y crea un
// método en el cual se altere el estado creando un nuevo color en el arreglo
// de colores y poniendo el formulario de crear color de nuevo en blanco.
// PISTA:
// * Por defecto el navegador envía una petición HTTP cuando se hace submit a un
//   formulario, por esto es necesario utilizar el evento y
//   el método preventDefault() para evitar que la página se recargue.

