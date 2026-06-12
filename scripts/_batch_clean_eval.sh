#!/bin/bash
# Clean the newest nano-banana PNG and eval it as <name>.png in raw/
# Usage: _batch_clean_eval.sh <asset_id>
set -euo pipefail
ASSET="${1:-}"
if [ -z "$ASSET" ]; then echo "Usage: $0 <asset_id>"; exit 1; fi
NEW=$(ls -t /mnt/c/Users/espen/Documents/nano-banana-images/*.png 2>/dev/null | head -1)
if [ -z "$NEW" ]; then echo "no NB output found"; exit 1; fi
bash /home/espen/adventure-web/scripts/clean-asset.sh "$NEW" "$ASSET.png" >/dev/null 2>&1
/home/espen/.venvs/rembg/bin/python3 - "$ASSET" <<'PY'
import sys
from PIL import Image
import numpy as np
asset = sys.argv[1]
p = f'/home/espen/adventure-web/public/assets/raw/{asset}.png'
im = np.array(Image.open(p))
H, W = im.shape[:2]
alpha = im[..., 3] > 0
ys, xs = np.where(alpha)
bbox_w = (xs.max() - xs.min() + 1) / W
bbox_h = (ys.max() - ys.min() + 1) / H
cx = xs.mean() / W
cy = ys.mean() / H
width_ok = 0.70 <= bbox_w <= 0.95
cx_ok = 0.45 <= cx <= 0.55
cy_ok = 0.45 <= cy <= 0.55
status = 'PASS' if (width_ok and cx_ok and cy_ok) else 'FAIL'
print(f'{asset}\t{W}x{H}\tw={bbox_w:.3f}\th={bbox_h:.3f}\tcx={cx:.3f}\tcy={cy:.3f}\t{status}')
PY
