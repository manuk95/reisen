# Unsere Reisen

Statischer, installierbarer Astro-Reiseführer für **mehrere persönliche Reisen**. **Georgien 2026** ist die erste Reise; weitere Reisen sollen später mit derselben generischen Struktur ergänzt werden.

Die Website wird nicht pro Reise kopiert. Wiederverwendbare Komponenten, Content Collections, Navigation, interne Volltextsuche, Karten- und Offline-Logik bleiben gemeinsam; reisespezifische Inhalte werden über `trip` und eigene Inhaltsdateien getrennt.

## Entwicklung

```bash
npm ci
npm run dev
npm run check
npm run test
npm run build
npm run preview
```

Pagefind erzeugt nach dem Astro-Build den **internen** Suchindex. GitHub Actions veröffentlicht `main` unter `/reisen/`; unter Settings → Pages muss GitHub Actions als Quelle gewählt sein.

## Dokumentation

- [`AGENTS.md`](AGENTS.md) – technische und redaktionelle Regeln
- [`docs/ARBEITSPLAN_AKTUELL.md`](docs/ARBEITSPLAN_AKTUELL.md) – aktive Pendenzenliste
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) – Projekt- und Reisekontext
- [`docs/ANFORDERUNGEN_TAGESPLAN.md`](docs/ANFORDERUNGEN_TAGESPLAN.md) – Spezifikation der Tagespläne
- [`docs/archive/`](docs/archive/README.md) – historische Pläne, keine aktuellen Anweisungen

## Arbeitsteilung

**ChatGPT-Web:** Recherche, Quellenvergleich, Reiseplanung, Markdown-/Textbearbeitung, Tabellen, Kosten, Inhaltskontrollen und einfache redaktionelle Änderungen.

**Codex:** anspruchsvolle Astro-/TypeScript-Komponenten, generische Renderer/Parser, Schemas, Validatoren, komplexe UI-Logik, Service Worker/PWA, automatisierte Tests und technische Qualitätssicherung.

## Neue Reise ergänzen

1. Reiseeintrag anlegen.
2. Tages-Markdown-Dateien ergänzen.
3. Orte, Sehenswürdigkeiten, Genuss, Restaurants, Unterkünfte und Wissen mit dem passenden `trip` verknüpfen.
4. Generische Übersichten und Komponenten wiederverwenden.
5. Nur bei echten neuen Anforderungen die gemeinsame Technik erweitern.

Keine hart codierten Georgien-Annahmen in wiederverwendbaren Komponenten einbauen.

## Auffindbarkeit und Datenschutz

Die Website und das Repository sind **öffentlich zugänglich**; dies ist beabsichtigt. Das gemeinsame HTML-Layout setzt `noindex`, die Sitemap-Generierung ist deaktiviert. Die interne Pagefind-Suche bleibt aktiv. `noindex` ist keine Zugriffssperre; bestehende Suchergebnisse können verzögert verschwinden.

Private Word-, PDF- und Excel-Eingabedokumente wurden am 22.09.2026 aus dem aktuellen Repository-Stand entfernt. Ihre ältere Git-Historie wurde **nicht** umgeschrieben. Die `.gitignore` schliesst diese Dateitypen bei neuen lokalen Arbeitsdateien aus. Das frühere Excel-Seitenregister ist daher für einen späteren historischen Soll-/Ist-Abgleich nur noch über einen alten Commit verfügbar. Keine Pass-/Buchungs-/Versicherungsnummern, privaten Kontakte, Zugangsdaten oder Zahlungsangaben committen.
