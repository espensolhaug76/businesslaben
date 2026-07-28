import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { MINE_FAG_OPTIONS } from '../../lib/teacherSubjects'
import { useTeacherClass } from './TeacherClassContext'
import type { TemaNivaa } from '../../game/data/temaer'

/**
 * Global klasselinje (spor D, steg 2) — ligger rett under H1 og over
 * hovedområdene, og er synlig i alle faner. Samler det som før lå spredt som
 * kodekort i Spørsmål, kodelinje i Live økt, mikrotekst i Spillstyring og
 * «Mine fag»-chip i tittelraden.
 */

function Felt({ etikett, children }: { etikett: string; children: ReactNode }) {
  return (
    <div style={{ padding: '2px 16px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>
        {etikett}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minHeight: 26 }}>
        {children}
      </div>
    </div>
  )
}

function Skille() {
  return <div aria-hidden style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)', flexShrink: 0 }} />
}

const feltInput: React.CSSProperties = {
  border: '1px solid var(--border)', borderRadius: 8, background: 'var(--card-bg)',
  color: 'var(--text-primary)', fontSize: 13, fontFamily: 'inherit', padding: '4px 8px',
  cursor: 'pointer', outline: 'none', maxWidth: 220,
}

export default function KlasseLinje() {
  const {
    classes, activeCode, setActiveCode,
    klasseNivaa, setKlasseNivaa,
    mySubjects, toggleMySubject, resetMySubjects,
  } = useTeacherClass()

  const [kopiert, setKopiert] = useState(false)
  const [fagApen, setFagApen] = useState(false)
  const fagRef = useRef<HTMLDivElement | null>(null)

  // Lukk fag-nedtrekket ved klikk utenfor
  useEffect(() => {
    if (!fagApen) return
    function onDown(e: MouseEvent) {
      if (fagRef.current && !fagRef.current.contains(e.target as Node)) setFagApen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [fagApen])

  function kopierKode() {
    if (!activeCode) return
    navigator.clipboard.writeText(activeCode).then(() => {
      setKopiert(true)
      setTimeout(() => setKopiert(false), 2000)
    })
  }

  const valgteFag = MINE_FAG_OPTIONS.filter(o => mySubjects.includes(o.id))
  const fagTekst = valgteFag.length > 0 ? valgteFag.map(o => o.short).join(', ') : 'Alle fag'

  return (
    <div
      style={{
        display: 'flex', alignItems: 'stretch', flexWrap: 'wrap', rowGap: 10,
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '10px 0', marginBottom: 24,
      }}
    >
      <Felt etikett="Klasse">
        {classes.length > 0 ? (
          <select
            value={activeCode}
            onChange={e => setActiveCode(e.target.value)}
            style={feltInput}
            aria-label="Aktiv klasse"
          >
            {classes.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        ) : (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Ingen klasser</span>
        )}
      </Felt>

      <Skille />

      <Felt etikett="Kode">
        <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-primary)' }}>
          {activeCode || '—'}
        </span>
        {activeCode && (
          <button
            onClick={kopierKode}
            title="Kopier klassekode"
            aria-label="Kopier klassekode"
            style={{
              border: '1px solid var(--border)', borderRadius: 6, background: 'transparent',
              color: kopiert ? '#0d9488' : 'var(--text-muted)', cursor: 'pointer',
              fontSize: 12, lineHeight: 1, padding: '4px 6px', fontFamily: 'inherit',
            }}
          >
            {kopiert ? '✓' : '⧉'}
          </button>
        )}
      </Felt>

      <Skille />

      <Felt etikett="Elevenes nivå">
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
          {(['vg1', 'vg2'] as TemaNivaa[]).map(n => (
            <button
              key={n}
              onClick={() => setKlasseNivaa(n)}
              disabled={!activeCode}
              style={{
                padding: '4px 11px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                border: 'none', cursor: activeCode ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                background: klasseNivaa === n ? '#0d9488' : 'transparent',
                color: klasseNivaa === n ? '#fff' : 'var(--text-muted)',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </Felt>

      <Skille />

      <Felt etikett="Mine fag (bare mitt utvalg)">
        <div ref={fagRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setFagApen(v => !v)}
            aria-expanded={fagApen}
            style={{ ...feltInput, display: 'flex', alignItems: 'center', gap: 6, maxWidth: 260 }}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fagTekst}</span>
            <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
          </button>
          {fagApen && (
            <div
              style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 60,
                background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 10,
                padding: 14, width: 300, boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            >
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
                Hvilke fag underviser du i?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflowY: 'auto' }}>
                {MINE_FAG_OPTIONS.map(opt => {
                  const valgt = mySubjects.includes(opt.id)
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 7,
                        border: valgt ? '1px solid #99f6e4' : '1px solid var(--border)',
                        background: valgt ? 'rgba(13,148,136,0.08)' : 'transparent',
                        cursor: 'pointer', fontSize: 12, color: valgt ? '#0d9488' : 'var(--text-muted)',
                      }}
                    >
                      <input type="checkbox" checked={valgt} onChange={() => toggleMySubject(opt.id)} style={{ accentColor: '#0d9488' }} />
                      <span style={{ fontWeight: 500, minWidth: 62 }}>{opt.short}</span>
                      <span style={{ fontSize: 11, opacity: 0.8 }}>
                        {opt.label.replace(` (${opt.short})`, '').replace(opt.short, '').trim()}
                      </span>
                    </label>
                  )
                })}
              </div>
              {mySubjects.length > 0 && (
                <button
                  onClick={resetMySubjects}
                  style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
                >
                  Nullstill (vis alle fag)
                </button>
              )}
            </div>
          )}
        </div>
      </Felt>
    </div>
  )
}
