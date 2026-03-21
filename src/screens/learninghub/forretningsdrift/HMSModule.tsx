import DrawerModule, { type DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🏥',
    title: 'Hva er HMS?',
    quote: 'Et sikkert arbeidsmiljø er ikke en kostnad — det er en investering i menneskene og bedriften',
    content: 'HMS står for Helse, Miljø og Sikkerhet. Det er et systematisk arbeid for å sikre at ansatte har et godt og trygt arbeidsmiljø. Arbeidsgiver har plikt til å drive systematisk HMS-arbeid etter Arbeidsmiljøloven.',
    subpoints: [
      'Helse: trivsel, psykisk og fysisk velvære',
      'Miljø: ytre miljø, avfall og utslipp',
      'Sikkerhet: forebygging av ulykker og skader',
      'Arbeidsgiver har overordnet ansvar for HMS',
    ],
    practical: 'Start med å kartlegge potensielle farer i arbeidsstedet ditt: hva kan gå galt? Hvem er utsatt? Hva gjør du for å forebygge?',
    exercises: [
      {
        id: 'hms-1-1',
        question: 'Hva er HMS?',
        choices: [
          { id: 'a', text: 'Handel, Marked og Service' },
          { id: 'b', text: 'Helse, Miljø og Sikkerhet' },
          { id: 'c', text: 'Husleie, Materiell og Støy' },
          { id: 'd', text: 'Hvile, Medarbeidere og Struktur' },
        ],
        correctId: 'b',
        explanation: 'HMS = Helse (trivsel, fysisk/psykisk), Miljø (ytre miljø, avfall) og Sikkerhet (ulykker, skader).',
      },
      {
        id: 'hms-1-2',
        question: 'Hvem har overordnet ansvar for HMS på en arbeidsplass?',
        choices: [
          { id: 'a', text: 'Arbeidstakerne selv' },
          { id: 'b', text: 'Verneombudet' },
          { id: 'c', text: 'Arbeidsgiver' },
          { id: 'd', text: 'Kommunen' },
        ],
        correctId: 'c',
        explanation: 'Arbeidsgiver har overordnet ansvar for HMS. Arbeidsmiljøloven pålegger arbeidsgiver å sikre et forsvarlig arbeidsmiljø.',
      },
      {
        id: 'hms-1-3',
        question: 'Hva inngår i "Helse"-delen av HMS?',
        choices: [
          { id: 'a', text: 'Bare fysisk skadeforebygging' },
          { id: 'b', text: 'Bare psykisk velvære' },
          { id: 'c', text: 'Både fysisk og psykisk helse og trivsel' },
          { id: 'd', text: 'Kun sykefraværsoppfølging' },
        ],
        correctId: 'c',
        explanation: 'Helse i HMS-sammenheng inkluderer både fysisk helse (ergonomi, kjemikalier) og psykisk helse (trivsel, stress, mobbing).',
      },
      {
        id: 'hms-1-4',
        question: 'Hva menes med "systematisk HMS-arbeid"?',
        choices: [
          { id: 'a', text: 'Å rydde opp når det skjer en ulykke' },
          { id: 'b', text: 'Å kartlegge, forebygge og dokumentere HMS-arbeid kontinuerlig' },
          { id: 'c', text: 'Å ansette en HMS-koordinator' },
          { id: 'd', text: 'Å sende ansatte på kurs én gang' },
        ],
        correctId: 'b',
        explanation: 'Systematisk HMS-arbeid betyr kontinuerlig kartlegging av farer, forebygging av ulykker, og dokumentasjon av tiltak.',
      },
      {
        id: 'hms-1-5',
        question: 'Hva er formålet med HMS-arbeid?',
        choices: [
          { id: 'a', text: 'Å unngå bøter fra Arbeidstilsynet' },
          { id: 'b', text: 'Å sikre at ansatte har et godt og trygt arbeidsmiljø' },
          { id: 'c', text: 'Å redusere lønnsutgiftene' },
          { id: 'd', text: 'Å tilfredsstille forsikringsselskapet' },
        ],
        correctId: 'b',
        explanation: 'Formålet med HMS er å sikre at alle ansatte har et godt arbeidsmiljø og kan utføre jobben sin uten å skade seg eller bli syke.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '⚖️',
    title: 'Arbeidsmiljøloven',
    quote: 'Loven setter minimumet — god ledelse setter standarden',
    content: 'Arbeidsmiljøloven (AML) er den sentrale loven som regulerer arbeidsforhold i Norge. Den setter minimumskrav til arbeidsmiljø, arbeidskontrakter og HMS-arbeid. Brudd på loven kan gi alvorlige konsekvenser.',
    subpoints: [
      'AML krever forsvarlig arbeidsmiljø',
      'Verneombud er påkrevd ved ≥10 ansatte',
      'AMU (Arbeidsmiljøutvalg) er påkrevd ved ≥50 ansatte',
      'Brudd kan gi bøter, pålegg og i alvorlige tilfeller fengsel',
      'Alle bedrifter skal ha HMS-håndbok',
    ],
    practical: 'Sjekk om arbeidsplassen din har de lovpålagte HMS-elementene: verneombud, HMS-håndbok, og kjennskap til melding av avvik.',
    exercises: [
      {
        id: 'hms-2-1',
        question: 'Fra hvor mange ansatte er det lovpålagt å ha et verneombud?',
        choices: [
          { id: 'a', text: '5 ansatte' },
          { id: 'b', text: '10 ansatte' },
          { id: 'c', text: '25 ansatte' },
          { id: 'd', text: '50 ansatte' },
        ],
        correctId: 'b',
        explanation: 'Arbeidsmiljøloven krever verneombud ved bedrifter med 10 eller flere ansatte.',
      },
      {
        id: 'hms-2-2',
        question: 'Hva kan konsekvensene være av alvorlige brudd på Arbeidsmiljøloven?',
        choices: [
          { id: 'a', text: 'Kun en advarsel fra Arbeidstilsynet' },
          { id: 'b', text: 'Bøter, pålegg om utbedring og i alvorlige tilfeller fengsel' },
          { id: 'c', text: 'Bedriften stenges umiddelbart' },
          { id: 'd', text: 'Ingen konsekvenser — loven er ikke streng' },
        ],
        correctId: 'b',
        explanation: 'Brudd på Arbeidsmiljøloven kan gi bøter og pålegg om utbedring. I alvorlige tilfeller, som systematisk skadelig arbeidsmiljø, kan det gi fengselsstraff.',
      },
      {
        id: 'hms-2-3',
        question: 'Hva er AMU?',
        choices: [
          { id: 'a', text: 'Automatisk Miljø Undersøkelse' },
          { id: 'b', text: 'Arbeidsmiljøutvalg — et partssammensatt utvalg med ansatte og ledelse' },
          { id: 'c', text: 'Ansattes Medbestemmelsesutvalg' },
          { id: 'd', text: 'Arbeidstilsynets Myndighetsutvalg' },
        ],
        correctId: 'b',
        explanation: 'AMU er Arbeidsmiljøutvalget — et utvalg med representanter fra både ansatte og ledelse. Det er obligatorisk ved ≥50 ansatte.',
      },
      {
        id: 'hms-2-4',
        question: 'Hvem velger verneombudet?',
        choices: [
          { id: 'a', text: 'Arbeidsgiver utnevner verneombudet' },
          { id: 'b', text: 'De ansatte velger verneombudet blant seg selv' },
          { id: 'c', text: 'Arbeidstilsynet utnevner verneombudet' },
          { id: 'd', text: 'Fagforeningen utnevner verneombudet' },
        ],
        correctId: 'b',
        explanation: 'Verneombudet velges av og blant de ansatte. Dette sikrer at verneombudet representerer arbeidstakernes interesser uavhengig av ledelsen.',
      },
      {
        id: 'hms-2-5',
        question: 'Hva er en HMS-håndbok?',
        choices: [
          { id: 'a', text: 'En brosjyre om bedriftens produkter' },
          { id: 'b', text: 'Dokumentasjon av bedriftens HMS-rutiner, prosedyrer og mål' },
          { id: 'c', text: 'En håndbok kun for ledere' },
          { id: 'd', text: 'Arbeidstilsynets standarddokument' },
        ],
        correctId: 'b',
        explanation: 'HMS-håndboken dokumenterer bedriftens HMS-rutiner, prosedyrer og mål. Den skal være tilgjengelig for alle ansatte.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🧠',
    title: 'Fysisk vs psykososialt arbeidsmiljø',
    quote: 'Ryggsmerter og konflikter er like alvorlige for produktiviteten',
    content: 'Arbeidsmiljøet kan deles i to hovedkategorier: det fysiske (de konkrete, målbare forholdene) og det psykososiale (relasjoner, trivsel, stress). Begge er like viktige for de ansattes helse og bedriftens produktivitet.',
    subpoints: [
      'Fysisk arbeidsmiljø: ergonomi, støy, temperatur, kjemikalier, lysforhold',
      'Psykososialt arbeidsmiljø: mobbing, arbeidspress, relasjon til leder',
      '40% av sykefraværet i Norge skyldes psykososiale faktorer',
      'Begge typer kan forebygges med systematisk arbeid',
    ],
    practical: 'Gjennomfør en enkel kartlegging: noter 3 potensielle fysiske og 3 psykososiale risikoer på din arbeidsplass.',
    exercises: [
      {
        id: 'hms-3-1',
        question: 'Hva er et eksempel på et psykososialt arbeidsmiljøproblem?',
        choices: [
          { id: 'a', text: 'Glatt gulv i butikken' },
          { id: 'b', text: 'Mobbing mellom ansatte' },
          { id: 'c', text: 'For høy temperatur i lokalet' },
          { id: 'd', text: 'Manglende verneutstyr' },
        ],
        correctId: 'b',
        explanation: 'Mobbing er et psykososialt arbeidsmiljøproblem — det handler om relasjoner og trivsel, ikke fysiske forhold.',
      },
      {
        id: 'hms-3-2',
        question: 'Omtrent hvor stor andel av sykefraværet i Norge skyldes psykososiale faktorer?',
        choices: [
          { id: 'a', text: '10%' },
          { id: 'b', text: '20%' },
          { id: 'c', text: '40%' },
          { id: 'd', text: '70%' },
        ],
        correctId: 'c',
        explanation: 'Ca. 40% av sykefraværet i Norge skyldes psykososiale faktorer som stress, arbeidspress og konflikter på jobb.',
      },
      {
        id: 'hms-3-3',
        question: 'En ansatt klager over konstant støy fra maskiner. Dette er et:',
        choices: [
          { id: 'a', text: 'Psykososialt arbeidsmiljøproblem' },
          { id: 'b', text: 'Fysisk arbeidsmiljøproblem' },
          { id: 'c', text: 'Ikke et HMS-tema' },
          { id: 'd', text: 'Kun et personlig problem' },
        ],
        correctId: 'b',
        explanation: 'Støy fra maskiner er et fysisk arbeidsmiljøproblem. Det kan skade hørselen og redusere produktiviteten.',
      },
      {
        id: 'hms-3-4',
        question: 'Hva er ergonomi?',
        choices: [
          { id: 'a', text: 'En form for meditasjon på jobben' },
          { id: 'b', text: 'Tilpasning av arbeidsplassen til kroppen for å forebygge belastningsskader' },
          { id: 'c', text: 'En type forsikring for ansatte' },
          { id: 'd', text: 'Miljøsertifisering av bedriften' },
        ],
        correctId: 'b',
        explanation: 'Ergonomi handler om å tilpasse arbeidsplassen (stol, skjerm, verktøy) til kroppen for å forebygge belastningsskader og fremme trivsel.',
      },
      {
        id: 'hms-3-5',
        question: 'Hvorfor er det viktig å ta psykososiale arbeidsmiljøproblemer på alvor?',
        choices: [
          { id: 'a', text: 'Det er bare et krav fra Arbeidstilsynet' },
          { id: 'b', text: 'Det påvirker sykefravær, trivsel og produktivitet' },
          { id: 'c', text: 'Det gjelder bare i store bedrifter' },
          { id: 'd', text: 'Det er kun relevant for kontorarbeid' },
        ],
        correctId: 'b',
        explanation: 'Psykososiale problemer fører til høyt sykefravær, lav trivsel og dårlig produktivitet — som er svært kostbart for bedriften.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '👷',
    title: 'Verneombud og AMU',
    quote: 'Verneombudet er de ansattes øyne og ører for sikkerhet',
    content: 'Verneombudet er de ansattes representant i HMS-spørsmål. De skal se til at arbeidsmiljøet er forsvarlig og kan stoppe farlig arbeid umiddelbart. AMU er et partssammensatt utvalg som samler ledelse og ansatte om HMS-arbeid.',
    subpoints: [
      'Verneombudet velges av og blant de ansatte',
      'Verneombudet kan stanse farlig arbeid umiddelbart',
      'AMU: obligatorisk ved ≥50 ansatte',
      'AMU behandler HMS-spørsmål, ulykker og arbeidsmiljøundersøkelser',
    ],
    practical: 'Finn ut hvem som er verneombud på din arbeidsplass. Kjenner alle ansatte til hvem dette er?',
    exercises: [
      {
        id: 'hms-4-1',
        question: 'Hva er verneombudets viktigste oppgave?',
        choices: [
          { id: 'a', text: 'Å lede bedriften ved farlige situasjoner' },
          { id: 'b', text: 'Å se til at arbeidsmiljøet er forsvarlig og representere ansattes HMS-interesser' },
          { id: 'c', text: 'Å ansette nye medarbeidere' },
          { id: 'd', text: 'Å rapportere direkte til Arbeidstilsynet' },
        ],
        correctId: 'b',
        explanation: 'Verneombudet representerer ansattes interesser i HMS-spørsmål og skal påse at arbeidsmiljøet er forsvarlig.',
      },
      {
        id: 'hms-4-2',
        question: 'I hvilken situasjon kan verneombudet stanse arbeid?',
        choices: [
          { id: 'a', text: 'Når de ansatte er misfornøyde med lønnen' },
          { id: 'b', text: 'Når det foreligger umiddelbar fare for liv og helse' },
          { id: 'c', text: 'Kun etter godkjenning fra Arbeidstilsynet' },
          { id: 'd', text: 'Aldri — kun ledelsen kan stanse arbeid' },
        ],
        correctId: 'b',
        explanation: 'Verneombudet kan stanse arbeid umiddelbart hvis det foreligger fare for liv og helse. Dette er en sterk rettighet etter Arbeidsmiljøloven.',
      },
      {
        id: 'hms-4-3',
        question: 'Fra hvilken størrelse er AMU obligatorisk?',
        choices: [
          { id: 'a', text: '10 ansatte' },
          { id: 'b', text: '25 ansatte' },
          { id: 'c', text: '50 ansatte' },
          { id: 'd', text: '100 ansatte' },
        ],
        correctId: 'c',
        explanation: 'AMU (Arbeidsmiljøutvalg) er obligatorisk ved bedrifter med 50 eller flere ansatte.',
      },
      {
        id: 'hms-4-4',
        question: 'Hva behandler AMU?',
        choices: [
          { id: 'a', text: 'Lønnsspørsmål og ferieplaner' },
          { id: 'b', text: 'HMS-spørsmål, arbeidsulykker og arbeidsmiljøundersøkelser' },
          { id: 'c', text: 'Budsjettering og økonomi' },
          { id: 'd', text: 'Markedsføring og salg' },
        ],
        correctId: 'b',
        explanation: 'AMU behandler HMS-relaterte saker: forebygging av ulykker, arbeidsulykker, arbeidsmiljøundersøkelser og HMS-planer.',
      },
      {
        id: 'hms-4-5',
        question: 'Hvem sitter i AMU?',
        choices: [
          { id: 'a', text: 'Kun ledelsesrepresentanter' },
          { id: 'b', text: 'Kun ansatterepresentanter' },
          { id: 'c', text: 'Representanter fra både ledelse og ansatte (partssammensatt)' },
          { id: 'd', text: 'Eksterne konsulenter' },
        ],
        correctId: 'c',
        explanation: 'AMU er partssammensatt — det betyr at både ledelse og ansatte er representert med like mange representanter.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📋',
    title: 'Risikovurdering',
    quote: 'Kartlegg farer FØR ulykken — ikke etter',
    content: 'Risikovurdering er systematisk identifisering og vurdering av farer på arbeidsplassen. Risiko = sannsynlighet × konsekvens. Etter vurderingen iverksettes tiltak for å redusere risikoen til et akseptabelt nivå.',
    subpoints: [
      'Identifiser farekilder: hva kan gå galt?',
      'Vurder risiko: sannsynlighet × konsekvens',
      'Iverksett tiltak: fjern faren, beskytt ansatte',
      'Dokumenter alt: hvem, hva, når',
      'Evaluer tiltakene regelmessig',
    ],
    practical: 'Gjennomfør en mini-risikovurdering: velg én aktivitet på jobben, identifiser én fare, vurder risikoen, og beskriv et forebyggende tiltak.',
    exercises: [
      {
        id: 'hms-5-1',
        question: 'Hva er formelen for å beregne risiko?',
        choices: [
          { id: 'a', text: 'Risiko = antall ansatte × kostnad' },
          { id: 'b', text: 'Risiko = sannsynlighet × konsekvens' },
          { id: 'c', text: 'Risiko = farekilder ÷ tiltak' },
          { id: 'd', text: 'Risiko = skader per år' },
        ],
        correctId: 'b',
        explanation: 'Risiko beregnes som sannsynligheten for at noe skjer multiplisert med konsekvensen hvis det skjer.',
      },
      {
        id: 'hms-5-2',
        question: 'En kjøkkenansatt bruker skarpe kniver uten vernehansker. Hva er prioritert tiltak?',
        choices: [
          { id: 'a', text: 'Kursing i førstehjelp' },
          { id: 'b', text: 'Gi den ansatte skjærehansker og opplæring i knivsikkerhet' },
          { id: 'c', text: 'Erstatte knivene med plastkniver' },
          { id: 'd', text: 'Dokumentere faren og vente på neste risikovurdering' },
        ],
        correctId: 'b',
        explanation: 'Riktig verneutstyr (skjærehansker) og opplæring er de mest direkte tiltakene for å redusere risiko ved knivbruk.',
      },
      {
        id: 'hms-5-3',
        question: 'Hva er hensikten med å dokumentere risikovurderingen?',
        choices: [
          { id: 'a', text: 'Kun for å vise Arbeidstilsynet at du har gjort jobben' },
          { id: 'b', text: 'For å kunne følge opp tiltak, evaluere effekt og lære av hendelser' },
          { id: 'c', text: 'Dokumentasjon er ikke nødvendig for småbedrifter' },
          { id: 'd', text: 'For å slippe å gjøre risikovurdering neste år' },
        ],
        correctId: 'b',
        explanation: 'Dokumentasjon gjør det mulig å følge opp tiltak, evaluere om de virker, og lære av hendelser til fremtidige vurderinger.',
      },
      {
        id: 'hms-5-4',
        question: 'Et glatt gulv ved butikkinngangen er identifisert som fare. Risiko: høy sannsynlighet, moderat konsekvens. Hva er riktig tiltak?',
        choices: [
          { id: 'a', text: 'Sett opp et skilt "Glatt gulv" og vent' },
          { id: 'b', text: 'Legg sklimatte og vurder andre gulvmaterialer' },
          { id: 'c', text: 'La kundene ta ansvar for seg selv' },
          { id: 'd', text: 'Dokumenter faren og behandle den ved neste HMS-møte' },
        ],
        correctId: 'b',
        explanation: 'Høy sannsynlighet krever umiddelbare fysiske tiltak. Sklimatte reduserer risikoen direkte — skilt alene er ikke tilstrekkelig.',
      },
      {
        id: 'hms-5-5',
        question: 'Hvor ofte bør risikovurderingen oppdateres?',
        choices: [
          { id: 'a', text: 'Én gang i bedriftens levetid' },
          { id: 'b', text: 'Regelmessig og ved endringer i arbeidsoppgaver, utstyr eller bemanning' },
          { id: 'c', text: 'Kun etter at det har skjedd en ulykke' },
          { id: 'd', text: 'Hvert tiende år' },
        ],
        correctId: 'b',
        explanation: 'Risikovurderingen skal oppdateres regelmessig og alltid ved endringer i arbeidsoppgaver, nytt utstyr, ombygging eller ny bemanning.',
      },
    ],
  },
]

export default function HMSModule() {
  return (
    <DrawerModule
      moduleCode="FD4"
      moduleTitle="HMS — Helse, Miljø og Sikkerhet"
      moduleIcon="⚠️"
      storageKey="learning-hms"
      completeRoute="/learning/forretningsdrift/hms/complete"
      phases={phases}
      intro="Helse, miljø og sikkerhet (HMS) er ikke bare papirarbeid — det handler om at alle skal komme hjem fra jobb uskadd."
      vissteduAt="Bedrifter med godt HMS-arbeid har 35% lavere sykefravær og 50% færre arbeidsulykker enn gjennomsnittet."
      espenSier="HMS virker kjedelig til du trenger det. En arbeidsulykke ødelegger liv — og kostnadene for bedriften er enorme."
      presentationLink={{ route: '/learning/presentations/hms', description: 'HMS — en visuell gjennomgang av internkontroll, verneombud og arbeidsmiljø' }}
    />
  )
}
