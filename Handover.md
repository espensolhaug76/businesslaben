## 06.05.2026 — Canonical spec wired (14 sprites + 5 new generations)

### ✅ DONE THIS SESSION (final state)

City rendering now matches the canonical design spec from earlier
sessions. **14 sprite BDs wired** in `CityScene.B[]`, all corresponding
to spec-mandated landmarks.

#### Phase A — wired 4 spec-direct slots (no new assets)

| BD # | Slot                | Asset      |
|------|---------------------|------------|
| #1   | Hotell 🏨 (Byparken Hotell) | hotel      |
| #21  | Øyeklinikk          | legekontor |
| #24  | Specsavers          | optician   |
| #30  | KIWI 🛒             | kiwi       |

#### Phase B — generated 5 new canonical-spec assets and wired them

5 new prompt entries added to `docs/ASSET_PROMPTS.json` (with new
`_building_defaults` entries for `hospital_complex`, `theater`,
`pool_facility`, `gas_station`, `butcher_shop`). All 5 generated and
PASS the `bbox_w ∈ [0.70, 0.95]` + `centroid ∈ [0.45, 0.55]` rubric:

| BD # | Slot                | New asset           | bbox_w | cx    | cy    |
|------|---------------------|---------------------|--------|-------|-------|
| #4   | Sykehuset AHUS 🏥   | sykehuset           | 0.942  | 0.522 | 0.486 |
| #13  | 🎭 Rådhusteateret   | radhusteateret      | 0.916  | 0.500 | 0.503 |
| #15  | Kongsbadet 🏊       | kongsbadet          | 0.945  | 0.514 | 0.471 |
| #16  | ⛽ ESSO              | esso                | 0.876  | 0.505 | 0.477 |
| #22  | Peders Kjøtt&Fisk   | peders              | 0.758  | 0.505 | 0.501 |

`esso` rendered as the convenience-store building without visible
pumps — accepted as a P3 placeholder per spec priority.

#### Final wired set (14, matching canonical spec)

`grep -c "asset:" CityScene.ts` → **15** (14 BDs + 1 `placeSprite()`
parameter signature). `npx tsc --noEmit` clean.

| BD # | Slot              | Asset             | Origin         |
|------|-------------------|-------------------|----------------|
| 1    | Hotell 🏨         | hotel             | Phase A        |
| 3    | ⛪ Kirke          | kirke             | pre-existing   |
| 4    | Sykehuset 🏥      | sykehuset         | Phase B (new)  |
| 13   | 🎭 Rådhusteateret | radhusteateret    | Phase B (new)  |
| 14   | Rådhuset 🏛️       | radhus            | pre-existing   |
| 15   | Kongsbadet 🏊     | kongsbadet        | Phase B (new)  |
| 16   | ⛽ ESSO           | esso              | Phase B (new)  |
| 19   | 📚 Bibliotek      | bibliotek         | pre-existing   |
| 20   | Sentrum VGS 🏫    | sentrum_vgs       | pre-existing   |
| 21   | Øyeklinikk        | legekontor        | Phase A        |
| 22   | Peders            | peders            | Phase B (new)  |
| 24   | Specsavers        | optician          | Phase A        |
| 30   | KIWI 🛒           | kiwi              | Phase A        |
| 39   | 🚉 Stasjon        | jernbanestasjon   | pre-existing   |

### State on disk

- `docs/ASSET_PROMPTS.json` — 5 new building_default entries
  (hospital_complex, theater, pool_facility, gas_station, butcher_shop)
  + 5 new top-level asset entries (sykehuset, radhusteateret, kongsbadet,
  esso, peders).
- `public/assets/raw/` — 5 new PNGs added: sykehuset.png,
  radhusteateret.png, kongsbadet.png, esso.png, peders.png.
- `src/game/phaser/scenes/BootScene.ts` — `MODERN_BUILDING_ASSETS`
  extended from 31 → 36 keys.
- `src/game/assets/AssetManifest.ts` — 5 new entries for parity.
- `src/game/phaser/scenes/CityScene.ts` — 9 new `asset:` field
  applications (Phase A: 4, Phase B: 5).

### Open items handed back to user

1. **Kongssenteret architectural decision deferred.** Spec recommends
   keeping the three-block mall procedural (text labels for tenants).
   If you ever want one big anchor sprite covering D12:R14, generate
   `kongssenteret.png` via a single new pipeline run.
2. **22 generated assets remain unused** in `public/assets/raw/`,
   preloaded into the Phaser cache. Saved for a future
   neighborhood-buildings expansion. Inventory in
   `docs/CITY_SLOT_REGISTRY.md` final-tally section.
3. **SSB and Coop Mega remain procedural** — they're outside the
   canonical spec's scope. Wiring them later is a one-line edit if you
   ever want to (asset `coop_mega.png` already exists; SSB would need
   a generation, or could repurpose `bank` MED).
4. **Visual review** at `/game?skip=1` recommended to confirm the 14
   new sprites render correctly on their iso footprints. Sprite-vs-tile
   scale calibration is still TODO if anything looks off — see
   `BD.offset_x` / `offset_y` and the `placeSprite` function.

### Cost

5 new nano-banana calls × ~0.6 NOK ≈ ~3 NOK this session.
Total project session-to-date: ~12 NOK.

---

## 06.05.2026 — Reverted wirings + slot-registry workflow

### ✅ DONE THIS SESSION (final state)

Following an audit (`docs/wiring_audit.md`) that found 9 of 16 newly-placed
sprites were sitting on grass with no road frontage, we **reverted all
session-added wirings** and adopted a registry-driven placement workflow.

- **Reverted wirings.** `B[]` in `CityScene.ts` now has `asset:` only on the
  5 originals: kirke, radhus, bibliotek, sentrum_vgs, jernbanestasjon.
  Hotell, KIWI, Coop Mega, Specsavers/optician all reverted to procedural.
  All 16 BDs added by the autonomous-batch Phase 4 (and the 9 floating ones
  from the second wiring round) were removed entirely.
- **All 26 generated PNGs preserved** in `public/assets/raw/` and still
  preloaded into the Phaser cache via `BootScene.MODERN_BUILDING_ASSETS`.
  They're "ready to wire" but no BD references them yet.
- **Numbering overlay added** to `CityScene.drawBuildings()` —
  `?numbers=1` URL flag shows each BD's 1-based array index in a small dark
  rounded badge above the building. Skips plazas (`plaza:true`) and any
  BD without `name`/`grid`. Default OFF.
- **Registry doc written** at `docs/CITY_SLOT_REGISTRY.md` with one row
  per BD (70 entries), Kongssenteret expanded into per-tenant sub-rows
  (26 sub-units), an "Available unwired assets" section listing all 26
  preloaded sprites, and a "Structures we may need but haven't generated"
  section flagging multi-tile landmarks (Sykehuset, Kongssenteret as a
  single anchor, Kongsbadet, SSB, ESSO, parking) as candidates for
  dedicated anchor sprites in a future batch.

### How to use the registry

1. `npm run dev` → open `/game?skip=1&numbers=1`.
2. Each labelled building shows its index (matches the `#` column in
   `docs/CITY_SLOT_REGISTRY.md`).
3. Fill in the `Assigned asset` column for each slot you want to wire.
4. Hand the filled-in registry back to CC; CC translates assignments
   into `asset:` edits on the matching BD entries.

### Verification

- `grep -c "asset:" src/game/phaser/scenes/CityScene.ts` → **6** (5 BDs +
  1 `placeSprite()` parameter signature). Down from 26.
- `npx tsc --noEmit` → clean.

### Open items handed back to user

1. Walk the city at `/game?skip=1&numbers=1` and decide which slots to
   wire to which assets. Fill the registry table.
2. Decide whether Kongssenteret should become one anchor sprite (one
   `kongssenteret.png` covering all three blocks) or stay as three
   procedural mall envelopes with text tenants.
3. Decide whether Sykehuset, Kongsbadet, SSB, ESSO, the cinema (slot 13
   theatre + a future Kino), and parking deserve dedicated anchor sprites.
   Each is one prompt entry in `docs/ASSET_PROMPTS.json` + one pipeline
   run.

The autonomous-batch full record (Phase 1 validation, Phase 2 v2 regen,
Phase 3 Batch 2 NPC generation) lives in `AUTONOMOUS_BATCH_REPORT.md`.
The audit that triggered this revert is in `docs/wiring_audit.md`.

---

## 06.05.2026 — Autonomous asset batch (v2 regen + Batch 2 NPCs)

### ✅ DONE THIS SESSION

Three-phase autonomous batch executed. Detailed metrics in `AUTONOMOUS_BATCH_REPORT.md`.

- **Phase 1 — Validation.** Generated `kiosk` and `apotek1` with strengthened
  Phase 1 rubric (centroid alignment + relaxed `bbox_w ∈ [0.70, 0.95]` width).
  Both PASS. Discovered nano-banana's structural ceiling at 1408×768 is ~78%
  horizontal fill; centroid-alignment check works perfectly.
- **Phase 2 — v2 regeneration.** Backed up the 14 pre-existing v2 PNGs to
  `public/assets/raw/_v2_legacy/`, regenerated all 14 with the validated
  tight-crop prompt. **13 PASS** (12 first-try, 1 second-try). **kirke FAILS
  numerically** (w=0.539, cy=0.658) due to tall-narrow silhouette mismatch with
  1.83:1 canvas — qualitatively excellent, structurally unsuitable for the
  rubric. Recommend per-asset offset_y or post-rembg auto-crop.
- **Phase 3 — Batch 2 NPCs.** Generated 15 new NPC competitors per the
  CITY_INVENTORY-aligned plan: 3 grocery (kiwi, coop_mega, rema), 3 food
  (restaurant_modern, fast_food, brewpub), 1 books (bokhandel), 4 services
  (bank, post, florist, optician), 2 health (legekontor, dentist), 1 hotel,
  1 cinema. **All 15 PASS**, with two marginal-over-fills (kiwi 0.960,
  fast_food 0.957) accepted as preferred failure mode.
- **Phase 4 — Wiring.** `MODERN_BUILDING_ASSETS` in
  `src/game/phaser/scenes/BootScene.ts` extended from 14 → 31 keys (all
  Batch 2 PNGs preloaded into the Phaser cache, even ones not yet placed).
  AssetManifest.ts updated for documentation parity (orphaned file, no
  imports).
- **Phase 4b — Audit + cleanup.** Initial wiring pushed 25 BDs but a road
  /BD-grid audit (see `docs/wiring_audit.md`) found 9 of the 16 new BDs
  were placed on grass with no road frontage — the city looked chaotic in
  `/skip=1`. Cleanup pass (this commit):
  - Removed 9 floating BDs entirely: apotek1, bank, dentist, bokhandel,
    florist, fast_food, brewpub, plus florist+brewpub reuse copies. Their
    generated PNGs **stay** in `public/assets/raw/` for future placement.
  - Removed `asset:` field from KIWI and Coop Mega — these are chain stores
    that conceptually belong as tenants inside Kongssenteret (a multi-slot
    "anchor structure"), not as standalone buildings. Reverted to
    procedural text labels for now. See "Future architectural work" below.
  - Final wired set: **14 sprites** (`grep -c "asset:" CityScene.ts` = 15;
    14 BDs + 1 `placeSprite()` parameter signature).
  - `tsc --noEmit` clean.

### Final wired BDs (14)

  - **5 v2 originals (kept):** kirke, radhus, bibliotek, sentrum_vgs, jernbanestasjon
  - **2 wired this session into pre-existing BDs:** Hotell→hotel,
    Specsavers→optician (pattern-match)
  - **7 new VALID landmark BDs (this session):** Rema 1000, Posten, Narvesen
    (kiosk), Legekontor, Spiseri (restaurant_modern), Kino (cinema 2×2),
    7-Eleven (kiosk reuse)

### Generated-but-unused assets in `public/assets/raw/`

Ready for placement when validated road-frontage slots become available:
- `apotek1.png` — wants medical-district slot
- `bank.png` — wants commercial-street slot
- `dentist.png` — wants residential-support slot
- `bokhandel.png` — wants commercial-street slot
- `florist.png` — wants commercial-street slot
- `fast_food.png` — wants high-traffic slot (near school?)
- `brewpub.png` — wants entertainment-cluster slot
- `kiwi.png` / `coop_mega.png` — held for "neighborhood-branch" placements
  if pedagogically useful (separate from the Kongssenteret labels)

### Future architectural work

1. **Multi-slot anchor structures.** Kongssenteret is a single BD that
   contains a grid of named tenants (KIWI, H&M, Norli, Apotek 1, etc.).
   To represent it visually, we need a **parent** sprite (e.g.
   `kongssenteret.png`) that depicts the mall envelope, with the tenant
   labels rendered procedurally on top OR as smaller child sprites. Same
   pattern would work for Sykehuset (single sprite for the hospital
   complex, no need for multiple children). Per-tenant sprites for KIWI /
   Coop / Apotek 1 etc. could later become "neighborhood-branch" overlays
   placed in utkant zones, distinct from their mall-tenant labels.
2. **Sprite scale calibration.** Each modern PNG is 1408×768 but iso
   tiles are 128×64. The current `placeSprite` (CityScene.ts:400) anchors
   bottom-center but does no per-asset scale tuning — sprites visually
   intrude on adjacent tiles. Two options:
   - Add `scale?: number` to BD interface, calibrate per-asset.
   - Pre-process the PNGs (post-rembg auto-crop + canvas standardisation)
     so all assets land at a uniform footprint. Probably the better
     long-term fix.
3. **Per-asset offset_x/offset_y calibration.** `BD` already has these
   fields (added 2026-05-02) but they're unset for all current sprites.
   At least kirke needs a positive `offset_y` because its centroid sits
   below the canvas centre (see `AUTONOMOUS_BATCH_REPORT.md` for the
   numbers).
4. **V-grid procedural-slot sprite wiring.** The gagata/hovedgata/utkant
   V-slots still render as procedural boxes when rented by NPC competitors.
   Wiring the 7 unused Batch 2 NPCs into that selection logic is a
   separate task — search for "NPC" / "competitor" in `src/game/`.

### 📂 STATE

- `docs/ASSET_PROMPTS.json` — `_meta.base_style` and `_meta.base_style_legacy`
  rewritten with strict 5-rule framing block. All 16 `_building_defaults`
  entries sanitized of external-landscaping references that contradicted
  rule 3 (no vegetation outside the wall plane). 13 new defaults added
  (grocery, restaurant, fastfood, brewpub, bookstore, bank, postoffice,
  florist, optician, doctorsoffice, dentist, hotel, cinema). 31 top-level
  asset entries total (14 v2 + 17 Batch 2).
- `public/assets/raw/_v2_legacy/` — 14-PNG backup of pre-batch v2 set.
- `public/assets/raw/_phase1_*` — 4 Phase 1 debugging snapshots
  (3 kiosk iterations + apotek1 first-try).
- `scripts/_batch_*.sh` — three new pipeline helpers (backup, compose, eval).
  Reusable for future batches.

### 🟡 OPEN — handed off to user

1. **kirke** — passes visually, fails numerically. Decide whether to
   per-asset `offset_y: +0.08` in `BD`, accept as-is, or add post-rembg
   auto-crop to `clean-asset.sh` as a general fix for tall narrow buildings.
2. **V-slot competitor selection** — see "Future architectural work" §4 above.
3. **Visual review** — recommend opening `/game?skip=1` and walking the
   city to confirm the 14 regenerated v2 sprites look correctly aligned
   on their tiles compared to the `_v2_legacy/` backup.

### 💰 COST

~32 nano-banana calls × ~0.25 NOK ≈ 8 NOK total for the batch.

---

## 02.05.2026 — Sprite anchor/composition issue identified

### 🔴 PROBLEM
Phase E wired 14 v2 modern building sprites into `CityScene` (5 named landmarks, 9 awaiting use). Visual inspection shows sprites are misaligned within their iso slots:
- Buildings appear shifted within the allocated tile, often overflowing into adjacent tiles
- Root cause is **NOT** sprite scale (already at 1.0) — it's **anchor / composition**
- NB2-generated v2 PNGs include surrounding sidewalks, planters outside the building's structural outline, and ground-plane extension beyond the building's footprint
- When placed at `setOrigin(0.5, 1.0)` on an iso tile, the building's *visual* center doesn't match the canvas/footprint geometric center

### ✅ DONE THIS SESSION
- `docs/ASSET_PROMPTS.json` `_meta.base_style` and `_meta.base_style_legacy` updated with explicit tight-crop block:
  - Building must fill 80–90% of canvas
  - NO sidewalk, NO ground extension, NO landscaping outside the structural outline
  - Only directly-attached integral landscaping (window planters built into walls) allowed
  - All other area must be pure white #FFFFFF (so rembg yields clean cutout)
  - Building visual center = canvas geometric center
- `docs/ASSET_STYLE_GUIDE.md` documents the new constraint in §1a
- `BD` interface in `CityScene.ts` gains optional `offset_x?: number; offset_y?: number` (defaults 0). `placeSprite` accepts and applies the offset. No values populated yet — calibration deferred.

### 🟡 OPEN — needs decision
- **Future generations** (Batch 2 NPCs, any v2 regen) will use the tight-crop prompt automatically.
- **Existing 14 v2 building PNGs** pre-date the new prompt and exhibit the alignment problem. Two paths:
  1. **Live with current alignment** until Batch 2 validates the new prompt, then regenerate v2 in one batch (~3 NOK API cost). Lower risk — single regeneration once the prompt is proven.
  2. **Regenerate v2 now** to confirm the new prompt fixes the alignment. Faster feedback but blind validation (tight-crop hasn't been visually verified yet).
- Recommendation: path 1 (validate on Batch 2 first). Until then, calibrate `offset_x`/`offset_y` per-asset on the existing 14 if a specific landmark's misalignment is blocking dev work.

---

## 28.04.2026 — Asset pipeline + 5 starter assets generated

### ✅ COMPLETED
- nano-banana MCP installed at `C:\Users\espen\.mcp-tools\`
  - Uses `gemini-3.1-flash-image-preview` (Nano Banana 2)
  - API key in `.claude.json` env block
  - Tier 1 / Postpay billing, 200 NOK monthly spend cap set
- rembg pipeline at `~/.venvs/rembg` with U²-Net model
- `scripts/clean-asset.sh` — single-file background removal (works)
- `scripts/generate-asset.sh` — composes prompts from JSON
- `.claude/commands/asset.md` — `/asset <id>` slash command (full orchestration)
- `docs/ASSET_STYLE_GUIDE.md` — modern Norwegian commercial style DNA
- `docs/ASSET_PROMPTS.json` — 5 starter assets defined
- `scripts/README.md` — workflow documentation
- Persistent permissions in `.claude/settings.local.json`
- 5 starter assets generated: `bakery_kongsvinger`, `cafe_central`, `hair_salon`, `sports_shop`, `gym_modern`
- Background removal verified end-to-end
- Total API cost so far: ~3 NOK

### 🎯 STYLE FINDINGS
- Modern Norwegian commercial direction is correct (flat roofs, glass, planters)
- BUT current outputs are too 2D-illustrated / anime-light
- Hay Day / Supercell target is "rendered 3D look in 2D format" — NOT flat illustration
- Faces (when generated) are too anime-skissert, not karikert/Supercell-aktige
- Scene elements (hedges, furniture, glass) lack material rendering, ambient occlusion, volumetric depth

### 🟡 NEXT SESSION (TOP PRIORITY)
- Update `ASSET_STYLE_GUIDE.md` base prompt to push toward "rendered 3D look in 2D format":
  - Add: ambient occlusion, sculpted volumetric forms, material-quality rendering (glass reflections, wood grain, metal speculars, foliage detail)
  - Add: "NOT flat illustration, NOT anime, NOT cel-shaded — Pixar-style 3D captured in 2D"
  - Lock: NO people in buildings (people will be separate animated sprites later)
- Regenerate all 5 starter assets with updated style (~4 NOK)
- Verify material differentiation, AO, volumetric lighting, hedge detail

### 🟡 ALSO OPEN
- Decision: landmark buildings (rådhus, kirke) — modern or legacy traditional?
- Phaser integration: how to load/place from `public/assets/raw/`
- Standardize Businesslaben module UI patterns (still pending)
- Future: separate sprite pipeline for animated people/customers

---

## 28.04.2026 — Nano Banana 2 + rembg pipeline fullført

✅ **Bilde-generering virker:**
- nano-banana-mcp installert ved C:\Users\espen\.mcp-tools\
- Bruker gemini-3.1-flash-image-preview (NB2)
- API-nøkkel i .claude.json env-blokk

✅ **Bakgrunnsfjerning virker:**
- rembg venv: ~/.venvs/rembg (CPU backend, U²-Net)
- Script: scripts/clean-asset.sh
- Output: public/assets/raw/
- Test bekreftet: bakery_kongsvinger_test.png har ekte transparens

🟡 **Gjenstår:**
- scripts/clean-batch.sh (batch-prosessering)
- scripts/README.md (dokumentasjon)

🎯 **Workflow for nye assets:**
1. CC: "Use nano-banana to generate [prompt]"
2. WSL: scripts/clean-asset.sh <input> <output_name.png>
3. Resultat i public/assets/raw/
