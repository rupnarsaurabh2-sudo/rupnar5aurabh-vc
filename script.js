// ==========================================
// 1. 2000cc SOUND & VICE SYNTHWAVE ENGINE
// ==========================================
class DavidPutraAudio {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.gain = null;
    this.muted = false;
    this.running = false;
    this.beatTimer = 0;
    this.beatStep = 0;
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

  updateEngine(speedRatio, isThrottling, isNitro, isAirborne, playing, dt) {
    if (!this.ctx || !this.running) return;
    if (this.muted || !playing) {
      this.gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.05);
      return;
    }

    const gearMod = (speedRatio * 5) % 1;
    const throttleBoost = isThrottling ? 26 : 0;
    const airRev = isAirborne ? 42 : 0;
    const baseFreq = 36 + speedRatio * 130 + gearMod * 38 + throttleBoost + (isNitro ? 55 : 0) + airRev;

    this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.04);
    this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, this.ctx.currentTime, 0.04);

    const targetVol = isNitro ? 0.15 : (isThrottling ? 0.11 : 0.045);
    this.gain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.05);

    // Subtle Vice City Synthwave Bass Pulse while riding
    this.beatTimer += dt;
    if (this.beatTimer > 0.24) {
      this.beatTimer = 0;
      this.playSynthBassNote();
    }
  }

  playSynthBassNote() {
    if (!this.ctx || this.muted) return;
    const notes = [55, 55, 65.41, 55, 73.42, 65.41, 82.41, 73.42];
    const freq = notes[this.beatStep % notes.length];
    this.beatStep++;

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    g.gain.setValueAtTime(0.055, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.18);
  }

  playExhaustPop() {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(28, this.ctx.currentTime + 0.09);
    g.gain.setValueAtTime(0.26, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
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
    osc.frequency.exponentialRampToValueAtTime(34, this.ctx.currentTime + 0.2);
    g.gain.setValueAtTime(0.32, this.ctx.currentTime);
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
    g.gain.setValueAtTime(0.22, this.ctx.currentTime);
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
    o2.frequency.value = 515;
    g.gain.setValueAtTime(0.24, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.34);
    o1.connect(g);
    o2.connect(g);
    g.connect(this.ctx.destination);
    o1.start();
    o2.start();
    o1.stop(this.ctx.currentTime + 0.34);
    o2.stop(this.ctx.currentTime + 0.34);
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
// 2. 2-SECOND @rupnar5aurabh INTRO SPLASH
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('intro-splash');
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 550);
  }, 2000);
});

// ==========================================
// 3. THREE.JS VICE CITY WORLD & TEXTURES
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
scene.background = new THREE.Color(0x2e0854);
scene.fog = new THREE.FogExp2(0xff4e88, 0.0045
