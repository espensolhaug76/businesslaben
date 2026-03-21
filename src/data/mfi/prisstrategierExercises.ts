import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '💰 Pris er ikke bare et tall — det er et signal om verdi, kvalitet og hvem produktet er for!'

export const PRISSTRATEGIER_EXERCISES: QuizExercise[] = [
  {
    id: 'ps-01',
    icon: '🏗️',
    title: 'Kostbasert vs verdibasert prising',
    context:
      'Rema 1000 selger sin egne-merkevare kaffe til 39 kr. Starbucks selger en kaffe latte til 75 kr. Produksjonskostnaden for en kopp kaffe er omtrent 3–5 kr uansett.',
    question: 'Hvilken prisstrategi bruker henholdsvis Rema 1000 og Starbucks?',
    choices: [
      {
        id: 'a',
        label: 'Begge bruker kostbasert prising — prisen settes lik produksjonskostnad pluss påslag.',
        isCorrect: false,
        feedback:
          'Feil. Kostbasert prising er en mulig forklaring for Rema 1000, men ikke for Starbucks. 75 kr for en kaffe som koster 4 kr å produsere er ikke kostnadsbasert — det er verdibasert prising basert på opplevd merkevarestatus.',
      },
      {
        id: 'b',
        label: 'Rema 1000 bruker kostbasert/markedsbasert prising; Starbucks bruker verdibasert prising basert på merkeopplevelse.',
        isCorrect: true,
        feedback:
          'Riktig! Rema 1000 setter lav pris basert på kostnad og konkurranse for å tiltrekke prisbeviste kunder. Starbucks setter prisen basert på den opplevde verdien av merket, atmosfæren og den sosiale signalverdien — ikke kostnaden. Dette er kjerneforskjellen mellom de to prisingstrategiene.',
      },
      {
        id: 'c',
        label: 'Rema 1000 bruker penetrasjonsprising; Starbucks bruker skumming-strategi.',
        isCorrect: false,
        feedback:
          'Feil. Penetrasjonsprising brukes typisk ved lansering av et nytt produkt for å bygge markedsandel raskt. Skumming brukes for å ta høy pris i lanseringsfasen og senke den gradvis. Ingen av disse er den primære strategien for kaffe her.',
      },
      {
        id: 'd',
        label: 'Starbucks bruker kostbasert prising fordi de har høyere husleie og lønnskostnader.',
        isCorrect: false,
        feedback:
          'Feil. Selv om Starbucks har høyere driftskosnader, er det ikke kostnadene som primært forklarer prisforskjellen. En kopp Starbucks-kaffe sett bort fra merket ville ikke vært verdt 75 kr basert på kostnad alene. Det er merkeidentiteten og opplevelsen som rettferdiggjør prisen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'ps-02',
    icon: '🚗',
    title: 'Skumming vs penetrasjonsprising',
    context:
      'Tesla lanserte Cybertruck til høy pris (startpris ca. 500 000 kr i Norge). Dacia Sandero lanseres alltid til lavest mulig pris (fra ca. 180 000 kr) med mål om å bli Europas billigste nye bil.',
    question: 'Hva er den korrekte betegnelsen på Tesla og Dacias prisstrategi?',
    choices: [
      {
        id: 'a',
        label: 'Tesla bruker penetrasjonsprising; Dacia bruker skumming-strategi.',
        isCorrect: false,
        feedback:
          'Feil. Du har byttet om. Penetrasjonsprising = lav pris for å ta markedsandel raskt. Skumming = høy pris for å ta betalingsvillige kunder først. Tesla starter høyt, Dacia starter lavt.',
      },
      {
        id: 'b',
        label: 'Tesla bruker skumming-strategi (høy startpris); Dacia bruker penetrasjonsprising (lav pris for å nå bredt).',
        isCorrect: true,
        feedback:
          'Riktig! Skumming innebærer å sette høy pris i starten og senke den over tid for å "skumme" de mest prissensitivt-tolerante kundene. Tesla gjør dette med alle modeller. Dacia bruker penetrasjonsprising: lav pris fra dag én for å vinne markedsandel fra etablerte merker og nå prisbeviste kunder.',
      },
      {
        id: 'c',
        label: 'Begge bruker verdibasert prising fordi begge har sterke merkevarer.',
        isCorrect: false,
        feedback:
          'Feil. Selv om begge merker har en form for verdibasert vurdering, er de overordnede prisstrategiene fundamentalt forskjellige: Tesla starter høyt og senker, Dacia starter lavt. Dette er skumming vs penetrasjon.',
      },
      {
        id: 'd',
        label: 'Tesla bruker premium-prising; Dacia bruker lavkost-prising. Skumming og penetrasjon er ikke relevante begreper her.',
        isCorrect: false,
        feedback:
          'Feil. Premium-prising og lavkost-prising er beskrivende, men ikke de presise fagbegrepene. Skumming og penetrasjonsprising er akkurat de riktige begrepene for disse to strategiene.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'ps-03',
    icon: '🧠',
    title: 'Psykologisk prising',
    context:
      'Rema 1000 tester to priser for samme pasta: 19,90 kr og 20 kr. Forskning viser at 87% av kunder velger alternativet til 19,90 kr selv om forskjellen er 10 øre.',
    question: 'Hva er den psykologiske mekanismen bak "charm pricing" (å sette priser som ender på ,90 eller ,99)?',
    choices: [
      {
        id: 'a',
        label: 'Kunder beregner alltid nøyaktig totalsum og 10 øre utgjør en reell forskjell over tid.',
        isCorrect: false,
        feedback:
          'Feil. Kunder beregner ikke nøyaktig summer i butikk. 10 øre er negligibelt og utgjør ingen reell forskjell i totalsum. Den psykologiske mekanismen er ikke rasjonell beregning.',
      },
      {
        id: 'b',
        label: 'Hjernen leser tall fra venstre mot høyre og registrerer "19" som vesentlig lavere enn "20" — selv om forskjellen er minimal.',
        isCorrect: true,
        feedback:
          'Riktig! Dette kalles "left-digit anchoring". Hjernen prosesserer det første sifferet først og kategoriserer 19,90 som "et tiall" (billig) og 20,00 som "et tyvetall" (dyrere). Denne kognitive snarveien er veldokumentert og brukes globalt av alle store dagligvarekjeder.',
      },
      {
        id: 'c',
        label: 'Kunder forventer alltid øredeling og reagerer negativt på runde tall fordi det virker for enkelt.',
        isCorrect: false,
        feedback:
          'Feil. Noen kunder foretrekker faktisk runde tall fordi de er lettere å huske og summere. Charm pricing er effektivt i mange sammenhenger, men det er ikke fordi runde tall virker mistenkelige.',
      },
      {
        id: 'd',
        label: 'Butikker tjener mer på ,90-priser fordi de kan ta inn mer vekslepenger.',
        isCorrect: false,
        feedback:
          'Feil. Vekslepenger er ikke årsaken til charm pricing. I en digital betaling-epoke er dette heller ikke relevant. Årsaken er ren kognitiv psykologi: venstre-sifre-forankring.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'ps-04',
    icon: '📊',
    title: 'Dekningsbidrag og break-even',
    context:
      'En bedrift selger et produkt til 200 kr. Variable kostnader per enhet er 80 kr. Faste kostnader per måned er 36 000 kr.',
    question: 'Hvor mange enheter må bedriften selge per måned for å nå break-even (dekke alle kostnader)?',
    choices: [
      {
        id: 'a',
        label: '180 enheter',
        isCorrect: false,
        feedback:
          'Feil. Dekningsbidrag per enhet = 200 kr − 80 kr = 120 kr. Break-even = 36 000 ÷ 120 = 300 enheter. 180 enheter gir kun 21 600 kr i dekningsbidrag — ikke nok til å dekke de faste kostnadene på 36 000 kr.',
      },
      {
        id: 'b',
        label: '300 enheter',
        isCorrect: true,
        feedback:
          'Riktig! Dekningsbidrag per enhet = Salgspris − Variable kostnader = 200 − 80 = 120 kr. Break-even-punkt = Faste kostnader ÷ Dekningsbidrag = 36 000 ÷ 120 = 300 enheter. Ved 300 enheter dekker dekningsbidraget nøyaktig de faste kostnadene.',
      },
      {
        id: 'c',
        label: '450 enheter',
        isCorrect: false,
        feedback:
          'Feil. 450 enheter × 120 kr = 54 000 kr i dekningsbidrag. Det er 18 000 kr mer enn de faste kostnadene — bedriften ville hatt 18 000 kr i overskudd. Break-even er lavere enn 450 enheter.',
      },
      {
        id: 'd',
        label: '200 enheter',
        isCorrect: false,
        feedback:
          'Feil. 200 enheter × 120 kr = 24 000 kr i dekningsbidrag. De faste kostnadene er 36 000 kr, så bedriften vil ha 12 000 kr i underskudd ved 200 enheter. Break-even krever 300 enheter.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'ps-05',
    icon: '⚔️',
    title: 'Priser og konkurrenter',
    context:
      'En ny dagligvarekjede lanserer seg i Norge med priser 15% under Rema 1000 og KIWI. Rema 1000 svarer med å senke priser på 200 utvalgte varer. KIWI gjør det samme neste dag.',
    question: 'Hva er det største problemet med en priskrig der alle aktører senker priser for å matche hverandre?',
    choices: [
      {
        id: 'a',
        label: 'Priskrig er ulovlig i norsk konkurranselovgivning.',
        isCorrect: false,
        feedback:
          'Feil. Priskrig (aktører som konkurrerer på pris) er lovlig og er et tegn på virksom konkurranse. Det som er ulovlig er prissamarbeid (at konkurrenter avtaler å IKKE senke prisene). Priskrig er faktisk bra for forbrukerne på kort sikt.',
      },
      {
        id: 'b',
        label: 'Priskrig ødelegger marginene til alle aktører og presser svakere konkurrenter ut av markedet, uten å bygge lojalitet.',
        isCorrect: true,
        feedback:
          'Riktig! En priskrig er et race to the bottom. Alle aktører taper marginer, og siden alle senker prisene likt, oppnår ingen varig konkurransefortrinn. Lojale kunder bygges ikke gjennom lavest pris — de bytter til neste aktør som er enda billigere. Priskrig er destruktivt for bransjen som helhet.',
      },
      {
        id: 'c',
        label: 'Den nye aktøren vinner alltid en priskrig fordi de har lavere kostnader.',
        isCorrect: false,
        feedback:
          'Feil. Det er ikke gitt at en ny aktør har lavere kostnader — de har kanskje bare lavere marginkrav i startfasen. Etablerte aktører som Rema 1000 har stordriftsfordeler og forhandlingsmakt med leverandører som nye aktører ikke har.',
      },
      {
        id: 'd',
        label: 'Priskrig er alltid positivt for kundene på lang sikt.',
        isCorrect: false,
        feedback:
          'Feil. Kortsiktig er priskrig bra for forbrukerne (lavere priser). Langsiktig kan det føre til at aktører går konkurs, redusert valgfrihet og kvalitetsforverring. Når kun to-tre store aktører overlever, forsvinner konkurransen og prisene stiger igjen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
