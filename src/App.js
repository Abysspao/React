import React from "react";
import './App.css';
import MiLista from './milista';
import Header from './header/header';
import Footer from './footer/footer';

function App() {
  return (
    <div>
      <Header />

      <h1>Hola mundo</h1>
      <h2>Este es mi primer componente React</h2>
      <div className="parrafo">
        <p>Bienvenido a mi aplicación, esto fue creado con Javascript en React</p>
      </div>

      <br />

      <MiLista
        titulo="Profesores"
        nombre1="Claudia"
        nombre2="Severino"
        nombre3="Lourdes"
      />

      <br />

      <MiLista
        titulo="Amigos"
        nombre1="Romina"
        nombre2="Deva"
        nombre3="Roberto"
        nombre4="Christian"
      />

      <br />

      <MiLista
        titulo="Familiares"
        nombre1="Ana"
      />

      <Footer />
    </div>
  );
}

export default App;
