import React, { useState } from "react";
import "../styles/PointsEntry.css";

function PointsEntry({
  teams,
  selectedGame,
  currentScores,
  onAddPoints,
  onSetPoints,
  isAdmin,
  allowedGame,
}) {
  const [points, setPoints] = useState(1);

  // Si el usuario no es admin y no está en su juego permitido, mostrar mensaje
  const canAddPoints = isAdmin || selectedGame === allowedGame;

  const handleAddPoints = (teamId) => {
    if (!canAddPoints) return;
    onAddPoints(teamId, parseInt(points) || 0);
  };

  const handleInputChange = (teamId, value) => {
    if (!canAddPoints) return;
    const newValue = parseInt(value) || 0;
    onSetPoints(teamId, selectedGame, newValue);
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
        <input
          type="number"
          min="1"
          max="100"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Ingresa los puntos"
          disabled={!canAddPoints}
        />
      </div>

      <div className="teams-list">
        {teams.map((team) => (
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
              <span className="team-points">
                {currentScores[team.id][selectedGame]} pts
              </span>
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
          {[1, 5, 10].map((value) => (
            <button
              key={value}
              className="quick-btn"
              onClick={() => setPoints(value)}
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
