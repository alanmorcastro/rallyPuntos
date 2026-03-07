import React, { useState } from "react";
import "../styles/GameEditor.css";

function GameEditor({ games, onGamesChange, onClose }) {
  const [editingGames, setEditingGames] = useState(games);
  const [expandedGame, setExpandedGame] = useState(null);

  const handleNameChange = (gameId, newName) => {
    setEditingGames((prev) =>
      prev.map((game) =>
        game.id === gameId ? { ...game, name: newName } : game,
      ),
    );
  };

  const handleDescriptionChange = (gameId, newDescription) => {
    setEditingGames((prev) =>
      prev.map((game) =>
        game.id === gameId ? { ...game, description: newDescription } : game,
      ),
    );
  };

  const handleSave = () => {
    onGamesChange(editingGames);
    onClose();
  };

  const handleCancel = () => {
    setEditingGames(games);
    onClose();
  };

  return (
    <div className="game-editor-overlay">
      <div className="game-editor-modal">
        <div className="editor-header">
          <h2>🎮 Editar Juegos</h2>
          <button className="close-btn" onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className="games-edit-list">
          {editingGames.map((game) => (
            <div key={game.id} className="game-edit-item">
              <button
                className="game-expand-btn"
                onClick={() =>
                  setExpandedGame(expandedGame === game.id ? null : game.id)
                }
              >
                <span className="game-header">
                  <span className="game-number">Juego {game.id}</span>
                  <span className="game-name-preview">{game.name}</span>
                </span>
                <span className="expand-icon">
                  {expandedGame === game.id ? "▼" : "▶"}
                </span>
              </button>

              {expandedGame === game.id && (
                <div className="game-edit-form">
                  <div className="form-group">
                    <label>Nombre del Juego:</label>
                    <input
                      type="text"
                      value={game.name}
                      onChange={(e) =>
                        handleNameChange(game.id, e.target.value)
                      }
                      placeholder="Ingresa el nombre del juego"
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                      value={game.description || ""}
                      onChange={(e) =>
                        handleDescriptionChange(game.id, e.target.value)
                      }
                      placeholder="Ingresa una descripción del juego (opcional)"
                      rows="3"
                    />
                  </div>

                  <div className="preview-section">
                    <h4>Vista Previa:</h4>
                    <div className="preview-box">
                      <div className="preview-title">Juego {game.id}</div>
                      <div className="preview-name">{game.name}</div>
                      {game.description && (
                        <div className="preview-description">
                          {game.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave}>
            💾 Guardar Cambios
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameEditor;
