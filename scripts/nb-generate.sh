#!/bin/bash
# nb-generate.sh — call the Gemini image model ("nano-banana") DIRECTLY over
# HTTP and write the resulting PNG into public/assets/raw/.
#
# Unlike generate-asset.sh (which only *composes* a prompt for the MCP path),
# this script actually invokes the API using $GEMINI_API_KEY. It is the
# no-MCP fallback: prompt (+ optional reference image[s]) in → PNG out.
#
# The raw PNG still needs background removal afterwards; run
# scripts/clean-asset.sh on the output to get a transparent asset.
#
# Usage:
#   ./nb-generate.sh <output_name> "<prompt>" [reference_image ...]
#
#   <output_name>      target filename; ".png" appended if missing.
#                      Written to public/assets/raw/<output_name>.
#   "<prompt>"         the generation prompt (quote it).
#   [reference_image]  zero or more local image files fed in as visual
#                      references (png/jpg/jpeg/webp).
#
# Examples:
#   ./nb-generate.sh test_swatch "a solid pure white square on white, PNG"
#   ./nb-generate.sh bakery_v2 "$(cat prompt.txt)" refs/bakery_ref.png
#
# Environment:
#   GEMINI_API_KEY   required. If unset here, note it is exported from
#                    ~/.bashrc — a non-interactive shell may not have sourced
#                    it, so `source ~/.bashrc` or pass it inline.
#   NB_MODEL         override the model (default: gemini-3.1-flash-image).
#                    Keep it on a *flash* tier — Pro image tiers bill heavily
#                    (see scripts/README.md "Hard requirements").
#
# Exit codes:
#   0  PNG written
#   1  bad usage / missing key / file not found
#   2  API access failed (403 / permission / quota) — caller should fall back
#      to a manual NB generation (see docs report).
#   3  API responded but returned no image (safety block / empty candidate).

set -euo pipefail

OUTPUT_NAME="${1:-}"
PROMPT="${2:-}"

if [ -z "$OUTPUT_NAME" ] || [ -z "$PROMPT" ]; then
  echo "Usage: $0 <output_name> \"<prompt>\" [reference_image ...]" >&2
  exit 1
fi
shift 2
REFERENCES=("$@")

if [ -z "${GEMINI_API_KEY:-}" ]; then
  echo "❌ GEMINI_API_KEY is not set." >&2
  echo "   It is exported from ~/.bashrc — this shell may not have sourced it." >&2
  echo "   Try:  source ~/.bashrc  (or export GEMINI_API_KEY=... inline)" >&2
  exit 1
fi

# Verify reference files exist before spending an API call.
for ref in "${REFERENCES[@]}"; do
  if [ ! -f "$ref" ]; then
    echo "❌ Reference image not found: $ref" >&2
    exit 1
  fi
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RAW_DIR="$REPO_ROOT/public/assets/raw"
mkdir -p "$RAW_DIR"

# Normalise output filename → always .png
case "$OUTPUT_NAME" in
  *.png) ;;
  *) OUTPUT_NAME="${OUTPUT_NAME}.png" ;;
esac
OUTPUT_PATH="$RAW_DIR/$OUTPUT_NAME"

MODEL="${NB_MODEL:-gemini-3.1-flash-image}"

echo "🍌 model=$MODEL  refs=${#REFERENCES[@]}  →  public/assets/raw/$OUTPUT_NAME" >&2

# All HTTP + base64 + JSON handling lives in Python (stdlib only — no jq,
# no requests). The bash layer above is just validation and ergonomics.
NB_MODEL="$MODEL" \
NB_PROMPT="$PROMPT" \
NB_OUTPUT="$OUTPUT_PATH" \
NB_REFS="$(printf '%s\n' "${REFERENCES[@]}")" \
python3 - <<'PY'
import base64, json, mimetypes, os, sys, urllib.error, urllib.request

model  = os.environ["NB_MODEL"]
prompt = os.environ["NB_PROMPT"]
output = os.environ["NB_OUTPUT"]
key    = os.environ["GEMINI_API_KEY"]
refs   = [r for r in os.environ.get("NB_REFS", "").splitlines() if r.strip()]

parts = [{"text": prompt}]
for ref in refs:
    mime = mimetypes.guess_type(ref)[0] or "image/png"
    with open(ref, "rb") as fh:
        parts.append({
            "inlineData": {
                "mimeType": mime,
                "data": base64.b64encode(fh.read()).decode("ascii"),
            }
        })

body = {
    "contents": [{"role": "user", "parts": parts}],
    "generationConfig": {"responseModalities": ["IMAGE"]},
}

url = ("https://generativelanguage.googleapis.com/v1beta/"
       f"models/{model}:generateContent?key={key}")
req = urllib.request.Request(
    url,
    data=json.dumps(body).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST",
)

try:
    with urllib.request.urlopen(req, timeout=180) as resp:
        payload = json.load(resp)
except urllib.error.HTTPError as e:
    detail = e.read().decode("utf-8", "replace")
    print(f"❌ HTTP {e.code} from Gemini API:", file=sys.stderr)
    print(detail[:1500], file=sys.stderr)
    # 403 = permission denied, 429 = quota/rate — both mean "fall back".
    sys.exit(2 if e.code in (401, 403, 429) else 3)
except urllib.error.URLError as e:
    print(f"❌ Network error reaching Gemini API: {e.reason}", file=sys.stderr)
    sys.exit(2)

# Extract the first inlineData image part from the first candidate.
candidates = payload.get("candidates", [])
img_b64 = None
for cand in candidates:
    for part in cand.get("content", {}).get("parts", []):
        inline = part.get("inlineData") or part.get("inline_data")
        if inline and inline.get("data"):
            img_b64 = inline["data"]
            break
    if img_b64:
        break

if not img_b64:
    reason = ""
    if candidates:
        reason = candidates[0].get("finishReason", "")
    block = payload.get("promptFeedback", {}).get("blockReason", "")
    print("❌ API responded but returned no image.", file=sys.stderr)
    if reason: print(f"   finishReason: {reason}", file=sys.stderr)
    if block:  print(f"   blockReason:  {block}", file=sys.stderr)
    print(json.dumps(payload)[:1000], file=sys.stderr)
    sys.exit(3)

with open(output, "wb") as fh:
    fh.write(base64.b64decode(img_b64))

print(f"✅ wrote {output}")
PY

echo "===OUTPUT_PATH===" >&2
echo "$OUTPUT_PATH"
