/* =====================================================================
 * KLAUSUR-CHALLENGE KB I – Parkinson
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
 *   { typ: 'reihenfolge', frage: '…', schritte: ['erster', 'zweiter', '…'] }
 *   { typ: 'zahl', frage: '…', loesung: 20.4, toleranz: 0.1, einheit: 'kg/m²' }
 *   { typ: 'zeile', frage: '…', zeilen: ['Zeile 1', 'Zeile 2', '…'], richtig: [2, 4] }
 *   { typ: 'mehrfach', frage: '…', richtig: ['…', '…'], falsch: ['…', '…'] }
 * Optional bei jeder Aufgabe: fall: '…' (eingerahmter Fall) und
 * erklaerung: '…' (erscheint in der Auswertung bei den Lösungen).
 *
 * Je Thema:
 *   gewicht: 0 bis 3 – wie oft das Thema über die eine Pflichtaufgabe hinaus
 *            drankommt (Klausurrelevanz). 0 = genau eine Aufgabe je Challenge.
 *   schreiben: [ { typ: 'schreiben', frage: '…', fall: '…', muster: ['…'], checkliste: ['…'] } ]
 * ===================================================================== */

var CHALLENGE_FRAGEN = {
  satz: 'kb1-parkinson',

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Fallsituation: Parkinson-Symptome erkennen',
      gewicht: 0,
      fragen: [
        { typ: 'zeile',
          frage: 'Tippen Sie alle Zeilen an, die auf ein **Leitsymptom** von Parkinson hinweisen.',
          zeilen: [
            'Frau Kern (70 J.) wohnt allein und wird von ihrer Tochter unterstützt.',
            'Ihre rechte Hand zittert, wenn sie ruhig im Schoß liegt.',
            'Beim Durchbewegen des Ellenbogens spürt man einen ruckartigen Widerstand.',
            'Sie liest gern Krimis und hört Radio.',
            'Beim Losgehen braucht sie mehrere Anläufe, die Schritte sind klein.',
            'Sie trinkt am Tag etwa 1,5 Liter Tee und Wasser.'
          ],
          richtig: [2, 3, 5],
          erklaerung: 'Z. 2 Ruhetremor · Z. 3 Rigor (Zahnradphänomen) · Z. 5 Bradykinese/Starthemmung.' },
        { typ: 'zeile',
          frage: 'Tippen Sie alle Zeilen an, die ein **nichtmotorisches** Symptom beschreiben.',
          zeilen: [
            'Herr Vogt (66 J.) war Lehrer und ist seit einem Jahr in Rente.',
            'Er schwitzt stark, obwohl es im Zimmer kühl ist.',
            'Seine Schrift ist so klein geworden, dass man sie kaum lesen kann.',
            'Kaffee riecht er schon seit Jahren nicht mehr.',
            'Er hat nur alle vier bis fünf Tage Stuhlgang.',
            'Sein Gesicht wirkt starr und ausdruckslos.'
          ],
          richtig: [2, 4, 5],
          erklaerung: 'Nichtmotorisch: Schwitzen (Z. 2), Riechstörung (Z. 4), Obstipation (Z. 5). Mikrographie (Z. 3) und Hypomimie (Z. 6) sind motorisch.' },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beobachtungen dem passenden Fachbegriff zu.',
          zuordnung: {
            'Freezing': ['bleibt an der Tür „wie festgeklebt“ stehen'],
            'Hypomimie': ['Gesicht wirkt starr, kaum Mimik'],
            'Mikrographie': ['Handschrift wird immer kleiner'],
            'Hypophonie': ['spricht sehr leise und monoton']
          } },
        { typ: 'zeile',
          frage: 'Tippen Sie alle Zeilen an, die auf die **posturale Instabilität** hinweisen.',
          zeilen: [
            'Herr Lenz (72 J.) war Schreinermeister.',
            'Beim Umdrehen verliert er leicht das Gleichgewicht.',
            'Seine rechte Hand zittert auf der Armlehne.',
            'Vor zwei Wochen ist er rückwärts gestürzt.',
            'Er möchte wieder in seine Werkstatt.'
          ],
          richtig: [2, 4],
          erklaerung: 'Gestörte Halte- und Stellreflexe: Gleichgewichtsverlust beim Umdrehen (Z. 2), Sturz nach hinten (Z. 4). Z. 3 ist der Ruhetremor.' }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Identifizieren Sie in der Fallsituation drei Parkinson-Symptome. Nennen Sie jeweils den Fachbegriff.',
          fall: 'Herr Bauer (73 J.) geht mit kleinen Schritten, seine Arme schwingen nicht mit. Beim Umdrehen verliert er das Gleichgewicht und ist letzte Woche nach hinten gestürzt. Seine linke Hand zittert beim Fernsehen.',
          muster: [
            'kleine Schritte, Arme schwingen nicht mit → Bradykinese/Akinese',
            'Gleichgewichtsverlust, Sturz nach hinten → posturale Instabilität',
            'Hand zittert in Ruhe → Ruhetremor'
          ],
          checkliste: ['drei Symptome mit Textbeleg', 'jeweils der richtige Fachbegriff', 'in der Klausur: Zeile angeben'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Krankheitsbild: Definition, Ursache, Pathophysiologie',
      gewicht: 2,
      fragen: [
        { typ: 'auswahl',
          frage: 'Welche Aussage beschreibt die **Pathophysiologie** von Parkinson richtig?',
          antworten: [
            'Dopaminbildende Zellen der Substantia nigra gehen zugrunde; Acetylcholin überwiegt relativ.',
            'Acetylcholinbildende Zellen im Kleinhirn gehen zugrunde; Dopamin überwiegt dadurch relativ.',
            'Entzündungsherde zerstören die Markscheiden im Rückenmark und stören so die Bewegungen.',
            'Ein Gefäßverschluss im Mittelhirn unterbricht plötzlich die Versorgung der Basalganglien.'
          ],
          erklaerung: 'Untergang dopaminbildender Neurone in der Substantia nigra → Dopaminmangel, relatives Acetylcholin-Übergewicht.' },
        { typ: 'auswahl',
          frage: 'Was bedeutet „idiopathisches Parkinson-Syndrom“?',
          antworten: [
            'Die Ursache des Zelluntergangs ist unbekannt.',
            'Die Symptome werden durch Medikamente ausgelöst.',
            'Parkinson tritt im Rahmen einer anderen Erkrankung auf.',
            'Die Erkrankung ist angeboren und beginnt im Kindesalter.'
          ] },
        { typ: 'auswahl',
          frage: 'Wann treten die ersten Bewegungsstörungen auf?',
          antworten: [
            'wenn über die Hälfte der dopaminbildenden Zellen fehlt',
            'sobald die ersten dopaminbildenden Nervenzellen untergehen',
            'erst wenn alle dopaminbildenden Nervenzellen zerstört sind',
            'unabhängig vom Zellverlust immer ab dem 60. Lebensjahr'
          ] },
        { typ: 'reihenfolge',
          frage: 'Bringen Sie die Pathophysiologie in die richtige Reihenfolge.',
          schritte: [
            'Dopaminbildende Zellen in der Substantia nigra gehen zugrunde.',
            'In den Basalganglien fehlt Dopamin.',
            'Acetylcholin überwiegt relativ – die Botenstoffe sind im Ungleichgewicht.',
            'Bewegungen können nicht mehr fein gesteuert werden.'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Aussagen an, die zur **Definition** von Parkinson passen.',
          richtig: ['fortschreitend', 'neurodegenerativ', 'nicht heilbar', 'stört v. a. die Bewegungssteuerung'],
          falsch: ['ansteckend', 'heilt nach Jahren aus'] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beschreibungen der Form des Parkinson-Syndroms zu.',
          zuordnung: {
            'idiopathisch': ['Ursache unbekannt, häufigste Form'],
            'symptomatisch (sekundär)': ['ausgelöst z. B. durch Medikamente oder eine Vergiftung'],
            'atypisch': ['Teil einer anderen neurodegenerativen Erkrankung']
          } },
        { typ: 'auswahl',
          frage: 'Warum wird Parkinson oft erst spät erkannt?',
          antworten: [
            'Frühzeichen wie Riechstörung werden selten mit Parkinson verbunden.',
            'Die Erkrankung beginnt immer mit einer schweren akinetischen Krise.',
            'Parkinson zeigt sich nur in Blutwerten, die selten bestimmt werden.',
            'Die Bewegungsstörungen treten nur nachts im Schlaf auf.'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Erläutern Sie das Krankheitsbild Parkinson mit Definition, Ursache und Pathophysiologie.',
          muster: [
            'Definition: langsam fortschreitende, nicht heilbare neurodegenerative Erkrankung, die v. a. die Bewegungssteuerung stört.',
            'Ursache: beim idiopathischen Parkinson-Syndrom unbekannt; Risikofaktor Alter.',
            'Pathophysiologie: Untergang dopaminbildender Zellen in der Substantia nigra → Dopaminmangel in den Basalganglien, Acetylcholin überwiegt relativ → gestörte Bewegungssteuerung; Symptome erst ab über 50 % Zellverlust.'
          ],
          checkliste: ['Definition mit „fortschreitend“ und „neurodegenerativ“', 'Ursache: idiopathisch = unbekannt', 'Substantia nigra, Dopaminmangel, Acetylcholin-Übergewicht', 'Folge für die Bewegungssteuerung erklärt'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Leitsymptome und Frühzeichen',
      gewicht: 2,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beschreibungen dem Leitsymptom zu.',
          zuordnung: {
            'Bradykinese/Akinese': ['Bewegungen sind verlangsamt und schwer zu starten'],
            'Rigor': ['zäher, ruckartiger Widerstand beim passiven Bewegen'],
            'Tremor': ['Zittern in Ruhe, schwächer bei gezielter Bewegung'],
            'posturale Instabilität': ['Gleichgewichtsverluste werden nicht ausgeglichen']
          } },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle **Frühzeichen** von Parkinson an.',
          richtig: ['Riechstörung', 'REM-Schlaf-Verhaltensstörung', 'Obstipation'],
          falsch: ['akinetische Krise', 'Demenz', 'Sturz nach hinten'] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle **nichtmotorischen** Symptome an.',
          richtig: ['vermehrtes Schwitzen', 'depressive Verstimmung', 'Blasenstörung mit Harndrang'],
          falsch: ['Ruhetremor', 'Freezing', 'Zahnradphänomen'] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage „Herr Lenz hat kaum Mimik und antwortet langsam – er ist bestimmt dement.“?',
          antworten: [
            'falsch – Hypomimie und Bradyphrenie sind kein Intelligenzverlust',
            'richtig – fehlende Mimik ist ein sicheres Zeichen einer Demenz',
            'richtig – langsames Antworten beweist kognitive Einschränkungen',
            'falsch – bei Parkinson tritt grundsätzlich nie eine Demenz auf'
          ] },
        { typ: 'auswahl',
          frage: 'Frau Kern zittert mit der Hand, wenn sie im Schoß liegt. Was passiert beim Greifen nach der Tasse?',
          antworten: [
            'Das Zittern wird meist schwächer.',
            'Das Zittern wird immer sofort stärker.',
            'Die Hand wird plötzlich völlig schlaff.',
            'Die Hand verkrampft sich zu einer Faust.'
          ],
          erklaerung: 'Typisch für den Parkinson-Tremor: Ruhetremor, der bei gezielten Bewegungen abnimmt.' },
        { typ: 'auswahl',
          frage: 'Welche Beobachtung beschreibt den **Rigor**?',
          antworten: [
            'zäher, ruckartiger Widerstand beim Beugen des Arms',
            'schlaffe Muskulatur ohne Widerstand beim Bewegen',
            'plötzliches Einschießen von Überbewegungen der Arme',
            'Zittern der Hand, das in Ruhe ganz verschwindet'
          ] },
        { typ: 'richtigfalsch',
          aussage: 'Die posturale Instabilität tritt meist schon ganz zu Beginn der Erkrankung auf.',
          richtig: false,
          erklaerung: 'Sie tritt meist erst im Verlauf auf – dann steigt das Sturzrisiko stark.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeprozess: PESR und Pflegeziele',
      gewicht: 3,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Pflegeproblem „beeinträchtigte Gehfähigkeit“: Ordnen Sie die Informationen den PESR-Bausteinen zu.',
          zuordnung: {
            'E – Einflussfaktor': ['Bradykinese und Rigor', 'Off-Phase vor der nächsten Tablette'],
            'S – Symptom': ['kleine, schlurfende Schritte', 'Freezing an der Schlafzimmertür'],
            'R – Ressource': ['nutzt den Rollator zuverlässig', 'kennt Strategien aus der Physiotherapie']
          } },
        { typ: 'zuordnen',
          frage: 'Pflegeproblem „beeinträchtigtes Schlucken“: Ordnen Sie die Informationen den PESR-Bausteinen zu.',
          zuordnung: {
            'E – Einflussfaktor': ['Rigor und Akinese der Schluckmuskulatur'],
            'S – Symptom': ['hustet beim Trinken von Wasser', 'Speichel läuft aus dem Mundwinkel'],
            'R – Ressource': ['geistig klar, setzt Anleitung um', 'Logopädie ist verordnet']
          } },
        { typ: 'auswahl',
          frage: 'Welches Pflegeziel ist **überprüfbar** formuliert?',
          antworten: [
            'Herr Lenz trinkt ab sofort täglich mindestens 1,5 Liter (Trinkprotokoll).',
            'Herr Lenz soll mehr trinken, damit er weniger Verstopfung hat.',
            'Die Pflegefachperson bietet Herrn Lenz regelmäßig Getränke an.',
            'Herr Lenz erhält einen Trinkplan und einen Becher mit Griffen.'
          ] },
        { typ: 'auswahl',
          frage: 'Sturzgefahr ist ein **Risiko**-Pflegeproblem. Was nennen Sie statt der Symptome (S)?',
          antworten: [
            'Risikofaktoren',
            'die Pflegeziele',
            'die Interventionen',
            'die Evaluation'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Merkmale eines **überprüfbaren** Pflegeziels an.',
          richtig: ['aus Sicht des Pflegeempfängers formuliert', 'beobachtbar oder messbar', 'mit Zeitangabe'],
          falsch: ['beschreibt, was die Pflegefachperson tut', 'als Wunsch mit „soll“ formuliert'] },
        { typ: 'zahl',
          frage: 'Frau Ott wiegt 52 kg und ist 1,65 m groß. Berechnen Sie ihren BMI (eine Nachkommastelle).',
          loesung: 19.1, toleranz: 0.1, einheit: 'kg/m²',
          erklaerung: '52 : (1,65 × 1,65) = 52 : 2,7225 = 19,1 kg/m² – bei über 70-Jährigen zusammen mit Gewichtsverlust ein Hinweis auf Mangelernährung.' },
        { typ: 'reihenfolge',
          frage: 'Bringen Sie die Schritte des Pflegeprozesses in die Reihenfolge, die in Prüfungsaufgaben verlangt wird.',
          schritte: [
            'Informationen aus dem Fall sammeln',
            'Pflegeprobleme und Ressourcen (PESR) formulieren',
            'überprüfbare Pflegeziele festlegen',
            'Pflegeinterventionen planen und begründen',
            'Wirksamkeit evaluieren'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Erläutern Sie ein Pflegeproblem im PESR-Schema.',
          fall: 'Herr Lenz verschluckt sich bei Suppe und Wasser und hustet. Speichel läuft aus dem Mundwinkel, das Mittagessen dauert 45 Minuten. Er ist geistig klar; Logopädie ist verordnet.',
          muster: [
            'P: beeinträchtigtes Schlucken mit Aspirationsgefahr',
            'E: Rigor und Akinese der Schluckmuskulatur, dünnflüssige Kost',
            'S: Verschlucken und Husten bei Suppe und Wasser, Speichelfluss, Essensdauer 45 Minuten',
            'R: geistig klar, kann Anleitung umsetzen, Logopädie verordnet'
          ],
          checkliste: ['alle vier Bausteine', 'E erklärt die Ursache', 'S mit konkreter Beobachtung', 'mindestens eine Ressource'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeinterventionen entwickeln und begründen',
      gewicht: 3,
      fragen: [
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle passenden Interventionen bei **Freezing** an.',
          richtig: ['Bodenmarkierung zum Übersteigen', 'Schritte laut mitzählen lassen', 'erst auf der Stelle treten, dann großer Schritt'],
          falsch: ['am Arm ziehen, damit er weitergeht', 'zur Eile auffordern'] },
        { typ: 'auswahl',
          frage: 'Herr Lenz verschluckt sich bei Suppe. Welche Intervention ist am besten begründet?',
          antworten: [
            'aufrecht sitzen, Kinn leicht zur Brust, Suppe nach logopädischer Empfehlung andicken',
            'im Liegen essen lassen, damit er sich beim Schlucken nicht anstrengen muss',
            'Suppe besonders schnell anreichen, damit die Mahlzeit nicht zu lange dauert',
            'Getränke nur noch mit einem großen Becher reichen, damit er mehr trinkt'
          ] },
        { typ: 'auswahl',
          frage: 'Wie soll sich Herr Lenz am besten **umdrehen**?',
          antworten: [
            'in einem großen Bogen gehen',
            'schnell auf der Stelle drehen',
            'sich mit Schwung herumwerfen',
            'rückwärts zurückgehen'
          ],
          erklaerung: 'Drehen auf der Stelle löst Freezing und Stürze aus; ein großer Bogen ist sicherer.' },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Maßnahmen an, die das **Sturzrisiko** in der Wohnung senken.',
          richtig: ['lose Teppiche entfernen', 'Nachtlicht im Flur', 'Haltegriffe im Bad'],
          falsch: ['offene Hausschuhe', 'Kabel quer durch das Zimmer'] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Interventionen dem Pflegeproblem zu.',
          zuordnung: {
            'Freezing': ['Rhythmus vorgeben („eins – zwei“)', 'Klebemarkierung am Boden'],
            'beeinträchtigtes Schlucken': ['Getränke andicken', 'Kinn zur Brust, kleine Bissen'],
            'Obstipation': ['ballaststoffreiche Kost', 'feste Toilettenzeit nach dem Frühstück']
          } },
        { typ: 'auswahl',
          frage: 'Das Waschen dauert bei Herrn Lenz sehr lange. Was ist fachgerecht?',
          antworten: [
            'Zeit lassen und nur dort unterstützen, wo es nötig ist',
            'die Körperpflege komplett übernehmen, damit es schneller geht',
            'ihn zur Eile auffordern, damit er im Zeitplan bleibt',
            'die Körperpflege auf die Zeit vor der ersten Tablette legen'
          ],
          erklaerung: 'Aktivierende Pflege erhält die Selbstständigkeit; Zeitdruck verstärkt die Symptome. Anstrengendes gehört in die On-Phase.' },
        { typ: 'auswahl',
          frage: 'Wann planen Sie Gehtraining und Körperpflege bei Herrn Lenz am besten?',
          antworten: [
            'wenn die Tabletten gut wirken (On-Phase)',
            'kurz bevor die nächste Tablette fällig ist',
            'immer direkt nach dem Aufwachen am Morgen',
            'wenn er besonders steif ist, zum Training'
          ] },
        { typ: 'reihenfolge',
          frage: 'Herr Lenz bleibt an der Tür stehen (Freezing). Bringen Sie Ihr Vorgehen in eine sinnvolle Reihenfolge.',
          schritte: [
            'stehen bleiben lassen, nicht ziehen',
            'ruhig ansprechen',
            'Rhythmus vorgeben und auf der Stelle treten lassen',
            'mit einem großen Schritt über die Markierung gehen'
          ] },
        { typ: 'richtigfalsch',
          aussage: 'Damit das Wasser besser hinunterläuft, soll Herr Lenz beim Trinken den Kopf in den Nacken legen.',
          richtig: false,
          erklaerung: 'Mit dem Kopf im Nacken sind die Atemwege offen – Aspirationsgefahr. Richtig: Kinn leicht zur Brust.' }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Entwickeln Sie zu „beeinträchtigtes Schlucken“ zwei Pflegeinterventionen und begründen Sie diese.',
          fall: 'Frau Haas (74 J., Parkinson) verschluckt sich beim Trinken und bei Suppe. Sie isst langsam und wird beim Essen oft gedrängt.',
          muster: [
            'aufrecht sitzen, Kinn leicht zur Brust, kleine Bissen und Schlucke → schützt die Atemwege vor Aspiration',
            'in Ruhe und ohne Zeitdruck in der On-Phase essen lassen → Stress verstärkt Rigor und Akinese; in der On-Phase schluckt sie besser',
            'Getränke und Suppe nach logopädischer Empfehlung andicken → Dünnflüssiges fließt schnell und wird leicht aspiriert'
          ],
          checkliste: ['zwei konkrete Interventionen (wer, was, wie)', 'jede mit „weil/damit …“ begründet', 'Bezug zum Fall (Verschlucken, Zeitdruck)'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Akinetische Krise: erkennen und handeln',
      gewicht: 2,
      fragen: [
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle möglichen **Auslöser** einer akinetischen Krise an.',
          richtig: ['Parkinson-Tabletten wegen Nüchternheit weggelassen', 'Lungenentzündung mit Fieber', 'Flüssigkeitsmangel'],
          falsch: ['pünktliche Einnahme aller Tabletten', 'tägliche Physiotherapie'] },
        { typ: 'zuordnen',
          frage: 'Akinetische Krise: Was tun Sie?',
          zuordnung: {
            'sofort selbstständig': ['Ärztin informieren', 'Vitalzeichen überwachen', 'Oberkörper hoch, Speichel absaugen'],
            'nach ärztlicher Anordnung': ['Infusion anlegen', 'Medikamente über Magensonde geben'],
            'nicht tun': ['Wasser zum Trinken reichen', 'Tabletten im Joghurt eingeben']
          } },
        { typ: 'auswahl',
          frage: 'Welche Komplikation droht bei einer akinetischen Krise mit Schluckunfähigkeit besonders?',
          antworten: ['Aspirationspneumonie', 'Hypoglykämie', 'Harninkontinenz', 'allergische Reaktion'] },
        { typ: 'zeile',
          frage: 'Tippen Sie alle Zeilen an, die auf eine **akinetische Krise** hinweisen.',
          zeilen: [
            'Herr Lenz wurde gestern an der Hüfte operiert.',
            'Er liegt völlig steif im Bett und kann sich nicht drehen.',
            'Seine Frau hat ihm frische Wäsche gebracht.',
            'Er verschluckt sich am Tee und spricht kaum.',
            'Temperatur 38,9 °C, Puls 116/min, er schwitzt stark.'
          ],
          richtig: [2, 4, 5],
          erklaerung: 'Akinese und Rigor (Z. 2), Schluck- und Sprechstörung (Z. 4), Fieber, Herzrasen, Schwitzen (Z. 5).' },
        { typ: 'auswahl',
          frage: 'Warum geben Sie bei einer akinetischen Krise **nichts über den Mund**?',
          antworten: [
            'weil der Betroffene nicht sicher schlucken kann',
            'weil Essen und Trinken die Steifigkeit verstärken',
            'weil der Betroffene vor einer OP nüchtern sein muss',
            'weil Flüssigkeit das Fieber weiter ansteigen lässt'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle **Komplikationen** der akinetischen Krise an.',
          richtig: ['Aspirationspneumonie', 'Exsikkose', 'Thrombose', 'Dekubitus'],
          falsch: ['Unterzuckerung', 'Bluthochdruckkrise durch Bewegung'] },
        { typ: 'auswahl',
          frage: 'Fieber, starkes Schwitzen, wenig Urin: Welche Maßnahme ist jetzt besonders wichtig?',
          antworten: [
            'Ein- und Ausfuhr bilanzieren',
            'einen großen Becher Tee reichen',
            'die Bettdecke dicker wählen',
            'bis zur nächsten Visite warten'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Begründen Sie anhand von vier Beobachtungen, dass eine akinetische Krise vorliegt.',
          fall: 'Herr Lenz liegt am Morgen nach der Hüft-OP völlig steif im Bett, spricht kaum und verschluckt sich am Tee. Er schwitzt stark. Temperatur 38,9 °C, Puls 116/min.',
          muster: [
            'völlige Unbeweglichkeit und Steifigkeit (Akinese, Rigor)',
            'Sprech- und Schluckstörung – Aspirationsgefahr',
            'Fieber 38,9 °C und Herzrasen (Puls 116/min)',
            'starkes Schwitzen – vegetative Entgleisung'
          ],
          checkliste: ['vier Beobachtungen aus dem Fall', 'jeweils fachlich eingeordnet', 'Hinweis auf Lebensgefahr/Notfall'] },
        { typ: 'schreiben',
          frage: 'Beschreiben Sie drei pflegerische Sofortmaßnahmen bei einer akinetischen Krise und begründen Sie diese.',
          muster: [
            'Ärztin sofort informieren → lebensbedrohlicher Notfall, ärztliche Therapie nötig',
            'Oberkörper hoch, Speichel absaugen, nichts über den Mund → Aspirationsgefahr durch Schluckunfähigkeit',
            'Vitalzeichen, Bewusstsein, SpO₂ überwachen; Ein- und Ausfuhr bilanzieren → Verschlechterung und Exsikkose früh erkennen'
          ],
          checkliste: ['drei Maßnahmen, die Pflegefachpersonen selbstständig durchführen', 'jede Maßnahme begründet', 'keine Medikamentengabe ohne Anordnung'] }
      ]
    }
  ]
};
