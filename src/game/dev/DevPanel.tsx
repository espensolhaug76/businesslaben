// ─── DEV-PANEL (⚙) — samlet dev-verktøy ──────────────────────────────────────
// ÉN fast ⚙ DEV-knapp nede til VENSTRE, synlig på ALLE spillruter når ?dev=1
// (bykart, bydel, storefront, inne, disk). Klikk → skuff med ALLE dev-handlinger
// gruppert med overskrifter. Erstatter de spredte dev-knappene som lå løst rundt
// om (Espen fant dem ikke). Kalibrerings-/tracer-verktøyene FLYTTES ikke — de
// bor fortsatt i scenene; panelet toggler bare synligheten deres (se devPanel.ts).
//
// Regel: en handling som mangler kontekst (f.eks. «siste kunde» før noe møte)
// vises DEAKTIVERT med forklarende tekst — aldri skjult. Aldri kun farge:
// hver knapp har alltid en tekstlabel.

import { useGame, useErTemaAktivt, turistsesongInfo } from '../GameContext'
import { useDevPanel, setDevPanel, toggleDevPanel } from './devPanel'
import { STAMKUNDER_AKTIV } from '../data/featureFlags'

const FONT = "'Outfit', sans-serif"

export default function DevPanel({ onOpenSim, isInterior }: {
  onOpenSim: () => void
  isInterior: boolean
}) {
  const { state, dispatch, aktiveTemaer, klasseNivaa, klasseNivaaDev, setKlasseNivaaDev } = useGame()
  const { open, kalibrering, scenariovelger } = useDevPanel()
  const beredskapAktiv = useErTemaAktivt('beredskap')
  const reiselivAktiv = useErTemaAktivt('reiseliv')

  const aktiveTemaIds = Object.entries(aktiveTemaer).filter(([, v]) => v?.aktiv).map(([k]) => k)
  const allPs = state.p1_complete && state.p2_complete && state.p3_complete && state.p4_complete
  const harLeid = !!state.rentedLocationId
  const åpenDag = state.dayPhase === 'åpen'
  const harAktivEpost = state.messages.some(m => m.epost && (m.epostStatus === 'ubesvart' || m.epostStatus === 'akseptert'))
  const sesongAktiv = !!turistsesongInfo(state)?.aktiv
  // Første returnerende kunde (utviklingstrinn ≥ 1 eller misfornøyd sist) — for
  // å spawne et stamkundemøte og teste gjenkjenningsflyten.
  const returnerendeId = Object.entries(state.stamkunder)
    .find(([, sk]) => (sk.utviklingstrinn ?? 0) >= 1 || sk.sisteUtfall === 'misfornoyd')?.[0]

  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 95, fontFamily: FONT }}>
      {/* Skuffen (over knappen) */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 52, left: 0, width: 268,
          maxHeight: 'min(72vh, 620px)', overflowY: 'auto',
          background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(148,163,184,0.28)',
          borderRadius: 16, padding: '0.85rem 0.9rem 1rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)', color: '#e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.08em' }}>⚙ DEV-VERKTØY</span>
            <button onClick={() => setDevPanel({ open: false })} style={xStyle}>✕</button>
          </div>

          <Group title="Nivå">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, flex: 1 }}>
                Nå: {klasseNivaa.toUpperCase()}{klasseNivaaDev ? ' (DEV)' : ''}
              </span>
              {(['vg1', 'vg2'] as const).map(n => (
                <button key={n} onClick={() => setKlasseNivaaDev(klasseNivaaDev === n ? null : n)}
                  style={pill(klasseNivaaDev === n ? '#facc15' : '#facc1544', klasseNivaaDev === n ? 'rgba(250,204,21,0.25)' : 'rgba(250,204,21,0.06)', '#fde68a')}>
                  {n.toUpperCase()}
                </button>
              ))}
            </div>
          </Group>

          <Group title="Espen spør">
            <DevBtn
              label="🎓 Still neste spørsmål nå"
              color="#d8b4fe" bg="rgba(168,85,247,0.16)"
              disabled={!!state.espenSpor.aktivt}
              reason={state.espenSpor.aktivt ? 'Et spørsmål ligger allerede i mentor-køen.' : undefined}
              onClick={() => dispatch({ type: 'STILL_ESPEN_SPOR', nivaa: klasseNivaa, aktiveTemaIds, dev: true })}
            />
          </Group>

          <Group title="Stamkunder">
            <DevBtn
              label="👋 Gjør siste kunde til stamkunde"
              color="#5eead4" bg="rgba(45,212,191,0.14)"
              disabled={!STAMKUNDER_AKTIV || !state.sisteMoteKundeId}
              reason={!STAMKUNDER_AKTIV ? 'Parkert — kommer som stamkort-tiltak.'
                : !state.sisteMoteKundeId ? 'Møt en kunde først — ingen «siste kunde» ennå.' : undefined}
              onClick={() => dispatch({ type: 'DEV_GJOR_STAMKUNDE' })}
            />
            <DevBtn
              label="👥 Spawn stamkundemøte nå"
              color="#5eead4" bg="rgba(45,212,191,0.1)"
              disabled={!STAMKUNDER_AKTIV || !åpenDag || !returnerendeId}
              reason={!STAMKUNDER_AKTIV ? 'Parkert — kommer som stamkort-tiltak.'
                : !åpenDag ? 'Krever åpen dag.'
                : !returnerendeId ? 'Ingen returnerende stamkunde ennå (spill et scenario med godt utfall først).' : undefined}
              onClick={() => returnerendeId && dispatch({ type: 'DEV_SPAWN_MOTE', scenarioId: returnerendeId, kind: 'stamkunde' })}
            />
          </Group>

          <Group title="Innboks">
            <DevBtn
              label="⏩ Send test-e-post av hver type"
              color="#d8b4fe" bg="rgba(168,85,247,0.16)"
              onClick={() => dispatch({ type: 'DEV_SEND_TEST_EPOSTER' })}
            />
            <DevBtn
              label="⏩ Spol til frist"
              color="#d8b4fe" bg="rgba(168,85,247,0.1)"
              disabled={!harAktivEpost}
              reason={!harAktivEpost ? 'Ingen aktive e-poster/frister å forfalle.' : undefined}
              onClick={() => dispatch({ type: 'DEV_SPOL_TIL_FRIST' })}
            />
          </Group>

          <Group title="Tema">
            <DevBtn
              label="🔥 Utløs brannalarm"
              color="#fca5a5" bg="rgba(239,68,68,0.14)"
              disabled={!(beredskapAktiv && åpenDag && state.beredskap.planBekreftet)}
              reason={!(beredskapAktiv && åpenDag && state.beredskap.planBekreftet)
                ? 'Krever aktivt beredskap-tema, åpen dag og bekreftet beredskapsplan.' : undefined}
              onClick={() => dispatch({ type: 'TRIGGER_BRANNALARM' })}
            />
            <DevBtn
              label="⏩ Start turistsesong nå"
              color="#7dd3fc" bg="rgba(56,189,248,0.16)"
              disabled={!reiselivAktiv}
              reason={!reiselivAktiv ? 'Krever aktivt reiseliv-tema.' : undefined}
              onClick={() => dispatch({ type: 'START_TURISTSESONG' })}
            />
            <DevBtn
              label="⏩ Spol til sesongslutt"
              color="#7dd3fc" bg="rgba(56,189,248,0.1)"
              disabled={!sesongAktiv}
              reason={!sesongAktiv ? 'Ingen aktiv turistsesong.' : undefined}
              onClick={() => dispatch({ type: 'DEV_SPOL_TURISTSESONG_SLUTT' })}
            />
          </Group>

          <Group title="Scenarier">
            <ToggleBtn
              label="🎭 Scenariovelger" on={scenariovelger}
              onClick={() => toggleDevPanel('scenariovelger')}
            />
            <div style={hintStyle}>
              {isInterior ? 'Vises øverst til venstre i interiørscenen.' : 'Vises i interiørscenen (inne, bak disken).'}
            </div>
          </Group>

          <Group title="Kalibrering">
            <ToggleBtn
              label="🛠 Tracer- og kalibreringsverktøy" on={kalibrering}
              onClick={() => toggleDevPanel('kalibrering')}
            />
            <div style={hintStyle}>Sonetracere + kalibreringspaneler i den aktive scenen.</div>
          </Group>

          <Group title="Annet">
            <DevBtn
              label="▶ Simuler måneden (gammel PEST)"
              color="#86efac" bg="rgba(34,197,94,0.14)"
              disabled={!(allPs && harLeid)}
              reason={!(allPs && harLeid) ? 'Krever ferdig oppstart (P1–P4) og leid lokale.' : undefined}
              onClick={onOpenSim}
            />
          </Group>
        </div>
      )}

      {/* ⚙ DEV-knappen (fast nede til venstre) */}
      <button
        onClick={() => setDevPanel({ open: !open })}
        title="Dev-verktøy (?dev=1)"
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: open ? 'rgba(56,189,248,0.22)' : 'rgba(10,14,26,0.92)',
          border: `1px solid ${open ? '#38bdf8' : 'rgba(148,163,184,0.4)'}`,
          borderRadius: 99, padding: '0.5rem 0.95rem', color: open ? '#7dd3fc' : '#cbd5e1',
          fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        ⚙ DEV {open ? '▾' : '▸'}
      </button>
    </div>
  )
}

// ── Byggeklosser ──────────────────────────────────────────────────────────────

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 900, color: '#64748b', letterSpacing: '0.08em', marginBottom: 5 }}>
        {title.toUpperCase()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>{children}</div>
    </div>
  )
}

function DevBtn({ label, color, bg, onClick, disabled, reason }: {
  label: string; color: string; bg: string; onClick: () => void; disabled?: boolean; reason?: string
}) {
  return (
    <div>
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={{
          width: '100%', textAlign: 'left', background: disabled ? 'rgba(255,255,255,0.03)' : bg,
          border: `1px solid ${disabled ? 'rgba(148,163,184,0.18)' : color + '55'}`,
          borderRadius: 9, padding: '0.5rem 0.7rem',
          color: disabled ? '#64748b' : color, fontWeight: 700, fontSize: 12.5,
          cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: FONT,
          opacity: disabled ? 0.75 : 1,
        }}
      >
        {label}
      </button>
      {disabled && reason && (
        <div style={{ fontSize: 10, color: '#64748b', margin: '2px 0 0 2px', lineHeight: 1.35 }}>⛔ {reason}</div>
      )}
    </div>
  )
}

function ToggleBtn({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: on ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${on ? '#38bdf8' : 'rgba(148,163,184,0.28)'}`,
        borderRadius: 9, padding: '0.5rem 0.7rem',
        color: on ? '#7dd3fc' : '#cbd5e1', fontWeight: 700, fontSize: 12.5,
        cursor: 'pointer', fontFamily: FONT,
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 800, color: on ? '#7dd3fc' : '#64748b' }}>{on ? 'PÅ' : 'AV'}</span>
    </button>
  )
}

const xStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 8, width: 24, height: 24, color: '#94a3b8', cursor: 'pointer',
  fontSize: 13, fontFamily: FONT, lineHeight: 1,
}

const hintStyle: React.CSSProperties = { fontSize: 10, color: '#64748b', margin: '1px 0 0 2px', lineHeight: 1.35 }

function pill(border: string, bg: string, color: string): React.CSSProperties {
  return {
    background: bg, border: `1px solid ${border}`, borderRadius: 99,
    padding: '0.3rem 0.7rem', color, fontWeight: 800, fontSize: 11,
    cursor: 'pointer', fontFamily: FONT,
  }
}
