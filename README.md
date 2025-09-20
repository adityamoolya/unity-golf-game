# Unity 3D First-Person Golf Game

A complete 3D first-person golf game prototype built in Unity. This project features a seamless main menu, multi-level system with dynamic teleportation, realistic physics-based shooting mechanics, and a full UI suite.

---

## 🌐 Live Links

The project has multiple live deployments:

- **Main Hub:** [https://golf-submission.vercel.app/](https://golf-submission.vercel.app/)  
  - Within this hub:
    - **Three.js version:** [https://golf-three-js.vercel.app/](https://golf-three-js.vercel.app/)  
      - Code is located in the `three.js` branch of this repo: [https://github.com/adityamoolya/unity-golf-game/tree/withthree.js](https://github.com/adityamoolya/unity-golf-game/tree/withthree.js)  
    - **Unity WebGL version:** [https://unity-golf-game-very-final.vercel.app/](https://unity-golf-game-very-final.vercel.app/)

---

## About The Project

This project is a **3D golf game prototype** combining a first-person controller with an aiming and shooting system. Players navigate a low-poly environment and complete multiple holes.  

The **modular script architecture** manages player input, ball physics, UI updates, and level progression seamlessly.

---

## Features

### Seamless Main Menu
- Cinematic rotating camera showcasing the game world.
- UI overlay for starting the game.

### First-Person Controller
- WASD movement
- Mouse look for navigation

### Advanced Shooting Mechanic
- Hold **Right Mouse Button** to aim and charge power
- Dynamic **Power Meter UI**
- **Line Renderer** for projectile trajectory with gravity and drag
- Directional constraint ensures correct stance
- Press **Left Mouse Button** to shoot

### Third-Person Follow Camera
- Switches after shooting
- Follows the ball until it lands

### Multi-Level System
- `LevelManager` teleports player, ball, and flag after each hole
- Easily extendable with new spawn points

### Complete UI Suite
- HUD: Stroke Count, Game Timer, Distance to Pin
- "Hole Complete" screen with strokes, time, and score

### Player Helpers
- Press **F** to show line to flag
- Press **B** to show line to ball

### Animation Integration
- Mixamo character with looping idle animation
- "Swing" animation triggers on shooting

---

## Built With
- Unity 2022.3.10f1

---

## Getting Started

### Prerequisites
- Unity Hub and Unity Editor 2022.3.10f1 or later

### Installation
```bash
# Clone the repository
git clone https://github.com/your_username/your_repository_name.git
