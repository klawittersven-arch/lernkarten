/* =====================================================================
 * LERNKARTEN KB I – Parkinson
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
 *     fall: 'Herr X ist …',         ← (optional) Fall oder Aussage, eingerahmt unter der Kompetenz
 *     zeilen: ['…', '…'],           ← (optional) statt fall: Falltext mit Zeilennummern wie in der Klausur
 *     hinten: ['Punkt 1', 'Punkt 2'],  ← Rückseite: jeder Eintrag wird ein Stichpunkt
 *     nummeriert: true,             ← (optional) 1., 2., 3. statt Punkten; start: 4 beginnt bei 4.
 *     hinweis: '…',                 ← (optional) kleiner Kasten unten auf der Rückseite
 *     hilfe: 'regeln'               ← (optional) Knopf unter der Karte, der eine Liste aus „hilfen“ zeigt
 *   },
 *
 * Neue Karte: eine vorhandene Karte samt { … }, kopieren und darunter einfügen.
 * Der Lernstand der SuS hängt am Text der Vorderseite: Wird die Vorderseite
 * geändert, gilt die Karte auf den Handys wieder als „neu“.
 * ===================================================================== */

var LERNKARTEN = {
  titel: 'KB I – Parkinson',
  untertitel: 'Lernkarten zur Ich-kann-Liste',
  klausur: 'Vorbereitung auf Klausur und Examen',
  // Kasten auf der Startseite (weglassen, wenn nicht gebraucht)
  hinweis: 'In der Klausur kommt ein anderer Fall – lernen und verstehen Sie das Vorgehen, nicht nur die Beispielsätze!',
  // Schlüssel für den Lernstand auf dem Handy – nur ändern, wenn alle neu beginnen sollen
  speicherName: 'kb1-parkinson',

  // Listen, die sich auf einzelnen Karten per Knopf einblenden lassen
  hilfen: {
    regeln: {
      knopf: '📋 Goldene Regeln der Parkinson-Medikation',
      titel: 'Goldene Regeln der Parkinson-Medikation',
      nummeriert: true,
      punkte: [
        'pünktlich nach dem individuellen Einnahmeplan – nicht nach den Verteilzeiten',
        'L-Dopa 30 Minuten vor oder 60–90 Minuten nach dem Essen, mit Wasser',
        'nie abrupt absetzen oder weglassen – auch nicht bei Nüchternheit (ärztlich klären)',
        'keine Dopamin-Gegenspieler: kein Haloperidol, kein MCP',
        'Schluckstörung: Darreichungsform klären, Retardtabletten nicht teilen',
        'Wirkung und Nebenwirkungen beobachten und dokumentieren'
      ]
    },
    pesr: {
      knopf: '📋 Das PESR-Schema anzeigen',
      titel: 'PESR-Schema',
      punkte: [
        '**P** – Pflegeproblem (kurzer Titel)',
        '**E** – Einflussfaktoren/Ursachen („aufgrund von …“)',
        '**S** – Symptome/Kennzeichen („erkennbar an …“, mit Zeile)',
        '**R** – Ressourcen (Fähigkeiten, Motivation, Hilfsmittel, Menschen)'
      ]
    }
  },

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Fallsituation: Parkinson-Symptome erkennen',
      karten: [
        { nr: 1, afb: 'I',
          vorne: 'Ich kann in einer Fallsituation Hinweise auf Parkinson-Symptome *identifizieren* und den Fachbegriff nennen:',
          fall: 'Herr Roth (69 J.) bleibt an der Badezimmertür plötzlich stehen, „als ob die Füße am Boden kleben“. Seine linke Hand zittert, wenn sie auf der Armlehne liegt. Beim Durchbewegen des Arms spürt die Pflegefachperson einen ruckartigen Widerstand.',
          nummeriert: true,
          hinten: [
            '„… bleibt an der Badezimmertür plötzlich stehen …“ → **Freezing** (Akinese)',
            '„… Hand zittert, wenn sie auf der Armlehne liegt“ → **Ruhetremor**',
            '„… ruckartiger Widerstand …“ → **Rigor** mit Zahnradphänomen'
          ] },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann in einer Fallsituation Hinweise auf Parkinson-Symptome *identifizieren* und den Fachbegriff nennen:',
          fall: 'Frau Haas (74 J.) spricht leise und monoton, ihr Gesicht wirkt starr. Ihre Schrift ist in letzter Zeit sehr klein geworden. Sie schwitzt stark und hat nur alle vier Tage Stuhlgang.',
          nummeriert: true,
          hinten: [
            '„… spricht leise und monoton …“ → **Hypophonie**',
            '„… Gesicht wirkt starr“ → **Hypomimie**',
            '„… Schrift … sehr klein“ → **Mikrographie**',
            '„… schwitzt stark …“, „… alle vier Tage Stuhlgang“ → nichtmotorisch: **Hyperhidrose**, **Obstipation**'
          ] },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann in einer Fallsituation Hinweise auf Parkinson-Symptome *identifizieren* und die **Zeile** angeben:',
          zeilen: [
            'Herr Brandt (71 J.) lebt mit seiner Frau in einer Wohnung im 2. Stock.',
            'Er geht mit kleinen, schlurfenden Schritten, die Arme schwingen nicht mit.',
            'Gestern ist er beim Umdrehen in der Küche nach hinten gestürzt.',
            'Seine Frau erzählt, dass er schon seit Jahren nichts mehr riechen kann.',
            'Er liest jeden Morgen die Zeitung und löst gern Kreuzworträtsel.',
            'Nachts schlägt er im Traum um sich und ruft laut.'
          ],
          hinten: [
            '**Bradykinese/Gangstörung:** kleine, schlurfende Schritte, kein Mitschwingen der Arme (Z. 2)',
            '**posturale Instabilität:** Sturz beim Umdrehen nach hinten (Z. 3)',
            '**Frühzeichen/nichtmotorisch:** Riechstörung (Z. 4) · REM-Schlaf-Verhaltensstörung (Z. 6)',
            'Z. 1 und Z. 5 sind Informationen bzw. Ressourcen – keine Symptome.'
          ],
          hinweis: 'In der Klausur zu jedem Symptom die Zeile angeben – sonst gibt es Punktabzug.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Krankheitsbild: Definition, Ursache, Pathophysiologie',
      karten: [
        { nr: 1, afb: 'I',
          vorne: 'Ich kann das Krankheitsbild Parkinson *beschreiben*: **Definition**',
          hinten: 'langsam fortschreitende, nicht heilbare **neurodegenerative** Erkrankung des Gehirns, bei der vor allem die **Bewegungssteuerung** gestört ist.' },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann das Krankheitsbild Parkinson *beschreiben*: **Ursache und Formen**',
          hinten: [
            '**idiopathisches** Parkinson-Syndrom (ca. 75 %): Ursache unbekannt; wichtigster Risikofaktor ist das Alter',
            '**symptomatisches (sekundäres)** Parkinson-Syndrom: bekannte Ursache, z. B. Neuroleptika, Vergiftung, Entzündung',
            '**atypisches** Parkinson-Syndrom: im Rahmen anderer neurodegenerativer Erkrankungen'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann die **Pathophysiologie** von Parkinson *erklären*.',
          nummeriert: true,
          hinten: [
            'In der **Substantia nigra** im Mittelhirn gehen dopaminbildende Nervenzellen zugrunde.',
            'In den Basalganglien fehlt **Dopamin**; **Acetylcholin** überwiegt relativ → Ungleichgewicht der Botenstoffe.',
            'Bewegungen können nicht mehr fein gesteuert werden → Bradykinese, Rigor, Tremor.'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann *erklären*, warum Parkinson oft erst spät erkannt wird.',
          hinten: 'Bewegungsstörungen zeigen sich erst, wenn **mehr als die Hälfte** der dopaminbildenden Zellen untergegangen ist (je nach Quelle 50–80 %). Frühzeichen wie Riechstörung oder Obstipation werden selten mit Parkinson in Verbindung gebracht.' },
        { nr: 3, afb: 'I',
          vorne: 'Ich kann die wichtigsten Schritte der **Diagnostik** *nennen*.',
          hinten: [
            'Anamnese und neurologische Untersuchung (Bradykinese + Rigor und/oder Ruhetremor)',
            '**L-Dopa-Test:** Symptome bessern sich nach L-Dopa',
            'MRT zum Ausschluss anderer Ursachen',
            'ggf. Riechtest, nuklearmedizinische Untersuchung (DaTSCAN)'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Leitsymptome, Frühzeichen, Verlauf und Auswirkungen',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann das Leitsymptom **Bradykinese/Akinese** *erläutern*.',
          hinten: [
            'Verlangsamung und Verarmung der Bewegungen; Bewegungen sind schwer zu starten und zu beenden',
            'Beispiele: kleinschrittiger Gang, fehlendes Mitschwingen der Arme, **Freezing**, Hypomimie, Hypophonie, Mikrographie'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann das Leitsymptom **Rigor** *erläutern*.',
          hinten: [
            'Muskelsteifigkeit durch **erhöhten Muskeltonus**',
            'beim passiven Bewegen zäher, oft ruckartiger Widerstand (**Zahnradphänomen**); gebeugte Haltung, oft Schmerzen'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann das Leitsymptom **Tremor** *erläutern*.',
          hinten: [
            '**Ruhetremor:** Zittern in Ruhe, wird bei gezielten Bewegungen schwächer',
            'oft zuerst einseitig; bei Aufregung stärker'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann das Leitsymptom **posturale Instabilität** *erläutern*.',
          hinten: [
            'gestörte **Halte- und Stellreflexe** → Gleichgewichtsverluste werden nicht schnell genug ausgeglichen',
            'hohes **Sturzrisiko**, oft Stürze nach hinten (Retropulsion); tritt meist erst im Verlauf auf'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann **Frühzeichen** von Parkinson *nennen*.',
          hinten: [
            'Riechstörung (Hyposmie)',
            'REM-Schlaf-Verhaltensstörung (Bewegungen und Rufen im Traum)',
            'Obstipation',
            'depressive Verstimmung, Schulter-Nacken-Schmerzen'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann **nichtmotorische Symptome** von Parkinson *nennen*.',
          hinten: [
            'vegetativ: Obstipation, Blasenstörung (Harndrang), vermehrtes Schwitzen, fettige Haut (Seborrhoe), Blutdruckabfall beim Aufstehen',
            'psychisch/kognitiv: Depression, Angst, verlangsamtes Denken (Bradyphrenie), im Verlauf Demenz',
            'Schlafstörungen, Riechstörung, Schmerzen'
          ] },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann den **Verlauf** nach Hoehn und Yahr *beschreiben* und ein Stadium *begründen*.',
          hinten: [
            '**1** einseitig · **2** beidseitig, Gleichgewicht erhalten · **3** beidseitig + posturale Instabilität, noch weitgehend selbstständig · **4** starke Einschränkungen, Gehen/Stehen noch ohne Hilfe · **5** ohne Hilfe an Rollstuhl oder Bett gebunden',
            'Begründen: Seitenbeteiligung + Gleichgewicht/Stürze + Selbstständigkeit im Alltag am Fall belegen.'
          ] },
        { nr: 4, afb: 'II',
          vorne: 'Ich kann **physische, psychische und soziale Auswirkungen** von Parkinson *ableiten*:',
          fall: 'Herr Lenz (72 J.) ist rückwärts gestürzt, schämt sich für sein Zittern und geht nicht mehr zum Stammtisch. Er hat 4 kg abgenommen. Seine Frau übernimmt immer mehr seiner Aufgaben.',
          hinten: [
            '**physisch:** Sturz mit Verletzungsgefahr, Gewichtsverlust',
            '**psychisch:** Scham, Sturzangst, depressive Stimmung',
            '**sozial:** Rückzug (Stammtisch), veränderte Rollen in der Partnerschaft, Stigmatisierung'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Medikamente und Wirkungsschwankungen',
      karten: [
        { nr: 1, afb: 'I',
          vorne: 'Ich kann die Wirkung von **L-Dopa mit Decarboxylasehemmer** *beschreiben*.',
          hinten: [
            'L-Dopa ist die Vorstufe von Dopamin, gelangt ins Gehirn und wird dort zu Dopamin.',
            'Der Decarboxylasehemmer (Benserazid, Carbidopa) verhindert die Umwandlung außerhalb des Gehirns → mehr Wirkung, weniger Übelkeit.',
            'wirksamstes Medikament; nach Jahren Wirkungsschwankungen und Dyskinesien'
          ] },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann Wirkung und pflegerelevante Nebenwirkungen von **Dopaminagonisten** *beschreiben*.',
          hinten: [
            'wirken wie Dopamin direkt an den Rezeptoren (z. B. Pramipexol, Ropinirol, Rotigotin-Pflaster)',
            'Nebenwirkungen: Müdigkeit bis **plötzliches Einschlafen** (Autofahren!), **Impulskontrollstörungen** (Spiel-, Kauf-, Esssucht), Halluzinationen, Beinödeme, Blutdruckabfall'
          ] },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann **MAO-B-Hemmer, COMT-Hemmer und Amantadin** *beschreiben*.',
          hinten: [
            '**MAO-B-Hemmer** (Rasagilin, Safinamid): hemmen den Dopaminabbau',
            '**COMT-Hemmer** (Entacapon, Opicapon): verlängern die L-Dopa-Wirkung; Entacapon färbt den Urin rotbraun (harmlos)',
            '**Amantadin:** wirkt gegen Dyskinesien; als Infusion bei der akinetischen Krise'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann die **Einnahmeregeln von L-Dopa** *begründen*.',
          hilfe: 'regeln',
          hinten: [
            '**pünktlich** nach individuellem Plan – schon Verspätungen führen zu Off-Phasen',
            '**30 min vor oder 60–90 min nach dem Essen**, mit Wasser – Eiweißbausteine (Aminosäuren) konkurrieren mit L-Dopa um die Aufnahme in Darm und Gehirn',
            'bei Übelkeit: kleiner eiweißarmer Imbiss (z. B. Zwieback) oder Domperidon nach Anordnung'
          ] },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Wirkungsschwankungen **On, Off, Wearing-off, On-Off und Dyskinesie** *erklären*.',
          hinten: [
            '**On:** gute Beweglichkeit · **Off:** Unbeweglichkeit, Freezing',
            '**Wearing-off:** Wirkung lässt vorhersehbar vor der nächsten Dosis nach',
            '**On-Off:** plötzliche, nicht vorhersehbare Wechsel',
            '**Dyskinesie:** unwillkürliche Überbewegungen, meist bei hohem Wirkspiegel'
          ] },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann aus Wirkungsschwankungen eine **pflegerische Konsequenz** *ableiten*.',
          hinten: [
            'On/Off und Dyskinesien mit Uhrzeit dokumentieren (Parkinson-Tagebuch) und an die Ärztin weitergeben',
            'Medikamente pünktlich geben, erste Tablette rechtzeitig vor dem Aufstehen',
            'Körperpflege, Mobilisation, Therapien und wichtige Gespräche in die **On-Phase** legen'
          ] },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann Medikamente *nennen*, die bei Parkinson **gefährlich** sind, und eine Alternative angeben.',
          hinten: [
            '**Haloperidol** und andere klassische Neuroleptika → bei Halluzinationen z. B. Quetiapin oder Clozapin (ärztliche Anordnung)',
            '**Metoclopramid (MCP)** → bei Übelkeit z. B. Domperidon',
            'Grund: Sie blockieren Dopamin-Rezeptoren und verstärken die Symptome bis zur akinetischen Krise.'
          ] },
        { nr: 5, afb: 'III',
          vorne: 'Ich kann eine Medikamentengabe *beurteilen*:',
          fall: 'Herr Kühn soll L-Dopa um 11 Uhr erhalten. Er bekommt die Tablette um 12:15 Uhr zum Mittagessen (Schweinebraten, Vanillepudding). Um 13 Uhr steht er wie angewurzelt im Flur.',
          hilfe: 'regeln',
          hinten: [
            'über eine Stunde **zu spät** und **mit eiweißreicher Mahlzeit** → Aufnahme verzögert und vermindert',
            'Folge: **Off-Phase mit Freezing** um 13 Uhr, Sturzgefahr',
            'richtig: pünktlich, 30 min vor dem Essen mit Wasser'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Akinetische Krise und ärztliche Anordnung',
      karten: [
        { nr: 1, afb: 'I',
          vorne: 'Ich kann die **akinetische Krise** *beschreiben*: Definition und Auslöser',
          hinten: [
            'lebensbedrohliche Verschlechterung aller Symptome bis zur völligen Bewegungsunfähigkeit, die über Stunden bis Tage anhält',
            'Auslöser: Absetzen, Weglassen oder Verspätung von Parkinson-Medikamenten (z. B. Nüchternheit vor OP), Infekte, Fieber, Flüssigkeitsmangel, OP, Erbrechen/Durchfall, Neuroleptika oder MCP'
          ] },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann die **Anzeichen und Komplikationen** einer akinetischen Krise *nennen*.',
          hinten: [
            '**Anzeichen:** völlige Unbeweglichkeit, starker Rigor, Schluck- und Sprechunfähigkeit, Speichelfluss, Fieber, Herzrasen, Schwitzen, Bewusstseinsstörung',
            '**Komplikationen:** Aspirationspneumonie, Exsikkose, Thrombose/Lungenembolie, Dekubitus, Muskelzerfall mit Nierenversagen'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann Maßnahmen bei einer akinetischen Krise den **Verantwortungsbereichen** *zuordnen*.',
          hinten: [
            '**sofort selbstständig:** Ärztin informieren, Vitalzeichen/Bewusstsein überwachen, nichts oral geben, Oberkörper hoch, absaugen, Prophylaxen, Flüssigkeitsbilanz',
            '**nach ärztlicher Anordnung:** Amantadin-Infusion, L-Dopa über Magensonde, Infusionen, fiebersenkende Medikamente',
            '**nicht tun:** trinken lassen (Aspiration), Haloperidol oder MCP geben'
          ] },
        { nr: 3, afb: 'I',
          vorne: 'Ich kann **Anordnungs- und Durchführungsverantwortung** *beschreiben*.',
          hinten: [
            '**Ärztin/Arzt:** Indikation, eindeutige schriftliche Anordnung (Medikament, Dosis, Zeitpunkt, Weg), Aufklärung',
            '**Pflegefachperson:** Anordnung auf Plausibilität prüfen, fachgerecht durchführen, beobachten, dokumentieren; Grundlage § 5 PflBG'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann eine fragliche ärztliche Anordnung *beurteilen*:',
          fall: 'Der Bereitschaftsarzt ordnet bei Herrn Lenz (Parkinson) wegen nächtlicher Unruhe telefonisch Haloperidol an. Die Pflegefachperson hat Bedenken, gibt es aber trotzdem.',
          hinten: [
            'Haloperidol ist bei Parkinson kontraindiziert (blockiert Dopamin) – die Bedenken sind berechtigt.',
            'Wer eine erkennbar schädliche Anordnung ausführt, haftet mit (Durchführungsverantwortung).',
            'Richtig: Bedenken äußern (**Remonstration**), Gabe zurückstellen, Alternative ansprechen, ggf. Oberärztin; telefonische Anordnung wiederholen, dokumentieren, gegenzeichnen lassen.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeprozess: PESR, Pflegeziele, Interventionen',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann ein Pflegeproblem bei Parkinson im **PESR-Schema** *erläutern*: **Gehfähigkeit**',
          hilfe: 'pesr',
          hinten: [
            '**P:** beeinträchtigte Gehfähigkeit',
            '**E:** Bradykinese, Rigor, posturale Instabilität, Off-Phasen',
            '**S:** kleine, schlurfende Schritte, Freezing an Türen, Beinahe-Stürze (mit Zeile)',
            '**R:** nutzt Rollator, kennt Cueing-Strategien, motiviert'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann ein Pflegeproblem bei Parkinson im **PESR-Schema** *erläutern*: **Schlucken**',
          hilfe: 'pesr',
          hinten: [
            '**P:** beeinträchtigtes Schlucken mit Aspirationsgefahr',
            '**E:** Rigor und Akinese der Schluckmuskulatur, dünnflüssige Kost',
            '**S:** Husten und Verschlucken beim Essen, Speichelfluss, lange Essensdauer',
            '**R:** orientiert, kann Anleitung umsetzen, Logopädie verordnet'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann ein Pflegeproblem bei Parkinson im **PESR-Schema** *erläutern*: **Obstipation**',
          hilfe: 'pesr',
          hinten: [
            '**P:** Obstipation',
            '**E:** verlangsamte Darmtätigkeit (vegetatives Nervensystem), Bewegungsmangel, geringe Trinkmenge',
            '**S:** Stuhlgang nur alle 4–5 Tage, harter Stuhl, Schmerzen beim Pressen',
            '**R:** geht selbst zur Toilette, kooperativ, Angehörige unterstützen'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann bei einem **Risiko-Pflegeproblem** (z. B. Sturzgefahr) die Besonderheit *erklären*.',
          hinten: 'Es ist noch kein Schaden eingetreten – statt Symptomen nennen Sie **Risikofaktoren**: z. B. posturale Instabilität, Freezing, Blutdruckabfall beim Aufstehen, nächtlicher Harndrang, Stolperfallen, offene Hausschuhe.' },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann ein **überprüfbares Pflegeziel** *formulieren*.',
          hinten: [
            'aus Sicht des Pflegeempfängers: **Wer? Was** (beobachtbar)? **Wie/womit? Bis wann?**',
            'Beispiel: „Herr Lenz überwindet bis zum 15.12. das Freezing an der Schlafzimmertür selbstständig mithilfe einer Bodenmarkierung.“',
            'keine Maßnahmen („erhält …“), keine Wünsche („soll …“)'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Freezing** *entwickeln* und *begründen*.',
          hinten: [
            'äußere Reize (**Cueing**): Bodenmarkierung, Anti-Freezing-Stock, Zählen, Klatschen, Rhythmus → umgehen die gestörte innere Bewegungsauslösung',
            'erst auf der Stelle treten, dann großer Schritt; nicht ziehen oder drängen → Zug und Zeitdruck verstärken die Blockade',
            'Engstellen und Stolperfallen beseitigen; Mobilisation in der On-Phase'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Schluckstörung** *entwickeln* und *begründen*.',
          hinten: [
            'aufrecht sitzen, Kopf leicht nach vorn → schützt die Atemwege',
            'Mahlzeiten in der On-Phase, ohne Zeitdruck, kleine Bissen → bessere Kontrolle',
            'Flüssigkeiten nach logopädischer Empfehlung andicken → Dünnflüssiges wird leicht aspiriert',
            'Mundpflege nach dem Essen, auf Pneumoniezeichen achten'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Obstipation** *entwickeln* und *begründen*.',
          hinten: [
            'Trinkmenge steigern (1,5–2 l, wenn keine Einschränkung), v. a. tagsüber → weicherer Stuhl, nächtlicher Harndrang wird berücksichtigt',
            'ballaststoffreiche Kost, Bewegung in der On-Phase → fördert die Darmtätigkeit',
            'feste Toilettenzeit nach dem Frühstück, Fußbank → nutzt den gastrokolischen Reflex',
            'Stuhlprotokoll; Abführmittel nur nach Anordnung'
          ] },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann Kriterien zur **Evaluation** *nennen*.',
          hinten: [
            'Ist das Ziel erreicht? Beobachtbare Kriterien prüfen, z. B. Zahl der Stürze/Beinahe-Stürze, Freezing-Episoden, Husten beim Essen, Stuhlfrequenz, Gewicht, Trinkmenge',
            'Quellen: Protokolle, Beobachtung, Aussagen des Pflegeempfängers; bei Bedarf Ziel oder Maßnahme anpassen'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Rehabilitation, Team und Assistenzsysteme',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann die Rehabilitationsziele **Restitution, Kompensation und Adaption** *erklären*.',
          hinten: [
            '**Restitution:** Fähigkeit durch Training wiederherstellen (bei Parkinson v. a. nach OP, Infekt, Krankenhaus)',
            '**Kompensation:** eingeschränkte Fähigkeit durch Hilfsmittel/Strategien ausgleichen',
            '**Adaption:** Umwelt, Alltag und Ziele anpassen'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann rehabilitative Maßnahmen bei Parkinson einem Rehabilitationsziel *zuordnen*:',
          fall: 'Anti-Freezing-Stock · Teppiche entfernen · Termine in die On-Phase legen · Besteck mit Griffverdickung · Gehtraining nach Hüft-OP',
          hinten: [
            '**Kompensation:** Anti-Freezing-Stock, Besteck mit Griffverdickung',
            '**Adaption:** Teppiche entfernen, Termine in die On-Phase legen',
            '**Restitution:** Gehtraining nach Hüft-OP'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die Aufgaben des **interprofessionellen Teams** bei Parkinson *beschreiben*.',
          hinten: [
            '**Physiotherapie:** Gang, Gleichgewicht, Sturzprävention (z. B. große Bewegungen, Cueing)',
            '**Ergotherapie:** Alltagsaktivitäten, Feinmotorik, Hilfsmittel, Wohnraumberatung',
            '**Logopädie:** Stimme (z. B. LSVT LOUD®), Sprechen, Schlucken',
            '**Sozialdienst/Pflegeberatung:** Leistungen, Anträge, Entlastung, Selbsthilfe',
            '**Pflege:** beobachtet rund um die Uhr, koordiniert, überträgt Geübtes in den Alltag'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann die **Parkinson-Komplexbehandlung** *beschreiben*.',
          hinten: 'stationäre Behandlung über ca. zwei bis drei Wochen, in der Neurologie, Pflege, Physio-, Ergo-, Sprachtherapie (ggf. Psychologie, Sozialdienst) nach einem gemeinsamen Plan arbeiten – z. B. bei Wirkungsschwankungen, Stürzen oder Schluckstörungen.' },
        { nr: 3, afb: 'I + II',
          vorne: 'Ich kann **technische Assistenzsysteme** *nennen* und ihren Nutzen *begründen*.',
          hinten: [
            'Hausnotruf mit Sturzerkennung → Hilfe nach Sturz, mehr Sicherheit beim Alleinsein',
            'Medikamentendosierer/Erinnerung per Smartphone → pünktliche Einnahme',
            'Rollator oder Stock mit Laserlinie → optischer Reiz gegen Freezing',
            'Bewegungsmelder-Licht, Sprachverstärker, Aufstehsessel'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Kommunikation, Angehörige und Ethik',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann **Kommunikationsbarrieren** bei Parkinson *erläutern*.',
          hinten: [
            '**Hypomimie:** Gefühle kaum am Gesicht ablesbar → wird als Desinteresse oder Ablehnung fehlgedeutet',
            '**Hypophonie/Dysarthrie:** leise, undeutliche Sprache → häufiges Nachfragen, Betroffene geben auf',
            '**Bradyphrenie:** verzögerte Antworten → andere sprechen für den Betroffenen oder halten ihn für verwirrt'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann **kompensierende Maßnahmen** in der Kommunikation *beschreiben*.',
          hinten: [
            'Zeit lassen, Pausen aushalten, nicht unterbrechen, Sätze nicht beenden; eine Frage nach der anderen',
            'nicht nach dem Gesicht urteilen, sondern nachfragen',
            'ruhige Umgebung, Blickkontakt; wichtige Gespräche in der On-Phase',
            'Logopädie, ggf. Sprachverstärker; Angehörige informieren und anleiten'
          ] },
        { nr: 1, afb: 'III',
          vorne: 'Ich kann ein Kommunikationsverhalten *beurteilen*:',
          fall: 'Der Auszubildende Tim stellt Herrn Lenz mehrere Fragen schnell hintereinander. Frau Lenz antwortet für ihren Mann. Später sagt Tim: „Der hatte null Bock auf uns, so wie der geguckt hat.“',
          hinten: [
            'Tim deutet die **Hypomimie** als Desinteresse – Fehldeutung eines Symptoms.',
            'Schnelle Fragen überfordern bei **Bradyphrenie**; Herr Lenz wird übergangen, als Frau Lenz für ihn antwortet.',
            'Besser: Tim informieren, eine Frage nach der anderen, Herrn Lenz direkt ansprechen und Zeit lassen.'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann **Belastungen pflegender Angehöriger** *erläutern*.',
          hinten: [
            '**körperlich:** Hilfe bei Transfers, nächtliches Aufstehen → Erschöpfung, Schlafmangel',
            '**psychisch:** Sorge vor Stürzen, Trauer, Überforderung',
            '**sozial:** Rückzug (Hobbys, Freunde), Rollenwechsel von der Partnerin zur Pflegenden; ggf. finanzielle Sorgen'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann **Entlastungsangebote** für Angehörige *beschreiben*.',
          hinten: [
            'Pflegeberatung (§ 7a SGB XI, Pflegestützpunkt), Pflegekurse (§ 45 SGB XI)',
            'Verhinderungspflege, Kurzzeitpflege, Tagespflege, Entlastungsbetrag',
            'Selbsthilfegruppe (z. B. Deutsche Parkinson Vereinigung), Hausnotruf, Ehrenamtliche'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann ein **ethisches Dilemma** anhand von Autonomie und Fürsorge *diskutieren*:',
          fall: 'Herr Lenz (Parkinson, geistig klar) möchte allein in seine Werkstatt im Keller. Die Treppe ist steil, er hat Off-Phasen. Frau Lenz will es verbieten.',
          hinten: [
            '**Autonomie:** Er darf selbst entscheiden; die Werkstatt ist sinnstiftend und Teil seiner Identität.',
            '**Fürsorge/Nichtschaden:** hohes Sturz- und Verletzungsrisiko, allein im Keller unbemerkt.',
            '**Lösung:** Risiko senken statt verbieten – Handlauf, Werkstatt nur in On-Phasen, Hausnotruf, keine gefährlichen Maschinen; gemeinsam vereinbaren.'
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
