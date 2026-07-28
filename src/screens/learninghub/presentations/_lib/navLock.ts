/**
 * Navigasjonslås for live-modus (spor D).
 *
 * I en live økt er det LÆREREN som blar. Elevens navigasjonsknapper har lenge
 * vært skjult (`_isLive`-flagget, satt fra `isStudentLive` i useLiveSync), men
 * tastaturhåndtereren ble aldri koblet fra — eleven kunne bla videre med
 * piltastene. Denne lista brukes til å slå av all elevstyrt bla-navigasjon.
 *
 * Escape er BEVISST ikke med: den lukker modaler og lar eleven forlate
 * presentasjonen. Å blokkere den ville låst eleven inne.
 */
export const NAVIGASJONSTASTER: ReadonlySet<string> = new Set([
  'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown',
  'PageDown', 'PageUp',
  'Home', 'End',
  ' ', 'Spacebar',            // «Spacebar» er eldre Edge/Firefox-navn
])

/** Sann for tastene som blar i en presentasjon (eller ruller siden). */
export function erNavigasjonstast(key: string): boolean {
  return NAVIGASJONSTASTER.has(key)
}
