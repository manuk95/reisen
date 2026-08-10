> **Archivierter Planungsstand vom 6. August 2026. Nicht als aktuelle Arbeitsanweisung verwenden.**
>
> Aktuelle Aufgaben, Reihenfolge und Zuständigkeit stehen in `docs/ARBEITSPLAN_AKTUELL.md`.

# Schritt 3 – Detaillierter Umsetzungsplan

Stand: 6. August 2026  
Grundlage: `outputs/struktur-georgien-2026/georgien-2026-inhaltsstruktur.xlsx` und aktueller Stand des Astro-Projekts

## 1. Ziel und Abgrenzung

Dieser Plan übersetzt das freigegebene Seitenregister in konkrete, prüfbare Arbeitspakete für Schritt 4 und bereitet die Qualitätsprüfung der Item-Seiten in Schritt 5 vor.

In Schritt 3 werden ausdrücklich **keine Website-Seiten, Navigationen, Inhalte, Weiterleitungen oder Datenmodelle umgesetzt**. Auch das Excel wird in diesem Schritt nicht stillschweigend verändert. Erkannte Restfragen werden zuerst als Freigabepunkte dokumentiert.

## 2. Verbindliche Vorgaben

- Die Excel-Datei bleibt die redaktionelle Übersicht über alle kanonischen Seiten.
- Kapitelnummern aus dem Word-Dokument dienen nur zur internen Zuordnung und erscheinen weder in Seitentiteln noch in URLs.
- Jede kanonische Inhaltsseite erhält eine eindeutige Seiten-ID.
- Sehenswürdigkeiten erhalten jeweils eine eigene Detailseite und werden zusätzlich auf regionalen Übersichtsseiten als Bildkacheln angezeigt.
- Speisen und Getränke erhalten jeweils eine eigene Detailseite und werden zusätzlich auf der Kulinarikübersicht als Bildkacheln angezeigt.
- Regionen dürfen als Sammelbegriffe bestehen bleiben.
- „Praktisches“ gehört zu „Wissen über Georgien“ und wird als eine Seite mit Inhaltsabschnitten umgesetzt.
- Die Packliste bleibt eine separate Seite und ist zusätzlich über den Footer erreichbar.
- Restaurant- und Unterkunftsdetailseiten bleiben eigenständige Item-Seiten.
- Erwähnungen vorhandener Orte, Regionen, Sehenswürdigkeiten, Speisen, Restaurants und Unterkünfte werden im Fließtext automatisch verlinkt.
- Übersichten und Navigationen werden aus strukturierten Daten beziehungsweise Content Collections erzeugt; es entstehen keine zusätzlich manuell gepflegten Item-Linklisten.
- Fehlende lizenzierte Bilder verwenden vorübergehend `/images/platzhalter.png` und werden eindeutig als Platzhalter gekennzeichnet.
- Das Startbild ist `/images/start_image.png`.
- Der unveränderliche GitHub-Pages-Basispfad bleibt `/reisen/`.

## 3. Umfang laut Excel

Das aktuelle Seitenregister enthält 156 Einträge:

| Bereich | Registrierte Seiten |
|---|---:|
| Startseite | 1 |
| Reiseplan | 18 |
| Entdecken | 95 |
| Kosten | 1 |
| Essen & Trinken | 25 |
| Übernachten | 1 |
| Wissen über Georgien | 12 |
| Suche | 1 |
| Weitere Seiten | 2 |
| **Gesamt** | **156** |

Enthalten sind unter anderem:

- 14 Reisetage;
- 1 Regionsübersicht und 12 Regionsseiten;
- 1 Sehenswürdigkeitsübersicht und 77 Sehenswürdigkeitsseiten;
- 1 Kulinarikübersicht und 23 Speisen-/Getränkeseiten;
- je 1 Übersicht für Restaurants und Unterkünfte;
- 1 Wissensübersicht und 11 untergeordnete Wissens-/Praxis-Seiten.

## 4. Freigabepunkte vor Schritt 4

### 4.1 Fehlende Seiten-IDs für bestehende Item-Seiten

Im Repository bestehen derzeit sieben Restaurantdetailseiten und elf Unterkunftsdetailseiten. Im Excel sind dagegen nur die beiden Übersichten „Restaurants“ und „Hotels & Unterkünfte“ als Seiten 140 und 141 eingetragen.

Da jede Seite eine eindeutige Seiten-ID erhalten soll, müssen vor der technischen Migration 18 zusätzliche Registerzeilen angelegt werden. Werden alle bestehenden Einträge beibehalten, wächst das Register von 156 auf mindestens 174 kanonische Seiten.

Die betroffenen bestehenden Einträge sind:

**Restaurants**

- 360 Sky Bar
- Baia’s Wine
- Barbarestan
- Keto and Kote
- Laguna
- Palaty
- Pasanauri

**Unterkünfte**

- Ambassadori Tbilisi
- Best Western Kutaisi
- Borjomi Likani
- Communal Hotel Telavi
- Gudauri Lodge
- Hotel Old Town Batumi
- Ibis Styles Tbilisi Center
- Rooms Hotel Kazbegi
- Schuchmann Wines Château
- Tskaltubo Plaza
- Vardzia Resort

**Vorgesehene Entscheidung:** Alle 18 Detailseiten bleiben erhalten. Im Excel werden unmittelbar vor Schritt 4 neue, fortlaufende Seiten-IDs, die kanonische URL, die Abrufstelle und der Bildstatus ergänzt. Technische Weiterleitungsseiten erhalten keine eigenen redaktionellen Seiten-IDs.

### 4.2 Adscharisches Chatschapuri

Im Repository existiert neben „Chatschapuri“ eine separate Seite „Adscharisches Chatschapuri“. Das Excel sieht dafür keine eigene kanonische Seite vor.

**Vorgesehene Entscheidung:** Der Inhalt wird in die Seite „Chatschapuri“ integriert. Die bisherige URL bleibt als Weiterleitung auf „Chatschapuri“ erhalten. Falls stattdessen eine eigene Item-Seite gewünscht ist, muss sie zuerst mit eigener Seiten-ID ins Excel aufgenommen werden.

### 4.3 Definition der Seitentiefe in Schritt 4

Eine neue Item-Seite darf in Schritt 4 nur veröffentlicht werden, wenn sie mindestens enthält:

- eindeutige Seiten-ID und kanonische URL;
- Titel, Kurzbeschreibung, Region/Kategorie und Zuordnungen zu Reisetagen;
- einen verständlichen Grundtext aus den freigegebenen Unterlagen;
- mindestens eine belastbare Quelle mit Aktualitätsdatum;
- lokales, rechtlich belegtes Bild oder gekennzeichnetes Platzhalterbild;
- sinnvolle Beziehungen zu Orten, Route und weiteren Items.

Leere Seitenhüllen werden nicht veröffentlicht. Schritt 5 erweitert anschließend jede Item-Seite auf den Narikala-Standard.

## 5. Sollarchitektur

### 5.1 Inhaltsmodell

Die vorhandenen Content Collections bleiben die Grundlage:

- `reisen`
- `reisetage`
- `orte`
- `sehenswuerdigkeiten`
- `genuss`
- `restaurants`
- `unterkuenfte`
- `wissen`
- `praktisches` während der Migration

Für alle kanonischen Inhalte werden folgende gemeinsame Metadaten vorgesehen:

- `pageId`: eindeutige dreistellige oder zukünftig erweiterbare ID;
- `title`, `slug`, `trip`, `country`, `region`, `summary`;
- `categories`, `status`, `days`, `related`;
- `aliases`: kontrollierte Schreibweisen für automatische Textverlinkungen;
- `sources` und `updated`;
- `image`, `imageAlt`;
- `imageStatus`: lizenziertes Bild oder Platzhalter;
- Bildnachweis mit Urheber, Originalquelle, Lizenz und Bearbeitungsnotiz.

Seiten-IDs müssen collectionübergreifend eindeutig sein. Weiterleitungen verwenden die ID der Zielseite nicht als eigene Seite.

### 5.2 Strukturseiten und Navigation

Top-Level-, Übersichts- und technische Seiten erhalten eine kleine zentrale Seitenregistrierung mit:

- Seiten-ID;
- Titel;
- kanonischem Pfad;
- Abschnitt;
- Sortierung;
- Sichtbarkeit im Hauptmenü und/oder Footer.

Diese Registrierung enthält keine zweite manuelle Liste sämtlicher Items. Orte, Sehenswürdigkeiten, Kulinarik, Restaurants und Unterkünfte werden weiterhin direkt aus ihren Collections abgefragt.

Das Excel bleibt die redaktionelle Kontrollansicht. Ein Prüfskript stellt sicher, dass IDs, Pfade und Navigationskennzeichen zwischen Excel, Seitenregistrierung und Content Collections nicht auseinanderlaufen.

### 5.3 Hauptmenü

Das ausklappbare Hauptmenü wird nach den Angaben in Spalte J des Excel aufgebaut:

```text
Startseite
Reiseplan
└─ Gesamtroute
Entdecken
├─ Karte & Route
├─ Orte & Regionen
└─ Sehenswürdigkeiten
Kosten
└─ Kostenübersicht
Essen & Trinken
└─ Kulinarik
Wissen über Georgien
Suche
```

Gruppenüberschriften dürfen zur Orientierung dienen, sind aber nur dann anklickbar, wenn ihnen im Register eine eigene Seite zugeordnet ist.

### 5.4 Footer

Die im Excel als Footer-Einträge markierten Seiten werden sinnvoll gruppiert:

```text
Reiseplanung
├─ Heute
├─ Rechtzeitig buchen
└─ Schlechtwetter

Entdecken
├─ Weinland
├─ UNESCO
└─ Aktivitäten

Unterwegs
├─ Restaurants
├─ Hotels & Unterkünfte
└─ Packliste

Service
└─ Quellen & Bildnachweise
```

### 5.5 Automatische Textverlinkung

Die Verlinkung erfolgt beim statischen Build, nicht erst im Browser. Dafür wird aus den Content Collections ein Aliasverzeichnis erstellt.

Regeln:

- Titel und definierte Aliasnamen werden erkannt, beispielsweise „Tbilisi“, „Tiflis“ oder „Festung Narikala“.
- Längere Begriffe werden vor kürzeren verarbeitet.
- Groß-/Kleinschreibung und deutsche Sonderzeichen werden kontrolliert normalisiert.
- Bereits vorhandene Links, Überschriften, Code, Bild-Alternativtexte und Quellenlisten werden nicht verändert.
- Eine Seite verlinkt nicht auf sich selbst.
- Doppelte Verlinkungen desselben Begriffs innerhalb eines Absatzes werden vermieden.
- Alias-Kollisionen führen zu einem Prüfungsfehler und müssen redaktionell aufgelöst werden.
- Die erzeugten Links berücksichtigen den Basispfad `/reisen/`.

## 6. Kanonische Routen und Migration

Bestehende, passende Pfade werden beibehalten. Veraltete Pfade werden als statische Weiterleitungen erhalten, damit gespeicherte Links nicht brechen.

| Inhalt | Kanonisches Muster | Maßnahme |
|---|---|---|
| Startseite Georgien | `/georgien/` | bestehende Route überarbeiten |
| Heute | `/georgien/heute/` | bestehende Route behalten |
| Gesamtroute | `/georgien/reiseplan/` | bestehende Route behalten, Titel anpassen |
| Reisetage | `/georgien/tag/tag-XX/` | bestehende Routen behalten |
| Rechtzeitig buchen | `/georgien/rechtzeitig-buchen/` | neu |
| Schlechtwetter | `/georgien/schlechtwetter/` | neu |
| Karte & Route | `/georgien/karte/` | bestehende Route behalten |
| Regionsübersicht | `/georgien/orte/` | bestehende Route überarbeiten |
| Region | `/georgien/orte/<slug>/` | auf 12 Sammelregionen migrieren |
| Sehenswürdigkeiten | `/georgien/sehenswuerdigkeiten/` | bestehende Route ausbauen |
| Sehenswürdigkeit | `/georgien/sehenswuerdigkeiten/<slug>/` | bestehendes Muster behalten |
| Weinland | `/georgien/weinland/` | neu |
| UNESCO | `/georgien/unesco/` | neu |
| Aktivitäten | `/georgien/aktivitaeten/` | neu |
| Kosten | `/georgien/kosten/` | neu |
| Kulinarik | `/georgien/genuss/` | bestehende Route überarbeiten |
| Speise/Getränk | `/georgien/genuss/<slug>/` | bestehendes Muster behalten |
| Restaurants | `/georgien/restaurants/` | bestehende Route behalten |
| Restaurant | `/georgien/restaurants/<slug>/` | bestehendes Muster behalten |
| Unterkünfte | `/georgien/hotels/` | bestehende Route behalten |
| Unterkunft | `/georgien/hotels/<slug>/` | bestehendes Muster behalten |
| Wissen | `/georgien/wissen/` | bestehende Route ausbauen |
| Wissensseite | `/georgien/wissen/<slug>/` | bestehendes Muster behalten |
| Praktisches | `/georgien/wissen/praktisches/` | sechs Themen zu einer Seite zusammenführen |
| Grundwortschatz | `/georgien/wissen/grundwortschatz/` | aus Sprachseite lösen |
| Packliste | `/georgien/wissen/packliste/` | separat; alte URL weiterleiten |
| Suche | `/suche/` | bestehende Route behalten |
| Quellen/Bildnachweise | `/bildnachweis/` | bestehende Route erweitern |
| Offline-Fallback | `/offline/` | neu |

## 7. Inhaltliche Migrationsmatrix

### 7.1 Orte und Regionen

Die derzeit sieben Ortsseiten werden in die zwölf im Excel vorgesehenen Sammelregionen überführt. Bestehende Inhalte werden nicht gelöscht, sondern in die passende Regionsseite integriert. Alte URLs verweisen auf die neue Zielseite oder den passenden Abschnitt.

| Bestehender Inhalt | Ziel |
|---|---|
| Tbilisi | Tbilisi |
| Mtskheta und Stepantsminda | Mtskheta-Mtianeti |
| Kutaisi | Imeretien & Kutaisi |
| Shekvetili | Gurien & Shekvetili |
| Batumi | Adscharien & Batumi |
| Vardzia | Samtskhe-Dschawachetien; Sehenswürdigkeit bleibt separat |

Die weiteren Zielregionen werden aus dem Word-Dokument und belastbaren Quellen aufgebaut.

### 7.2 Wissen und Praktisches

| Bestehender Inhalt | Zielhandlung |
|---|---|
| Natur | in „Land, Natur & Bevölkerung“ erweitern |
| Geschichte | übernehmen und neu strukturieren |
| Politik | in „Politik & Gesellschaft“ integrieren |
| Menschenrechte | eigene Seite beibehalten/ausbauen |
| Religion & Kultur | auf „Politik & Gesellschaft“ und „Kultur & Traditionen“ verteilen |
| Sprache | „Sprache & Schrift“; Wortschatz herauslösen |
| Wirtschaft | übernehmen |
| Vergleich Schweiz | übernehmen |
| Konflikte | thematisch in Politik/Geschichte/Praktisches verteilen |
| Kriminalität | in Abschnitt „Sicherheit & Kriminalität“ der Praktisches-Seite integrieren |
| Küche & Wein | in Kulinarik und Weinland integrieren |
| sechs Praktisches-Seiten | zu einer Seite mit Ankern zusammenführen |
| Packliste | separate Wissensseite; zusätzlich im Footer |

### 7.3 Bestehende Item-Seiten

- Die acht vorhandenen Sehenswürdigkeitsseiten bilden die technische und gestalterische Vorlage; Narikala ist der inhaltliche Referenzstandard.
- Die sieben bestehenden Kulinarik-Items werden übernommen und auf das neue Schema migriert.
- „Adscharisches Chatschapuri“ wird standardmäßig in „Chatschapuri“ integriert.
- Die sieben Restaurant- und elf Unterkunftsseiten werden erst nach Ergänzung ihrer IDs im Excel migriert.
- Fehlende oder unklare Bildrechte werden nicht angenommen; stattdessen wird der definierte Platzhalter verwendet.

## 8. Arbeitspakete für Schritt 4

### AP 0 – Seitenregister schließen

**Aufgaben**

- 18 Restaurant-/Unterkunftsdetailseiten im Excel ergänzen.
- Fortlaufende, eindeutige IDs vergeben.
- Abrufstelle, URL, Beschreibung und Bildstatus ergänzen.
- Entscheidung zu „Adscharisches Chatschapuri“ bestätigen und dokumentieren.
- Register erneut auf doppelte IDs, doppelte URLs und fehlende Menüangaben prüfen.

**Abnahme**

- Jede kanonische Seite besitzt genau eine ID und eine URL.
- Keine technische Weiterleitung wird als eigene Inhaltsseite gezählt.

### AP 1 – Schema, Seitenregistrierung und Prüfregeln

**Aufgaben**

- Gemeinsames Content-Schema um Seiten-ID, Aliasnamen und vollständige Bildrechte erweitern.
- Navigationseinträge für Struktur- und Serviceseiten zentral modellieren.
- Eindeutigkeit von IDs, Slugs, URLs und Aliasnamen prüfen.
- Abgleich zwischen Excel, Content Collections und Strukturregistrierung automatisieren.
- Platzhalterregel in der Qualitätsprüfung an die freigegebene Bildstrategie anpassen.

**Abnahme**

- Der Build scheitert bei doppelter/fehlender ID, doppelter URL, Alias-Kollision oder ungültigem Bildstatus.
- Ein freigegebener Platzhalter ist zulässig, aber eindeutig als solcher erkennbar.

**Abhängigkeit:** AP 0.

### AP 2 – Bestehende Inhalte migrieren

**Aufgaben**

- Bestehende Reisetage, Attraktionen, Genuss-Items, Restaurants und Unterkünfte mit IDs und neuen Metadaten ergänzen.
- Orte in Sammelregionen überführen.
- Wissen neu zuschneiden und Praktisches zusammenführen.
- Bestehende Beziehungen (`days`, `related`, Region, Kategorien) bereinigen.
- Alte kanonische Pfade durch gezielte Weiterleitungen absichern.

**Abnahme**

- Kein bestehender sinnvoller Inhalt geht verloren.
- Alte veröffentlichte URLs enden auf einer passenden neuen Seite.
- Kapitelnummern sind nirgendwo als sichtbare Überschriften vorhanden.

**Abhängigkeit:** AP 1.

### AP 3 – Fehlende Seiten in kontrollierten Batches anlegen

**Reihenfolge**

1. Strukturseiten: Buchen, Schlechtwetter, Kosten, Weinland, UNESCO, Aktivitäten und Offline-Fallback.
2. Fehlende Regionsseiten.
3. Fehlende Sehenswürdigkeiten, gruppiert nach den zwölf Regionen.
4. Fehlende Speisen und Getränke.
5. Fehlende Wissens-/Praxis-Seiten.

**Abnahme pro Batch**

- Jede Seite erfüllt die Mindesttiefe aus Abschnitt 4.3.
- Jede Seite ist in genau einer kanonischen Übersicht auffindbar.
- Beziehungen und Quellen sind geprüft.
- Bild oder definierter Platzhalter wird korrekt ausgegeben.

**Abhängigkeit:** AP 2.

### AP 4 – Übersichtsseiten und Kacheln

**Aufgaben**

- Regionsübersicht aus der Orte-Collection erzeugen.
- Sehenswürdigkeiten nach Region gruppieren.
- Auf jeder regionalen Übersicht Attraktionskacheln mit Bild, Kurzbeschreibung und Link anzeigen.
- Kulinarikübersicht mit Bildkacheln für alle Speisen und Getränke ausbauen.
- Restaurant- und Unterkunftsübersichten aus ihren Collections erzeugen.
- Karten, leere Zustände und Platzhalter responsiv gestalten.

**Abnahme**

- Keine Item-Kachel wird manuell in einer Astro-Seite gepflegt.
- Alle registrierten Items erscheinen genau einmal in der vorgesehenen Übersicht.
- Kacheln funktionieren bei 390, 768 und 1440 Pixeln Breite.

**Abhängigkeit:** AP 3.

### AP 5 – Hauptmenü und Footer

**Aufgaben**

- Hart codierte Navigationslisten im Layout durch die zentrale Seitenstruktur ersetzen.
- Hauptmenü exakt nach Excel-Kennzeichen aufbauen.
- Footer nach Abschnitt 5.4 gruppieren.
- Aktive Seite, Tastaturnavigation, Fokusführung und Touch-Ziele prüfen.
- Menütexte von Kapitelnummern und redaktionellen Arbeitshinweisen freihalten.

**Abnahme**

- Jeder als „Hauptmenu“ markierte Eintrag ist im Hamburger-Menü verfügbar.
- Jeder Footer-Eintrag ist im Footer verfügbar.
- Nicht markierte Detailseiten werden nicht versehentlich im Hauptmenü ausgegeben.

**Abhängigkeit:** AP 1 und AP 3.

### AP 6 – Automatische interne Verlinkung

**Aufgaben**

- Aliasverzeichnis aus den Item-Collections erstellen.
- Build-seitige Markdown-/HTML-Verlinkung implementieren.
- Konflikt-, Selbstlink- und Ausnahmeregeln aus Abschnitt 5.5 umsetzen.
- Bericht über unerkannte oder mehrdeutige Begriffe erzeugen.

**Abnahme**

- Erwähnungen wie „Tbilisi“, „Narikala“ oder „Chatschapuri“ verlinken zuverlässig auf die kanonische Seite.
- Bestehende Markdown-Links und Quellen werden nicht beschädigt.
- Die Website benötigt dafür kein zusätzliches Browser-JavaScript.

**Abhängigkeit:** AP 1 und vollständige Aliasdaten aus AP 3.

### AP 7 – Bilder, Startseite und Nachweise

**Aufgaben**

- Startseite auf `start_image.png` umstellen.
- `platzhalter.png` zentral und basispfadfest verwenden.
- Vorhandene Bilder den korrekten Items zuordnen.
- Bildnachweis aus den Metadaten erzeugen.
- Fehlende Rechteangaben als Qualitätsfehler behandeln.

**Abnahme**

- Kein fremdes Bild ohne belegte kompatible Lizenz wird veröffentlicht.
- Alttexte beschreiben das Motiv; Platzhaltertexte benennen den Platzhalterzustand.
- Alle Bildpfade funktionieren unter `/reisen/` und offline, soweit lokal vorhanden.

**Abhängigkeit:** AP 1 und AP 3.

### AP 8 – Suche, Karte, Offline und Service Worker

**Aufgaben**

- Neue Seiten in Pagefind aufnehmen.
- Karte und Routendaten mit den migrierten Regionen/Items abgleichen.
- Offline-Fallback-Seite anlegen und im Service Worker verwenden.
- Cache-Liste von alten Praktisches-Pfaden bereinigen.
- Cache-Version bewusst erhöhen.
- Canonicals, Manifest und Druckansicht für neue Routen prüfen.

**Abnahme**

- Alle veröffentlichten Seiten sind suchbar.
- Abgelehnter Standortzugriff beeinträchtigt die Karte nicht.
- Offline-Fallback und lokale Kernseiten funktionieren unter `/reisen/`.

**Abhängigkeit:** AP 2 bis AP 7.

### AP 9 – Gesamtprüfung und Veröffentlichung

**Automatische Prüfungen**

- `npm ci`
- `npm run check`
- `npm run test`
- `npm run build`
- interne Links und Weiterleitungen;
- Bild- und Metadatenprüfung;
- ID-, URL- und Alias-Eindeutigkeit;
- Abgleich mit dem Excel-Register;
- Manifest, Service Worker, Offline-Fallback und Suche.

**Manuelle Prüfungen**

- Hauptmenü und Footer gegen Spalte J des Excel;
- Ansichten bei 390, 768 und 1440 Pixeln;
- Tastatur, Fokus, Kontrast, Dark Mode und reduzierte Bewegung;
- Attraktions-, Kulinarik-, Restaurant- und Unterkunftskacheln;
- Kartenverhalten bei abgelehntem Standort;
- Narikala als Referenzseite;
- stichprobenartige automatische Textverlinkungen.

**Veröffentlichung**

- Umsetzung auf eigenem Branch;
- nachvollziehbare Commits nach Arbeitspaketen;
- Draft-PR gegen `main` mit Funktionen, Prüfungen, Screenshots, Grenzen und manuellem Pages-Schritt;
- GitHub-Pages-Deployment erst nach erfolgreicher Abnahme.

## 9. Übergang zu Schritt 5

Schritt 4 gilt als strukturell abgeschlossen, wenn alle registrierten Seiten erreichbar, korrekt einsortiert, technisch valide und mindestens veröffentlichungsfähig sind.

Schritt 5 prüft anschließend jede Item-Seite einzeln gegen den Narikala-Standard. Dazu gehören:

- interessanter Einstieg und Besuchskontext;
- Entstehung, Geschichte und Bedeutung;
- besondere Details, Legenden oder überraschende Fakten;
- Hinweise, worauf man vor Ort achten kann;
- praktische, zeitabhängig gekennzeichnete Besuchsinformationen;
- Verknüpfungen zu Route, Region und benachbarten Items;
- belastbare, aktuelle Quellen;
- korrekt lizenzierte Bilder oder bewusster Platzhalterstatus.

Die Prüfung erfolgt collectionweise in dieser Reihenfolge:

1. Sehenswürdigkeiten;
2. Orte und Regionen;
3. Speisen und Getränke;
4. Restaurants;
5. Unterkünfte.

Für jede Collection wird ein Prüfprotokoll geführt: Seiten-ID, geprüfte Tiefe, ergänzte Inhalte, Quellenstand, Bildstatus, offene zeitabhängige Angaben und Ergebnis.

## 10. Definition of Done für Schritt 3

- Excel und aktuelle Website-Struktur wurden abgeglichen.
- Sollarchitektur, Routen, Migration und Abhängigkeiten sind dokumentiert.
- Hauptmenü, Footer und automatische Textverlinkung sind eindeutig spezifiziert.
- Die Restlücke bei Restaurant- und Unterkunfts-IDs ist als Sperrpunkt vor Schritt 4 benannt.
- Arbeitspakete und Abnahmekriterien für Schritt 4 sind festgelegt.
- Der Übergang zur Einzelprüfung in Schritt 5 ist definiert.
- Es wurden keine Website-Funktionen vorgezogen oder umgesetzt.
