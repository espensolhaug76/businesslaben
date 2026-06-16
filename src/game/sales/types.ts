// ─── SALGSSITUASJON-MOTOR — datamodell ───────────────────────────────────────
//
// Et scenario er et lite dialogbasert rollespill: en KUNDE med et SKJULT behov
// går gjennom en ordnet liste STEG. Hvert steg har en kunde-replikk og 2–4
// valg; hvert valg har en kvalitet (good/warn/bad) og en feedback-tekst.
// Avslutningen beregnes (SalesResult): salg fra elevens FAKTISKE sortiment,
// tilfredshet/rykte-delta, XP og en oppsummerende tilbakemelding.
//
// Skjemaet er bevisst flatt og lett å utvide (flere scenarier, flere felt på
// valg/steg) uten å bryte eksisterende data.

export type ChoiceQuality = 'good' | 'warn' | 'bad'

/** Registrer et salg fra elevens sortiment når valget gjøres. Varen finnes
 *  IKKE hardkodet — den slås opp mot `products` via nøkkelord (needTags), så
 *  motoren respekterer hva eleven faktisk fører. */
export interface SellDirective {
  /** Nøkkelord som identifiserer riktig vare (matches mot navn + id). */
  needTags: string[]
  /** true = tilleggssalg (mersalg), ikke hovedbehovet. */
  addon?: boolean
}

export interface SalesChoice {
  id: string
  text: string
  quality: ChoiceQuality
  /** Tilbakemelding som vises etter at valget er gjort. */
  feedback: string
  /** Forgrening: hopp til dette steg-id-et. Uten verdi ⇒ neste steg i
   *  rekkefølgen (eller avslutning om det var siste steg). */
  next?: string
  /** Valgfritt: registrer et salg fra sortimentet når dette velges. */
  sell?: SellDirective
}

export interface SalesStep {
  id: string
  /** Kundens replikk i dette steget. */
  customerLine: string
  /** Valgfri regi/utdypning som vises diskret under replikken. */
  note?: string
  /** 'recommend' ⇒ UI bygger valgene fra elevens FAKTISKE sortiment
   *  (anbefal-steget). Ellers brukes `choices`. */
  kind?: 'recommend'
  /** Behovet anbefal-steget skal dekke (kun for kind:'recommend'):
   *  nøkkelord som avgjør hvilken vare som er «behovstreff». */
  recommendNeed?: string[]
  /** Faste valg (for vanlige steg). Utelatt for kind:'recommend'. */
  choices?: SalesChoice[]
}

export interface SalesScenario {
  id: string
  /** Vises i UI som kundens navn/etikett. */
  customerName: string
  /** Persona-tag som matcher elevens målgruppe (psychographics) for bonus. */
  personaTag: string
  /** Kort, synlig beskrivelse av kunden. */
  description: string
  /** SKJULT behov — vises ikke til eleven før i resultat/feedback. */
  hiddenNeed: string
  /** Ordnet liste steg; første element = startsteg. */
  steps: SalesStep[]
}

// ── Kjøretidsresultat ─────────────────────────────────────────────────────────

/** Én salgslinje registrert i løpet av samtalen. */
export interface SaleLine {
  productId: string
  name: string
  /** Enhetspris (kr) på registreringstidspunktet. */
  price: number
  /** Antall (0 hvis varen var utsolgt — talt med for sporbarhet). */
  qty: number
  addon?: boolean
}

/** Et enkelt valg slik det telles i sluttscoren. */
export interface ScoredPick {
  quality: ChoiceQuality
  /** true hvis valget traff kundens skjulte behov (riktig vare anbefalt). */
  behovstreff?: boolean
}

export interface SalesResult {
  sales: SaleLine[]
  revenue: number
  /** Kundetilfredshet 0–100 (per scenario; mappes til rykte-delta). */
  satisfaction: number
  reputationDelta: number
  xpEarned: number
  personaMatch: boolean
  behovstreff: boolean
  summary: string
  good: number
  warn: number
  bad: number
}
