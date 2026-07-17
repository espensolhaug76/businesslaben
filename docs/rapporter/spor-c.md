# Spor C — Hotell-lobby (møtescene for B2B)

**Gren:** `spor-c/hotell-lobby` (fra `origin/main`) · **Start:** 2026-07-17

Møtescene for B2B i Byhotellet — IKKE en drivbar bransje (bransje 4 kommer
senere via autonom-pipelinen). Bygges i tre deler: (1) NB-lobby-interiør,
(2) lobby-rute + okklusjon/møtepunkt etter kaféens kassevy-mønster,
(3) hotellsjef-sprite + ett møtescenario «Gjestepakke-forhandlingen».

> **Miljø-merknader (flagget til Espen, bekreftet):**
> - `scripts/nb-generate.sh` + `docs/AUTONOM_PIPELINE.md` ligger på
>   `origin/eksperiment/autonom-sport` (ikke merget til main) — scriptet er hentet
>   inn i denne grenen for gjenbruk (`git show …:scripts/nb-generate.sh`).
> - NB-generering er BLOKKERT i CC-sesjonen: `GEMINI_API_KEY` i `~/.bashrc` er en
>   `AQ.`-token (401 UNAUTHENTICATED på `?key=`/Bearer/`x-goog-api-key`), ikke en
>   `AIza`-nøkkel. Espen genererer NB-bildene manuelt fra den ferdige prompten;
>   CC pilot-porterer, etterbehandler (✦-fjerning), kalibrerer og koder.
> - `spor-a.md` pkt. 36 (Byhotellet/gjestepakken) + `hotellavtale-state` ligger på
>   `spor-a/tema-reiseliv` (ikke merget). DEL 3 kobles DEFENSIVT: scenariet
>   fungerer frittstående på main og auto-kobles når reiseliv merges.

---

## DEL 1 — NB-lobby-interiør (pilot-port + ✦-fjerning) ✅

**Prompt (diorama-stilformelen, forankret i `interior-cafe.png`):** varm norsk
småby-hotell-lobby sett fra inngangen mot resepsjonsdisken; ett-punkts
perspektiv; mørk treverksdisk i NEDRE felt som forgrunn/okklusjonssone (tom
flate); bak disken mørkt treverk + eksponert rødbrun murstein (rimer med
hotellets mursteinseksteriør), peis med varm glød + to skinnstoler i en lounge-
krok, messing-lampetter + pendel, plante, sildebensgulv; nordisk fjellhotell-
varme; TOMT for folk; ingen tekst/logoer/skilt. Full prompt ligger i
`scripts/` sin bruk (kjørbar når `AIza`-nøkkel er på plass):
`./scripts/nb-generate.sh hotell-lobby-pilot-1-raw "<prompt>" public/assets/raw/interior-cafe.png`

**Resultat:** Espen genererte + VALGTE på første forsøk →
`public/assets/raw/hotell-lobby-pilot-1.png` (1376×768, RGBA). Ingen kandidat 2
nødvendig. Komposisjonen treffer: resepsjonsdisk lav (~28 % av bildehøyden,
overkant ~72 %) — resepsjonsdisk, IKKE kafédisk; brass-ringeklokke + skinn-
gjestebok på disken (tekstfrie); peis + skinnstoler høyre, murstein venstre,
inngangsvindu bak.

**✦-vannmerke (nede t.h.) — fjernet via inpainting, pikseldiff-verifisert:**
- ✦ lokalisert som lokal lys-anomali på mørk disk: kjerne x[1232–1279]
  y[624–671], glød til ~x[1204–1299] y[604–681].
- Metode: per-rad referanse (median av ren disk i samme rad, høyre strimmel
  x[1305–1372]) → maske = diskpiksler > rad-referanse + 16, dilatert 5px →
  `cv2.inpaint` (Navier–Stokes, radius 3). Tett maske (2 646 px) så bare stjernen
  fjernes, IKKE diskkanten (et første, for bredt forsøk smurte diskskyggen — rettet).
- **Pikseldiff:** endrede piksler KUN i ✦-regionen (x[1204–1299] y[604–681]);
  **0 endrede piksler utenfor**. Tidligere stjernekjerne-luminans etter:
  median 67 / max 82 (matcher omkringliggende disk ~70–90, ingen lys stjerne).
- Visuelt verifisert: ren, kontinuerlig treverksmaser, ingen smøring/lapp.

> **Uhell + gjenoppretting (ærlig):** første (for brede) inpaint OVERSKREV
> originalen (untracket → ikke i git). Originalen ble gjenopprettet fra
> `/mnt/c/Users/espen/Downloads/hotell-lobby-pilot-1.png` og inpainting kjørt på
> nytt med tett maske. Lærdom: ta backup FØR destruktiv bildebehandling av
> untrackede assets.

**Til DEL 2 (Espens føring):** disken er bevisst LAV. OCCLUDE-linja traces langs
diskens OVERKANT (~72 % høyde). Hotellsjef-spriten skal være synlig fra ca.
lårene og opp (mer synlig enn kaféens kundemodell) — førstepasning kalibreres mot
det.

**Endret:** `public/assets/raw/hotell-lobby-pilot-1.png` (ny, ✦-fri),
`scripts/nb-generate.sh` (hentet fra sport-grenen), denne rapporten.

---

## DEL 2 — lobby-rute + okklusjon/møtepunkt + ambient-gjester ✅

**Scene (`src/game/city/LobbyView.tsx`)** — bygget etter kaféens KASSEVY-mønster
(`InteriorView`): cover-stage med lobby-bildet, en hotellsjef-sprite forankret på
et MØTEPUNKT bak resepsjonsdisken, og et FORGRUNNS-DISK-LAG (samme bilde klippet
til båndet under OCCLUDE-linja, `clip-path polygon`) som okkluderer underkroppen.
Espens føring bakt inn: disken er LAV, så OCCLUDE ligger på ~72 %, og
forankringen er LÅR (`THIGH_FRAC 0.66`) — hotellsjefen synlig fra lårene og opp
(mer enn kaféens kunde). Hotellsjef-spriten finnes ikke ennå (DEL 3) → nøytral
voksen-silhuett som fallback (`onError`).

**Rute:** `/game/d/:districtId/hotell-lobby` (bydel-nivå, ikke et lokale) i
`App.tsx`; `GamePage` rendrer `LobbyView` når `pathname` slutter på
`/hotell-lobby`. **Inngang:** en `?dev=1`-knapp «🏨 Hotell-lobby (dev)» på
stasjonsbydelen (`DistrictView`) — dev-affordance FØR hotell-hotspoten er
tracet/låst. Espen erstatter den med en usynlig hotspot-klikkflate over
hotellbygget når koordinatene låses.

**Førstepasning (skjermbilde-løkke, headless):** OCCLUDE_Y 72/72, CENTER_X 50,
ANCHOR_Y 72, SCALE 0.88. Forgrunns-disklaget flukter sømløst med diskens overkant
(ingen synlig søm); silhuetten står sentrert bak disken, synlig fra lårene og opp.
`?dev=1` gir et kalibreringspanel (5 slidere) som logger verdiene til konsollen —
Espen finpusser + låser i `LobbyView.tsx`.

**Ambient-gjester i turistsesong (Espens tilleggskrav)** —
`src/game/city/lobbyAmbient.ts` (selvstendig modul, INGEN import fra reiseliv-kode
så main fortsatt bygger): i turistsesong vises 1–2 seedede turister ved peisen/
lenestolene (høyre side), CSS-lag over bildet, IKKE klikkbare (`pointerEvents:
none`), okkludert av disken (samme lag, z<20). Hvilke turister som fyller de to
faste slotene roterer DETERMINISTISK per dag (`velgAmbientTurister`, ren funksjon
— rolig seedet rotasjon, speiler reiseliv-registeret 1:1).

**DEFENSIV KOBLING (som hotellavtale-state):** reiseliv-temaet
(`spor-a/tema-reiseliv`) er ikke merget. På main finnes verken `state.turistsesong`
(→ `erTuristsesong()` = false → dormant) eller turist-spritene
(`public/assets/raw/customers/turist-*.png` ligger PÅ reiseliv-grenen → `<img>`
404 → `onError` skjuler). Alt auto-kobles når reiseliv merges — ingen sprites
kopiert inn hit (verifisert visuelt med MIDLERTIDIGE kopier under `?dev=1`-tvang,
fjernet før commit). Sesong-aritmetikken (`absDag`/aktiv-sjekk) speiler reiseliv
1:1 så oppførselen blir lik ved merge.

**Verifisering:** `tsc -b` + `vite build` grønne. `npm run spilltest` = **14 PASS
/ 0 FAIL / 0 KJENT FEIL** (uendret mot main-tallet — endringene er additive/
dev-gatet, kaféflyten urørt). Skjermbilder: ren scene + `?dev=1`-panel + ambient-
gjester (backpacker ved peisen + eldre par ved lenestolene) verifisert headless.

**Endret:** `LobbyView.tsx` + `lobbyAmbient.ts` (nye), `App.tsx` (rute),
`GamePage.tsx` (isLobby-gren), `DistrictView.tsx` (dev-inngang), denne rapporten.

---

## DEL 3 — «Gjestepakke-forhandlingen» + hotellsjef-sprite (pilot-port, STOPP)

### Møtescenario «Gjestepakke-forhandlingen» ✅

Forgrenings-format (samme mønster som `sales/scenarios.ts`: steg → replikk +
valg → forgrening via `next`, terminalvalg bærer et `utfall`). Bygget SELVSTENDIG
(`src/game/city/gjestepakkeForhandling.ts` + `GjestepakkeOverlay.tsx`) — en
hotellavtale-forhandling passer ikke i kaféens salgs-/lager-/rykte-motor
(`SalesScenarioOverlay`), så den fikk sin egen kompakte dialog i samme stil.

**VG2-forhandling, konsekvens aldri fasit:** hotellsjefen tilbyr kaféen plass i
gjestepakken mot 15 % rabatt til pakkegjestene. Tre forgreninger:
- **Ja (15 %)** → `akseptert`: volum-strategi (flere turister, lavere margin).
- **Motforslag (8 % + toppplassering)** → steg 2 «kontring»: hotellsjefen møter på
  **12 % uten toppplassering** → `akseptert` (mildere kutt) eller `avslatt` (brudd).
- **Nei takk** → `avslatt`: margin-strategi (full margin, færre turister).

Hver utgang viser en KONSEKVENS-tekst som beskriver avveiningen (margin ↔ trafikk)
— begge veier er gyldige, ingen «riktig» svar. Åpnes ved klikk på hotellsjefen i
lobbyen. Verifisert headless: begge steg + alle forgreninger rendrer.

**KOBLING til hotellavtale-state — DEFENSIV (som ambient-gjestene):** ved
fullføring dispatches `{ type: 'SET_HOTELLAVTALE', svar }`. Den action-typen
finnes KUN på `spor-a/tema-reiseliv` (der `state.hotellavtale` +
`SET_HOTELLAVTALE`-casen bor) — IKKE på main. På main er dispatchen en **no-op**
(reduceren returnerer uendret state i default-casen), så forhandlingen spilles
helt ut og viser konsekvensen frittstående, og **setter avtalen automatisk når
reiseliv merges**. Dispatch castes løst nettopp fordi typen ikke finnes i main
sitt Action-union (dokumentert i `GjestepakkeOverlay.tsx`).

`tsc -b` + `vite build` grønne. `npm run spilltest`: **14/14 PASS** (uendret mot
main — additivt, lobby-isolert).

### Hotellsjef-sprite — PILOT-PORT (generering blokkert → STOPP for Espen) ⏸️

NB-generering er fortsatt blokkert i CC-sesjonen (`AQ.`-token, 401). Som med
lobbyen: **Espen genererer manuelt fra prompten under (maks 2 piloter), sjekker/
fjerner ✦, og velger.** LobbyView refererer allerede `/assets/raw/hotellsjef.png`
og viser en nøytral silhuett til spriten finnes.

**Prompt (fiktiv voksen i vertskapsklær, nøytral, tekstfri):**
> `3D-rendered miniature diorama character, same stylized-but-dimensional render
> style as the existing café customer sprites (kari.png / tom.png): a single
> friendly adult HOTEL MANAGER standing front-facing in a neutral, welcoming
> posture, arms relaxed. Nordic small-town hotel host attire — a dark
> waistcoat/blazer over a light shirt, tidy reception look. Approachable,
> professional, middle-aged, gender-neutral in feel. FULL BODY, standing, feet
> visible, tall narrow framing (aspect ~0.4). Isolated on a PLAIN WHITE
> background (for background removal), soft contact shadow. Absolutely NO text,
> NO name-tag lettering, NO logos or brand marks anywhere (blank badge/clothing).
> Muted naturalistic colors, soft volumetric lighting. Photoreal stylized 3D
> render, NOT a 2D illustration, NOT a drawing, NOT cel-shaded.`

**Kjørbart (når `AIza`-nøkkel er på plass):**
`./scripts/nb-generate.sh hotellsjef-pilot-1-raw "<prompt>" public/assets/raw/customers/kari.png`
(anker mot en eksisterende kunde-sprite for stil). Deretter rembg → transparent →
`public/assets/raw/hotellsjef.png`. **STOPP: venter på Espens sprite-valg.**

Etter valg gjenstår KUN å låse plasseringen: hotellsjefen står allerede riktig
(møtepunkt bak disken, lår-og-opp) — Espen finjusterer `LOBBY_*`-konstantene i
`?dev=1` mot den ekte spriten og melder tilbake.

**Endret:** `gjestepakkeForhandling.ts` + `GjestepakkeOverlay.tsx` (nye),
`LobbyView.tsx` (åpner forhandlingen ved klikk), denne rapporten.
