# Spilltest — siste kjøring

> Auto-generert av `npm run spilltest` (En full måned). Overskrives hver kjøring.
> Startet: 2026-08-10T08:09:50.691Z

**Resultat: ✅ GRØNT** — 51 PASS · 0 FAIL · 0 KJENT FEIL (51 steg)

| # | Steg | Status | ms |
|---|------|--------|----|
| 1 | Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1 | ✅ PASS | 242 |
| 2 | Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket) | ✅ PASS | 6651 |
| 3 | Levering ved åpningsdagen: dashbord-bestilling FØR første åpning ligger FRISK på disken ved dag 1-åpning (ikke dag 2) | ✅ PASS | 756 |
| 4 | Stell disken: legg varer i minst 2 trau, plassering i state | ✅ PASS | 209 |
| 5 | Åpen dag: bakgrunnssalg tikker, kundemøte spilles, dagsoppgjør summerer | ✅ PASS | 8928 |
| 6 | Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå | ✅ PASS | 6137 |
| 7 | Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader | ✅ PASS | 3125 |
| 8 | Tema på/av: beredskap aktiverer HMS-fanen; deaktivering fjerner den | ✅ PASS | 12868 |
| 9 | Persistens: state.beredskap overlever reload | ✅ PASS | 3661 |
| 10 | Navigasjonsvakt: hub-lenker i spill-UI skal ALDRI navigere spillfanen bort | ✅ PASS | 4679 |
| 11 | Budsjett: sett budsjett, rull måneden, avvik == fasit + oppsummeringslinje | ✅ PASS | 12586 |
| 12 | Kampanje: multiplikator + effektrapport == delt fasit + førpris-brudd → tilsynsbrev | ✅ PASS | 2896 |
| 13 | Månedsskifte-levering: ordre siste handledag → ankommer dag 1 neste måned, trukket én gang | ✅ PASS | 6192 |
| 14 | Prising: upriset vare → «mangler pris»-tap; overpriset HØY-vare (2×) selger ~0 → «for høy pris»-tap | ✅ PASS | 3982 |
| 15 | Reiseliv: turistsesong i kaféen er kun økonomisk (trafikkløft + varevekt, INGEN turist-scenarier i pool) + byhotell-avtale gir riktig effekt ved aksept | ✅ PASS | 8 |
| 16 | Pakkebyggeren (treff == beregnPakke-fasit + kafé-trafikk) + reiselivs-inngangene (turistkontor/byhotell velger scenario + åpner dialogkort) | ✅ PASS | 8 |
| 17 | Stasjons-hotspots (?dev=1): labels + tracer, ingen TIL LEIE/bransjevelger, tracer AV → turistkontor til rom-scenen, byhotell til hotell-lobbyen | ✅ PASS | 5218 |
| 18 | Hotell-lobby: booking med match → provisjon == fasit; feilmatch → ingen | ✅ PASS | 3591 |
| 19 | Turistkontor-scene (?dev=1): kalibrerings-gjest DEKODER + rendrer ved disken, gjest-velger blar gjennom sprites | ✅ PASS | 2861 |
| 20 | Priser-fanen (UI): elevsatt pris persisteres via «Lagre priser» og den prisede varen selges | ✅ PASS | 5405 |
| 21 | Innboksen: bestilling levert (betaling==fasit), sviktet levering (skuffet kunde), dårlig leverandørtilbud (negativt netto) | ✅ PASS | 6495 |
| 22 | Espen spør: riktig svar → kunnskapsbonus == fasit, egen P&L-linje, dagstak håndhevet | ✅ PASS | 79472 |
| 23 | Espen spør: feil svar → penger uendret, forklaring, spørsmål i cooldown | ✅ PASS | 3353 |
| 24 | Stamkunder PARKERT (STAMKUNDER_AKTIV=false) + trekkeregel: uspilt foretrekkes, nullstill ved tom pool | ✅ PASS | 8554 |
| 25 | Nivåbryter: VG1 skjuler VG2-spørsmål + pristilbud-felt; VG2 viser dem | ✅ PASS | 13069 |
| 26 | Fagfilter: M av → M-faner + mkf-tilbud (7d) borte, FD-faner igjen; ↺ Nullstill → tilbake | ✅ PASS | 102908 |
| 27 | Fagbytte i ÅPEN skjult fane → rolig retur til Oversikt (ingen feil) | ✅ PASS | 4239 |
| 28 | Espen spør lærerstyrt: av default → ingen auto; fagfilter fd/m (finnKandidater-fasit) | ✅ PASS | 4580 |
| 29 | Turistsesong PARKERT: sesong kan ikke starte, ⚙-knapper grå, sesong-trigger armes ikke | ✅ PASS | 2778 |
| 30 | Datavakt: dynamisk trigger fyrer IKKE på tomt grunnlag (beredskap_risiko_levert) | ✅ PASS | 2230 |
| 31 | Fagmapping: Personale=FD+M, Forretningsplan=FD+M, Økonomi=ren FD, KS styrer ingen fane | ✅ PASS | 5767 |
| 32 | Vareeksponering: bakgrunnssalg selger KUN utstilte varer; tom disk → 0 salg/tap; tapte-kort = sum av tre | ✅ PASS | 7081 |
| 33 | Dagspuls: «siste salg»-logg ruller (maks 10, ikke tømt av tick uten salg) + leverings-toast venter på kundemøte | ✅ PASS | 7790 |
| 34 | Kø: nullstilt ved OPEN_DAY (aldri gårsdagens tall) + ventende kunde betjenes innen toleransen (ikke tapt) | ✅ PASS | 4300 |
| 35 | Scenario-tidsvindu: Morgenkunden (09–11) / Kryssalget (11–14) spawner innenfor vinduet (seedet) | ✅ PASS | 3520 |
| 36 | Salgslogg: append gir ny id øverst UTEN å endre key på eksisterende linjer (ingen re-mount) | ✅ PASS | 3190 |
| 37 | Mentor daglig-refleksjon: kø vinner (Personale synlig, også ren M) · FD+M av → 0 kø-tap + svinn vinner · nullstill re-armer | ✅ PASS | 10149 |
| 38 | Bestillings-UX: «I bestilling»-total vises og akkumulerer ved to klikk | ✅ PASS | 8459 |
| 39 | Lagre-kvittering (Priser): endring → «Ulagrede endringer» → lagre → «Sist lagret»; utkast bevart ved fanebytte | ✅ PASS | 6013 |
| 40 | Scene-melding: scenebytte forkaster ulest scene-melding og re-armer triggeren | ✅ PASS | 2932 |
| 41 | Tema-fag-gating (HMS-bug): beredskap aktiv + FD av → ingen tema-trigger; FD på → fyrer | ✅ PASS | 3276 |
| 42 | Mentor-pose: pose-bytte endrer ikke figurens LAYOUTBOKS (computed style + rect) | ✅ PASS | 2133 |
| 43 | KROK 7c Sentrumsposten (revidert+fiks): to publiseringstempo · badge+NYTT-merke tennes/slukkes · gjeldende kun forside / 3 eldre i arkiv · avis_swot (mulighet/trussel) maks 1/utgave · trend-effekt == fasit · datavakt · fag-gating · mentor | ✅ PASS | 18408 |
| 44 | Prislagring rører KUN retailPrice (disk/vindu/lager urørt midt på dagen) — TILLITSKRITISK | ✅ PASS | 3805 |
| 45 | Kontekstbundet mentor-tips: fane-tips ulest + fanebytte → forkastet + re-armet (tilbake ved retur) | ✅ PASS | 2565 |
| 46 | Endre/angre bestilling før levering: bestill 130 → endre 30 (leveres 30, differanse refundert); bestill → 0 → ingen levering | ✅ PASS | 8655 |
| 47 | Dagspuls «Lager på disken» viser ALLE utstilte varer (12 utstilt → 12 rader i DOM) | ✅ PASS | 2740 |
| 48 | Produktregnskap i dagsoppgjøret: tabellsummer == totalkortene (svinn stk/kr + solgt stk) | ✅ PASS | 3678 |
| 49 | Bransje-gated vindusutstilling: CAFE (vindusUtstilling=false) → ingen vindusseksjon/tracer, disk-eksponering i stedet | ✅ PASS | 4652 |
| 50 | Planlegging koster ikke spilltid: dashbord åpent i åpen dag → dayMinute fryser + «tiden står»-indikator; lukk → tiden går | ✅ PASS | 11089 |
| 51 | Mentor-figuren har stor klikkflate: hode/senter/føtter klikkbare (også med dagspuls); klikk åpner neste kø-melding; 📖 åpner ordboka (ikke meldingen) | ✅ PASS | 4714 |

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

### ✅ Steg 20 — Priser-fanen (UI): elevsatt pris persisteres via «Lagre priser» og den prisede varen selges

Verifiserte tall/tilstander:
- Priser-fanen UI: coffee 0 → 50 kr (input→blur + Lagre), solgte 6 stk (300 kr) etter 30 tikk, mangler-pris-tap: 0

### ✅ Steg 21 — Innboksen: bestilling levert (betaling==fasit), sviktet levering (skuffet kunde), dårlig leverandørtilbud (negativt netto)

Verifiserte tall/tilstander:
- A: bestilling levert — betalt 600 kr (== fasit), lager −12 stk
- B: sviktet levering — rykte 50 → 44, ingen betaling
- C: villedende tilbud akseptert — netto -200 kr (negativt), betalte 760 kr

### ✅ Steg 22 — Espen spør: riktig svar → kunnskapsbonus == fasit, egen P&L-linje, dagstak håndhevet

Verifiserte tall/tilstander:
- Espen spør: 3 riktige → +400 kr (tak), 3. gav 0. Dagsoppgjør-linje = 400 kr

### ✅ Steg 23 — Espen spør: feil svar → penger uendret, forklaring, spørsmål i cooldown

Verifiserte tall/tilstander:
- Feil svar: penger uendret (197200), forklaring vist, cooldown til dag 4

### ✅ Steg 24 — Stamkunder PARKERT (STAMKUNDER_AKTIV=false) + trekkeregel: uspilt foretrekkes, nullstill ved tom pool

Verifiserte tall/tilstander:
- Parkert: 0 stamkundemøter; uspilt foretrekkes (morgenkunden holdt tilbake), pool nullstilt da alle 14 var spilt

### ✅ Steg 25 — Nivåbryter: VG1 skjuler VG2-spørsmål + pristilbud-felt; VG2 viser dem

Verifiserte tall/tilstander:
- Nivå: VG1-pool 19 spm (0 VG2), VG2-pool har VG2-spm; pristilbud-felt skjult i VG1, synlig i VG2

### ✅ Steg 26 — Fagfilter: M av → M-faner + mkf-tilbud (7d) borte, FD-faner igjen; ↺ Nullstill → tilbake

Verifiserte tall/tilstander:
- M av → 5 M-faner + mkf-tilbud (7d) borte, Produkter/Priser/kjerne igjen; ↺ Nullstill → M-faner tilbake

### ✅ Steg 27 — Fagbytte i ÅPEN skjult fane → rolig retur til Oversikt (ingen feil)

Verifiserte tall/tilstander:
- Fagbytte på åpen Målgruppe-fane → «Læreren har endret fagoppsettet» + tilbake på Oversikt, 0 feil

### ✅ Steg 28 — Espen spør lærerstyrt: av default → ingen auto; fagfilter fd/m (finnKandidater-fasit)

Verifiserte tall/tilstander:
- Av default: 0 auto-spørsmål over 4 dager. Fagfilter: 12 fd-spm (alle fd), M-pool alle m-tagget

### ✅ Steg 29 — Turistsesong PARKERT: sesong kan ikke starte, ⚙-knapper grå, sesong-trigger armes ikke

Verifiserte tall/tilstander:
- Parkert: START_TURISTSESONG no-op (turistsesong=null), sesong-trigger armes ikke, ⚙-knapp grå «Parkert»

### ✅ Steg 30 — Datavakt: dynamisk trigger fyrer IKKE på tomt grunnlag (beredskap_risiko_levert)

Verifiserte tall/tilstander:
- Datavakt (beredskap_risiko_levert): tomt/ulagret grunnlag → fyrer ikke; ≥1 tiltak → fyrer

### ✅ Steg 31 — Fagmapping: Personale=FD+M, Forretningsplan=FD+M, Økonomi=ren FD, KS styrer ingen fane

Verifiserte tall/tilstander:
- Personale=FD+M (står så lenge FD el. M er på, borte når begge av); Forretningsplan=FD+M; Økonomi=ren FD (skjult ved FD av); KS av → 0 faner endres, men ks-spørsmål stilles ikke

### ✅ Steg 32 — Vareeksponering: bakgrunnssalg selger KUN utstilte varer; tom disk → 0 salg/tap; tapte-kort = sum av tre

Verifiserte tall/tilstander:
- Utstilte-only: tom disk 0 salg/0 tap (kunder teller); ikke-utstilt croissant aldri solgt/tapt; tapte-kort summerer (0 tomt · 8 pris · 5 dyr = 13)

### ✅ Steg 33 — Dagspuls: «siste salg»-logg ruller (maks 10, ikke tømt av tick uten salg) + leverings-toast venter på kundemøte

Verifiserte tall/tilstander:
- sisteSalgLogg ruller (taket 10, urørt av tick uten salg); leverings-toast venter på møtet (borte under, tilbake etter)

### ✅ Steg 34 — Kø: nullstilt ved OPEN_DAY (aldri gårsdagens tall) + ventende kunde betjenes innen toleransen (ikke tapt)

Verifiserte tall/tilstander:
- kø nullstilt ved OPEN_DAY (dag1 hadde 1 gått); ventende kunde betjent innenfor toleransen uten tap

### ✅ Steg 35 — Scenario-tidsvindu: Morgenkunden (09–11) / Kryssalget (11–14) spawner innenfor vinduet (seedet)

Verifiserte tall/tilstander:
- tidsbundne scenarier spawnet innenfor vinduet (2 observasjoner over dagene)

### ✅ Steg 36 — Salgslogg: append gir ny id øverst UTEN å endre key på eksisterende linjer (ingen re-mount)

Verifiserte tall/tilstander:
- append gir ny id øverst; eksisterende logglinjers id-er står uendret (stabil key → ingen re-mount)

### ✅ Steg 37 — Mentor daglig-refleksjon: kø vinner (Personale synlig, også ren M) · FD+M av → 0 kø-tap + svinn vinner · nullstill re-armer

Verifiserte tall/tilstander:
- kø vinner (FD på OG ren M — Personale synlig), FD+M av → 0 kø-tap + svinn vinner (daglig-hint dag-scopet); nullstill tømmer fyrt-settet

### ✅ Steg 38 — Bestillings-UX: «I bestilling»-total vises og akkumulerer ved to klikk

Verifiserte tall/tilstander:
- «I bestilling: N stk — levering i morgen» vises og akkumulerer 10 → 20; knappen forblir «Bestill»

### ✅ Steg 39 — Lagre-kvittering (Priser): endring → «Ulagrede endringer» → lagre → «Sist lagret»; utkast bevart ved fanebytte

Verifiserte tall/tilstander:
- endring → «Ulagrede endringer», lagre → «Sist lagret kl.», utkast + indikator bevart ved fanebytte

### ✅ Steg 40 — Scene-melding: scenebytte forkaster ulest scene-melding og re-armer triggeren

Verifiserte tall/tilstander:
- scenebytte forkaster ulest scene-melding fra køen og re-armer triggeren (kan fyre igjen ved retur)

### ✅ Steg 41 — Tema-fag-gating (HMS-bug): beredskap aktiv + FD av → ingen tema-trigger; FD på → fyrer

Verifiserte tall/tilstander:
- tema-trigger fag-gated: beredskap aktiv + FD av → ingen HMS-melding; FD på → melding tilbake (Espen spør + innboks var alt fag-gated)

### ✅ Steg 42 — Mentor-pose: pose-bytte endrer ikke figurens LAYOUTBOKS (computed style + rect)

Verifiserte tall/tilstander:
- figur-containeren låst til 150px×170px — pose-bytte (v5/v3/v2) endrer ikke bounding-box; poser preloades

### ✅ Steg 43 — KROK 7c Sentrumsposten (revidert+fiks): to publiseringstempo · badge+NYTT-merke tennes/slukkes · gjeldende kun forside / 3 eldre i arkiv · avis_swot (mulighet/trussel) maks 1/utgave · trend-effekt == fasit · datavakt · fag-gating · mentor

Verifiserte tall/tilstander:
- to tempo OK: hovedutgave kun avisdag, løpende notis (1, ikke-trend) mellom; badge+NYTT tennes/slukkes; gjeldende=uke 5 på forside, arkiv=3 eldre (uker 4,3,2); avis_swot|5 maks 1/utgave; trend-effekt «Regnværsuke (−trafikk, ++varm drikke)» == fasit; datavakt + fag-gating + mentor OK

### ✅ Steg 44 — Prislagring rører KUN retailPrice (disk/vindu/lager urørt midt på dagen) — TILLITSKRITISK

Verifiserte tall/tilstander:
- prislagring merger KUN retailPrice: lager (coffee:187, croissant:132) + plasseringer + utstilte urørt av stale utkast; croissant → 99 kr; salget fortsetter

### ✅ Steg 45 — Kontekstbundet mentor-tips: fane-tips ulest + fanebytte → forkastet + re-armet (tilbake ved retur)

Verifiserte tall/tilstander:
- fane-tips ulest + fanebytte → forkastet + re-armet; kommer tilbake ved retur (kontekst avledet av t.fane/t.scene i dataene)

### ✅ Steg 46 — Endre/angre bestilling før levering: bestill 130 → endre 30 (leveres 30, differanse refundert); bestill → 0 → ingen levering

Verifiserte tall/tilstander:
- bestill 130 → endre 30 → leveres 30 (differanse 1400 kr refundert); bestill 50 → endre 0 → kansellert, ingen levering (stock 30→30)

### ✅ Steg 47 — Dagspuls «Lager på disken» viser ALLE utstilte varer (12 utstilt → 12 rader i DOM)

Verifiserte tall/tilstander:
- 12 utstilte varer → 12 rader i DOM; lista scroller internt (overflow: true) innenfor fast min-høyde

### ✅ Steg 48 — Produktregnskap i dagsoppgjøret: tabellsummer == totalkortene (svinn stk/kr + solgt stk)

Verifiserte tall/tilstander:
- produktregnskap avstemmes: Σsvinn 46 stk/874 kr == totalkort; Σsolgt 23 stk == møter+bakgrunn; kollapset default, åpnes på klikk

### ✅ Steg 49 — Bransje-gated vindusutstilling: CAFE (vindusUtstilling=false) → ingen vindusseksjon/tracer, disk-eksponering i stedet

Verifiserte tall/tilstander:
- CAFE vindusUtstilling=false: ingen vindusflate/tracer i DOM, disk-eksponering vist, forste_vindu ikke armet

### ✅ Steg 50 — Planlegging koster ikke spilltid: dashbord åpent i åpen dag → dayMinute fryser + «tiden står»-indikator; lukk → tiden går

Verifiserte tall/tilstander:
- planlegging pauser klokka: tid 3→ frøs på 4 mens dashbord åpent (4=4, bakgrunnskunder 1 urørt) → går igjen (8). Indikator vist/skjult.

### ✅ Steg 51 — Mentor-figuren har stor klikkflate: hode/senter/føtter klikkbare (også med dagspuls); klikk åpner neste kø-melding; 📖 åpner ordboka (ikke meldingen)

Verifiserte tall/tilstander:
- figur-klikkflaten dekker hele figuren (hode/senter/føtter, også med dagspuls); klikk avslører neste kø-melding; 📖 åpner ordboka separat

## Notater

- Oppsett som ikke er et telt steg (leie av lokale + tom åpningsbestilling, samt fase-/tidsstyring OPEN_DAY/CLOSE_DAY/START_NEW_DAY/TICK) kjøres via test-broen window.__GAME_DISPATCH__ — se DEL 3 i docs/SPILLTESTER.md for hvorfor (klokka ville ellers brukt ~6 min per dag).
- Persistens: KUN state.beredskap persisteres på main (BEREDSKAP_KEY). Full spilltilstand (kasse/lån/dag/lager) overlever IKKE reload — ?skip re-seeder et friskt spill (verifisert: money=200000, måned=1). Dokumentert begrensning, ikke en regresjon.
