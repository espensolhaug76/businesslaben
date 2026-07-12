import { useMemo, useState } from 'react'
import { useGame } from '../GameContext'
import { KLESBUTIKK_KATALOG } from '../data/klesbutikkKatalog'
import { brandById } from '../data/klesbutikkBrands'
import type { Gender } from '../data/klesbutikkPlagg'
import type { IndustryCatalogItem } from '../data/industries'

// ─── INNKJØPSKATALOG (BRANSJE 2, DEL 2) ──────────────────────────────────────
// Bla per merke, filtrer på gender/kategori, SAMMENLIGN samme plaggtype på tvers
// av merker (margin-regnestykket synlig per valg). «Før» varer (toggle) → føres-
// lista i state.klesbutikkSortiment (samme mønster som resten av stillaset).

interface Gruppe {
  plaggId: string
  navn: string
  gender: Gender
  kategori: string
  sprite?: string
  variants: IndustryCatalogItem[]   // samme plaggtype fra ulike merker
}

const GENDER_LABEL: Record<Gender, string> = { dame: 'Dame', herre: 'Herre', barn: 'Barn', unisex: 'Unisex' }

export default function InnkjopKatalog() {
  const { state, dispatch } = useGame()
  const sortiment = state.klesbutikkSortiment
  const fortSet = useMemo(() => new Set(sortiment), [sortiment])
  const [genderF, setGenderF] = useState<'alle' | Gender>('alle')
  const [katF, setKatF] = useState<'alle' | string>('alle')

  // Grupper katalogen på plaggtype (så merke-variantene ligger side om side).
  const grupper = useMemo<Gruppe[]>(() => {
    const map = new Map<string, Gruppe>()
    for (const v of KLESBUTIKK_KATALOG) {
      const key = v.plaggId ?? v.id
      let g = map.get(key)
      if (!g) {
        g = { plaggId: key, navn: v.name, gender: (v.gender ?? 'unisex') as Gender, kategori: v.klesKategori ?? '—', sprite: v.sprite, variants: [] }
        map.set(key, g)
      }
      g.variants.push(v)
    }
    return [...map.values()]
  }, [])

  const kategorier = useMemo(() => [...new Set(grupper.map(g => g.kategori))].sort(), [grupper])
  // Kjønnsfilter INKLUDERER unisex for dame/herre (unisex-plagg passer begge).
  // Barn = kun barn (barnestørrelser er egne varer). Unisex = kun unisex.
  const matchGender = (g: Gruppe): boolean => {
    if (genderF === 'alle') return true
    if (genderF === 'dame') return g.gender === 'dame' || g.gender === 'unisex'
    if (genderF === 'herre') return g.gender === 'herre' || g.gender === 'unisex'
    if (genderF === 'barn') return g.gender === 'barn'
    return g.gender === 'unisex'   // 'unisex'-knappen
  }
  const filtrert = grupper.filter(g => matchGender(g) && (katF === 'alle' || g.kategori === katF))

  const toggle = (vareId: string) => {
    const next = fortSet.has(vareId) ? sortiment.filter(x => x !== vareId) : [...sortiment, vareId]
    dispatch({ type: 'SET_KLESBUTIKK_SORTIMENT', items: next })
  }

  const chip = (aktiv: boolean, farge: string): React.CSSProperties => ({
    padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
    border: `1px solid ${farge}`, background: aktiv ? farge : `${farge}22`, color: aktiv ? '#0a0e1a' : farge,
    fontFamily: "'Outfit', sans-serif",
  })

  return (
    <div style={{
      position: 'absolute', inset: 0, top: 64, overflowY: 'auto', padding: '8px 16px 80px',
      width: 'min(96vw, 1100px)', margin: '0 auto', fontFamily: "'Outfit', sans-serif", color: '#e2e8f0',
    }}>
      {/* Filtre + antall */}
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(16,20,26,0.96)', padding: '10px 0', marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#94a3b8', marginRight: 2 }}>Kjønn:</span>
          <button style={chip(genderF === 'alle', '#7dd3fc')} onClick={() => setGenderF('alle')}>Alle</button>
          {(['dame', 'herre', 'barn', 'unisex'] as Gender[]).map(g => (
            <button key={g} style={chip(genderF === g, '#7dd3fc')} onClick={() => setGenderF(g)}>{GENDER_LABEL[g]}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#94a3b8', marginRight: 2 }}>Kategori:</span>
          <button style={chip(katF === 'alle', '#fbbf24')} onClick={() => setKatF('alle')}>Alle</button>
          {kategorier.map(k => (
            <button key={k} style={{ ...chip(katF === k, '#fbbf24'), textTransform: 'capitalize' }} onClick={() => setKatF(k)}>{k}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#22e6a4', fontWeight: 700 }}>{sortiment.length} varer ført</span>
        </div>
      </div>

      {/* Grupper: én plaggtype per kort, merke-varianter side om side */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtrert.map(g => (
          <div key={g.plaggId} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                {g.sprite ? <img src={g.sprite} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <span>👕</span>}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{g.navn}</div>
                <div style={{ fontSize: 11, color: '#64748b', textTransform: 'capitalize' }}>{g.kategori} · {GENDER_LABEL[g.gender]}</div>
              </div>
            </div>
            {/* Merke-varianter — sammenlign pris/margin */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`, gap: 8 }}>
              {g.variants.map(v => {
                const b = brandById(v.brandId ?? '')
                const margin = v.recommendedPrice - v.costPrice
                const marginPct = v.recommendedPrice > 0 ? Math.round((margin / v.recommendedPrice) * 100) : 0
                const ført = fortSet.has(v.id)
                const farge = b?.farge ?? '#94a3b8'
                return (
                  <div key={v.id} style={{ border: `1px solid ${ført ? '#22e6a4' : 'rgba(255,255,255,0.12)'}`, borderRadius: 10, padding: 8, background: ført ? 'rgba(34,230,164,0.08)' : 'transparent' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: farge, flex: '0 0 auto' }} />
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{b?.navn ?? v.brandId}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2px 8px', fontSize: 12 }}>
                      <span style={{ color: '#94a3b8' }}>Innkjøp</span><span style={{ textAlign: 'right', fontFamily: 'monospace' }}>{v.costPrice} kr</span>
                      <span style={{ color: '#94a3b8' }}>Veil. pris</span><span style={{ textAlign: 'right', fontFamily: 'monospace' }}>{v.recommendedPrice} kr</span>
                      <span style={{ color: '#94a3b8' }}>Margin</span><span style={{ textAlign: 'right', fontFamily: 'monospace', color: '#22e6a4' }}>{margin} kr ({marginPct}%)</span>
                    </div>
                    <button
                      onClick={() => toggle(v.id)}
                      style={{
                        width: '100%', marginTop: 8, height: 28, borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: 'pointer',
                        fontFamily: "'Outfit', sans-serif",
                        border: ført ? '1px solid #22e6a4' : '1px solid rgba(255,255,255,0.2)',
                        background: ført ? '#22e6a4' : 'rgba(255,255,255,0.06)', color: ført ? '#0a0e1a' : '#e2e8f0',
                      }}
                    >{ført ? '✓ Ført' : 'Før vare'}</button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {filtrert.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>Ingen varer matcher filteret.</div>
        )}
      </div>
    </div>
  )
}
