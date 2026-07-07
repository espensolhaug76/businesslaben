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

import type { Industry } from '../types'
import { INDUSTRY_CATALOG, INDUSTRY_META, type IndustryCatalogItem } from './industries'
import {
  MONTER_TRAU, INTERIOR_MIRROR_TRAU, INTERIOR_MENU_BOARD, STOREFRONT_HOTSPOTS,
  KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG,
  type MonterTrau, type InteriorMirrorTrau,
} from '../../data/districts'
import { CAFE_SCENARIO_IDS } from '../sales/scenarios'
import { CAFE_SPEND, FASHION_BUDGETS, type PersonaBudsjett } from './personas'

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
 *  bakkant venstre/høyre (lengst bak). Et møbels fotpunkt klemmes inn i trapeset,
 *  og skalaen interpoleres lineært av dybden: `scaleFront` helt foran (v=0) →
 *  `scaleBack` helt bak (v=1). Skala = multiplikator på møbelets `baseWFrac`
 *  (rendret bredde-brøk = baseWFrac × skala). Kalibreres med ?dev=1-gulvplan-
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

/** VEGGHENGPUNKT — et fast punkt på butikkveggen der ett HENG-plagg (front-
 *  variant) kan snappes rett på (uten møbel). `x`/`y` er % av scenebildet
 *  (plaggets øvre anker), `scale` er multiplikator på plaggets grunnbredde.
 *  Usynlig i spillet (plagget dekker opphenget). Kalibreres med ?dev=1-
 *  veggpunkt-traceren i KlesbutikkStillas og låses her. */
export interface Vegghengpunkt {
  id: string
  x: number
  y: number
  scale: number
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
  /** Gulvplanet (perspektivmodell) møbler plasseres fritt på — kun klesbutikk
   *  i dag (kafeen bruker trau-monteren). */
  gulvplan?: Gulvplan
  /** Faste vegghengpunkter på butikkveggen der heng-plagg snappes rett på
   *  (uten møbel) — kun klesbutikk. Kalibreres med ?dev=1-veggpunkt-traceren. */
  vegghengpunkter?: Vegghengpunkt[]
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
  // ~1 100 kr av 150 000 startkapital.
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
  // Katalogen er TOM med vilje: klesbutikkens sortiment kommer fra en
  // leverandør-/merkekatalog (docs/BRANSJE2_LEVERANDORER.md) som ikke er
  // bygget ennå — IKKE gjenbruk av den gamle fashion-tier-katalogen.
  katalog: [],
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
  // Ingen klesbutikk-scenarier skrevet ennå (se sales/scenarios.ts) — tom
  // pool, IKKE kafeens.
  scenariePool: [],
  personaBudsjett: { kind: 'kategori', table: FASHION_BUDGETS, step: 100 },
  svinnRegel: 'sesong',
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
  // Vegghengpunkter — GROVE default-rekke (% av klesbutikk-interior.jpg): en rad
  // opphengspunkter langs bakveggen. IKKE Espen-kalibrert: klikk/dra/±-skalér med
  // ?dev=1-veggpunkt-traceren i KlesbutikkStillas, «Logg array» og lim inn HIT.
  vegghengpunkter: [
    { id: 'vh1', x: 30, y: 30, scale: 0.12 },
    { id: 'vh2', x: 42, y: 30, scale: 0.12 },
    { id: 'vh3', x: 54, y: 30, scale: 0.12 },
    { id: 'vh4', x: 66, y: 30, scale: 0.12 },
  ],
}

/** Registeret over bransjer som FAKTISK har en definisjon. Bevisst kun
 *  { cafe: CAFE } — KLESBUTIKK er skrevet (DEL 3) men ikke registrert, se
 *  filkommentaren øverst. */
const INDUSTRY_DEFINITIONS: Partial<Record<Industry, IndustryDefinition>> = {
  cafe: CAFE,
}

/** Slår opp definisjonen for EN GITT bransje — undefined hvis bransjen ikke
 *  har en (fashion/tech/sports i dag). Brukes der oppførselen FAKTISK varierer
 *  med hvilken bransje spilleren valgte (personas.ts sin budsjettmodell via
 *  DashboardOverlay) — kalleren faller tilbake til den opprinnelige,
 *  bransje-uavhengige logikken når resultatet er undefined. */
export function getIndustryDefinitionFor(industry: Industry): IndustryDefinition | undefined {
  return INDUSTRY_DEFINITIONS[industry]
}

/** Den ENE bransjen city-/interiør-/monter-motorene rendrer mot i dag —
 *  ALLTID CAFE (se filkommentaren øverst: dette er en eksisterende
 *  ett-bransje-begrensning i kunst/geometri, ikke noe denne omleggingen
 *  innfører). Brukes av InteriorView, MonterScene og GameContext sin
 *  CLOSE_DAY — IKKE av personas.ts (som trenger den bransje-SPESIFIKKE
 *  oppslaget over for å bevare fashion/tech/sports sin eksisterende,
 *  forskjellige oppførsel). */
export function getActiveIndustryDefinition(): IndustryDefinition {
  return CAFE
}
