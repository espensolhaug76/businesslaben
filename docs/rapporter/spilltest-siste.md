# Spilltest — siste kjøring

> Auto-generert av `npm run spilltest` (En full måned). Overskrives hver kjøring.
> Startet: 2026-07-16T11:38:54.038Z

**Resultat: ✅ GRØNT** — 12 PASS · 0 FAIL · 0 KJENT FEIL (12 steg)

| # | Steg | Status | ms |
|---|------|--------|----|
| 1 | Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1 | ✅ PASS | 88 |
| 2 | Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket) | ✅ PASS | 4821 |
| 3 | Levering ved dagstart: varene på lager FØR åpning (dag 2) | ✅ PASS | 333 |
| 4 | Stell disken: legg varer i minst 2 trau, plassering i state | ✅ PASS | 159 |
| 5 | Åpen dag: bakgrunnssalg tikker, kundemøte spilles, dagsoppgjør summerer | ✅ PASS | 6698 |
| 6 | Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå | ✅ PASS | 4460 |
| 7 | Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader | ✅ PASS | 1408 |
| 8 | Tema på/av: beredskap aktiverer HMS-fanen; deaktivering fjerner den | ✅ PASS | 12001 |
| 9 | Persistens: state.beredskap overlever reload | ✅ PASS | 2201 |
| 10 | Navigasjonsvakt: hub-lenker i spill-UI skal ALDRI navigere spillfanen bort | ✅ PASS | 3188 |
| 11 | Budsjett: sett budsjett, rull måneden, avvik == fasit + oppsummeringslinje | ✅ PASS | 7757 |
| 12 | Kampanje: multiplikator + effektrapport == delt fasit + førpris-brudd → tilsynsbrev | ✅ PASS | 1740 |

## Detaljer per steg

### ✅ Steg 1 — Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1

Verifiserte tall/tilstander:
- state.money = 150000 kr, currentMonth=1, currentYear=1
- HUD viser «150 000 kr» og «Januar · År 1»

### ✅ Steg 2 — Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket)

Verifiserte tall/tilstander:
- 3 ordrelinjer (coffee ×17 merget, croissant ×10, kanelbolle ×8) — ingen duplikater
- money 150000 → 149599 (−401 kr, korrekt trekk)

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
- bakgrunnssalg etter 150 tikk (dayMinute 122): 972 kr, 25 kunder
- kundemøte startet: «likeverd»
- kundemøtet spilt til slutt (meetingsToday=1)
- auto-klokka tikket (dayMinute 124 → økte av seg selv)
- dagsoppgjør: omsetning=1011 kr, varekost=311, svinn=0 kr (0 stk), tapt=82 stk
- resultat=700 kr summerer konsistent (salg+bakgrunn−varekost−svinn)

### ✅ Steg 6 — Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå

Verifiserte tall/tilstander:
- plankvalitet = 2/5 stjerner
- lån 250 000 kr @ 9 % p.a. (plankvalitet 2 → riktig rentetrinn)
- totalDebt=250000, monthlyPayment=11421 kr

### ✅ Steg 7 — Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader

Verifiserte tall/tilstander:
- LÅNEAVDRAG: avdrag=9546 kr, renter=1875 kr (== amortiserLaan-fasit)
- faste kostnader=47000 kr (husleie 45000 + lønn 0 + forsikring + mkf) trukket
- kassa 400610 → 342189 kr (− faste 47000 − lån 11421); rapportert inntekt 700 kr
- restgjeld 250 000 → 240454 kr (amortisert)

### ✅ Steg 8 — Tema på/av: beredskap aktiverer HMS-fanen; deaktivering fjerner den

Verifiserte tall/tilstander:
- HMS-fanen skjult i utgangspunktet (ingen tema aktivert)
- HMS-fanen dukker opp når beredskap aktiveres (localStorage-fallback)
- HMS-fanen forsvinner igjen ved deaktivering (null spor)

### ✅ Steg 9 — Persistens: state.beredskap overlever reload

Verifiserte tall/tilstander:
- state.beredskap.planBekreftet = true etter reload (persistert via BEREDSKAP_KEY)
- NB: full spilltilstand persisteres ikke (money re-seedet til 150000) — kun beredskap. Dokumentert begrensning.

### ✅ Steg 10 — Navigasjonsvakt: hub-lenker i spill-UI skal ALDRI navigere spillfanen bort

Verifiserte tall/tilstander:
- hub-lenke «📚 Beredskap (Contingency) ↗» navigerte IKKE spillfanen bort (url: http://localhost:5176/game?skip=1)

### ✅ Steg 11 — Budsjett: sett budsjett, rull måneden, avvik == fasit + oppsummeringslinje

Verifiserte tall/tilstander:
- husleie-avvik = 5000 kr (fasit), 6 linjer verifisert mot delt hjelpefunksjon
- oppgjøret viser budsjett-kolonner + oppsummeringslinja «Du planla …»

### ✅ Steg 12 — Kampanje: multiplikator + effektrapport == delt fasit + førpris-brudd → tilsynsbrev

Verifiserte tall/tilstander:
- multiplikator 1.156 == kampanjefaktor(kanal×segment) [Instagram × 21-30]
- effektrapport: kostnad 1500 kr, faktisk +16 %, ROI -100 % == delte hjelpefunksjoner
- førpris-brudd genererte tilsynsbrev fra Forbrukertilsynet

## Notater

- Oppsett som ikke er et telt steg (leie av lokale + tom åpningsbestilling, samt fase-/tidsstyring OPEN_DAY/CLOSE_DAY/START_NEW_DAY/TICK) kjøres via test-broen window.__GAME_DISPATCH__ — se DEL 3 i docs/SPILLTESTER.md for hvorfor (klokka ville ellers brukt ~6 min per dag).
- Persistens: KUN state.beredskap persisteres på main (BEREDSKAP_KEY). Full spilltilstand (kasse/lån/dag/lager) overlever IKKE reload — ?skip re-seeder et friskt spill (verifisert: money=150000, måned=1). Dokumentert begrensning, ikke en regresjon.
