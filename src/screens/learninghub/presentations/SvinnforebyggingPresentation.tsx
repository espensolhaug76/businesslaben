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

const TERMS: Record<string, string> = {
  'Administrativt svinn': 'Tap som oppstår fra registreringsfeil, feilprising, mangelfull mottakskontroll eller systemfeil. Usynlig svinn som ikke synes på lager, men oppdages ved varetelling.',
  'Fysisk svinn': 'Varer som forsvinner fra butikk eller lager gjennom nasking, innbrudd, internt tyveri, brekkasje eller utgått holdbarhet.',
  'Matsvinn': 'Spiselige deler av mat produsert for mennesker som kastes. Bananskall er ikke matsvinn — kun nyttbare deler regnes med.',
  'Varetelling': 'Fysisk opptelling og registrering av lagerbeholdning for å avdekke avvik mellom faktisk lager og det datasystemet viser. Gjøres typisk 1–4 ganger per år.',
  'Nedprising': 'Aktiv prisreduksjon på ferskvarer som nærmer seg utløpsdato. Stimulerer salg og reduserer matsvinn. Kiwi og Rema bruker dette systematisk.',
  'Svinnprosent': 'Svinnets andel av omsetningen. Bransjenorm i dagligvare er 1–3 %. For å dekke inn 1000 kr i svinn med 10 % dekningsgrad, må butikken selge for 10 000 kr.',
  'Mottakskontroll': 'Systematisk gjennomgang av vareleveranser for å avdekke feil antall, feil varer eller skader. Første forsvarslinje mot administrativt svinn.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'En butikk har 10 % dekningsgrad og oppdager 1000 kr i svinn. Hvor mye må butikken selge for å dekke dette tapet?',
    options: [
      '1 000 kr — svinn og salg er ett til ett',
      '5 000 kr — halvparten av svinnet',
      '10 000 kr — fordi DG er 10 % må man selge ti ganger svinnet',
      '2 000 kr — kun variable kostnader regnes',
    ],
    correct: 2,
    timeSeconds: 45,
  },
  {
    question: 'Hva er den mest utbredte misforståelsen om svinn i butikk?',
    options: [
      'At matsvinn ikke regnes som svinn',
      'At eksterne butikktyver er den største årsaken til svinn',
      'At varetelling er lovpålagt ukentlig',
      'At nedprising øker svinnet',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva er formålet med nedprising av ferskvarer?',
    options: [
      'Å øke butikkens dekningsgrad',
      'Å tiltrekke nye kunder til butikken',
      'Å stimulere salg og redusere matsvinn før utløpsdato',
      'Å oppfylle krav i Matsvinnloven',
    ],
    correct: 2,
    timeSeconds: 45,
  },
]

const ORIGINAL_SLIDES = 11
const TOTAL_SLIDES = ORIGINAL_SLIDES + QUIZ_SLIDES.length

function Term({ word, onShow }: { word: string; onShow: (title: string, text: string) => void }) {
  return (
    <span onClick={() => onShow(word, TERMS[word] ?? '')} style={{ color: '#38bdf8', borderBottom: '2px dashed #38bdf8', cursor: 'help', fontWeight: 600, padding: '0 4px', borderRadius: 4, display: 'inline-block', transition: 'background 0.2s, transform 0.2s' }}
      onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(56,189,248,0.2)'; (e.target as HTMLElement).style.transform = 'scale(1.05)' }}
      onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.transform = 'scale(1)' }}
    >{word}</span>
  )
}

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
  return <div style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3rem', width: '100%', maxWidth: 1200, padding: '4rem' }}>{children}</div>
}

function SlideImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)' }} />
}

function SlideLabel({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', marginBottom: 16, textTransform: 'uppercase' }}>{children}</h2>
}

const twoCol: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }
const listStyle: React.CSSProperties = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }
const bodyText: React.CSSProperties = { fontSize: 18, color: '#cbd5e1', lineHeight: 1.7 }

function Slide0({ onNext, onStartLiveSession }: { onNext: () => void; onStartLiveSession: () => void }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.5em', marginBottom: 16, display: 'block', textTransform: 'uppercase', fontSize: 14 }}>SSR | Økonomi og administrasjon</span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Kampen mot<br /><span style={{ color: '#38bdf8', fontStyle: 'italic' }}>svinn</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>Når verdier forsvinner sporløst — typer, årsaker, konsekvenser og forebygging.</p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onNext} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#38bdf8'; (e.currentTarget as HTMLElement).style.color = '#030712' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9' }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem 3rem', borderRadius: 99, fontSize: 18, fontWeight: 600, color: '#f1f5f9', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}>Start Presentasjon →</button>
        <button onClick={onStartLiveSession} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.25)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.08)' }} style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.3)', padding: '1rem 2rem', borderRadius: 99, fontSize: 16, fontWeight: 600, color: '#38bdf8', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}>📡 Start live sesjon</button>
      </div>
    </div>
  )
}

function Slide1({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Faglig kjerne</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>Hva er svinn — og hvorfor betyr det så mye?</h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Svinn er tap av verdier fra lager eller butikk før varene har generert omsetning. Det kategoriseres i to hovedtyper: <Term word="Administrativt svinn" onShow={onShow} /> og <Term word="Fysisk svinn" onShow={onShow} />.</p>
          <p style={bodyText}><Term word="Matsvinn" onShow={onShow} /> er en tredje, kritisk kategori. Den norske bransjeavtalen om matsvinn forplikter aktørene til drastiske kutt.</p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80" alt="Svinn i butikk" />
      </div>
    </Glass>
  )
}

function Slide2({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80" alt="Bunnlinje effekt" />
        <div>
          <SlideLabel>Økonomisk effekt</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>1 000 kr svinn = 10 000 kr salg</h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Svinn treffer bunnlinjen direkte. Med en <Term word="Svinnprosent" onShow={onShow} /> på 10 % dekningsgrad, krever 1 000 kr i svinn 10 000 kr i salg for å nulles ut.</p>
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#ef4444', fontWeight: 700 }}>Bransjenorm dagligvare: 1–3 % svinn</li>
              <li style={{ ...bodyText, color: '#f59e0b', fontWeight: 700 }}>Elektronikk: 0,5–1,5 % svinn</li>
              <li style={{ ...bodyText, color: '#22c55e', fontWeight: 700 }}>Mål: Under 1 % gjennom gode rutiner</li>
            </ul>
          </div>
        </div>
      </div>
    </Glass>
  )
}

function Slide3({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Usynlig svinn</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}><Term word="Administrativt svinn" onShow={onShow} /></h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Administrativt svinn er det farligste fordi det ikke synes på hyllen — det oppdages kun ved <Term word="Varetelling" onShow={onShow} />.</p>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Feilprising:</strong> Varen selges billigere enn innkjøpspris</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Registreringsfeil:</strong> Feil antall ved mottak</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Mangelfull <Term word="Mottakskontroll" onShow={onShow} />:</strong> Elkjøp-eksempel: pall med 50 telefoner inneholdt bare 48</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Systemfeil:</strong> Kassesystem og lagersystem er ikke synkronisert</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80" alt="Administrativt svinn" />
      </div>
    </Glass>
  )
}

function Slide4({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80" alt="Fysisk svinn" />
        <div>
          <SlideLabel>Synlig svinn</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}><Term word="Fysisk svinn" onShow={onShow} /></h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Fysisk svinn er varer som konkret forsvinner fra butikk eller lager:</p>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Nasking (butikktyveri):</strong> Varer stjålet av kunder</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Internt tyveri:</strong> Ansatte som tar varer</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Brekkasje:</strong> Varer som skades under håndtering</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Utgått holdbarhet:</strong> Varer som må kastes</li>
          </ul>
        </div>
      </div>
    </Glass>
  )
}

function Slide5({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Mat og bærekraft</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}><Term word="Matsvinn" onShow={onShow} /> – en egen kategori</h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Matsvinn er spiselig mat produsert for mennesker som kastes. Det er viktig å skille fra uunngåelig avfall (bein, skall).</p>
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 16, padding: '1.5rem' }}>
            <p style={{ ...bodyText, marginBottom: 8, color: '#22c55e', fontWeight: 700 }}>Bransjeavtalen om matsvinn</p>
            <p style={bodyText}>Norske mataktører — NorgesGruppen, Coop, Rema m.fl. — har forpliktet seg til å halvere matsvinnet innen 2030, i tråd med FNs bærekraftsmål.</p>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Matsvinn og bærekraft" />
      </div>
    </Glass>
  )
}

function Slide6({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Kiwi og Kirkens Bymisjon" />
        <div>
          <SlideLabel>Norsk eksempel</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>Kiwi × Kirkens Bymisjon</h2>
          <div style={{ ...bodyText, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: 16 }}>
            Kiwi donerer varer med kort holdbarhet til Kirkens Bymisjon i stedet for å kaste dem. Resultatet: redusert <Term word="Matsvinn" onShow={onShow} />, økt omdømme og skattereduksjon gjennom gaveregisteret.
          </div>
          <p style={bodyText}><Term word="Nedprising" onShow={onShow} /> av gule prislapper er Kiwis primærstrategi — donasjon er siste steg i hierarkiet.</p>
        </div>
      </div>
    </Glass>
  )
}

function Slide7({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kontroll og forebygging</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}><Term word="Varetelling" onShow={onShow} /> og <Term word="Mottakskontroll" onShow={onShow} /></h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>To nøkkelprosesser for å avdekke og forebygge svinn:</p>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}><strong style={{ color: '#f1f5f9' }}><Term word="Varetelling" onShow={onShow} />:</strong> Fysisk opptelling av lager mot datasystemets tall. Avdekker avvik og kilde til svinn.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}><Term word="Mottakskontroll" onShow={onShow} />:</strong> Telle og registrere alle leveranser nøyaktig. Første forsvar mot administrativt svinn.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Varetelling og kontroll" />
      </div>
    </Glass>
  )
}

function Slide8({ onShow: _onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Misforståelse svinn" />
        <div>
          <SlideLabel>Vanlig misforståelse</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>Butikktyven er ikke fiende nr. 1</h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Den mest utbredte misforståelsen: at eksterne butikktyver er den viktigste svinnkilden. Forskning viser et annet bilde:</p>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8, color: '#ef4444', fontWeight: 700 }}>~35 % — internt tyveri (ansatte)</li>
            <li style={{ ...bodyText, marginBottom: 8, color: '#f59e0b', fontWeight: 700 }}>~35 % — administrativt svinn</li>
            <li style={{ ...bodyText, marginBottom: 8, color: '#94a3b8', fontWeight: 700 }}>~25 % — nasking (kunder)</li>
            <li style={{ ...bodyText, color: '#64748b', fontWeight: 700 }}>~5 % — brekkasje</li>
          </ul>
        </div>
      </div>
    </Glass>
  )
}

function Slide9({ onShow: _onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Lovverk</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>Rettslig rammeverk</h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}><strong style={{ color: '#f1f5f9' }}>Straffeloven § 321:</strong> Naskeri — tyveri av varer til verdi under 2 000 kr. Kan medføre bøter.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}><strong style={{ color: '#f1f5f9' }}>Straffeloven § 323:</strong> Tyveri — varer over 2 000 kr. Kan gi fengsel inntil 2 år.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}><strong style={{ color: '#f1f5f9' }}>Straffeloven § 390:</strong> Underslag — ansatte som tar fra arbeidsgiver.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Ny Matsvinnlov:</strong> Under utforming. Vil sette juridiske krav til matsvinnrapportering.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80" alt="Lovverk og svinn" />
      </div>
    </Glass>
  )
}

function Slide10() {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <SlideLabel>Refleksjon</SlideLabel>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
          Gode rutiner er den beste medisinen mot svinn
        </h2>
        <p style={{ fontSize: 20, color: '#cbd5e1', lineHeight: 1.7 }}>
          Hvilke tre konkrete tiltak ville du innføre som butikksjef for å halvere svinnet? Tenk på alle kategorier: administrativt, fysisk og matsvinn.
        </p>
      </div>
    </Glass>
  )
}

export default function SvinnforebyggingPresentation() {
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
  const show = useCallback((title: string, text: string) => setModal({ title, text }), [])
  const closeModal = useCallback(() => setModal(null), [])
  function handleHideToggle(idx: number) {
    setHiddenSlides(prev => { const next = prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]; saveHiddenSlides(PRESENTATION_ROUTE, next); return next })
  }
  const next = useCallback(() => { setCurrent(c => { let n = c + 1; while (n < TOTAL_SLIDES_WITH_TEACHER - 1 && hiddenSlides.includes(n)) n++; return Math.min(n, TOTAL_SLIDES_WITH_TEACHER - 1) }) }, [TOTAL_SLIDES_WITH_TEACHER, hiddenSlides])
  const prev = useCallback(() => { setCurrent(c => { let n = c - 1; while (n > 0 && hiddenSlides.includes(n)) n--; return Math.max(n, 0) }) }, [hiddenSlides])
  function startLiveSession() {
    const pin = String(Math.floor(1000 + Math.random() * 9000))
    localStorage.setItem(`adventure-live-session-${pin}`, JSON.stringify({ pin, currentSlide: 0, activeQuestion: null, questionRevealed: false, status: 'active', presentationName: 'Svinnforebygging' }))
    setLivePin(pin); setShowPinModal(true)
  }
  useEffect(() => {
    if (!livePin) return
    const isQuiz = current >= ORIGINAL_SLIDES
    const activeQuestion = isQuiz ? QUIZ_SLIDES[current - ORIGINAL_SLIDES] ?? null : null
    const key = `adventure-live-session-${livePin}`
    try { const s = JSON.parse(localStorage.getItem(key) ?? '{}') as Record<string, unknown>; localStorage.setItem(key, JSON.stringify({ ...s, currentSlide: current, activeQuestion: activeQuestion ?? null, questionRevealed: false })) } catch {}
  }, [current, livePin])
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (modal) { if (e.key === 'Escape') closeModal(); return }
      if (showPinModal) { if (e.key === 'Escape') setShowPinModal(false); return }
      if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'Escape') navigate(-1)
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [modal, showPinModal, next, prev, closeModal, navigate])
  const progressPct = ((current + 1) / TOTAL_SLIDES_WITH_TEACHER) * 100
  return (
    <div style={{ background: '#030712', color: '#f1f5f9', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet" />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 4, background: 'rgba(255,255,255,0.05)', zIndex: 1000 }}>
        <div style={{ width: `${progressPct}%`, height: '100%', background: '#38bdf8', transition: 'width 0.4s' }} />
      </div>
      <button onClick={() => navigate(-1)} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.15)'; (e.currentTarget as HTMLElement).style.color = '#fff' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#94a3b8' }} style={{ position: 'fixed', top: 16, left: 20, zIndex: 100, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: 99, color: '#94a3b8', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}>← Tilbake</button>
      <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 100, display: 'flex', alignItems: 'center', gap: 12 }}>
        {livePin && (<button onClick={() => setShowPinModal(true)} style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', padding: '0.3rem 0.75rem', borderRadius: 8, color: '#38bdf8', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}>📡 {livePin}</button>)}
        <span style={{ color: '#475569', fontSize: 13 }}>{current + 1} / {TOTAL_SLIDES_WITH_TEACHER}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          {current === 0 && <Slide0 onNext={next} onStartLiveSession={startLiveSession} />}
          {current === 1 && <Slide1 onShow={show} />}
          {current === 2 && <Slide2 onShow={show} />}
          {current === 3 && <Slide3 onShow={show} />}
          {current === 4 && <Slide4 onShow={show} />}
          {current === 5 && <Slide5 onShow={show} />}
          {current === 6 && <Slide6 onShow={show} />}
          {current === 7 && <Slide7 onShow={show} />}
          {current === 8 && <Slide8 onShow={show} />}
          {current === 9 && <Slide9 onShow={show} />}
          {current === 10 && <Slide10 />}
          {current >= ORIGINAL_SLIDES && current < TOTAL_SLIDES && (
            <QuizSlide key={`quiz-${current}`} {...QUIZ_SLIDES[current - ORIGINAL_SLIDES]!} pin={livePin} slideIndex={current} liveCode={liveCode} studentMode={isStudentLive} onNext={next} isLast={current === TOTAL_SLIDES_WITH_TEACHER - 1 && TEACHER_SLIDE_COUNT === 0} onFinish={() => navigate(-1)} />
          )}
          {current >= TOTAL_SLIDES && current < TOTAL_SLIDES_WITH_TEACHER && (
            <TeacherSlideRenderer slide={teacherSlides[current - TOTAL_SLIDES]!} index={current - TOTAL_SLIDES} total={TEACHER_SLIDE_COUNT} />
          )}
        </motion.div>
      </AnimatePresence>
      <div style={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 16, zIndex: 50 }}>
        <NavBtn onClick={prev} disabled={current === 0}>← Forrige</NavBtn>
        {current === TOTAL_SLIDES_WITH_TEACHER - 1 ? <NavBtn onClick={() => { if ((window as unknown as Record<string, unknown>).__adventureEditorOpen) { if (!window.confirm('Lukk presentasjonen?')) return }; window.close() }} disabled={false}>Avslutt presentasjon ✓</NavBtn> : <NavBtn onClick={next} disabled={false}>Neste →</NavBtn>}
      </div>
      <AnimatePresence>
        {modal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ background: '#1e293b', border: '2px solid #38bdf8', padding: '3rem', borderRadius: '2.5rem', maxWidth: 550, textAlign: 'center', boxShadow: '0 0 60px rgba(56,189,248,0.25)', margin: '0 1rem' }}><h3 style={{ color: '#38bdf8', fontSize: 28, fontWeight: 800, marginBottom: 24, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{modal.title}</h3><p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 18, fontWeight: 300 }}>{modal.text}</p><div style={{ marginTop: 40, fontSize: 12, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Klikk for å lukke</div></motion.div></motion.div>)}
      </AnimatePresence>
      <AnimatePresence>
        {showPinModal && livePin && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPinModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ background: '#0f172a', border: '2px solid rgba(56,189,248,0.4)', padding: '3rem 4rem', borderRadius: '2.5rem', textAlign: 'center', boxShadow: '0 0 80px rgba(56,189,248,0.2)', margin: '0 1rem', maxWidth: 500 }}><div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16 }}>Live sesjon startet</div><div style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', fontWeight: 800, letterSpacing: '0.2em', color: '#f1f5f9', lineHeight: 1, marginBottom: 16 }}>{livePin}</div><p style={{ color: '#64748b', fontSize: 15, marginBottom: 8 }}>Elever går til <strong style={{ color: '#94a3b8' }}>adventure.no/join</strong></p><p style={{ color: '#475569', fontSize: 13, marginBottom: 32 }}>og skriver inn PIN-koden</p><button onClick={() => setShowPinModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.75rem 2rem', borderRadius: 99, color: '#f1f5f9', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Start presentasjon →</button></motion.div></motion.div>)}
      </AnimatePresence>
      <TeacherPresentationEditor presentationRoute={PRESENTATION_ROUTE} onSlidesChange={setTeacherSlides} currentSlide={current} slideInfos={slideInfos} onJumpTo={setCurrent} hiddenSlides={hiddenSlides} onHideToggle={handleHideToggle} />
    </div>
  )
}
