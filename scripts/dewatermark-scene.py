#!/usr/bin/env python3
"""Fjern Gemini/nano-banana ✦-vannmerke fra scenebilder (jobb/klesbutikk).

Bildebehandling i SCRIPTLAGET (Pillow/numpy/scipy — kjøres i ~/.venvs/rembg).
IKKE beskjær bildet (beskjæring flytter all Espen-traced geometri) — kun et lite
hjørneområde endres, verifisert med pikseldiff (diff utenfor hjørneboksen = 0).

To metoder (velges per bilde etter bakgrunnen):
  • feathered_clone : kopier en fjæret ellipse fra et NABOOMRÅDE (samme x, forskjøvet
    y). Best på glatte flater / vertikale kanter (klonen bevarer en vertikal kant
    fordi kilden ligger rett over med samme x). Brukt på kassevy (søyle) + fasade
    (mursteinsokkel — repeterende tekstur).
  • diffuse_inpaint : Laplace/Jacobi-fyll av en maske fra kanten (glatt fyll).

Kjør:  ~/.venvs/rembg/bin/python scripts/dewatermark-scene.py
"""
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

RAW = 'public/assets/raw/'


def ellipse_mask(shape, cx, cy, rx, ry):
    H, W = shape
    yy, xx = np.ogrid[:H, :W]
    return (((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) <= 1.0


def feathered_clone(arr, cx, cy, rx, ry, dx, dy, feather=4.0, bounds=None):
    """Erstatt ellipse med en kopi forskjøvet (dy,dx), fjæret. `bounds`=(x0,y0,x1,y1)
    hardklipper alfa til 0 UTENFOR → endringen blir strengt lokal (pikseldiff)."""
    H, W = arr.shape[:2]
    m = ellipse_mask((H, W), cx, cy, rx, ry).astype(float)
    alpha = np.clip(gaussian_filter(m, feather), 0, 1)
    if bounds:
        x0, y0, x1, y1 = bounds
        clip = np.zeros_like(alpha); clip[y0:y1, x0:x1] = 1.0
        alpha = alpha * clip
    alpha = alpha[..., None]
    src = np.roll(arr, shift=(dy, dx), axis=(0, 1))
    return arr * (1 - alpha) + src * alpha


def process(fname, fn, box, name):
    im = Image.open(RAW + fname)
    arr = np.array(im.convert('RGB')).astype(np.float64)
    out_arr = fn(arr)
    out = Image.fromarray(np.clip(out_arr, 0, 255).astype(np.uint8), 'RGB')
    if im.mode == 'RGBA':
        out = out.convert('RGBA'); out.putalpha(im.getchannel('A'))
    # pikseldiff mot originalen FØR skriving
    orig = np.array(im.convert('RGB')).astype(np.int32)
    d = np.abs(orig - np.clip(out_arr, 0, 255).astype(np.int32)).sum(2)
    x0, y0, x1, y1 = box
    outside = d.copy(); outside[y0:y1, x0:x1] = 0
    print(f'[{name}] endret={int((d>0).sum())} px · UTENFOR {box}: {int((outside>0).sum())} (må være 0) · maks-delta i boks={int(d[y0:y1,x0:x1].max())}')
    out.save(RAW + fname)


if __name__ == '__main__':
    # kassevy — kremhvit søyle (glatt + vertikal hjørnekant) → klon rett ovenfra
    process('klesbutikk-kassevy.png',
            lambda a: feathered_clone(a, 1177, 709, 32, 28, dx=0, dy=54, feather=5.0, bounds=(1129, 665, 1225, 753)),
            (1129, 665, 1225, 753), 'kassevy')
    # fasade — mursteinsokkel/grus (tekstur) → klon rett ovenfra (murstein repeterer)
    process('klesbutikk-fasade.png',
            lambda a: feathered_clone(a, 1254, 648, 23, 20, dx=0, dy=52, feather=4.0, bounds=(1224, 617, 1286, 682)),
            (1224, 617, 1286, 682), 'fasade')
    # interior-mobler: ✦ allerede fjernet i tidligere jobb (rad-interpolasjon) — urørt.
    # kafeens interior-kasse.png (main) har ✦ (2 stk, bunn-h.) — EGEN JOBB PÅ MAIN.
