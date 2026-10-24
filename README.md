# Drum Patterns · U-MA

Web app para probar, escribir y exportar patterns de caja de ritmos, organizados por estilo.
Hecha por Buenos Aires Front. Funciona en el navegador, también en el celular, sin instalar nada.

## Qué hace

- **Biblioteca por estilos**: Afro-Cuban, Blues, Bossa Nova, Funk, Rock, Reggae, Samba, Swing, Jungle, Drum and Bass,
  Urbano, Reggaeton, Hip Hop, Techno, House, Experimental, Classics (breakbeats clásicos), Cumbia y más.
  Cada pattern carga con su BPM.
- **Secuenciador** de 8, 12 o 16 pasos con 11 instrumentos + fila de acento:
  - toque: nota → acento → borrar
  - ratchets ×2 / ×3 / ×4
  - último paso (2–16) para compases irregulares
  - **Selec.**: atrasar o adelantar una nota en centésimas de paso
  - swing y mute por instrumento
- **Kits**: 808 y Clásica (batería acústica con sala), sintetizados con Web Audio.
- **Guardar** tus patterns en el navegador (★ Guardados), exportarlos e importarlos en JSON.
- **Exportar MIDI** (General MIDI, canal 10) del pattern o de un estilo entero, con acentos, ratchets y corrimientos.
- Interfaz en ES · EN · JA · ZH · DE · HI.

## Usarla

Abrí `index.html` en el navegador, o serví la carpeta:

```bash
python3 -m http.server 8770
```

y entrá a http://localhost:8770.

## Archivos

| Archivo | Qué tiene |
|---|---|
| `index.html`, `style.css` | página y gráfica U-MA |
| `app.js` | biblioteca, grilla, secuenciador, guardado y exportación |
| `audio.js` | kits de batería sintetizados |
| `midi.js` | escritura de archivos MIDI |
| `patterns.js` | patterns transcriptos del libro |
| `extra-patterns.js` | estilos U-MA (Jungle, DnB, Urbano, Reggaeton, Hip Hop, Techno, House, Experimental, Classics, Cumbia) |
| `i18n.js` | textos en 6 idiomas |

## Fuentes

*260 Drum Machine Patterns*, René-Pierre Bardet (Hal Leonard) · internet.

🄯 Buenos Aires Front · U-MA
