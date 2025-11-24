import React from "react";
import './forms.css';

function MiLista(props){

  return(
    <div className="bg-morado-pastel p-4 rounded">
      <dl>
        {props.incidencias.map((i) => (
          <div key={i.id_incidencia} className="mb-4 p-2 border-bottom">
            <dt className="text-primary"><strong>Título: </strong></dt>
            <dd className="text-muted"><strong>{i.titulo}</strong><br /></dd>
            <dt className="text-primary"><strong>Descripción: </strong></dt>
            <dd><strong>{i.descripcion}</strong><br /><br /></dd>
            <dt className="text-primary"><strong>Usuario: </strong></dt>
            <dd><strong>{i.id_usuario}</strong><br /><br /></dd>
            <dt className="text-primary"><strong>Urgencia: </strong></dt>
            <dd><strong>{i.nivel_urgencia}</strong><br /><br /></dd>
            <dt className="text-primary"><strong>Ubicación: </strong></dt>
            <dd><strong>{i.ubicacion}</strong></dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default MiLista;