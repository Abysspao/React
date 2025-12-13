import React from "react";
import './forms.css';

function Form(props) {
    const envioFormulario = (event) => {
        event.preventDefault();
        const form = event.target;

        props.agregarIncidencia(
            form.email.value,
            form.titulo.value,
            form.descripcion.value,
            form.categoria.value,
            form.nivel.value,
            form.ubicacion.value
        );  
        }
    

    return (
        <div className="bg-azul-pastel p-4 rounded">
            <h3 className="text-tituloperzonalizado-naranja">Registrar incidencia</h3>
            <form onSubmit={envioFormulario}>
                <label>Título</label>
                <input type="text" name="titulo" placeholder="Título" required />
                <br /><br />

                                
                  <label>Email</label>
                  <input className="text" type="email" name="email" required></input>
                <br /><br />

                <label>Descripción</label>
                <textarea name="descripcion" placeholder="Describe la incidencia" rows="3" required />
                <br /><br />

                <label>Categoría</label>
                <select name="categoria" defaultValue="Hardware">
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Red">Red</option>
                    <option value="Otro">Otro</option>
                </select>
                <br /><br />

                <label>Nivel de urgencia</label>
                <select name="nivel" defaultValue="Media">
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
                <br /><br />

                <label>Ubicación</label>
                <input type="text" name="ubicacion" placeholder="Ej: A302" required />
                <br /><br />

                <button type="submit" className="btn mx-auto d-grid" style={{backgroundColor: "#ee9a13ff"}}> Registrar </button>
            </form>
        </div>
    );
}

export default Form;