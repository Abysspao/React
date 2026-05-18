import React, { useState, useEffect } from "react";
import './App.css';
import MiLista from './milista';
import Header from './header/header';
import Footer from './footer/footer';
import Form from './Forms';
import Fondo from './Imagenes/fondo.jpg';
import Login from './Login';
import { jwtDecode } from "jwt-decode";

function App() {
  const INCIDENCIA_API_URL = 'http://localhost:3210/incidencias';
  const USUARIO_API_URL = 'http://localhost:3210/users';

  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencia] = useState([]);

  useEffect(() => {
    const obtenerIncidencias = async () => {
      try {
        let response = await fetch(INCIDENCIA_API_URL);
        if (!response.ok) throw new Error("HTTP Error");
        const data = await response.json();
        console.log(data);
        setIncidencia(data);
      } catch (e) {
        console.error("Error al cargar las incidencias:", e);
      }
    };

    const obtenerUsuarios = async () => {
      try {
        let response = await fetch(USUARIO_API_URL);
        if (!response.ok) throw new Error("HTTP Error");
        const data = await response.json();
        console.log(data);
        setUsuarios(data);
      } catch (e) {
        console.error("Error al cargar los usuarios:", e);
      }
    };

    obtenerIncidencias();
    obtenerUsuarios();
  }, []);

  // PERSISTENCIA : cuando se carga la app se comprueba si hay token para si hay decodificarlo e iniciar sesion con el email
  useEffect(() => {
    const obtenerUsuarioLogueado = () => {
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) {
        const decodedUser = jwtDecode(savedToken);
        console.log(decodedUser);
        if (decodedUser) {
          const user = usuarios.find((u) => u.email === decodedUser.email);
          user ? setUsuarioLogueado(user) : setUsuarioLogueado(null);
        }
      }
    };
    obtenerUsuarioLogueado();
  }, [usuarios]);
  //////////////////////////////////////////////////////////////////////////

  // PERSISTENCIA : Cuando se inicia sesion el server devuelve el token y los datos guardando solo el token por seguridad
  const onLogin = (userData) => {
    localStorage.setItem("authToken", JSON.stringify(userData["accessToken"]));
    setUsuarioLogueado(userData.user);
  };
  //////////////////////////////////////////////////////////////////////////

  const agregarIncidencia = async (nuevo_usuario, nuevo_titulo, nuevo_descripcion, nuevo_categoria, nuevo_nivel_urgencia, nuevo_ubicacion) => {
    try {
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      const day = String(new Date().getDate()).padStart(2, '0');
      const fecha_formateada = year + '-' + month + '-' + day;

      let usuarioEncontrado = usuarios.find((u) => u.email === nuevo_usuario);

      if (usuarioEncontrado) {
        const nueva_incidencia = {
          usuarioId: usuarioEncontrado,
          titulo: nuevo_titulo,
          descripcion: nuevo_descripcion,
          categoria: nuevo_categoria,
          nivel_urgencia: nuevo_nivel_urgencia,
          fecha_registro: fecha_formateada,
          ubicacion: nuevo_ubicacion,
          estado: 'Abierta',
          comentarios: []
        };

        let response = await fetch(INCIDENCIA_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nueva_incidencia)
        });

        if (!response.ok) throw new Error(`Fallo la petición POST. Estado HTTP: ${response.status}`);

        let data = await response.json();
        console.log("nueva incidencia", data);
        setIncidencia([...incidencias, data]);
      } else {
        alert("No se puede crear incidencia. (Usuario no encontrado)");
        throw new Error("Error al crear incidencia. Usuario no encontrado");
      }
    } catch (e) {
      console.error("Fallo la petición POST de la incidencia", e.message);
    }
  };

  if (!usuarioLogueado) {
    return <Login onLoginExitoso={onLogin} />;
  }

  return (
    <div style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", minHeight: "100vh" }}>
      <Header />
      <div className="d-flex justify-content-end pe-4 pt-2">
        <span style={{ color: "#f0f0f0" }} className="me-3">
          👤 {usuarioLogueado.email}
        </span>

        {/* PERSISTENCIA : Al cerrar sesion se borra el token para que no se guarde el user */}
        <button
          className="btn btn-sm"
          style={{ backgroundColor: "#ee9a13ff", color: "#fff" }}
          onClick={() => {
            localStorage.removeItem('authToken');
            setUsuarioLogueado(null);
          }}
        >
          Cerrar sesión
        </button>
        {/*////////////////////////////////////////////////////////////////////////// */}

      </div>
      <h2 className="mb-4 text-center" style={{ color: "#f0f0f0" }}>Mi aplicación</h2>
      <div className="container-fluid mt-4 row">
        <main className="col-md-6">
          <MiLista incidencias={incidencias} />
        </main>
        <aside className="col-md-6">
          <Form agregarIncidencia={agregarIncidencia} />
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export default App;