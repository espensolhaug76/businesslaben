#!/usr/bin/env python3
"""
Fjern ✦-vannmerket (sølv-stjernen, nederst h.) fra en scene-/papir-asset med en
KLON-ASSISTERT fyll: (1) detekter stjerne-masken (nøytralt sølv som skiller seg
fra underlaget), (2) diffusjons-inpaint (harmonisk fyll som matcher lys-/
gradient-kanten rundt masken — bedre enn flat flis-klon på et underlag med
lysgradient), (3) klon fin KORN-tekstur fra en ren underlags-flate over fyllet så
grynet i papir/tre bevares. Verifiserer med pikseldiff at KUN hjørneboksen endres
(samme prinsipp som kassevy-dewatermarkingen).

Bruk (venv m/ Pillow, numpy, scipy):
  python scripts/dewatermark-scene.py <inn.png> <ut.png> \
     --region x0 y0 x1 y1   # søkeområde for stjernen
     --lum LO HI            # stjerne-luminans-vindu på underlaget
     --neutral RB RG        # |R-B|<RB og |R-G|<RG (sølv = nøytralt)
     --grain x0 y0 x1 y1    # ren underlags-rekt for korn-tekstur
     --dilate D             # utvid masken (default 4)  --iters N (default 600)
"""
import argparse, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('inn'); ap.add_argument('ut')
    ap.add_argument('--region', type=int, nargs=4, required=True)
    ap.add_argument('--lum', type=float, nargs=2, required=True)
    ap.add_argument('--neutral', type=int, nargs=2, default=[26, 20])
    ap.add_argument('--grain', type=int, nargs=4, required=True)
    ap.add_argument('--dilate', type=int, default=4)
    ap.add_argument('--iters', type=int, default=600)
    a = ap.parse_args()

    im = Image.open(a.inn).convert('RGBA')
    arr = np.asarray(im).astype(float)
    px = arr[..., :3]; h, w = px.shape[:2]
    R, G, B = px[..., 0], px[..., 1], px[..., 2]; lum = px.mean(2)
    ys, xs = np.mgrid[0:h, 0:w]
    x0, y0, x1, y1 = a.region
    reg = (xs >= x0) & (xs < x1) & (ys >= y0) & (ys < y1)
    neutral = (np.abs(R - B) < a.neutral[0]) & (np.abs(R - G) < a.neutral[1])
    cand = neutral & (lum > a.lum[0]) & (lum < a.lum[1]) & reg
    lbl, n = ndimage.label(cand)
    if n == 0:
        print('FEIL: fant ingen stjerne i regionen', file=sys.stderr); sys.exit(1)
    star = lbl == (int(np.argmax(ndimage.sum(cand, lbl, range(1, n + 1)))) + 1)
    star = ndimage.binary_closing(star, iterations=3)
    star = ndimage.binary_dilation(star, iterations=a.dilate)
    m = star
    my, mx = np.where(m)
    print(f'stjerne-maske bboks x[{mx.min()},{mx.max()}] y[{my.min()},{my.max()}]  {m.sum()} px')

    # (2) diffusjons-inpaint per kanal
    out = px.copy()
    seed = out[~m & reg].mean(0) if (~m & reg).any() else out.reshape(-1, 3).mean(0)
    for c in range(3):
        ch = out[..., c].copy(); ch[m] = seed[c]
        for _ in range(a.iters):
            avg = (np.roll(ch, 1, 0) + np.roll(ch, -1, 0) + np.roll(ch, 1, 1) + np.roll(ch, -1, 1)) / 4.0
            ch[m] = avg[m]
        out[..., c] = ch

    # (3) klon korn (høyfrekvens) fra ren underlags-rekt
    gx0, gy0, gx1, gy1 = a.grain
    gsrc = px[gy0:gy1, gx0:gx1].mean(2)
    low = np.asarray(Image.fromarray(gsrc.astype(np.uint8)).filter(ImageFilter.GaussianBlur(4))).astype(float)
    grain = gsrc - low
    by0, by1, bx0, bx1 = my.min(), my.max(), mx.min(), mx.max()
    gt = np.resize(grain, (by1 - by0 + 1, bx1 - bx0 + 1))
    sm = m[by0:by1 + 1, bx0:bx1 + 1]
    for c in range(3):
        sub = out[by0:by1 + 1, bx0:bx1 + 1, c]
        sub[sm] = np.clip(sub[sm] + gt[sm], 0, 255)
        out[by0:by1 + 1, bx0:bx1 + 1, c] = sub

    res = arr.copy(); res[..., :3] = out
    Image.fromarray(res.astype(np.uint8), 'RGBA').save(a.ut)

    diff = np.abs(res[..., :3] - arr[..., :3]).sum(2) > 0.5
    dy, dx = np.where(diff)
    print(f'ENDRET bboks x[{dx.min()},{dx.max()}] y[{dy.min()},{dy.max()}]  {diff.sum()} px endret')
    dimg = np.zeros((h, w, 3), np.uint8); dimg[diff] = (255, 0, 255)
    Image.fromarray(dimg).save(a.ut.rsplit('.', 1)[0] + '.diff.png')
    print('skrev', a.ut, '+ diff')


if __name__ == '__main__':
    main()
