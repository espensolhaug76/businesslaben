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
  'Retorikk': 'Kunsten å overtale og kommunisere effektivt. Aristoteles definerte tre appellformer: etos, patos og logos.',
  'Etos': 'Avsenderens troverdighet og karakter. Bygges over tid gjennom dokumentert kompetanse og konsistent atferd.',
  'Patos': 'Følelsesmessig appell i kommunikasjon. Å koble budskapet til noe lytteren genuint bryr seg om.',
  'Logos': 'Logisk argumentasjon med fakta, statistikk og årsak-virkning-kjeder for å overbevise.',
  'BATNA': 'Best Alternative To Negotiated Agreement — hva du gjør hvis forhandlingene bryter sammen. Jo sterkere BATNA, jo mer forhandlingskraft.',
  'Proksemikk': 'Studiet av fysisk avstand mellom mennesker i kommunikasjonssituasjoner. I profesjonelle norske sammenhenger er ca. 50–120 cm normen.',
  'Aktiv lytting': 'En bevisst kommunikasjonsteknikk der man gir full oppmerksomhet, stiller oppfølgingsspørsmål og bekrefter forståelse.',
  'STAR-metoden': 'Situasjon, Task, Action, Result — en struktur for case-baserte presentasjoner og intervjusvar.',
  'Nonverbal kommunikasjon': 'Budskap formidlet gjennom kroppsspråk, tonefall, ansiktsuttrykk og fysisk avstand — over 60 % av all kommunikasjon.',
  'Forretningsbrev': 'Formelt skriftlig dokument med fast struktur: avsenderinfo, dato, mottaker, emnefelt, brødtekst og avslutning.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er etos i retorikk?',
    options: [
      'Logisk argumentasjon med fakta og tall',
      'Avsenderens troverdighet og karakter',
      'Følelsesmessig appell til publikum',
      'Bruken av metaforer i tale',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva betyr BATNA i forhandlingsteknikk?',
    options: [
      'Best Approach To Negotiating Agreements',
      'Basic Alternative To Negotiation Analysis',
      'Best Alternative To Negotiated Agreement',
      'Bargaining And Trade Negotiation Approach',
    ],
    correct: 2,
    timeSeconds: 45,
  },
  {
    question: 'Hvor mye av kommunikasjonsbudskapet i ansikt-til-ansikt-møter anslås å formidles nonverbalt?',
    options: [
      'Ca. 10 %',
      'Ca. 30 %',
      'Over 60 %',
      'Ca. 50 %',
    ],
    correct: 2,
    timeSeconds: 45,
  },
]

const ORIGINAL_SLIDES = 11
const TOTAL_SLIDES = ORIGINAL_SLIDES + QUIZ_SLIDES.length

function Term({ word, onShow }: { word: string; onShow: (title: string, text: string) => void }) {
  return (
    <span
      onClick={() => onShow(word, TERMS[word] ?? '')}
      style={{
        color: '#38bdf8',
        borderBottom: '2px dashed #38bdf8',
        cursor: 'help',
        fontWeight: 600,
        padding: '0 4px',
        borderRadius: 4,
        display: 'inline-block',
        transition: 'background 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(56,189,248,0.2)'; (e.target as HTMLElement).style.transform = 'scale(1.05)' }}
      onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.transform = 'scale(1)' }}
    >
      {word}
    </span>
  )
}

let _isLive = false
let _lastWritten = -1

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  if (_isLive) return null
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={e => { if (!disabled) { (e.currentTarget as HTMLElement).style.background = '#38bdf8'; (e.currentTarget as HTMLElement).style.color = '#030712'; (e.currentTarget as HTMLElement).style.borderColor = '#38bdf8' } }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = disabled ? '#334155' : '#f1f5f9'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
      style={{
        background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '0.8rem 1.8rem',
        borderRadius: 99,
        color: disabled ? '#334155' : '#f1f5f9',
        fontWeight: 600,
        fontSize: 15,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  )
}

function Glass({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '3rem',
      width: '100%',
      maxWidth: 1200,
      padding: '4rem',
    }}>
      {children}
    </div>
  )
}

function SlideImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img src={src} alt={alt} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)' }} />
  )
}

function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', marginBottom: 16, textTransform: 'uppercase' }}>
      {children}
    </h2>
  )
}

const twoCol: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }
const listStyle: React.CSSProperties = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }
const bodyText: React.CSSProperties = { fontSize: 18, color: '#cbd5e1', lineHeight: 1.7 }

function Slide0({ onNext, onStartLiveSession }: { onNext: () => void; onStartLiveSession: () => void }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.5em', marginBottom: 16, display: 'block', textTransform: 'uppercase', fontSize: 14 }}>
        SSR | Kommunikasjon og markedsføring
      </span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Profesjonell<br />
        <span style={{ color: '#38bdf8', fontStyle: 'italic' }}>kommunikasjon</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>
        Verbal og non-verbal kommunikasjon, aktiv lytting og tilbakemelding
      </p>
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

function Slide1({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Modul 1 – Retorikk</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Etos" onShow={onShow} />, <Term word="Patos" onShow={onShow} /> og <Term word="Logos" onShow={onShow} />
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Etos:</strong> Troverdighet bygges over tid gjennom dokumentert kompetanse og konsistent atferd.
            </li>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Patos:</strong> Koble budskapet til noe lytteren genuint bryr seg om.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Logos:</strong> Statistikk, konkrete eksempler og klare årsak-virkning-kjeder.
            </li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Kommunikasjon" />
      </div>
    </Glass>
  )
}

function Slide2({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Forretningsbrev" />
        <div>
          <SlideLabel>Skriftlig kommunikasjon</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Forretningsbrev" onShow={onShow} /> og e-post
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Struktur:</strong> Emnefelt, én idé per avsnitt, konkret handlingsoppfordring.
            </li>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Tone:</strong> Profesjonell og direkte — bruk «du», skriv i aktiv form, unngå kansellispråk.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Juridisk:</strong> E-post om avtalevilkår kan utgjøre en bindende kontrakt.
            </li>
          </ul>
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
          <SlideLabel>Presentasjonsteknikk</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="STAR-metoden" onShow={onShow} /> og struktur
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Den klassiske strukturen:</p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>Fortell dem hva du skal fortelle dem (intro)</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>Fortell dem det (hoveddel)</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700, borderTop: '1px solid rgba(56,189,248,0.3)', paddingTop: 8, marginTop: 4 }}>Fortell dem hva du fortalte dem (oppsummering)</li>
            </ul>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Presentasjon" />
      </div>
    </Glass>
  )
}

function Slide4({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Nervøsitet" />
        <div>
          <SlideLabel>Nervøsitet og forberedelse</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Nervøsitet er energi
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Nervøsitet er adrenalin — energi kroppen produserer for å prestere. Utfordringen er å kanalisere den til engasjement.
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1rem 1.5rem' }}>
            <p style={{ ...bodyText, color: '#38bdf8', fontWeight: 700, textAlign: 'center' }}>Øv tre ganger høyt — for struktur, timing og tone</p>
          </div>
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
          <SlideLabel>Forhandling</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="BATNA" onShow={onShow} /> — din forhandlingskraft
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>BATNA:</strong> Finn din beste alternativ FØR forhandlingen starter.
            </li>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Interesser vs. posisjoner:</strong> Spør «hvorfor vil de det?» fremfor å motsi hva de vil.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Norsk stil:</strong> Konsensorientert, egalitær og faktabasert.
            </li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Forhandling" />
      </div>
    </Glass>
  )
}

function Slide6({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Nonverbal kommunikasjon" />
        <div>
          <SlideLabel>Kroppsspråk</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Nonverbal kommunikasjon" onShow={onShow} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Over 60 % av kommunikasjonsbudskapet formidles nonverbalt i ansikt-til-ansikt-møter.
          </p>
          <ul style={listStyle}>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Øyekontakt:</strong> Ca. 60–70 % av samtalen i norsk kontekst.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Videomøter:</strong> Kamera i øyenhøyde, lys fra fronten, nøytral bakgrunn.</li>
          </ul>
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
          <SlideLabel>Lytting</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Aktiv lytting" onShow={onShow} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Aktiv lytting er en bevisst teknikk som skaper tillit og avdekker behov. De fleste lytter for å svare — ikke for å forstå.
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>Gi full oppmerksomhet — legg bort telefonen</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>Still oppfølgingsspørsmål</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>Bekreft forståelse ved å oppsummere</li>
            </ul>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Lytting" />
      </div>
    </Glass>
  )
}

function Slide8({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Proksemikk" />
        <div>
          <SlideLabel>Fysisk nærhet</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Proksemikk" onShow={onShow} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Fysisk avstand kommuniserer relasjonstype. I norsk profesjonell kontekst er ca. 50–120 cm normen.
          </p>
          <ul style={listStyle}>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Intim sone:</strong> Under 50 cm — bare nære relasjoner.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Profesjonell sone:</strong> 50–120 cm.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Offentlig sone:</strong> Over 3,5 meter — foredrag.</li>
          </ul>
        </div>
      </div>
    </Glass>
  )
}

function Slide9({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Case</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>
            Salgsmøtet
          </h2>
          <div style={{ ...bodyText, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: 16 }}>
            En selger bruker <Term word="Logos" onShow={onShow} /> med statistikk, bygger <Term word="Etos" onShow={onShow} /> gjennom referanser, og skaper <Term word="Patos" onShow={onShow} /> ved å koble produktet til kundens mål — alle tre appellformene i ett møte.
          </div>
          <p style={bodyText}>Kombinasjonen av alle tre er mer overbevisende enn én alene.</p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Salgsmøte" />
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
          Hva skjer når en person har sterk logos men svak etos — og hvordan kan man bygge troverdighet raskt i en ny jobbsituasjon?
        </h2>
        <p style={{ ...bodyText, fontSize: 20 }}>
          Tenk på et konkret eksempel fra arbeidslivet der kommunikasjon enten åpnet eller lukket en dør.
        </p>
      </div>
    </Glass>
  )
}

export default function ProfesjonellKommunikasjonVg2Presentation() {
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
      presentationName: 'Profesjonell kommunikasjon',
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
      localStorage.setItem(key, JSON.stringify({
        ...s,
        currentSlide: current,
        activeQuestion: activeQuestion ?? null,
        questionRevealed: false,
      }))
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
  }, [modal, showPinModal, next, prev, closeModal])

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
      >
        ← Tilbake
      </button>

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
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#1e293b', border: '2px solid #38bdf8', padding: '3rem', borderRadius: '2.5rem', maxWidth: 550, textAlign: 'center', boxShadow: '0 0 60px rgba(56,189,248,0.25)', margin: '0 1rem' }}
            >
              <h3 style={{ color: '#38bdf8', fontSize: 28, fontWeight: 800, marginBottom: 24, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {modal.title}
              </h3>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 18, fontWeight: 300 }}>{modal.text}</p>
              <div style={{ marginTop: 40, fontSize: 12, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Klikk for å lukke</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPinModal && livePin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPinModal(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#0f172a', border: '2px solid rgba(56,189,248,0.4)', padding: '3rem 4rem', borderRadius: '2.5rem', textAlign: 'center', boxShadow: '0 0 80px rgba(56,189,248,0.2)', margin: '0 1rem', maxWidth: 500 }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16 }}>Live sesjon startet</div>
              <div style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', fontWeight: 800, letterSpacing: '0.2em', color: '#f1f5f9', lineHeight: 1, marginBottom: 16 }}>
                {livePin}
              </div>
              <p style={{ color: '#64748b', fontSize: 15, marginBottom: 8 }}>
                Elever går til <strong style={{ color: '#94a3b8' }}>adventure.no/join</strong>
              </p>
              <p style={{ color: '#475569', fontSize: 13, marginBottom: 32 }}>og skriver inn PIN-koden</p>
              <button
                onClick={() => setShowPinModal(false)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.75rem 2rem', borderRadius: 99, color: '#f1f5f9', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}
              >
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
