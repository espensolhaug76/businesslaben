export interface PricingExercise {
  id: string
  product: string
  icon: string
  costPrice: number
  targetMarginPercent: number
  correctSellingPriceExclVAT: number
  correctSellingPriceInclVAT: number
  correctMargin: number
  explanation: string
  context: string
  espenTip: string
}

export const PRICING_EXERCISES: PricingExercise[] = [
  {
    id: 'grandiosa',
    product: 'Grandiosa Original (pizza)',
    icon: '🍕',
    costPrice: 12.00,
    targetMarginPercent: 40,
    correctSellingPriceExclVAT: 20.00,
    correctSellingPriceInclVAT: 25.00,
    correctMargin: 8.00,
    explanation: 'Innkjøpspris: 12 kr. For 40% dekningsgrad: Utsalgspris eks. MVA = Innkjøpspris / (1 - 0.40) = 12 / 0.60 = 20 kr. Med 25% MVA: 20 × 1.25 = 25 kr.',
    context: 'Rema 1000 ønsker å selge Grandiosa med 40% dekningsgrad. Innkjøpsprisen fra leverandøren er 12 kr eks. MVA.',
    espenTip: '⚠️ Husk: Dekningsgrad% = DB / Utsalgspris eks. MVA × 100. IKKE påslag på innkjøpspris!',
  },
  {
    id: 'coffee',
    product: 'Kaffe Latte (kaffekopp)',
    icon: '☕',
    costPrice: 8.50,
    targetMarginPercent: 65,
    correctSellingPriceExclVAT: 24.29,
    correctSellingPriceInclVAT: 30.36,
    correctMargin: 15.79,
    explanation: 'Råvarer koster 8,50 kr. For 65% dekningsgrad: Pris eks. MVA = 8,50 / (1 - 0,65) = 8,50 / 0,35 ≈ 24,29 kr. Med MVA: 24,29 × 1,25 ≈ 30,36 kr.',
    context: 'En kafé i Bergen kalkulerer prisen på en latte. Ingredienser og engangskopp koster 8,50 kr. De vil ha 65% dekningsgrad.',
    espenTip: '⚠️ Kafeer har høy dekningsgrad% men lavt volum. 65% er typisk for drikkevarer!',
  },
  {
    id: 'bread',
    product: 'Bakers grovbrød',
    icon: '🍞',
    costPrice: 15.00,
    targetMarginPercent: 30,
    correctSellingPriceExclVAT: 21.43,
    correctSellingPriceInclVAT: 26.79,
    correctMargin: 6.43,
    explanation: 'Brødet koster 15 kr i innkjøp. For 30% dekningsgrad: 15 / (1 - 0,30) = 15 / 0,70 ≈ 21,43 kr eks. MVA. Med MVA: 21,43 × 1,25 ≈ 26,79 kr.',
    context: 'En KIWI-butikk bestiller brød fra et lokalt bakeri til 15 kr/stk eks. MVA. De ønsker 30% dekningsgrad.',
    espenTip: '⚠️ Brød har lav dekningsgrad% fordi det er en basisvare. Høyt volum kompenserer!',
  },
  {
    id: 'tshirt',
    product: 'Zara T-skjorte',
    icon: '👕',
    costPrice: 80.00,
    targetMarginPercent: 55,
    correctSellingPriceExclVAT: 177.78,
    correctSellingPriceInclVAT: 222.22,
    correctMargin: 97.78,
    explanation: 'Import av T-skjorte: 80 kr. For 55% dekningsgrad: 80 / (1 - 0,55) = 80 / 0,45 ≈ 177,78 kr eks. MVA. Med MVA: 177,78 × 1,25 ≈ 222,22 kr.',
    context: 'Zara importerer en basis T-skjorte for 80 kr eks. MVA. Standard dekningsgrad for basisplagg i motebransjen er 55%.',
    espenTip: '⚠️ Moteartikler har høy dekningsgrad for å dekke usolgde varer fra forrige sesong. Smart prissetting!',
  },
  {
    id: 'soda',
    product: 'Coca-Cola 0,5L flaske',
    icon: '🥤',
    costPrice: 6.00,
    targetMarginPercent: 45,
    correctSellingPriceExclVAT: 10.91,
    correctSellingPriceInclVAT: 13.64,
    correctMargin: 4.91,
    explanation: 'Coca-Cola koster 6 kr i innkjøp. For 45% dekningsgrad: 6 / (1 - 0,45) = 6 / 0,55 ≈ 10,91 kr eks. MVA. Med 25% MVA: 10,91 × 1,25 ≈ 13,64 kr.',
    context: 'En kiosk på Oslo Lufthavn kjøper 0,5L Coca-Cola for 6 kr eks. MVA. De ønsker 45% dekningsgrad pga. høy husleie.',
    espenTip: '⚠️ Høy husleie = høyere priser! Flyplasser og togstasjoner tar mer fordi kundene ikke har alternativer.',
  },
]
