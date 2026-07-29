# Spilltest — siste kjøring

> Auto-generert av `npm run spilltest` (En full måned). Overskrives hver kjøring.
> Startet: 2026-07-29T14:40:50.542Z

**Resultat: ❌ RØDT** — 19 PASS · 32 FAIL · 0 KJENT FEIL (51 steg)

| # | Steg | Status | ms |
|---|------|--------|----|
| 1 | Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1 | ✅ PASS | 95 |
| 2 | Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket) | ✅ PASS | 4783 |
| 3 | Levering ved åpningsdagen: dashbord-bestilling FØR første åpning ligger FRISK på disken ved dag 1-åpning (ikke dag 2) | ✅ PASS | 582 |
| 4 | Stell disken: legg varer i minst 2 trau, plassering i state | ✅ PASS | 149 |
| 5 | Åpen dag: bakgrunnssalg tikker, kundemøte spilles, dagsoppgjør summerer | ✅ PASS | 6782 |
| 6 | Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå | ✅ PASS | 4413 |
| 7 | Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader | ✅ PASS | 1748 |
| 8 | Tema på/av: beredskap aktiverer HMS-fanen; deaktivering fjerner den | ✅ PASS | 10624 |
| 9 | Persistens: state.beredskap overlever reload | ✅ PASS | 2269 |
| 10 | Navigasjonsvakt: hub-lenker i spill-UI skal ALDRI navigere spillfanen bort | ✅ PASS | 3240 |
| 11 | Budsjett: sett budsjett, rull måneden, avvik == fasit + oppsummeringslinje | ✅ PASS | 8799 |
| 12 | Kampanje: multiplikator + effektrapport == delt fasit + førpris-brudd → tilsynsbrev | ✅ PASS | 1837 |
| 13 | Månedsskifte-levering: ordre siste handledag → ankommer dag 1 neste måned, trukket én gang | ✅ PASS | 4158 |
| 14 | Prising: upriset vare → «mangler pris»-tap; overpriset HØY-vare (2×) selger ~0 → «for høy pris»-tap | ✅ PASS | 2603 |
| 15 | Reiseliv: turistsesong i kaféen er kun økonomisk (trafikkløft + varevekt, INGEN turist-scenarier i pool) + byhotell-avtale gir riktig effekt ved aksept | ✅ PASS | 6 |
| 16 | Pakkebyggeren (treff == beregnPakke-fasit + kafé-trafikk) + reiselivs-inngangene (turistkontor/byhotell velger scenario + åpner dialogkort) | ✅ PASS | 7 |
| 17 | Stasjons-hotspots (?dev=1): labels + tracer, ingen TIL LEIE/bransjevelger, tracer AV → turistkontor til rom-scenen, byhotell til hotell-lobbyen | ✅ PASS | 5318 |
| 18 | Hotell-lobby: booking med match → provisjon == fasit; feilmatch → ingen | ✅ PASS | 1961 |
| 19 | Turistkontor-scene (?dev=1): kalibrerings-gjest DEKODER + rendrer ved disken, gjest-velger blar gjennom sprites | ✅ PASS | 2078 |
| 20 | Priser-fanen (UI): elevsatt pris persisteres via «Lagre priser» og den prisede varen selges | ❌ FAIL | 818003 |
| 21 | Innboksen: bestilling levert (betaling==fasit), sviktet levering (skuffet kunde), dårlig leverandørtilbud (negativt netto) | ❌ FAIL | 94 |
| 22 | Espen spør: riktig svar → kunnskapsbonus == fasit, egen P&L-linje, dagstak håndhevet | ❌ FAIL | 47 |
| 23 | Espen spør: feil svar → penger uendret, forklaring, spørsmål i cooldown | ❌ FAIL | 7 |
| 24 | Stamkunder PARKERT (STAMKUNDER_AKTIV=false) + trekkeregel: uspilt foretrekkes, nullstill ved tom pool | ❌ FAIL | 5 |
| 25 | Nivåbryter: VG1 skjuler VG2-spørsmål + pristilbud-felt; VG2 viser dem | ❌ FAIL | 32 |
| 26 | Fagfilter: M av → M-faner + mkf-tilbud (7d) borte, FD-faner igjen; ↺ Nullstill → tilbake | ❌ FAIL | 28 |
| 27 | Fagbytte i ÅPEN skjult fane → rolig retur til Oversikt (ingen feil) | ❌ FAIL | 4 |
| 28 | Espen spør lærerstyrt: av default → ingen auto; fagfilter fd/m (finnKandidater-fasit) | ❌ FAIL | 6 |
| 29 | Turistsesong PARKERT: sesong kan ikke starte, ⚙-knapper grå, sesong-trigger armes ikke | ❌ FAIL | 5 |
| 30 | Datavakt: dynamisk trigger fyrer IKKE på tomt grunnlag (beredskap_risiko_levert) | ❌ FAIL | 4 |
| 31 | Fagmapping: Personale=FD+M, Forretningsplan=FD+M, Økonomi=ren FD, KS styrer ingen fane | ❌ FAIL | 4 |
| 32 | Vareeksponering: bakgrunnssalg selger KUN utstilte varer; tom disk → 0 salg/tap; tapte-kort = sum av tre | ❌ FAIL | 8 |
| 33 | Dagspuls: «siste salg»-logg ruller (maks 10, ikke tømt av tick uten salg) + leverings-toast venter på kundemøte | ❌ FAIL | 3 |
| 34 | Kø: nullstilt ved OPEN_DAY (aldri gårsdagens tall) + ventende kunde betjenes innen toleransen (ikke tapt) | ❌ FAIL | 4 |
| 35 | Scenario-tidsvindu: Morgenkunden (09–11) / Kryssalget (11–14) spawner innenfor vinduet (seedet) | ❌ FAIL | 4 |
| 36 | Salgslogg: append gir ny id øverst UTEN å endre key på eksisterende linjer (ingen re-mount) | ❌ FAIL | 3 |
| 37 | Mentor daglig-refleksjon: kø vinner (Personale synlig, også ren M) · FD+M av → 0 kø-tap + svinn vinner · nullstill re-armer | ❌ FAIL | 2 |
| 38 | Bestillings-UX: «I bestilling»-total vises og akkumulerer ved to klikk | ❌ FAIL | 2 |
| 39 | Lagre-kvittering (Priser): endring → «Ulagrede endringer» → lagre → «Sist lagret»; utkast bevart ved fanebytte | ❌ FAIL | 3 |
| 40 | Scene-melding: scenebytte forkaster ulest scene-melding og re-armer triggeren | ❌ FAIL | 5 |
| 41 | Tema-fag-gating (HMS-bug): beredskap aktiv + FD av → ingen tema-trigger; FD på → fyrer | ❌ FAIL | 5 |
| 42 | Mentor-pose: pose-bytte endrer ikke figurens LAYOUTBOKS (computed style + rect) | ❌ FAIL | 2 |
| 43 | KROK 7c Sentrumsposten (revidert+fiks): to publiseringstempo · badge+NYTT-merke tennes/slukkes · gjeldende kun forside / 3 eldre i arkiv · avis_swot (mulighet/trussel) maks 1/utgave · trend-effekt == fasit · datavakt · fag-gating · mentor | ❌ FAIL | 9 |
| 44 | Prislagring rører KUN retailPrice (disk/vindu/lager urørt midt på dagen) — TILLITSKRITISK | ❌ FAIL | 4 |
| 45 | Kontekstbundet mentor-tips: fane-tips ulest + fanebytte → forkastet + re-armet (tilbake ved retur) | ❌ FAIL | 6 |
| 46 | Endre/angre bestilling før levering: bestill 130 → endre 30 (leveres 30, differanse refundert); bestill → 0 → ingen levering | ❌ FAIL | 2 |
| 47 | Dagspuls «Lager på disken» viser ALLE utstilte varer (12 utstilt → 12 rader i DOM) | ❌ FAIL | 2 |
| 48 | Produktregnskap i dagsoppgjøret: tabellsummer == totalkortene (svinn stk/kr + solgt stk) | ❌ FAIL | 2 |
| 49 | Bransje-gated vindusutstilling: CAFE (vindusUtstilling=false) → ingen vindusseksjon/tracer, disk-eksponering i stedet | ❌ FAIL | 4 |
| 50 | Planlegging koster ikke spilltid: dashbord åpent i åpen dag → dayMinute fryser + «tiden står»-indikator; lukk → tiden går | ❌ FAIL | 3 |
| 51 | Mentor-figuren har stor klikkflate: hode/senter/føtter klikkbare (også med dagspuls); klikk åpner neste kø-melding; 📖 åpner ordboka (ikke meldingen) | ❌ FAIL | 3 |

## Detaljer per steg

### ✅ Steg 1 — Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1

Verifiserte tall/tilstander:
- state.money = 200000 kr, currentMonth=1, currentYear=1
- HUD viser «200 000 kr» og «Januar · År 1»

### ✅ Steg 2 — Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket)

Verifiserte tall/tilstander:
- 3 ordrelinjer (coffee ×17 merget, croissant ×10, kanelbolle ×8) — ingen duplikater
- money 200000 → 199428 (−572 kr, korrekt trekk)

### ✅ Steg 3 — Levering ved åpningsdagen: dashbord-bestilling FØR første åpning ligger FRISK på disken ved dag 1-åpning (ikke dag 2)

Verifiserte tall/tilstander:
- coffee: lager 17 stk (bestilt 17) — levert ved ÅPNINGSDAGEN (dag 1)
- croissant: lager 10 stk (bestilt 10) — levert ved ÅPNINGSDAGEN (dag 1)
- kanelbolle: lager 8 stk (bestilt 8) — levert ved ÅPNINGSDAGEN (dag 1)
- varene lå friskt på disken på selve åpningsdagen (dag 1) — ikke først dag 2

### ✅ Steg 4 — Stell disken: legg varer i minst 2 trau, plassering i state

Verifiserte tall/tilstander:
- counterLayout: trau-1=coffee, trau-2=croissant

### ✅ Steg 5 — Åpen dag: bakgrunnssalg tikker, kundemøte spilles, dagsoppgjør summerer

Verifiserte tall/tilstander:
- bakgrunnssalg etter 120 tikk (dayMinute 94): 1420 kr, 27 kunder
- kundemøte startet: «morgenkunden»
- kundemøtet spilt til slutt (meetingsToday=1)
- auto-klokka tikket (dayMinute 94 → økte av seg selv)
- dagsoppgjør: omsetning=1420 kr, varekost=428, svinn=144 kr (8 stk), tapt=130 stk
- resultat=848 kr summerer konsistent (salg+bakgrunn−varekost−svinn)

### ✅ Steg 6 — Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå

Verifiserte tall/tilstander:
- plankvalitet = 2/5 stjerner
- lån 250 000 kr @ 9 % p.a. (plankvalitet 2 → riktig rentetrinn)
- totalDebt=250000, monthlyPayment=11421 kr

### ✅ Steg 7 — Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader

Verifiserte tall/tilstander:
- LÅNEAVDRAG: avdrag=9546 kr, renter=1875 kr (== amortiserLaan-fasit)
- faste kostnader=87000 kr (husleie 45000 + lønn 0 + forsikring + mkf) trukket
- kassa 450848 → 352427 kr (− faste 87000 − lån 11421); rapportert inntekt 514 kr
- restgjeld 250 000 → 240454 kr (amortisert)

### ✅ Steg 8 — Tema på/av: beredskap aktiverer HMS-fanen; deaktivering fjerner den

Verifiserte tall/tilstander:
- HMS-fanen skjult i utgangspunktet (ingen tema aktivert)
- HMS-fanen dukker opp når beredskap aktiveres (localStorage-fallback)
- HMS-fanen forsvinner igjen ved deaktivering (null spor)

### ✅ Steg 9 — Persistens: state.beredskap overlever reload

Verifiserte tall/tilstander:
- state.beredskap.planBekreftet = true etter reload (persistert via BEREDSKAP_KEY)
- NB: full spilltilstand persisteres ikke (money re-seedet til 200000) — kun beredskap. Dokumentert begrensning.

### ✅ Steg 10 — Navigasjonsvakt: hub-lenker i spill-UI skal ALDRI navigere spillfanen bort

Verifiserte tall/tilstander:
- hub-lenke «📚 Beredskap (Contingency) ↗» navigerte IKKE spillfanen bort (url: http://localhost:5188/game?skip=1)

### ✅ Steg 11 — Budsjett: sett budsjett, rull måneden, avvik == fasit + oppsummeringslinje

Verifiserte tall/tilstander:
- husleie-avvik = 5000 kr (fasit), eierlønn = 40000 kr, 7 linjer verifisert mot delt hjelpefunksjon
- oppgjøret viser budsjett-kolonner + oppsummeringslinja «Du planla …»

### ✅ Steg 12 — Kampanje: multiplikator + effektrapport == delt fasit + førpris-brudd → tilsynsbrev

Verifiserte tall/tilstander:
- multiplikator 1.156 == kampanjefaktor(kanal×segment) [Instagram × 21-30]
- effektrapport: kostnad 1500 kr, faktisk +16 %, ROI -100 % == delte hjelpefunksjoner
- førpris-brudd genererte tilsynsbrev fra Forbrukertilsynet

### ✅ Steg 13 — Månedsskifte-levering: ordre siste handledag → ankommer dag 1 neste måned, trukket én gang

Verifiserte tall/tilstander:
- bestilte 10 × Kaffe siste handledag → ankomstDag = 1; kassa 197840 → 197700 (−140)
- ny måned dag 1: 100 → 110 på lager (levert), kassa kun trukket faste 87000 + lån 0 (ingen dobbel innkjøpsdebet)

### ✅ Steg 14 — Prising: upriset vare → «mangler pris»-tap; overpriset HØY-vare (2×) selger ~0 → «for høy pris»-tap

Verifiserte tall/tilstander:
- upriset croissant: 88 tapt (mangler pris); kaffe 2× (100 kr): 0 solgt, 92 tapt (for høy pris)

### ✅ Steg 15 — Reiseliv: turistsesong i kaféen er kun økonomisk (trafikkløft + varevekt, INGEN turist-scenarier i pool) + byhotell-avtale gir riktig effekt ved aksept

Verifiserte tall/tilstander:
- Turistsesong PARKERT — sesong-økonomitesten hoppes over til Tema 15 gjenåpnes

### ✅ Steg 16 — Pakkebyggeren (treff == beregnPakke-fasit + kafé-trafikk) + reiselivs-inngangene (turistkontor/byhotell velger scenario + åpner dialogkort)

Verifiserte tall/tilstander:
- Turistsesong PARKERT — pakkebygger/sesong-inngang hoppes over til Tema 15 gjenåpnes

### ✅ Steg 17 — Stasjons-hotspots (?dev=1): labels + tracer, ingen TIL LEIE/bransjevelger, tracer AV → turistkontor til rom-scenen, byhotell til hotell-lobbyen

Verifiserte tall/tilstander:
- ?dev=1 → stasjonsbydelen (labels + tracer, INGEN TIL LEIE, tracer AV); byhotell → /hotell-lobby, turistkontor → /turistkontor, ingen bransjevelger

### ✅ Steg 18 — Hotell-lobby: booking med match → provisjon == fasit; feilmatch → ingen

Verifiserte tall/tilstander:
- match (Gårdsbesøket): hotellProvisjon 0 → 12 kr (+12, == fasit)
- feilmatch (Bryggeriomvisningen): provisjon uendret (12 kr) — ingen booking

### ✅ Steg 19 — Turistkontor-scene (?dev=1): kalibrerings-gjest DEKODER + rendrer ved disken, gjest-velger blar gjennom sprites

Verifiserte tall/tilstander:
- turistkontor-scene: gjest «turist-kart.png» dekoder ved disken; velger → «turist-kamera.png» (også dekodet)

### ❌ Steg 20 — Priser-fanen (UI): elevsatt pris persisteres via «Lagre priser» og den prisede varen selges

```
locator.click: Test timeout of 900000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: /Lagre priser/ }).first()[22m
[2m    - locator resolved to <button>Lagre priser</button>[22m
[2m  - attempting click action[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is not stable[22m
[2m  - retrying click action[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m  - element was detached from the DOM, retrying[22m

```

### ❌ Steg 21 — Innboksen: bestilling levert (betaling==fasit), sviktet levering (skuffet kunde), dårlig leverandørtilbud (negativt netto)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 22 — Espen spør: riktig svar → kunnskapsbonus == fasit, egen P&L-linje, dagstak håndhevet

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 23 — Espen spør: feil svar → penger uendret, forklaring, spørsmål i cooldown

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 24 — Stamkunder PARKERT (STAMKUNDER_AKTIV=false) + trekkeregel: uspilt foretrekkes, nullstill ved tom pool

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 25 — Nivåbryter: VG1 skjuler VG2-spørsmål + pristilbud-felt; VG2 viser dem

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 26 — Fagfilter: M av → M-faner + mkf-tilbud (7d) borte, FD-faner igjen; ↺ Nullstill → tilbake

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 27 — Fagbytte i ÅPEN skjult fane → rolig retur til Oversikt (ingen feil)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 28 — Espen spør lærerstyrt: av default → ingen auto; fagfilter fd/m (finnKandidater-fasit)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 29 — Turistsesong PARKERT: sesong kan ikke starte, ⚙-knapper grå, sesong-trigger armes ikke

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 30 — Datavakt: dynamisk trigger fyrer IKKE på tomt grunnlag (beredskap_risiko_levert)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 31 — Fagmapping: Personale=FD+M, Forretningsplan=FD+M, Økonomi=ren FD, KS styrer ingen fane

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 32 — Vareeksponering: bakgrunnssalg selger KUN utstilte varer; tom disk → 0 salg/tap; tapte-kort = sum av tre

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 33 — Dagspuls: «siste salg»-logg ruller (maks 10, ikke tømt av tick uten salg) + leverings-toast venter på kundemøte

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 34 — Kø: nullstilt ved OPEN_DAY (aldri gårsdagens tall) + ventende kunde betjenes innen toleransen (ikke tapt)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 35 — Scenario-tidsvindu: Morgenkunden (09–11) / Kryssalget (11–14) spawner innenfor vinduet (seedet)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 36 — Salgslogg: append gir ny id øverst UTEN å endre key på eksisterende linjer (ingen re-mount)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 37 — Mentor daglig-refleksjon: kø vinner (Personale synlig, også ren M) · FD+M av → 0 kø-tap + svinn vinner · nullstill re-armer

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 38 — Bestillings-UX: «I bestilling»-total vises og akkumulerer ved to klikk

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 39 — Lagre-kvittering (Priser): endring → «Ulagrede endringer» → lagre → «Sist lagret»; utkast bevart ved fanebytte

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 40 — Scene-melding: scenebytte forkaster ulest scene-melding og re-armer triggeren

```
page.evaluate: Target page, context or browser has been closed
```

### ❌ Steg 41 — Tema-fag-gating (HMS-bug): beredskap aktiv + FD av → ingen tema-trigger; FD på → fyrer

```
page.evaluate: Target page, context or browser has been closed
```

### ❌ Steg 42 — Mentor-pose: pose-bytte endrer ikke figurens LAYOUTBOKS (computed style + rect)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 43 — KROK 7c Sentrumsposten (revidert+fiks): to publiseringstempo · badge+NYTT-merke tennes/slukkes · gjeldende kun forside / 3 eldre i arkiv · avis_swot (mulighet/trussel) maks 1/utgave · trend-effekt == fasit · datavakt · fag-gating · mentor

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 44 — Prislagring rører KUN retailPrice (disk/vindu/lager urørt midt på dagen) — TILLITSKRITISK

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 45 — Kontekstbundet mentor-tips: fane-tips ulest + fanebytte → forkastet + re-armet (tilbake ved retur)

```
page.evaluate: Target page, context or browser has been closed
```

### ❌ Steg 46 — Endre/angre bestilling før levering: bestill 130 → endre 30 (leveres 30, differanse refundert); bestill → 0 → ingen levering

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 47 — Dagspuls «Lager på disken» viser ALLE utstilte varer (12 utstilt → 12 rader i DOM)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 48 — Produktregnskap i dagsoppgjøret: tabellsummer == totalkortene (svinn stk/kr + solgt stk)

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 49 — Bransje-gated vindusutstilling: CAFE (vindusUtstilling=false) → ingen vindusseksjon/tracer, disk-eksponering i stedet

```
page.evaluate: Target page, context or browser has been closed
```

### ❌ Steg 50 — Planlegging koster ikke spilltid: dashbord åpent i åpen dag → dayMinute fryser + «tiden står»-indikator; lukk → tiden går

```
page.goto: Target page, context or browser has been closed
```

### ❌ Steg 51 — Mentor-figuren har stor klikkflate: hode/senter/føtter klikkbare (også med dagspuls); klikk åpner neste kø-melding; 📖 åpner ordboka (ikke meldingen)

```
page.evaluate: Target page, context or browser has been closed
```

## Notater

- Oppsett som ikke er et telt steg (leie av lokale + tom åpningsbestilling, samt fase-/tidsstyring OPEN_DAY/CLOSE_DAY/START_NEW_DAY/TICK) kjøres via test-broen window.__GAME_DISPATCH__ — se DEL 3 i docs/SPILLTESTER.md for hvorfor (klokka ville ellers brukt ~6 min per dag).
- Persistens: KUN state.beredskap persisteres på main (BEREDSKAP_KEY). Full spilltilstand (kasse/lån/dag/lager) overlever IKKE reload — ?skip re-seeder et friskt spill (verifisert: money=200000, måned=1). Dokumentert begrensning, ikke en regresjon.
