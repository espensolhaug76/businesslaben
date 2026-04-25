import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📊',
    title: 'Resultatregnskap — struktur og logikk',
    quote: 'Resultatregnskapet forteller deg om bedriften tjener penger. Ingenting annet gjør det like tydelig.',
    content: 'Resultatregnskapet viser alle inntekter og kostnader i en periode, og avsluttes med årsresultatet. Logikken er sekvensiell: Omsetning minus Varekostnad gir Bruttofortjeneste, deretter trekkes Driftskostnader for å gi Driftsresultat, og til slutt Finanskostnader gir Årsresultat.',
    subpoints: [
      'OMSETNING: Total salgsinntekt i perioden — topplinjen alt annet måles mot',
      'BRUTTOFORTJENESTE: Omsetning minus varekostnad (Peak Performance AS: 50% bruttomargin)',
      'DRIFTSRESULTAT (EBIT): Resultat fra selve driften, før finanskostnader',
      'ÅRSRESULTAT: Bunnlinjen etter alle kostnader og skatt',
    ],
    practical: 'Finn resultatregnskapet til en lokal bedrift på Proff.no og prøv å beregne bruttomargin og driftsmargin. Sammenlign med bransjegjennomsnittet.',
    glossaryTerm: 'Resultatregnskap',
    exercises: [
      {
        id: 'ra-1-1',
        question: 'Hva viser resultatregnskapet?',
        choices: [
          { id: 'a', text: 'Hva bedriften eier og skylder' },
          { id: 'b', text: 'Inntekter og kostnader i en periode — og om bedriften tjener penger' },
          { id: 'c', text: 'Kun bedriftens omsetning' },
          { id: 'd', text: 'Bedriftens kontantbeholdning' },
        ],
        correctId: 'b',
        explanation: 'Resultatregnskapet viser alle inntekter og kostnader i en periode og avsluttes med årsresultatet (overskudd eller underskudd).',
      },
      {
        id: 'ra-1-2',
        question: 'Peak Performance AS har 4 200 000 kr i omsetning og 2 100 000 kr i varekostnad. Hva er bruttofortjenesten?',
        choices: [
          { id: 'a', text: '1 000 000 kr' },
          { id: 'b', text: '1 500 000 kr' },
          { id: 'c', text: '2 100 000 kr' },
          { id: 'd', text: '6 300 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Bruttofortjeneste = Omsetning - Varekostnad = 4 200 000 - 2 100 000 = 2 100 000 kr. Dette gir 50% bruttomargin.',
      },
      {
        id: 'ra-1-3',
        question: 'Hva er EBIT?',
        choices: [
          { id: 'a', text: 'Earnings Before Interest and Tax — driftsresultat' },
          { id: 'b', text: 'En type skatt i Norge' },
          { id: 'c', text: 'Årsresultatet etter skatt' },
          { id: 'd', text: 'Total omsetning' },
        ],
        correctId: 'a',
        explanation: 'EBIT = Earnings Before Interest and Tax, tilsvarer driftsresultatet. Det viser resultatet fra selve driften, uavhengig av finansieringsstruktur.',
      },
      {
        id: 'ra-1-4',
        question: 'Hva skjer med egenkapitalen når bedriften har positivt årsresultat?',
        choices: [
          { id: 'a', text: 'Egenkapitalen reduseres' },
          { id: 'b', text: 'Egenkapitalen øker' },
          { id: 'c', text: 'Egenkapitalen er upåvirket' },
          { id: 'd', text: 'Gjelden øker' },
        ],
        correctId: 'b',
        explanation: 'Positivt årsresultat øker egenkapitalen. Negativt årsresultat tærer på egenkapitalen.',
      },
      {
        id: 'ra-1-5',
        question: 'Hva forteller varekostnaden i resultatregnskapet om bedriften?',
        choices: [
          { id: 'a', text: 'Ingenting av interesse' },
          { id: 'b', text: 'Om innkjøpsprisen er konkurransedyktig og effektiviteten i innkjøp' },
          { id: 'c', text: 'Kun hvor mange varer som er solgt' },
          { id: 'd', text: 'Bedriftens lånegrad' },
        ],
        correctId: 'b',
        explanation: 'Varekostnaden avslører om innkjøpsprisen er konkurransedyktig — høy varekostnad relativt til omsetning indikerer dårlig innkjøpsavtaler.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '⚖️',
    title: 'Balansen — eiendeler, gjeld og egenkapital',
    quote: 'Balansen er et øyeblikksbilde av bedriftens finansielle helse — som et legejournalopptak på ett bestemt tidspunkt.',
    content: 'Balansen viser hva bedriften eier (eiendeler) og hvordan det er finansiert (gjeld og egenkapital). Regnskapsligningen er alltid sann: Eiendeler = Gjeld + Egenkapital.',
    subpoints: [
      'ANLEGGSMIDLER: Varige driftsmidler ikke beregnet på salg — bygninger, maskiner, varemerker',
      'OMLØPSMIDLER: Varelager, kundefordringer og bankinnskudd som sirkulerer i driften',
      'EGENKAPITAL: Det eierne har skutt inn pluss opparbeidet overskudd minus utbytter',
      'Kortsiktig gjeld: forfaller innen ett år. Langsiktig gjeld: løpetid over ett år',
    ],
    practical: 'Tegn opp T-kontoer med Peak Performance-tallene: alle eiendeler på venstre side, gjeld + egenkapital på høyre. Sjekk at begge sider er like.',
    glossaryTerm: 'Balanse (Balanseregnskap)',
    exercises: [
      {
        id: 'ra-2-1',
        question: 'Hva er den fundamentale regnskapsligningen?',
        choices: [
          { id: 'a', text: 'Inntekter = Kostnader + Resultat' },
          { id: 'b', text: 'Eiendeler = Gjeld + Egenkapital' },
          { id: 'c', text: 'Omsetning = Varekostnad + Bruttofortjeneste' },
          { id: 'd', text: 'Likviditet = Omløpsmidler - Kortsiktig gjeld' },
        ],
        correctId: 'b',
        explanation: 'Regnskapsligningen Eiendeler = Gjeld + Egenkapital er alltid sann — balansen balanserer alltid.',
      },
      {
        id: 'ra-2-2',
        question: 'Hva er eksempler på anleggsmidler?',
        choices: [
          { id: 'a', text: 'Varelager og bankinnskudd' },
          { id: 'b', text: 'Kundefordringer og kontanter' },
          { id: 'c', text: 'Bygninger, maskiner og varemerkeverdier' },
          { id: 'd', text: 'Leverandørgjeld og kassakreditt' },
        ],
        correctId: 'c',
        explanation: 'Anleggsmidler er varige eiendeler som ikke er beregnet for salg: bygninger, maskiner, IT-utstyr og immaterielle eiendeler som varemerker.',
      },
      {
        id: 'ra-2-3',
        question: 'Peak Performance AS har egenkapital på 800 000 kr og totalkapital på 2 400 000 kr. Hva er gjelden?',
        choices: [
          { id: 'a', text: '800 000 kr' },
          { id: 'b', text: '1 600 000 kr' },
          { id: 'c', text: '2 400 000 kr' },
          { id: 'd', text: '3 200 000 kr' },
        ],
        correctId: 'b',
        explanation: 'Gjeld = Totalkapital - Egenkapital = 2 400 000 - 800 000 = 1 600 000 kr.',
      },
      {
        id: 'ra-2-4',
        question: 'Hva er omløpsmidler?',
        choices: [
          { id: 'a', text: 'Eiendeler som ikke kan selges' },
          { id: 'b', text: 'Varelager, kundefordringer og bankinnskudd som sirkulerer i driften' },
          { id: 'c', text: 'Langsiktige investeringer' },
          { id: 'd', text: 'Leverandørgjeld og skattetrekk' },
        ],
        correctId: 'b',
        explanation: 'Omløpsmidler er de delene av eiendelene som "omsettes" i daglig drift: varelager, utestående fakturaer fra kunder og bankinnskudd.',
      },
      {
        id: 'ra-2-5',
        question: 'Hva betyr det at egenkapitalen er negativ?',
        choices: [
          { id: 'a', text: 'Bedriften tjener ikke nok penger' },
          { id: 'b', text: 'Gjelden overstiger eiendelene — teknisk insolvent' },
          { id: 'c', text: 'Bedriften har ingen ansatte' },
          { id: 'd', text: 'Det er normalt for nye bedrifter' },
        ],
        correctId: 'b',
        explanation: 'Negativ egenkapital betyr at gjelden er større enn eiendelene. Bedriften er teknisk insolvent og kan i mange tilfeller ikke fortsette driften.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💧',
    title: 'Nøkkeltall: likviditetsgrad 1 og 2',
    quote: 'Du kan ikke betale leverandørene med bokført overskudd — du betaler med penger på konto.',
    content: 'Likviditetsgrad (LG) måler bedriftens evne til å betale kortsiktige forpliktelser. LG1 inkluderer varelageret; LG2 er strengere og ekskluderer det, siden varelager kan ta tid å gjøre om til kontanter.',
    subpoints: [
      'LG1 = Omløpsmidler / Kortsiktig gjeld. Bør være ≥ 2',
      'LG2 = (Omløpsmidler − Varelager) / Kortsiktig gjeld. Bør være ≥ 1',
      'Peak Performance: omløpsmidler 920 000, varelager 600 000, kortsiktig gjeld 400 000',
      'LG1 = 920 000 / 400 000 = 2,3 (OK). LG2 = 320 000 / 400 000 = 0,8 (under grensen)',
    ],
    practical: 'Beregn LG1 og LG2 for Peak Performance. Hva sier resultatene om bedriftens betalingsevne?',
    glossaryTerm: 'Likviditetsgrad',
    exercises: [
      {
        id: 'ra-3-1',
        question: 'Hva er Likviditetsgrad 1 (LG1)?',
        choices: [
          { id: 'a', text: 'Egenkapital delt på gjeld' },
          { id: 'b', text: 'Omløpsmidler delt på kortsiktig gjeld' },
          { id: 'c', text: 'Omsetning delt på kostnader' },
          { id: 'd', text: 'Kontanter delt på totalkapital' },
        ],
        correctId: 'b',
        explanation: 'LG1 = Omløpsmidler / Kortsiktig gjeld. Måler evnen til å betale kortsiktig gjeld med omløpsmidler.',
      },
      {
        id: 'ra-3-2',
        question: 'Hva er den anbefalte minsteverdien for LG1?',
        choices: [
          { id: 'a', text: '0,5' },
          { id: 'b', text: '1,0' },
          { id: 'c', text: '2,0' },
          { id: 'd', text: '5,0' },
        ],
        correctId: 'c',
        explanation: 'LG1 bør være minst 2 — det betyr at omløpsmidlene er dobbelt så store som kortsiktig gjeld, noe som gir god buffer.',
      },
      {
        id: 'ra-3-3',
        question: 'Hvorfor er LG2 et strengere mål enn LG1?',
        choices: [
          { id: 'a', text: 'Fordi den inkluderer langsiktig gjeld' },
          { id: 'b', text: 'Fordi varelager ekskluderes — det kan ta tid å gjøre om til kontanter' },
          { id: 'c', text: 'Fordi den inkluderer anleggsmidler' },
          { id: 'd', text: 'Det er ikke et strengere mål' },
        ],
        correctId: 'b',
        explanation: 'LG2 ekskluderer varelageret fra telleren, siden varelager ikke alltid kan realiseres raskt. LG2 viser mer umiddelbar betalingsevne.',
      },
      {
        id: 'ra-3-4',
        question: 'Peak Performance har omløpsmidler 920 000, varelager 600 000, kortsiktig gjeld 400 000. Hva er LG2?',
        choices: [
          { id: 'a', text: '2,3' },
          { id: 'b', text: '1,5' },
          { id: 'c', text: '0,8' },
          { id: 'd', text: '0,5' },
        ],
        correctId: 'c',
        explanation: 'LG2 = (920 000 - 600 000) / 400 000 = 320 000 / 400 000 = 0,8. Under anbefalt grense på 1.',
      },
      {
        id: 'ra-3-5',
        question: 'En bedrift har god lønnsomhet men lav LG2. Hva er risikoen?',
        choices: [
          { id: 'a', text: 'Ingen risiko — lønnsomhet er det eneste som teller' },
          { id: 'b', text: 'De kan slite med å betale lønn og leverandørfakturaer når de forfaller' },
          { id: 'c', text: 'De betaler for mye skatt' },
          { id: 'd', text: 'Bedriften er overvurdert' },
        ],
        correctId: 'b',
        explanation: 'Lav LG2 betyr at bedriften kan mangle kontanter til kortsiktige forpliktelser selv med godt årsresultat — klassisk likviditetsproblem.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🏗️',
    title: 'Soliditet og rentabilitet',
    quote: 'Soliditet er bedriftens finansielle ryggrad — jo sterkere den er, desto bedre tåler bedriften storm.',
    content: 'Soliditet måler egenkapitalens andel av totalkapitalen. Rentabilitet måler avkastningen på investert kapital. Begge gir viktig informasjon om bedriftens finansielle styrke og lønnsomhet.',
    subpoints: [
      'Soliditet = Egenkapital / Totalkapital × 100. Bør være ≥ 30%',
      'Peak Performance: 800 000 / 2 400 000 × 100 = 33,3%',
      'Totalkapitalrentabilitet (TKR) = Driftsresultat / Gj.sn. totalkapital × 100',
      'Egenkapitalrentabilitet (EKR) = Årsresultat / Egenkapital × 100',
    ],
    practical: 'Sammenlign Peak Performance med en konkurrent på Proff.no — hvem er mest solid? Hvem er mest rentabel?',
    glossaryTerm: 'Soliditet',
    exercises: [
      {
        id: 'ra-4-1',
        question: 'Hva måler soliditet?',
        choices: [
          { id: 'a', text: 'Bedriftens evne til å betale kortsiktig gjeld' },
          { id: 'b', text: 'Egenkapitalens andel av totalkapitalen' },
          { id: 'c', text: 'Lønnsomheten per solgt enhet' },
          { id: 'd', text: 'Omsetningens vekstrate' },
        ],
        correctId: 'b',
        explanation: 'Soliditet = Egenkapital / Totalkapital × 100. Høy soliditet betyr at mye av kapitalen er finansiert med egenkapital, noe som gir finansiell motstandskraft.',
      },
      {
        id: 'ra-4-2',
        question: 'Peak Performance har egenkapital 800 000 og totalkapital 2 400 000. Hva er soliditeten?',
        choices: [
          { id: 'a', text: '20%' },
          { id: 'b', text: '25%' },
          { id: 'c', text: '33,3%' },
          { id: 'd', text: '50%' },
        ],
        correctId: 'c',
        explanation: 'Soliditet = 800 000 / 2 400 000 × 100 = 33,3%.',
      },
      {
        id: 'ra-4-3',
        question: 'Hva forteller totalkapitalrentabilitet (TKR)?',
        choices: [
          { id: 'a', text: 'Hva eierne tjener på sin investering' },
          { id: 'b', text: 'Om selve driften er lønnsom nok til å forrente all investert kapital' },
          { id: 'c', text: 'Bedriftens likviditetsposisjon' },
          { id: 'd', text: 'Gjeldssituasjonen til bedriften' },
        ],
        correctId: 'b',
        explanation: 'TKR viser om driften er lønnsom nok til å forrente all kapital (egenkapital + gjeld) som er bundet i virksomheten.',
      },
      {
        id: 'ra-4-4',
        question: 'Hva er minimumsanbefaling for soliditet?',
        choices: [
          { id: 'a', text: '5%' },
          { id: 'b', text: '15%' },
          { id: 'c', text: '30%' },
          { id: 'd', text: '70%' },
        ],
        correctId: 'c',
        explanation: 'Soliditet bør være minst 30% for å ha akseptabel finansiell motstandskraft. Under 20% regnes som svak soliditet.',
      },
      {
        id: 'ra-4-5',
        question: 'En bedrift har 45% soliditet men lavere EKR enn en konkurrent med 30% soliditet. Hva betyr dette?',
        choices: [
          { id: 'a', text: 'Bedriften med 45% er alltid bedre å investere i' },
          { id: 'b', text: 'Bedriften med 45% er tryggere men gir eierne lavere avkastning' },
          { id: 'c', text: 'Det er ingen sammenheng mellom soliditet og EKR' },
          { id: 'd', text: 'EKR er irrelevant' },
        ],
        correctId: 'b',
        explanation: 'Høy soliditet = lav gearing = mer trygghet, men ofte lavere egenkapitalavkastning. Det er en bevisst avveining mellom risiko og avkastning.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📐',
    title: 'Budsjettering og avviksanalyse',
    quote: 'Et budsjett uten avviksanalyse er som et kart du aldri sjekker mens du kjører.',
    content: 'Et budsjett er en plan, ikke en spådom. Avviksanalyse handler om å sammenligne faktiske tall med budsjetterte, forstå årsaken, og iverksette riktige tiltak.',
    subpoints: [
      'Avvik = Faktisk − Budsjett (positivt avvik på inntekter er bra)',
      'Peak Performance: budsjettert 4 000 000, faktisk 4 200 000 = +200 000 kr (5%)',
      'Årsaksanalyse: skyldes avviket høyere pris, volum, eller bedre produktmix?',
      'Rullerende budsjett: oppdateres kvartalsvis for mer realistisk styring',
    ],
    practical: 'Beregn avviksprosenten for Peak Performance og diskuter tre mulige årsaker til avviket.',
    glossaryTerm: 'Dekningsbidrag',
    exercises: [
      {
        id: 'ra-5-1',
        question: 'Peak Performance budsjetterte 4 000 000 kr men oppnådde 4 200 000 kr. Hva er avviket?',
        choices: [
          { id: 'a', text: '-200 000 kr (negativt)' },
          { id: 'b', text: '+200 000 kr (positivt)' },
          { id: 'c', text: '0 kr' },
          { id: 'd', text: '+800 000 kr' },
        ],
        correctId: 'b',
        explanation: 'Avvik = Faktisk - Budsjett = 4 200 000 - 4 000 000 = +200 000 kr. Positivt avvik på inntekter er bra.',
      },
      {
        id: 'ra-5-2',
        question: 'Hva betyr et positivt avvik på kostnader?',
        choices: [
          { id: 'a', text: 'Kostnadene var lavere enn budsjettert — bra for bedriften' },
          { id: 'b', text: 'Kostnadene var høyere enn budsjettert — dårlig for bedriften' },
          { id: 'c', text: 'Kostnadene er akkurat som planlagt' },
          { id: 'd', text: 'Positivt avvik er alltid bra' },
        ],
        correctId: 'b',
        explanation: 'For kostnader betyr positivt avvik (faktisk > budsjett) at kostnadene oversteg planen — dette er negativt for resultatet.',
      },
      {
        id: 'ra-5-3',
        question: 'Hva er en prismix-analyse?',
        choices: [
          { id: 'a', text: 'En analyse av konkurrentenes priser' },
          { id: 'b', text: 'En undersøkelse av om avvik skyldes høyere pris, volum eller produktmix' },
          { id: 'c', text: 'En beregning av MVA' },
          { id: 'd', text: 'En markedsundersøkelse' },
        ],
        correctId: 'b',
        explanation: 'Prismix-analyse undersøker om et omsetningsavvik skyldes at prisene ble hevet, at man solgte mer volum, eller at mix av produkter endret seg.',
      },
      {
        id: 'ra-5-4',
        question: 'Hva er et rullerende budsjett?',
        choices: [
          { id: 'a', text: 'Et budsjett som aldri endres' },
          { id: 'b', text: 'Et budsjett som oppdateres kvartalsvis med reviderte forventninger' },
          { id: 'c', text: 'Et budsjett laget av revisor' },
          { id: 'd', text: 'Et budsjett kun for varukostnader' },
        ],
        correctId: 'b',
        explanation: 'Rullerende budsjett oppdateres løpende (typisk kvartalsvis) og gir et mer realistisk styringsverktøy enn ett statisk årsbudsjett.',
      },
      {
        id: 'ra-5-5',
        question: 'Hva bør være neste steg etter at et negativt avvik er identifisert?',
        choices: [
          { id: 'a', text: 'Endre budsjettet slik at avviket forsvinner' },
          { id: 'b', text: 'Analysere årsaken og iverksette konkrete tiltak' },
          { id: 'c', text: 'Ignorere det og vente til neste kvartal' },
          { id: 'd', text: 'Si opp ansatte umiddelbart' },
        ],
        correctId: 'b',
        explanation: 'Avvik er informasjon — målet er å forstå årsaken og iverksette riktige tiltak. Uten analyse gjentar feilen seg.',
      },
    ],
  },
]

export default function RegnskapsanalyseModule() {
  return (
    <DrawerModule
      moduleCode="FD-VG2-3"
      moduleTitle="Regnskapsanalyse"
      moduleIcon="📈"
      storageKey="learning-vg2-regnskapsanalyse"
      completeRoute="/learning/vg2/okonomi/regnskapsanalyse/complete"
      phases={phases}
      intro="Regnskapet er bedriftens språk — det forteller historien om hva som skjedde, og gir grunnlag for å forutsi hva som vil skje. Å lese et regnskap er en grunnleggende ferdighet for alle som tar forretningsmessige beslutninger."
      vissteduAt="Manglende likviditet — ikke mangel på lønnsomhet — er den vanligste årsaken til at norske SMB-er går konkurs. Mange hadde positivt driftsresultat helt frem til de gikk under."
      espenSier="Regnskapsanalyse virker tørt til å begynne med, men etter hvert lærer du å lese tallene som en historie. Jeg ser ikke bare tall — jeg ser beslutninger, risikoer og muligheter."
      presentationLink={{ route: '/learning/presentations/regnskap', description: 'Regnskap — en visuell gjennomgang av nøkkeltall og regnskapsanalyse' }}
    />
  )
}
