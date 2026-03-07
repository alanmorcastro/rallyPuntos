# Puntos Rally - Sistema de Gestión de Puntos

Una aplicación React moderna para gestionar puntos de 10 equipos en 10 diferentes juegos.

## ✨ Características

- **10 Equipos**: Cada equipo con su propio color identificativo
- **10 Juegos**: Diferentes desafíos/juegos disponibles
- **Registro de Puntos**: Registra fácilmente los puntos ganados por cada equipo en cada juego
- **Tabla de Clasificación**: Visualiza automáticamente los puntos totales y la clasificación de equipos
- **Resumen de Juegos**: Ve quién ganó en cada juego de un vistazo
- **Interfaz Responsiva**: Funciona perfectamente en escritorio, tablet y móvil

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Navega a la carpeta del proyecto**

```bash
cd c:\Users\blake\source\repos\puntosRally
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

4. **Abre tu navegador**

```
http://localhost:3000
```

## 📋 Cómo Usar

### Interfaz Principal

La aplicación está dividida en dos paneles:

**Panel Izquierdo (Control):**

- Selecciona un juego de la lista
- Ingresa la cantidad de puntos a agregar
- Usa los botones rápidos (+1, +5, +10) para seleccionar la cantidad
- Haz clic en el botón de cada equipo para agregar puntos

**Panel Derecho (Resultados):**

- Visualiza la tabla de clasificación completa
- Ve la posición de cada equipo (🥇🥈🥉)
- Consulta los puntos de cada equipo en cada juego
- Mira el resumen de ganadores por juego

### Operaciones Disponibles

- **Agregar Puntos**: Selecciona un juego, ingresa puntos, haz clic en el équipo
- **Ver Clasificación**: Tabla automáticamente ordenada por puntos totales
- **Reiniciar Todo**: Botón "🔄 Reiniciar Puntos" para empezar de nuevo

## 🎮 Equipos

1. Equipo 1 (Rojo)
2. Equipo 2 (Verde Agua)
3. Equipo 3 (Azul)
4. Equipo 4 (Salmón)
5. Equipo 5 (Verde Menta)
6. Equipo 6 (Amarillo)
7. Equipo 7 (Púrpura)
8. Equipo 8 (Azul Claro)
9. Equipo 9 (Naranja)
10. Equipo 10 (Verde Lima)

## 🎯 Juegos

1. Juego 1: Trivia
2. Juego 2: Deportes
3. Juego 3: Lógica
4. Juego 4: Velocidad
5. Juego 5: Acertijos
6. Juego 6: Memoria
7. Juego 7: Estrategia
8. Juego 8: Conocimiento
9. Juego 9: Habilidad
10. Juego 10: Desafío Final

## 📦 Construcción para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## 🛠️ Tecnologías Utilizadas

- **React 18.2.0** - Biblioteca UI
- **Vite** - Herramienta de construcción rápida
- **CSS3** - Estilos modernos con gradientes y animaciones

## 📱 Responsive Design

La aplicación está completamente optimizada para:

- 💻 Escritorio (1400px+)
- 📱 Tablet (768px - 1024px)
- 📲 Móvil (<768px)

## 🔄 Estado de la Aplicación

Los puntos se almacenan en el estado de React. Para persistencia de datos en futuras mejoras, se recomienda agregar:

- Local Storage
- Base de datos en la nube
- API REST

## 📝 Notas

- La interfaz es intuitiva y diseñada para uso en vivo durante competiciones
- Los colores ayudan a identificar rápidamente cada equipo
- La tabla se ordena automáticamente por puntos totales
- Los emojis hacen la interfaz más amigable y visual

## 🎓 Personalización

Para modificar equipos o juegos, edita el archivo:

```
src/data/constants.js
```

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias de mejora, asegúrate de revisar la consola del navegador para ver mensajes de error.

---

¡Disfruta usando Puntos Rally! 🏆
