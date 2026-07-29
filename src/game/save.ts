// ─── LAGRING: én versjonert localStorage-nøkkel for HELE spilltilstanden ─────
// Skolestart-krav: en elev som lukker/relaster nettleseren skal finne butikken
// sin igjen NØYAKTIG der den var. Før dette ble det MESTE av spilltilstanden
// (products, incomingOrders, money, dayPhase, dayNumber …) IKKE lagret i det hele
// tatt, så en reload nullstilte spillet.
//
// `adventure_save_v1` lagrer { version, savedAt, state } der `state` er HELE
// GameState (alt reduceren eier). Full-saven er kilden for «Fortsett»
// (HYDRATE_SAVE). Vi auto-hydrerer den IKKE ved boot — oppstartsmenyen tilbyr
// «Fortsett»/«Start ny» (se StartupScreen).
//
// SCOPE: localStorage (per nettleserprofil på denne maskinen). Sync på tvers av
// enheter (RTDB per klassekode) er en EGEN senere jobb — se rapporten. Delt
// maskin (to elever, samme profil) er også flagget der.
//
// AVGRENSNING — små flagg-nøkler beholdes bevisst i sine egne nøkler (IKKE
// konsolidert hit): temaarbeid (beredskap_state_v1 / budsjett_state_v1, eid av
// GameContext-init for reseed-kompat) og onboarding (mentor_fired_v1,
// mentor_intro_v1, budsjett_intro_v1, kampanje_intro_v1). De dekker andre behov
// (overleve et FERSKT spill / «har-sett»-markører) og er tett koblet til
// seed-avhengige spilltester. Full konsolidering av dem er en mulig oppfølger —
// se rapporten. Alt dette skrives uansett fra samme reducer-state, så `state` i
// full-saven inneholder også temaarbeidet (og gjenopprettes helt via «Fortsett»).

import type { GameState } from './types'

export const SAVE_KEY = 'adventure_save_v1'
export const SAVE_BACKUP_KEY = 'adventure_save_backup'
export const SAVE_VERSION = 1

interface SaveBlob {
  version: number
  savedAt: string
  state: Partial<GameState> | null
}

// In-memory kanonisk blob — lastes én gang ved oppstart, autosave oppdaterer den.
let blob: SaveBlob | null = null

function naaISO(): string { try { return new Date().toISOString() } catch { return '' } }
function les(key: string): string | null { try { return localStorage.getItem(key) } catch { return null } }
function skriv(key: string, val: string) { try { localStorage.setItem(key, val) } catch { /* quota/privat modus */ } }
function fjern(key: string) { try { localStorage.removeItem(key) } catch { /* */ } }

function persister() {
  if (!blob) return
  blob.savedAt = naaISO()
  skriv(SAVE_KEY, JSON.stringify(blob))
}

// ── Innlasting (kalles én gang ved oppstart, i GameProvider-init) ────────────
/** Last (og valider) full-save-blobben. Korrupt JSON eller versjons-mismatch:
 *  flytt den gamle blobben til `adventure_save_backup` (aldri slett stille) og
 *  start med tom lagring. */
export function lastLagring(): void {
  const raw = les(SAVE_KEY)
  if (raw == null) {
    blob = { version: SAVE_VERSION, savedAt: naaISO(), state: null }
    return
  }
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.version === SAVE_VERSION && 'state' in parsed) {
      blob = {
        version: SAVE_VERSION,
        savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : '',
        state: parsed.state ?? null,
      }
      return
    }
    // Versjons-mismatch (eller ukjent form) → backup + fersk start.
    skriv(SAVE_BACKUP_KEY, raw)
  } catch {
    // Korrupt JSON → backup + fersk start.
    skriv(SAVE_BACKUP_KEY, raw)
  }
  blob = { version: SAVE_VERSION, savedAt: naaISO(), state: null }
  persister()
}

// ── Spilltilstand (state) ────────────────────────────────────────────────────
/** Skriv HELE state inn i blobben (autosave). Kalles throttlet fra GameProvider. */
export function lagreState(state: GameState) {
  if (!blob) blob = { version: SAVE_VERSION, savedAt: '', state: null }
  blob.state = state
  persister()
}

/** Et fortsettbart spill = lagret state som faktisk er STARTET (phase satt og
 *  ikke 'startup'). */
export function harFortsettbart(): boolean {
  const s = blob?.state
  return !!(s && typeof s.phase === 'string' && s.phase !== 'startup')
}

/** Full lagret state for et fortsettbart spill (til HYDRATE_SAVE), ellers null. */
export function fortsettState(): Partial<GameState> | null {
  return harFortsettbart() ? blob!.state : null
}

/** Kort sammendrag til «Fortsett»-knappen i oppstartsmenyen. */
export function lagringSammendrag(): { companyName: string; dayNumber: number; savedAt: string } | null {
  if (!harFortsettbart()) return null
  const s = blob!.state!
  return {
    companyName: (s.companyName ?? '').toString(),
    dayNumber: typeof s.dayNumber === 'number' ? s.dayNumber : 1,
    savedAt: blob!.savedAt,
  }
}

/** Slett lagringen (Start ny bedrift / DEV «Slett lagring»). Beholder en backup
 *  under `adventure_save_backup` for feilsøking — aldri slett stille. */
export function slettLagring() {
  const raw = les(SAVE_KEY)
  if (raw != null) skriv(SAVE_BACKUP_KEY, raw)
  fjern(SAVE_KEY)
  blob = { version: SAVE_VERSION, savedAt: naaISO(), state: null }
}
