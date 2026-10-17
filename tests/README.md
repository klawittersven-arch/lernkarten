# Automatische Tests

Die Tests nutzen [Playwright](https://playwright.dev) mit Chromium und starten selbst einen
kleinen lokalen Webserver, der den Ordner `docs/` wie GitHub Pages unter `/lernkarten/` ausliefert.

```
cd tests
npm install            # installiert Playwright
npx playwright install chromium
node lernkarten.test.js   # Inhalte, Bedienung, alle Karten auf großem und kleinem Handy, Offline (~4 Minuten)
node spiel.test.js        # Spielrunden, Highscore, Google-Apps-Script (lokal nachgebaut), Offline (~1 Minute)
node schwierigkeit.test.js  # Schwierigkeitskurve des Spiels: Reaktionszeit, Machbarkeit, Dichte (~10 Sekunden)
```

Ergebnisse des letzten Laufs liegen in `tests/ergebnisse/`.
