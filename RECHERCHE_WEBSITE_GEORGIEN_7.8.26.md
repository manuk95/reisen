# Recherche Website Georgien – Stand 7. August 2026

## Zweck

Diese Datei sammelt die für die nächste Codex-Umsetzung relevanten Fakten, Abweichungen, Quellen und offenen Punkte. Sie ergänzt `UMSETZUNGSKONZEPT.md` und `UMSETZUNGSPLAN_SCHRITT_3.md`.

Technische Detailentscheidungen bleiben Codex überlassen. Wo Angaben zeitabhängig oder nicht abschliessend verifiziert sind, ist dies ausdrücklich markiert.

---

# 1. Aktueller technischer Stand der Website

## 1.1 Architektur

Aktuell vorhanden:

- Astro / TypeScript
- statische Ausgabe für GitHub Pages
- unveränderter Basispfad `/reisen/`
- Content Collections / Markdown
- Pagefind-Suche
- Leaflet / OpenStreetMap
- zentrale Navigation über `src/data/site-pages.ts`
- automatische interne Verlinkung über `src/markdown/autolink.mjs`
- Manifest
- Service Worker
- Offline-Fallback
- Validierung über `scripts/validate.mjs`
- GitHub-Actions-Deployment.

Wichtige Dateien:

- `astro.config.mjs`
- `src/layouts/Base.astro`
- `src/content.config.ts`
- `src/pages/georgien/tag/[slug].astro`
- `src/data/site-pages.ts`
- `src/markdown/autolink.mjs`
- `public/sw.js`
- `scripts/validate.mjs`
- `.github/workflows/pages.yml`

## 1.2 Service Worker / Offline-App

Aktueller Service Worker:

- Cache-ID derzeit `reisen-v4`
- Cache-first-Verhalten für gleiche Origin
- `skipWaiting()`
- `clients.claim()`
- alte Caches werden beim Aktivieren gelöscht
- Offline-Fallback ist vorhanden.

Aktuell fehlt jedoch eine für Nutzer sichtbare Update-Logik.

### Problem

Nach neuen Deployments kann eine bereits installierte bzw. gecachte Web-App weiterhin die alte Version anzeigen. Der Nutzer musste dafür wiederholt Browserdaten löschen oder die Seite inkognito öffnen.

### Zielverhalten

Die Website soll künftig mindestens folgende Zustände darstellen können:

- Aktuell
- Prüfe auf Aktualisierung …
- Neue Version verfügbar
- Offline – Prüfung nicht möglich
- Aktualisierung fehlgeschlagen.

Wenn eine neue Version erkannt wird:

> Neue Version verfügbar → Aktualisieren

Nach Klick soll die neue Version kontrolliert übernommen und angezeigt werden, ohne manuelles Löschen von Browserdaten.

### Relevante Web-Standards / Quellen

- MDN `ServiceWorkerRegistration.update()` – explizite Prüfung auf neuen Service Worker:
  https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update
- MDN `updatefound`:
  https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/updatefound_event
- web.dev – PWA update behaviour:
  https://web.dev/learn/pwa/update
- web.dev – Service Worker lifecycle:
  https://web.dev/articles/service-worker-lifecycle

### Abnahmetest

Die Umsetzung muss mit zwei tatsächlich unterschiedlichen Deployments getestet werden:

1. Version A öffnen/installieren und cachen.
2. Version B deployen.
3. Website/PWA neu öffnen.
4. Neue Version wird erkannt.
5. Update-Hinweis erscheint.
6. Klick auf Aktualisieren.
7. Version B wird aktiviert.
8. Seite wird kontrolliert neu geladen.
9. Version-B-Inhalt ist sichtbar.
10. Browserdaten wurden nicht manuell gelöscht.
11. Offline-Funktion weiterhin testen.
12. Mehrere offene Tabs prüfen.

Technische Umsetzung, Versionskennung und Cache-Strategie darf Codex selbst wählen.

---

# 2. Flugrecherche

## 2.1 Hinreise – Montag, 28. September 2026

Gebuchte Gesamtdaten laut Reiseplanung:

- Zürich 09:30 Uhr
- Tbilisi 18:20 Uhr
- Air Serbia
- 1 Umstieg
- Gesamtdauer 6 Std. 50 Min.

### Segment 1 – Zürich ZRH → Belgrad BEG

Voraussichtlicher Flug:

- Air Serbia JU331
- Abflug Zürich: 09:30 Uhr
- Ankunft Belgrad gemäss aktuell auffindbaren Flugplandaten etwa 11:10–11:15 Uhr
- Flugzeit ca. 1 Std. 40–45 Min.

**Status:** Flugnummer und Abflug passen zur Recherche. Die exakte planmässige Ankunft in Belgrad soll Codex nochmals gegen einen aktuellen Flugplan bzw. die Buchungsdaten prüfen.

Air Serbia:
https://www.airserbia.com/

### Segment 2 – Belgrad BEG → Tbilisi TBS

- Air Serbia JU890
- Montag: Abflug Belgrad 13:20 Uhr
- Ankunft Tbilisi 18:20 Uhr

Air Serbia Flug-/Streckenseite:
https://www.airserbia.com/

### Umsteigezeit

Je nach final bestätigter Ankunft JU331 etwa 2 Std. 05–10 Min.

## 2.2 Rückreise – Samstag/Sonntag, 10./11. Oktober 2026

Gebuchte Gesamtdaten:

- Batumi 22:40 Uhr
- Zürich 09:55 Uhr am Folgetag
- Turkish Airlines
- 1 Umstieg
- Gesamtdauer 13 Std. 15 Min.

### Segment 1 – Batumi BUS → Istanbul IST

- Turkish Airlines TK393
- Samstag, 10.10.2026
- Abflug Batumi 22:40 Uhr
- Ankunft Istanbul 23:50 Uhr
- Flugzeit ca. 2 Std. 10 Min.
- aktuell als A321neo geplant; Flugzeugtyp ist veränderlich.

Quellen:
- Turkish Airlines: https://www.turkishairlines.com/
- ergänzende Flugplandaten: https://www.flight.info/TK393

### Segment 2 – Istanbul IST → Zürich ZRH

- Turkish Airlines TK1907
- Sonntag, 11.10.2026
- Abflug Istanbul 07:55 Uhr
- Ankunft Zürich 09:55 Uhr
- Flugzeit ca. 3 Std.

Ergänzende Flugplandaten:
https://www.flight.info/TK1907

### Umsteigezeit Istanbul

Ca. 8 Std. 05 Min.

### Anforderungen an neue Flugseite

Darstellen:

- Datum
- Wochentag
- Airline
- Flugnummer
- Abflug- und Ankunftsflughafen
- IATA-Code
- lokale Zeiten
- Zeitzonen / Zeitverschiebung
- Segmentdauer
- Umsteigezeit
- Gesamtreisezeit
- klare Timeline
- aktuelles Prüfdatum
- Hinweis auf veränderliche Gate-/Terminal-/Flugzeugdaten
- Links zur Airline / aktuellen Fluginformation.

Nicht öffentlich darstellen:

- PNR/Buchungscode
- Ticketnummer
- Passdaten
- Zahlungsdaten
- private Kontakte.

---

# 3. Bahnreise Entlebuch ↔ Zürich Flughafen

## 3.1 Abreise 28.09.2026

Gesucht wird:

- Entlebuch → Zürich Flughafen
- Flugabflug 09:30 Uhr.

Die genaue datumsspezifische Verbindung für den 28.09.2026 konnte in dieser Recherche noch nicht belastbar aus einem öffentlich indexierten Fahrplanresultat extrahiert werden.

Der aktuelle Fahrplan zeigt für Entlebuch grundsätzlich frühe Verbindungen Richtung Luzern. Für die finale Website müssen aber die konkreten Verbindungen für **Montag, 28. September 2026** aus SBB oder search.ch übernommen werden.

Ziel:

- empfohlene Hauptverbindung
- mindestens zwei sinnvolle Alternativen
- Abfahrt Entlebuch
- Umstiege
- Ankunft Zürich Flughafen
- Gesamtdauer
- Reserve vor Abflug.

Planerische Vorgabe:

Bei 09:30 Uhr Abflug soll die Hauptverbindung eine grosszügige Flughafenreserve bieten und nicht nur theoretisch kurz vor Check-in-Ende eintreffen.

## 3.2 Rückreise 11.10.2026

Gesucht wird:

- Zürich Flughafen → Entlebuch
- planmässige Landung 09:55 Uhr.

Auch hier müssen die exakten Verbindungen für **Sonntag, 11. Oktober 2026** im datumsspezifischen Fahrplan nochmals bestätigt werden.

Bei der Empfehlung einplanen:

- Aussteigen
- mögliche Einreiseformalitäten
- Gepäckausgabe
- Weg zum Bahnhof.

Darstellen:

- realistische Hauptverbindung
- mindestens zwei spätere Alternativen.

## 3.3 Fahrplanquellen

SBB:
https://www.sbb.ch/

search.ch Fahrplan:
https://search.ch/timetable

search.ch verwendet Daten von opentransportdata und unterstützt datumsspezifische Abfragen.

**Offener Punkt:** Exakte Verbindungen am Ausführungszeitpunkt nochmals live recherchieren. Keine Zeiten erfinden.

---

# 4. Tagesprogramme – aktueller Befund

Alle 14 Tagesseiten sollen erneut gegen reale Reisezeiten, Distanzen, Öffnungszeiten und sinnvolle Reserven geprüft werden.

Aktuelle Tageslogik im Repository:

## Tag 1 – Zürich → Tbilisi

- 09:30 Abflug
- 18:20 Ankunft
- ca. 20:00 Transfer/Check-in
- ca. 21:00 Abendessen.

Ergänzen:

- Bahn Entlebuch → Zürich Flughafen
- Flugsegmente
- Umsteigezeit Belgrad
- Puffer am Flughafen.

## Tag 2 – Tbilisi

Altstadt / Narikala / Abanotubani / weitere Stadtpunkte.

Prüfen:

- sinnvolle Reihenfolge nach Lage
- Öffnungszeiten
- Schwefelbad-Reservation
- Sonnenuntergang / Abendoption.

## Tag 3 – Tbilisi / Mtskheta

Aktuell:

- Dschwari
- Mtskheta
- Swetizchoweli
- Rückkehr Tbilisi.

Google-Maps-Route ergänzen:

Tbilisi → Jvari Monastery → Mtskheta → Tbilisi.

## Tag 4 – Tbilisi → Stepantsminda

Aktuell ca. 155 km, 6–8 Std. mit Stopps.

Stopps:

- Zhinvali/Schinwali
- Ananuri
- Pasanauri
- Gudauri Friendship Monument
- Kreuzpass / Mineralquelle
- Stepantsminda.

Dies ist grundsätzlich plausibel; Distanz und Nettofahrzeit nochmals live mit der finalen Stoppreihenfolge prüfen.

## Tag 5 – Gergeti / Sno

Wetterabhängige Wanderung bzw. 4x4-Alternative sinnvoll.

## Tag 6 – Trusso oder Juta

Varianten sauber trennen.

Für beide Optionen:

- Transferlogik
- Wanderzeit
- Strassentauglichkeit
- lokale Fahrer / 4x4
- Plan B bei Schlechtwetter.

## Tag 7 – Stepantsminda → Vardzia → Kutaisi

**Grösster aktueller Prüfpunkt.**

Im Repository steht derzeit ungefähr:

- 600 km
- 13–15 Std.

Die vom Reisenden erstellte Google-Maps-Route zeigt dagegen ungefähr:

- 341 km.

Diese Differenz muss vor der Änderung geklärt werden.

### Warum die 341 km nicht ungeprüft übernommen werden dürfen

Die kürzere Route kann eine Passage über Abastumani / Zekari / Sairme verwenden.

Georgia Travel beschreibt Routen über Zekari ausdrücklich als SUV-Strecke bzw. mit besonderen Reifenanforderungen:

https://georgia.travel/

Zusätzlich liefen 2026 Strassenbauarbeiten im Raum Abastumani / Kutaisi–Baghdati–Abastumani–Benara.

Georgische Strassenverwaltung:
https://www.georoad.ge/

### Zu vergleichen

#### Variante A – robuste Standardroute

- reguläre Hauptstrassen
- Distanz
- Nettofahrzeit
- Vardzia-Besuch
- Pausen
- Gesamtdauer.

#### Variante B – Zekari-/Abastumani-/Sairme-Korridor

Prüfen:

- aktuelle Öffnung
- Strassenbelag
- Mietwagentauglichkeit
- SUV/4x4-Erfordernis
- Mietwagenvertrag / verbotene Strassen
- Wetterrisiko Anfang Oktober
- Baustellenstatus.

### Zusätzlicher Stopp

Khertvisi Fortress als sehr logischer Stopp auf dem Weg nach Vardzia prüfen.

Nur aufnehmen, wenn der Tagesablauf dadurch nicht unvernünftig wird.

## Tag 8 – Kutaisi und Umgebung

Aktuell:

- Bagrati
- Gelati
- Motsameta
- Prometheus Cave / Tskaltubo.

Prüfen:

- Öffnungszeiten
- Reihenfolge
- tatsächliche Fahrtzeit
- Höhleneinlass / letzte Tour
- realistische Aufenthaltsdauer.

## Tag 9 – Kutaisi → Shekvetili

Aktuell ca. 110 km / 2–4 Std. mit optionalen Stopps.

Mögliche Stopps nur übernehmen, wenn logisch:

- Familienweingut in Imeretien
- Poti / Kolkheti
- Ozurgeti.

Nicht zu viele Optionen gleichzeitig in den Hauptablauf packen.

## Tag 10 – Shekvetili

Ruhe-/Romantiktag. Keine Überplanung.

## Tag 11 – Küsten-/Naturtag

Kolkheti / Guria oder bewusster Resorttag abhängig vom Wetter.

## Tag 12 – Batumi-Ausflug

Route:

Shekvetili → Batumi Botanical Garden → Batumi → Shekvetili.

Aktuell ca. 100–120 km / 2–2.5 Std. Fahrzeit für Hin-/Rückfahrt plus Stadtbewegung; live prüfen.

## Tag 13 – Shekvetili → Batumi Airport

Aktuell ungefähr:

- ca. 46–50 km
- rund 1 Std.
- Abflug 22:40 Uhr.

Tagesplanung mit Late Check-out / Spa / Gepäckdepot sinnvoll.

## Tag 14 – Zürich → Entlebuch

Ergänzen:

- Landung 09:55
- Gepäck-/Einreisezeit
- Hauptzugverbindung
- mindestens zwei spätere Alternativen.

---

# 5. Google-Maps-Routen

Für die Website sollen direkte externe Routenlinks hinterlegt werden.

Mindestens:

1. Tag 3: Tbilisi → Jvari → Mtskheta → Tbilisi
2. Tag 4: Tbilisi → Zhinvali/Ananuri → Pasanauri → Gudauri Friendship Monument → Stepantsminda
3. Tag 6: separate Trusso- und Juta-Varianten, wenn fahrtechnisch sinnvoll
4. Tag 7: Stepantsminda → Vardzia → Kutaisi
5. Tag 8: Kutaisi-Rundroute
6. Tag 9: Kutaisi → Shekvetili
7. Tag 12: Shekvetili → Batumi Botanical Garden → Batumi → Shekvetili
8. Tag 13: Shekvetili → Batumi International Airport.

Bevorzugtes Linkformat ohne API-Key:

`https://www.google.com/maps/dir/?api=1&origin=...&destination=...&waypoints=...`

Codex darf ein anderes robustes externes Linkformat verwenden.

---

# 6. Kostenübersicht aus dem Word-Dokument

Verbindliche Quelle für die aktuelle Kostenbasis:

`Georgienreise_2026_Manuel_Martina(1).docx`

Das Word-Dokument enthält aktuell folgende Kosten- und Entscheidungswerte.

## 6.1 Flüge

| Position | Berechnung | CHF für 2 | Bemerkung |
|---|---:|---:|---|
| Flüge für 2 | gebucht | 900 | vorgegebener Gesamtpreis |

## 6.2 Unterkünfte

| Position | Berechnung | CHF für 2 | Bemerkung |
|---|---:|---:|---|
| Tbilisi, 3 Nächte | 3 × CHF 45–80 | 135–240 | privates Bad, Bewertung 8+ |
| Kazbegi, 3 Nächte | 3 × CHF 40–85 | 120–255 | Rooms Hotel als optionales Upgrade |
| Kutaisi, 2 Nächte | 2 × CHF 40–70 | 80–140 | zentral und Parkplatz prüfen |
| Küste, 4 Nächte kleineres Poolhotel | 4 × CHF 85–190 | 340–760 | Magnetic oder Miramare; saisonalen Poolbetrieb prüfen |
| Küste, Split 2 Poolhotel + 2 Paragraph | 2 × CHF 85–190 + 2 × CHF 230–380 | 630–1’140 | Empfehlung für Balance aus Romantik, Pool und Budget |
| Shekvetili, 4 Nächte Paragraph | 4 × CHF 230–380 | 920–1’520 | Luxusvariante |

Wichtig:

- Die drei Küstenvarianten sind **Alternativen** und dürfen in einer Gesamtsumme nicht addiert werden.
- Die empfohlene Planvariante im Word ist die Split-Lösung.

## 6.3 Mietwagen und Fahrleistung

| Position | Berechnung | Wert | Bemerkung |
|---|---:|---:|---|
| Mietwagen 10 Tage | CHF 30–55/Tag + Einweg/Vollkasko | CHF 400–750 | Tbilisi 30.9./1.10. bis Batumi 10.10. |
| Direkte Hauptroute | Google-Maps-Angabe des Reisenden | 677 km | Tiflis Airport–Tiflis–Kazbegi–Vardzia–Kutaisi–Shekvetili–Batumi Airport |
| Zusatzkilometer | Stadtverkehr, Mtskheta, Berg- und Tagesausflüge | + ca. 573 km | Tbilisi/Mtskheta 90; Kazbegi 150; Kutaisi 90; Küste/Batumi 163; Umwege/Reserve 80 |
| Planungsdistanz gesamt | 677 + 573 | ca. 1’250 km | später gegen reale Tagesnavigation abgleichen |

## 6.4 Treibstoff und Parkieren

| Position | Berechnung | Wert | Bemerkung |
|---|---:|---:|---|
| Benzin 95 | 1’250 km × 8.5 l/100 km × GEL 3.70/l | ca. GEL 393 / CHF 122 | Annahme kompakter Crossover; Kurs 1 CHF = GEL 3.23 |
| Parkieren | Hotels meist gratis; Städte/Ausflüge ca. GEL 80 | ca. CHF 25 | keine Strassenmaut auf geplanter Route |
| Treibstoff + Parkieren | CHF 122 + CHF 25 | ca. CHF 147 | sinnvoller Budgetposten CHF 150 |

## 6.5 Mobilitätsalternative

| Position | CHF für 2 | Bemerkung |
|---|---:|---|
| Transfers statt Mietwagen | ca. 700–1’050 | mehrere Privatfahrten plus lokale Touren; weniger flexibel |

Diese Position ist eine Alternative zum Mietwagen und darf nicht gleichzeitig mit dem Mietwagen als Pflichtblock in derselben Szenariensumme geführt werden.

## 6.6 Essen / Aktivitäten / Reserve

| Position | Berechnung | CHF für 2 | Bemerkung |
|---|---:|---:|---|
| Essen/Getränke | CHF 35–65 pro Tag für 2 | 490–910 | mit einigen gehobenen Abenden |
| Eintritte/Bäder/Touren | gesamt | 300–600 | Schwefelbad, Höhle, 4x4, Wein, Boot |
| Reserve | ca. 10 % | 250–450 | Wetter, Taxi, Preisänderungen |

## 6.7 Gesamtsumme im Word

Empfohlene ausgewogene Variante:

- Flüge
- Tbilisi
- Kazbegi
- Kutaisi
- Split-Küste
- Mietwagen
- Treibstoff/Parkieren
- Essen/Getränke
- Eintritte/Bäder/Touren
- Reserve.

Im Word ausgewiesen:

> **ca. CHF 3’452–5’532 für zwei Personen**

Hinweis im Word:

> Summe aller verwendeten Positionen; alternative Küstenvarianten nicht doppelt gerechnet.

### Kostenempfehlung aus dem Word

- CHF 150 als Planwert für Benzin und Parkieren einsetzen.
- Mietwagen und Split-Unterkunft an der Küste vergleichen.
- Wird Paragraph für vier Nächte deutlich über CHF 1’000, sind zwei günstigere Nächte plus zwei Luxusnächte wirtschaftlich klarer.

## 6.8 Anforderungen an die Website-Kostenübersicht

Die aktuelle Website-Kostenseite ist nur ein allgemeiner Erklärungstext. Sie soll zur vollständigen Arbeits- und Entscheidungstabelle werden.

Darstellen:

- vollständige Positionen des Word-Dokuments
- Originalberechnung
- CHF-Spanne / CHF-Wert
- Bemerkung
- klar erkennbare Alternativen
- keine Doppelzählung alternativer Hotel-/Mobilitätsvarianten
- Gesamt für zwei Personen
- Gesamt pro Person
- Planwert / gebucht / effektiv / optional, wo Daten vorhanden
- fixe vs. variable Kosten, sofern sinnvoll
- verwendete Wechselkurse und Datum
- Verknüpfung zu Hotels, Flügen, Aktivitäten und Reisetagen.

### Vollständigkeitsregel

Keine Kostenposition aus dem Word-Dokument darf stillschweigend verschwinden.

Vor Abschluss ist ein Abgleich durchzuführen:

`Word-Kostenposition → Website-Kostenposition → Summenlogik`

### Datenschutz

Nicht aus dem Word oder anderen Buchungsunterlagen öffentlich übernehmen:

- Kreditkartendaten
- Zahlungsreferenzen
- Kontonummern
- PNR
- Ticketnummern
- Passdaten
- private Kontakte
- Rechnungsadressen.

---

# 7. Schritt 4 / 5 / 6

## 7.1 Schritt 4 zuerst vollständig auditieren

Vor Schritt 5 muss überprüft werden, ob das Excel-Seitenregister vollständig umgesetzt ist.

Abgleich:

`Excel → Content Collections → Routen → Navigation → Website`

Prüfen:

- alle Seiten vorhanden
- IDs eindeutig
- URLs korrekt
- Menüs korrekt
- Übersichten vollständig
- Suchindex
- Bilder / Platzhalter
- Quellen
- interne Verweise.

## 7.2 Schritt 5 – Narikala-Standard auf alle Item-Seiten

Reihenfolge:

1. Sehenswürdigkeiten
2. Orte / Regionen
3. Essen / Getränke
4. Restaurants
5. Unterkünfte.

Pro Seite prüfen:

- Einstieg
- Geschichte / Bedeutung
- interessante Details
- praktische Besuchsinformationen
- Reisebezug
- Reisetage
- interne Links
- belastbare Quellen
- Bild / Alttext
- Aktualitätshinweis.

## 7.3 Schritt 6 – Gesamt-QA

Zusätzlich zu bestehenden Tests künftig prüfen:

- PWA-Update Altversion → Neuversion
- Flugkonsistenz
- ÖV-Verbindungen
- Fahrdistanzen / Fahrzeiten
- Google-Maps-Links
- Kosten-Summenlogik
- keine Doppelzählung von Alternativen
- Datenschutz
- Responsive 390 / 768 / 1440
- Suche
- Karte / verweigerte Standortfreigabe
- Offline-Modus.

---

# 8. Datenschutzbefund zum öffentlichen Repository

Das Repository ist öffentlich.

Im Root liegen aktuell unter anderem das Word- und PDF-Quelldokument der Reise. Gleichzeitig verlangt `AGENTS.md`, dass private DOCX/PDF-Eingaben, Buchungsnummern, Passdaten, Zahlungsangaben, Kontakte und ähnliche sensible Daten nicht committed werden.

Daraus folgt:

- Inhalt auf sensible Daten prüfen.
- Keine neuen privaten Buchungsunterlagen öffentlich committen.
- Bestehende Dateien nicht ohne separaten Auftrag löschen oder Git-History umschreiben.
- Problem im Abschlussbericht explizit dokumentieren.

---

# 9. Offene Punkte / Unsicherheiten

## Sicher

- sichtbarer Update-Button/-Status fehlt aktuell
- Service Worker und Offline-Caching existieren
- Tag 7 ist im aktuellen Content mit ca. 600 km / 13–15 Std. deutlich anders beschrieben als die vom Nutzer genannte Google-Maps-Route
- Rückflug TK393/TK1907 passt zeitlich zur gebuchten Gesamtreise
- Air Serbia JU890 passt montags mit 13:20 → 18:20
- Kostenübersicht im Word enthält eine vollständige Planungslogik und mehrere alternative Unterkunftsszenarien.

## Noch zu verifizieren

- exakte JU331-Ankunft in Belgrad für 28.09.2026
- terminal-/gate-/aircraft-Angaben kurz vor Reise
- genaue Bahnverbindungen 28.09. und 11.10.2026
- reale, mietwagentaugliche Route Stepantsminda → Vardzia → Kutaisi
- Strassenstatus Zekari/Abastumani Anfang Oktober 2026
- endgültige Distanzen aller Fahrtage
- tatsächliche Hotelpreise / gebuchte Hotels
- effektiv bezahlte Kosten, soweit später verfügbar.

---

# 10. Hauptquellen

## Projektintern

- `Georgienreise_2026_Manuel_Martina(1).docx`
- `UMSETZUNGSKONZEPT.md`
- `UMSETZUNGSPLAN_SCHRITT_3.md`
- Excel-Seitenregister unter `outputs/struktur-georgien-2026/`
- aktueller Astro-Code im Repository.

## Web

- Air Serbia: https://www.airserbia.com/
- Turkish Airlines: https://www.turkishairlines.com/
- Flughafen Zürich: https://www.flughafen-zuerich.ch/
- Tbilisi Airport: https://tbilisiairport.com/
- Batumi Airport: https://batumiairport.com/
- SBB: https://www.sbb.ch/
- search.ch Fahrplan: https://search.ch/timetable
- Google Maps: https://www.google.com/maps
- Georgia Travel: https://georgia.travel/
- Roads Department of Georgia: https://www.georoad.ge/
- MDN Service Worker Update: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update
- web.dev PWA Update: https://web.dev/learn/pwa/update

---

**Recherche-Stand:** 7. August 2026
