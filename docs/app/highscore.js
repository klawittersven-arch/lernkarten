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
  var KLASSE_GEFRAGT = 'lernkarten:klasse-gefragt'; // „Ohne Klasse weiter“ gewählt: nicht noch einmal fragen
  var KLASSE = (function () {
    var ausAdresse = '';
    try { ausAdresse = (new URLSearchParams(location.search).get('klasse') || '').toLowerCase(); } catch (e) { /* alter Browser */ }
    if (klasseFinden(ausAdresse)) { schreiben('lernkarten:klasse', ausAdresse); return klasseFinden(ausAdresse); }
    return klasseFinden(lesen('lernkarten:klasse'));
  })();

  /* Art der Liste: '' = Spiel „Diabetes Run!“, 'challenge' = Klausur-Challenge (eigene Listen) */
  function artTeil(art) { return art === 'challenge' ? '-challenge' : ''; }

  // Name der Highscore-Liste für einen Kartensatz (mit Klasse, falls bekannt),
  // z. B. „kb1-diabetes-3bfp2-1“ oder „kb1-diabetes-challenge-3bfp2-1“
  function listenKennung(satz, art) {
    var n = satz + artTeil(art);
    return KLASSE ? n + '-' + KLASSE.kennung : n;
  }
  // Kurzname für Texte, z. B. „KB I · 3BFP2/1“ oder „KB I – Klausur-Challenge · 3BFP2/1“
  function listenName(satz, art) {
    var l = liste(satz);
    var n = l ? (l.kurz || l.titel) : satz;
    if (art === 'challenge') n += ' – ' + (T.challengeTitel || 'Klausur-Challenge');
    return KLASSE ? n + ' · ' + KLASSE.name : n;
  }

  function spielAn(kennung) { return E.spielAn !== false && !!liste(kennung); }

  /* Klausur-Challenge: erst sichtbar, wenn challengeAn: true – vorher nur als Vorschau für die
     Lehrkraft (Adresse mit ?vorschau=1; gilt dann bis zum Schließen des Browsers) */
  var VORSCHAU = (function () {
    var an = false;
    try {
      if (new URLSearchParams(location.search).get('vorschau') === '1') sessionStorage.setItem('lernkarten-vorschau', '1');
      an = sessionStorage.getItem('lernkarten-vorschau') === '1';
    } catch (e) { /* alter Browser oder kein Speicher */ }
    return an;
  })();
  function challengeAn(kennung) { return (E.challengeAn === true || VORSCHAU) && !!liste(kennung); }

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
  function listeLaden(satz, art) {
    if (!eingerichtet()) return Promise.reject(new Error('nicht eingerichtet'));
    return anfrageGet({ aktion: 'liste', liste: listenKennung(satz, art) });
  }

  function zuruecksetzen(satz, schluessel, art) {
    return anfrageGet({ aktion: 'zuruecksetzen', liste: listenKennung(satz, art), schluessel: schluessel });
  }

  // Eintrag senden; als Text (nicht application/json), damit der Browser keine
  // Vorab-Anfrage schickt, die Google Apps Script nicht beantwortet.
  // beimVerlassen: die Anfrage überlebt das Schließen der Seite (keepalive)
  function senden(eintrag, beimVerlassen) {
    var o = { method: 'POST', body: JSON.stringify(eintrag), cache: 'no-store' };
    if (beimVerlassen) o.keepalive = true;
    return holen(adresse(), o);
  }

  /* Warteschlange: Einträge, die (noch) nicht gesendet werden konnten */
  var WS = 'lernkarten:highscore-ausstehend';
  function warteschlange() { var w = lesen(WS); return Array.isArray(w) ? w : []; }

  // Lehrkraft-Test (Highscore-Seite): sofort senden, ohne Warteschlange
  function testEintragen(satz, art) {
    return senden({ aktion: 'eintragen', liste: listenKennung(satz, art), name: 'Test T.', punkte: 1, geraet: geraeteId(), lauf: zufallsId(10), zeit: Date.now() });
  }

  function eintragen(satz, name, punkte, art) {
    var eintrag = {
      aktion: 'eintragen', liste: listenKennung(satz, art), name: name, punkte: Math.max(0, Math.floor(punkte)),
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

  /* ---------- Nutzung zählen (anonym, Blatt „Nutzung (anonym)“ in der Google-Tabelle):
     gesendet werden nur Kartensatz, Klasse, Bereich und ob das Handy heute zum ersten Mal
     zählt – kein Name, keine Gerätekennung. Dasselbe Handy zählt höchstens alle 30 Minuten
     als „Aufruf“. Lehrkraft-Handy ausnehmen: eine Seite einmal mit ?nichtzaehlen=1 öffnen
     (wieder zählen: ?nichtzaehlen=0) ---------- */
  var NUTZUNG = 'lernkarten:nutzung';
  var NICHT_ZAEHLEN = 'lernkarten:nicht-zaehlen';
  var NUTZUNG_PAUSE_MS = 30 * 60 * 1000;
  (function () {
    try {
      var n = new URLSearchParams(location.search).get('nichtzaehlen');
      if (n === '1') schreiben(NICHT_ZAEHLEN, true);
      else if (n === '0') schreiben(NICHT_ZAEHLEN, null);
    } catch (e) { /* alter Browser */ }
  })();

  function heute() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function jetztZaehlen(satz, bereich) {
    if (E.nutzungZaehlen === false || !eingerichtet() || lesen(NICHT_ZAEHLEN) === true) return;
    // Klasse wird gerade erfragt: erst danach zählen (mit Klasse nach dem Neuladen, sonst ohne)
    if (frageOffen) { aufgeschoben.push([satz, bereich]); return; }
    if (navigator.onLine === false) return;
    var alle = lesen(NUTZUNG);
    if (!alle || typeof alle !== 'object') alle = {};
    var k = satz + '|' + bereich;
    var v = alle[k] || {};
    var jetzt = Date.now();
    var tag = heute();
    if (v.tag === tag && typeof v.zeit === 'number' && jetzt >= v.zeit && jetzt - v.zeit < NUTZUNG_PAUSE_MS) return;
    alle[k] = { tag: tag, zeit: jetzt };
    schreiben(NUTZUNG, alle);
    senden({ aktion: 'zaehlen', satz: satz, klasse: KLASSE ? KLASSE.kennung : '', bereich: bereich, neu: v.tag !== tag })
      .catch(function () { /* geht ein Aufruf verloren, ist das egal */ });
  }

  // beim Öffnen der Seite und beim Zurückkehren in eine offen gebliebene Seite
  // bereich: 'lernkarten', 'challenge' oder 'spiel'
  function nutzungZaehlen(satz, bereich) {
    if (!liste(satz)) return;
    jetztZaehlen(satz, bereich);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') jetztZaehlen(satz, bereich);
    });
  }

  /* ---------- Ereignisse zählen (anonym, eigenes Blatt „Ereignisse (anonym)“):
     wie oft etwas passiert – bewertete Karten, begonnene/beendete Challenges,
     angebotene/abgelehnte/gespielte Spielrunden. Gesendet werden nur Kartensatz, Klasse,
     Ereignis, Anzahl und ob das Handy heute zum ersten Mal für dieses Ereignis zählt –
     kein Name, keine Gerätekennung, nichts darüber, welche Karten gewusst wurden.
     Auf dem Handy ist davon nichts zu sehen. Bewertete Karten werden gesammelt und je
     EREIGNIS_BUENDEL Karten bzw. beim Verlassen der Seite gesendet. ---------- */
  var EREIGNISSE = 'lernkarten:ereignisse';
  var EREIGNIS_BUENDEL = 10;
  var GESAMMELT = { karten: true }; // diese Ereignisse werden gebündelt gesendet
  var PAKET_VERFALL_MS = 5 * 3600 * 1000; // beim Verlassen gesendet und so alt: gilt als angekommen

  function zaehlenErlaubt() {
    return E.nutzungZaehlen !== false && eingerichtet() && lesen(NICHT_ZAEHLEN) !== true;
  }
  function ereignisseLesen() {
    var a = lesen(EREIGNISSE);
    return a && typeof a === 'object' && !Array.isArray(a) ? a : {};
  }
  function ganzeZahl(n) { n = Math.floor(Number(n) || 0); return n > 0 ? n : 0; }

  /* Jede Meldung ist ein „Paket“ mit Zufallskennung. Es bleibt auf dem Handy, bis das Skript
     den Empfang bestätigt; wird es doppelt gesendet (z. B. beim Schließen der Seite und beim
     nächsten Öffnen noch einmal), zählt das Skript es trotzdem nur einmal. */
  var MAX_PAKETE = 20;          // je Ereignis höchstens so viele unbestätigte Pakete auf dem Handy
  var MAX_JE_PAKET = 200;       // so viel nimmt das Skript je Meldung an
  var unterwegs = {};           // Pakete, deren Antwort gerade aussteht (nur auf dieser Seite)

  function ereignisseSenden(nur, beimVerlassen) {
    if (!zaehlenErlaubt() || navigator.onLine === false) return;
    var alle = ereignisseLesen();
    var tag = heute();
    var jetzt = Date.now();
    var zuSenden = [];
    Object.keys(alle).forEach(function (k) {
      if (nur && k !== nur) return;
      var v = alle[k] || {};
      var pakete = (Array.isArray(v.pakete) ? v.pakete : []).filter(function (p) {
        return p && p.id && !(p.verlassen && jetzt - p.verlassen > PAKET_VERFALL_MS);
      });
      var offen = ganzeZahl(v.offen);
      if (offen > 0 && pakete.length < MAX_PAKETE) {
        var n = Math.min(offen, MAX_JE_PAKET);
        pakete.push({ id: zufallsId(10), anzahl: n, neu: v.gemeldet !== tag });
        v.offen = offen - n;
        v.gemeldet = tag;
      }
      pakete.forEach(function (p) {
        if (beimVerlassen && !p.verlassen) p.verlassen = jetzt;
        if (beimVerlassen || !unterwegs[p.id]) zuSenden.push({ k: k, p: p });
      });
      v.pakete = pakete;
      alle[k] = v;
    });
    schreiben(EREIGNISSE, alle); // zuerst merken – erst danach senden
    zuSenden.forEach(function (z) {
      var teile = z.k.split('|');
      unterwegs[z.p.id] = true;
      senden({ aktion: 'ereignis', satz: teile[0], klasse: KLASSE ? KLASSE.kennung : '', ereignis: teile[1],
        anzahl: z.p.anzahl, neu: z.p.neu, paket: z.p.id }, beimVerlassen)
        .then(function (antwort) {
          delete unterwegs[z.p.id];
          // angekommen (oder schon früher angekommen) oder als ungültig abgelehnt: Paket entfernen
          if (!antwort || (!antwort.ok && antwort.fehler === 'beschäftigt')) return;
          var a = ereignisseLesen();
          if (a[z.k] && Array.isArray(a[z.k].pakete)) {
            a[z.k].pakete = a[z.k].pakete.filter(function (p) { return p && p.id !== z.p.id; });
            schreiben(EREIGNISSE, a);
          }
        }, function () {
          delete unterwegs[z.p.id]; // bleibt liegen und wird beim nächsten Mal noch einmal gesendet
        });
    });
  }

  // ereignis: 'karten', 'challenge-start', 'challenge-ende', 'runde-angeboten', 'runde-abgelehnt', 'runde-gespielt'
  function ereignisZaehlen(satz, ereignis) {
    if (!liste(satz) || !zaehlenErlaubt()) return;
    var alle = ereignisseLesen();
    var k = satz + '|' + ereignis;
    var v = alle[k] || {};
    v.offen = ganzeZahl(v.offen) + 1;
    alle[k] = v;
    schreiben(EREIGNISSE, alle);
    if (!GESAMMELT[ereignis] || v.offen >= EREIGNIS_BUENDEL) ereignisseSenden(k);
  }

  // Reste beim Verlassen der Seite senden und – falls etwas liegen geblieben ist – kurz nach dem Öffnen
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') ereignisseSenden(null, true);
  });
  window.addEventListener('pagehide', function () { ereignisseSenden(null, true); });
  setTimeout(function () { ereignisseSenden(); }, 3000);

  /* ---------- Klasse erfragen: Kennt das Handy noch keine Klasse (z. B. App über den
     Startbildschirm des iPhones geöffnet, Link ohne Klasse bekommen, anderer Browser),
     fragt die App einmal nach. Nicht auf dem Lehrkraft-Handy (?nichtzaehlen=1). ---------- */
  var frageOffen = false;
  var aufgeschoben = [];

  function klasseErfragen() {
    var k = E.klassen || [];
    if (KLASSE || !k.length || !lager || lesen(NICHT_ZAEHLEN) === true || lesen(KLASSE_GEFRAGT) === true) return;
    if (document.getElementById('klasse-frage')) return;
    frageOffen = true;

    var stil = document.createElement('style');
    stil.textContent =
      '#klasse-frage{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;' +
      'padding:16px;background:rgba(14,24,27,.6);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '#klasse-frage .kf-box{background:#fff;color:#16262A;border-radius:16px;width:100%;max-width:360px;' +
      'padding:22px 20px 14px;box-shadow:0 10px 40px rgba(0,0,0,.35);text-align:center}' +
      '#klasse-frage h2{margin:0 0 8px;font-size:1.25rem;line-height:1.3}' +
      '#klasse-frage p{margin:0 0 18px;line-height:1.45;color:#56696E}' +
      '#klasse-frage .kf-klasse{display:block;width:100%;min-height:52px;margin:0 0 10px;padding:12px;font:inherit;' +
      'font-size:1.15rem;font-weight:700;border:0;border-radius:12px;background:#25434B;color:#fff;cursor:pointer}' +
      '#klasse-frage .kf-ohne{margin:2px 0 0;padding:10px;font:inherit;font-size:.9rem;background:none;border:0;' +
      'color:#56696E;text-decoration:underline;cursor:pointer}' +
      '#klasse-frage button:focus-visible{outline:3px solid #F2B600;outline-offset:2px}#klasse-frage .kf-box:focus{outline:none}' +
      '@media (prefers-color-scheme:dark){#klasse-frage .kf-box{background:#1A2A2E;color:#E6EEF0}' +
      '#klasse-frage p,#klasse-frage .kf-ohne{color:#A3B6BB}#klasse-frage .kf-klasse{background:#3F7D85}}';
    document.head.appendChild(stil);

    var huelle = document.createElement('div');
    huelle.id = 'klasse-frage';
    var box = document.createElement('div');
    box.className = 'kf-box';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-labelledby', 'kf-titel');
    var h = document.createElement('h2');
    h.id = 'kf-titel';
    h.textContent = T.klasseFrageTitel || 'In welche Klasse gehen Sie?';
    var p = document.createElement('p');
    p.textContent = T.klasseFrageText || 'Dann erscheinen Ihre Punkte in der Highscore-Liste Ihrer Klasse.';
    box.appendChild(h);
    box.appendChild(p);
    k.forEach(function (klasse) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'kf-klasse';
      b.textContent = klasse.name;
      b.addEventListener('click', function () {
        schreiben('lernkarten:klasse', klasse.kennung);
        location.reload();
      });
      box.appendChild(b);
    });
    var ohne = document.createElement('button');
    ohne.type = 'button';
    ohne.className = 'kf-ohne';
    ohne.textContent = T.klasseFrageOhne || 'Ohne Klasse weiter';
    ohne.addEventListener('click', function () {
      schreiben(KLASSE_GEFRAGT, true);
      if (huelle.parentNode) huelle.parentNode.removeChild(huelle);
      frageOffen = false;
      var w = aufgeschoben;
      aufgeschoben = [];
      w.forEach(function (a) { jetztZaehlen(a[0], a[1]); });
    });
    box.appendChild(ohne);
    huelle.appendChild(box);
    // Tasten (Pfeile, Leertaste, Escape) nicht an die Seite darunter weitergeben
    huelle.addEventListener('keydown', function (e) { e.stopPropagation(); });
    document.body.appendChild(huelle);
    // Fokus aufs Fenster selbst (für Bildschirmleser) – kein Klassenknopf soll vorausgewählt wirken
    box.tabIndex = -1;
    box.focus({ preventScroll: true });
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
    challengeAn: challengeAn,
    vorschau: function () { return VORSCHAU; },
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
    geraeteId: geraeteId,
    nutzungZaehlen: nutzungZaehlen,
    ereignisZaehlen: ereignisZaehlen,
    klasseErfragen: klasseErfragen
  };
})();
