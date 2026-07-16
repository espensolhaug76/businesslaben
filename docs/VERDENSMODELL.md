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
- Åpningstid 09:00–17:00 (8 timer). Sesongmekanikk (Tema 15) skalerer
  basetrafikken per måned — forankres her når den bygges.

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

Sentrum (`leieniva` 45 000). Stigen (fylles inn med endelige tall i DEL 5):

| Lokale | Navn | rentFactor | Husleie | Basetrafikk/dag | Bæres solo? |
|---|---|--:|--:|--:|:--|
| sentrum-l4 | Gågata 16 | (DEL 5) | (DEL 5) | (DEL 5) | ja |
| sentrum-l3 | Gågata 14 | (DEL 5) | (DEL 5) | (DEL 5) | ja |
| sentrum-l2 | Gågata 12 | (DEL 5) | (DEL 5) | (DEL 5) | på taket |
| sentrum-l1 | Hjørnelokalet ved torget | (DEL 5) | (DEL 5) | (DEL 5) | nei (krever bemanning) |
| sentrum-l5 | Torggata 1 | (DEL 5) | (DEL 5) | (DEL 5) | nei (krever bemanning) |

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
