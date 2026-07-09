#!/usr/bin/env python3
"""
split-profil-ark.py — splitt for klar-profil-arkene (HENG PROFIL).

To moduser (per ark):
  "strip" — plaggene henger TETT/STAGET og smelter til ÉN blob (bøyle-tråder +
            overlapp). Splitt i VERTIKALE STRIPER ved tetthets-daler + fjern
            nabo-sliver ved FARGE. (Brukt for ark-04.)
  "blob"  — plaggene er separate komponenter, MEN bbox-rektanglene overlapper
            (staget), så en ren bbox-crop tar med nabo-piksler. Splitt via
            connected-components og MASKÉR hvert utklipp til KUN sin egen
            komponent (nuller nabo-piksler i bbox). (Brukt for ark-01/02/03.)

Alle utklipp -> public/assets/raw/klar-profil/. Avhenger av rembg-venvet
(~/.venvs/rembg): PIL, numpy, scipy, rembg.
"""
import numpy as np, os, sys
from PIL import Image
from rembg import remove
from scipy import ndimage

RAW = "/home/espen/adventure-web-klesbutikk/public/assets/raw"
OUT = "/home/espen/adventure-web-klesbutikk/public/assets/raw/klar-profil"
PAD = 6
MIN_AREA_FRAC = 0.004


def navy_sliver(ca):   # blådominant (marine genser lekker inn i grå frakk)
    R, G, B = (ca[:, :, k].astype(int) for k in range(3))
    return (B - np.maximum(R, G) > 14) & (ca[:, :, 3] > 40)
def warm_sliver(ca):   # rød>blå varm (brun flanell lekker inn i marine genser)
    R, G, B = (ca[:, :, k].astype(int) for k in range(3))
    return (R - B > 5) & (ca[:, :, 3] > 40)


ARKS = {
    "klar-profil-ark-01-raw.png": {"mode": "blob",
        "names": ["trenchcoat-beige", "kabelgenser-hvit", "skjorte-lyseblaa", "lang-kjole-gronn"]},
    "klar-profil-ark-02-raw.png": {"mode": "blob",
        "names": ["denimjakke-blaa", "hoodie-beige", "blazer-graa", "lang-kjole-rosa"]},
    "klar-profil-ark-03-raw.png": {"mode": "blob",
        "names": ["parka-gronn", "skjorte-hvit", "dunjakke-roed", "denim-selebukse"]},
    "klar-profil-ark-04-raw.png": {"mode": "strip",
        "cuts": [0, 224, 362, 492, None],
        "names": ["frakk-morkgraa", "strikkegenser-marine", "flanellskjorte-brun", "bomberjakke-svart"],
        "cleanups": {"frakk-morkgraa": navy_sliver, "strikkegenser-marine": warm_sliver}},
}


def reading_order(boxes):
    """boxes: (idx,x0,y0,x1,y1). Rad for rad (klynge på y), så v->h."""
    if not boxes:
        return []
    heights = sorted(b[4] - b[2] for b in boxes)
    tol = max(8, heights[len(heights) // 2] * 0.5)
    rows = []
    for b in sorted(boxes, key=lambda b: b[2]):
        cy = (b[2] + b[4]) / 2
        for row in rows:
            if abs(cy - row["cy"]) <= tol:
                row["items"].append(b); row["cy"] = sum((it[2] + it[4]) / 2 for it in row["items"]) / len(row["items"]); break
        else:
            rows.append({"cy": cy, "items": [b]})
    rows.sort(key=lambda r: r["cy"])
    out = []
    for row in rows:
        out.extend(sorted(row["items"], key=lambda b: b[1]))
    return out


def save_clip(strip, mask, name):
    ys, xs = np.where(mask)
    if xs.size == 0:
        print(f"  ADVARSEL: tom for {name}"); return
    H = strip.shape[0]
    l = max(0, xs.min() - PAD); r = min(strip.shape[1], xs.max() + 1 + PAD)
    t = max(0, ys.min() - PAD); b = min(H, ys.max() + 1 + PAD)
    clip = Image.fromarray(strip[t:b, l:r], "RGBA")
    ca = np.array(clip); a = ca[:, :, 3]; semi = (a > 20) & (a < 230)
    halo = int((semi & (ca[:, :, 0] > 235) & (ca[:, :, 1] > 235) & (ca[:, :, 2] > 235)).sum())
    clip.save(os.path.join(OUT, f"{name}.png"))
    print(f"  {name:20s} {clip.size[0]:>4}x{clip.size[1]:<4} halo={halo} -> klar-profil/{name}.png")


def split_strip(arr, cfg):
    H, W = arr.shape[:2]
    cuts = [c if c is not None else W for c in cfg["cuts"]]
    for i, name in enumerate(cfg["names"]):
        strip = arr[:, cuts[i]:cuts[i + 1]].copy()
        clean = cfg.get("cleanups", {}).get(name)
        if clean is not None:
            strip[clean(strip)] = 0
        m = strip[:, :, 3] > 40
        lab, n = ndimage.label(m, structure=np.ones((3, 3)))
        if n > 1:
            sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
            keep = int(np.argmax(sizes)) + 1; strip[lab != keep] = 0; m = lab == keep
        save_clip(strip, m, name)


def split_blob(arr, cfg):
    """Separate komponenter, men MASKÉR hver crop til kun sin egen komponent."""
    H, W = arr.shape[:2]
    mask = arr[:, :, 3] > 40
    lab, n = ndimage.label(mask, structure=np.ones((3, 3)))
    min_area = MIN_AREA_FRAC * H * W
    boxes = []
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if ys.size < min_area:
            continue
        boxes.append((i, int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))
    ordered = reading_order(boxes)
    print(f"  {len(ordered)} komponenter (forventet {len(cfg['names'])})")
    for k, (idx, x0, y0, x1, y1) in enumerate(ordered):
        name = cfg["names"][k] if k < len(cfg["names"]) else f"ukjent-{k+1}"
        comp = np.zeros_like(arr)
        sel = lab == idx                    # KUN denne komponentens piksler
        comp[sel] = arr[sel]
        save_clip(comp, sel, name)


def main():
    fname = sys.argv[1] if len(sys.argv) > 1 else "klar-profil-ark-04-raw.png"
    if fname not in ARKS:
        print(f"FEIL: ingen oppsett for '{fname}'. Legg til i ARKS."); sys.exit(1)
    cfg = ARKS[fname]
    os.makedirs(OUT, exist_ok=True)
    print(f"rembg + {cfg['mode']}-splitt: {fname}")
    cut = remove(Image.open(os.path.join(RAW, fname)).convert("RGBA"))
    arr = np.array(cut)
    (split_strip if cfg["mode"] == "strip" else split_blob)(arr, cfg)
    print("Ferdig. Verifiser hvert utklipp visuelt: ren alfa, ingen nabo-rest, ingen ✦.")


if __name__ == "__main__":
    main()
