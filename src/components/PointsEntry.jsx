import React, { useState } from "react";
import "../styles/PointsEntry.css";

function PointsEntry({
  teams,
  selectedGame,
  onAddPoints,
  onSetPoints,
  isAdmin,
  allowedGame,
  currentScores,
}) {
  const [points, setPoints] = useState(1);

  // Si el usuario no es admin y no está en su juego permitido, mostrar mensaje
  const canAddPoints = isAdmin || selectedGame === allowedGame;

  // Filtrar equipos que no tienen puntos registrados en el juego seleccionado
  const teamsWithoutPoints = teams.filter(
    (team) => !currentScores[team.id] || !currentScores[team.id][selectedGame],
  );

  const handleAddPoints = (teamId) => {
    if (!canAddPoints) return;
    if (
      window.confirm(
        `¿Agregar ${points} punto(s) a equipo ${teams.find((t) => t.id === teamId).name}?`,
      )
    ) {
      onAddPoints(teamId, parseInt(points));
    }
  };

  const handleIncrement = () => {
    if (!canAddPoints) return;
    setPoints((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const handleDecrement = () => {
    if (!canAddPoints) return;
    setPoints((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleChangePoints = (e) => {
    const value = e.target.value;

    // Si el valor actual es 0 y el usuario escribe un número distinto
    if (points === 0 && /^[0-9]$/.test(value)) {
      setPoints(parseInt(value, 10)); // reemplaza directamente
      return;
    }

    // Convertir a número y limitar entre 0 y 10
    let num = parseInt(value, 10);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > 10) num = 10;

    setPoints(num);
  };

  return (
    <div className="points-entry">
      <h2>➕ Registrar Puntos</h2>

      {!canAddPoints && (
        <div
          className="warning-message"
          style={{
            color: "#d9534f",
            fontWeight: "bold",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            borderRadius: "4px",
          }}
        >
          ⚠️ No tienes permiso para agregar puntos en este juego.
        </div>
      )}

      <div
        className="points-input-section"
        style={{ opacity: canAddPoints ? 1 : 0.5 }}
      >
        <label>Puntos a Agregar:</label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <button
            style={{ height: "45px", fontSize: "25px" }}
            onClick={handleDecrement}
            disabled={!canAddPoints}
          >
            -
          </button>
          <input
            value={points}
            onChange={handleChangePoints}
            placeholder="Ingresa los puntos"
            disabled={true}
          />
          <button
            style={{ height: "45px", fontSize: "25px" }}
            onClick={handleIncrement}
            disabled={!canAddPoints}
          >
            +
          </button>
        </div>
      </div>

      <div className="teams-list">
        {teamsWithoutPoints
          .filter(
            (team) =>
              !currentScores[team.id] || !currentScores[team.id][selectedGame],
          )
          .map((team) => (
            <div
              key={team.id}
              className="team-entry"
              style={{
                borderLeftColor: team.hexcolor,
                opacity: canAddPoints ? 1 : 0.5,
              }}
            >
              <div className="team-info">
                <span style={{ color: team.hexcolor, fontWeight: "bold" }}>
                  {team.name}
                </span>
                {/* <span className="team-points">
                {currentScores[team.id][selectedGame]} pts
              </span> */}
              </div>
              <button
                className="add-btn"
                onClick={() => handleAddPoints(team.id)}
                style={{ backgroundColor: team.hexcolor }}
                disabled={!canAddPoints}
              >
                +{points}
              </button>
            </div>
          ))}
      </div>

      <div
        className="quick-actions"
        style={{ opacity: canAddPoints ? 1 : 0.5 }}
      >
        <h3>⚡ Acciones Rápidas</h3>
        <div className="quick-buttons">
          {[5, 7, 10].map((value) => (
            <button
              key={value}
              className="quick-btn"
              onClick={() => setPoints(parseInt(value))}
              disabled={!canAddPoints}
            >
              +{value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PointsEntry;
