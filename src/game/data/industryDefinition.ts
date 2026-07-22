// ─── AdVenture 3.0 — Bransjedefinisjon (BRANSJE-DEFINISJON) ──────────────────
//
// Samler ALT bransje-spesifikt ett sted: katalog, eksponeringsflater
// (styling = vindusutstilling, lager = disk-monterens trau), scenariepool,
// persona-budsjettmodell og svinnregel. Målet: en NY bransje skal kunne
// legges til som DATA + BILDER + SCENARIER — uten å røre motorene
// (InteriorView / MonterScene / scenario-pool-valget / personas / CLOSE_DAY).
// Se docs/BRANSJE_DEFINISJON.md for hva en ny bransje må levere og hva den
// ALDRI skal trenge å røre.
//
// KUN CAFE er reelt bygget ut og AKTIV i dag — getActiveIndustryDefinition()
// returnerer alltid CAFE, uavhengig av hvilken bransje spilleren faktisk
// valgte i StartupScreen (by-/interiør-/monter-bildene finnes uansett kun for
// kafé ennå — det er en eksisterende begrensning, ikke noe DENNE omleggingen
// endrer). KLESBUTIKK er en TOM/minimal STUB (DEL 3) som beviser at typen
// bærer en annen bransje, IKKE et ferdig bransje-2-innhold, og er bevisst
// IKKE registrert i INDUSTRY_DEFINITIONS (ikke aktiv).

import type { Industry, RolleDef } from '../types'
import { INDUSTRY_CATALOG, INDUSTRY_META, type IndustryCatalogItem } from './industries'
import { KLESBUTIKK_KATALOG } from './klesbutikkKatalog'
import {
  MONTER_TRAU, INTERIOR_MIRROR_TRAU, INTERIOR_MENU_BOARD, STOREFRONT_HOTSPOTS,
  KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG,
  type MonterTrau, type InteriorMirrorTrau,
} from '../../data/districts'
import { CAFE_SCENARIO_IDS } from '../sales/scenarios'
import { KLESBUTIKK_SCENARIO_IDS } from '../sales/klesbutikkScenarios'
import { CAFE_SPEND, FASHION_BUDGETS, type PersonaBudsjett } from './personas'
// Portabel scene-geometri (delt med eksperiment/autonom-sport, se
// docs/AUTONOM_PIPELINE.md §7). Re-eksporteres så bransje-kode kan importere
// `Hyllelinje` herfra på lik linje med de øvrige geometri-typene.
import type { Hyllelinje } from '../geometry/hyllelinje'
import { KLESBUTIKK_AKTIV } from './featureFlags'
export type { Hyllelinje }

/** Lager-flaten (disk-monter): trau-geometri + hvilket bilde de er kalibrert
 *  mot, pluss speil-sonene som viser SAMME lager i interiør-scenen
 *  (bakfra-vy). `trauCols` er en FUNKSJON (ikke et tall) — noen trau er brede
 *  nok til flere varer ved siden av hverandre (kafeens trau-17/18), de
 *  fleste rommer kun én. */
export interface LagerFlate {
  sceneImage: string
  trau: MonterTrau[]
  trauCols: (trauId: string) => number
  speil: {
    sceneImage: string
    trau: InteriorMirrorTrau[]
  }
}

/** Styling-flaten (vindusutstilling) — fasadens vindu. Samme redigeringsmotor
 *  for alle bransjer (WindowDisplay.tsx, katalogdrevet), men sonen den
 *  klipper mot er en bransje-referanse. */
export interface StylingFlate {
  zone: [number, number, number, number]
}

/** Ekstra eksponeringsflate utover styling/lager — for kafé: tavla
 *  (drikkemeny). `matches` avgjør hvilke katalog-/sortimentsvarer som havner
 *  på DENNE flaten (kafé: alt som IKKE er trau-vare = drikke). */
export interface EkstraFlate {
  id: string
  navn: string
  zone: [number, number, number, number]
  /** Tar imot enten en katalogvare ELLER et Product (begge har `trauVare?`)
   *  — kalleren avgjør om den sjekker katalogen eller det faktiske
   *  sortimentet, se InteriorView. */
  matches: (item: { trauVare?: boolean }) => boolean
}

/** Svinn-regel (DAGSSYKLUS, CLOSE_DAY) — HVORDAN usolgt lager håndteres ved
 *  stenging. 'ferskvare-daglig' er kafeens regel og den ENESTE som faktisk er
 *  implementert i dag (Product.ferskvare nullstilles hver kveld). Nye regler
 *  legges til i denne unionen ETTER HVERT som de faktisk implementeres i
 *  CLOSE_DAY (se GameContext.tsx) — 'sesong' er ren dokumentasjon av retningen
 *  (et fremtidig gradvis verditap over en sesong/kolleksjon for en klesbutikk,
 *  se docs/BRANSJE2_SESONG.md), IKKE en virkemåte som finnes ennå. */
export type SvinnRegel = 'ferskvare-daglig' | 'sesong'

/** Én linje i åpningssortimentet (docs/INNKJOP_LEVERING.md, DEL 1) —
 *  refererer en katalogvare (`catalogId`) og et antall som ligger FERDIG
 *  ANKOMMET på lager ved innflytting (kostnaden trekkes fra startkapitalen).
 *  Fra dag 2 gjelder normal bestilling med leveringstid. */
export interface OppstartsvareLinje {
  catalogId: string
  qty: number
}

/** Forsynings-/leveringstekst (docs/INNKJOP_LEVERING.md, DEL 2). Koden holder
 *  seg GENERISK (Bestilling/incomingOrders/leadTime/ankomstDag) — den
 *  bransje-SPESIFIKKE ordlyden bor her, så kafeen kan si «bakes ferske» i stedet
 *  for «leveres», og en klesbutikk kan si «bestilt mot sesong». UI leser disse
 *  i stedet for hardkodede strenger. `ankomstEtikett`/`klarMelding` er
 *  funksjoner (som trauCols/matches) — ikke serialiserbare ennå, men
 *  konsistent med resten av definisjonen. */
export interface ForsyningTekst {
  /** OpeningOrderOverlay: overskrift. */
  åpningsordreTittel: string
  /** OpeningOrderOverlay: løftet om når varene er klare (ingen ventetid dag 1). */
  åpningsordreLøfte: string
  /** OpeningOrderOverlay: bekreft-knappen. */
  åpningsordreKnapp: string
  /** Produkter-fanens «underveis»-seksjon: overskrift. */
  underveisTittel: string
  /** Produkter-fanens «underveis»-linje: etikett gitt ankomstdag. */
  ankomstEtikett: (dag: number) => string
  /** Morgenpille (OPEN_DAY) når varer er klare — gitt en ferdig formatert
   *  «antall × navn, …»-streng. */
  klarMelding: (linjer: string) => string
  /** Dagsoppgjørets framoverpekende utsolgt-hint. */
  utsolgtHint: string
}

/** Et punkt i PROSENT av scenebildet (interiøret). */
export interface GulvPunkt { x: number; y: number }

/** GULVPLANET (perspektivmodell) møbler plasseres på. Et trapes definert av 4
 *  hjørner (i % av scenebildet): fremkant venstre/høyre (nærmest kamera) og
 *  bakkant venstre/høyre (lengst bak). Et møbels fotpunkt klemmes inn i trapeset.
 *  `scaleFront`/`scaleBack` beskriver hvor bredt trapeset er foran (v=0) vs. bak
 *  (v=1); møbel-sprite-bredden utledes av møbelets `fotavtrykk.b` × trapesbredden
 *  ved møbelets dybde (se klesbutikkFixtures.ts). Kalibreres med ?dev=1-gulvplan-
 *  traceren i KlesbutikkStillas og låses her. */
export interface Gulvplan {
  hjørner: {
    fremV: GulvPunkt
    fremH: GulvPunkt
    bakV: GulvPunkt
    bakH: GulvPunkt
  }
  scaleFront: number
  scaleBack: number
}

/** VAREPLASS — en fast, kalibrert plass i det BAKTE interiøret (kafé-modellen)
 *  der elevene styler ETT element, som monter-trauene. Generaliserer det gamle
 *  vegghengpunktet til tre typer. `x`/`y` = % av scenebildet (elementets anker),
 *  `scale` = bredde som brøk av scenebildet. `type`:
 *   'heng'  — hengeplagg (front), topp-ankret ved punktet (gullstenger på vegg).
 *   'brett' — brettet stabel, bunn-ankret på flaten (hyller/bord).
 *   'dukke' — påkledd dukke, bunn-ankret over den BAKTE dukka (se `dukketype`).
 *  Usynlig i spillet (elementet dekker plassen). Kalibreres med ?dev=1-
 *  vareplass-traceren i KlesbutikkStillas og låses her. */
export type PlassType = 'heng' | 'brett' | 'dukke'
export type PlassDukketype = 'dame' | 'herre' | 'barn'
export type HengVariant = 'front' | 'profil'
export interface Vareplass {
  id: string
  type: PlassType
  x: number
  y: number
  scale: number
  /** kun type='dukke': dukketypen den bakte dukka har (matchende snap-filter). */
  dukketype?: PlassDukketype
  /** kun type='heng': hvilken plagg-variant plassen tar. 'front' (default) tar
   *  front-plagg, 'profil' tar profil-plagg (plagg med profil-sprite). */
  variant?: HengVariant
  /** Valgfri transform på det snappede plagget (grader, default 0). Ankeret
   *  (transform-origin) er bunn for brett/dukke, senter for heng. Typisk bruk:
   *  vri/skjære brett-stabler så de følger perspektivet på et bord. */
  rot?: number
  skewX?: number
  skewY?: number
}

export interface IndustryDefinition {
  id: Industry
  navn: string
  emoji: string
  beskrivelse: string
  startingMoney: number
  katalog: IndustryCatalogItem[]
  /** Bransje-spesifikk forsynings-/leveringstekst (DEL 2). */
  forsyning: ForsyningTekst
  /** Åpningssortiment (DEL 1) — et rimelig startlager som ligger ferdig
   *  ankommet ved innflytting (RENT_LOCATION), trukket fra startkapitalen.
   *  Tom liste = ingen åpningsleveranse. */
  oppstartssortiment: OppstartsvareLinje[]
  flater: {
    styling: StylingFlate
    lager: LagerFlate
  }
  ekstraFlater: EkstraFlate[]
  /** Scenario-id-er (se sales/scenarios.ts sin SalesScenario.id) denne
   *  bransjen trekker kunder fra — slå opp faktiske objekter med
   *  scenariosForIndustry(). */
  scenariePool: string[]
  personaBudsjett: PersonaBudsjett
  svinnRegel: SvinnRegel
  /** ORGANISASJONSDESIGN (docs/BEMANNING.md): bransjens ROLLEPALETT. Eleven
   *  drar rollekort inn i org-kartet for å opprette funksjonene selv.
   *  Kjerneroller (Salg/Markedsføring/Økonomi) + bransjeroller (kafé:
   *  Innkjøpsansvarlig, HMS-ansvarlig). Kjerne-salgsrollens id er 'selger' i
   *  alle bransjer (bakgrunnssalgs-kapasiteten nøkler på den). */
  roller: RolleDef[]
  /** Gulvplanet (perspektivmodell) møbler plasseres fritt på — kun klesbutikk
   *  i dag (kafeen bruker trau-monteren). */
  gulvplan?: Gulvplan
  /** Faste, kalibrerte vareplasser i det bakte interiøret (heng/brett/dukke) der
   *  elevene styler — kun klesbutikk. Kalibreres med ?dev=1-vareplass-traceren. */
  vareplasser?: Vareplass[]
  /** Valgfrie hyllelinjer (perspektiv-interpolert skala langs en hyllekant) fra
   *  den portable `geometry/hyllelinje.ts`-modulen (docs/AUTONOM_PIPELINE.md §6–7).
   *  Klesbutikken bruker i dag DISKRETE `vareplasser` (+ DOM-anker-snap), ikke
   *  linjer — feltet er del av modul-adopsjonen og står klart for evt. senere
   *  linje-basert kalibrering. */
  hyllelinjer?: Hyllelinje[]
}

export const CAFE: IndustryDefinition = {
  id: 'cafe',
  navn: INDUSTRY_META.cafe.name,
  emoji: INDUSTRY_META.cafe.emoji,
  beskrivelse: INDUSTRY_META.cafe.description,
  startingMoney: INDUSTRY_META.cafe.startingMoney,
  katalog: INDUSTRY_CATALOG.cafe,
  // Kafé-ordlyd (DEL 2): bakeriet BAKER ferske varer over natten — ikke
  // «leveres». Åpningsbestillingen er klar ved åpning (ingen ventetid).
  forsyning: {
    åpningsordreTittel: '🥐 Åpningsbestilling',
    åpningsordreLøfte: 'Varene bakes ferske til åpningsdagen og står klare når du åpner butikken.',
    åpningsordreKnapp: 'Bak til åpningsdagen',
    underveisTittel: '🥐 BAKES TIL I MORGEN',
    ankomstEtikett: dag => `Ferskt dag ${dag}`,
    klarMelding: linjer => `🥐 Ferske varer klare: ${linjer}`,
    utsolgtHint: 'Du gikk tom — tapte salg. Bestill i kveld, så er varene ferske i disken i morgen tidlig.',
  },
  // Åpningssortiment — nå FORSLAGET som forhåndsutfyller elevens
  // åpningsbestilling (OpeningOrderOverlay), ikke lenger et automatisk seed.
  // Eleven kan justere/fjerne/utvide. Blanding av drikke (kaffe, ikke
  // ferskvare — holder over natten) og trau-ferskvarer (croissant/kanelbolle/
  // rundstykke — svinner ved stenging), så både salg, svinn og etterfylling
  // kan øves fra dag 1. Grovt rundstykke bevisst < 40 så Storbestillingen
  // (Fredrik, 40 stk) demonstrerer ærlig delleveranse mot faktisk lager. Total
  // ~1 100 kr av 200 000 startkapital (REKALIBRERING pkt. 35).
  oppstartssortiment: [
    { catalogId: 'coffee', qty: 40 },
    { catalogId: 'croissant', qty: 20 },
    { catalogId: 'kanelbolle', qty: 20 },
    { catalogId: 'rundstykke-grovt', qty: 30 },
  ],
  flater: {
    styling: { zone: STOREFRONT_HOTSPOTS.vindu },
    lager: {
      sceneImage: '/assets/raw/monter-frontal.png',
      trau: MONTER_TRAU,
      // Samme regel som den tidligere frittstående trauCols() i MonterScene
      // (kun trau-17/18 — kafeens to brede hyllepartier — rommer 4 ved siden
      // av hverandre, resten rommer 1).
      trauCols: trauId => (trauId === 'trau-17' || trauId === 'trau-18' ? 4 : 1),
      speil: {
        sceneImage: '/assets/raw/interior-kasse.png',
        trau: INTERIOR_MIRROR_TRAU,
      },
    },
  },
  ekstraFlater: [
    { id: 'tavla', navn: 'Drikkemeny', zone: INTERIOR_MENU_BOARD, matches: item => item.trauVare === false },
  ],
  scenariePool: CAFE_SCENARIO_IDS,
  personaBudsjett: { kind: 'besok', table: CAFE_SPEND },
  svinnRegel: 'ferskvare-daglig',
  roller: [
    { id: 'selger',       funksjon: 'Salg',          tittel: 'Barista/butikkmedarbeider', emoji: '🛍️', farge: '#00d4aa', vaktrolle: true,  maanedseffekt: null,            kjerne: true },
    { id: 'markedsforer', funksjon: 'Markedsføring', tittel: 'Markedsfører',              emoji: '📢', farge: '#38bdf8', vaktrolle: false, maanedseffekt: 'markedsforing', kjerne: true },
    { id: 'okonom',       funksjon: 'Økonomi',       tittel: 'Økonom',                    emoji: '📊', farge: '#f59e0b', vaktrolle: false, maanedseffekt: 'okonomi',       kjerne: true },
    { id: 'innkjop',      funksjon: 'Innkjøp',       tittel: 'Innkjøpsansvarlig',         emoji: '📦', farge: '#a78bfa', vaktrolle: false, maanedseffekt: null,            kjerne: false },
    { id: 'hms',          funksjon: 'HMS',           tittel: 'HMS-ansvarlig',             emoji: '🦺', farge: '#fb7185', vaktrolle: false, maanedseffekt: null,            kjerne: false },
  ],
}

/** Bransje 2 (DEL 3) — TOM/MINIMAL STUB. Beviser at IndustryDefinition kan
 *  bære en ANNEN bransje (annen katalog, annen budsjettmodell, ingen
 *  lager-geometri) uten at typen må endres. IKKE registrert i
 *  INDUSTRY_DEFINITIONS under — altså IKKE aktiv: getActiveIndustryDefinition
 *  returnerer fortsatt CAFE selv om spilleren har valgt 'fashion'. Se
 *  docs/BRANSJE_DEFINISJON.md for hva som gjenstår før den kan bli reell. */
export const KLESBUTIKK: IndustryDefinition = {
  id: 'fashion',
  navn: INDUSTRY_META.fashion.name,
  emoji: INDUSTRY_META.fashion.emoji,
  beskrivelse: INDUSTRY_META.fashion.description,
  startingMoney: INDUSTRY_META.fashion.startingMoney,
  // Leverandør-/merkekatalog (docs/BRANSJE2_LEVERANDORER.md): plagg × 4 merker
  // = katalogvarer med ulik costPrice per merke (klesbutikkKatalog.ts). Erstatter
  // det parkerte tier-systemet — merkeposisjon er kvalitetssignalet.
  katalog: KLESBUTIKK_KATALOG,
  // Klesbutikk-ordlyd (stub, DEL 2): plagg BESTILLES mot sesong (docs/
  // BRANSJE2_SESONG.md), ikke bakes. Nøytral tekst inntil bransje 2 bygges ut.
  forsyning: {
    åpningsordreTittel: '👗 Åpningsbestilling',
    åpningsordreLøfte: 'Plaggene bestilles mot sesongen og henger klare i butikken til åpningsdagen.',
    åpningsordreKnapp: 'Bestill til åpningsdagen',
    underveisTittel: '📦 BESTILT MOT SESONG',
    ankomstEtikett: dag => `Klart dag ${dag}`,
    klarMelding: linjer => `📦 Nye plagg i butikken: ${linjer}`,
    utsolgtHint: 'Du gikk tom — tapte salg. Bestill mer av sesongens plagg som selger.',
  },
  // Ingen åpningssortiment definert for stubben ennå (kommer med
  // leverandørkatalogen — en ekte klesbutikk ville fått sitt startlager her).
  oppstartssortiment: [],
  flater: {
    // Vindusutstillingen (mot gata) — Espen-trace-t sone på klesbutikk-fasaden
    // (KLESBUTIKK_VINDU i districts.ts). Styling-flate med fri komposisjon der
    // sprites står oppreist (jf. WindowDisplay).
    styling: { zone: KLESBUTIKK_VINDU },
    lager: {
      // Interiør-scenen (klesbutikk-interior.jpg). Butikkveggen er IKKE et trau:
      // møbler plasseres FRITT (bunn-ankret) i KLESBUTIKK_BUTIKKVEGG-sonen —
      // state.klesbutikkFixtureLayout, redigert i KlesbutikkStillas. Denne ene
      // «trau»-oppføringen beholdes kun som sonens geometri-referanse for typen;
      // trauCols/skew brukes ikke for klesbutikk. Speilingen gjenbruker samme
      // interiørbilde (ingen egen bakfra-vy tegnet ennå).
      sceneImage: '/assets/raw/klesbutikk-interior.jpg',
      trau: [{ id: 'butikkvegg', rect: KLESBUTIKK_BUTIKKVEGG }],
      trauCols: () => 1,
      speil: { sceneImage: '/assets/raw/klesbutikk-interior.jpg', trau: [] },
    },
  },
  ekstraFlater: [],
  // Klesbutikkens salgsscenarier (aktiveres bak KLESBUTIKK_AKTIV). KANON =
  // KLESBUTIKK_SCENARIOS (jobb-grenens sett: angrekjopet/jobbintervjuet/storrelsen/
  // gaven/proverommet/mobilbildet — med avsluttesVedKasse + spriteCal), Espen-valgt
  // 2026-07-22. Main sitt FASHION_SCENARIOS er koblet UT av poolen (lever fortsatt
  // i sales/scenarios.ts, slettes etter Espens Chrome-dom). IKKE kafeens pool.
  scenariePool: KLESBUTIKK_SCENARIO_IDS,
  personaBudsjett: { kind: 'kategori', table: FASHION_BUDGETS, step: 100 },
  svinnRegel: 'sesong',
  roller: [
    { id: 'selger',       funksjon: 'Salg',          tittel: 'Butikkmedarbeider',   emoji: '🛍️', farge: '#00d4aa', vaktrolle: true,  maanedseffekt: null,            kjerne: true },
    { id: 'markedsforer', funksjon: 'Markedsføring', tittel: 'Markedsfører',        emoji: '📢', farge: '#38bdf8', vaktrolle: false, maanedseffekt: 'markedsforing', kjerne: true },
    { id: 'okonom',       funksjon: 'Økonomi',       tittel: 'Økonom',              emoji: '📊', farge: '#f59e0b', vaktrolle: false, maanedseffekt: 'okonomi',       kjerne: true },
    { id: 'innkjop',      funksjon: 'Innkjøp',       tittel: 'Innkjøpsansvarlig',   emoji: '📦', farge: '#a78bfa', vaktrolle: false, maanedseffekt: null,            kjerne: false },
    { id: 'visuell',      funksjon: 'Visuell',       tittel: 'Visuell merchandiser', emoji: '🪟', farge: '#f472b6', vaktrolle: false, maanedseffekt: null,           kjerne: false },
  ],
  // Gulvplan — GROVE default-hjørner (% av klesbutikk-interior.jpg): tregulvet
  // som trapes, fremkant nederst (nær kamera), bakkant der gulvet møter veggene.
  // IKKE Espen-kalibrert ennå: dra hjørnene + juster front/bak-skala med ?dev=1-
  // gulvplan-traceren i KlesbutikkStillas og lim det loggede objektet inn HIT.
  gulvplan: {
    hjørner: {
      fremV: { x: 8, y: 98 }, fremH: { x: 98, y: 92 },
      bakV: { x: 40, y: 66 }, bakH: { x: 82, y: 63 },
    },
    scaleFront: 0.42, scaleBack: 0.24,
  },
  // Vareplasser (% av klesbutikk-interior-mobler.png) — Espen-KALIBRERT v2
  // (43 plasser: heng/brett/dukke + profil-heng, låst 2026-07). Rediger videre
  // med ?dev=1-vareplass-traceren («Logg array» / «Kopier array» → lim inn HIT).
  vareplasser: [
    { id: 'heng-1', type: 'heng', x: 44.9, y: 41.5, scale: 0.05 },
    { id: 'heng-2', type: 'heng', x: 46.6, y: 41.5, scale: 0.05 },
    { id: 'heng-3', type: 'heng', x: 48.1, y: 41.4, scale: 0.05 },
    { id: 'heng-4', type: 'heng', x: 50.3, y: 41.5, scale: 0.05 },
    { id: 'heng-5', type: 'heng', x: 55.5, y: 43.9, scale: 0.05 },
    { id: 'heng-6', type: 'heng', x: 58, y: 43.9, scale: 0.05 },
    { id: 'heng-7', type: 'heng', x: 59.9, y: 44.1, scale: 0.05 },
    { id: 'heng-8', type: 'heng', x: 61.6, y: 44.1, scale: 0.05 },
    { id: 'heng-9', type: 'heng', x: 67.2, y: 42.2, scale: 0.075 },
    { id: 'dukke-1', type: 'dukke', x: 41.2, y: 66.9, scale: 0.04, dukketype: 'dame' },
    { id: 'dukke-2', type: 'dukke', x: 80, y: 86.1, scale: 0.085, dukketype: 'dame' },
    { id: 'brett-b401', type: 'brett', x: 55.1, y: 84, scale: 0.055 },
    { id: 'brett-cbf2', type: 'brett', x: 62.2, y: 83.9, scale: 0.055 },
    { id: 'brett-0684', type: 'brett', x: 48, y: 83.9, scale: 0.055 },
    { id: 'brett-78a5', type: 'brett', x: 44.9, y: 60.1, scale: 0.025 },
    { id: 'brett-96ab', type: 'brett', x: 48.4, y: 60.2, scale: 0.025 },
    { id: 'brett-9701', type: 'brett', x: 92.1, y: 61.2, scale: 0.03 },
    { id: 'brett-eaf2', type: 'brett', x: 89, y: 61.2, scale: 0.035 },
    { id: 'brett-125f', type: 'brett', x: 67.9, y: 73.7, scale: 0.03 },
    { id: 'brett-e7b2', type: 'brett', x: 84.9, y: 59.9, scale: 0.025 },
    { id: 'brett-db53', type: 'brett', x: 92.4, y: 67.3, scale: 0.035, rot: 0.5, skewX: 2.5 },
    { id: 'brett-ae53', type: 'brett', x: 89, y: 66.7, scale: 0.035 },
    { id: 'heng-52ef', type: 'heng', x: 55.9, y: 32.8, scale: 0.045 },
    { id: 'heng-6bc9', type: 'heng', x: 60.3, y: 32.6, scale: 0.045 },
    { id: 'brett-9525', type: 'brett', x: 35, y: 100, scale: 0.1 },
    { id: 'brett-6489', type: 'brett', x: 24.4, y: 100, scale: 0.095 },
    { id: 'brett-7d98', type: 'brett', x: 76.9, y: 100, scale: 0.1 },
    { id: 'brett-bee7', type: 'brett', x: 88.3, y: 100, scale: 0.1 },
    { id: 'heng-aea1', type: 'heng', x: 68.2, y: 42.1, scale: 0.08 },
    { id: 'heng-13bd', type: 'heng', x: 69.1, y: 41.7, scale: 0.085 },
    { id: 'heng-p-d8d3', type: 'heng', x: 83.5, y: 41.9, scale: 0.03, variant: 'profil' },
    { id: 'heng-p-3f3c', type: 'heng', x: 84.8, y: 42, scale: 0.035, variant: 'profil' },
    { id: 'heng-p-0dd3', type: 'heng', x: 85.7, y: 41.8, scale: 0.035, variant: 'profil' },
    { id: 'heng-p-3176', type: 'heng', x: 87, y: 41.8, scale: 0.035, variant: 'profil' },
    { id: 'heng-p-c623', type: 'heng', x: 88.4, y: 41.8, scale: 0.035, variant: 'profil' },
    { id: 'brett-3aa9', type: 'brett', x: 45.8, y: 100, scale: 0.1 },
    { id: 'brett-e10b', type: 'brett', x: 56.8, y: 100, scale: 0.1 },
    { id: 'brett-bcdc', type: 'brett', x: 66.7, y: 99.7, scale: 0.1 },
    { id: 'heng-p-1bd7', type: 'heng', x: 52.7, y: 53.6, scale: 0.05, variant: 'profil' },
    { id: 'heng-p-f01b', type: 'heng', x: 54.5, y: 53.6, scale: 0.05, variant: 'profil' },
    { id: 'heng-p-9aaf', type: 'heng', x: 56.2, y: 53.8, scale: 0.05, variant: 'profil' },
    { id: 'heng-p-6010', type: 'heng', x: 51, y: 53.4, scale: 0.05, variant: 'profil' },
  ],
}

/** Registeret over bransjer som FAKTISK har en definisjon. `cafe` er alltid med;
 *  `fashion` (KLESBUTIKK) registreres KUN bak `KLESBUTIKK_AKTIV` (skall-synk
 *  2026-07-22). Med flagget av faller getActiveIndustryDefinition('fashion')
 *  trygt til CAFE (motorene rendrer kafé-geometri), akkurat som før. */
const INDUSTRY_DEFINITIONS: Partial<Record<Industry, IndustryDefinition>> = {
  cafe: CAFE,
  ...(KLESBUTIKK_AKTIV ? { fashion: KLESBUTIKK } : {}),
}

/** Slår opp definisjonen for EN GITT bransje — undefined hvis bransjen ikke
 *  har en (fashion/tech/sports i dag). Brukes der oppførselen FAKTISK varierer
 *  med hvilken bransje spilleren valgte (personas.ts sin budsjettmodell via
 *  DashboardOverlay) — kalleren faller tilbake til den opprinnelige,
 *  bransje-uavhengige logikken når resultatet er undefined. */
export function getIndustryDefinitionFor(industry: Industry): IndustryDefinition | undefined {
  return INDUSTRY_DEFINITIONS[industry]
}

/** Definisjonen city-/interiør-/monter-/kassevy-motorene rendrer mot for den
 *  AKTIVE bransjen (`state.industry`). Leser registeret over; en bransje uten
 *  registrert definisjon (tech/sports, eller 'fashion' med KLESBUTIKK_AKTIV=false)
 *  faller trygt til CAFE — kaféen er byte-identisk uansett.
 *
 *  `industry` DEFAULTER til 'cafe' så eldre, ikke-oppdaterte kallesteder beholder
 *  nøyaktig gammel oppførsel. Motorene sender inn `state.industry` for å bytte
 *  geometri når klesbutikken er aktiv. Brukes av InteriorView, MonterScene,
 *  WindowDisplay, kassevyen og GameContext sin CLOSE_DAY — IKKE av personas.ts
 *  (som bruker getIndustryDefinitionFor for den bransje-SPESIFIKKE budsjettmodellen). */
export function getActiveIndustryDefinition(industry: Industry = 'cafe'): IndustryDefinition {
  return INDUSTRY_DEFINITIONS[industry] ?? CAFE
}
