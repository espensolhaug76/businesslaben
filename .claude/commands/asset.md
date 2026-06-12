---
description: Generate a building asset end-to-end (prompt → nano-banana → rembg → public/assets/raw/)
argument-hint: <asset_id>
---

# /asset — autonomous asset generation

You are running the AdVenture asset-generation pipeline for asset_id
`$ARGUMENTS`. Carry out **all** the steps below without asking for
confirmation. Report cleanly at the end.

## Constraints (do not violate)

1. **Only** call `mcp__nano-banana__generate_image`. The configured MCP server
   already targets `gemini-3.1-flash-image-preview` — never the Pro tier.
2. Do **not** run `git add`, `git commit`, `git push`, or modify
   `.gitignore`. All output stays local.
3. Do **not** delete or overwrite any file in `public/assets/raw/` other
   than the asset you are generating right now (e.g. leave
   `bakery_kongsvinger_test.png` and unrelated files alone).
4. The shell here is git-bash on Windows. The pipeline scripts and rembg
   venv live in WSL. **Always invoke scripts with the prefix
   `MSYS_NO_PATHCONV=1 wsl bash -c "<unix-command>"`** — without
   `MSYS_NO_PATHCONV=1`, git-bash mangles `/home/...` paths into
   `C:/Program Files/Git/home/...` and the call fails with `bash: line 1:
   C:/Program: No such file or directory`.

## Steps

### 1. Build the prompt

Run:

```
MSYS_NO_PATHCONV=1 wsl bash -c "bash /home/espen/adventure-web/scripts/generate-asset.sh $ARGUMENTS"
```

Parse the output. The script prints four sections delimited by markers:
`===PROMPT===`, `===OUTPUT_FILENAME===`, `===OUTPUT_PATH===`, `===END===`.
Capture:

- **`PROMPT`** — everything between `===PROMPT===` and `===OUTPUT_FILENAME===`,
  trimmed.
- **`OUTPUT_FILENAME`** — the single line between `===OUTPUT_FILENAME===` and
  `===OUTPUT_PATH===` (e.g. `bakery_kongsvinger.png`).
- **`OUTPUT_PATH`** — the single line between `===OUTPUT_PATH===` and
  `===END===` (e.g. `/home/espen/adventure-web/public/assets/raw/bakery_kongsvinger.png`).

If the script exits non-zero, stop and report the error verbatim. Common
causes: asset_id missing from `docs/ASSET_PROMPTS.json`, malformed JSON.

### 2. Generate the image

Call `mcp__nano-banana__generate_image` with `prompt` set to the captured
`PROMPT` string. Wait for it to return.

### 3. Locate the freshly generated file

The MCP server writes to `/mnt/c/Users/espen/Documents/nano-banana-images/`.
Pick the newest `.png` in that directory:

```
MSYS_NO_PATHCONV=1 wsl bash -c "ls -t /mnt/c/Users/espen/Documents/nano-banana-images/*.png 2>/dev/null | head -1"
```

Sanity check: its mtime should be within the last ~2 minutes. If it's older,
the MCP probably didn't write a new file — surface that and stop.

You can also call `mcp__nano-banana__get_last_image_info` to cross-check
the path the MCP claims it just wrote.

### 4. Run background removal

Pass the absolute path of the newest file as `<input>` and the
`OUTPUT_FILENAME` from step 1 as `<output_name>`:

```
MSYS_NO_PATHCONV=1 wsl bash -c "bash /home/espen/adventure-web/scripts/clean-asset.sh '<newest-file-path>' '<OUTPUT_FILENAME>'"
```

The clean script writes to `/home/espen/adventure-web/public/assets/raw/`
and prints the final size.

### 5. Verify and report

Confirm the output file exists at `OUTPUT_PATH`:

```
MSYS_NO_PATHCONV=1 wsl bash -c "ls -la '<OUTPUT_PATH>'"
```

Then write a short report to the user with:

- ✅ Final file path (the unix path under `public/assets/raw/`)
- 📐 Output size in bytes
- 🎨 The raw nano-banana source file path (so the user can compare pre/post rembg)
- ⚠️  Any warnings the scripts printed on stderr (e.g. missing
  `_building_defaults` entry, mtime older than expected)

Do **not** show the user the full prompt unless they ask for it — it's
verbose and they already know the style. Do show the asset_id, the
building_type, and the size_variant for confirmation.

If any step fails, stop and explain what failed and what the user should
fix (usually: edit `docs/ASSET_PROMPTS.json` to add the missing
asset_id / building_type, or check that `~/.venvs/rembg` exists in WSL).
