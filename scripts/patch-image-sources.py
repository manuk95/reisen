from pathlib import Path

path = Path("scripts/curate-entity-images.mjs")
text = path.read_text(encoding="utf-8")


def patch_item(slug: str, replacements: dict[str, str]) -> None:
    global text
    marker = f"slug: '{slug}',"
    start = text.index(marker)
    end = text.index("\n  },", start)
    block = text[start:end]
    for old, new in replacements.items():
        if old not in block:
            raise RuntimeError(f"{slug}: erwartete Zeile fehlt: {old}")
        block = block.replace(old, new)
    text = text[:start] + block + text[end:]


patch_item("rooms-kazbegi", {
    "download: { type: 'unsplash', id: 'y_Yr-xcOaYU' },": "download: { type: 'commons', file: 'Rooms Hotel Kazbegi.jpg' },",
    "alt: 'Bibliotheks- und Loungebereich im Rooms Hotel Kazbegi.',": "alt: 'Blick vom Rooms Hotel Kazbegi auf Stepantsminda und die Kaukasus-Bergwelt.',",
    "credit: 'Timur Kozmenko / Unsplash',": "credit: 'AdnanDekedek / Wikimedia Commons',",
    "source: 'https://unsplash.com/photos/a-library-with-a-lot-of-books-on-the-shelves-y_Yr-xcOaYU',": "source: 'https://commons.wikimedia.org/wiki/File:Rooms_Hotel_Kazbegi.jpg',",
    "license: 'Unsplash License',": "license: 'CC BY-SA 4.0',",
    "note: 'Das Foto wurde im Rooms Hotel Kazbegi aufgenommen und zeigt dessen Bibliotheks- und Loungebereich.'": "note: 'Das Foto wurde direkt vom Rooms Hotel Kazbegi aufgenommen und zeigt den charakteristischen Ausblick des Hauses.'",
})

patch_item("paragraph", {
    "download: { type: 'unsplash', id: '93gxTGa_xU0' },": "download: { type: 'commons', file: 'Shekvetili Resort.jpg' },",
    "alt: 'Hotelgebäude am Schwarzen Meer beim Paragraph Resort & Spa Shekvetili.',": "alt: 'Kontextbild: Küstenresort Shekvetili am Schwarzen Meer; zeigt nicht das Paragraph Resort selbst.',",
    "credit: 'Denis Volkov / Unsplash',": "credit: 'Iscream icecream / Wikimedia Commons',",
    "source: 'https://unsplash.com/photos/a-very-tall-building-next-to-a-body-of-water-93gxTGa_xU0',": "source: 'https://commons.wikimedia.org/wiki/File:Shekvetili_Resort.jpg',",
    "license: 'Unsplash License',": "license: 'CC BY-SA 4.0',",
    "context: false,": "context: true,",
    "note: 'Das Foto ist am Paragraph Resort & Spa Shekvetili verortet und zeigt das Hotelgebäude am Schwarzen Meer.'": "note: 'Das Bild zeigt das Küstenresort Shekvetili und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Paragraph Resort selbst.'",
})

patch_item("castello-mare", {
    "download: { type: 'unsplash', id: 'jQR1lDbU2NU' },": "download: { type: 'commons', file: 'Hidden Beach of Tsikhisdziri.jpg' },",
    "alt: 'Luftaufnahme des Castello Mare Hotel & Wellness Resort mit Pool und Tennisplatz.',": "alt: 'Kontextbild: versteckter Strand von Tsikhisdziri an der Schwarzmeerküste; zeigt nicht das Castello Mare Hotel selbst.',",
    "credit: 'Aleksandr Galichkin / Unsplash',": "credit: 'AlexandreAssatiani / Wikimedia Commons',",
    "source: 'https://unsplash.com/photos/aerial-view-of-a-mansion-with-pool-and-tennis-court-jQR1lDbU2NU',": "source: 'https://commons.wikimedia.org/wiki/File:Hidden_Beach_of_Tsikhisdziri.jpg',",
    "license: 'Unsplash License',": "license: 'CC BY 4.0',",
    "context: false,": "context: true,",
    "note: 'Das Foto ist direkt beim Castello Mare Hotel & Wellness Resort verortet und zeigt die Anlage aus der Luft.'": "note: 'Das Bild zeigt die Küste von Tsikhisdziri in unmittelbarer Region des Hotels und dient als klar gekennzeichnetes Umgebungsbild; es zeigt nicht das Castello Mare Hotel.'",
})

old_loop = "for (const item of items) {\n  const target = `public/images/georgien/${item.folder}/${item.slug}.jpg`;"
new_loop = "for (const item of items) {\n  // Wikimedia Commons fair nutzen und Rate-Limits vermeiden.\n  await new Promise(resolve => setTimeout(resolve, 2200));\n  const target = `public/images/georgien/${item.folder}/${item.slug}.jpg`;"
if old_loop not in text:
    raise RuntimeError("Download-Schleife für Drosselung nicht gefunden")
text = text.replace(old_loop, new_loop, 1)

path.write_text(text, encoding="utf-8")
print("Bildquellen auf Wikimedia Commons umgestellt und Downloads gedrosselt.")
