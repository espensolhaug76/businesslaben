export interface BudgetLine {
  category: string
  categoryNO: string
  icon: string
  type: 'income' | 'expense'
  hint: string
}

export interface BudgetExercise {
  id: string
  businessType: string
  icon: string
  description: string
  month: string
  budgetLines: BudgetLine[]
  defaultActuals: Record<string, number>
  espenTip: string
}

export const BUDGET_LINES: BudgetLine[] = [
  { category: 'sales_revenue', categoryNO: 'Salgsinntekter', icon: '💰', type: 'income', hint: 'Total omsetning fra salg' },
  { category: 'cogs', categoryNO: 'Varekostnad', icon: '📦', type: 'expense', hint: 'Typisk 40-60% av inntekter' },
  { category: 'salary', categoryNO: 'Lønnskostnader', icon: '👥', type: 'expense', hint: 'Lønn + arbeidsgiveravgift (14,1%)' },
  { category: 'rent', categoryNO: 'Husleie', icon: '🏢', type: 'expense', hint: 'Månedlig leie av lokale' },
  { category: 'marketing', categoryNO: 'Markedsføring', icon: '📣', type: 'expense', hint: 'Annonsering og kampanjer' },
  { category: 'utilities', categoryNO: 'Strøm og drift', icon: '⚡', type: 'expense', hint: 'Strøm, internett, renhold' },
  { category: 'other', categoryNO: 'Andre kostnader', icon: '📋', type: 'expense', hint: 'Diverse driftskostnader' },
]

export const BUDGETING_EXERCISES: BudgetExercise[] = [
  {
    id: 'tesla_budget',
    businessType: 'Tesla Showroom – Januar',
    icon: '⚡',
    description: 'Lag et månedlig budsjett for et Tesla-showroom i Oslo. De selger 8-12 biler per måned til 400 000–800 000 kr hver.',
    month: 'Januar',
    budgetLines: BUDGET_LINES,
    defaultActuals: {
      sales_revenue: 5200000,
      cogs: 3900000,
      salary: 450000,
      rent: 95000,
      marketing: 85000,
      utilities: 28000,
      other: 42000,
    },
    espenTip: '⚠️ Tesla har høy omsetning men også høye kostnader! Marginene per bil er typisk 10-20%.',
  },
  {
    id: 'grocery_budget',
    businessType: 'Rema 1000 – Februar',
    icon: '🛒',
    description: 'Budsjett for en mellomstor Rema 1000. Høyt volum, lav margin. Omsetning ca. 1,25 mill kr/mnd.',
    month: 'Februar',
    budgetLines: BUDGET_LINES,
    defaultActuals: {
      sales_revenue: 1250000,
      cogs: 875000,
      salary: 180000,
      rent: 45000,
      marketing: 15000,
      utilities: 22000,
      other: 18000,
    },
    espenTip: '⚠️ Dagligvarebutikker har svake marginer (1-3%). Volum er alt! Selv små kostnadsoverskridelser gjør vondt.',
  },
  {
    id: 'cafe_budget',
    businessType: 'Kaffebrenneriet Kafé – Mars',
    icon: '☕',
    description: 'Månedlig budsjett for en spesialkafé. Høye marginer på drikke men begrenset kapasitet.',
    month: 'Mars',
    budgetLines: BUDGET_LINES,
    defaultActuals: {
      sales_revenue: 280000,
      cogs: 84000,
      salary: 95000,
      rent: 38000,
      marketing: 8000,
      utilities: 12000,
      other: 7000,
    },
    espenTip: '⚠️ Kaféer har høy varekostnad% men sterk margin per kopp. Lønnskostnader er ofte største kostnadspost!',
  },
  {
    id: 'hotel_budget',
    businessType: 'Thon Hotel – April',
    icon: '🏨',
    description: 'Budsjett for et 50-roms hotell i Bergen i vårsesongen. Gjennomsnittlig belegg 70%, pris 1 200 kr/natt.',
    month: 'April',
    budgetLines: BUDGET_LINES,
    defaultActuals: {
      sales_revenue: 1260000,
      cogs: 252000,
      salary: 380000,
      rent: 120000,
      marketing: 45000,
      utilities: 65000,
      other: 55000,
    },
    espenTip: '⚠️ Hoteller har høye faste kostnader. Tomme rom koster penger! Beleggsprosenten er avgjørende.',
  },
  {
    id: 'fashion_budget',
    businessType: 'Zara Norway – Mai',
    icon: '👗',
    description: 'Månedlig budsjett for en Zara-butikk i kjøpesenter. Sterk vårsamling, forvent høyt salg.',
    month: 'Mai',
    budgetLines: BUDGET_LINES,
    defaultActuals: {
      sales_revenue: 850000,
      cogs: 382500,
      salary: 165000,
      rent: 85000,
      marketing: 35000,
      utilities: 18000,
      other: 22000,
    },
    espenTip: '⚠️ Mote har sesongsvingninger. Mai er sterk – budsjetter konservativt og bli positivt overrasket!',
  },
]
