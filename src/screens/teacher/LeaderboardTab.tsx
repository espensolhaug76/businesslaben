/**
 * Nasjonalt leaderboard — viser klasse-aggregerte quiz-resultater på tvers av skoler.
 *
 * GDPR: Henter kun aggregert data fra /shared_competitions. Ingen elevnavn vises.
 * Klasser identifiseres som "DIN KLASSE" ved at klassekoden matcher en kode i
 * lærerens lokale teacher-classes — koden lekker ikke informasjon ut, men gir
 * klar markering av egen deltakelse.
 */
import { useEffect, useMemo, useState } from 'react'
import {
  subscribeToCompetitions,
  subscribeToParticipants,
  deleteParticipation,
  type CompetitionMeta,
  type CompetitionParticipant,
} from '../../lib/sharedCompetitions'
import { MINE_FAG_OPTIONS, normalizeSubjectId } from '../../lib/teacherSubjects'

interface TeacherClass { code: string; name: string; subject: string }

function getOwnClassroomCodes(): Set<string> {
  try {
    const classes: TeacherClass[] = JSON.parse(localStorage.getItem('teacher-classes') ?? '[]')
    return new Set(classes.map(c => c.code))
  } catch { return new Set() }
}

function getOwnSubjects(): Set<string> {
  try {
    const classes: TeacherClass[] = JSON.parse(localStorage.getItem('teacher-classes') ?? '[]')
    return new Set(classes.map(c => normalizeSubjectId(c.subject)).filter(Boolean))
  } catch { return new Set() }
}

function subjectShort(id: string): string {
  const normalized = normalizeSubjectId(id)
  return MINE_FAG_OPTIONS.find(o => o.id === normalized)?.short ?? '—'
}

function isYrkesfag(id: string): boolean {
  // SSR (yrkesfag) starter med ssr_ eller er VG2 ok/kom/hms
  const n = normalizeSubjectId(id)
  return n.startsWith('ssr_') || n === 'ok_vg2' || n === 'kom_vg2' || n === 'hms_vg2'
}

function isStudiespes(id: string): boolean {
  const n = normalizeSubjectId(id)
  return n === 'ml1' || n === 'ml2' || n === 'ent1' || n === 'ent2'
}

function startOfThisMonth(): number {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1).getTime()
}

type Filter = 'alle' | 'mitt-fag' | 'denne-maneden' | 'yrkesfag' | 'studiespes'

export default function LeaderboardTab() {
  const [competitions, setCompetitions] = useState<CompetitionMeta[]>([])
  const [participants, setParticipants] = useState<CompetitionParticipant[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('alle')
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const ownCodes = useMemo(() => getOwnClassroomCodes(), [])
  const ownSubjects = useMemo(() => getOwnSubjects(), [])

  useEffect(() => subscribeToCompetitions(setCompetitions), [])

  useEffect(() => {
    if (!selectedId) { setParticipants([]); return }
    return subscribeToParticipants(selectedId, setParticipants)
  }, [selectedId])

  const filteredCompetitions = useMemo(() => {
    const q = search.trim().toLowerCase()
    return competitions.filter(c => {
      if (q && !c.title.toLowerCase().includes(q)) return false
      if (filter === 'mitt-fag' && !ownSubjects.has(normalizeSubjectId(c.subject))) return false
      if (filter === 'denne-maneden' && c.createdAt < startOfThisMonth()) return false
      if (filter === 'yrkesfag' && !isYrkesfag(c.subject)) return false
      if (filter === 'studiespes' && !isStudiespes(c.subject)) return false
      return true
    })
  }, [competitions, filter, search, ownSubjects])

  const selectedComp = competitions.find(c => c.id === selectedId)

  async function handleDelete(p: CompetitionParticipant) {
    if (!selectedId) return
    if (!confirm(`Slette ${p.className} fra leaderboardet for «${selectedComp?.title ?? selectedId}»?\n\nDataen forsvinner umiddelbart for alle.`)) return
    setDeleting(p.entryId)
    try {
      await deleteParticipation(selectedId, p.entryId)
    } catch (err) {
      console.error('deleteParticipation failed', err)
      alert('Kunne ikke slette: ' + (err instanceof Error ? err.message : 'ukjent feil'))
    } finally {
      setDeleting(null)
    }
  }

  const card: React.CSSProperties = {
    background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px',
  }

  const filterOptions: { id: Filter; label: string }[] = [
    { id: 'alle', label: 'Alle' },
    { id: 'mitt-fag', label: 'Mitt fag' },
    { id: 'denne-maneden', label: 'Denne måneden' },
    { id: 'yrkesfag', label: 'Yrkesfag (SSR)' },
    { id: 'studiespes', label: 'Studiespes (ML/ENT)' },
  ]

  // ── Detail view ─────────────────────────────────────────────────────────────
  if (selectedId && selectedComp) {
    const sorted = [...participants].sort((a, b) => b.averageScore - a.averageScore || a.completedAt - b.completedAt)
    const ownEntries = sorted.filter(p => ownCodes.has(p.classroomCode))
    return (
      <div style={{ maxWidth: 760 }}>
        <button
          onClick={() => setSelectedId(null)}
          style={{ background: 'none', border: 'none', color: '#0d9488', cursor: 'pointer', fontSize: 13, padding: 0, marginBottom: 12, fontFamily: 'inherit' }}
        >
          ← Tilbake til konkurranser
        </button>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{selectedComp.title}</h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
          {subjectShort(selectedComp.subject)} · {sorted.length} klasser deltar · opprettet av {selectedComp.createdBy || 'ukjent skole'}
        </p>

        {sorted.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Ingen klasser har delt resultater ennå.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sorted.map((p, idx) => {
              const isOwn = ownCodes.has(p.classroomCode)
              const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`
              return (
                <div
                  key={p.entryId}
                  style={{
                    ...card,
                    display: 'flex', alignItems: 'center', gap: 12,
                    border: isOwn ? '2px solid #0d9488' : '1px solid var(--border)',
                    background: isOwn ? 'rgba(13,148,136,0.06)' : 'var(--card-bg)',
                  }}
                >
                  <span style={{ fontSize: 22, width: 36, textAlign: 'center', flexShrink: 0 }}>{medal}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: 0 }}>
                      {p.className}
                      {isOwn && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: '#0d9488', letterSpacing: '0.05em' }}>DIN KLASSE</span>}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      {p.schoolName}{p.teacherName ? ` · ${p.teacherName}` : ''} · {p.studentCount} elever
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#0d9488', margin: 0 }}>{p.averageScore}%</p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: 0 }}>snitt</p>
                  </div>
                  {isOwn && (
                    <button
                      onClick={() => handleDelete(p)}
                      disabled={deleting === p.entryId}
                      style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: deleting === p.entryId ? 'wait' : 'pointer', fontSize: 11, fontFamily: 'inherit', flexShrink: 0 }}
                    >
                      {deleting === p.entryId ? 'Sletter…' : 'Slett vår deltakelse'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {ownEntries.length === 0 && sorted.length > 0 && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, fontStyle: 'italic' }}>
            Ingen av dine klasser deltar i denne konkurransen ennå. Del et resultat fra Live økt-fanen.
          </p>
        )}
      </div>
    )
  }

  // ── List view ───────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 760 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>📊 Nasjonalt leaderboard</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
        Klasse-aggregerte quiz-resultater på tvers av skoler. Kun snitt og antall elever lagres — ingen elevnavn.
      </p>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Søk etter konkurranse…"
        style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', outline: 'none', marginBottom: 12 }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {filterOptions.map(f => {
          const active = filter === f.id
          const disabled = f.id === 'mitt-fag' && ownSubjects.size === 0
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              disabled={disabled}
              title={disabled ? 'Du har ingen klasser med valgt fag ennå' : ''}
              style={{
                padding: '6px 12px', borderRadius: 999, border: active ? '1.5px solid #0d9488' : '1px solid var(--border)',
                background: active ? 'rgba(13,148,136,0.1)' : 'var(--card-bg)',
                color: active ? '#0d9488' : 'var(--text-muted)',
                fontSize: 12, fontWeight: active ? 600 : 400, cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : 1, fontFamily: 'inherit',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {filteredCompetitions.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: '32px 0', textAlign: 'center' }}>
          {competitions.length === 0
            ? 'Ingen konkurranser delt ennå. Hold en quiz i Live økt-fanen og del resultatet for å være først ute.'
            : 'Ingen konkurranser matcher filteret.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredCompetitions.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              style={{ ...card, textAlign: 'left', cursor: 'pointer', display: 'block', width: '100%', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#0d9488')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: 0 }}>{c.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                    {subjectShort(c.subject)} · opprettet av {c.createdBy || 'ukjent skole'} · {new Date(c.createdAt).toLocaleDateString('nb-NO', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
                <span style={{ fontSize: 20, color: 'var(--text-muted)', flexShrink: 0 }}>›</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
