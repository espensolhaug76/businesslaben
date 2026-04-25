import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📊',
    title: 'Priselastisitet',
    quote: 'Hva skjer med salget når prisen endres?',
    content: 'Priselastisitet måler hvor mye etterspørselen endrer seg når prisen endres. Formelen: E = %ΔQ / %ΔP. Elastisk etterspørsel (|E| > 1): 1 % prisøkning gir mer enn 1 % salgsfall. Uelastisk (|E| < 1): 1 % prisøkning gir mindre enn 1 % salgsfall.',
    subpoints: [
      'ELASTISK (|E| > 1): Luksus og discretionary goods — flyreiser, klær, underholdning',
      'UELASTISK (|E| < 1): Nødvendigheter — insulin, bensin, strøm på kort sikt',
      'FAKTORER: Tilgjengelige substitutter, andel av inntekt, tid (lang sikt = mer elastisk)',
    ],
    practical: 'Inntektsoptimering: om |E| > 1, senk prisen for å øke totalinntekten. Om |E| < 1, øk prisen.',
    glossaryTerm: 'Priselastisitet',
    exercises: [
      {
        id: 'pr-1-1',
        question: 'Hva er priselastisitet?',
        choices: [
          { id: 'a', text: 'Bedriftens evne til å justere priser raskt' },
          { id: 'b', text: 'Et mål på hvor mye etterspørselen endrer seg når prisen endres' },
          { id: 'c', text: 'Konkurrentenes prisreaksjon på dine prisendringer' },
          { id: 'd', text: 'Markedets totale betalingsvillighet' },
        ],
        correctId: 'b',
        explanation: 'Priselastisitet (E = %ΔQ / %ΔP) måler hvor sensitiv etterspørselen er for prisendringer — viktig for å forstå konsekvensene av prisøkninger eller prisreduksjoner.',
      },
      {
        id: 'pr-1-2',
        question: 'Hva betyr elastisk etterspørsel (|E| > 1)?',
        choices: [
          { id: 'a', text: 'En prisøkning på 1 % gir less enn 1 % salgsfall' },
          { id: 'b', text: 'En prisøkning på 1 % gir mer enn 1 % salgsfall' },
          { id: 'c', text: 'Prisen har ingen effekt på etterspørselen' },
          { id: 'd', text: 'Salget er upåvirket av prisendringer' },
        ],
        correctId: 'b',
        explanation: 'Elastisk etterspørsel betyr at kunder er sensitive for pris — en liten prisøkning gir et forholdsmessig større salgsfall. Typisk for luksusprodukter og varer med mange substitutter.',
      },
      {
        id: 'pr-1-3',
        question: 'Insulin er uelastisk. Hva betyr dette for prisstrategien?',
        choices: [
          { id: 'a', text: 'Prisen bør senkes for å øke salget' },
          { id: 'b', text: 'Prisøkninger gir lite salgsfall — prisen kan heves uten stor etterspørselsreduksjon' },
          { id: 'c', text: 'Insulin bør selges gratis' },
          { id: 'd', text: 'Prisendringer er ikke mulig' },
        ],
        correctId: 'b',
        explanation: 'Uelastisk etterspørsel (insulin, livsnødvendige produkter) betyr at kunder kjøper uavhengig av pris. En prisøkning gir lite salgsfall — noe farmasøytiske selskaper utnytter.',
      },
      {
        id: 'pr-1-4',
        question: 'Hva påvirker om et produkt er elastisk eller uelastisk?',
        choices: [
          { id: 'a', text: 'Kun produktets pris' },
          { id: 'b', text: 'Tilgjengelige substitutter, andel av inntekt og tidsperspektiv' },
          { id: 'c', text: 'Kun produktets kvalitet' },
          { id: 'd', text: 'Kun markedsandelen' },
        ],
        correctId: 'b',
        explanation: 'Elastisiteten påvirkes av: tilgjengelige substitutter (mange = mer elastisk), andel av inntekt (stor andel = mer elastisk) og tid (på lang sikt er de fleste markeder mer elastiske).',
      },
      {
        id: 'pr-1-5',
        question: 'Hva bør du gjøre med prisen hvis |E| > 1 og du vil øke totalinntekten?',
        choices: [
          { id: 'a', text: 'Øke prisen' },
          { id: 'b', text: 'Senke prisen' },
          { id: 'c', text: 'Holde prisen stabil' },
          { id: 'd', text: 'Priselastisitet gir ikke informasjon om inntektsoptimering' },
        ],
        correctId: 'b',
        explanation: 'Hvis |E| > 1 (elastisk), betyr en prisreduksjon at salgsvolumveksten overstiger prisreduksjonen — totalinntekten øker. Dette er prinsippet bak salgskampanjer på elastiske produkter.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🧮',
    title: 'Tre prisingsmetoder',
    quote: 'Kostnadsbasert, konkurransebasert, verdibasert',
    content: 'Tre grunnleggende tilnærminger til prissetting. Kostnadsbasert: Pris = Kostnad + Fortjeneste (enkelt men ignorerer markedet). Konkurransebasert: Matcher konkurrenters pris. Verdibasert: Pris = Opplevd kundeverdi — det kundene er villige til å betale.',
    subpoints: [
      'KOSTBASERT: Pris = Kostnad + Markup — enkelt, men lar penger ligge på bordet',
      'KONKURRANSEBASERT: Matcher eller underslår konkurrenters pris — Rema 1000 matcher Kiwi daglig',
      'VERDIBASERT: Pris = Opplevd kundeverdi — Apple: iPhone koster 400 USD å produsere, selges for 1000 USD+',
    ],
    practical: 'Verdibasert prising krever god kundeinnsikt men gir de beste marginene. Kostbasert er trygt men lar penger ligge på bordet.',
    glossaryTerm: 'Prisingsmetoder',
    exercises: [
      {
        id: 'pr-2-1',
        question: 'Hva er kostbasert prising?',
        choices: [
          { id: 'a', text: 'Å sette prisen basert på hva kunder er villige til å betale' },
          { id: 'b', text: 'Pris = Produktkostnader + ønsket fortjenestemarkering' },
          { id: 'c', text: 'Å matche konkurrentenes priser' },
          { id: 'd', text: 'Å endre prisen dynamisk basert på etterspørsel' },
        ],
        correctId: 'b',
        explanation: 'Kostbasert prising (cost-plus) er enkel: legg til ønsket fortjeneste (markup) på kostnadene. Det er trygt og forutsigbart, men ignorerer markedet og risikerer å sette prisen feil.',
      },
      {
        id: 'pr-2-2',
        question: 'Rema 1000 matcher Kiwis priser daglig. Hvilken prisingsmetode er dette?',
        choices: [
          { id: 'a', text: 'Verdibasert prising' },
          { id: 'b', text: 'Kostbasert prising' },
          { id: 'c', text: 'Konkurransebasert prising' },
          { id: 'd', text: 'Dynamisk prising' },
        ],
        correctId: 'c',
        explanation: 'Konkurransebasert prising betyr å sette prisen i relasjon til konkurrentenes priser — Rema matcher eller underslår Kiwi for å signalisere laveste pris til forbrukerne.',
      },
      {
        id: 'pr-2-3',
        question: 'Apple setter iPhone-prisen langt over produksjonskostnaden. Hvilken prisingsmetode er dette?',
        choices: [
          { id: 'a', text: 'Kostbasert prising' },
          { id: 'b', text: 'Konkurransebasert prising' },
          { id: 'c', text: 'Verdibasert prising' },
          { id: 'd', text: 'Penetrasjonsprising' },
        ],
        correctId: 'c',
        explanation: 'Verdibasert prising setter prisen etter hva kundene er villige til å betale — Apples iPhone koster ca. 400 USD å produsere men selges for 1000+ USD fordi kundene opplever den som det verdt.',
      },
      {
        id: 'pr-2-4',
        question: 'Hva er ulempen med kostbasert prising?',
        choices: [
          { id: 'a', text: 'Det er for komplekst å beregne' },
          { id: 'b', text: 'Det ignorerer markedet og kan sette prisen for høyt eller for lavt i forhold til kundeverdi' },
          { id: 'c', text: 'Det krever for mye kundeinnsikt' },
          { id: 'd', text: 'Det er kun egnet for luksusprodukter' },
        ],
        correctId: 'b',
        explanation: 'Kostbasert prising ignorerer hva markedet faktisk er villig til å betale — man kan sette prisen for lavt (lar fortjeneste ligge) eller for høyt (mister kunder) i forhold til kundeverdi.',
      },
      {
        id: 'pr-2-5',
        question: 'Hvilken prisingsmetode krever best kundeinnsikt men gir høyest fortjenestepotensial?',
        choices: [
          { id: 'a', text: 'Kostbasert prising' },
          { id: 'b', text: 'Konkurransebasert prising' },
          { id: 'c', text: 'Verdibasert prising' },
          { id: 'd', text: 'Alle metoder krever like mye innsikt' },
        ],
        correctId: 'c',
        explanation: 'Verdibasert prising krever grundig forståelse av kundenes opplevde verdi — det er krevende, men gir det høyeste fortjenestemarginen fordi man fanger verdien kunden faktisk oppfatter.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🧠',
    title: 'Prispsykologi og anchoring',
    quote: 'Hjernen er ikke rasjonell',
    content: 'Kunder tar psykologiske, ikke rasjonelle prisavgjørelser. Odd pricing: 299 kr oppfattes som "rundt 200" — 24 % høyere salg for 9-endede priser. Anchoring: første pris setter referansepunktet. Decoy pricing og bundling øker opplevd verdi.',
    subpoints: [
      'ODD PRICING: 299 kr oppfattes som «rundt 200» — 24 % høyere salg for 9-endede priser',
      'ANCHORING: Den første prisen du ser setter referansepunktet («Fra 12 000, nå 6 000!»)',
      'DECOY PRICING: Lokkprodukt gjør et annet alternativ mer attraktivt — Netflix-pakker',
      'BUNDLING: Selg produkter samlet til lavere pris enn individuell sum — McDonald\'s-meny',
    ],
    practical: 'Starbucks bruker "tall, grande, venti" istedenfor small/medium/large — bevisst for å unngå at folk velger "small".',
    glossaryTerm: 'Prispsykologi',
    exercises: [
      {
        id: 'pr-3-1',
        question: 'Hva er «odd pricing» i prispsykologi?',
        choices: [
          { id: 'a', text: 'Å sette rare og uvanlige priser' },
          { id: 'b', text: 'Å sette priser som slutter på 9 (299, 499) — oppfattes som lavere enn runde tall' },
          { id: 'c', text: 'Å gi odde rabatter (13 %, 17 %)' },
          { id: 'd', text: 'Å variere prisen basert på ukedag' },
        ],
        correctId: 'b',
        explanation: 'Odd pricing betyr priser som slutter på 9 — 299 kr oppfattes psykologisk som "rundt 200" fremfor "nesten 300". Forskning viser 24 % høyere salg for 9-endede priser vs. runde tall.',
      },
      {
        id: 'pr-3-2',
        question: 'En møbelbutikk annonserer «Fra 12 000, nå 6 000!». Hva er 12 000-prisen?',
        choices: [
          { id: 'a', text: 'Den normale markedsprisen' },
          { id: 'b', text: 'Et anker — referansepunktet som gjør 6 000 til "billig"' },
          { id: 'c', text: 'Produksjonskostnaden' },
          { id: 'd', text: 'Konkurrentenes pris' },
        ],
        correctId: 'b',
        explanation: 'Anchoring: den første prisen (12 000) setter referansepunktet i kundens sinn. 6 000 oppfattes som billig relativt til ankeret, selv om absolutt pris ikke nødvendigvis er billig.',
      },
      {
        id: 'pr-3-3',
        question: 'Netflix tilbyr Grunnpakke 99 kr, Standard 149 kr og Premium 169 kr. Hva er Premium her?',
        choices: [
          { id: 'a', text: 'Det klart beste valget for alle kunder' },
          { id: 'b', text: 'Et lokke-produkt (decoy) som gjør Standard til «beste deal»' },
          { id: 'c', text: 'Kun for bedriftskunder' },
          { id: 'd', text: 'Pakken Netflix vil at alle skal velge' },
        ],
        correctId: 'b',
        explanation: 'Decoy pricing: Premium-pakken (169 kr) er plassert for å gjøre Standard (149 kr) til det åpenbare valget — for bare 20 kr ekstra vs. 50 kr for Premium. Standard er det Netflix egentlig vil selge.',
      },
      {
        id: 'pr-3-4',
        question: 'Hva er bundling i prissetting?',
        choices: [
          { id: 'a', text: 'Å pakke produkter i bærekraftig emballasje' },
          { id: 'b', text: 'Å selge produkter samlet til lavere pris enn individuell kjøpssum' },
          { id: 'c', text: 'Å binde kunder til langsiktige kontrakter' },
          { id: 'd', text: 'Å gruppere kunder etter kjøpsatferd' },
        ],
        correctId: 'b',
        explanation: 'Bundling betyr å selge produkter samlet — McDonald\'s-menyen koster mindre enn burger + pommes + brus separat. Det øker opplevd verdi og totalt kjøpsbeløp.',
      },
      {
        id: 'pr-3-5',
        question: 'Starbucks bruker «tall, grande, venti» istedenfor small/medium/large. Hva er hensikten?',
        choices: [
          { id: 'a', text: 'For å virke internasjonalt og eksotisk' },
          { id: 'b', text: 'For å unngå at kunder velger «small» — alle alternativene høres like store ut' },
          { id: 'c', text: 'For å overholde EU-regelverk om størrelsesmål' },
          { id: 'd', text: 'Det er kun en tilfeldig tradisjon' },
        ],
        correctId: 'b',
        explanation: 'Starbucks bevisst unngår «small» ved å kalle minste størrelse «tall» (stor). Det reduserer psykologisk barrieren for å velge mellomstor («grande») og stor («venti») — øker gjennomsnittlig kjøp.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '⚡',
    title: 'Dynamisk prising',
    quote: 'Pris som endrer seg i sanntid',
    content: 'Dynamisk prising betyr at priser justeres automatisk basert på etterspørsel, tid, konkurranse og kapasitet. Ryanair endrer priser 24 millioner ganger per dag. Uber bruker surge pricing. Amazon endrer priser 2,5 millioner ganger per dag. Standard i reiseliv, underholdning og plattformøkonomi.',
    subpoints: [
      'FLYINDUSTRIEN: Ryanair endrer priser 24 millioner ganger per dag — tidlig booking billigst',
      'HOTELL: Høysesong = 3x normal pris. Revenue management er eget fagfelt',
      'UBER: Surge pricing — topp-etterspørsel øker prisen 2-8x og incentiviserer flere sjåfører',
      'AMAZON: Endrer priser 2,5 millioner ganger per dag — algoritmen matcher konkurrenter',
    ],
    practical: 'Dynamisk prising er etisk kontroversielt (hvem rammes?) — men er nå standard i reiseliv og plattformøkonomi.',
    glossaryTerm: 'Dynamisk prising',
    exercises: [
      {
        id: 'pr-4-1',
        question: 'Hva er dynamisk prising?',
        choices: [
          { id: 'a', text: 'Å ha ulike priser i ulike butikker' },
          { id: 'b', text: 'Priser som justeres automatisk basert på etterspørsel, tid og konkurranse' },
          { id: 'c', text: 'Å gi prisrabatter til faste kunder' },
          { id: 'd', text: 'Å endre prisliste én gang i året' },
        ],
        correctId: 'b',
        explanation: 'Dynamisk prising bruker algoritmer til å justere priser kontinuerlig basert på etterspørsel, kapasitet, tid og konkurranse — som flypriser som endrer seg daglig.',
      },
      {
        id: 'pr-4-2',
        question: 'Ryanair endrer priser 24 millioner ganger per dag. Hva er prinsippet bak?',
        choices: [
          { id: 'a', text: 'Tilfeldig variasjon for å forvirre konkurrenter' },
          { id: 'b', text: 'Prisen reflekterer nåværende etterspørsel og gjenværende setekapasitet' },
          { id: 'c', text: 'Prisene settes av myndighetene' },
          { id: 'd', text: 'Prisene følger alltid konkurrentene' },
        ],
        correctId: 'b',
        explanation: 'Ryanairs dynamiske prising reflekterer nåværende etterspørsel og gjenværende kapasitet — tidlig booking er billigst fordi det fylles opp over tid, og siste dag er dyrest for forretningsreisende.',
      },
      {
        id: 'pr-4-3',
        question: 'Hva er Ubers «surge pricing»?',
        choices: [
          { id: 'a', text: 'Rabatter for stamkunder' },
          { id: 'b', text: 'Prisøkning under perioder med høy etterspørsel for å incentivisere flere sjåfører' },
          { id: 'c', text: 'Ekstra gebyr for lange turer' },
          { id: 'd', text: 'Lavere pris ved lav etterspørsel' },
        ],
        correctId: 'b',
        explanation: 'Surge pricing øker prisen 2-8x under topp-etterspørsel (konsertavslutning, snøstorm). Effekten er to-sidig: kunder betaler mer, men flere sjåfører incentiviseres til å kjøre.',
      },
      {
        id: 'pr-4-4',
        question: 'Hva er den etiske utfordringen med dynamisk prising?',
        choices: [
          { id: 'a', text: 'Det er for komplekst for kunder å forstå' },
          { id: 'b', text: 'Det kan ramme sårbare grupper uforholdsmessig, f.eks. ved kriser når folk er avhengige av tjenesten' },
          { id: 'c', text: 'Det er illegal i EU' },
          { id: 'd', text: 'Det er ingen etiske utfordringer' },
        ],
        correctId: 'b',
        explanation: 'Dynamisk prising er kontroversielt fordi det kan ramme sårbare grupper — f.eks. under en krise når folk desperate trenger transport, er det etisk tvilsomt å mangedoble prisen.',
      },
      {
        id: 'pr-4-5',
        question: 'Amazon endrer priser 2,5 millioner ganger per dag. Hva er hensikten?',
        choices: [
          { id: 'a', text: 'Å forvirre kunder' },
          { id: 'b', text: 'Å matche konkurrenter og optimere konverteringsraten' },
          { id: 'c', text: 'Å teste kundenes betalingsvillighet' },
          { id: 'd', text: 'Å overholde regulatoriske krav' },
        ],
        correctId: 'b',
        explanation: 'Amazons prisalgoritmer matcher kontinuerlig konkurrentenes priser og optimerer for konverteringsrate — målet er å være prisledende uten å underprise unødvendig.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '✂️',
    title: 'Prisdiskriminering og segmentbasert prising',
    quote: 'Ulik pris til ulike kunder',
    content: 'Prisdiskriminering betyr å selge samme produkt til ulik pris til ulike kundegrupper — lovlig og vanlig! 1. grads: personlig prising (maks betalingsvillighet). 2. grads: volumrabatt. 3. grads: ulike priser til ulike segmenter (studentrabatt, barnepris). Geografisk diskriminering: Starbucks priser ulikt i ulike land.',
    subpoints: [
      '1. GRADS: Perfekt personlig prising — kjøper betaler sin maksbetaling (ikke realistisk i massemarkedet)',
      '2. GRADS: Volumrabatt — jo mer du kjøper, jo lavere enhetspris',
      '3. GRADS: Ulik pris til ulike segmenter — studentrabatt, honnørpris, barnepris',
      'GEOGRAFISK: Starbucks priser ulikt i ulike land basert på lokal kjøpekraft',
    ],
    practical: 'Prisdiskriminering er lønnsomt fordi det fanger verdi fra kunder med høy betalingsvillighet og volumkunder. Enhetspris er sjelden optimal.',
    glossaryTerm: 'Prisdiskriminering',
    exercises: [
      {
        id: 'pr-5-1',
        question: 'Hva er prisdiskriminering?',
        choices: [
          { id: 'a', text: 'En ulovlig praksis der selskaper diskriminerer kunder' },
          { id: 'b', text: 'Å selge samme produkt til ulik pris til ulike kundegrupper — lovlig og vanlig' },
          { id: 'c', text: 'Å ha ulike priser i ulike butikker' },
          { id: 'd', text: 'Å gi rabatter til stamkunder' },
        ],
        correctId: 'b',
        explanation: 'Prisdiskriminering betyr å selge samme produkt til ulik pris til ulike kundegrupper basert på betalingsvillighet eller segment. Det er en lovlig og utbredt strategi for å øke lønnsomheten.',
      },
      {
        id: 'pr-5-2',
        question: 'En kino selger billetter til 150 kr for voksne, 100 kr for studenter og 80 kr for barn. Hvilken prisdiskriminering er dette?',
        choices: [
          { id: 'a', text: '1. grads diskriminering' },
          { id: 'b', text: '2. grads diskriminering (volumrabatt)' },
          { id: 'c', text: '3. grads diskriminering' },
          { id: 'd', text: 'Geografisk diskriminering' },
        ],
        correctId: 'c',
        explanation: '3. grads prisdiskriminering betyr ulike priser til ulike kundesegmenter basert på identifiserbare kjennetegn som alder (barn vs. voksen) eller status (student).',
      },
      {
        id: 'pr-5-3',
        question: 'NorgesGruppen gir store kjeder bedre innkjøpspris enn kiosker. Hvilken prisdiskriminering er dette?',
        choices: [
          { id: 'a', text: '1. grads diskriminering' },
          { id: 'b', text: '2. grads diskriminering (volumrabatt)' },
          { id: 'c', text: '3. grads diskriminering' },
          { id: 'd', text: 'Geografisk diskriminering' },
        ],
        correctId: 'b',
        explanation: '2. grads diskriminering er volumbasert — jo mer du kjøper, jo lavere enhetspris. Stordriftsfordelen deles med kunden som tar høyt volum.',
      },
      {
        id: 'pr-5-4',
        question: 'Starbucks priser 3 USD i USA, 6 USD i Sveits og 1 USD i Kina. Hva er dette?',
        choices: [
          { id: 'a', text: '3. grads prisdiskriminering' },
          { id: 'b', text: 'Geografisk prisdiskriminering' },
          { id: 'c', text: '2. grads prisdiskriminering' },
          { id: 'd', text: 'Dynamisk prising' },
        ],
        correctId: 'b',
        explanation: 'Geografisk prisdiskriminering betyr ulike priser i ulike land basert på lokal kjøpekraft og konkurransesituasjon — Starbucks tilpasser prisen til hva markedet kan bære lokalt.',
      },
      {
        id: 'pr-5-5',
        question: 'Hvorfor er prisdiskriminering lønnsomt for bedriften?',
        choices: [
          { id: 'a', text: 'Det reduserer totalt salgsvolum' },
          { id: 'b', text: 'Det fanger mer av verdien fra kunder med høy betalingsvillighet og sikrer volum fra prissensitive kunder' },
          { id: 'c', text: 'Det reduserer administrative kostnader' },
          { id: 'd', text: 'Det er kun lønnsomt for store selskaper' },
        ],
        correctId: 'b',
        explanation: 'Prisdiskriminering er lønnsomt fordi det lar bedriften fange mer av verdien fra kunder med høy betalingsvillighet (premium-pris) og samtidig nå prissensitive kunder (lavere pris) — en enhetspris er sjelden optimal.',
      },
    ],
  },
];

export default function PrisstrategiMl1Module() {
  return (
    <DrawerModule
      moduleCode="ML1-06"
      moduleTitle="Prisstrategi"
      moduleIcon="💰"
      storageKey="learning-ml1-prisstrategi"
      completeRoute="/learning/ml1/prisstrategi/complete"
      phases={phases}
      intro="Pris er det eneste elementet i markedsmiksen som genererer inntekt — alt annet er kostnader. Riktig prissetting er derfor den kraftigste enkeltfaktoren for lønnsomhet."
      vissteduAt="Amazon endrer priser 2,5 millioner ganger per dag — i snitt endres en produktpris hvert 10. minutt. En Apple iPhone ble mer enn 40 ganger prisjustert i løpet av lanserings-kvartalet."
      espenSier="Prissetting er den kraftigste og raskeste måten å øke lønnsomheten på — 1 % prisøkning øker fortjenesten mer enn 1 % kostnadsreduksjon. Ikke gå inn i priskonkurranse uten å ha lavest kostnader i bransjen."
      presentationLink={{ route: '/learning/presentations/ml1/prisstrategi', description: 'Pris som konkurransemiddel — 10 slides' }}
    />
  );
}
