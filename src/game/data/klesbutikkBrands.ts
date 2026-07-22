// ─── Klesbutikk-MERKER / leverandører (BRANSJE 2) ────────────────────────────
// Datalag for leverandørkatalogen (docs/BRANSJE2_LEVERANDORER.md). Kjerneidé:
// KVALITET er en egenskap ved LEVERANDØREN, ikke en tier-meny. Innkjøpspris +
// merkeposisjon = kvalitetssignal; innkjøpsvalgene BLIR butikkens posisjonering.
//
// Rent tunbart datalag. brandPull-effekt på trafikk, persona-scoring og
// sesong-nedskrivning er IKKE i denne jobben (kun definisjonen + prisene).

export type BrandSegment = 'billigvolum' | 'norsk-midt' | 'premium' | 'nisje-kvalitet'
/** Hvor sterkt merket trekker kunder (eksponering) — kobles på trafikk senere. */
export type BrandPull = 'ingen' | 'moderat' | 'sterk'

export interface Brand {
  id: string
  navn: string
  segment: BrandSegment
  brandPull: BrandPull
  /** Persona-kategorier merket appellerer til (kobles på scoring senere). */
  personaAffinity: string[]
  /** Multiplikator på plaggets BASIS-innkjøpspris — segment-signalet i pris.
   *  Basiq lavest, Nordheim høyest (jf. designdokets segmentlogikk). */
  kostFaktor: number
  /** Veiledende påslag: recommendedPrice = round(costPrice × paaslag). */
  paaslag: number
  /** Kort merkefarge (UI-chip i innkjøpskatalogen). */
  farge: string
}

// De FIRE fiktive merkene (aldri ekte merkenavn — varemerkerisiko).
export const BRANDS: Brand[] = [
  {
    id: 'basiq', navn: 'Basiq', segment: 'billigvolum', brandPull: 'ingen',
    personaAffinity: ['prisbevisste'], kostFaktor: 0.65, paaslag: 2.2, farge: '#94a3b8',
  },
  {
    id: 'strom-berg', navn: 'Strøm & Berg', segment: 'norsk-midt', brandPull: 'moderat',
    personaAffinity: ['familie', 'karriere'], kostFaktor: 1.0, paaslag: 2.4, farge: '#38bdf8',
  },
  {
    id: 'nordheim', navn: 'Nordheim Atelier', segment: 'premium', brandPull: 'sterk',
    personaAffinity: ['trendsettere', 'karriere'], kostFaktor: 1.8, paaslag: 2.6, farge: '#c084fc',
  },
  {
    id: 'fjellrev', navn: 'Fjellrev Works', segment: 'nisje-kvalitet', brandPull: 'sterk',
    personaAffinity: ['miljobevisste', 'helse'], kostFaktor: 1.35, paaslag: 2.5, farge: '#34d399',
  },
]

const BRAND_BY_ID: Record<string, Brand> = Object.fromEntries(BRANDS.map(b => [b.id, b]))
export const brandById = (id: string): Brand | undefined => BRAND_BY_ID[id]

/** Kvalitet/bærekraft (1–10) utledet av segmentet — brukt som katalog-metadata. */
export const BRAND_QUALITY: Record<BrandSegment, { quality: number; sustainability: number }> = {
  'billigvolum':    { quality: 4, sustainability: 3 },
  'norsk-midt':     { quality: 6, sustainability: 6 },
  'premium':        { quality: 9, sustainability: 7 },
  'nisje-kvalitet': { quality: 8, sustainability: 9 },
}

// ─── brandPull-MATRISE (DEL 5) — per merke × psykografisk egenskap ────────────
// REN DATA. brandPull-effekten som TREKKFAKTOR PÅ BESØKSVILJE: hvor mye et ført
// merke løfter (eller demper) sannsynligheten for at en persona av en gitt
// psykografisk profil VELGER Å BESØKE butikken. Dette er merke-eksponeringens
// pull på trafikk — IKKE salgs-/scoring-logikk (den er scenario-motoren).
//
// ⚠️ KOBLINGEN mot trafikkmotoren gjøres IKKE her (skall-synk-jobben). Denne fila
//    leverer kun tallene i én eksportert struktur, klar til å multipliseres inn.
//
// EGENSKAPSSETTET = de 6 persona-segmentene som `personas.ts` genererer (samme
// psykografiske akse spillet ellers bruker for personaer/målgruppe). NB: den
// eldre `personaAffinity`-lista over bruker korte alias ('familie','karriere',
// 'trendsettere','miljobevisste','helse','prisbevisste'); matrisen bruker de
// FULLE segmentnavnene fra personas.ts. Toppene her er konsistente med hvert
// merkes `personaAffinity` + `brandPull`-styrke.
//
// TALLMODELL — MULTIPLIKATOR rundt NØYTRAL 1.0 (konservativt, snevert bånd):
//   sterk affinitet   ≈ 1.28–1.34   ·  moderat affinitet ≈ 1.12–1.18
//   nøytral            = 1.00        ·  mild mismatch      ≈ 0.88–0.96
// Ingen verdi går under 0.85 eller over 1.35 — et merke skal aldri STENGE ute et
// segment helt, bare vekte det. `brandPull:'ingen'` (Basiq) betyr at merkeNAVNET
// ikke trekker som statussignal; segment-passform (pris) gir likevel utslag.

/** Psykografisk egenskap = persona-segmentet fra `personas.ts` (Målgruppe-aksen). */
export type PsykografiskEgenskap =
  | 'Karriereorienterte'
  | 'Trendsettere'
  | 'Miljøbevisste'
  | 'Prisbevisste'
  | 'Helsebevisste'
  | 'Familieorienterte'

export const PSYKOGRAFISKE_EGENSKAPER: PsykografiskEgenskap[] = [
  'Karriereorienterte', 'Trendsettere', 'Miljøbevisste',
  'Prisbevisste', 'Helsebevisste', 'Familieorienterte',
]

/** Trekkfaktor på besøksvilje per (merke × psykografisk egenskap). Multiplikator
 *  rundt 1.0. Kobles på trafikkmotoren i skall-synk (ikke her). */
export const BRAND_PULL_MATRIX: Record<string, Record<PsykografiskEgenskap, number>> = {
  // Basiq — billigvolum, brandPull 'ingen'. Trekker prisjegere (lav terskel),
  // grei for familie-volum; demper status/trend (billig ≠ statussignal) og
  // miljø (fast fashion-inntrykk).
  basiq: {
    Karriereorienterte: 0.95, Trendsettere: 0.90, Miljøbevisste: 0.94,
    Prisbevisste: 1.16, Helsebevisste: 1.00, Familieorienterte: 1.08,
  },
  // Strøm & Berg — norsk-midt, brandPull 'moderat'. Bredt, trygt hverdagsmerke:
  // mild positiv over hele linja, sterkest på familie + karriere (kjerneaffinitet).
  'strom-berg': {
    Karriereorienterte: 1.15, Trendsettere: 1.02, Miljøbevisste: 1.02,
    Prisbevisste: 1.06, Helsebevisste: 1.03, Familieorienterte: 1.18,
  },
  // Nordheim Atelier — premium, brandPull 'sterk'. Statusmerke: trekker
  // trendsettere + karriere kraftig; demper prisbevisste (premium-terskel).
  nordheim: {
    Karriereorienterte: 1.26, Trendsettere: 1.34, Miljøbevisste: 1.00,
    Prisbevisste: 0.88, Helsebevisste: 1.00, Familieorienterte: 1.03,
  },
  // Fjellrev Works — nisje-kvalitet, brandPull 'sterk'. Bærekraft/turkvalitet:
  // trekker miljøbevisste + helsebevisste kraftig; slitesterkt for familier;
  // mild demper på pris (kvalitet koster).
  fjellrev: {
    Karriereorienterte: 1.05, Trendsettere: 1.00, Miljøbevisste: 1.34,
    Prisbevisste: 0.92, Helsebevisste: 1.26, Familieorienterte: 1.08,
  },
}

/** Trekkfaktor for ett merke × én egenskap. 1.0 (nøytral) hvis udefinert. */
export function brandPullFor(brandId: string, egenskap: PsykografiskEgenskap): number {
  return BRAND_PULL_MATRIX[brandId]?.[egenskap] ?? 1.0
}
