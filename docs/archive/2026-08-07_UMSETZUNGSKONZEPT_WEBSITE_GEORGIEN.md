> **Archivierter Umsetzungsstand vom 7. August 2026. Nicht als aktuelle Arbeitsanweisung verwenden.**
>
> Mehrere darin als offen bezeichnete Punkte sind inzwischen erledigt oder durch neue Entscheidungen ersetzt. Aktuelle Aufgaben stehen in `docs/ARBEITSPLAN_AKTUELL.md`.

# Umsetzungskonzept Website Georgien – 7. August 2026

## 1. Zweck

Dieses Dokument ist die verbindliche Arbeitsanweisung für die nächste Codex-Umsetzung im Repository `manuk95/reisen`.

Es ist zusammen mit folgenden Quellen zu verwenden:

1. `RECHERCHE_WEBSITE_GEORGIEN_7.8.26.md`
2. `UMSETZUNGSKONZEPT.md`
3. `UMSETZUNGSPLAN_SCHRITT_3.md`
4. `Georgienreise_2026_Manuel_Martina(1).docx`
5. `outputs/struktur-georgien-2026/georgien-2026-inhaltsstruktur.xlsx`
6. aktuellem Quellcode und bestehender Website.

Ziel ist keine Neuentwicklung, sondern die konsequente Weiterentwicklung der bestehenden Astro-Website zu einem vollständigen, verlässlichen und offline nutzbaren Reisebegleiter.

Technische Detailentscheide darf Codex selbst treffen, solange bestehende funktionierende Mechanismen nicht ohne Grund ersetzt werden.

---

# 2. Verbindliche Gesamtziele

Die Umsetzung muss folgende Punkte vollständig abdecken:

1. Schritt 4 aus dem bisherigen Konzept vollständig auditieren und allfällige Lücken schliessen.
2. sichtbare und funktionierende PWA-/Website-Aktualisierung ergänzen.
3. neue Seite mit vollständigen Fluginformationen erstellen.
4. Bahnreise Entlebuch ↔ Zürich Flughafen integrieren.
5. alle 14 Tagesprogramme detailliert überprüfen und verbessern.
6. Fahrzeiten und Distanzen aller Fahrtage neu verifizieren.
7. direkte Google-Maps-Routen ergänzen.
8. Tag 7 Stepantsminda → Vardzia → Kutaisi separat und besonders sorgfältig prüfen.
9. Kostenübersicht vollständig anhand des Word-Dokuments ausbauen.
10. Schritt 5: alle Item-Seiten auf Narikala-Standard bringen.
11. Schritt 6: vollständige technische und inhaltliche QA durchführen.
12. Datenschutz des öffentlichen Repositorys berücksichtigen.

---

# 3. Bestehende Architektur respektieren

Vor Änderungen zuerst den aktuellen Stand prüfen.

Bestehende Komponenten und Mechanismen bevorzugt erweitern:

- Astro / TypeScript
- Content Collections
- zentrale Navigation
- automatische interne Verlinkung
- Pagefind
- Leaflet / OSM
- Manifest
- Service Worker
- Offline-Fallback
- vorhandene Validierung
- GitHub-Pages-Deployment.

Der Basispfad `/reisen/` bleibt unverändert.

Keine parallele zweite Inhaltsstruktur aufbauen.

---

# 4. Arbeitspaket 1 – Schritt 4 vollständig auditieren

## Ziel

Feststellen, ob die bisher geplante Informationsarchitektur wirklich vollständig umgesetzt ist.

## Abgleich

`Excel-Seitenregister → Content → Route → Navigation → Übersicht → Suche → Website`

## Prüfen

- jede im Excel vorgesehene Seite vorhanden
- eindeutige Seiten-ID
- URL korrekt
- Collection korrekt
- Menü-/Footer-Aufruf korrekt
- Übersichtskarten vollständig
- Bild oder bewusster Platzhalter
- Quellen vorhanden
- interne Links vorhanden
- Suchindex vollständig
- keine unnötigen Doppelstrukturen.

Fehlende Bestandteile zuerst ergänzen, bevor Schritt 5 als abgeschlossen betrachtet werden kann.

---

# 5. Arbeitspaket 2 – PWA-Update / neue Version

## Problem

Die Offline-Web-App kann nach neuen Deployments weiterhin alte gecachte Inhalte anzeigen.

Der Nutzer darf nicht mehr gezwungen sein:

- Browserdaten zu löschen
- Inkognito-Modus zu verwenden
- die PWA neu zu installieren.

## Gewünschte Benutzerzustände

Mindestens:

- `Aktuell`
- `Prüfe auf Aktualisierung …`
- `Neue Version verfügbar`
- `Offline – Aktualisierungsprüfung nicht möglich`
- `Aktualisierung fehlgeschlagen`

Wenn eine neue Version bereitsteht:

> Neue Version verfügbar → Aktualisieren

## Verhalten nach Klick

- neue Version übernehmen
- notwendige Cache-Bereinigung durchführen
- neue Version aktivieren
- kontrolliert neu laden
- aktuelle Inhalte anzeigen
- Offline-Fähigkeit erhalten.

## Anforderungen

- installierte PWA berücksichtigen
- normale Browseransicht berücksichtigen
- mehrere Tabs testen
- Offline-Fallback weiterhin funktionsfähig
- kein manuelles Löschen lokaler Daten erforderlich
- sichtbare Versions- oder Build-Kennung vorsehen, sofern sinnvoll.

## Technische Freiheit

Codex entscheidet selbst über:

- Versionskennung
- Service-Worker-Lifecycle
- Update-Komponente
- Cache-Versionierung
- Reload-Strategie
- eventuelle Tests / Helper.

## Pflicht-Abnahmetest

1. Version A deployen und cachen.
2. Version B deployen.
3. alte App erneut öffnen.
4. Update wird erkannt.
5. Hinweis erscheint.
6. Update anklicken.
7. Version B wird aktiviert.
8. neue Inhalte sind sichtbar.
9. Browserdaten wurden nicht gelöscht.
10. Offline-Modus funktioniert weiter.

---

# 6. Arbeitspaket 3 – neue Seite Fluginformationen

## Seite erstellen

Neue eigene Seite innerhalb des Georgien-Bereichs.

Sie muss gut erreichbar sein, unter anderem von:

- Reiseplan
- Tag 1
- Tag 13
- Tag 14
- passenden Navigationselementen.

## Hinflug 28.09.2026

### Zürich → Belgrad

- Air Serbia
- voraussichtlich JU331
- ZRH
- Abflug 09:30 Uhr
- BEG
- Ankunft vor Umsetzung nochmals exakt verifizieren.

### Belgrad → Tbilisi

- Air Serbia JU890
- Abflug 13:20 Uhr
- Ankunft 18:20 Uhr

Gesamtreise:

- 09:30 → 18:20 lokal
- 6 Std. 50 Min. gemäss Buchung.

## Rückflug 10./11.10.2026

### Batumi → Istanbul

- Turkish Airlines TK393
- Abflug 22:40 Uhr
- Ankunft 23:50 Uhr

### Istanbul → Zürich

- Turkish Airlines TK1907
- Abflug 07:55 Uhr
- Ankunft 09:55 Uhr

Umstieg ca. 8 Std. 05 Min.
Gesamtreise 13 Std. 15 Min.

## Seite darstellen

- Datum
- Wochentag
- Fluggesellschaft
- Flugnummer
- Flughäfen
- IATA-Codes
- lokale Abflug-/Ankunftszeit
- Zeitzonen / Zeitverschiebung
- Segmentdauer
- Umsteigezeit
- Gesamtdauer
- Timeline
- Aktualitätsdatum
- Links zu Airline / Flugstatus.

Zeitabhängige Angaben wie Gate, Terminal oder Flugzeugtyp nur mit Hinweis, dass diese geändert werden können.

Keine privaten Buchungsdaten veröffentlichen.

---

# 7. Arbeitspaket 4 – Bahn Entlebuch ↔ Zürich Flughafen

## 28. September 2026

Datumsspezifisch recherchieren:

`Entlebuch → Zürich Flughafen`

Abflug ZRH 09:30 Uhr.

Darstellen:

- empfohlene Hauptverbindung
- mindestens zwei sinnvolle Alternativen
- Abfahrt
- Umstiege
- Ankunft
- gesamte Fahrzeit
- Flughafenreserve.

Die Hauptempfehlung muss ausreichend Puffer bieten.

## 11. Oktober 2026

Datumsspezifisch recherchieren:

`Zürich Flughafen → Entlebuch`

Landung ZRH 09:55 Uhr.

Einplanen:

- Aussteigen
- Einreise, falls nötig
- Gepäck
- Weg zum Bahnhof.

Darstellen:

- realistische Hauptverbindung
- mindestens zwei spätere Alternativen.

## Quellen

Bevorzugt:

- SBB
- search.ch Fahrplan.

Keine unbestätigten Zeiten erfinden.

Integration in Tag 1 und Tag 14.

---

# 8. Arbeitspaket 5 – alle Tagesprogramme neu prüfen

Alle 14 Tage vollständig durchgehen.

## Pro Tag prüfen

- Startzeit
- zeitliche Reihenfolge
- Weglogik
- Nettofahrzeit
- Distanz
- Stopps
- Aufenthaltszeiten
- Essen / Pausen
- Öffnungszeiten
- Reservierungsbedarf
- Wanderzeiten
- Wetterabhängigkeiten
- Sonnenauf-/untergang, wo sinnvoll
- Rückfahrt
- Hotelankunft
- Reserven
- Plan B.

## Ziel

Die Tagesseiten müssen vor Ort direkt nutzbar sein und nicht nur grobe Ideenskizzen darstellen.

Fahr- und Besichtigungstage nicht überladen.

Romantische Küstentage bewusst ruhiger lassen.

---

# 9. Arbeitspaket 6 – Google-Maps-Routen

Für relevante Fahrtage direkte externe Links anlegen.

Mindestens:

| Tag | Route |
|---|---|
| 3 | Tbilisi → Jvari → Mtskheta → Tbilisi |
| 4 | Tbilisi → Zhinvali/Ananuri → Pasanauri → Gudauri → Stepantsminda |
| 6 | Trusso-/Juta-Varianten, wenn sinnvoll |
| 7 | Stepantsminda → Vardzia → Kutaisi |
| 8 | Kutaisi-Rundroute |
| 9 | Kutaisi → Shekvetili |
| 12 | Shekvetili → Batumi Botanical Garden → Batumi → Shekvetili |
| 13 | Shekvetili → Batumi Airport |

## Pro Fahrtag darstellen

- reine Fahrdistanz
- reine Fahrzeit
- geplante Zwischenstopps
- Stopdauer
- realistische Gesamtzeit
- empfohlene Abfahrt
- erwartete Ankunft
- Google-Maps-Link.

Google Maps soll wenn möglich bereits alle vorgesehenen Hauptstopps enthalten.

Kein Google-API-Key erforderlich, sofern direkter `maps/dir`-Link genügt.

---

# 10. Arbeitspaket 7 – Tag 7 separat neu bewerten

## Ausgangslage

Aktuelle Website:

- ca. 600 km
- 13–15 Std.

Vom Nutzer bereitgestellte Google-Maps-Route:

- ca. 341 km.

Diese Abweichung darf nicht einfach durch Ersetzen einer Zahl korrigiert werden.

## Variante A – Standardroute

Prüfen:

- reguläre Hauptstrassen
- Distanz
- Nettofahrzeit
- Pausen
- Vardzia
- Gesamtdauer
- sinnvoller Tagesbeginn.

## Variante B – kürzere Route via Abastumani/Zekari/Sairme

Prüfen:

- aktuelle Befahrbarkeit
- Strassenbelag
- Baustellenstatus
- Mietwagentauglichkeit
- Mietwagenbedingungen
- SUV-/4x4-Empfehlung
- Reifenanforderungen
- Wetterrisiken Anfang Oktober.

Die kurze Google-Maps-Route nur übernehmen, wenn sie für das konkrete Fahrzeug und den Reisezeitpunkt verantwortbar ist.

## Zusatzstopp

Khertvisi Fortress prüfen.

Nur in den Hauptplan aufnehmen, wenn ohne unvernünftige Verlängerung möglich.

---

# 11. Arbeitspaket 8 – vollständige Kostenübersicht

## Ausgangslage

Die aktuelle Seite `src/pages/georgien/kosten.astro` enthält im Wesentlichen nur allgemeine Budgethinweise und keine vollständige Reisekalkulation.

Dies wird grundlegend erweitert.

## Verbindliche Quelle

`Georgienreise_2026_Manuel_Martina(1).docx`

Alle dort vorhandenen Kostenangaben müssen berücksichtigt werden.

Keine Kostenposition darf stillschweigend verloren gehen.

## 11.1 Vollständige Kostenpositionen aus dem Word

### Flüge

- Flüge für zwei Personen: CHF 900.

### Tbilisi – 3 Nächte

- CHF 45–80 pro Nacht
- gesamt CHF 135–240.

### Kazbegi – 3 Nächte

- CHF 40–85 pro Nacht
- gesamt CHF 120–255
- Rooms Hotel nur als optionales Upgrade behandeln, soweit nicht inzwischen definitiv gebucht.

### Kutaisi – 2 Nächte

- CHF 40–70 pro Nacht
- gesamt CHF 80–140.

### Küstenvariante A – kleineres Poolhotel, 4 Nächte

- CHF 85–190 pro Nacht
- CHF 340–760 total.

### Küstenvariante B – Split

- 2 Nächte günstigeres Poolhotel
- 2 Nächte Paragraph
- CHF 630–1’140 total.

Diese Variante ist im Word als ausgewogene Empfehlung geführt.

### Küstenvariante C – Paragraph, 4 Nächte

- CHF 230–380 pro Nacht
- CHF 920–1’520 total.

### Mietwagen

- 10 Tage
- CHF 30–55/Tag plus One-way/Vollkasko
- Gesamtplanwert CHF 400–750.

### Fahrdistanz

- direkte Hauptroute: 677 km
- Zusatzkilometer: ca. 573 km
- realistischer Arbeitswert: ca. 1’250 km.

Dieser Wert ist neu gegen die korrigierten Tagesrouten zu prüfen.

### Treibstoff

Word-Rechnung:

- 1’250 km
- 8.5 l/100 km
- GEL 3.70/l
- ca. GEL 393
- ca. CHF 122
- verwendeter Kurs: 1 CHF = GEL 3.23.

### Parkieren

- ca. GEL 80
- ca. CHF 25.

### Treibstoff + Parkieren

- ca. CHF 147
- empfohlener Budgetposten CHF 150.

### Alternative: Transfers statt Mietwagen

- ca. CHF 700–1’050 plus lokale Touren
- nicht gleichzeitig mit der Mietwagenvariante als Pflichtblock rechnen.

### Essen und Getränke

- CHF 35–65 pro Tag für zwei
- gesamt CHF 490–910.

### Eintritte / Bäder / Touren

- CHF 300–600
- umfasst u.a. Schwefelbad, Höhle, 4x4, Wein, Boot.

### Reserve

- ca. 10 %
- CHF 250–450.

### Gesamtkosten empfohlene ausgewogene Variante

Im Word:

> ca. CHF 3’452–5’532 für zwei Personen.

Alternative Küstenvarianten dürfen dabei nicht doppelt gerechnet werden.

## 11.2 Darstellungsanforderungen Kosten

Kostenseite soll mindestens bieten:

- vollständige Positionstabelle
- Kategorie
- Bezeichnung
- Berechnungsgrundlage
- Menge/Nächte/Tage, wo vorhanden
- Preisband oder Fixpreis
- Originalwährung, wo vorhanden
- CHF-Wert
- Status
- Bemerkung
- Verknüpfung zu Reiseinhalt.

Sinnvolle Status:

- gebucht
- bezahlt
- geplant
- geschätzt
- optional
- ersetzt / nicht verwendet.

## 11.3 Summen

Mindestens anzeigen:

- Gesamtkosten für zwei
- Gesamtkosten pro Person
- bekannte/fixe Kosten
- geschätzte Kosten
- optionale Kosten
- Zwischensummen nach Kategorie.

Wenn Datenlage es erlaubt zusätzlich:

- bezahlt
- offen
- fix
- variabel.

## 11.4 Alternativen korrekt behandeln

Wichtigster Punkt:

Alternative Szenarien dürfen die Gesamtsumme nicht aufblasen.

Insbesondere:

- Küstenhotel A / Split / Paragraph sind Alternativen
- Mietwagen / Privattransfers sind Alternativen.

Die Website soll die Varianten vergleichbar darstellen und für die aktuelle Gesamtsumme klar definieren, welches Szenario verwendet wird.

## 11.5 Wechselkurse

Bei GEL oder anderen Währungen:

- Originalbetrag erhalten
- verwendeten Kurs dokumentieren
- Kursdatum anzeigen
- CHF-Wert anzeigen.

Bereits bezahlte historische CHF-Kosten nicht automatisch durch einen neuen Wechselkurs verfälschen.

## 11.6 Datenschutz

Nicht veröffentlichen:

- PNR
- Ticketnummern
- Kartendaten
- Konten
- Zahlungsreferenzen
- Passdaten
- Rechnungsadresse
- private Kontakte.

Kostenbeträge selbst dürfen vollständig dargestellt werden.

## 11.7 Vollständigkeitskontrolle

Vor Abschluss eine Kontrollmatrix erstellen bzw. intern prüfen:

`Word-Position → Website-Position → Summenbehandlung → Status`

Keine Word-Position ohne bewusst dokumentierte Behandlung.

---

# 12. Arbeitspaket 9 – Schritt 5: alle Item-Seiten angleichen

Narikala ist der Qualitätsstandard.

## Reihenfolge

1. Sehenswürdigkeiten
2. Orte / Regionen
3. Gerichte / Getränke
4. Restaurants
5. Unterkünfte.

## Pro Seite prüfen

- guter Einstieg
- geschichtlicher / kultureller Kontext
- Bedeutung
- Besonderheiten
- überraschende / interessante Details
- was man vor Ort beachten oder anschauen soll
- praktische Besuchsinformationen
- Bezug zur konkreten Reise
- Reisetage
- interne Links
- aktuelle, belastbare Quellen
- Bild / Alttext
- Aktualitätshinweis.

Fehlende Inhalte:

1. zuerst aus Word übernehmen
2. danach mit Primär-/Fachquellen ergänzen.

Zeitabhängige Angaben nicht als dauerhaft gültig darstellen.

---

# 13. Arbeitspaket 10 – Schritt 6: Gesamt-QA

## Build / statische Prüfungen

Mindestens:

- `npm ci`
- `npm run check`
- `npm run test`
- `npm run build`
- Pagefind-Erzeugung
- interne Links
- Bilder
- Alttexte
- IDs
- Metadaten
- Aliasse
- Manifest
- Service Worker
- `/reisen/`-Pfad.

## Inhaltliche Prüfung

- Flugdaten konsistent
- Bahnzeiten datumsspezifisch
- Tagesprogramme realistisch
- Distanzen plausibel
- Fahrzeiten plausibel
- Google-Maps-Routen korrekt
- Tag 7 fachlich geklärt
- Kosten vollständig
- Kostensummen korrekt
- alternative Szenarien nicht doppelt gezählt
- keine Widersprüche zwischen Tagesplan, Route, Karte, Kosten und Detailseiten.

## Responsive

Prüfen bei mindestens:

- 390 px
- 768 px
- 1440 px.

## Funktionen

- Hauptmenü
- Footer
- Dark Mode
- Tastatur
- Fokus
- Touch
- Suche
- Karte
- verweigerte Standortfreigabe
- Tagesseiten
- Flugseite
- Kostenseite
- Maps-Links
- Offline-Seite
- PWA-Update
- Druckansicht, soweit vorhanden.

Wenn praktikabel:

- Chromium Desktop
- Android / installierte PWA
- Safari / iOS.

---

# 14. Datenschutz / öffentliches Repository

Repository ist öffentlich.

Vor Veröffentlichung prüfen:

- keine Passdaten
- keine Buchungscodes
- keine Zahlungsdaten
- keine privaten Telefonnummern / E-Mails
- keine Versicherungsnummern
- keine vertraulichen Belege.

Im Repository vorhandene DOCX/PDF-Quelldokumente separat auf Risiko hinweisen.

Nicht eigenmächtig:

- Git-History umschreiben
- Quelldokumente löschen
- bestehende sensible Commits bereinigen.

Solche Änderungen benötigen separaten Auftrag.

---

# 15. Arbeitspaket 11 – Abschlussbericht

Am Ende eine klare Umsetzungszusammenfassung liefern.

Dokumentieren:

- welche Dateien geändert wurden
- welche Seiten neu sind
- welche Tagesdaten korrigiert wurden
- finale Fahrdistanzen
- finale Fahrtzeiten
- gewählte Tag-7-Route und Begründung
- Flugdaten und Quellen
- Bahnverbindungen und Quellen
- Google-Maps-Routen
- Kostenübernahme aus Word
- Gesamtsumme / Variantenlogik
- offene zeitabhängige Angaben
- Datenschutzbefunde
- ausgeführte Tests
- Testergebnisse
- bekannte Einschränkungen.

---

# 16. Technische Entscheidungen für Codex

Codex darf selbst entscheiden über:

- Datenmodell Flüge
- Datenmodell Bahn
- Datenmodell Kosten
- Erweiterung des Reisetag-Schemas
- Google-Maps-Link-Struktur
- Update-/Versionierungsmechanismus
- Service-Worker-Details
- Komponentenstruktur
- Teststruktur
- zusätzliche Validatoren
- nötige Abhängigkeiten.

Leitlinie:

> Bestehende robuste Mechanismen erweitern, nicht ohne Nutzen ersetzen.

---

# 17. Abnahmekriterien

Die Umsetzung gilt erst als abgeschlossen, wenn alle folgenden Punkte erfüllt sind.

## Informationsarchitektur

- Schritt 4 vollständig geprüft
- Excel und Website abgeglichen
- keine unbegründeten fehlenden Seiten.

## Updatefunktion

- neue Version wird erkannt
- sichtbarer Hinweis vorhanden
- Klick aktualisiert
- kein Löschen von Browserdaten nötig
- Offline-Nutzung bleibt erhalten.

## Flüge

- eigene Flugseite vorhanden
- alle vier Segmente korrekt
- Umsteigezeiten und Gesamtdauer vorhanden
- Quellen / Aktualitätshinweise vorhanden.

## Bahn

- 28.09.2026 Entlebuch → Zürich Flughafen vorhanden
- Hauptverbindung plus mindestens zwei Alternativen
- 11.10.2026 Zürich Flughafen → Entlebuch vorhanden
- Hauptverbindung plus mindestens zwei Alternativen
- realistische Puffer.

## Tagesprogramme

- alle 14 Tage überprüft
- Fahrtage korrigiert
- Stopps sinnvoll
- Zeiten realistisch.

## Google Maps

- relevante Fahrtage besitzen funktionierende Routenlinks
- Stopps stimmen mit Tagesplan überein.

## Tag 7

- Distanzabweichung geklärt
- tatsächliche fahrbare Route dokumentiert
- Mietwagentauglichkeit geprüft
- Tagesplan entsprechend korrigiert.

## Kosten

- alle Word-Kostenpositionen übernommen
- alternative Positionen korrekt gekennzeichnet
- keine Doppelzählungen
- Gesamtkosten für zwei sichtbar
- Kosten pro Person sichtbar
- Wechselkurslogik nachvollziehbar
- Status/Fix/Schätzung sinnvoll unterscheidbar
- Datenschutz eingehalten.

## Schritt 5

- alle Item-Seiten nach Narikala-Standard geprüft.

## Schritt 6

- technische Tests fehlerfrei oder Abweichungen sauber begründet
- Responsive geprüft
- Suche funktioniert
- Karte funktioniert
- Offline funktioniert
- Updatefunktion mit Alt-/Neuversion getestet.

---

# 18. Wichtigste bekannte Fakten / offene Unsicherheiten

## Sicher

- Service Worker / Offline-Modus existieren bereits.
- Sichtbare Updatefunktion fehlt.
- Tag 7 enthält aktuell stark abweichende Distanz-/Zeitangaben.
- Rückflugzeiten TK393/TK1907 sind mit der Buchung konsistent.
- JU890 passt zur gebuchten Hinreise.
- aktuelle Kostenseite ist keine vollständige Kalkulation.
- Word enthält vollständige Kostenlogik mit Alternativszenarien.

## Vor Umsetzung nochmals verifizieren

- exakte JU331-Ankunft
- konkrete Bahnverbindungen an beiden Reisetagen
- finale Tag-7-Strassenroute
- Zekari-/Abastumani-Status
- aktuelle Öffnungszeiten / Eintrittspreise
- effektive Hotelbuchungen und tatsächlich bezahlte Werte.

---

**Stand:** 7. August 2026
