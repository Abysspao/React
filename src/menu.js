import { Link } from "react-router-dom";

function Menu({ usuarioLogueado, onCerrarSesion }) {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/inicio"> Inicio </Link>
      <Link to="/milista"> Lista de incidencias </Link>
      <Link to="/form"> Nueva incidencia </Link>

      {usuarioLogueado?.rol?.nombre_rol === "admin" && (
        <Link to="/usuarios"> Gestión de usuarios </Link>
      )}

      <button onClick={onCerrarSesion} style={{ marginLeft: "10px" }}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Menu;