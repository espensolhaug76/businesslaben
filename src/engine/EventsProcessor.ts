/**
 * PEST Events processor for AdVenture 2.3
 * Pure functions — no React, no side effects.
 *
 * Handles random PEST (Political, Economic, Social, Technological) events
 * that occur during the simulation. Each event presents the player with
 * choices that affect game state.
 */

import type { PESTEvent } from '../types';

// ---------------------------------------------------------------------------
// Built-in event bank (used if no events.json is loaded yet)
// ---------------------------------------------------------------------------

const BUILTIN_EVENTS: PESTEvent[] = [
  // POLITICAL
  {
    id: 'pol_001',
    title: 'Ny importtoll',
    description: 'Regjeringen innforer ny toll pa importerte varer. Varekostnadene kan oke med 10-15%.',
    category: 'political',
    severity: 'medium',
    choices: [
      {
        id: 'pol_001_a',
        label: 'Bytt til norske leverandorer',
        description: 'Hoyere kvalitet, men ogsa hoyere kostnader.',
        consequence: { description: 'Varekostnad oker 5%, omdomme +2', demandModifier: 1.0, costModifier: 1.05, reputationModifier: 2, duration: 3 },
      },
      {
        id: 'pol_001_b',
        label: 'Absorber kostnaden',
        description: 'Beholder prisene, men tynner marginene.',
        consequence: { description: 'Varekostnad oker 12%', demandModifier: 1.0, costModifier: 1.12, reputationModifier: 0, duration: 3 },
      },
      {
        id: 'pol_001_c',
        label: 'Ok prisene til kundene',
        description: 'Overforer kostnaden, men risikerer a miste kunder.',
        consequence: { description: 'Ettersporselen synker 15%', demandModifier: 0.85, costModifier: 1.0, reputationModifier: -1, duration: 2 },
      },
    ],
  },
  {
    id: 'pol_002',
    title: 'Miljoregulering',
    description: 'Nye miljoreguleringer krever barekraftig emballasje. Bedrifter med hoy barekraft far fordeler.',
    category: 'political',
    severity: 'low',
    choices: [
      {
        id: 'pol_002_a',
        label: 'Invester i barekraftig emballasje',
        description: 'Koser penger na, men bygger omdomme.',
        consequence: { description: 'Kostnader +8%, omdomme +3', demandModifier: 1.05, costModifier: 1.08, reputationModifier: 3, duration: 4 },
      },
      {
        id: 'pol_002_b',
        label: 'Gjor minimum for a overholde krav',
        description: 'Billigst mulig losning.',
        consequence: { description: 'Kostnader +3%', demandModifier: 1.0, costModifier: 1.03, reputationModifier: 0, duration: 2 },
      },
    ],
  },

  // ECONOMIC
  {
    id: 'eco_001',
    title: 'Okonomisk nedgang',
    description: 'En okonomisk nedgang pavirker forbrukernes kjopekraft. Folk bruker mindre penger pa ikke-nodvendige varer.',
    category: 'economic',
    severity: 'high',
    choices: [
      {
        id: 'eco_001_a',
        label: 'Tilby rabatter og kampanjer',
        description: 'Tiltrekk prissensitive kunder.',
        consequence: { description: 'Ettersporselen oker 10%, margin synker', demandModifier: 1.1, costModifier: 1.0, reputationModifier: 1, duration: 3 },
      },
      {
        id: 'eco_001_b',
        label: 'Fokuser pa premium-segmentet',
        description: 'Rike kunder handler fortsatt.',
        consequence: { description: 'Ettersporselen synker 20%, men marginer holdes', demandModifier: 0.8, costModifier: 1.0, reputationModifier: 2, duration: 3 },
      },
      {
        id: 'eco_001_c',
        label: 'Kutt kostnader internt',
        description: 'Reduser driftskostnader.',
        consequence: { description: 'Faste kostnader -10%', demandModifier: 1.0, costModifier: 0.9, reputationModifier: -1, duration: 2 },
      },
    ],
  },
  {
    id: 'eco_002',
    title: 'Renteokning',
    description: 'Sentralbanken oker styringsrenten. Lanekostnader stiger og forbruk synker.',
    category: 'economic',
    severity: 'medium',
    choices: [
      {
        id: 'eco_002_a',
        label: 'Betal ned lan raskere',
        description: 'Reduser gjeld for a spare renter.',
        consequence: { description: 'Kostnader +5% midlertidig, men bedre langsiktig', demandModifier: 0.95, costModifier: 1.05, reputationModifier: 1, duration: 2 },
      },
      {
        id: 'eco_002_b',
        label: 'Fortsett som normalt',
        description: 'Ikke gjor endringer.',
        consequence: { description: 'Ettersporselen synker 5%', demandModifier: 0.95, costModifier: 1.0, reputationModifier: 0, duration: 3 },
      },
    ],
  },

  // SOCIAL
  {
    id: 'soc_001',
    title: 'Viral sosiale medier-trend',
    description: 'En influencer nevner produkter som ligner dine. Plutselig okende interesse!',
    category: 'social',
    severity: 'medium',
    choices: [
      {
        id: 'soc_001_a',
        label: 'Samarbeid med influenceren',
        description: 'Koster 15 000 kr, men kan gi stor effekt.',
        consequence: { description: 'Ettersporselen oker 30%!, kostnader oker', demandModifier: 1.3, costModifier: 1.02, reputationModifier: 3, duration: 2 },
      },
      {
        id: 'soc_001_b',
        label: 'Kok pa den naturlige oppmerksomheten',
        description: 'Gratis, men mindre effekt.',
        consequence: { description: 'Ettersporselen oker 10%', demandModifier: 1.1, costModifier: 1.0, reputationModifier: 1, duration: 1 },
      },
    ],
  },
  {
    id: 'soc_002',
    title: 'Barekraftsfokus i media',
    description: 'Media setter sokelys pa barekraft i bransjen. Kunder blir mer bevisste.',
    category: 'social',
    severity: 'low',
    choices: [
      {
        id: 'soc_002_a',
        label: 'Fremhev din barekraftsprofil',
        description: 'Vis kundene hva du gjor for miljoet.',
        consequence: { description: 'Omdommeboost, ettersporselen +5%', demandModifier: 1.05, costModifier: 1.0, reputationModifier: 4, duration: 3 },
      },
      {
        id: 'soc_002_b',
        label: 'Ignorer det',
        description: 'Fokuser pa kjernevirksomheten.',
        consequence: { description: 'Omdomme -2 (virker ubevisst)', demandModifier: 1.0, costModifier: 1.0, reputationModifier: -2, duration: 1 },
      },
    ],
  },

  // TECHNOLOGICAL
  {
    id: 'tech_001',
    title: 'Ny netthandelsplattform',
    description: 'En ny norsk netthandelsplattform tilbyr gratis oppstart. Kan oke nettsalg betraktelig.',
    category: 'technological',
    severity: 'low',
    choices: [
      {
        id: 'tech_001_a',
        label: 'Registrer deg pa plattformen',
        description: 'Gratis a starte, men krever tid.',
        consequence: { description: 'Nettsalg +15%, liten kostnadsokning', demandModifier: 1.15, costModifier: 1.01, reputationModifier: 1, duration: 4 },
      },
      {
        id: 'tech_001_b',
        label: 'Vent og se',
        description: 'La andre teste forst.',
        consequence: { description: 'Ingen umiddelbar effekt', demandModifier: 1.0, costModifier: 1.0, reputationModifier: 0, duration: 1 },
      },
    ],
  },
  {
    id: 'tech_002',
    title: 'Cyberangrep pa bransjen',
    description: 'Flere bedrifter i bransjen er rammet av cyberangrep. Kundene er urolige for personvern.',
    category: 'technological',
    severity: 'high',
    choices: [
      {
        id: 'tech_002_a',
        label: 'Invester i IT-sikkerhet',
        description: 'Koster penger, men beskytter virksomheten.',
        consequence: { description: 'Kostnader +5%, omdomme +2', demandModifier: 1.0, costModifier: 1.05, reputationModifier: 2, duration: 2 },
      },
      {
        id: 'tech_002_b',
        label: 'Kommuniser trygghet til kundene',
        description: 'Forsikre kundene om at deres data er trygge.',
        consequence: { description: 'Omdommeboost hvis troverdig', demandModifier: 0.95, costModifier: 1.0, reputationModifier: 1, duration: 2 },
      },
      {
        id: 'tech_002_c',
        label: 'Gjor ingenting',
        description: 'Hap det ikke skjer med deg.',
        consequence: { description: 'Risikerer omdommeskade', demandModifier: 0.9, costModifier: 1.0, reputationModifier: -3, duration: 3 },
      },
    ],
  },
  {
    id: 'soc_003',
    title: 'Konkurrent apner i nabolaget',
    description: 'En ny konkurrent har apnet butikk i naerheten. De tilbyr lignende produkter til lavere priser.',
    category: 'social',
    severity: 'medium',
    choices: [
      {
        id: 'soc_003_a',
        label: 'Match konkurrentens priser',
        description: 'Reduser prisene for a beholde kunder.',
        consequence: { description: 'Ettersporselen holdes, margin synker', demandModifier: 1.0, costModifier: 1.0, reputationModifier: 0, duration: 3 },
      },
      {
        id: 'soc_003_b',
        label: 'Differensier med kvalitet og service',
        description: 'Fokuser pa det som gjor deg unik.',
        consequence: { description: 'Ettersporselen -10%, men hoyere kundelojalitet', demandModifier: 0.9, costModifier: 1.03, reputationModifier: 3, duration: 4 },
      },
      {
        id: 'soc_003_c',
        label: 'Ok markedsforingsinnsatsen',
        description: 'Bruk mer pa markedsforing for a sta ut.',
        consequence: { description: 'Ettersporselen +5%, kostnader +8%', demandModifier: 1.05, costModifier: 1.08, reputationModifier: 1, duration: 2 },
      },
    ],
  },
  {
    id: 'eco_003',
    title: 'Sesongrabatter hos leverandorer',
    description: 'Leverandorene tilbyr midlertidige rabatter pa storordre. En mulighet til a fylle opp lageret billig.',
    category: 'economic',
    severity: 'low',
    choices: [
      {
        id: 'eco_003_a',
        label: 'Kjop stort inn',
        description: 'Fyll opp lageret mens det er billig.',
        consequence: { description: 'Varekostnad -10% denne perioden', demandModifier: 1.0, costModifier: 0.9, reputationModifier: 0, duration: 1 },
      },
      {
        id: 'eco_003_b',
        label: 'Kjop normalt',
        description: 'Beholder normal innkjopsstrategi.',
        consequence: { description: 'Ingen endring', demandModifier: 1.0, costModifier: 1.0, reputationModifier: 0, duration: 1 },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Event rolling
// ---------------------------------------------------------------------------

/**
 * Roll for a random PEST event. 30% chance each month.
 * Filters out events already used (by ID) and optionally by industry.
 *
 * @param month      Current simulation month (1-12)
 * @param industry   Player's selected industry (for filtering)
 * @param usedIds    Set of event IDs already triggered this game
 * @param eventBank  Optional external event bank (from events.json)
 * @returns          A PESTEvent or null if no event fires
 */
export function rollForEvent(
  month: number,
  _industry: string,
  usedIds: Set<string>,
  eventBank?: PESTEvent[],
): PESTEvent | null {
  // 30% chance of an event
  if (Math.random() > 0.3) return null;

  const bank = eventBank ?? BUILTIN_EVENTS;

  // Filter: remove already-used events, respect month constraints
  const available = bank.filter((e) => {
    if (usedIds.has(e.id)) return false;
    if (e.month !== undefined && e.month !== month) return false;
    return true;
  });

  if (available.length === 0) return null;

  // Pick a random event
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

/**
 * Get all events that haven't been used yet, optionally filtered by industry.
 */
export function getAvailableEvents(
  _industry: string,
  usedIds: Set<string>,
  eventBank?: PESTEvent[],
): PESTEvent[] {
  const bank = eventBank ?? BUILTIN_EVENTS;
  return bank.filter((e) => !usedIds.has(e.id));
}

// ---------------------------------------------------------------------------
// Event consequence application
// ---------------------------------------------------------------------------

/**
 * Active event effect that persists for a number of months.
 */
export interface ActiveEventEffect {
  eventId: string;
  demandModifier: number;
  costModifier: number;
  reputationChange: number;
  remainingMonths: number;
}

/**
 * Apply a player's choice for a PEST event.
 * Returns the state modifiers that should be applied.
 *
 * The caller is responsible for:
 * 1. Storing the ActiveEventEffect in game state
 * 2. Applying demandModifier/costModifier during simulation
 * 3. Adjusting reputation
 * 4. Decrementing remainingMonths each simulated month
 */
export function applyEventConsequence(
  event: PESTEvent,
  choiceIndex: number,
): ActiveEventEffect {
  const choice = event.choices[choiceIndex];
  if (!choice) {
    // Invalid choice — return neutral effect
    return {
      eventId: event.id,
      demandModifier: 1.0,
      costModifier: 1.0,
      reputationChange: 0,
      remainingMonths: 0,
    };
  }

  return {
    eventId: event.id,
    demandModifier: choice.consequence.demandModifier,
    costModifier: choice.consequence.costModifier,
    reputationChange: choice.consequence.reputationModifier,
    remainingMonths: choice.consequence.duration,
  };
}

/**
 * Calculate the combined demand modifier from all active event effects.
 */
export function getCombinedDemandModifier(effects: ActiveEventEffect[]): number {
  return effects.reduce((acc, e) => acc * e.demandModifier, 1.0);
}

/**
 * Calculate the combined cost modifier from all active event effects.
 */
export function getCombinedCostModifier(effects: ActiveEventEffect[]): number {
  return effects.reduce((acc, e) => acc * e.costModifier, 1.0);
}

/**
 * Tick all active effects forward by one month, removing expired ones.
 */
export function tickEventEffects(effects: ActiveEventEffect[]): ActiveEventEffect[] {
  return effects
    .map((e) => ({ ...e, remainingMonths: e.remainingMonths - 1 }))
    .filter((e) => e.remainingMonths > 0);
}

/**
 * Access the built-in event bank (for when events.json hasn't been loaded).
 */
export function getBuiltinEvents(): PESTEvent[] {
  return BUILTIN_EVENTS;
}
