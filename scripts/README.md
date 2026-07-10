# scripts/

Helpers for AdVenture asset pipeline + a couple of one-off data parsers.

## Asset generation pipeline

End-to-end flow for producing a transparent-background building PNG ready
to drop into the game canvas:

```
docs/ASSET_PROMPTS.json
        │
        ▼
scripts/generate-asset.sh   →   composes the full prompt + planned filename
        │
        ▼
mcp__nano-banana__generate_image (gemini-3.1-flash-image-preview)
        │
        ▼   /mnt/c/Users/espen/Documents/nano-banana-images/<latest>.png
        │
scripts/clean-asset.sh      →   rembg background removal
        │
        ▼
public/assets/raw/<asset_id>.png   ← final transparent PNG
```

### Recommended invocation: `/asset <asset_id>`

In Claude Code, run the slash-command:

```
/asset bakery_kongsvinger
```

That command (`.claude/commands/asset.md`) drives the whole pipeline:
builds the prompt via `generate-asset.sh`, calls the nano-banana MCP,
locates the freshly written file, runs `clean-asset.sh`, and reports the
final path.

### No-MCP invocation: `nb-generate.sh`

`nb-generate.sh` is the MCP-free path: it calls the Gemini image model
**directly** over HTTP with `$GEMINI_API_KEY` and writes the PNG straight
into `public/assets/raw/` (no `/mnt/c` Windows hop). Use it when the MCP
server isn't available, or for scripted/batch generation.

```bash
# prompt only
./scripts/nb-generate.sh test_prop "a small wooden crate, pure white background, no text"

# with one or more reference images (base64-inlined)
./scripts/nb-generate.sh bakery_v2 "$(./scripts/generate-asset.sh bakery_kongsvinger | sed -n '/===PROMPT===/,/===OUTPUT_FILENAME===/p' | sed '1d;$d')" refs/bakery_ref.png
```

- Default model: `gemini-3.1-flash-image` (stable flash tier — verified
  present in the live model list; the `-preview` variant also exists).
  Override with `NB_MODEL=…`. **Keep it on a flash tier** — Pro image tiers
  bill heavily.
- `$GEMINI_API_KEY` is exported from `~/.bashrc`; a non-interactive shell
  may not have sourced it (`source ~/.bashrc` first, or pass it inline).
- Exit codes: `2` = API access failure (403/401/429 → fall back to a manual
  NB generation), `3` = responded but no image (safety block / empty).
- Output still needs background removal — run `clean-asset.sh` on it.

### Manual / debugging invocation

If you want to inspect or iterate on a prompt without burning an MCP call:

```bash
# In WSL
./scripts/generate-asset.sh bakery_kongsvinger
```

This prints the assembled prompt, the planned output filename, and the
planned output path. It does NOT call the MCP. Useful for prompt tuning.

To run the cleaner standalone on an arbitrary input:

```bash
./scripts/clean-asset.sh /mnt/c/Users/espen/Documents/nano-banana-images/foo.png bakery_kongsvinger.png
```

## Files

| Path | Purpose |
|------|---------|
| `generate-asset.sh`            | Composes the prompt for one asset_id from `docs/ASSET_PROMPTS.json`. No network calls. |
| `nb-generate.sh`               | Calls the Gemini image model directly (no MCP) with `$GEMINI_API_KEY`; prompt (+ optional reference images) → PNG in `public/assets/raw/`. |
| `clean-asset.sh`               | Runs rembg on a single PNG and writes to `public/assets/raw/`. Hardcoded venv path. |
| `parse-standard-competitions.mjs` | Unrelated one-off parser for the competitions data set. |

## Adding a new asset

1. Open `docs/ASSET_PROMPTS.json`.
2. Add a top-level entry, e.g.:

   ```json
   "flowershop_tromso": {
     "building_type": "flowershop",
     "interior_hint": "buckets of cut flowers and shelves with potted plants visible through the glass",
     "size_variant": "small",
     "location_specific": "Tromsø harbor district variant"
   }
   ```

3. If `building_type` is new (not already in `_building_defaults`), add a
   default sentence under `_building_defaults` and document the new type in
   `docs/ASSET_STYLE_GUIDE.md`.
4. Run `/asset flowershop_tromso`. Iterate on the prompt fragments until the
   render is good. Each run overwrites
   `public/assets/raw/flowershop_tromso.png` — the raw nano-banana files
   accumulate in `/mnt/c/Users/espen/Documents/nano-banana-images/` so you
   can always recover an earlier version.

## Style spec

The full visual DNA lives in `docs/ASSET_STYLE_GUIDE.md`. Target style is
modern Norwegian small-town commercial — flat / low-pitched roofs, glass
storefronts, white-painted-wood / concrete / brick façades, pure white
`#FFFFFF` background. The legacy assets in `public/assets/buildings/` are
NOT the reference — they are being replaced.

## Hard requirements / gotchas

- The MCP server is configured for `gemini-3.1-flash-image-preview` only.
  Do not switch to the Pro tier — billing.
- `clean-asset.sh` requires the rembg venv at
  `/home/espen/.venvs/rembg/bin/activate`. The path is hardcoded; the
  script aborts with a clear error if missing.
- `generate-asset.sh` uses `python3` for JSON parsing (no `jq` dependency).
- The slash-command shells out via `wsl bash -c "..."` because Claude Code
  is running on Windows (git-bash) but the pipeline scripts use unix paths.
- Outputs land in `public/assets/raw/<asset_id>.png` and are git-ignored
  by repo policy — do not commit generated assets unless explicitly asked.
