#!/bin/bash
# Single-file background removal using rembg
# Usage: ./clean-asset.sh <input.png> [output_name.png]

set -e

INPUT="$1"
OUTPUT_NAME="${2:-$(basename "$INPUT")}"
OUTPUT_DIR="/home/espen/adventure-web/public/assets/raw"
OUTPUT="$OUTPUT_DIR/$OUTPUT_NAME"

if [ -z "$INPUT" ]; then
  echo "Usage: $0 <input.png> [output_name.png]"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "❌ Input file not found: $INPUT"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

SIZE_BEFORE=$(stat -c%s "$INPUT")
echo "🎨 Processing: $INPUT ($SIZE_BEFORE bytes)"

# Hardcoded absolute path so this works regardless of $HOME / shell config.
REMBG_VENV="/home/espen/.venvs/rembg/bin/activate"
if [ ! -f "$REMBG_VENV" ]; then
  echo "❌ rembg venv not found at $REMBG_VENV" >&2
  echo "   Create it with: python3 -m venv ~/.venvs/rembg && ~/.venvs/rembg/bin/pip install rembg" >&2
  exit 1
fi
source "$REMBG_VENV"
rembg i "$INPUT" "$OUTPUT"
deactivate

SIZE_AFTER=$(stat -c%s "$OUTPUT")
echo "✅ Saved: $OUTPUT ($SIZE_AFTER bytes)"
