# Projektdokumentation

Dieses Repository ist die gemeinsame technische Basis für **mehrere persönliche Reiseführer**. Georgien 2026 ist die erste Reise, aber Architektur, Komponenten, Content Collections, Templates und Arbeitsregeln sollen auch für spätere Reisen wiederverwendbar bleiben.

## Aktive Dokumente

Für laufende Arbeiten gelten nur die folgenden Dokumente als aktive Vorgaben:

- [`../AGENTS.md`](../AGENTS.md) – dauerhafte technische, redaktionelle und rechtliche Regeln für das gesamte Repository.
- [`../README.md`](../README.md) – Einstieg, Entwicklung und grundsätzliche Arbeitsweise.
- [`ARBEITSPLAN_AKTUELL.md`](ARBEITSPLAN_AKTUELL.md) – **einzige zentrale Quelle für offene Aufgaben, Reihenfolge und Zuständigkeit**.
- [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) – dauerhafte Projektentscheidungen und stabile Eckdaten der aktuell geplanten Reisen.
- [`ANFORDERUNGEN_TAGESPLAN.md`](ANFORDERUNGEN_TAGESPLAN.md) – aktive technische/redaktionelle Spezifikation der Tagesplan-Seiten.

## Archiv

Historische Recherche-, Umsetzungs- und Planungsstände liegen unter [`archive/`](archive/).

**Archivierte Dateien sind keine aktuellen Arbeitsanweisungen.** Sie dienen nur als Nachweis früherer Entscheidungen, Recherche- oder Projektstände. Falls ein Archivdokument einer aktiven Datei widerspricht, gilt immer die aktive Dokumentation beziehungsweise der aktuelle Quellcode.

## Arbeitsteilung

### ChatGPT-Web

Bevorzugt für zeitaufwändige, aber technisch einfache Arbeiten:

- Webrecherche und Quellenvergleich
- Reiseplanung und Plausibilitätskontrolle
- Schreiben und Überarbeiten von Markdown-Inhalten
- Tabellen, Vergleiche und Kostenrechnungen
- inhaltliche Audits
- einfache redaktionelle Änderungen im Repository

### Codex

Bevorzugt nur für technisch anspruchsvollere Arbeiten:

- Astro-/TypeScript-Komponenten
- generische Renderer und Parser
- Content-Schemas und Validatoren
- Routing und wiederverwendbare Datenmodelle
- Service Worker / PWA
- automatisierte Tests
- komplexe responsive oder interaktive UI-Logik
- finale technische QA und Refactorings

Inhalte sollen nicht unnötig von Codex recherchiert oder geschrieben werden, wenn ChatGPT-Web diese Aufgabe effizienter erledigen kann.

## Mehrere Reisen

Neue Reisen sollen nicht durch Kopieren der gesamten Website entstehen. Stattdessen werden sie über dieselbe generische Struktur ergänzt:

1. neuer Eintrag in der Reise-Collection,
2. eigene Tages-Markdown-Dateien,
3. Inhalte mit dem passenden `trip`-Bezug,
4. wiederverwendbare generische Übersichten, Komponenten und Navigation,
5. reisespezifische Inhalte und Assets ohne hart codierte Georgien-Annahmen in gemeinsamen Komponenten.

Neue technische Lösungen sind deshalb möglichst **reiseübergreifend** zu bauen.