/* Service Worker eines Kartensatzes: speichert alle Dateien beim ersten Aufruf,
 * damit die Karten auch ohne Netz (Bus, Keller, schwaches WLAN) funktionieren.
 * Beim Kopieren des Ordners für einen neuen Kartensatz muss hier nichts geändert werden.
 *
 * Strategie: zuerst das Netz fragen (mit Zeitlimit), sonst die gespeicherte Fassung.
 * So erscheinen Änderungen an karten.js sofort, sobald ein Handy Netz hat.
 * Nach größeren Änderungen VERSION erhöhen – dann wird der Speicher erneuert. */
'use strict';

var VERSION = 'v9';
// eigener Speicher je Ordner, z. B. „lernkarten-/lernkarten/kb1-diabetes/-v1“
var PRAEFIX = 'lernkarten-' + new URL('./', self.location).pathname + '-';
var CACHE = PRAEFIX + VERSION;
var ZEITLIMIT_MS = 4000;

var DATEIEN = [
  './',
  'index.html',
  'karten.js',
  'manifest.json',
  '../app/einstellungen.js',
  '../app/highscore.js',
  '../app/lernkarten.js',
  '../app/lernkarten.css',
  '../app/icon-192.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(DATEIEN.map(function (d) { return new Request(d, { cache: 'reload' }); })).then(function () {
        // Aufgaben der Klausur-Challenge gleich mitspeichern (fehlt die Datei, macht das nichts)
        return c.add(new Request('fragen.js', { cache: 'reload' })).catch(function () { /* egal */ });
      });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (namen) {
      return Promise.all(namen.filter(function (n) {
        return n.indexOf(PRAEFIX) === 0 && n !== CACHE;
      }).map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(new Promise(function (fertig) {
    var erledigt = false;
    function ausCache() {
      return caches.open(CACHE).then(function (c) {
        return c.match(req, { ignoreSearch: true }).then(function (r) {
          return r || (req.mode === 'navigate' ? c.match('index.html') : undefined);
        });
      });
    }
    var timer = setTimeout(function () {
      ausCache().then(function (r) {
        if (r && !erledigt) { erledigt = true; fertig(r); }
      });
    }, ZEITLIMIT_MS);

    fetch(req, { cache: 'no-cache' }).then(function (antwort) {
      if (antwort && antwort.ok && antwort.type === 'basic') {
        var kopie = antwort.clone();
        caches.open(CACHE).then(function (c) {
          return c.put(url.search ? new Request(url.origin + url.pathname) : req, kopie);
        });
      }
      clearTimeout(timer);
      if (!erledigt) { erledigt = true; fertig(antwort); }
    }).catch(function () {
      clearTimeout(timer);
      ausCache().then(function (r) {
        if (erledigt) return;
        erledigt = true;
        fertig(r || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
      });
    });
  }));
});
