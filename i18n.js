// Textos de la interfaz en 6 idiomas. Orden de cada entrada: es, en, ja, zh, de, hi.
const LANGS = ['es', 'en', 'ja', 'zh', 'de', 'hi'];
const LANG_NAMES = { es: 'Español', en: 'English', ja: '日本語', zh: '中文', de: 'Deutsch', hi: 'हिन्दी' };
const I18N = {
  kit: ['Kit', 'Kit', 'キット', '鼓组', 'Kit', 'किट'],
  classic: ['Clásica', 'Classic', 'クラシック', '原声', 'Klassisch', 'क्लासिक'],
  bpm: ['BPM', 'BPM', 'BPM', 'BPM', 'BPM', 'BPM'],
  swing: ['Swing', 'Swing', 'スウィング', '摇摆', 'Swing', 'स्विंग'],
  lastStep: ['Último paso', 'Last step', '最終ステップ', '最后一步', 'Letzter Schritt', 'अंतिम स्टेप'],
  ratchets: ['Ratchets', 'Ratchets', 'ラチェット', '连击', 'Ratchets', 'रैचेट'],
  steps: ['Pasos', 'Steps', 'ステップ', '步数', 'Schritte', 'स्टेप'],
  tap: ['Toque', 'Tap', 'タップ', '点击', 'Tippen', 'टैप'],
  note: ['Nota', 'Note', 'ノート', '音符', 'Note', 'नोट'],
  select: ['Selec.', 'Select', '選択', '选择', 'Auswahl', 'चुनें'],
  clear: ['Limpiar', 'Clear', 'クリア', '清除', 'Leeren', 'साफ़ करें'],
  new: ['Nuevo', 'New', '新規', '新建', 'Neu', 'नया'],
  nudgeEmpty: ['Tocá un paso con nota', 'Tap a step with a note', 'ノートのあるステップをタップ', '点击一个有音符的步', 'Tippe auf einen Schritt mit Note', 'किसी नोट वाले स्टेप पर टैप करें'],
  stepWord: ['paso', 'step', 'ステップ', '步', 'Schritt', 'स्टेप'],
  hint: [
    'Toque: nota → <b>2º toque: acento</b> (el paso suena más fuerte, fila AC) → 3º toque: borra · ×2/×3/×4 o clic derecho: ratchet · <b>Selec.:</b> tocá una nota para atrasarla (+) o adelantarla (−) en centésimas de paso · Tocar el instrumento: mute',
    'Tap: note → <b>2nd tap: accent</b> (the step plays louder, AC row) → 3rd tap: delete · ×2/×3/×4 or right-click: ratchet · <b>Select:</b> tap a note to delay (+) or advance (−) it in hundredths of a step · Tap the instrument: mute',
    'タップ：ノート → <b>2回目：アクセント</b>（そのステップが強く鳴る・AC行）→ 3回目：削除 · ×2/×3/×4 または右クリック：ラチェット · <b>選択：</b>ノートをタップして1/100ステップ単位で遅らせる(+)・早める(−) · 楽器名をタップ：ミュート',
    '点击：音符 → <b>第二次：重音</b>（该步更响，AC 行）→ 第三次：删除 · ×2/×3/×4 或右键：连击 · <b>选择：</b>点击音符，以百分之一步为单位延后(+)或提前(−) · 点击乐器名：静音',
    'Tippen: Note → <b>2. Tippen: Akzent</b> (der Schritt klingt lauter, Zeile AC) → 3. Tippen: löschen · ×2/×3/×4 oder Rechtsklick: Ratchet · <b>Auswahl:</b> Note antippen, um sie in Hundertstel eines Schritts zu verzögern (+) oder vorzuziehen (−) · Instrument antippen: stumm',
    'टैप: नोट → <b>दूसरा टैप: एक्सेंट</b> (स्टेप ज़्यादा ज़ोर से बजता है, AC पंक्ति) → तीसरा टैप: हटाएँ · ×2/×3/×4 या राइट-क्लिक: रैचेट · <b>चुनें:</b> नोट पर टैप करके उसे स्टेप के सौवें हिस्से में देर (+) या जल्दी (−) करें · वाद्य के नाम पर टैप: म्यूट',
  ],
  rhythms: ['Ritmos', 'Rhythms', 'リズム', '节奏', 'Rhythmen', 'रिदम'],
  search: ['Buscar pattern…', 'Search pattern…', 'パターンを検索…', '搜索节奏型…', 'Pattern suchen…', 'पैटर्न खोजें…'],
  save: ['Guardar', 'Save', '保存', '保存', 'Speichern', 'सेव करें'],
  export: ['Exportar', 'Export', '書き出し', '导出', 'Exportieren', 'एक्सपोर्ट'],
  style: ['Estilo', 'Style', 'スタイル', '风格', 'Stil', 'स्टाइल'],
  del: ['Borrar', 'Delete', '削除', '删除', 'Löschen', 'हटाएँ'],
  bars: ['Compases', 'Bars', '小節', '小节', 'Takte', 'बार'],
  midiPattern: ['MIDI del pattern', 'Pattern MIDI', 'パターンのMIDI', '节奏型 MIDI', 'MIDI des Patterns', 'पैटर्न का MIDI'],
  midiStyle: ['MIDI del estilo', 'Style MIDI', 'スタイルのMIDI', '风格 MIDI', 'MIDI des Stils', 'स्टाइल का MIDI'],
  exportJson: ['Exportar mis patterns (JSON)', 'Export my patterns (JSON)', 'マイパターンを書き出し (JSON)', '导出我的节奏型 (JSON)', 'Meine Patterns exportieren (JSON)', 'मेरे पैटर्न एक्सपोर्ट करें (JSON)'],
  importJson: ['Importar JSON', 'Import JSON', 'JSONを読み込む', '导入 JSON', 'JSON importieren', 'JSON इम्पोर्ट करें'],
  reference: [
    'Ritmos de estilos clásicos de caja de ritmos. Referencia de estudio: R.-P. Bardet, <i>260 Drum Machine Patterns</i> (Hal Leonard) · internet. Sin afiliación con el autor ni la editorial.',
    'Classic drum-machine style rhythms. Study reference: R.-P. Bardet, <i>260 Drum Machine Patterns</i> (Hal Leonard) · internet. Not affiliated with the author or the publisher.',
    'ドラムマシンの定番スタイルのリズム。参考資料：R.-P. Bardet『<i>260 Drum Machine Patterns</i>』(Hal Leonard)・インターネット。著者および出版社とは関係ありません。',
    '经典鼓机风格节奏。学习参考：R.-P. Bardet，<i>260 Drum Machine Patterns</i>（Hal Leonard）· 互联网。与作者及出版社无关联。',
    'Rhythmen klassischer Drumcomputer-Stile. Studienreferenz: R.-P. Bardet, <i>260 Drum Machine Patterns</i> (Hal Leonard) · Internet. Keine Verbindung zum Autor oder Verlag.',
    'क्लासिक ड्रम मशीन शैलियों की रिदम। अध्ययन संदर्भ: R.-P. Bardet, <i>260 Drum Machine Patterns</i> (Hal Leonard) · इंटरनेट। लेखक या प्रकाशक से कोई संबद्धता नहीं।',
  ],
  credits: ['Partitura de cumbia: Prof. Daniel Vargas (dominio público).', 'Cumbia score: Prof. Daniel Vargas (public domain).', 'クンビアの譜面：Prof. Daniel Vargas（パブリックドメイン）。', '昆比亚乐谱：Prof. Daniel Vargas（公有领域）。', 'Cumbia-Noten: Prof. Daniel Vargas (gemeinfrei).', 'कुम्बिया स्कोर: Prof. Daniel Vargas (पब्लिक डोमेन)।'],
  license: ['Copyleft: código GPL-3.0 · diseño y grooves U-MA CC BY-SA 4.0. No cubre material de terceros.', 'Copyleft: code GPL-3.0 · design and U-MA grooves CC BY-SA 4.0. Third-party material not included.', 'コピーレフト：コード GPL-3.0・デザインとU-MAグルーヴ CC BY-SA 4.0。第三者の素材は対象外。', 'Copyleft：代码 GPL-3.0 · 设计与 U-MA 律动 CC BY-SA 4.0。不涵盖第三方素材。', 'Copyleft: Code GPL-3.0 · Design und U-MA-Grooves CC BY-SA 4.0. Gilt nicht für Material Dritter.', 'कॉपीलेफ्ट: कोड GPL-3.0 · डिज़ाइन और U-MA ग्रूव CC BY-SA 4.0। तृतीय-पक्ष सामग्री पर लागू नहीं।'],
  language: ['Idioma', 'Language', '言語', '语言', 'Sprache', 'भाषा'],
  saved: ['★ Guardados', '★ Saved', '★ 保存済み', '★ 已保存', '★ Gespeichert', '★ सेव किए गए'],
  savedGroup: ['Guardados', 'Saved', '保存済み', '已保存', 'Gespeichert', 'सेव किए गए'],
  grooves: ['Grooves', 'Grooves', 'グルーヴ', '律动', 'Grooves', 'ग्रूव'],
  breaks: ['Breaks', 'Breaks', 'ブレイク', '过门', 'Breaks', 'ब्रेक'],
  searchTitle: ['Buscar', 'Search', '検索', '搜索', 'Suche', 'खोज'],
  noSaved: ['Todavía no guardaste patterns.', "You haven't saved any patterns yet.", 'まだパターンを保存していません。', '你还没有保存节奏型。', 'Du hast noch keine Patterns gespeichert.', 'आपने अभी तक कोई पैटर्न सेव नहीं किया है।'],
  noResults: ['Sin resultados.', 'No results.', '結果なし。', '没有结果。', 'Keine Ergebnisse.', 'कोई परिणाम नहीं।'],
  stepsN: ['pasos', 'steps', 'ステップ', '步', 'Schritte', 'स्टेप'],
  triplet: ['tresillo', 'triplets', '三連符', '三连音', 'Triolen', 'ट्रिपलेट'],
  eighths: ['corcheas', 'eighths', '8分音符', '八分音符', 'Achtel', 'आठवें नोट'],
  sixteenths: ['semicorcheas', 'sixteenths', '16分音符', '十六分音符', 'Sechzehntel', 'सोलहवें नोट'],
  newPattern: ['Nuevo pattern', 'New pattern', '新しいパターン', '新节奏型', 'Neues Pattern', 'नया पैटर्न'],
  noName: ['Sin nombre', 'Untitled', '無題', '未命名', 'Ohne Namen', 'बिना नाम'],
  confirmDel: ['¿Borrar "{n}"?', 'Delete "{n}"?', '「{n}」を削除しますか？', '删除“{n}”？', '„{n}“ löschen?', '"{n}" हटाएँ?'],
  errSave: ['No se pudo guardar en este navegador.', "Couldn't save in this browser.", 'このブラウザに保存できませんでした。', '无法在此浏览器中保存。', 'Speichern in diesem Browser nicht möglich.', 'इस ब्राउज़र में सेव नहीं हो सका।'],
  errStyle: ['Este pattern no pertenece a un estilo guardado.', "This pattern doesn't belong to a saved style.", 'このパターンは保存されたスタイルに属していません。', '此节奏型不属于已保存的风格。', 'Dieses Pattern gehört zu keinem gespeicherten Stil.', 'यह पैटर्न किसी सेव स्टाइल का हिस्सा नहीं है।'],
  imported: ['Importados {n} patterns.', 'Imported {n} patterns.', '{n} 個のパターンを読み込みました。', '已导入 {n} 个节奏型。', '{n} Patterns importiert.', '{n} पैटर्न इम्पोर्ट हुए।'],
  errRead: ['No se pudo leer el archivo: ', "Couldn't read the file: ", 'ファイルを読み込めませんでした：', '无法读取文件：', 'Datei konnte nicht gelesen werden: ', 'फ़ाइल पढ़ी नहीं जा सकी: '],
};

let LANG = 'es';
try { const l = localStorage.getItem('dp.lang'); if (LANGS.includes(l)) LANG = l; } catch {}

function t(key, vars) {
  const row = I18N[key];
  if (!row) return key;
  let s = row[LANGS.indexOf(LANG)] ?? row[0];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}

// aplica los textos a los elementos marcados con data-i18n / data-i18n-html / data-i18n-ph
function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('#langs [data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
}
