/* Siegerehrung für den Beamer: Klasse und Highscore-Liste wählen, dann das Siegertreppchen.
 * Nirgends in der App verlinkt – nur die Lehrkraft kennt die Adresse.
 * Daten: dieselbe Google-Tabelle wie die Highscore-Listen (nur lesen). */
(function () {
  'use strict';

  var E = window.EINSTELLUNGEN || {};
  var T = E.texte || {};
  var $ = function (id) { return document.getElementById(id); };

  // Dieser Rechner (Lehrkraft) zählt bei der anonymen Nutzungszählung nicht mit
  // und wird in den Lernkarten nicht nach einer Klasse gefragt
  try { localStorage.setItem('lernkarten:nicht-zaehlen', 'true'); } catch (e) { /* egal */ }

  function adresse() { return window.HIGHSCORE_TEST_ADRESSE || E.highscoreAdresse || ''; }

  /* ---------- Welche Listen gibt es? ---------- */
  // Je Kartensatz eine Klausur-Challenge; das Spiel „Diabetes Run!“ fasst alle Kartensätze zusammen
  var LISTEN = (E.listen || []).map(function (l) {
    var teile = String(l.titel || l.kennung).split(' – ');
    return {
      id: l.kennung + '-challenge',
      symbol: '🏁',
      titel: (T.challengeTitel || 'Klausur-Challenge') + ' ' + teile[0],
      untertitel: teile.slice(1).join(' – '),
      quellen: [l.kennung + '-challenge'],
      einheit: 'Punkte'
    };
  });
  LISTEN.push({
    id: 'diabetes-run',
    symbol: '🎮',
    titel: 'Minispiel Diabetes Run!',
    untertitel: (E.listen || []).length > 1 ? 'alle Kartensätze zusammen' : '',
    quellen: (E.listen || []).map(function (l) { return l.kennung; }),
    einheit: 'Punkte'
  });
  var KLASSEN = E.klassen || [];

  /* ---------- Pokal (SVG, sieht auf jedem Rechner gleich aus) ---------- */
  function pokalSvg(klasse) {
    return '<svg class="' + (klasse || 'pokal') + '" viewBox="0 0 64 64" role="img" aria-label="Pokal">' +
      '<defs><linearGradient id="gold-' + (klasse || 'p') + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#FFE38A"/><stop offset=".55" stop-color="#F2B600"/><stop offset="1" stop-color="#B98200"/></linearGradient></defs>' +
      '<path d="M18 8h28v10c0 9-6 16-14 16S18 27 18 18z" fill="url(#gold-' + (klasse || 'p') + ')"/>' +
      '<path d="M18 12H9c0 8 5 13 11 13M46 12h9c0 8-5 13-11 13" fill="none" stroke="#F2B600" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="29" y="33" width="6" height="11" fill="#D99A00"/>' +
      '<path d="M21 44h22l3 8H18z" fill="url(#gold-' + (klasse || 'p') + ')"/>' +
      '<rect x="15" y="52" width="34" height="5" rx="1.5" fill="#B98200"/>' +
      '<path d="M26 13c-1 6 1 11 4 14" fill="none" stroke="#FFF6D0" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>' +
      '</svg>';
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-pokal]'), function (el) { el.innerHTML = pokalSvg('pokal-kopf'); });

  /* ---------- Auswahl ---------- */
  var MERKEN = 'siegerehrung:auswahl';
  var wahl = { klasse: null, liste: null };
  try {
    var g = JSON.parse(localStorage.getItem(MERKEN) || 'null');
    if (g && typeof g === 'object') wahl = { klasse: g.klasse || null, liste: g.liste || null };
  } catch (e) { /* egal */ }

  function klasseFinden(k) { return KLASSEN.filter(function (x) { return x.kennung === k; })[0] || null; }
  function listeFinden(l) { return LISTEN.filter(function (x) { return x.id === l; })[0] || null; }

  function wahlKnopf(text, unter, aktiv, fn, symbol) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', aktiv ? 'true' : 'false');
    if (symbol) { var s = document.createElement('span'); s.className = 'symbol'; s.textContent = symbol; b.appendChild(s); }
    var t = document.createElement('span'); t.className = 'titel'; t.textContent = text; b.appendChild(t);
    if (unter) { var u = document.createElement('span'); u.className = 'unter'; u.textContent = unter; b.appendChild(u); }
    b.addEventListener('click', fn);
    return b;
  }

  function auswahlZeigen() {
    var kl = $('wahl-klasse');
    kl.textContent = '';
    KLASSEN.forEach(function (k) {
      kl.appendChild(wahlKnopf(k.name, '', wahl.klasse === k.kennung, function () { wahl.klasse = k.kennung; auswahlZeigen(); }));
    });
    var li = $('wahl-liste');
    li.textContent = '';
    LISTEN.forEach(function (l) {
      li.appendChild(wahlKnopf(l.titel, l.untertitel, wahl.liste === l.id, function () { wahl.liste = l.id; auswahlZeigen(); }, l.symbol));
    });
    $('los').disabled = !(klasseFinden(wahl.klasse) && listeFinden(wahl.liste));
    $('buehne').hidden = true;
    $('auswahl').hidden = false;
    document.title = 'Siegerehrung – Lernkarten';
  }

  $('los').addEventListener('click', function () {
    if ($('los').disabled) return;
    try { localStorage.setItem(MERKEN, JSON.stringify(wahl)); } catch (e) { /* egal */ }
    try { history.replaceState(null, '', '?k=' + encodeURIComponent(wahl.klasse) + '&l=' + encodeURIComponent(wahl.liste)); } catch (e) { /* egal */ }
    buehneZeigen();
  });

  /* ---------- Daten laden ---------- */
  function holen(url) {
    var abbruch = typeof AbortController === 'function' ? new AbortController() : null;
    var zeit = setTimeout(function () { if (abbruch) abbruch.abort(); }, 20000);
    return fetch(url, { cache: 'no-store', signal: abbruch ? abbruch.signal : undefined }).then(function (r) {
      clearTimeout(zeit);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }, function (e) { clearTimeout(zeit); throw e; });
  }

  // alle Quellen der gewählten Liste laden und je Name die beste Punktzahl nehmen
  function rangliste(liste, klasse) {
    var a = adresse();
    if (!/^https?:\/\//.test(a)) return Promise.reject(new Error('keine Adresse'));
    return Promise.all(liste.quellen.map(function (q) {
      var kennung = q + '-' + klasse.kennung;
      return holen(a + (a.indexOf('?') === -1 ? '?' : '&') + 'aktion=liste&liste=' + encodeURIComponent(kennung)).then(function (d) {
        if (!d || !d.ok) throw new Error((d && d.fehler) || 'Liste nicht lesbar');
        return d.eintraege || [];
      });
    })).then(function (alle) {
      var beste = {};
      var reihenfolge = [];
      alle.forEach(function (eintraege) {
        eintraege.forEach(function (e) {
          var k = String(e.name).toLowerCase();
          if (!beste[k]) { beste[k] = { name: e.name, punkte: Number(e.punkte) || 0 }; reihenfolge.push(k); }
          else if ((Number(e.punkte) || 0) > beste[k].punkte) beste[k].punkte = Number(e.punkte) || 0;
        });
      });
      return reihenfolge.map(function (k, i) { return { name: beste[k].name, punkte: beste[k].punkte, i: i }; })
        .sort(function (x, y) { return y.punkte - x.punkte || x.i - y.i; });
    });
  }

  /* ---------- Siegerehrung ---------- */
  var zahl = function (n) { return Number(n).toLocaleString('de-DE'); };
  var weniger = function () { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; };
  var zeitgeber = [];
  var letzteDaten = null;

  function standText(d) {
    return 'Stand: ' + d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ', ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
  }

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function platzBauen(nr, eintrag, einheit) {
    var p = el('div', 'platz platz-' + nr + (eintrag ? '' : ' unbesetzt'));
    p.setAttribute('data-platz', nr);
    var s = el('div', 'sieger');
    if (eintrag) {
      var zeile = el('div', 'name-zeile');
      if (nr === 1) {
        var pk = el('span', 'pokal-neben');
        pk.innerHTML = pokalSvg('pokal-sieger');
        zeile.appendChild(pk);
      }
      zeile.appendChild(el('span', 'name', eintrag.name));
      s.appendChild(zeile);
      s.appendChild(el('span', 'punkte', zahl(eintrag.punkte) + ' ' + einheit));
    } else {
      s.appendChild(el('span', 'name frei', '—'));
    }
    p.appendChild(s);
    var b = el('div', 'block');
    b.appendChild(el('span', 'nr', String(nr)));
    p.appendChild(b);
    return p;
  }

  function konfetti() {
    var k = $('konfetti');
    k.textContent = '';
    if (weniger()) return;
    var farben = ['#F2B600', '#FFE38A', '#8CC4CC', '#FFFFFF', '#E26D5A', '#6FD39A'];
    for (var i = 0; i < 120; i++) {
      var s = document.createElement('span');
      s.style.left = (Math.random() * 100) + '%';
      s.style.background = farben[i % farben.length];
      s.style.animationDelay = (Math.random() * 1.6) + 's';
      s.style.animationDuration = (2.8 + Math.random() * 2.2) + 's';
      s.style.transform = 'rotate(' + Math.round(Math.random() * 360) + 'deg)';
      k.appendChild(s);
    }
  }

  // Ablauf: weitere Plätze → Platz 3 → Platz 2 → Platz 1 mit Pokal und Konfetti
  function inszenieren() {
    zeitgeber.forEach(clearTimeout);
    zeitgeber = [];
    var buehne = $('buehne');
    buehne.classList.remove('zeige-weitere', 'zeige-3', 'zeige-2', 'zeige-1');
    $('konfetti').textContent = '';
    void buehne.offsetWidth; // Animation neu starten
    if (weniger()) { buehne.classList.add('zeige-weitere', 'zeige-3', 'zeige-2', 'zeige-1'); return; }
    [['zeige-weitere', 200], ['zeige-3', 900], ['zeige-2', 2100], ['zeige-1', 3500]].forEach(function (s) {
      zeitgeber.push(setTimeout(function () {
        buehne.classList.add(s[0]);
        if (s[0] === 'zeige-1' && letzteDaten && letzteDaten.length) zeitgeber.push(setTimeout(konfetti, 650));
      }, s[1]));
    });
  }

  function anzeigen(daten, liste) {
    letzteDaten = daten;
    var podest = $('podest');
    podest.textContent = '';
    var leer = !daten.length;
    $('leer').hidden = !leer;
    $('leer').textContent = leer ? 'Noch keine Einträge in dieser Liste – wer holt sich als Erstes den Pokal?' : '';
    podest.hidden = leer;
    if (!leer) {
      // Reihenfolge auf der Bühne: 2 – 1 – 3
      podest.appendChild(platzBauen(2, daten[1], liste.einheit));
      podest.appendChild(platzBauen(1, daten[0], liste.einheit));
      podest.appendChild(platzBauen(3, daten[2], liste.einheit));
    }
    var w = $('weitere');
    w.textContent = '';
    var rest = daten.slice(3, 12);
    w.hidden = !rest.length;
    rest.forEach(function (e, i) {
      var z = el('div', 'weiterer');
      z.appendChild(el('span', 'rang', (i + 4) + '.'));
      z.appendChild(el('span', 'name', e.name));
      z.appendChild(el('span', 'punkte', zahl(e.punkte)));
      w.appendChild(z);
    });
    if (daten.length > 12) w.appendChild(el('div', 'weiterer mehr', '… und ' + (daten.length - 12) + ' weitere'));
    $('stand').textContent = standText(new Date());
    inszenieren();
  }

  function buehneZeigen() {
    var klasse = klasseFinden(wahl.klasse);
    var liste = listeFinden(wahl.liste);
    if (!klasse || !liste) { auswahlZeigen(); return; }
    $('auswahl').hidden = true;
    $('buehne').hidden = false;
    $('buehne-art').textContent = liste.symbol + ' ' + liste.titel + (liste.untertitel ? ' · ' + liste.untertitel : '');
    $('buehne-titel').textContent = 'Klasse ' + klasse.name;
    document.title = 'Siegerehrung ' + klasse.name + ' – ' + liste.titel;
    $('podest').textContent = '';
    $('weitere').textContent = '';
    $('leer').hidden = false;
    $('leer').textContent = 'Die Highscores werden geladen …';
    $('stand').textContent = '';
    rangliste(liste, klasse).then(function (d) { anzeigen(d, liste); }, function () {
      $('leer').hidden = false;
      $('leer').textContent = 'Die Highscore-Liste ist gerade nicht erreichbar. Bitte gleich noch einmal „Aktualisieren“ drücken.';
    });
  }

  /* ---------- Steuerung ---------- */
  function vollbild() {
    var d = document;
    try {
      if (d.fullscreenElement) d.exitFullscreen();
      else if (d.documentElement.requestFullscreen) d.documentElement.requestFullscreen();
    } catch (e) { /* egal */ }
  }
  function zurAuswahl() {
    zeitgeber.forEach(clearTimeout);
    try { history.replaceState(null, '', location.pathname); } catch (e) { /* egal */ }
    auswahlZeigen();
  }
  $('zurueck').addEventListener('click', zurAuswahl);
  $('nochmal').addEventListener('click', function () { if (letzteDaten) inszenieren(); });
  $('aktualisieren').addEventListener('click', buehneZeigen);
  $('vollbild').addEventListener('click', vollbild);
  document.addEventListener('keydown', function (e) {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    var k = e.key.toLowerCase();
    if (k === 'f') { e.preventDefault(); vollbild(); }
    else if ($('buehne').hidden) return;
    else if (k === 'r' || k === ' ') { e.preventDefault(); if (letzteDaten) inszenieren(); }
    else if (k === 'a') { e.preventDefault(); buehneZeigen(); }
    else if (k === 'backspace') { e.preventDefault(); zurAuswahl(); }
  });

  // Steuerknöpfe nach 3 Sekunden ohne Mausbewegung ausblenden (nicht im Bild auf dem Beamer)
  var ruhe = null;
  function regung() {
    document.body.classList.remove('ruhig');
    clearTimeout(ruhe);
    ruhe = setTimeout(function () { document.body.classList.add('ruhig'); }, 3000);
  }
  document.addEventListener('mousemove', regung);
  document.addEventListener('keydown', regung);
  regung();

  /* ---------- Start: direkt zur Bühne, wenn die Adresse Klasse und Liste enthält ---------- */
  (function () {
    var p = new URLSearchParams(location.search);
    if (klasseFinden(p.get('k')) && listeFinden(p.get('l'))) {
      wahl = { klasse: p.get('k'), liste: p.get('l') };
      buehneZeigen();
    } else {
      auswahlZeigen();
    }
  })();

  window.Siegerehrung = { listen: LISTEN, rangliste: rangliste };
})();
