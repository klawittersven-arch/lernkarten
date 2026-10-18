/* Lernkarten: Inhalte aller Kartensätze, Übersichtsseite, Bedienung (am Beispiel KB I),
 * Layout aller Karten auf großem und kleinem Handy, Offline, Datenschutz. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const H = require('./hilfen');

const APP = path.join(H.DOCS, 'app');
const ERGEBNISSE = path.join(__dirname, 'ergebnisse');

// Erwartete Kartensätze (neuer Kartensatz → hier eine Zeile ergänzen)
const SAETZE = [
  { ordner: 'kb1-diabetes', themen: 11, karten: 77, hinweis: true },
  { ordner: 'kb2-beratung', themen: 7, karten: 81, hinweis: true }
];

function kartenLaden(ordner) {
  const box = {};
  vm.runInNewContext(fs.readFileSync(path.join(H.DOCS, ordner, 'karten.js'), 'utf8') + '\nthis.D = LERNKARTEN;', box);
  return box.D;
}

(async () => {
  /* ---------- 1. Inhalte ---------- */
  const vorhanden = fs.readdirSync(H.DOCS).filter((d) => fs.existsSync(path.join(H.DOCS, d, 'karten.js'))).sort();
  console.log('\n== Kartensätze in docs/');
  H.pruefe(JSON.stringify(vorhanden) === JSON.stringify(SAETZE.map((s) => s.ordner).sort()), `Kartensätze: ${vorhanden.join(', ')}`, vorhanden);
  const swKb1 = fs.readFileSync(path.join(H.DOCS, 'kb1-diabetes', 'sw.js'), 'utf8');

  for (const S of SAETZE) {
    console.log(`\n== Inhalte ${S.ordner}/karten.js`);
    const D = S.daten = kartenLaden(S.ordner);
    const alle = [];
    D.themen.forEach((t) => t.karten.forEach((k) => alle.push(k)));
    H.pruefe(D.themen.length === S.themen, `${S.themen} Themen`, D.themen.length);
    H.pruefe(alle.length === S.karten, `${S.karten} Karten`, alle.length);
    H.pruefe(D.themen.every((t) => (t.ab || t.titel) && t.karten.length > 0), 'jedes Thema hat einen Titel und Karten');
    const fehlerhaft = alle.filter((k) => {
      const hinten = [].concat(k.hinten);
      return typeof k.vorne !== 'string' || !k.vorne.trim() || !hinten.length || hinten.some((h) => typeof h !== 'string' || !h.trim());
    });
    H.pruefe(fehlerhaft.length === 0, 'jede Karte hat Vorder- und Rückseite', fehlerhaft.map((k) => k.vorne));
    const schluessel = alle.map((k) => k.vorne + '|' + (k.fall || ''));
    const doppelt = schluessel.filter((s, i) => schluessel.indexOf(s) !== i);
    H.pruefe(doppelt.length === 0, 'keine zwei Karten mit gleicher Vorder- und Fallseite', doppelt);
    const ohneHilfe = alle.filter((k) => k.hilfe !== undefined && !(D.hilfen && D.hilfen[k.hilfe] && D.hilfen[k.hilfe].titel && Array.isArray(D.hilfen[k.hilfe].punkte) && D.hilfen[k.hilfe].punkte.length));
    H.pruefe(ohneHilfe.length === 0, 'jede Liste zum Nachschlagen (hilfe) ist in „hilfen“ vorhanden', ohneHilfe.map((k) => k.vorne));
    const texte = alle.flatMap((k) => [k.vorne, k.fall || '', k.hinweis || ''].concat(k.hinten)).concat([D.hinweis || '']);
    const sterne = texte.filter((t) => {
      const ohneFett = t.replace(/\*\*(.+?)\*\*/g, '$1');
      return (t.match(/\*\*/g) || []).length % 2 || (ohneFett.match(/\*/g) || []).length % 2;
    });
    H.pruefe(sterne.length === 0, '**fett** und *kursiv* immer paarweise', sterne);
    // „umrechnen“ (KB I) ist kein Operator der Prüfung und steht auch in der Ich-kann-Liste nicht kursiv
    const ohneOperator = alle.filter((k) => !/\*[a-zäöü]+\*/.test(k.vorne) && !/ umrechnen\.$/.test(k.vorne));
    H.pruefe(ohneOperator.length === 0, 'jede Vorderseite nennt einen *kursiven* Operator', ohneOperator.map((k) => k.vorne));
    // Karten zu den Operatoren selbst sind auf Wunsch entfernt (stehen auf der Ich-kann-Liste)
    const opKarten = alle.filter((k) => /Was wird von mir erwartet|zum Operator/.test(k.vorne)).concat(D.themen.filter((t) => /Operatoren/.test(t.titel || '')));
    H.pruefe(opKarten.length === 0, 'keine eigenen Karten zu den Operatoren', opKarten.map((k) => k.vorne || k.titel));
    H.pruefe(alle.every((k) => k.afb === undefined || /^(I|II|III)( \+ (I|II|III))?$/.test(k.afb)), 'AFB-Angaben haben die Form „I“, „II“, „I + II“ …');
    const benutzt = [...new Set([...fs.readFileSync(path.join(APP, 'lernkarten.js'), 'utf8').matchAll(/(?<![.\w])T\.(\w+)/g)].map((m) => m[1]))];
    const fehlen = benutzt.filter((k) => typeof D.texte[k] !== 'string');
    H.pruefe(fehlen.length === 0, `alle ${benutzt.length} Beschriftungen der Oberfläche vorhanden`, fehlen);
    const html = fs.readFileSync(path.join(H.DOCS, S.ordner, 'index.html'), 'utf8');
    const manifest = JSON.parse(fs.readFileSync(path.join(H.DOCS, S.ordner, 'manifest.json'), 'utf8'));
    H.pruefe(html.includes('<script src="karten.js">') && html.includes('<script src="../app/lernkarten.js">') && html.includes(D.titel),
      'index.html lädt karten.js und die gemeinsame App, Titel stimmt');
    H.pruefe(manifest.name.includes(D.titel) && manifest.icons.every((i) => fs.existsSync(path.join(H.DOCS, S.ordner, i.src))), 'manifest.json: Titel und Symbole stimmen');
    H.pruefe(fs.readFileSync(path.join(H.DOCS, S.ordner, 'sw.js'), 'utf8') === swKb1, 'sw.js ist in allen Kartensätzen gleich');
  }
  const namen = SAETZE.map((s) => s.daten.speicherName);
  H.pruefe(new Set(namen).size === namen.length, 'jeder Kartensatz hat einen eigenen speicherName', namen);

  /* ---------- 2. Übersichtsseite ---------- */
  const { server, basis } = await H.serverStarten();
  const browser = await H.chromium.launch();
  const protokoll = { konsole: [], extern: [] };

  console.log('\n== Übersicht aller Kartensätze');
  {
    const ctx = await browser.newContext(H.MOBIL);
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'uebersicht');
    for (const S of SAETZE) {
      await p.goto(basis);
      await p.click(`a.satz[href="${S.ordner}/"]`);
      await p.waitForSelector('#knopf-start');
      H.pruefe(p.url() === basis + S.ordner + '/' && (await p.locator('#titel').innerText()) === S.daten.titel, `Link führt zu „${S.daten.titel}“`);
    }
    await ctx.close();
  }

  console.log('\n== Bedienung am Beispiel KB I (Handy 390 × 844)');
  const url = basis + 'kb1-diabetes/';
  const D = SAETZE[0].daten;
  {
    const ctx = await browser.newContext(H.MOBIL);
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'bedienung');
    p.on('dialog', (d) => d.accept());
    await p.goto(url);
    H.pruefe(await p.locator('#knopf-start').innerText() === 'Alle 77 Karten lernen', 'Start: „Alle 77 Karten lernen“');
    H.pruefe(await p.locator('.thema').count() === 11, 'Start: 11 Themen zur Auswahl');

    await p.click('#keine-themen');
    H.pruefe(await p.locator('#knopf-start').isDisabled(), '„Keine“: Start-Knopf gesperrt');
    await p.locator('.thema', { hasText: 'So regelt Insulin den Blutzucker' }).locator('input').check();
    H.pruefe(await p.locator('#knopf-start').innerText() === 'Alle 8 Karten lernen', 'ein Thema gewählt: „Alle 8 Karten lernen“');

    await p.click('#knopf-start');
    const zaehler = () => p.locator('#zaehler').innerText();
    H.pruefe(await zaehler() === '1 / 8', 'Runde startet bei 1 / 8');
    const vorne = await p.locator('#vorne-text').innerText();
    H.pruefe(vorne.startsWith('Ich kann den Regelkreis') && await p.locator('#vorne-text strong').count() > 0 && await p.locator('#vorne-text em').count() > 0,
      'Vorderseite: Kompetenz mit fettem Teilaspekt und kursivem Operator', vorne);
    H.pruefe((await p.locator('#vorne-kopf').innerText()).includes('AB „So regelt Insulin den Blutzucker“ · Nr. 1'), 'Kopfzeile nennt AB und Nummer');
    H.pruefe(!(await p.locator('#karte').getAttribute('class')).includes('umgedreht'), 'Karte zeigt zuerst die Vorderseite');

    await p.click('#karte');
    await H.warte(550);
    H.pruefe((await p.locator('#karte').getAttribute('class')).includes('umgedreht'), 'Antippen dreht die Karte um');
    H.pruefe(await p.locator('#hinten-text ol li').count() === 3 && await p.locator('#seite-hinten').getAttribute('aria-hidden') === 'false',
      'Rückseite: nummerierte Liste (Schritte 1–3), für Bildschirmleser sichtbar');
    await p.click('#karte');
    await H.warte(550);
    H.pruefe(!(await p.locator('#karte').getAttribute('class')).includes('umgedreht'), 'nochmal antippen: wieder Vorderseite');

    await p.click('#knopf-gewusst');
    await H.warte(400);
    H.pruefe(await zaehler() === '2 / 8' && await p.locator('#anzahl-gewusst').innerText() === '1', '„Gewusst“: weiter zu 2 / 8, Zähler grün = 1');
    const start2 = await p.locator('#hinten-text ol').getAttribute('start');
    H.pruefe(start2 === '4', 'Schritte 4–5 beginnen mit Nummer 4', start2);
    await p.click('#knopf-nochnicht');
    await H.warte(400);
    H.pruefe(await zaehler() === '3 / 8' && await p.locator('#anzahl-nochnicht').innerText() === '1', '„Noch nicht“: weiter zu 3 / 8, Zähler orange = 1');
    await p.click('#knopf-zurueck');
    await H.warte(400);
    H.pruefe(await zaehler() === '2 / 8' && await p.locator('#anzahl-nochnicht').innerText() === '0', '„Zurück“ nimmt die letzte Bewertung zurück');

    // Wischen (Maus erzeugt dieselben Pointer-Ereignisse wie ein Finger)
    const box = await p.locator('#karte').boundingBox();
    const mx = box.x + box.width / 2, my = box.y + box.height / 2;
    await p.mouse.move(mx, my); await p.mouse.down();
    for (let i = 1; i <= 8; i++) await p.mouse.move(mx + i * 5, my);
    await p.mouse.up();
    await H.warte(400);
    H.pruefe(await zaehler() === '2 / 8' && !(await p.locator('#karte').getAttribute('class')).includes('umgedreht'),
      'kurzes Wischen (40 px): Karte federt zurück, wird nicht umgedreht');
    await p.mouse.move(mx, my); await p.mouse.down();
    for (let i = 1; i <= 10; i++) await p.mouse.move(mx + i * 16, my + i);
    await p.mouse.up();
    await H.warte(400);
    H.pruefe(await zaehler() === '3 / 8' && await p.locator('#anzahl-gewusst').innerText() === '2', 'nach rechts wischen = gewusst');
    await p.mouse.move(mx, my); await p.mouse.down();
    for (let i = 1; i <= 10; i++) await p.mouse.move(mx - i * 16, my);
    await p.mouse.up();
    await H.warte(400);
    H.pruefe(await zaehler() === '4 / 8' && await p.locator('#anzahl-nochnicht').innerText() === '1', 'nach links wischen = noch nicht');

    // Tastatur
    await p.keyboard.press('ArrowRight');
    await H.warte(400);
    H.pruefe(await zaehler() === '5 / 8', 'Pfeil rechts = gewusst');

    // Neu laden mitten in der Runde
    await p.reload();
    H.pruefe((await p.locator('#knopf-start').innerText()) === 'Weiterlernen · Karte 5 von 8', 'nach Neuladen: „Weiterlernen · Karte 5 von 8“');
    await p.click('#knopf-start');
    H.pruefe(await zaehler() === '5 / 8' && await p.locator('#anzahl-gewusst').innerText() === '3', 'Weiterlernen setzt bei 5 / 8 fort, Zähler erhalten');

    for (const wert of ['n', 'g', 'n', 'g']) {
      await p.click(wert === 'g' ? '#knopf-gewusst' : '#knopf-nochnicht');
      await H.warte(350);
    }
    H.pruefe(await p.locator('#ansicht-ergebnis').isVisible(), 'nach der letzten Karte: Ergebnis');
    H.pruefe(await p.locator('#ergebnis-zahl').innerText() === '5 von 8 Karten gewusst', 'Ergebnis: 5 von 8 Karten gewusst');
    H.pruefe(await p.locator('#knopf-wiederholen').innerText() === '3 Karten wiederholen', 'Angebot: „3 Karten wiederholen“');
    await p.click('#knopf-wiederholen');
    H.pruefe(await zaehler() === '1 / 3', 'Wiederholungsrunde mit den 3 offenen Karten');
    await p.click('#knopf-schliessen');
    const stand = await p.locator('.thema', { hasText: 'So regelt Insulin' }).locator('.thema-stand').innerText();
    H.pruefe(stand.startsWith('5 von 8 gewusst'), 'Übersicht: Thema zeigt „5 von 8 gewusst“', stand);
    H.pruefe((await p.locator('#knopf-start').innerText()) === 'Weiterlernen · Karte 1 von 3', 'Übersicht bietet Weiterlernen an');
    H.pruefe((await p.locator('#knopf-start-2').innerText()) === 'Nur offene Karten lernen (3)', 'zweite Wahl: „Nur offene Karten lernen (3)“');

    await p.click('.schalter');
    await p.reload();
    H.pruefe(await p.locator('#mischen').isChecked(), '„Karten mischen“ bleibt nach Neuladen eingeschaltet');
    H.pruefe(await p.locator('.thema input:checked').count() === 1, 'Themenauswahl bleibt nach Neuladen erhalten');
    await p.click('#alle-themen');
    await p.click('#knopf-start-2'); // neue Runde (offene Karten), gemischt
    const reihenfolge = [];
    for (let i = 0; i < 6; i++) {
      reihenfolge.push(await p.locator('#vorne-text').innerText());
      await p.keyboard.press('ArrowLeft'); await H.warte(300);
    }
    const ersteSechs = D.themen.flatMap((t) => t.karten).slice(0, 6).map((k) => k.vorne.replace(/\*/g, ''));
    H.pruefe(JSON.stringify(reihenfolge) !== JSON.stringify(ersteSechs), 'gemischt: andere Reihenfolge als in der Liste');

    await p.click('#knopf-schliessen');
    await p.click('#zuruecksetzen');
    H.pruefe((await p.locator('#gesamt-text').innerText()) === 'Ihr Lernstand: 0 von 77 Karten gewusst', '„Lernstand löschen“ setzt alles zurück');
    const cookies = await ctx.cookies();
    H.pruefe(cookies.length === 0, 'keine Cookies');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'lernkarten-start.png') });
    await ctx.close();
  }

  /* ---------- 3. Besonderheiten KB II ---------- */
  console.log('\n== Besonderheiten KB II (Hinweis auf der Startseite, kurzer Thementitel)');
  {
    const ctx = await browser.newContext(Object.assign({}, H.MOBIL, { reducedMotion: 'reduce' }));
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'kb2');
    await p.goto(basis + 'kb1-diabetes/');
    H.pruefe((await p.locator('#start-hinweis').innerText()).startsWith('In der Klausur kommt ein anderer Fall'), 'KB I: Hinweis „anderer Fall“ auf der Startseite');
    await p.goto(basis + 'kb2-beratung/');
    H.pruefe((await p.locator('#start-hinweis').innerText()).startsWith('In der Klausur kommt ein anderer Fall'), 'KB II: Hinweis „anderer Fall“ auf der Startseite');
    await p.click('#knopf-start');
    H.pruefe(await p.locator('#zaehler').innerText() === '1 / 81', 'KB II: Runde mit 81 Karten');
    H.pruefe((await p.locator('#vorne-kopf').innerText()) === 'AB „Die Wittener Werkzeuge“ · Nr. 1', 'Kopfzeile mit AB und Nummer (ohne AFB)', await p.locator('#vorne-kopf').innerText());
    await p.click('#knopf-schliessen');
    const titel = await p.locator('.thema-titel').allInnerTexts();
    H.pruefe(titel.includes('ABs zum Beratungsprozess (6 Phasen, Beratung planen)'), 'langer Abschnitt mit drei ABs erscheint unter seinem kurzen Titel');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'kb2-start.png') });
    await ctx.close();
  }

  /* ---------- 3b. Liste zum Nachschlagen (STOPP-Checkliste) ---------- */
  console.log('\n== Knopf „STOPP-Checkliste anzeigen“ (KB I)');
  {
    const ctx = await browser.newContext(Object.assign({}, H.MOBIL, { reducedMotion: 'reduce' }));
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'hilfe');
    await p.goto(basis + 'kb1-diabetes/');
    await p.click('#keine-themen');
    await p.locator('.thema', { hasText: 'Sicher entscheiden vor der Insulingabe' }).locator('input').check();
    await p.click('#knopf-start');
    H.pruefe(await p.locator('#hilfe-knopf').isVisible() && (await p.locator('#hilfe-knopf').innerText()) === '📋 STOPP-Checkliste anzeigen',
      'STOPP-Karte: Knopf „📋 STOPP-Checkliste anzeigen“ unter der Karte');
    const platz = await p.evaluate(() => document.querySelector('.lern-leiste').getBoundingClientRect().top - document.getElementById('hilfe-knopf').getBoundingClientRect().bottom);
    H.pruefe(platz >= 0, 'Karte und Knopf passen über die Bewertungsknöpfe', platz);
    await p.click('#hilfe-knopf');
    H.pruefe(await p.locator('#hilfe-dialog').isVisible() && (await p.locator('#hilfe-titel').innerText()) === 'STOPP-Checkliste'
      && await p.locator('#hilfe-inhalt li').count() === 8 && (await p.locator('#hilfe-inhalt li').nth(5).innerText()) === 'aktueller Blutzuckerwert',
      'Knopf öffnet die STOPP-Checkliste mit allen 8 Punkten');
    H.pruefe(!(await p.locator('#karte').getAttribute('class')).includes('umgedreht'), 'die Karte dreht sich dabei nicht um');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'stopp-checkliste.png') });
    await p.keyboard.press('ArrowRight');
    H.pruefe((await p.locator('#zaehler').innerText()) === '1 / 8', 'solange die Liste offen ist, geht das Lernen nicht versehentlich weiter');
    await p.click('#hilfe-schliessen');
    H.pruefe(await p.locator('#hilfe-dialog').isHidden(), '„Schließen“ schließt die Liste');
    await p.click('#karte');
    H.pruefe(await p.locator('#hilfe-knopf').isVisible(), 'Knopf auch auf der Rückseite (dort stehen die Punktnummern)');
    await p.click('#hilfe-knopf');
    await p.keyboard.press('Escape');
    H.pruefe(await p.locator('#hilfe-dialog').isHidden() && await p.locator('#ansicht-lernen').isVisible(), 'Esc schließt nur die Liste, nicht die Lernrunde');
    for (let i = 0; i < 3; i++) await p.click('#knopf-gewusst');
    H.pruefe((await p.locator('#zaehler').innerText()) === '4 / 8' && await p.locator('#hilfe-knopf').isHidden(), 'Karte ohne Liste (Wenn-dann-Regeln): kein Knopf');
    await ctx.close();
  }

  /* ---------- 4. Alle Karten: Layout auf großen und kleinen Handys ---------- */
  for (const S of SAETZE) {
    for (const [breite, hoehe, schema] of [[390, 844, 'light'], [320, 568, 'dark']]) {
      console.log(`\n== ${S.ordner}: alle ${S.karten} Karten bei ${breite} × ${hoehe} (${schema === 'dark' ? 'dunkles' : 'helles'} Design)`);
      const ctx = await browser.newContext(Object.assign({}, H.MOBIL, { viewport: { width: breite, height: hoehe }, reducedMotion: 'reduce', colorScheme: schema }));
      const p = await ctx.newPage();
      H.beobachten(p, protokoll, `layout-${S.ordner}-${breite}`);
      await p.goto(basis + S.ordner + '/');
      await p.click('#knopf-start');
      const lang = [], quer = [], knopfHoch = [];
      let gezeigt = 0;
      for (let i = 0; i < S.karten; i++) {
        for (const seite of ['vorne', 'hinten']) {
          if (seite === 'hinten') await p.click('#karte');
          const m = await p.evaluate(() => {
            const karte = document.getElementById('karte').getBoundingClientRect();
            const leiste = document.querySelector('.lern-leiste').getBoundingClientRect();
            const knopf = document.getElementById('knopf-nochnicht').getBoundingClientRect();
            const hilfe = document.getElementById('hilfe-knopf');
            const unten = hilfe.hidden ? karte.bottom : hilfe.getBoundingClientRect().bottom;   // Karte samt Knopf darunter
            return {
              text: document.getElementById('vorne-text').innerText.slice(0, 60),
              hoehe: unten - karte.top, platz: leiste.top - karte.top,
              quer: document.documentElement.scrollWidth > window.innerWidth,
              knopf: knopf.height
            };
          });
          if (m.hoehe > m.platz + 1) lang.push(`${seite}: ${m.text}… (${Math.round(m.hoehe)} px bei ${Math.round(m.platz)} px Platz)`);
          if (m.quer) quer.push(m.text);
          if (m.knopf > 60) knopfHoch.push(m.knopf);
        }
        if (i === 47) await p.screenshot({ path: path.join(ERGEBNISSE, `${S.ordner}-${breite}-rueckseite.png`) });
        await p.click('#knopf-gewusst');
        gezeigt++;
      }
      H.pruefe(gezeigt === S.karten && await p.locator('#ansicht-ergebnis').isVisible(), `alle ${S.karten} Karten durchgeblättert, danach Ergebnis`);
      H.pruefe(quer.length === 0, 'nie seitlich verschiebbar (kein horizontales Scrollen)', quer);
      H.pruefe(knopfHoch.length === 0, '„Noch nicht“/„Gewusst“ einzeilig', knopfHoch.slice(0, 3));
      if (breite >= 390) H.pruefe(lang.length === 0, 'jede Karte passt ohne Scrollen auf den Bildschirm', lang);
      else console.log(`  (Info) ${lang.length} Kartenseiten sind auf dem kleinen Bildschirm länger und lassen sich scrollen` + (lang.length ? ':\n    ' + lang.join('\n    ') : ''));
      H.pruefe(await p.locator('#ergebnis-titel').innerText() === 'Alles gewusst – stark!', 'Ergebnis bei allen gewusst: „Alles gewusst – stark!“');
      await ctx.close();
    }
  }

  /* ---------- 5. Offline ---------- */
  console.log('\n== Offline nach dem ersten Laden (beide Kartensätze auf demselben Handy)');
  {
    const ctx = await browser.newContext(H.MOBIL);
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'offline');
    for (const S of SAETZE) {
      await p.goto(basis + S.ordner + '/');
      await p.evaluate(() => navigator.serviceWorker.ready);
      await p.reload();
      const sw = await p.evaluate(() => !!navigator.serviceWorker.controller && navigator.serviceWorker.controller.scriptURL);
      H.pruefe(sw && sw.endsWith(`/lernkarten/${S.ordner}/sw.js`), `${S.ordner}: eigener Service Worker aktiv`);
    }
    const caches = (await p.evaluate(async () => (await caches.keys()))).sort();
    const erwartet = SAETZE.map((s) => s.ordner).concat(['spiel', 'challenge']).sort();
    const gefunden = caches.map((c) => (c.match(/^lernkarten-\/lernkarten\/([a-z0-9-]+)\/-v\d+$/) || [])[1]).sort();
    H.pruefe(JSON.stringify(gefunden) === JSON.stringify(erwartet), `getrennte Offline-Speicher (Kartensätze, Spiel, Challenge): ${caches.join(', ')}`);
    await H.bis(() => p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration('../challenge/'); return !!(r && r.active); }));
    await ctx.setOffline(true);
    for (const S of SAETZE) {
      await p.goto(basis + S.ordner + '/');
      await p.click('#knopf-start');
      await p.click('#karte');
      await p.click('#knopf-gewusst');
      await H.warte(400);
      H.pruefe(await p.locator('#zaehler').innerText() === `2 / ${S.karten}`, `${S.ordner}: offline lernbar`);
      await p.goto(basis + 'challenge/?satz=' + S.ordner);
      await p.click('#knopf-challenge-start');
      H.pruefe((await p.locator('#zaehler').innerText()) === 'Aufgabe 1 / 20', `${S.ordner}: Klausur-Challenge startet auch offline (ohne sie vorher geöffnet zu haben)`);
    }
    await ctx.close();
  }

  /* ---------- 6. Datenschutz und Dateigrößen ---------- */
  console.log('\n== Datenschutz');
  H.pruefe(protokoll.extern.length === 0, 'keine Anfrage an fremde Adressen', protokoll.extern);
  H.pruefe(protokoll.konsole.length === 0, 'keine Fehler in der Konsole', protokoll.konsole);
  // fragen.js lädt nur die Klausur-Challenge, nicht die Lernkarten
  const groesse = (o) => fs.readdirSync(o).filter((d) => d !== 'fragen.js').reduce((t, d) => t + fs.statSync(path.join(o, d)).size, 0);
  for (const S of SAETZE) {
    const kb = Math.round((groesse(APP) + groesse(path.join(H.DOCS, S.ordner))) / 1024);
    H.pruefe(kb < 150, `${S.ordner}: alle Dateien der Lernkarten zusammen ${kb} KB (< 150 KB)`);
  }

  await browser.close();
  server.close();
  process.exit(H.ergebnis() ? 0 : 1);
})();
