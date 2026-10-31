/* Nutzungsübersicht für die Lehrkraft – immer nur für EINE Klasse (…/nutzung.html?k=3bfp2-1),
 * damit sich die Klassen nicht untereinander vergleichen. Liest die anonymen Tageszahlen aus der
 * Google-Tabelle (Blätter „Nutzung (anonym)“ und „Ereignisse (anonym)“).
 * Das Diagramm ist schlichtes SVG – keine fremden Bibliotheken, nichts wird nachgeladen. */
(function () {
  'use strict';

  var E = window.EINSTELLUNGEN || {};
  var $ = function (id) { return document.getElementById(id); };

  // Dieser Rechner (Lehrkraft) zählt bei der Nutzungszählung nicht mit
  try { localStorage.setItem('lernkarten:nicht-zaehlen', 'true'); } catch (e) { /* egal */ }

  var SAETZE = E.listen || [];
  function satzBekannt(k) { return SAETZE.some(function (s) { return s.kennung === k; }); }

  /* ---------- Klasse aus der Adresse ---------- */
  var KLASSE = (function () {
    var k = new URLSearchParams(location.search).get('k');
    return (E.klassen || []).filter(function (x) { return x.kennung === k; })[0] || null;
  })();

  /* ---------- kleine Helfer ---------- */
  var zahl = function (n) { return Number(n || 0).toLocaleString('de-DE'); };
  var zwei = function (n) { return ('0' + n).slice(-2); };
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  // Tage als ganze Zahlen (Tage seit 1970, UTC) – so gibt es keine Probleme mit der Zeitumstellung
  function tagZahl(t) { var p = t.split('-'); return Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 864e5); }
  function tagText(n) { var d = new Date(n * 864e5); return d.getUTCFullYear() + '-' + zwei(d.getUTCMonth() + 1) + '-' + zwei(d.getUTCDate()); }
  function heute() { var d = new Date(); return d.getFullYear() + '-' + zwei(d.getMonth() + 1) + '-' + zwei(d.getDate()); }
  function tagKurz(t) { var p = t.split('-'); return p[2] + '.' + p[1] + '.'; }
  function tagLang(t) {
    return new Date(tagZahl(t) * 864e5).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
  }
  function tagMittel(t) {
    return new Date(tagZahl(t) * 864e5).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', timeZone: 'UTC' });
  }
  function meldung(text) {
    $('meldung').hidden = !text;
    $('meldung').textContent = text || '';
  }

  /* ---------- Ohne Klasse: zurück zur Siegerehrung ---------- */
  if (!KLASSE) {
    $('filter').hidden = true;
    $('aktualisieren').hidden = true;
    $('stand').textContent = '';
    meldung('Bitte zuerst über die Siegerehrung eine Klasse wählen.');
    var a = document.createElement('a');
    a.href = 'index.html';
    a.textContent = ' Zur Klassenwahl';
    $('meldung').appendChild(a);
    return;
  }
  $('klasse').textContent = 'Klasse ' + KLASSE.name;
  $('zurueck').href = 'index.html?k=' + encodeURIComponent(KLASSE.kennung);
  document.title = 'Nutzung der Lernkarten-App – ' + KLASSE.name;

  /* ---------- Filter (Zeitraum, Kartensatz) ---------- */
  var MERKEN = 'nutzung:filter';
  var f = { zeitraum: 'alle', satz: 'alle' };
  try {
    var g = JSON.parse(localStorage.getItem(MERKEN) || 'null');
    if (g && typeof g === 'object') ['zeitraum', 'satz'].forEach(function (k) { if (g[k]) f[k] = String(g[k]); });
  } catch (e) { /* egal */ }

  var satzWahl = $('f-satz');
  [['alle', 'Alle Kartensätze']].concat(SAETZE.map(function (s) { return [s.kennung, s.titel || s.kurz || s.kennung]; })).forEach(function (o) {
    var op = document.createElement('option');
    op.value = o[0];
    op.textContent = o[1];
    satzWahl.appendChild(op);
  });
  [['f-zeitraum', 'zeitraum'], ['f-satz', 'satz']].forEach(function (p) {
    var sel = $(p[0]);
    if (!Array.prototype.some.call(sel.options, function (o) { return o.value === f[p[1]]; })) f[p[1]] = 'alle';
    sel.value = f[p[1]];
    sel.addEventListener('change', function () {
      f[p[1]] = sel.value;
      try { localStorage.setItem(MERKEN, JSON.stringify(f)); } catch (e) { /* egal */ }
      zeichnen();
    });
  });

  /* ---------- Laden: nur Zeilen dieser Klasse behalten ---------- */
  var daten = null;
  function adresse() { return window.HIGHSCORE_TEST_ADRESSE || E.highscoreAdresse || ''; }
  function nurDieseKlasse(liste) {
    return (liste || []).filter(function (z) {
      return z && /^\d{4}-\d{2}-\d{2}$/.test(z[0]) && satzBekannt(z[1]) && z[2] === KLASSE.kennung;
    });
  }
  function laden() {
    var a = adresse();
    $('stand').textContent = 'Die Zahlen werden geladen …';
    if (!/^https?:\/\//.test(a)) { meldung('Die Highscore-Tabelle ist noch nicht eingerichtet.'); $('stand').textContent = ''; return; }
    var abbruch = typeof AbortController === 'function' ? new AbortController() : null;
    var zeit = setTimeout(function () { if (abbruch) abbruch.abort(); }, 25000);
    fetch(a + (a.indexOf('?') === -1 ? '?' : '&') + 'aktion=nutzung', { cache: 'no-store', signal: abbruch ? abbruch.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) {
        clearTimeout(zeit);
        if (!d || !d.ok || !Array.isArray(d.nutzung)) throw new Error((d && d.fehler) || 'keine Daten');
        daten = { nutzung: nurDieseKlasse(d.nutzung), ereignisse: nurDieseKlasse(d.ereignisse) };
        var jetzt = new Date();
        $('stand').textContent = 'Stand: ' + jetzt.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }) +
          ', ' + jetzt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
        meldung('');
        zeichnen();
      })
      .catch(function () {
        clearTimeout(zeit);
        $('stand').textContent = '';
        if (!daten) $('inhalt').hidden = true;
        meldung('Die Nutzungszahlen sind gerade nicht erreichbar. Bitte gleich noch einmal „Aktualisieren“ drücken.');
      });
  }
  $('aktualisieren').addEventListener('click', laden);

  /* ---------- Auswerten ---------- */
  function auswerten() {
    var ende = tagZahl(heute());
    var erster = ende;
    daten.nutzung.concat(daten.ereignisse).forEach(function (z) {
      var t = tagZahl(z[0]);
      if (t < erster) erster = t;
      if (t > ende) ende = t;
    });
    var start = f.zeitraum === 'alle' ? erster : ende - Number(f.zeitraum) + 1;
    var tage = [];
    for (var t = start; t <= ende; t++) tage.push(tagText(t));
    var index = {};
    tage.forEach(function (t, i) { index[t] = i; });
    function passt(z) { return index.hasOwnProperty(z[0]) && (f.satz === 'alle' || z[1] === f.satz); }

    var aufrufe = tage.map(function () { return 0; });
    var summe = { aufrufe: 0, karten: 0, begonnen: 0, beendet: 0, angeboten: 0, abgelehnt: 0, gespielt: 0 };
    daten.nutzung.forEach(function (z) {
      if (!passt(z)) return;
      aufrufe[index[z[0]]] += z[4];
      summe.aufrufe += z[4];
    });
    var art = {
      'Karten bewertet': 'karten', 'Challenge begonnen': 'begonnen', 'Challenge beendet': 'beendet',
      'Spielrunde angeboten': 'angeboten', 'Spielrunde abgelehnt': 'abgelehnt', 'Spielrunde gespielt': 'gespielt'
    };
    daten.ereignisse.forEach(function (z) {
      if (passt(z) && art.hasOwnProperty(z[3])) summe[art[z[3]]] += z[4];
    });
    return {
      tage: tage, aufrufe: aufrufe, summe: summe,
      tageMitNutzung: aufrufe.filter(function (v) { return v > 0; }).length
    };
  }

  /* ---------- Kennzahlen ---------- */
  function kachel(titel, wert, zusatz) {
    return '<div class="kachel"><div class="titel">' + esc(titel) + '</div><div class="wert">' + esc(wert) + '</div>' +
      (zusatz ? '<div class="zusatz">' + esc(zusatz) + '</div>' : '') + '</div>';
  }
  function kennzahlen(a) {
    var s = a.summe;
    $('kennzahlen').innerHTML =
      kachel('Aufrufe', zahl(s.aufrufe), 'an ' + zahl(a.tageMitNutzung) + ' von ' + zahl(a.tage.length) + ' Tagen genutzt') +
      kachel('Lernkarten bewertet', zahl(s.karten), '') +
      kachel('Klausur-Challenges beendet', zahl(s.beendet), 'von ' + zahl(s.begonnen) + ' begonnenen') +
      kachel('Spielrunden gespielt', zahl(s.gespielt), zahl(s.angeboten) + ' angeboten · ' + zahl(s.abgelehnt) + ' abgelehnt');
  }

  /* ---------- Tooltip ---------- */
  var tip = $('tooltip');
  function tipZeigen(html, x, y) {
    tip.innerHTML = html;
    tip.hidden = false;
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var l = x + 14, o = y + 14;
    if (l + w > window.innerWidth - 8) l = x - w - 14;
    if (o + h > window.innerHeight - 8) o = y - h - 14;
    tip.style.left = Math.max(8, l) + 'px';
    tip.style.top = Math.max(8, o) + 'px';
  }
  function tipWeg() { tip.hidden = true; }

  /* ---------- Säulendiagramm: eine Säule je Tag ---------- */
  function achse(max) {
    if (!(max > 0)) return { max: 4, ticks: [0, 1, 2, 3, 4] };
    var roh = max / 4;
    var p = Math.pow(10, Math.floor(Math.log(roh) / Math.LN10));
    var schritt = [1, 2, 2.5, 5, 10].map(function (x) { return x * p; }).filter(function (s) { return s >= roh; })[0];
    schritt = Math.max(1, Math.round(schritt));
    var oben = Math.ceil(max / schritt) * schritt;
    var ticks = [];
    for (var v = 0; v <= oben + 1e-9; v += schritt) ticks.push(v);
    return { max: oben, ticks: ticks };
  }
  // Säule mit 4px gerundetem oberen Ende, Basis eckig
  function saeulePfad(x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h));
    return 'M' + x + ',' + (y + h) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y +
      'H' + (x + w - r) + 'Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) + 'V' + (y + h) + 'Z';
  }
  var r1 = function (n) { return Math.round(n * 10) / 10; };

  function saeulen(box, tage, werte) {
    var n = tage.length;
    var max = Math.max.apply(null, werte.concat([0]));
    if (!n || max === 0) { box.innerHTML = '<p class="leer-hinweis">Keine Aufrufe im gewählten Zeitraum.</p>'; return; }
    var B = Math.max(300, box.clientWidth || 800), H = 300;
    var ax = achse(max);
    var rl = Math.max(28, String(zahl(ax.max)).length * 7.5 + 12), rr = 6, ro = 22, ru = 26;
    var pw = B - rl - rr, ph = H - ro - ru;
    var band = pw / n;
    var bw = Math.min(28, band * 0.62);
    if (band - bw < 2) bw = Math.max(1, band - 2); // 2px Fläche zwischen Nachbarsäulen
    var y = function (v) { return ro + ph - (v / ax.max) * ph; };
    var s = '<svg viewBox="0 0 ' + B + ' ' + H + '" width="' + B + '" height="' + H + '" tabindex="0" role="img" aria-label="Aufrufe pro Tag">';
    ax.ticks.forEach(function (t) {
      var yy = r1(y(t)) + .5;
      s += '<line x1="' + rl + '" x2="' + (B - rr) + '" y1="' + yy + '" y2="' + yy + '" stroke="' + (t === 0 ? 'var(--achse)' : 'var(--gitter)') + '" stroke-width="1"/>';
      s += '<text x="' + (rl - 8) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="12" fill="var(--text-3)">' + zahl(t) + '</text>';
    });
    s += '<rect class="markierung" x="0" y="' + ro + '" width="' + r1(band) + '" height="' + ph + '" fill="var(--markiert)" visibility="hidden" rx="4"/>';
    var spitze = 0;
    werte.forEach(function (v, i) { if (v > werte[spitze]) spitze = i; });
    werte.forEach(function (v, i) {
      if (!(v > 0)) return;
      var h = Math.max(1, y(0) - y(v));
      s += '<path d="' + saeulePfad(r1(rl + i * band + (band - bw) / 2), r1(y(0) - h), r1(bw), r1(h), 4) + '" fill="var(--s1)"/>';
    });
    // eine einzige Direktbeschriftung: der stärkste Tag
    s += '<text x="' + r1(rl + spitze * band + band / 2) + '" y="' + r1(y(werte[spitze]) - 6) + '" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-2)">' + zahl(werte[spitze]) + '</text>';
    // Datumsbeschriftung: so viele, wie ohne Überlappung passen (der letzte Tag immer)
    var lang = band >= 70;
    var jede = Math.max(1, Math.ceil((lang ? 70 : 46) / band));
    for (var j = n - 1; j >= 0; j -= jede) {
      s += '<text x="' + r1(rl + j * band + band / 2) + '" y="' + (H - 7) + '" text-anchor="middle" font-size="12" fill="var(--text-3)">' +
        esc(lang ? tagMittel(tage[j]) : tagKurz(tage[j])) + '</text>';
    }
    // Trefferflächen: ganze Spalte je Tag (größer als die Säule)
    for (var m = 0; m < n; m++) {
      s += '<rect data-i="' + m + '" x="' + r1(rl + m * band) + '" y="' + ro + '" width="' + r1(band + .5) + '" height="' + ph + '" fill="transparent"/>';
    }
    box.innerHTML = s + '</svg>';

    var svg = box.firstChild;
    var mark = svg.querySelector('.markierung');
    var aktiv = -1;
    function inhalt(i) {
      return '<div class="tt-titel">' + esc(tagLang(tage[i])) + '</div><div class="tt-zeile"><span>Aufrufe</span><span class="wert">' + zahl(werte[i]) + '</span></div>';
    }
    function markieren(i) {
      aktiv = i;
      mark.setAttribute('x', r1(rl + i * band));
      mark.setAttribute('visibility', 'visible');
    }
    function loesen() { mark.setAttribute('visibility', 'hidden'); tipWeg(); }
    svg.addEventListener('mousemove', function (e) {
      var z = e.target.closest ? e.target.closest('[data-i]') : null;
      if (!z) { loesen(); return; }
      var i = Number(z.getAttribute('data-i'));
      markieren(i);
      tipZeigen(inhalt(i), e.clientX, e.clientY);
    });
    svg.addEventListener('mouseleave', loesen);
    svg.addEventListener('blur', loesen);
    function perTaste(i) {
      markieren(i);
      var r = svg.querySelector('[data-i="' + i + '"]').getBoundingClientRect();
      tipZeigen(inhalt(i), r.left + r.width / 2, r.top + 20);
    }
    svg.addEventListener('focus', function () { perTaste(aktiv >= 0 ? aktiv : spitze); });
    svg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        var i = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : Math.max(0, Math.min(n - 1, (aktiv < 0 ? spitze : aktiv) + (e.key === 'ArrowLeft' ? -1 : 1)));
        perTaste(i);
      } else if (e.key === 'Escape') loesen();
    });
  }

  /* ---------- Tabellenansicht ---------- */
  var alsTabelle = false;
  var tabKnopf = document.querySelector('[data-tabelle="aufrufe"]');
  tabKnopf.addEventListener('click', function () { alsTabelle = !alsTabelle; ansicht(); });
  function ansicht() {
    $('d-aufrufe').hidden = alsTabelle;
    $('tab-aufrufe').hidden = !alsTabelle;
    tabKnopf.textContent = alsTabelle ? 'Als Diagramm' : 'Als Tabelle';
  }
  function tabelle(a) {
    var h = '<table><thead><tr><th scope="col">Tag</th><th scope="col">Aufrufe</th></tr></thead><tbody>';
    for (var i = a.tage.length - 1; i >= 0; i--) {
      h += '<tr><th scope="row">' + esc(tagMittel(a.tage[i])) + '</th><td>' + zahl(a.aufrufe[i]) + '</td></tr>';
    }
    return h + '</tbody><tfoot><tr><td>Summe</td><td>' + zahl(a.summe.aufrufe) + '</td></tr></tfoot></table>';
  }

  /* ---------- Alles zeichnen ---------- */
  function zeichnen() {
    if (!daten) return;
    tipWeg();
    $('inhalt').hidden = false;
    ansicht();
    var a = auswerten();
    kennzahlen(a);
    saeulen($('d-aufrufe'), a.tage, a.aufrufe);
    $('tab-aufrufe').innerHTML = tabelle(a);
  }

  var warte = null;
  window.addEventListener('resize', function () { clearTimeout(warte); warte = setTimeout(zeichnen, 150); });

  laden();
})();
