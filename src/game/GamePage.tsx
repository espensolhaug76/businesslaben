import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { GameProvider, useGame, useErTemaAktivt } from './GameContext'
import HUD from './ui/HUD'
import SimulationModal from './ui/SimulationModal'
import DashboardOverlay from './ui/DashboardOverlay'
import SalesScenarioOverlay from './ui/SalesScenarioOverlay'
import YearEndOverlay from './ui/YearEndOverlay'
import DayResultOverlay from './ui/DayResultOverlay'
import MonthResultOverlay from './ui/MonthResultOverlay'
import KampanjeRapportOverlay from './ui/KampanjeRapportOverlay'
import DagspulsOverlay from './ui/DagspulsOverlay'
import OpeningOrderOverlay from './ui/OpeningOrderOverlay'
import Mentor from './ui/Mentor'
import { BALANCE } from './data/balance'

// SPILLKLOKKE: åpningstidens lengde i spillminutter (09:00–17:00).
const DAG_VARIGHET = BALANCE.klokke.stengMinutt - BALANCE.klokke.apneMinutt
import RentPanel from './ui/panels/RentPanel'
import StartupScreen from './screens/StartupScreen'
import CityMapView from './city/CityMapView'
import DistrictView, { type LokaleClick } from './city/DistrictView'
import StorefrontView from './city/StorefrontView'
import InteriorView from './city/InteriorView'
import TuristkontorScene from './city/TuristkontorScene'
import GameFeelAudio from './gamefeel/GameFeelAudio'
import MonterScene from './city/MonterScene'
import LobbyView from './city/LobbyView'
import { districtOfLokale } from '../data/districts'
import { IS_DEV_COORDS } from './city/DevCoordHelper'

// ── BYBILDE-ARKITEKTUR ────────────────────────────────────────────────────────
// /game er nå bildebasert: master-kart → bydel → lokale (URL-styrt).
// Phaser-byen (PhaserGame/CityScene/MiniMap/CameraControls) er PARKERT —
// koden ligger urørt i src/game/phaser/ men ruten bruker den ikke lenger.
// All spillogikk (GameContext, økonomi, RENT_LOCATION, dashboards) er uendret.

const IS_DEV_SKIP =
  import.meta.env.DEV &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('skip') === '1'

interface VacantInfo {
  id: string
  label: string
  zone: string
  rent: number
  footTraffic: string
  sqm: number
  capacity: number
  worldX: number
  worldY: number
}

/** Bevart fra Phaser-flyten (KRAV): flagget + syntetisk pointerup gjør at en
 *  eventuelt gjenopplivet CityScene aldri blir stående i drag-state. Ufarlig
 *  uten canvas. */
function setOverlay(open: boolean) {
  window.__OVERLAY_OPEN__ = open
  if (!open) {
    document.querySelector('canvas')?.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true })
    )
  }
}

function GameContent() {
  const { state, dispatch, klasseNivaa, klasseNivaaDev, setKlasseNivaaDev } = useGame()
  const navigate = useNavigate()
  const { districtId, lokaleId } = useParams<{ districtId?: string; lokaleId?: string }>()
  // Lokale-undernivåer via rute-suffiks: /inne = bak disken (kunde + salg),
  // /disk = frontal monter-scene (vareeksponering i trau).
  const pathname = useLocation().pathname
  const isInterior = pathname.endsWith('/inne')
  const isCounter = pathname.endsWith('/disk')
  const isTuristkontor = pathname.endsWith('/turistkontor')   // TEMA 15 rom-scene
  // DEV-DYPLENKE: `?dev=1` rett til en bydel/scene (f.eks.
  // /game/d/stasjonsomradet?dev=1 for sone-tracing) skal vise scenen, ALDRI
  // bransjevelgeren. Uten et aktivt spill står phase='startup' (spilltilstand
  // overlever ikke reload) → StartupScreen. Vi seeder derfor et engangsspill
  // (samme som ?skip=1) når dev-flagget er satt OG ruten peker på en bydel.
  const devDeepLink = import.meta.env.DEV && IS_DEV_COORDS && !!districtId
  // Spor C: Byhotellets lobby (B2B-møtescene) — bydel-nivå rute-suffiks.
  const isLobby = pathname.endsWith('/hotell-lobby')
  const [simOpen, setSimOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [dashboardTab, setDashboardTab] = useState<string>('oversikt')
  const [vacantInfo, setVacantInfo] = useState<VacantInfo | null>(null)
  const [tutorialDismissed, setTutorialDismissed] = useState(false)
  // Salgssituasjon-overlay (DEL 4: midlertidig dev-inngang via CustomEvent fra
  // dashbordet). Den ekte inngangen — klikk på kunde i interiørscenen —
  // kommer i neste fase.
  const [salesOpen, setSalesOpen] = useState(false)
  const [salesScenarioId, setSalesScenarioId] = useState('morgenkunden')

  // Dev shortcut: ?skip=1 (eller dev-dyplenke til en bydel) seeds defaults and
  // skips the StartupScreen wizard.
  useEffect(() => {
    if (!IS_DEV_SKIP && !devDeepLink) return
    if (state.phase !== 'startup') return
    dispatch({
      type: 'START_GAME',
      companyName: 'DevCo',
      industry: 'cafe',
      businessModel: 'detaljhandel',
      finansiering: 'bank',
      personlighet: 'analytisk',
    })
    // INNKJØP/LEVERING (docs/INNKJOP_LEVERING.md): dev-seedet legger IKKE inn
    // noe demo-sortiment. Startlageret velger eleven selv i ÅPNINGSBESTILLINGEN
    // (OpeningOrderOverlay), som dukker opp straks etter manuell leie — samme
    // vei for dev (?skip → klikk «TIL LEIE») og vanlig spill. Kaffe settes som
    // hovedprodukt for plakat-stedfortrederen på disken (id-en lagres; varen
    // finnes så snart eleven har lagt den i åpningsbestillingen).
    dispatch({ type: 'SET_MAIN_PRODUCT', id: 'coffee' })
    console.log('[DEV] StartupScreen skipped, seeded defaults (åpningsbestilling ved leie)')
  }, [state.phase, dispatch, devDeepLink])

  // DEL 4: lytt etter dev-trigger fra dashbordet («Øv salg»). Åpner
  // salgssituasjon-overlayet oppå et evt. åpent dashbord.
  // TEMA 15 bølge 3 v3: `game:openScenario` er den EKTE (ikke-dev) inngangen —
  // turistkontoret/byhotellet starter reiselivs-scenariene med samme overlay.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail?.scenarioId ?? 'morgenkunden'
      setSalesScenarioId(id)
      setSalesOpen(true)
      setOverlay(true)
    }
    window.addEventListener('dev:openSalesScenario', handler)
    window.addEventListener('game:openScenario', handler)
    return () => {
      window.removeEventListener('dev:openSalesScenario', handler)
      window.removeEventListener('game:openScenario', handler)
    }
  }, [])

  // TEMA 1 — dev/test-hook: utløs brannalarmen manuelt (reduceren gater åpen dag
  // + bekreftet plan + maks én gang i måneden). Samme effekt som HMS-fanens
  // «Utløs brannalarm (dev)»-knapp, men uten dashbord — praktisk for testing.
  useEffect(() => {
    const h = () => dispatch({ type: 'TRIGGER_BRANNALARM' })
    window.addEventListener('dev:brannalarm', h)
    return () => window.removeEventListener('dev:brannalarm', h)
  }, [dispatch])

  // SPILLKLOKKE (DEL 1): én timer driver den åpne dagen. Leser LIVE-verdier via
  // en ref (intervallet lages én gang). Pauser under salgsscenario, åpent
  // dashbord og aktivt kundemøte. Ved 17:00 (dayMinute >= DAG_VARIGHET) stenges
  // dagen automatisk (CLOSE_DAY, svinn + dagsoppgjør som før).
  const tickCtx = useRef({ dayPhase: state.dayPhase, dayMinute: state.dayMinute, activeMeeting: state.activeMeetingScenarioId, salesOpen, dashboardOpen })
  tickCtx.current = { dayPhase: state.dayPhase, dayMinute: state.dayMinute, activeMeeting: state.activeMeetingScenarioId, salesOpen, dashboardOpen }
  useEffect(() => {
    const iv = window.setInterval(() => {
      const c = tickCtx.current
      if (c.dayPhase !== 'åpen') return
      if (c.salesOpen || c.dashboardOpen || c.activeMeeting) return // klokka pauser
      if (c.dayMinute >= DAG_VARIGHET) { dispatch({ type: 'CLOSE_DAY' }); return }
      dispatch({ type: 'TICK' })
    }, BALANCE.klokke.tickMs)
    return () => window.clearInterval(iv)
  }, [dispatch])

  // TEMA 1 — BRANNALARM: kan gå i løpet av en åpen dag når temaet er aktivt og
  // planen er bekreftet, maks én gang per måned. Deterministisk sjanse per dag
  // (dayNumber-seed) så den ikke spammer. Reduceren gater resten (åpen/plan/mnd).
  const beredskapAktiv = useErTemaAktivt('beredskap')
  useEffect(() => {
    if (!beredskapAktiv || state.dayPhase !== 'åpen' || !state.beredskap.planBekreftet) return
    if (state.beredskap.brannalarmMnd === state.currentMonth) return
    const seed = (state.dayNumber * 2654435761) >>> 0
    if (seed % 100 < 35) dispatch({ type: 'TRIGGER_BRANNALARM' })
  }, [beredskapAktiv, state.dayPhase, state.dayNumber, state.currentMonth, state.beredskap.planBekreftet, state.beredskap.brannalarmMnd, dispatch])

  if (state.phase === 'startup') {
    // Dev-dyplenke / ?skip: vis ingenting mens engangsspillet seedes (effekten
    // over dispatcher START_GAME → re-render med scenen), aldri bransjevelgeren.
    if (IS_DEV_SKIP || devDeepLink) return null
    return <StartupScreen />
  }

  function closeSim() { setSimOpen(false); setOverlay(false) }
  function closeDashboard() { setDashboardOpen(false); setOverlay(false) }
  function closeRentPanel() { setVacantInfo(null); setOverlay(false) }
  // Lukk salgsoverlayet. X-en MINIMERER bare visningen — et ekte møte BESTÅR
  // (activeMeetingScenarioId er fortsatt satt, klokka står pauset), og eleven
  // klikker kunde-spriten for å gjenåpne dialogen. Møtet avsluttes kun ved å
  // FULLFØRE det (RESOLVE nuller flagget). Fullføring kaller også denne (etter
  // at flagget er nullet), så ingen SKIP_MEETING her.
  function closeSales() {
    setSalesOpen(false)
    setOverlay(dashboardOpen)
  }

  function onVacantClick({ district, lokale, rent }: LokaleClick) {
    setVacantInfo({
      id: lokale.id,
      label: lokale.navn,
      zone: district.zone,
      rent,
      footTraffic: district.trafikk,
      sqm: lokale.sqm,
      capacity: lokale.kapasitet,
      worldX: 0, worldY: 0,
    })
    setOverlay(true)
  }

  /** Etter leie (eller «gå til butikken»): naviger til lokalets storefront. */
  function gotoOwnStorefront(rentedId?: string) {
    const id = rentedId ?? state.rentedLocationId
    if (!id) return
    const d = districtOfLokale(id)
    if (d) navigate(`/game/d/${d.id}/l/${id}`)
  }

  const allPs = state.p1_complete && state.p2_complete && state.p3_complete && state.p4_complete
  const onMaster = !districtId

  return (
    <>
      {/* Aktivt visningsnivå (URL-styrt) */}
      {lokaleId && districtId
        ? (isInterior
            ? <InteriorView districtId={districtId} lokaleId={lokaleId} />
            : isCounter
              ? <MonterScene districtId={districtId} lokaleId={lokaleId} />
              : <StorefrontView
                  districtId={districtId}
                  lokaleId={lokaleId}
                  onOpenPanel={tab => { setDashboardTab(tab); setDashboardOpen(true); setOverlay(true) }}
                />)
        : districtId
          ? (isLobby
              ? <LobbyView districtId={districtId} />
              : isTuristkontor
                ? <TuristkontorScene districtId={districtId} />
                : <DistrictView districtId={districtId} onVacantClick={onVacantClick} />)
          : <CityMapView />}

      <HUD
        onMaster={onMaster}
        onOpenDashboard={() => { setDashboardTab('oversikt'); setDashboardOpen(true); setOverlay(true) }}
      />

      {/* KROK 4 — Game feel: lyd-observatør (rendrer ingenting) */}
      <GameFeelAudio />

      {/* Førstegangshint på masterkartet */}
      {onMaster && state.tutorialStep === 1 && !state.rentedLocationId && !tutorialDismissed && (
        <TutorialBubble
          text="🏙️ Velg en bydel på kartet! I sentrum finner du ledige lokaler med «TIL LEIE»-skilt."
          onDismiss={() => setTutorialDismissed(true)}
        />
      )}

      {/* «Gå til butikken»-snarvei nederst til høyre når man leier og står ute i
          byen. Dashbord åpnes KUN fra topp-knappen (💻 Dashbord i HUD) — den
          gamle Dashbord-knappen her (bak mentoren) er fjernet, så mentoren står
          fritt i hjørnet. */}
      {state.rentedLocationId && !lokaleId && !simOpen && !dashboardOpen && !vacantInfo && (
        <div style={{
          position: 'fixed', bottom: 30, right: 24, zIndex: 92,
          display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end',
          fontFamily: "'Outfit', sans-serif",
        }}>
          <button onClick={() => gotoOwnStorefront()} style={pillStyle('linear-gradient(135deg, #0d9488, #0f766e)', 'rgba(14,165,141,0.4)')}>
            🏪 Gå til butikken
          </button>
        </div>
      )}

      {/* «Simuler måneden» (gammel PEST-månedssimulering) — DAGSSYKLUSEN eier nå
          månedsrullen (START_NEW_DAY + månedsoppgjør), så denne er skjult bak
          ?dev=1. SimulationModal/APPLY_MONTH_RESULT er urørt og gjenbrukes
          senere som hendelser. */}
      {IS_DEV_COORDS && allPs && state.rentedLocationId && !simOpen && !dashboardOpen && (
        <div style={{
          position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          zIndex: 92, fontFamily: "'Outfit', sans-serif",
          display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
        }}>
          {/* TEMA 15 dev: start/spol turistsesong for testing/demonstrasjon. */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => dispatch({ type: 'START_TURISTSESONG' })}
              style={{ background: 'rgba(56,189,248,0.18)', border: '1px solid rgba(56,189,248,0.5)', borderRadius: 99, padding: '0.5rem 1.1rem', color: '#7dd3fc', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              ⏩ Start turistsesong nå
            </button>
            <button onClick={() => dispatch({ type: 'DEV_SPOL_TURISTSESONG_SLUTT' })}
              style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.35)', borderRadius: 99, padding: '0.5rem 1.1rem', color: '#7dd3fc', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              ⏩ Spol til sesongslutt
            </button>
          </div>
          {/* KROK 7 dev: send test-e-poster + tving frister/leveranser til forfall. */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => dispatch({ type: 'DEV_SEND_TEST_EPOSTER' })}
              style={{ background: 'rgba(168,85,247,0.18)', border: '1px solid rgba(168,85,247,0.5)', borderRadius: 99, padding: '0.5rem 1.1rem', color: '#d8b4fe', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              ⏩ Send test-e-post av hver type
            </button>
            <button onClick={() => dispatch({ type: 'DEV_SPOL_TIL_FRIST' })}
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.35)', borderRadius: 99, padding: '0.5rem 1.1rem', color: '#d8b4fe', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              ⏩ Spol til frist
            </button>
          </div>
          {/* DEL 0 dev: overstyr globalt klassenivå lokalt (VINNER over RTDB). */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>
              Nivå: {klasseNivaa.toUpperCase()}{klasseNivaaDev ? ' (DEV)' : ''}
            </span>
            {(['vg1', 'vg2'] as const).map(n => (
              <button key={n} onClick={() => setKlasseNivaaDev(klasseNivaaDev === n ? null : n)}
                style={{ background: klasseNivaaDev === n ? 'rgba(250,204,21,0.25)' : 'rgba(250,204,21,0.08)', border: `1px solid ${klasseNivaaDev === n ? '#facc15' : 'rgba(250,204,21,0.35)'}`, borderRadius: 99, padding: '0.4rem 0.9rem', color: '#fde68a', fontWeight: 800, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                {n.toUpperCase()} <span style={{ opacity: 0.7 }}>DEV</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => { setSimOpen(true); setOverlay(true) }}
            title="Dev: gammel PEST-månedssimulering (dagssyklusen eier månedsrullen)"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              border: 'none', borderRadius: 99, padding: '0.9rem 2.5rem',
              color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer',
              fontFamily: 'inherit', boxShadow: '0 0 24px rgba(34,197,94,0.4)',
            }}
          >
            ▶ Simuler måneden <span style={{ fontSize: 12, opacity: 0.85 }}>(dev)</span>
          </button>
        </div>
      )}

      <SimulationModal open={simOpen} onClose={closeSim} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <DashboardOverlay open={dashboardOpen} onClose={closeDashboard} initialTab={dashboardTab as any} />
      <SalesScenarioOverlay open={salesOpen} onClose={closeSales} scenarioId={salesScenarioId} />
      <YearEndOverlay />
      {/* Dagsoppgjør: «Bestill til i morgen» åpner dashbordet på Produkter uten
          å avansere dagen; oppgjøret skjules mens dashbordet ligger over (det
          har høyere z-index) og kommer tilbake når det lukkes. */}
      <DayResultOverlay
        dashboardOpen={dashboardOpen}
        onOpenProducts={() => { setDashboardTab('produkter'); setDashboardOpen(true); setOverlay(true) }}
      />
      {/* Dagspuls (SPILLKLOKKE DEL 3) — fullskjerms livepanel over butikkscenen
          mens dagen ruller. Gates internt (dayPhase 'åpen' && ingen aktiv
          samtale/dashbord). Kundemøter avbryter panelet (glir bort → scenen). */}
      <DagspulsOverlay dashboardOpen={dashboardOpen} onSteng={() => dispatch({ type: 'CLOSE_DAY' })} />

      {/* Månedsoppgjør — vises ved månedsrull (gates internt på
          lastMonthSettlement). Egen flyt fra den gamle «Simuler måneden»/PEST. */}
      <MonthResultOverlay />
      {/* TEMA 8 — effektrapport ved kampanjeslutt (gates internt på visRapportFor). */}
      <KampanjeRapportOverlay />
      {/* Åpningsbestilling — vises straks etter leie (gates internt på
          rentedLocationId && !openingOrderPlaced). */}
      <OpeningOrderOverlay />

      {vacantInfo && (
        <RentPanel
          info={vacantInfo}
          onClose={closeRentPanel}
          onEnterShop={() => gotoOwnStorefront(vacantInfo.id)}
        />
      )}

      {/* LÆRINGSLAGET — mentoren (Espen). Synlig ALLTID (også over dashbordet).
          DASHBORD blokkerer IKKE (fane-triggere vises inne i dashbordet); bare
          scenario/dagsoppgjør/leiepanel køer meldinger (da peker figuren).
          Ordboken bor hos mentoren (bok-panel), ikke i en dashbord-fane. */}
      <Mentor
        blocked={simOpen || salesOpen || !!vacantInfo
          || state.dayPhase === 'oppgjør' || !!state.lastMonthSettlement || !!state.kampanje.visRapportFor || state.phase === 'year_end'}
      />
    </>
  )
}

function pillStyle(background: string, glow: string): React.CSSProperties {
  return {
    background, border: 'none', borderRadius: 99, padding: '0.75rem 1.5rem',
    color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
    fontFamily: 'inherit', boxShadow: `0 0 20px ${glow}`,
  }
}

function TutorialBubble({ text, onDismiss }: { text: string; onDismiss: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0,212,170,0.4)', borderRadius: '1.5rem',
      padding: '1.5rem 2.5rem 1.5rem 2rem', zIndex: 85, textAlign: 'center',
      fontFamily: "'Outfit', sans-serif", maxWidth: 400,
      pointerEvents: 'auto',
    }}>
      <button
        onClick={onDismiss}
        style={{
          position: 'absolute', top: 8, right: 10,
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 99, width: 26, height: 26, color: '#94a3b8',
          cursor: 'pointer', fontSize: 13, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>
      <p style={{ color: '#f1f5f9', fontSize: 15, margin: 0, lineHeight: 1.6 }}>{text}</p>
    </div>
  )
}

export default function GamePage() {
  return (
    <GameProvider>
      <div style={{
        width: '100vw', height: '100vh',
        overflow: 'hidden', background: '#0a0e1a',
        fontFamily: "'Outfit', sans-serif",
      }}>
        <GameContent />
      </div>
    </GameProvider>
  )
}
