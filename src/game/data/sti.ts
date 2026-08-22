// ─── STI — lærerstyrte milepæler (valgfri «guidet» rekkefølge) ────────────────
// Læreren kan sette opp en ORDNET sti av milepæler (klasser/{kode}/sti = array av
// id-er). Mentoren dytter da eleven mot NESTE udekkede milepæl — aldri en sperre,
// alltid mulig å ignorere. TOM sti = dagens frispill, helt uendret.
//
// Fast katalog (IKKE fritekst). Hver milepæl har en ren GameState-sjekk for «er
// denne fullført», basert på felt som allerede finnes fra tidligere runder.

import type { GameState } from '../types'

export interface Milepael {
  id: string
  /** Kort, handlingsrettet label — vises i lærerpanelet og i mentor-dyttet. */
  label: string
  /** Er milepælen fullført gitt dagens spilltilstand? Ren funksjon, ingen
   *  bivirkninger. */
  fullfort: (s: GameState) => boolean
}

// Rekkefølgen her er kun palett-visningsrekkefølge i lærerpanelet — den REELLE
// rekkefølgen bestemmes av lærerens ordnede `sti`-array.
export const STI_MILEPAELER: Milepael[] = [
  { id: 'lei-lokale',      label: 'Lei et lokale',                  fullfort: s => !!s.rentedLocationId },
  { id: 'apningsordre',    label: 'Legg åpningsbestillingen',       fullfort: s => s.openingOrderPlaced },
  { id: 'still-ut-vare',   label: 'Still ut en vare i disken',      fullfort: s => s.counterLayout.length > 0 },
  { id: 'sett-pris',       label: 'Sett pris på en vare',           fullfort: s => s.products.some(p => p.retailPrice > 0) },
  { id: 'apne-butikken',   label: 'Åpne butikken',                  fullfort: s => s.dayHistory.length > 0 || s.dayPhase === 'åpen' || s.dayNumber > 1 },
  { id: 'ansett',          label: 'Ansett din første medarbeider',  fullfort: s => s.employees.length > 0 },
  { id: 'markedsforing',   label: 'Sett et markedsføringsbudsjett', fullfort: s => Object.values(s.marketingBudget).some(v => v > 0) },
]

export function milepaelById(id: string): Milepael | undefined {
  return STI_MILEPAELER.find(m => m.id === id)
}

/** Neste UDEKKEDE milepæl i den lærerstyrte stien (rekkefølge = `sti`), eller null
 *  hvis stien er tom eller alt i den er fullført. Ukjente/utdaterte id-er hoppes over. */
export function nesteMilepael(sti: string[], state: GameState): Milepael | null {
  for (const id of sti) {
    const m = milepaelById(id)
    if (m && !m.fullfort(state)) return m
  }
  return null
}
