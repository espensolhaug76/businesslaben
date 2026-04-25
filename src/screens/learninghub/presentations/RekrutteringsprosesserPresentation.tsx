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
  'Rekrutteringshjulet': 'Syklisk modell som beskriver hele ansettelsesprosessen: jobbanalyse → utlysning → siling → intervju → referanse → tilbud → onboarding.',
  'Jobbanalyse': 'Systematisk kartlegging av stillingens innhold: arbeidsoppgaver, ansvarsområder, formelle krav og personlige egenskaper.',
  'Onboarding': 'Strukturert integrering av nyansatt i bedriftens kultur, systemer og arbeidsoppgaver for å sikre god start og redusere opplæringstid.',
  'Prøvetid': 'Lovbestemt periode (maks 6 måneder) der arbeidsgiver kan si opp med kortere frist ved mangelfull tilpasning, dyktighet eller pålitelighet.',
  'Referansesjekk': 'Arbeidsgiver kontakter kandidatens tidligere ledere for å verifisere opplysninger og vurdere arbeidsevne og holdninger.',
  'Personlig egnethet': 'I SSR vektlegges holdninger, serviceinnstilling og fleksibilitet høyt — ofte tyngre enn formell utdanning.',
  'Mangfoldsrekruttering': 'Bevisst strategi for å rekruttere på tvers av kjønn, etnisitet og alder for å speile kundenes mangfold.',
  'Diskrimineringsforbud': 'Likestillings- og diskrimineringsloven forbyr å spørre om graviditet, religion, seksuell orientering og etnisitet i intervjuer.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er den FØRSTE fasen i rekrutteringshjulet?',
    options: [
      'Jobbanalyse — kartlegge oppgaver og krav til stillingen',
      'Publisere stillingsannonse',
      'Gjennomføre intervjuer',
      'Sende ut tilbud til kandidaten',
    ],
    correct: 0,
    timeSeconds: 45,
  },
  {
    question: 'Hva er maksimal prøvetid etter arbeidsmiljøloven?',
    options: [
      '3 måneder',
      '6 måneder',
      '12 måneder',
      'Det er ingen lovfestet grense',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hvilke spørsmål er ULOVLIG å stille i et jobbintervju?',
    options: [
      '"Kan du jobbe lørdager og søndager?"',
      '"Har du erfaring med kassasystem?"',
      '"Er du gravid eller planlegger du graviditet?"',
      '"Hva er din sterkeste faglige egenskap?"',
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
        SSR | Økonomi og administrasjon
      </span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Rekrutterings-<br />
        <span style={{ color: '#38bdf8', fontStyle: 'italic' }}>prosesser</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>
        Fra jobbanalyse til onboarding – hele rekrutteringshjulet.
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

function Slide1({ onShow: _onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Modul 3 – Rekruttering</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Rekruttering – å finne de rette menneskene
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Strategisk investering:</strong> Rekruttering starter lenge før stillingsannonsen publiseres.
            </li>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Menneskene er produktet:</strong> I SSR leverer de ansatte opplevelsen direkte til kunden.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Kostnaden ved feilansettelse:</strong> 6–12 måneders lønn inkl. opplæring og exit.
            </li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Rekruttering" />
      </div>
    </Glass>
  )
}

function Slide2({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Rekrutteringshjul" />
        <div>
          <SlideLabel>Prosessen</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Rekrutteringshjulet" onShow={onShow} />
          </h2>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>1. Jobbanalyse</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>2. Utlysning og søknadsbehandling</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>3. Intervju og utvelgelse</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>4. Tilbud og kontrakt</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>5. Onboarding</li>
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
          <SlideLabel>Fase 1</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Jobbanalyse" onShow={onShow} /> – kartlegge oppgaver og krav
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>Grunnlaget for stillingsannonsen, intervjuguiden og prøvetidens vurderingskriterier.</p>
          <ul style={listStyle}>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Arbeidsoppgaver:</strong> Hva skal personen gjøre?</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Formelle krav:</strong> Fagbrev, sertifikater, språk.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Personlige egenskaper:</strong> Pålitelighet, serviceinnstilling, fleksibilitet.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Jobbanalyse" />
      </div>
    </Glass>
  )
}

function Slide4({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Sentrale begreper" />
        <div>
          <SlideLabel>Nøkkelbegreper</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Prøvetid" onShow={onShow} />, <Term word="Referansesjekk" onShow={onShow} /> og attest
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>Prøvetid:</strong> Maks 6 måneder. Kortere oppsigelsestid ved mangelfull tilpasning, dyktighet eller pålitelighet.
            </li>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>Referansesjekk:</strong> Verifiserer kandidatens opplysninger via tidligere arbeidsgivere.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Attest:</strong> Bekrefter ansettelsesperiode og innhold. Taushetsplikten setter grenser.
            </li>
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
          <SlideLabel>Hva SSR ser etter</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Personlig egnethet" onShow={onShow} /> i servicebransjen
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            "Hire for attitude, train for skill." I SSR ER de ansatte produktet — et surt ansikt kan ødelegge hele oppholdet.
          </p>
          <ul style={listStyle}>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Serviceinnstilling:</strong> Naturlig glede ved å hjelpe andre.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Pålitelighet:</strong> Møter alltid presis. Holder avtaler.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Fleksibilitet:</strong> Kvelds-, helge- og helligdagsvakter.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Personlig egnethet" />
      </div>
    </Glass>
  )
}

function Slide6({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Mangfold" />
        <div>
          <SlideLabel>Eksempel: Vy Drammen</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Mangfoldsrekruttering" onShow={onShow} /> i praksis
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            <strong style={{ color: '#f1f5f9' }}>Problemet:</strong> Sjåførmangel og lav kvinneandel i bransjen.
          </p>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            <strong style={{ color: '#f1f5f9' }}>Løsningen:</strong> Oppsøkte kandidater på tvers av kjønn, etnisitet og alder. Tilbød intern opplæring til busslisens.
          </p>
          <p style={bodyText}>
            <strong style={{ color: '#f1f5f9' }}>Resultatet:</strong> Økt mangfold, bedre trivselsscorer og nasjonal mangfoldspris.
          </p>
        </div>
      </div>
    </Glass>
  )
}

function Slide7({ onShow: _onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Eksempel: Kiwi</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Kiwi-metoden – kroppsspråk og fleksibilitet
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            "Karakterer forteller hva du kan. Kroppsspråk viser hvem du er."
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <p style={{ ...bodyText, color: '#38bdf8', fontWeight: 700, textAlign: 'center' }}>
              Intervjuet starter idet du trer inn i bygget – ikke når du setter deg ned.
            </p>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Intervju" />
      </div>
    </Glass>
  )
}

function Slide8({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80" alt="Misforståelser" />
        <div>
          <SlideLabel>Misforståelser</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Vanlige myter om rekruttering og <Term word="Prøvetid" onShow={onShow} />
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>Myte:</strong> Manglende erfaring diskvalifiserer. <strong style={{ color: '#38bdf8' }}>Feil</strong> — SSR prioriterer holdninger.
            </li>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>Myte:</strong> Prøvetid = fri oppsigelse. <strong style={{ color: '#38bdf8' }}>Feil</strong> — saklig grunn kreves alltid.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Myte:</strong> Arbeidsavtalen kan endres muntlig. <strong style={{ color: '#38bdf8' }}>Feil</strong> — vesentlige endringer krever skriftlig enighet.
            </li>
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
          <SlideLabel>Lovverk</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Arbeidsmiljøloven og <Term word="Diskrimineringsforbud" onShow={onShow} />
          </h2>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><strong>AML kap. 14:</strong> Krav til arbeidsavtale og likebehandling</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><strong>AML kap. 15:</strong> Oppsigelsesvern og fortrinnsrett</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>Forbudt å spørre om: graviditet, religion, etnisitet, seksuell orientering</li>
            </ul>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Lovverk" />
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
          Hva ville du spurt en kandidat for å avdekke holdninger — ikke bare kunnskap?
        </h2>
        <p style={{ ...bodyText, fontSize: 20 }}>
          Riktig person i riktig stilling gir bedre service, lavere sykefravær og et sterkere omdømme. En grundig jobbanalyse er hjulets nav som alle andre faser spinner rundt.
        </p>
      </div>
    </Glass>
  )
}

export default function RekrutteringsprosesserPresentation() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const { liveSlide, isStudentLive, teacherLiveCode } = useLiveSync()
  const liveCode = teacherLiveCode ?? (isStudentLive ? localStorage.getItem('student-classroom-code') : null)
  const fromFirebaseRef = useRef(false)
  useEffect(() => { if (liveSlide !== null) { fromFirebaseRef.current = true; setCurrent(liveSlide) } }, [liveSlide])
  _isLive = isStudentLive
  // Teacher big-screen: write current slide to Firebase so students follow
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
      presentationName: 'Rekrutteringsprosesser',
    }))
    setLivePin(pin)
    setShowPinModal(true)
  }

  // Sync current slide (and active quiz question) to localStorage
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

      {/* Term modal */}
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

      {/* PIN modal */}
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
