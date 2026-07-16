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
| 1 · PASSIV (gulvet) @ sentrum-l2 | 1 | 105 | 5 220 | 1 640 | 0 | 87 000 (45 000/0/0/2 000) | 0 | **−83 420** | 66 580 |
| 1 · PASSIV (gulvet) @ sentrum-l2 | 2 | 105 | 0 | 0 | 0 | 87 000 (45 000/0/0/2 000) | 0 | **−87 000** | −20 420 |
| 1 · PASSIV (gulvet) @ sentrum-l2 | 3 | 105 | 0 | 0 | 0 | 87 000 (45 000/0/0/2 000) | 0 | **−87 000** | −107 420 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 1 | 153 | 145 604 | 47 252 | 2 468 | 87 000 (45 000/0/0/2 000) | 0 | **8 884** | 153 518 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 2 | 153 | 144 651 | 46 908 | 2 966 | 87 000 (45 000/0/0/2 000) | 0 | **7 777** | 161 407 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 3 | 153 | 144 576 | 46 809 | 3 401 | 87 000 (45 000/0/0/2 000) | 0 | **7 366** | 168 899 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 1 | 135 | 130 906 | 42 502 | 6 336 | 78 000 (36 000/0/0/2 000) | 0 | **4 068** | 148 646 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 2 | 135 | 129 822 | 42 145 | 6 721 | 78 000 (36 000/0/0/2 000) | 0 | **2 956** | 151 714 |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 3 | 135 | 129 789 | 42 009 | 7 417 | 78 000 (36 000/0/0/2 000) | 0 | **2 363** | 154 161 |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 1 | 165 | 152 194 | 49 304 | 1 214 | 96 000 (45 000/9 000/0/2 000) | 0 | **5 676** | 150 422 |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 2 | 165 | 151 387 | 49 019 | 1 583 | 96 000 (45 000/9 000/0/2 000) | 0 | **4 785** | 155 291 |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 3 | 165 | 151 866 | 49 161 | 1 511 | 96 000 (45 000/9 000/0/2 000) | 0 | **5 194** | 160 597 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 1 | 279 | 256 513 | 83 009 | 7 069 | 124 999 (45 000/28 000/9 999/2 000) | 12 000 | **29 436** | 169 378 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 2 | 279 | 255 148 | 82 637 | 7 035 | 124 999 (45 000/28 000/9 999/2 000) | 12 000 | **28 477** | 197 883 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 3 | 279 | 255 877 | 82 792 | 7 244 | 124 999 (45 000/28 000/9 999/2 000) | 12 000 | **28 842** | 226 949 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 1 | 220 | 213 761 | 69 404 | 17 048 | 115 999 (36 000/28 000/9 999/2 000) | 12 000 | **−690** | 139 042 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 2 | 220 | 212 593 | 68 971 | 17 705 | 115 999 (36 000/28 000/9 999/2 000) | 12 000 | **−2 082** | 137 044 |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 3 | 220 | 211 273 | 68 447 | 18 621 | 115 999 (36 000/28 000/9 999/2 000) | 12 000 | **−3 794** | 133 362 |

**Snitt per strategi × lokale (mnd 1–3):**

| Strategi @ lokale | Snitt kunder/dag | Beste dagsomsetning | **Snitt nettoresultat/mnd** |
|---|--:|--:|--:|
| 1 · PASSIV (gulvet) @ sentrum-l2 | 105 | 4 970 | **−85 807** |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l2 | 153 | 12 731 | **8 009** |
| 2 · FORNUFTIG VG1 (solo) @ sentrum-l4 | 135 | 11 316 | **3 129** |
| 3 · FORNUFTIG + DELTID @ sentrum-l2 | 165 | 13 536 | **5 218** |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l2 | 279 | 24 634 | **28 918** |
| 4 · GODT DREVET (bemannet + mkf + kampanje) @ sentrum-l4 | 220 | 20 835 | **−2 189** |

## Determinisme

FORNUFTIG @ sentrum-l2 kjørt to ganger: månedstallene er **IDENTISKE** ✅ (bevist ved re-kjøring i samme løp).
