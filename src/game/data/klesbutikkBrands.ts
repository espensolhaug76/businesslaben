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
