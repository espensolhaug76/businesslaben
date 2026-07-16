# Balanseanalyse — «Hvor mye kan kaféen selge for, og kan en elev gå i pluss?»

> Auto-generert av `balansespiller.spec.ts` (`npx playwright test tests/spilltest/balansespiller.spec.ts`).
> Simulerer 3 spillmåneder (12 handledager/mnd) på flere lokaler (billig + sentrum-l2), etter
> REKALIBRERINGEN (pkt. 35). Deterministisk (bakgrunnssalget seedes av `dagSeed`).

**Avgrensning:** måler BAKGRUNNSSALGET (volumet strategiene manipulerer). Kundemøtene
(pedagogikk) skipes, rykte holdes 50. **Månedsresultat er NETTO etter eierlønn (40 000) og
etter kampanjekostnad** (som trekkes fra kassa, ikke fra settlement.resultat).

## a) Månedsresultat per strategi × lokale

| Strategi @ lokale | Mnd | Kunder/dag | Omsetning | Varekost | Svinn | Faste (husleie/lønn/mkf/fors.) | Kampanje | **Nettoresultat** | Kasse |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| 1 · PASSIV (gulvet) @ sentrum-l2 | 1 | 105 | 5 220 | 1 640 | 0 | 87 000 (45 000/0/0/2 000) | 0 | **−83 420** | 116 580 |
| 1 · PASSIV (gulvet) @ sentrum-l2 | 2 | 105 | 0 | 0 | 0 | 87 000 (45 000/0/0/2 000) | 0 | **−87 000** | 29 580 |
| 1 · PASSIV (gulvet) @ sentrum-l2 | 3 | 105 | 0 | 0 | 0 | 87 000 (45 000/0/0/2 000) | 0 | **−87 000** | −57 420 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 1 | 153 | 144 142 | 46 800 | 2 724 | 87 000 (45 000/0/0/2 000) | 0 | **7 618** | 202 294 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 2 | 153 | 143 558 | 46 661 | 2 569 | 87 000 (45 000/0/0/2 000) | 0 | **7 328** | 209 692 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 3 | 153 | 143 160 | 46 344 | 3 810 | 87 000 (45 000/0/0/2 000) | 0 | **6 006** | 215 684 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 1 | 135 | 130 488 | 42 370 | 6 412 | 78 000 (36 000/0/0/2 000) | 0 | **3 706** | 198 312 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 2 | 135 | 128 465 | 41 795 | 6 483 | 78 000 (36 000/0/0/2 000) | 0 | **2 187** | 200 569 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 3 | 135 | 129 726 | 42 041 | 7 119 | 78 000 (36 000/0/0/2 000) | 0 | **2 566** | 203 093 |
| G · GRÅDIG (alle priser 2× marked) @ sentrum-l2 | 1 | 146 | 21 404 | 3 575 | 38 473 | 87 000 (45 000/0/0/2 000) | 0 | **−107 644** | 86 472 |
| G · GRÅDIG (alle priser 2× marked) @ sentrum-l2 | 2 | 146 | 22 536 | 3 766 | 38 282 | 87 000 (45 000/0/0/2 000) | 0 | **−106 512** | −20 040 |
| G · GRÅDIG (alle priser 2× marked) @ sentrum-l2 | 3 | 94 | 986 | 165 | 3 339 | 87 000 (45 000/0/0/2 000) | 0 | **−89 518** | −106 054 |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 1 | 165 | 151 283 | 49 052 | 1 200 | 96 000 (45 000/9 000/0/2 000) | 0 | **5 031** | 199 833 |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 2 | 165 | 150 539 | 48 861 | 1 083 | 96 000 (45 000/9 000/0/2 000) | 0 | **4 595** | 204 400 |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 3 | 165 | 150 353 | 48 616 | 2 238 | 96 000 (45 000/9 000/0/2 000) | 0 | **3 499** | 207 899 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 1 | 279 | 255 434 | 82 828 | 6 312 | 124 999 (45 000/28 000/9 999/2 000) | 12 000 | **29 295** | 219 251 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 2 | 279 | 253 961 | 82 290 | 7 102 | 124 999 (45 000/28 000/9 999/2 000) | 12 000 | **27 570** | 246 807 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 3 | 279 | 254 288 | 82 368 | 7 150 | 124 999 (45 000/28 000/9 999/2 000) | 12 000 | **27 771** | 274 620 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 1 | 220 | 212 226 | 68 921 | 17 349 | 115 999 (36 000/28 000/9 999/2 000) | 12 000 | **−2 043** | 187 745 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 2 | 220 | 213 030 | 69 191 | 17 051 | 115 999 (36 000/28 000/9 999/2 000) | 12 000 | **−1 211** | 186 506 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 3 | 220 | 211 335 | 68 509 | 18 293 | 115 999 (36 000/28 000/9 999/2 000) | 12 000 | **−3 466** | 183 040 |

**Snitt per strategi × lokale (mnd 1–3):**

| Strategi @ lokale | Snitt kunder/dag | Beste dagsomsetning | **Snitt nettoresultat/mnd** |
|---|--:|--:|--:|
| 1 · PASSIV (gulvet) @ sentrum-l2 | 105 | 5 220 | **−85 807** |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 153 | 12 598 | **6 984** |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 135 | 11 415 | **2 820** |
| G · GRÅDIG (alle priser 2× marked) @ sentrum-l2 | 129 | 3 010 | **−101 225** |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 165 | 13 226 | **4 375** |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 279 | 24 227 | **28 212** |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 220 | 20 626 | **−2 240** |

## Determinisme

FORNUFTIG @ sentrum-l2 kjørt to ganger: månedstallene er **IDENTISKE** ✅ (bevist ved re-kjøring i samme løp).
