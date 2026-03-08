import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { supabase } from "../supabaseClient";

function Login({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      onLogin({
        username: user.name,
        role: user.role,
        allowedGame: user.allowedGame || null,
      });
    } else {
      setError("Usuario o contraseña incorrectos");
      setPassword("");
    }
  };

  const handleDemoLogin = (role) => {
    const demoUser = users.find((u) => u.role === role);
    if (demoUser) {
      onLogin({ username: demoUser.name, role: demoUser.role });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🏆 Puntos Rally</h1>
          <p>Sistema de Gestión de Puntos</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>

        {/* <div className="demo-section">
          <p className="demo-label">O ingresa como:</p>
          <div className="demo-buttons">
            <button
              type="button"
              className="demo-btn admin-demo"
              onClick={() => handleDemoLogin("administrador")}
            >
              👨‍💼 Admin
              <small>admin / admin123</small>
            </button>
            <button
              type="button"
              className="demo-btn user-demo"
              onClick={() => handleDemoLogin("usuario")}
            >
              👤 Usuario
              <small>user / user123</small>
            </button>
          </div>
        </div>

        <div className="login-info">
          <p>
            <strong>Administrador:</strong> Editar puntos, juegos y equipos
          </p>
          <p>
            <strong>Usuario:</strong> Solo puede agregar puntos en Juego 1
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
