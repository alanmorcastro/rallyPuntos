# Puntos Rally - Estructura del Proyecto

puntosRally/
│
├── index.html # Archivo HTML principal
├── package.json # Dependencias y scripts del proyecto
├── vite.config.js # Configuración de Vite
├── README.md # Documentación del proyecto
├── .gitignore # Archivos a ignorar en Git
│
└── src/
├── main.jsx # Punto de entrada de React
├── App.jsx # Componente principal
│
├── components/ # Componentes React reutilizables
│ ├── Scoreboard.jsx # Tabla de clasificación y resumen
│ ├── GameSelector.jsx # Selector de juegos
│ └── PointsEntry.jsx # Entrada y registro de puntos
│
├── data/ # Datos y constantes
│ └── constants.js # Datos de equipos y juegos
│
└── styles/ # Estilos CSS
├── global.css # Estilos globales
├── App.css # Estilos del componente App
├── Scoreboard.css # Estilos de la tabla de clasificación
├── GameSelector.css # Estilos del selector de juegos
└── PointsEntry.css # Estilos de entrada de puntos

# COMPONENTES PRINCIPALES

1. App.jsx
   - Componente raíz de la aplicación
   - Gestiona el estado global de puntos
   - Coordina la comunicación entre componentes

2. Scoreboard.jsx
   - Muestra la tabla de clasificación
   - Calcula y ordena puntos totales
   - Muestra resumen de ganadores por juego

3. GameSelector.jsx
   - Permite seleccionar el juego activo
   - Lista todos los 10 juegos
   - Destaca el juego seleccionado

4. PointsEntry.jsx
   - Interfaz para registrar puntos
   - Botones rápidos para valores comunes
   - Muestra puntos actuales de cada equipo en el juego seleccionado

# FLUJO DE DATOS

1. Estado en App.jsx: { teamId: { gameId: puntos } }
2. Cambios en PointsEntry → actualización en App
3. Lectura de datos en Scoreboard para visualización
4. Cálculo automático de totales y clasificación

# CARACTERÍSTICAS

✓ Gestión de 10 equipos con colores identificativos
✓ Soporte para 10 juegos diferentes
✓ Registro dinámico de puntos
✓ Tabla de clasificación automática
✓ Resumen de ganadores por juego
✓ Interfaz responsiva (desktop, tablet, móvil)
✓ Botones de acciones rápidas
✓ Opción de reiniciar puntos
✓ Emojis para mejor UX

# ESTILOS Y TEMAS

- Colores: Gradiente púrpura (#667eea a #764ba2)
- Fuente: Segoe UI / Verdana / sans-serif
- Animaciones suaves con transiciones CSS
- Scroll personalizado en listas
- Diseño responsive con CSS Grid

# CÓMO EXPANDIR

Para agregar personalizaciones:

1. Editar equipos: src/data/constants.js (TEAMS)
2. Editar juegos: src/data/constants.js (GAMES)
3. Cambiar colores: src/styles/global.css
4. Agregar persistencia: Integrar localStorage o API
5. Agregar autenticación: Integrar sistema de login
6. Exportar datos: Agregar descarga a CSV/PDF
