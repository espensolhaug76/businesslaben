# Spilltester — automatisert regresjonsløp (rapport)

**Gren:** `verktoy/spilltester` (fra `origin/main`) · **Dato:** 2026-07-13

Bygget et Playwright-basert testløp som spiller byspillet (`/game`) ende til
ende som en elev og verifiserer at kjerneløkka fungerer — for å fange
funksjonsregresjoner FØR Espen bruker Chrome-tid. Nivå 1: funksjonelt, IKKE
visuelt. Bruksdok: `docs/SPILLTESTER.md`. Denne fila er den ærlige logg-rapporten.

> **Navnemerknad:** mandatet ba om å «oppdatere `docs/rapporter/spor-c.md`
> FYLDIG». `spor-c.md` er sportsbutikk-eksperimentets rapport og finnes KUN på
> grenen `eksperiment/autonom-sport` — ikke her (denne grenen har kun
> `spor-a.md`). Antatt template-arv fra en annen jobb; skrev derfor rapporten
> under et dekkende navn i stedet for å klone inn en fremmed spor-c.

---

## 1. Status

| Del | Leveranse | Status |
|---|---|---|
| 1 | Playwright-infra (`@playwright/test@1.61.1`, `npm run spilltest`, config, harness, test-bro) | ✅ |
| 2 | Testløpet «En full måned» (10 steg) | ✅ 9 PASS · 0 FAIL · 1 KJENT FEIL |
| 3 | Robusthet (data-testid, ingen sleep, fasit fra economy, determinisme-seed) | ✅ |
| 4 | `docs/SPILLTESTER.md` | ✅ |
| — | `tsc -b` + `vite build` | ✅ begge grønne |
| — | 2 løp på rad → identisk resultat (determinisme) | ✅ bevist |

Sluttresultat per løp: `docs/rapporter/spilltest-siste.md` (overskrives).

---

## 2. Arkitektur (hva ble bygget)

- **`playwright.config.ts`** — testDir `tests/spilltest`, single worker, 0 retries
  (determinisme-krav), timeout 300 s (ett monolittisk løp), `webServer` starter
  sin EGEN dev-server på 5176 (strictPort, reuseExistingServer) — ALDRI 5173
  (reservert for Espens Chrome-validering).
- **`tests/spilltest/harness.ts`** — `steg()`-runner (fanger feil → PASS/FAIL/
  KJENT FEIL + skjermbilde ved reell FAIL, løpet fortsetter), `lesState`,
  `ventState` (poll, ingen sleep), `dispatch`/`dispatchN` (tidsbro), rapport →
  markdown, `SpillState`-speil (kun feltene testen bruker).
- **`tests/spilltest/full-maaned.spec.ts`** — de 10 stegene.
- **Test-bro i `GameContext.tsx`** — DEV-only effekt som speiler hele state på
  `window.__GAME_STATE__` og dispatch på `window.__GAME_DISPATCH__`. Rent
  lese-/testtillegg, finnes ikke i produksjonsbygg (`import.meta.env.DEV`), endrer
  ingen adferd. Nødvendig fordi full spilltilstand verken er eksponert eller
  (stort sett) persistert.
- **`data-testid`** (rene tillegg): ordre-rader `bestill-<id>`/`qty-<id>`
  (20+ like «Bestill»-knapper var ellers tvetydige), `dashbord`,
  `dashbord-lukk`, `salgsoverlay`, `salgsvalg`.

---

## 3. DOM vs. test-bro (ærlig avgrensning)

Ekte student-klikk (fanger døde knapper/wiring): bestilling, forretningsplan,
lån (`Søk om lån` → `Godta lån`), kundemøte-valg, fane-navigasjon, HMS-synlighet,
hub-lenke-klikk.

Via test-broen (`dispatch`), dokumentert: tidsstyring (`TICK`, `OPEN_DAY`/
`CLOSE_DAY`/`START_NEW_DAY`) og oppsett som ikke er et telt steg (leie av lokale,
tom åpningsbestilling, disk-oppsett). Grunn: spillklokka bruker ~6 min sanntid
per åpen dag; en månedsrull er 12 dager. Å drive dette via sanntid ville gjort
løpet ubrukelig tregt. Kundemøtet i steg 5 ÅPNES via den eksisterende
dev-hendelsen `dev:openSalesScenario`, men SPILLES med ekte valg som dispatcher
ekte `RESOLVE_SALES_SCENARIO` — salgsmotoren testes reelt.

---

## 4. Funn

1. **Steg 10 — Navigasjonsvakt: KJENT FEIL (bekreftet regresjon på `main`).**
   Hub-lenkene «📚 Lær mer» i HMS-fanen (`HmsTab.tsx`) er
   `<button onClick={() => navigate(rute)}>` — react-router-navigasjon i SAMME
   fane. Klikk navigerer HELE spillfanen bort til `/learning/…` og mister
   spilltilstanden. Burde åpne i ny fane (`target=_blank`). Testen fanger det
   (URL forlater `/game`) og markerer det KJENT FEIL — fikses i fiksrunde 2.
   Verifisert konkret: klikk på «📚 Beredskap (Contingency)» → fanen navigerer bort.

2. **Persistens (steg 9): full spilltilstand persisteres IKKE.** Kun
   `state.beredskap` lagres (localStorage `beredskap_state_v1`); resten av state
   lever bare i minnet. `?skip` re-seeder et friskt spill ved reload (kasse
   150 000, måned 1). Testen verifiserer at beredskap FAKTISK overlever, og
   logger begrensningen. Dokumentert arkitektur-begrensning på `main`, ikke en
   regresjon — men verdt å vite (en elev som refresher midt i en økt mister alt
   unntatt beredskapsplanen).

3. **Ingen eksisterende testinfra** — verken Playwright, data-testid eller state-
   eksponering fantes. Alt måtte bygges. Test-broen (state+dispatch på window)
   var forutsetningen for i det hele tatt å kunne assertere på tall.

---

## 5. Determinisme (bevis)

Kjørt to ganger på rad. Alle 10 steg-statuser OG alle verifiserte tall er
byte-identiske mellom løpene; kun per-steg-`ms` (veggklokke) varierer — som
forventet. `Math.random` seedes i harnessen (mulberry32) så salgsscenarioets
`shuffle` av valg-rekkefølge også blir reproduserbart; resten går via spillets
egen `dagSeed`. Single worker + 0 retries hindrer at flaky skjules.

Utvalgte verifiserte tall (identiske begge løp): startkapital 150 000; bestilling
trekk −401 kr, coffee-linje merget 12+5=17 (ingen dup); levering coffee/croissant/
kanelbolle 17/10/8 på lager før åpning; bakgrunnssalg 972 kr / 25 kunder; lån
250 000 @ 9 % (plankvalitet 2); LÅNEAVDRAG avdrag 9 546 / renter 1 875 kr
(== `amortiserLaan`-fasit); faste kostnader 47 000 kr; restgjeld → 240 454 kr.

---

## 6. Kjøring

```bash
npm run spilltest        # starter sin egen dev-server på 5176 (ALDRI 5173)
```

Konsollrapport + `docs/rapporter/spilltest-siste.md`. Exit ≠ 0 ved reell FAIL
(KJENT FEIL teller ikke). **Anbefalt rutine: kjør før hver merge til `main`.**
Erstatter IKKE Espens visuelle Chrome-gjennomgang — fanger funksjonsbrudd før
den, så Chrome-tid brukes på det bare et menneske kan vurdere.

---

## 7. Åpne punkter / neste steg

- Flere testløp (egne spec-er): salgsscenario-varianter (delsalg/utsolgt/
  storbestilling), bemanning/vaktplan-kapasitet, markedsføring→bakgrunnssalg,
  konkurs-sporet (negativ kasse over tid).
- Når fiksrunde 2 lander: steg 10 skal bli grønt (fjern `kjentFeil`-flagget).
- Vurder full spilltilstand-persistens (utenfor denne jobben) — da kan steg 9
  utvides til å verifisere at kasse/lån/dag/lager overlever reload.
