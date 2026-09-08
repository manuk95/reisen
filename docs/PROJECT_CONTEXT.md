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

Reisezeit: 28. September bis 11. Oktober 2026. Hinflug nach Tbilisi am 28. September, Rückflug ab Batumi am 10. Oktober um 22:40 Uhr, Ankunft Zürich am 11. Oktober.

Grundroute: Tbilisi → Mtskheta → Stepantsminda/Kazbegi → Uplisziche → Gori **oder** Kutaisi → Imeretien → Shekvetili → Flughafen Batumi.

### Mobilität

Ein durchgehender **Mietwagen vom 01.10. bis 10.10.2026 ist gewählt, aber noch nicht gebucht**. Übernahme in Tbilisi vor der Fahrt nach Kazbegi; Station und Zeit werden nach Buchung ergänzt. Rückgabe ist am 10. Oktober geografisch fix am Batumi International Airport vor dem Abflug um 22:40 Uhr; genaue Zeit folgt mit der Buchung. Für vertraglich ausgeschlossene oder anspruchsvolle Bergpisten kann weiterhin ein lokaler 4×4-Fahrer sinnvoll sein.

### Unterkünfte

- Silver 39 Corner Hotel, Tbilisi: **gebucht**, 28.09.–01.10., CHF 239 gesamt.
- Baza Kazbegi, Stepantsminda: **gebucht**, 01.10.–04.10., CHF 229 gesamt.
- 04.10.–05.10.: spontane Entscheidung Gori oder Kutaisi.
- 05.10.–06.10.: Unterkunft spontan in Kutaisi oder Umgebung.
- Paragraph Resort & Spa Shekvetili, Autograph Collection: **gebucht**, 06.10.–10.10., CHF 681 gesamt.

Die vier Küstennächte bleiben bewusst ruhig, romantisch und wetterrobust. Die frühere 2+2-Küstenhotelstrategie ist nicht mehr der aktuelle Plan. Private Buchungsnummern oder Belege werden nicht veröffentlicht.

## Dokumentation

Aktive offene Arbeiten stehen ausschliesslich in [`ARBEITSPLAN_AKTUELL.md`](ARBEITSPLAN_AKTUELL.md).

Technische/redaktionelle Vorgaben für Tagesseiten stehen in [`ANFORDERUNGEN_TAGESPLAN.md`](ANFORDERUNGEN_TAGESPLAN.md).

Historische Pläne und Recherchestände liegen unter `docs/archive/` und sind keine aktuellen Arbeitsanweisungen.