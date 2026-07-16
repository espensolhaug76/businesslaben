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
| 2 · FORNUFTIG VG1 | 1 | 71 438 | 20 020 | 3 455 | 47 963 | 47 000 (45 000/0/0/2 000) | **963** | 147 723 | 6 190 |
| 2 · FORNUFTIG VG1 | 2 | 70 981 | 20 043 | 3 807 | 47 131 | 47 000 (45 000/0/0/2 000) | **131** | 147 974 | 6 093 |
| 2 · FORNUFTIG VG1 | 3 | 71 075 | 20 151 | 3 954 | 46 970 | 47 000 (45 000/0/0/2 000) | **−30** | 148 049 | 6 227 |
| 3 · MAKS INNSATS | 1 | 91 806 | 25 802 | 5 398 | 60 606 | 92 000 (45 000/15 000/30 000/2 000) | **−31 394** | 113 491 | 7 971 |
| 3 · MAKS INNSATS | 2 | 91 008 | 25 636 | 5 654 | 59 718 | 92 000 (45 000/15 000/30 000/2 000) | **−32 282** | 81 314 | 7 779 |
| 3 · MAKS INNSATS | 3 | 91 332 | 25 850 | 5 815 | 59 667 | 92 000 (45 000/15 000/30 000/2 000) | **−32 333** | 49 116 | 7 989 |
| 4 · FORNUFTIG + KAMPANJE | 1 | 69 045 | 19 337 | 3 898 | 45 810 | 56 999 (45 000/0/9 999/2 000) | **−11 189** | 135 556 | 5 998 |
| 4 · FORNUFTIG + KAMPANJE | 2 | 68 624 | 19 400 | 4 300 | 44 924 | 56 999 (45 000/0/9 999/2 000) | **−12 075** | 123 586 | 5 898 |
| 4 · FORNUFTIG + KAMPANJE | 3 | 68 728 | 19 490 | 4 405 | 44 833 | 56 999 (45 000/0/9 999/2 000) | **−12 166** | 111 555 | 6 073 |

**Snitt månedsresultat (mnd 1–3) + beste observerte dagsomsetning per strategi:**

| Strategi | Snitt månedsresultat | Beste dagsomsetning | Snitt kunder/dag |
|---|--:|--:|--:|
| 1 · PASSIV (gulvet) | −46 200 | 2 739 | 77 |
| 2 · FORNUFTIG VG1 | 355 | 6 227 | 118 |
| 3 · MAKS INNSATS | −32 003 | 7 989 | 151 |
| 4 · FORNUFTIG + KAMPANJE | −11 810 | 6 073 | 114 |

## Determinisme

Strategi 2 kjørt to ganger: månedstallene er **IDENTISKE** ✅ (bevist ved re-kjøring i samme løp).
