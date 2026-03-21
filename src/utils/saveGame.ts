const SAVE_KEY = 'adventure-save'

export function saveGame(state: Record<string, unknown>) {
  try {
    const data = {
      ...state,
      _savedAt: new Date().toISOString(),
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(data))
  } catch {
    // localStorage might be full or unavailable
  }
}

export function loadGame(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function hasSave(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY)
}
