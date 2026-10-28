/* =====================================================================
 * LERNKARTEN KB I – Diabetes mellitus
 * Alle Texte der Lernkarten stehen in dieser Datei.
 * =====================================================================
 *
 * So ändern Sie eine Karte (direkt auf GitHub: Stift „Edit this file“):
 *  - Ändern Sie nur den Text zwischen den einfachen Hochkommas  ' … '.
 *  - Hochkommas, Kommas am Zeilenende und Klammern { } [ ] bleiben stehen.
 *  - Deutsche Anführungszeichen „ … “ dürfen Sie frei verwenden;
 *    ein einfaches Hochkomma im Text schreiben Sie als  \'
 *  - **fett**  und  *kursiv*  funktionieren wie in der Ich-kann-Liste;
 *    <br> erzwingt einen Zeilenumbruch.
 *
 * Aufbau einer Karte:
 *   {
 *     nr: 2,                        ← Nummer der Kompetenz in der Ich-kann-Liste (optional)
 *     vorne: 'Ich kann …',          ← Vorderseite (die Kompetenz)
 *     fall: 'Jana ist …',           ← (optional) Fall oder Aussage, eingerahmt unter der Kompetenz
 *     zeilen: ['…', '…'],           ← (optional) statt fall: Falltext mit Zeilennummern wie in der Klausur
 *     hinten: ['Punkt 1', 'Punkt 2'],  ← Rückseite: jeder Eintrag wird ein Stichpunkt
 *     nummeriert: true,             ← (optional) 1., 2., 3. statt Punkten; start: 4 beginnt bei 4.
 *     hinweis: '…',                 ← (optional) kleiner Kasten unten auf der Rückseite
 *     hilfe: 'stopp'                ← (optional) Knopf unter der Karte, der eine Liste aus „hilfen“ zeigt
 *   },
 *
 * Neue Karte: eine vorhandene Karte samt { … }, kopieren und darunter einfügen.
 * Der Lernstand der SuS hängt am Text der Vorderseite: Wird die Vorderseite
 * geändert, gilt die Karte auf den Handys wieder als „neu“.
 * ===================================================================== */

var LERNKARTEN = {
  titel: 'KB I – Diabetes mellitus',
  untertitel: 'Lernkarten zur Ich-kann-Liste',
  klausur: 'Klausur am 09.11.2026',
  // Kasten auf der Startseite (weglassen, wenn nicht gebraucht)
  hinweis: 'In der Klausur kommt ein anderer Fall – lernen und verstehen Sie das Vorgehen, nicht nur die Beispielsätze!',
  // Schlüssel für den Lernstand auf dem Handy – nur ändern, wenn alle neu beginnen sollen
  speicherName: 'kb1-diabetes',

  // Listen, die sich auf einzelnen Karten per Knopf einblenden lassen (Karte mit hilfe: 'stopp')
  hilfen: {
    stopp: {
      knopf: '📋 STOPP-Checkliste anzeigen',
      titel: 'STOPP-Checkliste',
      nummeriert: true,
      punkte: [
        'richtige Person',
        'ärztliche Anordnung',
        'richtiges Insulinpräparat',
        'richtige Dosis',
        'richtiger Zeitpunkt',
        'aktueller Blutzuckerwert',
        'Mahlzeit / Nahrungsverfügbarkeit',
        'Besonderheiten des Präparats'
      ]
    }
  },

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Fallsituation: Informationen, Ressourcen, Veränderungen',
      karten: [
        { nr: 1,
          vorne: 'Ich kann in einer Fallsituation pflegerelevante Informationen, Ressourcen und auffällige Veränderungen *identifizieren*: **Wie gehe ich beim Falltext vor?**',
          hinten: [
            'In der Klausur gibt es einen längeren Fließtext. Die wichtigen Informationen stehen nicht als Liste, sondern verteilt im Text: selbst herauslesen und ordnen.',
            'Text zweimal lesen und mit drei Farben markieren: **Informationen**, **Ressourcen**, **Veränderungen**.',
            'Zu jeder Angabe die **Zeile** notieren (z. B. „Z. 4“) – ohne Zeilenangabe gibt es Punktabzug.'
          ] },
        { nr: 1,
          vorne: 'Ich kann in einer Fallsituation pflegerelevante Informationen, Ressourcen und auffällige Veränderungen *identifizieren*:',
          fall: 'Herr Krämer (68 J.) isst seit einigen Tagen kaum noch etwas und wirkt manchmal verwirrt. Seine Tochter wohnt im selben Haus und schaut täglich nach ihm. Er hat seit 10 Jahren Diabetes mellitus Typ 2 und spritzt morgens Mischinsulin.',
          nummeriert: true,
          hinten: [
            '„… isst seit einigen Tagen kaum noch etwas und wirkt manchmal verwirrt.“ → **auffällige Veränderung**',
            '„Seine Tochter wohnt im selben Haus und schaut täglich nach ihm.“ → **Ressource**',
            '„Er hat seit 10 Jahren Diabetes mellitus Typ 2 und spritzt morgens Mischinsulin.“ → **pflegerelevante Information**'
          ],
          hinweis: 'In der Klausur hat der Fall Zeilennummern: Geben Sie zu jeder Angabe die Zeile an (z. B. „Z. 3“) – sonst gibt es Punktabzug.' },
        { nr: 1,
          vorne: 'Ich kann in einer Fallsituation pflegerelevante Informationen, Ressourcen und auffällige Veränderungen *identifizieren*:',
          fall: 'Frau Yilmaz (72 J.) misst ihren Blutzucker seit Jahren selbstständig und zuverlässig. Sie hat Diabetes mellitus Typ 2 und eine arterielle Hypertonie. Seit zwei Wochen klagt sie über Kribbeln und Taubheit in beiden Füßen.',
          nummeriert: true,
          hinten: [
            '„… misst ihren Blutzucker seit Jahren selbstständig und zuverlässig.“ → **Ressource**',
            '„Sie hat Diabetes mellitus Typ 2 und eine arterielle Hypertonie.“ → **pflegerelevante Information**',
            '„Seit zwei Wochen klagt sie über Kribbeln und Taubheit in beiden Füßen.“ → **auffällige Veränderung**'
          ],
          hinweis: 'In der Klausur hat der Fall Zeilennummern: Geben Sie zu jeder Angabe die Zeile an (z. B. „Z. 3“) – sonst gibt es Punktabzug.' },
        { nr: 1,
          vorne: 'Ich kann in einer Fallsituation pflegerelevante Informationen, Ressourcen und auffällige Veränderungen *identifizieren*:',
          fall: 'Herr Weber (80 J.) hat Diabetes mellitus Typ 2 und eine diabetische Polyneuropathie. In letzter Zeit vergisst er häufig seine Mahlzeiten. Er geht gern mit seinem Hund spazieren und ist so jeden Tag in Bewegung.',
          nummeriert: true,
          hinten: [
            '„… hat Diabetes mellitus Typ 2 und eine diabetische Polyneuropathie.“ → **pflegerelevante Information**',
            '„In letzter Zeit vergisst er häufig seine Mahlzeiten.“ → **auffällige Veränderung**',
            '„Er geht gern mit seinem Hund spazieren und ist so jeden Tag in Bewegung.“ → **Ressource**'
          ],
          hinweis: 'In der Klausur hat der Fall Zeilennummern: Geben Sie zu jeder Angabe die Zeile an (z. B. „Z. 3“) – sonst gibt es Punktabzug.' },
        { nr: 1,
          vorne: 'Ich kann in einer Fallsituation pflegerelevante Informationen, Ressourcen und auffällige Veränderungen *identifizieren* und die **Zeile** angeben:',
          zeilen: [
            'Frau Albrecht (81 J.) wird zu Hause vom ambulanten Pflegedienst versorgt.',
            'Sie hat seit 15 Jahren Diabetes mellitus Typ 2 und eine Arthrose in beiden Knien.',
            'Morgens und abends spritzt ihr die Pflegefachkraft Mischinsulin.',
            'Ihr Nachbar begleitet sie jeden Mittwoch zum Seniorentreff.',
            'Sie kocht noch selbst und achtet auf regelmäßige Mahlzeiten.',
            'Seit drei Tagen trinkt sie kaum noch, ihre Lippen sind trocken.',
            'Heute wirkt sie ungewöhnlich schläfrig und antwortet verlangsamt.'
          ],
          hinten: [
            '**Informationen:** ambulanter Pflegedienst (Z. 1) · Diabetes mellitus Typ 2, Arthrose (Z. 2) · Mischinsulin morgens und abends (Z. 3)',
            '**Ressourcen:** Nachbar begleitet sie zum Seniorentreff (Z. 4) · kocht selbst, isst regelmäßig (Z. 5)',
            '**auffällige Veränderungen:** trinkt kaum, trockene Lippen (Z. 6) · ungewöhnlich schläfrig, verlangsamt (Z. 7)'
          ],
          hinweis: 'Zu jeder Angabe die Zeile nennen – ohne Zeilenangabe gibt es Punktabzug.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulinwirkung an der Zelle: Typ 1 und Typ 2',
      karten: [
        { nr: 1,
          vorne: 'Ich kann am Beispiel einer Muskelzelle *beschreiben*, was bei **normaler Insulinwirkung** geschieht.',
          hinten: 'Insulin wirkt an der Muskelzelle → Glukose gelangt in die Zelle.' },
        { nr: 1,
          vorne: 'Ich kann am Beispiel einer Muskelzelle *beschreiben*, was bei **Insulinmangel (Typ 1)** geschieht.',
          hinten: 'Insulin fehlt → Glukose bleibt außerhalb der Zelle.' },
        { nr: 1,
          vorne: 'Ich kann am Beispiel einer Muskelzelle *beschreiben*, was bei **Insulinresistenz (Typ 2)** geschieht.',
          hinten: 'Insulin ist vorhanden, die Zelle reagiert aber nur vermindert darauf → Glukose bleibt außerhalb der Zelle.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzucker-Regelkreis und Krankheitsbild',
      karten: [
        { nr: 1,
          vorne: 'Ich kann den Regelkreis des Blutzuckers *beschreiben*: **Schritte 1–3** – was geschieht nach einer kohlenhydratreichen Mahlzeit?',
          nummeriert: true,
          hinten: [
            'Nach einer kohlenhydratreichen Mahlzeit steigt der Glukosegehalt im Blut.',
            'Die β-Zellen der Bauchspeicheldrüse geben mehr Insulin ab.',
            'Insulin wirkt an den Körperzellen: Die Muskelzellen nehmen Glukose auf, die Leber speichert Glukose als Glykogen (**Glykogenese**) → der Blutzucker sinkt.'
          ] },
        { nr: 1,
          vorne: 'Ich kann den Regelkreis des Blutzuckers *beschreiben*: **Schritte 4–5** – was geschieht, wenn der Blutzucker sinkt?',
          nummeriert: true, start: 4,
          hinten: [
            'Sinkt der Blutzucker, geben die β-Zellen weniger Insulin und die α-Zellen mehr Glukagon ab.',
            'Wenn der Blutzucker zu weit abgesunken ist, baut die Leber Glykogen ab (**Glykogenolyse**) und bildet neue Glukose (**Glukoneogenese**) → der Blutzucker steigt wieder.'
          ] },
        { nr: 1,
          vorne: 'Ich kann die Fachbegriffe **Glykogenese**, **Glykogenolyse** und **Glukoneogenese** *erklären*.',
          hinten: [
            '**Glykogenese:** Die Leber speichert Glukose als Glykogen.',
            '**Glykogenolyse:** Die Leber baut Glykogen ab.',
            '**Glukoneogenese:** Die Leber bildet neue Glukose.'
          ] },
        { nr: 2,
          vorne: 'Ich kann das Krankheitsbild Diabetes mellitus *beschreiben*: **Definition**',
          hinten: 'chronische Stoffwechselerkrankung mit dauerhaft erhöhtem Blutzucker (Hyperglykämie) durch Insulinmangel, verminderte Insulinwirkung oder beides.' },
        { nr: 2,
          vorne: 'Ich kann das Krankheitsbild Diabetes mellitus *beschreiben*: **Ursache von Typ 1**',
          hinten: [
            'Eine Autoimmunreaktion zerstört die β-Zellen → absoluter Insulinmangel.',
            'Beginn meist im Kindes- oder Jugendalter, aber auch später möglich.'
          ] },
        { nr: 2,
          vorne: 'Ich kann das Krankheitsbild Diabetes mellitus *beschreiben*: **Risikofaktoren von Typ 1**',
          hinten: 'v. a. erbliche Veranlagung; durch den Lebensstil nicht beeinflussbar.' },
        { nr: 2,
          vorne: 'Ich kann das Krankheitsbild Diabetes mellitus *beschreiben*: **Ursache von Typ 2**',
          hinten: [
            'Leber-, Muskel- und Fettzellen reagieren vermindert auf Insulin (Insulinresistenz).',
            'Anfangs bildet der Körper noch genug oder sogar mehr Insulin, später immer weniger.'
          ] },
        { nr: 2,
          vorne: 'Ich kann das Krankheitsbild Diabetes mellitus *beschreiben*: **Risikofaktoren von Typ 2**',
          hinten: [
            'Übergewicht (v. a. am Bauch)',
            'Bewegungsmangel',
            'ungünstige Ernährung',
            'höheres Alter',
            'familiäre Veranlagung'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Typ 1 und Typ 2: vergleichen und erklären',
      karten: [
        { nr: 1,
          vorne: 'Ich kann falsche Aussagen zu Typ 1 und Typ 2 *identifizieren* und die Korrektur fachlich *begründen*:',
          fall: '„Bei Typ 1 ist genug Insulin vorhanden, aber die Zellen reagieren nicht darauf.“',
          hinten: '**Falsch:** Bei Typ 1 werden die β-Zellen zerstört; es fehlt Insulin.',
          hinweis: 'Die Aussagen sind nur Beispiele – in der Klausur kommen sie NICHT wortgleich vor!' },
        { nr: 1,
          vorne: 'Ich kann falsche Aussagen zu Typ 1 und Typ 2 *identifizieren* und die Korrektur fachlich *begründen*:',
          fall: '„Wenn Insulin fehlt oder nicht wirkt, bleibt weniger Glukose im Blut.“',
          hinten: '**Falsch:** Die Zellen nehmen weniger Glukose auf, deshalb bleibt *mehr* Glukose im Blut.',
          hinweis: 'Die Aussagen sind nur Beispiele – in der Klausur kommen sie NICHT wortgleich vor!' },
        { nr: 1,
          vorne: 'Ich kann falsche Aussagen zu Typ 1 und Typ 2 *identifizieren* und die Korrektur fachlich *begründen*:',
          fall: '„Bei Typ 2 braucht man nie Insulin – der Körper bildet ja selbst welches.“',
          hinten: '**Falsch:** Bei Typ 2 reagieren die Zellen vermindert auf Insulin (Insulinresistenz), und im Verlauf bildet der Körper oft immer weniger Insulin. Deshalb brauchen viele Menschen mit Typ 2 Insulin.',
          hinweis: 'Die Aussagen sind nur Beispiele – in der Klausur kommen sie NICHT wortgleich vor!' },
        { nr: 2,
          vorne: 'Ich kann einer Patientin mit Typ-2-Diabetes verständlich *erklären*, warum ihr Blutzucker trotz eigener Insulinbildung erhöht ist.',
          hinten: [
            '„Insulin ist wie ein Schlüssel: Es öffnet die Zellen für den Zucker.“',
            '„Ihr Körper macht noch genug Schlüssel, am Anfang sogar mehr als nötig.“',
            '„Aber die Schlösser an den Zellen klemmen. Das nennt man *Insulinresistenz*.“',
            '„Darum bleibt der Zucker im Blut, und Ihr Blutzucker steigt.“',
            '„Später macht Ihr Körper aber zudem oft auch weniger Schlüssel.“'
          ],
          hinweis: 'Fachsprache nur gezielt nutzen und anschaulich erklären. Das ist nur eine Beispielantwort – andere Erklärungen sind selbstverständlich zulässig.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulinarten und Mahlzeitenbezug',
      karten: [
        { nr: 1,
          vorne: 'Ich kann die **fünf Insulinarten** *nennen*.',
          hinten: [
            'Normalinsulin',
            'kurzwirksames Insulinanalogon',
            'NPH-/Intermediärinsulin (Basal)',
            'langwirksames Insulinanalogon',
            'Mischinsulin'
          ] },
        { nr: 1,
          vorne: 'Ich kann die pflegerisch wichtigen Besonderheiten von **Normalinsulin** *beschreiben*.',
          hinten: [
            'Spritz-Ess-Abstand von 20–30 min',
            'zur Korrektur hoher BZ-Werte',
            'auch i. v. möglich'
          ] },
        { nr: 1,
          vorne: 'Ich kann die pflegerisch wichtigen Besonderheiten eines **kurzwirksamen Insulinanalogons** *beschreiben*.',
          hinten: [
            'wirkt schnell und kurz',
            'kein klassischer Spritz-Ess-Abstand nötig'
          ] },
        { nr: 1,
          vorne: 'Ich kann die pflegerisch wichtigen Besonderheiten von **NPH-/Intermediärinsulin** (Basal) *beschreiben*.',
          hinten: [
            'basale Versorgung',
            'trüb (Protamin) → vor der Gabe gleichmäßig durchmischen'
          ] },
        { nr: 1,
          vorne: 'Ich kann die pflegerisch wichtigen Besonderheiten eines **langwirksamen Insulinanalogons** *beschreiben*.',
          hinten: [
            'basale Versorgung',
            'klar → nicht durchmischen',
            'meist 1 × täglich'
          ] },
        { nr: 1,
          vorne: 'Ich kann die pflegerisch wichtigen Besonderheiten von **Mischinsulin** *beschreiben*.',
          hinten: [
            'kurz und länger wirksamer Anteil, z. B. 30/70 oder 50/50',
            'trüb → vor der Gabe durchmischen'
          ] },
        { nr: 1,
          vorne: 'Ich kann *nennen*, welche Insuline vor der Gabe **durchmischt** werden müssen – und welches nicht.',
          hinten: [
            '**trüb → vor der Gabe durchmischen:** NPH-/Intermediärinsulin (Protamin), Mischinsulin',
            '**klar → nicht durchmischen:** langwirksames Insulinanalogon'
          ] },
        { nr: 2,
          vorne: 'Ich kann **Basal- und Bolusinsulin** *vergleichen*.',
          hinten: [
            '**Basalinsulin** deckt den Grundbedarf rund um die Uhr – unabhängig von den Mahlzeiten.',
            '**Bolusinsulin** deckt den zusätzlichen Bedarf zu den Mahlzeiten.'
          ] },
        { nr: 3,
          vorne: 'Ich kann *erklären*, was „**Mahlzeitenbezug**“ bedeutet.',
          hinten: [
            '**Mahlzeitenbezug:** Die Insulingabe wird zeitlich so auf die Mahlzeit abgestimmt, dass Insulinwirkung und Aufnahme der Kohlenhydrate zusammenpassen.',
            'Er hängt vom **Wirkeintritt** ab: **Normalinsulin** (ca. 20–30 min) → Spritz-Ess-Abstand 20–30 min; **kurzwirksame Analoga** (ca. 5–15 min) → direkt zur Mahlzeit; bei **Mischinsulin** zählt der kurz wirksame Anteil; **Basalinsulin** hat keinen direkten Mahlzeitenbezug.'
          ] },
        { nr: 3,
          vorne: 'Ich kann im Zusammenhang mit dem „Mahlzeitenbezug“ *erklären*, warum eine **verspätete Mahlzeit** gefährlich sein kann.',
          hinten: '**Gefahr:** Kommt die Mahlzeit zu spät, wirkt das Insulin, bevor Kohlenhydrate aufgenommen werden → **Hypoglykämie**.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulingabe: STOPP-Checkliste, Umgang mit Insulin',
      karten: [
        { nr: 1,
          vorne: 'Ich kann mithilfe der STOPP-Checkliste *beurteilen*, ob die Insulingabe wie geplant durchgeführt werden kann, und meine Entscheidung *begründen*:',
          fall: 'Normalinsulin ist für 12:00 Uhr angeordnet, das Essen kommt erst um 12:45 Uhr.',
          hilfe: 'stopp',
          hinten: [
            '→ **nicht wie geplant** (Punkte 5, 7, 8): Normalinsulin hat einen Mahlzeitenbezug (Spritz-Ess-Abstand 20–30 min). 45 min sind zu lang → Gefahr einer **Hypoglykämie**.',
            '**Vorgehen:** Zeitpunkt und Mahlzeit klären, nicht eigenmächtig handeln; BZ kontrollieren und dokumentieren.'
          ] },
        { nr: 1,
          vorne: 'Ich kann mithilfe der STOPP-Checkliste *beurteilen*, ob die Insulingabe wie geplant durchgeführt werden kann, und meine Entscheidung *begründen*:',
          fall: 'Es ist kein aktueller BZ-Wert dokumentiert.',
          hilfe: 'stopp',
          hinten: [
            '→ **erst klären** (Punkt 6): Ohne aktuellen Wert lässt sich nicht beurteilen, ob die Gabe passt – bei niedrigem BZ droht eine **Hypoglykämie**.',
            '**Vorgehen:** vor der Gabe den BZ messen; bei Abweichungen von der Anordnung Rücksprache mit dem ärztlichen Dienst; dokumentieren.'
          ] },
        { nr: 1,
          vorne: 'Ich kann mithilfe der STOPP-Checkliste *beurteilen*, ob die Insulingabe wie geplant durchgeführt werden kann, und meine Entscheidung *begründen*:',
          fall: 'Basalinsulin ist fällig, der Patient hat abends wenig gegessen.',
          hilfe: 'stopp',
          hinten: [
            '→ **Gabe möglich** (Punkte 2, 5, 7, 8): Basalinsulin deckt den Grundbedarf rund um die Uhr – es hat keinen direkten Mahlzeitenbezug.',
            '**Vorgehen:** wie angeordnet geben; BZ kontrollieren und dokumentieren, bei niedrigen Werten Rücksprache mit dem ärztlichen Dienst.'
          ] },
        { nr: 1,
          vorne: 'Ich kann mithilfe der STOPP-Checkliste *beurteilen*, ob die Insulingabe wie geplant durchgeführt werden kann, und meine Entscheidung *begründen*:',
          fall: 'Um 7:30 Uhr sind bei Frau Kaya NPH-Insulin und ein kurzwirksames Insulinanalogon zum Frühstück angeordnet. Ihr ist übel, sie möchte nichts essen. BZ: 145 mg/dl.',
          hilfe: 'stopp',
          hinten: [
            '**kurzwirksames Analogon → nicht wie geplant** (Punkte 7, 8): Es deckt den Bedarf zur Mahlzeit – ohne Frühstück droht eine **Hypoglykämie**.',
            '**NPH-Insulin → Gabe grundsätzlich möglich:** Als Basalinsulin deckt es den Grundbedarf unabhängig von den Mahlzeiten (Punkt 8: trüb → vorher durchmischen).',
            '**Vorgehen:** Mahlzeiteninsulin nicht eigenmächtig geben oder verschieben; Rücksprache mit dem ärztlichen Dienst (auch zur Basaldosis); BZ engmaschig kontrollieren, dokumentieren.'
          ],
          hinweis: 'Sind zwei Insuline fällig, jedes einzeln mit der Checkliste prüfen.' },
        { nr: 2,
          vorne: 'Ich kann die **vier Bereiche** *nennen*, zu denen es Wenn-dann-Regeln zum sicheren Umgang mit Insulin gibt.',
          hinten: ['Lagerung', 'Rotation', 'Lipohypertrophie', 'Entsorgung'] },
        { nr: 2,
          vorne: 'Ich kann die Regel zur **Lagerung** von Insulin als Wenn-dann-Regel *erklären*.',
          hinten: 'Wenn Insulin ungeöffnet ist, dann im Kühlschrank lagern (meist 2–8 °C), nicht einfrieren.' },
        { nr: 2,
          vorne: 'Ich kann die Regel zur **Rotation** als Wenn-dann-Regel *erklären*.',
          hinten: 'Wenn Insulin regelmäßig gespritzt wird, dann die Einstichstellen planmäßig wechseln.' },
        { nr: 2,
          vorne: 'Ich kann die Regel zur **Lipohypertrophie** als Wenn-dann-Regel *erklären*.',
          hinten: 'Wenn die Unterhaut verdickt ist, dann dort nicht spritzen, dokumentieren und weitergeben.' },
        { nr: 2,
          vorne: 'Ich kann die Regel zur **Entsorgung** als Wenn-dann-Regel *erklären*.',
          hinten: 'Wenn eine Kanüle benutzt wurde, dann sofort im stichfesten Abwurfbehälter entsorgen.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Hypo- und Hyperglykämie',
      karten: [
        { nr: 1,
          vorne: 'Ich kann Hypoglykämie und Hyperglykämie *vergleichen*: **Blutzuckerwert**',
          hinten: [
            '**Hypoglykämie:** unter 70 mg/dl',
            '**Hyperglykämie:** über 180 mg/dl'
          ],
          hinweis: 'Sie haben Text A oder B bearbeitet – lernen Sie für die Klausur beide Mind-Maps!' },
        { nr: 1,
          vorne: 'Ich kann Hypoglykämie und Hyperglykämie *vergleichen*: **Ursachen einer Hypoglykämie**',
          hinten: [
            'zu hohe Insulindosis (Therapiefehler)',
            'zu wenig Kohlenhydrate, z. B. vergessene Mahlzeit',
            'vermehrte Bewegung',
            'Durchfall/Erbrechen'
          ] },
        { nr: 1,
          vorne: 'Ich kann Hypoglykämie und Hyperglykämie *vergleichen*: **Ursachen einer Hyperglykämie**',
          hinten: [
            'falsch angepasste Insulindosis (Therapiefehler)',
            'akute Erkrankungen, Infekte',
            'Stress',
            'Bewegungsmangel',
            'zu viele Kohlenhydrate'
          ] },
        { nr: 1,
          vorne: 'Ich kann Hypoglykämie und Hyperglykämie *vergleichen*: **Symptome einer Hypoglykämie**',
          hinten: [
            'Blässe, Schwitzen, Zittern, (Konzentrations-)Schwäche, Tachykardie',
            'evtl. Sprachstörungen, Krampfanfälle und Bewusstlosigkeit'
          ] },
        { nr: 1,
          vorne: 'Ich kann Hypoglykämie und Hyperglykämie *vergleichen*: **Symptome einer Hyperglykämie**',
          hinten: [
            'Schwäche, Abgeschlagenheit',
            'starker Durst, häufiges Wasserlassen (Polyurie), Kopf- und Bauchschmerzen, Übelkeit',
            'Bewusstseinsstörungen bis zum Koma'
          ] },
        { nr: 2,
          vorne: 'Ich kann *erklären*, wie bei einer Hyperglykämie ein **ketoazidotisches Koma** entsteht.',
          hinten: '**v. a. bei Typ 1:** absoluter Insulinmangel → vermehrter Fettabbau → es entstehen Ketonkörper → der pH-Wert des Blutes sinkt, das Blut wird „saurer“ (Azidose).' },
        { nr: 2,
          vorne: 'Ich kann die **Anzeichen** eines ketoazidotischen Komas *nennen*.',
          hinten: [
            'Übelkeit, Erbrechen, Bauchschmerzen',
            'vertiefte Atmung (Kußmaul-Atmung)',
            'der Atem riecht nach Azeton („obstartig“)'
          ] },
        { nr: 3,
          vorne: 'Ich kann die Notfallmaßnahmen bei einer **Hypoglykämie** *beschreiben* und *begründen*.',
          hinten: [
            'Aktivität pausieren, weil Bewegung zusätzlich Glukose verbraucht',
            'schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft), weil sie rasch ins Blut gelangen',
            'nach ca. 30 min den BZ kontrollieren, um zu prüfen, ob er wieder steigt'
          ] },
        { nr: 3,
          vorne: 'Ich kann die Notfallmaßnahmen bei einer **Hyperglykämie** *beschreiben* und *begründen*.',
          hinten: [
            'keine Kohlenhydrate zuführen, damit der BZ nicht weiter steigt',
            'Ketonkörper messen, um eine Ketoazidose zu erkennen',
            'Insulin zuführen, weil es den BZ senkt'
          ] },
        { nr: 4,
          vorne: 'Ich kann *identifizieren*, ob eine Hypo- oder eine Hyperglykämie vorliegt, und meine Zuordnung *begründen*:',
          fall: 'Jana ist plötzlich blass, schwitzt, zittert und klagt über weiche Knie.',
          hinten: '**Hypoglykämie**, weil Blässe, Schwitzen und Zittern typisch sind: Den Zellen fehlt Glukose zur Energiegewinnung → Energieverlust → Schwäche („weiche Knie“).',
          hinweis: 'In der Klausur kommt ein anderer Fall: Auf BZ-Wert, Anzeichen und Ursachen achten!' },
        { nr: 4,
          vorne: 'Ich kann die **Dringlichkeit** *begründen*:',
          fall: 'Jana ist plötzlich blass, schwitzt, zittert und klagt über weiche Knie.',
          hinten: '**sofort handeln**, weil den Gehirnzellen Glukose fehlt → es drohen Sprachstörungen und Krampfanfälle.',
          hinweis: 'In der Klausur kommt ein anderer Fall: Auf BZ-Wert, Anzeichen und Ursachen achten!' },
        { nr: 4,
          vorne: 'Ich kann *identifizieren*, ob eine Hypo- oder eine Hyperglykämie vorliegt, und meine Zuordnung *begründen*:',
          fall: 'Jana ist sehr durstig, muss häufig auf Toilette und klagt über Kopfschmerzen.',
          hinten: '**Hyperglykämie**, weil der Körper versucht, den zu hohen BZ über den Urin auszuscheiden (Polyurie). Durch den Flüssigkeitsverlust meldet das Gehirn Durst.',
          hinweis: 'In der Klausur kommt ein anderer Fall: Auf BZ-Wert, Anzeichen und Ursachen achten!' },
        { nr: 4,
          vorne: 'Ich kann die **Dringlichkeit** *begründen*:',
          fall: 'Jana ist sehr durstig, muss häufig auf Toilette und klagt über Kopfschmerzen.',
          hinten: '**zeitnah handeln** (BZ und Ketonkörper messen, Ärztin/Arzt informieren), weil durch den Flüssigkeitsverlust Bewusstseinsstörungen bis zum Koma drohen.',
          hinweis: 'In der Klausur kommt ein anderer Fall: Auf BZ-Wert, Anzeichen und Ursachen achten!' },
        { nr: 4,
          vorne: 'Ich kann *identifizieren*, ob eine Hypo- oder eine Hyperglykämie vorliegt, und meine Zuordnung *begründen*:',
          fall: 'Herr Lorenz (Typ 2, Insulin) hat seit dem Morgen Durchfall und Erbrechen. Am Nachmittag ist er blass, zittert und schwitzt. Das Messgerät zeigt 3,5 mmol/l.',
          hinten: [
            '**Hypoglykämie**, weil Blässe, Zittern und Schwitzen typische Anzeichen sind …',
            '… und 3,5 mmol/l × 18 = 63 mg/dl unter 70 mg/dl liegen.',
            '**Ursache:** Durch Durchfall und Erbrechen kommen kaum Kohlenhydrate an – das Insulin wirkt trotzdem.'
          ],
          hinweis: 'Zur Begründung gehören Anzeichen, BZ-Wert und – wenn erkennbar – die Ursache.' },
        { nr: 4,
          vorne: 'Ich kann *identifizieren*, ob eine Hypo- oder eine Hyperglykämie vorliegt, und meine Zuordnung *begründen*:',
          fall: 'Frau Brückner (Typ 1) schreibt morgen eine Prüfung und ist seit Tagen sehr angespannt. Sie fühlt sich schlapp, hat starken Durst und muss ständig zur Toilette. BZ: 245 mg/dl.',
          hinten: [
            '**Hyperglykämie**, weil Abgeschlagenheit, starker Durst und häufiges Wasserlassen (Polyurie) typische Anzeichen sind …',
            '… und 245 mg/dl über 180 mg/dl liegen.',
            '**Ursache:** Stress – Stresshormone lassen den Blutzucker steigen.'
          ],
          hinweis: 'Zur Begründung gehören Anzeichen, BZ-Wert und – wenn erkennbar – die Ursache.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Indikation, 10-R-Regel, Umrechnen',
      karten: [
        { nr: 1,
          vorne: 'Ich kann den Begriff „**Indikation**“ *erklären*.',
          hinten: 'der fachlich begründete Anlass für eine Maßnahme.' },
        { nr: 1,
          vorne: 'Ich kann anhand eines Fallbeispiels die Indikation für eine **Blutzuckermessung** *ableiten*:',
          fall: 'Herr Brandt (64 J.) hat Diabetes mellitus Typ 2 und spritzt Insulin. Kurz vor dem Mittagessen ist er plötzlich blass, zittrig und schwitzt stark.',
          hinten: [
            '**Indikation:** Blässe, Zittern und Schwitzen bei Insulintherapie sind Anzeichen einer möglichen **Hypoglykämie**.',
            '→ sofort den Blutzucker messen, um den Verdacht zu prüfen.'
          ] },
        { nr: 2,
          vorne: 'Ich kann Angaben aus einer Fallsituation den „Richtig“-Kontrollen der **10-R-Regel** *zuordnen*:',
          fall: 'morgens und abends · NovoMix 30® · aktueller Medikationsplan · Frau Schneider · 16 I.E. morgens / 10 I.E. abends',
          hinten: [
            '**R-Person:** Frau Schneider',
            '**R-Medikament:** NovoMix 30®',
            '**R-Dosierung:** 16 I.E. morgens / 10 I.E. abends',
            '**R-Zeitpunkt:** morgens und abends',
            '**R-Dokumentation:** aktueller Medikationsplan'
          ] },
        { nr: 3,
          vorne: 'Ich kann Blutzuckerwerte von **mg/dl in mmol/l** (und umgekehrt) umrechnen.',
          hinten: [
            '**1 mmol/l ≙ 18 mg/dl**',
            'mg/dl : 18 = mmol/l',
            'mmol/l × 18 = mg/dl'
          ] },
        { nr: 3,
          vorne: 'Ich kann anhand einer Vorgabe *bewerten*, ob Handlungsbedarf besteht:',
          fall: 'Bei Werten über 10 mmol/l soll die zuständige Pflegefachperson informiert werden. Gemessen: 215 mg/dl.',
          hinten: '215 mg/dl → über 10 mmol/l → Pflegefachperson **informieren**.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Ablauf',
      karten: [
        { nr: 1,
          vorne: 'Ich kann den Ablauf der kapillären Blutzuckermessung *beschreiben*: **4 Handlungsschritte der Vorbereitung**',
          hinten: [
            'Anordnung und Messzeitpunkt prüfen; Patientin informieren',
            'Material und Teststreifen (Verfallsdatum!) prüfen und bereitlegen',
            'Hände desinfizieren; Hände der Patientin ggf. erwärmen',
            'Einmalhandschuhe anziehen, weil Blut potenziell infektiös ist'
          ] },
        { nr: 1,
          vorne: 'Ich kann den Ablauf der kapillären Blutzuckermessung *beschreiben*: **4 Handlungsschritte der Durchführung**',
          hinten: [
            'Mittel- oder Ringfinger wählen, weil Daumen und Zeigefinger im Alltag geschont werden sollen',
            'Fingerkuppe desinfizieren. Desinfektionsmittel vollständig trocknen lassen, weil es den Messwert verfälscht.',
            'Seitliche Fingerbeere punktieren, weil das weniger schmerzhaft ist',
            'Ersten Tropfen abwischen, weil er Gewebsflüssigkeit enthält; zweiten Tropfen aufnehmen'
          ] },
        { nr: 1,
          vorne: 'Ich kann den Ablauf der kapillären Blutzuckermessung *beschreiben*: **4 Handlungsschritte der Nachbereitung**',
          hinten: [
            'Tupfer zum Komprimieren geben, weil die Stelle nachbluten kann',
            'Lanzette im stichfesten Abwurfbehälter entsorgen',
            'Handschuhe ausziehen; Hände desinfizieren',
            'Messwert beurteilen, weitergeben und dokumentieren'
          ] },
        { nr: 1,
          vorne: 'Ich kann *begründen*, warum ich bei der Blutzuckermessung **Einmalhandschuhe** anziehe.',
          hinten: '…, weil Blut potenziell infektiös ist.' },
        { nr: 1,
          vorne: 'Ich kann *begründen*, warum ich für die Blutzuckermessung den **Mittel- oder Ringfinger** wähle.',
          hinten: '…, weil Daumen und Zeigefinger im Alltag geschont werden sollen.' },
        { nr: 1,
          vorne: 'Ich kann *begründen*, warum ich das **Desinfektionsmittel vollständig trocknen** lasse.',
          hinten: '…, weil es den Messwert verfälscht.' },
        { nr: 1,
          vorne: 'Ich kann *begründen*, warum ich die **seitliche Fingerbeere** punktiere.',
          hinten: '…, weil das weniger schmerzhaft ist.' },
        { nr: 1,
          vorne: 'Ich kann *begründen*, warum ich den **ersten Tropfen** abwische.',
          hinten: '…, weil er Gewebsflüssigkeit enthält; den zweiten Tropfen aufnehmen.' },
        { nr: 1,
          vorne: 'Ich kann *begründen*, warum ich der Patientin nach der Messung einen **Tupfer zum Komprimieren** gebe.',
          hinten: '…, weil die Stelle nachbluten kann.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Messfehler',
      karten: [
        { nr: 1,
          vorne: 'Ich kann **vier typische Fehlerquellen** bei der Blutzuckermessung *nennen*.',
          hinten: [
            'kalte Hände / Finger ausgedrückt',
            'feuchte Haut / Desinfektionsmittel',
            'verschmutzte Hände / Obstreste',
            'Teststreifendose offen'
          ] },
        { nr: 1,
          vorne: 'Ich kann aus einer Fehlerquelle bei der Blutzuckermessung eine Regel *ableiten*:',
          fall: 'Kalte Hände / Finger ausgedrückt',
          hinten: 'Hände erwärmen; den Finger nicht „ausmelken“.' },
        { nr: 1,
          vorne: 'Ich kann aus einer Fehlerquelle bei der Blutzuckermessung eine Regel *ableiten*:',
          fall: 'Feuchte Haut / Desinfektionsmittel',
          hinten: 'vollständig abtrocknen lassen.' },
        { nr: 1,
          vorne: 'Ich kann aus einer Fehlerquelle bei der Blutzuckermessung eine Regel *ableiten*:',
          fall: 'Verschmutzte Hände / Obstreste',
          hinten: 'Hände vorher waschen und gut abtrocknen.' },
        { nr: 1,
          vorne: 'Ich kann aus einer Fehlerquelle bei der Blutzuckermessung eine Regel *ableiten*:',
          fall: 'Teststreifendose offen',
          hinten: 'sofort verschließen; Teststreifen trocken lagern.' },
        { nr: 2,
          vorne: 'Ich kann eine Blutzuckermessung *beurteilen*:',
          fall: 'Lina misst bei Frau Schneider vor dem Mittagessen den Blutzucker mit abgelaufenen Teststreifen; das Gerät zeigt 284 mg/dl.',
          hinten: 'Die Teststreifen sind abgelaufen → der Wert ist nicht verlässlich; Messung mit gültigen Teststreifen wiederholen.' },
        { nr: 2,
          vorne: 'Ich kann mögliche Folgen eines **falsch hohen Messwerts** *beschreiben*.',
          hinten: 'Wird ein falsch hoher Wert übernommen, kann zu viel Insulin gegeben werden → Gefahr einer **Hypoglykämie**.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Spätfolgen und diabetisches Fußsyndrom',
      karten: [
        { nr: 1,
          vorne: 'Ich kann **vier Langzeitschäden** des Diabetes mellitus *nennen*.',
          hinten: [
            'Retinopathie (Netzhaut, bis Erblindung)',
            'Nephropathie (Niere, bis Niereninsuffizienz)',
            'Arteriosklerose → Herzinfarkt, Schlaganfall, pAVK',
            '**Nerven:** Polyneuropathie mit vermindertem Schmerz- und Temperaturempfinden'
          ] },
        { nr: 2,
          vorne: 'Ich kann die Entstehung eines **diabetischen Fußsyndroms** *erklären*.',
          hinten: [
            'Wegen der Neuropathie werden Druckstellen und kleine Verletzungen nicht bemerkt.',
            'Wegen der Durchblutungsstörung heilen sie schlecht → Geschwür (Ulkus) → Infektion → im schlimmsten Fall Amputation.'
          ] },
        { nr: 3,
          vorne: 'Ich kann *beschreiben*, worauf ich bei der **Fußinspektion** achte.',
          hinten: 'Rötungen, Druckstellen, Blasen, Risse, Hornhaut, Verletzungen, Nagelveränderungen, Fußpilz' },
        { nr: 3,
          vorne: 'Ich kann Maßnahmen zur **Vorbeugung** eines diabetischen Fußsyndroms *ableiten*.',
          hinten: [
            'lauwarm waschen (unter 37 °C), gut abtrocknen, eincremen (nicht zwischen den Zehen)',
            'Nägel feilen, Podologie nutzen',
            'nie barfuß, passende Schuhe, Schuhe auf Fremdkörper prüfen, keine Wärmflasche',
            'gute BZ-Einstellung, nicht rauchen'
          ] },
        { nr: 4,
          vorne: 'Ich kann anhand eines Fallbeispiels Beobachtungen an den Füßen von Diabetikern *beurteilen*:',
          fall: 'Herr Özdemir (69 J.) hat Diabetes mellitus Typ 2 und eine Polyneuropathie. Bei der Fußinspektion sehen Sie am Großzehenballen eine gerötete Druckstelle, die er selbst nicht bemerkt hat und die nicht schmerzt. Die Haut an seinen Füßen ist sehr trocken.',
          hinten: 'Polyneuropathie, eine schmerzlose, unbemerkte Druckstelle und trockene Haut sind **Warnzeichen für ein beginnendes diabetisches Fußsyndrom**.' },
        { nr: 4,
          vorne: 'Ich kann am Fall Frau Schneider (Diabetikerin, Hautdefekt an der Ferse) das **weitere Vorgehen** *beschreiben*.',
          hinten: [
            'Wunde beschreiben und dokumentieren',
            'Hausärztin informieren',
            'Ferse druckentlasten',
            'Füße täglich inspizieren',
            'zur Fußpflege beraten'
          ] },
        { nr: 4,
          vorne: 'Ich kann am Fall Frau Schneider (Diabetikerin, Hautdefekt an der Ferse) die passenden **Personen zur Zusammenarbeit** *nennen*.',
          hinten: [
            '**Hausärztin** (Diagnose, Verordnung)',
            '**Wundexpertin** (Wundversorgung)',
            '**Podologie** (Fuß- und Nagelpflege)',
            '**Diabetesberatung** (Schulung)'
          ] }
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
    bedienung: 'Karte antippen zum Umdrehen. Wischen nach rechts = gewusst, nach links = noch nicht.',
    hilfeSchliessen: 'Schließen'
  }
};
