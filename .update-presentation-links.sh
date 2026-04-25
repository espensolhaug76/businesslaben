#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

# Add presentationLink prop to each ML1 module by inserting after the `phases={phases}` line.
# Mapping: module file → presentation route.

declare -A LINKS=(
  ["src/screens/learninghub/ml1/MarkedsforingFagModule.tsx"]="/learning/presentations/ml1/markedsforing-fag|Markedsføring som fag og tankesett — 10 slides"
  ["src/screens/learninghub/ml1/MarkederModule.tsx"]="/learning/presentations/ml1/markeder|Markeder — B2C, B2B, offentlig og internasjonalt"
  ["src/screens/learninghub/ml1/ForbrukeratferdModule.tsx"]="/learning/presentations/ml1/forbrukeratferd|Psykologi og kjøpsatferd — 10 slides"
  ["src/screens/learninghub/ml1/ProfesjonelleMarkederModule.tsx"]="/learning/presentations/ml1/profesjonelle-markeder|Profesjonelle markeder — B2B, DMU og anbud"
  ["src/screens/learninghub/ml1/SituasjonsanalyseModule.tsx"]="/learning/presentations/ml1/situasjonsanalyse|Markedsinformasjon og MIS — 10 slides"
  ["src/screens/learninghub/ml1/StpModule.tsx"]="/learning/presentations/ml1/stp|STP-prosessen — segmentering, målgruppe og posisjonering"
  ["src/screens/learninghub/ml1/ProduktstrategiModule.tsx"]="/learning/presentations/ml1/produktstrategi|Produktet som konkurransemiddel — 10 slides"
  ["src/screens/learninghub/ml1/PrisstrategiMl1Module.tsx"]="/learning/presentations/ml1/prisstrategi|Pris som konkurransemiddel — 10 slides"
  ["src/screens/learninghub/ml1/DistribusjonsstrategiModule.tsx"]="/learning/presentations/ml1/distribusjonsstrategi|Distribusjon som konkurransemiddel — 10 slides"
  ["src/screens/learninghub/ml1/MarkedskommunikasjonModule.tsx"]="/learning/presentations/ml1/markedskommunikasjon|Markedskommunikasjon — 10 slides"
  ["src/screens/learninghub/ml1/SalgPersonligKommunikasjonModule.tsx"]="/learning/presentations/ml1/salg-personlig-kommunikasjon|Salg og personlig kommunikasjon — 10 slides"
  ["src/screens/learninghub/ml1/ReklameMedieplanleggingModule.tsx"]="/learning/presentations/ml1/reklame-medieplanlegging|Reklame og medieplanlegging — 10 slides"
  ["src/screens/learninghub/ml1/DirekteMarkedsforingInternettModule.tsx"]="/learning/presentations/ml1/direkte-markedsforing-internett|Direkte markedsføring og internett — 10 slides"
  ["src/screens/learninghub/ml1/MarkedsforingsLovverkEtikkModule.tsx"]="/learning/presentations/ml1/markedsforings-lovverk-etikk|Markedsføringens lovverk og etikk — 10 slides"
  ["src/screens/learninghub/ml1/OrganiseringMarkedsforingModule.tsx"]="/learning/presentations/ml1/organisering-markedsforing|Organisering av markedsføringen — 10 slides"
)

for file in "${!LINKS[@]}"; do
  IFS='|' read -r route description <<< "${LINKS[$file]}"
  if grep -q "presentationLink=" "$file"; then
    # Already has a link — replace its route + description
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
    # No link yet — insert before the last `/>` of <DrawerModule …/>
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
