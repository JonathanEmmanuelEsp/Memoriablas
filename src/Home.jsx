import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./login-home.css";

export default function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("memoriablas_user");

  return (
    <>
      <Header />
      <div className="home-container kids-home">
        <h1 className="kids-title">¡Hola{username ? `, ${username}` : ""}! 👋</h1>
        <p className="kids-desc">
          <span role="img" aria-label="star">⭐</span> ¡Bienvenido a <b>Memoriablas</b>! <span role="img" aria-label="star">⭐</span><br/>
          Aquí puedes jugar y aprender las tablas de multiplicar de una forma divertida.<br/>
          <span role="img" aria-label="sparkles">✨</span> ¿Listo para empezar?
        </p>
        <button className="kids-play-btn" onClick={() => navigate("/jugar")}>¡Jugar ahora!</button>
      </div>
    </>
  );
}
// ...existing code...
