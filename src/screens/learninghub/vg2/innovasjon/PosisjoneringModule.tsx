import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📍',
    title: 'Hva er posisjonering?',
    quote: 'Posisjonering skjer ikke i produktet — det skjer i hodet på kunden.',
    content: 'Posisjonering handler om å eie et konsept, en assosiasjon eller en følelse i kundens bevissthet. Kiwi eier "billigst garantert" — en posisjon så sterk at selv en liten prisendring ble riksnyhet fordi den brøt med kundenes forventning.',
    subpoints: [
      'MENTALT KART: Kunden har plass til svært få merkevarer i en kategori — du konkurrerer om én av de øverste plassene',
      'KONSEKVENS: Sterk posisjon betyr at kundene forventer at du lever opp til den — avvik skaper uforholdsmessig negativ oppmerksomhet',
      'FOKUS: De sterkeste posisjonene er enkle og smale — én ting du er best på',
    ],
    practical: 'Hva er det første ordet en norsk forbruker tenker ved "Kiwi"? Det svaret er Kiwis posisjon.',
    glossaryTerm: 'Posisjonering',
    exercises: [
      {
        id: 'po-1-1',
        question: 'Hva er posisjonering i markedsføring?',
        choices: [
          { id: 'a', text: 'Hvor produktet er plassert i butikkhyllen' },
          { id: 'b', text: 'Den plassen en merkevare eier i kundens bevissthet' },
          { id: 'c', text: 'Bedriftens geografiske lokasjon' },
          { id: 'd', text: 'Prisen i forhold til konkurrentene' },
        ],
        correctId: 'b',
        explanation: 'Posisjonering handler om å eie et konsept eller en assosiasjon i kundens bevissthet — ikke hva produktet er, men hva kunden tror det er.',
      },
      {
        id: 'po-1-2',
        question: 'Kiwi eier posisjonen "billigst garantert". Hva skjer om Kiwi setter opp prisen på en vare?',
        choices: [
          { id: 'a', text: 'Ingenting — priser endres alltid' },
          { id: 'b', text: 'Det bryter med kundenes forventning til Kiwis posisjon og skaper uforholdsmessig negativ reaksjon' },
          { id: 'c', text: 'Kunder er vant til prisøkninger' },
          { id: 'd', text: 'Kiwi kan ta seg høyere priser enn konkurrentene' },
        ],
        correctId: 'b',
        explanation: 'Sterk posisjon skaper sterke forventninger. Å bryte med posisjonen "billigst" er et tillitsbrudd som skaper kraftig negativ reaksjon.',
      },
      {
        id: 'po-1-3',
        question: 'Hvorfor eier de sterkeste posisjonene bare én egenskap?',
        choices: [
          { id: 'a', text: 'Fordi markedsbudsjettet er begrenset' },
          { id: 'b', text: 'Fordi kunden har begrenset kognitiv kapasitet — enkle budskap huskes og eies' },
          { id: 'c', text: 'Fordi det er krav fra reklamebyrå' },
          { id: 'd', text: 'Det er ingen regel — jo flere egenskaper, jo sterkere posisjon' },
        ],
        correctId: 'b',
        explanation: 'Kunden bombarderes med informasjon. Enkle, fokuserte posisjoner ("billigst", "premium quality") penetrerer bevisstheten og huskes langt bedre.',
      },
      {
        id: 'po-1-4',
        question: 'Hva er risikoen med å forsøke å eie to motsatte posisjoner?',
        choices: [
          { id: 'a', text: 'Det er ingen risiko — bredere appell er bedre' },
          { id: 'b', text: 'Man ender som regel med å eie ingen av posisjonene' },
          { id: 'c', text: 'Det koster for mye å markedsføre' },
          { id: 'd', text: 'Konkurrentene kopierer begge posisjonene' },
        ],
        correctId: 'b',
        explanation: 'Å forsøke å være "billigst og best" ender typisk med at kunden oppfatter deg som verken billigst eller best — posisjonen er utydelig.',
      },
      {
        id: 'po-1-5',
        question: 'Meny posisjonerer seg på kvalitet og utvalg. Hva betyr dette for prisstrategi?',
        choices: [
          { id: 'a', text: 'Meny må alltid ha de laveste prisene' },
          { id: 'b', text: 'Meny kan ta høyere priser fordi kunder som velger Meny ikke primært prioriterer lavest pris' },
          { id: 'c', text: 'Meny bør ikke konkurrere på pris' },
          { id: 'd', text: 'Meny taper alltid mot Kiwi på pris' },
        ],
        correctId: 'b',
        explanation: 'Menys posisjon som premium kvalitet tiltrekker kunder som prioriterer bredde og kvalitet over pris — de trenger ikke konkurrere på lavest pris.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🗺️',
    title: 'Posisjoneringskart',
    quote: 'Kartet over konkurranselandskapet er det første steget mot å forstå din plass i det.',
    content: 'Et posisjoneringskart er et todimensjonalt diagram som visualiserer hvordan kunder oppfatter merkevarer relativt til hverandre. Den klassiske versjonen bruker pris og opplevd kvalitet som akser.',
    subpoints: [
      'TO AKSER: Velg aksene basert på hva som faktisk driver kjøpsbeslutninger i din kategori',
      'HVITE ROM: Uokkuperte posisjoner kan være muligheter — sjekk om ingen er der fordi det ikke er lønnsomt',
      'KUNDEPERSPEKTIV: Kartet skal reflektere kundens oppfatning, ikke bedriftens selvbilde',
    ],
    practical: 'Lag et posisjoneringskart for norske mobiloperatører (Telenor, Telia, Ice, Lycamobile) med pris vs. nettverksdekning som akser.',
    exercises: [
      {
        id: 'po-2-1',
        question: 'Hva er et posisjoneringskart?',
        choices: [
          { id: 'a', text: 'Et geografisk kart over butikklokasjoner' },
          { id: 'b', text: 'Et todimensjonalt diagram som viser kundenes oppfatning av merkevarer relativt til hverandre' },
          { id: 'c', text: 'En strategi for å finne nye markeder' },
          { id: 'd', text: 'En liste over konkurrenter' },
        ],
        correctId: 'b',
        explanation: 'Posisjoneringskart visualiserer konkurranselandskapet fra kundenes perspektiv — typisk med to relevante akser som pris og kvalitet.',
      },
      {
        id: 'po-2-2',
        question: 'I norsk dagligvare: hvor plasseres Kiwi og Rema 1000 på et pris-kvalitet-kart?',
        choices: [
          { id: 'a', text: 'Høy pris, høy kvalitet' },
          { id: 'b', text: 'Lav pris, god kvalitet' },
          { id: 'c', text: 'Middels pris, middels kvalitet' },
          { id: 'd', text: 'Høy pris, lav kvalitet' },
        ],
        correctId: 'b',
        explanation: 'Kiwi og Rema 1000 posisjonerer seg i hjørnet lav pris/god kvalitet — billigst, men med akseptabel kvalitet.',
      },
      {
        id: 'po-2-3',
        question: 'Hva er "hvite rom" på et posisjoneringskart?',
        choices: [
          { id: 'a', text: 'Posisjoner ingen konkurrenter har tatt' },
          { id: 'b', text: 'Uokkuperte posisjoner som potensielt er muligheter for nye inntrengere' },
          { id: 'c', text: 'Begge svarene A og B' },
          { id: 'd', text: 'Posisjoner med lavest lønnsomhet' },
        ],
        correctId: 'c',
        explanation: 'Hvite rom er uokkuperte posisjoner. De kan være muligheter — men sjekk alltid om ingen er der fordi det faktisk ikke er lønnsomt å betjene den posisjonen.',
      },
      {
        id: 'po-2-4',
        question: 'Hva er den viktigste advarselen ved å bruke et posisjoneringskart?',
        choices: [
          { id: 'a', text: 'Kartet er for dyrt å lage' },
          { id: 'b', text: 'Kartet skal reflektere kundens oppfatning, ikke bedriftens selvbilde' },
          { id: 'c', text: 'Kartet er for statisk' },
          { id: 'd', text: 'Aksene er alltid feil valgt' },
        ],
        correctId: 'b',
        explanation: 'Den vanligste feilen er å lage et kart basert på interne oppfatninger. Kartet er bare verdifullt hvis det gjenspeiler kundenes faktiske oppfatning.',
      },
      {
        id: 'po-2-5',
        question: 'Joker er dyrere enn Kiwi men posisjonerer seg på "nærhet og tilgjengelighet". Hva illustrerer dette?',
        choices: [
          { id: 'a', text: 'At Joker er en dårlig forretning' },
          { id: 'b', text: 'At pris-kvalitet ikke alltid er de rette aksene — andre dimensjoner kan drive kjøpsbeslutninger' },
          { id: 'c', text: 'At kunder alltid velger lavest pris' },
          { id: 'd', text: 'At Joker bør senke prisene' },
        ],
        correctId: 'b',
        explanation: 'Joker illustrerer at bekvemmelighet og nærhet kan overstige prisfordel. Pris-kvalitet er ikke alltid de rette aksene — velg aksene som faktisk driver kjøpsbeslutninger.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '⚡',
    title: 'Differensiering og USP',
    quote: 'En USP er ikke hva du er stolt av — det er grunnen kunden velger deg fremfor alle andre.',
    content: 'Differensiering skiller deg fra konkurrentene på en måte som er relevant for målgruppen. USP (Unique Selling Proposition) er den ene konkrete grunnen kunden velger deg. Den må være relevant, unik og leverbar.',
    subpoints: [
      'RELEVANS: En USP ingen kunder bryr seg om er ikke en USP — det er en produktegenskap',
      'UNIKHET: Hvis alle konkurrentene sier det samme, er det ikke en USP',
      'LEVERBARHET: Et løfte du ikke kan holde konsekvent skader merkevaren mer enn ingen løfte',
    ],
    practical: 'Formuler din bedrifts USP i én setning. Test: kan en konkurrent kopiere og si det samme? Hvis ja — det er ikke unikt nok.',
    glossaryTerm: 'USP (Unique Selling Proposition)',
    exercises: [
      {
        id: 'po-3-1',
        question: 'Hva er en USP?',
        choices: [
          { id: 'a', text: 'Universal Service Provider' },
          { id: 'b', text: 'Unique Selling Proposition — den ene konkrete grunnen kunden velger deg fremfor konkurrentene' },
          { id: 'c', text: 'En type markedsanalysemetode' },
          { id: 'd', text: 'En prisstrategi' },
        ],
        correctId: 'b',
        explanation: 'USP er Unique Selling Proposition — det unike og konkrete argumentet for hvorfor kunden skal velge akkurat deg fremfor alle andre.',
      },
      {
        id: 'po-3-2',
        question: 'Sbanken posisjonerte seg som "det digitale, gebyrfrie alternativet". Hva er dette?',
        choices: [
          { id: 'a', text: 'Et posisjoneringskart' },
          { id: 'b', text: 'En sterk USP rettet mot frustrasjonen med tradisjonelle bankers skjulte gebyrer' },
          { id: 'c', text: 'En reklamekampanje' },
          { id: 'd', text: 'En repositionering' },
        ],
        correctId: 'b',
        explanation: 'Sbankens USP var spesifikk, relevant (mange hadde gebyrfrustrasjon), unik (ingen andre norske banker hadde den posisjonen) og leverbar.',
      },
      {
        id: 'po-3-3',
        question: 'Hva er de tre kravene til en ekte USP?',
        choices: [
          { id: 'a', text: 'Billig, rask og synlig' },
          { id: 'b', text: 'Relevant for kunder, unik i markedet, og leverbar over tid' },
          { id: 'c', text: 'Kortfattet, kreativ og global' },
          { id: 'd', text: 'Digital, bærekraftig og moderne' },
        ],
        correctId: 'b',
        explanation: 'En ekte USP er relevant (kunder bryr seg), unik (ingen konkurrenter har den), og leverbar (du kan holde løftet konsekvent).',
      },
      {
        id: 'po-3-4',
        question: 'Norwegian Airs opprinnelige USP var "lavkost på langdistanse". Hva oppfylte den?',
        choices: [
          { id: 'a', text: 'Kun kravet om relevans' },
          { id: 'b', text: 'Alle tre kravene: relevant, unik, og leverbar (i starten)' },
          { id: 'c', text: 'Kun kravet om unikhet' },
          { id: 'd', text: 'Ingen av kravene' },
        ],
        correctId: 'b',
        explanation: 'Norwegians opprinnelige USP var relevant (mange ønsket rimelig langdistanseflyging), unik (ingen norsk aktør tilbød dette) og leverbar.',
      },
      {
        id: 'po-3-5',
        question: 'Et selskap sier "Vi gir deg best service". Hvorfor er ikke dette en god USP?',
        choices: [
          { id: 'a', text: 'Service er ikke viktig for kunder' },
          { id: 'b', text: 'Det er ikke unikt — alle konkurrenter kan si det samme' },
          { id: 'c', text: 'Det er for kort' },
          { id: 'd', text: 'Det er en god USP' },
        ],
        correctId: 'b',
        explanation: '"Best service" er ikke unikt fordi alle konkurrenter kan (og gjerne gjør) si det samme. En USP må skille seg konkret fra konkurrentene.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔄',
    title: 'Repositionering — når og hvordan',
    quote: 'Repositionering er nødvendig når markedet endrer seg fortere enn merkevaren.',
    content: 'Repositionering er å endre den posisjonen en merkevare har i kundens bevissthet. Det er tidkrevende, dyrt og risikabelt — eksisterende kunder kan føle seg sveket, og nye kunder er skeptiske til om endringen er ekte.',
    subpoints: [
      'TRIGGER: Repositionering trigges av markedsendringer, ny konkurranse, teknologisk disrupsjon',
      'TIDSHORISONT: Forvent 5–10 år å endre en sterk posisjon — mentale bilder er seige',
      'RISIKO: Repositionering kan miste eksisterende kunder raskere enn den vinner nye',
    ],
    practical: 'Finn et norsk merke som har gjennomgått repositionering. Hva var den gamle posisjonen, hva er den nye, og hva trigget endringen?',
    glossaryTerm: 'Repositionering',
    exercises: [
      {
        id: 'po-4-1',
        question: 'Hva er repositionering?',
        choices: [
          { id: 'a', text: 'Å flytte butikken til en ny lokasjon' },
          { id: 'b', text: 'Å endre den posisjonen en merkevare har i kundens bevissthet' },
          { id: 'c', text: 'Å sette ny pris på produktet' },
          { id: 'd', text: 'Å skifte logo og fargepalett' },
        ],
        correctId: 'b',
        explanation: 'Repositionering er den strategiske prosessen med å endre kundenes oppfatning av en merkevare — hva de assosierer den med.',
      },
      {
        id: 'po-4-2',
        question: 'Hva er den vanligste triggeren for repositionering?',
        choices: [
          { id: 'a', text: 'Ny daglig leder' },
          { id: 'b', text: 'Markedsendringer, ny konkurranse eller teknologisk disrupsjon som gjør gammel posisjon utdatert' },
          { id: 'c', text: 'Ønske om høyere pris' },
          { id: 'd', text: 'At designavdelingen vil ha ny logo' },
        ],
        correctId: 'b',
        explanation: 'Repositionering trigges oftest av at markedet endrer seg — ny konkurranse, ny teknologi eller at målgruppen forsvinner.',
      },
      {
        id: 'po-4-3',
        question: 'Jernia har beveget seg fra jernvare mot interiør og hjemdesign over et tiår. Hva trigget dette?',
        choices: [
          { id: 'a', text: 'En ny direktør som likte interiør' },
          { id: 'b', text: 'Trusselen fra Biltema og Jula i det tradisjonelle jernvaremarkedet' },
          { id: 'c', text: 'Internasjonale mote-trender' },
          { id: 'd', text: 'At jernvarer ikke lenger produseres i Norge' },
        ],
        correctId: 'b',
        explanation: 'Jernia repositionerte seg fra jernvare mot interiør fordi Biltema, Jula og andre tok markedsandeler i det tradisjonelle segmentet.',
      },
      {
        id: 'po-4-4',
        question: 'Hvile er den typiske tidshorisonten for å endre en sterk posisjon?',
        choices: [
          { id: 'a', text: '1–2 måneder' },
          { id: 'b', text: '6 måneder til 1 år' },
          { id: 'c', text: '5–10 år' },
          { id: 'd', text: 'Posisjon kan ikke endres' },
        ],
        correctId: 'c',
        explanation: 'Kundenes mentale bilder er seige — å endre en sterk posisjon tar typisk 5–10 år og krever konsistente handlinger og kommunikasjon over tid.',
      },
      {
        id: 'po-4-5',
        question: 'Sbanken mistet det unike ved sin posisjon under repositionering mot full-service-bank. Hva lærte vi?',
        choices: [
          { id: 'a', text: 'At alle banker bør bli full-service' },
          { id: 'b', text: 'At å forlate det unike ved posisjonen kan ødelegge merkevaren — Sbanken ble til slutt kjøpt opp' },
          { id: 'c', text: 'At digital banking ikke fungerer' },
          { id: 'd', text: 'At DNB er et bedre selskap' },
        ],
        correctId: 'b',
        explanation: 'Sbankens skjebne illustrerer risikoen ved repositionering: å miste det unike ved den opprinnelige posisjonen kan fjerne grunnlaget for eksistensen.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🛒',
    title: 'Posisjonering i norsk dagligvare',
    quote: 'NorgesGruppen selger til alle — men ingen av kjedene vet det.',
    content: 'NorgesGruppen eier fire kjeder med bevisst forskjellig posisjonering: Kiwi (lavpris, ung urban), Meny (premiumkvalitet), SPAR (lokal nærhet) og Joker (kjøpmannstradisjon, distrikt). Strategien hindrer intern kannibalisering.',
    subpoints: [
      'INTERN KONKURRANSE: Fire-kjedestrategi forhindrer kannibalisme ved å gi hver kjede eget posisjoneringsrom',
      'EMOSJONELL POSISJONERING: Rema 1000s "Bestevenn"-kampanje beviser at posisjonering kan handle om følelser',
      'PRISKRIG: Å kjempe om "billigst"-posisjonen er nullsumstrategi — bare én kan vinne',
    ],
    practical: 'Besøk nettsidene til Kiwi og Meny. Skriv ned de tre første inntrykkene fra design, språk og bilder. Gjenspeiler inntrykkene posisjoneringskartets plassering?',
    glossaryTerm: 'Differensiering',
    exercises: [
      {
        id: 'po-5-1',
        question: 'Hvorfor eier NorgesGruppen kjeder med så ulik posisjonering?',
        choices: [
          { id: 'a', text: 'For å forvirre konkurrentene' },
          { id: 'b', text: 'For å nå ulike kundesegmenter uten intern kannibalisme mellom kjedene' },
          { id: 'c', text: 'Fordi alle kjedene tilfeldigvis ble kjøpt opp' },
          { id: 'd', text: 'For å lure skattemyndighetene' },
        ],
        correctId: 'b',
        explanation: 'NorgesGruppens fire-kjedestrategi lar dem betjene ulike kundesegmenter uten at kjedene konkurrerer mot hverandre.',
      },
      {
        id: 'po-5-2',
        question: 'Rema 1000s "Bestevenn"-kampanje posisjonerte dem som å stå på kundens side. Hva er dette eksempel på?',
        choices: [
          { id: 'a', text: 'Funksjonell posisjonering på pris' },
          { id: 'b', text: 'Emosjonell posisjonering — om følelser og verdier, ikke bare pris' },
          { id: 'c', text: 'Repositionering' },
          { id: 'd', text: 'USP-utvikling' },
        ],
        correctId: 'b',
        explanation: 'Rema 1000 gikk utover ren prisposisjonering til emosjonell posisjonering — de er ikke bare billige, de er på din side.',
      },
      {
        id: 'po-5-3',
        question: 'Hva er konsekvensen av at Kiwi og Rema 1000 begge kjemper om "billigst"-posisjonen?',
        choices: [
          { id: 'a', text: 'Kundene får lavere priser — positivt for alle' },
          { id: 'b', text: 'Priskrig som presser marginer for hele bransjen og ingen vinner varig' },
          { id: 'c', text: 'Markedet deles likt mellom dem' },
          { id: 'd', text: 'Meny og SPAR vinner markedsandeler' },
        ],
        correctId: 'b',
        explanation: 'Kamp om "billigst"-posisjonen er nullsumspill — priskrigen presser marginer for hele bransjen uten å gi varig fordel til noen.',
      },
      {
        id: 'po-5-4',
        question: 'Kiwi posisjonerer seg mot "ung, urban" kundegruppe. Hva betyr dette for sortiment og kommunikasjon?',
        choices: [
          { id: 'a', text: 'Ingenting — posisjonering er kun om pris' },
          { id: 'b', text: 'Sortiment, butikkdesign og kommunikasjon tilpasses den valgte målgruppens preferanser' },
          { id: 'c', text: 'Kiwi kun selger til unge mennesker' },
          { id: 'd', text: 'Aldersbasert diskriminering' },
        ],
        correctId: 'b',
        explanation: 'Posisjonering mot ung urban målgruppe påvirker alt: produktvalg (mer ferdig/street food), kommunikasjon (humor, digital kanal) og butikkdesign.',
      },
      {
        id: 'po-5-5',
        question: 'Al Ries og Jack Trout sa at den som eier en posisjon FØRST har størst fordel. Hva illustrerer Cola vs Pepsi?',
        choices: [
          { id: 'a', text: 'At Cola er objektivt sett bedre enn Pepsi' },
          { id: 'b', text: 'Pepsi vinner blindtester men Cola selger mer fordi den eier "original cola"-posisjonen' },
          { id: 'c', text: 'At Pepsi bør gi opp konkurransen' },
          { id: 'd', text: 'At pris er avgjørende i brusmarkedet' },
        ],
        correctId: 'b',
        explanation: 'Coca-Cola eide "original cola"-posisjonen i 100+ år. Pepsi vinner blindtester men taper i markedet — posisjon i hodet trumfer smak på tungen.',
      },
    ],
  },
]

export default function PosisjoneringModule() {
  return (
    <DrawerModule
      moduleCode="IMF-VG2-4"
      moduleTitle="Posisjonering"
      moduleIcon="📍"
      storageKey="learning-vg2-posisjonering"
      completeRoute="/learning/vg2/innovasjon/posisjonering/complete"
      phases={phases}
      intro="Posisjonering er en av de mektigste ideene i moderne markedsføring: kampen om plass i kundens hjerne er viktigere enn kampen om hylleplassen i butikken."
      vissteduAt="Pepsi vinner blindtester konsekvent, men Cola selger mer fordi den eier «original cola»-posisjonen i folks hoder — et perfekt eksempel på posisjonering trumfer smak."
      espenSier="Rema 1000 er billigst fordi de faktisk er billigst — ikke fordi de sier det. Posisjonering handler like mye om hva du gjør som om hva du sier."
      presentationLink={{ route: '/learning/presentations/forbrukeratferd', description: 'Forbrukeratferd — en visuell gjennomgang av posisjonering og segmentering' }}
    />
  )
}
