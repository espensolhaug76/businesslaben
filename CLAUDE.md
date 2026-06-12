# AdVenture — repo notes for future Claude sessions

This file is loaded automatically into Claude Code's context when working in
this repo. Keep it short. If a section grows long, split into a topical
`docs/*.md` and reference it here.

## Dev shortcuts

### `?skip=1` — bypass the StartupScreen wizard

While iterating on city visuals (sprite tuning, depth sorting, render
branches in `CityScene`) the StartupScreen's industry → business model →
financing → personality → name flow is friction. Append `?skip=1` to the
`/game` URL — e.g. `http://localhost:5173/game?skip=1` — to seed defaults
and land directly in the city with the player slot pre-rented:

| Field | Default |
|---|---|
| `companyName` | `DevCo` |
| `industry` | `cafe` (so the rented slot renders the modern cafe sprite) |
| `businessModel` | `detaljhandel` |
| `finansiering` | `bank` (50k starting loan) |
| `personlighet` | `analytisk` |
| Rented slot | The vacant V closest to camera center, picked at runtime |

**Implementation** (don't duplicate elsewhere):
- `IS_DEV_SKIP` constant in `src/game/GamePage.tsx` — the only entry point.
  Combines `import.meta.env.DEV` (compile-time) and the `?skip=1` query.
  Production builds dead-code-eliminate everything gated behind it.
- Two `useEffect`s in `GameContent`: one dispatches `START_GAME` with the
  defaults above; the other listens for `phaser:mapReady`, asks
  `CityScene` to pick a central vacant via `dev:requestAutoRent`, then
  dispatches `RENT_LOCATION` when CityScene emits `dev:vacantClicked`.
- `CityScene.onDevRequestAutoRent` does the picking — closest V to
  camera center by squared distance.
- StartupScreen itself is not modified; if `?skip=1` is absent or the
  build is production, the wizard renders normally.

When the skip is active you'll see two console lines:
```
[DEV] StartupScreen skipped, seeded defaults
[DEV] Auto-rented v0X at <zone>
```
Followed by `[CityScene] onRented …` from the existing rent-flow handler.

If you need to test the full StartupScreen flow, just drop the query
parameter.
