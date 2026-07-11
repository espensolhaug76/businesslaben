# KODEKART — hva som finnes, hvor det bor, og hva tematisering krever

> Businesslaben/AdVenture · skrevet 08.07.2026 fra gjennomlesing av main
> (commit-serien t.o.m. spor A pkt. 15). Formål: grunnlag for modularisering
> før temaer bygges. Ledsager til docs/TEMAER_OG_KOMPETANSEMAL.md.

## 0. HOVEDFUNN (les dette først)

1. **Det finnes TO spillgenerasjoner i koden, begge rutet i App.tsx**, med
   hvert sitt state-system. Byspillet (v2, `/game/...`, GameContext-reducer)
   er det aktive; det gamle skjermflyt-spillet (v1, `/start` → `/city` →
   `/dashboard` m.fl., zustand `gameStore`) lever fortsatt i rutene.
2. **Tematiserings-infrastruktur FINNES allerede** — `FeatureGuard` +
   `unlockedFeatures` + `gamePreset ('grunnspill')` i gameStore, styrt fra
   lærerens «Spillet»-fane — **men den peker på v1-skjermene**, ikke byspillet.
   Byspillet har ingen feature-gating i dag.
3. **Læringshuben dekker langt mer enn gap-dokumentet antok**: hub-moduler
   finnes for så godt som alle VG1- og VG2-kompetansemål (fullstendig liste i
   §4), inkl. beredskap, risikovurdering, HMS, budsjett, forretningsplan,
   kampanjer og rekruttering. Gapet er altså IKKE teori — det er at
   spillmekanikk mangler og at hub↔spill ikke er koblet.
4. **Forretningsplan finnes i byspillet** (dashbordfane med BMC/plan,
   plankvalitet 0–5 stjerner som styrer lånerente; markedsundersøkelse gir
   +1 stjerne). Lån er gatet bak plankvalitet ≥ 1.
5. **Et hendelsessystem finnes i byspillet** (`EVENT_POOL` i
   src/game/engine.ts, RESOLVE_GAME_EVENT via innboksen) — naturlig
   festepunkt for tema-hendelser (beredskap, teknologi osv.).

## 1. BYSPILLET (v2 — aktivt) · `/game/...`

**State:** `src/game/GameContext.tsx` (reducer, ~1200 linjer, 46 actions).
**Motor/data:** `src/game/engine.ts` (simulering + EVENT_POOL),
`src/game/data/` (balance, economy, industries, industryDefinition,
backgroundSales, dayConfig, personas, orgRefleksjon), `src/game/sales/`
(scenariomotor + 14 scenarier + typer).

| System | Actions (utvalg) | Filer | Status |
|---|---|---|---|
| By/navigasjon | ENTER/EXIT_INTERIOR | city/CityMapView, DistrictView, StorefrontView, InteriorView, MonterScene | Aktiv (kafé-bilder) |
| Dagssyklus | OPEN_DAY, TICK, CLOSE_DAY, START_NEW_DAY, SKIP_MEETING | GameContext, DagspulsOverlay, DayResultOverlay | Aktiv, validert |
| Kundemøter/salg | RESOLVE_SALES_SCENARIO | sales/engine, sales/scenarios (14), SalesScenarioOverlay | Aktiv; 8 nye kafé uspilltestet |
| Bakgrunnssalg | (i TICK) | data/backgroundSales, balance | Aktiv; balanse grov |
| Bestilling/lager | ORDER_PRODUCT, PLACE_OPENING_ORDER, CLEAR_DELIVERY | GameContext, OpeningOrderOverlay | Aktiv |
| Vareeksponering | SET_COUNTER_LAYOUT, SET_WINDOW_DISPLAY | MonterScene, WindowDisplay, districts.ts (trau/soner) | Aktiv, kalibrert |
| Prising | SET_PRODUCTS, SET_MAIN_PRODUCT, BUY_PRICE_RESEARCH | Priser-fane i DashboardOverlay | Aktiv |
| Målgruppe/4P | SET_TARGET_AUDIENCE, SET_APPEAL, SET_P1..P4_COMPLETE | Målgruppe-fane, HUD (4P-sjekk) | Aktiv |
| Markedsføring | SET_MARKETING, SET_CHANNELS | Markedsføring-fane | Aktiv; effekt i bakgrunnssalg |
| Bemanning/org | CREATE/REMOVE_ORG_ROLE, HIRE/FIRE_EMPLOYEE, SET_EMPLOYEE/PLAYER_SHIFT, ASSIGN_EMPLOYEE_BRANCH | Personale-fane, data/orgRefleksjon, docs/BEMANNING.md | Aktiv; DnD uvalidert i Chrome |
| Økonomi | TAKE_LOAN, månedsrull i START_NEW_DAY, DISMISS_MONTH_SETTLEMENT | Økonomi-fane, data/economy (amortiserLaan), MonthResultOverlay | Aktiv; låneavdrag committet, IKKE pushet (venter Chrome-sjekk) |
| Forretningsplan | SAVE_BUSINESS_PLAN, SAVE_CANVAS | Forretningsplan-fane (BMC), plankvalitet → lånerente | Aktiv — VIKTIG: fantes før tema-planen |
| Markedsundersøkelse | BUY_MARKET_RESEARCH | Økonomi/Målgruppe-flater | Aktiv (kjøp, +1 plankvalitet) |
| Hendelser (PEST) | RESOLVE_GAME_EVENT, ADD/READ_MESSAGE | engine.ts EVENT_POOL, Innboks-fane | Aktiv — festepunkt for temaer |
| Lokasjon | RENT_LOCATION | Lokasjon-fane, panels/RentPanel | Aktiv |
| Oppstart | START_GAME, SET_BUSINESS_MODEL, SET_PHASE, SET_TUTORIAL_STEP | screens/StartupScreen (choose→model→financing→personality→name) | Aktiv; `?skip=1` hopper over |
| Rapporter/årsslutt | APPLY_MONTH_RESULT (dev), YearEndOverlay, SimulationModal | bak ?dev=1 / delvis | Gammel månedsvei skjult; to måneds-mekanikker (kjent flagg) |

**Dashbordfaner (DashboardOverlay):** Oversikt · Forretningsplan · Produkter ·
Utstilling · Målgruppe · Økonomi · Lokasjon · Priser · Markedsføring ·
Personale · Rapporter · Innboks.

## 2. LEGACY-SPILLET (v1 — zustand) · fortsatt rutet

**State:** `src/store/gameStore.ts` (egen takeLoan, unlockedFeatures,
gamePreset, activeLessons). **Skjermer:** /start, /industry, /sustainability,
/target-audience, /business-model, /market-research, /location, /products,
/price-calculation, /budget-planning, /financing, /starting-capital, /city,
/desktop, /dashboard, /pricing, /distribution, /marketing, /personnel,
/monthly-report, /year-end — dvs. hele src/screens/*Screen.tsx-familien +
src/engine + src/strategies.

**Status: sovende men nåbar.** Ingen kobling til byspillet. Merk at
BudgetPlanningScreen og SustainabilityScreen (v1) IKKE er dekning for
budsjett-/bærekraftsmål i byspillet.

**BESLUTNING NØDVENDIG (før tematisering):** v1 bør avpubliseres fra rutene
(behold koden død — vanlig praksis) slik at FeatureGuard/gamePreset kan
gjenbrukes rent mot byspillet, og slik at ingen elev ramler inn i to spill.

## 3. EKSISTERENDE TEMATISERINGS-MEKANIKK

- `src/components/guards/FeatureGuard.tsx`: slipper gjennom hvis
  `gamePreset === 'grunnspill'` eller featureId ∈ `unlockedFeatures`.
- `unlockedFeatures`/`activeLessons` bor i **gameStore (v1)**; lærerens
  «Spillet»-fane aktiverer spillfunksjoner (lokal lagring; klassekoder og
  live-økter går via Firebase RTDB, men feature-aktivering er i dag IKKE en
  Firebase-node per klasse).
- **Konsekvens:** tema-fundamentet fra TEMAER-dokumentet (temaAktivering i
  RTDB) er ikke nybygg fra null — det er å flytte/generalisere denne
  mekanikken: (a) nod per klasse i RTDB, (b) byspillet (GameContext) leser
  den, (c) «Spillet»-fanen skriver til den, (d) FeatureGuard-mønsteret
  gjenbrukes for evt. skjermer.

## 4. LÆRINGSHUBEN — komplett modulinventar

**Rammeverk:** shared/DrawerModule (+ InlinePhase/Interleaved/Quiz/
LearningComplete), teacherModuleRegistry.ts (forhåndsvisning i
lærerdashbordet), presentations/ (per tema).

**VG1 Forretningsdrift (8):** Organisasjon (org-kart) · Priskalkulator ·
Budsjettering · HMS · **Beredskap (Contingency)** · **Risikovurdering** ·
Verdikjeden · Regler og lovverk.

**VG1 Markedsføring og innovasjon (10):** Målgruppe · Prisstrategier ·
Distribusjon · Kommunikasjonskanaler · Salgsprosessen · Markedsføringsloven ·
**Markedsplan** · Administrative rutiner · Bærekraft/forretningsidé ·
Teknologi og KI.

**VG1 Kultur og samhandling (7):** Kommunikasjon · Klagebehandling ·
Kulturforståelse · Etikk · Teamarbeid · **Vertskapsrollen** ·
**Konflikt- og nødsituasjoner**.

**VG2 Økonomi og administrasjon (12):** **Forretningsplan** ·
**Nøkkeltall/lønnsomhet** · Regnskapsanalyse · **Rekrutteringsprosesser** ·
Svinnforebygging · Lønn/personalkostnader · Bærekraft i verdikjeden ·
Arbeidslivets spilleregler · Digitale system/kundeoppfølging ·
Pris og kalkulasjon · Regelverk servicebedrifter · Trender/forretningsmodeller.

**VG2 HMS (8):** **Beredskap** · **Brannvern** · Førstehjelp ·
**Risikoanalyse** · HMS-arbeid og roller · Digital sikkerhet/personvern ·
Etiske dilemmaer · Konflikthåndtering.

**VG2 Kommunikasjon og markedsføring (10):** Markedsundersøkelse ·
**Markedsføringskampanjer** · Markedsføringstrekanten · Merkevare ·
Posisjonering · Profesjonell kommunikasjon · Salgsprosessen VG2 ·
Innovasjon/produktutvikling · Internasjonale markeder · **Reiselivsprodukt**.

**I tillegg:** ML1 · ML2 · ENT1 · ENT2 (egne modulmapper) og
presentations/ (foredrag per tema, inkl. Beredskapsplaner og Brannvern).

**Korreksjon til TEMAER-dokumentet:** §4 («hub-moduler som mangler») er i
hovedsak feil — forretningsplan, rekruttering, relasjonsbygging-nabolaget,
administrative rutiner m.m. FINNES som hub-moduler. Det som gjenstår er
SPILLMEKANIKK per tema + KOBLING hub↔spill (temaet aktiverer både modul og
spillinnhold).

## 5. FELLESINFRASTRUKTUR

- **Firebase RTDB** (lib/firebase): klassekoder, live-økter (LiveSession,
  JoinSession, StudentHub), sanntidssync.
- **Konkurranse:** competition/ (Builder, Live, Leaderboard, Join).
- **Eksamen:** exam/ (Builder, Session, Results).
- **Forum:** forum/ (TeacherForum).
- **Lærerdashbord:** TeacherDashboard (faner: Læringsinnhold/minileksjoner +
  presentasjoner, Spørsmål, Spillet; Mine fag-filter; klassekoder;
  Firebase-lytting).
- **Elevflater:** StudentHub, StudentQuestionsScreen, LearningHub.

## 6. MODULARISERINGSPLAN FOR TEMATISERING (anbefalt rekkefølge)

1. **Avpubliser v1-rutene** (koden beholdes død). Én CC-jobb, liten.
2. **Tema-fundament:** `temaAktivering` per klasse i RTDB; GameContext får
   en `aktiveTemaer`-del av state (lyttes ved øktstart via klassekode, lokal
   fallback); «Spillet»-fanen skrives om til å skrive noden. Gjenbruk
   FeatureGuard-mønsteret der skjermer skal gates.
3. **Tema-definisjonsfil** (`src/game/data/temaer.ts`): temaId, navn,
   nivåer (vg1/vg2), hub-modul-referanser (fra teacherModuleRegistry),
   spill-kroker (hendelses-id-er i EVENT_POOL, dashbordfaner, overlays).
4. **Pilot: Beredskap** — hub-modulene finnes (VG1 Contingency +
   Risikovurdering, VG2 Beredskap + Brannvern + Risikoanalyse); spillsiden
   bygges som: beredskapsplan-dokument i dashbordet, risikoskjema,
   1–2 hendelser i EVENT_POOL gated på temaet.
5. Deretter temaer per TEMAER-dokumentets prioritering (budsjett/nøkkeltall
   → arrangement → …), alltid: hub-modul (finnes) + spill-krok + nivåvalg.

## 7. Vedlikehold

Dette kartet beskriver main per 08.07.2026. Gren jobb/klesbutikk (bransje 2)
er IKKE inkludert — se docs/rapporter/spor-b.md. Oppdater §1/§4 når temaer
bygges; oppdater §2 når v1 avpubliseres.
