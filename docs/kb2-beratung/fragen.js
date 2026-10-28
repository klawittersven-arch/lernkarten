/* =====================================================================
 * KLAUSUR-CHALLENGE KB II – Beratung
 * Alle Aufgaben der Challenge stehen in dieser Datei (Aufgabenpool).
 * Bei jeder Challenge werden 20 Aufgaben gezogen – aus jedem Thema
 * mindestens eine – und in zufälliger Reihenfolge gestellt.
 * =====================================================================
 *
 * So ändern Sie eine Aufgabe (direkt auf GitHub: Stift „Edit this file“):
 *  - Nur den Text zwischen den einfachen Hochkommas  ' … '  ändern.
 *  - Hochkommas, Kommas am Zeilenende und Klammern { } [ ] bleiben stehen.
 *  - **fett** und *kursiv* funktionieren wie in den Lernkarten.
 *
 * Aufgabenarten:
 *   { typ: 'auswahl', frage: '…', antworten: ['RICHTIG', 'falsch', 'falsch', 'falsch'] }
 *       → Die ERSTE Antwort ist immer die richtige; die App mischt die Reihenfolge.
 *   { typ: 'richtigfalsch', aussage: '…', richtig: true oder false, erklaerung: '…' }
 *   { typ: 'zuordnen', frage: '…', zuordnung: { 'Gruppe A': ['…', '…'], 'Gruppe B': ['…'] } }
 *       → Jeder Eintrag wird einer Gruppe zugeordnet (Teilpunkte je richtigem Eintrag).
 *         Eine Gruppe mit [] ist nur eine zusätzliche, falsche Wahlmöglichkeit.
 *   { typ: 'reihenfolge', frage: '…', schritte: ['erster', 'zweiter', '…'] }
 *       → Schritte in der richtigen Reihenfolge eintragen; die App mischt sie.
 *   { typ: 'zahl', frage: '…', loesung: 11.9, toleranz: 0.1, einheit: 'mmol/l' }
 *       → Zahlen mit Punkt schreiben (11.9); als richtig gilt loesung ± toleranz.
 *   { typ: 'zeile', frage: '…', zeilen: ['Zeile 1', 'Zeile 2', '…'], richtig: [2, 4] }
 *       → Falltext mit Zeilennummern; die SuS tippen die passenden Zeilen an
 *         (richtig = Nummern ab 1; Teilpunkte, falsch gewählte Zeilen ziehen ab).
 *   { typ: 'mehrfach', frage: '…', richtig: ['…', '…'], falsch: ['…', '…'] }
 *       → „Alle richtigen antippen“; die App mischt die Antworten
 *         (Teilpunkte; falsch gewählte Antworten ziehen ab – wer alles antippt, bekommt 0).
 * Optional bei jeder Aufgabe: fall: '…' (eingerahmter Fall) und
 * erklaerung: '…' (erscheint in der Auswertung bei den Lösungen).
 *
 * Je Thema:
 *   gewicht: 0 bis 3 – wie oft das Thema über die eine Pflichtaufgabe hinaus
 *            drankommt (Klausurrelevanz). 0 = genau eine Aufgabe je Challenge.
 *   schreiben: [ { typ: 'schreiben', frage: '…', fall: '…', muster: ['…'], checkliste: ['…'] } ]
 *            – optionale Schreibübungen ohne Punkte; eine davon erscheint in der Auswertung.
 * ===================================================================== */

var CHALLENGE_FRAGEN = {
  satz: 'kb2-beratung',

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Wittener Werkzeuge',
      gewicht: 1,
      fragen: [
        { typ: 'auswahl',
          frage: 'Was bedeutet „**doppelte Fürsorge**“ im Kontext der Wittener Werkzeuge?',
          antworten: [
            'Die beratene Person wird gestärkt; zugleich achtet die Pflegefachperson auf eigene Bedürfnisse, Selbstachtung und Selbstfürsorge.',
            'Zwei Pflegefachpersonen betreuen gemeinsam eine Person, damit sich die Verantwortung für sie auf mehrere Schultern verteilen kann.',
            'Die Pflegefachperson kümmert sich doppelt so lange um die Person wie üblich, damit sie sich gut aufgehoben fühlt.',
            'Die Person und ihre Angehörigen werden gleichzeitig beraten, damit beide dieselben Informationen bekommen.'
          ] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie den fünf Modalitäten der Wittener Werkzeuge den passenden Begriff zu.',
          zuordnung: {
            'Achtsamkeit': ['Sehen'],
            'Einlassen': ['Hören'],
            'Empathie': ['Fühlen'],
            'Resourcing': ['Sprechen'],
            'Berührung': ['Tun']
          } },
        { typ: 'auswahl',
          frage: 'Was bedeutet die Modalität **Sprechen (Resourcing)** für die Patientenpflege?',
          antworten: [
            'Stärken ansprechen, den Patienten motivieren',
            'den Patienten wertschätzend wahrnehmen',
            'durch körperliche und emotionale Berührung Nähe vermitteln',
            'immer ein offenes Ohr für den Patienten haben'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Modalität der Wittener Werkzeuge wird **nicht berücksichtigt**?',
          fall: 'Herr Müller ist beim Duschen motiviert, die Pflegekraft übernimmt, weil es ihr zu lange dauert.',
          antworten: [
            'Sprechen (Resourcing) – seine Motivation und seine Fähigkeiten werden nicht genutzt.',
            'Hören (Einlassen) – die Pflegekraft hat kein offenes Ohr für seine Wünsche beim Duschen.',
            'Fühlen (Empathie) – die Pflegekraft fühlt sich nicht in seine Scham beim Duschen hinein.',
            'Tun (Berührung) – die Pflegekraft vermittelt beim Duschen keine körperliche Nähe.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Patientenedukation, hinderliche Faktoren, gesprächshemmendes Verhalten',
      gewicht: 3,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie jeder Form der Patientenedukation ihr **Ziel** zu.',
          zuordnung: {
            'Information': ['Wissen'],
            'Anleitung': ['Können'],
            'Schulung': ['systematisches Lernen'],
            'Beratung': ['Entscheidung unterstützen']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie jeder Form der Patientenedukation ihr **Vorgehen** zu.',
          zuordnung: {
            'Information': ['Wissen weitergeben, indem etwas erklärt wird'],
            'Anleitung': ['eine Handlung zeigen und von der Person einüben lassen'],
            'Schulung': ['Wissen und Fertigkeiten geplant und strukturiert vermitteln'],
            'Beratung': ['fragen, zuhören und gemeinsam klären – das Ergebnis ist offen']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie das Beispiel (Diabetes) der passenden Form der Patientenedukation zu.',
          zuordnung: {
            'Information': ['Anzeichen einer Unterzuckerung erklären'],
            'Anleitung': ['BZ-Messung zeigen, dann misst die Patientin selbst'],
            'Schulung': ['Programm zu Ernährung, Bewegung und Therapie'],
            'Beratung': ['„Wie möchten Sie die gemeinsamen Mahlzeiten mit Ihrer Familie gestalten?“']
          } },
        { typ: 'auswahl',
          frage: 'Vergleichen Sie Information und Anleitung hinsichtlich des **Vorgehens**: Was ist der Unterschied?',
          antworten: [
            'Bei der Anleitung handelt die Person selbst (sie übt), bei der Information nicht.',
            'Bei der Information handelt die Person selbst (sie übt), bei der Anleitung nicht.',
            'Information und Anleitung unterscheiden sich nur darin, wie lange sie dauern.',
            'Bei beiden erklärt die Pflegefachperson nur etwas – es gibt keinen Unterschied.'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher Form der Patientenedukation ordnen Sie die Situation zu?',
          fall: 'Ein Patient sagt nach einem Herzinfarkt: „Ich weiß gar nicht, womit ich anfangen soll.“ Die PK stellt Rückfragen und erkundet mit ihm Prioritäten sowie erste Schritte.',
          antworten: [
            'Beratung, weil eine individuelle Frage gemeinsam geklärt wird.',
            'Information, weil Wissen weitergegeben wird.',
            'Anleitung, weil eine Handlung gezeigt und eingeübt wird.',
            'Schulung, weil ein geplantes, strukturiertes Programm abläuft.'
          ] },
        { typ: 'zuordnen',
          frage: 'Leiten Sie aus dem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung ab.',
          zuordnung: {
            'zugewandt und auf Augenhöhe sprechen': ['Die PK bleibt an der Tür stehen.'],
            'für Ruhe und Privatsphäre sorgen': ['Der Fernseher läuft, Besuch und Reinigungskraft sind im Zimmer.'],
            'genügend Zeit einplanen, Störungen vermeiden': ['„Ich habe ungefähr fünf Minuten.“ – Das Diensttelefon klingelt.'],
            'verständliche Sprache verwenden': [],
            'ausreden lassen, Sorgen ernst nehmen': []
          } },
        { typ: 'zuordnen',
          frage: 'Leiten Sie aus dem hinderlichen Faktor (Beispiel Frau Schneider) eine Regel für eine gute Beratung ab.',
          zuordnung: {
            'Befinden beachten, Gespräch ggf. verschieben': ['Müdigkeit und Unwohlsein werden übergangen.'],
            'verständliche Sprache verwenden': ['Fachsprache („Kohlenhydratzufuhr“, „HbA1c“)'],
            'ausreden lassen, Sorgen ernst nehmen': ['unterbrechen, Sorgen herunterspielen („Das bekommen Sie schon hin.“)'],
            'zugewandt und auf Augenhöhe sprechen': [],
            'für Ruhe und Privatsphäre sorgen': []
          } },
        { typ: 'zuordnen',
          frage: 'Welche gesprächshemmende Verhaltensweise erkennen Sie in der Aussage der Pflegefachperson?',
          zuordnung: {
            'Ratschläge geben': ['„Lassen Sie den Kuchen doch einfach weg.“'],
            'belehren': ['„Zucker ist nun mal ungesund, das weiß doch jeder.“'],
            'drohen': ['„Sonst bekommen Sie Folgeschäden und verlieren Ihr Bein!“'],
            'bagatellisieren (herunterspielen)': ['„Das bekommen Sie schon hin.“'],
            'befehlen': [],
            'das Thema wechseln': [],
            'unnötige Fachsprache verwenden': []
          } },
        { typ: 'zuordnen',
          frage: 'Welche gesprächshemmende Verhaltensweise erkennen Sie in der Aussage der Pflegefachperson?',
          zuordnung: {
            'befehlen': ['„Sie müssen …“'],
            'das Thema wechseln': ['Pat.: „Ich habe Herzstechen!“ PK: „Schönes Wetter heute …“'],
            'unnötige Fachsprache verwenden': ['„Ihr HbA1c ist zu hoch.“'],
            'Ratschläge geben': [],
            'belehren': [],
            'drohen': [],
            'bagatellisieren (herunterspielen)': []
          } },
        { typ: 'auswahl',
          frage: 'Welche gesprächshemmenden Verhaltensweisen stecken in dieser Aussage?',
          fall: '„Ach, das wird schon wieder. Essen Sie doch einfach weniger Süßes!“',
          antworten: [
            'bagatellisieren („Ach, das wird schon wieder“) und Ratschläge geben („Essen Sie doch einfach weniger Süßes“)',
            'drohen („Ach, das wird schon wieder“) und das Thema wechseln („Essen Sie doch einfach weniger Süßes“)',
            'belehren („Ach, das wird schon wieder“) und unnötige Fachsprache („Essen Sie doch einfach weniger Süßes“)',
            'Gefühle verbalisieren („Ach, das wird schon wieder“) und Ratschläge geben („Essen Sie doch einfach weniger Süßes“)'
          ] },
        { typ: 'zeile',
          frage: 'Tippen Sie **alle** Zeilen an, in denen ein **hinderlicher Faktor** für die Beratung steht.',
          zeilen: [
            'Pflegefachfrau Sara möchte Herrn Neumann (74 J.) zu seinem neuen Inhalationsgerät beraten.',
            'Sie setzt sich zu ihm an den Tisch und fragt, wie es ihm heute geht.',
            'Im Zimmer läuft laut der Fernseher seines Mitpatienten.',
            'Sara erklärt: „So ist die Deposition im Bronchialsystem am besten.“',
            'Herr Neumann erzählt, dass er Angst hat, etwas falsch zu machen.',
            'Sara antwortet: „Ach, das ist doch kinderleicht.“'
          ],
          richtig: [3, 4, 6],
          erklaerung: 'Z. 3: keine Ruhe → für Ruhe und Privatsphäre sorgen. Z. 4: Fachsprache → verständliche Sprache verwenden. Z. 6: Sorge heruntergespielt → Sorgen ernst nehmen. Z. 2 ist gut: auf Augenhöhe, Befinden erfragt.' },
        { typ: 'auswahl',
          frage: 'Vergleichen Sie **Information** und **Anleitung** hinsichtlich des Vorgehens. Welche Antwort ist ein **vollständiger Vergleich in ganzen Sätzen**?',
          antworten: [
            'Bei der Information gibt die Pflegefachperson Wissen weiter, indem sie etwas erklärt. Bei der Anleitung zeigt sie eine Handlung, und die Person übt sie selbst ein. Der Unterschied: Bei der Anleitung handelt die Person selbst.',
            'Information: Wissen weitergeben, erklären; Ziel: Wissen. – Anleitung: Handlung zeigen, einüben lassen; Ziel: Können. – Unterschied: Bei der Anleitung übt die Person selbst, bei der Information nicht.',
            'Bei der Anleitung zeigt die Pflegefachperson eine Handlung, und die Person übt sie anschließend selbst ein, bis sie sicher ist. Das ist wichtig, weil die Person die Handlung später allein durchführen muss.',
            'Bei der Information gibt die Pflegefachperson Wissen weiter, indem sie etwas erklärt. Bei der Anleitung vermittelt sie ebenfalls Wissen, indem sie etwas erklärt. Deshalb gibt es beim Vorgehen keinen Unterschied.'
          ],
          erklaerung: 'Ein vollständiger Vergleich beschreibt beide Seiten in ganzen Sätzen und benennt den Unterschied ausdrücklich. Stichworte oder nur eine Seite reichen in der Klausur nicht.' },
        { typ: 'mehrfach',
          frage: 'Welche Umstände sind **hinderliche Faktoren** für ein Beratungsgespräch? Tippen Sie **alle** richtigen an.',
          richtig: [
            'Die Person ist erschöpft und hat Schmerzen.',
            'Im Zimmer läuft laut der Fernseher.',
            'Die Pflegefachkraft schaut immer wieder auf die Uhr.',
            'Es fallen viele Fachbegriffe.'
          ],
          falsch: [
            'Die Pflegefachkraft setzt sich auf Augenhöhe.',
            'Sie fragt nach, was die Person gerade beschäftigt.',
            'Für das Gespräch ist ein ruhiger Raum reserviert.'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Vergleichen Sie **Information** und **Anleitung** hinsichtlich Vorgehen und Ziel – in ganzen Sätzen.',
          muster: [
            'Vorgehen: Bei der Information gibt die Pflegefachperson Wissen weiter, indem sie etwas erklärt. Bei der Anleitung zeigt sie eine Handlung, und die Person übt sie selbst ein. Unterschied: Bei der Anleitung handelt die Person selbst, bei der Information nicht.',
            'Ziel: Die Information zielt auf Wissen, die Anleitung auf Können. Unterschied: etwas verstehen gegenüber etwas selbst tun können.'
          ],
          checkliste: [
            'Je Kriterium beide Seiten beschrieben?',
            'Den Unterschied ausdrücklich benannt?',
            'In ganzen Sätzen (keine Stichworttabelle)?'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Beratungsgrundsätze, -ansätze, Gesprächstechniken',
      gewicht: 2,
      fragen: [
        { typ: 'auswahl',
          frage: 'Was bedeutet der Beratungsgrundsatz „**ergebnisoffen**“?',
          antworten: [
            'Das Ergebnis steht nicht vorher fest; gemeinsam wird eine passende, realistische Lösung gesucht.',
            'Die Pflegefachperson legt das Ziel vorher fest und erklärt der Person den besten Weg dorthin.',
            'Die Beratung darf ohne Ergebnis enden – Hauptsache, es wurde in Ruhe miteinander gesprochen.',
            'Die Person darf nur zwischen zwei Lösungen wählen, die die Pflegefachperson vorher festgelegt hat.'
          ] },
        { typ: 'auswahl',
          frage: 'Was bedeutet der Beratungsgrundsatz „**partizipativ**“?',
          antworten: [
            'Die beratene Person wird aktiv beteiligt; ihre Wünsche, Erfahrungen, Ziele und Entscheidungen fließen ein.',
            'Die Angehörigen werden aktiv beteiligt und entscheiden stellvertretend für die beratene Person.',
            'Mehrere Berufsgruppen beraten die Person gemeinsam und stimmen ihre Empfehlungen vorher untereinander genau ab.',
            'Die Person hört aufmerksam zu; die Pflegefachperson entscheidet, welche Lösung am besten passt.'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Frage ist **ergebnisoffen**?',
          antworten: [
            '„Welche Form von Bewegung könnten Sie sich in Ihrem Alltag vorstellen?“',
            '„Sie gehen ab morgen jeden Tag 30 Minuten spazieren, einverstanden?“',
            '„Wollen Sie nicht lieber schwimmen gehen? Das ist gut für die Gelenke.“',
            '„Warum bewegen Sie sich eigentlich so wenig, obwohl Sie es besser wissen?“'
          ] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die **Leitfrage** dem passenden Beratungsansatz zu.',
          zuordnung: {
            'personenzentriert (Rogers)': ['Wie erlebt die Person ihre Situation – was bedeutet sie für sie?'],
            'ressourcen-/lösungsorientiert': ['Was gelingt schon? Was hilft? Was wäre ein kleiner nächster Schritt?'],
            'motivationsfördernd (MI)': ['Was möchte die Person selbst verändern? Was spricht dafür, was dagegen?']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie **Fokus** und **Rolle der PK** dem passenden Beratungsansatz zu.',
          zuordnung: {
            'personenzentriert (Rogers)': ['Fokus: Erleben, Gedanken, Gefühle', 'Rolle der PK: empathische Begleiterin'],
            'ressourcen-/lösungsorientiert': ['Fokus: Fähigkeiten, Gelingendes, Ausnahmen', 'Rolle der PK: Impulsgeberin'],
            'motivationsfördernd (MI)': ['Fokus: Ambivalenz, eigene Gründe und Ziele', 'Rolle der PK: Begleiterin, die nicht überredet']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die typischen **Gesprächselemente** dem passenden Beratungsansatz zu.',
          zuordnung: {
            'personenzentriert (Rogers)': ['Paraphrasieren', 'Gefühle verbalisieren'],
            'ressourcen-/lösungsorientiert': ['Ausnahmefragen', 'Skalierungsfragen'],
            'motivationsfördernd (MI)': ['Ambivalenz aufgreifen', 'reflektierendes Zuhören']
          } },
        { typ: 'zuordnen',
          frage: 'Welche Gesprächstechnik zeigt das Beispiel (Frau Schneider)?',
          zuordnung: {
            'aktives Zuhören': ['„Mhm … erzählen Sie ruhig weiter.“'],
            'Paraphrasieren': ['„Sie sind also mit dem Pen noch unsicher.“'],
            'Gefühle verbalisieren': ['„Das klingt, als ob die vielen Anforderungen Sie unter Druck setzen.“'],
            'offene Frage': [],
            'Skalierungsfrage': [],
            'Zusammenfassen': []
          } },
        { typ: 'zuordnen',
          frage: 'Welche Gesprächstechnik zeigt das Beispiel (Frau Schneider)?',
          zuordnung: {
            'offene Frage': ['„Was beschäftigt Sie im Moment am meisten?“'],
            'Skalierungsfrage': ['„Wie sicher fühlen Sie sich mit dem Pen – von 0 bis 10?“'],
            'Zusammenfassen': ['„Dann halte ich fest: …“'],
            'aktives Zuhören': [],
            'Paraphrasieren': [],
            'Gefühle verbalisieren': []
          } },
        { typ: 'auswahl',
          frage: 'Was tun Sie beim **Paraphrasieren**?',
          antworten: [
            'den Inhalt mit eigenen Worten wiedergeben',
            'das Gefühl hinter der Aussage ansprechen',
            'eine Einschätzung auf einer Skala von 0 bis 10 erfragen',
            'das Wichtigste bündeln, bevor es weitergeht'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Frage ist eine **offene Frage**?',
          antworten: [
            '„Was beschäftigt Sie im Moment am meisten?“',
            '„Haben Sie heute schon gemessen?“',
            '„Sind Sie mit dem Pen noch unsicher?“',
            '„Möchten Sie lieber morgens oder abends messen?“'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Ressourcenorientierung, passenden Ansatz wählen',
      gewicht: 2,
      fragen: [
        { typ: 'auswahl',
          frage: 'Problemorientiert: „Sie bewegen sich viel zu wenig.“ – Welche Umformulierung ist **ressourcenorientiert**?',
          antworten: [
            '„Welche Bewegung gelingt Ihnen schon? Was wäre ein kleiner nächster Schritt?“',
            '„Sie müssen sich mehr bewegen, sonst bekommen Sie Folgeschäden.“',
            '„Warum bewegen Sie sich denn nicht mehr? Was genau hält Sie eigentlich davon ab?“',
            '„Bewegung ist wichtig, das weiß doch jeder – fangen Sie einfach morgen an.“'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Aussage ist **ressourcenorientiert**?',
          antworten: [
            '„Was gelingt Ihnen beim Messen schon gut?“',
            '„Sie vergessen das Messen ständig.“',
            '„Ihr Wert ist schon wieder zu hoch.“',
            '„Das Problem ist, dass Sie sich nicht an den Plan halten.“'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher Beratungsansatz ist in dieser Situation **besonders geeignet**?',
          fall: 'Eine Patientin sagt mit Tränen in den Augen: „Alle sagen mir ständig, was ich anders machen soll. Mir wird das zu viel!“',
          antworten: [
            'der personenzentrierte Ansatz, weil die Patientin emotional überfordert ist und sich zuerst verstanden fühlen muss',
            'der lösungsorientierte Ansatz, weil die Patientin jetzt vor allem einen klaren nächsten Schritt braucht',
            'der motivationsfördernde Ansatz, weil die Patientin hin- und hergerissen ist und überredet werden muss',
            'gar keine Beratung, weil die Patientin weint und deshalb heute keine Informationen aufnehmen kann'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher **Gesprächseinstieg** passt zu dieser Situation?',
          fall: 'Eine Patientin sagt mit Tränen in den Augen: „Alle sagen mir ständig, was ich anders machen soll. Mir wird das zu viel!“',
          antworten: [
            '„Das klingt, als ob Ihnen das gerade zu viel wird. Was belastet Sie am meisten?“',
            '„Was wäre denn ein kleiner nächster Schritt, den Sie heute schon schaffen könnten?“',
            '„Das bekommen Sie schon hin! Andere Patientinnen haben das auch geschafft.“',
            '„Dann machen wir am besten gleich einen Plan, was Sie ab morgen ändern.“'
          ] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage – und warum?',
          fall: '„Bei emotionaler Überforderung ist ein lösungsorientierter Einstieg („Was wäre ein nächster Schritt?“) der beste Start.“',
          antworten: [
            'Falsch: Zuerst muss sich die Person verstanden fühlen – passend ist der personenzentrierte Ansatz.',
            'Richtig: Ein konkreter nächster Schritt lenkt von den Gefühlen ab und nimmt so den Druck heraus.',
            'Falsch: Bei Überforderung passt der motivationsfördernde Ansatz, weil man die Person überreden muss.',
            'Richtig: Lösungsorientierte Fragen passen immer, weil jede Beratung ein konkretes Ergebnis braucht.'
          ] },
        { typ: 'zuordnen',
          frage: 'Woran erkennen Sie den passenden Beratungsansatz? Ordnen Sie zu.',
          zuordnung: {
            'personenzentriert': ['Die Person weint und sagt: „Mir wird das alles zu viel.“', 'Die Person wirkt verzweifelt und fühlt sich von allen unter Druck gesetzt.'],
            'motivationsfördernd (MI)': ['„Eigentlich sollte ich weniger Salz essen, aber dann schmeckt mir nichts mehr.“', 'Die Person schwankt zwischen „Ich will etwas ändern“ und „Ich will nichts aufgeben“.'],
            'ressourcen-/lösungsorientiert': ['„Letzte Woche habe ich es schon zweimal geschafft. Wie geht es weiter?“', 'Die Person erzählt, was ihr schon einmal gut geholfen hat.']
          } },
        { typ: 'auswahl',
          frage: 'Welcher Beratungsansatz ist in dieser Situation **besonders geeignet**?',
          fall: 'Herr Kraus (58 J., COPD) sagt: „Eigentlich weiß ich, dass ich mit dem Rauchen aufhören sollte. Aber die Zigarette nach dem Essen ist meine einzige Pause am Tag.“',
          antworten: [
            'der motivationsfördernde Ansatz (MI), weil Herr Kraus hin- und hergerissen ist (Ambivalenz)',
            'der personenzentrierte Ansatz, weil Herr Kraus emotional überfordert ist',
            'der ressourcenorientierte Ansatz, weil Herr Kraus schon einmal erfolgreich mit dem Rauchen aufgehört hat',
            'gar kein Beratungsansatz, weil Herr Kraus eine klare Anweisung braucht'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher **Gesprächseinstieg** passt zu dieser Situation?',
          fall: 'Herr Kraus (58 J., COPD) sagt: „Eigentlich weiß ich, dass ich mit dem Rauchen aufhören sollte. Aber die Zigarette nach dem Essen ist meine einzige Pause am Tag.“',
          antworten: [
            '„Einerseits möchten Sie aufhören, andererseits ist die Zigarette Ihre Pause. Was spricht für Sie dafür, etwas zu ändern?“',
            '„Sie müssen sofort aufhören, sonst wird Ihre COPD immer schlimmer. Ich gebe Ihnen gleich einen Flyer dazu.“',
            '„Das schaffen Sie schon, andere haben das auch geschafft. Fangen Sie einfach heute nach dem Essen damit an.“',
            '„Warum rauchen Sie denn überhaupt noch, obwohl Sie COPD haben? Ihnen ist doch klar, wie schädlich das ist.“'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher Beratungsansatz ist in dieser Situation **besonders geeignet**?',
          fall: 'Frau Peters (70 J.) hat nach einem Schlaganfall eine Schwäche in der rechten Hand. Sie erzählt: „Wenn meine Enkelin mit mir knetet, klappt das Knöpfen schon fast allein.“ Sie fragt, was sie selbst noch tun kann.',
          antworten: [
            'der ressourcen-/lösungsorientierte Ansatz, weil schon etwas gelingt und Frau Peters einen nächsten Schritt sucht',
            'der motivationsfördernde Ansatz (MI), weil Frau Peters zwischen Üben und Aufgeben hin- und hergerissen ist',
            'der personenzentrierte Ansatz, weil Frau Peters nach dem Schlaganfall emotional überfordert ist',
            'gar kein Beratungsansatz, weil eine Schulung zu Übungen für die Hand für sie völlig ausreicht'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher **Gesprächseinstieg** passt zu dieser Situation?',
          fall: 'Frau Peters (70 J.) hat nach einem Schlaganfall eine Schwäche in der rechten Hand. Sie erzählt: „Wenn meine Enkelin mit mir knetet, klappt das Knöpfen schon fast allein.“ Sie fragt, was sie selbst noch tun kann.',
          antworten: [
            '„Das ist ein schöner Fortschritt! Was genau hilft Ihnen, wenn Sie mit Ihrer Enkelin üben?“',
            '„Knöpfen ist doch nicht so wichtig, das kann Ihre Enkelin auch in Zukunft weiterhin für Sie machen.“',
            '„Sie müssen jeden Tag eine Stunde üben, sonst wird das mit dem Knöpfen nie etwas.“',
            '„Warum klappt es denn ohne Ihre Enkelin noch nicht? Was machen Sie allein anders?“'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Beurteilen Sie, welcher Beratungsansatz besonders geeignet ist, und formulieren Sie einen passenden Gesprächseinstieg.',
          fall: 'Frau Arnold (67 J.) erzählt: „Seit ich abends die Tabletten neben die Zahnbürste lege, vergesse ich sie nicht mehr. Morgens klappt das aber noch nicht.“',
          muster: [
            'Ressourcen-/lösungsorientiert: Abends gelingt es schon, und Frau Arnold sucht einen nächsten Schritt. Sie ist weder hin- und hergerissen (MI) noch emotional überfordert (personenzentriert).',
            'Einstieg z. B.: „Abends klappt das ja schon richtig gut! Was könnte Ihnen morgens ähnlich helfen wie die Zahnbürste am Abend?“'
          ],
          checkliste: [
            'Den Ansatz benannt?',
            'Mit Hinweisen aus dem Fall begründet?',
            'Den Einstieg als wörtliche Frage formuliert, passend zum Ansatz?'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Beratungsprozess (6 Phasen) und SMART-Ziele',
      gewicht: 3,
      fragen: [
        { typ: 'reihenfolge',
          frage: 'Bringen Sie die **sechs Phasen des Beratungsprozesses** in die richtige Reihenfolge.',
          schritte: [
            'Beziehung herstellen',
            'Beratungsbedürfnisse/-bedarfe erfassen',
            'Beratungsziele aushandeln',
            'Lösungen entwickeln',
            'Beratungsprozess reflektieren',
            'Beratung beenden'
          ] },
        { typ: 'zuordnen',
          frage: 'In welcher Phase sagt die Pflegefachperson das zu Herrn Meier (Herzinsuffizienz)?',
          zuordnung: {
            '1. Beziehung herstellen': ['„Guten Tag, Herr Meier, wie geht es Ihnen heute? Darf ich mit Ihnen über das sprechen, was Sie bei Ihrer Herzinsuffizienz beschäftigt?“'],
            '3. Beratungsziele aushandeln': ['„Was möchten Sie nach unserem Gespräch besser verstehen oder sicherer können?“'],
            '5. Beratungsprozess reflektieren': ['„Was war heute besonders hilfreich? Was ist noch unklar?“'],
            '2. Beratungsbedürfnisse/-bedarfe erfassen': [],
            '4. Lösungen entwickeln': [],
            '6. Beratung beenden': []
          } },
        { typ: 'zuordnen',
          frage: 'In welcher Phase sagt die Pflegefachperson das zu Herrn Meier (Herzinsuffizienz)?',
          zuordnung: {
            '2. Beratungsbedürfnisse/-bedarfe erfassen': ['„Was verunsichert Sie im Moment am meisten?“'],
            '4. Lösungen entwickeln': ['„Darf ich Ihnen zwei mögliche Gründe für die Ödeme erklären? Dann schauen wir, was davon bei Ihnen passt.“'],
            '6. Beratung beenden': ['„Dann halten wir fest: … Beim nächsten Besuch schauen wir, wie es Ihnen ergangen ist.“'],
            '1. Beziehung herstellen': [],
            '3. Beratungsziele aushandeln': [],
            '5. Beratungsprozess reflektieren': []
          } },
        { typ: 'auswahl',
          frage: 'Was passiert in der Phase **4. Lösungen entwickeln**?',
          antworten: [
            'passende Informationen geben, Wahlmöglichkeiten statt Ratschläge, Ressourcen nutzen',
            'Ergebnis festhalten, dokumentieren, nächsten Schritt oder einen Folgetermin vereinbaren',
            'begrüßen, Kontakt und Vertrauen aufbauen, Anlass und Rahmen klären',
            'prüfen, was verstanden und hilfreich war; offene Fragen klären'
          ] },
        { typ: 'auswahl',
          frage: 'Wofür steht **SMART** bei einem Beratungsziel?',
          antworten: [
            'spezifisch, messbar, akzeptiert, realistisch, terminiert',
            'sinnvoll, machbar, angenehm, richtig, teamorientiert',
            'spezifisch, motivierend, aktuell, rechtlich geprüft, therapeutisch',
            'schnell, messbar, anerkannt, rechtzeitig, theoretisch'
          ] },
        { typ: 'auswahl',
          frage: 'Welches Beratungsziel ist **SMART** formuliert?',
          antworten: [
            '„Am Ende des ersten Gesprächs kann Herr Meier drei Warnzeichen einer Verschlechterung nennen und sagen, wann er die Hausärztin anruft.“',
            '„Herr Meier soll in Zukunft besser auf sein Herz achten und bei Problemen mit der Atmung rechtzeitig Bescheid geben.“',
            '„Herr Meier weiß irgendwann alles Wichtige über seine Herzinsuffizienz und kann sich dann zu Hause selbst gut versorgen.“',
            '„Herr Meier soll gesünder leben: sich mehr bewegen, weniger Salz essen und regelmäßig seine Tabletten einnehmen.“'
          ] },
        { typ: 'auswahl',
          frage: 'Was tun Sie in **Phase 2 (Beratungsbedürfnisse/-bedarfe erfassen)**?',
          fall: 'Frau Ott (76 J.) hat eine Herzinsuffizienz und soll nach der Entlassung täglich ihr Gewicht kontrollieren. Phase 1 ist abgeschlossen.',
          antworten: [
            'Ihre Sicht erfragen und zuhören: „Was geht Ihnen durch den Kopf, wenn Sie an das tägliche Wiegen denken?“',
            'Ein Ziel vereinbaren: „Ab morgen wiegen Sie sich jeden Morgen vor dem Frühstück und schreiben es auf.“',
            'Das Ergebnis festhalten: „Dann halten wir fest, was wir besprochen haben, und sehen uns nächste Woche wieder.“',
            'Rückblick halten: „Was war heute für Sie besonders hilfreich, und was ist noch unklar geblieben?“'
          ] },
        { typ: 'auswahl',
          frage: 'Welches Beratungsziel ist **SMART** formuliert?',
          antworten: [
            '„Herr Meier wiegt sich ab morgen eine Woche lang jeden Morgen vor dem Frühstück und notiert das Gewicht in seinem Tagebuch.“',
            '„Herr Meier soll in Zukunft mehr auf sein Gewicht achten und es seiner Hausärztin melden, wenn es ihm auffällt.“',
            '„Herr Meier wiegt sich regelmäßig, am besten morgens, und schreibt das Gewicht immer gleich in ein Heft.“',
            '„Herr Meier weiß irgendwann, warum das tägliche Wiegen bei seiner Herzinsuffizienz so wichtig ist.“'
          ] },
        { typ: 'auswahl',
          frage: 'Was fehlt diesem Beratungsziel?',
          fall: 'Frau Schulz (84 J.) trinkt zu wenig. Ziel: „Frau Schulz soll mehr trinken.“',
          antworten: [
            'Es ist nicht messbar und nicht terminiert (wie viel? bis wann?) und nicht mit Frau Schulz vereinbart.',
            'Nichts – das Ziel ist SMART formuliert, weil es spezifisch sagt, was Frau Schulz tun soll.',
            'Es fehlt nur eine Begründung, warum ausreichendes Trinken im Alter so wichtig ist.',
            'Es ist zu konkret und zu streng – Beratungsziele sollten möglichst offen formuliert bleiben.'
          ] },
        { typ: 'mehrfach',
          frage: 'Was tun Sie in **Phase 2 (Beratungsbedürfnisse/-bedarfe erfassen)**? Tippen Sie **alle** richtigen an.',
          richtig: [
            'die Sicht der Person erfragen und zuhören',
            'Beobachtungen einordnen',
            'Probleme gemeinsam benennen'
          ],
          falsch: [
            'ein realistisches Ziel vereinbaren',
            'Wahlmöglichkeiten statt Ratschläge anbieten',
            'einen Folgetermin vereinbaren'
          ],
          erklaerung: 'Ziel vereinbaren gehört zu Phase 3, Wahlmöglichkeiten anbieten zu Phase 4, einen Folgetermin vereinbaren zu Phase 6.' }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Formulieren Sie ein SMARTes Beratungsziel.',
          fall: 'Frau Gärtner (79 J.) vergisst häufig, ihre Blutdrucktabletten einzunehmen. Sie möchte das ändern.',
          muster: [
            'z. B.: „Frau Gärtner nimmt ab morgen zwei Wochen lang jeden Morgen nach dem Frühstück ihre Blutdrucktablette und hakt sie auf ihrem Wochenplan ab.“'
          ],
          checkliste: [
            'Aus Sicht von Frau Gärtner formuliert?',
            'Messbar (was genau, wie oft)?',
            'Terminiert (ab wann, wie lange)?',
            'Realistisch und für sie annehmbar?'
          ] },
        { typ: 'schreiben',
          frage: 'Stellen Sie dar, wie Sie in Phase 2 (Beratungsbedürfnisse/-bedarfe erfassen) bei Frau Ott vorgehen.',
          fall: 'Frau Ott (76 J.) hat eine Herzinsuffizienz und soll nach der Entlassung täglich ihr Gewicht kontrollieren.',
          muster: [
            'Ihre Sicht erfragen und zuhören, z. B.: „Was geht Ihnen durch den Kopf, wenn Sie an das tägliche Wiegen denken?“',
            'Beobachtungen einordnen, z. B. geschwollene Beine oder Atemnot ansprechen.',
            'Probleme gemeinsam benennen, z. B. wo die Waage steht und wann das Wiegen in ihren Alltag passt.'
          ],
          checkliste: [
            'Die Sicht von Frau Ott erfragt (wörtliche Frage)?',
            'Beobachtungen eingeordnet?',
            'Probleme gemeinsam benannt – mit Bezug zum Fall?'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Beratungskompetenz',
      gewicht: 0,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beschreibung dem passenden Bereich der **Beratungskompetenz** zu.',
          zuordnung: {
            'Fachkompetenz': ['aktuelles Fachwissen, Hilfsangebote und rechtliche Grenzen kennen'],
            'Methodenkompetenz': ['Gespräch nach den sechs Phasen strukturieren'],
            'sozial-kommunikative Kompetenz': ['Beziehung aufbauen; Empathie, Akzeptanz (Wertschätzung), Kongruenz'],
            'personale Kompetenz': ['eigene Haltung und Gefühle reflektieren; Selbstfürsorge']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beschreibung dem passenden Bereich der **Beratungskompetenz** zu.',
          zuordnung: {
            'Fachkompetenz': ['korrekt und verständlich informieren'],
            'Methodenkompetenz': ['Gesprächstechniken einsetzen (z. B. Paraphrasieren, Skalierungsfragen)'],
            'sozial-kommunikative Kompetenz': ['alle Sichtweisen erfragen, keine Partei ergreifen'],
            'personale Kompetenz': ['eigene Grenzen erkennen und die Person bei Bedarf an andere Fachleute weitervermitteln']
          } },
        { typ: 'auswahl',
          frage: 'Welchem Bereich der Beratungskompetenz ordnen Sie das Verhalten zu?',
          fall: 'Die PK merkt im Gespräch, dass sie ungeduldig wird, und nimmt sich bewusst zurück.',
          antworten: [
            'personale Kompetenz, weil sie ihre eigenen Gefühle wahrnimmt und reflektiert',
            'Fachkompetenz, weil sie ihr Fachwissen über Gesprächsführung gezielt anwendet',
            'Methodenkompetenz, weil sie bewusst eine Gesprächstechnik zur Beruhigung einsetzt',
            'sozial-kommunikative Kompetenz, weil sie die Beziehung zur Person schützen will'
          ] },
        { typ: 'auswahl',
          frage: 'Zu welchem Bereich der Beratungskompetenz gehört es, **SMART-Ziele** zu formulieren?',
          antworten: ['Methodenkompetenz', 'Fachkompetenz', 'sozial-kommunikative Kompetenz', 'personale Kompetenz'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Bezugspersonen einbeziehen, Beratung beurteilen',
      gewicht: 2,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Bezugspersonen professionell einbeziehen: Ordnen Sie die passende **Begründung** zu.',
          zuordnung: {
            '… weil die Schweigepflicht gilt.': ['nur mit Einverständnis der beratenen Person'],
            '… weil die Person sonst übergangen wird.': ['gemeinsam sprechen, nicht „über den Kopf hinweg“'],
            '… weil sonst Vertrauen verloren geht.': ['alle Sichtweisen erfragen, keine Partei ergreifen'],
            '… weil sie ein Recht auf Selbstbestimmung (Autonomie) hat.': [],
            '… weil auch sie Unterstützung brauchen können.': []
          } },
        { typ: 'zuordnen',
          frage: 'Bezugspersonen professionell einbeziehen: Ordnen Sie die passende **Begründung** zu.',
          zuordnung: {
            '… weil sie ein Recht auf Selbstbestimmung (Autonomie) hat.': ['Die Entscheidung bleibt bei der beratenen Person.'],
            '… weil auch sie Unterstützung brauchen können.': ['Belastung der Angehörigen wahrnehmen'],
            '… weil die Schweigepflicht gilt.': [],
            '… weil die Person sonst übergangen wird.': [],
            '… weil sonst Vertrauen verloren geht.': []
          } },
        { typ: 'auswahl',
          frage: 'Wie verhalten Sie sich professionell?',
          fall: 'Die Tochter eines Patienten ruft an und möchte wissen, was in der Beratung besprochen wurde. Der Patient hat einer Weitergabe nicht zugestimmt.',
          antworten: [
            'Keine Auskunft geben, weil die Schweigepflicht gilt: Bezugspersonen nur mit Einverständnis der Person einbeziehen.',
            'Alles erzählen, weil Angehörige immer ein Recht auf Information haben – besonders, wenn sie sich kümmern.',
            'Nur das Wichtigste erzählen, weil die Tochter ihren Vater zu Hause unterstützt und das wissen muss.',
            'Die Tochter entscheiden lassen, was mit ihrem Vater besprochen wird, weil sie ihn am besten kennt.'
          ] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage der Kollegin im Hinblick auf eine professionelle Beratung?',
          fall: 'Frau Kühn hat gerade die Diagnose Diabetes Typ 2 erhalten. Eine Kollegin sagt zu ihr: „Das ist ganz einfach: Sie müssen ab sofort auf Zucker verzichten und jeden Tag eine halbe Stunde spazieren gehen. Sonst bekommen Sie Folgeschäden.“',
          antworten: [
            'keine professionelle Beratung, sondern Belehrung – nicht ergebnisoffen, nicht partizipativ',
            'professionelle Beratung, weil die Kollegin klare Ziele vorgibt, an denen sich Frau Kühn orientieren kann',
            'professionelle Beratung, weil sie rechtzeitig und deutlich auf mögliche Folgeschäden hinweist',
            'eine Schulung, weil Wissen über Ernährung und Bewegung geplant und strukturiert vermittelt wird'
          ] },
        { typ: 'zuordnen',
          frage: 'Frau Kühn: Was steckt in den Teilen der Aussage der Kollegin?',
          zuordnung: {
            'bagatellisierend': ['„Das ist ganz einfach …“'],
            'befehlend': ['„Sie müssen ab sofort auf Zucker verzichten und jeden Tag eine halbe Stunde spazieren gehen.“'],
            'drohend': ['„Sonst bekommen Sie Folgeschäden.“']
          } },
        { typ: 'auswahl',
          frage: 'Warum schadet eine Drohung wie „Sonst bekommen Sie Folgeschäden.“ der Beratung?',
          antworten: [
            'Sie kann Angst und Widerstand verstärken.',
            'Sie ist zu kurz, um verstanden zu werden.',
            'Sie enthält zu viel Fachsprache.',
            'Sie ist grundsätzlich rechtlich verboten.'
          ] },
        { typ: 'zeile',
          frage: 'Tippen Sie **alle** Zeilen an, in denen Ben den Sohn **professionell** in die Beratung einbezieht.',
          zeilen: [
            'Herr Wolf (80 J.) soll nach der Entlassung seine Tabletten selbst richten.',
            'Sein Sohn möchte beim Beratungsgespräch dabei sein.',
            'Pfleger Ben fragt Herrn Wolf zuerst, ob er damit einverstanden ist.',
            'Ben bespricht den Medikamentenplan danach nur mit dem Sohn.',
            'Der Sohn erzählt, dass er sich wegen der vielen Tabletten Sorgen macht.',
            'Ben nimmt die Sorge ernst und fragt, was ihn entlasten würde.'
          ],
          richtig: [3, 6],
          erklaerung: 'Z. 3: nur mit Einverständnis (Schweigepflicht). Z. 6: die Belastung der Angehörigen wahrnehmen. Z. 4 ist nicht professionell: Ben spricht über den Kopf von Herrn Wolf hinweg.' },
        { typ: 'auswahl',
          frage: 'Welche **Wirkung** hat die Aussage – und wie beurteilen Sie sie?',
          fall: 'Herr Lang erzählt, dass er abends gern ein Bier trinkt. Die Pflegefachkraft sagt: „Das geht so nicht, das wissen Sie doch.“ Herr Lang verschränkt die Arme und sagt nichts mehr.',
          antworten: [
            'Herr Lang zieht sich zurück, das Gespräch bricht ab – keine professionelle Beratung, sondern Belehrung.',
            'Herr Lang denkt in Ruhe nach und ändert sein Verhalten – eine professionelle, klare Beratung.',
            'Keine Wirkung – das Verschränken der Arme hat mit der Aussage der Pflegefachkraft gar nichts zu tun.',
            'Herr Lang fühlt sich verstanden, weil die Pflegefachkraft ehrlich und mit Empathie reagiert hat.'
          ] },
        { typ: 'mehrfach',
          frage: 'Welche gesprächshemmenden Verhaltensweisen stecken in der Aussage? Tippen Sie **alle** richtigen an.',
          fall: 'Eine Pflegefachkraft sagt: „Das ist doch halb so wild. Sie müssen jetzt einfach konsequent sein, sonst landen Sie bald wieder hier.“',
          richtig: [
            'bagatellisieren („Das ist doch halb so wild.“)',
            'befehlen („Sie müssen …“)',
            'drohen („sonst landen Sie bald wieder hier“)'
          ],
          falsch: [
            'das Thema wechseln',
            'unnötige Fachsprache verwenden',
            'Gefühle verbalisieren'
          ] },
        { typ: 'mehrfach',
          frage: 'Woran halten Sie sich, wenn Angehörige an der Beratung teilnehmen? Tippen Sie **alle** richtigen an.',
          richtig: [
            'nur mit Einverständnis der beratenen Person',
            'gemeinsam sprechen, nicht über ihren Kopf hinweg',
            'die Entscheidung bleibt bei der beratenen Person'
          ],
          falsch: [
            'die Angehörigen entscheiden, wenn sie es besser wissen',
            'im Streit für die Angehörigen Partei ergreifen',
            'Informationen auch ohne Zustimmung weitergeben'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Beurteilen Sie die Aussage der Pflegefachkraft im Hinblick auf eine professionelle Beratung.',
          fall: 'Herr Brandl isst gern Wurst. Eine Pflegefachkraft sagt: „Ach, das bisschen Salz ist doch kein Problem. Aber Sie müssen jetzt endlich auf Ihren Blutdruck achten!“ Herr Brandl schaut weg und sagt nichts mehr.',
          muster: [
            'bagatellisieren („das bisschen Salz ist doch kein Problem“) – die Situation wird heruntergespielt.',
            'befehlen („Sie müssen …“) – nicht ergebnisoffen, nicht partizipativ.',
            'Wirkung: Herr Brandl zieht sich zurück, das Gespräch bricht ab.',
            'Urteil: keine professionelle Beratung, sondern Belehrung.'
          ],
          checkliste: [
            'Mindestens zwei gesprächshemmende Verhaltensweisen mit Textbeleg?',
            'Die Wirkung auf Herrn Brandl beschrieben?',
            'Ein klares Urteil formuliert?'
          ] }
      ]
    }
  ]
};
