// ==========================================
// 1. 2000cc SOUND SYNTHESIZER
// ==========================================
class DavidPutraAudio {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.gain = null;
    this.muted = false;
    this.running = false;
  }

  init() {
    try {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.osc1 = this.ctx.createOscillator();
      this.osc2 = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 620;

      this.osc1.type = 'sawtooth';
      this.osc2.type = 'square';
      this.osc1.frequency.value = 36;
      this.osc2.frequency.value = 72;

      this.gain.gain.value = 0.0001;

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.gain);
      this.gain.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.running = true;
    } catch (e) {}
  }

  updateEngine(speedRatio, isThrottling, isNitro, isAirborne, playing) {
    if (!this.ctx || !this.running) return;
    if (this.muted || !playing) {
      this.gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.05);
      return;
    }
    const gearMod = (speedRatio * 5) % 1;
    const throttleBoost = isThrottling ? 24 : 0;
    const airRev = isAirborne ? 38 : 0;
    const baseFreq = 35 + speedRatio * 125 + gearMod * 35 + throttleBoost + (isNitro ? 48 : 0) + airRev;
    this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.04);
    this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, this.ctx.currentTime, 0.04);
    const targetVol = isNitro ? 0.15 : (isThrottling ? 0.10 : 0.045);
    this.gain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.05);
  }

  playBeep(freq = 520, duration = 0.15) {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.2, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playJumpLaunch() {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.32);
    g.gain.setValueAtTime(0.2, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playLandingThump() {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(125, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(36, this.ctx.currentTime + 0.2);
    g.gain.setValueAtTime(0.3, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.22);
  }

  playCoin() {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.12);
    g.gain.setValueAtTime(0.16, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.22);
  }

  playNearMiss() {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(460, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.2);
    g.gain.setValueAtTime(0.2, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.22);
  }

  playHorn() {
    if (!this.ctx || this.muted) return;
    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o1.type = 'sawtooth';
    o2.type = 'sawtooth';
    o1.frequency.value = 390;
    o2.frequency.value = 480;
    g.gain.setValueAtTime(0.22, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.32);
    o1.connect(g);
    o2.connect(g);
    g.connect(this.ctx.destination);
    o1.start();
    o2.start();
    o1.stop(this.ctx.currentTime + 0.32);
    o2.stop(this.ctx.currentTime + 0.32);
  }

  playCrash() {
    if (!this.ctx || this.muted) return;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(820, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.38);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.42, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(g);
    g.connect(this.ctx.destination);
    noise.start();
  }
}

const sound = new DavidPutraAudio();

// ==========================================
// 2. THREE.JS WORLD & ENVIRONMENT
// ==========================================
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x38bdf8);
scene.fog = new THREE.FogExp2(0x38bdf8, 0.005);

const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 420);

function createAsphaltTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#1c2230';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 15000; i++) {
    const v = 24 + Math.floor(Math.random() * 30);
    ctx.fillStyle = `rgb(${v},${v + 2},${v + 6})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 55);
  return tex;
}

function createRampTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#111827';
  for (let i = -256; i < 512; i += 48) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 24, 0);
    ctx.lineTo(i + 280, 256);
    ctx.lineTo(i + 256, 256);
    ctx.closePath();
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function create2000ccBadgeTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 248, 120);
  ctx.fillStyle = '#fbbf24';
  ctx.font = '900 30px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DAVID PUTRA', 128, 50);
  ctx.fillStyle = '#f43f5e';
  ctx.font = '900 40px sans-serif';
  ctx.fillText('2000cc', 128, 100);
  return new THREE.CanvasTexture(c);
}

const asphaltTex = createAsphaltTexture();
const rampTex = createRampTexture();
const badge2000Tex = create2000ccBadgeTexture();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.35);
sunLight.position.set(25, 55, 25);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 1024;
sunLight.shadow.mapSize.height = 1024;
scene.add(sunLight);

const skyOrb = new THREE.Mesh(
  new THREE.CircleGeometry(36, 32),
  new THREE.MeshBasicMaterial({ color: 0xfff08a })
);
skyOrb.position.set(0, 42, -290);
scene.add(skyOrb);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 450),
  new THREE.MeshStandardMaterial({ color: 0x2e6f40, roughness: 0.9 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.08, -160);
scene.add(ground);

const ROAD_WIDTH = 16;
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(ROAD_WIDTH, 420),
  new THREE.MeshStandardMaterial({ map: asphaltTex, roughness: 0.4, metalness: 0.3 })
);
road.rotation.x = -Math.PI / 2;
road.position.z = -160;
road.receiveShadow = true;
scene.add(road);

const railGeo = new THREE.BoxGeometry(0.4, 0.75, 420);
const leftRail = new THREE.Mesh(railGeo, new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
leftRail.position.set(-ROAD_WIDTH / 2 - 0.22, 0.38, -160);
scene.add(leftRail);

const rightRail = new THREE.Mesh(railGeo, new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
rightRail.position.set(ROAD_WIDTH / 2 + 0.22, 0.38, -160);
scene.add(rightRail);

const laneLines = [];
const stripeGeo = new THREE.PlaneGeometry(0.24, 4.8);
const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
for (let z = 10; z > -270; z -= 14) {
  [-4, 0, 4].forEach(lx => {
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(lx, 0.03, z);
    scene.add(stripe);
    laneLines.push(stripe);
  });
}

const sceneryObjs = [];
const bColors = [0x334155, 0x1e293b, 0x475569, 0x0f172a];
for (let i = 0; i < 44; i++) {
  const h = 12 + Math.random() * 34;
  const w = 5.5 + Math.random() * 6;
  const bMesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, w),
    new THREE.MeshStandardMaterial({ color: bColors[i % bColors.length], roughness: 0.5, metalness: 0.3 })
  );
  const side = i % 2 === 0 ? -1 : 1;
  bMesh.position.set(side * (ROAD_WIDTH / 2 + 7 + Math.random() * 18), h / 2, -i * 6.5);
  scene.add(bMesh);
  sceneryObjs.push(bMesh);
}

// ==========================================
// 3. DAVID PUTRA 2000cc 3D MODEL
// ==========================================
const bikeGroup = new THREE.Group();
scene.add(bikeGroup);

const bikePaintMat = new THREE.MeshStandardMaterial({
  color: 0xe11d48,
  metalness: 0.78,
  roughness: 0.16,
  emissive: 0xe11d48,
  emissiveIntensity: 0.16
});

const goldChromeMat = new THREE.MeshStandardMaterial({
  color: 0xfbbf24,
  metalness: 0.92,
  roughness: 0.12,
  emissive: 0xff9900,
  emissiveIntensity: 0.18
});

const neonAccentMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
const riderSuitMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 });

const chassisGroup = new THREE.Group();
bikeGroup.add(chassisGroup);

const tireGeo = new THREE.TorusGeometry(0.58, 0.22, 14, 28);
const tireMat = new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.85 });
const rimGeo = new THREE.TorusGeometry(0.42, 0.065, 10, 24);

function createMonsterWheel(zPos, scaleWidth = 1) {
  const wGroup = new THREE.Group();
  const tire = new THREE.Mesh(tireGeo, tireMat);
  tire.rotation.y = Math.PI / 2;
  tire.scale.z = scaleWidth;
  const rim = new THREE.Mesh(rimGeo, neonAccentMat);
  rim.rotation.y = Math.PI / 2;
  wGroup.add(tire, rim);
  wGroup.position.set(0, 0.68, zPos);
  return wGroup;
}

const frontWheel = createMonsterWheel(-1.35, 1.0);
const rearWheel = createMonsterWheel(1.22, 1.35);
chassisGroup.add(frontWheel, rearWheel);

const forkGeo = new THREE.CylinderGeometry(0.06, 0.05, 1.15, 12);
const forkL = new THREE.Mesh(forkGeo, goldChromeMat);
forkL.position.set(-0.24, 1.05, -1.1);
forkL.rotation.x = -0.38;
const forkR = forkL.clone();
forkR.position.x = 0.24;
chassisGroup.add(forkL, forkR);

const mainBody = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.72, 2.25), bikePaintMat);
mainBody.position.set(0, 1.2, -0.05);
mainBody.castShadow = true;
chassisGroup.add(mainBody);

const badgeGeo = new THREE.PlaneGeometry(0.95, 0.42);
const badgeMat = new THREE.MeshBasicMaterial({ map: badge2000Tex });
const badgeL = new THREE.Mesh(badgeGeo, badgeMat);
badgeL.position.set(-0.43, 1.25, -0.1);
badgeL.rotation.y = -Math.PI / 2;
const badgeR = new THREE.Mesh(badgeGeo, badgeMat);
badgeR.position.set(0.43, 1.25, -0.1);
badgeR.rotation.y = Math.PI / 2;
chassisGroup.add(badgeL, badgeR);

const cyl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.55, 12), goldChromeMat);
cyl1.position.set(0, 0.85, -0.35);
cyl1.rotation.z = Math.PI / 2;
chassisGroup.add(cyl1);

const nose = new THREE.Mesh(new THREE.ConeGeometry(0.52, 1.0, 4), bikePaintMat);
nose.rotation.x = -Math.PI / 2;
nose.rotation.z = Math.PI / 4;
nose.position.set(0, 1.28, -1.42);
chassisGroup.add(nose);

const windshield = new THREE.Mesh(
  new THREE.BoxGeometry(0.62, 0.38, 0.7),
  new THREE.MeshStandardMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.65 })
);
windshield.position.set(0, 1.58, -0.88);
windshield.rotation.x = 0.45;
chassisGroup.add(windshield);

const megaSilencerL = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.10, 1.35, 16), goldChromeMat);
megaSilencerL.rotation.x = Math.PI / 2 + 0.22;
megaSilencerL.position.set(-0.48, 1.02, 1.08);
const megaSilencerR = megaSilencerL.clone();
megaSilencerR.position.x = 0.48;
chassisGroup.add(megaSilencerL, megaSilencerR);

const flameGeo = new THREE.ConeGeometry(0.22, 1.5, 12);
const flameMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
const flameL = new THREE.Mesh(flameGeo, flameMat);
flameL.rotation.x = Math.PI / 2;
flameL.position.set(-0.48, 1.15, 1.95);
const flameR = flameL.clone();
flameR.position.x = 0.48;
flameL.visible = false;
flameR.visible = false;
chassisGroup.add(flameL, flameR);

const riderGroup = new THREE.Group();
chassisGroup.add(riderGroup);

const torso = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.86, 0.44), riderSuitMat);
torso.position.set(0, 1.82, 0.18);
torso.rotation.x = 0.65;
riderGroup.add(torso);

const vestStripe = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.8), neonAccentMat);
vestStripe.position.set(0, 0, 0.23);
torso.add(vestStripe);

const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 18), bikePaintMat);
helmet.position.set(0, 2.28, -0.22);
riderGroup.add(helmet);

const visor = new THREE.Mesh(
  new THREE.SphereGeometry(0.31, 14, 14, 0, Math.PI, 0, Math.PI * 0.45),
  neonAccentMat
);
visor.rotation.x = -0.3;
visor.position.set(0, 0.02, -0.06);
helmet.add(visor);

const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.78);
const armL = new THREE.Mesh(armGeo, riderSuitMat);
armL.position.set(-0.4, 1.78, -0.36);
armL.rotation.x = 1.1;
armL.rotation.z = -0.2;
const armR = armL.clone();
armR.position.x = 0.4;
armR.rotation.z = 0.2;
riderGroup.add(armL, armR);

const energyShield = new THREE.Mesh(
  new THREE.SphereGeometry(2.1, 18, 18),
  new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.5 })
);
energyShield.position.set(0, 1.2, 0);
energyShield.visible = false;
chassisGroup.add(energyShield);

// ==========================================
// 4. SLOPES, BOOST PADS, TRAFFIC & COINS
// ==========================================
const lanes = [-5.5, -1.8, 1.8, 5.5];
const stuntRamps = [];

function createStuntRamp() {
  const rGroup = new THREE.Group();
  const rampMesh = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.35, 5.2),
    new THREE.MeshStandardMaterial({ map: rampTex, roughness: 0.4 })
  );
  rampMesh.rotation.x = 0.24;
  rampMesh.position.y = 0.55;

  const sideGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const leftBar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.4, 5.2), sideGlowMat);
  leftBar.rotation.x = 0.24;
  leftBar.position.set(-1.75, 0.6, 0);
  const rightBar = leftBar.clone();
  rightBar.position.x = 1.75;

  rGroup.add(rampMesh, leftBar, rightBar);
  scene.add(rGroup);
  return { mesh: rGroup, laneX: 0 };
}

for (let i = 0; i < 3; i++) {
  const ramp = createStuntRamp();
  ramp.laneX = lanes[i % lanes.length];
  ramp.mesh.position.set(ramp.laneX, 0, -85 - i * 95);
  stuntRamps.push(ramp);
}

const boostPads = [];
const boostGeo = new THREE.PlaneGeometry(2.6, 6.0);
const boostMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
for (let i = 0; i < 2; i++) {
  const pad = new THREE.Mesh(boostGeo, boostMat);
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(lanes[(i + 1) % 4], 0.04, -120 - i * 130);
  scene.add(pad);
  boostPads.push(pad);
}

const trafficCars = [];
const carColors = [0xf43f5e, 0x0ea5e9, 0xeab308, 0x8b5cf6, 0x10b981];

function createTrafficCar() {
  const cGroup = new THREE.Group();
  const col = carColors[Math.floor(Math.random() * carColors.length)];
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(2.15, 0.78, 4.5),
    new THREE.MeshStandardMaterial({ color: col, roughness: 0.25, metalness: 0.7 })
  );
  base.position.y = 0.65;
  base.castShadow = true;

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.78, 0.6, 2.25),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.9 })
  );
  cabin.position.set(0, 1.26, -0.2);

  const tail = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.2, 0.1),
    new THREE.MeshBasicMaterial({ color: 0xff0033 })
  );
  tail.position.set(0, 0.75, 2.26);

  cGroup.add(base, cabin, tail);
  scene.add(cGroup);
  return {
    mesh: cGroup,
    laneX: 0,
    speed: 0.22 + Math.random() * 0.16,
    passed: false
  };
}

for (let i = 0; i < 6; i++) {
  const car = createTrafficCar();
  car.laneX = lanes[i % 4];
  car.mesh.position.set(car.laneX, 0, -55 - i * 44);
  trafficCars.push(car);
}

const coins = [];
const coinGeo = new THREE.TorusGeometry(0.48, 0.15, 12, 24);
const coinMat = new THREE.MeshStandardMaterial({
  color: 0xfbbf24,
  emissive: 0xff9900,
  emissiveIntensity: 0.55,
  metalness: 0.9,
  roughness: 0.15
});

for (let i = 0; i < 10; i++) {
  const cMesh = new THREE.Mesh(coinGeo, coinMat);
  cMesh.position.set(lanes[i % 4], 1.15, -35 - i * 26);
  scene.add(cMesh);
  coins.push(cMesh);
}

// ==========================================
// 5. AI TITAN BOT & CONTROLS LOGIC
// ==========================================
const aiModal = document.getElementById('ai-modal');
const aiChatBody = document.getElementById('ai-chat-body');
const aiInput = document.getElementById('ai-input');

document.getElementById('ai-bot-btn').addEventListener('click', () => {
  aiModal.classList.remove('hidden');
});

document.getElementById('ai-close-btn').addEventListener('click', () => {
  aiModal.classList.add('hidden');
});

function appendAiMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `ai-msg ${sender}`;
  div.innerHTML = text;
  aiChatBody.appendChild(div);
  aiChatBody.scrollTop = aiChatBody.scrollHeight;
}

document.getElementById('ai-send-btn').addEventListener('click', () => {
  const txt = aiInput.value.trim();
  if (!txt) return;
  appendAiMessage(txt, 'user');
  aiInput.value = '';

  setTimeout(() => {
    const lower = txt.toLowerCase();
    if (lower.includes('founder') || lower.includes('creator') || lower.includes('who made') || lower.includes('owner') || lower.includes('banane wala')) {
      appendAiMessage("This game was proudly crafted and founded by <b>Saurabh Sugreev Rupnar</b> and his expert development team! 🚀", 'bot');
    } else {
      appendAiMessage("Thank you for your message! Your query has been recorded and submitted to <b>Saurabh Sugreev Rupnar</b> and his engineering team. We will try to resolve it within 24 hours (Ticket #SSR-2026).", 'bot');
    }
  }, 600);
});

let controlMode = 'buttons';
let gyroTiltX = 0;
let rawGamma = 0;
let rawBeta = 0;
let gyroOffset = 0;
let gyroListening = false;

function handleOrientation(e) {
  if (e.gamma === null && e.beta === null) return;
  rawGamma = e.gamma || 0;
  rawBeta = e.beta || 0;
  const isLandscape = window.innerWidth > window.innerHeight;
  const activeAngle = isLandscape ? rawBeta : rawGamma;
  const adjusted = activeAngle - gyroOffset;
  gyroTiltX = Math.max(-1, Math.min(1, adjusted / 24));
}

function requestGyroPermissionNonBlocking() {
  try {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(perm => {
          if (perm === 'granted' && !gyroListening) {
            window.addEventListener('deviceorientation', handleOrientation, true);
            gyroListening = true;
          }
        })
        .catch(() => {});
    } else if (!gyroListening) {
      window.addEventListener('deviceorientation', handleOrientation, true);
      gyroListening = true;
    }
  } catch (e) {}
}

function calibrateGyroCenter() {
  const isLandscape = window.innerWidth > window.innerHeight;
  gyroOffset = isLandscape ? rawBeta : rawGamma;
  showCombo('GYRO RE-CENTERED');
}

function setControlModeUI(mode) {
  controlMode = mode;
  document.getElementById('pick-buttons').classList.toggle('active', mode === 'buttons');
  document.getElementById('pick-gyro').classList.toggle('active', mode === 'gyro');
  document.getElementById('ctrl-toggle-btn').innerText = mode === 'gyro' ? '📱' : '🎮';
  document.getElementById('gyro-recenter-chip').style.display = mode === 'gyro' ? 'block' : 'none';
  document.getElementById('steer-touch-group').style.visibility = mode === 'gyro' ? 'hidden' : 'visible';
}

document.getElementById('pick-buttons').addEventListener('click', () => setControlModeUI('buttons'));
document.getElementById('pick-gyro').addEventListener('click', () => {
  setControlModeUI('gyro');
  requestGyroPermissionNonBlocking();
});

document.getElementById('ctrl-toggle-btn').addEventListener('click', () => {
  if (controlMode === 'buttons') {
    requestGyroPermissionNonBlocking();
    setControlModeUI('gyro');
    calibrateGyroCenter();
  } else {
    setControlModeUI('buttons');
  }
});

document.getElementById('gyro-recenter-chip').addEventListener('click', calibrateGyroCenter);

// ==========================================
// 6. GAMEPLAY STATE & LOOPS
// ==========================================
let gameActive = false;
let countdownActive = false;
let score = 0;
let coinCount = 0;
let stuntCount = 0;
let comboMultiplier = 1;
let comboTimer = 0;
let lives = 3;
let invincibleTimer = 0;
let bestScore = Number(localStorage.getItem('rupnar_dp2000_best') || 0);
document.getElementById('best-val').innerText = bestScore;

const IDLE_SPEED = 0.064;
const MAX_RACE_SPEED = 1.15;
const MAX_NITRO_SPEED = 1.68;
let speed = IDLE_SPEED;
let nitroAmount = 100;
let padBoostTimer = 0;

let bikeX = 0;
let bikeY = 0;
let bikeVelY = 0;
const GRAVITY = 0.017;
let isAirborne = false;
let currentLean = 0;
let currentPitch = 0;

let timeMode = 0;
let cycleClock = 0;
let camMode = 0;

const skyPalettes = [
  { sky: new THREE.Color(0x38bdf8), light: new THREE.Color(0xfffbeb), orb: new THREE.Color(0xfff08a), ground: new THREE.Color(0x2e6f40) },
  { sky: new THREE.Color(0xf97316), light: new THREE.Color(0xfde047), orb: new THREE.Color(0xff2a6d), ground: new THREE.Color(0x451a03) },
  { sky: new THREE.Color(0x050816), light: new THREE.Color(0x38bdf8), orb: new THREE.Color(0xe2e8f0), ground: new THREE.Color(0x090d16) }
];

function updateDayNightEnvironment(dt) {
  let pA, pB, blend;
  if (timeMode === 1) { pA = pB = skyPalettes[0]; blend = 0; }
  else if (timeMode === 2) { pA = pB = skyPalettes[1]; blend = 0; }
  else if (timeMode === 3) { pA = pB = skyPalettes[2]; blend = 0; }
  else {
    cycleClock += dt * 0.045;
    const idx = Math.floor(cycleClock) % 3;
