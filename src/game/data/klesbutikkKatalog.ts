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
  | 'overdel' | 'skjorte' | 'kjole' | 'strikk' | 'ytterplagg' | 'bukse' | 'stabel'

const KAT_IKON: Record<KlesKategori, string> = {
  overdel: '👕', skjorte: '👔', kjole: '👗', strikk: '🧶',
  ytterplagg: '🧥', bukse: '👖', stabel: '📦',
}

/** Én plaggtype i katalogen: hvilket plagg (sprite-sett) + basispris + hvilke
 *  merker som fører den. */
interface VareType {
  plaggId: string      // → Plagg (klesbutikkPlagg.ts), gir sprite-settet + gender
  kategori: KlesKategori
  basisKost: number    // basis-innkjøpspris (kr) FØR merke-faktor
  merker: string[]     // Brand.id-er som fører denne plaggtypen
}

// Fornuftig utvalg som følger segmentlogikken: Basiq = basisplagg/billig,
// Nordheim = premium, Fjellrev = ytterplagg/kvalitet, Strøm & Berg = bredt.
// Flere merker per plaggtype gir sammenlignings-mekanikken.
const VARE_TYPER: VareType[] = [
  { plaggId: 'tskjorte',      kategori: 'overdel',    basisKost: 55,  merker: ['basiq', 'strom-berg', 'nordheim'] },
  { plaggId: 'hvit-skjorte',  kategori: 'skjorte',    basisKost: 140, merker: ['strom-berg', 'nordheim', 'fjellrev'] },
  { plaggId: 'hoodie',        kategori: 'overdel',    basisKost: 120, merker: ['basiq', 'strom-berg', 'nordheim'] },
  { plaggId: 'blaa-genser',   kategori: 'strikk',     basisKost: 130, merker: ['basiq', 'strom-berg'] },
  { plaggId: 'tykk-genser',   kategori: 'strikk',     basisKost: 160, merker: ['strom-berg', 'fjellrev'] },
  { plaggId: 'blazer-dame',   kategori: 'overdel',    basisKost: 320, merker: ['strom-berg', 'nordheim'] },
  { plaggId: 'maxikjole',     kategori: 'kjole',      basisKost: 220, merker: ['strom-berg', 'nordheim'] },
  { plaggId: 'sommerkjole',   kategori: 'kjole',      basisKost: 160, merker: ['basiq', 'strom-berg'] },
  { plaggId: 'ullfrakk',      kategori: 'ytterplagg', basisKost: 480, merker: ['nordheim', 'fjellrev'] },
  { plaggId: 'dunparkas',     kategori: 'ytterplagg', basisKost: 420, merker: ['strom-berg', 'fjellrev'] },
  { plaggId: 'skijakke',      kategori: 'ytterplagg', basisKost: 400, merker: ['strom-berg', 'fjellrev'] },
  { plaggId: 'fleecejakke',   kategori: 'ytterplagg', basisKost: 190, merker: ['basiq', 'fjellrev'] },
  { plaggId: 'linbukse',      kategori: 'bukse',      basisKost: 150, merker: ['strom-berg', 'nordheim'] },
  { plaggId: 'jeans-stabel',  kategori: 'stabel',     basisKost: 130, merker: ['basiq', 'strom-berg'] },
  { plaggId: 'genser-barn',   kategori: 'strikk',     basisKost: 90,  merker: ['basiq', 'strom-berg'] },
  { plaggId: 'tskjorte-barn', kategori: 'overdel',    basisKost: 45,  merker: ['basiq'] },
  { plaggId: 'frakk-morkgraa', kategori: 'ytterplagg', basisKost: 500, merker: ['nordheim'] },  // profil-sprite
  { plaggId: 'jeans-mork',    kategori: 'stabel',     basisKost: 150, merker: ['basiq', 'strom-berg'] },
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
