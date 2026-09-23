# Konzept: Regionenkarte Georgien

Stand: 23. September 2026  
Status: **aktive technische Spezifikation – Umsetzung durch Codex**

## 1. Ziel

Auf `/georgien/orte/` soll eine eigenständige, anschauliche **SVG-Regionenkarte von Georgien** entstehen.

Die Karte beantwortet primär:

- Wo liegen die Regionen Georgiens?
- Welche Regionen werden auf der Reise 2026 tatsächlich besucht?
- Welche Regionen sind nur optional relevant?
- Welche wichtigen Reiseorte liegen in welcher Region?
- Welche Orte und Sehenswürdigkeiten der bestehenden Content Collections gehören zur ausgewählten Region?

Die Regionenkarte ist eine **Orientierungskarte**. Sie ersetzt ausdrücklich **nicht** die interaktive Routenkarte unter `/georgien/karte/`.

## 2. Abgrenzung zur Routenkarte

### Regionenkarte `/georgien/orte/`

- administrative Regionen als Hauptinhalt
- wichtige Reiseorte als Marker
- kein detailliertes Strassennetz
- keine vermeintlich exakte Fahrroute
- vollständig lokal und offline nutzbar
- SVG, kein Leaflet
- Interaktion über Klick, Touch und Tastatur

### Routenkarte `/georgien/karte/`

- tatsächliche Reiseetappen
- Orte, Sehenswürdigkeiten, Hotels und weitere Punkte
- Routenverlauf
- Standortfunktion
- Entfernungen und «In der Nähe»
- Leaflet / OSM beziehungsweise lokale Routengeometrie

Beide Karten dürfen gemeinsame Hilfsfunktionen und Regions-Metadaten nutzen, sollen aber nicht dieselbe UI-Komponente sein.

## 3. Datenquelle für Regionsgrenzen

Bevorzugte Quelle:

- **geoBoundaries gbOpen – Georgia ADM1**
- API-Metadaten: `https://www.geoboundaries.org/api/current/gbOpen/GEO/ADM1/`
- lokale Kopie der benötigten Geometrie im Repository
- keine Regionsgeometrie zur Laufzeit aus dem Internet laden

Die aktuell geprüften Metadaten nennen:

- Boundary-Typ: ADM1
- 12 Verwaltungseinheiten
- repräsentiertes Jahr: 2015
- Quelle: geoBoundaries / Wikimedia
- Lizenz des konkreten GEO-ADM1-Datensatzes: Creative Commons Attribution 3.0

Vor dem Commit der Geometrie die Metadaten nochmals prüfen und einen sichtbaren Quellen-/Lizenzhinweis auf der Seite oder im Karten-Footer vorsehen.

Empfohlene Ablage:

```text
src/data/maps/georgia-adm1.geojson
src/data/georgia-region-meta.ts
```

Alternativ darf Codex die Quelldatei bei der Implementierung einmalig in eine vereinfachte lokale JSON-/TypeScript-Struktur umwandeln. Entscheidend ist: **kein Runtime-Fetch**.

## 4. Kanonische Regions-IDs und deutsche Anzeigenamen

Die Geometriequelle, englische Datennamen und bestehende Content-Werte dürfen nicht direkt als UI-Schlüssel verwendet werden.

Eine zentrale Normalisierung soll stabile IDs liefern:

| ID | Anzeige |
|---|---|
| `tbilisi` | Tbilisi |
| `mtskheta-mtianeti` | Mtskheta-Mtianeti |
| `shida-kartli` | Shida Kartli |
| `kvemo-kartli` | Kvemo Kartli |
| `kakheti` | Kachetien |
| `imereti` | Imeretien |
| `guria` | Gurien |
| `adjara` | Adscharien |
| `samegrelo-zemo-svaneti` | Samegrelo-Zemo Swanetien |
| `racha-lechkhumi-kvemo-svaneti` | Ratscha-Letschchumi und Niederswanetien |
| `samtskhe-javakheti` | Samtskhe-Dschawachetien |
| `abkhazia` | Abchasien |

Falls die gewählte Geometriequelle eine weitere separat dargestellte umstrittene Gebietseinheit enthält, darf sie neutral zusätzlich dargestellt werden. **Keine Geometrie selbst erfinden oder Grenzen redaktionell nachzeichnen.**

### Bestehende Content-Aliase

Mindestens folgende vorhandene oder historisch verwendete Werte müssen sauber normalisiert werden:

- `Samegrelo und Swanetien` → `samegrelo-zemo-svaneti`
- `Samegrelo-Zemo Swanetien` → `samegrelo-zemo-svaneti`
- `Ratscha` → `racha-lechkhumi-kvemo-svaneti`
- `Samtskhe-Dschawachetien` → `samtskhe-javakheti`

Nicht mehr als kanonische Regionswerte verwenden:

- `Kartli`
- `Kazbegi`
- `Kaukasus`
- `Shekvetili / Gurien`
- `Samtskhe-Javakheti`

Die zuletzt korrigierten Orts-/Sehenswürdigkeitsdaten sollen nicht wieder auf diese unscharfen Werte zurückgeführt werden.

## 5. Ableitung des Reisestatus einer Region

Keine zweite manuell gepflegte Liste der bereisten Regionen anlegen.

Der Zustand wird aus den bestehenden Collections für die konkrete Reise abgeleitet.

### Bereist

Eine Region gilt als **bereist**, wenn mindestens ein Eintrag der Collection `orte`

- zur Reise `georgien-2026` gehört,
- `days.length > 0` hat,
- und nicht `status: nicht-auf-route` ist.

Damit sind aktuell insbesondere als bereist abzuleiten:

- Tbilisi
- Mtskheta-Mtianeti
- Shida Kartli
- Imeretien
- Gurien
- Adscharien

### Optional relevant

Eine Region gilt als **optional relevant**, wenn:

- sie nicht bereits als bereist gilt,
- aber mindestens eine Sehenswürdigkeit der Reise dort einem Reisetag zugeordnet ist,
- und der Eintrag nicht `nicht-auf-route` ist.

Damit kann beispielsweise Samegrelo-Zemo Swanetien wegen des optionalen Kolkheti-Nationalparks hervorgehoben werden.

### Nicht auf Route

Alle übrigen Regionen bleiben neutral.

Einzelne vorhandene Inhalte wie Vardzia bleiben weiterhin erreichbar, erzeugen ohne Reisetag aber keinen Routenstatus.

## 6. Ortsmarker

Marker auf der Regionenkarte werden automatisch aus der Collection `orte` erzeugt.

Standardfilter:

```text
trip === georgien-2026
days.length > 0
status !== nicht-auf-route
coordinates vorhanden
```

Damit werden aktuell insbesondere angezeigt:

- Tbilisi
- Mtskheta
- Stepantsminda / Kazbegi
- Gori
- Kutaisi
- Shekvetili
- Batumi

Vardzia bleibt als Ortsseite bestehen, wird aber nicht als Marker der aktuellen Reise dargestellt, solange `days` leer ist.

Markerpositionen stammen ausschliesslich aus den vorhandenen `coordinates`.

## 7. Visual Design

Die Karte soll sich am Stil einer klassischen politischen/administrativen Übersichtskarte orientieren, aber visuell zur Website passen.

### Grunddarstellung

- Georgien als klare Gesamtform
- interne Regionsgrenzen gut sichtbar
- Schwarzes Meer als ruhiger blauer Hintergrundbereich
- Nachbarländer nicht erforderlich; falls dargestellt, nur sehr dezent
- keine Strassen, Höhenlinien oder sonstige Detailkartografie

### Zustände

Mindestens drei visuell unterscheidbare Regionszustände:

1. **bereist**
2. **optional relevant**
3. **nicht Teil der aktuellen Route**

Information darf nicht ausschliesslich über Farbe vermittelt werden. Optional zusätzlich unterschiedliche Kontur, Punkt-/Musterbehandlung oder Textkennzeichnung verwenden.

Farben über bestehende CSS-Variablen beziehungsweise neue semantische Variablen definieren, nicht als verstreute Hex-Werte in SVG-Pfaden.

### Labels

Auf ausreichenden Viewports deutsche Regionsnamen direkt in der Karte anzeigen.

Lange Namen dürfen auf mehrere Zeilen umbrechen.

Bei sehr kleinen Regionen oder kleinen Smartphone-Viewports darf die vollständige Bezeichnung in die Detailbox verlagert werden, solange die Karte verständlich bleibt.

## 8. Interaktion

### Region auswählen

Jede Region ist:

- per Maus klickbar
- per Touch auswählbar
- per Tastatur fokussierbar
- mit Enter/Space aktivierbar

Eine Auswahl aktualisiert eine Detailbox direkt unter oder neben der Karte.

### Detailbox

Mindestens anzeigen:

- Regionsname
- Reisestatus: bereist / optional / nicht auf Route
- relevante Orte der Reise
- relevante Sehenswürdigkeiten
- Links auf die bestehenden Detailseiten

Sortierung:

1. Einträge mit konkretem Reisetag
2. empfohlene Inhalte
3. optionale Inhalte
4. `nicht-auf-route` nur als klar gekennzeichneter Zusatz, falls überhaupt angezeigt

Keine URLs oder Linklisten parallel manuell pflegen. Links aus Collection-Slugs erzeugen.

### Ortsmarker

Beim Fokussieren/Klicken eines Markers:

- Ortsname
- Region
- relevante Reisetage
- Link «Ort öffnen»

Die Marker dürfen Regionsklicks nicht unbenutzbar machen.

## 9. Barrierefreiheit

Erforderlich:

- semantischer Titel und Beschreibung für die SVG-Karte
- jede interaktive Region mit verständlichem `aria-label`
- sichtbarer Fokus
- Tastaturbedienung
- Touch-Ziele möglichst mindestens 44 × 44 CSS-Pixel; bei kleinen Kartenregionen über unsichtbare/erweiterte Hit-Areas lösen
- Status nicht nur über Farbe kommunizieren
- Detailbox mit sinnvoller Überschriftenstruktur
- `prefers-reduced-motion` respektieren
- keine notwendige Information nur in Hover-Tooltips verstecken

## 10. Responsive Verhalten

Primär testen bei:

- 390 px
- 768 px
- 1440 px

### Smartphone

- keine horizontale Seitenscrollbar
- Karte über nahezu volle Inhaltsbreite
- sinnvolles Seitenverhältnis, ungefähr 4:3 bis 16:10
- Detailbox unter der Karte
- Regionslabels nur soweit lesbar; keine winzige Schrift erzwingen
- Ortskarten unterhalb der Karte wie bisher

### Desktop

- Karte gross genug für direkte Regionsbeschriftung
- Detailbox darf neben der Karte stehen, wenn dies die Lesbarkeit verbessert

## 11. Dark Mode

Keine separate Dark-Mode-Grafik.

SVG-Pfade, Grenzen, Wasser, Marker und Fokuszustände über CSS steuerbar machen.

Mindestens semantische Variablen für:

- Standardregion
- bereiste Region
- optionale Region
- Regionsgrenze
- Wasser
- Ortsmarker
- Fokus/Auswahl

Kontrast in Light und Dark Mode prüfen.

## 12. Offline und Datenschutz

Die Regionenkarte muss vollständig ohne Internet funktionieren.

Nicht zulässig:

- externe Kartenkacheln
- Runtime-Fetch der GeoJSON-Datei von Drittservern
- Tracking
- externe Kartenskripte

Alle notwendigen Daten werden in den statischen Build integriert.

Die Regionenkarte benötigt keinen Standortzugriff.

## 13. Umgang mit umstrittenen Gebieten

Die Karte dient der **Reiseorientierung**, nicht der politischen Bewertung territorialer Konflikte.

Regeln:

- Geometrie aus der dokumentierten Quelle übernehmen.
- Keine Grenzlinien oder Gebiete selbst redaktionell erfinden.
- Abchasien beziehungsweise weitere separat in der Quelle enthaltene umstrittene Gebiete neutral darstellen.
- Diese Gebiete nicht als normale bereiste Tourismusregion hervorheben.
- Ein kurzer neutraler Kartenhinweis darf erklären, dass die Darstellung der Orientierung dient und keine Aussage über den politischen Status von Gebieten bezweckt.
- Bestehende Reise-/Sicherheitshinweise bleiben auf den dafür vorgesehenen Inhaltsseiten.

## 14. Technische Architektur

Bevorzugte Struktur:

```text
src/components/GeorgiaRegionsMap.astro
src/data/maps/georgia-adm1.geojson
src/data/georgia-region-meta.ts
src/lib/regions.ts              # falls gemeinsame Normalisierung sinnvoll ist
src/pages/georgien/orte.astro
```

Die Regionsnormalisierung soll auch von der normalen Routenkarte und späteren reiseübergreifenden Komponenten nutzbar sein.

Keine Abhängigkeit von einem grossen neuen Karten-Framework einführen.

Die technische Basis darf Georgien-spezifische **Geometriedaten und Übersetzungen** enthalten; generische Hilfsfunktionen für Regionszuordnung und Content-Verknüpfung sollen dagegen wiederverwendbar bleiben.

## 15. Tests

Mindestens automatisiert oder nachvollziehbar prüfen:

### Daten

- jeder kanonische Content-Regionswert kann normalisiert werden
- unbekannte Regionswerte führen zu einer klaren Warnung/Testfehler
- Tbilisi → Tbilisi
- Mtskheta und Stepantsminda → Mtskheta-Mtianeti
- Gori → Shida Kartli
- Kutaisi → Imeretien
- Shekvetili → Gurien
- Batumi → Adscharien
- Vardzia bleibt Content, ist aber kein Marker der aktuellen Route

### Kartenlogik

- alle erwarteten Regionspfade vorhanden
- bereiste Regionen werden korrekt abgeleitet
- optional relevante Regionen werden korrekt abgeleitet
- Ortsmarker werden aus Collection-Daten erzeugt
- Auswahl einer Region zeigt passende Inhalte
- Links respektieren den Basispfad `/reisen/`

### UI

- Tastaturnavigation
- sichtbarer Fokus
- Touch
- Dark Mode
- 390 / 768 / 1440 px
- kein horizontaler Overflow
- Offline-Darstellung ohne Netzwerk

## 16. Abnahmekriterien

Die Aufgabe gilt als abgeschlossen, wenn:

1. `/georgien/orte/` die lokale SVG-Regionenkarte zeigt.
2. Alle Regionen der gewählten Geometriequelle verständlich dargestellt sind.
3. Bereiste und optionale Regionen automatisch aus Content abgeleitet werden.
4. Wichtige Reiseorte automatisch als Marker erscheinen.
5. Regionsauswahl passende Orte und Sehenswürdigkeiten verlinkt.
6. Vardzia als bestehender Ort erhalten bleibt, aber nicht fälschlich als aktuelle Route markiert wird.
7. Karte ohne Internet vollständig funktioniert.
8. Light/Dark Mode, Touch und Tastatur funktionieren.
9. Keine parallele manuelle Regions-/Ortsliste zur Content Collection entsteht.
10. `npm ci`, `npm run check`, `npm run test` und `npm run build` erfolgreich sind.
11. Visuelle Prüfung bei 390, 768 und 1440 px erfolgt ist.

## 17. Quellen für die technische Umsetzung

- geoBoundaries API / GEO ADM1: `https://www.geoboundaries.org/api/current/gbOpen/GEO/ADM1/`
- Geostat Regionsübersicht: `https://www.geostat.ge/en/modules/categories/68/by-regions`
- Geostat regional comparison: `https://regions.geostat.ge/regions/comparison/regionComp.php?lang=en`

Die Quellen dienen zur Geometrie-/Regionskontrolle. Content und Reisebezug bleiben im Repository die Single Source of Truth.
