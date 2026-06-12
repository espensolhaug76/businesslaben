import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GameProvider, useGame } from './GameContext'
import HUD from './ui/HUD'
import SimulationModal from './ui/SimulationModal'
import DashboardOverlay from './ui/DashboardOverlay'
import YearEndOverlay from './ui/YearEndOverlay'
import RentPanel from './ui/panels/RentPanel'
import StartupScreen from './screens/StartupScreen'
import CityMapView from './city/CityMapView'
import DistrictView, { type LokaleClick } from './city/DistrictView'
import StorefrontView from './city/StorefrontView'
import { districtOfLokale } from '../data/districts'

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
  const { state, dispatch } = useGame()
  const navigate = useNavigate()
  const { districtId, lokaleId } = useParams<{ districtId?: string; lokaleId?: string }>()
  const [simOpen, setSimOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [dashboardTab, setDashboardTab] = useState<string>('oversikt')
  const [vacantInfo, setVacantInfo] = useState<VacantInfo | null>(null)
  const [tutorialDismissed, setTutorialDismissed] = useState(false)

  // Dev shortcut: ?skip=1 seeds defaults and skips the StartupScreen wizard.
  useEffect(() => {
    if (!IS_DEV_SKIP) return
    if (state.phase !== 'startup') return
    dispatch({
      type: 'START_GAME',
      companyName: 'DevCo',
      industry: 'cafe',
      businessModel: 'detaljhandel',
      finansiering: 'bank',
      personlighet: 'analytisk',
    })
    // Demo-sortiment med full/lav/tom lagerstatus så vindusutstillingen
    // (lager-barometeret) kan itereres uten å klikke gjennom 4P-løypa.
    dispatch({
      type: 'SET_PRODUCTS',
      products: [
        { id: 'dev_kaffe', name: 'Kaffe', icon: '☕', tier: 'standard', costPrice: 12, retailPrice: 45, recommendedPrice: 45, stock: 40, quality: 70, sustainability: 60, maxDemandPerMonth: 40 },
        { id: 'dev_croissant', name: 'Croissant', icon: '🥐', tier: 'standard', costPrice: 9, retailPrice: 35, recommendedPrice: 35, stock: 6, quality: 70, sustainability: 55, maxDemandPerMonth: 30 },
        { id: 'dev_muffins', name: 'Muffins', icon: '🧁', tier: 'budget', costPrice: 7, retailPrice: 29, recommendedPrice: 29, stock: 0, quality: 60, sustainability: 50, maxDemandPerMonth: 25 },
      ],
    })
    console.log('[DEV] StartupScreen skipped, seeded defaults + demo-sortiment')
  }, [state.phase, dispatch])

  if (state.phase === 'startup') {
    if (IS_DEV_SKIP) return null
    return <StartupScreen />
  }

  function closeSim() { setSimOpen(false); setOverlay(false) }
  function closeDashboard() { setDashboardOpen(false); setOverlay(false) }
  function closeRentPanel() { setVacantInfo(null); setOverlay(false) }

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
        ? <StorefrontView
            districtId={districtId}
            lokaleId={lokaleId}
            onOpenPanel={tab => { setDashboardTab(tab); setDashboardOpen(true); setOverlay(true) }}
          />
        : districtId
          ? <DistrictView districtId={districtId} onVacantClick={onVacantClick} />
          : <CityMapView />}

      <HUD />

      {/* Førstegangshint på masterkartet */}
      {onMaster && state.tutorialStep === 1 && !state.rentedLocationId && !tutorialDismissed && (
        <TutorialBubble
          text="🏙️ Velg en bydel på kartet! I sentrum finner du ledige lokaler med «TIL LEIE»-skilt."
          onDismiss={() => setTutorialDismissed(true)}
        />
      )}

      {/* Snarveier nederst til høyre når man leier */}
      {state.rentedLocationId && !simOpen && !dashboardOpen && !vacantInfo && (
        <div style={{
          position: 'fixed', bottom: 30, right: 24, zIndex: 92,
          display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {!lokaleId && (
            <button onClick={() => gotoOwnStorefront()} style={pillStyle('linear-gradient(135deg, #0d9488, #0f766e)', 'rgba(14,165,141,0.4)')}>
              🏪 Gå til butikken
            </button>
          )}
          <button
            onClick={() => { setDashboardTab('oversikt'); setDashboardOpen(true); setOverlay(true) }}
            style={pillStyle('linear-gradient(135deg, #334155, #1e293b)', 'rgba(148,163,184,0.3)')}
          >
            🖥️ Dashbord
          </button>
        </div>
      )}

      {/* Simuler måneden — når alle 4P er fullført */}
      {allPs && state.rentedLocationId && !simOpen && !dashboardOpen && (
        <div style={{
          position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          zIndex: 92, fontFamily: "'Outfit', sans-serif",
        }}>
          <button
            onClick={() => { setSimOpen(true); setOverlay(true) }}
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              border: 'none', borderRadius: 99, padding: '0.9rem 2.5rem',
              color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer',
              fontFamily: 'inherit', boxShadow: '0 0 24px rgba(34,197,94,0.4)',
            }}
          >
            ▶ Simuler måneden
          </button>
        </div>
      )}

      <SimulationModal open={simOpen} onClose={closeSim} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <DashboardOverlay open={dashboardOpen} onClose={closeDashboard} initialTab={dashboardTab as any} />
      <YearEndOverlay />

      {vacantInfo && (
        <RentPanel
          info={vacantInfo}
          onClose={closeRentPanel}
          onEnterShop={() => gotoOwnStorefront(vacantInfo.id)}
        />
      )}
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
