import type { TeacherSlide } from '../../../types/TeacherSlide'

interface Props {
  slide: TeacherSlide
  index: number
  total: number
}

export default function TeacherSlideRenderer({ slide, index, total }: Props) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 900,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      {/* Teacher badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f59e0b' }}>
          Lærerens lysbilde
        </span>
      </div>

      {slide.type === 'text' && (
        <div>
          {slide.title && <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '1rem', lineHeight: 1.2 }}>{slide.title}</h2>}
          {slide.body && <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', color: '#94a3b8', lineHeight: 1.8 }}>{slide.body}</p>}
        </div>
      )}

      {slide.type === 'bullets' && (
        <div>
          {slide.title && <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.5rem', lineHeight: 1.2 }}>{slide.title}</h2>}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(slide.bullets ?? []).filter(Boolean).map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', color: '#cbd5e1', lineHeight: 1.6 }}>
                <span style={{ color: '#38bdf8', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {slide.type === 'quote' && (
        <div style={{ padding: '2rem 2.5rem', borderLeft: '4px solid #38bdf8', background: 'rgba(56,189,248,0.05)', borderRadius: '0 1rem 1rem 0' }}>
          <p style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontStyle: 'italic', color: '#f1f5f9', lineHeight: 1.6, marginBottom: slide.attribution ? '1rem' : 0 }}>
            "{slide.quote}"
          </p>
          {slide.attribution && (
            <p style={{ fontSize: '1rem', color: '#64748b', fontWeight: 600 }}>— {slide.attribution}</p>
          )}
        </div>
      )}

      {slide.type === 'image' && (
        <div style={{ textAlign: 'center' }}>
          {slide.title && <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '1rem' }}>{slide.title}</h2>}
          {slide.imageUrl && (
            <img src={slide.imageUrl} alt={slide.caption ?? slide.title ?? ''} style={{ maxWidth: '100%', maxHeight: '55vh', borderRadius: '1rem', objectFit: 'contain' }} />
          )}
          {slide.caption && <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.75rem', fontStyle: 'italic' }}>{slide.caption}</p>}
        </div>
      )}

      {slide.type === 'question' && (
        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '1.5rem', padding: '2.5rem' }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#fb923c', marginBottom: '1.5rem' }}>
            Diskusjonsspørsmål
          </p>
          <p style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.4 }}>
            {slide.body ?? slide.title}
          </p>
        </div>
      )}
    </div>
  )
}
