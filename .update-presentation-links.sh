#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

declare -A LINKS=(
  ["src/screens/learninghub/ent1/InnovatorenOgEntreprenorenModule.tsx"]="/learning/presentations/ent1/innovatoren-og-entreprenoren|Innovatøren og entreprenøren — 10 slides"
  ["src/screens/learninghub/ent1/KreativitetIdeutviklingModule.tsx"]="/learning/presentations/ent1/kreativitet-ideutvikling|Kreativitet og idéutvikling — 10 slides"
  ["src/screens/learninghub/ent1/BehovMarkedSegmenteringModule.tsx"]="/learning/presentations/ent1/behov-marked-segmentering|Behov, marked og segmentering — 10 slides"
  ["src/screens/learninghub/ent1/ForretningsmodellBmcModule.tsx"]="/learning/presentations/ent1/forretningsmodell-bmc|Forretningsmodellen (BMC) — 10 slides"
  ["src/screens/learninghub/ent1/EtableringSelskapsformerModule.tsx"]="/learning/presentations/ent1/etablering-selskapsformer|Etablering og selskapsformer — 10 slides"
  ["src/screens/learninghub/ent1/FinansieringTilskuddModule.tsx"]="/learning/presentations/ent1/finansiering-tilskudd|Finansiering og tilskudd — 10 slides"
  ["src/screens/learninghub/ent1/OkonomiskPlanleggingBudsjettModule.tsx"]="/learning/presentations/ent1/okonomisk-planlegging-budsjett|Økonomisk planlegging og budsjett — 10 slides"
  ["src/screens/learninghub/ent1/MarkedsforingSalgNystartedeModule.tsx"]="/learning/presentations/ent1/markedsforing-salg-nystartede|Markedsføring og salg for nystartede — 10 slides"
  ["src/screens/learninghub/ent1/LovverkAvtalerHmsModule.tsx"]="/learning/presentations/ent1/lovverk-avtaler-hms|Lovverk, avtaler og HMS — 10 slides"
  ["src/screens/learninghub/ent1/SamarbeidTeambyggingModule.tsx"]="/learning/presentations/ent1/samarbeid-teambygging|Samarbeid og teambygging — 10 slides"
)

for file in "${!LINKS[@]}"; do
  IFS='|' read -r route description <<< "${LINKS[$file]}"
  if grep -q "presentationLink=" "$file"; then
    python3 - "$file" "$route" "$description" <<'PY'
import re, sys
fp, route, desc = sys.argv[1], sys.argv[2], sys.argv[3]
src = open(fp).read()
new_link = f"presentationLink={{{{ route: '{route}', description: '{desc}' }}}}"
src2 = re.sub(r"presentationLink=\{\{[^}]*\}\}", new_link, src, count=1)
if src2 == src:
    print(f"  ! no change in {fp}", file=sys.stderr)
else:
    open(fp, 'w').write(src2)
    print(f"  ~ {fp}")
PY
  else
    python3 - "$file" "$route" "$description" <<'PY'
import re, sys
fp, route, desc = sys.argv[1], sys.argv[2], sys.argv[3]
src = open(fp).read()
new_attr = f"      presentationLink={{{{ route: '{route}', description: '{desc}' }}}}\n    />"
src2 = re.sub(r"\s*/>\s*\n\s*\)\s*;?\s*\}\s*\n?\s*$", "\n" + new_attr + "\n  );\n}\n", src, count=1)
if src2 == src:
    print(f"  ! no change in {fp}", file=sys.stderr)
else:
    open(fp, 'w').write(src2)
    print(f"  + {fp}")
PY
  fi
done
echo DONE
