/* Gemeinsame Funktionen für Spielrunden und Highscore-Listen
 * (Lernkarten, Spiel und Highscore-Seite). Einstellungen stehen in einstellungen.js. */
(function () {
  'use strict';

  var E = window.EINSTELLUNGEN || {};
  var T = E.texte || {};

  /* ---------- Speicher auf dem Gerät (jeder Zugriff abgesichert) ---------- */
  var lager = null;
  try {
    lager = window.localStorage;
    lager.setItem('__probe__', '1');
    lager.removeItem('__probe__');
  } catch (e) { lager = null; }

  function lesen(k) {
    if (!lager) return null;
    try { var r = lager.getItem(k); return r === null ? null : JSON.parse(r); } catch (e) { return null; }
  }
  function schreiben(k, w) {
    if (!lager) return;
    try { if (w === null || w === undefined) lager.removeItem(k); else lager.setItem(k, JSON.stringify(w)); } catch (e) { /* voll */ }
  }

  function ersetzen(text, werte) {
    return String(text).replace(/\{(\w+)\}/g, function (_, k) { return werte[k] !== undefined ? werte[k] : ''; });
  }

  function zufallsId(laenge) {
    var zeichen = 'abcdefghijkmnpqrstuvwxyz23456789';
    var aus = '';
    var zahlen = new Uint8Array(laenge);
    try { (window.crypto || window.msCrypto).getRandomValues(zahlen); } catch (e) {
      for (var j = 0; j < laenge; j++) zahlen[j] = Math.floor(Math.random() * 256);
    }
    for (var i = 0; i < laenge; i++) aus += zeichen[zahlen[i] % zeichen.length];
    return aus;
  }

  function geraeteId() {
    var id = lesen('lernkarten:geraet');
    if (typeof id !== 'string' || !/^[a-z0-9]{12}$/.test(id)) {
      id = zufallsId(12);
      schreiben('lernkarten:geraet', id);
    }
    return id;
  }

  /* ---------- Listen ---------- */
  function liste(kennung) {
    var l = E.listen || [];
    for (var i = 0; i < l.length; i++) if (l[i].kennung === kennung) return l[i];
    return null;
  }

  /* ---------- Klasse: kommt mit dem QR-Code (?klasse=3bfp2-1) und wird auf dem Gerät
     gemerkt; jede Klasse hat eigene Highscore-Listen (z. B. „kb1-diabetes-3bfp2-1“) ---------- */
  function klasseFinden(kennung) {
    var k = E.klassen || [];
    for (var i = 0; i < k.length; i++) if (k[i].kennung === kennung) return k[i];
    return null;
  }
  var KLASSE = (function () {
    var ausAdresse = '';
    try { ausAdresse = (new URLSearchParams(location.search).get('klasse') || '').toLowerCase(); } catch (e) { /* alter Browser */ }
    if (klasseFinden(ausAdresse)) { schreiben('lernkarten:klasse', ausAdresse); return klasseFinden(ausAdresse); }
    return klasseFinden(lesen('lernkarten:klasse'));
  })();

  // Name der Highscore-Liste für einen Kartensatz (mit Klasse, falls bekannt)
  function listenKennung(satz) { return KLASSE ? satz + '-' + KLASSE.kennung : satz; }
  // Kurzname für Texte, z. B. „KB I · 3BFP2/1“
  function listenName(satz) {
    var l = liste(satz);
    var n = l ? (l.kurz || l.titel) : satz;
    return KLASSE ? n + ' · ' + KLASSE.name : n;
  }

  function spielAn(kennung) { return E.spielAn !== false && !!liste(kennung); }

  /* ---------- Spielrunden: „verdient“ schreibt nur die Lernkarten-App,
     „gespielt“ nur das Spiel – so kommen sich zwei offene Seiten nicht in die Quere ---------- */
  function zahl(k) {
    var n = lesen(k);
    return typeof n === 'number' && isFinite(n) && n > 0 ? Math.floor(n) : 0;
  }
  var Runden = {
    verdient: function (k) { return zahl('lernkarten:' + k + ':spiel-verdient'); },
    verdientSetzen: function (k, n) { schreiben('lernkarten:' + k + ':spiel-verdient', n); },
    gespielt: function (k) { return zahl('lernkarten:' + k + ':spiel-gespielt'); },
    verbrauchen: function (k) { schreiben('lernkarten:' + k + ':spiel-gespielt', Runden.gespielt(k) + 1); },
    frei: function (k) { return Math.max(0, Runden.verdient(k) - Runden.gespielt(k)); }
  };

  /* ---------- Name „Vorname X.“ ---------- */
  var VORNAME = /^[A-Za-zÄÖÜäöüßÀ-ÖØ-öø-ÿ][A-Za-zÄÖÜäöüßÀ-ÖØ-öø-ÿ' -]{1,19}$/;
  var INITIAL = /^[A-Za-zÄÖÜäöü]$/;
  var ERSATZ = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's' };

  function normalisieren(text) {
    var t = String(text).toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    var aus = '';
    for (var i = 0; i < t.length; i++) {
      var z = ERSATZ[t[i]] || t[i];
      if (z >= 'a' && z <= 'z') aus += z;
    }
    return aus.replace(/(.)\1+/g, '$1');
  }

  function vornameSaeubern(v) { return String(v || '').trim().replace(/\s+/g, ' '); }

  // Ergebnis: '' (in Ordnung), 'vorname', 'initial' oder 'wort'
  function namePruefen(vorname, initial) {
    var v = vornameSaeubern(vorname);
    if (!VORNAME.test(v)) return 'vorname';
    if (!INITIAL.test(String(initial || '').trim())) return 'initial';
    var norm = normalisieren(v);
    var sperr = E.sperrwoerter || [];
    for (var i = 0; i < sperr.length; i++) {
      var w = normalisieren(sperr[i]);
      if (w && norm.indexOf(w) !== -1) return 'wort';
    }
    return '';
  }

  function anzeigeName(vorname, initial) {
    var v = vornameSaeubern(vorname);
    v = v.replace(/(^|[ -])([a-zäöüß])/g, function (_, a, b) { return a + b.toUpperCase(); });
    return v + ' ' + String(initial).trim().toUpperCase() + '.';
  }

  function nameLesen() {
    var n = lesen('lernkarten:name');
    return n && typeof n.vorname === 'string' && typeof n.initial === 'string' ? n : null;
  }
  function nameSpeichern(vorname, initial) {
    schreiben('lernkarten:name', { vorname: vornameSaeubern(vorname), initial: String(initial).trim().toUpperCase() });
  }

  /* ---------- Verbindung zur Highscore-Liste (Google Apps Script) ---------- */
  function adresse() { return window.HIGHSCORE_TEST_ADRESSE || E.highscoreAdresse || ''; }
  function eingerichtet() { return /^https?:\/\//.test(adresse()); }

  function holen(url, optionen) {
    var abbruch = typeof AbortController === 'function' ? new AbortController() : null;
    var o = optionen || {};
    if (abbruch) o.signal = abbruch.signal;
    var zeit = setTimeout(function () { if (abbruch) abbruch.abort(); }, 15000);
    return fetch(url, o).then(function (r) {
      clearTimeout(zeit);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }, function (e) { clearTimeout(zeit); throw e; });
  }

  function anfrageGet(werte) {
    var teile = [];
    Object.keys(werte).forEach(function (k) { teile.push(encodeURIComponent(k) + '=' + encodeURIComponent(werte[k])); });
    var a = adresse();
    return holen(a + (a.indexOf('?') === -1 ? '?' : '&') + teile.join('&'), { method: 'GET', cache: 'no-store' });
  }

  // satz = Kennung des Kartensatzes; die Klasse wird automatisch ergänzt
  function listeLaden(satz) {
    if (!eingerichtet()) return Promise.reject(new Error('nicht eingerichtet'));
    return anfrageGet({ aktion: 'liste', liste: listenKennung(satz) });
  }

  function zuruecksetzen(satz, schluessel) {
    return anfrageGet({ aktion: 'zuruecksetzen', liste: listenKennung(satz), schluessel: schluessel });
  }

  // Eintrag senden; als Text (nicht application/json), damit der Browser keine
  // Vorab-Anfrage schickt, die Google Apps Script nicht beantwortet.
  function senden(eintrag) {
    return holen(adresse(), { method: 'POST', body: JSON.stringify(eintrag), cache: 'no-store' });
  }

  /* Warteschlange: Einträge, die (noch) nicht gesendet werden konnten */
  var WS = 'lernkarten:highscore-ausstehend';
  function warteschlange() { var w = lesen(WS); return Array.isArray(w) ? w : []; }

  // Lehrkraft-Test (Highscore-Seite): sofort senden, ohne Warteschlange
  function testEintragen(satz) {
    return senden({ aktion: 'eintragen', liste: listenKennung(satz), name: 'Test T.', punkte: 1, geraet: geraeteId(), lauf: zufallsId(10), zeit: Date.now() });
  }

  function eintragen(satz, name, punkte) {
    var eintrag = {
      aktion: 'eintragen', liste: listenKennung(satz), name: name, punkte: Math.max(0, Math.floor(punkte)),
      geraet: geraeteId(), lauf: zufallsId(10), zeit: Date.now()
    };
    if (!eingerichtet()) {
      merken(eintrag);
      return Promise.resolve({ ausstehend: true, nichtEingerichtet: true });
    }
    return senden(eintrag).then(function (antwort) {
      return antwort && antwort.ok ? antwort : { abgelehnt: true, fehler: antwort && antwort.fehler };
    }, function () {
      merken(eintrag);
      return { ausstehend: true };
    });
  }

  function merken(eintrag) {
    var w = warteschlange();
    w.push(eintrag);
    schreiben(WS, w.slice(-20));
  }

  var sendetGerade = false;
  function ausstehendeSenden() {
    var w = warteschlange();
    if (!w.length || !eingerichtet() || sendetGerade) return Promise.resolve(0);
    sendetGerade = true;
    var gesendet = 0;
    function naechster() {
      var liste_ = warteschlange();
      if (!liste_.length) return Promise.resolve();
      var e = liste_[0];
      return senden(e).then(function () {
        // angenommen oder abgelehnt (z. B. doppelt): aus der Warteschlange nehmen
        schreiben(WS, warteschlange().filter(function (x) { return x.lauf !== e.lauf; }));
        gesendet++;
        return naechster();
      });
    }
    return naechster().then(function () { sendetGerade = false; return gesendet; },
      function () { sendetGerade = false; return gesendet; });
  }

  window.LK = {
    E: E,
    T: T,
    ersetzen: ersetzen,
    liste: liste,
    klasse: function () { return KLASSE; },
    listenKennung: listenKennung,
    listenName: listenName,
    spielAn: spielAn,
    Runden: Runden,
    namePruefen: namePruefen,
    anzeigeName: anzeigeName,
    nameLesen: nameLesen,
    nameSpeichern: nameSpeichern,
    eingerichtet: eingerichtet,
    listeLaden: listeLaden,
    eintragen: eintragen,
    testEintragen: testEintragen,
    ausstehendeSenden: ausstehendeSenden,
    warteschlange: warteschlange,
    zuruecksetzen: zuruecksetzen,
    geraeteId: geraeteId
  };
})();
