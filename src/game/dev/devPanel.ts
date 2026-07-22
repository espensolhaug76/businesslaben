// ─── DEV-PANEL — delt UI-tilstand (kun ?dev=1) ───────────────────────────────
// Ett lite eksternt lager for dev-panelets synlighetsflagg, delt mellom
// DevPanel-komponenten (⚙-skuffen) og de spredte kalibrerings-/tracer-verktøyene
// som bor i de enkelte scene-komponentene. Panelet FLYTTER ikke verktøyene — det
// slår bare av/på synligheten deres via disse flaggene, og husker sin egen
// åpen/lukket-tilstand i localStorage (som `dev_cust_overrides_v1`-mønsteret).
//
// Kun aktuelt når ?dev=1 er satt (IS_DEV_COORDS) — ellers rendres verken panelet
// eller verktøyene i det hele tatt.

import { useSyncExternalStore } from 'react'
import { KLESBUTIKK_AKTIV } from '../data/featureFlags'

const LS_KEY = 'dev_panel_v1'

export interface DevPanelState {
  /** ⚙-skuffen åpen? (persistert) */
  open: boolean
  /** Vis tracer-/kalibreringspanelene i scenene? Default PÅ (som før ?dev=1) —
   *  panelet lar deg slå dem AV for en ren scene. */
  kalibrering: boolean
  /** Vis scenariovelgeren (interiørscenen)? Default PÅ. */
  scenariovelger: boolean
  /** LOKAL DEV-overstyring av bransjeflagget KLESBUTIKK_AKTIV (kun for validering
   *  i ?dev=1). true ⇒ klesbutikken er aktiv i DENNE nettleseren, uavhengig av
   *  produktflagget. Presedens: DEV > featureFlags > default. ALDRI delt/RTDB. */
  klesbutikkAktivDev: boolean
}

const DEFAULT: DevPanelState = { open: false, kalibrering: true, scenariovelger: true, klesbutikkAktivDev: false }

function load(): DevPanelState {
  if (typeof window === 'undefined') return DEFAULT
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return DEFAULT
    return { ...DEFAULT, ...(JSON.parse(raw) as Partial<DevPanelState>) }
  } catch {
    return DEFAULT
  }
}

let current: DevPanelState = load()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function persist() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(current)) } catch { /* ignore */ }
}

function set(patch: Partial<DevPanelState>) {
  current = { ...current, ...patch }
  persist()
  emit()
}

export function setDevPanel(patch: Partial<DevPanelState>) { set(patch) }
export function toggleDevPanel(key: keyof DevPanelState) { set({ [key]: !current[key] } as Partial<DevPanelState>) }

const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb) } }
const snapshot = () => current

/** React-hook: les det delte dev-panel-lageret (reaktivt). */
export function useDevPanel(): DevPanelState {
  return useSyncExternalStore(subscribe, snapshot, snapshot)
}

// ─── EFFEKTIV bransjeflagg — ÉN delt kilde ───────────────────────────────────
// ALLE lesere av «er klesbutikken aktiv?» (bransjevelger, getActiveIndustry-
// Definition, scenariePool, kassevy, katalog i Produkter-fanen) skal lese HERFRA,
// aldri featureFlags.KLESBUTIKK_AKTIV direkte. Presedens: DEV-overstyring (denne
// nettleseren, ?dev=1) > produktflagget KLESBUTIKK_AKTIV (featureFlags.ts) >
// default (false). Leses ved kjøretid (ikke modul-init) så DEV-togglen slår
// gjennom på neste render uten reload.

/** Er klesbutikken EFFEKTIVT aktiv? DEV-overstyring vinner over produktflagget. */
export function klesbutikkAktiv(): boolean {
  return current.klesbutikkAktivDev || KLESBUTIKK_AKTIV
}

/** Hvilken kilde bestemmer den effektive verdien nå — for tekstlabel i panelet. */
export function klesbutikkAktivKilde(): 'dev' | 'flagg' {
  return current.klesbutikkAktivDev ? 'dev' : 'flagg'
}
