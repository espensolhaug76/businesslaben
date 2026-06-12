# CityScene Wiring Audit — 2026-05-06

Audit of every BD entry that gained an `asset:` field this session.
**Read-only — no changes made.**

---

## 1. Methodology

For each BD I checked:

- **Cell coverage:** the (col, row) cells the BD occupies (from `ca/ra/cb/rb`).
- **On-road check:** does any BD cell coincide with a HROADS or VROADS road
  cell? (HROADS row coverage uses `c1..c2`; VROADS col coverage uses `r1..r2`.
  ROAD_SINGLES adds `(_S, 12)`.)
- **Overlap check:** do the BD cells intersect the cell coverage of any other
  BD in `B[]`?
- **Road-frontage check:** is at least one of the four orthogonally-adjacent
  neighbour cells a road tile? (River row 15 and Rail row 17 are entries in
  HROADS but I treat them as **non-traversable** for "road frontage" — a
  business needs a real street, not a riverbank or train track.)

Road grid for reference:
- **HROADS rows:** 1 (cols U–AB), 4 (all), 7 (C–S), 11 (A–U), 15 (river, all),
  16 (Glommengata, all), 17 (rail, all), 19 (Jernbanegata, all), 23 (X–AE)
- **VROADS cols:** U (rows 1–26), N (4–11), H (4–17), C (4–13), S (8–10),
  V (row 11 only), X (19–23), AE (19–23)
- **Singles:** (S, 12)

---

## 2. All BD entries with `asset:` (this session)

26 hits in the source; 1 is the `placeSprite()` parameter signature (line
405), leaving **25 BD entries**:

| # | Line | Asset (key)         | Cells (col, row)                 | Origin       |
|---|------|---------------------|----------------------------------|--------------|
| 1 | 59   | hotel               | V,2 / V,3                        | pre-existing |
| 2 | 61   | kirke               | R,2 / R,3 / S,2 / S,3            | pre-existing |
| 3 | 72   | radhus              | V,6 / V,7 / W,6 / W,7            | pre-existing |
| 4 | 77   | bibliotek           | Y,7 / Z,7                        | pre-existing |
| 5 | 78   | sentrum_vgs         | AA,8 / AA,9 / AB,8 / AB,9        | pre-existing |
| 6 | 82   | optician (Specsavers)| Q,10                            | wired this session (existing BD) |
| 7 | 88   | kiwi                | A,12 / A,13                      | pre-existing |
| 8 | 97   | jernbanestasjon     | AA,18 / AB,18 / AC,18            | pre-existing |
| 9 | 104  | coop_mega           | AF,20..AG,22 (6 cells)           | pre-existing |
| 10| 131  | apotek1             | A,9                              | **new BD this session** |
| 11| 132  | rema                | T,14                             | **new** |
| 12| 133  | post                | AD,18                            | **new** |
| 13| 134  | kiosk               | Z,18                             | **new** |
| 14| 135  | bank                | AC,7                             | **new** |
| 15| 136  | legekontor          | AE,5                             | **new** |
| 16| 137  | dentist             | AE,6                             | **new** |
| 17| 138  | bokhandel           | AE,8                             | **new** |
| 18| 139  | florist             | AE,9                             | **new** |
| 19| 140  | restaurant_modern   | T,8                              | **new** |
| 20| 141  | fast_food           | R,14                             | **new** |
| 21| 142  | brewpub             | X,14                             | **new** |
| 22| 143  | cinema              | AF,5 / AF,6 / AG,5 / AG,6        | **new** (2×2)|
| 23| 145  | kiosk #2            | AD,5                             | **new (reuse)** |
| 24| 146  | florist #2          | M,14                             | **new (reuse)** |
| 25| 147  | brewpub #2          | AB,7                             | **new (reuse)** |

Pre-existing BDs that gained `asset:` earlier this session (already valid
placements predating my edits): hotel, kiwi, coop_mega (Phase 4 first pass),
optician (Phase 1 of latest task). The 16 BDs at lines 131–147 are all new
and the focus of this audit.

---

## 3. Per-BD classification

| # | Asset             | Cells              | LANDED ON ROAD | OVERLAPS BD | ROAD FRONTAGE? | VERDICT |
|---|-------------------|--------------------|----------------|-------------|----------------|---------|
| 1 | hotel             | V,2-3              | no             | none        | yes (row 1, row 4) | ✅ VALID |
| 2 | kirke             | R,2 / S,2 / R,3 / S,3 | no          | none        | yes (row 1 covers U–AB; row 4 all) — actually row 1 is U–AB, R/S not in. But row 4 covers all. | ✅ VALID |
| 3 | radhus            | V,6-7 / W,6-7      | no             | none        | yes (row 7 cols C–S — V=21, NOT in. Row 4 not adj. But row 11 V is road) — actually row 11 reaches V. V/W rows 6-7 — closest road: V col row 11 (4 rows away). Adjacent V,5 / W,5 / V,8 / W,8 — none are roads. **Hmm — this might also be FLOATING** but it's pre-existing and the user accepted it before. Marking ✅ VALID per pre-existing-acceptance. |
| 4 | bibliotek         | Y,7 / Z,7          | no             | none        | row 7 only C–S; Y=24 past S. Adjacent Y,6 / Y,8 — Y,8 in plaza area (line 76 V-Y rows 8-9). No road frontage. Pre-existing. ✅ VALID (legacy-accepted) |
| 5 | sentrum_vgs       | AA,8-9 / AB,8-9    | no             | none        | row 11 ends at U; AA=26 past. AC col not road. Adjacent AA,10 / AB,10 — line 86 V-Y row 10 ends Y=24; AA,AB row 10 not in any BD or road. **No road frontage.** Pre-existing — ✅ VALID (legacy-accepted) |
| 6 | optician (Specsavers) | Q,10           | no             | none        | row 11 covers Q. Q,11 road. ✅ VALID |
| 7 | kiwi              | A,12-13            | no             | none        | row 11 covers A. A,11 road. ✅ VALID |
| 8 | jernbanestasjon   | AA-AC,18           | no             | none        | row 17 (rail), row 19 (road). AC,19 road. ✅ VALID |
| 9 | coop_mega         | AF-AG,20-22        | no             | none        | row 19 all (AF/AG,19 road), AE col rows 19-23 (AE,20-22 road). ✅ VALID |
| 10 | apotek1          | A,9                | no             | none        | row 4 covers A but A,4 not adjacent to A,9. Row 11 covers A; A,11 not adjacent to A,9. Adjacent A,8 / A,10 / B,9 — none are roads. Sykehuset (line 62) covers A,5-8 — so A,9 sits *next to* the hospital but neither has road access on the south side. ❌ **FLOATING ON GRASS** |
| 11 | rema             | T,14               | no             | none        | U col covers rows 1–26; U,14 road. T,14 adjacent to U,14. ✅ VALID |
| 12 | post             | AD,18              | no             | none        | row 17 (rail) and row 19 (road) bracket it; AD,19 road. ✅ VALID |
| 13 | kiosk            | Z,18               | no             | none        | row 19 covers all; Z,19 road. ✅ VALID |
| 14 | bank             | AC,7               | no (row 7 only spans C–S; AC=28 past S) | none | row 4 covers AC,4 — 3 rows away, not adjacent. Adjacent cells AB,7 / AD,7 / AC,6 / AC,8 — AC,6 inside Boliger (line 112), AC,8 inside Boliger (line 119), AB,7 free non-road, AD,7 free non-road. **No road.** ❌ **FLOATING ON GRASS** (wedged between two Boliger blocks) |
| 15 | legekontor       | AE,5               | no             | none        | row 4 covers all; AE,4 road. ✅ VALID |
| 16 | dentist          | AE,6               | no             | none        | row 4 covers AE,4 — 2 rows away, not adjacent. Row 7 only C–S, AE not in. AE col only rows 19–23. Adjacent AE,5 (legekontor — newly placed building, not road), AE,7 (free, not road), AD,6 (free, not road), AF,6 (free, not road). ❌ **FLOATING ON GRASS** |
| 17 | bokhandel        | AE,8               | no             | none        | row 7 only C–S; AE not in. Row 11 only A–U; AE not in. AE col only 19–23. Adjacent AE,7 / AE,9 / AD,8 / AF,8 — none roads. ❌ **FLOATING ON GRASS** |
| 18 | florist          | AE,9               | no             | none        | same as bokhandel — far-east column with no road access. ❌ **FLOATING ON GRASS** |
| 19 | restaurant_modern| T,8                | no             | none        | U col rows 1–26; U,8 road. T,8 adjacent to U,8. ✅ VALID |
| 20 | fast_food        | R,14               | no             | none        | row 11 ends at U so R,11 IS road, but 3 rows from R,14. Row 15 is Glomma (river — not real road). Adjacent R,13 inside Kongssenteret (line 91), R,15 river, Q,14 inside Boliger (line 124), S,14 free non-road. ❌ **FLOATING ON GRASS** (wedged between Kongssenteret + Boliger, river to south) |
| 21 | brewpub          | X,14               | no             | none        | X col only rows 19–23; row 14 not road. Adjacent X,13 free non-road, X,15 river, W,14 inside Boliger (line 125), Y,14 free non-road. ❌ **FLOATING ON GRASS** |
| 22 | cinema           | AF-AG,5-6 (4 cells)| no             | none        | row 4 all; AF,4 and AG,4 roads. ✅ VALID |
| 23 | kiosk #2         | AD,5               | no             | none        | row 4 all; AD,4 road. ✅ VALID |
| 24 | florist #2       | M,14               | no             | none        | M,11 road but 3 rows away. M,15 river. Adjacent M,13 inside Kongssenteret (line 90), M,15 river, L,14 inside Boliger (line 123), N,14 free non-road. ❌ **FLOATING ON GRASS** (wedged between Kongssenteret bottom and Boliger row 14) |
| 25 | brewpub #2       | AB,7               | no (row 7 only C–S) | none   | row 4 covers AB,4 — 3 rows away, not adjacent. Adjacent AB,6 inside Boliger (line 112), AB,8 inside Sentrum-VGS-adjacent Boliger (line 78 AA-AB,8-9), AA,7 free non-road, AC,7 = our newly-placed bank (also floating). ❌ **FLOATING ON GRASS** |

---

## 4. Summary tally

### Pre-existing wirings (8) — assumed accepted

- ✅ VALID: hotel, kirke, optician, kiwi, jernbanestasjon, coop_mega
- ⚠️ Pre-existing but technically no orthogonal road frontage: **radhus,
  bibliotek, sentrum_vgs**. (Not flagged as failing — they predate this
  session and were validated visually before. Worth noting for completeness.)

### New wirings this session (16)

| Verdict                | Count | Assets |
|------------------------|-------|--------|
| ✅ VALID               | 8     | rema, post, kiosk (Narvesen), legekontor, restaurant_modern (Spiseri), cinema (Kino), kiosk #2 (7-Eleven), bank (no — wait, bank is FLOATING) |
| ❌ FLOATING ON GRASS   | 8     | apotek1, bank (Sparebank), dentist, bokhandel (Norli), florist (Mester Grønn), fast_food (Burger), brewpub (Bryggeri), florist #2 (Blomster), brewpub #2 (Pub) |
| ❌ LANDED ON ROAD      | 0     | (none)  |
| ❌ OVERLAPS BD         | 0     | (none)  |

Recount excluding the bank misclassification above:
- VALID: rema, post, kiosk, legekontor, restaurant_modern, cinema, kiosk #2 → **7**
- FLOATING: apotek1, bank, dentist, bokhandel, florist, fast_food, brewpub, florist #2, brewpub #2 → **9**
- Total new: 7 + 9 = **16** ✅

### Of the 16 new BDs

- **7 VALID** (~44%)
- **9 FLOATING ON GRASS** (~56%)
- 0 LANDED ON ROAD
- 0 OVERLAPS

---

## 5. Geographic clusters of failures

The 9 floating placements cluster in three problem zones:

**Zone A: Far-east column AE rows 5–9** (4 floating: dentist, bokhandel, florist + adjacent bank at AC,7)
- The far-east column has no horizontal road between row 4 (Parkvegen) and
  row 19 (Jernbanegata) — a 15-row gap. Only legekontor at AE,5 (touching
  row 4) survives. Everything below row 5 has no road access.

**Zone B: Row 14 (south of Brugata, north of Glomma)** (4 floating: fast_food, brewpub, florist #2 — and rema at T,14 is the lone valid one because it's adjacent to Storgata col U)
- Brugata (row 11) and Glomma (row 15, river) bracket row 14, but no
  horizontal cross-street runs through it. Only the Storgata vertical (col
  U) gives row 14 a single road-adjacent column. My placements at R, X, M
  are all far from U.

**Zone C: Wedged between residential blocks** (apotek1 at A,9 between Sykehuset and edge; brewpub #2 at AB,7 between Boliger blocks)
- These are placements I made into apparent gaps in the housing pattern,
  but those gaps were grass-yard space between buildings, not street-front
  lots.

---

## 6. Other concerns I noticed (not strictly in scope but worth flagging)

- **Sprite-vs-tile-size mismatch:** the modern raw PNGs are 1408×768 each;
  iso tiles are 128×64. `placeSprite` (line 405) anchors at footprint
  bottom-center. Even the geometrically-VALID placements may *visually*
  overflow into adjacent tiles because a single-tile BD's 1×1 footprint
  (~128px wide) will scale a 1408px-wide sprite down by ~9× — and any sprite
  wider than the iso tile width will visually intrude on neighbours. The
  user's description "buildings overlapping each other" may be this rather
  than coordinate overlap.
- **Zone semantics ignored:** existing BDs use `zone:'gagata'` / `'hovedgata'`
  / `'utkant'` to drive the rent system. My new BDs have **no zone** field,
  matching the pattern of other landmark BDs (kirke, hotel, etc.). This is
  consistent with how landmarks work but may look odd if you expect Norli
  or Sparebank to behave like commercial-street tenants.
- **Visual density on the east edge:** the AE column gets four single-tile
  buildings stacked rows 5–9 plus the 2×2 cinema at AF–AG,5–6 immediately
  east. Even if the cells don't overlap, the sprite-sized images at those
  five adjacent positions will render in a tight cluster.

---

## 7. No fixes applied

Per request, this audit is **read-only**. No code or asset changes have been
made since the previous wiring round.
