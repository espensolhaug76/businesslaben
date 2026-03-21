import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📦',
    title: 'Hva er svinn og hvor stort er problemet?',
    quote: 'Svinn er den tyven du aldri ser — men som tar mer fra deg enn alle synlige tyveri til sammen.',
    content: 'Svinn er all lagertap mellom varekjøp og varesalg. Det finnes fire typer: ekstern svinn (butikktyverier), intern svinn (ansattefeil/-tyveri), administrativt svinn (prisregistreringsfeil) og leverandørsvinn (differanser ved levering).',
    subpoints: [
      'EKSTERN SVINN: Butikktyverier fra kunder og organiserte bander',
      'INTERN SVINN: Tyveri og feil fra ansatte, kassefeil, ukorrekte returer',
      'ADMINISTRATIVT SVINN: Prisfeil i system, feil vareregistrering',
      'LEVERANDØRSVINN: Differanse mellom bestilt og faktisk levert',
      'Bransjestandard: 1–2% av omsetning. For 20 mill kr = 300 000 kr/år',
    ],
    practical: 'Beregn svinnkostnaden for en tenkt butikk: 15 millioner kr i omsetning, 1,8% svinn. Hva er kronebeløpet?',
    glossaryTerm: 'Svinn',
    exercises: [
      {
        id: 'sv-1-1',
        question: 'Hva er svinn i handelsbransjen?',
        choices: [
          { id: 'a', text: 'Varer som ikke selges innen utgangsdato' },
          { id: 'b', text: 'All lagertap mellom varekjøp og varesalg' },
          { id: 'c', text: 'Varer som returneres av kunder' },
          { id: 'd', text: 'Skatter og avgifter' },
        ],
        correctId: 'b',
        explanation: 'Svinn er all lagertap mellom innkjøp og salg — alt som burde vært på hyllen, men ikke er det ved opptelling.',
      },
      {
        id: 'sv-1-2',
        question: 'En butikk har 20 millioner kr i omsetning og 1,5% svinn. Hva er svinnkostnaden?',
        choices: [
          { id: 'a', text: '30 000 kr' },
          { id: 'b', text: '150 000 kr' },
          { id: 'c', text: '300 000 kr' },
          { id: 'd', text: '3 000 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Svinnkostnad = 20 000 000 × 1,5% = 300 000 kr per år.',
      },
      {
        id: 'sv-1-3',
        question: 'Hva er eksempel på administrativt svinn?',
        choices: [
          { id: 'a', text: 'En kunde stjeler en vare' },
          { id: 'b', text: 'En ansatt underringer en vare' },
          { id: 'c', text: 'Feil pris registrert i kassesystemet' },
          { id: 'd', text: 'Leverandøren leverer for lite' },
        ],
        correctId: 'c',
        explanation: 'Administrativt svinn oppstår fra prisfeil i systemet, feil vareregistrering og kassedifferanser — ikke fra bevisst tyveri.',
      },
      {
        id: 'sv-1-4',
        question: 'Hva er bransjestandarden for svinnprosent i norsk dagligvare?',
        choices: [
          { id: 'a', text: '0,1–0,5%' },
          { id: 'b', text: '1–2%' },
          { id: 'c', text: '5–10%' },
          { id: 'd', text: '15–20%' },
        ],
        correctId: 'b',
        explanation: 'Bransjestandarden er 1–2% av omsetningen. Dette høres lite ut, men kan utgjøre halvparten av all fortjeneste i lavmarginbransjer.',
      },
      {
        id: 'sv-1-5',
        question: 'Hvorfor er svinn spesielt kritisk i dagligvarebransjen?',
        choices: [
          { id: 'a', text: 'Fordi det er ulovlig' },
          { id: 'b', text: 'Fordi marginer er lave (2–3%), og 1–2% svinn kan utgjøre halvparten av fortjenesten' },
          { id: 'c', text: 'Fordi kundene klager' },
          { id: 'd', text: 'Fordi forsikringen ikke dekker svinn' },
        ],
        correctId: 'b',
        explanation: 'I dagligvare med 2–3% nettomarginer kan 1,5% svinn spise opp halvparten av all fortjeneste — svinn er et lønnsomhetsspørsmål.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🎥',
    title: 'Butikktyverier — omfang og forebygging',
    quote: 'Målet er ikke å gjøre butikken til et fengsel — det er å gjøre tyveri vanskelig uten å gjøre handel ubehagelig.',
    content: 'Butikktyverier kan deles i opportunistiske (impulshandling) og profesjonelle (organiserte bander). EAS-systemer (elektroniske sikkerhetsmerker) reduserer ekstern svinn med 30–60%. Etisk balanse er viktig — aggressive tiltak kan skremme bort lovlydige kunder.',
    subpoints: [
      'EAS (Electronic Article Surveillance): magnetiske tagger reduserer svinn 30–60%',
      'Kameraovervåking: synlige kameraer gir sterkest avskrekkende effekt',
      'Høyverdivarer bak lås: barberblad, alkohol, kaffekapsuler',
      'GDPR: begrenser oppbevaring av kameraopptak',
      'Etisk balanse: aggressive tiltak kan skade omdømmet og kundeopplevelsen',
    ],
    practical: 'Besøk to lokale butikker og observer svinnforebyggingstiltakene. Hvilken har best balanse mellom sikkerhet og kundeopplevelse?',
    exercises: [
      {
        id: 'sv-2-1',
        question: 'Hva er EAS-systemer?',
        choices: [
          { id: 'a', text: 'Et system for å telle opp ansatte' },
          { id: 'b', text: 'Electronic Article Surveillance — elektroniske sikkerhetsmerker og alarmsystemer' },
          { id: 'c', text: 'Et budsjetteringssystem' },
          { id: 'd', text: 'En type kameraovervåking' },
        ],
        correctId: 'b',
        explanation: 'EAS er Electronic Article Surveillance — de magnetiske taggene på varer som utløser alarm i dørene ved uautorisert fjerning.',
      },
      {
        id: 'sv-2-2',
        question: 'Hvor mye kan EAS-systemer redusere eksternt svinn?',
        choices: [
          { id: 'a', text: '5–10%' },
          { id: 'b', text: '15–20%' },
          { id: 'c', text: '30–60%' },
          { id: 'd', text: '90–100%' },
        ],
        correctId: 'c',
        explanation: 'EAS-systemer alene reduserer typisk ekstern svinn med 30–60%, men kan omgås av profesjonelle tyvebander.',
      },
      {
        id: 'sv-2-3',
        question: 'Hva er risikoen ved svært aggressive svinnforebyggingstiltak?',
        choices: [
          { id: 'a', text: 'Det er ingen risiko — jo mer sikkerhet jo bedre' },
          { id: 'b', text: 'Det kan gi dårlig kundeopplevelse og skade omdømmet' },
          { id: 'c', text: 'Det er ulovlig' },
          { id: 'd', text: 'Det øker svinn' },
        ],
        correctId: 'b',
        explanation: 'Aggressive tiltak som behandler alle kunder som potensielle tyver kan skade omdømmet og drive bort lovlydige kunder.',
      },
      {
        id: 'sv-2-4',
        question: 'Hvilke produkter er typiske mål for organiserte tyveribander i dagligvare?',
        choices: [
          { id: 'a', text: 'Brød og melk' },
          { id: 'b', text: 'Barberblad, alkohol og kaffekapsuler' },
          { id: 'c', text: 'Frukt og grønt' },
          { id: 'd', text: 'Hermetikk og konserves' },
        ],
        correctId: 'b',
        explanation: 'Profesjonelle tyveribander retter seg mot høyverdivarer med liten størrelse: barberblad, alkohol, kaffekapsuler — lett å skjule og selge videre.',
      },
      {
        id: 'sv-2-5',
        question: 'Hva begrenser kameraovervåking iht. GDPR?',
        choices: [
          { id: 'a', text: 'Antall kameraer i butikken' },
          { id: 'b', text: 'Oppbevaring av opptakene — de kan ikke lagres for lenge' },
          { id: 'c', text: 'Kameraer er forbudt i butikker' },
          { id: 'd', text: 'GDPR gjelder ikke for kameraovervåking' },
        ],
        correctId: 'b',
        explanation: 'GDPR setter grenser for oppbevaring av kameraopptak. Butikker kan ikke lagre opptak i ubegrenset tid — typisk 30 dager er makstid.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔑',
    title: 'Internt svinn og kassefeil',
    quote: 'Internkontroll handler ikke om mistillit til ansatte — det handler om å beskytte dem mot falsk mistanke.',
    content: 'Intern svinn inkluderer kasseringsfeil, ukorrekte returer og "sweethearting" (gi venner rabatter). To-mannsprinsippet er det viktigste enkeltiltaket: to ansatte involvert ved all kontanthåndtering.',
    subpoints: [
      'SWEETHEARTING: gi venner rabatter eller glemme å ringe opp varer',
      'TO-MANNSPRINSIPPET: to ansatte alltid til stede ved kontanthåndtering',
      'Loggsystemer: kassesystemer som logger alle transaksjoner med ansatt-ID',
      '35–40% av svinn i dagligvare stammer internt',
      'To-kontroll beskytter den ærlige ansatte mot uberettiget mistanke',
    ],
    practical: 'Diskuter: Hvordan ville du som leder innføre to-mannskontroll uten at ansatte føler seg mistrodd?',
    glossaryTerm: 'Internkontroll',
    exercises: [
      {
        id: 'sv-3-1',
        question: 'Hva er "sweethearting"?',
        choices: [
          { id: 'a', text: 'Å gi kunder god service' },
          { id: 'b', text: 'Ansatte som gir venner/familie uautoriserte rabatter eller glemmer å ringe opp varer' },
          { id: 'c', text: 'En type EAS-system' },
          { id: 'd', text: 'Å registrere returer korrekt' },
        ],
        correctId: 'b',
        explanation: 'Sweethearting er ansatte som gir venner og familie rabatter eller glemmer å skanne varer. Det oppfattes ofte som "uskyldig", men er tyveri fra arbeidsgiveren.',
      },
      {
        id: 'sv-3-2',
        question: 'Hva er to-mannsprinsippet i svinnforebygging?',
        choices: [
          { id: 'a', text: 'To kassererter jobber alltid på samme kasse' },
          { id: 'b', text: 'To ansatte skal alltid involveres ved kontanthåndtering, returregistrering og mottak' },
          { id: 'c', text: 'To ledere må godkjenne alle bestillinger' },
          { id: 'd', text: 'Kassaopptelling skjer to ganger per dag' },
        ],
        correctId: 'b',
        explanation: 'To-mannsprinsippet sikrer at to ansatte alltid er til stede ved kritiske operasjoner, noe som forebygger svinn og beskytter uskyldige.',
      },
      {
        id: 'sv-3-3',
        question: 'Hva er fordelen med kassesystemer som logger transaksjoner med ansatt-ID?',
        choices: [
          { id: 'a', text: 'Det gjør systemet raskere' },
          { id: 'b', text: 'Det gjør det enkelt å identifisere mønstre og avvik i ansattes transaksjoner' },
          { id: 'c', text: 'Det eliminerer behovet for kontanthåndtering' },
          { id: 'd', text: 'Det er et krav fra skattemyndighetene' },
        ],
        correctId: 'b',
        explanation: 'Ansatt-ID i kassesystemet gjør det mulig å identifisere mønstre: en ansatt med uvanlig mange annulleringer eller returer kan undersøkes nærmere.',
      },
      {
        id: 'sv-3-4',
        question: 'Omtrent hvor stor andel av svinn i norske dagligvarebutikker stammer fra interne kilder?',
        choices: [
          { id: 'a', text: '5%' },
          { id: 'b', text: '15%' },
          { id: 'c', text: '35–40%' },
          { id: 'd', text: '80%' },
        ],
        correctId: 'c',
        explanation: 'Internasjonale studier anslår at 35–40% av svinn i dagligvare stammer internt — fra ansattefeil og tyveri.',
      },
      {
        id: 'sv-3-5',
        question: 'Hvorfor er to-mannskontroll viktig også for å beskytte ansatte?',
        choices: [
          { id: 'a', text: 'Det er ikke viktig for ansatte' },
          { id: 'b', text: 'Uten vitne er det umulig å bevise uskyld ved kassedifferanser' },
          { id: 'c', text: 'Det gir ansatte mer fridager' },
          { id: 'd', text: 'Det øker lønnen til ansatte' },
        ],
        correctId: 'b',
        explanation: 'To-mannskontroll beskytter den ærlige ansatte: med vitne kan man bevise at kassedifferansen ikke skyldes dem.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🚚',
    title: 'Leverandørsvinn og mottakskontroll',
    quote: 'Det du ikke kontrollerer ved mottak, betaler du for — uansett om du mottok det eller ikke.',
    content: 'Leverandørsvinn oppstår når det leveres færre eller dårligere varer enn fakturert. Mottakskontroll er prosessen der varer telles og kontrolleres mot følgeseddel ved hvert varemottak. Uten dokumentasjon er det nesten umulig å kreve kreditt.',
    subpoints: [
      'KORTLEVERING: færre enheter enn på følgeseddelen',
      'AVVIKSSKJEMA: dokumenter alle avvik skriftlig og signert av begge parter',
      'TEMPERATURLOGG: fersk- og frysvarer kontrolleres ved mottak',
      'Gjennomsnittlig dagligvarebutikk: 50–100 leveringer per uke',
      'Uten signert avviksskjema er det nesten umulig å kreve kreditt',
    ],
    practical: 'Utform en enkel mottakskontrollsjekkliste for en liten dagligvarebutikk: hvilke fem punkter bør alltid sjekkes?',
    exercises: [
      {
        id: 'sv-4-1',
        question: 'Hva er leverandørsvinn?',
        choices: [
          { id: 'a', text: 'Varer som leverandøren stjeler fra butikken' },
          { id: 'b', text: 'Differanser mellom det som er bestilt/fakturert og det som faktisk leveres' },
          { id: 'c', text: 'Leverandørers egne svinnproblemer' },
          { id: 'd', text: 'Varer som returneres til leverandøren' },
        ],
        correctId: 'b',
        explanation: 'Leverandørsvinn er differansen mellom hva som er bestilt og fakturert versus hva som faktisk er levert og godkjent ved mottak.',
      },
      {
        id: 'sv-4-2',
        question: 'Hva er kortlevering?',
        choices: [
          { id: 'a', text: 'Levering som ankommer for sent' },
          { id: 'b', text: 'Leverandøren leverer færre enheter enn det som er på følgeseddelen' },
          { id: 'c', text: 'Varer med kort holdbarhet' },
          { id: 'd', text: 'En spesielt kort leveringsrute' },
        ],
        correctId: 'b',
        explanation: 'Kortlevering betyr at antall leverte enheter er lavere enn det som er oppgitt på følgeseddelen — noe butikken betaler for uten å motta.',
      },
      {
        id: 'sv-4-3',
        question: 'Hva er avviksskjemaets viktigste funksjon?',
        choices: [
          { id: 'a', text: 'Å dokumentere leveringstidspunkt' },
          { id: 'b', text: 'Å danne grunnlag for kreditnota fra leverandøren ved differanser' },
          { id: 'c', text: 'Å informere Mattilsynet om feil' },
          { id: 'd', text: 'Å registrere sjåførens navn' },
        ],
        correctId: 'b',
        explanation: 'Avviksskjemaet er dokumentasjonen som gir grunnlag for å kreve kreditnota fra leverandøren. Uten det er differansen nesten umulig å bevise.',
      },
      {
        id: 'sv-4-4',
        question: 'Hvorfor er temperaturkontroll ved mottak viktig?',
        choices: [
          { id: 'a', text: 'For å registrere årstiden' },
          { id: 'b', text: 'Fersk- og frysvarer utenfor temperaturkrav kan avvises og krediteres' },
          { id: 'c', text: 'For å dokumentere leveringstidspunkt' },
          { id: 'd', text: 'Temperatur er ikke relevant' },
        ],
        correctId: 'b',
        explanation: 'Varer som ikke holder temperaturkrav ved mottak representerer en sikkerhetsrisiko og kan avvises — men kun hvis det dokumenteres ved mottak.',
      },
      {
        id: 'sv-4-5',
        question: 'En butikk mottar 70 leveringer per uke. Hva skjer med leverandørsvinn uten systematisk mottakskontroll?',
        choices: [
          { id: 'a', text: 'Ingen konsekvens — leverandørene er alltid ærlige' },
          { id: 'b', text: 'Leverandørsvinn akkumulerer seg til betydelige beløp over tid' },
          { id: 'c', text: 'Leverandørene kompenserer automatisk' },
          { id: 'd', text: 'Forsikringen dekker det' },
        ],
        correctId: 'b',
        explanation: 'Med 70 leveringer per uke kan selv små differanser per levering bli til store summer over måneder og år uten systematisk kontroll.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🤖',
    title: 'Teknologiske løsninger og kostnads-nytte',
    quote: 'Teknologi kan ikke erstatte gode rutiner — men den kan gjøre gode rutiner langt mer effektive.',
    content: 'Ny teknologi gir nye muligheter for svinnforebygging: RFID, AI-kameraer og forbedrede kassesystemer. Men teknologi har kostnader og konsekvenser — selvbetjeningskasser øker faktisk svinn.',
    subpoints: [
      'RFID: automatisk lageropptelling, mest aktuelt for høyverdivarer',
      'Selvbetjeningskasser: 15–30% HØYERE svinn enn betjente kasser',
      'AI-kameraer: gjenkjenner produkter og atferdsmønstre i sanntid',
      'Kostnad-nytte: 100 000 kr investering som sparer 300 000 kr = 200% avkastning',
    ],
    practical: 'Beregn: En butikk med 18 millioner kr omsetning og 2% svinn investerer 150 000 kr i RFID. Hvor mye svinn-reduksjon kreves for break-even innen to år?',
    exercises: [
      {
        id: 'sv-5-1',
        question: 'Hva er RFID i svinnforebygging?',
        choices: [
          { id: 'a', text: 'Et kamerasystem' },
          { id: 'b', text: 'Elektronisk sporing av enkeltenheter uten manuell skanning' },
          { id: 'c', text: 'Et kassesystem' },
          { id: 'd', text: 'En type sikkerhetsmerke' },
        ],
        correctId: 'b',
        explanation: 'RFID (Radio Frequency Identification) gir mulighet for automatisk lageropptelling og sporing av enkeltenheter uten behov for manuell skanning.',
      },
      {
        id: 'sv-5-2',
        question: 'Studier viser at selvbetjeningskasser har _____ svinn enn betjente kasser.',
        choices: [
          { id: 'a', text: 'Lavere' },
          { id: 'b', text: 'Samme' },
          { id: 'c', text: '15–30% høyere' },
          { id: 'd', text: '50% lavere' },
        ],
        correctId: 'c',
        explanation: 'Studier viser konsekvent 15–30% høyere svinn ved selvbetjeningskasser — kombinasjon av skanningsfeil, bevisst og ubevisst svinn.',
      },
      {
        id: 'sv-5-3',
        question: 'En butikk sparer 300 000 kr i svinn etter å ha investert 100 000 kr i overvåkningssystem. Hva er avkastningen?',
        choices: [
          { id: 'a', text: '100%' },
          { id: 'b', text: '150%' },
          { id: 'c', text: '200%' },
          { id: 'd', text: '300%' },
        ],
        correctId: 'c',
        explanation: 'Avkastning = (Besparelse - Investering) / Investering × 100 = (300 000 - 100 000) / 100 000 × 100 = 200%.',
      },
      {
        id: 'sv-5-4',
        question: 'Hva er årsaken til at selvbetjeningskasser gir mer svinn?',
        choices: [
          { id: 'a', text: 'Systemet er dyrere' },
          { id: 'b', text: 'Kombinasjon av skanningsfeil, varer i bag uten skanning og bevisst juks' },
          { id: 'c', text: 'Kunder liker ikke selvbetjening' },
          { id: 'd', text: 'De er vanskeligere å bruke' },
        ],
        correctId: 'b',
        explanation: 'Økt svinn ved selvbetjening skyldes en kombinasjon av utilsiktet skanningsfeil, varer som havner i bagen uten skanning, og bevisst juks.',
      },
      {
        id: 'sv-5-5',
        question: 'Hvorfor sier ekspertene at "teknologi ikke kan erstatte gode rutiner"?',
        choices: [
          { id: 'a', text: 'Teknologi er for dyr' },
          { id: 'b', text: 'Teknologi forsterker eksisterende rutiner men kan ikke kompensere for mangel på gode rutiner' },
          { id: 'c', text: 'Teknologi skaper alltid nye problemer' },
          { id: 'd', text: 'Det er alltid bedre med manuelle rutiner' },
        ],
        correctId: 'b',
        explanation: 'Det beste systemet er svakt uten gode rutiner bak. Teknologi forsterker og effektiviserer gode rutiner — men erstatter dem ikke.',
      },
    ],
  },
]

export default function SvinnforebyggingModule() {
  return (
    <DrawerModule
      moduleCode="FD-VG2-5"
      moduleTitle="Svinnforebygging"
      moduleIcon="🛡️"
      storageKey="learning-vg2-svinnforebygging"
      completeRoute="/learning/vg2/forretningsdrift/svinnforebygging/complete"
      phases={phases}
      intro="Svinn er tap av varer mellom innkjøp og salg — og det er et mye større problem enn de fleste skjønner før de ser tallene."
      vissteduAt="Selvbetjeningskasser i britiske supermarkeder hadde 3,97% svinn mot 1,47% ved betjente kasser — nesten tre ganger så høyt."
      espenSier="Svinn er et av temaene som sjokkerer folk første gang de ser de faktiske tallene. For en lavmarginbutikk kan svinnforebygging utgjøre forskjellen mellom overskudd og underskudd."
      presentationLink={{ route: '/learning/presentations/verdikjeden', description: 'Verdikjeden — en visuell gjennomgang av svinn og bærekraft i forsyningskjeden' }}
    />
  )
}
