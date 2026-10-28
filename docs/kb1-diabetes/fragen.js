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
  satz: 'kb1-diabetes',

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Fallsituation: Informationen, Ressourcen, Veränderungen',
      gewicht: 2,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Angaben aus dem Text über Frau Schneider (75 J.) zu.',
          zuordnung: {
            'pflegerelevante Information': ['Diabetes mellitus Typ 2 seit 13 Jahren', 'arterielle Hypertonie'],
            'Ressource': ['im Ort gut eingebunden (Seniorennachmittag, Gartenparzelle)'],
            'auffällige Veränderung': ['sozialer Rückzug', 'unbemerkter Hautdefekt an der rechten Ferse']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Angaben aus dem Text über Frau Schneider (75 J.) zu.',
          zuordnung: {
            'pflegerelevante Information': ['diabetische Polyneuropathie', 'Mischinsulin morgens und abends durch den ambulanten Pflegedienst'],
            'Ressource': ['der Pflegedienst übernimmt BZ-Messung und Insulingabe'],
            'auffällige Veränderung': ['Treppensteigen fällt schwer', 'stärker schwankende Blutzuckerwerte']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Angaben aus dem Text über Herrn Demir (70 J.) zu.',
          zuordnung: {
            'pflegerelevante Information': ['Diabetes mellitus Typ 2 seit acht Jahren', 'spritzt abends ein langwirksames Insulinanalogon'],
            'Ressource': ['seine Frau kocht für ihn nach dem Ernährungsplan', 'besucht regelmäßig eine Diabetes-Selbsthilfegruppe'],
            'auffällige Veränderung': ['seit einer Woche Kribbeln in beiden Füßen', 'seit einigen Tagen auffallend müde und abgeschlagen']
          } },
        { typ: 'zeile',
          frage: 'Tippen Sie **alle** Zeilen an, in denen eine **Ressource** von Herrn Hoffmann steht.',
          zeilen: [
            'Herr Hoffmann (77 J.) wird nach einem Sturz auf der chirurgischen Station versorgt.',
            'Er hat Diabetes mellitus Typ 2 und erhält morgens und abends Mischinsulin.',
            'Seine Frau besucht ihn jeden Nachmittag und bringt frische Wäsche mit.',
            'Er ist geistig fit und möchte möglichst bald wieder selbstständig laufen.',
            'Seit gestern ist der Verband an seinem Knie durchgeblutet.',
            'Heute Morgen lag sein Blutzucker bei 52 mg/dl.'
          ],
          richtig: [3, 4],
          erklaerung: 'Ressourcen: Seine Frau unterstützt ihn täglich (Z. 3); er ist geistig fit und motiviert (Z. 4). Z. 1–2 sind pflegerelevante Informationen, Z. 5–6 auffällige Veränderungen.' },
        { typ: 'zeile',
          frage: 'Tippen Sie **alle** Zeilen an, in denen eine **auffällige Veränderung** bei Herrn Hoffmann steht.',
          zeilen: [
            'Herr Hoffmann (77 J.) wird nach einem Sturz auf der chirurgischen Station versorgt.',
            'Er hat Diabetes mellitus Typ 2 und erhält morgens und abends Mischinsulin.',
            'Seine Frau besucht ihn jeden Nachmittag und bringt frische Wäsche mit.',
            'Er ist geistig fit und möchte möglichst bald wieder selbstständig laufen.',
            'Seit gestern ist der Verband an seinem Knie durchgeblutet.',
            'Heute Morgen lag sein Blutzucker bei 52 mg/dl.'
          ],
          richtig: [5, 6],
          erklaerung: 'Auffällige Veränderungen: durchgebluteter Verband (Z. 5) und ein BZ von 52 mg/dl – unter 70 mg/dl, also eine Hypoglykämie (Z. 6).' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulinwirkung an der Zelle: Typ 1 und Typ 2',
      gewicht: 0,
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
            'Insulin ist vorhanden, die Zelle reagiert aber nur vermindert – Glukose bleibt außerhalb der Zelle.',
            'Insulin fehlt vollständig, weil eine Autoimmunreaktion die β-Zellen zerstört hat – Glukose bleibt draußen.',
            'Die Zelle reagiert verstärkt auf Insulin und nimmt besonders viel Glukose auf – der Blutzucker sinkt stark.',
            'Insulin wirkt normal, die Glukose gelangt ohne Probleme in die Zelle – der Blutzucker bleibt im Normbereich.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzucker-Regelkreis und Krankheitsbild',
      gewicht: 3,
      fragen: [
        { typ: 'reihenfolge',
          frage: 'Bringen Sie die 5 Schritte des Blutzucker-Regelkreises in die richtige Reihenfolge.',
          schritte: [
            'Nach einer kohlenhydratreichen Mahlzeit steigt der Glukosegehalt im Blut.',
            'Die β-Zellen der Bauchspeicheldrüse geben mehr Insulin ab.',
            'Die Muskelzellen nehmen Glukose auf, die Leber speichert sie als Glykogen (Glykogenese) → der Blutzucker sinkt.',
            'Die β-Zellen geben weniger Insulin und die α-Zellen mehr Glukagon ab.',
            'Die Leber baut Glykogen ab (Glykogenolyse) und bildet neue Glukose (Glukoneogenese) → der Blutzucker steigt wieder.'
          ] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Fachbegriffe richtig zu.',
          zuordnung: {
            'Glykogenese': ['Die Leber speichert Glukose als Glykogen.'],
            'Glykogenolyse': ['Die Leber baut Glykogen ab.'],
            'Glukoneogenese': ['Die Leber bildet neue Glukose.']
          } },
        { typ: 'zuordnen',
          frage: 'Regelkreis des Blutzuckers: Ordnen Sie jedem Schritt den passenden **Fachbegriff** zu.',
          zuordnung: {
            'β-Zellen': ['geben nach einer kohlenhydratreichen Mahlzeit mehr Insulin ab'],
            'Glykogenese': ['Die Leber speichert Glukose als Glykogen → der BZ sinkt.'],
            'α-Zellen': ['geben bei sinkendem BZ mehr Glukagon ab'],
            'Glykogenolyse': ['Die Leber baut Glykogen ab → der BZ steigt.'],
            'Glukoneogenese': ['Die Leber bildet neue Glukose → der BZ steigt.']
          } },
        { typ: 'auswahl',
          frage: 'Welche Zellen der Bauchspeicheldrüse geben nach einer Mahlzeit **mehr Insulin** ab?',
          antworten: ['die β-Zellen', 'die α-Zellen', 'die Leberzellen', 'die Muskelzellen'] },
        { typ: 'auswahl',
          frage: 'Welche **Definition** von Diabetes mellitus ist richtig?',
          antworten: [
            'chronische Stoffwechselerkrankung mit dauerhaft erhöhtem Blutzucker durch Insulinmangel, verminderte Insulinwirkung oder beides',
            'akute Stoffwechselentgleisung mit kurzzeitig erniedrigtem Blutzucker, meist durch zu viel Insulin oder eine vergessene Mahlzeit',
            'chronische Erkrankung der Leber, bei der kein Glykogen mehr gespeichert und deshalb keine neue Glukose gebildet werden kann',
            'Stoffwechselerkrankung, die ausschließlich durch zu viel Zucker in der Nahrung entsteht und durch Verzicht wieder verschwindet'
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
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Beschreiben Sie den Regelkreis des Blutzuckers in fünf Schritten – mit Fachbegriffen.',
          muster: [
            'Nach einer kohlenhydratreichen Mahlzeit steigt der Glukosegehalt im Blut.',
            'Die β-Zellen der Bauchspeicheldrüse geben mehr Insulin ab.',
            'Insulin wirkt an den Körperzellen: Die Muskelzellen nehmen Glukose auf, die Leber speichert Glukose als Glykogen (Glykogenese) → der BZ sinkt.',
            'Sinkt der BZ, geben die β-Zellen weniger Insulin und die α-Zellen mehr Glukagon ab.',
            'Ist der BZ zu weit abgesunken, baut die Leber Glykogen ab (Glykogenolyse) und bildet neue Glukose (Glukoneogenese) → der BZ steigt wieder.'
          ],
          checkliste: [
            'Alle fünf Schritte in der richtigen Reihenfolge?',
            'β-Zellen und α-Zellen genannt?',
            'Glykogenese, Glykogenolyse und Glukoneogenese richtig verwendet?'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Typ 1 und Typ 2: vergleichen und erklären',
      gewicht: 2,
      fragen: [
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage – und warum?',
          fall: '„Bei Typ 1 ist genug Insulin vorhanden, aber die Zellen reagieren nicht darauf.“',
          antworten: [
            'Falsch: Bei Typ 1 zerstört eine Autoimmunreaktion die β-Zellen – es fehlt Insulin (absoluter Insulinmangel).',
            'Falsch: Bei Typ 1 ist sogar zu viel Insulin vorhanden, deshalb sinkt der Blutzucker immer wieder stark ab.',
            'Richtig: Bei Typ 1 reagieren Leber-, Muskel- und Fettzellen nur noch vermindert auf das vorhandene Insulin.',
            'Richtig: Typ 1 entsteht durch Übergewicht; die Zellen werden dadurch mit der Zeit unempfindlich für Insulin.'
          ] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage – und warum?',
          fall: '„Wenn Insulin fehlt oder nicht wirkt, bleibt weniger Glukose im Blut.“',
          antworten: [
            'Falsch: Die Zellen nehmen dann weniger Glukose auf – deshalb bleibt mehr Glukose im Blut.',
            'Falsch: Ohne Insulin bleibt die Glukose gleich, weil die Leber den Blutzucker ganz allein regelt.',
            'Richtig: Ohne Insulin verbrauchen die Zellen mehr Glukose, deshalb sinkt der Blutzucker ab.',
            'Richtig: Fehlt Insulin, scheidet die Niere sofort alle Glukose aus, und der Blutzucker sinkt.'
          ] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage – und warum?',
          fall: '„Bei Typ 2 bildet der Körper anfangs noch genug oder sogar mehr Insulin, später immer weniger.“',
          antworten: [
            'Richtig: Die Zellen reagieren vermindert auf Insulin (Insulinresistenz); im Verlauf bildet der Körper oft weniger.',
            'Falsch: Bei Typ 2 bildet der Körper von Anfang an gar kein Insulin, weil die β-Zellen zerstört sind.',
            'Falsch: Bei Typ 2 bildet der Körper immer gleich viel Insulin; nur die Ernährung verändert sich mit der Zeit.',
            'Richtig: Weil anfangs mehr Insulin gebildet wird, liegt der Blutzucker bei Typ 2 zuerst meist zu niedrig.'
          ] },
        { typ: 'auswahl',
          frage: 'Sie erklären einer Patientin mit Typ-2-Diabetes, warum ihr Blutzucker trotz eigener Insulinbildung erhöht ist. Welche Erklärung passt?',
          antworten: [
            '„Ihr Körper macht noch genug Schlüssel, aber die Schlösser an den Zellen klemmen. Darum bleibt der Zucker im Blut.“',
            '„Ihr Körper macht gar keine Schlüssel mehr, weil die Schlüsselfabrik zerstört ist. Darum bleibt der Zucker im Blut.“',
            '„Ihre Schlüssel öffnen die Zellen viel zu weit. Darum strömt zu viel Zucker hinein und Ihr Blutzucker sinkt.“',
            '„Ihre Schlösser sind völlig in Ordnung. Sie essen einfach zu viel Zucker, deshalb ist Ihr Blutzucker zu hoch.“'
          ] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage – und warum?',
          fall: '„Typ-1-Diabetes bekommt man, wenn man als Kind zu viele Süßigkeiten isst.“',
          antworten: [
            'Falsch: Eine Autoimmunreaktion zerstört die β-Zellen; durch den Lebensstil ist Typ 1 nicht beeinflussbar.',
            'Richtig: Viel Zucker überlastet die β-Zellen so lange, bis sie gar kein Insulin mehr bilden können.',
            'Falsch: Typ 1 entsteht durch Übergewicht und Bewegungsmangel, und zwar meist erst im Erwachsenenalter.',
            'Richtig: Süßigkeiten machen die Zellen unempfindlich für Insulin – das nennt man Insulinresistenz.'
          ] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage – und warum?',
          fall: '„Bei Typ 2 braucht man nie Insulin – der Körper bildet ja selbst welches.“',
          antworten: [
            'Falsch: Bei Insulinresistenz bildet der Körper im Verlauf oft immer weniger Insulin – viele brauchen dann Insulin.',
            'Richtig: Bei Typ 2 wird immer genug Insulin gebildet; Tabletten und Bewegung reichen deshalb in jedem Fall aus.',
            'Falsch: Bei Typ 2 sind die β-Zellen von Anfang an zerstört, deshalb braucht man sofort und lebenslang Insulin.',
            'Richtig: Bei Typ 2 hilft gespritztes Insulin nicht, weil die Zellen gar nicht mehr auf Insulin reagieren.'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Identifizieren Sie den Fehler in der Aussage und begründen Sie die Korrektur fachlich.',
          fall: '„Typ-1-Diabetes bekommen nur Kinder – Erwachsene haben immer Typ 2.“',
          muster: [
            'Fehler: Typ 1 beginnt meist im Kindes- oder Jugendalter, kann aber auch später auftreten.',
            'Begründung: Bei Typ 1 zerstört eine Autoimmunreaktion die β-Zellen → absoluter Insulinmangel. Das ist nicht an ein bestimmtes Alter gebunden.'
          ],
          checkliste: [
            'Den Fehler klar benannt?',
            'Die Korrektur fachlich begründet (Ursache von Typ 1)?',
            'Fachbegriffe richtig verwendet (Autoimmunreaktion, β-Zellen, Insulinmangel)?'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Insulinarten und Mahlzeitenbezug',
      gewicht: 1,
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
            'kurz und länger wirksamer Anteil (z. B. 30/70); trüb → vor der Gabe durchmischen',
            'nur ein lang wirksamer Anteil; klar → vor der Gabe nicht durchmischen',
            'kurz und länger wirksamer Anteil; wird ausschließlich i. v. über einen Perfusor gegeben',
            'nur ein kurz wirksamer Anteil; hat keinen Mahlzeitenbezug und wird nachts gespritzt'
          ] },
        { typ: 'auswahl',
          frage: 'Was deckt **Basalinsulin** ab?',
          antworten: [
            'den Grundbedarf rund um die Uhr – unabhängig von den Mahlzeiten',
            'den zusätzlichen Bedarf zu den Mahlzeiten – abhängig von den Kohlenhydraten',
            'nur den Bedarf während der Nacht – tagsüber wird es nicht gebraucht',
            'nur die Korrektur sehr hoher BZ-Werte – zum Beispiel bei einem Infekt'
          ] },
        { typ: 'auswahl',
          frage: 'Was bedeutet „**Mahlzeitenbezug**“?',
          antworten: [
            'Die Insulingabe wird zeitlich auf die Mahlzeit abgestimmt, damit Insulinwirkung und Kohlenhydrataufnahme zusammenpassen.',
            'Die Insulindosis richtet sich nur nach dem Körpergewicht – wann die Mahlzeit kommt, spielt für die Gabe keine Rolle.',
            'Insulin wird grundsätzlich erst nach dem Essen gegeben, damit man sicher weiß, wie viel gegessen wurde.',
            'Zu jeder Mahlzeit wird zusätzlich Basalinsulin gegeben, damit der Grundbedarf auch beim Essen gedeckt ist.'
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
      gewicht: 3,
      fragen: [
        { typ: 'auswahl',
          frage: 'Kann die Insulingabe wie geplant durchgeführt werden?',
          fall: 'Normalinsulin ist für 12:00 Uhr angeordnet, das Essen kommt erst um 12:45 Uhr.',
          antworten: [
            'Nicht wie geplant (Punkte 5, 7): Der Spritz-Ess-Abstand passt nicht; Zeitpunkt und Mahlzeit klären.',
            'Wie geplant (Punkte 5, 7): Das Essen kommt noch innerhalb einer Stunde, das reicht als Spritz-Ess-Abstand.',
            'Wie geplant um 12:00 Uhr geben und um 12:45 Uhr zum Essen noch einmal dieselbe Dosis spritzen.',
            'Nicht wie geplant: Das Insulin wird ersatzlos gestrichen, darüber muss niemand informiert werden.'
          ] },
        { typ: 'auswahl',
          frage: 'Kann die Insulingabe wie geplant durchgeführt werden?',
          fall: 'Es ist kein aktueller BZ-Wert dokumentiert.',
          antworten: [
            'Erst klären (Punkt 6): vor der Gabe den BZ messen.',
            'Wie geplant (Punkt 6): Der dokumentierte Wert von gestern reicht aus.',
            'Wie geplant, aber die Dosis vorsichtshalber selbst halbieren.',
            'Wie geplant: Insulin geben und den BZ erst danach messen.'
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
          } },
        { typ: 'auswahl',
          frage: 'Kann die Insulingabe wie geplant durchgeführt werden?',
          fall: 'Um 7:30 Uhr sind bei Frau Kaya NPH-Insulin und ein kurzwirksames Insulinanalogon zum Frühstück angeordnet. Ihr ist übel, sie möchte nichts essen. BZ: 145 mg/dl.',
          antworten: [
            'NPH-Insulin grundsätzlich geben (Basalinsulin); das kurzwirksame Analogon nicht wie geplant – Rücksprache mit dem ärztlichen Dienst.',
            'Beide Insuline wie geplant geben – der BZ ist mit 145 mg/dl ja nicht niedrig, also besteht keine Gefahr; danach den BZ kontrollieren.',
            'Beide Insuline weglassen – ohne Frühstück darf grundsätzlich gar kein Insulin gegeben werden, auch kein Basalinsulin.',
            'Nur das kurzwirksame Analogon geben, weil es schnell wirkt; das NPH-Insulin auf morgen früh verschieben und dokumentieren.'
          ],
          erklaerung: 'Mahlzeiteninsulin ohne Mahlzeit (Punkte 7, 8) → Gefahr einer Hypoglykämie. Basalinsulin deckt den Grundbedarf. Sind zwei Insuline fällig, jedes einzeln prüfen.' },
        { typ: 'auswahl',
          frage: 'Ein Mahlzeiteninsulin kann nicht wie geplant gegeben werden. Wie gehen Sie vor?',
          antworten: [
            'Rücksprache mit dem ärztlichen Dienst halten, nicht eigenmächtig handeln, BZ kontrollieren und dokumentieren.',
            'Die Dosis selbst halbieren und trotzdem spritzen, damit der BZ nicht steigt – und das anschließend dokumentieren.',
            'Das Insulin einfach zur nächsten Mahlzeit zusätzlich zur geplanten Dosis spritzen und den BZ dann kontrollieren.',
            'Die Gabe weglassen, ohne es weiterzugeben – der Blutzucker regelt sich ohne Mahlzeit von selbst wieder ein.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Hypo- und Hyperglykämie',
      gewicht: 3,
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
            'Blässe, Schwitzen, Zittern, Heißhunger; schneller Puls (Tachykardie); Atem riecht unauffällig',
            'Durchfall und Hautausschlag; flache, langsame Atmung (Schonatmung); Atem riecht nach Ammoniak',
            'hohes Fieber, Schüttelfrost und Gliederschmerzen; schnelle, flache Atmung; Atem riecht süßlich nach Alkohol'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Notfallmaßnahme ist bei einer **Hypoglykämie** richtig?',
          antworten: [
            'Aktivität pausieren und schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft)',
            'Insulin geben, damit der Zucker schneller in die Zellen gelangt und der Kreislauf sich erholt',
            'Ketonkörper messen und vorerst keine Kohlenhydrate zuführen, bis die Ärztin da ist',
            'die Person zügig spazieren gehen lassen, damit der Kreislauf wieder in Schwung kommt'
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
            'Hypoglykämie – sofort handeln, weil den Gehirnzellen Glukose fehlt (es drohen Sprachstörungen und Krampfanfälle).',
            'Hyperglykämie – zeitnah handeln, weil durch den Flüssigkeitsverlust Bewusstseinsstörungen drohen: BZ und Ketonkörper messen.',
            'Hypoglykämie – abwarten und in einer Stunde erneut nachsehen, weil das Zittern meist von selbst vorbeigeht.',
            'Hyperglykämie – sofort Traubenzucker geben, weil der Körper Energie braucht, um den Zucker abzubauen.'
          ] },
        { typ: 'auswahl',
          frage: 'Was liegt vor – und wie dringend ist es?',
          fall: 'Jana ist sehr durstig, muss häufig auf Toilette und klagt über Kopfschmerzen.',
          antworten: [
            'Hyperglykämie – zeitnah handeln (BZ und Ketonkörper messen, Arzt informieren), weil durch den Flüssigkeitsverlust Bewusstseinsstörungen drohen.',
            'Hypoglykämie – sofort Traubenzucker geben, weil Kopfschmerzen und Durst typische Zeichen eines Glukosemangels im Gehirn sind.',
            'Hyperglykämie – keine Maßnahme nötig, weil viel Trinken den Blutzucker verdünnt und der Durst damit von selbst verschwindet.',
            'Hypoglykämie – Aktivität pausieren und abwarten, weil häufiges Wasserlassen auf einen niedrigen Blutzucker hinweist und sich das legt.'
          ] },
        { typ: 'auswahl',
          frage: 'Warum hat eine Person mit Hyperglykämie **starken Durst**?',
          antworten: [
            'Der Körper scheidet den zu hohen BZ über den Urin aus (Polyurie); durch den Flüssigkeitsverlust meldet das Gehirn Durst.',
            'Durch den Glukosemangel im Gehirn entsteht ein Durstgefühl, weil die Nervenzellen nicht mehr genug Energie bekommen.',
            'Insulin entzieht den Zellen Wasser und lagert es in der Leber ein; deshalb fehlt dem Körper Flüssigkeit und er meldet Durst.',
            'Der hohe Zucker im Speichel trocknet die Mundschleimhaut direkt aus; der Durst kommt also nur vom trockenen Mund.'
          ] },
        { typ: 'auswahl',
          frage: 'Was liegt vor – und welche Begründung passt?',
          fall: 'Herr Lorenz (Typ 2, Insulin) hat seit dem Morgen Durchfall und Erbrechen. Am Nachmittag ist er blass, zittert und schwitzt. Das Messgerät zeigt 3,5 mmol/l.',
          antworten: [
            'Hypoglykämie: Blässe, Zittern, Schwitzen; 3,5 mmol/l = 63 mg/dl, unter 70 mg/dl. Ursache: kaum Kohlenhydrate durch Durchfall/Erbrechen.',
            'Hyperglykämie: 3,5 mmol/l liegen über 180 mg/dl. Ursache: Der Infekt mit Durchfall und Erbrechen lässt den Blutzucker steigen.',
            'Hypoglykämie: 3,5 mmol/l = 35 mg/dl, weit unter 70 mg/dl. Ursache: Er hat vor dem Durchfall zu viele Kohlenhydrate gegessen.',
            'Kein Notfall: 3,5 mmol/l = 63 mg/dl liegen im Normbereich; Blässe und Schwitzen kommen nur vom Flüssigkeitsverlust.'
          ] },
        { typ: 'auswahl',
          frage: 'Was liegt vor – und welche Begründung passt?',
          fall: 'Frau Brückner (Typ 1) schreibt morgen eine Prüfung und ist seit Tagen sehr angespannt. Sie fühlt sich schlapp, hat starken Durst und muss ständig zur Toilette. BZ: 245 mg/dl.',
          antworten: [
            'Hyperglykämie: Abgeschlagenheit, starker Durst, häufiges Wasserlassen; 245 mg/dl liegen über 180 mg/dl. Ursache: Stress.',
            'Hypoglykämie: Die Schlappheit zeigt einen Glukosemangel; 245 mg/dl liegen unter 250 mg/dl. Ursache: Sie isst vor Aufregung zu wenig.',
            'Keine Stoffwechselentgleisung: 245 mg/dl sind bei Typ 1 normal; Durst und Wasserlassen kommen nur von der Aufregung.',
            'Hypoglykämie: Der Durst entsteht, weil den Gehirnzellen Glukose fehlt; 245 mg/dl liegen unter 300 mg/dl. Ursache: Stress.'
          ] },
        { typ: 'mehrfach',
          frage: 'Welche Notfallmaßnahmen sind bei einer **Hypoglykämie** (Person ansprechbar) richtig? Tippen Sie **alle** richtigen an.',
          richtig: [
            'Aktivität pausieren',
            'schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft)',
            'nach ca. 30 min den BZ erneut kontrollieren'
          ],
          falsch: [
            'Insulin geben, damit der Zucker in die Zellen gelangt',
            'Ketonkörper messen und keine Kohlenhydrate geben',
            'die Person zur Ablenkung weitergehen lassen'
          ],
          erklaerung: 'Aktivität pausieren (Bewegung verbraucht Glukose), schnell wirksame Kohlenhydrate (gelangen rasch ins Blut), nach ca. 30 min BZ kontrollieren (steigt er wieder?).' },
        { typ: 'zuordnen',
          frage: 'Hypoglykämie: Ordnen Sie jeder Notfallmaßnahme die passende **Begründung** zu.',
          zuordnung: {
            '… weil Bewegung zusätzlich Glukose verbraucht.': ['Aktivität pausieren'],
            '… weil sie rasch ins Blut gelangen.': ['schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft)'],
            '… um zu prüfen, ob der BZ wieder steigt.': ['nach ca. 30 min den BZ kontrollieren'],
            '… weil Insulin den BZ senkt.': [],
            '… damit der BZ nicht weiter steigt.': []
          } }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Beschreiben Sie drei Notfallmaßnahmen und begründen Sie jede Maßnahme.',
          fall: 'Frau Jung (Typ 1) hat kurz nach dem Insulinspritzen ihr Frühstück erbrochen. Jetzt ist sie blass, zittrig und unruhig; BZ 60 mg/dl. Sie ist ansprechbar.',
          muster: [
            'Aktivität pausieren, weil Bewegung zusätzlich Glukose verbraucht.',
            'Schnell wirksame Kohlenhydrate geben (z. B. Traubenzucker, Saft), weil sie rasch ins Blut gelangen – Frau Jung ist ansprechbar und kann schlucken.',
            'Nach ca. 30 min den BZ kontrollieren, um zu prüfen, ob er wieder steigt.'
          ],
          checkliste: [
            'Drei Maßnahmen genannt?',
            'Jede Maßnahme mit „weil …“ begründet?',
            'Bezug zum Fall (ansprechbar, BZ-Wert)?'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Indikation, 10-R-Regel, Umrechnen',
      gewicht: 2,
      fragen: [
        { typ: 'auswahl',
          frage: 'Was bedeutet der Begriff „**Indikation**“?',
          antworten: [
            'der fachlich begründete Anlass für eine Maßnahme',
            'ein fachlicher Grund, eine Maßnahme nicht durchzuführen',
            'die schriftliche Dokumentation einer durchgeführten Maßnahme',
            'die ärztlich angeordnete Dosierung eines Medikaments'
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
            'Nichts unternehmen – 215 mg/dl entsprechen etwa 2,1 mmol/l und liegen damit unter 10 mmol/l.',
            'Selbst Insulin nach eigenem Ermessen geben, weil der Wert über 10 mmol/l liegt.',
            'Die Messung erst am nächsten Tag wiederholen und den Wert dann weitergeben.'
          ] },
        { typ: 'zahl',
          frage: 'Das Messgerät zeigt **3,5 mmol/l**. Wie viel **mg/dl** sind das?',
          loesung: 63, toleranz: 1, einheit: 'mg/dl',
          erklaerung: '3,5 × 18 = 63 mg/dl – unter 70 mg/dl, also eine Hypoglykämie.' },
        { typ: 'auswahl',
          frage: 'Besteht Handlungsbedarf?',
          fall: 'Vorgabe: Bei Werten unter 4 mmol/l sofort die Pflegefachkraft informieren. Gemessen: 65 mg/dl.',
          antworten: [
            'Ja: 65 mg/dl : 18 ≈ 3,6 mmol/l – das liegt unter 4 mmol/l, also sofort informieren.',
            'Nein: 65 mg/dl : 18 ≈ 6,5 mmol/l – das liegt über 4 mmol/l, also kein Handlungsbedarf.',
            'Nein: 65 mg/dl × 18 = 1170 mmol/l – das liegt weit über 4 mmol/l, kein Handlungsbedarf.',
            'Nein: mg/dl und mmol/l lassen sich nicht vergleichen – den Wert einfach nur dokumentieren.'
          ] },
        { typ: 'auswahl',
          frage: 'Besteht Handlungsbedarf?',
          fall: 'Vorgabe: Bei Werten über 300 mg/dl die Ärztin informieren. Das Messgerät zeigt 18 mmol/l.',
          antworten: [
            'Ja: 18 mmol/l × 18 = 324 mg/dl – das liegt über 300 mg/dl, also die Ärztin informieren.',
            'Nein: 18 mmol/l × 18 = 234 mg/dl – das liegt unter 300 mg/dl, also kein Handlungsbedarf.',
            'Nein: 18 mmol/l : 18 = 1 mg/dl – das liegt weit unter 300 mg/dl, also kein Handlungsbedarf.',
            'Ja: 18 mmol/l liegen unter 300 – also sofort Traubenzucker geben und die Ärztin informieren.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Blutzuckermessung: Ablauf',
      gewicht: 0,
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
      gewicht: 2,
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
            'Der Wert ist nicht verlässlich, weil die Teststreifen abgelaufen sind; mit gültigen Teststreifen erneut messen.',
            'Der Wert ist verlässlich, weil das Gerät einen Wert anzeigt; abgelaufene Teststreifen messen nur etwas langsamer.',
            'Den Wert übernehmen und die Insulindosis entsprechend anpassen, weil 284 mg/dl eindeutig zu hoch sind.',
            'Den Wert halbieren und dokumentieren, weil abgelaufene Teststreifen immer doppelt so hoch messen.'
          ] },
        { typ: 'auswahl',
          frage: 'Ein **falsch hoher Messwert** wird übernommen. Welche Folge droht?',
          antworten: [
            'Es kann zu viel Insulin gegeben werden → Gefahr einer Hypoglykämie.',
            'Es wird zu wenig Insulin gegeben → Gefahr einer Ketoazidose.',
            'Keine Folge, weil der Wert ohnehin dokumentiert und am nächsten Tag überprüft wird.',
            'Die Patientin bekommt zu viele Kohlenhydrate → Gefahr einer Hyperglykämie.'
          ] },
        { typ: 'zeile',
          frage: 'Tippen Sie **alle** Zeilen an, in denen Mia bei der Blutzuckermessung einen **Fehler** macht.',
          zeilen: [
            'Pflegeschülerin Mia misst bei Frau Roth (69 J.) vor dem Mittagessen den Blutzucker.',
            'Sie prüft das Verfallsdatum der Teststreifen und zieht Handschuhe an.',
            'Mia desinfiziert die Fingerkuppe und sticht sofort danach ein.',
            'Sie wählt den Ringfinger und punktiert seitlich an der Fingerbeere.',
            'Weil kaum Blut kommt, drückt sie den Finger kräftig aus.',
            'Danach gibt sie Frau Roth einen Tupfer zum Komprimieren.'
          ],
          richtig: [3, 5],
          erklaerung: 'Z. 3: Das Desinfektionsmittel muss vollständig trocknen, sonst verfälscht es den Wert. Z. 5: Den Finger nicht „ausmelken“ – Gewebsflüssigkeit verfälscht den Wert; besser die Hände vorher erwärmen.' }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Beurteilen Sie die Messung und beschreiben Sie, welche Folge es haben kann, wenn der Wert so übernommen wird.',
          fall: 'Pflegeschüler Tom desinfiziert bei Herrn Abel die Fingerkuppe und sticht sofort danach ein. Das Gerät zeigt 92 mg/dl.',
          muster: [
            'Das Desinfektionsmittel war noch nicht getrocknet → es verfälscht den Messwert; der Wert ist nicht verlässlich. Trocknen lassen und erneut messen.',
            'Folge: Wird ein verfälschter Wert übernommen, kann die Insulingabe falsch angepasst werden.'
          ],
          checkliste: [
            'Die Fehlerquelle benannt?',
            'Beurteilt, dass der Wert nicht verlässlich ist – mit Konsequenz (erneut messen)?',
            'Eine mögliche Folge beschrieben?'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Spätfolgen und diabetisches Fußsyndrom',
      gewicht: 3,
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
            'Puls, Blutdruck und Körpertemperatur, Hautfarbe der Hände und Atemfrequenz',
            'Schuhgröße, Fußlänge, Haarwuchs an den Zehen, Länge der Zehennägel und Fußgeruch',
            'Muskelkraft, Gangbild, Beweglichkeit im Sprunggelenk, Kniereflex und Wadenumfang'
          ] },
        { typ: 'auswahl',
          frage: 'Welche Maßnahme beugt einem **diabetischen Fußsyndrom** vor?',
          antworten: [
            'lauwarm waschen (unter 37 °C), gut abtrocknen, eincremen (nicht zwischen den Zehen)',
            'die Füße abends mit einer Wärmflasche wärmen, damit sie besser durchblutet werden',
            'zu Hause möglichst barfuß laufen, damit die Haut atmen kann und Druckstellen heilen',
            'die Füße täglich heiß baden (über 40 °C), damit sich die Hornhaut besser löst'
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
            'Harmlos – der Hautdefekt schmerzt ja nicht, also ist er nicht entzündet.',
            'Das ist ein typisches Zeichen einer Hypoglykämie und verschwindet mit Traubenzucker.',
            'Normale trockene Altershaut – außer Eincremen sind keine Maßnahmen nötig.'
          ] },
        { typ: 'auswahl',
          frage: 'Welches **weitere Vorgehen** ist beim Hautdefekt an der Ferse von Frau Schneider richtig?',
          antworten: [
            'Wunde beschreiben und dokumentieren, Hausärztin informieren, Ferse druckentlasten, Füße täglich inspizieren',
            'ein Pflaster aufkleben, abwarten, bis es abheilt, und den Befund erst beim nächsten Arztbesuch erwähnen',
            'die Ferse mit einer Wärmflasche wärmen, damit sie besser durchblutet wird, und die Haut gut eincremen',
            'Füße künftig nur noch einmal pro Woche ansehen, um die empfindliche Haut nicht unnötig zu belasten'
          ] },
        { typ: 'zuordnen',
          frage: 'Mit wem arbeiten Sie zusammen? Ordnen Sie die Aufgabe zu.',
          zuordnung: {
            'Hausärztin': ['Diagnose, Verordnung'],
            'Wundexpertin': ['Wundversorgung'],
            'Podologie': ['Fuß- und Nagelpflege'],
            'Diabetesberatung': ['Schulung']
          } },
        { typ: 'mehrfach',
          frage: 'Welche gehören zu den **Langzeitschäden** des Diabetes mellitus? Tippen Sie **alle** richtigen an.',
          richtig: [
            'Retinopathie (Netzhaut)',
            'Nephropathie (Niere)',
            'Polyneuropathie (Nerven)',
            'Arteriosklerose (Herzinfarkt, Schlaganfall, pAVK)'
          ],
          falsch: [
            'Hypoglykämie',
            'Ketoazidose',
            'Lipohypertrophie an der Einstichstelle'
          ],
          erklaerung: 'Hypoglykämie und Ketoazidose sind Akutkomplikationen; eine Lipohypertrophie entsteht durch Spritzen immer an derselben Stelle.' },
        { typ: 'mehrfach',
          frage: 'Worauf achten Sie bei der **Fußinspektion**? Tippen Sie **alle** richtigen an.',
          richtig: [
            'Rötungen und Druckstellen',
            'Blasen und Risse',
            'Hornhaut und Nagelveränderungen',
            'Fußpilz'
          ],
          falsch: [
            'Puls und Blutdruck',
            'Schuhgröße',
            'Kniereflex'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Beurteilen Sie die Beobachtung, beschreiben Sie das weitere Vorgehen und nennen Sie zwei Berufsgruppen für die Zusammenarbeit.',
          fall: 'Bei Frau Beck (Typ 2, Polyneuropathie) sehen Sie unter dem rechten Großzeh eine Blase, die sie selbst nicht bemerkt hat.',
          muster: [
            'Beurteilung: unbemerkte Blase bei Polyneuropathie → Warnzeichen für ein beginnendes diabetisches Fußsyndrom (Gefahr von Infektion und Ulkus).',
            'Vorgehen: beschreiben und dokumentieren, Ärztin/Arzt informieren, die Stelle druckentlasten, Füße täglich inspizieren, zur Fußpflege beraten.',
            'Zusammenarbeit z. B. mit Hausärztin, Wundexpertin, Podologie oder Diabetesberatung.'
          ],
          checkliste: [
            'Beobachtung beurteilt (Warnzeichen, Begründung)?',
            'Vorgehen beschrieben?',
            'Zwei Berufsgruppen genannt?'
          ] }
      ]
    }
  ]
};
