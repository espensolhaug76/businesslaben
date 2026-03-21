import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ Etiske valg er ikke alltid lønnsomme på kort sikt — men de er alltid riktige på lang sikt!'

export const ETISKE_DILEMMAER_EXERCISES: QuizExercise[] = [
  {
    id: 'etikk2-01',
    icon: '💰',
    title: 'Kickback-tilbud',
    context: 'Du er innkjøpssjef hos Elkjøp. En leverandør inviterer deg på en eksklusiv fotballtur til Barcelona (verdi 35 000 kr) og kaller det "takk for samarbeidet".',
    question: 'Hva er riktig å gjøre?',
    choices: [
      {
        id: 'a',
        label: 'Godta turen — det er bare en takk, ikke betaling for en tjeneste.',
        isCorrect: false,
        feedback: 'Feil. Grensen mellom gave og bestikkelse er beløpsgrensen (typisk 500–1000 kr i norsk næringsliv). 35 000 kr er langt over og kan straffes etter straffeloven §387.',
      },
      {
        id: 'b',
        label: 'Avvis tilbudet og rapporter til din leder — dette er korrupsjon.',
        isCorrect: true,
        feedback: 'Riktig! Korrupsjon (straffeloven §387) kan gi inntil 10 års fengsel. Du har meldeplikt til din arbeidsgiver. Leverandøren kan miste kontrakter.',
      },
      {
        id: 'c',
        label: 'Godta men betale halvparten selv — da er det ikke korrupsjon.',
        isCorrect: false,
        feedback: 'Feil. Det er fortsatt en utilbørlig fordel. Det er hensikten bak gaven som avgjør, ikke betalingen.',
      },
      {
        id: 'd',
        label: 'Spørre juridisk avdeling — det finnes ingen klar regel.',
        isCorrect: false,
        feedback: 'Delvis riktig at juridisk avdeling kan konsulteres, men regelen er klar: slike beløp er korrupsjon. Ikke vent på svar — avslå.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'etikk2-02',
    icon: '🕵️',
    title: 'Industrispionasje',
    context: 'En konkurrent tilbyr deg 200 000 kr for å dele din bedrifts prislister og kundedatabase. Du har tilgang til begge.',
    question: 'Hva er dette, og hva gjør du?',
    choices: [
      {
        id: 'a',
        label: 'Det er etisk galt men ikke ulovlig — avslå fordi det er mot bedriftens interesser.',
        isCorrect: false,
        feedback: 'Feil. Det er ulovlig. Brudd på taushetsplikten, bedriftshemmeligheter (markedsføringsloven §28) og personvernlovgivningen. Straffeansvar.',
      },
      {
        id: 'b',
        label: 'Industrispionasje — ulovlig (bedriftshemmeligheter + taushetsplikt). Avslå og varsle leder/styre.',
        isCorrect: true,
        feedback: 'Riktig! Å dele bedriftshemmeligheter er ulovlig og kan gi erstatningskrav og fengsel. Du har varslingsplikt. Konkurrenten kan anmeldes.',
      },
      {
        id: 'c',
        label: 'Forhandle for å få mer — 200 000 kr er for lite for risikoen.',
        isCorrect: false,
        feedback: 'Absolutt feil. Å forhandle gjør deg til medskyldig. Det finnes ingen "riktig pris" for å selge bedriftshemmeligheter.',
      },
      {
        id: 'd',
        label: 'Be om tid til å tenke — vurder om beløpet er verdt det.',
        isCorrect: false,
        feedback: 'Feil. Det er ingen situasjon der dette er riktig. Avslå umiddelbart og varsle.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'etikk2-03',
    icon: '🌿',
    title: 'Miljøkostnad',
    context: 'Styret i din bedrift vil bruke billigste emballasje (fossil plast). Miljøvennlig alternativ koster 28% mer. Du er daglig leder.',
    question: 'Hva er det sterkeste argumentet for miljøvennlig emballasje?',
    choices: [
      {
        id: 'a',
        label: 'Det er riktig moralsk sett — bedrifter har ansvar.',
        isCorrect: false,
        feedback: 'Sant, men ikke det sterkeste argumentet overfor et styre. Styrene vil ha forretningsmessige begrunnelser.',
      },
      {
        id: 'b',
        label: 'Emballasjekostnaden er en liten del av totalkostnaden, og bærekraft gir varig konkurransefordel og bedre omdømme.',
        isCorrect: true,
        feedback: 'Riktig! 28% økning på emballasje er kanskje 2–3% økning på total produktkostnad. Mot dette: merkevarefordel, unngå fremtidig reguleringsrisiko, tiltrekke bevisste kunder og investorer.',
      },
      {
        id: 'c',
        label: 'Vi må gjøre det for å unngå bøter.',
        isCorrect: false,
        feedback: 'Ikke sterkt nok alene. Det er ingen bøt ennå for fossil emballasje i de fleste bransjer — argumentet er fremtidsrettet, ikke nødssituasjon.',
      },
      {
        id: 'd',
        label: 'Konkurrentene bruker allerede miljøvennlig emballasje.',
        isCorrect: false,
        feedback: 'Relevant, men ikke det sterkeste argumentet. Styrene er mer overbevist av ROI-beregninger enn "alle andre gjør det".',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'etikk2-04',
    icon: '👶',
    title: 'Barnearbeid i leverandørkjeden',
    context: 'Din billigste klesimportør fra Bangladesh leverer varer 20% rimeligere enn alle andre. En revisjonsrapport antyder mulig barnearbeid i fabrikken.',
    question: 'Hva er riktig fremgangsmåte?',
    choices: [
      {
        id: 'a',
        label: 'Fortsett innkjøpet — du er ikke ansvarlig for leverandørens praksis.',
        isCorrect: false,
        feedback: 'Feil og lovstridig. EUs aktsomhetslov og norsk åpenhetsloven krever at bedrifter undersøker og adresserer menneskerettighetsbrudd i leverandørkjeden.',
      },
      {
        id: 'b',
        label: 'Krev dokumentasjon, stans innkjøp inntil verifisert — bedriften er medskyldig ved bevisst ignorering.',
        isCorrect: true,
        feedback: 'Riktig! Åpenhetsloven (2022) krever aktsomhetsvurdering av leverandørkjeden. Å ignorere mistanke gjør bedriften medansvarlig. Stans + krev tredjepartsrevisjon.',
      },
      {
        id: 'c',
        label: 'Send et brev til leverandøren der du ber dem bekrefte at de følger lovverket.',
        isCorrect: false,
        feedback: 'Ikke tilstrekkelig. En egenbekreftelse er ikke dokumentasjon. Du trenger uavhengig revisjon.',
      },
      {
        id: 'd',
        label: 'Bytt leverandør uten å si hvorfor — unngå konfrontasjon.',
        isCorrect: false,
        feedback: 'Løser ikke problemet for arbeiderne. Åpenhetsloven krever aktiv oppfølging, ikke bare å se bort.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'etikk2-05',
    icon: '♻️',
    title: 'Greenwashing-fristelse',
    context: 'Salgssjef vil annonsere det nye produktet som "100% klimanøytralt" og "bærekraftig". Produktet har ikke noen sertifisering, men dere bruker noe fornybar energi i produksjonen.',
    question: 'Hva er riktig å si?',
    choices: [
      {
        id: 'a',
        label: '"100% klimanøytralt og bærekraftig" — det er godt nok med fornybar energi.',
        isCorrect: false,
        feedback: 'Feil og ulovlig. "100% klimanøytralt" uten dokumentasjon er villedende markedsføring (mfl §7). Forbrukerombudet har felt bedrifter for slike påstander.',
      },
      {
        id: 'b',
        label: 'Si ingenting om miljø — for risikabelt.',
        isCorrect: false,
        feedback: 'Unødvendig defensivt. Du KAN kommunisere det dere faktisk gjør — bare vær nøyaktig og dokumenterbar.',
      },
      {
        id: 'c',
        label: '"Produsert med fornybar energi i vår norske fabrikk" — spesifikk og sann påstand.',
        isCorrect: true,
        feedback: 'Riktig! Spesifikke, sanne og dokumenterbare påstander er lovlige. "Produsert med fornybar energi" er presis. "100% bærekraftig" er ikke det.',
      },
      {
        id: 'd',
        label: 'Skaff sertifisering raskt og bruk påstandene — det går fort.',
        isCorrect: false,
        feedback: 'Sertifisering (Svanemerket, ISO 14001 m.fl.) tar måneder og krever reell dokumentasjon. Bruk påstandene FØR sertifisering er greenwashing.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
