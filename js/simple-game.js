import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class SimpleGolfGame {
  constructor(opts = {}) {
    this.difficulty = opts.difficulty || 'easy';

    this.initThree();
    this.initCannon();
    this.buildScene();
    this.setupEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 20, 35);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.display = 'block';

    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer) gameContainer.appendChild(this.renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    this.scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(40, 60, 20);
    this.scene.add(dir);
  }

  initCannon() {
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.81, 0) });
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;

    // Materials per surfaces
    this.ballMaterial = new CANNON.Material('ball');
    this.groundMaterial = new CANNON.Material('ground');
    this.treeMaterial = new CANNON.Material('tree');
    // Contact: tune per difficulty
    const frictionByDifficulty = { easy: 0.2, medium: 0.35, hard: 0.5 };
    const restitutionByDifficulty = { easy: 0.8, medium: 0.6, hard: 0.3 };

    const contact = new CANNON.ContactMaterial(
      this.ballMaterial,
      this.treeMaterial,
      this.groundMaterial,
      {
        friction: frictionByDifficulty[this.difficulty] ?? 0.3,
        restitution: restitutionByDifficulty[this.difficulty] ?? 0.3,
      }
    );
    this.world.addContactMaterial(contact);

    // Time step
    this.fixedTimeStep = 1 / 60;
    this.maxSubSteps = 3;
  }

  buildScene() {
    // Ground plane (slightly uneven by difficulty)
    const groundSize = 200;
    const planeShape = new CANNON.Plane();
    this.groundBody = new CANNON.Body({ mass: 0, material: this.groundMaterial });
    this.groundBody.addShape(planeShape);
    this.world.addBody(this.groundBody);

    // Tilt based on difficulty to simulate slopes
    const tilt = this.difficulty === 'hard' ? 0.17 : this.difficulty === 'medium' ? 0.10 : 0.03;
    this.groundBody.quaternion.setFromEuler(-tilt, 0, 0);

    const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize, 1, 1);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x3a9d23 });
    this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.scene.add(this.groundMesh);

    // Ball
    const radius = 0.0213 * 5; // scale up meter size for visibility
    const mass = 0.04593;
    const sphereShape = new CANNON.Sphere(radius);

    this.ballBody = new CANNON.Body({ mass, material: this.ballMaterial, linearDamping: 0.03, angularDamping: 0.02 });
    this.ballBody.addShape(sphereShape);
    this.ballBody.position.set(0, radius + 2, 0);
    this.world.addBody(this.ballBody);

    const ballGeo = new THREE.SphereGeometry(radius, 32, 32);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.4 });
    this.ballMesh = new THREE.Mesh(ballGeo, ballMat);
    this.scene.add(this.ballMesh);

    // Simple UI: click and drag to aim power
    this.power = 0;
    this.aimDir = new THREE.Vector3(1, 0, 0);
    this.isCharging = false;

    // Power per difficulty
    this.maxImpulse = this.difficulty === 'hard' ? 3 : this.difficulty === 'medium' ? 4 : 5.5;

    // Add a simple hole target
    const holeRadius = 0.108 * 3;
    const holeGeo = new THREE.CircleGeometry(holeRadius, 64);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    this.holeMesh = new THREE.Mesh(holeGeo, holeMat);
    this.holeMesh.rotation.x = -Math.PI / 2;
    this.holeMesh.position.set(30, 0.001, -10);
    this.scene.add(this.holeMesh);
    this.holePosition = new THREE.Vector3(30, 0, -10);
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse controls: hold mouse to charge, release to shoot
    const canvas = this.renderer.domElement;

    const onDown = () => {
      if (this.isBallMoving()) return;
      this.isCharging = true;
      this.power = 0;
    };
    const onUp = () => {
      if (!this.isCharging) return;
      this.isCharging = false;
      // Shoot
      const dir = new CANNON.Vec3(this.aimDir.x, 0.15, this.aimDir.z).unit();
      const impulse = this.maxImpulse * this.power;
      this.ballBody.wakeUp();
      this.ballBody.applyImpulse(dir.scale(impulse), this.ballBody.position);
    };
    const onMove = (e) => {
      if (this.isBallMoving()) return;
      // Map mouse to aim direction relative to screen center
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cz = rect.top + rect.height / 2;
      const x = (e.clientX - cx) / (rect.width / 2);
      const z = (e.clientY - cz) / (rect.height / 2);
      this.aimDir.set(x, 0, z).normalize();
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointermove', onMove);

    // Keyboard: arrows to aim, Space to charge/release
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowLeft') {
        this.rotateAim(-0.05);
      } else if (e.code === 'ArrowRight') {
        this.rotateAim(0.05);
      } else if (e.code === 'Space') {
        if (!this.isBallMoving() && !this.isCharging) {
          this.isCharging = true;
          this.power = 0;
        }
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        if (this.isCharging) {
          this.isCharging = false;
          const dir = new CANNON.Vec3(this.aimDir.x, 0.15, this.aimDir.z).unit();
          const impulse = this.maxImpulse * this.power;
          this.ballBody.wwakeUp?.();
          this.ballBody.wakeUp();
          this.ballBody.applyImpulse(dir.scale(impulse), this.ballBody.position);
        }
        e.preventDefault();
      }
    });
  }

  rotateAim(deltaYaw) {
    // rotate aim on XZ plane
    const yaw = Math.atan2(this.aimDir.z, this.aimDir.x) + deltaYaw;
    this.aimDir.set(Math.cos(yaw), 0, Math.sin(yaw)).normalize();
  }

  isBallMoving() {
    return this.ballBody.velocity.length() > 0.05;
  }

  animate(ts) {
    if (this.isCharging) {
      this.power += 0.02;
      if (this.power > 1) this.power = 1;
    }

    this.world.step(this.fixedTimeStep, 1 / 60, this.maxSubSteps);

    // Sync Three from Cannon
    this.ballMesh.position.copy(this.ballBody.position);
    this.ballMesh.quaternion.copy(this.ballBody.quaternion);

    // Check hole capture (speed threshold ~ 1.8 m/s scaled)
    const speed = this.ballBody.velocity.length();
    const distToHole = this.ballMesh.position.distanceTo(this.holePosition);
    if (distToHole <= 0.108 * 3 && speed <= 1.8) {
      // Sink ball
      this.ballBody.velocity.set(0, 0, 0);
      this.ballBody.angularVelocity.set(0, 0, 0);
      this.ballBody.position.set(this.holePosition.x, 0.0, this.holePosition.z);
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }
}

// Expose globally
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.SimpleGolfGame = SimpleGolfGame;
}
