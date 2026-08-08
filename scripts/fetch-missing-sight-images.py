from __future__ import annotations

import html
import json
import re
import time
from io import BytesIO
from pathlib import Path
from urllib.parse import quote, unquote

import requests
from PIL import Image, ImageOps

API = "https://commons.wikimedia.org/w/api.php"
UA = "reisen-georgien-image-fetcher/1.0 (GitHub Actions; travel guide image attribution)"
TODAY = "2026-08-08"
SESSION = requests.Session()
SESSION.headers.update({"User-Agent": UA})

IMAGES = {
    "altstadt-metekhi": ("Metekhi Church.jpg", "Metekhi-Kirche über dem Mtkvari in der Altstadt von Tbilisi"),
    "ananuri-schinwali": ("Ananuri (G).jpg", "Blick von der Festung Ananuri über den Schinwali-Stausee"),
    "ateni-tal": ("Atenis Sioni view.jpg", "Ateni-Sioni-Kirche im landschaftlich und vom Weinbau geprägten Ateni-Tal"),
    "bagrati-kathedrale": ("Bagrati Cathedral.jpg", "Bagrati-Kathedrale auf dem Hügel über Kutaisi"),
    "bordschomi": ("Borjomi Central Park (Mineral Water Park) (4).jpg", "Mineralwasserpark im georgischen Kurort Bordschomi"),
    "chertwisi": ("Fortress of Khertvisi1.jpg", "Festung Chertwisi auf einem Felsrücken in Samtskhe-Dschawachetien"),
    "dariali-gveleti": ("Waterfall in Dariali Gorge, Georgia.jpg", "Wasserfall in der Dariali-Schlucht nördlich von Stepantsminda"),
    "dry-bridge-fabrika": ("Dry Bridge Market. Tbilisi.jpg", "Antiquitäten und Alltagsgegenstände auf dem Dry-Bridge-Markt in Tbilisi"),
    "dschawacheti-hochland": ("ParavaniLake.jpg", "Parawani-See in der weiten Hochlandlandschaft von Dschawachetien"),
    "dschwari-kloster": ("Jvari Monastery, Mtskheta, Georgia.jpg", "Dschwari-Kloster auf dem Bergrücken über Mtskheta"),
    "gori": ("Gori Fortress, Georgia.jpg", "Festung von Gori über der Stadt in Shida Kartli"),
    "gudauri-kreuzpass": ("Russia- Georgia Friendship Monument (31002685640).jpg", "Freundschaftsmonument bei Gudauri an der Georgischen Heerstrasse"),
    "juta": ("Khevi, Georgia — Mountainous Village Juta.jpg", "Bergdorf Juta in der Hochgebirgslandschaft des Grossen Kaukasus"),
    "motsameta": ("Motsameta monastery, Georgia (2).jpg", "Kloster Motsameta über der bewaldeten Tskaltsitela-Schlucht"),
    "mtatsminda": ("Panoramic view of Tbilisi from Mtatsminda Park.JPG", "Panoramablick vom Mtatsminda über Tbilisi"),
    "mtskheta": ("Panoramic view of Mtskheta with the Svetitskhoveli Cathedral.jpg", "Panorama von Mtskheta mit der Swetizchoweli-Kathedrale"),
    "pshavi-chewsuretien": ("Khevsureti, Georgia — Mountainous Village Shatili.jpg", "Historisches Bergdorf Schatili in Chewsuretien"),
    "rabati": ("Rabati Castle.jpg", "Festungsanlage Rabati in Achalziche"),
    "rustaweli-nationalmuseum": ("თბილისი - სიმონ ჯანაშიას სახელობის საქართველოს მუზეუმი 0520.jpg", "Simon-Dschanaschia-Museum des Georgischen Nationalmuseums in Tbilisi"),
    "sameba-kathedrale": ("Sameba Cathedral, Christian Orthodox Church, Tbilisi, Georgia.jpg", "Sameba-Kathedrale auf dem Elia-Hügel in Tbilisi"),
    "sataplia": ("Sataplia Cave, Imereti, Georgia.jpg", "Beleuchtete Tropfsteinformationen in der Sataplia-Höhle bei Kutaisi"),
    "stalin-museum": ("Stalin Museum in Gori.jpg", "Ausstellung im Stalin-Museum in Gori"),
    "swetizchoweli": ("Svetitskhoveli Cathedral, Mtskheta, Georgia 01.jpg", "Swetizchoweli-Kathedrale im historischen Zentrum von Mtskheta"),
    "trusso-tal": ("Truso valley fossil travertines.jpg", "Travertin- und Mineralablagerungen am Terek im Trusso-Tal"),
    "tskaltubo": ("Sanatorium of the Ministry of Defense of the Soviet Union. Tsqaltubo, Georgia. 1957.jpg", "Historische Aufnahme eines sowjetischen Sanatoriums in Tskaltubo"),
    "uplisziche": ("Uplistsikhe Cave City Georgia.jpg", "In den Fels gehauene Räume der Höhlenstadt Uplisziche"),
}


def clean_html(value: str) -> str:
    value = re.sub(r"<[^>]+>", "", value or "")
    return html.unescape(value).strip()


def get_with_retry(url: str, *, params=None, timeout=60, attempts=5):
    delay = 3
    last = None
    for attempt in range(1, attempts + 1):
        r = SESSION.get(url, params=params, timeout=timeout)
        last = r
        if r.status_code != 429 and r.status_code < 500:
            r.raise_for_status()
            return r
        if attempt == attempts:
            break
        retry_after = r.headers.get("Retry-After")
        wait = int(retry_after) if retry_after and retry_after.isdigit() else delay
        print(f"HTTP {r.status_code}; neuer Versuch in {wait}s ({attempt}/{attempts})")
        time.sleep(wait)
        delay = min(delay * 2, 24)
    assert last is not None
    last.raise_for_status()


def commons_info(filename: str) -> dict:
    params = {
        "action": "query",
        "format": "json",
        "formatversion": "2",
        "prop": "imageinfo",
        "iiprop": "url|extmetadata",
        "titles": f"File:{filename}",
    }
    r = get_with_retry(API, params=params, timeout=45)
    page = r.json()["query"]["pages"][0]
    if page.get("missing"):
        raise RuntimeError(f"Commons-Datei fehlt: {filename}")
    info = page["imageinfo"][0]
    meta = info.get("extmetadata", {})
    license_name = clean_html(meta.get("LicenseShortName", {}).get("value", ""))
    author = clean_html(meta.get("Artist", {}).get("value", "")) or "Wikimedia-Commons-Beitragende"
    lower = license_name.lower()
    if not ("cc by" in lower or "cc0" in lower or "public domain" in lower or lower == "pd"):
        raise RuntimeError(f"Nicht freigegebene oder unklare Lizenz für {filename}: {license_name!r}")
    return {
        "url": info["url"].split("?", 1)[0],
        "author": author,
        "license": license_name,
        "source": "https://commons.wikimedia.org/wiki/File:" + quote(filename.replace(" ", "_"), safe="_-().,%E2%80%94"),
    }


def yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def has_placeholder(slug: str) -> bool:
    path = Path("src/content/sehenswuerdigkeiten") / f"{slug}.md"
    return "image: images/platzhalter.png" in path.read_text(encoding="utf-8")


def update_markdown(slug: str, alt: str, meta: dict) -> None:
    path = Path("src/content/sehenswuerdigkeiten") / f"{slug}.md"
    text = path.read_text(encoding="utf-8")
    if "image: images/platzhalter.png" not in text:
        return
    block = "\n".join([
        f"image: images/georgien/sehenswuerdigkeiten/{slug}.jpg",
        f"imageAlt: {yaml_string(alt)}",
        "imageStatus: lizenziert",
        f"imageCredit: {yaml_string(meta['author'])}",
        f"imageSource: {yaml_string(meta['source'])}",
        f"imageLicense: {yaml_string(meta['license'])}",
        'imageEdit: "Auf höchstens 1600 Pixel Kantenlänge verkleinert; keine inhaltliche Bearbeitung."',
    ])
    text = re.sub(
        r"image: images/platzhalter\.png\r?\nimageAlt: [^\r\n]*\r?\nimageStatus: platzhalter",
        block,
        text,
        count=1,
    )
    text = re.sub(r"updated: [^\r\n]+", f"updated: {TODAY}", text, count=1)
    if f"image: images/georgien/sehenswuerdigkeiten/{slug}.jpg" not in text:
        raise RuntimeError(f"{path}: Frontmatter konnte nicht ersetzt werden")
    path.write_text(text, encoding="utf-8")


def download_image(slug: str, meta: dict) -> None:
    target = Path("public/images/georgien/sehenswuerdigkeiten") / f"{slug}.jpg"
    target.parent.mkdir(parents=True, exist_ok=True)
    source = unquote(meta["url"])
    proxy = "https://images.weserv.nl/?url=" + quote(source, safe="") + "&w=1600&output=jpg&q=86"
    r = get_with_retry(proxy, timeout=60, attempts=4)
    image = Image.open(BytesIO(r.content))
    image = ImageOps.exif_transpose(image).convert("RGB")
    image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    image.save(target, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"{slug}: {image.width}x{image.height} · {meta['license']} · {meta['author']}")


def main() -> None:
    failures = []
    print(f"Bearbeite bis zu {len(IMAGES)} fehlende Sehenswürdigkeitsbilder")
    for index, (slug, (filename, alt)) in enumerate(IMAGES.items(), start=1):
        if not has_placeholder(slug):
            print(f"[{index}/{len(IMAGES)}] {slug}: bereits erledigt, übersprungen")
            continue
        print(f"[{index}/{len(IMAGES)}] {slug} ← {filename}")
        try:
            meta = commons_info(filename)
            download_image(slug, meta)
            update_markdown(slug, alt, meta)
        except Exception as exc:
            failures.append((slug, str(exc)))
            print(f"FEHLER {slug}: {exc}")
        time.sleep(0.5)
    if failures:
        print("Noch offene Motive:")
        for slug, error in failures:
            print(f"- {slug}: {error}")
    else:
        print("Alle fehlenden Sehenswürdigkeitsbilder wurden ergänzt.")


if __name__ == "__main__":
    main()
