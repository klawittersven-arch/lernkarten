# lernkarten
Digitale Lernkarten zu den Ich-kann-Listen

Die Schülerinnen und Schüler scannen den QR-Code am Ende einer Ich-kann-Liste und lernen am
Smartphone mit Karteikarten (ähnlich wie Quizlet): **vorne die Kompetenz, hinten die Beispielantwort.**

| Kartensatz | Adresse (QR-Code) |
|---|---|
| KB I – Diabetes mellitus (Klausur 09.11.2026), 96 Karten | https://klawittersven-arch.github.io/lernkarten/kb1-diabetes/ |

Übersicht aller Kartensätze: https://klawittersven-arch.github.io/lernkarten/

## So funktioniert es für die SuS

- Karte antippen → sie dreht sich um. Dann **„Gewusst“** oder **„Noch nicht“** tippen
  (oder nach rechts/links wischen). „Zurück“ (Pfeil oben rechts) nimmt einen Fehltipp zurück.
- Am Ende einer Runde: „x Karten wiederholen“ – so lange, bis alles sitzt.
- Auf der Startseite: Arbeitsblätter einzeln an- und abwählen, „Karten mischen“, Lernstand pro
  Arbeitsblatt. Eine angefangene Runde lässt sich später fortsetzen.
- **Datenschutz:** keine Anmeldung, keine Cookies, keine fremden Server oder Schriften. Der
  Lernstand liegt nur im Browser des Handys. Nach dem ersten Aufruf funktioniert alles auch offline.

## Karten ändern

Alle Texte eines Kartensatzes stehen in **`docs/kb1-diabetes/karten.js`**.
Auf GitHub die Datei öffnen, auf den Stift („Edit this file“) klicken, ändern, unten „Commit changes“.
Nach 1–2 Minuten ist die Änderung online.

- Nur den Text **zwischen den einfachen Hochkommas** `' … '` ändern; Hochkommas, Kommas und
  Klammern `{ } [ ]` stehen lassen. Ein einfaches Hochkomma im Text schreiben Sie als `\'`.
- `**fett**` und `*kursiv*` funktionieren wie in der Ich-kann-Liste.
- Eine Karte hat `vorne` (Kompetenz), optional `fall` (Kasten mit Fall oder Aussage),
  `hinten` (ein Text oder eine Liste von Stichpunkten) und optional `hinweis` (Kasten unten).
  Die genaue Anleitung steht oben in der Datei.
- Neue Karte: eine vorhandene Karte samt `{ … },` kopieren und darunter einfügen.

**Offen:** Für den Abschnitt „Langzeitschäden und diabetisches Fußsyndrom“ steht in der
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

Programmlogik und Gestaltung (`docs/app/`) gelten für alle Kartensätze gemeinsam.

## QR-Code

`qr/qr_kb1-diabetes.png` zeigt auf die Adresse von KB I – Diabetes mellitus. Neu erzeugen und
gleich unten in die Ich-kann-Liste setzen:

```
pip install segno python-docx zxing-cpp pillow
python werkzeuge/qr_erzeugen.py kb1-diabetes 00_KB1_Ich_kann_Liste_Diabetes_v12.docx
```

Ergebnis: `…_mit_QR.docx` neben der Originaldatei, das Original bleibt unverändert. Die Ich-kann-Listen
selbst liegen bewusst nicht in diesem Repository, denn es ist öffentlich.

## Dateien

```
docs/                       ← alles, was GitHub Pages veröffentlicht
  index.html                ← Übersicht aller Kartensätze
  app/                      ← gemeinsame Programmlogik und Gestaltung
    lernkarten.js, lernkarten.css, icon-192.png, icon-512.png
  kb1-diabetes/             ← Kartensatz KB I – Diabetes mellitus
    karten.js               ← ALLE Kartentexte
    index.html, manifest.json, sw.js (Offline-Speicher)
qr/                         ← QR-Codes (PNG)
werkzeuge/qr_erzeugen.py    ← erzeugt QR-Codes und setzt sie in die Ich-kann-Liste
tests/                      ← automatische Tests (siehe tests/README.md)
```

Nach größeren Änderungen an `docs/app/` in `docs/kb1-diabetes/sw.js` die Zeile `var VERSION = 'v1';`
auf `'v2'` usw. erhöhen, dann erneuern alle Handys ihren Offline-Speicher. Textänderungen in
`karten.js` kommen auch ohne das an, sobald ein Handy Netz hat.
