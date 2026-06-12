#!/usr/bin/env python3
"""Diagnose storefront_cafe.png transparency + compare rembg models.
   Run as: rembg-venv-python _diagnose_storefront_alpha.py
"""
import sys, time
from pathlib import Path
from PIL import Image
import numpy as np

CAFE = Path("/home/espen/adventure-web/public/assets/storefronts/facade/storefront_cafe.png")
SRC = Path("/mnt/c/Users/espen/Documents/nano-banana-images/generated-2026-05-21T07-26-45-349Z-zgk3us.png")
OUT_DIR = Path("/home/espen/adventure-web/public/assets/raw")
TMP_DIR = Path("/tmp/rembg_compare")
TMP_DIR.mkdir(exist_ok=True)

def alpha_histogram(arr):
    """Bucket alpha values; return (transparent, semi, opaque) counts."""
    if arr.shape[-1] != 4:
        return None
    a = arr[..., 3]
    transp = int((a == 0).sum())
    opaque = int((a == 255).sum())
    semi = int(((a > 0) & (a < 255)).sum())
    return transp, semi, opaque, a.size

def bbox_stats(arr):
    """Return (x0,x1,y0,y1, bbox_w_pct, bbox_h_pct) for opaque region."""
    if arr.shape[-1] != 4: return None
    H, W = arr.shape[:2]
    a = arr[..., 3]
    opaque = a > 0
    if not opaque.any(): return None
    ys, xs = np.where(opaque)
    return xs.min(), xs.max(), ys.min(), ys.max(), \
           (xs.max()-xs.min()+1)/W*100, (ys.max()-ys.min()+1)/H*100

# ─────────── DIAGNOSE 1a: composite over magenta ───────────
print("=" * 70)
print("DIAGNOSE 1a — composite current cafe.png over magenta")
print("=" * 70)
cafe = Image.open(CAFE).convert("RGBA")
magenta = Image.new("RGB", cafe.size, (255, 0, 255))
magenta.paste(cafe, (0, 0), cafe)  # use cafe alpha as paste mask
alpha_check = OUT_DIR / "_alpha_check_cafe.png"
magenta.save(alpha_check, "PNG")
print(f"wrote {alpha_check}")
print("→ open this file. If you see MAGENTA around the facade, alpha is real.")
print("  If you see CHECKERBOARD, the checker pattern is baked into the RGB and")
print("  rembg failed to mask the background.")

# ─────────── DIAGNOSE 1b: alpha histogram ───────────
print("\n" + "=" * 70)
print("DIAGNOSE 1b — alpha histogram of current cafe.png")
print("=" * 70)
arr = np.array(cafe)
h = alpha_histogram(arr)
if h:
    transp, semi, opaque, total = h
    print(f"total pixels      : {total:,}")
    print(f"alpha == 0        : {transp:,}  ({transp/total*100:.2f}%)  fully transparent")
    print(f"alpha 1-254       : {semi:,}  ({semi/total*100:.2f}%)  semi-transparent (edge anti-aliasing)")
    print(f"alpha == 255      : {opaque:,}  ({opaque/total*100:.2f}%)  fully opaque")
    print("→ healthy rembg output: large transp + large opaque + small semi (1-5% on edges)")
    print(f"→ if transp = 0, rembg did nothing")
else:
    print("FAIL: image has no alpha channel")

# ─────────── DIAGNOSE 1c: model comparison ───────────
print("\n" + "=" * 70)
print("DIAGNOSE 1c — rembg model comparison on original 928x1152 source")
print("=" * 70)
print(f"source: {SRC}")
print(f"source size: {Image.open(SRC).size}, mode: {Image.open(SRC).mode}\n")

from rembg import remove, new_session

MODELS = ["u2net", "isnet-general-use", "birefnet-general"]
src_bytes = SRC.read_bytes()

for model in MODELS:
    out_path = TMP_DIR / f"cafe_{model}.png"
    print(f"  [{model}]", end="", flush=True)
    t0 = time.time()
    try:
        session = new_session(model)
        result_bytes = remove(src_bytes, session=session)
        out_path.write_bytes(result_bytes)
        elapsed = time.time() - t0
        result_arr = np.array(Image.open(out_path))
        h = alpha_histogram(result_arr)
        bb = bbox_stats(result_arr)
        if h and bb:
            transp_pct = h[0]/h[3]*100
            opaque_pct = h[2]/h[3]*100
            semi_pct = h[1]/h[3]*100
            x0, x1, y0, y1, bw, bh = bb
            print(f"  {elapsed:.1f}s  transp={transp_pct:.1f}% semi={semi_pct:.2f}% opaque={opaque_pct:.1f}%  bbox={bw:.1f}%w×{bh:.1f}%h")
        else:
            print(f"  {elapsed:.1f}s  (no alpha channel in output)")
    except Exception as e:
        elapsed = time.time() - t0
        print(f"  {elapsed:.1f}s  FAILED: {e}")

# Also dump each into raw/ for visual comparison
print(f"\nFor visual comparison, model outputs are at:")
for model in MODELS:
    out = TMP_DIR / f"cafe_{model}.png"
    dest = OUT_DIR / f"_alpha_test_cafe_{model}.png"
    if out.exists():
        import shutil
        shutil.copy(out, dest)
        print(f"  {dest}")

print("\nDone.")
