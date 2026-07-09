import { useState } from 'react'
import { search as glossarySearch, CATEGORIES, GLOSSARY, type GlossaryLevel } from '../data/glossary'
import Fagord from './Fagord'

// ─── LÆRINGSLAGET — ordbok-innhold ────────────────────────────────────────────
// Søk + nivå-/kategorifilter + alfabetisk liste. Hvert begrep er et <Fagord> —
// klikk gir SAMME forklaringskort som fagordene ute i flatene. Brukes av
// mentorens bok-panel (ordboken har ett hjem: hos mentoren).

export default function OrdbokPanel() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [lvl, setLvl] = useState<'' | GlossaryLevel>('')

  const list = glossarySearch(q)
    .filter(t => (!cat || t.category === cat) && (!lvl || t.level === lvl))
    .sort((a, b) => a.term.localeCompare(b.term, 'nb'))

  const chip = (active: boolean, color: string): React.CSSProperties => ({
    background: active ? `${color}22` : 'rgba(255,255,255,0.04)',
    border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 99, padding: '0.3rem 0.8rem', fontSize: 12, fontWeight: 700,
    color: active ? color : '#94a3b8', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
  })

  return (
    <div>
      <p style={{ color: '#64748b', fontSize: 12, margin: '0 0 0.7rem' }}>
        {list.length} av {GLOSSARY.length} begreper. Klikk et begrep for forklaring, formel, eksempel og vanlige feil.
      </p>

      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Søk i term eller definisjon …"
        style={{
          width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '0.55rem 0.85rem',
          color: '#f1f5f9', fontSize: 13.5, fontFamily: 'inherit', marginBottom: '0.6rem',
        }}
      />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '0.4rem' }}>
        <button onClick={() => setLvl('')} style={chip(lvl === '', '#7dd3fc')}>Alle nivå</button>
        <button onClick={() => setLvl('VG1')} style={chip(lvl === 'VG1', '#22c55e')}>VG1</button>
        <button onClick={() => setLvl('VG2')} style={chip(lvl === 'VG2', '#a855f7')}>VG2</button>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '0.8rem' }}>
        <button onClick={() => setCat('')} style={chip(cat === '', '#00d4aa')}>Alle kategorier</button>
        {CATEGORIES.map(c => (
          <button key={c.value} onClick={() => setCat(c.value === cat ? '' : c.value)} style={chip(cat === c.value, '#00d4aa')}>{c.label}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#475569', padding: '1.5rem' }}>Ingen treff.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {list.map(t => (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'baseline', gap: 8,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 9, padding: '0.45rem 0.7rem',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}><Fagord id={t.id}>{t.term}</Fagord></span>
              <span style={{ fontSize: 10, color: '#64748b', marginLeft: 'auto', whiteSpace: 'nowrap' }}>{t.level}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
