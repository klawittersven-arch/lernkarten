/* Gemeinsame Hilfen für die automatischen Tests (Playwright, Chromium).
 * Start: siehe tests/README.md */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// GitHub Pages veröffentlicht docs/ unter /lernkarten/ – der Testserver macht es genauso
const DOCS = path.resolve(__dirname, '..', 'docs');
const PFAD = '/lernkarten/';
const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.json': 'application/json; charset=utf-8'
};

// attrappe (optional): nachgebautes Google-Apps-Script unter /fake-exec (siehe apps-script-attrappe.js)
function serverStarten({ attrappe = null } = {}) {
  return new Promise((ok) => {
    const server = http.createServer((req, res) => {
      const adresse = new URL(req.url, 'http://x');
      if (adresse.pathname === '/fake-exec' && attrappe) {
        const kopf = { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' };
        if (attrappe.aus) { res.writeHead(503, kopf); res.end('{}'); return; }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (d) => { body += d; });
          req.on('end', () => { res.writeHead(200, kopf); res.end(JSON.stringify(attrappe.post(body))); });
        } else {
          res.writeHead(200, kopf);
          res.end(JSON.stringify(attrappe.get(Object.fromEntries(adresse.searchParams))));
        }
        return;
      }
      let p = decodeURIComponent(adresse.pathname);
      if (!p.startsWith(PFAD)) { res.writeHead(404); res.end('nicht gefunden'); return; }
      p = p.slice(PFAD.length - 1);
      if (p.endsWith('/')) p += 'index.html';
      const datei = path.join(DOCS, p);
      if (!datei.startsWith(DOCS) || !fs.existsSync(datei) || fs.statSync(datei).isDirectory()) {
        res.writeHead(404); res.end('nicht gefunden'); return;
      }
      res.writeHead(200, { 'Content-Type': TYPEN[path.extname(datei)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      fs.createReadStream(datei).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => ok({
      server,
      basis: `http://127.0.0.1:${server.address().port}${PFAD}`,
      attrappeAdresse: `http://127.0.0.1:${server.address().port}/fake-exec`
    }));
  });
}

let fehlerZahl = 0;
let pruefZahl = 0;
function pruefe(bedingung, text, details) {
  pruefZahl++;
  if (bedingung) console.log('  ✓ ' + text);
  else { fehlerZahl++; console.log('  ✗ ' + text + (details !== undefined ? '  → ' + JSON.stringify(details) : '')); }
}
function ergebnis() {
  console.log(`\n${pruefZahl - fehlerZahl} von ${pruefZahl} Prüfungen bestanden.`);
  return fehlerZahl === 0;
}

const MOBIL = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

/* Beobachtet Konsolenfehler und Anfragen an fremde Adressen */
function beobachten(seite, protokoll, name) {
  seite.on('console', (m) => { if (m.type() === 'error') protokoll.konsole.push(`[${name}] ${m.text()}`); });
  seite.on('pageerror', (e) => protokoll.konsole.push(`[${name}] ${e.message}`));
  seite.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith('http://127.0.0.1') && !u.startsWith('data:') && !u.startsWith('blob:')) protokoll.extern.push(u);
  });
}

const warte = (ms) => new Promise((r) => setTimeout(r, ms));

async function bis(fn, { zeit = 30000, takt = 200 } = {}) {
  const ende = Date.now() + zeit;
  while (Date.now() < ende) {
    try { const w = await fn(); if (w) return w; } catch (e) { /* weiter versuchen */ }
    await warte(takt);
  }
  return false;
}

module.exports = { chromium, serverStarten, pruefe, ergebnis, MOBIL, beobachten, warte, bis, DOCS };
