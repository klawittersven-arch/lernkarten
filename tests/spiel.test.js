/* Spielrunden „Diabetes Run!“ und Highscore-Listen:
 * 1. das Google-Apps-Script (lokal mit nachgebauter Tabelle)
 * 2. Freischaltung in den Lernkarten, Spiel, Eintragen, Highscore-Seite, Zurücksetzen,
 *    Warteschlange ohne Verbindung, Offline-Start des Spiels. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const H = require('./hilfen');
const { attrappeErstellen, TEST_SCHLUESSEL } = require('./apps-script-attrappe');

const ERGEBNISSE = path.join(__dirname, 'ergebnisse');

// Karten-Kennungen wie in lernkarten.js berechnen
function kennung(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
function kartenIds(ordner) {
  const box = {};
  vm.runInNewContext(fs.readFileSync(path.join(H.DOCS, ordner, 'karten.js'), 'utf8') + '\nthis.D = LERNKARTEN;', box);
  const ids = [];
  box.D.themen.forEach((t) => t.karten.forEach((k) => ids.push('k' + kennung(k.vorne + '|' + (k.fall || '')))));
  return ids;
}

(async () => {
  /* ---------- 1. Apps Script ---------- */
  console.log('\n== Google-Apps-Script (lokal mit nachgebauter Tabelle)');
  {
    const a = attrappeErstellen();
    const e = (name, punkte, geraet = 'geraet000001', lauf = Math.random().toString(36).slice(2, 12)) =>
      a.post(JSON.stringify({ aktion: 'eintragen', liste: 'kb1-diabetes', name, punkte, geraet, lauf }));
    let r = a.get({ aktion: 'liste', liste: 'kb1-diabetes' });
    H.pruefe(r.ok && r.eintraege.length === 0, 'leere Liste, solange niemand gespielt hat');
    H.pruefe(a.get({ aktion: 'liste', liste: '../geheim' }).ok === false, 'unzulässiger Listenname wird abgelehnt');
    r = e('Mia S.', 120, 'geraet000001', 'lauf0000001');
    H.pruefe(r.ok && r.platz === 1, 'Eintrag „Mia S.“ angenommen, Platz 1', r);
    const blatt = a.blaetter.get('kb1-diabetes');
    H.pruefe(blatt && blatt.zeilen[0][1] === 'Name' && blatt.zeilen[1][3] === 'G-geraet000001' && blatt.zeilen[1][4] === 'L-lauf0000001',
      'Tabellenblatt „kb1-diabetes“ mit Kopfzeile, Kennungen mit Vorsilbe (nie als Zahl gedeutet)');
    r = e('Mia S.', 120, 'geraet000001', 'lauf0000001');
    H.pruefe(r.ok && r.doppelt && blatt.zeilen.length === 2, 'derselbe Lauf zweimal gesendet: nur einmal eingetragen');
    e('Mia S.', 80); e('Ben K.', 300, 'geraet000002'); e('ben k.', 150, 'geraet000002'); e('Ali A.', 120, 'geraet000003');
    r = a.get({ aktion: 'liste', liste: 'kb1-diabetes' });
    H.pruefe(JSON.stringify(r.eintraege) === JSON.stringify([{ name: 'Ben K.', punkte: 300 }, { name: 'Mia S.', punkte: 120 }, { name: 'Ali A.', punkte: 120 }]),
      'je Name die beste Runde, absteigend; bei Gleichstand zählt, wer zuerst da war', r.eintraege);
    const falsch = ['mia s.', 'M S.', 'Mia', 'Mia S', 'Mia SS.', '<b>Mia</b> S.', 'Fick S.', 'B1tch S.', 'Mia S. Mia S. Mia S. Mia'];
    H.pruefe(falsch.every((n) => e(n, 10).ok === false), 'ungültige oder unpassende Namen abgelehnt', falsch.filter((n) => e(n, 10).ok));
    H.pruefe([-1, 1.5, 20001, 'abc'].every((p) => e('Tom T.', p).ok === false), 'unplausible Punktzahlen abgelehnt');
    H.pruefe(a.post('kein json').ok === false, 'kaputte Anfrage abgelehnt');
    H.pruefe(a.post(JSON.stringify({ aktion: 'eintragen', liste: 'kb2-beratung', name: 'Eva E.', punkte: 50, geraet: 'geraet000004', lauf: 'lauf0000009' })).ok
      && a.get({ aktion: 'liste', liste: 'kb2-beratung' }).eintraege.length === 1
      && a.get({ aktion: 'liste', liste: 'kb1-diabetes' }).eintraege.length === 3, 'KB I und KB II sind getrennte Listen');
    let angenommen = 0;
    for (let i = 0; i < 20; i++) if (e('Lia L.', i, 'geraetviel01').ok) angenommen++;
    H.pruefe(angenommen === 15, 'höchstens 15 Einträge pro Gerät und Stunde', angenommen);
    H.pruefe(a.get({ aktion: 'zuruecksetzen', liste: 'kb1-diabetes', schluessel: 'falsch' }).ok === false, 'Zurücksetzen mit falschem Schlüssel abgelehnt');
    r = a.get({ aktion: 'zuruecksetzen', liste: 'kb1-diabetes', schluessel: TEST_SCHLUESSEL });
    H.pruefe(r.ok && a.get({ aktion: 'liste', liste: 'kb1-diabetes' }).eintraege.length === 0 && blatt.zeilen.length === 1,
      'Zurücksetzen mit Schlüssel leert die Liste (Kopfzeile bleibt)');
    H.pruefe(a.get({ aktion: 'liste', liste: 'kb2-beratung' }).eintraege.length === 1, 'Zurücksetzen von KB I lässt KB II unberührt');
    const ohne = attrappeErstellen({ schluesselEinsetzen: false });
    H.pruefe(ohne.get({ aktion: 'zuruecksetzen', liste: 'kb1-diabetes', schluessel: 'HIER-EIGENEN-SCHLUESSEL-EINTRAGEN' }).ok === false,
      'solange kein eigener Schlüssel eingetragen ist, geht Zurücksetzen gar nicht');
  }

  /* ---------- 2. Im Browser ---------- */
  const attrappe = attrappeErstellen();
  const { server, basis, attrappeAdresse } = await H.serverStarten({ attrappe });
  const browser = await H.chromium.launch();
  const protokoll = { konsole: [], extern: [] };
  const ids1 = kartenIds('kb1-diabetes');
  const OPT = Object.assign({}, H.MOBIL, { reducedMotion: 'reduce' });

  async function kontext(mitAdresse = true) {
    const ctx = await browser.newContext(OPT);
    if (!mitAdresse) await ctx.addInitScript(() => { window.HIGHSCORE_TEST_ADRESSE = 'keine'; });
    if (mitAdresse) await ctx.addInitScript((a) => { window.HIGHSCORE_TEST_ADRESSE = a; }, attrappeAdresse);
    return ctx;
  }
  const lesen = (p, k) => p.evaluate((k) => JSON.parse(localStorage.getItem(k)), k);
  async function spielBisEnde(p) {
    await p.click('#knopf-los');
    return H.bis(() => p.evaluate(() => window.PflegeSprint.zustand().bildschirm === 'ende'), { zeit: 30000 });
  }

  console.log('\n== Freischaltung in den Lernkarten (KB I)');
  const ctx = await kontext();
  const p = await ctx.newPage();
  H.beobachten(p, protokoll, 'kb1');
  p.on('dialog', (d) => d.accept());
  await p.goto(basis + 'kb1-diabetes/');
  H.pruefe(await p.locator('#spiel-box').isVisible(), 'Startseite zeigt den Spiel-Kasten');
  H.pruefe((await p.locator('#spiel-titel').innerText()) === 'Belohnungsspiel: Diabetes Run!', 'Titel „Belohnungsspiel: Diabetes Run!“');
  H.pruefe((await p.locator('#spiel-text').innerText()) === 'Bis zur nächsten Runde: 0 von 100 Karten', 'Fortschritt: „Bis zur nächsten Runde: 0 von 100 Karten“');
  H.pruefe((await p.locator('#spiel-regel').innerText()).startsWith('Für je 100 angeschaute Lernkarten dürfen Sie zur Belohnung eine Runde spielen'), 'Regel: je 100 angeschaute Karten eine Runde');
  H.pruefe(await p.locator('#spiel-los').isHidden(), 'ohne Freischaltung kein „Jetzt spielen“');
  H.pruefe((await p.locator('#highscore-link').getAttribute('href')) === '../highscore/?liste=kb1-diabetes', 'unauffälliger Link „Highscore-Liste“ unten auf der Startseite');

  await p.click('#knopf-start');
  H.pruefe((await p.locator('#spiel-rest').innerText()) === '🎮 noch 100 Karten bis zur Spielrunde', 'beim Lernen oben: „🎮 noch 100 Karten bis zur Spielrunde“');
  await p.click('#knopf-gewusst');            // ohne Umdrehen
  H.pruefe((await p.locator('#spiel-rest').innerText()) === '🎮 noch 99 Karten bis zur Spielrunde', 'jede Karte zählt sofort +1 – auch ohne Umdrehen');
  await p.click('#karte'); await p.click('#knopf-nochnicht'); // mit Umdrehen, „noch nicht“
  H.pruefe((await p.locator('#spiel-rest').innerText()) === '🎮 noch 98 Karten bis zur Spielrunde' && (await lesen(p, 'lernkarten:kb1-diabetes')).angeschaut === 2,
    'auch „noch nicht“ zählt: noch 98 Karten');
  await p.click('#knopf-zurueck');
  H.pruefe((await lesen(p, 'lernkarten:kb1-diabetes')).angeschaut === 1 && (await p.locator('#spiel-rest').innerText()) === '🎮 noch 99 Karten bis zur Spielrunde',
    '„Zurück“ nimmt auch die Zählung zurück');
  await p.click('#knopf-gewusst');
  H.pruefe((await lesen(p, 'lernkarten:kb1-diabetes')).angeschaut === 2, 'dieselbe Karte erneut bewertet: zählt wieder');
  await p.click('#knopf-schliessen');
  H.pruefe((await p.locator('#spiel-text').innerText()) === 'Bis zur nächsten Runde: 2 von 100 Karten', 'Startseite: „2 von 100 Karten“');

  // Ältere Fassung (Zähler je Karte): bisher gezählte Karten werden übernommen
  await p.evaluate(({ ids, k }) => {
    const s = JSON.parse(localStorage.getItem(k));
    delete s.angeschaut;
    s.zaehler = {}; ids.slice(0, 30).forEach((id) => { s.zaehler[id] = 2; });
    localStorage.setItem(k, JSON.stringify(s));
  }, { ids: ids1, k: 'lernkarten:kb1-diabetes' });
  await p.reload();
  H.pruefe((await p.locator('#spiel-text').innerText()) === 'Bis zur nächsten Runde: 60 von 100 Karten', 'Umstellung: bisher gezählte Karten (60) werden übernommen');

  // Bis zur nächsten Runde fehlt nur noch eine Karte
  await p.evaluate((k) => {
    const s = JSON.parse(localStorage.getItem(k));
    s.angeschaut = 99; s.runde = null; s.abgewaehlt = []; s.stand = {};
    localStorage.setItem(k, JSON.stringify(s));
  }, 'lernkarten:kb1-diabetes');
  await p.reload();
  H.pruefe((await p.locator('#spiel-text').innerText()) === 'Bis zur nächsten Runde: 99 von 100 Karten', 'Fortschritt: 99 von 100 Karten');
  await p.click('#keine-themen');
  await p.locator('.thema').first().locator('input').check();
  await p.click('#knopf-start');
  H.pruefe((await p.locator('#spiel-rest').innerText()) === '🎮 noch 1 Karte bis zur Spielrunde', 'beim Lernen oben: „🎮 noch 1 Karte bis zur Spielrunde“');
  await p.click('#karte');
  await p.click('#knopf-nochnicht');
  await H.bis(() => p.locator('#belohnung').isVisible());
  H.pruefe(await p.locator('#belohnung').isVisible() && (await p.locator('#belohnung-titel').innerText()) === 'Super!'
    && (await p.locator('#belohnung-text').innerText()).startsWith('Sie haben 100 Lernkarten von „KB I – Diabetes mellitus“ angeschaut'),
    'bei der 100. Karte sofort bildschirmfüllend: „Super! Sie haben 100 Lernkarten … angeschaut …“');
  const box = await p.locator('#belohnung').boundingBox();
  H.pruefe(box.width >= 389 && box.height >= 843, 'Gratulation füllt den ganzen Bildschirm', box);
  H.pruefe((await p.locator('#belohnung-start').getAttribute('href')) === '../spiel/?satz=kb1-diabetes' && await p.locator('#belohnung-spaeter').isVisible(),
    'Knöpfe „🎮 Jetzt spielen“ und „Nein, danke – weiterlernen“');
  await p.screenshot({ path: path.join(ERGEBNISSE, 'gratulation.png') });
  await p.keyboard.press('ArrowRight');
  H.pruefe((await p.locator('#zaehler').innerText()) === '2 / 4', 'solange die Gratulation offen ist, geht das Lernen nicht versehentlich weiter');
  await p.click('#belohnung-spaeter');
  H.pruefe(await p.locator('#belohnung').isHidden(), '„Nein, danke“ schließt die Gratulation, Lernen geht weiter');
  H.pruefe((await p.locator('#spiel-rest').innerText()) === '🎮 noch 100 Karten bis zur Spielrunde', 'Zählung beginnt von vorn: „noch 100 Karten“');
  await p.click('#knopf-zurueck');
  H.pruefe(await lesen(p, 'lernkarten:kb1-diabetes:spiel-verdient') === 0 && (await p.locator('#spiel-rest').innerText()) === '🎮 noch 1 Karte bis zur Spielrunde',
    '„Zurück“ bei der 100. Karte nimmt auch die Spielrunde zurück (kein doppeltes Freischalten)');
  await p.click('#knopf-nochnicht');
  await H.bis(() => p.locator('#belohnung').isVisible());
  H.pruefe(await lesen(p, 'lernkarten:kb1-diabetes:spiel-verdient') === 1, 'erneut bewertet: wieder genau 1 Spielrunde mit Gratulation');
  await p.click('#belohnung-spaeter');
  for (let i = 0; i < 3; i++) await p.click('#knopf-gewusst');
  H.pruefe(await p.locator('#ergebnis-spiel').isVisible() && (await p.locator('#ergebnis-spiel-los').getAttribute('href')) === '../spiel/?satz=kb1-diabetes',
    'Ergebnis der Runde: Kasten mit „Jetzt spielen“');
  await p.click('#ergebnis-schliessen');
  H.pruefe((await p.locator('#spiel-frei').innerText()) === '1 Spielrunde frei!' && await p.locator('#spiel-los').isVisible(), 'Startseite: „1 Spielrunde frei!“ und „Jetzt spielen“');
  await p.screenshot({ path: path.join(ERGEBNISSE, 'spiel-freigeschaltet.png') });

  await p.reload();
  H.pruefe(await p.locator('#belohnung').isHidden(), 'schon angekündigte Runde: beim erneuten Öffnen keine zweite Gratulation');
  await p.evaluate(() => localStorage.setItem('lernkarten:kb1-diabetes:spiel-angeboten', '0'));
  await p.reload();
  H.pruefe(await p.locator('#belohnung').isVisible(), 'Runde verdient, aber noch nicht angekündigt (z. B. App geschlossen): Gratulation beim Öffnen');

  console.log('\n== Spiel und Eintragen');
  await p.click('#belohnung-start');
  await p.waitForSelector('#knopf-los');
  H.pruefe((await p.locator('#frei').innerText()) === 'Sie haben 1 Spielrunde frei (KB I).', 'Spiel: „Sie haben 1 Spielrunde frei (KB I).“');
  H.pruefe(await spielBisEnde(p), 'eine Runde läuft bis „Game over“');
  H.pruefe(await lesen(p, 'lernkarten:kb1-diabetes:spiel-gespielt') === 1, 'die Runde ist verbraucht');
  H.pruefe(await p.locator('#knopf-nochmal').count() === 0, 'keine weitere Runde frei → kein „Noch eine Runde“');
  const punkte1 = await p.evaluate(() => window.PflegeSprint.zustand().punkte);
  await p.fill('#vorname', 'X');
  await p.fill('#initial', 's');
  await p.click('#knopf-eintragen');
  H.pruefe((await p.locator('.fehler').innerText()).includes('Vornamen'), 'zu kurzer Vorname: Hinweis statt Eintrag');
  await p.fill('#vorname', 'Fick');
  await p.click('#knopf-eintragen');
  H.pruefe((await p.locator('.fehler').innerText()).includes('echten'), 'unpassender Name wird abgelehnt');
  await p.fill('#vorname', 'mia');
  await p.click('#knopf-eintragen');
  await H.bis(() => p.locator('#eintrag-meldung.gut').count());
  H.pruefe((await p.locator('#eintrag-meldung').innerText()) === 'Eingetragen: Platz 1 in der Liste KB I!', 'eingetragen: „Platz 1 in der Liste KB I!“', await p.locator('#eintrag-meldung').innerText());
  const zeile = attrappe.blaetter.get('kb1-diabetes').zeilen[1];
  H.pruefe(zeile[1] === 'Mia S.' && zeile[2] === punkte1, `in der Tabelle: „Mia S.“ mit ${punkte1} Punkten`, zeile);
  await p.screenshot({ path: path.join(ERGEBNISSE, 'spiel-eingetragen.png') });

  console.log('\n== Highscore-Seite');
  await p.click('#link-highscore');
  await H.bis(() => p.locator('#liste li').count());
  H.pruefe((await p.locator('#liste li').first().innerText()).replace(/\s+/g, ' ') === `🥇 Mia S. ${punkte1}`, 'Liste KB I: 🥇 Mia S.', await p.locator('#liste li').first().innerText());
  H.pruefe((await p.locator('#liste li').first().getAttribute('class')) === 'eigener', 'eigener Eintrag hervorgehoben');
  await p.click('#reiter-kb2-beratung');
  await H.bis(async () => (await p.locator('#liste-status').innerText()) === 'Noch keine Einträge – spielen Sie die erste Runde!');
  H.pruefe(p.url().endsWith('?liste=kb2-beratung'), 'Reiter KB II: leere Liste, eigene Adresse');
  H.pruefe(await p.locator('#zuruecksetzen').isHidden(), 'ohne geheimen Link kein Zurücksetzen-Knopf');
  await p.screenshot({ path: path.join(ERGEBNISSE, 'highscore.png') });

  await p.goto(basis + 'spiel/?satz=kb1-diabetes');
  H.pruefe((await p.locator('#panel h2').innerText()) === 'Noch keine Spielrunde frei', 'Spiel ohne freie Runde: gesperrt mit Erklärung');
  await p.goto(basis + 'spiel/?satz=gibtsnicht');
  H.pruefe((await p.locator('#panel').innerText()).includes('Diesen Kartensatz gibt es nicht'), 'unbekannter Kartensatz: Hinweis');

  console.log('\n== Ohne Verbindung: Punkte werden nachgetragen');
  await p.evaluate(() => localStorage.setItem('lernkarten:kb1-diabetes:spiel-verdient', '3'));
  await p.goto(basis + 'spiel/?satz=kb1-diabetes');
  H.pruefe((await p.locator('#frei').innerText()) === 'Sie haben 2 Spielrunden frei (KB I).', 'zwei Runden frei');
  attrappe.aus = true;
  await spielBisEnde(p);
  H.pruefe(await p.locator('#knopf-nochmal').innerText() === 'Noch eine Runde (1 frei)', '„Noch eine Runde (1 frei)“');
  H.pruefe((await p.inputValue('#vorname')) === 'mia' && (await p.inputValue('#initial')) === 'S', 'Name ist vom letzten Mal vorausgefüllt');
  await p.click('#knopf-eintragen');
  await H.bis(() => p.locator('#eintrag-meldung.warten').count());
  H.pruefe((await p.locator('#eintrag-meldung').innerText()).startsWith('Gerade keine Verbindung'), 'ohne Verbindung: „wird automatisch eingetragen“');
  H.pruefe((await lesen(p, 'lernkarten:highscore-ausstehend')).length === 1, 'Eintrag wartet auf dem Handy');
  attrappe.aus = false;
  await p.goto(basis + 'kb1-diabetes/');
  await H.bis(async () => (await lesen(p, 'lernkarten:highscore-ausstehend') || []).length === 0);
  H.pruefe(attrappe.blaetter.get('kb1-diabetes').zeilen.length === 3, 'beim nächsten Öffnen der Lernkarten nachgetragen');
  H.pruefe((await p.locator('#spiel-frei').innerText()) === '1 Spielrunde frei!', 'Lernkarten zeigen die verbleibende Runde');

  console.log('\n== Zurücksetzen per geheimem Link');
  await p.goto(basis + 'highscore/?liste=kb1-diabetes&zuruecksetzen=falsch12345678');
  await p.click('#zuruecksetzen-knopf');
  await H.bis(async () => (await p.locator('#zuruecksetzen-status').innerText()).includes('nicht geklappt'));
  H.pruefe(true, 'falscher Schlüssel: „Zurücksetzen hat nicht geklappt“');
  await p.goto(basis + 'highscore/?liste=kb1-diabetes&zuruecksetzen=' + TEST_SCHLUESSEL);
  H.pruefe(!p.url().includes(TEST_SCHLUESSEL), 'Schlüssel verschwindet sofort aus der Adresszeile');
  H.pruefe(await p.locator('#zuruecksetzen').isVisible(), 'Zurücksetzen-Kasten sichtbar');
  await p.click('#testeintrag-knopf');
  await H.bis(async () => (await p.locator('#zuruecksetzen-status').innerText()).startsWith('Testeintrag angekommen'));
  await H.bis(async () => (await p.locator('#liste').innerText()).includes('Test T.'));
  H.pruefe((await p.locator('#liste').innerText()).includes('Test T.'), 'Lehrkraft-Test: „Testeintrag senden“ kommt in der Tabelle an und erscheint in der Liste');
  await p.click('#zuruecksetzen-knopf');
  await H.bis(async () => (await p.locator('#zuruecksetzen-status').innerText()).includes('wurde zurückgesetzt'));
  await H.bis(async () => (await p.locator('#liste-status').innerText()).startsWith('Noch keine Einträge'));
  H.pruefe(attrappe.get({ aktion: 'liste', liste: 'kb1-diabetes' }).eintraege.length === 0, 'Liste KB I ist leer');
  await ctx.close();

  console.log('\n== Echt über die Oberfläche (KB II): 100 Karten in zwei Runden');
  {
    const c4 = await kontext();
    const d = await c4.newPage();
    H.beobachten(d, protokoll, 'durchgang');
    await d.goto(basis + 'kb2-beratung/');
    await d.click('#knopf-start');
    for (let i = 0; i < 81; i++) {
      if (i % 2) await d.click('#karte');   // jede zweite Karte umdrehen – zählt so oder so
      await d.click(i % 3 ? '#knopf-gewusst' : '#knopf-nochnicht');
    }
    H.pruefe(await d.locator('#ansicht-ergebnis').isVisible() && await d.locator('#belohnung').isHidden(), 'alle 81 Karten bewertet: Ergebnis der Runde, noch keine Gratulation');
    await d.click('#ergebnis-schliessen');
    H.pruefe((await d.locator('#spiel-text').innerText()) === 'Bis zur nächsten Runde: 81 von 100 Karten', 'Startseite: „81 von 100 Karten“');
    await d.click('#knopf-start');
    for (let i = 0; i < 18; i++) await d.click('#knopf-gewusst');
    H.pruefe(await d.locator('#belohnung').isHidden() && (await d.locator('#spiel-rest').innerText()) === '🎮 noch 1 Karte bis zur Spielrunde', 'nach 99 Karten: noch keine Gratulation, „noch 1 Karte“');
    await d.click('#knopf-gewusst');
    await H.bis(() => d.locator('#belohnung').isVisible());
    H.pruefe(await d.locator('#belohnung').isVisible(), 'nach der 100. Karte: Gratulation bildschirmfüllend');
    await d.click('#belohnung-spaeter');
    H.pruefe(await d.locator('#ansicht-lernen').isVisible() && (await d.locator('#zaehler').innerText()).startsWith('20 / '), 'danach geht das Lernen weiter (Karte 20)');
    await c4.close();
  }

  console.log('\n== Klassen: eigene QR-Codes, eigene Highscore-Listen');
  {
    const c5 = await kontext();
    const k1 = await c5.newPage();
    H.beobachten(k1, protokoll, 'klasse1');
    k1.on('dialog', (d) => d.accept());
    await k1.goto(basis + 'kb1-diabetes/?klasse=3bfp2-1');
    H.pruefe((await k1.locator('#klausur').innerText()).endsWith('· Klasse 3BFP2/1'), 'QR-Code der 3BFP2/1: Kopfzeile zeigt „Klasse 3BFP2/1“');
    await k1.goto(basis + 'kb1-diabetes/');
    H.pruefe((await k1.locator('#klausur').innerText()).endsWith('· Klasse 3BFP2/1'), 'Handy merkt sich die Klasse (später ohne QR-Code geöffnet)');
    await k1.evaluate(() => localStorage.setItem('lernkarten:kb1-diabetes:spiel-verdient', '1'));
    await k1.goto(basis + 'spiel/?satz=kb1-diabetes');
    H.pruefe((await k1.locator('#frei').innerText()) === 'Sie haben 1 Spielrunde frei (KB I · 3BFP2/1).', 'Spiel nennt die Klasse');
    await spielBisEnde(k1);
    await k1.fill('#vorname', 'Lea');
    await k1.fill('#initial', 'm');
    await k1.click('#knopf-eintragen');
    await H.bis(() => k1.locator('#eintrag-meldung.gut').count());
    H.pruefe((await k1.locator('#eintrag-meldung').innerText()) === 'Eingetragen: Platz 1 in der Liste KB I · 3BFP2/1!', 'eingetragen in „KB I · 3BFP2/1“');
    const blatt1 = attrappe.blaetter.get('kb1-diabetes-3bfp2-1');
    H.pruefe(blatt1 && blatt1.zeilen.length === 2 && blatt1.zeilen[1][1] === 'Lea M.', 'in der Google-Tabelle: eigenes Blatt „kb1-diabetes-3bfp2-1“');
    await k1.click('#link-highscore');
    await H.bis(() => k1.locator('#liste li').count());
    H.pruefe((await k1.locator('#untertitel').innerText()).endsWith('Klasse 3BFP2/1') && (await k1.locator('#liste-titel').innerText()) === 'KB I – Diabetes mellitus · 3BFP2/1'
      && (await k1.locator('#liste').innerText()).includes('Lea M.'), 'Highscore der 3BFP2/1 zeigt „Lea M.“');

    const c6 = await kontext();
    const k2 = await c6.newPage();
    H.beobachten(k2, protokoll, 'klasse2');
    await k2.goto(basis + 'kb1-diabetes/?klasse=3bfp2-2');
    await k2.goto(basis + 'highscore/?liste=kb1-diabetes');
    await H.bis(async () => (await k2.locator('#liste-status').innerText()).startsWith('Noch keine Einträge'));
    H.pruefe((await k2.locator('#liste-titel').innerText()) === 'KB I – Diabetes mellitus · 3BFP2/2' && !(await k2.locator('#liste').innerText()).includes('Lea'),
      'Highscore der 3BFP2/2: eigene, leere Liste – „Lea M.“ aus der anderen Klasse nicht sichtbar');
    await k2.goto(basis + 'kb2-beratung/?klasse=unbekannt');
    H.pruefe((await k2.locator('#klausur').innerText()).endsWith('· Klasse 3BFP2/2'), 'unbekannte Klasse in der Adresse wird ignoriert');
    await c6.close();

    await k1.goto(basis + 'highscore/?liste=kb1-diabetes&klasse=3bfp2-1&zuruecksetzen=' + TEST_SCHLUESSEL);
    H.pruefe(p.url && !k1.url().includes(TEST_SCHLUESSEL) && k1.url().includes('klasse=3bfp2-1'), 'Zurücksetzen-Link der Klasse: Schlüssel verschwindet, Klasse bleibt');
    H.pruefe((await k1.locator('#zuruecksetzen-knopf').innerText()) === 'Liste „KB I · 3BFP2/1“ jetzt zurücksetzen', 'Knopf nennt Liste und Klasse');
    await k1.click('#zuruecksetzen-knopf');
    await H.bis(async () => (await k1.locator('#zuruecksetzen-status').innerText()).includes('wurde zurückgesetzt'));
    H.pruefe(attrappe.blaetter.get('kb1-diabetes-3bfp2-1').zeilen.length === 1, 'nur die Liste KB I der 3BFP2/1 wurde geleert');
    await c5.close();
  }

  console.log('\n== KB II, Übersicht, nicht eingerichtete Liste');
  {
    const c2 = await kontext(false);
    const q = await c2.newPage();
    H.beobachten(q, protokoll, 'ohne-adresse');
    await q.goto(basis);
    H.pruefe((await q.locator('a[href="highscore/"]').count()) === 1, 'Übersicht: Link zur Highscore-Liste');
    await q.goto(basis + 'kb2-beratung/');
    H.pruefe(await q.locator('#spiel-box').isVisible() && (await q.locator('#spiel-text').innerText()).endsWith('0 von 100 Karten'), 'KB II: eigener Spiel-Kasten (0 von 100 Karten)');
    await q.evaluate(() => localStorage.setItem('lernkarten:kb2-beratung:spiel-verdient', '1'));
    await q.goto(basis + 'spiel/?satz=kb2-beratung');
    await spielBisEnde(q);
    await q.fill('#vorname', 'Ben');
    await q.fill('#initial', 'k');
    await q.click('#knopf-eintragen');
    await H.bis(() => q.locator('#eintrag-meldung').count());
    H.pruefe((await q.locator('#eintrag-meldung').innerText()).includes('noch eingerichtet'), 'Liste noch nicht eingerichtet: Punkte werden aufbewahrt');
    await q.goto(basis + 'highscore/');
    H.pruefe((await q.locator('#liste-status').innerText()) === 'Die Highscore-Liste ist noch nicht eingerichtet.', 'Highscore-Seite: „noch nicht eingerichtet“');
    await c2.close();
  }

  console.log('\n== Spiel startet auch offline');
  {
    const c3 = await kontext();
    const o = await c3.newPage();
    H.beobachten(o, protokoll, 'offline');
    await o.goto(basis + 'kb1-diabetes/');
    await H.bis(() => o.evaluate(async () => {
      const r = await navigator.serviceWorker.getRegistrations();
      return r.length === 2 && r.every((x) => x.active);
    }));
    await o.evaluate(() => localStorage.setItem('lernkarten:kb1-diabetes:spiel-verdient', '1'));
    await c3.setOffline(true);
    await o.goto(basis + 'spiel/?satz=kb1-diabetes');
    H.pruefe((await o.locator('#frei').innerText()).startsWith('Sie haben 1 Spielrunde frei'), 'Spielseite lädt ohne Netz (Offline-Speicher)');
    H.pruefe(await spielBisEnde(o), 'Runde läuft offline');
    await c3.close();
  }

  console.log('\n== Datenschutz');
  H.pruefe(protokoll.extern.length === 0, 'keine Anfrage an fremde Adressen', protokoll.extern);
  const fehler = protokoll.konsole.filter((m) => !/503|ERR_INTERNET_DISCONNECTED|Failed to fetch/.test(m));
  H.pruefe(fehler.length === 0, 'keine Fehler in der Konsole (außer den absichtlich unterbrochenen Verbindungen)', fehler);

  await browser.close();
  server.close();
  process.exit(H.ergebnis() ? 0 : 1);
})();
