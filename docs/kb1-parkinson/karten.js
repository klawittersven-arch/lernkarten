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
            '**symptomatisches (sekundäres)** Parkinson-Syndrom: bekannte Ursache, z. B. Medikamente, Vergiftung, Entzündung',
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
          hinten: 'Bewegungsstörungen zeigen sich erst, wenn **mehr als die Hälfte** der dopaminbildenden Zellen untergegangen ist (je nach Quelle 50–80 %). Frühzeichen wie Riechstörung oder Obstipation werden selten mit Parkinson in Verbindung gebracht.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Leitsymptome und Frühzeichen',
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
            'vegetativ: Obstipation, Blasenstörung (Harndrang), vermehrtes Schwitzen, fettige Haut (Seborrhoe), Speichelfluss, Blutdruckabfall beim Aufstehen',
            'psychisch/kognitiv: Depression, Angst, verlangsamtes Denken (Bradyphrenie), im Verlauf Demenz',
            'Schlafstörungen, Riechstörung, Schmerzen'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeprozess: PESR und Pflegeziele',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann ein Pflegeproblem bei Parkinson im **PESR-Schema** *erläutern*: **Gehfähigkeit**',
          hilfe: 'pesr',
          hinten: [
            '**P:** beeinträchtigte Gehfähigkeit',
            '**E:** Bradykinese, Rigor, posturale Instabilität, Wirkungsschwankungen (Off-Phasen)',
            '**S:** kleine, schlurfende Schritte, Freezing an Türen, Sturz beim Umdrehen (mit Zeile)',
            '**R:** nutzt Rollator, kennt Strategien aus der Physiotherapie, motiviert'
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
            '**R:** geht mit Rollator selbst zur Toilette, kooperativ, Angehörige unterstützen'
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
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeinterventionen entwickeln und begründen',
      karten: [
        { nr: 1, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Freezing** *entwickeln* und *begründen*.',
          hinten: [
            'äußere Reize (**Cueing**): Bodenmarkierung, Zählen, Klatschen, Rhythmus → ersetzen die gestörte automatische Bewegungssteuerung',
            'stehen bleiben lassen, ruhig ansprechen, erst auf der Stelle treten, dann großer Schritt → Zeitdruck verstärkt die Blockade',
            '**nicht ziehen** → wegen der gestörten Halte- und Stellreflexe droht ein Sturz'
          ] },
        { nr: 1, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Sturzgefahr** *entwickeln* und *begründen*.',
          hinten: [
            'beim Umdrehen in **großen Bögen** gehen statt auf der Stelle drehen → auf der Stelle lösen sich Freezing und Stürze aus',
            'Stolperfallen beseitigen (Teppiche, Kabel), Nachtlicht, Haltegriffe → sichere Umgebung, auch nachts',
            'Hilfsmittel (Rollator) in Reichweite, festes Schuhwerk; Gehtraining in der On-Phase'
          ] },
        { nr: 2, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Schluckstörung** *entwickeln* und *begründen*.',
          hinten: [
            'aufrecht sitzen, Kinn leicht zur Brust → schützt die Atemwege',
            'Mahlzeiten in der On-Phase, ohne Zeitdruck, kleine Bissen → bessere Kontrolle, Stress verstärkt die Symptome',
            'Flüssigkeiten nach logopädischer Empfehlung andicken → Dünnflüssiges wird leicht aspiriert',
            'Mundpflege nach dem Essen, auf Pneumoniezeichen achten'
          ] },
        { nr: 2, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Obstipation** *entwickeln* und *begründen*.',
          hinten: [
            'Trinkmenge steigern (ca. 1,5 l, wenn keine Einschränkung), v. a. tagsüber → weicherer Stuhl',
            'ballaststoffreiche Kost, Bewegung in der On-Phase → fördert die Darmtätigkeit',
            'feste Toilettenzeit nach dem Frühstück, Fußbank → nutzt den gastrokolischen Reflex',
            'Stuhlprotokoll; Abführmittel nur nach Anordnung'
          ] },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann die Pflege an **Wirkungsschwankungen** anpassen und **aktivierend** pflegen – und das *begründen*.',
          hinten: [
            'Beweglichkeit über den Tag beobachten und mit Uhrzeit dokumentieren (gute Phase, Steifigkeit, Überbewegungen) → Grundlage für die Planung und für die Ärztin',
            'Körperpflege, Mobilisation und Therapien in die gute Phase (**On-Phase**) legen → er kann mehr selbst tun',
            'Zeit lassen, nicht drängen, nur so viel Hilfe wie nötig; Hilfsmittel wie Klettverschlüsse → erhält die Selbstständigkeit'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann eine Pflegesituation *beurteilen*:',
          fall: 'Herr Roth bleibt im Flur stehen und kommt nicht weiter. Die Pflegefachperson nimmt seinen Arm, zieht ihn nach vorn und sagt: „Kommen Sie, wir sind spät dran!“',
          hinten: [
            'nicht fachgerecht: Ziehen bringt ihn aus dem Gleichgewicht (posturale Instabilität) → Sturzgefahr',
            'Zeitdruck verstärkt das Freezing',
            'besser: stehen bleiben lassen, ruhig ansprechen, Rhythmus vorgeben oder Markierung zum Übersteigen nutzen'
          ] },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann Kriterien zur **Evaluation** *nennen*.',
          hinten: [
            'Ist das Ziel erreicht? Beobachtbare Kriterien prüfen, z. B. Zahl der Stürze, Freezing-Episoden, Husten beim Essen, Stuhlfrequenz, Gewicht, Trinkmenge',
            'Quellen: Protokolle, Beobachtung, Aussagen des Pflegeempfängers; bei Bedarf Ziel oder Maßnahme anpassen'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Akinetische Krise: erkennen und handeln',
      karten: [
        { nr: 1, afb: 'I',
          vorne: 'Ich kann die **akinetische Krise** *beschreiben*: Definition und Auslöser',
          hinten: [
            'lebensbedrohliche Verschlechterung aller Symptome bis zur völligen Bewegungsunfähigkeit, die über Stunden bis Tage anhält',
            'Auslöser: Parkinson-Medikamente plötzlich weggelassen oder verspätet (z. B. Nüchternheit vor OP), Infekte, Fieber, Flüssigkeitsmangel, Operationen, Erbrechen/Durchfall'
          ] },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann die **Anzeichen und Komplikationen** einer akinetischen Krise *nennen*.',
          hinten: [
            '**Anzeichen:** völlige Unbeweglichkeit, starker Rigor, Schluck- und Sprechunfähigkeit, Speichelfluss, Fieber, Herzrasen, Schwitzen, Bewusstseinsstörung',
            '**Komplikationen:** Aspirationspneumonie, Exsikkose, Thrombose/Lungenembolie, Dekubitus, Muskelzerfall mit Nierenversagen'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann in einer Fallsituation *begründen*, dass eine akinetische Krise vorliegt:',
          zeilen: [
            'Frau Weber (78 J.) wurde gestern wegen einer Lungenentzündung aufgenommen.',
            'Seit dem Vortag hat sie ihre Parkinson-Tabletten nicht mehr bekommen.',
            'Heute liegt sie völlig steif im Bett und kann sich nicht drehen.',
            'Sie verschluckt sich am Speichel und spricht kaum.',
            'Temperatur 39,2 °C, Puls 120/min; sie schwitzt stark und ist schläfrig.'
          ],
          hinten: [
            'völlige Unbeweglichkeit und Steifigkeit (Z. 3) – Akinese, Rigor',
            'Schluck- und Sprechstörung (Z. 4) – Aspirationsgefahr',
            'Fieber, Herzrasen, Schwitzen, Schläfrigkeit (Z. 5) – vegetative Entgleisung, Bewusstseinsstörung',
            'Auslöser: Lungenentzündung (Z. 1), fehlende Parkinson-Tabletten (Z. 2)'
          ] },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann pflegerische **Sofortmaßnahmen** bei einer akinetischen Krise *beschreiben*, *begründen* und von ärztlichen Maßnahmen abgrenzen.',
          hinten: [
            '**sofort selbstständig:** Ärztin informieren (Notfall) · Vitalzeichen, Bewusstsein, SpO₂ überwachen · Oberkörper hoch, absaugen, nichts über den Mund (Aspiration) · Prophylaxen · Ein- und Ausfuhr bilanzieren (Exsikkose)',
            '**nur nach ärztlicher Anordnung:** Infusion, Parkinson-Medikamente über Magensonde, fiebersenkende Medikamente',
            '**nicht tun:** trinken lassen, Tabletten im Joghurt eingeben, bis zur Visite abwarten'
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
