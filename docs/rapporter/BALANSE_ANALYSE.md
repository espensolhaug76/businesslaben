# Balanseanalyse — etter REKALIBRERINGEN (spor-a pkt. 35)

**Forankring:** `docs/VERDENSMODELL.md` er fasit (byen, målbildet, lokal-stigen).
Dette dokumentet oppsummerer hva balansespilleren
(`tests/spilltest/balansespiller.spec.ts`) MÅLER etter rekalibreringen.

**Metode:** 3 spillmåneder (12 handledager/mnd) på **sentrum-l2** (referanse) og
**sentrum-l4** (billigst), 4 strategier, rykte 50, kundemøter skipet. Deterministisk
(`dagSeed`). **Månedsresultat er NETTO — etter eierlønn (40 000 kr/mnd) og etter
kampanjekostnad.** Rådata: `BALANSE_DATA.md` + `.json`.

---

## Bakgrunn: hvorfor rekalibrering

Før: inntektssiden var dimensjonert som en **kiosk** (~116 kunder/dag, ~5 900
kr/dag), kostnadssiden som en **bykafé** (husleie 45 000). Uten eierlønn og uten
ansatte landet en «fornuftig» drift på **+355 kr/mnd** — en usann virkelighet.
Konsekvens-pedagogikken krever riktig skala: en ekte norsk småbykafé (se
VERDENSMODELL §1), med eierlønn som en ekte fast kostnad.

---

## a) Hovedtabell — målbilde vs. målt (snitt/mnd)

### sentrum-l2 (referanse, husleie 45 000)

| Strategi | Kunder/dag | Oms/dag | **Nettoresultat/mnd** | Målbilde | Treff |
|---|--:|--:|--:|---|:--:|
| **Passiv** (åpner, ellers ingenting) | ~0 servert* | ~0 | **−87 000** | dypt minus | ✓ |
| **Fornuftig VG1 (solo)** | 153 | 12 100 | **+7 400 – +8 900** | +5–10k | ✓ |
| **Fornuftig + deltid** | 165 | 12 660 | **+4 800 – +5 700** | (tåler deltid) | ✓ |
| **Godt drevet** (ansatt + løpende mkf + kampanje) | 279 | 21 300 | **+28 500 – +29 400** | +25–40k | ✓ |

\* Passiv: ~105 i *etterspørsel* (tom disk → eksponeringsfaktor 0,7), men lageret
er tomt fra dag 2 → nesten alt tapt salg. Kassa går konkurs ~mnd 3.

### sentrum-l4 (billigst, husleie 36 000) — lokal-stigen

| Strategi | Kunder/dag | **Nettoresultat/mnd** | Lesning |
|---|--:|--:|---|
| Fornuftig VG1 (solo) | 135 | **+2 400 – +4 100** | billig lokale bæres trygt solo, lavere tak |
| Godt drevet | 220 | **−700 – −3 800** | over-bemannet for trafikken → tap (feil strategi for stedet) |

**Lærdom:** «godt drevet» lønner seg på et lokale med nok trafikk (l2: +29k), men
TAPER på et billig lavtrafikk-lokale (l4: −2k) fordi en fast ansatt (28 000) ikke
forsvares av trafikken. Match strategi til beliggenhet.

---

## b) Gammel vs. ny skala

| | Gammel (kiosk-inntekt) | Ny (rekalibrert kafé) |
|---|--:|--:|
| Snittkjøp | ~50 kr | **~79 kr** (kaffe 50 + bakst 50–57) |
| Fornuftig — kunder/dag | 116 | **153** (solo-tak ~160) |
| Fornuftig — oms/dag | ~5 900 | **~12 100** |
| Faste kostnader/mnd (solo) | ~47 000 | **~87 000** (inkl. eierlønn 40 000) |
| Fornuftig — resultat/mnd | +355 (uten eierlønn!) | **+8 000** (ETTER eierlønn) |
| Godt drevet — resultat/mnd | −28 000 (gammel modell) | **+29 000** |
| Startkapital (kafé) | 150 000 | **200 000** (~2,3 mnd runway) |

Nøkkelgrep (alle i `balance.ts` / katalog / `districts.ts`, motoren urørt):
- **Eierlønn 40 000/mnd** som fast linje (pkt. 3) — «overskudd» måles etter at
  eieren er betalt.
- **Basetrafikk** skalert (sentrum-l2 110→150) + **lokal-stige** (rentFactor og
  trafikk stiger sammen).
- **Priser** til kafénivå (snittkjøp ~50→~79) + litt høyere ferskvare-varekost
  (~35 %, kjøpt engros).
- **Solo-kapasitetstak ~160/dag** (junior 20/time) → «godt drevet» krever ansatte.
- **Løpende markedsføring** (`kampanje.lopende`) satt så moderat mkf + én kampanje
  gir positiv netto NÅR kapasiteten er bemannet.
- `baseMultiplier` **urørt** (1,0) — bevisst.

---

## c) Prising og priselastisitet (DEL 7 + 7f)

**Prising er elevens jobb.** Varene starter UPRISET (ingen «veiledende pris» i
UI-et). Referanseprisen beholdes i datalaget som `markedsPris` (markedsanker).
Balansespilleren priser via en INTERN referanseprisfunksjon (`markedsPris ×
prisMultiplikator`) — 1,0 = markedspris (normalstrategiene), 2,0 = GRÅDIG.

**Per-vare-elastisitet.** ratio = utsalgspris / markedsPris. Over marked følger
varen sin PROFIL (kurve, lineær interpolasjon, gulv 0); under marked stiger
gevinsten mot tak 1,15. Effekten virker på VARENS solgte volum — en overpriset
vare selger mindre/null ALENE; resten av sortimentet lever. Kundestrøm-nivået
beholder en DEMPET samlet priskomponent (snitt over prisede varer, halvt utslag)
så prisrespons ikke dobbelt-telles.

**Profil-kurver** (ratio → volumfaktor):

| Profil | 1,0× | 1,3× | 1,6× | ≥2,0× |
|---|--:|--:|--:|--:|
| HØY | 1,00 | 0,50 | 0,10 | 0,00 |
| MIDDELS | 1,00 | 0,70 | 0,30 | 0,05 |
| LAV | 1,00 | 0,85 | 0,50 | 0,20 |

**Kategori → profil (café):**

| Kategori | Profil | Begrunnelse | Eksempelvarer |
|---|---|---|---|
| `drikke` | **HØY** | dagligvare m/mange alternativer | kaffe, te, cappuccino, latte |
| `brod` | **HØY** | dagligvare | rundstykker, brød |
| `frokost` | **MIDDELS** | kos/impuls | croissant, kanelbolle, skolebrød |
| `lunsj` | **MIDDELS** | kos/impuls | wrap, sandwich |
| `kaker` | **LAV** | signatur/spesial, mindre prisfølsom | muffins, kaker, sesongvarer |
| *(nye/ukjent)* | MIDDELS | trygg default | — |

*Merk:* DEL-eksempelet lister «muffins» som MIDDELS og «kaker» som LAV, men
katalogens `kaker`-kategori dekker begge. Valgt kategori-mapping (`kaker` → LAV)
representerer LAV-profilen i café-sortimentet; en fremtidig `signatur`-kategori
eller per-vare-override kan skille muffins (MIDDELS) fra kaker (LAV) om ønskelig.

**GRÅDIG-kontroll** (som FORNUFTIG, men alle priser 2× marked): omsetningen
kollapser fra ~144 000 til ~22 000 kr/mnd (HØY-varene selger ~0) → netto
**~−107 000 kr/mnd** mot FORNUFTIGs +7 000. Assertert: GRÅDIG klart dårligere.

## Determinisme

FORNUFTIG @ sentrum-l2 kjøres to ganger i samme løp — månedstallene er IDENTISKE
(assertert i spec-en; testen feiler ellers).

## Reproduksjon

```bash
npx playwright test tests/spilltest/balansespiller.spec.ts
```

Skriver `BALANSE_DATA.md` (tabeller) + `.json` (rådata). ~6 min.
