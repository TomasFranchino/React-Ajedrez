# Juego de Ajedrez en React🎮♟️
![image](https://github.com/user-attachments/assets/f9e362dd-c049-4114-b972-25e72dfbf5ec) ![image](https://github.com/user-attachments/assets/1ec5ed7b-f2da-49ed-9889-5776ea621f23)


Este proyecto es una implementación interactiva de un juego de ajedrez desarrollado con React y JavaScript. El objetivo principal es ofrecer una experiencia visual y funcional completa que permita a los usuarios jugar partidas de ajedrez directamente desde el navegador, respetando las reglas oficiales del juego.

#Características principales ✨
1. Tablero interactivo
  - Representación gráfica de un tablero de 8x8 completamente funcional.
  - Movimientos de piezas mediante arrastrar y soltar (drag & drop).

2. Validación de reglas del ajedrez
  - Movimientos legales de todas las piezas: peones, torres, caballos, alfiles, damas y reyes.
  - Gestión de situaciones especiales como:
    - Enroque (corto y largo), con validación de reglas (piezas no movidas, sin pasar por casillas atacadas).
    - Promoción de peones al llegar a la última fila.
    - Captura al paso (en passant).

3. Detección de Jaque y Jaque Mate
  - Identificación en tiempo real de situaciones de jaque a los reyes.
  - Verificación de jaque mate con validación de movimientos posibles para evitarlo.

4. Turnos dinámicos
  - Alternancia de turnos entre jugadores blancos y negros.

5. Reinicio del juego
  - Opción para reiniciar la partida y comenzar una nueva.

6. Diseño modular y escalable
  - Componentes separados para el tablero, las piezas y la lógica del juego.
  - Fácil de mantener y ampliar.

#Objetivos del proyecto 🎯
Este proyecto busca ser una base sólida para:
- Aprender React y JavaScript aplicados a un proyecto práctico.
- Profundizar en la lógica de programación necesaria para implementar reglas complejas como las del ajedrez.
- Crear una experiencia amigable y accesible para jugadores de todos los niveles.


#Próximas mejoras 🚀
- Contemplar el empate por Tablas
- Implementar un modo multijugador en línea.
- Agregar un historial de movimientos.
- Incorporar IA para jugar contra la computadora.
- Mejorar la interfaz visual con animaciones y temas personalizables.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
