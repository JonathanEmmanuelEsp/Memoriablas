import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-home.css";
import Header from "./components/Header";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Por favor ingresa usuario y contraseña");
      setSuccess("");
      return;
    }
    const users =
      JSON.parse(localStorage.getItem("memoriablas_users") || "{}") || {};
    if (isRegister) {
      if (users[username]) {
        setError("El usuario ya existe");
        setSuccess("");
      } else {
        users[username] = password;
        localStorage.setItem("memoriablas_users", JSON.stringify(users));
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setError("");
        setIsRegister(false);
        setUsername("");
        setPassword("");
      }
    } else {
      if (users[username] && users[username] === password) {
        localStorage.setItem("memoriablas_user", username);
        setUsername("");
        setPassword("");
        setError("");
        setSuccess("");
        window.location.replace("/home");
      } else {
        setError("Usuario o contraseña incorrectos");
        setSuccess("");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login-container kids-login">
        <h2 className="kids-title">
          {isRegister ? "¡Crea tu cuenta! 📝" : "¡BienvenidoS! 🦄"}
        </h2>
        <form onSubmit={handleSubmit} className="kids-form">
          <input
            type="text"
            placeholder="Tu nombre de usuario"
            value={username}
            className="kids-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Tu contraseña secreta"
            value={password}
            className="kids-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="kids-btn" type="submit">
            {isRegister ? "¡Registrarme!" : "Entrar"}
          </button>
        </form>
        <button
          type="button"
          className="kids-switch-btn"
          onClick={() => {
            setIsRegister((r) => !r);
            setError("");
            setSuccess("");
          }}
        >
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? ¡Regístrate!"}
        </button>
        {error && <div className="error kids-error">{error}</div>}
        {success && <div className="success kids-success">{success}</div>}
      </div>
    </>
  );
}
