# AGENTS.md – Reiseführer

## Ziel und Architektur
Dieses öffentliche Repository erzeugt persönliche, offline nutzbare Reiseführer. Astro, TypeScript, Content Collections und Markdown bauen eine rein statische Website. Pagefind indiziert den Build; Leaflet/OSM liefert nur online Kartenkacheln. Kein Tracking, Server, API-Key oder schweres UI-Framework.

## Struktur
- `src/content/`: `reisen`, `reisetage`, `orte`, `sehenswuerdigkeiten`, `unterkuenfte`, `restaurants`, `genuss`, `wissen`, `praktisches`.
- `src/pages/`: generische, aus Collections gebaute Routen; keine manuell gepflegten Einzellisten.
- `src/components`, `src/layouts`, `src/styles`, `src/data`: UI, Layout, Tokens und Kartendaten.
- `public/`: ausschließlich veröffentlichbare lokale Assets, Manifest und Service Worker.
- `templates/`: kopierbare Inhaltsvorlagen.

## Inhalte und Benennung
Dateiname, `slug` und stabile interne ID sind kleingeschriebenes kebab-case. Obligatorisch sind `title`, `slug`, `trip`, `country`, `region`, `summary`, `categories`, `status`, `days`, `related`, mindestens eine belastbare `source` und `updated`. Geo-Inhalte erhalten Dezimalgrad-Koordinaten. Bilder benötigen lokalen Pfad, präzisen Alternativtext sowie Urheber, Originalquelle, Lizenz und Bearbeitungsnotiz.

Neue Reisen entstehen als Reiseeintrag plus datierte Tagesdateien; Navigation und Übersichten müssen Collections abfragen. Reisetage sind `tag-01` usw., chronologisch, mit Start/Ziel, Charakter und sichtbaren `fixed`-Terminen. Flüge nie nur im Fließtext. Orte, Sehenswürdigkeiten, Gerichte, Hotels und Restaurants verknüpfen sich über `trip`, `days`, `related`, Region und Kategorien. Keine parallele manuelle Linkliste anlegen.

Hotels sind `vorschlag`, bis eine Buchung ausdrücklich bestätigt ist. Plattformbewertungen nie mischen; Plattform und Aktualitätsstand nennen. Preise, Öffnungen, Politik, Sicherheit, Einreise und Wetter als zeitabhängig markieren. Nur Primärquellen oder anerkannte Fachquellen verwenden; Behauptung, URL und Aktualitätsdatum müssen zusammenpassen. Keine Quelle oder Bewertung erfinden.

## Datenschutz und Rechte
Niemals DOCX/PDF-Eingaben, Pass-/Buchungs-/Versicherungsnummern, private Kontakte, Zugangsdaten, Zahlungsangaben oder Wohnungsabwesenheiten committen. Standort nur nach Klick lokal verarbeiten. Keine Analyse-, Werbe- oder Trackingdienste. Fremdbilder nur bei belegter kompatibler Lizenz lokal speichern; ansonsten weglassen.

## Technik und Qualität
Der unveränderliche GitHub-Pages-Basispfad ist `/reisen/`; Links, Canonicals, Bilder, Suche, Manifest, Service Worker und Cache müssen ihn berücksichtigen. Touch-Ziele ≥44 px, semantisches HTML, Fokus, Alttexte, Kontrast, Dark Mode, Druck und reduzierte Bewegung erhalten. Vor PR: `npm ci`, `npm run check`, `npm run test`, `npm run build`; interne Links, Bilder, Metadaten, Manifest/SW, Offline-Fallback, Suche, Karte mit abgelehntem Standort, Datumslogik und Viewports 390/768/1440 prüfen. Änderungen auf eigenem Branch committen und einen Draft-PR gegen `main` mit Funktionen, Tests, Screenshots, Grenzen und manuellem Pages-Schritt erstellen.
