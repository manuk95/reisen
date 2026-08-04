# Unsere Reisen

Statischer, installierbarer Astro-Reiseführer; erste Reise ist **Georgien 2026**.

## Entwicklung
```bash
npm ci
npm run dev
npm run check
npm run test
npm run build
npm run preview
```
Pagefind wird nach dem Astro-Build erzeugt. GitHub Actions veröffentlicht `main` unter `/reisen/`. In GitHub einmalig **Settings → Pages → Source: GitHub Actions** wählen.

## Neue Seite per Codex-Prompt ergänzen
1. Inhaltstyp und stabile Beziehungen nennen, etwa: „Füge Chatschapuri in `genuss` hinzu; `related` Tbilisi, Kutaisi, Batumi; offizielle Quellen und lizenziertes lokales Bild.“
2. Codex prüft `AGENTS.md`, kopiert die passende Datei aus `templates/`, belegt jede zeitabhängige Aussage und ergänzt keine manuelle Navigation.
3. Danach Schema, Build, Links, Bildrechte und mobile Darstellung prüfen und im PR dokumentieren.

Die privaten DOCX/PDF-Quelldokumente werden durch `.gitignore` ausgeschlossen und dürfen nie veröffentlicht werden.
