# Dauerhafter Projektkontext

## Zweck des Repositorys

Dieses Repository ist die gemeinsame technische Basis für **mehrere persönliche Reiseführer**. Georgien 2026 ist die erste Reise, weitere Reisen sollen später mit derselben generischen Astro-/Content-Architektur ergänzt werden.

Die Startseite ist deshalb reiseübergreifend. Reisespezifische Inhalte werden über `trip`, Content Collections und generische Routen voneinander getrennt. Wiederverwendbare Komponenten dürfen nicht unnötig auf Georgien fest verdrahtet werden.

## Produktentscheidungen

- Astro / TypeScript / Content Collections / Markdown
- statische Veröffentlichung über GitHub Pages
- Basispfad `/reisen/`
- Pagefind für Suche
- Leaflet / OpenStreetMap für Karten
- Standortberechnung nur lokal im Browser und nur nach Benutzeraktion
- OSM-Kacheln werden nicht offline gecacht
- redaktionelle Kernseiten können offline verfügbar sein
- keine Tracking- oder Werbedienste
- neue Reisen sollen über Reiseeintrag + Tagesdateien + `trip`-bezogene Inhalte ergänzt werden, nicht über eine kopierte zweite Website

## Georgien 2026

Reisezeit:

- Montag, 28. September 2026: Abflug Zürich 09:30, Ankunft Tbilisi 18:20
- Samstag, 10. Oktober 2026: Abflug Batumi 22:40
- Sonntag, 11. Oktober 2026: Ankunft Zürich 09:55

Grundroute:

Tbilisi → Mtskheta → Stepantsminda/Kazbegi → Vardzia → Kutaisi → Shekvetili / Schwarzmeerküste → Flughafen Batumi.

Die vier Küstennächte sollen bewusst ruhiger, entspannter und romantischer sein als der erste Reiseteil. Eine gute Pool-/Spa-Alternative ist dort wichtig, weil das Wetter und die Badebedingungen Anfang Oktober schwanken können.

### Mobilität

Die Grundentscheidung **Mietwagen versus Fahrer/Transfers** ist noch offen und wird auf einer eigenen Seite `Fahrten` recherchiert und verglichen.

Für Stepantsminda → Vardzia → Kutaisi bestehen zwei grundsätzlich unterschiedliche Routenlogiken:

- robuste Route über normale Hauptstrassen
- kürzere Route über Abastumani / Zekari / Sairme nur bei geeigneter Freigabe, Wetterlage, Fahrzeugtauglichkeit und passenden Mietwagenbedingungen

Die finale Wahl ist zeitabhängig und wird kurz vor der Reise erneut geprüft.

### Unterkünfte

Unterkünfte gelten als Vorschläge, solange eine konkrete Buchung nicht ausdrücklich als bestätigt dokumentiert ist. Küstenhotels werden insbesondere nach Ruhe, Romantik, Pool/Spa, Strandnähe und Preis-Leistung bewertet.

### Reisedokumente

Ein Reisepass mit Ablauf im November 2026 soll vor der Reise erneuert werden. Keine Passnummer oder andere private Dokumentdaten im öffentlichen Repository speichern.

## Dokumentation

Aktive offene Arbeiten stehen ausschliesslich in [`ARBEITSPLAN_AKTUELL.md`](ARBEITSPLAN_AKTUELL.md).

Technische/redaktionelle Vorgaben für Tagesseiten stehen in [`ANFORDERUNGEN_TAGESPLAN.md`](ANFORDERUNGEN_TAGESPLAN.md).

Historische Pläne und Recherchestände liegen unter `docs/archive/` und sind keine aktuellen Arbeitsanweisungen.