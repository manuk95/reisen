# Aktueller Arbeitsplan

Stand: 10. August 2026

Dieses Dokument ist die **einzige zentrale Quelle für offene Arbeiten** am Reiseführer-Projekt. Historische Pläne und Recherchestände unter `docs/archive/` dürfen nicht als aktuelle Aufgabenliste verwendet werden.

Das Repository ist für **mehrere Reisen** ausgelegt. Georgien 2026 ist die erste konkrete Reise, technische Lösungen sollen aber möglichst wiederverwendbar und nicht unnötig Georgien-spezifisch sein.

## Strukturentscheid für zukünftige Reisen

Reisespezifische Inhalte bleiben nach Inhaltstyp als Content Collections organisiert. Sobald eine zweite Reise angelegt wird, erhält sie innerhalb jeder betroffenen Collection einen eigenen Unterordner, zum Beispiel `src/content/reisetage/island-2028/` oder `src/content/orte/island-2028/`. Ein oberster Länderordner wie `src/content/georgien/` wird nicht eingeführt, weil er die klaren Collection-Schemas nach Inhaltstyp auflösen würde. Das Frontmatter-Feld `trip` bleibt die verbindliche Zuordnung; Dateiname und `slug` bleiben stabil und kleingeschriebenes Kebab-Case.

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

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Die Recherche und die Seite **`/georgien/fahrten/`** wurden am 10. August 2026 erstellt. Die Seite vergleicht:

- Mietwagen / Selbstfahrer
- GoTrip / privater Fahrer
- vorab gebuchte Transfers
- Taxi
- Bolt bzw. tatsächlich verfügbare App-Dienste
- lokale Fahrer / 4x4-Fahrer für Bergregionen
- sinnvolle Hybridvariante

Erfasst sind die längeren Transfers und relevanten Ausflüge der aktuellen Tagespläne, insbesondere:

- Tbilisi → Mtskheta / Dschwari → Tbilisi
- Tbilisi → Stepantsminda via Ananuri / Gudauri / Kreuzpass
- Stepantsminda → Trusso
- Stepantsminda → Juta / Sno
- Dariali / Gveleti
- Stepantsminda → Vardzia → Kutaisi
- Kutaisi-Rundfahrten
- Kutaisi → Shekvetili
- Shekvetili → Kolkheti / Gurien
- Shekvetili → Botanischer Garten Batumi → Batumi → Shekvetili
- Shekvetili → Flughafen Batumi

Die Seite enthält:

- Strassen- und Sicherheitsbewertung pro Strecke
- Fahrzeug- und Mietwagenrestriktionen
- Preisbeispiele und Arbeitsbudgets
- Flexibilitätsvergleich
- offizielle Quellen
- positive und kritische Erfahrungsberichte
- konkrete Empfehlung für die aktuelle Reise
- Punkte, für die vor Buchung noch individuelle Offerten benötigt werden

Verknüpfungen sind umgesetzt über:

1. Hauptmenü → Reiseplan → Fahrten
2. Footer → Unterwegs → Fahrten
3. Reiseplan/Gesamtroute → „Mietwagen oder Fahrer? / Fahrten & Strassen“

Aktuelle Tendenz der Recherche: Fahrer beziehungsweise eine fahrerlastige Hybridlösung passt besser zur konkreten Route als ein durchgehender Mietwagen. Diese Einschätzung wurde in Phase 3 bei der fachlichen Überarbeitung der Tagesprogramme berücksichtigt.

## 2.2 Zeitabhängige Bergstrassen

**Status:** VOR REISE PRÜFEN  
**Verantwortlich:** ChatGPT-Web

Grundsätzlich geklärt, aber vor Fahrt erneut kontrollieren:

- Zekari / Abastumani / Sairme
- Trusso
- Juta
- Kreuzpass / Georgische Heerstrasse

Aktuelle Freigabe, Wetter, Mietwagenbedingungen und Fahrzeugtauglichkeit prüfen.

Für die Georgische Heerstrasse und Zekari wurde zusätzlich ein täglicher automatischer Änderungscheck vom **20. September bis 4. Oktober 2026** eingerichtet; eine Meldung erfolgt nur bei für die Reise relevanten Änderungen.

---

# Phase 3 – alle 14 Tagesdateien migrieren und fachlich endprüfen

## 3.1 Tages-Markdowns auf neue Struktur umstellen

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web  
**Abhängigkeit:** Phase 1 abgeschlossen; Erkenntnisse aus Phase 2 berücksichtigt

Am 10. August 2026 wurden alle 14 Tagesdateien auf die neue Markdown-Konvention migriert und redaktionell gestrafft:

- nur ein Tagesablauf als redaktionelle Quelle
- geschlossene Kurzfassung bereits vollständig und konkret
- Details nur dort, wo sie Mehrwert bringen
- `## Google Maps`
- `## Falls ihr kürzen müsst`
- `## Schlechtwetter`
- `## Tagesablauf`
- chronologische und realistische Reihenfolge
- Fahrtzeiten, Distanzen und Aufenthaltszeiten kontrolliert
- Essen/Pausen sinnvoll eingeplant
- interne Links zu vorhandenen Detailseiten beibehalten beziehungsweise ergänzt
- alte `fixed`-/`recommended`-/`optional`-Doppelpflege aus den Tagesdateien entfernt
- Mobilitätsempfehlungen aus Phase 2 integriert
- Küstentage bewusst ruhiger und romantischer gehalten

Die Reiseplan-Übersicht wurde ebenfalls von der alten `fixed`-Zählung entkoppelt, damit die Single-Source-of-Truth-Struktur konsistent bleibt.

## 3.2 Tag 1 – SBB

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

- „Entlebuch verlassen“ ist der erste Programmpunkt.
- Die vom Nutzer ausgewählte Verbindung ist direkt unter **SBB** verlinkt:
  `https://a.sbbmobile.ch/s/m5yK6Fnm`
- Die Verbindung bleibt vor der Reise nochmals auf Fahrplanänderungen zu prüfen.

## 3.3 Google Maps auf allen Tagesseiten

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Alle 14 Tage wurden kontrolliert. Wo eine Fahr-/Laufroute sinnvoll ist, ist ein direkter Google-Maps-Link vorhanden. Ruhetage beziehungsweise reine Transit-/Heimreisetage können den standardisierten Abschnitt ohne künstliche Route leer lassen. Der fehlende Link auf Tag 2 wurde ergänzt.

## 3.4 Tag 7

**Status:** VOR REISE PRÜFEN  
**Verantwortlich:** ChatGPT-Web

Die grundlegende Logik ist erhalten:

- Variante A: robuste Route über normale Hauptstrassen
- Variante B: kürzer über Abastumani / Zekari / Sairme, nur bei geeigneter Freigabe/Fahrzeug

Der Tagesplan bevorzugt aktuell einen individuell organisierten Fahrer. Bei Selbstfahrt bleibt Variante A die robuste Standardlösung; Variante B ist nur mit aktueller offizieller Freigabe, geeignetem Fahrzeug und passenden Mietbedingungen sinnvoll.

Vor der Reise nur noch zeitabhängige Fakten verifizieren; das frühere Problem „600 km versus 341 km“ ist keine offene Architekturfrage mehr.

---

# Phase 4 – Kostenübersicht

## 4.1 Vollständige Reisekosten aktualisieren

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web  
**Abhängigkeit:** Mobilitätsvergleich aus Phase 2 berücksichtigt

Die Seite **`/georgien/kosten/`** wurde am 10. August 2026 vollständig neu aufgebaut und enthält nun:

- gebuchte Flüge: CHF 900 für 2
- Tbilisi-, Kazbegi- und Kutaisi-Unterkünfte
- mehrere Küstenszenarien
- Mietwagen / Fahrer / Hybrid als getrennte Alternativen
- Treibstoff und Park-/Mietwagenreserve
- Essen und Getränke
- konkrete aktuelle Eintritts-/Bad-/Aktivitätsbeispiele
- Reserve
- Gesamt für 2 und pro Person
- klare Trennung zwischen gebucht, geplant, geschätzt und optional
- aktuelle Wechselkursbasis und Datenstände
- direkte Quellenlinks

Drei verständliche Gesamtszenarien sind dargestellt:

- sparsam: ca. CHF 3'120–4'585 für 2
- empfohlener Mix mit Rooms Kazbegi und 2+2 Küstenhotels: ca. CHF 3'755–5'500 für 2
- mehr Resort/Luxus mit Rooms Kazbegi und vier Nächten Paragraph: ca. CHF 4'045–5'980 für 2

Hotelpreise basieren auf dem Preisstand der bestehenden Unterkunftsseiten vom 3. August 2026. Mobilität, Wechselkurse, Restaurant-Richtwerte, Treibstoff, Schwefelbad, Prometheus-Höhle, Botanischer Garten und weitere Eintrittsbeispiele wurden am 10. August 2026 gegen aktuelle Quellen geprüft.

Nicht doppelt gerechnet werden lokale 4x4-Fahrer, wenn sie bereits im Mobilitätsbudget enthalten sind. Die konkreten SBB-Verbindungen der Rückreise sind inzwischen in Phase 5 festgelegt; individuelle Schweizer Ticketkosten bleiben ausserhalb der Gesamtsumme, solange nicht geklärt ist, welche Abonnemente/Tarife tatsächlich genutzt werden.

Vor tatsächlicher Buchung bleiben Hotelpreise, Fahrer-Offerten, Mietwagenkonditionen und Wechselkurs zeitabhängig zu prüfen; dafür ist kein neues technisches Datenmodell und kein Codex-Arbeitspaket erforderlich.

---

# Phase 5 – Flüge und Bahn

## 5.1 Eigene Flugseite

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Am 10. August 2026 wurde die Seite **`/georgien/fluege/`** erstellt und unter Reiseplan sowie im Footer verlinkt. Sie enthält:

- ZRH → BEG: JU331, 28.09.2026, 09:30 → 11:15, ca. 1 h 45 min
- BEG → TBS: JU890, 28.09.2026, Reiseplanung/Buchung 13:20 → 18:20, ca. 3 h
- BUS → IST: TK393, 10.10.2026, 22:40 → 23:50, ca. 2 h 10 min
- IST → ZRH: TK1907, 11.10.2026, 07:55 → 09:55, ca. 3 h
- IATA-Codes, lokale Zeiten und Zeitzonen
- Umsteigezeiten von ca. 2 h 05 min in Belgrad und ca. 8 h 05 min in Istanbul
- Gesamtzeiten von ca. 6 h 50 min hin und 13 h 15 min zurück
- Timeline für Hin- und Rückreise
- Airline-/Flugplanlinks und Prüfdatum
- keine privaten Buchungscodes oder anderen privaten Buchungsdaten

Bei JU890 zeigen aktuelle öffentliche Flugplanquellen eine kleine Abweichung: 13:20 beziehungsweise 13:25 als Abflug, bei gleicher Ankunft 18:20. Die vorhandene Reiseplanung/Buchung nennt 13:20; deshalb bleibt die Airline-Buchung kurz vor Reise massgebend.

Tag 1, Tag 13 und Tag 14 wurden mit der neuen Seite und den verifizierten Flugdetails verknüpft beziehungsweise ergänzt.

## 5.2 Bahn Zürich Flughafen → Entlebuch

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web

Für Sonntag, 11. Oktober 2026 wurde auf Basis des aktuellen 2026-Fahrplans eine komfortable Rückreise nach der geplanten Landung um 09:55 festgelegt:

- **Hauptverbindung:** Zürich Flughafen 11:15 → Luzern 12:25 → Luzern 12:57 → Entlebuch 13:22
- **Alternative 1:** Zürich Flughafen 12:15 → Luzern 13:25 → Luzern 13:57 → Entlebuch 14:22
- **Alternative 2:** Zürich Flughafen 13:15 → Luzern 14:25 → Luzern 14:57 → Entlebuch 15:22

Die Hauptverbindung lässt ungefähr 80 Minuten zwischen geplanter Landung und Zugabfahrt und danach rund 32 Minuten Umsteigezeit in Luzern. Der IR75 verkehrt im aktuellen Grundtakt ab Zürich Flughafen zur Minute :15 direkt nach Luzern; ab Luzern besteht der stündliche Anschluss Richtung Bern über Entlebuch zur Minute :57.

Die Verbindung ist auf `/georgien/fluege/` und Tag 14 dokumentiert. Gleise, kurzfristige Bauarbeiten, Verspätungen und Fahrplanänderungen am 11. Oktober nochmals in SBB Mobile kontrollieren. Die vom Nutzer gewählte Hinfahrt-Verbindung aus Phase 3 bleibt ebenfalls vor der Reise erneut zu prüfen.

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

**Status:** ERLEDIGT  
**Verantwortlich:** ChatGPT-Web; Codex nur bei unerwartet komplexer Komponentenabhängigkeit

Auf **„Wissen über Georgien“**:

- Bilder auf den Kacheln entfernen
- Labels `empfohlen` entfernen
- Titel und kurze Beschreibung behalten

## 8.2 Footer

**Status:** ERLEDIGT  
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

## Tagesprogramme – Migration und fachliche Endkontrolle

**Status:** ERLEDIGT

Alle 14 Tagesprogramme wurden zunächst detailliert ausgearbeitet und am 10. August 2026 anschliessend vollständig in das neue einfache Markdown-/Accordion-Modell überführt. Der Tagesablauf wird nun je Tag nur noch einmal redaktionell gepflegt; Mobilitätsentscheidungen aus Phase 2, Kürzungs-/Schlechtwetterlogik und sinnvolle Kartenlinks sind eingearbeitet.

## Tag 7 – zwei Grundvarianten

**Status:** ERLEDIGT / zeitabhängige Verifikation bleibt

Standardroute und Zekari-/Sairme-Variante sind konzeptionell getrennt. Kurz vor der Reise müssen nur Strassenzustand, Freigabe, Wetter und Fahrzeugbedingungen erneut geprüft werden.

---

# Grundregel für neue Pendenzen

Neue offene Arbeiten werden **nur in dieser Datei** ergänzt. Keine zusätzlichen konkurrierenden Pendenz- oder Umsetzungskonzeptdateien im Repository anlegen.