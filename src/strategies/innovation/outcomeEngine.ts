// ── Innovation Strategy: Outcome Engine ───────────────────────────────────────

import type { InnovationFlags, OutcomeId } from './types'

export interface OutcomeResult {
  id: OutcomeId
  title: string
  subtitle: string
  description: string
  badge: string
  nettoVerdi: number           // Hva eleven sitter igjen med etter investor
  kompetansemaal: string[]
  refleksjon: string[]         // Spørsmål for klassediskusjon
}

const OUTCOMES: Record<OutcomeId, (flags: InnovationFlags) => OutcomeResult> = {
  EXIT_BIG: (flags) => {
    const investorCut = flags.exitValue * (flags.investorOwnership / 100)
    const netto = flags.exitValue - investorCut
    return {
      id: 'EXIT_BIG',
      title: 'Storslått exit! 🚀',
      subtitle: 'Solgt til konsern',
      description: `Visma kjøpte selskapet for ${flags.exitValue.toLocaleString('nb-NO')} kr. Etter at investor tok sin ${flags.investorOwnership}% sitter du igjen med ${netto.toLocaleString('nb-NO')} kr.`,
      badge: '💎 Unicorn-drøm',
      nettoVerdi: netto,
      kompetansemaal: ['ENT2 — exit-strategi', 'ENT2 — M&A og verdsettelse', 'ENT2 — forhandling'],
      refleksjon: [
        'Hva ville du gjort annerledes hvis du visste at selskapet ble solgt for 8 millioner?',
        'Var det riktig å ta inn investor? Hva kostet det deg i eierskap?',
        'Hva skjer med de ansatte når et selskap blir kjøpt av et konsern?',
      ],
    }
  },

  LIFESTYLE: (flags) => ({
    id: 'LIFESTYLE',
    title: 'Livsstilsbedrift 🌿',
    subtitle: 'Lønnsom og selvstendig',
    description: `Du valgte friheten. Bedriften er lønnsom med ${flags.monthlyRevenue.toLocaleString('nb-NO')} kr/mnd og du eier 100%. Ingen investor, ingen press.`,
    badge: '🎯 Bootstrapper',
    nettoVerdi: flags.capital,
    kompetansemaal: ['ENT2 — bootstrapping', 'ENT2 — lønnsomhet vs vekst'],
    refleksjon: [
      'Hva er forskjellen på en livsstilsbedrift og en vekstbedrift?',
      'Ville du valgt annerledes hvis du hadde tatt inn investor?',
      'Hva er fordelen med å eie 100% av noe lite fremfor 50% av noe stort?',
    ],
  }),

  BANKRUPTCY: (_flags) => ({
    id: 'BANKRUPTCY',
    title: 'Konkurs 💸',
    subtitle: 'Penger er slutt',
    description: 'Kapitalen gikk tom. Bedriften måtte avvikles. Dette skjer med mange gründere — det viktige er å lære av det.',
    badge: '📚 Lært mye',
    nettoVerdi: 0,
    kompetansemaal: ['ENT1 — risikostyring', 'Forretningsdrift — burn rate og runway'],
    refleksjon: [
      'Hvilken beslutning tror du var den som ledet mot konkurs?',
      'Hva er burn rate og runway, og hvorfor er de viktige å følge?',
      'Hva er forskjellen på å feile og å lære av å feile?',
    ],
  }),

  SCALING: (flags) => ({
    id: 'SCALING',
    title: 'I vekst! 📈',
    subtitle: 'Selskapet skalerer',
    description: `Med investor inne og ${flags.monthlyUsers.toLocaleString('nb-NO')} brukere er selskapet i full vekst. Fremtiden ser lys ut.`,
    badge: '🚀 Vekstraketten',
    nettoVerdi: flags.capital + flags.monthlyRevenue * 12,
    kompetansemaal: ['ENT2 — vekstfaser', 'ENT2 — finansiering', 'ENT2 — skalering'],
    refleksjon: [
      'Hva kjennetegner en bedrift i skalerings-fasen?',
      'Hvilke nye utfordringer oppstår når man vokser raskt?',
      'Hva betyr det å gi fra seg eierskap for å vokse raskere?',
    ],
  }),

  // Resterende sluttilstander (stub — implementeres i Fase 2)
  EXIT_SMALL: (flags) => ({
    id: 'EXIT_SMALL',
    title: 'Solgt',
    subtitle: 'Moderat exit',
    description: 'Selskapet ble solgt for en moderat sum.',
    badge: '💼 Exit',
    nettoVerdi: flags.exitValue * (1 - flags.investorOwnership / 100),
    kompetansemaal: ['ENT2 — exit-strategi'],
    refleksjon: ['Hva avgjorde prisen selskapet ble solgt for?'],
  }),

  INTERNATIONAL: (flags) => ({
    id: 'INTERNATIONAL',
    title: 'Internasjonal 🌍',
    subtitle: 'Ekspandert til Sverige',
    description: 'Bedriften opererer nå i to markeder.',
    badge: '🌐 Global',
    nettoVerdi: flags.capital,
    kompetansemaal: ['ENT2 — internasjonalisering'],
    refleksjon: ['Hva er utfordringene med å ekspandere til et nytt marked?'],
  }),

  MERGER: (_flags) => ({
    id: 'MERGER',
    title: 'Fusjon 🤝',
    subtitle: 'Slått sammen med konkurrent',
    description: 'Du og Mittanbud er nå ett selskap.',
    badge: '🏢 Co-CEO',
    nettoVerdi: 0,
    kompetansemaal: ['ENT2 — M&A', 'ENT2 — strategiske partnerskap'],
    refleksjon: ['Hva er utfordringen med å fusjonere to konkurrerende bedrifter?'],
  }),

  COOPERATIVE: (_flags) => ({
    id: 'COOPERATIVE',
    title: 'Samvirke 🤲',
    subtitle: 'Solgt til ansatte',
    description: 'De ansatte eier nå selskapet. En varig arv.',
    badge: '🌱 Demokratisk eierskap',
    nettoVerdi: 0,
    kompetansemaal: ['ENT2 — eierformer', 'ENT2 — samvirker'],
    refleksjon: ['Hva er et samvirke og hvordan skiller det seg fra AS?'],
  }),

  PIVOT_SUCCESS: (flags) => ({
    id: 'PIVOT_SUCCESS',
    title: 'Pivot-suksess 🔄',
    subtitle: 'Lyktes etter å ha snudd',
    description: `Du pivoterte ${flags.pivotCount} gang(er) og fant til slutt en lønnsom modell.`,
    badge: '🔄 Resilient',
    nettoVerdi: flags.capital,
    kompetansemaal: ['ENT1 — idévalidering', 'ENT2 — pivot-strategi'],
    refleksjon: ['Hva er et pivot og når er det riktig tidspunkt å pivotere?'],
  }),

  BURNOUT_QUIT: (_flags) => ({
    id: 'BURNOUT_QUIT',
    title: 'Utbrent 😔',
    subtitle: 'Sluttet på grunn av utbrenthet',
    description: 'Du ga alt, men kroppen sa stopp. Mange gründere opplever dette.',
    badge: '💛 Ta vare på deg selv',
    nettoVerdi: 0,
    kompetansemaal: ['ML2 — selvledelse', 'ENT — gründerens helse'],
    refleksjon: [
      'Hva er tegn på utbrenthet og hvordan kan du forebygge det?',
      'Hva er forskjellen på hardt arbeid og selvdestruktiv arbeidskultur?',
    ],
  }),
}

/**
 * Evaluerer sluttilstand basert på flagg ved slutten av spillet (mnd 12).
 */
export function evaluateOutcome(flags: InnovationFlags): OutcomeResult {
  // Allerede satt (f.eks. via BANKRUPTCY eller EXIT_BIG i event)
  if (flags.outcome && OUTCOMES[flags.outcome]) {
    return OUTCOMES[flags.outcome](flags)
  }

  // Konkurs: kapital under 0 i mer enn 3 mnd (forenklet: capital < 0)
  if (flags.capital < 0) {
    return OUTCOMES.BANKRUPTCY(flags)
  }

  // EXIT_BIG: E023 akseptert
  if (flags.exitValue >= 8_000_000) {
    return OUTCOMES.EXIT_BIG(flags)
  }

  // EXIT_SMALL: Solgt for lavere sum
  if (flags.exitValue > 0 && flags.exitValue < 8_000_000) {
    return OUTCOMES.EXIT_SMALL(flags)
  }

  // BURNOUT_QUIT
  if (flags.burnout_risk === 'high') {
    return OUTCOMES.BURNOUT_QUIT(flags)
  }

  // INTERNATIONAL
  if (flags.hasInternational) {
    return OUTCOMES.INTERNATIONAL(flags)
  }

  // SCALING: Investor inne, ikke solgt
  if (flags.hasInvestor && flags.monthlyRevenue > 10_000) {
    return OUTCOMES.SCALING(flags)
  }

  // PIVOT_SUCCESS
  if (flags.pivotCount >= 1 && flags.monthlyRevenue > 0 && flags.capital > 0) {
    return OUTCOMES.PIVOT_SUCCESS(flags)
  }

  // LIFESTYLE: Avslo investor, profitabel
  if (!flags.hasInvestor && flags.monthlyRevenue > flags.burnRate) {
    return OUTCOMES.LIFESTYLE(flags)
  }

  // Fallback: SCALING
  return OUTCOMES.SCALING(flags)
}
