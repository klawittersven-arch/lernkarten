/* Klausur-Challenge:
 * 1. Aufgabenpools (fragen.js) – vollständig und gültig
 * 2. Ziehen der Aufgaben, Punkte, Zeitbonus
 * 3. Sichtbarkeit (aus / Vorschau / an), Ablauf mit Timer, Auswertung, Fehlerübersicht,
 *    Eintrag in die Highscore-Liste der Klasse, Highscore-Seite, Zurücksetzen */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const H = require('./hilfen');
const { attrappeErstellen, TEST_SCHLUESSEL } = require('./apps-script-attrappe');

const ERGEBNISSE = path.join(__dirname, 'ergebnisse');
const SAETZE = ['kb1-diabetes', 'kb2-beratung'];
const TYPEN = ['auswahl', 'richtigfalsch', 'zuordnen', 'reihenfolge', 'zahl', 'zeile'];

function laden(datei, name) {
  const box = {};
  vm.runInNewContext(fs.readFileSync(datei, 'utf8') + `\nthis.D = ${name};`, box);
  return box.D;
}
const EINSTELLUNGEN = laden(path.join(H.DOCS, 'app', 'einstellungen.js'), 'EINSTELLUNGEN');
const ANZAHL = EINSTELLUNGEN.challenge.aufgaben;

const istText = (t) => typeof t === 'string' && t.trim().length > 0;
function abTitel(t) { return t.titel || [].concat(t.ab).join(' | '); }

// Fehler einer Aufgabe in fragen.js (leer = in Ordnung)
function aufgabePruefen(f) {
  const fehler = [];
  if (!TYPEN.includes(f.typ)) return ['unbekannter typ ' + f.typ];
  if (f.typ === 'richtigfalsch') {
    if (!istText(f.aussage)) fehler.push('aussage fehlt');
    if (typeof f.richtig !== 'boolean') fehler.push('richtig muss true/false sein');
    if (!istText(f.erklaerung)) fehler.push('erklaerung fehlt');
  } else if (!istText(f.frage)) fehler.push('frage fehlt');
  if (f.fall !== undefined && !istText(f.fall)) fehler.push('fall leer');
  if (f.typ === 'auswahl') {
    if (!Array.isArray(f.antworten) || f.antworten.length < 3 || !f.antworten.every(istText)) fehler.push('mindestens 3 Antworten');
    else if (new Set(f.antworten).size !== f.antworten.length) fehler.push('doppelte Antwort');
  }
  if (f.typ === 'zuordnen') {
    const gruppen = Object.keys(f.zuordnung || {});
    const eintraege = gruppen.flatMap((g) => f.zuordnung[g] || []);
    if (gruppen.length < 2 || !gruppen.every(istText)) fehler.push('mindestens 2 Gruppen');
    if (!gruppen.every((g) => Array.isArray(f.zuordnung[g]))) fehler.push('Gruppe ohne Liste');
    if (eintraege.length < 2 || !eintraege.every(istText)) fehler.push('mindestens 2 Einträge');
    if (new Set(eintraege).size !== eintraege.length) fehler.push('doppelter Eintrag');
  }
  if (f.typ === 'reihenfolge') {
    if (!Array.isArray(f.schritte) || f.schritte.length < 3 || !f.schritte.every(istText)) fehler.push('mindestens 3 Schritte');
    else if (new Set(f.schritte).size !== f.schritte.length) fehler.push('doppelter Schritt');
  }
  if (f.typ === 'zeile') {
    if (!Array.isArray(f.zeilen) || f.zeilen.length < 3 || !f.zeilen.every(istText)) fehler.push('mindestens 3 Zeilen');
    else if (!Array.isArray(f.richtig) || !f.richtig.length || new Set(f.richtig).size !== f.richtig.length
      || !f.richtig.every((z) => Number.isInteger(z) && z >= 1 && z <= f.zeilen.length)) fehler.push('richtig: Zeilennummern ab 1');
    else if (f.richtig.length >= f.zeilen.length) fehler.push('nicht alle Zeilen dürfen richtig sein');
  }
  if (f.typ === 'zahl') {
    if (typeof f.loesung !== 'number' || !isFinite(f.loesung)) fehler.push('loesung keine Zahl');
    if (typeof f.toleranz !== 'number' || f.toleranz < 0) fehler.push('toleranz fehlt');
    if (!istText(f.einheit)) fehler.push('einheit fehlt');
  }
  return fehler;
}

// Beantwortet die aktuelle Aufgabe über die Oberfläche – richtig oder (so weit möglich) falsch
async function beantworten(p, richtig) {
  await p.evaluate((richtig) => {
    const a = KlausurChallenge.aufgabe();
    const f = a.f;
    if (a.typ === 'auswahl') {
      const i = a.optionen.findIndex((o) => o.richtig === richtig);
      document.querySelectorAll('#aufgabe-antwort .option')[i].click();
    } else if (a.typ === 'richtigfalsch') {
      document.querySelector((richtig ? f.richtig : !f.richtig) ? '.rf-richtig' : '.rf-falsch').click();
    } else if (a.typ === 'zahl') {
      const e = document.getElementById('zahl-eingabe');
      e.value = richtig ? String(f.loesung).replace('.', ',') : String(f.loesung + 50);
      e.dispatchEvent(new Event('input'));
    } else if (a.typ === 'zuordnen') {
      document.querySelectorAll('.zuordnen-eintrag').forEach((li, i) => {
        const soll = a.eintraege[i].gruppe;
        const ziel = richtig ? soll : a.gruppen.find((g) => g !== soll);
        const s = li.querySelector('select');
        if (s) { s.value = ziel; s.dispatchEvent(new Event('change')); } else [...li.querySelectorAll('.chip')].find((c) => c.textContent === ziel).click();
      });
    } else if (a.typ === 'zeile') {
      const knoepfe = document.querySelectorAll('.zeile-knopf');
      if (richtig) f.richtig.forEach((z) => knoepfe[z - 1].click());
      else knoepfe[f.zeilen.findIndex((t, i) => !f.richtig.includes(i + 1))].click();
    } else if (a.typ === 'reihenfolge') {
      const reihe = f.schritte.map((s, i) => i);
      (richtig ? reihe : reihe.reverse()).forEach((s) => {
        const rest = a.angezeigt.filter((x) => a.antwort.indexOf(x) === -1);
        document.querySelectorAll('.reihe-pool .reihe-schritt')[rest.indexOf(s)].click();
      });
    }
  }, richtig);
}

async function alleBeantworten(p, richtig, jedeAufgabe) {
  const typen = new Set();
  for (let i = 0; i < ANZAHL; i++) {
    const typ = await p.evaluate(() => KlausurChallenge.aufgabe().typ);
    if (jedeAufgabe) await jedeAufgabe(typ, typen.has(typ), i);
    typen.add(typ);
    await beantworten(p, typeof richtig === 'function' ? richtig(i) : richtig);
    if (await p.locator('#knopf-weiter').isDisabled()) return { typen, fehler: 'Weiter gesperrt bei Aufgabe ' + (i + 1) + ' (' + typ + ')' };
    await p.click('#knopf-weiter');
  }
  return { typen };
}

(async () => {
  /* ---------- 1. Aufgabenpools ---------- */
  console.log('\n== Aufgabenpools (fragen.js)');
  H.pruefe(EINSTELLUNGEN.challengeAn === true, 'Challenge für die SuS freigeschaltet (challengeAn: true)');
  H.pruefe(ANZAHL === 20 && EINSTELLUNGEN.challenge.punkteProAufgabe === 100 && EINSTELLUNGEN.challenge.zeitbonusMax === 500,
    '20 Aufgaben je 100 Punkte, Zeitbonus bis 500 (80 % Aufgaben / 20 % Zeit)');
  const POOLS = {};
  for (const satz of SAETZE) {
    const F = laden(path.join(H.DOCS, satz, 'fragen.js'), 'CHALLENGE_FRAGEN');
    const K = laden(path.join(H.DOCS, satz, 'karten.js'), 'LERNKARTEN');
    POOLS[satz] = F;
    const alle = F.themen.flatMap((t) => t.fragen);
    H.pruefe(F.satz === satz && F.satz === K.speicherName, `${satz}: fragen.js gehört zum Kartensatz`);
    const fehlerhaft = [];
    alle.forEach((f, i) => { const fe = aufgabePruefen(f); if (fe.length) fehlerhaft.push(`${i + 1}: ${fe.join(', ')} – ${(f.frage || f.aussage || '').slice(0, 50)}`); });
    H.pruefe(fehlerhaft.length === 0, `${satz}: alle ${alle.length} Aufgaben gültig`, fehlerhaft);
    const doppelt = alle.map((f) => JSON.stringify(f)).filter((s, i, a) => a.indexOf(s) !== i);
    H.pruefe(doppelt.length === 0, `${satz}: keine Aufgabe doppelt`);
    H.pruefe(alle.length >= 2 * ANZAHL, `${satz}: Pool (${alle.length}) mindestens doppelt so groß wie eine Challenge`);
    H.pruefe(F.themen.length <= ANZAHL && F.themen.every((t) => t.fragen.length >= 2), `${satz}: jedes AB hat mindestens 2 Aufgaben`);
    const abKarten = K.themen.map(abTitel);
    const fremd = F.themen.filter((t) => !abKarten.includes(abTitel(t))).map(abTitel);
    const ohne = abKarten.filter((ab) => !F.themen.some((t) => abTitel(t) === ab));
    H.pruefe(fremd.length === 0 && ohne.length === 0, `${satz}: dieselben Themen wie die Lernkarten (jedes Thema kommt vor)`, { fremd, ohne });
    const typen = new Set(alle.map((f) => f.typ));
    H.pruefe(['auswahl', 'zuordnen', 'reihenfolge', 'richtigfalsch'].every((t) => typen.has(t)), `${satz}: verschiedene Aufgabenarten (${[...typen].join(', ')})`);
  }

  /* ---------- Server und Browser ---------- */
  const attrappe = attrappeErstellen();
  const { server, basis, attrappeAdresse } = await H.serverStarten({ attrappe });
  const browser = await H.chromium.launch();
  const protokoll = { konsole: [], extern: [] };

  // freigeschaltet: false = so, als stünde in einstellungen.js challengeAn: false
  async function kontext({ freigeschaltet = true, optionen = {} } = {}) {
    const ctx = await browser.newContext(Object.assign({}, H.MOBIL, { reducedMotion: 'reduce', serviceWorkers: 'block' }, optionen));
    await ctx.addInitScript((a) => { window.HIGHSCORE_TEST_ADRESSE = a; }, attrappeAdresse);
    if (!freigeschaltet) {
      await ctx.route('**/app/einstellungen.js', async (route) => {
        const antwort = await route.fetch();
        await route.fulfill({ response: antwort, body: (await antwort.text()).replace('challengeAn: true', 'challengeAn: false') });
      });
    }
    return ctx;
  }

  /* ---------- 2. Ziehen, Punkte, Zeitbonus ---------- */
  console.log('\n== Aufgaben ziehen, Punkte, Zeitbonus');
  {
    const ctx = await kontext();
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'logik');
    for (const satz of SAETZE) {
      await p.goto(basis + 'challenge/?satz=' + satz);
      await p.waitForSelector('#knopf-challenge-start');
      const r = await p.evaluate((n) => {
        const d = KlausurChallenge.daten();
        let immerN = true, immerAlleAbs = true, immerVerschieden = true, gezogen = new Set();
        for (let i = 0; i < 300; i++) {
          const z = KlausurChallenge.ziehen(d.themen, n);
          if (z.length !== n) immerN = false;
          if (new Set(z.map((e) => e.f)).size !== z.length) immerVerschieden = false;
          if (new Set(z.map((e) => e.thema)).size !== d.themen.length) immerAlleAbs = false;
          z.forEach((e) => gezogen.add(e.f));
        }
        const pool = d.themen.reduce((s, t) => s + t.fragen.length, 0);
        return { immerN, immerAlleAbs, immerVerschieden, gezogen: gezogen.size, pool };
      }, ANZAHL);
      H.pruefe(r.immerN && r.immerVerschieden, `${satz}: immer ${ANZAHL} verschiedene Aufgaben`);
      H.pruefe(r.immerAlleAbs, `${satz}: jede Challenge enthält Aufgaben aus allen ABs`);
      H.pruefe(r.gezogen === r.pool, `${satz}: nach 300 Challenges kam jede Aufgabe des Pools mindestens einmal dran`, r);
    }
    const z = await p.evaluate(() => ({
      voll: KlausurChallenge.zeitbonus(200, 1), grenze: KlausurChallenge.zeitbonus(240, 1), mitte: KlausurChallenge.zeitbonus(570, 1),
      null15: KlausurChallenge.zeitbonus(900, 1), spaet: KlausurChallenge.zeitbonus(3000, 1), halb: KlausurChallenge.zeitbonus(200, 0.5),
      komma: KlausurChallenge.zahlLesen(' 11,9 mmol/l'), punkt: KlausurChallenge.zahlLesen('99'), leer: KlausurChallenge.zahlLesen('abc')
    }));
    H.pruefe(z.voll === 500 && z.grenze === 500, 'Zeitbonus: bis 4 Minuten voll (500)');
    H.pruefe(z.mitte === 250 && z.null15 === 0 && z.spaet === 0, 'Zeitbonus sinkt gleichmäßig: 9:30 min → 250, ab 15 min → 0');
    H.pruefe(z.halb === 250, 'Zeitbonus zählt anteilig: halb richtig → halber Bonus');
    H.pruefe(z.komma === 11.9 && z.punkt === 99 && Number.isNaN(z.leer), 'Zahleneingabe: Komma, Einheit und Leerzeichen werden verstanden');
    const teil = await p.evaluate(() => {
      const zu = KlausurChallenge.vorbereiten({ thema: { ab: 'X' }, f: { typ: 'zuordnen', frage: 'F', zuordnung: { A: ['a1', 'a2'], B: ['b1', 'b2'] } } });
      zu.antwort = zu.eintraege.map((e, i) => (i === 0 ? (e.gruppe === 'A' ? 'B' : 'A') : e.gruppe));
      const re = KlausurChallenge.vorbereiten({ thema: { ab: 'X' }, f: { typ: 'reihenfolge', frage: 'F', schritte: ['1', '2', '3', '4'] } });
      re.antwort = [0, 1, 3, 2];
      const rf = KlausurChallenge.vorbereiten({ thema: { ab: 'X' }, f: { typ: 'richtigfalsch', aussage: 'A', richtig: false, erklaerung: 'E' } });
      rf.antwort = false;
      const za = KlausurChallenge.vorbereiten({ thema: { ab: 'X' }, f: { typ: 'zahl', frage: 'F', loesung: 11.9, toleranz: 0.1, einheit: 'mmol/l' } });
      za.antwort = '12';
      const zb = KlausurChallenge.vorbereiten({ thema: { ab: 'X' }, f: { typ: 'zahl', frage: 'F', loesung: 11.9, toleranz: 0.1, einheit: 'mmol/l' } });
      zb.antwort = '11,7';
      const zeile = (antwort) => {
        const a = KlausurChallenge.vorbereiten({ thema: { ab: 'X' }, f: { typ: 'zeile', frage: 'F', zeilen: ['1', '2', '3', '4', '5'], richtig: [2, 4] } });
        a.antwort = antwort;
        return KlausurChallenge.punkteFuer(a);
      };
      const zl = { beide: zeile([2, 4]), eine: zeile([2]), einsFalsch: zeile([2, 3]), alle: zeile([1, 2, 3, 4, 5]) };
      const e = KlausurChallenge.auswerten([zu, re, rf, za, zb], 570);
      return { zu: KlausurChallenge.punkteFuer(zu), re: KlausurChallenge.punkteFuer(re), rf: KlausurChallenge.punkteFuer(rf),
        za: KlausurChallenge.punkteFuer(za), zb: KlausurChallenge.punkteFuer(zb), e, zl };
    });
    H.pruefe(teil.zu === 75 && teil.re === 50, 'Teilpunkte: Zuordnen 3 von 4 → 75, Reihenfolge 2 von 4 Plätzen → 50');
    H.pruefe(teil.rf === 100 && teil.za === 100 && teil.zb === 0, 'Richtig/Falsch und Zahl (mit Toleranz) werden richtig bewertet');
    H.pruefe(teil.zl.beide === 100 && teil.zl.eine === 50 && teil.zl.einsFalsch === 0 && teil.zl.alle === 0,
      'Zeile finden: beide richtig → 100, eine von zwei → 50, falsch gewählte Zeile zieht ab, alles antippen → 0', teil.zl);
    H.pruefe(teil.e.aufgabenPunkte === 325 && teil.e.ganzRichtig === 2 && teil.e.bonus === Math.round(500 * 0.5 * 325 / 500) && teil.e.gesamt === 325 + teil.e.bonus,
      'Auswertung: Summe, ganz richtige Aufgaben, anteiliger Bonus', teil.e);
    await ctx.close();
  }

  /* ---------- 3. Sichtbarkeit ---------- */
  console.log('\n== Sichtbarkeit: noch aus, Vorschau für die Lehrkraft');
  {
    const ctx = await kontext({ freigeschaltet: false });
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'aus');
    await p.goto(basis + 'kb1-diabetes/');
    H.pruefe(await p.locator('#challenge-box').isHidden(), 'challengeAn: false → kein Challenge-Kasten bei den Lernkarten');
    await p.goto(basis + 'challenge/?satz=kb1-diabetes');
    H.pruefe((await p.locator('#start-inhalt').innerText()).includes('noch nicht freigeschaltet') && await p.locator('#knopf-challenge-start').count() === 0,
      'Challenge-Seite direkt aufgerufen: „noch nicht freigeschaltet“');
    await p.goto(basis + 'highscore/');
    H.pruefe(await p.locator('#reiter-art').isHidden(), 'Highscore-Seite: kein Reiter „Klausur-Challenge“');
    await p.goto(basis + 'kb1-diabetes/?vorschau=1');
    H.pruefe(await p.locator('#challenge-box').isVisible(), 'mit ?vorschau=1: Kasten sichtbar (für die Lehrkraft)');
    await p.click('#challenge-los');
    await p.waitForSelector('#knopf-challenge-start');
    H.pruefe(await p.locator('.vorschau-hinweis').isVisible(), 'Vorschau bleibt beim Wechsel zur Challenge erhalten, mit Hinweis „Vorschau“');
    await p.goto(basis + 'highscore/');
    H.pruefe(await p.locator('#reiter-art').isVisible(), 'Vorschau: Highscore-Seite zeigt die Reiter Spiel / Challenge');
    await ctx.close();
  }

  /* ---------- 4. Ablauf KB I mit Klasse ---------- */
  console.log('\n== Ablauf KB I (Klasse 3BFP2/1): alles richtig in 9:30 min');
  let ersteGesamt = 0;
  {
    const ctx = await kontext();
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'kb1');
    p.on('dialog', (d) => d.accept());
    await p.clock.install({ time: new Date('2026-11-01T10:00:00') });
    await p.goto(basis + 'kb1-diabetes/?klasse=3bfp2-1');
    H.pruefe(await p.locator('#challenge-box').isVisible() && (await p.locator('#challenge-los').innerText()).includes('Klausur-Challenge starten'),
      'Lernkarten: Kasten mit Knopf „🏁 Klausur-Challenge starten“');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'challenge-kasten.png') });
    await p.click('#challenge-los');
    await p.waitForSelector('#knopf-challenge-start');
    H.pruefe((await p.locator('#untertitel').innerText()) === 'KB I – Diabetes mellitus · 3BFP2/1', 'Challenge-Seite nennt Kartensatz und Klasse');
    H.pruefe((await p.locator('#start-inhalt').innerText()).includes('20 zufälligen Aufgaben'), 'Startseite erklärt die Regeln');
    H.pruefe((await p.locator('#start-inhalt').innerText()).includes('In der Klausur formulieren und begründen Sie Ihre Antworten selbst'),
      'Startseite: In der Klausur selbst formulieren – das üben die Lernkarten');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'challenge-start.png'), fullPage: true });
    await p.clock.pauseAt(new Date('2026-11-01T10:05:00'));   // ab jetzt läuft die Zeit nur noch per fastForward
    await p.click('#knopf-challenge-start');
    H.pruefe((await p.locator('#zaehler').innerText()) === 'Aufgabe 1 / 20' && (await p.locator('#uhr').innerText()) === '⏱ 00:00', 'Aufgabe 1 / 20, Uhr bei 00:00');
    H.pruefe(await p.locator('#knopf-weiter').isDisabled(), '„Weiter“ erst nach einer Antwort');
    await p.clock.fastForward(65000);
    H.pruefe((await p.locator('#uhr').innerText()) === '⏱ 01:05', 'Uhr läuft mit (01:05)');
    const lauf = await alleBeantworten(p, true, async (typ, schonGesehen, i) => {
      if (!schonGesehen) await p.screenshot({ path: path.join(ERGEBNISSE, `challenge-aufgabe-${typ}.png`) });
      if (i === ANZAHL - 1) H.pruefe((await p.locator('#knopf-weiter').innerText()) === 'Auswerten', 'letzte Aufgabe: Knopf „Auswerten“');
      if (i === ANZAHL - 1) await p.clock.fastForward(570000 - 65000);
    });
    H.pruefe(!lauf.fehler, 'alle 20 Aufgaben über die Oberfläche beantwortet', lauf.fehler);
    await p.waitForSelector('#ergebnis-gesamt');
    const e = await p.evaluate(() => KlausurChallenge.ergebnis());
    ersteGesamt = e.gesamt;
    H.pruefe(e.aufgabenPunkte === 2000 && e.ganzRichtig === 20 && e.sekunden === 570 && e.bonus === 250 && e.gesamt === 2250, 'alles richtig: 2000 + Zeitbonus 250 = 2250', e);
    H.pruefe((await p.locator('#ergebnis-gesamt').innerText()).replace(/\s+/g, ' ') === '2.250 Punkte' && (await p.locator('#ergebnis-bonus').innerText()) === '250',
      'Anzeige: „2.250 Punkte“, Zeitbonus 250');
    H.pruefe((await p.locator('.ergebnis-tabelle').innerText()).includes('20 von 20 ganz richtig') && (await p.locator('.ergebnis-tabelle').innerText()).includes('09:30'),
      'Tabelle: 20 von 20 ganz richtig, Zeit 09:30');
    H.pruefe((await p.locator('#fehler').innerText()).includes('Keine Fehler'), 'Fehlerübersicht: „Keine Fehler“');
    H.pruefe(await p.locator('#tipp-formulieren').isVisible() && (await p.locator('#tipp-formulieren').innerText()).startsWith('Tipp für die Klausur: Dort wählen Sie nichts aus'),
      'Auswertung: „Tipp für die Klausur: … selbst formulieren … mit den Lernkarten“');
    await p.fill('#vorname', 'Ben');
    await p.fill('#initial', 'k');
    await p.click('#knopf-eintragen');
    await H.bis(() => p.locator('#eintragen-meldung.gut').count());
    H.pruefe((await p.locator('#eintragen-meldung').innerText()) === 'Eingetragen: Platz 1 in der Liste KB I – Klausur-Challenge · 3BFP2/1!',
      'eingetragen: „Platz 1 in der Liste KB I – Klausur-Challenge · 3BFP2/1“');
    const blatt = attrappe.blaetter.get('kb1-diabetes-challenge-3bfp2-1');
    H.pruefe(blatt && blatt.zeilen.length === 2 && blatt.zeilen[1][1] === 'Ben K.' && blatt.zeilen[1][2] === 2250,
      'Google-Tabelle: eigenes Blatt „kb1-diabetes-challenge-3bfp2-1“ mit „Ben K.“, 2250');
    H.pruefe(!attrappe.blaetter.has('kb1-diabetes-3bfp2-1'), 'die Spiel-Liste der Klasse bleibt unberührt');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'challenge-ergebnis.png'), fullPage: true });

    console.log('\n== Zweite Challenge: absichtlich falsch – Fehlerübersicht');
    await p.click('#knopf-nochmal');
    const lauf2 = await alleBeantworten(p, (i) => i < 2, async () => { await p.clock.fastForward(30000); });
    H.pruefe(!lauf2.fehler, 'zweite Challenge beantwortet', lauf2.fehler);
    await p.waitForSelector('#ergebnis-gesamt');
    const e2 = await p.evaluate(() => KlausurChallenge.ergebnis());
    const falsch = e2.punkte.filter((x) => x < 100).length;
    H.pruefe(e2.ganzRichtig === 2 && e2.punkte[0] === 100 && e2.punkte[1] === 100 && falsch === 18, '2 richtig, 18 falsch (Reihenfolgen evtl. mit Teilpunkten)', e2.punkte);
    H.pruefe((await p.locator('#ergebnis-aufgaben').innerText()) === e2.aufgabenPunkte.toLocaleString('de-DE') && e2.sekunden === 600
      && e2.bonus === Math.round(500 * (300 / 660) * e2.aufgabenPunkte / 2000), 'Punkte und anteiliger Zeitbonus stimmen (10:00 min)', e2);
    H.pruefe(await p.locator('.fehler-karte').count() === 18, 'Fehlerübersicht: 18 Aufgaben mit Lösung');
    const fehlerText = await p.locator('#fehler').innerText();
    H.pruefe(fehlerText.includes('Ihre Antwort:') || fehlerText.includes('Richtige Reihenfolge:') || fehlerText.includes('→'), 'Fehlerübersicht zeigt Ihre Antwort und die Lösung');
    H.pruefe(!(await p.locator('.neu-best').count()) && (await p.locator('.challenge-best').innerText()).includes('2.250'), 'Bestleistung bleibt 2.250');
    await p.click('#knopf-nicht-eintragen');
    H.pruefe((await p.locator('#eintragen-meldung').innerText()) === 'Nicht eingetragen.', '„Nicht eintragen“ funktioniert');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'challenge-fehler.png') });

    console.log('\n== Abbrechen, Bedienung über echte Fingertipps');
    await p.click('#knopf-nochmal');
    const typ = await p.evaluate(() => KlausurChallenge.aufgabe().typ);
    await beantworten(p, true);
    await p.click('#knopf-weiter');
    H.pruefe((await p.locator('#zaehler').innerText()) === 'Aufgabe 2 / 20', 'nach „Weiter“: Aufgabe 2 / 20 (' + typ + ')');
    await p.click('#knopf-abbrechen');
    H.pruefe(await p.locator('#knopf-challenge-start').isVisible(), 'Abbrechen (mit Rückfrage) → zurück zum Start');

    // Reihenfolge und Zuordnen mit echten Klicks (bis eine solche Aufgabe kommt)
    let reiheGeprueft = false, zuordnenGeprueft = false, zeileGeprueft = false;
    for (let versuch = 0; versuch < 30 && !(reiheGeprueft && zuordnenGeprueft && zeileGeprueft); versuch++) {
      await p.click('#knopf-challenge-start');
      for (let i = 0; i < ANZAHL; i++) {
        const a = await p.evaluate(() => { const a = KlausurChallenge.aufgabe(); return { typ: a.typ, liste: a.liste }; });
        if (a.typ === 'reihenfolge' && !reiheGeprueft) {
          await p.locator('.reihe-pool .reihe-schritt').first().click();
          H.pruefe(await p.locator('.reihe-gewaehlt .gesetzt').count() === 1, 'Reihenfolge: Tipp setzt den Schritt auf Platz 1');
          await p.locator('.reihe-gewaehlt .gesetzt').first().click();
          H.pruefe(await p.locator('.reihe-gewaehlt .gesetzt').count() === 0 && await p.locator('#knopf-weiter').isDisabled(), 'Reihenfolge: erneuter Tipp nimmt ihn wieder heraus');
          reiheGeprueft = true;
        }
        if (a.typ === 'zuordnen' && !zuordnenGeprueft && !a.liste) {
          const n = await p.locator('.zuordnen-eintrag').count();
          for (let j = 0; j < n; j++) {
            H.pruefe(await p.locator('#knopf-weiter').isDisabled(), `Zuordnen: „Weiter“ gesperrt, solange Einträge offen sind (${j}/${n})`);
            await p.locator('.zuordnen-eintrag').nth(j).locator('.chip').first().click();
          }
          H.pruefe(await p.locator('#knopf-weiter').isEnabled(), 'Zuordnen: alle Einträge zugeordnet → „Weiter“');
          zuordnenGeprueft = true;
        }
        let zeileHier = null;
        if (a.typ === 'zeile' && !zeileGeprueft) {
          const f = await p.evaluate(() => KlausurChallenge.aufgabe().f);
          H.pruefe(await p.locator('.zeile-knopf').count() === f.zeilen.length && (await p.locator('.zeile-knopf').first().innerText()).startsWith('1'),
            `Zeile finden: ${f.zeilen.length} nummerierte Zeilen zum Antippen`);
          const falscheZeile = f.zeilen.findIndex((t, j) => !f.richtig.includes(j + 1));
          const knopf = p.locator('.zeile-knopf').nth(falscheZeile);
          H.pruefe(await p.locator('#knopf-weiter').isDisabled(), 'Zeile finden: „Weiter“ erst nach einer Auswahl');
          await knopf.click();
          H.pruefe((await knopf.getAttribute('aria-pressed')) === 'true' && await p.locator('#knopf-weiter').isEnabled(), 'Zeile finden: Tipp wählt die Zeile aus');
          await knopf.click();
          H.pruefe((await knopf.getAttribute('aria-pressed')) === 'false' && await p.locator('#knopf-weiter').isDisabled(), 'Zeile finden: zweiter Tipp nimmt die Auswahl zurück');
          await knopf.click();   // bewusst falsch lassen – die Auswertung soll die Lösung zeigen
          zeileHier = { nr: i, richtig: f.richtig, falsch: falscheZeile + 1 };
          zeileGeprueft = true;
        } else await beantworten(p, true);
        await p.click('#knopf-weiter');
        if (zeileHier) zeileGeprueft = zeileHier;
      }
      await p.waitForSelector('#ergebnis-gesamt');
      if (zeileGeprueft && zeileGeprueft !== true) {
        const z = zeileGeprueft;
        const karte = p.locator('.fehler-karte', { has: p.locator('.zeilen-loesung') });
        const text = await karte.innerText();
        H.pruefe(await karte.count() === 1 && text.includes('Ihre Antwort: Z. ' + z.falsch) && text.includes('Richtig: Z. ' + z.richtig.join(', '))
          && await karte.locator('.zeilen-loesung li.richtig').count() === z.richtig.length && await karte.locator('.zeilen-loesung li.falsch').count() === 1,
          'Zeile finden: Auswertung zeigt gewählte und richtige Zeilen im Falltext', text.slice(0, 300));
        await karte.screenshot({ path: path.join(ERGEBNISSE, 'challenge-zeile-loesung.png') });
        zeileGeprueft = true;
      }
      await p.click('#knopf-nochmal');
      await p.click('#knopf-abbrechen');
    }
    H.pruefe(reiheGeprueft && zuordnenGeprueft && zeileGeprueft === true, 'Reihenfolge, Zuordnen und Zeile finden mit echten Fingertipps geprüft');

    console.log('\n== Highscore-Seite: Reiter Spiel / Challenge');
    await p.goto(basis + 'challenge/?satz=kb1-diabetes');
    await p.click('#link-highscore');
    await H.bis(() => p.locator('#liste li').count());
    H.pruefe(p.url().includes('art=challenge') && (await p.locator('#liste-titel').innerText()) === 'KB I – Diabetes mellitus – Klausur-Challenge · 3BFP2/1'
      && (await p.locator('#liste').innerText()).includes('Ben K.'), 'Highscore der Challenge (3BFP2/1) zeigt „Ben K.“');
    H.pruefe((await p.locator('#reiter-art-challenge').getAttribute('aria-selected')) === 'true' && (await p.locator('#untertitel').innerText()).startsWith('Klausur-Challenge'),
      'Reiter „Klausur-Challenge“ gewählt, Untertitel passt');
    await p.screenshot({ path: path.join(ERGEBNISSE, 'challenge-highscore.png') });
    await p.click('#reiter-art-spiel');
    await H.bis(async () => (await p.locator('#liste-status').innerText()).startsWith('Noch keine Einträge – spielen'));
    H.pruefe(!(await p.locator('#liste').innerText()).includes('Ben') && !p.url().includes('art='), 'Reiter „Diabetes Run!“: Spiel-Liste ohne Challenge-Einträge');

    console.log('\n== Zurücksetzen nur der Challenge-Liste');
    attrappe.post(JSON.stringify({ aktion: 'eintragen', liste: 'kb1-diabetes-3bfp2-1', name: 'Spiel S.', punkte: 77, geraet: 'abcdefghijk2', lauf: 'spiellauf01', zeit: Date.now() }));
    await p.goto(basis + 'highscore/?liste=kb1-diabetes&art=challenge&zuruecksetzen=' + TEST_SCHLUESSEL);
    H.pruefe(!p.url().includes(TEST_SCHLUESSEL) && p.url().includes('art=challenge'), 'Zurücksetzen-Link: Schlüssel verschwindet, Art bleibt');
    H.pruefe((await p.locator('#zuruecksetzen-knopf').innerText()) === 'Liste „KB I – Klausur-Challenge · 3BFP2/1“ jetzt zurücksetzen', 'Knopf nennt die Challenge-Liste der Klasse');
    await p.click('#zuruecksetzen-knopf');
    await H.bis(async () => (await p.locator('#zuruecksetzen-status').innerText()).includes('wurde zurückgesetzt'));
    H.pruefe(attrappe.blaetter.get('kb1-diabetes-challenge-3bfp2-1').zeilen.length === 1 && attrappe.blaetter.get('kb1-diabetes-3bfp2-1').zeilen.length === 2,
      'nur die Challenge-Liste wurde geleert, die Spiel-Liste nicht');
    await ctx.close();
  }

  /* ---------- 5. KB II ---------- */
  console.log('\n== KB II: Ablauf ohne Klasse');
  {
    const ctx = await kontext();
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'kb2');
    await p.goto(basis + 'kb2-beratung/');
    await p.click('#challenge-los');
    await p.waitForSelector('#knopf-challenge-start');
    H.pruefe((await p.locator('#untertitel').innerText()) === 'KB II – Beratung', 'Challenge KB II ohne Klasse');
    await p.click('#knopf-challenge-start');
    const themen = await p.evaluate(() => new Set(KlausurChallenge.aufgaben().map((a) => a.thema)).size);
    H.pruefe(themen === POOLS['kb2-beratung'].themen.length, `alle ${themen} ABs in der Challenge vertreten`);
    const lauf = await alleBeantworten(p, true, async (typ, schonGesehen) => {
      if (!schonGesehen && typ === 'zuordnen') await p.screenshot({ path: path.join(ERGEBNISSE, 'challenge-kb2-zuordnen.png') });
    });
    H.pruefe(!lauf.fehler, 'alle 20 Aufgaben beantwortet', lauf.fehler);
    await p.waitForSelector('#ergebnis-gesamt');
    const e = await p.evaluate(() => KlausurChallenge.ergebnis());
    H.pruefe(e.aufgabenPunkte === 2000 && e.bonus === 500, 'alles richtig und schnell: 2000 + 500 Bonus');
    await p.fill('#vorname', 'Ida');
    await p.fill('#initial', 'z');
    await p.click('#knopf-eintragen');
    await H.bis(() => p.locator('#eintragen-meldung.gut').count());
    H.pruefe(attrappe.blaetter.has('kb2-beratung-challenge'), 'ohne Klasse: Blatt „kb2-beratung-challenge“');
    await ctx.close();
  }

  /* ---------- 6. Darstellung auf kleinen Handys, dunkler Modus ---------- */
  console.log('\n== Darstellung: 320 px, dunkler Modus, kein seitliches Scrollen');
  {
    const ctx = await kontext({ optionen: { viewport: { width: 320, height: 568 }, colorScheme: 'dark' } });
    const p = await ctx.newPage();
    H.beobachten(p, protokoll, 'klein');
    const zuBreit = [];
    for (const satz of SAETZE) {
      await p.goto(basis + 'challenge/?satz=' + satz);
      await p.waitForSelector('#knopf-challenge-start');
      // alle Aufgaben des Pools einmal anzeigen
      const anzahl = await p.evaluate(() => KlausurChallenge.daten().themen.reduce((s, t) => s + t.fragen.length, 0));
      for (let runde = 0; runde * ANZAHL < anzahl * 3; runde++) {
        await p.click('#knopf-challenge-start');
        for (let i = 0; i < ANZAHL; i++) {
          const breit = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
          if (breit) zuBreit.push(await p.evaluate(() => (KlausurChallenge.aufgabe().f.frage || '').slice(0, 40)));
          await beantworten(p, i % 2 === 0);
          await p.click('#knopf-weiter');
        }
        await p.waitForSelector('#ergebnis-gesamt');
        if (await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)) zuBreit.push('Auswertung ' + satz);
        await p.goto(basis + 'challenge/?satz=' + satz);
        await p.waitForSelector('#knopf-challenge-start');
      }
    }
    H.pruefe(zuBreit.length === 0, 'keine Aufgabe und keine Auswertung breiter als 320 px', zuBreit);
    await p.screenshot({ path: path.join(ERGEBNISSE, 'challenge-dunkel-320.png') });
    await ctx.close();
  }

  console.log('\n== Protokoll');
  H.pruefe(protokoll.konsole.length === 0, 'keine Fehler in der Browser-Konsole', protokoll.konsole);
  H.pruefe(protokoll.extern.length === 0, 'keine Anfragen an fremde Adressen', protokoll.extern);

  await browser.close();
  server.close();
  process.exit(H.ergebnis() ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
