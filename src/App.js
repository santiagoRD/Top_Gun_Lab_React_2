// import React from 'react';
// import './App.css';
// import ColorCard from "./components/ColorCard";

// const App = () => (
//   <div className="App">
//     <h1 className="color-cards__title">COLOR CARDS</h1>
//     <main className="color-cards-container">
//       <ColorCard
//         name="Blue"
//         isLight={false}
//         lightClass="color-blue--light"
//         darkClass="color-blue"
//       />
//       <ColorCard
//         name="Yellow"
//         isLight={false}
//         lightClass="color-yellow--light"
//         darkClass="color-yellow"
//       />
//       <ColorCard
//         name="Capri"
//         isLight={false}
//         lightClass="color-Capri--light"
//         darkClass="color-Capri"
//       />
//     </main>
//   </div>
// );

// export default App;

///---------------------------------------------------------------------------------

// 1. Conviente el componente App a un componente de Clase.
// Recuerda importar "Component" de react.
import React, { Component } from "react";
import ColorCard from "./components/ColorCard";
import "./App.css";
import {COLORS} from "./mocked-data/colors";

export default class App extends Component {

  state= {
    colors: COLORS
  }


  changeTone = (id) =>{
    
    this.setState(prevState => {
      const {colors} = prevState;
      let clickedColor = colors.find(color => color.id === id);
      clickedColor = {...clickedColor, isLight: !clickedColor.isLight};

      return({
        colors: colors.map(color => {
          if(color.id === id){
            return clickedColor;
          }else{
            return color;
          }
        })
      })

    })
  }

  deleteColor = (e,id) =>{
    e.stopPropagation();
    this.setState(prevState => {
      const {colors} = prevState;
      return({
        colors: colors.filter(color => color.id !== id)
      })
    })
  }


  render() {
    return (
      <div className="App">
        <h1 className="color-cards__title">COLOR CARDS</h1>
        <main className="color-cards-container">
          {this.state.colors.map(card =>(
            <ColorCard
            key={card.id}
            name={card.name}
            isLight={card.isLight}
            lightClass={card.lightClass}
            darkClass={card.darkClass}
            changeTone={() => this.changeTone(card.id)}
            deleteColor={(e) => this.deleteColor(e,card.id)}
            />
          ))}
        </main>
      </div>
    );
  }
}

// 2. Inicializa el estado del componente app. Este será un objeto con una llave "colors", que tendrá como valor un arreglo con 3 colores. el arreglo es el siguiente

// const colorArray = [
//   {
//     id: 1,
//     name: "blue",
//     isLight: false,
//     darkClass: "color-blue",
//     lightClass: "color-blue--light"
//   },
//   {
//     id: 2,
//     name: "Yellow",
//     isLight: false,
//     darkClass: "color-yellow",
//     lightClass: "color-yellow--light"
//   },
//   {
//     id: 3,
//     name: "Capri",
//     isLight: true,
//     darkClass: "color-Capri",
//     lightClass: "color-Capri--light"
//   }
// ];

// 3. Elimina los 3 componentes "ColorCard" que están quemados y utiliza map()
// para iterar sobre el arreglo de colores del estado.
// PISTA: Recuerda agregar un prop llamado "Key" a cada "ColorCard"
// para ayudarle al algoritmo de diferenciación de React a encontrar
// más fácil los elementos.

// 4. Ve al componente "ColorCard" y agrega un botón al final con la
// clase "delete-color".

// 5. Crea un método en el componente App llamado "changeTone" en el cual cambies
// el color de claro a oscuro y viceversa, cada vez que se haga click
// cobre el ColorCard
// PISTA: (para probarlo debes pasar este método como un prop
// al componente ColorCard y asignarlo a un evento "onClick" en el div
// que lo envuelve).

// 6. crea un método llamado "deleteColor" que elimine el ColorCard que se
// le haga click sobre el botón creado en el punto 4.
// PISTAS
// * Este también debe pasarse como prop.
// * ¿Recuerdas el EventBubbling? te será util detener la propagación del evento
//   usando el método stopPropagation().

// 7. importa la constante "COLORS" (Un arreglo de 15 colores) que está en
// "./mocked-data/colors". Y remplaza el estado inicial de la aplicación
// por este arreglo. 🌈 It's Magic! 🌈
