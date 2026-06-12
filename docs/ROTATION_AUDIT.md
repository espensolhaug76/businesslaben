# ROTATION_AUDIT — facing-revisjon (ORIENTERINGS-PASS, 2026-06-12)

Kameraet viser SE- (skjerm ned-høyre) og SW-fasaden (ned-venstre). Hver
BD/kvartal får facing utledet av `facingOf()` i CityScene.ts: nærmeste
gate på en kamera-synlig side vinner (SW prioriteres ved likhet — de
øst-vestlige hovedgatene er dominerende gateløp). Jernbanerader teller
ikke som gate; navngitte plasser (Rådhusplassen m.fl.) gjør det. Slots
uten gatekontakt arver nærmeste gate innen 4 ruter (`arvet`).

Renderingen speiler sprites med `flipX` når assetens innebygde vending
(`ASSET_BASE_FACING`, default SE) ikke matcher slottens facing. Skygge,
pad og kvartal-plate påvirkes ikke (symmetriske).

Tabellen under er generert fra `window.__FACING_AUDIT__` (eksponeres av
CityScene ved oppstart — kjør spillet og les den i konsollen for å
regenerere etter kartendringer).

## Avvik som IKKE kan løses med flipX (krever NE/NW-render)

17 BD-er + 2 kvartaler har gate KUN på baksiden (NE/NW). flipX kan bare
bytte SE↔SW, så disse står med «feil» side mot gata. Vurderes manuelt
senere — enten egne NE/NW-renders av assets, eller omplassering av BD-en.

| Slot | Gate (bak) | Side | Kommentar |
|------|-----------|------|-----------|
| #11 ⛲ Fontene | Parkvegen | NE | dekor, ingen fasade — ignorer |
| #12 🎭 Rådhusteateret | Parkvegen | NE | landemerke, synlig front mot plassen er ok |
| #14 Kongsbadet | Parkvegen | NE | inngang burde vendt Parkvegen |
| #29 KIWI | Brugata | NE | inngang vender bort fra Brugata |
| #31 / K12 Kongssenteret blokk 2 | Brugata | NE | hele blokka rygger mot handlegata — **høyest prioritet** |
| #34 / #35 TIL LEIE (_V,12 / _V,13) | vei kol 21 / Storgata | NE / NW | del av K10 |
| #42 TIL LEIE (_V,20) | Jernbanegata | NE | utkant, lav prioritet |
| #51 Boliger (_I,5) | Parkvegen | NE | bolig-scenografi, ok |
| #52 Boliger (_AB,5) | Parkvegen | NE | bolig-scenografi, ok |
| #54 🏠 (_D,8) | Fjellgata | NE | ok |
| #55 Boliger (_I,9) | Eidemsgate | NW | ok |
| #63 Boliger (_I,14) | Eidemsgate | NW | ok |
| #65 Boliger (_V,14) | Storgata | NW | ok |
| #68 / #69 Boliger 4×3 (_A,20 / _I,20) | Jernbanegata | NE | ok |
| #96 Sparebanken | vei kol 18 | NW | inngang burde vendt gata |
| K10 (kvartal _V,12–13) | vei kol 21 | NE | kvartal-fasade rygger mot veien |

**Vurdering fra selvtesten:** bolig-avvikene (#51–69) er visuelt
uproblematiske — frittstående hus ser greie ut fra alle kanter. Reelle
kandidater for NE/NW-render: **Kongssenteret blokk 2 (K12)**, **KIWI**,
**Kongsbadet**, **Sparebanken**, **K10**.

## Base-facing per asset (ASSET_BASE_FACING)

Visuelt vurdert fra trimmede PNG-er. Default = SE (inngang/butikkfront på
ned-høyre-fasaden). SW-settet står i `ASSET_BASE_FACING` i CityScene.ts:
kvartal_b, kontorbygg_a/b/c, rekkehus_a/b, enebolig_a/b/c,
tomannsbolig_a/b, boligblokk_lav_b/c, boligblokk_hoy_c, skolebygg_a,
idrettshall_a, parkeringshus_a. Hjørnegårder (kvartal_a/d/e,
kvartal_smal_a/b, boligblokk_hoy_b) er symmetriske — flip er kosmetisk
likegyldig. Eldre landemerke-assets (sykehuset, esso, peders, optician,
legekontor m.fl.) er ANTATT SE uten ny vurdering — finjuster ved behov.

## Selvtest (6 punkter, headless-screenshots i %TEMP%\spot_*.png)

| Punkt | Resultat |
|-------|----------|
| Hovedgate nordside (K05/kvartal_c) | ✓ fasade mot veien (SE, uflippet) |
| Hovedgate sørside (K06/kvartal_d) | ✓ flippet mot Brugata (SW) |
| Rådhusplassen | ✓ Rådhuset + Bibliotek vender SW mot plassen (plaza som facing-mål fungerer) |
| Boligområde (_B,21) | ✓ hus vender SW mot Jernbanegata; 4×3-blokkene har gate bak (avvik, men visuelt ok) |
| Kongssenteret | ✓ K11/K13 mot gatene; K12 rygger mot Brugata (avvik over) |
| Kirke | ✓ vender SW mot Parkvegen |

---

## Facing per BD (generert fra window.__FACING_AUDIT__)

| # | Navn | Footprint | Gate | Facing | Kilde |
|---|------|-----------|------|--------|-------|
| 1 | Hotell 🏨 | _V,2 → _V,3 | Parkvegen | SW | gate |
| 2 | TIL LEIE | _T,2 → _T,3 | Parkvegen | SW | gate |
| 3 | Sykehuset 🏥 | _A,5 → _B,8 | vei kol 2 | SE | gate |
| 4 | Boliger | _D,5 → _G,6 | Fjellgata | SW | gate |
| 5 | Boliger | _I,6 → _L,6 | Fjellgata | SW | gate |
| 6 | Boliger | _I,8 → _M,8 | Tommelstads | SE | gate |
| 7 | TIL LEIE | _M,5 → _M,5 | Tommelstads | SE | gate |
| 8 | TIL LEIE | _M,6 → _M,6 | Fjellgata | SW | gate |
| 9 | TIL LEIE | _O,5 → _Q,6 | Fjellgata | SW | gate |
| 10 | TIL LEIE | _R,5 → _T,6 | Fjellgata | SW | gate |
| 11 | ⛲ | _V,5 → _V,5 | Parkvegen | SW | avvik-NE |
| 12 | 🎭 | _W,5 → _W,5 | Parkvegen | SW | avvik-NE |
| 13 | Rådhuset 🏛️ | _V,6 → _W,7 | Rådhusplassen | SW | gate |
| 14 | Kongsbadet 🏊 | _Z,5 → _AA,6 | Parkvegen | SW | avvik-NE |
| 15 | ⛽ ESSO | _E,8 → _G,9 | Eidemsgate | SE | gate |
| 16 | TIL LEIE | _O,8 → _R,8 | vei kol 18 | SE | gate |
| 17 | Rådhusplassen | _V,8 → _Y,9 | - | - | plaza |
| 18 | 📚 Bibliotek | _Y,7 → _Z,7 | Rådhusplassen | SW | gate |
| 19 | Sentrum VGS 🏫 | _AA,8 → _AB,9 | (ingen) | SW | arvet |
| 20 | Øyeklinikk | _Q,9 → _Q,9 | Brugata | SW | arvet |
| 21 | Peders | _R,9 → _R,9 | vei kol 18 | SE | gate |
| 22 | TIL LEIE | _O,9 → _P,10 | Brugata | SW | gate |
| 23 | Specsavers | _Q,10 → _Q,10 | Brugata | SW | gate |
| 24 | TIL LEIE | _R,10 → _R,10 | Brugata | SW | gate |
| 25 | TIL LEIE | _T,9 → _T,9 | Storgata | SE | gate |
| 26 | TIL LEIE | _T,10 → _T,10 | Brugata | SW | gate |
| 27 | TIL LEIE | _V,10 → _Y,10 | vei kol 21 | SW | gate |
| 28 | TIL LEIE | _J,10 → _L,10 | Brugata | SW | gate |
| 29 | KIWI 🛒 | _A,12 → _A,13 | Brugata | SW | avvik-NE |
| 30 | KONGSSENTERET | _D,12 → _G,14 | Eidemsgate | SE | gate |
| 31 | KONGSSENTERET | _I,12 → _N,13 | Brugata | SW | avvik-NE |
| 32 | KONGSSENTERET | _O,12 → _R,13 | vei | SE | gate |
| 33 | P | _T,12 → _T,13 | Storgata | SE | gate |
| 34 | TIL LEIE | _V,12 → _V,12 | vei kol 21 | SW | avvik-NE |
| 35 | TIL LEIE | _V,13 → _V,13 | Storgata | SE | avvik-NW |
| 36 | TIL LEIE | _V,18 → _V,18 | Jernbanegata | SW | gate |
| 37 | SSB | _AE,18 → _AG,18 | vei kol 30 | SW | gate |
| 38 | 🚉 Lokalstasjon | _AA,18 → _AC,18 | Jernbanegata | SW | gate |
| 39 | TIL LEIE | _W,21 → _W,21 | vei kol 23 | SE | gate |
| 40 | TIL LEIE | _W,22 → _W,22 | vei kol 23 | SE | gate |
| 41 | TIL LEIE | _Y,20 → _AD,20 | vei kol 30 | SE | gate |
| 42 | TIL LEIE | _V,20 → _V,20 | Jernbanegata | SW | avvik-NE |
| 43 | TIL LEIE | _W,20 → _W,20 | vei kol 23 | SE | gate |
| 44 | TIL LEIE | _Y,22 → _AD,22 | vei rad 23 | SW | gate |
| 45 | Coop Mega 🛒 | _AF,20 → _AG,22 | vei rad 20 | SE | gate |
| 46 | Boliger | _A,2 → _B,3 | Parkvegen | SW | gate |
| 47 | Boliger | _D,2 → _F,3 | Parkvegen | SW | gate |
| 48 | Boliger | _I,2 → _L,3 | Parkvegen | SW | gate |
| 49 | Boliger | _N,2 → _P,3 | Tommelstads | SW | gate |
| 50 | Boliger | _Z,2 → _AB,3 | Parkvegen | SW | gate |
| 51 | Boliger | _I,5 → _L,5 | Parkvegen | SW | avvik-NE |
| 52 | Boliger | _AB,5 → _AC,6 | Parkvegen | SW | avvik-NE |
| 53 | Boliger | _W,7 → _X,7 | Rådhusplassen | SW | gate |
| 54 | 🏠 | _D,8 → _D,9 | Fjellgata | SW | avvik-NE |
| 55 | Boliger | _I,9 → _L,9 | Eidemsgate | SE | avvik-NW |
| 56 | Boliger | _D,10 → _G,10 | Brugata | SW | gate |
| 57 | 🏠 | _I,10 → _I,10 | Brugata | SW | gate |
| 58 | 🏠 | _M,9 → _M,10 | Brugata | SW | gate |
| 59 | Boliger | _AC,8 → _AD,9 | vei rad 8 | SE | arvet |
| 60 | Boliger | _Z,10 → _AB,10 | (ingen) | SW | arvet |
| 61 | 🏠 | _B,12 → _B,13 | vei kol 2 | SE | gate |
| 62 | Boliger | _A,14 → _B,14 | Sentralgata | SW | arvet |
| 63 | Boliger | _I,14 → _L,14 | Eidemsgate | SE | avvik-NW |
| 64 | Boliger | _O,14 → _Q,14 | Sentralgata | SW | arvet |
| 65 | Boliger | _V,14 → _W,14 | Storgata | SE | avvik-NW |
| 66 | Boliger | _A,18 → _D,18 | Jernbanegata | SW | gate |
| 67 | Boliger | _I,18 → _L,18 | Jernbanegata | SW | gate |
| 68 | Boliger | _A,20 → _D,22 | Jernbanegata | SW | avvik-NE |
| 69 | Boliger | _I,20 → _L,22 | Jernbanegata | SW | avvik-NE |
| 70 | Bolig | _A,15 → _C,15 | Sentralgata | SW | gate |
| 71 | Kontor | _E,15 → _G,15 | Sentralgata | SW | gate |
| 72 | Butikk | _I,15 → 10,15 | Sentralgata | SW | gate |
| 73 | Kontor | _V,15 → _Y,15 | Sentralgata | SW | gate |
| 74 | Leilighet | _AA,15 → _AC,15 | Sentralgata | SW | gate |
| 75 | Sentrum ungdomsskole | _AH,4 → _AJ,7 | vei rad 8 | SW | gate |
| 76 | Sentrum idrettshall | _AH,9 → _AJ,11 | vei rad 12 | SW | gate |
| 77 | Friidrettsanlegg | _AK,9 → _AO,13 | - | - | plaza |
| 78 | Tennisbaner | _AK,14 → _AM,16 | - | - | plaza |
| 79 | Rekkehus | _AH,18 → _AI,19 | vei rad 20 | SW | gate |
| 80 | Rekkehus | _AJ,18 → _AK,19 | vei rad 20 | SW | gate |
| 81 | Enebolig | _AL,18 → _AM,19 | vei rad 20 | SW | gate |
| 82 | Enebolig | _AN,18 → _AO,19 | vei rad 20 | SW | gate |
| 83 | Tomannsbolig | _AH,21 → _AJ,22 | vei rad 23 | SW | gate |
| 84 | Tomannsbolig | _AL,21 → _AO,22 | vei rad 23 | SW | gate |
| 85 | Hovedstasjonen | _M,28 → _R,29 | vei kol 18 | SE | gate |
| 86 | Butikk | _G,29 → _H,29 | vei rad 33 | SW | arvet |
| 87 | Butikk | _I,29 → _J,29 | vei rad 33 | SW | arvet |
| 88 | Restaurant | _L,29 → _M,29 | vei rad 33 | SW | arvet |
| 89 | Butikk | _N,29 → _O,29 | vei rad 33 | SW | arvet |
| 90 | Kafé | _P,29 → _R,29 | vei kol 18 | SE | gate |
| 91 | Butikk | _G,32 → _H,32 | vei rad 33 | SW | gate |
| 92 | Boutique | _I,32 → _J,32 | vei rad 33 | SW | gate |
| 93 | Bokhandel | _L,32 → _M,32 | vei rad 33 | SW | gate |
| 94 | Butikk | _N,32 → _O,32 | vei rad 33 | SW | gate |
| 95 | Apotek | _P,32 → _R,32 | vei rad 33 | SW | gate |
| 96 | Sparebanken | _T,30 → _V,31 | vei kol 18 | SE | avvik-NW |
| 97 | Kiwi | _X,30 → _Z,31 | vei kol 26 | SE | gate |
| 98 | Stasjonsparken | _AB,30 → _AE,33 | vei rad 33 | SE | gate |
| 99 | ⛪ Kirke | _R,2 → _S,3 | Parkvegen | SW | gate |

## Facing per kvartal

| ID | Asset | Gate | Facing | flipX | Kilde |
|----|-------|------|--------|-------|-------|
| K01 | kvartal_smal_a | Fjellgata | SW | ja | gate |
| K02 | kvartal_a | Fjellgata | SW | ja | gate |
| K03 | kvartal_b | Fjellgata | SW | nei | gate |
| K04 | kvartal_smal_b | Parkvegen | SW | ja | gate |
| K05 | kvartal_c | vei kol 18 | SE | nei | gate |
| K06 | kvartal_d | Brugata | SW | ja | gate |
| K07 | kvartal_smal_a | Brugata | SW | ja | gate |
| K08 | kvartal_e | vei kol 21 | SW | ja | gate |
| K09 | kvartal_f | Brugata | SW | ja | gate |
| K10 | kvartal_smal_b | vei kol 21 | SW | ja | avvik-NE |
| K11 | kjopesenter | Eidemsgate | SE | nei | gate |
| K12 | kjopesenter | Brugata | SW | ja | avvik-NE |
| K13 | kjopesenter | vei | SE | nei | gate |

Stats: 99 BD-er, 13 kvartaler (9 flippet), 17 BD-avvik (NE/NW).