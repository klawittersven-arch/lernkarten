/* Schwierigkeit von „Diabetes Run!“ messen.
 *
 * Für mehrere Zeitpunkte eines Laufs wird jedes Hindernis-Muster, das das Spiel zu diesem
 * Zeitpunkt erzeugen kann, in seiner schwersten Form aufgebaut (kleinste Abstände, breiteste
 * Löcher). Dann werden alle Eingabe-Zeitpunkte (Springen, Doppelsprung, Ducken) im
 * 1/60-Sekunden-Raster durchprobiert:
 *   - „machbar“: Gibt es überhaupt eine Eingabefolge, mit der die Figur durchkommt?
 *   - „Reaktionszeit“: Wie lange darf man nach dem Auftauchen eines Hindernisses am rechten
 *     Bildrand höchstens warten, bis man reagieren muss? (beim schwersten Muster)
 * Zum Vergleich: Einfache Reaktionszeit beim Menschen ca. 0,2–0,25 s, mit Entscheidung
 * (springen oder ducken?) eher 0,3–0,45 s; dazu kommt die Verzögerung des Handy-Bildschirms.
 *
 * Aufruf: node schwierigkeit.test.js   (Ergebnis auch in ergebnisse/schwierigkeit.txt) */
'use strict';
const fs = require('fs');
const path = require('path');
const H = require('./hilfen');

const ZEITPUNKTE = [15, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300];

// Läuft im Browser: probiert Eingabefolgen für ein Muster durch
function suchen({ sekunde, muster, typ, raster }) {
  const S = window.PflegeSprint;
  const v = S.tempo(sekunde);
  const B = 320, X0 = 36 + 12;
  // Hindernis-Anfänge in px vor der Figur; das erste taucht gerade am rechten Rand auf
  const hind = [];
  let x = 324 - X0;
  muster.forEach((m, i) => {
    if (i > 0) x += m.abstandS * v;
    const breite = m.art === 'loch' ? m.breite : (m.art === 'lkw' ? Math.max(72, Math.round(v * 0.5)) : S.breite(m.art));
    hind.push({ art: m.art, abstand: x, breite, sichtbar: Math.max(0, (x + X0 - B) / v) });
    x += breite;
  });
  const dauer = (x + 60) / v + 0.4;
  const ankunft = hind.map((h) => h.abstand / v);
  const r = raster || 1 / 60;
  let beste = -1, machbar = false, beispiel = null;
  const versuch = (eingaben, zeiten) => {
    if (!S.probe(sekunde, hind, eingaben, dauer)) return;
    machbar = true;
    // Reaktionszeit: knappste Stelle dieser Eingabefolge (Aktion j gehört zu Hindernis j)
    const knapp = Math.min(...zeiten.map((t, j) => t - hind[Math.min(j, hind.length - 1)].sichtbar));
    if (knapp > beste) { beste = knapp; beispiel = zeiten; }
  };
  const bereich = (von, bis) => { const a = []; for (let t = Math.max(0, von); t <= bis + 1e-9; t += r) a.push(Math.round(t / r) * r); return a; };
  const t1s = bereich(ankunft[0] - 1.0, ankunft[0] + 0.2);
  if (typ === 'springen') {
    t1s.forEach((t1) => versuch([{ t: t1, springen: true }], [t1]));
  } else if (typ === 'ducken') {
    t1s.forEach((t1) => versuch([{ t: t1, ducken: true }], [t1]));
  } else if (typ === 'doppelsprung') {
    t1s.forEach((t1) => bereich(t1 + 0.05, t1 + 0.7).forEach((t2) =>
      versuch([{ t: t1, springen: true }, { t: t2, springen: true }], [t1])));
  } else if (typ === 'springen-ducken') {       // über Hindernis 1 springen, unter Hindernis 2 ducken
    t1s.forEach((t1) => bereich(t1, ankunft[1] + 0.1).forEach((t2) =>
      versuch([{ t: t1, springen: true }, { t: t2, ducken: true }], [t1, t2])));
  } else if (typ === 'ducken-springen') {       // unter Hindernis 1 ducken, über Hindernis 2 springen
    t1s.forEach((t1) => bereich(ankunft[0], ankunft[1] + 0.1).forEach((t2) =>
      versuch([{ t: t1, ducken: true }, { t: t2, ducken: false }, { t: t2, springen: true }], [t1, t2])));
  } else if (typ === 'springen-springen') {     // zwei Sprünge (oder einer über beides)
    t1s.forEach((t1) => {
      versuch([{ t: t1, springen: true }], [t1, t1 + 99]);
      bereich(t1 + 0.1, ankunft[1] + 0.1).forEach((t2) =>
        versuch([{ t: t1, springen: true }, { t: t2, springen: true }], [t1, t2]));
    });
  } else if (typ === 'lkw-ducken') {            // Doppelsprung über den Lkw, dann unter den Schwarm ducken
    const r2 = 1 / 30;
    bereich(ankunft[0] - 0.4, ankunft[0] + 0.1).forEach((t1) =>
      [0.2, 0.25, 0.3, 0.35].forEach((d) => {
        const t2 = t1 + d;
        for (let t3 = t2; t3 <= ankunft[1] + 0.1; t3 += r2) {
          versuch([{ t: t1, springen: true }, { t: t2, springen: true }, { t: t3, ducken: true }], [t1, t3]);
        }
      }));
  }
  return { machbar, reaktion: machbar ? Math.round(beste * 1000) / 1000 : null, beispiel };
}

(async () => {
  const { server, basis } = await H.serverStarten();
  const browser = await H.chromium.launch();
  const ctx = await browser.newContext(H.MOBIL);
  await ctx.addInitScript(() => {
    localStorage.setItem('lernkarten:kb1-diabetes:spiel-verdient', '1');
  });
  const p = await ctx.newPage();
  await p.goto(basis + 'spiel/?satz=kb1-diabetes');
  await p.waitForFunction(() => window.PflegeSprint && window.PflegeSprint.probe);
  const M = await p.evaluate(() => !!window.PflegeSprint.muster);
  const zeilen = [];
  const log = (t) => { zeilen.push(t); console.log(t); };
  let fehler = 0, pruefungen = 0;
  const pruefe = (ok, text, d) => { pruefungen++; if (!ok) fehler++; log((ok ? '  ✓ ' : '  ✗ ') + text + (ok || d === undefined ? '' : '  → ' + JSON.stringify(d))); };

  log('Schwierigkeit von „Diabetes Run!“ (schwerstes Muster je Zeitpunkt)');
  log('Zeit   Tempo     Sichtbar*  knappste Reaktionszeit (Muster)              alle machbar?');
  const ergebnisse = [];
  for (const sekunde of ZEITPUNKTE) {
    const P = M ? await p.evaluate((s) => window.PflegeSprint.muster(s), sekunde) : null;
    const v = await p.evaluate((s) => window.PflegeSprint.tempo(s), sekunde);
    // Parameter der schwersten Muster zu diesem Zeitpunkt
    const h = P ? P.h : (sekunde < 30 ? 0 : Math.min(1, (sekunde - 30) / 60));
    const schwer = sekunde >= 30;
    const lochMax = P ? P.lochMax : 26 + 14 + 46 * h;
    const kombiWespe = P ? P.kombiWespe : 0.50 - 0.12 * h;
    const kombiLoch = P ? P.kombiLoch : 0.42 - 0.12 * h;
    const abstandMin = P ? P.abstandMin : Math.max(110 / v, 0.85 - 0.4 * h);
    const muster = [
      ['Kuchen', [{ art: 'kuchen' }], 'springen'],
      ['Weinkiste', [{ art: 'weinkiste' }], 'springen'],
      ['Rollator', [{ art: 'rollator' }], 'springen'],
      ['Pflegewagen', [{ art: 'pflegewagen' }], 'springen'],
      ['Wespenschwarm', [{ art: 'schwarm' }], 'ducken'],
      ['Hindernis → Wespen (Abstand)', [{ art: 'weinkiste' }, { art: 'schwarm', abstandS: abstandMin }], 'springen-ducken'],
      ['Wespen → Hindernis (Abstand)', [{ art: 'schwarm' }, { art: 'weinkiste', abstandS: abstandMin }], 'ducken-springen'],
      ['Hindernis → Hindernis (Abstand)', [{ art: 'pflegewagen' }, { art: 'rollator', abstandS: abstandMin }], 'springen-springen']
    ];
    if (schwer) {
      muster.push(
        ['Schlagloch (breitestes)', [{ art: 'loch', breite: Math.round(lochMax) }], 'springen'],
        ['KBS-Lkw', [{ art: 'lkw' }], 'doppelsprung'],
        ['Kombi Hindernis + Wespen', [{ art: 'weinkiste' }, { art: 'schwarm', abstandS: kombiWespe }], 'springen-ducken'],
        ['Kombi Hindernis + Loch', [{ art: 'weinkiste' }, { art: 'loch', breite: 44, abstandS: kombiLoch }], 'springen-springen'],
        ['Lkw → Wespen (Abstand)', [{ art: 'lkw' }, { art: 'schwarm', abstandS: abstandMin }], 'lkw-ducken']
      );
    }
    // alte Fassung: ab 100 s nur noch Weinkiste mit Wespenschwarm direkt dahinter
    if (!M && sekunde >= 100) muster.push(['Schlussphase (alt)', [{ art: 'weinkiste' }, { art: 'schwarm', abstandS: 0.1 }], 'springen-ducken']);
    let knappste = { reaktion: Infinity, name: '' };
    const unmachbar = [];
    for (const [name, m, typ] of muster) {
      const e = await p.evaluate(suchen, { sekunde, muster: m, typ });
      if (!e.machbar) unmachbar.push(name);
      else if (e.reaktion < knappste.reaktion) knappste = { reaktion: e.reaktion, name };
    }
    const sicht = 276 / v;
    ergebnisse.push({ sekunde, v, knappste, unmachbar });
    log(`${String(sekunde).padStart(3)} s  ${String(Math.round(v)).padStart(4)} px/s  ${sicht.toFixed(2)} s     ${knappste.reaktion.toFixed(2)} s (${knappste.name})`.padEnd(82) +
      (unmachbar.length ? 'NEIN: ' + unmachbar.join(', ') : 'ja'));
  }
  log('* Sichtbar = Zeit vom Auftauchen am rechten Bildrand bis zur Figur');

  // Dichte: Hindernisse je Minute (Mittel aus 20 unverwundbaren Läufen à 5 Minuten)
  const dichte = M ? await p.evaluate(() => {
    const summe = [];
    for (let n = 0; n < 20; n++) {
      window.PflegeSprint.ablauf(300, 30).forEach((a, i) => {
        summe[i] = summe[i] || { bis: a.bis, hindernisse: 0, lkw: 0, loch: 0, kombi: 0 };
        ['hindernisse', 'lkw', 'loch', 'kombi'].forEach((k) => { summe[i][k] += a[k] / 20 * 2; }); // je Minute
      });
    }
    return summe;
  }) : [];
  if (dichte.length) {
    log('\nHindernisse je Minute (Mittel aus 20 Läufen)');
    log('Abschnitt      Hindernisse  davon Lkw  Schlaglöcher  Kombinationen');
    dichte.forEach((d) => log(`${String(d.bis - 30).padStart(3)}–${String(d.bis).padEnd(3)} s     ${d.hindernisse.toFixed(0).padStart(5)}     ${d.lkw.toFixed(1).padStart(6)}    ${d.loch.toFixed(1).padStart(6)}       ${d.kombi.toFixed(1).padStart(6)}`));
  }

  if (M) {
    log('\nPrüfungen');
    const bis4 = ergebnisse.filter((e) => e.sekunde <= 240);
    pruefe(bis4.every((e) => !e.unmachbar.length), 'bis 4 Minuten ist jedes Muster mit passender Eingabe machbar (kein absichtliches Ende)',
      bis4.filter((e) => e.unmachbar.length).map((e) => [e.sekunde, e.unmachbar]));
    const r = (s) => ergebnisse.find((e) => e.sekunde === s).knappste.reaktion;
    pruefe(r(15) >= 0.9 && r(30) >= 0.8, `die ersten 30 Sekunden sind gemütlich (≥ 0,8 s Reaktionszeit: ${r(15)} / ${r(30)} s)`);
    pruefe(ergebnisse.every((e, i) => i === 0 || e.knappste.reaktion <= ergebnisse[i - 1].knappste.reaktion + 0.02), 'die Reaktionszeit wird stetig knapper');
    pruefe(r(180) >= 0.33 && r(180) <= 0.45, `nach 3 Minuten schwer, aber machbar (${r(180)} s)`);
    pruefe(r(240) <= 0.3, `nach 4 Minuten kaum noch zu schaffen (${r(240)} s)`);
    pruefe(r(300) <= 0.22, `nach 5 Minuten praktisch unmöglich (${r(300)} s)`);
    pruefe(dichte.every((d, i) => i === 0 || d.hindernisse >= dichte[i - 1].hindernisse - 3), 'die Zahl der Hindernisse je Minute steigt stetig',
      dichte.map((d) => Math.round(d.hindernisse)));
    pruefe(dichte[0].lkw === 0 && dichte[0].loch === 0 && dichte[0].kombi === 0, 'in den ersten 30 Sekunden keine Lkw, Schlaglöcher oder Kombinationen');
    const anteil = (d) => (d.lkw + d.loch + d.kombi) / d.hindernisse;
    pruefe(anteil(dichte[1]) < anteil(dichte[4]) && anteil(dichte[4]) < anteil(dichte[7]), 'schwierige Hindernisse und Abfolgen werden immer häufiger',
      [1, 4, 7].map((i) => Math.round(100 * anteil(dichte[i])) + ' %'));
    // Gegenprobe: ohne Eingabe scheitert die Figur an jedem Muster (sonst wäre „machbar“ wertlos)
    const ohne = await p.evaluate(() => ['kuchen', 'weinkiste', 'rollator', 'pflegewagen', 'schwarm', 'loch', 'lkw'].filter((art) =>
      window.PflegeSprint.probe(120, [{ art, abstand: 200, breite: 40 }], [], 2)));
    pruefe(ohne.length === 0, 'Gegenprobe: ohne Springen/Ducken scheitert die Figur an jedem Hindernis', ohne);
    const punkte = await p.evaluate(() => [240, 300, 360].map((s) => window.PflegeSprint.punkteNach(s)));
    pruefe(punkte[2] < 20000, `Punkte nach 4/5/6 Minuten: ${punkte.join(' / ')} – unter der Grenze 20 000 des Apps Script`);
    log(`\n${pruefungen - fehler} von ${pruefungen} Prüfungen bestanden.`);
  }
  fs.writeFileSync(path.join(__dirname, 'ergebnisse', M ? 'schwierigkeit.txt' : 'schwierigkeit-vorher.txt'), zeilen.join('\n') + '\n');
  await browser.close();
  server.close();
  process.exit(fehler ? 1 : 0);
})();
