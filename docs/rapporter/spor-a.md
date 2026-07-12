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

## Åpne TODO-er / flagg (les før du bygger videre)

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
