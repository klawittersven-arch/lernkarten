/* Führt werkzeuge/highscore-apps-script.gs lokal aus – mit einer nachgebauten
 * Google-Tabelle im Speicher. So prüfen die Tests das echte Skript, ohne Google. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SKRIPT = path.join(__dirname, '..', 'werkzeuge', 'highscore-apps-script.gs');
const TEST_SCHLUESSEL = 'testschluessel1234';

// Utilities.formatDate – nur die Muster, die das Skript braucht ('yyyy-MM-dd')
function datumFormatieren(d, zone, muster) {
  const teile = {};
  new Intl.DateTimeFormat('en-GB', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(d).forEach((t) => { teile[t.type] = t.value; });
  return muster.replace('yyyy', teile.year).replace('MM', teile.month).replace('dd', teile.day);
}

// Wie Google Tabellen (deutsch): Text, der wie ein Datum aussieht („Mo, 19.10.2026“), wird beim
// Anhängen einer Zeile zum Datum – auch wenn die Spalte als Text formatiert ist
function wieGoogle(wert, Uhrzeit) {
  const m = typeof wert === 'string' && wert.match(/^(?:[A-Za-z]{2,3}\.?,? )?(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  return m ? new Uhrzeit(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1]), 12)) : wert;
}

function attrappeErstellen({ schluesselEinsetzen = true } = {}) {
  const blaetter = new Map();
  const zwischenspeicher = new Map(); // CacheService (für doppelt gesendete Pakete)
  const sperre = { frei: true };      // false = Skript ausgelastet (LockService bekommt die Sperre nicht)
  const uhr = { versatz: 0 }; // ms – zum Nachstellen späterer Tage
  class Uhrzeit extends Date {
    constructor(...a) { if (a.length) super(...a); else super(Date.now() + uhr.versatz); }
    static now() { return Date.now() + uhr.versatz; }
  }
  uhr.Uhrzeit = Uhrzeit;
  function blattBauen(name) {
    const zeilen = [];
    const groesse = { zeilen: 1000 }; // wie ein neues Google-Blatt: 1000 Zeilen
    // Bereich ab Zeile/Spalte (1-basiert) wie in Google Tabellen; 'A:A' = ganze Spalte
    function bereich(zeile, spalte, anzahlZeilen = 1, anzahlSpalten = 1) {
      if (zeile + anzahlZeilen - 1 > groesse.zeilen) throw new Error('Bereich außerhalb des Tabellenblatts');
      return {
        getValues: () => Array.from({ length: anzahlZeilen }, (_, i) =>
          Array.from({ length: anzahlSpalten }, (_, j) => { const z = zeilen[zeile - 1 + i]; return z && z[spalte - 1 + j] !== undefined ? z[spalte - 1 + j] : ''; })),
        setValues: (werte) => werte.forEach((w, i) => w.forEach((x, j) => {
          while (zeilen.length < zeile + i) zeilen.push([]);
          zeilen[zeile - 1 + i][spalte - 1 + j] = x;
        })),
        setNumberFormat: () => {},
        setNumberFormats: () => {},
        setNote: () => {}
      };
    }
    return {
      zeilen,
      getName: () => name,
      groesse,
      appendRow: (z) => { zeilen.push(z.map((w) => wieGoogle(w, Uhrzeit))); groesse.zeilen = Math.max(groesse.zeilen, zeilen.length); },
      getMaxRows: () => groesse.zeilen,
      insertRowsAfter: (nach, anzahl) => { groesse.zeilen += anzahl; },
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
    LockService: { getScriptLock: () => ({
      waitLock: () => { if (!sperre.frei) throw new Error('Lock timeout: another process was holding the lock for too long.'); },
      tryLock: () => sperre.frei, releaseLock: () => {} }) },
    CacheService: { getScriptCache: () => ({ get: (k) => (zwischenspeicher.has(k) ? zwischenspeicher.get(k) : null), put: (k, w) => { zwischenspeicher.set(k, w); } }) },
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
    sperre,
    aus: false, // true = „keine Verbindung“ simulieren
    get: (parameter) => JSON.parse(kontext.doGet({ parameter }).text),
    post: (body) => JSON.parse(kontext.doPost({ postData: { contents: body } }).text)
  };
}

module.exports = { attrappeErstellen, TEST_SCHLUESSEL };
