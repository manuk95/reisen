> **Archivierter Planungsstand. Nicht als aktuelle Arbeitsanweisung verwenden.**
>
> Das Original enthielt kein eindeutig belegtes Datum. Aktuelle offene Arbeiten stehen in `docs/ARBEITSPLAN_AKTUELL.md`.

# Umsetzungsfahrplan: Informationsarchitektur Georgien 2026

## Zielbild

Die Website wird von einer Sammlung einzelner Themen zu einem verlässlichen, offline nutzbaren Reiseführer weiterentwickelt. Die Excel-Datei `outputs/struktur-georgien-2026/georgien-2026-inhaltsstruktur.xlsx` ist das redaktionelle Seitenregister: Jede veröffentlichte Seite erhält eine eindeutige Seiten-ID, ihre Herkunft im Word-Dokument, ihren Aufrufort im Menü und einen Bearbeitungsstatus.

Kapitelnummern des Word-Dokuments sind ausschliesslich interne Quellenangaben. Sie erscheinen nicht in Navigationspunkten, Seitentiteln oder URLs.

## Verbindliche Regeln

- Jede Sehenswürdigkeit erhält eine eigene Detailseite. Sammelübersichten sind ausschliesslich Einstiegsseiten mit Kacheln.
- Die Übersichten für Sehenswürdigkeiten und Kulinarik zeigen pro Kachel Bild, Kurzbeschreibung, Region beziehungsweise Kategorie und einen Link zur Detailseite.
- Bereits vorhandene lokale Bilder werden verwendet. Für fehlende Kachel-, Restaurant- und Hotelbilder dient `public/images/platzhalter.png` mit einem präzisen Platzhalter-Alttext.
- Die Startseite verwendet `public/images/start_image.png`.
- Ein zentraler interner Verweismechanismus verlinkt bekannte Orte, Regionen, Sehenswürdigkeiten, Gerichte, Getränke, Restaurants und Unterkünfte im Fliesstext. Er greift nicht in Überschriften, vorhandene Links, Quellen-URLs, Code oder Bild-Alttexte ein.
- Jede neue Behauptung erhält mindestens eine belastbare Quelle. Zeitabhängige Informationen wie Öffnungszeiten, Preise, Sperrungen und Zugang werden nicht als dauerhaft behauptet.

## Vorgehen

1. **Referenzseite Narikala**
   Die Detailseite erhält einen lesbaren Besuchsartikel: geschichtlicher Bogen, Beobachtungspunkte vor Ort, Einordnung der Nikolauskirche, praktische Orientierung und verlässliche Quellen. Sie wird als Qualitätsstandard für weitere Detailseiten festgelegt.

2. **Excel als Soll-Register vervollständigen**
   Alle vorgesehenen Seiten werden als einzelne Zeile geführt. Seiten-IDs werden in Navigationsreihenfolge fortlaufend vergeben. Spalte J dokumentiert ausschliesslich Menü-, Footer- und Übersichtsaufrufe; automatische Textverweise werden nicht einzeln aufgeführt.

3. **Umsetzungsplan aus dem Register ableiten**
   Der detaillierte und gegen den Projektstand geprüfte Plan liegt in [UMSETZUNGSPLAN_SCHRITT_3.md](UMSETZUNGSPLAN_SCHRITT_3.md) vor. Er gliedert die Arbeiten nach Datenmodell, Inhaltsmigration, Übersichten, Navigation, Link-Erkennung, Bildversorgung und Qualitätssicherung. Bestehende Routen und Einträge werden wiederverwendet, statt parallel neu gebaut.

4. **Informationsarchitektur umsetzen**
   Neue oder angepasste Content-Collections und generische Routen erzeugen Übersichten und Detailseiten. Das aufklappbare Hauptmenü und der Footer werden ausschliesslich aus der im Register dokumentierten Navigation aufgebaut.

5. **Alle Detailseiten angleichen**
   Jede Item-Seite (Sehenswürdigkeit, Ort, Gericht/Getränk, Restaurant, Unterkunft) wird gegen den Narikala-Standard geprüft: inhaltliche Tiefe, Besuchsnutzen, Quellen, Bild/Alttext, passende interne Verweise, Reisetage und Aktualitätshinweis. Fehlende Inhalte werden zunächst aus dem Word-Dokument, danach aus Primär- oder Fachquellen ergänzt.

6. **Qualitätssicherung**
   Vor Veröffentlichung: Inhaltsvalidierung, Build, Link- und Bildprüfung, Suchindex, Offline-Fallback, Menüs, Standortablehnung der Karte sowie Ansichten bei 390, 768 und 1440 Pixeln prüfen.

## Offene redaktionelle Entscheidung

Die Seiten-IDs werden, sofern nichts anderes gewünscht ist, als fortlaufende dreistellige Nummern (`001`, `002`, …) vergeben. Sie sind stabil und rein intern; URLs bleiben sprechend und unabhängig davon.