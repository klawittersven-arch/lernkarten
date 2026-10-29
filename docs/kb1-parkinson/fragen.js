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
      titel: 'Krankheitsbild: Definition, Formen, Pathophysiologie',
      gewicht: 0,
      fragen: [
        { typ: 'auswahl',
          frage: 'Welche Aussage beschreibt die **Pathophysiologie** von Parkinson richtig?',
          antworten: [
            'Dopaminbildende Zellen der Substantia nigra gehen zugrunde; Acetylcholin überwiegt relativ.',
            'Acetylcholinbildende Zellen im Kleinhirn gehen zugrunde; Dopamin überwiegt dadurch relativ.',
            'Entzündungsherde zerstören die Markscheiden im Rückenmark und stören so die Bewegungen.',
            'Ein Gefäßverschluss im Mittelhirn unterbricht plötzlich die Versorgung der Basalganglien.'
          ],
          erklaerung: 'Untergang dopaminbildender Neurone in der Substantia nigra → Dopaminmangel, Acetylcholin relativ zu viel.' },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beschreibungen der Form des Parkinson-Syndroms zu.',
          zuordnung: {
            'idiopathisch': ['Ursache des Zellsterbens unklar (Morbus Parkinson)'],
            'symptomatisch (sekundär)': ['ausgelöst z. B. durch Neuroleptika oder eine Vergiftung'],
            'atypisch': ['im Rahmen anderer neurodegenerativer Erkrankungen']
          } },
        { typ: 'auswahl',
          frage: 'Wo liegt die **Substantia nigra**?',
          antworten: ['im Mittelhirn', 'im Kleinhirn', 'im Rückenmark', 'in der Großhirnrinde'] },
        { typ: 'auswahl',
          frage: 'Welcher Neurotransmitter fehlt bei Parkinson?',
          antworten: ['Dopamin', 'Serotonin', 'Acetylcholin', 'GABA'] },
        { typ: 'reihenfolge',
          frage: 'Bringen Sie die Pathophysiologie in die richtige Reihenfolge.',
          schritte: [
            'Dopaminbildende Zellen in der Substantia nigra gehen zugrunde.',
            'Es entsteht ein Dopaminmangel.',
            'Das Gleichgewicht zu Acetylcholin geht verloren.',
            'Bewegungen können nicht mehr fein gesteuert werden.'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Aussagen an, die zum **Parkinson-Syndrom** passen.',
          richtig: ['stört die Bewegungssteuerung', 'fortschreitend', 'nicht heilbar'],
          falsch: ['ansteckend', 'heilt nach Jahren aus', 'betrifft vor allem Kinder'] },
        { typ: 'auswahl',
          frage: 'Ein Bewohner zeigt Parkinson-Symptome, seit er ein Neuroleptikum erhält. Welche Form liegt am ehesten vor?',
          antworten: ['symptomatisches Parkinson-Syndrom', 'idiopathisches Parkinson-Syndrom', 'atypisches Parkinson-Syndrom', 'angeborenes Parkinson-Syndrom'] }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Erläutern Sie das Krankheitsbild Parkinson mit Definition, Formen und Pathophysiologie.',
          muster: [
            'Definition: Krankheitsbild mit Störungen der Bewegungssteuerung – verlangsamte Bewegungen, häufig Muskelsteifigkeit und/oder Zittern; fortschreitend, nicht heilbar.',
            'Formen: idiopathisch (Ursache unklar), symptomatisch (bekannter Auslöser, z. B. Neuroleptika), atypisch (bei anderen neurodegenerativen Erkrankungen).',
            'Pathophysiologie: Untergang dopaminbildender Zellen in der Substantia nigra (Mittelhirn) → Dopaminmangel, Acetylcholin relativ zu viel → gestörte Bewegungssteuerung.'
          ],
          checkliste: ['Definition mit Bewegungssteuerung', 'drei Formen unterschieden', 'Substantia nigra, Dopaminmangel, Ungleichgewicht zu Acetylcholin', 'Folge für die Bewegungen erklärt'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Symptome erkennen und erläutern',
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
          erklaerung: 'Z. 2 Tremor · Z. 3 Rigor (Zahnradphänomen) · Z. 5 Brady-/Akinese (Starthemmung).' },
        { typ: 'zeile',
          frage: 'Tippen Sie alle Zeilen an, die ein **nichtmotorisches** Symptom beschreiben.',
          zeilen: [
            'Herr Vogt (66 J.) war Lehrer und ist seit einem Jahr in Rente.',
            'Er schwitzt stark, obwohl es im Zimmer kühl ist.',
            'Seine Arme schwingen beim Gehen nicht mit.',
            'Er ist oft niedergeschlagen und hat zu nichts Lust.',
            'Er hat nur alle vier bis fünf Tage Stuhlgang.',
            'Sein Gesicht wirkt starr und ausdruckslos.'
          ],
          richtig: [2, 4, 5],
          erklaerung: 'Nichtmotorisch: Schwitzen (Z. 2), depressive Stimmung (Z. 4), Obstipation (Z. 5). Z. 3 und Z. 6 sind motorisch.' },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beschreibungen dem Leitsymptom zu.',
          zuordnung: {
            'Brady-/Akinese': ['Starten und Beenden von Bewegungen ist erschwert'],
            'Rigor': ['Muskelsteife, Bewegungen fühlen sich widerständig an'],
            'Tremor': ['Zittern, häufig in Ruhe']
          } },
        { typ: 'zuordnen',
          frage: 'Ordnen Sie die Beobachtungen dem passenden Fachbegriff zu.',
          zuordnung: {
            'Freezing': ['bleibt an der Tür „wie festgeklebt“ stehen'],
            'Hypomimie': ['Gesicht wirkt starr, maskenhaft'],
            'Zahnradphänomen': ['ruckartiger Widerstand beim Beugen des Arms']
          } },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle **motorischen** Symptome an.',
          richtig: ['kleinschrittiger Gang', 'leise, monotone Stimme', 'gebeugte Körperhaltung'],
          falsch: ['Obstipation', 'vermehrtes Schwitzen', 'Blasenentleerungsstörung'] },
        { typ: 'auswahl',
          frage: 'Frau Kern ist aufgeregt, weil Besuch kommt. Was passiert meist mit ihrem Tremor?',
          antworten: ['Er wird stärker.', 'Er verschwindet.', 'Er wird schwächer.', 'Er bleibt sicher gleich.'] },
        { typ: 'auswahl',
          frage: 'Wie beurteilen Sie die Aussage „Herr Lenz hat kaum Mimik und antwortet langsam – er ist bestimmt dement.“?',
          antworten: [
            'falsch – eine starre Mimik und langsames Antworten sind Symptome, kein Intelligenzverlust',
            'richtig – fehlende Mimik ist bei Parkinson ein sicheres Zeichen einer beginnenden Demenz',
            'richtig – langsames Antworten beweist bei älteren Menschen immer kognitive Einschränkungen',
            'falsch – bei Parkinson können grundsätzlich niemals kognitive Veränderungen auftreten'
          ] },
        { typ: 'richtigfalsch',
          aussage: 'Der Parkinson-Tremor kann durch Festhalten oder eine gezielte Bewegung geringer werden.',
          richtig: true,
          erklaerung: 'Typisch ist ein Ruhetremor – bei gezielter Bewegung oder beim Festhalten nimmt er oft ab.' }
      ],
      schreiben: [
        { typ: 'schreiben',
          frage: 'Identifizieren Sie in der Fallsituation drei Parkinson-Symptome. Nennen Sie jeweils den Fachbegriff.',
          fall: 'Herr Bauer (73 J.) geht mit kleinen Schritten, seine Arme schwingen nicht mit. Beim Durchbewegen des Arms spürt man einen ruckartigen Widerstand. Seine linke Hand zittert beim Fernsehen.',
          muster: [
            'kleine Schritte, Arme schwingen nicht mit → Brady-/Akinese',
            'ruckartiger Widerstand → Rigor (Zahnradphänomen)',
            'Hand zittert in Ruhe → Tremor (Ruhetremor)'
          ],
          checkliste: ['drei Symptome mit Textbeleg', 'jeweils der richtige Fachbegriff', 'in der Klausur: Zeile angeben'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegerisches Handeln bei Parkinson',
      gewicht: 2,
      fragen: [
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle passenden Maßnahmen bei **Freezing** an.',
          richtig: ['Fuß oder Anti-Freezing-Stock als Hindernis', 'Kommando geben oder klatschen', 'Markierung zum Übersteigen'],
          falsch: ['am Arm ziehen, damit er weitergeht', 'zur Eile auffordern'] },
        { typ: 'auswahl',
          frage: 'Herr Meier möchte sein Brötchen selbst bestreichen, braucht aber mehrere Anläufe. Was ist angemessen?',
          antworten: [
            'Zeit geben und nur so viel helfen wie nötig',
            'das Bestreichen sofort selbst übernehmen',
            'ihn bitten, sich zu beeilen, weil andere warten',
            'ihm ab jetzt nur noch fertige Brote geben'
          ] },
        { typ: 'zuordnen',
          frage: 'Welches Problem gleicht das Hilfsmittel beim Essen aus?',
          zuordnung: {
            'Tremor': ['tremorkompensierender Löffel', 'Becher mit zwei Griffen'],
            'langsames Essen': ['Warmhalteteller'],
            'Rutschen des Tellers': ['Antirutschmatte']
          } },
        { typ: 'auswahl',
          frage: 'Warum sollen Menschen mit Parkinson **nah am Tisch** sitzen, Tisch oder Teller erhöht?',
          antworten: [
            'damit der Weg zum Mund möglichst kurz ist',
            'damit sie beim Essen nicht einschlafen',
            'damit andere Bewohner besser Platz haben',
            'damit sie weniger trinken müssen'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Gründe an, warum bei Parkinson auf **Flüssigkeit und Kalorien** geachtet werden muss.',
          richtig: ['starkes Schwitzen', 'Tremor und Rigor verbrauchen Energie', 'Schluckstörungen'],
          falsch: ['Parkinson senkt den Energiebedarf', 'Dopamin entzieht dem Körper Wasser'] },
        { typ: 'auswahl',
          frage: 'Warum ist ein sehr **weiches Bett** bei Parkinson ungünstig?',
          antworten: [
            'Es erschwert bei Bewegungsarmut zusätzlich das Drehen.',
            'Es verstärkt das Zittern in der Nacht deutlich.',
            'Es löst in der Nacht eine akinetische Krise aus.',
            'Es verhindert, dass er nachts schwitzt.'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Maßnahmen für eine **sichere Fortbewegung** an.',
          richtig: ['Stolperfallen entfernen', 'feste Stühle mit Seitenlehnen', 'Schuhe ohne Gummisohle'],
          falsch: ['offene Hausschuhe', 'eng anliegende Kleidung mit kleinen Knöpfen'] },
        { typ: 'auswahl',
          frage: 'Herr Meier möchte mit dem Rollator in den Aufenthaltsraum gehen. Die Pflegefachperson befürchtet einen Sturz. Was ist angemessen?',
          antworten: [
            'Sturzrisiko einschätzen und ihn sicher mit Rollator gehen lassen',
            'ihn zur Sicherheit immer im Rollstuhl in den Raum schieben',
            'ihm den Wunsch ausreden, damit er im Zimmer bleibt',
            'ihn allein gehen lassen, ohne auf Stolperfallen zu achten'
          ] },
        { typ: 'reihenfolge',
          frage: 'Herr Lenz bleibt an der Tür stehen (Freezing). Bringen Sie Ihr Vorgehen in eine sinnvolle Reihenfolge.',
          schritte: [
            'stehen bleiben lassen, nicht ziehen',
            'ruhig ansprechen',
            'äußeren Reiz geben (Kommando, Klatschen, Hindernis)',
            'mit einem großen Schritt weitergehen'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeprozess: PESR, Pflegeziele, Interventionen',
      gewicht: 3,
      fragen: [
        { typ: 'zuordnen',
          frage: 'Risiko-Pflegeproblem „Sturzgefahr“: Ordnen Sie die Informationen zu.',
          zuordnung: {
            'RF – Risikofaktor': ['Freezing an der Türschwelle', 'vor zwei Wochen gestürzt', 'lose Teppiche im Flur'],
            'R – Ressource': ['nutzt den Rollator', 'kennt das Mitzählen aus der Physiotherapie'],
            'anderes Problem': ['verschluckt sich bei Suppe']
          } },
        { typ: 'zuordnen',
          frage: 'Pflegeproblem „beeinträchtigtes Schlucken“: Ordnen Sie die Informationen den PESR-Bausteinen zu.',
          zuordnung: {
            'E – Einflussfaktor': ['Rigor und Akinese der Schluckmuskulatur'],
            'S – Symptom': ['hustet beim Trinken von Wasser', 'Speichel läuft aus dem Mundwinkel'],
            'R – Ressource': ['geistig klar, setzt Anleitung um', 'Logopädie ist verordnet']
          } },
        { typ: 'auswahl',
          frage: 'Sturzgefahr ist ein **Risiko**-Pflegeproblem. Was nennen Sie statt E und S?',
          antworten: ['Risikofaktoren', 'Pflegeziele', 'Interventionen', 'Evaluationskriterien'] },
        { typ: 'auswahl',
          frage: 'Welches Pflegeziel ist **überprüfbar** formuliert?',
          antworten: [
            'Herr Lenz trinkt ab sofort täglich mindestens 1,5 Liter (Trinkprotokoll).',
            'Herr Lenz soll mehr trinken, damit er weniger Probleme mit dem Stuhlgang hat.',
            'Die Pflegefachperson bietet Herrn Lenz über den Tag regelmäßig Getränke an.',
            'Herr Lenz erhält einen Trinkplan und einen Becher mit zwei großen Griffen.'
          ] },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle Merkmale eines **überprüfbaren** Pflegeziels an.',
          richtig: ['Pflegeempfänger ist Subjekt', 'beobachtbar oder messbar', 'mit Zeitangabe'],
          falsch: ['beschreibt, was die Pflegefachperson tut', 'als Wunsch mit „soll“ formuliert'] },
        { typ: 'auswahl',
          frage: 'Was ist am Ziel „Herr Lenz wird wieder gesund und geht bald ohne Rollator.“ falsch?',
          antworten: [
            'Es ist bei Parkinson nicht realistisch und hat keine Zeitangabe.',
            'Es ist zu kurz und beschreibt keine Maßnahme der Pflegefachperson.',
            'Es nennt Herrn Lenz als Subjekt, das ist in einem Pflegeziel nicht erlaubt.',
            'Es enthält ein Hilfsmittel, das in einem Pflegeziel nie genannt werden darf.'
          ] },
        { typ: 'auswahl',
          frage: 'Herr Lenz verschluckt sich bei Suppe. Welche Intervention ist am besten begründet?',
          antworten: [
            'aufrecht sitzen, Kinn leicht zur Brust, Suppe nach logopädischer Empfehlung andicken',
            'im Liegen essen lassen, damit er sich beim Schlucken nicht so sehr anstrengen muss',
            'die Suppe besonders schnell anreichen, damit die Mahlzeit nicht zu lange dauert',
            'Getränke nur noch in einem großen Becher reichen, damit er insgesamt mehr trinkt'
          ] },
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
          frage: 'Erläutern Sie das Risiko-Pflegeproblem „Sturzgefahr“ im PESR-Schema.',
          fall: 'Frau Haas (74 J., Parkinson) geht mit kleinen Schritten und bleibt an Türen oft stehen. Letzten Monat ist sie gestürzt. Nachts geht sie zweimal zur Toilette. Sie nutzt einen Rollator und möchte selbstständig bleiben.',
          muster: [
            'P: Sturzgefahr',
            'RF: kleinschrittiger Gang, Freezing an Türen, Sturz in der Vorgeschichte, nächtliche Toilettengänge',
            'R: nutzt Rollator, motiviert, möchte selbstständig bleiben'
          ],
          checkliste: ['Problem als Risiko benannt', 'Risikofaktoren statt Symptome', 'mindestens drei Risikofaktoren aus dem Fall', 'mindestens eine Ressource'] },
        { typ: 'schreiben',
          frage: 'Formulieren Sie zu „beeinträchtigtes Schlucken“ ein überprüfbares Pflegeziel. Entwickeln Sie zwei Interventionen und begründen Sie diese.',
          muster: [
            'Ziel: „Herr Lenz isst und trinkt ab sofort bei jeder Mahlzeit, ohne sich zu verschlucken.“',
            'aufrecht und nah am Tisch sitzen, Kinn zur Brust → schützt die Atemwege, kurzer Weg zum Mund',
            'Getränke nach logopädischer Empfehlung andicken, kleine Bissen, Zeit lassen → Dünnflüssiges wird leicht aspiriert, Zeitdruck verstärkt die Symptome'
          ],
          checkliste: ['Ziel: Subjekt, beobachtbar, Zeitangabe', 'zwei konkrete Interventionen', 'jede mit „weil/damit …“ begründet'] }
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
          frage: 'Welche Komplikation droht bei einer akinetischen Krise mit Schluckunfähigkeit besonders?',
          antworten: ['Aspirationspneumonie', 'Hypoglykämie', 'Harninkontinenz', 'allergische Reaktion'] },
        { typ: 'auswahl',
          frage: 'Warum geben Sie bei einer akinetischen Krise **nichts über den Mund**?',
          antworten: [
            'weil er nicht sicher schlucken kann',
            'weil Trinken die Steifigkeit verstärkt',
            'weil er vor einer OP nüchtern bleiben muss',
            'weil Flüssigkeit das Fieber erhöht'
          ] },
        { typ: 'zuordnen',
          frage: 'Welcher Komplikation beugt die Maßnahme vor?',
          zuordnung: {
            'Pneumonie': ['Mundpflege, Oberkörper hoch'],
            'Dekubitus': ['Fersen frei lagern'],
            'Thrombose': ['Beine passiv durchbewegen'],
            'Exsikkose': ['Ein- und Ausfuhr bilanzieren']
          } },
        { typ: 'mehrfach',
          frage: 'Tippen Sie alle **Komplikationen** der akinetischen Krise an.',
          richtig: ['Aspirationspneumonie', 'Exsikkose', 'Thrombose', 'Dekubitus'],
          falsch: ['Unterzuckerung', 'Bluthochdruckkrise durch Bewegung'] },
        { typ: 'auswahl',
          frage: 'Fieber, starkes Schwitzen, wenig Urin: Welche Maßnahme ist jetzt besonders wichtig?',
          antworten: [
            'Ein- und Ausfuhr bilanzieren',
            'einen großen Becher Tee reichen',
            'eine dickere Bettdecke holen',
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
