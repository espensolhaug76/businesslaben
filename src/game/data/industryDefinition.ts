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

/** SPORT (eksperiment/autonom-sport) — VAREPLASS-modell for BAKT interiør.
 *  Samme mønster som klesbutikk-grenens `vareplasser`: scenebildet er en
 *  ferdig møblert, TOM sportsbutikk (sport-interior-mobler.png), og hver
 *  vareplass er et FAST, kalibrert punkt (% av scenebildet) der én sport-vare
 *  vises oppå bildet. Kalibreres i /dev/sport?dev=1 (VareplassTracer) og låses
 *  i SPORT.vareplasser under. */
export type PlassType = 'sko' | 'heng' | 'brett' | 'utstyr'
export interface Vareplass {
  id: string
  type: PlassType
  /** Ankerpunkt i % av scenebildets bredde/høyde. */
  x: number
  y: number
  /** Elementets bredde som BRØK av scenebildet (0–1); høyde skaleres proporsjonalt. */
  scale: number
  /** Sport-vare-id (sprite i /assets/raw/sport/) som står på denne plassen. */
  vare?: string
  /** Valgfri rotasjon i grader på det plasserte elementet. */
  rot?: number
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
  /** SPORT (eksperiment/autonom-sport) — faste, kalibrerte vareplasser i det
   *  bakte interiøret. Valgfritt: kun bransjer med «bakt interiør»-modellen
   *  (sport) bruker det; kafeen bruker flater.lager (trau) i stedet. */
  vareplasser?: Vareplass[]
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
  katalog: INDUSTRY_CATALOG.fashion,
  // Klesbutikk-ordlyd (stub, DEL 2): plagg BESTILLES mot sesong, ikke bakes.
  // Nøytral/generisk tekst inntil bransje 2 bygges ut.
  forsyning: {
    åpningsordreTittel: '👗 Åpningsbestilling',
    åpningsordreLøfte: 'Plaggene henger klare i butikken til åpningsdagen.',
    åpningsordreKnapp: 'Bestill til åpningsdagen',
    underveisTittel: '📦 BESTILT',
    ankomstEtikett: dag => `Klart dag ${dag}`,
    klarMelding: linjer => `📦 Nye varer i hyllene: ${linjer}`,
    utsolgtHint: 'Du gikk tom — tapte salg. Bestill mer av det som selger.',
  },
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
  roller: [
    { id: 'selger',       funksjon: 'Salg',          tittel: 'Butikkmedarbeider',   emoji: '🛍️', farge: '#00d4aa', vaktrolle: true,  maanedseffekt: null,            kjerne: true },
    { id: 'markedsforer', funksjon: 'Markedsføring', tittel: 'Markedsfører',        emoji: '📢', farge: '#38bdf8', vaktrolle: false, maanedseffekt: 'markedsforing', kjerne: true },
    { id: 'okonom',       funksjon: 'Økonomi',       tittel: 'Økonom',              emoji: '📊', farge: '#f59e0b', vaktrolle: false, maanedseffekt: 'okonomi',       kjerne: true },
    { id: 'innkjop',      funksjon: 'Innkjøp',       tittel: 'Innkjøpsansvarlig',   emoji: '📦', farge: '#a78bfa', vaktrolle: false, maanedseffekt: null,            kjerne: false },
    { id: 'visuell',      funksjon: 'Visuell',       tittel: 'Visuell merchandiser', emoji: '🪟', farge: '#f472b6', vaktrolle: false, maanedseffekt: null,           kjerne: false },
  ],
}

/** Bransje: SPORTSBUTIKK (eksperiment/autonom-sport). Bygget helt autonomt:
 *  NB-genererte bilder (fasade + bakt interiør + 4 produktark → 26 sprites),
 *  full katalog med varegrupper/priser, og FASTE kalibrerte `vareplasser` i
 *  det bakte interiøret (kalibrert i /dev/sport?dev=1). Som KLESBUTIKK er den
 *  IKKE registrert i INDUSTRY_DEFINITIONS — hovedmotorene (InteriorView/
 *  MonterScene) rendrer fortsatt kun kafeen; sportsbutikken vises via sitt
 *  eget stillas (/dev/sport, SportStillas.tsx). Scenarier er BEVISST utenfor
 *  scope her (tom scenariePool) — kun katalog + butikk. */
export const SPORT: IndustryDefinition = {
  id: 'sports',
  navn: INDUSTRY_META.sports.name,
  emoji: INDUSTRY_META.sports.emoji,
  beskrivelse: INDUSTRY_META.sports.description,
  startingMoney: INDUSTRY_META.sports.startingMoney,
  katalog: INDUSTRY_CATALOG.sports,
  forsyning: {
    åpningsordreTittel: '⚽ Åpningsbestilling',
    åpningsordreLøfte: 'Varene står klare i hyllene til åpningsdagen.',
    åpningsordreKnapp: 'Bestill til åpningsdagen',
    underveisTittel: '📦 BESTILT',
    ankomstEtikett: dag => `Klart dag ${dag}`,
    klarMelding: linjer => `📦 Nye varer i hyllene: ${linjer}`,
    utsolgtHint: 'Du gikk tom — tapte salg. Bestill mer av det som selger.',
  },
  oppstartssortiment: [],
  flater: {
    styling: { zone: STOREFRONT_HOTSPOTS.vindu },
    lager: {
      // Sportsbutikken bruker vareplass-modellen (bakt interiør), ikke
      // disk-monterens trau — tom trau-geometri, scenebildet er kun referanse.
      sceneImage: '/assets/raw/sport-interior-mobler.png',
      trau: [],
      trauCols: () => 1,
      speil: { sceneImage: '', trau: [] },
    },
  },
  ekstraFlater: [],
  scenariePool: [],
  personaBudsjett: { kind: 'kategori', table: FASHION_BUDGETS, step: 100 },
  svinnRegel: 'sesong/kolleksjon',
  roller: [
    { id: 'selger',       funksjon: 'Salg',          tittel: 'Butikkmedarbeider',   emoji: '🛍️', farge: '#00d4aa', vaktrolle: true,  maanedseffekt: null,            kjerne: true },
    { id: 'markedsforer', funksjon: 'Markedsføring', tittel: 'Markedsfører',        emoji: '📢', farge: '#38bdf8', vaktrolle: false, maanedseffekt: 'markedsforing', kjerne: true },
    { id: 'okonom',       funksjon: 'Økonomi',       tittel: 'Økonom',              emoji: '📊', farge: '#f59e0b', vaktrolle: false, maanedseffekt: 'okonomi',       kjerne: true },
    { id: 'innkjop',      funksjon: 'Innkjøp',       tittel: 'Innkjøpsansvarlig',   emoji: '📦', farge: '#a78bfa', vaktrolle: false, maanedseffekt: null,            kjerne: false },
    { id: 'fagperson',    funksjon: 'Fag',           tittel: 'Sportsfaglig veileder',emoji: '🎽', farge: '#fb7185', vaktrolle: false, maanedseffekt: null,           kjerne: false },
  ],
  // Kalibrerte vareplasser i sport-interior-mobler.png (1365×768). x/y = %,
  // scale = brøk av scenebredden. Startgjett fra rutenett-avlesning —
  // finjustert via /dev/sport-render + skjermbilde-iterasjon (spor-c.md).
  vareplasser: [
    // Sko-vegg (venstre) — sittende på hylle-ledd (2 rader × 3)
    { id: 'sko-1', type: 'sko', x: 8,  y: 31, scale: 0.052, vare: 'lopesko' },
    { id: 'sko-2', type: 'sko', x: 16, y: 32, scale: 0.052, vare: 'terrengsko' },
    { id: 'sko-3', type: 'sko', x: 24, y: 33, scale: 0.052, vare: 'tennissko' },
    { id: 'sko-4', type: 'sko', x: 8,  y: 44, scale: 0.052, vare: 'basketsko' },
    { id: 'sko-5', type: 'sko', x: 16, y: 45, scale: 0.052, vare: 'fjellsko' },
    { id: 'sko-6', type: 'sko', x: 24, y: 46, scale: 0.052, vare: 'innesko' },
    // Klesstativ (midt-venstre) — hengende på rail
    { id: 'heng-1', type: 'heng', x: 34, y: 39, scale: 0.055, vare: 'treningsjakke' },
    { id: 'heng-2', type: 'heng', x: 37, y: 39, scale: 0.055, vare: 'hettegenser' },
    { id: 'heng-3', type: 'heng', x: 40, y: 39, scale: 0.055, vare: 'vindjakke' },
    // Brettbord (midt-høyre) — topp (3) + underhylle (2)
    { id: 'brett-1', type: 'brett', x: 58, y: 53, scale: 0.06, vare: 't-skjorte' },
    { id: 'brett-2', type: 'brett', x: 64, y: 53, scale: 0.06, vare: 'treningsshorts' },
    { id: 'brett-3', type: 'brett', x: 69, y: 54, scale: 0.06, vare: 'collegegenser' },
    { id: 'brett-4', type: 'brett', x: 61, y: 60, scale: 0.06, vare: 'treningsbukse' },
    { id: 'brett-5', type: 'brett', x: 68, y: 60, scale: 0.06, vare: 'tights' },
    // Utstyrsvegg (høyre) — 3 tynne hyller (y26/34/41) + lav kubbe-enhet (y50)
    { id: 'utstyr-1', type: 'utstyr', x: 85, y: 27, scale: 0.045, vare: 'fotball' },
    { id: 'utstyr-2', type: 'utstyr', x: 85, y: 34, scale: 0.05,  vare: 'sykkelhjelm' },
    { id: 'utstyr-3', type: 'utstyr', x: 84, y: 41, scale: 0.045, vare: 'handvekt' },
    { id: 'utstyr-4', type: 'utstyr', x: 89, y: 41, scale: 0.03,  vare: 'vannflaske' },
    { id: 'utstyr-5', type: 'utstyr', x: 86, y: 50, scale: 0.05,  vare: 'ryggsekk' },
    { id: 'utstyr-6', type: 'utstyr', x: 92, y: 50, scale: 0.035, vare: 'yogamatte' },
  ],
}

/** Registeret over bransjer som FAKTISK har en definisjon. Bevisst kun
 *  { cafe: CAFE } — KLESBUTIKK og SPORT er skrevet men ikke registrert (vises
 *  via egne stillas, ikke via hovedmotorene). Se filkommentaren øverst. */
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
