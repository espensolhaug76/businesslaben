# Spor D — rapporter

## STI-MILEPÆLER — lærerpanel — 2026-08-22 (spor-d/sti-milepaeler)

Lærerpanel-delen av den valgfrie, lærerstyrte «stien». Klient-delen (GameContext-
abonnement + mentor-dytt) ligger på `spor-a/rekruttering`, se docs/rapporter/spor-a.md.

### Mål
En lærer kan sette opp en ORDNET sti av milepæler som mentoren dytter eleven mot.
Tom sti = dagens frispill, helt uendret. Aldri en sperre.

### Hva ble gjort
- **Ny `src/game/data/sti.ts`** (delt katalog, identisk med den på spor-a): fast liste
  på 7 milepæler (`lei-lokale`, `apningsordre`, `still-ut-vare`, `sett-pris`,
  `apne-butikken`, `ansett`, `markedsforing`), hver med id + kort label + ren
  `fullfort(state)`-sjekk mot eksisterende GameState-felt. `milepaelById` +
  `nesteMilepael` (brukes av klienten, men bor i den delte katalogen).
- **`src/screens/teacher/TemaAktiveringPanel.tsx`:** ny `StiSeksjon`-seksjon i
  «Spillet»-fanen (samme sted som tema/fag/Espen-spør-styringen). Læreren drar
  milepæler fra en palett inn i en ORDNET liste (drop-sone); listen kan omordnes med
  ↑/↓ og ryddes med ✕. Palett-knappene er både dragbare OG klikkbare (klikk = legg
  til) for enkel bruk. Skriver hele den ordnede arrayen til RTDB
  `klasser/{kode}/sti` via `set(...)` — samme onValue/set-mønster som
  temaAktivering/fagAktivering. Tom liste er en gyldig tilstand (frispill) —
  læreren tvinges ikke til å fylle den ut.

### Datamodell (RTDB)
`klasser/{klassekode}/sti = ["lei-lokale", "sett-pris", …]` — ordnet array av
milepæl-id-er. Fravær/tom = frispill. Spillklienten abonnerer på samme node.

### Validering
- **`tsc -b` rent.** **`vite build` rent** (ingen feil; kun standard chunk-størrelse-
  advarsel).
- Lærerpanelet skriver til Firebase RTDB (som eksisterende tema/fag-paneler) — full
  interaktiv validering krever en levende klasse og gjøres av Espen: åpne lærer-
  dashbordet → «Spillet» → Sti-seksjonen → dra 3–4 milepæler inn → en spillklient med
  samme klassekode får mentor-dytt mot neste udekkede steg (se spor-a.md for klient-
  vakten som beviser dytte-logikken headless).
- Katalog- og «neste milepæl»-logikken (`sti.ts`) er identisk med den headless-
  verifiserte versjonen på spor-a (`tests/spilltest/sti-milepael.spec.ts`).

### Merknader / skjønn
- Omordning i stien er ↑/↓-knapper (ikke drag-reorder) — enklere og robust; drag
  brukes til å LEGGE TIL fra paletten (som spesifisert).
- `sti.ts` er bevisst identisk på begge grener (spor-a + spor-d) for å unngå
  merge-konflikt når begge merges til main.
- Ingen sperre noe sted: stien påvirker kun mentorens dytt, aldri faner/handlinger.
