import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const MERKEVARE_EXERCISES: QuizExercise[] = [
  {
    id: 'merkevare-vg2-01',
    icon: '✈️',
    title: 'Merkevareidentitet',
    context:
      'Norwegian Air Shuttle og Widerøe er begge norske flyselskaper, men retter seg mot svært ulike kundegrupper og har meget forskjellig merkevareidentitet.',
    question: 'Hva er den viktigste forskjellen mellom Norwegian og Widerøe som merkevarer?',
    choices: [
      {
        id: 'a',
        label:
          'Norwegian er statseiet og trygt, mens Widerøe er privateiet og tar mer risiko i sine ruter.',
        isCorrect: false,
        feedback:
          'Feil. Norwegian er privateid (børsnotert), og eierstruktur er ikke det som definerer merkevareidentiteten til et flyselskap.',
      },
      {
        id: 'b',
        label:
          'Norwegian posisjonerer seg som lavpris, direkte og digital-first rettet mot unge reisende, mens Widerøe bygger på trygghet, tilknytning til distrikts-Norge og lojalitet hos et eldre segment — ulik posisjonering i samme marked.',
        isCorrect: true,
        feedback:
          'Riktig! De to selskapene har bevisst valgt ulike posisjoner: Norwegian konkurrerer på pris og digitale flater, mens Widerøe eier distriktsmarkedet gjennom tillit og lokal tilstedeværelse.',
      },
      {
        id: 'c',
        label:
          'Norwegian flyr internasjonalt og Widerøe flyr kun innenriks — det er den eneste forskjellen.',
        isCorrect: false,
        feedback:
          'Feil. Rutekartet er én operasjonell forskjell, men merkevareidentitet handler om posisjonering, verdier og målgruppe — ikke bare hvilke ruter selskapet flyr.',
      },
      {
        id: 'd',
        label:
          'Widerøe er dyrere fordi de har nyere fly, mens Norwegian er billigere fordi flyene er eldre.',
        isCorrect: false,
        feedback:
          'Feil. Prisforskjeller forklares av forretningsmodell og posisjonering, ikke flyenes alder. Merkevareidentitet handler om opplevd verdi og assosiasjon, ikke teknisk utstyr.',
      },
    ],
    espenTip:
      '⚠️ En merkevare er hva folk sier om deg når du ikke er i rommet — bygg den bevisst!',
  },
  {
    id: 'merkevare-vg2-02',
    icon: '🍕',
    title: 'Brand equity',
    context:
      'Grandiosa er Norges mest solgte frosne pizza med titalls millioner solgte enheter hvert år. En ny frosnet pizza med tilsvarende ingredienser og størrelse koster 20 kr mindre, men selger langt færre enheter.',
    question: 'Hva er "brand equity" i denne sammenhengen?',
    choices: [
      {
        id: 'a',
        label:
          'Brand equity er markedsandelen Grandiosa har — at de selger flest enheter er beviset på merkevarens verdi.',
        isCorrect: false,
        feedback:
          'Feil. Markedsandel er en konsekvens av brand equity, ikke definisjonen. Brand equity handler om den opplevde merkeverdien i forbrukerens hode.',
      },
      {
        id: 'b',
        label:
          'Den ekstra verdien forbrukere legger i selve merkenavnet utover produktets fysiske egenskaper — folk er villige til å betale mer for Grandiosa enn et ukjent merke med samme innhold.',
        isCorrect: true,
        feedback:
          'Riktig! Brand equity er den immaterielle premiumverdien et merkenavn bærer. Grandiosa er blitt et kulturelt symbol i Norge, noe som gir selskapet prisingskraft langt utover råvarene i esken.',
      },
      {
        id: 'c',
        label:
          'Brand equity er den grafiske profilen — logo, farger og emballasjedesign som gjenkjennes i butikkhyllen.',
        isCorrect: false,
        feedback:
          'Feil. Visuell identitet er ett element som bygger brand equity, men selve begrepet er bredere og handler om den totale opplevde verdien av et merkenavn.',
      },
      {
        id: 'd',
        label:
          'Brand equity betyr at Grandiosa kan sette hvilken pris de vil fordi de ikke har konkurrenter.',
        isCorrect: false,
        feedback:
          'Feil. Grandiosa har mange konkurrenter. Brand equity gir prisingskraft, men ikke monopol. Forbrukerne velger Grandiosa fordi de verdsetter merket — ikke fordi de mangler alternativer.',
      },
    ],
    espenTip:
      '⚠️ En merkevare er hva folk sier om deg når du ikke er i rommet — bygg den bevisst!',
  },
  {
    id: 'merkevare-vg2-03',
    icon: '🏦',
    title: 'Rebranding og fusjonsrisiko',
    context:
      'DNB kjøpte Sbanken i 2021. Sbanken hadde siden 2000 bygget seg opp som en elsket nettbank med høy kundetilfredshet og en leken, vennlig tone. I 2022 ble Sbanken lagt ned og innlemmet i DNB-merket.',
    question: 'Hva er den største risikoen ved slik rebranding gjennom fusjon?',
    choices: [
      {
        id: 'a',
        label:
          'Det koster mye penger å bytte logo og designe nytt kontorkort til alle ansatte.',
        isCorrect: false,
        feedback:
          'Grafiske designkostnader er minimale i en slik fusjon. Den reelle risikoen ligger i kundebasen og merkevarekapitalen som går tapt.',
      },
      {
        id: 'b',
        label:
          'Medarbeiderne i Sbanken mister jobbene sine og søker til konkurrenter.',
        isCorrect: false,
        feedback:
          'Bemanningsutfordringer er reelle, men den viktigste merkevarerisikoen handler om kundene — ikke de ansatte.',
      },
      {
        id: 'c',
        label:
          'Tap av lojale kunder som identifiserte seg sterkt med det gamle merket — Sbanken mistet et betydelig antall kunder til konkurrenter etter DNB-kjøpet fordi de ikke ønsket å være DNB-kunder.',
        isCorrect: true,
        feedback:
          'Riktig! Sbanken hadde opparbeidet seg en unik merkevareidentitet som kundene følte tilhørighet til. Når merket forsvinner, forsvinner også den emosjonelle tilknytningen — og mange kunder byttet til Bulder, Ya eller andre alternativer.',
      },
      {
        id: 'd',
        label:
          'DNB risikerte at Sbankens teknologi ikke var kompatibel med DNBs systemer.',
        isCorrect: false,
        feedback:
          'IT-integrasjon er en operasjonell utfordring, ikke en merkevarerisiko. Spørsmålet handler om hva som skjer med merkevarekapitalen ved rebranding.',
      },
    ],
    espenTip:
      '⚠️ En merkevare er hva folk sier om deg når du ikke er i rommet — bygg den bevisst!',
  },
  {
    id: 'merkevare-vg2-04',
    icon: '🍫',
    title: 'Posisjonering mot en markedsleder',
    context:
      'En ny norsk sjokoladefabrikk vurderer å entre markedet der Freia har dominert i over 100 år. Freia eier 60 % av markedet og er Norges mest kjente sjokolademerke.',
    question: 'Hva er den beste posisjoneringstrategien for den nye sjokoladefabrikken?',
    choices: [
      {
        id: 'a',
        label:
          'Kopier Freia i produktutvalg og emballasjedesign, men selg 10 % billigere — kundene velger alltid pris.',
        isCorrect: false,
        feedback:
          'Feil. En priskrig mot en markedsleder med stordriftsfordeler er nesten alltid en tapsstrategi. Du kan ikke out-price en gigant som Freia.',
      },
      {
        id: 'b',
        label:
          'Differensier på en lønnsom nisje — lokal/håndverksproduksjon, premium ingredienser og bærekraftig profil — og unngå direkte konkurranse mot Freia i massemarkedet.',
        isCorrect: true,
        feedback:
          'Riktig! Nisjeposisjonering gir en ny aktør mulighet til å eie et segment Freia ikke prioriterer. Håndverk, lokal opprinnelse og bærekraft er voksende trender som kan bære en premium-pris.',
      },
      {
        id: 'c',
        label:
          'Rett deg mot massemarkedet med bred distribusjon i alle dagligvarebutikker — størst rekkevidde gir størst salg.',
        isCorrect: false,
        feedback:
          'Feil. Uten differensiering blir du usynlig i hyllen ved siden av Freia. Massemarkedet krever enorme markedsføringsbudsjetter som en ny aktør ikke har.',
      },
      {
        id: 'd',
        label:
          'Inngå partnerskap med Freia og selg produktene under Freias merkevare.',
        isCorrect: false,
        feedback:
          'Da har du ikke lenger en selvstendig merkevare. Spørsmålet handler om hvordan du bygger egen posisjonering — ikke om å bli del av konkurrenten.',
      },
    ],
    espenTip:
      '⚠️ En merkevare er hva folk sier om deg når du ikke er i rommet — bygg den bevisst!',
  },
  {
    id: 'merkevare-vg2-05',
    icon: '🗣️',
    title: 'Tone of voice og kanalstrategi',
    context:
      'If Forsikring vil endre sin kommunikasjon fra "kjedelig forsikringsselskap" til "trygg venn som hjelper deg". De ønsker en helhetlig tone of voice-strategi på tvers av kanaler.',
    question: 'Hvilken kanalstrategi passer best for å realisere denne merkevareposisjonen?',
    choices: [
      {
        id: 'a',
        label:
          'Kun TV-reklame med alvorlig musikk og trygghetssymboler — forsikring er et seriøst produkt og bør kommuniseres seriøst.',
        isCorrect: false,
        feedback:
          'Feil. En seriøs, tung TV-kampanje forsterker akkurat det imaget de vil bort fra. Målet er "trygg venn", ikke "kjedelig institusjon".',
      },
      {
        id: 'b',
        label:
          'Kun LinkedIn og fagartikler — forsikringskjøpere er voksne profesjonelle som ikke bruker Instagram.',
        isCorrect: false,
        feedback:
          'Feil. LinkedIn er B2B-fokusert og treffer ikke privatmarkedet bredt nok. Å ekskludere Instagram mister man kontakten med yngre kundegrupper.',
      },
      {
        id: 'c',
        label:
          'Instagram med humoristiske hverdagsscenarioer, blogg med nyttige tips og en konsistent personlig og vennlig tone i alle kundeservicekanaler.',
        isCorrect: true,
        feedback:
          'Riktig! Instagram gir visuell rekkevidde og mulighet for relaterbar humor, bloggen bygger troverdighet og hjelpsomhet, og konsistent tone i kundeservice sørger for at løftet holdes i alle møtepunkter med kunden.',
      },
      {
        id: 'd',
        label:
          'Sponsor et eliteserielag og fokuser all kommunikasjon på maskuline sportsaktiviteter.',
        isCorrect: false,
        feedback:
          'Feil. Sportspartnerskaper kan bygge synlighet, men treffer ikke nødvendigvis målgruppen og stemmer ikke med "trygg venn"-posisjonen som skal nås.',
      },
    ],
    espenTip:
      '⚠️ En merkevare er hva folk sier om deg når du ikke er i rommet — bygg den bevisst!',
  },
]
