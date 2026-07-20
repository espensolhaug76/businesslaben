import { useEffect, useRef, useState } from 'react'

// ── KROK 4 — GAME FEEL: animerte tall ────────────────────────────────────────
// Teller mykt (easeOutCubic) fra forrige verdi til ny over `durationMs`. Brukes
// i HUD-kassa + dagsoppgjørets sluttsum. Snapper ØYEBLIKKELIG i headless/
// spilltest (navigator.webdriver) og ved `prefers-reduced-motion`, så tester og
// bevegelsesfølsomme brukere ser tallet uten animasjon.

function snapInstant(): boolean {
  if (typeof window === 'undefined') return true
  if (navigator.webdriver) return true
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
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
