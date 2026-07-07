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
- **HYLLE er veggmontert:** eget mål = butikkvegg-sonen (KLESBUTIKK_BUTIKKVEGG),
  fast skala (`HYLLE_WALL_SCALE`); kun hylla lander der.
- Vareplass-modellen (klesbutikkFixtures.ts) UENDRET — markørene følger møbelets
  pos/skala (barn av møbel-boksen). `?dev=1` viser dem.
- **State:** `KlesbutikkFixtureItem` er nå `{ id, fixtureId, fotpunkt }`
  (fotpunkt i % av scenebildet) — erstatter plassId-modellen.

**Tre dev-moduser** (?dev=1): 🪑 Møbler · 📐 Gulvplan · 🧭 Soner.

**➡️ Til Espen (valider i Chrome, `/dev/klesbutikk?dev=1`):** 📐 Gulvplan → dra
de 4 hjørnene så trapeset dekker tregulvet, juster front/bak-skala mot preview-
dukkene til dybden ser riktig ut, «Logg objekt» → lim inn i `KLESBUTIKK.gulvplan`
(industryDefinition.ts). Deretter 🪑 Møbler → sjekk at skyving i dybden ser
naturlig ut. HYLLE-veggsonen kan re-traces i 🧭 Soner ved behov.

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
