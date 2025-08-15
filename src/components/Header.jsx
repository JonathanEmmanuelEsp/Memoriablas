import React from "react";
import { useNavigate } from "react-router-dom";
import "../login-home.css";

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem("memoriablas_user");

  const handleLogout = () => {
    localStorage.removeItem("memoriablas_user");
    navigate("/login");
  };

  return (
    <header className="header-kids">
      <div className="header-logo" onClick={() => navigate('/home')}>
        <span role="img" aria-label="party">🎉</span> <span className="header-title">Memoriablas</span> <span role="img" aria-label="balloon">🎈</span>
      </div>
      <div>
        {username && (
          <>
            <span className="header-user">� {username}</span>
            <button className="header-logout" onClick={handleLogout}>
              Salir
            </button>
          </>
        )}
      </div>
    </header>
  );
}
