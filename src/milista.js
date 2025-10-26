import milista from './milista.js';
import React, {useState} from "react";
function MiLista (){
    const [incidencias, setIncidencias] = useState  ([ 
        {
            id_incidencia: 1,
            id_usuario: 'e768590345h',
            titulo: "Proyector roto",
            descripcion: "El proyectorno enciende y algunos cables paraecen dañados",
            categoria: "Hardware",
            nivel_urgencia: "Alta",
            fecha_registro: "2025-10-03",
            estado: "Abierta",
            ubicacion: "B305"
        },
        {
            id_incidencia: 2,
            id_usuario: 'e235439802s',
            titulo: "Ordenador de profesor b205",
            descripcion: "El equipo se enciende y apaga al presionar el boton.",
            categoria: "Hardware",
            nivel_urgencia: "Alta",
            fecha_registro: "2025-10-02",
            estado: "En proceso",
            ubicacion: "B205"
        },
        {
            id_incidencia: 3,
            id_usuario: 'e765849381b',
            titulo: "Impresora sin tinta",
            descripcion: "La impresora no imprime y muestra un error de falta de tinta.",
            categoria: "Red/Impresión",
            nivel_urgencia: "Baja",
            fecha_registro: "2025-10-01",
            estado: "Resuelta",
            ubicacion: "Sala de profesores"
        },
        {
            id_incidencia: 4,
            id_usuario: 'A1',
            titulo: "A1",
            descripcion: "A1",
            categoria: "A1",
            nivel_urgencia: "A1",
            fecha_registro: "A1",
            estado: "A1",
            ubicacion: "A"
        },
        {
            id_incidencia: 5,
            id_usuario: 'B',
            titulo: "B",
            descripcion: "B",
            categoria: "B",
            nivel_urgencia: "B",
            fecha_registro: "B",
            estado: "B",
            ubicacion: "B"
        },
        {
            id_incidencia: 6,
            id_usuario: 'C',
            titulo: "C",
            descripcion: "C",
            categoria: "C",
            nivel_urgencia: "C",
            fecha_registro: "C",
            estado: "C",
            ubicacion: "C"
        },
        {
            id_incidencia: 7,
            id_usuario: 'D',
            titulo: "D",
            descripcion: "D",
            categoria: "D",
            nivel_urgencia: "D",
            fecha_registro: "D",
            estado: "D",
            ubicacion: "D"
        },
        {
            id_incidencia: 8,
            id_usuario: 'E',
            titulo: "E",
            descripcion: "E",
            categoria: "E",
            nivel_urgencia: "E",
            fecha_registro: "E",
            estado: "E",
            ubicacion: "E"
        },
        {
            id_incidencia: 9,
            id_usuario: 'F',
            titulo: "F",
            descripcion: "F",
            categoria: "F",
            nivel_urgencia: "F",
            fecha_registro: "F",
            estado: "F",
            ubicacion: "F"
        },
        {
            id_incidencia: 10,
            id_usuario: 'G',
            titulo: "G",
            descripcion: "G",
            categoria: "G",
            nivel_urgencia: "G",
            fecha_registro: "G",
            estado: "G",
            ubicacion: "G"
        }

    ]);

    return(
    <>
        <ul>
            {incidencias.map((i) => (
                <li key={i.id_incidencia}><strong>Título: </strong>{i.titulo}, <br></br>
                <strong>Descripción: </strong>{i.descripcion}, <br></br>
                <strong>Usuario: </strong>{i.id_usuario}, <br></br>
                <strong>Urgencia: </strong>{i.nivel_urgencia}, <br></br>
                <strong>Ubicación: </strong>{i.ubicacion}<br></br>
                </li>
            ))}
        </ul>
    </>
    );
  }

export default MiLista;