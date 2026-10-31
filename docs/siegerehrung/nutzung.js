/* Nutzungsübersicht für die Lehrkraft: liest die anonymen Tageszahlen aus der Google-Tabelle
 * (Blätter „Nutzung (anonym)“ und „Ereignisse (anonym)“) und zeigt sie als Diagramme.
 * Diagramme sind schlichtes SVG – keine fremden Bibliotheken, nichts wird nachgeladen. */
(function () {
  'use strict';

  var E = window.EINSTELLUNGEN || {};
  var $ = function (id) { return document.getElementById(id); };

  // Dieser Rechner (Lehrkraft) zählt bei der Nutzungszählung nicht mit
  try { localStorage.setItem('lernkarten:nicht-zaehlen', 'true'); } catch (e) { /* egal */ }

  // Reihenfolge = feste Farbe je Bereich (Farbe folgt dem Bereich, nie dem Rang)
  var BEREICHE = [
    { text: 'Lernkarten', farbe: 'var(--s1)' },
    { text: 'Klausur-Challenge', farbe: 'var(--s2)' },
    { text: 'Diabetes Run!', farbe: 'var(--s3)' }
  ];
  var SAETZE = E.listen || [];
  var OHNE = 'ohne Klasse';
  var KLASSEN = (E.klassen || []).concat([{ kennung: OHNE, name: 'Ohne Klasse' }]);

  function satzBekannt(k) { return SAETZE.some(function (s) { return s.kennung === k; }); }
  function klassenName(k) {
    var x = KLASSEN.filter(function (y) { return y.kennung === k; })[0];
    return x ? x.name : k;
  }

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

  /* ---------- Filter ---------- */
  var MERKEN = 'nutzung:filter';
  var f = { zeitraum: 'alle', klasse: 'alle', satz: 'alle' };
  try {
    var g = JSON.parse(localStorage.getItem(MERKEN) || 'null');
    if (g && typeof g === 'object') ['zeitraum', 'klasse', 'satz'].forEach(function (k) { if (g[k]) f[k] = String(g[k]); });
  } catch (e) { /* egal */ }

  function optionen(sel, liste) {
    sel.textContent = '';
    liste.forEach(function (o) {
      var op = document.createElement('option');
      op.value = o[0];
      op.textContent = o[1];
      sel.appendChild(op);
    });
  }
  optionen($('f-klasse'), [['alle', 'Alle Klassen']].concat(KLASSEN.map(function (k) { return [k.kennung, k.name]; })));
  optionen($('f-satz'), [['alle', 'Alle Kartensätze']].concat(SAETZE.map(function (s) { return [s.kennung, s.titel || s.kurz || s.kennung]; })));
  [['f-zeitraum', 'zeitraum'], ['f-klasse', 'klasse'], ['f-satz', 'satz']].forEach(function (p) {
    var sel = $(p[0]);
    if (!Array.prototype.some.call(sel.options, function (o) { return o.value === f[p[1]]; })) f[p[1]] = 'alle';
    sel.value = f[p[1]];
    sel.addEventListener('change', function () {
      f[p[1]] = sel.value;
      try { localStorage.setItem(MERKEN, JSON.stringify(f)); } catch (e) { /* egal */ }
      zeichnen();
    });
  });

  /* ---------- Laden ---------- */
  var daten = null;
  function adresse() { return window.HIGHSCORE_TEST_ADRESSE || E.highscoreAdresse || ''; }
  function meldung(text) {
    $('meldung').hidden = !text;
    $('meldung').textContent = text || '';
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
        daten = {
          nutzung: d.nutzung.filter(function (z) { return z && /^\d{4}-\d{2}-\d{2}$/.test(z[0]) && satzBekannt(z[1]); }),
          ereignisse: (d.ereignisse || []).filter(function (z) { return z && /^\d{4}-\d{2}-\d{2}$/.test(z[0]) && satzBekannt(z[1]); })
        };
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
    var alle = daten.nutzung.concat(daten.ereignisse);
    var ende = tagZahl(heute());
    var erster = ende;
    alle.forEach(function (z) { var t = tagZahl(z[0]); if (t < erster) erster = t; if (t > ende) ende = t; });
    var start = f.zeitraum === 'alle' ? erster : ende - Number(f.zeitraum) + 1;
    var tage = [];
    for (var t = start; t <= ende; t++) tage.push(tagText(t));
    var index = {};
    tage.forEach(function (t, i) { index[t] = i; });

    function imZeitraum(z) { return index.hasOwnProperty(z[0]); }
    function passtSatz(z) { return f.satz === 'alle' || z[1] === f.satz; }
    function passtKlasse(z) { return f.klasse === 'alle' || z[2] === f.klasse; }

    var aufrufe = BEREICHE.map(function () { return tage.map(function () { return 0; }); });
    var karten = tage.map(function () { return 0; });
    var summe = { aufrufe: 0, karten: 0, begonnen: 0, beendet: 0, angeboten: 0, abgelehnt: 0, gespielt: 0 };
    var klassen = {}; // kennung → { bereiche:[..], karten, beendet, gespielt }
    KLASSEN.forEach(function (k) { klassen[k.kennung] = { bereiche: [0, 0, 0], karten: 0, beendet: 0, gespielt: 0 }; });
    function klasse(k) { return klassen[k] || (klassen[k] = { bereiche: [0, 0, 0], karten: 0, beendet: 0, gespielt: 0 }); }

    daten.nutzung.forEach(function (z) {
      if (!imZeitraum(z) || !passtSatz(z)) return;
      var b = -1;
      BEREICHE.forEach(function (x, i) { if (x.text === z[3]) b = i; });
      if (b < 0) return;
      klasse(z[2]).bereiche[b] += z[4];
      if (!passtKlasse(z)) return;
      aufrufe[b][index[z[0]]] += z[4];
      summe.aufrufe += z[4];
    });

    var ereignisStart = null;
    daten.ereignisse.forEach(function (z) {
      if (ereignisStart === null || z[0] < ereignisStart) ereignisStart = z[0];
      if (!imZeitraum(z) || !passtSatz(z)) return;
      var k = klasse(z[2]);
      var mit = passtKlasse(z);
      switch (z[3]) {
        case 'Karten bewertet': k.karten += z[4]; if (mit) { karten[index[z[0]]] += z[4]; summe.karten += z[4]; } break;
        case 'Challenge begonnen': if (mit) summe.begonnen += z[4]; break;
        case 'Challenge beendet': k.beendet += z[4]; if (mit) summe.beendet += z[4]; break;
        case 'Spielrunde angeboten': if (mit) summe.angeboten += z[4]; break;
        case 'Spielrunde abgelehnt': if (mit) summe.abgelehnt += z[4]; break;
        case 'Spielrunde gespielt': k.gespielt += z[4]; if (mit) summe.gespielt += z[4]; break;
      }
    });

    var tageMitNutzung = tage.filter(function (t, i) { return aufrufe.some(function (s) { return s[i] > 0; }); }).length;
    // Karten werden erst seit Beginn der Ereigniszählung gezählt – davor keine (falschen) Nullen zeigen
    var kartenAb = ereignisStart && index.hasOwnProperty(ereignisStart) ? index[ereignisStart] : (ereignisStart && ereignisStart < tage[0] ? 0 : tage.length);
    return {
      tage: tage, aufrufe: aufrufe, karten: karten, summe: summe, klassen: klassen,
      tageMitNutzung: tageMitNutzung, ereignisStart: ereignisStart, kartenAb: kartenAb
    };
  }

  /* ---------- Kennzahlen ---------- */
  function kachel(titel, wert, zusatz) {
    return '<div class="kachel"><div class="titel">' + esc(titel) + '</div><div class="wert">' + esc(wert) +
      '</div><div class="zusatz">' + esc(zusatz) + '</div></div>';
  }
  function kennzahlen(a) {
    var s = a.summe;
    var seit = a.ereignisStart && a.ereignisStart > a.tage[0] ? 'gezählt seit ' + tagMittel(a.ereignisStart) : 'im gewählten Zeitraum';
    $('kennzahlen').innerHTML =
      kachel('Aufrufe', zahl(s.aufrufe), 'an ' + zahl(a.tageMitNutzung) + ' von ' + zahl(a.tage.length) + ' Tagen genutzt') +
      kachel('Lernkarten bewertet', zahl(s.karten), a.ereignisStart ? seit : 'wird ab jetzt gezählt') +
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
  function tipZeilen(titel, zeilen, summe) {
    var h = '<div class="tt-titel">' + esc(titel) + '</div>';
    zeilen.forEach(function (z) {
      h += '<div class="tt-zeile">' + (z.farbe ? '<span class="farbe" style="background:' + z.farbe + '"></span>' : '') +
        '<span>' + esc(z.name) + '</span><span class="wert">' + zahl(z.wert) + '</span></div>';
    });
    if (summe !== undefined) h += '<div class="tt-zeile tt-summe"><span>Zusammen</span><span class="wert">' + zahl(summe) + '</span></div>';
    return h;
  }

  /* ---------- Achse ---------- */
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

  // Pfad eines Balkens mit 4px gerundetem Datenende (oben bzw. rechts), Basis eckig
  function balkenOben(x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h));
    return 'M' + x + ',' + (y + h) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y +
      'H' + (x + w - r) + 'Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) + 'V' + (y + h) + 'Z';
  }
  function balkenRechts(x, y, w, h, r) {
    r = Math.max(0, Math.min(r, h / 2, w));
    return 'M' + x + ',' + y + 'H' + (x + w - r) + 'Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) +
      'V' + (y + h - r) + 'Q' + (x + w) + ',' + (y + h) + ' ' + (x + w - r) + ',' + (y + h) + 'H' + x + 'Z';
  }
  var r1 = function (n) { return Math.round(n * 10) / 10; };

  /* ---------- Säulendiagramm (gestapelt), ein Tag = eine Säule ---------- */
  function saeulen(box, o) {
    var n = o.tage.length;
    var summen = o.tage.map(function (_, i) { return o.serien.reduce(function (s, se) { return s + se.werte[i]; }, 0); });
    var max = Math.max.apply(null, summen.concat([0]));
    if (!n || max === 0) { box.innerHTML = '<p class="leer-hinweis">' + esc(o.leer) + '</p>'; return; }
    var B = Math.max(300, box.clientWidth || 800), H = o.hoehe || 280;
    var ax = achse(max);
    var rl = Math.max(28, String(zahl(ax.max)).length * 7.5 + 12), rr = 6, ro = 22, ru = 26;
    var pw = B - rl - rr, ph = H - ro - ru;
    var band = pw / n;
    var bw = Math.min(28, band * 0.62);
    if (band - bw < 2) bw = Math.max(1, band - 2); // 2px Fläche zwischen Nachbarsäulen
    var y = function (v) { return ro + ph - (v / ax.max) * ph; };
    var s = '<svg viewBox="0 0 ' + B + ' ' + H + '" width="' + B + '" height="' + H + '" tabindex="0" role="img" aria-label="' + esc(o.titel) + '">';
    ax.ticks.forEach(function (t) {
      var yy = r1(y(t)) + .5;
      s += '<line x1="' + rl + '" x2="' + (B - rr) + '" y1="' + yy + '" y2="' + yy + '" stroke="' + (t === 0 ? 'var(--achse)' : 'var(--gitter)') + '" stroke-width="1"/>';
      s += '<text x="' + (rl - 8) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="12" fill="var(--text-3)">' + zahl(t) + '</text>';
    });
    s += '<rect class="markierung" x="0" y="' + ro + '" width="' + r1(band) + '" height="' + ph + '" fill="var(--markiert)" visibility="hidden" rx="4"/>';
    var spitze = -1;
    summen.forEach(function (v, i) { if (spitze < 0 || v > summen[spitze]) spitze = i; });
    for (var i = 0; i < n; i++) {
      var x = r1(rl + i * band + (band - bw) / 2);
      var teile = [];
      o.serien.forEach(function (se) { if (se.werte[i] > 0) teile.push(se); });
      var acc = 0;
      teile.forEach(function (se, k) {
        var unten = y(acc), oben = y(acc + se.werte[i]);
        acc += se.werte[i];
        if (k > 0) unten -= 1;                    // 2px Fläche zwischen gestapelten Teilen
        if (k < teile.length - 1) oben += 1;
        var h = Math.max(1, unten - oben);
        s += k === teile.length - 1
          ? '<path d="' + balkenOben(x, r1(unten - h), r1(bw), r1(h), 4) + '" fill="' + se.farbe + '"/>'
          : '<rect x="' + x + '" y="' + r1(unten - h) + '" width="' + r1(bw) + '" height="' + r1(h) + '" fill="' + se.farbe + '"/>';
      });
    }
    // eine einzige Direktbeschriftung: der stärkste Tag
    s += '<text x="' + r1(rl + spitze * band + band / 2) + '" y="' + r1(y(summen[spitze]) - 6) + '" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-2)">' + zahl(summen[spitze]) + '</text>';
    // Datumsbeschriftung: so viele, wie ohne Überlappung passen (der letzte Tag immer)
    var lang = band >= 70;
    var jede = Math.max(1, Math.ceil((lang ? 70 : 46) / band));
    for (var j = n - 1; j >= 0; j -= jede) {
      s += '<text x="' + r1(rl + j * band + band / 2) + '" y="' + (H - 7) + '" text-anchor="middle" font-size="12" fill="var(--text-3)">' +
        esc(lang ? tagMittel(o.tage[j]) : tagKurz(o.tage[j])) + '</text>';
    }
    // Trefferflächen: ganze Spalte je Tag (größer als die Säule)
    for (var m = 0; m < n; m++) {
      s += '<rect data-i="' + m + '" x="' + r1(rl + m * band) + '" y="' + ro + '" width="' + r1(band + .5) + '" height="' + ph + '" fill="transparent"/>';
    }
    s += '</svg>';
    box.innerHTML = s;

    var svg = box.firstChild;
    var mark = svg.querySelector('.markierung');
    var aktiv = -1;
    function inhalt(i) {
      if (o.serien.length === 1) return tipZeilen(tagLang(o.tage[i]), [{ name: o.serien[0].name, wert: o.serien[0].werte[i] }]);
      return tipZeilen(tagLang(o.tage[i]), o.serien.map(function (se) { return { name: se.name, farbe: se.farbe, wert: se.werte[i] }; }), summen[i]);
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

  /* ---------- Balkendiagramm (waagerecht, gestapelt): Klassen ---------- */
  function balken(box, o) {
    var max = Math.max.apply(null, o.zeilen.map(function (z) { return z.summe; }).concat([0]));
    if (!o.zeilen.length || max === 0) { box.innerHTML = '<p class="leer-hinweis">' + esc(o.leer) + '</p>'; return; }
    var B = Math.max(300, box.clientWidth || 800);
    var zh = 44, dicke = 24, rl = 120, rr = 64;
    var H = o.zeilen.length * zh + 8;
    var pw = B - rl - rr;
    var x = function (v) { return rl + (v / max) * pw; };
    var s = '<svg viewBox="0 0 ' + B + ' ' + H + '" width="' + B + '" height="' + H + '" tabindex="0" role="img" aria-label="' + esc(o.titel) + '">';
    s += '<line x1="' + (rl + .5) + '" x2="' + (rl + .5) + '" y1="0" y2="' + H + '" stroke="var(--achse)"/>';
    o.zeilen.forEach(function (z, i) {
      var yy = i * zh + (zh - dicke) / 2 + 4;
      s += '<rect class="markierung" data-m="' + i + '" x="0" y="' + (i * zh + 4) + '" width="' + B + '" height="' + zh + '" rx="6" fill="var(--markiert)" visibility="hidden"/>';
      s += '<text x="' + (rl - 10) + '" y="' + (yy + dicke / 2 + 5) + '" text-anchor="end" font-size="14" font-weight="650" fill="var(--text-2)">' + esc(z.name) + '</text>';
      var teile = [];
      o.serien.forEach(function (se, k) { if (z.werte[k] > 0) teile.push({ farbe: se.farbe, wert: z.werte[k] }); });
      var acc = 0;
      teile.forEach(function (t, k) {
        var links = x(acc), rechts = x(acc + t.wert);
        acc += t.wert;
        if (k > 0) links += 1;
        if (k < teile.length - 1) rechts -= 1;
        var w = Math.max(1, rechts - links);
        s += k === teile.length - 1
          ? '<path d="' + balkenRechts(r1(links), yy, r1(w), dicke, 4) + '" fill="' + t.farbe + '"/>'
          : '<rect x="' + r1(links) + '" y="' + yy + '" width="' + r1(w) + '" height="' + dicke + '" fill="' + t.farbe + '"/>';
      });
      s += '<text x="' + r1(x(z.summe) + 8) + '" y="' + (yy + dicke / 2 + 5) + '" font-size="14" font-weight="700" fill="var(--text)">' + zahl(z.summe) + '</text>';
    });
    o.zeilen.forEach(function (z, i) {
      s += '<rect data-i="' + i + '" x="0" y="' + (i * zh + 4) + '" width="' + B + '" height="' + zh + '" fill="transparent"/>';
    });
    s += '</svg>';
    box.innerHTML = s;

    var svg = box.firstChild;
    var aktiv = -1;
    function inhalt(i) {
      var z = o.zeilen[i];
      return tipZeilen(z.name, o.serien.map(function (se, k) { return { name: se.name, farbe: se.farbe, wert: z.werte[k] }; }), z.summe);
    }
    function markieren(i) {
      aktiv = i;
      Array.prototype.forEach.call(svg.querySelectorAll('.markierung'), function (m) {
        m.setAttribute('visibility', Number(m.getAttribute('data-m')) === i ? 'visible' : 'hidden');
      });
    }
    function loesen() { markieren(-1); tipWeg(); }
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
      tipZeigen(inhalt(i), r.left + rl + 40, r.top + r.height / 2);
    }
    svg.addEventListener('focus', function () { perTaste(aktiv >= 0 ? aktiv : 0); });
    svg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        perTaste(Math.max(0, Math.min(o.zeilen.length - 1, (aktiv < 0 ? 0 : aktiv) + (e.key === 'ArrowUp' ? -1 : 1))));
      } else if (e.key === 'Escape') loesen();
    });
  }

  /* ---------- Legende und Tabellen ---------- */
  function legende(ul) {
    ul.innerHTML = BEREICHE.map(function (b) {
      return '<li><span class="farbe" style="background:' + b.farbe + '"></span>' + esc(b.text) + '</li>';
    }).join('');
  }
  function tabelle(kopf, zeilen, fuss) {
    var h = '<table><thead><tr>' + kopf.map(function (k) { return '<th scope="col">' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>';
    zeilen.forEach(function (z) {
      h += '<tr>' + z.map(function (w, i) { return i === 0 ? '<th scope="row">' + esc(w) + '</th>' : '<td>' + zahl(w) + '</td>'; }).join('') + '</tr>';
    });
    h += '</tbody>';
    if (fuss) h += '<tfoot><tr>' + fuss.map(function (w, i) { return '<td>' + (i === 0 ? esc(w) : zahl(w)) + '</td>'; }).join('') + '</tr></tfoot>';
    return h + '</table>';
  }

  var alsTabelle = { aufrufe: false, karten: false, klassen: false };
  Array.prototype.forEach.call(document.querySelectorAll('[data-tabelle]'), function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-tabelle');
      alsTabelle[k] = !alsTabelle[k];
      ansicht();
    });
  });
  function ansicht() {
    Object.keys(alsTabelle).forEach(function (k) {
      $('d-' + k).hidden = alsTabelle[k];
      $('tab-' + k).hidden = !alsTabelle[k];
      document.querySelector('[data-tabelle="' + k + '"]').textContent = alsTabelle[k] ? 'Als Diagramm' : 'Als Tabelle';
    });
  }

  /* ---------- Alles zeichnen ---------- */
  function zeichnen() {
    if (!daten) return;
    tipWeg();
    $('inhalt').hidden = false;
    ansicht();
    var a = auswerten();
    kennzahlen(a);

    // Aufrufe pro Tag
    legende($('legende-aufrufe'));
    var serien = BEREICHE.map(function (b, i) { return { name: b.text, farbe: b.farbe, werte: a.aufrufe[i] }; });
    saeulen($('d-aufrufe'), { tage: a.tage, serien: serien, titel: 'Aufrufe pro Tag, gestapelt nach Bereich', leer: 'Keine Aufrufe im gewählten Zeitraum.' });
    var zeilen = a.tage.map(function (t, i) {
      return [tagMittel(t)].concat(a.aufrufe.map(function (s) { return s[i]; }), [a.aufrufe.reduce(function (x, s) { return x + s[i]; }, 0)]);
    }).reverse();
    $('tab-aufrufe').innerHTML = tabelle(['Tag'].concat(BEREICHE.map(function (b) { return b.text; }), ['Zusammen']), zeilen,
      ['Summe'].concat(a.aufrufe.map(function (s) { return s.reduce(function (x, v) { return x + v; }, 0); }), [a.summe.aufrufe]));

    // Bewertete Karten pro Tag (erst ab Beginn der Ereigniszählung)
    var tageK = a.tage.slice(a.kartenAb), werteK = a.karten.slice(a.kartenAb);
    $('karten-seit').textContent = 'Umgedreht und mit „Gewusst“ oder „Noch nicht“ bewertet' +
      (a.ereignisStart ? ' – gezählt seit ' + tagLang(a.ereignisStart) + '.' : '.');
    saeulen($('d-karten'), {
      tage: tageK, serien: [{ name: 'Karten bewertet', farbe: 'var(--s1)', werte: werteK }], hoehe: 220,
      titel: 'Bewertete Lernkarten pro Tag', leer: 'Noch keine bewerteten Karten im gewählten Zeitraum.'
    });
    $('tab-karten').innerHTML = tabelle(['Tag', 'Karten bewertet'], tageK.map(function (t, i) { return [tagMittel(t), werteK[i]]; }).reverse(),
      ['Summe', a.summe.karten]);

    // Klassen im Vergleich (immer alle Klassen)
    legende($('legende-klassen'));
    var reihen = Object.keys(a.klassen).map(function (k) {
      var x = a.klassen[k];
      return { kennung: k, name: klassenName(k), werte: x.bereiche, summe: x.bereiche[0] + x.bereiche[1] + x.bereiche[2], x: x };
    }).filter(function (z) { return z.summe > 0 || KLASSEN.some(function (k) { return k.kennung === z.kennung && k.kennung !== OHNE; }); });
    balken($('d-klassen'), {
      zeilen: reihen, serien: BEREICHE.map(function (b) { return { name: b.text, farbe: b.farbe }; }),
      titel: 'Aufrufe je Klasse, gestapelt nach Bereich', leer: 'Keine Aufrufe im gewählten Zeitraum.'
    });
    $('tab-klassen').innerHTML = tabelle(['Klasse'].concat(BEREICHE.map(function (b) { return b.text; }), ['Aufrufe zusammen', 'Karten bewertet', 'Challenges beendet', 'Spielrunden gespielt']),
      reihen.map(function (z) { return [z.name].concat(z.werte, [z.summe, z.x.karten, z.x.beendet, z.x.gespielt]); }));
  }

  var warte = null;
  window.addEventListener('resize', function () { clearTimeout(warte); warte = setTimeout(zeichnen, 150); });

  laden();
})();
