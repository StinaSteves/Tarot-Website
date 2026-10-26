# NYX · Tarot-Website

React/Vite-Website mit Tarot-Legungen, Ritualen, Preisen und Kontaktbereich.

## Lokal starten

```sh
npm ci
npm run dev
```

Das optionale Kontakt-Backend ist in [server/README.md](server/README.md) beschrieben.

## GitHub Pages

Pushes auf `main` starten `.github/workflows/pages.yml`: Tests, Build und Deployment.
In den Repository-Einstellungen muss Pages als Quelle **GitHub Actions** verwenden.

Öffentliche Adresse: https://stinasteves.github.io/Tarot-Website/

Pages liefert ausschließlich die statische Website aus. Der Workflow setzt
`VITE_STATIC_PREVIEW=true`: Das Kontaktformular zeigt einen Vorschauhinweis und
ist deaktiviert, bis ein separater Mailserver eingerichtet wird. Lokale Builds
bleiben davon unberührt. Impressum, Datenschutz und AGB enthalten noch markierte
Entwürfe und Platzhalter; siehe [Rechtstexte](src/legal/README.md).

Der Pages-Build verwendet `--base=/Tarot-Website/`. Interne Seitenlinks nutzen
`import.meta.env.BASE_URL`, damit sowohl lokale als auch veröffentlichte URLs stimmen.

## Prüfen

```sh
npm test
VITE_STATIC_PREVIEW=true npm run build -- --base=/Tarot-Website/
```
