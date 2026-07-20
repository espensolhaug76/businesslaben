# Spilltest — siste kjøring

> Auto-generert av `npm run spilltest` (En full måned). Overskrives hver kjøring.
> Startet: 2026-07-20T18:56:31.758Z

**Resultat: ✅ GRØNT** — 21 PASS · 0 FAIL · 0 KJENT FEIL (21 steg)

| # | Steg | Status | ms |
|---|------|--------|----|
| 1 | Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1 | ✅ PASS | 87 |
| 2 | Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket) | ✅ PASS | 5073 |
| 3 | Levering ved dagstart: varene på lager FØR åpning (dag 2) | ✅ PASS | 435 |
| 4 | Stell disken: legg varer i minst 2 trau, plassering i state | ✅ PASS | 157 |
| 5 | Åpen dag: bakgrunnssalg tikker, kundemøte spilles, dagsoppgjør summerer | ✅ PASS | 7592 |
| 6 | Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå | ✅ PASS | 4407 |
| 7 | Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader | ✅ PASS | 1507 |
| 8 | Tema på/av: beredskap aktiverer HMS-fanen; deaktivering fjerner den | ✅ PASS | 10672 |
| 9 | Persistens: state.beredskap overlever reload | ✅ PASS | 2276 |
| 10 | Navigasjonsvakt: hub-lenker i spill-UI skal ALDRI navigere spillfanen bort | ✅ PASS | 3052 |
| 11 | Budsjett: sett budsjett, rull måneden, avvik == fasit + oppsummeringslinje | ✅ PASS | 7364 |
| 12 | Kampanje: multiplikator + effektrapport == delt fasit + førpris-brudd → tilsynsbrev | ✅ PASS | 1787 |
| 13 | Månedsskifte-levering: ordre siste handledag → ankommer dag 1 neste måned, trukket én gang | ✅ PASS | 3789 |
| 14 | Prising: upriset vare → «mangler pris»-tap; overpriset HØY-vare (2×) selger ~0 → «for høy pris»-tap | ✅ PASS | 2549 |
| 15 | Reiseliv: turistsesong i kaféen er kun økonomisk (trafikkløft + varevekt, INGEN turist-scenarier i pool) + byhotell-avtale gir riktig effekt ved aksept | ✅ PASS | 2993 |
| 16 | Pakkebyggeren (treff == beregnPakke-fasit + kafé-trafikk) + reiselivs-inngangene (turistkontor/byhotell velger scenario + åpner dialogkort) | ✅ PASS | 2774 |
| 17 | Stasjons-hotspots (?dev=1): labels + tracer, ingen TIL LEIE/bransjevelger, tracer AV → turistkontor til rom-scenen, byhotell til hotell-lobbyen | ✅ PASS | 3276 |
| 18 | Hotell-lobby: booking med match → provisjon == fasit; feilmatch → ingen | ✅ PASS | 1805 |
| 19 | Turistkontor-scene (?dev=1): kalibrerings-gjest DEKODER + rendrer ved disken, gjest-velger blar gjennom sprites | ✅ PASS | 2026 |
| 20 | Priser-fanen (UI): elevsatt pris persisteres (input→blur + Lagre) og den prisede varen selges | ✅ PASS | 3303 |
| 21 | Innboksen: bestilling levert (betaling==fasit), sviktet levering (skuffet kunde), dårlig leverandørtilbud (negativt netto) | ✅ PASS | 4235 |

## Detaljer per steg

### ✅ Steg 1 — Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1

Verifiserte tall/tilstander:
- state.money = 200000 kr, currentMonth=1, currentYear=1
- HUD viser «200 000 kr» og «Januar · År 1»

### ✅ Steg 2 — Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket)

Verifiserte tall/tilstander:
- 3 ordrelinjer (coffee ×17 merget, croissant ×10, kanelbolle ×8) — ingen duplikater
- money 200000 → 199428 (−572 kr, korrekt trekk)

### ✅ Steg 3 — Levering ved dagstart: varene på lager FØR åpning (dag 2)

Verifiserte tall/tilstander:
- coffee: lager 17 stk (bestilt 17) — levert ved dagstart
- croissant: lager 10 stk (bestilt 10) — levert ved dagstart
- kanelbolle: lager 8 stk (bestilt 8) — levert ved dagstart
- dayPhase = «stengt» (varene lå på lager FØR åpning)

### ✅ Steg 4 — Stell disken: legg varer i minst 2 trau, plassering i state

Verifiserte tall/tilstander:
- counterLayout: trau-1=coffee, trau-2=croissant

### ✅ Steg 5 — Åpen dag: bakgrunnssalg tikker, kundemøte spilles, dagsoppgjør summerer

Verifiserte tall/tilstander:
- bakgrunnssalg etter 150 tikk (dayMinute 122): 1752 kr, 34 kunder
- kundemøte startet: «likeverd»
- kundemøtet spilt til slutt (meetingsToday=1)
- auto-klokka tikket (dayMinute 124 → økte av seg selv)
- dagsoppgjør: omsetning=1802 kr, varekost=558, svinn=0 kr (0 stk), tapt=125 stk
- resultat=1244 kr summerer konsistent (salg+bakgrunn−varekost−svinn)

### ✅ Steg 6 — Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå

Verifiserte tall/tilstander:
- plankvalitet = 2/5 stjerner
- lån 250 000 kr @ 9 % p.a. (plankvalitet 2 → riktig rentetrinn)
- totalDebt=250000, monthlyPayment=11421 kr

### ✅ Steg 7 — Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader

Verifiserte tall/tilstander:
- LÅNEAVDRAG: avdrag=9546 kr, renter=1875 kr (== amortiserLaan-fasit)
- faste kostnader=87000 kr (husleie 45000 + lønn 0 + forsikring + mkf) trukket
- kassa 451230 → 352809 kr (− faste 87000 − lån 11421); rapportert inntekt 1244 kr
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
- hub-lenke «📚 Beredskap (Contingency) ↗» navigerte IKKE spillfanen bort (url: http://localhost:5176/game?skip=1)

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
- sesong (kafé): trafikk 122 → 146 (+20 %), vare-vekt drikke 1.6, turist-scenarier i kafépool: 0
- hotellavtale akseptert → trafikk 146 → 177 (+25 % hotellbonus)

### ✅ Steg 16 — Pakkebyggeren (treff == beregnPakke-fasit + kafé-trafikk) + reiselivs-inngangene (turistkontor/byhotell velger scenario + åpner dialogkort)

Verifiserte tall/tilstander:
- profil «Busslast med seniorer» → treff 47 %, 13 turister kjøpte pakken (fasit 13)
- egen kafé i pakken → sesongtrafikk 146 → 165 (+15 % kafébonus)
- reiselivs-innganger: turistkontor/byhotell velger fra riktig pool; «møt en …»-event åpner dialogkort-overlayet (turister UT av kaféen)

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

### ✅ Steg 20 — Priser-fanen (UI): elevsatt pris persisteres (input→blur + Lagre) og den prisede varen selges

Verifiserte tall/tilstander:
- Priser-fanen UI: coffee 0 → 50 kr (input→blur + Lagre), solgte 5 stk (250 kr) etter 30 tikk, mangler-pris-tap: 0

### ✅ Steg 21 — Innboksen: bestilling levert (betaling==fasit), sviktet levering (skuffet kunde), dårlig leverandørtilbud (negativt netto)

Verifiserte tall/tilstander:
- A: bestilling levert — betalt 600 kr (== fasit), lager −12 stk
- B: sviktet levering — rykte 50 → 44, ingen betaling
- C: villedende tilbud akseptert — netto -200 kr (negativt), betalte 760 kr

## Notater

- Oppsett som ikke er et telt steg (leie av lokale + tom åpningsbestilling, samt fase-/tidsstyring OPEN_DAY/CLOSE_DAY/START_NEW_DAY/TICK) kjøres via test-broen window.__GAME_DISPATCH__ — se DEL 3 i docs/SPILLTESTER.md for hvorfor (klokka ville ellers brukt ~6 min per dag).
- Persistens: KUN state.beredskap persisteres på main (BEREDSKAP_KEY). Full spilltilstand (kasse/lån/dag/lager) overlever IKKE reload — ?skip re-seeder et friskt spill (verifisert: money=200000, måned=1). Dokumentert begrensning, ikke en regresjon.
