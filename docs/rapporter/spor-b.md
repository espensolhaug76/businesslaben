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

## Verifisering
- `tsc -b`: grønt. `vite build`: grønt (moduler bundler, scenebilder + sprites
  serves fra `/assets/raw/…`). `dist/` slettet etterpå.
- Ingen headless-nettleser i miljøet → visuell render bekreftes av Espen i Chrome.

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
