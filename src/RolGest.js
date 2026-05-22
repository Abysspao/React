import { useState } from "react";

function RolGest({ onAgregarUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Rellena todos los campos");
      return;
    }
    onAgregarUsuario({ 
      email, 
      password, 
      rol: {
        nombre_rol: rol
      }
    });
    setEmail("");
    setPassword("");
    setRol("usuario");
  };

  return (
    <div className="mt-3 p-3" style={{ background: "#f5f5f5", borderRadius: "8px" }}>
      <h5>Nuevo usuario</h5>
      <div className="mb-2">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label>Rol</label>
        <select
          className="form-control"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="usuario">usuario</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <button
        className="btn btn-sm"
        style={{ backgroundColor: "#ee9a13ff", color: "#fff" }}
        onClick={handleSubmit}
      >
        Registrar usuario
      </button>
    </div>
  );
}

export default RolGest;