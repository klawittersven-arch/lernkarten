/* =====================================================================
 * Highscore-Listen für die Lernkarten (Google Apps Script)
 * =====================================================================
 * Gehört in eine Google-Tabelle: Erweiterungen → Apps Script → diesen Text
 * komplett einfügen → speichern → Bereitstellen (Anleitung: README.md).
 *
 * Für jeden Kartensatz legt das Skript automatisch ein eigenes Tabellenblatt an
 * (z. B. „kb1-diabetes“). Jede Zeile ist eine gespielte Runde:
 *   Zeitpunkt | Name | Punkte | Gerät (Zufallskennung „G-…“) | Lauf (Zufallskennung „L-…“)
 * Einzelne Einträge löschen Sie einfach, indem Sie die Zeile in der Tabelle löschen.
 *
 * Zurücksetzen per Link (nur mit dem Schlüssel unten):
 *   https://klawittersven-arch.github.io/lernkarten/highscore/?liste=kb1-diabetes&zuruecksetzen=SCHLÜSSEL
 *
 * Außerdem zählt das Skript anonym, wie oft die App geöffnet wird (Blatt „Nutzung (anonym)“):
 *   Datum | Kartensatz | Klasse | Bereich | Aufrufe | Geräte
 * und was in der App passiert (Blatt „Ereignisse (anonym)“):
 *   Datum | Kartensatz | Klasse | Ereignis | Anzahl | Geräte
 * Die Handys senden dafür nur Kartensatz, Klasse, Bereich bzw. Ereignis und Anzahl –
 * keine Namen, keine Kennung.
 * ===================================================================== */

// Geheimer Schlüssel für das Zurücksetzen – nur Buchstaben und Ziffern, mindestens 12 Zeichen.
// Niemandem weitergeben und NICHT in das öffentliche GitHub-Repository schreiben.
var RESET_SCHLUESSEL = 'HIER-EIGENEN-SCHLUESSEL-EINTRAGEN';

var MAX_PUNKTE = 20000;          // mehr schafft niemand in einer Runde (Schutz gegen Schummeln)
var ANZEIGE_PLAETZE = 50;        // so viele Namen zeigt die Liste
var MAX_EINTRAEGE_PRO_STUNDE = 15; // je Gerät
var MAX_BLAETTER = 20;

var SPERRWOERTER = [
  'arsch', 'fick', 'fotze', 'hure', 'nutte', 'wichs', 'schlampe', 'bitch',
  'fuck', 'shit', 'scheis', 'kacke', 'pisse', 'penis', 'pimmel', 'schwanz',
  'muschi', 'vagina', 'titte', 'porn', 'sex', 'nazi', 'hitler',
  'neger', 'nigg', 'kanake', 'zigeuner', 'schwuchtel', 'spast', 'mongo',
  'behindert', 'missgeburt', 'bastard', 'wixer', 'wixxer', 'opfer',
  'dick', 'cock', 'pussy', 'slut', 'whore', 'cunt', 'kill'
];

var KOPFZEILE = ['Zeitpunkt', 'Name', 'Punkte', 'Gerät', 'Lauf'];
// Nutzung: der Blattname enthält Großbuchstaben, Leerzeichen und Klammern – so kann ihn keine Highscore-Liste treffen
var NUTZUNG_BLATT = 'Nutzung (anonym)';
var NUTZUNG_KOPF = ['Datum', 'Kartensatz', 'Klasse', 'Bereich', 'Aufrufe', 'Geräte'];
var BEREICHE = { lernkarten: 'Lernkarten', challenge: 'Klausur-Challenge', spiel: 'Diabetes Run!' };
var MAX_NUTZUNG_ZEILEN_PRO_TAG = 60;
// Ereignisse: eigenes Blatt, damit „Nutzung (anonym)“ (und eigene Auswertungen daraus) unverändert bleibt
var EREIGNIS_BLATT = 'Ereignisse (anonym)';
var EREIGNIS_KOPF = ['Datum', 'Kartensatz', 'Klasse', 'Ereignis', 'Anzahl', 'Geräte'];
var EREIGNISSE = {
  karten: 'Karten bewertet',
  'challenge-start': 'Challenge begonnen',
  'challenge-ende': 'Challenge beendet',
  'runde-angeboten': 'Spielrunde angeboten',
  'runde-abgelehnt': 'Spielrunde abgelehnt',
  'runde-gespielt': 'Spielrunde gespielt'
};
var MAX_ANZAHL_JE_MELDUNG = 200;
var PAKET_MERKEN_SEKUNDEN = 21600; // so lange erkennt das Skript doppelt gesendete Pakete (6 Stunden)
var MAX_EREIGNIS_ZEILEN_PRO_TAG = 100;
var LISTE_MUSTER = /^[a-z0-9-]{2,40}$/;
var NAME_MUSTER = /^[A-Za-zÄÖÜäöüßÀ-ÖØ-öø-ÿ][A-Za-zÄÖÜäöüßÀ-ÖØ-öø-ÿ' -]{1,19} [A-ZÄÖÜ]\.$/;
var KENNUNG_MUSTER = /^[a-z0-9]{6,20}$/;

/* ---------- Einstieg ---------- */
function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.aktion === 'liste') return antwort(listeLesen(p.liste));
    if (p.aktion === 'zuruecksetzen') return antwort(zuruecksetzen(p.liste, p.schluessel));
    return antwort({ ok: false, fehler: 'unbekannte Aktion' });
  } catch (x) {
    return antwort({ ok: false, fehler: 'Fehler: ' + x.message });
  }
}

function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (x) { return antwort({ ok: false, fehler: 'ungültige Anfrage' }); }
  try {
    if (d && d.aktion === 'eintragen') return antwort(eintragen(d));
    if (d && d.aktion === 'zaehlen') return antwort(zaehlen(d));
    if (d && d.aktion === 'ereignis') return antwort(ereignisZaehlen(d));
    return antwort({ ok: false, fehler: 'unbekannte Aktion' });
  } catch (x) {
    return antwort({ ok: false, fehler: 'Fehler: ' + x.message });
  }
}

function antwort(objekt) {
  return ContentService.createTextOutput(JSON.stringify(objekt)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Tabellenblätter ---------- */
function blatt(liste, anlegen) {
  if (!LISTE_MUSTER.test(String(liste || ''))) return null;
  var tabelle = SpreadsheetApp.getActiveSpreadsheet();
  var b = tabelle.getSheetByName(liste);
  if (!b && anlegen) {
    if (tabelle.getSheets().length >= MAX_BLAETTER) return null;
    b = tabelle.insertSheet(liste);
    b.appendRow(KOPFZEILE);
    b.setFrozenRows(1);
  }
  return b;
}

function zeilen(b) {
  if (!b || b.getLastRow() < 2) return [];
  return b.getDataRange().getValues().slice(1);
}

// Beste Runde je Name, absteigend nach Punkten (bei Gleichstand zählt, wer zuerst da war)
function rangliste(alle) {
  var beste = {};
  alle.forEach(function (z) {
    var name = String(z[1] || '');
    var punkte = Number(z[2]);
    if (!name || !isFinite(punkte)) return;
    var zeit = z[0] instanceof Date ? z[0].getTime() : Number(new Date(z[0]));
    var k = name.toLowerCase();
    if (!beste[k] || punkte > beste[k].punkte || (punkte === beste[k].punkte && zeit < beste[k].zeit)) {
      beste[k] = { name: name, punkte: punkte, zeit: zeit };
    }
  });
  return Object.keys(beste).map(function (k) { return beste[k]; })
    .sort(function (a, b) { return b.punkte - a.punkte || a.zeit - b.zeit; });
}

/* ---------- Aktionen ---------- */
function listeLesen(liste) {
  if (!LISTE_MUSTER.test(String(liste || ''))) return { ok: false, fehler: 'unbekannte Liste' };
  var r = rangliste(zeilen(blatt(liste, false)));
  return {
    ok: true,
    anzahl: r.length,
    eintraege: r.slice(0, ANZEIGE_PLAETZE).map(function (e) { return { name: e.name, punkte: e.punkte }; })
  };
}

function eintragen(d) {
  var name = String(d.name || '');
  var punkte = Number(d.punkte);
  if (!NAME_MUSTER.test(name)) return { ok: false, fehler: 'Name ungültig' };
  if (gesperrt(name)) return { ok: false, fehler: 'Name nicht erlaubt' };
  if (!(punkte >= 0 && punkte <= MAX_PUNKTE && Math.floor(punkte) === punkte)) return { ok: false, fehler: 'Punkte ungültig' };
  if (!KENNUNG_MUSTER.test(String(d.geraet || '')) || !KENNUNG_MUSTER.test(String(d.lauf || ''))) return { ok: false, fehler: 'Kennung ungültig' };

  // Highscore-Einträge haben Vorrang: bis zu 25 Sekunden warten (die Zählungen warten nur kurz).
  // Klappt es nicht, meldet das Skript „beschäftigt“ – das Handy trägt den Eintrag dann später nach.
  var sperre = LockService.getScriptLock();
  if (!sperre.tryLock(25000)) return { ok: false, fehler: 'beschäftigt' };
  try {
    var b = blatt(d.liste, true);
    if (!b) return { ok: false, fehler: 'unbekannte Liste' };
    var alle = zeilen(b);
    var jetzt = new Date();
    var stundeVorher = jetzt.getTime() - 3600000;
    var vomGeraet = 0;
    for (var i = 0; i < alle.length; i++) {
      // Kennungen mit Vorsilbe speichern, damit die Tabelle sie nie als Zahl deutet
      if (String(alle[i][4]) === 'L-' + d.lauf) return { ok: true, doppelt: true, platz: platzVon(alle, name) };
      var zeit = alle[i][0] instanceof Date ? alle[i][0].getTime() : Number(new Date(alle[i][0]));
      if (String(alle[i][3]) === 'G-' + d.geraet && zeit > stundeVorher) vomGeraet++;
    }
    if (vomGeraet >= MAX_EINTRAEGE_PRO_STUNDE) return { ok: false, fehler: 'zu viele Einträge' };
    var zeile = [jetzt, name, punkte, 'G-' + d.geraet, 'L-' + d.lauf];
    b.appendRow(zeile);
    alle.push(zeile);
    return { ok: true, platz: platzVon(alle, name) };
  } finally {
    sperre.releaseLock();
  }
}

function platzVon(alle, name) {
  var r = rangliste(alle);
  for (var i = 0; i < r.length; i++) if (r[i].name.toLowerCase() === name.toLowerCase()) return i + 1;
  return 0;
}

function zuruecksetzen(liste, schluessel) {
  if (RESET_SCHLUESSEL.length < 12 || RESET_SCHLUESSEL.indexOf('HIER-') === 0 || String(schluessel || '') !== RESET_SCHLUESSEL) {
    Utilities.sleep(1500); // bremst Rateversuche
    return { ok: false, fehler: 'Schlüssel falsch' };
  }
  var sperre = LockService.getScriptLock();
  sperre.waitLock(10000);
  try {
    var b = blatt(liste, false);
    if (b && b.getLastRow() > 1) b.deleteRows(2, b.getLastRow() - 1);
    return { ok: true };
  } finally {
    sperre.releaseLock();
  }
}

/* ---------- Nutzung (anonym): eine Zeile je Tag, Kartensatz, Klasse und Bereich ---------- */
function zaehlen(d) {
  var satz = String(d.satz || '');
  var klasse = String(d.klasse || '');
  var bereich = BEREICHE.hasOwnProperty(String(d.bereich)) ? BEREICHE[d.bereich] : '';
  if (!LISTE_MUSTER.test(satz) || (klasse && !LISTE_MUSTER.test(klasse)) || !bereich) return { ok: false, fehler: 'ungültig' };
  return hochzaehlen({
    blatt: NUTZUNG_BLATT, kopf: NUTZUNG_KOPF, maxZeilen: MAX_NUTZUNG_ZEILEN_PRO_TAG,
    notizen: ['Wie oft geöffnet – dasselbe Handy zählt höchstens alle 30 Minuten einmal.',
      'Wie viele verschiedene Handys an diesem Tag (anonym, ohne Namen).'],
    satz: satz, klasse: klasse, text: bereich, anzahl: 1, neu: d.neu === true
  });
}

/* ---------- Ereignisse (anonym): eine Zeile je Tag, Kartensatz, Klasse und Ereignis ---------- */
function ereignisZaehlen(d) {
  var satz = String(d.satz || '');
  var klasse = String(d.klasse || '');
  var ereignis = EREIGNISSE.hasOwnProperty(String(d.ereignis)) ? EREIGNISSE[d.ereignis] : '';
  var anzahl = Math.floor(Number(d.anzahl));
  if (!LISTE_MUSTER.test(satz) || (klasse && !LISTE_MUSTER.test(klasse)) || !ereignis) return { ok: false, fehler: 'ungültig' };
  if (!(anzahl >= 1)) anzahl = 1;
  if (anzahl > MAX_ANZAHL_JE_MELDUNG) anzahl = MAX_ANZAHL_JE_MELDUNG;
  var paket = KENNUNG_MUSTER.test(String(d.paket || '')) ? 'paket-' + d.paket : '';
  return hochzaehlen({ paket: paket,
    blatt: EREIGNIS_BLATT, kopf: EREIGNIS_KOPF, maxZeilen: MAX_EREIGNIS_ZEILEN_PRO_TAG,
    notizen: ['Wie oft das an diesem Tag passiert ist (z. B. Zahl der bewerteten Karten).',
      'Wie viele verschiedene Handys an diesem Tag (anonym, ohne Namen).'],
    satz: satz, klasse: klasse, text: ereignis, anzahl: anzahl, neu: d.neu === true
  });
}

// Zählt in Blatt o.blatt die Zeile (heute, Kartensatz, Klasse, Text) um o.anzahl hoch – oder legt sie an
function hochzaehlen(o) {
  var neu = o.neu ? 1 : 0;
  var sperre = LockService.getScriptLock();
  // nur kurz warten, damit Highscore-Einträge Vorrang haben; Ereignis-Pakete sendet das Handy später erneut,
  // ein einzelner Aufruf geht dann eben nicht in die Zählung ein
  if (!sperre.tryLock(3000)) return { ok: false, fehler: 'beschäftigt' };
  try {
    // dasselbe Paket zweimal gesendet (z. B. beim Schließen der Seite und beim nächsten Öffnen): nur einmal zählen
    var cache = o.paket ? CacheService.getScriptCache() : null;
    if (cache && cache.get(o.paket)) return { ok: true, doppelt: true };
    var tabelle = SpreadsheetApp.getActiveSpreadsheet();
    var b = tabelle.getSheetByName(o.blatt);
    if (!b) {
      b = tabelle.insertSheet(o.blatt);
      b.appendRow(o.kopf);
      b.setFrozenRows(1);
      b.getRange(1, 5).setNote(o.notizen[0]);
      b.getRange(1, 6).setNote(o.notizen[1]);
    }
    var jetzt = new Date();
    var zone = tabelle.getSpreadsheetTimeZone();
    var tag = Utilities.formatDate(jetzt, zone, 'yyyy-MM-dd');
    var klasseText = o.klasse || 'ohne Klasse';

    // Die Zeilen von heute stehen ganz unten: von unten nach oben suchen, bis ein anderer Tag kommt
    var letzte = b.getLastRow();
    var heute = 0;
    if (letzte >= 2) {
      var von = Math.max(2, letzte - o.maxZeilen + 1);
      var werte = b.getRange(von, 1, letzte - von + 1, 6).getValues();
      for (var i = werte.length - 1; i >= 0; i--) {
        if (tagVon(werte[i][0], zone) !== tag) break;
        heute++;
        if (String(werte[i][1]) === o.satz && String(werte[i][2]) === klasseText && String(werte[i][3]) === o.text) {
          b.getRange(von + i, 5, 1, 2).setValues([[(Number(werte[i][4]) || 0) + o.anzahl, (Number(werte[i][5]) || 0) + neu]]);
          if (cache) cache.put(o.paket, '1', PAKET_MERKEN_SEKUNDEN);
          return { ok: true };
        }
      }
    }
    if (heute >= o.maxZeilen) return { ok: false, fehler: 'zu viele Zeilen' };
    // erst das Format, dann die Werte – so steht in Spalte A immer ein echtes Datum („Mo., 19.10.2026“)
    if (letzte + 1 > b.getMaxRows()) b.insertRowsAfter(b.getMaxRows(), 500); // Blatt voll: Platz schaffen
    var neueZeile = b.getRange(letzte + 1, 1, 1, 6);
    neueZeile.setNumberFormats([['ddd, dd.MM.yyyy', '@', '@', '@', '0', '0']]);
    neueZeile.setValues([[jetzt, o.satz, klasseText, o.text, o.anzahl, neu]]);
    if (cache) cache.put(o.paket, '1', PAKET_MERKEN_SEKUNDEN);
    return { ok: true };
  } finally {
    sperre.releaseLock();
  }
}

// Tag einer Zeile als „yyyy-MM-dd“ – egal, ob dort ein Datum oder (ältere Zeilen) Text wie „Mo, 19.10.2026“ steht
function tagVon(wert, zone) {
  if (wert instanceof Date) return Utilities.formatDate(wert, zone, 'yyyy-MM-dd');
  var m = String(wert).match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  return m ? m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2) : '';
}

/* ---------- Namensfilter (wie auf dem Handy) ---------- */
function normalisieren(text) {
  var ersatz = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's' };
  var t = String(text).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  var aus = '';
  for (var i = 0; i < t.length; i++) {
    var z = ersatz[t[i]] || t[i];
    if (z >= 'a' && z <= 'z') aus += z;
  }
  return aus.replace(/(.)\1+/g, '$1');
}

function gesperrt(name) {
  var vorname = name.replace(/ [A-ZÄÖÜ]\.$/, '');
  var norm = normalisieren(vorname);
  for (var i = 0; i < SPERRWOERTER.length; i++) {
    var w = normalisieren(SPERRWOERTER[i]);
    if (w && norm.indexOf(w) !== -1) return true;
  }
  return false;
}
