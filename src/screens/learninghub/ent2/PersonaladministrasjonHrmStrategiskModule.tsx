import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🌟',
    title: 'Hva er strategisk HRM?',
    quote: 'HR er ikke bare administrasjon — det er strategi.',
    content: 'Human Resource Management (HRM) er systematisk forvaltning av ansatte som strategisk ressurs. Skillet mellom personaladministrasjon (lønn, ferie, kontrakter) og strategisk HRM (kompetanse, kultur, lederskap) er sentralt. Dave Ulrich beskrev fire HR-roller: Strategisk partner, Endringsagent, Ansattes talsperson, Administrativ ekspert. I norske vekstbedrifter går HR fra ren admin til strategisk støtte for ledelsen.',
    subpoints: [
      { label: 'STRATEGISK', text: 'HR støtter forretningsstrategien direkte.' },
      { label: 'ULRICH', text: 'Fire roller — alle nødvendige.' },
    ],
    practical: 'Hva er HR-funksjonen i din bedrift mest opptatt av — admin eller strategi?',
    exercises: [
      {
        id: 'ent215-1-1',
        icon: '🌟',
        title: 'Definisjon',
        question: 'Hva skiller strategisk HRM fra personaladministrasjon?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjell.' },
          { id: 'b', label: 'Strategisk = kompetanse, kultur, ledelse. Admin = lønn, ferie, kontrakter', isCorrect: true, feedback: 'Riktig! Klart skille.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'For snevert.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Mange bedrifter har god admin men svak strategisk HR. Stor forskjell på resultat.',
      },
      {
        id: 'ent215-1-2',
        icon: '🌟',
        title: 'Ulrich',
        question: 'Ulrichs fire HR-roller?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Fire roller.' },
          { id: 'b', label: 'Strategisk partner, endringsagent, talsperson, admin ekspert', isCorrect: true, feedback: 'Riktig! Modell brukt globalt.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare to', isCorrect: false, feedback: 'Fire roller.' },
        ],
        espenTip: 'Ulrich 1997 — modell for moderne HR-funksjoner. DNB og Equinor strukturerer slik.',
      },
      {
        id: 'ent215-1-3',
        icon: '🌟',
        title: 'Verdiskaping',
        question: 'Hvordan skaper strategisk HR verdi?',
        choices: [
          { id: 'a', label: 'Bare lavere kostnader', isCorrect: false, feedback: 'For snevert.' },
          { id: 'b', label: 'Riktig kompetanse, sterkere kultur, høyere ansattengasjement', isCorrect: true, feedback: 'Riktig! Strategiske resultater.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Verdidrivere.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Verdiskaping.' },
        ],
        espenTip: 'Gallup-studier: Engasjerte ansatte = 23% høyere lønnsomhet. HR påvirker bunnlinjen.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🧲',
    title: 'Employer branding og rekruttering',
    quote: 'De beste ansatte velger deg — du velger ikke dem.',
    content: 'Employer branding bygger bedriftens omdømme som arbeidsgiver. Strategisk rekruttering går fra reaktiv "fylle stilling" til proaktiv "tiltrekke talent". Komponenter: Klart verdiløfte til ansatte (EVP — Employer Value Proposition), aktiv tilstedeværelse på LinkedIn og i fagmiljøer, gode rekrutteringsprosesser. Cognite, Kahoot og DNB konkurrerer med Google om norsk teknologitalent — krever bevisst arbeid.',
    subpoints: [
      { label: 'EVP', text: 'Hva tilbyr du som arbeidsgiver? Mer enn lønn.' },
      { label: 'PROAKTIV', text: 'Bygg pipeline før du trenger å ansette.' },
    ],
    practical: 'Hvorfor skulle en flink utvikler velge bedriften din framfor andre?',
    exercises: [
      {
        id: 'ent215-2-1',
        icon: '🧲',
        title: 'EVP',
        question: 'Hva er Employer Value Proposition?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'b', label: 'Hele pakken bedriften tilbyr ansatte — lønn, kultur, utvikling, mening', isCorrect: true, feedback: 'Riktig! Helhetlig løfte.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare frynsegoder', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'EVP er for ansatte hva merkevare er for kunder — løfter du må holde.',
      },
      {
        id: 'ent215-2-2',
        icon: '🧲',
        title: 'Branding',
        question: 'Hvor bygger man employer brand?',
        choices: [
          { id: 'a', label: 'Bare i jobbannonser', isCorrect: false, feedback: 'For sent.' },
          { id: 'b', label: 'LinkedIn, glassdoor, fagkonferanser, eksisterende ansatte som ambassadører', isCorrect: true, feedback: 'Riktig! Mange flater.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Markedsarbeid.' },
        ],
        espenTip: 'Glassdoor-anmeldelser leses av kandidater før de søker. Vanskelig å skjule dårlig kultur.',
      },
      {
        id: 'ent215-2-3',
        icon: '🧲',
        title: 'Norge',
        question: 'Hvorfor er employer branding spesielt viktig i Norge?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'b', label: 'Lite arbeidsmarked, full sysselsetting — knapphet på talent', isCorrect: true, feedback: 'Riktig! Knapphetsmarked.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Kontekstuelt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Markedsforhold.' },
        ],
        espenTip: 'Norge har strukturell mangel på utviklere — bedrifter konkurrerer hardt om de samme menneskene.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📚',
    title: 'Kompetansestyring',
    quote: 'Kompetanse forvaltet er kompetanse som vokser.',
    content: 'Strategisk kompetansestyring: Kartlegg dagens kompetanse, definer fremtidens behov, lag utviklingsplaner, mål resultatene. Verktøy: Kompetansematriser, individuelle utviklingsplaner (IUP), 70-20-10-modellen (70% læring i jobb, 20% fra andre, 10% formell opplæring). Norske bedrifter som Equinor og DNB bruker omfattende digitale kompetansesystemer. Mindre bedrifter kan starte enkelt med Excel.',
    subpoints: [
      { label: 'GAP', text: 'Hvor er gapet mellom dagens og fremtidens kompetanse?' },
      { label: '70-20-10', text: 'Det meste læres i jobben — ikke på kurs.' },
    ],
    practical: 'Hva mangler du selv mest av kompetanse for å nå dine mål?',
    exercises: [
      {
        id: 'ent215-3-1',
        icon: '📚',
        title: '70-20-10',
        question: 'Hva betyr 70-20-10-modellen?',
        choices: [
          { id: 'a', label: 'Bare timer', isCorrect: false, feedback: 'Læringsfordeling.' },
          { id: 'b', label: '70% læring i jobb, 20% fra andre, 10% formell opplæring', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Læringsmodell.' },
        ],
        espenTip: 'Lombardo og Eichinger 1996 — det meste læres på jobben, ikke på kurs.',
      },
      {
        id: 'ent215-3-2',
        icon: '📚',
        title: 'Kartlegging',
        question: 'Hva er en kompetansematrise?',
        choices: [
          { id: 'a', label: 'Bare CV', isCorrect: false, feedback: 'Strukturert verktøy.' },
          { id: 'b', label: 'Oversikt over hvilken kompetanse hver ansatt har og på hvilket nivå', isCorrect: true, feedback: 'Riktig! Strukturert kartlegging.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'HR-verktøy.' },
        ],
        espenTip: 'Identifiserer både styrker (utnytt!) og hull (utvikle eller rekrutter).',
      },
      {
        id: 'ent215-3-3',
        icon: '📚',
        title: 'IUP',
        question: 'Hva er en individuell utviklingsplan?',
        choices: [
          { id: 'a', label: 'Bare ferie', isCorrect: false, feedback: 'Annet formål.' },
          { id: 'b', label: 'Plan for hva ansatt skal lære og oppnå over en periode', isCorrect: true, feedback: 'Riktig! Konkret utviklingsverktøy.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Utviklingsverktøy.' },
        ],
        espenTip: 'Lages typisk i medarbeidersamtale. Følges opp halvårlig.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💰',
    title: 'Belønningssystemer',
    quote: 'Du får det du belønner.',
    content: 'Total kompensasjon består av: Fastlønn, variabel lønn (bonus, provisjon), aksjeopsjoner/eierandeler, frynsegoder (bil, telefon, helseforsikring), pensjon, utviklingsmuligheter. Norske scaleups som Kahoot og Cognite bruker opsjoner aggressivt for å konkurrere om talent. Aksjeloven og skatteregler gir rammer. Skille mellom innsatsbasert (provisjon) og resultatbasert (bonus). Feil incentiver kan skape uønsket atferd — "you get what you measure".',
    subpoints: [
      { label: 'TOTAL', text: 'Tenk hele pakken, ikke bare lønn.' },
      { label: 'INCENTIV', text: 'Belønning skaper atferd — vær forsiktig med hva du måler.' },
    ],
    practical: 'Hvilken belønning motiverer deg mest — penger, status eller utvikling?',
    exercises: [
      {
        id: 'ent215-4-1',
        icon: '💰',
        title: 'Komponenter',
        question: 'Total kompensasjon består av?',
        choices: [
          { id: 'a', label: 'Bare fastlønn', isCorrect: false, feedback: 'Mange komponenter.' },
          { id: 'b', label: 'Fastlønn, variabel, opsjoner, frynsegoder, pensjon, utvikling', isCorrect: true, feedback: 'Riktig! Hele pakken.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Kompensasjon.' },
        ],
        espenTip: 'Yngre verdsetter ofte fleksibilitet og utvikling, eldre verdsetter pensjon mer.',
      },
      {
        id: 'ent215-4-2',
        icon: '💰',
        title: 'Opsjoner',
        question: 'Hvorfor brukes opsjoner i scaleups?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'b', label: 'Lav cash-burn, deler oppside, bygger eierskap og lojalitet', isCorrect: true, feedback: 'Riktig! Klassisk scaleup-løsning.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
          { id: 'd', label: 'Bare prestige', isCorrect: false, feedback: 'Reell verdi.' },
        ],
        espenTip: 'Norske skatteregler for opsjoner ble bedret 2022 — gjorde det enklere for scaleups.',
      },
      {
        id: 'ent215-4-3',
        icon: '💰',
        title: 'Feilstilte',
        question: 'Hva er problemet med feil belønningssystem?',
        choices: [
          { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Stort problem.' },
          { id: 'b', label: 'Skaper uønsket atferd — folk gjør det som måles, ikke det som trengs', isCorrect: true, feedback: 'Riktig! Klassisk fallgruve.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt problem.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Atferdseffekt.' },
        ],
        espenTip: 'Wells Fargo-skandalen: Bonus per åpnet konto = 2 millioner falske kontoer. Incentiver styrer atferd.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '⚖️',
    title: 'Arbeidsrett (avansert)',
    quote: 'Loven setter rammene — kjenn dem godt.',
    content: 'Norsk arbeidsrett er en av verdens strengeste på ansattvern. Sentrale temaer: Oppsigelse krever saklig grunn (AML §15-7), prosesskrav (drøftingsmøte, skriftlig oppsigelse), oppsigelsestid (1-6 måneder), prøvetid (max 6 måneder med 14 dagers oppsigelse). Omstilling: Krav om reell omplassering, ansiennitetsprinsipp ved nedbemanning. Konflikter: Tilrettelegging, varsling, rettssaker. Tilkalle advokat tidlig — feilskritt blir dyre.',
    subpoints: [
      { label: 'SAKLIG', text: 'Oppsigelse krever god dokumentert grunn.' },
      { label: 'PROSESS', text: 'Følg AMLs formkrav — viktigere enn innhold ofte.' },
    ],
    practical: 'Vet du forskjellen på avskjed og oppsigelse?',
    exercises: [
      {
        id: 'ent215-5-1',
        icon: '⚖️',
        title: 'Oppsigelse',
        question: 'Når kan en ansatt sies opp?',
        choices: [
          { id: 'a', label: 'Når som helst', isCorrect: false, feedback: 'Strenge krav.' },
          { id: 'b', label: 'Ved saklig grunn — virksomhetens forhold eller ansattes forhold', isCorrect: true, feedback: 'Riktig! AML §15-7.' },
          { id: 'c', label: 'Bare ved tyveri', isCorrect: false, feedback: 'Mange grunner.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strenge krav.' },
        ],
        espenTip: 'Vanlige saklige grunner: Nedbemanning, dårlige prestasjoner (etter advarsler), illojalitet, fravær.',
      },
      {
        id: 'ent215-5-2',
        icon: '⚖️',
        title: 'Prosess',
        question: 'Hva er drøftingsmøte?',
        choices: [
          { id: 'a', label: 'Tilfeldig samtale', isCorrect: false, feedback: 'Formelt møte.' },
          { id: 'b', label: 'Lovpålagt møte før oppsigelse — ansatt skal høres og kan ha med tillitsvalgt', isCorrect: true, feedback: 'Riktig! AML §15-1.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Formelt krav.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Lovpålagt.' },
        ],
        espenTip: 'Glemmer du drøftingsmøte = oppsigelsen kan kjennes ugyldig av retten.',
      },
      {
        id: 'ent215-5-3',
        icon: '⚖️',
        title: 'Nedbemanning',
        question: 'Hvilket prinsipp gjelder ved nedbemanning?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'b', label: 'Ansiennitet veies tungt, men kompetanse og sosiale forhold også', isCorrect: true, feedback: 'Riktig! Hovedregel med skjønn.' },
          { id: 'c', label: 'Bare alder', isCorrect: false, feedback: 'Aldersdiskriminering forbudt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Komplekst.' },
        ],
        espenTip: 'Hovedavtalen sier ansiennitet — men retten har akseptert avvik ved kritisk kompetanse.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🧘',
    title: 'HMS og psykososialt arbeidsmiljø',
    quote: 'Trygghet er forutsetning for ytelse.',
    content: 'Psykososialt arbeidsmiljø reguleres av AML §4-3: Verdighet, ikke trakassert, faglig og personlig utvikling. Vanlige problemer: Utbrenthet, mobbing, krenking, rollkonflikt. Forebygging: Tydelige roller, rimelig arbeidsbelastning, åpen kommunikasjon. Verneombud (krav fra 10 ansatte) og arbeidsmiljøutvalg (50+) er lovpålagte. Norsk forskning (STAMI) viser økte psykiske plager — særlig i tjenestesektor og post-pandemi.',
    subpoints: [
      { label: 'PLIKT', text: 'Arbeidsgiver skal forebygge psykisk uhelse.' },
      { label: 'STRUKTUR', text: 'Verneombud og AMU er lovpålagt over visse størrelser.' },
    ],
    practical: 'Hvordan er det psykososiale arbeidsmiljøet i din bedrift?',
    exercises: [
      {
        id: 'ent215-6-1',
        icon: '🧘',
        title: 'AML §4-3',
        question: 'Hva regulerer arbeidsmiljølovens §4-3?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Annen paragraf.' },
          { id: 'b', label: 'Psykososialt arbeidsmiljø, verdighet og forebygging av trakassering', isCorrect: true, feedback: 'Riktig! Sentral paragraf.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare ferie', isCorrect: false, feedback: 'Annet område.' },
        ],
        espenTip: '§4-3 gjelder også digital trakassering og mobbing via meldinger. Moderne utfordring.',
      },
      {
        id: 'ent215-6-2',
        icon: '🧘',
        title: 'Verneombud',
        question: 'Når må bedriften ha verneombud?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Lovpålagt.' },
          { id: 'b', label: 'Fra 10 ansatte (kan avtales bort under, men anbefales)', isCorrect: true, feedback: 'Riktig! AML-krav.' },
          { id: 'c', label: 'Bare 100+', isCorrect: false, feedback: 'Mye lavere.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Lovpålagt.' },
        ],
        espenTip: 'Verneombud velges av ansatte og har lovbeskyttelse. Kan stoppe farlig arbeid.',
      },
      {
        id: 'ent215-6-3',
        icon: '🧘',
        title: 'Utbrenthet',
        question: 'Hvordan forebygges utbrenthet?',
        choices: [
          { id: 'a', label: 'Bare ferie', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'b', label: 'Rimelig arbeidsbelastning, tydelige rammer, autonomi, sosial støtte', isCorrect: true, feedback: 'Riktig! JD-R modellen.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert forebygging.' },
          { id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Begrenset effekt.' },
        ],
        espenTip: 'Job Demands-Resources modellen: Belastninger må balanseres mot ressurser.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🤝',
    title: 'Medbestemmelse og tillitsvalgte',
    quote: 'Ansatte skal høres — det er norsk modell.',
    content: 'Den norske modellen bygger på tre parter: Stat, arbeidsgiver, arbeidstaker. Hovedavtalen LO-NHO regulerer medbestemmelse. Tillitsvalgte representerer ansatte i drøftinger om bemanning, omstilling og arbeidsforhold. Aksjeloven gir rett til ansattrepresentasjon i styret (30+ ansatte: 1 representant; 50+: 2). Bedriftsdemokrati er konkurransefortrinn — gir bedre beslutninger og lojalitet. Equinor og DNB har omfattende medbestemmelsesstrukturer.',
    subpoints: [
      { label: 'TREPARTSSAMARBEID', text: 'Stat, arbeidsgiver, arbeidstaker — fundament.' },
      { label: 'STYREREPRESENTASJON', text: 'Ansatte har lovrett til styreplass over visse størrelser.' },
    ],
    practical: 'Hvordan involveres ansatte i beslutninger i din bedrift?',
    exercises: [
      {
        id: 'ent215-7-1',
        icon: '🤝',
        title: 'Modellen',
        question: 'Hva er den norske modellen?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Bredere.' },
          { id: 'b', label: 'Trepartssamarbeid mellom stat, arbeidsgiver og arbeidstaker', isCorrect: true, feedback: 'Riktig! Fundament.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'd', label: 'Bare bedrift', isCorrect: false, feedback: 'Tre parter.' },
        ],
        espenTip: 'Bygd opp etter krigen — gir Norge svært få streiker sammenlignet med andre land.',
      },
      {
        id: 'ent215-7-2',
        icon: '🤝',
        title: 'Styre',
        question: 'Når har ansatte rett til styreplass?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Lovpålagt over visse størrelser.' },
          { id: 'b', label: 'AS over 30 ansatte: 1 plass; over 50: 2; over 200: 1/3', isCorrect: true, feedback: 'Riktig! Aksjelovens regler.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Lovpålagt.' },
          { id: 'd', label: 'Bare ledelsen', isCorrect: false, feedback: 'Også ansatte.' },
        ],
        espenTip: 'Bedriftsdemokrati — Norge er blant de mest avanserte i verden.',
      },
      {
        id: 'ent215-7-3',
        icon: '🤝',
        title: 'Tillitsvalgt',
        question: 'Hva gjør en tillitsvalgt?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Klart definert rolle.' },
          { id: 'b', label: 'Representerer ansatte i forhandlinger og drøftinger med arbeidsgiver', isCorrect: true, feedback: 'Riktig! Hovedrolle.' },
          { id: 'c', label: 'Bare HR-jobb', isCorrect: false, feedback: 'Annen rolle.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Aktiv rolle.' },
        ],
        espenTip: 'Tillitsvalgte har lovbeskyttelse mot oppsigelse — ellers ville rollen blitt umulig.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🔄',
    title: 'Endringsledelse og personal',
    quote: 'Endring er mennesker — ikke prosjektplaner.',
    content: 'Kotters 8-stegsmodell for endring: Skap hastverkfølelse, bygg endringsteam, formuler visjon, kommuniser visjonen, fjern hindringer, vis raske resultater, bygg videre, forankre kulturelt. ADKAR-modellen fokuserer på individet: Awareness, Desire, Knowledge, Ability, Reinforcement. Norske omstillinger må følge AMLs prosesskrav. Equinor-omstillingen 2014-2016 (oljepris-fall): Stort behov for endringsledelse — kuttet 7000 stillinger over to år.',
    subpoints: [
      { label: 'KOTTER', text: '8 steg — hopp over ett og endringen feiler.' },
      { label: 'INDIVID', text: 'Hver ansatt går gjennom egen endringsreise.' },
    ],
    practical: 'Hvilken organisatorisk endring har du selv vært gjennom?',
    exercises: [
      {
        id: 'ent215-8-1',
        icon: '🔄',
        title: 'Kotter',
        question: 'Hva er første steg i Kotters modell?',
        choices: [
          { id: 'a', label: 'Bare planlegg', isCorrect: false, feedback: 'Senere steg.' },
          { id: 'b', label: 'Skap hastverkfølelse — vis hvorfor endring må skje nå', isCorrect: true, feedback: 'Riktig! Klassisk start.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Endringsmodell.' },
        ],
        espenTip: 'Uten hastverk får du ikke folk til å forlate komfortsone. Kotters viktigste innsikt.',
      },
      {
        id: 'ent215-8-2',
        icon: '🔄',
        title: 'ADKAR',
        question: 'Hva står ADKAR for?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Modell.' },
          { id: 'b', label: 'Awareness, Desire, Knowledge, Ability, Reinforcement', isCorrect: true, feedback: 'Riktig! Prosci-modellen.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare to', isCorrect: false, feedback: 'Fem steg.' },
        ],
        espenTip: 'ADKAR fokuserer på individuell endring — Kotter på organisasjon. Komplementære.',
      },
      {
        id: 'ent215-8-3',
        icon: '🔄',
        title: 'Equinor',
        question: 'Hva lærte Equinor av 2014-omstillingen?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkrete erfaringer.' },
          { id: 'b', label: 'Tidlig kommunikasjon, tydelige kriterier, omplassering der mulig', isCorrect: true, feedback: 'Riktig! Profesjonell omstilling.' },
          { id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Helhetlig.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Læring.' },
        ],
        espenTip: 'Selv om mange måtte gå, ble omstillingen anerkjent som ryddig — verneombud og fagforeninger involvert.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '💻',
    title: 'Digital HR-styring',
    quote: 'Data om mennesker, ikke datamaskinmennesker.',
    content: 'HRIS (Human Resource Information Systems) digitaliserer HR. Norske tilbydere: Visma HR, Simployer, BIK, Tripletex HR. Funksjoner: Lønn, fravær, ferie, kompetanse, medarbeidersamtaler, rekruttering. People analytics: Bruke data om ansatte til strategiske beslutninger. Eksempler: Predikere turnover, optimalisere rekruttering, identifisere kompetansegap. GDPR setter strenge rammer — personopplysninger må behandles forsvarlig.',
    subpoints: [
      { label: 'SYSTEMER', text: 'Digital HRIS er standard for norske bedrifter over 30 ansatte.' },
      { label: 'GDPR', text: 'Personopplysninger krever rettslig grunnlag og strukturert behandling.' },
    ],
    practical: 'Hvilket HR-system bruker bedriften din — og er det godt nok?',
    exercises: [
      {
        id: 'ent215-9-1',
        icon: '💻',
        title: 'HRIS',
        question: 'Hva er en HRIS?',
        choices: [
          { id: 'a', label: 'Bare regneark', isCorrect: false, feedback: 'Mer avansert.' },
          { id: 'b', label: 'Human Resource Information System — digitalt system for ansatt-data', isCorrect: true, feedback: 'Riktig! Standardverktøy.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'Norske scaleups bruker ofte Simployer eller Visma HR — samles lønn og personal i ett system.',
      },
      {
        id: 'ent215-9-2',
        icon: '💻',
        title: 'People analytics',
        question: 'Hva er people analytics?',
        choices: [
          { id: 'a', label: 'Bare overvåking', isCorrect: false, feedback: 'Strategisk bruk.' },
          { id: 'b', label: 'Bruk av data om ansatte for strategiske HR-beslutninger', isCorrect: true, feedback: 'Riktig! Datadrevet HR.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Analyseform.' },
        ],
        espenTip: 'Google bruker dette aggressivt — viste bla. at gode mellomledere er viktigere enn karismatiske toppledere.',
      },
      {
        id: 'ent215-9-3',
        icon: '💻',
        title: 'GDPR',
        question: 'Hva må sikres med ansattdata?',
        choices: [
          { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Strenge krav.' },
          { id: 'b', label: 'Rettslig grunnlag, formålsbegrensning, dataminimering, sikkerhet', isCorrect: true, feedback: 'Riktig! GDPR-prinsipper.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'GDPR-krav.' },
        ],
        espenTip: 'Datatilsynet bøter raskt for HR-brudd. Spesielt sensitive data: helse, fagforening, etnisitet.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '📊',
    title: 'Måling og evaluering av HR',
    quote: 'Det som måles, blir gjort.',
    content: 'HR-KPIer kobler folk-arbeid til forretningsresultater. Klassiske mål: Turnover-rate (% som slutter), engasjements-skår (eNPS, Gallup Q12), tid til å fylle stilling, kostnad per rekruttering, sykefravær, kompetansegap. Strategiske: Lederkvalitet (360-grader), kulturindeks, mangfoldsindikatorer. Norske bedrifter måler ofte for lite — fokus bare på lønn og fravær. Equinors HR-rapportering har 50+ indikatorer hver kvartal.',
    subpoints: [
      { label: 'KPIER', text: 'Velg få, men kobl dem til strategi.' },
      { label: 'KULTUR', text: 'Mål på regelmessig — ikke bare medarbeiderundersøkelse hvert 2. år.' },
    ],
    practical: 'Hvilken HR-måling ville gitt din bedrift mest verdi?',
    exercises: [
      {
        id: 'ent215-10-1',
        icon: '📊',
        title: 'Turnover',
        question: 'Hva er turnover-rate?',
        choices: [
          { id: 'a', label: 'Bare omsetning', isCorrect: false, feedback: 'HR-mål.' },
          { id: 'b', label: 'Andel ansatte som slutter i løpet av et år', isCorrect: true, feedback: 'Riktig! Sentral indikator.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert mål.' },
          { id: 'd', label: 'Bare ferie', isCorrect: false, feedback: 'Annet mål.' },
        ],
        espenTip: 'Norge: 8-12% er normalt, 20%+ er rødt flagg. Tech-bransjen ofte 15-25%.',
      },
      {
        id: 'ent215-10-2',
        icon: '📊',
        title: 'eNPS',
        question: 'Hva måler eNPS?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Engasjement.' },
          { id: 'b', label: 'Hvor sannsynlig ansatte er å anbefale arbeidsplassen', isCorrect: true, feedback: 'Riktig! Employer NPS.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert mål.' },
          { id: 'd', label: 'Bare ferie', isCorrect: false, feedback: 'Annet mål.' },
        ],
        espenTip: 'eNPS over +30 er bra, +50 er fantastisk. Gjøres ofte månedlig som rask puls-måling.',
      },
      {
        id: 'ent215-10-3',
        icon: '📊',
        title: 'Strategisk',
        question: 'Hvorfor måle HR?',
        choices: [
          { id: 'a', label: 'For statistikk', isCorrect: false, feedback: 'Strategisk formål.' },
          { id: 'b', label: 'Identifisere problemer tidlig, koble HR til forretningsresultater', isCorrect: true, feedback: 'Riktig! Strategisk styring.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk verdi.' },
        ],
        espenTip: 'HR uten måling = administrasjon. HR med måling = strategisk funksjon.',
      },
    ],
  },
]

export default function PersonaladministrasjonHrmStrategiskModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-15"
      moduleTitle="Personaladministrasjon og HRM (strategisk)"
      moduleIcon="👥"
      storageKey="learning-ent2-personaladministrasjon-hrm-strategisk"
      completeRoute="/learning/ent2/personaladministrasjon-hrm-strategisk/complete"
      phases={phases}
      intro="Strategisk HRM — fra rekruttering og kompetansestyring til arbeidsrett, endring og digital HR. Mennesker er bedriftens viktigste konkurransefortrinn."
      vissteduAt="Den norske modellen med trepartssamarbeid og medbestemmelse er en av Norges sterkeste konkurransefortrinn — gir høy produktivitet og lav konfliktrate."
      espenSier="HR er ikke en støttefunksjon — det er en strategisk funksjon. De som forstår dette vinner kampen om talent."
      presentationLink={{ route: '/learning/presentations/ent2/personaladministrasjon-hrm-strategisk', description: 'Personaladministrasjon og HRM (strategisk) — 10 slides' }}
    />
  )
}
