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
  /** Ønsket antall (default 1 når utelatt) — f.eks. et selskap på 8 kjøper
   *  8 stk, ikke 1. Klemmes mot FAKTISK stock ved valgtidspunktet (delsalg
   *  hvis lageret ikke strekker til) — se chooseFixed i SalesScenarioOverlay. */
  qty?: number
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
  /** Valgfritt (DEL 3): kroner som forlater kassa når dette velges — f.eks.
   *  omlevering/refusjon i et reklamasjonsscenario. Trekkes fra `money`. */
  cost?: number
}

export interface SalesStep {
  id: string
  /** Kundens replikk i dette steget. Kan inneholde token-referanser
   *  `{price:<produkt-id>}` / `{stock:<produkt-id>}` som byttes ut med
   *  elevens FAKTISKE tall fra sortimentet ved rendering (se
   *  engine.ts sin interpolateTokens) — så replikkene aldri lyver om
   *  hva eleven faktisk har satt/fører. */
  customerLine: string
  /** Valgfri regi/utdypning som vises diskret under replikken. Støtter
   *  samme token-interpolering som customerLine. */
  note?: string
  /** 'recommend' ⇒ UI bygger valgene fra elevens FAKTISKE sortiment
   *  (anbefal-steget).
   *  'stock-commit' (DEL 2, Storbestillingen) ⇒ UI slår opp varen som
   *  matcher `recommendNeed` og bygger 3 valg (lov alt / ærlig delvis /
   *  si nei) der kvaliteten avhenger av om `stock` faktisk dekker
   *  `commitQty`.
   *  'margin-discount' (DEL 2, Storbestillingen) ⇒ UI slår opp samme vare
   *  og bygger volumrabatt-valg der kvaliteten avhenger av VARENS margin.
   *  Ellers brukes `choices`. */
  kind?: 'recommend' | 'stock-commit' | 'margin-discount'
  /** Behovet/varen steget skal slå opp (for kind:'recommend' er dette
   *  «behovstreff»-nøkkelord; for 'stock-commit'/'margin-discount' brukes
   *  det til å finne DEN ENE varen bestillingen/rabatten gjelder). */
  recommendNeed?: string[]
  /** Kun for kind:'recommend' — ønsket antall (default 1). F.eks. et
   *  bursdagsselskap på 8 anbefales i 8 stk, ikke 1. Klemmes mot faktisk
   *  stock ved valgtidspunktet (delsalg hvis lite), samme regel som
   *  SellDirective.qty. */
  recommendQty?: number
  /** Kun for kind:'stock-commit' — antall kunden ber om (f.eks. 40). */
  commitQty?: number
  /** Faste valg (for vanlige steg). Utelatt for kind:'recommend'/'stock-commit'/'margin-discount'. */
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
  /** Kundens sprite (ren PNG med alfa) som vises i interiørscenen. */
  sprite: string
  /** SKJULT behov — vises ikke til eleven før i resultat/feedback. */
  hiddenNeed: string
  /** Utfallstype (DEL 3). 'sale' (standard) = hovedmetrikken er salg.
   *  'service' = hovedmetrikken er RYKTE (f.eks. klage/reklamasjon): ingen
   *  salgsforventning, og en god løsning kan koste penger. */
  outcomeKind?: 'sale' | 'service'
  /** Klesbutikk (oppsøkende salg): når true flyttes SLUTTSTEGET til kassevyen
   *  (oppgjørsscenen) — brukes der oppgjøret naturlig skjer ved kassen (f.eks.
   *  angrekjøp/retur, gavekjøp med kvittering). Ignoreres av kafeens flyt (bak-
   *  disken-scenen ER kassen). Kun et scene-hint til stillaset; endrer ikke
   *  scoringen. */
  avsluttesVedKasse?: boolean
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
  /** Kroner ut av kassa (DEL 3): sum av valgte `cost` (omlevering/refusjon). */
  cost: number
  /** Hovedmetrikken som resultatkortet fremhever: 'sale' (salg/omsetning) eller
   *  'reputation' (rykte — for service/klage-scenarier). */
  primaryMetric: 'sale' | 'reputation'
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
