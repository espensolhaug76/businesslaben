// ─── FAG (programfag-brytere) ────────────────────────────────────────────────
// Lærerstyrt fagaktivering: læreren velger hvilke av de tre programfagene som er
// PÅ for klassen. Fag som er AV skjules HELT for eleven (faner, temaer,
// innbokstyper, «Espen spør»-spørsmål). Default ALLE på = dagens spill (fritt).
//
// RTDB: klasser/{klassekode}/fagAktivering = { fd, m, ks } (booleans).
// Mangler noden ⇒ alt på. Uten klassekode: lokal fallback (localStorage).
// Dev-overstyring (?dev=1) VINNER lokalt (se GameContext/DevPanel).
//
// Kobling til temaer: hvert tema (temaer.ts) navngir sitt `fag`; er fagets bryter
// av, regnes temaet som inaktivt uansett temaAktivering. Kobling til dashbord-
// faner (DashboardOverlay `visFag`) og «Espen spør» (espenSporsmal `fag`).

export type FagKode = 'fd' | 'm' | 'ks'

export interface FagAktivering {
  /** Forretningsdrift (VG1) / Økonomi og administrasjon (VG2) + HMS-koblingen. */
  fd: boolean
  /** Markedsføring og innovasjon (VG1) / Kommunikasjon og markedsføring (VG2). */
  m: boolean
  /** Kultur og samhandling + reiseliv. */
  ks: boolean
}

export const FAG_KODER: FagKode[] = ['fd', 'm', 'ks']

/** Default: ALT på (fritt spill / dagens oppførsel uten lærerstyring). */
export const FAG_DEFAULT: FagAktivering = { fd: true, m: true, ks: true }

export const FAG_META: Record<FagKode, { navn: string; kort: string }> = {
  fd: { navn: 'Forretningsdrift', kort: 'FD' },
  m: { navn: 'Markedsføring og innovasjon', kort: 'M' },
  ks: { navn: 'Kultur og samhandling', kort: 'KS' },
}

/** Normaliser en (mulig delvis / null) RTDB- eller localStorage-verdi til et fullt
 *  FagAktivering-objekt der en manglende/ugyldig nøkkel regnes som PÅ (fritt). */
export function normaliserFag(v: unknown): FagAktivering {
  const o = (v && typeof v === 'object') ? v as Record<string, unknown> : {}
  return {
    fd: o.fd !== false,
    m: o.m !== false,
    ks: o.ks !== false,
  }
}
