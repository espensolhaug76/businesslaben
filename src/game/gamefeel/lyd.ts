// ── KROK 4 — GAME FEEL: LYD (Web Audio, syntetisert) ─────────────────────────
// Ingen eksterne ressurser: alle lyder genereres i AudioContext (oscillator +
// gain-envelope). To lyder: kasse-pling (per bakgrunnssalg, dempet, maks ett i
// sekundet) og en kort oppgjørs-fanfare (KUN ved positivt dagsresultat).
//
// Av/på: localStorage-bryter (default fra balance.gamefeel.lyd.standardPaa).
// ALLTID av i headless/spilltest (navigator.webdriver) — se `lydPaa()`.
//
// Autoplay-policy: AudioContext kan ikke starte før en brukergest. Vi lager/
// resumer konteksten lat ved første lydkall; `armerLyd()` kalles fra en
// klikk-lytter i appen så den er «varm» før første salg.

import { BALANCE } from '../data/balance'

const LYD_KEY = 'gamefeel-lyd'
const G = BALANCE.gamefeel.lyd

let ctx: AudioContext | null = null
let sistePlingMs = 0

function erHeadless(): boolean {
  return typeof navigator !== 'undefined' && navigator.webdriver === true
}

/** Er lyd på? localStorage-bryter (default standardPaa) OG ikke headless/test. */
export function lydPaa(): boolean {
  if (typeof window === 'undefined' || erHeadless()) return false
  const v = localStorage.getItem(LYD_KEY)
  return v === null ? G.standardPaa : v === '1'
}

/** Les/sett av/på-bryteren (innstillinger). */
export function getLyd(): boolean {
  if (typeof window === 'undefined') return G.standardPaa
  const v = localStorage.getItem(LYD_KEY)
  return v === null ? G.standardPaa : v === '1'
}
export function setLyd(paa: boolean): void {
  try { localStorage.setItem(LYD_KEY, paa ? '1' : '0') } catch { /* ignore */ }
  if (paa) armerLyd()
}

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  if (!ctx) { try { ctx = new AC() } catch { return null } }
  if (ctx.state === 'suspended') ctx.resume().catch(() => { /* ignore */ })
  return ctx
}

/** Kalles fra en brukergest (klikk) så AudioContext er startet før første lyd. */
export function armerLyd(): void {
  if (!lydPaa()) return
  getCtx()
}

/** Én tone med rask attack/decay-envelope. */
function tone(freq: number, start: number, dur: number, volum: number, type: OscillatorType = 'sine'): void {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t0 = c.currentTime + start
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(volum, t0 + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

/** Kasse-pling ved bakgrunnssalg — dempet, maks ett per sekund. */
export function kassePling(): void {
  if (!lydPaa()) return
  const naa = Date.now()
  if (naa - sistePlingMs < G.plingCooldownMs) return
  sistePlingMs = naa
  // To korte toner (ding-ding) — kasse-følelse.
  tone(1320, 0, 0.09, G.plingVolum, 'triangle')
  tone(1760, 0.05, 0.11, G.plingVolum * 0.85, 'triangle')
}

/** Kort, dempet fanfare — KUN ved positivt dagsresultat. */
export function oppgjorFanfare(): void {
  if (!lydPaa()) return
  // Stigende treklang (C-E-G), myk.
  const v = G.fanfareVolum
  tone(523, 0.00, 0.16, v, 'triangle')
  tone(659, 0.10, 0.16, v, 'triangle')
  tone(784, 0.20, 0.28, v, 'triangle')
}
