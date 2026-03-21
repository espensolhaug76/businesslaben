import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Bedriftens formål',
    quote: 'En bedrift uten formål er en bedrift uten retning',
    practical: "Formål handler om mer enn profitt: hva skaper du verdi for? Hvem løser du et problem for? IKEA: 'å skape en bedre hverdag for de mange'.",
    exercises: [
      {
        id: 'org-1-1',
        question: 'Hva er en bedrifts formål?',
        choices: [
          { id: 'a', text: 'Å tjene maksimalt med penger' },
          { id: 'b', text: 'Det overordnede oppdraget som beskriver hva bedriften skaper av verdi og for hvem' },
          { id: 'c', text: 'En liste over bedriftens produkter' },
          { id: 'd', text: 'Bedriftens årsomsetning' },
        ],
        correctId: 'b',
        explanation: 'Formål er «hvorfor» bedriften eksisterer — hva slags verdi den skaper for hvem. IKEA skaper «bedre hverdag for de mange», ikke bare selger møbler.',
      },
      {
        id: 'org-1-2',
        question: 'IKEA sier at formålet er «å skape en bedre hverdag for de mange». Hva er verdien av et slikt tydelig formål?',
        choices: [
          { id: 'a', text: 'Det er kun god PR' },
          { id: 'b', text: 'Det gir alle i bedriften en felles retning for beslutninger og prioriteringer' },
          { id: 'c', text: 'Det er et lovkrav for alle bedrifter' },
          { id: 'd', text: 'Det bestemmer hvilke produkter bedriften kan selge' },
        ],
        correctId: 'b',
        explanation: 'Et tydelig formål fungerer som kompass — det hjelper alle ansatte å ta beslutninger i tråd med hva bedriften egentlig er til for.',
      },
      {
        id: 'org-1-3',
        question: 'Hva er forskjellen mellom en bedrifts formål (misjon) og visjon?',
        choices: [
          { id: 'a', text: 'Det er det samme' },
          { id: 'b', text: 'Formål (misjon) beskriver hva bedriften gjør nå, visjon beskriver ønsket fremtidig tilstand' },
          { id: 'c', text: 'Formål er juridisk, visjon er strategisk' },
          { id: 'd', text: 'Visjon er kortere enn formål' },
        ],
        correctId: 'b',
        explanation: 'Misjon = hva vi gjør og for hvem nå. Visjon = hva vi ønsker å oppnå eller bli i fremtiden. Begge er viktige for strategisk retning.',
      },
      {
        id: 'org-1-4',
        question: 'En nyoppstartet restaurant sier: «Vi løser problemet med at folk ikke har tid til å lage sunn mat hjemme.» Hva er dette?',
        choices: [
          { id: 'a', text: 'En markedsplan' },
          { id: 'b', text: 'Et kundeproblem og bedriftens formål — de eksisterer for å løse dette problemet' },
          { id: 'c', text: 'En produktbeskrivelse' },
          { id: 'd', text: 'En juridisk erklæring' },
        ],
        correctId: 'b',
        explanation: 'Å identifisere et konkret problem som bedriften løser er kjernen i formålet — det gir retning og forteller kundene hvorfor de skal velge denne bedriften.',
      },
      {
        id: 'org-1-5',
        question: 'Hvorfor er det viktig å kommunisere bedriftens formål til ansatte?',
        choices: [
          { id: 'a', text: 'Det er et lovkrav' },
          { id: 'b', text: 'Ansatte som forstår og identifiserer seg med formålet er mer motiverte og tar bedre beslutninger' },
          { id: 'c', text: 'For å imponere investorer' },
          { id: 'd', text: 'Det er ikke viktig — resultater teller' },
        ],
        correctId: 'b',
        explanation: 'Forskning viser konsekvent at ansatte med sterk tilhørighet til bedriftens formål er mer engasjerte, lojale og produktive.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '⚖️',
    title: 'ENK vs AS vs ANS',
    quote: 'Valget av selskapsform er ditt første viktige forretningsbeslutning',
    practical: 'ENK (Enkeltpersonforetak): enkel å starte, du er personlig ansvarlig. AS (Aksjeselskap): begrenset personlig ansvar, min. 30.000 kr aksjekapital. ANS (Ansvarlig selskap): delt ansvar mellom partnere.',
    glossaryTerm: 'Organisasjonsform',
    exercises: [
      {
        id: 'org-2-1',
        question: 'Hva er den viktigste forskjellen mellom ENK og AS?',
        choices: [
          { id: 'a', text: 'ENK er billigere å registrere' },
          { id: 'b', text: 'I ENK er du personlig ansvarlig for all gjeld; i AS er ansvaret begrenset til aksjekapitalen' },
          { id: 'c', text: 'AS krever mer papirarbeid' },
          { id: 'd', text: 'ENK kan ikke ha ansatte' },
        ],
        correctId: 'b',
        explanation: 'Personlig ansvar er den kritiske forskjellen — i ENK risikerer du alt du eier privat; i AS er risikoen begrenset til innskutt kapital.',
      },
      {
        id: 'org-2-2',
        question: 'Hva er minimumskravet til aksjekapital for å starte et AS i Norge?',
        choices: [
          { id: 'a', text: '10 000 kr' },
          { id: 'b', text: '100 000 kr' },
          { id: 'c', text: '30 000 kr' },
          { id: 'd', text: '50 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Et AS krever minimum 30 000 kr i aksjekapital — dette er «sikkerhetsnettet» som beskytter kreditorer og begrenser eiernes personlige ansvar.',
      },
      {
        id: 'org-2-3',
        question: 'En person starter en liten konsulentvirksomhet fra hjemmekontoret. Hvilken selskapsform er oftest best å starte med?',
        choices: [
          { id: 'a', text: 'ANS (Ansvarlig selskap)' },
          { id: 'b', text: 'AS (Aksjeselskap)' },
          { id: 'c', text: 'ENK (Enkeltpersonforetak)' },
          { id: 'd', text: 'SA (Samvirkeforetak)' },
        ],
        correctId: 'c',
        explanation: 'ENK er enklest og billigst å starte — ideelt for soloselvstendige med lav risiko. Det er grunnen til at over 60% av norske bedrifter er ENK.',
      },
      {
        id: 'org-2-4',
        question: 'To venner ønsker å starte en café sammen og dele alt ansvar likt. Hvilken selskapsform bør de vurdere?',
        choices: [
          { id: 'a', text: 'ENK' },
          { id: 'b', text: 'AS eller ANS — begge gir mulighet for delt eierskap' },
          { id: 'c', text: 'ENK for begge separat' },
          { id: 'd', text: 'SA (Samvirkeforetak)' },
        ],
        correctId: 'b',
        explanation: 'For to eiere er ANS (delt ansvar) eller AS (begrenset ansvar) de naturlige valgene. AS er tryggere siden begge er beskyttet mot personlig ansvar.',
      },
      {
        id: 'org-2-5',
        question: 'Hva er risikoen med ANS (Ansvarlig selskap)?',
        choices: [
          { id: 'a', text: 'Det er vanskelig å registrere' },
          { id: 'b', text: 'Alle deltakere er personlig og solidarisk ansvarlig — én kan bli holdt ansvarlig for hele selskapets gjeld' },
          { id: 'c', text: 'Det er dyrt å drive' },
          { id: 'd', text: 'Det er ikke egnet for to eiere' },
        ],
        correctId: 'b',
        explanation: 'I ANS er alle partnere personlig og solidarisk ansvarlige — hvis din partner pådrar selskapet gjeld, kan du bli holdt ansvarlig for hele beløpet.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📊',
    title: 'Organisasjonskart og roller',
    quote: 'Klarhet om ansvar unngår konflikter og ineffektivitet',
    practical: 'Hierarkisk: tydelig kommandolinje. Flat: lite byråkrati, rask kommunikasjon. Matriseorganisasjon: ansatte rapporterer til flere ledere. Daglig leder → Avdelingsledere → Ansatte.',
    exercises: [
      {
        id: 'org-3-1',
        question: 'Hva er hensikten med et organisasjonskart?',
        choices: [
          { id: 'a', text: 'Å vise bedriftens inntekter' },
          { id: 'b', text: 'Å visualisere hvem som rapporterer til hvem og klargjøre ansvar og kommunikasjonslinjer' },
          { id: 'c', text: 'Å imponere kunder' },
          { id: 'd', text: 'Å vise antall ansatte' },
        ],
        correctId: 'b',
        explanation: 'Et organisasjonskart klargjør kommandolinjer og ansvar — det forhindrer konflikter om hvem som bestemmer hva og hvem som kommuniserer med hvem.',
      },
      {
        id: 'org-3-2',
        question: 'Hva kjennetegner en flat organisasjonsstruktur?',
        choices: [
          { id: 'a', text: 'Mange ledernivåer og streng hierarki' },
          { id: 'b', text: 'Få ledernivåer, rask kommunikasjon og mer autonomi for ansatte' },
          { id: 'c', text: 'Ansatte rapporterer til to ulike ledere' },
          { id: 'd', text: 'Alle ansatte har samme lønn' },
        ],
        correctId: 'b',
        explanation: 'Flat struktur er effektiv for raske beslutninger og kommunikasjon — typisk i startups og norsk arbeidslivstradisjon med lav maktavstand.',
      },
      {
        id: 'org-3-3',
        question: 'I en matriseorganisasjon rapporterer ansatte til...',
        choices: [
          { id: 'a', text: 'Kun én leder' },
          { id: 'b', text: 'To ulike ledere — typisk en faglig og en prosjektleder' },
          { id: 'c', text: 'Alle ledere i organisasjonen' },
          { id: 'd', text: 'Direkte til styret' },
        ],
        correctId: 'b',
        explanation: 'Matriseorganisasjon kombinerer faglig ledelse (avdeling) med prosjektledelse — gir fleksibilitet men kan skape uklarhet om prioriteringer.',
      },
      {
        id: 'org-3-4',
        question: 'Hva er «span of control»?',
        choices: [
          { id: 'a', text: 'En leders totale myndighetsområde' },
          { id: 'b', text: 'Antall direkte underordnede en leder har ansvar for' },
          { id: 'c', text: 'Kontrollsystemer for budsjett' },
          { id: 'd', text: 'Bedriftens geografiske dekningsområde' },
        ],
        correctId: 'b',
        explanation: 'Span of control er antall ansatte som rapporterer direkte til én leder — for høyt og lederen mister oversikt, for lavt og strukturen blir unødvendig hierarkisk.',
      },
      {
        id: 'org-3-5',
        question: 'En daglig leder delegerer salgsansvar til en salgssjef. Hva beholder daglig leder?',
        choices: [
          { id: 'a', text: 'Ingenting — ansvaret er fullt overført' },
          { id: 'b', text: 'Det overordnede ansvaret — man kan delegere oppgaven men ikke ansvaret' },
          { id: 'c', text: 'Kun detaljoppgavene' },
          { id: 'd', text: 'Kun omdømmerisikoen' },
        ],
        correctId: 'b',
        explanation: 'Delegering overfører oppgaven og myndigheten, men ikke det overordnede ansvaret — daglig leder er fortsatt ansvarlig for salgsfunksjonens resultater.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🤝',
    title: 'Ansvar og myndighet',
    quote: 'Myndighet uten ansvar er farlig — ansvar uten myndighet er frustrerende',
    practical: 'Delegering: leder gir andre oppgaver og myndighet. Prinsippet: du kan ikke delegere bort ansvaret — bare oppgaven. Eks: daglig leder delegerer salg til selgerne, men er fortsatt ansvarlig.',
    exercises: [
      {
        id: 'org-4-1',
        question: 'Hva betyr det å ha «myndighet» i en organisasjon?',
        choices: [
          { id: 'a', text: 'Å ha erfaring' },
          { id: 'b', text: 'Å ha rett og makt til å ta beslutninger innenfor et definert område' },
          { id: 'c', text: 'Å ha høy lønn' },
          { id: 'd', text: 'Å ha mange år ansiennitet' },
        ],
        correctId: 'b',
        explanation: 'Myndighet er den formelle retten til å ta beslutninger og gi instrukser innenfor et definert ansvarsområde.',
      },
      {
        id: 'org-4-2',
        question: 'Hva er «ansvar» i organisatorisk forstand?',
        choices: [
          { id: 'a', text: 'Muligheten til å ta beslutninger' },
          { id: 'b', text: 'Plikten til å svare for resultater innenfor ens definerte område' },
          { id: 'c', text: 'Mengden arbeid man utfører' },
          { id: 'd', text: 'Antall ansatte man leder' },
        ],
        correctId: 'b',
        explanation: 'Ansvar er plikten til å svare for om oppgaver utføres og mål nås — og til å rapportere oppover om resultater.',
      },
      {
        id: 'org-4-3',
        question: 'Hvorfor sies det at «myndighet uten ansvar er farlig»?',
        choices: [
          { id: 'a', text: 'Fordi det er for mye arbeid' },
          { id: 'b', text: 'Fordi noen kan ta vilkårlige beslutninger uten å måtte stå til ansvar for konsekvensene' },
          { id: 'c', text: 'Fordi det skaper forvirring' },
          { id: 'd', text: 'Fordi det er ulovlig' },
        ],
        correctId: 'b',
        explanation: 'Myndighet uten ansvar er en oppskrift på maktmisbruk — den som kan bestemme uten å svare for konsekvensene, har lite incitament til gode beslutninger.',
      },
      {
        id: 'org-4-4',
        question: 'Hva er prinsippet om «delegering»?',
        choices: [
          { id: 'a', text: 'Å overlate alt ansvar til underordnede' },
          { id: 'b', text: 'Å gi en ansatt myndighet og ressurser til å utføre en oppgave, mens leder beholder det overordnede ansvaret' },
          { id: 'c', text: 'Å fordele arbeid tilfeldig' },
          { id: 'd', text: 'Å gi ansatte høyere lønn for mer arbeid' },
        ],
        correctId: 'b',
        explanation: 'Delegering er en av lederens viktigste verktøy — det frigjør lederens tid for strategiske oppgaver mens ansatte utvikles og bruker sitt potensial.',
      },
      {
        id: 'org-4-5',
        question: 'En butikksjef delegerer kasseansvar til en ansatt, og ansatt gjør feil. Hvem er ansvarlig?',
        choices: [
          { id: 'a', text: 'Kun den ansatte' },
          { id: 'b', text: 'Butikksjefen — man kan ikke delegere bort det overordnede ansvaret' },
          { id: 'c', text: 'Begge er likt ansvarlige' },
          { id: 'd', text: 'Verken butikksjefen eller den ansatte' },
        ],
        correctId: 'b',
        explanation: 'Butikksjefen delegerte oppgaven men er fortsatt ansvarlig for kassefunksjonen — god delegering inkluderer derfor oppfølging og kontroll.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📝',
    title: 'Registrering og formelle krav',
    quote: 'Et selskap som ikke er registrert, eksisterer ikke i lovens øyne',
    practical: 'Brønnøysundregistrene: alle norske selskaper må registreres. Foretaksregisteret for AS og ANS. ENK registreres i Enhetsregisteret. Åpningstillatelse fra kommunen for butikk.',
    exercises: [
      {
        id: 'org-5-1',
        question: 'Hvor registreres norske selskaper?',
        choices: [
          { id: 'a', text: 'Skatteetaten' },
          { id: 'b', text: 'Brønnøysundregistrene' },
          { id: 'c', text: 'Norges Bank' },
          { id: 'd', text: 'NAV' },
        ],
        correctId: 'b',
        explanation: 'Brønnøysundregistrene er det sentrale registret for alle norske foretak — her registreres og dokumenteres selskaper, rettigheter og plikter.',
      },
      {
        id: 'org-5-2',
        question: 'Hva er Foretaksregisteret?',
        choices: [
          { id: 'a', text: 'Et register over alle norske arbeidsplasser' },
          { id: 'b', text: 'Det obligatoriske registeret der AS, ANS og lignende selskaper må registreres' },
          { id: 'c', text: 'Et frivillig bedriftsregister' },
          { id: 'd', text: 'Skatteetatens register over bedrifter' },
        ],
        correctId: 'b',
        explanation: 'Foretaksregisteret er det offisielle, obligatoriske registeret for norske selskaper som AS og ANS — registrering gir rettslig eksistens og trosferdighet.',
      },
      {
        id: 'org-5-3',
        question: 'Hva er Enhetsregisteret?',
        choices: [
          { id: 'a', text: 'Et register kun for store bedrifter' },
          { id: 'b', text: 'Det grunnleggende registeret der alle juridiske enheter i Norge — inkludert ENK — tildeles et organisasjonsnummer' },
          { id: 'c', text: 'Et frivillig register for ENK' },
          { id: 'd', text: 'Et skatteregistrer' },
        ],
        correctId: 'b',
        explanation: 'Enhetsregisteret er basisregisteret der alle norske juridiske enheter registreres og tildeles organisasjonsnummer — grunnlaget for all offentlig identifikasjon.',
      },
      {
        id: 'org-5-4',
        question: 'En person ønsker å åpne en butikk. Hva trenger de fra kommunen?',
        choices: [
          { id: 'a', text: 'Ingenting — det er fritt å åpne butikk' },
          { id: 'b', text: 'Åpningstillatelse og eventuelt byggetillatelse for lokalet' },
          { id: 'c', text: 'Kun skatteregistrering' },
          { id: 'd', text: 'Kun Brønnøysund-registrering' },
        ],
        correctId: 'b',
        explanation: 'Fysiske utsalgssteder krever åpningstillatelse fra kommunen — reguleringsplan og bruksformål for lokalet må godkjennes.',
      },
      {
        id: 'org-5-5',
        question: 'Hva er konsekvensen av å drive næringsvirksomhet uten å registrere seg?',
        choices: [
          { id: 'a', text: 'Ingenting — det er valgfritt' },
          { id: 'b', text: 'Bøter, skattekrav med tillegg, og potensiell strafferettslig forfølgelse for svart arbeid' },
          { id: 'c', text: 'Kun en advarsel fra myndighetene' },
          { id: 'd', text: 'Man mister kun rett til mva-fradrag' },
        ],
        correctId: 'b',
        explanation: 'Uregistrert næringsvirksomhet kan medføre alvorlige konsekvenser — skattekrav, bøter og i grove tilfeller strafferettslig forfølgelse for skatteunndragelse.',
      },
    ],
  },
]

export default function OrganizationModule() {
  return (
    <DrawerModule
      moduleCode="FD1"
      moduleTitle="Organisasjon og bedriftsformer"
      moduleIcon="🏢"
      storageKey="learning-organization"
      completeRoute="/learning/forretningsdrift/organization/complete"
      phases={PHASES}
      intro="Alle bedrifter trenger en organisasjonsstruktur. Valget av bedriftsform påvirker ansvar, skatt og risiko — og er ofte den første viktige forretningsbeslutningen du tar."
      vissteduAt="Over 60% av norske bedrifter er ENK — enkelpersonforetak er den vanligste selskapsformen. Allikevel velger mange gründere AS når virksomheten vokser, for å beskytte privat økonomi."
      espenSier="Valget mellom ENK og AS handler ikke bare om skatt — det handler om risikotoleranse. ENK betyr at du er personlig ansvarlig for all gjeld. Jeg anbefaler alltid AS så snart det er praktisk mulig."
      presentationLink={{ route: '/learning/presentations/organisasjon', description: 'Organisasjon — en visuell gjennomgang av organisasjonsstrukturer' }}
    />
  )
}
