# City Inventory & Placement Plan

Discovery snapshot for the AdVenture Kongsvinger-inspired city map, plus a
phased production plan for the modern Norwegian asset rebuild.

> **Read-only discovery — no source code was changed.** This document is the
> reference for the next session's regeneration work.

---

## 0. TL;DR

- The city map is an **isometric Phaser scene at `src/game/phaser/scenes/CityScene.ts`** using a spreadsheet-style **A–AG × 1–26** grid (33 cols × 26 rows). Buildings are defined in a single `B[]` array on lines 57–128.
- **There is currently no sprite rendering.** Every building is drawn as a procedural colored isometric box with text/emoji labels. The asset-loading infrastructure exists (`BootScene` preloads 24 building images, `AssetManifest` defines paths) but `CityScene` never calls `this.add.image(...)` for any building. **There is no "legacy vs modern" wiring on the map yet — nothing is wired.**
- ~70 building footprints are placed on the grid: ~10 named landmarks (Rådhuset, Sykehuset, Kongsbadet, Bibliotek, Sentrum VGS, Stasjon, ESSO, KIWI, Coop Mega, SSB), three Kongssenteret mall blocks containing ~20 branded units (Elkjøp, H&M, XXL, Apotek 1, …), parking, the Glomma river with two bridges (cols H, U), and many `Boliger` housing blocks.
- ~30 **vacant rentable slots** carry zone metadata (`gagata` / `hovedgata` / `utkant`), rent, footfall, sqm, and capacity. These are the units the player can rent via `RentPanel.tsx`.
- The player picks **one of four `Industry` values** at startup: `cafe | fashion | tech | sports` (`src/game/types.ts:3`). All other businesses on the map are NPC competitors / context.

---

## 1. Slot system implementation

| Concern | Location | Notes |
|---------|---------|-------|
| Grid origin / iso math | `src/game/phaser/scenes/CityScene.ts:3-17` | TW=128, TH=64, FH=24. `iso(c,r)` and `isoC(c,r)` convert grid → world coords. |
| Column index constants | `CityScene.ts:22-24` | `_A=0` … `_AG=32`. Note: `_K` (index 10) is intentionally unnamed in the constant block, but column 10 is still drawn by the ground loop. |
| Row range | `CityScene.ts:223` | Rows 1–26 inclusive. |
| Roads (horizontal) | `CityScene.ts:28-38` (`HROADS`) | 9 rows of horizontal roads incl. **Glomma row 15** (river) and **Jernbane row 17** (rail). Row 16 = Glommengata, row 19 = Jernbanegata. |
| Roads (vertical) | `CityScene.ts:40-49` (`VROADS`) | 8 vertical streets. **Bridges at cols H and U** cross the Glomma. |
| Building array | `CityScene.ts:57-128` (`B`) | ~70 entries. Schema below. |
| Named exports | `CityScene.ts:134` | `HROADS, VROADS, ROAD_SINGLES, B, GAGATE, PARK, _AG, _S, _H, _U, iso, isoC, toGrid` consumed by `MiniMap.tsx`. |

### Building record (`BD` interface, line 53)

```ts
interface BD {
  ca, ra, cb, rb: number      // grid corners (col-a, row-a, col-b, row-b)
  fill, border: number         // colors
  bw?, dashed?, fl?: ...       // border width / dashed / floor count
  name?, symbol?, header?: string
  plaza?: boolean
  grid?: { cols, rows, units: string[] }   // sub-units inside a footprint
  zone?: 'gagata' | 'hovedgata' | 'utkant'
  rent?, sqm?, cap?: number
  traffic?: 'Lav' | 'Middels' | 'Høy'
}
```

A building is "vacant rentable" iff its `grid.units` contains `'V'` markers
(any `V` slot becomes a TIL LEIE storefront via `mkV`, line 375). Other unit
strings (`'Elkjøp'`, `'H&M'`, `'🏠'`, …) render as text-only NPC tenants.

### Asset-loading scaffolding (NOT used by CityScene)

- `src/game/assets/AssetManifest.ts` — registry of 14 building keys + tiles, props, characters, interior, ui. Each entry has `path: 'assets/buildings/<key>.png'` + a `fallbackColor`.
- `src/game/phaser/scenes/BootScene.ts:3-8` — preloads 24 image keys: `shop_tier1, shop_tier2, shop_tier3, warehouse, office, vacant, cafe, bakery, bank, restaurant, apartment, gym, house, drugstore, cinema, firestation, locked_web, locked_franchise, fountain, bench, streetlamp, flowerpot, tree_leafy, tree_pine`.
- **`CityScene.ts` never calls `this.add.image(...)`** — every building is procedural geometry. Wiring sprites in is part of the next phase, not yet implemented.
- The legacy Unity-era PNGs at `public/assets/buildings/*.png` ARE on disk and ARE preloaded by `BootScene`, but they're never rendered. The new modern assets at `public/assets/raw/*.png` are not yet preloaded at all.

---

## 2. Current map occupancy

### Named landmarks (10)

| Coord | Name | Floors | Notes |
|-------|------|--------|-------|
| V_2–3 | **Hotell 🏨** | 3 | gold/brown |
| A–B_5–8 | **Sykehuset 🏥** | 3 | hospital, blue |
| V_5 | **⛲ Fountain** | 0 | center plaza prop |
| W_5 | **🎭 Theater** | 1 | symbol-only |
| V–W_6–7 | **Rådhuset 🏛️** | 3 | town hall |
| Z–AA_5–6 | **Kongsbadet 🏊** | 2 | public pool |
| E–G_8–9 | **⛽ ESSO** | 1 | gas station |
| V–Y_8–9 | **Rådhusplassen** | 0 | plaza |
| Y–Z_7 | **📚 Bibliotek** | 2 | library |
| AA–AB_8–9 | **Sentrum VGS 🏫** | 2 | VG1–VG3 school |
| AE–AG_18 | **SSB** | n/a | Statistics Norway |
| AA–AC_18 | **🚉 Stasjon** | n/a | train station |
| AF–AG_20–22 | **Coop Mega 🛒** | n/a | grocery anchor |
| A_12–13 | **KIWI 🛒** | n/a | grocery |
| Q_9 | **Øyeklinikk** | 1 | eye clinic |
| R_9 | **Peders** | 1 | (??? unclear — flag for clarification) |
| Q_10 | **Specsavers** | 1 | optician |
| T_12–13 | **P** | n/a | parking |

### Kongssenteret (mall, three blocks)

`bw:3` thick border, header label "KONGSSENTERET" rendered above each block.

| Block | Coord | Units (text-only NPC tenants + V vacants) |
|-------|-------|-------|
| West wing | D–G_12–14 | Elkjøp, Normal, Nille, **V**, Lindex, KappAhl |
| North wing | I–N_12–13 | **V**, H&M, Norli, Cubus, Kicks, Intersport, Dressmann, XXL, Vita, Europris, **V**, Søstrene Grene |
| East wing | O–R_12–13 | C.Ohlson, Power, Vinmonopolet, **V**, Jernia, Nille, Apotek 1, **V** |

The mall has **4 vacant slots inside it** (player can rent inside Kongssenteret).

### Vacant rentable slots (≈30, grouped by zone)

| Zone | Approx count | Rent range | Slots |
|------|--------------|------------|-------|
| **gagata** (premium pedestrian) | ~13 | 36k–55k | T_2–3, O–Q_5–6 (6), R–T_5–6 (6), V–Y_10 (4) |
| **hovedgata** (main street) | ~13 | 20k–34k | M_5, M_6, O–R_8 (3+1), O–P_9–10 (4), R_10, T_9, T_10, J–L_10 (3), V_12, V_13, plus mall vacants |
| **utkant** (outskirts) | ~14 | 10k–14k | V_18, W_20, W_21, W_22, V_20, Y–AD_20 (6), Y–AD_22 (6) |

Captured in the `B[]` entries with `zone:` field set. `mkV` creates the
vacancy marker glow + label.

### Housing (many blocks of 🏠)

Boliger blocks scattered across rows 2–3, 5–10, 14, 18, 20–22. Roughly 22
distinct blocks containing **≈80 individual 🏠 sub-units**. Pure decoration —
the player cannot interact with these.

### Greenery / infrastructure

- **Park** at W–Y_2–3 (`PARK` const, line 131) with 6 hand-placed tree props.
- **Glomma river** row 15, sunken 32 px, with bridges at H and U.
- **Jernbane** (railway) row 17.
- 6 cars + 4 horizontal pedestrians + 4 vertical pedestrians spawned procedurally.

---

## 3. Building types referenced anywhere

### Player industry enum (very small)

`src/game/types.ts:3` — `Industry = 'cafe' | 'fashion' | 'tech' | 'sports'`.
The player's *own* business is one of these four. Used by `InteriorScene.ts`
(per-industry interior layouts), `StartupScreen.tsx`, `personas.ts`,
`industries.ts` (catalog).

### AssetManifest keys (14)

`vacant, shop_tier1, shop_tier2, shop_tier3, warehouse, office, cafe, bakery,
bank, restaurant, apartment, gym, house, locked_web, locked_franchise`.

### BootScene preload list (24 — superset of AssetManifest)

Adds: `drugstore, cinema, firestation, fountain, bench, streetlamp,
flowerpot, tree_leafy, tree_pine`. Note: `BootScene` preloads these names
but `AssetManifest` doesn't define `drugstore`, `cinema`, `firestation`
(implicit drift between the two files — flag).

### NPC tenants visible on map (text-only labels)

Elkjøp, Normal, Nille (×2), Lindex, KappAhl, H&M, Norli, Cubus, Kicks,
Intersport, Dressmann, XXL, Vita, Europris, Søstrene Grene, C.Ohlson,
Power, Vinmonopolet, Jernia, Apotek 1, Specsavers, Peders, Øyeklinikk,
KIWI, Coop Mega, ESSO, SSB, Rådhuset, Sykehuset, Kongsbadet, Bibliotek,
Sentrum VGS, Hotell, Stasjon, Bakeri (Græb).

These are **rendered as small Outfit-font text** inside each grid cell
(line 368). They are not asset-driven — replacing them with sprites would
require code changes to `drawBuildings()`.

---

## 4. Curriculum mapping

The codebase splits learning content from buildings. Curriculum subjects
in `src/data/lessons.ts:3` are: `mfl1, mfl2, ent1, ent2, ssr_fd, ssr_mi,
ssr_ks`. Module bundles are in `src/data/modules.ts`. **No file maps a
building_type to a curriculum subject directly** — buildings unlock via
the generic `unlockedFeatures` mechanism in `gameStore.ts`.

Implicit alignment (best inference, flag if wrong):

| Curriculum | Likely city representation |
|------------|---------------------------|
| **SSR** (samfunnsfag/økonomi) | Bank (missing), Posthus (missing), SSB ✓, Rådhus ✓ |
| **ML** (markedsføring & ledelse) | Storefronts in gågata, Marketing office, Reklamebyrå (missing) |
| **ENT** (entreprenørskap) | Player's own shop, Inkubator/co-working (missing), Gründerhus (missing) |
| **VG2 økonomi/HMS/komm.** | Sentrum VGS ✓, Library ✓ |

---

## 5. Gaps & ambiguities

### Code-level gaps
1. `BootScene` preloads `drugstore, cinema, firestation` — not in `AssetManifest`. Flag: which file is canonical?
2. `BootScene` expects `streetlamp` (no underscore); `AssetManifest` calls it `street_lamp`. **Naming drift** — pick one.
3. `BootScene` expects `tree_leafy, tree_pine`; `AssetManifest` only has `tree`. Drift.
4. `CityScene` never renders any sprite. The whole load-and-draw pipeline is wired only as far as `preload()`.

### Asset-naming convention drift (NEW pipeline vs OLD code)

The new pipeline uses asset_ids like `bakery_kongsvinger`, `cafe_central`,
`hair_salon`, `sports_shop`, `gym_modern`. The old `BootScene` expects
generic keys like `bakery`, `cafe`, `gym`. **Decision needed**: do we
retire the generic keys and switch to instance-specific keys, or do we
keep generic keys for the asset registry and use instance suffixes only
for variant generation?

Recommendation: rename `gym_modern` → `gym`, `hair_salon` stays as-is
(no generic counterpart), `cafe_central` → `cafe` once we're happy with
it. Keep `bakery_kongsvinger` if you want the per-town flavor, or rename
to `bakery` for the generic. **Flagged for Espen's call.**

### Map-level gaps (vs the modern-city checklist)

Categories you listed in the brief that are **NOT yet on the map at all**:
- Pharmacy (Apotek 1 is text-only inside mall — no standalone)
- Bookstore (Norli is text-only in mall)
- Florist
- Jewelry, gift shop, toy store
- Fast food, ice cream, kebab, brewpub
- Bank, post office, real estate, insurance, accounting, law office, travel agency
- Dentist, doctor, vet
- Car wash, auto repair, tire shop
- Hotel exists, but no hostel, no conference venue
- Cinema, theater (🎭 symbol exists), museum, art gallery — **🎭 at W_5 is just an emoji on a 1×1 footprint, not a real theater building**
- Townhouses (only generic "Boliger" blocks)
- Bus stop (no marker)

Categories already represented on the map:
- Hotell ✓ (V_2–3)
- Sykehus ✓ (A–B_5–8)
- Rådhus ✓ (V–W_6–7)
- Bibliotek ✓ (Y–Z_7)
- VGS school ✓ (AA–AB_8–9)
- Train station ✓ (AA–AC_18)
- Gas station ✓ (E–G_8–9)
- Grocery ✓ (KIWI A_12–13, Coop Mega AF–AG_20–22)
- Pool ✓ (Kongsbadet)
- Plaza ✓ (Rådhusplassen)
- Park ✓ (Byparken W–Y_2–3)
- Optician ✓ (Specsavers Q_10, Øyeklinikk Q_9)
- Apartments / Boliger ✓ (≈22 blocks, decoration only)
- Parking ✓ (T_12–13)

### Ambiguities to flag
- **"Peders" at R_9** — what is this? Bakery? Restaurant? Not in any catalog.
- **"Græb" inside O–R_8 mall block** — bakery brand? Type unclear.
- **🎭 at W_5** — placeholder for theater or just a symbol? If theater, the footprint is too small (1×1 vs the ~3×2 a real theater would need).
- The two `Vinmonopolet` and the duplicated `Nille` entries inside Kongssenteret — intentional?

---

## 6. Modern city vision — categories

Below: every category from your brief, mapped to (a) what's already on the
map, (b) what's missing, (c) where it could plausibly go (suggested slot).

### COMMERCIAL — small / mid retail

| Building | Status | Slot suggestion | Notes |
|----------|--------|-----------------|-------|
| Bakery | partial — `Græb` text | replace mall vacant or use new gågata vacant (e.g. T_5 area) | Asset done: `bakery_kongsvinger` |
| Café | NPC tenants only | gågata vacant V–Y_10 area | Player industry. Asset done: `cafe_central` |
| Hair salon | missing | hovedgata vacant J–L_10 | Asset done: `hair_salon` |
| Sports shop | NPC `Intersport`, `XXL` text-only | gågata standalone, e.g. R–T_5–6 area | Asset done: `sports_shop` |
| Gym | missing | utkant or large hovedgata, e.g. Y–AD_22 | Asset done: `gym_modern` |
| Grocery store (small/dagligvare) | KIWI, Coop Mega exist as text | already covered — generate sprite for KIWI + Coop |
| Pharmacy / Apotek | mall NPC text only | standalone hovedgata, e.g. R_10 | Pedagogically relevant (helse, samfunn) |
| Bookstore / Bokhandel | mall NPC `Norli` text | standalone gågata | Library exists; bookstore is commercial twin |
| Electronics | mall NPC `Power, Elkjøp` text | could elevate one to standalone | |
| Clothing | many mall NPCs text | one standalone gågata | |
| Florist | missing | small hovedgata vacant | |
| Optician | Specsavers exists (Q_10) | already covered | |
| Jewelry / Gift / Toy | missing | rotate as small gågata vacancies | low priority |

### FOOD & BEVERAGE

| Building | Status | Slot suggestion |
|----------|--------|-----------------|
| Restaurant | missing standalone | gågata block, e.g. O–Q_5–6 |
| Fast food / Burger | missing | hovedgata or near station |
| Ice cream | missing | gågata |
| Kebab / Pizza takeaway | missing | utkant or hovedgata, e.g. V_18 |
| Brewpub | missing | gågata premium, e.g. T_2–3 |

### SERVICES

| Building | Status | Slot suggestion |
|----------|--------|-----------------|
| Bank | missing — **pedagogical priority for SSR_FD** | hovedgata, suggest M_5 or M_6 (currently vacants) |
| Post office | missing | hovedgata, near station |
| Real estate | missing | hovedgata |
| Insurance / Accounting / Law office | missing | hovedgata or near rådhus, suggest J–L_10 area |
| Travel agency | missing | gågata |
| Dentist / Doctor / Vet | Sykehus is general — no standalone | scattered hovedgata |

### AUTOMOTIVE / INDUSTRIAL

| Building | Status | Slot suggestion |
|----------|--------|-----------------|
| Gas station (ESSO) | exists ✓ | sprite needed for E–G_8–9 |
| Car wash | missing | utkant near ESSO, e.g. E_18 area |
| Auto repair | missing | utkant |
| Tire shop | missing | utkant |

### CIVIC / PUBLIC — **DECISION NEEDED: modern or legacy traditional?**

| Building | Status | Slot |
|----------|--------|------|
| Rådhus 🏛️ | exists | V–W_6–7 |
| Bibliotek 📚 | exists | Y–Z_7 |
| Sentrum VGS 🏫 | exists | AA–AB_8–9 |
| Sykehus 🏥 | exists | A–B_5–8 |
| Politi (police station) | missing | suggest near rådhus |
| Brannstasjon (fire station) | missing — `firestation` asset preloaded by BootScene but no slot | utkant suggested |
| Kirke (church) | missing | classic placement: suggest a quiet block, e.g. C_5 area |

### HOSPITALITY

| Building | Status | Slot |
|----------|--------|------|
| Hotel | exists ✓ | V_2–3 — sprite needed |
| Hostel | missing | near station, AA–AC_18 area |
| Conference venue | missing | optional, near hotel |

### ENTERTAINMENT / CULTURE

| Building | Status | Slot |
|----------|--------|------|
| Cinema | `cinema` preloaded but no slot | gågata or near plaza, e.g. R–T_5–6 |
| Theater | 🎭 emoji at W_5 only — not a real footprint | enlarge to proper 2×2 footprint |
| Museum | missing | near park or rådhus |
| Art gallery | missing | gågata, premium block |

### RESIDENTIAL / MIXED-USE

| Building | Status | Slot |
|----------|--------|------|
| Apartment buildings | many `Boliger` blocks ✓ | sprite or keep procedural? See decision in §8 |
| Townhouses (rekkehus) | not differentiated from apts | optional differentiation |
| Mixed-use commercial | implicit (mall) | Kongssenteret already covers this |

### GREEN / INFRASTRUCTURE

| Element | Status | Notes |
|---------|--------|-------|
| Park | Byparken ✓ | procedural trees — decision: sprite the park or keep procedural |
| Plaza | Rådhusplassen ✓ | procedural — keep or sprite |
| Parking | P at T_12–13 ✓ | could sprite |
| Bus stop | missing | small marker prop only |
| Train station | Stasjon ✓ | sprite needed |

---

## 7. Prioritized asset list

Naming convention: `<building_type>_<variant>` matching
`docs/ASSET_PROMPTS.json`. The five already-generated assets are marked
**[done]**.

### Batch 1 — P1 (minimum viable city, ~10 assets)

The smallest set that lets the **player's gameplay loop** feel alive: their
own shop in any of the 4 industries, plus the most obvious civic landmarks
they cannot miss.

| asset_id | building_type | size | suggested_slot | notes |
|----------|---------------|------|---------------|-------|
| `bakery_kongsvinger` **[done]** | bakery | small | T_5–6 area gågata | Player industry slot variant |
| `cafe_central` **[done]** | cafe | small | gågata premium | Player industry. Pedagogy: ML |
| `sports_shop` **[done]** | sportsshop | medium | gågata or hovedgata | Player industry. Pedagogy: ML |
| `gym_modern` **[done]** | gym | large | utkant Y–AD_22 | Player industry doesn't include gym; fallback NPC. |
| `hair_salon` **[done]** | hairsalon | small | hovedgata J–L_10 | Service NPC |
| `tech_shop` | techshop | medium | mall standalone equivalent or gågata | **Player industry — currently missing.** |
| `fashion_shop` | fashionshop | medium | gågata premium | **Player industry — currently missing.** Most VG students relate to this |
| `bank_modern` | bank | medium | M_5 hovedgata | **P1 critical: SSR_FD curriculum** |
| `radhus_modern` OR `radhus_traditional` | radhus | large | V–W_6–7 | **Decision needed** — modern or legacy? |
| `library_modern` | bibliotek | medium | Y–Z_7 | Pedagogy: ssr_ks |
| `apotek_modern` | apotek | small | R_10 hovedgata | Pedagogy: SSR + helse |

**Cost estimate**: ~11 generations × ~0.6 NOK = **~7 NOK**

### Batch 2 — P2 (full curriculum coverage, ~15 assets)

Everything needed so each curriculum module has a recognizable presence on
the map.

| asset_id | building_type | size | slot | curriculum |
|----------|---------------|------|------|------------|
| `restaurant_modern` | restaurant | medium | gågata O–Q_5–6 | ML / kultur |
| `fastfood_modern` | fastfood | small | hovedgata | ML |
| `kebab_takeaway` | kebab | small | utkant V_18 | ML |
| `bookstore_modern` | bookstore | small | gågata | ML / kultur |
| `florist_modern` | florist | small | gågata | ML |
| `electronics_modern` | electronics | medium | gågata | ML / tech-link |
| `clothing_modern` | clothing | medium | gågata | ML / fashion-link |
| `post_modern` | post | small | hovedgata near station | SSR_FD |
| `realestate_modern` | realestate | small | hovedgata | SSR_FD |
| `insurance_modern` | insurance | small | hovedgata | SSR_FD |
| `accountant_modern` | accountant | small | hovedgata near rådhus | SSR_FD / ENT |
| `law_office_modern` | law | small | hovedgata | SSR |
| `dentist_modern` | dentist | small | hovedgata | helse / SSR |
| `gas_station_modern` (ESSO) | gas | medium | E–G_8–9 | replace existing emoji |
| `train_station_modern` | station | large | AA–AC_18 | infrastructure |

**Cost estimate**: ~15 generations × ~0.6 NOK = **~9 NOK**

### Batch 3 — P3 (richness & replayability, ~10 assets)

| asset_id | building_type | size | slot |
|----------|---------------|------|------|
| `cinema_modern` | cinema | large | gågata block, e.g. R–T_5–6 |
| `theater_modern` | theater | medium | replace W_5 emoji, expand to 2×2 |
| `museum_modern` | museum | medium | near park |
| `art_gallery_modern` | gallery | small | gågata premium |
| `ice_cream_modern` | icecream | small | gågata |
| `brewpub_modern` | brewpub | medium | gågata T_2–3 |
| `car_wash_modern` | carwash | small | utkant |
| `auto_repair_modern` | autorepair | small | utkant |
| `hostel_modern` | hostel | small | near station |
| `firestation_modern` | firestation | medium | utkant |
| `police_modern` | police | medium | near rådhus |
| `church_legacy` | church | medium | (decision: modern or legacy) — quiet block |

**Cost estimate**: ~12 generations × ~0.6 NOK = **~7 NOK**

### Total
- **Batch 1**: ~7 NOK (≈11 assets, 5 done)
- **Batch 2**: ~9 NOK (≈15 assets)
- **Batch 3**: ~7 NOK (≈12 assets)
- **All three batches**: ~23 NOK total. Within the 200 NOK monthly cap by an order of magnitude.

---

## 8. Decisions needed from Espen

> Mark each ❶/❷/❸/❹ with M (modern), L (legacy traditional), B (both / mix), or N (skip). Then we encode it in `ASSET_PROMPTS.json` and proceed.

1. **❶ Civic buildings — Rådhus, Kirke, Politi, Brannstasjon, Sentrum VGS, Bibliotek, Stasjon: modern or legacy traditional?**  
   Pedagogical context: VG1–VG3 students will recognize Kongsvinger landmarks more if they look like the real ones (legacy stein/tre Norwegian style), but the rest of the city has decided on modern. A *mix* is plausible: Rådhus and Kirke as legacy traditional anchor pieces, the rest modern.

2. **❷ Apartment / Boliger blocks (≈22 blocks, ≈80 individual house emojis) — sprite per block, sprite per emoji, or keep procedural?**  
   Recommendation: keep procedural for now (cheap, fast, looks fine in iso). Generate one **`apartment_modern`** sprite for the bigger Boliger blocks and ONE **`townhouse_modern`** for the smaller ones if you want differentiation. Skip individual 🏠 sprites — too many for too little payoff.

3. **❸ Industrial assets (gas station, car wash, auto repair, tire shop) — how prominent?**  
   These are pedagogically thin (limited curriculum hooks beyond SSR_FD/SSR_MI). Recommendation: 1 prominent (ESSO replacement) + 2 small in utkant. P3 priority.

4. **❹ Park / plaza / parking — sprite or keep procedural?**  
   Recommendation: keep procedural. The current iso park (W–Y_2–3) with hand-placed trees and the Rådhusplassen plaza both look fine procedurally. Sprite cost is moderate but visual gain is small. Defer indefinitely.

5. **❺ Naming convention drift — `bakery_kongsvinger` vs `bakery`?**  
   Recommendation: use a **two-tier naming scheme**:
   - `<building_type>` = generic flagship sprite registered in `AssetManifest` (e.g. `bakery`).
   - `<building_type>_<location>` = town-specific variant (e.g. `bakery_kongsvinger` for the version with a Norwegian flag).
   - Rename `cafe_central` → `cafe`, `gym_modern` → `gym`, `hair_salon` → already canonical, `sports_shop` → already canonical.
   - Keep `bakery_kongsvinger` separate (it has the flag — variant only). Add a generic `bakery` for use in non-Kongsvinger contexts.

6. **❻ Player industry coverage — `tech` and `fashion` are missing assets entirely.**  
   Confirm we add `tech_shop` and `fashion_shop` to Batch 1. Without them the player can pick those industries but their own shop has no sprite.

7. **❼ Replace mall NPC text labels with sprites?**  
   Probably not — the text labels ARE the joke (real Norwegian brands). But: do you want the WHOLE Kongssenteret rendered as a single sprite, or kept as the current procedural block with text labels? Recommendation: keep procedural; the mall block-with-text reads well in iso and the brand humor is the point.

---

## 9. Phase-by-phase production plan

| Phase | Work | Cost | Output |
|-------|------|------|--------|
| **Phase A** (next session) | Update `ASSET_STYLE_GUIDE.md` with the "rendered 3D look in 2D format" directives from today's findings (AO, volumetric forms, material rendering, no anime, no people in buildings). Update base prompt. | 0 | New style spec |
| **Phase B** | Regenerate the 5 already-done assets with the new style. Validate on 1 first, get Espen's sign-off, then bulk-regenerate the other 4. | ~3 NOK | 5 modern AdVenture buildings |
| **Phase C** | Espen makes the 7 decisions in §8. Update `ASSET_PROMPTS.json` accordingly. | 0 | Approved scope |
| **Phase D** | Generate Batch 1 (P1, ~6 new + 5 regenerated). | ~7 NOK | Player gameplay loop visually present |
| **Phase E** | Wire sprites into `CityScene.drawBuildings()`. Add `this.add.image(...)` calls for each named building, keyed by a new `b.asset?: string` field on `BD`. Keep procedural fallback for any building without an asset. | 0 | First playable demo of modern city |
| **Phase F** | Generate Batch 2 (P2, ~15 assets). | ~9 NOK | Full curriculum coverage |
| **Phase G** | Generate Batch 3 (P3, ~12 assets). | ~7 NOK | Polish + replayability |

---

## 10. Appendix: full slot map (text)

```
Cols: A  B  C  D  E  F  G  H  I  J  (K) L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z  AA AB AC AD AE AF AG
                                                                                                            
 1                                                                       Markedsveien───────────             
 2  H  H  .  H  H  H  .  .  H  H  .  .  .  H  H  H  .  .  .  V  .  Hot Park Park Park .  H  H  .  .  .  .  . 
 3  H  H  .  H  H  H  .  .  H  H  .  .  .  H  H  H  .  .  .  V  .  Hot Park Park Park .  H  H  .  .  .  .  . 
 4 ─Parkvegen──────────────────────────────────────────────────────────────────────────────────────────────  
 5  Sy Sy .  Bo Bo Bo Bo .  H  .  .  .  V  .  V  V  V  R  R  R  T  ⛲  🎭  .  .  Kb Kb .  .  .  .  .  . 
 6  Sy Sy .  Bo Bo Bo Bo .  H  H  .  H  V  .  V  V  V  R  R  R  T  Råd Råd .  .  Kb Kb .  .  .  .  .  . 
 7 ─Fjellgata────────────────────  .                                  Råd Råd Bo Bo Bib Bib .  .  .  .  .   
 8  Sy Sy .  H  Es Es Es .  H  .  .  .  H  .  V  V  V  V  S  .  .  Pl Pl Pl Pl .  .  VGS VGS .  H  .  .  . 
 9  Sy Sy .  H  Es Es Es .  H  .  .  .  H  .  V  V  Øye Pe S  .  .  Pl Pl Pl Pl .  .  VGS VGS .  H  .  .  . 
10  .  .  .  Bo Bo Bo Bo .  H  V  V  V  H  .  V  V  Spe V  .  V  .  V  V  V  V  .  .  .  H  .  .  .  . 
11 ─Brugata──────────────────────────────────────────U─.                                                    
12 KIW .  .  KGS KGS KGS KGS .  KGS KGS KGS KGS KGS KGS KGS KGS KGS .  P  .  V  .  .  .  .  .  .  .  .  .  .  . 
13 KIW H  .  KGS KGS KGS KGS .  KGS KGS KGS KGS KGS KGS KGS KGS KGS KGS .  P  .  V  .  .  .  .  .  .  .  .  .  .  . 
14  Bo Bo .  KGS KGS KGS KGS .  Bo Bo Bo Bo .  .  Bo Bo Bo .  .  .  .  Bo Bo .  .  .  .  .  .  .  .  .  . 
15 ═Glomma═══════════════════════════════════════════════════════════════════════════════════════════════ (bridges H, U) 
16 ─Glommengata─────────────────────────────────────────────────────────────────────────────────────────── 
17 ═Jernbane═══════════════════════════════════════════════════════════════════════════════════════════════
18  Bo Bo Bo Bo .  .  .  .  Bo Bo Bo Bo .  .  .  .  .  .  .  .  .  V  .  .  .  .  Sta Sta Sta .  SSB SSB SSB
19 ─Jernbanegata─────────────────────────────────────────────────────────────────────────────────────────  
20  Bo Bo Bo Bo .  .  .  .  Bo Bo Bo Bo .  .  .  .  .  .  .  .  .  V  V  .  V  V  V  V  V  V  .  Co Co
21  Bo Bo Bo Bo .  .  .  .  Bo Bo Bo Bo .  .  .  .  .  .  .  .  .  .  V  .  ─gågata─────              Co Co
22  Bo Bo Bo Bo .  .  .  .  Bo Bo Bo Bo .  .  .  .  .  .  .  .  .  .  V  .  V  V  V  V  V  V  .  Co Co
```

Legend:
- `H` housing/Boliger
- `V` vacant rentable slot
- `Bo` Boliger block (multiple sub-units)
- `Sy` Sykehuset
- `Hot` Hotell
- `Råd` Rådhuset
- `Kb` Kongsbadet
- `Pl` Rådhusplassen
- `Bib` Bibliotek
- `VGS` Sentrum VGS
- `KIW` KIWI
- `Co` Coop Mega
- `KGS` Kongssenteret (mall)
- `P` parking
- `Sta` Stasjon
- `Es` ESSO
- `Pe` Peders
- `Spe` Specsavers
- `Øye` Øyeklinikk

(The map text is a hand-drawn approximation for navigation. The
authoritative grid is the `B[]` array in `CityScene.ts:57-128`.)
