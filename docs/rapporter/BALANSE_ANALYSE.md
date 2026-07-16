# Balanseanalyse — «Hvor mye kan kaféen selge for, og kan en elev gå i pluss?»

**Metode:** `tests/spilltest/balansespiller.spec.ts` simulerer **3 spillmåneder
(12 handledager/mnd)** på **sentrum-l2** (husleie 45 000 kr/mnd) med 4 strategier
og logger økonomien per dag/måned. Drevet via spilltest-broen (deterministisk —
bakgrunnssalget seedes av `dagSeed`). Rådata: `docs/rapporter/BALANSE_DATA.md` +
`.json`.

> **OPPDATERT (balansefiks + Tema 8-integrasjon på `main`):** §a–§d er den
> OPPRINNELIGE analysen (FØR-tilstand, gammel markedsføringsmodell) og beholdes
> som begrunnelse. Det som faktisk ble gjort står i **«Status etter balansefiks»**
> rett under. Kort: §d pkt 3 (månedsskifte-hullet) er FIKSET; §d pkt 2
> (`markedsforingSkala`) er UTGÅTT — Tema 8 DEL D erstattet hele den flate
> skala-modellen med en per-kanal-modell (`lopendeMarkedsforingsfaktor`), så
> skala-verdien ble død kode og er fjernet; §d pkt 1 (`baseMultiplier`) ble
> BEVISST ikke gjort.

**Avgrensning (viktig):** analysen måler **bakgrunnssalget** — volumet de fire
strategiene faktisk manipulerer (eksponering, pris, bemanning, markedsføring).
**Kundemøtene (pedagogikk-laget) skipes**, og **rykte holdes 50** (ryktefaktor
1,0). Møtesalg + rykteløft er et lite bonuslag oppå og er *ikke* medregnet — så
tallene under er en **pessimistisk «fornuftig-uten-møteflaks»-bunn**. Se §3 om
hva møtene gjør.

---

## Status etter balansefiks (på `main`, etter Tema 8-merge) — før/etter

**Hva som ble gjort:**

- **DEL 1 — månedsskifte-hullet tettet** (kode): en ordre lagt siste handledag
  fikk `ankomstDag = 13` og strandet (betalt, aldri levert) → dag 1 i ny måned
  startet med tom ferskvaredisk. Nå WRAPPES `ankomstDag` over månedsskiftet
  (`ORDER_PRODUCT`) → ankomst dag 1 i ny måned. (§d pkt 3.)
- **`markedsforingSkala`-forslaget UTGÅTT + død kode fjernet.** Tema 8 DEL D
  koblet trafikkmodellen fra den flate `markedsforingsfaktor(markedsforingSkala)`
  til `lopendeMarkedsforingsfaktor` (per kanal × målgruppe-treff, tunet i
  `BALANCE.kampanje.lopende`). Den gamle funksjonen + `markedsforingMin/Max/Skala`
  hadde da null lesere og er fjernet. Balansefiks-DEL 2 (skala 100k→40k) ble en
  no-op og ble droppet. (§d pkt 2 er dermed uaktuell.)
- **`baseMultiplier` urørt** (1,0) — møte-engasjement (rykte) skal være det som
  tipper en fornuftig elev til pluss. (§d pkt 1 ikke gjort.)

> **NB — les tallene riktig:** markedsføringsmodellen er NY og **ikke rekalibrert
> ennå** (`BALANCE.kampanje.lopende` er satt for kampanje-mekanikken, ikke
> finpusset for løpende drift). MAKS/KAMPANJE-tallene under er derfor
> **«ny modell, før rekalibrering»** — de skal MÅLES riktig her, ikke tolkes som
> en endelig balansedom. Rekalibrering er en egen jobb.

**Månedsresultat per strategi — FØR (opprinnelig, §a) vs. ETTER (på main):**

| Strategi | Mnd 1 | Mnd 2 | Mnd 3 | **Snitt FØR** | **Snitt ETTER** |
|---|--:|--:|--:|--:|--:|
| **PASSIV** | −44 600 → −44 600 | −47 000 → −47 000 | −47 000 → −47 000 | −46 200 | **−46 200** (uendret) |
| **FORNUFTIG VG1** | +963 → +963 | −3 393 → **+131** | −3 103 → **−30** | −1 844 | **+355** |
| **MAKS INNSATS** | −24 302 → −31 394 | −30 155 → −32 282 | −29 939 → −32 333 | −28 132 | −32 003 |
| **FORNUFTIG + KAMPANJE** | −11 759 → −11 189 | −15 849 → −12 075 | −15 550 → −12 166 | −14 386 | −11 810 |

**Konklusjon:**
- **FORNUFTIG: fra ~−1 800/mnd til ~+355/mnd — ≥ 0 fra måned 2.** Pedagogikk-målet
  holder: en fornuftig VG1-elev kan gå i pluss uten møteflaks. Gevinsten kommer
  **utelukkende fra DEL 1** (fyllere ferskvaredisk dag 1 i nye måneder) — FORNUFTIG
  bruker 0 markedsføring, og tallene er BYTE-IDENTISKE med og uten den nye
  markedsføringsmodellen (verifisert). Markedsføringsmodellen påvirker den ikke.
- **PASSIV: uendret dypt negativ (−46 200/mnd).** Gulvet står — problemet er tomt
  lager, ikke trafikk.
- **MAKS/KAMPANJE: mer negative enn den gamle modellen ga.** Ikke en regresjon i
  drift, men et modellskifte: den nye per-kanal-modellen gir (med dagens
  u-rekalibrerte `lopende`-verdier + budsjett spredt på 3 kanaler) mindre løft per
  krone enn den gamle flate skala-faktoren gjorde. Dette er nettopp signalet til
  rekalibreringsjobben. Markedsføring er fortsatt en netto kostnad her — som før
  begrenset av bemannings-taket (§c spak 3).

*(Determinisme bekreftet: strategi 2 kjørt to ganger, identiske tall — assertert i
spec-en. Rådata regenerert i `BALANSE_DATA.md`/`.json`.)*

---

## a) Månedsresultat per strategi + beste dagsomsetning

| Strategi | Mnd 1 | Mnd 2 | Mnd 3 | Snitt/mnd | Snitt kunder/dag | Beste dagsomsetning |
|---|--:|--:|--:|--:|--:|--:|
| **1 · PASSIV** (åpner, ellers ingenting) | −44 600 | −47 000 | −47 000 | **−46 200** | 77* | 2 739 (kun dag 1) |
| **2 · FORNUFTIG VG1** (påfyll, 4 trau, solo, veiled. pris) | **+963** | −3 393 | −3 103 | **−1 844** | 116 | 6 227 |
| **3 · MAKS INNSATS** (full eksp. + 30k mkf + bemanning) | −24 302 | −30 155 | −29 939 | **−28 132** | 160 | 8 648 |
| **4 · FORNUFTIG + KAMPANJE** (som 2 + 10k mkf/mnd) | −11 759 | −15 849 | −15 550 | **−14 386** | 111 | 6 009 |

\* PASSIV: 77 kunder er *etterspørselen*, men lageret er tomt fra dag 2 (ingen
påfyll) → nesten alt blir tapt salg (137 436 kr tapt over 3 mnd).

**Detaljer for en typisk «god dag»** (bakgrunnssalg, sentrum-l2, rykte 50):

| Strategi | Omsetning | Varekost | Svinn | Kunder | Dagsmargin |
|---|--:|--:|--:|--:|--:|
| FORNUFTIG | 6 227 | 1 809 | 351 | 118 | **4 067** |
| MAKS | 8 648 | 2 508 | 402 | 164 | **5 738** |
| KAMPANJE | 6 009 | 1 755 | 405 | 113 | **3 849** |

**Kortsvar på «hvor mye kan kaféen selge for?»**
En rimelig drevet kafé (FORNUFTIG) omsetter **~5 500 kr/dag ≈ 66 000 kr/mnd**
(~116 kunder/dag). Med full innsats (MAKS) kan omsetningen presses til
**~8 600 kr på en god dag / ~92 000–100 000 kr/mnd** — men det er *omsetning*,
ikke *overskudd* (se under).

**Kortsvar på «kan en elev gå i pluss?»**
- **Passiv elev: nei, aldri.** −46 000 til −47 000 kr/mnd. Riktig «gulv».
- **Fornuftig VG1-elev: på vippepunktet.** Så vidt i pluss første måned (+963),
  så vidt i minus deretter (~−3 000). Snitt **−1 844 kr/mnd** — praktisk talt
  break-even. Med gode kundemøter (rykte → 55) eller uten «måneds­skifte-hullet»
  (§b) tipper det til pluss.
- **Maks innsats: mest i minus (−28 000/mnd)** — selv om den har HØYEST
  omsetning. Markedsføring (30k) + bemanning (15k) koster mye mer enn de drar inn.
- **Fornuftig + kampanje: −14 000/mnd** — kampanjen (10k) gjør det VERRE, ikke
  bedre (se §c, spak 4).

Nøkkelbudskap: **høy omsetning ≠ overskudd.** MAKS selger 50 % mer enn FORNUFTIG,
men taper ~26 000 kr mer i måneden.

---

## b) Break-even: hvilken husleie tåler hver strategi?

Månedlig **bruttomargin** (omsetning − varekost − svinn) må dekke de faste
kostnadene. Faste = husleie + forsikring (2 000) + lønn + markedsføring. Løser vi
for høyeste husleie som gir resultat ≥ 0:

| Strategi | Bruttomargin/mnd | Faste utenom husleie (forsikr.+lønn+mkf) | **Maks husleie den tåler** | sentrum-l2 (45 000)? |
|---|--:|--:|--:|:--|
| PASSIV | ~800 | 2 000 | **−1 200** (tåler ingen husleie) | Nei, konkurs overalt |
| FORNUFTIG | ~45 000 | 2 000 | **~43 200 kr** | **Nei — mangler ~1 800/mnd** |
| KAMPANJE | ~42 600 | 12 000 | **~30 600 kr** | Nei (10k mkf spiser opp taket) |
| MAKS | ~63 900 | 47 000 | **~16 900 kr** | Nei (bemanning+mkf spiser opp taket) |

**Er sentrum-l2 (45 000 kr) mulig å gå i pluss på — og etter hvor mange måneder?**
- **FORNUFTIG:** nesten. Break-even-husleien er ~43 200, så sentrum-l2 ligger
  ~1 800 kr/mnd for høyt (ved rykte 50, møter skipet). Kassa holder seg flat
  (~145 000) — eleven går verken konkurs eller i pluss, den **akkumulerer aldri
  overskudd** ved dette lokalet. Tipper til svakt pluss (~+400/mnd) ved rykte 55,
  eller ~+1 500/mnd hvis månedsskifte-hullet (§d) tettes.
- **De tre andre:** nei, uansett antall måneder — de brenner kasse hver måned
  (MAKS er tom for kasse allerede i måned 3: −74 456 kr → reelt konkurs).

**Viktig struktur:** de mest trafikkerte lokalene treffer **bemannings-taket**
(solo betjener ~120 kunder/dag). Der platår FORNUFTIG-marginen på ~45 000 kr
uansett — så det **billigste høytrafikk-lokalet vinner**. Lavere-trafikk-lokaler
faller under taket, og marginen synker proporsjonalt med basetrafikken. Netto:
balansen er bevisst trimmet slik at en fornuftig kafé lander **rundt null** (jf.
`balance.ts`-kommentaren «månedsresultat rundt null mot ~47 000 faste») — det
finnes ikke ett «trygt» lokale som gir komfortabelt overskudd for solo-drift.

---

## c) De mest virksomme spakene (hva flyttet resultatet mest)

Rangert etter effekt på **resultatet** (ikke bare omsetning):

1. **Vareeksponering (fyll trauene) — størst POSITIV spak, og gratis.**
   Eksponeringsfaktoren går fra **0,7 (tom disk) til 1,15 (4 fylte plasser)** =
   **+64 % kunder**. Det er hele forskjellen mellom PASSIV-gulvet (77 kunder) og
   FORNUFTIG (116). Å fylle disken koster ingenting og er den enkeltspaken som
   løfter resultatet mest.

2. **Lokale/husleie — dominerer kostnadssiden.** Husleia på sentrum-l2 (45 000)
   er ~alene like stor som HELE FORNUFTIG-marginen. Lokalvalget avgjør
   levedyktigheten mer enn noe annet på kostnadssiden. (NB: husleie bor i
   `districts.ts`, ikke `balance.ts`.)

3. **Bemanningskapasitet er et TAK, ikke en motor.** Solo betjener ~120
   kunder/dag. Under taket hjelper eksponering/markedsføring; **over taket er de
   bortkastet** — ekstra kunder havner i kø (tapt salg), ikke i kassa. Derfor gir
   KAMPANJE (10k mkf, men fortsatt solo-tak 120) **ingen ekstra solgte varer** —
   bare 10 000 kr i ekstra kostnad.

4. **Markedsføring — NEGATIV spak slik den er skrudd nå.** `markedsforingSkala =
   100 000` betyr at faktoren først når taket (1,3 = +30 %) ved **30 000 kr/mnd**
   forbruk. +30 % kunder på ~45 000 margin = ~+13 500 kr, men koster 30 000 →
   **taper ~16 500 kr/mnd** (MAKS). Ved 10 000 kr (KAMPANJE) er faktoren 1,1, men
   kundene over kapasitetstaket blir kø → nær null ekstra salg, −10 000 kr netto.
   **Hver markedsføringskrone gir < 1 krone tilbake** ved dagens skala/volum.

5. **Svinn (ferskvare) — sekundær kostnad.** ~3 500 kr/mnd for FORNUFTIG
   (bakverk som ikke selges kastes ved stenging). Håndterbart ved å ikke
   overfylle bakevare-lageret; kaffe (holdbar) svinner aldri.

**Rekkefølge for en elev:** fyll disken (1) → velg riktig lokale (2) → hold
lageret fylt → *ikke* betal for markedsføring/bemanning før kapasiteten faktisk
er flaskehalsen og marginen tåler det.

---

## d) Tuning-FORSLAG (verdier i `balance.ts`) — hvis pedagogikk-målet skal holde

Pedagogikk-målet: **«fornuftig VG1-innsats skal kunne gå i pluss, passiv skal
ikke.»** Status i dag: **passiv-delen HOLDER** (−46 000/mnd, klart negativt).
**Fornuftig-delen bommer så vidt** — den lander på ~−1 800 kr/mnd (rundt null,
svakt negativt) ved rykte 50 og skipede møter. Forslag (ETT lite dytt holder —
dette er forslag, ikke endringer):

1. **`baseMultiplier: 1.0 → ~1.08` (anbefalt).** Løfter all bakgrunnstrafikk
   ~8 %. FORNUFTIG-margin ~45 000 → ~48 700 → resultat **~+1 700 kr/mnd (pluss)**.
   PASSIV forblir dypt negativ (dens problem er tomt lager, ikke trafikk) → målet
   holder begge veier. Enkraftig, treffer alle lokaler likt.

2. **`markedsforingSkala: 100 000 → ~40 000`** (sekundært). Da når
   markedsføringsfaktoren taket ved ~12 000 kr i stedet for 30 000 → markedsføring
   blir mindre ruinerende, så MAKS/KAMPANJE ikke straffes så hardt. Fikser ikke
   fornuftig (som ikke bruker mkf), men gjør «satse på markedsføring» til et
   forsvarlig valg i stedet for en felle. Vurder sammen med at kapasitet
   (bemanning) må matche — ellers er markedsføring uansett bortkastet (spak 3).

3. **IKKE en `balance.ts`-verdi, men flagges:** **måneds­skifte-hullet.** En
   bestilling lagt på siste handledag (dag 12) får `ankomstDag = 13`, som aldri
   inntreffer (dayNumber resettes til 1 ved månedsrull) → ordren **strander og
   betales for uten å ankomme**, og **dag 1 i hver nye måned har tom
   ferskvare-disk** (eksponering faller til 0,7, mye tapt salg). Dette koster
   FORNUFTIG ~1 «dårlig dag»/mnd (~3 500 kr) og er selve grunnen til at måned 2–3
   er svakt negative mens måned 1 (med åpningslager) er positiv. Å tette dette
   (leveringslogikk i `START_NEW_DAY`/`dayConfig`, utenfor `balance.ts`) ville
   alene tippe FORNUFTIG til pluss uten å røre trafikk-balansen.

**Merk om rykte:** ved rykte **55** (en elev som spiller kundemøtene godt) er
ryktefaktoren 1,05 → FORNUFTIG allerede ~+400 kr/mnd. Så for en elev som ENGASJERER
seg i pedagogikken (møtene) er målet trolig allerede nådd; forslag 1 sikrer at
også en fornuftig-men-møtesvak elev så vidt klarer pluss.

---

## Determinisme

Strategi 2 (FORNUFTIG) ble kjørt **to ganger i samme løp** — månedstallene er
**IDENTISKE** (assertert i spec-en; testen feiler ellers). Bakgrunnssalget er
deterministisk via `dagSeed`; `Math.random` seedes i tillegg (mulberry32) for
godt mål. To separate kjøringer gir samme tall.

## Reproduksjon

```bash
npx playwright test tests/spilltest/balansespiller.spec.ts
```

Skriver `docs/rapporter/BALANSE_DATA.md` (tabeller) + `BALANSE_DATA.json`
(per-dag/mnd rådata). ~9 min (4 strategier × 3 mnd + determinisme-kontroll).
