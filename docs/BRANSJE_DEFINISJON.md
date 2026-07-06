# Bransjedefinisjon (`IndustryDefinition`)

`src/game/data/industryDefinition.ts` samler ALT bransje-spesifikt ett sted:
katalog, eksponeringsflater, scenariepool, persona-budsjettmodell og
svinnregel. Målet: en NY bransje skal kunne legges til som **DATA + BILDER +
SCENARIER** — uten å røre motorene (`InteriorView`, `MonterScene`,
scenario-pool-valget, `personas.ts`, `CLOSE_DAY`).

I dag er **kun `CAFE` aktiv**. `KLESBUTIKK` er en tom/minimal stub (bevisst
IKKE registrert i `INDUSTRY_DEFINITIONS`) som beviser at typen kan bære en
annen bransje.

## Feltene i `IndustryDefinition`

| Felt | Hva det er |
|---|---|
| `id` | `Industry`-verdien (`'cafe'`, `'fashion'`, …) |
| `navn` / `emoji` / `beskrivelse` / `startingMoney` | Samme tekst/tall som `INDUSTRY_META` — ikke duplisert, kun referert |
| `katalog` | Varekatalogen (`IndustryCatalogItem[]`, samme som `INDUSTRY_CATALOG[id]`) |
| `flater.styling` | Vindusutstillingens sone (`zone`) — samme redigeringsmotor (`WindowDisplay.tsx`) for alle bransjer |
| `flater.lager` | Disk-monterens geometri: `sceneImage`, `trau` (soner), `trauCols(trauId)` (hvor mange varer side om side), og `speil` (samme, for interiør-scenens bakfra-speiling) |
| `ekstraFlater` | Flater utover styling/lager — kafeens «tavla» (drikkemeny), med en `matches()`-regel for hvilke varer som havner der |
| `scenariePool` | Scenario-id-er (se `sales/scenarios.ts`) bransjen trekker kunder fra |
| `personaBudsjett` | Budsjettmodell for persona-generering: `{kind:'besok', table}` (kafeens frekvens×kr-per-besøk) eller `{kind:'kategori', table, step}` (flat kr/mnd-tabell) |
| `svinnRegel` | `'ferskvare-daglig'` (kafé, implementert) eller `'sesong/kolleksjon'` (reservert, IKKE implementert) |

## Hvilke filer ble avhardkodet (DEL 2)

- **`industries.ts`** — `bakeryItem()` → `catalogItem()` (generisk navn, samme atferd).
- **`sales/scenarios.ts`** — ny `CAFE_SCENARIO_IDS` (eksplisitt liste, ikke utledet fra hele `SCENARIOS`), ny `scenariosForIndustry(ids)`, og `scenariosForMix(pool, mix)` tar nå en ALLEREDE bransje-filtrert pool i stedet for å anta hele `SCENARIOS` er kafeens.
- **`personas.ts`** — `cafeSpendFrom`/`budgetFromTable` er nå parameterisert på TABELL i stedet for å lese `CAFE_SPEND`/`FASHION_BUDGETS` som modul-konstanter direkte; `generatePersona` tar imot et valgfritt `personaBudsjett` (fra den kallende komponenten, se under) og bruker det når det finnes.
- **`city/MonterScene.tsx`** — `MONTER_TRAU`/trau-bildet leses fra `getActiveIndustryDefinition().flater.lager`; `trauCols()` er en tynn videreformidling til definisjonens regel.
- **`city/InteriorView.tsx`** — speil-trau, tavle-sonen og dagens kunde-pool leses fra `getActiveIndustryDefinition()` i stedet for faste import fra `districts.ts`/`scenarios.ts`.
- **`GameContext.tsx` (`CLOSE_DAY`)** — svinn-utregningen grenes nå på `getActiveIndustryDefinition().svinnRegel` i stedet for å anta ferskvare-regelen ubetinget.
- **`ui/DashboardOverlay.tsx`** — slår opp `getIndustryDefinitionFor(state.industry)?.personaBudsjett` og sender den inn i `generatePersona`.

### To ulike oppslagsfunksjoner — og hvorfor

- **`getActiveIndustryDefinition()`** — ingen parameter, returnerer ALLTID
  `CAFE`. Brukes av city-/interiør-/monter-motorene, fordi disse ALLEREDE i
  dag rendrer kafeens geometri uansett hvilken bransje spilleren valgte i
  StartupScreen (by-/interiør-/monter-bildene finnes kun for kafé) — en
  eksisterende ett-bransje-begrensning, ikke noe denne omleggingen innfører.
- **`getIndustryDefinitionFor(industry)`** — slår opp PER bransje, returnerer
  `undefined` for bransjer uten en definisjon (fashion/tech/sports i dag).
  Brukes av persona-generering, fordi budsjettet DER allerede varierte
  korrekt per valgt bransje FØR denne omleggingen — en «fall alltid tilbake
  til CAFE»-oppførsel her ville vært en reell atferdsendring for fashion.

## Hva en ny bransje (f.eks. en reell «bransje 2») må levere

1. **Data**: en `IndustryCatalogItem[]` (i `industries.ts`, gjenbruk
   `catalogItem()` for ferskvare/trau-varer), en `IndustryDefinition`-instans
   i `industryDefinition.ts`.
2. **Bilder**: et scenebilde for lager-flaten (`flater.lager.sceneImage`) og
   for speilingen i interiøret (`flater.lager.speil.sceneImage`), pluss
   kalibrerte trau-/speil-soner (samme mønster som `MONTER_TRAU`/
   `INTERIOR_MIRROR_TRAU` i `districts.ts`, kalibrert med `?dev=1`).
3. **Scenarier**: egne `SalesScenario`-er i `sales/scenarios.ts`, med id-ene
   samlet i en egen `_SCENARIO_IDS`-liste (samme mønster som
   `CAFE_SCENARIO_IDS`) — IKKE gjenbruk av kafeens pool.
4. **Registrering**: legg definisjonen til i `INDUSTRY_DEFINITIONS` i
   `industryDefinition.ts` for å faktisk bli aktiv.

Det den ALDRI skal trenge å røre: `InteriorView.tsx`, `MonterScene.tsx`,
`scenariosForMix`/`scenariosForIndustry`, `generatePersona`s interne
logikk, eller `CLOSE_DAY`-reduceren i `GameContext.tsx` — alle disse leser
already fra `IndustryDefinition`.

## Hull `KLESBUTIKK`-stubben avslørte i typen/motorene

- **Ingen `state`-drevet aktivering ennå.** `getActiveIndustryDefinition()`
  tar bevisst ingen parameter og returnerer alltid `CAFE` — motorene
  (`InteriorView`/`MonterScene`/`CLOSE_DAY`) har ingen mekanisme for å faktisk
  BYTTE til en annen bransjes geometri selv om `KLESBUTIKK` var registrert.
  Å gjøre `KLESBUTIKK` reelt aktiv krever enten en egen game-mode-bryter eller
  at disse motorene begynner å lese `state.industry` for GEOMETRI også (i dag
  leser kun katalogvalget det — se skillet mellom de to oppslagsfunksjonene
  over).
- **`svinnRegel: 'sesong/kolleksjon'` er kun et navn.** `CLOSE_DAY` kjenner
  typen (unionen kompilerer), men har ingen implementasjon for den —
  branchen faller til «ingen svinn» hvis den noensinne ble aktiv. Selve
  sesong-/kolleksjons-mekanikken (gradvis verditap, e.l.) er udesignet.
  `svinnRegel` er derfor prov mer at UNIONEN kan utvides trygt (ingen krasj),
  ikke at regelen fungerer.
  **NB:** i dag har `KLESBUTIKK` denne regelen, men den kan aldri kjøre
  (`CLOSE_DAY` leser alltid `CAFE`s regel via `getActiveIndustryDefinition()`
  — se punktet over).
- **`flater.lager` for `KLESBUTIKK` er reelt tom** (`trau: []`,
  `sceneImage: ''`) — ikke en gjettet plassholder-geometri. Typen tillater
  dette (alle felt er påkrevd, men en tom liste/streng er gyldig), men
  ingenting i `MonterScene`/`InteriorView` er testet mot en FAKTISK tom
  `sceneImage` (viser sannsynligvis samme «bilde mangler»-fallback som i dag
  når `monter-frontal.png` feiler å laste — ikke verifisert, siden
  `KLESBUTIKK` aldri aktiveres).
- **`ekstraFlater` er en flat liste uten typet «rolle».** Kafeens tavle er
  identifisert via en streng-id (`'tavla'`) som `InteriorView` leter etter
  med `.find(f => f.id === 'tavla')` — en ny bransje med en ANNEN ekstraflate
  (f.eks. en prøverom-kø for klesbutikk) ville trenge sin EGEN
  streng-id-konvensjon og sin EGEN håndtering i motoren, siden `EkstraFlate`
  ikke har noe felt som sier HVORDAN flaten skal rendres (kun `zone` +
  `matches`). Typen bærer dermed «en bransje kan ha flere ekstraflater», men
  ikke «motoren vet automatisk hvordan den skal tegne en ukjent en».
- **`personaBudsjett` sin `'kategori'`-variant krever et manuelt `step`-tall**
  (100 for klær, 500 for den generiske fallback-tabellen) — ingen
  utledning fra tabellens egne min/max-verdier. Lett å sette feil for en ny
  bransje uten at typen fanger det (`step: 0` gir `NaN` i `budgetFromTable` —
  ikke sjekket/beskyttet mot).
