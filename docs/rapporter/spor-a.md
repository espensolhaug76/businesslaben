# Spor A — kafé / dagssyklus / økonomi: rapportlogg

Samlet logg over arbeidsrundene i «spor A» (kafé-bransjen: bransjedefinisjon,
innkjøp/levering, dagssyklus, salgsscoring, økonomi). Ment som KONTEKST for
senere Claude-økter — hva som er bygget, hvilke beslutninger som ble tatt,
hva som er verifisert, og hvilke TODO-er/flagg som står åpne.

Rekkefølgen er kronologisk. Nyeste avsnitt nederst. Alle runder: bokmål,
`tsc -b` rent, verifisert headless (Playwright), commit kun på eksplisitt
forespørsel.

Se også: `docs/BRANSJE_DEFINISJON.md`, `docs/INNKJOP_LEVERING.md`,
`docs/BRANSJE2_*.md`, `CLAUDE.md`.

---

## 1. IndustryDefinition-refaktorering (commit 965d406)

**Mål:** trekke ALT kafé-spesifikt ut i én `IndustryDefinition` slik at en ny
bransje kan legges til som data + bilder + scenarier uten å røre motorene.

- Ny `src/game/data/industryDefinition.ts` med type + `CAFE`-instans:
  `id/navn/emoji/beskrivelse/startingMoney`, `katalog`, `flater.styling`
  (vindussone), `flater.lager` (trau-geometri + scenebilde + `trauCols()` +
  speil), `ekstraFlater` (tavla/drikkemeny m/`matches()`), `scenariePool`,
  `personaBudsjett`, `svinnRegel`.
- Avhardkodet: `industries.ts` (`bakeryItem`→`catalogItem`), `sales/scenarios.ts`
  (`CAFE_SCENARIO_IDS`, `scenariosForIndustry`, `scenariosForMix(pool, mix)`),
  `personas.ts` (parameterisert på tabell; `generatePersona` tar `personaBudsjett`),
  `MonterScene`/`InteriorView` (geometri fra `getActiveIndustryDefinition()`),
  `GameContext.CLOSE_DAY` (svinn brancher på `svinnRegel`), `DashboardOverlay`
  (persona-budsjett via `getIndustryDefinitionFor`).
- To oppslag: `getActiveIndustryDefinition()` (alltid CAFE — motorene) vs
  `getIndustryDefinitionFor(industry)` (per bransje, undefined for de uten def).
- `KLESBUTIKK` er en TOM/inaktiv stub (beviser typen bærer bransje 2).

**Viktig for senere:** refaktoreringen rørte IKKE `TrauContents`
(plassering/skew/scale) eller `tileCount` — kun import/oppslag. `MONTER_TRAU`
refereres by-value fra districts.ts. (Bekreftet ved diff da en «plasserings-
regresjon» feilaktig ble mistenkt å komme herfra — se pkt. 5.)

---

## 2. Innkjøp og leveringstid (docs/INNKJOP_LEVERING.md)

**Kjerne:** bestilling får leveringstid; butikken har alltid varer.

- `Bestilling { productId, qty, bestiltDag, ankomstDag, costKr }`,
  `state.incomingOrders`, `state.lastDelivery`.
- `ORDER_PRODUCT`: trekker penger NÅ, fører varen (stock 0 hvis ny), lager en
  Bestilling med `ankomstDag = dayNumber + DAY_CONFIG.leadTimeDays` (=1).
- `OPEN_DAY`: legger ankomne ordrer på lager + setter morgenpille.
- Produkter-fanen: «Underveis»-seksjon.
- Paletter (MonterScene/WindowDisplay) viser nå KUN førte varer
  (`state.products`), ikke hele katalogen.
- **`CARRY_PRODUCT` er FJERNET** (action + reducer-case): gratis-føring-ved-drag
  finnes ikke lenger; føring skjer ved bestilling. Å dra en palett-vare til et
  trau stiller den bare ut (`SET_COUNTER_LAYOUT`).

---

## 3. Fiks-runde etter dag-1-validering

- **Oppstartsleveranse (DEL 1):** `IndustryDefinition.oppstartssortiment` la et
  startlager ferdig på lager ved `RENT_LOCATION`, trukket fra kapital. (Senere
  erstattet av elevvalgt åpningsbestilling — se pkt. 6.)
- **Fredrik/stock-commit (DEL 2, bug):** `'full'`-valget solgte `commitQty` (40)
  uklemt mot lager; resultatkortet viste 40 solgt selv med 30 på lager. Fikset
  med `qty = Math.min(stock, commitQty)` i `chooseStockCommit`.
- **Dagfase / leftover-kunde (DEL 3):** kunde-gaten + spawn i InteriorView
  nøkler nå på `dayPhase === 'åpen'` (autoritativt), og en `prevPhaseRef` tvinger
  FRISK kunde ved hver dagåpning — en kunde som ble stående ved tidlig stenging
  dukker ikke lenger opp igjen neste dag. Svinn (`CLOSE_DAY`) verifisert intakt.
  «Kunde-før-åpning» kunne ikke reproduseres i ren flyt (shopOpen-gaten stoppet
  det); leftover-kunden var den ekte feilen.
- **Utsolgt-hint (DEL 4):** `stockoutHappened` settes nå også ved DELSALG (ikke
  bare helt tomt) — overlayet flagger `stockout` eksplisitt i
  `RESOLVE_SALES_SCENARIO`.
- **DEL 5 (diagnose, ikke fikset da):** gammel scoring for snill — base 55,
  `warn` ga +3 (positivt!), `behovstreff`/`personaMatch` nesten gratis.

---

## 4. Ny scoring-skala (engine.ts, DEL 5-fiks)

```
satisfaction = 50 + good*10 − warn*3 − bad*12 + (behovstreff ? 8 : 0), klemt [5,100]
```
- `personaMatch` FJERNET fra satisfaction → ren +10 XP-bonus (`xpEarned`
  hadde den allerede).
- Terskler/rykte-mapping uendret. Gjelder salg OG service.
- Verifisert: helt-good→«Strålende» (100), helt-bad→«tøff» (5), warn-tungt med
  behovstreff→«grei» (56), rent-warn uten behovstreff→«tøff» (35).

---

## 5. Plasserings-regresjon i disk-monteren (MonterScene.tileCount)

**Symptom (Espen):** «kan bare plassere ett item; skew flytter bare sidelengs.»
**Diagnose (diff-bevist):** IKKE fra IndustryDefinition-refaktoreringen —
`MONTER_TRAU`, `TrauContents` (skew = `cx += skewAdjust*(depth−0.5)`,
tile-rotate = `baseRotation + jitterRot`) og `tileCount` var bit-identiske
før/etter. Ekte årsak: da gratis-startbatchen (`starterStock = maxDemandPerMonth`
≈ 220) forsvant med innkjøp/levering-runden, fikk varer realistisk dagslager
(20–30), og `tileCount`s `stock / maxDemandPerMonth` (MÅNEDS-etterspørsel) ga
≈ 0,1 → bare 1 flis (og skew fikk ingen rad å vinkle).
**Fiks:** «full trau» måles nå mot DAGSLAGER
(`maxDemandPerMonth / DAY_CONFIG.daysPerMonth`). Et fullt dagslager fyller
trauet som før; tømmes gradvis utover dagen. `TrauContents` (skew/scale/
plassering) er UENDRET. Verifisert: croissant (20) → 3 fliser (var 1).
**Merk om skew:** har ALLTID vært en shear (rader forskjøvet etter dybde =
stabelen heller), aldri per-flis-rotasjon. Panelet heter «Vinkel / skew».
Ønskes ekte rotasjon er det en NY endring, ikke en gjenoppretting.

---

## 6. Elevvalgt åpningsbestilling + bransjespråk

- `RENT_LOCATION` seeder ikke lenger; ny state `openingOrderPlaced` + action
  `PLACE_OPENING_ORDER`.
- Ny `OpeningOrderOverlay`: hele katalogen med antall-velgere, forhåndsutfylt
  fra `oppstartssortiment` (nå = FORSLAG, ikke seed), sum mot startkapital,
  «Bekreft» sperret hvis sum > kapital. Tomt valg advares («Åpner du uten
  varer?») men tillates. Varene ligger ferdig dag 1.
- **Språk (DEL 2):** ny `IndustryDefinition.forsyning` (bransjespesifikk tekst
  som DATA): kafé sier «bakes ferske / Ferskt dag N / Ferske varer klare», ikke
  «leveres». Wiret inn i åpningsbestilling, «Underveis», morgenpille, utsolgt-
  hint. Koden holder seg generisk.
- docs/INNKJOP_LEVERING.md oppdatert: «leveringstid er aldri død ventetid» +
  bransje-horisont (bakeri natt/dag, klær ordre/sesong).

---

## 7. «Bestill til i morgen» fra dagsoppgjøret

- DayResultOverlay: sekundærknapp «🥐 Bestill til i morgen» + klikkbare
  svinn/utsolgt-hint → åpner dashbordet på Produkter UTEN å avansere dagen
  (`dayPhase` forblir 'oppgjør'). Oppgjøret skjules mens dashbordet ligger over
  (prop `dashboardOpen`) og kommer tilbake ved lukking.
- Bekreftet: bestilling lagt i 'oppgjør' får `ankomstDag = dayNumber + 1`
  («Ferskt dag N+1», ikke N+2), fordi `dayNumber` først avanseres av
  `START_NEW_DAY`.

---

## 8. Økonomi-fanen leser dagssyklusen + månedsoppgjør

**DEL 1 (inntektssiden):** «Est. inntekt/mnd» (gammel prognose `estRevenue`)
erstattet av **«Opptjent denne måneden»** = `sum(dagsresultat)` for inneværende
måned fra `dayHistory` (dagsresultat = salg − varekost − svinn). Ny «DAGENE
DENNE MÅNEDEN»-liste (dag, solgt, svinn, resultat-bar) + enkel projeksjon
(snitt/dag × gjenstående handledager). Runway/netto bruker projeksjonen.

**DEL 2 (månedskostnader):** ved månedsrull i `START_NEW_DAY` bygges et
`MonthSettlement` og faste kostnader trekkes fra kassa. Ny `MonthResultOverlay`
(gate: `lastMonthSettlement`, action `DISMISS_MONTH_SETTLEMENT`): opptjent i
dagene, faste kostnader (nedbrytning), månedsresultat = inntekt − faste.
Verifisert (12 dager → rull til Februar): korrekt oppgjør og kassatrekk.

Den gamle «Simuler måneden»/PEST-flyten (`SimulationModal`/`APPLY_MONTH_RESULT`)
er URØRT.

---

## 9. Økonomi-justeringer

- **«▶ Simuler måneden» skjult bak `?dev=1`** (`IS_DEV_COORDS` i GamePage) —
  dagssyklusen eier månedsrullen. PEST-koden urørt (gjenbrukes som hendelser).
- **Delt kilde `src/game/data/economy.ts`** → `manedligeFasteKostnader(state)`
  = husleie + **lønn** + forsikring + markedsføring. Brukt av BÅDE reduceren
  (månedstrekk + oppgjørets kostnadslinjer) OG Økonomi-fanen (burn/kostnader/
  netto), så tallene stemmer. Lønn er 0 uten ansatte men riktig regel.
- **Burn-KPI / «Kostnader/mnd» / netto** viser nå det som FAKTISK trekkes
  (`manedligeFasteKostnader().sum`), ikke gamle `monthlyCosts` (som inkluderte
  låneavdrag).

---

## Åpne TODO-er / flagg (les før du bygger videre)

- **Låneavdrag i dagssyklusen (TODO):** bevisst UTELATT fra månedstrekket. Et
  avdrag må også amortisere `loans[].remainingBalance` — den logikken ligger i
  den urørte `APPLY_MONTH_RESULT`-flyten. Vises som dempet «TODO»-linje i
  kontantstrømmen når det finnes lån. Kobles inn her SAMMEN med nedskriving av
  restgjeld.
- **To parallelle måneds-mekanikker:** dagssyklusens månedsrull (START_NEW_DAY)
  og den gamle «Simuler måneden» (nå bak `?dev=1`) kan begge avansere måneden.
  Den gamle er skjult, men koden lever — vurder å konvertere PEST til hendelser
  som trigges FRA dagssyklusen i stedet.
- **KLESBUTIKK-stubben** er inaktiv; `getActiveIndustryDefinition()` returnerer
  alltid CAFE (by-/interiør-/monter-bilder finnes kun for kafé). Å aktivere
  bransje 2 krever egne bilder/soner/scenarier — se `docs/BRANSJE_DEFINISJON.md`
  og `docs/BRANSJE2_*.md`.
- **Skew = shear, ikke rotasjon** (se pkt. 5) — hvis Espen vil ha vinklede
  rader er det en ny mekanikk i `TrauContents`.
- **`svinnRegel: 'sesong/kolleksjon'`** er kun et navn (klesbutikk) — ikke
  implementert i `CLOSE_DAY`.
