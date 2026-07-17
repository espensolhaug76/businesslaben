# Spor B — Klesbutikk-stillas (gren `jobb/klesbutikk`)

> Løpende statusrapport for KLESBUTIKK-STILLAS-oppdraget. En ny Claude-økt skal
> kunne lese HERFRA og fortsette uten å gjette. **IKKE merge til main.** Bokmål.
> `tsc -b` etter TS-endringer.
>
> Les alltid først: `docs/BRANSJE_DEFINISJON.md`, `docs/BRANSJE2_*.md`,
> `src/game/data/industryDefinition.ts` (KLESBUTIKK-stub), `CLAUDE.md`.

Sist oppdatert: 2026-07-07.

---

## Status per del

| Del | Status |
|---|---|
| DEL 1 — assets (scenebilder + interiør-✦ + 8 møbel-sprites) | ✅ FERDIG, committet + pushet |
| DEL 2 — KLESBUTIKK-definisjonen | ✅ FERDIG, committet + pushet |
| DEL 3 — stillas-scener + dev-rute | ✅ FERDIG, committet + pushet |
| Sone-lås + skew-infrastruktur | ✅ FERDIG, committet + pushet |
| Skew kun butikkvegg + forsvinnende-sprite-fiks | ✅ FERDIG, committet + pushet |
| Møbelplassering (fri) + vareplass-modell | ✅ FERDIG (fri plassering senere erstattet av snap) |
| Ankerplasser (snap-slots) + anker-tracer | ✅ FERDIG (snap senere erstattet av gulvplan) |
| Gulvplan (perspektiv) + dybde-plassering | ✅ FERDIG, committet + pushet |
| Klesark-splitt + plaggdata + plagg-auto-snap | ✅ FERDIG, committet + pushet |
| Antrekk-passform (antrekkFit) + elevstyrt påkledning | ✅ FERDIG (antrekk-på-dukke senere erstattet av dukke-bytte) |
| Påkledde dukker: splitt + dukke-bytte | ✅ FERDIG, committet + pushet |

Grenen `jobb/klesbutikk` er pushet til origin. **Ikke aktiv bransje** —
`KLESBUTIKK` er fortsatt IKKE registrert i `INDUSTRY_DEFINITIONS`.

---

## ✅ DEL 1 — assets
- `klesbutikk-fasade.png` (1376×768) + `klesbutikk-interior.jpg` (1024×572) i
  `public/assets/raw/`. Interiørets ✦-AI-vannmerke fjernet med fjæret klone-patch.
- 8 møbel-sprites i `public/assets/raw/fixtures/`: `stativ/dukke/bord/hylle`
  (ark 01) + `dukke-mann/dukke-barn/stativ-liten/bord-podium` (ark 02).
- `split-product-sheet.py`: `fixtures-ark-*`-familie + `SKIP`-sentinel;
  `--model isnet-general-use` for lavkontrast-arkene.

## ✅ DEL 2 — KLESBUTIKK-definisjonen
`industryDefinition.ts` — `KLESBUTIKK` fylt (IKKE registrert = ikke aktiv):
tom katalog, vindussone + interiør-scene + butikkvegg-trau, forsyning-tekst mot
sesong, `personaBudsjett` FASHION_BUDGETS, `svinnRegel: 'sesong'` (no-op).
`SvinnRegel`-unionen `'sesong/kolleksjon'` → `'sesong'` (kommentar i
`GameContext.tsx` CLOSE_DAY oppdatert; fortsatt ingen svinn for klesbutikk).

## ✅ DEL 3 — stillas-scener + dev-rute
`src/game/city/KlesbutikkStillas.tsx` + rute `/dev/klesbutikk` i `App.tsx`
(frittstående, IKKE koblet til onboarding). To faner (Fasade/Interiør), soner
tegnet, `?dev=1` gir sone-tracer + skew-kalibrering.

## ✅ Sone-lås + skew-infrastruktur (siste runde)
**Låste soner** (Espen-trace-t 2026-07-07, `districts.ts`):
- `KLESBUTIKK_VINDU = [13, 53.9, 26.1, 30.1]`
- `KLESBUTIKK_BUTIKKVEGG = [39.6, 29, 25, 36.5]`

**Skew-infrastruktur** (content-lean, default 0 = ingen skjær). NB: senere
strammet inn til KUN butikkveggen — se «Skew kun butikkvegg»-seksjonen under:
- `MonterTrau` (districts.ts) fikk `skewX?`/`skewY?`. Kafeen setter dem ikke (⇒ 0).
  (`StylingFlate` fikk dem først, men de er FJERNET igjen — vinduet skal ikke lene.)
- `…lager.trau[0]` (butikkvegg) har `skewX: 0, skewY: 0`.
- `KlesbutikkStillas` (?dev=1): **📐 Skew-kalibrering**-panel med skewX/skewY-
  slidere (samme mutér-og-logg-mønster som speil-kalibreringen i InteriorView).
  Muterer definisjons-objektet live og logger `… — lim inn i
  KLESBUTIKK.flater.styling / …lager.trau[0] (industryDefinition.ts)`.
- En fixture-sprite (dukke/stativ) vises bunn-ankret i sonen med `skewX()/skewY()`
  påført, så lenet er synlig NÅ. Ekte inventar-plassering kommer senere.

**Espen kalibrerer skew** når den ekte fixture-plasseringen rendres — infra er
klar: åpne `/dev/klesbutikk?dev=1`, dra skew-sliderne, meld/lim verdiene inn i
`industryDefinition.ts`.

## ✅ Skew kun butikkvegg + forsvinnende-sprite-fiks (siste runde)

**DEL 1 — skew fjernet fra vindussonen.** Vinduet er en styling-flate med fri,
oppreist plassering (jf. WindowDisplay), så det skal ikke lene innhold:
- `StylingFlate` mistet `skewX?/skewY?`; `KLESBUTIKK.flater.styling = { zone }`
  (uten skew). `MonterTrau.skewX/skewY` (butikkvegg) beholdt.
- `KlesbutikkStillas`: `Scene.skew` er nå valgfri (kun Interiør har den).
  Skew-kalibreringspanelet vises KUN på Interiør-fanen og styrer kun
  `…lager.trau[0]`. Vindus-spriten (dukke) rendres uten transform.

**DEL 2 — forsvinnende sprite på Interiør-fanen. ROT­ÅRSAK (diagnostisert med
headless Chromium, ikke gjettet):**
Preview-`<img>`-en hadde bare `maxWidth/maxHeight` i prosent, INGEN reservert
boks, og INGEN `onError`. Når bilde-fetchen feiler blir `<img>` en brutt bilde
med `naturalWidth = 0` → boksen kollapser til **0×0** og spriten «forsvinner».
Utløseren er den gamle **service workeren** på localhost (se `main.tsx`:
«FetchEvent network error») som fanger fetch-en og feiler den ~1 s etter last —
derav «rendres og forsvinner etter ~1 sekund». Scene-bildet overlevde fordi det
HAR reservert boks (`width/height:100%`) + `onError`→fallback; spriten hadde
ingen av delene. Reprodusert ved å `route.abort()` sprite-requesten: boks 0×0,
`naturalWidth 0`, fortsatt i DOM — bekreftet mekanismen.
**Fiks:** spriten fikk reservert boks (`width:70% height:92%`, `objectFit:
contain`, bunn-ankret) + `onError`→synlig «sprite mangler (…)»-fallback (samme
mønster som scene-bildet). En brutt sprite degraderer nå til en synlig 202×192-
plassholder i stedet for å kollapse. `spriteFailed` nullstilles ved fanebytte.
NB: for å SE selve spriten må Espen også tømme den gamle service workeren
(hard-reload / `main.tsx` avregistrerer den på neste last).

## ✅ Møbelplassering (fri) + vareplass-modell (siste runde)

**DESIGNENDRING:** Butikkveggen er IKKE et trau. Møbler plasseres FRITT (som
vindusutstillingen). Skew-demoen + skew-panelet er **fjernet** fra stillaset;
`MonterTrau.skewX/skewY` ligger igjen ubrukt (kafeen rører dem ikke).

**DEL 1 — møbelplassering** (`KlesbutikkStillas.tsx`, Interiør-fanen):
- Møbelpalett (portal, høyre) med de 8 fixture-spritene. Dra inn på butikkvegg-
  sonen (samme frie-drag-mønster som `WindowDisplay`), bunn-ankret, overlapp
  tillatt (ingen kollisjon v1). Samme møbeltype kan plasseres flere ganger
  (unik `id` per instans).
- Per møbel: flytt (drag), størrelse (± i verktøylinja på valgt møbel, 40–250 %),
  fjern (✕ / høyreklikk / dra ut). Klikk = velg.
- Persisteres i `state.klesbutikkFixtureLayout` via `SET_KLESBUTIKK_FIXTURES`
  (samme mønster som `counterLayout`). Dev-ruta ligger utenfor GamePage sin
  provider, så scenen er pakket i en **egen `GameProvider`**. In-memory (som
  resten av spillet — ingen localStorage); overlever fanebytte, ikke full reload.

**DEL 2 — vareplass-modell** (`src/game/data/klesbutikkFixtures.ts`, nytt datalag):
- Hvert møbel definerer vareplasser via `slotRows` (TUNBAR `count` + geometri),
  ikke hardkodet i komponenten. `vareplasser()` utleder jevnt fordelte punkter;
  `kapasitet()` summerer. Plassene er normaliserte (0–1) i møbelets sprite-boks,
  så de **følger møbelets plasserte geometri og skalerer med størrelsen** gratis
  (markørene er absolutte barn i møbel-boksen).
- Kapasitet i dag (tunbar): stativ 6 heng · stativ-liten 4 heng · hylle 3×4=12
  brett · bord 3 brett · podiumbord 1+3 brett · dukke/-mann/-barn 1 antrekk.
- Hver plass har `type: 'heng' | 'brett' | 'antrekk'` — klar for at plagg-sprites
  auto-snapper (hengende/brettet/antrekk) i NESTE jobb.
- `?dev=1` viser plassene som fargede markører (heng=cyan, brett=amber,
  antrekk=rosa) på møblene. Uten dev: usynlige (flytt/størrelse virker likevel).

**Nye/endrede typer/state:** `KlesbutikkFixtureId` + `KlesbutikkFixtureItem`
(types.ts), `GameState.klesbutikkFixtureLayout`, action `SET_KLESBUTIKK_FIXTURES`.

Marker-posisjonene (`slotRows` i klesbutikkFixtures.ts) er tunbare øyemål.

## ✅ Ankerplasser (snap-slots) + anker-tracer (siste runde)

**DESIGNENDRING:** Fri drag/skalering var ikke brukervennlig → erstattet med
ANKERPLASSER. Møbler snapper til forhåndsdefinerte plasser med LÅST posisjon og
skala. INGEN fri flytting, INGEN størrelsesendring (den UI-en er fjernet).

**DEL 1 — datamodell + tracing:**
- `Ankerplass { id, x, y, scale, tillatteTyper: MøbelType[] }` (industryDefinition.ts),
  koordinater i **% av scenebildet**, bunn-ankret. `scale` = multiplikator på
  møbelets `baseWFrac` (rendret bredde-brøk = baseWFrac × scale). Nytt felt
  `IndustryDefinition.ankerplasser?` (kun klesbutikk).
- **6 grove default-plasser** lagt inn i `KLESBUTIKK.ankerplasser` (3 gulv-
  plasser for stående møbler, 1 vegghengt hylle-plass, 2 dukke-plasser). IKKE
  kalibrert ennå.
- `?dev=1` → **⚓ Ankere**-modus: klikk i bildet for ny plass, juster `scale`
  med ±, toggle tillatte typer, «Logg array» → konsollen (samme mutér-og-logg
  som sone-traceren). Muterer `KLESBUTIKK.ankerplasser` live.

**DEL 2 — snap-interaksjon** (`KlesbutikkStillas.tsx`, Interiør · 🪑 Møbler):
- Dra møbel fra paletten → kompatible plasser markeres (ring), nærmeste innen
  snap-avstand fylles grønt → slipp = snapper inn med plassens pos/skala.
  Slipp utenfor snap-avstand = avbryt. Opptatt plass = **erstatt**. Høyreklikk
  møbel = fjern.
- Vareplass-modellen fra forrige runde er UENDRET; markørene er barn av
  møbel-boksen og følger den snappede pos/skala automatisk. `?dev=1` viser dem.
- **State:** `KlesbutikkFixtureItem` er nå `{ plassId, fixtureId }` (koblingen
  plass→type), lagret i `state.klesbutikkFixtureLayout` (samme action). Egen
  `GameProvider` rundt dev-scenen som før.

**Tre dev-moduser** (topbar, ?dev=1): 🪑 Møbler (snap + vareplass-markører) ·
⚓ Ankere (anker-tracer) · 🧭 Soner (sone-tracer). Uten dev: kun møbel-snapping,
markører usynlige.

(Ankerplass-modellen ble erstattet av gulvplanet under.)

## ✅ Gulvplan (perspektiv) + dybde-plassering (siste runde)

**DESIGNENDRING:** Anker-snapping erstattet av et GULVPLAN (perspektivmodell).
Møbler plasseres fritt på gulvet; fotpunktet klemmes til et trapes og skalaen
interpoleres av dybden. INGEN manuell skalering (UI fjernet).

**DEL 1 — gulvplan-kalibrering:**
- `Gulvplan { hjørner: {fremV, fremH, bakV, bakH}, scaleFront, scaleBack }`
  (industryDefinition.ts) — 4 trapes-hjørner i **% av scenebildet**. Nytt felt
  `IndustryDefinition.gulvplan?` (kun klesbutikk); `Ankerplass`/`ankerplasser`
  fjernet. **Grove defaults** lagt inn (tregulvet som trapes).
- `?dev=1` → **📐 Gulvplan**-modus: dra de 4 hjørnene (trapes-overlay), juster
  `scaleFront`/`scaleBack` med ± mot to preview-dukker (helt foran / helt bak),
  «Logg objekt» → konsollen (mutér-og-logg). Muterer `KLESBUTIKK.gulvplan` live.

**DEL 2 — gulvbasert plassering** (`KlesbutikkStillas.tsx`, Interiør · 🪑 Møbler):
- Dra møbel fra paletten ut på gulvet → fotpunktet klemmes til trapeset (invers
  bilineær mapping), **skala interpoleres av dybden** (foran stort → bak lite),
  live preview under draget. **Tegnerekkefølge** sorteres på fotpunkt-y (foran
  dekker bak). Flytt = dra fritt på planet (rescalerer i dybden). Høyreklikk =
  fjern. Overlapp tillatt.
- **Hylla står på gulvet som alle andre** (rettet etter tilbakemelding: den var
  først veggmontert med fast skala og kunne ikke flyttes frem/tilbake — nå er
  wall-mount-spesialtilfellet fjernet, hylla dybde-skalerer og flyttes fritt).
- Vareplass-modellen (klesbutikkFixtures.ts) UENDRET — markørene følger møbelets
  pos/skala (barn av møbel-boksen). `?dev=1` viser dem.
- **State:** `KlesbutikkFixtureItem` er nå `{ id, fixtureId, fotpunkt }`
  (fotpunkt i % av scenebildet) — erstatter plassId-modellen.

**Tre dev-moduser** (?dev=1): 🪑 Møbler · 📐 Gulvplan · 🧭 Soner.

**➡️ Til Espen (valider i Chrome, `/dev/klesbutikk?dev=1`):** 📐 Gulvplan → dra
de 4 hjørnene så trapeset dekker tregulvet, juster front/bak-skala mot preview-
dukkene til dybden ser riktig ut, «Logg objekt» → lim inn i `KLESBUTIKK.gulvplan`
(industryDefinition.ts). Deretter 🪑 Møbler → sjekk at skyving i dybden ser
naturlig ut (alle møbler, også hylla, står på gulvet og skalerer med dybden).

## ✅ Klesark-splitt + plaggdata + plagg-auto-snap (siste runde)

**DEL 1 — 9 klesark splittet → 64 plagg-sprites** (`public/assets/raw/klar/`),
ny `klar-ark-*`-familie i `split-product-sheet.py`. **VIKTIG-funn:**
- De fysiske ark-numrene matchet IKKE oppdragets logiske nummerering — innholdet
  var stokket om. Navnekart keyet på FYSISK arknr., matchet visuelt.
- **Profil-arket (logisk 03) MANGLER** — fysisk ark 05 er en DUPLIKAT av 04.
  Profil-varianten faller derfor tilbake til front til arket leveres.
- ark-01 trengte `--model isnet-general-use` (u2net droppet lyse brettede
  stabler); resten u2net.
- **✦-vannmerket** lå inne i det nederste-høyre plagget på 6 ark → fjernet
  manuelt etter split (klone-patch/diffusjon-inpaint): sport-antrekk-2,
  dunvest-dame, ullfrakk, kjeledress-barn, vattert-vest, luer-stabel.
  (luer-stabel har en liten glatt flekk igjen, men ingen ✦.)

**DEL 2 — plaggdata** (`src/game/data/klesbutikkPlagg.ts`, nytt tunbart datalag):
`Plagg { id, navn, spriteHengFront?, spriteHengProfil?, spriteBrett?,
spriteAntrekk? }` + `spriteFor()`/`passerType()`. 40 heng, 12 brett, 12 antrekk.
`spriteHengProfil` er TOM (profil-arket mangler). `klesbutikkFixtures.ts`:
heng-plasser fikk `variant: 'front' | 'profil'`; **stativ + lite stativ =
'profil'** (faller tilbake til front når profil-spriten mangler).

**DEL 3 — plagg-auto-snap** (`KlesbutikkStillas.tsx`, Interiør · 🪑 Møbler):
- **Klespalett** (venstre) gruppert Hengende/Brettet/Antrekk. Dra plagg →
  kompatible LEDIGE vareplasser på plasserte møbler markeres → slipp = snapper
  med riktig sprite-variant (**profil→front på stativ, brett på hylle/bord,
  antrekk rendret over dukke-spriten**). Én vare per plass; høyreklikk = fjern.
- Plaggene er barn av møbel-boksen → **følger møbelet ved flytting** og skalerer
  med plass-geometrien. Snap-deteksjon leser slot-ankrene (`data-plass`) fra
  DOM-en (unngår sprite-bildeforhold-matte).
- **State:** `klesbutikkPlaggLayout: { plassId, plaggId }[]`
  (`plassId = ${fixtureItemId}:${slotIndex}`), action `SET_KLESBUTIKK_PLAGG`.
  Rent presentasjonslag — ingen katalog/lager/pris ennå.

Verifisert med headless Chromium: heng→stativ (front-fallback), brett→hylle,
antrekk→dukke, plagg-følger-møbel, høyreklikk-fjern, persist over fanebytte.
`tsc -b` + `vite build` grønt.

**➡️ Til Espen:** valider i Chrome (`/dev/klesbutikk`, 🪑 Møbler): plasser
stativ/hylle/dukke, dra plagg fra klespaletten — sjekk profil-på-stang (front
inntil profil-arket kommer), brett-på-hylle/bord, antrekk-på-dukke, og at plagg
følger møbelet når du flytter det. **Trengs fra deg:** «heng profil»-arket
(logisk 03: denimjakke-p osv.) som eget ark, så kobler jeg på ekte profil-sprites.

## ✅ Antrekk-passform (antrekkFit) + elevstyrt påkledning (siste runde)

To lag oppå auto-snappet antrekk-på-dukke:

**Grunnlinje (data, dev-kalibrert):** `antrekkFit { default: Fit, perDukke? }`
per antrekk (`Fit { offsetX, offsetY, scale }`), **SKULDER-ANKRET** (antrekket
henger fra skuldrene, ikke sentrert — `ANTREKK_SHOULDER_Y`/`ANTREKK_BASE_W`).
`perDukke` kan overstyre for dame/herre/barn (ulike kropper). `baseFit()` slår
opp. First-pass = `{0,0,1}` for alle 12 (skulderankeret sitter bra i
inspeksjon); Espen finjusterer.
- **?dev=1 fit-kalibrator** (🎚️-panel når et antrekk er valgt): piltast-knapper
  for offset + ± for scale + «per denne dukketypen»-checkbox, live preview,
  «Logg fit» → konsoll for innliming i `ANTREKK_FIT` (klesbutikkPlagg.ts).

**Elevstyrt påkledning (kv1012 visuell profilering):** oppå grunnlinja kan
eleven **dra** antrekket (klemte grenser `±ELEV_MAX`), **skalere ±20 %**
(scroll eller ±-knapp) og **«Tilbakestill»** til grunnlinja. Lagres per dukke
i state som `elevFit { dx, dy, dScale }` (delta oppå `antrekkFit`). **Kun
antrekk på dukker** — heng/brett er ren auto-snap uten justering. Ingen scoring
— visuelt resultat er feedbacken.

**State:** `KlesbutikkPlaggItem` fikk valgfri `elevFit`. Render =
`baseFit + elevFit` (skulder-ankret). Verifisert (headless Chromium): drag,
scale ±, reset, dev-logg, persist over fanebytte. `tsc -b` + `vite build` grønt.

**➡️ Til Espen:** `/dev/klesbutikk?dev=1` → plasser dukke + antrekk, klikk
antrekket → 🎚️-kalibratoren dukker opp. Kalibrer alle antrekk (og evt. perDukke),
«Logg fit», lim inn i `ANTREKK_FIT`. Test elev-laget: dra/skaler/tilbakestill
antrekket på dukka.

## ✅ Påkledde dukker: splitt + dukke-bytte (siste runde)

**BAKGRUNN/DESIGNENDRING:** Ghost-antrekk rendret OVER naken dukke avslørte
illusjonen (grå kropp skinte gjennom). Ny retning: en PÅKLEDD DUKKE-SPRITE
ERSTATTER den nakne dukka. `antrekkFit`/`elevFit` er BEHOLDT i koden (dead code,
kodet rundt — ikke slettet), men brukes ikke i denne pathen.

**DEL 1 — 5 dukke-ark splittet → 20 påkledde dukke-sprites**
(`public/assets/raw/klar-dukke/`), ny `klar-dukke-ark-*`-familie i
`split-product-sheet.py`. u2net (mannequiner høykontrast, ingen dropp).
**Navnekart per blob (verifisert visuelt 2026-07-07), 1 rad × 4 per ark:**
- ark 01 (mixed): `blazer-herre` · `sommerkjole-dame` · `denim-herre` · `joggedress-herre`
- ark 02 (dame): `bluse-skjort-dame` · `trenchcoat-dame` · `strikkekjole-dame` · `blazer-jeans-dame`
- ark 03 (dame): `vinterkappe-dame` · `linskjortekjole-dame` · `treningsjakke-dame` · `velurkjole-dame`
- ark 05 (herre): `dress-herre` · `ullfrakk-herre` · `hoodie-herre` · `dunparkas-herre`
- ark 06 (barn): `regnfrakk-barn` · `hoodie-jeans-barn` · `blomsterkjole-barn` · `vinterdress-barn`
- Fordeling: 7 herre, 9 dame, 4 barn = 20.

**AVVIK/ANTAKELSER (flagget):**
- Espens commit-tekst (`0990d78`, «herre/dame/dame-sesong/herre-2/barn») matcher
  ikke ark-innholdet 1:1 — ark 01 er MIXED (3 herre + 1 dame), ikke ren herre.
  Navnene er satt etter FAKTISK innhold, ikke commit-teksten.
- **`blazer-jeans-dame` (ark 02 blob 4)**: visuelt kjønns-tvetydig (blazer skjuler
  torso). Antatt DAME (arket er ellers dame). **Espen bør validere kjønnet.**
- **✦-vannmerket** lå på siste blob (nederst-h.) i hvert ark → fjernet:
  klone-patch (joggedress/blazer-jeans/dunparkas rene) + diffusjon-inpaint
  (velurkjole/vinterdress — liten glatt flekk igjen, men ingen ✦).

**DEL 2 — datalag** (`src/game/data/klesbutikkDukker.ts`, nytt, tunbart):
`PåkleddDukke { id, navn, dukketype: 'dame'|'herre'|'barn', sprite }` + de 20
registrert + `FIXTURE_FOR_DUKKETYPE` (dame→dukke, herre→dukke-mann, barn→dukke-barn).
Ghost-antrekk-entriene FJERNET fra `klesbutikkPlagg.ts` (spriteAntrekk-koblingen);
sprite-FILENE blir liggende i `klar/` (omdisponering til vindu er en senere jobb).
Klespaletten viser nå «Påkledd dame/herre/barn» i stedet for Antrekk-gruppa.

**DEL 3 — dukke-bytte** (`KlesbutikkStillas.tsx`, Interiør · 🪑 Møbler):
- Dra påkledd dukke → kun LEDIGE antrekksplasser på dukker med MATCHENDE dukketype
  markeres (`data-fixture`-filter i snap-deteksjonen) → slipp = den nakne
  dukke-spriten SKJULES (`overrideSprite`) og påkledd sprite rendres bunn-ankret
  på samme fotpunkt med samme gulvplan-skala (arver alt fra møbelinstansen).
- Høyreklikk på kledd dukke = **ta av** (naken tilbake); høyreklikk naken = fjern møbel.
  Flytting av dukka flytter påkledd variant med (samme sprite).
- **State:** gjenbruker `klesbutikkPlaggLayout` (`plassId → dukkeId` i plaggId-feltet)
  + `SET_KLESBUTIKK_PLAGG` — ingen ny state-mekanikk.

Verifisert (headless Chromium): matchende snap kler på (naken→påkledd sprite),
feil dukketype avvises, høyreklikk tar av, flytting følger, persist over fanebytte,
ingen konsollfeil. `tsc -b` + `vite build` grønt. Skjermbilde: dukka er nå en HEL
påkledd sprite (ingen grå kropp/illusjon).

**➡️ Til Espen (valider i Chrome, `/dev/klesbutikk`, 🪑 Møbler):** plasser
dame/herre/barn-dukker, dra påkledde dukker fra paletten (scroll ned) → sjekk at
riktig dukketype kler på og at resultatet ser helt ut. **Valider spesielt
kjønnet på `blazer-jeans-dame`.** Klespaletten er blitt lang (40 heng + 12 brett
+ 20 dukker) — vurder om den bør deles i faner senere.

---

## NATTJOBB 2 — DEL 1: PLANTEGNING (ovenfra) som primær møbelplassering

**Bakgrunn (Espens tilbakemelding):** perspektiv-draget ga dårlig dybdefølelse,
og alt «så mot kamera». Løsning: flytt selve PLASSERINGEN til en plantegning
(ovenfra), og la perspektivscenen bli resultat-/stylingvisning.

**Hva som er bygget (`KlesbutikkStillas.tsx`):**
- Ny modus-veksling i interiør: **📋 Plan** (default) og **🛍 Scene**. Dev-
  knappene (📐 Gulvplan, 🧭 Soner) ligger fortsatt bak `?dev=1`.
- `PlanView` — en 2D-plan tegnet med rene div-er (INGEN nye assets):
  - Rektangel = butikkgulvet. **Topp = BAKVEGG** (utstillingsveggen), **bunn =
    front (mot kunde/kamera)**, **venstre vegg** har skjematisk **vindu** og
    **dør** for orientering.
  - Møbler dras inn fra **🪑 Møbler**-paletten (høyre) som **skjematiske
    toppikoner** (avlange ovaler for stativ, rektangler for hylle/bord, sirkler
    for dukker) med navnelapp. Fri flytting (dra), **høyreklikk = fjern**.
- **Delt state — én layout, to visninger:** planen og scenen leser/skriver SAMME
  `klesbutikkFixtureLayout`. Møbelets `fotpunkt` (scene-%) utledes av plan-
  posisjonen og omvendt, via de eksisterende bilineære helperne:
  - `planToFoot(g,u,v) = quadPoint(g,u,v)` — plan-(u,v) → scene-fotpunkt.
  - `footToPlan(g,foot)` — invers-bilineær (`invBilinear`) → plan-%.
  Plan-Y er vendt (topp=bak=v1, bunn=front=v0). Flytt i plan ⇒ møbelet flytter
  seg i scenen, og motsatt.

**VALG (minst kode) — notert som bedt om:** perspektivscenens møbel-flytting og
møbel-paletten er **BEHOLDT som de var**. Planen er *additiv*: begge visninger
er fullt funksjonelle mot samme state, og ingen eksisterende scene-kode måtte
rives. (Alternativet — å fjerne flytting i scenen — ga ingen forenkling som
veide opp for tapt fleksibilitet.)

**Verifisert (headless Chromium):** dra to møbler inn på planen → begge dukker
opp; bytt til 🛍 Scene → begge rendres i perspektiv på utledet fotpunkt; flytt
et ikon i planen → posisjon endres; høyreklikk → fjernes. Ingen konsollfeil.
`tsc -b` + `vite build` grønt.

**➡️ Til Espen (valider i Chrome, `/dev/klesbutikk`):** åpne 📋 Plan, plasser
møbler ovenfra, veksle til 🛍 Scene og sjekk at plasseringen kjennes riktig i
perspektiv. Selve **plan↔scene-mappingen** avhenger av `gulvplan`-hjørnene
(fortsatt grove) — når du er klar, kalibrer dem via 📐 Gulvplan (`?dev=1`) så
planens kanter treffer gulvet i scenen.

---

## NATTJOBB 2 — DEL 2: SPEILING (↔) per møbelinstans

**Mål:** kunne vende et enkelt møbel (m/plagg og dukker) horisontalt, så butikken
ikke lenger «bare ser mot kamera».

**State:** nytt felt `vendt?: boolean` på `KlesbutikkFixtureItem` (`types.ts`).
Utvidbart som bedt om: kommentaren dokumenterer at feltet senere kan bli en
`retning`-streng (`'front'|'venstre'|'høyre'|'bak'`) med `vendt` avledet — uten å
bryte lagringsformatet i mellomtiden.

**Toggle (plantegningen):** **klikk** på et møbelikon = speil (↔). Dra = flytt
(uendret). Klikk vs. dra skilles med en 4 px bevegelsesterskel i `startMove`:
beveger pekeren seg < 4 px før slipp ⇒ toggle `vendt`; ellers ⇒ vanlig flytting.
Vendte ikoner får **cyan ramme + `↔` i navnelappen + speilvendt ikon** (og
navnelappen speiles tilbake så teksten er lesbar). Høyreklikk = fjern (uendret).

**Render (scenen):** `FurnitureSprite` legger `scaleX(-1)` PÅ møbelboksens
transform (`translate(-50%,-100%) scaleX(-1)`) når `vendt`. Boksen speiles om
sitt eget senter — den blir liggende på samme fotpunkt. Fordi plagg og påkledde
dukker er **barn av boksen**, speiles de MED (hele boksen), automatisk via CSS —
ingen egen plagg-transform trengs.

**Verifisert (headless Chromium):** klikk-toggle i plan setter `vendt` (↔-lapp +
cyan ramme + speilvendt ikon); scenens `[data-furniture-box]` får `scaleX(-1)`;
ny klikk fjerner det igjen. Dra flytter fortsatt (ingen utilsiktet toggle).
Ingen konsollfeil. `tsc -b` + `vite build` grønt.

**➡️ Til Espen (valider i Chrome):** i 📋 Plan, klikk et møbel for å speile det,
bytt til 🛍 Scene og sjekk at møbelet + plaggene/dukka vender riktig vei. Kombiner
med heng/brett/dukke-styling for å se at alt følger speilingen.

---

## NATTJOBB 2 — DEL 3: VEGGHENGPUNKTER (heng-plagg rett på veggen)

**Mål:** kunne henge enkeltplagg rett på butikkveggen (uten møbel) — som en ekte
vegg-eksponering — med kalibrerbare, faste opphengspunkter.

**Data (`industryDefinition.ts`):** ny type `Vegghengpunkt { id, x, y, scale }`
(x/y = % av scenebildet = plaggets øvre anker; scale = brøk av scenebredden) +
felt `vegghengpunkter?: Vegghengpunkt[]` på `IndustryDefinition`. KLESBUTIKK har
**grove default-punkter** (`vh1`–`vh4`, en rad langs bakveggen, IKKE Espen-
kalibrert). Usynlig i spillet — plagget dekker opphenget.

**Snap (scenen, `FloorLayer`):** hvert veggpunkt legger et `data-plass`-anker
(`data-type="heng"`, `data-fixture="vegg"`, `data-free`) rett i scene-overlayet.
Dermed treffes de av den **eksisterende** snap-mekanikken (`nearestSlot`) helt
gratis: et **heng-plagg** (front-variant, `spriteHengFront`) kan dras fra
klespaletten og snappes rett på et **ledig** veggpunkt. `plassId = veggpunkt-id`
(uten `:`, så de skilles fra møbel-slots `itemId:slot`). Gjenbruker
`klesbutikkPlaggLayout` + `SET_KLESBUTIKK_PLAGG` — ingen ny state. Høyreklikk på
vegg-plagget = fjern. Brett/antrekk-drag treffer ikke veggpunktene (feil type).

**Dev-tracer (`?dev=1` → 📌 Veggpunkt):** samme mutér-og-logg-mønster som
gulvplan-/sone-tracerne. Klikk på veggen = nytt punkt · dra et punkt = flytt ·
velg + `±` = skalér · høyreklikk = fjern · **«Logg array» → konsoll** (ferdig
formatert for innliming i `KLESBUTIKK.vegghengpunkter`). Et halvgjennomsiktig
preview-plagg vises på hvert punkt så størrelsen kan vurderes mot faktisk innhold.

**Utvidbart:** `scale` er per punkt; flere punkter legges til fritt i traceren.

**Verifisert (headless Chromium):** 4 vegg-ankere i scenen; heng-plagg
(Trenchcoat) dras → snapper til `vh1`, rendres på left 30 % / width 12 %
(= scale 0.12), free-flagg blir `0,1,1,1`; høyreklikk fjerner. Tracer: klikk
legger til punkt (4→5), `±` skalerer, «Logg array» logger objektet. Ingen
konsollfeil. `tsc -b` + `vite build` grønt.

**➡️ Til Espen (valider + KALIBRER i Chrome, `?dev=1`):** åpne 📌 Veggpunkt,
dra/legg punktene dit du vil ha opphengene på veggen, skalér hvert punkt mot
preview-plagget, «Logg array» og lim inn i `KLESBUTIKK.vegghengpunkter`
(`industryDefinition.ts`). Test så i 🛍 Scene at heng-plagg snapper og henger
riktig. **Punktene er grove defaults — de MÅ kalibreres av deg.**

---

## FIKSJOBB — Espens Chrome-funn (proporsjonalitet + veggpunkt-tracer)

### FEIL 1 — Plan og scene var IKKE proporsjonale → ÉN KILDE (`fotavtrykk`)

**Problem:** plan-ikonene hadde faste piksel/%-størrelser (`PLAN_ICON.w/h`), mens
scene-spriten skalerte uavhengig (`baseWFrac × scaleFor`). Layout som så luftig
ut i planen ble trang i scenen (dukker havnet bak hyller).

**Fix — én sannhet:** nytt felt `fotavtrykk { b, d }` per møbel i
`klesbutikkFixtures.ts` (`b` = bredde i % av gulvplanets bredde, `d` = dybde i %
av gulvplanets dybde). `baseWFrac` er **fjernet** (den uavhengige
størrelseskilden).
- **PLAN:** ikonet tegnes `b` % bredt / `d` % dypt av planrektangelet (samme
  form som før — oval/rektangel/sirkel fra `PLAN_ICON`, nå kun form+farge).
- **SCENE:** sprite-bredden UTLEDES av samme `b`: `sceneWidthFrac = b/100 ×
  trapWidthFrac(v)`, der `trapWidthFrac(v)` = gulv-trapesets bredde ved møbelets
  dybde (quad-interpolasjon). Alle scene-render-steder bruker denne (møbler,
  palett-preview, gulvplan-tracerens dukke-preview).
- **First-pass fotavtrykk** satt fra sprite-proporsjonene (hylle bredest b=24,
  bord bredt+dypt 18/12, stativ 20/7, dukker smale 4–6 % bredde). Tunbart.
- **`?dev=1` fotavtrykk-kalibrator** (📐-panel, venstre side i 📋 Plan): velg
  møbeltype, ± på `b` og `d`, «Logg → konsoll». Muterer `fixtureDef().fotavtrykk`
  direkte (mutér-og-logg som de andre tracerne) — endrer BÅDE plan-ikon og
  scene-bredde samtidig.
- Overlapp i planen er nå ekte (ikonene er sanne); ingen kollisjonslogikk.

**Verifisert (headless):** plasserte stativ (b=20) og dukke (b=5) på SAMME
plan-dybde. Plan-ikonbredde leste `20%`/`5%` (== `fotavtrykk.b`). Scene-sprite-
bredde `13.2%`/`3.3%` — **samme forhold 4.00 i plan og scene** (samme kilde;
scenen er b × trapesbredden ved dybden). Kalibrator: `+` på bredde flyttet
stativ-ikonet 20 → 20.5 (og scenen følger, samme verdi). `tsc -b` + `vite build`
grønt.

### FEIL 2 — Veggpunkt-tracer

**(a) «Kun punkter helt øverst»:** undersøkt empirisk (headless, flere
viewport-former) — det finnes **ingen y-clamp** i traceren: klikk på 20 / 50 /
85 / 88 % høyde gir punkter på nøyaktig de y-verdiene, og `elementFromPoint` midt
på lav vegg treffer klikkflaten (hele scenebildet er klikkbart; scene-boksen er
alltid ≤ 86vh, aldri klippet). Rotårsaken var **(b)**: default-scale `0.12` ga
enorme preview-plagg som *visuelt* dekket veggen, så eneste synlig ledige flate
var stripa øverst.

**(b) Scale + presisjon:**
- Default-scale `0.12 → 0.05` (både KLESBUTIKK-defaultene `vh1`–`vh4` og nye
  punkter fra traceren).
- Finere `±`-steg `0.01 → 0.005`; skala-clamp `0.01–0.4`.
- Scale-tallet vises nå **ved det valgte punktet** (grønn `id · 0.050`-lapp) i
  tillegg til panelet.
- Preview-plagget bruker nøyaktig samme bredde-% og anker (`translate(-50%,-6%)`)
  som den faktiske vegg-render i `FloorLayer` → speiler render-størrelsen eksakt.

**Verifisert (headless):** klikk på 88 % høyde la et punkt på `y: 88` (lavt på
veggen); logget array har `scale: 0.05`; scale-lappen viser `0.050` ved valgt
punkt. Ingen konsollfeil.

**➡️ Til Espen:** kalibrer `fotavtrykk` per møbel via 📐-panelet i 📋 Plan (plasser
samme møbel, se plan/scene proporsjonalt, «Logg» → lim inn i `klesbutikkFixtures.ts`),
og finjuster vegghengpunktenes `scale`/posisjon i 📌 Veggpunkt.

---

## RETNINGSSKIFTE — BAKT INTERIØR (kafé-modellen)

Espen har validert: **fri møblering (kompositt) forkastes.** Nytt NB-bilde med
FERDIG MØBLERT, TOM butikk er scenebildet; elevene styler FASTE, kalibrerte
vareplasser — som monter-trauene i kafeen.

### DEL 1 — Bildeprep (✦ vekk)
- Espens råbilde: `public/assets/raw/klesbutikk-interior-mobler-raw.png` (1375×768,
  **urørt**). ✦-vannmerket nederst-høyre på gulvet fjernet med **rad-interpolasjon**
  mellom ren gulvflate på hver side (bevarer vertikal lysgradient + horisontal åre,
  ingen importert skjøt) + dempet åre-støy, fjæret inn. Lagret som nytt scenebilde
  `klesbutikk-interior-mobler.png`. (Windows `:Zone.Identifier`-cruft fjernet.)

### DEL 2 — Parker fri møblering
- **Scenebildet** byttet til det bakte bildet (`INTERIOR_IMG`), aspect `1375/768`.
- **Parkert (fjernet fra UI, koden beholdt DØD)** bak modulflagget
  `const FRI_MOBLERING = false` — alt gates på det, ingenting slettet:
  📋 Plan-fanen + `PlanView`, 🪑 møbel-paletten, fotavtrykk-kalibratoren, speiling
  (`vendt`), møbel-plassering/-flytting i scenen, og gulv-trapes-overlayet (var en
  plasseringshjelp). Funksjonene kompilerer fortsatt (referert bak `FRI_MOBLERING`
  → ingen `noUnusedLocals`-feil), så modellen kan gjenopplives om ønskelig.
- **Faner som består:** 🏬 Fasade · 🛍 Interiør (= scenen). Bak `?dev=1`:
  🛍 Scene (tilbake fra tracer) · 📐 Gulvplan · 📌 Vareplass · 🧭 Soner.
- **Klespaletten består** (👕 Plagg & dukker) — elevene styler vareplassene.
- Verifisert (headless): non-dev viser kun Fasade/Interiør + bakt bilde, ingen
  møbel-palett/plan/fotavtrykk; dev viser de 4 tracer-knappene. Ingen konsollfeil.
  `tsc -b` + `vite build` grønt.

### DEL 3 — Faste vareplasser (heng/brett)
- **Generalisert modell** (`industryDefinition.ts`): `Vegghengpunkt` → `Vareplass
  { id, type: 'heng'|'brett'|'dukke', x, y, scale, dukketype? }` (+ `PlassType`,
  `PlassDukketype`). Feltet `vegghengpunkter` → `vareplasser` (migrert). De gamle
  vegghengpunktene går opp i dette som `type:'heng'`.
- **Grove defaults** avlest fra rutenett på det bakte bildet (der møblene STÅR):
  3 heng (gullstenger på bakveggen), 5 brett (venstre/høyre hyller, rund
  pidestall, lavt bord). **IKKE kalibrert — Espen tracer og låser.**
- **Snap gjenbrukt** (`FloorLayer`): hver vareplass legger et `data-plass`-anker
  med riktig `data-type` i scene-overlayet → eksisterende `nearestSlot` treffer
  dem. **heng-plagg → heng-plasser** (topp-ankret, front-variant), **brett →
  brett-plasser** (bunn-ankret). Én vare per plass, høyreklikk = fjern. ('dukke'
  → `data-type='antrekk'` + dukketype-filter, gjenbruker dukke-bytte-maskineriet;
  rendering av dukke-plasser er DEL 4.)
- **📌 Vareplass-tracer** (utvidet fra veggpunkt-traceren): **velg type**
  (heng/brett/dukke, farge per type) + dukketype (for dukke) FØR klikk · klikk =
  ny plass · dra = flytt · ± = skalér (valgt) · høyreklikk = fjern · «Logg array»
  → konsoll (m/type + dukketype). Preview-element per type (rett anker/størrelse).
- Verifisert (headless): 8 ankere; Trenchcoat (heng) snappet til `heng-1`
  (51/43, width 5 %, topp-ankret), T-skjorte-stabel (brett) til `brett-4`
  (52/73, width 10 %, bunn-ankret); riktig-type-snapping; høyreklikk fjerner;
  tracer type/dukketype-velger + logg m/type. Ingen konsollfeil. `tsc -b` +
  `vite build` grønt.

### DEL 4 — Dukke-plasser (test) — STATUS: ✅ VIRKER (m/kalibrering)
- **2 dukke-vareplasser** lagt inn (begge `dukketype: 'dame'` — bildet har to
  DAMEDUKKER, én foran t.v. og én t.h., verifisert visuelt): `dukke-1` (x40,y69,
  scale0.05), `dukke-2` (x81,y89,scale0.105).
- **Snap/rendering:** dra påkledd dame-dukke → snapper til dukke-plass med
  matchende dukketype (`data-fixture`-filter) → påkledd sprite rendres bunn-ankret
  ved føttene, `scale` = bredde-brøk. Høyreklikk = **ta av**. Feil dukketype
  (barn på dame-plass) avvises.
- **Dekning (ærlig vurdering):** de påkledde dukke-spritene og de BAKTE dukkene
  deler samme grå mannequin-kropp, så en RIKTIG kalibrert påkledd sprite dekker
  den bakte helt (og bar grå hud på slanke plagg legger seg grå-på-grå oppå den
  bakte → skjult). **Det VIRKER — men krever tett kalibrering:** de grove
  defaultene bommet først (dukke-2 sto for langt til venstre og for lite → den
  bakte dukka stakk ut ved siden); justert til x81/scale0.105 dekket den rent.
  Bulkete plagg (frakk) har god margin; slanke/ermeløse (sommerkjole) har mindre,
  så posisjon/skala må treffe. **Dukke-styling er IKKE parkert** — men Espen MÅ
  finkalibrere begge dukke-plassene i 📌-traceren (velg dukke-type, dra på plass,
  skalér til den bakte dukka er helt dekket).
- Verifisert (headless): begge dukker snappet + rendret som hele påkledde figurer
  (bakt dukke dekket), dukketype-filter avviser barn på dame-plass, høyreklikk =
  ta av. Ingen konsollfeil. `tsc -b` + `vite build` grønt.

**➡️ Til Espen (valider + KALIBRER i Chrome, `/dev/klesbutikk?dev=1` → 📌 Vareplass):**
Alle vareplassene (heng/brett/dukke) er GROVE defaults avlest fra bildet. Velg
type, dra hver plass dit møbelet/dukka står, skalér, «Logg array» → lim inn i
`KLESBUTIKK.vareplasser` (industryDefinition.ts). Sjekk i 🛍 Scene at plagg/dukker
snapper og dekker riktig. Sett dukke-skala sjenerøst så den bakte dukka er helt
skjult.

### Kalibrering + tracer-robusthet (etter DEL 1–4)

**DEL 1 — Heng-plasser låst:** Espens 11 kalibrerte heng-punkter erstatter de 3
grove heng-defaultene i `KLESBUTIKK.vareplasser` (heng-1..heng-11, sortert på x,
på gullstengene). Brett- og dukke-defaultene urørt (kalibreres senere).

**DEL 2 — Vareplass-tracer robusthet** (Espen mistet 12 punkter forrige runde):
1. **localStorage-utkast:** arbeidslista (`KLESBUTIKK.vareplasser`) speiles til
   `klesbutikk-vareplass-utkast` ved hver endring og **gjenopprettes ved modul-
   last** (før scene/tracer rendrer) → kalibrering overlever reload. **«Tøm
   utkast»**-knapp tømmer localStorage og går tilbake til de låste kildeverdiene.
2. **«📋 Kopier array»** ved siden av «Logg» — skriver samme array-tekst til
   utklippstavla (én kodevei, `vareplasserArrayText()`); faller tilbake til logg
   hvis klippebordet er blokkert.
3. **Previews** dempet til **40 %** + **«vis previews»-toggle**; **etikett kun på
   VALGT punkt** (mindre rot ved mange plasser).
4. Logg/panel bruker Vareplass-formatet (m/`type` + `dukketype`) overalt; gamle
   «Veggpunkt/vegghengpunkter»-kommentarer oppdatert til Vareplass.
5. Det parkerte blå **gulv-trapes-overlayet fjernet** fra `FloorLayer` (var
   allerede bak `FRI_MOBLERING`; nå slettet — 0 svg-polygoner i 🛍 Scene).

Verifisert (headless): 18 plasser lastet (11 heng + 5 brett + 2 dukke); add →
19 → reload → 19 (utkast bevart); «Tøm utkast» → 18 + localStorage tømt;
«Kopier» → `vareplasser: [ … type:'heng' … dukketype:'dame' … ]` på utklippstavla;
previews på 0.4 + toggle skjuler dem; kun 1 etikett synlig (valgt); 0 trapes i
Scene. `tsc -b` + `vite build` grønt.

### Vareplass-rotasjon/skew + profil-heng-plasser (dagjobb)

**DEL 1 — transform per plass:** `Vareplass` fikk valgfrie `rot?`, `skewX?`,
`skewY?` (grader, default 0). Rendres på det snappede plagget via `plassTransform()`
(én kodevei for scene-render + tracer-preview): `transform: translate(anker)
rotate(rot) skewX skewY`, med `transform-origin` = **bunn** for brett/dukke,
**senter** for heng. Tracer: for VALGT punkt ±-kontroller for rot/skewX/skewY
(0.5°-steg, viser verdiene). Logg/Kopier tar med feltene **kun når ≠ 0**;
localStorage-utkastet dekker dem. Typisk bruk: vri/skjære brett-stabler i
perspektiv på et bord.

**DEL 2 — profil-variant på heng-plasser:** `Vareplass` type `heng` fikk
`variant?: 'front'|'profil'` (default front). Snap-filter (`nearestSlot` +
`data-variant` på ankeret): **profil-plass tar KUN profil-plagg, front-plass kun
front**, avgjort av plaggets sprite-kapasitet (`plaggStøtterHengVariant`). Tracer:
front/profil-velger når Heng er valgt; **profil-plasser har egen merking** (lilla
firkant vs. cyan sirkel). **NB-pilot:** profil-SPRITENE finnes ikke ennå —
`spriteHengProfil` er klargjort men tom for alle plagg; `spriteFor(..,'profil')`
faller tilbake til **front-spriten som midlertidig dev-placeholder** (rendrer/
forhåndsviser uten manglende bilde). Snap-KAPASITETEN bruker den EKTE profil-
spriten, så profil-plasser avviser front-plagg og forblir tomme uten krasj til
ekte sprites lander. `PROFIL_PLACEHOLDER`-bryter (default false) i
`klesbutikkPlagg.ts` lar Espen midlertidig la profil-plasser ta front-plagg for
visuell pilotering.

Verifisert (headless): satte rot 2° / skewX 1.5° / skewY 1° på en brett-plass →
localStorage-utkastet + det RENDREDE plagget viste nøyaktig
`translate(-50%,-100%) rotate(2deg) skewX(1.5deg) skewY(1deg)` (origin 50% 100%);
front-plagg sluppet på en profil-plass ble AVVIST (plassen forble ledig) mens det
snappet fint på en front-plass. Ingen konsollfeil. `tsc -b` + `vite build` grønt.

### 2 ark til: profil-heng (herre) + brett-stabler (herre)

**`klar-profil-ark-04` → 4 HERRE profil-heng** (`public/assets/raw/klar-profil/`):
`frakk-morkgraa`, `strikkegenser-marine`, `flanellskjorte-brun`, `bomberjakke-svart`.
Plaggene henger TETT/STAGET i profil på bøyle → bakgrunnsfjerning ga ÉN blob
(bøyle-tråder + overlapp), så den vanlige blob-splitten mislyktes. Egen splitter
`scripts/split-profil-ark.py`: **vertikale striper** ved tetthets-daler
(x≈224/362/492) + **kulør-basert nabo-sliver-fjerning** (blådominant marine ut av
grå frakk; varm brun flanell ut av marine genser) + behold-største-komponent.
Registrert i `klesbutikkPlagg.ts` som **nye oppføringer med kun `spriteHengProfil`**
(`PROFIL_HERRE_IDS`) → snapper bare til **profil-heng-plasser** (`variant:'profil'`).

**`klesark-10` → 4 brett-stabler HERRE** (`public/assets/raw/klar/`): `jeans-mork`,
`tskjorter-marine-graa`, `gensere-jordtoner`, `flanell-rutet` (2×2, ren blob-split).
Registrert som nye brett-plagg (`BRETT_HERRE_IDS`, merket herre i kommentar — ingen
kjønnsfelt på `Plagg` ennå). `split-product-sheet.py` fikk `klar-profil`-familien +
`klesark`→klar-ruting + navnekart «10»/«04».

**Palett-integrasjon:** thumbnail- og drag-sprite-fallbacks utvidet med
`spriteHengProfil` så profil-kun-plagg vises/dras. Profil-plaggene dukker opp i
Hengende-gruppa, brett-herre i Brettet.

✦-sjekk: vannmerket lå i tom bunn-h. på begge ark → utenfor alle utklipp (crops
trimmes til alfa-bbox), halo=0 på alle 8. Verifisert (headless): 8 palett-thumbs
med rett sti; profil-plagg (bomber) snappet til profil-plass og rendret
`klar-profil/…` i profil; profil-plagg AVVIST av front-plass. `tsc -b` +
`vite build` grønt.

### Port-lås (worktree ↔ hovedtre)

`vite.config.ts` i DENNE worktreen (`jobb/klesbutikk`) fikk
`server: { port: 5174, strictPort: true }` — dev-serveren binder alltid **5174**
og **feiler** hvis porten er opptatt (ingen stille auto-bump til en port som
kolliderer med hovedtreet). Verifisert (headless): `node_modules/.bin/vite` (uten
`--port`) bandt `localhost:5174` → HTTP 200; ingenting på 5173 fra dette treet.

**➡️ Til CC A / Espen (hovedtreet `/home/espen/adventure-web`, `main`):** den
tilsvarende låsen dit — `server: { port: 5173, strictPort: true }` i main sin
`vite.config.ts` — hører til **main** og er IKKE gjort herfra (denne grenen rører
ikke hovedtreet). Main sin config er per nå ULÅST (ingen `server`-blokk). Legg
låsen inn der på main-siden.

### FIKSJOBB synlighet (Espens kalibreringsfunn) + resten av profil-arkene

**⚠️ DEL 1 (lås Espens kalibrering, 43 plasser) — IKKE utført:** arrayen var IKKE
limt inn i oppdraget (bare plassholderen «[lim inn arrayen din her]»). Jeg kan
ikke gjette 43 kalibrerte plasser. `KLESBUTIKK.vareplasser` er URØRT (18 plasser:
11 Espen-kalibrerte heng + 5 grove brett + 2 grove dukke). **Lim inn arrayen, så
låser jeg den + committer «vareplasser: Espen-kalibrert v2 (43 plasser)».**

**DEL 2 — synlighetsfikser (alle utført + headless-verifisert):**
1. **Palett-undergruppe «HENGENDE — PROFIL»** (lilla) med ALLE profil-plagg. Jeg
   splittet også de resterende profil-arkene (`klar-profil-ark-01/02/03`, i tillegg
   til 04) → **16 profil-sprites** i `klar-profil/`. Split-verktøyet
   (`scripts/split-profil-ark.py`) fikk en **blob-modus** (maskér hver crop til
   egen komponent → ingen nabo-sliver) for de tre nye arkene; ark-04 beholder
   strip-modus. Paletten grupperer nå: **Hengende (40 front) · Hengende — profil
   (16) · Brettet (16)**. `startPlaggDrag` fikk `forceVariant` så drag fra en
   gruppe låser front/profil-varianten.
   - **AVKLART (Espen 2026-07):** profil-plaggene **beholdes STANDALONE**. Evt.
     paring til et eksisterende front-plagg (front-motpart / dual-variant) tas i
     en **senere jobb** — da flyttes `spriteHengProfil` over på front-plagget. Navn (innholds-basert): trenchcoat-beige, kabelgenser-
     hvit, skjorte-lyseblaa, lang-kjole-gronn, denimjakke-blaa, hoodie-beige,
     blazer-graa, lang-kjole-rosa, parka-gronn, skjorte-hvit, dunjakke-roed,
     denim-selebukse (+ ark-04: frakk-morkgraa, strikkegenser-marine,
     flanellskjorte-brun, bomberjakke-svart).
2. **Tracer:** VALGT punkt rendrer preview på **100 % opasitet** (uvalgte 40 % og
   kun med «vis previews»-toggle) → rot/skew ses live på full opasitet.
3. **Preview = representativ EKTE sprite per type+variant:** profil-plass →
   profil-sprite, front-heng → front-sprite, brett → stabel, dukke → matchende
   dukketype; rendret i plassens skala + anker/rot/skew.
4. **Snap-feedback:** under drag får kompatible LEDIGE plasser **grønn ring**
   (nærmeste = fylt + glød); inkompatible/opptatte **dimmes** (opacity 0.35).
5. **Port-lås:** `server.port 5174 + strictPort` er allerede satt (forrige runde);
   verifisert at `vite` binder 5174. **Main må låses til 5173 av CC A/Espen** —
   ikke rørt herfra (se «Port-lås»-seksjonen over).

Verifisert (headless): palett-overskrifter «Hengende (40) / Hengende — profil (16)
/ Brettet (16)»; profil-plass-preview = `klar-profil/…`, brett = `…-stabel`, valgt
= opacity 1 / uvalgt 0.4; heng-drag → 11 grønne ringer + opptatt plagg dimmet til
0.35. ✦-sjekk: halo=0 på alle 16 profil-crops, ingen nabo-rest etter blob-masking.
`tsc -b` + `vite build` grønt.

---

## LEVERANDØRKATALOG v1 — datalag + innkjøp + palettkobling

Bygget etter `docs/BRANSJE2_LEVERANDORER.md`: kvalitet er en egenskap ved
LEVERANDØREN (merkeposisjon + innkjøpspris = kvalitetssignal), ikke en tier-meny.

### DEL 1 — DATALAG
- **`klesbutikkBrands.ts` (ny):** `Brand { id, navn, segment, brandPull,
  personaAffinity[], kostFaktor, paaslag, farge }` + de **4 fiktive merkene** fra
  designdok:
  - **Basiq** (billigvolum, brandPull ingen, prisbevisste, kostFaktor 0.65)
  - **Strøm & Berg** (norsk-midt, moderat, familie/karriere, 1.0)
  - **Nordheim Atelier** (premium, sterk, trendsettere/karriere, 1.8)
  - **Fjellrev Works** (nisje-kvalitet, sterk, miljøbevisste/helse, 1.35)
  `BRAND_QUALITY` gir quality/sustainability per segment.
- **Plagg får `gender: 'dame'|'herre'|'barn'|'unisex'`** (`klesbutikkPlagg.ts`),
  migrert fra herre-/dame-/barn-kommentarene via regelbasert `genderFor()`
  ('-barn'/'-dame'-suffiks vinner; ellers eksplisitte herre/dame/barn-sett; resten
  unisex). Tunbart — juster settene i fila.
- **`klesbutikkKatalog.ts` (ny):** `VARE_TYPER` (18 plaggtyper med `plaggId` +
  `basisKost` + hvilke merker som fører den) → **`KLESBUTIKK_KATALOG`**: én
  `IndustryCatalogItem` per **(plaggtype × merke)** = 37 katalogvarer.
  `costPrice = basisKost × kostFaktor`, `recommended = costPrice × paaslag`. **Samme
  plaggtype føres av flere merker med ulik pris** (f.eks. Tskjorte: Basiq 36 /
  Strøm & Berg 55 / Nordheim 99 kr) — sammenlignings-mekanikken. Hver katalogvare
  peker på plaggets **sprite-sett** (front/profil/brett — det som finnes) via
  `plaggId`, og arver `gender`.
- `IndustryCatalogItem` utvidet med valgfrie `brandId/plaggId/gender/klesKategori`.
  `KLESBUTIKK.katalog = KLESBUTIKK_KATALOG` (var tom). `forteplaggIds()` for DEL 3.

### DEL 2 — INNKJØPSKATALOG (🏷 Innkjøp-fane)
- Ny toppnivå-fane i stillaset (`topView` = stillas ↔ innkjop). `InnkjopKatalog.tsx`
  grupperer katalogen på plaggtype så **merke-variantene ligger side om side** —
  eleven sammenligner samme plagg på tvers av merker. Per variant vises **innkjøp
  (costPrice) + veil. pris + MARGIN (kr + %)** — margin-regnestykket synlig per valg.
- **Filtre:** kjønn (dame/herre/barn/unisex) + kategori (overdel/skjorte/kjole/
  strikk/ytterplagg/bukse/stabel). «X varer ført»-teller.
- **«Før vare»-toggle** → `state.klesbutikkSortiment` (samme state-mønster som
  resten av stillaset: `SET_KLESBUTIKK_SORTIMENT`).

### DEL 3 — PALETT = KUN FØRTE VARER
- Styling-palettens plagg-grupper (**Hengende / Hengende — profil / Brettet**)
  viser **KUN førte plagg** (`forteplaggIds(state.klesbutikkSortiment)` — plaggId-er
  med ≥1 ført katalogvare). **Tom føring → tom palett + hint** «Gå til Innkjøp og
  velg sortiment». **`?dev=1` «vis alle»-bryter** un-gater (kalibrering uavhengig
  av føring).
- **Scope-valg (flagget):** **Dukker** (påkledde dukker) beholdes ALLTID synlige.
  De er en styling-primitiv, ikke en leverandørkatalog-vare i designet (merker
  gjelder plagg). Å føre dukker ville krevd en dukke-katalog utenfor
  BRANSJE2_LEVERANDORER.md — tas evt. i en senere jobb.

**Avgrensning (som bedt):** brandPull-effekt på trafikk, persona-scoring,
sesong-nedskrivning og kafé-leverandører er IKKE i denne jobben — kun
datalag + innkjøp + palettkobling.

**Verifisert (headless, `?dev=1`):** Tskjorte fra 3 merker med ulik costPrice
(36/55/99) + stigende margin (54/58/61 %); «Før vare» inkrementerer teller;
gender=Herre → kun herre-plagg (Frakk mørkgrå, Jeans mørk); palett viser kun ført
plagg, tom føring gir hint; dev «vis alle» → alle 72 plagg (+ 20 dukker). Ingen
konsollfeil. `tsc -b` + `vite build` grønt.

**➡️ Til Espen (valider + finpuss):** åpne `/dev/klesbutikk` → 🏷 Innkjøp: sjekk at
merke-miksen/prisene kjennes riktige (juster `basisKost` + hvilke merker som fører
hver plaggtype i `klesbutikkKatalog.ts`, og `kostFaktor`/`paaslag` i
`klesbutikkBrands.ts`). Før et sortiment → 🛍 Interiør: kun de førte plaggene er i
paletten. Vurder gender-tildelingen (`genderFor` + settene i `klesbutikkPlagg.ts`)
og om Dukker skal kunne føres.

### FIKSJOBB — katalogdekning + kjønnsfilter (Espens funn: altfor tynt)

Tre årsaker fikset:

1. **Kjønnsmerking var for gjerrig** (regelen sendte for mye til unisex).
   **Audit av ALLE 72 sprites visuelt** → gender satt **eksplisitt** i
   `klesbutikkPlagg.ts` (`GENDER_DAME`/`GENDER_HERRE`/`GENDER_BARN`-lister,
   resten unisex). Fordeling: **16 dame · 20 herre · 10 barn · 26 unisex**.
   Dresskjorter/frakk/bomber/parka/flanell = herre; kjoler/bluser/skjørt/kåpe =
   dame; barnestørrelser = barn; kun genuint nøytrale (t-skjorter, hoodies, enkle
   gensere, jeans, skjerf/luer, dun/fleece/softshell) = unisex. De 4 herre-brettene
   + 4 herre-profil-plaggene (ark 04) er herre.
2. **Filter-semantikk:** kjønnsfilteret **inkluderer unisex** —
   Herre = herre + unisex, Dame = dame + unisex, Barn = kun barn (barnestørrelser
   er egne varer), Unisex = kun unisex, Alle = alt (`InnkjopKatalog.tsx`).
3. **Katalogdekning:** `VARE_TYPER` utvidet fra 18 → **72** (dekker ALLE plagg med
   sprites). Hver type føres av 1–3 merker etter segmentlogikken (merke-kombiner
   `M.budget/bred/premium/premOut/outdoor/kvalitet/kids`). Ny kategori `tilbehor`
   (skjerf/luer); `stabel` erstattet av garment-kategori.

**Verifisert (headless) — plaggtyper per kjønnsfilter:**
**Alle 72 · Dame 42 · Herre 46 · Barn 10 · Unisex 26** (mål ≥8–10 nådd for
Dame/Herre/Barn). T-skjorte (unisex) vises under **både Dame og Herre**. 0 grupper
uten sprite (ingen brutt plaggId). Ingen konsollfeil. `tsc -b` + `vite build` grønt.

---

## B-RUNDE — Espens valideringsfunn + hyllelinje-portering

> 3 deler: (1) teller-enhet i innkjøpsfilteret, (2) føring→palett-kobling +
> dev-bryter, (3) portering av den delte `hyllelinje.ts`-modulen fra
> `eksperiment/autonom-sport`. **Headless-verktøy er nå tilgjengelig** i denne
> worktreen (Playwright fra hovedtreets `node_modules`) — brukt til å REPRODUSERE
> funn og pikseldiffe refaktor. Erstatter fortsatt ikke Espens visuelle godkjenning
> (CLAUDE.md); kun diagnostikk.

### DEL 1 — teller-enhet: plaggtyper (hovedtall) + varianter (parentes)

**Problem (Espen):** filter-tellerne var utydelige på ENHET. Katalogen har to
nivåer — **plaggtype** (f.eks. «Tskjorte») og **variant** (plaggtype × merke,
f.eks. Tskjorte @ Basiq / @ Strøm & Berg / @ Nordheim). Innkjøpskatalogen grupperer
på plaggtype (ett kort per type, merke-variantene side om side), så tellingen bør
tale i **plaggtyper** — men det var ikke merket, og «X varer ført» talte varianter
uten å si det.

**Fix (`InnkjopKatalog.tsx`):** alle tellere viser nå **plaggtyper som hovedtall +
varianter i parentes**, konsekvent:
- **Kjønns-knappene:** `Dame (42)` osv. — plaggtyper. Full form i `title`-tooltip:
  «Dame: 42 plaggtyper (86 varianter)».
- **Kategori-knappene:** `overdel (n)` osv. — plaggtyper.
- **Faset telling:** hver knapps tall = treff hvis DEN verdien velges sammen med
  det ANDRE aktive filteret (kjønn respekterer valgt kategori og omvendt), så
  tallet stemmer med det man faktisk får ved klikk.
- **Resultat-teller** (ny linje): «Viser: X plaggtyper (Y varianter)» for det
  aktive filteret.
- **Føring-teller (semantikk avklart + dokumentert):** `state.klesbutikkSortiment`
  lagrer **katalogvare-id-er = VARIANTER** (plagg × merke). En ført plaggtype kan
  ha flere førte varianter. «X varer ført» → **«Ført: N plaggtyper (M varianter)»**.
  **Valg:** plaggtyper er hovedtallet fordi det er DET styling-paletten styler etter
  (paletten viser plaggtyper, se DEL 2) — så føring-telleren og palett-innholdet
  taler nå samme enhet. Varianter beholdes i parentes (det er den faktiske
  innkjøps-/økonomi-enheten: hver variant har egen innkjøpspris/margin).

**Verifisert (headless, `?dev=1` → 🏷 Innkjøp):** plaggtyper per kjønnsfilter
**Alle 72 · Dame 42 · Herre 46 · Barn 10 · Unisex 26** — matcher
katalogspesifikasjonen eksakt. Varianter (LIVE fra `KLESBUTIKK_KATALOG`, ikke
oppdragets øyemål-tall): **Dame 86 · Herre 96 · Barn 20 · Unisex 54** (totalt 148
katalogvarer). Oppdragets parentes-tall (85/97/…/56) var estimater; de faktiske
katalogtallene vises. `tsc -b` grønt.

### DEL 2 — føring→palett-kobling: ROTÅRSAK + dev-bryter

**Funn (Espen):** «ser ALLE plagg i interiør-paletten til tross for kun 7 førte
varer.»

**ROTÅRSAK — REPRODUSERT headless, ikke gjettet.** Verken (a) «default på» eller
(b) «koblingen er brutt» stemmer for en ren økt:
- **Ren last (`?dev=1`, tom føring):** paletten er TOM + hint «Ingen varer ført».
  Bryteren `visAllePlagg` er `false` (`useState(false)`).
- **Etter å ha ført 3 varer → tilbake til Interiør:** paletten viser KUN de førte
  (målt: «Hengende (2)»), IKKE alle 72. **Koblingen `forteplaggIds(sortiment)`
  → palett virker.**
- **Etter å skru PÅ dev-bryteren:** paletten viser alle (40 + 16 + 16).
- **Etter modus-/fanebytte (📌 Vareplass → 🛍 Scene):** bryteren **nullstilles til
  `false`** (FloorLayer remountes; `topView='innkjop'` og dev-modusene rendrer
  scenen betinget, så komponenten forlater DOM og `useState` reinitialiseres).

**Konklusjon:** koblingen er intakt og standarden er allerede KUN FØRTE i både dev
og produksjon. Espen så alle plagg fordi **`?dev=1`-bryteren var PÅ** i økten hans —
og den gamle etiketten «vis alle (ignorer føring)» leste ikke som et DEV-override,
så resultatet ble forvekslet med en brutt kobling.

**Fiks (`KlesbutikkStillas.tsx`, klespaletten):**
1. **Relabel + DEV-merking:** «vis alle (ignorer føring)» → **«DEV: vis uførte
   (kalibrering)»**, i en gul (`#ffd24a`) dev-innramming lik de andre
   dev-verktøyene. Umulig å forveksle med en produksjons-kontroll.
2. **Advarsel-banner når PÅ:** «⚠ Viser ALLE plagg (også uførte) — kun for
   kalibrering. Skru av for å se det faktiske sortimentet fra 🏷 Innkjøp.» → man vet
   alltid at paletten ikke speiler føringen når overriden er aktiv.
3. **Alltid av ved oppstart:** `useState(false)` beholdt; bekreftet at
   fane-/modusbytte nullstiller den (remount). Ingen persistering.
4. **Standard = KUN FØRTE** (uendret, nå bekreftet): tom føring → tom palett +
   hint til 🏷 Innkjøp. **Dukker vises ALLTID** (styling-primitiv, ikke
   katalogvare — etablert regel), upåvirket av føring/override.

**Verifisert (headless):** ren last → etikett «DEV: vis uførte (kalibrering)»,
checkbox `false`, tom-føring-hint synlig, banner skjult. PÅ → checkbox `true`,
banner synlig, hint skjult. Modus-roundtrip → checkbox tilbake til `false`, banner
borte, hint tilbake. `tsc -b` grønt.

### DEL 3 — hyllelinje-modulen portert fra C (piksel-identisk)

**Mål:** ta i bruk den delte, portable geometri-modulen
`src/game/geometry/hyllelinje.ts` fra `eksperiment/autonom-sport` (se
`docs/AUTONOM_PIPELINE.md` §6–7) UTEN adferdsendring.

**Portering:**
1. **Kopiert modulen verbatim** (`git show origin/eksperiment/autonom-sport:…`) →
   `src/game/geometry/hyllelinje.ts` (86 linjer, ingen bransje-avhengigheter).
   Eksporterer `Hyllelinje`, `PlassTransformOpts`, `plassTransform`, `pointAlong`,
   `projOnLine`, `snapToLine`.
2. **`KlesbutikkStillas.tsx`:** den lokale `plassTransform` er nå en tynn
   bransje-**adapter** som delegerer til modulen
   (`import { plassTransform as hyllelinjeTransform }`). Adapteren oversetter
   klesbutikkens `Vareplass.type` til modulens eksplisitte `bottomAnchored`
   (`bottomAnchored: vp.type !== 'heng'`). **Begge kallstedene** (scene-render +
   tracer-preview) står UENDRET (`plassTransform(vp)`) — minimal diff.
3. **`industryDefinition.ts`:** `import type { Hyllelinje }` fra modulen +
   `export type { Hyllelinje }` (re-eksport, så bransje-kode kan importere den her
   som de øvrige geometri-typene) + nytt valgfritt felt
   `IndustryDefinition.hyllelinjer?: Hyllelinje[]` (del av adopsjonen; klesbutikken
   bruker DISKRETE `vareplasser` + DOM-anker-snap, ikke linjer, så feltet står tomt
   og klart for evt. senere linje-kalibrering).

**Hvorfor piksel-identisk:** modulens `plassTransform` er byte-ekvivalent med den
gamle lokale koden — `type !== 'heng'` ↔ `bottomAnchored`, samme anker
(`translate(-50%,-100%)` / `translate(-50%,-6%)`), samme rot/skew-konkatenering,
samme `transformOrigin`. Ingen rekalibrering; de 42 Espen-låste vareplassene
(`KLESBUTIKK.vareplasser`) er urørt.

**PIKSELDIFF (C-metoden, headless):** rendret 📌 Vareplass-traceren med previews på
alle **42 plasser** (heng/brett/dukke, inkl. brett-plasser med rot/skew) i EN ren
context (tom localStorage → låste defaults). Skjermbilde FØR porteringen og ETTER,
diffet via canvas `getImageData` (1400×820):
- **non-identical pixels: 0 · max channel delta: 0.**
Beviselig ingen adferdsendring — akkurat som sport-porteringen (§7: «max 0, 0
avvikende piksler»).

**Merk:** klesbutikken har ingen EGEN hyllelinje-/shelf-line-geometri å migrere ut
over `plassTransform` — snappingen bruker DOM-anker (`nearestSlot`, `data-plass`),
ikke `snapToLine`, og plasseringen er diskrete `vareplasser`, ikke linjer. Modulen
er derfor ADOPTERT (geometri-transformen bor nå i den delte modulen, typen
re-eksporteres, feltet finnes) uten at snap-/linje-funksjonene tas i bruk ennå.
`tsc -b` + `vite build` grønt.

---

## KASSEVY + FASHION-KUNDER (originaloppdrag DEL 2/3)

> Espens pilot ENDELIG valgt: `public/assets/raw/klesbutikk-kassevy.png` (1296×832) —
> bak-disken-vy med disk over hele bredden (jevn okklusjonslinje).

### Pilot-bildet (rename + ✦)
- Espen la fila som `klesbutikk-kassevy.png.png` (dobbel-endelse fra nedlasting) +
  Windows `:Zone.Identifier`. Kun ÉN kassevy-fil i treet ⇒ ingen tvil om HVILKEN
  fil; renamet til **`klesbutikk-kassevy.png`**, Zone.Identifier fjernet.
- **⚠️ ✦-vannmerke IKKE fjernet (FLAGGET):** det ligger et synlig ✦ nederst-h. på
  søylen. Jeg forsøkte en canvas-blokkpatch, men den ga en SYNLIG rektangulær
  skjøt (verre enn ✦-et) — miljøet mangler PIL/imagemagick/inpaint. Jeg vil IKKE
  hardpatche Espens ENDELIG valgte pilot og risikere et verre artefakt. **Espen:
  bestem — enten (a) godta ✦ (fjernt hjørne), eller (b) fjern det med ordentlig
  verktøy / regenerer.** Raw-fila ER pilotbildet (ingen egen `-raw` siden pikslene
  er urørt).

### DEL 2 — kassevy-rute + okklusjon/kunde-base (delt base)

**Rute/navigasjon:** ny scene-fane **💰 Kasse** i `KlesbutikkStillas` (samme
tab-mønster som 🏬 Fasade / 🛍 Interiør — `SCENES`-array + `sceneId`-state, ikke en
egen React-route). Åpnes på **`/dev/klesbutikk`** (💰 Kasse-fanen). `?dev=1` gir
🛍 Scene (kalibrering) + 🧭 Soner (kunde-base-tracer). Bak-disken-vyen er kafeens
kassevy-MØNSTER (InteriorView), men som en STILLAS-scene (bransjen er inaktiv).

**Delt base (`src/game/geometry/kassevyBase.ts`, ny):** okklusjons- +
kunde-plasserings-geometrien er trukket ut til en frittstående modul (ingen
bransje-import) — samme rolle som `hyllelinje.ts`. Eksporterer:
- `interface KassevyKonstanter` (de fem: `SCALE/CENTER_X/WAIST_Y/OCCLUDE_Y_LEFT/
  OCCLUDE_Y_RIGHT`) + `WAIST_FRAC` + `interface SpriteCal` (per-kunde delta).
- `occlusionClipPath(left,right)` → forgrunns-disk-lagets `polygon(...)`.
- `customerAnchorStyle(k, cal?)` → kunde-spriten forankret på livlinja (+ spriteCal).
Klesbutikkens kassevy bruker basen med sine EGNE konstanter; **kafeens InteriorView
er RØRT IKKE** (motor — CLAUDE.md), men er referanse-mønsteret basen er hentet fra
og kan adoptere den senere.

**Konstanter (`districts.ts`, ⚠️ FØRSTEPASNING — CC-kalibrert, IKKE Espen-låst):**
```
KLESBUTIKK_KASSE_SCALE          = 1.06
KLESBUTIKK_KASSE_CENTER_X       = 47
KLESBUTIKK_KASSE_WAIST_Y        = 67
KLESBUTIKK_KASSE_OCCLUDE_Y_LEFT = 72     (disk-toppens bakkant ≈ 72 %)
KLESBUTIKK_KASSE_OCCLUDE_Y_RIGHT= 71.5   (jevn disk ⇒ nær like)
KLESBUTIKK_KUNDE_BASE           = [34, 40, 28, 30]   (midtfeltet av gulvflaten)
```

**Skjermbilde-løkke (AUTONOM_PIPELINE-metoden, 2 runder):** render `?dev=1` →
💰 Kasse → 🛍 Scene headless (fersk context ⇒ leser gjeldende konstanter; Vite
Fast-Refresh beholder ellers `useState`, men fersk navigasjon reinitialiserer).
R1 (grove startverdier): kunden litt for stor + okklusjon 2 % over disk-bakkanten.
R2: `SCALE 1.12→1.06`, `WAIST_Y 66→67`, `OCCLUDE 70/69→72/71.5`. Verifisert mot TO
kunder (dame-camel-veske + arbeidsmann-korslagt): begge står bak disken, okkludert
ved hoften nøyaktig der disk-bakkanten er (bekreftet clipPath `polygon(0% 72%,
100% 71.5% …)` + kunde `top:67% height:106%`). PROD + DEV: 1 kunde-sprite, 0
konsollfeil. 🧭 Soner-traceren rendrer for kassevy (target=KUNDE_BASE, gjenbruker
`ZoneTracer`), kunden skjult i sone-modus. `tsc -b` + `vite build` grønt.

**Kunde-registser (`src/game/data/klesbutikkKunder.ts`, ny):** de 8 fashion-kundene
(id/navn/sprite + valgfri `spriteCal`), brukt av kassevy-kunde-velgeren (dev) og
senere scenario-koblingen. `KassevyLayer` (i `KlesbutikkStillas.tsx`) rendrer kunde
(z10) + forgrunns-disk-lag (z20) + 🎚️-cal-panel (kunde-velger + 5 slidere +
«Logg»/«Kopier» → districts.ts).

**➡️ Til Espen (finpuss + LÅS i Chrome):** `/dev/klesbutikk?dev=1` → 💰 Kasse.
🛍 Scene: dra kunden (SCALE/CENTER_X/WAIST_Y) + disk-kanten (OCCLUDE_Y_LEFT/RIGHT)
med 🎚️-panelet, bla gjennom alle 8 kundene i velgeren så okklusjonen sitter for
alle, «📋 Kopier» → lim inn i `districts.ts` (KLESBUTIKK_KASSE_*). 🧭 Soner: trace
KUNDE_BASE (midtfeltet av gulvet). ✦-vannmerket: se bilde-avsnittet over.

### DEL 3 — fashion-kundeark: splitt + kunde-registser (inaktivt)

**a/b) Splitt (COMMITTET tidlig — DEL 2-kalibreringen trengte en ekte kunde):**
oppdragets «ark 01/02» = FYSISK `customers-ark-03/04-raw.png` (numrene stokket, som
`klar`-arkene tidligere). ark-02 er kafé-kundene (allerede splittet). De to
fashion-arkene (Espen lastet opp, dobbel-endelse ryddet) splittet med
`split-product-sheet.py` (rembg u2net, 4 blobs/ark, halo=0, ✦ utenfor figurene) →
**8 kunde-sprites** i `raw/customers/`:
`dame-camel-veske`, `mann-skjegg-pakke`, `forretningsdame-klokke`,
`mann-strikk-mobil` (ark-03) · `ung-mann-sekk`, `dame-forerhund` (m/førerhund —
universell utforming), `arbeidsmann-korslagt`, `ung-dame-skjerf` (ark-04).
`CUSTOMERS_DIR` var hardkodet til MAIN-treet → rettet til worktree; navnekart 03/04
lagt til. Verifisert visuelt (grå montasje): ren alfa, ingen halo/nabovare-rest.

**d) Per-kunde spriteCal — FØRSTEPASNING (skjermbilde-løkke, alle 8):** rendret alle
8 kundene i kassevy-scenen. Den delte base-kalibreringen (DEL 2) traff **ALLE 8**
rent — ingen svever/synker, alle okkluderes ved disk-kanten. Derfor er `spriteCal`
UTELATT (= ren base) på alle i første pass (`klesbutikkKunder.ts`). Feltet står
klart for per-kunde dx/dy/scale i 🎚️-panelet der Espen vil finjustere en enkelt
kunde.

**c/e) Kobling til scenario-datastrukturen — ⚠️ AVKLART MED ESPEN, IKKE koblet:**
De 6 «inaktive klesbutikk-scenariene» **finnes ikke i koden**:
`KLESBUTIKK.scenariePool = []`, ingen fashion-`SalesScenario` i `sales/scenarios.ts`,
og `docs/BRANSJE2_KLESBUTIKK.md` nevner bare KONSEPTENE (prøverom / bytterett /
størrelsesråd — eksplisitt «egen runde»). Å definere 6 scenarier + kunde↔scenario-
mapping ville vært GJETTET innhold (CLAUDE.md: «Aldri gjett»). **Espens beslutning:
KUN kunde-registser nå** — ingen `SalesScenario`-stubs før han spesifiserer de 6.
- **Datastrukturen som er levert:** `src/game/data/klesbutikkKunder.ts`
  (`KasseKunde { id, navn, sprite, spriteCal? }` + de 8 kundene). Rent
  presentasjons-/kalibreringslag; brukes av kassevy-kunde-velgeren (DEL 2).
- **FLAGGET (DEL 3e):** de 6 scenario-DEFINISJONENE mangler helt — ingen sprite
  «mangler» for en definert scenario ennå, fordi ingen scenarier er definert. 8
  kunde-sprites står klare. Ingen nye NB-ark generert (pilot-regelen).

**➡️ Til Espen:** når du vil skrive de 6 scenariene, gi meg navn + skjult behov (+
evt. dialog/utfallstype) per scenario, så kobler jeg de 8 kundene (eller flagger
hvilke scenarier som mangler en passende kunde-sprite) og legger dem i
`sales/klesbutikkScenarios.ts` — fortsatt INAKTIVT (utenfor `scenariePool`) til du
sier fra. De 8 kandidatene med sprite ligger i `klesbutikkKunder.ts`.

---

## Verifisering
- `tsc -b`: grønt. `vite build`: grønt (moduler bundler, scenebilder + sprites
  serves fra `/assets/raw/…`). `dist/` slettet etterpå.
- **Headless nå tilgjengelig** (Playwright fra `/home/espen/adventure-web/
  node_modules`, port 5174 låst) — brukt til reproduksjon + pikseldiff. Visuell
  KVALITET bekreftes fortsatt av Espen i Chrome.

## Nøkkelfiler (dette sporet)
- `src/data/districts.ts` — `KLESBUTIKK_VINDU`/`KLESBUTIKK_BUTIKKVEGG` (låst),
  `MonterTrau.skewX/skewY`
- `src/game/data/industryDefinition.ts` — `KLESBUTIKK`, `StylingFlate.skewX/skewY`,
  `SvinnRegel`
- `src/game/city/KlesbutikkStillas.tsx` — stillas-scene + sone-tracer + skew-panel
- `src/App.tsx` — rute `/dev/klesbutikk`
- `scripts/split-product-sheet.py` — fixtures-familie + SKIP

## Neste steg (utenfor dette stillaset)
1. Ekte inventar-plasser i butikkveggen (stativ/hylle/bord/dukke som sprites,
   docs/BRANSJE2_KLESBUTIKK.md) — så kalibrerer Espen skew mot faktisk innhold.
2. Leverandør-/merkekatalog (docs/BRANSJE2_LEVERANDORER.md) → fyll `katalog`.
3. Sesong-mekanikk (docs/BRANSJE2_SESONG.md) → implementer `svinnRegel: 'sesong'`.
4. Registrer `KLESBUTIKK` i `INDUSTRY_DEFINITIONS` + geometri-bytte i motorene
   når bransjen skal bli reelt aktiv (se docs/BRANSJE_DEFINISJON.md).
