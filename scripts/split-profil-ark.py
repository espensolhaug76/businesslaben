#!/usr/bin/env python3
"""
split-profil-ark.py — spesial-splitt for klar-profil-arkene (HENG PROFIL).

Hvorfor egen splitt: profil-arkene viser plaggene hengende PÅ BØYLE i 3/4-profil,
tett sammen og STAGET i ulik dybde. Etter bakgrunnsfjerning henger de sammen som
ÉN blob (bøyle-tråder + overlapp), så den vanlige blob-detekteringen i
split-product-sheet.py gir 1 blob i stedet for 4. Denne splitter i stedet i
VERTIKALE STRIPER ved tetthets-daler mellom plaggene, og fjerner nabo-sliver i
overlappsonen ved FARGE (nabo-plaggene har distinkt kulør: nøytral grå frakk,
blådominant marine genser, varm brun flanell, nøytral svart bomber).

Kalibrert for ark-04 (4 herre-plagg). For nye profil-ark: juster CUTS til
tetthets-dalene (se col-density-analyse) og CLEANUPS til nabo-kulørene.

Avhenger av rembg-venvet (~/.venvs/rembg): PIL, numpy, scipy, rembg.
"""
import numpy as np, os, sys
from PIL import Image
from rembg import remove
from scipy import ndimage

RAW = "/home/espen/adventure-web-klesbutikk/public/assets/raw"
OUT = "/home/espen/adventure-web-klesbutikk/public/assets/raw/klar-profil"
PAD = 6

# Per-ark oppsett: filnavn -> (vertikale kutt-x, navn v->h, kulør-cleanups).
def navy_sliver(ca):   # blådominant (marine genser lekker inn i grå frakk)
    R, G, B = (ca[:, :, k].astype(int) for k in range(3))
    return (B - np.maximum(R, G) > 14) & (ca[:, :, 3] > 40)
def warm_sliver(ca):   # rød>blå varm (brun flanell lekker inn i marine genser)
    R, G, B = (ca[:, :, k].astype(int) for k in range(3))
    return (R - B > 5) & (ca[:, :, 3] > 40)

ARKS = {
    "klar-profil-ark-04-raw.png": {
        "cuts": [0, 224, 362, 492, None],   # None = bildebredden
        "names": ["frakk-morkgraa", "strikkegenser-marine", "flanellskjorte-brun", "bomberjakke-svart"],
        "cleanups": {"frakk-morkgraa": navy_sliver, "strikkegenser-marine": warm_sliver},
    },
}


def split(fname, cfg):
    src = os.path.join(RAW, fname)
    cut = remove(Image.open(src).convert("RGBA"))
    arr = np.array(cut); H, W = arr.shape[:2]
    cuts = [c if c is not None else W for c in cfg["cuts"]]
    os.makedirs(OUT, exist_ok=True)
    for i, name in enumerate(cfg["names"]):
        x0, x1 = cuts[i], cuts[i + 1]
        strip = arr[:, x0:x1].copy()
        clean = cfg.get("cleanups", {}).get(name)
        if clean is not None:
            strip[clean(strip)] = 0
        m = strip[:, :, 3] > 40
        lab, n = ndimage.label(m, structure=np.ones((3, 3)))
        if n > 1:  # dropp løsrevne nabo-slivre: behold største komponent
            sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
            keep = int(np.argmax(sizes)) + 1; strip[lab != keep] = 0; m = lab == keep
        ys, xs = np.where(m)
        if xs.size == 0:
            print(f"  ADVARSEL: tom stripe for {name}"); continue
        l = max(0, xs.min() - PAD); r = min(strip.shape[1], xs.max() + 1 + PAD)
        t = max(0, ys.min() - PAD); b = min(H, ys.max() + 1 + PAD)
        clip = Image.fromarray(strip[t:b, l:r], "RGBA")
        ca = np.array(clip); a = ca[:, :, 3]; semi = (a > 20) & (a < 230)
        halo = int((semi & (ca[:, :, 0] > 235) & (ca[:, :, 1] > 235) & (ca[:, :, 2] > 235)).sum())
        clip.save(os.path.join(OUT, f"{name}.png"))
        print(f"  {name:22s} {clip.size[0]:>4}x{clip.size[1]:<4} halo={halo} -> klar-profil/{name}.png")


def main():
    fname = sys.argv[1] if len(sys.argv) > 1 else "klar-profil-ark-04-raw.png"
    if fname not in ARKS:
        print(f"FEIL: ingen oppsett for '{fname}'. Legg til i ARKS.")
        sys.exit(1)
    print(f"rembg + strip-splitt: {fname}")
    split(fname, ARKS[fname])
    print("Ferdig. Verifiser hvert utklipp visuelt: ren alfa, ingen nabo-rest, ingen ✦.")


if __name__ == "__main__":
    main()
