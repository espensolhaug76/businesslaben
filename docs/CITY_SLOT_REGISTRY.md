# Adventure City Slot Registry

## Soneinndeling + kvartaler (KVARTALSBY, 2026-06-12)

Hver slot tilhører én av tre soner. Klassifiseringen styrer rendering:
sentrum-slots grupperes i **kvartaler** med felles fasade-sprite,
bolig-slots beholder frittstående hus med tomter, industri/infra
beholder enkeltbygg.

| Zone | Definisjon | Slots |
|------|-----------|-------|
| `sentrum` | Langs hovedgata (Storgata/Brugata), gågata og Rådhusplassen: alle TIL LEIE-grids med `zone:'hovedgata'`/`'gagata'`, Kongssenteret, navngitte butikker rad 9–10, Stasjonsbyen-butikkene rad 29/32 | #2, 8–11, 17, 21–28, 29, 31–33, 35–36 + Stasjonsbyen |
| `bolig` | Bydel Øst (kol _AH–_AO) + alle ytterkant-slots (`zone:'utkant'`) + alle Boliger/🏠-BD-er | #5–7, 37, 40–45, 47–70 + Bydel Øst |
| `industri` | Jernbane-korridorene (rad 17/27), stasjonene, SSB, parkering, ESSO | #16, 34, 38, 39 + Hovedstasjonen |

### Kvartal-tabell (speiles av `KVARTALER` i CityScene.ts)

Et kvartal = 2–4 sammenhengende sentrum-slots langs samme gateside.
Kvartalet rendrer ÉN felles fasade-sprite over hele footprintet;
medlems-BD-enes V-units blir TIL LEIE-hotspots på fasaden i gateplan
(leiepris/m²/kapasitet uendret fra slot-dataene).

| ID | Footprint | Medlems-BD(er) | Lokaler | Asset |
|----|-----------|----------------|---------|-------|
| K01 | _M,5 → _M,6 | #8 + #9 | 2 | kvartal_smal_a |
| K02 | _O,5 → _Q,6 | #10 | 6 | kvartal_a |
| K03 | _R,5 → _T,6 | #11 | 6 | kvartal_b |
| K04 | _T,2 → _T,3 | #2 | 2 | kvartal_smal_b |
| K05 | _O,8 → _R,8 | #17 | 4 (3V + Græb) | kvartal_c *(pilot)* |
| K06 | _O,9 → _P,10 | #23 | 4 | kvartal_d *(pilot)* |
| K07 | _T,9 → _T,10 | #26 + #27 | 2 | kvartal_smal_a |
| K08 | _V,10 → _Y,10 | #28 | 4 | kvartal_e |
| K09 | _J,10 → _L,10 | #29 | 3 | kvartal_f |
| K10 | _V,12 → _V,13 | #35 + #36 | 2 | kvartal_smal_b |
| K11 | _D,12 → _G,14 | #31 (Kongssenteret 1) | 1 V + tenants | kjopesenter |
| K12 | _I,12 → _N,13 | #32 (Kongssenteret 2) | 2 V + tenants | kjopesenter |
| K13 | _O,12 → _R,13 | #33 (Kongssenteret 3) | 2 V + tenants | kjopesenter |

Ikke i kvartal (sentrum, enkeltslots): #25 (_R,10, 1×1 TIL LEIE — for
liten alene, beholder butikklokale-filler), navngitte butikker med egne
assets (#21, 22, 24, 30 m.fl.).

---

## How to use

1. Run the dev server, open **`/game?skip=1&numbers=1`**.
2. Each labelled building shows a small dark badge with its 1-based array
   index (matches the `#` column below).
3. Decide for each slot: leave procedural, assign an existing asset from
   `public/assets/raw/`, or flag for a new sprite.
4. Fill in the **Assigned asset** column. Save. Send back to CC for
   implementation.

Indices are stable as long as nobody reorders entries in the `B[]` array
in `src/game/phaser/scenes/CityScene.ts` (lines 58–130).

The numbering overlay skips: roads, the river, single-tile plazas
(`plaza:true`), and BDs with neither `name` nor `grid` (none of these in
the current city).

---

## Column index reference

| const | col | const | col | const | col | const | col |
|-------|-----|-------|-----|-------|-----|-------|-----|
| _A | 0 | _I | 8 | _Q | 16 | _Y | 24 |
| _B | 1 | _J | 9 | _R | 17 | _Z | 25 |
| _C | 2 | _L | 11 | _S | 18 | _AA | 26 |
| _D | 3 | _M | 12 | _T | 19 | _AB | 27 |
| _E | 4 | _N | 13 | _U | 20 | _AC | 28 |
| _F | 5 | _O | 14 | _V | 21 | _AD | 29 |
| _G | 6 | _P | 15 | _W | 22 | _AE | 30 |
| _H | 7 | | | _X | 23 | _AF | 31 |
| | | | | | | _AG | 32 |

(`_K` is intentionally absent — gap in the city grid.)

---

## Slots — single-tenant buildings

Each row is one BD entry from `B[]`. **Coords** column shows the iso
footprint. **Source** indicates how the assignment was decided:

- `spec` — matches the canonical spec from earlier design phases
- `auto-MED` / `auto-LOW` — name-match auto-fill, lower confidence
- `pre` — already wired in code before this session
- `gen-needed` — canonical-spec building but no matching asset exists yet
- `not-in-spec` — current BD has no entry in the canonical spec

| #  | Name / Label    | Coords (ca,ra → cb,rb) | Zone        | Current asset       | Assigned asset      | Source |
|----|-----------------|------------------------|-------------|---------------------|---------------------|--------|
| 1  | Hotell 🏨 (Byparken Hotell) | _V,2 → _V,3 | landmark | **hotel** ✅ wired | hotel | spec |
| 3  | ⛪ Kirke         | _R,2 → _S,3           | landmark    | **kirke** ✅ wired  | kirke               | pre    |
| 4  | Sykehuset 🏥 (AHUS) | _A,5 → _B,8       | landmark    | **sykehuset** ✅ wired | sykehuset        | gen→wired |
| 12 | ⛲ fountain (Fontene) | _V,5             | plaza-prop  | (procedural)        | _decorative — keep procedural_ | spec |
| 13 | 🎭 Rådhusteateret | _W,5                 | landmark    | **radhusteateret** ✅ wired | radhusteateret | gen→wired |
| 14 | Rådhuset 🏛️     | _V,6 → _W,7           | landmark    | **radhus** ✅ wired | radhus              | pre    |
| 15 | Kongsbadet 🏊    | _Z,5 → _AA,6          | landmark    | **kongsbadet** ✅ wired | kongsbadet     | gen→wired |
| 16 | ⛽ ESSO (bensinstasjon) | _E,8 → _G,9    | landmark    | **esso** ✅ wired   | esso                | gen→wired |
| 18 | Rådhusplassen    | _V,8 → _Y,9           | plaza       | (procedural, **skip — plaza:true**) |     |        |
| 19 | 📚 Bibliotek     | _Y,7 → _Z,7           | landmark    | **bibliotek** ✅ wired | bibliotek        | pre    |
| 20 | Sentrum VGS 🏫   | _AA,8 → _AB,9         | landmark    | **sentrum_vgs** ✅ wired | sentrum_vgs    | pre    |
| 21 | Øyeklinikk       | _Q,9                  | landmark    | **legekontor** ✅ wired | legekontor      | spec   |
| 22 | Peders Kjøtt&Fisk | _R,9                 | landmark    | **peders** ✅ wired | peders              | gen→wired |
| 24 | Specsavers       | _Q,10                 | landmark    | **optician** ✅ wired | optician          | spec   |
| 30 | KIWI 🛒          | _A,12 → _A,13         | landmark    | **kiwi** ✅ wired   | kiwi                | spec   |
| 34 | P (parking)      | _T,12 → _T,13         | infra       | (procedural)        | _decorative — keep procedural_ | spec |
| 38 | SSB              | _AE,18 → _AG,18       | landmark    | (procedural)        | _not in spec — leave procedural for now_ | not-in-spec |
| 39 | 🚉 Stasjon       | _AA,18 → _AC,18       | landmark    | **jernbanestasjon** ✅ wired | jernbanestasjon | pre |
| 46 | Coop Mega 🛒     | _AF,20 → _AG,22       | landmark    | (procedural)        | _not in spec — leave procedural for now_ | not-in-spec |

### Notes on the spec match

- **#21 Øyeklinikk → `legekontor`** overrides my earlier LOW auto-guess of
  `optician`. The canonical spec is explicit — Øyeklinikk is a medical
  clinic, fits the medical/clinical sprite, not the eyeglass-retail one.
- **#46 Coop Mega**: present in the city but **not in the canonical spec**
  for the northern/commercial/Kongssenteret sections. The spec scope ends
  before reaching the row 20-22 retail strip in the south. Coop Mega is
  flagged `not-in-spec` and stays procedural here — could be wired later
  with the `coop_mega` asset if you want, but the spec doesn't mandate it.
- **#38 SSB**: same — outside the spec's scope. Procedural for now.
- **#3 Kirke**: not enumerated in the spec but pre-existing and already
  wired. Kept.
- **#22 Peders**: spec clarifies as "Kjøtt&Fisk" (butcher / fishmonger).
  No matching asset exists. Could repurpose `fast_food` (LOW), or generate
  a dedicated butcher sprite later. Leaving unassigned.

---

## Slots — anchor structures (multi-tenant grids)

These BDs render a header label plus an internal grid of named tenants.
Each tenant cell gets its own sub-row so you can decide:

- Leave as text (no asset)
- Replace with a small tenant icon/sprite
- OR treat the **whole envelope** as a single anchor sprite (e.g. one
  `kongssenteret.png` covering the full 2×3 / 6×2 / 4×2 footprint),
  with tenant labels rendered procedurally on top.

### #31 — KONGSSENTERET block 1 — _D,12 → _G,14 (2 cols × 3 rows)

Footprint origin top-left, units flow left→right then top→bottom.

| #   | Tenant     | Sub-cell (col, row range) | Current | Assigned asset |
|-----|------------|---------------------------|---------|----------------|
| 31  | _envelope_ | _D,12 → _G,14             | (procedural mall) | (anchor sprite?) |
| 31a | Elkjøp     | gc=0, gr=0 (NW)           | text    |                |
| 31b | Normal     | gc=1, gr=0 (NE)           | text    |                |
| 31c | Nille      | gc=0, gr=1                | text    |                |
| 31d | V (vacant) | gc=1, gr=1                | rentable| —              |
| 31e | Lindex     | gc=0, gr=2 (SW)           | text    |                |
| 31f | KappAhl    | gc=1, gr=2 (SE)           | text    |                |

### #32 — KONGSSENTERET block 2 — _I,12 → _N,13 (6 cols × 2 rows)

| #   | Tenant      | Sub-cell        | Current | Assigned asset |
|-----|-------------|-----------------|---------|----------------|
| 32  | _envelope_  | _I,12 → _N,13   | (procedural mall) | (anchor sprite?) |
| 32a | V (vacant)  | gc=0, gr=0      | rentable| —              |
| 32b | H&M         | gc=1, gr=0      | text    |                |
| 32c | Norli       | gc=2, gr=0      | text    | (have bokhandel asset) |
| 32d | Cubus       | gc=3, gr=0      | text    |                |
| 32e | Kicks       | gc=4, gr=0      | text    |                |
| 32f | Intersport  | gc=5, gr=0      | text    |                |
| 32g | Dressmann   | gc=0, gr=1      | text    |                |
| 32h | XXL         | gc=1, gr=1      | text    |                |
| 32i | Vita        | gc=2, gr=1      | text    |                |
| 32j | Europris    | gc=3, gr=1      | text    |                |
| 32k | V (vacant)  | gc=4, gr=1      | rentable| —              |
| 32l | Søstrene G  | gc=5, gr=1      | text    |                |

### #33 — KONGSSENTERET block 3 — _O,12 → _R,13 (4 cols × 2 rows)

| #   | Tenant         | Sub-cell        | Current | Assigned asset |
|-----|----------------|-----------------|---------|----------------|
| 33  | _envelope_     | _O,12 → _R,13   | (procedural mall) | (anchor sprite?) |
| 33a | C.Ohlson       | gc=0, gr=0      | text    |                |
| 33b | Power          | gc=1, gr=0      | text    | (have tech_shop asset) |
| 33c | Vinmonopolet   | gc=2, gr=0      | text    |                |
| 33d | V (vacant)     | gc=3, gr=0      | rentable| —              |
| 33e | Jernia         | gc=0, gr=1      | text    |                |
| 33f | Nille          | gc=1, gr=1      | text    |                |
| 33g | Apotek 1       | gc=2, gr=1      | text    | (have apotek1 asset) |
| 33h | V (vacant)     | gc=3, gr=1      | rentable| —              |

---

## Slots — V-grid rentables (procedural, used by the rent system)

These BDs render as outlined "TIL LEIE" badges. Used by the player-rental
flow. They typically stay procedural — but you could assign an asset to
the whole BD if you want every cell to share a single sprite.

| #  | Description                  | Coords (ca,ra → cb,rb) | Zone       | Slots | Assigned asset |
|----|------------------------------|------------------------|------------|-------|----------------|
| 2  | TIL LEIE 1×2                 | _T,2 → _T,3            | gagata     | 2     |                |
| 8  | TIL LEIE 1×1                 | _M,5                   | hovedgata  | 1     |                |
| 9  | TIL LEIE 1×1                 | _M,6                   | hovedgata  | 1     |                |
| 10 | TIL LEIE 3×2                 | _O,5 → _Q,6            | gagata     | 6     |                |
| 11 | TIL LEIE 3×2                 | _R,5 → _T,6            | gagata     | 6     |                |
| 17 | TIL LEIE 4×1 (1 unit "Græb") | _O,8 → _R,8            | hovedgata  | 4     |                |
| 23 | TIL LEIE 2×2                 | _O,9 → _P,10           | hovedgata  | 4     |                |
| 25 | TIL LEIE 1×1                 | _R,10                  | hovedgata  | 1     |                |
| 26 | TIL LEIE 1×1                 | _T,9                   | hovedgata  | 1     |                |
| 27 | TIL LEIE 1×1                 | _T,10                  | hovedgata  | 1     |                |
| 28 | TIL LEIE 4×1                 | _V,10 → _Y,10          | gagata     | 4     |                |
| 29 | TIL LEIE 3×1                 | _J,10 → _L,10          | hovedgata  | 3     |                |
| 35 | TIL LEIE 1×1                 | _V,12                  | hovedgata  | 1     |                |
| 36 | TIL LEIE 1×1                 | _V,13                  | hovedgata  | 1     |                |
| 37 | TIL LEIE 1×1                 | _V,18                  | utkant     | 1     |                |
| 40 | TIL LEIE 1×1                 | _W,21                  | utkant     | 1     |                |
| 41 | TIL LEIE 1×1                 | _W,22                  | utkant     | 1     |                |
| 42 | TIL LEIE 6×1                 | _Y,20 → _AD,20         | utkant     | 6     |                |
| 43 | TIL LEIE 1×1                 | _V,20                  | utkant     | 1     |                |
| 44 | TIL LEIE 1×1                 | _W,20                  | utkant     | 1     |                |
| 45 | TIL LEIE 6×1                 | _Y,22 → _AD,22         | utkant     | 6     |                |

---

## Slots — Boliger (housing)

Stay procedural — they're background scenery, not commercial slots.
Listed for completeness so the numbering overlay matches up.

| #  | Type            | Coords (ca,ra → cb,rb) | Houses |
|----|-----------------|------------------------|--------|
| 5  | Boliger 4×2     | _D,5 → _G,6            | 8      |
| 6  | Boliger 4×1     | _I,6 → _L,6            | 4      |
| 7  | Boliger 5×1     | _I,8 → _M,8            | 5      |
| 47 | Boliger 2×2     | _A,2 → _B,3            | 4      |
| 48 | Boliger 3×2     | _D,2 → _F,3            | 6      |
| 49 | Boliger 4×2     | _I,2 → _L,3            | 8      |
| 50 | Boliger 3×2     | _N,2 → _P,3            | 6      |
| 51 | Boliger 3×2     | _Z,2 → _AB,3           | 6      |
| 52 | Boliger 4×1     | _I,5 → _L,5            | 4      |
| 53 | Boliger 2×2     | _AB,5 → _AC,6          | 4      |
| 54 | Boliger 2×1     | _W,7 → _X,7            | 2      |
| 55 | 🏠 single        | _D,8 → _D,9           | 1      |
| 56 | Boliger 4×1     | _I,9 → _L,9            | 4      |
| 57 | Boliger 4×1     | _D,10 → _G,10          | 4      |
| 58 | 🏠 single        | _I,10                 | 1      |
| 59 | 🏠 single        | _M,9 → _M,10          | 1      |
| 60 | Boliger 2×2     | _AC,8 → _AD,9          | 4      |
| 61 | Boliger 3×1     | _Z,10 → _AB,10         | 3      |
| 62 | 🏠 single        | _B,12 → _B,13         | 1      |
| 63 | Boliger 2×1     | _A,14 → _B,14          | 2      |
| 64 | Boliger 4×1     | _I,14 → _L,14          | 4      |
| 65 | Boliger 3×1     | _O,14 → _Q,14          | 3      |
| 66 | Boliger 2×1     | _V,14 → _W,14          | 2      |
| 67 | Boliger 4×1     | _A,18 → _D,18          | 4      |
| 68 | Boliger 4×1     | _I,18 → _L,18          | 4      |
| 69 | Boliger 4×3     | _A,20 → _D,22          | 12     |
| 70 | Boliger 4×3     | _I,20 → _L,22          | 12     |

---

## Available unwired assets (in `public/assets/raw/`)

26 PNGs preloaded into the Phaser cache via `BootScene.MODERN_BUILDING_ASSETS`
but not yet referenced by any BD `asset:` field. Ready for assignment in
the table above.

### Modern commercial (Batch 1 / v2 set — 7)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| bakery_kongsvinger   | Modern bakery with Norwegian flag, glass storefront     |
| cafe                 | Glass-front cafe with espresso bar visible              |
| hair_salon           | Floor-to-ceiling glass, styling chairs and mirrors      |
| sports_shop          | Wide glass storefront with shoes/sportswear inside      |
| gym                  | Floor-to-ceiling windows showing treadmills + weights   |
| tech_shop            | Sleek electronics storefront                            |
| fashion_shop         | Boutique with mannequins and clothing racks             |

### Civic + transport (already wired ones excluded — 2 unwired)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| brannstasjon         | Modern fire station with red garage door                |
| politi               | Compact civic building with subtle blue accent          |

### Batch 2 NPCs — convenience + health (2)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| kiosk                | Compact kiosk, magazines + drinks cooler visible        |
| apotek1              | Pharmacy, white facade with subtle green accent         |

### Batch 2 NPCs — grocery (3)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| kiwi                 | Supermarket with bright lime-green canopy stripe        |
| coop_mega            | Larger supermarket with deep red canopy stripe          |
| rema                 | No-frills warehouse-style with sky-blue canopy stripe   |

### Batch 2 NPCs — food (3)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| restaurant_modern    | Sit-down restaurant, dark stained wood facade           |
| fast_food            | Quick-serve with menu boards visible                    |
| brewpub              | Industrial-style with copper brewing tanks              |

### Batch 2 NPCs — services (4)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| bokhandel            | Bookstore, tall warm-lit shelves, reading nook          |
| bank                 | Sober concrete facade, brushed-metal trim               |
| post                 | Pale concrete with subtle yellow-orange canopy          |
| florist              | Flowers in vases on tiered tables (inside)              |
| optician             | Designer eyeglass frames on white wall display          |

### Batch 2 NPCs — health (2)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| legekontor           | Muted blue-grey facade, frosted-glass windows           |
| dentist              | Pale white facade, light-wood reception visible         |

### Batch 2 NPCs — hospitality + entertainment (2)
| Asset key            | Description                                             |
|----------------------|---------------------------------------------------------|
| hotel                | Three-story brick + concrete with rhythmic balconies    |
| cinema               | Low two-story dark grey upper-facade, glass lobby       |

---

## Structures the city has but we haven't generated

Multi-cell named landmarks that currently render procedurally and would
benefit from a single dedicated **anchor sprite** covering the full
footprint (the tenant labels would render on top procedurally as today).

| Slot # | Building     | Footprint        | Why it needs an anchor sprite |
|--------|--------------|------------------|-------------------------------|
| 4      | Sykehuset 🏥 | 2×4 (8 tiles)    | Currently a flat blue box; large landmark deserves real geometry |
| 31, 32, 33 | KONGSSENTERET (3 blocks) | 2×3 + 6×2 + 4×2 = 26 tiles | Currently three independent envelopes with text-tenant grids; would look better as one connected mall with a flat roof and tenant signage windows |
| 15     | Kongsbadet 🏊 | 2×2             | Swimming pool — needs distinctive water/sky-blue glass envelope |
| 38     | SSB          | 3×1              | Civic office tower for Statistics Norway |
| 13     | 🎭 theater    | 1×1             | Performance venue — could share a "civic" sprite with cinema |
| 16     | ⛽ ESSO       | 3×2             | Petrol station — needs canopy + pumps geometry |
| 34     | P (parking)  | 1×2              | Multi-storey parking deck |

These would each be one new prompt run through the existing pipeline —
add an entry to `docs/ASSET_PROMPTS.json` with `building_type` matching
the geometry, then `bash scripts/generate-asset.sh <id>` and the rest of
the pipeline.

---

## Workflow notes

- **One BD per row** in the table — fill `Assigned asset` with the asset
  key from the "Available unwired assets" section above, leave blank
  to keep procedural.
- For **Kongssenteret tenants**: the simplest path is to assign an
  anchor sprite to the envelope row (#31 / #32 / #33) and ignore the
  sub-rows. The sub-rows are listed only if you want per-tenant icons.
- After you fill it in, send back to CC with: "Apply the assignments
  in `docs/CITY_SLOT_REGISTRY.md`" — CC will translate each assignment
  into the corresponding `asset:` field edit in `B[]`.
- Indices **WILL renumber** if you add or remove BDs from `B[]` — keep
  the registry in sync if you reorder.

---

## Verified Wirings (from canonical spec) — 2026-05-06 ✅ APPLIED

Cross-referenced against the canonical city spec. **All 14 sprite
assignments are now applied to `B[]` in code.** Build verified clean
with `npx tsc --noEmit`.

| # in B[] | Slot                        | Coords (ca,ra → cb,rb) | Asset             | Status   |
|----------|-----------------------------|------------------------|-------------------|----------|
| 1        | Hotell 🏨 (Byparken Hotell)  | _V,2 → _V,3           | hotel             | wired    |
| 3        | ⛪ Kirke                    | _R,2 → _S,3           | kirke             | wired    |
| 4        | Sykehuset AHUS 🏥           | _A,5 → _B,8           | sykehuset         | wired (new asset) |
| 13       | 🎭 Rådhusteateret           | _W,5                  | radhusteateret    | wired (new asset) |
| 14       | Rådhuset 🏛️                 | _V,6 → _W,7           | radhus            | wired    |
| 15       | Kongsbadet 🏊               | _Z,5 → _AA,6          | kongsbadet        | wired (new asset) |
| 16       | ⛽ ESSO                     | _E,8 → _G,9           | esso              | wired (new asset) |
| 19       | 📚 Bibliotek                | _Y,7 → _Z,7           | bibliotek         | wired    |
| 20       | Sentrum VGS 🏫              | _AA,8 → _AB,9         | sentrum_vgs       | wired    |
| 21       | Øyeklinikk                  | _Q,9                  | legekontor        | wired    |
| 22       | Peders Kjøtt&Fisk           | _R,9                  | peders            | wired (new asset) |
| 24       | Specsavers                  | _Q,10                 | optician          | wired    |
| 30       | KIWI 🛒                     | _A,12 → _A,13         | kiwi              | wired    |
| 39       | 🚉 Stasjon                  | _AA,18 → _AC,18       | jernbanestasjon   | wired    |

**Total wired: 14** (5 originals + 4 spec-direct + 5 newly generated).

Per-asset framing eval (post-rembg) for the 5 newly generated:

| Asset           | bbox_w | cx    | cy    | Result |
|-----------------|--------|-------|-------|--------|
| sykehuset       | 0.942  | 0.522 | 0.486 | PASS   |
| radhusteateret  | 0.916  | 0.500 | 0.503 | PASS   |
| kongsbadet      | 0.945  | 0.514 | 0.471 | PASS   |
| esso            | 0.876  | 0.505 | 0.477 | PASS (note: rendered as convenience-store building without visible pumps — acceptable as P3 placeholder) |
| peders          | 0.758  | 0.505 | 0.501 | PASS   |

---

## Asset generation tasks remaining

**Required by canonical spec: NONE** — all 5 generated this session.

**Optional:** `kongssenteret.png` anchor sprite covering the full
J12:Q13 / D12:R14 footprint. Spec says "keep procedural for now"
so this is deferred indefinitely.

---

## Procedural by design (do not wire)

These BDs/regions are intentionally procedural and should NOT have
`asset:` fields applied. The spec is explicit that they stay as text/box
rendering.

### Player rentables (V-grid slots — used by the rent system)

All 21 TIL LEIE BDs in the V-grid registry table above:
#2, #8, #9, #10, #11, #17, #23, #25, #26, #27, #28, #29, #35, #36,
#37, #40, #41, #42, #43, #44, #45.

### Boliger (residential housing scenery)

All 27 Boliger BDs in the housing table above:
#5, #6, #7, #47, #48, #49, #50, #51, #52, #53, #54, #55, #56, #57,
#58, #59, #60, #61, #62, #63, #64, #65, #66, #67, #68, #69, #70.

### Kongssenteret tenant cells (text labels inside the mall)

All 26 sub-tenant cells across blocks #31, #32, #33 stay as procedural
text labels (Elkjøp, H&M, Norli, Apotek 1, etc.). Per spec: "leave
entire Kongssenteret as procedural for now". The current renderer
doesn't support per-cell sprites inside a grid anyway.

### Decorative + infra

| #  | Slot              | Why procedural |
|----|-------------------|----------------|
| 12 | ⛲ Fontene        | Plaza-prop, decorative |
| 18 | Rådhusplassen    | `plaza:true`, no building footprint |
| 34 | P (parking)       | Spec says procedural — Parkering is just a text label |

### Outside the canonical spec (procedural by default)

These exist in the current city but aren't enumerated in the spec.
Default to procedural until the spec is extended.

| # | Slot      | Note |
|---|-----------|------|
| 38| SSB       | Statistics Norway — could later be wired to `bank` (sober concrete fits visually), MED |
| 46| Coop Mega | Has matching `coop_mega.png` available, but not in spec scope |

### Roads, river, off-map

`HROADS`, `VROADS`, `ROAD_SINGLES`, the Glomma river row 15, the rail
row 17 — all rendered separately, not in `B[]`, not part of this
registry.

---

## Generated assets with no canonical-spec slot

Of the 26 PNGs in `public/assets/raw/` preloaded by `BootScene`,
**22 have no canonical-spec assignment**. They're sitting in the
Phaser cache unused. Decision needed: ditch them (delete from
`MODERN_BUILDING_ASSETS` to skip preload) or extend the spec with new
BDs that have road frontage.

| Category               | Asset keys (unused)                                                |
|------------------------|--------------------------------------------------------------------|
| Modern commercial (7)  | bakery_kongsvinger, cafe, hair_salon, sports_shop, gym, tech_shop, fashion_shop |
| Civic + transport (2)  | brannstasjon, politi                                               |
| Convenience + health(2)| kiosk, apotek1                                                     |
| Grocery (2)            | coop_mega _(in city but not in spec)_, rema                        |
| Food (3)               | restaurant_modern, fast_food, brewpub                              |
| Services (4)           | bokhandel, bank, post, florist                                     |
| Health (1)             | dentist                                                            |
| Hospitality + ent (1)  | cinema                                                             |

**Used by canonical spec (4):** hotel, kiwi, optician, legekontor.
**Pre-existing wirings (5):** kirke, radhus, bibliotek, sentrum_vgs,
jernbanestasjon.

---

## Final tally — POST-EXECUTION

| Bucket                                          | Count |
|-------------------------------------------------|-------|
| Sprite BDs **wired** in `B[]`                   | **14** (matches canonical spec exactly) |
| Asset generation tasks remaining                | 0 required (1 optional: `kongssenteret.png`) |
| Slots **procedural by design** (BDs)            | ~75 (V-grids + Boliger + Kongssenteret tenants + plaza/fountain/parking + out-of-spec) |
| Total assets in `public/assets/raw/`            | **31** (26 prior + 5 generated this session) |
| **Generated assets currently unused**            | **22** (held for future neighborhood-expansion) |

### Unused asset inventory (22)

These PNGs are preloaded into the Phaser cache via
`BootScene.MODERN_BUILDING_ASSETS` but no BD references them. Saved
for a future neighborhood-buildings expansion.

| Category               | Asset keys (unused)                                                |
|------------------------|--------------------------------------------------------------------|
| Modern commercial (7)  | bakery_kongsvinger, cafe, hair_salon, sports_shop, gym, tech_shop, fashion_shop |
| Civic + transport (2)  | brannstasjon, politi                                               |
| Convenience + health(2)| kiosk, apotek1                                                     |
| Grocery (2)            | coop_mega _(not in spec)_, rema                                    |
| Food (3)               | restaurant_modern, fast_food, brewpub                              |
| Services (4)           | bokhandel, bank, post, florist                                     |
| Health (1)             | dentist                                                            |
| Hospitality + ent (1)  | cinema                                                             |
