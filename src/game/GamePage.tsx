import { useState, useEffect } from 'react'
import { GameProvider, useGame } from './GameContext'
import PhaserGame from './PhaserGame'
import HUD from './ui/HUD'
import SidePanel, { type BuildingId } from './ui/SidePanel'
import SimulationModal from './ui/SimulationModal'
import SimulateButton from './ui/SimulateButton'
import YearEndOverlay from './ui/YearEndOverlay'
import StartupScreen from './screens/StartupScreen'

function GameContent() {
  const { state } = useGame()
  const [openBuilding, setOpenBuilding] = useState<BuildingId>(null)
  const [simOpen, setSimOpen] = useState(false)
  const [phaserReady, setPhaserReady] = useState(false)

  useEffect(() => {
    function handler(e: Event) {
      const id = (e as CustomEvent<string>).detail as BuildingId
      setOpenBuilding(id)
      setSimOpen(false)
    }
    window.addEventListener('phaser:buildingClicked', handler)
    return () => window.removeEventListener('phaser:buildingClicked', handler)
  }, [])

  if (state.phase === 'startup') {
    return <StartupScreen />
  }

  return (
    <>
      <PhaserGame onReady={() => setPhaserReady(true)} />

      {phaserReady && (
        <>
          <HUD />
          <SidePanel buildingId={openBuilding} onClose={() => setOpenBuilding(null)} />
          <SimulateButton onClick={() => { setOpenBuilding(null); setSimOpen(true) }} />
          <SimulationModal open={simOpen} onClose={() => setSimOpen(false)} />
          <YearEndOverlay />
        </>
      )}

      {/* Hint overlay — show briefly on first load */}
      {phaserReady && state.month === 1 && state.monthlyResults.length === 0 && (
        <div style={{
          position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(10,14,26,0.88)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99,
          padding: '0.5rem 1.25rem', zIndex: 94,
          fontSize: 13, color: '#64748b', whiteSpace: 'nowrap',
          fontFamily: "'Outfit', sans-serif",
          pointerEvents: 'none',
        }}>
          💡 Klikk på bygningene for å gjøre innstillinger · Dra for å panorere · Scroll for å zoome
        </div>
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
