#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

declare -A LINKS=(
  ["src/screens/learninghub/ml2/StrategiskPlanleggingModule.tsx"]="/learning/presentations/ml2/strategisk-planlegging|Strategisk planlegging — 10 slides"
  ["src/screens/learninghub/ml2/VisjonOgMalModule.tsx"]="/learning/presentations/ml2/visjon-og-mal|Visjon og mål — 10 slides"
  ["src/screens/learninghub/ml2/MarkedsOgBransjeanalyseModule.tsx"]="/learning/presentations/ml2/markeds-og-bransjeanalyse|Markeds- og bransjeanalyse — 10 slides"
  ["src/screens/learninghub/ml2/LederensRolleModule.tsx"]="/learning/presentations/ml2/lederens-rolle|Lederens rolle — 10 slides"
  ["src/screens/learninghub/ml2/SamfunnsansvarBaerekraftOmdommeModule.tsx"]="/learning/presentations/ml2/samfunnsansvar-baerekraft-omdomme|Samfunnsansvar, bærekraft og omdømme — 10 slides"
  ["src/screens/learninghub/ml2/EtikkIMarkedsforingenModule.tsx"]="/learning/presentations/ml2/etikk-i-markedsforingen|Etikk i markedsføringen — 10 slides"
  ["src/screens/learninghub/ml2/MerkevarestrategiModule.tsx"]="/learning/presentations/ml2/merkevarestrategi|Merkevarestrategi — 10 slides"
  ["src/screens/learninghub/ml2/ProduktstrategiAvansertModule.tsx"]="/learning/presentations/ml2/produktstrategi-avansert|Produktstrategi (avansert) — 10 slides"
  ["src/screens/learninghub/ml2/PrisstrategiAvansertModule.tsx"]="/learning/presentations/ml2/prisstrategi-avansert|Prisstrategier (avansert) — 10 slides"
  ["src/screens/learninghub/ml2/DistribusjonsstrategiAvansertModule.tsx"]="/learning/presentations/ml2/distribusjonsstrategi-avansert|Distribusjonsstrategier (avansert) — 10 slides"
  ["src/screens/learninghub/ml2/KommunikasjonsstrategierModule.tsx"]="/learning/presentations/ml2/kommunikasjonsstrategier|Kommunikasjonsstrategier — 10 slides"
  ["src/screens/learninghub/ml2/MarkedsmiksOgEffektmalingModule.tsx"]="/learning/presentations/ml2/markedsmiks-og-effektmaling|Markedsmiks og effektmåling — 10 slides"
  ["src/screens/learninghub/ml2/OrganiseringOgLedelseStrategiskModule.tsx"]="/learning/presentations/ml2/organisering-og-ledelse-strategisk|Organisering og ledelse (strategisk) — 10 slides"
  ["src/screens/learninghub/ml2/PersonaladministrasjonHRMModule.tsx"]="/learning/presentations/ml2/personaladministrasjon-hrm|Personaladministrasjon og HRM — 10 slides"
  ["src/screens/learninghub/ml2/InternasjonalMarkedsforingModule.tsx"]="/learning/presentations/ml2/internasjonal-markedsforing|Internasjonal markedsføring — 10 slides"
  ["src/screens/learninghub/ml2/OkonomistyringKalkulasjonBudsjetteringModule.tsx"]="/learning/presentations/ml2/okonomistyring-kalkulasjon-budsjettering|Økonomistyring, kalkulasjon og budsjettering — 10 slides"
  ["src/screens/learninghub/ml2/MarkedsplanenModule.tsx"]="/learning/presentations/ml2/markedsplanen|Markedsplanen — 10 slides"
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
