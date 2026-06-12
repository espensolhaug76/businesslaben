#!/bin/bash
# Compose all 14 v2 prompts and dump them into /tmp/v2_prompts/<id>.txt
set -euo pipefail
ROOT=/home/espen/adventure-web
mkdir -p /tmp/v2_prompts
ASSETS=(bakery_kongsvinger brannstasjon cafe fashion_shop gym hair_salon jernbanestasjon kirke politi radhus sentrum_vgs sports_shop tech_shop bibliotek)
for a in "${ASSETS[@]}"; do
  RAW=$(bash "$ROOT/scripts/generate-asset.sh" "$a")
  # Extract everything between ===PROMPT=== and ===OUTPUT_FILENAME===
  echo "$RAW" | sed -n '/===PROMPT===/,/===OUTPUT_FILENAME===/p' | sed '1d;$d' > "/tmp/v2_prompts/$a.txt"
  echo "$a -> $(wc -c < /tmp/v2_prompts/$a.txt) bytes"
done
