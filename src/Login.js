import React, { useState } from "react";
import './login.css';
import Fondo from './Imagenes/fondo.jpg';
import Header from './header/header';
import Footer from './footer/footer';

function Login({ onLoginExitoso }) {
  const LOGIN_API_URL = 'http://localhost:3210/login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (event) => {
    event.preventDefault();
    setError('');
    setCargando(true);

    try {
      // PERSISTENCIA: Se hace post /login al server, este verifica y si esta bien devuelve los datos y un token que se pasan mediante la const onLoginexitoso
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        setError('Email o contraseña incorrectos.');
        return;
      }

      const userData = await response.json();
      onLoginExitoso(userData);
      //////////////////////////////////////////////////////////////////////////

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