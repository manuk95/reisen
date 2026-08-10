# Aktueller Arbeitsplan

Stand: 10. August 2026

Dieses Dokument ist die **einzige zentrale Quelle für offene Arbeiten** am Reiseführer-Projekt. Historische Pläne und Recherchestände unter `docs/archive/` dürfen nicht als aktuelle Aufgabenliste verwendet werden.

Das Repository ist für **mehrere Reisen** ausgelegt. Georgien 2026 ist die erste konkrete Reise, technische Lösungen sollen aber möglichst wiederverwendbar und nicht unnötig Georgien-spezifisch sein.

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

**Status:** OFFEN  
**Verantwortlich:** Codex  
**Verbindliche Spezifikation:** [`ANFORDERUNGEN_TAGESPLAN.md`](ANFORDERUNGEN_TAGESPLAN.md)

Technisch umsetzen:

- pro Reisetag nur **ein** Tagesablauf als redaktionelle Quelle
- `## Tagesablauf` aus der Tages-Markdown-Datei interpretieren
- jede `###`-Überschrift als Programmpunkt darstellen
- optionaler Text unter dem Programmpunkt wird direkt dort ausklappbar
- kein Ausklappsymbol bei Programmpunkten ohne Detailinhalt
- mehrere Programmpunkte gleichzeitig geöffnet möglich
- flexible Zeitangaben tolerant behandeln
- keine doppelte Pflege von `fixed`/`recommended` und Markdown-Tagesablauf
- Google-Maps-, Kürzungs- und Schlechtwetterabschnitte oberhalb des Tagesablaufs
- kompakte Tagesfakten
- kompaktere Hotel-/Restaurantkarten **innerhalb** der Kacheln; Abstand zwischen Kacheln beibehalten
- separaten Unterkunft-Warnhinweis entfernen
- vorheriger/nächster Reisetag beim Scrollen gut erreichbar / angedockt
- Lösung für spätere Reisen wiederverwendbar bauen
- bestehende Links, Markdown-Formatierungen, Offline-Nutzung und `/reisen/`-Basispfad erhalten
- Tests für fehlende/optionale Inhalte und verschiedene Zeitformate ergänzen

Abnahme gemäss `ANFORDERUNGEN_TAGESPLAN.md`.

---

# Phase 2 – Mobilität / neue Seite „Fahrten“

## 2.1 Mietwagen oder Fahrer fundiert vergleichen

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Neue Seite **Fahrten** recherchieren und erstellen. Ziel ist die Entscheidung zwischen:

- Mietwagen / Selbstfahrer
- GoTrip / privater Fahrer
- vorab gebuchte Transfers
- Taxi
- Bolt bzw. tatsächlich verfügbare App-Dienste
- lokale Fahrer / 4x4-Fahrer für Bergregionen
- sinnvolle Hybridvariante

Alle längeren Transfers und relevanten Ausflüge der aktuellen Tagespläne erfassen, insbesondere:

- Tbilisi → Mtskheta / Dschwari → Tbilisi
- Tbilisi → Stepantsminda via Ananuri / Gudauri / Kreuzpass
- Stepantsminda → Trusso
- Stepantsminda → Juta / Sno
- Dariali / Gveleti, falls im finalen Tagesplan relevant
- Stepantsminda → Vardzia → Kutaisi
- Kutaisi-Rundfahrten
- Kutaisi → Shekvetili
- Shekvetili → Kolkheti / Gurien, falls vorgesehen
- Shekvetili → Botanischer Garten Batumi → Batumi → Shekvetili
- Shekvetili → Flughafen Batumi

Pro Fahrt recherchieren:

- Distanz, reine Fahrzeit, realistische Gesamtzeit
- Strassenart und -zustand
- Asphalt / unbefestigt
- Steigungen, Kurven, Höhenlage
- saisonale Risiken Ende September / Anfang Oktober
- Baustellen, Sperrungen und Fahrzeugbeschränkungen
- normales Auto / SUV / 4x4
- Mietwagenbedingungen und ausgeschlossene Strassen
- Parkieren, Tanken und Versorgung
- Stress- und Sicherheitsfaktor für Selbstfahrer
- klare Empfehlung pro Strecke

Kostenvergleich:

1. gesamte Reise mit geeignetem Mietwagen
2. gesamte Reise mit Fahrern/Transfers
3. Hybridvariante, falls sinnvoll

Zusätzlich reale positive und negative Reiseerfahrungen recherchieren und mit direkten Links einordnen. Offizielle Quellen und subjektive Erfahrungsberichte klar trennen.

## 2.2 Zeitabhängige Bergstrassen

**Status:** VOR REISE PRÜFEN  
**Verantwortlich:** ChatGPT-Web

Grundsätzlich geklärt, aber vor Fahrt erneut kontrollieren:

- Zekari / Abastumani / Sairme
- Trusso
- Juta
- Kreuzpass / Georgische Heerstrasse

Aktuelle Freigabe, Wetter, Mietwagenbedingungen und Fahrzeugtauglichkeit prüfen.

---

# Phase 3 – alle 14 Tagesdateien migrieren und fachlich endprüfen

## 3.1 Tages-Markdowns auf neue Struktur umstellen

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web  
**Abhängigkeit:** Phase 1 abgeschlossen; Erkenntnisse aus Phase 2 berücksichtigen

Alle 14 Tagesdateien nach der neuen Markdown-Konvention überarbeiten:

- nur ein Tagesablauf
- geschlossene Kurzfassung bereits vollständig und konkret
- Details nur dort ergänzen, wo sie Mehrwert bringen
- `## Google Maps`
- `## Falls ihr kürzen müsst`
- `## Schlechtwetter`
- `## Tagesablauf`
- chronologische und realistische Reihenfolge
- Fahrtzeiten, Distanzen und Aufenthaltszeiten prüfen
- Essen/Pausen sinnvoll einplanen
- interne Links zu vorhandenen Detailseiten
- keine unnötigen Meta-Wiederholungen
- Küstentage bewusst ruhiger und romantischer lassen

## 3.2 Tag 1 – SBB

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

- „Entlebuch verlassen“ als ersten Programmpunkt darstellen.
- Vom Nutzer ausgewählte Verbindung direkt unter **SBB** verlinken:
  `https://a.sbbmobile.ch/s/m5yK6Fnm`
- Verbindung vor der Reise nochmals auf Fahrplanänderungen prüfen.

## 3.3 Google Maps auf allen Tagesseiten

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Alle 14 Tage kontrollieren. Wo eine Route sinnvoll ist, muss ein funktionierender direkter Google-Maps-Link vorhanden sein. Bereits gefundener konkreter Fehler: **Tag 2 besitzt noch keinen Google-Maps-Link.**

## 3.4 Tag 7

**Status:** VOR REISE PRÜFEN  
**Verantwortlich:** ChatGPT-Web

Die grundlegende Logik ist bereits geklärt und soll erhalten bleiben:

- Variante A: robuste Route über normale Hauptstrassen
- Variante B: kürzer über Abastumani / Zekari / Sairme, nur bei geeigneter Freigabe/Fahrzeug

Vor der Reise nur noch zeitabhängige Fakten verifizieren; das frühere Problem „600 km versus 341 km“ ist keine offene Architekturfrage mehr.

---

# Phase 4 – Kostenübersicht

## 4.1 Vollständige Reisekosten aktualisieren

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web  
**Abhängigkeit:** Mobilitätsvergleich aus Phase 2

Die aktuelle Kostenseite zu einer vollständigen Entscheidungs- und Kostenübersicht ausbauen.

Mindestens berücksichtigen:

- gebuchte Flüge: CHF 900 für 2
- Tbilisi-Unterkünfte
- Kazbegi-Unterkünfte
- Kutaisi-Unterkünfte
- verschiedene Küstenszenarien
- Mietwagen / Fahrer / Hybrid als Alternativen
- Treibstoff
- Parkieren
- Essen und Getränke
- Eintritte, Bäder und Touren
- Reserve
- Gesamt für 2
- pro Person
- Status wie gebucht / geplant / geschätzt / optional
- alternative Szenarien nie doppelt zählen
- verwendete Wechselkurse mit Datum

Bestehende historische Kostenbasis aus den Archivdokumenten darf als Ausgangspunkt dienen, muss aber gegen aktuelle Reiseentscheidungen und Preise geprüft werden.

Nur falls für die Darstellung ein neues komplexes Datenmodell notwendig wird, folgt ein separates Codex-Arbeitspaket.

---

# Phase 5 – Flüge und Bahn

## 5.1 Eigene Flugseite

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Aktuelle Daten der vier Flugsegmente verifizieren und eine vollständige Flugseite erstellen:

- ZRH → BEG
- BEG → TBS
- BUS → IST
- IST → ZRH

Darstellen:

- Datum / Wochentag
- Airline
- Flugnummer
- IATA-Codes
- lokale Zeiten
- Segmentdauer
- Umsteigezeit
- Gesamtdauer
- Zeitzonen
- Timeline
- Prüfdatum
- Airline-/Statuslinks

Keine privaten Buchungsdaten veröffentlichen.

## 5.2 Bahn Zürich Flughafen → Entlebuch

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Für den 11. Oktober 2026 datumsspezifisch recherchieren:

- realistische Hauptverbindung nach Landung 09:55
- mindestens zwei spätere Alternativen
- Gepäck-/Einreise-/Bahnhofsreserve berücksichtigen

Für die Hinfahrt wird die unter Phase 3.2 hinterlegte SBB-Verbindung verwendet und kurz vor Reise erneut geprüft.

---

# Phase 6 – fehlende und zu erweiternde Inhaltsseiten

## 6.1 Chronicles of Georgia

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Eigene Sehenswürdigkeitsseite erstellen und passend mit Tbilisi/Tag 3 verlinken. Inhalt mindestens:

- Zurab Tsereteli
- Entstehung
- monumentale Säulen
- Szenen aus georgischer Geschichte
- christliche Motive
- Einordnung der Geschichtsdarstellung
- Aussicht über Tbilisi Sea
- Anfahrt / Besuch
- belastbare Quellen
- frei nutzbares Bild mit sauberem Nachweis

## 6.2 Fame / internationale Bekanntheit Georgiens

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Neue Wissensseite mit relevanten Personen, Kultur, Sport, Musik, Film, Wissenschaft, internationalen Dreharbeiten und weiteren Gründen für internationale Bekanntheit. Nicht nur Namen auflisten, sondern Relevanz erklären.

## 6.3 Weinland

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web für Recherche/Text; Codex nur falls Responsive-Technik nötig

- bestehende mobile Weinland-Tabelle kontrollieren
- Vergleich Georgien / Schweiz / Frankreich ergänzen
- mindestens Produktion, Produktion pro Kopf, Konsum pro Kopf, Export und Export pro Kopf
- Datenstand und Quellen nennen
- weitere belastbare Wein-Kennzahlen ergänzen, falls sinnvoll

Wenn das mobile Tabellenproblem nur CSS/Komponentenlogik betrifft und nicht durch einfache redaktionelle Struktur lösbar ist, kleine technische Aufgabe an Codex geben.

## 6.4 Schweiz / Georgien – Wirtschaft

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Bestehende Vergleichsseite um Wirtschaft erweitern, mindestens:

- BIP
- BIP pro Kopf
- wichtige Wirtschaftssektoren
- weitere aussagekräftige Kennzahlen
- klarer Datenstand und belastbare Quellen

---

# Phase 7 – Restaurants und Unterkünfte

## 7.1 Restaurantseiten

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Alle bestehenden Restaurantseiten kontrollieren und inhaltlich angleichen:

- Betrieb existiert / aktueller Status
- Küche / Konzept
- Spezialitäten
- Preisniveau
- Reservation
- Lage
- Reisebezug / passende Tage
- interne Links
- offizielle Quellen
- Bilder und Alttexte kontrollieren
- falsche oder unpassende Metadaten bereinigen

## 7.2 Unterkunftsseiten

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Alle vorhandenen Unterkunftsseiten ausführlicher und vergleichbar machen:

- Lage
- Zimmer
- Bad
- Pool / Spa
- Frühstück
- Parkplatz
- Strandnähe
- Bewertungen getrennt nach Plattform
- Vor-/Nachteile
- Eignung für konkrete Reise
- romantischer Faktor an der Küste
- Buchungs-/Hotel-Link
- Preis- und Bewertungsstand

---

# Phase 8 – einfache UI- und Inhaltsbereinigung

## 8.1 Wissen-Übersicht

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web; Codex nur bei unerwartet komplexer Komponentenabhängigkeit

Auf **„Wissen über Georgien“**:

- Bilder auf den Kacheln entfernen
- Labels `empfohlen` entfernen
- Titel und kurze Beschreibung behalten

## 8.2 Footer

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Diesen gesamten globalen Satz ersatzlos entfernen:

> Persönlicher Reiseführer · ohne Tracking. Stand redaktioneller Angaben: 6. August 2026; zeitabhängige Angaben vor Ort erneut prüfen.

Grund: Inhalte haben unterschiedliche Aktualitätsstände. Zeitabhängige Hinweise gehören auf die jeweilige Seite beziehungsweise direkt zur betroffenen Angabe.

## 8.3 Georgien-Landingpage

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

`/georgien/` als klare Landingpage der Georgienreise kontrollieren und bei Bedarf redaktionell nachschärfen. Neue Flug-, Fahrten- und Kosteninformationen sinnvoll erreichbar machen. Keine separate neue Landingpage bauen.

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

Nur wenn der Audit echte technische Lücken zeigt, zum Beispiel:

- Collection-/Schema-Erweiterung
- Validator
- generische Route
- Navigationserzeugung
- automatische Verlinkung
- Suchindexproblem

Keine grossflächige technische Migration nur aufgrund historischer Pläne durchführen.

---

# Phase 10 – Datenschutz

## 10.1 Öffentliches Repository prüfen

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web für Inhaltsprüfung; Codex nur für technische Bereinigung nach separatem Auftrag

Das Repository ist öffentlich. Kontrollieren:

- keine Passdaten
- keine Buchungscodes
- keine Zahlungsdaten
- keine privaten Telefonnummern/E-Mails
- keine Versicherungsnummern
- keine vertraulichen Belege

Im Root liegen historisch bereits DOCX/PDF-Quelldokumente. Diese Tatsache dokumentieren und ihren Inhalt auf Risiko prüfen. **Nicht ohne separaten Auftrag Git-History umschreiben oder bestehende Quelldokumente löschen.**

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

## PWA-Update

**Status:** ERLEDIGT

Die sichtbare Updatefunktion wurde inzwischen umgesetzt. Sie ist **kein offenes Entwicklungs-Arbeitspaket mehr**. In der finalen QA bleibt lediglich der Regressionstest Altversion → Neuversion, Offline und mehrere Tabs.

## Tagesprogramme – erster Ausbau

**Status:** ERLEDIGT / wird in Phase 3 in neues Format überführt

Alle 14 Tagesprogramme wurden bereits deutlich detaillierter ausgearbeitet. Die offene Aufgabe ist nicht mehr „Tagesprogramme erstmals detaillieren“, sondern die fachliche Endkontrolle und Migration in das neue einfache Markdown-/Accordion-Modell.

## Tag 7 – zwei Grundvarianten

**Status:** ERLEDIGT / zeitabhängige Verifikation bleibt

Standardroute und Zekari-/Sairme-Variante sind konzeptionell getrennt. Kurz vor der Reise müssen nur Strassenzustand, Freigabe, Wetter und Fahrzeugbedingungen erneut geprüft werden.

---

# Grundregel für neue Pendenzen

Neue offene Arbeiten werden **nur in dieser Datei** ergänzt. Keine zusätzlichen konkurrierenden Pendenz- oder Umsetzungskonzeptdateien im Repository anlegen.

Wenn ein grosser technischer Punkt eine eigene Spezifikation braucht, darf eine separate Anforderungsdatei wie `ANFORDERUNGEN_TAGESPLAN.md` entstehen; der aktuelle Status und die Zuständigkeit bleiben trotzdem hier verzeichnet.