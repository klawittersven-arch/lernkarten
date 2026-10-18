/* Highscore-Seite: zeigt die Liste je Kartensatz (Reiter), getrennt nach Spiel und
 * Klausur-Challenge (&art=challenge), und – nur mit dem geheimen Link der Lehrkraft –
 * den Knopf zum Zurücksetzen:
 *   …/highscore/?liste=kb1-diabetes&zuruecksetzen=SCHLÜSSEL
 *   …/highscore/?liste=kb1-diabetes&art=challenge&zuruecksetzen=SCHLÜSSEL */
(function () {
  'use strict';

  var LK = window.LK;
  var T = LK.T;
  var LISTEN = LK.E.listen || [];
  function $(id) { return document.getElementById(id); }

  var q = null;
  try { q = new URLSearchParams(location.search); } catch (e) { /* alter Browser */ }
  var aktiv = (q && LK.liste(q.get('liste'))) || LISTEN[0];
  var schluessel = q && q.get('zuruecksetzen');
  var KLASSE = LK.klasse();
  // '' = Spiel „Diabetes Run!“, 'challenge' = Klausur-Challenge
  // (eine Adresse mit &art=challenge zeigt immer die Challenge-Liste – wichtig für den Zurücksetzen-Link)
  var art = q && q.get('art') === 'challenge' ? 'challenge' : '';
  var CHALLENGE = !!art || LISTEN.some(function (l) { return LK.challengeAn(l.kennung); });
  function adresse(l) {
    return location.pathname + '?liste=' + encodeURIComponent(l.kennung) + (art ? '&art=' + art : '') +
      (KLASSE ? '&klasse=' + encodeURIComponent(KLASSE.kennung) : '');
  }
  // Schlüssel sofort aus der Adresszeile entfernen (nicht im Verlauf, nicht beim Teilen)
  if (schluessel && history.replaceState) history.replaceState(null, '', adresse(aktiv));

  $('titel').textContent = T.highscoreTitel;
  $('link-uebersicht').textContent = T.zurUebersicht;
  function kopfSetzen() {
    $('untertitel').textContent = (art ? T.highscoreUntertitelChallenge : T.highscoreUntertitel) +
      (KLASSE ? ' · ' + LK.ersetzen(T.klasse, { x: KLASSE.name }) : '');
    document.title = T.highscoreTitel + ' – ' + (art ? T.challengeTitel : T.titel);
  }

  var eigenerName = (function () {
    var n = LK.nameLesen();
    return n ? LK.anzeigeName(n.vorname, n.initial).toLowerCase() : '';
  })();

  /* ---------- Reiter ---------- */
  var reiter = $('reiter');
  LISTEN.forEach(function (l) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.id = 'reiter-' + l.kennung;
    b.textContent = l.kurz || l.titel;
    b.addEventListener('click', function () { waehlen(l); });
    reiter.appendChild(b);
  });
  reiter.hidden = LISTEN.length < 2;

  // Reiter Spiel / Klausur-Challenge (nur, wenn die Challenge freigeschaltet ist)
  var reiterArt = $('reiter-art');
  [['', T.reiterSpiel], ['challenge', T.reiterChallenge]].forEach(function (a) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.id = 'reiter-art-' + (a[0] || 'spiel');
    b.textContent = a[1];
    b.addEventListener('click', function () { art = a[0]; waehlen(aktiv); });
    reiterArt.appendChild(b);
  });
  reiterArt.hidden = !CHALLENGE;

  function waehlen(l) {
    aktiv = l;
    LISTEN.forEach(function (x) { $('reiter-' + x.kennung).setAttribute('aria-selected', x === l ? 'true' : 'false'); });
    $('reiter-art-spiel').setAttribute('aria-selected', art ? 'false' : 'true');
    $('reiter-art-challenge').setAttribute('aria-selected', art ? 'true' : 'false');
    kopfSetzen();
    if (history.replaceState) history.replaceState(null, '', adresse(l));
    $('liste-titel').textContent = l.titel + (art ? ' – ' + T.challengeTitel : '') + (KLASSE ? ' · ' + KLASSE.name : '');
    $('link-lernkarten').textContent = LK.ersetzen(T.zuDenLernkartenSatz, { satz: l.kurz || l.titel });
    $('link-lernkarten').href = '../' + l.ordner + '/';
    zuruecksetzenZeigen();
    laden();
  }

  /* ---------- Liste ---------- */
  var anfrage = 0;
  function laden() {
    var nr = ++anfrage;
    var ol = $('liste');
    ol.textContent = '';
    $('liste-hinweis').textContent = '';
    if (!LK.eingerichtet()) { $('liste-status').textContent = T.highscoreNichtEingerichtet; return; }
    $('liste-status').textContent = T.highscoreLaedt;
    var l = aktiv, a = art;
    LK.ausstehendeSenden().then(function () { return LK.listeLaden(l.kennung, a); }).then(function (r) {
      if (nr !== anfrage) return;
      if (!r || !r.ok) throw new Error((r && r.fehler) || 'Fehler');
      zeigen(r.eintraege || []);
    }).catch(function () {
      if (nr !== anfrage) return;
      $('liste-status').textContent = T.highscoreFehler;
    });
  }

  var MEDAILLE = ['🥇', '🥈', '🥉'];
  function zeigen(eintraege) {
    var ol = $('liste');
    ol.textContent = '';
    $('liste-status').textContent = eintraege.length ? '' : (art ? T.highscoreLeerChallenge : T.highscoreLeer);
    eintraege.forEach(function (e, i) {
      var li = document.createElement('li');
      if (eigenerName && String(e.name).toLowerCase() === eigenerName) li.className = 'eigener';
      var platz = document.createElement('span');
      platz.className = 'platz';
      platz.textContent = i < 3 ? MEDAILLE[i] : (i + 1) + '.';
      platz.setAttribute('aria-label', T.platz + ' ' + (i + 1));
      var name = document.createElement('span');
      name.className = 'name';
      name.textContent = e.name;
      var punkte = document.createElement('span');
      punkte.className = 'punkte';
      punkte.textContent = e.punkte;
      li.appendChild(platz);
      li.appendChild(name);
      li.appendChild(punkte);
      ol.appendChild(li);
    });
    $('liste-hinweis').textContent = eintraege.length ? (art ? T.highscoreHinweisChallenge : T.highscoreHinweis) : '';
  }

  /* ---------- Zurücksetzen (nur Lehrkraft) ---------- */
  function zuruecksetzenZeigen() {
    var box = $('zuruecksetzen');
    box.hidden = !schluessel;
    if (!schluessel) return;
    $('zuruecksetzen-titel').textContent = T.zuruecksetzenTitel;
    $('zuruecksetzen-text').textContent = LK.ersetzen(T.zuruecksetzenText, { satz: LK.listenName(aktiv.kennung, art) });
    $('zuruecksetzen-knopf').textContent = LK.ersetzen(T.zuruecksetzenKnopf, { satz: LK.listenName(aktiv.kennung, art) });
    $('zuruecksetzen-knopf').disabled = false;
    $('testeintrag-knopf').textContent = T.testeintragKnopf;
    $('zuruecksetzen-status').textContent = '';
  }

  // Prüft die ganze Strecke Handy → Google-Tabelle → Liste, ohne eine Spielrunde zu brauchen
  $('testeintrag-knopf').addEventListener('click', function () {
    var l = aktiv;
    $('zuruecksetzen-status').textContent = T.highscoreLaedt;
    LK.testEintragen(l.kennung, art).then(function (r) {
      if (!r || !r.ok) throw new Error((r && r.fehler) || 'Fehler');
      $('zuruecksetzen-status').textContent = LK.ersetzen(T.testeintragOk, { x: r.platz });
      laden();
    }).catch(function (e) {
      $('zuruecksetzen-status').textContent = LK.ersetzen(T.testeintragFehler, { x: e.message });
    });
  });

  $('zuruecksetzen-knopf').addEventListener('click', function () {
    var l = aktiv, a = art;
    if (!window.confirm(LK.ersetzen(T.zuruecksetzenFrage, { satz: LK.listenName(l.kennung, a) }))) return;
    var knopf = this;
    knopf.disabled = true;
    $('zuruecksetzen-status').textContent = T.highscoreLaedt;
    LK.zuruecksetzen(l.kennung, schluessel, a).then(function (r) {
      if (!r || !r.ok) throw new Error((r && r.fehler) || 'Fehler');
      $('zuruecksetzen-status').textContent = LK.ersetzen(T.zurueckgesetzt, { satz: LK.listenName(l.kennung, a) });
      laden();
    }).catch(function (e) {
      knopf.disabled = false;
      $('zuruecksetzen-status').textContent = LK.ersetzen(T.zuruecksetzenFehler, { x: e.message });
    });
  });

  waehlen(aktiv);
})();
