import React, { useState } from "react";
import "../styles/Menu.css";

function Menu({
  onEditTeams,
  onEditGames,
  onResetScores,
  isAdmin,
  user,
  onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (callback) => {
    callback();
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false);
  };

  const getRoleBadgeColor = (role) => {
    return role === "administrador" ? "#667eea" : "#52C41A";
  };

  const getRoleLabel = (role) => {
    return role === "administrador" ? "👨‍💼 Administrador" : "👤 Usuario";
  };

  return (
    <div className="menu-container">
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Menú de opciones"
      >
        ☰
      </button>

      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-user-section">
            <div className="menu-user-name">{user?.username}</div>
            <div
              className="menu-user-role"
              style={{ backgroundColor: getRoleBadgeColor(user?.role) }}
            >
              {getRoleLabel(user?.role)}
            </div>
          </div>
          <hr className="menu-divider" />
          {isAdmin && (
            <>
              <button
                className="menu-item"
                onClick={() => handleOptionClick(onEditTeams)}
              >
                ✏️ Editar Equipos
              </button>
              <button
                className="menu-item"
                onClick={() => handleOptionClick(onEditGames)}
              >
                🎮 Editar Juegos
              </button>
              <hr className="menu-divider" />
              <button
                className="menu-item reset-item"
                onClick={() => handleOptionClick(onResetScores)}
              >
                🔄 Reiniciar Puntos
              </button>
              <hr className="menu-divider" />
            </>
          )}
          <button className="menu-item logout-item" onClick={handleLogoutClick}>
            🚪 Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
