/* =====================================================================
 * KLAUSUR-CHALLENGE KB I – Diabetes mellitus
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
  satz: 'kb1-diabetes',

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Fallsituation: Informationen, Ressourcen, Veränderungen',
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Angaben aus dem Text über Frau Schneider (75 J.) zu.',
          zuordnung: {
            'gesicherte Information': ['Diabetes mellitus Typ 2 seit 13 Jahren', 'arterielle Hypertonie'],
            'Ressource': ['im Ort gut eingebunden (Seniorennachmittag, Gartenparzelle)'],
            'auffällige Veränderung': ['sozialer Rückzug', 'unbemerkter Hautdefekt an der rechten Ferse']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Angaben aus dem Text über Frau Schneider (75 J.) zu.',
          zuordnung: {
            'gesicherte Information': ['diabetische Polyneuropathie', 'Mischinsulin morgens und abends durch den ambulanten Pflegedienst'],
            'Ressource': ['der Pflegedienst übernimmt BZ-Messung und Insulingabe'],
            'auffällige Veränderung': ['Treppensteigen fällt schwer', 'stärker schwankende Blutzuckerwerte']
          } },
        { typ: 'auswahl',
          frage: 'In der Klausur erhalten Sie einen längeren Fließtext zu einer Fallsituation. Wie gehen Sie am besten vor?',
          antworten: [
            'Text zweimal lesen und mit drei Farben markieren: Informationen, Ressourcen, Veränderungen.',
            'Nur den letzten Absatz lesen – dort stehen die wichtigen Informationen als Liste.',
            'Nur die auffälligen Veränderungen herausschreiben, Ressourcen spielen keine Rolle.',
            'Den Text einmal überfliegen und die Antworten aus dem Unterricht wortgleich übernehmen.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulinwirkung an der Zelle: Typ 1 und Typ 2',
      fragen: [
        { typ: 'zuordnen',
          frage: 'Was geschieht an der Muskelzelle? Ordnen Sie zu.',
          zuordnung: {
            'normale Insulinwirkung': ['Insulin wirkt an der Muskelzelle → Glukose gelangt in die Zelle.'],
            'Insulinmangel (Typ 1)': ['Insulin fehlt → Glukose bleibt außerhalb der Zelle.'],
            'Insulinresistenz (Typ 2)': ['Insulin ist vorhanden, die Zelle reagiert aber nur vermindert darauf → Glukose bleibt außerhalb der Zelle.']
          } },
        { typ: 'auswahl',
          frage: 'Was geschieht bei **Insulinresistenz (Typ 2)** an der Muskelzelle?',
          antworten: [
            'Insulin ist vorhanden, die Zelle reagiert aber nur vermindert darauf – Glukose bleibt außerhalb der Zelle.',
            'Insulin fehlt vollständig, weil die β-Zellen zerstört sind.',
            'Die Zelle nimmt besonders viel Glukose auf – der Blutzucker sinkt stark.',
            'Insulin wirkt normal, die Glukose gelangt ohne Probleme in die Zelle.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzucker-Regelkreis und Krankheitsbild',
      fragen: [
        { typ: 'reihenfolge',
          frage: 'Bringen Sie die 5 Schritte des Blutzucker-Regelkreises in die richtige Reihenfolge.',
          schritte: [
            'Nach einer kohlenhydratreichen Mahlzeit steigt der Glukosegehalt im Blut.',
            'Die β-Zellen der Bauchspeicheldrüse geben mehr Insulin ab.',
            'Die Muskelzellen nehmen Glukose auf, die Leber speichert sie als Glykogen → der Blutzucker sinkt.',
            'Die β-Zellen geben weniger Insulin und die α-Zellen mehr Glukagon ab.',
            'Die Leber baut Glykogen ab und bildet neue Glukose → der Blutzucker steigt wieder.'
          ] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Fachbegriffe richtig zu.',
          zuordnung: {
            'Glykogenese': ['Die Leber speichert Glukose als Glykogen.'],
            'Glykogenolyse': ['Die Leber baut Glykogen ab.'],
            'Glukoneogenese': ['Die Leber bildet neue Glukose.']
          } },
        { typ: 'auswahl',
          frage: 'Welche Zellen der Bauchspeicheldrüse geben nach einer Mahlzeit **mehr Insulin** ab?',
          antworten: ['die β-Zellen', 'die α-Zellen', 'die Leberzellen', 'die Muskelzellen'] },
        { typ: 'auswahl',
          frage: 'Welche **Definition** von Diabetes mellitus ist richtig?',
          antworten: [
            'chronische Stoffwechselerkrankung mit dauerhaft erhöhtem Blutzucker durch Insulinmangel, verminderte Insulinwirkung oder beides',
            'akute Erkrankung mit kurzzeitig erniedrigtem Blutzucker durch zu viel Insulin',
            'chronische Erkrankung der Leber, bei der kein Glykogen gespeichert werden kann',
            'Stoffwechselerkrankung, die ausschließlich durch zu viel Zucker in der Nahrung entsteht'
          ] },
        { typ: 'zuordnen',
          frage: 'Gehört die Angabe zu Typ 1 oder zu Typ 2?',
          zuordnung: {
            'Typ 1': ['Eine Autoimmunreaktion zerstört die β-Zellen.', 'absoluter Insulinmangel', 'durch den Lebensstil nicht beeinflussbar'],
            'Typ 2': ['Leber-, Muskel- und Fettzellen reagieren vermindert auf Insulin.', 'Anfangs bildet der Körper noch genug oder sogar mehr Insulin.', 'Risikofaktoren: Übergewicht (v. a. am Bauch), Bewegungsmangel']
          } },
        { typ: 'auswahl',
          frage: 'Welche Angabe ist ein **Risikofaktor für Typ-2-Diabetes**?',
          antworten: [
            'Übergewicht (v. a. am Bauch)',
            'eine Autoimmunreaktion gegen die β-Zellen',
            'regelmäßige Bewegung',
            'ein junges Lebensalter'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Typ 1 und Typ 2: vergleichen und erklären',
      fragen: [
        { typ: 'richtigfalsch',
          aussage: '„Bei Typ 1 ist genug Insulin vorhanden, aber die Zellen reagieren nicht darauf.“',
          richtig: false,
          erklaerung: 'Bei Typ 1 werden die β-Zellen zerstört; es fehlt Insulin.' },
        { typ: 'richtigfalsch',
          aussage: '„Wenn Insulin fehlt oder nicht wirkt, bleibt weniger Glukose im Blut.“',
          richtig: false,
          erklaerung: 'Die Zellen nehmen weniger Glukose auf, deshalb bleibt mehr Glukose im Blut.' },
        { typ: 'richtigfalsch',
          aussage: '„Bei Typ 2 bildet der Körper anfangs noch genug oder sogar mehr Insulin, später immer weniger.“',
          richtig: true,
          erklaerung: 'Typ 2: Die Zellen reagieren vermindert auf Insulin (Insulinresistenz); anfangs wird noch genug oder sogar mehr Insulin gebildet.' },
        { typ: 'auswahl',
          frage: 'Sie erklären einer Patientin mit Typ-2-Diabetes, warum ihr Blutzucker trotz eigener Insulinbildung erhöht ist. Welche Erklärung passt?',
          antworten: [
            '„Ihr Körper macht noch genug Schlüssel, aber die Schlösser an den Zellen klemmen. Darum bleibt der Zucker im Blut.“',
            '„Ihr Körper macht gar keine Schlüssel mehr, weil die Schlüsselfabrik zerstört ist.“',
            '„Die Schlüssel öffnen die Zellen zu weit, deshalb sinkt Ihr Blutzucker.“',
            '„Ihre Schlösser sind in Ordnung, Sie essen einfach zu viel Zucker.“'
          ] },
        { typ: 'auswahl',
          frage: 'Worauf achten Sie, wenn Sie einer Patientin einen Zusammenhang **verständlich erklären**?',
          antworten: [
            'Fachsprache nur gezielt nutzen und anschaulich erklären.',
            'Möglichst viele Fachbegriffe verwenden, damit es professionell klingt.',
            'Nur die Laborwerte nennen, die Patientin kann sie selbst nachlesen.',
            'Schnell sprechen, damit die Erklärung nicht zu lange dauert.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulinarten und Mahlzeitenbezug',
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Insuline zu: Was decken sie ab?',
          zuordnung: {
            'Grundbedarf rund um die Uhr (Basal)': ['NPH-/Intermediärinsulin', 'langwirksames Insulinanalogon'],
            'zusätzlicher Bedarf zu den Mahlzeiten (Bolus)': ['Normalinsulin', 'kurzwirksames Insulinanalogon']
          } },
        { typ: 'zuordnen',
          frage: 'Muss das Insulin vor der Gabe durchmischt werden?',
          zuordnung: {
            'trüb → vor der Gabe durchmischen': ['NPH-/Intermediärinsulin', 'Mischinsulin'],
            'klar → nicht durchmischen': ['langwirksames Insulinanalogon']
          } },
        { typ: 'auswahl',
          frage: 'Welches Insulin braucht einen **Spritz-Ess-Abstand von 20–30 min**?',
          antworten: ['Normalinsulin', 'kurzwirksames Insulinanalogon', 'langwirksames Insulinanalogon', 'NPH-/Intermediärinsulin'] },
        { typ: 'auswahl',
          frage: 'Welche Besonderheit hat **Normalinsulin**?',
          antworten: [
            'zur Korrektur hoher BZ-Werte; auch i. v. möglich',
            'trüb (Protamin) → vor der Gabe gleichmäßig durchmischen',
            'basale Versorgung, meist 1 × täglich',
            'kurz und länger wirksamer Anteil, z. B. 30/70'
          ] },
        { typ: 'auswahl',
          frage: 'Was kennzeichnet ein **Mischinsulin**?',
          antworten: [
            'kurz und länger wirksamer Anteil, z. B. 30/70 oder 50/50; trüb → vor der Gabe durchmischen',
            'nur ein kurz wirksamer Anteil; klar → nicht durchmischen',
            'wird ausschließlich i. v. gegeben',
            'hat keinen Mahlzeitenbezug'
          ] },
        { typ: 'auswahl',
          frage: 'Was deckt **Basalinsulin** ab?',
          antworten: [
            'den Grundbedarf rund um die Uhr – unabhängig von den Mahlzeiten',
            'den zusätzlichen Bedarf zu den Mahlzeiten',
            'nur den Bedarf während der Nacht',
            'nur die Korrektur sehr hoher BZ-Werte'
          ] },
        { typ: 'auswahl',
          frage: 'Was bedeutet „**Mahlzeitenbezug**“?',
          antworten: [
            'Die Insulingabe wird zeitlich so auf die Mahlzeit abgestimmt, dass Insulinwirkung und Aufnahme der Kohlenhydrate zusammenpassen.',
            'Die Insulindosis richtet sich nur nach dem Körpergewicht.',
            'Insulin wird grundsätzlich erst nach dem Essen gegeben.',
            'Zu jeder Mahlzeit wird zusätzlich Basalinsulin gegeben.'
          ] },
        { typ: 'auswahl',
          frage: 'Das Bolusinsulin wurde gegeben, aber die **Mahlzeit kommt zu spät**. Warum ist das gefährlich?',
          antworten: [
            'Das Insulin wirkt, bevor Kohlenhydrate aufgenommen werden → Hypoglykämie.',
            'Das Insulin wird ohne Mahlzeit sofort über den Urin ausgeschieden.',
            'Die verspätete Mahlzeit löst eine Ketoazidose aus.',
            'Das Insulin wird erst durch die Mahlzeit aktiviert und wirkt dann doppelt.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulingabe: STOPP-Checkliste, Umgang mit Insulin',
      fragen: [
        { typ: 'auswahl',
          frage: 'Kann die Insulingabe wie geplant durchgeführt werden?',
          fall: 'Normalinsulin ist für 12:00 Uhr angeordnet, das Essen kommt erst um 12:45 Uhr.',
          antworten: [
            'Nicht wie geplant (Punkte 5, 7): Der Spritz-Ess-Abstand passt nicht; Zeitpunkt und Mahlzeit klären.',
            'Ja, wie geplant – das Essen kommt ja noch.',
            'Ja, aber um 12:45 Uhr noch einmal die gleiche Dosis geben.',
            'Nein, das Insulin wird gestrichen; niemand muss informiert werden.'
          ] },
        { typ: 'auswahl',
          frage: 'Kann die Insulingabe wie geplant durchgeführt werden?',
          fall: 'Es ist kein aktueller BZ-Wert dokumentiert.',
          antworten: [
            'Erst klären (Punkt 6): vor der Gabe den BZ messen.',
            'Ja – der Wert von gestern reicht aus.',
            'Ja, aber die Dosis vorsichtshalber halbieren.',
            'Ja – Insulin geben und den BZ danach messen.'
          ] },
        { typ: 'auswahl',
          frage: 'Kann die Insulingabe wie geplant durchgeführt werden?',
          fall: 'Basalinsulin ist fällig, der Patient hat abends wenig gegessen.',
          antworten: [
            'Gabe möglich (Punkte 2, 5, 7): Basalinsulin deckt den Grundbedarf.',
            'Keine Gabe: Ohne ausreichende Mahlzeit darf kein Insulin gegeben werden.',
            'Gabe erst nach dem Frühstück am nächsten Morgen.',
            'Das Basalinsulin durch Normalinsulin ersetzen.'
          ] },
        { typ: 'auswahl',
          frage: 'Welcher Punkt gehört **nicht** zur STOPP-Checkliste?',
          antworten: ['Körpertemperatur des Patienten', 'aktueller Blutzuckerwert', 'Mahlzeit / Nahrungsverfügbarkeit', 'Besonderheiten des Präparats'] },
        { typ: 'zuordnen',
          frage: 'Vervollständigen Sie die Wenn-dann-Regeln zum sicheren Umgang mit Insulin.',
          zuordnung: {
            '… dann im Kühlschrank lagern (meist 2–8 °C), nicht einfrieren.': ['Wenn Insulin ungeöffnet ist, …'],
            '… dann die Einstichstellen planmäßig wechseln.': ['Wenn Insulin regelmäßig gespritzt wird, …'],
            '… dann dort nicht spritzen, dokumentieren und weitergeben.': ['Wenn die Unterhaut verdickt ist, …'],
            '… dann sofort im stichfesten Abwurfbehälter entsorgen.': ['Wenn eine Kanüle benutzt wurde, …']
          } }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Hypo- und Hyperglykämie',
      fragen: [
        { typ: 'auswahl',
          frage: 'Welche **Blutzuckerwerte** gelten laut Ich-kann-Liste?',
          antworten: [
            'Hypoglykämie: unter 70 mg/dl · Hyperglykämie: über 180 mg/dl',
            'Hypoglykämie: unter 100 mg/dl · Hyperglykämie: über 140 mg/dl',
            'Hypoglykämie: unter 50 mg/dl · Hyperglykämie: über 250 mg/dl',
            'Hypoglykämie: unter 70 mmol/l · Hyperglykämie: über 180 mmol/l'
          ] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die **Ursachen** zu.',
          zuordnung: {
            'Hypoglykämie': ['zu hohe Insulindosis (Therapiefehler)', 'vergessene Mahlzeit', 'vermehrte Bewegung'],
            'Hyperglykämie': ['akute Erkrankungen, Infekte', 'Stress', 'zu viele Kohlenhydrate']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die **Symptome** zu.',
          zuordnung: {
            'Hypoglykämie': ['Blässe', 'Schwitzen', 'Zittern'],
            'Hyperglykämie': ['starker Durst', 'häufiges Wasserlassen (Polyurie)', 'Kopf- und Bauchschmerzen']
          } },
        { typ: 'reihenfolge',
          frage: 'Wie entsteht ein **ketoazidotisches Koma**? Bringen Sie die Schritte in die richtige Reihenfolge.',
          schritte: [
            'absoluter Insulinmangel (v. a. bei Typ 1)',
            'vermehrter Fettabbau',
            'es entstehen Ketonkörper',
            'der pH-Wert des Blutes sinkt, das Blut wird „saurer“ (Azidose)'
          ] },
        { typ: 'auswahl',
          frage: 'Welche **Anzeichen** passen zu einem ketoazidotischen Koma?',
          antworten: [
            'Übelkeit, Erbrechen, Bauchschmerzen; vertiefte Atmung (Kußmaul-Atmung); Atem riecht nach Azeton („obstartig“)',
            'Blässe, Schwitzen, Zittern; Heißhunger',
            'flache, langsame Atmung; Atem riecht nach Ammoniak',
            'hohes Fieber und Hautausschlag'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Notfallmaßnahme ist bei einer **Hypoglykämie** richtig?',
          antworten: [
            'Aktivität pausieren und schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft)',
            'Insulin geben, damit der Zucker in die Zellen gelangt',
            'Ketonkörper messen und keine Kohlenhydrate zuführen',
            'die Person zügig spazieren gehen lassen, damit der Kreislauf in Schwung kommt'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Maßnahme gehört zu den Notfallmaßnahmen bei einer **Hyperglykämie**?',
          antworten: [
            'Ketonkörper messen, um eine Ketoazidose zu erkennen',
            'Traubenzucker geben',
            'ein Glas Saft zu trinken geben',
            'die Aktivität steigern, damit Glukose verbraucht wird'
          ] },
        { typ: 'auswahl',
          frage: 'Warum führen Sie bei einer Hyperglykämie **keine Kohlenhydrate** zu?',
          antworten: [
            'damit der Blutzucker nicht weiter steigt',
            'weil Kohlenhydrate die Ketonkörper senken',
            'weil Kohlenhydrate die Insulinwirkung verstärken',
            'weil die Person sonst sofort bewusstlos wird'
          ] },
        { typ: 'auswahl',
          frage: 'Was liegt vor – und wie dringend ist es?',
          fall: 'Jana ist plötzlich blass, schwitzt, zittert und klagt über weiche Knie.',
          antworten: [
            'Hypoglykämie – SOFORT handeln, weil den Gehirnzellen Glukose fehlt (es drohen Sprachstörungen und Krampfanfälle).',
            'Hyperglykämie – zeitnah handeln: BZ und Ketonkörper messen.',
            'Hypoglykämie – abwarten, das geht von selbst vorbei.',
            'Hyperglykämie – sofort Traubenzucker geben.'
          ] },
        { typ: 'auswahl',
          frage: 'Was liegt vor – und wie dringend ist es?',
          fall: 'Jana ist sehr durstig, muss häufig auf Toilette und klagt über Kopfschmerzen.',
          antworten: [
            'Hyperglykämie – zeitnah handeln (BZ und Ketonkörper messen, Ärztin/Arzt informieren), weil durch den Flüssigkeitsverlust Bewusstseinsstörungen bis zum Koma drohen.',
            'Hypoglykämie – sofort Traubenzucker geben.',
            'Hyperglykämie – keine Maßnahme nötig, viel trinken reicht.',
            'Hypoglykämie – Aktivität pausieren und abwarten.'
          ] },
        { typ: 'auswahl',
          frage: 'Warum hat eine Person mit Hyperglykämie **starken Durst**?',
          antworten: [
            'Der Körper versucht, den zu hohen BZ über den Urin auszuscheiden (Polyurie); durch den Flüssigkeitsverlust meldet das Gehirn Durst.',
            'Durch den Glukosemangel im Gehirn entsteht ein Durstgefühl.',
            'Insulin entzieht den Zellen Wasser.',
            'Der Zucker trocknet die Mundschleimhaut direkt aus.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Indikation, 10-R-Regel, Umrechnen',
      fragen: [
        { typ: 'auswahl',
          frage: 'Was bedeutet der Begriff „**Indikation**“?',
          antworten: [
            'der fachlich begründete Anlass für eine Maßnahme',
            'ein Grund, eine Maßnahme nicht durchzuführen',
            'die Dokumentation einer Maßnahme',
            'die Dosierung eines Medikaments'
          ] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Angaben aus dem Fall Frau Schneider den „Richtig“-Kontrollen der 10-R-Regel zu.',
          zuordnung: {
            'R-Person': ['Frau Schneider'],
            'R-Medikament': ['NovoMix 30®'],
            'R-Dosierung': ['16 I.E. morgens / 10 I.E. abends'],
            'R-Zeitpunkt': ['morgens und abends'],
            'R-Dokumentation': ['aktueller Medikationsplan']
          } },
        { typ: 'auswahl',
          frage: 'Wie rechnen Sie einen Blutzuckerwert von **mg/dl in mmol/l** um?',
          antworten: ['mg/dl : 18 = mmol/l', 'mg/dl × 18 = mmol/l', 'mg/dl : 10 = mmol/l', 'mg/dl − 18 = mmol/l'] },
        { typ: 'zahl',
          frage: 'Gemessen: **215 mg/dl**. Wie viel **mmol/l** sind das? (eine Stelle nach dem Komma)',
          loesung: 11.9, toleranz: 0.1, einheit: 'mmol/l',
          erklaerung: '215 : 18 ≈ 11,9 mmol/l' },
        { typ: 'zahl',
          frage: 'Das Messgerät zeigt **5,5 mmol/l**. Wie viel **mg/dl** sind das?',
          loesung: 99, toleranz: 1, einheit: 'mg/dl',
          erklaerung: '5,5 × 18 = 99 mg/dl' },
        { typ: 'auswahl',
          frage: 'Was tun Sie?',
          fall: 'Bei Werten über 10 mmol/l soll die zuständige Pflegefachperson informiert werden. Gemessen: 215 mg/dl.',
          antworten: [
            'Pflegefachperson informieren – 215 mg/dl liegen über 10 mmol/l.',
            'Nichts unternehmen – 215 mg/dl liegen unter 10 mmol/l.',
            'Selbst Insulin nach eigenem Ermessen geben.',
            'Die Messung erst am nächsten Tag wiederholen.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Ablauf',
      fragen: [
        { typ: 'zuordnen',
          frage: 'Zu welcher Phase der kapillären Blutzuckermessung gehört der Handlungsschritt?',
          zuordnung: {
            'Vorbereitung': ['Anordnung und Messzeitpunkt prüfen; Patientin informieren', 'Material und Teststreifen (Verfallsdatum!) prüfen und bereitlegen'],
            'Durchführung': ['seitliche Fingerbeere punktieren', 'ersten Tropfen abwischen; zweiten Tropfen aufnehmen'],
            'Nachbereitung': ['Lanzette im stichfesten Abwurfbehälter entsorgen', 'Messwert beurteilen, weitergeben und dokumentieren']
          } },
        { typ: 'zuordnen',
          frage: 'Zu welcher Phase der kapillären Blutzuckermessung gehört der Handlungsschritt?',
          zuordnung: {
            'Vorbereitung': ['Einmalhandschuhe anziehen', 'Hände desinfizieren; Hände der Patientin ggf. erwärmen'],
            'Durchführung': ['Mittel- oder Ringfinger wählen', 'Fingerkuppe desinfizieren; Desinfektionsmittel vollständig trocknen lassen'],
            'Nachbereitung': ['Tupfer zum Komprimieren geben', 'Handschuhe ausziehen; Hände desinfizieren']
          } },
        { typ: 'zuordnen',
          frage: 'Begründen Sie die Handlungsschritte: Ordnen Sie die passende Begründung zu.',
          zuordnung: {
            '… weil Blut potenziell infektiös ist.': ['Einmalhandschuhe anziehen'],
            '… weil Daumen und Zeigefinger im Alltag geschont werden sollen.': ['Mittel- oder Ringfinger wählen'],
            '… weil es den Messwert verfälscht.': ['Desinfektionsmittel vollständig trocknen lassen'],
            '… weil er Gewebsflüssigkeit enthält.': [],
            '… weil die Stelle nachbluten kann.': []
          } },
        { typ: 'zuordnen',
          frage: 'Begründen Sie die Handlungsschritte: Ordnen Sie die passende Begründung zu.',
          zuordnung: {
            '… weil das weniger schmerzhaft ist.': ['seitliche Fingerbeere punktieren'],
            '… weil er Gewebsflüssigkeit enthält.': ['ersten Tropfen abwischen'],
            '… weil die Stelle nachbluten kann.': ['Tupfer zum Komprimieren geben'],
            '… weil Blut potenziell infektiös ist.': [],
            '… weil es den Messwert verfälscht.': []
          } }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Messfehler',
      fragen: [
        { typ: 'zuordnen',
          frage: 'Leiten Sie aus jeder Fehlerquelle die passende Regel ab.',
          zuordnung: {
            'Hände erwärmen; den Finger nicht „ausmelken“.': ['kalte Hände / Finger ausgedrückt'],
            'vollständig abtrocknen lassen': ['feuchte Haut / Desinfektionsmittel'],
            'Hände vorher waschen und gut abtrocknen': ['verschmutzte Hände / Obstreste'],
            'sofort verschließen; Teststreifen trocken lagern': ['Teststreifendose offen']
          } },
        { typ: 'auswahl',
          frage: 'Welche ist eine **typische Fehlerquelle** bei der Blutzuckermessung?',
          antworten: ['Obstreste an den Händen', 'Messung am Mittelfinger', 'den ersten Tropfen abwischen', 'die seitliche Fingerbeere punktieren'] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Messung?',
          fall: 'Lina misst bei Frau Schneider vor dem Mittagessen den Blutzucker mit abgelaufenen Teststreifen; das Gerät zeigt 284 mg/dl.',
          antworten: [
            'Die Teststreifen sind abgelaufen → der Wert ist nicht verlässlich; Messung mit gültigen Teststreifen wiederholen.',
            'Der Wert ist verlässlich, weil das Gerät einen Wert anzeigt.',
            'Den Wert übernehmen und das Insulin entsprechend anpassen.',
            'Den Wert halbieren, weil abgelaufene Teststreifen doppelt so hoch messen.'
          ] },
        { typ: 'auswahl',
          frage: 'Ein **falsch hoher Messwert** wird übernommen. Welche Folge droht?',
          antworten: [
            'Es kann zu viel Insulin gegeben werden → Gefahr einer Hypoglykämie.',
            'Es wird zu wenig Insulin gegeben → Gefahr einer Ketoazidose.',
            'Keine Folge, weil der Wert ohnehin dokumentiert wird.',
            'Die Patientin bekommt zu viele Kohlenhydrate → Hyperglykämie.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Spätfolgen und diabetisches Fußsyndrom',
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Langzeitschäden des Diabetes mellitus zu.',
          zuordnung: {
            'Netzhaut, bis Erblindung': ['Retinopathie'],
            'Niere, bis Niereninsuffizienz': ['Nephropathie'],
            'Herzinfarkt, Schlaganfall, pAVK': ['Arteriosklerose'],
            'vermindertes Schmerz- und Temperaturempfinden': ['Polyneuropathie']
          } },
        { typ: 'reihenfolge',
          frage: 'Wie entsteht ein **diabetisches Fußsyndrom**? Bringen Sie die Schritte in die richtige Reihenfolge.',
          schritte: [
            'Wegen der Neuropathie werden Druckstellen und kleine Verletzungen nicht bemerkt.',
            'Wegen der Durchblutungsstörung heilen sie schlecht.',
            'Geschwür (Ulkus)',
            'Infektion',
            'im schlimmsten Fall: Amputation'
          ] },
        { typ: 'auswahl',
          frage: 'Worauf achten Sie bei der **Fußinspektion**?',
          antworten: [
            'Rötungen, Druckstellen, Blasen, Risse, Hornhaut, Verletzungen, Nagelveränderungen, Fußpilz',
            'Puls, Blutdruck und Körpertemperatur',
            'Schuhgröße, Fußlänge und Haarwuchs an den Zehen',
            'Muskelkraft, Gangbild und Beweglichkeit im Sprunggelenk'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Maßnahme beugt einem **diabetischen Fußsyndrom** vor?',
          antworten: [
            'lauwarm waschen (unter 37 °C), gut abtrocknen, eincremen (nicht zwischen den Zehen)',
            'die Füße abends mit einer Wärmflasche wärmen',
            'zu Hause barfuß laufen, damit die Haut atmen kann',
            'die Füße heiß baden, damit sich die Hornhaut löst'
          ] },
        { typ: 'richtigfalsch',
          aussage: '„Bei Diabetes sollte man vor dem Anziehen die Schuhe auf Fremdkörper prüfen.“',
          richtig: true,
          erklaerung: 'Vorbeugung: nie barfuß, passende Schuhe, Schuhe auf Fremdkörper prüfen, keine Wärmflasche.' },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Beobachtung?',
          fall: 'Bei Frau Schneider (Polyneuropathie, trockene Haut) wurde ein schmerzloser, unbemerkter Hautdefekt an der Ferse beobachtet.',
          antworten: [
            'Das sind Warnzeichen für ein beginnendes diabetisches Fußsyndrom.',
            'Harmlos – der Hautdefekt schmerzt ja nicht.',
            'Das ist ein typisches Zeichen einer Hypoglykämie.',
            'Normale Altershaut – es sind keine Maßnahmen nötig.'
          ] },
        { typ: 'auswahl',
          frage: 'Welches **weitere Vorgehen** ist beim Hautdefekt an der Ferse von Frau Schneider richtig?',
          antworten: [
            'Wunde beschreiben und dokumentieren, Hausärztin informieren, Ferse druckentlasten, Füße täglich inspizieren',
            'ein Pflaster aufkleben und abwarten, bis es abheilt',
            'die Ferse mit einer Wärmflasche wärmen, damit sie besser durchblutet wird',
            'die Füße künftig nur noch einmal pro Woche ansehen'
          ] },
        { typ: 'zuordnen',
          frage: 'Mit wem arbeiten Sie zusammen? Ordnen Sie die Aufgabe zu.',
          zuordnung: {
            'Hausärztin': ['Diagnose, Verordnung'],
            'Wundexpertin': ['Wundversorgung'],
            'Podologie': ['Fuß- und Nagelpflege'],
            'Diabetesberatung': ['Schulung']
          } }
      ]
    }
  ]
};
