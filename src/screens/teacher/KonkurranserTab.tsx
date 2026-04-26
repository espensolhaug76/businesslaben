/**
 * Konkurranser-tab: standardkonkurranser øverst (24 ferdiglagde, ett-klikks-start)
 * + lærerens egne opprettede konkurranser nedenfor.
 *
 * Standardkonkurranser sender klasse-aggregert snitt til /shared_competitions/{stdId}
 * for cross-school leaderboard — alle lærere på tvers samles på samme std-ID.
 */
import { useState, useEffect, useMemo } from 'react'
import {
  subscribeToAllCompetitions,
  saveCompetition as saveCompetitionToFirebase,
  getStandardCompetitions,
  startStandardCompetition,
} from '../../lib/firebaseCompetitions'
import { MINE_FAG_OPTIONS, normalizeSubjectId } from '../../lib/teacherSubjects'
import type { Competition } from '../../types/Competition'

interface CompetitionSummary {
  id: string
  title: string
  code: string
  status: string
  createdAt: string
  questions: unknown[]
  subject?: string
}

type FilterId = 'alle' | 'mitt-fag' | 'ssr' | 'ml' | 'ent' | 'tverrfaglig'

const FILTER_OPTIONS: { id: FilterId; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  { id: 'mitt-fag', label: 'Mitt fag' },
  { id: 'ssr', label: 'SSR yrkesfag' },
  { id: 'ml', label: 'ML' },
  { id: 'ent', label: 'ENT' },
  { id: 'tverrfaglig', label: 'Tverrfaglig' },
]

function matchesFilter(subject: string | undefined, filter: FilterId, ownSubjects: Set<string>): boolean {
  const sub = normalizeSubjectId(subject)
  if (filter === 'alle') return true
  if (filter === 'mitt-fag') return Boolean(sub) && ownSubjects.has(sub)
  if (filter === 'ssr') return sub.startsWith('ssr_') || sub === 'ok_vg2' || sub === 'kom_vg2' || sub === 'hms_vg2'
  if (filter === 'ml') return sub === 'ml1' || sub === 'ml2'
  if (filter === 'ent') return sub === 'ent1' || sub === 'ent2'
  if (filter === 'tverrfaglig') return sub === 'tverrfaglig_vg1' || sub === 'tverrfaglig_vg2'
  return true
}

function readActiveClass(): { name: string; subject: string } | null {
  try {
    const code = localStorage.getItem('teacher-classroom-code') ?? ''
    const classes: { code: string; name: string; subject: string }[] = JSON.parse(localStorage.getItem('teacher-classes') ?? '[]')
    const found = classes.find(c => c.code === code)
    return found ? { name: found.name, subject: normalizeSubjectId(found.subject) } : null
  } catch { return null }
}

function readOwnSubjects(): Set<string> {
  try {
    const classes: { subject: string }[] = JSON.parse(localStorage.getItem('teacher-classes') ?? '[]')
    return new Set(classes.map(c => normalizeSubjectId(c.subject)).filter(Boolean))
  } catch { return new Set() }
}

interface KonkurranserTabProps {
  navigate: (path: string) => void
}

export default function KonkurranserTab({ navigate }: KonkurranserTabProps) {
  // Lærerens egne klasser/fag
  const ownSubjects = useMemo(() => readOwnSubjects(), [])
  const activeClass = useMemo(() => readActiveClass(), [])

  // ── Mine konkurranser (Firebase + localStorage backup-cache)
  const [competitions, setCompetitions] = useState<CompetitionSummary[]>(() => {
    try { return JSON.parse(localStorage.getItem('adventure-competitions') ?? '[]') as CompetitionSummary[] } catch { return [] }
  })

  useEffect(() => {
    return subscribeToAllCompetitions(list => {
      const summaries: CompetitionSummary[] = list
        // Skjul lærer-instanser av standardkonkurranser fra Mine-listen — de
        // er duplikater av standardkortene og bare forvirrende å se.
        .filter(c => !c.standardParentId)
        .map(c => ({
          id: c.id, title: c.title, code: c.code,
          status: c.status ?? 'waiting', createdAt: c.createdAt,
          questions: c.questions, subject: c.subject,
        }))
      setCompetitions(summaries)
    })
  }, [])

  // Auto-migrer eventuelle gamle localStorage-konkurranser til Firebase
  useEffect(() => {
    if (localStorage.getItem('adventure-competitions-migrated') === 'true') return
    try {
      const raw = localStorage.getItem('adventure-competitions')
      if (!raw) {
        localStorage.setItem('adventure-competitions-migrated', 'true')
        return
      }
      const local: Competition[] = JSON.parse(raw)
      Promise.all(local.map(c => saveCompetitionToFirebase(c).catch(() => { /* ignore */ })))
        .then(() => localStorage.setItem('adventure-competitions-migrated', 'true'))
    } catch { /* ignore parse errors */ }
  }, [])

  const [filter, setFilter] = useState<FilterId>('alle')

  // ── Standardkonkurranser
  const standards = useMemo(() => getStandardCompetitions(), [])

  // Gruppér standards per fag, behold A/B-rekkefølge per gruppe
  const standardsBySubject = useMemo(() => {
    const map = new Map<string, Competition[]>()
    for (const s of standards) {
      const sub = normalizeSubjectId(s.subject)
      if (!matchesFilter(s.subject, filter, ownSubjects)) continue
      if (!map.has(sub)) map.set(sub, [])
      map.get(sub)!.push(s)
    }
    // Sortér variantene A-B-rekkefølge ved hjelp av tittelen
    for (const arr of map.values()) {
      arr.sort((a, b) => a.title.localeCompare(b.title, 'nb-NO'))
    }
    return map
  }, [standards, filter, ownSubjects])

  // Default-ekspanderte fag = lærerens aktive fag (hvis filteret tillater det)
  const [expandedFag, setExpandedFag] = useState<Set<string>>(() => {
    const init = new Set<string>()
    if (activeClass?.subject) init.add(activeClass.subject)
    return init
  })

  function toggleFag(sub: string) {
    setExpandedFag(prev => {
      const next = new Set(prev)
      if (next.has(sub)) next.delete(sub)
      else next.add(sub)
      return next
    })
  }

  // ── Start-modal for standard
  const [pendingStdId, setPendingStdId] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)
  const pendingStd = pendingStdId ? standards.find(s => s.id === pendingStdId) ?? null : null

  async function confirmStartStandard() {
    if (!pendingStdId) return
    setStarting(true)
    try {
      const newCode = await startStandardCompetition(pendingStdId)
      navigate(`/competition/live/${newCode}`)
    } catch (err) {
      console.error(err)
      alert('Kunne ikke starte: ' + (err instanceof Error ? err.message : 'ukjent feil'))
      setStarting(false)
      setPendingStdId(null)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  const filteredOwn = competitions.filter(c => matchesFilter(c.subject, filter, ownSubjects))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Konkurranser</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Kahoot-stil konkurranse med ledertavle for klassen</p>
        </div>
        <button
          onClick={() => navigate('/competition/build')}
          style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + Ny konkurranse
        </button>
      </div>

      {/* Filter-pills (gjelder begge seksjoner) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {FILTER_OPTIONS.map(f => {
          const active = filter === f.id
          const disabled = f.id === 'mitt-fag' && ownSubjects.size === 0
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              disabled={disabled}
              title={disabled ? 'Du har ingen klasser med valgt fag ennå' : ''}
              style={{
                padding: '6px 12px', borderRadius: 999,
                border: active ? '1.5px solid #0d9488' : '1px solid var(--border)',
                background: active ? 'rgba(13,148,136,0.1)' : 'var(--card-bg)',
                color: active ? '#0d9488' : 'var(--text-muted)',
                fontSize: 12, fontWeight: active ? 600 : 400,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : 1, fontFamily: 'inherit',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* ── Standardkonkurranser ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>
          📚 Standardkonkurranser
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 14px' }}>
          24 ferdiglagde konkurranser — klar til kjøring med ett klikk. Cross-school leaderboard er PÅ.
        </p>

        {standardsBySubject.size === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: '12px 0' }}>
            Ingen standardkonkurranser matcher filteret.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...standardsBySubject.entries()].map(([sub, items]) => {
              const fagOpt = MINE_FAG_OPTIONS.find(o => o.id === sub)
              const fagLabel = fagOpt?.label ?? sub
              const isOpen = expandedFag.has(sub)
              return (
                <div key={sub} style={{ border: '1px solid var(--border)', borderRadius: 10, background: 'var(--card-bg)', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleFag(sub)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{fagLabel}</span>
                      {fagOpt?.short && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: 'rgba(13,148,136,0.12)', color: '#0d9488' }}>{fagOpt.short}</span>
                      )}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>{items.length} {items.length === 1 ? 'variant' : 'varianter'}</span>
                      <span>{isOpen ? '▾' : '▸'}</span>
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, padding: '0 14px 14px' }}>
                      {items.map(s => {
                        // Trekk variant fra ID-suffix («…-a» / «…-b»)
                        const variant = s.id.endsWith('-a') ? 'A' : s.id.endsWith('-b') ? 'B' : '?'
                        return (
                          <div
                            key={s.id}
                            style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12, background: 'var(--bg-secondary, var(--bg-primary))' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: '#0d9488', color: '#fff' }}>VARIANT {variant}</span>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.questions.length} sp.</span>
                            </div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.3 }}>
                              {s.title.replace(/ — Variant [AB]$/, '')}
                            </p>
                            <button
                              onClick={() => setPendingStdId(s.id)}
                              style={{ width: '100%', background: '#0d9488', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                              Start →
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Mine konkurranser ─────────────────────────────────────────────── */}
      <section>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 14px' }}>Mine konkurranser</h3>

        {filteredOwn.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🏆</p>
            <p style={{ fontWeight: 500, marginBottom: 4 }}>{competitions.length === 0 ? 'Ingen konkurranser ennå' : 'Ingen konkurranser matcher filteret'}</p>
            {competitions.length === 0 && (
              <p style={{ fontSize: 13 }}>Opprett en konkurranse og del koden med elevene dine.</p>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...filteredOwn].reverse().map(c => {
              const subjShort = MINE_FAG_OPTIONS.find(o => o.id === normalizeSubjectId(c.subject))?.short
              return (
                <div
                  key={c.id}
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{c.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      {subjShort && (
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: 'rgba(13,148,136,0.12)', color: '#0d9488' }}>{subjShort}</span>
                      )}
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Kode: <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0d9488', fontSize: 14 }}>{c.code}</span></span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.questions.length} spørsmål</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => navigate(`/competition/leaderboard/${c.code}`)}
                      style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      Ledertavle
                    </button>
                    <button
                      onClick={() => navigate(`/competition/live/${c.code}`)}
                      style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      Start ny runde →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Start-modal for standardkonkurranser ─────────────────────────── */}
      {pendingStd && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}
          onClick={() => !starting && setPendingStdId(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 420, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, color: 'var(--text-primary)' }}
          >
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 6px' }}>
              Start «{pendingStd.title.replace(/ — Variant [AB]$/, '')}»?
            </h3>
            {activeClass ? (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 14px' }}>
                For klasse <strong style={{ color: 'var(--text-primary)' }}>{activeClass.name}</strong>
              </p>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 14px' }}>
                (Ingen aktiv klasse valgt — elevene kan fortsatt bli med via koden.)
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-muted)', marginBottom: 18, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-secondary, rgba(0,0,0,0.03))', border: '1px solid var(--border)' }}>
              <div><strong style={{ color: 'var(--text-primary)' }}>Fag:</strong> {MINE_FAG_OPTIONS.find(o => o.id === normalizeSubjectId(pendingStd.subject))?.label ?? pendingStd.subject}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Variant:</strong> {pendingStd.id.endsWith('-a') ? 'A' : 'B'}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Spørsmål:</strong> {pendingStd.questions.length}</div>
              <div><strong style={{ color: '#0d9488' }}>📊 Cross-school leaderboard:</strong> PÅ</div>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPendingStdId(null)}
                disabled={starting}
                style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: starting ? 'not-allowed' : 'pointer', fontSize: 13, fontFamily: 'inherit' }}
              >
                Avbryt
              </button>
              <button
                onClick={confirmStartStandard}
                disabled={starting}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: starting ? '#9ca3af' : '#0d9488', color: '#fff', cursor: starting ? 'wait' : 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}
              >
                {starting ? 'Starter…' : 'Start konkurranse →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
