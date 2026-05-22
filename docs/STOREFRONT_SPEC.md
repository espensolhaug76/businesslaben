# STOREFRONT_SPEC.md

**Versjon:** 1.2
**Dato:** 22.05.2026
**Status:** Aktiv kontrakt — KLAR FOR ASSET-GENERERING

Dette dokumentet er den autoritative kontrakten mellom asset-pipeline (Nano Banana → rembg) og kode (Phaser StorefrontScene). Alle facade-assets MÅ følge denne spesifikasjonen. All kode i StorefrontScene MÅ anta denne spesifikasjonen.

Hvis en asset bryter spec'en, regenereres den. Hvis koden trenger noe annet, oppdaterer vi spec'en først, deretter regenereres alle eksisterende facader.

---

## 1. Formål

Storefront-scenen er et 2D-inngangsparti som vises når en spiller klikker på et bygg i Kongsvinger-kartet. Den representerer **én** virksomhet, sett rett forfra fra gatenivå. Sammenlignbar med facade-zooming i Hay Day, Two Point Hospital, eller Mini Motorways' storefront-detaljer.

Scenen har tre primære interaksjonspunkter (hotspots):
- **Skilt** (topp) → markedsføring/branding
- **Vindu** (venstre) → sortiment/produkter
- **Dør** (høyre) → daglig drift/dashboard

### Scene-komposisjon (z-rekkefølge, bakerst først)

```
z=0    Sone-bakgrunn (himmel + atmosfære)         [1 av 6 assets]
z=10   Nabobygg venstre + høyre                    [2 av 12 assets]
z=20   Facade (hovedbygg)                          [1 av 9 assets]
z=30   Awning (valgfritt overlay)                  [0 eller 1 av 9 assets]
z=40   Phaser Text: skiltnavn (dynamisk)
z=50   Hotspot-zoner (interactive rektangler, invisible)
z=60   Status-badges (rating, kunder, omsetning, ansatte)
z=70   HUD (kapital, dato, tilbake-knapp)
z=80   Modals/overlays når åpne
```

---

## 2. Asset-dimensjoner og scaling

### Facade (hovedasset)

| Egenskap | Verdi |
|---|---|
| Asset bredde | **1024 px** |
| Asset høyde | **1280 px** |
| Anker | `(0.5, 1.0)` — bottom-center |
| Aspect ratio | 4:5 (portrait) |
| Bakgrunn | **Transparent** (alpha-kanal, ikke checkerboard) |
| Format | PNG-24 med alpha |

### Sone-bakgrunn

| Egenskap | Verdi |
|---|---|
| Bredde | **1920 px** (fyller standard viewport) |
| Høyde | **1280 px** |
| Anker | `(0.5, 1.0)` — bottom-center |
| Bakgrunn | Solid (ikke transparent) |
| Innhold | Himmel + atmosfære + fortau-kant |

### Nabobygg

| Egenskap | Verdi |
|---|---|
| Bredde | **320 px** |
| Høyde | **960 px** |
| Anker | `(0, 1.0)` for venstre, `(1, 1.0)` for høyre |
| Bakgrunn | **Transparent** |
| Innhold | Halvsiden av en facade, falmet mot kanten |

### Awning (markise)

| Egenskap | Verdi |
|---|---|
| Bredde | **1024 px** |
| Høyde | **96 px** |
| Anker | `(0.5, 0)` — top-center |
| Bakgrunn | **Transparent** |
| Plassering | Settes på facade-y + 512 (toppen av AWNING-raden) |

### Dynamisk skalering i Phaser

Facade-skalering beregnes runtime basert på viewport:

```typescript
const TARGET_FACADE_HEIGHT_PCT = 0.75;
const FACADE_NATIVE_HEIGHT = 1280;
const MIN_SCALE = 0.5;
const MAX_SCALE = 1.2;

const viewportHeight = this.cameras.main.height;
const targetHeight = viewportHeight * TARGET_FACADE_HEIGHT_PCT;
const scale = Phaser.Math.Clamp(
  targetHeight / FACADE_NATIVE_HEIGHT,
  MIN_SCALE,
  MAX_SCALE
);

facade.setScale(scale);
neighborLeft.setScale(scale);
neighborRight.setScale(scale);
awning.setScale(scale);
// Background NOT scaled - it's already viewport-sized
```

**Konsekvens for hotspot-koordinater:** Alle hotspot-koordinater MÅ multipliseres med `scale` ved opprettelse av Phaser interactive rectangles.

---

## 3. Layout-rutenett (facade)

Facaden deles inn i et **fast vertikalt 8-rad rutenett**. Alle facader, uansett bransje, MÅ respektere denne strukturen for at hotspot-koordinatene skal stemme:

```
┌─────────────────────────────────────┐  y=0     RAD 1: Himmel/margin
│         (luft)                      │
├─────────────────────────────────────┤  y=128
│         TAKLINJE                    │  RAD 2: Tak/gesims
├─────────────────────────────────────┤  y=256
│                                     │
│         SKILT-SONE                  │  RAD 3-4: Skilt (hotspot)
│         (BLANK / KLAR FOR TEKST)    │
├─────────────────────────────────────┤  y=512
│         AWNING-RAD (kan være tom)   │  RAD 5: Plassering for separat awning
├─────────────────────────────────────┤  y=608
│                                     │
│    VINDU       │    DØR             │  RAD 6-7: Storefront
│  (hotspot)     │  (hotspot)         │
│                │                    │
├─────────────────────────────────────┤  y=1152
│         SOKKEL                      │  RAD 8: Bunn / fortau-kant
└─────────────────────────────────────┘  y=1280
```

### Hotspot-koordinater (i piksler, relativt til asset-origin top-left, før skalering)

| Hotspot | x | y | bredde | høyde |
|---|---|---|---|---|
| **Sign (skilt)** | 102 | 256 | 820 | 256 |
| **Window (vindu)** | 61 | 640 | 410 | 480 |
| **Door (dør)** | 553 | 608 | 348 | 544 |

**Toleranse:** ±20 px per kant. Hvis facade-art faller utenfor disse rektanglene, regenereres asseten.

**KRITISK ENDRING FRA v1.0:** RAD 5 (awning-rad, y=512-608) skal være **TOM** på facade-asseten. Awning er nå et separat lag som plasseres oppå.

---

## 4. Perspektiv og kameravinkel

Gjelder ALLE assets (facader, bakgrunner, nabobygg, awnings):

| Egenskap | Verdi |
|---|---|
| Visningsvinkel | **Frontal / head-on** |
| Vertikal tilt | 0° (eye-level) |
| Horisontal rotasjon | 0° (rett forfra) |
| Vanishing point | Ingen (parallell projeksjon) |

**Eksplisitt forbudt:**
- ❌ 3/4-vinkel
- ❌ Isometri
- ❌ Top-down
- ❌ Worm's eye view
- ❌ Bird's eye view

---

## 5. Lyssetting (gjelder alle assets)

| Egenskap | Verdi |
|---|---|
| Lyskilde | Sol fra **øvre venstre** (45° fra topp, 30° fra venstre) |
| Lysstyrke | Diffust dagslys, lett overskyet nordisk |
| Skygge-retning | Ned/høyre |
| Skygge-styrke | Subtil, 25-35% opacity |
| Speilrefleksjoner | Tillatt i vinduer (subtilt sky-glimt) |
| Indre belysning | Vinduer kan ha varmt indre lys (kafé/butikk) eller mørke (lager) |

**KRITISK:** Sone-bakgrunner MÅ ha samme lysretning som facader. Hvis bakgrunnen har sol fra høyre, ser facaden ut til å eksistere i feil verden.

---

## 6. Style DNA

Disse fem prinsippene MÅ gjelde for hver generert asset:

1. **3D-rendered miniature diorama, photographed frontally at eye level** — bruker ny `base_style_storefront` i `ASSET_PROMPTS.json`. Output skal se ut som et screenshot av en 3D-modell sett rett forfra — IKKE en 2D-tegning, IKKE digital maling, IKKE cel-shaded cartoon, IKKE anime.
2. **Supercell/Hay Day kvalitet** — clean, fargerik, lett karikert. Materialer skal være lesbare på avstand.
3. **Modern Norwegian commercial architecture** — flate eller lett skrå tak, store storefront-vinduer, blanding av treverk/glass/murstein.
4. **Konsistens på tvers** — alle assets ser ut som de tilhører samme verden (samme lyssetting, samme stylization-nivå, samme detaljgrad).
5. **Riktig transparens** — facader/nabobygg/awnings har transparent bakgrunn. Sone-bakgrunner har solid bakgrunn.

### Anti-pattern (vær eksplisitt om hva som IKKE skal genereres)
- ❌ Folk i scenen
- ❌ Trær eller vegetasjon utenom planter i potter (planter OK)
- ❌ Biler eller andre kjøretøy
- ❌ Sjekkermønster transparency (rembg løser dette)
- ❌ Gemini-vannmerke (fjernes manuelt før commit)
- ❌ Tekst på skiltet (Phaser legger til tekst dynamisk)
- ❌ 2D illustration / drawn appearance
- ❌ Digital painting
- ❌ Cel-shaded cartoon
- ❌ Anime/manga
- ❌ Flat illustrated facade

---

## 7. Asset-katalog (v1)

### 7.1 Facader (9 stk)

| Bransje | Filnavn | Default skiltnavn | Karakteristikker |
|---|---|---|---|
| Kafé | `storefront_cafe.png` | CAFÉ OLSEN | Varm murstein, hyggelig vindusdisplay |
| Restaurant | `storefront_restaurant.png` | RESTAURANT GLOMMA | Mørkere tre, eksterne meny-skjermer, dempet belysning |
| Butikk | `storefront_butikk.png` | STIL & CO | Stort glassfront, mannequins synlig, ren moderne stil |
| Frisør | `storefront_frisor.png` | KLIPPHUSET | Vegg-til-vegg vindu, salongstoler synlig |
| Fysioterapi | `storefront_fysio.png` | AKTIV FYSIO | Lys palett (hvit/grå/blå), diskret skilt, helsefag-estetikk |
| Treningssenter | `storefront_trening.png` | KONGSVINGER GYM | Industriell stil, store vinduer, treningsutstyr-silhuetter |
| Lager | `storefront_lager.png` | NORD LAGER | Industrigarasje-dør, betong, minimal skilting, lasterampe |
| Produksjon | `storefront_produksjon.png` | KONGSVINGER PRODUKSJON | Industriell facade, ventilasjonsanlegg synlig, robust |
| Bilverksted | `storefront_bilverksted.png` | AUTO-FIX | Garasjeport, skilt med dekk-/skrue-motiv, oljete estetikk |

**KRITISK for ALLE facader:** AWNING-raden (y=512-608) skal være TOM. Awning er separat lag.

### 7.2 Sone-bakgrunner (6 stk)

| Sone | Filnavn | Himmel-stemning | Atmosfære |
|---|---|---|---|
| Sentrum | `bg_sentrum.png` | Lys overskyet, klart blå | Travel byatmosfære, lette skyer |
| Boligområde | `bg_bolig.png` | Solrik ettermiddag, varmt | Rolig forstadsmiljø |
| Industriområdet | `bg_industri.png` | Grålig/disig dagslys | Industriell, dempet, lett dis |
| Kjøpesenter | `bg_kjopesenter.png` | Nøytral dag, kunstig opplyst inntrykk | Stort åpent rom, lite himmel |
| Øvrebyen | `bg_ovrebyen.png` | Gylden timing, varm | Historisk charm, lavere himmellinje |
| Langs E16 | `bg_e16.png` | Åpen vid himmel | Motorveis-stemning, mer plass |

**Innhold per bakgrunn:**
- Øvre 70% himmel + atmosfæreffekter (skyer, lys)
- Nedre 30% fortau/asfalt-kant (matcher facade-sokkel)
- INGEN bygninger (nabobygg er separate)

### 7.3 Nabobygg (12 stk)

12 nabobygg, 2 per sone (venstre + høyre):

| Sone | Venstre nabo | Høyre nabo |
|---|---|---|
| Sentrum | `neighbor_sentrum_left.png` | `neighbor_sentrum_right.png` |
| Boligområde | `neighbor_bolig_left.png` | `neighbor_bolig_right.png` |
| Industriområdet | `neighbor_industri_left.png` | `neighbor_industri_right.png` |
| Kjøpesenter | `neighbor_kjopesenter_left.png` | `neighbor_kjopesenter_right.png` |
| Øvrebyen | `neighbor_ovrebyen_left.png` | `neighbor_ovrebyen_right.png` |
| Langs E16 | `neighbor_e16_left.png` | `neighbor_e16_right.png` |

**Spesifikasjon per nabobygg:**
- 320×960 px (smalere og litt lavere enn hovedfacade)
- Transparent bakgrunn
- Bare halvsiden av en bygning synlig (motsatt side er kuttet av rammen)
- **Gradient-fade mot midten**: 100% opacity ved kant, falmes til 60% mot der hovedfacaden skal stå
- Stil matcher sonen (sentrum = murstein, industri = betong/metall, etc.)
- Vinkel: frontal, samme lyssetting som facade

### 7.4 Awnings (9 stk, valgfritt per facade)

| Bransje | Filnavn | Mønster |
|---|---|---|
| Kafé | `awning_cafe.png` | Rød/krem-stripet stoff |
| Restaurant | `awning_restaurant.png` | Mørk grønn/hvit eller bordeaux |
| Butikk | `awning_butikk.png` | Blå/hvit-stripet, ren |
| Frisør | `awning_frisor.png` | Rød/hvit/blå (barber-pole-tema) |
| Fysioterapi | `awning_fysio.png` | Diskret hvit/blå |
| Treningssenter | `awning_trening.png` | Svart/grå solid (industriell) |
| Lager | (ingen) | Awning droppes for industri-typer |
| Produksjon | (ingen) | – |
| Bilverksted | `awning_bilverksted.png` | Robust gul/svart varselsfarge |

**Spesifikasjon per awning:**
- 1024×96 px
- Transparent bakgrunn
- Designet for å plasseres med top-anchor på facade.y + 512
- Inkluderer subtil skygge under (innenfor 96px-høyden)
- Stoff-tekstur eller solid materiale, ikke flat farge

---

## 8. Asset-prompt template

Disse promptene legges inn i `docs/ASSET_PROMPTS.json` under `_meta.storefront_*`.

### 8.1 Base-prompt for FACADER

Storefront facades genereres med ny `_meta.base_style_storefront`-blokk i `ASSET_PROMPTS.json` + per-asset entry. Asset-entries følger samme struktur som eksisterende iso-bygg, men setter `style_variant: "storefront"` for å trigge frontal-baseren. Per-asset legger til `subject_detail` med bransje-spesifikke karakteristikker (materialvalg, vindusdisplay-hint, dør-stil, fargepalett).

### 8.2 Base-prompt for SONE-BAKGRUNNER

```
A 2D illustrated street scene background for [ZONE_NAME] in Kongsvinger,
Norway. Wide horizontal composition showing only:
- Upper 70%: sky with [SKY_MOOD] atmosphere
- Lower 30%: street/sidewalk surface with subtle texture

LAYOUT:
- Composition is empty in the center (a building facade will be placed here)
- Background should feel atmospheric and contextual but NOT compete visually

STYLE:
- Supercell Hay Day art quality, rendered 2D illustration
- Same lighting as facades: soft Nordic overcast daylight from upper-left
- [ZONE_SPECIFIC_DETAILS]

CONSTRAINTS:
- Solid background (NOT transparent)
- NO buildings (neighboring buildings are added as separate layers)
- NO people, NO cars
- 1920x1280 landscape canvas
- Atmospheric depth without distracting detail
```

### 8.3 Base-prompt for NABOBYGG

```
A partial 2D illustrated facade — showing only HALF of a building, as if
the camera is cut off by the frame edge. The visible half should be on
the [LEFT/RIGHT] side of the canvas. The opposite side fades to
transparent with a soft gradient.

STYLE:
- Same architectural style as [ZONE_NAME] in Kongsvinger
- Frontal perspective, same lighting as main facades (upper-left)
- Slightly desaturated and 80% opacity to feel "in the background"

CONSTRAINTS:
- Transparent background
- 320x960 portrait canvas
- NO people, NO interactive elements
- Designed to sit beside a main facade as atmospheric framing
```

### 8.4 Base-prompt for AWNINGS

```
A 2D illustrated commercial awning (storefront overhang) for a [INDUSTRY].
Pattern: [AWNING_PATTERN]. Fabric or solid material as appropriate for
the business type.

LAYOUT:
- Horizontal awning spanning full canvas width
- Subtle drop shadow underneath
- Hangs from a top anchor point

STYLE:
- Supercell Hay Day art quality
- Same lighting as facades (upper-left)
- Reads clearly from a distance

CONSTRAINTS:
- Transparent background
- 1024x96 horizontal canvas (top-anchor)
- Designed to overlay on a facade at y=512
- NO building structure, just the awning itself
```

---

## 9. Valideringssjekkliste

Etter generering, FØR commit, sjekkes hver asset mot:

### Generelt (alle assets)
- [ ] Eksakt korrekt dimensjon (se kapittel 2)
- [ ] Riktig bakgrunn (transparent/solid per type)
- [ ] Ingen folk synlig
- [ ] Ingen kjøretøy
- [ ] Ingen Gemini-vannmerke
- [ ] Lyssetting fra øvre venstre
- [ ] Frontal perspektiv (ingen 3/4 eller iso)

### Facader (i tillegg)
- [ ] Skilt-zone er BLANK (ingen tekst/bokstaver)
- [ ] AWNING-rad (y=512-608) er TOM — kun facade-vegg
- [ ] Skilt-zone faktisk inneholder skiltpanel (innen y=256-512)
- [ ] Vindu-zone faktisk inneholder vindu (innen x=61-471, y=640-1120)
- [ ] Dør-zone faktisk inneholder dør (innen x=553-901, y=608-1152)
- [ ] Facade fyller minst 80% av canvas-bredden
- [ ] Bunn av facade berører eller er nær y=1280

### Sone-bakgrunner (i tillegg)
- [ ] Senter er åpent (ingen visuelle elementer som konkurrerer med facade)
- [ ] Himmel matcher SKY_MOOD spesifisert
- [ ] Fortau-kant nederst matcher facade-sokkel-høyde

### Nabobygg (i tillegg)
- [ ] Kun halvside av bygning synlig
- [ ] Gradient-fade mot motsatt kant
- [ ] Stil matcher sonen

### Awnings (i tillegg)
- [ ] Hele asset er 96px høy (ingen vertikal overflyt)
- [ ] Skygge er innenfor 96px-høyden
- [ ] Designet for top-anchor plassering

Hvis ETT punkt feiler: regenerer.

---

## 10. Phaser-implementasjon kontrakt

```typescript
// scenes/StorefrontScene.ts
import Phaser from 'phaser';

interface StorefrontConfig {
  businessId: string;
  industry: 'cafe' | 'restaurant' | 'butikk' | 'frisor' | 'fysio' |
            'trening' | 'lager' | 'produksjon' | 'bilverksted';
  zone: 'sentrum' | 'bolig' | 'industri' | 'kjopesenter' | 'ovrebyen' | 'e16';
  signText: string;
  hasAwning: boolean;
}

const HOTSPOTS = {
  sign:   { x: 102, y: 256, w: 820, h: 256 },
  window: { x: 61,  y: 640, w: 410, h: 480 },
  door:   { x: 553, y: 608, w: 348, h: 544 },
};

const FACADE_NATIVE = { w: 1024, h: 1280 };
const NEIGHBOR_NATIVE = { w: 320, h: 960 };
const AWNING_NATIVE = { w: 1024, h: 96 };

export class StorefrontScene extends Phaser.Scene {
  preload() {
    // Loaded dynamically based on config
  }

  create(config: StorefrontConfig) {
    const cam = this.cameras.main;

    // 1. Background (z=0, viewport-sized, not scaled)
    this.add.image(cam.centerX, cam.height, `bg_${config.zone}`)
      .setOrigin(0.5, 1.0)
      .setDepth(0);

    // 2. Compute facade scale
    const TARGET_PCT = 0.75;
    const MIN = 0.5;
    const MAX = 1.2;
    const scale = Phaser.Math.Clamp(
      (cam.height * TARGET_PCT) / FACADE_NATIVE.h,
      MIN, MAX
    );

    const facadeBottom = cam.height - 80;  // 80px sidewalk margin
    const facadeCenterX = cam.centerX;
    const facadeW = FACADE_NATIVE.w * scale;
    const facadeH = FACADE_NATIVE.h * scale;
    const facadeTop = facadeBottom - facadeH;
    const facadeLeft = facadeCenterX - facadeW / 2;

    // 3. Neighbors (z=10)
    this.add.image(
      facadeLeft - 10,
      facadeBottom,
      `neighbor_${config.zone}_left`
    ).setOrigin(1, 1.0).setScale(scale).setDepth(10);

    this.add.image(
      facadeLeft + facadeW + 10,
      facadeBottom,
      `neighbor_${config.zone}_right`
    ).setOrigin(0, 1.0).setScale(scale).setDepth(10);

    // 4. Facade (z=20)
    const facade = this.add.image(
      facadeCenterX,
      facadeBottom,
      `storefront_${config.industry}`
    ).setOrigin(0.5, 1.0).setScale(scale).setDepth(20);

    // 5. Awning overlay (z=30, optional)
    if (config.hasAwning) {
      this.add.image(
        facadeCenterX,
        facadeTop + 512 * scale,
        `awning_${config.industry}`
      ).setOrigin(0.5, 0).setScale(scale).setDepth(30);
    }

    // 6. Sign text (z=40, dynamic)
    this.add.text(
      facadeCenterX,
      facadeTop + (256 + 128) * scale,  // center of sign zone
      config.signText,
      {
        fontFamily: 'Georgia',
        fontSize: `${Math.round(64 * scale)}px`,
        fontStyle: 'bold',
        color: '#5a3a2a',
        align: 'center',
      }
    ).setOrigin(0.5, 0.5).setDepth(40);

    // 7. Hotspot zones (z=50, invisible interactive)
    this.createHotspot('sign', facadeLeft, facadeTop, scale,
      () => this.emitOverlay('storefront:editSign', config));
    this.createHotspot('window', facadeLeft, facadeTop, scale,
      () => this.emitOverlay('storefront:editProducts', config));
    this.createHotspot('door', facadeLeft, facadeTop, scale,
      () => this.emitOverlay('storefront:openDashboard', config));
  }

  private createHotspot(
    key: keyof typeof HOTSPOTS,
    facadeLeft: number,
    facadeTop: number,
    scale: number,
    onClick: () => void
  ) {
    const h = HOTSPOTS[key];
    const zone = this.add.rectangle(
      facadeLeft + h.x * scale,
      facadeTop + h.y * scale,
      h.w * scale,
      h.h * scale
    )
    .setOrigin(0, 0)
    .setDepth(50)
    .setFillStyle(0x000000, 0)  // invisible
    .setInteractive({ useHandCursor: true });

    zone.on('pointerdown', onClick);
  }

  private emitOverlay(event: string, config: StorefrontConfig) {
    window.dispatchEvent(new CustomEvent(event, { detail: config }));
  }
}
```

### Hotspot → React overlay routing

| Hotspot | Event | React overlay |
|---|---|---|
| signZone | `storefront:editSign` | MarketingManager (sub-view: "Branding") |
| windowZone | `storefront:editProducts` | ProductCatalogManager |
| doorZone | `storefront:openDashboard` | DashboardManager (eller LiveScreen) |

### Camera drag bug workaround (eksisterende mønster)
StorefrontScene MÅ respektere `window.__OVERLAY_OPEN__`-flagget og dispatche synthetic pointerup ved overlay-lukking, slik som CityScene allerede gjør. Ikke endre dette mønsteret.

---

## 11. Status-badges plassering

Under facaden vises 4 status-badges (rating, kunder/dag, omsetning, ansatte). Disse er React DOM-elementer, **ikke** del av facade-asset.

| Egenskap | Verdi |
|---|---|
| Container y | facade.bottom + 16 px |
| Container x | facade.centerX (sentrert) |
| Layout | Horisontal flex, 8px gap |
| Z-index | 60 (over scene, under HUD) |

---

## 12. Asset-katalog oppsummering

**Totalt antall assets for v1: 36**

| Kategori | Antall | Filplassering |
|---|---|---|
| Facader | 9 | `public/assets/storefronts/facade/` |
| Sone-bakgrunner | 6 | `public/assets/storefronts/background/` |
| Nabobygg | 12 | `public/assets/storefronts/neighbor/` |
| Awnings | 9 | `public/assets/storefronts/awning/` |

**Anbefalt generering-rekkefølge:**

1. **Cafe-facade** først (canonical reference)
2. **Sentrum-bakgrunn** + venstre/høyre nabobygg
3. **Cafe-awning**
4. Test hele settet i StorefrontScene → JUSTER spec OM NØDVENDIG
5. Generer resten av facadene (img-to-img med cafe som style reference)
6. Generer resten av bakgrunnene + nabobygg
7. Generer resten av awnings

---

## 13. Endringslogg

| Versjon | Dato | Endring |
|---|---|---|
| 1.0 | 21.05.2026 | Initial spec basert på mockup-validering |
| 1.1 | 21.05.2026 | Beslutninger lukket: dynamisk skalering, per-sone bakgrunn, separate nabobygg, separate awning-lag. Lagt til Phaser-kode-eksempel. |
| 1.2 | 22.05.2026 | Align med `base_style_storefront`-formelen i `ASSET_PROMPTS.json`. §6 prinsipp 1 omformulert til 3D-rendered diorama (frontal), anti-pattern-listen utvidet med eksplisitte 2D/maling/cartoon/anime-negativer, §8.1 prompt-template erstattet med henvisning til `base_style_storefront` + `style_variant: "storefront"`. §10-kontrakt uendret (hotspot-koordinater og scene-kode uavhengig av prompt-formel). |
