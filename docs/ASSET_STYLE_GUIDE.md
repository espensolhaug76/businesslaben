# AdVenture Asset Style Guide

This document is the **human-readable reference** for the visual DNA of every
generated building asset in AdVenture. The pipeline (slash-command `/asset`,
`scripts/generate-asset.sh`, `docs/ASSET_PROMPTS.json`) reads its actual prompt
fragments from `ASSET_PROMPTS.json` — this file documents what those fragments
mean and shows worked examples so a human can extend the system.

> **Important — legacy assets are NOT the reference.** The
> `public/assets/buildings/*.png` set (bakery.png, cafe.png, gym.png, …) is
> from an earlier Unity-era prototype and is being replaced. The target style
> is modern Norwegian commercial — described below. Do not visually sample the
> legacy assets when writing or tuning prompts.

---

## 1. Base style block (modern commercial — default)

Every prompt begins with this paragraph verbatim **unless the per-asset
entry sets `style_variant: "legacy"`**, in which case the legacy heritage
block in §1b is used instead. The default modern block locks in the
**rendered 3D miniature diorama look** — the previous "stylized
illustration" wording let NB2 regress to flat 2D output (cafe_central v1,
sports_shop v1).

> **Why this is so emphatic:** during the v1 batch, two of five assets
> (hair_salon, gym_modern) hit the rendered-3D target while two
> (cafe_central, sports_shop) regressed to flat illustration with single-tone
> hedges, drawn-on brick texture, and no glass reflection depth. The Hay Day
> "3D-in-2D" register is unstable in NB2 — it needs heavy anchoring.

```
3D-rendered miniature diorama style, like a high-end toy or architectural
maquette photographed from a 30-degree isometric angle. Think Hay Day,
Township, or Animal Crossing: New Horizons — physically modeled,
volumetrically lit objects rendered in a stylized but dimensional way.
NOT 2D illustration, NOT digital painting, NOT cel-shaded cartoon,
NOT manga or anime. The output should look like a screenshot of a
3D-modeled scene, not a drawn picture.

Required rendering qualities:
- Strong ambient occlusion in all crevices and contact points
- Material-specific surface rendering: brick has individual brick
  geometry with mortar shadows, NOT painted-on texture; wood shows
  grain depth and warm under-lighting; glass has multi-layer reflections,
  refractions, and subtle blue-green tinting; metal shows clear specular
  highlights and reflections; concrete has aggregate texture and weathering
- Vegetation: hedges show MANY individual leaf clusters with depth and
  color variation (light green tips, darker shadowed interiors), NOT
  solid green shapes. Bushes have visible volume and irregular silhouette.
- Flowers: individual petals visible with shading, NOT flat color blobs
- Shadows are soft but defined, with proper grounding contact shadows
- Color palette: muted, naturalistic, slightly desaturated. NOT cartoon
  saturation, NOT high-contrast illustration colors.

If the result looks like a drawing or illustration, the prompt has
failed. The result must look like a 3D render.
```

Modern Norwegian commercial cues (flat or low-pitched roof, glass
storefront, light concrete / white painted wood / brick façade, small
landscaping with planters and low hedges, single-story or low two-story
scale, pure white #FFFFFF background, no text/signage/letters/numbers, no
flags unless specified, centered composition with tight crop, soft daytime
lighting) are all still required — they live inside the per-building and
per-asset fields where they're more controllable, instead of in the
opening paragraph.

## 1a. Tight-crop / framing constraint (added 2026-05-02)

The v2 batch (2026-05-02) revealed a sprite-anchor problem in CityScene:
buildings include surrounding sidewalk, ground-plane extension, and
landscaping outside their structural outline. When placed at
`setOrigin(0.5, 1.0)` on an iso tile the building's *visual* center
doesn't match its *footprint* center, so sprites overflow into adjacent
tiles. The bandaid is per-asset offsets (`offset_x`, `offset_y` on the
`BD` interface) — the actual fix is enforcing tighter crops at
generation time.

The base prompt now ends with a tight-crop block (in
`_meta.base_style` and `_meta.base_style_legacy`):

```
Tight crop: building must fill 80-90% of the canvas. NO surrounding
sidewalk, NO ground plane extension beyond the building's footprint,
NO planters/hedges/landscaping OUTSIDE the building's structural
outline. Only the building itself plus its directly-attached integral
landscaping (e.g. window planters built into the wall). All other
area must be pure solid white background #FFFFFF (no checkerboard,
no gradient, no ground texture) so background removal yields a clean
cutout. Building's visual center must match the canvas geometric
center.
```

This constraint will apply to **all future generations** (Batch 2 NPCs,
any regenerated v2 building). The existing 14 v2 building PNGs
*pre-date* this constraint and exhibit the alignment problem; they
will be regenerated only after the new prompt is validated on Batch 2.

## 1b. Legacy heritage style block (Rådhus, Kirke)

Used only when an asset's `style_variant` is set to `"legacy"`. Same
rendered-3D quality bar as the modern block, but swaps the modern
commercial subject for late-1800s / early-1900s Kongsvinger small-town
heritage architecture: pitched roof in dark slate or red tile, stone or
painted-timber clad façade, tall narrow windows with white trim,
prominent symmetric entrance, modest decorative cornices. Explicitly
forbids modern glass storefronts and flat roofs — these would break the
heritage read.

Currently used by `radhus` and `kirke`. All other civic buildings
(`sentrum_vgs`, `bibliotek`, `politi`, `brannstasjon`, `jernbanestasjon`)
stay on the modern block — heritage is the exception, not the rule.

Source of truth: `_meta.base_style_legacy` in `ASSET_PROMPTS.json`.

## 2. Size variants

Used by the `size_variant` field in `ASSET_PROMPTS.json`.

| Variant  | Footprint phrasing |
|----------|-------------------|
| `small`  | `Single-story footprint, compact corner-shop scale.` |
| `medium` | `Low two-story building, full-height glass on the ground floor.` |
| `large`  | `Wide low two-story building with a full-width glass storefront and recessed entrance.` |

## 3. Per-building parameters

Each `building_type` adds a sentence of type-specific detail. These live as
`_building_defaults.<building_type>` in `ASSET_PROMPTS.json`.

| Building type | Type-specific detail |
|---------------|---------------------|
| `bakery`      | Floor-to-ceiling glass storefront with bread and pastries arranged on minimalist wooden display shelves; subtle wheat motif on the facade; clean white-painted wood cladding with a slim dark canopy over the entrance; planter boxes with herbs flanking the door. |
| `cafe`        | Large glass storefront, warm interior with espresso bar and a few small bistro tables visible inside; light brick or concrete facade; slim modern awning; small outdoor seating cluster with a low hedge planter. |
| `hairsalon`   | Clean modern salon with floor-to-ceiling glass front, two or three minimalist styling chairs and large round mirrors visible inside; matte white painted wood facade with a thin dark trim; modern planter with tall ornamental grasses by the door. |
| `sportsshop`  | Wide glass storefront with running shoes and sportswear arranged on wall displays inside; light concrete or brick facade with slim metal trim; bike rack and a low planter strip outside; clean modern look without large signage. |
| `gym`         | Large floor-to-ceiling windows showing treadmills, weight racks and dumbbells inside; light grey concrete or brick facade; recessed entrance under a flat canopy; minimalist landscaping with low hedges; modern industrial-clean look. |

## 4. Location modifier

The optional `location_specific` field appends a final clause grounding the
asset in its town. Keep it short — one or two visual cues, never a paragraph.
Examples: `"small Norwegian flag on a pole beside the entrance, Kongsvinger
town-center variant"`, `"slight fjord-side daylight, Bergen variant"`.

Leave it out (or empty) when the asset is generic.

## 5. Interior hint

`interior_hint` controls what the player sees through the glass storefront.
Be specific to the merchandise so the building reads as that business at a
glance.

## 6. Render-style override (appended to every prompt)

After all the per-asset fields, `scripts/generate-asset.sh` appends the
`_meta.render_override` string from `ASSET_PROMPTS.json` as the **final
sentence** of every prompt. This is a deliberate redundancy: NB2 has shown
it can drift from the base block to flat illustration unless reminded at
the end of the prompt too.

Current value:

```
RENDER STYLE OVERRIDE: 3D miniature diorama, photographic quality, not
illustration, not painting, not anime.
```

If the assets ever regress again, this line is the first knob to turn.

## 6b. Negative / cleanup terms

The negative directives ("no text, no signage, no flags unless specified,
pure white #FFFFFF background") live in the per-building defaults and the
override line — there is no separate `negative_terms` field. Per-asset
suppression goes in that asset's `interior_hint` or `location_specific`
when needed.

---

## 7. Five worked example prompts

These are the fully assembled prompts for the five seed entries in
`ASSET_PROMPTS.json`. They are what the pipeline actually sends to
nano-banana / `gemini-3.1-flash-image-preview`.

### 7.1 `bakery_kongsvinger`

> Isometric view at 30-degree top-down angle. Modern Norwegian small-town
> commercial building. … [base block]. **Single-story footprint, compact
> corner-shop scale.** **Floor-to-ceiling glass storefront with bread and
> pastries arranged on minimalist wooden display shelves; subtle wheat motif
> on the facade; clean white-painted wood cladding with a slim dark canopy
> over the entrance; planter boxes with herbs flanking the door.** Interior
> detail: shelves with bread loaves and pastries clearly visible through the
> glass. Location: small Norwegian flag on a pole beside the entrance,
> Kongsvinger town-center variant.

### 7.2 `cafe_central`

> [base] **Single-story footprint, compact corner-shop scale.** [cafe
> defaults] Interior detail: espresso bar with chrome machine and a couple
> of small two-top tables visible through the glass.

### 7.3 `hair_salon`

> [base] **Single-story footprint, compact corner-shop scale.** [hairsalon
> defaults] Interior detail: two minimalist styling chairs facing large
> round mirrors, clean white walls.

### 7.4 `sports_shop`

> [base] **Low two-story building, full-height glass on the ground floor.**
> [sportsshop defaults] Interior detail: running shoes lined up on a back
> wall and sportswear on minimalist display fixtures clearly visible
> through the glass.

### 7.5 `gym_modern`

> [base] **Wide low two-story building with a full-width glass storefront
> and recessed entrance.** [gym defaults] Interior detail: row of treadmills
> in the foreground and weight racks and dumbbells deeper inside, all
> clearly visible through floor-to-ceiling windows.

---

## 8. Adding a new building

1. **New building type** (e.g. `flowershop`): add a row to §3 above and add a
   `_building_defaults.flowershop` entry in `ASSET_PROMPTS.json`.
2. **New instance** (e.g. `flowershop_tromso`): add an entry to
   `ASSET_PROMPTS.json` with `building_type`, `interior_hint`, `size_variant`,
   and optional `location_specific`. Add `"style_variant": "legacy"` only
   if the building should use the heritage block (§1b) — almost everything
   should stay on the modern default.
3. Run `/asset flowershop_tromso` and inspect the result in
   `public/assets/raw/`. Iterate on the prompt fragments until the look is
   right.

### Two-tier asset_id naming

- **Generic** = `<building_type>` (e.g. `cafe`, `gym`, `bakery`). One per
  type. This is the canonical key, and matches the keys preloaded by
  `BootScene.ts` / registered in `AssetManifest.ts`.
- **Town variant** = `<building_type>_<location>` (e.g.
  `bakery_kongsvinger`). Use only when the building has a location-specific
  visual cue that the generic shouldn't carry (Norwegian flag for the
  Kongsvinger bakery, fjord backdrop for a Bergen variant, …).
- Existing five-asset starter set after the Apr 28 rename:
  `bakery_kongsvinger`, `cafe`, `hair_salon`, `sports_shop`, `gym`.

The pipeline does NOT parse this markdown file. Editing here is documentation
for humans; editing `ASSET_PROMPTS.json` is what changes generated output.

## 9. Versioning convention for regenerations

When regenerating an asset that already has a non-empty version in
`public/assets/raw/`:

1. Move the existing PNG into `public/assets/raw/_v1_legacy/<asset_id>.png`
   (create the subdirectory the first time). Do **not** overwrite blindly —
   the v1 outputs are the visual reference for what worked vs what regressed.
2. Run `/asset <asset_id>` to regenerate.
3. The new file lands at `public/assets/raw/<asset_id>.png` as usual.
4. Compare side-by-side and decide: keep new, revert to v1, or iterate
   prompt fragments and try again.

This convention is enforced by humans, not the script. The slash-command
will happily overwrite `public/assets/raw/<asset_id>.png` if it already
exists — back up first.
