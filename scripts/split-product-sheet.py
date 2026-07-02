#!/usr/bin/env python3
"""
Splitt et vare-ark til navngitte enkeltvare-utklipp.

Pipeline per ark:
  1) rembg (U^2-Net) fjerner bakgrunn -> alfa
  2) finn hver vare som egen connected-component (blob) i alfa-maska
  3) sorter blobs i lese-rekkefølge (rad for rad, venstre->høyre)
  4) kropp hver blob til sin alfa-bounding-box (+pad) og lagre som <navn>.png

Re-kjørbar for flere ark: legg nye ark i public/assets/raw/products/ som
products-ark-NN-raw.png og legg navnekartet i NAME_MAPS under 'NN'. Kjør så:
    python scripts/split-product-sheet.py products-ark-03-raw.png
eller med eksplisitte navn (overstyrer kartet):
    python scripts/split-product-sheet.py <fil> navn1 navn2 ...

Avhenger av rembg-venvet (~/.venvs/rembg). scipy brukes om tilgjengelig, ellers
en ren numpy-fallback for labeling.

Output: public/assets/raw/products/<navn>.png  (ren alfa, ett utklipp per vare)
"""
import sys, os
from collections import deque

RAW_DIR = "/home/espen/adventure-web/public/assets/raw/products"

# Navnekart per ark-nummer, i LESE-rekkefølge (rad for rad, venstre->høyre).
NAME_MAPS = {
    "01": ["croissant", "muffin-blabaer", "kanelbolle", "skolebrod", "rundstykke-grovt", "gulrotkake"],
    "02": ["baguette", "focaccia", "wrap-kylling", "salat", "grovbrod", "surdeigsbrod"],
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


def main():
    if len(sys.argv) < 2:
        print("Bruk: split-product-sheet.py <ark-fil.png> [navn1 navn2 ...]")
        sys.exit(1)
    inp = sys.argv[1]
    if not os.path.isabs(inp):
        inp = os.path.join(RAW_DIR, inp) if not os.path.exists(inp) else inp
    if not os.path.exists(inp):
        print(f"FEIL: fant ikke {inp}")
        sys.exit(1)

    names = sys.argv[2:]
    if not names:
        nn = ark_number(inp)
        names = NAME_MAPS.get(nn or "", [])
        if not names:
            print(f"FEIL: ingen navn oppgitt og intet kart for ark '{nn}'. Legg til i NAME_MAPS.")
            sys.exit(1)

    import numpy as np
    from PIL import Image
    from rembg import remove

    print(f"rembg: {inp}")
    src = Image.open(inp).convert("RGBA")
    cut = remove(src)  # RGBA med ren alfa
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

    os.makedirs(RAW_DIR, exist_ok=True)
    area_by_idx = {b[0]: b[5] for b in boxes}
    for k, (idx, x0, y0, x1, y1) in enumerate(ordered):
        name = names[k] if k < len(names) else f"ukjent-{k+1}"
        l = max(0, x0 - PAD); t = max(0, y0 - PAD); r = min(W, x1 + PAD); b = min(H, y1 + PAD)
        clip = cut.crop((l, t, r, b))
        # rapport: halo-sjekk (whiteish semi-transparente kantpiksler)
        ca = np.array(clip)
        a = ca[:, :, 3]
        semi = (a > 20) & (a < 230)
        whiteish = semi & (ca[:, :, 0] > 235) & (ca[:, :, 1] > 235) & (ca[:, :, 2] > 235)
        out = os.path.join(RAW_DIR, f"{name}.png")
        clip.save(out)
        print(f"  {name:18s} {clip.size[0]:>4}x{clip.size[1]:<4}  areal={area_by_idx.get(idx,0):>7}  "
              f"halo={int(whiteish.sum()):>4}  -> {out}")

    print("Ferdig. Verifiser hvert utklipp visuelt: ren alfa, ingen nabovare-rest, "
          "ingen hvit-glød (halo) / vannmerke.")


if __name__ == "__main__":
    main()
