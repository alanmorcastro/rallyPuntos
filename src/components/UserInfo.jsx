import React from "react";
import "../styles/UserInfo.css";

function UserInfo({ user, onLogout }) {
  const getRoleBadgeColor = (role) => {
    return role === "administrador" ? "#667eea" : "#52C41A";
  };

  const getRoleLabel = (role) => {
    return role === "administrador" ? "👨‍💼 Administrador" : "👤 Usuario";
  };

  return (
    <div className="user-info-container">
      <div className="user-info-content">
        <div className="user-name">{user.username}</div>
        <div
          className="user-role"
          style={{ backgroundColor: getRoleBadgeColor(user.role) }}
        >
          {getRoleLabel(user.role)}
        </div>
      </div>
      <button onClick={onLogout} className="logout-btn" title="Cerrar sesión">
        🚪 Salir
      </button>
    </div>
  );
}

export default UserInfo;
