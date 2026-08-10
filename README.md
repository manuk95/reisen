# Unsere Reisen

Statischer, installierbarer Astro-Reiseführer für **mehrere persönliche Reisen**. **Georgien 2026** ist die erste Reise; weitere Reisen sollen später mit derselben generischen Struktur ergänzt werden.

Die Website wird nicht pro Reise kopiert. Wiederverwendbare Komponenten, Content Collections, Navigation, Suche, Karten- und Offline-Logik bleiben gemeinsam; reisespezifische Inhalte werden über `trip` und eigene Tages-/Inhaltsdateien getrennt.

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

## Dokumentation

Die aktive Projektdokumentation liegt unter [`docs/`](docs/README.md).

Wichtig:

- [`AGENTS.md`](AGENTS.md) – dauerhafte technische/redaktionelle Regeln
- [`docs/ARBEITSPLAN_AKTUELL.md`](docs/ARBEITSPLAN_AKTUELL.md) – einzige aktuelle Pendenz- und Reihenfolgenliste
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) – dauerhafter Projekt-/Reisekontext
- [`docs/ANFORDERUNGEN_TAGESPLAN.md`](docs/ANFORDERUNGEN_TAGESPLAN.md) – aktive Spezifikation für die neue Tagesplan-Darstellung
- [`docs/archive/`](docs/archive/README.md) – historische Pläne und Recherchestände; **keine aktuellen Arbeitsanweisungen**

## Arbeitsteilung

### ChatGPT-Web

Bevorzugt für Recherche, Quellenvergleich, Reiseplanung, Markdown-/Textbearbeitung, Tabellen, Kosten, Inhaltskontrollen und einfache redaktionelle Repository-Änderungen.

### Codex

Bevorzugt für technisch anspruchsvolle Aufgaben wie Astro-/TypeScript-Komponenten, generische Renderer/Parser, Schemas, Validatoren, komplexe UI-Logik, Service Worker/PWA, automatisierte Tests und finale technische QA.

Codex soll nicht unnötig aufwändige Recherche- und Textarbeit übernehmen, wenn diese in ChatGPT-Web einfacher erledigt werden kann.

## Neue Reise ergänzen

Grundprinzip:

1. neuen Reiseeintrag anlegen,
2. Tages-Markdown-Dateien für die Reise ergänzen,
3. Orte, Sehenswürdigkeiten, Genuss, Restaurants, Unterkünfte und Wissen mit dem passenden `trip` verknüpfen,
4. vorhandene generische Übersichten und Komponenten wiederverwenden,
5. nur bei echten neuen Anforderungen die gemeinsame Technik erweitern.

Keine hart codierten Georgien-Annahmen in wiederverwendbaren Komponenten einbauen.

## Datenschutz

Keine neuen privaten DOCX/PDF-Quelldokumente, Buchungscodes, Pass-/Versicherungsdaten, Zahlungsangaben oder privaten Kontakte committen. Im Repository bereits historisch vorhandene Quelldokumente werden im aktuellen Arbeitsplan separat als Datenschutz-Pendenz behandelt; bestehende Git-History wird nicht ohne ausdrücklichen Auftrag verändert.
