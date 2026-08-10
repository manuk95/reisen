# Konzept: Optionaler Bildslider für Detailseiten

Stand: 10.08.2026  
Status: **Konzept / noch nicht umgesetzt**

## 1. Ziel

Die Georgien-Website soll später optional mehrere Bilder pro Detailseite darstellen können. Dafür soll ein wiederverwendbarer Bildslider beziehungsweise eine Galerie-Komponente vorgesehen werden.

Wichtig: Der Slider ist **keine Pflichtfunktion pro Seite**. Eine Detailseite muss weiterhin problemlos mit einem einzelnen Bild oder mit einem Platzhalter funktionieren.

Die spätere Lösung darf nicht nur für Restaurants und Hotels gebaut werden, sondern muss generisch für alle Detailseiten mit Bildern nutzbar sein, insbesondere für:

- Orte
- Sehenswürdigkeiten
- Genuss / Kulinarik
- Restaurants
- Hotels und Unterkünfte
- bei Bedarf weitere Content-Collections wie Wissen oder Praktisches

Die technische Lösung soll deshalb nicht an einen bestimmten Seitentyp gekoppelt werden.

---

## 2. Grundprinzip

Das heute bestehende Feld `image` bleibt erhalten und dient weiterhin als primäres beziehungsweise repräsentatives Bild einer Seite.

Dieses Bild kann beispielsweise weiterhin verwendet werden für:

- Übersichtsseiten und Karten
- Suchresultate
- Teaser und Vorschaukarten
- Social-/Meta-Vorschauen
- Fallback, wenn keine Galerie vorhanden ist

Zusätzlich kann später ein optionales Feld `gallery` eingeführt werden.

Beispiel:

```yaml
image: images/georgien/unterkuenfte/paragraph/01.jpg
imageAlt: "Paragraph Resort & Spa am Schwarzen Meer"

gallery:
  - src: images/georgien/unterkuenfte/paragraph/01.jpg
    alt: "Paragraph Resort & Spa am Schwarzen Meer"
    credit: "Name / Quelle"
    source: "https://..."
    license: "CC BY-SA 4.0"
  - src: images/georgien/unterkuenfte/paragraph/02.jpg
    alt: "Innenpool des Paragraph Resort & Spa"
    credit: "Name / Quelle"
    source: "https://..."
    license: "CC BY-SA 4.0"
  - src: images/georgien/unterkuenfte/paragraph/03.jpg
    alt: "Zimmer mit Meerblick"
    credit: "Name / Quelle"
    source: "https://..."
    license: "CC BY-SA 4.0"
```

`gallery` bleibt vollständig optional.

---

## 3. Gewünschtes Verhalten je Seite

### Fall A: `gallery` enthält mehrere Bilder

Es wird ein Slider angezeigt.

Gewünschte Funktionen:

- grosses Hauptbild
- Navigation mit Pfeilen links/rechts
- Swipe-Geste auf Touch-Geräten
- Bildzähler, beispielsweise `2 / 5`
- optional Navigationspunkte oder kleine Vorschaubilder
- Tastatursteuerung mit Pfeiltasten
- Alt-Texte für jedes Bild
- responsive Darstellung auf Smartphone, Tablet und Desktop

### Fall B: `gallery` enthält genau ein Bild

Es wird nur dieses Bild angezeigt. Slider-Pfeile, Punkte und Bildzähler werden ausgeblendet.

### Fall C: `gallery` fehlt

Das bestehende Feld `image` wird wie bisher angezeigt.

### Fall D: Weder `gallery` noch `image` sind vorhanden

Der bestehende Platzhalter wird verwendet.

Damit bleibt die Lösung vollständig rückwärtskompatibel.

---

## 4. Generische Komponente

Bei einer späteren Umsetzung soll eine zentrale, wiederverwendbare Astro-Komponente erstellt werden, beispielsweise:

```text
src/components/ImageGallery.astro
```

Die Komponente darf nicht wissen, ob sie auf einer Hotel-, Restaurant-, Sehenswürdigkeits- oder Ortsseite eingesetzt wird.

Sie erhält lediglich die Bilddaten und rendert abhängig von deren Anzahl:

- kein Bild beziehungsweise Fallback
- ein Einzelbild
- einen Slider mit mehreren Bildern

Dadurch wird die Funktion nur einmal entwickelt und kann auf allen Detailseiten identisch genutzt werden.

---

## 5. Einbindung in Detailseiten

Bei einer späteren Umsetzung sollen die Detailtemplates schrittweise auf die gemeinsame Galerie-Komponente umgestellt werden.

Betroffen sind insbesondere die Detailseiten für:

```text
src/pages/georgien/orte/[slug].astro
src/pages/georgien/sehenswuerdigkeiten/[slug].astro
src/pages/georgien/genuss/[slug].astro
src/pages/georgien/restaurants/[slug].astro
src/pages/georgien/hotels/[slug].astro
```

Soweit weitere Content-Collections später Detailseiten mit Bildern erhalten, soll dieselbe Komponente dort ebenfalls verwendet werden.

Es soll **keine separate Slider-Implementierung pro Collection** geben.

---

## 6. Content-Schema

Das gemeinsame redaktionelle Schema in `src/content.config.ts` soll bei einer späteren Umsetzung um ein optionales Galerie-Feld ergänzt werden.

Vorgesehene Struktur:

```ts
gallery: z.array(
  z.object({
    src: z.string(),
    alt: z.string(),
    credit: z.string().optional(),
    source: z.string().url().optional(),
    license: z.string().optional(),
    caption: z.string().optional()
  })
).optional()
```

Da die meisten Detail-Collections dasselbe redaktionelle Basisschema verwenden, kann `gallery` zentral im gemeinsamen `editorial`-Schema ergänzt werden.

Das erlaubt die Verwendung unter anderem bei:

- `orte`
- `sehenswuerdigkeiten`
- `genuss`
- `restaurants`
- `unterkuenfte`
- `wissen`
- `praktisches`

Die einzelnen Seiten entscheiden über ihre Frontmatter selbst, ob sie überhaupt eine Galerie besitzen.

---

## 7. Verhältnis zwischen `image` und `gallery`

Das bestehende Feld `image` soll **nicht entfernt** werden.

Empfohlene Regel:

- `image` = repräsentatives Haupt-/Teaserbild
- `gallery` = optionale Sammlung zusätzlicher beziehungsweise aller Detailbilder

Das Hauptbild darf zugleich das erste Bild der Galerie sein. Diese leichte Redundanz ist akzeptabel, weil `image` dadurch unabhängig von der Galerie für Teaser, Suchindex, Karten und Meta-Daten genutzt werden kann.

Eine spätere automatische Regel könnte lauten:

1. Wenn `gallery` vorhanden ist, wird sie auf der Detailseite verwendet.
2. Wenn `gallery` fehlt, wird `image` als Einzelbild verwendet.
3. Auf Übersichtsseiten wird weiterhin grundsätzlich `image` verwendet.

---

## 8. Bildorganisation im Repository

Für Seiten mit mehreren Bildern empfiehlt sich eine Unterordnerstruktur pro Inhalt.

Beispiele:

```text
public/images/georgien/sehenswuerdigkeiten/narikala/
  01.jpg
  02.jpg
  03.jpg

public/images/georgien/orte/tbilisi/
  01.jpg
  02.jpg
  03.jpg

public/images/georgien/genuss/chinkali/
  01.jpg
  02.jpg
  03.jpg

public/images/georgien/restaurants/barbarestan/
  01.jpg
  02.jpg
  03.jpg

public/images/georgien/unterkuenfte/paragraph/
  01.jpg
  02.jpg
  03.jpg
  04.jpg
```

Bestehende Einzelbilder müssen bei Einführung der Slider-Funktion nicht zwingend sofort verschoben werden. Eine Migration kann schrittweise erfolgen.

---

## 9. Bildauswahl

Die Galerie soll inhaltlich Mehrwert bringen und nicht nur möglichst viele Bilder enthalten.

### Sehenswürdigkeiten

Typischerweise sinnvoll:

- Gesamtansicht
- Architektur / Detail
- Innenraum, sofern fotografisch und rechtlich sinnvoll
- Landschaft beziehungsweise Aussicht
- historische oder besondere Merkmale

### Orte

Typischerweise sinnvoll:

- Stadt-/Ortsansicht
- Altstadt oder Zentrum
- typische Strasse beziehungsweise Quartier
- Landschaft / Umgebung
- Abendstimmung oder charakteristisches Detail

### Genuss / Kulinarik

Typischerweise sinnvoll:

- fertiges Gericht
- Detailaufnahme
- regionale Variante
- Zubereitung oder typische Servierweise

### Restaurants

Typischerweise sinnvoll:

- Innen-/Aussenbereich
- Atmosphäre
- charakteristische Speisen
- Terrasse beziehungsweise Aussicht

### Hotels

Typischerweise sinnvoll:

- Gebäude / Gesamtansicht
- Zimmer
- Pool / Spa
- Restaurant / Aufenthaltsbereich
- Aussicht / Umgebung
- Strand oder besondere Ausstattung

Qualität und Unterschiedlichkeit sind wichtiger als eine feste Mindestanzahl.

---

## 10. Urheberrecht und Quellen

Da die Website öffentlich auf GitHub Pages veröffentlicht wird, dürfen Bilder nicht ungeprüft von Booking.com, Google Maps, Tripadvisor, Instagram, Hotelwebseiten oder Restaurantwebseiten kopiert werden.

Bevorzugte Quellen:

1. Wikimedia Commons und andere eindeutig frei lizenzierte Quellen
2. offizielle Presse-/Media-Bereiche mit ausdrücklich erlaubter Wiederverwendung
3. eigene Fotos
4. andere Quellen nur bei eindeutig geklärten Nutzungsrechten

Wo erforderlich beziehungsweise sinnvoll, soll jedes Galeriebild folgende Angaben tragen können:

- `credit`
- `source`
- `license`
- optional `caption`

Die bereits vorhandenen Felder für das Einzelbild bleiben davon unberührt.

---

## 11. Bedienung und Accessibility

Eine spätere Slider-Komponente soll nicht nur visuell funktionieren.

Mindestanforderungen:

- alle Bilder mit sinnvollem `alt`
- Buttons statt nicht-semantischer klickbarer Elemente
- Buttons mit `aria-label`, beispielsweise `Vorheriges Bild` und `Nächstes Bild`
- Tastaturbedienung
- sichtbarer Fokuszustand
- keine zwingende automatische Wiedergabe
- keine Bewegung, die der Benutzer nicht kontrollieren kann
- korrekte Funktion bei deaktiviertem beziehungsweise reduziertem Motion-Verhalten

Ein automatisches Durchlaufen der Bilder ist **nicht vorgesehen**. Der Benutzer entscheidet selbst, wann das Bild wechselt.

---

## 12. Mobile Bedienung

Die Website wird auf Reisen häufig auf Smartphones verwendet. Mobile Bedienung hat deshalb hohe Priorität.

Gewünscht:

- Swipe links/rechts
- ausreichend grosse Pfeil-/Button-Flächen
- keine horizontalen Seiten-Scrollbars
- Bild bleibt innerhalb des Viewports
- sinnvolles Seitenverhältnis ohne starke Layoutsprünge
- keine Interaktion, die normales vertikales Scrollen blockiert

---

## 13. Performance und Offline-Nutzung

Die Galerie darf die PWA beziehungsweise Offline-Nutzung nicht unnötig belasten.

Empfehlungen für die spätere Umsetzung:

- erstes beziehungsweise sichtbares Bild normal laden
- weitere Galeriebilder mit `loading="lazy"`
- Bilder weboptimiert abspeichern
- keine unnötig grossen Originaldateien aus Kameras oder Pressebereichen einchecken
- möglichst moderne und webgeeignete Dateigrössen
- keine externe Slider-Library nur für diese Funktion einführen, sofern Vanilla JavaScript ausreicht
- Service-Worker-/Offline-Verhalten nach Einführung ausdrücklich testen

Der Slider soll auch dann funktional bleiben, wenn JavaScript ausfällt: Das Hauptbild beziehungsweise erste Bild muss weiterhin sichtbar sein.

---

## 14. Empfohlene technische Umsetzung

Wenn der Slider später umgesetzt wird, ist folgende Architektur vorgesehen:

1. `gallery` optional zum gemeinsamen Content-Schema hinzufügen.
2. `ImageGallery.astro` als universelle Komponente erstellen.
3. Einzelbild und Mehrbilddarstellung innerhalb derselben Komponente behandeln.
4. Touch-/Swipe-Logik mit kleinem eigenem JavaScript implementieren.
5. Keine Collection-spezifische Sliderlogik programmieren.
6. Detailtemplates nacheinander auf `ImageGallery.astro` umstellen.
7. Bestehende `image`-Felder als Fallback und Teaserbild erhalten.
8. Galeriedaten nur bei Seiten ergänzen, für die mehrere geeignete Bilder vorhanden sind.
9. Bilder und Metadaten schrittweise ergänzen.
10. Build, Content-Schema, Accessibility, responsive Darstellung, PWA und Offline-Funktion testen.

---

## 15. Nicht Teil der aktuellen Umsetzung

Mit diesem Dokument wird **nur das Konzept festgehalten**.

Aktuell ausdrücklich nicht auszuführen:

- kein `gallery`-Feld in `src/content.config.ts` ergänzen
- keine `ImageGallery.astro` erstellen
- keine Detailtemplates verändern
- kein JavaScript für Swipe/Slider ergänzen
- keine vorhandenen Bilder verschieben
- keine Galeriebilder recherchieren oder herunterladen
- keine bestehenden Seiten auf Galerie umstellen

Die Website soll bis zu einer späteren ausdrücklichen Umsetzung unverändert mit der bisherigen Einzelbildlogik weiterarbeiten.

---

## 16. Akzeptanzkriterien für eine spätere Umsetzung

Die spätere Funktion gilt erst dann als abgeschlossen, wenn:

- der Slider für **alle relevanten Detail-Collections** generisch nutzbar ist;
- jede Seite weiterhin ohne Galerie funktioniert;
- ein Einzelbild ohne Slider-Steuerelemente dargestellt wird;
- mehrere Bilder per Pfeil, Touch/Swipe und Tastatur bedienbar sind;
- Alt-Texte und Accessibility umgesetzt sind;
- `image` weiterhin als Teaser-/Fallbackbild unterstützt wird;
- keine zwingende neue externe Slider-Abhängigkeit entstanden ist;
- die mobile Darstellung geprüft ist;
- Build und Content-Validierung erfolgreich sind;
- PWA- und Offline-Funktion nicht beeinträchtigt werden;
- Quellen- und Lizenzinformationen pro Bild hinterlegt werden können;
- bestehende Seiten ohne `gallery` keine Migration benötigen.

---

## 17. Priorität

Der Bildslider ist eine **optionale spätere Qualitätsverbesserung**, kein Blocker für die aktuelle inhaltliche Fertigstellung der Reisewebsite.

Die Detailseiten können zunächst weiterhin mit einem einzelnen, korrekt recherchierten Bild fertiggestellt werden. Sobald ausreichend geeignete Bilder vorhanden sind, kann die Galerie-Funktion unabhängig davon implementiert und anschliessend schrittweise aktiviert werden.
