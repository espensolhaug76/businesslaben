import type { NewsArticle } from '../types/Desktop'

export const newsTemplates: Omit<NewsArticle, 'read'>[] = [
  // Month 1
  {
    id: 'news_startup_boom',
    category: 'economic',
    categoryIcon: '💰',
    headline: 'Rekordmange gründere i Norge',
    body: 'Antall nye bedrifter har økt med 23% siste år. Konkurransen er tøff, men mulighetene er mange for de som satser riktig.',
    effect: 'Flere konkurrenter i markedet',
    tip: 'Differensier deg fra konkurrentene med unikt sortiment eller sterk merkevare',
    month: 1,
  },
  {
    id: 'news_digital_trend',
    category: 'technological',
    categoryIcon: '🤖',
    headline: 'Netthandel vokser 30% per år',
    body: 'Norske forbrukere handler stadig mer på nett. Eksperter anbefaler alle butikker å ha en digital strategi.',
    effect: 'Nettbutikk blir viktigere',
    tip: 'Vurder å åpne nettbutikk hvis du ikke har det allerede',
    month: 1,
  },

  // Month 2
  {
    id: 'news_sustainability',
    category: 'social',
    categoryIcon: '🌱',
    headline: 'Bærekraft er årets største trend',
    body: 'Ungdom krever miljøvennlige produkter. 67% sier de vil betale mer for bærekraftige varer. Bedrifter som satser grønt ser økt etterspørsel.',
    effect: '+30% etterspørsel for miljøvennlige produkter',
    tip: 'Markedsfør miljøprofil eller bytt til bærekraftige leverandører',
    month: 2,
  },

  // Month 3
  {
    id: 'news_rent_increase',
    category: 'economic',
    categoryIcon: '💰',
    headline: 'Norges Bank hever renten til 4,5%',
    body: 'Sentralbanken hever styringsrenten. Eksperter frykter lavere forbruk og dyrere lån for bedrifter.',
    effect: 'Kjøpekraft kan synke -10% neste måned',
    tip: 'Vurder å justere prisene eller øke markedsføringen for å opprettholde salget',
    month: 3,
  },
  {
    id: 'news_influencer_economy',
    category: 'social',
    categoryIcon: '📱',
    headline: 'Influencer-markedsføring dobles i verdi',
    body: 'Nordmenn stoler mer på influencere enn tradisjonell reklame. Bedrifter som bruker influencere rapporterer 3x bedre avkastning enn TV-reklame.',
    effect: 'Influencer-kanal mer effektiv',
    tip: 'Invester i influencer-markedsføring for å nå unge kunder',
    month: 3,
  },

  // Month 4
  {
    id: 'news_supply_chain',
    category: 'economic',
    categoryIcon: '🚢',
    headline: 'Forsinkelser i globale forsyningskjeder',
    body: 'Havnearbeiderstreik i Europa skaper forsinkelser. Leveringstider kan øke med 2-3 uker for importvarer.',
    effect: 'Mulige leveringsforsinkelser',
    tip: 'Hold ekstra lager som buffer. Bestill varer i god tid',
    month: 4,
  },

  // Month 5
  {
    id: 'news_new_regulation',
    category: 'political',
    categoryIcon: '⚖️',
    headline: 'Ny emballasjeavgift vedtatt',
    body: 'Stortinget har vedtatt ny avgift på plastemballasje fra juni. Alle bedrifter må betale 3 kr ekstra per produkt med plastemballasje.',
    effect: '+3 kr per produkt i avgift fra juni',
    tip: 'Vurder å bytte til miljøvennlig emballasje for å unngå avgiften',
    month: 5,
  },

  // Month 6
  {
    id: 'news_competitor_ai',
    category: 'technological',
    categoryIcon: '🤖',
    headline: 'Stor konkurrent lanserer AI-nettbutikk',
    body: 'Et ledende klesmerke bruker nå AI for personlige anbefalinger. Analytikere sier dette kan endre bransjen fundamentalt.',
    effect: 'Digitale konkurrenter blir sterkere',
    tip: 'Fokuser på personlig service og unike produkter som skiller deg ut',
    month: 6,
  },
  {
    id: 'news_summer_spending',
    category: 'economic',
    categoryIcon: '☀️',
    headline: 'Nordmenn bruker mer penger om sommeren',
    body: 'Feriepenger og godt vær fører til økt forbruk. Detaljhandelen forventer 20% vekst i sommer-kvartalene.',
    effect: '+20% etterspørsel i sommermånedene',
    tip: 'Fyll opp lageret og kjør sommarkampanjer',
    month: 6,
  },

  // Month 7
  {
    id: 'news_consumer_confidence',
    category: 'economic',
    categoryIcon: '📊',
    headline: 'Forbrukertilliten synker',
    body: 'SSB melder at forbrukertillitsindeksen er på laveste nivå på 3 år. Nordmenn planlegger å kutte forbruk.',
    effect: 'Risiko for lavere etterspørsel',
    tip: 'Fokuser på verdi for pengene og unngå prisøkninger nå',
    month: 7,
  },

  // Month 8
  {
    id: 'news_social_commerce',
    category: 'technological',
    categoryIcon: '📱',
    headline: 'Instagram lanserer butikk-funksjon i Norge',
    body: 'Nå kan norske bedrifter selge direkte gjennom Instagram. Eksperter kaller det "den største endringen for småbedrifter siden nettbutikken".',
    effect: 'Instagram-markedsføring mer effektiv',
    tip: 'Øk Instagram-budsjettet for å utnytte den nye funksjonen',
    month: 8,
  },

  // Month 9
  {
    id: 'news_autumn_trends',
    category: 'social',
    categoryIcon: '🍂',
    headline: 'Høstens trender: Retro og vintage er tilbake',
    body: 'Forbrukere søker nostalgiske og tidløse produkter. Vintage-stilen dominerer både mote og interiør denne sesongen.',
    effect: 'Endring i etterspørselsmønster',
    tip: 'Juster sortimentet etter sesongtrender',
    month: 9,
  },

  // Month 10
  {
    id: 'news_black_friday',
    category: 'industry',
    categoryIcon: '🏷️',
    headline: 'Black Friday: Rekordhandel forventes',
    body: 'Handelsstand Norge melder at årets Black Friday kan slå alle rekorder. Forbrukere har spart opp og venter på tilbud.',
    effect: 'Høy etterspørsel i november',
    tip: 'Forbered lager og kampanjer for Black Friday-rushet',
    month: 10,
  },

  // Month 11
  {
    id: 'news_christmas_rush',
    category: 'industry',
    categoryIcon: '🎄',
    headline: 'Julehandelen i gang - rekordtidlig!',
    body: 'Nordmenn starter julehandelen tidligere enn noensinne. Butikkene melder om 35% økning i salg sammenlignet med forrige november.',
    effect: '+35% etterspørsel i julesesongen',
    tip: 'Sørg for å ha nok varer på lager. Kjør julekampanjer.',
    month: 11,
  },

  // Month 12
  {
    id: 'news_year_review',
    category: 'economic',
    categoryIcon: '📈',
    headline: 'Årsoppsummering: Sterk vekst for gründere',
    body: 'Tross utfordringer har norske gründere vist stor motstandskraft. De beste har tilpasset seg trender og holdt kundene fornøyde.',
    effect: 'Årsoppgjør nærmer seg',
    tip: 'Gjennomgå årets resultater og planlegg for neste år',
    month: 12,
  },
  {
    id: 'news_new_year_outlook',
    category: 'economic',
    categoryIcon: '🔮',
    headline: 'Prognose 2026: Hva venter?',
    body: 'Økonomiske eksperter spår moderat vekst neste år. Bærekraft, digitalisering og personlig service vil være nøklene til suksess.',
    effect: 'Strategivalg for neste år',
    tip: 'Vurder hva som fungerte i år og hva du bør endre',
    month: 12,
  },
]
