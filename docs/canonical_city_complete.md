# Canonical city — complete

**Date:** 2026-05-06
**State:** 14 sprite BDs wired in `CityScene.B[]`, matches canonical
spec. tsc clean.

I can't drive a browser from this CLI to capture a real PNG. Below is
the description of what `/game?skip=1` should render.

---

## Sprite buildings (14 — all from canonical spec)

### Northern landmark cluster (rows 2–7)

| Where (col, row)     | Sprite           | Asset            |
|----------------------|------------------|------------------|
| _A,5 → _B,8 (2×4)    | Sykehuset AHUS 🏥 | sykehuset        |
| _R,2 → _S,3 (2×2)    | ⛪ Kirke         | kirke            |
| _V,2 → _V,3 (1×2)    | Hotell 🏨        | hotel            |
| _V,5                 | ⛲ Fontene       | _procedural_     |
| _V,6 → _W,7 (2×2)    | Rådhuset 🏛️      | radhus           |
| _W,5                 | 🎭 Rådhusteateret | radhusteateret  |
| _Y,7 → _Z,7 (1×2)    | 📚 Bibliotek     | bibliotek        |
| _Z,5 → _AA,6 (2×2)   | Kongsbadet 🏊    | kongsbadet       |

### Commercial / civic row (rows 8–10)

| Where (col, row)     | Sprite           | Asset            |
|----------------------|------------------|------------------|
| _AA,8 → _AB,9 (2×2)  | Sentrum VGS 🏫   | sentrum_vgs      |
| _E,8 → _G,9 (3×2)    | ⛽ ESSO           | esso             |
| _Q,9                 | Øyeklinikk       | legekontor       |
| _R,9                 | Peders           | peders           |
| _Q,10                | Specsavers       | optician         |

### South of city centre (rows 12+)

| Where (col, row)     | Sprite           | Asset            |
|----------------------|------------------|------------------|
| _A,12 → _A,13 (1×2)  | KIWI 🛒          | kiwi             |
| _AA,18 → _AC,18 (1×3)| 🚉 Stasjon       | jernbanestasjon  |

### Procedural (text labels with colored boxes)

Everything else, including:
- **Kongssenteret** mall — 3 envelope blocks at D12:G14, I12:N13, O12:R13,
  with text-labelled tenants (Elkjøp, H&M, Norli, Apotek 1, Vinmonopolet,
  …). Per spec: keep procedural.
- **SSB** at AE18:AG18 — outside canonical spec, procedural.
- **Coop Mega** at AF20:AG22 — outside canonical spec, procedural.
- **Parkering** at T12:T13.
- **Rådhusplassen plaza** at V8:Y9.
- **All TIL LEIE V-grid rentables** (21 BDs).
- **All Boliger housing** (27 BDs, scattered).

---

## What you should NOT see

- Any sprite-rendered building in a "floating on grass" position. All
  14 wired sprites correspond to canonical spec slots that already had
  road frontage.
- The 22 unused PNGs (apotek1, kiwi tenant variant, brannstasjon, etc.)
  — they're preloaded but no BD references them.

---

## Verification commands

```sh
# Wired count
grep -c "asset:" src/game/phaser/scenes/CityScene.ts
# Should print 15 (14 BDs + 1 placeSprite parameter)

# List all wired BDs
grep "asset:" src/game/phaser/scenes/CityScene.ts | grep -v placeSprite
# Should print 14 lines

# TypeScript
npx tsc --noEmit
# Should print nothing
```

---

## How to capture a real screenshot

```sh
npm run dev
# open http://localhost:5173/game?skip=1
# wait for [BootScene] complete in the console — should report
#   "36 modern keys IN cache" (was 31 before this session's +5)
# OS screenshot tool → save to docs/canonical_city_complete.png
```

If 14 sprite buildings render at the cells listed above and the rest of
the city shows procedural colored boxes with text, the canonical-spec
wiring is correct.
