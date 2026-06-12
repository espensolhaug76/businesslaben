# FILLER_ASSETS — katalog over fyllbygg

Generert 2026-06-11 som del av «SPRITE-BY KOMPLETT». Lister alle BD-slots i
`CityScene.B[]` som rendret som prosedural boks etter cohesion-passet, og
hvilken asset-type de wires til.

## Wiring-mekanikk (implementert i CityScene.ts)

- Eksplisitt `asset:`-felt på en BD vinner alltid.
- Ellers slås BD-ens `name` opp i `FILLER`-mappen (CityScene.ts) som peker på
  en pool av fargevarianter; `pickVariant()` hasher tomtekoordinatene så
  valget er stabilt mellom reloads.
- **Grid-BD-er** (Boliger, TIL LEIE, Kongssenteret) rendrer én sprite **per
  celle** (cellene er ~kvadratiske; én strukket envelope-sprite ville
  deformeres på 4×1/6×2-slots). Celler uten egen pool bruker den generiske
  butikklokale-poolen.
- Manglende teksturfil ⇒ prosedural boks består som nødfallback. Ingen kode
  må endres når en PNG legges til i `public/assets/raw/` — den plukkes opp
  ved neste load.

## Genererings-katalog (11 typer, 22 PNG-er)

| Type (building_type)              | Varianter | Asset-ids |
|-----------------------------------|-----------|-----------|
| boligblokk_lav (apartment_low)    | 3         | boligblokk_lav_a/b/c (hvit / oker / salvie) |
| boligblokk_hoy (apartment_high)   | 3         | boligblokk_hoy_a/b/c (betong-hvit / teglrød / blågrå) |
| kontorbygg (office_block)         | 3         | kontorbygg_a/b/c (lysgrå / sand / koksgrå) |
| rekkehus (rowhouse)               | 2         | rekkehus_a/b (rød / hvit) |
| enebolig (detached_house)         | 3         | enebolig_a/b/c (hvit / gul / rød) |
| tomannsbolig (duplex)             | 2         | tomannsbolig_a/b (hvit / blågrå) |
| butikklokale (generic_storefront) | 3         | butikklokale_a/b/c (hvit tre / tegl / betong) |
| skolebygg (school)                | 1         | skolebygg_a |
| idrettshall (sports_hall)         | 1         | idrettshall_a |
| parkeringshus (parking_garage)    | 1         | parkeringshus_a |
| — gjenbruk av eksisterende        | 0 nye     | se «Gjenbruk» under |

## Slot-mapping

### Boliger / hus (29 BD-er → bolig-typene)

| BD-navn | Antall BD-er | Rendering | Pool |
|---|---|---|---|
| `Boliger` (grid med 🏠) | 24 | per celle | boligblokk_lav_a/b/c |
| `🏠` (single, 1×1–1×2) | 5 | envelope | enebolig_a/b/c |
| `Bolig` (rad 15, fl3) | 1 | envelope | boligblokk_hoy_a |
| `Leilighet` (rad 15, fl4) | 1 | envelope | boligblokk_hoy_b |
| `Stasjonsparken` (4×4, fl5) | 1 | envelope | boligblokk_hoy_c |
| `Rekkehus` (Bydel Øst) | 2 | envelope | rekkehus_a/b |
| `Enebolig` (Bydel Øst) | 2 | envelope | enebolig_a/b/c |
| `Tomannsbolig` (Bydel Øst) | 2 | envelope | tomannsbolig_a/b |

### Næring / handel

| BD | Rendering | Pool / asset |
|---|---|---|
| 21 × TIL LEIE V-grids | per celle | butikklokale_a/b/c (TIL LEIE-badge oppå) |
| KONGSSENTERET ×3 blokker | per celle | butikklokale_a/b/c (header + tenant-tekst oppå) |
| `Butikk` ×4 (Stasjonsbyen) + `Butikk` (rad 15) | envelope | butikklokale_a/b/c |
| `Kontor` ×2 (rad 15) | envelope | kontorbygg_a/b |
| `SSB` | envelope | kontorbygg_c |
| `P` (parkering) | envelope | parkeringshus_a |

### Gjenbruk av eksisterende assets (ingen generering nødvendig)

| BD (Stasjonsbyen m.m.) | Eksisterende asset |
|---|---|
| `Hovedstasjonen` | jernbanestasjon |
| `Sparebanken` | bank |
| `Kiwi` (sør) | kiwi |
| `Coop Mega 🛒` | coop_mega |
| `Restaurant` | restaurant_modern |
| `Kafé` | cafe |
| `Boutique` | fashion_shop |
| `Bokhandel` | bokhandel |
| `Apotek` | apotek1 |
| `Sentrum ungdomsskole` | skolebygg_a (ny) |
| `Sentrum idrettshall` | idrettshall_a (ny) |

### Unntak — forblir prosedurale med vilje

| BD | Hvorfor |
|---|---|
| `⛲` Fontene (_V,5) | Plaza-prop, ikke et bygg; 1×1 dekor |
| `Rådhusplassen`, `Friidrettsanlegg`, `Tennisbaner` | `plaza:true` — flate, rendres som steinsjakk/baneflater |
| Veier, jernbane, park, gågate | Egen rendering utenfor B[] |

Etter full generering + gjenbruk skal **ingen** BD (utenom unntakene over)
rendre prosedural boks med mindre en PNG mangler på disk.

---

## Genereringslogg — 2026-06-11/12 ✅ KOMPLETT

Alle 22 PNG-er generert via nano-banana + rembg, lagret i
`public/assets/raw/`, preloadet i `BootScene.MODERN_BUILDING_ASSETS`.

### Spec-justeringer underveis (pilot + full kjøring)

1. **Kamera-spec** lagt til i både `base_style_legacy` (som bestilt) og
   `base_style` — pilot-typene er moderne og trengte samme kameralinje.
2. **Fargedirektiver forsterket**: `location_specific` med svak farge
   («white-painted wood cladding») ble ignorert; omskrevet til «the ENTIRE
   facade is uniformly … — no brick sections, no natural wood sections».
3. **Residential-vern**: base-stilens «commercial glass storefront»-subjekt
   dro boligtyper mot butikker. Alle boligtyper fikk «Residential character:
   … NOT a shop»-setning; `boligblokk_lav` flyttet small→medium.
4. **apartment_high**: kollapset 2 av 3 ganger til én etasje; fikk
   «CRITICAL: MUST be three or four stories»-setning + size large.
5. **rowhouse**: første forsøk ga flat-tak glasspaviljong; fikk
   «CRITICAL: … PITCHED roofs … NOT a flat-roof modern pavilion».
6. **enebolig_a (hvit)**: feilet to ganger med samme katalog-prompt
   (butikk-aktig miks av tegl/betong); landet på tredje forsøk med
   omskrevet subjekt («traditional Nordic enebolig», materialforbud).
   De justerte promptene for retry 3 ligger IKKE i ASSET_PROMPTS.json —
   regenerering av enebolig_a bør gjenta forsterkningene manuelt.

### Kjente avvik i leverte assets

- `tomannsbolig_a`: kremhvit/varmhvit snarere enn ren hvit; godkjent.
- `boligblokk_hoy_a` har 3 etasjer, `_c` har 4 — innenfor typedefinisjonen.
- Husk: nano-banana leverer av og til to filer per kall (én med
  nabolags-bakgrunn) — bruk alltid den FØRSTE stien i MCP-svaret.

---

## KVARTALSBY-tillegg — 2026-06-12

- **Alle assets i raw/ er nå alpha-trimmet** (`scripts/trim-assets.py`,
  65+9 filer): rembg-margen under veggene (28–92 px) gjorde at sprites
  svevde over tomtene. `SPRITE_BASE_Y` i CityScene er derfor **1.0** —
  kjør ALLTID trim-scriptet etter `clean-asset.sh` på nye assets, ellers
  svever de igjen.
- De manuelt omskrevne retry-promptene (enebolig/tomannsbolig/idrettshall)
  er tilbakeført til `_building_defaults` — punktet over om manuell
  gjentakelse er ikke lenger nødvendig.
- 9 nye assets: `kvartal_a–f` (3-4-bygnings rekker, legacy-stil),
  `kvartal_smal_a/b` (2-bygnings), `kjopesenter` (Kongssenteret-anker,
  moderne stil). Sone-/kvartaltabell: se CITY_SLOT_REGISTRY.md.
- Kvartal-pilot (kvartal_c/d) traff vinkel/lys/metning på første forsøk —
  ingen spec-justering nødvendig for kvartal-typene.
