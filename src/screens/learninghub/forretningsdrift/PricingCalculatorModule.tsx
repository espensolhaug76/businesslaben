import DrawerModule, { type DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '💰',
    title: 'Kostpris og påslag',
    quote: 'Pris uten kostnadsberegning er gambling, ikke forretning',
    content: 'Kostpris er summen av alle kostnader knyttet til å skaffe en vare — innkjøpspris, frakt, toll og eventuelle lagerkostnader. Påslag (markup) beregnes som differansen mellom salgspris og kostpris, delt på kostpris.',
    subpoints: [
      'Kostpris = innkjøpspris + frakt + toll + lagerkostnader',
      'Påslag% = (salgspris - kostpris) / kostpris × 100',
      'Eks: kjøper inn til 80 kr, selger for 200 kr = 150% påslag',
      'Høyt påslag ≠ høy fortjeneste hvis kostnadene er skjulte',
    ],
    practical: 'Lag en enkel kalkyle for ett produkt: noter alle kostnader, legg til ønsket påslag, og se om salgsprisen er realistisk i markedet.',
    glossaryTerm: 'Dekningsbidrag',
    exercises: [
      {
        id: 'pc-1-1',
        question: 'En vare koster 100 kr å kjøpe inn. Du selger den for 250 kr. Hva er påslagsprosenten?',
        choices: [
          { id: 'a', text: '60%' },
          { id: 'b', text: '150%' },
          { id: 'c', text: '250%' },
          { id: 'd', text: '100%' },
        ],
        correctId: 'b',
        explanation: 'Påslag% = (250 - 100) / 100 × 100 = 150%. Du legger til 150% av innkjøpsprisen.',
      },
      {
        id: 'pc-1-2',
        question: 'Hva inngår i kostprisen for en importert vare?',
        choices: [
          { id: 'a', text: 'Bare innkjøpsprisen fra leverandøren' },
          { id: 'b', text: 'Innkjøpspris, frakt, toll og lagerkostnader' },
          { id: 'c', text: 'Innkjøpspris og salgspris' },
          { id: 'd', text: 'MVA og frakt' },
        ],
        correctId: 'b',
        explanation: 'Kostprisen må inkludere alle kostnader for å skaffe varen: innkjøpspris, frakt, toll og lagerkostnader.',
      },
      {
        id: 'pc-1-3',
        question: 'En butikk kjøper joggesko for 400 kr og selger dem for 900 kr. Hva er påslagsprosenten?',
        choices: [
          { id: 'a', text: '44%' },
          { id: 'b', text: '55%' },
          { id: 'c', text: '125%' },
          { id: 'd', text: '225%' },
        ],
        correctId: 'c',
        explanation: 'Påslag = 900 - 400 = 500 kr. Påslag% = 500 / 400 × 100 = 125%.',
      },
      {
        id: 'pc-1-4',
        question: 'Hva er forskjellen på påslag og dekningsgrad?',
        choices: [
          { id: 'a', text: 'De er det samme bare med forskjellige navn' },
          { id: 'b', text: 'Påslag beregnes av kostpris, dekningsgrad av salgspris' },
          { id: 'c', text: 'Påslag beregnes av salgspris, dekningsgrad av kostpris' },
          { id: 'd', text: 'Dekningsgrad inkluderer alltid MVA' },
        ],
        correctId: 'b',
        explanation: 'Påslag% beregnes av kostprisen (grunnlag = kostpris), mens dekningsgraden beregnes av salgsprisen (grunnlag = salgspris).',
      },
      {
        id: 'pc-1-5',
        question: 'Du ønsker et påslag på 80% på en vare som koster 200 kr. Hva blir salgsprisen?',
        choices: [
          { id: 'a', text: '280 kr' },
          { id: 'b', text: '360 kr' },
          { id: 'c', text: '380 kr' },
          { id: 'd', text: '240 kr' },
        ],
        correctId: 'b',
        explanation: 'Påslag = 200 × 80% = 160 kr. Salgspris = 200 + 160 = 360 kr.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🧮',
    title: 'MVA og beregning',
    quote: 'Kundene ser prisen inkl. MVA — du beholder bare ekskl. MVA',
    content: 'MVA (merverdiavgift) er en avgift som legges på de fleste varer og tjenester. Satsen varierer: 25% for de fleste varer, 15% for mat og drikke, og 0% på helsetjenester. Bedriften krever inn MVA fra kundene og sender det videre til staten.',
    subpoints: [
      'Standard MVA-sats: 25% (de fleste varer og tjenester)',
      'Mat og drikke: 15% MVA',
      'Helse og transport: 0% eller redusert sats',
      'Pris inkl. MVA = pris ekskl. MVA × 1,25',
      'Pris ekskl. MVA = pris inkl. MVA / 1,25',
    ],
    practical: 'Husk alltid å skille mellom priser med og uten MVA i kalkylene dine. Dekningsgraden beregnes alltid av salgspris ekskl. MVA.',
    exercises: [
      {
        id: 'pc-2-1',
        question: 'En vare koster 160 kr ekskl. MVA. Hva er prisen inkl. 25% MVA?',
        choices: [
          { id: 'a', text: '180 kr' },
          { id: 'b', text: '185 kr' },
          { id: 'c', text: '200 kr' },
          { id: 'd', text: '210 kr' },
        ],
        correctId: 'c',
        explanation: 'Pris inkl. MVA = 160 × 1,25 = 200 kr. MVA-beløpet er 40 kr som betales til staten.',
      },
      {
        id: 'pc-2-2',
        question: 'En kunde betaler 250 kr inkl. 25% MVA. Hvor mye beholder butikken ekskl. MVA?',
        choices: [
          { id: 'a', text: '187,50 kr' },
          { id: 'b', text: '200 kr' },
          { id: 'c', text: '212,50 kr' },
          { id: 'd', text: '225 kr' },
        ],
        correctId: 'b',
        explanation: 'Pris ekskl. MVA = 250 / 1,25 = 200 kr. De resterende 50 kr er MVA som sendes til staten.',
      },
      {
        id: 'pc-2-3',
        question: 'Hvilken MVA-sats gjelder for mat og drikke i Norge?',
        choices: [
          { id: 'a', text: '25%' },
          { id: 'b', text: '10%' },
          { id: 'c', text: '15%' },
          { id: 'd', text: '12%' },
        ],
        correctId: 'c',
        explanation: 'Mat og drikke har redusert MVA-sats på 15% i Norge, mot 25% for de fleste andre varer og tjenester.',
      },
      {
        id: 'pc-2-4',
        question: 'Hvorfor er det viktig å beregne dekningsgraden ekskl. MVA?',
        choices: [
          { id: 'a', text: 'Fordi MVA gir ekstra inntekt til bedriften' },
          { id: 'b', text: 'Fordi MVA ikke er bedriftens inntekt — den sendes til staten' },
          { id: 'c', text: 'Fordi det alltid er mer enn inkl. MVA' },
          { id: 'd', text: 'Fordi kunder alltid forhandler ned prisen' },
        ],
        correctId: 'b',
        explanation: 'MVA er ikke bedriftens inntekt. Den samles inn på vegne av staten. Dekningsgraden må beregnes av det beløpet bedriften faktisk beholder.',
      },
      {
        id: 'pc-2-5',
        question: 'En restaurant selger en rett for 200 kr inkl. 25% MVA. Hva er prisen ekskl. MVA?',
        choices: [
          { id: 'a', text: '150 kr' },
          { id: 'b', text: '160 kr' },
          { id: 'c', text: '170 kr' },
          { id: 'd', text: '175 kr' },
        ],
        correctId: 'b',
        explanation: 'Pris ekskl. MVA = 200 / 1,25 = 160 kr. MVA-beløpet er 40 kr.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📊',
    title: 'Dekningsgrad og fortjeneste',
    quote: 'Dekningsgraden forteller deg om du driver lønnsomt',
    content: 'Dekningsgraden (DG) viser hvor stor andel av salgsinntekten (ekskl. MVA) som er igjen etter at variable kostnader er dekket. Denne andelen brukes til å dekke faste kostnader og gi fortjeneste.',
    subpoints: [
      'DG% = (Salgspris ekskl. MVA - Kostpris) / Salgspris ekskl. MVA × 100',
      'Dekningsbidrag = Salgspris ekskl. MVA - Kostpris',
      'Mål: DG% bør minst dekke bedriftens faste kostnader',
      'En DG på 40% betyr at 40 øre av hver krone dekker faste kostnader',
    ],
    practical: 'Beregn DG for de viktigste produktene dine. Hvis DG er for lav, har du to valg: øk prisen eller reduser kostpris.',
    glossaryTerm: 'Dekningsbidrag',
    exercises: [
      {
        id: 'pc-3-1',
        question: 'En vare selges for 200 kr ekskl. MVA. Kostprisen er 80 kr. Hva er dekningsgraden?',
        choices: [
          { id: 'a', text: '40%' },
          { id: 'b', text: '60%' },
          { id: 'c', text: '150%' },
          { id: 'd', text: '75%' },
        ],
        correctId: 'b',
        explanation: 'DG% = (200 - 80) / 200 × 100 = 120/200 × 100 = 60%.',
      },
      {
        id: 'pc-3-2',
        question: 'Hva forteller dekningsgraden deg?',
        choices: [
          { id: 'a', text: 'Hvor mye du tjener per solgte enhet etter alle kostnader' },
          { id: 'b', text: 'Hvor stor andel av salgsinntekten som er igjen etter variable kostnader' },
          { id: 'c', text: 'Hvor mange enheter du må selge for å gå i null' },
          { id: 'd', text: 'Den totale omsetningen i kroner' },
        ],
        correctId: 'b',
        explanation: 'Dekningsgraden viser andelen av salgsinntekten (ekskl. MVA) som er igjen etter at variable kostnader (kostpris) er trukket fra.',
      },
      {
        id: 'pc-3-3',
        question: 'En bedrift har DG på 30% og faste kostnader på 90 000 kr/mnd. Hvilken omsetning ekskl. MVA trenger de for å dekke de faste kostnadene?',
        choices: [
          { id: 'a', text: '270 000 kr' },
          { id: 'b', text: '300 000 kr' },
          { id: 'c', text: '27 000 kr' },
          { id: 'd', text: '130 000 kr' },
        ],
        correctId: 'b',
        explanation: 'Nødvendig omsetning = faste kostnader / DG% = 90 000 / 0,30 = 300 000 kr.',
      },
      {
        id: 'pc-3-4',
        question: 'Hva er dekningsbidraget hvis salgspris ekskl. MVA er 500 kr og kostpris er 200 kr?',
        choices: [
          { id: 'a', text: '100 kr' },
          { id: 'b', text: '200 kr' },
          { id: 'c', text: '300 kr' },
          { id: 'd', text: '500 kr' },
        ],
        correctId: 'c',
        explanation: 'Dekningsbidrag = Salgspris ekskl. MVA - Kostpris = 500 - 200 = 300 kr.',
      },
      {
        id: 'pc-3-5',
        question: 'Hva bør du gjøre hvis DG er lavere enn bedriftens faste kostnader krever?',
        choices: [
          { id: 'a', text: 'Øke antall ansatte' },
          { id: 'b', text: 'Øke salgsprisen eller redusere kostprisen' },
          { id: 'c', text: 'Selge mer på kreditt' },
          { id: 'd', text: 'Ignorere det — DG er ikke viktig' },
        ],
        correctId: 'b',
        explanation: 'Hvis DG er for lav, må du enten øke salgsprisen (høyere inntekt) eller redusere kostprisen (lavere variable kostnader).',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📈',
    title: 'Break-even analyse',
    quote: 'Break-even er punktet der du slutter å tape — men ennå ikke tjener',
    content: 'Break-even punktet forteller deg hvor mange enheter du må selge for at inntektene skal dekke alle kostnader (både variable og faste). Under break-even går du med underskudd; over break-even begynner du å tjene penger.',
    subpoints: [
      'Break-even (enheter) = Faste kostnader / Dekningsbidrag per enhet',
      'Break-even (omsetning) = Faste kostnader / DG%',
      'Under break-even: underskudd. Over break-even: overskudd',
      'Nyttig for å vurdere om forretningsideen er levedyktig',
    ],
    practical: 'Beregn break-even for din bedrift eller et tenkt produkt. Spør deg: er det realistisk å selge så mange enheter?',
    exercises: [
      {
        id: 'pc-4-1',
        question: 'Faste kostnader er 50 000 kr/mnd og dekningsbidrag per enhet er 250 kr. Hva er break-even antall enheter?',
        choices: [
          { id: 'a', text: '100 enheter' },
          { id: 'b', text: '150 enheter' },
          { id: 'c', text: '200 enheter' },
          { id: 'd', text: '250 enheter' },
        ],
        correctId: 'c',
        explanation: 'Break-even = 50 000 / 250 = 200 enheter per måned.',
      },
      {
        id: 'pc-4-2',
        question: 'Hva skjer med break-even punktet hvis faste kostnader øker?',
        choices: [
          { id: 'a', text: 'Break-even synker — du trenger færre salg' },
          { id: 'b', text: 'Break-even øker — du trenger flere salg' },
          { id: 'c', text: 'Break-even er upåvirket av faste kostnader' },
          { id: 'd', text: 'Break-even halveres' },
        ],
        correctId: 'b',
        explanation: 'Høyere faste kostnader betyr at du trenger større omsetning for å dekke dem — break-even punktet stiger.',
      },
      {
        id: 'pc-4-3',
        question: 'Hva betyr det å "passere break-even"?',
        choices: [
          { id: 'a', text: 'Du har brukt opp all kapital' },
          { id: 'b', text: 'Du har solgt mer enn du kan produsere' },
          { id: 'c', text: 'Inntektene dine overstiger alle kostnader — du begynner å tjene' },
          { id: 'd', text: 'Du har nådd maksimal kapasitet' },
        ],
        correctId: 'c',
        explanation: 'Å passere break-even betyr at alle kostnader er dekket. Hvert ekstra salg gir nå ren fortjeneste.',
      },
      {
        id: 'pc-4-4',
        question: 'En kafe har faste kostnader på 80 000 kr/mnd og DG på 40%. Hva er break-even omsetning?',
        choices: [
          { id: 'a', text: '32 000 kr' },
          { id: 'b', text: '120 000 kr' },
          { id: 'c', text: '200 000 kr' },
          { id: 'd', text: '160 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Break-even omsetning = 80 000 / 0,40 = 200 000 kr per måned.',
      },
      {
        id: 'pc-4-5',
        question: 'Hva kan du gjøre for å senke break-even punktet ditt?',
        choices: [
          { id: 'a', text: 'Øke de faste kostnadene' },
          { id: 'b', text: 'Redusere salgsprisene' },
          { id: 'c', text: 'Redusere faste kostnader eller øke dekningsbidraget' },
          { id: 'd', text: 'Ansette flere selgere' },
        ],
        correctId: 'c',
        explanation: 'Break-even senkes ved å redusere faste kostnader (teller) eller øke dekningsbidraget per enhet (nevner).',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🎯',
    title: 'Konkurransebasert prissetting',
    quote: 'Din pris sender et signal — om kvalitet, posisjonering og målgruppe',
    content: 'Prissetting handler ikke bare om kostnader — det handler om strategi. Prisen kommuniserer hvem du er, hvem du selger til, og hva kundene kan forvente. Det finnes tre hovedstrategier: prisledelse, følgerstrategi og premiumprisstrategi.',
    subpoints: [
      'Prisleder: lavere enn konkurrentene (eks. Rema 1000, Prisjakt)',
      'Prisfølger: omtrent samme pris som markedet',
      'Premiumprising: høyere pris = signal om høy kvalitet (eks. Apple)',
      'Lav pris signaliserer ikke alltid "godt kjøp" — kan oppfattes som dårlig kvalitet',
    ],
    practical: 'Sjekk konkurrentenes priser på ett av dine produkter. Bestem bevisst hvilken strategi du vil bruke — og hvorfor.',
    exercises: [
      {
        id: 'pc-5-1',
        question: 'Et selskap setter prisen sin lavere enn alle konkurrenter for å tiltrekke flest mulig kunder. Dette kalles:',
        choices: [
          { id: 'a', text: 'Premiumprising' },
          { id: 'b', text: 'Prisfølgerstrategi' },
          { id: 'c', text: 'Prislederstrategi' },
          { id: 'd', text: 'Kostplusprising' },
        ],
        correctId: 'c',
        explanation: 'Prislederstrategi innebærer å sette lavere pris enn konkurrentene for å vinne markedsandeler. Eks: Rema 1000.',
      },
      {
        id: 'pc-5-2',
        question: 'Apple setter høyere pris på iPhone enn konkurrentene. Hva signaliserer dette til kundene?',
        choices: [
          { id: 'a', text: 'At produktet er dyrt å produsere' },
          { id: 'b', text: 'At selskapet er grådig' },
          { id: 'c', text: 'Høy kvalitet, prestisje og eksklusivitet' },
          { id: 'd', text: 'At de mangler kunder' },
        ],
        correctId: 'c',
        explanation: 'Premiumprising sender et signal om høy kvalitet og eksklusivitet. Mange kunder er villige til å betale mer for det de oppfatter som bedre.',
      },
      {
        id: 'pc-5-3',
        question: 'Hva er risikoen ved å sette prisen for lavt for å tiltrekke kunder?',
        choices: [
          { id: 'a', text: 'For mange kunder — du kan ikke håndtere dem alle' },
          { id: 'b', text: 'Det signaliserer dårlig kvalitet og kan være uholdbart' },
          { id: 'c', text: 'Konkurrentene vil kopiere prisen din' },
          { id: 'd', text: 'Du betaler for mye MVA' },
        ],
        correctId: 'b',
        explanation: 'For lav pris kan signalisere dårlig kvalitet og gi negative assosiasjoner. I tillegg kan det være umulig å drive lønnsomt over tid.',
      },
      {
        id: 'pc-5-4',
        question: 'En ny kafé setter prisene på lik linje med andre kafeer i området. Dette er eksempel på:',
        choices: [
          { id: 'a', text: 'Prislederstrategi' },
          { id: 'b', text: 'Prisfølgerstrategi' },
          { id: 'c', text: 'Premiumprising' },
          { id: 'd', text: 'Break-even prising' },
        ],
        correctId: 'b',
        explanation: 'Prisfølgerstrategi innebærer å sette priser på omtrent samme nivå som konkurrentene. Trygt valg, men gir heller ingen prisfordel.',
      },
      {
        id: 'pc-5-5',
        question: 'Hva menes med at "pris er kommunikasjon"?',
        choices: [
          { id: 'a', text: 'Du må annonsere prisen din' },
          { id: 'b', text: 'Prisen formidler informasjon om kvalitet, målgruppe og posisjonering' },
          { id: 'c', text: 'Du bør alltid diskutere pris med kunden' },
          { id: 'd', text: 'Prisen må stå tydelig på etiketten' },
        ],
        correctId: 'b',
        explanation: 'Prisen sender signaler til markedet om hvem produktet er for, hvilken kvalitet det har, og hvordan bedriften posisjonerer seg.',
      },
    ],
  },
]

export default function PricingCalculatorModule() {
  return (
    <DrawerModule
      moduleCode="FD2"
      moduleTitle="Prissetting og kalkylasjon"
      moduleIcon="🧮"
      storageKey="learning-pricing-calculator"
      completeRoute="/learning/forretningsdrift/pricing-calculator/complete"
      phases={phases}
      intro="Prissetting er mer enn å legge til et påslag. Du må forstå alle kostnader, MVA, og hva markedet er villig til å betale."
      vissteduAt="En prisøkning på 1% kan øke profitten med opptil 11% — det er kraftigere enn å kutte kostnader."
      espenSier="Mange nybegynnere priser for lavt for å tiltrekke kunder. Men for lav pris signaliserer dårlig kvalitet — og er uholdbart på sikt."
      presentationLink={{ route: '/learning/presentations/prissetting', description: 'Prissetting — en visuell gjennomgang av prisstrategier' }}
    />
  )
}
