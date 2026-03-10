export const USERS = [
  {
    username: "admin",
    password: "admin123",
    role: "administrador", // Puede agregar puntos a cualquier equipo y juego
    name: "Alan",
  },
  {
    username: "BASE1",
    password: "base1",
    role: "usuario",
    name: "Patty",
    allowedGame: 1, // Solo puede agregar puntos en el Juego 1
  },
];

export const TEAMS = [
  { id: 1, name: 'Equipo 1', color: '#ff4545' },
  { id: 2, name: 'Equipo 2', color: '#0effef' },
  { id: 3, name: 'Equipo 3', color: '#ffea31' },
  { id: 4, name: 'Equipo 4', color: '#ff753e' },
  { id: 5, name: 'Equipo 5', color: '#9959ff' },
  { id: 6, name: 'Equipo 6', color: '#fd57e7' },
  { id: 7, name: 'Equipo 7', color: '#9e9e9e' },
  { id: 8, name: 'Equipo 8', color: '#65b687' },
  { id: 9, name: 'Equipo 9', color: '#252525' },
  { id: 10, name: 'Equipo 10', color: '#3564ff' }
];

export const GAMES = [
  { id: 1, name: 'Base 1: Trivia', description: 'Preguntas de cultura general', lead: null },
  { id: 2, name: 'Base 2: Deportes', description: 'Pruebas relacionadas con deportes', lead: null },
  { id: 3, name: 'Base 3: Lógica', description: 'Desafíos de pensamiento lógico', lead: null },
  { id: 4, name: 'Base 4: Velocidad', description: 'Competencia de rapidez y agilidad', lead: null },
  { id: 5, name: 'Base 5: Acertijos', description: 'Acertijos y enigmas a resolver', lead: null },
  { id: 6, name: 'Base 6: Memoria', description: 'Pruebas de memoria visual', lead: null },
  { id: 7, name: 'Base 7: Estrategia', description: 'Juegos que requieren estrategia', lead: null },
  { id: 8, name: 'Base 8: Conocimiento', description: 'Pruebas de conocimiento específico', lead: null },
  { id: 9, name: 'Base 9: Habilidad', description: 'Desafíos de habilidad manual', lead: null },
  { id: 10, name: 'Base 10: Desafío Final', description: 'El gran desafío final de todos', lead: null }
];
