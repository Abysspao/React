import React, { useState } from "react";
import './App.css';
import MiLista from './milista';
import Header from './header/header';
import Footer from './footer/footer';
import Form from './Forms';
import Fondo from './Imagenes/fondo.jpg';

function App() {
  const [incidencias, setIncidencia] = useState([
    {
      id_incidencia: 1,
      id_usuario: 'e768590345h',
      titulo: 'Proyector averiado en aula 2',
      descripcion: 'El proyector no enciende y la lámpara parece dañada.',
      categoria: 'Hardware',
      nivel_urgencia: 'Alta',
      fecha_registro: '2025-10-03',
      estado: 'Abierta',
      ubicacion: 'A301'
    },
    {
      id_incidencia: 2,
      id_usuario: 'e235439802s',
      titulo: 'Ordenador de secretaría no enciende',
      descripcion: 'El equipo no responde al presionar el botón de encendido.',
      categoria: 'Hardware',
      nivel_urgencia: 'Media',
      fecha_registro: '2025-10-02',
      estado: 'En proceso',
      ubicacion: 'B205'
    }
  ]);

  const agregarIncidencia = (nuevo_usuario, nuevo_titulo, nuevo_descripcion, nuevo_categoria, nuevo_nivel_urgencia, nuevo_ubicacion) => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day}`;

    const nueva_incidencia = {
      id_incidencia: incidencias.length + 1,
      id_usuario: nuevo_usuario,
      titulo: nuevo_titulo,
      descripcion: nuevo_descripcion,
      categoria: nuevo_categoria,
      nivel_urgencia: nuevo_nivel_urgencia,
      fecha_registro: fechaFormateada,
      estado: 'Abierta',
      ubicacion: nuevo_ubicacion
    };

    setIncidencia([...incidencias, nueva_incidencia]);
    console.log('Datos recibidos: ', nueva_incidencia);
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
