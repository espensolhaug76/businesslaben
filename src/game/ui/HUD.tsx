import { useState } from 'react'
import { useGame } from '../GameContext'
import { INDUSTRY_META } from '../data/industries'
import { DAY_CONFIG } from '../data/dayConfig'
import { getLyd, setLyd } from '../gamefeel/lyd'
import { useAnimatedNumber } from '../gamefeel/useAnimatedNumber'
import { BALANCE } from '../data/balance'

const MONTH_NAMES = ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember']

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function HUD({ onMaster, onOpenDashboard, onOpenAvis, onOpenVarsler, planleggingPause }: { onMaster: boolean; onOpenDashboard: () => void; onOpenAvis: () => void; onOpenVarsler: () => void; planleggingPause?: boolean }) {
  const { state } = useGame()
  const { money, reputation, currentMonth, currentYear, companyName, industry,
          level, xp, xpToNextLevel, rentedLocationId, shopOpen, dayNumber, meetingsToday, avisUlest, varsler } = state
  // VARSLINGSSENTER (DEL 3): 🔔-badge = uleste varsler.
  const varslerUlest = varsler.filter(v => !v.lest).length

  const meta = INDUSTRY_META[industry]
  const xpPct = Math.round((xp / xpToNextLevel) * 100)
  // KROK 4: kassa teller mykt opp/ned ved endring.
  const visMoney = useAnimatedNumber(money, BALANCE.gamefeel.tallAnimMs)

  return (
    <>
    {/* DEL A (28.07) — PLANLEGGINGSPAUSE: diskret indikator ved klokka når en
        tenke-flate (dashbord/avis) pauser spillklokka i en åpen dag. Egen høy
        z-flate (over dashbord z-180 / avis z-400) så den er synlig MENS eleven
        planlegger — ellers ligger den bak overlayet. Regel: tid presser i DRIFT. */}
    {planleggingPause && shopOpen && (
      <div data-testid="planlegging-pause" style={{
        position: 'fixed', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 500,
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        background: 'rgba(15,20,32,0.92)', border: '1px solid rgba(148,163,184,0.45)',
        borderRadius: 99, padding: '5px 14px', whiteSpace: 'nowrap',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        fontFamily: "'Outfit', sans-serif", pointerEvents: 'none',
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1' }}>⏸ Planlegging — tiden står</span>
      </div>
    )}
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 60,
      background: 'rgba(10,14,26,0.88)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1.2rem',
      fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
    }}>
      {/* Company name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
        <span style={{ fontSize: 22 }}>{meta?.emoji ?? '🏪'}</span>
        <span style={{ fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>
          {companyName || 'AdVenture 3.0'}
        </span>
      </div>

      {/* Level badge */}
      <div title={`${xp} / ${xpToNextLevel} XP`} style={{
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.4)',
        borderRadius: 99, padding: '2px 10px', cursor: 'default',
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#ffd700' }}>Lv{level}</span>
        <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${xpPct}%`, height: '100%', background: '#ffd700', borderRadius: 2, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* KPIs */}
      <KpiChip icon="💰" value={formatKr(Math.round(visMoney))} color="#22c55e" />
      <KpiChip icon="⭐" value={`Rykte: ${reputation}`} color={reputation >= 60 ? '#22c55e' : reputation >= 30 ? '#facc15' : '#ef4444'} />
      <KpiChip icon="📅" value={`${MONTH_NAMES[(currentMonth - 1) % 12]} · År ${currentYear}`} color="#38bdf8" />

      {/* Butikk-status — kun synlig når det finnes en butikk å ha åpen/stengt.
          DAGSSYKLUS (DEL 5): ikonet (🔓/🔒) bærer åpen/stengt-statusen,
          teksten viser dag-status («Dag 3 · 2/4 kunder») i stedet for det
          tidligere «Åpent»/«Stengt»-ordet — ikke dobbelt opp. */}
      {rentedLocationId && (
        <KpiChip
          icon={shopOpen ? '🔓' : '🔒'}
          value={`Dag ${dayNumber} · ${meetingsToday}/${DAY_CONFIG.meetingsPerDay} kunder`}
          color={shopOpen ? '#22c55e' : '#94a3b8'}
        />
      )}


      {/* «Vis veier»-røntgen — KUN på bykart-nivået (styrer by-røntgen; meningsløs
          i bydels-/butikk-visninger). */}
      {onMaster && <XrayToggle />}

      {/* Høyre: varsler + Dashbord-knapp (4P-fremdriften ligger nå i mentoren og
          Oversikt-fanen, ikke i HUD-en). */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        <LydToggle />

        {/* KROK 7c — SENTRUMSPOSTEN: alltid synlig når spillet er i gang.
            Ulest-badge (tall) når det finnes upubliserte/uleste notiser;
            nullstilles når avisoverlayet lukkes (CLEAR_AVIS_ULEST). */}
        {rentedLocationId && (
          <button
            onClick={onOpenAvis}
            title={avisUlest > 0 ? `Sentrumsposten — ${avisUlest} uleste notiser` : 'Sentrumsposten — les avisen'}
            aria-label={avisUlest > 0 ? `Åpne Sentrumsposten, ${avisUlest} uleste notiser` : 'Åpne Sentrumsposten'}
            style={{
              position: 'relative', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 99, width: 30, height: 30, cursor: 'pointer', color: '#f1f5f9', fontSize: 16, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
            }}
          >
            📰
            {avisUlest > 0 && (
              <span style={{
                position: 'absolute', top: -5, right: -5,
                background: '#ef4444', color: '#fff', borderRadius: 99,
                fontSize: 10, fontWeight: 800, padding: '1px 5px', lineHeight: 1.4,
              }}>{avisUlest}</span>
            )}
          </button>
        )}

        {rentedLocationId && (
          <button
            onClick={onOpenVarsler}
            data-testid="varsler-knapp"
            title={varslerUlest > 0 ? `Varsler — ${varslerUlest} uleste` : 'Varsler'}
            aria-label={varslerUlest > 0 ? `Åpne varsler, ${varslerUlest} uleste` : 'Åpne varsler'}
            style={{
              position: 'relative', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 99, width: 30, height: 30, cursor: 'pointer', color: '#f1f5f9', fontSize: 16, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
            }}
          >
            🔔
            {varslerUlest > 0 && (
              <span style={{
                position: 'absolute', top: -5, right: -5,
                background: '#ef4444', color: '#fff', borderRadius: 99,
                fontSize: 10, fontWeight: 800, padding: '1px 5px', lineHeight: 1.4,
              }}>{varslerUlest}</span>
            )}
          </button>
        )}

        <button
          onClick={onOpenDashboard}
          title="Åpne Bedriftsdashboardet"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'linear-gradient(135deg, #334155, #1e293b)', border: '1px solid rgba(148,163,184,0.35)',
            borderRadius: 99, padding: '5px 14px', cursor: 'pointer', color: '#f1f5f9',
            fontSize: 13, fontWeight: 700, fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}
        >
          💻 Dashbord
        </button>
      </div>
    </div>
    </>
  )
}

/** KROK 4 — global lyd av/på (innstillinger). localStorage; default PÅ. */
function LydToggle() {
  const [on, setOn] = useState(() => getLyd())
  return (
    <button
      onClick={() => { const next = !on; setOn(next); setLyd(next) }}
      title={on ? 'Lyd på — klikk for å slå av' : 'Lyd av — klikk for å slå på'}
      aria-label={on ? 'Slå av lyd' : 'Slå på lyd'}
      style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 99, width: 30, height: 30, cursor: 'pointer',
        color: on ? '#f1f5f9' : '#64748b', fontSize: 15, lineHeight: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
      }}
    >{on ? '🔊' : '🔇'}</button>
  )
}

function XrayToggle() {
  const [on, setOn] = useState(false)
  return (
    <button
      onClick={() => { const next = !on; setOn(next); window.__CITY_XRAY__ = next }}
      style={{
        background: on ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.08)',
        border: `1px solid ${on ? '#38bdf8' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: 99, padding: '4px 12px', cursor: 'pointer',
        color: on ? '#38bdf8' : '#94a3b8', fontSize: 12, fontWeight: 700,
        fontFamily: 'inherit', whiteSpace: 'nowrap',
      }}
    >
      {on ? '🏙 Vis bygg' : '👁 Vis veier'}
    </button>
  )
}

function KpiChip({ icon, value, color }: { icon: string; value: string; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.35rem',
      background: `${color}14`, border: `1px solid ${color}44`,
      borderRadius: 99, padding: '4px 12px', whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
    </div>
  )
}
