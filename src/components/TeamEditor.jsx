import React, { useState } from "react";
import "../styles/TeamEditor.css";

function TeamEditor({ teams, onTeamsChange, onClose }) {
  const [editingTeams, setEditingTeams] = useState(teams);
  const [expandedTeam, setExpandedTeam] = useState(null);

  const handleNameChange = (teamId, newName) => {
    setEditingTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team,
      ),
    );
  };

  const handleColorChange = (teamId, newColor) => {
    setEditingTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, color: newColor } : team,
      ),
    );
  };

  const handleSave = () => {
    onTeamsChange(editingTeams);
    onClose();
  };

  const handleCancel = () => {
    setEditingTeams(teams);
    onClose();
  };

  return (
    <div className="team-editor-overlay">
      <div className="team-editor-modal">
        <div className="editor-header">
          <h2>✏️ Editar Equipos</h2>
          <button className="close-btn" onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className="teams-edit-list">
          {editingTeams.map((team) => (
            <div key={team.id} className="team-edit-item">
              <button
                className="team-expand-btn"
                onClick={() =>
                  setExpandedTeam(expandedTeam === team.id ? null : team.id)
                }
              >
                <span className="team-header">
                  <span
                    className="color-preview"
                    style={{ backgroundColor: team.color }}
                  ></span>
                  <span className="team-name-preview">{team.name}</span>
                </span>
                <span className="expand-icon">
                  {expandedTeam === team.id ? "▼" : "▶"}
                </span>
              </button>

              {expandedTeam === team.id && (
                <div className="team-edit-form">
                  <div className="form-group">
                    <label>Nombre del Equipo:</label>
                    <input
                      type="text"
                      value={team.name}
                      onChange={(e) =>
                        handleNameChange(team.id, e.target.value)
                      }
                      placeholder="Ingresa el nombre del equipo"
                    />
                  </div>

                  <div className="form-group">
                    <label>Color:</label>
                    <div className="color-picker-container">
                      <input
                        type="color"
                        value={team.color}
                        onChange={(e) =>
                          handleColorChange(team.id, e.target.value)
                        }
                        className="color-input"
                      />
                      <span className="color-value">{team.color}</span>
                      <div
                        className="color-preview-large"
                        style={{ backgroundColor: team.color }}
                      ></div>
                    </div>
                  </div>

                  <div className="preset-colors">
                    <span className="preset-label">
                      Colores preestablecidos:
                    </span>
                    <div className="preset-options">
                      {[
                        "#FF6B6B",
                        "#4ECDC4",
                        "#45B7D1",
                        "#FFA07A",
                        "#98D8C8",
                        "#F7DC6F",
                        "#BB8FCE",
                        "#85C1E2",
                        "#F8B88B",
                        "#52C41A",
                      ].map((color) => (
                        <button
                          key={color}
                          className="preset-color"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(team.id, color)}
                          title={color}
                        />
                      ))}
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

export default TeamEditor;
