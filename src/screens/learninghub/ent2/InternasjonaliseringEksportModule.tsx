import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🌐',
    title: 'Hvorfor internasjonalisere?',
    quote: 'Verden er ett marked — men med mange lokale sannheter.',
    content: 'Internasjonalisering gir vekstmuligheter når hjemmemarkedet er mettet. Drivere: Markedsutvidelse (Norge er lite — 5,5 mill innbyggere), stordriftsfordeler (lavere enhetskostnad ved mer volum), tilgang til ressurser (kompetanse, teknologi, råvarer), risikospredning, valuta-arbitrasje. Norske eksportstjerner: Tomra (95% utlandet), Kongsberg Gruppen (forsvar/maritim), Equinor (olje/gass), Kahoot (læring globalt). Mange norske scaleups må eksportere fra dag én for å skalere.',
    subpoints: [
      { label: 'STORDRIFT', text: 'Skala krever større marked enn Norge.' },
      { label: 'BORN GLOBAL', text: 'Norske scaleups må ofte eksportere fra dag én.' },
    ],
    practical: 'Hva er sterkeste drivkraften for at din bedrift bør internasjonalisere?',
    exercises: [
      {
        id: 'ent219-1-1',
        icon: '🌐',
        title: 'Drivere',
        question: 'Hovedgrunner til internasjonalisering?',
        choices: [
          { id: 'a', label: 'Bare prestige', isCorrect: false, feedback: 'Strategiske grunner.' },
          { id: 'b', label: 'Markedsvekst, stordrift, ressurser, risikospredning', isCorrect: true, feedback: 'Riktig! Klassiske drivere.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
        ],
        espenTip: 'Tomra eksporterer 95% — uten utlandet ville bedriften vært mye mindre.',
      },
      {
        id: 'ent219-1-2',
        icon: '🌐',
        title: 'Born global',
        question: 'Hva er en "born global"-bedrift?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategi.' },
          { id: 'b', label: 'Bedrift som internasjonaliserer fra start, ikke etter mange år', isCorrect: true, feedback: 'Riktig! Scaleup-mønster.' },
          { id: 'c', label: 'Bare stor', isCorrect: false, feedback: 'Mindset.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
        ],
        espenTip: 'Kahoot, Cognite og Oda hadde global ambisjon fra første dag — ikke "først norsk, så ut".',
      },
      {
        id: 'ent219-1-3',
        icon: '🌐',
        title: 'Norge',
        question: 'Hvorfor må mange norske scaleups internasjonalisere tidlig?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'b', label: 'Norge er for lite for skala — 5,5 mill kunder begrenser', isCorrect: true, feedback: 'Riktig! Markedsstørrelse.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsstørrelse.' },
          { id: 'd', label: 'Bare prestisje', isCorrect: false, feedback: 'Strategisk nødvendighet.' },
        ],
        espenTip: 'Norske SaaS-bedrifter: Innenlandsmarkedet kan ikke alene støtte VC-finansiert vekst.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🚪',
    title: 'Etableringsstrategier',
    quote: 'Hvor mye risiko vil du ta?',
    content: 'Inngangsstrategier på en risikoskala: Eksport (lavest risiko, distribuere fra Norge), lisensiering (gi rettigheter mot royalty), franchising (komplett konsept til lokale operatører), Joint Venture (samarbeid med lokal partner), heleid datterselskap (full kontroll, høyest risiko og investering). Valg avhenger av: Marked, ressurser, lokal kompleksitet, kontrollbehov. Norske eksempler: Tomra har egne datterselskaper i 80+ land. Cognite har strategiske JVer. McDonald\'s i Norge er franchising.',
    subpoints: [
      { label: 'TRAPP', text: 'Mange starter med eksport, eskalerer senere.' },
      { label: 'KONTROLL', text: 'Mer kontroll = mer ressurser = mer risiko.' },
    ],
    practical: 'Hvilken inngangsstrategi passer best for din første utenlandssatsning?',
    exercises: [
      {
        id: 'ent219-2-1',
        icon: '🚪',
        title: 'Strategier',
        question: 'Hovedstrategier for internasjonalisering?',
        choices: [
          { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Flere.' },
          { id: 'b', label: 'Eksport, lisensiering, franchising, JV, datterselskap', isCorrect: true, feedback: 'Riktig! Klassisk taksonomi.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategiske valg.' },
        ],
        espenTip: 'Uppsala-modellen: Bedrifter går oftest gradvis fra lav til høy commitment.',
      },
      {
        id: 'ent219-2-2',
        icon: '🚪',
        title: 'JV',
        question: 'Hva er en Joint Venture?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret strategi.' },
          { id: 'b', label: 'Felles eid selskap mellom to eller flere parter for et formål', isCorrect: true, feedback: 'Riktig! Samarbeidsform.' },
          { id: 'c', label: 'Bare lån', isCorrect: false, feedback: 'Eierskap.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Selskapsform.' },
        ],
        espenTip: 'Equinor-Aker BP er klassisk JV. Deler risiko og kompetanse, men koordineringskostnad.',
      },
      {
        id: 'ent219-2-3',
        icon: '🚪',
        title: 'Risikograd',
        question: 'Lavest til høyest risiko?',
        choices: [
          { id: 'a', label: 'Datterselskap først', isCorrect: false, feedback: 'Høyest risiko.' },
          { id: 'b', label: 'Eksport → lisens → franchise → JV → datterselskap', isCorrect: true, feedback: 'Riktig! Risikotrapp.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Risikograd.' },
        ],
        espenTip: 'Også avkastningspotensial øker med risiko — datterselskap gir full kontroll og hele oppsiden.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🌏',
    title: 'Kulturell forståelse (Hofstede)',
    quote: 'Forretning er kultur i praksis.',
    content: 'Geert Hofstede identifiserte seks kulturdimensjoner: Maktdistanse (akseptert ulikhet), individualisme/kollektivisme, maskulinitet/femininitet, usikkerhetsunngåelse, langsiktig orientering, tilfredsstillelse. Norge skårer lavt på maktdistanse og maskulinitet, høyt på individualisme. Japan: Høy maktdistanse, kollektivistisk, langsiktig. USA: Individualistisk, lav usikkerhetsunngåelse, kortsiktig. Kulturkollisjoner i forhandlinger, ledelse og markedsføring kan ødelegge selv gode produkter.',
    subpoints: [
      { label: 'SEKS DIMENSJONER', text: 'Strukturert forståelse av kulturforskjeller.' },
      { label: 'PRAKSIS', text: 'Påvirker forhandling, ledelse, markedsføring, salg.' },
    ],
    practical: 'Hvilket land vil være kulturelt vanskeligst for din bedrift?',
    exercises: [
      {
        id: 'ent219-3-1',
        icon: '🌏',
        title: 'Hofstede',
        question: 'Hvor mange dimensjoner i Hofstedes modell?',
        choices: [
          { id: 'a', label: '2', isCorrect: false, feedback: 'Flere.' },
          { id: 'b', label: '6 (utvidet fra opprinnelig 4)', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: '20', isCorrect: false, feedback: 'For mange.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert tall.' },
        ],
        espenTip: 'Hofstede 1980 — banebrytende studie av 116 000 IBM-ansatte i 50 land.',
      },
      {
        id: 'ent219-3-2',
        icon: '🌏',
        title: 'Norge',
        question: 'Hvor skårer Norge høyt?',
        choices: [
          { id: 'a', label: 'Maktdistanse', isCorrect: false, feedback: 'Lav.' },
          { id: 'b', label: 'Individualisme og femininitet, lav maktdistanse', isCorrect: true, feedback: 'Riktig! Norsk profil.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Kulturelt.' },
        ],
        espenTip: 'Norske ledere må tilpasse stil i mange asiatiske land — direkte tale tolkes som uhøflig.',
      },
      {
        id: 'ent219-3-3',
        icon: '🌏',
        title: 'Bruk',
        question: 'Hvor påvirker kultur forretning?',
        choices: [
          { id: 'a', label: 'Ikke', isCorrect: false, feedback: 'Helt sentralt.' },
          { id: 'b', label: 'Forhandling, salg, ledelse, markedsføring, kontrakter', isCorrect: true, feedback: 'Riktig! Bredt.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Norsk gründer møter japansk partner — start med forretning er feil. Først relasjon, så business.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🎯',
    title: 'Global markedsmiks (glocal)',
    quote: 'Tenk globalt, handle lokalt.',
    content: 'Strategi for tilpasning: Standardisering (samme produkt overalt — stordriftsfordeler) vs lokal tilpasning (skreddersy hvert marked — relevans). Glocal er hybrid: Standard kjerne, lokal innpakning. McDonald\'s standardiserer driftsmodellen, lokaltilpasser menyen (Maharaja Burger i India, McLaks i Norge). Coca-Cola: Samme drikke globalt, lokale kampanjer. Norske bedrifter må vurdere: Hvor er kostnaden av tilpasning verdt det? Marketing er ofte mest lokalt, produkt mest globalt.',
    subpoints: [
      { label: 'AVVEINING', text: 'Stordriftsfordel vs lokal relevans.' },
      { label: 'GLOCAL', text: 'Globalt på struktur, lokalt på utførelse.' },
    ],
    practical: 'Hvor mye av din bedrifts produkt/markedsføring kan være standard globalt?',
    exercises: [
      {
        id: 'ent219-4-1',
        icon: '🎯',
        title: 'Strategier',
        question: 'Hva er valget i global markedsmiks?',
        choices: [
          { id: 'a', label: 'Bare en vei', isCorrect: false, feedback: 'Spektrum.' },
          { id: 'b', label: 'Standardisering vs lokal tilpasning — eller hybrid (glocal)', isCorrect: true, feedback: 'Riktig! Klassisk valg.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
        ],
        espenTip: 'Theodore Levitt 1983: "The Globalization of Markets" — argumenterte for standardisering.',
      },
      {
        id: 'ent219-4-2',
        icon: '🎯',
        title: 'Glocal',
        question: 'Hva er glocal-strategi?',
        choices: [
          { id: 'a', label: 'Bare lokal', isCorrect: false, feedback: 'Hybrid.' },
          { id: 'b', label: 'Global kjerne, lokal tilpasning av relevante elementer', isCorrect: true, feedback: 'Riktig! Hybridmodell.' },
          { id: 'c', label: 'Bare global', isCorrect: false, feedback: 'Hybrid.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
        ],
        espenTip: 'McDonald\'s: Driftsmodellen er global, menyen er lokal. Genial balanse.',
      },
      {
        id: 'ent219-4-3',
        icon: '🎯',
        title: 'Avveining',
        question: 'Hva styrer valget?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'b', label: 'Stordriftsfordel av standardisering vs verdi av lokal relevans', isCorrect: true, feedback: 'Riktig! Klassisk avveining.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Økonomisk.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Strategisk.' },
        ],
        espenTip: 'Tech og pharma: Mer standardisert. Mat og kultur: Mer lokalt. Kjenn din bransje.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📦',
    title: 'Logistikk og toll (Incoterms)',
    quote: 'Hvem betaler hva, og når?',
    content: 'Incoterms er internasjonale regler for ansvar og kostnad i internasjonal handel. Sentrale: EXW (Ex Works — kjøper henter), FOB (Free on Board — selger leverer til havn), CIF (Cost, Insurance, Freight — selger betaler til kunde-havn), DDP (Delivered Duty Paid — selger betaler alt til kundens dør). EU/EØS-fri: Norske bedrifter slipper toll for de fleste varer. Andre land: Tollavtaler påvirker konkurransekraft. Bruk speditører for kompliserte forsendelser (DHL, DSV).',
    subpoints: [
      { label: 'INCOTERMS', text: 'Standardregler unngår tvister.' },
      { label: 'EØS', text: 'Norsk EØS-medlemskap er stort konkurransefortrinn.' },
    ],
    practical: 'Hvilke Incoterms bruker bedriften din i sine eksportkontrakter?',
    exercises: [
      {
        id: 'ent219-5-1',
        icon: '📦',
        title: 'Incoterms',
        question: 'Hva er Incoterms?',
        choices: [
          { id: 'a', label: 'Bare valuta', isCorrect: false, feedback: 'Annet.' },
          { id: 'b', label: 'Standardiserte regler for ansvar og kostnad i internasjonal handel', isCorrect: true, feedback: 'Riktig! ICC-standard.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Avtaleregler.' },
        ],
        espenTip: 'Oppdateres med jevne mellomrom (siste 2020). Velg riktig Incoterm — store økonomiske konsekvenser.',
      },
      {
        id: 'ent219-5-2',
        icon: '📦',
        title: 'EXW vs DDP',
        question: 'Forskjell på EXW og DDP?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Motsetninger.' },
          { id: 'b', label: 'EXW: kjøper bærer alt. DDP: selger bærer alt fram til kundens dør', isCorrect: true, feedback: 'Riktig! Endepunktene.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konkret skille.' },
        ],
        espenTip: 'EXW = enkleste for selger. DDP = enkleste for kjøper. Velg basert på erfaring.',
      },
      {
        id: 'ent219-5-3',
        icon: '📦',
        title: 'EØS',
        question: 'Hva betyr EØS for norsk eksport?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk verdi.' },
          { id: 'b', label: 'Tollfri tilgang til EU-marked på 450 mill kunder', isCorrect: true, feedback: 'Riktig! Stort fortrinn.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Handelsavtale.' },
          { id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Alle eksportører.' },
        ],
        espenTip: '70% av norsk eksport går til EU. EØS gir tilgang som ikke-medlemmer som Storbritannia mistet.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '💱',
    title: 'Internasjonal prising',
    quote: 'Pris er strategi, ikke regning.',
    content: 'Internasjonal prising kompliseres av: Valutasvingninger, ulik kjøpekraft (BNP per capita), lokale konkurrenter, tollkostnader, distribusjonskostnader. Strategier: Kostnads-pluss (legg margin på kostnad — enkelt, ignorerer marked), markedsbasert (hva betaler markedet?), differensiert (samme produkt, ulik pris per land). Transfer pricing: Internprising mellom datterselskaper — strenge skatteregler hindrer skattetilpasning. Skatteetaten følger nøye med.',
    subpoints: [
      { label: 'KJØPEKRAFT', text: 'Samme dollar betyr ulikt i ulike land.' },
      { label: 'TRANSFER', text: 'Internprising er regulert — armlengdes prinsipp.' },
    ],
    practical: 'Hvordan setter din bedrift pris i nye markeder?',
    exercises: [
      {
        id: 'ent219-6-1',
        icon: '💱',
        title: 'Strategier',
        question: 'Hovedmetoder for prising?',
        choices: [
          { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Flere.' },
          { id: 'b', label: 'Kostnads-pluss, markedsbasert, differensiert', isCorrect: true, feedback: 'Riktig! Tre standardmetoder.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
        ],
        espenTip: 'Markedsbasert er ofte best — men krever kunnskap om hvert lokalt marked.',
      },
      {
        id: 'ent219-6-2',
        icon: '💱',
        title: 'Transfer',
        question: 'Hva er transfer pricing?',
        choices: [
          { id: 'a', label: 'Bare valuta', isCorrect: false, feedback: 'Internprising.' },
          { id: 'b', label: 'Internprising mellom datterselskaper i ulike land', isCorrect: true, feedback: 'Riktig! Skatte-relevant.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konkret begrep.' },
        ],
        espenTip: 'Armlengdes-prinsipp: Pris som om det var uavhengige parter. Skatteetaten reviderer aktivt.',
      },
      {
        id: 'ent219-6-3',
        icon: '💱',
        title: 'Dumping',
        question: 'Hva er prisdumping?',
        choices: [
          { id: 'a', label: 'Bare lavt', isCorrect: false, feedback: 'Mer presist.' },
          { id: 'b', label: 'Eksportere til lavere pris enn hjemmemarkedet — kan utløse anti-dumping-toll', isCorrect: true, feedback: 'Riktig! Handelspolitikk.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Handelspraksis.' },
        ],
        espenTip: 'Norsk laks har vært utsatt for anti-dumping-tiltak fra USA og EU. Stort konfliktpotensial.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '💻',
    title: 'Digital internasjonalisering',
    quote: 'Internett gjør verden mindre.',
    content: 'Digital internasjonalisering: Netthandel, SaaS, app-stores gjør det lettere enn noen gang å nå globale kunder uten fysisk tilstedeværelse. Lavere terskel, raskere skalering. Verktøy: Lokalisert nettside (språk, valuta, betalingsmetoder), digital markedsføring (Google, Facebook, TikTok per marked), kundeservice i tidssoner. Norske succes-historier: Spond (lagidrett, globalt), Kahoot (SaaS, 200+ land), Vivaldi (nettleser). Men: Konkurranse er også global og hardere.',
    subpoints: [
      { label: 'TERSKEL', text: 'Lavere kapital krevd enn fysisk ekspansjon.' },
      { label: 'KONKURRANSE', text: 'Også konkurransen er global — Amazon, Google overalt.' },
    ],
    practical: 'Selger din bedrift digitalt utenlands i dag?',
    exercises: [
      {
        id: 'ent219-7-1',
        icon: '💻',
        title: 'Fordel',
        question: 'Hovedfordel ved digital internasjonalisering?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret fordel.' },
          { id: 'b', label: 'Lavere kapital og raskere skalering enn fysisk tilstedeværelse', isCorrect: true, feedback: 'Riktig! Hovedfortrinn.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturell fordel.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Kahoot vokste fra norsk start til 200+ land i hovedsak digitalt.',
      },
      {
        id: 'ent219-7-2',
        icon: '💻',
        title: 'Lokalisering',
        question: 'Hva må lokaliseres digitalt?',
        choices: [
          { id: 'a', label: 'Bare språk', isCorrect: false, feedback: 'Mer.' },
          { id: 'b', label: 'Språk, valuta, betalingsmetoder, juridiske vilkår, kundeservice', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Tyske kunder vil ha tyske vilkår, EUR-pris, og rask kundeservice på tysk. Hver detalj teller.',
      },
      {
        id: 'ent219-7-3',
        icon: '💻',
        title: 'Utfordring',
        question: 'Hva er ulempen?',
        choices: [
          { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Konkurranse skjerpes.' },
          { id: 'b', label: 'Lav inngangsterskel = også konkurransen er global og hard', isCorrect: true, feedback: 'Riktig! Begge veier.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret utfordring.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Markedseffekt.' },
        ],
        espenTip: 'I SaaS-bransjen kjemper norske startups mot Salesforce, Microsoft og 1000 andre globalt.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Risiko ute',
    quote: 'Det som er greit i Norge er ikke greit overalt.',
    content: 'Internasjonale risikoer: Politisk risiko (regjeringsskifter, sanksjoner — Russland-Ukraina rammet mange norske bedrifter), korrupsjon (særlig i u-land, men Norge straffer norske selskaper for korrupsjon globalt), juridiske forskjeller (kontrakter tolkes ulikt), kulturelle feilskritt, valutarisiko, leveransekjede-risiko. Verktøy: Politisk risikovurdering (Marsh, Aon), kredittforsikring, eksportkredittgaranti (GIEK/Eksfin). Norske bedrifter trakk seg fra Russland 2022 — kostbart men nødvendig.',
    subpoints: [
      { label: 'POLITIKK', text: 'Geopolitikk endrer markedstilgang fort.' },
      { label: 'STØTTE', text: 'Eksfin (tidligere GIEK) gir garantier mot eksportrisiko.' },
    ],
    practical: 'Hvilken type risiko er størst i ditt målmarked?',
    exercises: [
      {
        id: 'ent219-8-1',
        icon: '⚠️',
        title: 'Risikoer',
        question: 'Hovedrisikoer ved internasjonalisering?',
        choices: [
          { id: 'a', label: 'Bare valuta', isCorrect: false, feedback: 'Mange typer.' },
          { id: 'b', label: 'Politisk, korrupsjon, juridisk, kultur, valuta, leveransekjede', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Bredt risikobilde.' },
        ],
        espenTip: 'Russland-2022 viste hvor fort markedstilgang kan forsvinne. Norske bedrifter tapte milliarder.',
      },
      {
        id: 'ent219-8-2',
        icon: '⚠️',
        title: 'Eksfin',
        question: 'Hva er Eksfin?',
        choices: [
          { id: 'a', label: 'Bare bank', isCorrect: false, feedback: 'Statlig garantist.' },
          { id: 'b', label: 'Statlig eksportkredittgaranti — beskytter mot risiko ved eksport', isCorrect: true, feedback: 'Riktig! Eksportstøtte.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret institusjon.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Eksportverktøy.' },
        ],
        espenTip: 'Tidligere GIEK + Eksportkreditt Norge slått sammen. Stort verktøy for norsk eksportindustri.',
      },
      {
        id: 'ent219-8-3',
        icon: '⚠️',
        title: 'Korrupsjon',
        question: 'Hva er regelen om norsk korrupsjons-straff?',
        choices: [
          { id: 'a', label: 'Bare i Norge', isCorrect: false, feedback: 'Globalt.' },
          { id: 'b', label: 'Norske bedrifter kan straffes for korrupsjon hvor som helst i verden', isCorrect: true, feedback: 'Riktig! Ekstraterritoriell jurisdiksjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Lovbestemmelse.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikk regel.' },
        ],
        espenTip: 'Yara fikk 295 mill kr i bot for korrupsjon i Libya og India — straffet i Norge.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '🤝',
    title: 'Norsk eksportstøtte',
    quote: 'Norge satser på næringslivet ute.',
    content: 'Innovasjon Norge: Markedsavklaring, internasjonal vekst, profilering. Tilskudd og rådgivning. Eksfin: Eksportkredittgarantier og lån. Norway House i flere land: Felles base for norske bedrifter. Industri- og næringsministerens delegasjoner. Næringslivets Hovedorganisasjon (NHO): Internasjonalt nettverk. Sjømatrådet: Spesialisert på sjømat. Disse støtteordningene er konkurransefortrinn — mange land har dårligere systemer. Bruk dem aktivt.',
    subpoints: [
      { label: 'INFRASTRUKTUR', text: 'Norge har omfattende støtteapparat.' },
      { label: 'NYTTE', text: 'Mange små bedrifter utnytter ikke dette nok.' },
    ],
    practical: 'Hvilken eksportstøtte har bedriften din benyttet?',
    exercises: [
      {
        id: 'ent219-9-1',
        icon: '🤝',
        title: 'IN',
        question: 'Hva tilbyr Innovasjon Norge for eksport?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Mer enn jus.' },
          { id: 'b', label: 'Tilskudd, rådgivning, internasjonal kontorinfrastruktur', isCorrect: true, feedback: 'Riktig! Helhetlig støtte.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lån', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'IN-kontorer i 30+ land. Lav terskel for å få første samtale.',
      },
      {
        id: 'ent219-9-2',
        icon: '🤝',
        title: 'Spesialiserte',
        question: 'Hva er Sjømatrådet?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret organisasjon.' },
          { id: 'b', label: 'Statlig finansiert organ for promotering av norsk sjømat globalt', isCorrect: true, feedback: 'Riktig! Sektor-spesifikk støtte.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsføring.' },
          { id: 'd', label: 'Bare bank', isCorrect: false, feedback: 'Promotering.' },
        ],
        espenTip: 'Finansieres av eksportavgift på sjømat. Effektiv markedsføring av norsk laks globalt.',
      },
      {
        id: 'ent219-9-3',
        icon: '🤝',
        title: 'Bruk',
        question: 'Hvorfor bruke disse støtteordningene?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'b', label: 'Reduserer risiko, gir markedsadgang, finansiering', isCorrect: true, feedback: 'Riktig! Praktisk verdi.' },
          { id: 'c', label: 'Bare PR', isCorrect: false, feedback: 'Reell støtte.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Konkurrenter i andre land har ofte ikke like sterke offentlige støtteordninger. Utnytt fortrinnet.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Suksesskriterier for internasjonalisering',
    quote: 'Forberedelse + tålmodighet + tilpasning = suksess.',
    content: 'Forskning på vellykket internasjonalisering peker på: Tydelig verdiløfte tilpasset markedet, sterk lokal partner eller team, langsiktig kapital (3-5 år før breakeven typisk), kulturell ydmykhet, tilpassing av produkt og kommunikasjon, tålmodighet og iterativ læring. Vanlige feil: Undervurdere lokale forskjeller, gi opp for tidlig, ikke gi nok ressurser. Norske eksportstjerner som Tomra brukte 10+ år på flere markeder før de tok av. Internasjonalisering er ikke et prosjekt — det er en investeringsstrategi.',
    subpoints: [
      { label: 'TÅLMODIGHET', text: 'Forvent 3-5 år før breakeven i nytt marked.' },
      { label: 'YDMYKHET', text: 'Du vet mindre om markedet enn du tror.' },
    ],
    practical: 'Hva er din realistiske tidshorisont for første utenlandsmarked?',
    exercises: [
      {
        id: 'ent219-10-1',
        icon: '🏆',
        title: 'Suksess',
        question: 'Sentrale suksesskriterier?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Bredere.' },
          { id: 'b', label: 'Tydelig verdi, lokal kompetanse, langsiktig kapital, tilpasning, tålmodighet', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategiske.' },
        ],
        espenTip: 'Mange norske bedrifter feiler i USA fordi de undervurderer hvor lokal salg-prosessen er.',
      },
      {
        id: 'ent219-10-2',
        icon: '🏆',
        title: 'Feil',
        question: 'Vanligste feil ved internasjonalisering?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Klassiske feil.' },
          { id: 'b', label: 'Undervurdere kultur, gi opp for tidlig, for lite ressurser', isCorrect: true, feedback: 'Riktig! Tre vanlige fallgruver.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategiske feil.' },
          { id: 'd', label: 'Bare prising', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'Mange gir opp etter 6-12 måneder i nytt marked. Vanligvis for tidlig — bygg trenger tid.',
      },
      {
        id: 'ent219-10-3',
        icon: '🏆',
        title: 'Mindset',
        question: 'Hva er rett mindset?',
        choices: [
          { id: 'a', label: 'Bare prosjekt', isCorrect: false, feedback: 'Større.' },
          { id: 'b', label: 'Internasjonalisering er strategisk investering, ikke eksperiment', isCorrect: true, feedback: 'Riktig! Langsiktig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategi.' },
        ],
        espenTip: 'Tomra brukte 15 år på Tyskland før det blomstret. Først i USA tok 20 år. Tålmodighet betaler.',
      },
    ],
  },
]

export default function InternasjonaliseringEksportModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-19"
      moduleTitle="Internasjonalisering og eksport"
      moduleIcon="🌐"
      storageKey="learning-ent2-internasjonalisering-eksport"
      completeRoute="/learning/ent2/internasjonalisering-eksport/complete"
      phases={phases}
      intro="Veien ut av Norge — markedsvalg, eksportstrategier og tilpasning til nye kulturer."
      vissteduAt="Norge eksporterer for over 2000 milliarder kroner årlig. Tomra, Equinor, Kongsberg og Kahoot er eksempler på bedrifter som har lykkes globalt fra Norge."
      espenSier="Internasjonalisering er ikke et prosjekt — det er en strategisk investering. Forvent at det tar 3-5 år før første utlandssuksess kommer."
      presentationLink={{ route: '/learning/presentations/ent2/internasjonalisering-eksport', description: 'Internasjonalisering og eksport — 10 slides' }}
    />
  )
}
