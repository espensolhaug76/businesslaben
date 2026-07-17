# VERDENSMODELL — økonomisk og fysisk forankring for AdVenture

> **Dette dokumentet er FASIT for all balansering.** Alle tall i `balance.ts`,
> `districts.ts`, medierekkevidde (`kampanje.ts`) og fremtidig sesongmekanikk
> (Tema 15) skal kunne spores tilbake hit. Endrer du en spillverdi: forankre den
> her først, ellers driver økonomien fra virkeligheten igjen.
>
> Skrevet under REKALIBRERINGEN (spor-a pkt. 35). Bakgrunn: inntektssiden var
> dimensjonert som en kiosk, kostnadssiden som en bykafé — «+355 kr/mnd overskudd
> uten eierlønn og uten ansatte» var en usann virkelighet. Konsekvens-pedagogikken
> krever riktig skala.

---

## 1. Byen

- **Innbyggere:** ~30 000 (Lillehammer-klasse norsk småby).
- **Struktur:** hovedgate/gågate i sentrum, torg, stasjonsområde, ytre bydeler.
- **Gangtrafikk hovedgate/gågate:** **3 000–5 000 forbipasserende per hverdag.**
- **Fangst:** en synlig, godt drevet kafé fanger **4–7 %** av de forbipasserende
  → **~150–300 kunder/dag** avhengig av beliggenhet, synlighet og drift.
- **Snittkjøp:** **70–85 kr** (en kaffe + et bakverk, eller to enklere varer).
  Norsk kafénivå 2024: kaffe/americano ~45–55, cappuccino/latte ~55–65, bakverk
  ~45–55 kr. Spillets snittkunde kjøper ~1,5 varer.

### Referansebedrifter (reelle — KUN dokument-ankere, ALDRI i spillet)

Disse forankrer skalaen. De opptrer **aldri** som aktører, navn eller assets i
spillmekanikken (jf. CLAUDE.md — leverandører/kunder/konkurrenter er fiktive).

| Bedrift | Omsetning/år | ≈ per dag | Merk |
|---|--:|--:|---|
| Granum Bakeri | ~12,3 mill. | ~40 000 kr | egen produksjon + engros |
| Lillehammer Bakeri | ~23 mill. | ~75 000 kr | stor, egen produksjon + engros |

**Spillkaféen er MINDRE enn disse** — den har ingen egen produksjon og ingen
engros/grossistledd, kun servering/videresalg. Den skal derfor ligge **klart
under** Granum: en godt drevet spillkafé topper på ~20 000–24 000 kr/dag
(~5–6 mill./år), en fornuftig solo-drift ~12 000–14 000 kr/dag.

### Medierekkevidde (forankrer `kampanje.ts` og Tema 8)

| Kanal | Daglig dekning | ≈ personer (30 000) | I spillet |
|---|--:|--:|---|
| Byposten (lokalavis) | ~29 % | ~8 700 lesere | fiktivt medium `byposten` |
| Radio Innlandet (lokalradio) | ~31 % | ~9 300 lyttere | fiktivt medium `radio-innlandet` |

Sosiale medier-tall (TikTok/Instagram/Snapchat/Facebook) kommer fra Ipsos
SoMe-tracker (se `kampanje.ts` — ekte plattformnavn brukt som faktabasert
undervisningsdata, aldri som spillaktør).

### Tid

- **Spillmåned = 12 handledager.** ALLE dagstall × 12 gir månedstall.
- **Spilluke ≈ 6 handledager** (halv spillmåned) — brukes av turistsesongen.
- Åpningstid 09:00–17:00 (8 timer).

### Sesong (Tema 15 Reiseliv) — antagelse

En Lillehammer-klasse småby har markert **sesongturisme** (vinteridrett/OL-arv,
sommer-/hyttesesong). Antagelse i modellen (`balance.ts.turistsesong`, tunbart):

- **Turistsesong varer ~14 handledager** (~2–3 spilluker). Læreren styrer den
  gjennom tema-aktiveringen: når `reiseliv`-temaet slås på (samme RTDB-kontrakt
  som de andre temaene — INGEN egen node), starter en sesong automatisk fra den
  dagen. (Valgt fordi det er enklest innenfor `temaAktivering`-kontrakten; en
  dev-knapp kan restarte for testing/demonstrasjon.)
- **I sesong: +20 % trafikk** (tilreisende oppå den vanlige strømmen), og **~30 %
  av kundene er turister**. Realistisk størrelsesorden for en småby der reiseliv
  er en merkbar, men ikke dominerende, del av handelen.
- **Turister vrir etterspørselen** mot kaffe (drikke) og kaker (grab-and-go,
  spisekultur på farten) — pick-vekt drikke ×1,6, kaker ×1,5. Konsekvens for
  elevens bestilling (aldri forklart på forhånd — kobling til Tema 4 Verdikjeden).

---

## 2. MÅLBILDE (tuning-fasit)

Dette er fasit for rekalibreringen. `balance.ts`/`districts.ts` tunes til at
balansespilleren (`tests/spilltest/balansespiller.spec.ts`) treffer disse radene
på minst to lokaler (billig + `sentrum-l2`), rykte 50, møter skipet.

| | **Passiv** | **Fornuftig VG1 (solo)** | **Godt drevet (ansatt + kampanje)** |
|---|--:|--:|--:|
| **Kunder/dag** | ~60 | 150–180 | 250–300 |
| **Dagsomsetning** | ~3 000 | 12 000–14 000 | 20 000–24 000 |
| **Bemanning** | solo | solo, tåler deltid | 1–2 ansatte NØDVENDIG |
| **Mnd-resultat ETTER eierlønn** | dypt minus | +5 000–10 000 | +25 000–40 000 |

**Prinsipper bak tallene:**

- **Passiv skal ALDRI kunne gå i pluss.** Åpner, gjør ellers ingenting → tomt
  lager fra dag 2, nesten alt blir tapt salg. Gulvet.
- **Solo-kapasitetstaket er ~150 kunder/dag.** Man driver ikke en kafé alene ut
  over dette — «godt drevet» (250–300) er derfor UMULIG uten ansatte. Dette er
  selve poenget: bemanning er en NØDVENDIGHET, ikke en luksus.
- **Eierlønn (40 000 kr/mnd) er en fast kostnad**, ikke valgfri. Eierens arbeid
  er aldri gratis. «Overskudd» måles ETTER eierlønn (se `balance.ts.eierlonnMnd`
  og pkt. 3 i spor-a).
- **Eksponering er den største GRATIS spaken** (fyll disken), kapasitet er et
  TAK, markedsføring har avtagende avkastning (metning). Strukturen beholdes;
  bare skalaen justeres.

**Verifisert (balansespiller, sentrum-l2, rykte 50, møter skipet — snitt/mnd):**

| Rad | Målbilde | Målt @ sentrum-l2 |
|---|--:|--:|
| Passiv — resultat | dypt minus | **−87 000** (konkurs ~mnd 3) ✓ |
| Fornuftig solo — kunder/dag | 150–180 | **153** ✓ |
| Fornuftig solo — oms/dag | 12–14k | **12 100** ✓ |
| Fornuftig solo — resultat | +5–10k | **+7,4–8,9k** ✓ |
| Godt drevet — kunder/dag | 250–300 | **279** ✓ |
| Godt drevet — oms/dag | 20–24k | **21 300** ✓ |
| Godt drevet — resultat | +25–40k | **+28,5–29,4k** ✓ |

Alle rader innenfor intervallene. «Godt drevet» (1 ansatt + løpende mkf + én
kampanje/mnd via ekte Tema 8-mekanikk) er ~3,5× så lønnsom som solo — bemanning
+ markedsføring lønner seg NÅR kapasiteten er der. Passiv går konkurs.

---

## 3. Lokal-stigen (`districts.ts` + `balance.ts.basetrafikk`)

Dyrere lokale = mer basetrafikk, **konsekvent** — ingen «gratis vinner». Husleie
(`districts.ts`: `leieniva × rentFactor`) og basetrafikk (`balance.ts`) stiger
SAMMEN, slik at flere strategier er levedyktige:

- **Billig lokale / lav trafikk:** kan bæres solo (lav husleie, trafikk under
  solo-taket). Trygt, men lavt tak på inntjening.
- **Dyrt lokale / høy trafikk:** krever bemanning (trafikk over solo-taket →
  ubetjente kunder blir kø/tap uten ansatte), men gir høyest inntjening NÅR det
  er bemannet.

Sentrum (`leieniva` 45 000, husleie = `round(leieniva × rentFactor / 100) × 100`,
se `districts.ts`). Basetrafikk (`balance.ts`) er MONOTON med rentFactor — dyrere
lokale = mer trafikk, konsekvent:

| Lokale | Navn | rentFactor | Husleie/mnd | Basetrafikk/dag | Bæres solo? |
|---|---|--:|--:|--:|:--|
| sentrum-l4 | Gågata 16 | 0,80 | 36 000 | 118 | **ja** — billigst, trafikk under solo-taket |
| sentrum-l7 | Torggata 5 | 0,85 | 38 300 | 125 | ja |
| sentrum-l3 | Gågata 14 | 0,90 | 40 500 | 132 | ja |
| sentrum-l6 | Torggata 3 | 0,95 | 42 800 | 140 | ja (nær taket) |
| sentrum-l2 | Gågata 12 | 1,00 | 45 000 | 150 | **på taket** (REFERANSE) |
| sentrum-l1 | Hjørnelokalet v/torget | 1,20 | 54 000 | 175 | **nei** — kø uten bemanning |
| sentrum-l5 | Torggata 1 | 1,25 | 56 300 | 195 | **nei** — krever bemanning |

**Lesning:** billig + lav trafikk (l4) bæres trygt solo (~+2–4k/mnd), men har lavt
tak. Dyrt + høy trafikk (l1/l5) gir kø og TAP solo (trafikken overstiger
solo-taket ~150–160), men BEST inntjening når det er bemannet. Ingen «gratis
vinner» — flere strategier er levedyktige. (Verifisert i balansespilleren på l2 +
l4, se `BALANSE_ANALYSE.md`.)

---

## 4. Bevisste forenklinger (VG1)

- **Ingen arbeidsgiveravgift/feriepenger på eierlønn eller lønn på VG1.** Eierlønn
  er ETT tall (40 000 kr/mnd), ingen sosiale kostnader. Dette er en bevisst
  didaktisk forenkling — VG1 skal forstå at eierens arbeid koster, ikke regne
  påslag. (En senere VG2/VG3-modul kan legge på arbeidsgiveravgift ~14,1 % +
  feriepenger ~12 % hvis ønskelig — noteres her når/hvis det bygges.)
- **Startkapital** vurderes mot ny skala (større varekjøp + eierlønn) i DEL 4.

---

## 5. Endringslogg (forankring)

- **2026-07 — Rekalibrering (spor-a pkt. 35):** dokumentet opprettet. Inntektsside
  skalert til målbildet, eierlønn innført som fast linje, lokal-stigen reparert.
  Gammel «kiosk-inntekt / bykafé-kostnad»-skjevhet rettet.
