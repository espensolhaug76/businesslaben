import { useState, useEffect } from 'react'
import { GameProvider, useGame } from './GameContext'
import PhaserGame from './PhaserGame'
import HUD from './ui/HUD'
import SimulationModal from './ui/SimulationModal'
import DashboardOverlay from './ui/DashboardOverlay'
import RentPanel from './ui/panels/RentPanel'
import StartupScreen from './screens/StartupScreen'

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

/** Open/close the global overlay flag so CityScene can skip input */
function setOverlay(open: boolean) {
  window.__OVERLAY_OPEN__ = open
  if (!open) {
    // Dispatch a synthetic pointerup so Phaser never gets stuck in drag state
    document.querySelector('canvas')?.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true })
    )
  }
}

function GameContent() {
  const { state } = useGame()
  const [simOpen, setSimOpen]           = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [vacantInfo, setVacantInfo]     = useState<VacantInfo | null>(null)
  const [phaserReady, setPhaserReady]   = useState(false)
  const [inInterior, setInInterior]     = useState(false)

  // Notify CityScene when a location gets rented (update building appearance)
  useEffect(() => {
    if (state.rentedLocationId) {
      window.dispatchEvent(new CustomEvent('game:locationRented', {
        detail: { id: state.rentedLocationId, companyName: state.companyName },
      }))
    }
  }, [state.rentedLocationId])

  useEffect(() => {
    function onVacant(e: Event) {
      setVacantInfo((e as CustomEvent<VacantInfo>).detail)
      setOverlay(true)
    }
    function onDashboard() {
      setDashboardOpen(true)
      setOverlay(true)
    }
    function onExitInterior() {
      setInInterior(false)
    }
    function onSimulate() {
      setSimOpen(true)
      setOverlay(true)
    }
    window.addEventListener('phaser:vacantClicked', onVacant)
    window.addEventListener('phaser:open-dashboard', onDashboard)
    window.addEventListener('phaser:exitInterior', onExitInterior)
    window.addEventListener('phaser:simulate', onSimulate)
    return () => {
      window.removeEventListener('phaser:vacantClicked', onVacant)
      window.removeEventListener('phaser:open-dashboard', onDashboard)
      window.removeEventListener('phaser:exitInterior', onExitInterior)
      window.removeEventListener('phaser:simulate', onSimulate)
    }
  }, [])

  if (state.phase === 'startup') {
    return <StartupScreen />
  }

  function handleEnterShop() {
    setInInterior(true)
    window.dispatchEvent(new CustomEvent('game:enterInterior', {
      detail: { shopName: state.companyName },
    }))
  }

  function closeSim() {
    setSimOpen(false)
    setOverlay(false)
  }
  function closeDashboard() {
    setDashboardOpen(false)
    setOverlay(false)
  }
  function closeRentPanel() {
    setVacantInfo(null)
    setOverlay(false)
  }

  const allPs = state.p1_complete && state.p2_complete && state.p3_complete && state.p4_complete

  return (
    <>
      <PhaserGame onReady={() => setPhaserReady(true)} />

      {phaserReady && (
        <>
          <HUD />

          {/* First-time hint */}
          {state.tutorialStep === 1 && !state.rentedLocationId && !inInterior && (
            <TutorialBubble
              text='🏙️ Utforsk byen! Finn et "TIL LEIE"-skilt og klikk på det for å starte virksomheten.'
              onDismiss={() => {/* will auto-dismiss on rent */}}
            />
          )}

          {/* Enter shop button */}
          {state.rentedLocationId && !inInterior && !simOpen && !dashboardOpen && (
            <div style={{
              position: 'fixed', bottom: 90, right: 24, zIndex: 92,
              fontFamily: "'Outfit', sans-serif",
            }}>
              <button onClick={handleEnterShop} style={{
                background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                border: 'none', borderRadius: 99, padding: '0.75rem 1.5rem',
                color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: 'inherit', boxShadow: '0 0 20px rgba(14,165,141,0.4)',
              }}>
                🏪 Gå inn i butikken
              </button>
            </div>
          )}

          {/* Simulate button — only when all 4P done */}
          {allPs && state.rentedLocationId && !inInterior && !simOpen && !dashboardOpen && (
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
          <DashboardOverlay open={dashboardOpen} onClose={closeDashboard} />

          {vacantInfo && (
            <RentPanel
              info={vacantInfo}
              onClose={closeRentPanel}
              onEnterShop={handleEnterShop}
            />
          )}
        </>
      )}
    </>
  )
}

function TutorialBubble({ text, onDismiss }: { text: string; onDismiss: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0,212,170,0.4)', borderRadius: '1.5rem',
      padding: '1.5rem 2rem', zIndex: 85, textAlign: 'center',
      fontFamily: "'Outfit', sans-serif", maxWidth: 400,
      pointerEvents: 'none',
    }}>
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
