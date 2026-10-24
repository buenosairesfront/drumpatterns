// Kits de batería sintetizados con Web Audio: 808 y clásica (batería acústica).
const Drums = (() => {
  let ctx, master, bus, roomSend, noiseBuf, ohGain = null;
  let kit = '808';

  function init() {
    if (ctx) return ctx;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createDynamicsCompressor();
    master.threshold.value = -10;
    const out = ctx.createGain();
    out.gain.value = 0.8;
    master.connect(out).connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    // todas las voces pasan por el bus; la clásica suma una sala corta
    bus = ctx.createGain();
    bus.connect(master);
    const room = ctx.createConvolver();
    room.buffer = roomImpulse(0.45);
    roomSend = ctx.createGain();
    roomSend.gain.value = kit === 'clasica' ? 0.22 : 0;
    bus.connect(roomSend).connect(room).connect(master);
    return ctx;
  }

  function roomImpulse(secs) {
    const len = Math.floor(ctx.sampleRate * secs);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = buf.getChannelData(c);
      for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    return buf;
  }

  function env(t, peak, decay, attack = 0.001) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    g.connect(bus);
    return g;
  }

  function filt(type, freq, q, dest) {
    const f = ctx.createBiquadFilter();
    f.type = type; f.frequency.value = freq; f.Q.value = q;
    f.connect(dest);
    return f;
  }

  function noise(t, dur, dest, filters) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    let node = src;
    for (const [type, freq, q = 1] of filters) {
      const f = ctx.createBiquadFilter();
      f.type = type; f.frequency.value = freq; f.Q.value = q;
      node.connect(f); node = f;
    }
    node.connect(dest);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.05);
  }

  function osc(t, dur, dest, type, f0, f1, fall) {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + fall);
    o.connect(dest);
    o.start(t); o.stop(t + dur + 0.05);
  }

  // platillo metálico: 6 cuadradas desafinadas (como la 808) filtradas
  const METAL = [205.3, 304.4, 369.6, 522.7, 540, 800];
  function metal(t, dur, dest, mult = 1) {
    const hp = filt('highpass', 7000, 0.7, dest);
    const bp = filt('bandpass', 10000, 0.8, hp);
    for (const f of METAL) osc(t, dur, bp, 'square', f * mult);
  }

  function choke(t) {
    if (!ohGain) return;
    ohGain.gain.cancelScheduledValues(t);
    ohGain.gain.setTargetAtTime(0.0001, t, 0.005);
    ohGain = null;
  }

  // ---------- 808 (el sonido original de la app) ----------
  function tom(t, v, f) {
    const g = env(t, v * 0.9, 0.35);
    osc(t, 0.4, g, 'sine', f * 1.6, f, 0.08);
  }
  function hat(t, v, decay) {
    const g = env(t, v * 0.45, decay);
    noise(t, decay, g, [['highpass', 7000], ['peaking', 10000, 1]]);
    return g;
  }
  function clap(t, v) {
    [0, 0.011, 0.022].forEach(o => { const g = env(t + o, v * 0.5, 0.012); noise(t + o, 0.02, g, [['bandpass', 1200, 1.5]]); });
    const g = env(t + 0.03, v * 0.5, 0.18); noise(t + 0.03, 0.2, g, [['bandpass', 1200, 1.5]]);
  }
  function cowbell(t, v, decay = 0.25) {
    const g = env(t, v * 0.35, decay);
    const f = filt('bandpass', 900, 2, g);
    osc(t, decay + 0.05, f, 'square', 540); osc(t, decay + 0.05, f, 'square', 800);
  }

  const tr808 = {
    BD(t, v) { const g = env(t, v * 1.2, 0.45); osc(t, 0.5, g, 'sine', 160, 42, 0.12); },
    SD(t, v) {
      const g = env(t, v * 0.6, 0.18); noise(t, 0.2, g, [['highpass', 1200]]);
      const b = env(t, v * 0.5, 0.1); osc(t, 0.12, b, 'triangle', 220, 160, 0.05);
    },
    RS(t, v) {
      const g = env(t, v * 0.6, 0.04); osc(t, 0.05, g, 'triangle', 1700);
      const n = env(t, v * 0.3, 0.02); noise(t, 0.03, n, [['bandpass', 3000, 2]]);
    },
    CP: clap,
    CH(t, v) { choke(t); hat(t, v, 0.05); },
    OH(t, v) { ohGain = hat(t, v, 0.35); },
    CY(t, v) { const g = env(t, v * 0.35, 1.3); noise(t, 1.4, g, [['highpass', 5000], ['peaking', 8000, 0.7]]); },
    HT(t, v) { tom(t, v, 220); },
    MT(t, v) { tom(t, v, 160); },
    LT(t, v) { tom(t, v, 110); },
    CB: cowbell,
  };

  // ---------- clásica: batería acústica ----------
  function tomAc(t, v, f) {
    const g = env(t, v * 0.85, 0.6, 0.002);
    osc(t, 0.65, g, 'sine', f * 1.5, f, 0.12);
    osc(t, 0.4, env(t, v * 0.18, 0.25), 'triangle', f * 2.4, f * 2, 0.1);
    const n = env(t, v * 0.25, 0.04); noise(t, 0.05, n, [['bandpass', 1500, 0.8]]); // golpe del palillo
  }
  const clasica = {
    BD(t, v) { // parche + mazo
      const g = env(t, v * 1.25, 0.32, 0.002);
      osc(t, 0.35, g, 'sine', 140, 52, 0.045);
      const s = env(t, v * 0.25, 0.12); osc(t, 0.15, s, 'triangle', 90, 70, 0.05);
      const m = env(t, v * 0.4, 0.018); noise(t, 0.03, m, [['lowpass', 3500], ['highpass', 600]]);
    },
    SD(t, v) { // cuerpo + bordonero
      const b = env(t, v * 0.55, 0.09, 0.001);
      osc(t, 0.1, b, 'triangle', 240, 185, 0.03); osc(t, 0.1, b, 'sine', 330, 290, 0.03);
      const sn = env(t, v * 0.7, 0.28, 0.001); noise(t, 0.3, sn, [['bandpass', 4200, 0.7], ['highpass', 1500]]);
      const att = env(t, v * 0.5, 0.015); noise(t, 0.02, att, [['bandpass', 2000, 1]]);
    },
    RS(t, v) { // cross-stick: palillo sobre el aro
      const g = env(t, v * 0.6, 0.05);
      osc(t, 0.06, g, 'triangle', 520, 480, 0.02);
      const n = env(t, v * 0.45, 0.03); noise(t, 0.04, n, [['bandpass', 1800, 4]]);
    },
    CP: clap,
    CH(t, v) {
      choke(t);
      const g = env(t, v * 0.32, 0.07);
      metal(t, 0.08, g, 1.4);
      noise(t, 0.08, g, [['highpass', 8000]]);
    },
    OH(t, v) {
      const g = env(t, v * 0.3, 0.7, 0.003);
      metal(t, 0.75, g, 1.4);
      noise(t, 0.75, g, [['highpass', 7000]]);
      ohGain = g;
    },
    CY(t, v) { // crash / ride
      const g = env(t, v * 0.3, 2.2, 0.003);
      metal(t, 2.3, g, 1.7);
      noise(t, 2.3, g, [['highpass', 4500], ['peaking', 7000, 0.6]]);
    },
    HT(t, v) { tomAc(t, v, 210); },
    MT(t, v) { tomAc(t, v, 155); },
    LT(t, v) { tomAc(t, v, 105); },
    CB(t, v) { cowbell(t, v * 0.9, 0.18); },
  };

  const KITS = { '808': tr808, clasica };

  return {
    init,
    get ctx() { return ctx; },
    get kit() { return kit; },
    setKit(name) {
      if (!KITS[name]) return;
      kit = name;
      if (roomSend) roomSend.gain.setTargetAtTime(name === 'clasica' ? 0.22 : 0, ctx.currentTime, 0.02);
    },
    play(inst, t, vel) { const v = KITS[kit][inst]; v && v(t, vel); },
  };
})();
