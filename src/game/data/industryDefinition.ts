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
 *  CLOSE_DAY (se GameContext.tsx) — 'sesong/kolleksjon' er ren dokumentasjon
 *  av retningen (et fremtidig gradvis verditap over en sesong for en
 *  klesbutikk), IKKE en virkemåte som finnes ennå. */
export type SvinnRegel = 'ferskvare-daglig' | 'sesong/kolleksjon'

/** Én linje i åpningssortimentet (docs/INNKJOP_LEVERING.md, DEL 1) —
 *  refererer en katalogvare (`catalogId`) og et antall som ligger FERDIG
 *  ANKOMMET på lager ved innflytting (kostnaden trekkes fra startkapitalen).
 *  Fra dag 2 gjelder normal bestilling med leveringstid. */
export interface OppstartsvareLinje {
  catalogId: string
  qty: number
}

export interface IndustryDefinition {
  id: Industry
  navn: string
  emoji: string
  beskrivelse: string
  startingMoney: number
  katalog: IndustryCatalogItem[]
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
}

export const CAFE: IndustryDefinition = {
  id: 'cafe',
  navn: INDUSTRY_META.cafe.name,
  emoji: INDUSTRY_META.cafe.emoji,
  beskrivelse: INDUSTRY_META.cafe.description,
  startingMoney: INDUSTRY_META.cafe.startingMoney,
  katalog: INDUSTRY_CATALOG.cafe,
  // Åpningssortiment (DEL 1) — kafeens rimelige startlager, ferdig ankommet
  // ved innflytting. Blanding av drikke (kaffe, ikke ferskvare — holder over
  // natten) og trau-ferskvarer (croissant/kanelbolle/rundstykke — svinner ved
  // stenging), så både salg, svinn og etterfylling kan øves fra dag 1. Grovt
  // rundstykke bevisst < 40 så Storbestillingen (Fredrik, 40 stk) demonstrerer
  // ærlig delleveranse mot faktisk lager. Total innkjøpskostnad ~1 100 kr av
  // 150 000 startkapital.
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
  katalog: INDUSTRY_CATALOG.fashion,
  // Ingen åpningssortiment definert for stubben ennå (en ekte klesbutikk ville
  // fått sitt eget startlager her).
  oppstartssortiment: [],
  flater: {
    // Samme fysiske vindu som kafeen (én storefront-fasade i dag) — en ekte
    // bransje 2 ville sannsynligvis fått egne fasadebilder/soner her.
    styling: { zone: STOREFRONT_HOTSPOTS.vindu },
    lager: {
      // Ingen klesbutikk-fotografert monter finnes ennå — tom geometri,
      // ikke en gjettet plassholder-sone.
      sceneImage: '',
      trau: [],
      trauCols: () => 1,
      speil: { sceneImage: '', trau: [] },
    },
  },
  ekstraFlater: [],
  // Ingen klesbutikk-scenarier skrevet ennå (se sales/scenarios.ts) — tom
  // pool, IKKE kafeens.
  scenariePool: [],
  personaBudsjett: { kind: 'kategori', table: FASHION_BUDGETS, step: 100 },
  svinnRegel: 'sesong/kolleksjon',
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
