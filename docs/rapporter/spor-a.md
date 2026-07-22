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

## 10. Bakgrunnssalg — jevn kundestrøm uten samtale

**Modell:** kundemøtene er dagens UTVALG (pedagogikk), bakgrunnssalget er
VOLUMET. Ved OPEN_DAY beregnes dagens antall bakgrunnskunder (deterministisk,
seedet per dag):
`kunder = basetrafikk(lokale) × rykte(0,5+rykte/100) × pris(snitt rec/retail,
klem 0,7–1,15) × eksponering(fylte trau/vindu, klem 0,7–1,15) ×
markedsføring(budsjett, klem 1,0–1,3) × baseMultiplier`. Hver bakgrunnskunde
kjøper 1–2 varer fra det som har lager OG pris (retailPrice, trekker stock);
tomt lager ⇒ tapt salg (stk + estimert kr = snitt retail). INGEN XP/rykte fra
bakgrunnssalg (passivt).

**Drypp:** salget fordeles i (meetingsPerDay + 1) bolker — én bolk etter hvert
fullførte kundemøte (RESOLVE_SALES_SCENARIO), RESTEN ved CLOSE_DAY (før svinn).
Disken tømmes synlig utover dagen; penger inn løpende. Seed persisteres mellom
bolker (`state.dayBackground = { kunderIgjen, bolkerIgjen, seed }`).

**Filer:** `src/game/data/balance.ts` (ALLE tunbare tall — én fil å justere),
`src/game/data/backgroundSales.ts` (ren motor: faktorer, beregnBakgrunnskunder,
simulerBakgrunnsbolk, dagSeed). Wiring i GameContext (OPEN_DAY/RESOLVE/CLOSE_DAY).
`basetrafikk` per lokale ligger i balance.ts (nøklet på lokale-id) — sentrum-l2
høyest (gågata), grovt korrelert med leie. Slås opp via `state.rentedLocationId`
(ingen ny districts.ts-endring).

**Rapportering:** DayResult/dayStats utvidet med meetings, bakgrunnKunder/Stk/Kr,
tapteSalgStk/Kr. Dagsoppgjør viser «🛎️ Kundemøter: N · X kr», «👥 Øvrige kunder:
N · Y kr», «🚫 Tapte salg: M (tomt lager)». RESULTAT = (møter + bakgrunn) −
varekost − svinn. Utsolgt-hintet (og stockoutHappened) settes nå av tapteSalg.
Økonomi-fanens dagsliste teller totalt solgt (møter + bakgrunn); månedsoppgjøret
teller bakgrunnssalget med automatisk (via `resultat`). Fikset: `highSvinn`-hintet
måles nå mot SAMLET omsetning (ellers slo det ut på en dag uten kundemøter).

**Balanse (mål 3 000–5 000 kr dagsmargin ved rimelig drift, ~47 000 faste):**
verifisert headless. Velfylt dag (sentrum-l1 base 95, godt lager, priser =
anbefalt, 4 trau eksponert, rykte 50) → **109 kunder, resultat +3 578 kr**. Snitt
~34,5 kr margin/kunde. Sentrum-l2 (base 110, rykte ~55, full eksponering) →
~130 kunder → ~+4 200 (midt i båndet). Uten eksponering (tom disk) → faktor 0,7
→ 67 kunder → +2 023 (under båndet — displaying lønner seg). Deterministisk
(samme dag → samme strøm). ALL balanse i balance.ts; Espen finpusser etter
spilltest (juster `baseMultiplier` for samlet volum).

## 11. Spillklokke — sanntidsdag, drypp per tick, dagspuls & per-produkt-rapport

> **Status: bygget + verifisert headless, IKKE Chrome-validert av Espen ennå.**
> DEL 0 (bakgrunnssalget, pkt. 10) er committet som milepæl (validert i Chrome).
> DEL 1–4 (klokka) ligger UCOMMITTET i arbeidstreet til Espen validerer.
> **Superseder pkt. 10 «Drypp»:** bolk-per-kundemøte er ERSTATTET av drypp per tick.

**DEL 1 — spillklokke (09:00–17:00):** én `setInterval` i GamePage
(`tickCtx`-ref så intervallet lages én gang, leser LIVE-state) dispatcher `TICK`
hvert `BALANCE.klokke.tickMs` (750 ms) mens `dayPhase === 'åpen'`. `minutterPerTick`
= 1 ⇒ full dag = 480 tick ≈ **6 min** åpningstid. Klokka PAUSER under
salgsscenario (`salesOpen`), åpent dashbord (`dashboardOpen`) og aktivt
kundemøte (`activeMeetingScenarioId`). Ved `dayMinute >= DAG_VARIGHET` (17:00)
dispatches automatisk `CLOSE_DAY` (svinn + dagsoppgjør som før). Manuell tidlig-
stenging beholdt; da bortfaller resterende bakgrunnskunder (`bortfallStk`, egen
«stengt tidlig»-linje, adskilt fra tomt-lager-tap). ALLE tall i `balance.ts`
(`klokke`, `moteForste/Siste`, `moteJitterMinutt`, `moterOpplaering/Senere`,
`opplaeringsDager`).

**DEL 2 — drypp per tick + planlagte møter:** `TICK` dryppet bakgrunnssalget
LØPENDE: `mål = round(total × nyMinutt/DAG_VARIGHET)`, `n = mål − prosessert`,
`simulerBakgrunnsbolk(products, n, seed)` (SAMME motor/seed som før). Penger +
lager + ticker + per-produkt-stats oppdateres per tick; disken tømmes i sanntid.
`DayBackground` er nå `{ total, prosessert, seed }` (var `{ kunderIgjen,
bolkerIgjen, seed }`). Møtene planlegges på KLOKKESLETT ved OPEN_DAY
(`planleggMoter`): `moterForDag(dag)` møter spredt jevnt mellom `moteForste`
(10:00) og `moteSiste` (16:00) med seed-jitter, scenarier trukket UTEN gjentakelse
til poolen tømmes. Antall avtar: dag 1–2 = 4 møter, fra dag 3 = 2. Kunden spawner
når klokka passerer møtets minutt (`TICK` setter `activeMeetingScenarioId`);
klokka stopper til møtet er løst (`RESOLVE_SALES_SCENARIO`) eller hoppet over
(`SKIP_MEETING`, fyres av `closeSales`). **Koblingen kunde↔navigasjon er FJERNET**
— InteriorView rendrer kunden UTELUKKENDE fra `activeMeetingScenarioId`
(`getScenario`), ingen lokal pool/spawn/remount lenger (gamle `scenario`/`gone`/
`prevPhaseRef`/`sales:closed`-effektene slettet).

**DEL 3 — Dagspuls (`src/game/ui/DagspulsOverlay.tsx`):** fullskjerms livepanel
over butikkscenen mens dagen ruller (z 150, samme visuelle språk som
dagsoppgjøret): stor klokke + fremdriftsstripe, kundeteller (møter + øvrige),
opptjent i dag (salg − varekost, før svinn), tapte salg, løpende ticker med siste
bakgrunnssalg («2 × Kanelbolle — 78 kr», `state.dayTicker`, maks 8), og lagerstatus
per utstilt vare (trau + vindu) som synker utover dagen. **Kundemøter AVBRYTER
panelet:** gate på `activeMeetingScenarioId` ⇒ panelet forsvinner, scenariet spilles
i butikkscenen, panelet kommer tilbake etterpå. Diskret «Minimer»-knapp (liten
pille øverst, butikken synlig bak) + «Steng tidlig». Gates også på `dashboardOpen`.

**DEL 4 — per-produkt-rapport:** `dayProductStats` (Record per produkt: solgt
møter+bakgrunn, svinnStk, tapteSalgStk) akkumuleres per tick/møte og ved CLOSE_DAY
(svinn). `simulerBakgrunnsbolk` bruker en **preferansemodell**: hver vare trekkes
uniformt blant PRISEDE produkter uansett lager — har den lager ⇒ salg, ellers tapt
salg attribuert til AKKURAT den varen (muliggjør per-produkt «gikk tomt»). DayResult
får `tomtProdukter {navn, tapte}[]` og `svinnProdukter {navn, stk}[]` (topp 3 +
«+N til»). Dagsoppgjøret viser to nye linjer «📦 Gikk tomt: …» og «🗑️ Svinn: …».
«Bestill til i morgen» forhåndsmarkerer varene som gikk tomme i Produkter-fanen
(rød ramme + «Gikk tomt i går»-merke, matcher på navn via `state.lastDayResult`).

**Verifisert headless (Playwright, sentrum-l2, `?skip=1`):** klokka tikker
09:01→09:19 på 14 s (≈1 min/tick), Dagspuls rendrer korrekt, bakgrunnssalg dryppes
per tick, møte spawner ~10:45 (planleggMoter sentrerer 1. møte på ~105 min) ⇒
Dagspuls gjemmes, Tom-kunden står okkludert bak disken, klokka pauser. 0
konsollfeil. `tsc -b` grønn. **NB (balanse-flagg):** preferansemodellen (DEL 4)
ENDRER bakgrunnsbalansen vs pkt. 10 (tapte salg treffer nå per produkt uansett
lager) — må RE-VERIFISERES mot 3 000–5 000-båndet etter Espens spilltest; juster
`baseMultiplier`.

## 12. Bemanning — org-kart, vaktliste og kapasitet (docs/BEMANNING.md)

> **Status: bygget + verifisert headless (reducer/kapasitet), IKKE Chrome-
> validert av Espen ennå.** DEL 0 (spillklokka, pkt. 11) er committet som
> milepæl. Bemanning-koden (DEL 1–4) ligger UCOMMITTET til Espen validerer.
> Kontrakt: `docs/BEMANNING.md` (kv1011 — organisering/bemanningsplanlegging).

**Pedagogikk:** eleven bygger organisasjonen fysisk (ansett → benk → org-kart →
vaktliste) og erfarer avveiningen kapasitet vs. lønnskost. For få på vakt = kø
og tapte salg; for mange = lønna spiser dagsresultatet. En ansatt uten vakter
koster fullt og bidrar null.

**DEL 2 — datamodell:** `Employee` fikk `navn` (generert norsk navn), `grenId?`
(org-plassering; undefined = personalbenken) og `vakt? {fra,til}` (klokke-
minutter). Ny state `playerShift`. Nyansatt lander på BENKEN (udisponert).
Rollenavn per bransje via `IndustryDefinition.roller` (kafé: selger →
«Barista/butikkmedarbeider»). **Fjernet** den flate «+10% salgsvolum per selger»
(`engine.employeeBonus`, dev-only simulateMonth) — selgerens bidrag er nå
KAPASITET i den daglige motoren. Markedsfører/Økonom uendret.
**Avvik fra prompt-kontrakten:** beholdt de engelske feltnavnene `role`/`level`/
`monthlySalary` (ikke stilling/nivå/månedslønn) for å unngå å rippe opp engine/
reducer/UI — konseptuelt identisk, all UI er bokmål.

**DEL 3 — org-kart + vaktliste (Personale-fanen, `DashboardOverlay`):**
Org-kart: Daglig leder (spilleren) fast på topp; tre grener Salg/Markedsføring/
Økonomi (HTML5 drag'n'drop). Kort dras benk↔gren; en gren aksepterer KUN sin
egen rolle (selger→salg osv.). Udisponerte står synlig på benken (koster full
lønn). Vaktliste: timegrid 09:00–17:00 (8 én-times luker), én dagsmal.
Pointer-drag «strekker» en vakt over timene (`VaktRad`); klikk ✕ fjerner. Kun
selgere disponert i Salg-grenen + spillerkortet (gratis, Junior-kapasitet) får
rader. Nye reducer-actions: `ASSIGN_EMPLOYEE_BRANCH`, `SET_EMPLOYEE_SHIFT`,
`SET_PLAYER_SHIFT`. «Avslutt arbeidsforhold» = ✕ på kortet (FIRE_EMPLOYEE).

**DEL 4 — kapasitet i bakgrunnssalget:** `balance.kapasitetPerTime`
{ junior 15, senior 22, ekspert 30 } kunder/time. Ren motor:
`backgroundSales.kapasitetPaaVakt(employees, playerShift, klokkeMinutt)` —
summerer selgere på vakt (+ spiller = Junior) ved klokkeslettet. **Regel «ingen
vaktplan = kun spilleren» (ingen regresjon dag 1):** er ingen vakt satt i det
hele tatt, driver spilleren alene på Junior-kapasitet hele dagen. `TICK` opp-
arbeider kapasitet i en pool (`DayBackground.kapasitetRest`, flyttall) og
betjener `min(ankomne, floor(pool))`; overskytende → `dayStats.koKunder` (tapt
salg, årsak «kø»). Dagspulsen viser kø live («⏳ Kø — N kunder gikk»);
dagsoppgjøret splitter tapte salg i «tomt lager» vs «kø». Månedslønn uendret
(`economy.ts`) — ansatt uten vakter koster fullt, bidrar null (poenget).

**BUG FUNNET + FIKSET under verifisering:** kapasiteten ble FØRST bare opp-
arbeidet på tick der en kunde faktisk ankom (accrual lå inne i `if (ankomne>0)`),
så idle-kapasitet mellom kunder gikk tapt → solo-junior fikk spuriøs kø selv på
en rolig dag (1 betjent + 3 kø av 4 kunder). Flyttet accrual UT så pool bygger
seg hvert tick. Etter fiks: dag-1 solo (default basetrafikk, ~min 54) betjener
alle 4 kunder, 0 kø — ingen regresjon.

**Verifisert headless (Playwright):** kapasitet/kø-pathen kjører uten
konsollfeil; dag-1 solo holder unna (0 kø rolig dag), kø-linja rendrer når
kapasitet sprenges. Personale-fanen rendrer org-kart + benk + vaktliste;
ansettelse lander på benken med bransje-rollenavn og nivå-kapasitet (15/22/30 t).
`tsc -b` grønn. **NB (balanse-flagg):** Junior-terskel ≈ 120 kunder/dag
(15/t × 8t). En travel l2-dag (høyt rykte + markedsføring) kan gi mild kø selv
dag 1 — juster `kapasitetPerTime` i balance.ts etter spilltest. DnD-samspillet
(dra kort/strekk vakt) gjenstår for Espens Chrome-validering.

## 13. Organisasjonsdesign — eleven bygger org-kartet selv (docs/BEMANNING.md)

> **Status: bygget + verifisert headless (render/reducer/refleksjon), IKKE
> Chrome-validert.** Bemanning-milepælen (pkt. 12) er nå committet (`7a5d4c9`).
> Denne koden (org-design) ligger UCOMMITTET til Espen validerer drag'n'drop.

**DEL 1 — rollepalett + tomt kart:** Org-kartet starter med KUN Daglig leder.
Rollene er nå DATADREVNE per bransje: `IndustryDefinition.roller` gikk fra
`Record<rolle,string>` til `RolleDef[]` ({ id, funksjon, tittel, emoji, farge,
vaktrolle, maanedseffekt, kjerne }). Kafé: kjerneroller Salg/Markedsføring/
Økonomi + bransjeroller **Innkjøpsansvarlig** og **HMS-ansvarlig**. Eleven drar
et rollekort fra paletten inn i kartet ⇒ `CREATE_ORG_ROLE` oppretter funksjonen
(lagres i ny state `orgRoller: string[]`). Dra en TOM funksjon ned i paletten ⇒
`REMOVE_ORG_ROLE` (reducer + UI blokkerer hvis noen er disponert i den —
funksjons-headeren er kun draggbar når tom). Ansett-panelet viser KUN opprettede
roller; ingen funksjoner ⇒ «Opprett en funksjon først»-hint. **Migrering:**
`aktiveFunksjoner(orgRoller, employees)` tar unionen av `orgRoller` og alle
disponerte `grenId` — en gammel state med ansatte i grener får grenene
auto-opprettet, ingen brukket state.

**Datamodell:** `EmployeeRole` er nå `string` (åpen, datadrevet — kjerne-ids
beholdt: 'selger'/'markedsforer'/'okonom', + 'innkjop'/'hms'). Funksjon = rolle
(1:1), så `grenId` = rolle-id når disponert / undefined på benk. `OrgGren`-typen
fjernet. Bakgrunnssalgs-kapasiteten nøkler fortsatt på salgsrollen ('selger',
`vaktrolle: true`) — motoren uendret.

**DEL 2 — konsekvens + refleksjon (ALDRI fasit):** Motoreffekter uendret
(Salg = kapasitet på vakt; Markedsføring/Økonomi som før; Innkjøp/HMS er ren
org-forståelse uten motoreffekt). Ny ren regelmotor `data/orgRefleksjon.ts` —
TUNBAR data (`REFLEKSJONSREGLER` + `ORG_REGEL_PARAM.okonomiOmsetningsterskel =
100 000`): mangler Salg → «hvem betjener kundene når du ikke er der?»; mangler
Økonomi over terskel → «hvem følger med på tallene?»; alle på benk → «du betaler
lønn — hvem gjør hva?». Alle er SPØRSMÅL, ikke svar. «🔍 Se over organisasjonen»
i Personale-fanen viser ALLE reglene som slår ut; `CLOSE_DAY` velger den ÉNE
viktigste (høyest `prioritet`, `toppRefleksjon`) og legger den i
`DayResult.refleksjon` → dagsoppgjøret viser maks én diskret 🤔-linje (ikke mas).

**Verifisert headless (Playwright):** tomt kart-hint, full rollepalett
(Salg/Markedsføring/Økonomi kjerne + Innkjøp/HMS bransje), ansett-gating,
«Se over organisasjonen»-panel med spørsmål, og dagsoppgjørets 🤔-refleksjonslinje
— alt rendrer, 0 funksjonsfeil (kun eksisterende tab-bar `border`-shorthand-
advarsel). `tsc -b` grønn. **Gjenstår for Chrome:** selve drag'n'drop-samspillet
(opprett funksjon / disponer kort / fjern funksjon) — HTML5-native DnD lar seg
ikke simulere pålitelig headless.

## 14. Scenarioutvidelse — 8 nye kafé + 6 klesbutikk (kv1011/kv1012)

> **Status: skrevet + verifisert headless (render + full gjennomspilling m/gren),
> IKKE spilltestet av Espen. Ren INNHOLDSJOBB — motoren er urørt.** All kode i
> `src/game/sales/scenarios.ts`. `tsc -b` grønn.

**Konvensjoner (uendret motor):** base 50, good +10 / warn −3 / bad −12,
behovstreff +8 (via `kind:'recommend'`), personaMatch = ren XP-bonus (+10 XP).
Forgrening via `choice.next`; dynamiske steg `recommend` / `stock-commit` /
`margin-discount`; `sell` med `qty`; `{price:id}`/`{stock:id}`-tokens.

**Registrering:** de 8 kafé-scenariene er lagt i `SCENARIOS` (⇒ automatisk i
`CAFE_SCENARIO_IDS` og dagens møte-pool). De 6 klesbutikk-scenariene ligger i en
EGEN `FASHION_SCENARIOS` + `FASHION_SCENARIO_IDS` og er IKKE i `SCENARIOS` — de
typesjekker og kan slås opp (`getScenario` søker nå `[...SCENARIOS,
...FASHION_SCENARIOS]`), men aktiveres ikke (KLESBUTIKK er ikke registrert).

### Globale antakelser / flagg
- **Sprites (kafé): LØST — se pkt. 16.** (Historisk: pekte først til
  plassholder-sprites; nå egne, splittet fra customers-ark-03/04.)
- **Sprites (klesbutikk):** peker til `/assets/raw/customers/fashion/<navn>.png`
  (finnes ikke ennå). Rendres ALDRI i dag siden bransjen er inaktiv, så ingen
  brukket img. Må lages når bransje 2 aktiveres.
- **Plagg-id-er (klesbutikk):** `needTags` treffer BÅDE antatt katalog-id OG
  bokmålsnavn + synonymer (f.eks. `['hettegenser','hoodie','genser',…]`), så
  oppslaget overlever om id-er endres. Antatt fashion-katalog (industries.ts):
  `hoodie, tshirt, jeans, sneakers, cap, bag`. Justeres id-ene, bør tag-listene
  få et raskt blikk, men de er bevisst brede.
- **personaTag:** kafé-scenariene bruker kun de fire eksisterende tag-verdiene
  (Karriereorienterte/Familieorienterte/Helsebevisste/Prisbevisste) så
  målgruppe-bonusen kan matche. Fashion bruker plausible tags (Trendbevisste
  m.m.) — irrelevant i praksis siden bransjen er inaktiv.
- **Ingen navn-gjenbruk** fra eksisterende personaer (Kari/Tom/Sunniva/Roger/
  Maren/Fredrik). Nye: Amira, Bjørn, Camilla, David, Emil, Live, Petter, Oda
  (kafé) · Selma, Kristoffer, Ada, Vetle, Ronja, Sander (klesbutikk).

### DEL 1 — kafé (8)

1. **Kryssalget (Amira)** — *mersalg/kryssalg.* Kompetansemål: behovsavdekking +
   relevant kryssalg (drikke til mat), timing. **Gren:** god = lavmælt, relevant
   kryssalg (sell `KALD_DRIKKE` addon) → hopp til avslutt; warn = ingen mersalg;
   bad = dynge på → **forgrening til `gjenoppr`** (gjenopprett stemningen: god =
   ærlig retrett / warn = fortsetter maset / bad = stikk til kunden). Poeng:
   relevans + timing slår volum; et pushy mersalg må repareres, ikke gjentas.
2. **Angreretten (Bjørn)** — *forbrukervern: angrerett vs. butikkjøp.* Mål: vite
   at angrerettloven gjelder FJERNSALG (nett/utenfor butikk), ikke butikkjøp
   uten mangel. **Gren (KJERNE `rettigheter`):** god = korrekt (ingen lovpålagt
   angrerett i butikk) + kulanse-bytte; warn = usikker; bad = FEILINFORMERER
   (bekrefter en angrerett som ikke finnes). Ender i recommend av erstatningsvare
   (bytte). Poeng: skille plikt fra service; feil fakta er feil selv når det
   virker snilt.
3. **Hastverkskunden (Camilla)** — *lese tidsramme, tilpasse tilbud.* Mål:
   effektiv service, IKKE mersalg når tid er behovet. Kontrast til Morgenkunden
   (der mersalg var riktig). **Gren:** `recommend BAKEVARE` (ferdigvare, ingen
   venting); `fristelse`-steget: god = dropp mersalg, rask betaling → avslutt;
   bad = push laget vare → **forgrening til `irritasjon`**. Poeng: timing avgjør
   om et mersalg hjelper eller skader.
4. **Gavekjøpet (David)** — *behovsavdekking i TO LEDD.* Mål: ved gavekjøp avdekk
   MOTTAKERENS behov (hvem/anledning → hva de liker), ikke kjøperens smak.
   **Gren:** `inn`/`hvem`/`hva` bygger to-ledds-avdekking; bad-valgene anbefaler
   ut fra Davids egen smak eller overkjører «drikker ikke kaffe». Recommend
   `SOT_TAGS` + mottaker-tilpasset mersalg (ikke-kaffe drikke). Poeng: gaven
   handler om den som får den.
5. **Studentrabatten (Emil)** — *prispolitikk + likebehandling.* Mål: konsistent
   pris, rettferdig verdi (lojalitetskort) framfor tilfeldig «hysj-rabatt».
   Kontrast til Prutekunden (aggressiv pruting) — her et rimelig spørsmål.
   **Gren (KJERNE `politikk`):** god = samme pris for alle + kaffekort; warn =
   hemmelig rabatt (forskjellsbehandling, undergraver prisintegritet); bad =
   nedlatende avvisning. Poeng: rabatt skal være en ordning, ikke en forskjells-
   behandling.
6. **Likeverd (Live)** — *universell utforming / likeverdig service*
   (`service`). Mål: møte kunde med nedsatt funksjonsevne kompetent og
   likeverdig; førerhund har adgang; les menyen høyt; snakk TIL, ikke OM.
   **Gren:** `inn` (velkommen + førerhund vs. nekte hund), `les` (beskriv vs.
   vagt vs. velg for henne), `verdighet` (la henne ta tid vs. snakke høyt/sakte
   vs. snakke om henne til køen), avslutt (tilby hjelp — men SPØR, ikke overta).
   Poeng: verdighet + praktisk hjelp uten umyndiggjøring.
7. **Ventetiden (Petter)** — *service recovery UTEN reklamasjon* (`service`).
   Mål: kø er servicetap, ikke mangel; erkjenn, beklag uten «men», konkret
   tiltak, RIMELIG kompensasjon. **Gren:** `inn` (eie vs. bortforklare vs.
   avvise), `tiltak` (hent kollega vs. vagt vs. fraskrivelse), KJERNE
   `kompensasjon` (liten gest `cost:39` vs. ingenting vs. OVERkompensasjon).
   Poeng: proporsjonal gest slår både null og overdådig.
8. **Førstegangskunden (Oda)** — *usikker førstegang, variant 2 (språklig
   terskel).* Mål: oversett fagsjargong (flat white/cortado) til smak, ikke
   nedlatende. Kontrast til Den usikre (anledning-basert). **Gren:** `oversett`
   (smaks-spørsmål vs. mer sjargong vs. «bare ta en latte»), `preferanse`
   (bygg på «mild» vs. ignorer vs. push sterkest). Recommend `VARM_DRIKKE`.
   Poeng: møt kunden der hun er.

### DEL 2 — klesbutikk (6, inaktive)

9. **Størrelsesrådet (Selma)** — *passform uten å gjette størrelse.* Mål: spør om
   ønsket passform, tilby prøving; ikke gjett/kommenter kropp. **Gren:** `inn`
   (samarbeid vs. gjett størrelse vs. kroppskommentar), `passform` (tettsittende/
   oversized), KJERNE `prov` (prøverom vs. gjett vs. «bytt hvis feil»). Recommend
   `OVERDEL`.
10. **Gavebyttet (Kristoffer)** — *gavebytte = kulanse, ikke lovkrav.* Mål: skille
    plikt (ingen bytterett ved feil størrelse) fra service (kulanse +
    byttekvittering). **Gren (KJERNE `kulanse`):** god = ærlig (ingen lovpålagt
    bytterett) + hjelper gjerne; warn = «full bytterett alltid» (feil); bad =
    «heldig som får lov» (nedlatende). Recommend `PLAGG` i riktig størrelse.
11. **Sesongsalget (Ada)** — *ærlig prispolitikk / sesong.* Mål: ikke lyv om
    «aldri salg», ikke falsk knapphet; legg fram avveiningen (sikre nå vs. sjanse
    på salg der størrelsen kan være utsolgt). Kobler til `svinnRegel
    'sesong/kolleksjon'`. **Gren:** `inn`/`politikk` (ærlig avveining vs. press
    vs. løgn). Recommend `OVERDEL`.
12. **Plaggreklamasjonen (Vetle)** — *forbrukervern: mangel vs. slitasje*
    (`service`, enkel, INGEN eskalering). Mål: søm som ryker på to uker = mangel
    (produksjonsfeil) → reklamasjonsrett. **Gren (KJERNE `vurder`):** god =
    mangel + reklamasjonsrett; warn = usikker; bad = «slitasje» (faktafeil).
    `losning`: omlevering (`cost:250`) vs. liten rabatt vs. «sy den selv».
13. **Stilrådet (Ronja)** — *råd mot anledning/behov, helhet.* Mål: avdekk
    anledningen (jobbintervju), råd mot den (ryddig, ikke trend/egen smak), tenk
    antrekk. **Gren:** `inn`/`anledning` (kontekst vs. trend vs. egen smak);
    `helhet`-mersalg: god = passende bukse (sell `BUKSE` addon) / bad = caps til
    intervju (bryter anledningen). Recommend `OVERDEL`.
14. **Budsjettkunden (Sander)** — *respekter budsjett, verdi, ikke oppsell.* Mål:
    finn best verdi INNENFOR 500, vær ærlig, ikke press over grensa. **Gren:**
    `inn` (ta budsjett på alvor vs. antyde for lavt vs. avvise), KJERNE `verdi`
    (kvalitet per krone vs. «billigst» vs. press oppover), avslutt (ikke stikk om
    «litt mer»). Recommend `ACCESSOAR` (varer innen 500, f.eks. caps).

**Verifisert:** alle 14 åpner og rendrer hvert steg (0 konsollfeil); full
gjennomspilling av Kryssalget bekreftet forgrening (bad kryssalg → `gjenoppr`) →
resultatkort → Fullfør. `recommend`-steget kan aldri låse seg — det lister alltid
hele sortimentet + «det fører vi ikke»-valget (ærlig = god når ingen vare
matcher). **Gjenstår:** Espens spilltest av dialogkvalitet/scoring + endelige
sprite-assets.

## 15. Låneavdrag i dagssyklusen + sprite-fallback

> **Status: bygget + verifisert headless (unit + full in-game månedsrull med
> aktivt lån). MOTORENDRING — koden er committet lokalt (f15cd5f, 5348acf), IKKE
> pushet. Kodepush venter på Espens Chrome-sjekk av månedsoppgjøret.** `tsc -b`
> grønn etter hver del.

**DEL 1 — låneavdrag (den flaggede TODO-en, nå løst):** Amortiseringslogikken er
FLYTTET ut av `APPLY_MONTH_RESULT` til én delt, ren kilde
`economy.amortiserLaan(loans)` → `{ loans, renteSum, avdragSum, betaling }`
(rente = restgjeld × årsrente/12; avdrag = månedsbetaling − rente, klemt mot
restgjelda; nedbetalt lån (restgjeld 0) fjernes). BÅDE dagssyklusens månedsrull
(`START_NEW_DAY`) OG den gamle `APPLY_MONTH_RESULT` kaller nå denne — ingen
duplisert beregning, ingen dobbel-amortisering. Ingen ny rentemodell (samme
formel som før).
- **START_NEW_DAY:** ved månedsrull trekkes `fasteKostnader + amort.betaling` fra
  kassa; `loans`/`monthlyLoanPayment`/`totalDebt` oppdateres fra `amort.loans`.
  `economy.manedligeFasteKostnader` er fortsatt ENESTE kilde til FASTE kostnader
  (lån er en egen kategori).
- **APPLY_MONTH_RESULT (`?dev=1`):** bruker nå samme helper KUN for å oppdatere
  restgjelda — selve betalingen trekkes fortsatt via `r.profit` (engine.ts har
  `monthlyLoanPayment` i kostnadene), så `money` røres ikke der (ingen
  dobbelttrekk). Begge veier gir samme amortisering én gang per måned.
- **MonthSettlement:** nye felt `laanRenter` / `laanAvdrag`; `resultat = inntekt
  − fasteKostnader − renter − avdrag`. Månedsoppgjøret (MonthResultOverlay) viser
  en egen «LÅNEAVDRAG»-seksjon (renter + avdrag skilt) når det finnes lån.
- **Kontantstrøm (Økonomi-fanen):** den dempede «TODO»-linja er ERSTATTET av to
  ekte linjer «Lån — renter» / «Lån — avdrag», nå MED i burn/netto (reell
  månedlig utbetaling). Nedbetalt lån gir tom split ⇒ 0 (slutter å trekke).

**DEL 2 — sprite-fallback:** kunde-`<img>` i `InteriorView` fikk `onError` +
en diskret SVG-silhuett (hode/overkropp, `#334155`) som vises i stedet for et
brukket bilde når en sprite mangler/feiler. `custImgFailed` nullstilles ved hvert
nye møte (activeMeetingScenarioId-endring), så en gyldig sprite alltid forsøkes
først. Relevant når de 8 nye kafé-scenariene bytter fra plassholder-sprites til
endelige filnavn (pkt. 14) — feil/manglende sti gir da silhuett, ikke brukket ikon.

**Verifisert headless:**
- *Unit (`amortiserLaan`, 100 000 @ 9 %/12 mnd):* rente+avdrag = betaling hver
  måned, restgjeld amortiseres korrekt, når 0 etter 13 mnd (siste betaling en
  liten rest), lån fjernes, og påfølgende `betaling = 0` (trekket STOPPER).
- *Full in-game månedsrull (lån 100 000 @ 12 %/12 mnd, drevet 12 dager):*
  Månedsoppgjør viser Renter −1 000 + Avdrag −7 885 (= 8 885 betaling); kassa
  250 000 → 239 115 = −10 885 (faste 2 000 forsikring + betaling 8 885); avdrag >
  renter tidlig i lånet. 0 konsollfeil.
- *Sprite-fallback:* med kunde-PNG blokkert spawner møtet og silhuett-`<svg>`
  vises (ingen brukket `<img>`), 0 konsollfeil.

**Gjenstår:** Espens Chrome-sjekk av månedsoppgjøret (da pushes koden).

## 16. 8 nye kundesprites (dagjobb 08.07)

> **Status: laget + verifisert headless. Kode/assets committet lokalt, IKKE
> pushet — venter på Espens Chrome-blikk på et par av kundene.** `tsc -b` grønn.

**DEL 1 — split:** `customers-ark-03/04-raw.png` (1375×768, 4 blobs hver) splittet
med `scripts/split-product-sheet.py` (nye navnekart lagt inn: ark 03 = amira,
bjorn, camilla, david · ark 04 = emil, live, petter, oda). Alle 8 → ren alfa,
halo=0.
- **Live + førerhund:** selen holder kvinne + hund SAMMEN som ÉN connected
  component (auto-deteksjonen «feilet» ikke slik oppgaven fryktet — de ble én
  blob, x442-696), så ingen manuell sammenslåing trengtes.
- **✦-vannmerket:** fjernet automatisk av rembg (semi-transparent på nær-hvit
  bakgrunn = bakgrunn) — ingen vannmerke-blob overlevde på noen av arkene.
- **Petters logo-brystlapp:** klone-patchet bort (x141-165, y163-186) ved å fylle
  med lokal median lerret-farge + svak luminans-støy, fjæret kant. Ingen
  brystlogo igjen; ingen andre merker (hammerløkke på benet er funksjonell, ikke
  tekst/merke). Ren tekstfri sprite (CLAUDE.md-krav).

**DEL 2 — koble:** de 8 plassholder-stiene i `scenarios.ts` byttet til
`customers/<navn>.png`. onError-fallbacken (pkt. 15) står som sikkerhetsnett.

**Verifisert headless (Playwright):** alle 8 nye sprites lastes i browseren
(naturalWidth × naturalHeight = splittens dimensjoner, alle OK); ett ekte
kundemøte i scenen viser `<img>` (lastet, ingen `<svg>`-silhuett-fallback). 0
konsollfeil. Rå-arkene (customers-ark-03/04-raw.png) committet for reproduserbar
re-splitt.

**Gjenstår:** Espens Chrome-blikk på et par av kundene (så pushes kode/assets).

## 17. Dev-scenariovelger (?dev=1)

> **Status: bygget + verifisert headless. Kode committet lokalt, IKKE pushet —
> kode etter validering.** `tsc -b` grønn.

Diskret 🎭-panel i kassevyen (`InteriorView`, kun bak `?dev=1`, z 160 så et åpent
scenario dekker det). Lister ALLE scenarier gruppert **Kafé (14)** og
**Klesbutikk (6)** med tittel (pen id) + kundenavn (+ «· service»-merke).
- **Start = ekte flyt:** klikk dispatcher samme `dev:openSalesScenario`-event som
  dashbord-dev-knappene → åpner den EKTE `SalesScenarioOverlay`. Scoring,
  lager-lesing (recommend/sell/stock-commit) og resultatkort er dermed identiske
  med et planlagt møte (RESOLVE_SALES_SCENARIO). Verifisert: rykte/XP/nivå endres
  som i ekte spill.
- **Klokka:** pauser mens overlayet er åpent (`salesOpen`-gaten i GamePage) og
  fortsetter etterpå (verifisert 09:02 → 09:13 over 3 scenarier).
- **Poolen røres ikke:** RESOLVE markerer bare et `dayMeetings`-møte som «done»
  når ett er SPAWNET (⇔ `activeMeetingScenarioId` satt). Dev-start skjer uten
  spawnet møte ⇒ `meetingIdx = -1` ⇒ planlagte møter er urørt og spawner fortsatt
  til sine klokkeslett. Ekstra sikring: dev-start er DEAKTIVERT (dimmet + hint)
  mens en ekte kunde står i scenen. (`meetingsToday`-telleren øker som ved et
  ekte møte — bevisst «identisk flyt», ikke en pool-endring.)
- **✓-merking:** spilte scenarier merkes ✓ i lista (kun lokal panel-state).
- **Klesbutikk (inaktiv):** åpnes for dialog-gjennomlesing; dynamiske steg finner
  ingen plagg i kafé-sortimentet og bruker «det fører vi ikke»-veien; kunde-
  spriten faller til silhuett (onError, pkt. 15). Ingen crash.

**Verifisert headless (Playwright, ?dev=1):** 3 scenarier startet fra panelet —
1 kafé full flyt (Morgenkunden), 1 kafé m/forgrening (Kryssalget → `gjenoppr`),
1 klesbutikk (Størrelsesrådet) — alle viste resultatkort, dagen fortsatte, ✓ satt,
0 konsollfeil.

## 18. Læringslaget — mentor + fagord (kveldsjobb)

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode/
> assets committet lokalt, IKKE pushet — kode etter Espens Chrome-validering.**
> Gjenoppbygging av Unity-designet (GlossaryHelper/ClickableText/EspenDialog) i
> byspillet, koblet på eksisterende `src/data/glossary.json` (141 begreper).

**DEL 0 — mentor-assets:** `mentor-espen-01/02-raw.png` → rembg (ren alfa, gul
bakgrunn + ✦-vannmerke fjernet automatisk som bakgrunn), croppet til figuren →
`mentor/espen-smil.png` (01, smilende) + `mentor/espen-noytral.png` (02, nøytral).

**DEL 1 — `data/glossary.ts` (adapter, ingen duplisering):** typet, indeksert
oppslag over JSON-en. JSON-en er BLANDET kodet (ekte å/ø/æ + ASCII-translitterasjon
å=aa/ø=oe/æ=ae). Normalisering skjer PER ORD med en kuratert **unntaksliste** for
ekte digrafer (noe/noen/naboen/videoer/poeng/fakturaen) og kjente kildefeil
(rettet), pluss et kategori-visningskart (f.eks. «Okonomi»→«Økonomi», ingen digraf
å slå på). `byId`, `byTerm` (case-ufølsom), `search`, `filter(category/level)`,
`categoryLabel`, `CATEGORIES`. Verifisert: alle 141 normalisert uten korrupsjon.

**DEL 2 — `<Fagord id>tekst</Fagord>`:** diskret stiplet understrek; klikk åpner
et forklaringskort (portal-popover, klemt til viewporten) med term, definisjon,
formel, **dynamisk eksempel fra elevens egne tall** der mulig (DB/DG på hoved-
produktet, faste kostnader = elevens faktiske sum, rente = elevens lån — ellers
fallback til det statiske eksempelet), «⚠️ Vanlig feil» (common_mistake) og
klikkbare relaterte begreper (bytter term i samme kort). Første bølge markert:
Økonomi-fanen (Runway→Likviditet, KONTANTSTRØM, Lån-renter, AKTIVE LÅN→Gjeld),
bankdialogen (Lånebeløp→Gjeld, rentekostnad→Rente), MonthResultOverlay (Faste
kostnader, Renter, Månedsresultat→Resultat), DayResultOverlay (Svinn),
Priser-fanen (Innkjøp→Variable kostnader, Margin→Dekningsgrad). Scenariotekstene
er IKKE rørt (under spilltest).
- *Flagg:* enkelte spill-termer mangler eksakt begrep i glossary-en (avdrag,
  nedbetalingstid, tapt salg, utsalgspris) — brukte nærmeste korrekte (lån→Gjeld,
  runway→Likviditet, margin→Dekningsgrad) eller lot være å markere. Kandidater for
  nye glossary-oppføringer senere.

**DEL 3 — mentoren (Espen):** hjørnefigur nede th (nøytral i hvile, smil når han
snakker), kort snakkeboble + lukk. Triggere i tunbar `data/mentorTriggers.ts`
({ id, betingelse-beskrivelse, melding }) — 7 stk: forste_prising, forste_apning,
forste_tomt_trau, forste_manedsoppgjor, forste_laan, forste_ko, forste_svinn.
Selve sjekkene ligger i `Mentor.tsx` (nøklet på id): 6 tilstands-avledede +
forste_prising via `mentor:signal`-event fra Priser-fanen. Hver trigger fyres
MAKS ÉN GANG — settet persisteres i **localStorage** (`mentor_fired_v1`), siden
byspill-state ikke lagres ellers, så én-gangs-logikken overlever reload. ALDRI
modal; avbryter ALDRI et åpent scenario/overlay — meldinger KØES til ingen
blokkerende flate er åpen. Klikk på figuren uten melding = åpne ordboken.

**DEL 4 — Ordbok-fane:** ny «📖 Ordbok» i dashbordet — søk (term+definisjon),
nivåfilter (VG1/VG2), kategorifilter, alfabetisk liste. Hvert begrep er et
`<Fagord>` → SAMME forklaringskort som ute i flatene.

**Verifisert headless (Playwright):**
- Fagord: 3 kort åpnet — Kontantstrøm (statisk), **Rente (dynamisk «🧮 DITT
  EKSEMPEL» med elevens lån-tall)**, og et ordbok-treff. Alle viste term/def/formel.
- Ordbok: søk «dekningsbidrag» → 141 → 3 treff; klikk på treff åpnet kort.
- Mentor: 2 meldinger fyrte (forste_apning + forste_prising); forste_prising KØET
  bak dagsoppgjøret og vist FØRST etter at oppgjøret ble lukket (avbrøt ikke).
- **Én-gangs over reload:** `localStorage` bevarte `["forste_apning",
  "forste_prising"]`; etter reload + ny dagåpning RE-fyrte forste_apning IKKE.
- 0 konsollfeil i alle løp.

## 19. HUD-opprydding + kontekstuell mentor (dagjobb)

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode
> committet lokalt, IKKE pushet — kode etter Espens Chrome-validering.**

**DEL 1 — HUD:** (a) «Vis veier»-røntgen-togglen vises nå KUN på bykart-nivået
(`onMaster` prop) — den styrer by-røntgen og er meningsløs i bydel/butikk. (b) De
fire 4P-badgene er erstattet av én **💻 Dashbord**-knapp øverst th (åpner
Bedriftsdashboardet på Oversikt). 4P-fremdriften er FLYTTET til Oversikt-fanen
(klikkbare P-kort → hopper til riktig fane; markert med `<Fagord id="MKT_001">`
markedsmiksen) — og til mentoren (DEL 2).

**DEL 2 — kontekstuelle mentor-triggere** (samme mentorTriggers-mønster, maks én
gang, køes bak overlays): `forste_disk_stell` (disk-/monterflaten åpnet — melding
med KLIKKBARE fagord `[[MKT_003|Bredde]]` / `[[MKT_047|kategorier]]` /
`[[MKT_004|dybde]]`), `forste_vindu` (vindusstyling), `forste_p_fullfort` +
`alle_p_fullfort` (tilstands-avledet på p1..p4), `forste_bykart` (bykartet).
Fagord i bobla via nytt token-format `[[GLOSSARY_ID|tekst]]` som `Mentor.tsx`
parser til `<Fagord>`. Flate-signaler dispatches fra MonterScene/WindowDisplay/
CityMapView (`mentor:signal`-event, som forste_prising). Refleksjonsmønster
(spørsmål tilbake, aldri fasit).

**DEL 3 — nye glossary-oppføringer** (`src/data/glossary.json`, ekte æ/ø/å, samme
skjema): **Avdrag** (ECO_029), **Nedbetalingstid** (ECO_030), **Tapt salg**
(SAL_002), **Utsalgspris** (ECO_031), **Produktkategori** (MKT_047). NB:
Sortimentsbredde/-dybde FANTES alt (MKT_003/004, VG2) — ikke duplisert. Alle med
definisjon/example/common_mistake på VGS-nivå og kryss-lenkede related_terms.
Markert der de hører hjemme: bankdialog (nedbetalingstid, avdrag), månedsoppgjør
(avdrag), dagsoppgjør (tapt salg ×2), Priser-fanen (utsalgspris), mentor-melding
(produktkategori + bredde/dybde). *Flagg fra pkt. 18 lukket.*

**Verifisert headless (Playwright):** bykart viser «Vis veier», kaféen gjør IKKE;
💻 Dashbord åpner dashbordet (4P i Oversikt); `forste_disk_stell` fyrer på
disk-flaten med 3 klikkbare fagord i bobla (klikk «kategorier» → Produktkategori-
kort); alle 7 nye/flaggede begreper søkbare i Ordboken. `tsc -b` + `vite build`
grønn, 0 konsollfeil.

## 20. Ordboken hjem til mentoren + mentor i dashbordet (dagjobb)

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode
> committet lokalt, IKKE pushet — kode etter Espens Chrome-validering.**

**DEL 0 — assets:** `espen-leser.png` (leser i bok) og `espen-peker.png`
(pekefinger) via rembg + største-blob-crop (droppet «F»-pille og ✦-vannmerke på
peker). Ligger i `public/assets/raw/mentor/` sammen med nøytral/smil.

**DEL 1 — ordboken bor nå hos mentoren.** Ordbok-innholdet er ekstrahert til
`src/game/ui/OrdbokPanel.tsx` (søk + nivå-/kategorifilter + alfabetisk liste,
hvert begrep et `<Fagord>`). En diskret **📖-knapp** ligger alltid ved figuren;
klikk boka ELLER figuren (uten aktiv melding) → ordboken «slår seg opp» i et
bok-rammet panel ved figuren (framer-motion scaleX/rotate-animasjon, ingen nye
biblioteker), og Espen bytter til **leser-posen**. **📖 Ordbok-fanen er FJERNET
fra dashbordet** (`OrdbokTab` + ubrukte glossary-imports slettet) — ordboken har
ett hjem. Åpnes også mens dashbordet står åpent (mentor over alt, z-500).

**DEL 2 — mentor synlig i dashbordet.** `blocked` ekskluderer nå `dashboardOpen`;
figuren tegnes i hjørnet nede th (z-500) også over dashbord/oppgjør. Dashbord
BLOKKERER IKKE lenger — fane-triggerne vises INNE i det åpne dashbordet (bekreftet
i skjermbilde: `priser_fane`-boble med klikkbare fagord over åpen Priser-fane).
Scenario/dagsoppgjør/leiepanel køer fortsatt.

**DEL 3 — fane-triggere + prissettingsbegreper.** 8 nye triggere (`mentorTriggers.ts`),
én per fane, første besøk, dispatchet fra `DashboardOverlay` via `FANE_TRIGGER`-
mapping på `activeTab`: `produkter_fane`, `priser_fane`, `malgruppe_fane`,
`marked_fane`, `personale_fane`, `okonomi_fane`, `forretningsplan_fane`,
`lokasjon_fane` — alle med `[[GLOSSARY_ID|ord]]`-fagord og refleksjonsspørsmål.
3 nye prissettingsbegreper (`glossary.json`, ekte æ/ø/å): **Kostnadsbasert**
(MKT_048), **Konkurransebasert** (MKT_049), **Verdibasert prissetting** (MKT_050).
Skumming (MKT_011 «Skumme-fløten-strategi») og penetrasjonspris (MKT_012
«Inntrengningsstrategi») FANTES alt — ikke duplisert. Ny **strategi-strip** i
Priser-fanen med 6 klikkbare fagord (de tre basene + psykologisk prising +
skumme fløten + inntrengningspris). 149 begreper totalt.

**DEL 4 — vente-signal.** Pose-prioritet **leser > smil > peker > nøytral**. Når
en melding ligger i kø bak en blokkerende flate bytter figuren til **peker-posen**
(stille «jeg har noe til deg»); klikk peker-figuren → `forceShow` viser meldingen
umiddelbart, ellers vises den av seg selv når flaten lukkes.

**Verifisert headless (Playwright):** boka åpner/lukker med leser-pose; ordbok-
fanen er borte fra dashbordet (0 treff); `priser_fane` + `produkter_fane` fyrer
INNE i åpent dashbord med klikkbare fagord (klikk «verdibasert»/«skumme fløten» →
kort); strategi-strip viser alle 6 fagord når et produkt er bestilt; de 3 nye
begrepene søkbare (149 totalt). `tsc -b` + `vite build` grønn, 0 konsollfeil.

**Flagg:** `MKT_011`-eksempelet nevner **ekte merkenavn** («Sony … PlayStation»)
— bryter innholdsregelen (kun fiktive navn). Eksisterende oppføring (ikke rørt
denne runden), men den er nå synlig i Priser-fanen via strategi-strip'en —
anbefaler Espen omskriver eksempelet til et fiktivt produkt.

## 21. Regelendring (merkenavn) + UI-fikser fra Espens Chrome-funn

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode
> committet lokalt, IKKE pushet — kode etter Espens Chrome-validering.**

**Regelendring — ekte merkenavn tillatt i undervisningsinnhold.** `CLAUDE.md`
oppdatert: ekte merkenavn/selskaper ER nå tillatt i glossary-eksempler og annet
undervisningsinnhold når de brukes faktabasert/pedagogisk (som i fagbøker) —
f.eks. «iPhone bruker skumming ved lansering». Fortsatt ALDRI i NB-bilder/assets,
aldri nedsettende, og aldri som fiktive aktører i spillmekanikken (leverandører/
kunder/konkurrenter i spillet forblir fiktive). Flagget fra pkt. 20 er dermed
LUKKET: `MKT_011` beholdes (Sony/PlayStation OK), og iPhone lagt til i eksempelet
i tillegg («En ny iPhone (eller Sony en PlayStation) …»).

**UI-fiks 1 — «Live økt»-badgen kolliderte med mentoren.** `LiveBar` (global
statusindikator for elever i live økt) lå `fixed bottom:20 right:20 z-9999` —
rett oppå spill-mentoren nede th, og dekket figur + boble. Flyttet til
`top:70 right:20` (opp ved menyen/HUD, ved 💻 Dashbord). Global komponent — vises
kun i aktiv live økt, så full visuell sjekk hører til Espens Chrome-validering.

**UI-fiks 2 — pose-logikk verifisert.** Invariansen holder allerede i koden:
`smil ⇔ melding != null ⇔ boble rendres`. En melding som ikke KAN vises (blokkert,
ikke force-vist) gir `melding=null` ⇒ pose blir **peker** (kø) eller nøytral —
**aldri smil uten boble**. «Delvis skjult / boble manglet» skyldtes utelukkende
LiveBar-overlappen (z-9999 > mentor-z 500); mentor-containeren (z 500) ligger over
alle spill-overlays (dashbord 180, salg 190, oppgjør 260), så bobla er aldri bak
dem. La til en INVARIANT-kommentar i `Mentor.tsx`.

**Verifisert headless (Playwright):** pose-kjede i ro→kø(blokkert)→klikk:
`noytral → peker (0 boble-noder) → smil (boble synlig)`; boble rendret OVER åpent
salgsscenario (z-orden ok). `tsc -b` + `vite build` grønn, 0 konsollfeil.

## 22. Spilltest-fikser (5 funn) + dev-port-lås

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode
> committet lokalt, IKKE pushet — kode etter Espens Chrome-validering.**
> (Dev-port-låsen `vite.config` ble committet på eget grunnlag da Espen ba om det.)

**P1 — levering ved DAGSTART, ikke ved åpning.** Vareleveransen (ankomne
`incomingOrders` → lager + `lastDelivery`/«Ferske varer klare»-banner) er flyttet
fra `OPEN_DAY` til `START_NEW_DAY` i `GameContext`. Lageret fylles nå FØR åpning,
så eleven kan stelle disk/vindu med de nye varene og så åpne — slik ekte
butikkdrift fungerer. Ny hendelses-trigger `forste_bestilling_levert` (mentor:
«Varene du bestilte i går er her — still dem ut i disken før du åpner …»).

**P2 — ingen kunde i stengt butikk + Live m/hund.** In-scene-kunden rendres nå
KUN når `dayPhase === 'åpen'` (InteriorView-gate), aldri i stengt/oppgjør. Rot-
årsak til et gjenstående aktiv-flagg lukket: `RESOLVE_SALES_SCENARIO` nullstiller
nå ALLTID `activeMeetingScenarioId` (før: bare `inDay`). `live.png`-assetet er
bekreftet å inneholde HELE førerhund-blobben (ikke beskåret), og render bruker
hele PNG-en. **Flagg:** på den delte kunde-skalaen (waist-forankret, 1.3×) havner
hunden UNDER disk-okklusjonen/utenfor synsfeltet. La til hook `spriteScale?` på
`SalesScenario` (+ brukt i InteriorView) — Live trenger en egen, MINDRE skala som
må traces av deg via `?dev=1` (skala-slideren mens Live er aktiv). Jeg gjettet
ingen verdi.

**P3 — duplikate bestillingslinjer slås sammen.** `ORDER_PRODUCT` merger nå en ny
bestilling inn i en eksisterende `incomingOrder` med samme vare + samme
leveringsdag (sum antall + kostnad) i stedet for å legge til en ny rad. Fikser
både data og «Underveis»-visning.

**P4 — fane-meldinger kontekstbundne.** Fane-triggere (`fane`-felt i
mentorTriggers) er skilt ut fra hendelses-køen til en egen kanal (`mentor:fane`).
Mentoren viser fane-hintet KUN mens den fanen er aktiv; rekker det ikke frem
(ordbok/blokkert/aktiv hendelsesmelding ved fanebytte) markeres det IKKE fyrt ⇒
re-armes til neste besøk. Aldri drypp i feil fane eller ute i spillet. Flere
triggere på samme fane sekvenseres (én per besøk). Hendelses-triggere beholder
kø + peker-oppførselen. `forste_prising` er nå også fane-bundet (priser).

**P5 — Maren: mottaker-tilpasset mersalg.** Det hardkodede 8×-drikke-mersalget
(som resolverte til kaffe) er erstattet av et valg-steg etter David-mønsteret:
barnevennlig drikke (`BARNEVENNLIG_DRIKKE_TAGS` — saft/juice/smoothie/brus) =
**good**, kaffe (`KAFFE_TAGS`) = **warn** («Kaffe til et barneselskap? …»). Begge
leser elevens faktiske drikkesortiment via `sell`. Scenarioteksten presiserer nå
BARNEbursdag. Andre scenarier urørt.

**Verifisert headless (Playwright, port-låst 5173):** P1 dag-syklus → dag 2 stengt
viser «Ferske varer klare» FØR åpning (PASS). P2 stengt butikk = 0 kunde-sprites
(PASS). P3 3× samme bestilling → én linje «30 stk» (PASS). P4 Priser-melding
lekker IKKE til Økonomi + re-arm etter ordbok-blokkering (PASS). P5 Maren når
mersalg med begge drikkevalg; saft → grønn «barnevennlig»-feedback (PASS).
`tsc -b` + `vite build` grønn, 0 konsollfeil. **Ikke headless-dekket:** in-scene
Live-møte kunne ikke tvinges fram (salgsoverlayet viser bare navn, ikke sprite;
klokka velger møte tilfeldig) — Live m/hund-visningen + spriteScale-verdien hører
til din ?dev=1-kalibrering.

## 23. Dev-verktøy for kundeinspeksjon + møte-livssyklus

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode
> committet lokalt, IKKE pushet — kode etter Espens Chrome-validering.**

**Drop Live-spriteScale (tidligere beslutning).** `spriteScale`-feltet + multi-
plikatoren er fjernet igjen. Live rendres i vanlig kundeskala (1.30) — førerhunden
okkludert bak disken er OK. Bekreftet med 👤-preview: Live ser normal ut.

**1. «👤 Forhåndsvis kunde»-modus (🎭-panelet, kun ?dev=1).** Ny toggle i
scenariovelgeren: velg et scenario → kunde-spriten rendres i kassevyen UTEN å
starte et møte, uavhengig av åpen/stengt og av ventende ekte møter. Ren visning —
rører ikke spill-state. Esc eller nytt valg bytter, klikk utenfor (eller på
spriten) fjerner. Ekte møte har alltid forrang over previewen.

**2. «👁 Vis kunde»-toggle (SalesScenarioOverlay, kun ?dev=1).** Skjuler/viser
dialogkortet under et aktivt møte (bakgrunnen blir gjennomsiktig) så kunde-spriten
i scenen bak kan inspiseres. SalesRun forblir montert → dialog-state bevares.

**3. Dev-start ikke blokkert av et ventende/aktivt møte.** 🎭-scenariovelgeren
tillater nå dev-start også mens en ekte kunde står i scenen. Isolasjon i
reduceren: `RESOLVE_SALES_SCENARIO` konsumerer møte-state (activeMeeting/
dayMeetings/meetingsToday) KUN når `scenarioId === activeMeetingScenarioId` (det
EKTE møtet). Et dev-/øvingsscenario oppå (annen id) lar det ekte møtet stå urørt —
det gjenopptas rent, ingen spøkelser.

**5. ✕ minimerer — møtet består.** `closeSales` dispatcher ikke lenger
`SKIP_MEETING`: X-en lukker bare VISNINGEN, mens `activeMeetingScenarioId`
beholdes (klokka står pauset). Klikk på kunde-spriten (`talkToCustomer`)
gjenåpner dialogen. Møtet avsluttes kun ved å FULLFØRE det (RESOLVE nuller
flagget). Gjelder også utenfor dev.

**Verifisert headless (Playwright, ?dev=1):** 👤-preview rendrer spriten i STENGT
butikk (Live m/live.png), Esc fjerner (PASS). 👁-toggle skjuler/viser dialogkortet
(PASS). Ekte møte spawnet; etter ✕ består kunde-spriten (møtet minimert, ikke
skippet). `tsc -b` + `vite build` grønn, 0 konsollfeil. **Til Chrome-validering:**
sprite-KLIKK for gjenåpning + dev-over-ekte-møte-isolasjonen er kode-/tsc-
verifisert, men Playwright-klikket på spriten lander bak disk-forgrunnen (klikk
øvre del manuelt) — verifiser gjenåpning + «ingen spøkelser» live.

## 24. Per-kunde kalibrering (spriteCal) — kalibrer KUN Live

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode
> lokal, IKKE pushet.**

Reverserer «drop spriteScale» fra pkt. 23: Espen ville likevel kunne finjustere
Live for seg selv. Løsning uten å røre de andre kundene: valgfri `spriteCal?:
{ scale?, centerX?, waistY? }` per scenario (types.ts), som overstyrer den delte
base-kalibreringen KUN for den kunden (Kari/Tom arver basen).

Dev-arbeidsflyt: mens en kunde VISES (møte eller 👤-preview) styrer «Kunde-
kalibrering»-sliderne (SCALE/CENTER_X/WAIST_Y) nå DEN kundens override — panelet
viser «Kalibrerer KUN: {navn}» — og logger en ferdig `spriteCal: {…}`-linje for
innliming i scenariet. Uten en vist kunde justeres den delte basen som før.
OCCLUDE-sliderne (disken) er alltid delt.

**Verifisert headless:** preview Live → panel «Kalibrerer KUN: Live»; dra
CUSTOMER_SCALE → kun Live endrer størrelse (936→576 px) + `spriteCal`-linje
logget. `tsc -b` + `vite build` grønn.

## 25. TEMA-FUNDAMENT (steg 0+1) — avpubliser v1 + temaAktivering via Firebase

> **⚠️ Manglende referanse:** `docs/KODEKART.md` finnes ikke (verken i tre, worktree
> eller git-historikk). Oppdraget ba om å lese §2/§3/§6 der. Jeg utledet derfor
> v1-skjermflyt-familien (§2) direkte fra `App.tsx`-rutene. **Bekreft scope + lag
> KODEKART.md** hvis noe skal justeres.
>
> **Leveranse-status:** committet på review-grenen **`spor-a/tema-fundament`**
> (base = gjeldende `origin/main` `7c27b62`; DEL 1 = `bf64a4f`, DEL 2 = `fd3bcd7`).
> **`main` er URØRT** — koden avventer din validering (ingen auto-deploy i repoet,
> så ingenting er live). Merge grenen til main når validert. Grenen rører KUN 5
> filer (App.tsx + GameContext.tsx + temaer.ts + TeacherDashboard.tsx +
> TemaAktiveringPanel.tsx) — ingen andre spor-A-endringer berøres.

### DEL 1 — Avpublisert legacy-spillet (v1)
De 21 rutene i v1 skjermflyt-familien er fjernet fra `App.tsx` og **redirecter til
`/game`** (`<Navigate replace>`): startup-flyten (`/start /industry /sustainability
/target-audience /business-model /market-research /location /products
/price-calculation /budget-planning /financing /starting-capital`), City/Desktop
(`/city /desktop`) og gameplay (`/dashboard /pricing /distribution /marketing
/personnel /monthly-report /year-end`).

Skjerm-/layout-**FILENE er urørt** (død kode). Kun import-linjene + rutene i
`App.tsx` fjernet (også `FeatureGuard`-importen, kun brukt av v1-portene der).
Byspill/hub/lærer/konkurranse/eksamen/presentasjoner **består**. `CityView.tsx`
importerer fortsatt `DashboardScreen` — filen finnes, så ingen brekk.
**Verifisert headless:** alle 21 v1-URL-er → `/game`; `/game`, `/learning`, `/` intakt.

### DEL 2 — temaAktivering via Firebase
RTDB-node `klasser/{klassekode}/temaAktivering/{temaId} = { aktiv, nivaa:'vg1'|'vg2' }`.
- **`src/game/data/temaer.ts`** (ny, tunbar): `TemaDef { id, navn, nivaaer,
  hubModulRefs, beskrivelse }` + `TemaAktivering`. Første tema **`beredskap`**
  (kun definisjon — innhold i egen jobb; `hubModulRefs` = teacherModuleRegistry-
  rutestier).
- **`GameContext`**: `aktiveTemaer` i context. Abonnerer på noden ved øktstart når
  klassekode finnes (gjenbruker live-økt-koblingen `?live-code` /
  `student-classroom-code`); lokal fallback (`localStorage['tema-aktivering-dev']`)
  uten klassekode. Selektor-hooks **`useErTemaAktivt(temaId)`**, `useTemaNivaa`,
  `useAktiveTemaer` — fremtidige temajobber gater på disse.
- **«Spillet»-fanen** (`TeacherDashboard`): ny `TemaAktiveringPanel` skriver til
  noden per klasse (av/på-toggle + vg1/vg2-velger). Lokal feature-/leksjon-mekanikk
  urørt.

**Verifisert headless** (RTDB har åpne regler): spillklient med klassekode
abonnerte på `klasser/{kode}/temaAktivering`, mottok initiell verdi **og live
oppdatering** (vg2→vg1); uten klassekode gjøres INGEN klasse-abonnement (fallback).
Test-node ryddet. `tsc -b` + `vite build` grønt.

**➡️ Til Espen (valider i Chrome):** Lærer-panelet er auth-gated (`/teacher`
redirecter til `/` uten innlogging), så headless kan ikke nå UI-en. Logg inn →
Spillet-fanen → «Temaer»: slå `Beredskap` på + velg vg1/vg2 for en klasse. Åpne
`/game` som elev med samme klassekode — `useErTemaAktivt('beredskap')` blir sann
live. Panelets skriving er identisk med den verifiserte `set()`-pathen.

## 26. Søndagsfunn — mentor-intro, dashbord-dup, passord-øye, bransje-gate

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn. Kode
> committet lokalt, IKKE pushet — kode etter Espens Chrome-validering.**
> Base: `spor-a/tema-fundament` @ 135af46 (= main 7c27b62 + tema-fundament DEL 1/2)
> — dvs. «main etter tema-fundament-merge». De 4 fiksene er uavhengige av
> tema-koden, men bygger oppå den her.

**P1 — Mentor-intro ved spillstart.** Første gang etter oppstartsvalg (én gang
per lagring, `mentor_intro_v1` i localStorage) presenterer Espen seg STOR midt på
skjermen (espen-smil, ~46vh) med en 3-stegs sekvens (Neste →, progressprikker,
«Hopp over»): (1) hvem han er, (2) kom-i-gang-rekkefølgen (lokale → bestill →
still ut → åpne), (3) de tre hjelperne (💻 Dashbord, mentoren, 📖-boka). På «Kom
i gang!» krymper han mot hjørnet (framer-motion exit) og faller tilbake til
vanlig hjørneplass. Gjenbruker Mentor-komponenten; tekstene ligger tunbart i
`MENTOR_INTRO` (mentorTriggers.ts).

**P2 — duplisert dashbord-knapp fjernet.** Den gamle «🖥️ Dashbord»-knappen nede
til høyre (bak mentoren, GamePage) er fjernet — Dashbord åpnes nå KUN fra
topp-HUD-knappen (💻 Dashbord). «Gå til butikken»-snarveien beholdes, og blokka
gates på `!lokaleId` så den ikke rendrer tomt. Mentoren står fritt i hjørnet.

**P3 — passord-øye i BusinessLab-innlogging.** Ny `PasswordField`-komponent
(vis/skjul-toggle, 👁/🙈) erstatter alle tre passord-input i `LandingPage`:
logg inn, registrer og bekreft passord.

**P4 — inaktive bransjer gatet.** Ny tunbar `ACTIVE_INDUSTRIES = ['cafe']` +
`isIndustryActive()` (industries.ts). I oppstartens bransjevalg vises Klesbutikk /
Tech & Gadgets / Sports & Fritid nedtonet (grayscale, opacity 0.5) med
«KOMMER»-merke og `disabled` — kan ikke velges. Kun Kafé & Bakeri er valgbar.
Klesbutikk slås på ved å legge `'fashion'` i lista når grenen merges.

**Verifisert headless (Playwright):** intro vises én gang (steg 1→2→3 → «Kom i
gang!» lukker; reload viser den IKKE igjen; «Hopp over» lukker); kun ÉN
Dashbord-knapp; 👁 toggler passord til tekst (login + 2 i register-modalen);
bransjevalg viser 3× «KOMMER», Kafé valgbar, Klesbutikk `disabled`. `tsc -b` +
`vite build` grønn, 0 konsollfeil.

## 27. TEMA 1: BEREDSKAP OG RISIKO (første ekte tema)

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn, 0
> konsollfeil. Levert på gren `spor-a/tema-beredskap` (main urørt) — IKKE merget,
> venter Espens validering.** Base: main @ d1c0b8b.

Alt gates på `useErTemaAktivt('beredskap')`; nivå via `useTemaNivaa`. Tema av =
null spor. Prinsipp: refleksjon, ALDRI fasit — ingen poeng for «riktig».

**DEL 1 — 🦺 HMS-fane** (ny `HmsTab.tsx`, fane vises kun når temaet er aktivt;
gaten i `DashboardOverlay` filtrerer `TABS` på `t.tema`). a) **Beredskapsplan**
(tunbar i `data/beredskap.ts`: brann/ulykke/trussel, hvert med konkrete punkter)
— eleven **bekrefter** («Jeg kjenner planen», lagres i `state.beredskap`); VG2
får 2 refleksjonsfelt. b) **Risikoskjema** — 4 tunbare rader (brann/fall/svinn/
strøm) med sannsynlighet×konsekvens + tiltak; VG1 = faste rader, VG2 = kan legge
til egne. Alt i `state.beredskap`, ingen retting.

**DEL 2 — Fagord**: `beredskapsplan` (RST_003), `risikovurdering` (RST_002),
`evakuering` (RST_004) lagt til i glossary (VGS-nivå, example + common_mistake)
og markert i HMS-fanen med `<Fagord>`. (`Risikomatrise`/`HMS` fantes fra før.)

**DEL 3 — Brannalarm-hendelse** (3-valget under er ERSTATTET av rekkefølge-
øvelsen i pkt. 27b/P5 — behold avsnittet som historikk): spawnes i innboksen i en åpen dag (auto-sjanse
per dag, deterministisk seed; + `dev:brannalarm`-hook og HMS-fanens dev-knapp),
KUN når temaet er aktivt + planen bekreftet, maks 1×/måned (reducer-gate). 3 valg
— (1) følg planen (good: lite tap, +rykte), (2) selg videre (bad: −rykte), (3)
grip slukker (warn) — med utfallstekst der ekte/falsk alarm randomiseres.
`RESOLVE_BRANNALARM` skriver rykte/penger + utfall; innboksen viser resultatet.
VG2: «evaluer øvelsen» (2 refleksjonsfelt) i HMS-fanen etterpå.

**DEL 4 — Mentor-triggere** (mentorTriggers-mønster, én gang, tokens):
`tema_beredskap_aktivert` (fyres via `aktiveTemaer`-effekt i Mentor, peker på
[[RST_003|beredskapsplanen]]), `beredskap_plan_bekreftet`, `beredskap_risiko_levert`
og `beredskap_brannalarm_handtert` — de to siste er **dynamiske** (leser elevens
verste risiko-rad / brannalarm-valg via `dynamiskMentorMelding`).

**DEL 5 — Hub-kobling**: HMS-fanen har «📚 Lær mer»-knapper til temaets hub-
moduler per nivå (`HUB_LENKER`): VG1 Contingency + Risikovurdering; VG2 Beredskap
+ Brannvern + Risikoanalyse.

**Verifisert headless (Playwright):** tema AV = ingen HMS-fane. Tema PÅ (VG1) =
fane synlig, plan bekreftes (lagres), fagord til stede, brannalarm fyrer i åpen
dag → 3 valg → «Følg planen» gir god-utfall (rykte 50→53, −300 kr, falsk-alarm-
interpolering). Tema PÅ (VG2) = refleksjonsfelt + «Legg til egen rad» synlige.
`tema_beredskap_aktivert`-mentormeldingen bekreftet i skjermbilde. `tsc -b` +
`vite build` grønn.

### 27b. Fiksjobb — Espens valideringsfunn (5 stk)

> **Status: bygget + verifisert headless. `tsc -b` + `vite build` grønn.** Gren
> `spor-a/tema-beredskap` (main urørt) — IKKE merget, venter Espens re-validering.
> 4 commits (`cc74b43` kjerne · `4076d61` P5 · `6cba24c` P2/P3 · `1160c76` P1).

- **P1 — mentor-bobler stables aldri.** Kun én boble om gangen; ny melding mens
  en vises ⇒ køes. Lukker eleven den synlige, går figuren i PEKER-positur med rød
  «N»-badge; neste vises først når figuren klikkes (`Mentor.tsx`: `paused`/`venter`
  /`badge`, `dismiss`/`figureClick`). Gjelder ALLE mentor-meldinger.
- **P2 — elevens eget bidrag i planen.** Fritekst «Ditt tillegg for DIN butikk»
  per plan-avsnitt (`planTillegg` på `BeredskapState`, `SET_PLAN_TILLEGG`).
  Valgfritt VG1; VG2 krever minst ett før bekreftelse. `beredskap_plan_bekreftet`-
  mentormeldingen siterer tillegget.
- **P3 — lagre-feedback + Espen driver flyten.** «Lagre vurdering»-knapp på
  risikoskjemaet med synlig «✓ Lagret» (`risikoLagret`, `LAGRE_RISIKO`). Etter
  plan-bekreftelse og risiko-lagring peker mentoren aktivt til neste steg (via
  P1-køen).
- **P4 — persistert beredskaps-state.** Hele `state.beredskap` (bekreftelse,
  tillegg, risikorader, refleksjon, øvelses-utfall) lagres i localStorage
  (`beredskap_state_v1`), lastes ved reducer-init og **bevares gjennom
  `START_GAME`** — overlever reload (samme «overlever alt» som mentor-fired-set).
- **P5 — brannalarm som REKKEFØLGE-ØVELSE** (erstatter 3-valget; «følg planen» var
  for åpenbart). Alarmen går → 7 handlingskort i tilfeldig rekkefølge, eleven drar
  5 inn i en nummerert plan (1–5). 5 riktige speiler plan-punktene + 2 fristende
  distraktorer («Redd kassaoppgjøret», «Post en story»). Diskret 60s-nedtelling
  (tunbar `BRANNALARM_SEKUNDER`; tiden ut ⇒ leveres det som ligger). Ingen fasit
  underveis: eleven leverer → utfallet FORTELLES som konsekvens (riktig ⇒ trygg
  evakuering/lite tap/+rykte; distraktor el. varsling ikke først ⇒ kaos/−rykte) og
  VISER så elevens rekkefølge ved siden av planens, grønt/rødt per plass («se selv
  hvor det skar seg»). Ingen poeng. (`beredskap.ts` data + `vurderBrannalarm`,
  `BrannalarmOvelse.tsx`, innboks-integrasjon i `DashboardOverlay`.)

**Verifisert headless (Playwright, VG2):** plan-bekreft blokkert uten tillegg →
åpnes med tillegg → `planBekreftet`; «Lagre vurdering» → `risikoLagret`+«✓ Lagret»;
brannalarm i åpen dag → øvelse (5 slots, live 60s-nedtelling 60→57), 5 riktige →
trygt utfall (rykte 50→53) + grønn sammenligning; distraktor først → kaos-utfall
(`kvalitet:'bad'`); alt `state.beredskap` overlever reload. Mentor-kø: 3 køede
triggere → 1 boble; dismiss → badge «2» + peker; figurklikk → neste boble (siterer
elevens tillegg + peker videre). `tsc -b` + `vite build` grønn.

## 28. Mentor pose-ommapping v2 (kosmetisk)

> Kort. Rett på main. `tsc -b` + `vite build` + headless grønn.

Nytt asset `espen-vanlig.png` (v5, rembg fra `mentor-espen-05-raw.jpg`). Ny
pose-mapping i `Mentor.tsx` (prioritet: leser > aktiv melding > kø > hvile):
HVILE + INTRO = `vanlig` (v5), AKTIV MELDING = `noytral` (v2, var smil), KØ-SIGNAL
= `peker` (v4) + badge, ORDBOK = `leser` (v3). v1 `smil` er pensjonert fra bruk
(fila beholdt). Headless bekreftet alle fire tilstander via figurens `src`.

## 29. FIKSRUNDE 2 — Espens valideringsfunn 12.07 (6 deler)

> **Status: bygget. `tsc -b` + `vite build` grønn etter HVER del (ett bygg om
> gangen, ressursregel). Gren `spor-a/fiksrunde-2` (main urørt) — IKKE merget,
> venter Espens visuelle validering i Chrome.** Base: main. 6 commits (DEL 1–6).
> Headless ikke kjørt (Playwright ikke installert lokalt + 5173 nede) —
> verifisert via tsc/build + måling (DEL 2) + kodegjennomgang. Visuell kvalitet
> er Espens; sjekklista per del ligger nederst i punktet.

**DEL 1 — «Lær mer» navigerer aldri eleven ut av spillet (kritisk).**
`HUB_LENKER`-knappene i `HmsTab` brukte `navigate(l.rute)` → samme fane →
spilltilstanden gikk tapt. Nå `<a target="_blank" rel="noopener noreferrer">` +
«↗» + hint «Åpnes i ny fane — spillet ditt står trygt her». Verifisert at
`HmsTab` er ENESTE sted i `src/game/` som lenker til `/learning`-huben (grep);
øvrige `navigate()`-kall er intern spillnavigasjon (bykart/bydeler). Commit
`28f69ad`.

**DEL 2 — Mentor: større + pose-normalisert + peker verifisert.**
- a) `MENTOR_FIGUR_HOYDE = 170` (tunbar) — figuren rendres ~45 % større enn den
  gamle effektive høyden (~118 px for tett-beskårne poser).
- b) **Pose-normalisering.** Målte asset-metrikkene med et lite rent-Node
  PNG-alpha-bbox-skript (`scratchpad/pngbbox.js`): v5 `vanlig` er LØST beskåret
  (synlig figur 68 % av canvas, fot 80,7 % ned), mens v2/v3/v4 er TETT beskåret
  (98 %/~99 %). Siden koden skalerte hele canvaset til fast høyde, HOPPET figuren
  ~44 % i størrelse + baseline ved pose-bytte (Espens funn). `POSE_JUSTERING`
  (chf/foot per pose) rendrer nå hver pose så synlig figur = 170 px og henger den
  transparente bunnpaddingen under foten → LIK høyde OG LIK fotlinje uansett pose.
- c) **Peker verifisert (v4).** Åpnet `espen-peker.png` — korrekt peke-pose:
  Espen (grå dress, briller, skjegg) med høyre pekefinger opp. Kø→`peker`-mapping
  + rød «N»-badge + vis-neste-ved-klikk var alt på plass fra P1 (pkt. 27b) og er
  uendret. **Reproduser kø manuelt i `?dev=1`:** åpne HMS-fanen, bekreft planen
  (fyrer `beredskap_plan_bekreftet` i køen), lagre risikovurderingen (fyrer
  `beredskap_risiko_levert`), og utløs så «🔔 Utløs brannalarm (dev)» i åpen dag
  → flere mentor-meldinger står i kø samtidig. Lukk (✕) den synlige bobla mens
  minst én venter → figuren skifter til peker-posituren med rød badge «N»; klikk
  figuren for neste. Commit `6096b98`.

**DEL 3 — Fanene gruppert etter programfag med diskret fargekoding.**
`FAG_FARGER` (tunbar, ett sted i `DashboardOverlay`), `t.fag` per fane, `TABS`
sortert så hvert fag ligger samlet. Diskret: 3 px fag-stripe under hver fane
(tydeligere når aktiv) + liten faglegende under fanelinja. Dagens tema-look
(teal aktiv-fane) beholdt; HMS beholder tema-gatingen. Fane→fag-mapping (fasit:
`TEMAER_OG_KOMPETANSEMAL.md`, SSR01-01 VG1 / SSR02-01 VG2):

| Fane | Primærfag (VG1 → VG2) | Farge | Merknad |
|---|---|---|---|
| Oversikt | Forretningsdrift → Økonomi og adm. | blå | Driftsdashbord (tverrgående) |
| Forretningsplan | Forretningsdrift | blå | Etablering |
| Økonomi | Forretningsdrift | blå | Regnskap/kontantstrøm/lån |
| Priser | Forretningsdrift | blå | Prising = kalkyle/lønnsomhet; Pris-P sekundært |
| Målgruppe | Markedsføring og innovasjon → Komm. og markedsføring | lilla | Segmentering |
| Produkter | Markedsføring og innovasjon | lilla | Produkt-P + sortiment |
| Lokasjon | Markedsføring og innovasjon | lilla | Plass-P |
| Markedsføring | Markedsføring og innovasjon | lilla | Promosjon-P |
| Utstilling | Markedsføring og innovasjon | lilla | Vareeksponering/indre salgsmiljø |
| Personale | Kultur og samhandling | rosa | Organisering/samhandling (+ lønn = FD sekundært) |
| HMS | HMS (VG2 eget fag) | rav | Tema-gated (beredskap) |
| Rapporter / Innboks | Verktøy (tverrgående) | grå | Ikke ett fag |

Commit `311123a`.

**DEL 3-tillegg — fargesvak-tilgjengelighet (fiksrunde-2-slutt).** Farge bærer
ALDRI info alene (Espen + ~8 % av gutter er fargesvake):
- a) Hver fane har nå et lite BOKSTAVMERKE ved navnet (`kort` i `FAG_FARGER`):
  FD (Forretningsdrift), M (Markedsføring og innovasjon), KS (Kultur og
  samhandling), HMS, V (Verktøy) — fag-farget tekst på svak tint med ramme.
- b) Faglegenden viser nå **bokstavmerke + stripe-prøve + fullt fagnavn** sammen,
  så koblingen merke↔farge↔fag er eksplisitt.
- c) Stripefargene er justert til en LYSHETS-stige (perseptuell luminans mot mørk
  bakgrunn): Verktøy 114 < Markedsføring 128 < Forretningsdrift 156 < Kultur 180
  (lysnet #f472b6→#f78fc8) < HMS 208 (rav→gul #f59e0b→#fcd34d). Hver fag-overgang
  i fanelinja har ≥28 i luminans-sprik, så gruppene skilles i gråtone alene.
  Blå/lilla uendret. Alt tunbart i `FAG_FARGER`.

**DEL 4 — Brannøvelse: «prøv igjen» som øvelsesmodus.**
- a) «🎯 Kjør ny brannøvelse» i HMS-fanen, tilgjengelig når temaet er aktivt og
  planen bekreftet. Samme rekkefølge-øvelse med friske, stokkede kort (remount
  via `runId`-key), men ØVELSESMODUS: `RESOLVE_BRANNOVELSE` gir INGEN penge-/
  rykteeffekt og ingen innboks-melding. Tydelig «🎯 ØVELSE · ingen konsekvens»-
  merke i widgeten.
- b) Skarp alarm i åpen dag UENDRET (auto-sjanse, maks 1×/mnd, ekte konsekvens);
  `RESOLVE_BRANNALARM` rørt kun for tom-`messageId`-fallback.
- c) `state.beredskap.brannovelser` lagrer historikk (rekkefølge, kvalitet,
  in-game tidspunkt). Seksjonen viser «X av Y forsøk riktige» + siste utfall +
  drill-konsekvenstekst + grønn/rød sammenligning ETTER levering (delt
  `BrannalarmSammenligning`-komponent, gjenbrukt i innboksen). VG2-evalueringen
  gates nå på ETHVERT forsøk (skarp eller øvelse) og refererer siste.
- d) Dynamisk mentor-trigger `beredskap_ovelse_etter_feil`: fyrer ved første
  øvelse etter en FEILET skarp alarm — oppmuntrende refleksjon, aldri fasit;
  leser om den ferske øvelsen gikk bra.

Commit `a28e9e2`.

**DEL 5 — Personale: «Hvem gjør hva?» (rolleoppgaver før org-kart).**
Personale-fanen har nå to steg (veksler øverst).
- a) STEG 1: personkort (Daglig leder + hver ansatt) + oppgavepalett (bransjens
  rolleoppgaver: Salg/Markedsføring/Økonomi-regnskap/Innkjøp/HMS). Dra en oppgave
  PÅ en person — én person kan ha flere, samme oppgave kan deles. «Outsourcet»-
  boks tar KUN Økonomi/regnskap → fast månedskostnad `BALANCE.regnskapOutsourcing
  Mnd = 4000` (tunbar), egen linje «Regnskap (outsourcet)» i månedsoppgjøret via
  den delte `manedligeFasteKostnader` (så den også vises i Økonomi-fanen).
- b) STEG 2 = dagens org-kart, uendret motor. «Bruk fordelingen i
  organisasjonskartet →» dispatcher `SEED_ORG_FROM_TASKS` (union — oppretter
  funksjoner fra fordelingen, fjerner ingenting; outsourcet økonomi opprettes
  ikke som intern funksjon) og bytter til steg 2. Eleven endrer alt fritt;
  tomt-kart-prinsippet består.
- c) `oppgaveRefleksjoner()` (i `orgRefleksjon.ts`, tunbar terskel
  `OPPGAVE_REGEL_PARAM.mangeOppgaverTerskel = 4`) reagerer med SPØRSMÅL, aldri
  fasit: for mange oppgaver på deg selv, outsourcet regnskap, udekt Salg/Økonomi.
  Fordelingen har INGEN mekanisk effekt denne runden (kun refleksjon +
  outsourcing-kostnaden) — mekanisk effekt tas i senere balansejobb.
- d) `personale_fane`-mentortriggeren peker nå på «Hvem gjør hva?» (fyrer ved
  første åpning av Personale-fanen, som viser steg 1).

Ny state: `oppgaveFordeling: Record<personId, roller>` + `regnskapOutsourcet` på
`GameState`. Commit `d519c07`.

**DEL 6 — dok.** Ny «Horisont»-seksjon i `TEMAER_OG_KOMPETANSEMAL.md` (pkt. 7):
(1) kroppsspråk-øvelse (Kultur og samhandling, gjenbruk kunde-sprites),
(2) risikovurdering per bransje (beredskap-state keyes per bransje når bransje
2+ aktiveres), (3) hotell som kandidat-bransje via autonom-pipelinen. Kun dok.

### Espens Chrome-sjekkliste (visuell validering per del)

- **DEL 1:** HMS-fanen → «📚 Lær mer»-knappene åpner hub-modulen i NY fane;
  spill-fanen står urørt med all tilstand.
- **DEL 2:** På 100 % zoom + 1366×768 — figuren er merkbart større og
  kolliderer ikke med dashbordet; bytt pose (hvile → aktiv melding → kø/peker →
  ordbok) og se at figuren IKKE hopper i størrelse eller fotlinje; peke-fingeren
  synlig i kø-tilstand; badge + peker ved lukket boble med kø (repro over).
- **DEL 3:** Fag-stripene under fanene + faglegenden; fanene ligger samlet per
  fag; dagens aktiv-fane-look uendret; HMS-fanen dukker kun opp med temaet på.
- **DEL 4:** HMS → «Kjør ny brannøvelse» (uten skarp alarm) → «ØVELSE»-merke,
  ingen penge-/rykteendring; utfall + grønn/rød sammenligning; «X av Y forsøk
  riktige» oppdateres; kjør flere ganger; skarp alarm i åpen dag fortsatt ekte;
  (feil skarp alarm → første øvelse etterpå gir oppmuntrende mentormelding).
- **DEL 5:** Personale → steg 1: dra oppgaver på deg selv/ansatte (flere per
  person, delt på flere); dra Økonomi/regnskap til Outsourcet → −4 000/mnd-linje
  i månedsoppgjøret + Økonomi-fanen; refleksjonsspørsmålene endrer seg med
  fordelingen; «Bruk fordelingen …» → steg 2 har funksjonene forhåndsopprettet
  og kan endres fritt.

## 30. Fiksrunde 2 → main + spilltest grønn (sluttstatus)

> **Status: MERGET TIL MAIN.** Hele fiksrunde 2 (DEL 1–6 + fargesvak-tillegget)
> er `--ff-only`-merget til main (lineær historikk), sammen med temakart v4 og
> spilltester-verktøyet. main @ `4ee75a3`.

**Merge-sekvens (DEL 2 i sluttmandatet):**
1. `spor-a/fiksrunde-2` → main `--ff-only` (`37b56d8..6ba66b8`).
2. Temakart v4 committet på main (`b09f153` «docs: temakart v4 — 15 temaer …»).
3. `verktoy/spilltester` rebaset på main (rent, 0 konflikter) → `--ff-only`
   (`b09f153..600d02b`).

**Fiks A+B (etter at spilltesten avdekket en regresjon):** den første kjøringen
på main var RØD — fag-**bokstavmerket** (fiksrunde-2-slutt DEL 1a) la synlig
tekst inne i fane-knappene, så testens `getByRole('button', {name, exact:true})`
ikke matchet lenger og fane-navigasjonen (Steg 2 m.fl.) hang. Fikset på gren,
re-merget:
- **A (a11y/produkt):** `aria-hidden` på fag-merket (og dekorativ stripe) → ren
  accessible name («Produkter»). Fargesvake ser fortsatt merket; faglegenden
  formidler fag-koblingen tekstlig (skjermleser). `data-testid=fane-<id>` lagt til.
- **B (spilltest):** `gåTilFane`/HMS-navigasjon over på `getByTestId(fane-<id>)`
  (ingen exact-name-matching). Steg 10: hub-lenkene ble `<a target=_blank>` i
  fiksrunde 2, så locatoren gikk fra `button`→`link`, og `kjentFeil`-krykka ble
  fjernet (reell PASS-vakt nå).

**Spilltest på main (`npm run spilltest`, port 5176):**
**✅ 10 PASS · 0 FAIL · 0 KJENT FEIL.** Navigasjonsvakten (Steg 10) flippet fra
KJENT FEIL → PASS: hub-lenken «📚 Beredskap (Contingency) ↗» åpner i ny fane og
navigerer IKKE spillfanen bort (url blir på `/game`). Full tabell i
`docs/rapporter/spilltest-siste.md`.

## 31. TEMA 2 BUDSJETT + TEMA 3 NØKKELTALL (bølge 1)

> **Status: bygget. `tsc -b` + `vite build` grønn etter HVER del. `npm run
> spilltest` (5176): 11/11 PASS.** Gren `spor-a/tema-budsjett` (main urørt) —
> IKKE merget, venter Espens validering. Base: main @ c46a910. Nullpunkt før
> jobb: 10/10 PASS. 7 commits (DEL 1–7).

To temaer i én jobb. **Nivåregler (LK20) styrer:** VG1 ser ALDRI nøkkeltall/
prosent — bare «tjente du penger, traff du planen?». Avvik vises ALLTID med
fortegn + tekst (aldri farge alene — Espen er fargesvak). Konsekvens er svaret;
spillet retter ALDRI elevens tall (brannalarm-modellen).

**Delt datalag (`data/budsjett.ts`)** — DEL 3d: avvik/nøkkeltall regnes ETT sted,
testbart: `BUDSJETT_LINJER` (6 faste), `maanedNokkel` («aar1-mnd2»),
`faktiskeLinjer(settlement)`, `linjeAvvik`, `avvikTekst`, `planlagtResultat`,
`erStortAvvik`, `bokfortNokkeltall`, hub-lenker. `MonthSettlement` fikk
`salgInntektBrutto` + `varekjop`. State: `budsjett` + `nokkeltall`, persistert
(`budsjett_state_v1`) + bevart gjennom START_GAME.

- **DEL 1** — `temaer.ts`: `budsjett` (vg1+vg2) + `nokkeltall` (KUN vg2).
  `TemaAktiveringPanel` mapper over `TEMAER` → begge vises automatisk på
  lærersiden (ingen ekstra kode). Commit `bff9fc9`.
- **DEL 2** — Budsjettseksjon øverst i Økonomi-fanen (Tema 2 aktivt): 6 faste
  linjer, «Sist måned: X»-referanse per felt (faktisk fra forrige oppgjør; for
  de faste linjene også uten historikk), lån forhåndsutfylt (terminbeløp),
  3-stegs guidet intro (localStorage `budsjett_intro_v1`, kan hoppes over),
  «Lagre budsjett» → `SET_BUDSJETT`. Låses ved oppgjør. Commit `30b5c4f`.
- **DEL 3** — Månedsoppgjøret får `Budsjett | Faktisk | Avvik` (fortegn + tekst,
  nøytral farge) + «Planlagt vs Faktisk resultat» + én setning uten dom. VG2:
  «Hva tror du skjedde?»-fritekst på linjer over `BUDSJETT_AVVIK_TERSKEL`
  (25 % + 1 000 kr) → `SET_AVVIK_NOTAT`. Ingen budsjett → vennlig hint (aldri
  straff). Commit `2c51113`.
- **DEL 4** — Tema 3 Nøkkeltall (KUN VG2): elevoppgave (bruttofortjeneste/
  dekningsgrad/resultatgrad), eleven ser formelen med månedens egne tall og
  regner selv (`SET_NOKKELTALL_SVAR`). Ved oppgjøret: «ditt tall» vs «bokført»
  ETTERPÅ (fortegn/prosentpoeng) + refleksjon om HVILKE tall. Commit `ef50fd2`.
- **DEL 5** — Mentor-triggere (dynamiske, én gang): `budsjett_avvik_storst`
  (leser linja med størst avvik, elevens tall) og `nokkeltall_dekningsgrad_avvik`
  (VG2, >5 prosentpoeng sprik → spør om HVILKE tall). Transient
  `budsjettOppgjorHint` settes ved rull (settlement-tallene er borte etter
  dismiss). Budsjett-introen har egen flagg → dobbeltfyrer ikke. Commit `3bcdd55`.
- **DEL 6** — Hub-lenker (landet i DEL 2/4-seksjonene, ny fane) + dev-knapper
  (`?dev=1`): «⏩ Fyll budsjett …» + «⏩ Simuler månedsslutt med tydelige avvik»
  (`DEV_SIMULER_OPPGJOR` — ≥2 linjer over terskel). Commit `ac13e5f`.
- **DEL 7** — Spilltest steg 11: aktiver Tema 2, sett budsjett, rull måned,
  verifiser avvik == delt hjelpefunksjon (husleie-avvik = 5 000 kr, 6 linjer) +
  oppsummeringslinja. **11/11 PASS.** Commit `33fdce0`.

### ⚠️ Glossary-flagg (IKKE oppdiktet)
Fagord-tokens bruker eksisterende ID-er: `budsjett`=ECO_008, `dekningsgrad`=
ECO_002, `bruttofortjeneste`=ECO_022, `omsetning`=ECO_009. **Mangler i
`glossary.json`: «avvik» og «resultatgrad»** — vist som REN TEKST (ingen token,
ingen oppdiktet definisjon). Bør legges til i glossaryet (Espen/fagperson
godkjenner definisjonene) før de brukes som klikkbare fagord.

### Designvalg å merke seg
- **«Neste måned» tolket som inneværende måned som skal gjøres opp:**
  budsjettseksjonen sikter på `currentMonth` (den kommende oppgjørs-måneden),
  låses ved dens oppgjør. Nøkkeltall-svar gjelder samme måned.
- **Nøkkeltall regnes fra tallene SÅ LANGT i måneden** (de vokser) — sprik mot
  bokført er tilsiktet læring (refleksjonen spør om HVILKE tall). Seksjonen sier
  eksplisitt «regn på nytt mot slutten for best treff».

### Espens Chrome-sjekkliste (visuell validering per del)
Aktiver tema i lærerdashbordet (eller `localStorage['tema-aktivering-dev'] =
{"budsjett":{"aktiv":true,"nivaa":"vg1"}}`), åpne spillet med `?dev=1`:
- **DEL 1:** Lærerdashbord → Spillet-fanen: «Budsjett og avvik» (vg1/vg2) +
  «Nøkkeltall og lønnsomhet» (kun vg2) i tema-lista.
- **DEL 2:** Økonomi-fanen → «Budsjett for [måned]» øverst: 3-stegs intro
  (hopp over/neste), 6 linjer, «Sist måned»-tall, lån forhåndsutfylt, Lagre.
- **DEL 3:** `?dev=1` → budsjettseksjon → «⏩ Simuler månedsslutt …»: oppgjøret
  viser Budsjett|Faktisk|Avvik (fortegn+tekst), «Du planla … det ble …».
  Bytt nivå til vg2 → «Hva tror du skjedde?»-felt på store avvik. VG1: ikke.
- **DEL 4 (vg2):** aktiver `nokkeltall` (vg2) → Økonomi-fanen «🔢 Nøkkeltall»:
  formler + input; lagre; kjør «⏩ Simuler …» → oppgjøret viser ditt vs bokført.
- **DEL 5:** etter et simulert oppgjør → lukk oppgjøret → mentoren peker/boble
  med linja som bommet mest (dine tall). VG2 + nøkkeltall-svar med >5 pp sprik
  → dekningsgrad-refleksjon.
- **DEL 6:** 📚-lenker i begge seksjoner åpner i NY fane (spillet står urørt).

## 32. Fiksjobb tema-budsjett (mentor-trigger + glossary)

> **Status: MERGET TIL MAIN etter Espen-validering.** Hele `spor-a/tema-budsjett`
> (Tema 2/3 DEL 1–7 + fiksjobb del 1–2) `--ff-only`-merget til main (lineær
> historikk) og pushet. main @ `c667ad9`. `npm run spilltest` på main: **11/11
> PASS**. Grenen slettet (lokalt + origin). Del-commits: `6e9e8f5`
> (mentor-trigger), `c667ad9` (glossary).

**Del 1 — mentor-trigger ved tema-aktivering.** Når læreren slår på `budsjett`/
`nokkeltall` mens eleven spiller, fyrer `tema_budsjett_aktivert`/
`tema_nokkeltall_aktivert` ÉN gang: «Læreren har åpnet [tema] — du finner det i
Økonomi-fanen.» (fagord [[ECO_008|budsjett]] / [[ECO_002|dekningsgrad]]). Timing
(`Mentor.tsx`): aktivert UNDER spilling (flippet av→på denne økta, `temaVedStart`-
snapshot) → fyrer straks; aktivt allerede ved spillstart → fyrer ved FØRSTE
dashbord-åpning (`dashApnet` fra `mentor:fane`). Persistert fired-sett som alle
mentor-triggere.

**Del 2 — glossary: «avvik» + «resultatgrad».** Espen-godkjente definisjoner lagt
til i `glossary.json` (ASCII-translitterasjon som resten av fila):
- `ECO_032 Avvik` (VG1): «Forskjellen mellom det du planla i budsjettet og det som
  faktisk skjedde.» Formel `Avvik = Faktisk - Budsjett`.
- `ECO_033 Resultatgrad` (VG2): «Hvor stor del av omsetningen som ender som
  overskudd …» Formel `Resultatgrad = Resultat / Omsetning * 100`.

Fagord-tokens aktivert der det var ren tekst: `[[ECO_032|Avvik]]` på avviks-linja
i månedsoppgjøret; `[[ECO_033|Resultatgrad]]` i nøkkeltall-seksjonen OG i
oppgjørets nøkkeltall-sammenligning (der tokeniserte jeg også Bruttofortjeneste/
Dekningsgrad for konsistens). Glossary-flagget fra pkt. 31 er dermed lukket.

**Chrome-sjekk:** (1) aktiver `budsjett` mens du spiller → mentor-boble «Læreren
har åpnet budsjett …»; aktiver før start → boble ved første dashbord-åpning.
(2) Klikk «Avvik» i oppgjøret og «Resultatgrad» i nøkkeltall → forklaringskort.

## 33. TEMA 8 KAMPANJE OG MARKEDSPLAN (bølge 2)

> **Status: bygget. `tsc -b` + `vite build` grønn etter HVER del. `npm run
> spilltest` (5176): 12/12 PASS.** Gren `spor-a/tema-kampanje` (main urørt) —
> IKKE merget, venter Espens validering. Base: main @ c667ad9. Nullpunkt før
> jobb: 11/11. 8 commits (DEL 1–8).

**Nivåregler (LK20):** VG1 ser ALDRI ROI/prosentanalyse. Kanal×segment-treffet
er SKJULT i spillet — vises kun i hub-en; eleven må resonnere fra kildene.
Avvik/resultat med fortegn + tekst (aldri farge alene). Spillet retter aldri.

**Delt datalag (`data/kampanje.ts`)** — DEL 8: multiplikator/effekt regnes ETT
sted, testbart: `KANALER` (6), `SEGMENT_TIL_IPSOS`, `kanalTreffISegmenter`,
`kampanjefaktor`, `kampanjeKostnad`, `kampanjeFaktiskProsent`,
`kampanjeMerinntekt`, `kampanjeRoi`. State-typer + `KAMPANJE_HUB`. Tuning i
`balance.ts` (`kampanje`-blokka).

- **DEL 1** — `temaer.ts` `kampanje` (vg1+vg2) + mentor `tema_kampanje_aktivert`
  (peker på Marked-fanen). Commit `ec5fa1e`.
- **DEL 2** — 6 kanaler: 4 EKTE (Ipsos SoMe-tracker Q4 2023, 18+) + 2 FIKTIVE
  merket. Dagspriser (SoMe 300 / Facebook 500 / radio 800 / lokalavis 1200).
  Commit `3b2a40c`.
- **DEL 3** — KampanjeSeksjon i Marked-fanen: mål (SMART), målgruppe, 1–2 kanaler
  + kr/dag, varighet 3–7, VG1 markedsplan (situasjon), salgskampanje m/førpris.
  Prishistorikk (`prisendretDag`) i SET_PRODUCTS. Commit `91e2c0c` (m/DEL 4).
- **DEL 4** — `kampanjefaktor` multipliserer bakgrunnskundene ved OPEN_DAY;
  CLOSE_DAY akkumulerer + fullfører. Dagspuls «📣 Kampanje pågår». Commit `91e2c0c`.
- **DEL 5** — KampanjeRapportOverlay (mål vs faktisk, kostnad vs merinntekt, VG2
  ROI-elevoppgave + A/B). Historikk persistert. Commit `69094b9`.
- **DEL 6** — hub Kommunikasjonskanaler fase 6 «Hvem bruker hvilke medier?»:
  tabell (4 ekte m/Ipsos-tall + kilde/lenke, 2 fiktive merket) + kildekritikk.
  `DrawerPhase` fikk `table`-felt. Commit `33b338a`.
- **DEL 7** — planlegger-intro (3 steg) + dynamiske mentor-triggere
  `kampanje_effekt` (mål/faktisk/kanal-treff) og `kampanje_forpris_brudd`
  (refleksjon om regelen). Commit `11fa532`.
- **DEL 8** — dev-knapper + spilltest steg 12 (multiplikator + rapport == fasit
  + førpris-brudd → tilsynsbrev). **12/12 PASS.** Commit `0da3489`.

### Segment → Ipsos-aldersgruppe-mapping (DEL 2, `SEGMENT_TIL_IPSOS`)
Spillets AGE_GROUPS er grovere enn Ipsos-bucketene; treffet for et segment =
snitt over de mappede bucketene.

| Spill-segment | Ipsos-bucket(er) |
|---|---|
| 15-20 | 18-29 |
| 21-30 | 18-29 |
| 31-45 | 30-39 + 40-49 |
| 46-60 | 50-59 |
| 60+ | 60+ |

### ⚠️ Glossary-flagg (IKKE oppdiktet)
Brukt eksisterende: `målgruppe`=MKT_021. **Mangler i `glossary.json`:
«kampanje», «rekkevidde», «ROI», «førpris», «markedsplan»** — vist som ren tekst.
Bør legges til (Espen-godkjente definisjoner) før de brukes som klikkbare fagord
— samme mønster som pkt. 31/32.

### Designvalg
- **Kampanjefaktor er konstant over perioden** (kanal×segment × avtagende
  budsjett) — stabilt/forklarbart. Faktisk kunde-% = (faktor−1)×100.
- **Førpris:** `prisendretDag` logges KUN når eleven aktivt endrer en pris; en
  vare med etablert/urørt pris gir aldri brudd. Brudd = pris endret < 14 dager
  før salgskampanjen → tilsynsbrev + bot (tunbar).
- **DEV_SPOL_KAMPANJE** finaliserer uten spilte dager (akkBakgrunnKr=0 → ROI
  −100 %); ekte dager gir reell merinntekt.

### Espens Chrome-sjekkliste (per del)
Aktiver `kampanje` (lærerdashbord eller `localStorage['tema-aktivering-dev'] =
{"kampanje":{"aktiv":true,"nivaa":"vg1"}}`), åpne med `?dev=1`:
- **DEL 1:** aktiver mens du spiller → mentor-boble «Læreren har åpnet Kampanje …».
- **DEL 3:** Marked-fanen → «📣 Kampanje — planlegg»: 3-stegs intro, fire valg,
  total kostnad live, 📚-lenker (treff-tall vises ALDRI her). «⏩ Fyll planlegger …».
- **DEL 4:** Start kampanje → åpne en dag → Dagspuls viser «📣 Kampanje pågår».
- **DEL 5:** «⏩ Spol til kampanjeslutt» → effektrapport (mål vs faktisk, kostnad
  vs merinntekt). Bytt nivå vg2 → ROI-elevoppgave + A/B (etter to kampanjer).
- **DEL 6:** hub `/learning/mfi/kommunikasjon-kanaler` → fase 6 «Hvem bruker
  hvilke medier?» tabell + kilde + fiktiv-merking + kildekritikk.
- **DEL 7:** ved effektrapport → mentoren peker med dine tall + kanal-treff.
  Salgskampanje på nylig prisendret vare → tilsynsbrev + førpris-refleksjon.

### 33b. Fiksrunde Tema 8 — Espens valideringsfunn (6 deler)

> **Status: bygget. `tsc -b` + `vite build` per del + `npm run spilltest`
> (5176): 12/12 PASS.** Gren `spor-a/tema-kampanje` — IKKE merget. 6 commits.

- **DEL A** — mentor/tema-tekst «Marked-fanen» → «Markedsføring-fanen» (fanens
  faktiske navn). Commit `9685c8a`.
- **DEL B** — kanaler 1–6 (fjernet 1-2-taket, fri kr/dag ≥ minstepris); «🧠 Hvem
  bruker hvilke medier?» som tydelig callout-knapp i kanal-steget; hub-tabellen
  fikk ekstern rapportlenke «Les hele rapporten hos Ipsos» →
  ipsos.com/nb-no/ipsos-some-tracker. Commit `4434a18`.
- **DEL C** — «SITUASJONSANALYSE (kort)» + auto «📄 Din markedsplan»-oppsummering
  (situasjon→mål→målgruppe→virkemidler→periode→evaluering), synlig etter start og
  i effektrapporten; rapporten refererer planen. Commit `70d3164`.
- **DEL D** — Markedsføring-fanen i to seksjoner (Kampanje / Løpende synlighet);
  løpende budsjett harmonisert til de 6 kanalene + kanaldata-effekt
  (`lopendeMarkedsforingsfaktor`, svakere/jevn). Commit `cf24785`.
- **DEL E** — egen «🚚 Distribusjon»-fane (M-merke) + Horisont-notat (Tema 4).
  Commit `cf24785`.
- **DEL F** — glossary MKT_051 Kampanje / MKT_052 Rekkevidde / MKT_053 Markedsplan
  / MKT_054 Foerpris (VG1) + ECO_034 ROI (VG2), Espen-godkjente definisjoner.
  Fagord-tokens aktivert i planlegger/rapport/mentor. Glossary-flagget fra pkt.
  33 lukket. Commit `9685c8a`.

**Løpende markedsføring — kanal-mapping (gammel → ny).** `marketingBudget` er nå
`Record<kanal-id, kr/mnd>` med de 6 navngitte kanalene. Budsjettet persisteres
ikke (re-seedes ved reload), så ingen runtime-migrering trengs; konseptuell
mapping for referanse:

| Gammel kategori | Ny kanal |
|---|---|
| Sosiale medier | Instagram |
| Google | Facebook |
| Influencer | TikTok |
| Trykt reklame | Byposten (lokalavis) |
| TV / Radio | Radio Innlandet |

Effekt: `lopendeMarkedsforingsfaktor(budsjettPerKanal, segmenter)` — samme
kanaldata som kampanjen, men lavere tak (`BALANCE.kampanje.lopende`: metning
8000, maksLoft 0.15/kanal, maksFaktor 1.3). Default (0 budsjett) = 1.0 → ingen
regresjon i kjerneløkka (spilltest steg 5 uendret).

## 34. Balansefiks — månedsskifte-levering + opprydding etter Tema 8 (sluttstatus)

> **Status: PÅ MAIN, grønt.** `tsc -b` + `vite build` + `npm run spilltest`
> (**13/13**) grønn. Balansespiller kjørt på main. Grenene
> `spor-a/tema-kampanje` + `spor-a/balansefiks` merget/integrert og slettet.

Rekkefølge (Espens klarsignal): (1) `spor-a/tema-kampanje` ff-merget til main
(Tema 8, pkt. 33). (2) `spor-a/balansefiks` integrert oppå — men med en
tilpasning, se under. (3–5) verifisert + dokumentert.

**DEL 1 — månedsskifte-hullet (ekte bug) — LØST.** En bestilling lagt siste
handledag fikk `ankomstDag = 13`, en dag som aldri kom (dayNumber → 1 ved
månedsrull) → ordren strandet (betalt, aldri levert), og dag 1 i ny måned startet
med tom ferskvaredisk. Fiks: `ankomstDag` wrappes over månedsskiftet i
`ORDER_PRODUCT` → ankomst dag 1 i ny måned. Dagstart-levering består. Regresjon:
`full-maaned` **steg 13** (steg 12 er Tema 8-kampanjen). Commit `06a54fd`.

**DEL 2 (markedsforingSkala) — DROPPET; erstattet av dødkode-rydding.** Tema 8
DEL D koblet trafikkmodellen fra den flate `markedsforingsfaktor(markedsforing-
Skala)` til `lopendeMarkedsforingsfaktor` (per kanal × målgruppe-treff). Etter
kampanje-merge hadde den gamle funksjonen + `markedsforingMin/Max/Skala` **null
lesere** — balansefiks-DEL 2s verdiendring (100k→40k) ble en no-op. Isteden
fjernet jeg død kode (funksjon + tre balance-felt). `baseMultiplier` urørt
(bevisst — møte-engasjement skal tippe til pluss). Commit `dd057a2`.

**DEL 3 — balansespiller tilpasset ny modell + kjørt på main.** MAKS/KAMPANJE
fordeler nå månedsbudsjettet på ekte kanal-id-er (Instagram/Snapchat/Facebook) +
setter målgruppe-segmenter, så effekten måles via `lopendeMarkedsforingsfaktor`
(samme vei som spillet). `lopende`-verdiene TUNES IKKE (egen rekalibreringsjobb).
Commits `cda0efa` (verktøy+tilpasning), `7ff99b5` (kjøring+analyse).

Resultat (snitt/mnd, sentrum-l2, rykte 50, møter skipet):

| Strategi | FØR (opprinnelig) | ETTER (på main) |
|---|--:|--:|
| PASSIV | −46 200 | −46 200 (uendret) |
| **FORNUFTIG VG1** | −1 844 | **+355** (≥ 0 fra mnd 2) |
| MAKS INNSATS | −28 132 | −32 003 (ny modell, før rekalib.) |
| FORNUFTIG + KAMPANJE | −14 386 | −11 810 (ny modell, før rekalib.) |

FORNUFTIGs pluss-gevinst er **ren DEL 1-effekt** (byte-identisk med/uten den nye
markedsføringsmodellen — den bruker 0 mkf). MAKS/KAMPANJE er mer negative fordi
den nye per-kanal-modellen (u-rekalibrert) gir mindre løft per krone enn den
gamle flate skalaen — signalet til rekalibreringsjobben, ikke en driftsdom. Full
før/etter i `BALANSE_ANALYSE.md` («Status etter balansefiks»).

**Flagg — spilltest er nå 13 steg, ikke 12.** Tema 8 la til steg 12 (Kampanje);
månedsskifte-regresjonen ble derfor steg 13. `npm run spilltest` = **13/13**
(scopet til `full-maaned`; balansespilleren er et MÅLEVERKTØY utenfor det raske
løpet, kjøres eksplisitt).

**Åpen oppfølging:** rekalibrer `BALANCE.kampanje.lopende` (løpende markedsføring)
så MAKS/KAMPANJE blir et forsvarlig valg med nok bemanning — bruk balansespilleren
som måleverktøy. Se TODO-lista under.

## 35. REKALIBRERING — økonomien speiler en ekte norsk småbykafé

> **Status: PÅ MAIN, grønt.** DEL 0–7f + prisflyt (DEL 7) er ff-merget til main
> (`bf3bae1`). `tsc -b` + `vite build` + `npm run spilltest` (**14/14** på main)
> grønn. Balansespiller-**sluttbevis kjørt på main**: alle målbilde-rader står
> (fornuftig solo +7k/mnd, godt drevet +28k, passiv −87k/konkurs), GRÅDIG-
> kontroll −101k (klart dårligere), determinisme består. Grenen slettet.
>
> Bakgrunn: inntektssiden var dimensjonert som en KIOSK (~116 kunder, ~5 900
> kr/dag), kostnadssiden som en BYKAFÉ. «+355 kr/mnd uten eierlønn og uten
> ansatte» var en usann virkelighet. Motoren er URØRT — alt er `balance.ts` +
> katalog + `districts.ts` + doc.
>
> **DEL 0** (Espen-godkjent, etter validering): glossary «Eierlønn» (ECO_035,
> Økonomi/VG1) lagt inn + fagord-token aktivert i budsjett/oppgjør/mentor. Lukker
> glossary-flagget fra DEL 3c.

**DEL 1+2 — `docs/VERDENSMODELL.md` (fasit for ALL balansering).** By ~30 000
innb., gangtrafikk 3–5k/hverdag, fangst 4–7 % → 150–300 kunder/dag, snittkjøp
70–85 kr. Referansebedrifter (Granum/Lillehammer Bakeri) KUN som dok-ankere —
spillkaféen ligger under. Medierekkevidde (Byposten ~29 %, Radio Innlandet
~31 %). Spillmåned = 12 handledager. MÅLBILDE-tabell (tuning-fasit).

**DEL 3 — Eierlønn (40 000 kr/mnd) som fast linje.** `balance.ts.eierlonnMnd`;
egen linje i `manedligeFasteKostnader` (økonomi.ts) → månedsoppgjør + Økonomi-fane;
SYVENDE budsjettlinje (forhåndsutfylt + redigerbar, VG1-enkelt); mentor-boble
`forste_eierlonn` (refleksjon: eierens arbeid er aldri gratis). **FLAGG:
«eierlønn» finnes IKKE i glossary** — IKKE diktet opp; trenger Espen-godkjent
definisjon før fagord-token aktiveres.

**DEL 4 — inntektssiden skalert.** Basetrafikk (sentrum-l2 110→150), kafépriser
(kaffe 39→50, bakst ~35→50–57 → snittkjøp ~50→~79), solo-kapasitetstak ~160/dag
(junior 15→20), `kampanje.lopende` satt bevisst. **Startkapital 150 000 → 200 000**
(~2,3 mnd runway mot ny ~87k faste; passiv konkurs likevel). `baseMultiplier`
urørt.

**DEL 5 — lokal-stigen.** rentFactor (husleie) og basetrafikk stiger SAMMEN —
ingen «gratis vinner». Stige-tabell i VERDENSMODELL §3.

**DEL 6 — verifisering (balansespiller, snitt/mnd, NETTO etter eierlønn):**

| | sentrum-l2 | Målbilde | Treff |
|---|--:|---|:--:|
| Passiv | −87 000 (konkurs ~mnd 3) | dypt minus | ✓ |
| Fornuftig solo | 153 kunder · 12 100 oms · **+8 000** | 150–180 · 12–14k · +5–10k | ✓ |
| Godt drevet | 279 kunder · 21 300 oms · **+29 000** | 250–300 · 20–24k · +25–40k | ✓ |

Lokal-stigen på l4 (billig): fornuftig solo +3k (viable, lavere tak), godt drevet
−2k (over-bemannet → feil strategi for stedet). Determinisme består.

### DEL 7 + 7f — prising er elevens jobb + priselastisitet

**DEL 7a** — «Veiledende pris» fjernet fra kaféens Priser-UI: varene starter
UPRISET (`catalogToProduct` retailPrice 0), eleven setter utsalgspris fra BLANKT
felt. Kalkyle-hjelpen (margin/påslag NÅR pris er tastet) beholdt. Referanseprisen
beholdt i datalaget, DØPT OM til `markedsPris` (markedsanker). Klesbutikkens
Innkjøp-katalog urørt.

**DEL 7b** — Upriset vare = ikke i salg: uprisede varer i sortimentet attraherer
etterspørsel de ikke kan innfri → tapt salg «mangler pris» (egen oppgjørslinje).
«Mangler prismerking»-badge i disken fantes allerede (prisopplysningsforskriften).

**DEL 7f-b/c** — Per-vare-priselastisitet (`PRISELASTISITET` i balance.ts, tre
profiler HØY/MIDDELS/LAV, kurve m/interpolasjon, gulv 0). Virker på varens
volum ALENE; kundestrøm beholder en DEMPET samlet priskomponent. Kategori→profil-
mapping dokumentert i `BALANSE_ANALYSE.md` §c. Overpris → tapt salg «for høy pris»
(egen oppgjørslinje, per vare med elevens pris vs. markedspris).

**DEL 7c/7f-d** — Mentor-triggere: (1) åpner butikk med uprisede varer i disken
(re-armes per dag); (2) oppgjør med mangler-pris-tap (antall); (3) oppgjør der en
vare tapte salg på overpris (navner varen, «X kr hos deg — nedi gata ~Y»,
per vare-episode). Fagord: MKT_048 (kalkyle), ECO_011 (påslag), ECO_031 (utsalgspris).

**DEL 7d/e/7f-e** — Balansespilleren priser via intern referanseprisfunksjon
(`markedsPris × prisMultiplikator`); UI-et har den ikke. GRÅDIG-kontroll (alle
priser 2× marked): omsetning kollapser ~144k→~22k/mnd → **−107k/mnd** mot
FORNUFTIGs +7k (assertert klart dårligere). Målbilde-radene STÅR (normalpriser =
markedspris). Spilltest **steg 14**: upriset croissant → 88 tapt (mangler pris);
kaffe (HØY) @ 2× → **0 solgt, 92 tapt** (for høy pris). **14/14 PASS.**

### Chrome-sjekkliste (Espen validerer)
1. **Eierlønn i månedsoppgjøret:** rull en måned → oppgjøret viser «Eierlønn (din
   lønn) 40 000» blant faste kostnader, og månedsresultatet er ETTER den.
2. **Eierlønn i budsjettet (Økonomi → Budsjett, Tema 2 aktivt):** SYVENDE linje
   «Eierlønn», forhåndsutfylt 40 000, redigerbar. «Sist måned» viser 40 000.
3. **Mentor-boble:** første månedsoppgjør → boble om at eierens arbeid ikke er
   gratis (etter «Første måned i boks»-boblen).
4. **Nye tall / skala:** HUD viser **200 000 kr** startkapital. En fornuftig
   drevet måned lander i pluss ETTER eierlønn; en passiv går tom for penger.
5. **Lokalvelgerens stige:** dyrere lokale (Torggata 1 / Hjørnelokalet) har høyere
   husleie OG merkbart mer trafikk enn de billige (Gågata 16). Sjekk at et dyrt
   lokale gir kø/tapte salg solo, men lønner seg med en ansatt.
6. **Fargesvak:** avvik/resultat vises med fortegn + tekst, aldri farge alene.
7. **Prising er elevens jobb (DEL 7a):** Priser-fanen har BLANKE prisfelt (ingen
   forhåndsutfylt/veiledende pris) — kun innkjøpspris + margin/påslag når du taster
   en pris. Kaffe-eksempel: markedet ligger ~50 kr (vises kun via kjøpt
   markedsundersøkelse, som konkurrentintervall — ikke som «din» pris).
8. **Upriset vare (DEL 7b):** la en vare stå uten pris, legg den i disken, åpne →
   «⚠ Mangler prismerking»-badge i trauet; dagsoppgjøret får linje «Tapte salg: N
   (mangler pris)». Mentor-boble ved åpning + ved oppgjør.
9. **Overpris (DEL 7f):** sett kaffe til ~100 kr (2× marked), åpne en dag →
   kaffe selger ~ingenting; dagsoppgjør får linje «Tapte salg: N (for høy pris)»
   + «For høy pris: Kaffe (din 100 · marked ~50)»; mentor nevner varen. Sett en
   spesialkake (LAV) dyrt → den tåler mer enn kaffen (selger fortsatt noe).

### Åpen oppfølging
- **Glossary «eierlønn» — LUKKET (DEL 0):** ECO_035 lagt inn (Espen-godkjent),
  fagord-token aktivert i budsjett/oppgjør/mentor.
- **Kampanjekostnad i månedsresultatet:** i dag trekkes kampanjekostnaden fra
  KASSA ved start, men ikke fra `settlement.resultat` (accrual). Balansespilleren
  korrigerer selv (netto). Vurder om oppgjøret bør vise kampanjekostnad som egen
  linje (konsistens kasse ↔ resultat). Ikke rørt her (motor-endring).

## 36. TEMA 15 REISELIV OG VERTSKAP (bølge 3)

> **Status: MERGET TIL MAIN (2026-07-19)** etter Espens Chrome-validering. Gren
> `spor-a/tema-reiseliv` ff-merget til main og slettet (lokalt + origin).
> `tsc -b` + `vite build` + `npm run spilltest` (**17/17**) grønn PÅ MAIN.
> Tema 14 Arrangement bygges IKKE som spillmekanikk (Espens beslutning);
> vertskaps-kompetansen bæres av dette temaet.
> **Neste:** turistkontoret bygges om fra panel til ROM-scene på egen gren
> `spor-a/turistkontor-scene` (se pkt. 37).
>
> **DEL 2 (fasade-generering) UTGÅTT** etter Espens Chrome-verifisering:
> stasjonsbydelen finnes allerede med hotellet bakt inn i bydelsbildet — se
> «Piloter/assets» under. De 4 fasade-oppføringene er fjernet fra
> `ASSET_PROMPTS.json`.

### OMBYGGING v3 (Espens designbeslutning) — turister UT av kaféen
Turist-scenariene bor ikke lenger i kaféens kundemøte-strøm; de er flyttet til
**reiselivsstedene**. Kaféens sesongeffekt er nå **kun økonomisk**.
- **Turistkontoret** («👋 Møt en besøkende», TuristkontorPanel, i sesong) →
  starter **Språkbarrieren** eller **Opplevelsen** (seedet rotasjon; «Opplev byen»-
  påmelding vekter mot opplevelses-anbefalingen) med samme dialogkort-UI.
- **Byhotellet** («👋 Møt en gjest», hotell-hotspot, i sesong) → **Kulturmøtet**
  eller **Tax-free**. *Defensivt mot `spor-c/hotell-lobby`:* når lobbyen merges,
  flyttes disse møtene inn i lobby-scenen; til da kjøres de fra hotspot-klikket.
- **Kaféen i sesong:** INGEN turist-sprites/-scenarier. Bare økonomi —
  trafikkløft (+20 %) + varevekt (kaffe/kaker). Dagspulsen viser «🧳 Turistsesong
  (dag X av Y)» uten turistandel-prosent. `TURIST_SCENARIO_IDS` filtreres alltid
  bort fra kafépoolen (`turistScenarioPool`-funksjonen fjernet).
- **Uendret:** pakkebyggeren, «Opplev byen»-gjestepakken, hotellavtalen (bor
  allerede riktig sted). `turistandel` beholdes som INTERN økonomisk parameter
  (hotell-kuttet + sesong-akkumuleringen) — bare ikke lenger surfacet som
  «synlige turister i kaféen».
- **Teknisk:** ny ekte inngang `game:openScenario`-event (ved siden av dev-
  `dev:openSalesScenario`) → samme `SalesScenarioOverlay`. Innganger + seedet
  valg i `data/reiseliv.ts` (`velgTuristkontorScenario`/`velgByhotellScenario`),
  pooler i `sales/scenarios.ts` (`TURISTKONTOR_SCENARIO_IDS`/`BYHOTELL_SCENARIO_IDS`).
- **Horisont (framtidig lag):** en **engelsk-/språkmodul** kan legges oppå
  scenariene (særlig Språkbarrieren) — la eleven øve vertskap på engelsk. Ikke
  bygget nå; scenariomotoren tar det som et rent innholds-/språklag senere.

**DEL 1 — registrering.** `temaer.ts`: `reiseliv` (vg1+vg2) + hub-lenker
(vertskapsrollen, kulturforståelse, reiselivsprodukt, internasjonale markeder).
Mentor-trigger `tema_reiseliv_aktivert` (m/ [[KULT_003]]-token) + reiseliv i
tema-aktiveringsløkka.

**DEL 3 — turistsesong (kjernen).** Læreren slår på reiseliv-temaet → sesong
starter automatisk (samme `temaAktivering`-kontrakt, INGEN egen RTDB-node —
enklest; dokumentert i VERDENSMODELL §1). Varighet ~14 handledager (tunbar). I
sesong (KAFÉEN, kun økonomisk etter v3): **+20 % trafikk** (dagspuls «🧳
Turistsesong (dag X av Y)») + **vare-vekt** (drikke ×1,6, kaker ×1,5) vrir
bakgrunnssalget mot kaffe/kaker (konsekvens, aldri forklart på forhånd). Alt i
`balance.ts.turistsesong`.

**DEL 4 — 4 turist-scenarier** (Likeverd-kvalitet; etter v3 kjørt fra
reiselivsstedene, IKKE kaféen — se OMBYGGING v3 over): Språkbarrieren
(kommunikasjon uten felles språk), Kulturmøtet (kulturforståelse, nabomål til
Likeverd), Opplevelsen (anbefale lokale opplevelser — vertskap ut over disken,
nevner turistkontoret), Tax-free-spørsmålet (praktisk servicekunnskap). Fagord-
token [[KULT_003|vertskap]] + [[KULT_004|kulturforståelse]] aktive i feedbacken.

**DEL 5 — turistkontor + hotell (hotspots ved STASJONEN).** Begge ligger på
stasjonsbydelen (`/game/d/stasjonsomradet`), ikke i sentrum. To klikkbare
hotspot-rects på bydelsbildet når reiseliv er aktivt (`DistrictView`,
`STASJON_REISELIV_HOTSPOTS`): **🧳 Turistkontoret** → `TuristkontorPanel`;
**🏨 Byhotellet** → status (avtale aktiv/ikke) + åpner innbokshendelsen om ulest.
Rectene er **placeholder** til Espen tracer dem med `?dev=1` (sone-tracer-
overlay lagt inn på stasjonsområdet) og låser i `districts.ts`. Panelet: sesong-
status + «Opplev byen»-gjestepakke (løfter opplevelse-scenariet) + turistkontor-
interiøret som CSS-hero. Byhotellet: innboks-samarbeidshendelse ved sesongstart
(15 % kutt mot gjestestrøm, svar innen 3 dager); aksept → +25 % turisttrafikk MEN
lavere realisert margin (hotellet tar sin andel), avslag → full margin.

**DEL 6 — mentor + dev + spilltest.** Dynamisk mentor ved sesongslutt (elevens
turisttall vs. normaluke) + ved hotellsvar (VG2: gjester vs. margin). Dev: «⏩
Start turistsesong nå» + «⏩ Spol til sesongslutt».

**DEL 7 — pakkebyggeren (reiselivsprodukt).** I `TuristkontorPanel`, i sesong: en
**besøksprofil** roterer deterministisk fra sesongstarten (4 stk i `data/reiseliv.ts`:
barnefamilie / aktivt par / seniorbuss / konferansegjest — behovet i **fritekst**,
aldri fasitliste). **Opplevelsesbank** med 10 fiktive lokale kort (elevens egen
kafé er alltid ett av dem). Eleven velger 3 kort; **VG2** setter også pakkepris.
Treffet regnes i `beregnPakke` (delt ren funksjon — samme fasit i reducer OG
spilltest): egenskaps-overlapp mot profilens skjulte `liker`, minus straff for
for lang total tid og for dyr prisklasse; klemt 0–1. **Konsekvens etterpå
(brannalarm-modellen, ingen score):** resultatkort «X turister kjøpte pakken din»
+ 2–3 tilbakemeldinger. **Egen kafé i pakken → målbar ekstra sesongtrafikk**
(+15 % kafébonus i `OPEN_DAY`, `balance.ts.turistsesong.pakke.kafeTrafikkBonus`).
Dynamisk mentor (`pakke_bygget`) leser treffet (godt/middels/svakt) uten å
avsløre fasiten.

**Spilltest (16/16):**
- **Steg 15:** turistandel + vare-vekt + trafikkløft (+20 %) == fasit;
  hotellavtale-hendelsen dukker opp; aksept → +25 % hotellbonus == fasit
  (146 → 177 kunder/dag).
- **Steg 16:** pakke-treff + «X turister kjøpte» == `beregnPakke`-fasit
  (profil «seniorbuss» → 47 % treff, 13 turister); egen-kafé-kort → +15 %
  kafébonus == fasit (146 → 165 kunder/dag). Steg 16 rydder localStorage før
  boot fordi reiseliv-tilstand persisteres i BUDSJETT_KEY og overlever `?skip`
  (ellers arves steg 15s aksepterte hotellavtale → falsk hotellbonus).

### Piloter / assets (generert i økten via `nb-generate.sh`)
- **Fasader UTGÅTT** (hotellet bakt inn i bydelsbildet). De 4 kandidatene fjernet
  fra `ASSET_PROMPTS.json`.
- **Turist-interiør** (`turistkontor-interior.png`, Espen-generert): ✦-vannmerket
  fjernet med `cv2.inpaint` (NS, hjørneboks), pikseldiff-verifisert; brukt som
  CSS-hero i panelet (INGEN sone-kalibrering nå).
- **Turist-sprites — ETT samlet ark (bølge 3, Espens beslutning).**
  `turist-ark-05a.png` (2 forsøk generert, Espen valgte A) → kopiert til
  `customers-ark-05-raw.png` → splittet med `split-product-sheet.py` (rembg +
  blob-crop, halo=0) til **6 sprites** i `public/assets/raw/customers/`:
  `turist-familie`, `turist-par`, `turist-eldre-stokk`, `turist-backpacker`,
  `turist-kamera` (person 5, **ERSTATTER** den gamle i Opplevelsen-scenariet),
  `turist-eldrepar`. Par/familie/eldrepar står inntil hverandre → splittes som
  ÉN sprite hver (ønsket — opptrer alltid sammen). Turist signaliseres KUN av
  rekvisitter (kart/kamera/sekk/hatt/stokk), aldri etnisitet. Kart-turisten
  (`turist-kart.png`, godkjent tidligere) er IKKE på arket og beholdes.
  **spriteCal-førstepass:** singel-figurene har samme aspect (~0,36–0,40) som
  kari/tom → scenariene bruker den delte base-kalibreringen (gyldig førstepass);
  Espen finpusser ev. per-sprite via `?dev=1`. Registeret `TURIST_SPRITER`
  (`data/reiseliv.ts`) holder alle 7 klare for fremtidige scenarier.
- **Ambient turist-gjester (bølge 3, DEL c) — flyttet til reiselivsstedene
  (Espens beslutning v2).** Turistene hører hjemme der man møter reisende, ikke i
  kaféen. To spor:
  - **Kafé-interiøret (`InteriorView`): PARKERT, av som standard**
    (`BALANCE.turistsesong.ambient.aktiv=false`). Systemet er beholdt bygget
    (seedet utvalg på ledige kundeposisjoner, `pointerEvents:none`, påvirker ikke
    fasit) og kan slås på igjen etter pilot-erfaring. `INTERIOR_AMBIENT_TURIST_SLOTS`
    + `?dev=1`-tracern («ambient-N») ligger klare, men **trenger IKKE tracing nå**.
  - **TuristkontorPanel-heroen: AKTIVT.** I sesong vises **1–2 seedede** turist-
    sprites oppå `turistkontor-interior.png` (faste CSS-posisjoner `HERO_GJEST_SLOTS`,
    satt visuelt — ingen tracer; Espen finjusterer i validering). Rolig rotasjon
    pr. dag (`velgAmbientTurister(dagSeed(...))`) så det ikke er samme gjester hver
    dag. Verifisert headless: backpacker + eldrepar står naturlig ved disken,
    klar av tittelen.
  - **KRAV til `spor-c/hotell-lobby`:** SAMME mønster skal brukes i hotellobbyen
    (1–2 seedede gjester ved peisen/stolene, faste posisjoner, ingen interaksjon).
    Gjenbruk `TURIST_SPRITER` + `velgAmbientTurister` fra `data/reiseliv.ts`.

### Chrome-sjekkliste (Espen validerer)
1. **Aktivering:** slå på Reiseliv (lærer/temaAktivering) → mentor-boble om
   turistsesong; sesongen starter.
2. **Turistsesong i dagspulsen:** åpne en dag → «🧳 Turistsesong (dag X av Y)»
   (uten turistandel-prosent etter v3). Bruk «⏩ Start turistsesong nå» (?dev=1).
3. **Sortimentseffekt:** i sesong selger du merkbart mer kaffe/kaker (vare-vekt).
   **Ingen** turist-sprites/-scenarier i kaféen (kun økonomi).
4. **Turist-scenarier (fra reiselivsstedene):** i sesong → Turistkontoret «👋 Møt
   en besøkende» gir Språkbarrieren/Opplevelsen; Byhotellet «👋 Møt en gjest» gir
   Kulturmøtet/Tax-free. Samme dialogkort-UI som kaféens kundemøter.
5. **Stasjons-hotspots (LÅST):** gå til stasjonsbydelen → «🧳 Turistkontoret»
   (bygg langs gata) + «🏨 Byhotellet» (det sentrale HOTEL-bygget) er klikkbare.
   Turistkontor → panel; hotell → status/innboks. Rectene er Espen-tracet og låst
   i `districts.ts`.
6. **Byhotellet:** innboksen får «🏨 Byhotellet vil samarbeide» ved sesongstart →
   aksept gir mer turisttrafikk (dagspuls) men litt lavere margin; avslag ikke.
7. **Pakkebyggeren:** i panelet i sesong → «🎒 Sett sammen en pakke»: les
   besøksprofilen, velg 3 opplevelser (VG2 setter pris), tilby → resultatkort «X
   turister kjøpte» + tilbakemeldinger. Egen kafé i pakken → mer trafikk.
8. **Ambient turist-gjester (i turistkontoret):** åpne Turistkontoret i sesong →
   1–2 turist-sprites står i heroen (ved disken), roterer pr. dag. Ren visning.
   Si fra om noen står dumt, så flytter jeg `HERO_GJEST_SLOTS`. (Kafé-interiørets
   ambient er PARKERT/av — ikke noe å sjekke der nå.)
9. **Sesongslutt:** «⏩ Spol til sesongslutt» → mentor-refleksjon om turisttall.

### Åpen oppfølging / flagg
- **Fagord «reiselivsprodukt» — LØST:** Espen-godkjent definisjon lagt inn som
  `REIS_001` (kategori «Reiseliv», VG2). Fagord-token aktivert der det var flagget
  som ren tekst: TuristkontorPanel (`<em>` → `<Fagord id="REIS_001">`) + mentor
  (`[[REIS_001|reiselivsprodukt]]` i `pakke_bygget`-melding + dynamisk 66 %-treff).
  (`vertskap`=KULT_003 + `kulturforståelse`=KULT_004 fra før.)
- **Dev-modus finpuss (Espens klikk-test):**
  - **Tracer-lag sperret hotspot-klikk i `?dev=1`** (Espen så labelene, kom ikke
    inn). Fikset: `ZoneTracer` har nå en «✋ Tracer AV/PÅ»-toggle, **default AV**
    (`pointerEvents:none` → klikk går gjennom til turistkontor/byhotell; soner
    vises fortsatt). Slå PÅ for å dra rektangler. Verifisert headless: begge
    hotspots åpner panel/hotellstatus i dev.
  - **TIL LEIE-skiltene skjult på stasjonen** (`visLedigeLokaler:false` på bydelen
    i `districts.ts`; sentrum uendret). Etablering der er ikke åpnet ennå — KUN
    visningen gates, lokaldataene/mekanikken (LOKALER + RENT_LOCATION) beholdes.
  - Begge vokta av **spilltest steg 17** (17/17): ingen TIL LEIE på stasjonen,
    tracer default AV, turistkontor-klikk åpner panelet.
- **Hotspot-plassering — LÅST:** `STASJON_REISELIV_HOTSPOTS` er Espen-tracet
  (turistkontor `[57, 26.6, 4.2, 11.3]`, byhotell `[47.6, 15.8, 8.7, 13.8]` på det
  sentrale HOTEL-bygget). **Tooling-fiks beholdt:** stasjonsbydelen bruker nå
  RECT-traceren (`ZoneTracer`, dra boks + «Bruk siste på: …»), ikke rute-traceren
  (`DevCoordHelper` ga bare polyline-punkter → kunne ikke definere et rekt; det
  var derfor det første trace-forsøket ga ubrukelige verdier).
- **BUGFIX (dev-dyplenke):** `/game/d/stasjonsomradet?dev=1` ga bransjevelgeren.
  Rotårsak (reprodusert headless, ikke gjettet): en direkte bydel-URL uten aktivt
  spill står `phase='startup'` (spilltilstand overlever ikke reload) → GamePage
  rendret `StartupScreen`; kun `?skip=1` seedet et spill. Fiks: `?dev=1` + en
  bydel i ruten seeder nå et engangsspill (`devDeepLink` i GamePage, samme som
  `?skip`), OG stasjons-hotspotene rendres i `?dev=1` uansett om reiseliv-temaet
  er på (`|| IS_DEV_COORDS` i DistrictView) — så «🧳 Turistkontoret»/«🏨 Byhotellet»-
  labelene faktisk vises for tracing/validering. Ny **spilltest steg 17**
  vokter dette (17/17); labelene også visuelt bekreftet headless.
- **Kafé-ambient PARKERT** (`ambient.aktiv=false`): `INTERIOR_AMBIENT_TURIST_SLOTS`
  + «ambient-N»-traceren ligger klare men trenger IKKE trace nå (turistene vises i
  turistkontor-panelet i stedet).
- **KRAV til spor-c/hotell-lobby:** samme ambient-gjest-mønster (1–2 seedede
  gjester ved peis/stoler) — gjenbruk `TURIST_SPRITER` + `velgAmbientTurister`.
- **Turist-ark bølge 3 — LØST:** ETT ark (Espen valgte kandidat A) splittet til 6
  sprites; erstattet enkeltgenereringene. Kari-likhets-flagget fra forrige runde
  er dermed utgått.
- **Interiør-inpaint:** en svak myk flekk står igjen der ✦ var (akseptabelt i
  dimmet bakgrunn). Full scene-oppgradering (tracede UI-soner mot interiøret) er
  egen fremtidig jobb (horisont).

## 37. TURISTKONTORET SOM ROM-SCENE (Espens designbeslutning)

> **Status: MERGET TIL MAIN (2026-07-20)** etter Espens Chrome-validering + låst
> gjest-kalibrering. Gren `spor-a/turistkontor-scene` rebaset på Spor C
> (hotell-lobbyen) og ff-merget til main; slettet (lokalt + origin). `tsc -b` +
> `vite build` + `npm run spilltest` (**19/19**) grønn PÅ MAIN. Turistkontoret er
> ikke lenger et overlay-panel, men et ROM man går INN i (som kaféens /inne).
> **Byhotell-hotspoten** navigerer nå INN i Spor C-lobbyen (`/hotell-lobby`),
> samme mønster; den gamle ByhotellStatus-overlayen er fjernet (hotellavtalen
> besvares fortsatt via innboksen). Spilltest: steg 17 = stasjons-hotspots
> (byhotell→lobby + turistkontor→scene), steg 18 = hotell-lobby (Spor C), steg 19
> = turistkontor-scenen (gjest dekoder ved disken + velger).

**DEL a — rom-scene + rute.** Ny rute `/game/d/:districtId/turistkontor` →
`TuristkontorScene` (fullskjerm `turistkontor-interior.png`, aspect 1296/832,
eleven bak disken). Turistkontor-hotspoten på stasjonsbydelen NAVIGERER inn
(ikke panel). «← Stasjonen»-knapp + diskret sesongstatus øverst.

**DEL b — besøkende ved disken.** I sesong står en besøkende ved disken
(sprite = det seedede scenariets kunde, `velgTuristkontorScenario` →
Språkbarrieren/Opplevelsen). Klikk = start møtet (`game:openScenario` →
dialogkort). Forgrunns-disk-okklusjon (kopi av interiøret klippet under
`occludeY`; disken er lav → mye synlig). `?dev=1` gir gjest-kalibrerings-sliders
(scale/centerX/waistY/occludeY) som logger verdiene → **Espen finpusser og
låser** `TURISTKONTOR_GJEST_CAL` + `TURISTKONTOR_OCCLUDE_Y` (PLACEHOLDER nå).

**DEL c — UI-lag i scenen.** Panel-innholdet flyttet inn: rom-verktøylinje
(bunn) med «🎒 Sett sammen en pakke» + «📋 «Opplev byen»-gjestepakken».
Pakkebyggeren trukket ut til gjenbrukbar `src/game/ui/Pakkebygger.tsx` (uendret
logikk, tar en `profil`-prop). Sesongstatus diskret øverst.

**DEL d — e-postforespørsler om pakke.** Ved sesongstart seedes **2–3**
førstepersons e-poster i innboksen (`PAKKE_FORESPORSLER`, mot besøksprofilene):
«Familie på 4, én dag i byen, budsjett ~1 500 kr…». «🎒 Svar med en pakke» åpner
pakkebyggeren mot forespørselens profil → resultat/tilbakemelding som før.
Spilltest steg 15 vokter seedingen; verifisert headless (3 forespørsler → svar →
FORESPØRSEL-modus).

**DEL e — gammelt panel fjernet.** `TuristkontorPanel.tsx` slettet (scenen dekker
alt). Kafé-ambient-kommentaren i balance.ts oppdatert.

### Chrome-sjekkliste (Espen validerer scenen)
1. Stasjon → klikk «🧳 Turistkontoret» → du går INN i rommet (bak disken).
2. I sesong: en besøkende står ved disken → klikk = scenariomøte (dialogkort).
   Juster plassering/okklusjon med `?dev=1`-sliderne og meld tilbake verdiene.
3. Rom-verktøylinja: «🎒 Sett sammen en pakke» (pakkebyggeren) + «📋 Opplev byen».
4. Innboks: 2–3 📧-forespørsler → «Svar med en pakke» → bygg mot profilen.
5. «← Stasjonen» tilbake.

### Åpen oppfølging / flagg
- **Gjest-cal + SKRÅ forgrunnslinje — LÅST av Espen** (?dev=1, godkjent mot alle 7):
  `TURISTKONTOR_GJEST_CAL = { scale: 0.44, centerX: 68, waistY: 61 }`,
  `TURISTKONTOR_OCCLUDE = { left: 81.5, right: 61.5 }`. Disken er i PERSPEKTIV, så
  forgrunns-klippet er en SKRÅ linje (occ.L = venstrekant, occ.R = høyrekant;
  `clipPath: polygon(0 occ.L, 100% occ.R, …)`, samme mønster som kassevyens
  `occludeYLeft/Right`). To ?dev-sliders logger verdiene.
- **BUGFIX 1 (tom disk i dev):** dev-dyplenke starter ingen sesong → ingen gjest.
  Nå viser scenen ALLTID en kalibrerings-gjest i ?dev=1, med en **gjest-velger**
  (‹/›) gjennom alle 7 turist-sprites (`TURIST_SPRITER`).
- **BUGFIX 2 (sprite rendret aldri, Espen-verifisert):** gjest-`<img>` hadde ingen
  `key`, så den ble GJENBRUKT når velgeren byttet sprite. `onError` satte inline
  `opacity:0` PERMANENT → én tidlig load-feil (f.eks. cachet 404 fra scenens
  churn) skjulte ALLE senere sprites, selv om de lastet fint. Matcher symptomet
  «velger virker, men ingen sprite». Fiks: `key={gjestFil}` (hver sprite = friskt
  element, ingen lekkasje) + `onError` skjuler ikke lenger stille (logger; ekte
  feil vises som brukket bilde). **Verifisert med skjermbilde-løkke — alle 7
  sprites rendrer synlig ved disken** (`docs/rapporter/bilder/turistkontor-gjest-
  velger-7sprites.png`), naturalWidth>0 + opacity 1 for hver. Vokta av steg 17.
- **Sti-buggen hos Espen = STALE VITE-SERVER (ikke kode):** hans `:5173`-server
  returnerte `200 · 633 bytes · text/html` (SPA-index.html-fallback) for
  `/assets/raw/customers/turist-*.png`, mens en FERSK vite fra samme filer ga
  `200 · 139 KB · image/png`. Serveren var blitt forvirret etter at jeg gjorde
  `git checkout`/rebase mellom grener MENS hans vite kjørte (filer byttes under
  publicDir-watcheren). **HUSREGEL: etter checkout/rebase i et tre med kjørende
  dev-server → RESTART serveren.** Løst ved server-restart. (onError/key-fiksen
  var likevel riktig: den gjorde feilen SYNLIG som brukket bilde, som avslørte
  633-byte-fallbacken.)
- **Rom-verktøylinja** er flytende knapper (ikke bundet til et fysisk element i
  bildet ennå). Å binde «pakke» til brosjyrestativet/disken som traced hotspot
  er en mulig polish (?dev-trace) — sagt ifra om ønsket.
- **Delt `reiselivPakke`-slot:** e-post-svar og walk-in bruker samme pakke-slot
  (ett resultatkort om gangen) — bevisst enkelt; vurder egen slot per forespørsel
  hvis Espen vil ha flere parallelle.

## 38. ENGASJEMENT — KROK 4 GAME FEEL-PAKKEN (ENGASJEMENTSLAGET v2)

> **Status: MERGET TIL MAIN (2026-07-20)** etter Espens Chrome-validering + fiks-
> runde. Gren `spor-a/engasjement-gamefeel` ff-merget til main og slettet (lokalt
> + origin). `tsc -b` + `vite build` + `npm run spilltest` (**20/20**, lyd +
> animasjoner AV/snap i headless) grønn PÅ MAIN.
> Referansedokument: `docs/ENGASJEMENT.md` (DEL 0). Rammene der gjelder: ingen
> XP/poeng for klikking, alt seedet deterministisk, kosmetikk gir aldri fordel,
> fortegn+tekst (aldri kun farge/emoji). Alt tunbart i `balance.ts.gamefeel`.

**DEL 1a — Lyd (Web Audio, syntetisert; ingen eksterne ressurser).**
`gamefeel/lyd.ts`: kasse-pling ved hvert bakgrunnssalg (dempet, maks 1/sek via
cooldown), kort oppgjørs-fanfare KUN ved positivt dagsresultat. Global 🔊/🔇-
bryter i HUD (localStorage, default PÅ). **ALLTID av i headless/spilltest**
(`navigator.webdriver`). AudioContext armes ved første brukergest (autoplay).
`gamefeel/GameFeelAudio.tsx` (rendrer ingenting) lytter på state — reduceren
forblir ren.

**DEL 1b — Animerte tall.** `gamefeel/useAnimatedNumber.ts` (easeOutCubic):
HUD-kassa teller mykt opp/ned ved endring; dagsoppgjørets sluttsum teller opp
(`useCountUp`). Snapper øyeblikkelig i headless + `prefers-reduced-motion`.

**DEL 1c — Dagsoppgjør som seremoni.** 2-sek oppsummeringskort «Dag X: N kunder ·
[seedet høydepunkt]» FØR talloppsettet; klikk hopper over (per-dag, ikke replay).
Høydepunktet er deterministisk: 🌟 beste dag denne uka / 🍃 rolig dag / seedet
nøytral linje.

**DEL 1d — Mikro-animasjoner.** 📦-leveranse-eska glir inn ved dagstart (CSS
`leveranse-glid`, én gang, av ved reduced-motion) på «ferske varer klare»-pilla i
kaféinteriøret. Fornøyd kundemøte (positiv rykte-delta) → transient 💚-badge i
dagspulsen som fader (ny `dayStats.sisteMoteFornoyd`).

### FIKS-RUNDE (Espen-funn under validering)
1. **«Priser lagres ikke» — IKKE en grenregresjon (headless-verifisert).**
   Reproduserte den EKTE Priser-fanen headless: input→«Lagre priser ✓» gir
   `retailPrice` 0→50 og varen selger (bakgrunn-kr 550, mangler-pris-tap 0).
   `DashboardOverlay` er byte-identisk med main (tom diff), så prismekanikken er
   ikke rørt av grenen. ROTÅRSAK til Espens opplevelse: prisen ble bare committed
   ved «Lagre»-KLIKKET (lå ellers i input-feltets lokale state — den «løsrevne
   tallboksen»), og uten klikk-respons var det lett å tro den var lagret. **Fiks:
   prisen auto-lagres nå ved BLUR** (forlat feltet → `SET_PRODUCTS`), i tillegg
   til «Lagre priser». (Animerte tall er KUN visnings-tall — HUD/oppgjør — aldri
   input-felt, per regelen.)
2. **Bestill-kvittering (UX, Krok 4):** «Bestill»-klikk kvitterer nå («✓ Bestilt —
   N stk, levering i morgen»), spiller kasse-pling, og ordrelinja i «Underveis»
   vises umiddelbart.
3. **Fanerekkefølge:** «Produkter» flyttet til RETT FØR «Priser» (varer før
   prising). Produkter beholder markedsforing-fag (badge/farge urørt) — kun
   rekkefølgen endret.
- **Ny spilltest steg 20** (20/20): driver den EKTE Priser-fanen (input→blur +
  Lagre) → pris persistert → varen selger. Steg 14 testet bare modellen via
  test-broen; dette fanger en UI-regresjon.

### Chrome-sjekkliste (Espen validerer)
Full URL (dev-server 5173): **`http://localhost:5173/game?skip=1`**
1. **Lyd på/av:** 🔊-knappen i HUD (ved siden av 🔔/💻). Default på; klikk → 🔇.
2. Leie et lokale (sentrum «TIL LEIE»), legg åpningsbestilling, **åpne en dag** →
   under dagen: kasse-**pling** ved bakgrunnssalg (maks ett i sekundet, dempet),
   og **💰-kassa i HUD teller** mykt når penger kommer inn.
3. Spill et kundemøte og velg gode svar → **💚 Fornøyd kunde!**-badge i dagspulsen
   (fader etterpå).
4. **Steng dagen** → **seremonikort** «Dag X: N kunder · [høydepunkt]» i 2 sek
   (klikk hopper over) → tallene, **sluttsummen teller opp**, og ved **positivt**
   resultat en kort **fanfare** (negativt = ingen lyd).
5. **Start ny dag** med en leveranse ventende → **📦-eska glir inn** i «ferske
   varer klare»-pilla i kaféen.
6. Skru på «Redusert bevegelse» i OS → animasjoner snapper (tallene bare bytter).
7. **Prising (fiks):** i Priser-fanen — skriv en pris og **klikk ut av feltet**
   (uten «Lagre») → prisen er lagret (varen slutter å vise «mangler pris» og selger).
8. **Bestill (fiks):** Produkter-fanen — «Bestill» kvitterer «✓ Bestilt — N stk …»
   + pling, og ordren dukker opp i «Underveis».
9. **Fanerekkefølge (fiks):** Produkter ligger nå FØR Priser i dashbord-linja.

### Åpen oppfølging / flagg
- **Lyd-syntesen** (pling/fanfare) er enkle oscillator-toner — Espen sier ifra om
  han vil ha annen karakter (volum/tonehøyde er tunbart i `balance.ts.gamefeel.lyd`).
- **«Ved døra»:** leveranse-eska glir inn på leveranse-pilla (toppmidtstilt), ikke
  bundet til en tracet dør-sone. Kan bindes til interiørets dør senere (?dev-trace)
  om ønsket.
- **Neste kroker (ENGASJEMENT.md byggerekkefølge #2–5):** Espen spør (Krok 6),
  Bestillinger (Krok 7a), Stamkunder (Krok 2), Klassens gate V1 (Krok 1).

## 39. ENGASJEMENT — KROK 7: DEN LEVENDE INNBOKSEN (7a + 7b + 7d)

> **Status: MERGET TIL MAIN (2026-07-20)** etter Espens klarsignal (m/ glossary-
> tillegg pkt. 0). Gren `spor-a/engasjement-innboks` ff-merget til main og slettet
> (lokalt + origin). `tsc -b` + `vite build` + `npm run spilltest` **GRØNN 21/21**
> (nytt steg 21) PÅ MAIN. **7c Lokalavisen** er fortsatt utsatt (trenger
> stamkunder/besøk fra Krok 2/6). Referansedokument:
> `docs/ENGASJEMENT.md` (Krok 7 + rammene + distribusjonstrappa). **7c Lokalavisen
> er UTSATT** (krever stamkunder/besøk som kilder — Krok 2/6 må bygges først).
> Rammene som gjelder: seedet deterministisk, tunbart tak (1–3/dag, VG1 skal ikke
> drukne), hver e-post er noe å GJØRE eller noe som SKJEDDE, mentor varsler ulest
> post m/frist, fortegn+tekst (aldri kun farge — Espen er fargeblind), ALDRI fasit
> underveis (brannalarm-modellen: beslutning først, sannheten etterpå).

**Arkitektur.** Quest-e-postene er førsteklasses `InboxMessage` (nye typer
`kundebestilling`/`leverandortilbud`/`mkftilbud` + valgfrie felt `avsender`,
`fristAbsDag`, `epostStatus`, `epost`-nyttelast, `epostRefleksjon`) — de flyter
gjennom eksisterende ulest-teller, innboks-UI og mentor-badge. All logikk
(generering/utløp/levering/effekt) i reduceren; DATA + rene kalkyler + seedede
maler i ny `src/game/data/innboksEpost.ts`. Alt tunbart i `BALANCE.innboks`.

**DEL 1 — e-post-motoren.** Seedet dagsgenerering i `START_NEW_DAY`
(`genererDagensEposter`, PRNG fra `dagSeed`): 0–2 nye e-poster/dag (vektet lavt:
P(0)=0.45, P(1)=0.40), aldri over taket `maksAktiveUbesvart=3` aktive ubesvarte.
Utløp: `sveipEposter` resolverer forfalte frister ved dagstart — utløpt svarfrist
= `utlopt` med refleksjon (tapt mulighet), ALDRI stille forsvinning. Frist-chip i
innboks-headeren («⏰ Svarfrist: om N dager», gul ≤1 dag — tekst, ikke bare farge).

**DEL 2 — 7a Kundebestillinger (quest, distribusjonstrappas trinn 2).** «Sett av
X til [anledning] — henter om N dager.» Aksept = forpliktelse fram i tid
(`epostStatus: akseptert`); levering skjer automatisk på leveringsdagen (samme
`sveipEposter` som dagstart): nok lager → betaling (Σ qty×retailPrice, minus
elevens valgte **mengderabatt** 0/10/15 %) + fornøyd kunde (+2 rykte); for lite
lager → `sviktet` = skuffet kunde (−6 rykte, ingen betaling). VG2: skriftlig
pristilbud-fritekst lagres på payloaden (vurderingsspor). Dette er «salg utenom
disk» — bestillingen åpner en ny **distribusjonskanal** (trinn 2).

**DEL 3 — 7b Leverandørtilbud (frist-beslutning).** «−R % på [vare] ved kjøp over
N enheter.» Regnestykket er SKJULT til etter beslutningen: `tilbudsprisPerEnhet`
vs. elevens normale `costPrice`. ~35 % (`leverandorLureriAndel`) er **villedende**
(`erLureri`): rabatten regnes fra en oppblåst listepris så tilbudsprisen ender
OVER normal innkjøpspris — subtile signaler (ukjent avsender fra en egen
«lure»-liste, «Kun i dag — svar raskt!»), aldri åpenbart (forbereder personvern-
temaets phishing). Aksept → rabattert innkjøp i leveringspipelinen (ankommer neste
dagstart, samme som `ORDER_PRODUCT`). Post-hoc refleksjon avslører nettoregnskapet
(«du sparte X» / «du betalte X for mye — sjekk alltid om rabatten er reell»).

**DEL 4 — 7d Markedsføringstilbud (kobler Tema 8).** Annonseselger (Byposten,
lokalavis 40+), influenser (matblogger 8 000 følgere, 20–35), sponsor
(skolerevyen). Hvert har SKJULT kanal×målgruppe-treff — GJENBRUKER kampanjens
`treffISegmenter` (refaktorert ut av `kanalTreffISegmenter` i `kampanje.ts`, samme
fasit). Eleven ser ALDRI treff-tallet før beslutning; ~40 %
(`mkfOverprisAndel`) er overpriset (dobbel pris, samme løft). Aksept → tidsavgrenset
`mkfBoost` {faktor, sluttAbsDag} som løfter bakgrunnstrafikken i `OPEN_DAY` (som
kampanjen), utløper i `START_NEW_DAY`. Post-hoc refleksjon leser treff vs. egen
målgruppe («traff målgruppa godt/delvis/dårlig — X % daglig treff») + VG2-vinkelen
«betalt omtale SKAL merkes (markedsføringsloven)» på influenser-tilbud.

**DEL 5 — glossary + mentor + dev + spilltest.**
- **Mentor-hendelse** `forste_epost_frist` (kø + peker, MAKS én gang): fyrer ved
  første ULESTE quest-e-post med svarfrist. Token `[[MKT_006|distribusjonskanal]]`.
- **Dev (?dev=1, GamePage):** «⏩ Send test-e-post av hver type»
  (`DEV_SEND_TEST_EPOSTER`) + «⏩ Spol til frist» (`DEV_SPOL_TIL_FRIST` — tvinger
  alle aktive frister/leveranser til forfall NÅ og resolverer dem).
- **Spilltest steg 21 (21/21):** A) seedet bestilling → aksept → levert →
  betaling **== fasit** (`bestillingBetaling`, 600 kr) + lager −12 stk; B) akseptert
  bestilling uten nok lager → **sviktet** + rykte 50→44, ingen betaling; C)
  villedende leverandørtilbud → aksept gir **negativt nettoregnskap** (−200 kr,
  `leverandorNettoBesparelse` < 0) + betalt 760 kr + innkjøp på vei til lager.
  (Fallgruve løst: test-broens `__GAME_STATE__`-speil oppdateres i en effekt ETTER
  commit — les via `ventState`-polling på `epostStatus`, aldri bart `lesState` rett
  etter `dispatch`, ellers leses stale speil.)

### Glossary (pkt. 0 — LØST, Espen-godkjent)
Brukt som token: **MKT_006 Distribusjonskanal**, **MKT_035
Influencer-markedsføring** (fantes fra før). LAGT TIL etter Espens klarsignal:
**SAL_003 Mengderabatt** (Salg VG1), **SAL_004 Pristilbud** (Salg VG2), **JUS_008
Betalt omtale** (Jus VG1) — med Espen-forfattede definisjoner/eksempler/vanlig-feil.
`<Fagord>`-tokens aktivert der de brukes: mengderabatt + pristilbud i
kundebestillingens beslutnings-UI, betalt omtale i mkf-tilbud med merkekrav.
FLAGGet fra første runde er dermed lukket.

### Datamodell-forenkling (flagg)
Kundeleveransens betaling legges direkte på `money` ved dagstart (utenom
dagsoppgjørets P&L), og de leverte varenes varekost utgiftsføres ikke i
måneds-P&L (kun lager-uttrekk). Bevisst VG1-forenkling for engasjements-kroken —
kan kobles inn i dagsresultatet senere om Espen vil ha full regnskapsintegritet.

### Chrome-sjekkliste (Espen validerer)
Full URL (dev-server 5173): **`http://localhost:5173/game?skip=1`**
1. Lei et lokale, legg åpningsbestilling, still ut disk. Bruk **?dev=1** →
   **`http://localhost:5173/game?dev=1&skip=1`** og klikk **«⏩ Send test-e-post av
   hver type»** (nederst) → 3 e-poster i 📬 Innboksen (📋 bestilling, 🏷️ leverandør,
   📣 markedsføring), og **Espen-mentoren varsler** «post med en frist».
2. **📋 Bestilling:** åpne den → se varelinje + «Betaling ved dine priser», velg
   **mengderabatt** (Ingen/10/15 %) — betalingen oppdateres, valgfritt skriftlig
   pristilbud (VG2). «Ja, ta bestillingen» → **⏰-frist-chip** + status «✅ Takket
   ja». Klikk **«⏩ Spol til frist»** → med nok lager: «📦 Levert» + betaling i kassa
   + refleksjon; med for lite lager (tøm disken først): «⚠️ Ikke oppfylt» + skuffet
   kunde (rykte ned).
3. **🏷️ Leverandørtilbud:** åpne → «Ja, kjøp for X kr» (regnestykket er skjult).
   Etterpå: status «✅ Takket ja» + **refleksjon** som avslører om det lønte seg
   (villedende tilbud: «DYRERE enn din normale … du betalte X for mye»). Innkjøpet
   dukker opp i Produkter → «Underveis».
4. **📣 Markedsføringstilbud:** velg en målgruppe i Målgruppe-fanen først. «Ja, kjøp
   plassen» → etterpå **refleksjon** «traff målgruppa godt/delvis/dårlig (X %)».
   Åpne en dag → **trafikken løftes** mens boosten varer.
5. **Frist utløper uten svar:** send test-e-poster, la dem ligge ULEST, «⏩ Spol
   til frist» → «⌛ Frist utløpt» + «tapt mulighet» (ingen stille forsvinning).
6. **Taket:** flere «Send test»-klikk stabler ikke opp mer enn 3 aktive ubesvarte
   av gangen i vanlig dagsgenerering (dev-knappen kan overstige for testing).

### Åpen oppfølging / flagg
- **7c Lokalavisen** venter på stamkunder/besøk (Krok 2/6) som kilder — bygges når
  de finnes.
- **VG1/VG2-nivå:** det finnes ikke en GLOBAL VG1/VG2-flagg utenfor et aktivt tema,
  så VG2-tilleggene (pristilbud-felt, betalt-omtale-vinkel) vises for ALLE (valgfrie
  for VG1). Bind til nivå om et globalt nivå innføres.
- **Persistens:** `mkfBoost` persisteres i `BUDSJETT_KEY` (samme reload-overlevelse
  som kampanje/turistsesong). Selve quest-e-postene ligger i `state.messages` som
  IKKE persisteres på reload (samme som dagens hotellavtale/pakke-forespørsler) —
  konsistent med eksisterende innboks, ikke en ny begrensning.

## Åpne TODO-er / flagg (les før du bygger videre)

- **Løpende markedsføring (`BALANCE.kampanje.lopende`) — SATT (pkt. 34→35):** pkt.
  34 flagget at verdiene ikke var finpusset for løpende drift; pkt. 35 satte dem
  (metning 5000 / maksLoftPerKanal 0,25 / maksFaktor 1,45) så «godt drevet»
  (bemannet + løpende mkf + kampanje) gir +29k/mnd. Finpuss videre ved behov med
  balansespilleren (`npx playwright test tests/spilltest/balansespiller.spec.ts`).
- **Glossary «eierlønn» — LØST (pkt. 35 DEL 0):** ECO_035 (Espen-godkjent) lagt
  inn + fagord-token aktivert i budsjett/oppgjør/mentor.
- **Låneavdrag i dagssyklusen — LØST (pkt. 15):** amortisering + trekk skjer nå
  ved månedsrull via delt `economy.amortiserLaan`. (Tidligere dempet TODO-linje
  fjernet.)
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
- **Bakgrunnssalg-balanse** (pkt. 10) er kalibrert grovt, ikke spilltestet.
  Alle tall i `balance.ts`; sentrum-l1/l5 er dyrere enn l2 men har lavere
  basetrafikk (l2 er «sweet spot» per oppgaven) — vurder om dyre lokaler bør
  få mer trafikk for å forsvare leia. Eksponering krever manuell trau-plassering
  (`eksponeringReferanse = 4`); en tom disk gir 0,7-faktor.

## 40. KROKER — global nivåbryter + Krok 6 «Espen spør» + Krok 2 Stamkunder

> **Status: BYGGET på gren `spor-a/kroker-espen-spor-stamkunder` (fra origin/main
> 2f7fab0).** `tsc -b` + `vite build` + `npm run spilltest` **GRØNN 25/25** (nye
> steg 22–25). **IKKE merget** — main urørt, avventer Espens Chrome-validering.
> MERK: bygget PÅ toppen av den MERGEDE innboksen (Krok 7); den separate
> `spor-a/innboks-fiks` (oppgjør-scroll, Te-navn, tomtekst) er IKKE med her —
> begge grener rører `DayResultOverlay`/`DashboardOverlay`, så en liten
> flettekonflikt kan oppstå når begge merges (triviell).

### DEL 0 — GLOBALT KLASSENIVÅ (VG1/VG2)
Lukker flagget «ingen global VG1/VG2 utenfor tema» fra innboks-runden.
- **RTDB:** `klasser/{klassekode}/klasseNivaa` = `'vg1' | 'vg2'` (søsternode til
  `temaAktivering`), default `vg1`. `GameContext` abonnerer live (eget `onValue`),
  localStorage-fallback `klasse-nivaa-dev` uten klassekode.
- **Hooks:** `useKlasseNivaa()` (globalt effektivt) + `useEffektivtNivaa(temaId?)`
  — presedens: aktivt temas nivå (`useTemaNivaa`) overstyrer globalt INNENFOR
  temaets innhold; globalt gjelder alt annet.
- **Lærer:** global VG1/VG2-velger øverst i `TemaAktiveringPanel` («Spillet»-fanen),
  med forklaring. **Dev (?dev=1):** nivå-toggle i dev-panelet — egen nøkkel
  `klasse-nivaa-dev-override` som VINNER over RTDB/fallback (merket «DEV»).
- **Binding:** VG2-tilleggene fra innboks-runden gates nå på nivået — skriftlig
  **pristilbud**-felt (kundebestilling) og **betalt-omtale**-vinkelen
  (mkf-refleksjon, via `visMerkekrav`-flagg i `ACCEPT_MKFTILBUD`) vises kun ved vg2.

### DEL 1 — KROK 6 «ESPEN SPØR»
- **`data/espenSporsmal.ts`:** 15 statiske grunnpool-spørsmål (VG1-vekt) + 5
  dynamiske (elevens egne tall: DB, DG, påslag, svinn %, målgruppe) + 4 VG2 + 1
  tema-gatet (Kampanje). `bygg(state)` returnerer null når data mangler (dynamiske).
  Forklaringer bruker `[[GLOSSARY_ID|..]]`-tokens og er sjekket mot glossary.json
  (motsier ikke definisjonene).
- **State/reducer:** `state.espenSpor` (aktivt snapshot, sisteSvar, besvarteIds,
  feilCooldown, dagTeller/dagBelonning) — persistert i `BUDSJETT_KEY`.
  `STILL/SVAR/LUKK_ESPEN_SPOR`. Maks ett ubesvart om gangen; `finnKandidater`
  filtrerer nivå/tema/besvart/cooldown/data.
- **P&L (lærdom fra forrige flagg):** riktig svar → kunnskapsbonus lagt på `money`
  MED i P&L — `dayStats.kunnskapsbonusKr` → `DayResult.kunnskapsbonusKr` → egen
  «🎓 Kunnskapsbonus»-linje i dagsoppgjøret + med i `resultat`. Ikke utenom.
- **Mentor:** quizen flyter gjennom kø-mekanismen (peker + N-badge, klikk når du
  vil, aldri avbrytende). Interaktiv boble: svarknapper → fasit + forklaring ETTER
  svar. Fargeblind-trygt: «✓ Riktig svar»/«✗ Ditt svar»-tekstlabels, aldri kun
  farge. Kadens: etter dagsoppgjør (drift), etter (ny) prising (kalkyle), etter
  målgruppevalg (malgruppe) — reduceren gater, så dispatchene er trygge å fyre ofte.
- **Dev (?dev=1):** «🎓 Still neste spørsmål nå» (bypasser dagstaket).
- **BALANCE.espenSpor:** `belonningKr: 200` (≈ én god times driftsmargin, jf.
  målbildet 3 000–5 000 kr/dag/8 t — merkbart, ikke en snarvei), `maksBelonningPerDag:
  400` (2 riktige), `maksPerDag: 2` (auto-triggere; VG1 skal ikke drukne),
  `cooldownDagerVedFeil: 3`.

### DEL 2 — KROK 2 STAMKUNDER
- **State:** `state.stamkunder[scenarioId]` = `{ antallMoter, fornoydeUtfall,
  sisteUtfall, erStamkunde }` — persistert. Oppdateres i `RESOLVE_SALES_SCENARIO`
  (KUN ekte møter, `isMeeting`). Utfall mappet fra `reputationDelta` (>0 fornøyd /
  <0 misfornøyd / =0 nøytralt) — GJENBRUKER samme signal som 💚-badgen, ikke et
  nytt utfallslager. 2+ fornøyde → `erStamkunde`.
- **Kundemiks:** `planleggMoter` fikk valgfritt `vekter`-param (Efraimidis–Spirakis
  vektet-uten-gjentakelse): stamkunde ×2, «misfornøyd sist» ×0,5 (aldri helt borte
  — service recovery). No-weight-stien er **byte-identisk** (fersk kafé → uendret
  miks, så eksisterende spilltest-determinisme er bevart).
- **Kjøpsbonus:** stamkunde-kjøp får `kjopsBonusFaktor 1,2` på scenariobetalingen
  (kr, ikke antall; varekost urørt).
- **`data/stamkundeDialog.ts`:** 6 særpregede kunder (Live m/førerhund, Maren,
  Roger, Tom, Sunniva, Fredrik) med 2–3 varme gjenkjenningshilsener (refererer
  forrige møtes tema) + 1 kjøligere ved misfornøyd. Vises som et LAG oppå møtestart
  (steg 1) — scenariodata (`scenarios.ts`) er uendret. Fargeblind-trygt: «👋 KJENNER
  DEG IGJEN»-tekstlabel.
- **Målgruppe-fanen:** stamkunde-oversikt (navn + tekstlabel-status «Stamkunde»/
  «Misfornøyd sist»/«Kjenner deg» + besøkstall; ingen scores/målere).
- **Mentor:** dynamisk trigger `stamkunde_forste` (navngir kunden,
  `[[MKT_027|stamkunde]]`).
- **Dev (?dev=1):** «👋 Gjør siste kunde til stamkunde» (`DEV_GJOR_STAMKUNDE`,
  virker på `sisteMoteKundeId`, fallback Maren).
- **BALANCE.stamkunder:** `fornoydeForStamkunde: 2`, `vektFaktor: 2`,
  `vektMisfornoyd: 0.5`, `kjopsBonusFaktor: 1.2`.

### DEL 3 — SPILLTEST (25/25)
Nye steg (les state via `ventState`-polling, aldri bart `lesState` rett etter
dispatch — fallgruven fra innboks-runden):
- **22 (A):** Espen spør — riktig svar → `money += belonningKr`; dagstak håndhevet
  (3. riktige samme dag gir 0 ekstra); egen `kunnskapsbonusKr`-linje i `DayResult`
  == fasit (400 kr).
- **23 (B):** feil svar → penger uendret; `sisteSvar.riktig=false`; forklaring
  finnes; `feilCooldown[id] == absDag + 3`; id IKKE i `besvarteIds`.
- **24 (C):** 2 fornøyde møter (seedet via ny test/dev-action `DEV_SPAWN_MOTE`) →
  `erStamkunde`; møte 3 betaling `50 → 60` (kjøpsbonus); `stamkundeHilsen` gir varm
  hilsen.
- **25 (D):** nivåbryter — `finnKandidater` med `vg1` har 0 VG2-spørsmål, med `vg2`
  har VG2-spørsmål; pristilbud-feltet er skjult i VG1 og synlig i VG2 (DOM).

### Åpne flagg
- **Glossary «stamkunde»:** brukt `[[MKT_027|stamkunde]]` (Kundelojalitet) — dekker
  konseptet, men det finnes ikke en egen «Stamkunde»-term. Espen avgjør om en
  egen term skal legges til (ikke oppfunnet her).
- **`DEV_SPAWN_MOTE`** er en test-/dev-affordance (setter aktivt kundemøte) — også
  nyttig for manuell testing; ingen produksjonskode utenom ?dev/spilltest bruker den.
- **VG1/VG2 «etter første prising»-kadens** er approksimert (fyres ved enhver ny
  prising i løpet av dagen; dagstaket begrenser til 2 auto-spørsmål/dag).

### Chrome-sjekkliste (Espen validerer)
Full URL (dev-server): **`http://localhost:5173/game?dev=1&skip=1`**
1. **Dev-knapper (nederst):** «🎓 Still neste spørsmål nå», «👋 Gjør siste kunde til
   stamkunde», og «Nivå: VG1/VG2 DEV»-togglene.
2. **Espen spør:** klikk «🎓 Still neste spørsmål nå» → Espen nede i hjørnet PEKER
   med **N-badge** (ingen popup). Klikk figuren → spørsmål med svarknapper. Svar
   **riktig** → «✅ Riktig! Kunnskapsbonus +200 kr» + forklaring (📚-ord klikkbare);
   svar **feil** → «❌ Ikke helt —» + forklaring, ingen straff. Steng en dag →
   **🎓 Kunnskapsbonus**-linje i dagsoppgjøret. Still 3 samme dag → 3. gir 0 kr.
3. **Stamkunder:** klikk «👋 Gjør siste kunde til stamkunde» (eller spill 2 gode
   møter med samme kunde). Neste møte med den kunden åpner med en **👋 KJENNER DEG
   IGJEN**-hilsen. Se **Målgruppe-fanen → «Stamkunder — kjente fjes»** (navn +
   status-tekstlabel + besøk). Mentor sier fra første gang en kunde blir stamkunde.
4. **Nivåbryter — VG1:** sett «Nivå: VG1 DEV». Åpne en **kundebestilling** i
   📬 Innboks → **INGEN** «skriftlig pristilbud»-felt. Espen spør stiller kun
   VG1-spørsmål.
5. **Nivåbryter — VG2:** sett «Nivå: VG2 DEV». Samme kundebestilling → **pristilbud**-
   feltet er nå der. Markedsføringstilbud fra en influenser viser «⚖️ betalt omtale
   må merkes». Espen spør kan nå stille VG2-spørsmål (dekningsgrad, betalt omtale,
   førpris, pristilbud).
6. **Lærer-panelet** (TeacherDashboard → «Spillet»): global «Klassens nivå»-velger
   (VG1/VG2) over tema-lista — endring ses live i spillet for elever med klassekoden.

---

## FIKSERUNDE — samlet DEV-panel + stamkunde-redesign (2026-07-21)

Gren: `spor-a/kroker-espen-spor-stamkunder`. To deler, commit per del. `tsc -b`
rent. Bokmål. Alle statuser er tekstlabels, aldri kun farge.

### DEL 1 — SAMLET DEV-PANEL (⚙)
**Problem:** dev-verktøyene lå spredt — en flytende knappeklynge nederst i midten
(GamePage), tracere/kalibreringspaneler i hver scene, og scenariovelgeren i
interiøret. Espen fant ikke de nye knappene.

- **Ny `src/game/dev/DevPanel.tsx`:** ÉN fast **⚙ DEV**-knapp nede til VENSTRE,
  synlig på ALLE spillruter når `?dev=1` (bykart, bydel, storefront, inne, disk).
  Klikk → skuff med alle dev-handlinger gruppert med overskrifter:
  - **Nivå:** VG1/VG2-toggle (`setKlasseNivaaDev`).
  - **Espen spør:** 🎓 Still neste spørsmål nå.
  - **Stamkunder:** 👋 Gjør siste kunde til stamkunde · 👥 Spawn stamkundemøte nå.
  - **Innboks:** ⏩ Send test-e-post av hver type · ⏩ Spol til frist.
  - **Tema:** 🔥 Utløs brannalarm · ⏩ Start turistsesong · ⏩ Spol til sesongslutt.
  - **Scenarier:** toggle scenariovelgeren (vises i interiørscenen).
  - **Kalibrering:** toggle tracer-/kalibreringsverktøyene i scenene.
  - **Annet:** ▶ Simuler måneden (gammel PEST).
- **Deaktivert med tekstlabel, aldri skjult:** handlinger som mangler kontekst
  (ingen «siste kunde», ikke aktivt beredskap/reiseliv-tema, ingen åpen dag, ingen
  returnerende stamkunde, ikke leid lokale) vises grået ut med en ⛔-forklaring.
- **Delt lager `src/game/dev/devPanel.ts`** (`useSyncExternalStore`,
  localStorage `dev_panel_v1`): husker panelets åpen/lukket + synlighetsflaggene
  for kalibrering og scenariovelger.
- **De spredte knappene er FJERNET fra sine gamle steder.** Kalibrerings-/tracer-
  panelene og scenariovelgeren FLYTTES ikke — de bor fortsatt i scenene, og er
  synlige som før (default PÅ i `?dev=1`), men panelet lar deg nå slå dem AV for en
  ren scene. Gjelder InteriorView, MonterScene, StorefrontView, CityMapView,
  DistrictView, LobbyView, TuristkontorScene.

### DEL 2 — STAMKUNDE-REDESIGN: personen utvikler seg, scenariet gjentas IKKE
**Prinsipp:** salgsscenariet er en ENGANGS pedagogisk situasjon. Stamkunden er
PERSONEN, som kommer tilbake i egne, korte GJENKJENNINGSMØTER med UTVIKLING —
aldri en reprise av scenariet.

- **Engangs-scenarier:** `OPEN_DAY` filtrerer bort et scenario som er spilt
  (`stamkunder[id].antallMoter ≥ 1`) fra dagens pool — samme scenario trekkes
  ALDRI to ganger (unntak: dev/scenariovelgeren kan alltid). Kundemiks-vektingen
  fra forrige runde gjelder nå STAMKUNDEMØTER, ikke scenarioreprise.
- **Ny møtetype `'stamkunde'`** i `ScheduledMeeting.kind` + `state.activeMeetingKind`.
  `planleggMoter` planlegger nå to typer i samme strøm: engangs-scenarier (uspilt
  pool, uten gjentakelse) + stamkundemøter (returnerende kunder, vektet). Inntil
  `moteReserveAndel` (0,5) av dagens møter reserveres til stamkundemøter når det
  finnes returnerende kunder.
- **Nytt overlay `src/game/ui/StamkundeMoteOverlay.tsx`:** kort (2–4 replikker +
  kjøp m/`kjopsBonusFaktor`), bruker kundens sprite i scenen, IKKE scenariotreet.
  `RESOLVE_STAMKUNDEMOTE` legger på kjøpsbonusen, hever utviklingstrinnet og gjør
  service recovery (sisteUtfall → fornøyd).
- **`data/stamkundeDialog.ts` skrevet om til UTVIKLINGSTRINN** per kunde (alle 6):
  - **trinn 1** (etter godt scenarioutfall): gjenkjennelse, refererer forrige
    møtes tema («fant jo den glutenfrie til meg sist»).
  - **trinn 2**: tydelig utvikling (den usikre vet hva hun vil ha; prutekunden har
    sluttet å mase om pris; den travle tar seg tid).
  - **trinn 3**: kunden ANBEFALER deg — tar med venn/kollega → **+1 ekstra kjøp**.
  - **Negativ kurve** (misfornøyd sist): 1 kjøligere kortvariant + vekt ned; et
    godt møte løfter kurven igjen (service recovery). Replikkene bygger på
    personlighetene i scenariodataene.
- **`state.stamkunder[id].utviklingstrinn`** (0/1/2/3), persistert (gamle lagringer
  → 0 ved innlasting). Godt scenarioutfall → trinn 1; hvert gode stamkundemøte
  hever trinnet (maks 3).
- **Målgruppe-fanen** viser trinnet som tekstlabel via `stamkundeTrinnLabel`:
  «Ny stamkunde» / «Trygg stamkunde» / «Anbefaler deg» (+ «Misfornøyd sist» /
  «Kjenner deg» for trinn 0). Alltid tekst, aldri kun farge.
- **BALANCE.stamkunder** (tillegg): `moteReserveAndel: 0.5`,
  `stamkundemoteRykte: 2`, `stamkundemoteXp: 5`. Uendret: `fornoydeForStamkunde: 2`,
  `vektFaktor: 2`, `vektMisfornoyd: 0.5`, `kjopsBonusFaktor: 1.2`.
- **Fjernet:** den gamle `stamkundeHilsen`-gjenkjenningshilsen på scenariets steg 1
  (SalesScenarioOverlay) — gjenkjennelsen bor nå i selve stamkundemøtet, ikke oppå
  et scenario som uansett ikke gjentas.

### Spilltest — steg 24 (C) oppdatert (full spilltest 25/25 PASS)
- **(A) Engangs:** spill `den-usikre` én gang med godt utfall → `utviklingstrinn=1`,
  full pris (ingen bonus ennå).
- **(B) Invariant:** ny dag trekker ALDRI et scenario-kind-møte for en allerede
  spilt kunde.
- **(C) Stamkundemøte:** trinn 1 → 2 → 3 gir riktig dialog (ren `stamkundeMote`-
  fasit) og kjøpsbonus ×1,2; **trinn 3 = +1 venn-kjøp** (betaling 2×50×1,2 = 120).

### Åpne flagg / valg gjort her (ikke låst)
- **Møte-miks:** `moteReserveAndel = 0,5` (halvparten av dagens møter til
  stamkunder når noen kan returnere). Rent balansetall — juster fritt i
  `balance.ts` hvis kadensen føles feil.
- **Stamkundemøtets kjøp:** kunden handler «det vanlige» = hovedproduktet
  (`mainProductId`) hvis priset og på lager, ellers første prisede vare med lager;
  qty 1, eller 2 på trinn 3. Ingen egen produktvelger — bevisst kort møte.

### Chrome-sjekkliste (Espen validerer) — OPPDATERT
Full URL (dev-server): **`http://localhost:5173/game?dev=1&skip=1`**

1. **Klikk ⚙ DEV nede til venstre.** Knappen ligger fast i NEDRE VENSTRE hjørne på
   ALLE ruter (bykart, bydel, storefront, inne, disk). Klikk → skuff spretter opp
   med gruppene: **Nivå · Espen spør · Stamkunder · Innboks · Tema · Scenarier ·
   Kalibrering · Annet**. Grå knapper har en ⛔-tekst som sier hvorfor de er av
   (f.eks. «Møt en kunde først» før du har møtt noen). Panelet husker åpen/lukket.
2. **Kalibrering:** sonetracere + kalibreringspaneler er PÅ som før i den scenen du
   står i (inne: kunde/speil/tavle; disk: trau; bykart/bydel: rute-tracer). ⚙ →
   **Kalibrering: PÅ → AV** skjuler dem for en ren scene, og PÅ igjen henter dem
   tilbake. (Ingenting er flyttet — bare synligheten styres herfra.)
3. **Scenarier:** gå inn i butikken (**inne**) → 🎭 scenariovelgeren ligger øverst
   til venstre (PÅ som før). Start hvilket som helst scenario. ⚙ → **Scenariovelger:
   AV** skjuler den.
4. **Nivå / Espen spør / Innboks / Tema:** alle de gamle løse knappene ligger nå i
   ⚙-skuffen under riktig overskrift. «🎓 Still neste spørsmål nå» → Espen peker med
   N-badge; «⏩ Send test-e-post av hver type» fyller 📬 Innboks; «🔥 Utløs
   brannalarm» krever aktivt beredskap-tema + åpen dag + bekreftet plan (ellers grå
   med forklaring).
5. **Stamkunder — engangs + utvikling:** åpne en dag (butikk → inne). Møt en kunde
   (f.eks. `den-usikre`) og løs scenariet med et GODT utfall. Kunden er nå
   returnerende (**Ny stamkunde**). Neste dag(er) kommer HEN tilbake som et kort
   **stamkundemøte** (👋 STAMKUNDE KOMMER INNOM) — IKKE det samme scenariet på nytt.
   For rask testing: ⚙ → Stamkunder → **👥 Spawn stamkundemøte nå** (krever åpen dag
   + en returnerende kunde).
   - **Trinn 1:** gjenkjennelse, refererer forrige møte. Handler «det vanlige» med
     💚 kjøpsbonus ×1,2.
   - **Trinn 2:** personen har utviklet seg (tryggere / vet hva hun vil ha).
   - **Trinn 3:** kunden **tar med en venn/kollega → +1 kjøp** (to varer).
   - **Misfornøyd sist:** kunden kommer kjøligere tilbake (én kortvariant) — et godt
     møte løfter henne igjen.
6. **Målgruppe-fanen** (💻 Dashbord → Målgruppe → «Stamkunder — kjente fjes»):
   hver kjent kunde vises med navn + **tekstlabel-status** som stiger med
   utviklingen: «Ny stamkunde» → «Trygg stamkunde» → «Anbefaler deg» (og
   «Misfornøyd sist» / «Kjenner deg»). Alltid tekst, aldri kun farge.
7. **Verifiser at scenariet IKKE gjentas:** når du har spilt en kundes scenario én
   gang, skal du aldri se det SAMME scenariet igjen organisk — kun stamkundemøter
   med den personen. (Nye, uspilte kunder kommer fortsatt som fulle scenarier.)

---

## FAGFILTER — lærerstyrt fag- og «Espen spør»-styring + stamkunde parkert (fikserunde 3, 2026-07-21)

Gren: `spor-a/kroker-espen-spor-stamkunder`. Fire deler + ⚙-tillegg, commit per
del, `tsc -b` rent før hver. Bokmål. Statusforskjeller alltid tekstlabel, aldri
kun farge. Espens styrende beslutninger: stamkunde-mekanikken PARKERES; elever
ser IKKE fag læreren ikke har aktivert; «Espen spør» er av som standard og
lærerstyrt per fag.

### DEL 0 — Stamkunde bak av-flagg + scenariotrekking reversert
- **Hvor flagget bor:** `src/game/data/featureFlags.ts` → `STAMKUNDER_AKTIV = false`
  (egen fil, ikke balance.ts — feature-flagg er av/på-arkitektur, ikke tunbare
  balansetall). Dokumentert der.
- Flagg av ⇒ ingen stamkundemøter (OPEN_DAY gir ingen stamkunde-pool), Målgruppe-
  fanens «Stamkunder — kjente fjes» skjult, mentor-triggeren `stamkunde_forste`
  fyrer ikke, ⚙-panelets stamkunde-knapper deaktivert med «Parkert — kommer som
  stamkort-tiltak». KODEN BEHOLDES i sin helhet (gjenbrukes til stamkort-tiltaket).
- **Trekkeregel** (engangs-invarianten fjernet): USPILTE scenarioer foretrekkes
  alltid; når hele poolen er spilt, nullstilles trekkgrunnlaget. `antallMoter`
  skrives fortsatt (historikk bak ✓-scenariovelger). Midlertidig til scenario-
  variant-jobben.

### DEL 1 — Fagaktivering (lærerens programfag-brytere)
- `src/game/data/fag.ts`: `FagKode` ('fd'|'m'|'ks'), `FagAktivering`, `FAG_META`
  (fulle navn + FD/M/KS-kort), `FAG_DEFAULT` (alt på = fritt spill), `normaliserFag`.
- RTDB `klasser/{kode}/fagAktivering = { fd, m, ks }` (søster til temaAktivering)
  + localStorage-fallback + dev-overstyring per fag (vinner lokalt). `useFagAktive()`.
- **temaer.ts:** hvert tema navngir sitt fag; `aktiveTemaer` er nå fag-gated —
  et tema hvis fag er av forsvinner overalt spillet leser aktiveTemaer.
- Lærerens Spillet-fane: «Fag»-seksjon ØVERST (tre brytere med fulle navn); temaer
  hvis fag er av gråes ut med «Faget er slått av».

### DEL 2 — Fane- og innholdsfilter
- **Fanemapping implementert** (`visFag` — fane vises hvis MINST ETT fag er aktivt;
  `fag`-stripe/badge uendret):

  | Fane | Synlig når | Stripe |
  |---|---|---|
  | Oversikt · Rapporter · Innboks | ALLTID (kjerne) | FD / V / V |
  | Forretningsplan · Økonomi | FD | FD |
  | Produkter · Priser | FD **eller** M | M / FD |
  | Målgruppe · Lokasjon · Markedsføring · Distribusjon · Utstilling | M | M |
  | Personale | KS **eller** FD | KS |
  | HMS | tema (beredskap) aktivt — og beredskap krever FD | HMS |

- Skjulte faner er HELT borte (ingen gråtonet rest). Åpning/direktenavigasjon til
  en skjult fane → Oversikt. Fagbytte MIDT i økt på fanen man står på → rolig
  retur til Oversikt med melding «Læreren har endret fagoppsettet».
- **Innboks:** kundebestilling (7a) kjerne (alltid); leverandørtilbud (7b) kun når
  FD aktiv; markedsføringstilbud (7d) kun når M aktiv. Mottatte e-poster forblir
  lesbare. `fagAktiv` speiles inn i reducer-state (SET_FAG_AKTIV) for e-postgen.
- **Mentor:** skjulte faner kan ikke navigeres til ⇒ fane-triggerne deres armeres
  aldri (re-arm-mekanismen uendret).

### DEL 3 — «Espen spør» lærerstyrt + fagtagging
- **Fagtagging** (`fagForSporsmal`): kalkyle/drift → fd, markedsmiks/malgruppe → m,
  forbrukerlov → ks (kundemøte/servicerettigheter) — UNNTATT markedsføringsloven
  (betalt omtale) som er m. Vurdert per spørsmål.
- RTDB `klasser/{kode}/espenSpor = { aktiv (default FALSE), fag: {fd,m,ks} }` +
  fallback (også av) + dev-overstyring. `finnKandidater` får `aktiveFag`-filter.
- **Pool = aktiv PÅ ∧ spørsmålets fag valgt av lærer ∧ (temaId: temaet aktivt) ∧
  nivåfilter.** Auto-spørsmål (mentor) fyrer kun når læreren har skrudd på;
  fagpool = valgt av lærer ∩ globalt aktivt fag.
- Lærerens Spillet-fane: «Espen spør»-seksjon under Fag — hovedbryter + tre
  fag-avkrysninger (kun aktive fag valgbare, andre grået «(av)»).

### ⚙ DEV — full lokal overstyring av ALT lærerstyrt
Slik at Espen kan validere hele filteret alene uten lærerpanel/klassekode.
Presedens **DEV > lærer/RTDB > default**; overstyringer persisteres lokalt,
ALDRI til RTDB.
- «Fag»-gruppe: tre toggles (FD/M/KS) med «Nå: DEV / lærer/standard»-labels.
- «Espen spør»-gruppe: hovedbryter (av/på) + tre fag-toggles (kun aktive fag) +
  «🎓 Still neste spørsmål nå» — alle med kilde-labels; still-knappen overstyrer
  av/på lokalt men respekterer fagvalget.
- «↺ Nullstill DEV-overstyringer» — fjerner alle lokale overstyringer (fag, nivå,
  «Espen spør») → tilbake til lærer/RTDB/standard.
- DEV-fagbytte utløser NØYAKTIG samme oppførsel som lærerbytte (fane-skjuling,
  redirect fra åpen skjult fane, innboks- og mentor-filter).

### Spilltest (28/28 PASS)
- **24 (D):** STAMKUNDER_AKTIV=false → 0 stamkundemøter; uspilt foretrekkes; pool
  nullstilt når alt er spilt.
- **26 (A+E):** M av → 5 M-faner + mkf-tilbud (7d) borte, Produkter/Priser/kjerne
  igjen, ingen mkf over 6 dager; ↺ Nullstill → M-faner tilbake.
- **27 (B):** fagbytte i åpen Målgruppe-fane → melding + tilbake på Oversikt, 0 feil.
- **28 (C):** Espen spør av default → 0 auto-spørsmål over 4 dager; fagfilter:
  aktiveFag=[fd] gir kun fd-tagg, [m] kun m-tagg (finnKandidater-fasit).

### Åpne flagg / valg gjort her
- **STAMKUNDER_AKTIV** ligger i `featureFlags.ts` (produkt-flagg, ikke lærerstyrt).
  Sett `true` igjen når stamkort-tiltaket bygges.
- **Fag-mapping av temaer** følger docs/TEMAER_OG_KOMPETANSEMAL.md (FAG A/B → fd,
  FAG C → m, FAG D → ks). HMS hører under FD (Tema 1 krever FD aktiv).
- **Lokasjon-fanen** (ikke nevnt i oppdraget) er kartlagt som M (den er en
  markedsføring/Plass-fane) — skjules når M er av.
- **DEV-overstyringene** speiles til reducer-state kun for fag (innboksgen);
  «Espen spør» og fane-filter leser context direkte. Test-broen eksponerer
  `__SET_FAG_DEV__`/`__NULLSTILL_DEV__`/`__SET_ESPEN_DEV_*__` (kun i DEV-bygg).

### Chrome-sjekkliste (Espen validerer)
**A) ⚙ DEV-panelet** (`http://localhost:5173/game?dev=1&skip=1`) — full lokal
overstyring, ingen klassekode nødvendig. Klikk **⚙ DEV** nede til venstre:

1. **Fag (overstyrer lærer):** tre toggles FD/M/KS, alle **PÅ** som standard
   («Nå: lærer/standard»). Slå **M av** → toggle viser AV + «Nå: DEV». Åpne
   💻 Dashbord: **Målgruppe, Lokasjon, Markedsføring, Distribusjon, Utstilling**
   er BORTE; **Produkter/Priser** (FD-delt) + Oversikt/Økonomi/Rapporter/Innboks
   står igjen. Slå **FD av** også → Produkter/Priser forsvinner også, og HMS-fanen
   (hvis beredskap er aktivt) forsvinner. Slå **KS av** → Personale forsvinner
   (med mindre FD er på).
2. **Redirect:** slå alle fag på igjen (eller ↺ Nullstill). Åpne Dashbord, stå på
   **Målgruppe**, og slå **M av** i ⚙ mens du står der → rolig melding «Læreren
   har endret fagoppsettet — du er tilbake på Oversikt» og du havner på Oversikt.
3. **Innboks:** med **M av**, spol noen dager (⚙ har ikke egen dagknapp — bruk
   dagssyklusen) → ingen «markedsføringstilbud» (7d) i 📬 Innboks. Med **FD av**
   forsvinner «leverandørtilbud» (7b). «Kundebestilling» (7a) kommer alltid.
4. **Espen spør (overstyrer lærer):** hovedbryter **AV** som standard
   («Nå: lærer/standard»). Slå **på** → «Nå: DEV». Slå av **M** og **KS** under
   (kun **FD** igjen). Klikk **🎓 Still neste spørsmål nå** → Espen peker med
   N-badge; klikk figuren → spørsmålet er et Forretningsdrift-spørsmål (kalkyle/
   drift). Fag som er globalt av vises som «Faget X er slått av» og kan ikke velges.
5. **↺ Nullstill DEV-overstyringer** → alt tilbake til lærer/standard (alle fag på,
   Espen spør av, nivå tilbakestilt).
6. **Stamkunder (parkert):** ⚙ → Stamkunder → begge knappene er grå med «Parkert —
   kommer som stamkort-tiltak». Målgruppe-fanen har INGEN «Stamkunder — kjente
   fjes»-seksjon.

**B) Lærerpanelet** (TeacherDashboard → «Spillet»-fanen, krever valgt klasse):
7. **Fag-seksjonen** ØVERST: tre brytere (Forretningsdrift / Markedsføring og
   innovasjon / Kultur og samhandling), alle på som standard. Slå ett av → temaene
   som hører til gråes ut med «Faget er slått av», og elever i klassen mister de
   tilhørende fanene live.
8. **Espen spør-seksjonen** (under Fag): hovedbryter av som standard. Slå på → tre
   fag-avkrysninger dukker opp (kun fag som er på over kan velges; andre grået
   «(av)»). Velg f.eks. bare FD → elevene får kun Forretningsdrift-spørsmål.
9. Sett begge (fag + Espen spør) i BEGGE stillinger og bekreft at en elev-klient
   med samme klassekode ser effekten live (faner av/på, spørsmål av/på).

Push. IKKE merge (venter på Espens Chrome-validering).

---

## TILLEGG — Turistsesong parkert + datavakt på dynamiske triggere (fikserunde 3+, 2026-07-21)

### 1. Turistsesong parkert (TURISTSESONG_AKTIV)
- **Hvor flagget bor:** `src/game/data/featureFlags.ts` → `TURISTSESONG_AKTIV = false`
  (samme mønster som `STAMKUNDER_AKTIV`). Tema 15 venter på ferdig innhold. Koden
  beholdes (turistsesong-state, turist-scenarier, turistkontor/byhotell-scener,
  pakkebygger) — kun gated:
  - `START_TURISTSESONG` er no-op når av; auto-starten ved reiseliv-tema-
    aktivering (GameContext-effekten) gates også → ingen sesong kan starte.
  - ⚙-panelet: «Start turistsesong nå» / «Spol til sesongslutt» deaktivert med
    «Parkert — venter på Tema 15-innhold».
  - Mentor: de sesong-relaterte triggerne armes ikke — `turistsesong_slutt`,
    `hotellavtale_svart`, `pakke_bygget`, og `tema_reiseliv_aktivert` (som lover
    turister i strømmen).

### 2. Datavakt på dynamiske mentor-triggere (ny global regel)
Regel: en DYNAMISK trigger som leser elevens egne tall skal ALDRI fyre på tomt
grunnlag (0 kunder, tom liste, manglende node). Gikk gjennom ALLE dynamiske
triggere i `Mentor.tsx` (`oppfylt()` + prisings-effekten) og dokumenterte
minstedata-vilkåret i en kommentar per trigger. `dynamiskMentorMelding` returnerer
i tillegg `undefined` ved manglende grunnlag (belte + bukseseler), men vakta i
`oppfylt()` hindrer at triggeren i det hele tatt merkes «fyrt».

Innstramminger der vakten manglet/var for svak:
- **`turistsesong_slutt`** (referansecaset): krever minst **1 tilreisende kunde**
  (`turistKunder ≥ 1`) — ikke bare at sesongen har hatt bakgrunnskunder. (I praksis
  også parkert av TURISTSESONG_AKTIV nå.)
- **`beredskap_risiko_levert`**: krever nå at skjemaet er lagret OG minst **ETT
  tiltak** er fylt inn. (Fare-kolonnen er forhåndsutfylt, så den duger ikke som
  «har jobbet med skjemaet»-signal.)

Øvrige dynamiske triggere hadde allerede tilstrekkelig vakt (`> 0` / present /
ikke-tom liste), nå eksplisitt dokumentert: `forste_epost_frist`, `stamkunde_forste`,
`forste_svinn/tomt_trau/ko`, `beredskap_brannalarm_handtert`,
`beredskap_ovelse_etter_feil`, `budsjett_avvik_storst`,
`nokkeltall_dekningsgrad_avvik`, `kampanje_effekt`, `kampanje_forpris_brudd`,
`hotellavtale_svart`, `pakke_bygget`, samt prisings-triggerne (`mangler_pris_*`,
`overpris|<vare>`).

### 3. Spilltest (30/30 PASS)
- **29:** TURISTSESONG_AKTIV=false → `START_TURISTSESONG` no-op (turistsesong=null),
  sesong-trigger armes ikke (via den eksponerte, rene trigger-vakta), ⚙-knappen
  «Start turistsesong nå» grå med «Parkert»-forklaring.
- **30:** datavakt — `beredskap_risiko_levert` fyrer IKKE på tomt/ulagret grunnlag,
  men fyrer med ≥ 1 utfylt tiltak (ren `oppfylt`-fasit, kjørt i nettleseren via
  `window.__OPPFYLT__` under DEV).

### Chrome-sjekkliste — TILLEGG
Etter ⚙- og lærerpanel-flyten (over):
- **Turistsesong:** ⚙ → Tema → «Start turistsesong nå» og «Spol til sesongslutt»
  er GRÅ med «Parkert — venter på Tema 15-innhold». Aktiver reiseliv-temaet i
  lærerpanelet → INGEN turistsesong starter, og mentoren sier ingenting om turister.
- **Datavakt:** en dynamisk mentor-melding skal aldri dukke opp på tomt grunnlag —
  f.eks. lagre en tom risikovurdering (uten tiltak) i HMS-fanen → mentoren
  kommenterer den IKKE; fyll inn minst ett tiltak og lagre → da kommer refleksjonen.

---

## KORREKSJON av fagmapping (Espens hub-gjennomgang, SSR VG1) — 2026-07-21

Justering av fane-/fag-koblingen fra DEL 2/DEL 3 etter Espens gjennomgang av
hub-fagstrukturen. Commit på samme gren, ikke merge.

### Endringer
1. **Personale → REN FD** (var FD+M via `visFag: ['ks','fd']` → nå `['fd']`, og
   badge/stripe `kultur` → `forretningsdrift`). Begrunnelse: hub-modulen
   «Ansvarsfordeling, roller og organisasjonskart» ligger under Forretningsdrift.
   Personale forsvinner når **FD** er av (uavhengig av KS), står når FD er på.
2. **Forretningsplan → FD+M** (var ren FD → `visFag: ['fd','m']`). «Forretningsidé»
   er M-modul i VG1-strukturen, finansiering/lån er FD → synlig hvis **minst ett**
   av FD/M er aktivt. (Badge/stripe forblir FD som primærfag, som Priser/Produkter.)
3. **KS styrer ikke lenger noen fane** (ingen tab har `visFag`/badge = KS). KS-
   bryteren styrer fortsatt: «Espen spør»-spørsmål med fag `ks`, og fag-gating av
   KS-temaer (`temaer.ts`, f.eks. reiseliv). Hjelpetekst lagt til under KS-bryteren
   i BÅDE lærerpanelet og ⚙ DEV-panelet: «Kultur og samhandling ligger i
   kundemøtene, som alltid er på. Denne bryteren styrer KS-spørsmål fra Espen og
   KS-temaer.»
4. **espenSporsmal.ts fag-gjennomgang:** ingen organisasjons-/rolle-/bemannings-
   spørsmål finnes (de skal bli `fd` om de kommer). `ks` er nå eksplisitt forbeholdt
   kommunikasjon/kundebehandling/klage/vertskap/etikk — forbrukerlov (angrerett/
   reklamasjon/forbrukerkjøp = kundebehandling/klage) forblir `ks`; markedsførings-
   loven (betalt omtale) forblir overstyrt til `m`. Ingen kodeendring i taggene,
   kun skjerpet dokumentasjon av prinsippet.

### Oppdatert fanemapping (fane vises hvis minst ETT `visFag` er aktivt)
| Fane | Synlig når | Badge |
|---|---|---|
| Oversikt · Rapporter · Innboks | ALLTID (kjerne) | FD / V / V |
| **Forretningsplan** | **FD eller M** | FD |
| Økonomi | FD | FD |
| Produkter · Priser | FD eller M | M / FD |
| Målgruppe · Lokasjon · Markedsføring · Distribusjon · Utstilling | M | M |
| **Personale** | **FD** | **FD** |
| HMS | tema (beredskap) aktivt — krever FD | HMS |

**KS** styrer nå INGEN fane — kun `ks`-spørsmål (Espen spør) + KS-temaer.

### Spilltest (31/31 PASS)
- **26 (oppdatert):** M av → Personale (ren FD) og Forretningsplan (FD+M) STÅR
  fordi FD er på (lagt til i «synlig»-lista); rene M-faner + mkf-tilbud fortsatt borte.
- **31 (nytt):** FD av → Personale + Økonomi skjult, Forretningsplan + Målgruppe står
  (M på); M av → Personale + Forretningsplan står (FD på); KS av (dashbord åpent) →
  **0 faner endres**, men `ks`-spørsmål stilles ikke (finnKandidater-fasit), og KS på
  → `ks`-spørsmål finnes igjen.

### Status på de to utestående (som bedt om)
- **Flyttejobben (dev-salgssituasjoner → ⚙): FERDIG** (commit `ea6f46c`). Den løse
  DEV-blokka «Test salgssituasjon-motoren» lå ugated i Oversikt-fanen (synlig for
  elever) — flyttet til ⚙ DEV-panelets «Scenarier»-gruppe (nedtrekksliste + «🛎️
  Åpne salgssituasjon»), kun `?dev=1`.
- **Lokasjon FD+M-remapping: IKKE gjort** (ikke med i punkt 1–5 her). Lokasjon er
  fortsatt **ren M** (`visFag: ['m']`) — den forsvinner når M er av. Hvis den skal
  bli FD+M (synlig også når kun FD er på), si fra, så er det en énlinjes endring
  (+ assertions). Avventer din beslutning.

### Chrome-sjekkliste — KORREKSJON
- ⚙ (eller lærerpanel) → slå **FD av** (M på): **Personale** og **Økonomi** forsvinner,
  men **Forretningsplan** og **Målgruppe** står.
- Slå **M av** (FD på): Personale og Forretningsplan står; rene M-faner (Målgruppe,
  Lokasjon, Markedsføring, Distribusjon, Utstilling) forsvinner.
- Slå **KS av** (FD/M på): **ingen faner** endrer seg. «Aktive fag»-merket i
  dashbord-headeren mister KS-brikka. Espen spør stiller ikke lenger KS-spørsmål
  (kundebehandling/klage), men KS-temaer (reiseliv) og kundemøtene er upåvirket.
- KS-bryteren i lærerpanelet/⚙ viser hjelpeteksten om at KS ligger i kundemøtene.

---

## Lokasjon-fanen remappet til FD+M (delt) — 2026-07-21

Oppfølging av statuspunktet i forrige avsnitt (Lokasjon var ren M).

- **Lokasjon: M → FD+M** (`visFag: ['m'] → ['fd','m']`, badge/stripe forblir M
  primær). Begrunnelse: fanen inneholder husleie + oppgraderingsinvestering (FD) i
  tillegg til Plass-P (M) → samme delte mønster som Priser/Produkter/Forretningsplan.
  Synlig hvis minst ETT av FD/M er aktivt; forsvinner FØRST når begge er av.

### Oppdatert fanemapping (erstatter tabellen over for Lokasjon)
| Fane | Synlig når | Badge |
|---|---|---|
| Produkter · Priser · **Lokasjon** · Forretningsplan | FD **eller** M | M / FD / M / FD |
| Målgruppe · Markedsføring · Distribusjon · Utstilling | M | M |
| Økonomi · Personale | FD | FD / FD |
| Oversikt · Rapporter · Innboks | ALLTID (kjerne) | FD / V / V |
| HMS | tema (beredskap) aktivt — krever FD | HMS |

### Spilltest (31/31 PASS)
- **26 (oppdatert):** M av (FD på) → Lokasjon flyttet til «synlig»-lista (står nå).
- **31 (utvidet):** M av (FD på) → Lokasjon STÅR; FD av OGSÅ (begge av) → Lokasjon
  (og de andre FD+M-delte: Forretningsplan/Produkter/Priser) forsvinner.

### Chrome-sjekkliste — Lokasjon
- Slå **M av** (FD på): Lokasjon STÅR (sammen med Produkter/Priser/Forretningsplan).
- Slå **FD av OGSÅ** (begge av): Lokasjon (og de andre FD+M-delte) forsvinner.

---

## Bakgrunnssalg selger kun utstilte varer + ærligere dagspuls — 2026-07-21

Vareeksponering er kjernelære: en vare som ikke er stilt ut kan ikke selge seg selv.

1. **`simulerBakgrunnsbolk` — trekkpool = KUN utstilte varer.** Ny parameter
   `utstilteIds` (vare-id-er i `counterLayout` ELLER `windowDisplayLayout` med
   `fixtureId 'vindu'`). Poolen filtreres til disse. Konsekvens:
   - Ikke-utstilt vare → verken salg eller tap (finnes ikke for forbipasserende).
   - Utstilt + upriset → «mangler pris»-tap (som før).
   - Utstilt + priset + tomt lager → «tomt lager»-tap (som før).
   - INGENTING utstilt → 0 salg, 0 tap; kundene teller fortsatt som besøkende (og
     hintet «still ut i disken» gjør jobben). TICK (GameContext) bygger `utstilteIds`
     fra `counterLayout` + vindus-utstilling og sender den inn. Doc-kommentar oppdatert.
2. **DagspulsOverlay «Tapte salg»-kort = SUM av alle tre tapstyper** som hovedtall,
   med fordeling som undertekst: «X tomt lager · Y uten pris · Z for dyr» (kun de
   som er > 0; «ingen» når alt er 0). Tidligere viste kortet bare «tomt lager».
   Dagsoppgjøret (DayResultOverlay) har allerede alle tre tapslinjene (tomt lager /
   mangler pris / for høy pris) — ingen endring nødvendig der.
3. **Språk:** «1 møter» → riktig bøying — «Kunder i dag»-underteksten viser nå
   «1 møte · N øvrige» (og «N møter · …» for N ≠ 1).

### Spilltest (32/32 PASS)
- **32 (nytt):** (A) tom disk → 0 omsetning og 0 tap over mange tikk, men kundene
  teller som besøkende; (B) kun coffee utstilt → coffee selger, mens croissant
  (priset + lager, men IKKE utstilt) verken selges eller tapes; (C) utstilt upriset
  croissant + utstilt coffee 2× → «mangler pris»- og «for dyr»-tap, og daypuls-
  kortet «Tapte salg» viser fordelingen «uten pris» + «for dyr» (summerer alle tre,
  ikke bare tomt lager). Eksisterende bakgrunnssalg-steg (4/5/14/20) uendret — de
  stiller alltid varene ut i disken før de asserter salg.

### Chrome-sjekkliste — vareeksponering
- Ha en priset vare med lager, men la disken (og vinduet) være TOM → åpne dagen:
  ingen bakgrunnssalg, ingen tap, men «Kunder i dag» øker. «Tapte salg»-kortet står
  på 0 «ingen».
- Still varen ut i disken → bakgrunnssalget begynner å tikke inn.
- Sett én utstilt vare uten pris og én til langt over markedspris → «Tapte salg»-
  kortet viser SUM med undertekst «… uten pris · … for dyr»; dagsoppgjøret lister
  de samme tre tapstypene.
- Sjekk teksten: ett kundemøte skrives «1 møte», ikke «1 møter».

---

## Dagspuls-ticker som rullerende logg + leverings-toast i kø-disiplin — 2026-07-21

### 1. «Siste salg» som rullerende logg
- **Nytt felt `dayStats.sisteSalgLogg: TickerLinje[]`.** Reduceren (TICK) APPENDER
  bolkens ticker-linjer (nyeste øverst) og beholder de siste **10**. Et tick UTEN
  salg (tom bolk-ticker) lar loggen stå HELT urørt (samme referanse → ingen
  re-render). Nullstilles ved OPEN_DAY (del av `EMPTY_DAY_STATS`).
- Det gamle `state.dayTicker` er FJERNET (loggen bor nå i dayStats). DagspulsOverlay
  leser `dayStats.sisteSalgLogg`, ikke siste bolk. Faste React-keys (ikke lenger
  `dayMinute` i key-en) → panelet re-animeres ikke hvert tick (roten til «hoppet»).
- **Layoutstabilitet:** «Siste salg»- og «Lager på disken»-panelene har fast
  min-høyde (230 px, plass til ~8 rader) så rader som kommer/går aldri flytter
  resten av skjermen. Tom logg viser tekstlinjen «Ingen salg ennå» i samme høyde.

### 2. Leverings-toast inn i kø-disiplinen
**Valg (dokumentert):** beholdt den eksisterende «Ferske varer klare»-toasten i
interiørscenen og la den inn i kø-disiplinen (gjenbruker toasten,
`CLEAR_DELIVERY`-action og glid-animasjonen) — framfor å gjøre den til en
mentor-melding, fordi mentor-meldinger ikke lukkes automatisk (kravet om auto-lukk
ville krevd egen mekanikk uansett).
- **Kø-prinsipp:** toasten rendres ALDRI mens et kundemøte er aktivt
  (`leveringSynlig = lastDelivery && !activeMeetingScenarioId`). Den venter til
  møtet er ferdig og dukker opp igjen (samme prinsipp som mentor-meldingene).
  (Andre overlays ligger uansett over toasten i z-orden.)
- **Auto-lukk + klikk:** lukkes automatisk etter `gamefeel.leveranseToastMs` (9 s)
  ETTER at den faktisk vises (timeren teller ikke mens den er køet bak et møte),
  og fortsatt med ✕-knapp.
- **Lang vareliste:** maks 3 varelinjer + «… og N flere»; fast maksbredde
  (`min(520px, 100vw−2rem)`), ordbryting (`overflowWrap`, `line-height 1.4`) → ingen
  tekst-overlapp.

### 3. Spilltest (33/33 GRØNT)
- **Steg 33 (nytt):** (A) selg til `sisteSalgLogg` når taket 10; fjern alt fra disken
  og tikk 40 ganger → loggen er UENDRET (ikke tømt) og holder taket 10. (B) i
  interiørscenen med en morgenleveranse: toasten er i DOM når ingen møte, FORSVINNER
  når et kundemøte spawnes (DEV_SPAWN_MOTE), og kommer TILBAKE når møtet lukkes.
  MERK: selve layout-roen er visuell — Espen dømmer den i Chrome; testen sjekker
  DOM-tilstedeværelse og loggens oppførsel. (Fallgruve funnet under bygging:
  `window.__GAME_STATE__` ligger ett render-steg bak reduceren — testen tar derfor
  snapshot av loggen ETTER at disken er tømt og noen tomme ticks har fått den til å
  konvergere, ikke før.)

### Chrome-sjekkliste — dagspuls
- Åpne en dag med utstilte varer: «Siste salg» fyller seg oppover, panelet holder
  fast høyde, og et tick uten salg får INGENTING til å hoppe/blinke.
- Med tom disk står «Siste salg» på «Ingen salg ennå» i full høyde.
- Morgenleveranse: «Ferske varer klare»-toasten vises ved dagstart; når et
  kundemøte kommer, forsvinner toasten og kommer tilbake etter møtet. Lang
  bestilling vises som «… og N flere». Toasten lukker seg selv etter noen sekunder,
  og med ✕.

---

## Kø-oppstart + salgsliste-animasjon + scenario-tidsvindu + etikett — 2026-07-21

### 1. Kø-ventetoleranse (FIFO-buffer)
- **(a) Nullstilling ved OPEN_DAY** verifisert: OPEN_DAY setter `dayStats` til
  `EMPTY_DAY_STATS` (`koKunder: 0`) OG en fersk `dayBackground` (`kø: []`).
  Banneret leser kun disse → kan aldri vise gårsdagens tall. (Spilltest steg 34
  kjører en dag som gir «gikk», åpner neste dag og bekrefter 0.)
- **(b) Ventetoleranse:** ny `BALANCE.koVentMinutter` (20). Kunder som ikke
  betjenes i sitt tick GÅR IKKE med en gang — de legges i en FIFO-buffer
  (`dayBackground.kø`, eldste først). Hvert tick betjenes det fra FRONTEN opptil
  kapasiteten (en som ventet fra et tidligere tick betjenes altså når kapasitet
  frigjøres). Først når en ventende har stått lenger enn toleransen telles hen
  som «gikk» (`koKunder`). Ved stenging teller gjenværende ventende som gåtte
  (de fikk aldri hjelp). `prosessert` teller nå kun NYE ankomne (bufferen eier
  betjening/tap).
- **(c) Banner** (dagspulsen) viser begge tilstander med TEKSTLABEL (aldri kun
  farge): «Kø — N venter» (gul) og «M gikk» (rød) når hhv. noen venter / har
  gått. Vises når `venter > 0 || gikk > 0`.
- **(d) Dagsoppgjørets kø-linje** uendret semantikk: teller kun gåtte
  (`koKunder`, nå inkl. rest-buffer ved stenging — fortsatt «kunder som gikk»).

### 2. «Siste salg» — stabil id per logglinje
- `TickerLinje` fikk en valgfri `id`. Reduceren setter den ved append til
  `sisteSalgLogg` = `${dag}-${minutt}-${løpenr}` (nyMinutt er unik per tick innen
  dagen → ingen kollisjon). DagspulsOverlay bruker `l.id` som React-key.
  → Append legger nye linjer øverst UTEN å endre key på eksisterende linjer;
  kun den nye linjen mountes/animeres inn, resten står i ro (ingen re-mount).
  Maks-høyden fra forrige fiks er beholdt.

### 3. Scenario-tidsvindu
- Nytt valgfritt `tidsvindu?: { fra; til }` (minutter siden 09:00) på
  `SalesScenario`. `planleggMoter` fikk en `tidsvinduer`-parameter: scenarier med
  vindu plasseres på en SEEDET posisjon innenfor `[fra, til]` (jitter beholdt,
  klemt til vindusgrensene); scenarier UTEN vindu spres jevnt som før (identisk
  seed-forbruk når ingen vindu er satt).
- **Vinduer satt (gjennomgang av alle 14 kafé-scenarier):**
  - `Morgenkunden` → **09–11** (0–120): «pendler PÅ VEI TIL JOBB» = morgenrush.
  - `Kryssalget` (Amira) → **11–14** (120–300): «kontoransatt PÅ LUNSJPAUSE» =
    lunsjrush.
  - **Bevisst UTEN vindu** (innholdet binder dem ikke til et klokkeslett):
    Reklamasjonen, Allergikeren, Prutekunden, Den usikre, Storbestillingen
    («møte i MORGEN tidlig» = bestilling nå, ikke tidsbundet), Angreretten,
    Hastverkskunden (tog går hele dagen — morgen/ettermiddag uklart), Gavekjøpet,
    Studentrabatten, Likeverd, Ventetiden («stått lenge i kø» = et hvilket som
    helst travelt øyeblikk), Førstegangskunden. Turist-scenariene bor uansett på
    turistkontor/byhotell, ikke i kafépoolen.

### 4. Etikett «For høy pris» → «Priset over marked»
- Dagsoppgjør: detaljlinjen heter nå «Priset over marked» med formatet
  «[vare] ([din pris] kr · marked ~[markedspris] kr) — N kunder avsto».
  Summeringslinjas parentes «(for høy pris)» → «(priset over marked)».
- Dagspulsens tapte-fordeling: «for dyr» → «over marked».

### 5. Spilltest (36/36 GRØNT)
- **Steg 34:** kø-teller 0 + buffer tom ved OPEN_DAY; en dag med kapasitet 0
  gir «gikk», neste OPEN_DAY nullstiller (ikke gårsdagens tall); kunde som VENTER
  (kø > 0, ingen gått) betjenes når kapasitet frigjøres innen toleransen
  (`bakgrunnKunder` øker, `koKunder` blir 0).
- **Steg 35:** over dagene spawner `morgenkunden`/`kryssalget` alltid INNENFOR
  vinduet sitt (seedet).
- **Steg 36:** salgslogg-append gir ny id øverst mens eksisterende linjers id-er
  står uendret i samme rekkefølge (stabil key → ingen re-mount).
- Eksisterende bakgrunnssalg-steg (4/5/14/20) fortsatt grønne — buffer-endringen
  bevarer dagens totaler (samme kunder betjenes, bare litt forsinket).
- **Test-robusthet (steg 5):** auto-klokke-sjekken fanget `før`-verdien ETTER at
  dashbordet ble lukket — en race, siden første auto-tick straks kunne spawne
  neste (nabo)kundemøte og fryse klokka igjen. Tidsvinduene la morgen-/lunsjkunder
  tettere, som avslørte race-en. Fikset ved å fange `før` MENS klokka er pauset
  (før dashbordet lukkes); ett tikk (+1 min) beviser fortsatt wiringen. Ren
  test-fiks, ikke en spillendring.
- **Del 4-etikett i spilltesten:** steg 32 sjekket dagspulsteksten «for dyr» →
  oppdatert til «over marked».

### Chrome-sjekkliste — kø + dagspuls + oppgjør
- Sett for få på vakt en travel dag: dagspulsen viser «Kø — N venter» (gul) mens
  folk står, og «M gikk» (rød) når noen gir opp. Sett flere på vakt → «venter»
  synker (de ventende betjenes) uten at «gikk» øker.
- Ny dag: køtallene er nullstilt (ingen gårsdagsrester i banneret).
- «Siste salg»: nye salg glir inn øverst mens linjene under står helt i ro (ingen
  blaffing/re-animasjon av eksisterende linjer).
- Morgenkunden dukker opp tidlig på dagen (før ~11), lunsjkunden (Amira) midt på
  dagen (11–14).
- Dagsoppgjør: tap-detaljen heter «Priset over marked» og viser «… — N kunder
  avsto»; dagspulsens tapte-fordeling sier «over marked».

---

## Mentor-liv + fagfiltrert kø + bestillings-UX + lagre-kvitteringer + motordok — 2026-07-22

### DEL 1 — Mentoren får tilbakevendende stemme
- **(a) Ny triggerklasse «daglig»:** dagsoppgjøret velger dagens STØRSTE signal
  (reducer-side, `mentorDaglig.ts`) og legger det i `state.mentorDagligHint`
  (overlever at `lastDayResult` nullstilles). Mentoren fyrer en dag-scopet trigger
  `daglig|<dag>` (maks én per dag via id-en) som vises når oppgjøret lukkes.
  Prioritet (terskler i `BALANCE.mentorDaglig`): kø-tap > 5 (KUN når Personale
  synlig) → samme vare i svinn ≥ 2 dager på rad → priset over marked ≥ 3 avståtte
  → tomt for ≥ 2 varer → ellers anerkjennelse ved plussdag. Datavakt: null (ingen
  melding) når ingenting treffer. Fagordtokens brukt der de finnes.
- **(b) Scene-triggere:** bykart og disk fantes fra før (`forste_bykart`,
  `forste_disk_stell`). La til **`forste_bydel`** (DistrictView) og
  **`forste_dashbord`** (DashboardOverlay) — kort «hva er dette til» ved første
  besøk. Ingen duplisering.
- **(c) Fane-triggere etter fagfilter — VERIFISERT:** en fane hvis fag er AV er
  helt skjult → `mentor:fane` fyrer aldri for den → triggeren forblir armet (aldri
  konsumert) til faget slås på. For SYNLIGE faner fyrer `handleFane` den første
  ikke-fyrte triggeren og re-armer bare hvis den ikke rekker frem (ordbok/blokkert/
  aktiv hendelsesboble). Re-arm-mekanismen kveler altså IKKE synlige faners
  triggere. Ingen kodeendring nødvendig.
- **(d) Prisstrategi-gjentak:** dynamisk dag-scopet trigger `prisstrategi_gjentak|
  <dag>` som re-armes på Priser-besøk når sist oppgjorte dag ga «priset over
  marked»-tap OG prisstrategi-introen alt er sett (over-marked-tap krever en
  oppgjort salgsdag, så introen er per definisjon eldre). Kort påminnelse, maks én
  per dag.
- **(e) Fagord-pose:** et åpent Fagord-kort melder `mentor:fagord` → Espen tar
  lese-posen (v3/pose 03), samme visuelle «forklarer»-kobling som når ordboka er
  åpen. Cleanup melder lukket så posen aldri henger igjen.
- **(f) ⚙ DEV «Nullstill mentor-triggere»:** dispatcher `mentor:reset` →
  mentoren glemmer ALT (engangs/daglige/scene + intro), kun lokalt (localStorage).
  Lar Espen teste mentoropplevelsen som fersk elev.

### DEL 2 — Kø og bemanning i fagfiltrert modus
Når Personale-fanen er skjult (FD av) settes kapasiteten effektivt ubegrenset i
TICK: alle ankomne (og evt. buffer) betjenes med en gang — ingen kø-buffer, ingen
kø-tap, ingen kø-banner. Bemannings-state (employees/playerShift) røres IKKE.
Dagsoppgjørets kø-linje vises kun når `koKunder > 0`, så den utelates automatisk.
Mentorens kø-refleksjon (DEL 1a pkt 1) armes bare når Personale er synlig.

### DEL 3 — Bestillings-UX (Produkter-fanen)
Per vare vises en varig linje «📦 I bestilling: N stk — levering i morgen» når
N > 0 (sum av uleverte ordrer, oppdateres umiddelbart ved klikk). Knappen er
alltid «📦 Bestill» (ikke permanent «✓ Bestilt») — etter klikk en KORT kvittering
«+N lagt til» i ~2 s, så tilbake. Varer med aktiv bestilling får tekstmerket «I
bestilling» i lista (som «Gikk tomt i går»).

### DEL 4 — Lagre-kvitteringer (Priser + Målgruppe)
Delt `LagreBar`: knapp «Lagre priser»/«Lagre målgruppe» (uten ✓), «● Ulagrede
endringer» så snart noe endres, «Lagret ✓» i ~2 s etter lagring, og en VARIG
«Sist lagret kl. HH:MM (spilltid)». Priser har lagre-knapp ØVERST OG NEDERST
(begge speiler samme tilstand). Utkast + «sist lagret» er LØFTET til
DashboardOverlay-parent, så de overlever fanebytte (endringer beholdes i minnet,
indikatoren står ved retur). Auto-lagre ved blur er FJERNET — endringer er utkast
til eleven lagrer (bevisst tydeliggjøring). Merk: å LUKKE dashbordet med ulagrede
endringer forkaster dem (indikatoren varsler); det å forlate FANEN bevarer dem.

### DEL 5 — docs/SPILLETS_MOTORER.md
Ny lærerrettet motordokumentasjon (norsk, ingen kode): 10 seksjoner
(kundestrøm, målgruppe/persona, pris/marked, kapasitet/kø, lager/bestilling/svinn,
rykte/XP, scenariomøter, mentor, fagfilter, dagsoppgjør), hver med «Hva eleven kan
påvirke». Tallene er hentet fra `balance.ts` (verdier oppgitt, ikke variabelnavn).
Appendiks: kildeoversikt. Parkerte mekanikker nevnt i én linje.

### DEL 6 — Spilltest (39/39 GRØNT)
- **Steg 37:** daglig-refleksjon — FD på: kø-tap + svinn 2 dager på rad → **kø
  vinner** (Personale synlig); FD av: **0 kø-tap** (ubegrenset kapasitet) + svinn 2
  dager på rad → **svinn vinner** (kø-signal filtrert); daglig-hint er dag-scopet;
  ⚙-nullstill tømmer det persisterte fyrt-settet.
- **Steg 38:** «I bestilling»-total vises og akkumulerer 10 → 20 ved to klikk;
  knappen forblir «Bestill».
- **Steg 39:** endring → «Ulagrede endringer», «Lagre priser» → «Sist lagret kl.»,
  indikator forsvinner; utkast + indikator bevart ved fanebytte.
- Steg 20 oppdatert til det nye lagre-knapp-mønsteret (auto-lagre ved blur fjernet).

### Chrome-sjekkliste — denne runden
- **Mentor daglig:** kjør en dag med tydelig kø-tap → når oppgjøret lukkes,
  kommenterer Espen kø (og spør om bemanning). Kjør en dag med svinn på samme vare
  to dager → Espen tar opp svinn/bestilling. En rolig plussdag → kort anerkjennelse.
  En dag uten tydelig signal → Espen sier ingenting.
- **Scene-orientering:** åpne en bydel og dashbordet første gang → kort «hva er
  dette» fra Espen.
- **Fagord-pose:** klikk et fagord i en mentormelding/tekst → Espen tar
  lese-posen mens kortet er åpent.
- **⚙ Nullstill mentor-triggere** (krever `?dev=1`): trykk knappen → Espen
  «glemmer» alt og introen kommer igjen.
- **Fagfilter kø:** slå FD av (⚙) → travel dag gir INGEN «kø»-linje/-banner og
  ingen kø-refleksjon. Slå FD på → kø oppfører seg som før.
- **Bestilling:** bestill en vare to ganger → «I bestilling: N» øker med en gang;
  knappen viser «+N lagt til» kort, så «Bestill»; merket «I bestilling» i lista.
- **Lagre:** endre en pris → «Ulagrede endringer» dukker opp; trykk «Lagre priser»
  (øverst eller nederst) → «Lagret ✓» + «Sist lagret kl. …»; bytt fane og tilbake
  → endringen og indikatoren står. Samme for Målgruppe.

---

## Personale FD→FD+M + scene-kontekst + tema-fag-gating + pose-boks — 2026-07-22 (siste før merge)

### DEL 1 — Personale remappet FD → FD+M
Espens fagbeslutning: bemanning av salgs-/serviceflater ligger også i
markedsføringsløpet på yrkesfag. `visFag: ['fd'] → ['fd','m']` (badge-primær
forblir FD). Fanen er nå synlig når MINST ETT av FD/M er på, borte først når begge
er av.

**Konsekvens for kø-regelen (forrige runde):** kø/kapasitet er aktiv når
Personale-fanen er SYNLIG — altså nå også i ren M-modus. Ubegrenset-kapasitet
gjelder kun når BÅDE FD og M er av (`køAktiv = fagAktiv.fd || fagAktiv.m` i TICK).
Mentorens kø-refleksjon følger samme port (`personaleSynlig = fd || m`).

**Oppdatert fagmapping (faner):**

| Fane | visFag | Synlig når |
|------|--------|-----------|
| Personale | FD+M | FD **eller** M på |
| Forretningsplan, Produkter, Priser, Lokasjon | FD+M | FD **eller** M på |
| Økonomi | FD | FD på |
| Målgruppe, Markedsføring, Distribusjon, Utstilling | M | M på |
| KS | — | (KS styrer ingen fane; kun tema/Espen spør) |

### DEL 2 — Scene-orienteringer er kontekstbundne
Scene-triggerne (`forste_bykart/forste_bydel/forste_disk_stell/forste_vindu`) er
merket med scene-id (`SCENE_AV_TRIGGER`). Rute-scenene er gjensidig utelukkende, så
hver scene-mount = ett scene-bytte. Ved bytte forkastes en ULEST scene-melding for
en ANNEN scene stille fra køen OG re-armes (engangs-forsøket brennes ikke — den
kommer igjen neste gang eleven er i riktig scene). Gjelder både kø (N-badge) og en
åpen boble (fjernes fra køen → boblen lukkes). Dashbordet er et OVERLAY (ikke rute):
`forste_dashbord` forkastes/re-armes når dashbordet lukkes ulest (via mentor:fane).
Rute-scenene melder scene også uten trigger (interiør/storefront) så et bytte dit
også rydder forrige scenes melding.

### DEL 3 — Tema-innhold gates av temaets fag (HMS-buggen)
**Rotårsak:** beredskap-triggerne (og de andre tema-triggerne) i mentorens
hovedløkke leste bare `state.beredskap.*` og sjekket verken fag eller
tema-aktivering → de fyrte selv med FD/HMS av. **Fiks:** generell port i løkka —
`TEMA_AV_TRIGGER` mapper tema-trigger → tema-id, og `aktiveTemaer` (som ALT er
fag-gated i GameContext) må ha temaet aktivt før triggeren armes. Reprodusert case:
beredskap aktiv + FD av → INGEN beredskap-/HMS-melding; FD på → tilbake.

**Funn ved gjennomgang av andre lekkasjer:**
- **Espen spør:** allerede korrekt gated — `finnKandidater` filtrerer
  tema-spørsmål på `aktiveTemaIds`, som utledes fra `aktiveTemaer` (fag-gated).
- **Innboks-hendelser:** allerede fag-gated — `genererDagensEposter` legger bare
  til leverandørtilbud når FD er på og mkf-tilbud når M er på; ingen tema-/HMS-
  spesifikke e-poster finnes.
- **`tema_X_aktivert`-triggerne:** fyres via egen effekt som alt sjekker
  `aktiveTemaer[...]` (fag-gated) — ingen lekkasje (og nå dekket av porten også).
- **Parkerte tema (reiseliv):** allerede gated av `TURISTSESONG_AKTIV` i `oppfylt`.

Konklusjon: den eneste reelle lekkasjen var mentorens hovedløkke — nå tettet.

### DEL 4 — Mentor-figurens størrelseshopp ved pose-bytte
Figur-containeren (knappen, `data-testid="mentor-figur"`) har LÅST størrelse
(150×170). Posebildet ligger ABSOLUTT inni og bunn-forankret, så pose-bytte aldri
endrer containerens bounding-box. Alle poser PRELOADES ved mount, så et bytte aldri
venter på bildelast (var den viktigste kilden til «hoppet»). Verifisert:
`getBoundingClientRect` + `getComputedStyle` er identiske på tvers av v5/v3/v2.

### DEL 5 — Spilltest (42/42 GRØNT)
- **Steg 26/31 (oppdatert):** Personale=FD+M — står i ren M (M på, FD av), borte
  først når BEGGE er av.
- **Steg 37 (oppdatert):** kø vinner daglig-refleksjonen når Personale synlig — FD
  på OG ren M; FD+M av → 0 kø-tap + svinn vinner.
- **Steg 40 (nytt):** scenebytte forkaster ulest scene-melding + re-armer triggeren
  (kan fyre igjen ved retur).
- **Steg 41 (nytt):** beredskap aktiv + FD av → ingen tema-trigger; FD på → fyrer.
- **Steg 42 (nytt):** pose-bytte (v5/v3/v2) → figur-containerens bounding-box uendret.

### Chrome-sjekkliste — siste runde
- **Personale i ren M:** slå FD av / M på (⚙) → Personale-fanen står, og en travel
  dag med for få på vakt gir fortsatt «kø»-linje/-tap. Slå BEGGE (FD+M) av →
  Personale borte, ingen kø.
- **Scene-melding:** åpne en bydel (Espen har en orientering bak peker), naviger
  videre uten å lese den → den forsvinner stille; kom tilbake til bydelen → den
  kommer igjen.
- **HMS-bug:** med beredskap-temaet aktivt, slå FD av → Espen sier INGENTING om
  beredskap/HMS; slå FD på → meldingene er tilbake.
- **Pose-bytte:** klikk et fagord (Espen tar lese-posen), lukk det, få en melding
  (nøytral pose) → figuren står bom stille, ingen størrelses-/posisjonshopp.
