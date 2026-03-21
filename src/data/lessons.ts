export interface Lesson {
  id: string
  subject: 'mfl1' | 'mfl2' | 'ent1' | 'ent2' | 'ssr_fd' | 'ssr_mi' | 'ssr_ks'
  chapterNumber: number
  sectionNumber?: number
  title: string
  bookTitle: string
  ndlaUrl?: string
  description: string
  learningGoals: string[]
  unlocks: UnlockConfig[]
  prerequisites?: string[]
  estimatedMinutes: number
  order: number
}

export interface UnlockConfig {
  type: 'building' | 'screen' | 'feature' | 'module'
  id: string
  displayName: string
  description?: string
}

export const lessons: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════
  // MARKEDSF0RING OG LEDELSE 1 (Vision 1)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'mfl1_01',
    subject: 'mfl1',
    chapterNumber: 1,
    title: 'Markedsf\u00F8ring og ledelse - Intro',
    bookTitle: 'Vision 1 - Markedsf\u00F8ring og ledelse',
    ndlaUrl: 'https://ndla.no/nb/r/markedsforing-og-ledelse-1/markedsforing-og-ledelse-1-pa-ndla/7da9273d0a',
    description: 'Grunnleggende forst\u00E5else av markedsf\u00F8ring og ledelse',
    learningGoals: [
      'Forst\u00E5 hva markedsf\u00F8ring er',
      'Kjenne til markedsf\u00F8ringens rolle i samfunnet',
      'Grunnleggende ledelsesprinsipper',
    ],
    unlocks: [
      { type: 'screen', id: 'start_screen', displayName: 'Oppstart av bedrift' },
      { type: 'screen', id: 'industry_screen', displayName: 'Bransjevalg' },
      { type: 'feature', id: 'basic_simulation', displayName: 'Grunnleggende simulering' },
    ],
    estimatedMinutes: 45,
    order: 1,
  },

  {
    id: 'mfl1_02',
    subject: 'mfl1',
    chapterNumber: 2,
    title: 'Markedsf\u00F8ring og b\u00E6rekraft',
    bookTitle: 'Vision 1',
    description: 'B\u00E6rekraftig markedsf\u00F8ring og samfunnsansvar',
    learningGoals: [
      'Forst\u00E5 b\u00E6rekraftig markedsf\u00F8ring',
      'Vurdere etiske dilemmaer',
      'Kjenne til gr\u00F8nnvasking',
    ],
    unlocks: [
      { type: 'screen', id: 'sustainability_screen', displayName: 'B\u00E6rekraft-valg' },
      { type: 'feature', id: 'esg_scoring', displayName: 'B\u00E6rekraft-scoring' },
    ],
    prerequisites: ['mfl1_01'],
    estimatedMinutes: 60,
    order: 2,
  },

  {
    id: 'mfl1_03',
    subject: 'mfl1',
    chapterNumber: 3,
    title: 'Forbrukeradferd',
    bookTitle: 'Vision 1',
    description: 'Forst\u00E5 hvordan forbrukere tar kj\u00F8psbeslutninger',
    learningGoals: [
      'Kjenne til kj\u00F8psprosessen',
      'Forst\u00E5 p\u00E5virkningsfaktorer',
      'Segmentering og m\u00E5lgruppevalg',
    ],
    unlocks: [
      { type: 'screen', id: 'target_audience_screen', displayName: 'M\u00E5lgruppe-valg' },
      { type: 'feature', id: 'persona_builder', displayName: 'Persona-definisjon' },
    ],
    prerequisites: ['mfl1_01'],
    estimatedMinutes: 90,
    order: 3,
  },

  {
    id: 'mfl1_04',
    subject: 'mfl1',
    chapterNumber: 4,
    title: 'Grunnleggende beslutninger i markedsf\u00F8ringsledelse',
    bookTitle: 'Vision 1',
    description: 'Strategiske valg for virksomheten',
    learningGoals: [
      'Forretningsmodell-valg',
      'Markedsorientering',
      'Strategiske beslutninger',
    ],
    unlocks: [
      { type: 'screen', id: 'business_model_screen', displayName: 'Forretningsmodell-valg' },
    ],
    prerequisites: ['mfl1_03'],
    estimatedMinutes: 60,
    order: 4,
  },

  {
    id: 'mfl1_05',
    subject: 'mfl1',
    chapterNumber: 5,
    title: 'Situasjonsanalyse',
    bookTitle: 'Vision 1',
    description: 'SWOT og markedsanalyse',
    learningGoals: [
      'Gjennomf\u00F8re SWOT-analyse',
      'Analysere konkurrenter',
      'Vurdere markedssituasjon',
    ],
    unlocks: [
      { type: 'module', id: 'swot_analysis', displayName: 'SWOT-analyse verkt\u00F8y' },
      { type: 'feature', id: 'competitor_analysis', displayName: 'Konkurrent-analyse' },
    ],
    prerequisites: ['mfl1_04'],
    estimatedMinutes: 90,
    order: 5,
  },

  {
    id: 'mfl1_06',
    subject: 'mfl1',
    chapterNumber: 6,
    title: 'Markedsunders\u00F8kelser',
    bookTitle: 'Vision 1',
    description: 'Innhenting og analyse av markedsdata',
    learningGoals: [
      'Planlegge markedsunders\u00F8kelser',
      'Tolke statistikk og data',
      'Bruke Ipsos-data',
    ],
    unlocks: [
      { type: 'module', id: 'market_research', displayName: 'Markedsunders\u00F8kelse (Ipsos paywall)' },
      { type: 'feature', id: 'data_analysis', displayName: 'Dataanalyse-verkt\u00F8y' },
    ],
    prerequisites: ['mfl1_05'],
    estimatedMinutes: 120,
    order: 6,
  },

  {
    id: 'mfl1_07',
    subject: 'mfl1',
    chapterNumber: 7,
    title: 'Produktstrategier',
    bookTitle: 'Vision 1',
    ndlaUrl: 'https://ndla.no/nb/r/markedsforing-og-ledelse-1/produkt/defebe2410',
    description: 'Produktet som konkurransemiddel (4P - Product)',
    learningGoals: [
      'Definere hva et produkt er',
      'Forklare produktniv\u00E5er',
      'Analysere produktsortiment',
      'Produktutvikling og livsl\u00F8p',
    ],
    unlocks: [
      { type: 'building', id: 'warehouse', displayName: 'Lager-bygning' },
      { type: 'screen', id: 'product_catalog', displayName: 'Produktkatalog' },
      { type: 'feature', id: 'inventory_management', displayName: 'Lagerstyring' },
      { type: 'screen', id: 'store_interior', displayName: 'Butikk-interi\u00F8r' },
    ],
    prerequisites: ['mfl1_06'],
    estimatedMinutes: 120,
    order: 7,
  },

  {
    id: 'mfl1_08',
    subject: 'mfl1',
    chapterNumber: 8,
    title: 'Merkevarestrategier',
    bookTitle: 'Vision 1',
    description: 'Merkevarebygging og posisjonering',
    learningGoals: [
      'Forst\u00E5 merkevarebygging',
      'Posisjonering i markedet',
      'Merkevareidentitet',
    ],
    unlocks: [
      { type: 'feature', id: 'brand_builder', displayName: 'Merkevarebygger (logo/navn)' },
      { type: 'module', id: 'positioning', displayName: 'Posisjonerings-verkt\u00F8y' },
    ],
    prerequisites: ['mfl1_07'],
    estimatedMinutes: 90,
    order: 8,
  },

  {
    id: 'mfl1_09',
    subject: 'mfl1',
    chapterNumber: 9,
    title: 'Prisstrategier',
    bookTitle: 'Vision 1',
    description: 'Prissetting som konkurransemiddel (4P - Price)',
    learningGoals: [
      'Forst\u00E5 ulike prisstrategier',
      'Beregne dekningsbidrag',
      'Vurdere konkurransesituasjon',
      'Priselastisitet',
    ],
    unlocks: [
      { type: 'screen', id: 'pricing_screen', displayName: 'Prissetting' },
      { type: 'feature', id: 'margin_calculator', displayName: 'Dekningsbidrag-kalkulator' },
      { type: 'module', id: 'price_calculation', displayName: 'Manuell priskalkyle (modul)' },
    ],
    prerequisites: ['mfl1_07'],
    estimatedMinutes: 120,
    order: 9,
  },

  {
    id: 'mfl1_10',
    subject: 'mfl1',
    chapterNumber: 10,
    title: 'Distribusjonsstrategier',
    bookTitle: 'Vision 1',
    description: 'Distribusjon som konkurransemiddel (4P - Place)',
    learningGoals: [
      'Forst\u00E5 distribusjonskanaler',
      'Velge mellom fysisk/digital distribusjon',
      'Vurdere lokasjon',
    ],
    unlocks: [
      { type: 'screen', id: 'distribution_screen', displayName: 'Distribusjon' },
      { type: 'screen', id: 'location_screen', displayName: 'Lokasjon-valg' },
      { type: 'feature', id: 'webshop', displayName: 'Nettbutikk-funksjon' },
    ],
    prerequisites: ['mfl1_09'],
    estimatedMinutes: 90,
    order: 10,
  },

  {
    id: 'mfl1_11',
    subject: 'mfl1',
    chapterNumber: 11,
    title: 'Kommunikasjonsstrategier',
    bookTitle: 'Vision 1',
    description: 'Markedskommunikasjon (4P - Promotion)',
    learningGoals: [
      'Forst\u00E5 markedskommunikasjon',
      'Velge relevante kanaler',
      'Planlegge kampanjer',
      'M\u00E5le effekt',
    ],
    unlocks: [
      { type: 'building', id: 'marketing', displayName: 'Markedsf\u00F8ring-bygning' },
      { type: 'screen', id: 'marketing_screen', displayName: 'Markedsf\u00F8ring' },
      { type: 'feature', id: 'campaign_builder', displayName: 'Kampanje-designer' },
      { type: 'feature', id: 'social_media', displayName: 'Sosiale medier' },
    ],
    prerequisites: ['mfl1_10'],
    estimatedMinutes: 120,
    order: 11,
  },

  {
    id: 'mfl1_12',
    subject: 'mfl1',
    chapterNumber: 12,
    title: 'Markedsmiks - Helhetlig strategi',
    bookTitle: 'Vision 1',
    description: 'Kombinere alle 4P i en helhetlig strategi',
    learningGoals: [
      'Integrere alle konkurransemidler',
      'Vurdere samspill mellom 4P',
      'Lage markedsmiks',
    ],
    unlocks: [
      { type: 'module', id: 'marketing_mix', displayName: 'Markedsmiks-analyse' },
      { type: 'feature', id: 'strategy_overview', displayName: 'Strategioversikt' },
    ],
    prerequisites: ['mfl1_11'],
    estimatedMinutes: 90,
    order: 12,
  },

  {
    id: 'mfl1_13',
    subject: 'mfl1',
    chapterNumber: 13,
    title: 'Ledelse og personal',
    bookTitle: 'Vision 1',
    description: 'Personale som konkurransemiddel (5. P)',
    learningGoals: [
      'Forst\u00E5 ledelse',
      'Rekruttering og motivasjon',
      'Personell som konkurransefortrinn',
    ],
    unlocks: [
      { type: 'building', id: 'personnel', displayName: 'Personale-bygning' },
      { type: 'screen', id: 'personnel_screen', displayName: 'Personale' },
      { type: 'feature', id: 'hiring', displayName: 'Ansettelse' },
      { type: 'feature', id: 'salary_calc', displayName: 'L\u00F8nnsberegning' },
    ],
    prerequisites: ['mfl1_12'],
    estimatedMinutes: 90,
    order: 13,
  },

  {
    id: 'mfl1_14',
    subject: 'mfl1',
    chapterNumber: 14,
    title: 'Etikk og regelverk i markedsf\u00F8ringen',
    bookTitle: 'Vision 1',
    description: 'Lover og etikk i markedsf\u00F8ring',
    learningGoals: [
      'Kjenne til markedsf\u00F8ringsloven',
      'Forst\u00E5 etiske dilemmaer',
      'GDPR og personvern',
    ],
    unlocks: [
      { type: 'module', id: 'legal_compliance', displayName: 'Regelverk-info' },
      { type: 'feature', id: 'ethical_scenarios', displayName: 'Etiske dilemma-scenarier' },
    ],
    prerequisites: ['mfl1_13'],
    estimatedMinutes: 60,
    order: 14,
  },

  // ═══════════════════════════════════════════════════════════════
  // SALG, SERVICE OG REISELIV - MARKEDSF0RING OG INNOVASJON
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ssr_mi_00',
    subject: 'ssr_mi',
    chapterNumber: 0,
    title: 'Markedsf\u00F8ring og innovasjon - Intro',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Introduksjon til innovasjon og markedsf\u00F8ring',
    learningGoals: [
      'Forst\u00E5 innovasjonsbegrepet',
      'Markedsf\u00F8ringens rolle i servicen\u00E6ringen',
    ],
    unlocks: [
      { type: 'screen', id: 'start_screen', displayName: 'Oppstart' },
    ],
    estimatedMinutes: 45,
    order: 1,
  },

  {
    id: 'ssr_mi_01',
    subject: 'ssr_mi',
    chapterNumber: 1,
    title: 'Forbrukeratferd',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Forst\u00E5 kundens kj\u00F8psadferd',
    learningGoals: [
      'Kjenne til kj\u00F8psprosessen',
      'Forst\u00E5 behov og \u00F8nsker',
      'Segmentering',
    ],
    unlocks: [
      { type: 'screen', id: 'target_audience_screen', displayName: 'M\u00E5lgruppe' },
    ],
    prerequisites: ['ssr_mi_00'],
    estimatedMinutes: 90,
    order: 2,
  },

  {
    id: 'ssr_mi_02',
    subject: 'ssr_mi',
    chapterNumber: 2,
    title: 'Teknologi, trender og id\u00E9utvikling',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Innovasjon og trendanalyse',
    learningGoals: [
      'Identifisere trender',
      'Innovasjonsprosesser',
      'Id\u00E9utvikling',
    ],
    unlocks: [
      { type: 'module', id: 'trend_analysis', displayName: 'Trend-analyse' },
      { type: 'feature', id: 'innovation_tools', displayName: 'Innovasjons-verkt\u00F8y' },
    ],
    prerequisites: ['ssr_mi_01'],
    estimatedMinutes: 90,
    order: 3,
  },

  {
    id: 'ssr_mi_03',
    subject: 'ssr_mi',
    chapterNumber: 3,
    sectionNumber: 1,
    title: 'Konkurransemiddelet: Produkt',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Produktet som konkurransemiddel',
    learningGoals: [
      'Produktniv\u00E5er',
      'Produktsortiment',
      'Produktutvikling',
    ],
    unlocks: [
      { type: 'building', id: 'warehouse', displayName: 'Lager' },
      { type: 'screen', id: 'product_catalog', displayName: 'Produktkatalog' },
    ],
    prerequisites: ['ssr_mi_02'],
    estimatedMinutes: 90,
    order: 4,
  },

  {
    id: 'ssr_mi_03_02',
    subject: 'ssr_mi',
    chapterNumber: 3,
    sectionNumber: 2,
    title: 'Konkurransemiddelet: Pris',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Prissetting',
    learningGoals: [
      'Prisstrategier',
      'Kalkulasjon',
      'Konkurransesituasjon',
    ],
    unlocks: [
      { type: 'screen', id: 'pricing_screen', displayName: 'Prissetting' },
    ],
    prerequisites: ['ssr_mi_03'],
    estimatedMinutes: 90,
    order: 5,
  },

  {
    id: 'ssr_mi_03_03',
    subject: 'ssr_mi',
    chapterNumber: 3,
    sectionNumber: 3,
    title: 'Konkurransemiddelet: Plass',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Distribusjon og lokasjon',
    learningGoals: [
      'Distribusjonskanaler',
      'Lokasjon',
      'Digital vs fysisk',
    ],
    unlocks: [
      { type: 'screen', id: 'distribution_screen', displayName: 'Distribusjon' },
      { type: 'screen', id: 'location_screen', displayName: 'Lokasjon' },
    ],
    prerequisites: ['ssr_mi_03_02'],
    estimatedMinutes: 90,
    order: 6,
  },

  {
    id: 'ssr_mi_03_04',
    subject: 'ssr_mi',
    chapterNumber: 3,
    sectionNumber: 4,
    title: 'Konkurransemiddelet: P\u00E5virkning',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Markedskommunikasjon',
    learningGoals: [
      'Kommunikasjonskanaler',
      'Kampanjeplanlegging',
      'Sosiale medier',
    ],
    unlocks: [
      { type: 'building', id: 'marketing', displayName: 'Markedsf\u00F8ring' },
      { type: 'screen', id: 'marketing_screen', displayName: 'Markedsf\u00F8ring' },
    ],
    prerequisites: ['ssr_mi_03_03'],
    estimatedMinutes: 120,
    order: 7,
  },

  {
    id: 'ssr_mi_03_05',
    subject: 'ssr_mi',
    chapterNumber: 3,
    sectionNumber: 5,
    title: 'Konkurransemiddelet: Personale',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Personale som konkurransefortrinn',
    learningGoals: [
      'Rekruttering',
      'Motivasjon',
      'Kundeservice',
    ],
    unlocks: [
      { type: 'building', id: 'personnel', displayName: 'Personale' },
      { type: 'screen', id: 'personnel_screen', displayName: 'Personale' },
    ],
    prerequisites: ['ssr_mi_03_04'],
    estimatedMinutes: 90,
    order: 8,
  },

  {
    id: 'ssr_mi_04',
    subject: 'ssr_mi',
    chapterNumber: 4,
    title: 'Markedsplanen',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Lage en komplett markedsplan',
    learningGoals: [
      'Strukturere en markedsplan',
      'SWOT-analyse',
      'Strategisk planlegging',
    ],
    unlocks: [
      { type: 'module', id: 'marketing_plan', displayName: 'Markedsplan-verkt\u00F8y' },
    ],
    prerequisites: ['ssr_mi_03_05'],
    estimatedMinutes: 120,
    order: 9,
  },

  {
    id: 'ssr_mi_05',
    subject: 'ssr_mi',
    chapterNumber: 5,
    title: 'Markedskampanjer',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Planlegge og gjennomf\u00F8re kampanjer',
    learningGoals: [
      'Kampanjeplanlegging',
      'Budsjettering',
      'Effektm\u00E5ling',
    ],
    unlocks: [
      { type: 'feature', id: 'campaign_builder', displayName: 'Kampanje-designer' },
    ],
    prerequisites: ['ssr_mi_04'],
    estimatedMinutes: 90,
    order: 10,
  },

  {
    id: 'ssr_mi_06',
    subject: 'ssr_mi',
    chapterNumber: 6,
    title: 'Salg',
    bookTitle: 'Markedsf\u00F8ring og innovasjon (SSR)',
    description: 'Salgsteknikk og kundebehandling',
    learningGoals: [
      'Salgsprosessen',
      'Kundeservice',
      'Objeksjonsh\u00E5ndtering',
    ],
    unlocks: [
      { type: 'screen', id: 'store_interior', displayName: 'Butikk-interi\u00F8r' },
      { type: 'feature', id: 'sales_scenarios', displayName: 'Salgs-scenarier' },
    ],
    prerequisites: ['ssr_mi_05'],
    estimatedMinutes: 120,
    order: 11,
  },

  // ═══════════════════════════════════════════════════════════════
  // SALG, SERVICE OG REISELIV - FORRETNINGSDRIFT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ssr_fd_00',
    subject: 'ssr_fd',
    chapterNumber: 0,
    title: 'Forretningsdrift - Intro',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Introduksjon til forretningsdrift',
    learningGoals: [
      'Forst\u00E5 forretningsdrift',
      'Drift, \u00F8konomi, l\u00F8nnsomhet',
    ],
    unlocks: [
      { type: 'feature', id: 'basic_simulation', displayName: 'Simulering' },
    ],
    estimatedMinutes: 45,
    order: 1,
  },

  {
    id: 'ssr_fd_03',
    subject: 'ssr_fd',
    chapterNumber: 3,
    title: 'Prissetting',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Kalkulasjon og prissetting',
    learningGoals: [
      'Beregne dekningsbidrag',
      'Kalkulere priser',
      'MVA-beregning',
    ],
    unlocks: [
      { type: 'screen', id: 'pricing_screen', displayName: 'Prissetting' },
      { type: 'module', id: 'price_calculation', displayName: 'Priskalkyle-modul' },
    ],
    prerequisites: ['ssr_fd_00'],
    estimatedMinutes: 120,
    order: 2,
  },

  {
    id: 'ssr_fd_05',
    subject: 'ssr_fd',
    chapterNumber: 5,
    title: 'Regnskap',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Budsjett og regnskap',
    learningGoals: [
      'Lage budsjett',
      'Lese regnskap',
      'N\u00F8kkeltall',
    ],
    unlocks: [
      { type: 'module', id: 'budget_planning', displayName: 'Budsjett-modul' },
      { type: 'feature', id: 'accounting', displayName: 'Regnskap' },
      { type: 'screen', id: 'financial_report', displayName: '\u00D8konomisk rapport' },
    ],
    prerequisites: ['ssr_fd_03'],
    estimatedMinutes: 150,
    order: 3,
  },

  {
    id: 'ssr_fd_06',
    subject: 'ssr_fd',
    chapterNumber: 6,
    title: 'B\u00E6rekraft',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'B\u00E6rekraftig forretningsdrift',
    learningGoals: [
      'Forst\u00E5 b\u00E6rekraft i forretningsdrift',
      'ESG-scoring',
      'Milj\u00F8sertifiseringer',
    ],
    unlocks: [
      { type: 'screen', id: 'sustainability_screen', displayName: 'B\u00E6rekraft' },
      { type: 'feature', id: 'esg_scoring', displayName: 'ESG-scoring' },
    ],
    prerequisites: ['ssr_fd_05'],
    estimatedMinutes: 90,
    order: 4,
  },

  // ═══════════════════════════════════════════════════════════════
  // ENTREPREN0RSKAP OG BEDRIFTSUTVIKLING 1
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ent1_01',
    subject: 'ent1',
    chapterNumber: 1,
    title: 'Fra id\u00E9 til bedrift',
    bookTitle: 'Entrepren\u00F8rskap og bedriftsutvikling 1',
    ndlaUrl: 'https://ndla.no/nb/r/entreprenorskap-og-bedriftsutvikling-1---ressurssamling/jeg-har-en-god-ide/',
    description: 'Id\u00E9utvikling og gr\u00FCnderskap',
    learningGoals: [
      'Utvikle forretningsid\u00E9',
      'Vurdere gjennomf\u00F8rbarhet',
      'Markedsvalidering',
    ],
    unlocks: [
      { type: 'screen', id: 'start_screen', displayName: 'Oppstart' },
      { type: 'feature', id: 'idea_validator', displayName: 'Id\u00E9-validator' },
    ],
    estimatedMinutes: 90,
    order: 1,
  },

  {
    id: 'ent1_02',
    subject: 'ent1',
    chapterNumber: 2,
    title: 'Business Model Canvas',
    bookTitle: 'Entrepren\u00F8rskap og bedriftsutvikling 1',
    ndlaUrl: 'https://ndla.no/nb/r/entreprenorskap-og-bedriftsutvikling-1---ressurssamling/fra-ide-til-bedrift-med-utviklingsverktoyet-canvas/',
    description: 'Forretningsmodellering med Canvas',
    learningGoals: [
      'Forst\u00E5 Business Model Canvas',
      'Lage forretningsmodell',
      'Teste forretningsmodell',
    ],
    unlocks: [
      { type: 'module', id: 'bmc', displayName: 'Business Model Canvas' },
    ],
    prerequisites: ['ent1_01'],
    estimatedMinutes: 120,
    order: 2,
  },

  {
    id: 'ent1_03',
    subject: 'ent1',
    chapterNumber: 3,
    title: '\u00D8konomi - Budsjett',
    bookTitle: 'Entrepren\u00F8rskap og bedriftsutvikling 1',
    ndlaUrl: 'https://ndla.no/nb/e/entreprenorskap-og-bedriftsutvikling-1---ressurssamling/okonomi/',
    description: 'Budsjettplanlegging for oppstart',
    learningGoals: [
      'Lage oppstartsbudsjett',
      'Beregne kapitalbehov',
      'Estimere kostnader',
    ],
    unlocks: [
      { type: 'module', id: 'budget_planning', displayName: 'Budsjett-planlegging' },
      { type: 'screen', id: 'budget_screen', displayName: 'Budsjett' },
    ],
    prerequisites: ['ent1_02'],
    estimatedMinutes: 150,
    order: 3,
  },

  {
    id: 'ent1_04',
    subject: 'ent1',
    chapterNumber: 4,
    title: '\u00D8konomi - Finansiering',
    bookTitle: 'Entrepren\u00F8rskap og bedriftsutvikling 1',
    description: 'Finansieringsmuligheter',
    learningGoals: [
      'Kjenne til finansieringskilder',
      'Vurdere egenkapital vs l\u00E5n',
      'S\u00F8ke om st\u00F8tte',
    ],
    unlocks: [
      { type: 'module', id: 'financing', displayName: 'Finansiering-modul' },
      { type: 'screen', id: 'financing_screen', displayName: 'Finansiering' },
    ],
    prerequisites: ['ent1_03'],
    estimatedMinutes: 120,
    order: 4,
  },

  {
    id: 'ent1_05',
    subject: 'ent1',
    chapterNumber: 5,
    title: 'Priskalkyle',
    bookTitle: 'Entrepren\u00F8rskap og bedriftsutvikling 1',
    description: 'Manuell priskalkyle',
    learningGoals: [
      'Beregne dekningsbidrag',
      'Kalkulere MVA',
      'Forsvare pris',
    ],
    unlocks: [
      { type: 'module', id: 'price_calculation', displayName: 'Priskalkyle-modul (manuell)' },
    ],
    prerequisites: ['ent1_04'],
    estimatedMinutes: 120,
    order: 5,
  },

  {
    id: 'ent1_06',
    subject: 'ent1',
    chapterNumber: 6,
    title: 'Regelverk ved oppstart',
    bookTitle: 'Entrepren\u00F8rskap og bedriftsutvikling 1',
    ndlaUrl: 'https://ndla.no/nb/r/entreprenorskap-og-bedriftsutvikling-1---ressurssamling/regelverk-ved-oppstart-av-egen-bedrift/',
    description: 'Lover og regler ved oppstart',
    learningGoals: [
      'Kjenne til selskapsformer',
      'Registrering',
      'Skatt og avgifter',
    ],
    unlocks: [
      { type: 'module', id: 'legal_info', displayName: 'Regelverk-informasjon' },
    ],
    prerequisites: ['ent1_05'],
    estimatedMinutes: 90,
    order: 6,
  },

  // ═══════════════════════════════════════════════════════════════
  // SALG, SERVICE OG REISELIV - FORRETNINGSDRIFT (FD1-FD5 MODULES)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ssr_fd_01',
    subject: 'ssr_fd',
    chapterNumber: 1,
    title: 'Organisering og roller (FD1)',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Organisasjonskart, ansvarsfordeling og roller i bedriften',
    learningGoals: [
      'Beskrive ansvarsfordeling og hva ulike roller inneb\u00E6rer',
      'Utarbeide og presentere organisasjonskart',
      'Kjenne til typiske roller i ulike bransjer',
    ],
    unlocks: [
      { type: 'module', id: 'organization_module', displayName: 'FD1: Organisering (interaktiv)' },
    ],
    prerequisites: ['ssr_fd_00'],
    estimatedMinutes: 60,
    order: 2,
  },
  {
    id: 'ssr_fd_02',
    subject: 'ssr_fd',
    chapterNumber: 2,
    title: 'Prissetting og kalkyle (FD2)',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Kalkulasjon av utsalgspris basert p\u00E5 innkj\u00F8pspris, dekningsbidrag og MVA',
    learningGoals: [
      'Vurdere, kalkulere og justere produktpris',
      'Beregne dekningsbidrag og dekningsgrad',
      'Forst\u00E5 MVA-beregning (25%)',
    ],
    unlocks: [
      { type: 'module', id: 'pricing_calculator_module', displayName: 'FD2: Priskalkulator (interaktiv)' },
    ],
    prerequisites: ['ssr_fd_00'],
    estimatedMinutes: 90,
    order: 3,
  },
  {
    id: 'ssr_fd_03_budget',
    subject: 'ssr_fd',
    chapterNumber: 3,
    title: 'Budsjettering og regnskap (FD3)',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Budsjett, resultatregnskap og avviksanalyse',
    learningGoals: [
      'Forklare og vedlikeholde enkelt regnskap',
      'Utarbeide budsjett og vurdere l\u00F8nnsomhet',
      'Analysere avvik mellom budsjett og regnskap',
    ],
    unlocks: [
      { type: 'module', id: 'budgeting_module', displayName: 'FD3: Budsjett (interaktiv)' },
    ],
    prerequisites: ['ssr_fd_00'],
    estimatedMinutes: 120,
    order: 4,
  },
  {
    id: 'ssr_fd_04',
    subject: 'ssr_fd',
    chapterNumber: 4,
    title: 'Helse, milj\u00F8 og sikkerhet (FD4)',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Risikovurdering og tiltak for \u00E5 forebygge un\u00F8nskede hendelser',
    learningGoals: [
      'Gjennomf\u00F8re enkel risikovurdering',
      'Presentere tiltak som forebygger un\u00F8nskede hendelser',
      'Kjenne til HMS-lovgivning (Arbeidsmilj\u00F8loven)',
    ],
    unlocks: [
      { type: 'module', id: 'hms_module', displayName: 'FD4: HMS-inspeksjon (interaktiv)' },
    ],
    prerequisites: ['ssr_fd_00'],
    estimatedMinutes: 75,
    order: 5,
  },
  {
    id: 'ssr_fd_05_beredskap',
    subject: 'ssr_fd',
    chapterNumber: 5,
    title: 'Beredskapsplan (FD5)',
    bookTitle: 'Forretningsdrift (SSR)',
    description: 'Beredskapsplaner, kriseh\u00E5ndtering og raske beslutninger',
    learningGoals: [
      'F\u00F8lge en beredskapsplan',
      'Gj\u00F8re rede for beredskapsplaners funksjon og hensikt',
      'H\u00E5ndtere vanlige krisescenarier riktig',
    ],
    unlocks: [
      { type: 'module', id: 'contingency_module', displayName: 'FD5: Krisesimulator (interaktiv)' },
    ],
    prerequisites: ['ssr_fd_00'],
    estimatedMinutes: 60,
    order: 6,
  },
]

// Helper: get lessons by subject, sorted by order
export function getLessonsBySubject(subject: Lesson['subject']): Lesson[] {
  return lessons
    .filter((l) => l.subject === subject)
    .sort((a, b) => a.order - b.order)
}

// Helper: check if all prerequisites are in the completed list
export function checkPrerequisites(
  lesson: Lesson,
  completedLessonIds: string[],
): boolean {
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) return true
  return lesson.prerequisites.every((prereq) =>
    completedLessonIds.includes(prereq),
  )
}

// Helper: find which lesson unlocks a given feature ID
export function findLessonForUnlock(featureId: string): Lesson | undefined {
  return lessons.find((l) => l.unlocks.some((u) => u.id === featureId))
}
