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
 * Optional bei jeder Aufgabe: fall: '…' (eingerahmter Fall) und
 * erklaerung: '…' (erscheint in der Auswertung bei den Lösungen).
 * ===================================================================== */

var CHALLENGE_FRAGEN = {
  satz: 'kb2-beratung',

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Wittener Werkzeuge',
      fragen: [
        { typ: 'auswahl',
          frage: 'Was bedeutet „**doppelte Fürsorge**“ im Kontext der Wittener Werkzeuge?',
          antworten: [
            'Die beratene Person wird gestärkt – zugleich achtet die Pflegefachperson auf ihre eigenen Bedürfnisse, ihre Selbstachtung und Selbstfürsorge.',
            'Zwei Pflegefachpersonen betreuen gemeinsam eine Person.',
            'Die Pflegefachperson kümmert sich doppelt so lange um die Person wie üblich.',
            'Die Person und ihre Angehörigen werden gleichzeitig beraten.'
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
            'Hören (Einlassen) – die Pflegekraft hört ihm nicht zu.',
            'Fühlen (Empathie) – die Pflegekraft fühlt sich nicht in ihn hinein.',
            'Tun (Berührung) – die Pflegekraft berührt ihn nicht.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Patientenedukation, hinderliche Faktoren, gesprächshemmendes Verhalten',
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
            'Bei der Information handelt die Person selbst, bei der Anleitung nicht.',
            'Information und Anleitung unterscheiden sich nur in der Dauer.',
            'Bei beiden erklärt die Pflegefachperson nur – es gibt keinen Unterschied.'
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
            'unnötige Fachsprache verwenden': ['„Gemäß BSS entspricht Ihr Defäkat heute Typ 7.“'],
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
            'drohen und das Thema wechseln',
            'unnötige Fachsprache verwenden und unterbrechen',
            'belehren und drohen'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Beratungsgrundsätze, -ansätze, Gesprächstechniken',
      fragen: [
        { typ: 'auswahl',
          frage: 'Was bedeutet der Beratungsgrundsatz „**ergebnisoffen**“?',
          antworten: [
            'Das Ergebnis steht nicht vorher fest; gemeinsam wird eine passende, realistische Lösung gesucht.',
            'Die Pflegefachperson legt das Ziel fest und erklärt den Weg dorthin.',
            'Die Beratung darf ohne Ergebnis enden, Hauptsache es wurde gesprochen.',
            'Die Person darf nur zwischen zwei vorgegebenen Lösungen wählen.'
          ] },
        { typ: 'auswahl',
          frage: 'Was bedeutet der Beratungsgrundsatz „**partizipativ**“?',
          antworten: [
            'Die beratene Person wird aktiv beteiligt; ihre Wünsche, Erfahrungen, Ziele und Entscheidungen fließen ein.',
            'Die Angehörigen entscheiden stellvertretend für die Person.',
            'Mehrere Berufsgruppen beraten die Person gleichzeitig.',
            'Die Person hört zu, die Pflegefachperson entscheidet.'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Frage ist **ergebnisoffen**?',
          antworten: [
            '„Welche Form von Bewegung könnten Sie sich in Ihrem Alltag vorstellen?“',
            '„Sie gehen ab morgen jeden Tag 30 Minuten spazieren, ja?“',
            '„Wollen Sie nicht lieber schwimmen gehen?“',
            '„Warum bewegen Sie sich so wenig?“'
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
      fragen: [
        { typ: 'auswahl',
          frage: 'Problemorientiert: „Sie bewegen sich viel zu wenig.“ – Welche Umformulierung ist **ressourcenorientiert**?',
          antworten: [
            '„Welche Bewegung gelingt Ihnen schon? Was wäre ein kleiner nächster Schritt?“',
            '„Sie müssen sich mehr bewegen, sonst bekommen Sie Folgeschäden.“',
            '„Warum bewegen Sie sich denn nicht mehr?“',
            '„Bewegung ist wichtig, das weiß doch jeder.“'
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
            'der personenzentrierte Ansatz, weil die Patientin Zeichen emotionaler Überforderung zeigt und sich zuerst verstanden fühlen muss',
            'der lösungsorientierte Ansatz, weil sie sofort einen nächsten Schritt braucht',
            'der motivationsfördernde Ansatz, weil sie überredet werden muss',
            'gar keine Beratung, weil sie weint'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher **Gesprächseinstieg** passt zu dieser Situation?',
          fall: 'Eine Patientin sagt mit Tränen in den Augen: „Alle sagen mir ständig, was ich anders machen soll. Mir wird das zu viel!“',
          antworten: [
            '„Das klingt, als ob Ihnen das gerade zu viel wird. Was belastet Sie am meisten?“',
            '„Was wäre denn ein kleiner nächster Schritt?“',
            '„Das bekommen Sie schon hin!“',
            '„Dann machen wir am besten gleich einen Plan.“'
          ] },
        { typ: 'richtigfalsch',
          aussage: '„Bei emotionaler Überforderung ist ein lösungsorientierter Einstieg („Was wäre ein nächster Schritt?“) der beste Start.“',
          richtig: false,
          erklaerung: 'Ein zu früher lösungsorientierter Einstieg würde die Person zusätzlich unter Druck setzen; zuerst personenzentriert, damit sie sich verstanden fühlt.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Beratungsprozess (6 Phasen) und SMART-Ziele',
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
            'Ergebnis festhalten, dokumentieren, nächsten Schritt oder Folgetermin vereinbaren',
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
            '„Am Ende des ersten Gesprächs kann Herr Meier drei Warnzeichen einer Verschlechterung seiner Herzinsuffizienz nennen und beschreiben, wann er seine Hausärztin anruft.“',
            '„Herr Meier soll besser auf sein Herz achten.“',
            '„Herr Meier weiß irgendwann alles über Herzinsuffizienz.“',
            '„Herr Meier soll gesünder leben.“'
          ] },
        { typ: 'auswahl',
          frage: 'Was ist wichtig, wenn Sie ein Beratungsgespräch **fallbezogen anhand der Phasen darstellen**?',
          antworten: [
            'In jeder Phase beschreiben, was die Pflegefachperson tut, und sich konkret auf den Fall beziehen.',
            'Nur die Namen der sechs Phasen aufzählen.',
            'Nur die Beispielsätze aus dem Unterricht wortgleich wiedergeben.',
            'Die Phasen in beliebiger Reihenfolge nennen.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Beratungskompetenz',
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
            'Fachkompetenz, weil sie ihr Fachwissen anwendet',
            'Methodenkompetenz, weil sie eine Gesprächstechnik einsetzt',
            'sozial-kommunikative Kompetenz, weil sie Bezugspersonen einbezieht'
          ] },
        { typ: 'auswahl',
          frage: 'Zu welchem Bereich der Beratungskompetenz gehört es, **SMART-Ziele** zu formulieren?',
          antworten: ['Methodenkompetenz', 'Fachkompetenz', 'sozial-kommunikative Kompetenz', 'personale Kompetenz'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Bezugspersonen einbeziehen, Beratung beurteilen',
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
            'Keine Auskunft geben: Bezugspersonen nur mit Einverständnis der beratenen Person einbeziehen, weil die Schweigepflicht gilt.',
            'Alles erzählen, weil Angehörige immer ein Recht auf Information haben.',
            'Nur das Wichtigste erzählen, das ist dann in Ordnung.',
            'Die Tochter entscheiden lassen, was mit ihrem Vater besprochen wird.'
          ] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage der Kollegin im Hinblick auf eine professionelle Beratung?',
          fall: 'Frau Kühn hat gerade die Diagnose Diabetes Typ 2 erhalten. Eine Kollegin sagt zu ihr: „Das ist ganz einfach: Sie müssen ab sofort auf Zucker verzichten und jeden Tag eine halbe Stunde spazieren gehen. Sonst bekommen Sie Folgeschäden.“',
          antworten: [
            'keine professionelle Beratung, sondern Belehrung – nicht ergebnisoffen, nicht partizipativ',
            'professionelle Beratung, weil die Kollegin klare Ziele vorgibt',
            'professionelle Beratung, weil sie auf mögliche Folgeschäden hinweist',
            'eine Schulung, weil Wissen geplant und strukturiert vermittelt wird'
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
          ] }
      ]
    }
  ]
};
