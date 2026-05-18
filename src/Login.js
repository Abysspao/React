import React, { useState } from "react";
import './login.css';
import Fondo from './Imagenes/fondo.jpg';
import Header from './header/header';
import Footer from './footer/footer';
import bcrypt from 'bcryptjs'; // ← NUEVO: para comparar contraseñas hasheadas

function Login({ onLoginExitoso }) {
  const USUARIO_API_URL = 'http://localhost:3210/users';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (event) => {
    event.preventDefault();
    setError('');
    setCargando(true);

    try {
      const response = await fetch(USUARIO_API_URL);
      if (!response.ok) throw new Error("HTTP Error");

      const usuarios = await response.json();

      // Primero buscamos por email
      const usuarioEncontrado = usuarios.find((u) => u.email === email);

      if (usuarioEncontrado) {
        let passwordCorrecta = false;

        if (usuarioEncontrado.password.startsWith('$2')) {
          const hashCompatible = usuarioEncontrado.password.replace(/^\$2y\$/, '$2a$');
          passwordCorrecta = await bcrypt.compare(password, hashCompatible);
        } else {
          // Contraseña en texto plano (ej: usuario de pruebas)
          passwordCorrecta = usuarioEncontrado.password === password;
        }

        if (passwordCorrecta) {
          onLoginExitoso(usuarioEncontrado);
        } else {
          setError('Email o contraseña incorrectos.');
        }
      } else {
        setError('Email o contraseña incorrectos.');
      }
    } catch (e) {
      console.error("Error al iniciar sesión:", e);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh"
      }}
    >
      <Header />

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="bg-azul-pastel p-4 rounded login-card">

          <h3 className="text-tituloperzonalizado-naranja text-center mb-4">
            Iniciar sesión
          </h3>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={manejarLogin}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="tucorreo@ejemplo.com"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="form-control mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn mx-auto d-grid w-100"
              style={{ backgroundColor: "#ee9a13ff", color: "#fff" }}
              disabled={cargando}
            >
              {cargando ? 'Comprobando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;