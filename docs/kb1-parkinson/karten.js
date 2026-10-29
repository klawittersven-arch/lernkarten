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
        '**R** – Ressourcen (Fähigkeiten, Motivation, Hilfsmittel, Menschen)',
        '**Risiko-Pflegeproblem:** P + **RF** (Risikofaktoren) + R'
      ]
    }
  },

  themen: [

    /* ------------------------------------------------------------------ */
    {
      titel: 'Krankheitsbild: Definition, Formen, Pathophysiologie',
      karten: [
        { nr: 1, afb: 'I',
          vorne: 'Ich kann das Parkinson-Syndrom *definieren*.',
          hinten: 'Das Parkinson-Syndrom ist ein Krankheitsbild mit typischen Störungen der **Bewegungssteuerung**, insbesondere **verlangsamten Bewegungen** sowie häufig **Muskelsteifigkeit** und/oder **Zittern**. Es schreitet fort und ist nicht heilbar.' },
        { nr: 1, afb: 'I',
          vorne: 'Ich kann die **Formen** des Parkinson-Syndroms *unterscheiden*.',
          hinten: [
            '**idiopathisch** (Morbus Parkinson): Dopaminbildende Zellen der Substantia nigra sterben ab – die Ursache ist unklar.',
            '**symptomatisch (sekundär):** ähnliche Symptome mit bekanntem Auslöser, z. B. bestimmte Medikamente (v. a. Neuroleptika), Vergiftungen, wiederholte Kopftraumen, Entzündungen des Gehirns',
            '**atypisch:** parkinsonähnliche Symptome im Rahmen anderer neurodegenerativer Erkrankungen (z. B. Multisystematrophie, Demenz mit Lewy-Körpern)'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann Lage und Funktion der **Substantia nigra** *erklären*.',
          hinten: 'Sie liegt im **Mittelhirn** (Teil des Hirnstamms) und enthält Nervenzellen, die den Neurotransmitter **Dopamin** bilden. Dopamin ist wesentlich an der Steuerung von Bewegungen beteiligt.' },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann die **Pathophysiologie** von Parkinson *erläutern*.',
          nummeriert: true,
          hinten: [
            'In der Substantia nigra gehen dopaminbildende Nervenzellen zugrunde → **Dopaminmangel**.',
            'Das fein abgestimmte **Gleichgewicht** der Neurotransmitter geht verloren: Dopamin zu wenig, **Acetylcholin** relativ zu viel.',
            'Die Bewegungssteuerung ist gestört → Brady-/Akinese, Rigor, Tremor.'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Symptome erkennen und erläutern',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann das Leitsymptom **Brady-/Akinese** *erläutern*.',
          hinten: [
            'Bewegungen sind verlangsamt; Starten und Beenden von Bewegungen sind erschwert – bis zu Bewegungsarmut oder Bewegungsblockaden (**Freezing**)',
            'Beispiele: kleinschrittiger, schlurfender Gang, Arme schwingen nicht mit, maskenhaftes Gesicht (Hypomimie), leise, monotone Stimme'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann das Leitsymptom **Rigor** *erläutern*.',
          hinten: [
            'Muskelsteife durch **erhöhten Muskeltonus**; Bewegungen fühlen sich widerständig an',
            'beim passiven Bewegen ggf. **Zahnradphänomen**; gebeugte Körperhaltung, begleitend oft Schmerzen'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann das Leitsymptom **Tremor** *erläutern*.',
          hinten: [
            'Zittern, häufig **in Ruhe**',
            'wird bei psychischer Anspannung oft stärker',
            'kann durch Festhalten oder eine gezielte Bewegung geringer werden'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann **motorische und nichtmotorische** Symptome *unterscheiden*.',
          hinten: [
            '**motorisch:** Tremor, Rigor, Brady-/Akinese, Freezing, kleinschrittiger Gang, fehlendes Mitschwingen der Arme, gebeugte Haltung, Hypomimie, leise, monotone Stimme',
            '**nichtmotorisch:** kognitive Veränderungen, Stimmungsschwankungen/Depression, vermehrtes Schwitzen, Blasenentleerungsstörungen, Obstipation'
          ] },
        { nr: 3, afb: 'I',
          vorne: 'Ich kann in einer Fallsituation Parkinson-Symptome *identifizieren* und den Fachbegriff nennen:',
          fall: 'Herr Roth (69 J.) bleibt an der Badezimmertür plötzlich stehen, „als ob die Füße am Boden kleben“. Seine linke Hand zittert, wenn sie auf der Armlehne liegt. Beim Durchbewegen des Arms spürt die Pflegefachperson einen ruckartigen Widerstand.',
          nummeriert: true,
          hinten: [
            '„… bleibt an der Badezimmertür plötzlich stehen …“ → **Freezing** (Akinese)',
            '„… Hand zittert, wenn sie auf der Armlehne liegt“ → **Ruhetremor**',
            '„… ruckartiger Widerstand …“ → **Rigor** mit Zahnradphänomen'
          ] },
        { nr: 3, afb: 'I',
          vorne: 'Ich kann in einer Fallsituation Parkinson-Symptome *identifizieren* und den Fachbegriff nennen:',
          fall: 'Frau Haas (74 J.) spricht leise und monoton, ihr Gesicht wirkt starr. Sie schwitzt stark, obwohl es im Zimmer kühl ist, und hat nur alle vier Tage Stuhlgang.',
          nummeriert: true,
          hinten: [
            '„… spricht leise und monoton …“ → leise, monotone Stimme (**Hypophonie**)',
            '„… Gesicht wirkt starr“ → maskenhaftes Gesicht (**Hypomimie**)',
            '„… schwitzt stark …“, „… alle vier Tage Stuhlgang“ → nichtmotorisch: **vermehrtes Schwitzen**, **Obstipation**'
          ] },
        { nr: 3, afb: 'I',
          vorne: 'Ich kann in einer Fallsituation Parkinson-Symptome *identifizieren* und die **Zeile** angeben:',
          zeilen: [
            'Herr Brandt (71 J.) lebt mit seiner Frau in einer Wohnung im 2. Stock.',
            'Er geht mit kleinen, schlurfenden Schritten, die Arme schwingen nicht mit.',
            'Beim Aufstehen braucht er mehrere Anläufe.',
            'Er liest jeden Morgen die Zeitung und löst gern Kreuzworträtsel.',
            'In letzter Zeit ist er oft niedergeschlagen und hat zu nichts Lust.'
          ],
          hinten: [
            '**Brady-/Akinese:** kleine, schlurfende Schritte, kein Mitschwingen der Arme (Z. 2); erschwerter Bewegungsstart (Z. 3)',
            '**nichtmotorisch:** depressive Verstimmung (Z. 5)',
            'Z. 1 und Z. 4 sind Informationen bzw. Ressourcen – keine Symptome.'
          ],
          hinweis: 'In der Klausur zu jedem Symptom die Zeile angeben – sonst gibt es Punktabzug.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegerisches Handeln bei Parkinson',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann **Grundprinzipien** der Pflege bei Parkinson *beschreiben*.',
          hinten: [
            '**Zeit lassen**, eigenes Tempo respektieren – Zeitdruck und Stress verstärken die Symptome',
            '**Selbstständigkeit fördern:** nur so viel helfen wie nötig, Gegenstände erreichbar hinstellen (aktivierende Pflege)',
            '**Selbstbestimmung achten:** Wünsche erfragen und respektieren; Sicherheit herstellen, statt Fähigkeiten wegzunehmen (z. B. Rollator statt Rollstuhl)'
          ] },
        { nr: 1, afb: 'III',
          vorne: 'Ich kann pflegerisches Handeln *beurteilen*:',
          fall: 'Herr Roth bleibt im Flur stehen und kommt nicht weiter. Die Pflegefachperson nimmt seinen Arm, zieht ihn nach vorn und sagt: „Kommen Sie, wir sind spät dran!“',
          hinten: [
            'nicht angemessen: Ziehen und Drängen missachten die Verlangsamung; Zeitdruck verstärkt die Blockade, Ziehen bringt ihn aus dem Gleichgewicht → Sturzgefahr',
            'besser: stehen bleiben lassen, ruhig ansprechen, äußeren Reiz geben (Kommando, Klatschen, Fuß oder Anti-Freezing-Stock als Hindernis)'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann Pflegeinterventionen bei **Freezing** und für eine **sichere Fortbewegung** *beschreiben*.',
          hinten: [
            'bei Freezing äußere Reize setzen: Fuß oder Anti-Freezing-Stock als Hindernis, Kommandos, Klatschen, Singen, Markierung zum Übersteigen',
            'Stolperfallen vermeiden; feste Stühle mit Seitenlehnen',
            'weite, leicht zu schließende Kleidung; Schuhe ohne Gummisohle'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann *beschreiben*, wie Pflegefachpersonen **Essen und Trinken** praktisch erleichtern.',
          hinten: [
            'ganz nah an den Tisch setzen, Tisch oder Teller erhöhen → Weg zum Mund möglichst kurz',
            'Hilfsmittel: Warmhalteteller, tremorkompensierender Löffel, Teller mit erhöhtem Rand, Antirutschmatte, Becher mit zwei Griffen',
            'kleine Portionen; Zeit lassen'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann Besonderheiten bei **Ernährung, Flüssigkeit und Schlucken** *begründen*.',
          hinten: [
            'ausreichend Flüssigkeit → starkes Schwitzen',
            'erhöhter **Kalorienbedarf** → Tremor und Rigor verbrauchen Energie',
            'auf **Schluckstörungen** achten → Aspirationsgefahr',
            'Essen schmackhaft machen → verminderter Geruchssinn; Speisen nicht zu heiß oder zu kalt → Missempfindungen'
          ] },
        { nr: 2, afb: 'I',
          vorne: 'Ich kann wichtige **Prophylaxen** bei Parkinson *nennen* und eine Besonderheit beim Bett *begründen*.',
          hinten: [
            'Pneumonie-, Sturz-, Dekubitus-, Kontraktur-, Soor-/Parotitis-, Obstipations- und Intertrigoprophylaxe – individuell nach Gefährdung',
            'kein zu weiches Bett bzw. keine Weichlagerungsmatratze → erschwert bei Bewegungsarmut zusätzlich das Drehen'
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      titel: 'Pflegeprozess: PESR, Pflegeziele, Interventionen',
      karten: [
        { nr: 1, afb: 'II',
          vorne: 'Ich kann ein **aktuelles Pflegeproblem** bei Parkinson im PESR-Schema *erläutern*: **Schlucken**',
          hilfe: 'pesr',
          hinten: [
            '**P:** beeinträchtigtes Schlucken mit Aspirationsgefahr',
            '**E:** Rigor und Akinese der Schluck- und Zungenmuskulatur, dünnflüssige Kost',
            '**S:** verschluckt sich bei Suppe und Wasser, hustet, Speichelfluss, braucht 45 Minuten für das Essen (mit Zeile)',
            '**R:** geistig klar, setzt Anleitung um, Logopädie verordnet'
          ] },
        { nr: 1, afb: 'II',
          vorne: 'Ich kann ein **Risiko-Pflegeproblem** im PESR-Schema *erläutern*: **Sturzgefahr**',
          hilfe: 'pesr',
          hinten: [
            '**P:** Sturzgefahr – das Problem droht erst; statt E und S nennen Sie **Risikofaktoren**',
            '**RF:** Freezing, kleine, schlurfende Schritte, Sturz in der Vorgeschichte, nächtliche Toilettengänge, lose Teppiche',
            '**R:** nutzt Rollator, kennt Strategien gegen Freezing, ist motiviert'
          ] },
        { nr: 2, afb: 'II',
          vorne: 'Ich kann ein **überprüfbares Pflegeziel** *formulieren*.',
          hinten: [
            'Pflegeempfänger als Subjekt · **beobachtbar oder messbar** · realistisch · **mit Zeitangabe**',
            'Beispiel: „Herr Lenz isst und trinkt ab sofort bei jeder Mahlzeit, ohne sich zu verschlucken.“',
            'kein „soll“, keine Maßnahme („erhält …“), nichts Unrealistisches („wird wieder gesund“)'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Schluckstörung** *entwickeln* und *begründen*.',
          hinten: [
            'aufrecht und nah am Tisch sitzen, Kinn leicht zur Brust → schützt die Atemwege, kurzer Weg zum Mund',
            'Getränke und Suppe nach logopädischer Empfehlung andicken → Dünnflüssiges wird leicht aspiriert',
            'kleine Bissen, Zeit lassen, nicht drängen → Zeitdruck verstärkt die Symptome; Logopädie organisieren'
          ] },
        { nr: 3, afb: 'III',
          vorne: 'Ich kann Pflegeinterventionen bei **Sturzgefahr** *entwickeln* und *begründen*.',
          hinten: [
            'lose Teppiche entfernen, Nachtlicht, Haltegriffe → Stolperfallen und dunkle Wege sind Risikofaktoren',
            'bei Freezing Strategie aus der Physiotherapie nutzen (Markierung, Mitzählen) → äußere Reize lösen die Blockade',
            'Rollator in Reichweite, feste Schuhe ohne Gummisohle → sichere Fortbewegung'
          ] },
        { nr: 4, afb: 'I',
          vorne: 'Ich kann Kriterien zur **Evaluation** *nennen*.',
          hinten: [
            'Ist das Ziel erreicht? Beobachtbare Kriterien prüfen, z. B. Zahl der Stürze, Verschlucken beim Essen, Stuhlfrequenz, Gewicht, Trinkmenge',
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
          ] },
        { nr: 3, afb: 'II',
          vorne: 'Ich kann zu Komplikationen der akinetischen Krise passende **Prophylaxen** *ableiten*.',
          hinten: [
            '**Aspirationspneumonie:** Oberkörper hoch, absaugen, Mundpflege, nichts über den Mund',
            '**Dekubitus:** Positionswechsel, Fersen frei lagern, Haut kontrollieren',
            '**Thrombose:** Beine durchbewegen, Thromboseprophylaxestrümpfe nach Anordnung',
            '**Exsikkose:** bilanzieren, Haut und Schleimhäute beobachten'
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
