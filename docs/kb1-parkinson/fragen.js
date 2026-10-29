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
      gewicht: 1,
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
          } }
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
      gewicht: 3,
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
            'Die Symptome werden durch Neuroleptika ausgelöst.',
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
        { typ: 'auswahl',
          frage: 'Welche Untersuchung stützt die Diagnose, indem sich die Symptome nach einer Medikamentengabe bessern?',
          antworten: ['L-Dopa-Test', 'Lumbalpunktion', 'Schellong-Test', 'Elektrokardiogramm'] }
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
      titel: 'Leitsymptome, Frühzeichen, Verlauf und Auswirkungen',
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
          falsch: ['Dyskinesien', 'akinetische Krise', 'Demenz'] },
        { typ: 'auswahl',
          frage: 'Herr Lenz: beide Körperseiten betroffen, Sturz nach hinten, zieht sich aber noch allein an. Welches Stadium nach Hoehn und Yahr passt?',
          antworten: ['Stadium 3', 'Stadium 1', 'Stadium 5', 'Stadium 2'],
          erklaerung: 'Beidseitig + posturale Instabilität, im Alltag noch weitgehend selbstständig = Stadium 3.' },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Auswirkungen bei Herrn Lenz zu.',
          zuordnung: {
            'physisch': ['Platzwunde nach Sturz', 'Gewichtsverlust'],
            'psychisch': ['schämt sich für sein Zittern', 'Angst vor dem nächsten Sturz'],
            'sozial': ['geht nicht mehr zum Stammtisch', 'Ehefrau übernimmt seine Aufgaben']
          } },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage „Herr Lenz hat kaum Mimik und antwortet langsam – er ist bestimmt dement.“?',
          antworten: [
            'falsch – Hypomimie und Bradyphrenie sind kein Intelligenzverlust',
            'richtig – fehlende Mimik ist ein sicheres Zeichen einer Demenz',
            'richtig – langsames Antworten beweist kognitive Einschränkungen',
            'falsch – bei Parkinson tritt grundsätzlich nie eine Demenz auf'
          ] },
        { typ: 'richtigfalsch',
          aussage: 'Die posturale Instabilität tritt meist schon ganz zu Beginn der Erkrankung auf.',
          richtig: false,
          erklaerung: 'Sie tritt meist erst im Verlauf auf (ab Stadium 3 nach Hoehn und Yahr).' }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Leiten Sie aus der Fallsituation je eine physische, psychische und soziale Auswirkung der Erkrankung ab.',
          fall: 'Frau Ott (68 J.) hat Parkinson. Sie ist zweimal gestürzt, traut sich kaum noch aus dem Haus und hat ihre Tätigkeit im Kirchenchor aufgegeben.',
          muster: [
            'physisch: Stürze mit Verletzungsgefahr',
            'psychisch: Sturzangst, Unsicherheit („traut sich kaum aus dem Haus“)',
            'sozial: Rückzug, Verlust der Teilhabe (Kirchenchor aufgegeben)'
          ],
          checkliste: ['jede Dimension genau einmal', 'jede Auswirkung mit Beleg aus dem Fall'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Medikamente und Wirkungsschwankungen',
      gewicht: 3,
      fragen: [
        { typ: 'auswahl',
          frage: 'Wann sollte L-Dopa eingenommen werden?',
          antworten: [
            '30 Minuten vor oder 60–90 Minuten nach einer Mahlzeit, mit Wasser',
            'immer direkt zu einer eiweißreichen Mahlzeit, damit es besser wirkt',
            'mit einem Glas Milch, um den Magen vor der Tablette zu schützen',
            'nur bei Bedarf, wenn Herr Lenz sich besonders steif fühlt'
          ] },
        { typ: 'auswahl',
          frage: 'Warum wird L-Dopa mit einem **Decarboxylasehemmer** kombiniert?',
          antworten: [
            'damit L-Dopa erst im Gehirn zu Dopamin umgewandelt wird',
            'damit L-Dopa schneller über die Nieren ausgeschieden wird',
            'damit Dopamin direkt die Blut-Hirn-Schranke überwinden kann',
            'damit die Wirkung von Acetylcholin im Gehirn verstärkt wird'
          ] },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beobachtungen zu.',
          zuordnung: {
            'On': ['geht eine Stunde nach der Tablette flüssig ins Bad'],
            'Off': ['wird kurz vor der nächsten Tablette steif', 'kommt morgens vor der ersten Tablette kaum aus dem Bett'],
            'Dyskinesie': ['Arme und Beine machen unwillkürliche, schlenkernde Bewegungen']
          } },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle typischen Nebenwirkungen von **Dopaminagonisten** an.',
          richtig: ['plötzliches Einschlafen', 'Kauf- oder Spielsucht', 'Halluzinationen'],
          falsch: ['Unterzuckerung', 'Haarausfall'] },
        { typ: 'auswahl',
          frage: 'Herrn Lenz ist nach der OP übel. Welches Medikament ist bei Parkinson eher geeignet?',
          antworten: ['Domperidon', 'Metoclopramid (MCP)', 'Haloperidol', 'Ondansetron plus Haloperidol'],
          erklaerung: 'MCP und Haloperidol blockieren Dopamin-Rezeptoren im Gehirn. Domperidon wirkt kaum im Gehirn.' },
        { typ: 'auswahl',
          frage: 'Was bedeutet **Wearing-off**?',
          antworten: [
            'Die Wirkung lässt vorhersehbar vor der nächsten Dosis nach.',
            'Die Wirkung setzt plötzlich und ohne erkennbaren Grund aus.',
            'Bei hohem Wirkspiegel kommt es zu unwillkürlichen Bewegungen.',
            'Das Medikament wirkt nur, wenn es mit Milch eingenommen wird.'
          ] },
        { typ: 'auswahl',
          frage: 'Die Urinfarbe von Herrn Kühn ist rotbraun, seit er zusätzlich Entacapon erhält. Wie reagieren Sie?',
          antworten: [
            'Ich informiere ihn, dass das harmlos ist, und dokumentiere es.',
            'Ich setze Entacapon sofort selbstständig ab und informiere niemanden.',
            'Ich halte es für eine Blutung und lege sofort einen Blasenkatheter.',
            'Ich reduziere eigenständig die L-Dopa-Dosis, bis der Urin hell ist.'
          ] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Beurteilen Sie die Medikamentengabe und leiten Sie zwei Regeln für die Einnahme von L-Dopa ab.',
          fall: 'Frau Klein soll L-Dopa um 7 Uhr erhalten. Sie bekommt es um 8:30 Uhr mit dem Frühstück (Quark, Käsebrot, Milchkaffee). Um 9:30 Uhr ist sie sehr steif.',
          muster: [
            'Die Tablette kommt 1,5 Stunden zu spät und mit einer eiweißreichen Mahlzeit → Aufnahme verzögert und vermindert → Off-Phase.',
            'Regel 1: pünktlich nach individuellem Einnahmeplan geben.',
            'Regel 2: 30 Minuten vor oder 60–90 Minuten nach dem Essen, mit Wasser.'
          ],
          checkliste: ['Verspätung erkannt', 'Eiweiß als Problem begründet', 'Folge: Off-Phase', 'zwei klare Regeln'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Akinetische Krise und ärztliche Anordnung',
      gewicht: 2,
      fragen: [
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle möglichen **Auslöser** einer akinetischen Krise an.',
          richtig: ['L-Dopa wegen Nüchternheit weggelassen', 'Lungenentzündung mit Fieber', 'Gabe von Haloperidol'],
          falsch: ['pünktliche Einnahme aller Tabletten', 'tägliche Physiotherapie'] },
        { typ: 'zuordnen',
          frage: 'Akinetische Krise: Wer ist zuständig?',
          zuordnung: {
            'sofort selbstständig': ['Ärztin informieren', 'Vitalzeichen überwachen', 'Oberkörper hoch, Speichel absaugen'],
            'nach ärztlicher Anordnung': ['Amantadin-Infusion', 'L-Dopa über Magensonde'],
            'nicht tun': ['Wasser zum Trinken reichen', 'Haloperidol gegen Unruhe geben']
          } },
        { typ: 'auswahl',
          frage: 'Welche Komplikation droht bei einer akinetischen Krise mit Schluckunfähigkeit besonders?',
          antworten: ['Aspirationspneumonie', 'Hypoglykämie', 'Harninkontinenz', 'allergische Reaktion'] },
        { typ: 'auswahl',
          frage: 'Ein Arzt ordnet bei einem Parkinson-Patienten Haloperidol an. Was ist richtig?',
          antworten: [
            'Bedenken äußern und die Anordnung klären, bevor ich das Mittel gebe',
            'sofort geben, denn die Verantwortung trägt allein der anordnende Arzt',
            'die halbe Dosis geben, damit das Risiko für den Patienten kleiner ist',
            'das Medikament heimlich durch ein anderes Neuroleptikum ersetzen'
          ],
          erklaerung: 'Die Pflegefachperson trägt die Durchführungsverantwortung: Sie prüft die Anordnung und äußert Bedenken (Remonstration).' },
        { typ: 'reihenfolge',
          frage: 'Telefonische Anordnung im Ausnahmefall: Bringen Sie die Schritte in die richtige Reihenfolge.',
          schritte: [
            'Anordnung genau anhören',
            'Anordnung laut wiederholen und bestätigen lassen',
            'Anordnung mit Uhrzeit und Namen dokumentieren',
            'Ärztin zeichnet die Anordnung so bald wie möglich gegen'
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
          checkliste: ['vier Beobachtungen aus dem Fall', 'jeweils fachlich eingeordnet', 'Hinweis auf Lebensgefahr/Notfall'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeprozess: PESR, Pflegeziele, Interventionen',
      gewicht: 3,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Pflegeproblem „beeinträchtigte Gehfähigkeit“: Ordnen Sie die Informationen den PESR-Bausteinen zu.',
          zuordnung: {
            'E – Einflussfaktor': ['Bradykinese und Rigor', 'Off-Phase vor der nächsten Tablette'],
            'S – Symptom': ['kleine, schlurfende Schritte', 'Freezing an der Schlafzimmertür'],
            'R – Ressource': ['nutzt den Rollator zuverlässig', 'kennt Strategien aus der Reha']
          } },
        { typ: 'auswahl',
          frage: 'Welches Pflegeziel ist **überprüfbar** formuliert?',
          antworten: [
            'Herr Lenz trinkt ab sofort täglich mindestens 1,5 Liter (Trinkprotokoll).',
            'Herr Lenz soll mehr trinken, damit er weniger Verstopfung hat.',
            'Die Pflegefachperson bietet Herrn Lenz regelmäßig Getränke an.',
            'Herr Lenz erhält einen Trinkplan und einen Becher mit Griffen.'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle passenden Interventionen bei **Freezing** an.',
          richtig: ['Bodenmarkierung zum Übersteigen', 'Schritte laut mitzählen lassen', 'erst auf der Stelle treten, dann großer Schritt'],
          falsch: ['am Arm ziehen, damit er weitergeht', 'zur Eile auffordern'] },
        { typ: 'zahl',
          frage: 'Herr Lenz wiegt 66 kg und ist 1,80 m groß. Berechnen Sie seinen BMI (eine Nachkommastelle).',
          loesung: 20.4, toleranz: 0.1, einheit: 'kg/m²',
          erklaerung: '66 : (1,80 × 1,80) = 66 : 3,24 = 20,4 kg/m² – bei über 70-Jährigen zusammen mit Gewichtsverlust ein Hinweis auf Mangelernährung.' },
        { typ: 'reihenfolge',
          frage: 'Bringen Sie die Schritte des Pflegeprozesses in die Reihenfolge, die in Prüfungsaufgaben verlangt wird.',
          schritte: [
            'Informationen aus dem Fall sammeln',
            'Pflegeprobleme und Ressourcen (PESR) formulieren',
            'überprüfbare Pflegeziele festlegen',
            'Pflegeinterventionen planen und begründen',
            'Wirksamkeit evaluieren'
          ] },
        { typ: 'auswahl',
          frage: 'Herr Lenz verschluckt sich bei Suppe. Welche Intervention ist am besten begründet?',
          antworten: [
            'aufrecht sitzen, Kopf leicht nach vorn, Suppe nach logopädischer Empfehlung andicken',
            'im Liegen essen lassen, damit er sich beim Schlucken nicht anstrengen muss',
            'Suppe besonders schnell anreichen, damit die Mahlzeit nicht zu lange dauert',
            'Getränke nur noch mit einem großen Becher reichen, damit er mehr trinkt'
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
      titel: 'Rehabilitation, Team und Assistenzsysteme',
      gewicht: 0,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Maßnahmen dem Rehabilitationsziel zu.',
          zuordnung: {
            'Restitution': ['Gehtraining nach Hüft-OP bis zur alten Gehstrecke'],
            'Kompensation': ['Anti-Freezing-Stock', 'Besteck mit Griffverdickung'],
            'Adaption': ['Teppiche entfernen', 'Termine in die On-Phase legen']
          } },
        { typ: 'zuordnen',
          frage: 'Welche Berufsgruppe übernimmt die Aufgabe hauptsächlich?',
          zuordnung: {
            'Physiotherapie': ['Gang- und Gleichgewichtstraining'],
            'Ergotherapie': ['Wohnraumberatung und Hilfsmittel für den Alltag'],
            'Logopädie': ['Schluck- und Stimmtraining'],
            'Sozialdienst': ['Beratung zu Leistungen und Anträgen']
          } },
        { typ: 'auswahl',
          frage: 'Welches technische Assistenzsystem hilft Herrn Lenz, wenn er allein in der Werkstatt stürzt?',
          antworten: ['Hausnotruf mit Sturzerkennung', 'Besteck mit verdickten Griffen', 'Teller mit erhöhtem Rand', 'elektrische Zahnbürste'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Kommunikation, Angehörige und Ethik',
      gewicht: 1,
      fragen: [
        { typ: 'auswahl',
          frage: 'Frau Kühn sagt: „Er schaut mich mit diesem leeren Gesicht an – ihm ist alles egal.“ Wie reagieren Sie?',
          antworten: [
            'Ich erkläre die Hypomimie und ermutige sie, nachzufragen.',
            'Ich bestätige ihr, dass ihr Mann wohl kein Interesse mehr hat.',
            'Ich rate ihr, solche Themen besser gar nicht mehr anzusprechen.',
            'Ich empfehle ihr, auf seine Mimik als einziges Zeichen zu achten.'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle förderlichen Verhaltensweisen im Gespräch mit Herrn Lenz an.',
          richtig: ['eine Frage nach der anderen stellen', 'Pausen aushalten', 'Gespräch in die On-Phase legen'],
          falsch: ['Sätze für ihn zu Ende sprechen', 'die Ehefrau für ihn antworten lassen'] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Angebote an, die pflegende Angehörige entlasten.',
          richtig: ['Verhinderungspflege', 'Tagespflege', 'Pflegekurs für Angehörige', 'Selbsthilfegruppe'],
          falsch: ['Parkinson-Tagebuch', 'L-Dopa-Test'] },
        { typ: 'auswahl',
          frage: 'Herr Lenz will allein in die Werkstatt, seine Frau will es verbieten. Welche Lösung verbindet Autonomie und Fürsorge am besten?',
          antworten: [
            'Risiko senken: Werkstatt nur in On-Phasen, Hausnotruf, zweiter Handlauf',
            'Die Werkstatt dauerhaft abschließen, damit er nicht mehr stürzen kann',
            'Herrn Lenz ohne Absprache alles erlauben, auch die Arbeit an der Kreissäge',
            'Die Entscheidung allein dem Pflegedienst überlassen, ohne Herrn Lenz'
          ] },
        { typ: 'richtigfalsch',
          aussage: 'Bei Parkinson ist die Intelligenz trotz starrer Mimik und langsamer Sprache meist erhalten.',
          richtig: true,
          erklaerung: 'Hypomimie und Bradyphrenie sind kein Intelligenzverlust – erst im Spätstadium kann eine Demenz hinzukommen.' }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Erläutern Sie eine Kommunikationsbarriere und beschreiben Sie zwei Maßnahmen, um sie zu überbrücken.',
          fall: 'Herr Lenz spricht so leise, dass seine Frau oft nachfragen muss. Dann winkt er ab und schweigt.',
          muster: [
            'Barriere: Hypophonie – die Stimme ist durch die Parkinson-Erkrankung leise und monoton; ständiges Nachfragen frustriert, Herr Lenz zieht sich aus Gesprächen zurück.',
            'Maßnahme 1: ruhige Umgebung (Radio aus), Blickkontakt, Zeit lassen, Gespräche in der On-Phase.',
            'Maßnahme 2: Logopädie (Stimmtraining), ggf. Sprachverstärker; Frau Lenz anleiten.'
          ],
          checkliste: ['Barriere mit Fachbegriff', 'Folge im Fall erklärt', 'zwei konkrete Maßnahmen'] }
      ]
    }
  ]
};
