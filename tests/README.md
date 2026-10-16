# Automatische Tests

Die Tests nutzen [Playwright](https://playwright.dev) mit Chromium und starten selbst einen
kleinen lokalen Webserver, der den Ordner `docs/` wie GitHub Pages unter `/lernkarten/` ausliefert.

```
cd tests
npm install            # installiert Playwright
npx playwright install chromium
node lernkarten.test.js   # Inhalte, Bedienung, alle Karten auf großem und kleinem Handy, Offline (~2 Minuten)
```

Ergebnisse des letzten Laufs liegen in `tests/ergebnisse/`.
