# Spor C — Eksperiment: autonom butikk (SPORTSBUTIKK)

**Gren:** `eksperiment/autonom-sport` · **Dato:** 2026-07-10 · **Port:** 5175 (strictPort via `--port`)

Fullstendig autonomt bygg av en sportsbutikk: alle bilder NB-generert (via
`scripts/nb-generate.sh`, `gemini-3.1-flash-image`), egenhendig splittet,
mappet, kodet og kalibrert. Espen validerer KUN sluttresultatet. Dette er en
test av den autonome asset→kalibrering-pipelinen — rapporten er bevisst fyldig
og ærlig om hva som fungerte og ikke.

---

## 1. Sammendrag / status

| Leveranse | Status | Merknad |
|---|---|---|
| NB-tilgang + `nb-generate.sh` | ✅ | Verifisert (200 OK), 1 test-prop + 1 ref-test lest visuelt |
| D1 Fasade | ✅ | `sport-fasade.png` (rembg-klippet), 1 NB, godkjent 1. forsøk |
| D2 Interiør | ✅ | `sport-interior-mobler.png`, 1 NB, godkjent 1. forsøk, ingen synlig vannmerke |
| D3 Produktark (4) → sport/ | ✅ | 26 sprites, alle verifisert visuelt på grå bakgrunn |
| D4 Vareplasser (min 15) | ✅ | **20 plasser**, kalibrert over 3 render-iterasjoner |
| D5 SPORT-IndustryDefinition + `/dev/sport` | ✅ | Katalog (23 varer m/kategorier+priser), soner, vareplasser; rute + tracer |
| D6 Rapport + skjermbilder | ✅ | Denne fila + `public/dev-screenshots/` |
| `tsc -b` / `npm run build` | ✅ | Begge grønne |

**Sluttresultat:** `public/dev-screenshots/sport-butikk.png` — en ferdig stocket
sportsbutikk med sko på skovegg, hengende plagg på stativ, brettede plagg på
bord (topp + underhylle) og utstyr på hyller/kubbe-enhet.

---

## 2. NB-pipeline (verktøyet)

`scripts/nb-generate.sh` (nytt) kaller Gemini-bildemodellen DIREKTE over HTTP
med `$GEMINI_API_KEY` og skriver PNG rett i `public/assets/raw/` — ingen
`/mnt/c`-Windows-hopp, ingen MCP.

- **Modell:** `gemini-3.1-flash-image` (stabil). Verifisert mot live modelliste
  (`/v1beta/models`); nano-banana-familien finnes som `gemini-3.1-flash-image`,
  `-preview`, samt Pro-variantene (`gemini-3-pro-image`, `nano-banana-pro-preview`
  — bevisst UNNGÅTT, dyr tier). `NB_MODEL=…` overstyrer.
- **Auth:** kun `?key=`-param virker; Bearer-header gir `API_KEY_SERVICE_BLOCKED`.
  Nøkkelen ligger i `~/.bashrc` (sources ikke i non-interaktiv shell → scriptet
  melder tydelig fra).
- **Input:** prompt + valgfrie referansebilder (base64-inline). **Output:** PNG.
  Exit 2 = 403/429 (fallback), 3 = svar uten bilde (safety-block).
- **Stilanker:** hvert motiv-kall brukte et EKSISTERENDE bilde som referanse
  («3D-rendered miniature diorama style», aldri «2D illustration»):
  interiør→`interior-cafe.png`, fasade→`sports_shop.png`.

**Split:** `scripts/split-product-sheet.py` utvidet med en `sport`-familie
(`sport-ark-*` → `public/assets/raw/sport/`) med repo-relativ sti. NB: de
eksisterende `PRODUCTS_DIR`/`CUSTOMERS_DIR` peker på det ANDRE repoet
(`adventure-web`, ikke `-sport`) — historisk; sport-familien løser fra scriptets
egen plassering så den alltid treffer riktig repo.

---

## 3. Asset-generering (logg)

| # | Motiv | Fil | Resultat |
|---|---|---|---|
| 1–3 | Verktøytest (kasse, ball, ball-ref) | — | Verifiserte nb-generate.sh (prompt-only + referanse) |
| 4 | Interiør | `sport-interior-pilot-raw.png` → `sport-interior-mobler.png` | ✅ 1. forsøk. Tom møblert butikk: skovegg (v.), klesstativ + brettebord (midt), utstyrsvegg + kubbe (h.). Perspektiv/lys matcher kafé-anker |
| 5 | Fasade | `sport-fasade-pilot-raw.png` → `sport-fasade.png` | ✅ 1. forsøk. Rett-på storefront, blankt skiltbånd (ingen tekst), produkter i vindu, hvit bakgrunn → rembg |
| 6 | Ark-01 sko | `sport-ark-01-raw.png` | ✅ 6 sko, 2×3, ren splitt (halo=0) |
| 7 | Ark-02 heng (v1) | — | ❌ Forkastet: NB ga 7 plagg (ujevn 3/4) + mulig svakt merke på teal jakke |
| 8 | Ark-03 brett | `sport-ark-03-raw.png` | ✅ 6 brettede plagg, ren splitt |
| 9 | Ark-04 utstyr (v1) | — | ❌ Forkastet: 8 varer m/duplikater (2 yogamatter, 2 hjelmer) + uønskede diorama-sokler (gress/plate under hver vare) |
| 10 | Ark-02 heng (v2) | `sport-ark-02-raw.png` | ✅ Ga 8 plagg (NB pakker høye/smale plagg i 4 kolonner tross «eksakt 6») — akseptert, 8 eksplisitte navn |
| 11 | Ark-04 utstyr (v2) | `sport-ark-04-raw.png` | ✅ 6 varer, ingen sokler, ren splitt |

**NB-forbruk: 11 av 25** (3 verktøytest + 8 sport, hvorav 2 forkastet/regenerert).
God margin.

**Vannmerke:** Ingen SYNLIG vannmerke funnet i interiøret (sjekket alle 4
hjørner via crop) — derfor ingen patching nødvendig (D2 sa «patch vannmerker
selv»; det var ingen å patche). NB embedder trolig et USYNLIG SynthID-merke som
verken kan detekteres eller fjernes her — dokumentert, ikke et problem for
bruken.

**Sprites (26):** 6 sko · 8 heng · 6 brett · 6 utstyr. Alle lest visuelt på grå
bakgrunn (montasje): ren alfa, ingen nabovare-rest, ingen halo/vannmerke.

---

## 4. Kode-arkitektur

Fulgte klesbutikk-malen (`jobb/klesbutikk`), trimmet til «bakt interiør +
faste %-vareplasser» (ingen drag-snap-palett, ingen GameContext — scenarier er
utenfor scope).

- **`src/game/types.ts`** — `ProductCategory` utvidet med `'sko' | 'bekledning' | 'utstyr'`.
- **`src/game/data/industries.ts`** — `INDUSTRY_CATALOG.sports` skrevet om: 23
  varer m/kategori, pris (`costPrice`/`recommendedPrice`), `sprite`-sti (ids
  matcher sprite-filnavn). Ny `sportItem()`-bygger (durable goods: `trauVare:false`,
  ingen ferskvare/tiers — motsatt av kafeens `catalogItem()`).
- **`src/game/data/industryDefinition.ts`** — nye typer `PlassType`/`Vareplass`,
  nytt valgfritt felt `vareplasser?` på `IndustryDefinition`, og `SPORT`-objektet
  (katalog, forsyningstekst, roller, personaBudsjett, + 20 kalibrerte
  vareplasser). IKKE registrert i `INDUSTRY_DEFINITIONS` (stillas-only, som
  KLESBUTIKK) — hovedmotorene rendrer fortsatt kun kafeen.
- **`src/game/data/sportVarer.ts`** (ny) — sprite-register: vare-id → sprite +
  `PlassType`. Bilde-siden; katalog/pris bor i industries.ts.
- **`src/game/city/SportStillas.tsx`** (ny) — stillas-scene: rendrer bakt
  interiør + vareplasser (absolutt-posisjonerte `<img>` i % av scenen, `heng`
  topp-ankret, resten bunn-ankret). `?dev=1` gir VareplassTracer (klikk-plasser,
  dra-flytt, ±skala/rot, høyreklikk-slett, «📋 Kopier»-dump, localStorage-utkast).
- **`src/App.tsx`** — `<Route path="/dev/sport" element={<SportStillas />} />`.

---

## 5. Kalibrering (ærlig logg)

Kalibrert via **headless-Chrome-skjermbilde-løkke** (ikke den interaktive
traceren — den bygde jeg for Espen). Løkke: les interiør med %-rutenett-overlegg
→ sett koordinater i kode → render `/dev/sport` med Chromium `--screenshot
--virtual-time-budget` → LES skjermbildet → juster. Tre iterasjoner:

| Iter | Fil | Hva jeg så / gjorde |
|---|---|---|
| 1 | `cal_01` | Startgjett (rutenett-avlest). Overraskende bra: stativ + brettebord nesten perfekt. Feil: utstyr klumpet/svevde foran hyllene, yogamatte enorm og svevende midt i lufta; brett-topp overlappet lett |
| 2 | `cal_02` | Reseatet ALL utstyr på faktiske hyllelinjer (målt via crop: y26/34/41 + kubbe y50), krympet yogamatte 0.05→0.035, spredte brett-topp + senket til bordflate (y53) |
| 3 | `cal_03` | Finpuss: fotball ned på topphylle, vannflaske inn på hylle, grønn collegegenser ned/venstre. Godkjent |

**Ærlig om hva som IKKE ble perfekt:**
- **Vannflaske** svever fortsatt et lite hakk foran veggen mellom hylle-ende og
  kroker — de tynne, perspektiv-vinklede hyllene er vanskelige å «sette» runde/
  smale varer helt overbevisende på.
- **Sko** sitter på hylle-ledd, men et par kunne kommet 0.5 % lenger ned for
  helt perfekt sålekontakt.
- Kalibreringen er ØYEMÅL-estimater finpusset over 3 renders — ikke pikselperfekt.
  Espen kan finjustere live i `/dev/sport?dev=1` (dra sprites, «📋 Kopier» → lim
  inn i `SPORT.vareplasser`).
- **To røde hengejakker** (`regnjakke`/`vinterjakke`) er visuelt like (NB ga nær-
  duplikat) — akseptabelt, men ikke ideell variasjon.

**Verifisert visuelt:** hele butikken (`cal_01→03`), alle 26 sprites (montasje),
begge produktark-regenereringer, fasade + interiør. **Ikke verifisert i EKTE
Chrome:** kun headless (per repo-regel er headless = diagnostikk; Espens
visuelle godkjenning gjenstår). Emoji i tracer-panelet vises som bokser i
headless (mangler emoji-font) — kosmetisk, ekte Chrome viser dem.

---

## 6. Avvik funnet underveis

1. **`docs/rapporter/spor-b.md` finnes ikke** (mandatet ba meg lese «hele»).
   Kun `spor-a.md` finnes. Brukte klesbutikk-docs + `jobb/klesbutikk`-koden som
   mal i stedet. Dokumentert, gikk videre (ikke spinn).
2. **Hardkodede repo-stier** i `split-product-sheet.py` + `clean-asset.sh` peker
   på `/home/espen/adventure-web/` (feil repo). Løste sport-familien repo-relativt;
   rørte ikke de historiske konstantene.
3. **`scripts/README.md`** hevder raw-assets er git-ignorert — det gjelder det
   ANDRE repoet. Her SPORES de (bekreftet med `git check-ignore`), så assetene
   committes.

---

## 7. Skjermbilder

- `public/dev-screenshots/sport-butikk.png` — ferdig stocket butikk (hero)
- `public/dev-screenshots/sport-tracer.png` — `?dev=1` VareplassTracer

---

## 8. Åpne punkter / neste steg (utenfor scope nå)

- **Scenarier** (bevisst utelatt): salgsscenarier for sport (`sales/scenarios.ts`
  + `SPORT_SCENARIO_IDS`) — «tas etterpå hvis butikken sitter».
- **Reell aktivering:** SPORT er stillas-only. Å gjøre bransjen spillbar krever
  den state-drevne geometri-bryteren beskrevet i `docs/BRANSJE_DEFINISJON.md`
  (motorene leser alltid CAFE i dag).
- **Vannflaske-seating** + evt. erstatte den ene røde jakka for mer variasjon.
- **Fasade-integrasjon** i byen (i dag frittstående asset + vindusglimt).

---

## 9. Oppfølging (2026-07-11): disk-fri interiør

Espen fjernet den cafe-arvede glassdisken via NB → `sport-interior-uten-disk-raw.png`.

**Sammenligning mot originalen (gate: er kamera + ALLE møbelposisjoner identiske?):**
Verifisert via pikseldiff, 50/50-blend og zoom-crops.
- **Kamera/perspektiv:** identisk.
- **Skovegg, klesstativ, utstyrsvegg (hyller/kroker), høyre benk/kubbe:**
  posisjonelt identiske (helt skarpe i 50/50-blend, ingen ghosting). Disk-
  fjerningen AVDEKKET mer av gulvet + benken som disken før skjulte.
- **Ett reelt avvik:** brettebordet er marginalt STØRRE og litt lavere.
- **Bunnstripa:** disk → gulv (den tiltenkte endringen).
- **Dimensjon:** 1365×768 → 1672×940 (nær-identisk sideforhold 1.777→1.779;
  %-koordinatmodellen bæres uendret over).

**Konklusjon: JA (samme rom, samme kamera, samme fikstur-posisjoner)** — det ene
avviket (bord) + de avdekkede lavere flatene faller under «juster de få som
bommer nederst». Byttet gjennomført.

**✦-vannmerke:** Sjekket nede t.h. + hele bunnstripa + hjørner (crop, kontrast-
oppblåsing 3×, near-white-skann). **Ingen synlig ✦ funnet** — de lyseste bunn-
pikslene klynger seg midt i bildet (dørlys-refleks på gulvet), ikke i et hjørne.
Kun usynlig SynthID gjenstår trolig. Ingen patching nødvendig (som originalen).

**Rekalibrering (skjermbilde-løkke, 2 iterasjoner):**
- Uendret og fortsatt korrekt: 6 sko, 3 heng, 2 øvre utstyrshyller (ball/hjelm).
- Justert NED (avdekkede lavere flater): 5 brett-plasser til det større/lavere
  bordet; sekk/håndvekt/yogamatte ned på den nå-synlige lave benken; vannflaske
  flyttet til 2. hylle. Alle 20 plasser treffer møblene i sluttrenderen.

**Endret:** `SportStillas.tsx` (INTERIOR_IMG + SCENE_W/H=1672/940),
`industryDefinition.ts` (sceneImage + 11 justerte vareplasser),
`sport-interior-uten-disk.png` (ny scene), oppdaterte skjermbilder.

**Merk — antall vareplasser:** oppdraget nevnte «37 vareplasser», men den bygde
butikken har **20** (mandatet krevde min. 15; jeg kalibrerte 20). Ingen 37 har
eksistert i denne grenen — flagget for ordens skyld.
