import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Hva er ledelse?',
    quote: 'Ledelse er å skape resultater gjennom andre.',
    content: 'Ledelse handler om å påvirke mennesker mot et felles mål. Skiller seg fra administrasjon (struktur og rutine) ved å være retningsgivende. Henry Mintzberg beskrev ti lederroller — fra talsperson til konfliktløser. I norsk kontekst er ledelse ofte preget av flat struktur, høy tillit og involvering. En leder i Equinor må balansere strategiske valg, mennesker og resultater hver dag.',
    subpoints: [
      { label: 'PÅVIRKE', text: 'Ledelse er ikke posisjon, men evne til å bevege andre.' },
      { label: 'NORSK', text: 'Flat struktur og involvering — ikke autoritær kommandolinje.' },
    ],
    practical: 'Hva er din definisjon av god ledelse — basert på en sjef du har hatt?',
    exercises: [
      {
        id: 'ent214-1-1',
        icon: '🎯',
        title: 'Definisjon',
        question: 'Hva er kjernen i ledelse?',
        choices: [
          { id: 'a', label: 'Bare administrasjon', isCorrect: false, feedback: 'Det er rutinedrift.' },
          { id: 'b', label: 'Påvirke andre mot felles mål', isCorrect: true, feedback: 'Riktig! Kjerneoppgaven.' },
          { id: 'c', label: 'Bare gi ordre', isCorrect: false, feedback: 'For snevert.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert rolle.' },
        ],
        espenTip: 'Mintzberg: Ledelse er en blanding av roller — ikke bare beslutninger.',
      },
      {
        id: 'ent214-1-2',
        icon: '🎯',
        title: 'Norsk stil',
        question: 'Hva kjennetegner norsk lederstil?',
        choices: [
          { id: 'a', label: 'Streng autoritet', isCorrect: false, feedback: 'Sjelden i Norge.' },
          { id: 'b', label: 'Flat struktur, tillit, involvering', isCorrect: true, feedback: 'Riktig! Hofstede bekreftet.' },
          { id: 'c', label: 'Hierarkisk kommandolinje', isCorrect: false, feedback: 'Mer typisk for andre kulturer.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
        ],
        espenTip: 'Lav maktdistanse i Hofstedes modell — ansatte forventer å bli hørt.',
      },
      {
        id: 'ent214-1-3',
        icon: '🎯',
        title: 'Forskjell',
        question: 'Ledelse vs administrasjon?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjellige roller.' },
          { id: 'b', label: 'Ledelse = retning og endring, admin = struktur og drift', isCorrect: true, feedback: 'Riktig! Kotter-skillet.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Funksjonell forskjell.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt skille.' },
        ],
        espenTip: 'John Kotter: Bedrifter trenger begge — for mye admin gir stagnasjon, for mye ledelse gir kaos.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔄',
    title: 'Situasjonsbestemt ledelse',
    quote: 'Tilpass stilen til menneske og oppgave.',
    content: 'Hersey og Blanchards modell: Lederstil må tilpasses medarbeiderens modenhet. Fire stiler: Instruerende (lav modenhet — gi klare ordre), Selgende (lav-medium — forklar og motiver), Deltakende (medium-høy — involver), Delegerende (høy modenhet — gi ansvar). En ny ansatt trenger instruks; en erfaren senior trenger delegering. Samme leder, ulik stil per situasjon.',
    subpoints: [
      { label: 'TILPASS', text: 'Ingen lederstil passer alle.' },
      { label: 'MODENHET', text: 'Vurder kompetanse og motivasjon hos den enkelte.' },
    ],
    practical: 'Hvilken lederstil passer best for deg som medarbeider akkurat nå?',
    exercises: [
      {
        id: 'ent214-2-1',
        icon: '🔄',
        title: 'Modell',
        question: 'Hersey/Blanchards fire stiler?',
        choices: [
          { id: 'a', label: 'Bare en stil', isCorrect: false, feedback: 'Fire stiler.' },
          { id: 'b', label: 'Instruerende, selgende, deltakende, delegerende', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: 'Bare to', isCorrect: false, feedback: 'Fire kvadranter.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Hersey og Blanchard 1969 — fortsatt brukt i lederutvikling.',
      },
      {
        id: 'ent214-2-2',
        icon: '🔄',
        title: 'Bruk',
        question: 'Ny lærling — hvilken stil?',
        choices: [
          { id: 'a', label: 'Delegering', isCorrect: false, feedback: 'For tidlig.' },
          { id: 'b', label: 'Instruerende — klare ordre og tett oppfølging', isCorrect: true, feedback: 'Riktig! Lav modenhet.' },
          { id: 'c', label: 'Bare la stå', isCorrect: false, feedback: 'Trenger struktur.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Tilpasset stil.' },
        ],
        espenTip: 'Nye trenger trygghet og rammer før de kan ta ansvar.',
      },
      {
        id: 'ent214-2-3',
        icon: '🔄',
        title: 'Senior',
        question: 'Erfaren utvikler — hvilken stil?',
        choices: [
          { id: 'a', label: 'Instruerende', isCorrect: false, feedback: 'Demotiverende.' },
          { id: 'b', label: 'Delegerende — gi ansvar og frihet', isCorrect: true, feedback: 'Riktig! Høy modenhet.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Tilpasset.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Ledelsesvalg.' },
        ],
        espenTip: 'Mikrostyring av seniorer fører til at de slutter — Equinor og DNB ser dette ofte.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '✨',
    title: 'Transformasjonsledelse',
    quote: 'Inspirer mennesker forbi det de trodde var mulig.',
    content: 'Bernard Bass utviklet teorien: Transformasjonsledere skaper visjon, inspirerer ansatte og utfordrer dem intellektuelt. Fire I-er: Idealisert innflytelse (rollemodell), Inspirerende motivasjon (visjon), Intellektuell stimulering (utfordre tenkning), Individuell oppmerksomhet (se hver enkelt). Motsatsen er transaksjonsledelse — bytte ytelse mot belønning. Steve Jobs og Johan H. Andresen er transformasjonsledere.',
    subpoints: [
      { label: 'VISJON', text: 'Mål som er større enn dagens drift.' },
      { label: 'PERSONLIG', text: 'Se hver enkelt medarbeiders potensial.' },
    ],
    practical: 'Hvem er den mest inspirerende lederen du har sett — og hva gjorde hen?',
    exercises: [
      {
        id: 'ent214-3-1',
        icon: '✨',
        title: 'Bass',
        question: 'Hva kjennetegner transformasjonsledelse?',
        choices: [
          { id: 'a', label: 'Bare bytte', isCorrect: false, feedback: 'Det er transaksjon.' },
          { id: 'b', label: 'Visjon, inspirasjon, intellektuell stimulering, individuell omtanke', isCorrect: true, feedback: 'Riktig! Bass fire I-er.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Mer enn belønning.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Bass viste empirisk at transformasjonsledere får høyere innsats enn transaksjonsledere.',
      },
      {
        id: 'ent214-3-2',
        icon: '✨',
        title: 'Motsats',
        question: 'Hva er transaksjonsledelse?',
        choices: [
          { id: 'a', label: 'Visjon-styrt', isCorrect: false, feedback: 'Det er transformasjon.' },
          { id: 'b', label: 'Belønning og straff for ytelse — bytte', isCorrect: true, feedback: 'Riktig! Klassisk gulrot/pisk.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert tilnærming.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Ledelsesform.' },
        ],
        espenTip: 'Begge kan være effektive — transaksjon i kriser, transformasjon i vekst.',
      },
      {
        id: 'ent214-3-3',
        icon: '✨',
        title: 'Eksempel',
        question: 'Hvorfor er Steve Jobs et eksempel?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Ikke poenget.' },
          { id: 'b', label: 'Inspirerte medarbeidere til å skape produkter de ikke trodde var mulig', isCorrect: true, feedback: 'Riktig! Reality distortion field.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisst ledelse.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Ekte påvirkning.' },
        ],
        espenTip: 'Walter Isaacsons biografi viser begge sider — inspirerende OG krevende. Realistisk bilde.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🏛️',
    title: 'Bedriftskultur som konkurransefortrinn',
    quote: 'Kultur spiser strategi til frokost.',
    content: 'Edgar Schein: Kultur er delte verdier, normer og antakelser. Tre nivåer: Artefakter (synlige — lokaler, klesstil), uttalte verdier (visjon, mantra), grunnleggende antakelser (det usagte). Sterk kultur kan være konkurransefortrinn (Patagonia, Stormberg) eller felle (Nokia ble konservativ og misset smarttelefoner). Norske scaleups som Cognite og Kahoot har bevisst kulturarbeid.',
    subpoints: [
      { label: 'USYNLIG', text: 'Kultur er det som skjer når sjefen ikke ser på.' },
      { label: 'BYGGES', text: 'Hva belønner du, hva fyrer du folk for, hva tolererer du.' },
    ],
    practical: 'Hva sier kulturen i bedriften din at folk faktisk verdsetter?',
    exercises: [
      {
        id: 'ent214-4-1',
        icon: '🏛️',
        title: 'Schein',
        question: 'Scheins tre kulturnivåer?',
        choices: [
          { id: 'a', label: 'Bare verdier', isCorrect: false, feedback: 'Tre nivåer.' },
          { id: 'b', label: 'Artefakter, uttalte verdier, grunnleggende antakelser', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: 'Bare logo', isCorrect: false, feedback: 'Det er artefakt.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Schein 1985 — fortsatt referansemodell for organisasjonskultur.',
      },
      {
        id: 'ent214-4-2',
        icon: '🏛️',
        title: 'Drucker',
        question: 'Hva betyr "culture eats strategy for breakfast"?',
        choices: [
          { id: 'a', label: 'Kultur er ikke viktig', isCorrect: false, feedback: 'Tvert imot.' },
          { id: 'b', label: 'God strategi feiler hvis kulturen ikke støtter den', isCorrect: true, feedback: 'Riktig! Klassisk Drucker.' },
          { id: 'c', label: 'Strategi er viktigst', isCorrect: false, feedback: 'Drucker mente motsatt.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk innsikt.' },
        ],
        espenTip: 'Mange omstillinger feiler ikke fordi planen var feil — kulturen blokkerer.',
      },
      {
        id: 'ent214-4-3',
        icon: '🏛️',
        title: 'Norge',
        question: 'Hvorfor er Cognite et kulturforbilde?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'b', label: 'Sterk teknisk kultur og høy autonomi tiltrekker eliteutviklere', isCorrect: true, feedback: 'Riktig! Konkurransefortrinn.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisst arbeid.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Kulturelt valg.' },
        ],
        espenTip: 'Cognite konkurrerer mot Google og Apple om talent — kultur er deres lokking.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🚀',
    title: 'Teamledelse i vekstbedrifter',
    quote: 'Det som funket på 5 ansatte funker ikke på 50.',
    content: 'Vekstbedrifter går gjennom kriseterskler — særlig ved 10, 30, 100 og 300 ansatte. Greiners vekstmodell beskriver fem faser: kreativitet, retning, delegering, koordinering, samarbeid — hver med egen krise. Lederen må endre stil etter hvert. Tuckmans modell (forming, storming, norming, performing) gjelder også når team vokser. Norske scaleups som Kahoot og Oda har erfart denne smerten.',
    subpoints: [
      { label: 'TERSKLER', text: 'Veksthopp krever omorganisering.' },
      { label: 'STIL', text: 'Gründer-stil må modnes etterhvert.' },
    ],
    practical: 'Hvilken vekstkrise er bedriften din i nå?',
    exercises: [
      {
        id: 'ent214-5-1',
        icon: '🚀',
        title: 'Greiner',
        question: 'Hva beskriver Greiners modell?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Vekstfaser.' },
          { id: 'b', label: 'Fem vekstfaser med tilhørende ledelseskriser', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'd', label: 'Bare design', isCorrect: false, feedback: 'Vekstmodell.' },
        ],
        espenTip: 'Larry Greiner 1972, fortsatt brukt for å forstå skaleringssmerter.',
      },
      {
        id: 'ent214-5-2',
        icon: '🚀',
        title: 'Tuckman',
        question: 'Tuckmans fire teamfaser?',
        choices: [
          { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Fire (egentlig fem med adjourning).' },
          { id: 'b', label: 'Forming, storming, norming, performing', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare to', isCorrect: false, feedback: 'Fire faser.' },
        ],
        espenTip: 'Storming er normalt — team uten konflikt har ikke nådd norming-fasen.',
      },
      {
        id: 'ent214-5-3',
        icon: '🚀',
        title: 'Eksempel',
        question: 'Hvorfor måtte Kahoot endre lederstil?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Skalering krevde det.' },
          { id: 'b', label: 'Vokste fra startup til 250+ ansatte — krever struktur og mellomledere', isCorrect: true, feedback: 'Riktig! Klassisk skalerings-utfordring.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Strukturell endring.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Ledelsesvalg.' },
        ],
        espenTip: 'Gründer som beholder all beslutningsmakt ved 100 ansatte = flaskehals. Må delegere.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '⚡',
    title: 'Makt og innflytelse',
    quote: 'Makt er evnen til å påvirke andre.',
    content: 'French og Raven: Fem typer makt — Posisjonsmakt (formell rolle), Belønningsmakt (kan gi goder), Tvangsmakt (kan straffe), Ekspertmakt (kunnskap), Referansemakt (folk vil bli som deg). Beste ledere bruker ekspert- og referansemakt mer enn posisjon. Nordmenn reagerer dårlig på rå posisjonsmakt — krever tillit og legitimitet. En CEO som bruker tvangsmakt mister team raskt.',
    subpoints: [
      { label: 'TYPER', text: 'Ulike maktbaser fungerer i ulike situasjoner.' },
      { label: 'NORSK', text: 'Posisjon alene gir ikke autoritet i Norge.' },
    ],
    practical: 'Hvilken type makt bruker du selv mest i jobben?',
    exercises: [
      {
        id: 'ent214-6-1',
        icon: '⚡',
        title: 'French/Raven',
        question: 'Fem maktbaser?',
        choices: [
          { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Fem typer.' },
          { id: 'b', label: 'Posisjon, belønning, tvang, ekspert, referanse', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Det er belønning, men én av fem.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'French og Raven 1959 — la grunnlaget for moderne maktforståelse.',
      },
      {
        id: 'ent214-6-2',
        icon: '⚡',
        title: 'Best',
        question: 'Hvilken makt fungerer best langsiktig?',
        choices: [
          { id: 'a', label: 'Tvang', isCorrect: false, feedback: 'Skaper frykt og passivitet.' },
          { id: 'b', label: 'Ekspert- og referansemakt — folk følger frivillig', isCorrect: true, feedback: 'Riktig! Indre forankret.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Forskjell.' },
          { id: 'd', label: 'Bare bonus', isCorrect: false, feedback: 'Slutter når bonus tar slutt.' },
        ],
        espenTip: 'Forskning viser at tvangsmakt gir kortsiktig lydighet, langsiktig motstand.',
      },
      {
        id: 'ent214-6-3',
        icon: '⚡',
        title: 'Norge',
        question: 'Hvorfor må norske ledere være forsiktige med posisjonsmakt?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Kulturelt.' },
          { id: 'b', label: 'Lav maktdistanse — folk forventer å bli hørt og overbevist', isCorrect: true, feedback: 'Riktig! Hofstede-effekt.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Kulturelt mønster.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Kulturelt.' },
        ],
        espenTip: 'En leder som sier "fordi jeg sier det" mister tillit i Norge umiddelbart.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🧠',
    title: 'Beslutningsprosesser',
    quote: 'God beslutning i tide slår perfekt beslutning for sent.',
    content: 'Rasjonelle beslutninger (analyse av alle alternativer) brukes når data finnes og tid tillater. Intuitive beslutninger brukes under tidspress og usikkerhet. Daniel Kahneman: System 1 (rask, intuitiv) vs System 2 (langsom, analytisk). Skjevheter som confirmation bias og sunk cost-fellen påvirker ledere. Equinors investeringskomite bruker strukturerte beslutningsmøter for å motvirke skjevheter.',
    subpoints: [
      { label: 'KONTEKST', text: 'Velg metode etter situasjon, ikke vane.' },
      { label: 'SKJEVHETER', text: 'Vær bevisst egne tankefeller.' },
    ],
    practical: 'Hvilken stor beslutning har du tatt på intuisjon — og hva ble resultatet?',
    exercises: [
      {
        id: 'ent214-7-1',
        icon: '🧠',
        title: 'Kahneman',
        question: 'System 1 vs System 2?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjellige modus.' },
          { id: 'b', label: 'S1 = rask intuisjon, S2 = langsom analyse', isCorrect: true, feedback: 'Riktig! Kahnemans rammeverk.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Tankesystem.' },
        ],
        espenTip: 'Boken "Thinking, Fast and Slow" — Nobelprisbelønnet. 95% av beslutninger er System 1.',
      },
      {
        id: 'ent214-7-2',
        icon: '🧠',
        title: 'Skjevhet',
        question: 'Hva er sunk cost-fellen?',
        choices: [
          { id: 'a', label: 'Bare statistikk', isCorrect: false, feedback: 'Tankefelle.' },
          { id: 'b', label: 'Fortsette dårlig prosjekt fordi mye er allerede investert', isCorrect: true, feedback: 'Riktig! Klassisk feil.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert mønster.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Kognitiv skjevhet.' },
        ],
        espenTip: 'Penger som er brukt er borte — vurder bare framtidig avkastning. Concorde-eksempelet.',
      },
      {
        id: 'ent214-7-3',
        icon: '🧠',
        title: 'Tidspress',
        question: 'Når brukes intuitive beslutninger best?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Effektiv ved tidspress.' },
          { id: 'b', label: 'Erfaringsbasert ved tidspress og høy usikkerhet', isCorrect: true, feedback: 'Riktig! Klein-forskning.' },
          { id: 'c', label: 'Bare ved data', isCorrect: false, feedback: 'Da er S2 bedre.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Erfaringsbasert.' },
        ],
        espenTip: 'Gary Klein: Brannmenn og kirurger bruker mønstergjenkjenning — eksperter intuiterer riktig.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '❤️',
    title: 'Emosjonell intelligens (EQ)',
    quote: 'IQ får deg ansatt, EQ får deg forfremmet.',
    content: 'Daniel Goleman: Fem komponenter — Selvbevissthet (kjenne egne følelser), Selvkontroll (regulere reaksjoner), Motivasjon (indre drive), Empati (forstå andre), Sosiale ferdigheter (bygge relasjoner). EQ utvikles gjennom hele livet, IQ er ganske stabil. Norsk forskning (BI) viser at EQ-skår er sterkere prediktor for lederpresentasjon enn IQ. Stress og press tester EQ.',
    subpoints: [
      { label: 'TRENBAR', text: 'EQ kan utvikles — IQ er mer fast.' },
      { label: 'PREDIKTOR', text: 'Sterkere indikator på lederframgang enn IQ.' },
    ],
    practical: 'Hvilken EQ-komponent kunne du selv trenge å styrke mest?',
    exercises: [
      {
        id: 'ent214-8-1',
        icon: '❤️',
        title: 'Goleman',
        question: 'Fem EQ-komponenter?',
        choices: [
          { id: 'a', label: 'Bare empati', isCorrect: false, feedback: 'Fem deler.' },
          { id: 'b', label: 'Selvbevissthet, selvkontroll, motivasjon, empati, sosiale ferdigheter', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Psykologisk modell.' },
        ],
        espenTip: 'Goleman 1995 — populariserte begrepet for ledelse.',
      },
      {
        id: 'ent214-8-2',
        icon: '❤️',
        title: 'IQ vs EQ',
        question: 'Hvilken er sterkest prediktor for ledersuksess?',
        choices: [
          { id: 'a', label: 'IQ', isCorrect: false, feedback: 'Mindre prediktiv enn EQ.' },
          { id: 'b', label: 'EQ er sterkere prediktor enn IQ alene', isCorrect: true, feedback: 'Riktig! Bekreftet i metaanalyser.' },
          { id: 'c', label: 'Bare alder', isCorrect: false, feedback: 'Ikke relevant.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Forskningsbasert.' },
        ],
        espenTip: 'IQ over et visst nivå har avtakende avkastning — EQ skiller toppledere fra middels.',
      },
      {
        id: 'ent214-8-3',
        icon: '❤️',
        title: 'Trening',
        question: 'Kan EQ utvikles?',
        choices: [
          { id: 'a', label: 'Nei, fast', isCorrect: false, feedback: 'Tvert imot — utviklbar.' },
          { id: 'b', label: 'Ja, gjennom refleksjon, tilbakemelding og bevisst trening', isCorrect: true, feedback: 'Riktig! Plastisk over livet.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Treningsbar.' },
          { id: 'd', label: 'Bare medfødt', isCorrect: false, feedback: 'Utviklbar.' },
        ],
        espenTip: '360-graders tilbakemeldinger og coaching er beste metoder — bedrifter som DNB bruker dette systematisk.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '👥',
    title: 'HR-strategi og kompetansebehov',
    quote: 'Mennesker er bedriftens eneste virkelige konkurransefortrinn.',
    content: 'HR-strategi kobler bedriftsstrategi til menneskelig kapital. Sentrale spørsmål: Hvilken kompetanse trenger vi om 3 år? Skal vi bygge (utvikle) eller kjøpe (rekruttere)? Hvordan beholder vi nøkkelpersoner? Norske vekstbedrifter bruker kompetanseplaner og strategiske rekrutteringsplaner. Equinor har egen HR-strategi-funksjon. Mindre bedrifter må gjøre samme tenkning, bare i mindre skala.',
    subpoints: [
      { label: 'KOBLING', text: 'HR-strategi følger forretningsstrategi, ikke omvendt.' },
      { label: 'BYGGE/KJØPE', text: 'Internutvikling vs ekstern rekruttering.' },
    ],
    practical: 'Hvilken kompetanse vil bedriften din trenge mer av om to år?',
    exercises: [
      {
        id: 'ent214-9-1',
        icon: '👥',
        title: 'Kobling',
        question: 'Hva styrer HR-strategi?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'b', label: 'Forretningsstrategi — HR støtter retning bedriften skal', isCorrect: true, feedback: 'Riktig! Strategisk samkjøring.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk verktøy.' },
        ],
        espenTip: 'Hvis selskapet skal bli AI-ledende — HR må rekruttere AI-kompetanse i tide.',
      },
      {
        id: 'ent214-9-2',
        icon: '👥',
        title: 'Build vs buy',
        question: 'Når lønner det seg å utvikle internt?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Ofte.' },
          { id: 'b', label: 'Ved spesifikk kompetanse, langsiktig behov og lojalitet', isCorrect: true, feedback: 'Riktig! Langsiktig investering.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
          { id: 'd', label: 'Bare for ledere', isCorrect: false, feedback: 'Alle nivåer.' },
        ],
        espenTip: 'Rekruttering tar tid og er dyrt. Internutvikling gir også høyere ansattilfredshet.',
      },
      {
        id: 'ent214-9-3',
        icon: '👥',
        title: 'Beholde',
        question: 'Hvordan beholder du nøkkelpersoner?',
        choices: [
          { id: 'a', label: 'Bare høy lønn', isCorrect: false, feedback: 'Ikke alene nok.' },
          { id: 'b', label: 'Mening, mestring, autonomi og rettferdig kompensasjon', isCorrect: true, feedback: 'Riktig! Selvbestemmelsesteorien.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert tilnærming.' },
          { id: 'd', label: 'Bare frynsegoder', isCorrect: false, feedback: 'Begrenset effekt.' },
        ],
        espenTip: 'Daniel Pink "Drive" — autonomy, mastery, purpose. Lønn fjerner misnøye, ikke skaper drive.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '⚖️',
    title: 'Lovverk og lederansvar',
    quote: 'Med makt følger ansvar — også juridisk.',
    content: 'Norske ledere har juridiske plikter: Arbeidsmiljøloven (forsvarlig arbeidsmiljø), Likestillings- og diskrimineringsloven, Aksjeloven (styrets og daglig leders ansvar), Internkontrollforskriften (HMS), Personopplysningsloven/GDPR. Brudd kan gi personlig erstatningsansvar — særlig for daglig leder og styret. Equinor og DNB har omfattende compliance-funksjoner. Selv små bedrifter må kjenne disse rammene.',
    subpoints: [
      { label: 'PERSONLIG', text: 'Daglig leder kan bli personlig ansvarlig.' },
      { label: 'COMPLIANCE', text: 'Bygg systemer som forebygger lovbrudd.' },
    ],
    practical: 'Hvilke lover er mest aktuelle for din bedrift å følge tett?',
    exercises: [
      {
        id: 'ent214-10-1',
        icon: '⚖️',
        title: 'AML',
        question: 'Hva regulerer arbeidsmiljøloven?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'b', label: 'Forsvarlig arbeidsmiljø, arbeidstid, oppsigelse, varsling', isCorrect: true, feedback: 'Riktig! Bredt.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert lov.' },
          { id: 'd', label: 'Bare HMS', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'AML er en av de viktigste lovene for ledere — brudd får personlige konsekvenser.',
      },
      {
        id: 'ent214-10-2',
        icon: '⚖️',
        title: 'Personlig',
        question: 'Når blir leder personlig ansvarlig?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Kan skje.' },
          { id: 'b', label: 'Ved grov uaktsomhet, forsett eller brudd på spesifikke plikter', isCorrect: true, feedback: 'Riktig! Klassisk skille.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare ved konkurs', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'AS-skall beskytter ikke ved alvorlige brudd. Daglig leder må kjenne grensene.',
      },
      {
        id: 'ent214-10-3',
        icon: '⚖️',
        title: 'Compliance',
        question: 'Hva er compliance?',
        choices: [
          { id: 'a', label: 'Bare regler', isCorrect: false, feedback: 'Mer enn passiv etterlevelse.' },
          { id: 'b', label: 'Systematisk arbeid for å sikre at virksomheten følger lovverk', isCorrect: true, feedback: 'Riktig! Aktiv risikostyring.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Reelt arbeid.' },
        ],
        espenTip: 'DNB har 100+ ansatte i compliance. Også små bedrifter trenger enkle rutiner og opplæring.',
      },
    ],
  },
]

export default function LedelseOrganisasjonskulturModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-14"
      moduleTitle="Ledelse og organisasjonskultur"
      moduleIcon="🏢"
      storageKey="learning-ent2-ledelse-organisasjonskultur"
      completeRoute="/learning/ent2/ledelse-organisasjonskultur/complete"
      phases={phases}
      intro="Lederrollen i en voksende bedrift — bygging av kultur, riktig stil per situasjon, og forståelse av makt, beslutninger og juridisk ansvar."
      vissteduAt="Norske lederundersøkelser (BI, AFF) viser at EQ og kulturarbeid er viktigere prediktorer for vekst enn formell lederutdanning."
      espenSier="Ledelse er ikke et fag du leser deg til — det er en praksis du øver på hver dag. Start med å lytte mer enn du snakker."
      presentationLink={{ route: '/learning/presentations/ent2/ledelse-organisasjonskultur', description: 'Ledelse og organisasjonskultur — 10 slides' }}
    />
  )
}
