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

  // Anonyme Nutzungszählung in derselben Google-Tabelle (Blatt „Nutzung (anonym)“): je Tag,
  // Kartensatz, Klasse und Bereich (Lernkarten, Klausur-Challenge, Spiel) die Zahl der Aufrufe
  // und der verschiedenen Handys – ohne Namen, ohne Gerätekennung. Dazu im Blatt
  // „Ereignisse (anonym)“: bewertete Karten, begonnene/beendete Challenges, angebotene/
  // abgelehnte/gespielte Spielrunden. Für die SuS nicht sichtbar. Ausschalten (beides): false
  nutzungZaehlen: true,

  // Je so viele angeschaute Lernkarten gibt es eine Spielrunde. Eine Karte zählt, wenn sie umgedreht
  // und dann mit „Gewusst“ oder „Noch nicht“ bewertet wurde – auch wiederholte Karten.
  kartenProSpiel: 50,
  // So viele Sekunden muss die Vorderseite und danach die Rückseite mindestens zu sehen sein,
  // damit die Karte zählt (verhindert, dass man nur superschnell durchwischt). 0 = keine Mindestzeit.
  mindestSekundenJeSeite: 1,

  // Klausur-Challenge: Knopf auf der Startseite der Lernkarten. Zufällige Aufgaben aus
  // fragen.js des Kartensatzes, mit Timer und eigener Highscore-Liste je Klasse.
  // true = für die SuS sichtbar. false = unsichtbar; die Lehrkraft kann sie trotzdem ausprobieren:
  // Adresse der Lernkarten oder der Challenge mit ?vorschau=1 öffnen.
  challengeAn: true,
  challenge: {
    aufgaben: 20,                 // so viele Aufgaben je Challenge (aus jedem Thema mindestens eine)
    punkteProAufgabe: 150,        // Teilpunkte beim Zuordnen und bei Reihenfolgen
    zeitbonusMax: 750,            // höchstens so viele Bonuspunkte für Tempo – zählt anteilig zu den richtigen Antworten
    zeitbonusVollBisMinuten: 0,   // bis hierhin gibt es den vollen Zeitbonus (0 = er sinkt ab der ersten Sekunde) …
    zeitbonusNullAbMinuten: 15    // … danach sinkt er gleichmäßig; ab hier gibt es keinen mehr
  },

  // Klassen: Jede Klasse bekommt eigene QR-Codes (…/kb1-diabetes/?klasse=3bfp2-1) und damit
  // eigene Highscore-Listen. Das Handy merkt sich die Klasse beim ersten Scannen.
  // kennung: nur Kleinbuchstaben, Ziffern und Bindestrich · name: so erscheint sie in der App
  klassen: [
    { kennung: '3bfp2-1', name: '3BFP2/1' },
    { kennung: '3bfp2-2', name: '3BFP2/2' }
  ],

  // Eine Highscore-Liste je Kartensatz (und je Klasse). kennung = speicherName in karten.js,
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
    spielRegel: 'Für je {n} angeschaute Lernkarten dürfen Sie zur Belohnung eine Runde spielen und sich in die Highscore-Liste eintragen! Jede umgedrehte Karte zählt – auch wiederholte, egal ob gewusst oder nicht.',
    spielNeu: '🎮 Neue Spielrunde freigeschaltet!',
    spielRestEine: '🎮 noch 1 Karte bis zur Spielrunde',
    spielRestMehr: '🎮 noch {x} Karten bis zur Spielrunde',
    nichtGezaehlt: 'Tipp: Für die Spielrunde zählt eine Karte nur, wenn Sie sie vorher umgedreht haben.',

    // Gratulation (bildschirmfüllend), sobald alle Karten einmal durchgegangen sind
    belohnungTitel: 'Super!',
    belohnungText: 'Sie haben {n} Lernkarten von „{satz}“ angeschaut. Zur Belohnung dürfen Sie jetzt eine Runde „Diabetes Run!“ spielen und sich in die Highscore-Liste eintragen!',
    belohnungMehr: 'Sie haben {x} Spielrunden frei.',
    belohnungStart: '🎮 Jetzt spielen',
    belohnungSpaeter: 'Nein, danke – weiterlernen',
    belohnungHinweis: 'Die Runde bleibt gespeichert – Sie können sie auch später über „Jetzt spielen“ auf der Startseite starten.',
    highscoreLink: '🏆 Highscore-Liste',

    // Spielseite
    titel: 'KBS Diabetes Run!',
    logoAlt: 'Logo der Schule',
    spielidee: 'Diese Hohenloher Pflegekraft ist auf Tour durchs schöne Ländle, doch der Zeitplan ist eng – und es lauern zahlreiche Gefahren, nicht nur für ihren Blutzucker! Verlockende Kuchen, Weinkisten, Rollatoren, Pflegewagen und Schlaglöcher überspringen, unter Wespenschwärmen durchducken, und für den Lkw braucht es einen Doppelsprung.',
    freiEine: 'Sie haben 1 Spielrunde frei ({satz}).',
    freiMehr: 'Sie haben {x} Spielrunden frei ({satz}).',
    losHinweis: '„Los geht’s!“ startet die Runde – danach ist sie verbraucht.',
    gesperrtTitel: 'Noch keine Spielrunde frei',
    gesperrt: 'Für je {n} angeschaute Lernkarten von „{satz}“ dürfen Sie zur Belohnung eine Runde spielen. Jede umgedrehte Karte zählt – auch wiederholte, egal ob gewusst oder nicht.',
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

    // Klausur-Challenge: Kasten auf der Startseite der Lernkarten
    challengeTitel: 'Klausur-Challenge',
    challengeKasten: 'Fit für die Klausur? {n} zufällige Aufgaben aus der Ich-kann-Liste – mit Timer und eigener Highscore-Liste.',
    challengeLos: '🏁 Klausur-Challenge starten',

    // Klausur-Challenge: Challenge-Seite
    challengeIdee: 'Sind Sie fit für die Klausur? Testen Sie sich mit {n} zufälligen Aufgaben aus allen Themen der Ich-kann-Liste.',
    challengeRegelPunkte: 'Pro richtig gelöster Aufgabe gibt es {p} Punkte – beim Zuordnen, bei Reihenfolgen, beim Finden von Zeilen und bei „Alle richtigen antippen“ auch Teilpunkte.',
    challengeRegelZeit: 'Die Zeit läuft von der ersten bis zur letzten Aufgabe mit – auch, wenn Sie zwischendurch die App verlassen. Je schneller Sie sind, desto mehr Zeitbonus gibt es (bis zu {b} Punkte). Der Bonus zählt aber nur anteilig zu Ihren richtigen Antworten – Raten lohnt sich also nicht.',
    challengeRegelEnde: 'Die Lösungen sehen Sie erst am Ende – wie in der Klausur. Danach können Sie sich in die Highscore-Liste Ihrer Klasse eintragen.',
    challengeRegelFormulieren: 'Die Challenge prüft, ob Sie das Richtige erkennen. In der Klausur formulieren und begründen Sie Ihre Antworten selbst – das üben Sie mit den Lernkarten.',
    challengeTippFormulieren: 'Tipp für die Klausur: Dort wählen Sie nichts aus, sondern schreiben Ihre Antworten selbst – mit Begründung und, wo verlangt, mit Zeilenangabe. Üben Sie das Formulieren mit den Lernkarten.',
    challengeStart: 'Challenge starten',
    challengeBest: 'Ihre Bestleistung: {x} Punkte',
    challengeAus: 'Die Klausur-Challenge ist noch nicht freigeschaltet.',
    challengeLaedtNicht: 'Die Aufgaben konnten nicht geladen werden. Bitte prüfen Sie die Internetverbindung und laden Sie die Seite neu.',
    aufgabeZaehler: 'Aufgabe {x} / {y}',
    uhrBeschriftung: 'Benötigte Zeit',
    weiter: 'Weiter',
    auswerten: 'Auswerten',
    abbrechen: 'Challenge abbrechen',
    abbrechenFrage: 'Challenge wirklich abbrechen? Ihre Antworten gehen verloren.',
    anleitungAuswahl: 'Tippen Sie die richtige Antwort an.',
    anleitungRichtigFalsch: 'Ist die Aussage richtig oder falsch?',
    anleitungZuordnen: 'Ordnen Sie jeden Eintrag zu.',
    anleitungReihenfolge: 'Tippen Sie die Schritte in der richtigen Reihenfolge an. Ein Tipp auf einen Schritt in Ihrer Reihenfolge nimmt ihn wieder heraus.',
    anleitungZahl: 'Geben Sie das Ergebnis ein.',
    anleitungZeile: 'Tippen Sie alle passenden Zeilen an. Ein zweiter Tipp nimmt die Auswahl zurück.',
    anleitungMehrfach: 'Tippen Sie alle richtigen Antworten an. Ein zweiter Tipp nimmt die Auswahl zurück.',
    nichtGewaehlt: '(nicht gewählt)',
    falschGewaehlt: '(falsch gewählt)',
    themenTitel: 'Ihre Themen',
    themenText: 'So viele Punkte haben Sie je Thema erreicht – die schwächsten stehen oben.',
    themaUeben: '📚 Mit den Lernkarten üben',
    schreibenTitel: '✍️ Schreibübung – ohne Punkte',
    schreibenText: 'In der Klausur formulieren Sie selbst. Schreiben Sie Ihre Antwort und vergleichen Sie dann mit der Musterantwort. Ihr Text wird nicht gespeichert und zählt nicht für die Punkte.',
    schreibenFeld: 'Ihre Antwort …',
    schreibenMuster: 'Musterantwort zeigen',
    schreibenMusterTitel: 'Musterantwort',
    schreibenCheck: 'Prüfen Sie selbst:',
    schreibenAndere: 'Andere Schreibübung',
    knopfRichtig: 'Richtig',
    knopfFalsch: 'Falsch',
    bitteWaehlen: 'Bitte wählen …',
    ihreReihenfolge: 'Ihre Reihenfolge',
    schritteZurAuswahl: 'Schritte',
    ihrErgebnis: 'Ihr Ergebnis',
    endeTitel: 'Geschafft!',
    zeileAufgaben: 'Aufgaben: {r} von {n} ganz richtig',
    zeileZeit: 'Zeitbonus (Ihre Zeit: {t})',
    zeileGesamt: 'Gesamtpunktzahl',
    fehlerTitel: 'Ihre Fehler – mit Lösung',
    fehlerKeine: 'Keine Fehler – alles richtig gelöst!',
    fehlerKopf: 'Aufgabe {x} · {p} von {m} Punkten',
    ihreAntwort: 'Ihre Antwort:',
    richtigeLoesung: 'Richtig:',
    richtigeReihenfolge: 'Richtige Reihenfolge:',
    keineAntwort: '(keine Antwort)',
    nochmalChallenge: 'Neue Challenge (neue Aufgaben)',
    vorschauHinweis: 'Vorschau für die Lehrkraft – für die SuS ist die Challenge noch nicht sichtbar.',

    // Highscore-Seite
    highscoreTitel: 'Highscore',
    highscoreUntertitel: 'Diabetes Run! – Spielrunden aus den Lernkarten',
    highscoreUntertitelChallenge: 'Klausur-Challenge – Aufgaben aus der Ich-kann-Liste',
    reiterSpiel: '🎮 Diabetes Run!',
    reiterChallenge: '🏁 Klausur-Challenge',
    highscoreLeerChallenge: 'Noch keine Einträge – machen Sie die erste Challenge!',
    highscoreHinweisChallenge: 'Je Name zählt die beste Challenge.',
    klasse: 'Klasse {x}',
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
      'Kein aktueller BZ-Wert dokumentiert? Vor der Insulingabe erst den BZ messen.'
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
