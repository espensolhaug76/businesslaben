// ── Bydels- og lokaledata for bybilde-arkitekturen (master → bydel → lokale) ──
//
// Koordinatsystem: PROSENT av bildet (0–100 på begge akser), uavhengig av
// pikseloppløsning. master.png og district_sentrum.png er 1408×768; SVG-
// overlayene bruker viewBox="0 0 100 100" + preserveAspectRatio="none" slik
// at prosentkoordinatene treffer direkte.
//
// Polygonene er GROVE førsteutkast — Espen finjusterer punktene mot
// master.png senere. Det samme gjelder lokale-rektanglene i sentrum.

import type { LocationZone } from '../game/types'

export interface District {
  id: string
  navn: string
  beskrivelse: string
  /** Grunnleie per måned for et typisk lokale i bydelen (kr). */
  leieniva: number
  trafikk: 'Lav' | 'Middels' | 'Høy'
  maalgruppe: string
  /** Sone-mapping mot eksisterende spillogikk (RENT_LOCATION). */
  zone: LocationZone
  /** Klikkpolygon på master.png, i prosent [x, y]. */
  polygon: [number, number][]
  /** Bydelsbilde i /public/assets/city/ — undefined ⇒ «kommer snart». */
  image?: string
  /** Vis ledige lokaler (TIL LEIE-skilt + leie-klikk) i bydelen. Undefined ⇒
   *  true. Settes false på bydeler der etablering ennå ikke er åpnet (skjuler
   *  KUN visningen; lokaldataene/mekanikken beholdes). */
  visLedigeLokaler?: boolean
}

export interface Lokale {
  id: string
  navn: string
  /** Klikkrektangel på bydelsbildet, i prosent [x, y, bredde, høyde]. */
  rect: [number, number, number, number]
  sqm: number
  kapasitet: number
  /** Leie = round(district.leieniva × rentFactor / 100) × 100. */
  rentFactor: number
}

export const DISTRICTS: District[] = [
  {
    id: 'sentrum',
    navn: 'Sentrum',
    beskrivelse:
      'Gågata og torget — byens hjerte med høyest kundetrafikk, kafeer og spesialbutikker. Premium beliggenhet til premium pris.',
    leieniva: 45000,
    trafikk: 'Høy',
    maalgruppe: 'Alle aldersgrupper; mest fotgjengere, turister og lunsjkunder på dagtid.',
    zone: 'gagata',
    polygon: [[36, 33], [61, 33], [61, 62], [36, 62]],
    image: '/assets/city/district_sentrum.png',
  },
  {
    id: 'stasjonsomradet',
    navn: 'Stasjonsområdet',
    beskrivelse:
      'Området rundt jernbanestasjonen — jevn strøm av pendlere morgen og ettermiddag. Godt synlig, noe lavere leie enn gågata.',
    leieniva: 32000,
    trafikk: 'Middels',
    maalgruppe: 'Pendlere og reisende; hektisk rush, rolig midt på dagen.',
    zone: 'hovedgata',
    polygon: [[40, 62], [78, 62], [78, 82], [40, 82]],
    image: '/assets/city/district_stasjonsomradet.png',
    // Etablering på stasjonen er ikke åpnet ennå (Espens beslutning) — skjul
    // TIL LEIE-skiltene. Lokaldataene (LOKALER) + reiselivs-hotspotene beholdes.
    visLedigeLokaler: false,
  },
  {
    id: 'storhandel',
    navn: 'Storhandel',
    beskrivelse:
      'Bilbasert handelspark med store flater og rikelig parkering. Lav leie per kvadratmeter, kundene kommer med handleliste.',
    leieniva: 22000,
    trafikk: 'Middels',
    maalgruppe: 'Barnefamilier og storhandlere med bil, mest helg og ettermiddag.',
    zone: 'utkant',
    polygon: [[12, 11], [51, 11], [51, 30], [12, 30]],
  },
  {
    id: 'industri',
    navn: 'Industriområdet',
    beskrivelse:
      'Lager, verksteder og godsterminal langs jernbanen. Billigst i byen — men nesten ingen forbipasserende kunder.',
    leieniva: 12000,
    trafikk: 'Lav',
    maalgruppe: 'Bedriftskunder og håndverkere; B2B-preget område.',
    zone: 'utkant',
    polygon: [[1, 28], [22, 28], [22, 70], [1, 70]],
  },
  {
    id: 'bolig_vest',
    navn: 'Bolig vest',
    beskrivelse:
      'Etablert boligstrøk vest i byen med nærbutikk-potensial. Lojale naboer, men begrenset trafikk utenfra.',
    leieniva: 15000,
    trafikk: 'Lav',
    maalgruppe: 'Beboere i nærområdet; hverdagshandel og kveldskunder.',
    zone: 'utkant',
    polygon: [[2, 70], [40, 70], [40, 97], [2, 97]],
  },
  {
    id: 'bolig_ost',
    navn: 'Bolig øst',
    beskrivelse:
      'Villastrøk i åssiden øst for sentrum. Rolig, kjøpesterkt nabolag — passer nisjekonsepter med stamkunder.',
    leieniva: 16000,
    trafikk: 'Lav',
    maalgruppe: 'Etablerte familier med god kjøpekraft; helgehandel.',
    zone: 'utkant',
    polygon: [[62, 12], [97, 12], [97, 45], [62, 45]],
  },
  {
    id: 'skole_idrett',
    navn: 'Skole og idrett',
    beskrivelse:
      'Skole, idrettshall og stadion — ungt publikum og arrangementstopper på kveldstid og i helger.',
    leieniva: 18000,
    trafikk: 'Middels',
    maalgruppe: 'Elever, ungdom og idrettsfamilier; topper rundt treninger og kamper.',
    zone: 'utkant',
    polygon: [[22, 30], [36, 30], [36, 52], [22, 52]],
  },
  {
    id: 'ovrebyen',
    navn: 'Øvrebyen',
    beskrivelse:
      'Den eldre bydelen mellom sentrum og villastrøkene — teglgater, kontorer og småbutikker med lokal sjarm.',
    leieniva: 26000,
    trafikk: 'Middels',
    maalgruppe: 'Kontoransatte og lokalkunder; jevn hverdagstrafikk.',
    zone: 'hovedgata',
    polygon: [[61, 45], [97, 45], [97, 60], [61, 60]],
  },
]

// ── Lokaler per bydel ─────────────────────────────────────────────────────────
// Kun sentrum har bilde og lokaler nå. Rektanglene ligger over butikkfrontene
// i district_sentrum.png (venstre og høyre husrekke langs gågata).

export const LOKALER: Record<string, Lokale[]> = {
  // Stasjonsområdet (BYDEL 2): grove startkoordinater over butikkfrontene —
  // venstre = stasjonsbygningen (blå markiser), høyre = butikkrekka
  // (grønne/blå markiser), bakerst = den røde murgården. Finjuster med ?dev=1.
  stasjonsomradet: [
    { id: 'stasjon-l1',  navn: 'Stasjonsbygningen 1',  rect: [10, 75, 9, 17], sqm: 75, kapasitet: 140, rentFactor: 1.15 },
    { id: 'stasjon-l2',  navn: 'Stasjonsbygningen 2',  rect: [20, 68, 8, 15], sqm: 62, kapasitet: 120, rentFactor: 1.05 },
    { id: 'stasjon-l3',  navn: 'Stasjonsbygningen 3',  rect: [27, 60, 7, 13], sqm: 55, kapasitet: 105, rentFactor: 1.0 },
    { id: 'stasjon-l4',  navn: 'Stasjonsbygningen 4',  rect: [33, 53, 6, 11], sqm: 48, kapasitet: 90,  rentFactor: 0.9 },
    { id: 'stasjon-l5',  navn: 'Perronggata 2',        rect: [72, 72, 10, 16], sqm: 80, kapasitet: 150, rentFactor: 1.2 },
    { id: 'stasjon-l6',  navn: 'Perronggata 4',        rect: [66, 62, 8, 13], sqm: 60, kapasitet: 115, rentFactor: 1.05 },
    { id: 'stasjon-l7',  navn: 'Perronggata 6',        rect: [62, 54, 7, 11], sqm: 52, kapasitet: 100, rentFactor: 0.95 },
    { id: 'stasjon-l8',  navn: 'Perronggata 8',        rect: [59, 47, 6, 10], sqm: 45, kapasitet: 85,  rentFactor: 0.9 },
    { id: 'stasjon-l9',  navn: 'Perronggata 10',       rect: [56, 41, 5, 9],  sqm: 40, kapasitet: 75,  rentFactor: 0.85 },
    { id: 'stasjon-l10', navn: 'Torgbygget 1',         rect: [43, 31, 5, 8],  sqm: 42, kapasitet: 80,  rentFactor: 0.85 },
    { id: 'stasjon-l11', navn: 'Torgbygget 2',         rect: [49, 31, 5, 8],  sqm: 42, kapasitet: 80,  rentFactor: 0.85 },
    { id: 'stasjon-l12', navn: 'Torgbygget 3',         rect: [54, 31, 4, 8],  sqm: 38, kapasitet: 70,  rentFactor: 0.8 },
  ],
  // LOKAL-STIGEN (REKALIBRERING pkt. 35 / DEL 5): rentFactor (→ husleie) og
  // basetrafikk (balance.ts) stiger SAMMEN — dyrere lokale = mer trafikk, ingen
  // «gratis vinner». Stige-tabell (rentFactor · husleie · basetrafikk) i
  // docs/VERDENSMODELL.md §3. Endrer du rentFactor her, oppdater basetrafikk der.
  sentrum: [
    { id: 'sentrum-l1', navn: 'Hjørnelokalet ved torget', rect: [4, 52, 16, 28], sqm: 85, kapasitet: 160, rentFactor: 1.2 },
    { id: 'sentrum-l2', navn: 'Gågata 12',                rect: [20, 44, 11, 22], sqm: 60, kapasitet: 120, rentFactor: 1.0 },
    { id: 'sentrum-l3', navn: 'Gågata 14',                rect: [30, 38, 9, 17],  sqm: 48, kapasitet: 95,  rentFactor: 0.9 },
    { id: 'sentrum-l4', navn: 'Gågata 16',                rect: [38, 32, 7, 14],  sqm: 40, kapasitet: 80,  rentFactor: 0.8 },
    { id: 'sentrum-l5', navn: 'Torggata 1',               rect: [73, 47, 17, 28], sqm: 92, kapasitet: 170, rentFactor: 1.25 },
    { id: 'sentrum-l6', navn: 'Torggata 3',               rect: [64, 38, 10, 19], sqm: 55, kapasitet: 110, rentFactor: 0.95 },
    { id: 'sentrum-l7', navn: 'Torggata 5',               rect: [57, 31, 8, 14],  sqm: 42, kapasitet: 85,  rentFactor: 0.85 },
  ],
}

// ── LEVENDE BY — animasjonsdata ───────────────────────────────────────────────

/** Industripiper på master.png (prosent [x, y]) — røyk-emittere. Beste
 *  estimat mot de malte røyksøylene øverst i industriområdet; finjuster med
 *  ?dev=1-koordinathjelperen (klikk på pipa → prosent i konsollen). */
export const SMOKESTACKS: [number, number][] = [
  [8.8, 29],
  [10.6, 33],
  [6.2, 41],
]

/** Bilruter på master.png (prosent-polylinjer). Bilene kjører én retning
 *  per rute med høyre-offset; `pauseAt` (valgfri) = punktindekser med kort
 *  stopp. Trace-t av Espen med ?dev=1 2026-06-12 — rundkjøringa er ekte
 *  kurve, så pausepunkter er ikke lenger nødvendige. NB: original-rute 3
 *  hadde pennehopp [-0.1,96.8]→[22.4,98.7] (ny tur uten «Ny rute») —
 *  splittet i to her. */
export interface Road { points: [number, number][]; pauseAt?: number[] }
export const ROADS: Road[] = [
  // Vest inn → rundkjøringa rundt → nordøst mot sentrum
  { points: [[0, 75.2], [5.2, 81.9], [7.4, 85.5], [7.2, 88.2], [7.4, 90.7], [8.1, 91.9], [9, 92.6], [10, 93.1], [11.7, 92.6], [12.5, 92.6], [14.2, 91.8], [15.4, 90.6], [16.3, 89.2], [16.6, 86.5], [17.3, 85], [18.6, 82.7], [19.6, 81.9], [33.8, 70.9], [43.4, 63.4]] },
  // Vest inn → rundkjøringa → ut mot sør
  { points: [[0.1, 75.6], [7.3, 85.4], [7.1, 87.2], [7.1, 89], [7.4, 90.6], [7.8, 91.9], [8.6, 92.8], [10, 93.2], [12.2, 92.7], [13.1, 92.5], [15.2, 94.6], [18.8, 98.9]] },
  // Vest inn → rundkjøringa → ut mot sørvest (fra pennehopp-splitten)
  { points: [[-0.1, 75.4], [7.3, 85.2], [7.1, 87.3], [7, 89.1], [6.4, 91], [5.5, 92.5], [-0.1, 96.8]] },
  // Sør inn → rundkjøringa → ut mot vest
  { points: [[22.4, 98.7], [16.6, 91.3], [16.3, 89.5], [16.8, 87.2], [16.4, 85.4], [15.4, 84.1], [13.6, 83.6], [11.4, 83.7], [9.9, 83.3], [0, 71.8]] },
  // Sør inn → rundkjøringa øst → nordøst mot sentrum
  { points: [[22.5, 98.8], [16.3, 90.7], [16.5, 88.3], [16.6, 86.1], [18.2, 83.2], [40, 66], [43.3, 63.3]] },
  // Sør inn → nordøst → opp til storhandel + parkeringssløyfe
  { points: [[22.4, 98.6], [16.2, 90.7], [16.6, 87.3], [16.7, 85.9], [18.7, 82.6], [38.6, 66.9], [32.2, 62.2], [22, 51.9], [21.4, 48.5], [21.7, 45.7], [23.6, 41.2], [25.7, 37.3], [27.4, 35.7], [31.7, 33], [37.8, 29.8], [39.3, 29], [33.5, 24.3], [33.9, 23.5], [34.9, 23.1], [35.5, 23.6]] },
  // Storhandel → ned → hovedveien østover → ut høyre kant
  { points: [[30.4, 25.1], [32.6, 24.1], [38.7, 28.4], [39, 29], [27.1, 35.7], [22.4, 43], [20.7, 47.9], [21.2, 51.9], [22.1, 53.5], [36.5, 66.5], [45.9, 74.7], [48.3, 76.3], [50.1, 76.9], [51.5, 76.7], [52.9, 76.4], [81.5, 53.2], [99.9, 37.6]] },
  // Retur: sentrum → rundkjøringa → ut mot sør
  { points: [[43.3, 62.3], [16.1, 82.9], [14.1, 83.5], [10.9, 83.7], [8.8, 85.2], [7.1, 87.8], [7.4, 91.1], [8.3, 92.6], [10.1, 93.2], [13.2, 92.6], [18.7, 98.8]] },
  // Øst inn → hovedveien vestover → avkjøring nord
  { points: [[98.9, 37.7], [52.9, 75.8], [51.1, 76.6], [48.5, 75.6], [43.8, 71.4], [28, 57.7], [27.8, 56.9], [29.7, 55.3]] },
  // Storhandel-området → nordøstover
  { points: [[22.4, 29.1], [31.8, 24.1], [38.9, 29.1], [39.8, 29.6], [49, 24.4], [56.4, 20.3], [59.6, 17.3]] },
  // Boligfeltet sørøst — sikksakk mellom kvartalene
  { points: [[56, 83], [73.1, 67.9], [86.9, 79.1], [96.1, 68.5], [99.9, 70.7]] },
  // Bensinstasjon-svingen ved rundkjøringa → nordøst
  { points: [[17.5, 74.6], [18.6, 76.7], [21.7, 73.4], [24.9, 77.1], [43.3, 63.6]] },
]

/** Kundestier per bydel (prosent-punkter på bydelsbildet).
 *
 *  FOTGJENGER-FIX DEL 2: sidevisnings-sprites ser bare riktige ut med klar
 *  horisontal bevegelseskomponent — alle segmenter holder seg under ~70° fra
 *  horisontal i SKJERM-rom (CustomerFlow dev-sjekker dette ved mount).
 *  Stiene er lagt på tvers/diagonalt i de åpne sonene og rutet UTENOM
 *  mobleringssonene i NO_GO (benker/trær/lykter/statue). */
export const KUNDESTIER: Record<string, [number, number][][]> = {
  // Trace-t av Espen (runde 2) 2026-06-12 — 8 ruter på ekte gateplan.
  // NB: rute 4 hadde dobbeltklikk-duplikatet [78.8,95] × 2 — dedupliser.
  sentrum: [
    [[23.9, 93.6], [34.2, 65.7], [42.7, 52.6], [49, 39.4]],
    [[18.1, 95], [29.2, 75.5], [38.4, 66.3], [44.9, 53.3], [46.9, 39.4]],
    [[20, 95], [28.9, 73.2], [37.9, 58.9], [49.3, 42.4], [48.5, 38.8], [53.1, 34.5]],
    [[78.8, 95], [75.4, 68.7], [68.9, 53], [68.2, 42.4]],
    [[74.6, 95], [70.6, 69.3], [69.1, 42.4]],
    [[70.4, 94.7], [72.1, 67.6], [75.7, 61.4], [70.2, 55.1], [69.4, 43.2]],
    // Tverrgående krysning av gata
    [[54.6, 44], [37.5, 94.2]],
    // Midtaksen rett opp
    [[53.9, 95], [54.3, 42]],
  ],
  // BYDEL 2 (stasjonsområdet): tom til Espen tracer med ?dev=1 på
  // /game/d/stasjonsomradet — fallback-chip vises imens.
  stasjonsomradet: [],
}

/** Perspektivskala (FOTGJENGER-FIX DEL 1): to kalibreringslinjer — nær-kant
 *  og fjern-kant av gågata — med sprite-høyde som ANDEL av stage-høyden.
 *  Kalibrert mot de malte menneskene i district_sentrum_old.png:
 *  nederst i bildet ≈ 58–62 px på 768 px høyde (~0,080), oppe ved torget
 *  ≈ 25–27 px (~0,034). Interpoleres lineært på y, klemt utenfor linjene. */
export interface DepthScale { nearY: number; nearH: number; farY: number; farH: number }
export const KUNDESKALA: Record<string, DepthScale> = {
  sentrum: { nearY: 92, nearH: 0.080, farY: 30, farH: 0.034 },
  // BYDEL 2: grovkalibrert mot lyktestolpene langs gata (nærmeste stolpe
  // ~y 60–88, bakerste ved den røde murgården ~y 38–50) — folk litt lavere
  // enn stolpene. Kontroller linjene visuelt med ?dev=1.
  stasjonsomradet: { nearY: 88, nearH: 0.075, farY: 35, farH: 0.032 },
}

/** Mobleringssoner (no-go) — benker, beplantning, lyktestolper, statue.
 *  Valgt occlusion-løsning: stiene RUTES UTENOM sonene (ingen sprites bak
 *  objekter ⇒ ingen ekte occlusion nødvendig). CustomerFlow dev-varsler om
 *  sti-punkter havner inni en sone. Rektangler: [x, y, bredde, høyde] i %. */
export const NO_GO: Record<string, [number, number, number, number][]> = {
  sentrum: [
    // Venstre møbleringsrekke. NB: rekka er perspektiv-skrå, boksen er
    // aksejustert — krympet til nedre del så den ikke motsier de trace-te
    // stiene (som er fasit). Re-trace gjerne sonene med ?dev=1 ved behov.
    [39, 58, 6, 26],
    [57, 50, 10, 30], // høyre møbleringsrekke
    [52, 33, 8, 8],   // statuen/fontenen på torget
  ],
}

/** Storefront-hotspots (STOREFRONT-NIVÅ) — prosent av FASADEBILDET.
 *  Kalibrert mot storefront_pilot.png (teglgård: hvitt skiltbånd over
 *  markisen ~y 49–56 %, stort vindu nede til venstre, dør i midten).
 *  Justerbare med ?dev=1-krysset på storefront-visningen.
 *  [x, y, bredde, høyde]. */
/** Trace-t av Espen mot glasskantene i fasadebildet (SONE-TRACING ?dev=1). */
export const STOREFRONT_HOTSPOTS: Record<'skilt' | 'vindu' | 'dor', [number, number, number, number]> = {
  skilt: [17.6, 49.3, 65.6, 4.3],
  vindu: [17.3, 65.9, 28.9, 16.2],
  dor: [55.1, 67, 8.3, 15.7],
}

/** TEMA 15 REISELIV — hotspots på STASJONS-bydelsbildet (prosent [x, y, b, h]).
 *  Byhotellet er bakt inn i bildet (mursteinsbygget merket HOTEL midt i enden av
 *  gata); turistkontoret ligger på et bygg langs gata. LÅST av Espen via ?dev=1
 *  ZoneTracer (RECT-traceren — se DistrictView). Vises/klikkbare kun når
 *  reiseliv-temaet er aktivt. */
export const STASJON_REISELIV_HOTSPOTS: Record<'turistkontor' | 'byhotell', [number, number, number, number]> = {
  turistkontor: [57, 26.6, 4.2, 11.3],   // Espen-tracet (?dev=1 ZoneTracer) — bygg langs gata
  byhotell:     [47.6, 15.8, 8.7, 13.8], // Espen-tracet — det sentrale HOTEL-bygget
}

/** Høyre vindu — kampanjeflate (fremtidig markedsførings-visning).
 *  Trace-t av Espen. */
export const STOREFRONT_KAMPANJE: [number, number, number, number] = [73, 66, 12.1, 19.1]

/** Produkt-sprites (VINDUSHUD) — klippet fra bakery_assets.png
 *  (scripts/cut-pedestrians.py, 3×3 --smart). Matches mot produktNAVN
 *  (lowercase contains) så både demo- og katalogprodukter treffer;
 *  produkter uten match faller tilbake til emoji-ikonet. `scale` holder
 *  visningsstørrelsene innenfor ±30 % (brød/kake naturlig størst). */
export interface ProductSprite { match: string[]; file: string; scale: number }
export const PRODUCT_SPRITES: ProductSprite[] = [
  { match: ['kaffe', 'coffee'], file: '/assets/city/product_bakery_01.png', scale: 1.0 },
  { match: ['croissant'], file: '/assets/city/product_bakery_02.png', scale: 0.95 },
  { match: ['muffin'], file: '/assets/city/product_bakery_03.png', scale: 0.95 },
  { match: ['sandwich', 'baguett'], file: '/assets/city/product_bakery_04.png', scale: 1.1 },
  { match: ['kake', 'cake'], file: '/assets/city/product_bakery_05.png', scale: 1.05 },
  { match: ['brød', 'brod', 'loff'], file: '/assets/city/product_bakery_06.png', scale: 1.2 },
  { match: ['smoothie', 'juice'], file: '/assets/city/product_bakery_07.png', scale: 1.05 },
  { match: ['kanelbolle', 'bolle', 'skolebolle'], file: '/assets/city/product_bakery_08.png', scale: 0.95 },
  { match: ['cookie', 'kjeks'], file: '/assets/city/product_bakery_09.png', scale: 0.85 },
]
export function spriteForProduct(name: string): ProductSprite | undefined {
  const n = name.toLowerCase()
  return PRODUCT_SPRITES.find(s => s.match.some(m => n.includes(m)))
}

/** Utstillingsflater i interiøret (VINDUSHUD) — prosent av FASADEN (samme
 *  system som STOREFRONT_HOTSPOTS, kalibrerbare med ?dev=1). Bunnen av
 *  rektangelet = flaten varene står på. `size` = relativ enhetsstørrelse
 *  (dybde: disk i front størst, bakvegg minst). */
/** Trace-t av Espen mot de synlige flatene i fasaden (SONE-TRACING ?dev=1):
 *  disk = diskflaten i vinduet (bred, hovedflate for hovedproduktet),
 *  bakvegg = hyllene øverst, hylle_venstre = flaten i full vindusbredde
 *  nederst. Bunnen av rektangelet = flaten varene står på. */
export const STOREFRONT_DISPLAY_ZONES: { id: 'disk' | 'bakvegg' | 'hylle_venstre'; rect: [number, number, number, number]; size: number }[] = [
  { id: 'disk', rect: [19.9, 78.8, 22.4, 1.9], size: 1.0 },
  { id: 'bakvegg', rect: [20.8, 66.1, 22.8, 8.9], size: 0.62 },
  { id: 'hylle_venstre', rect: [17.5, 75.6, 27.1, 5.5], size: 0.55 },
]

/** Kunde-soner i interiøret (INTERIØR-NIVÅ) — prosent av interiørbildet
 *  [x, y, b, h]. Trace-t av Espen med ?dev=1 på /inne. ENESTE kilde til
 *  kunde-plasseringen: SPAWN = der kunden dukker opp (bakerst), STAND =
 *  ståplassen hun går fram til. All plassering i InteriorView leser herfra.
 *  Trace-t av Espen mot interior-kasse.png 2026-07-02 — samme rektangel for
 *  begge (oppgitt likt). */
export const INTERIOR_CUSTOMER_SPAWN: [number, number, number, number] = [42.6, 26, 27.1, 50.5]
export const INTERIOR_CUSTOMER_STAND: [number, number, number, number] = [42.6, 26, 27.1, 50.5]

/** TEMA 15 REISELIV (bølge 3) — ledige kundeposisjoner for AMBIENT turist-
 *  gjester (ren visuell tilstedeværelse i sesong; ingen interaksjon). Prosent
 *  av interior-kasse.png [x, y, b, h], sprite tegnes object-fit:contain forankret
 *  i bunn. PLACEHOLDER-rects (grovt estimat til hver side av kunde-standen) —
 *  Espen tracer med ?dev=1 (sone-tracer «ambient-N») og LÅSER her, som for
 *  STASJON_REISELIV_HOTSPOTS. */
export const INTERIOR_AMBIENT_TURIST_SLOTS: [number, number, number, number][] = [
  [12, 30, 18, 52],  // venstre bak — PLACEHOLDER
  [70, 30, 18, 52],  // høyre bak — PLACEHOLDER
  [2, 34, 15, 48],   // ytterste venstre — PLACEHOLDER (reserve)
]

/** Disk-monterens utstillingsflate (INTERIØR-NIVÅ) — prosent av interiørbildet
 *  [x, y, b, h]. Andre flate for vareeksponering (fixtureId='monter');
 *  vindusutstillingen er den første. Flaten ligger i forgrunnen, NEDENFOR
 *  COUNTER_OCCLUDE_Y (disk-trauet), så varene leses som «på disken». Startverdi
 *  er et rimelig estimat — trace-bar med ?dev=1 på /inne (sone-tracer →
 *  «Bruk siste på disk», verdien logges for innliming hit). */
export const INTERIOR_DISK_DISPLAY: [number, number, number, number] = [14, 74, 72, 22]

/** Tavle-sonen (INTERIØR-NIVÅ, bakfra-vy på /inne) — prosent av
 *  interior-kasse.png [x, y, b, h]. Den blanke tavla på høyre vegg —
 *  DEL 3 (drikkemeny). Startverdi er et GROVT estimat lest av bildets
 *  pikselmål (1376×768, tavlas mørke ramme ca. x 1057–1220, y 68–437) —
 *  IKKE Espens kalibrering. Trace-bar med ?dev=1 på /inne (sone-tracer →
 *  «Bruk siste på: meny»), verdien logges for innliming hit når Espen
 *  har trukket sonen på plass i Chrome. */
export const INTERIOR_MENU_BOARD: [number, number, number, number] = [77, 9, 12, 47]

/** Speil-soner (INTERIØR-NIVÅ, bakfra-vy på /inne) — prosent av
 *  interior-kasse.png [x, y, b, h]. Glassmonteret er synlig i bakgrunnen til
 *  venstre fra denne kameravinkelen; disse sonene er der varene fra
 *  counterLayout (den FRONTALE MonterScene-monteren) speiles inn som ambient
 *  bakgrunnsliv — IKKE en redigeringsflate, kun tilnærmet plassering.
 *  `mirrorsTrauId` er EKSPLISITT satt av Espen (hvilket fysisk trau er synlig
 *  i akkurat DENNE sonen fra denne kameravinkelen) — ikke utledet/gjettet.
 *  `mirrorScale` (default 1) er PER SONE dev-kalibrering (?dev=1-panel i
 *  InteriorView) — hver sone sitter et annet sted i fotoet med annen skala,
 *  så én universal formel for alle så rart ut. `mirrorTiltX`/`mirrorTiltY`
 *  (grader, default 0) er EKTE 3D-vinkler (perspective + rotateX/rotateY),
 *  ikke en flat rotate() — en flat rotasjon bare spinner bildet side-til-side
 *  i skjermplanet og kan ikke få en vare til å se ut som den ligger PÅ en
 *  hylle. TiltX = vippet forover/bakover (toppen nærmere/fjernere kamera),
 *  TiltY = vridd sidelengs. Nøyaktig 6 fysiske speil-soner (ikke 7 —
 *  speil-7/trau-17 fra 2026-07-02 var en duplikat-sone, samme fysiske plass
 *  som speil-1/trau-18, feil identifisert første gang). Trace-t av Espen mot
 *  interior-kasse.png 2026-07-03. */
export interface InteriorMirrorTrau {
  id: string
  rect: [number, number, number, number]
  mirrorsTrauId: string
  mirrorScale?: number
  mirrorTiltX?: number
  mirrorTiltY?: number
}
// mirrorTiltX/mirrorTiltY kalibrert visuelt av Espen (?dev=1
// speil-kalibreringspanelet) 2026-07-06.
// mirrorScale justert NED 2026-07-06 (samme dato, egen runde): speil-laget
// klipper nå TOPPEN også (InteriorView, "Fix speil-overflyt" — se kommentar
// ved clipPath der), så de gamle verdiene (kalibrert mot et topp-åpent lag)
// skar brødet stygt av. Nye tall er utledet fra faktisk målt overflyt i en
// headless-kjøring (Playwright: fylte alle 6 speil-trau, målte hvor mye hvert
// speil-bilde stakk over sin egen sone før klippet) — IKKE gjettet fra et
// skjermbilde. Formelen løser mirrorScale slik at bildet akkurat unngår å
// treffe sonens gamle overflyt, med ~10-15 % margin. Espen bør likevel
// synskalibrere i Chrome (?dev=1-panelet, samme slider) — dette er et
// beregnet, ikke et visuelt godkjent, utgangspunkt.
export const INTERIOR_MIRROR_TRAU: InteriorMirrorTrau[] = [
  { id: 'speil-1', rect: [0, 54.5, 17.3, 6.6], mirrorsTrauId: 'trau-18', mirrorScale: 2.75, mirrorTiltX: 29, mirrorTiltY: 0 },
  { id: 'speil-2', rect: [1, 66.9, 7.6, 4], mirrorsTrauId: 'trau-15', mirrorScale: 2.25, mirrorTiltX: 0, mirrorTiltY: 7 },
  { id: 'speil-3', rect: [0, 70, 5.7, 4.4], mirrorsTrauId: 'trau-13', mirrorScale: 2.75, mirrorTiltX: 41, mirrorTiltY: 0 },
  { id: 'speil-4', rect: [8.8, 66.7, 6.8, 7.3], mirrorsTrauId: 'trau-16', mirrorScale: 2.55, mirrorTiltX: 0, mirrorTiltY: 0 },
  { id: 'speil-5', rect: [0.2, 78.3, 8.7, 11.5], mirrorsTrauId: 'trau-8', mirrorScale: 2.75, mirrorTiltX: 19, mirrorTiltY: 0 },
  { id: 'speil-6', rect: [9.3, 78.6, 7.3, 10.3], mirrorsTrauId: 'trau-7', mirrorScale: 2.8, mirrorTiltX: 26, mirrorTiltY: 0 },
]

/** Trau i den FRONTALE monter-scenen (kunde-siden) — prosent av
 *  monter-frontal-bildet [x, y, b, h]. Hvert trau er en lager-flate som
 *  flislegges med ÉN vares utklipp etter lagermengde. Trace-t av Espen med
 *  ?dev=1 — ett per fysisk fronttrau (18 stk). Trau 9–11 er øvre hylle i
 *  midtseksjonen; trau 17–18 er øvre hylle i hhv. venstre og høyre seksjon.
 *  `scale` (valgfri, multiplikator, default 1) er en STATISK dev-verdi for
 *  flis-størrelsen i trauet — justeres kun ved å redigere denne fila direkte
 *  (det tidligere live dev-kalibreringspanelet er fjernet). Størrelse/vinkel
 *  som spilleren kan justere live ligger IKKE her: se `displayScale`/
 *  `displayRotation` på katalogvaren (industries.ts) og spillerens
 *  justeringspanel per trau-plassering (`TrauItem.sizeAdjust`/`skewAdjust`
 *  i counterLayout, MonterScene). */
export interface MonterTrau { id: string; rect: [number, number, number, number]; scale?: number }
export const MONTER_TRAU: MonterTrau[] = [
  { id: 'trau-1', rect: [2.8, 67.4, 12, 5.9] },
  { id: 'trau-2', rect: [12.2, 70.5, 7.7, 3.6] },
  { id: 'trau-3', rect: [15.3, 67.2, 7.8, 2.7] },
  { id: 'trau-4', rect: [20.6, 71.1, 8.3, 2.6] },
  { id: 'trau-5', rect: [23.2, 67, 7.8, 2.6] },
  { id: 'trau-6', rect: [37.7, 66.9, 7.4, 6.7] },
  { id: 'trau-7', rect: [46.4, 67.3, 6.6, 6.7] },
  { id: 'trau-8', rect: [55.6, 66.5, 5.4, 7.5] },
  { id: 'trau-9', rect: [37.9, 55.6, 7.7, 4.7] },
  { id: 'trau-10', rect: [46.6, 56.5, 6.6, 3.7] },
  { id: 'trau-11', rect: [55.3, 56.3, 5.8, 4.1] },
  { id: 'trau-12', rect: [72.7, 71, 5.5, 2.4] },
  { id: 'trau-13', rect: [81.4, 70.8, 5.3, 3.1] },
  { id: 'trau-14', rect: [70.2, 66.9, 5.2, 3.2] },
  { id: 'trau-15', rect: [77.9, 66.8, 5, 3.2] },
  { id: 'trau-16', rect: [87.7, 66.5, 6.6, 7.4] },
  { id: 'trau-17', rect: [9.3, 57.5, 25.4, 4.6] },
  { id: 'trau-18', rect: [65.4, 56.9, 24.6, 4.4] },
]

export function lokaleRent(d: District, l: Lokale): number {
  return Math.round((d.leieniva * l.rentFactor) / 100) * 100
}

export function getDistrict(id: string | undefined): District | undefined {
  return DISTRICTS.find(d => d.id === id)
}

export function getLokale(districtId: string | undefined, lokaleId: string | undefined): Lokale | undefined {
  if (!districtId || !lokaleId) return undefined
  return (LOKALER[districtId] ?? []).find(l => l.id === lokaleId)
}

/** Centroid av et polygon (prosentkoordinater) — brukes til pins og zoom-mål. */
export function polygonCentroid(poly: [number, number][]): [number, number] {
  let x = 0, y = 0
  for (const [px, py] of poly) { x += px; y += py }
  return [x / poly.length, y / poly.length]
}

/** Finn bydelen et lokale-id hører til (for pins på masterkartet). */
export function districtOfLokale(lokaleId: string | null): District | undefined {
  if (!lokaleId) return undefined
  for (const [districtId, lokaler] of Object.entries(LOKALER)) {
    if (lokaler.some(l => l.id === lokaleId)) return DISTRICTS.find(d => d.id === districtId)
  }
  return undefined
}
