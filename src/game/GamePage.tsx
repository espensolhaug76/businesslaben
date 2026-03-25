import { useState, useEffect } from 'react'
import { GameProvider, useGame } from './GameContext'
import PhaserGame from './PhaserGame'
import HUD from './ui/HUD'
import SidePanel, { type BuildingId } from './ui/SidePanel'
import SimulationModal from './ui/SimulationModal'
import SimulateButton from './ui/SimulateButton'
import YearEndOverlay from './ui/YearEndOverlay'
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
  worldX: number
  worldY: number
}

// Step 2: Full Phaser input reset — dispatches events AND directly clears pointer state
function forcePhaserReset() {
  const game = (window as any).__PHASER_GAME__ as Phaser.Game | undefined
  if (!game) return
  game.scene.scenes.forEach((scene: any) => {
    scene.input?.resetPointers?.()
  })
}

function GameContent() {
  const { state } = useGame()
  const [openBuilding, setOpenBuilding] = useState<BuildingId>(null)
  const [simOpen, setSimOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [vacantInfo, setVacantInfo] = useState<VacantInfo | null>(null)
  const [phaserReady, setPhaserReady] = useState(false)
  const [inInterior, setInInterior] = useState(false)
  // Step 3: show welcome hint only once, dismissed via localStorage
  const [showWelcome, setShowWelcome] = useState(
    () => !localStorage.getItem('hasSeenWelcome')
  )

  useEffect(() => {
    function onVacant(e: Event) {
      setVacantInfo((e as CustomEvent<VacantInfo>).detail)
    }
    function onRoom(e: Event) {
      const room = (e as CustomEvent<string>).detail
      if (room === 'dashboard') {
        setDashboardOpen(true)
      } else {
        const mapping: Record<string, BuildingId> = {
          shop: 'shop',
          office: 'office',
          warehouse: 'warehouse',
        }
        setOpenBuilding(mapping[room] ?? null)
      }
    }
    function onExitInterior() {
      setInInterior(false)
    }
    window.addEventListener('phaser:vacantClicked', onVacant)
    window.addEventListener('phaser:roomClicked', onRoom)
    window.addEventListener('phaser:exitInterior', onExitInterior)
    return () => {
      window.removeEventListener('phaser:vacantClicked', onVacant)
      window.removeEventListener('phaser:roomClicked', onRoom)
      window.removeEventListener('phaser:exitInterior', onExitInterior)
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

  function dismissWelcome() {
    localStorage.setItem('hasSeenWelcome', '1')
    setShowWelcome(false)
    forcePhaserReset()
  }

  return (
    <>
      <PhaserGame onReady={() => setPhaserReady(true)} />

      {phaserReady && (
        <>
          <HUD />

          {/* Step 3: First-time hint — only shown once, unmounts completely */}
          {showWelcome && !state.rentedLocation && state.month === 1 && !inInterior && (
            <div style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(10,14,26,0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56,189,248,0.4)',
              borderRadius: '1.5rem', padding: '1.5rem 2rem',
              zIndex: 85, textAlign: 'center',
              fontFamily: "'Outfit', sans-serif",
              maxWidth: 400,
            }}>
              <button
                onClick={dismissWelcome}
                style={{
                  position: 'absolute', top: 10, right: 12,
                  background: 'none', border: 'none',
                  color: '#64748b', cursor: 'pointer', fontSize: 16,
                  fontFamily: 'inherit',
                }}
              >✕</button>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>🏙️</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#f1f5f9', marginBottom: '0.5rem' }}>
                Utforsk byen
              </div>
              <div style={{ fontSize: 14, color: '#64748b' }}>
                Finn et lokale med «TIL LEIE»-skilt og klikk på det for å starte virksomheten.
              </div>
            </div>
          )}

          {/* Enter shop button when location is rented */}
          {state.rentedLocation && !inInterior && (
            <div style={{
              position: 'fixed', bottom: 90, right: 24,
              zIndex: 92, fontFamily: "'Outfit', sans-serif",
            }}>
              <button
                onClick={handleEnterShop}
                style={{
                  background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                  border: 'none', borderRadius: 99,
                  padding: '0.75rem 1.5rem', color: '#fff',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 0 20px rgba(14,165,141,0.4)',
                }}
              >
                🏪 Gå inn i butikken
              </button>
            </div>
          )}

          <SidePanel buildingId={openBuilding} onClose={() => { setOpenBuilding(null); forcePhaserReset() }} />
          <SimulateButton onClick={() => { setOpenBuilding(null); setSimOpen(true) }} />
          <SimulationModal open={simOpen} onClose={() => { setSimOpen(false); forcePhaserReset() }} />
          <DashboardOverlay open={dashboardOpen} onClose={() => { setDashboardOpen(false); forcePhaserReset() }} />
          <YearEndOverlay />

          {vacantInfo && (
            <RentPanel
              info={vacantInfo}
              onClose={() => { setVacantInfo(null); forcePhaserReset() }}
              onEnterShop={handleEnterShop}
            />
          )}
        </>
      )}
    </>
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
