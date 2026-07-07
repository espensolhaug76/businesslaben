#!/usr/bin/env python3
"""
Splitt et vare- ELLER kunde-ark til navngitte enkeltutklipp.

Pipeline per ark:
  1) rembg (U^2-Net) fjerner bakgrunn -> alfa
  2) finn hver vare/person som egen connected-component (blob) i alfa-maska
  3) sorter blobs i lese-rekkefølge (rad for rad, venstre->høyre)
  4) kropp hver blob til sin alfa-bounding-box (+pad) og lagre som <navn>.png

Fire ark-familier, skilt på filnavn-prefiks (avgjør både mappe og navnekart):
  products-ark-NN-raw.png  -> public/assets/raw/products/<navn>.png
  customers-ark-NN-raw.png -> public/assets/raw/customers/<navn>.png
  fixtures-ark-NN-raw.png  -> public/assets/raw/fixtures/<navn>.png  (klesbutikk-
                              møbler: stativ/dukke/bord/hylle — jobb/klesbutikk)
  klar-ark-NN-raw.png      -> public/assets/raw/klar/<navn>.png  (klesbutikk-
                              PLAGG — jobb/klesbutikk; rå-arkene ligger i
                              raw/, utklippene skrives til raw/klar/)

Re-kjørbar for flere ark: legg nye ark i riktig mappe under public/assets/raw/
og legg navnekartet i PRODUCTS_NAME_MAPS/CUSTOMERS_NAME_MAPS under ark-nummeret
('NN' fra filnavnet). Kjør så:
    python scripts/split-product-sheet.py products-ark-03-raw.png
    python scripts/split-product-sheet.py customers-ark-03-raw.png
eller med eksplisitte navn (overstyrer kartet):
    python scripts/split-product-sheet.py <fil> navn1 navn2 ...

Avhenger av rembg-venvet (~/.venvs/rembg). scipy brukes om tilgjengelig, ellers
en ren numpy-fallback for labeling.
"""
import sys, os
from collections import deque

PRODUCTS_DIR  = "/home/espen/adventure-web/public/assets/raw/products"
CUSTOMERS_DIR = "/home/espen/adventure-web/public/assets/raw/customers"
# Fixtures-arkene (klesbutikk-møbler) er BRANSJE-2-arbeid som bor på grenen
# jobb/klesbutikk — les fra og skriv til DEN worktreen, ikke main-worktreen.
FIXTURES_DIR  = "/home/espen/adventure-web-klesbutikk/public/assets/raw/fixtures"
# Klar-arkene (klesbutikk-PLAGG): rå-arkene ligger i raw/ (klar-ark-NN-raw.png),
# men utklippene skrives til en egen raw/klar/-mappe (mange filer). Derfor er
# raw-mappe (input) og out-mappe (output) ULIKE for denne familien.
KLAR_RAW_DIR  = "/home/espen/adventure-web-klesbutikk/public/assets/raw"
KLAR_DIR      = "/home/espen/adventure-web-klesbutikk/public/assets/raw/klar"

# Navnekart per ark-nummer, i LESE-rekkefølge (rad for rad, venstre->høyre).
PRODUCTS_NAME_MAPS = {
    "01": ["croissant", "muffin-blabaer", "kanelbolle", "skolebrod", "rundstykke-grovt", "gulrotkake"],
    "02": ["baguette", "focaccia", "wrap-kylling", "salat", "grovbrod", "surdeigsbrod"],
}
# kari/tom kom IKKE fra denne ark-splitteren — de ble laget fra hver sin
# frittstående rå-fil (kari-raw.png / tom-raw.png), ikke et rutenett-ark. Ingen
# "01"/"02"-oppføring for dem her (en tidligere versjon av denne kommentaren
# gjettet feil på dette).
#
# customers-ark-02-raw.png = DEL 3 (Persona-realisme + 4 nye salgsscenarier,
# 2026-07-06): fire nye kunder generert PARALLELT av Espen på ett NB-ark,
# lastet opp 2026-07-06. Lese-rekkefølge (rad for rad, venstre->høyre) matchet
# visuelt mot scenarioenes kjernebehov: øverst v. = usikker/spørrende positur
# (Den usikre), øverst h. = korslagte armer/skeptisk (Prutekunden), nederst v.
# = nervøs/bekymret (Allergikeren), nederst h. = i fart med telefon+veske
# (Storbestillingen).
CUSTOMERS_NAME_MAPS = {
    "02": ["usikre", "prutekunden", "allergikeren", "storbestiller"],
}
# Klesbutikk-møbler (DEL 1, jobb/klesbutikk). Ark 01 = 2x2, lese-rekkefølge
# (rad for rad, v->h): rad 1 = klesstativ, dame-dukke; rad 2 = bord, hylle.
# ✦-glyfen nederst til høyre er nano-bananas AI-vannmerke — den blir en egen
# blob og skal IKKE inn i noe møbel-utklipp (kastes etterpå, se rapporten).
# Ark 02 har ANNET innhold (herre-/barne-dukke, to stativstørrelser, to bord)
# og mangler foreløpig navnekart — legges til når Espen har bekreftet navnene.
FIXTURES_NAME_MAPS = {
    "01": ["stativ", "dukke", "bord", "hylle"],
    # Ark 02 (lese-rekkefølge v->h, øverst->nederst): herre-dukke, barne-dukke,
    # stort stativ (DUPLIKAT av ark-01s stativ -> SKIP), lite stativ, enkelt
    # bord (DUPLIKAT av ark-01s bord -> SKIP), podium-bord. 'SKIP' skriver ingen
    # fil for den bloben (se skrive-løkka).
    "02": ["dukke-mann", "dukke-barn", "SKIP", "stativ-liten", "SKIP", "bord-podium"],
}

# Klesbutikk-PLAGG (klar-ark-NN, jobb/klesbutikk). VIKTIG: de fysiske ark-numrene
# (filnavnet) matcher IKKE oppdragets logiske nummerering — innholdet er stokket
# om, ark-05 er en DUPLIKAT av ark-04, og «heng profil»-arket (logisk 03) MANGLER
# helt. Navnekartene under er derfor keyet på FYSISK arknr., matchet visuelt mot
# faktisk innhold 2026-07-07. Alle ark er 4x2 (lese-rekkefølge: rad 1 v->h, rad 2
# v->h). ✦-VANNMERKET (nano-banana) OVERLAPPER det nederste-høyre plagget på 6
# ark (fysisk 01/02/03/04/06/08) og havner INNE i det plaggets crop — det ble
# fjernet MANUELT etter split (klone-patch/diffusjon) fra sport-antrekk-2,
# dunvest-dame, ullfrakk, kjeledress-barn, vattert-vest, luer-stabel. Re-splitt
# = gjenta ✦-fjerningen. MANGLER: «heng profil»-arket (logisk 03); fysisk 05 er
# en DUPLIKAT av 04 — derfor intet "05"-navnekart.
KLAR_NAME_MAPS = {
    # fysisk 01 = brettede stabler (topprad) + herre-antrekk (bunnrad)
    "01": ["t-skjorter-stabel", "jeans-stabel", "gensere-stabel", "cardigan-stabel",
           "casual-antrekk", "dress-antrekk", "sport-antrekk-1", "sport-antrekk-2"],
    # fysisk 02 = heng front DAME
    "02": ["bluse", "cardigan-dame", "blazer-dame", "maxikjole",
           "denimskjort", "trenchcoat", "strikkekjole", "dunvest-dame"],
    # fysisk 03 = heng front (herre)
    "03": ["denimjakke", "hvit-skjorte", "graa-genser", "brun-genser",
           "sommerkjole", "hoodie", "blaa-genser", "ullfrakk"],
    # fysisk 04 = heng front BARN
    "04": ["regnjakke-barn", "hoodie-barn", "denimjakke-barn", "genser-barn",
           "sommerkjole-barn", "parkas-barn", "tskjorte-barn", "kjeledress-barn"],
    # fysisk 05 = DUPLIKAT av 04 (barn) — bevisst uten kart, ikke splitt den.
    # fysisk 06 = heng VINTER
    "06": ["dunparkas", "ullkaape", "skijakke", "fleecejakke",
           "tykk-genser", "dunjakke", "softshell", "vattert-vest"],
    # fysisk 07 = heng SOMMER
    "07": ["linskjorte", "sommerkjole-2", "badeshorts", "tskjorte",
           "bomberjakke", "singlet", "linbukse", "kimono"],
    # fysisk 08 = brettede stabler
    "08": ["skjorter-stabel", "chinos-stabel", "hoodies-stabel", "flanell-stabel",
           "shorts-stabel", "cardigans-stabel", "skjerf-stabel", "luer-stabel"],
    # fysisk 09 = antrekk (topprad dame, bunnrad barn)
    "09": ["casual-dame", "business-dame", "sommer-dame", "vinter-dame",
           "casual-barn", "sport-barn", "sommer-barn-antrekk", "vinter-barn-antrekk"],
}

ALPHA_THRESHOLD = 40      # alfa over dette = «vare-piksel»
MIN_AREA_FRAC   = 0.004   # blobs mindre enn 0.4 % av arealet kastes (støy/krummer)
PAD             = 6       # piksler luft rundt hvert utklipp


def ark_number(path):
    import re
    m = re.search(r"ark-(\d+)", os.path.basename(path))
    return m.group(1) if m else None


def label_components(mask):
    """Returner (labels, n). Prøv scipy, fall tilbake til numpy-BFS (4-conn)."""
    import numpy as np
    try:
        from scipy import ndimage
        labels, n = ndimage.label(mask, structure=np.ones((3, 3)))  # 8-conn
        return labels, n
    except Exception:
        H, W = mask.shape
        labels = np.zeros((H, W), dtype=np.int32)
        cur = 0
        for sy in range(H):
            for sx in range(W):
                if mask[sy, sx] and labels[sy, sx] == 0:
                    cur += 1
                    q = deque([(sy, sx)])
                    labels[sy, sx] = cur
                    while q:
                        y, x = q.popleft()
                        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                            ny, nx = y + dy, x + dx
                            if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and labels[ny, nx] == 0:
                                labels[ny, nx] = cur
                                q.append((ny, nx))
        return labels, cur


def reading_order(boxes):
    """boxes: liste (idx, x0, y0, x1, y1). Sorter rad for rad (klynge på y),
    deretter venstre->høyre. Rad-toleranse = halve median-høyden."""
    if not boxes:
        return []
    heights = sorted((b[4] - b[2]) for b in boxes)
    tol = max(8, heights[len(heights) // 2] * 0.5)
    rows = []
    for b in sorted(boxes, key=lambda b: b[2]):  # etter y0
        cy = (b[2] + b[4]) / 2
        placed = False
        for row in rows:
            if abs(cy - row["cy"]) <= tol:
                row["items"].append(b)
                row["cy"] = sum((it[2] + it[4]) / 2 for it in row["items"]) / len(row["items"])
                placed = True
                break
        if not placed:
            rows.append({"cy": cy, "items": [b]})
    rows.sort(key=lambda r: r["cy"])
    out = []
    for row in rows:
        out.extend(sorted(row["items"], key=lambda b: b[1]))  # etter x0
    return out


def resolve_family(path):
    """Avgjør ark-familie fra filnavn-prefiks -> (raw_dir, name_map, out_dir)."""
    base = os.path.basename(path)
    if base.startswith("customers-ark"):
        return CUSTOMERS_DIR, CUSTOMERS_NAME_MAPS, CUSTOMERS_DIR
    if base.startswith("fixtures-ark"):
        return FIXTURES_DIR, FIXTURES_NAME_MAPS, FIXTURES_DIR
    if base.startswith("klar-ark"):
        return KLAR_RAW_DIR, KLAR_NAME_MAPS, KLAR_DIR
    return PRODUCTS_DIR, PRODUCTS_NAME_MAPS, PRODUCTS_DIR


def main():
    if len(sys.argv) < 2:
        print("Bruk: split-product-sheet.py <ark-fil.png> [navn1 navn2 ...]")
        sys.exit(1)
    inp = sys.argv[1]
    # Familien avgjøres av filnavnet ALENE (products-ark-* / customers-ark-*),
    # så vi må kjenne familien FØR vi kan lete i riktig mappe for et
    # relativt filnavn.
    raw_dir, name_maps, out_dir = resolve_family(inp)
    if not os.path.isabs(inp):
        inp = os.path.join(raw_dir, inp) if not os.path.exists(inp) else inp
    if not os.path.exists(inp):
        print(f"FEIL: fant ikke {inp}")
        sys.exit(1)

    # --model <navn> (valgfritt, hvor som helst i args): overstyr rembg-modellen.
    # Oppdaget 2026-07-06 (customers-ark-02, Prutekunden): standard-modellen
    # (u2net) kan legge igjen et INTERNT gjennomsiktig felt midt i en
    # korslagte-armer-positur — et segmenteringsartefakt, ikke en kant-halo
    # (fanges ikke av halo-sjekken under). 'u2net_human_seg' løste DEN posen,
    # men laget samtidig et NYTT artefakt på en annen positur i samme ark
    # (usikre) som var ren under standard-modellen — altså ikke en universell
    # «alltid bedre for mennesker»-erstatning. Kjør per ark/positur med begge
    # og sammenlign visuelt; bruk dette flagget til å be om et alternativ der
    # standard feiler, IKKE som ny standard for hele customers-familien.
    rest = sys.argv[2:]
    model = None
    if "--model" in rest:
        idx = rest.index("--model")
        model = rest[idx + 1]
        rest = rest[:idx] + rest[idx + 2:]

    names = rest
    if not names:
        nn = ark_number(inp)
        names = name_maps.get(nn or "", [])
        if not names:
            map_name = {CUSTOMERS_DIR: 'CUSTOMERS_NAME_MAPS',
                        FIXTURES_DIR: 'FIXTURES_NAME_MAPS',
                        KLAR_DIR: 'KLAR_NAME_MAPS'}.get(out_dir, 'PRODUCTS_NAME_MAPS')
            print(f"FEIL: ingen navn oppgitt og intet kart for ark '{nn}'. Legg til i {map_name}.")
            sys.exit(1)

    import numpy as np
    from PIL import Image
    from rembg import remove, new_session

    session = new_session(model) if model else None

    print(f"rembg: {inp}" + (f" (modell: {model})" if model else ""))
    src = Image.open(inp).convert("RGBA")
    cut = remove(src, session=session) if session else remove(src)  # RGBA med ren alfa
    arr = np.array(cut)
    H, W = arr.shape[:2]
    mask = arr[:, :, 3] > ALPHA_THRESHOLD

    labels, n = label_components(mask)
    boxes = []
    min_area = MIN_AREA_FRAC * H * W
    for i in range(1, n + 1):
        ys, xs = np.where(labels == i)
        if ys.size < min_area:
            continue
        boxes.append((i, int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1, int(ys.size)))

    ordered = reading_order([(b[0], b[1], b[2], b[3], b[4]) for b in boxes])
    print(f"Fant {len(ordered)} blobs (forventet {len(names)}).")
    if len(ordered) != len(names):
        print("  ADVARSEL: antall blobs != antall navn. Sjekk MIN_AREA_FRAC / arket "
              "(varer som henger sammen blir én blob; krummer blir egne).")

    os.makedirs(out_dir, exist_ok=True)
    area_by_idx = {b[0]: b[5] for b in boxes}
    for k, (idx, x0, y0, x1, y1) in enumerate(ordered):
        name = names[k] if k < len(names) else f"ukjent-{k+1}"
        # 'SKIP' i navnekartet = blob som IKKE skal lagres (f.eks. et møbel som
        # er duplikat av et allerede splittet fra et annet ark). Vi teller den
        # fortsatt i lese-rekkefølgen så etterfølgende navn treffer riktig blob.
        if name.upper() == "SKIP":
            print(f"  {'(SKIP)':18s} {x1-x0:>4}x{y1-y0:<4}  -> hopper over blob #{k+1} (duplikat)")
            continue
        l = max(0, x0 - PAD); t = max(0, y0 - PAD); r = min(W, x1 + PAD); b = min(H, y1 + PAD)
        clip = cut.crop((l, t, r, b))
        # rapport: halo-sjekk (whiteish semi-transparente kantpiksler)
        ca = np.array(clip)
        a = ca[:, :, 3]
        semi = (a > 20) & (a < 230)
        whiteish = semi & (ca[:, :, 0] > 235) & (ca[:, :, 1] > 235) & (ca[:, :, 2] > 235)
        out = os.path.join(out_dir, f"{name}.png")
        clip.save(out)
        print(f"  {name:18s} {clip.size[0]:>4}x{clip.size[1]:<4}  areal={area_by_idx.get(idx,0):>7}  "
              f"halo={int(whiteish.sum()):>4}  -> {out}")

    print("Ferdig. Verifiser hvert utklipp visuelt: ren alfa, ingen nabovare-rest, "
          "ingen hvit-glød (halo) / vannmerke.")


if __name__ == "__main__":
    main()
