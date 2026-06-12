# Post-cleanup state — `/game?skip=1`

**Date:** 2026-05-06
**Cleanup commit:** removed 9 floating BDs, removed `asset:` from KIWI and Coop Mega.

I can't capture a screenshot from this CLI environment. Below is what should be visible when the user opens `/game?skip=1` after this cleanup, plus the procedural-vs-sprite breakdown to verify against.

---

## What you should see

### Sprite buildings (14 total — every one with road frontage)

**North half of city, north of Glomma:**

| Where (col, row)         | Sprite name      | Asset key          | Notes |
|--------------------------|------------------|--------------------|-------|
| _R, 2-3 / _S, 2-3 (2×2)  | ⛪ Kirke         | kirke              | pre-existing |
| _V, 2-3 (1×2)            | Hotell 🏨        | hotel              | pre-existing |
| _AD, 5                   | 7-Eleven 🍫      | kiosk              | new |
| _AE, 5                   | Legekontor 🩺    | legekontor         | new |
| _AF–_AG, 5-6 (2×2)       | Kino 🎬          | cinema             | new |
| _V, 6-7 / _W, 6-7 (2×2)  | Rådhuset 🏛️      | radhus             | pre-existing |
| _Y, 7 / _Z, 7 (1×2)      | 📚 Bibliotek     | bibliotek          | pre-existing |
| _T, 8                    | Spiseri 🍽️       | restaurant_modern  | new |
| _AA–_AB, 8-9 (2×2)       | Sentrum VGS 🏫   | sentrum_vgs        | pre-existing |
| _Q, 10                   | Specsavers       | optician           | new (pattern-match) |
| _T, 14                   | Rema 1000 🛒     | rema               | new |

**South half, around the train station:**

| Where (col, row)         | Sprite name      | Asset key          | Notes |
|--------------------------|------------------|--------------------|-------|
| _Z, 18                   | Narvesen 🍫      | kiosk              | new |
| _AA–_AC, 18 (1×3)        | 🚉 Stasjon       | jernbanestasjon    | pre-existing |
| _AD, 18                  | Posten 📮        | post               | new |

### Procedural-text-label buildings (no sprite — colored box with name)

These should render as colored rectangles with a text label, NOT as sprites:

- **KIWI 🛒** at _A, 12-13 (revoked from sprite — back to procedural box)
- **Coop Mega 🛒** at _AF–_AG, 20-22 (revoked from sprite — back to procedural box)
- All Kongssenteret blocks (Elkjøp, H&M, Norli, Apotek 1, Vinmonopolet, etc.)
- Sykehuset, Kongsbadet, ESSO, SSB, P (parking), Specsavers' nearby
  Peders/Øyeklinikk, Sparebank-area Boliger blocks
- All `🏠` Boliger grids
- All vacant V-slots (gagata, hovedgata, utkant zones)

---

## What you should NOT see

The 9 BDs I removed in cleanup. None of these should render — neither as
sprites nor as procedural boxes:

| Was at  | Was named         | Why removed |
|---------|-------------------|-------------|
| _A, 9   | Apotek 1 💊       | floating between Sykehuset and grass, no road |
| _AC, 7  | Sparebank 🏦      | east of Fjellgata's S-col endpoint, no road |
| _AE, 6  | Tannlege 🦷       | east-edge gap row 5–9 has no horizontal road |
| _AE, 8  | Norli 📚          | same |
| _AE, 9  | Mester Grønn 💐   | same |
| _R, 14  | Burger 🍔         | wedged between Kongssenteret and Boliger row 14 |
| _X, 14  | Bryggeri 🍺       | east of W Boliger, only river south |
| _M, 14  | Blomster (florist)| wedged between Kongssenteret bottom and Boliger |
| _AB, 7  | Pub (brewpub)     | between AB-AC and AA-AB Boliger blocks |

The _underlying_ asset PNGs (apotek1.png, bank.png, dentist.png,
bokhandel.png, florist.png, fast_food.png, brewpub.png) are still in
`public/assets/raw/` — they're **preloaded** into the Phaser cache
(BootScene.MODERN_BUILDING_ASSETS still lists them) but no BD references
them, so they don't render anywhere.

---

## Verification commands

```sh
# Count sprite-wired BDs (expect 15: 14 BDs + 1 placeSprite signature)
grep -c "asset:" src/game/phaser/scenes/CityScene.ts

# Confirm KIWI / Coop Mega are procedural again
grep -E "(KIWI|Coop Mega)" src/game/phaser/scenes/CityScene.ts | grep -v asset

# Confirm none of the removed assets are referenced in any BD
grep -E "asset:'(apotek1|bank|dentist|bokhandel|florist|fast_food|brewpub)'" src/game/phaser/scenes/CityScene.ts
# (should print nothing)

# TypeScript
npx tsc --noEmit
# (should print nothing)
```

---

## How to capture a real screenshot

I can't drive a browser from this CLI. To get a real `post_cleanup.png`:

1. `npm run dev` (or whatever the dev-server command is)
2. Open `http://localhost:5173/game?skip=1`
3. Wait for `[BootScene] complete` in the console (all 31 modern keys
   should resolve into the cache).
4. Use the OS screenshot tool, save to `docs/post_cleanup.png`.

If the 14 sprite buildings render in the cells listed above and the rest of
the city shows procedural colored boxes, the cleanup is correct.
