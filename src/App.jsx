import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { TEAMS, GAMES } from "./data/constants.js";
import Scoreboard from "./components/Scoreboard";
import GameSelector from "./components/GameSelector";
import PointsEntry from "./components/PointsEntry";
import TeamEditor from "./components/TeamEditor";
import GameEditor from "./components/GameEditor";
import Menu from "./components/Menu";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(TEAMS);
  const [games, setGames] = useState(GAMES);
  const [scores, setScores] = useState(() => {
    // Inicializar el objeto de puntos: { teamId: { gameId: puntos } }
    const initialScores = {};
    TEAMS.forEach((team) => {
      initialScores[team.id] = {};
      GAMES.forEach((game) => {
        initialScores[team.id][game.id] = 0;
      });
    });
    return initialScores;
  });
  const [selectedGame, setSelectedGame] = useState(GAMES[0].id);
  const [showTeamEditor, setShowTeamEditor] = useState(false);
  const [showGameEditor, setShowGameEditor] = useState(false);

  useEffect(() => {
    getTeams();
    getGames();
    getScores();
    // Suscripción en tiempo real
    const subscription = supabase
      .channel("scores-changes")
      .on(
        "postgres_changes",
        { event: "UPSERT", schema: "public", table: "scores" },
        (payload) => {
          console.log("Cambio detectado en scores:", payload);

          const newRow = payload.new;
          if (newRow) {
            setScores((prevScores) => ({
              ...prevScores,
              [newRow.id_team]: {
                ...prevScores[newRow.id_team],
                [newRow.id_game]: newRow.score,
              },
            }));
          }
        },
      )
      .subscribe();

    // Cleanup al desmontar
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function getScores() {
    const { data, error } = await supabase.from("scores").select("*");
    if (error) {
      console.error("Error fetching scores:", error);
      return;
    }

    const initialScores = {};
    TEAMS.forEach((team) => {
      initialScores[team.id] = {};
      GAMES.forEach((game) => {
        initialScores[team.id][game.id] = 0;
      });
    });

    data.forEach((scoreEntry) => {
      if (!initialScores[scoreEntry.id_team]) {
        initialScores[scoreEntry.id_team] = {};
      }
      initialScores[scoreEntry.id_team][scoreEntry.id_game] = scoreEntry.score;
    });
    setScores(initialScores);
  }

  async function getTeams() {
    const { data, error } = await supabase.from("teams").select("*");
    if (error) {
      console.error("Error fetching teams:", error);
    } else {
      setTeams(data);
    }
  }

  async function getGames() {
    const { data, error } = await supabase.from("games").select("*");
    if (error) {
      console.error("Error fetching games:", error);
    } else {
      setGames(data);
    }
  }

  const addPoints = async (teamId, points) => {
    // Validar permiso: solo admin o usuario en su juego permitido
    const isAdmin = user?.role === "administrador";

    if (!isAdmin && selectedGame !== user?.allowedGame) {
      console.warn(
        "Usuario no tiene permiso para agregar puntos en este juego",
      );
      return;
    }

    const { error } = await supabase
      .from("scores")
      .upsert({
        id_team: teamId,
        id_game: selectedGame,
        score: points,
      })
      .select();

    if (error) {
      console.error("Error updating points:", error);
      return;
    }

    setScores((prevScores) => ({
      ...prevScores,
      [teamId]: {
        ...prevScores[teamId],
        [selectedGame]: (prevScores[teamId][selectedGame] || 0) + points,
      },
    }));
  };

  const setPoints = async (teamId, gameId, points) => {
    // Validar permiso: solo admin puede modificar puntos
    const isAdmin = user?.role === "administrador";
    if (!isAdmin) {
      console.warn("Solo administradores pueden modificar puntos específicos");
      return;
    }

    const { error } = await supabase
      .from("scores")
      .upsert({
        id_team: teamId,
        id_game: gameId,
        score: points,
      })
      .select();

    if (error) {
      console.error("Error setting points:", error);
      return;
    }

    setScores((prevScores) => ({
      ...prevScores,
      [teamId]: {
        ...prevScores[teamId],
        [gameId]: points,
      },
    }));
  };

  const resetScores = async () => {
    if (
      window.confirm("¿Estás seguro de que deseas reiniciar todos los puntos?")
    ) {
      const newScores = {};
      const { error } = await supabase.from("scores").delete().neq("id", 0);
      if (error) {
        console.error("Error resetting scores:", error);
        return;
      }
      setScores(newScores);
    }
  };

  const handleTeamsChange = (updatedTeams) => {
    setTeams(updatedTeams);
  };

  const handleGamesChange = (updatedGames) => {
    setGames(updatedGames);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === "administrador";

  // Si no hay usuario, mostrar login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>🏆 Puntos Rally</h1>
          {/* <p>Sistema de Gestión de Puntos</p> */}
        </div>
        <div className="header-controls">
          <Menu
            onEditTeams={() => setShowTeamEditor(true)}
            onEditGames={() => setShowGameEditor(true)}
            onResetScores={resetScores}
            isAdmin={isAdmin}
            user={user}
            onLogout={handleLogout}
          />
          <UserInfo user={user} onLogout={handleLogout} />
        </div>
      </header>

      <main className="container">
        <div className="left-panel">
          <GameSelector
            games={games}
            selectedGame={selectedGame}
            onSelectGame={setSelectedGame}
            isAdmin={isAdmin}
            allowedGame={user?.allowedGame}
          />

          <PointsEntry
            teams={teams}
            selectedGame={selectedGame}
            currentScores={scores}
            onAddPoints={addPoints}
            onSetPoints={setPoints}
            isAdmin={isAdmin}
            allowedGame={user?.allowedGame}
          />
        </div>

        <div className="right-panel">
          <Scoreboard
            teams={teams}
            games={games}
            scores={scores}
            onSetPoints={setPoints}
            isAdmin={isAdmin}
            allowedGame={user?.allowedGame}
          />
        </div>
      </main>

      {isAdmin && showTeamEditor && (
        <TeamEditor
          teams={teams}
          onTeamsChange={handleTeamsChange}
          onClose={() => setShowTeamEditor(false)}
        />
      )}

      {isAdmin && showGameEditor && (
        <GameEditor
          games={games}
          onGamesChange={handleGamesChange}
          onClose={() => setShowGameEditor(false)}
        />
      )}
    </div>
  );
}

export default App;
