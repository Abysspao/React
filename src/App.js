import React, { useState, useEffect } from "react";
import './App.css';
import MiLista from './milista';
import Header from './header/header';
import Footer from './footer/footer';
import Form from './Forms';
import Fondo from './Imagenes/fondo.jpg';

function App() {
  //Definir la URL de la API para las incidencias (si JSON se ejecuta en el puerto 3210)
  const INCIDENCIA_API_URL = 'http://localhost:3210/incidencias';
  //Definir la URL de la API para los usuarios (si JSON se ejecuta en el puerto 3210)
  const USUARIO_API_URL = 'http://localhost:3210/users';

  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencia] = useState([]);

  // 6. Hook para cargar las incidencias desde JSON Server
  useEffect(() => {
    const obtenerIncidencias = async () => {
      try {
        let response = await fetch(INCIDENCIA_API_URL);
        if(!response.ok){
          throw new Error("HTTP Error");
        }
        const data = await response.json();
        console.log(data);
        setIncidencia(data);
      } catch(e) {
        console.error("Error al cargar las incidencias:", e);
      }
    }

    const obtenerUsuarios = async () => {
      try {
        let response = await fetch(USUARIO_API_URL);
        if(!response.ok){
          throw new Error("HTTP Error");
        }
        const data = await response.json();
        console.log(data);
        setUsuarios(data);
      } catch(e) {
        console.error("Error al cargar los usuarios:", e);
      }
    }

    obtenerIncidencias();
    obtenerUsuarios();
  }, []); 

  const agregarIncidencia = async (nuevo_usuario, nuevo_titulo, nuevo_descripcion, nuevo_categoria, nuevo_nivel_urgencia, nuevo_ubicacion) => {
    try {
      const fecha = new Date().toISOString();
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      const day = String(new Date().getDate()).padStart(2, '0');
      const fecha_formateada = year+'-'+month+'-'+day;
      let usuarioEncontrado = usuarios.find((u) => u.email === nuevo_usuario);
      if(usuarioEncontrado) {
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
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nueva_incidencia)
        });

        if(!response.ok) {
          throw new Error(`Fallo la petición POST. Estado HTTP: ${response.status}`);
        }

        let data = await response.json();
        console.log("nueva incidencia", data);
        setIncidencia([...incidencias, data]);
      } else {
        alert("No se puede crear incidencia. (Usuario no encontrado)");
        throw new Error("Error al crear incidencia. Usuario no encontrado");
      }
    } catch(e) {
      console.error("Fallo la petición POST de la incidencia", e.message);
    }
  };
  
 
  return (
    <div style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", minHeight: "100vh" }}>
      <Header/>
      <h2 className="mb-4 text-center" style={{ color: "#f0f0f0" }}>Mi aplicación</h2>
      <div className="container-fluid mt-4 row">
        <main className="col-md-6">
          <MiLista incidencias={incidencias}/>
        </main>
        <aside className="col-md-6">
          <Form agregarIncidencia={agregarIncidencia}/>
        </aside>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
