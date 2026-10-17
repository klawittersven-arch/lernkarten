# lernkarten
Digitale Lernkarten zu den Ich-kann-Listen

Die Schülerinnen und Schüler scannen den QR-Code am Ende einer Ich-kann-Liste und lernen am
Smartphone mit Karteikarten (ähnlich wie Quizlet): **vorne die Kompetenz, hinten die Beispielantwort.**

| Kartensatz | Adresse (QR-Code) |
|---|---|
| KB I – Diabetes mellitus (Klausur 09.11.2026), 85 Karten | https://klawittersven-arch.github.io/lernkarten/kb1-diabetes/ |
| KB II – Beratung (Klausur 09.11.2026), 79 Karten | https://klawittersven-arch.github.io/lernkarten/kb2-beratung/ |

Übersicht aller Kartensätze: https://klawittersven-arch.github.io/lernkarten/ ·
Highscore-Listen: https://klawittersven-arch.github.io/lernkarten/highscore/

## So funktioniert es für die SuS

- Karte antippen → sie dreht sich um. Dann **„Gewusst“** oder **„Noch nicht“** tippen
  (oder nach rechts/links wischen). „Zurück“ (Pfeil oben rechts) nimmt einen Fehltipp zurück.
- Am Ende einer Runde: „x Karten wiederholen“ – so lange, bis alles sitzt.
- Auf der Startseite: Arbeitsblätter einzeln an- und abwählen, „Karten mischen“, Lernstand pro
  Arbeitsblatt. Eine angefangene Runde lässt sich später fortsetzen.
- **Belohnung:** Wer alle Karten eines Satzes einmal durchgegangen ist, schaltet eine Runde des
  Spiels „Diabetes Run!“ frei – siehe unten.
- **Datenschutz:** keine Anmeldung, keine Cookies, keine fremden Schriften. Der Lernstand liegt nur
  im Browser des Handys. Nach dem ersten Aufruf funktioniert alles auch offline. Nur wer nach einer
  Spielrunde seinen Namen einträgt, sendet Name und Punkte an die Highscore-Liste (Ihre Google-Tabelle).

## Spielrunden „Diabetes Run!“ und Highscore-Listen

- **Freischalten:** Jede Karte, die umgedreht und dann bewertet wurde, zählt – egal ob „gewusst“
  oder „noch nicht“ (Fleiß zählt, nicht Auswendiglernen). Ein Durchgang ist vollständig, wenn jede
  Karte des Satzes einmal gezählt wurde – in beliebig vielen Runden, gemischt oder nach Themen.
  Nach jedem vollständigen Durchgang gibt es eine Spielrunde. KB I und KB II zählen getrennt.
- **Nicht zu übersehen:** Sobald die letzte fehlende Karte bewertet ist, erscheint bildschirmfüllend
  „Super! … Zur Belohnung dürfen Sie jetzt eine Runde „Diabetes Run!“ spielen …“ mit den Knöpfen
  „🎮 Jetzt spielen“ und „Nein, danke – weiterlernen“. Wurde die App vorher geschlossen, erscheint die
  Gratulation beim nächsten Öffnen. Beim Lernen zeigt die Kopfzeile „🎮 noch x Karten bis zur
  Spielrunde“; wer eine Karte ohne Umdrehen bewertet, bekommt einmal den Tipp, dass sie so nicht zählt.
  Auf der Startseite zeigt der Kasten „🎮 Belohnungsspiel: Diabetes Run!“ Fortschritt und freie Runden.
- **Spielen:** Jede freie Runde lässt sich genau einmal spielen. Danach tragen sich die SuS mit
  Vorname und erstem Buchstaben des Nachnamens ein („Mia S.“).
- **Highscore:** eine Liste je Kartensatz, je Name zählt die beste Runde. Erreichbar über den
  unauffälligen Link „🏆 Highscore-Liste“ ganz unten auf jeder Startseite.
- Ohne Internet erspielte Punkte werden auf dem Handy aufbewahrt und beim nächsten Öffnen der
  Lernkarten oder der Highscore-Liste nachgetragen.

### Schwierigkeit des Spiels

Kein Zeitlimit – gute Spielerinnen und Spieler können lange spielen, die Punkte streuen deshalb.
Gemessen mit `tests/schwierigkeit.test.js` (schwerstes Hindernis-Muster je Zeitpunkt; zum Vergleich:
Reaktionszeit beim Menschen mit Entscheidung „springen oder ducken?“ ca. 0,3–0,45 s):

| Zeit | Tempo | Hindernisse/min | Zeit zum Reagieren | |
|---|---|---|---|---|
| 0:00–0:30 | 150–210 px/s | 42, nur einfache | über 1 s | alle kommen mit |
| 1:00 | 280 px/s | 46 | 0,85 s | |
| 2:00 | 420 px/s | 51 | 0,54 s | |
| 3:00 | 560 px/s | 59 | 0,38 s | schwer – für gute Reaktion machbar |
| 4:00 | 700 px/s | 66 | 0,28 s | kaum noch zu schaffen |
| 5:00 | 840 px/s | 67 | 0,21 s | praktisch unmöglich |

Ab 30 Sekunden steigen Tempo, Zahl der Hindernisse und der Anteil schwieriger Abfolgen (Lkw mit
Doppelsprung, Schlaglöcher, Hindernis mit Wespenschwarm dahinter) gleichmäßig bis zur 4. Minute;
danach wird nur noch das Tempo höher. Jedes Muster bleibt mit der richtigen Eingabe machbar.
Stellschrauben: Funktion `muster()` und die Konstanten darüber in `docs/spiel/spiel.js`.
(Die Fassung im Repository `kb2-beratung` für den Unterricht endet weiterhin nach etwa 2 Minuten.)

### Klassen: eigene QR-Codes und eigene Highscore-Listen

Jede Klasse bekommt eigene QR-Codes. Die Adresse enthält die Klasse, z. B.
`…/lernkarten/kb1-diabetes/?klasse=3bfp2-1`. Das Handy merkt sich die Klasse beim ersten Scannen;
Lernkarten, Spiel und Highscore sind für alle Klassen gleich, nur die Highscore-Listen sind getrennt
(in der Google-Tabelle je ein Blatt, z. B. `kb1-diabetes-3bfp2-1`). Die SuS sehen nur die Listen
ihrer Klasse; oben in der App steht „Klasse 3BFP2/1“.

| | 3BFP2/1 | 3BFP2/2 |
|---|---|---|
| KB I | `qr/qr_kb1-diabetes_3bfp2-1.png` | `qr/qr_kb1-diabetes_3bfp2-2.png` |
| KB II | `qr/qr_kb2-beratung_3bfp2-1.png` | `qr/qr_kb2-beratung_3bfp2-2.png` |

- **Klassen ändern oder ergänzen:** in `docs/app/einstellungen.js` bei `klassen`, danach QR-Codes erzeugen:
  `python werkzeuge/qr_erzeugen.py --sammelblatt QR-Codes_Klassen.docx` (alle Kästen zum Kopieren in die
  Ich-kann-Listen) oder einzeln `python werkzeuge/qr_erzeugen.py kb1-diabetes --klasse 3bfp2-1 Liste.docx`.
- **Zurücksetzen** je Klasse und Kartensatz:
  `…/highscore/?liste=kb1-diabetes&klasse=3bfp2-1&zuruecksetzen=SCHLÜSSEL`.
- Ohne Klasse in der Adresse (alte QR-Codes `qr_kb1-diabetes.png`) landen Einträge in den Listen ohne Klasse.
- Das Google-Apps-Script muss dafür nicht geändert werden.

### Highscore-Liste einrichten (einmalig, ca. 10 Minuten)

1. In Google Drive: **Neu → Google Tabellen → Leere Tabelle**, Name z. B. „Lernkarten Highscore“.
2. In der Tabelle: **Erweiterungen → Apps Script**.
3. Den vorhandenen Text (`function myFunction() …`) komplett löschen und den gesamten Inhalt von
   `werkzeuge/highscore-apps-script.gs` einfügen. In der Zeile `var RESET_SCHLUESSEL = '…'` einen
   eigenen geheimen Schlüssel eintragen (mindestens 12 Buchstaben/Ziffern). **Speichern** (Diskette).
4. Oben rechts **Bereitstellen → Neue Bereitstellung**. Beim Zahnrad neben „Typ auswählen“ **Web-App**
   wählen. *Ausführen als:* **Ich**, *Zugriff:* **Jeder** → **Bereitstellen**.
5. **Zugriff autorisieren** → Ihr Google-Konto → Hinweis „Google hat diese App nicht überprüft“ →
   **Erweitert** → **Zu „…“ wechseln (unsicher)** → **Zulassen**. (Die Warnung erscheint bei jedem
   selbst geschriebenen Skript; es greift nur auf diese eine Tabelle zu.)
6. Die **Web-App-URL** kopieren (endet auf `/exec`).
7. In `docs/app/einstellungen.js` die Adresse bei `highscoreAdresse: ''` zwischen die Hochkommas
   setzen → „Commit changes“. Nach 1–2 Minuten ist die Liste aktiv.

Den geheimen Schlüssel **nie** in das Repository schreiben – es ist öffentlich.

### Highscore-Liste betreuen

- **Zurücksetzen** (nur mit Ihrem Schlüssel), je Liste ein eigener Link:
  `https://klawittersven-arch.github.io/lernkarten/highscore/?liste=kb1-diabetes&zuruecksetzen=SCHLÜSSEL`
  bzw. `…?liste=kb2-beratung&zuruecksetzen=SCHLÜSSEL`. Die Seite fragt noch einmal nach und entfernt
  den Schlüssel sofort aus der Adresszeile.
- **Verbindung testen:** Auf derselben Seite (über den Zurücksetzen-Link) sendet „Testeintrag senden“
  einen Eintrag „Test T.“ mit 1 Punkt. Erscheint er in der Liste, funktioniert alles. Danach die Zeile
  in der Tabelle löschen oder die Liste zurücksetzen.
- **Einzelne Einträge löschen:** in der Google-Tabelle die Zeile löschen. Jedes Kartenset hat ein
  eigenes Tabellenblatt (`kb1-diabetes`, `kb2-beratung`), jede Zeile ist eine gespielte Runde.
  Versehentlich zurückgesetzt? *Datei → Versionsverlauf* in der Tabelle.
- **Gespeichert** werden nur Zeitpunkt, Name („Mia S.“), Punkte und zwei Zufallskennungen
  (Gerät, Runde – gegen doppelte Einträge und Massen-Einträge).
- **Skript geändert?** *Bereitstellen → Bereitstellungen verwalten → Stift → Version: Neue Version →
  Bereitstellen* – die Adresse bleibt gleich.
- **Einstellungen** in `docs/app/einstellungen.js`: Durchgänge pro Spielrunde (`durchgaengeProSpiel`),
  Spiel aus-/einschalten (`spielAn`), Namensfilter (`sperrwoerter`), alle Texte rund ums Spiel und
  die „Wusstest du?“-Sätze.
- **Grenzen:** Alles läuft auf dem Handy. Technisch versierte SuS könnten Freischaltung oder Punkte
  manipulieren; das Skript lehnt unplausible Werte ab (z. B. mehr als 20 000 Punkte, mehr als
  15 Einträge pro Stunde und Gerät), unpassende Einträge löschen Sie in der Tabelle.

## Karten ändern

Alle Texte eines Kartensatzes stehen in **`docs/<kartensatz>/karten.js`**, also
`docs/kb1-diabetes/karten.js` bzw. `docs/kb2-beratung/karten.js`.
Auf GitHub die Datei öffnen, auf den Stift („Edit this file“) klicken, ändern, unten „Commit changes“.
Nach 1–2 Minuten ist die Änderung online.

- Nur den Text **zwischen den einfachen Hochkommas** `' … '` ändern; Hochkommas, Kommas und
  Klammern `{ } [ ]` stehen lassen. Ein einfaches Hochkomma im Text schreiben Sie als `\'`.
- `**fett**` und `*kursiv*` funktionieren wie in der Ich-kann-Liste.
- Eine Karte hat `vorne` (Kompetenz), optional `fall` (Kasten mit Fall oder Aussage),
  `hinten` (ein Text oder eine Liste von Stichpunkten) und optional `hinweis` (Kasten unten).
  `nr` (Nummer in der Ich-kann-Liste) und `afb` (z. B. `'I + II'`) erscheinen oben auf der Karte.
  Die genaue Anleitung steht oben in der Datei.
- Ganz oben in `karten.js` steht optional `hinweis: '…'` – ein Kasten auf der Startseite
  (bei KB II: „In der Klausur kommt ein anderer Fall …“).
- Ein Thema heißt wie sein Arbeitsblatt (`ab: '…'`, bei mehreren ABs eine Liste `['…', '…']`).
  Ist das zu lang, setzt `titel: '…'` einen kürzeren Namen für die Liste und die Karten.
- Neue Karte: eine vorhandene Karte samt `{ … },` kopieren und darunter einfügen.

**Offen (KB I):** Für den Abschnitt „Langzeitschäden und diabetisches Fußsyndrom“ steht in der
Ich-kann-Liste noch ein Platzhalter für den AB-Titel. Sobald er feststeht, in `karten.js`
`titel: '…'` durch `ab: 'Titel des Arbeitsblatts'` ersetzen.

## GitHub Pages einschalten (einmalig)

1. Im Repository oben **Settings** → links **Pages**.
2. „Build and deployment“ → Source: **Deploy from a branch**.
3. Branch: **main**, Ordner: **/docs** → **Save**.
4. Nach etwa 1–5 Minuten sind die Seiten unter den Adressen oben erreichbar.

## Neuer Kartensatz für eine andere Ich-kann-Liste

1. Den Ordner `docs/kb1-diabetes/` kopieren, z. B. nach `docs/kb3-herzinsuffizienz/`
   (Ordnername = Teil der Adresse: klein, ohne Umlaute und Leerzeichen).
2. In der Kopie `karten.js` neu befüllen und dort `speicherName` ändern (z. B. `'kb3-herzinsuffizienz'`).
   In `index.html` und `manifest.json` den Titel anpassen.
3. In `docs/index.html` eine Zeile für den neuen Kartensatz ergänzen.
4. QR-Code erzeugen (siehe unten).
5. Für die automatischen Tests in `tests/lernkarten.test.js` oben bei `SAETZE` eine Zeile ergänzen.

Programmlogik und Gestaltung (`docs/app/`) gelten für alle Kartensätze gemeinsam.

## QR-Code

`qr/qr_kb1-diabetes.png` und `qr/qr_kb2-beratung.png` zeigen auf die Adressen der Kartensätze.
Neu erzeugen und gleich unten in die Ich-kann-Liste setzen:

```
pip install segno python-docx zxing-cpp pillow
python werkzeuge/qr_erzeugen.py kb1-diabetes 00_KB1_Ich_kann_Liste_Diabetes_v12.docx
python werkzeuge/qr_erzeugen.py kb2-beratung KB2_Ich_kann_Liste.docx
```

Ergebnis: `…_mit_QR.docx` neben der Originaldatei, das Original bleibt unverändert. Die Ich-kann-Listen
selbst liegen bewusst nicht in diesem Repository, denn es ist öffentlich.

## Dateien

```
docs/                       ← alles, was GitHub Pages veröffentlicht
  index.html                ← Übersicht aller Kartensätze
  app/                      ← gemeinsame Programmlogik und Gestaltung
    einstellungen.js        ← Spielrunden und Highscore: Einstellungen und Texte
    lernkarten.js, lernkarten.css, highscore.js, icon-192.png, icon-512.png
  spiel/                    ← „Diabetes Run!“ (spiel/?satz=kb1-diabetes)
  highscore/                ← Highscore-Listen (highscore/?liste=kb1-diabetes)
  kb1-diabetes/             ← Kartensatz KB I – Diabetes mellitus
    karten.js               ← ALLE Kartentexte
    index.html, manifest.json, sw.js (Offline-Speicher)
  kb2-beratung/             ← Kartensatz KB II – Beratung (gleicher Aufbau)
qr/                         ← QR-Codes (PNG)
werkzeuge/qr_erzeugen.py    ← erzeugt QR-Codes und setzt sie in die Ich-kann-Liste
werkzeuge/highscore-apps-script.gs ← Skript für die Google-Tabelle (Highscore)
tests/                      ← automatische Tests (siehe tests/README.md)
```

Nach größeren Änderungen an `docs/app/` in jedem `docs/<kartensatz>/sw.js` die Zeile `var VERSION = 'v1';`
auf `'v2'` usw. erhöhen, dann erneuern alle Handys ihren Offline-Speicher. Textänderungen in
`karten.js` kommen auch ohne das an, sobald ein Handy Netz hat.
