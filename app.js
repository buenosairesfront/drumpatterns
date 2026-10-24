// Drum Patterns v0 — biblioteca por estilos, editor con ratchets, guardado local y exportación MIDI.
// Orden de la grilla: bombo, snare, hats, clap y después el resto; el acento al final.
const INSTS = ['BD', 'SD', 'CH', 'OH', 'CP', 'RS', 'LT', 'MT', 'HT', 'CB', 'CY', 'AC'];
const INST_NAMES = { AC: 'Acento: los pasos marcados suenan más fuerte', CY: 'Cymbal', CH: 'Closed hat', OH: 'Open hat', HT: 'Tom alto', MT: 'Tom medio',
  SD: 'Snare', RS: 'Rimshot', LT: 'Tom bajo', CP: 'Clap', CB: 'Cowbell', BD: 'Bombo' };
const STORE_KEY = 'dp.userPatterns';
const SAVED = '★ Guardados';
// BPM al cargar un pattern del libro (los estilos nuevos traen su bpm en cada pattern)
const STYLE_BPM = { 'Afro-Cuban': 110, Blues: 70, 'Bossa Nova': 128, 'Cha Cha': 120, Disco: 120, Funk: 100, Jazz: 140,
  Tango: 110, Pop: 112, Reggae: 76, Rock: 120, 'R&B': 92, Samba: 100, Shuffle: 110, Ska: 140, Slow: 70, Swing: 130,
  Twist: 150, Waltz: 140, Endings: 110 }; // botón de Ritmos donde se suman los patterns guardados
const $ = sel => document.querySelector(sel);
const patListEl = document.querySelector('#patList'); // se mueve dentro de la grilla de estilos

const state = {
  pattern: null,      // pattern en edición (copia)
  loadedId: null,     // id del pattern de la biblioteca que se cargó
  snapshot: '',       // para detectar cambios
  tool: 1,           // 1–4 = nota / ratchet, 'sel' = seleccionar paso
  sel: null,         // paso seleccionado { inst, s }
  muted: new Set(),
  playing: false,
  openStyle: null,   // estilo cuyo desplegable está abierto
};

// ---------- datos ----------
function loadUser() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; }
}
function saveUser(list) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch { alert(t('errSave')); }
}
function allPatterns() {
  return [...BOOK_PATTERNS.map(p => ({ ...p, user: false })), ...loadUser().map(p => ({ ...p, user: true }))];
}
function emptyRows(steps) {
  return Object.fromEntries(INSTS.map(i => [i, '.'.repeat(steps)]));
}
function blankPattern(steps = 16) {
  return { name: t('newPattern'), style: $('#saveStyle').value || 'Mis patterns', steps, stepsPerBeat: 4, beatsPerBar: 4, rows: emptyRows(steps) };
}
function clone(p) { return JSON.parse(JSON.stringify(p)); }
function serial(p) { return JSON.stringify([p.name, p.steps, p.rows, lastOf(p), p.nudge || {}]); }
function lastOf(p) { return Math.min(p.last || p.steps, p.steps); }
const nudgeKey = (inst, s) => `${inst}:${s}`;

// ---------- biblioteca ----------
function groupByStyle(list) {
  const byStyle = new Map();
  for (const p of list) {
    if (!byStyle.has(p.style)) byStyle.set(p.style, []);
    byStyle.get(p.style).push(p);
  }
  return byStyle;
}

function renderLibrary() {
  const q = $('#search').value.trim().toLowerCase();
  const all = allPatterns();
  const byStyle = groupByStyle(all.filter(p => !p.user));
  const groupsAll = new Map([[SAVED, all.filter(p => p.user)], ...byStyle]);
  const box = $('#styles');
  const list = patListEl;
  box.innerHTML = '';
  for (const [style, pats] of groupsAll) {
    const b = document.createElement('button');
    b.className = 'style-btn' + (style === SAVED ? ' saved' : '') + (!q && style === state.openStyle ? ' open' : '');
    b.innerHTML = `<span>${esc(style === SAVED ? t('saved') : style)}</span><span class="n">${pats.length}</span>`;
    b.onclick = () => {
      $('#search').value = '';
      state.openStyle = state.openStyle === style ? null : style;
      renderLibrary();
    };
    box.appendChild(b);
  }

  // desplegable: patterns del estilo abierto, o resultados de la búsqueda
  let shown = null;
  if (q) shown = all.filter(p => `${p.style} ${p.name}`.toLowerCase().includes(q));
  else if (state.openStyle) shown = groupsAll.get(state.openStyle) || [];
  list.hidden = !shown;
  list.innerHTML = '';
  if (shown) {
    const close = document.createElement('button');
    close.className = 'close';
    close.setAttribute('aria-label', 'Cerrar');
    close.textContent = '✕';
    close.onclick = closeList;
    const title = document.createElement('div');
    title.className = 'list-title';
    title.textContent = q ? `${t('searchTitle')}: ${q}` : state.openStyle === SAVED ? t('saved') : state.openStyle;
    list.append(close, title);
    if (!shown.length) list.insertAdjacentHTML('beforeend', `<p class="empty">${state.openStyle === SAVED && !q ? t('noSaved') : t('noResults')}</p>`);
    const groups = q ? groupByStyle(shown) : state.openStyle === SAVED ? new Map([[t('savedGroup'), shown]]) : new Map([[t('grooves'), shown.filter(p => !/^(Break|Ending)/.test(p.name))],
      [t('breaks'), shown.filter(p => /^(Break|Ending)/.test(p.name))]]);
    for (const [title, pats] of groups) {
      if (!pats.length) continue;
      const h = document.createElement('h3');
      h.textContent = title;
      const grid = document.createElement('div');
      grid.className = 'pat-grid';
      for (const p of pats) {
        const b = document.createElement('button');
        b.className = 'pat' + (p.id === state.loadedId ? ' active' : '');
        b.innerHTML = `${esc(p.name)}<span class="len">${p.steps}</span>`;
        b.onclick = () => loadPattern(p);
        grid.appendChild(b);
      }
      list.append(h, grid);
    }
  }
  $('#styleList').innerHTML = [...new Set(all.map(p => p.style))].map(s => `<option value="${esc(s)}">`).join('');
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function closeList() {
  state.openStyle = null;
  $('#search').value = '';
  renderLibrary();
}

function loadPattern(p) {
  state.pattern = clone(p);
  delete state.pattern.user;
  state.loadedId = p.id || null;
  state.isUser = !!p.user;
  state.snapshot = serial(state.pattern);
  $('#patName').value = p.name;
  const bpm = p.bpm || STYLE_BPM[p.style];
  if (bpm) $('#bpm').value = bpm;
  $('#saveStyle').value = p.style;
  $('#del').hidden = !p.user;
  renderGrid();
  renderLibrary();
}

// ---------- grilla ----------
function renderGrid() {
  const p = state.pattern;
  const g = $('#grid');
  g.style.gridTemplateColumns = `minmax(22px, auto) repeat(${p.steps}, minmax(0, 1fr))`;
  const html = ['<div></div>'];
  for (let s = 0; s < p.steps; s++) html.push(`<div class="num" data-step="${s}">${s + 1}</div>`);
  for (const inst of INSTS) {
    const muted = state.muted.has(inst) ? ' muted' : '';
    if (inst === 'AC') html.push('<div class="sep"></div>');
    html.push(`<div class="lbl${muted}${inst === 'AC' ? ' acc-lbl' : ''}" data-inst="${inst}" title="${INST_NAMES[inst]}">${inst}</div>`);
    for (let s = 0; s < p.steps; s++) {
      const beat = s % p.stepsPerBeat === 0 ? ' beat' : '';
      const out = s >= lastOf(p) ? ' out' : '';
      html.push(`<div class="cell${beat}${out}" data-inst="${inst}" data-step="${s}"></div>`);
    }
  }
  g.innerHTML = html.join('');
  for (const inst of INSTS) for (let s = 0; s < p.steps; s++) paintCell(inst, s);
  for (const b of document.querySelectorAll('#lenSeg button')) b.classList.toggle('on', +b.dataset.len === p.steps);
  $('#lastStep').max = p.steps;
  $('#lastStep').value = lastOf(p);
  $('#lastVal').textContent = lastOf(p);
  setSelection(null);
  $('#metaStyle').textContent = p.style || '—';
  $('#metaInfo').textContent = `${p.steps} ${t('stepsN')} · ${t(p.stepsPerBeat === 3 ? 'triplet' : p.stepsPerBeat === 2 ? 'eighths' : 'sixteenths')}`;
  updateDirty();
}

function cellEl(inst, s) { return $(`#grid .cell[data-inst="${inst}"][data-step="${s}"]`); }
function paintCell(inst, s) {
  const el = cellEl(inst, s);
  if (!el) return;
  const row = state.pattern.rows[inst];
  const on = isOn(row, s);
  el.classList.toggle('on', on);
  el.classList.toggle('acc', on && inst === 'AC');
  el.classList.toggle('accd', on && inst !== 'AC' && isOn(state.pattern.rows.AC, s));
  const r = on ? ratchetAt(row, s) : 0;
  el.innerHTML = r > 1 ? '<i class="r"></i>'.repeat(r) : '';
  el.title = r > 1 ? `ratchet ×${r}` : '';
  const n = on && state.pattern.nudge ? state.pattern.nudge[nudgeKey(inst, s)] : 0;
  el.classList.toggle('nudged', !!n);
  el.classList.toggle('sel', !!state.sel && state.sel.inst === inst && state.sel.s === s);
}

function setStep(inst, s, ch) {
  const row = state.pattern.rows[inst];
  state.pattern.rows[inst] = row.slice(0, s) + ch + row.slice(s + 1);
  if (ch === '.' && state.pattern.nudge) delete state.pattern.nudge[nudgeKey(inst, s)];
  if (inst === 'AC') for (const i of INSTS) paintCell(i, s);
  else paintCell(inst, s);
  updateDirty();
}

function toggleAccent(s) {
  setStep('AC', s, isOn(state.pattern.rows.AC, s) ? '.' : 'x');
}

function onGridClick(e, cycle) {
  const lbl = e.target.closest('.lbl');
  if (lbl) {
    const i = lbl.dataset.inst;
    state.muted.has(i) ? state.muted.delete(i) : state.muted.add(i);
    lbl.classList.toggle('muted');
    return;
  }
  const cell = e.target.closest('.cell');
  if (!cell) return;
  const inst = cell.dataset.inst, s = +cell.dataset.step;
  const row = state.pattern.rows[inst];
  const cur = isOn(row, s) ? ratchetAt(row, s) : 0;
  if (state.tool === 'sel') { setSelection(cur && inst !== 'AC' ? { inst, s } : null); return; }
  if (inst === 'AC') { toggleAccent(s); return; }
  if (cycle) { // clic derecho: rota el ratchet
    const next = cur >= 4 ? 0 : cur + 1;
    setStep(inst, s, next === 0 ? '.' : next === 1 ? 'x' : String(next));
    return;
  }
  // toque: nota → acento → borrar
  const acc = isOn(state.pattern.rows.AC, s);
  if (!cur) {
    setStep(inst, s, state.tool === 1 ? 'x' : String(state.tool));
    if (!state.playing) audition(inst, acc ? 1 : 0.8);
  } else if (!acc) {
    toggleAccent(s);
    if (!state.playing) audition(inst, 1);
  } else {
    setStep(inst, s, '.');
    toggleAccent(s);
  }
}

// ---------- seleccionar: atrasar / adelantar un paso en centésimas ----------
function setSelection(sel) {
  const prev = state.sel;
  state.sel = sel;
  if (prev) paintCell(prev.inst, prev.s);
  const bar = $('#nudgeBar');
  bar.hidden = state.tool !== 'sel';
  if (!sel) {
    $('#nudgeLbl').textContent = t('nudgeEmpty');
    $('#nudge').disabled = true;
    $('#nudge').value = 0;
    $('#nudgeVal').textContent = '0';
    return;
  }
  paintCell(sel.inst, sel.s);
  const v = (state.pattern.nudge || {})[nudgeKey(sel.inst, sel.s)] || 0;
  $('#nudgeLbl').textContent = `${sel.inst} · ${t('stepWord')} ${sel.s + 1}`;
  $('#nudge').disabled = false;
  $('#nudge').value = v;
  $('#nudgeVal').textContent = (v > 0 ? '+' : '') + v;
}

function setNudge(v) {
  if (!state.sel) return;
  v = Math.max(-50, Math.min(50, Math.round(v)));
  const p = state.pattern;
  p.nudge = p.nudge || {};
  if (v) p.nudge[nudgeKey(state.sel.inst, state.sel.s)] = v;
  else delete p.nudge[nudgeKey(state.sel.inst, state.sel.s)];
  setSelection(state.sel);
  updateDirty();
}

function setLast(n) {
  state.pattern.last = n;
  $('#lastVal').textContent = n;
  document.querySelectorAll('#grid .cell').forEach(el => el.classList.toggle('out', +el.dataset.step >= n));
  updateDirty();
}

function audition(inst, vel = 0.8) {
  if (inst === 'AC') return;
  const ctx = Drums.init();
  Drums.play(inst, ctx.currentTime + 0.01, vel);
}

function setLength(n) {
  const p = state.pattern;
  if (n === p.steps) return;
  for (const i of INSTS) {
    let r = p.rows[i];
    while (r.length < n) r += r;
    p.rows[i] = r.slice(0, n);
  }
  if (n === 8) { p.stepsPerBeat = 2; p.beatsPerBar = 4; }
  else if (n === 16) { p.stepsPerBeat = 4; p.beatsPerBar = 4; }
  else { p.stepsPerBeat = 3; p.beatsPerBar = 4; }
  p.steps = n;
  p.last = n;
  renderGrid();
}

function updateDirty() {
  state.pattern.name = $('#patName').value;
  $('#dirty').hidden = serial(state.pattern) === state.snapshot;
}

// ---------- secuenciador ----------
const seq = { step: 0, next: 0, timer: null, queue: [] };

function stepDur() {
  const bpm = Math.min(240, Math.max(40, +$('#bpm').value || 110));
  return 60 / bpm / state.pattern.stepsPerBeat;
}

function schedule() {
  const ctx = Drums.ctx;
  const p = state.pattern;
  const ratchets = $('#ratchetOn').checked;
  while (seq.next < ctx.currentTime + 0.12) {
    const s = seq.step % lastOf(p);
    const dur = stepDur();
    const swing = p.stepsPerBeat % 2 === 0 && s % 2 === 1 ? (+$('#swing').value / 100) * dur * 0.66 : 0;
    const t = seq.next + swing;
    const acc = isOn(p.rows.AC, s);
    for (const inst of INSTS) {
      if (inst === 'AC' || state.muted.has(inst)) continue;
      const r = ratchetAt(p.rows[inst], s, ratchets);
      const nt = t + (((p.nudge || {})[nudgeKey(inst, s)] || 0) / 100) * dur;
      for (let k = 0; k < r; k++) Drums.play(inst, Math.max(nt, Drums.ctx.currentTime) + (k * dur) / r, (acc ? 1 : 0.7) * (k ? 0.8 : 1));
    }
    seq.queue.push({ s, t });
    seq.next += dur;
    seq.step = s + 1;
  }
}

let drawn = -1;
function draw() {
  if (!state.playing) return;
  const now = Drums.ctx.currentTime;
  let cur = null;
  while (seq.queue.length && seq.queue[0].t <= now) cur = seq.queue.shift();
  if (cur && cur.s !== drawn) {
    document.querySelectorAll('#grid .now').forEach(el => el.classList.remove('now'));
    document.querySelectorAll(`#grid [data-step="${cur.s}"]`).forEach(el => el.classList.add('now'));
    drawn = cur.s;
  }
  requestAnimationFrame(draw);
}

function togglePlay() {
  const ctx = Drums.init();
  if (state.playing) {
    state.playing = false;
    clearInterval(seq.timer);
    document.querySelectorAll('#grid .now').forEach(el => el.classList.remove('now'));
    $('#play').textContent = '▶';
    $('#play').classList.remove('on');
    return;
  }
  ctx.resume();
  state.playing = true;
  seq.step = 0; seq.queue = []; drawn = -1;
  seq.next = ctx.currentTime + 0.05;
  schedule();
  seq.timer = setInterval(schedule, 25);
  requestAnimationFrame(draw);
  $('#play').textContent = '■';
  $('#play').classList.add('on');
}

// ---------- guardar / exportar ----------
function savePattern() {
  const list = loadUser();
  const p = clone(state.pattern);
  p.name = $('#patName').value.trim() || t('noName');
  p.style = $('#saveStyle').value.trim() || 'Mis patterns';
  p.bpm = +$('#bpm').value;
  delete p.src;
  if (state.isUser && state.loadedId) {
    p.id = state.loadedId;
    const i = list.findIndex(x => x.id === p.id);
    if (i >= 0) list[i] = p; else list.push(p);
  } else {
    p.id = 'u' + Date.now().toString(36);
    list.push(p);
  }
  saveUser(list);
  loadPattern({ ...p, user: true });
}

function deletePattern() {
  if (!state.isUser || !confirm(t('confirmDel', { n: state.pattern.name }))) return;
  saveUser(loadUser().filter(p => p.id !== state.loadedId));
  loadPattern({ ...blankPattern(state.pattern.steps), user: false });
}

function download(name, data, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const fileName = s => s.replace(/[^\w\-]+/g, '_').replace(/^_+|_+$/g, '') || 'pattern';

function exportMidi() {
  const p = state.pattern;
  p.name = $('#patName').value;
  const data = buildMidi([p], { bpm: +$('#bpm').value, bars: +$('#bars').value, ratchets: $('#ratchetOn').checked, name: p.name });
  download(`${fileName(p.style + '_' + p.name)}.mid`, data, 'audio/midi');
}

function exportStyleMidi() {
  const style = state.pattern.style;
  const pats = allPatterns().filter(p => p.style === style);
  if (!pats.length) return alert(t('errStyle'));
  const data = buildMidi(pats, { bpm: +$('#bpm').value, bars: +$('#bars').value, ratchets: $('#ratchetOn').checked, name: style });
  download(`${fileName(style)}_todos.mid`, data, 'audio/midi');
}

function exportJson() {
  const list = loadUser();
  if (!list.length) return alert(t('noSaved'));
  download('mis_patterns.json', JSON.stringify({ format: 'drum-patterns', version: 1, patterns: list }, null, 2), 'application/json');
}

async function importJson(file) {
  try {
    const data = JSON.parse(await file.text());
    const incoming = (Array.isArray(data) ? data : data.patterns || []).filter(p => p && p.rows && p.steps);
    const list = loadUser();
    for (const p of incoming) {
      p.id = p.id || 'u' + Math.random().toString(36).slice(2, 9);
      p.stepsPerBeat = p.stepsPerBeat || (p.steps === 8 ? 2 : p.steps === 12 ? 3 : 4);
      p.beatsPerBar = p.beatsPerBar || 4;
      for (const i of INSTS) p.rows[i] = (p.rows[i] || '').padEnd(p.steps, '.').slice(0, p.steps);
      const i = list.findIndex(x => x.id === p.id);
      if (i >= 0) list[i] = p; else list.push(p);
    }
    saveUser(list);
    renderLibrary();
    alert(t('imported', { n: incoming.length }));
  } catch (err) {
    alert(t('errRead') + err.message);
  }
}

// ---------- eventos ----------
$('#grid').addEventListener('click', e => onGridClick(e, false));
$('#grid').addEventListener('contextmenu', e => { if (e.target.closest('.cell')) { e.preventDefault(); onGridClick(e, true); } });
$('#lenSeg').addEventListener('click', e => e.target.dataset.len && setLength(+e.target.dataset.len));
$('#toolSeg').addEventListener('click', e => {
  if (!e.target.dataset.tool) return;
  state.tool = e.target.dataset.tool === 'sel' ? 'sel' : +e.target.dataset.tool;
  document.querySelectorAll('#toolSeg button').forEach(b => b.classList.toggle('on', b === e.target));
  setSelection(null);
});
$('#play').onclick = togglePlay;
// idioma: LANG arriba lleva a las pastillas de idioma del pie
$('#langLink').onclick = e => {
  e.preventDefault();
  const box = $('#langs');
  box.hidden = false;
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  box.classList.remove('flash'); void box.offsetWidth; box.classList.add('flash');
};
$('#langs').addEventListener('click', e => {
  const l = e.target.dataset.lang;
  if (!l) return;
  LANG = l;
  try { localStorage.setItem('dp.lang', l); } catch {}
  applyI18n();
  renderLibrary();
  renderGrid();
});
// kit de sonido: se recuerda en este navegador
try { const k = localStorage.getItem('dp.kit'); if (k && $(`#kit option[value="${k}"]`)) { $('#kit').value = k; Drums.setKit(k); } } catch {}
$('#kit').onchange = () => {
  Drums.setKit($('#kit').value);
  try { localStorage.setItem('dp.kit', $('#kit').value); } catch {}
  if (!state.playing) { const t = Drums.init().currentTime + 0.02; Drums.play('BD', t, 1); Drums.play('SD', t + 0.25, 1); }
};
$('#swing').oninput = () => { $('#swingVal').textContent = $('#swing').value + '%'; };
$('#lastStep').oninput = () => setLast(+$('#lastStep').value);
$('#nudge').oninput = () => setNudge(+$('#nudge').value);
$('#nudgeBar').addEventListener('click', e => {
  if (e.target.dataset.d) setNudge((+$('#nudge').value) + (+e.target.dataset.d));
  if (e.target.id === 'nudgeReset') setNudge(0);
});
$('#patName').oninput = updateDirty;
$('#search').oninput = renderLibrary;
$('#clear').onclick = () => { state.pattern.rows = emptyRows(state.pattern.steps); state.pattern.nudge = {}; renderGrid(); };
$('#newPat').onclick = () => loadPattern({ ...blankPattern(16), user: false });
$('#save').onclick = savePattern;
$('#del').onclick = deletePattern;
$('#midi').onclick = exportMidi;
$('#midiStyle').onclick = exportStyleMidi;
$('#exportJson').onclick = exportJson;
$('#importJson').onchange = e => { if (e.target.files[0]) importJson(e.target.files[0]); e.target.value = ''; };
document.addEventListener('keydown', e => {
  if (e.code === 'Space' && !e.target.matches('input, select, textarea')) { e.preventDefault(); togglePlay(); }
});

document.querySelector('#toolSeg button[data-tool="1"]').classList.add('on');
applyI18n();
loadPattern(BOOK_PATTERNS[0] ? { ...BOOK_PATTERNS[0], user: false } : { ...blankPattern(16), user: false });
