import { useState } from "react";
import RolGest from "./RolGest";

function GestUsers({ usuarios, onActualizarRol, onAgregarUsuario }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="container mt-4" style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h3 style={{ color: "#333" }}>Gestión de usuarios y roles</h3>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Cambiar rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.rol?.nombre_rol}</td>
              <td>
                <select
                  value={u.rol?.nombre_rol}
                  onChange={(e) => onActualizarRol(u.id, e.target.value)}
                >
                  <option value="admin">admin</option>
                  <option value="usuario">usuario</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-sm mt-3"
        style={{ backgroundColor: "#ee9a13ff", color: "#fff" }}
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Cancelar" : "Añadir nuevo usuario"}
      </button>

      {mostrarFormulario && (
        <RolGest onAgregarUsuario={onAgregarUsuario} />
      )}
    </div>
  );
}

export default GestUsers;