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

import { useState } from 'react'
import { useGame, useErTemaAktivt, turistsesongInfo } from '../GameContext'
import { useDevPanel, setDevPanel, toggleDevPanel } from './devPanel'
import { STAMKUNDER_AKTIV, TURISTSESONG_AKTIV } from '../data/featureFlags'
import { FAG_KODER, FAG_META } from '../data/fag'
import { SCENARIOS } from '../sales/scenarios'

const FONT = "'Outfit', sans-serif"

export default function DevPanel({ onOpenSim, isInterior }: {
  onOpenSim: () => void
  isInterior: boolean
}) {
  const { state, dispatch, aktiveTemaer, klasseNivaa, klasseNivaaDev, setKlasseNivaaDev,
    fagAktiv, fagDev, setFagDev,
    espenSporStyring, espenSporDev, setEspenSporDevAktiv, setEspenSporDevFag,
    nullstillDevOverstyringer } = useGame()
  const { open, kalibrering, scenariovelger } = useDevPanel()
  const beredskapAktiv = useErTemaAktivt('beredskap')
  const reiselivAktiv = useErTemaAktivt('reiseliv')

  const aktiveTemaIds = Object.entries(aktiveTemaer).filter(([, v]) => v?.aktiv).map(([k]) => k)
  // «Espen spør»-fagpool (samme fasit som Mentor): valgt av lærer ∩ globalt aktivt.
  const espenAktiveFag = FAG_KODER.filter(f => espenSporStyring.fag[f] && fagAktiv[f])
  const allPs = state.p1_complete && state.p2_complete && state.p3_complete && state.p4_complete
  const harLeid = !!state.rentedLocationId
  const åpenDag = state.dayPhase === 'åpen'
  const harAktivEpost = state.messages.some(m => m.epost && (m.epostStatus === 'ubesvart' || m.epostStatus === 'akseptert'))
  const sesongAktiv = !!turistsesongInfo(state)?.aktiv
  // Første returnerende kunde (utviklingstrinn ≥ 1 eller misfornøyd sist) — for
  // å spawne et stamkundemøte og teste gjenkjenningsflyten.
  const returnerendeId = Object.entries(state.stamkunder)
    .find(([, sk]) => (sk.utviklingstrinn ?? 0) >= 1 || sk.sisteUtfall === 'misfornoyd')?.[0]
  // Direkte salgssituasjon-øving (flyttet fra dashbordets Oversikt-fane).
  const [valgtScenario, setValgtScenario] = useState(SCENARIOS[0]?.id ?? 'morgenkunden')

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

          <Group title="Fag (overstyrer lærer)">
            {FAG_KODER.map(f => {
              const erDev = fagDev[f] !== undefined
              return (
                <div key={f}>
                  <ToggleBtn
                    label={`${FAG_META[f].kort} · ${FAG_META[f].navn}`}
                    on={fagAktiv[f]}
                    onClick={() => setFagDev(f, !fagAktiv[f])}
                  />
                  <div style={hintStyle}>
                    Nå: {erDev ? 'DEV' : 'lærer/standard'}
                    {f === 'ks' && ' · KS ligger i kundemøtene (alltid på) — bryteren styrer KS-spørsmål fra Espen og KS-temaer.'}
                  </div>
                </div>
              )
            })}
            <div style={hintStyle}>Fag som er av er HELT skjult: faner, temaer, innboks-tilbud, «Espen spør».</div>
          </Group>

          <Group title="Espen spør (overstyrer lærer)">
            {/* Hovedbryter (av/på) — lokal overstyring av lærerens aktiv-flagg. */}
            <div>
              <ToggleBtn
                label="Espen spør på/av" on={espenSporStyring.aktiv}
                onClick={() => setEspenSporDevAktiv(!espenSporStyring.aktiv)}
              />
              <div style={hintStyle}>Nå: {espenSporDev.aktiv !== undefined ? 'DEV' : 'lærer/standard'}</div>
            </div>
            {/* Fag det spørres fra — kun fag som er aktive kan velges. */}
            {FAG_KODER.map(f => {
              const globaltAv = !fagAktiv[f]
              const valgt = espenSporStyring.fag[f]
              const erDev = espenSporDev.fag[f] !== undefined
              return (
                <div key={f}>
                  <ToggleBtn
                    label={`Spør fra ${FAG_META[f].kort}`}
                    on={valgt && !globaltAv}
                    onClick={() => { if (!globaltAv) setEspenSporDevFag(f, !valgt) }}
                  />
                  <div style={hintStyle}>
                    {globaltAv ? `Faget ${FAG_META[f].kort} er slått av` : `Nå: ${erDev ? 'DEV' : 'lærer/standard'}`}
                  </div>
                </div>
              )
            })}
            <DevBtn
              label="🎓 Still neste spørsmål nå"
              color="#d8b4fe" bg="rgba(168,85,247,0.16)"
              disabled={!!state.espenSpor.aktivt || espenAktiveFag.length === 0}
              reason={state.espenSpor.aktivt ? 'Et spørsmål ligger allerede i mentor-køen.'
                : espenAktiveFag.length === 0 ? 'Ingen fag valgt/aktivt å spørre fra.' : undefined}
              onClick={() => dispatch({ type: 'STILL_ESPEN_SPOR', nivaa: klasseNivaa, aktiveTemaIds, aktiveFag: espenAktiveFag, dev: true })}
            />
            <div style={hintStyle}>Still-knappen overstyrer av/på lokalt, men respekterer fagvalget.</div>
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
              disabled={!TURISTSESONG_AKTIV || !reiselivAktiv}
              reason={!TURISTSESONG_AKTIV ? 'Parkert — venter på Tema 15-innhold.'
                : !reiselivAktiv ? 'Krever aktivt reiseliv-tema.' : undefined}
              onClick={() => dispatch({ type: 'START_TURISTSESONG' })}
            />
            <DevBtn
              label="⏩ Spol til sesongslutt"
              color="#7dd3fc" bg="rgba(56,189,248,0.1)"
              disabled={!TURISTSESONG_AKTIV || !sesongAktiv}
              reason={!TURISTSESONG_AKTIV ? 'Parkert — venter på Tema 15-innhold.'
                : !sesongAktiv ? 'Ingen aktiv turistsesong.' : undefined}
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
            {/* Åpne et salgssituasjon-rollespill DIREKTE fra hvor som helst
                (flyttet hit fra dashbordets Oversikt-fane). Isolert øving —
                rører ikke dagens planlagte møter. */}
            <select
              value={valgtScenario}
              onChange={e => setValgtScenario(e.target.value)}
              style={selectStyle}
            >
              {SCENARIOS.map(s => (
                <option key={s.id} value={s.id} style={{ background: '#0a0e1a', color: '#f1f5f9' }}>
                  {s.customerName}
                </option>
              ))}
            </select>
            <DevBtn
              label="🛎️ Åpne salgssituasjon"
              color="#d8b4fe" bg="rgba(168,85,247,0.16)"
              onClick={() => window.dispatchEvent(new CustomEvent('dev:openSalesScenario', { detail: { scenarioId: valgtScenario } }))}
            />
            <div style={hintStyle}>Tester salgssituasjon-motoren isolert (rører ikke dagens møter).</div>
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
            <DevBtn
              label="↺ Nullstill DEV-overstyringer"
              color="#fca5a5" bg="rgba(148,163,184,0.14)"
              onClick={nullstillDevOverstyringer}
            />
            <div style={hintStyle}>Fjerner lokale overstyringer (fag, nivå, «Espen spør») → tilbake til lærer/standard.</div>
            <DevBtn
              label="↺ Nullstill mentor-triggere"
              color="#93c5fd" bg="rgba(59,130,246,0.14)"
              onClick={() => window.dispatchEvent(new CustomEvent('mentor:reset'))}
            />
            <div style={hintStyle}>Glemmer ALT Espen har sagt (engangs, daglige og scene-triggere) + introen — kun lokalt. For å teste mentoropplevelsen som en fersk elev.</div>
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

const selectStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.04)', color: '#e2e8f0',
  border: '1px solid rgba(148,163,184,0.28)', borderRadius: 9,
  padding: '0.45rem 0.5rem', fontSize: 12.5, fontFamily: FONT, cursor: 'pointer',
}

function pill(border: string, bg: string, color: string): React.CSSProperties {
  return {
    background: bg, border: `1px solid ${border}`, borderRadius: 99,
    padding: '0.3rem 0.7rem', color, fontWeight: 800, fontSize: 11,
    cursor: 'pointer', fontFamily: FONT,
  }
}
