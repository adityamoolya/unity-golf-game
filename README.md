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
mini-golf/
│
├── index.html              # Entry point
├── styles/
│   └── style.css           # UI styling
│
├── src/
│   ├── main.js             # Initializes everything (entry script)
│   │
│   ├── core/               # Three.js setup
│   │   ├── scene.js
│   │   ├── camera.js
│   │   ├── renderer.js
│   │   ├── lighting.js
│   │   └── controls.js
│   │
│   ├── objects/            # World objects
│   │   ├── ball.js
│   │   ├── course.js
│   │   ├── hole.js
│   │   └── obstacles.js
│   │
│   ├── mechanics/          # Gameplay + physics
│   │   ├── physics.js
│   │   ├── input.js
│   │   └── gameplay.js
│   │
│   ├── ui/                 # Interface
│   │   ├── hud.js
│   │   ├── powerbar.js
│   │   └── menu.js
│   │
│   └── utils/              # Helpers
│       ├── loader.js
│       └── math.js
│
├── assets/
│   ├── models/             # 3D models (ball, stick, flag, tree)
│   ├── textures/           # Grass, wood, etc.
│   └── sounds/             # Ball hit, hole-in-one, bg music
│
└── package.json            # Config (if using npm/vite)
