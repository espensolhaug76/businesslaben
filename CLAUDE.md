# AdVenture — repo-regler

Dette er REGLER, ikke historie. Les før du gjør noe; hold filen kort — under
én skjerm. Detaljer som vokser hører hjemme i `docs/*.md`, referert herfra.

## Verifisering
- Kjør `tsc -b` etter hver del/endring. **ALDRI** `npx tsc --noEmit` — rot-
  `tsconfig.json` har `files: []` + kun project references, den type-sjekker
  INGENTING og gir falsk trygghet.

## Push og validering
- **ALDRI push** uten at Espen har validert manuelt i Chrome. Commit kun når
  eksplisitt bedt om det.
- Playwright/headless Chromium er KUN diagnostikk (verifisere at noe
  fungerer/ikke fungerer, reprodusere bugs) — erstatter aldri Espens visuelle
  godkjenning.

## Geometri og soner
- Alle prosent-soner (trau, speil, kunde-spawn/-stand, vinduer, tavle osv.)
  kalibreres av Espen selv via `?dev=1`-sone-tracere og LÅSES i
  `src/data/districts.ts`.
- **Aldri gjett** koordinater fra et skjermbilde. Mangler en sone/verdi:
  STOPP og be Espen trace den med `?dev=1` — ikke finn på et tall.

## Innhold
- All UI-tekst er bokmål.
- Ingen tekst i bilde-assets (skilt/tavler/etiketter genereres tekstfrie;
  tekst legges alltid på i CSS/DOM).
- Ingen ekte merkenavn/varemerker — kun fiktive.

## Pris
- `Product.retailPrice` er DEN ENE prissettingskilden (Priser-fanen). Ikke
  gjeninnfør per-tier-priser eller duplikate prisfelt.

## Parkert / dødt
- Den isometriske Phaser-byen (`src/game/phaser/`, `PhaserGame.tsx`) er
  PARKERT — ikke rør den, ikke "rydd opp" i den.
- Migrert fra Unity: `.cs`-filer og `Handover.md` er DØDE artefakter — les
  dem ALDRI, de reflekterer ikke dagens arkitektur.

## Nøkkelfiler
- `src/game/GameContext.tsx` — global state/reducer (all spill-logikk)
- `src/data/districts.ts` — all geometri/soner (kalibrert, låst av Espen)
- `src/game/data/industryDefinition.ts` — bransjedefinisjon (KUN CAFE aktiv)
- `src/game/data/industries.ts`, `personas.ts`, `dayConfig.ts` — katalog,
  persona-generator, dagssyklus-config
- `src/game/sales/scenarios.ts` + `engine.ts` — salgsscenario-motoren
- `src/game/city/{InteriorView,MonterScene,WindowDisplay}.tsx` — scene-motorer

Før bransje-arbeid: les `docs/BRANSJE_DEFINISJON.md` + `docs/BRANSJE2_*.md` +
`docs/INNKJOP_LEVERING.md` først. Motorene røres ikke; bransjer er
data+bilder+scenarier.

Kontekst fra tidligere runder (hva som er bygget, beslutninger, åpne TODO-er):
`docs/rapporter/spor-a.md`.
