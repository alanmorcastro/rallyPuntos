import React, { useEffect } from "react";
import "../styles/GameSelector.css";

function GameSelector({
  games,
  selectedGame,
  onSelectGame,
  isAdmin,
  allowedGame,
}) {
  const sortedGames = games.sort((a, b) => a.id - b.id);
  // Si el usuario no es admin y tiene un juego permitido, forzar la selección a ese juego
  useEffect(() => {
    if (!isAdmin && allowedGame && selectedGame !== allowedGame) {
      onSelectGame(allowedGame);
    }
  }, [isAdmin, allowedGame, selectedGame, onSelectGame]);

  // Filtrar juegos: si es admin, mostrar todos; si no, solo el permitido
  const visibleGames = isAdmin
    ? sortedGames
    : sortedGames.filter((game) => game.id === allowedGame);

  return (
    <div className="game-selector">
      <h2>📋 Selecciona un Juego</h2>
      <div className="games-list">
        {visibleGames.map((game) => (
          <button
            key={game.id}
            className={`game-btn ${selectedGame === game.id ? "active" : ""}`}
            onClick={() => onSelectGame(game.id)}
            disabled={!isAdmin && game.id !== allowedGame}
          >
            {game.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameSelector;
