// ==========================================
// 0. 2-SECOND @youngmaster1143 INTRO SPLASH
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('intro-splash');
  setTimeout(() => {
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 600);
    }
  }, 2100);
});

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
      filter.frequency.value = 680;

      this.osc1.type = 'sawtooth';
      this.osc2.type = 'square';
      this.osc1.frequency.value = 38;
      this.osc2.frequency.value = 76;

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
    const throttleBoost = isThrottling ? 26 : 0;
    const airRev = isAirborne ? 42 : 0;
    const baseFreq = 36 + speedRatio * 130 + gearMod * 36 + throttleBoost + (isNitro ? 52 : 0) + airRev;
    this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.04);
    this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, this.ctx.currentTime, 0.04);
    const targetVol = isNitro ? 0.16 : (isThrottling ? 0.11 : 0.045);
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
    osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.32);
    g.gain.setValueAtTime(0.22, this.ctx.currentTime);
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
    osc.frequency.setValueAtTime(130, this.ctx.currentTime);
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
    osc.frequency.setValueAtTime(480, this.ctx.currentTime);
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
    o1.frequency.value = 410;
    o2.frequency.value = 512;
    g.gain.setValueAtTime(0.24, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    o1.connect(g);
    o2.connect(g);
    g.connect(this.ctx.destination);
    o1.start();
    o2.start();
    o1.stop(this.ctx.currentTime + 0.35);
    o2.stop(this.ctx.currentTime + 0.35);
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
// 2. THREE.JS VICE CITY WORLD & TEXTURES
// ==========================================
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a0845);
scene.fog = new THREE.FogExp2(0xff2a85, 0.0045);

const camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 0.1, 440);

function createAsphaltTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#141224';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 12000; i++) {
    const v = 20 + Math.floor(Math.random() * 28);
    ctx.fillStyle = `rgb(${v},${v},${v + 12})`;
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
  ctx.fillStyle = '#ff0055';
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
  ctx.fillStyle = '#090514';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 248, 120);
  ctx.fillStyle = '#00f0ff';
  ctx.font = '900 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DAVID PUTRA', 128, 46);
  ctx.fillStyle = '#ff0055';
  ctx.font = '900 38px sans-serif';
  ctx.fillText('2000cc', 128, 88);
  ctx.fillStyle = '#fbbf24';
  ctx.font = '700 18px sans-serif';
  ctx.fillText('@rupnar5aurabh', 128, 114);
  return new THREE.CanvasTexture(c);
}

function createBadmosDoraemonFaceTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');

  // Classic Doraemon Blue Base
  ctx.fillStyle = '#00a0e9';
  ctx.fillRect(0, 0, 512, 512);

  // White Face Patch
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(256, 295, 175, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#111';
  ctx.stroke();

  // Eyes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(215, 165, 38, 46, 0, 0, Math.PI * 2);
  ctx.ellipse(297, 165, 38, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Red Nose
  ctx.fillStyle = '#ff0033';
  ctx.beginPath();
  ctx.arc(256, 215, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(248, 208, 7, 0, Math.PI * 2);
  ctx.fill();

  // Whiskers
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 6;
  [-1, 1].forEach(dir => {
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(256 + dir * 55, 255 + i * 22);
      ctx.lineTo(256 + dir * 145, 245 + i * 30);
      ctx.stroke();
    }
  });

  // BADMOS SMIRK SMILE (Crooked Rebel Grin)
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#111';
  ctx.moveTo(175, 330);
  ctx.quadraticCurveTo(265, 395, 355, 295);
  ctx.stroke();

  // Badmos Gold Tooth Glint
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(325, 318, 12, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(c);
}

function createBillboardTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 512, 256);
  grad.addColorStop(0, '#1f093d');
  grad.addColorStop(0.5, '#ff0055');
  grad.addColorStop(1, '#090514');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 496, 240);

  ctx.fillStyle = '#fbbf24';
  ctx.font = '900 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KING OF VICE CITY', 256, 70);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px sans-serif';
  ctx.fillText('@rupnar5aurabh', 256, 140);

  ctx.fillStyle = '#00f0ff';
  ctx.font = '800 28px sans-serif';
  ctx.fillText('DAVID PUTRA 2000cc • BADMOS EDITION', 256, 205);

  return new THREE.CanvasTexture(c);
}

const asphaltTex = createAsphaltTexture();
const rampTex = createRampTexture();
const badge2000Tex = create2000ccBadgeTexture();
const doraemonFaceTex = createBadmosDoraemonFaceTexture();
const billboardTex = createBillboardTexture();

const ambientLight = new THREE.AmbientLight(0xffb4e6, 0.9);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffd166, 1.4);
sunLight.position.set(25, 55, 25);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 1024;
sunLight.shadow.mapSize.height = 1024;
scene.add(sunLight);

// Vice City Retro Synthwave Sun
const skyOrb = new THREE.Mesh(
  new THREE.CircleGeometry(42, 32),
  new THREE.MeshBasicMaterial({ color: 0xff2a85 })
);
skyOrb.position.set(0, 44, -295);
scene.add(skyOrb);

// Miami Beach Ground & Ocean Strip
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 460),
  new THREE.MeshStandardMaterial({ color: 0x160a2c, roughness: 0.85 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.08, -160);
scene.add(ground);

const ROAD_WIDTH = 16;
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(ROAD_WIDTH, 420),
  new THREE.MeshStandardMaterial({ map: asphaltTex, roughness: 0.25, metalness: 0.45 })
);
road.rotation.x = -Math.PI / 2;
road.position.z = -160;
road.receiveShadow = true;
scene.add(road);

const railGeo = new THREE.BoxGeometry(0.4, 0.75, 420);
const leftRail = new THREE.Mesh(railGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
leftRail.position.set(-ROAD_WIDTH / 2 - 0.22, 0.38, -160);
scene.add(leftRail);

const rightRail = new THREE.Mesh(railGeo, new THREE.MeshBasicMaterial({ color: 0xff0055 }));
rightRail.position.set(ROAD_WIDTH / 2 + 0.22, 0.38, -160);
scene.add(rightRail);

const laneLines = [];
const stripeGeo = new THREE.PlaneGeometry(0.24, 4.8);
const stripeMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
for (let z = 10; z > -270; z -= 14) {
  [-4, 0, 4].forEach(lx => {
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(lx, 0.03, z);
    scene.add(stripe);
    laneLines.push(stripe);
  });
}

// ==========================================
// 2B. VICE CITY PALM TREES, BILLBOARDS & HANDSOME NPCs
// ==========================================
const sceneryObjs = [];
const bColors = [0x240b36, 0x1a103c, 0x3b0d54, 0x0f172a];
const neonTrimColors = [0xff0055, 0x00f0ff, 0xfbbf24];

function createPalmTree() {
  const pGroup = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.32, 6.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 })
  );
  trunk.position.y = 3.25;
  pGroup.add(trunk);

  const leafMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x052e16, roughness: 0.6 });
  for (let a = 0; a < 6; a++) {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.65, 3.2, 5), leafMat);
    leaf.position.set(Math.cos(a * 1.05) * 1.1, 6.4, Math.sin(a * 1.05) * 1.1);
    leaf.rotation.z = -Math.cos(a * 1.05) * 1.1;
    leaf.rotation.x = Math.sin(a * 1.05) * 1.1;
    pGroup.add(leaf);
  }
  return pGroup;
}

function createHandsomeNPC(idx) {
  const npc = new THREE.Group();
  const jacketColors = [0xff0055, 0x00f0ff, 0xfbbf24, 0xffffff, 0x9333ea];
  // Legs
  const legs = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.9, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x1e293b })
  );
  legs.position.y = 0.45;
  // Stylish Jacket Torso
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.85, 0.35),
    new THREE.MeshStandardMaterial({ color: jacketColors[idx % jacketColors.length] })
  );
  body.position.y = 1.3;
  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xf1c27d })
  );
  head.position.y = 1.95;
  // Cool Spiky Hair
  const hair = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.2, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x111111 })
  );
  hair.position.y = 2.15;
  // Black Sunglasses
  const shades = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.12, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );
  shades.position.set(0, 1.96, 0.2);

  npc.add(legs, body, head, hair, shades);
  return npc;
}

const npcList = [];

for (let i = 0; i < 40; i++) {
  const side = i % 2 === 0 ? -1 : 1;
  const zPos = -i * 7;

  // Neon Vice City Hotel Building
  const h = 14 + Math.random() * 32;
  const w = 6 + Math.random() * 6;
  const bGroup = new THREE.Group();
  const bMesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, w),
    new THREE.MeshStandardMaterial({ color: bColors[i % bColors.length], roughness: 0.4, metalness: 0.4 })
  );
  bMesh.position.y = h / 2;
  bGroup.add(bMesh);

  // Neon Vertical Strip on Building
  const neonStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, h * 0.9, 0.35),
    new THREE.MeshBasicMaterial({ color: neonTrimColors[i % neonTrimColors.length] })
  );
  neonStrip.position.set(side * (-w / 2 - 0.1), h / 2, w / 2);
  bGroup.add(neonStrip);

  bGroup.position.set(side * (ROAD_WIDTH / 2 + 11 + Math.random() * 14), 0, zPos);
  scene.add(bGroup);
  sceneryObjs.push(bGroup);

  // Palm Tree along Sidewalk
  if (i % 2 === 0) {
    const palm = createPalmTree();
    palm.position.set(side * (ROAD_WIDTH / 2 + 2.8), 0, zPos);
    scene.add(palm);
    sceneryObjs.push(palm);
  }

  // Handsome Guy NPC on Sidewalk cheering
  if (i % 3 === 0) {
    const guy = createHandsomeNPC(i);
    guy.position.set(side * (ROAD_WIDTH / 2 + 1.6), 0, zPos + 2);
    guy.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;
    scene.add(guy);
    sceneryObjs.push(guy);
    npcList.push(guy);
  }

  // @rupnar5aurabh Giant Highway Billboard every 10 blocks
  if (i % 10 === 0 && i > 0) {
    const bbGroup = new THREE.Group();
    const board = new THREE.Mesh(
      new THREE.PlaneGeometry(11, 5.2),
      new THREE.MeshBasicMaterial({ map: billboardTex, side: THREE.DoubleSide })
    );
    board.position.y = 8.5;
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 8.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8 })
    );
    pole.position.y = 4.25;
    bbGroup.add(pole, board);
    bbGroup.position.set(side * (ROAD_WIDTH / 2 + 5.8), 0, zPos);
    scene.add(bbGroup);
    sceneryObjs.push(bbGroup);
  }
}

// ==========================================
// 3. DAVID PUTRA 2000cc + BADMOS DORAEMON 3D RIG
// ==========================================
const bikeGroup = new THREE.Group();
scene.add(bikeGroup);

const bikePaintMat = new THREE.MeshStandardMaterial({
  color: 0xff0055,
  metalness: 0.8,
  roughness: 0.15,
  emissive: 0xff0055,
  emissiveIntensity: 0.18
});

const goldChromeMat = new THREE.MeshStandardMaterial({
  color: 0xfbbf24,
  metalness: 0.92,
  roughness: 0.12,
  emissive: 0xff9900,
  emissiveIntensity: 0.2
});

const neonAccentMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

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
const rearWheel = createMonsterWheel(1.22, 1.38);
chassisGroup.add(frontWheel, rearWheel);

const forkGeo = new THREE.CylinderGeometry(0.06, 0.05, 1.15, 12);
const forkL = new THREE.Mesh(forkGeo, goldChromeMat);
forkL.position.set(-0.24, 1.05, -1.1);
forkL.rotation.x = -0.38;
const forkR = forkL.clone();
forkR.position.x = 0.24;
chassisGroup.add(forkL, forkR);

const mainBody = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.72, 2.25), bikePaintMat);
mainBody.position.set(0, 1.2, -0.05);
mainBody.castShadow = true;
chassisGroup.add(mainBody);

const badgeGeo = new THREE.PlaneGeometry(0.95, 0.44);
const badgeMat = new THREE.MeshBasicMaterial({ map: badge2000Tex });
const badgeL = new THREE.Mesh(badgeGeo, badgeMat);
badgeL.position.set(-0.44, 1.25, -0.1);
badgeL.rotation.y = -Math.PI / 2;
const badgeR = new THREE.Mesh(badgeGeo, badgeMat);
badgeR.position.set(0.44, 1.25, -0.1);
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

const flameGeo = new THREE.ConeGeometry(0.24, 1.7, 12);
const flameMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
const flameL = new THREE.Mesh(flameGeo, flameMat);
flameL.rotation.x = Math.PI / 2;
flameL.position.set(-0.48, 1.15, 2.0);
const flameR = flameL.clone();
flameR.position.x = 0.48;
flameL.visible = false;
flameR.visible = false;
chassisGroup.add(flameL, flameR);

// --- 3D BADMOS DORAEMON RIDER ---
const riderGroup = new THREE.Group();
chassisGroup.add(riderGroup);

const doraBlueMat = new THREE.MeshStandardMaterial({ color: 0x00a0e9, roughness: 0.3 });
const doraWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

// Doraemon Chubby Blue Torso + White Pocket Belly
const doraTorso = new THREE.Mesh(new THREE.SphereGeometry(0.46, 18, 18), doraBlueMat);
doraTorso.scale.set(1, 1.12, 0.88);
doraTorso.position.set(0, 1.78, 0.22);
riderGroup.add(doraTorso);

// Red Collar & Golden Bell
const collar = new THREE.Mesh(
  new THREE.TorusGeometry(0.36, 0.055, 10, 24),
  new THREE.MeshBasicMaterial({ color: 0xff0033 })
);
collar.rotation.x = Math.PI / 2;
collar.position.set(0, 2.15, 0.08);
riderGroup.add(collar);

const goldBell = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), goldChromeMat);
goldBell.position.set(0, 2.12, 0.44);
riderGroup.add(goldBell);

// Doraemon Giant 3D Head with Badmos Smirk Texture
const doraHead = new THREE.Mesh(
  new THREE.SphereGeometry(0.52, 24, 24),
  new THREE.MeshStandardMaterial({ map: doraemonFaceTex, roughness: 0.25 })
);
// Rotate so face texture faces forward (-Z) and also visible in front/chase
doraHead.rotation.y = Math.PI / 2;
doraHead.position.set(0, 2.58, 0.02);
riderGroup.add(doraHead);

// 3D BADMOS BLACK SUNGLASSES (On Front & Back so player sees the swag from behind too!)
const shadesGroup = new THREE.Group();
const glassMat = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.95, roughness: 0.05 });
const frameMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });

const lensL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.08), glassMat);
lensL.position.set(-0.15, 0, 0);
lensL.rotation.z = -0.12;
const lensR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.08), glassMat);
lensR.position.set(0.15, 0, 0);
lensR.rotation.z = 0.12;
const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.035, 0.09), frameMat);
bridge.position.set(0, 0.05, 0);
shadesGroup.add(lensL, lensR, bridge);
shadesGroup.position.set(0, 2.66, -0.48);
riderGroup.add(shadesGroup);

// Sunglasses Strap around head
const strap = new THREE.Mesh(new THREE.TorusGeometry(0.51, 0.025, 8, 24), glassMat);
strap.rotation.x = Math.PI / 2;
strap.position.set(0, 2.66, 0.02);
riderGroup.add(strap);

// 3D GOLDEN BAMBOO COPTER ON TOP OF DORAEMON'S HEAD!
const copterGroup = new THREE.Group();
const copterStem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.28, 8), goldChromeMat);
copterStem.position.y = 0.14;
const copterBlade = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.025, 0.12), goldChromeMat);
copterBlade.position.y = 0.28;
copterGroup.add(copterStem, copterBlade);
copterGroup.position.set(0, 3.08, 0.02);
riderGroup.add(copterGroup);

// Doraemon Blue Arms & White Sphere Hands gripping handlebars
const armGeo = new THREE.CylinderGeometry(0.11, 0.10, 0.72);
const armL = new THREE.Mesh(armGeo, doraBlueMat);
armL.position.set(-0.42, 1.85, -0.25);
armL.rotation.x = 1.15;
armL.rotation.z = -0.2;
const armR = armL.clone();
armR.position.x = 0.42;
armR.rotation.z = 0.2;

const handL = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), doraWhiteMat);
handL.position.set(-0.34, 1.62, -0.58);
const handR = handL.clone();
handR.position.x = 0.34;
riderGroup.add(armL, armR, handL, handR);

// Doraemon Red Tail
const redTail = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
redTail.position.set(0, 1.55, 0.68);
riderGroup.add(redTail);

const energyShield = new THREE.Mesh(
  new THREE.SphereGeometry(2.2, 18, 18),
  new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.5 })
);
energyShield.position.set(0, 1.3, 0);
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
const carColors = [0xff0055, 0x00f0ff, 0xfbbf24, 0x9333ea, 0x10b981];

function createTrafficCar() {
  const cGroup = new THREE.Group();
  const col = carColors[Math.floor(Math.random() * carColors.length)];
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(2.15, 0.78, 4.5),
    new THREE.MeshStandardMaterial({ color: col, roughness: 0.2, metalness: 0.75 })
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
  car.mesh.position.set(car.laneX, 0, -55 - i * 48);
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
    if (lower.includes('founder') || lower.includes('creator') || lower.includes('who made') || lower.includes('owner') || lower.includes('banane wala') || lower.includes('saurabh')) {
      appendAiMessage("This Vice City Badmos Edition was proudly crafted and founded by <b>Saurabh Sugreev Rupnar (@rupnar5aurabh)</b>! 🚀👑", 'bot');
    } else {
      appendAiMessage("Got it Badmos! Your message has been sent to <b>Saurabh Sugreev Rupnar</b> and his engineering team (Ticket #SSR-2026).", 'bot');
    }
  }, 500);
});

let gameMode = 'roam'; // 'roam' (Free Roam No Out) or 'race'
document.getElementById('mode-roam').addEventListener('click', () => {
  gameMode = 'roam';
  document.getElementById('mode-roam').classList.add('active');
  document.getElementById('mode-race').classList.remove('active');
});
document.getElementById('mode-race').addEventListener('click', () => {
  gameMode = 'race';
  document.getElementById('mode-race').classList.add('active');
  document.getElementById('mode-roam').classList.remove('active');
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
  showCombo('📱 GYRO RE-CENTERED');
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

// Paint Selector
document.querySelectorAll('.paint-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.paint-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    const bikeCol = dot.getAttribute('data-bike');
    const neonCol = dot.getAttribute('data-neon');
    bikePaintMat.color.set(bikeCol);
    bikePaintMat.emissive.set(bikeCol);
    neonAccentMat.color.set(neonCol);
  });
});

// ==========================================
// 6. GAMEPLAY STATE, INPUTS & FULL LOOP
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

const IDLE_SPEED = 0.08;
const MAX_RACE_SPEED = 1.25;
const MAX_NITRO_SPEED = 1.82;
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
  { sky: new THREE.Color(0x2a0845), light: new THREE.Color(0xffb4e6), orb: new THREE.Color(0xff2a85), ground: new THREE.Color(0x160a2c) },
  { sky: new THREE.Color(0x050816), light: new THREE.Color(0x00f0ff), orb: new THREE.Color(0xfbbf24), ground: new THREE.Color(0x070b14) },
  { sky: new THREE.Color(0x0284c7), light: new THREE.Color(0xfffbeb), orb: new THREE.Color(0xfde047), ground: new THREE.Color(0x14532d) }
];

function updateDayNightEnvironment(dt) {
  let pA, pB, blend;
  if (timeMode === 1) { pA = pB = skyPalettes[0]; blend = 0; }
  else if (timeMode === 2) { pA = pB = skyPalettes[1]; blend = 0; }
  else if (timeMode === 3) { pA = pB = skyPalettes[2]; blend = 0; }
  else {
    cycleClock += dt * 0.035;
    const idx = Math.floor(cycleClock) % 3;
    pA = skyPalettes[idx];
    pB = skyPalettes[(idx + 1) % 3];
    blend = cycleClock % 1;
  }
  scene.background.lerpColors(pA.sky, pB.sky, blend);
  scene.fog.color.copy(scene.background);
  sunLight.color.lerpColors(pA.light, pB.light, blend);
  skyOrb.material.color.lerpColors(pA.orb, pB.orb, blend);
  ground.material.color.lerpColors(pA.ground, pB.ground, blend);
}

// Input States
const input = { left: false, right: false, race: false, brake: false, nitro: false };

function bindHoldButton(id, key) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = (e) => { e.preventDefault(); input[key] = true; el.classList.add('pressed'); sound.init(); };
  const end = (e) => { e.preventDefault(); input[key] = false; el.classList.remove('pressed'); };
  el.addEventListener('mousedown', start);
  el.addEventListener('mouseup', end);
  el.addEventListener('mouseleave', end);
  el.addEventListener('touchstart', start, { passive: false });
  el.addEventListener('touchend', end, { passive: false });
  el.addEventListener('touchcancel', end, { passive: false });
}

bindHoldButton('btn-left', 'left');
bindHoldButton('btn-right', 'right');
bindHoldButton('btn-race', 'race');
bindHoldButton('btn-brake', 'brake');
bindHoldButton('btn-nitro', 'nitro');

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'arrowleft' || k === 'a') input.left = true;
  if (k === 'arrowright' || k === 'd') input.right = true;
  if (k === 'arrowup' || k === 'w') input.race = true;
  if (k === 'arrowdown' || k === 's') input.brake = true;
  if (k === 'shift' || k === ' ') input.nitro = true;
  if (k === 'h') { sound.init(); sound.playHorn(); showCombo('📯 SIDE HAT0 BADMOS AA RAHA HAI!'); }
  if (k === 'c') toggleCamera();
});

window.addEventListener('keyup', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'arrowleft' || k === 'a') input.left = false;
  if (k === 'arrowright' || k === 'd') input.right = false;
  if (k === 'arrowup' || k === 'w') input.race = false;
  if (k === 'arrowdown' || k === 's') input.brake = false;
  if (k === 'shift' || k === ' ') input.nitro = false;
});

function toggleCamera() {
  camMode = (camMode + 1) % 3;
  const labels = ['🎥 GTA CHASE CAM', '🎥 BADMOS CLOSE CAM', '🎥 FIRST-PERSON HOOD CAM'];
  showCombo(labels[camMode]);
}

document.getElementById('cam-btn').addEventListener('click', toggleCamera);

document.getElementById('theme-btn').addEventListener('click', () => {
  timeMode = (timeMode + 1) % 4;
  const names = ['🌆 AUTO CYCLE', '🌴 VICE SUNSET', '🌙 NEON NIGHT', '☀️ MIAMI DAY'];
  showCombo(names[timeMode]);
});

document.getElementById('horn-top-btn').addEventListener('click', () => {
  sound.init();
  sound.playHorn();
  showCombo('📯 DORAEMON BADMOS HORN!');
});

document.getElementById('mute-btn').addEventListener('click', () => {
  sound.muted = !sound.muted;
  document.getElementById('mute-btn').innerText = sound.muted ? '🔇' : '🔊';
});

let comboTimeout = null;
function showCombo(txt) {
  const pop = document.getElementById('combo-popup');
  pop.innerText = txt;
  pop.classList.add('active');
  if (comboTimeout) clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => pop.classList.remove('active'), 1300);
}

function updateHeartsHUD() {
  const h1 = document.getElementById('heart-1');
  const h2 = document.getElementById('heart-2');
  const h3 = document.getElementById('heart-3');
  const roamBadge = document.getElementById('free-roam-badge');

  if (gameMode === 'roam') {
    h1.classList.add('hidden');
    h2.classList.add('hidden');
    h3.classList.add('hidden');
    roamBadge.classList.remove('hidden');
  } else {
    h1.classList.remove('hidden');
    h2.classList.remove('hidden');
    h3.classList.remove('hidden');
    roamBadge.classList.add('hidden');
    h1.classList.toggle('lost', lives < 1);
    h2.classList.toggle('lost', lives < 2);
    h3.classList.toggle('lost', lives < 3);
  }
}

function resetEntities() {
  bikeX = 0;
  bikeY = 0;
  bikeVelY = 0;
  isAirborne = false;
  speed = IDLE_SPEED;
  nitroAmount = 100;
  score = 0;
  coinCount = 0;
  stuntCount = 0;
  comboMultiplier = 1;
  lives = 3;
  invincibleTimer = 0;
  updateHeartsHUD();

  for (let i = 0; i < trafficCars.length; i++) {
    trafficCars[i].laneX = lanes[i % 4];
    trafficCars[i].mesh.position.set(trafficCars[i].laneX, 0, -65 - i * 50);
    trafficCars[i].passed = false;
  }
  for (let i = 0; i < coins.length; i++) {
    coins[i].position.set(lanes[i % 4], 1.15, -35 - i * 26);
  }
  for (let i = 0; i < stuntRamps.length; i++) {
    stuntRamps[i].laneX = lanes[i % 4];
    stuntRamps[i].mesh.position.set(stuntRamps[i].laneX, 0, -90 - i * 95);
  }
}

function startCountdownAndRace() {
  sound.init();
  resetEntities();
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('gameover-screen').classList.add('hidden');
  const cdOverlay = document.getElementById('countdown-overlay');
  const cdText = document.getElementById('countdown-text');
  cdOverlay.classList.remove('hidden');
  countdownActive = true;
  gameActive = false;

  let count = 3;
  cdText.innerText = count;
  sound.playBeep(480, 0.14);

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      cdText.innerText = count;
      sound.playBeep(480, 0.14);
    } else if (count === 0) {
      cdText.innerText = 'GO BADMOS!';
      sound.playBeep(880, 0.28);
    } else {
      clearInterval(timer);
      cdOverlay.classList.add('hidden');
      countdownActive = false;
      gameActive = true;
    }
  }, 650);
}

document.getElementById('start-btn').addEventListener('click', startCountdownAndRace);
document.getElementById('restart-btn').addEventListener('click', startCountdownAndRace);

function triggerGameOver() {
  gameActive = false;
  if (score > bestScore) {
    bestScore = Math.floor(score);
    localStorage.setItem('rupnar_dp2000_best', bestScore);
    document.getElementById('best-val').innerText = bestScore;
  }
  document.getElementById('final-score').innerText = Math.floor(score);
  document.getElementById('final-best').innerText = bestScore;
  document.getElementById('final-coins').innerText = coinCount;
  document.getElementById('final-stunts').innerText = stuntCount;
  document.getElementById('gameover-screen').classList.remove('hidden');
}

// ==========================================
// 7. MAIN 60FPS ANIMATION & PHYSICS LOOP
// ==========================================
let lastTime = performance.now();

function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  updateDayNightEnvironment(dt);

  // Spin Doraemon's Golden Bamboo Copter!
  const usingNitro = gameActive && input.nitro && nitroAmount > 2;
  copterGroup.rotation.y += usingNitro ? 0.65 : 0.15;

  // NPCs on sidewalk bobbing & cheering
  for (let i = 0; i < npcList.length; i++) {
    npcList[i].position.y = Math.abs(Math.sin(now * 0.006 + i)) * 0.22;
  }

  if (gameActive) {
    // 1. Speed & Nitro Calculation
    if (padBoostTimer > 0) padBoostTimer -= dt;
    const maxSpd = (usingNitro || padBoostTimer > 0) ? MAX_NITRO_SPEED : MAX_RACE_SPEED;

    if (usingNitro) {
      nitroAmount = Math.max(0, nitroAmount - 28 * dt);
      speed += (maxSpd - speed) * 0.08;
    } else if (input.race) {
      speed += (MAX_RACE_SPEED - speed) * 0.045;
      nitroAmount = Math.min(100, nitroAmount + 7 * dt);
    } else if (input.brake) {
      speed += (IDLE_SPEED * 0.5 - speed) * 0.12;
    } else {
      speed += (IDLE_SPEED - speed) * 0.03;
      nitroAmount = Math.min(100, nitroAmount + 5 * dt);
    }

    // 2. Steering & Leaning
    let steerDir = 0;
    if (controlMode === 'gyro') {
      steerDir = gyroTiltX;
    } else {
      if (input.left) steerDir -= 1;
      if (input.right) steerDir += 1;
    }

    bikeX += steerDir * 12.5 * dt;
    const roadLimit = ROAD_WIDTH / 2 - 1.1;
    if (bikeX < -roadLimit) bikeX = -roadLimit;
    if (bikeX > roadLimit) bikeX = roadLimit;

    const targetLean = -steerDir * 0.42;
    currentLean += (targetLean - currentLean) * 0.14;

    // 3. Jump & Nitro Wheelie Physics
    if (isAirborne) {
      bikeY += bikeVelY;
      bikeVelY -= GRAVITY;
      if (bikeY <= 0) {
        bikeY = 0;
        bikeVelY = 0;
        isAirborne = false;
        sound.playLandingThump();
        showCombo('🔥 PERFECT BADMOS LANDING! +300');
        score += 300 * comboMultiplier;
      }
    }

    // Wheelie Pitch when Nitro or Airborne
    const targetPitch = isAirborne ? 0.28 : ((usingNitro || padBoostTimer > 0) ? 0.24 : (input.brake ? -0.08 : 0));
    currentPitch += (targetPitch - currentPitch) * 0.15;

    bikeGroup.position.set(bikeX, bikeY, 0);
    chassisGroup.rotation.z = currentLean;
    chassisGroup.rotation.x = currentPitch;

    // Exhaust Flames & Invincibility Shield
    flameL.visible = flameR.visible = (usingNitro || padBoostTimer > 0);
    if (flameL.visible) {
      const fScale = 0.85 + Math.random() * 0.5;
      flameL.scale.set(1, fScale, 1);
      flameR.scale.set(1, fScale, 1);
    }

    if (invincibleTimer > 0) {
      invincibleTimer -= dt;
      energyShield.visible = true;
      energyShield.rotation.y += 0.08;
    } else {
      energyShield.visible = false;
    }

    // Spin Monster Wheels
    frontWheel.rotation.x -= speed * 0.6;
    rearWheel.rotation.x -= speed * 0.6;

    // Move Road Stripes & Scenery
    asphaltTex.offset.y -= speed * 0.16;
    laneLines.forEach(s => {
      s.position.z += speed * 2.2;
      if (s.position.z > 14) s.position.z -= 280;
    });

    sceneryObjs.forEach(obj => {
      obj.position.z += speed * 2.2;
      if (obj.position.z > 20) obj.position.z -= 280;
    });

    // Stunt Ramps Logic
    stuntRamps.forEach(r => {
      r.mesh.position.z += speed * 2.2;
      if (!isAirborne && Math.abs(r.mesh.position.z) < 2.6 && Math.abs(bikeX - r.laneX) < 1.9) {
        isAirborne = true;
        bikeVelY = 0.34 + speed * 0.12;
        stuntCount++;
        comboMultiplier = Math.min(8, comboMultiplier + 1);
        comboTimer = 4.0;
        sound.playJumpLaunch();
        showCombo(`🚀 DORAEMON SKY STUNT! ${comboMultiplier}X`);
      }
      if (r.mesh.position.z > 18) {
        r.laneX = lanes[Math.floor(Math.random() * lanes.length)];
        r.mesh.position.set(r.laneX, 0, -275);
      }
    });

    // Boost Pads
    boostPads.forEach(p => {
      p.position.z += speed * 2.2;
      if (Math.abs(p.position.z) < 3.0 && Math.abs(bikeX - p.position.x) < 1.6) {
        padBoostTimer = 1.6;
        nitroAmount = Math.min(100, nitroAmount + 25);
        sound.playNearMiss();
        showCombo('⚡ 2000cc TURBO PAD!');
      }
      if (p.position.z > 18) {
        p.position.set(lanes[Math.floor(Math.random() * lanes.length)], 0.04, -260);
      }
    });

    // Coins Collect
    coins.forEach(c => {
      c.rotation.y += 0.08;
      c.position.z += speed * 2.2;
      if (Math.abs(c.position.z) < 2.0 && Math.abs(bikeX - c.position.x) < 1.5 && bikeY < 2.5) {
        coinCount++;
        score += 50 * comboMultiplier;
        sound.playCoin();
        c.position.z = -260;
        c.position.x = lanes[Math.floor(Math.random() * lanes.length)];
      }
      if (c.position.z > 16) {
        c.position.z = -255;
        c.position.x = lanes[Math.floor(Math.random() * lanes.length)];
      }
    });

    // Traffic Cars & Collision / Near-Miss
    trafficCars.forEach(car => {
      car.mesh.position.z += (speed * 2.2 - car.speed);

      const dz = Math.abs(car.mesh.position.z);
      const dx = Math.abs(bikeX - car.laneX);

      // Collision Check (Only if not airborne over the car)
      if (dz < 2.6 && dx < 1.45 && bikeY < 1.25 && invincibleTimer <= 0) {
        sound.playCrash();
        invincibleTimer = 2.0;
        const flash = document.getElementById('damage-flash');
        flash.style.opacity = '1';
        setTimeout(() => (flash.style.opacity = '0'), 250);

        if (gameMode === 'roam') {
          // Free Roam: Never Out! Just bounce & keep riding
          speed = Math.max(IDLE_SPEED, speed * 0.55);
          showCombo('😎 BADMOS NEVER DIES! (FREE ROAM)');
        } else {
          lives--;
          comboMultiplier = 1;
          speed = IDLE_SPEED * 1.5;
          updateHeartsHUD();
          showCombo('💥 CRASH! WATCH OUT BRO!');
          if (lives <= 0) triggerGameOver();
        }
      } else if (!car.passed && car.mesh.position.z > 2.6) {
        car.passed = true;
        if (dx < 2.55) {
          score += 120 * comboMultiplier;
          comboMultiplier = Math.min(8, comboMultiplier + 1);
          comboTimer = 3.5;
          sound.playNearMiss();
          showCombo(`😎 BADMOS CUT! +${120 * comboMultiplier}`);
        }
      }

      if (car.mesh.position.z > 22) {
        car.laneX = lanes[Math.floor(Math.random() * lanes.length)];
        car.mesh.position.set(car.laneX, 0, -270 - Math.random() * 45);
        car.passed = false;
      }
    });

    // Combo Decay & Score Update
    if (comboTimer > 0) {
      comboTimer -= dt;
      if (comboTimer <= 0) comboMultiplier = 1;
    }

    score += speed * 14 * dt * comboMultiplier;

    // HUD Updates
    const kmh = Math.floor((speed / MAX_NITRO_SPEED) * 320);
    document.getElementById('speed-val').innerText = kmh;
    document.getElementById('score-val').innerText = Math.floor(score);
    document.getElementById('coin-val').innerText = coinCount;
    document.getElementById('combo-val').innerText = `${comboMultiplier}X`;
    document.getElementById('nitro-fill').style.width = `${nitroAmount}%`;
    document.getElementById('rpm-bar').style.width = `${Math.min(100, 15 + (kmh / 320) * 85)}%`;

    const gearNum = Math.min(6, Math.max(1, Math.ceil((kmh / 300) * 6)));
    document.getElementById('gear-val').innerText = usingNitro
      ? `GEAR ${gearNum} • 🔥 WHEELIE`
      : `GEAR ${gearNum} • ${kmh > 25 ? '2000cc ROAR' : 'IDLE'}`;
  } else {
    // Idle Lobby Showcase Spin
    bikeGroup.position.set(0, 0, 0);
    chassisGroup.rotation.z = Math.sin(now * 0.0015) * 0.06;
    chassisGroup.rotation.x = 0;
  }

  // Dynamic Camera System (FOV Warp + 3 Angles)
  const spdRatio = Math.min(1, speed / MAX_NITRO_SPEED);
  const targetFov = 62 + spdRatio * 20;
  camera.fov += (targetFov - camera.fov) * 0.1;
  camera.updateProjectionMatrix();

  if (camMode === 0) {
    // GTA Vice City Chase Cam
    camera.position.lerp(new THREE.Vector3(bikeX * 0.65, 3.6 + bikeY * 0.6, 6.6), 0.12);
    camera.lookAt(bikeX * 0.85, 1.5 + bikeY * 0.5, -12);
  } else if (camMode === 1) {
    // Badmos Close Action Cam
    camera.position.lerp(new THREE.Vector3(bikeX * 0.82, 2.75 + bikeY * 0.7, 4.1), 0.15);
    camera.lookAt(bikeX, 1.7 + bikeY * 0.6, -15);
  } else {
    // First-Person Superbike Hood Cam
    camera.position.set(bikeX, 2.15 + bikeY, -0.85);
    camera.lookAt(bikeX + currentLean * -6, 1.8 + bikeY + currentPitch * 8, -25);
  }

  sound.updateEngine(spdRatio, input.race, usingNitro, isAirborne, gameActive);
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

requestAnimationFrame(animate);
