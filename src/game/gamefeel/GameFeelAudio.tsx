import { useEffect, useRef } from 'react'
import { useGame } from '../GameContext'
import { kassePling, oppgjorFanfare, armerLyd } from './lyd'

// ── KROK 4 — GAME FEEL: lyd-observatør ───────────────────────────────────────
// Rendrer ingenting; lytter på spilltilstand og spiller lyd (reduceren forblir
// ren — lyd er en ren UI-bivirkning). Kasse-pling når bakgrunnssalget tikker opp
// i åpen dag (throttles i lyd.ts, maks 1/sek); kort fanfare når et NYTT
// dagsoppgjør har positivt resultat. Lyd er alltid av i headless (se lyd.ts).
export default function GameFeelAudio() {
  const { state } = useGame()
  const forrigeBakStk = useRef(0)
  const forrigeOppgjor = useRef<string | null>(null)

  // Én-gangs «arming» av AudioContext ved første brukergest (autoplay-policy).
  useEffect(() => {
    const h = () => { armerLyd(); window.removeEventListener('pointerdown', h) }
    window.addEventListener('pointerdown', h)
    return () => window.removeEventListener('pointerdown', h)
  }, [])

  // Kasse-pling: bakgrunnssalget økte i åpen dag.
  useEffect(() => {
    if (state.dayPhase === 'åpen' && state.dayStats.bakgrunnStk > forrigeBakStk.current) {
      kassePling()
    }
    forrigeBakStk.current = state.dayStats.bakgrunnStk
  }, [state.dayStats.bakgrunnStk, state.dayPhase])

  // Fanfare: nytt dagsoppgjør med positivt resultat.
  useEffect(() => {
    const r = state.lastDayResult
    if (state.dayPhase === 'oppgjør' && r) {
      const key = `${r.year}-${r.month}-${r.dayNumber}`
      if (forrigeOppgjor.current !== key) {
        if (r.resultat > 0) oppgjorFanfare()
        forrigeOppgjor.current = key
      }
    }
  }, [state.dayPhase, state.lastDayResult])

  return null
}
