# AGENTS.md – Reiseführer

## Ziel und Architektur

Dieses öffentliche Repository erzeugt persönliche, offline nutzbare Reiseführer für **mehrere Reisen**. Georgien 2026 ist die erste Reise, die technische Basis muss jedoch wiederverwendbar bleiben.

Astro, TypeScript, Content Collections und Markdown bauen eine rein statische Website. Pagefind indiziert den Build; Leaflet/OSM liefert nur online Kartenkacheln. Kein Tracking, Server, API-Key oder schweres UI-Framework.

Wiederverwendbare Komponenten, Renderer, Navigationen und Datenmodelle dürfen nicht unnötig Georgien-spezifisch implementiert werden. Reisespezifische Inhalte werden über `trip`, Slugs, Tagesdateien und Collections getrennt.

## Aktive Dokumentation

Vor Arbeiten zuerst prüfen:

1. `docs/ARBEITSPLAN_AKTUELL.md` – einzige zentrale Quelle für offene Aufgaben, Reihenfolge und Zuständigkeit.
2. `docs/PROJECT_CONTEXT.md` – dauerhafte Projekt- und Reisefakten.
3. aktive Spezifikationen unter `docs/`, aktuell insbesondere `docs/ANFORDERUNGEN_TAGESPLAN.md`.

Dateien unter `docs/archive/` sind **historische Dokumente und keine aktuellen Arbeitsanweisungen**. Historische Umsetzungskonzepte dürfen nicht eigenmächtig erneut ausgeführt werden.

## Arbeitsteilung

Codex soll primär die technisch anspruchsvollen Aufgaben übernehmen:

- Astro-/TypeScript-Komponenten
- generische Renderer/Parser
- Schemas und Validatoren
- Routing und wiederverwendbare Datenmodelle
- komplexe responsive/interaktive UI-Logik
- Service Worker / PWA
- automatisierte Tests und technische QA

Aufwändige Recherche, Quellenvergleich, Text-/Markdown-Erstellung, Tabellen, Kosten und inhaltliche Audits werden grundsätzlich ausserhalb von Codex vorbereitet, sofern der konkrete Auftrag nicht ausdrücklich etwas anderes verlangt.

Keine zusätzlichen Pendenz- oder Umsetzungskonzeptdateien anlegen. Neue offene Arbeiten in `docs/ARBEITSPLAN_AKTUELL.md` ergänzen. Separate Spezifikationen nur für grössere technische Themen erstellen und im Arbeitsplan referenzieren.

## Struktur

- `src/content/`: `reisen`, `reisetage`, `orte`, `sehenswuerdigkeiten`, `unterkuenfte`, `restaurants`, `genuss`, `wissen`, `praktisches`.
- `src/pages/`: generische, aus Collections gebaute Routen; keine manuell gepflegten Einzellisten.
- `src/components`, `src/layouts`, `src/styles`, `src/data`: UI, Layout, Tokens und Kartendaten.
- `public/`: ausschliesslich veröffentlichbare lokale Assets, Manifest und Service Worker.
- `templates/`: kopierbare Inhaltsvorlagen für mehrere Reisen.
- `docs/`: aktive Projektdokumentation.
- `docs/archive/`: historische Planung und Recherche; nicht als Soll-Stand verwenden.

## Inhalte und Benennung

Dateiname, `slug` und stabile interne ID sind kleingeschriebenes kebab-case. Obligatorische Felder richten sich nach dem jeweils aktuellen Collection-Schema. Grundsätzlich gehören zu kanonischen Item-Seiten `title`, `slug`, `trip`, `country`, `region`, `summary`, `categories`, `status`, `days`, `related`, mindestens eine belastbare `source` und `updated`.

Geo-Inhalte erhalten Dezimalgrad-Koordinaten. Bilder benötigen lokalen Pfad, präzisen Alternativtext sowie Urheber, Originalquelle, Lizenz und Bearbeitungsnotiz.

Neue Reisen entstehen als Reiseeintrag plus datierte Tagesdateien; Navigation und Übersichten müssen Collections abfragen. Orte, Sehenswürdigkeiten, Gerichte, Hotels und Restaurants verknüpfen sich über `trip`, `days`, `related`, Region und Kategorien. Keine parallele manuelle Linkliste anlegen.

### Tagespläne

Für die neue generische Tagesplan-Struktur gilt `docs/ANFORDERUNGEN_TAGESPLAN.md`.

Zielzustand:

- ein Reisetag bleibt vollständig in einer einzigen gut lesbaren Markdown-Datei editierbar;
- `## Tagesablauf` ist nach der Migration die alleinige redaktionelle Quelle für Reihenfolge, Zeiten und Kurzbezeichnungen der Programmpunkte;
- `###`-Programmpunkte dürfen optional Detailtext enthalten;
- fehlende optionale Inhalte dürfen keinen Buildfehler auslösen;
- keine doppelte Pflege desselben Ablaufs in Frontmatter und Markdown;
- technische Komplexität gehört in den Renderer, nicht in die Inhaltsdatei.

Solange die Migration noch nicht abgeschlossen ist, bestehende Tagesdaten nicht blind löschen. Migration und Schemaänderungen müssen rückwärtsverträglich beziehungsweise kontrolliert in einem eigenen technischen Arbeitspaket erfolgen.

Flüge nie nur im Fliesstext verstecken; bei Reisen mit eigener Flugseite sollen Tagesseiten auf diese strukturierte Information verweisen können.

## Hotels, Preise und Aktualität

Hotels sind `vorschlag`, bis eine Buchung ausdrücklich bestätigt ist. Plattformbewertungen nie mischen; Plattform und Aktualitätsstand nennen.

Preise, Öffnungen, Politik, Sicherheit, Einreise, Verkehr, Fahrpläne, Strassenzustände und Wetter sind zeitabhängig. Aktualitätsstände **inhaltsspezifisch** angeben; kein globales Datum so formulieren, als sei die gesamte Website gleichzeitig geprüft worden.

Nur Primärquellen oder anerkannte Fachquellen verwenden, soweit die Aussage dies erfordert. Subjektive Reiseberichte dürfen ergänzend genutzt werden, müssen aber klar als Erfahrungsberichte erkennbar bleiben. Keine Quelle oder Bewertung erfinden.

## Datenschutz und Rechte

Niemals neue private DOCX/PDF-Eingaben, Pass-/Buchungs-/Versicherungsnummern, private Kontakte, Zugangsdaten, Zahlungsangaben oder Wohnungsabwesenheiten committen.

Im Repository historisch bereits vorhandene Quelldokumente nicht ohne ausdrücklichen Auftrag löschen oder durch History-Rewrite bereinigen; der aktuelle Arbeitsplan führt dazu eine separate Datenschutz-Pendenz.

Standort nur nach Klick lokal verarbeiten. Keine Analyse-, Werbe- oder Trackingdienste. Fremdbilder nur bei belegter kompatibler Lizenz lokal speichern; ansonsten weglassen.

## Technik und Qualität

Der unveränderliche GitHub-Pages-Basispfad ist `/reisen/`; Links, Canonicals, Bilder, Suche, Manifest, Service Worker und Cache müssen ihn berücksichtigen.

Touch-Ziele ≥44 px, semantisches HTML, Fokus, Alttexte, Kontrast, Dark Mode, Druck und reduzierte Bewegung erhalten.

Vor PR beziehungsweise vor Abschluss technisch relevanter Arbeiten mindestens:

```bash
npm ci
npm run check
npm run test
npm run build
```

Zusätzlich je nach Änderung interne Links, Bilder, Metadaten, Manifest/SW, Offline-Fallback, Suche, Karte mit abgelehntem Standort, Datumslogik und Viewports 390/768/1440 prüfen.

Bei PWA-relevanten Änderungen Altversion → Neuversion, Offline und mehrere Tabs testen.

Technisch grössere Änderungen auf eigenem Branch durchführen und nachvollziehbar dokumentieren. Bestehende robuste Mechanismen erweitern, nicht ohne Nutzen ersetzen.
