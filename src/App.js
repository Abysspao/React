import React from "react";
import './App.css';
import MiLista from './milista';
import Header from './header/header';
import Footer from './footer/footer';

function App() {
  return (
    <>
      <Header/>
      <h2>Mi app</h2>
      <div id="parrafo">
        <p>Bienvenido a mi app</p>
      </div>
      <MiLista/>
      <Footer/>
    </>
  );
}

export default App;
