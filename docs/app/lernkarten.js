/* Lernkarten – Programmlogik und Aufbau der Seite (für alle Kartensätze gemeinsam).
 * Die Texte eines Kartensatzes stehen in dessen Ordner in karten.js. */
(function () {
  'use strict';

  /* ---------- Aufbau der Seite ---------- */
  var VORLAGE = `

<!-- ============ Übersicht ============ -->
<div id="ansicht-start" class="ansicht">
  <header class="kopf">
    <p class="kopf-klein" id="untertitel"></p>
    <h1 id="titel"></h1>
    <p class="kopf-klein" id="klausur"></p>
  </header>

  <main class="start-inhalt">
    <section class="gesamt" aria-labelledby="gesamt-text">
      <p class="gesamt-text" id="gesamt-text"></p>
      <div class="balken" aria-hidden="true"><span class="balken-fuellung" id="gesamt-balken"></span></div>
    </section>

    <section class="spiel-box" id="spiel-box" hidden>
      <div class="spiel-kopf">
        <span class="spiel-symbol" aria-hidden="true">🎮</span>
        <h2 id="spiel-titel"></h2>
        <span class="spiel-frei" id="spiel-frei"></span>
      </div>
      <a class="knopf haupt spiel-los" id="spiel-los" hidden></a>
      <p class="spiel-text" id="spiel-text"></p>
      <div class="balken" aria-hidden="true"><span class="balken-fuellung" id="spiel-balken"></span></div>
      <p class="spiel-regel" id="spiel-regel"></p>
    </section>

    <p class="hinweis start-hinweis" id="start-hinweis" hidden></p>

    <label class="schalter">
      <input type="checkbox" id="mischen">
      <span class="schalter-bahn" aria-hidden="true"></span>
      <span id="mischen-text"></span>
    </label>

    <section class="themen-bereich">
      <div class="themen-kopf">
        <h2 id="themen-ueberschrift"></h2>
        <div class="themen-schnell">
          <button type="button" class="text-knopf" id="alle-themen"></button>
          <span aria-hidden="true">·</span>
          <button type="button" class="text-knopf" id="keine-themen"></button>
        </div>
      </div>
      <ul class="themen" id="themen"></ul>
    </section>

    <footer class="fuss">
      <p id="bedienung"></p>
      <p id="datenschutz"></p>
      <button type="button" class="text-knopf leise" id="zuruecksetzen"></button>
      <a class="text-knopf leise highscore-link" id="highscore-link" hidden></a>
    </footer>
  </main>

  <div class="start-leiste">
    <button type="button" class="knopf haupt" id="knopf-start"></button>
    <button type="button" class="text-knopf" id="knopf-start-2" hidden></button>
  </div>
</div>

<!-- ============ Lernen ============ -->
<div id="ansicht-lernen" class="ansicht" hidden>
  <div class="lern-kopf">
    <button type="button" class="symbol-knopf" id="knopf-schliessen">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      <span class="nur-vorlesen" id="schliessen-text"></span>
    </button>
    <div class="zaehler-block">
      <p class="zaehler" id="zaehler"></p>
      <p class="spiel-rest" id="spiel-rest" hidden></p>
    </div>
    <button type="button" class="symbol-knopf" id="knopf-zurueck">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>
      <span class="nur-vorlesen" id="zurueck-text"></span>
    </button>
  </div>
  <div class="balken duenn" aria-hidden="true"><span class="balken-fuellung" id="runden-balken"></span></div>

  <main class="buehne" id="buehne">
    <div class="karte" id="karte" role="button" tabindex="0">
      <div class="karte-innen">
        <section class="seite vorne" id="seite-vorne">
          <p class="seiten-kopf" id="vorne-kopf"></p>
          <div class="seiten-inhalt">
            <p class="kompetenz" id="vorne-text"></p>
            <p class="fall" id="vorne-fall" hidden></p>
          </div>
          <p class="umdreh-hinweis"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v5h-5"/></svg><span id="umdreh-text"></span></p>
        </section>
        <section class="seite hinten" id="seite-hinten" aria-hidden="true">
          <p class="seiten-kopf" id="hinten-kopf"></p>
          <div class="seiten-inhalt antwort" id="hinten-text"></div>
          <p class="hinweis" id="hinten-hinweis" hidden></p>
        </section>
      </div>
      <span class="wisch-marke links" id="marke-links" aria-hidden="true"></span>
      <span class="wisch-marke rechts" id="marke-rechts" aria-hidden="true"></span>
    </div>
  </main>

  <div class="lern-leiste">
    <button type="button" class="knopf nochnicht" id="knopf-nochnicht">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>
      <span id="nochnicht-text"></span>
      <span class="anzahl" id="anzahl-nochnicht">0</span>
    </button>
    <button type="button" class="knopf gewusst" id="knopf-gewusst">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
      <span id="gewusst-text"></span>
      <span class="anzahl" id="anzahl-gewusst">0</span>
    </button>
  </div>
</div>

<!-- ============ Ergebnis einer Runde ============ -->
<div id="ansicht-ergebnis" class="ansicht" hidden>
  <div class="lern-kopf">
    <button type="button" class="symbol-knopf" id="ergebnis-schliessen">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      <span class="nur-vorlesen" id="ergebnis-schliessen-text"></span>
    </button>
    <p class="zaehler"></p>
    <button type="button" class="symbol-knopf" id="ergebnis-zurueck">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>
      <span class="nur-vorlesen" id="ergebnis-zurueck-text"></span>
    </button>
  </div>
  <main class="ergebnis">
    <h1 id="ergebnis-titel" tabindex="-1"></h1>
    <p class="ergebnis-zahl" id="ergebnis-zahl"></p>
    <div class="balken zweifarbig" aria-hidden="true">
      <span class="balken-fuellung" id="ergebnis-gruen"></span><span class="balken-rest" id="ergebnis-orange"></span>
    </div>
    <p class="ergebnis-gesamt" id="ergebnis-gesamt"></p>
    <div class="ergebnis-spiel" id="ergebnis-spiel" hidden>
      <p id="ergebnis-spiel-text"></p>
      <a class="knopf haupt spiel-los" id="ergebnis-spiel-los"></a>
    </div>
    <div class="ergebnis-knoepfe">
      <button type="button" class="knopf haupt" id="knopf-wiederholen"></button>
      <button type="button" class="knopf zweit" id="knopf-alle"></button>
      <button type="button" class="text-knopf" id="knopf-uebersicht"></button>
    </div>
  </main>
</div>

<p class="nur-vorlesen" id="ansage" aria-live="polite"></p>
<p class="toast" id="toast" role="status" hidden></p>

<!-- ============ Gratulation: Spielrunde freigeschaltet ============ -->
<div class="belohnung" id="belohnung" role="dialog" aria-modal="true" aria-labelledby="belohnung-titel" hidden>
  <div class="konfetti" id="konfetti" aria-hidden="true"></div>
  <div class="belohnung-inhalt">
    <div class="belohnung-symbol" aria-hidden="true">🏆</div>
    <h2 id="belohnung-titel"></h2>
    <p class="belohnung-text" id="belohnung-text"></p>
    <p class="belohnung-mehr" id="belohnung-mehr" hidden></p>
    <a class="knopf belohnung-start" id="belohnung-start"></a>
    <button type="button" class="knopf belohnung-spaeter" id="belohnung-spaeter"></button>
    <p class="belohnung-hinweis" id="belohnung-hinweis"></p>
  </div>
</div>
`;
  document.body.insertAdjacentHTML('afterbegin', VORLAGE);

  var D = window.LERNKARTEN;
  var T = D.texte;
  var SCHLUESSEL = 'lernkarten:' + (D.speicherName || 'standard');

  // Spielrunden „Diabetes Run!“ (Einstellungen in einstellungen.js, Funktionen in highscore.js)
  var LK = window.LK;
  var SATZ = D.speicherName || 'standard';
  var SPIEL = !!(LK && LK.spielAn(SATZ));
  var ST = SPIEL ? LK.T : {};
  var PRO_SPIEL = SPIEL ? Math.max(1, Math.floor(LK.E.durchgaengeProSpiel || 1)) : 1;

  /* ---------- Hilfen ---------- */
  function $(id) { return document.getElementById(id); }

  function ersetzen(text, werte) {
    return String(text).replace(/\{(\w+)\}/g, function (_, k) { return werte[k] !== undefined ? werte[k] : ''; });
  }

  // Kurzer Fingerabdruck eines Textes (für stabile Karten-Kennungen)
  function kennung(text) {
    var h = 5381;
    for (var i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  function maskieren(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // **fett**, *kursiv*, Zeilenumbruch (\n oder <br>)
  function formatieren(text) {
    return maskieren(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/&lt;br\s*\/?&gt;|\n/g, '<br>');
  }

  function mischen(liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function wenigerBewegung() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- Karten vorbereiten ---------- */
  var THEMEN = [];
  var KARTEN = {};     // id → Karte
  var REIHENFOLGE = []; // alle ids in der Reihenfolge der Ich-kann-Liste

  D.themen.forEach(function (t) {
    var ab = t.ab ? [].concat(t.ab) : null;
    // titel (falls angegeben) ersetzt die AB-Titel in der Liste und auf den Karten
    var name = t.titel || ab.join(' / ');
    var thema = {
      id: 't' + kennung(name),
      name: name,
      kopf: t.titel || 'AB „' + ab.join('“ / „') + '“',
      karten: []
    };
    t.karten.forEach(function (k) {
      var id = 'k' + kennung(k.vorne + '|' + (k.fall || ''));
      if (KARTEN[id]) { id += '-' + REIHENFOLGE.length; } // gleiche Vorderseite doppelt: trotzdem eindeutig
      var karte = { id: id, thema: thema, daten: k };
      KARTEN[id] = karte;
      REIHENFOLGE.push(id);
      thema.karten.push(id);
    });
    THEMEN.push(thema);
  });

  /* ---------- Speicher (alles abgesichert: Seite läuft auch ohne) ---------- */
  var lager = null;
  try {
    lager = window.localStorage;
    lager.setItem('__probe__', '1');
    lager.removeItem('__probe__');
  } catch (e) { lager = null; }

  // zaehler: wie oft jede Karte umgedreht und bewertet wurde (für die Spielrunden)
  var zustand = { stand: {}, abgewaehlt: [], mischen: false, runde: null, zaehler: {} };
  try {
    var roh = lager && lager.getItem(SCHLUESSEL);
    var gelesen = roh ? JSON.parse(roh) : null;
    if (gelesen && typeof gelesen === 'object') {
      if (gelesen.stand && typeof gelesen.stand === 'object') zustand.stand = gelesen.stand;
      if (Array.isArray(gelesen.abgewaehlt)) zustand.abgewaehlt = gelesen.abgewaehlt;
      zustand.mischen = !!gelesen.mischen;
      if (gelesen.zaehler && typeof gelesen.zaehler === 'object') zustand.zaehler = gelesen.zaehler;
      zustand.runde = rundePruefen(gelesen.runde);
    }
  } catch (e) { /* beschädigter Speicher → neu beginnen */ }

  function speichern() {
    if (!lager) return;
    try { lager.setItem(SCHLUESSEL, JSON.stringify(zustand)); } catch (e) { /* voll oder gesperrt */ }
  }

  // Gespeicherte Runde an geänderte karten.js anpassen
  function rundePruefen(r) {
    if (!r || !Array.isArray(r.ids)) return null;
    var ergebnis = (r.ergebnis && typeof r.ergebnis === 'object') ? r.ergebnis : {};
    var ids = r.ids.filter(function (id) { return KARTEN[id]; });
    if (!ids.length) return null;
    var pos = ids.filter(function (id) { return ergebnis[id]; }).length;
    var verlauf = Array.isArray(r.verlauf) ? r.verlauf.filter(function (v) { return v && KARTEN[v.id]; }) : [];
    return { ids: ids, pos: Math.min(pos, ids.length), ergebnis: ergebnis, verlauf: verlauf };
  }

  function rundeLaeuft() {
    return !!(zustand.runde && zustand.runde.pos < zustand.runde.ids.length);
  }

  function themaGewaehlt(thema) { return zustand.abgewaehlt.indexOf(thema.id) === -1; }

  function gewaehlteKarten() {
    var ids = [];
    THEMEN.forEach(function (t) { if (themaGewaehlt(t)) ids = ids.concat(t.karten); });
    return ids;
  }

  function gewusst(ids) {
    return ids.filter(function (id) { return zustand.stand[id] === 'g'; }).length;
  }

  /* ---------- Spielrunden: Jede Karte, die umgedreht und bewertet wurde, zählt –
     egal ob „gewusst“ oder „noch nicht“. Ein Durchgang ist vollständig, wenn jede
     Karte des Satzes einmal gezählt wurde. ---------- */
  function durchgaenge() {
    var min = Infinity;
    for (var i = 0; i < REIHENFOLGE.length; i++) min = Math.min(min, zustand.zaehler[REIHENFOLGE[i]] || 0);
    return REIHENFOLGE.length ? min : 0;
  }

  // neu verdiente Spielrunden merken; true, wenn gerade eine dazugekommen ist
  function spielrundenPruefen() {
    if (!SPIEL) return false;
    var verdient = Math.floor(durchgaenge() / PRO_SPIEL);
    if (verdient > LK.Runden.verdient(SATZ)) {
      LK.Runden.verdientSetzen(SATZ, verdient);
      return true;
    }
    return false;
  }

  function spielLink() { return '../spiel/?satz=' + encodeURIComponent(SATZ); }

  function freiText(frei) {
    return frei === 1 ? ST.spielFreiEine : ersetzen(ST.spielFreiMehr, { x: frei });
  }

  function spielBoxAktualisieren() {
    if (!SPIEL) return;
    spielrundenPruefen();
    var frei = LK.Runden.frei(SATZ);
    var d = durchgaenge();
    var seit = d % PRO_SPIEL;
    var imDurchgang = REIHENFOLGE.filter(function (id) { return (zustand.zaehler[id] || 0) > d; }).length;
    var gesamt = REIHENFOLGE.length;
    $('spiel-box').hidden = false;
    $('spiel-box').classList.toggle('ist-frei', frei > 0);
    $('spiel-titel').textContent = ST.spielTitel;
    $('spiel-frei').textContent = frei > 0 ? freiText(frei) : '';
    var los = $('spiel-los');
    los.hidden = frei <= 0;
    los.href = spielLink();
    los.textContent = ST.spielLos;
    $('spiel-text').textContent = ersetzen(PRO_SPIEL > 1 ? ST.spielFortschrittMehr : ST.spielFortschritt,
      { d: seit + 1, n: PRO_SPIEL, x: imDurchgang, y: gesamt });
    $('spiel-balken').style.width = (gesamt ? 100 * (seit * gesamt + imDurchgang) / (PRO_SPIEL * gesamt) : 0) + '%';
    $('spiel-regel').textContent = ersetzen(ST.spielRegel, { n: PRO_SPIEL });
  }

  /* ---------- Gratulation (bildschirmfüllend) ---------- */
  var ANGEBOTEN = 'lernkarten:' + SATZ + ':spiel-angeboten'; // so viele Runden wurden schon angekündigt
  var belohnungOffen = false;
  var fokusVorher = null;

  function angeboten() {
    try { var n = lager && JSON.parse(lager.getItem(ANGEBOTEN)); return typeof n === 'number' ? n : 0; } catch (e) { return 0; }
  }

  function belohnungZeigen() {
    if (!SPIEL || belohnungOffen) return;
    var frei = LK.Runden.frei(SATZ);
    if (frei <= 0) return;
    try { if (lager) lager.setItem(ANGEBOTEN, JSON.stringify(LK.Runden.verdient(SATZ))); } catch (e) { /* egal */ }
    $('belohnung-titel').textContent = ST.belohnungTitel;
    $('belohnung-text').textContent = ersetzen(ST.belohnungText, { satz: D.titel });
    $('belohnung-mehr').hidden = frei < 2;
    $('belohnung-mehr').textContent = ersetzen(ST.belohnungMehr, { x: frei });
    $('belohnung-start').textContent = ST.belohnungStart;
    $('belohnung-start').href = spielLink();
    $('belohnung-spaeter').textContent = ST.belohnungSpaeter;
    $('belohnung-hinweis').textContent = ST.belohnungHinweis;
    konfettiStreuen();
    fokusVorher = document.activeElement;
    $('belohnung').hidden = false;
    belohnungOffen = true;
    document.body.classList.add('belohnung-offen');
    $('belohnung-start').focus({ preventScroll: true });
  }

  function belohnungSchliessen() {
    if (!belohnungOffen) return;
    $('belohnung').hidden = true;
    belohnungOffen = false;
    document.body.classList.remove('belohnung-offen');
    if (aktuelleAnsicht === 'start') startAktualisieren();
    if (fokusVorher && fokusVorher.focus) fokusVorher.focus({ preventScroll: true });
  }

  // Runden, die noch nicht angekündigt wurden (z. B. Seite zwischendurch geschlossen)
  function offeneBelohnung() {
    return SPIEL && LK.Runden.frei(SATZ) > 0 && LK.Runden.verdient(SATZ) > angeboten();
  }

  function konfettiStreuen() {
    var k = $('konfetti');
    k.textContent = '';
    if (wenigerBewegung()) return;
    var farben = ['#F2B600', '#8CC4CC', '#FFFFFF', '#E26D5A', '#6FD39A'];
    for (var i = 0; i < 36; i++) {
      var s = document.createElement('span');
      s.style.left = (Math.random() * 100) + '%';
      s.style.background = farben[i % farben.length];
      s.style.animationDelay = (Math.random() * 1.2) + 's';
      s.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
      s.style.transform = 'rotate(' + Math.round(Math.random() * 360) + 'deg)';
      k.appendChild(s);
    }
  }

  var toastZeit = null;
  var tippGezeigt = false;
  function toastZeigen(text) {
    var t = $('toast');
    t.textContent = text;
    t.hidden = false;
    clearTimeout(toastZeit);
    toastZeit = setTimeout(function () { t.hidden = true; }, 3500);
  }

  /* ---------- Ansichten ---------- */
  var ansichten = { start: $('ansicht-start'), lernen: $('ansicht-lernen'), ergebnis: $('ansicht-ergebnis') };
  var aktuelleAnsicht = 'start';

  function zeige(name) {
    aktuelleAnsicht = name;
    Object.keys(ansichten).forEach(function (n) { ansichten[n].hidden = n !== name; });
    window.scrollTo(0, 0);
  }

  function ansagen(text) {
    var a = $('ansage');
    a.textContent = '';
    setTimeout(function () { a.textContent = text; }, 30);
  }

  /* ================= Übersicht ================= */
  function texteEinsetzen() {
    $('titel').textContent = D.titel;
    $('untertitel').textContent = D.untertitel;
    var klasse = LK && LK.klasse();
    $('klausur').textContent = D.klausur + (klasse ? ' · ' + ersetzen(LK.T.klasse, { x: klasse.name }) : '');
    $('themen-ueberschrift').textContent = T.themenWaehlen;
    $('alle-themen').textContent = T.alleThemen;
    $('keine-themen').textContent = T.keineThemen;
    $('mischen-text').textContent = T.mischen;
    $('bedienung').textContent = T.bedienung;
    $('datenschutz').textContent = T.datenschutz;
    $('zuruecksetzen').textContent = T.zuruecksetzen;
    $('schliessen-text').textContent = T.beenden;
    $('ergebnis-schliessen-text').textContent = T.beenden;
    $('zurueck-text').textContent = T.zurueck;
    $('ergebnis-zurueck-text').textContent = T.zurueck;
    $('nochnicht-text').textContent = T.nochNicht;
    $('gewusst-text').textContent = T.gewusst;
    $('umdreh-text').textContent = T.umdrehen;
    $('marke-links').textContent = T.nochNicht;
    $('marke-rechts').textContent = T.gewusst;
    $('knopf-uebersicht').textContent = T.beenden;
    document.title = 'Lernkarten ' + D.titel;
    if (D.hinweis) {
      $('start-hinweis').innerHTML = formatieren(D.hinweis);
      $('start-hinweis').hidden = false;
    }
    if (SPIEL) {
      var h = $('highscore-link');
      h.textContent = ST.highscoreLink;
      h.href = '../highscore/?liste=' + encodeURIComponent(SATZ);
      h.hidden = false;
      $('ergebnis-spiel-los').textContent = ST.spielLos;
      $('ergebnis-spiel-los').href = spielLink();
    }
  }

  function themenAufbauen() {
    var ul = $('themen');
    ul.textContent = '';
    THEMEN.forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'thema';
      var label = document.createElement('label');
      var box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = themaGewaehlt(t);
      box.addEventListener('change', function () {
        var i = zustand.abgewaehlt.indexOf(t.id);
        if (box.checked && i !== -1) zustand.abgewaehlt.splice(i, 1);
        if (!box.checked && i === -1) zustand.abgewaehlt.push(t.id);
        speichern();
        startAktualisieren();
      });
      var titel = document.createElement('span');
      titel.className = 'thema-titel';
      titel.textContent = t.name;
      var stand = document.createElement('span');
      stand.className = 'thema-stand';
      var zahl = document.createElement('span');
      var g = gewusst(t.karten), n = t.karten.length;
      zahl.textContent = ersetzen(T.stand, { x: g, y: n });
      if (g === n) zahl.className = 'fertig';
      var balken = document.createElement('span');
      balken.className = 'balken';
      balken.setAttribute('aria-hidden', 'true');
      var f = document.createElement('span');
      f.className = 'balken-fuellung';
      f.style.width = (n ? (100 * g / n) : 0) + '%';
      balken.appendChild(f);
      stand.appendChild(zahl);
      stand.appendChild(balken);
      label.appendChild(box);
      label.appendChild(titel);
      label.appendChild(stand);
      li.appendChild(label);
      ul.appendChild(li);
    });
  }

  function startAktualisieren() {
    var alle = REIHENFOLGE;
    var g = gewusst(alle);
    $('gesamt-text').textContent = ersetzen(T.gesamt, { x: g, y: alle.length });
    $('gesamt-balken').style.width = (100 * g / alle.length) + '%';
    $('mischen').checked = zustand.mischen;
    spielBoxAktualisieren();

    var gewaehlt = gewaehlteKarten();
    var offen = gewaehlt.length - gewusst(gewaehlt);
    var k1 = $('knopf-start'), k2 = $('knopf-start-2');
    k1.disabled = false;
    k2.hidden = true;

    if (rundeLaeuft()) {
      var r = zustand.runde;
      k1.textContent = T.weiterlernen + ' · ' + ersetzen(T.weiterlernenInfo, { x: r.pos + 1, y: r.ids.length });
      k1.dataset.aktion = 'weiter';
      if (gewaehlt.length) {
        k2.hidden = false;
        if (offen > 0 && offen < gewaehlt.length) {
          k2.textContent = ersetzen(T.nurOffene, { x: offen });
          k2.dataset.aktion = 'offen';
        } else {
          k2.textContent = ersetzen(T.alleNeu, { x: gewaehlt.length });
          k2.dataset.aktion = 'alle';
        }
      }
    } else if (!gewaehlt.length) {
      k1.textContent = T.start;
      k1.disabled = true;
      k1.dataset.aktion = '';
    } else if (offen > 0 && offen < gewaehlt.length) {
      k1.textContent = ersetzen(T.nurOffene, { x: offen });
      k1.dataset.aktion = 'offen';
      k2.hidden = false;
      k2.textContent = ersetzen(T.alleNeu, { x: gewaehlt.length });
      k2.dataset.aktion = 'alle';
    } else {
      k1.textContent = ersetzen(T.alleNeu, { x: gewaehlt.length });
      k1.dataset.aktion = 'alle';
    }
  }

  function zeigeStart() {
    themenAufbauen();
    startAktualisieren();
    zeige('start');
  }

  function startAktion(aktion) {
    if (aktion === 'weiter') { lernenZeigen(); return; }
    if (aktion === 'offen' || aktion === 'alle') rundeStarten(aktion === 'offen' ? 'offen' : 'alle');
  }

  /* ================= Runde ================= */
  function rundeStarten(art, ids) {
    var liste = ids || gewaehlteKarten();
    if (art === 'offen') liste = liste.filter(function (id) { return zustand.stand[id] !== 'g'; });
    if (!liste.length) { zeigeStart(); return; }
    if (zustand.mischen) liste = mischen(liste);
    zustand.runde = { ids: liste, pos: 0, ergebnis: {}, verlauf: [] };
    neuFreigeschaltet = false;
    speichern();
    lernenZeigen();
  }

  function lernenZeigen() {
    zeige('lernen');
    karteZeigen(false);
    $('karte').focus({ preventScroll: true });
  }

  var umgedreht = false;
  var gesehen = false; // Rückseite der aktuellen Karte schon angeschaut? (nur dann zählt sie)
  var neuFreigeschaltet = false;
  var sperre = false; // während der Wegflug-Animation keine weiteren Eingaben

  function karteZeigen(mitAnimation) {
    var r = zustand.runde;
    var karte = KARTEN[r.ids[r.pos]];
    var k = karte.daten;
    var el = $('karte');

    // ohne Dreh-Animation auf die Vorderseite zurück
    el.classList.add('ohne-animation');
    el.classList.remove('umgedreht', 'fliegt', 'zieht', 'zurueckfedern');
    el.style.transform = '';
    markenSetzen(0);
    umgedreht = false;
    gesehen = false;

    $('vorne-kopf').textContent = karte.thema.kopf + (k.nr ? ' · Nr. ' + k.nr : '') + (k.afb ? ' · AFB ' + k.afb : '');
    $('vorne-text').innerHTML = formatieren(k.vorne);
    var fall = $('vorne-fall');
    fall.hidden = !k.fall;
    fall.innerHTML = k.fall ? formatieren(k.fall) : '';

    $('hinten-kopf').textContent = T.rueckseite;
    var hinten = $('hinten-text');
    hinten.textContent = '';
    if (Array.isArray(k.hinten)) {
      var liste = document.createElement(k.nummeriert ? 'ol' : 'ul');
      if (k.nummeriert && k.start) liste.start = k.start;
      k.hinten.forEach(function (punkt) {
        var li = document.createElement('li');
        li.innerHTML = formatieren(punkt);
        liste.appendChild(li);
      });
      hinten.appendChild(liste);
    } else {
      var p = document.createElement('p');
      p.innerHTML = formatieren(k.hinten);
      hinten.appendChild(p);
    }
    var hinweis = $('hinten-hinweis');
    hinweis.hidden = !k.hinweis;
    hinweis.innerHTML = k.hinweis ? formatieren(k.hinweis) : '';

    seitenSichtbarkeit();
    void el.offsetWidth; // Umstellung ohne Animation übernehmen
    el.classList.remove('ohne-animation');

    if (mitAnimation && !wenigerBewegung()) {
      el.classList.remove('erscheint');
      void el.offsetWidth;
      el.classList.add('erscheint');
    }
    lernKopfAktualisieren();
    ansagen($('zaehler').textContent + '. ' + sichtbarerText());
  }

  // Bildschirmleser: nur die sichtbare Seite vorlesen
  function seitenSichtbarkeit() {
    $('seite-vorne').setAttribute('aria-hidden', umgedreht ? 'true' : 'false');
    $('seite-hinten').setAttribute('aria-hidden', umgedreht ? 'false' : 'true');
    var text = sichtbarerText();
    $('karte').setAttribute('aria-label', text + (umgedreht ? '' : ' – ' + T.umdrehen));
    return text;
  }

  function sichtbarerText() {
    var seite = umgedreht ? $('seite-hinten') : $('seite-vorne');
    var teile = [];
    seite.querySelectorAll('.kompetenz, .fall:not([hidden]), li, .antwort > p, .hinweis:not([hidden])').forEach(function (e) {
      teile.push(e.textContent.replace(/\s+/g, ' ').trim());
    });
    return (umgedreht ? T.rueckseite : T.vorderseite) + ': ' + teile.join(' ');
  }

  function lernKopfAktualisieren() {
    var r = zustand.runde;
    $('zaehler').textContent = Math.min(r.pos + 1, r.ids.length) + ' / ' + r.ids.length;
    $('runden-balken').style.width = (100 * r.pos / r.ids.length) + '%';
    var g = 0, n = 0;
    Object.keys(r.ergebnis).forEach(function (id) { if (r.ergebnis[id] === 'g') g++; else n++; });
    $('anzahl-gewusst').textContent = g;
    $('anzahl-nochnicht').textContent = n;
    $('knopf-zurueck').disabled = !r.verlauf.length;
    if (SPIEL) {
      var d = durchgaenge();
      var rest = REIHENFOLGE.filter(function (id) { return (zustand.zaehler[id] || 0) <= d; }).length;
      $('spiel-rest').hidden = false;
      $('spiel-rest').textContent = rest === 1 ? ST.spielRestEine : ersetzen(ST.spielRestMehr, { x: rest });
    }
  }

  function umdrehen() {
    if (sperre || belohnungOffen || aktuelleAnsicht !== 'lernen') return;
    umgedreht = !umgedreht;
    if (umgedreht) gesehen = true;
    $('karte').classList.toggle('umgedreht', umgedreht);
    ansagen(seitenSichtbarkeit());
  }

  function bewerten(wert) {
    if (sperre || belohnungOffen || aktuelleAnsicht !== 'lernen' || !rundeLaeuft()) return;
    var r = zustand.runde;
    var id = r.ids[r.pos];
    r.verlauf.push({ id: id, vorher: zustand.stand[id] || null, gezaehlt: gesehen });
    if (gesehen) zustand.zaehler[id] = (zustand.zaehler[id] || 0) + 1;
    zustand.stand[id] = wert;
    r.ergebnis[id] = wert;
    r.pos++;
    speichern();
    var gratulation = spielrundenPruefen();
    if (gratulation) neuFreigeschaltet = true;
    else if (SPIEL && !gesehen && !tippGezeigt) { tippGezeigt = true; toastZeigen(ST.nichtGezaehlt); }

    var weiter = function () {
      sperre = false;
      if (r.pos >= r.ids.length) ergebnisZeigen();
      else karteZeigen(true);
      if (gratulation) belohnungZeigen();
    };
    if (wenigerBewegung()) { weiter(); return; }
    sperre = true;
    var el = $('karte');
    var richtung = wert === 'g' ? 1 : -1;
    el.classList.remove('zieht', 'zurueckfedern', 'erscheint');
    markenSetzen(richtung * 200);
    el.classList.add('fliegt');
    el.style.transform = 'translateX(' + (richtung * 115) + '%) rotate(' + (richtung * 14) + 'deg)';
    setTimeout(weiter, 230);
  }

  function zuruecknehmen() {
    var r = zustand.runde;
    if (sperre || belohnungOffen || !r || !r.verlauf.length) return;
    var v = r.verlauf.pop();
    if (v.vorher) zustand.stand[v.id] = v.vorher; else delete zustand.stand[v.id];
    if (v.gezaehlt && zustand.zaehler[v.id] > 0) zustand.zaehler[v.id]--;
    delete r.ergebnis[v.id];
    r.pos = r.ids.indexOf(v.id);
    speichern();
    zeige('lernen');
    karteZeigen(true);
    $('karte').focus({ preventScroll: true });
  }

  /* ---------- Wischen ---------- */
  var zug = null;
  var SCHWELLE = 90;

  function markenSetzen(dx) {
    var staerke = Math.min(Math.abs(dx) / SCHWELLE, 1);
    $('marke-rechts').style.opacity = dx > 0 ? staerke : 0;
    $('marke-links').style.opacity = dx < 0 ? staerke : 0;
  }

  function zugBeginn(e) {
    if (sperre || belohnungOffen || (e.pointerType === 'mouse' && e.button !== 0)) return;
    zug = { x: e.clientX, y: e.clientY, dx: 0, id: e.pointerId, aktiv: false };
  }

  function zugBewegung(e) {
    if (!zug || e.pointerId !== zug.id) return;
    var dx = e.clientX - zug.x, dy = e.clientY - zug.y;
    if (!zug.aktiv) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy)) return;
      zug.aktiv = true;
      var el0 = $('karte');
      el0.classList.remove('zurueckfedern', 'erscheint');
      el0.classList.add('zieht');
      try { el0.setPointerCapture(e.pointerId); } catch (err) { /* egal */ }
    }
    zug.dx = dx;
    $('karte').style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 22) + 'deg)';
    markenSetzen(dx);
  }

  function zugEnde(e) {
    if (!zug || e.pointerId !== zug.id) return;
    var z = zug;
    zug = null;
    if (!z.aktiv) return; // war ein Tippen → „click“ dreht um
    var el = $('karte');
    el.classList.remove('zieht');
    letzterZug = Date.now();
    if (Math.abs(z.dx) >= SCHWELLE) {
      bewerten(z.dx > 0 ? 'g' : 'n');
    } else {
      el.classList.add('zurueckfedern');
      el.style.transform = '';
      markenSetzen(0);
    }
  }

  function zugAbbruch() {
    if (!zug) return;
    var aktiv = zug.aktiv;
    zug = null;
    if (!aktiv) return;
    var el = $('karte');
    el.classList.remove('zieht');
    el.classList.add('zurueckfedern');
    el.style.transform = '';
    markenSetzen(0);
  }

  var letzterZug = 0;

  /* ================= Ergebnis ================= */
  function ergebnisZeigen() {
    var r = zustand.runde;
    var g = 0;
    r.ids.forEach(function (id) { if (r.ergebnis[id] === 'g') g++; });
    var n = r.ids.length - g;
    $('ergebnis-titel').textContent = n === 0 ? T.allesGewusst : T.rundeFertig;
    $('ergebnis-zahl').textContent = ersetzen(T.ergebnis, { x: g, y: r.ids.length });
    $('ergebnis-gruen').style.width = (100 * g / r.ids.length) + '%';
    $('ergebnis-orange').style.width = (100 * n / r.ids.length) + '%';
    var gesamt = gewusst(REIHENFOLGE);
    $('ergebnis-gesamt').textContent = ersetzen(T.insgesamt, { x: gesamt, y: REIHENFOLGE.length });
    $('ergebnis-gesamt').hidden = r.ids.length === REIHENFOLGE.length && g === gesamt; // sonst doppelt

    var w = $('knopf-wiederholen');
    w.hidden = n === 0;
    w.textContent = n === 1 ? T.wiederholenEine : ersetzen(T.wiederholen, { x: n });
    var a = $('knopf-alle');
    a.textContent = T.nochmalAlle;
    a.className = 'knopf ' + (n === 0 ? 'haupt' : 'zweit');
    $('ergebnis-zurueck').disabled = !r.verlauf.length;
    var frei = SPIEL ? LK.Runden.frei(SATZ) : 0;
    $('ergebnis-spiel').hidden = frei <= 0;
    if (frei > 0) $('ergebnis-spiel-text').textContent = neuFreigeschaltet ? ST.spielNeu : '🎮 ' + freiText(frei);
    zeige('ergebnis');
    $('ergebnis-titel').focus({ preventScroll: true });
  }

  function wiederholen() {
    var r = zustand.runde;
    if (!r) return;
    var ids = r.ids.filter(function (id) { return r.ergebnis[id] !== 'g'; });
    rundeStarten('alle', ids);
  }

  /* ================= Ereignisse ================= */
  texteEinsetzen();

  $('knopf-start').addEventListener('click', function () { startAktion(this.dataset.aktion); });
  $('knopf-start-2').addEventListener('click', function () { startAktion(this.dataset.aktion); });
  $('mischen').addEventListener('change', function () { zustand.mischen = this.checked; speichern(); });
  $('alle-themen').addEventListener('click', function () { zustand.abgewaehlt = []; speichern(); themenAufbauen(); startAktualisieren(); });
  $('keine-themen').addEventListener('click', function () {
    zustand.abgewaehlt = THEMEN.map(function (t) { return t.id; });
    speichern(); themenAufbauen(); startAktualisieren();
  });
  $('zuruecksetzen').addEventListener('click', function () {
    if (!window.confirm(T.zuruecksetzenFrage)) return;
    zustand.stand = {};
    zustand.runde = null;
    speichern();
    zeigeStart();
  });

  var karteEl = $('karte');
  karteEl.addEventListener('click', function () {
    if (Date.now() - letzterZug < 350) return; // Klick nach dem Wischen ignorieren
    umdrehen();
  });
  karteEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); umdrehen(); }
  });
  karteEl.addEventListener('pointerdown', zugBeginn);
  karteEl.addEventListener('pointermove', zugBewegung);
  karteEl.addEventListener('pointerup', zugEnde);
  karteEl.addEventListener('pointercancel', zugAbbruch);
  karteEl.addEventListener('lostpointercapture', function (e) { if (zug && zug.aktiv && e.pointerId === zug.id) zugEnde(e); });

  $('knopf-gewusst').addEventListener('click', function () { bewerten('g'); });
  $('knopf-nochnicht').addEventListener('click', function () { bewerten('n'); });
  $('knopf-zurueck').addEventListener('click', zuruecknehmen);
  $('ergebnis-zurueck').addEventListener('click', zuruecknehmen);
  $('knopf-schliessen').addEventListener('click', zeigeStart);
  $('ergebnis-schliessen').addEventListener('click', zeigeStart);
  $('knopf-uebersicht').addEventListener('click', zeigeStart);
  $('knopf-wiederholen').addEventListener('click', wiederholen);
  $('knopf-alle').addEventListener('click', function () { rundeStarten('alle'); });

  $('belohnung-spaeter').addEventListener('click', belohnungSchliessen);

  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (belohnungOffen) {
      if (e.key === 'Escape') { e.preventDefault(); belohnungSchliessen(); }
      return;
    }
    if (aktuelleAnsicht === 'lernen') {
      var aufKnopf = e.target && e.target.tagName === 'BUTTON';
      if (e.key === 'ArrowRight') { e.preventDefault(); bewerten('g'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); bewerten('n'); }
      else if (e.key === ' ' && !aufKnopf && e.target !== karteEl) { e.preventDefault(); umdrehen(); }
      else if (e.key === 'Backspace') { e.preventDefault(); zuruecknehmen(); }
      else if (e.key === 'Escape') { zeigeStart(); }
    } else if (aktuelleAnsicht === 'ergebnis' && e.key === 'Escape') {
      zeigeStart();
    }
  });

  zeigeStart();
  if (offeneBelohnung()) belohnungZeigen();

  // Zurück aus dem Spiel (Zurück-Taste, Wechsel der App): Spielstand neu anzeigen
  window.addEventListener('pageshow', function (e) { if (e.persisted && aktuelleAnsicht === 'start') startAktualisieren(); });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && aktuelleAnsicht === 'start') startAktualisieren();
  });

  // Punkte, die offline erspielt wurden, jetzt in die Highscore-Liste nachtragen
  if (SPIEL) LK.ausstehendeSenden();

  /* ---------- Offline-Speicher (Lernkarten und – damit eine Spielrunde auch ohne Netz startet – das Spiel) ---------- */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* ohne Offline-Speicher weiter */ });
      if (SPIEL) navigator.serviceWorker.register('../spiel/sw.js', { scope: '../spiel/' }).catch(function () { /* egal */ });
    });
  }
})();
