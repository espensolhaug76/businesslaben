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
  'Strategisk planlegging': 'Prosessen med å sette langsiktig kurs: Visjon → Analyse → Mål → Strategi → Implementering.',
  'PESTEL-analyse': 'Kartlegging av de ytre makroforholdene: Politikk, Økonomi, Sosialt, Teknologi, Miljø og Lovverk.',
  'SWOT-analyse': 'Oppsummering av situasjonsanalysen: Strengths (styrker), Weaknesses (svakheter), Opportunities (muligheter), Threats (trusler).',
  'Porters fem krefter': 'Modell for å analysere bransjens attraktivitet: rivalisering, nyetablerere, substitutter, leverandørmakt og kundemakt.',
  'Brand Equity': 'Verdien merkenavnet tilfører det fysiske produktet – den immaterielle merkeverdien.',
  'IMC': 'Integrert markedskommunikasjon: "En stemme utad" – samordning av alle kanaler og budskap.',
  'SMART-mål': 'Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt – rammeverket for gode mål.',
  'CSR': 'Corporate Social Responsibility: Bedriftens frivillige bidrag til en bedre verden utover lovens krav.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er hovedformålet med en SWOT-analyse?',
    options: [
      'Å beregne bedriftens finansielle nøkkeltall',
      'Å kartlegge styrker, svakheter, muligheter og trusler som grunnlag for strategivalg',
      'Å analysere konkurrentenes reklamekampanjer',
      'Å planlegge en markedsføringskampanje',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva innebærer Porters femte kraft – kundemakt?',
    options: [
      'Kundenes evne til å by på produkter i en auksjon',
      'Kundenes mulighet til å presse bedriften på pris eller kreve mer service',
      'Antall kunder i markedet totalt sett',
      'Kundenes lojalitet overfor merkevaren',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva er Integrert Markedskommunikasjon (IMC)?',
    options: [
      'En metode for å måle reklameeffekt i sosiale medier',
      'En samordning av alle kommunikasjonskanaler for å fremstå med én konsistent stemme',
      'Et system for å håndtere kundeservicehenvendelser',
      'En prisingsmodell for digitale annonsekjøp',
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
      <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.5em', marginBottom: 16, display: 'block', textTransform: 'uppercase', fontSize: 14 }}>ML2 | Markedsføring og Ledelse</span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        Strategisk<br /><span style={{ color: '#38bdf8', fontStyle: 'italic' }}>markedsføring</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>ML2 – Strategi, merkevare og ledelse på høyeste nivå.</p>
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

function Slide1({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>ML2 – Slide 1</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}><Term word="Strategisk planlegging" onShow={show} /></h2>
          <p style={bodyText}>Strategi er valgene som sikrer overlevelse og vekst på lang sikt. Planleggingsprosessen går fra visjon og analyse, via mål og strategi til implementering og kontroll.</p>
          <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Visjon', 'Analyse', 'Mål', 'Strategi', 'Implementering'].map((s, i) => (
              <div key={s} style={{ padding: '0.5rem 1rem', background: i === 2 ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.05)', border: i === 2 ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)', borderRadius: 99, color: i === 2 ? '#38bdf8' : '#94a3b8', fontSize: 14, fontWeight: 600 }}>{s}</div>
            ))}
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Strategisk planlegging" />
      </div>
    </Glass>
  )
}

function Slide2({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>ML2 – Slide 2</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}><Term word="PESTEL-analyse" onShow={show} /></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { bokstav: 'P', ord: 'Politikk', farge: '#38bdf8' },
            { bokstav: 'E', ord: 'Økonomi', farge: '#a78bfa' },
            { bokstav: 'S', ord: 'Sosialt', farge: '#4ade80' },
            { bokstav: 'T', ord: 'Teknologi', farge: '#fb923c' },
            { bokstav: 'E', ord: 'Miljø', farge: '#34d399' },
            { bokstav: 'L', ord: 'Lovverk', farge: '#f472b6' },
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${item.farge}30`, borderRadius: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: item.farge, lineHeight: 1 }}>{item.bokstav}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 8, fontWeight: 600 }}>{item.ord}</div>
            </div>
          ))}
        </div>
        <p style={{ ...bodyText, marginTop: 24, fontSize: 16 }}>Kartlegg de ytre makroforholdene før du setter strategien.</p>
      </div>
    </Glass>
  )
}

function Slide3({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80" alt="SWOT-analyse" />
        <div>
          <SlideLabel>ML2 – Slide 3</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}><Term word="SWOT-analyse" onShow={show} /></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'S – Styrker', color: '#4ade80', desc: 'Hva er vi gode på?' },
              { label: 'W – Svakheter', color: '#f87171', desc: 'Hva kan vi bli bedre på?' },
              { label: 'O – Muligheter', color: '#38bdf8', desc: 'Hva kan vi utnytte?' },
              { label: 'T – Trusler', color: '#fb923c', desc: 'Hva kan skade oss?' },
            ].map(item => (
              <div key={item.label} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${item.color}30`, borderRadius: 12 }}>
                <div style={{ fontWeight: 700, color: item.color, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.desc}</div>
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
        <SlideLabel>ML2 – Slide 4</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}><Term word="Porters fem krefter" onShow={show} /></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { nr: '1', tittel: 'Rivalisering', tekst: 'Hvor hardt kjemper eksisterende bedrifter mot hverandre?' },
            { nr: '2', tittel: 'Nyetablerere', tekst: 'Hvor høye er barrierene for å starte opp i bransjen?' },
            { nr: '3', tittel: 'Substitutter', tekst: 'Finnes det helt andre produkter som løser samme behov?' },
            { nr: '4', tittel: 'Leverandørmakt', tekst: 'Kan leverandørene presse oss på pris eller kvalitet?' },
            { nr: '5', tittel: 'Kundemakt', tekst: 'Kan kundene presse oss på pris eller kreve mer service?' },
          ].map(item => (
            <div key={item.nr} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              <span style={{ minWidth: 28, height: 28, background: '#38bdf8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#030712', fontSize: 13 }}>{item.nr}</span>
              <span style={{ fontWeight: 700, color: '#f1f5f9', minWidth: 150, fontSize: 15 }}>{item.tittel}</span>
              <span style={{ color: '#94a3b8', fontSize: 15 }}>{item.tekst}</span>
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
          <SlideLabel>ML2 – Slide 5</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Merkevarestrategier og <Term word="Brand Equity" onShow={show} /></h2>
          <p style={bodyText}>En sterk merkevare er bedriftens viktigste immaterielle eiendel. <Term word="Brand Equity" onShow={show} /> bygges gjennom kjennskap, opplevd kvalitet, sterke assosiasjoner og lojalitet.</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Aakers merkevaremodell: Kjennskap, kvalitet, assosiasjoner og lojalitet', 'Paraplymerke vs. individuelle merker', 'Merkeutvidelse: Bruke kjent navn i ny kategori'].map(t => (
              <div key={t} style={{ padding: '0.75rem 1rem', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, color: '#94a3b8', fontSize: 14 }}>{t}</div>
            ))}
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80" alt="Merkevare" />
      </div>
    </Glass>
  )
}

function Slide6({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SlideLabel>ML2 – Slide 6</SlideLabel>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}><Term word="SMART-mål" onShow={show} /></h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
          {[
            { bokstav: 'S', ord: 'Spesifikt', farge: '#38bdf8' },
            { bokstav: 'M', ord: 'Målbart', farge: '#a78bfa' },
            { bokstav: 'A', ord: 'Ambisiøst', farge: '#4ade80' },
            { bokstav: 'R', ord: 'Realistisk', farge: '#fb923c' },
            { bokstav: 'T', ord: 'Tidsbestemt', farge: '#f472b6' },
          ].map(item => (
            <div key={item.bokstav} style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.05)', border: `2px solid ${item.farge}40`, borderRadius: 20, textAlign: 'center', minWidth: 130 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: item.farge, lineHeight: 1 }}>{item.bokstav}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 8, fontWeight: 600 }}>{item.ord}</div>
            </div>
          ))}
        </div>
        <p style={{ ...bodyText, marginTop: 24, fontSize: 16 }}>Uten tydelige mål er det umulig å vite om strategien virker.</p>
      </div>
    </Glass>
  )
}

function Slide7({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Kommunikasjonsstrategi" />
        <div>
          <SlideLabel>ML2 – Slide 7</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}><Term word="IMC" onShow={show} /> – Integrert kommunikasjon</h2>
          <p style={bodyText}>"En stemme utad" – samordning av alle kommunikasjonskanaler. Den digitale kundereisen: Oppdage → Vurdere → Konvertere → Beholde.</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Mål → Målgruppe → Kanalvalg → Budsjett → Kontroll', 'KPI-er: ROI, klikkrate og konverteringsgrad', 'Content Marketing bygger autoritet og tillit'].map(t => (
              <div key={t} style={{ padding: '0.75rem 1rem', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, color: '#94a3b8', fontSize: 14 }}>{t}</div>
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
      <div style={twoCol}>
        <div>
          <SlideLabel>ML2 – Slide 8</SlideLabel>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}><Term word="CSR" onShow={show} /> og samfunnsansvar</h2>
          <p style={bodyText}>Bærekraft er ikke lenger en kostnad, men en forutsetning for overlevelse. <Term word="CSR" onShow={show} /> handler om bedriftens frivillige bidrag utover det loven krever.</p>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Triple Bottom Line: Profit, People, Planet', 'FNs 17 bærekraftsmål som strategisk rammeverk', 'Sirkulær økonomi: design for gjenbruk og reparasjon', 'Grønnvasking ødelegger omdømmet'].map(t => (
              <div key={t} style={{ padding: '0.75rem 1rem', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 10, color: '#94a3b8', fontSize: 14 }}>{t}</div>
            ))}
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Bærekraft og CSR" />
      </div>
    </Glass>
  )
}

function Slide9({ show }: { show: (t: string, d: string) => void }) {
  return (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <SlideLabel>ML2 – Slide 9 – Oppsummering</SlideLabel>
        <h2 style={{ fontSize: 52, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Hva har vi lært?</h2>
        <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 24, padding: '2.5rem', textAlign: 'left' }}>
          <ul style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 2, margin: 0, paddingLeft: 24 }}>
            <li><Term word="Strategisk planlegging" onShow={show} /> gir retning og reduserer tilfeldigheter</li>
            <li><Term word="PESTEL-analyse" onShow={show} /> kartlegger ytre makroforhold</li>
            <li><Term word="SWOT-analyse" onShow={show} /> kobler interne og eksterne faktorer</li>
            <li><Term word="Porters fem krefter" onShow={show} /> avgjør bransjens lønnsomhet</li>
            <li><Term word="Brand Equity" onShow={show} /> er bedriftens viktigste immaterielle eiendel</li>
            <li><Term word="CSR" onShow={show} /> er en forutsetning for langsiktig suksess</li>
          </ul>
        </div>
        <p style={{ color: '#64748b', fontSize: 15, marginTop: 20, fontStyle: 'italic' }}>Strategisk markedsføring er broen mellom analyse og resultat.</p>
      </div>
    </Glass>
  )
}

export default function ML2Presentation() {
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
      presentationName: 'Strategisk markedsføring ML2',
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
