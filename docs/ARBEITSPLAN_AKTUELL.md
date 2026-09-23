# Aktueller Arbeitsplan

Stand: 23. September 2026

Dieses Dokument ist die **einzige zentrale Quelle für offene Arbeiten** am Reiseführer-Projekt. Historische Pläne und Recherchestände unter `docs/archive/` sind keine aktuellen Arbeitsanweisungen.

Das Repository ist für **mehrere Reisen** ausgelegt. Georgien 2026 ist die erste konkrete Reise; technische Lösungen sollen wiederverwendbar und nicht unnötig Georgien-spezifisch sein.

## Status

- `OFFEN` – noch auszuführen
- `IN ARBEIT` – begonnen, aber noch nicht vollständig abgenommen
- `VOR REISE PRÜFEN` – grundsätzlich geklärt, zeitabhängige Fakten kurz vor Nutzung erneut prüfen
- `ERLEDIGT` – abgeschlossen; nur Regression/QA bleibt möglich

## Zuständigkeit

- **ChatGPT-Web**: Recherche, Quellenvergleich, Text, Markdown, Inhaltskontrolle und einfache redaktionelle Repository-Änderungen.
- **Codex**: technisch anspruchsvolle Renderer, Astro-/TypeScript-Komponenten, Schema-/Validatoränderungen, komplexe UI-Logik, automatisierte Tests und technische QA.

---

# Phase 1 – Tagesplan-Technik

## 1.1 Generischer Tagesplan-Renderer

**Status:** ERLEDIGT  
**Verantwortlich:** Codex  
**Spezifikation:** [`ANFORDERUNGEN_TAGESPLAN.md`](ANFORDERUNGEN_TAGESPLAN.md)

Umgesetzt sind Single-Source-Tagesablauf aus Markdown, optionale Details, Google-Maps-/Kürzungs-/Schlechtwetterabschnitte, kompakte Tagesfakten, Sticky Tag-Navigation und Tests.

## 1.2 Seite «Heute» / Tagesübersicht verbessern

**Status:** OFFEN  
**Verantwortlich:** Codex  
**Reihenfolge:** nach Phase 9.3

Die Seite `/georgien/heute/` soll als mobile Reiseübersicht aus den bereits vorhandenen Tages- und Content-Daten weiterentwickelt werden. Ziel sind aktueller Reisetag, nächster Programmpunkt, kompakter Tagesablauf, Unterkunft, Tagesfakten und relevante Direktlinks ohne parallele Datenpflege.

Die technische Umsetzung erfolgt erst nach der Karten-/Regions- und Verknüpfungsarbeit aus Phase 9.3, damit dieselben Datenbeziehungen wiederverwendet werden können.

---

# Phase 2 – Mobilität / Seite „Fahrten“

## 2.1 Mietwagenstrategie und Fahrzeugauswahl

**Status:** ERLEDIGT (Fahrzeugauswahl und Website-Eintrag); VERTRAGSABSCHLUSS PRÜFEN  
**Verantwortlich:** ChatGPT-Web

Aktueller Entscheid laut Cars4Rent-Kundenportal vom 17.09.2026:

- **Ford Bronco Sport 4WD, Automatik, 2021–2022**, Easy Off-Road; Anbieter **Cars4Rent**.
- **01.10.2026, 08:00 Uhr**, Übernahme **26 Shalva Dadiani Street, Tbilisi (Innenstadt, nicht Flughafen)**.
- **10.10.2026, 18:00 Uhr**, Rückgabe **Batumi International Airport**. Abflug um 22:40 Uhr.
- Gesamtpreis im Kundenportal **€714**, inklusive €531 Grundmiete, €59 Zusatzzeit, €31 + €57 Lieferung/Abholung und €36 Servicegebühr. Barzahlung in GEL gewählt, Kartenzahlung 3,5 % zusätzlich; Treibstoff extra.
- Laut Angebot keine Kaution, unbegrenzte Kilometer, zusätzliche registrierte Fahrer ohne Gebühr und €0 Selbstbehalt bei gedeckten Schäden. Easy-Off-Road-Reifenschäden €100/Reifen; weitere Ausschlüsse im Vertrag.
- Elektronische Unterschrift, vollständiger Buchungs-/Zahlungsstatus **nicht nachgewiesen**; nicht voreilig als gebucht/bezahlt kennzeichnen.
- Seite `/georgien/fahrten/`, Kostenübersicht, Reiseeintrag, praktische Mobilität sowie Tagesseiten 4 und 13 redaktionell aktualisiert.

**Offene Vertragsklärung vor Unterschrift beziehungsweise Übergabe:** Mietende 10.10. um 18:00 im Hauptvertrag ergänzen; 4WD/Automatik/Easy-Off-Road auch beim Ersatzfahrzeug schriftlich bestätigen; korrekte Stornierungsfrist und Rechte bei verdeckten technischen Mängeln klären; Versicherungs- und Notfallnummern sowie vereinbarte Übergabeorte prüfen. Keine Buchungs-/Ausweisnummern oder Originalverträge in öffentliches Repo hochladen.

Lokale 4×4-Fahrer nur für vertraglich ausgeschlossene oder tatsächlich ungeeignete Bergpisten.

## 2.2 Zeitabhängige Strassen

**Status:** VOR REISE PRÜFEN  
**Verantwortlich:** ChatGPT-Web

Vor Nutzung erneut prüfen:

- Kreuzpass / Georgische Heerstrasse
- Trusso, falls gewählt; ausdrückliche Freigabe der konkreten Route
- Juta, falls gewählt; ausdrückliche Freigabe der konkreten Route
- Bedingungen des tatsächlich übergebenen Cars4Rent-Fahrzeugs (Easy Off-Road, Sperrgebiete, Reifen und Unterboden)

**Nicht mehr routenrelevant:** Abastumani / Zekari / Sairme. Diese Verbindung gehört nicht zum aktuellen Reiseprogramm.

---

# Phase 3 – 14 Tagesdateien

## 3.1 Migration und fachliche Endkontrolle

**Status:** ERLEDIGT

Alle Tagesdateien verwenden den aktuellen Markdown-/Tagesplanaufbau mit Google Maps, Kürzungs- und Schlechtwetterhinweisen. Tag 4 enthält die Mietwagenübernahme um 08:00 Uhr und nachfolgend angepasste Richtzeiten; Tag 13 die Rückgabe am Flughafen Batumi um 18:00 Uhr und eine frühere Abfahrt ab Shekvetili.

## 3.2 Tag 1 – SBB

**Status:** ERLEDIGT

Gewählte Hinfahrt ist verlinkt. Kurz vor der Reise nochmals in SBB Mobile prüfen.

## 3.3 Google Maps

**Status:** ERLEDIGT

Direkte Kartenlinks sind dort vorhanden, wo eine Route sinnvoll ist.

## 3.4 Tag 7 / Tag 8

**Status:** ERLEDIGT

Aktueller Entscheid:

- Tag 7: Stepantsminda → **Uplisziche** → spontane Entscheidung **Gori oder Kutaisi**
- Uplisziche bleibt in beiden Varianten im Programm
- Nacht 04.10. → 05.10. spontan in Gori oder Kutaisi
- Tag 8 funktioniert von beiden möglichen Ausgangsorten
- Nacht 05.10. → 06.10. spontan in Kutaisi oder Umgebung
- **Vardzia ist nicht Teil des Programms**
- kein aktueller Umweg über Akhaltsikhe, Abastumani, Zekari oder Sairme

Vardzia bleibt als eigenständige Sehenswürdigkeitsseite im Reiseführer erhalten und ist mit `nicht-auf-route` gekennzeichnet.

---

# Phase 4 – Kostenübersicht

## 4.1 Aktueller Kostenstand

**Status:** ERLEDIGT (redaktioneller Stand 17.09.2026)  
**Verantwortlich:** ChatGPT-Web

Die Seite `/georgien/kosten/` basiert auf dem aktuellen Reiseplan.

Gebuchte Fixkosten für zwei:

- Flüge: CHF 900
- Silver 39 Corner: CHF 239
- Baza Kazbegi: CHF 229
- Paragraph: CHF 681
- **gebuchte Fixkosten gesamt: CHF 2'049**

Mietwagen separat, ausgewähltes Angebot (nicht als bereits bezahlt behaupten): **€714** für Cars4Rent Ford Bronco Sport 4WD vom 01.10., 08:00 bis 10.10., 18:00. Keine Doppelzählung des früheren CHF-500–850-Mietwagen-Arbeitsbudgets. Wechselkurs bei Zahlung in GEL und Zusatzkosten wie Treibstoff/Parkieren erst nach tatsächlicher Ausgabe verbuchen.

Offen bleiben:

- zwei spontane Hotelnächte 04.–06.10.
- abschliessender Vertrags- und Zahlungsstatus Mietwagen
- Mietwagen-Treibstoff, Parkieren und eventuell lokale Fahrer
- SBB je nach Ticket/Abos
- tatsächlich gewählte Aktivitäten und Zusatzleistungen

Alte Rooms-Kazbegi-, Fahrer-/Hybrid- und 2+2-Küsten-Szenarien werden nicht mehr als aktueller Plan dargestellt. Vardzia wird nicht budgetiert.

---

# Phase 5 – Flüge und Bahn

## 5.1 Flugseite

**Status:** ERLEDIGT

Die Flugseite enthält die gebuchten Segmente, lokale Zeiten, Zeitzonen und Umstiege. Die konkrete Airline-Buchung bleibt bei kleinen Abweichungen massgebend.

## 5.2 Bahn Zürich Flughafen → Entlebuch

**Status:** ERLEDIGT

Geplante Verbindungen sind dokumentiert; Gleise, Bauarbeiten und kurzfristige Änderungen am Reisetag in SBB Mobile prüfen.

---

# Phase 6 – Inhalte

## 6.1 Hintergrundwissen

**Status:** ERLEDIGT

Unter anderem vorhanden/erweitert:

- Geschichte Georgiens ohne Kapitelnummerierung
- Sprache
- Religion/Kultur
- Politik, Konflikte, Menschenrechte
- Wirtschaft und Schweiz-Vergleich
- Fame / internationale Bekanntheit
- Weinland
- Packliste

## 6.2 Sehenswürdigkeiten und Unterhaltung

**Status:** ERLEDIGT MIT OFFENER BILDPFLEGE

Zusätzlich zu klassischen Sehenswürdigkeiten wurden unterhaltsame/ungewöhnliche Optionen aufgenommen, unter anderem:

- Museum of Illusions Tbilisi
- Tbilisi Digital Space
- Narikala Zipline
- Mtatsminda Park als Aussicht **und** Freizeitpark
- Freedom Square – Tifliser Bankraub von 1907
- Shekvetili Dendrological Park

Vardzia bleibt als Hintergrund-/Sehenswürdigkeitsseite erhalten, ist aber ausdrücklich nicht auf der aktuellen Route.

## 6.3 Kulinarik

**Status:** ERLEDIGT MIT OFFENER BILDPFLEGE

Der Genussbereich wurde deutlich erweitert, unter anderem um Ajapsandali, Ajika, Badrijani Nigvzit, Borano, Churchkhela, Gebzhalia, Ghomi, Jonjoli, Lobiani, Mchadi/Chvishtari, Megrelian Kharcho, Satsivi, Shkmeruli, Sulguni und Tkemali.

---

# Phase 7 – Restaurants und Unterkünfte

## 7.1 Restaurantseiten

**Status:** ERLEDIGT MIT OFFENER BILDPFLEGE

Vorhandene Restaurantseiten wurden inhaltlich vereinheitlicht. Irreführende Bilder sollen nicht verwendet werden; bis ein korrektes lizenzierbares Bild verfügbar ist, ist ein neutraler Platzhalter zulässig.

## 7.2 Unterkunftsseiten

**Status:** ERLEDIGT MIT OFFENER BILDPFLEGE

Aktuell sind unter anderem 13 Unterkunftsseiten vorhanden. Für die Reise verbindlich gebucht:

- Silver 39 Corner Hotel · 28.09.–01.10. · CHF 239
- Baza Kazbegi · 01.10.–04.10. · CHF 229
- Paragraph Resort & Spa Shekvetili · 06.10.–10.10. · CHF 681

Die Nächte 04.–06.10. bleiben flexibel. Frühere Alternativhotels dürfen als Alternativen bestehen bleiben, aber nicht als aktueller Reiseplan erscheinen.

---

# Phase 8 – Galerie / Bilder

## 8.1 Mehrbild-Galerie

**Status:** ERLEDIGT  
**Verantwortlich:** Codex

- `images[]`-Schema vorhanden
- erstes Bild ist Primär-/Vorschaubild
- Legacy-`image*` wird während der Migration weiter unterstützt
- manueller Slider mit Vor/Zurück, Tastatur und Swipe
- kein Autoplay
- eigene Reisefotos können über `images[]` mit `ownPhoto: true` ergänzt werden
- Wissensseiten zeigen die Galerie auch dann, wenn nur `images[]` und kein Legacy-`image` vorhanden ist

## 8.2 Korrekte Bilder ergänzen

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web / manuell

Die technische Bildlogik ist vorhanden. Mehrere neue Seiten verwenden bewusst neutrale Platzhalter und Paragraph teilweise ein klar gekennzeichnetes Kontextbild. Das ist vorläufig akzeptiert.

Noch zu tun:

- Platzhalter nach Möglichkeit durch fachlich korrekte, lizenzrechtlich saubere Bilder ersetzen
- keine Bilder nur deshalb einsetzen, weil sie verfügbar sind
- eigene Reisefotos später einfach über die Galerie ergänzen

---

# Phase 9 – Informationsarchitektur und Vollständigkeits-Audit

## 9.1 Soll-/Ist-Audit

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Historisches Excel-Seitenregister gegen den heutigen gewünschten Umfang prüfen.

Kontrollmatrix:

`Register / gewünschter Inhalt → Content-Datei → Route → Übersicht → Navigation → Suche`

Pro Eintrag entscheiden:

- vorhanden und korrekt
- vorhanden, aber zu überarbeiten
- fehlt und soll ergänzt werden
- historisch vorgesehen, aber heute nicht mehr gewünscht
- doppelt / zusammenzuführen

## 9.2 Technische IA-Lücken

**Status:** OFFEN NUR BEI BEDARF  
**Verantwortlich:** Codex

Nur wenn der Audit echte technische Lücken zeigt.

## 9.3 Karten, Regionen und Content-Verknüpfungen

**Status:** OFFEN  
**Verantwortlich:** Codex  
**Spezifikation Regionenkarte:** [`KONZEPT_REGIONENKARTE.md`](KONZEPT_REGIONENKARTE.md)

Nächstes grösseres technisches Arbeitspaket:

- auf `/georgien/orte/` die lokale, interaktive SVG-Regionenkarte gemäss Spezifikation umsetzen;
- `/georgien/karte/` vollständig aus den vorhandenen Content-Daten speisen und die aktuelle schematische Gerade-Linie-Lösung fachlich korrigieren;
- «Entlang der Route» als echte Nähe zu einer Route beziehungsweise Routengeometrie berechnen statt über einen sehr grossen Radius;
- Orte, Sehenswürdigkeiten, Unterkünfte und weitere relevante Inhalte stärker über vorhandene Felder wie `trip`, `days`, `region`, `related` und `coordinates` verknüpfen;
- Regionsnormalisierung zentralisieren und unscharfe/abweichende Regionswerte technisch erkennen;
- Bildslider mit realen Mehrbild-Einträgen technisch kontrollieren;
- dabei gezielte Codepflege, Tests und reproduzierbare CI-Verbesserungen durchführen, ohne unnötigen Grossrefactor.

Nach Abschluss dieses Arbeitspakets die Seite `/georgien/heute/` gemäss Phase 1.2 angehen.

---

# Phase 10 – Datenschutz

## 10.1 Öffentliches Repository prüfen

**Status:** OFFEN  
**Verantwortlich:** ChatGPT-Web

Kontrollieren:

- keine Passdaten
- keine Buchungscodes
- keine Zahlungsdaten
- keine privaten Telefonnummern/E-Mails
- keine Versicherungsnummern
- keine vertraulichen Belege

Historische DOCX/PDF-Quelldokumente separat auf Risiko prüfen. Nicht ohne separaten Auftrag Git-History umschreiben oder Quelldokumente löschen.

---

# Phase 11 – finale technische QA

## 11.1 Gesamtprüfung

**Status:** IN ARBEIT  
**Verantwortlich:** Codex / GitHub Actions

Nach PR #16 liefen `npm install`, `npm run check`, `npm run test`, `npm run build` und das GitHub-Pages-Deployment erfolgreich. Nach den redaktionellen Korrekturen vom 17. September muss der aktuelle `main` erneut grün durchlaufen.

Noch offen beziehungsweise wiederholt zu prüfen:

- interne Links
- Bilder / Alttexte
- Metadaten
- Pagefind
- `/reisen/`-Basispfad
- 390 / 768 / 1440 px
- Hauptnavigation / Footer
- Tagesnavigation
- Google-Maps-Links
- Dark Mode
- Tastatur / Fokus / Touch
- Offline / PWA-Update
- mehrere Tabs
- visuelle Browserprüfung, soweit die Testumgebung dies zulässt

---

# Erledigte Hauptpunkte

- PWA-Updatefunktion umgesetzt.
- Tagesprogramme in das Markdown-/Accordion-Modell überführt.
- Mietwagen 01.–10.10. als Mobilitätsstrategie und Cars4Rent Ford Bronco Sport 4WD als konkretes Fahrzeug ausgewählt und auf der Website eingetragen.
- Tag 7/8 auf Uplisziche + spontane Gori/Kutaisi-Entscheidung umgestellt.
- Vardzia aus dem Programm entfernt, Sehenswürdigkeitsseite bleibt erhalten.
- drei gebuchte Hotels im aktuellen Plan verankert.
- Bildgalerie und Mehrbild-Schema umgesetzt.
- Sehenswürdigkeiten und Kulinarik erweitert.

---

# Grundregel für neue Pendenzen

Neue offene Arbeiten werden **nur in dieser Datei** ergänzt. Keine zusätzlichen konkurrierenden Pendenz- oder Umsetzungskonzeptdateien im Repository anlegen.
