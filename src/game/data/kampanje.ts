// ─── TEMA 8 KAMPANJE OG MARKEDSPLAN — delt datalag ───────────────────────────
// Kanaldata (segment-treff + dagspris), segment→aldersgruppe-mapping, og de
// delte hjelpefunksjonene for trafikk-multiplikator + effektrapport (DEL 8:
// regnes ETT sted, testbart). Prinsipp: kanal×segment-TREFFET er SKJULT i
// spillet — treff-tallene brukes i modellen, men vises ALDRI i spill-UI-et. De
// hører hjemme i hub-en (Kommunikasjonskanaler-modulen). Ekte plattformnavn er
// OK som undervisningsdata, men opptrer ALDRI som spillaktører eller i assets.

import { BALANCE } from './balance'

function clamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, v)) }

// Ipsos-aldersgrupper = den kanoniske dimensjonen for treff-tallene.
export type IpsosBucket = '18-29' | '30-39' | '40-49' | '50-59' | '60+'
export const IPSOS_BUCKETS: IpsosBucket[] = ['18-29', '30-39', '40-49', '50-59', '60+']

export interface KanalDef {
  id: string
  navn: string
  emoji: string
  /** true = ekte plattform (Ipsos-tall); false = fiktivt medium laget for spillet. */
  ekte: boolean
  kilde: string
  /** Daglig dekning (%) per Ipsos-aldersgruppe. ALDRI vist i spill-UI-et (kun hub). */
  treff: Record<IpsosBucket, number>
}

export const KANALER: KanalDef[] = [
  // EKTE — Ipsos SoMe-tracker Q4 2023 (18 år+), daglig bruk.
  { id: 'tiktok',    navn: 'TikTok',    emoji: '🎵', ekte: true,  kilde: 'Ipsos SoMe-tracker Q4 2023 (18 år+)', treff: { '18-29': 50, '30-39': 26, '40-49': 17, '50-59': 9,  '60+': 3 } },
  { id: 'instagram', navn: 'Instagram', emoji: '📸', ekte: true,  kilde: 'Ipsos SoMe-tracker Q4 2023 (18 år+)', treff: { '18-29': 56, '30-39': 58, '40-49': 49, '50-59': 35, '60+': 26 } },
  { id: 'snapchat',  navn: 'Snapchat',  emoji: '👻', ekte: true,  kilde: 'Ipsos SoMe-tracker Q4 2023 (18 år+)', treff: { '18-29': 66, '30-39': 63, '40-49': 59, '50-59': 48, '60+': 36 } },
  { id: 'facebook',  navn: 'Facebook',  emoji: '👥', ekte: true,  kilde: 'Ipsos SoMe-tracker Q4 2023 (18 år+)', treff: { '18-29': 46, '30-39': 67, '40-49': 75, '50-59': 71, '60+': 69 } },
  // FIKTIVE — Espen-godkjente, realistiske men ikke målte tall.
  { id: 'byposten',        navn: 'Byposten (lokalavis)',       emoji: '📰', ekte: false, kilde: 'fiktivt medium laget for spillet', treff: { '18-29': 7,  '30-39': 14, '40-49': 26, '50-59': 39, '60+': 54 } },
  { id: 'radio-innlandet', navn: 'Radio Innlandet (lokalradio)', emoji: '📻', ekte: false, kilde: 'fiktivt medium laget for spillet', treff: { '18-29': 11, '30-39': 23, '40-49': 36, '50-59': 43, '60+': 44 } },
]
export const kanalById = (id: string): KanalDef | undefined => KANALER.find(k => k.id === id)

/** Dagspris per kanal — TUNBAR i balance.ts (relative nivåer). */
export function kanalDagspris(id: string): number {
  return BALANCE.kampanje.dagspris[id] ?? BALANCE.kampanje.dagsprisDefault
}

// ── Segment→aldersgruppe-mapping (spillets AGE_GROUPS → Ipsos-buckets) ────────
// Spillets målgruppe-segmenter er grovere/andre grenser enn Ipsos-buckets. Hver
// mappes til bucket(ene) den overlapper mest; treffet for et segment = snitt
// over de mappede bucketene. Dokumentert i rapporten (segment→aldersgruppe-tabell).
export const SEGMENT_TIL_IPSOS: Record<string, IpsosBucket[]> = {
  '15-20': ['18-29'],
  '21-30': ['18-29'],
  '31-45': ['30-39', '40-49'],
  '46-60': ['50-59'],
  '60+':   ['60+'],
}

/** Kanalens gjennomsnittlige treff (%) i elevens valgte målgruppe-segmenter.
 *  Tom målgruppe → snitt over ALLE buckets (nøytralt). */
export function kanalTreffISegmenter(kanal: KanalDef, segmenter: string[]): number {
  const buckets = segmenter.length
    ? [...new Set(segmenter.flatMap(s => SEGMENT_TIL_IPSOS[s] ?? []))]
    : IPSOS_BUCKETS
  if (!buckets.length) return 0
  return buckets.reduce((a, b) => a + kanal.treff[b], 0) / buckets.length
}

// ── Kampanjekonfig + effektmodell (DEL 4/5 — delt fasit) ─────────────────────
export interface KampanjeKanalValg { kanalId: string; krPerDag: number }

/** Trafikk-multiplikator under aktiv kampanje. Per kanal: treff-andel (0..1) i
 *  målgruppa × budsjett-styrke (avtagende metning) → løft; summeres, klemt.
 *  Deterministisk (ingen seed). Merkbar ved godt kanalvalg, svak (ikke 0) ved
 *  dårlig. Alt tunbart i balance.ts. */
export function kampanjefaktor(kanaler: KampanjeKanalValg[], segmenter: string[]): number {
  const K = BALANCE.kampanje
  let loft = 0
  for (const v of kanaler) {
    const kanal = kanalById(v.kanalId); if (!kanal) continue
    const treffAndel = kanalTreffISegmenter(kanal, segmenter) / 100          // 0..1
    const budsjettStyrke = 1 - Math.exp(-Math.max(0, v.krPerDag) / K.budsjettMetning)  // 0..1, avtagende
    loft += K.maksLoftPerKanal * treffAndel * budsjettStyrke
  }
  return clamp(1 + loft, 1, K.maksFaktor)
}

/** Total kampanjekostnad = sum(dagsbudsjett) × varighet (trekkes ved start). */
export function kampanjeKostnad(kanaler: KampanjeKanalValg[], varighet: number): number {
  return kanaler.reduce((s, k) => s + Math.max(0, k.krPerDag), 0) * varighet
}
/** Faktisk løft i % (kunder) = (faktor − 1) × 100 (konstant faktor over perioden). */
export function kampanjeFaktiskProsent(faktor: number): number { return Math.round((faktor - 1) * 100) }
/** Estimert merinntekt = akkumulert bakgrunnsomsetning × (1 − 1/faktor). */
export function kampanjeMerinntekt(akkBakgrunnKr: number, faktor: number): number {
  return faktor > 0 ? Math.round(akkBakgrunnKr * (1 - 1 / faktor)) : 0
}
/** ROI (%) = (merinntekt − kostnad) / kostnad × 100. */
export function kampanjeRoi(merinntekt: number, kostnad: number): number {
  return kostnad > 0 ? ((merinntekt - kostnad) / kostnad) * 100 : 0
}

// ── State-typer (referert av GameState) ──────────────────────────────────────
export interface KampanjeSalgsvare { productId: string; navn: string; ordinaerPris: number; nyPris: number; forprisBrudd: boolean }

export interface KampanjeAktiv {
  id: string
  maalType: 'kunder' | 'salg'
  maalProsent: number
  segmenter: string[]
  kanaler: KampanjeKanalValg[]
  varighet: number
  situasjon: string          // VG1 markedsplan: «situasjonen nå»
  faktor: number             // låst ved start (stabil over perioden)
  salgsvarer: KampanjeSalgsvare[]
  startAar: number; startMaaned: number; startDag: number
  dagerKjort: number
  akkBakgrunnKr: number
  akkBakgrunnKunder: number
}

export interface KampanjeResultat {
  id: string
  maalType: 'kunder' | 'salg'
  maalProsent: number
  faktiskProsent: number
  faktor: number
  kostnad: number
  merinntekt: number
  roi: number
  kanaler: KampanjeKanalValg[]
  segmenter: string[]
  varighet: number
  akkBakgrunnKr: number
  forprisBrudd: boolean
  aar: number; maaned: number; dag: number
}

export interface KampanjeState {
  aktiv: KampanjeAktiv | null
  historikk: KampanjeResultat[]
  /** Resultat-id å vise effektrapport-overlay for (null = ingen). */
  visRapportFor: string | null
}

// ── Hub-lenker (📚, ny fane) ──────────────────────────────────────────────────
export const KOMMUNIKASJONSKANALER_RUTE = '/learning/mfi/kommunikasjon-kanaler'
export const MARKEDSFORINGSLOVEN_RUTE = '/learning/mfi/markedsforingsloven'
export const KAMPANJE_HUB: Record<'vg1' | 'vg2', { rute: string; navn: string }[]> = {
  vg1: [
    { rute: '/learning/mfi/markedsplan', navn: 'Markedsplan' },
    { rute: KOMMUNIKASJONSKANALER_RUTE, navn: 'Kommunikasjonskanaler' },
    { rute: MARKEDSFORINGSLOVEN_RUTE, navn: 'Markedsføringsloven' },
  ],
  vg2: [
    { rute: '/learning/mfi/markedsplan', navn: 'Markedsplan' },
    { rute: KOMMUNIKASJONSKANALER_RUTE, navn: 'Kommunikasjonskanaler' },
    { rute: MARKEDSFORINGSLOVEN_RUTE, navn: 'Markedsføringsloven' },
    { rute: '/learning/vg2/kommunikasjon/markedsforingskampanjer', navn: 'Markedsføringskampanjer' },
  ],
}
