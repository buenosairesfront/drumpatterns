// Estilos extra U-MA: Jungle, Drum and Bass, Urbano, Reggaeton, Hip Hop, Techno y Experimental
// (30 grooves cada uno), House (27), Classics (breakbeats) + Cumbia sacada de audio y de partitura. Cada groove trae su BPM.
// Cada groove combina una "base" (bombo/caja + acentos) con una "capa" (hats, ride, percusión).
// Filas: '.' vacío, 'x' nota, '2'..'4' ratchet. 16 pasos de semicorchea.
(() => {
  const EXTRA = {
    Jungle: { bpm: 168,
      bases: [
        { BD: 'x.x.......xx....', SD: '....x..x.x..x..x', AC: '....x.......x...' }, // amen
        { BD: 'x.x.......x.....', SD: '....x..x.x....x.', AC: '....x.......x...' }, // amen B
        { BD: 'x......x..x.....', SD: '....x.......x..x', AC: '....x.......x...' }, // think
        { BD: 'x.....x...x.....', SD: '....x..x....x.x.', AC: '....x.......x...' }, // apache
        { BD: 'x.x.......x.....', SD: '....x..x.x.2x.3.', AC: '....x.......x...' }, // amen con rolls
        { BD: 'x.........x..x..', SD: '........x......x', AC: '........x.......' }, // half-time
      ],
      tops: [
        { CY: 'x.x.x.x.x.x.x.x.' },                               // ride
        { CH: 'xxxxxxxxxxxxxxxx' },                               // hats 16
        { CH: 'x.x.x.x.x.x.x...', OH: '..............x.' },       // hats + abierto
        { CH: '..x...x...x...x.', RS: '.x...x.....x..x.' },       // offbeat + rim
        { CH: 'x.x.x.x.x.x.x.x.', HT: '............2...', MT: '.............x..', LT: '..............x2' }, // fill de toms
      ],
    },
    'Drum and Bass': { bpm: 174,
      bases: [
        { BD: 'x.........x.....', SD: '....x.......x...', AC: '....x.......x...' }, // two-step
        { BD: 'x.........xx....', SD: '....x.......x...', AC: '....x.......x...' }, // two-step doble
        { BD: 'x.....x...x.....', SD: '....x.......x...', AC: '....x.......x...' }, // roller
        { BD: 'x..x......x.....', SD: '....x.......x..x', AC: '....x.......x...' }, // steppa
        { BD: 'x.........x.....', SD: '........x.......', AC: '........x.......' }, // half-time
        { BD: 'x.x.......x...x.', SD: '....x.......x.2.', AC: '....x.......x...' }, // neuro
      ],
      tops: [
        { CH: 'x.x.x.x.x.x.x.x.' },                               // hats 8
        { CH: 'xxxxxxxxxxxxxxxx' },                               // hats 16
        { CY: 'x.x.x.x.x.x.x.x.', OH: '......x.......x.' },       // ride + abierto
        { CH: 'x.xx.xx.x.xx.x2x', SD: '.......x..x....x' },       // shuffle + ghosts
        { CH: '..x...x...x...x.', RS: 'x..x..x...x..x..', CY: 'x...............' }, // offbeat + rim + crash
      ],
    },
    Urbano: { bpm: 95,
      bases: [
        { BD: 'x...x...x...x...', SD: '...x..x....x..x.', AC: '...x..x....x..x.' }, // dembow
        { BD: 'x...x...x...x...', CP: '...x..x....x..x.', AC: '...x..x....x..x.' }, // dembow clap
        { BD: 'x...x...x...x...', SD: '...x..x..x.x..x.', AC: '...x..x....x....' }, // perreo
        { BD: 'x..x..x.x...x...', SD: '...x..x....x..x.', AC: '...x..x....x..x.' }, // dembow sincopado
        { BD: 'x......x..x.....', SD: '........x.......', CP: '........x.......', AC: '........x.......' }, // trap
        { BD: 'x...x...x...x...', RS: '...x..x....x..x.', CP: '....x.......x...', AC: '....x.......x...' }, // dancehall
      ],
      tops: [
        { CH: 'x.x.x.x.x.x.x.x.' },                               // hats 8
        { CH: 'x.x.x.x2x.x.x.3.' },                               // hats trap con rolls
        { CH: 'x.x.x.x.x.x.x.x.', OH: '..x...x...x...x.' },       // hats + abiertos
        { CH: 'x.x.x.x.x.x.x.x.', CB: 'x..x..x...x..x..' },       // perc
        { CH: 'xxxxxxxxxxxxxxxx', HT: '..........x.....', MT: '..............x.' }, // 16 + toms
      ],
    },
    Reggaeton: { bpm: 94,
      bases: [
        { BD: 'x...x...x...x...', SD: '...x..x....x..x.', AC: '...x..x....x..x.' },                // dembow clásico
        { BD: 'x...x...x...x...', SD: '...x..x....x..x.', CP: '...x..x....x..x.', AC: '...x..x....x..x.' }, // dembow caja + clap
        { BD: 'x...x...x...x...', SD: '...x..x.x..x..x.', AC: '...x..x....x..x.' },                // perreo con relleno
        { BD: 'x...x..xx...x...', SD: '...x..x....x..x.', AC: '...x..x....x..x.' },                // bombo doble
        { BD: 'x..x..x.x..x..x.', SD: '...x..x....x..x.', AC: '......x.......x.' },                // neoperreo
        { BD: 'x...x...x...x...', RS: '...x..x....x..x.', SD: '...........x....', AC: '...........x....' }, // romántico con aro
      ],
      tops: [
        { CH: 'x.x.x.x.x.x.x.x.' },                                                    // hats 8
        { CH: 'xxxxxxxxxxxxxxxx', OH: '......x.......x.' },                            // hats 16 + abierto
        { CH: 'x.x.x.x.x.x.x.x.', HT: '......x.........', MT: '..............x.' },     // timbales old school
        { CH: 'x.x.x.x.x.x.x.x.', CB: 'x..x..x...x..x..' },                            // campana
        { CH: 'x.x2x.x.x.x2x.3.', CY: 'x...............' },                            // hats con rolls + crash
      ],
    },
    'Hip Hop': { bpm: 90,
      bases: [
        { BD: 'x......x..x.....', SD: '....x.......x...', AC: '....x.......x...' },   // boom bap
        { BD: 'x.x.......x.....', SD: '....x.......x...', AC: '....x.......x...' },   // boom bap 2
        { BD: 'x......xx.....x.', SD: '....x.......x...', AC: '....x.......x...' },   // bombo sincopado
        { BD: 'x..x......x..x..', SD: '....x..x....x...', AC: '....x.......x...' },   // con ghost
        { BD: 'x.........xx....', SD: '....x.......x..x', AC: '....x.......x...' },   // lazy
        { BD: 'x..x..x...x.....', CP: '....x.......x...', AC: '....x.......x...' },   // west coast
      ],
      tops: [
        { CH: 'x.x.x.x.x.x.x.x.' },                                     // hats 8
        { CH: 'xxxxxxxxxxxxxxxx' },                                     // hats 16
        { CH: 'x.x.x.x.x.x...x.', OH: '............x...' },             // hats + abierto
        { CH: 'x.x.x.x2x.x.x.3x' },                                     // hats con rolls
        { RS: '..x...x...x...x.', CY: 'x...............' },             // shaker de aro + crash
      ],
    },
    Techno: { bpm: 130,
      bases: [
        { BD: 'x...x...x...x...', CP: '....x.......x...', AC: 'x...x...x...x...' },   // four on the floor + clap
        { BD: 'x...x...x...x...', RS: '..x..x..x..x.x..', AC: 'x...x...x...x...' },   // con aro sincopado
        { BD: 'x...x...x...x..x', CP: '....x.......x...', AC: 'x...x...x...x...' },   // levante al final
        { BD: 'x...x...x...x...', SD: '....x.......x..2', AC: 'x...x...x...x...' },   // caja con roll
        { BD: 'x..x..x...x..x..', CP: '....x.......x...', AC: 'x.....x...x.....' },   // broken
        { BD: 'x...x...x...x...', LT: '..x...x...x...x.', AC: 'x...x...x...x...' },   // rumble de tom
      ],
      tops: [
        { OH: '..x...x...x...x.' },                                     // abierto a contratiempo
        { CH: 'xxxxxxxxxxxxxxxx' },                                     // hats 16
        { CH: 'xx.xxx.xxx.xxx.x', OH: '..x...x...x...x.' },             // 16 + abiertos
        { CY: 'x.x.x.x.x.x.x.x.', CH: '..x...x...x...x.' },             // ride
        { CB: 'x..x..x..x..x...', CH: '..x...x...x...x.' },             // perc 3+3+3
      ],
    },
    House: { bpm: 124, // 9 bases × 3 capas = 27 grooves
      bases: [
        { BD: 'x...x...x...x...', CP: '....x.......x...', AC: 'x...x...x...x...' },                       // clásico con clap
        { BD: 'x...x...x...x...', SD: '....x.......x...', AC: 'x...x...x...x...' },                       // con caja
        { BD: 'x...x...x...x...', CP: '....x.......x..x', AC: 'x...x...x...x...' },                       // clap con levante
        { BD: 'x...x...x...x...', RS: '...x..x....x....', AC: 'x...x...x...x...' },                       // deep con aro
        { BD: 'x...x...x...x...', CP: '....x.......x...', SD: '..........x..x..', AC: 'x...x...x...x...' }, // chicago
        { BD: 'x...x...x...x...', LT: '..x..x....x..x..', MT: '.......x.......x', AC: 'x...x...x...x...' }, // tribal
        { BD: 'x...x...x..xx...', CP: '....x.......x...', AC: 'x...x...x...x...' },                       // jackin
        { BD: 'x...x...x...x...', CP: '....x.......x...', SD: '....x.......x...', AC: '....x.......x...' }, // soulful
        { BD: 'x...x...x...x...', CP: '....x.......x...', RS: '.x...x...x...x..', AC: 'x...x...x...x...' }, // tech house
      ],
      tops: [
        { OH: '..x...x...x...x.' },                                     // abierto a contratiempo
        { CH: 'xx.xxx.xxx.xxx.x', OH: '..x...x...x...x.' },             // hats 16 + abiertos
        { CY: 'x.x.x.x.x.x.x.x.', OH: '..x...x...x...x.' },             // ride + abiertos
      ],
    },
    Experimental: { bpm: 120,
      bases: [
        { BD: 'x..x..x..x..x...', SD: '....x.......x...', AC: 'x.....x.....x...', bpm: 110 },           // 3 contra 4
        { BD: 'x.3...x.2.x...4.', SD: '...x.2.....3x...', AC: '...x.......x....', bpm: 140 },           // glitch de ratchets
        { BD: 'x....x....x....x', CP: '..x....x....x...', AC: 'x....x....x.....', bpm: 96, last: 15 },  // ciclo de 5 en 15
        { BD: 'x.....x.x..x....', SD: '...x.....x....2.', AC: '...x.....x......', bpm: 160, last: 14 }, // IDM en 14
        { BD: 'x.........x.....', RS: '......x.......x3', AC: '......x.........', bpm: 72, last: 13 },  // disperso en 13
        { BD: '..x..x...x..x...', SD: 'x......x......x.', AC: 'x......x........', bpm: 124, last: 11 }, // desplazado en 11
      ],
      tops: [
        { CH: 'x..x.x.x..x.x.x.' },                                     // euclídeo 7/16
        { CB: 'x..x..x..x..x..x', CH: '..x.......x.....' },             // campana cada 3
        { HT: 'x.....x.........', MT: '...x......x.....', LT: '.....x.....x..x.' }, // melodía de toms
        { CY: 'x...........x...', OH: '.....x.....x....' },             // aire
        { CH: '2.x.3..x.4..x..x' },                                     // hats con ratchets
      ],
    },
  };

  const INSTRUMENTS = ['BD', 'SD', 'CH', 'OH', 'CP', 'RS', 'LT', 'MT', 'HT', 'CB', 'CY', 'AC'];
  // suma dos filas: la base manda donde tiene nota
  const merge = (a = '................', b = '................') =>
    [...a].map((c, i) => (c !== '.' ? c : b[i])).join('');

  for (const [style, { bpm, bases, tops }] of Object.entries(EXTRA)) {
    let n = 0;
    for (const top of tops) {
      for (const base of bases) {
        n++;
        const rows = {};
        for (const inst of INSTRUMENTS) rows[inst] = merge(base[inst], top[inst]);
        BOOK_PATTERNS.push({
          id: `x_${style.replace(/\W+/g, '').toLowerCase()}_${n}`,
          style, name: `${style} ${n}`, steps: 16, stepsPerBeat: 4, beatsPerBar: 4,
          src: 'U-MA', rows, bpm: base.bpm || bpm, ...(base.last ? { last: base.last } : {}),
        });
      }
    }
  }

  // Classics: breakbeats clásicos (de la tabla "Classic Breakbeats")
  // hi bell → CB (cowbell), lo bell → HT (tom alto), ride → CY
  const CLASSICS = [
    ['The Funky Drummer', 100, { BD: 'x.x...x...x..x..', SD: '....x..x.x.xx..x', CH: 'xxxxxxx.xxxxx.xx', OH: '.......x.....x..' }],
    ['Impeach The President', 96, { BD: 'x......xx.....x.', SD: '....x.......x...', CH: 'x.x.x.xxx...x.x.', OH: '..........x.....' }],
    ['When The Levee Breaks', 72, { BD: 'xx.....x..xx....', SD: '....x.......x...', CH: 'x.x.x.x.x.x.x.x.' }],
    ['Walk This Way', 108, { BD: 'x......xx.x.....', SD: '....x.......x...', CH: '..x.x.x.x.x.x.x.', OH: 'x...............' }],
    ['Mardi Gras 1', 100, { BD: 'x.........x..x..', SD: '....x.......x...', CH: 'x.x.x.xxx.x.x.xx', CB: 'x.x..x...x..x...', HT: '....x..x..x..x.x' }],
    ['Mardi Gras 2', 100, { BD: 'x..x......x.....', SD: '....x..x.x..x...', CH: 'x...x.xxx.x.x...', OH: '..............x.', CB: 'x.x..x...x..x...', HT: '....x..x..x..x.x' }],
    ['Synthetic Substitution', 98, { BD: 'x.x....x.xxx...x', SD: '....x.......x...', CH: 'x.x.x.x.x.x.x.x.' }],
    ['Amen Brother 1', 136, { BD: 'x.x.......xx....', SD: '....x..x.x..x..x', CY: 'x.x.x.x.x.x.x.x.' }],
    ['Amen Brother 2', 136, { BD: 'x.x.......xx....', SD: '....x..x.x..x..x', CY: 'x.x.x.x.x.x.x.x.' }],
    ['Amen Brother 3', 136, { BD: 'x.x.......x.....', SD: '....x..x.x....x.', CY: 'x.x.x.x.x.x.x.x.' }],
    ['Amen Brother 4', 136, { BD: '..xx......x.....', SD: '.x..x..x.x....x.', CY: 'x.x.x.x.x...x.x.', OH: '..........x.....' }],
  ];
  CLASSICS.forEach(([name, bpm, r], i) => {
    const rows = {};
    for (const inst of INSTRUMENTS) rows[inst] = r[inst] || '................';
    rows.AC = r.AC || '....x.......x...'; // backbeats fuertes; las demás cajas quedan como ghost notes
    BOOK_PATTERNS.push({
      id: `x_classics_${i + 1}`, style: 'Classics', name, steps: 16, stepsPerBeat: 4, beatsPerBar: 4, bpm,
      src: 'U-MA, tabla "Classic Breakbeats"', rows,
    });
  });

  // Cumbia: groove sacado de "BASE CUMBIA VILLERA 90 BPM.mp3" (tocar a 90 BPM)
  BOOK_PATTERNS.push({
    id: 'x_cumbia_villera_90', style: 'Cumbia', name: 'Cumbia Villera 90', steps: 16, stepsPerBeat: 4, beatsPerBar: 4, bpm: 90,
    src: 'U-MA, del audio "Base Cumbia Villera 90 BPM"',
    rows: {
      BD: 'x...x...x...x...',
      SD: '....x.......x...',
      CH: 'x.xxx.xxx.xxx.xx', // güiro
      OH: '................',
      CP: '................',
      RS: '................',
      LT: '................',
      MT: '......x.......x.', // timbal bajo
      HT: '..x.......x.....', // timbal alto
      CB: '................',
      CY: '................',
      AC: '....x.......x...',
    },
  });

  // Cumbia: base de una sesión de Ableton (Bell Stick, DM-CA8 17, Hit 06)
  BOOK_PATTERNS.push({
    id: 'x_cumbia_ableton', style: 'Cumbia', name: 'Cumbia Bell', steps: 16, stepsPerBeat: 4, beatsPerBar: 4, bpm: 95,
    src: 'U-MA, de una base en Ableton',
    rows: {
      BD: '................',
      SD: '................',
      CH: 'x.xxx.xxx.xxx.xx', // DM-CA8 17
      OH: '................',
      CP: '..xx..xx..xx..xx', // Hit 06
      RS: '................',
      LT: '................',
      MT: '................',
      HT: '................',
      CB: 'x...x...x...x...', // Bell Stick
      CY: '................',
      AC: '................',
    },
  });

  // Cumbia: groove de la partitura "Cumbia en Batería" (Prof. Daniel Vargas, ♩ = 100)
  BOOK_PATTERNS.push({
    id: 'x_cumbia_bateria_100', style: 'Cumbia', name: 'Cumbia Batería 100', steps: 16, stepsPerBeat: 4, beatsPerBar: 4, bpm: 100,
    src: 'U-MA, de la partitura "Cumbia en Batería"',
    rows: {
      BD: '....x.x.....x.x.', // silencio de negra + dos corcheas en 2 y 4
      SD: '................',
      CH: 'x.xxx.xxx.xxx.xx', // charles cerrado: corchea + dos semicorcheas
      OH: '................',
      CP: '................',
      RS: 'x...x...x...x...', // caja en x (aro) en cada tiempo
      LT: '................',
      MT: '................',
      HT: '................',
      CB: '................',
      CY: '................',
      AC: '................',
    },
  });
})();
