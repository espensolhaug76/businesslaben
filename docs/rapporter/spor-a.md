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
- **Bakgrunnssalg-balanse** (pkt. 10) er kalibrert grovt, ikke spilltestet.
  Alle tall i `balance.ts`; sentrum-l1/l5 er dyrere enn l2 men har lavere
  basetrafikk (l2 er «sweet spot» per oppgaven) — vurder om dyre lokaler bør
  få mer trafikk for å forsvare leia. Eksponering krever manuell trau-plassering
  (`eksponeringReferanse = 4`); en tom disk gir 0,7-faktor.
