import React from "react";
import Logo from '../Imagenes/Ies1Logo.png';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="p-3" style={{ backgroundColor: "#d9b3ff" }}>
        <div className="text-center">
          <img src={Logo} alt="Descripción de la imagen" width="100px"/>
          <h3 style={{ color: "#bfe9ff" }}>
            Bienvenido a la página de incidencias
          </h3>
        </div>
      </div>
    );
  }
}

export default Header;