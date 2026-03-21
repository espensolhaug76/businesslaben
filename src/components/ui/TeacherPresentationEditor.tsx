import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TeacherSlide, TeacherSlideType } from '../../types/TeacherSlide'
import { loadTeacherSlides, saveTeacherSlides } from '../../types/TeacherSlide'

export interface SlideInfo {
  label: string
  kind: 'original' | 'quiz' | 'teacher'
}

interface Props {
  presentationRoute: string
  onSlidesChange: (slides: TeacherSlide[]) => void
  currentSlide: number
  slideInfos: SlideInfo[]
  onJumpTo: (index: number) => void
  hiddenSlides: number[]
  onHideToggle: (index: number) => void
}

const SLIDE_TYPES: { type: TeacherSlideType; label: string; icon: string }[] = [
  { type: 'text',     label: 'Tekst',      icon: '📝' },
  { type: 'bullets',  label: 'Punktliste', icon: '📋' },
  { type: 'quote',    label: 'Sitat',      icon: '💬' },
  { type: 'image',    label: 'Bilde',      icon: '🖼️' },
  { type: 'question', label: 'Spørsmål',   icon: '❓' },
]

const KIND_COLORS: Record<SlideInfo['kind'], { bg: string; border: string; accent: string }> = {
  original: { bg: 'rgba(56,189,248,0.06)',  border: 'rgba(56,189,248,0.25)',  accent: '#38bdf8' },
  quiz:     { bg: 'rgba(139,92,246,0.06)',  border: 'rgba(139,92,246,0.25)', accent: '#a78bfa' },
  teacher:  { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.35)', accent: '#f59e0b' },
}

function genId() { return Math.random().toString(36).slice(2, 9) }

const inp: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8, padding: '9px 12px', color: '#f1f5f9', fontSize: 13,
  fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', outline: 'none',
}
const ta: React.CSSProperties = { ...inp, resize: 'vertical' as const }

// ── Mini slide preview content ───────────────────────────────────────────────
function SlidePreviewContent({ info, slide }: { info: SlideInfo; slide?: TeacherSlide }) {
  const col = KIND_COLORS[info.kind]

  if (info.kind === 'original') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: col.accent }}>{info.label}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ height: 4, borderRadius: 2, background: 'rgba(56,189,248,0.2)', flex: i === 0 ? 2 : 1 }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.07)', width: `${75 - i * 10}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (info.kind === 'quiz') {
    return (
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: col.accent, marginBottom: 8 }}>Quiz</div>
        <div style={{ fontSize: 12, color: '#e2e8f0', lineHeight: 1.4, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {info.label}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {['A','B','C','D'].map(l => (
            <div key={l} style={{ background: 'rgba(139,92,246,0.15)', borderRadius: 4, padding: '3px 6px', fontSize: 10, color: '#a78bfa', fontWeight: 700 }}>{l}</div>
          ))}
        </div>
      </div>
    )
  }

  // Teacher slide — show real content
  if (!slide) return null
  return (
    <div style={{ padding: '12px 14px' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: col.accent, marginBottom: 6 }}>
        {SLIDE_TYPES.find(t => t.type === slide.type)?.icon} {SLIDE_TYPES.find(t => t.type === slide.type)?.label}
      </div>
      {slide.type === 'text' && (
        <>
          {slide.title && <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 4, lineHeight: 1.3 }}>{slide.title}</div>}
          {slide.body && <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{slide.body}</div>}
        </>
      )}
      {slide.type === 'bullets' && (
        <>
          {slide.title && <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{slide.title}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {(slide.bullets ?? []).filter(Boolean).slice(0, 4).map((b, i) => (
              <div key={i} style={{ fontSize: 11, color: '#94a3b8', display: 'flex', gap: 5 }}>
                <span style={{ color: '#38bdf8', flexShrink: 0 }}>→</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {slide.type === 'quote' && (
        <div style={{ borderLeft: '3px solid #38bdf8', paddingLeft: 8 }}>
          <div style={{ fontSize: 12, fontStyle: 'italic', color: '#e2e8f0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            "{slide.quote}"
          </div>
          {slide.attribution && <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>— {slide.attribution}</div>}
        </div>
      )}
      {slide.type === 'image' && (
        <>
          {slide.title && <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{slide.title}</div>}
          {slide.imageUrl
            ? <img src={slide.imageUrl} alt="" style={{ width: '100%', height: 64, objectFit: 'cover', borderRadius: 6 }} />
            : <div style={{ width: '100%', height: 64, background: 'rgba(255,255,255,0.05)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🖼️</div>
          }
          {slide.caption && <div style={{ fontSize: 10, color: '#64748b', marginTop: 4, fontStyle: 'italic' }}>{slide.caption}</div>}
        </>
      )}
      {slide.type === 'question' && (
        <div style={{ background: 'rgba(249,115,22,0.1)', borderRadius: 6, padding: '8px 10px' }}>
          <div style={{ fontSize: 11, color: '#fb923c', marginBottom: 4 }}>Diskusjon</div>
          <div style={{ fontSize: 12, color: '#f1f5f9', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {slide.body ?? slide.title}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Edit form ────────────────────────────────────────────────────────────────
interface SlideFormProps {
  type: TeacherSlideType
  form: Partial<TeacherSlide>
  setForm: React.Dispatch<React.SetStateAction<Partial<TeacherSlide>>>
}

function SlideForm({ type, form, setForm }: SlideFormProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(type === 'text' || type === 'bullets' || type === 'image') && (
        <input placeholder="Tittel" value={form.title ?? ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inp} />
      )}
      {type === 'text' && (
        <textarea placeholder="Brødtekst" value={form.body ?? ''} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={4} style={ta} />
      )}
      {type === 'bullets' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[0,1,2,3,4,5].map(i => (
            <input key={i} placeholder={`Punkt ${i + 1}`} value={(form.bullets ?? [])[i] ?? ''} onChange={e => {
              const b = [...(form.bullets ?? ['','','','','',''])]
              b[i] = e.target.value
              setForm(f => ({ ...f, bullets: b }))
            }} style={inp} />
          ))}
        </div>
      )}
      {type === 'quote' && (
        <>
          <textarea placeholder="Sitat" value={form.quote ?? ''} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} rows={3} style={ta} />
          <input placeholder="Hvem sa det? (valgfritt)" value={form.attribution ?? ''} onChange={e => setForm(f => ({ ...f, attribution: e.target.value }))} style={inp} />
        </>
      )}
      {type === 'image' && (
        <>
          <input placeholder="Bilde-URL" value={form.imageUrl ?? ''} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} style={inp} />
          <input placeholder="Bildetekst (valgfritt)" value={form.caption ?? ''} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} style={inp} />
        </>
      )}
      {type === 'question' && (
        <textarea placeholder="Diskusjonsspørsmål" value={form.body ?? ''} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={3} style={ta} />
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function TeacherPresentationEditor({
  presentationRoute,
  onSlidesChange,
  currentSlide,
  slideInfos,
  onJumpTo,
  hiddenSlides,
  onHideToggle,
}: Props) {
  const [open, setOpen] = useState(false)
  const [slides, setSlides] = useState<TeacherSlide[]>(() => loadTeacherSlides(presentationRoute))
  const [adding, setAdding] = useState<TeacherSlideType | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<TeacherSlide>>({})
  const activeRef = useRef<HTMLDivElement>(null)

  const isTeacher = typeof localStorage !== 'undefined' && !!localStorage.getItem('teacher-classroom-code')

  // Expose editor-open state so the presentation close button can check it
  useEffect(() => {
    ;(window as Record<string, unknown>).__adventureEditorOpen = open
    return () => { ;(window as Record<string, unknown>).__adventureEditorOpen = false }
  }, [open])

  // Scroll active slide into view when panel opens or slide changes
  useEffect(() => {
    if (!open) return
    setTimeout(() => activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }, [currentSlide, open])

  if (!isTeacher) return null

  function save(updated: TeacherSlide[]) {
    setSlides(updated)
    saveTeacherSlides(presentationRoute, updated)
    onSlidesChange(updated)
  }

  function startEdit(s: TeacherSlide) {
    setAdding(null)
    setEditingId(s.id)
    setForm({ ...s })
  }

  function saveEdit() {
    if (!editingId) return
    save(slides.map(s => s.id === editingId ? { ...s, ...form } : s))
    setEditingId(null)
    setForm({})
  }

  function cancelEdit() {
    setEditingId(null)
    setForm({})
  }

  function addSlide() {
    if (!adding) return
    const slide: TeacherSlide = { id: genId(), type: adding, ...form, createdAt: new Date().toISOString() }
    save([...slides, slide])
    setAdding(null)
    setForm({})
  }

  function deleteSlide(id: string) { save(slides.filter(s => s.id !== id)) }

  function moveSlide(id: string, dir: -1 | 1) {
    const idx = slides.findIndex(s => s.id === id)
    if (idx < 0) return
    const next = [...slides]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    save(next)
  }

  const hiddenSet = new Set(hiddenSlides)

  // Build a lookup: global slide index → teacher slide (for teacher-kind slides)
  let teacherSlideIdx = 0
  const teacherSlideByGlobalIdx: Record<number, TeacherSlide> = {}
  slideInfos.forEach((info, i) => {
    if (info.kind === 'teacher') {
      teacherSlideByGlobalIdx[i] = slides[teacherSlideIdx++]
    }
  })

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Rediger presentasjon"
        style={{
          position: 'fixed', bottom: 80, right: 20, zIndex: 200,
          background: open ? '#f59e0b' : 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.4)',
          borderRadius: '50%', width: 48, height: 48, fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', color: open ? '#030712' : '#f59e0b',
        }}
      >✏️</button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 199,
              width: 420, background: '#0f172a',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', flexDirection: 'column',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {/* Header */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', margin: 0 }}>Rediger presentasjon</p>
                <p style={{ fontSize: 11, color: '#475569', margin: 0 }}>
                  {slideInfos.length} lysbilder totalt · {slides.length} egne
                  <span style={{ marginLeft: 12 }}>
                    <span style={{ color: '#38bdf8' }}>● </span>original
                    <span style={{ color: '#a78bfa', marginLeft: 8 }}>● </span>quiz
                    <span style={{ color: '#f59e0b', marginLeft: 8 }}>● </span>ditt
                  </span>
                </p>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#475569', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>

            {/* ── Vertical slide list ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>

              {slideInfos.map((info, i) => {
                const col = KIND_COLORS[info.kind]
                const isActive = i === currentSlide
                const isHidden = hiddenSet.has(i)
                const teacherSlide = teacherSlideByGlobalIdx[i]
                const isEditing = teacherSlide ? editingId === teacherSlide.id : false
                const isTeacherKind = info.kind === 'teacher'

                return (
                  <div
                    key={i}
                    ref={isActive ? activeRef : null}
                    style={{ borderRadius: 12, overflow: 'hidden', border: isActive ? `2px solid ${col.accent}` : `1px solid ${col.border}`, background: col.bg, opacity: isHidden ? 0.45 : 1, transition: 'all 0.15s' }}
                  >
                    {/* Slide number bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(0,0,0,0.2)', borderBottom: `1px solid ${col.border}` }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? col.accent : '#475569' }}>
                        {i + 1}
                        {isActive && <span style={{ marginLeft: 6, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>▶ nå</span>}
                      </span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {isTeacherKind && teacherSlide && !isEditing && (
                          <>
                            <button onClick={e => { e.stopPropagation(); moveSlide(teacherSlide.id, -1) }} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 12, padding: '1px 4px' }} title="Flytt opp">↑</button>
                            <button onClick={e => { e.stopPropagation(); moveSlide(teacherSlide.id, 1) }} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 12, padding: '1px 4px' }} title="Flytt ned">↓</button>
                            <button onClick={e => { e.stopPropagation(); deleteSlide(teacherSlide.id) }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 14, padding: '1px 4px' }} title="Slett">×</button>
                          </>
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); onHideToggle(i) }}
                          title={isHidden ? 'Vis for elever' : 'Skjul for elever'}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, padding: '1px 4px', color: isHidden ? col.accent : '#475569' }}
                        >
                          {isHidden ? '👁' : '🚫'}
                        </button>
                      </div>
                    </div>

                    {/* Preview area — click to navigate (all slides) or edit (teacher slides) */}
                    <div
                      onClick={() => {
                        onJumpTo(i)
                        if (isTeacherKind && teacherSlide && !isEditing) startEdit(teacherSlide)
                      }}
                      style={{ cursor: isTeacherKind ? 'text' : 'pointer', minHeight: 90 }}
                    >
                      <SlidePreviewContent info={info} slide={teacherSlide} />
                    </div>

                    {/* Inline edit form for teacher slides */}
                    {isEditing && (
                      <div style={{ padding: '12px 14px', borderTop: `1px solid ${col.border}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <SlideForm type={teacherSlide!.type} form={form} setForm={setForm} />
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={saveEdit} style={{ flex: 1, background: '#f59e0b', border: 'none', borderRadius: 8, padding: '9px', color: '#030712', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Lagre</button>
                          <button onClick={cancelEdit} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '9px 14px', color: '#94a3b8', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Avbryt</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* ── Add new slide ── */}
              <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {!adding ? (
                  <>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: '0 0 10px' }}>Legg til lysbilde</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {SLIDE_TYPES.map(t => (
                        <button key={t.type} onClick={() => { setAdding(t.type); setEditingId(null); setForm({}) }}
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 8px', color: '#e2e8f0', fontSize: 13, cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)')}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                        >
                          <span style={{ display: 'block', fontSize: 22, marginBottom: 4 }}>{t.icon}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b', margin: 0 }}>
                        {SLIDE_TYPES.find(t => t.type === adding)?.icon} {SLIDE_TYPES.find(t => t.type === adding)?.label}
                      </p>
                      <button onClick={() => { setAdding(null); setForm({}) }} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 13 }}>Avbryt</button>
                    </div>
                    <SlideForm type={adding} form={form} setForm={setForm} />
                    <button onClick={addSlide}
                      style={{ background: '#f59e0b', border: 'none', borderRadius: 8, padding: '10px', color: '#030712', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Legg til lysbilde
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
