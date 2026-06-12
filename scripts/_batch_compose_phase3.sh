#!/bin/bash
# Compose Phase 3 NPC prompts and dump to /tmp/phase3_prompts/<id>.txt
set -euo pipefail
ROOT=/home/espen/adventure-web
mkdir -p /tmp/phase3_prompts
ASSETS=(kiwi coop_mega rema restaurant_modern fast_food brewpub bokhandel bank post florist optician legekontor dentist hotel cinema)
for a in "${ASSETS[@]}"; do
  RAW=$(bash "$ROOT/scripts/generate-asset.sh" "$a")
  echo "$RAW" | sed -n '/===PROMPT===/,/===OUTPUT_FILENAME===/p' | sed '1d;$d' > "/tmp/phase3_prompts/$a.txt"
  echo "$a -> $(wc -c < /tmp/phase3_prompts/$a.txt) bytes"
done
