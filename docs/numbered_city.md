# Numbered city — `/game?skip=1&numbers=1`

**Date:** 2026-05-06
**Why this file is markdown:** I can't drive a browser from this CLI to
capture a real PNG. The user requested either a screenshot OR a markdown
description. Below is the description.

---

## What you should see when you open the URL

After loading, every labelled building has a **small dark rounded
badge** above it with a white number. The number matches the `#` column
in `docs/CITY_SLOT_REGISTRY.md`.

### Style of the badge

- Background: rounded rectangle, dark slate (`#1a1a1a`), 70% opacity.
- Width: 18px (single-digit), 24px (two-digit), 30px (three-digit).
- Height: 14px.
- Text: white, 9px Outfit bold, centered.
- Position: directly above the building's existing label
  (header / name / symbol), at `center.y - floors*FH - 14`.
- Depth: building depth + 100 — drawn above sprites and labels but below
  any future HUD overlays.

### Which BDs get numbered

- **Numbered (68 BDs):** every BD in `B[]` that has a `name` or a `grid`.
- **Skipped (2 BDs):**
  - `#18` Rådhusplassen (`plaza:true`).
  - In principle any BD without a `name` and without a `grid`. Currently
    none, so just the plaza gets skipped.

### Sprite buildings (5 visible)

These render as their PNG sprite, with the number badge above:
- **#3** ⛪ Kirke (kirke)
- **#14** Rådhuset 🏛️ (radhus)
- **#19** 📚 Bibliotek (bibliotek)
- **#20** Sentrum VGS 🏫 (sentrum_vgs)
- **#39** 🚉 Stasjon (jernbanestasjon)

### Procedural buildings (~63 visible)

Everything else renders as colored boxes with text. Examples by zone:

- North-of-Glomma landmarks: Hotell #1, Sykehuset #4, fountain #12,
  theater #13, Kongsbadet #15, ESSO #16, Øyeklinikk #21, Peders #22,
  Specsavers #24, KIWI #30, parking #34.
- Kongssenteret blocks: #31 (D-G,12-14), #32 (I-N,12-13), #33 (O-R,12-13).
- Train station area: SSB #38, Coop Mega #46.
- TIL LEIE V-grid rentables: ##2, 8, 9, 10, 11, 17, 23, 25, 26, 27, 28,
  29, 35, 36, 37, 40, 41, 42, 43, 44, 45.
- Boliger housing: ##5, 6, 7, 47–70.

### Toggling

- Default: numbers OFF.
- `?numbers=1` in URL: numbers ON.
- Combine with `?skip=1`: `/game?skip=1&numbers=1` jumps straight into
  the city with the wizard skipped AND the overlay enabled.
- Removing `numbers=1` (or setting to anything else) hides the badges.

---

## How to capture a real screenshot

```sh
npm run dev
# then open http://localhost:5173/game?skip=1&numbers=1
# OS screenshot tool → save to docs/numbered_city.png
```

The numbers should sit in roughly a 70-strong grid pattern across the
city, brightest where buildings cluster (Kongssenteret, residential
strips, gagata commercial) and sparse on the open utkant.
