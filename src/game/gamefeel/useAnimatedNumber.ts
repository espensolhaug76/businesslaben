import { useEffect, useRef, useState } from 'react'

// ── KROK 4 — GAME FEEL: animerte tall ────────────────────────────────────────
// Teller mykt (easeOutCubic) fra forrige verdi til ny over `durationMs`. Brukes
// i HUD-kassa + dagsoppgjørets sluttsum. Snapper ØYEBLIKKELIG i headless/
// spilltest (navigator.webdriver) og ved `prefers-reduced-motion`, så tester og
// bevegelsesfølsomme brukere ser tallet uten animasjon.

/** Skal animasjoner hoppes over? Sann i headless/spilltest (navigator.webdriver)
 *  og ved `prefers-reduced-motion`. Delt av alle game-feel-animasjoner. */
export function gamefeelInstant(): boolean {
  if (typeof window === 'undefined') return true
  if (navigator.webdriver) return true
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}
const snapInstant = gamefeelInstant

/** Teller fra 0 opp til `target` når `active` blir sann (dagsoppgjørets sluttsum).
 *  0 mens inaktiv; snapper til target i headless/reduced-motion. */
export function useCountUp(target: number, durationMs: number, active: boolean): number {
  const [val, setVal] = useState(0)
  const rafRef = useRef(0)
  useEffect(() => {
    if (!active) { setVal(0); return }
    if (snapInstant()) { setVal(target); return }
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(t < 1 ? target * eased : target)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, durationMs, active])
  return val
}

/** Returnerer en verdi som animerer mot `target`. */
export function useAnimatedNumber(target: number, durationMs: number): number {
  const [val, setVal] = useState(target)
  const valRef = useRef(target)
  valRef.current = val
  const rafRef = useRef(0)

  useEffect(() => {
    if (snapInstant()) { setVal(target); return }
    const from = valRef.current
    if (from === target) return
    const start = performance.now()
    const delta = target - from
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(t < 1 ? from + delta * eased : target)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, durationMs])

  return val
}
