import type { QuizExercise } from '@/types/quiz'

export const LONN_EXERCISES: QuizExercise[] = [
  {
    id: 'lonn-vg2-01',
    icon: '⏱️',
    title: 'Timelønn — deltidsstilling',
    context:
      'Per jobber i en 40% stilling og er timelønnet. Han arbeider 16 timer per uke til en timelønn på 220 kr. En måned regnes som 4,33 uker i lønnsberegning.',
    question: 'Hva er Pers bruttolønn per måned?',
    choices: [
      {
        id: 'a',
        label: '14 080 kr',
        isCorrect: false,
        feedback:
          'Feil. Du har sannsynligvis brukt 4 uker i stedet for 4,33. Husk å bruke 4,33 uker per måned for å få riktig månedsnorm.',
      },
      {
        id: 'b',
        label: '15 241 kr',
        isCorrect: true,
        feedback:
          'Riktig! 220 kr/t × 16 t/uke × 4,33 uker/mnd = 15 241,60 kr ≈ 15 241 kr brutto per måned.',
      },
      {
        id: 'c',
        label: '16 500 kr',
        isCorrect: false,
        feedback:
          'Feil. Sjekk om du har brukt riktig antall timer eller uker. Regn nøye: 220 × 16 × 4,33.',
      },
      {
        id: 'd',
        label: '38 104 kr',
        isCorrect: false,
        feedback:
          'Feil. Dette tilsvarer omtrent full stilling (37,5 t/uke). Per jobber kun 40% — 16 timer per uke.',
      },
    ],
    espenTip:
      '⚠️ Husk: arbeidsgiver betaler mer enn bruttolønnen — arbeidsgiveravgift + feriepenger + pensjon kan utgjøre 30–35% ekstra!',
  },
  {
    id: 'lonn-vg2-02',
    icon: '🏛️',
    title: 'Arbeidsgiveravgift',
    context:
      'En bedrift har én ansatt med en bruttolønn på 28 000 kr per måned. Arbeidsgiveravgiften i sone 1 (de fleste kommuner) er 14,1% og beregnes av bruttolønnen.',
    question:
      'Hva er bedriftens totale lønnskostnad per måned for denne ansatte, inkludert arbeidsgiveravgift?',
    choices: [
      {
        id: 'a',
        label: '28 000 kr — arbeidsgiveravgiften trekkes fra den ansattes lønn.',
        isCorrect: false,
        feedback:
          'Feil. Arbeidsgiveravgiften er en ekstra kostnad for arbeidsgiver og trekkes ikke fra den ansattes lønn.',
      },
      {
        id: 'b',
        label: '29 948 kr',
        isCorrect: false,
        feedback:
          'Feil. Sjekk prosentsatsen: 14,1% av 28 000 = 3 948 kr. Total kostnad: 28 000 + 3 948 = 31 948 kr.',
      },
      {
        id: 'c',
        label: '31 948 kr',
        isCorrect: true,
        feedback:
          'Riktig! 28 000 × 1,141 = 31 948 kr. Arbeidsgiveravgiften (3 948 kr) er en kostnad arbeidsgiveren betaler i tillegg til bruttolønnen.',
      },
      {
        id: 'd',
        label: '33 600 kr',
        isCorrect: false,
        feedback:
          'Feil. 14,1% av 28 000 er 3 948 kr, ikke 5 600 kr. Total kostnad blir 31 948 kr.',
      },
    ],
    espenTip:
      '⚠️ Husk: arbeidsgiver betaler mer enn bruttolønnen — arbeidsgiveravgift + feriepenger + pensjon kan utgjøre 30–35% ekstra!',
  },
  {
    id: 'lonn-vg2-03',
    icon: '🌴',
    title: 'Feriepenger',
    context:
      'Kari har vært ansatt hele fjoråret og tjente totalt 320 000 kr i lønn (feriepengegrunnlag). Bedriften bruker ordinær feriepengesats på 10,2% (4 uker ferie).',
    question: 'Hvor mye får Kari utbetalt i feriepenger?',
    choices: [
      {
        id: 'a',
        label: '32 640 kr',
        isCorrect: true,
        feedback:
          'Riktig! 320 000 × 0,102 = 32 640 kr. Feriepengene utbetales vanligvis i juni og erstatter lønn i ferieperioden.',
      },
      {
        id: 'b',
        label: '28 000 kr',
        isCorrect: false,
        feedback:
          'Feil. Sjekk satsen: 10,2% av 320 000 er ikke 28 000 kr. Regn: 320 000 × 0,102 = 32 640 kr.',
      },
      {
        id: 'c',
        label: '38 400 kr',
        isCorrect: false,
        feedback:
          'Feil. 38 400 ville tilsvart 12% sats (brukes for ansatte over 60 år med 5 uker ferie). Ordinær sats er 10,2%.',
      },
      {
        id: 'd',
        label: '16 320 kr',
        isCorrect: false,
        feedback:
          'Feil. Det ser ut som du har brukt halvparten av riktig sats. 10,2% av 320 000 = 32 640 kr.',
      },
    ],
    espenTip:
      '⚠️ Husk: arbeidsgiver betaler mer enn bruttolønnen — arbeidsgiveravgift + feriepenger + pensjon kan utgjøre 30–35% ekstra!',
  },
  {
    id: 'lonn-vg2-04',
    icon: '📈',
    title: 'Provisjonslønn',
    context:
      'Selger Lars har en avtale om 15 000 kr i fast grunnlønn per måned pluss 3% provisjon av eget salg. I april selger han varer og tjenester for 180 000 kr.',
    question: 'Hva er Lars sin totale bruttolønn for april?',
    choices: [
      {
        id: 'a',
        label: '5 400 kr',
        isCorrect: false,
        feedback:
          'Feil. Du har beregnet kun provisjonen (3% av 180 000 = 5 400 kr), men glemte å legge til grunnlønnen på 15 000 kr.',
      },
      {
        id: 'b',
        label: '18 600 kr',
        isCorrect: false,
        feedback:
          'Feil. Sjekk provisjonsberegningen: 3% av 180 000 = 5 400 kr. 15 000 + 5 400 = 20 400 kr.',
      },
      {
        id: 'c',
        label: '20 400 kr',
        isCorrect: true,
        feedback:
          'Riktig! Grunnlønn 15 000 kr + provisjon (180 000 × 0,03 = 5 400 kr) = 20 400 kr totalt brutto for april.',
      },
      {
        id: 'd',
        label: '25 800 kr',
        isCorrect: false,
        feedback:
          'Feil. Det ser ut som du har brukt en høyere provisjonssats. 3% av 180 000 er 5 400 kr, ikke 10 800 kr.',
      },
    ],
    espenTip:
      '⚠️ Husk: arbeidsgiver betaler mer enn bruttolønnen — arbeidsgiveravgift + feriepenger + pensjon kan utgjøre 30–35% ekstra!',
  },
  {
    id: 'lonn-vg2-05',
    icon: '💼',
    title: 'Lønnstyper — fordeler og ulemper',
    context:
      'En salgsbedrift vurderer om de skal gå over fra fast lønn til provisjonsbasert lønn for selgerne. Styret diskuterer konsekvensene for bedriftens økonomi.',
    question:
      'Hva er den viktigste fordelen med provisjonslønn for en arbeidsgiver i en salgsbedrift?',
    choices: [
      {
        id: 'a',
        label:
          'Lønnskostnaden er variabel og følger omsetningen — bedriften betaler mer kun når det selges mer (risikodeling).',
        isCorrect: true,
        feedback:
          'Riktig! Provisjonslønn er en variabel kostnad som automatisk tilpasser seg omsetningsnivået. I dårlige perioder synker lønnskostnadene, noe som beskytter bedriftens lønnsomhet.',
      },
      {
        id: 'b',
        label:
          'Lønnskostnaden blir fast og forutsigbar — enklere å budsjettere for hele året.',
        isCorrect: false,
        feedback:
          'Feil. Det er nettopp motsatt: provisjonslønn er variabel, ikke fast. Fast lønn gir forutsigbarhet, men provisjon gir fleksibilitet.',
      },
      {
        id: 'c',
        label:
          'Det er enklere å beregne arbeidsgiveravgift og feriepenger med provisjonslønn.',
        isCorrect: false,
        feedback:
          'Feil. Provisjonslønn gjør lønnsberegningen mer kompleks, ikke enklere, siden grunnlaget varierer hver måned.',
      },
      {
        id: 'd',
        label:
          'Ansatte med provisjonslønn har alltid høyere motivasjon enn ansatte med fast lønn.',
        isCorrect: false,
        feedback:
          'Feil. Forskning viser at høy provisjonsandel kan skape stress og redusere samarbeid. Motivasjonseffekten er ikke entydig positiv.',
      },
    ],
    espenTip:
      '⚠️ Husk: arbeidsgiver betaler mer enn bruttolønnen — arbeidsgiveravgift + feriepenger + pensjon kan utgjøre 30–35% ekstra!',
  },
]
