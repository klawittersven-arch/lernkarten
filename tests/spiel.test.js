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
  H.pruefe((await p.locator('#spiel-text').innerText()) === 'Bis zur nächsten Runde: 0 von 85 Karten', 'Fortschritt: „Bis zur nächsten Runde: 0 von 85 Karten“');
  H.pruefe((await p.locator('#spiel-regel').innerText()).startsWith('Jedes Mal, wenn Sie alle Karten einmal durchgegangen sind'), 'Regel: jede Runde nach einem vollständigen Durchgang');
  H.pruefe(await p.locator('#spiel-los').isHidden(), 'ohne Freischaltung kein „Jetzt spielen“');
  H.pruefe((await p.locator('#highscore-link').getAttribute('href')) === '../highscore/?liste=kb1-diabetes', 'unauffälliger Link „Highscore-Liste“ unten auf der Startseite');

  await p.click('#knopf-start');
  await p.click('#knopf-gewusst');            // ohne Umdrehen
  H.pruefe(await p.locator('#toast').isVisible() && (await p.locator('#toast').innerText()).startsWith('Tipp: Für die Spielrunde zählt eine Karte nur'),
    'Karte ohne Umdrehen bewertet: einmaliger Tipp „zählt nur, wenn umgedreht“');
  await p.click('#karte'); await p.click('#knopf-nochnicht'); // mit Umdrehen
  H.pruefe((await p.locator('#spiel-rest').innerText()) === '🎮 noch 84 Karten bis zur Spielrunde', 'beim Lernen oben: „🎮 noch 84 Karten bis zur Spielrunde“');
  let z = (await lesen(p, 'lernkarten:kb1-diabetes')).zaehler;
  H.pruefe(!z[ids1[0]] && z[ids1[1]] === 1, 'gezählt wird nur eine umgedrehte Karte (egal ob gewusst oder nicht)', z);
  await p.click('#knopf-zurueck');
  z = (await lesen(p, 'lernkarten:kb1-diabetes')).zaehler;
  H.pruefe(!z[ids1[1]], '„Zurück“ nimmt auch die Zählung zurück', z);

  // Im ersten Durchgang fehlt nur noch die erste Karte
  await p.evaluate(({ ids, k }) => {
    const s = JSON.parse(localStorage.getItem(k));
    s.zaehler = {}; ids.forEach((id, i) => { s.zaehler[id] = i === 0 ? 0 : 1; });
    s.runde = null; s.abgewaehlt = []; s.stand = {};
    localStorage.setItem(k, JSON.stringify(s));
  }, { ids: ids1, k: 'lernkarten:kb1-diabetes' });
  await p.reload();
  H.pruefe((await p.locator('#spiel-text').innerText()) === 'Bis zur nächsten Runde: 84 von 85 Karten', 'Fortschritt: 84 von 85 Karten');
  await p.click('#keine-themen');
  await p.locator('.thema').first().locator('input').check();
  await p.click('#knopf-start');
  H.pruefe((await p.locator('#spiel-rest').innerText()) === '🎮 noch 1 Karte bis zur Spielrunde', 'beim Lernen oben: „🎮 noch 1 Karte bis zur Spielrunde“');
  await p.click('#karte');
  await p.click('#knopf-nochnicht');
  await H.bis(() => p.locator('#belohnung').isVisible());
  H.pruefe(await p.locator('#belohnung').isVisible() && (await p.locator('#belohnung-titel').innerText()) === 'Super!'
    && (await p.locator('#belohnung-text').innerText()).includes('„KB I – Diabetes mellitus“ einmal durchgegangen'),
    'sofort bildschirmfüllend: „Super! Sie sind alle Lernkarten … durchgegangen …“');
  const box = await p.locator('#belohnung').boundingBox();
  H.pruefe(box.width >= 389 && box.height >= 843, 'Gratulation füllt den ganzen Bildschirm', box);
  H.pruefe((await p.locator('#belohnung-start').getAttribute('href')) === '../spiel/?satz=kb1-diabetes' && await p.locator('#belohnung-spaeter').isVisible(),
    'Knöpfe „🎮 Jetzt spielen“ und „Nein, danke – weiterlernen“');
  await p.screenshot({ path: path.join(ERGEBNISSE, 'gratulation.png') });
  await p.keyboard.press('ArrowRight');
  H.pruefe((await p.locator('#zaehler').innerText()) === '2 / 4', 'solange die Gratulation offen ist, geht das Lernen nicht versehentlich weiter');
  await p.click('#belohnung-spaeter');
  H.pruefe(await p.locator('#belohnung').isHidden(), '„Nein, danke“ schließt die Gratulation, Lernen geht weiter');
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

  console.log('\n== Echter Durchgang über die Oberfläche (KB II, alle 79 Karten umdrehen)');
  {
    const c4 = await kontext();
    const d = await c4.newPage();
    H.beobachten(d, protokoll, 'durchgang');
    await d.goto(basis + 'kb2-beratung/');
    await d.click('#knopf-start');
    for (let i = 0; i < 78; i++) { await d.click('#karte'); await d.click(i % 3 ? '#knopf-gewusst' : '#knopf-nochnicht'); }
    H.pruefe(await d.locator('#belohnung').isHidden() && (await d.locator('#spiel-rest').innerText()) === '🎮 noch 1 Karte bis zur Spielrunde', 'nach 78 Karten: noch keine Gratulation, „noch 1 Karte“');
    await d.click('#karte'); await d.click('#knopf-gewusst');
    await H.bis(() => d.locator('#belohnung').isVisible());
    H.pruefe(await d.locator('#belohnung').isVisible(), 'nach der 79. Karte: Gratulation bildschirmfüllend');
    await d.click('#belohnung-spaeter');
    H.pruefe(await d.locator('#ansicht-ergebnis').isVisible() && await d.locator('#ergebnis-spiel').isVisible(), 'danach Ergebnis der Runde mit „Jetzt spielen“');
    await c4.close();
  }

  console.log('\n== KB II, Übersicht, nicht eingerichtete Liste');
  {
    const c2 = await kontext(false);
    const q = await c2.newPage();
    H.beobachten(q, protokoll, 'ohne-adresse');
    await q.goto(basis);
    H.pruefe((await q.locator('a[href="highscore/"]').count()) === 1, 'Übersicht: Link zur Highscore-Liste');
    await q.goto(basis + 'kb2-beratung/');
    H.pruefe(await q.locator('#spiel-box').isVisible() && (await q.locator('#spiel-text').innerText()).endsWith('0 von 79 Karten'), 'KB II: eigener Spiel-Kasten (79 Karten)');
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
