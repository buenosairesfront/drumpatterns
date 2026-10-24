// Escritura de archivos MIDI (SMF formato 0) con el mapa de batería General MIDI (canal 10).
const GM_NOTES = { BD: 36, RS: 37, SD: 38, CP: 39, CH: 42, LT: 45, OH: 46, MT: 47, CY: 49, HT: 50, CB: 56 };
const PPQ = 96;

// Filas como texto: '.' = vacío, 'x' = nota, '2'..'4' = nota con ratchet.
function isOn(row, s) { return !!row && row[s] !== undefined && row[s] !== '.'; }
function ratchetAt(row, s, ratchets = true) {
  if (!isOn(row, s)) return 0;
  const n = parseInt(row[s], 10);
  return ratchets && n > 1 ? n : 1;
}

function vlq(n) {
  const out = [n & 0x7f];
  while ((n >>= 7)) out.unshift((n & 0x7f) | 0x80);
  return out;
}

function u32(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]; }

// patterns: [{ rows, steps, stepsPerBeat, beatsPerBar }]; cada pattern ocupa `bars` compases seguidos.
function buildMidi(patterns, { bpm = 120, bars = 1, ratchets = true, name = 'Drums' } = {}) {
  const evs = []; // [tick, bytes]
  let barStart = 0;
  const first = patterns[0];
  for (const p of patterns) {
    const stepTicks = PPQ / p.stepsPerBeat;
    const steps = Math.min(p.last || p.steps, p.steps); // último paso
    const barTicks = stepTicks * steps;
    for (let b = 0; b < bars; b++) {
      for (const [inst, note] of Object.entries(GM_NOTES)) {
        const row = p.rows[inst];
        if (!row) continue;
        for (let s = 0; s < steps; s++) {
          const r = ratchetAt(row, s, ratchets);
          const nudge = Math.round((((p.nudge || {})[`${inst}:${s}`] || 0) / 100) * stepTicks); // centésimas de paso
          if (!r) continue;
          const vel = isOn(p.rows.AC, s) ? 127 : 96;
          const sub = stepTicks / r;
          for (let k = 0; k < r; k++) {
            const t = Math.max(0, Math.round(barStart + s * stepTicks + nudge + k * sub));
            const len = Math.max(1, Math.round(sub * 0.9));
            evs.push([t, [0x99, note, k === 0 ? vel : Math.round(vel * 0.85)]]);
            evs.push([t + len, [0x89, note, 0]]);
          }
        }
      }
      barStart += barTicks;
    }
  }
  evs.sort((a, b) => a[0] - b[0] || (a[1][0] === 0x89 ? -1 : 1));

  const tempo = Math.round(60000000 / bpm);
  const den = first.stepsPerBeat === 3 ? 8 : 4;
  const num = first.stepsPerBeat === 3 ? first.beatsPerBar * 3 : first.beatsPerBar;
  const nameBytes = Array.from(new TextEncoder().encode(name)).slice(0, 120);
  const track = [
    0, 0xff, 0x03, ...vlq(nameBytes.length), ...nameBytes,
    0, 0xff, 0x51, 3, (tempo >> 16) & 255, (tempo >> 8) & 255, tempo & 255,
    0, 0xff, 0x58, 4, num, Math.log2(den), 24, 8,
  ];
  let last = 0;
  for (const [t, bytes] of evs) { track.push(...vlq(t - last), ...bytes); last = t; }
  track.push(...vlq(Math.max(0, barStart - last)), 0xff, 0x2f, 0);

  const header = [0x4d, 0x54, 0x68, 0x64, ...u32(6), 0, 0, 0, 1, (PPQ >> 8) & 255, PPQ & 255];
  return new Uint8Array([...header, 0x4d, 0x54, 0x72, 0x6b, ...u32(track.length), ...track]);
}
