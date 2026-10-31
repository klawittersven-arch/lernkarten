/* Klausur-Challenge: zufällige Aufgaben aus der Ich-kann-Liste, Timer, Punkte und eine
 * eigene Highscore-Liste je Klasse.
 * Aufruf: challenge/?satz=kb1-diabetes · Aufgaben: ../<Kartensatz>/fragen.js
 * Einstellungen und Texte: ../app/einstellungen.js */
(function () {
  'use strict';

  var LK = window.LK;
  var T = LK.T;
  var C = LK.E.challenge || {};
  var ANZAHL = Math.max(1, Math.floor(C.aufgaben || 20));
  var PUNKTE = Math.max(1, Math.floor(C.punkteProAufgabe || 100));
  var BONUS_MAX = Math.max(0, Math.floor(C.zeitbonusMax || 0));
  var VOLL_BIS = 60 * (typeof C.zeitbonusVollBisMinuten === 'number' && C.zeitbonusVollBisMinuten >= 0 ? C.zeitbonusVollBisMinuten : 4);
  var NULL_AB = Math.max(VOLL_BIS + 1, 60 * (C.zeitbonusNullAbMinuten || 15));
  var ART = 'challenge';

  var SATZ = '';
  try { SATZ = new URLSearchParams(location.search).get('satz') || ''; } catch (e) { /* alter Browser */ }
  var L = LK.liste(SATZ);
  var BEST = 'lernkarten:' + SATZ + ':challenge-best';

  function $(id) { return document.getElementById(id); }

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  function maskieren(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // **fett** und *kursiv* wie in den Lernkarten
  function formatieren(text) {
    return maskieren(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/&lt;br\s*\/?&gt;|\n/g, '<br>');
  }

  function formatiert(tag, klasse, text) {
    var e = el(tag, klasse);
    e.innerHTML = formatieren(text);
    return e;
  }

  function mischen(liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function zahlText(n) {
    try { return Number(n).toLocaleString('de-DE'); } catch (e) { return String(n); }
  }

  function zeitText(sekunden) {
    var s = Math.max(0, Math.floor(sekunden));
    var m = Math.floor(s / 60);
    s = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function bestLesen() {
    try { var n = JSON.parse(localStorage.getItem(BEST)); return typeof n === 'number' && isFinite(n) ? n : 0; } catch (e) { return 0; }
  }
  function bestSetzen(n) { try { localStorage.setItem(BEST, JSON.stringify(n)); } catch (e) { /* egal */ } }

  /* ---------- Aufgaben ziehen: aus jedem Thema eine, die übrigen Plätze zufällig nach
     „gewicht“ (Klausurrelevanz, in fragen.js je Thema); 0 = nur die eine Pflichtaufgabe ---------- */
  function themaTitel(t) {
    if (t.titel) return t.titel;
    return Array.isArray(t.ab) ? t.ab.join(' · ') : t.ab;
  }

  function gewicht(t) { return typeof t.gewicht === 'number' && t.gewicht >= 0 ? t.gewicht : 1; }

  function ziehen(themen, anzahl) {
    var toepfe = mischen(themen.map(function (t) {
      return { t: t, rest: mischen(t.fragen.map(function (f) { return { thema: t, f: f }; })) };
    }));
    var aus = [];
    toepfe.forEach(function (p) { if (aus.length < anzahl && p.rest.length) aus.push(p.rest.pop()); });
    while (aus.length < anzahl) {
      var offen = toepfe.filter(function (p) { return p.rest.length; });
      if (!offen.length) break;
      // sind alle gewichteten Themen leer, kommen die übrigen gleichmäßig dran
      var gewichtet = offen.filter(function (p) { return gewicht(p.t) > 0; });
      var wahl = gewichtet.length ? gewichtet : offen;
      var summe = wahl.reduce(function (s, p) { return s + (gewichtet.length ? gewicht(p.t) : 1); }, 0);
      var z = Math.random() * summe;
      var p = wahl[wahl.length - 1];
      for (var i = 0; i < wahl.length; i++) {
        z -= gewichtet.length ? gewicht(wahl[i].t) : 1;
        if (z < 0) { p = wahl[i]; break; }
      }
      aus.push(p.rest.pop());
    }
    return mischen(aus);
  }

  // Aus einem Eintrag in fragen.js wird eine Aufgabe mit gemischter Darstellung
  function vorbereiten(eintrag) {
    var f = eintrag.f;
    var a = { f: f, typ: f.typ, thema: themaTitel(eintrag.thema), antwort: null };
    if (f.typ === 'auswahl') {
      a.optionen = mischen(f.antworten.map(function (text, i) { return { text: text, richtig: i === 0 }; }));
    } else if (f.typ === 'zuordnen') {
      a.gruppen = Object.keys(f.zuordnung);
      a.eintraege = [];
      a.gruppen.forEach(function (g) {
        f.zuordnung[g].forEach(function (text) { a.eintraege.push({ text: text, gruppe: g }); });
      });
      a.eintraege = mischen(a.eintraege);
      // viele Gruppen: Auswahlliste, sortiert (verrät nichts über die Reihenfolge in fragen.js)
      a.liste = a.gruppen.length > 3;
      if (a.liste) a.gruppen.sort(function (x, y) { return x.localeCompare(y, 'de', { numeric: true }); });
      a.antwort = a.eintraege.map(function () { return null; });
    } else if (f.typ === 'reihenfolge') {
      var nr = f.schritte.map(function (text, i) { return i; });
      do { a.angezeigt = mischen(nr); } while (nr.length > 1 && a.angezeigt.join() === nr.join());
      a.antwort = [];
    } else if (f.typ === 'zeile') {
      a.antwort = []; // gewählte Zeilennummern (ab 1)
    } else if (f.typ === 'mehrfach') {
      a.optionen = mischen(f.richtig.map(function (text) { return { text: text, richtig: true }; })
        .concat(f.falsch.map(function (text) { return { text: text, richtig: false }; })));
      a.antwort = []; // gewählte Optionen (Nummer in a.optionen)
    }
    return a;
  }

  function zahlLesen(text) {
    var m = String(text || '').replace(/\s/g, '').replace(',', '.').match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }

  function beantwortet(a) {
    if (a.typ === 'zuordnen') return a.antwort.every(function (g) { return g !== null; });
    if (a.typ === 'reihenfolge') return a.antwort.length === a.f.schritte.length;
    if (a.typ === 'zeile' || a.typ === 'mehrfach') return a.antwort.length > 0;
    if (a.typ === 'zahl') return isFinite(zahlLesen(a.antwort));
    return a.antwort !== null;
  }

  // Anteil richtig (0 … 1)
  function anteilRichtig(a) {
    var f = a.f;
    if (a.typ === 'auswahl') return a.antwort !== null && a.optionen[a.antwort].richtig ? 1 : 0;
    if (a.typ === 'richtigfalsch') return a.antwort === f.richtig ? 1 : 0;
    if (a.typ === 'zahl') {
      var z = zahlLesen(a.antwort);
      return isFinite(z) && Math.abs(z - f.loesung) <= (f.toleranz || 0) + 1e-9 ? 1 : 0;
    }
    if (a.typ === 'zuordnen') {
      var r = 0;
      a.eintraege.forEach(function (e, i) { if (a.antwort[i] === e.gruppe) r++; });
      return a.eintraege.length ? r / a.eintraege.length : 0;
    }
    if (a.typ === 'reihenfolge') {
      var p = 0;
      a.antwort.forEach(function (schritt, platz) { if (schritt === platz) p++; });
      return f.schritte.length ? p / f.schritte.length : 0;
    }
    if (a.typ === 'zeile') {
      // Teilpunkte: richtige Zeilen zählen, falsch gewählte ziehen ab (Raten lohnt sich nicht)
      var treffer = 0, daneben = 0;
      a.antwort.forEach(function (z) { if (f.richtig.indexOf(z) !== -1) treffer++; else daneben++; });
      return f.richtig.length ? Math.max(0, treffer - daneben) / f.richtig.length : 0;
    }
    if (a.typ === 'mehrfach') {
      // Anteil der gefundenen richtigen minus Anteil der gewählten falschen – wer alles antippt, bekommt 0
      var gut = 0, schlecht = 0;
      a.antwort.forEach(function (o) { if (a.optionen[o].richtig) gut++; else schlecht++; });
      return f.richtig.length ? Math.max(0, gut / f.richtig.length - (f.falsch.length ? schlecht / f.falsch.length : 0)) : 0;
    }
    return 0;
  }

  function punkteFuer(a) { return Math.round(PUNKTE * anteilRichtig(a)); }

  // Zeitbonus: voll bis VOLL_BIS, dann gleichmäßig weniger bis NULL_AB; zählt anteilig zu den richtigen Antworten
  function zeitbonus(sekunden, anteil) {
    var f = sekunden <= VOLL_BIS ? 1 : (sekunden >= NULL_AB ? 0 : (NULL_AB - sekunden) / (NULL_AB - VOLL_BIS));
    return Math.round(BONUS_MAX * f * Math.max(0, Math.min(1, anteil)));
  }

  function auswerten(aufgaben, sekunden) {
    var punkte = aufgaben.map(punkteFuer);
    var summe = punkte.reduce(function (s, p) { return s + p; }, 0);
    var max = aufgaben.length * PUNKTE;
    var bonus = zeitbonus(sekunden, max ? summe / max : 0);
    return {
      punkte: punkte,
      aufgabenPunkte: summe,
      ganzRichtig: punkte.filter(function (p) { return p === PUNKTE; }).length,
      sekunden: sekunden,
      bonus: bonus,
      gesamt: summe + bonus
    };
  }

  /* ---------- Zustand ---------- */
  var DATEN = null;
  var aufgaben = [];
  var nr = 0;
  var startZeit = 0;
  var uhrTakt = null;
  var ergebnis = null;

  function ansicht(name) {
    ['start', 'aufgabe', 'ende'].forEach(function (n) { $('ansicht-' + n).hidden = n !== name; });
    window.scrollTo(0, 0);
  }

  function linkZeile(ziel) {
    var p = el('p', 'seiten-links');
    var h = el('a', null, T.highscoreAnsehen);
    h.href = '../highscore/?liste=' + encodeURIComponent(SATZ) + '&art=' + ART;
    h.id = 'link-highscore';
    p.appendChild(h);
    if (L) {
      var z = el('a', null, T.zuDenLernkarten);
      z.href = '../' + L.ordner + '/';
      z.id = 'link-lernkarten';
      p.appendChild(z);
    }
    ziel.appendChild(p);
  }

  /* ---------- Start ---------- */
  function kopfSetzen() {
    $('titel').textContent = T.challengeTitel;
    var klasse = LK.klasse();
    $('untertitel').textContent = (L ? L.titel : '') + (klasse ? ' · ' + klasse.name : '');
    document.title = T.challengeTitel + (L ? ' – ' + (L.kurz || L.titel) : '');
  }

  function zeigeMeldung(text) {
    var m = $('start-inhalt');
    m.textContent = '';
    var k = el('section', 'challenge-karte');
    k.appendChild(el('p', null, text));
    m.appendChild(k);
    var p = el('p', 'seiten-links');
    var a = el('a', null, L ? T.zuDenLernkarten : T.zurUebersicht);
    a.href = L ? '../' + L.ordner + '/' : '../';
    p.appendChild(a);
    m.appendChild(p);
    ansicht('start');
  }

  function zeigeStart() {
    stoppeUhr();
    var m = $('start-inhalt');
    m.textContent = '';
    if (!LK.challengeAn(SATZ)) return;
    if (LK.vorschau() && LK.E.challengeAn !== true) m.appendChild(el('p', 'hinweis vorschau-hinweis', T.vorschauHinweis));
    var k = el('section', 'challenge-karte');
    k.appendChild(el('p', 'challenge-idee', LK.ersetzen(T.challengeIdee, { n: ANZAHL })));
    var ul = el('ul', 'challenge-regeln');
    ul.appendChild(el('li', null, LK.ersetzen(T.challengeRegelPunkte, { p: PUNKTE })));
    if (BONUS_MAX > 0) ul.appendChild(el('li', null, LK.ersetzen(T.challengeRegelZeit, { b: BONUS_MAX })));
    ul.appendChild(el('li', null, T.challengeRegelEnde));
    if (T.challengeRegelFormulieren) ul.appendChild(el('li', null, T.challengeRegelFormulieren));
    k.appendChild(ul);
    if (bestLesen() > 0) k.appendChild(el('p', 'challenge-best', LK.ersetzen(T.challengeBest, { x: zahlText(bestLesen()) })));
    var los = el('button', 'knopf haupt challenge-start', T.challengeStart);
    los.type = 'button';
    los.id = 'knopf-challenge-start';
    los.addEventListener('click', challengeStarten);
    k.appendChild(los);
    m.appendChild(k);
    linkZeile(m);
    ansicht('start');
  }

  /* ---------- Ablauf ---------- */
  function challengeStarten() {
    aufgaben = ziehen(DATEN.themen, ANZAHL).map(vorbereiten);
    nr = 0;
    ergebnis = null;
    ansicht('aufgabe');
    startZeit = Date.now();
    uhrTakt = setInterval(uhrZeigen, 1000);
    uhrZeigen();
    aufgabeZeigen();
    LK.ereignisZaehlen(SATZ, 'challenge-start'); // anonyme Zählung, für die SuS unsichtbar
  }

  function vergangen() { return Math.max(0, (Date.now() - startZeit) / 1000); }

  function uhrZeigen() {
    $('uhr').textContent = '⏱ ' + zeitText(vergangen());
    $('uhr').setAttribute('aria-label', T.uhrBeschriftung + ': ' + zeitText(vergangen()));
  }

  function stoppeUhr() {
    if (uhrTakt) clearInterval(uhrTakt);
    uhrTakt = null;
  }

  function weiterPruefen() {
    $('knopf-weiter').disabled = !beantwortet(aufgaben[nr]);
  }

  function aufgabeZeigen() {
    var a = aufgaben[nr];
    var f = a.f;
    $('zaehler').textContent = LK.ersetzen(T.aufgabeZaehler, { x: nr + 1, y: aufgaben.length });
    $('fortschritt').style.width = (100 * nr / aufgaben.length) + '%';
    $('aufgabe-kopf').textContent = a.thema;
    var frage = a.typ === 'richtigfalsch' ? T.anleitungRichtigFalsch : f.frage;
    $('aufgabe-frage').innerHTML = formatieren(frage);
    var fall = a.typ === 'richtigfalsch' ? f.aussage : f.fall;
    $('aufgabe-fall').hidden = !fall;
    $('aufgabe-fall').innerHTML = fall ? formatieren(fall) : '';
    var anleitung = {
      auswahl: T.anleitungAuswahl, richtigfalsch: '', zuordnen: T.anleitungZuordnen,
      reihenfolge: T.anleitungReihenfolge, zahl: T.anleitungZahl, zeile: T.anleitungZeile, mehrfach: T.anleitungMehrfach
    }[a.typ] || '';
    $('aufgabe-anleitung').textContent = anleitung;
    $('aufgabe-anleitung').hidden = !anleitung;
    var bereich = $('aufgabe-antwort');
    bereich.textContent = '';
    if (a.typ === 'auswahl') bauAuswahl(a, bereich);
    else if (a.typ === 'richtigfalsch') bauRichtigFalsch(a, bereich);
    else if (a.typ === 'zuordnen') bauZuordnen(a, bereich);
    else if (a.typ === 'reihenfolge') bauReihenfolge(a, bereich);
    else if (a.typ === 'zahl') bauZahl(a, bereich);
    else if (a.typ === 'zeile') bauZeile(a, bereich);
    else if (a.typ === 'mehrfach') bauMehrfach(a, bereich);
    $('knopf-weiter').textContent = nr === aufgaben.length - 1 ? T.auswerten : T.weiter;
    weiterPruefen();
    window.scrollTo(0, 0);
    try { $('aufgabe-frage').focus({ preventScroll: true }); } catch (e) { $('aufgabe-frage').focus(); }
  }

  // Knöpfe, von denen genau einer gewählt ist (wie Optionsfelder)
  function einerAusGruppe(knoepfe, gewaehlt) {
    knoepfe.forEach(function (k, i) {
      k.setAttribute('aria-checked', i === gewaehlt ? 'true' : 'false');
      k.classList.toggle('gewaehlt', i === gewaehlt);
    });
  }

  function bauAuswahl(a, bereich) {
    var gruppe = el('div', 'optionen');
    gruppe.setAttribute('role', 'radiogroup');
    gruppe.setAttribute('aria-labelledby', 'aufgabe-frage');
    var knoepfe = a.optionen.map(function (o, i) {
      var b = formatiert('button', 'option', o.text);
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.addEventListener('click', function () {
        a.antwort = i;
        einerAusGruppe(knoepfe, i);
        weiterPruefen();
      });
      gruppe.appendChild(b);
      return b;
    });
    einerAusGruppe(knoepfe, a.antwort);
    bereich.appendChild(gruppe);
  }

  function bauRichtigFalsch(a, bereich) {
    var gruppe = el('div', 'optionen nebeneinander');
    gruppe.setAttribute('role', 'radiogroup');
    gruppe.setAttribute('aria-labelledby', 'aufgabe-frage');
    var werte = [true, false];
    var knoepfe = werte.map(function (w, i) {
      var b = el('button', 'option rf-' + (w ? 'richtig' : 'falsch'), w ? T.knopfRichtig : T.knopfFalsch);
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.addEventListener('click', function () {
        a.antwort = w;
        einerAusGruppe(knoepfe, i);
        weiterPruefen();
      });
      gruppe.appendChild(b);
      return b;
    });
    einerAusGruppe(knoepfe, a.antwort === null ? -1 : werte.indexOf(a.antwort));
    bereich.appendChild(gruppe);
  }

  function bauZuordnen(a, bereich) {
    var ol = el('ol', 'zuordnen-liste');
    a.eintraege.forEach(function (e, i) {
      var li = el('li', 'zuordnen-eintrag');
      var text = formatiert('p', 'eintrag-text', e.text);
      text.id = 'eintrag-' + i;
      li.appendChild(text);
      if (a.liste) {
        var s = el('select', 'auswahl-feld');
        s.setAttribute('aria-labelledby', text.id);
        var leer = el('option', null, T.bitteWaehlen);
        leer.value = '';
        s.appendChild(leer);
        a.gruppen.forEach(function (g) {
          var o = el('option', null, g);
          o.value = g;
          s.appendChild(o);
        });
        s.value = a.antwort[i] || '';
        s.addEventListener('change', function () {
          a.antwort[i] = s.value || null;
          li.classList.toggle('erledigt', !!s.value);
          weiterPruefen();
        });
        li.appendChild(s);
      } else {
        var chips = el('div', 'chips');
        chips.setAttribute('role', 'radiogroup');
        chips.setAttribute('aria-labelledby', text.id);
        var knoepfe = a.gruppen.map(function (g, gi) {
          var b = el('button', 'chip', g);
          b.type = 'button';
          b.setAttribute('role', 'radio');
          b.addEventListener('click', function () {
            a.antwort[i] = g;
            einerAusGruppe(knoepfe, gi);
            li.classList.add('erledigt');
            weiterPruefen();
          });
          chips.appendChild(b);
          return b;
        });
        einerAusGruppe(knoepfe, a.gruppen.indexOf(a.antwort[i]));
        li.appendChild(chips);
      }
      li.classList.toggle('erledigt', a.antwort[i] !== null);
      ol.appendChild(li);
    });
    bereich.appendChild(ol);
  }

  // Falltext mit Zeilennummern: passende Zeilen antippen (noch ein Tipp nimmt die Wahl zurück)
  function bauZeile(a, bereich) {
    var ol = el('ol', 'zeilen-wahl');
    a.f.zeilen.forEach(function (text, i) {
      var nr = i + 1;
      var li = el('li');
      var b = el('button', 'zeile-knopf');
      b.type = 'button';
      b.appendChild(el('span', 'zeilen-nr', String(nr)));
      b.appendChild(document.createTextNode(' '));
      b.appendChild(formatiert('span', 'zeile-text', text));
      function zeigen() {
        var an = a.antwort.indexOf(nr) !== -1;
        b.setAttribute('aria-pressed', an ? 'true' : 'false');
        b.classList.toggle('gewaehlt', an);
      }
      b.addEventListener('click', function () {
        var pos = a.antwort.indexOf(nr);
        if (pos === -1) a.antwort.push(nr); else a.antwort.splice(pos, 1);
        a.antwort.sort(function (x, y) { return x - y; });
        zeigen();
        weiterPruefen();
      });
      zeigen();
      li.appendChild(b);
      ol.appendChild(li);
    });
    bereich.appendChild(ol);
  }

  // Alle richtigen antippen (noch ein Tipp nimmt die Wahl zurück)
  function bauMehrfach(a, bereich) {
    var gruppe = el('div', 'optionen mehrfach');
    gruppe.setAttribute('role', 'group');
    gruppe.setAttribute('aria-labelledby', 'aufgabe-frage');
    a.optionen.forEach(function (o, i) {
      var b = formatiert('button', 'option mehrfach-knopf', o.text);
      b.type = 'button';
      function zeigen() {
        var an = a.antwort.indexOf(i) !== -1;
        b.setAttribute('aria-pressed', an ? 'true' : 'false');
        b.classList.toggle('gewaehlt', an);
      }
      b.addEventListener('click', function () {
        var pos = a.antwort.indexOf(i);
        if (pos === -1) a.antwort.push(i); else a.antwort.splice(pos, 1);
        zeigen();
        weiterPruefen();
      });
      zeigen();
      gruppe.appendChild(b);
    });
    bereich.appendChild(gruppe);
  }

  function bauReihenfolge(a, bereich) {
    var schritte = a.f.schritte;
    bereich.appendChild(el('p', 'klein-titel', T.ihreReihenfolge));
    var gewaehlt = el('ol', 'reihe-gewaehlt');
    bereich.appendChild(gewaehlt);
    bereich.appendChild(el('p', 'klein-titel', T.schritteZurAuswahl));
    var pool = el('div', 'reihe-pool');
    bereich.appendChild(pool);

    function zeichnen() {
      gewaehlt.textContent = '';
      for (var platz = 0; platz < schritte.length; platz++) {
        var li = el('li');
        if (platz < a.antwort.length) {
          var s = a.antwort[platz];
          var b = formatiert('button', 'reihe-schritt gesetzt', schritte[s]);
          b.type = 'button';
          b.setAttribute('aria-label', (platz + 1) + '. ' + schritte[s].replace(/\*/g, '') + ' – herausnehmen');
          b.addEventListener('click', (function (p) {
            return function () { a.antwort.splice(p, 1); zeichnen(); weiterPruefen(); };
          })(platz));
          li.appendChild(b);
        } else {
          li.className = 'platzhalter';
          li.appendChild(el('span', 'platzhalter-text', '…'));
        }
        gewaehlt.appendChild(li);
      }
      pool.textContent = '';
      a.angezeigt.forEach(function (s) {
        if (a.antwort.indexOf(s) !== -1) return;
        var b = formatiert('button', 'reihe-schritt', schritte[s]);
        b.type = 'button';
        b.addEventListener('click', function () { a.antwort.push(s); zeichnen(); weiterPruefen(); });
        pool.appendChild(b);
      });
      pool.hidden = a.antwort.length === schritte.length;
    }
    zeichnen();
  }

  function bauZahl(a, bereich) {
    var l = el('label', 'zahl-feld');
    l.appendChild(el('span', 'zahl-beschriftung', T.ihrErgebnis));
    var zeile = el('span', 'zahl-zeile');
    var input = el('input', 'feld');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.autocomplete = 'off';
    input.id = 'zahl-eingabe';
    input.value = a.antwort || '';
    input.addEventListener('input', function () { a.antwort = input.value; weiterPruefen(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && beantwortet(a)) { e.preventDefault(); weiter(); }
    });
    zeile.appendChild(input);
    if (a.f.einheit) zeile.appendChild(el('span', 'einheit', a.f.einheit));
    l.appendChild(zeile);
    bereich.appendChild(l);
  }

  function weiter() {
    if (!beantwortet(aufgaben[nr])) return;
    if (nr < aufgaben.length - 1) { nr++; aufgabeZeigen(); return; }
    var sekunden = Math.round(vergangen());
    stoppeUhr();
    ergebnis = auswerten(aufgaben, sekunden);
    zeigeEnde();
    LK.ereignisZaehlen(SATZ, 'challenge-ende'); // anonyme Zählung, für die SuS unsichtbar
  }

  $('knopf-weiter').addEventListener('click', weiter);
  $('abbrechen-text').textContent = T.abbrechen;
  $('knopf-abbrechen').setAttribute('title', T.abbrechen);
  $('knopf-abbrechen').addEventListener('click', function () {
    if (window.confirm(T.abbrechenFrage)) zeigeStart();
  });

  /* ---------- Auswertung ---------- */
  function zeigeEnde() {
    var e = ergebnis;
    var vorher = bestLesen();
    var neu = e.gesamt > vorher;
    if (neu) bestSetzen(e.gesamt);
    $('ende-titel').textContent = T.endeTitel;
    $('ende-untertitel').textContent = T.challengeTitel + ' · ' + LK.listenName(SATZ);
    var m = $('ende-inhalt');
    m.textContent = '';

    var k = el('section', 'challenge-karte ergebnis-karte');
    var gross = el('p', 'ergebnis-gross');
    gross.id = 'ergebnis-gesamt';
    gross.appendChild(el('span', 'ergebnis-zahl-gross', zahlText(e.gesamt)));
    gross.appendChild(el('span', 'ergebnis-einheit', ' ' + T.punkteSpalte));
    k.appendChild(gross);
    if (neu && vorher > 0) k.appendChild(el('p', 'neu-best', T.neueBestleistung));
    var tab = el('table', 'ergebnis-tabelle');
    function zeile(text, wert, klasse, id) {
      var tr = el('tr', klasse);
      tr.appendChild(el('th', null, text));
      var td = el('td', null, zahlText(wert));
      if (id) td.id = id;
      tr.appendChild(td);
      tab.appendChild(tr);
    }
    zeile(LK.ersetzen(T.zeileAufgaben, { r: e.ganzRichtig, n: aufgaben.length }), e.aufgabenPunkte, '', 'ergebnis-aufgaben');
    if (BONUS_MAX > 0) zeile(LK.ersetzen(T.zeileZeit, { t: zeitText(e.sekunden) }), e.bonus, '', 'ergebnis-bonus');
    zeile(T.zeileGesamt, e.gesamt, 'summe');
    k.appendChild(tab);
    if (!neu || vorher === 0) k.appendChild(el('p', 'challenge-best', LK.ersetzen(T.challengeBest, { x: zahlText(Math.max(vorher, e.gesamt)) })));
    m.appendChild(k);

    eintragenBereich(m, e.gesamt);
    themenBereich(m);
    if (T.challengeTippFormulieren) {
      var tipp = el('p', 'hinweis challenge-tipp', T.challengeTippFormulieren);
      tipp.id = 'tipp-formulieren';
      m.appendChild(tipp);
    }
    schreibBereich(m);
    fehlerBereich(m);

    var knoepfe = el('div', 'ergebnis-knoepfe');
    var nochmal = el('button', 'knopf haupt', T.nochmalChallenge);
    nochmal.type = 'button';
    nochmal.id = 'knopf-nochmal';
    nochmal.addEventListener('click', challengeStarten);
    knoepfe.appendChild(nochmal);
    m.appendChild(knoepfe);
    linkZeile(m);

    ansicht('ende');
    try { $('ende-titel').focus({ preventScroll: true }); } catch (x) { $('ende-titel').focus(); }
  }

  function eintragenBereich(m, punkte) {
    var box = el('section', 'challenge-karte eintragen');
    box.id = 'eintragen';
    box.appendChild(el('h2', null, T.eintragenTitel));
    var form = el('form');
    form.noValidate = true;
    var gespeichert = LK.nameLesen() || {};

    function feld(id, beschriftung, laenge, wert) {
      var huelle = el('div', 'feld-huelle' + (laenge === 1 ? ' feld-initial' : ''));
      var l = el('label', null, beschriftung);
      l.htmlFor = id;
      var i = el('input', 'feld');
      i.id = id;
      i.type = 'text';
      i.maxLength = laenge;
      i.autocomplete = 'off';
      i.setAttribute('autocapitalize', 'words');
      i.spellcheck = false;
      i.value = wert || '';
      huelle.appendChild(l);
      huelle.appendChild(i);
      form.appendChild(huelle);
      return i;
    }
    var vorname = feld('vorname', T.vorname, 20, gespeichert.vorname);
    var initial = feld('initial', T.initial, 1, gespeichert.initial);
    var fehler = el('p', 'fehler');
    fehler.setAttribute('role', 'alert');
    form.appendChild(fehler);
    form.appendChild(el('p', 'klein', T.nameHinweis));
    var senden = el('button', 'knopf haupt', T.eintragen);
    senden.type = 'submit';
    senden.id = 'knopf-eintragen';
    form.appendChild(senden);
    var nicht = el('button', 'text-knopf', T.nichtEintragen);
    nicht.type = 'button';
    nicht.id = 'knopf-nicht-eintragen';
    form.appendChild(nicht);
    box.appendChild(form);

    function meldung(text, art) {
      var p = el('p', 'meldung' + (art ? ' ' + art : ''), text);
      p.id = 'eintragen-meldung';
      p.setAttribute('role', 'status');
      return p;
    }
    nicht.addEventListener('click', function () { box.replaceChild(meldung(T.nichtEingetragen, ''), form); });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var art = LK.namePruefen(vorname.value, initial.value);
      if (art) {
        fehler.textContent = art === 'initial' ? T.fehlerInitial : (art === 'wort' ? T.fehlerWort : T.fehlerVorname);
        (art === 'initial' ? initial : vorname).focus();
        return;
      }
      LK.nameSpeichern(vorname.value, initial.value);
      var name = LK.anzeigeName(vorname.value, initial.value);
      var warte = meldung(T.wirdEingetragen, '');
      box.replaceChild(warte, form);
      LK.eintragen(SATZ, name, punkte, ART).then(function (r) {
        var text, klasse = 'gut';
        if (r && r.ok) text = r.platz ? LK.ersetzen(T.eingetragen, { x: r.platz, satz: LK.listenName(SATZ, ART) }) : T.eingetragenOhnePlatz;
        else if (r && r.ausstehend) { text = r.nichtEingerichtet ? T.nichtEingerichtet : T.ausstehend; klasse = 'warten'; }
        else { text = T.abgelehnt + (r && r.fehler ? ' (' + r.fehler + ')' : ''); klasse = 'warten'; }
        box.replaceChild(meldung(text, klasse), warte);
      });
    });
    m.appendChild(box);
  }

  /* ---------- Auswertung je Thema, mit Link zum Thema in den Lernkarten ---------- */
  function themenAuswerten() {
    var je = {};
    var reihe = [];
    aufgaben.forEach(function (a, i) {
      if (!je[a.thema]) { je[a.thema] = { thema: a.thema, punkte: 0, max: 0 }; reihe.push(je[a.thema]); }
      je[a.thema].punkte += ergebnis.punkte[i];
      je[a.thema].max += PUNKTE;
    });
    // schwächste Themen zuerst; bei Gleichstand wie in der Ich-kann-Liste
    var ordnung = DATEN.themen.map(themaTitel);
    return reihe.sort(function (x, y) {
      return x.punkte / x.max - y.punkte / y.max || ordnung.indexOf(x.thema) - ordnung.indexOf(y.thema);
    });
  }

  function themenBereich(m) {
    var box = el('section', 'challenge-karte themen-bereich');
    box.id = 'themen';
    box.appendChild(el('h2', null, T.themenTitel));
    box.appendChild(el('p', 'klein', T.themenText));
    var ul = el('ul', 'themen-liste');
    themenAuswerten().forEach(function (t) {
      var li = el('li', t.punkte === t.max ? 'voll' : '');
      var kopf = el('p', 'thema-punkte-kopf');
      kopf.appendChild(el('span', 'themen-name', t.thema));
      kopf.appendChild(el('span', 'themen-zahl', zahlText(t.punkte) + ' / ' + zahlText(t.max)));
      li.appendChild(kopf);
      var balken = el('span', 'balken');
      balken.setAttribute('aria-hidden', 'true');
      var fuell = el('span', 'balken-fuellung');
      fuell.style.width = (100 * t.punkte / t.max) + '%';
      balken.appendChild(fuell);
      li.appendChild(balken);
      if (t.punkte < t.max && L) {
        var link = el('a', 'themen-link', T.themaUeben);
        link.href = '../' + L.ordner + '/?thema=' + encodeURIComponent(t.thema);
        li.appendChild(link);
      }
      ul.appendChild(li);
    });
    box.appendChild(ul);
    m.appendChild(box);
  }

  /* ---------- Schreibübung: frei formulieren, Musterantwort und Checkliste zur Selbstkontrolle.
     Zählt nicht für die Punkte; der Text bleibt nur auf dieser Seite ---------- */
  function schreibAufgaben() {
    var alle = [];
    DATEN.themen.forEach(function (t) {
      (t.schreiben || []).forEach(function (s) { alle.push({ thema: themaTitel(t), s: s }); });
    });
    return alle;
  }
  var schreibNr = -1;

  function schreibBereich(m) {
    var alle = schreibAufgaben();
    if (!alle.length) return;
    var box = el('section', 'challenge-karte schreib-bereich');
    box.id = 'schreiben';
    m.appendChild(box);
    // zuerst eine Übung zu einem Thema mit Fehlern, sonst eine zufällige
    var schwach = themenAuswerten().filter(function (t) { return t.punkte < t.max; }).map(function (t) { return t.thema; });
    var passend = alle.map(function (x, i) { return schwach.indexOf(x.thema) !== -1 ? i : -1; }).filter(function (i) { return i !== -1; });
    schreibNr = passend.length ? passend[Math.floor(Math.random() * passend.length)] : Math.floor(Math.random() * alle.length);
    schreibZeigen(box, alle);
  }

  function schreibZeigen(box, alle) {
    var x = alle[schreibNr];
    box.textContent = '';
    box.appendChild(el('h2', null, T.schreibenTitel));
    box.appendChild(el('p', 'klein', T.schreibenText));
    box.appendChild(el('p', 'schreib-thema', x.thema));
    var frageZeile = formatiert('p', 'schreib-frage', x.s.frage);
    frageZeile.tabIndex = -1;
    box.appendChild(frageZeile);
    if (x.s.fall) box.appendChild(formatiert('p', 'fall klein-fall', x.s.fall));
    var feld = el('textarea', 'schreib-feld');
    feld.id = 'schreib-feld';
    feld.rows = 6;
    feld.setAttribute('aria-label', T.schreibenFeld);
    feld.placeholder = T.schreibenFeld;
    box.appendChild(feld);
    var zeigen = el('button', 'knopf zweit', T.schreibenMuster);
    zeigen.type = 'button';
    zeigen.id = 'knopf-muster';
    box.appendChild(zeigen);
    var loesung = el('div', 'schreib-loesung');
    loesung.id = 'schreib-loesung';
    loesung.hidden = true;
    loesung.appendChild(el('p', 'klein-titel', T.schreibenMusterTitel));
    var ul = el('ul', 'schreib-muster');
    x.s.muster.forEach(function (t) { ul.appendChild(formatiert('li', null, t)); });
    loesung.appendChild(ul);
    loesung.appendChild(el('p', 'klein-titel', T.schreibenCheck));
    var check = el('ul', 'schreib-check');
    x.s.checkliste.forEach(function (t, i) {
      var li = el('li');
      var l = el('label');
      var c = el('input');
      c.type = 'checkbox';
      c.id = 'schreib-check-' + i;
      l.appendChild(c);
      l.appendChild(document.createTextNode(' ' + t));
      li.appendChild(l);
      check.appendChild(li);
    });
    loesung.appendChild(check);
    box.appendChild(loesung);
    zeigen.addEventListener('click', function () {
      loesung.hidden = false;
      zeigen.hidden = true;
    });
    if (alle.length > 1) {
      var andere = el('button', 'text-knopf', T.schreibenAndere);
      andere.type = 'button';
      andere.id = 'knopf-andere-schreibuebung';
      andere.addEventListener('click', function () {
        var neu = schreibNr;
        while (neu === schreibNr) neu = Math.floor(Math.random() * alle.length);
        schreibNr = neu;
        schreibZeigen(box, alle);
        try { box.querySelector('.schreib-frage').focus(); } catch (e) { /* egal */ }
      });
      box.appendChild(andere);
    }
  }

  /* ---------- Fehlerübersicht mit Lösungen ---------- */
  function antwortText(a) {
    if (a.typ === 'auswahl') return a.antwort === null ? T.keineAntwort : a.optionen[a.antwort].text;
    if (a.typ === 'richtigfalsch') return a.antwort === null ? T.keineAntwort : (a.antwort ? T.knopfRichtig : T.knopfFalsch);
    if (a.typ === 'zahl') return String(a.antwort || '').trim() + (a.f.einheit ? ' ' + a.f.einheit : '');
    return '';
  }
  function loesungText(a) {
    var f = a.f;
    if (a.typ === 'auswahl') return f.antworten[0];
    if (a.typ === 'richtigfalsch') return f.richtig ? T.knopfRichtig : T.knopfFalsch;
    if (a.typ === 'zahl') return String(f.loesung).replace('.', ',') + (f.einheit ? ' ' + f.einheit : '');
    return '';
  }

  function zeilenText(liste) {
    return liste.length ? 'Z. ' + liste.slice().sort(function (x, y) { return x - y; }).join(', ') : T.keineAntwort;
  }

  function zweiZeilen(karte, ihre, richtig) {
    var p1 = el('p', 'antwort-zeile falsch');
    p1.appendChild(el('span', 'marke', '✗ ' + T.ihreAntwort + ' '));
    p1.appendChild(formatiert('span', null, ihre));
    karte.appendChild(p1);
    var p2 = el('p', 'antwort-zeile richtig');
    p2.appendChild(el('span', 'marke', '✓ ' + T.richtigeLoesung + ' '));
    p2.appendChild(formatiert('span', null, richtig));
    karte.appendChild(p2);
  }

  function fehlerBereich(m) {
    var box = el('section', 'fehler-bereich');
    box.id = 'fehler';
    box.appendChild(el('h2', null, T.fehlerTitel));
    var falsch = [];
    aufgaben.forEach(function (a, i) { if (ergebnis.punkte[i] < PUNKTE) falsch.push(i); });
    if (!falsch.length) {
      box.appendChild(el('p', 'meldung gut', T.fehlerKeine));
      m.appendChild(box);
      return;
    }
    var ol = el('ol', 'fehler-liste');
    falsch.forEach(function (i) {
      var a = aufgaben[i];
      var f = a.f;
      var li = el('li', 'fehler-karte');
      li.appendChild(el('p', 'fehler-kopf', LK.ersetzen(T.fehlerKopf, { x: i + 1, p: ergebnis.punkte[i], m: PUNKTE }) + ' · ' + a.thema));
      li.appendChild(formatiert('p', 'fehler-frage', a.typ === 'richtigfalsch' ? f.aussage : f.frage));
      if (f.fall && a.typ !== 'richtigfalsch') li.appendChild(formatiert('p', 'fall klein-fall', f.fall));
      if (a.typ === 'auswahl' || a.typ === 'richtigfalsch' || a.typ === 'zahl') {
        zweiZeilen(li, antwortText(a), loesungText(a));
      } else if (a.typ === 'zuordnen') {
        var ul = el('ul', 'zuordnen-loesung');
        a.eintraege.forEach(function (e, j) {
          var ok = a.antwort[j] === e.gruppe;
          var z = el('li', ok ? 'richtig' : 'falsch');
          z.appendChild(el('span', 'marke', ok ? '✓ ' : '✗ '));
          z.appendChild(formatiert('span', 'eintrag', e.text));
          z.appendChild(el('span', null, ' → '));
          z.appendChild(formatiert('strong', null, e.gruppe));
          if (!ok) z.appendChild(el('span', 'ihre', ' (' + T.ihreAntwort + ' ' + (a.antwort[j] || T.keineAntwort) + ')'));
          ul.appendChild(z);
        });
        li.appendChild(ul);
      } else if (a.typ === 'reihenfolge') {
        li.appendChild(el('p', 'antwort-zeile richtig', T.richtigeReihenfolge));
        var olR = el('ol', 'reihe-loesung');
        f.schritte.forEach(function (s, platz) {
          var ok = a.antwort[platz] === platz;
          var z = el('li', ok ? 'richtig' : 'falsch');
          z.appendChild(el('span', 'marke', ok ? '✓ ' : '✗ '));
          z.appendChild(formatiert('span', null, s));
          olR.appendChild(z);
        });
        li.appendChild(olR);
      } else if (a.typ === 'zeile') {
        zweiZeilen(li, zeilenText(a.antwort), zeilenText(f.richtig));
        var olZ = el('ol', 'zeilen-loesung');
        f.zeilen.forEach(function (text, j) {
          var nrZ = j + 1;
          var soll = f.richtig.indexOf(nrZ) !== -1;
          var gewaehlt = a.antwort.indexOf(nrZ) !== -1;
          var z = el('li', soll ? 'richtig' : (gewaehlt ? 'falsch' : ''));
          z.appendChild(el('span', 'marke', soll ? '✓' : (gewaehlt ? '✗' : '')));
          z.appendChild(el('span', 'zeilen-nr', String(nrZ)));
          z.appendChild(document.createTextNode(' '));
          z.appendChild(formatiert('span', null, text));
          olZ.appendChild(z);
        });
        li.appendChild(olZ);
      } else if (a.typ === 'mehrfach') {
        var ulM = el('ul', 'mehrfach-loesung');
        a.optionen.forEach(function (o, j) {
          var gewaehlt = a.antwort.indexOf(j) !== -1;
          var z = el('li', o.richtig ? 'richtig' : (gewaehlt ? 'falsch' : ''));
          z.appendChild(el('span', 'marke', o.richtig ? '✓' : (gewaehlt ? '✗' : '')));
          z.appendChild(formatiert('span', null, o.text));
          if (o.richtig && !gewaehlt) z.appendChild(el('span', 'ihre', ' ' + T.nichtGewaehlt));
          if (!o.richtig && gewaehlt) z.appendChild(el('span', 'ihre', ' ' + T.falschGewaehlt));
          ulM.appendChild(z);
        });
        li.appendChild(ulM);
      }
      if (f.erklaerung) li.appendChild(formatiert('p', 'erklaerung', f.erklaerung));
      ol.appendChild(li);
    });
    box.appendChild(ol);
    m.appendChild(box);
  }

  /* ---------- Laden ---------- */
  kopfSetzen();
  LK.ausstehendeSenden();
  if (LK.challengeAn(SATZ)) LK.nutzungZaehlen(SATZ, 'challenge');

  function fragenLaden() {
    var s = document.createElement('script');
    s.src = '../' + L.ordner + '/fragen.js';
    s.onload = function () {
      var d = window.CHALLENGE_FRAGEN;
      if (!d || !d.themen || !d.themen.length) { zeigeMeldung(T.challengeLaedtNicht); return; }
      DATEN = d;
      zeigeStart();
    };
    s.onerror = function () { zeigeMeldung(T.challengeLaedtNicht); };
    document.head.appendChild(s);
  }

  if (!L) zeigeMeldung(T.unbekannt);
  else if (!LK.challengeAn(SATZ)) zeigeMeldung(T.challengeAus);
  else fragenLaden();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* ohne Offline-Speicher weiter */ });
    });
  }

  /* ---------- Schnittstelle für die automatischen Tests ---------- */
  window.KlausurChallenge = {
    ziehen: ziehen,
    vorbereiten: vorbereiten,
    zeitbonus: zeitbonus,
    auswerten: auswerten,
    punkteFuer: punkteFuer,
    zahlLesen: zahlLesen,
    aufgabe: function () { return aufgaben[nr]; },
    aufgaben: function () { return aufgaben; },
    ergebnis: function () { return ergebnis; },
    daten: function () { return DATEN; },
    themenAuswerten: function () { return themenAuswerten(); }
  };
})();
