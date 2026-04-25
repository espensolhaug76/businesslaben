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
  'Forbrukerkjøpsloven': 'Loven som regulerer kjøp der en næringsdrivende selger til en privatperson. Gir kunden reklamasjonsrett og andre minimumsrettigheter.',
  'Reklamasjonsrett': 'Kundens lovfestede rett til å klage på feil eller mangler som forelå ved levering. Gjelder 2 eller 5 år avhengig av produkttype.',
  'Angrerettloven': 'Lov som gir forbrukere 14 dagers angrefrist ved fjernsalg (netthandel, telefonsalg) og dørsalg. Gjelder ikke kjøp over disk i butikk.',
  'Garanti': 'Frivillig løfte fra produsent eller selger om ekstra beskyttelse utover det loven krever. Er uavhengig av reklamasjonsretten.',
  'Bytterett': 'Frivillig service fra butikken — ikke en lovfestet rettighet. Butikken bestemmer egne vilkår og kan nekte.',
  'Markedsføringsloven': 'Loven som forbyr villedende markedsføring, stiller krav til prisinformasjon og regulerer "før-og-nå-pris" i kampanjer.',
  'Pakkereiseloven': 'Særskilt lov som gir forbrukere sterk beskyttelse ved kjøp av pakkereiser (fly og hotell kombinert).',
  'Bevisbyrde': 'Hvem som må bevise at varen var feilfri ved levering. Innen 12 måneder: selger. Etter 12 måneder: kunden.',
  'Fjernsalg': 'Salg som skjer uten at kjøper og selger er fysisk til stede — netthandel, telefonsalg og postordre. Utløser angrerettsloven.',
  'Forbrukertilsynet': 'Statlig organ som håndhever markedsføringsloven og forbrukerlovgivningen. Kan gi pålegg og overtredelsesgebyr.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'En kunde kjøper en mobiltelefon. Etter 3 år slutter skjermen å fungere. Har kunden reklamasjonsrett?',
    options: [
      'Nei — 2-årsfristen er utløpt',
      'Ja — mobiltelefoner har 5 års reklamasjonsfrist',
      'Avhenger av om kunden har kvitteringen',
      'Nei — elektronikk har alltid 2 års frist',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'En kunde kjøper en jakke over disk i butikken og vil levere den tilbake etter 2 dager. Har de lovfestet angrerett?',
    options: [
      'Ja — 14-dagersregelen gjelder alle kjøp',
      'Nei — angrerettloven gjelder ikke kjøp i butikk',
      'Ja, men bare om jakken ikke er brukt',
      'Avhenger av butikkens egen policy',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'En vaskemaskin har 2 års garanti. Etter 3 år slutter den å fungere. Har kunden rettigheter?',
    options: [
      'Nei — garantien er utløpt',
      'Ja — reklamasjonsretten gjelder i 5 år for hvitevarer, uavhengig av garantien',
      'Avhenger av om de kjøpte utvidet garanti',
      'Nei — etter 2 år er alle rettigheter borte',
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
        SSR | Økonomi og administrasjon
      </span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Regelverk for<br />
        <span style={{ color: '#38bdf8', fontStyle: 'italic' }}>servicebedrifter</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>
        Forbrukerkjøpsloven, angrerett og reklamasjonsregler
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
          <SlideLabel>Fase 1 – Din juridiske rolle</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Fagarbeideren som juridisk representant
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>Alle som selger til forbrukere er underlagt <Term word="Forbrukerkjøpsloven" onShow={onShow} />.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}>Som ansatt er du bedriftens juridiske representant — det du sier og gjør, binder bedriften.</li>
            <li style={bodyText}>Du plikter å ivareta kundens lovfestede rettigheter OG beskytte bedriften mot uberettigede krav.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Juridisk ansvar" />
      </div>
    </Glass>
  )
}

function Slide2({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Reklamasjon" />
        <div>
          <SlideLabel>Fase 2 – Reklamasjonsrett</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Reklamasjonsrett" onShow={onShow} /> — to viktige frister
          </h2>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 8 }}><strong>2 år:</strong> Forbruksartikler (batterier, lyspærer)</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}><strong>5 år:</strong> Langvarige produkter (mobiler, hvitevarer, møbler)</li>
            </ul>
          </div>
          <p style={{ ...bodyText, marginTop: 16 }}>
            <Term word="Bevisbyrde" onShow={onShow} />: Innen 12 måneder beviser selger. Etter 12 måneder beviser kunden.
          </p>
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
          <SlideLabel>Fase 3 – Angrerettloven</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Angrerettloven" onShow={onShow} /> — 14 dager
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>Gjelder ved <Term word="Fjernsalg" onShow={onShow} /> (netthandel, telefonsalg) og dørsalg.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}>Kunden trenger ingen begrunnelse — "jeg angrer" er tilstrekkelig.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}>Selger må tilby fri retur ved bruk av angreretten.</li>
            <li style={bodyText}><strong style={{ color: '#f87171' }}>Unntak:</strong> Kjøp over disk i butikk og enkelt-hotellovernatting.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80" alt="Netthandel angrerett" />
      </div>
    </Glass>
  )
}

function Slide4({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Garanti vs reklamasjon" />
        <div>
          <SlideLabel>Fase 4 – Garanti vs reklamasjon</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            To ulike rettigheter
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#38bdf8' }}>Reklamasjon:</strong> Lovfestet — kan aldri fratas. Gjelder feil som forelå ved levering.
            </li>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#94a3b8' }}><Term word="Garanti" onShow={onShow} />:</strong> Frivillig løfte fra produsent/selger. Ekstra beskyttelse utover loven.
            </li>
            <li style={bodyText}>
              Utløpt garanti betyr IKKE at <Term word="Reklamasjonsrett" onShow={onShow} /> er borte — de er uavhengige!
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
          <SlideLabel>Fase 5 – Reiseliv</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Pakkereiseloven" onShow={onShow} /> og overnattingsunntaket
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>Pakkereiser (fly + hotell) er dekket av Pakkereiseloven — sterk forbrukerbeskyttelse.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}>Enkelt-hotellovernatting er eksplisitt <strong style={{ color: '#f87171' }}>unntatt</strong> fra Angrerettloven.</li>
            <li style={bodyText}>Les alltid hotellets avbestillingsvilkår — de gjelder, ikke angrerettloven.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80" alt="Reiseliv hotell" />
      </div>
    </Glass>
  )
}

function Slide6({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Elkjøp reklamasjon" />
        <div>
          <SlideLabel>Case – Elkjøp</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Reklamasjon i praksis
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Riktig rekkefølge for tiltak:
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 4 }}>1. Reparasjon eller omlevering</li>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 4 }}>2. Prisavslag</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>3. Heving (refusjon) — siste utvei</li>
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
          <SlideLabel>Fase 7 – Avtaleinngåelse</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Når er du bundet av avtalen?
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>Avtale er bindende når et tilbud er mottatt og akseptert.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}>Netthandel: binding skjer ved mottatt <strong style={{ color: '#f1f5f9' }}>ordrebekreftelse</strong>, ikke bare bestillingskvittering.</li>
            <li style={bodyText}>Åpenbar feilprisning (99 kr for en TV) er ikke bindende — kunden burde skjønt feilen.</li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80" alt="Avtaleinngåelse" />
      </div>
    </Glass>
  )
}

function Slide8({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Bytterett misforståelse" />
        <div>
          <SlideLabel>Fase 8 – Misforståelse</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Bytterett" onShow={onShow} /> er ikke lovfestet
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}><strong style={{ color: '#38bdf8' }}>Bytterett/åpent kjøp:</strong> Frivillig gave fra butikken. Ingen lovhjemmel.</li>
            <li style={{ ...bodyText, marginBottom: 12 }}><strong style={{ color: '#38bdf8' }}>Reklamasjon:</strong> Lovfestet — gjelder alltid ved feil og mangler.</li>
            <li style={bodyText}>"Liker ikke" er ikke en mangel. Kunden er avhengig av butikkens frivillige bytteordning.</li>
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
          <SlideLabel>Fase 9 – Tre sentrale lover</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Lovverket du må kjenne
          </h2>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 8 }}><Term word="Forbrukerkjøpsloven" onShow={onShow} /> — reklamasjon og feil/mangler</li>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 8 }}><Term word="Angrerettloven" onShow={onShow} /> — 14 dager ved fjernsalg</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><Term word="Markedsføringsloven" onShow={onShow} /> — forbud mot villedende markedsføring</li>
            </ul>
          </div>
          <p style={{ ...bodyText, marginTop: 16 }}>
            <Term word="Forbrukertilsynet" onShow={onShow} /> kan hjelpe forbrukere med tvisteløsning uten domstol.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80" alt="Lovverk" />
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
          Hvordan kan kunnskap om forbrukerrettigheter gjøre deg til en bedre ansatt — og hva skjer hvis du IKKE kjenner regelverket?
        </h2>
        <p style={{ ...bodyText, fontSize: 20 }}>
          Den ansatte som kjenner regelverket beskytter kunden OG bedriften — og er urokkelig i krevende situasjoner.
        </p>
      </div>
    </Glass>
  )
}

export default function RegelverkServicebedrifterPresentation() {
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
      presentationName: 'Regelverk for servicebedrifter',
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
