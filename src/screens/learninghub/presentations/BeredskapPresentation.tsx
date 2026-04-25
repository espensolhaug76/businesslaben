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
  'Beredskapsplan': 'Bedriftens operative manual for krisehåndtering. Beskriver hvem som gjør hva, i hvilken rekkefølge og med hvilke ressurser under en krise.',
  'Handlingskort': 'Kort, konkret instruksliste med 5–7 nummererte trinn for ett spesifikt scenario. Enkelt nok til å følge under stress og panikk.',
  'Varslingskjede': 'Dokumentert oversikt over hvem som varsler hvem i hvilken rekkefølge under en krise — internt og eksternt (politi, brannvesen, AMK).',
  'Fysisk sikkerhetstiltak': 'Materielle, håndgripelige hindringer som begrenser fysisk tilgang: låser, dører, gjerder, forankrede kassebokser.',
  'Teknisk sikkerhetstiltak': 'Elektroniske og digitale systemer som overvåker, varsler og begrenser adgang: kameraer, alarmer, adgangskontroll.',
  'Administrativt tiltak': 'Prosedyrer, regler, opplæring og kulturbygging som forebygger sikkerhetshendelser og standardiserer responsen.',
  'Manuelt sikkerhetstiltak': 'Menneskelig tilstedeværelse for å avskrekke, observere og respondere: vektere, inspeksjonsrunder, nattevakt.',
  'Internkontrollforskriften': 'Forskrift om systematisk helse-, miljø- og sikkerhetsarbeid. Pålegger alle arbeidsgivere å ha dokumenterte rutiner for krisehåndtering.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er det primære formålet med en beredskapsplan?',
    options: [
      'Å tilfredsstille krav fra Internkontrollforskriften',
      'Å redusere kaos til kontroll ved å definere hvem gjør hva under en krise',
      'Å unngå at bedriften får bøter',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'En butikk innfører regel om at to ansatte alltid skal håndtere kontanttellingen. Hva slags tiltak er dette?',
    options: [
      'Teknisk tiltak — fordi det handler om kassen',
      'Administrativt tiltak — en prosedyre som regulerer atferd',
      'Manuelt tiltak — vektere',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'En liten kafé med 4 ansatte hevder de er for små til å trenge en beredskapsplan. Er dette korrekt?',
    options: [
      'Ja — internkontrollforskriften gjelder bare bedrifter over 10 ansatte',
      'Nei — internkontrollforskriften gjelder alle arbeidsgivere i Norge',
      'Kanskje — det avhenger av bransje og risikoprofil',
    ],
    correct: 1,
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
        SSR | HMS
      </span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Beredskap
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>
        Beredskapsplaner, krisehåndtering og øvelser i servicebransjen
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
          <SlideLabel>HMS-VG2 – Beredskap</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Beredskapsplan" onShow={onShow} /> — når det utenkelige skjer
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Alle bedrifter</strong> trenger beredskapsplan — spesielt servicebedrifter med mange gjester.</li>
            <li style={{ ...bodyText, marginBottom: 8 }}>Dekker: brann, ran, strømbrudd, IT-kollaps, medisinsk nødstilfelle, PLIVO.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Øving er kritisk</strong> — en plan ingen har øvd på er verdiløs under press.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80" alt="Beredskap" />
      </div>
    </Glass>
  )
}

function Slide2({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="Beredskapsplan innhold" />
        <div>
          <SlideLabel>Planens innhold</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Hva skal planen inneholde?
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}><Term word="Varslingskjede" onShow={onShow} /> — hvem varsler hvem i hvilken rekkefølge.</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Rollefordeling</strong> — krisekommunikasjonsansvarlig, evakueringsleder.</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><Term word="Handlingskort" onShow={onShow} /> — korte instrukser per scenario.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Reserveløsninger</strong> — hva gjør vi uten strøm, internett eller kassasystem?</li>
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
          <SlideLabel>Fire typer tiltak</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Fysisk sikkerhetstiltak" onShow={onShow} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Materielle, håndgripelige hindringer som begrenser fysisk tilgang. Den første barrieren i et lagdelt sikkerhetsystem.
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 4 }}>Solide dører og vinduspanser</li>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 4 }}>Kasseboks forankret i vegg</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>Brannsikre dører og -vegger</li>
            </ul>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80" alt="Fysiske sikkerhetstiltak" />
      </div>
    </Glass>
  )
}

function Slide4({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="Tekniske sikkerhetstiltak" />
        <div>
          <SlideLabel>Elektroniske systemer</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Teknisk sikkerhetstiltak" onShow={onShow} />
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}>Kameraovervåking (CCTV) — avskrekkende og bevisdokumenterende.</li>
            <li style={{ ...bodyText, marginBottom: 8 }}>Brannvarslingsanlegg — røykdetektorer og sprinkleranlegg.</li>
            <li style={bodyText}>Adgangskontroll — nøkkelkort, PIN-koder, biometri.</li>
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
          <SlideLabel>Prosedyrer og rutiner</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Administrativt tiltak" onShow={onShow} /> og <Term word="Manuelt sikkerhetstiltak" onShow={onShow} />
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Administrativt:</strong> Ransinstruks, adgangsregulering, opplæring, turnus-regler.</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Manuelt:</strong> Vektere, inspeksjonsrunder, nattevakt, resepsjonist.</li>
            <li style={bodyText}>Ansatte skal <strong style={{ color: '#f1f5f9' }}>aldri jobbe alene</strong> i risikosituasjoner (nattskift, kontanthåndtering).</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80" alt="Administrative tiltak" />
      </div>
    </Glass>
  )
}

function Slide6({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="Thon Hotel beredskap" />
        <div>
          <SlideLabel>Case — Thon Hotel</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Alle fire barrierer i praksis
          </h2>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 4 }}><strong>Fysisk:</strong> Brannsikre dører, safe forankret i vegg</li>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 4 }}><strong>Teknisk:</strong> Elektroniske nøkkelkort, kameraovervåking</li>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 4 }}><strong>Manuell:</strong> Securitas nattevakt og patruljer</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}><strong>Administrativ:</strong> Ransinstruks, beredskapsplan, månedlige øvelser</li>
            </ul>
          </div>
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
          <SlideLabel>Reserveløsninger</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Drifte uten strøm eller internett
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Moderne bedrifter er avhengige av digitale systemer. <Term word="Beredskapsplan" onShow={onShow} />en må inkludere reserverutiner for kritiske systemer som kan falle ut.
          </p>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}>Strømbrudd → nødstrøm (UPS/aggregat) for kritiske systemer</li>
            <li style={{ ...bodyText, marginBottom: 8 }}>Kassasystem ned → papirlapp + Vipps som betalingsalternativ</li>
            <li style={bodyText}>Internett ned → alle nødnummere tilgjengelig offline</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80" alt="Reserveløsninger" />
      </div>
    </Glass>
  )
}

function Slide8({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="Lovverk beredskap" />
        <div>
          <SlideLabel>Lovverk</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Internkontrollforskriften" onShow={onShow} />
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}>Gjelder <strong style={{ color: '#f1f5f9' }}>alle arbeidsgivere</strong> i Norge — ingen minstegrense for størrelse.</li>
            <li style={{ ...bodyText, marginBottom: 8 }}>Krever: kartlegge farer (ROS), utarbeide handlingsplan, gjennomføre øvelser, dokumentere.</li>
            <li style={bodyText}>Brudd kan gi <strong style={{ color: '#f1f5f9' }}>tvangsmulkt</strong> og i alvorlige tilfeller virksomhetsstopp.</li>
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
          <SlideLabel>Oppsummering</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Beredskap er kultur, ikke papir
          </h2>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: 16 }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 6 }}><Term word="Fysisk sikkerhetstiltak" onShow={onShow} /> + <Term word="Teknisk sikkerhetstiltak" onShow={onShow} /></li>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 6 }}><Term word="Manuelt sikkerhetstiltak" onShow={onShow} /> + <Term word="Administrativt tiltak" onShow={onShow} /></li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>= Helhetlig, lagdelt sikkerhet</li>
            </ul>
          </div>
          <p style={bodyText}>
            Studier viser at bedrifter med regelmessige øvelser håndterer kriser 40 % raskere — selv om planene er identiske.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80" alt="Beredskapskultur" />
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
          Kassasystemet kollapser midt i en travel lunsjrusj — hva er dine fem første handlingspunkter?
        </h2>
        <p style={{ ...bodyText, fontSize: 20 }}>
          En reserveplan er hva du gjør mens det vanlige ikke fungerer. Har din arbeidsplass svar på dette spørsmålet? Er planen øvd inn?
        </p>
      </div>
    </Glass>
  )
}

export default function BeredskapPresentation() {
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
      presentationName: 'Beredskap',
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
