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
  'Markedsføring': 'Prosessen med å skape verdi for kunden og bygge sterke relasjoner for å få verdi tilbake.',
  'MANGO-modellen': 'Markedsføring drives av Mennesker, Ansvar, Nettverk, Gjennomføring og Overvåking.',
  'Triple Bottom Line': 'Måle suksess på tre dimensjoner: Økonomisk, Sosial og Miljømessig bærekraft.',
  'B2C': 'Business-to-Consumer: Privatpersoner som handler til eget bruk. Kjennetegnes av mange kunder og følelsesstyrte kjøp.',
  'B2B': 'Business-to-Business: Virksomheter som handler av hverandre. Få kunder, store beløp, rasjonelle beslutninger.',
  'Segmentering': 'Dele markedet inn i grupper med like behov og egenskaper for å kunne tilpasse tilbudet bedre.',
  'STP-prosessen': 'Segmentering, Målgruppevalg og Posisjonering – de tre stegene for å finne riktig kunde.',
  'Posisjonering': 'Skape en unik plass i kundens hode sammenlignet med konkurrenter.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er kjernen i definisjonen av markedsføring?',
    options: [
      'Å lage reklame og annonser for produkter',
      'Å skape verdi for kunden og bygge sterke relasjoner for å få verdi tilbake',
      'Å selge flest mulig produkter til høyest mulig pris',
      'Å analysere konkurrentenes produkter og priser',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva kjennetegner bedriftsmarkedet (B2B) sammenlignet med forbrukermarkedet (B2C)?',
    options: [
      'Mange kunder, lave beløp og følelsestyrte kjøp',
      'Produktene er alltid dyrere i B2B enn B2C',
      'Få kunder, store beløp og rasjonelle beslutninger',
      'B2B bruker alltid mer reklame enn B2C',
    ],
    correct: 2,
    timeSeconds: 45,
  },
  {
    question: 'Hva betyr STP i markedsføringen?',
    options: [
      'Salg, Tilbud og Pris',
      'Segmentering, Targeting (målgruppevalg) og Posisjonering',
      'Strategi, Taktikk og Plan',
      'Service, Tillit og Profitt',
    ],
    correct: 1,
    timeSeconds: 45,
  },
]

const ORIGINAL_SLIDES = 10
const TOTAL_SLIDES = ORIGINAL_SLIDES + QUIZ_SLIDES.length

function Term({ word, onShow }: { word: string; onShow: (title: string, text: string) => void }) {
  return (
    <span
      onClick={() => onShow(word, TERMS[word] ?? '')}
      style={{ color: '#38bdf8', borderBottom: '2px dashed #38bdf8', cursor: 'help', fontWeight: 600, padding: '0 4px', borderRadius: 4, display: 'inline-block', transition: 'background 0.2s, transform 0.2s' }}
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
    <button
      onClick={onClick}
      disabled={disabled}
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

function SlideImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)' }} />
}

function SlideLabel({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', marginBottom: 16, textTransform: 'uppercase' }}>{children}</h2>
}

const twoCol: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }
const bodyText: React.CSSProperties = { fontSize: 18, color: '#cbd5e1', lineHeight: 1.7 }

function Slide0({ onNext, onStartLiveSession }: { onNext: () => void; onStartLiveSession: () => void }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.5em', marginBottom: 16, display: 'block', textTransform: 'uppercase', fontSize: 14 }}>ML1 | Markedsføring og Ledelse</span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Markedsføring<br /><span style={{ color: '#38bdf8', fontStyle: 'italic' }}>og ledelse</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>ML1 – Introduksjon til faget, markeder og kjøpsatferd.</p>
      {_isLive ? (
        <p style={{ fontSize: 18, color: '#94a3b8', fontWeight: 400 }}>Venter på at læreren starter presentasjonen…</p>
      ) : (
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
      )}
    </div>
  )
}

function Slide1({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>ML1 – Slide 1</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Hva er <Term word="Markedsføring" onShow={show} />?</h2>
          <p style={bodyText}><Term word="Markedsføring" onShow={show} /> er prosessen med å skape verdi for kunden og bygge sterke relasjoner for å få verdi tilbake. Det handler om mer enn reklame – det er hele bedriftens tilnærming til markedet.</p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" alt="Markedsføring og verdiskaping" />
      </div>
    </Glass>
  )
}

function Slide2({ show: _show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>ML1 – Slide 2</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Behov vs. Ønsker vs. Etterspørsel</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: 24 }}>
          {[
            { label: 'Behov', color: '#38bdf8', desc: 'Mangelfølelse – fysiologisk. Eks: sult, tørst, trygghet.' },
            { label: 'Ønsker', color: '#a78bfa', desc: 'Hvordan vi dekker behovet – formet av kultur og personlighet.' },
            { label: 'Etterspørsel', color: '#4ade80', desc: 'Ønsker støttet av kjøpekraft. Markedsføreren påvirker ønsker, ikke behov.' },
          ].map(item => (
            <div key={item.label} style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${item.color}40`, borderRadius: 20 }}>
              <div style={{ fontWeight: 800, color: item.color, fontSize: 20, marginBottom: 12 }}>{item.label}</div>
              <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

function Slide3({ show: _show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Fagets utvikling" />
        <div>
          <SlideLabel>ML1 – Slide 3</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Fagets utvikling</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { år: '1900-tallet', tekst: 'Produksjonsorientering – selg mest mulig' },
              { år: '1950-tallet', tekst: 'Salgsorientering – overtal kunden' },
              { år: '1970-tallet', tekst: 'Markedsorientering – forstå kunden' },
              { år: 'I dag', tekst: 'Samfunnsorientering – bærekraft og ansvar' },
            ].map(item => (
              <div key={item.år} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ minWidth: 90, fontWeight: 700, color: '#38bdf8', fontSize: 14 }}>{item.år}</span>
                <span style={{ color: '#cbd5e1', fontSize: 16 }}>{item.tekst}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Glass>
  )
}

function Slide4({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>ML1 – Slide 4</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}><Term word="MANGO-modellen" onShow={show} /></h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          {[
            { bokstav: 'M', ord: 'Mennesker', farge: '#38bdf8' },
            { bokstav: 'A', ord: 'Ansvar', farge: '#a78bfa' },
            { bokstav: 'N', ord: 'Nettverk', farge: '#4ade80' },
            { bokstav: 'G', ord: 'Gjennomføring', farge: '#fb923c' },
            { bokstav: 'O', ord: 'Overvåking', farge: '#f472b6' },
          ].map(item => (
            <div key={item.bokstav} style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.05)', border: `2px solid ${item.farge}40`, borderRadius: 20, textAlign: 'center', minWidth: 140 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: item.farge, lineHeight: 1 }}>{item.bokstav}</div>
              <div style={{ color: '#cbd5e1', fontSize: 15, marginTop: 8, fontWeight: 600 }}>{item.ord}</div>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

function Slide5({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>ML1 – Slide 5</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}><Term word="Triple Bottom Line" onShow={show} /></h2>
          <p style={bodyText}>Bærekraftig markedsføring måler suksess på tre dimensjoner – ikke bare økonomi. Bedrifter som tar alle tre på alvor, overlever lengre og bygger sterkere merkevarer.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Økonomi', icon: '💰', desc: 'Lønnsomhet og vekst' },
            { label: 'Sosial', icon: '👥', desc: 'Ansatte, kunder og lokalsamfunn' },
            { label: 'Miljø', icon: '🌱', desc: 'Klima, natur og fremtidige generasjoner' },
          ].map(item => (
            <div key={item.label} style={{ padding: '1rem 1.5rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: 16 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

function Slide6({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>ML1 – Slide 6</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>Markedstyper: <Term word="B2C" onShow={show} /> og <Term word="B2B" onShow={show} /></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ padding: '2rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 20 }}>
            <div style={{ fontWeight: 800, color: '#38bdf8', fontSize: 20, marginBottom: 16 }}>B2C – Forbrukermarkedet</div>
            <ul style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 2, margin: 0, paddingLeft: 20 }}>
              <li>Privatpersoner som handler til eget bruk</li>
              <li>Mange kunder, mindre beløp</li>
              <li>Følelsestyrte kjøp</li>
              <li>Eks: Butikk, netthandel</li>
            </ul>
          </div>
          <div style={{ padding: '2rem', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: 20 }}>
            <div style={{ fontWeight: 800, color: '#a78bfa', fontSize: 20, marginBottom: 16 }}>B2B – Bedriftsmarkedet</div>
            <ul style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 2, margin: 0, paddingLeft: 20 }}>
              <li>Virksomheter handler av hverandre</li>
              <li>Få kunder, store beløp</li>
              <li>Rasjonelle beslutninger</li>
              <li>Eks: Råvareleverandører, IT-løsninger</li>
            </ul>
          </div>
        </div>
      </div>
    </Glass>
  )
}

function Slide7({ show: _show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Markedsundersøkelse" />
        <div>
          <SlideLabel>ML1 – Slide 7</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Markedsinformasjon</h2>
          <p style={bodyText}>Gode beslutninger krever gode data. Sekundærdata (SSB, rapporter) er billig og raskt. Primærdata (egne undersøkelser) er dyrere men mer spesifikke.</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Kvalitativ metode: Dybde og "hvorfor"', 'Kvantitativ metode: Bredde og tall', 'Validitet: Måler vi det vi tror vi måler?'].map(t => (
              <div key={t} style={{ padding: '0.75rem 1rem', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, color: '#94a3b8', fontSize: 15 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </Glass>
  )
}

function Slide8({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>ML1 – Slide 8</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}><Term word="STP-prosessen" onShow={show} /></h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          {[
            { steg: '1', tittel: 'Segmentering', tekst: 'Del markedet inn i grupper med like behov (demografi, geografi, psykografi, atferd).' },
            { steg: '2', tittel: 'Målgruppevalg', tekst: 'Velg de segmentene som passer best med bedriftens ressurser og mål.' },
            { steg: '3', tittel: 'Posisjonering', tekst: 'Skap en unik plass i kundens hode sammenlignet med konkurrenter.' },
          ].map(item => (
            <div key={item.steg} style={{ flex: '1 1 250px', padding: '2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 20 }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#38bdf8', marginBottom: 12 }}>{item.steg}</div>
              <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 18, marginBottom: 10 }}>{item.tittel}</div>
              <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{item.tekst}</p>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  )
}

function Slide9({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <SlideLabel>ML1 – Slide 9 – Oppsummering</SlideLabel>
        <h2 style={{ fontSize: 52, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Hva har vi lært?</h2>
        <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 24, padding: '2.5rem', textAlign: 'left' }}>
          <ul style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 2, margin: 0, paddingLeft: 24 }}>
            <li><Term word="Markedsføring" onShow={show} /> handler om verdiskaping og relasjoner</li>
            <li>Behov, ønsker og etterspørsel er ulike konsepter</li>
            <li>Faget har utviklet seg fra produksjon til bærekraft</li>
            <li><Term word="B2C" onShow={show} /> og <Term word="B2B" onShow={show} /> har ulike kjennetegn</li>
            <li><Term word="STP-prosessen" onShow={show} /> hjelper oss å finne riktig kunde</li>
          </ul>
        </div>
        <p style={{ color: '#64748b', fontSize: 15, marginTop: 20, fontStyle: 'italic' }}>Markedsføring er broen mellom bedriften og kunden.</p>
      </div>
    </Glass>
  )
}

export default function ML1Presentation() {
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
      presentationName: 'Markedsføring og ledelse',
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
          {current === 1 && <Slide1 show={show} />}
          {current === 2 && <Slide2 show={show} />}
          {current === 3 && <Slide3 show={show} />}
          {current === 4 && <Slide4 show={show} />}
          {current === 5 && <Slide5 show={show} />}
          {current === 6 && <Slide6 show={show} />}
          {current === 7 && <Slide7 show={show} />}
          {current === 8 && <Slide8 show={show} />}
          {current === 9 && <Slide9 show={show} />}
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
