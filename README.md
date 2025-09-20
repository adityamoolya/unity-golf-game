# ⛳ CloneFest 2025 — Reimagining a C-based Minigolf Classic

Welcome to the **CloneFest 2025 Challenge Project** 🎉  

This is a **browser-based 3D MiniGolf game** built with **Three.js** for rendering and **Cannon-es** for physics.  

It combines fun gameplay with **realistic mechanics**, aligning with the official problem statement.

---
live url:http://golf-three-js.vercel.app
## 🏁 Challenge Overview

### 🎯 Core Objective


- Render a **3D golf course hole** in the browser  

- Provide an **interactive golf ball** with realistic movement 

- Implement **stroke tracking** and **hole completion detection**  

- Deliver a **clean UI** for scores and feedback  


### 🚀 Extended Features


- Full **Cannon-es physics integration** (ball mass, launch angle, restitution, friction)  

- **Multiple clubs** (driver, irons, wedges) with distinct shot physics  

- **Difficulty modes** (easy, medium, hard) that affect physics parameters  

- Interactive **camera controls** (orbit, zoom, pan)  

- HUD with **stroke count, par, and power bar**  

---

## ⚙️ Physics & Gameplay Mechanics


Our MiniGolf uses realistic physics powered by cannon-es
.


### 🏌️ Golf Ball


Mass: 45.93 g (0.04593 kg)

Radius: 0.0213 m (scaled ×5 for visibility)

Physics Body: CANNON.Sphere


### 🏌️ Clubs & Launch Angles


Each club produces a different launch angle and speed factor:

#### Club	Launch Angle	 Speed Factor

Driver	~15°	         1.00

Wood 3	~18°	         0.95

Hybrid	~20°	         0.92

Iron 2	~21°           0.90

Iron 3	~22.5°	       0.88

Iron 4	~24°           0.87

Iron 5	~24°	         0.85

Iron 6	~25.7°	       0.84

Iron 7	~25.7°	       0.83

Iron 8	~27.7°	       0.82

Iron 9	~30°	         0.81

Pitching Wedge ~32.7°	 0.80

Sand Wedge	~36°	     0.75

Lob Wedge	~40°	       0.70

---


## 🎚️ Difficulty Settings


Physics is tuned per difficulty:


### Impulse Power:


Easy → 5.5

Medium → 4.0

Hard → 3.0


### Friction:


Easy → 0.20

Medium → 0.35

Hard → 0.50


### Restitution (Bounciness):


Easy → 0.80

Medium → 0.60

Hard → 0.30

---


## 🎮 Controls


⬅️➡️ Left / Right Arrows → Adjust aim direction

⬆️⬇️ Up / Down Arrows → Move camera / ball preview

Spacebar (Hold + Release) → Charge and release shot (power factor)

Mouse Drag → Orbit camera

Scroll → Zoom in/out

---


## 🖥️ User Interface


🏌️ Stroke Counter → Updates after every shot

🎯 Par Display → Shows target par for hole

⚡ Power Bar → Visual feedback when charging shot

📍 HUD Overlay → Hole number, strokes, score

---


## 📸 Assets


⛳ Flagpole → Hole target

⚪ Golf Ball → Player’s ball (GLB model)

🌳 Tree / Obstacles → Environmental objects

🟩 Grass Texture → Ground surface

🎵 Sounds → Ball hit, hole-in, background ambience

---

## 📂 Project Structure  

```bash              
│
├── js                         # Entry point scripts
│   ├── main.js                # Main initialization script
│   ├── simple-game.js         # Simplified game version / demo
│   └── splash-integrator.js   # Handles splash screen or intro integration
│
├── modules                    # Core game logic & modular code
│   ├── components             # Components = specific managers & controllers
│   │   ├── AnimationController.js  # Handles animations
│   │   ├── HazardManager.js       # Spawns/controls hazards
│   │   ├── ObjectPlacer.js        # Places objects dynamically
│   │   ├── SkyboxManager.js       # Manages background/skybox
│   │   ├── TerrainDetection.js    # Detects terrain interactions
│   │   └── TerrainGenerator.js    # Procedurally generates terrain
│   │
│   ├── physics                # Physics-related scripts
│   │   ├── PhysicsEngine.js       # Core physics engine
│   │   ├── ShotController.js      # Controls ball shots
│   │   ├── TerrainInteraction.js  # Handles ball-terrain collisions
│   │   ├── UIInteractions.js      # Physics interactions tied to UI
│   │   └── VisualComponents.js    # Visual effects tied to physics
│   │
│   ├── BallPhysics.js         # Ball physics rules
│   ├── CameraController.js    # Camera logic & movements
│   ├── CourseBuilder.js       # Builds courses dynamically
│   ├── CourseConfig.js        # Stores config (par, holes, layout, etc.)
│   ├── GameState.js           # Tracks overall game state
│   ├── HoleGenerator.js       # Creates golf holes
│   ├── HoleSelector.js        # Logic to select which hole to play
│   ├── InputController.js     # Keyboard/mouse/gamepad input
│   ├── TerrainManager.js      # Manages terrain lifecycle
│   └── UIController.js        # Manages user interface
│
├── public                     # Static assets
│   └── sound.mp3              # Example sound effect file
│
├── README.md                  # Project documentation
├── index.html                 # Main HTML entry point
├── package-lock.json          # Dependency lock file
├── package.json               # Dependencies + scripts
└── vite.config.js             # Vite bundler configuration
