#!/bin/bash
# One-shot backup of 14 v2 PNGs to _v2_legacy/ before regeneration.
set -euo pipefail
RAW=/home/espen/adventure-web/public/assets/raw
mkdir -p "$RAW/_v2_legacy"
cd "$RAW"
ASSETS=(bakery_kongsvinger brannstasjon cafe fashion_shop gym hair_salon jernbanestasjon kirke politi radhus sentrum_vgs sports_shop tech_shop bibliotek)
for a in "${ASSETS[@]}"; do
  if [ -f "$a.png" ]; then
    cp "$a.png" "_v2_legacy/$a.png"
    echo "OK $a.png"
  else
    echo "MISS $a.png"
  fi
done
echo "---"
ls _v2_legacy/ | wc -l
