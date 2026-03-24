import type { Scenario, Distribution, GameEvent } from './types'

// ─── 4 Scenarios ─────────────────────────────────────────────────────────────

export const SCENARIOS: Scenario[] = [
  {
    id: 'cafe',
    name: 'Kafé & Bakeri',
    emoji: '☕',
    description: 'Start din egen kafé og bakeri. Selg kaffe, bakst og lunsj til sultne kunder.',
    category: 'Mat & Drikke',
    startingCash: 150_000,
    monthlyRent: 18_000,
    products: [
      { id: 'coffee', name: 'Kaffe (kopp)', emoji: '☕', baseCost: 8, suggestedPrice: 39, maxMonthlyDemand: 600, quality: 8, description: 'Friskbrygget kaffe av høy kvalitet' },
      { id: 'latte', name: 'Latte / Cappuccino', emoji: '🥛', baseCost: 12, suggestedPrice: 52, maxMonthlyDemand: 400, quality: 9, description: 'Melkebaserte kaffedrikker' },
      { id: 'croissant', name: 'Croissant', emoji: '🥐', baseCost: 18, suggestedPrice: 42, maxMonthlyDemand: 350, quality: 7, description: 'Smørbakte croissanter' },
      { id: 'sandwich', name: 'Smørbrød / Sandwich', emoji: '🥪', baseCost: 35, suggestedPrice: 89, maxMonthlyDemand: 250, quality: 8, description: 'Ferske sandwich og smørbrød' },
      { id: 'cake', name: 'Kake & Bakverk', emoji: '🍰', baseCost: 22, suggestedPrice: 58, maxMonthlyDemand: 200, quality: 9, description: 'Hjemmelaget kake og bakverk' },
      { id: 'juice', name: 'Juice & Smoothie', emoji: '🥤', baseCost: 15, suggestedPrice: 58, maxMonthlyDemand: 180, quality: 8, description: 'Fersk juice og smoothies' },
    ],
  },
  {
    id: 'clothing',
    name: 'Klesbutikk',
    emoji: '👗',
    description: 'Åpne en trendy klesbutikk. Velg produkter, sett priser og tiltrekk motebevisste kunder.',
    category: 'Klær & Mote',
    startingCash: 250_000,
    monthlyRent: 22_000,
    products: [
      { id: 'tshirt', name: 'T-skjorter', emoji: '👕', baseCost: 120, suggestedPrice: 349, maxMonthlyDemand: 150, quality: 7, description: 'Trendy t-skjorter for alle aldre' },
      { id: 'jeans', name: 'Jeans', emoji: '👖', baseCost: 280, suggestedPrice: 699, maxMonthlyDemand: 80, quality: 8, description: 'Klassiske og moderne jeans' },
      { id: 'jacket', name: 'Jakker', emoji: '🧥', baseCost: 650, suggestedPrice: 1499, maxMonthlyDemand: 50, quality: 9, description: 'Vinterjakker og lettjakker' },
      { id: 'dress', name: 'Kjoler', emoji: '👗', baseCost: 320, suggestedPrice: 799, maxMonthlyDemand: 60, quality: 8, description: 'Festkjoler og hverdagskjoler' },
      { id: 'shoes', name: 'Sko', emoji: '👟', baseCost: 450, suggestedPrice: 999, maxMonthlyDemand: 70, quality: 8, description: 'Sneakers, støvler og sandaler' },
      { id: 'accessories', name: 'Accessories', emoji: '👜', baseCost: 85, suggestedPrice: 249, maxMonthlyDemand: 120, quality: 7, description: 'Vesker, smykker og luer' },
    ],
  },
  {
    id: 'tech',
    name: 'Tech & Gadgets',
    emoji: '💻',
    description: 'Selg elektronikk og teknologiprodukter. Høye marginer, men krevende kunder.',
    category: 'Teknologi',
    startingCash: 300_000,
    monthlyRent: 25_000,
    products: [
      { id: 'earbuds', name: 'Trådløse ørepropper', emoji: '🎧', baseCost: 380, suggestedPrice: 999, maxMonthlyDemand: 90, quality: 8, description: 'Støyreduserende trådløse ørepropper' },
      { id: 'charger', name: 'Hurtiglader / Kabel', emoji: '🔌', baseCost: 90, suggestedPrice: 299, maxMonthlyDemand: 200, quality: 7, description: 'USB-C og Lightning-kabler og ladere' },
      { id: 'smartwatch', name: 'Smartklokke', emoji: '⌚', baseCost: 850, suggestedPrice: 2299, maxMonthlyDemand: 35, quality: 9, description: 'Fitnesssporing og smartfunksjoner' },
      { id: 'phone_case', name: 'Mobiltilbehør', emoji: '📱', baseCost: 55, suggestedPrice: 199, maxMonthlyDemand: 250, quality: 6, description: 'Deksel, beskyttelseglass, etc.' },
      { id: 'speaker', name: 'Bluetooth-høyttaler', emoji: '🔊', baseCost: 420, suggestedPrice: 999, maxMonthlyDemand: 60, quality: 8, description: 'Bærbare høyttalere til alle anledninger' },
      { id: 'powerbank', name: 'Powerbank', emoji: '🔋', baseCost: 180, suggestedPrice: 499, maxMonthlyDemand: 110, quality: 7, description: 'Bærbare batteripakker' },
    ],
  },
  {
    id: 'sport',
    name: 'Sportsbutikk',
    emoji: '⚽',
    description: 'Selg sportsutstyr og treningsprodukter. Hjelp kundene med å nå sine treningsmål.',
    category: 'Sport & Friluft',
    startingCash: 220_000,
    monthlyRent: 20_000,
    products: [
      { id: 'running_shoes', name: 'Løpesko', emoji: '👟', baseCost: 550, suggestedPrice: 1299, maxMonthlyDemand: 65, quality: 9, description: 'Profesjonelle løpesko for alle nivåer' },
      { id: 'gym_clothes', name: 'Treningsklær', emoji: '🩱', baseCost: 180, suggestedPrice: 499, maxMonthlyDemand: 100, quality: 7, description: 'Funksjonelle treningsbukser og topper' },
      { id: 'yoga_mat', name: 'Treningsutstyr (Matte etc.)', emoji: '🧘', baseCost: 120, suggestedPrice: 349, maxMonthlyDemand: 80, quality: 7, description: 'Yogamatten, strikk og vekter' },
      { id: 'protein', name: 'Proteinpulver', emoji: '💪', baseCost: 220, suggestedPrice: 499, maxMonthlyDemand: 120, quality: 8, description: 'Proteinpulver og kosttilskudd' },
      { id: 'water_bottle', name: 'Drikkeflaske', emoji: '🫗', baseCost: 75, suggestedPrice: 249, maxMonthlyDemand: 160, quality: 7, description: 'Isolerte drikkebeholdere i rustfritt stål' },
      { id: 'bicycle', name: 'Sykkeltilbehør', emoji: '🚴', baseCost: 180, suggestedPrice: 449, maxMonthlyDemand: 70, quality: 8, description: 'Hjelm, lys, lås og pumpe' },
    ],
  },
]

// ─── Distribution channels ────────────────────────────────────────────────────

export const DISTRIBUTION_OPTIONS: Distribution[] = [
  {
    channel: 'physicalStore',
    name: 'Fysisk butikk',
    emoji: '🏪',
    description: 'Åpningstider, personlig service. God for impulskjøp.',
    monthlyCost: 0,  // included in rent
    reachMultiplier: 1.0,
    marginImpact: 1.0,
  },
  {
    channel: 'webShop',
    name: 'Nettbutikk',
    emoji: '🌐',
    description: 'Selg 24/7 over hele landet. Krever litt teknisk oppsett.',
    monthlyCost: 2500,
    reachMultiplier: 1.5,
    marginImpact: 0.92,  // 8% for payment/hosting
  },
  {
    channel: 'socialMedia',
    name: 'Sosiale medier / Instagram',
    emoji: '📸',
    description: 'Direktesalg via Instagram og TikTok Shop.',
    monthlyCost: 1200,
    reachMultiplier: 1.3,
    marginImpact: 0.88,
  },
  {
    channel: 'delivery',
    name: 'Hjemlevering (Foodora/Wolt)',
    emoji: '🛵',
    description: 'Leveringsapper tar høy andel men gir mange nye kunder.',
    monthlyCost: 800,
    reachMultiplier: 1.4,
    marginImpact: 0.70,  // 30% taken by platform
  },
  {
    channel: 'wholesale',
    name: 'Engros / B2B',
    emoji: '📦',
    description: 'Selg i store kvantum til andre bedrifter. Lavere margin, høyt volum.',
    monthlyCost: 500,
    reachMultiplier: 1.6,
    marginImpact: 0.60,
  },
]

// ─── Random events ────────────────────────────────────────────────────────────

export const GAME_EVENTS: GameEvent[] = [
  { id: 'viral', title: 'Viral på TikTok! 🎉', description: 'En TikTok-video om din bedrift gikk viralt. Ny kunder strømmer inn!', emoji: '🚀', type: 'positive', demandModifier: 1.45, costModifier: 1.0 },
  { id: 'celebrity', title: 'Kjendis anbefaler deg', description: 'En kjent influencer publiserte et innlegg om din bedrift. Etterspørselen skyter i været.', emoji: '⭐', type: 'positive', demandModifier: 1.35, costModifier: 1.0 },
  { id: 'sale', title: 'Helgesalg suksess', description: 'Weekendsalget ditt ble en kjempesuksess. Kundene koser seg!', emoji: '🛍️', type: 'positive', demandModifier: 1.25, costModifier: 1.0 },
  { id: 'festival', title: 'Lokal festival i nærheten', description: 'En stor festival tiltrekker tusenvis av besøkende til området ditt.', emoji: '🎪', type: 'positive', demandModifier: 1.3, costModifier: 1.05 },
  { id: 'supplier_discount', title: 'Leverandørrabatt', description: 'Leverandøren din tilbyr en spesialrabatt denne måneden.', emoji: '💰', type: 'positive', demandModifier: 1.0, costModifier: 0.85 },
  { id: 'competitor_closed', title: 'Konkurrent stenger', description: 'En lokal konkurrent har stengt butikken. Kundene søker alternativ!', emoji: '🔑', type: 'positive', demandModifier: 1.2, costModifier: 1.0 },
  { id: 'weather_good', title: 'Strålende vær', description: 'Det er fint vær og folk er i godt humør. Perfekt for handel!', emoji: '☀️', type: 'positive', demandModifier: 1.15, costModifier: 1.0 },
  { id: 'rain', title: 'Regnvær og storm', description: 'Det dårlige været holder kundene hjemme. Etterspørselen synker.', emoji: '🌧️', type: 'negative', demandModifier: 0.75, costModifier: 1.0 },
  { id: 'competitor', title: 'Ny konkurrent', description: 'En ny konkurrent har åpnet i nabolaget. Du mister en del kunder.', emoji: '⚔️', type: 'negative', demandModifier: 0.80, costModifier: 1.0 },
  { id: 'price_hike', title: 'Leverandørprisøkning', description: 'Leverandørene dine øker prisene sine pga. økte råvarepriser.', emoji: '📈', type: 'negative', demandModifier: 1.0, costModifier: 1.25 },
  { id: 'staff_sick', title: 'Ansatte syke', description: 'Sykefraværet øker og du må ta inn vikarer. Kostnadene stiger.', emoji: '🤒', type: 'negative', demandModifier: 0.90, costModifier: 1.15 },
  { id: 'reviews', title: 'Dårlige anmeldelser', description: 'Noen negative anmeldelser på Google har skadet ryktet ditt.', emoji: '😤', type: 'negative', demandModifier: 0.80, costModifier: 1.0 },
  { id: 'nothing', title: 'En rolig måned', description: 'Ingen spesielle hendelser denne måneden. Alt går som normalt.', emoji: '😌', type: 'neutral', demandModifier: 1.0, costModifier: 1.0 },
  { id: 'nothing2', title: 'Stabil drift', description: 'Bedriften din holder et stabilt tempo. Fremgang bygges sakte men sikkert.', emoji: '📊', type: 'neutral', demandModifier: 1.0, costModifier: 1.0 },
]
