import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/Scoreboard.css";
import ScoreEditor from "./ScoreEditor";

function Scoreboard({
  teams,
  games,
  scores,
  onSetPoints,
  isAdmin,
  allowedGame,
}) {
  const sortedGames = isAdmin ? games.sort((a, b) => a.id - b.id) : games;
  const sortedTeams = isAdmin ? teams.sort((a, b) => a.id - b.id) : teams;
  const [editingScore, setEditingScore] = useState(null);

  useEffect(() => {
    getScores();
  }, []);

  // Calcular los puntos totales de cada equipo
  const totalScores = useMemo(() => {
    // const { data, error } = supabase.from("scores").select("*");
    // if (error) {
    //   console.error("Error fetching scores:", error);
    //   return {};
    // }

    const totals = {};

    sortedTeams.forEach((team) => {
      let total = 0;
      sortedGames.forEach((game) => {
        total += scores[team.id][game.id] || 0;
      });
      totals[team.id] = total;
    });

    return totals;
  }, [scores, teams, games]);

  // Ordenar equipos por puntos totales (descendente)
  const rankedTeams = useMemo(() => {
    return [...sortedTeams].sort(
      (a, b) => totalScores[b.id] - totalScores[a.id],
    );
  }, [teams, totalScores]);

  const visibleGames = isAdmin
    ? sortedGames
    : sortedGames.filter((game) => {
        // Si no es admin, mostrar solo el juego que tiene permitido
        return game.id === allowedGame;
      });

  const getScores = async () => {
    const { data, error } = await supabase.from("scores").select("*");
    if (error) {
      console.error("Error fetching scores:", error);
      return;
    }
    return data;
  };

  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <h2>🏅 Tabla de Clasificación</h2>
        {/* <div className="summary-stats">
          <div className="stat">
            <span className="label">Total Equipos</span>
            <span className="value">{teams.length}</span>
          </div>
          <div className="stat">
            <span className="label">Total Juegos</span>
            <span className="value">{games.length}</span>
          </div>
        </div> */}
      </div>

      {/* Tabla de Puntos Detallada */}
      <div className="table-container">
        <table className="scores-table">
          <thead>
            <tr>
              {isAdmin && <th>#</th>}
              <th>Equipo</th>
              {visibleGames.map((game) => (
                <th key={game.id} className="game-col" title={game.name}>
                  {game.id}
                </th>
              ))}
              {isAdmin && <th className="total-col">Total</th>}
            </tr>
          </thead>
          <tbody>
            {rankedTeams.map((team, index) => (
              <tr key={team.id} className={index < 3 ? "top-three" : ""}>
                {isAdmin && (
                  <td className="position">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && `${index + 1}º`}
                  </td>
                )}
                <td
                  className="team-name"
                  style={{ borderLeftColor: team.hexcolor }}
                >
                  {`${team.name}`}
                </td>
                {visibleGames.map((game) => (
                  <td
                    key={game.id}
                    className={`game-score ${isAdmin ? "editable" : ""}`}
                    onClick={() => isAdmin && setEditingScore({ team, game })}
                    style={{
                      backgroundColor:
                        scores[team.id][game.id] > 0
                          ? `${team.hexcolor}20`
                          : "transparent",
                      cursor: isAdmin ? "pointer" : "default",
                    }}
                    title={isAdmin ? "Haz clic para editar" : ""}
                  >
                    {scores[team.id][game.id] || "-"}
                  </td>
                ))}
                {isAdmin && (
                  <td
                    className="total-score"
                    style={{ backgroundColor: team.hexcolor }}
                  >
                    <strong>{totalScores[team.id]}</strong>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumen de Juegos */}
      <div className="games-summary">
        <h3>📊 Resumen de Juegos</h3>
        <div className="games-grid">
          {games.map((game) => {
            const maxScore = Math.max(
              ...teams.map((team) => scores[team.id][game.id] || 0),
            );
            const winner = teams.find(
              (team) => scores[team.id][game.id] === maxScore && maxScore > 0,
            );

            return (
              <div key={game.id} className="game-card">
                <div className="game-title">{game.name}</div>
                <div className="game-detail">Encargado: {game.lead}</div>

                {game.description && (
                  <div className="game-description">{game.description}</div>
                )}

                {/* {isAdmin ? (
                  winner ? (
                    <div
                      className="game-winner"
                      style={{ color: winner.color }}
                    >
                      🏆 {winner.name}: {maxScore} pts
                    </div>
                  ) : (
                    <div className="game-no-winner">Sin puntuación</div>
                  )
                ) : null} */}
              </div>
            );
          })}
        </div>
      </div>

      {editingScore && (
        <ScoreEditor
          team={editingScore.team}
          game={editingScore.game}
          currentScore={scores[editingScore.team.id][editingScore.game.id] || 0}
          onSave={onSetPoints}
          onClose={() => setEditingScore(null)}
        />
      )}
    </div>
  );
}

export default Scoreboard;
