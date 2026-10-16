/* =====================================================================
 * LERNKARTEN KB II – Beratung
 * Alle Texte der Lernkarten stehen in dieser Datei.
 * =====================================================================
 *
 * So ändern Sie eine Karte (direkt auf GitHub: Stift „Edit this file“):
 *  - Ändern Sie nur den Text zwischen den einfachen Hochkommas  ' … '.
 *  - Hochkommas, Kommas am Zeilenende und Klammern { } [ ] bleiben stehen.
 *  - Deutsche Anführungszeichen „ … “ und ‚ … ‘ dürfen Sie frei verwenden;
 *    ein einfaches Hochkomma im Text schreiben Sie als  \'
 *  - **fett**  und  *kursiv*  funktionieren wie in der Ich-kann-Liste;
 *    <br> erzwingt einen Zeilenumbruch.
 *
 * Aufbau einer Karte:
 *   {
 *     nr: 2,                        ← Nummer der Kompetenz in der Ich-kann-Liste (optional)
 *     afb: 'II',                    ← Anforderungsbereich (optional), erscheint oben auf der Karte
 *     vorne: 'Ich kann …',          ← Vorderseite (die Kompetenz)
 *     fall: 'Herr Müller …',        ← (optional) Fall oder Aussage, eingerahmt unter der Kompetenz
 *     hinten: ['Punkt 1', 'Punkt 2'],  ← Rückseite: jeder Eintrag wird ein Stichpunkt
 *     nummeriert: true,             ← (optional) 1., 2., 3. statt Punkten; start: 4 beginnt bei 4.
 *     hinweis: '…'                  ← (optional) kleiner Kasten unten auf der Rückseite
 *   },
 *
 * Neue Karte: eine vorhandene Karte samt { … }, kopieren und darunter einfügen.
 * Der Lernstand der SuS hängt am Text der Vorderseite: Wird die Vorderseite
 * geändert, gilt die Karte auf den Handys wieder als „neu“.
 * ===================================================================== */

var LERNKARTEN = {
  titel: 'KB II – Beratung',
  untertitel: 'Lernkarten zur Ich-kann-Liste',
  klausur: 'Klausur am 09.11.2026',
  // Kasten auf der Startseite (weglassen, wenn nicht gebraucht)
  hinweis: 'In der Klausur kommt ein anderer Fall – lernen Sie das Vorgehen, nicht die Beispielsätze!',
  // Schlüssel für den Lernstand auf dem Handy – nur ändern, wenn alle neu beginnen sollen
  speicherName: 'kb2-beratung',

  themen: [

    /* ------------------------------------------------------------------ */
    {
      ab: 'Die Wittener Werkzeuge',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann den Begriff „**doppelte Fürsorge**“ im Kontext der Wittener Werkzeuge *erklären*.',
          hinten: [
            'Die beratene Person wird gestärkt – zugleich achtet die Pflegefachperson auf ihre eigenen Bedürfnisse, ihre Selbstachtung und Selbstfürsorge.',
            'Wer sich selbst nicht stärken kann, kann auch andere nicht stärken.'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die **fünf Modalitäten** der Wittener Werkzeuge *nennen*.',
          hinten: ['Sehen', 'Hören', 'Fühlen', 'Sprechen', 'Tun'] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die Modalität **Sehen** der Wittener Werkzeuge für die Patientenpflege *beschreiben*.',
          hinten: '**Achtsamkeit:** den Patienten wertschätzend wahrnehmen' },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die Modalität **Hören** der Wittener Werkzeuge für die Patientenpflege *beschreiben*.',
          hinten: '**Einlassen:** immer ein offenes Ohr für den Patienten haben' },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die Modalität **Fühlen** der Wittener Werkzeuge für die Patientenpflege *beschreiben*.',
          hinten: '**Empathie:** sich in den Patienten hineinfühlen' },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die Modalität **Sprechen** der Wittener Werkzeuge für die Patientenpflege *beschreiben*.',
          hinten: '**Resourcing:** Stärken ansprechen, den Patienten motivieren' },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die Modalität **Tun** der Wittener Werkzeuge für die Patientenpflege *beschreiben*.',
          hinten: '**Berührung:** durch körperliche und emotionale Berührung Nähe vermitteln' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann in einer Gesprächssituation *identifizieren*, welcher Grundgedanke der Wittener Werkzeuge nicht berücksichtigt wird, und dies *begründen*:',
          fall: 'Herr Müller ist beim Duschen motiviert, die Pflegekraft übernimmt, weil es ihr zu lange dauert.',
          hinten: 'Nicht berücksichtigt: **Sprechen (Resourcing)** – seine Motivation und seine Fähigkeiten werden nicht genutzt.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      ab: ['‚Beratung‘ … oder doch etwas anderes?', 'Informieren, anleiten, schulen oder beraten?'],
      karten: [
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die **4 Formen der Patientenedukation** *nennen*.',
          hinten: ['Information', 'Anleitung', 'Schulung', 'Beratung'] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die 4 Formen der Patientenedukation *vergleichen*: Vorgehen, Kernziel und ein Beispiel für die **Information**',
          hinten: [
            '**Vorgehen:** Wissen weitergeben (erklären)',
            '**Kernziel:** Wissen',
            '**Beispiel (Diabetes):** Anzeichen einer Unterzuckerung erklären'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die 4 Formen der Patientenedukation *vergleichen*: Vorgehen, Kernziel und ein Beispiel für die **Anleitung**',
          hinten: [
            '**Vorgehen:** eine Handlung zeigen und einüben lassen',
            '**Kernziel:** Können',
            '**Beispiel (Diabetes):** BZ-Messung zeigen, dann misst die Patientin selbst'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die 4 Formen der Patientenedukation *vergleichen*: Vorgehen, Kernziel und ein Beispiel für die **Schulung**',
          hinten: [
            '**Vorgehen:** Wissen und Fertigkeiten geplant, strukturiert vermitteln',
            '**Kernziel:** systematisches Lernen',
            '**Beispiel (Diabetes):** Programm zu Ernährung, Bewegung und Therapie'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die 4 Formen der Patientenedukation *vergleichen*: Vorgehen, Kernziel und ein Beispiel für die **Beratung**',
          hinten: [
            '**Vorgehen:** fragen, zuhören, gemeinsam klären; ergebnisoffen',
            '**Kernziel:** Entscheidung unterstützen',
            '**Beispiel (Diabetes):** „Wie möchten Sie die gemeinsamen Mahlzeiten mit Ihrer Familie gestalten?“'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann eine Pflegesituation einer der vier Formen der Patientenedukation *zuordnen* und die Zuordnung *begründen*:',
          fall: 'Ein Patient sagt nach einem Herzinfarkt: „Ich weiß gar nicht, womit ich anfangen soll.“ Die PK stellt Rückfragen und erkundet mit ihm Prioritäten sowie erste Schritte.',
          hinten: '**Beratung**, weil eine individuelle Frage gemeinsam geklärt wird.' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann **Regeln für eine gute Beratung** *nennen*.',
          hinten: [
            'zugewandt und auf Augenhöhe sprechen',
            'Befinden beachten, Gespräch ggf. verschieben',
            'für Ruhe und Privatsphäre sorgen',
            'genügend Zeit einplanen, Störungen vermeiden',
            'verständliche Sprache verwenden',
            'ausreden lassen, Sorgen ernst nehmen'
          ] },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann aus einem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung *ableiten*:',
          fall: 'Die PK bleibt an der Tür stehen.',
          hinten: 'zugewandt und auf Augenhöhe sprechen' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann aus einem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung *ableiten*:',
          fall: 'Müdigkeit und Unwohlsein werden übergangen.',
          hinten: 'Befinden beachten, Gespräch ggf. verschieben' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann aus einem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung *ableiten*:',
          fall: 'Der Fernseher läuft, Besuch und Reinigungskraft sind im Zimmer.',
          hinten: 'für Ruhe und Privatsphäre sorgen' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann aus einem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung *ableiten*:',
          fall: '„Ich habe ungefähr fünf Minuten.“ – Das Diensttelefon klingelt.',
          hinten: 'genügend Zeit einplanen, Störungen vermeiden' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann aus einem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung *ableiten*:',
          fall: 'Fachsprache („Kohlenhydratzufuhr“, „HbA1c“)',
          hinten: 'verständliche Sprache verwenden' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann aus einem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung *ableiten*:',
          fall: 'unterbrechen, Sorgen herunterspielen („Das bekommen Sie schon hin.“)',
          hinten: 'ausreden lassen, Sorgen ernst nehmen' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann **gesprächshemmende Verhaltensweisen** *nennen*.',
          hinten: [
            'Ratschläge geben',
            'befehlen',
            'drohen',
            'bagatellisieren',
            'belehren',
            'unterbrechen',
            'das Thema wechseln',
            'unnötige Fachsprache verwenden'
          ] },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann in der Aussage einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: '„Lassen Sie den Kuchen doch einfach weg.“',
          hinten: '**Ratschläge geben**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann in der Aussage einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: '„Sie müssen …“',
          hinten: '**befehlen**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann in der Aussage einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: '„Sonst bekommen Sie Folgeschäden.“',
          hinten: '**drohen**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann in der Aussage einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: '„Das bekommen Sie schon hin.“',
          hinten: '**bagatellisieren**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann in der Aussage einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: '„Zucker ist nun mal ungesund, das weiß doch jeder.“',
          hinten: '**belehren**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann im Verhalten einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: 'Die Pflegefachperson fällt der Person ins Wort.',
          hinten: '**unterbrechen**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann im Verhalten einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: 'Die Pflegefachperson geht nicht auf Wichtiges ein (Herr Müller, AB 01).',
          hinten: '**das Thema wechseln**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann in der Aussage einer Pflegefachperson eine gesprächshemmende Verhaltensweise *identifizieren*:',
          fall: '„Ihr HbA1c ist zu hoch.“',
          hinten: '**unnötige Fachsprache verwenden**' },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann in der Aussage einer Pflegefachperson gesprächshemmende Verhaltensweisen *identifizieren* und mit Textbelegen belegen:',
          fall: '„Das ist ganz einfach: Sie müssen ab sofort auf Zucker verzichten … Sonst verlieren Sie garantiert Ihr Bein!“ (Zeile 7)',
          hinten: [
            '**bagatellisieren** („ganz einfach“)',
            '**befehlen** („Sie müssen“)',
            '**drohen** („Sonst …“)'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      ab: ['Frau Schneider braucht Beratung – aber wie?', 'Beratungsansätze – drei unterschiedliche Blickrichtungen'],
      karten: [
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann den Beratungsgrundsatz „**ergebnisoffen**“ *beschreiben*.',
          hinten: 'Das Ergebnis steht nicht vorher fest; gemeinsam wird eine passende, realistische Lösung gesucht.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beispiel für eine **ergebnisoffene** Frage *formulieren*.',
          hinten: '„Welche Form von Bewegung könnten Sie sich in Ihrem Alltag vorstellen?“' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann den Beratungsgrundsatz „**partizipativ**“ *beschreiben*.',
          hinten: 'Die beratene Person wird aktiv beteiligt; ihre Wünsche, Erfahrungen, Ziele und Entscheidungen fließen ein.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beispiel für eine **partizipative** Frage *formulieren*.',
          hinten: '„Welche Veränderung möchten Sie zuerst angehen, und was ist Ihnen dabei wichtig?“' },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann die **drei Beratungsansätze** *nennen*.',
          hinten: [
            'personenzentriert (Rogers)',
            'ressourcen-/lösungsorientiert',
            'motivationsfördernd (MI)'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann die drei Beratungsansätze *vergleichen*: Leitfrage, Fokus, Rolle der PK und Gesprächselemente des **personenzentrierten Ansatzes (Rogers)**',
          hinten: [
            '**Leitfrage:** Wie erlebt die Person ihre Situation – was bedeutet sie für sie?',
            '**Fokus:** Erleben, Gedanken, Gefühle',
            '**Rolle der PK:** empathische Begleiterin',
            '**Gesprächselemente:** aktives Zuhören, Paraphrasieren, Gefühle verbalisieren; Empathie, Akzeptanz, Kongruenz'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann die drei Beratungsansätze *vergleichen*: Leitfrage, Fokus, Rolle der PK und Gesprächselemente des **ressourcen-/lösungsorientierten Ansatzes**',
          hinten: [
            '**Leitfrage:** Was gelingt schon? Was hilft? Was wäre ein kleiner nächster Schritt?',
            '**Fokus:** Fähigkeiten, Gelingendes, Ausnahmen',
            '**Rolle der PK:** Impulsgeberin',
            '**Gesprächselemente:** Ressourcen-, Ausnahme- und Skalierungsfragen'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann die drei Beratungsansätze *vergleichen*: Leitfrage, Fokus, Rolle der PK und Gesprächselemente des **motivationsfördernden Ansatzes (MI)**',
          hinten: [
            '**Leitfrage:** Was möchte die Person selbst verändern? Was spricht dafür, was dagegen?',
            '**Fokus:** Ambivalenz, eigene Gründe und Ziele',
            '**Rolle der PK:** begleitet, ohne zu überreden',
            '**Gesprächselemente:** offene Fragen, reflektierendes Zuhören, Ambivalenz aufgreifen, zusammenfassen'
          ] },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann **sechs Gesprächstechniken** für die Beratung *nennen*.',
          hinten: [
            'aktives Zuhören',
            'Paraphrasieren',
            'Gefühle verbalisieren',
            'offene Frage',
            'Skalierungsfrage',
            'Zusammenfassen'
          ] },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Gesprächstechnik **aktives Zuhören** *erläutern* und ein Beispiel *formulieren*.',
          hinten: [
            '**Was tue ich?** zugewandt zuhören, Blickkontakt, nicken, nicht unterbrechen',
            '**Beispiel (Frau Schneider):** „Mhm … erzählen Sie ruhig weiter.“'
          ],
          hinweis: 'Erläutern heißt hier: Technik benennen, kurz erklären, was man tut, und ein Beispiel aus dem Fall geben.' },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Gesprächstechnik **Paraphrasieren** *erläutern* und ein Beispiel *formulieren*.',
          hinten: [
            '**Was tue ich?** den Inhalt mit eigenen Worten wiedergeben',
            '**Beispiel (Frau Schneider):** „Sie sind also mit dem Pen noch unsicher.“'
          ],
          hinweis: 'Erläutern heißt hier: Technik benennen, kurz erklären, was man tut, und ein Beispiel aus dem Fall geben.' },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Gesprächstechnik **Gefühle verbalisieren** *erläutern* und ein Beispiel *formulieren*.',
          hinten: [
            '**Was tue ich?** das Gefühl hinter der Aussage ansprechen',
            '**Beispiel (Frau Schneider):** „Das klingt, als ob Sie die vielen Anforderungen unter Druck setzen.“'
          ],
          hinweis: 'Erläutern heißt hier: Technik benennen, kurz erklären, was man tut, und ein Beispiel aus dem Fall geben.' },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Gesprächstechnik **offene Frage** *erläutern* und ein Beispiel *formulieren*.',
          hinten: [
            '**Was tue ich?** W-Frage, die man nicht mit Ja oder Nein beantworten kann',
            '**Beispiel (Frau Schneider):** „Was beschäftigt Sie im Moment am meisten?“'
          ],
          hinweis: 'Erläutern heißt hier: Technik benennen, kurz erklären, was man tut, und ein Beispiel aus dem Fall geben.' },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Gesprächstechnik **Skalierungsfrage** *erläutern* und ein Beispiel *formulieren*.',
          hinten: [
            '**Was tue ich?** Einschätzung auf einer Skala von 0 bis 10 erfragen',
            '**Beispiel (Frau Schneider):** „Wie sicher fühlen Sie sich mit dem Pen – von 0 bis 10?“'
          ],
          hinweis: 'Erläutern heißt hier: Technik benennen, kurz erklären, was man tut, und ein Beispiel aus dem Fall geben.' },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Gesprächstechnik **Zusammenfassen** *erläutern* und ein Beispiel *formulieren*.',
          hinten: [
            '**Was tue ich?** das Wichtigste bündeln, bevor es weitergeht',
            '**Beispiel (Frau Schneider):** „Dann halte ich fest: …“'
          ],
          hinweis: 'Erläutern heißt hier: Technik benennen, kurz erklären, was man tut, und ein Beispiel aus dem Fall geben.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      ab: ['Problemfokus und Ressourcenorientierung unterscheiden', 'Beratungsansätze anwenden'],
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann eine problemorientierte Aussage ressourcenorientiert um*formulieren*:',
          fall: '„Sie bewegen sich viel zu wenig.“',
          hinten: '„Welche Bewegung gelingt Ihnen schon? Was wäre ein kleiner nächster Schritt?“' },
        { nr: 2, afb: 'II + III',
          vorne: 'Ich kann *beurteilen*, welcher Beratungsansatz in dieser Situation besonders geeignet ist:',
          fall: 'Eine Patientin sagt mit Tränen in den Augen: „Alle sagen mir ständig, was ich anders machen soll. Mir wird das zu viel!“',
          hinten: [
            'Geeignet ist der **personenzentrierte Ansatz**, weil die Patientin Zeichen emotionaler Überforderung zeigt und sich zuerst verstanden fühlen muss.',
            'Ein lösungsorientierter Einstieg („Was wäre ein nächster Schritt?“) würde sie jetzt eher zusätzlich unter Druck setzen.'
          ] },
        { nr: 2, afb: 'II + III',
          vorne: 'Ich kann für diese Situation einen passenden **Gesprächseinstieg** *formulieren*:',
          fall: 'Eine Patientin sagt mit Tränen in den Augen: „Alle sagen mir ständig, was ich anders machen soll. Mir wird das zu viel!“',
          hinten: '„Das klingt, als ob Ihnen das gerade zu viel wird. Was belastet Sie am meisten?“' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      ab: [
        'Beratungsprozess – Frau Schneider braucht eine Beratung nach den 6 Phasen',
        'Beratung planen – Was ist zuerst wichtig, was soll erreicht werden?',
        'Die 6 Phasen der Beratung praktisch anwenden'
      ],
      // Name in der Liste und auf den Karten (die drei AB-Titel wären dafür zu lang)
      titel: 'ABs zum Beratungsprozess (6 Phasen, Beratung planen)',
      karten: [
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die **sechs Phasen des Beratungsprozesses** *nennen*.',
          nummeriert: true,
          hinten: [
            'Beziehung herstellen',
            'Beratungsbedürfnisse/-bedarfe erfassen',
            'Beratungsziele aushandeln',
            'Lösungen entwickeln',
            'Beratungsprozess reflektieren',
            'Beratung beenden'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beratungsgespräch fallbezogen *darstellen* und *erläutern*: Phase **1. Beziehung herstellen**',
          hinten: [
            '**Was passiert?** begrüßen, Kontakt und Vertrauen aufbauen, Anlass und Rahmen klären',
            '**Beispiel (Herr Meier, Herzinsuffizienz):** „Guten Tag, Herr Meier, wie geht es Ihnen heute? Darf ich mit Ihnen über das sprechen, was Sie bei Ihrer Herzinsuffizienz beschäftigt?“'
          ],
          hinweis: 'Beschreiben Sie in jeder Phase, was die Pflegefachperson tut, und beziehen Sie sich konkret auf den Fall. Ohne Fallbezug gibt es nur die Hälfte der Punkte!' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beratungsgespräch fallbezogen *darstellen* und *erläutern*: Phase **2. Beratungsbedürfnisse/-bedarfe erfassen**',
          hinten: [
            '**Was passiert?** Sicht der Person erfragen, zuhören, Beobachtungen einordnen, Probleme gemeinsam benennen',
            '**Beispiel (Herr Meier, Herzinsuffizienz):** „Was verunsichert Sie im Moment am meisten?“'
          ],
          hinweis: 'Beschreiben Sie in jeder Phase, was die Pflegefachperson tut, und beziehen Sie sich konkret auf den Fall. Ohne Fallbezug gibt es nur die Hälfte der Punkte!' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beratungsgespräch fallbezogen *darstellen* und *erläutern*: Phase **3. Beratungsziele aushandeln**',
          hinten: [
            '**Was passiert?** zusammenfassen, Prioritäten erfragen, ein realistisches Ziel vereinbaren',
            '**Beispiel (Herr Meier, Herzinsuffizienz):** „Was möchten Sie nach unserem Gespräch besser verstehen oder sicherer können?“'
          ],
          hinweis: 'Beschreiben Sie in jeder Phase, was die Pflegefachperson tut, und beziehen Sie sich konkret auf den Fall. Ohne Fallbezug gibt es nur die Hälfte der Punkte!' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beratungsgespräch fallbezogen *darstellen* und *erläutern*: Phase **4. Lösungen entwickeln**',
          hinten: [
            '**Was passiert?** passende Informationen geben, Wahlmöglichkeiten statt Ratschläge, Ressourcen nutzen',
            '**Beispiel (Herr Meier, Herzinsuffizienz):** „Darf ich Ihnen zwei mögliche Gründe für die Ödeme erklären? Dann schauen wir, was davon bei Ihnen passt.“'
          ],
          hinweis: 'Beschreiben Sie in jeder Phase, was die Pflegefachperson tut, und beziehen Sie sich konkret auf den Fall. Ohne Fallbezug gibt es nur die Hälfte der Punkte!' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beratungsgespräch fallbezogen *darstellen* und *erläutern*: Phase **5. Beratungsprozess reflektieren**',
          hinten: [
            '**Was passiert?** prüfen, was verstanden und hilfreich war; offene Fragen klären',
            '**Beispiel (Herr Meier, Herzinsuffizienz):** „Was war heute besonders hilfreich? Was ist noch unklar?“'
          ],
          hinweis: 'Beschreiben Sie in jeder Phase, was die Pflegefachperson tut, und beziehen Sie sich konkret auf den Fall. Ohne Fallbezug gibt es nur die Hälfte der Punkte!' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann ein Beratungsgespräch fallbezogen *darstellen* und *erläutern*: Phase **6. Beratung beenden**',
          hinten: [
            '**Was passiert?** Ergebnis festhalten, dokumentieren, nächsten Schritt oder Folgetermin vereinbaren, ggf. weitervermitteln',
            '**Beispiel (Herr Meier, Herzinsuffizienz):** „Dann halten wir fest: … Beim nächsten Besuch schauen wir, wie es Ihnen ergangen ist.“'
          ],
          hinweis: 'Beschreiben Sie in jeder Phase, was die Pflegefachperson tut, und beziehen Sie sich konkret auf den Fall. Ohne Fallbezug gibt es nur die Hälfte der Punkte!' },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann ein SMARTes Beratungsziel *formulieren*: Wofür steht **SMART**?',
          hinten: [
            '**S** – spezifisch',
            '**M** – messbar',
            '**A** – akzeptiert',
            '**R** – realistisch',
            '**T** – terminiert'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann ein SMARTes Beratungsziel *formulieren*: **Beispiel Herr Meier** (Herzinsuffizienz)',
          hinten: '„Am Ende des ersten Gesprächs kann Herr Meier drei Warnzeichen einer Verschlechterung seiner Herzinsuffizienz nennen (z. B. Gewichtszunahme, geschwollene Beine, zunehmende Atemnot) und beschreiben, wann er seine Hausärztin anruft.“' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      ab: 'Professionell beraten – Beratungsformen, Kompetenzen und Grenzen',
      karten: [
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die **vier Bereiche der Beratungskompetenz** *nennen*.',
          hinten: [
            'Fachkompetenz',
            'Methodenkompetenz',
            'sozial-kommunikative Kompetenz',
            'personale Kompetenz'
          ],
          hinweis: 'Merksatz: Fach im Kopf, Methode in der Hand, sozial mit Herz – und personal: den Blick auf mich gewandt.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die **Fachkompetenz** als Bereich der Beratungskompetenz *beschreiben*.',
          hinten: [
            'aktuelles Fachwissen (z. B. Unterzuckerung), Hilfsangebote und rechtliche Grenzen kennen',
            'korrekt und verständlich informieren'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die **Methodenkompetenz** als Bereich der Beratungskompetenz *beschreiben*.',
          hinten: [
            'Gespräch nach den sechs Phasen strukturieren',
            'Gesprächstechniken (offene Fragen, aktives Zuhören, Paraphrasieren, Zusammenfassen, Skalierungsfragen)',
            'SMART-Ziele'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die **sozial-kommunikative Kompetenz** als Bereich der Beratungskompetenz *beschreiben*.',
          hinten: [
            'Beziehung aufbauen',
            'Empathie, Akzeptanz (Wertschätzung), Kongruenz',
            'alle Sichtweisen erfragen, keine Partei ergreifen',
            'Bezugspersonen einbeziehen'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann die **personale Kompetenz** als Bereich der Beratungskompetenz *beschreiben*.',
          hinten: [
            'eigene Haltung und Gefühle reflektieren',
            'eigene Grenzen erkennen und weitervermitteln',
            'Selbstfürsorge',
            'eigene Rolle klären'
          ] },
        // Die folgenden Beispiele stammen aus der digitalen Übung zu Arbeitsblatt 12
        // (Arbeitsauftrag 2 „Kompetenzen erkennen“, Repository kb2-beratung).
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina erklärt Herrn Brenner in einfachen Worten, woran man eine Unterzuckerung erkennt.',
          hinten: '**Fachkompetenz:** Fachwissen korrekt und verständlich weitergeben gehört zur Fachkompetenz.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina fasst zusammen: „Sie möchten bei der Weinlese helfen – und gleichzeitig sicher sein, dass Ihnen nicht wieder so komisch wird.“',
          hinten: [
            '**Methodenkompetenz:** Zusammenfassen ist eine Gesprächstechnik.',
            'Weil Lina damit auch Verständnis zeigt, ist sozial-kommunikative Kompetenz ebenfalls vertretbar.'
          ] },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina merkt, dass sie sich über die Aussage „nur ein bisschen Alterszucker“ ärgert, und atmet durch, bevor sie antwortet.',
          hinten: '**Personale Kompetenz:** Lina nimmt ihre eigenen Gefühle wahr und reguliert sie.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina fragt auch Frau Brenner, wie es ihr mit der Situation geht.',
          hinten: '**Sozial-kommunikative Kompetenz:** Lina bezieht die Bezugsperson ein und erfragt alle Sichtweisen.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina weiß, dass eine Insulindosis nur nach ärztlicher Anordnung verändert werden darf.',
          hinten: '**Fachkompetenz:** Rechtliche Grenzen zu kennen gehört zur Fachkompetenz.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina fragt: „Wie sicher fühlen Sie sich auf einer Skala von 0 bis 10, eine Unterzuckerung zu erkennen?“',
          hinten: '**Methodenkompetenz:** Die Skalierungsfrage ist eine Gesprächstechnik.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina akzeptiert, dass Herr Brenner sonntags weiterhin Kuchen essen möchte, und sucht mit ihm nach einem guten Umgang damit.',
          hinten: '**Sozial-kommunikative Kompetenz:** Wertschätzung und der Umgang mit Ambivalenz gehören zur sozial-kommunikativen Kompetenz.' },
        { nr: 1, afb: 'I + II',
          vorne: 'Ich kann eine Verhaltensweise einer Pflegefachperson einem Bereich der Beratungskompetenz *zuordnen*:',
          fall: 'Lina spricht in der Teambesprechung an, dass sie bei Familie Brenner „zwischen die Fronten“ zu geraten droht.',
          hinten: '**Personale Kompetenz:** Lina erkennt ihre eigenen Grenzen, klärt ihre Rolle und holt sich Unterstützung.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      ab: 'Die Grenzen pflegerischer Beratung',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann *nennen*, worauf ich achte, wenn **Bezugspersonen** in eine Beratung einbezogen werden.',
          hinten: [
            'nur mit Einverständnis der beratenen Person',
            'gemeinsam sprechen, nicht „über den Kopf hinweg“',
            'alle Sichtweisen erfragen, keine Partei ergreifen',
            'die Entscheidung bleibt bei der beratenen Person',
            'Belastung der Angehörigen wahrnehmen'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann *begründen*, warum Bezugspersonen **nur mit Einverständnis** der beratenen Person einbezogen werden.',
          hinten: '…, weil die Schweigepflicht gilt.' },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann *begründen*, warum ich mit Bezugspersonen **gemeinsam spreche, nicht „über den Kopf hinweg“**.',
          hinten: '…, weil die Person sonst übergangen wird.' },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann *begründen*, warum ich **alle Sichtweisen erfrage und keine Partei ergreife**.',
          hinten: '…, weil sonst Vertrauen verloren geht.' },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann *begründen*, warum **die Entscheidung bei der beratenen Person bleibt**.',
          hinten: '…, weil sie selbst bestimmt.' },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann *begründen*, warum ich die **Belastung der Angehörigen** wahrnehme.',
          hinten: '…, weil auch sie Unterstützung brauchen können.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      ab: 'Prüfungstraining: Beratung im Examensformat',
      karten: [
        { nr: 1, afb: 'III',
          vorne: 'Ich kann die Aussage einer Pflegefachperson im Hinblick auf eine professionelle Beratung *beurteilen*: **Kriterien**',
          fall: 'Frau Kühn hat gerade die Diagnose Diabetes Typ 2 erhalten. Eine Kollegin sagt zu ihr: „Das ist ganz einfach: Sie müssen ab sofort auf Zucker verzichten und jeden Tag eine halbe Stunde spazieren gehen. Sonst bekommen Sie Folgeschäden.“',
          hinten: [
            'belehrend („Sie müssen …“): nicht ergebnisoffen, nicht partizipativ',
            'ihre Lebenssituation wird übergangen',
            '„ganz einfach“ wertet ihre Sorgen ab',
            'die Drohung kann Angst und Widerstand verstärken'
          ] },
        { nr: 1, afb: 'III',
          vorne: 'Ich kann die Aussage einer Pflegefachperson im Hinblick auf eine professionelle Beratung *beurteilen*: **Urteil**',
          fall: 'Frau Kühn hat gerade die Diagnose Diabetes Typ 2 erhalten. Eine Kollegin sagt zu ihr: „Das ist ganz einfach: Sie müssen ab sofort auf Zucker verzichten und jeden Tag eine halbe Stunde spazieren gehen. Sonst bekommen Sie Folgeschäden.“',
          hinten: 'keine professionelle Beratung, sondern Belehrung – Frau Kühn zieht sich zurück (schweigt, schaut aus dem Fenster).' }
      ]
    }
  ],

  /* ---------- Beschriftungen der Oberfläche ---------- */
  texte: {
    start: 'Lernen starten',
    weiterlernen: 'Weiterlernen',
    weiterlernenInfo: 'Karte {x} von {y}',
    nurOffene: 'Nur offene Karten lernen ({x})',
    alleNeu: 'Alle {x} Karten lernen',
    themenWaehlen: 'Was möchten Sie lernen?',
    alleThemen: 'Alle',
    keineThemen: 'Keine',
    mischen: 'Karten mischen',
    gewusst: 'Gewusst',
    nochNicht: 'Noch nicht',
    umdrehen: 'Tippen zum Umdrehen',
    vorderseite: 'Kompetenz',
    rueckseite: 'Beispielantwort',
    zurueck: 'Zurück',
    beenden: 'Zur Übersicht',
    rundeFertig: 'Runde geschafft!',
    allesGewusst: 'Alles gewusst – stark!',
    ergebnis: '{x} von {y} Karten gewusst',
    wiederholen: '{x} Karten wiederholen',
    wiederholenEine: '1 Karte wiederholen',
    nochmalAlle: 'Alle Karten noch einmal',
    stand: '{x} von {y} gewusst',
    gesamt: 'Ihr Lernstand: {x} von {y} Karten gewusst',
    insgesamt: 'Insgesamt: {x} von {y} Karten gewusst',
    zuruecksetzen: 'Lernstand löschen',
    zuruecksetzenFrage: 'Ihren gesamten Lernstand auf diesem Gerät löschen?',
    datenschutz: 'Keine Anmeldung, keine Cookies. Ihr Lernstand wird nur auf diesem Gerät gespeichert.',
    bedienung: 'Karte antippen zum Umdrehen. Wischen nach rechts = gewusst, nach links = noch nicht.'
  }
};
