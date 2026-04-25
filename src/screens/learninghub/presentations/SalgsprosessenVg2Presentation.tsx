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
  'Relasjonssalg': 'Salgsfilosofi der målet er en langvarig relasjon og gjensalg gjennom tillit, ikke et enkelt engangssalg.',
  'Behovsavdekking': 'Prosessen med å avdekke kundens egentlige behov gjennom målrettede åpne spørsmål og aktiv lytting.',
  'FAB-modellen': 'Feature–Advantage–Benefit: kobler produktets egenskaper (Feature) til fordeler (Advantage) og konkret nytte for kunden (Benefit).',
  'Åpent spørsmål': 'Spørsmål som starter med hva, hvorfor, hvordan eller hvem — inviterer til utdypende svar i stedet for ja/nei.',
  'Mersalg': 'Upselling — å oppgradere kunden til en bedre versjon av det de allerede vil kjøpe.',
  'Kryss-salg': 'Cross-selling — å selge et relatert produkt fra en annen kategori til en eksisterende kjøpsbeslutning.',
  'Kjøpssignal': 'Verbale eller ikke-verbale tegn fra kunden som indikerer at de er klare for å ta en kjøpsbeslutning.',
  'Customer lifetime value': 'Den totale verdien en kunde representerer for bedriften over hele relasjonsperioden.',
  'Forbrukerkjøpsloven': 'Norsk lov som blant annet slår fast at muntlige løfter fra selger er juridisk bindende ved forbrukerkjøp.',
  '70/30-regelen': 'Tommelfingerregel i salg: lyt 70 % av tiden og snakk 30 % — kunden avslører sine behov når de snakker.',
}

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er den viktigste fasen i salgsprosessen, og hvorfor?',
    options: [
      'Forberedelsen — uten produktkunnskap kan man ikke selge',
      'Behovsavdekkingen — uten å forstå behovet kan man ikke presentere riktig løsning',
      'Avslutningen — det er her salget faktisk skjer',
      'Oppfølgingen — gjensalg er viktigere enn førstegangssalg',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'En gjest bestiller standardrom på hotell. Resepsjonisten tilbyr junior suite til 200 kr ekstra. Hva er dette?',
    options: [
      'Kryss-salg — det er et annet produkt i en annen kategori',
      'Mersalg — en oppgradering til bedre versjon av det kunden allerede kjøper',
      'Produktpresentasjon — resepsjonisten viser bare hva som er tilgjengelig',
      'Behovsavdekking — resepsjonisten kartlegger kundens preferanser',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'FAB-modellen kobler Feature, Advantage og Benefit. Hva er Benefit?',
    options: [
      'Den tekniske egenskapen produktet har',
      'Hva egenskapen gjør rent funksjonelt',
      'Den konkrete nytten for akkurat denne kundens spesifikke behov',
      'Prisen på produktet sammenlignet med konkurrenter',
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
        Salgs-<br />
        <span style={{ color: '#38bdf8', fontStyle: 'italic' }}>prosessen</span>
      </h1>
      <p style={{ fontSize: 22, color: '#94a3b8', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.6 }}>
        Fra prospektering til lojalitet
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
          <SlideLabel>Modul – Salgsprosessen</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Profesjonelt salg og <Term word="Relasjonssalg" onShow={onShow} />
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Rådgivermodellen:</strong> Selgeren er en rådgiver, ikke en overtaler.
            </li>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}><Term word="70/30-regelen" onShow={onShow} />:</strong> Lytt 70 % av tiden — kunden avslører behovet sitt.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Mål:</strong> Ikke et engangssalg, men gjensalg gjennom tillit.
            </li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Profesjonelt salg" />
      </div>
    </Glass>
  )
}

function Slide2({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Salgsprosessens faser" />
        <div>
          <SlideLabel>Strukturert metode</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Salgsprosessens 6 faser
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 6 }}><strong style={{ color: '#38bdf8' }}>1.</strong> Forberedelse</li>
            <li style={{ ...bodyText, marginBottom: 6 }}><strong style={{ color: '#38bdf8' }}>2.</strong> Kontaktskaping</li>
            <li style={{ ...bodyText, marginBottom: 6 }}><strong style={{ color: '#38bdf8' }}>3.</strong> <Term word="Behovsavdekking" onShow={onShow} /></li>
            <li style={{ ...bodyText, marginBottom: 6 }}><strong style={{ color: '#38bdf8' }}>4.</strong> Argumentasjon og presentasjon</li>
            <li style={{ ...bodyText, marginBottom: 6 }}><strong style={{ color: '#38bdf8' }}>5.</strong> Avslutning</li>
            <li style={bodyText}><strong style={{ color: '#38bdf8' }}>6.</strong> Oppfølging</li>
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
          <SlideLabel>Den viktigste fasen</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Behovsavdekking" onShow={onShow} /> i praksis
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 10 }}>
              <strong style={{ color: '#f1f5f9' }}><Term word="Åpent spørsmål" onShow={onShow} />:</strong> "Hva slags turer bruker du ryggsekk til?" — inviterer til utdypende svar.
            </li>
            <li style={{ ...bodyText, marginBottom: 10 }}>
              <strong style={{ color: '#f1f5f9' }}>Lukket spørsmål:</strong> "Vil du ha den i blå eller svart?" — brukes til å bekrefte eller lede mot avslutning.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Aktiv lytting:</strong> Nikking, oppsummering ("Så jeg forstår det riktig at..."), taushet.
            </li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" alt="Behovsavdekking" />
      </div>
    </Glass>
  )
}

function Slide4({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="FAB-modellen" />
        <div>
          <SlideLabel>Argumentasjonsteknikk</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="FAB-modellen" onShow={onShow} />
          </h2>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 8 }}><strong style={{ color: '#38bdf8' }}>F — Feature:</strong> "Denne støvelen har Gore-Tex-membran."</li>
              <li style={{ ...bodyText, color: '#f1f5f9', marginBottom: 8 }}><strong style={{ color: '#38bdf8' }}>A — Advantage:</strong> "Den holder vann ute og lar svette slippe ut."</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}><strong>B — Benefit:</strong> "Du holder føttene tørre hele dagen — akkurat det du nevnte."</li>
            </ul>
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
          <SlideLabel>Øke verdien</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Mersalg" onShow={onShow} /> og <Term word="Kryss-salg" onShow={onShow} />
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Mersalg:</strong> Oppgradere til bedre versjon. "Vil du heller ha den med Gore-Tex?"
            </li>
            <li style={{ ...bodyText, marginBottom: 12 }}>
              <strong style={{ color: '#f1f5f9' }}>Kryss-salg:</strong> Relatert produkt fra annen kategori. "Vil du ha refleksvest i tillegg?"
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Etisk terskel:</strong> Mersalg er verdifullt kun når det er basert på kundens reelle behov.
            </li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Mersalg" />
      </div>
    </Glass>
  )
}

function Slide6({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80" alt="Møller Bil" />
        <div>
          <SlideLabel>Case: Møller Bil</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Oppfølging tre uker etter kjøp
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Selgeren ringer kunden tre uker etter billevering. Formålet er å bygge en langsiktig relasjon og øke sannsynligheten for gjensalg og videreanbefaling.
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1rem 1.5rem' }}>
            <p style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>
              <Term word="Customer lifetime value" onShow={onShow} />: En bilkjøper kan representere 4–5 kjøp over 20 år.
            </p>
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
          <SlideLabel>Case: Obs Bygg</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            "Hva skal du male på?"
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Tre ord som åpner for mersalg av grunning, riktig rull og maskeringstape. <Term word="Behovsavdekking" onShow={onShow} /> avdekker brukssituasjonen og gjør anbefalingen faglig troverdig.
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1rem 1.5rem' }}>
            <p style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>
              Kunden stoler på anbefalingen fordi den er basert på behov, ikke provisjon.
            </p>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" alt="Obs Bygg" />
      </div>
    </Glass>
  )
}

function Slide8({ onShow }: { onShow: (title: string, text: string) => void }) {
  return (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Selgermyte" />
        <div>
          <SlideLabel>Vanlig misforståelse</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Den gode selgeren prater ikke mye
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Myte:</strong> Gode selgere er utadvendte pratmakere.</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#f1f5f9' }}>Virkelighet:</strong> Forskning viser ingen sammenheng mellom ekstroversjon og salgssuksess.</li>
            <li style={bodyText}><strong style={{ color: '#f1f5f9' }}>Fakta:</strong> De beste selgerne stiller smarte spørsmål og lytter systematisk.</li>
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
          <SlideLabel>Juridisk ansvar</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Forbrukerkjøpsloven" onShow={onShow} /> — Muntlige løfter er bindende
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>Muntlige løfter er bindende:</strong> "Batteriet holder 20 timer" — hvis det holder 10, er det en mangel.
            </li>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>Reklamasjonsretten:</strong> Kunden har rett til å reklamere på feil i 2 eller 5 år.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>Angrerettloven:</strong> Ved fjernsalg (nett, telefon, dør) har kunden 14 dagers angrerett.
            </li>
          </ul>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Lovverk" />
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
          En kunde forlater butikken uten å kjøpe etter en grundig behovsavdekking. Hva er den beste reaksjonen — og hva sier det om salgsprosessen som helhet?
        </h2>
        <p style={{ ...bodyText, fontSize: 20 }}>
          Salg er ikke et kappløp til kassen — det er en invitasjon til en relasjon. La kunden gå, og sørg for at de husker deg positivt.
        </p>
      </div>
    </Glass>
  )
}

export default function SalgsprosessenVg2Presentation() {
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
      presentationName: 'Salgsprosessen',
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
