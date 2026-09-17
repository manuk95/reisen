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

**Ausgewählter Mietwagen (Kundenportal/Vertragsentwurf Stand 17.09.2026):** Cars4Rent, Ford Bronco Sport 4WD, Automatik, Modelljahr 2021–2022, Kategorie Easy Off-Road. Abholung **01.10.2026, 08:00 Uhr**, **26 Shalva Dadiani Street, Tbilisi** (Innenstadt, nicht Flughafen). Rückgabe **10.10.2026, 18:00 Uhr**, Batumi International Airport. Portal-Gesamtpreis **€714**: €531 Grundmiete, €59 Zusatzzeit, €31 + €57 Lieferung/Abholung und €36 Servicegebühr. Barzahlung in GEL ausgewählt. Keine Kaution laut Angebot, unbegrenzte Kilometer und registrierte Fahrer, €0 Selbstbehalt nur bei gedeckten Schäden; Reifenschaden Easy Off-Road €100/Reifen, Schlüsselverlust €100. Kartenzahlung laut Vertrag 3,5 % zusätzlich. Voll/voll, Treibstoff extra.

**Status sorgfältig unterscheiden:** Fahrzeug und Zeiten sind ausgewählt und im Kundenportal hinterlegt. Eine abschliessend unterschriebene Vereinbarung und die Zahlung sind durch die vorliegenden Angaben noch nicht nachgewiesen; bis zur Bestätigung nicht als «gebucht und bezahlt» kennzeichnen. Im Vertrag fehlen beziehungsweise widersprechen sich einzelne Angaben (insbesondere Enddatum im Hauptvertrag, 4WD/Ersatzfahrzeug, Kündigungsfristen, weitreichende Mängelklauseln). Dies vor Unterschrift beziehungsweise Übergabe klären. Keine privaten Buchungsnummern, persönlichen Ausweisangaben, Zahlungsdaten oder Originalverträge in dieses öffentliche Repository übernehmen.

Auf der Seite `/georgien/fahrten/` stehen Details zu Übergabe, Versicherung und Strassenausschlüssen. Ein lokaler 4×4-Fahrer bleibt eine Option für vertraglich ausgeschlossene oder ungeeignete Bergpisten, insbesondere Trusso/Juta nur nach Freigabe der konkreten Strecke. Die Standardroute braucht keine Vardzia-/Zekari-Schleife.

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
