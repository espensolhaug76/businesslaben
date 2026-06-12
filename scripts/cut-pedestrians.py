#!/usr/bin/env python3
"""Klipp et sprite-ark (rader x kolonner) til nummererte enkelt-sprites.

Gjenbrukbart for alle galleri-ark (side/front/rygg/kommende): per celle
fjernes bakgrunnen med rembg, myk fotskygge klippes (lav-alpha), bbox-trim,
og hoyde-normalisering slik at alle figurer i ETT galleri har samme
pikselhoyde relativt til figurhoyden.

Bruk (i WSL):
  ~/.venvs/rembg/bin/python3 scripts/cut-pedestrians.py <ark.png> <ut-prefix> \
      [--rows 2] [--cols 6] [--height 256] [--outdir public/assets/city]

Eksempler:
  cut-pedestrians.py public/assets/city/pedestrians_sheet.png pedestrian_
  cut-pedestrians.py public/assets/city/pedestrians_front.png pedestrian_front_
  cut-pedestrians.py public/assets/city/pedestrians_back.png pedestrian_back_
"""
import argparse
import io
import os

from PIL import Image
from rembg import remove

# Myke skygge-/halopiksler under fottene har lav alpha etter rembg.
ALPHA_CUT = 130  # overstyres av --alpha

ap = argparse.ArgumentParser()
ap.add_argument('sheet', help='ark-PNG (rader x kolonner med figurer)')
ap.add_argument('prefix', help="filnavn-prefix, f.eks. 'pedestrian_front_'")
ap.add_argument('--rows', type=int, default=2)
ap.add_argument('--cols', type=int, default=6)
ap.add_argument('--height', type=int, default=256, help='normalisert hoyde px')
ap.add_argument('--start', type=int, default=1, help='forste figurnummer')
ap.add_argument('--smart', action='store_true',
                help='innholdsbasert kolonnesplitt: rembg pa hele raden, '
                     'splitt ved de (cols-1) bredeste alpha-gapene. Brede '
                     'figurer (par, vogn, rullator) beholder full bredde og '
                     'splittes ALDRI midt i — bruk for ark med gruppefigurer.')
ap.add_argument('--alpha', type=int, default=130, help='alpha-terskel for skyggekutt')
ap.add_argument('--outdir', default='/home/espen/adventure-web/public/assets/city')
args = ap.parse_args()

sheet = Image.open(args.sheet).convert('RGBA')
W, H = sheet.size
ch = H / args.rows


def finish(fig_img, n):
    a = fig_img.getchannel('A').point(lambda v: 0 if v < args.alpha else v)
    fig_img.putalpha(a)
    box = a.getbbox()
    if not box:
        print(f'figur {n}: TOM — hoppet over')
        return
    fig = fig_img.crop(box)
    scale = args.height / fig.height
    fig = fig.resize((max(1, round(fig.width * scale)), args.height), Image.LANCZOS)
    out = os.path.join(args.outdir, f'{args.prefix}{n:02d}.png')
    fig.save(out)
    print(f'{args.prefix}{n:02d}.png  {fig.width}x{fig.height}')


def rembg_img(img):
    buf = io.BytesIO()
    img.save(buf, 'PNG')
    return Image.open(io.BytesIO(remove(buf.getvalue()))).convert('RGBA')


n = args.start
for r in range(args.rows):
    strip_box = (0, round(r * ch), W, round((r + 1) * ch))
    if not args.smart:
        cw = W / args.cols
        for c in range(args.cols):
            cell = sheet.crop((round(c * cw), strip_box[1], round((c + 1) * cw), strip_box[3]))
            finish(rembg_img(cell), n)
            n += 1
        continue

    # --smart: rembg hele rad-stripa, finn kolonne-gap i alpha-profilen og
    # splitt ved de (cols-1) BREDESTE gapene ⇒ nøyaktig `cols` figurer per
    # rad uansett figurbredde; par/vogn/følge forblir én sprite.
    # NB: gap-PROFILEN bruker alltid streng terskel (130) så halo-piksler
    # ikke tetter gapene — --alpha styrer kun fyll/skyggekutt i finish().
    strip = rembg_img(sheet.crop(strip_box))
    a = strip.getchannel('A').point(lambda v: 255 if v >= 130 else 0)
    px = a.load()
    sw, sh = strip.size
    col_has = [any(px[x, y] for y in range(0, sh, 2)) for x in range(sw)]
    # Gap-runs (sammenhengende tomme kolonner), uten ark-kantene.
    gaps = []
    x = 0
    while x < sw:
        if not col_has[x]:
            start = x
            while x < sw and not col_has[x]:
                x += 1
            if start > 0 and x < sw:
                gaps.append((x - start, (start + x) // 2))
        else:
            x += 1
    gaps.sort(reverse=True)
    cuts = sorted(c for _, c in gaps[:args.cols - 1])
    if len(cuts) < args.cols - 1:
        print(f'rad {r}: fant bare {len(cuts) + 1} figurer (forventet {args.cols})')
    edges = [0] + cuts + [sw]
    for i in range(len(edges) - 1):
        finish(strip.crop((edges[i], 0, edges[i + 1], sh)), n)
        n += 1

print('ferdig')
