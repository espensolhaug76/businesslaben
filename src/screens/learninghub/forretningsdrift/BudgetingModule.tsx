import DrawerModule, { type DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📋',
    title: 'Hva er et budsjett?',
    quote: 'Budsjett er ikke et mål — det er et kart. Regnskapet viser hvor du faktisk er',
    content: 'Et budsjett er en plan for fremtidige inntekter og kostnader. Regnskapet viser hva som faktisk skjedde. Differansen mellom budsjett og regnskap kalles avvik. Avvik kan være positive (bedre enn planlagt) eller negative (dårligere enn planlagt).',
    subpoints: [
      'Budsjett = estimerte inntekter og kostnader for fremtiden',
      'Regnskap = hva som faktisk skjedde',
      'Avvik = regnskap - budsjett (positivt er bedre enn planlagt)',
      'Budsjetter er styringsverktøy, ikke spådommer',
    ],
    practical: 'Lag et enkelt månedlig budsjett: noter forventede inntekter og kostnader. Etter måneden, sammenlign med faktiske tall.',
    exercises: [
      {
        id: 'bu-1-1',
        question: 'Hva er forskjellen mellom budsjett og regnskap?',
        choices: [
          { id: 'a', text: 'De er det samme — bare forskjellige navn' },
          { id: 'b', text: 'Budsjett er fremtidig plan, regnskap er historiske faktiske tall' },
          { id: 'c', text: 'Budsjettet er alltid mer nøyaktig enn regnskapet' },
          { id: 'd', text: 'Regnskap lages av ledelsen, budsjett av regnskapsføreren' },
        ],
        correctId: 'b',
        explanation: 'Budsjettet er en fremtidsplan (estimater), mens regnskapet dokumenterer hva som faktisk skjedde.',
      },
      {
        id: 'bu-1-2',
        question: 'En butikk budsjetterte 100 000 kr i salg, men hadde faktisk 85 000 kr. Hva er avviket?',
        choices: [
          { id: 'a', text: '+15 000 kr (positivt)' },
          { id: 'b', text: '-15 000 kr (negativt)' },
          { id: 'c', text: '0 kr — avvik finnes ikke' },
          { id: 'd', text: '-85 000 kr (negativt)' },
        ],
        correctId: 'b',
        explanation: 'Avvik = faktisk - budsjett = 85 000 - 100 000 = -15 000 kr. Negativt avvik betyr at salget var lavere enn planlagt.',
      },
      {
        id: 'bu-1-3',
        question: 'Hva er hovedformålet med å lage et budsjett?',
        choices: [
          { id: 'a', text: 'Å vise banken at du er seriøs' },
          { id: 'b', text: 'Å styre og planlegge bedriftens økonomi fremover' },
          { id: 'c', text: 'Å rapportere til skattemyndighetene' },
          { id: 'd', text: 'Å beregne historiske kostnader' },
        ],
        correctId: 'b',
        explanation: 'Budsjettet er et styringsverktøy som hjelper deg planlegge, følge opp og justere kurs i tide.',
      },
      {
        id: 'bu-1-4',
        question: 'Et positivt avvik på kostnader betyr at:',
        choices: [
          { id: 'a', text: 'Kostnadene var høyere enn budsjettert' },
          { id: 'b', text: 'Kostnadene var lavere enn budsjettert — bra for bedriften' },
          { id: 'c', text: 'Inntektene var høyere enn budsjettert' },
          { id: 'd', text: 'Det ikke finnes avvik' },
        ],
        correctId: 'b',
        explanation: 'For kostnader er et negativt avvik (faktisk < budsjett) faktisk positivt for bedriften — du brukte mindre enn planlagt.',
      },
      {
        id: 'bu-1-5',
        question: 'Hvor ofte bør en detaljhandel vanligvis lage og følge opp budsjettet?',
        choices: [
          { id: 'a', text: 'En gang i året — ved årsavslutning' },
          { id: 'b', text: 'Månedlig, med en overordnet årsplan' },
          { id: 'c', text: 'Kun når banken krever det' },
          { id: 'd', text: 'Hvert femte år' },
        ],
        correctId: 'b',
        explanation: 'Månedlig budsjettering gir regelmessig styringsinformasjon og gjør det mulig å oppdage avvik raskt og justere kurs.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📈',
    title: 'Resultatbudsjett',
    quote: 'Resultatbudsjettet svarer på: vil vi tjene penger?',
    content: 'Resultatbudsjettet viser forventede inntekter og kostnader, og beregner forventet resultat (overskudd eller underskudd). Det er bedriftens finansielle handlingsplan.',
    subpoints: [
      'Inntekter - Kostnader = Resultat',
      'Budsjetter per periode (måned/kvartal) for å fange sesongvariasjoner',
      'Faste kostnader: lønn, leie, forsikring (endres ikke med omsetning)',
      'Variable kostnader: varekost, provisjon (endres med omsetning)',
    ],
    practical: 'Lag et resultatbudsjett for én måned: noter alle inntektskilder og del kostnadene i faste og variable. Er resultatet positivt?',
    exercises: [
      {
        id: 'bu-2-1',
        question: 'En bedrift har budsjetterte inntekter på 200 000 kr og kostnader på 180 000 kr. Hva er budsjettert resultat?',
        choices: [
          { id: 'a', text: '-20 000 kr (underskudd)' },
          { id: 'b', text: '+20 000 kr (overskudd)' },
          { id: 'c', text: '0 kr (break-even)' },
          { id: 'd', text: '380 000 kr' },
        ],
        correctId: 'b',
        explanation: 'Resultat = Inntekter - Kostnader = 200 000 - 180 000 = +20 000 kr overskudd.',
      },
      {
        id: 'bu-2-2',
        question: 'Hva er et eksempel på en fast kostnad?',
        choices: [
          { id: 'a', text: 'Varekostnad per solgt enhet' },
          { id: 'b', text: 'Provisjon til selgere' },
          { id: 'c', text: 'Månedlig husleie for butikklokalet' },
          { id: 'd', text: 'Innkjøp av sesongvarer' },
        ],
        correctId: 'c',
        explanation: 'Husleie er en fast kostnad fordi den ikke endrer seg med omsetningen. Du betaler det samme enten du selger mye eller lite.',
      },
      {
        id: 'bu-2-3',
        question: 'Hvorfor er det viktig å budsjettere per måned fremfor bare per år?',
        choices: [
          { id: 'a', text: 'Det er ikke viktig — årsbudsjettet er tilstrekkelig' },
          { id: 'b', text: 'For å fange sesongvariasjoner og oppdage avvik underveis' },
          { id: 'c', text: 'Fordi staten krever månedlige budsjetter' },
          { id: 'd', text: 'For å spare tid på årsbudsjettet' },
        ],
        correctId: 'b',
        explanation: 'Månedlig budsjettering avdekker sesongvariasjoner (november-desember er høysesong for handel) og gir mulighet til å reagere på avvik.',
      },
      {
        id: 'bu-2-4',
        question: 'En butikk selger mer enn budsjettert i desember, men varekostnadene stiger tilsvarende. Hva er sannsynlig effekt på resultatet?',
        choices: [
          { id: 'a', text: 'Resultatet bedres dramatisk' },
          { id: 'b', text: 'Resultatet er omtrent uendret siden variable kostnader følger inntektene' },
          { id: 'c', text: 'Resultatet forverres alltid' },
          { id: 'd', text: 'Resultatet halveres' },
        ],
        correctId: 'b',
        explanation: 'Variable kostnader (varekost) stiger i takt med omsetningen. Det er de faste kostnadene som er avgjørende for om ekstra salg gir bedre resultat.',
      },
      {
        id: 'bu-2-5',
        question: 'Hva betyr det at en bedrift "går med underskudd"?',
        choices: [
          { id: 'a', text: 'De har ingen kunder' },
          { id: 'b', text: 'Kostnadene er høyere enn inntektene i perioden' },
          { id: 'c', text: 'De har dårlig likviditet' },
          { id: 'd', text: 'Budsjettet er ikke oppdatert' },
        ],
        correctId: 'b',
        explanation: 'Underskudd betyr at kostnadene overstiger inntektene i perioden. Bedriften tærer på egenkapitalen.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💧',
    title: 'Likviditetsbudsjett',
    quote: 'Du kan ha overskudd og gå konkurs — fordi pengene ikke er på kontoen til rett tid',
    content: 'Likviditet er betalingsevnen — muligheten til å betale regninger når de forfaller. Likviditetsbudsjettet viser inn- og utbetalinger over tid. Det er mulig å vise overskudd i resultatbudsjettet, men likevel mangle penger i kassen.',
    subpoints: [
      'Likviditet = betalingsevne (penger tilgjengelig NÅ)',
      'Inn- og utbetalinger skjer sjelden samtidig',
      'Kundefordringer: kunder som skylder deg penger',
      'Leverandørgjeld: penger du skylder leverandørene',
      'Krisescenario: lønn skal betales 15., men kunder betaler 30.',
    ],
    practical: 'Lag en enkel likviditetsprognose: noter alle forventede utbetalinger (lønn, leie, leverandører) og innbetalinger (salg, tilskudd) uke for uke.',
    exercises: [
      {
        id: 'bu-3-1',
        question: 'Hva menes med "likviditetsproblem"?',
        choices: [
          { id: 'a', text: 'Bedriften går med underskudd' },
          { id: 'b', text: 'Bedriften mangler kontanter til å betale regninger som forfaller' },
          { id: 'c', text: 'Bedriften har for mye penger på kontoen' },
          { id: 'd', text: 'Bedriften har høy gjeld' },
        ],
        correctId: 'b',
        explanation: 'Likviditetsproblem oppstår når bedriften ikke har nok kontanter til å betale regninger når de forfaller — selv om de totalt sett er lønnsomme.',
      },
      {
        id: 'bu-3-2',
        question: 'En bedrift har overskudd i regnskapet, men går konkurs. Hva er den mest sannsynlige årsaken?',
        choices: [
          { id: 'a', text: 'For høye inntekter' },
          { id: 'b', text: 'Likviditetsproblemer — pengene kom inn for sent' },
          { id: 'c', text: 'For mange ansatte' },
          { id: 'd', text: 'Feil i budsjettet' },
        ],
        correctId: 'b',
        explanation: 'Overskudd i resultatregnskapet garanterer ikke at pengene er tilgjengelige. Hvis kunder betaler sent og leverandører krever betaling nå, kan bedriften gå konkurs.',
      },
      {
        id: 'bu-3-3',
        question: 'Hva er kundefordringer?',
        choices: [
          { id: 'a', text: 'Penger bedriften skylder kundene' },
          { id: 'b', text: 'Penger kundene skylder bedriften' },
          { id: 'c', text: 'Bedriftens bankinnskudd' },
          { id: 'd', text: 'Varelageret' },
        ],
        correctId: 'b',
        explanation: 'Kundefordringer er penger kundene skylder bedriften for varer/tjenester de allerede har mottatt, men ikke betalt for ennå.',
      },
      {
        id: 'bu-3-4',
        question: 'Hva kan en butikk gjøre for å forbedre likviditeten?',
        choices: [
          { id: 'a', text: 'Gi kundene lengre betalingsfrist' },
          { id: 'b', text: 'Betale leverandørene raskere' },
          { id: 'c', text: 'Forhandle om lengre betalingsfrist fra leverandørene' },
          { id: 'd', text: 'Øke varelageret' },
        ],
        correctId: 'c',
        explanation: 'Lengre betalingsfrist fra leverandørene betyr at pengene fra kundene kan komme inn før du må betale leverandørene — bedre likviditetsflyt.',
      },
      {
        id: 'bu-3-5',
        question: 'Hva er formålet med et likviditetsbudsjett?',
        choices: [
          { id: 'a', text: 'Å vise om bedriften er lønnsom' },
          { id: 'b', text: 'Å planlegge inn- og utbetalinger for å unngå betalingsproblemer' },
          { id: 'c', text: 'Å beregne årsresultatet' },
          { id: 'd', text: 'Å fastsette lønn til ansatte' },
        ],
        correctId: 'b',
        explanation: 'Likviditetsbudsjettet planlegger kontantstrømmen — når penger kommer inn og går ut — slik at du kan forutse og forebygge betalingsproblemer.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔍',
    title: 'Avvik og tiltak',
    quote: 'Et avvik er ikke et problem — det er informasjon. Spørsmålet er hva du gjør med det',
    content: 'Avviksanalyse handler om å sammenligne budsjetterte og faktiske tall, forstå årsaken til avviket, og iverksette tiltak. Et negativt avvik er et signal — ikke en dom.',
    subpoints: [
      'Positivt avvik (inntekter): faktisk > budsjett — bedre enn planlagt',
      'Negativt avvik (inntekter): faktisk < budsjett — dårligere enn planlagt',
      'Analyser alltid årsaken: intern (rutiner) eller ekstern (marked)?',
      'Mulige tiltak: kutt kostnader, øk salgsaktivitet, revurder priser',
    ],
    practical: 'Etter en periode: gå gjennom budsjett vs faktisk, identifiser de tre største avvikene, og skriv ned én konkret årsak og ett tiltak for hvert.',
    exercises: [
      {
        id: 'bu-4-1',
        question: 'Hva er første steg i en avviksanalyse?',
        choices: [
          { id: 'a', text: 'Gi de ansvarlige en advarsel' },
          { id: 'b', text: 'Sammenligne faktiske tall med budsjetterte tall' },
          { id: 'c', text: 'Lage et nytt budsjett' },
          { id: 'd', text: 'Kontakte banken' },
        ],
        correctId: 'b',
        explanation: 'Avviksanalysen starter med å identifisere avviket — forskjellen mellom hva som faktisk skjedde og hva som var planlagt.',
      },
      {
        id: 'bu-4-2',
        question: 'Lønnskostnadene var 10% høyere enn budsjettert. Hva bør du undersøke?',
        choices: [
          { id: 'a', text: 'Om du trenger flere ansatte' },
          { id: 'b', text: 'Om det var ekstra overtid, sykevikarer, eller feil i budsjettet' },
          { id: 'c', text: 'Om du skal si opp ansatte umiddelbart' },
          { id: 'd', text: 'Om kundene er fornøyde' },
        ],
        correctId: 'b',
        explanation: 'Høyere lønnskostnader kan skyldes overtid, sykevikarer, feilbudsjettering eller uplanlagte aktiviteter. Finn årsaken før du iverksetter tiltak.',
      },
      {
        id: 'bu-4-3',
        question: 'Salgsinntektene er 20% under budsjett i mars. Hva er et fornuftig tiltak?',
        choices: [
          { id: 'a', text: 'Ignorer det — april blir sikkert bedre' },
          { id: 'b', text: 'Øk salgsaktiviteten og vurder om det er sesong-, pris- eller konkurrentårsaker' },
          { id: 'c', text: 'Fjern budsjettet — det er unøyaktig' },
          { id: 'd', text: 'Øk kostnadene for å kompensere' },
        ],
        correctId: 'b',
        explanation: 'Negativt salgsavvik krever analyse (årsak) og tiltak (handling). Å ignorere det kan gjøre situasjonen verre.',
      },
      {
        id: 'bu-4-4',
        question: 'Hva er forskjellen på interne og eksterne årsaker til avvik?',
        choices: [
          { id: 'a', text: 'Det er ingen forskjell — alle avvik er bedriftens ansvar' },
          { id: 'b', text: 'Interne: bedriftens egne rutiner/beslutninger. Eksterne: markedsforhold, konkurrenter, økonomi' },
          { id: 'c', text: 'Interne avvik er alltid negative, eksterne er alltid positive' },
          { id: 'd', text: 'Kun eksterne avvik krever tiltak' },
        ],
        correctId: 'b',
        explanation: 'Interne avvik (feil prissetting, ineffektive rutiner) kan bedriften kontrollere. Eksterne avvik (lavkonjunktur, ny konkurrent) krever tilpasning.',
      },
      {
        id: 'bu-4-5',
        question: 'En bedrift har konsekvent 15% høyere kostnader enn budsjettert hvert kvartal. Hva er sannsynlig årsak?',
        choices: [
          { id: 'a', text: 'Tilfeldig uflaks' },
          { id: 'b', text: 'Budsjettet er systematisk for optimistisk — det bør revideres' },
          { id: 'c', text: 'Ansatte stjeler fra bedriften' },
          { id: 'd', text: 'For mange kunder' },
        ],
        correctId: 'b',
        explanation: 'Systematiske avvik over tid tyder på at budsjettet er urealistisk. Revisjon av budsjetteringsmetoden er nødvendig.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🔄',
    title: 'Nullbasert budsjettering',
    quote: 'Start alltid med null — ikke med fjorårets budsjett',
    content: 'Det finnes to hovedmetoder for budsjettering. Tradisjonell: ta fjorårets budsjett og juster med noen prosent. Nullbasert: begrunn alle kostnader fra scratch hvert år, som om bedriften starter på nytt.',
    subpoints: [
      'Tradisjonell budsjettering: enkel, men viderefører "zombie-kostnader"',
      'Nullbasert budsjettering: fjerner unødvendige kostnader, men tidkrevende',
      '"Zombie-kostnader": utgifter ingen husker hvorfor finnes der lenger',
      'Nullbasert er ekstra nyttig etter store endringer i bedriften',
    ],
    practical: 'Gå gjennom én kostnadskategori med nullbasert tilnærming: still spørsmålet "trenger vi fortsatt dette?" for hver utgiftspost.',
    exercises: [
      {
        id: 'bu-5-1',
        question: 'Hva er "nullbasert budsjettering"?',
        choices: [
          { id: 'a', text: 'Et budsjett som alltid er 0 kr' },
          { id: 'b', text: 'Alle kostnader begrunnes fra scratch hvert år, uavhengig av fjoråret' },
          { id: 'c', text: 'Å sette alle budsjettposter til null som utgangspunkt, deretter justere' },
          { id: 'd', text: 'Budsjettering uten bruk av regneark' },
        ],
        correctId: 'b',
        explanation: 'Nullbasert budsjettering betyr at du starter fra null og begrunner ALLE kostnader på nytt hvert år, i stedet for å ta utgangspunkt i fjorårets tall.',
      },
      {
        id: 'bu-5-2',
        question: 'Hva er en "zombie-kostnad"?',
        choices: [
          { id: 'a', text: 'En ekstremt høy kostnad' },
          { id: 'b', text: 'En utgift ingen husker formålet med, men som videreføres automatisk' },
          { id: 'c', text: 'Kostnader knyttet til Halloween-dekorasjoner' },
          { id: 'd', text: 'En uventet kostnad' },
        ],
        correctId: 'b',
        explanation: '"Zombie-kostnader" er utgifter som videreføres hvert år uten at noen stiller spørsmål ved dem. Nullbasert budsjettering avdekker og eliminerer disse.',
      },
      {
        id: 'bu-5-3',
        question: 'Hva er den største fordelen med tradisjonell budsjettering sammenlignet med nullbasert?',
        choices: [
          { id: 'a', text: 'Det gir alltid et mer nøyaktig budsjett' },
          { id: 'b', text: 'Det er mye raskere og enklere å gjennomføre' },
          { id: 'c', text: 'Det fjerner alle zombie-kostnader' },
          { id: 'd', text: 'Det krever ingen historiske data' },
        ],
        correctId: 'b',
        explanation: 'Tradisjonell budsjettering er rask fordi du justerer eksisterende tall. Nullbasert budsjettering er grundigere, men svært tidkrevende.',
      },
      {
        id: 'bu-5-4',
        question: 'En ny daglig leder oppdager at bedriften betaler for en programvarelisens de ikke lenger bruker. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', text: 'Normalt og uunngåelig' },
          { id: 'b', text: 'En zombie-kostnad som nullbasert budsjettering ville avdekket' },
          { id: 'c', text: 'En nødvendig investering' },
          { id: 'd', text: 'Et positivt avvik' },
        ],
        correctId: 'b',
        explanation: 'En programvarelisens ingen bruker, men som videreføres automatisk, er klassisk zombie-kostnad. Nullbasert budsjettering tvinger frem spørsmålet: "trenger vi dette?"',
      },
      {
        id: 'bu-5-5',
        question: 'Når er nullbasert budsjettering spesielt nyttig?',
        choices: [
          { id: 'a', text: 'Når alt går veldig bra og ingen ønsker endring' },
          { id: 'b', text: 'Etter store endringer i bedriften, ny strategi eller kostnadskutt' },
          { id: 'c', text: 'Kun for store bedrifter med hundrevis av ansatte' },
          { id: 'd', text: 'Aldri — tradisjonell budsjettering er alltid best' },
        ],
        correctId: 'b',
        explanation: 'Nullbasert budsjettering er mest verdifull når bedriften gjennomgår store endringer, omstruktureringer eller trenger å kutte kostnader systematisk.',
      },
    ],
  },
]

export default function BudgetingModule() {
  return (
    <DrawerModule
      moduleCode="FD3"
      moduleTitle="Budsjettering"
      moduleIcon="📊"
      storageKey="learning-budgeting"
      completeRoute="/learning/forretningsdrift/budgeting/complete"
      phases={phases}
      intro="Et budsjett er ikke en spådom — det er en plan. Å jobbe med avvik mellom budsjett og regnskap er kjernen i god styring."
      vissteduAt="Nesten 60% av norske småbedrifter har ikke et formelt budsjett — og konkursrisikoen er 3× høyere for disse."
      espenSier="Budsjett er kjedelig å lage — men uten det styrer du i blinde. En time med Excel kan spare deg for måneder med kaos."
      presentationLink={{ route: '/learning/presentations/regnskap', description: 'Regnskap og budsjett — en visuell gjennomgang av lønnsomhet' }}
    />
  )
}
