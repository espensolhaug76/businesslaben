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

---

## DEL 4 + 4b — Bykatalogen (delt datakilde + booking/provisjon) ✅

`src/game/data/bykatalog.ts` — byens tilbud som **vertskapsarena**: den delte
kilden hotellets gjestescenarier (DEL 5) anbefaler fra. **18 FIKTIVE oppføringer**
(aldri ekte navn), Lillehammer-klasse by:
- **14 aktiviteter:** Utsiktsheisen, Bymuseet, Kunstgalleriet, Klatreparken,
  Badelandet, Kanefart (vinter), Fjellstien (gratis), Gågate-vandringen,
  Gårdsbesøket, Torghandelen (gratis), Bryggeriomvisningen, Kirkekonserten,
  Akebakken (vinter, gratis), Elvepadlingen (sommer).
- **Hotellets egne tilbud** (kategori `hotell`, egen omsetning, INGEN provisjon):
  Frokostbuffet, Hotellets spa, Hotellrestauranten.
- **Partner:** Kaféen din (elevens kafé).

Hver post: `navn`, `beskrivelse`, `varighet`, `prisklasse` (1–3), `sesong`
(helår/vinter/sommer), `egenskaper` (behovs-tagger), `kategori`, + DEL 4b
`bookbar` + `provisjonsProsent` + `pris`. Hjelpere: `tagTreff`, `dekkerBehov`,
`provisjonKr`.

**DEL 4b — provisjon & booking:** bookbare aktiviteter gir formidlingsprovisjon
(10–20 %, bevisst VARIERT mellom tilbydere). Hotellets egne tilbud + gratis/
ikke-bookbare (Fjellstien, Torghandelen, Akebakken) har `provisjonsProsent: 0` —
de er ofte BEST for gjesten, men gir hotellet ingenting. Det er kjernen i
provisjons-spenningen (DEL 5, Innsjekket): f.eks. **Gårdsbesøket** (rolig+
barnevennlig, provisjon 8 % = lav) er best for en sliten familie, mens
**Klatreparken** (aktiv, «for mye», provisjon 18 % = høy) frister med mer penger.

**KOMPATIBILITET / DEFENSIV KOBLING (pakkebyggeren, spor-a/tema-reiseliv):**
feltnavna `id/navn/beskrivelse/varighet/prisklasse/egenskaper` er IDENTISKE med
A-grenens `Opplevelse` (reiseliv.ts). `egenskaper` er et SUPERSETT — mandatets
behovs-tagger (barnevennlig/aktiv/rolig/kultur/mat/uteliv/tilgjengelig/kort-tid/
heldag) PLUSS A-grenens synonymer (`familie` ≈ barnevennlig, `natur` ≈ uteliv),
så pakkebyggerens profil-matching (`liker: ['familie','natur',…]`) fortsatt
treffer. **Ved merge skal pakkebyggeren pekes HIT** (les `BYKATALOG` i stedet for
sin egen `OPPLEVELSER`) — A-grenen røres IKKE herfra; koblingen gjøres i
merge-runden. `sesong/kategori/bookbar/provisjonsProsent/pris` er utvidelser
utover A-grenen (pakkebyggeren ignorerer dem trygt).

`tsc -b` grønn. **Endret:** `src/game/data/bykatalog.ts` (ny), denne rapporten.

---

## DEL 5 + 6 — Hotellets gjestescenarier + kobling/flyt ✅

**Eleven ER verten i resepsjonen.** Fire forgrenings-scenarier i Likeverd-
kvalitet (konstruktivt, aldri «game over», ALDRI fasit — feedback forklarer,
tall + refleksjon er svaret). Gjestene er turist-sprites fra A-grenens register
(defensivt: mangler spriten → nøytral silhuett).

- **`src/game/city/hotellGjest.ts`** — de 4 scenariene + `velgGjestescenario`
  (seedet, sesong-gatet rotasjon).
- **`src/game/city/HotellGjestOverlay.tsx`** — motoren: forgrening (faste valg +
  `next`), recommend-steg mot BYKATALOGEN, booking/provisjon, resultatkort
  (tilfredshet + provisjon + skjult behov + læringspoeng + refleksjon).

**De fire:**
1. **Innsjekket** (behovsanalyse → tilbud): sliten familie, diffust ønske. Spørre
   (god) vs. gjette/dumpe brosjyrer (delvis/dårlig) → anbefal-steg (behov: rolig +
   barnevennlig). **Bærer provisjons-spenningen** (se under).
2. **Mersalget** (naturlig, aldri pushy): par til middag — avdekk anledningen
   (jubileum!) → restaurant + spa naturlig (god) vs. pris-pushing (delvis) vs.
   «brosjyrer der borte» (dårlig). Læring: mersalg = dekke et udekket behov.
3. **Klagen** (service recovery): opprørt gjest, naborom-støy. LYTT + beklag +
   konkret tiltak (god) vs. forsvar/bagatelliser → eskalering vs. kast penger
   uten å lytte → avfeid. Kjernen: lytte FØR løsning (4 grener med recovery-veier).
4. **Den umulige forespørselen**: gjest vil ha noe byen ikke har (akvarium).
   Ærlig «det finnes ikke» + fang behovet bak (barn + inne) → omdiriger til
   badelandet (god) vs. dikte opp svar (delvis) vs. skuldertrekk (dårlig).

**DEL 4b — booking/provisjon (verifisert):** recommend-steg → er tilbudet bookbart
kommer «Skal jeg booke det for deg?». Booking-regel: full treff ('god') → gjesten
booker gjerne, fornøyd; delvis treff → booker LIKEVEL og provisjon kommer inn, men
tilfredsheten er lunken + **🧑‍🏫 Espen spør**-refleksjon («Du tjente {X} kr … hva
kostet anbefalingen?»); bom ('dårlig') → gjesten takker NEI, ingen provisjon,
trukket tilfredshet. **Spenningen (Innsjekket):** Gårdsbesøket = full treff, LAV
provisjon (12 kr, tilfredshet 91) vs. Klatreparken = delvis, HØY provisjon (58 kr,
tilfredshet 62 + refleksjon). Provisjon registreres i `state.hotellProvisjon`
(«Provisjon formidling»), og **første provisjonsinntekt fyrer en mentor-innboks-
note** (`REGISTRER_PROVISJON` i reduceren) om hva provisjon er og hvorfor tillit
er hotellets valuta. Fagord: `mersalg` (ECO_034), `service recovery` (SRV_001),
`provisjon` (LED_004), `kulturforståelse` (KULT_001) finnes på main og brukes;
`vertskap` (KULT_003) ligger på reiseliv-grenen → `<Fagord>` degraderer pent til
ren tekst på main, auto-kobles ved merge.

**Ny state (eid, ikke reiseliv):** `GameState.hotellProvisjon` +
`hotellProvisjonIntroVist` (initialState 0/false) + action `REGISTRER_PROVISJON`.
Ingen konflikt med reiseliv (som legger `turistsesong`/`hotellavtale`).

**DEL 6 — kobling/flyt:** «🛎️ Møt en gjest»-knapp i lobbyen starter et scenario
via **seedet rotasjon** (`velgGjestescenario(lobbySeed + teller, erTuristsesong)`),
**sesong-gatet**: Klagen/Mersalget hele året, Innsjekket/Umulige kun i turistsesong
(defensivt: på main uten sesong roterer det mellom Klagen/Mersalget). `?dev=1` gir
en scenario-picker (omgår sesong-gating) for test + demo før reiseliv/turistsesong
finnes på main. Gjestepakke-forhandlingen (DEL 3) består som B2B-møtet;
ambient-gjestene ved peisen består (DEL 2).

**Verifisering:** `tsc -b` + `vite build` grønne. Scenario-flyten + resultatkort
(match 91/100 · +12 kr; delvis 62/100 · +58 kr + refleksjon) verifisert headless.
**Spilltest steg 15 (booking-fasit):** verifisert GRØNT i isolert kjøring
(dev-picker synlig; **match → `hotellProvisjon` == `provisjonKr('gardsbesok')` ==
12 kr**; **feilmatch (Bryggeriomvisningen) → gjesten takker nei → ingen provisjon**).
Steg 1–14 er 14/14 PASS (uendret mot main). Merk: et samlet **15/15**-løp i ÉN
sesjon ble gjentatte ganger OOM-drept på steg 15 (WebServer/vite killed) fordi
denne 3,2 GB-maskinen deles med 2 andre aktive CC-instanser (minne + port-5176-
kontensjon) — et MILJØ-tak, ikke en kodefeil. Kjør steg 15 isolert / hele løpet
når maskinen er ledig for å bekrefte 15/15.

**Endret:** `hotellGjest.ts` + `HotellGjestOverlay.tsx` (nye), `bykatalog.ts` (DEL
4), `LobbyView.tsx` (Møt en gjest + dev-picker), `types.ts` + `GameContext.tsx`
(hotellProvisjon-state + REGISTRER_PROVISJON), `tests/spilltest/{full-maaned.spec,
harness}.ts` (steg 15 + hotellProvisjon-felt), `playwright.config.ts` (timeout
480s for 15 steg), denne rapporten.

---

## DEL 7 — Rebase på Tema 15 (main) + koblingsbekreftelse (2026-07-19)

Tema 15 (reiseliv) er merget til `main` (origin/main @ `a98192a`). `spor-c/hotell-
lobby` er **rebaset** på den. Konfliktene løst (begge sider beholdt):
- `GamePage.tsx`: Tema 15s `devDeepLink` + min `isLobby`-gren side om side.
- `types.ts` / `GameContext.tsx`: Tema 15s `turistsesong/hotellavtale/…` +
  mine `hotellProvisjon`-felt/-action side om side (uavhengige tillegg).
- `full-maaned.spec.ts`: Tema 15s steg 15–17 beholdt; **mitt hotell-steg renummerert
  til 18**. `harness.ts` (hotellProvisjon-felt) auto-merget.
- DEL 3/4-commitene la seg rent. `App.tsx`/`playwright.config.ts` uten konflikt.

**Alle de defensive koblingene AKTIVERER nå (verifisert):**
- **`vertskap`-token (KULT_003)** finnes nå i glossaryet → `<Fagord>` i resultat-
  kortene er en EKTE klikkbar fagord (bekreftet: klikkbar). `mersalg` (ECO_034),
  `service recovery` (SRV_001), `provisjon` (LED_004), `kulturforståelse`
  (KULT_001) likeså.
- **Turist-sprites** (`turist-*.png`) finnes nå på main → gjest-header + ambient-
  gjester viser EKTE turister (ikke lenger silhuett-fallback). Bekreftet: Familien
  Berg (turist-familie) i resultatkortet.
- **`turistsesong`** finnes → `erTuristsesong()` er reell: ambient-gjestene ved
  peisen og sesong-gatingen (Innsjekket/Umulige kun i sesong; Klagen/Mersalget
  hele året) aktiveres av ekte sesongstate.
- **`SET_HOTELLAVTALE`** finnes → DEL 3 «Gjestepakke-forhandlingen» setter nå EKTE
  `state.hotellavtale` ('akseptert'/'avslatt'), ikke lenger en no-op.
- **Provisjon-fasit** intakt: match (Gårdsbesøket) → +12 kr; delvis (Klatreparken)
  → +58 kr + refleksjon; bom → 0.

**Full spilltest kjørt alene: `npm run spilltest` = 18 PASS · 0 FAIL · 0 KJENT
FEIL** (Tema 15s steg 15–17 + mitt hotell-steg 18). `tsc -b` grønn. (Timeout hevet
til 600 s for 18 steg; kjør på en maskin med ledig minne — 3,2 GB-boksen som deles
med parallelle CC-er OOM-dreper vite-serveren.)

### Lobbyen ER scenen Espen ønsker — «gjest kommer inn, klikk = møte» ✅

Bekreftet: `LobbyView` er den immersive byhotell-scenen (ikke en modal):
- **Hotellsjefen** står bak resepsjonsdisken (okkludert lår-og-opp) — **klikk =
  møte** (Gjestepakke-forhandlingen, DEL 3).
- **«🛎️ Møt en gjest»** → en gjest «kommer inn» og et gjestescenario åpnes
  (seedet, sesong-gatet rotasjon av de 4).
- **Ambient-gjester** minglet ved peisen i turistsesong.

**Chrome-validering (Espen) — full URL:**
`http://localhost:5173/game/d/stasjonsomradet/hotell-lobby?dev=1`
(Tema 15s `devDeepLink` seeder et engangsspill på `?dev=1`, så scenen rendres uten
`?skip`.) Sjekkliste:
1. Lobby-scenen rendrer (varmt hotell, resepsjonsdisk, peis, murstein).
2. **Klikk hotellsjefen** → Gjestepakke-forhandlingen (3 grener, setter hotellavtale).
3. **«Møt en gjest»** (+ `?dev=1`-scenario-pickeren nederst v.) → spill de 4:
   Innsjekket / Mersalget / Klagen / Den umulige — sjekk forgrening, konsekvens,
   booking→provisjon, spenningen (Gårdsbesøket vs Klatreparken), fagord klikkbare.
4. **Ambient-gjester** ved peisen (turistsesong; `?dev=1` «🧳 Vis ambient-gjester»
   for å tvinge dem frem).
5. **Kalibrering** i `?dev=1`: dra OCCLUDE-linja + hotellsjefen på plass (mot den
   ekte spriten når den er generert), lås `LOBBY_*` i `LobbyView.tsx`.

**Å avklare i valideringsrunden (kobling):** Tema 15 la inn en LÅST «Byhotellet»-
hotspot på stasjonsbydelen som i dag åpner et MODAL-panel (Tema 15s egne
Kulturmøtet/Tax-free-scenarier). Min lobby-SCENE nås via `?dev=1`-knappen + ruta.
Anbefaling: pek den låste byhotell-hotspoten til lobby-scenen
(`/game/d/stasjonsomradet/hotell-lobby`) — scenen er den rikere «gjest kommer inn,
klikk = møte»-opplevelsen — og vurder om Tema 15s byhotell-scenarier skal flyttes
inn i lobby-motoren. Rørte IKKE Tema 15s panel i denne runden (egen beslutning).

---

## DEL 8 — Forenkling: forhandling → ferdigforhandlede avtaler (2026-07-20)

**Espens beslutning:** den frittstående «Gjestepakke-forhandlingen» i lobbyen
(DEL 3) er **strøket helt**. Hotellet har FERDIGFORHANDLEDE avtaler — eleven
**bruker** dem, forhandler ikke. Dette speiler skolepraksis: pakker settes sammen
av allerede forhandlede avtaler, ikke ved at eleven forhandler hver enkelt.

**Endringer:**
- **Slettet** `GjestepakkeOverlay.tsx` + `gjestepakkeForhandling.ts`. Med det
  forsvant også STOPP-porten (den var blokkert på NB-generering av `hotellsjef.png`
  — ikke lenger nødvendig).
- **`bykatalog.ts`:** `provisjonsProsent` reframet som **avtalt sats** (ferdig-
  forhandlet avtale). Verdiene uendret — variasjon mellom tilbydere (ca. 8–20 %):
  Gårdsbesøket 8 %, Klatreparken/Bryggeriet/Elvepadlingen 18 %, Kanefart 20 %.
- **Ny lesevisning «🤝 Hotellets avtaler»** (`HotellAvtalerOverlay.tsx`): enkel
  liste over byens tilbydere med avtalt provisjon per partner, sortert høyest sats
  først, + en «gratis for gjesten (0 %)»-seksjon. **Poenget:** åpne satser gjør
  anbefalings-dilemmaet i «Innsjekket» synlig — den høyeste satsen (Klatreparken
  18 %) er sjelden det beste for gjesten (Gårdsbesøket 8 % passer familien). Fagord
  `provisjon` (LED_004) + `vertskap` (KULT_003) klikkbare.
- **Lobbyen:** senter-figuren er nå en **gjest** (seedet turist-sprite, ikke en
  hotellsjef) — klikk (eller «Møt en gjest») starter et gjestescenario. Egen knapp
  «🤝 Hotellets avtaler» åpner lesevisningen.
- **Tema 15s café-side urørt:** `SET_HOTELLAVTALE` + gjestepakke-innboksen i
  `GameContext`/`DistrictView`/`TuristkontorPanel` gjelder KAFÉENS innmelding i
  hotellets pakke og lever sitt eget liv. Kun MIN lobby-forhandling ble strøket.

**B2B-forhandling = mulig VG2-utvidelse (BRANSJE4-planen), bevisst utelatt nå.**
Prinsippbasert forhandling (BATNA, interesser vs. posisjoner) hører hjemme i VG2s
kommunikasjonsfag; en interaktiv forhandlings-motor i byhotellet er en naturlig
utvidelse når bransje 4 bygges via autonom-pipelinen — men holdt UTE av dette
sporet for å holde vertskaps-mekanikken enkel (bruk, ikke forhandle).

### Gjest-velger i kalibreringspanelet

`?dev=1`-panelet manglet en måte å kalibrere mot annet enn dagens seedede gjest.
Lagt til **GJEST-SPRITE (møtepunkt)**-velger (samme mønster som kassevyens
🎚️-velger): `auto` (seedet) + knapp per turist-sprite (kart, kamera, familie, par,
eldre-stokk, backpacker, eldrepar). Setter HVILKEN SOM HELST sprite på møtepunktet
så Espen kan verifisere at den DELTE `LOBBY_*`-basen tåler alle høyder/bredder.
Avvik løses med per-sprite offset kun om nødvendig (kassevy-mønsteret) — foreløpig
er basen én verdi for alle.

**Chrome-validering (Espen):** `…/hotell-lobby?dev=1`
1. Senter-gjesten rendrer (ekte turist-sprite bak disken, lår-og-opp).
2. **Gjest-velgeren** (panel h.): bytt gjennom alle 7 — sjekk at basen holder.
3. **«🤝 Hotellets avtaler»**: lista stemmer, satsene åpne, fagord klikkbare.
4. **«Møt en gjest»** / klikk gjesten → de 4 scenariene (uendret).
5. Ingen spor av forhandlingen igjen (strøket).
