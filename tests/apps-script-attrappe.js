/* Führt werkzeuge/highscore-apps-script.gs lokal aus – mit einer nachgebauten
 * Google-Tabelle im Speicher. So prüfen die Tests das echte Skript, ohne Google. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SKRIPT = path.join(__dirname, '..', 'werkzeuge', 'highscore-apps-script.gs');
const TEST_SCHLUESSEL = 'testschluessel1234';

function attrappeErstellen({ schluesselEinsetzen = true } = {}) {
  const blaetter = new Map();
  function blattBauen(name) {
    const zeilen = [];
    return {
      zeilen,
      getName: () => name,
      appendRow: (z) => { zeilen.push(z.slice()); },
      getLastRow: () => zeilen.length,
      getDataRange: () => ({ getValues: () => zeilen.map((z) => z.slice()) }),
      deleteRows: (start, anzahl) => { zeilen.splice(start - 1, anzahl); },
      setFrozenRows: () => {}
    };
  }
  const tabelle = {
    getSheetByName: (n) => blaetter.get(n) || null,
    insertSheet: (n) => { const b = blattBauen(n); blaetter.set(n, b); return b; },
    getSheets: () => [...blaetter.values()]
  };
  const kontext = {
    SpreadsheetApp: { getActiveSpreadsheet: () => tabelle },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: (text) => ({ text, setMimeType() { return this; } })
    },
    LockService: { getScriptLock: () => ({ waitLock: () => {}, releaseLock: () => {} }) },
    Utilities: { sleep: () => {} },
    Date, JSON, Math, Number, String, Object, isFinite
  };
  vm.createContext(kontext);
  let code = fs.readFileSync(SKRIPT, 'utf8');
  if (schluesselEinsetzen) code = code.replace("var RESET_SCHLUESSEL = 'HIER-EIGENEN-SCHLUESSEL-EINTRAGEN';", `var RESET_SCHLUESSEL = '${TEST_SCHLUESSEL}';`);
  vm.runInContext(code, kontext);
  return {
    blaetter,
    aus: false, // true = „keine Verbindung“ simulieren
    get: (parameter) => JSON.parse(kontext.doGet({ parameter }).text),
    post: (body) => JSON.parse(kontext.doPost({ postData: { contents: body } }).text)
  };
}

module.exports = { attrappeErstellen, TEST_SCHLUESSEL };
