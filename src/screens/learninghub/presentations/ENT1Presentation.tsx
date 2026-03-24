import { useState, useEffect, useCallback, useRef } from 'react'
import { useLiveSync } from '../../../lib/useLiveSync'
import { ref as fbRef, update as fbUpdate } from 'firebase/database'
import { db } from '../../../lib/firebase'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import QuizSlide from './QuizSlide'
import type { QuizQuestion } from './QuizSlide'
import TeacherPresentationEditor, { type SlideInfo } from '../../../components/ui/TeacherPresentationEditor'
import TeacherSlideRenderer from './TeacherSlideRenderer'
import { loadTeacherSlides, loadHiddenSlides, saveHiddenSlides } from '../../../types/TeacherSlide'
import type { TeacherSlide } from '../../../types/TeacherSlide'

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er den beste beskrivelsen av entreprenørskap?',
    options: [
      'Å starte en bedrift kun for å tjene penger',
      'Å identifisere muligheter og mobilisere ressurser for å skape verdi',
      'Å arve en familiebedrift og drive den videre',
      'Å jobbe som selvstendig næringsdrivende uten ansatte',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva er intraprenørskap?',
    options: [
      'Å starte en bedrift sammen med internasjonale partnere',
      'Innovasjon innad i eksisterende bedrifter der ansatte opptrer som entreprenører',
      'Å investere i andres gründerprosjekter',
      'En type franchisemodell for oppstartsbedrifter',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva er SCAMPER-metoden brukt til?',
    options: [
      'En finansieringsmetode for oppstartsbedrifter',
      'En kreativitetsteknikk for idéutvikling (Substitute, Combine, Adapt, Modify, Put to use, Eliminate, Reverse)',
      'En metode for å analysere konkurrenter i markedet',
      'En juridisk prosess for å registrere et varemerke',
    ],
    correct: 1,
    timeSeconds: 45,
  },
]

const ORIGINAL_SLIDES = 10
const TOTAL_SLIDES = ORIGINAL_SLIDES + QUIZ_SLIDES.length

let _isLive = false
let _lastWritten = -1

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  if (_isLive) return null
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={e => { if (!disabled) { (e.currentTarget as HTMLElement).style.background = '#38bdf8'; (e.currentTarget as HTMLElement).style.color = '#030712'; (e.currentTarget as HTMLElement).style.borderColor = '#38bdf8' } }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = disabled ? '#334155' : '#f1f5f9'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
      style={{ background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1.8rem', borderRadius: 99, color: disabled ? '#334155' : '#f1f5f9', fontWeight: 600, fontSize: 15, cursor: disabled ? 'default' : 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
    >{children}</button>
  )
}

function Glass({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3rem', width: '100%', maxWidth: 1200, padding: '4rem' }}>
      {children}
    </div>
  )
}

function SlideLabel({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', marginBottom: 16, textTransform: 'uppercase' }}>{children}</h2>
}

function SlideImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)' }} />
}

const twoCol: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }
const bodyText: React.CSSProperties = { fontSize: 18, color: '#cbd5e1', lineHeight: 1.7 }

function Slide0({ onNext, onStartLiveSession }: { onNext: () => void; onStartLiveSession: () => void }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.5em', marginBottom: 16, display: 'block', textTransform: 'uppercase', fontSize: 14 }}>ENT1 | Entreprenørskap og Bedriftsutvikling</span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Fra idé til<br /><span style={{ color: '#38bdf8', fontStyle: 'italic' }}>virkelighet</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>Kapittel 1 og 2 – Innovatøren, entreprenøren og kreativ idéutvikling.</p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={onNext}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#38bdf8'; (e.currentTarget as HTMLElement).style.color = '#030712' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9' }}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem 3rem', borderRadius: 99, fontSize: 18, fontWeight: 600, color: '#f1f5f9', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
        >
          Start Presentasjon →
        </button>
        <button
          onClick={onStartLiveSession}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.25)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.08)' }}
          style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.3)', padding: '1rem 2rem', borderRadius: 99, fontSize: 16, fontWeight: 600, color: '#38bdf8', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
        >
          📡 Start live sesjon
        </button>
      </div>
    </div>
  )
}

function Slide1() {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 1 – Slide 1</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Hva er entreprenørskap?</h2>
          <p style={bodyText}>Å identifisere muligheter og mobilisere ressurser for å skape verdi – enten økonomisk, sosialt eller kulturelt.</p>
          <p style={{ ...bodyText, marginTop: 16 }}>Entreprenørskap er en arbeidsmåte og en holdning til problemløsning – ikke bare det å starte bedrift.</p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80" alt="Entreprenørskap" />
      </div>
    </Glass>
  )
}

function Slide2() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>Kapittel 1 – Slide 2</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>Innovasjonstyper (Schumpeter)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { tittel: 'Produktinnovasjon', tekst: 'Nye eller forbedrede produkter og tjenester.', farge: '#38bdf8' },
            { tittel: 'Prosessinnovasjon', tekst: 'Nye og mer effektive måter å produsere på.', farge: '#4ade80' },
            { tittel: 'Markedsinnovasjon', tekst: 'Nye markeder eller nye måter å nå kunder på.', farge: '#fbbf24' },
            { tittel: 'Organisasjonsinnovasjon', tekst: 'Nye måter å organisere og lede virksomheten.', farge: '#f87171' },
          ].map(item => (
            <div key={item.tittel} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.04)', border: `1px solid ${item.farge}40`, borderRadius: 20 }}>
              <div style={{ fontWeight: 800, color: item.farge, fontSize: 17, marginBottom: 10 }}>{item.tittel}</div>
              <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{item.tekst}</p>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

function Slide3() {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Gründeregenskaper" />
        <div>
          <SlideLabel>Kapittel 1 – Slide 3</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Egenskaper hos en gründer</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Utholdenhet – aldri gi opp', 'Risikovilje – tåle usikkerhet', 'Kreativitet – tenke nytt', 'Sosiale ferdigheter – bygge nettverk', 'Læring av feil – "Fail fast, learn faster"'].map(e => (
              <div key={e} style={{ padding: '0.75rem 1.25rem', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12, color: '#cbd5e1', fontSize: 16 }}>
                ✓ {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Glass>
  )
}

function Slide4() {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 1 – Slide 4</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Intraprenørskap</h2>
          <p style={bodyText}>Innovasjon innad i eksisterende bedrifter. Ansatte som opptrer som entreprenører i jobben sin.</p>
          <div style={{ marginTop: 24, padding: '1.5rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 20 }}>
            <p style={{ color: '#38bdf8', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Eksempel</p>
            <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, margin: 0 }}>Post-it-lappen ble oppfunnet av en 3M-ansatt som eksperimenterte med lim i sin egen arbeidstid.</p>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Intraprenørskap" />
      </div>
    </Glass>
  )
}

function Slide5() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>Kapittel 1 – Slide 5</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>Verdiskaping og bærekraftig entreprenørskap</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
          {[
            { type: 'Økonomisk verdi', tekst: 'Overskudd og lønnsomhet for eiere og investorer.' },
            { type: 'Sosial verdi', tekst: 'Nytte for samfunnet – arbeidsplasser, velferd.' },
            { type: 'Kulturell verdi', tekst: 'Opplevelser og kulturelle bidrag til fellesskapet.' },
          ].map(item => (
            <div key={item.type} style={{ padding: '1.5rem', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 20 }}>
              <div style={{ fontWeight: 800, color: '#38bdf8', fontSize: 16, marginBottom: 12 }}>{item.type}</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.tekst}</p>
            </div>
          ))}
        </div>
        <p style={{ ...bodyText, marginTop: 24, fontSize: 16 }}>Bærekraftig entreprenørskap løser sosiale eller miljømessige utfordringer gjennom en lønnsom forretningsmodell.</p>
      </div>
    </Glass>
  )
}

function Slide6() {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Kreativitet" />
        <div>
          <SlideLabel>Kapittel 2 – Slide 1</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Hva er kreativitet?</h2>
          <p style={bodyText}>Evnen til å skape noe som er både nytt og nyttig i en gitt kontekst.</p>
          <p style={{ ...bodyText, marginTop: 16 }}>Den kreative prosessen: Forberedelse → Inkubasjon → Illuminasjon (aha-opplevelse) → Verifikasjon.</p>
        </div>
      </div>
    </Glass>
  )
}

function Slide7() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>Kapittel 2 – Slide 2</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>SCAMPER-metoden</h2>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { bokstav: 'S', ord: 'Substitute', norsk: 'Erstatt' },
            { bokstav: 'C', ord: 'Combine', norsk: 'Kombiner' },
            { bokstav: 'A', ord: 'Adapt', norsk: 'Tilpass' },
            { bokstav: 'M', ord: 'Modify', norsk: 'Endre' },
            { bokstav: 'P', ord: 'Put to use', norsk: 'Ny bruk' },
            { bokstav: 'E', ord: 'Eliminate', norsk: 'Fjern' },
            { bokstav: 'R', ord: 'Reverse', norsk: 'Snu' },
          ].map(item => (
            <div key={item.bokstav} style={{ padding: '1rem 1.25rem', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 16, textAlign: 'center', minWidth: 110 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#38bdf8', marginBottom: 4 }}>{item.bokstav}</div>
              <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13 }}>{item.ord}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>{item.norsk}</div>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

function Slide8() {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 2 – Slide 3</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Design Thinking</h2>
          <p style={bodyText}>En brukersentrert metode med fem faser:</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['1. Empati – forstå brukeren', '2. Definere – formuler problemet', '3. Idéutvikling – generer løsninger', '4. Prototype – bygg raskt', '5. Testing – lær av brukerne'].map(fase => (
              <div key={fase} style={{ padding: '0.75rem 1rem', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, color: '#cbd5e1', fontSize: 15 }}>{fase}</div>
            ))}
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80" alt="Design Thinking" />
      </div>
    </Glass>
  )
}

function Slide9() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <SlideLabel>Oppsummering</SlideLabel>
        <h2 style={{ fontSize: 52, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Nøkkelpunkter</h2>
        <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 24, padding: '2.5rem', textAlign: 'left' }}>
          {[
            'Entreprenørskap handler om å skape verdi – ikke bare profitt',
            'Det finnes fire innovasjonstyper: produkt, prosess, marked og organisasjon',
            'Intraprenørskap er innovasjon innad i eksisterende bedrifter',
            'Kreativitet kan trenes opp gjennom teknikker som SCAMPER og Design Thinking',
            'Feiling er en forutsetning for læring og innovasjon',
          ].map((punkt, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 4 ? 16 : 0 }}>
              <span style={{ color: '#38bdf8', fontWeight: 800, minWidth: 24 }}>{i + 1}.</span>
              <span style={{ color: '#cbd5e1', fontSize: 17, lineHeight: 1.6 }}>{punkt}</span>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

export default function ENT1Presentation() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const { liveSlide, isStudentLive, teacherLiveCode } = useLiveSync()
  const liveCode = teacherLiveCode ?? (isStudentLive ? localStorage.getItem('student-classroom-code') : null)
  const fromFirebaseRef = useRef(false)
  useEffect(() => { if (liveSlide !== null) { fromFirebaseRef.current = true; setCurrent(liveSlide) } }, [liveSlide])
  _isLive = isStudentLive
  useEffect(() => {
    if (!teacherLiveCode) return
    if (fromFirebaseRef.current) { fromFirebaseRef.current = false; return }
    if (current + 1 === _lastWritten) return
    _lastWritten = current + 1
    fbUpdate(fbRef(db, 'sessions/' + teacherLiveCode), { currentSlide: current + 1, quizRevealedSlide: null })
  }, [current, teacherLiveCode])
  const PRESENTATION_ROUTE = window.location.pathname
  const [teacherSlides, setTeacherSlides] = useState<TeacherSlide[]>(() => loadTeacherSlides(window.location.pathname))
  const [hiddenSlides, setHiddenSlides] = useState<number[]>(() => loadHiddenSlides(PRESENTATION_ROUTE))
  const TEACHER_SLIDE_COUNT = teacherSlides.length
  const TOTAL_SLIDES_WITH_TEACHER = TOTAL_SLIDES + TEACHER_SLIDE_COUNT
  const slideInfos: SlideInfo[] = [
    ...Array.from({ length: ORIGINAL_SLIDES }, (_, i) => ({ label: `Lysbilde ${i + 1}`, kind: 'original' as const })),
    ...QUIZ_SLIDES.map((q, _i) => ({ label: q.question.slice(0, 18), kind: 'quiz' as const })),
    ...teacherSlides.map(s => ({ label: s.title ?? s.quote ?? s.body ?? 'Eget lysbilde', kind: 'teacher' as const })),
  ]
  const [modal, setModal] = useState<{ title: string; text: string } | null>(null)
  const [livePin, setLivePin] = useState<string | null>(null)
  const [showPinModal, setShowPinModal] = useState(false)
  const closeModal = useCallback(() => setModal(null), [])
  function handleHideToggle(idx: number) {
    setHiddenSlides(prev => {
      const next = prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      saveHiddenSlides(PRESENTATION_ROUTE, next)
      return next
    })
  }

  const next = useCallback(() => {
    setCurrent(c => {
      let n = c + 1
      while (n < TOTAL_SLIDES_WITH_TEACHER - 1 && hiddenSlides.includes(n)) n++
      return Math.min(n, TOTAL_SLIDES_WITH_TEACHER - 1)
    })
  }, [TOTAL_SLIDES_WITH_TEACHER, hiddenSlides])
  const prev = useCallback(() => {
    setCurrent(c => {
      let n = c - 1
      while (n > 0 && hiddenSlides.includes(n)) n--
      return Math.max(n, 0)
    })
  }, [hiddenSlides])

  function startLiveSession() {
    const pin = String(Math.floor(1000 + Math.random() * 9000))
    localStorage.setItem(`adventure-live-session-${pin}`, JSON.stringify({
      pin,
      currentSlide: 0,
      activeQuestion: null,
      questionRevealed: false,
      status: 'active',
      presentationName: 'Innovatøren og entreprenøren',
    }))
    setLivePin(pin)
    setShowPinModal(true)
  }

  useEffect(() => {
    if (!livePin) return
    const isQuiz = current >= ORIGINAL_SLIDES
    const activeQuestion = isQuiz ? QUIZ_SLIDES[current - ORIGINAL_SLIDES] ?? null : null
    const key = `adventure-live-session-${livePin}`
    try {
      const s = JSON.parse(localStorage.getItem(key) ?? '{}') as Record<string, unknown>
      localStorage.setItem(key, JSON.stringify({ ...s, currentSlide: current, activeQuestion: activeQuestion ?? null, questionRevealed: false }))
    } catch {}
  }, [current, livePin])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (modal) { if (e.key === 'Escape') closeModal(); return }
      if (showPinModal) { if (e.key === 'Escape') setShowPinModal(false); return }
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal, showPinModal, next, prev, closeModal, navigate])
  const progressPct = ((current + 1) / TOTAL_SLIDES_WITH_TEACHER) * 100
  return (
    <div style={{ background: '#030712', color: '#f1f5f9', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet" />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 4, background: 'rgba(255,255,255,0.05)', zIndex: 1000 }}>
        <div style={{ width: `${progressPct}%`, height: '100%', background: '#38bdf8', transition: 'width 0.4s' }} />
      </div>
      <button
        onClick={() => navigate(-1)}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.15)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
        style={{ position: 'fixed', top: 16, left: 20, zIndex: 100, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: 99, color: '#94a3b8', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
      >← Tilbake</button>
      <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 100, display: 'flex', alignItems: 'center', gap: 12 }}>
        {livePin && (
          <button
            onClick={() => setShowPinModal(true)}
            style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', padding: '0.3rem 0.75rem', borderRadius: 8, color: '#38bdf8', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
          >
            📡 {livePin}
          </button>
        )}
        <span style={{ color: '#475569', fontSize: 13 }}>{current + 1} / {TOTAL_SLIDES_WITH_TEACHER}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          {current === 0 && <Slide0 onNext={next} onStartLiveSession={startLiveSession} />}
          {current === 1 && <Slide1 />}
          {current === 2 && <Slide2 />}
          {current === 3 && <Slide3 />}
          {current === 4 && <Slide4 />}
          {current === 5 && <Slide5 />}
          {current === 6 && <Slide6 />}
          {current === 7 && <Slide7 />}
          {current === 8 && <Slide8 />}
          {current === 9 && <Slide9 />}
          {current >= ORIGINAL_SLIDES && current < TOTAL_SLIDES && (
            <QuizSlide
              key={`quiz-${current}`}
              {...QUIZ_SLIDES[current - ORIGINAL_SLIDES]!}
              pin={livePin}
              slideIndex={current}
              liveCode={liveCode}
              studentMode={isStudentLive}
              onNext={next}
              isLast={current === TOTAL_SLIDES_WITH_TEACHER - 1 && TEACHER_SLIDE_COUNT === 0}
              onFinish={() => navigate(-1)}
            />
          )}
          {current >= TOTAL_SLIDES && current < TOTAL_SLIDES_WITH_TEACHER && (
            <TeacherSlideRenderer
              slide={teacherSlides[current - TOTAL_SLIDES]!}
              index={current - TOTAL_SLIDES}
              total={TEACHER_SLIDE_COUNT}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div style={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 16, zIndex: 50 }}>
        <NavBtn onClick={prev} disabled={current === 0}>← Forrige</NavBtn>
        {current === TOTAL_SLIDES_WITH_TEACHER - 1
          ? <NavBtn onClick={() => {
              if ((window as unknown as Record<string, unknown>).__adventureEditorOpen) {
                if (!window.confirm('Lukk presentasjonen? Åpne endringer vil ikke lagres automatisk.')) return
              }
              window.close()
            }} disabled={false}>Avslutt presentasjon ✓</NavBtn>
          : <NavBtn onClick={next} disabled={false}>Neste →</NavBtn>}
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}
              style={{ background: '#1e293b', border: '2px solid #38bdf8', padding: '3rem', borderRadius: '2.5rem', maxWidth: 550, textAlign: 'center', boxShadow: '0 0 60px rgba(56,189,248,0.25)', margin: '0 1rem' }}>
              <h3 style={{ color: '#38bdf8', fontSize: 28, fontWeight: 800, marginBottom: 24, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{modal.title}</h3>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 18, fontWeight: 300 }}>{modal.text}</p>
              <div style={{ marginTop: 40, fontSize: 12, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Klikk for å lukke</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPinModal && livePin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPinModal(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}
              style={{ background: '#0f172a', border: '2px solid rgba(56,189,248,0.4)', padding: '3rem 4rem', borderRadius: '2.5rem', textAlign: 'center', boxShadow: '0 0 80px rgba(56,189,248,0.2)', margin: '0 1rem', maxWidth: 500 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16 }}>Live sesjon startet</div>
              <div style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', fontWeight: 800, letterSpacing: '0.2em', color: '#f1f5f9', lineHeight: 1, marginBottom: 16 }}>{livePin}</div>
              <p style={{ color: '#64748b', fontSize: 15, marginBottom: 8 }}>Elever går til <strong style={{ color: '#94a3b8' }}>adventure.no/join</strong></p>
              <p style={{ color: '#475569', fontSize: 13, marginBottom: 32 }}>og skriver inn PIN-koden</p>
              <button onClick={() => setShowPinModal(false)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.75rem 2rem', borderRadius: 99, color: '#f1f5f9', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>
                Start presentasjon →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <TeacherPresentationEditor
        presentationRoute={PRESENTATION_ROUTE}
        onSlidesChange={setTeacherSlides}
        currentSlide={current}
        slideInfos={slideInfos}
        onJumpTo={setCurrent}
        hiddenSlides={hiddenSlides}
        onHideToggle={handleHideToggle}
      />
    </div>
  )
}
