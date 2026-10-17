/* Highscore-Seite: zeigt die Liste je Kartensatz (Reiter) und – nur mit dem geheimen
 * Link der Lehrkraft – den Knopf zum Zurücksetzen:
 *   …/highscore/?liste=kb1-diabetes&zuruecksetzen=SCHLÜSSEL */
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
  // Schlüssel sofort aus der Adresszeile entfernen (nicht im Verlauf, nicht beim Teilen)
  if (schluessel && history.replaceState) history.replaceState(null, '', location.pathname + '?liste=' + encodeURIComponent(aktiv.kennung));

  $('titel').textContent = T.highscoreTitel;
  $('untertitel').textContent = T.highscoreUntertitel;
  $('link-uebersicht').textContent = T.zurUebersicht;
  document.title = T.highscoreTitel + ' – ' + T.spielTitel;

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

  function waehlen(l) {
    aktiv = l;
    LISTEN.forEach(function (x) { $('reiter-' + x.kennung).setAttribute('aria-selected', x === l ? 'true' : 'false'); });
    if (history.replaceState) history.replaceState(null, '', location.pathname + '?liste=' + encodeURIComponent(l.kennung));
    $('liste-titel').textContent = l.titel;
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
    var l = aktiv;
    LK.ausstehendeSenden().then(function () { return LK.listeLaden(l.kennung); }).then(function (r) {
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
    $('liste-status').textContent = eintraege.length ? '' : T.highscoreLeer;
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
    $('liste-hinweis').textContent = eintraege.length ? T.highscoreHinweis : '';
  }

  /* ---------- Zurücksetzen (nur Lehrkraft) ---------- */
  function zuruecksetzenZeigen() {
    var box = $('zuruecksetzen');
    box.hidden = !schluessel;
    if (!schluessel) return;
    $('zuruecksetzen-titel').textContent = T.zuruecksetzenTitel;
    $('zuruecksetzen-text').textContent = LK.ersetzen(T.zuruecksetzenText, { satz: aktiv.titel });
    $('zuruecksetzen-knopf').textContent = LK.ersetzen(T.zuruecksetzenKnopf, { satz: aktiv.kurz || aktiv.titel });
    $('zuruecksetzen-knopf').disabled = false;
    $('zuruecksetzen-status').textContent = '';
  }

  $('zuruecksetzen-knopf').addEventListener('click', function () {
    var l = aktiv;
    if (!window.confirm(LK.ersetzen(T.zuruecksetzenFrage, { satz: l.titel }))) return;
    var knopf = this;
    knopf.disabled = true;
    $('zuruecksetzen-status').textContent = T.highscoreLaedt;
    LK.zuruecksetzen(l.kennung, schluessel).then(function (r) {
      if (!r || !r.ok) throw new Error((r && r.fehler) || 'Fehler');
      $('zuruecksetzen-status').textContent = LK.ersetzen(T.zurueckgesetzt, { satz: l.titel });
      laden();
    }).catch(function (e) {
      knopf.disabled = false;
      $('zuruecksetzen-status').textContent = LK.ersetzen(T.zuruecksetzenFehler, { x: e.message });
    });
  });

  waehlen(aktiv);
})();
