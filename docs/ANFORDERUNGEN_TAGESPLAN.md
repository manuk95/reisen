# Anforderungen an Tagesplan-Seiten

Stand: 10. August 2026

## 1. Ziel

Die Tagesplan-Seiten sollen unterwegs schnell erfassbar sein, gleichzeitig aber weiterhin alle ausführlichen Informationen enthalten können.

Die wichtigste redaktionelle Vorgabe lautet:

> **Ein Reisetag wird vollständig in einer einzigen Markdown-Datei gepflegt.**

Die Markdown-Datei soll von einem Menschen ohne Webentwicklungskenntnisse und auch von einer weniger technischen beziehungsweise primär auf Recherche ausgelegten KI sicher bearbeitet werden können.

Die Darstellung der Website wird aus dieser Markdown-Datei erzeugt. Es soll keine unnötige doppelte Pflege desselben Tagesablaufs in Frontmatter, Astro-Komponenten und Fliesstext geben.

Die Spezifikation gilt **reiseübergreifend**. Georgien 2026 ist die erste Anwendung; spätere Reisen sollen dieselbe einfache Struktur wiederverwenden können.

---

# 2. Grundprinzip: nur ein Tagesablauf

Es soll **nicht** eine separate Kurzfassung und zusätzlich einen davon getrennten detaillierten Tagesablauf geben.

Stattdessen existiert auf der Seite nur **ein einziger chronologischer Tagesablauf**.

Jeder Programmpunkt besteht aus:

1. Uhrzeit beziehungsweise Zeitfenster
2. einer bereits ausreichend konkreten Kurzbeschreibung
3. optional einem ausführlichen Detailtext

Die Kurzbeschreibung muss auch ohne Öffnen der Details verständlich und praktisch nutzbar sein.

Als Qualitätsreferenz dient die kompakte Darstellung aus der früheren Island-Reiseplanung: Jeder Punkt soll bereits in der geschlossenen Ansicht genug Information enthalten, um den Tagesablauf zu verstehen.

Beispiel für die sichtbare Kurzfassung:

```text
08:00  Frühstück im Hotel
09:00  Fahrt zur Gergetier Dreifaltigkeitskirche
10:00  Gergeti-Kirche und Aussicht
13:00  Mittagessen im Restaurant XY
15:00  Sno und kurzer Spaziergang
20:00  Zurück im Hotel XY
```

Unklare Einträge wie nur `Gergeti`, `Fahrt` oder `Mittagessen` sollen vermieden werden, wenn eine präzisere Kurzbeschreibung möglich ist.

---

# 3. Ausklappbare Details pro Programmpunkt

Jeder einzelne Programmpunkt kann optional zusätzliche Details enthalten.

Beispiel auf der Website:

```text
08:00  Frühstück im Hotel
09:00  Fahrt zur Gergetier Dreifaltigkeitskirche        ▼
10:00  Gergeti-Kirche und Aussicht                      ▼
13:00  Mittagessen im Restaurant XY                     ▼
15:00  Sno und kurzer Spaziergang                       ▼
20:00  Zurück im Hotel XY
```

## Verhalten

- Hat ein Programmpunkt Detailinhalt, erscheint eine dezente Ausklappmöglichkeit.
- Hat ein Programmpunkt **keinen** Detailinhalt, erscheint **kein Pfeil und kein leerer Ausklappbereich**.
- Die Kurzbeschreibung bleibt immer sichtbar.
- Geöffnete Details erscheinen direkt unter dem betreffenden Programmpunkt.
- Es muss möglich sein, mehrere Programmpunkte gleichzeitig geöffnet zu lassen.
- Eine rein dekorative Animation ist nicht nötig; Robustheit und gute Bedienbarkeit sind wichtiger.
- Die Lösung muss mit Tastatur und Touch funktionieren.

Für die technische Darstellung bietet sich beispielsweise HTML `<details>` / `<summary>` an. Die konkrete technische Lösung darf Codex wählen, solange die Markdown-Datei selbst einfach bleibt.

---

# 4. Vorgesehene Markdown-Schreibweise

Die Inhaltsdatei soll möglichst normales Markdown verwenden.

Empfohlene Struktur:

```md
---
title: "Tag 5: Stepantsminda"
date: 2026-10-02
# weitere stabile Metadaten nur soweit wirklich benötigt
---

## Google Maps

[Route in Google Maps öffnen](https://...)

## Falls ihr kürzen müsst

- Sno streichen.
- Gergeti unbedingt behalten.

## Schlechtwetter

- Gergeti gegebenenfalls per Taxi besuchen.
- Sno bei schlechter Sicht auslassen.

## Tagesablauf

### 08:00 · Frühstück im Hotel

### 09:00 · Fahrt zur Gergetier Dreifaltigkeitskirche

Fahrt beziehungsweise Aufstieg abhängig von Wetter und Strassenzustand auswählen.

Hier können bei Bedarf zusätzliche Hinweise, Links oder Hintergründe stehen.

### 10:00 · Gergeti-Kirche und Aussicht

Für Kirche und Aussicht genügend Zeit vorsehen. Bei klarer Sicht ist dies einer der wichtigsten Aussichtspunkte des Tages.

### 13:00 · Mittagessen im Restaurant XY

### 15:00 · Sno und kurzer Spaziergang

Kurzer Nachmittagsausflug; bei Zeitmangel als erster Punkt streichen.

### 20:00 · Zurück im Hotel XY
```

## Interpretation

Innerhalb von `## Tagesablauf` gilt:

- Jede `###`-Überschrift ist ein Programmpunkt.
- Die `###`-Überschrift ist gleichzeitig die kompakte Kurzfassung.
- Der Inhalt nach dieser Überschrift bis zum nächsten `###` beziehungsweise `##` ist der optionale Detailinhalt.
- Ist zwischen zwei Programmpunkten kein Inhalt vorhanden, bleibt der Programmpunkt nicht ausklappbar.

Damit bleibt die Datei auch direkt in GitHub, einem Texteditor oder ohne Website-Renderer vollständig lesbar.

---

# 5. Keine doppelte Pflege des Tagesablaufs

Zeit und Bezeichnung eines Programmpunkts sollen **nicht gleichzeitig** in einer Frontmatter-Liste und nochmals als Markdown-Überschrift gepflegt werden müssen.

Beispiel für unerwünschte Doppelpflege:

```yaml
recommended:
  - time: "09:00"
    label: "Gergeti"
```

und später zusätzlich:

```md
### 09:00 · Gergeti
```

Wenn die Uhrzeit geändert wird, darf nicht die Gefahr bestehen, dass nur eine der beiden Stellen angepasst wird.

Der Tagesablauf in `## Tagesablauf` soll die **Single Source of Truth** für Reihenfolge, Zeit und Kurzbezeichnung der Programmpunkte sein.

Technische Metadaten dürfen weiterhin im Frontmatter stehen, wenn sie wirklich für andere Funktionen benötigt werden. Der eigentliche Ablauf soll aber nur einmal gepflegt werden.

---

# 6. Fehlertoleranz ist zwingend

Die Markdown-Dateien müssen sehr robust interpretiert werden.

Ein redaktioneller Fehler oder eine fehlende optionale Angabe darf möglichst **nicht dazu führen, dass der Build oder die gesamte Tagesseite fehlschlägt**.

## Insbesondere muss gelten

- Ein Programmpunkt ohne Detailtext ist gültig.
- Ein leerer Abschnitt ist gültig.
- Ein fehlender optionaler Abschnitt ist grundsätzlich gültig.
- Eine Uhrzeit darf auch als Zeitspanne geschrieben werden, zum Beispiel `09:00–11:30`.
- Angaben wie `ca. 13:00` müssen möglich sein.
- Falls keine genaue Uhrzeit sinnvoll ist, soll auch eine Form wie `Flexibel · Spa und Strand` möglich sein.
- Der Parser darf nicht davon ausgehen, dass jeder Programmpunkt exakt dieselbe Form besitzt.
- Normaler Markdown-Text, Listen, interne Links, externe Links und Hervorhebungen müssen innerhalb der Details möglich sein.
- Fehlender Detailinhalt darf keinen leeren Accordion-Button erzeugen.
- Zusätzlicher normaler Text innerhalb eines Detailpunkts darf die restliche Seite nicht beschädigen.
- Unbekannte oder nicht interpretierbare Zeitangaben sollen im Zweifel als normaler Text dargestellt werden statt einen Buildfehler zu erzeugen.

Die technische Validierung darf auf tatsächliche strukturelle Probleme hinweisen, soll aber bei redaktionell harmlosen Auslassungen tolerant sein.

---

# 7. Feste Abschnitte „Falls ihr kürzen müsst“ und „Schlechtwetter“

Auf jeder Tages-Markdown-Datei sollen diese beiden Überschriften vorhanden sein:

```md
## Falls ihr kürzen müsst

## Schlechtwetter
```

Sie gehören zum Standardaufbau jedes Reisetages.

## Regeln

- Die Titel sollen auf der Website immer vorhanden sein.
- Wenn es keine Hinweise gibt, darf der jeweilige Abschnitt leer sein.
- Es darf deshalb kein künstlicher Text wie „Keine besonderen Hinweise“ nötig sein.
- Sobald Inhalte vorhanden sind, werden sie direkt unter der Überschrift dargestellt.

Diese beiden Abschnitte sollen **vor dem Tagesablauf** erscheinen.

---

# 8. Google Maps

Wenn für den Tag eine sinnvolle Route existiert, soll sie oberhalb des Tagesablaufs schnell erreichbar sein.

Beispiel:

```md
## Google Maps

[Route in Google Maps öffnen](https://www.google.com/maps/...)
```

Bei mehreren sinnvollen Varianten können mehrere Links stehen, zum Beispiel an Tag 7:

```md
## Google Maps

- [Variante A – normale Hauptroute](https://...)
- [Variante B – Zekari / Sairme](https://...)
```

Fehlt für einen Tag eine sinnvolle Google-Maps-Route, darf der Abschnitt leer bleiben beziehungsweise technisch unaufdringlich behandelt werden.

---

# 9. Empfohlene Reihenfolge der Tagesseite

Die Website soll die Inhalte ungefähr in dieser Reihenfolge darstellen:

1. Titel, Datum und Ort/Route
2. kompakte Tagesfakten
3. Google-Maps-Route, wenn vorhanden
4. `Falls ihr kürzen müsst`
5. `Schlechtwetter`
6. **einziger Tagesablauf mit optional ausklappbaren Details pro Programmpunkt**
7. kompakte Restaurant-/Essenshinweise
8. kompakte Unterkunftsinformation
9. weitere wirklich notwendige Hinweise

Es soll keinen zweiten, getrennten „detaillierten Tagesplan“ mehr geben.

---

# 10. Kompakte Tagesfakten

Die Tagesfakten sollen weniger Fläche einnehmen als aktuell.

Beispiele:

```text
10 / 1 °C · Sonnenuntergang 18:42 · kein Baden
```

bei einem Fahrtag zusätzlich beispielsweise:

```text
155 km · ca. 3 h reine Fahrt
```

Es sollen keine unnötig grossen Einzelkacheln entstehen, wenn eine kompakte Darstellung dieselbe Information besser vermittelt.

---

# 11. Restaurant- und Hotelkacheln

Der Abstand **zwischen den einzelnen Kacheln bleibt grundsätzlich wie aktuell**.

Kompakter werden soll dagegen der Inhalt **innerhalb** der Kacheln.

## Restaurant

Auf der Tagesseite reichen beispielsweise:

```text
Barbarestan
Historische georgische Küche · gehoben
Details →
```

Nicht nötig auf der Tagesseite sind generische Hinweise wie:

> Tbilisi · konkrete Preise und Reservierung vorab prüfen

Solche Informationen gehören auf die Restaurant-Detailseite.

## Hotel

Auf der Tagesseite reichen beispielsweise:

```text
Rooms Hotel Kazbegi
Hotel mit Kazbekblick
Details →
```

Nicht nötig sind generische Wiederholungen wie:

> Preis, Verfügbarkeit, Parkplatz und Frühstück vor Buchung prüfen.

Auch diese Angaben gehören auf die Hotel-Detailseite.

## Abstände

- Abstand zwischen mehreren Karten nicht künstlich verkleinern.
- Innenabstände dürfen moderat kompakter werden.
- Vor allem der Zeilenabstand zwischen Titel, Kurzbeschreibung und Link soll kleiner sein.
- Keine unnötigen Meta-Zeilen auf der Tagesseite.

---

# 12. Unterkunft-Zusatzhinweis entfernen

Der separate Hinweis in der Form

> **Unterkunft: Tbilisi-Vorschlag – Vorschläge sind keine Buchungsbestätigung.**

soll auf Tagesseiten entfernt werden.

Er dupliziert die Unterkunftskachel und bringt vor Ort wenig zusätzlichen Nutzen.

Wenn später eine Unterkunft definitiv gebucht ist, kann der Buchungsstatus direkt bei der kompakten Unterkunftsinformation dargestellt werden.

---

# 13. Navigation zwischen den Reisetagen

Auf jeder Tagesseite sollen vorheriger und nächster Reisetag während des Scrollens schnell erreichbar bleiben.

Beispiel auf Tag 5:

```text
← Tag 4                                    Tag 6 →
```

## Anforderungen

- auf Mobile gut bedienbar
- während des Scrollens angedockt beziehungsweise sticky/fix verfügbar
- Bildschirm nicht unnötig verdecken
- ausreichender Abstand zu Browser-/Systemnavigation
- am ersten Tag nur nächster Tag
- am letzten Tag nur vorheriger Tag
- bestehende Linklogik für vorherigen/nächsten Tag wiederverwenden

Die konkrete Positionierung auf Desktop und Mobile darf technisch sinnvoll gelöst werden.

---

# 14. Redaktionelle Einfachheit für zukünftige Reisen

Die Tagesstruktur soll nicht nur für Georgien funktionieren.

Sie soll als wiederverwendbares Muster für spätere Reisen dienen.

Eine neue Reise soll im Idealfall hauptsächlich dadurch erstellt werden können, dass neue Tages-Markdown-Dateien mit der gleichen einfachen Struktur angelegt werden.

Ein Autor soll für einen neuen Programmpunkt im Wesentlichen nur schreiben müssen:

```md
### 11:00 · Wasserfallwanderung

Optionaler Detailtext, falls erforderlich.
```

oder ohne Details:

```md
### 08:00 · Frühstück im Hotel
```

Mehr technische Syntax sollte für normale redaktionelle Arbeiten nicht nötig sein.

---

# 15. Abnahmekriterien

Die Umsetzung ist erst erfüllt, wenn mindestens folgende Fälle funktionieren:

1. Programmpunkt mit Details → ausklappbar.
2. Programmpunkt ohne Details → kein Ausklappsymbol.
3. Mehrere geöffnete Programmpunkte gleichzeitig möglich.
4. Zeitspanne wie `09:00–11:30` funktioniert.
5. `ca. 13:00` funktioniert.
6. Programmpunkt ohne exakt interpretierbare Uhrzeit verursacht keinen Fehler.
7. `Falls ihr kürzen müsst` kann leer sein und der Titel bleibt sichtbar.
8. `Schlechtwetter` kann leer sein und der Titel bleibt sichtbar.
9. Fehlender optionaler Google-Maps-Link verursacht keinen Fehler.
10. Der Tagesablauf wird nur an einer Stelle redaktionell gepflegt.
11. Die Tages-Markdown-Datei ist ohne Spezialkenntnisse direkt lesbar und editierbar.
12. Restaurant- und Hotelkacheln sind innerhalb der Karten kompakter, ohne den Abstand zwischen den Karten unnötig zu reduzieren.
13. Der separate Unterkunft-Warnhinweis ist entfernt.
14. Vorheriger/nächster Tag bleibt beim Scrollen gut erreichbar.
15. Bestehende interne Links und normale Markdown-Formatierungen funktionieren weiterhin.
16. `npm run check`, Tests und Build bleiben erfolgreich.

---

# 16. Leitlinie für die technische Umsetzung

Die Implementierung darf intern technisch anspruchsvoller sein, **die Inhaltsdatei darf es nicht sein**.

> Komplexität gehört in den Renderer, nicht in die Tages-Markdown-Datei.

Die Markdown-Datei soll auch dann verständlich bleiben, wenn sie direkt auf GitHub geöffnet oder von einem einfachen Texteditor bearbeitet wird.
