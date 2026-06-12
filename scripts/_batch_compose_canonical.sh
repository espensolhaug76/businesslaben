#!/bin/bash
set -euo pipefail
ROOT=/home/espen/adventure-web
mkdir -p /tmp/canonical_prompts
ASSETS=(sykehuset radhusteateret kongsbadet esso peders)
for a in "${ASSETS[@]}"; do
  RAW=$(bash "$ROOT/scripts/generate-asset.sh" "$a")
  echo "$RAW" | sed -n '/===PROMPT===/,/===OUTPUT_FILENAME===/p' | sed '1d;$d' > "/tmp/canonical_prompts/$a.txt"
  echo "$a -> $(wc -c < /tmp/canonical_prompts/$a.txt) bytes"
done
