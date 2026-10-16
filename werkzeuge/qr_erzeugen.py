"""QR-Code für einen Kartensatz erzeugen und (optional) ans Ende der Ich-kann-Liste setzen.

Aufruf (im Hauptverzeichnis des Repositorys):
    pip install segno python-docx zxing-cpp pillow
    python werkzeuge/qr_erzeugen.py kb1-diabetes                      # nur qr/qr_kb1-diabetes.png
    python werkzeuge/qr_erzeugen.py kb1-diabetes Ich_kann_Liste.docx  # zusätzlich …_mit_QR.docx

- Liest Besitzer und Namen des Repositorys aus dem Git-Remote „origin“;
  die Adresse ist https://<besitzer>.github.io/<repository>/<ordner>/
- Erzeugt qr/qr_<ordner>.png (Fehlerkorrektur M, Ruhezone 4 Module, mindestens
  600 × 600 px) und prüft, dass er sich dekodieren lässt.
- Mit einer .docx-Datei: hängt unten einen Kasten mit QR-Code (3,2 cm) und kurzem Text an
  und speichert das Ergebnis als „…_mit_QR.docx“. Das Original bleibt unverändert.
"""
import re
import subprocess
import sys
from pathlib import Path

import segno
from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

WURZEL = Path(__file__).resolve().parent.parent


def repo_aus_remote():
    url = subprocess.check_output(["git", "-C", str(WURZEL), "remote", "get-url", "origin"], text=True).strip()
    m = re.search(r"github\.com[/:]([^/]+)/([^/]+?)(?:\.git)?/?$", url)
    if not m:
        sys.exit(f"Git-Remote nicht erkannt: {url}")
    return m.group(1), m.group(2)


def qr_erzeugen(adresse, datei):
    qr = segno.make(adresse, error="m", micro=False)
    breite_module = qr.symbol_size(scale=1, border=4)[0]
    massstab = -(-600 // breite_module)  # aufrunden, damit mindestens 600 px
    qr.save(str(datei), kind="png", scale=massstab, border=4, dark="#000000", light="#FFFFFF")


def qr_pruefen(datei, erwartet):
    try:
        import zxingcpp
        from PIL import Image
    except ImportError:
        print("  (zxing-cpp/Pillow nicht installiert – Dekodierprüfung übersprungen)")
        return
    bild = Image.open(datei)
    ergebnisse = zxingcpp.read_barcodes(bild)
    texte = [e.text for e in ergebnisse]
    if texte != [erwartet]:
        sys.exit(f"QR-Prüfung fehlgeschlagen für {datei}: {texte}")
    print(f"  dekodiert: {texte[0]}  ({bild.size[0]} × {bild.size[1]} px, Fehlerkorrektur {ergebnisse[0].ec_level})")


def zelle_rahmen(zelle, farbe="3F6C72"):
    tc_pr = zelle._tc.get_or_add_tcPr()
    raender = OxmlElement("w:tcBorders")
    for seite in ("top", "left", "bottom", "right"):
        r = OxmlElement(f"w:{seite}")
        r.set(qn("w:val"), "single")
        r.set(qn("w:sz"), "12")
        r.set(qn("w:color"), farbe)
        raender.append(r)
    tc_pr.append(raender)


def in_liste_einsetzen(docx_pfad, qr_datei, adresse):
    doc = Document(docx_pfad)
    doc.add_paragraph()
    tabelle = doc.add_table(rows=1, cols=2)
    tabelle.alignment = WD_TABLE_ALIGNMENT.CENTER
    tabelle.autofit = False
    links, rechts = tabelle.rows[0].cells
    links.width, rechts.width = Cm(3.8), Cm(11.5)
    for z in (links, rechts):
        zelle_rahmen(z)
        z.vertical_alignment = 1  # Mitte

    p = links.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.add_run().add_picture(str(qr_datei), width=Cm(3.2))

    p = rechts.paragraphs[0]
    r = p.add_run("Lernkarten fürs Smartphone")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(0x25, 0x43, 0x4B)
    rechts.add_paragraph(
        "QR-Code scannen und alle Kompetenzen dieser Liste als Karteikarten lernen: "
        "vorne die Kompetenz, hinten die Beispielantwort. Ohne Anmeldung – "
        "Ihr Lernstand bleibt auf Ihrem Handy."
    )
    r = rechts.add_paragraph().add_run(adresse.replace("https://", "").rstrip("/"))
    r.font.size = Pt(9.5)
    r.font.color.rgb = RGBColor(0x3F, 0x6C, 0x72)
    doc.add_paragraph()

    ziel = Path(docx_pfad).with_name(Path(docx_pfad).stem + "_mit_QR.docx")
    doc.save(ziel)
    return ziel


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    ordner = sys.argv[1].strip("/")
    if not (WURZEL / "docs" / ordner / "karten.js").exists():
        sys.exit(f"docs/{ordner}/karten.js gibt es nicht.")
    besitzer, repo = repo_aus_remote()
    adresse = f"https://{besitzer.lower()}.github.io/{repo}/{ordner}/"
    qr_datei = WURZEL / "qr" / f"qr_{ordner}.png"
    qr_datei.parent.mkdir(exist_ok=True)
    print(f"Adresse: {adresse}")
    qr_erzeugen(adresse, qr_datei)
    qr_pruefen(qr_datei, adresse)
    print(f"  gespeichert: {qr_datei.relative_to(WURZEL)}")
    if len(sys.argv) > 2:
        print(f"  Ich-kann-Liste mit QR-Code: {in_liste_einsetzen(sys.argv[2], qr_datei, adresse)}")


if __name__ == "__main__":
    main()
