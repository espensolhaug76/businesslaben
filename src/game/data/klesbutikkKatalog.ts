// ─── Klesbutikk-KATALOG (BRANSJE 2) — plagg × merke = katalogvarer ───────────
// Kobler plaggdata (sprite-sett, klesbutikkPlagg.ts) med merker (klesbutikkBrands.ts)
// til KLESBUTIKK.katalog. SAMME plaggtype føres av flere merker med ULIK pris
// (segment-signalet), så eleven kan sammenligne i innkjøpskatalogen.
//
// costPrice   = basisKost × merkets kostFaktor
// recommended = costPrice × merkets paaslag  (veiledende utsalgspris)
//
// Tunbart: juster BASIS-kost + hvilke merker som fører hver plaggtype under.

import type { IndustryCatalogItem } from './industries'
import { brandById, BRAND_QUALITY } from './klesbutikkBrands'
import { plaggById } from './klesbutikkPlagg'

export type KlesKategori =
  | 'overdel' | 'skjorte' | 'kjole' | 'strikk' | 'ytterplagg' | 'bukse' | 'tilbehor'

const KAT_IKON: Record<KlesKategori, string> = {
  overdel: '👕', skjorte: '👔', kjole: '👗', strikk: '🧶',
  ytterplagg: '🧥', bukse: '👖', tilbehor: '🧣',
}

/** Én plaggtype i katalogen: hvilket plagg (sprite-sett) + basispris + hvilke
 *  merker som fører den. */
interface VareType {
  plaggId: string      // → Plagg (klesbutikkPlagg.ts), gir sprite-settet + gender
  kategori: KlesKategori
  basisKost: number    // basis-innkjøpspris (kr) FØR merke-faktor
  merker: string[]     // Brand.id-er som fører denne plaggtypen (1–3)
}

// Merke-kombinasjoner etter segmentlogikken (Basiq billig, Strøm & Berg bredt,
// Nordheim premium, Fjellrev kvalitet/ytterplagg). Tunbart per vare under.
const M = {
  budget:  ['basiq', 'strom-berg'],
  bred:    ['basiq', 'strom-berg', 'nordheim'],
  premium: ['strom-berg', 'nordheim'],
  premOut: ['nordheim', 'fjellrev'],
  outdoor: ['strom-berg', 'fjellrev'],
  kvalitet:['strom-berg', 'nordheim', 'fjellrev'],
  kids:    ['basiq', 'strom-berg'],
}

// DEKKER ALLE 72 plagg med sprites (heng front + heng profil + brett), gruppert
// som plaggtyper. Hver type føres av 1–3 merker. Gender arves fra plaggdataene.
const VARE_TYPER: VareType[] = [
  // ── DAME ──
  { plaggId: 'bluse',           kategori: 'overdel',    basisKost: 130, merker: M.premium },
  { plaggId: 'cardigan-dame',   kategori: 'strikk',     basisKost: 200, merker: M.premium },
  { plaggId: 'blazer-dame',     kategori: 'overdel',    basisKost: 320, merker: M.premium },
  { plaggId: 'maxikjole',       kategori: 'kjole',      basisKost: 220, merker: M.premium },
  { plaggId: 'denimskjort',     kategori: 'bukse',      basisKost: 180, merker: M.budget },
  { plaggId: 'trenchcoat',      kategori: 'ytterplagg', basisKost: 380, merker: M.premium },
  { plaggId: 'strikkekjole',    kategori: 'kjole',      basisKost: 190, merker: M.premium },
  { plaggId: 'dunvest-dame',    kategori: 'ytterplagg', basisKost: 240, merker: M.outdoor },
  { plaggId: 'sommerkjole',     kategori: 'kjole',      basisKost: 160, merker: M.budget },
  { plaggId: 'ullkaape',        kategori: 'ytterplagg', basisKost: 400, merker: M.premium },
  { plaggId: 'sommerkjole-2',   kategori: 'kjole',      basisKost: 160, merker: M.budget },
  { plaggId: 'singlet',         kategori: 'overdel',    basisKost: 60,  merker: M.budget },
  { plaggId: 'kimono',          kategori: 'overdel',    basisKost: 200, merker: M.premium },
  { plaggId: 'trenchcoat-beige', kategori: 'ytterplagg', basisKost: 380, merker: M.premium },
  { plaggId: 'lang-kjole-gronn', kategori: 'kjole',     basisKost: 240, merker: M.premium },
  { plaggId: 'lang-kjole-rosa', kategori: 'kjole',      basisKost: 240, merker: M.premium },
  // ── HERRE ──
  { plaggId: 'hvit-skjorte',    kategori: 'skjorte',    basisKost: 140, merker: M.kvalitet },
  { plaggId: 'ullfrakk',        kategori: 'ytterplagg', basisKost: 480, merker: M.premOut },
  { plaggId: 'dunparkas',       kategori: 'ytterplagg', basisKost: 420, merker: M.outdoor },
  { plaggId: 'linskjorte',      kategori: 'skjorte',    basisKost: 150, merker: M.premium },
  { plaggId: 'badeshorts',      kategori: 'bukse',      basisKost: 120, merker: M.budget },
  { plaggId: 'bomberjakke',     kategori: 'ytterplagg', basisKost: 200, merker: M.bred },
  { plaggId: 'frakk-morkgraa',  kategori: 'ytterplagg', basisKost: 500, merker: ['nordheim'] },
  { plaggId: 'strikkegenser-marine', kategori: 'strikk', basisKost: 170, merker: M.outdoor },
  { plaggId: 'flanellskjorte-brun', kategori: 'skjorte', basisKost: 150, merker: M.outdoor },
  { plaggId: 'bomberjakke-svart', kategori: 'ytterplagg', basisKost: 220, merker: M.premium },
  { plaggId: 'skjorte-lyseblaa', kategori: 'skjorte',   basisKost: 140, merker: M.premium },
  { plaggId: 'blazer-graa',     kategori: 'overdel',    basisKost: 320, merker: M.premium },
  { plaggId: 'parka-gronn',     kategori: 'ytterplagg', basisKost: 440, merker: M.outdoor },
  { plaggId: 'skjorte-hvit',    kategori: 'skjorte',    basisKost: 140, merker: M.kvalitet },
  { plaggId: 'skjorter-stabel', kategori: 'skjorte',    basisKost: 140, merker: M.premium },
  { plaggId: 'flanell-stabel',  kategori: 'skjorte',    basisKost: 150, merker: M.outdoor },
  { plaggId: 'jeans-mork',      kategori: 'bukse',      basisKost: 150, merker: M.budget },
  { plaggId: 'tskjorter-marine-graa', kategori: 'overdel', basisKost: 55, merker: M.budget },
  { plaggId: 'gensere-jordtoner', kategori: 'strikk',   basisKost: 160, merker: M.outdoor },
  { plaggId: 'flanell-rutet',   kategori: 'skjorte',    basisKost: 150, merker: M.outdoor },
  // ── BARN ──
  { plaggId: 'regnjakke-barn',  kategori: 'ytterplagg', basisKost: 150, merker: M.kids },
  { plaggId: 'hoodie-barn',     kategori: 'overdel',    basisKost: 90,  merker: M.kids },
  { plaggId: 'denimjakke-barn', kategori: 'ytterplagg', basisKost: 110, merker: M.kids },
  { plaggId: 'genser-barn',     kategori: 'strikk',     basisKost: 90,  merker: M.kids },
  { plaggId: 'sommerkjole-barn', kategori: 'kjole',     basisKost: 90,  merker: M.kids },
  { plaggId: 'parkas-barn',     kategori: 'ytterplagg', basisKost: 200, merker: M.kids },
  { plaggId: 'tskjorte-barn',   kategori: 'overdel',    basisKost: 45,  merker: M.kids },
  { plaggId: 'kjeledress-barn', kategori: 'bukse',      basisKost: 120, merker: M.kids },
  { plaggId: 'dunjakke-roed',   kategori: 'ytterplagg', basisKost: 180, merker: M.kids },
  { plaggId: 'denim-selebukse', kategori: 'bukse',      basisKost: 130, merker: M.kids },
  // ── UNISEX ──
  { plaggId: 'denimjakke',      kategori: 'ytterplagg', basisKost: 200, merker: M.bred },
  { plaggId: 'graa-genser',     kategori: 'strikk',     basisKost: 130, merker: M.budget },
  { plaggId: 'brun-genser',     kategori: 'strikk',     basisKost: 130, merker: M.budget },
  { plaggId: 'hoodie',          kategori: 'overdel',    basisKost: 120, merker: M.bred },
  { plaggId: 'blaa-genser',     kategori: 'strikk',     basisKost: 130, merker: M.budget },
  { plaggId: 'skijakke',        kategori: 'ytterplagg', basisKost: 400, merker: M.outdoor },
  { plaggId: 'fleecejakke',     kategori: 'ytterplagg', basisKost: 190, merker: ['basiq', 'fjellrev'] },
  { plaggId: 'tykk-genser',     kategori: 'strikk',     basisKost: 160, merker: M.outdoor },
  { plaggId: 'dunjakke',        kategori: 'ytterplagg', basisKost: 320, merker: M.outdoor },
  { plaggId: 'softshell',       kategori: 'ytterplagg', basisKost: 250, merker: M.outdoor },
  { plaggId: 'vattert-vest',    kategori: 'ytterplagg', basisKost: 220, merker: M.budget },
  { plaggId: 'tskjorte',        kategori: 'overdel',    basisKost: 55,  merker: M.bred },
  { plaggId: 'linbukse',        kategori: 'bukse',      basisKost: 150, merker: M.premium },
  { plaggId: 'kabelgenser-hvit', kategori: 'strikk',    basisKost: 160, merker: M.premium },
  { plaggId: 'denimjakke-blaa', kategori: 'ytterplagg', basisKost: 200, merker: M.budget },
  { plaggId: 'hoodie-beige',    kategori: 'overdel',    basisKost: 120, merker: M.budget },
  { plaggId: 't-skjorter-stabel', kategori: 'overdel',  basisKost: 55,  merker: M.budget },
  { plaggId: 'jeans-stabel',    kategori: 'bukse',      basisKost: 130, merker: M.budget },
  { plaggId: 'gensere-stabel',  kategori: 'strikk',     basisKost: 140, merker: M.budget },
  { plaggId: 'cardigan-stabel', kategori: 'strikk',     basisKost: 200, merker: M.premium },
  { plaggId: 'chinos-stabel',   kategori: 'bukse',      basisKost: 150, merker: M.premium },
  { plaggId: 'hoodies-stabel',  kategori: 'overdel',    basisKost: 120, merker: M.budget },
  { plaggId: 'shorts-stabel',   kategori: 'bukse',      basisKost: 90,  merker: M.budget },
  { plaggId: 'cardigans-stabel', kategori: 'strikk',    basisKost: 200, merker: ['strom-berg'] },
  { plaggId: 'skjerf-stabel',   kategori: 'tilbehor',   basisKost: 70,  merker: M.outdoor },
  { plaggId: 'luer-stabel',     kategori: 'tilbehor',   basisKost: 50,  merker: ['basiq', 'fjellrev'] },
]

/** KLESBUTIKK.katalog: én oppføring per (plaggtype × merke). */
export const KLESBUTIKK_KATALOG: IndustryCatalogItem[] = VARE_TYPER.flatMap(vt => {
  const plagg = plaggById(vt.plaggId)
  // Sprite-settet varen peker på (front/profil/brett — det som finnes).
  const sprite = plagg?.spriteHengFront ?? plagg?.spriteHengProfil ?? plagg?.spriteBrett
  return vt.merker.map((brandId): IndustryCatalogItem => {
    const b = brandById(brandId)!
    const costPrice = Math.round(vt.basisKost * b.kostFaktor)
    const recommendedPrice = Math.round(costPrice * b.paaslag)
    const q = BRAND_QUALITY[b.segment]
    return {
      id: `${vt.plaggId}@${brandId}`,
      name: plagg?.navn ?? vt.plaggId,
      icon: KAT_IKON[vt.kategori],
      maxDemandPerMonth: 100,
      quality: q.quality,
      sustainability: q.sustainability,
      costPrice,
      recommendedPrice,
      sprite,
      brandId,
      plaggId: vt.plaggId,
      gender: plagg?.gender ?? 'unisex',
      klesKategori: vt.kategori,
    }
  })
})

const KAT_BY_ID: Record<string, IndustryCatalogItem> =
  Object.fromEntries(KLESBUTIKK_KATALOG.map(v => [v.id, v]))
export const katalogVareById = (id: string): IndustryCatalogItem | undefined => KAT_BY_ID[id]

/** plaggId-er som er FØRT gitt en sortiment-liste (katalogvare-id-er). Brukes av
 *  styling-paletten (DEL 3) for å vise kun førte plagg. */
export function forteplaggIds(sortiment: string[]): Set<string> {
  const out = new Set<string>()
  for (const vareId of sortiment) {
    const v = KAT_BY_ID[vareId]
    if (v?.plaggId) out.add(v.plaggId)
  }
  return out
}
