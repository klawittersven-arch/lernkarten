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

  var sperre = LockService.getScriptLock();
  sperre.waitLock(10000);
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
