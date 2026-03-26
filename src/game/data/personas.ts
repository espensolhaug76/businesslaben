// ─── AdVenture 3.0 — Persona Generator ────────────────────────────────────

// ─── Name pools ──────────────────────────────────────────────────────────────

const FEMALE_FIRST = ['Emma','Nora','Olivia','Sofia','Ingrid','Thea','Maja','Ella','Amalie','Sara','Frida','Leah','Emilie','Ida','Mia','Julie','Selma','Astrid','Hedda','Vilde']
const MALE_FIRST   = ['Jakob','Emil','Noah','Oliver','Filip','William','Lucas','Henrik','Oskar','Magnus','Aksel','Theodor','Elias','Isak','Kasper','Jonas','Sander','Adrian','Mathias','Erik']
const LAST_NAMES   = ['Hansen','Johansen','Olsen','Larsen','Andersen','Pedersen','Nilsen','Christensen','Pettersen','Eriksen','Berg','Haugen','Strand','Bakke','Lie','Dahl','Holm','Moen','Lund','Berge']

// ─── Deterministic seed ───────────────────────────────────────────────────────

function seedFrom(selections: string[]): number {
  const str = selections.join('|')
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash * 31) + str.charCodeAt(i)) & 0xfffffff
  }
  return Math.abs(hash) || 1
}

function pick<T>(arr: T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length]
}

// ─── Age ─────────────────────────────────────────────────────────────────────

const AGE_RANGES: Record<string, [number, number]> = {
  '15-20': [16, 19],
  '21-30': [23, 28],
  '31-45': [33, 42],
  '46-60': [48, 57],
  '60+':   [62, 70],
}

function ageFromGroup(group: string, seed: number): number {
  const [min, max] = AGE_RANGES[group] ?? [25, 35]
  return min + (seed % (max - min + 1))
}

// ─── Location ────────────────────────────────────────────────────────────────

const LOCATIONS_LOCAL    = ['Kongsvinger','Gjøvik','Hamar','Lillehammer','Elverum','Sarpsborg','Moss','Halden']
const LOCATIONS_REGIONAL = ['Oslo','Bergen','Trondheim','Stavanger','Tromsø','Drammen','Kristiansand','Fredrikstad']

function locationFromGeo(geo: string | null, seed: number): string {
  if (geo === 'Nasjonalt') return 'Hele Norge'
  if (geo === 'Regionalt') return pick(LOCATIONS_REGIONAL, seed, 2)
  return pick(LOCATIONS_LOCAL, seed, 1)
}

// ─── Occupation ──────────────────────────────────────────────────────────────

type OccMap = Record<string, Record<string, string[]>>

const OCC: OccMap = {
  '15-20': {
    default: ['Elev på videregående','Lærling','Deltidsjobb på kafé','Studerer til fagbrev'],
  },
  '21-30': {
    'Karriereorienterte': ['Trainee i konsulentfirma','Nyutdannet ingeniør','Junior utvikler','Markedskoordinator'],
    'Trendsettere':       ['Influencer','Frilanser','Bartender og DJ','Grafisk designer'],
    'Miljøbevisste':      ['Jobber i NGO','Miljørådgiver','Sykkelbud','Kommunikasjonsrådgiver'],
    'Prisbevisste':       ['Student','Butikkmedarbeider','Jobber deltid','Nyetablert'],
    'Helsebevisste':      ['PT-student','Frilanser innen helse','Ernæringsrådgiver','Aktivitørfaglærer'],
    'Familieorienterte':  ['Nyutdannet lærer','Vernepleier','Barnehageansatt','Kommuneansatt'],
    default:              ['Trainee','Kundekonsulent','Administrativ medarbeider','Butikkmedarbeider'],
  },
  '31-45': {
    'Karriereorienterte': ['Prosjektleder','Avdelingsleder','Selvstendig konsulent','IT-sjef'],
    'Familieorienterte':  ['Lærer','Sykepleier','Småbarnsmor/-far','Kommuneansatt'],
    'Helsebevisste':      ['Personlig trener','Fysioterapeut','Helsefagarbeider','Yogainstruktør'],
    'Miljøbevisste':      ['Miljørådgiver','Arkitekt','Biolog','Bærekraftsleder'],
    'Trendsettere':       ['Kreativ direktør','Art director','Moteblogger','Brand manager'],
    'Prisbevisste':       ['Fagarbeider','Industriarbeider','Kommuneansatt','Logistikkmedarbeider'],
    default:              ['Prosjektleder','Kontorarbeider','Mellomleder','Servicemedarbeider'],
  },
  '46-60': {
    'Karriereorienterte': ['Direktør','Partner i advokatfirma','Daglig leder','Seniorrådgiver'],
    'Prisbevisste':       ['Bussjåfør','Fagarbeider','Kommuneansatt','Logistikkmedarbeider'],
    default:              ['Avdelingsleder','Selvstendig næringsdrivende','Prosjektleder','Helsepersonell'],
  },
  '60+': {
    default: ['Pensjonist','Frivillig i Røde Kors','Aktiv bestemor/bestefar','Deltidsjobb i butikk'],
  },
}

function occupationFrom(ageGroup: string, psycho: string, seed: number): string {
  const group = OCC[ageGroup] ?? OCC['21-30']!
  const pool  = (group[psycho] ?? group['default'])!
  return pick(pool, seed, 3)
}

// ─── Monthly budget ──────────────────────────────────────────────────────────

type BudgetMap = Record<string, Record<string, [number, number]>>

const BUDGETS: BudgetMap = {
  '15-20': { default: [500, 2000] },
  '21-30': {
    'Prisbevisste':       [1000, 3000],
    'Karriereorienterte': [3000, 6000],
    'Trendsettere':       [3000, 6000],
    default:              [2000, 4000],
  },
  '31-45': {
    'Prisbevisste':       [2000, 4000],
    'Karriereorienterte': [5000, 10000],
    default:              [3000, 6000],
  },
  '46-60': { default: [3000, 8000] },
  '60+':   { default: [1500, 4000] },
}

function budgetFrom(ageGroup: string, psycho: string, seed: number): number {
  const group         = BUDGETS[ageGroup] ?? BUDGETS['21-30']!
  const [min, max]    = (group[psycho] ?? group['default'])!
  const steps         = Math.floor((max - min) / 500)
  return min + (seed % (steps + 1)) * 500
}

// ─── Interests ───────────────────────────────────────────────────────────────

const INTEREST_POOLS: Record<string, string[]> = {
  'Miljøbevisste':      ['Gjenbruk','Økologisk mat','Naturturer','Bærekraftig mote','Klimaaktivisme'],
  'Karriereorienterte': ['Nettverk','Podcaster','Reise','Fine dining','Investering'],
  'Trendsettere':       ['Instagram','Sneakers','Streetwear','Festivaler','TikTok'],
  'Prisbevisste':       ['Finn.no','Kupp','DIY','Matlaging hjemme','Gratisaktiviteter'],
  'Helsebevisste':      ['Yoga','Løping','Smoothies','CrossFit','Mental helse'],
  'Familieorienterte':  ['Familieturer','Baking','Lekeplasser','Barneaktiviteter','Hagearbeid'],
}

// ─── Social media ────────────────────────────────────────────────────────────

const SOCIAL_MEDIA: Record<string, string[]> = {
  '15-20': ['TikTok (daglig)','Instagram (daglig)','Snapchat (daglig)','YouTube (daglig)'],
  '21-30': ['Instagram (daglig)','TikTok (ofte)','LinkedIn (ukentlig)','YouTube (daglig)'],
  '31-45': ['Facebook (daglig)','Instagram (ukentlig)','LinkedIn (ukentlig)','YouTube (av og til)'],
  '46-60': ['Facebook (daglig)','YouTube (ukentlig)','Nettaviser (daglig)'],
  '60+':   ['Facebook (av og til)','Nettaviser (daglig)','E-post (daglig)'],
}

// ─── Bio templates ───────────────────────────────────────────────────────────

const TRAIT_DESC: Record<string, string> = {
  'Miljøbevisste':      'er opptatt av bærekraft og velger gjerne miljøvennlige alternativer',
  'Karriereorienterte': 'er ambisiøs og villig til å betale for kvalitet som sparer tid',
  'Trendsettere':       'følger med på trender og vil gjerne være først ute med det nyeste',
  'Prisbevisste':       'sammenligner alltid priser og ser etter gode tilbud',
  'Helsebevisste':      'prioriterer helse og velvære og investerer i en aktiv livsstil',
  'Familieorienterte':  'tenker alltid på familien først og handler praktisk og trygt',
}

const SHOP_DESC: Record<string, string> = {
  'Miljøbevisste':      'handler helst i butikker med tydelig miljøprofil',
  'Karriereorienterte': 'foretrekker netthandel for effektivitet, men verdsetter premium-opplevelser',
  'Trendsettere':       'oppdager nye merker via Instagram og TikTok',
  'Prisbevisste':       'bruker prisjakt.no og venter gjerne på salg',
  'Helsebevisste':      'leser alltid produktinformasjonen og velger kvalitet',
  'Familieorienterte':  'handler ofte i helgene sammen med familien',
}

const WILLINGNESS: Record<string, string> = {
  'Miljøbevisste':      'Høy for bærekraftige produkter',
  'Karriereorienterte': 'Høy for premium og tidsbesparende produkter',
  'Trendsettere':       'Høy for nye og trendy produkter',
  'Prisbevisste':       'Lav — venter på tilbud',
  'Helsebevisste':      'Høy for helse- og kvalitetsprodukter',
  'Familieorienterte':  'Middels — tenker på verdi for hele familien',
}

export const MARKETING_CHANNEL_TIP: Record<string, string> = {
  'Miljøbevisste':      'bærekraft og miljøprofil i markedsføringen',
  'Karriereorienterte': 'LinkedIn, Google Ads og premium-vinkel',
  'Trendsettere':       'Instagram, TikTok og influencer-samarbeid',
  'Prisbevisste':       'tilbud, rabatter og prisjakt-annonser',
  'Helsebevisste':      'helse-aspekter og produktkvalitet',
  'Familieorienterte':  'trygghet, verdi og familievennlighet',
}

function industrySpecific(industry: string, pronoun: string, age: number, budget: number): string {
  const kr = budget.toLocaleString('nb-NO')
  switch (industry) {
    case 'fashion': return `${pronoun} bruker ca ${kr} kr/mnd på klær og tilbehør.`
    case 'tech':    return `${pronoun} oppgraderer gadgets ${age < 30 ? 'ofte' : 'når det trengs'} og bruker ca ${kr} kr/mnd på teknologi.`
    case 'cafe':    return `${pronoun} besøker kafeer ${age < 35 ? '3–4 ganger i uken' : '1–2 ganger i uken'} og bruker ca ${kr} kr per besøk.`
    case 'sports':  return `${pronoun} trener ${age < 40 ? '4–5' : '2–3'} ganger i uken og investerer i godt utstyr.`
    default:        return `${pronoun} bruker ca ${kr} kr/mnd på denne kategorien.`
  }
}

// ─── Match score ─────────────────────────────────────────────────────────────

export function calcPersonaMatchScore(
  products: { tier: string; sustainability: number }[],
  psychographics: string[],
): number {
  if (products.length === 0 || psychographics.length === 0) return 50
  const primary       = psychographics[0]
  const premiumCount  = products.filter(p => p.tier === 'premium').length
  const budgetCount   = products.filter(p => p.tier === 'budget').length
  const premiumRatio  = premiumCount / products.length
  const budgetRatio   = budgetCount  / products.length
  const avgSustain    = products.reduce((s, p) => s + p.sustainability, 0) / products.length

  let score = 55  // base
  switch (primary) {
    case 'Miljøbevisste':
      score += premiumRatio * 20 + (avgSustain / 10) * 20
      break
    case 'Karriereorienterte':
      score += premiumRatio * 30 + (1 - budgetRatio) * 10
      break
    case 'Trendsettere':
      score += premiumRatio * 20
      if (budgetRatio > 0.5) score -= 20
      break
    case 'Prisbevisste':
      score += budgetRatio * 30
      if (premiumRatio > 0.5) score -= 20
      break
    case 'Helsebevisste':
      score += premiumRatio * 20 + (avgSustain / 10) * 10
      break
    case 'Familieorienterte':
      score += (1 - premiumRatio) * 10 + (1 - budgetRatio) * 10 + 10
      break
  }
  return Math.max(10, Math.min(100, Math.round(score)))
}

export function matchLabel(score: number): { text: string; color: string } {
  if (score >= 80) return { text: 'Perfekt match',  color: '#22c55e' }
  if (score >= 60) return { text: 'God match',      color: '#00d4aa' }
  if (score >= 40) return { text: 'Middels match',  color: '#facc15' }
  return             { text: 'Dårlig match',   color: '#ef4444' }
}

export function targetMatchMultiplier(score: number): number {
  if (score >= 80) return 1.3
  if (score >= 60) return 1.1
  if (score >= 40) return 1.0
  return 0.7
}

// ─── Persona interface ────────────────────────────────────────────────────────

export interface Persona {
  name: string
  lastName: string
  fullName: string
  age: number
  gender: 'Kvinne' | 'Mann'
  pronoun: 'Hun' | 'Han'
  location: string
  occupation: string
  monthlyBudget: number
  interests: string[]
  socialMedia: string[]
  bio: string
  shoppingHabit: string
  willingness: string
  avatarColor: string
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generatePersona(
  geography: string | null,
  genders: string[],
  ageGroups: string[],
  psychographics: string[],
  industry: string,
): Persona | null {
  // Need at least one selection to generate
  if (ageGroups.length === 0 && genders.length === 0 && psychographics.length === 0) return null

  const seed = seedFrom([geography ?? '', ...ageGroups, ...genders, ...psychographics])

  // Gender
  const wantFemale = genders.includes('Kvinner')
  const wantMale   = genders.includes('Menn')
  const wantBoth   = genders.includes('Begge') || genders.length === 0
  let gender: 'Kvinne' | 'Mann'
  if (wantBoth) {
    gender = (seed % 2 === 0) ? 'Kvinne' : 'Mann'
  } else if (wantFemale && !wantMale) {
    gender = 'Kvinne'
  } else if (wantMale && !wantFemale) {
    gender = 'Mann'
  } else {
    gender = (seed % 2 === 0) ? 'Kvinne' : 'Mann'
  }
  const pronoun = gender === 'Kvinne' ? 'Hun' : 'Han'

  const firstName = gender === 'Kvinne'
    ? pick(FEMALE_FIRST, seed, 0)
    : pick(MALE_FIRST, seed, 0)
  const lastName = pick(LAST_NAMES, seed, 5)

  const ageGroup    = ageGroups.length > 0 ? pick(ageGroups, seed, 1) : '21-30'
  const age         = ageFromGroup(ageGroup, seed)
  const location    = locationFromGeo(geography, seed)
  const primaryP    = psychographics[0] ?? 'Karriereorienterte'
  const occupation  = occupationFrom(ageGroup, primaryP, seed)
  const monthlyBudget = budgetFrom(ageGroup, primaryP, seed)

  // Interests: from primary + secondary psycho, deduped
  const primary2Pool = INTEREST_POOLS[primaryP] ?? []
  const secondary2Pool = psychographics[1] ? (INTEREST_POOLS[psychographics[1]] ?? []) : []
  const interestPool = [...primary2Pool, ...secondary2Pool]
  const interests: string[] = []
  for (let i = 0; interests.length < 4 && i < 20; i++) {
    const c = pick(interestPool, seed, i * 7)
    if (!interests.includes(c)) interests.push(c)
  }

  const socialMedia = (SOCIAL_MEDIA[ageGroup] ?? SOCIAL_MEDIA['21-30']!).slice(0, 3)

  const traitText = TRAIT_DESC[primaryP] ?? 'liker å handle'
  const shopText  = SHOP_DESC[primaryP]  ?? 'handler i butikk og på nett'
  const indText   = industrySpecific(industry, pronoun, age, monthlyBudget)
  const bio       = `${firstName} ${traitText}. ${pronoun} ${shopText}. ${indText}`

  return {
    name: firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    age,
    gender,
    pronoun,
    location,
    occupation,
    monthlyBudget,
    interests,
    socialMedia,
    bio,
    shoppingHabit: shopText.charAt(0).toUpperCase() + shopText.slice(1),
    willingness: WILLINGNESS[primaryP] ?? 'Middels',
    avatarColor: gender === 'Kvinne' ? '#a855f7' : '#38bdf8',
  }
}
