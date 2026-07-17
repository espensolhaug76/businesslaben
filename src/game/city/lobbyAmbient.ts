// ─── Lobby ambient-gjester — turist-sprites i turistsesong ───────────────────
// Spor C DEL 2 (Espens krav): i TURISTSESONG viser hotell-lobbyen 1–2 seedede
// turister som gjester ved peisen/lenestolene (CSS-lag over interiørbildet, ikke
// klikkbare, rolig seedet rotasjon). Samme mønster/registerkilde som
// spor-a/tema-reiseliv (TURIST_SPRITER + velgAmbientTurister).
//
// DEFENSIV KOBLING (som hotellavtale-state): reiseliv-temaet (grenen
// spor-a/tema-reiseliv) er IKKE merget til main. Denne modulen importerer
// derfor INGENTING fra reiseliv-koden — den er selvstendig:
//   - `state.turistsesong` finnes ikke på main → `erTuristsesong()` gir false →
//     ingen ambient-gjester (dormant). Auto-kobles når reiseliv merges.
//   - Sprite-filene ligger i public/assets/raw/customers/ PÅ reiseliv-grenen
//     (ikke på main) → <img> 404 → onError skjuler dem (LobbyView). De dukker
//     opp av seg selv når reiseliv merges.
// Logikken (utvalg, sesong-aritmetikk) speiler reiseliv 1:1 så oppførselen er lik
// når grenene møtes; en senere opprydding kan samle dem i én kilde.

import { DAY_CONFIG } from '../data/dayConfig'
import { dagSeed } from '../data/backgroundSales'

export interface AmbientTurist { id: string; fil: string; gruppe?: boolean }

const CUST = '/assets/raw/customers'
// Speil av TURIST_SPRITER (reiseliv.ts på reiseliv-grenen). `gruppe` = par/familie
// (bredere sprite, to kropper) — object-fit:contain håndterer bredden i sloten.
export const AMBIENT_TURIST_SPRITER: AmbientTurist[] = [
  { id: 'turist-kart',        fil: `${CUST}/turist-kart.png` },
  { id: 'turist-kamera',      fil: `${CUST}/turist-kamera.png` },
  { id: 'turist-familie',     fil: `${CUST}/turist-familie.png`, gruppe: true },
  { id: 'turist-par',         fil: `${CUST}/turist-par.png`,     gruppe: true },
  { id: 'turist-eldre-stokk', fil: `${CUST}/turist-eldre-stokk.png` },
  { id: 'turist-backpacker',  fil: `${CUST}/turist-backpacker.png` },
  { id: 'turist-eldrepar',    fil: `${CUST}/turist-eldrepar.png`, gruppe: true },
]

/** Deterministisk utvalg av N distinkte ambient-turister, seedet av dagen. Ren
 *  funksjon (ingen Math.random) — samme dag gir samme gjester (rolig rotasjon,
 *  stabilt gjennom dagen, varierer dag til dag). Kopi av reiseliv-logikken. */
export function velgAmbientTurister(seed: number, n: number): AmbientTurist[] {
  const pool = [...AMBIENT_TURIST_SPRITER]
  const valgt: AmbientTurist[] = []
  const antall = Math.max(0, Math.min(n, pool.length))
  let s = seed >>> 0
  for (let i = 0; i < antall; i++) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    valgt.push(pool.splice(s % pool.length, 1)[0]!)
  }
  return valgt
}

/** Dags-seed for lobbyen (samme kilde som bakgrunnssalget) — stabil per dag. */
export function lobbySeed(state: { dayNumber: number; currentMonth: number; currentYear: number }): number {
  return dagSeed(state.dayNumber, state.currentMonth, state.currentYear)
}

// Sesong-aritmetikk speilet fra reiseliv (GameContext.absDag/turistsesongAktivPaa).
function absDag(year: number, month: number, dayNumber: number): number {
  return ((year - 1) * 12 + (month - 1)) * DAY_CONFIG.daysPerMonth + dayNumber
}

/** DEFENSIV turistsesong-sjekk. reiseliv-temaet legger `state.turistsesong`
 *  (+ `dayBackground.turistandel` i åpen sesong-dag). Finnes ingen av dem (main)
 *  → false → ingen ambient-gjester. Auto-kobles når reiseliv merges. */
export function erTuristsesong(state: unknown): boolean {
  const s = state as {
    turistsesong?: { startAbsDag: number; varighet: number } | null
    currentYear?: number; currentMonth?: number; dayNumber?: number
    dayBackground?: { turistandel?: number } | null
  }
  // Raskt signal: en åpen dag med turistandel (satt ved OPEN_DAY i sesong).
  if ((s?.dayBackground?.turistandel ?? 0) > 0) return true
  // Ellers: aktiv sesong ut fra state.turistsesong (samme aritmetikk som reiseliv).
  const ts = s?.turistsesong
  if (ts && s.currentYear != null && s.currentMonth != null && s.dayNumber != null) {
    const naa = absDag(s.currentYear, s.currentMonth, s.dayNumber)
    return naa >= ts.startAbsDag && naa < ts.startAbsDag + ts.varighet
  }
  return false
}
