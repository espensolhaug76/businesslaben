#!/bin/bash
# generate-asset.sh — compose the nano-banana prompt for a single asset.
#
# This script does NOT call any image-generation API. It only reads
# docs/ASSET_PROMPTS.json, assembles the full prompt for the requested
# asset_id, and prints (1) the prompt and (2) the expected output filename.
# A slash-command (or a human) is responsible for actually invoking
# nano-banana with the prompt and running scripts/clean-asset.sh afterwards.
#
# Usage:
#   ./generate-asset.sh <asset_id>
#   ./generate-asset.sh bakery_kongsvinger
#
# Exit codes:
#   0  prompt written to stdout
#   1  bad usage / asset not found / JSON malformed

set -euo pipefail

ASSET_ID="${1:-}"

if [ -z "$ASSET_ID" ]; then
  echo "Usage: $0 <asset_id>" >&2
  echo "  e.g. $0 bakery_kongsvinger" >&2
  exit 1
fi

# Resolve repo root relative to this script so it works no matter where it is called from.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROMPTS_FILE="$REPO_ROOT/docs/ASSET_PROMPTS.json"
OUTPUT_NAME="${ASSET_ID}.png"

if [ ! -f "$PROMPTS_FILE" ]; then
  echo "❌ Prompts file not found: $PROMPTS_FILE" >&2
  exit 1
fi

# Compose the full prompt in Python (jq isn't guaranteed to be installed).
PROMPT="$(ASSET_ID="$ASSET_ID" PROMPTS_FILE="$PROMPTS_FILE" python3 - <<'PY'
import json, os, sys

asset_id = os.environ["ASSET_ID"]
path = os.environ["PROMPTS_FILE"]

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

if asset_id not in data:
    print(f"❌ asset_id '{asset_id}' not found in {path}", file=sys.stderr)
    sys.exit(1)

asset = data[asset_id]
meta = data.get("_meta", {})
defaults = data.get("_building_defaults", {})

base_style_modern = meta.get("base_style", "").strip()
base_style_legacy = meta.get("base_style_legacy", "").strip()
size_variants     = meta.get("size_variants", {})
render_override   = meta.get("render_override", "").strip()

building_type    = asset.get("building_type", "").strip()
size_variant_key = asset.get("size_variant", "").strip()
interior_hint    = asset.get("interior_hint", "").strip()
location         = asset.get("location_specific", "").strip()
style_variant    = asset.get("style_variant", "modern").strip().lower()

# Pick base style block based on style_variant ('modern' default; 'legacy' for heritage civic).
if style_variant == "legacy":
    base_style = base_style_legacy
    if not base_style:
        print("⚠️  style_variant='legacy' but _meta.base_style_legacy missing/empty — falling back to modern", file=sys.stderr)
        base_style = base_style_modern
else:
    if style_variant != "modern":
        print(f"⚠️  unknown style_variant '{style_variant}' — using modern", file=sys.stderr)
    base_style = base_style_modern

size_text = size_variants.get(size_variant_key, "").strip()
type_text = defaults.get(building_type, "").strip()

if not base_style:
    print("❌ no base_style available — both _meta.base_style and _meta.base_style_legacy are empty", file=sys.stderr)
    sys.exit(1)
if not type_text:
    print(f"⚠️  No _building_defaults entry for building_type '{building_type}' — proceeding without type-specific detail", file=sys.stderr)
if not size_text:
    print(f"⚠️  No size_variants entry for size_variant '{size_variant_key}' — proceeding without size detail", file=sys.stderr)
if not render_override:
    print("⚠️  _meta.render_override is missing/empty — prompt will lack the final-sentence anchor", file=sys.stderr)

parts = [base_style]
if size_text:       parts.append(size_text)
if type_text:       parts.append(type_text)
if interior_hint:   parts.append(f"Interior detail: {interior_hint}.")
if location:        parts.append(f"Location: {location}.")
if render_override: parts.append(render_override)

print(" ".join(parts))
PY
)"

# Re-emit the prompt and the planned output filename in a structure a
# downstream caller (the /asset slash-command) can parse trivially.
echo "===PROMPT==="
echo "$PROMPT"
echo "===OUTPUT_FILENAME==="
echo "$OUTPUT_NAME"
echo "===OUTPUT_PATH==="
echo "$REPO_ROOT/public/assets/raw/$OUTPUT_NAME"
echo "===END==="
