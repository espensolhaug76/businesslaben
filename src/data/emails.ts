import type { GameEmail } from '../types/Desktop'

export const emailTemplates: Omit<GameEmail, 'read' | 'responded'>[] = [
  // Month 1
  {
    id: 'welcome_1',
    from: 'AdVenture Support',
    fromIcon: '🎮',
    subject: 'Velkommen til AdVenture!',
    body: 'Gratulerer med oppstarten! Sjekk e-posten jevnlig for tips, tilbud og viktige hendelser. Lykke til med bedriften!',
    type: 'opportunity',
    month: 1,
    choices: [
      { id: 'ack', label: 'Takk!', icon: '👍', effect: {} },
    ],
  },
  {
    id: 'supplier_intro',
    from: 'Norsk Leverandør AS',
    fromIcon: '🏭',
    subject: 'Spesialtilbud til nye kunder',
    body: 'Vi tilbyr 15% rabatt på første bestilling for nye bedrifter. Bestill produkter nå og spar penger på varelageret ditt!',
    type: 'supplier',
    month: 1,
    choices: [
      { id: 'accept', label: 'Se tilbud', icon: '🛒', cost: 0, effect: { money: 5000 } },
      { id: 'decline', label: 'Ikke nå', icon: '✗', effect: {} },
    ],
  },

  // Month 2
  {
    id: 'trade_show_1',
    from: 'Oslo Varemesse',
    fromIcon: '🏛️',
    subject: 'Invitasjon til bransjemesse',
    body: 'Vis frem produktene dine på Oslo Varemesse! Stand koster 15 000 kr. Forventet besøk: 5 000 potensielle kunder. Flott mulighet for merkevarebygging.',
    type: 'opportunity',
    month: 2,
    deadline: 'Måned 3',
    choices: [
      { id: 'accept', label: 'Delta', icon: '✓', cost: 15000, effect: { reputation: 10, awareness: 20 } },
      { id: 'decline', label: 'Avslå', icon: '✗', effect: {} },
    ],
  },
  {
    id: 'instagram_boost',
    from: 'Instagram Business',
    fromIcon: '📸',
    subject: 'Boost kampanjen din!',
    body: 'Nå 10 000 flere potensielle kunder med en boost-kampanje for 5 000 kr. Perfekt for å øke synligheten i oppstartsfasen.',
    type: 'marketing',
    month: 2,
    choices: [
      { id: 'boost', label: 'Kjøp boost', icon: '📱', cost: 5000, effect: { demand: 15, awareness: 15 } },
      { id: 'skip', label: 'Hopp over', icon: '⏭️', effect: {} },
    ],
  },

  // Month 3
  {
    id: 'customer_complaint_1',
    from: 'Kundeservice',
    fromIcon: '😠',
    subject: 'Kundeklage: Feil størrelse levert',
    body: 'En kunde har klaget på feil størrelse. De krever full refusjon (850 kr) og vurderer å legge ut negativ anmeldelse. Hvordan vil du håndtere dette?',
    type: 'complaint',
    month: 3,
    choices: [
      { id: 'refund', label: 'Full refusjon', icon: '💸', cost: 850, effect: { reputation: 5 } },
      { id: 'exchange', label: 'Tilby bytte', icon: '🔄', cost: 0, effect: { reputation: 2 } },
      { id: 'ignore', label: 'Avvis klagen', icon: '✗', effect: { reputation: -8 } },
    ],
  },

  // Month 4
  {
    id: 'collab_influencer',
    from: 'Sophie Berg (Influencer)',
    fromIcon: '⭐',
    subject: 'Samarbeidsforespørsel',
    body: 'Hei! Jeg har 50 000 følgere på Instagram og vil gjerne samarbeide med dere. Jeg kan promotere produktene deres for 8 000 kr. Mine følgere er i alderen 18-30.',
    type: 'marketing',
    month: 4,
    choices: [
      { id: 'accept', label: 'Samarbeid', icon: '🤝', cost: 8000, effect: { demand: 20, reputation: 5, awareness: 25 } },
      { id: 'negotiate', label: 'Forhandle pris', icon: '💬', cost: 5000, effect: { demand: 12, awareness: 15 } },
      { id: 'decline', label: 'Avslå', icon: '✗', effect: {} },
    ],
  },

  // Month 5
  {
    id: 'tax_notice',
    from: 'Skatteetaten',
    fromIcon: '🏛️',
    subject: 'Varsel om mva-kontroll',
    body: 'Skatteetaten varsler om en rutinemessig mva-kontroll. Sørg for at regnskapet er i orden. Ingen umiddelbar handling kreves, men vær forberedt.',
    type: 'regulatory',
    month: 5,
    choices: [
      { id: 'ack', label: 'Mottatt', icon: '📋', effect: {} },
    ],
  },
  {
    id: 'supplier_premium',
    from: 'Premium Fabrics Int.',
    fromIcon: '🧵',
    subject: 'Eksklusiv stoffkolleksjon',
    body: 'Vi tilbyr en eksklusiv stoffkolleksjon i begrenset opplag. 20 000 kr for tilgang. Kan gi produktene dine et premium-image og høyere salgspris.',
    type: 'supplier',
    month: 5,
    choices: [
      { id: 'buy', label: 'Kjøp tilgang', icon: '💎', cost: 20000, effect: { reputation: 8, demand: 10 } },
      { id: 'pass', label: 'For dyrt', icon: '✗', effect: {} },
    ],
  },

  // Month 6
  {
    id: 'competitor_price_war',
    from: 'Markedsanalyse',
    fromIcon: '📊',
    subject: 'Konkurrent senker prisene!',
    body: 'Din største konkurrent har satt ned prisene med 25%. Kundene dine kan bli fristet til å handle hos dem. Vurder din prisstrategi.',
    type: 'competitor',
    month: 6,
    choices: [
      { id: 'match', label: 'Match prisene', icon: '💰', effect: { demand: 5, reputation: -3 } },
      { id: 'quality', label: 'Fremhev kvalitet', icon: '✨', cost: 3000, effect: { reputation: 5 } },
      { id: 'ignore', label: 'Ignorer', icon: '😎', effect: { demand: -10 } },
    ],
  },

  // Month 7
  {
    id: 'summer_sale',
    from: 'Marketing Team',
    fromIcon: '☀️',
    subject: 'Forslag: Sommersalg-kampanje',
    body: 'Sommeren er her! Vi foreslår en sommersalg-kampanje med 20% rabatt. Kostnad: 10 000 kr for markedsføring. Forventet økning i salg: 40%.',
    type: 'marketing',
    month: 7,
    choices: [
      { id: 'launch', label: 'Kjør sommersalg', icon: '🏖️', cost: 10000, effect: { demand: 40, awareness: 20 } },
      { id: 'small', label: 'Liten kampanje', icon: '📢', cost: 4000, effect: { demand: 15, awareness: 8 } },
      { id: 'skip', label: 'Hopp over', icon: '⏭️', effect: {} },
    ],
  },

  // Month 8
  {
    id: 'sustainability_cert',
    from: 'Grønt Sertifisering',
    fromIcon: '🌱',
    subject: 'Tilbud: Miljøsertifisering',
    body: 'Få offisiell miljøsertifisering for bedriften din. Kost: 12 000 kr. Gir økt tillit hos miljøbevisste kunder og bedre omdømme.',
    type: 'opportunity',
    month: 8,
    choices: [
      { id: 'certify', label: 'Sertifiser oss', icon: '🌿', cost: 12000, effect: { reputation: 15, demand: 10 } },
      { id: 'later', label: 'Kanskje senere', icon: '⏰', effect: {} },
    ],
  },

  // Month 9
  {
    id: 'black_friday_prep',
    from: 'Detaljhandel Norge',
    fromIcon: '🏷️',
    subject: 'Black Friday nærmer seg!',
    body: 'Black Friday er i november. Start planleggingen nå! Fyll opp lageret og forbered markedsføringen. Erfaring viser 3x normal etterspørsel.',
    type: 'opportunity',
    month: 9,
    choices: [
      { id: 'prepare', label: 'Start planlegging', icon: '📋', effect: { awareness: 5 } },
      { id: 'ack', label: 'Notert', icon: '👍', effect: {} },
    ],
  },

  // Month 10
  {
    id: 'employee_request',
    from: 'HR-avdelingen',
    fromIcon: '👥',
    subject: 'Ansatt ber om lønnsøkning',
    body: 'En av dine ansatte ber om 15% lønnsøkning. De truer med å slutte hvis de ikke får det. De er dyktige og vanskelige å erstatte.',
    type: 'complaint',
    month: 10,
    choices: [
      { id: 'raise', label: 'Gi lønnsøkning', icon: '💰', cost: 3000, effect: { reputation: 3 } },
      { id: 'partial', label: 'Tilby 8%', icon: '🤝', cost: 1500, effect: { reputation: 1 } },
      { id: 'refuse', label: 'Avslå', icon: '✗', effect: { reputation: -5 } },
    ],
  },

  // Month 11
  {
    id: 'christmas_campaign',
    from: 'Reklamebyra.no',
    fromIcon: '🎄',
    subject: 'Julekampanje-pakke',
    body: 'Julesesongen er den viktigste! Vi tilbyr en komplett julekampanje med sosiale medier, Google Ads og influencer-samarbeid for 25 000 kr.',
    type: 'marketing',
    month: 11,
    deadline: 'Måned 12',
    choices: [
      { id: 'full', label: 'Full kampanje', icon: '🎁', cost: 25000, effect: { demand: 50, awareness: 30, reputation: 5 } },
      { id: 'basic', label: 'Basis-pakke', icon: '📦', cost: 10000, effect: { demand: 20, awareness: 12 } },
      { id: 'diy', label: 'Gjør det selv', icon: '🔨', cost: 3000, effect: { demand: 8, awareness: 5 } },
    ],
  },

  // Month 12
  {
    id: 'year_end_review',
    from: 'Revisor',
    fromIcon: '📑',
    subject: 'Årsoppgjør nærmer seg',
    body: 'Husk at årsoppgjøret kommer snart. Gå gjennom alle tall og forbered deg på karaktersettingen. Godt jobbet med første driftsår!',
    type: 'regulatory',
    month: 12,
    choices: [
      { id: 'ack', label: 'Mottatt', icon: '✅', effect: {} },
    ],
  },
]
