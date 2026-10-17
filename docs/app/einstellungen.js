/* =====================================================================
 * EINSTELLUNGEN – Spielrunden „Diabetes Run!“ und Highscore-Listen
 * (gilt für alle Kartensätze)
 * =====================================================================
 * Ändern Sie nur die Werte rechts vom Doppelpunkt.
 * Texte stehen zwischen einfachen Hochkommas ' … ', Zahlen ohne.
 * ===================================================================== */

var EINSTELLUNGEN = {

  // Spielrunden und Highscore ein- (true) oder ausschalten (false)
  spielAn: true,

  // Adresse der Highscore-Liste: die Web-App-Adresse aus Google Apps Script
  // (endet auf /exec). Leer lassen ('') = Liste noch nicht eingerichtet;
  // erreichte Punkte werden dann auf dem Handy aufbewahrt und später nachgetragen.
  highscoreAdresse: 'https://script.google.com/macros/s/AKfycbyZULtysjGijW52hK62WO2nJ4G0T1PjmzFE1ZCm6fIPKS9lwjl37M8jbkv5sHzyaTB7Cg/exec',

  // Nach so vielen vollständigen Durchgängen durch einen Kartensatz gibt es eine Spielrunde.
  // Ein Durchgang ist vollständig, wenn jede Karte des Satzes einmal umgedreht und bewertet wurde.
  // Bei einer Änderung auch die Texte spielRegel und gesperrt unten anpassen.
  durchgaengeProSpiel: 1,

  // Eine Highscore-Liste je Kartensatz. kennung = speicherName in karten.js,
  // ordner = Ordner des Kartensatzes in docs/
  listen: [
    { kennung: 'kb1-diabetes', ordner: 'kb1-diabetes', titel: 'KB I – Diabetes mellitus', kurz: 'KB I' },
    { kennung: 'kb2-beratung', ordner: 'kb2-beratung', titel: 'KB II – Beratung', kurz: 'KB II' }
  ],

  // Einfacher Filter für Vornamen: Enthält ein Name eines dieser Wörter (auch mit
  // Leerzeichen oder Ziffern wie „4“ statt „a“ dazwischen), wird er abgelehnt.
  // Beliebig ergänzbar – nur Kleinbuchstaben verwenden. (Die gleiche Liste steht
  // im Google-Apps-Script, damit der Filter auch dort greift.)
  sperrwoerter: [
    'arsch', 'fick', 'fotze', 'hure', 'nutte', 'wichs', 'schlampe', 'bitch',
    'fuck', 'shit', 'scheis', 'kacke', 'pisse', 'penis', 'pimmel', 'schwanz',
    'muschi', 'vagina', 'titte', 'porn', 'sex', 'nazi', 'hitler',
    'neger', 'nigg', 'kanake', 'zigeuner', 'schwuchtel', 'spast', 'mongo',
    'behindert', 'missgeburt', 'bastard', 'wixer', 'wixxer', 'opfer',
    'dick', 'cock', 'pussy', 'slut', 'whore', 'cunt', 'kill'
  ],

  /* ---------- Texte ---------- */
  texte: {
    // Kasten auf der Startseite der Lernkarten
    spielTitel: 'Belohnungsspiel: Diabetes Run!',
    spielFreiEine: '1 Spielrunde frei!',
    spielFreiMehr: '{x} Spielrunden frei!',
    spielLos: 'Jetzt spielen',
    spielFortschritt: 'Bis zur nächsten Runde: {x} von {y} Karten',
    spielFortschrittMehr: 'Bis zur nächsten Runde: Durchgang {d} von {n} · {x} von {y} Karten',  // wenn durchgaengeProSpiel > 1
    spielRegel: 'Jedes Mal, wenn Sie alle Karten einmal durchgegangen sind, dürfen Sie zur Belohnung eine Runde spielen und sich in die Highscore-Liste eintragen! Es zählt jede umgedrehte Karte – egal, ob gewusst oder nicht.',
    spielNeu: '🎮 Neue Spielrunde freigeschaltet!',
    spielRestEine: '🎮 noch 1 Karte bis zur Spielrunde',
    spielRestMehr: '🎮 noch {x} Karten bis zur Spielrunde',
    nichtGezaehlt: 'Tipp: Für die Spielrunde zählt eine Karte nur, wenn Sie sie vorher umgedreht haben.',

    // Gratulation (bildschirmfüllend), sobald alle Karten einmal durchgegangen sind
    belohnungTitel: 'Super!',
    belohnungText: 'Sie sind alle Lernkarten von „{satz}“ einmal durchgegangen. Zur Belohnung dürfen Sie jetzt eine Runde „Diabetes Run!“ spielen und sich in die Highscore-Liste eintragen!',
    belohnungMehr: 'Sie haben {x} Spielrunden frei.',
    belohnungStart: '🎮 Jetzt spielen',
    belohnungSpaeter: 'Nein, danke – weiterlernen',
    belohnungHinweis: 'Die Runde bleibt gespeichert – Sie können sie auch später über „Jetzt spielen“ auf der Startseite starten.',
    highscoreLink: '🏆 Highscore-Liste',

    // Spielseite
    titel: 'KBS Diabetes Run!',
    logoAlt: 'Logo der Schule',
    spielidee: 'Diese Hohenloher Pflegekraft ist auf Tour durchs schöne Ländle, doch der Zeitplan ist eng – und es lauern zahlreiche Gefahren, nicht nur für ihren Blutzucker! Verlockende Kuchen, Weinkisten, Rollatoren, Pflegewagen und Schlaglöcher überspringen, unter Wespenschwärmen durchducken, und für den Lkw braucht es einen Doppelsprung. Ab 30 Sekunden geht’s erst richtig los!',
    freiEine: 'Sie haben 1 Spielrunde frei ({satz}).',
    freiMehr: 'Sie haben {x} Spielrunden frei ({satz}).',
    losHinweis: '„Los geht’s!“ startet die Runde – danach ist sie verbraucht.',
    gesperrtTitel: 'Noch keine Spielrunde frei',
    gesperrt: 'Jedes Mal, wenn Sie alle Lernkarten von „{satz}“ einmal durchgegangen sind, dürfen Sie zur Belohnung eine Runde spielen. Es zählt jede umgedrehte Karte – egal, ob gewusst oder nicht.',
    unbekannt: 'Diesen Kartensatz gibt es nicht.',
    los: 'Los geht’s!',
    nochmal: 'Noch eine Runde ({x} frei)',
    zuDenLernkarten: 'Zurück zu den Lernkarten',
    highscoreAnsehen: 'Highscore-Liste ansehen',
    gameOver: 'Game over',
    punkte: 'Punkte: {x}',
    bestleistung: 'Ihre Bestleistung: {x}',
    neueBestleistung: 'Neue Bestleistung!',
    pausiert: 'Pause – tippen Sie hier, um weiterzuspielen.',
    steuerungHandy: 'Tippen Sie unten auf „⬆ Springen“ oder „⬇ Ducken“. In der Luft noch einmal springen = Doppelsprung.',
    steuerungTastatur: 'Tastatur: Leertaste oder Pfeil hoch = springen, Pfeil runter = ducken.',
    knopfDucken: '⬇ Ducken',
    knopfSpringen: '⬆ Springen',

    // Eintragen in die Highscore-Liste
    eintragenTitel: 'In die Highscore-Liste eintragen',
    vorname: 'Vorname',
    initial: 'Erster Buchstabe des Nachnamens',
    nameHinweis: 'Auf der Liste erscheint z. B. „Mia S.“ – sichtbar für alle, die die Lernkarten nutzen. Gespeichert werden nur Name und Punkte, bis die Lehrkraft die Liste zurücksetzt.',
    eintragen: 'Eintragen',
    nichtEintragen: 'Nicht eintragen',
    fehlerVorname: 'Bitte Ihren Vornamen eingeben (2 bis 20 Buchstaben).',
    fehlerInitial: 'Bitte genau einen Buchstaben eingeben.',
    fehlerWort: 'Bitte geben Sie Ihren echten Vornamen ein.',
    wirdEingetragen: 'Wird eingetragen …',
    eingetragen: 'Eingetragen: Platz {x} in der Liste {satz}!',
    eingetragenOhnePlatz: 'Eingetragen!',
    ausstehend: 'Gerade keine Verbindung – Ihre Punkte werden automatisch eingetragen, sobald Sie wieder online sind und die Lernkarten oder die Highscore-Liste öffnen.',
    nichtEingerichtet: 'Die Highscore-Liste wird gerade noch eingerichtet – Ihre Punkte werden automatisch nachgetragen.',
    abgelehnt: 'Der Eintrag wurde nicht angenommen.',
    nichtEingetragen: 'Nicht eingetragen.',

    // Highscore-Seite
    highscoreTitel: 'Highscore',
    highscoreUntertitel: 'Diabetes Run! – Spielrunden aus den Lernkarten',
    highscoreLeer: 'Noch keine Einträge – spielen Sie die erste Runde!',
    highscoreLaedt: 'Liste wird geladen …',
    highscoreFehler: 'Die Liste ist gerade nicht erreichbar. Bitte später noch einmal versuchen.',
    highscoreNichtEingerichtet: 'Die Highscore-Liste ist noch nicht eingerichtet.',
    highscoreHinweis: 'Je Name zählt die beste Runde.',
    platz: 'Platz',
    name: 'Name',
    punkteSpalte: 'Punkte',
    zurUebersicht: 'Zur Übersicht der Lernkarten',
    zuDenLernkartenSatz: 'Zu den Lernkarten {satz}',
    zuruecksetzenTitel: 'Liste zurücksetzen (nur Lehrkraft)',
    zuruecksetzenText: 'Alle Einträge der Liste „{satz}“ werden gelöscht.',
    zuruecksetzenKnopf: 'Liste „{satz}“ jetzt zurücksetzen',
    zuruecksetzenFrage: 'Wirklich alle Einträge der Liste „{satz}“ löschen?',
    zurueckgesetzt: 'Die Liste „{satz}“ wurde zurückgesetzt.',
    zuruecksetzenFehler: 'Zurücksetzen hat nicht geklappt: {x}',
    testeintragKnopf: 'Testeintrag senden („Test T.“, 1 Punkt)',
    testeintragOk: 'Testeintrag angekommen (Platz {x}) – die Verbindung zur Google-Tabelle funktioniert. Löschen Sie ihn in der Tabelle oder setzen Sie die Liste zurück.',
    testeintragFehler: 'Testeintrag ist nicht angekommen: {x}',

    wusstestDuUeberschrift: 'Wusstest du?'
  },

  // Nach jedem „Game over“ erscheint zufällig einer dieser Sätze (aus den Ich-kann-Listen)
  wusstestDu: {
    'kb1-diabetes': [
      'Hypoglykämie: Blutzucker unter 70 mg/dl – Hyperglykämie: über 180 mg/dl.',
      'Bei einer Hypoglykämie: schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft) und nach ca. 30 min den BZ kontrollieren.',
      '1 mmol/l ≙ 18 mg/dl – also mg/dl : 18 = mmol/l.',
      'Den ersten Blutstropfen abwischen – er enthält Gewebsflüssigkeit.',
      'Die Insulindosis nie eigenmächtig ändern!'
    ],
    'kb2-beratung': [
      'Beraten statt belehren: Die Entscheidung bleibt bei der beratenen Person.',
      'SMART = spezifisch, messbar, akzeptiert, realistisch, terminiert.',
      'Doppelte Fürsorge: Wer sich selbst nicht stärken kann, kann auch andere nicht stärken.',
      'Die sechs Phasen der Beratung beginnen mit „Beziehung herstellen“ und enden mit „Beratung beenden“.',
      'Ergebnisoffen beraten: Das Ergebnis steht nicht vorher fest.'
    ]
  }
};
