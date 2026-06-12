#!/usr/bin/env python3
"""Trim transparent padding from all PNGs in public/assets/raw/.

rembg leaves a transparent margin around the building (the original canvas
border). CityScene anchors sprites bottom-center on the plot centroid, so
any transparent rows below the walls make the building float above its
plot. This crops every asset to its alpha bounding box, in place.

Run inside WSL with the rembg venv (has Pillow):
  ~/.venvs/rembg/bin/python3 scripts/trim-assets.py [--dry-run]
"""
import os
import sys

from PIL import Image

RAW = '/home/espen/adventure-web/public/assets/raw'
# Alpha threshold: rembg leaves faint halo pixels (alpha 1-8) far outside
# the building; treating them as solid would defeat the trim.
THRESH = 8

dry = '--dry-run' in sys.argv
trimmed = skipped = 0
for fn in sorted(os.listdir(RAW)):
    if not fn.endswith('.png'):
        continue
    path = os.path.join(RAW, fn)
    im = Image.open(path).convert('RGBA')
    mask = im.getchannel('A').point(lambda v: 255 if v > THRESH else 0)
    box = mask.getbbox()
    if box is None:
        print(f'EMPTY (skipped): {fn}')
        skipped += 1
        continue
    w, h = im.size
    if box == (0, 0, w, h):
        skipped += 1
        continue
    if not dry:
        im.crop(box).save(path)
    nw, nh = box[2] - box[0], box[3] - box[1]
    print(f'trim {fn}: {w}x{h} -> {nw}x{nh} '
          f'(bottom pad was {h - box[3]}px)')
    trimmed += 1

print(f'\n{trimmed} trimmed, {skipped} already tight')
