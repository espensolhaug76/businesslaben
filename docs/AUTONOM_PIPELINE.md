# Autonom bransje-pipeline — gjenbruksoppskrift

Denne fila er en **komplett, gjenbrukbar oppskrift** for å bygge en NY bransje
(f.eks. et hotell, en klesbutikk, en dyrebutikk) *autonomt* — fra tomt tre til en
ferdig stocket, kalibrert butikk som kan vises fram. Den er skrevet ut fra det
som FAKTISK ble gjort i `eksperiment/autonom-sport` (sportsbutikken); den fulle
kronologiske loggen med alle avvik ligger i `docs/rapporter/spor-c.md`.

**Målgruppe:** en fersk CC-instans i en ny worktree som skal bygge bransje N,
uten annen kontekst enn `CLAUDE.md` + denne fila. Les `CLAUDE.md` FØRST — den
gjelder alltid (bokmål, ingen tekst i bilde-assets, aldri gjett koordinater,
aldri push uten Espens visuelle godkjenning, kjør `tsc -b` — ALDRI
`npx tsc --noEmit`).

> **Ærlighet framfor markedsføring.** Denne oppskriften tar med det som IKKE
> fungerte og hvorfor (forkastede ark, svevende varer, feil perspektiv-retning),
> ikke bare suksessene. Det er det som gjør den brukbar neste gang.

---

## 0. Mentalt kart — hva bygger vi egentlig?

Sluttproduktet er en **frittstående dev-scene** (`/dev/<bransje>`) som IKKE er
koblet til spillflyten. Den viser:

- ett **bakt interiør** (ett NB-generert bilde av en ferdig møblert, TOM butikk),
  brukt som bakgrunn, PLUSS
- N **vareplasser**: faste, kalibrerte punkter (i % av scenebildet) der én
  NB-generert vare-sprite tegnes oppå bakgrunnen.

Ingen GameContext, ingen scenarier, ingen state-drevet geometri. Bransjen
registreres BEVISST IKKE i `INDUSTRY_DEFINITIONS` (motorene rendrer fortsatt kun
kafeen) — den vises kun via sitt eget stillas. Å gjøre bransjen faktisk spillbar
er en separat, mye større jobb (se `docs/BRANSJE_DEFINISJON.md`) og er UTENFOR
scope for denne pipelinen.

Fasene, i rekkefølge:

```
1. NB-prompting  →  2. Splitting  →  3. Katalog/datamodell  →  4. Stillas-scene
                                                                      │
                                          5. SELVKALIBRERING (skjermbilde-løkka)
```

Fase 1–2 lager bildene. Fase 3 lager data. Fase 4 lager scenen. Fase 5 er der du
faktisk tjener pengene: du plasserer varene på møblene ved å lese dine egne
skjermbilder og iterere.

---

## 1. Fase 1 — NB-prompting (generer bildene)

Verktøyet er `scripts/nb-generate.sh`. Det kaller Gemini-bildemodellen
(«nano-banana») DIREKTE over HTTP og skriver PNG rett i `public/assets/raw/`.

```bash
source ~/.bashrc   # GEMINI_API_KEY bor her; non-interaktivt shell har den ikke
./scripts/nb-generate.sh <utfilnavn> "<prompt>" [referansebilde ...]
```

- **Modell:** `gemini-3.1-flash-image` (default). **ALDRI** Pro-tierne
  (`gemini-3-pro-image`, `nano-banana-pro-preview`) — de fakturerer tungt. Hold
  deg på en *flash*-tier. `NB_MODEL=…` overstyrer hvis nødvendig.
- **Auth:** kun `?key=`-param virker (scriptet gjør dette); Bearer-header gir
  `API_KEY_SERVICE_BLOCKED`.
- **Exit-koder:** `0` = PNG skrevet · `1` = feil bruk / manglende nøkkel /
  fil ikke funnet · `2` = 403/429 (fall tilbake) · `3` = svar uten bilde
  (safety-block — skriv om prompten).

### 1a. Stilformelen (KRITISK)

Hvert motiv-kall skal bruke stil-ankeret verbatim OG et EKSISTERENDE bilde som
visuell referanse. Nano-banana regredierer til flat 2D-tegning uten tungt anker
— derfor:

> **`3D-rendered miniature diorama style`** … *like a high-end toy or
> architectural maquette photographed from a ~30° isometric angle. Think Hay Day
> / Township / Animal Crossing. Physically modeled, volumetrically lit,
> stylized but dimensional. **NOT 2D illustration, NOT digital painting, NOT
> cel-shaded cartoon.** Muted, naturalistic, slightly desaturated palette.*

Den fulle stilblokka (materialkrav, AO, glass-refleksjoner osv.) står i
`docs/ASSET_STYLE_GUIDE.md` §1 — lim den inn i hver interiør-/fasade-prompt.

- **Referansebilde:** gi ALLTID et eksisterende asset som visuell forankring så
  nytt materiale matcher perspektiv/lys. I sport-eksperimentet:
  interiør → `public/assets/raw/interior-cafe.png`, fasade →
  `public/assets/raw/sports_shop.png`. For bransje N: velg det nærmeste
  eksisterende interiør-/fasadebildet som anker.
- **ALDRI tekst eller logoer i bildet.** Skilt/tavler/etiketter genereres
  tekstfrie; all tekst legges på i CSS/DOM senere (CLAUDE.md-regel). Skriv
  eksplisitt «blank sign band, no text, no logos» i prompten. Ekte merkenavn er
  ALDRI tillatt i assets.
- **Vannmerke:** nano-banana embedder trolig et USYNLIG SynthID-merke (kan ikke
  detekteres/fjernes — ikke et problem). SYNLIGE ✦-merker er sjeldne; sjekk alle
  fire hjørner + bunnstripa via crop før du bruker bildet. Fant du ingen synlig —
  ingen patching nødvendig (det var tilfellet i sport).

### 1b. Motivene du trenger

| Motiv | Antall NB-kall | Merk |
|---|---|---|
| Bakt interiør (tom, møblert butikk) | 1 | Skovegg/hyller/bord/stativ etter bransje. Anker til et eksisterende interiør. |
| Fasade (storefront) | 1 | Rett-på, blankt skiltbånd, hvit bakgrunn → rembg. |
| Produktark (varegrupper) | 1 per varegruppe | Rutenett av varer, se fase 2. |

### 1c. Piloter FØR batch — maks 2

Kjør maks **2 pilotbilder** (typisk: interiør + fasade), les dem visuelt, og bare
DA gå videre til produktark-batchen. Ikke fyr av seks ark før du vet at stil-
formelen treffer. I sport ble interiør + fasade godkjent på 1. forsøk; ett par
produktark måtte regenereres (se fase 2). Totalforbruk i sport: **11 av 25**
NB-kall — god margin. Hold deg langt under kvoten.

### 1d. Etterbehandling

Rå-PNG-en har bakgrunn. Fasade + enkeltmotiv → `scripts/clean-asset.sh <fil>`
(rembg, ren alfa). Produktark → fase 2 (splitting gjør rembg + oppdeling i ett).

> **Advarsel — hardkodede repo-stier.** `scripts/clean-asset.sh` og deler av
> `split-product-sheet.py` har konstanter som peker på `/home/espen/adventure-web/`
> (det ANDRE repoet, av historiske grunner). Sjekk hvor output faktisk havner.
> Sport-familien i split-scriptet løser repo-relativt (fra scriptets egen
> plassering) nettopp for å unngå dette — gjør likt for bransje N.

---

## 2. Fase 2 — Splitting (produktark → enkelt-sprites)

Verktøyet er `scripts/split-product-sheet.py`. Ett produktark (rutenett av varer
på hvit/nær-hvit bakgrunn) → N navngitte enkeltutklipp med ren alfa.

Pipeline per ark: `rembg` fjerner bakgrunn → hver vare blir en egen
connected-component (blob) → blobs sorteres i **lese-rekkefølge (rad for rad,
venstre→høyre)** → hver blob croppes til sin alfa-bbox (+pad) og lagres som
`<navn>.png`.

### 2a. Familie-mønsteret

Scriptet skiller ark-familier på **filnavn-prefiks**, som avgjør både målmappe og
navnekart. For en ny bransje: legg til en familie (kopier `sport`-mønsteret):

```python
# 1) Mappe (repo-relativ — IKKE hardkod en absolutt sti til feil repo)
_REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOTELL_DIR = os.path.join(_REPO_ROOT, "public/assets/raw/hotell")

# 2) Navnekart per ark-nummer, i LESE-rekkefølge (rad for rad, v→h)
HOTELL_NAME_MAPS = {
    "01": ["seng-enkelt", "seng-dobbel", ...],   # ark-01
    "02": [...],                                    # ark-02
}

# 3) I resolve_family(): koble prefikset "hotell-ark" til (DIR, MAPS, DIR)
if base.startswith("hotell-ark"):
    return HOTELL_DIR, HOTELL_NAME_MAPS, HOTELL_DIR
```

Kjør: `python scripts/split-product-sheet.py hotell-ark-01-raw.png`
(navn hentes fra kartet), eller med eksplisitte navn til slutt for å overstyre.

- **Rutenett:** 2×3 (6 varer) er en trygg standard. NB pakker av og til høye/smale
  varer i flere kolonner enn du ba om (sport-ark-02 ga 8 plagg tross «eksakt 6») —
  aksepter og gi alle de faktiske navnene, eller regenerer.
- **id = sprite-filnavn.** Vare-id-en du bruker i katalogen MÅ matche
  `<navn>.png`. Hold navnene konsistente på tvers av kart/katalog/sprite-register.

### 2b. Modellvalg — u2net vs isnet-general-use

Default rembg-modell er **u2net**, og den er riktig for de fleste ark.

- **Lav-kontrast metall/grå fikstur** (håndvekter, stål, grå utstyr): u2net kan
  DROPPE varen (leser den som bakgrunn). Kjør da med
  `--model isnet-general-use` — den holder på lav-kontrast-objekter u2net mister.
- **Menneske-positurer** (kundeark): `u2net_human_seg` løser noen positurer men
  lager artefakter på andre — ikke en universell erstatning. Kjør per ark og
  sammenlign visuelt.

Regelen: kjør default først, LES utklippene, bytt modell KUN der default feiler.

### 2c. Kjente feilkilder ved splitting

- **For få blobs / advarsel «antall blobs != antall navn»:** to varer henger
  sammen (blir én blob) eller en drukner i bakgrunnen. Juster `MIN_AREA_FRAC`
  eller bytt modell (2b), eller regenerer arket renere.
- **Uønskede diorama-sokler:** NB la av og til en liten gress/plate-sokkel UNDER
  hver vare (sport-ark-04 v1) → ekstra blobs / skitne utklipp. Skriv «no base, no
  platform, no ground shadow plate, isolated objects on plain white» i prompten,
  og forkast+regenerer arket.
- **Halo:** scriptet rapporterer en `halo`-teller (hvite semi-transparente
  kantpiksler) per utklipp. Høyt tall = hvit-glød; regenerer eller etterrens.

**Alltid:** monter alle sprites på en grå bakgrunn og LES dem visuelt — ren alfa,
ingen nabovare-rest, ingen halo/vannmerke. Dette kan du gjøre headless.

---

## 3. Fase 3 — Katalog / datamodell

Tre ting: (a) katalog med pris, (b) sprite-register, (c) bransjedefinisjon.
Mønsteret er `industryDefinition.ts` + `industries.ts` + `sportVarer.ts`.

### 3a. Katalog + pris (`src/game/data/industries.ts`)

Lag en bygger for durable goods (ikke ferskvare/trau som kafeens `catalogItem()`).
Kopier `sportItem()`:

```ts
function hotellItem(
  id: string, name: string, icon: string, category: ProductCategory,
  maxDemand: number, cost: number, price: number,
): IndustryCatalogItem {
  return {
    id, name, icon, category, trauVare: false,
    sprite: `/assets/raw/hotell/${id}.png`,   // id === sprite-filnavn
    maxDemandPerMonth: maxDemand, quality: 8, sustainability: 6,
    costPrice: cost, recommendedPrice: price,   // Priser-fanen; ÉN priskilde
  }
}
```

- `Product.retailPrice`/`recommendedPrice` er DEN ENE prissettingskilden — ikke
  gjeninnfør per-tier-priser (CLAUDE.md).
- Utvid `ProductCategory` i `src/game/types.ts` med de nye varegruppene (sport la
  til `'sko' | 'bekledning' | 'utstyr'`).
- Legg katalogen i `INDUSTRY_CATALOG.<bransje>` og metadata i `INDUSTRY_META`.

### 3b. Sprite-register (`src/game/data/<bransje>Varer.ts`)

Rent presentasjonsregister: vare-id → sprite-sti + hvilken **plass-type**
(møbeltype) varen hører hjemme på. Kopier `sportVarer.ts`. Dette er BILDE-siden;
pris/økonomi bor i `industries.ts`.

```ts
export interface HotellVare { id: string; navn: string; sprite: string; type: PlassType }
```

Eksporter også en `repVareForType(type)`-hjelper (første vare av en type) —
traceren bruker den som live-preview på tomme plasser.

### 3c. Bransjedefinisjon (`src/game/data/industryDefinition.ts`)

Legg til et `<BRANSJE>`-objekt (kopier `SPORT`). Det bruker VAREPLASS-modellen
(bakt interiør), ikke disk-monterens trau:

```ts
export const HOTELL: IndustryDefinition = {
  id: 'hotell', navn: …, emoji: …, katalog: INDUSTRY_CATALOG.hotell,
  flater: { styling: …, lager: {
    sceneImage: '/assets/raw/hotell-interior.png',  // bakt interiør, kun referanse
    trau: [], trauCols: () => 1, speil: { sceneImage: '', trau: [] },
  }},
  vareplasser: [ /* fylles i fase 5 */ ],
  hyllelinjer: [ /* fylles i fase 5 */ ],
  // … forsyning, roller, personaBudsjett, svinnRegel …
}
```

- **IKKE** registrer den i `INDUSTRY_DEFINITIONS` (la den stå som SPORT/KLESBUTIKK
  — stillas-only, ikke aktiv i motorene).
- `Vareplass`-typen (`{ id, type, x, y, scale, vare?, rot?, skewX?, skewY? }`) og
  `PlassType`-unionen bor allerede her. `Hyllelinje`-typen bor i den portable
  modulen `src/game/geometry/hyllelinje.ts` (importeres + re-eksporteres). Se §7.

---

## 4. Fase 4 — Stillas-scene med tracer

Kopier `src/game/city/SportStillas.tsx` → `<Bransje>Stillas.tsx` og bytt import
(sprite-register + `<BRANSJE>`-objektet). Registrer ruten i `src/App.tsx`:

```tsx
<Route path="/dev/hotell" element={<HotellStillas />} />
```

Scenen:

- **Bakgrunn:** det bakte interiøret, `background-size: cover`, i en boks med
  `aspectRatio: SCENE_W / SCENE_H` (bildets EGNE pikselmål — les dem av med
  `identify` eller PIL, sett `SCENE_W`/`SCENE_H` og
  `ASPECT = SCENE_H / SCENE_W`).
- **Vareplasser:** absolutt-posisjonerte `<img>` i `%` av scenen. `heng` er
  topp-ankret (henger ned fra rail); resten bunn-ankret (står på flate).
  Ankring + rot/skew via `plassTransform` fra geometry-modulen.
- **`/dev/<bransje>` (les-modus):** ferdig stocket butikk.
- **`/dev/<bransje>?dev=1` (tracer):** to moduser —
  - 📦 Vare-modus: klikk TOM scene = ny plass (snapper til nærmeste hyllelinje
    hvis nær). Klikk på/nær eksisterende = SELEKTER (dra=flytt, ± skala/rot/skew,
    høyreklikk=slett). Esc = avvelg.
  - 📏 Linje-modus: 2 klikk = ny hyllelinje; dra endepunkt-håndtak; ± = skala i
    hver ende. Preview-varer vises PÅ linjen (viser skala-gradienten).
  - «📋 Kopier» dumper BÅDE `vareplasser` og `hyllelinjer` klart til innliming.
  - Utkast lagres i `localStorage` så du ikke mister kalibreringen ved reload.

Traceren er for ESPEN (finpuss). DU (CC) kalibrerer via skjermbilde-løkka (fase 5),
ikke via interaktiv klikking — du har ingen mus i headless.

---

## 5. Fase 5 — SELVKALIBRERING (skjermbilde-løkka) ⟵ hjertet i pipelinen

Du plasserer de N varene på møblene ved å RENDRE dine egne skjermbilder, LESE dem,
justere koordinatene i kode, og gjenta. Typisk **2–3 iterasjoner**.

### 5a. Løkka, konkret

1. **Start dev-server** (strictPort, egen port for å ikke kollidere med annen CC):
   ```bash
   fuser -k 5178/tcp 2>/dev/null
   npm run dev -- --port 5178 --strictPort > /tmp/vite.log 2>&1 &
   sleep 4
   ```
2. **Render headless** med vindusstørrelse = scenens pikselmål (så scenen fyller
   bildet uten letterboxing):
   ```bash
   CHROME=~/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome
   "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
     --window-size=$SCENE_W,$SCENE_H --virtual-time-budget=6000 \
     --screenshot=/tmp/cal.png "http://localhost:5178/dev/hotell"
   ```
   (Verifiser at Chromium finnes: `ls ~/.cache/ms-playwright/`. Versjons-
   nummeret i stien kan variere.)
3. **LES `/tmp/cal.png`** med Read-verktøyet (det viser bildet visuelt).
4. **Juster** `vareplasser` i `industryDefinition.ts` (x/y/scale/skew).
5. Vite HMR laster om automatisk — gjenta fra steg 2.

Et **%-rutenett-overlegg** i første render (eller å måle møbelkanter via crop) gir
et godt startgjett. I sport traff startgjettet stativ+bord nesten perfekt; utstyret
klumpet/svevde og måtte reseates over 2 runder til.

### 5b. Perspektiv-retning — AVGJØR den FØR du setter skala-gradienter

Dette er den viktigste og lettest-bommede tingen. **Sko-saken i sport:** alle 6
skoene fikk UNIFORM skala → de fjerne skoene krympet ikke og så for STORE ut.
Espens funn: «størrelsen øker lenger vekk — motsatt av virkeligheten».

Regelen: **nær kamera = STOR, fjern (mot forsvinningspunktet) = LITEN.**

Slik avgjør du retningen FØR du rører en eneste skala:

1. Finn hvilken vegg/flate møblet står på i det bakte interiøret.
2. Følg møbelkantene mot forsvinningspunktet. Enden som er NÆRMEST kamera er
   typisk den som er lengst mot bildekanten og/eller sitter lavest i bildet;
   enden som RESEDERER går innover/oppover mot midten.
3. Nær ende → STØRRE `scale`. Fjern ende → MINDRE `scale`.

Skoveggen i sport er på VENSTRE side: venstre = nær = stor (0.058), midt = 0.050,
høyre = fjern = liten (0.043). En utstyrsvegg på HØYRE side har motsatt retning
(front/venstre lavere+større). **Ikke sett en flat uniform skala på en rad som
går innover i dybden** — den vil alltid se feil ut i én ende.

Samme retning gjelder hyllelinjenes `scale1`/`scale2` (§6): endepunktet nær
kamera skal ha den STØRRE skalaen.

### 5c. Hva du KAN og IKKE KAN verifisere headless

**KAN (diagnostikk):** at varer treffer møbelflatene, at ingen svever åpenbart, at
skala-gradienten går rett vei, at sprites har ren alfa (montasje på grå),
pikseldiff mellom to kode-tilstander (se §7-verifiseringen). Headless render er
utmerket til å *reprodusere* «svever/klumper»-feil.

**KAN IKKE:** om det ser BRA ut. Visuell kvalitet — om en vare sitter *overbevisende*
på hylla, om lys/skygge matcher, om variasjonen i sortimentet er fin — er ALLTID
Espens godkjenning (CLAUDE.md: headless = KUN diagnostikk, erstatter aldri Espens
visuelle godkjenning). Emoji i tracer-panelet vises som tomme bokser headless
(mangler emoji-font) — kosmetisk, ekte Chrome viser dem.

### 5d. Ærlig om hva som ikke ble perfekt i sport

- **Runde/smale varer på tynne, perspektiv-vinklede hyller** (vannflaske) er
  vanskelige å «sette» helt overbevisende — den svevde et hakk selv etter reseat.
- Kalibreringen er ØYEMÅL-estimater finpusset over 2–3 renders — ikke pikselperfekt.
  Det er MENINGEN: CC gjør førstepasningen, Espen finpusser (§8).
- NB ga av og til nær-duplikate varer (to nesten like røde jakker) — akseptabelt,
  men ikke ideell variasjon. Flagg det, ikke skjul det.

---

## 6. Hyllelinje-mekanikken

**Konsept (Espens designidé):** i stedet for å sette skala manuelt på hver vare i
en rad, definerer du én LINJE langs en hyllekant. Skalaen interpoleres lineært
langs linjen, så perspektiv-forminskningen faller ut automatisk når en vare
snapper til linjen.

**Datamodell** (`src/game/geometry/hyllelinje.ts`):

```ts
interface Hyllelinje {
  id: string
  x1, y1: number   // % — endepunkt 1
  x2, y2: number   // % — endepunkt 2
  scale1: number   // varebredde-brøk (0–1) ved endepunkt 1
  scale2: number   // ved endepunkt 2 (interpoleres lineært mellom)
}
```

**Skala-interpolering:** `pointAlong(L, t)` gir punkt + skala ved `t ∈ [0,1]`:
`scale = scale1 + t·(scale2 − scale1)`. Brukes til preview-varer PÅ linjen i
traceren.

**Snap-adferd:** `snapToLine(px, py, lines, maxDist, aspect)` finner nærmeste
punkt på nærmeste linje-SEGMENT innen `maxDist` (i bredde-%). En BUNN-ANKRET vare
som slippes/plasseres nær en linje festes til snappunktet og ARVER den
interpolerte skalaen. `heng` (topp-ankret) snapper IKKE. Avstandsmålingen tar
`aspect = scenehøyde/bredde` så 1 % på x ≠ 1 % på y for et ikke-kvadratisk bilde
(isotrop avstand i ekte piksler).

I sport: 4 linjer (skovegg øvre+nedre, utstyr-hylle-2, utstyr-benk). Husk §5b:
endepunktet nær kamera får den STØRRE skalaen.

**Skew-feltene** (`skewX?`/`skewY?` på `Vareplass`, håndtert i `plassTransform`):
gir FLATE sprites perspektiv så de «ligger» på en skrå flate i stedet for å stå
som kort. I sport: brettede klær på det skrå bordet fikk `skewX: -8` (topp lener
mot bordets recesjon opp-mot-høyre); hengende klær `skewX: -4` (subtilt
drapé-fall). Verdiene er øyemål — Espen finjusterer live.

---

## 7. Portabel hyllelinje-modul (`src/game/geometry/hyllelinje.ts`)

Hele mekanikken over er trukket ut til en **frittstående, kopierbar modul** uten
import fra bransje-/sport-kode. Den eksporterer:

- `interface Hyllelinje`, `interface PlassTransformOpts`
- `plassTransform(o)` — CSS `transform`/`transformOrigin` for et ankret element.
  Tar `bottomAnchored` EKSPLISITT (kjenner ikke `PlassType`), pluss `rot`/`skewX`/
  `skewY`.
- `pointAlong(L, t)` — punkt + interpolert skala langs linjen.
- `projOnLine(px, py, L, aspect)` / `snapToLine(px, py, lines, maxDist, aspect)`
  — nærmeste punkt / snap. `aspect` er PARAMETER (ikke en modul-konstant), så
  modulen ikke er bundet til én scenes dimensjoner.

**Slik tar B-treet (ny bransje) den i bruk — den korte versjonen:**

1. Kopier KUN `src/game/geometry/hyllelinje.ts` inn i det nye treet (ingen
   sport-avhengigheter følger med — den importerer ingenting fra bransje-kode).
2. I `<Bransje>Stillas.tsx`: `import { plassTransform, snapToLine, pointAlong,
   type Hyllelinje } from '../geometry/hyllelinje'`.
3. Kall `plassTransform({ bottomAnchored: vp.type !== 'heng', rot: vp.rot,
   skewX: vp.skewX, skewY: vp.skewY })` og `snapToLine(x, y, lines, SNAP_DIST,
   ASPECT)` med din egen scenes `ASPECT = SCENE_H / SCENE_W`.
4. I `industryDefinition.ts`: `import type { Hyllelinje }` fra modulen og
   re-eksporter den (`export type { Hyllelinje }`) hvis eksisterende kode
   importerte `Hyllelinje` derfra.

**Verifiser adferds-identitet ved refaktor** med pikseldiff (headless): render
arbeidstreet, `git stash` de refaktorerte filene, render pre-refaktor-tilstanden,
`git stash pop`, og diff PNG-ene med PIL. I sport ble diffen `max 0, 0 avvikende
piksler` i både les- og dev-modus — beviselig ingen adferdsendring.

---

## 8. Arbeidsdelingen (CC ↔ Espen)

- **CC (deg):** gjør HELE førstepasningen — generer bilder, splitt, kod katalog +
  scene, og kalibrer vareplasser/hyllelinjer via skjermbilde-løkka til alt treffer
  møblene («godt nok»-øyemål). Skriv `vareplasser`/`hyllelinjer` inn i
  `industryDefinition.ts`.
- **Espen:** finpusser LIVE i `/dev/<bransje>?dev=1` — drar sprites, ± skala/rot/
  skew, justerer hyllelinjer, «📋 Kopier» → limer inn i definisjonen. **Han LÅSER
  de endelige verdiene.** Han er også ENESTE som gir visuell godkjenning av
  sluttresultatet (CLAUDE.md).
- **Geometri-regelen (CLAUDE.md):** aldri gjett koordinater fra et skjermbilde og
  presenter dem som endelige. CC-kalibreringen er et *utkast* Espen kan overta;
  mangler en sone/verdi du ikke kan utlede — STOPP og be Espen trace den.

---

## 9. Sjekkliste — før en ny bransje kan vises fram

- [ ] **Bilder:** bakt interiør (`/assets/raw/<bransje>-interior.png`), fasade,
      og alle produktark generert (stil-anker + referanse, ingen tekst/logo,
      ingen synlig vannmerke). Piloter ≤ 2 før batch.
- [ ] **Sprites:** alle produktark splittet til `/assets/raw/<bransje>/<id>.png`,
      lest visuelt på grå bakgrunn (ren alfa, ingen halo/nabovare-rest).
- [ ] **Split-familie** lagt til i `split-product-sheet.py` (repo-relativ mappe +
      navnekart + `resolve_family`-gren).
- [ ] **Katalog** i `industries.ts` (`<bransje>Item()`-bygger, pris = én kilde,
      `id === sprite-filnavn`) + `ProductCategory` utvidet + `INDUSTRY_META`.
- [ ] **Sprite-register** `<bransje>Varer.ts` (id → sprite + `PlassType`,
      `repVareForType`).
- [ ] **Bransjedefinisjon** `<BRANSJE>` i `industryDefinition.ts` med `vareplasser`
      + `hyllelinjer`. IKKE registrert i `INDUSTRY_DEFINITIONS`.
- [ ] **Stillas-scene** `<Bransje>Stillas.tsx` (bruker geometry-modulen) +
      **tracer-rute** `/dev/<bransje>` i `App.tsx`.
- [ ] **Kalibrering:** vareplasser treffer møblene (2–3 render-iterasjoner),
      perspektiv-retning riktig (nær=stor), hyllelinjer definert.
- [ ] **Verifisering:** `tsc -b` (ALDRI `npx tsc --noEmit`) + `vite build` grønne;
      sluttrender lest headless.
- [ ] **Rapport:** ny `docs/rapporter/spor-<X>.md` — fyldig OG ærlig (hva
      fungerte, hva ble forkastet, hva ble ikke perfekt), + skjermbilder i
      `public/dev-screenshots/`.
- [ ] **Espen godkjenner visuelt** i ekte Chrome og låser verdiene. ALDRI push før
      dette (CLAUDE.md). Ikke merge uten eksplisitt beskjed.

---

## 10. Ressurs- og repo-regler (ikke glem)

- **Kjør aldri mer enn ett bygg/`tsc` om gangen** — en annen CC kan jobbe parallelt
  i et annet tre.
- Jobb KUN i din egen worktree/gren. Ikke rør `main` eller andre grener.
- `npm run dev -- --port <egen> --strictPort` for å ikke kollidere.
- Rydd opp dev-servere (`fuser -k <port>/tcp`, IKKE `pkill -f vite` — dreper andre
  CC-servere).
