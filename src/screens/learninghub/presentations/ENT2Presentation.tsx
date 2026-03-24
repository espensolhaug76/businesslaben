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
    question: 'Hva er Ansoffs vekstmatrise?',
    options: [
      'En modell for å analysere konkurrenter i et marked',
      'En finansieringsmodell for oppstartsbedrifter',
      'En strategimodell med fire vekstretninger: markedsinntrenging, produktutvikling, markedsutvikling og diversifikasjon',
      'En metode for å beregne avkastning på investeringer',
    ],
    correct: 2,
    timeSeconds: 45,
  },
  {
    question: 'Hva menes med "skalering" i en bedriftssammenheng?',
    options: [
      'Å nedbemanne og kutte kostnader i krisetider',
      'Å øke inntektene uten at kostnadene øker like mye',
      'Å ekspandere til utlandet med ny organisasjonsstruktur',
      'Å introdusere et nytt produkt i samme marked',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva er "Blue Ocean Strategy"?',
    options: [
      'En strategi for å senke prisene under konkurrentene',
      'En metode for å analysere leverandørmakt i bransjen',
      'En tilnærming der man finner markeder uten konkurranse i stedet for å slåss i "rødt hav"',
      'En strategi for å fusjonere med konkurrenter',
    ],
    correct: 2,
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
      <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.5em', marginBottom: 16, display: 'block', textTransform: 'uppercase', fontSize: 14 }}>ENT2 | Entreprenørskap og Bedriftsutvikling</span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Strategi og<br /><span style={{ color: '#38bdf8', fontStyle: 'italic' }}>skalering</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>Kapittel 11 og 12 – Strategisk planlegging, vekst og forretningsutvikling.</p>
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
          <SlideLabel>Kapittel 11 – Slide 1</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Strategisk planlegging</h2>
          <p style={bodyText}>Strategi er valgene som sikrer langsiktig overlevelse og konkurransefortrinn.</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Visjon og verdier', 'PESTEL-analyse (makroforhold)', 'SWOT-analyse (interne/eksterne)', 'Vekststrategier (Ansoff)', 'Implementering og kontroll'].map((steg, i) => (
              <div key={steg} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10 }}>
                <span style={{ color: '#38bdf8', fontWeight: 800, minWidth: 20 }}>{i + 1}</span>
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{steg}</span>
              </div>
            ))}
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Strategisk planlegging" />
      </div>
    </Glass>
  )
}

function Slide2() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>Kapittel 11 – Slide 2</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>Ansoffs vekstmatrise</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { tittel: 'Markedsinntrenging', tekst: 'Selg mer av det du har til eksisterende kunder. Lavest risiko.', farge: '#4ade80' },
            { tittel: 'Produktutvikling', tekst: 'Nye produkter til eksisterende kunder. Krever FoU.', farge: '#38bdf8' },
            { tittel: 'Markedsutvikling', tekst: 'Eksisterende produkter til nye markeder (geografi/segmenter).', farge: '#fbbf24' },
            { tittel: 'Diversifikasjon', tekst: 'Nye produkter til nye markeder. Høyest risiko og potensial.', farge: '#f87171' },
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
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Skalering" />
        <div>
          <SlideLabel>Kapittel 11 – Slide 3</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Skalering</h2>
          <p style={bodyText}>Å øke inntektene uten at kostnadene øker like mye. Skalering krever systemer, ikke bare hardt arbeid.</p>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 16 }}>
              <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 8 }}>Organisk vekst</div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Vokse gjennom egne ressurser og kundetilvekst.</p>
            </div>
            <div style={{ padding: '1.25rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 16 }}>
              <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: 8 }}>Oppkjøpsvekst</div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Kjøpe andre bedrifter for rask ekspansjon.</p>
            </div>
          </div>
        </div>
      </div>
    </Glass>
  )
}

function Slide4() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>Kapittel 11 – Slide 4</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>VRIO-modellen</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { bokstav: 'V', ord: 'Verdifull', tekst: 'Hjelper ressursen oss å utnytte muligheter eller avverge trusler?' },
            { bokstav: 'R', ord: 'Sjelden', tekst: 'Har få eller ingen konkurrenter tilgang til ressursen?' },
            { bokstav: 'I', ord: 'Imiterbar', tekst: 'Er det kostbart for konkurrenter å kopiere ressursen?' },
            { bokstav: 'O', ord: 'Organisert', tekst: 'Er bedriften organisert for å utnytte ressursen fullt ut?' },
          ].map(item => (
            <div key={item.bokstav} style={{ flex: '1 1 200px', padding: '1.5rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#38bdf8', marginBottom: 8 }}>{item.bokstav}</div>
              <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 10 }}>{item.ord}</div>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.tekst}</p>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

function Slide5() {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 11 – Slide 5</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>SWOT-analyse (Strategisk)</h2>
          <p style={bodyText}>Koble interne styrker til eksterne muligheter for å bygge en vinnende strategi.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: 20 }}>
            {[
              { label: 'Styrker (S)', farge: '#4ade80' },
              { label: 'Svakheter (W)', farge: '#f87171' },
              { label: 'Muligheter (O)', farge: '#38bdf8' },
              { label: 'Trusler (T)', farge: '#fbbf24' },
            ].map(item => (
              <div key={item.label} style={{ padding: '1rem', background: `${item.farge}12`, border: `1px solid ${item.farge}40`, borderRadius: 14, color: item.farge, fontWeight: 700, textAlign: 'center' }}>{item.label}</div>
            ))}
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="SWOT analyse" />
      </div>
    </Glass>
  )
}

function Slide6() {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Forretningsutvikling" />
        <div>
          <SlideLabel>Kapittel 12 – Slide 1</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Forretningsmodellinnovasjon</h2>
          <p style={bodyText}>Endre måten man tjener penger på – ikke bare produktet.</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['"Fra salg til abonnement" (Spotify, Netflix)', '"Fra produkt til plattform" (Airbnb, Uber)', '"Fra eierskap til leie" (Zipcar, leasing)'].map(ex => (
              <div key={ex} style={{ padding: '0.75rem 1rem', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, color: '#38bdf8', fontSize: 15, fontStyle: 'italic' }}>{ex}</div>
            ))}
          </div>
        </div>
      </div>
    </Glass>
  )
}

function Slide7() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>Kapittel 12 – Slide 2</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>Blue Ocean Strategy</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ padding: '2rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 20 }}>
            <div style={{ fontWeight: 800, color: '#f87171', fontSize: 20, marginBottom: 16 }}>Rødt hav</div>
            <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, margin: 0 }}>Kjempe om eksisterende etterspørsel mot konkurrenter. Blodig kamp om markedsandeler.</p>
          </div>
          <div style={{ padding: '2rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 20 }}>
            <div style={{ fontWeight: 800, color: '#38bdf8', fontSize: 20, marginBottom: 16 }}>Blått hav</div>
            <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, margin: 0 }}>Skape ny etterspørsel i ubestridt markedsrom. Gjøre konkurransen irrelevant.</p>
          </div>
        </div>
        <p style={{ ...bodyText, marginTop: 24, fontSize: 16 }}>Eksempel: Cirque du Soleil – hverken sirkus eller teater, men noe helt nytt.</p>
      </div>
    </Glass>
  )
}

function Slide8() {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 12 – Slide 3</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Nettverkseffekter og plattformer</h2>
          <p style={bodyText}>Nettverkseffekter oppstår når verdien av tjenesten øker med antall brukere.</p>
          <div style={{ marginTop: 24, padding: '1.5rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 20 }}>
            <p style={{ color: '#38bdf8', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Eksempler</p>
            <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, margin: 0 }}>Facebook, LinkedIn, Airbnb og Uber – mer verdi for alle når nettverket vokser.</p>
          </div>
          <p style={{ ...bodyText, marginTop: 16, fontSize: 15 }}>Automatisering fjerner flaskehalser og gjør skalering mulig uten tilsvarende kostnadsøkning.</p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" alt="Nettverkseffekter" />
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
            'Ansoffs matrise gir fire vekstretninger med ulik risiko',
            'Skalering handler om å øke inntekter uten tilsvarende kostnadsøkning',
            'VRIO-modellen identifiserer bærekraftige konkurransefortrinn',
            'Forretningsmodellinnovasjon kan endre en hel bransje',
            'Blue Ocean Strategy handler om å skape nye markeder fremfor å slåss i eksisterende',
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

export default function ENT2Presentation() {
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
      presentationName: 'Strategi og skalering',
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
