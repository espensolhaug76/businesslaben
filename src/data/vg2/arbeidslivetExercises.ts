import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ Arbeidsmiljøloven beskytter både arbeidstaker og arbeidsgiver — kjenn rettighetene dine!'

export const ARBEIDSLIVET_EXERCISES: QuizExercise[] = [
  {
    id: 'arbeid-01',
    icon: '⏰',
    title: 'Arbeidstid og overtid',
    context: 'En butikkmedarbeider hos Coop jobber mandag 10 timer, tirsdag 9 timer, onsdag 8 timer. Ingen skriftlig avtale om utvidet arbeidstid.',
    question: 'Hva sier arbeidsmiljøloven om mandagens arbeidsdag?',
    choices: [
      {
        id: 'a',
        label: '10 timer er lovlig — det er innenfor ukegrensen på 40 timer.',
        isCorrect: false,
        feedback: 'Feil. Arbeidsmiljøloven (aml §10-4) setter grensen til 9 timer per dag, ikke bare ukegrensen. Over 9 timer per dag krever skriftlig avtale.',
      },
      {
        id: 'b',
        label: 'Arbeidsmiljøloven sier ingenting om daglig arbeidstid.',
        isCorrect: false,
        feedback: 'Feil. Aml §10-4 setter klare grenser: maks 9 timer per dag og 40 timer per uke (normalarbeidstid).',
      },
      {
        id: 'c',
        label: 'Mandag er ulovlig uten skriftlig avtale — over 9 timer per dag er overtid med 40% tillegg.',
        isCorrect: true,
        feedback: 'Riktig! Maks 9 t/dag uten avtale. Mandag med 10 timer = 1 time overtid med 40% tillegg (aml §10-6). Krever skriftlig avtale for å jobbe utover 9 timer.',
      },
      {
        id: 'd',
        label: 'Ansatte i handel har unntak fra daglig arbeidstidsgrense.',
        isCorrect: false,
        feedback: 'Feil. Handelsbransjen har noen særavtaler, men daglig arbeidstidsgrense på 9 timer gjelder generelt.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'arbeid-02',
    icon: '📉',
    title: 'Permittering',
    context: 'Din turistbutikk mister 80% av omsetningen pga. pandemi. Du vurderer å permittere 6 av 10 ansatte.',
    question: 'Hva er riktig permitteringsprosedyre?',
    choices: [
      {
        id: 'a',
        label: 'Send SMS til de ansatte i dag og si at de ikke trenger å møte opp fra i morgen.',
        isCorrect: false,
        feedback: 'Feil. Permittering krever 14 dagers skriftlig varsel (normalt), drøftelsesmøte med tillitsvalgte og melding til NAV.',
      },
      {
        id: 'b',
        label: 'Varsle NAV, gi 14 dagers skriftlig varsel, hold drøftelsesmøte med tillitsvalgte, maks 26 uker permittering per 18 måneder.',
        isCorrect: true,
        feedback: 'Riktig! Permitteringsprosedyre: 1) Drøfting med tillitsvalgte, 2) 14 dagers varsel (kan kortes til 2 dager ved uforutsette hendelser), 3) Melding NAV, 4) Maks 26 uker per 18 mnd.',
      },
      {
        id: 'c',
        label: 'Permittering er det samme som oppsigelse — du trenger ikke ha noen spesiell grunn.',
        isCorrect: false,
        feedback: 'Feil. Permittering er midlertidig fritak fra arbeidsplikten og lønnsplikt — arbeidsforholdet består. Krever saklig grunn (driftsstopp, mangel på arbeid).',
      },
      {
        id: 'd',
        label: 'Be de ansatte ta ut ferie i stedet — det er enklere.',
        isCorrect: false,
        feedback: 'Feil. Arbeidsgiver kan ikke tvinge ansatte til å ta ferie med kortere varsel enn 2 uker (ferieloven). Det er ikke et alternativ til permittering.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'arbeid-03',
    icon: '🔔',
    title: 'Varslervern',
    context: 'En ansatt varsler om at leder fører dobbelt regnskap. Kort tid etter blir varsleren overflyttet til en dårligere stilling.',
    question: 'Hva sier arbeidsmiljøloven om dette?',
    choices: [
      {
        id: 'a',
        label: 'Arbeidsgiver kan flytte ansatte fritt — det er arbeidsgivers styringsrett.',
        isCorrect: false,
        feedback: 'Feil i denne konteksten. Styringsretten er begrenset av varslervernet. En omplassering etter varsling er mistankt gjengjeldelse.',
      },
      {
        id: 'b',
        label: 'Varsleren bør holde seg unna og ikke varsle mer — det er for risikabelt.',
        isCorrect: false,
        feedback: 'Feil. Varslervernet finnes nettopp for å beskytte ansatte mot dette. Varsling om kriminalitet er ikke bare en rett — det kan være en plikt.',
      },
      {
        id: 'c',
        label: 'Gjengjeldelse er forbudt (aml §2A-4). Arbeidsgiver har omvendt bevisbyrde og må bevise at omplasseringen er ubegrunnet av varslingen.',
        isCorrect: true,
        feedback: 'Riktig! Aml §2A-4 forbyr gjengjeldelse. Arbeidsgiver har OMVENDT bevisbyrde — de må bevise at omplasseringen IKKE er relatert til varslingen. Sterk rettsbeskyttelse.',
      },
      {
        id: 'd',
        label: 'Varsleren får kun beskyttelse hvis varselet viser seg å stemme.',
        isCorrect: false,
        feedback: 'Feil. Varslervernet gjelder ved varsling i god tro — uavhengig av om varselet viser seg korrekt. Varsleren trenger ikke bevise sannheten i forkant.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'arbeid-04',
    icon: '🏥',
    title: 'Oppsigelse under sykdom',
    context: 'En ansatt hos Elkjøp har vært sykemeldt i 8 måneder pga. ryggproblem. Salgssjefen vil si opp vedkommende for å ansette noen frisk.',
    question: 'Er dette lovlig?',
    choices: [
      {
        id: 'a',
        label: 'Ja — etter 6 måneder er arbeidsgiveren fri til å si opp.',
        isCorrect: false,
        feedback: 'Feil. Verneperioden er 12 måneder fra sykdommens start, ikke 6 måneder (aml §15-8).',
      },
      {
        id: 'b',
        label: 'Nei — ansatte er vernet mot oppsigelse de første 12 månedene ved sykdom (aml §15-8 verneperiode).',
        isCorrect: true,
        feedback: 'Riktig! Verneperioden er 12 måneder fra sykdommens start. Oppsigelse i denne perioden er ugyldig med mindre det er helt urelaterte grunner. 8 måneder = innenfor verneperioden.',
      },
      {
        id: 'c',
        label: 'Ja — bedriften har rett til å erstatte syke ansatte for å holde driften gående.',
        isCorrect: false,
        feedback: 'Feil. Driftsbehov kan dekkes med vikarer, men gir ikke rett til å si opp fast ansatte under verneperioden.',
      },
      {
        id: 'd',
        label: 'Det kommer an på hva som er årsaken til sykdommen.',
        isCorrect: false,
        feedback: 'Feil. Verneperioden gjelder uavhengig av sykdomsårsak, så lenge det er lovlig sykmelding.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'arbeid-05',
    icon: '🛡️',
    title: 'HMS-ansvar',
    context: 'En ny butikksjef mener at verneombudet er ansvarlig for at HMS-kravene overholdes i butikken.',
    question: 'Hvem har det øverste HMS-ansvaret?',
    choices: [
      {
        id: 'a',
        label: 'Verneombudet — de er valgt nettopp for dette.',
        isCorrect: false,
        feedback: 'Feil. Verneombudet er arbeidstakernes HMS-representant og har en kontrollfunksjon — men IKKE ansvaret for å sikre arbeidsmiljøet.',
      },
      {
        id: 'b',
        label: 'HR-avdelingen — de håndterer alle personalrelaterte saker.',
        isCorrect: false,
        feedback: 'Feil. HR støtter HMS-arbeidet, men det øverste ansvaret ligger hos arbeidsgiver/daglig leder.',
      },
      {
        id: 'c',
        label: 'Daglig leder/arbeidsgiver har det øverste HMS-ansvaret (aml §2-1).',
        isCorrect: true,
        feedback: 'Riktig! Aml §2-1: Arbeidsgiver er ansvarlig for at arbeidsmiljølovens krav oppfylles. Verneombudet er representant for de ansatte — ikke ansvarlig for HMS.',
      },
      {
        id: 'd',
        label: 'Alle ansatte har like mye HMS-ansvar.',
        isCorrect: false,
        feedback: 'Delvis sant (ansatte har plikter), men det ØVERSTE ansvaret ligger hos arbeidsgiver. Aml §2-3 gir ansatte plikter, men §2-1 gir arbeidsgiver overordnet ansvar.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
