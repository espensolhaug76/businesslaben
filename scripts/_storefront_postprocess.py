#!/usr/bin/env python3
"""Post-process a freshly-rembg'd storefront facade:
   1. Resize to exact 1024x1280 (spec dimension), preserving aspect via bilinear upscale.
   2. Validate against §9 checklist (programmatic checks only — visual checks reported separately).
   3. Print results.
   Usage: _storefront_postprocess.py <input.png> <output.png>
"""
import sys
from PIL import Image
import numpy as np

if len(sys.argv) != 3:
    print("Usage: _storefront_postprocess.py <input.png> <output.png>")
    sys.exit(1)

src_path, out_path = sys.argv[1], sys.argv[2]

# 1. Resize to 1024x1280
SPEC_W, SPEC_H = 1024, 1280
im = Image.open(src_path)
src_w, src_h = im.size
print(f"source: {src_w}x{src_h} mode={im.mode}")

if (src_w, src_h) != (SPEC_W, SPEC_H):
    im = im.resize((SPEC_W, SPEC_H), Image.BILINEAR)
    print(f"resized to {SPEC_W}x{SPEC_H} via bilinear")

im.save(out_path, "PNG")
print(f"wrote {out_path}")

# 2. Validation
arr = np.array(im)
H, W = arr.shape[:2]
has_alpha = arr.shape[-1] == 4 if arr.ndim == 3 else False
print(f"\n=== Validation against §9 facade checklist ===")
print(f"dimensions: {W}x{H}  {'PASS' if (W,H)==(SPEC_W,SPEC_H) else 'FAIL'}  (spec: 1024x1280)")

if has_alpha:
    alpha = arr[..., 3]
    transp_pct = (alpha == 0).mean() * 100
    print(f"transparent background: alpha channel present, {transp_pct:.1f}% fully transparent pixels  PASS")
else:
    print(f"transparent background: NO alpha channel  FAIL")
    sys.exit(0)

opaque = alpha > 0
ys, xs = np.where(opaque)
if len(xs) == 0:
    print("no opaque pixels — empty image")
    sys.exit(0)

bbox_x0, bbox_x1 = xs.min(), xs.max()
bbox_y0, bbox_y1 = ys.min(), ys.max()
bbox_w_pct = (bbox_x1 - bbox_x0 + 1) / W * 100
bbox_h_pct = (bbox_y1 - bbox_y0 + 1) / H * 100
print(f"facade bbox: x={bbox_x0}-{bbox_x1} ({bbox_w_pct:.1f}% wide), y={bbox_y0}-{bbox_y1} ({bbox_h_pct:.1f}% tall)")
print(f"  fills ≥80% canvas width: {'PASS' if bbox_w_pct >= 80 else 'FAIL'}")
print(f"  bottom reaches near y=1280: {'PASS' if bbox_y1 >= 1280 - 40 else f'FAIL (bottom at y={bbox_y1})'}")

def opaque_ratio(x0, y0, w, h):
    """Fraction of pixels in the rectangle that are opaque."""
    x1, y1 = min(x0 + w, W), min(y0 + h, H)
    region = alpha[y0:y1, x0:x1]
    if region.size == 0: return 0.0
    return (region > 0).mean()

# Hotspot zone presence (per §9: zone must actually contain the relevant element)
sign_ratio = opaque_ratio(102, 256, 820, 256)
window_ratio = opaque_ratio(61, 640, 410, 480)
door_ratio = opaque_ratio(553, 608, 348, 544)
print(f"\nhotspot-zone opaque fill (should be HIGH = building present in zone):")
print(f"  sign  (x=102-922, y=256-512):  {sign_ratio*100:.1f}%  {'PASS' if sign_ratio > 0.5 else 'FAIL (zone mostly empty)'}")
print(f"  window(x=61-471, y=640-1120): {window_ratio*100:.1f}%  {'PASS' if window_ratio > 0.5 else 'FAIL'}")
print(f"  door  (x=553-901, y=608-1152): {door_ratio*100:.1f}%  {'PASS' if door_ratio > 0.5 else 'FAIL'}")

# Awning row check (y=512-608 must be plain facade wall, NOT awning-shaped)
# Heuristic: row should be roughly as opaque as the rows above/below it,
# meaning continuous facade wall. If row has dramatically more opacity than
# the sign band above, that might suggest an awning was rendered. Not a
# reliable check — flag for visual review.
awning_row_ratio = opaque_ratio(0, 512, W, 96)
sign_band_ratio = opaque_ratio(0, 256, W, 256)
print(f"\nawning-row analysis (visual check needed):")
print(f"  awning row (y=512-608) opaque fill: {awning_row_ratio*100:.1f}%")
print(f"  sign band  (y=256-512) opaque fill: {sign_band_ratio*100:.1f}%")
print(f"  (similar ratios suggest plain wall; large positive delta suggests awning was rendered)")

print(f"\n(Visual checks — perspective, lighting, watermark, sign text, people, cars, awning shape — must be confirmed by eye.)")
