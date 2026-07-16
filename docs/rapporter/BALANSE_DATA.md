# Balanseanalyse — «Hvor mye kan kaféen selge for, og kan en elev gå i pluss?»

> Auto-generert av `balansespiller.spec.ts` (`npx playwright test tests/spilltest/balansespiller.spec.ts`).
> Simulerer 3 spillmåneder (12 handledager/mnd) på **sentrum-l2** (husleie 45 000 kr/mnd)
> med 4 strategier. Deterministisk (bakgrunnssalget seedes av `dagSeed`). `balance.ts` er IKKE endret.

**Avgrensning:** måler BAKGRUNNSSALGET (volumet strategiene manipulerer). Kundemøtene
(pedagogikk) skipes, rykte holdes 50. Møtesalg er et lite bonuslag oppå, ikke modellert.

## a) Månedsresultat per strategi + beste dagsomsetning

| Strategi | Mnd | Omsetning | Varekost | Svinn | Bruttomargin | Faste (husleie/lønn/mkf/fors.) | **Månedsresultat** | Kasse | Beste dag |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| 1 · PASSIV (gulvet) | 1 | 3 480 | 1 080 | 0 | 2 400 | 47 000 (45 000/0/0/2 000) | **−44 600** | 105 400 | 2 739 |
| 1 · PASSIV (gulvet) | 2 | 0 | 0 | 0 | 0 | 47 000 (45 000/0/0/2 000) | **−47 000** | 58 400 | 0 |
| 1 · PASSIV (gulvet) | 3 | 0 | 0 | 0 | 0 | 47 000 (45 000/0/0/2 000) | **−47 000** | 11 400 | 0 |
| 2 · FORNUFTIG VG1 | 1 | 71 438 | 20 020 | 3 455 | 47 963 | 47 000 (45 000/0/0/2 000) | **963** | 149 763 | 6 190 |
| 2 · FORNUFTIG VG1 | 2 | 65 867 | 18 713 | 3 547 | 43 607 | 47 000 (45 000/0/0/2 000) | **−3 393** | 146 355 | 6 093 |
| 2 · FORNUFTIG VG1 | 3 | 66 457 | 18 963 | 3 597 | 43 897 | 47 000 (45 000/0/0/2 000) | **−3 103** | 143 522 | 6 227 |
| 3 · MAKS INNSATS | 1 | 99 768 | 28 100 | 3 970 | 67 698 | 92 000 (45 000/15 000/30 000/2 000) | **−24 302** | 123 463 | 8 543 |
| 3 · MAKS INNSATS | 2 | 91 815 | 26 049 | 3 921 | 61 845 | 92 000 (45 000/15 000/30 000/2 000) | **−30 155** | 93 203 | 8 457 |
| 3 · MAKS INNSATS | 3 | 92 211 | 26 221 | 3 929 | 62 061 | 92 000 (45 000/15 000/30 000/2 000) | **−29 939** | 63 549 | 8 648 |
| 4 · FORNUFTIG + KAMPANJE | 1 | 68 446 | 19 176 | 4 029 | 45 241 | 57 000 (45 000/0/10 000/2 000) | **−11 759** | 137 011 | 5 966 |
| 4 · FORNUFTIG + KAMPANJE | 2 | 63 231 | 17 989 | 4 091 | 41 151 | 57 000 (45 000/0/10 000/2 000) | **−15 849** | 121 147 | 5 831 |
| 4 · FORNUFTIG + KAMPANJE | 3 | 63 815 | 18 235 | 4 130 | 41 450 | 57 000 (45 000/0/10 000/2 000) | **−15 550** | 105 867 | 6 009 |

**Snitt månedsresultat (mnd 1–3) + beste observerte dagsomsetning per strategi:**

| Strategi | Snitt månedsresultat | Beste dagsomsetning | Snitt kunder/dag |
|---|--:|--:|--:|
| 1 · PASSIV (gulvet) | −46 200 | 2 739 | 77 |
| 2 · FORNUFTIG VG1 | −1 844 | 6 227 | 116 |
| 3 · MAKS INNSATS | −28 132 | 8 648 | 160 |
| 4 · FORNUFTIG + KAMPANJE | −14 386 | 6 009 | 111 |

## Determinisme

Strategi 2 kjørt to ganger: månedstallene er **IDENTISKE** ✅ (bevist ved re-kjøring i samme løp).
