# Spilltester — automatisert regresjonsløp (nivå 1: funksjonelt)

Et Playwright-basert testløp som **spiller byspillet (`/game`) som en elev** og
verifiserer at kjerneløkka fungerer ende til ende. Formålet er å fange
**funksjonsregresjoner** — brutte flyter, feil tall, døde knapper, navigasjon
som mister state — FØR Espen bruker Chrome-tid.

> **Dette er IKKE visuell validering.** Estetikk, «ser det bra ut», layout og
> pedagogisk kvalitet er ALLTID Espens (jf. `CLAUDE.md`: headless = diagnostikk,
> aldri erstatning for Espens visuelle godkjenning). Testene asserter kun på
> FUNKSJON, STATE og TALL.

---

## 1. Hvordan kjøre

```bash
npm run spilltest
```

- Starter dev-serveren selv på **5173** (strictPort) hvis den ikke alt kjører
  (`webServer` i `playwright.config.ts`, `reuseExistingServer: true`).
- Kjører deterministisk: **én worker, ingen retries** (en flaky feil skjules
  ikke av et nytt forsøk).
- Rydder `localStorage` før løpet og seeder `Math.random` (så alt som ikke går
  via spillets egen `dagSeed` også blir reproduserbart).

**Resultat:**
- Konsollrapport (PASS/FAIL/KJENT FEIL per steg, med verifiserte tall).
- `docs/rapporter/spilltest-siste.md` — full rapport, **overskrives hver
  kjøring**.
- Ved reell FAIL: skjermbilde i `docs/rapporter/spilltest-feil/steg-N.png`
  (git-ignorert; regenereres per løp).
- Exit-kode ≠ 0 hvis noen reell FAIL finnes (KJENT FEIL teller ikke som feil).

Første gang på en ny maskin: `npm install` (henter `@playwright/test`).
Nettleseren (Chromium) lastes av Playwright — samme versjon som ligger i
`~/.cache/ms-playwright` matcher `@playwright/test@1.61.x`.

---

## 2. Hva som dekkes — «En full måned»

Ett sammenhengende løp (`tests/spilltest/full-maaned.spec.ts`) spiller gjennom
kjernesløyfa og asserter på state + DOM ved hvert steg:

| # | Steg | Verifiserer (utvalg) |
|---|------|----------------------|
| 1 | Oppstart | `/game?skip=1` laster; HUD viser startkapital (150 000) + «Januar · År 1» |
| 2 | Bestilling | Bestill 3 varer i Produkter-fanen; **ingen duplikatlinjer** (merge-fiks: samme vare merges til én linje); pengene trukket korrekt |
| 3 | Levering ved dagstart | Bestilte varer ligger på lager FØR åpning dag 2 (levering ved `START_NEW_DAY`) |
| 4 | Stell disken | Minst 2 trau fylt (`counterLayout`); hver plass peker på en reell vare |
| 5 | Åpen dag | Bakgrunnssalg tikker inn omsetning; auto-klokka avanserer av seg selv; et kundemøte starter og **spilles til slutt via gyldige valg** (ekte overlay + `RESOLVE`); dagsoppgjøret summerer konsistent (`resultat = salg + bakgrunn − varekost − svinn`) |
| 6 | Forretningsplan → lån | Sammendrag → plankvalitet > 0; lån opptatt; **rente == tabell[plankvalitet]**; lånet ligger i state |
| 7 | Månedsrull | Månedsoppgjør med **LÅNEAVDRAG == `amortiserLaan`-fasit** (regnet i testen, ikke lest fra UI); faste kostnader (inkl. lønn-linje) == `manedligeFasteKostnader`-fasit; kassa trukket nøyaktig; restgjeld amortisert |
| 8 | Tema på/av | `beredskap` aktiverer HMS-fanen; deaktivering fjerner den (null spor) |
| 9 | Persistens | `state.beredskap` overlever reload |
| 10 | Navigasjonsvakt | Hub-lenker i spill-UI skal ALDRI navigere spillfanen bort — **KJENT FEIL** (se §5) |

Forventningstall leses fra kilden (`amortiserLaan`/`manedligeFasteKostnader` i
`src/game/data/economy.ts`, rente-tabellen), ikke som hardkodede kopier — så
testen tåler balanse-tuning.

---

## 3. Hva som BEVISST ikke dekkes

- **Visuelt** — ingen pikseldiff mot «riktig» utseende, ingen layout-/farge-/
  animasjonssjekk. Det er Espens domene.
- **Pedagogikk** — om innholdet lærer bort det det skal, om replikker/feedback er
  gode. Espens domene.
- **Drag & drop** — disk-/vindus-plassering og org-kart-DnD kjøres ikke med ekte
  musedrag (uvalidert i Chrome, og visuelt). Steg 4 setter `counterLayout` via
  test-broen og asserter på STATE i stedet.
- **Firebase/live-økter** — klassekoder, live-sessions, konkurranse/eksamen.
  Testen bruker den lokale tema-fallbacken (`tema-aktivering-dev`), ikke RTDB.
- **Legacy v1-spillet** (`/start`→`/city`→…) — kun byspillet (`/game`).

### Test-broen og tidsstyring (viktig avgrensning)

Testen SPILLER de ekte student-knappene der det fanger wiring/døde knapper:
bestilling (`Bestill`), forretningsplan (`Lagre`), lån (`Søk om lån` → `Godta
lån`), kundemøte-valg, fane-navigasjon. Men to ting går via en **test-bro** i
stedet for sanntid/scene-interaksjon:

1. **State-lesing:** `window.__GAME_STATE__` speiler hele spilltilstanden (kun i
   DEV-bygg, satt i `GameContext`). Testen leser tall herfra for assertering.
2. **Tidsstyring:** `window.__GAME_DISPATCH__` brukes til å fremskynde tid
   (`TICK`, `OPEN_DAY`/`CLOSE_DAY`/`START_NEW_DAY`) og til oppsett som ikke er et
   telt steg (leie av lokale, tom åpningsbestilling). Uten dette ville én åpen
   dag tatt ~6 minutter (spillklokka: 480 spillminutter á 0,75 s/tikk) og en
   månedsrull ~12 slike.

Begge er rene DEV-tillegg (`import.meta.env.DEV`) som **ikke finnes i
produksjonsbygg** og ikke endrer spilladferd. Kundemøtet i steg 5 åpnes via den
eksisterende dev-hendelsen `dev:openSalesScenario` (samme som dashbordets «Øv
salg»), men spilles så med ekte valg som dispatcher ekte `RESOLVE_SALES_SCENARIO`
— så salgsmotoren og møte-oppgjøret testes reelt.

---

## 4. Robusthet og determinisme

- **Ingen `sleep`:** alle ventinger er eksplisitte pollinger på state/DOM
  (`ventState`, Playwright `toPass`/`toBeVisible`) — flaky-vern.
- **Selektorer:** `data-testid` der DOM-en er tvetydig (ordre-rader
  `bestill-<id>`/`qty-<id>`, `dashbord`, `dashbord-lukk`, `salgsoverlay`,
  `salgsvalg`). Ellers rolle/tekst/placeholder. Testid-ene er rene tillegg i
  spillkoden, ingen adferdsendring.
- **Determinisme:** ett løp om gangen, ingen retries, `Math.random` seedet i
  harnessen. To løp på rad gir **identisk** PASS/FAIL og identiske verifiserte
  tall (kun per-steg-`ms` varierer). Kjør gjerne to ganger for å bevise det.

---

## 5. Kjente feil (forventet RØD til de fikses)

- **Steg 10 — Navigasjonsvakt (KJENT FEIL på `main`):** hub-lenkene («📚 Lær
  mer» i HMS-fanen) bruker `navigate(rute)` (react-router, samme fane) og
  navigerer HELE spillfanen bort til `/learning/…` — spilltilstanden går tapt.
  De burde åpne i ny fane (`target=_blank`). Fikses i fiksrunde 2; testen er
  markert `KJENT FEIL` så den ikke gater løpet, men dokumenterer regresjonen.

## 6. Dokumenterte begrensninger funnet av testen

- **Persistens (steg 9):** KUN `state.beredskap` persisteres (localStorage
  `beredskap_state_v1`). **Full spilltilstand overlever IKKE reload** — `?skip`
  re-seeder et friskt spill (kasse 150 000, måned 1). Dette er en
  arkitektur-begrensning på `main` i dag, ikke en regresjon; testen verifiserer
  det som FAKTISK persisteres (beredskap) og logger begrensningen.

---

## 7. Legge til nye steg

I `tests/spilltest/full-maaned.spec.ts`, bruk `steg`-hjelperen:

```ts
await steg(page, rapport, 11, 'Min nye sjekk', async ctx => {
  // ... gjør student-handlinger (klikk DOM) ...
  const s = await lesState(page)
  expect(s.noeFelt).toBe(forventet)
  ctx.ok(`verifiserte at noeFelt = ${s.noeFelt}`)   // havner i rapporten
}, { kjentFeil: false })   // kjentFeil: true for forventet-røde steg
```

- `ctx.ok(...)` logger et verifisert tall/tilstand til rapporten.
- Et steg som kaster registreres som FAIL (eller KJENT FEIL) med skjermbilde, og
  løpet fortsetter til neste steg (så hele rapporten fylles ut).
- Les forventningstall fra `src/game/data/*` (balance/economy) der det går — ikke
  hardkod kopier, så testen tåler tuning.
- Rydd blokkerende fullskjerms-overlays (dagsoppgjør, månedsoppgjør) med
  `START_NEW_DAY`/`DISMISS_MONTH_SETTLEMENT` før du klikker i dashbordet.

Filer:
- `playwright.config.ts` — config (webServer, single worker, timeout).
- `tests/spilltest/harness.ts` — hjelpere (`steg`, `lesState`, `ventState`,
  `dispatch`/`dispatchN`, rapport-skriving).
- `tests/spilltest/full-maaned.spec.ts` — selve løpet.

---

## 8. Anbefalt rutine

**Kjør `npm run spilltest` før hver merge til `main`.** Grønt (0 reelle FAIL) er
et krav; KJENT FEIL-steg er OK så lenge de er dokumentert her i §5. Er noe nytt
RØDT som ikke står i §5 → en regresjon er innført; fiks den (eller flagg den
bevisst som ny KJENT FEIL) før merge. Dette erstatter IKKE Espens visuelle
gjennomgang i Chrome — det fanger funksjonsbrudd før den gjennomgangen, så
Chrome-tiden brukes på det bare et menneske kan vurdere.
