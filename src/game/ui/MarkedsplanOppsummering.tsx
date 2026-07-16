import { kanalById, type KampanjeKanalValg } from '../data/kampanje'
import Fagord from './Fagord'

// ─── TEMA 8 · «📄 Din markedsplan» (auto-generert VISNING) ───────────────────
// Sammenstiller elevens kampanjevalg til en enkel markedsplan: situasjon → mål →
// målgruppe → virkemidler → periode → evaluering. Ikke et nytt skjema — bare en
// oppsummering av det eleven alt har fylt ut. Delt av kampanjeseksjonen (etter
// start) og effektrapporten.
export default function MarkedsplanOppsummering({ situasjon, maalType, maalProsent, segmenter, kanaler, varighet, evaluering }: {
  situasjon: string
  maalType: 'kunder' | 'salg'
  maalProsent: number
  segmenter: string[]
  kanaler: KampanjeKanalValg[]
  varighet: number
  evaluering: React.ReactNode
}) {
  const rader: { k: string; v: React.ReactNode }[] = [
    { k: 'Situasjon', v: situasjon.trim() || <span style={{ color: '#64748b' }}>(ikke fylt ut)</span> },
    { k: 'Mål', v: `Øke ${maalType === 'kunder' ? 'antall kunder' : 'salget'} med ${maalProsent} %` },
    { k: 'Målgruppe', v: segmenter.length ? segmenter.join(', ') : 'alle aldersgrupper' },
    { k: 'Virkemidler', v: kanaler.length ? kanaler.map(c => `${kanalById(c.kanalId)?.navn ?? c.kanalId} (${c.krPerDag.toLocaleString('nb-NO')} kr/dag)`).join(' · ') : '—' },
    { k: 'Periode', v: `${varighet} dager` },
    { k: 'Evaluering', v: evaluering },
  ]
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.8rem 1rem' }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: '#7dd3fc', marginBottom: 8 }}>📄 Din <Fagord id="MKT_053">markedsplan</Fagord></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.35rem 0.8rem', fontSize: 12.5 }}>
        {rader.map(r => (
          <div key={r.k} style={{ display: 'contents' }}>
            <span style={{ color: '#94a3b8', fontWeight: 700, whiteSpace: 'nowrap' }}>{r.k}</span>
            <span style={{ color: '#cbd5e1' }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
