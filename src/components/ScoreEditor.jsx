import React, { useState } from "react";
import "../styles/ScoreEditor.css";

function ScoreEditor({ team, game, currentScore, onSave, onClose }) {
  const [score, setScore] = useState(currentScore);

  const handleSave = () => {
    onSave(team.id, game.id, parseInt(score) || 0);
    onClose();
  };

  const handleIncrement = () => {
    setScore(parseInt(score) + 1);
  };

  const handleDecrement = () => {
    const newScore = parseInt(score) - 1;
    setScore(newScore < 0 ? 0 : newScore);
  };

  return (
    <div className="score-editor-overlay" onClick={onClose}>
      <div className="score-editor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="editor-header">
          <h3>✏️ Editar Puntaje</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="editor-content">
          <div className="team-game-info">
            <div className="info-row">
              <span className="label">Equipo:</span>
              <span className="value" style={{ color: team.hexcolor }}>
                {team.name}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Juego:</span>
              <span className="value">{game.name}</span>
            </div>
          </div>

          <div className="score-editor-section">
            <label>Puntaje:</label>
            <div className="score-controls">
              <button
                className="score-btn minus-btn"
                onClick={handleDecrement}
                title="Disminuir"
              >
                −
              </button>
              <input
                type="number"
                min="0"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="score-input"
              />
              <button
                className="score-btn plus-btn"
                onClick={handleIncrement}
                title="Aumentar"
              >
                +
              </button>
            </div>
          </div>

          <div className="quick-set-scores">
            <label>Valores rápidos:</label>
            <div className="quick-buttons">
              {[5, 7, 10].map((value) => (
                <button
                  key={value}
                  className="quick-btn"
                  onClick={() => setScore(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="preview-info">
            <div className="preview-item">
              <span className="preview-label">Anterior</span>
              <span className="preview-value preview-old">{currentScore}</span>
            </div>
            <div className="preview-arrow">→</div>
            <div className="preview-item">
              <span className="preview-label">Nuevo</span>
              <span className="preview-value preview-new">{score}</span>
            </div>
          </div>
        </div>

        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave}>
            💾 Guardar
          </button>
          <button className="cancel-btn" onClick={onClose}>
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreEditor;
