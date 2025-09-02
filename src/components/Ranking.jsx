import React from "react";
import "../Ranking.css";


const Ranking = () => {
  // Datos de ejemplo para el ranking
  const defaultUsers = [
    { name: "Ana", points: 120 },
    { name: "Luis", points: 95 },
    { name: "Maria", points: 150 },
    { name: "Carlos", points: 80 },
    { name: "Sofía", points: 110 },
  ];

  // Obtener usuario actual y puntos (ejemplo: 100 puntos)
  const username = localStorage.getItem("memoriablas_user") || "Tú";
  // Puedes cambiar la lógica para obtener los puntos reales del usuario
  const userPoints = Number(localStorage.getItem("memoriablas_points")) || 100;

  // Si el usuario ya está en la lista, actualizar sus puntos; si no, agregarlo
  let users = [...defaultUsers];
  const existingIdx = users.findIndex(u => u.name === username);
  if (existingIdx >= 0) {
    users[existingIdx].points = userPoints;
  } else {
    users.push({ name: username, points: userPoints });
  }

  // Ordenar usuarios por puntos descendente
  const sortedUsers = users.sort((a, b) => b.points - a.points);

  return (
    <div className="ranking-container">
      <h2>Ranking de Usuarios</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, idx) => (
            <tr key={user.name + user.points} className={user.name === username ? "top-user" : ""}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
