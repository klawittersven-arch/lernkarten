/* Führt werkzeuge/highscore-apps-script.gs lokal aus – mit einer nachgebauten
 * Google-Tabelle im Speicher. So prüfen die Tests das echte Skript, ohne Google. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SKRIPT = path.join(__dirname, '..', 'werkzeuge', 'highscore-apps-script.gs');
const TEST_SCHLUESSEL = 'testschluessel1234';

// Utilities.formatDate – nur die Muster, die das Skript braucht ('u' = Wochentag 1–7 ab Montag, 'dd.MM.yyyy')
function datumFormatieren(d, zone, muster) {
  const teile = {};
  new Intl.DateTimeFormat('en-GB', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' })
    .formatToParts(d).forEach((t) => { teile[t.type] = t.value; });
  const wochentag = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(teile.weekday) + 1;
  return muster.replace('dd', teile.day).replace('MM', teile.month).replace('yyyy', teile.year).replace(/^u$/, String(wochentag));
}

function attrappeErstellen({ schluesselEinsetzen = true } = {}) {
  const blaetter = new Map();
  const uhr = { versatz: 0 }; // ms – zum Nachstellen späterer Tage
  class Uhrzeit extends Date {
    constructor(...a) { if (a.length) super(...a); else super(Date.now() + uhr.versatz); }
    static now() { return Date.now() + uhr.versatz; }
  }
  function blattBauen(name) {
    const zeilen = [];
    // Bereich ab Zeile/Spalte (1-basiert) wie in Google Tabellen; 'A:A' = ganze Spalte
    function bereich(zeile, spalte, anzahlZeilen = 1, anzahlSpalten = 1) {
      return {
        getValues: () => Array.from({ length: anzahlZeilen }, (_, i) =>
          Array.from({ length: anzahlSpalten }, (_, j) => { const z = zeilen[zeile - 1 + i]; return z && z[spalte - 1 + j] !== undefined ? z[spalte - 1 + j] : ''; })),
        setValues: (werte) => werte.forEach((w, i) => w.forEach((x, j) => {
          while (zeilen.length < zeile + i) zeilen.push([]);
          zeilen[zeile - 1 + i][spalte - 1 + j] = x;
        })),
        setNumberFormat: () => {},
        setNote: () => {}
      };
    }
    return {
      zeilen,
      getName: () => name,
      appendRow: (z) => { zeilen.push(z.slice()); },
      getLastRow: () => zeilen.length,
      getDataRange: () => ({ getValues: () => zeilen.map((z) => z.slice()) }),
      getRange: (a, b, c, d) => (typeof a === 'string' ? bereich(1, 1) : bereich(a, b, c, d)),
      deleteRows: (start, anzahl) => { zeilen.splice(start - 1, anzahl); },
      setFrozenRows: () => {}
    };
  }
  const tabelle = {
    getSheetByName: (n) => blaetter.get(n) || null,
    insertSheet: (n) => { const b = blattBauen(n); blaetter.set(n, b); return b; },
    getSheets: () => [...blaetter.values()],
    getSpreadsheetTimeZone: () => 'Europe/Berlin'
  };
  const kontext = {
    SpreadsheetApp: { getActiveSpreadsheet: () => tabelle },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: (text) => ({ text, setMimeType() { return this; } })
    },
    LockService: { getScriptLock: () => ({ waitLock: () => {}, tryLock: () => true, releaseLock: () => {} }) },
    Utilities: { sleep: () => {}, formatDate: datumFormatieren },
    Date: Uhrzeit, JSON, Math, Number, String, Object, isFinite
  };
  vm.createContext(kontext);
  let code = fs.readFileSync(SKRIPT, 'utf8');
  if (schluesselEinsetzen) code = code.replace("var RESET_SCHLUESSEL = 'HIER-EIGENEN-SCHLUESSEL-EINTRAGEN';", `var RESET_SCHLUESSEL = '${TEST_SCHLUESSEL}';`);
  vm.runInContext(code, kontext);
  return {
    blaetter,
    uhr,
    aus: false, // true = „keine Verbindung“ simulieren
    get: (parameter) => JSON.parse(kontext.doGet({ parameter }).text),
    post: (body) => JSON.parse(kontext.doPost({ postData: { contents: body } }).text)
  };
}

module.exports = { attrappeErstellen, TEST_SCHLUESSEL };
