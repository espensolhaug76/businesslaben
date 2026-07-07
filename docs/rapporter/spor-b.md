# Spor B — Klesbutikk-stillas (gren `jobb/klesbutikk`)

> Løpende statusrapport for KLESBUTIKK-STILLAS-oppdraget. En ny Claude-økt skal
> kunne lese HERFRA og fortsette uten å gjette. **IKKE merge til main. IKKE
> push.** Bokmål. `tsc -b` etter TS-endringer.
>
> Les alltid først: `docs/BRANSJE_DEFINISJON.md`, `docs/BRANSJE2_*.md`,
> `src/game/data/industryDefinition.ts` (KLESBUTIKK-stub), `CLAUDE.md`.

Sist oppdatert: 2026-07-07.

---

## Oppdraget i tre deler
- **DEL 1 — Assets.** `klesbutikk-fasade.png` + `klesbutikk-interior.jpg` i
  `public/assets/raw/` (kropp ✦ i interiøret). Splitt `fixtures-ark-01` og
  `fixtures-ark-02` til møbel-sprites (kropp ✦). Verifiser rene kanter.
- **DEL 2 — Fyll KLESBUTIKK-definisjonen** (minimal, IKKE aktiv): flater
  (vindu-sone + butikkvegg-sone, grove trace-bare defaults), scener
  (fasade+interiør), forsyning-tekst (ordre mot sesong), personaBudsjett
  FASHION_BUDGETS, `svinnRegel: 'sesong'` (fortsatt no-op), katalog tom
  (leverandørkatalog kommer).
- **DEL 3 — Stillas-scener** m/`?dev=1`-tracer, nåbar via dev-rute (IKKE
  koblet til onboarding ennå). Ingen endring i kafé-flyten. Rapport så Espen
  kan trace sonene.

---

## Status per del

| Del | Status |
|---|---|
| DEL 1 — fixtures-splitting (ark 01 + 02) | ✅ FERDIG, visuelt verifisert |
| DEL 1 — scenebilder (fasade + interiør) + interiør-✦ | ⛔ BLOKKERT — bildene mangler (se under) |
| DEL 2 — definisjonen | ⏸ Ikke startet. Asset-uavhengige biter kan gjøres nå; scene-felt venter på DEL 1-bildene |
| DEL 3 — stillas-scener + dev-rute | ⏸ Ikke startet. Blokkert på scenebildene |

---

## ✅ Gjort — DEL 1 fixtures-splitting

Utvidet `scripts/split-product-sheet.py`:
- Ny **ark-familie `fixtures-ark-*`** (`FIXTURES_DIR` → **klesbutikk-worktreen**
  `public/assets/raw/fixtures/`, ikke main-worktreen), `resolve_family()`-gren,
  robust feilmelding.
- Nytt **`SKIP`-sentinel** i navnekartet: en blob med navn `SKIP` telles i
  lese-rekkefølgen (så etterfølgende navn treffer riktig blob) men skrives
  ikke — brukt for møbler som er duplikat av allerede splittede sprites.
- `FIXTURES_NAME_MAPS`:
  - `"01": [stativ, dukke, bord, hylle]`
  - `"02": [dukke-mann, dukke-barn, SKIP, stativ-liten, SKIP, bord-podium]`

**Kjøring** (begge ark trengte `--model isnet-general-use` — standard u2net
(saliency) droppet lavkontrast metall-/grå-varer; se memory
`reference_rembg_model_lowcontrast_fixtures`):

```
python scripts/split-product-sheet.py fixtures-ark-01-raw.png --model isnet-general-use
python scripts/split-product-sheet.py fixtures-ark-02-raw.png --model isnet-general-use
```

**Resultat — 8 sprites i `public/assets/raw/fixtures/`**, alle sjekket visuelt
(full vare, ren alfa, ingen nabo-rest, ingen ✦-vannmerke):

| Ark | Lagret | Hoppet over (SKIP) |
|---|---|---|
| 01 | `stativ`, `dukke`, `bord`, `hylle` | — |
| 02 | `dukke-mann`, `dukke-barn`, `stativ-liten`, `bord-podium` | blob #3 (stort stativ = ark-01-duplikat), blob #5 (enkelt bord = ark-01-duplikat) |

Blob-tellingen traff eksakt (4/4 og 6/6). ✦-glyfen (nano-bananas AI-vannmerke,
nederst t.h.) falt under `MIN_AREA_FRAC` på begge ark og havnet ikke i noe
utklipp.

---

## ⛔ BLOKKERT — scenebildene mangler

`public/assets/raw/klesbutikk-fasade.png` og `.../klesbutikk-interior.jpg`
**finnes ingen steder** (sjekket begge worktrees, untracked-status,
`.gitignore`). Merge-commit `73591fd` er **tittelert** «klesbutikk-fasade,
interiør, møbel-ark 1+2», men innholdet er KUN de to fixtures-arkene —
fasade/interiør ble aldri `git add`-et. Ser glemt ut ved commit.

**Trenger fra Espen:** legg `klesbutikk-fasade.png` + `klesbutikk-interior.jpg`
i `public/assets/raw/` og commit dem på `jobb/klesbutikk`.

Uten dem er blokkert: interiør-✦-krop (DEL 1),
`flater.lager.sceneImage`/`speil.sceneImage` (DEL 2), hele DEL 3.

---

## Miljø-notat
- Denne worktreen (`/home/espen/adventure-web-klesbutikk`) har **ikke**
  `node_modules` installert → `tsc -b`/`vite` kan ikke kjøre her ennå. Kjør
  `npm install` i worktreen FØR DEL 2/DEL 3 (TS-endringer) skal type-sjekkes.
- Så langt er kun `scripts/split-product-sheet.py` (Python) + PNG-assets
  endret — ingen TS rørt, så `tsc -b` er ikke relevant for det gjorte arbeidet.

## Neste steg (i rekkefølge)
1. **Espen:** legg scenebildene inn (se blokkering over).
2. Kropp ✦ ut av `klesbutikk-interior.jpg` (DEL 1).
3. `npm install` i worktreen.
4. DEL 2 — fyll KLESBUTIKK-definisjonen (asset-uavhengige biter kan startes før
   punkt 1–3: forsyning-tekst, FASHION_BUDGETS, `svinnRegel: 'sesong'`, tom
   katalog, grove trace-bare sone-defaults). `tsc -b`.
5. DEL 3 — stillas-scener m/`?dev=1`-tracer + dev-rute. Rapport så Espen kan
   trace sonene.

## Working-tree-tilstand (2026-07-07)
```
 M scripts/split-product-sheet.py
?? public/assets/raw/fixtures/{stativ,dukke,bord,hylle}.png
?? public/assets/raw/fixtures/{dukke-mann,dukke-barn,stativ-liten,bord-podium}.png
```
