import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { useGame } from '../GameContext'
import { MENTOR_TRIGGERS, mentorMelding } from '../data/mentorTriggers'
import Fagord from './Fagord'
import type { GameState } from '../types'

// ─── LÆRINGSLAGET — mentoren (Espen) ──────────────────────────────────────────
// Hjørnefigur nede til høyre: nøytral i hvile, smiler når han snakker. Korte
// meldinger i en snakkeboble (data i mentorTriggers.ts). ALDRI modal, avbryter
// ALDRI et åpent scenario/overlay — meldinger køes til `blocked` er falsk.
// Hver trigger fyres MAKS ÉN GANG; settet persisteres i localStorage (byspill-
// state lagres ikke ellers), så én-gangs-logikken overlever reload. Klikk på
// figuren uten aktiv melding = åpne ordboken.

const NOYTRAL = '/assets/raw/mentor/espen-noytral.png'
const SMIL = '/assets/raw/mentor/espen-smil.png'
const KEY = 'mentor_fired_v1'

function loadFired(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { return new Set() }
}
function saveFired(s: Set<string>) {
  try { localStorage.setItem(KEY, JSON.stringify([...s])) } catch { /* ignore */ }
}

/** Tilstands-avledede triggere. Flate-baserte (forste_prising/disk_stell/vindu/
 *  bykart) fyres via window-event ('mentor:signal'), ikke herfra. */
function oppfylt(id: string, s: GameState): boolean {
  switch (id) {
    case 'forste_apning': return s.dayPhase === 'åpen'
    case 'forste_laan': return s.loans.length > 0
    case 'forste_manedsoppgjor': return s.lastMonthSettlement != null
    case 'forste_svinn': return (s.lastDayResult?.svinnStk ?? 0) > 0
    case 'forste_tomt_trau': return (s.lastDayResult?.tomtProdukter.length ?? 0) > 0
    case 'forste_ko': return (s.lastDayResult?.koKunder ?? 0) > 0
    case 'forste_p_fullfort': return s.p1_complete || s.p2_complete || s.p3_complete || s.p4_complete
    case 'alle_p_fullfort': return s.p1_complete && s.p2_complete && s.p3_complete && s.p4_complete
    default: return false
  }
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

export default function Mentor({ blocked, onOpenOrdbok }: { blocked: boolean; onOpenOrdbok: () => void }) {
  const { state } = useGame()
  const [fired, setFired] = useState<Set<string>>(loadFired)
  const [queue, setQueue] = useState<string[]>([])
  const [failedImg, setFailedImg] = useState(false)
  const firedRef = useRef(fired)
  firedRef.current = fired

  const fire = useCallback((id: string) => {
    if (!id || firedRef.current.has(id)) return
    const n = new Set(firedRef.current).add(id)
    firedRef.current = n
    setFired(n); saveFired(n)
    setQueue(q => (q.includes(id) ? q : [...q, id]))
  }, [])

  // Tilstands-avledede triggere: sjekk ved hver state-endring (fired-settet
  // hindrer gjentakelse).
  useEffect(() => {
    for (const t of MENTOR_TRIGGERS) if (oppfylt(t.id, state)) fire(t.id)
  }, [state, fire])

  // UI-signalerte triggere (Priser-fanen).
  useEffect(() => {
    const h = (e: Event) => fire((e as CustomEvent).detail?.id)
    window.addEventListener('mentor:signal', h)
    return () => window.removeEventListener('mentor:signal', h)
  }, [fire])

  const activeId = !blocked && queue.length > 0 ? queue[0]! : null
  const melding = activeId ? mentorMelding(activeId) : null
  const speaking = !!melding

  return (
    <div style={{ position: 'fixed', right: 14, bottom: 14, zIndex: 170, display: 'flex', alignItems: 'flex-end', gap: 8, fontFamily: "'Outfit', sans-serif", pointerEvents: 'none' }}>
      {melding && (
        <div style={{
          pointerEvents: 'auto', maxWidth: 300, marginBottom: 20,
          background: 'rgba(12,17,29,0.98)', border: '1px solid rgba(0,212,170,0.4)',
          borderRadius: '14px 14px 4px 14px', padding: '0.75rem 0.9rem',
          color: '#e2e8f0', boxShadow: '0 10px 34px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.05em' }}>ESPEN</span>
            <button onClick={() => setQueue(q => q.slice(1))} title="Lukk" style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 14, cursor: 'pointer', lineHeight: 1, padding: 0 }}>✕</button>
          </div>
          <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{renderMelding(melding)}</div>
        </div>
      )}

      <button
        onClick={() => { if (!melding) onOpenOrdbok() }}
        title={melding ? 'Espen' : 'Åpne ordboken'}
        style={{
          pointerEvents: 'auto', background: 'transparent', border: 'none', cursor: melding ? 'default' : 'pointer',
          padding: 0, width: 96, height: 120, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
      >
        {!failedImg ? (
          <img
            src={speaking ? SMIL : NOYTRAL}
            alt="Mentor Espen"
            draggable={false}
            onError={() => setFailedImg(true)}
            style={{ height: '100%', width: 'auto', display: 'block', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))', userSelect: 'none' }}
          />
        ) : (
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#00d4aa22', border: '2px solid #00d4aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🧑‍🏫</div>
        )}
      </button>
    </div>
  )
}
