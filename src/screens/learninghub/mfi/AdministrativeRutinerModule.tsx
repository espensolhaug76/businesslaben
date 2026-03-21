import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🏗️',
    title: 'Hva er administrative rutiner og hvorfor finnes de?',
    quote: 'Rutiner er ikke kontroll — de er beskyttelse.',
    content: 'En administrativ rutine er en nedskrevet, standardisert fremgangsmåte for hvordan en oppgave skal utføres, av hvem og når. Uten rutiner oppstår det kaos: ansatte tar egne avgjørelser, kunder opplever ulike resultater avhengig av hvem de snakker med, og feil som stjeling eller kassedifferanser forblir uoppdaget lenge.',
    subpoints: [
      { label: 'STANDARDISERING', text: 'Når alle gjør ting likt, kan du trene raskt, sikre kvalitet og sammenligne resultater mellom ulike vakter eller avdelinger.' },
      { label: 'SPORBARHET', text: 'Rutiner skaper dokumentasjon som gjør det mulig å finne ut hva som skjedde hvis noe går galt — essensielt ved reklamasjoner og revisjon.' },
      { label: 'OPPLÆRING', text: 'En ny ansatt i Elkjøp kan komme opp i fart raskere fordi alt er dokumentert — de trenger ikke «lære av erfaring» for å gjøre grunnleggende oppgaver riktig.' },
    ],
    practical: 'Les og forstå butikkens egne rutinehåndbøker — de er ikke byråkrati, de er bedriftens oppsummerte erfaring fra alt som har gått galt tidligere.',
    exercises: [
      {
        id: 'ar-1-1',
        question: 'Hva er hovedformålet med administrative rutiner?',
        choices: [
          { id: 'a', text: 'Å kontrollere og overvåke ansatte' },
          { id: 'b', text: 'Å standardisere arbeidsprosesser slik at oppgaver utføres korrekt og konsistent' },
          { id: 'c', text: 'Å redusere antall ansatte' },
          { id: 'd', text: 'Å spare tid på møter' },
        ],
        correctId: 'b',
        explanation: 'Rutiner sikrer konsistens — samme kvalitet uavhengig av hvem som jobber, når og under hvilke omstendigheter.',
      },
      {
        id: 'ar-1-2',
        question: 'Hvorfor sies det at rutiner «beskytter» ansatte?',
        choices: [
          { id: 'a', text: 'Fordi de gir bonusutbetalinger' },
          { id: 'b', text: 'Fordi de fjerner gjettearbeid og beskytter mot uriktige anklager ved å dokumentere at ting ble gjort riktig' },
          { id: 'c', text: 'Fordi de gir kortere arbeidstid' },
          { id: 'd', text: 'Fordi de hindrer kundeklager' },
        ],
        correctId: 'b',
        explanation: 'Dokumenterte rutiner beskytter ansatte — to-persons-prinsippet på kassen eksisterer bl.a. for å beskytte enkeltansatte mot urettmessige mistanker.',
      },
      {
        id: 'ar-1-3',
        question: 'Hva betyr «sporbarhet» i kontekst av administrative rutiner?',
        choices: [
          { id: 'a', text: 'At man kan spore ansattes bevegelser i butikken' },
          { id: 'b', text: 'At det finnes dokumentasjon som gjør det mulig å rekonstruere hva som skjedde ved avvik eller klager' },
          { id: 'c', text: 'At produkter er merket med strekkode' },
          { id: 'd', text: 'At kunder kan spore leveransen sin' },
        ],
        correctId: 'b',
        explanation: 'Sporbarhet betyr at rutiner etterlater et dokumentasjonsspor — ved en reklamasjon tre år etter kan man slå opp og se nøyaktig hva som skjedde.',
      },
      {
        id: 'ar-1-4',
        question: 'H&M håndterer 500+ transaksjoner per time. Hva er den viktigste grunnen til at dette fungerer?',
        choices: [
          { id: 'a', text: 'Avansert teknologi' },
          { id: 'b', text: 'Svært erfarne ansatte' },
          { id: 'c', text: 'Klare, standardiserte rutiner som gjør det mulig for nye ansatte å håndtere alle situasjoner korrekt' },
          { id: 'd', text: 'Streng overvåking' },
        ],
        correctId: 'c',
        explanation: 'Store detaljhandelsorganisasjoner fungerer fordi rutinene er så gode at selv uerfarne deltidsansatte kan gjøre jobben riktig fra dag én.',
      },
      {
        id: 'ar-1-5',
        question: 'Hva er galt med holdningen «vi løser problemer etter hvert som de oppstår» i stedet for å følge rutiner?',
        choices: [
          { id: 'a', text: 'Ingenting — det er den beste tilnærmingen' },
          { id: 'b', text: 'Man ignorerer at rutinene allerede er laget for å løse nettopp de problemene som oppstår' },
          { id: 'c', text: 'Det er bare et problem for store bedrifter' },
          { id: 'd', text: 'Det er litt ineffektivt men ikke noe stort problem' },
        ],
        correctId: 'b',
        explanation: 'Rutiner er summen av alle problemene som allerede har oppstått og er løst — å «finne opp hjulet på nytt» hver gang er ineffektivt og risikofullt.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔄',
    title: 'Returhåndtering og reklamasjon',
    quote: 'En god returopplevelse skaper en lojal kunde. En dårlig returopplevelse skaper en kritiker.',
    content: 'Returhåndtering er et av de øyeblikkene der en bedrift virkelig viser hva den er laget av. Det rettslige rammeverket er forbrukerkjøpsloven, som gir forbrukere rett til reklamasjon i to år på varer med fabrikasjonsfeil.',
    subpoints: [
      { label: 'REKLAMASJONSRETT', text: 'Kunden har rett til å reklamere på varer med fabrikasjonsfeil i inntil to år — bedriften plikter å reparere, erstatte eller refundere.' },
      { label: 'ANGRERETT', text: 'Ved kjøp på nett eller utenfor fast utsalgssted har kunden 14 dagers angrerett — varen kan returneres uten å oppgi grunn.' },
      { label: 'DOKUMENTASJON', text: 'All retur skal registreres med dato, årsak og kundeinfo — dette brukes til leverandørkrav, statistikk og å avdekke misbruk.' },
    ],
    practical: 'Behandle alltid reklamasjoner med profesjonalitet og empati — kunden husker ikke produktet like godt som de husker hvordan de ble behandlet da noe gikk galt.',
    exercises: [
      {
        id: 'ar-2-1',
        question: 'Hva er reklamasjonsretten i henhold til forbrukerkjøpsloven?',
        choices: [
          { id: 'a', text: 'Retten til å returnere et produkt innen 30 dager uansett årsak' },
          { id: 'b', text: 'Retten til å reklamere på fabrikasjonsfeil i inntil to år' },
          { id: 'c', text: 'Retten til full refusjon innen 14 dager' },
          { id: 'd', text: 'Retten til gratis frakt ved retur' },
        ],
        correctId: 'b',
        explanation: 'Forbrukerkjøpsloven gir to års reklamasjonsrett på varer med fabrikasjonsfeil — bedriften kan ikke avtale seg bort fra dette.',
      },
      {
        id: 'ar-2-2',
        question: 'Hva er angreretten og når gjelder den?',
        choices: [
          { id: 'a', text: '30 dagers returrett i alle butikker' },
          { id: 'b', text: '14 dagers rett til å angre kjøp gjort på nett eller utenfor fast utsalgssted, uten å oppgi grunn' },
          { id: 'c', text: 'Retten til reparasjon ved feil' },
          { id: 'd', text: '2 års garanti på alle varer' },
        ],
        correctId: 'b',
        explanation: 'Angreretten gjelder spesifikt for fjernsalg (nett) og salg utenfor fast utsalgssted — 14 dager, og kunden trenger ikke oppgi noen grunn.',
      },
      {
        id: 'ar-2-3',
        question: 'En kunde kjøpte et produkt for to år siden på nett og ber om retur fordi de ikke liker det lenger. Hva gjelder?',
        choices: [
          { id: 'a', text: 'Angreretten — de kan returnere det' },
          { id: 'b', text: 'Verken angrerett eller reklamasjonsrett — angreretten er utløpt, og det er ingen feil' },
          { id: 'c', text: 'Reklamasjonsretten gjelder' },
          { id: 'd', text: 'Butikken bestemmer selv' },
        ],
        correctId: 'b',
        explanation: 'Angreretten er kun 14 dager. Reklamasjonsretten krever en fabrikasjonsfeil. Å ikke like produktet er verken angrerett eller reklamasjonsgrunnlag.',
      },
      {
        id: 'ar-2-4',
        question: 'Hvorfor er det viktig å registrere alle returer med dato, årsak og kundeinfo?',
        choices: [
          { id: 'a', text: 'Det er et GDPR-krav' },
          { id: 'b', text: 'For å ha grunnlag for leverandørkrav, statistikk og å avdekke eventuelt misbruk' },
          { id: 'c', text: 'For å gjøre returer vanskeligere for kunden' },
          { id: 'd', text: 'Kun av hensyn til regnskapet' },
        ],
        correctId: 'b',
        explanation: 'God returregistrering gir verdifull data: hvilke produkter har mange returer? Er det mønstre? Kan leverandøren holdes ansvarlig? Er det misbruk?',
      },
      {
        id: 'ar-2-5',
        question: 'En kunde er sint og klager høylytt i butikken over et defekt produkt. Hva er den profesjonelle tilnærmingen?',
        choices: [
          { id: 'a', text: 'Si at det er kundens feil og peke på bruksanvisningen' },
          { id: 'b', text: 'Anerkjenne kundens frustrasjon og følge returrutinen profesjonelt' },
          { id: 'c', text: 'Tilby rabatt uten å undersøke saken' },
          { id: 'd', text: 'Be kunden komme tilbake en annen gang' },
        ],
        correctId: 'b',
        explanation: 'Profesjonell reklamasjonshåndtering starter med empati, deretter systematisk behandling etter rutinen — kunden husker behandlingen lenge etter at produktet er glemt.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💵',
    title: 'Kasserutiner og kontantflyt',
    quote: 'Strenge kasserutiner er ikke mistillit — det er profesjonalitet.',
    content: 'Kassehåndtering er et av de mest rutinepregede — og viktigste — elementene i detaljhandel. Åpningsrutinen innebærer alltid å telle vekselkassen mot et dokumentert startbeløp, og ved stenging skrives Z-rapporten ut og dagsoppgjøret dokumenteres.',
    subpoints: [
      { label: 'X-RAPPORT', text: 'En mellomavlesning av kassen som viser dagens omsetning så langt uten å nullstille — brukes til kontroll underveis i arbeidsdagen.' },
      { label: 'Z-RAPPORT', text: 'Sluttrapporten som nullstiller kassen og dokumenterer all omsetning for dagen — dette er grunnlaget for dagsoppgjøret og regnskapet.' },
      { label: 'TO-PERSONS PRINSIPPET', text: 'To ansatte teller og signerer på alle kassaoppgjør — eliminerer muligheten for stille feil og beskytter enkeltansatte mot uriktige mistanker.' },
    ],
    practical: 'Følg alltid kassarutinene til punkt og prikke, selv i travle perioder — det er nettopp i travle perioder at feil oppstår og rutinene betyr mest.',
    exercises: [
      {
        id: 'ar-3-1',
        question: 'Hva er en X-rapport?',
        choices: [
          { id: 'a', text: 'En slutrapport som nullstiller kassen' },
          { id: 'b', text: 'En mellomavlesning som viser dagens omsetning uten å nullstille kassen' },
          { id: 'c', text: 'En rapport over returvarer' },
          { id: 'd', text: 'En ukentlig omsetningsrapport' },
        ],
        correctId: 'b',
        explanation: 'X-rapporten er en midlertidig kontroll — du kan se status uten å nullstille kassen, nyttig for sjekk midt i arbeidsdagen.',
      },
      {
        id: 'ar-3-2',
        question: 'Hva er en Z-rapport?',
        choices: [
          { id: 'a', text: 'En mellomkontroll av kassen' },
          { id: 'b', text: 'En månedlig salgsrapport' },
          { id: 'c', text: 'Sluttrapporten ved stenging som nullstiller kassen og dokumenterer dagens omsetning' },
          { id: 'd', text: 'En rapport over kontantbeholdning' },
        ],
        correctId: 'c',
        explanation: 'Z-rapporten avslutter dagen — nullstiller kassen, dokumenterer all omsetning og gir grunnlaget for dagsoppgjøret og regnskapet.',
      },
      {
        id: 'ar-3-3',
        question: 'Hvorfor krever man at to ansatte signerer på kassaoppgjøret?',
        choices: [
          { id: 'a', text: 'For å spare tid' },
          { id: 'b', text: 'For å vise at ledelsen ikke stoler på noen' },
          { id: 'c', text: 'For å eliminere muligheten for feil og beskytte enkeltansatte mot urettmessige anklager' },
          { id: 'd', text: 'Det er et lovkrav i alle bransjer' },
        ],
        correctId: 'c',
        explanation: 'To-persons-prinsippet handler om profesjonalitet, ikke mistillit — det eliminerer tvil og beskytter alle parter hvis det oppstår spørsmål om oppgjøret.',
      },
      {
        id: 'ar-3-4',
        question: 'Hva er en kassedifferanse?',
        choices: [
          { id: 'a', text: 'Forskjellen i pris mellom to produkter' },
          { id: 'b', text: 'Differansen mellom forventet og faktisk kontantbeholdning i kassen' },
          { id: 'c', text: 'Differansen mellom budsjettert og faktisk omsetning' },
          { id: 'd', text: 'Merverdiavgiften på daglig omsetning' },
        ],
        correctId: 'b',
        explanation: 'Kassedifferanse oppstår når den faktiske beholdningen ikke stemmer med hva systemet sier det bør være — kan skyldes feil, tyveri eller tekniske problemer.',
      },
      {
        id: 'ar-3-5',
        question: 'Hva bør man gjøre ved åpning av kassen?',
        choices: [
          { id: 'a', text: 'Direkte begynne å ta imot kunder' },
          { id: 'b', text: 'Telle vekselkassen og kontrollere mot dokumentert startbeløp' },
          { id: 'c', text: 'Skrive ut Z-rapport' },
          { id: 'd', text: 'Nullstille kassen' },
        ],
        correctId: 'b',
        explanation: 'Åpningsrutinen starter alltid med å telle vekselkassen mot dokumentert startbeløp — dette avdekker eventuelle differanser fra forrige dag umiddelbart.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📁',
    title: 'Dokumentasjon og arkivering',
    quote: 'Dokumentasjon er ikke papirarbeid — det er bedriftens hukommelse.',
    content: 'Norsk lov krever at bedrifter oppbevarer regnskapsrelaterte dokumenter i minimum fem år. Dårlig arkivering har kostet norske bedrifter millioner i rettssaker der de ikke klarte å dokumentere sin side av saken.',
    subpoints: [
      { label: 'FEMÅRSKRAVET', text: 'Regnskapsloven krever at alle bilag og transaksjonsdata oppbevares i minst fem år — brudd på dette er en alvorlig lovovertreding.' },
      { label: 'PERSONVERNHENSYN', text: 'Kundeopplysninger skal oppbevares i henhold til GDPR — ikke lenger enn nødvendig og med tilstrekkelig sikkerhet mot uautorisert tilgang.' },
      { label: 'DIGITAL SIKKERHET', text: 'All digital dokumentasjon skal ha sikkerhetskopi og tilgangsstyring — et dataangrep mot en norsk dagligvarekjede i 2021 viste hva som kan skje uten dette.' },
    ],
    practical: 'Gjør dokumentasjon til en daglig vane, ikke en ukentlig opprydning — fem minutter på slutten av hver vakt sparer timevis med leting senere.',
    exercises: [
      {
        id: 'ar-4-1',
        question: 'Hvor lenge krever regnskapsloven at bedrifter oppbevarer regnskapsbilag?',
        choices: [
          { id: 'a', text: 'To år' },
          { id: 'b', text: 'Tre år' },
          { id: 'c', text: 'Fem år' },
          { id: 'd', text: 'Ti år' },
        ],
        correctId: 'c',
        explanation: 'Regnskapsloven krever minimum fem års oppbevaring av alle bilag og transaksjonsdata — brudd er en alvorlig lovovertreding.',
      },
      {
        id: 'ar-4-2',
        question: 'Hva er GDPR-kravet til bedrifter om lagring av kundedata?',
        choices: [
          { id: 'a', text: 'Data skal lagres for alltid for å kunne hjelpe kunden' },
          { id: 'b', text: 'Data skal ikke lagres lenger enn nødvendig og må beskyttes mot uautorisert tilgang' },
          { id: 'c', text: 'Data kan deles med tredjeparter fritt' },
          { id: 'd', text: 'Alle data skal lagres i papirformat' },
        ],
        correctId: 'b',
        explanation: 'GDPR (datapersonvern) krever at persondata kun lagres så lenge det er nødvendig for formålet og beskyttes tilstrekkelig — dette gjelder alle norske bedrifter.',
      },
      {
        id: 'ar-4-3',
        question: 'Hva er hensikten med sikkerhetskopi av digital dokumentasjon?',
        choices: [
          { id: 'a', text: 'For å spare plass på serveren' },
          { id: 'b', text: 'For å sikre at dokumenter ikke går tapt ved dataangrep, teknisk feil eller naturkatastrofe' },
          { id: 'c', text: 'For å oppfylle lønnsplikten' },
          { id: 'd', text: 'Det er ikke nødvendig med moderne systemer' },
        ],
        correctId: 'b',
        explanation: 'Backup sikrer at bedriften kan gjenopprette data etter dataangrep, serverfeil eller andre hendelser — tap av regnskapsdata kan ha alvorlige konsekvenser.',
      },
      {
        id: 'ar-4-4',
        question: 'Hvorfor er god arkivering spesielt viktig ved kundetvister?',
        choices: [
          { id: 'a', text: 'Fordi det imponerer kunden' },
          { id: 'b', text: 'Fordi dokumentasjon gjør det mulig å bevise hva som faktisk skjedde og beskytte bedriftens interesser i en tvist' },
          { id: 'c', text: 'Det er ikke særlig viktig' },
          { id: 'd', text: 'Fordi retten alltid tror på bedriften' },
        ],
        correctId: 'b',
        explanation: 'I rettssaker og tvister vinner den som kan dokumentere — bedrifter uten god arkivering kan miste saker de egentlig hadde rett i fordi de ikke kan bevise det.',
      },
      {
        id: 'ar-4-5',
        question: 'Hva er tilgangskontroll i kontekst av digital dokumentasjon?',
        choices: [
          { id: 'a', text: 'At kun systemadministrator kan bruke datamaskinen' },
          { id: 'b', text: 'At kun autoriserte personer har tilgang til sensitive dokumenter og data' },
          { id: 'c', text: 'At kunder kan se all dokumentasjon' },
          { id: 'd', text: 'At alle ansatte deler én felles innlogging' },
        ],
        correctId: 'b',
        explanation: 'Tilgangskontroll sikrer at sensitiv informasjon (kundeopplysninger, lønn, finansielle data) kun er tilgjengelig for de som har tjenstlig behov for det.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '✅',
    title: 'Kvalitetssikring og avviksbehandling',
    quote: 'Å melde avvik er profesjonalitet, ikke klaging.',
    content: 'Et avvik er enhver situasjon der virkeligheten ikke stemmer med forventet standard eller rutine. Det som skiller modne organisasjoner fra umodne er ikke at avvik skjer — de skjer overalt — men om de blir rapportert, analysert og brukt til forbedring.',
    subpoints: [
      { label: 'HVA ER ET AVVIK', text: 'Enhver hendelse som avviker fra rutine, standard eller forventning — fra feil varethyllepris til kundeklage til ansattskade.' },
      { label: 'AVVIKSREGISTRERING', text: 'Avvik skal nedtegnes med dato, hva som skjedde, hvem som var involvert og hva som ble gjort — uten dette er det umulig å se mønstre.' },
      { label: 'ROTÅRSAKSANALYSE', text: 'Det viktige er ikke å straffe den som meldte avviket, men å forstå hvorfor det skjedde og endre systemet slik at det ikke skjer igjen.' },
    ],
    practical: 'Spør alltid sjefen din om det finnes et avvikssystem og lær deg å bruke det — det er ett av de tydeligste tegnene på om en bedrift tar kvalitet på alvor.',
    glossaryTerm: 'Internkontroll',
    exercises: [
      {
        id: 'ar-5-1',
        question: 'Hva er et avvik i en bedriftskontekst?',
        choices: [
          { id: 'a', text: 'En ansatt som er uenig med sjefen' },
          { id: 'b', text: 'Enhver situasjon der noe skjer annerledes enn hva rutiner og standarder tilsier' },
          { id: 'c', text: 'En kassedifferanse på mer enn 100 kr' },
          { id: 'd', text: 'Kun alvorlige ulykker og skader' },
        ],
        correctId: 'b',
        explanation: 'Avvik kan være alt fra en vare med feil pris til en kundeklage til en ansattskade — hva som helst som ikke gikk som forventet.',
      },
      {
        id: 'ar-5-2',
        question: 'Hva er en rotårsaksanalyse?',
        choices: [
          { id: 'a', text: 'En analyse av hvilke ansatte som har meldt flest avvik' },
          { id: 'b', text: 'En undersøkelse av den underliggende årsaken til et avvik, for å hindre at det skjer igjen' },
          { id: 'c', text: 'En straff for den ansatte som forårsaket avviket' },
          { id: 'd', text: 'En analyse av bedriftens rotverdier' },
        ],
        correctId: 'b',
        explanation: 'Rotårsaksanalyse handler om å fikse systemet, ikke straffe individet — hvorfor skjedde dette, og hva kan endres for å hindre gjentakelse?',
      },
      {
        id: 'ar-5-3',
        question: 'McDonald\'s er kjent for konsekvente produkter globalt. Hva er den viktigste grunnen til dette?',
        choices: [
          { id: 'a', text: 'De bruker kun de beste råvarene overalt' },
          { id: 'b', text: 'Alle ansatte er svært erfarne' },
          { id: 'c', text: 'Et system der avvik logges og analyseres sentralt, og forbedringer rulles ut til alle restauranter' },
          { id: 'd', text: 'Streng overvåking av alle ansatte' },
        ],
        correctId: 'c',
        explanation: 'McDonalds kvalitet er et resultat av systematisk avvikshåndtering og standardiserte rutiner — ikke tilfeldigheter eller ekstra dyktige ansatte.',
      },
      {
        id: 'ar-5-4',
        question: 'Hva menes med «psykologisk trygghet» i kontekst av avviksmeldinger?',
        choices: [
          { id: 'a', text: 'At ansatte føler seg trygge fysisk på arbeidsplassen' },
          { id: 'b', text: 'At ansatte kan melde avvik uten frykt for negative konsekvenser eller straff' },
          { id: 'c', text: 'At det finnes en bedriftspsykolog' },
          { id: 'd', text: 'At ledere behandler ansatte vennlig' },
        ],
        correctId: 'b',
        explanation: 'Et avvikssystem fungerer kun hvis folk faktisk bruker det — psykologisk trygghet betyr at ansatte melder avvik uten frykt for å bli straffet for det.',
      },
      {
        id: 'ar-5-5',
        question: 'Hva er internkontrollforskriften (IK-forskriften) og hvem gjelder den for?',
        choices: [
          { id: 'a', text: 'En frivillig bransjestandard for kvalitetsarbeid' },
          { id: 'b', text: 'En lovpålagt ordning for systematisk HMS-arbeid som gjelder alle virksomheter med ansatte' },
          { id: 'c', text: 'En EU-forordning som kun gjelder store bedrifter' },
          { id: 'd', text: 'En intern bedriftsregel' },
        ],
        correctId: 'b',
        explanation: 'IK-forskriften er norsk lov — alle virksomheter med ansatte er lovpålagt å ha et system for systematisk HMS-arbeid og dokumentere at de forebygger feil og ulykker.',
      },
    ],
  },
]

export default function AdministrativeRutinerModule() {
  return (
    <DrawerModule
      moduleCode="MFI4"
      moduleTitle="Administrative rutiner"
      moduleIcon="🗂️"
      storageKey="learning-mfi-administrative-rutiner"
      completeRoute="/learning/mfi/administrative-rutiner/complete"
      phases={PHASES}
      intro="Administrative rutiner høres kanskje kjedelig ut, men de er selve ryggmargen i en velfungerende butikk eller servicebedrift. Uten klare rutiner for retur, kassehåndtering, dokumentasjon og avviksbehandling oppstår det feil, tap og konflikter som koster bedriften penger og tillit. I dette modulet lærer du hvorfor gode rutiner faktisk er en form for frihet — fordi de fjerner gjettearbeid og gjør det mulig å fokusere på det som virkelig betyr noe: kunden."
      vissteduAt="Norske bedrifter er lovpålagt å ha et system for internkontroll under internkontrollforskriften (IK-forskriften), som gjelder HMS-arbeid. Dette betyr at alle virksomheter med ansatte skal dokumentere at de jobber systematisk med å forebygge feil og ulykker — rutiner er altså ikke bare god praksis, det er norsk lov."
      espenSier="Det jeg ser oftest hos unge nyansatte er at de synes rutiner er overflødige og vil «løse problemer etter hvert som de oppstår». Men rutiner er nettopp summen av alle problemene som allerede har oppstått — og er løst. Respekter dem, og du unngår å lære de samme leksjonene på den harde måten."
      presentationLink={{ route: '/learning/presentations/administrative-funksjoner', description: 'Administrative funksjoner — en visuell gjennomgang av bedriftens nervesystem' }}
    />
  )
}
