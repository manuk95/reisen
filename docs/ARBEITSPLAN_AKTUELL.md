# Aktueller Arbeitsplan

Stand: 10. August 2026

Dieses Dokument ist die **einzige zentrale Quelle für offene Arbeiten** am Reiseführer-Projekt. Historische Pläne und Recherchestände unter `docs/archive/` dürfen nicht als aktuelle Aufgabenliste verwendet werden.

Das Repository ist für **mehrere Reisen** ausgelegt. Georgien 2026 ist die erste konkrete Reise; technische Lösungen sollen möglichst wiederverwendbar und nicht unnötig Georgien-spezifisch sein.

## Strukturentscheid für zukünftige Reisen

Reisespezifische Inhalte bleiben nach Inhaltstyp als Content Collections organisiert. Sobald eine zweite Reise angelegt wird, erhält sie innerhalb jeder betroffenen Collection einen eigenen Unterordner, zum Beispiel `src/content/reisetage/island-2028/`. Das Frontmatter-Feld `trip` bleibt die verbindliche Zuordnung.

## Status

- `OFFEN` – noch auszuführen
- `IN ARBEIT` – begonnen, aber noch nicht abgeschlossen
- `VOR REISE PRÜFEN` – grundsätzlich geklärt, zeitabhängige Fakten kurz vor Nutzung nochmals verifizieren
- `ERLEDIGT` – abgeschlossen; nur Regression/QA bleibt möglich

## Zuständigkeit

- **ChatGPT-Web**: Recherche, Quellenvergleich, Text, Markdown, Tabellen, Inhaltskontrolle und einfache redaktionelle Repository-Änderungen.
- **Codex**: technisch anspruchsvolle Renderer, Parser, Astro-/TypeScript-Komponenten, Schema-/Validatoränderungen, komplexe UI-Logik, automatisierte Tests und finale technische QA.

---

# Phase 1 – Tagesplan-Technik

## 1.1 Neuer generischer Tagesplan-Renderer

**Status:** ERLEDIGT  
**Verantwortlich:** Codex  
**Verbindliche Spezifikation:** [`ANFORDERUNGEN_TAGESPLAN.md`](ANFORDERUNGEN_TAGESPLAN.md)

Umgesetzt sind Single-Source-Tagesablauf aus Markdown, optionale Details pro Programmpunkt, flexible Zeitangaben, Google-Maps-/Kürzungs-/Schlechtwetterabschnitte, kompakte Tagesfakten, kompaktere Karten, Sticky Tag-Navigation und Tests. Die Lösung ist für spätere Reisen wiederverwendbar.

---

# Phase 2 – Mobilität / Seite „Fahrten“

## 2.1 Mietwagen oder Fahrer

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Die Seite **`/georgien/fahrten/`** vergleicht Mietwagen, GoTrip/private Fahrer, Transfers, Taxi/Bolt, lokale 4x4-Fahrer und Hybridlösungen für alle relevanten Strecken. Aktuelle Tendenz: Eine fahrerlastige Hybridlösung passt besser zur konkreten Route als ein durchgehender Mietwagen.

Verknüpfungen:

1. Hauptmenü → Reiseplan → Fahrten
2. Footer → Unterwegs → Fahrten
3. Reiseplan/Gesamtroute → Fahrten & Strassen

## 2.2 Zeitabhängige Bergstrassen

**Status:** VOR REISE PRÜFEN  
**Verantwortlich:** ChatGPT-Web

Vor Nutzung erneut prüfen:

- Zekari / Abastumani / Sairme
- Trusso
- Juta
- Kreuzpass / Georgische Heerstrasse

Für Georgische Heerstrasse und Zekari läuft zusätzlich vom **20. September bis 4. Oktober 2026** ein täglicher automatischer Änderungscheck; Meldung nur bei relevanten Änderungen.

---

# Phase 3 – 14 Tagesdateien

## 3.1 Migration und fachliche Endkontrolle

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Alle 14 Tagesdateien sind auf die neue Markdown-Konvention migriert:

- nur ein redaktioneller Tagesablauf
- konkrete Kurzfassung in den `###`-Programmpunkten
- Details nur bei Mehrwert
- `## Google Maps`
- `## Falls ihr kürzen müsst`
- `## Schlechtwetter`
- `## Tagesablauf`
- alte `fixed`-/`recommended`-/`optional`-Doppelpflege entfernt
- Mobilität aus Phase 2 berücksichtigt
- Küstentage bewusst ruhig und romantisch gehalten

## 3.2 Tag 1 – SBB

**Status:** ERLEDIGT

Die vom Nutzer gewählte Hinfahrt ist unter **SBB** verlinkt: `https://a.sbbmobile.ch/s/m5yK6Fnm`. Kurz vor der Reise erneut prüfen.

## 3.3 Google Maps

**Status:** ERLEDIGT

Alle 14 Tage kontrolliert; direkte Kartenlinks sind dort vorhanden, wo eine Route sinnvoll ist.

## 3.4 Tag 7

**Status:** VOR REISE PRÜFEN

- Variante A: robuste Route über normale Hauptstrassen
- Variante B: Abastumani / Zekari / Sairme nur bei aktueller Freigabe, geeignetem Fahrzeug und passenden Mietbedingungen
- aktuell wird ein individuell organisierter Fahrer bevorzugt

---

# Phase 4 – Kostenübersicht

## 4.1 Vollständige Reisekosten

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Die Seite **`/georgien/kosten/`** enthält Flüge, Unterkünfte, Küstenszenarien, Fahrer/Mietwagen/Hybrid, Treibstoff, Essen, Aktivitäten, Reserve, Gesamt für 2 und pro Person sowie Datenstände/Quellen.

Aktuelle Planungsszenarien:

- sparsam: ca. CHF 3'120–4'585 für 2
- empfohlener Mix: ca. CHF 3'755–5'500 für 2
- mehr Resort/Luxus: ca. CHF 4'045–5'980 für 2

Hotelpreise, Fahrer-Offerten, Mietwagenkonditionen und Wechselkurse bleiben vor Buchung zeitabhängig zu prüfen.

---

# Phase 5 – Flüge und Bahn

## 5.1 Flugseite

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Die Seite **`/georgien/fluege/`** enthält alle vier Flugsegmente, lokale Zeiten, Zeitzonen, Flug-/Umsteigezeiten, Timeline, Airline-/Flugplanlinks und Prüfdatum. Tag 1, Tag 13 und Tag 14 sind entsprechend verknüpft.

Hinweis: Bei JU890 zeigen öffentliche Flugplandaten 13:20 beziehungsweise 13:25; die konkrete Airline-Buchung bleibt massgebend.

## 5.2 Bahn Zürich Flughafen → Entlebuch

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Für Sonntag, 11. Oktober 2026:

- Hauptverbindung: Zürich Flughafen 11:15 → Entlebuch 13:22
- Alternative 1: 12:15 → 14:22
- Alternative 2: 13:15 → 15:22

Gleise, Bauarbeiten und kurzfristige Fahrplanänderungen am Reisetag in SBB Mobile prüfen.

---

# Phase 6 – fehlende und erweiterte Inhaltsseiten

## 6.1 Chronicles of Georgia

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Eigene Sehenswürdigkeitsseite **`/georgien/sehenswuerdigkeiten/chronicles-of-georgia/`** erstellt und von Tag 3 verlinkt. Enthalten sind Zurab Tsereteli, Entstehung, 16 monumentale Säulen, georgische Könige/Ereignisse, biblische Motive, Einordnung als nationale Erinnerungskultur, Aussicht über den Tbilisi Sea, Anfahrt/Besuch sowie belastbare Quellen. Als Bild dient eine eigens erstellte, frei nutzbare SVG-Illustration im Repository.

## 6.2 Fame / internationale Bekanntheit Georgiens

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Neue Wissensseite **`/georgien/wissen/fame/`** erstellt. Sie ordnet unter anderem UNESCO-Kulturtraditionen, Shota Rustaveli, Nona Gaprindashvili, Khvicha Kvaratskhelia, Katie Melua, Demna, internationale Filmdrehs, Phagenforschung und Josef Stalin ein. Personen und Themen werden nicht nur aufgelistet, sondern hinsichtlich ihrer internationalen Bedeutung erklärt.

## 6.3 Weinland

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

**`/georgien/weinland/`** vollständig erweitert:

- Tabellen mobil in `table-scroll` eingebettet
- Vergleich Georgien / Schweiz / Frankreich mit gemeinsamem Datenjahr 2024
- Weinproduktion und Produktion pro Kopf
- Konsum und Konsum pro Kopf
- Export und Export pro Kopf
- Rebfläche und internationale Einordnung
- Weinregionen entlang der konkreten Reiseroute
- Datenstand, Berechnungshinweise und direkte Quellen

Kein zusätzliches Codex-Arbeitspaket war erforderlich.

## 6.4 Schweiz / Georgien – Wirtschaft

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Die bestehende Seite **`/georgien/wissen/vergleich-schweiz/`** wurde um einen direkten Wirtschaftsvergleich ergänzt. Für die Kernzahlen werden einheitliche World-Bank-Daten 2024 verwendet; zusätzlich wird die aktuellere georgische Entwicklung mit Geostat 2025/Q1 2026 eingeordnet. Enthalten sind BIP, BIP pro Kopf, Wachstum, Arbeitslosigkeit, Inflation, Rücküberweisungen, wichtige Wirtschaftssektoren und interpretierende Einordnung.

## 6.5 Packliste

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Die Seite **`/georgien/wissen/packliste/`** wurde neu strukturiert. Sie enthält genau drei standardmässig geschlossene, ausklappbare Bereiche:

1. **Manuel**
2. **Martina**
3. **Gemeinsam**

Jeder Bereich ist als echte Liste formatiert. Persönliche medizinische Details werden im öffentlichen Repository bewusst nicht veröffentlicht; Medikamente sind nur generisch als persönliche Reiseausrüstung erwähnt.

---

# Phase 7 – Restaurants und Unterkünfte

## 7.1 Restaurantseiten

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Am 10. August 2026 wurden alle **7 vorhandenen Restaurantseiten** überprüft und auf einen vergleichbaren Informationsstand gebracht:

- 360 Sky Bar
- Baia’s Wine
- Barbarestan
- Keto & Kote
- Laguna
- Palaty
- Pasanauri

Pro Seite sind jetzt – soweit für den jeweiligen Betrieb sinnvoll und belastbar – Konzept/Küche, Spezialitäten, Preisniveau, Lage, Öffnung, Reservationshinweis, Reisebezug, passende Tage, interne Links und aktuelle Quellen enthalten. Baia’s Wine ist korrekt als Weingut/Verkostungsbetrieb statt als normales Restaurant eingeordnet.

Mehrere zuvor verwendete Bilder zeigten **nicht den jeweiligen Betrieb**: unter anderem ein Kriegsschiff bei 360 Sky Bar, den Darejan-Palast bei Barbarestan und ein Filmkostüm bei Keto & Kote. Solche irreführenden Bilder wurden in der Seitendarstellung durch neutrale Platzhalter ersetzt. Ein unpassendes Bild wird nicht nur deshalb weiterverwendet, weil die Datei bereits im Repository liegt.

Bewertungen von Restaurantführern werden nur dort genannt, wo eine konkrete Quelle vorliegt; Plattformwerte werden nicht vermischt. Öffnungszeiten und Reservation bleiben vor dem tatsächlichen Besuch zeitabhängig zu prüfen.

## 7.2 Unterkunftsseiten

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Am 10. August 2026 wurden alle **11 vorhandenen Unterkunftsseiten** ausführlich und untereinander vergleichbar überarbeitet:

- Hotel Pavo und Old Town Mtatsminda in Tbilisi
- 1740 Boutique Hotel und Rooms Hotel Kazbegi
- EL Hotel und Newport Hotel in Kutaisi
- Paragraph Resort & Spa, Magnetic Resort Ureki, Miramare Magnetic Beach Hotel, Georgia Palace Hotel & Spa und Castello Mare an der Schwarzmeerküste

Als gemeinsame Vergleichsplattform wird für Bewertungen **Booking.com** verwendet; die jeweilige Plattform wird auf der Seite ausdrücklich genannt. Enthalten sind – soweit verfügbar – Lage, Zimmer/eigenes Bad, Frühstück, Pool/Spa, Parkplatz, Strandnähe, aktuelle Bewertungswerte, Vor-/Nachteile, Reiseeignung und direkte Buchungslinks.

Die bestehenden Preisbereiche bleiben **Planungs-Preisrahmen vom 3. August 2026** und werden ausdrücklich nicht als Live-Angebot ausgegeben. Für die tatsächlichen Reisedaten müssen Endpreis, Zimmerkategorie, Frühstück, Stornierung und saisonale Leistungen neu geprüft werden.

Wichtige redaktionelle Ergebnisse:

- **Tbilisi:** Hotel Pavo ist die sehr zentrale einfache Variante; Old Town Mtatsminda punktet stärker mit Frühstück und familiärem Charakter.
- **Kazbegi:** 1740 Boutique bietet das bessere Preis-Leistungs-Verhältnis; Rooms Kazbegi bleibt wegen Innenpool/Spa und Bergkulisse das stärkere Erlebnis.
- **Kutaisi:** EL Hotel ist die Preis-Leistungs-Empfehlung; Newport ist das komfortablere zentrale Upgrade.
- **Küste:** Paragraph ist die vollständigste und wetterfesteste Luxusoption. Magnetic Resort ist bei bestätigter Poolöffnung eine besonders starke günstigere Alternative. Georgia Palace und Castello Mare bieten Innenpool/Spa als wetterrobuste Alternativen; Miramare ist besonders attraktiv für eine kleinere romantische Strandunterkunft bei gutem Wetter.
- Die Region von **Miramare Magnetic Beach Hotel** wurde von Gurien auf **Kobuleti / Adscharien** korrigiert.
- Für den gewünschten romantischen Reiseabschluss bleibt die **2+2-Lösung** – zwei günstigere Küstennächte plus zwei Nächte Paragraph – eine besonders ausgewogene Variante.

Hotelpreise, Bewertungen, Poolöffnungen und Verfügbarkeit bleiben vor Buchung zeitabhängig zu verifizieren.

---

# Phase 8 – einfache UI- und Inhaltsbereinigung

## 8.1 Wissen-Übersicht

**Status:** ERLEDIGT

Bilder und `empfohlen`-Labels auf den Wissenskacheln entfernt; Titel und Kurzbeschreibung bleiben.

## 8.2 Footer

**Status:** ERLEDIGT

Der alte globale Satz mit einem einheitlichen redaktionellen Datenstand wurde entfernt. Zeitabhängige Hinweise gehören zur jeweiligen Seite.

## 8.3 Georgien-Landingpage

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

`/georgien/` als klare Landingpage kontrollieren und bei Bedarf redaktionell nachschärfen. Flug-, Fahrten-, Kosten- und neue Wissensinhalte sinnvoll erreichbar machen. Keine separate Landingpage bauen.

---

# Phase 9 – Informationsarchitektur und Vollständigkeits-Audit

## 9.1 Soll-/Ist-Audit

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Historisches Excel-Seitenregister gegen den **heutigen gewünschten Umfang** prüfen. Das alte Register nicht blind als unveränderliches Soll behandeln.

Kontrollmatrix:

`Register / gewünschter Inhalt → Content-Datei → Route → Übersicht → Navigation → Suche`

Pro Eintrag entscheiden:

- vorhanden und korrekt
- vorhanden, aber zu überarbeiten
- fehlt und soll ergänzt werden
- historisch vorgesehen, aber heute nicht mehr gewünscht
- doppelt / zusammenzuführen

Ergebnis ist eine bereinigte Soll-Liste. Erst danach technische Lücken an Codex geben.

## 9.2 Technische IA-Lücken

**Status:** OFFEN NUR BEI BEDARF  
**Verantwortlich:** Codex

Nur wenn der Audit echte technische Lücken zeigt, zum Beispiel Collection-/Schema-Erweiterung, Validator, generische Route, Navigationserzeugung, automatische Verlinkung oder Suchindexproblem.

---

# Phase 10 – Datenschutz

## 10.1 Öffentliches Repository prüfen

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web für Inhaltsprüfung; Codex nur für technische Bereinigung nach separatem Auftrag

Kontrollieren:

- keine Passdaten
- keine Buchungscodes
- keine Zahlungsdaten
- keine privaten Telefonnummern/E-Mails
- keine Versicherungsnummern
- keine vertraulichen Belege

Im Repository liegen historische DOCX/PDF-Quelldokumente. Inhalt auf Risiko prüfen. **Nicht ohne separaten Auftrag Git-History umschreiben oder Quelldokumente löschen.**

---

# Phase 11 – finale technische QA

## 11.1 Gesamtprüfung

**Status:** OFFEN  
**Verantwortlich:** Codex  
**Abhängigkeit:** Inhalte und technische Hauptarbeiten abgeschlossen

Mindestens:

```bash
npm ci
npm run check
npm run test
npm run build
```

Zusätzlich:

- interne Links
- Bilder / Alttexte
- Metadaten
- Pagefind
- `/reisen/`-Basispfad
- 390 / 768 / 1440 px
- Hauptnavigation
- Footer
- Tagesplan-Accordions
- Sticky vorheriger/nächster Tag
- Google-Maps-Links
- Karte mit verweigerter Standortfreigabe
- Dark Mode
- Tastatur / Fokus / Touch
- Offline
- PWA-Update als Regressionstest
- mehrere Tabs
- installierte PWA, soweit praktikabel

---

# Erledigte Hauptpunkte

- PWA-Updatefunktion umgesetzt; nur Regressionstest in Phase 11.
- Alle 14 Tagesprogramme detailliert und in das neue Markdown-/Accordion-Modell überführt.
- Tag 7 besitzt robuste Standardroute und konditionale Zekari-/Sairme-Variante; nur zeitabhängige Verifikation bleibt.
- Mobilitäts-, Kosten-, Flug-/Bahn-, Phase-6-Inhalts-, Restaurant- und Unterkunftsseiten sind erstellt beziehungsweise aktualisiert.

---

# Grundregel für neue Pendenzen

Neue offene Arbeiten werden **nur in dieser Datei** ergänzt. Keine zusätzlichen konkurrierenden Pendenz- oder Umsetzungskonzeptdateien im Repository anlegen.