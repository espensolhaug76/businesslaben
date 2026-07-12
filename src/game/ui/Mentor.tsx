import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { MENTOR_TRIGGERS, mentorMelding, faneTriggere, MENTOR_INTRO } from '../data/mentorTriggers'
import Fagord from './Fagord'
import OrdbokPanel from './OrdbokPanel'
import type { GameState } from '../types'

// ─── LÆRINGSLAGET — mentoren (Espen) ──────────────────────────────────────────
// Hjørnefigur nede til høyre, ALLTID synlig (også over dashbord/oppgjør), med en
// liten 📖-bok ved figuren. Klikk boka/figuren (uten aktiv melding) → ordboken
// «slår seg opp» ved figuren og Espen leser (espen-leser). Poser (prioritet):
//   leser (ordbok åpen) > smil (aktiv melding) > peker (melding i kø/ventende) >
//   nøytral.
// Meldinger (data i mentorTriggers.ts) fyres MAKS ÉN GANG (localStorage-sett,
// overlever reload). DASHBORD blokkerer IKKE — fane-triggere vises inne i
// dashbordet. Scenario/dagsoppgjør blokkerer: da KØES meldingen og figuren PEKER
// («jeg har noe til deg»); klikk peker-figuren for å vise den, og den vises av
// seg selv når flaten lukkes.

const POSE = {
  noytral: '/assets/raw/mentor/espen-noytral.png',
  smil: '/assets/raw/mentor/espen-smil.png',
  leser: '/assets/raw/mentor/espen-leser.png',
  peker: '/assets/raw/mentor/espen-peker.png',
}
const KEY = 'mentor_fired_v1'

function loadFired(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { return new Set() }
}
function saveFired(s: Set<string>) {
  try { localStorage.setItem(KEY, JSON.stringify([...s])) } catch { /* ignore */ }
}

// INTRO: vises én gang per lagring (localStorage-flagg).
const INTRO_KEY = 'mentor_intro_v1'
function introDone(): boolean {
  try { return localStorage.getItem(INTRO_KEY) === '1' } catch { return false }
}
function saveIntroDone() {
  try { localStorage.setItem(INTRO_KEY, '1') } catch { /* ignore */ }
}

/** Tilstands-avledede HENDELSES-triggere. Scene-signaler (disk_stell/vindu/
 *  bykart) kommer via 'mentor:signal'; fane-triggere via 'mentor:fane'. */
function oppfylt(id: string, s: GameState): boolean {
  switch (id) {
    case 'forste_apning': return s.dayPhase === 'åpen'
    case 'forste_bestilling_levert': return s.lastDelivery != null
    case 'forste_laan': return s.loans.length > 0
    case 'forste_manedsoppgjor': return s.lastMonthSettlement != null
    case 'forste_svinn': return (s.lastDayResult?.svinnStk ?? 0) > 0
    case 'forste_tomt_trau': return (s.lastDayResult?.tomtProdukter.length ?? 0) > 0
    case 'forste_ko': return (s.lastDayResult?.koKunder ?? 0) > 0
    case 'forste_p_fullfort': return s.p1_complete || s.p2_complete || s.p3_complete || s.p4_complete
    case 'alle_p_fullfort': return s.p1_complete && s.p2_complete && s.p3_complete && s.p4_complete
    // TEMA 1: Beredskap (tema_beredskap_aktivert fyres via aktiveTemaer-effekten).
    case 'beredskap_plan_bekreftet': return s.beredskap.planBekreftet
    case 'beredskap_risiko_levert': return s.beredskap.risikoRader.some(r => r.tiltak.trim() !== '')
    case 'beredskap_brannalarm_handtert': return !!s.beredskap.brannalarmUtfall?.valgId
    default: return false
  }
}

const RISIKO_RANG: Record<string, number> = { lav: 1, middels: 2, høy: 3 }

/** Dynamiske mentor-meldinger som leser elevens egne verdier (beredskap).
 *  Faller tilbake på den statiske teksten for andre id-er. */
function dynamiskMentorMelding(id: string, s: GameState): string | undefined {
  if (id === 'beredskap_risiko_levert') {
    const verst = [...s.beredskap.risikoRader]
      .sort((a, b) => (RISIKO_RANG[b.sannsynlighet]! + RISIKO_RANG[b.konsekvens]!) - (RISIKO_RANG[a.sannsynlighet]! + RISIKO_RANG[a.konsekvens]!))[0]
    if (verst?.fare) return `Du vurderte «${verst.fare}» som en av de største risikoene (${verst.sannsynlighet} sannsynlighet × ${verst.konsekvens} konsekvens). Hva er det viktigste tiltaket ditt akkurat der?`
  }
  if (id === 'beredskap_brannalarm_handtert') {
    const k = s.beredskap.brannalarmUtfall?.kvalitet
    if (k === 'good') return 'Godt jobbet under brannalarmen — du fulgte planen og satte tryggheten først. Det er nettopp derfor vi øver.'
    if (k === 'bad') return 'Du valgte å selge videre mens alarmen ulte. Hvorfor tror du butikken har en beredskapsplan i det hele tatt?'
    if (k === 'warn') return 'Du grep slukkeapparatet. Husk at planen sier «slukk KUN hvis det er trygt» — ellers går evakuering og varsling først. Hva ville du gjort neste gang?'
  }
  return mentorMelding(id)
}

/** Render en melding med [[GLOSSARY_ID|tekst]]-tokens som klikkbare <Fagord>. */
function renderMelding(melding: string): ReactNode {
  const re = /\[\[([A-Z0-9_]+)\|([^\]]+)\]\]/g
  const parts: ReactNode[] = []
  let last = 0, key = 0, m: RegExpExecArray | null
  while ((m = re.exec(melding)) !== null) {
    if (m.index > last) parts.push(melding.slice(last, m.index))
    parts.push(<Fagord key={key++} id={m[1]!}>{m[2]}</Fagord>)
    last = m.index + m[0].length
  }
  if (last < melding.length) parts.push(melding.slice(last))
  return parts
}

export default function Mentor({ blocked }: { blocked: boolean }) {
  const { state, aktiveTemaer } = useGame()
  const [fired, setFired] = useState<Set<string>>(loadFired)
  const [queue, setQueue] = useState<string[]>([])          // HENDELSES-kø (peker/kø)
  const [faneMsg, setFaneMsg] = useState<string | null>(null)  // KONTEKSTBUNDET fane-melding
  const [activeFane, setActiveFane] = useState<string | null>(null)
  const [failedImg, setFailedImg] = useState(false)
  const [ordbokOpen, setOrdbokOpen] = useState(false)
  const [forceShow, setForceShow] = useState(false)   // bruker klikket peker-figuren
  // INTRO ved spillstart (null = ferdig/skjult, 0..2 = steg). Vises én gang.
  const [introStep, setIntroStep] = useState<number | null>(() => introDone() ? null : 0)
  function finishIntro() { saveIntroDone(); setIntroStep(null) }
  const firedRef = useRef(fired); firedRef.current = fired
  // Refs så event-lyttere (mentor:fane) leser FERSKE verdier uten å re-bindes.
  const ordbokOpenRef = useRef(ordbokOpen); ordbokOpenRef.current = ordbokOpen
  const blockedRef = useRef(blocked); blockedRef.current = blocked
  const activeFaneRef = useRef(activeFane)

  /** Marker en trigger som fyrt (persistert sett), UTEN å kø. Returnerer false
   *  hvis den alt var fyrt. */
  const persistFired = useCallback((id: string) => {
    if (firedRef.current.has(id)) return false
    const n = new Set(firedRef.current).add(id)
    firedRef.current = n
    setFired(n); saveFired(n)
    return true
  }, [])

  // HENDELSES-trigger: fyres én gang og legges i køen (vises når ikke blokkert,
  // ellers peker figuren til den kan vises).
  const fire = useCallback((id: string) => {
    if (!id || !persistFired(id)) return
    setQueue(q => (q.includes(id) ? q : [...q, id]))
  }, [persistFired])

  useEffect(() => {
    for (const t of MENTOR_TRIGGERS) if (oppfylt(t.id, state)) fire(t.id)
  }, [state, fire])

  // TEMA: fyr «tema_beredskap_aktivert» når temaet slås på for klassen.
  useEffect(() => {
    if (aktiveTemaer['beredskap']?.aktiv) fire('tema_beredskap_aktivert')
  }, [aktiveTemaer, fire])

  // Scene-signaler (disk_stell/vindu/bykart) → hendelses-kø.
  useEffect(() => {
    const h = (e: Event) => fire((e as CustomEvent).detail?.id)
    window.addEventListener('mentor:signal', h)
    return () => window.removeEventListener('mentor:signal', h)
  }, [fire])

  // KONTEKSTBUNDNE fane-triggere: dashbordet melder aktiv fane (eller null når
  // det lukkes). Fane-meldingen vises KUN mens den fanen er aktiv. Rekker den
  // ikke frem (ordbok/blokkert/aktiv hendelsesmelding ved fanebytte) blir den
  // IKKE markert fyrt ⇒ re-armes til neste besøk. Aldri drypp i feil fane / ute
  // i spillet.
  const eventShowingRef = useRef(false)
  const handleFane = useCallback((fane: string | null) => {
    if (fane === activeFaneRef.current) return          // ingen reell endring
    activeFaneRef.current = fane
    setActiveFane(fane)
    setFaneMsg(null)                                     // forlot forrige fane ⇒ dropp meldingen
    if (!fane) return                                    // dashbordet lukket
    if (ordbokOpenRef.current || blockedRef.current || eventShowingRef.current) return  // kan ikke vises → re-arm
    const t = faneTriggere(fane).find(t => !firedRef.current.has(t.id))
    if (t && persistFired(t.id)) setFaneMsg(t.id)
  }, [persistFired])

  useEffect(() => {
    const h = (e: Event) => handleFane((e as CustomEvent).detail?.fane ?? null)
    window.addEventListener('mentor:fane', h)
    return () => window.removeEventListener('mentor:fane', h)
  }, [handleFane])

  const hasQueued = queue.length > 0
  const reveal = !blocked || forceShow
  const eventId = reveal && hasQueued ? queue[0]! : null
  const eventMelding = eventId ? dynamiskMentorMelding(eventId, state) : null
  eventShowingRef.current = !!eventMelding
  // Fane-melding vises kun mens fanen er aktiv, ikke under ordbok/blokkering.
  const faneMelding = (faneMsg && !ordbokOpen && !blocked) ? mentorMelding(faneMsg) : null
  const melding = eventMelding ?? faneMelding     // hendelse har forrang over fane

  // Pose-prioritet: leser > smil (m/boble) > peker (kø) > nøytral.
  // INVARIANT: smil ⇔ `melding != null` ⇔ bobla rendres nedenfor. En melding som
  // ikke KAN vises (blokkert, ikke force-vist) gir melding=null ⇒ pose blir peker
  // (kø) eller nøytral — ALDRI smil uten boble. Container-z (500) > alle
  // spill-overlays, så bobla ligger aldri bak dashbord/oppgjør; LiveBar er flyttet
  // vekk fra dette hjørnet.
  const pose = ordbokOpen ? POSE.leser
    : melding ? POSE.smil
    : (blocked && hasQueued) ? POSE.peker
    : POSE.noytral

  function dismiss() {
    if (eventMelding) { setQueue(q => q.slice(1)); setForceShow(false) }
    else if (faneMsg) setFaneMsg(null)
  }

  function figureClick() {
    if (ordbokOpen) { setOrdbokOpen(false); return }
    if (blocked && hasQueued && !forceShow) { setForceShow(true); return }  // peker → vis kø-melding
    if (melding) return                                                     // aktiv melding vises alt
    setOrdbokOpen(true)                                                     // i ro → åpne ordboka
  }

  return (
    <>
      {/* INTRO ved spillstart — stor Espen midt på skjermen, 3 steg, kan hoppes
          over; på siste steg «Kom i gang!» krymper han mot hjørnet. */}
      <AnimatePresence>
        {introStep !== null && (
          <motion.div
            key="mentor-intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 600, pointerEvents: 'auto',
              background: 'rgba(5,8,15,0.85)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Outfit', sans-serif", padding: '1.5rem',
            }}
          >
            <motion.img
              src={POSE.smil} alt="Espen" draggable={false}
              initial={{ scale: 0.6, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.22, x: '42vw', y: '42vh', opacity: 0 }}   // krymper mot hjørnet
              transition={{ type: 'spring', stiffness: 190, damping: 22 }}
              style={{ height: 'min(46vh, 380px)', width: 'auto', filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.6))', userSelect: 'none' }}
            />
            <div style={{
              maxWidth: 460, marginTop: 18, textAlign: 'center',
              background: 'rgba(12,17,29,0.98)', border: '1px solid rgba(0,212,170,0.4)',
              borderRadius: 16, padding: '1.1rem 1.4rem', color: '#e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.09em', marginBottom: 8 }}>ESPEN</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.55, minHeight: 72 }}>{renderMelding(MENTOR_INTRO[introStep] ?? '')}</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '14px 0 2px' }}>
                {MENTOR_INTRO.map((_, i) => (
                  <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: i === introStep ? '#00d4aa' : 'rgba(255,255,255,0.22)' }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <button onClick={finishIntro} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Hopp over
                </button>
                <button
                  onClick={() => introStep < MENTOR_INTRO.length - 1 ? setIntroStep(introStep + 1) : finishIntro()}
                  style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.55rem 1.5rem', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {introStep < MENTOR_INTRO.length - 1 ? 'Neste →' : 'Kom i gang!'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    <div style={{ position: 'fixed', right: 14, bottom: 14, zIndex: 500, display: 'flex', alignItems: 'flex-end', gap: 8, fontFamily: "'Outfit', sans-serif", pointerEvents: 'none' }}>
      {/* Snakkeboble */}
      <AnimatePresence>
        {melding && (
          <motion.div
            key={eventId ?? faneMsg}
            initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            style={{
              pointerEvents: 'auto', maxWidth: 300, marginBottom: 20,
              background: 'rgba(12,17,29,0.98)', border: '1px solid rgba(0,212,170,0.4)',
              borderRadius: '14px 14px 4px 14px', padding: '0.75rem 0.9rem',
              color: '#e2e8f0', boxShadow: '0 10px 34px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.05em' }}>ESPEN</span>
              <button onClick={dismiss} title="Lukk" style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 14, cursor: 'pointer', lineHeight: 1, padding: 0 }}>✕</button>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{renderMelding(melding)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ordbok — «slår seg opp» ved figuren (bok-ramme, lett åpne-animasjon) */}
      <AnimatePresence>
        {ordbokOpen && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.72, scaleY: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1, rotate: 0 }}
            exit={{ opacity: 0, scaleX: 0.72, scaleY: 0.9, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              pointerEvents: 'auto', transformOrigin: 'bottom right',
              position: 'fixed', right: 118, bottom: 24, width: 360, maxWidth: 'calc(100vw - 150px)',
              maxHeight: 'min(72vh, 560px)', display: 'flex', flexDirection: 'column',
              background: 'linear-gradient(180deg, rgba(18,24,38,0.99), rgba(12,17,29,0.99))',
              border: '1px solid rgba(180,140,90,0.5)', borderLeft: '5px solid rgba(180,140,90,0.85)',
              borderRadius: '10px 14px 14px 10px', boxShadow: '0 18px 50px rgba(0,0,0,0.6)', overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0.9rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#e2c290' }}>📖 Espens ordbok</span>
              <button onClick={() => setOrdbokOpen(false)} title="Lukk ordboka" style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 16, cursor: 'pointer', lineHeight: 1, padding: 2 }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', padding: '0.8rem 0.9rem 1rem' }}>
              <OrdbokPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Figur + bok-knapp */}
      <div style={{ position: 'relative', pointerEvents: 'auto' }}>
        <button
          onClick={figureClick}
          title={ordbokOpen ? 'Lukk ordboka' : melding ? 'Espen' : (blocked && hasQueued) ? 'Espen har noe til deg — klikk' : 'Åpne ordboka'}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: 0, width: 96, height: 120, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
        >
          {!failedImg ? (
            <img src={pose} alt="Mentor Espen" draggable={false} onError={() => setFailedImg(true)}
              style={{ height: '100%', width: 'auto', display: 'block', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))', userSelect: 'none' }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#00d4aa22', border: '2px solid #00d4aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🧑‍🏫</div>
          )}
        </button>

        {/* Diskret 📖-bok ved figuren — alltid synlig, egen inngang til ordboka. */}
        <button
          onClick={e => { e.stopPropagation(); setOrdbokOpen(o => !o) }}
          title="Espens ordbok"
          style={{
            position: 'absolute', left: -6, bottom: 6,
            width: 30, height: 30, borderRadius: 8, cursor: 'pointer', fontSize: 15, lineHeight: 1,
            background: ordbokOpen ? 'rgba(226,194,144,0.25)' : 'rgba(12,17,29,0.92)',
            border: `1px solid ${ordbokOpen ? '#e2c290' : 'rgba(226,194,144,0.55)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
          }}
        >📖</button>
      </div>
    </div>
    </>
  )
}
