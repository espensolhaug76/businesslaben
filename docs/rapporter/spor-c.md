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
