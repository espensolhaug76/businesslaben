import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ I en krise er rolig lederskap det viktigste. Panikk smitter — ro smitter også!'

export const BEREDSKAPSLEDELSE_EXERCISES: QuizExercise[] = [
  {
    id: 'bered-01',
    icon: '🔥',
    title: 'Butikkbrann',
    context: 'Du er butikkleder på IKEA. Brannalarmen går. Det er røyk fra lageret. 20 kunder og 4 ansatte er i butikken.',
    question: 'Hva er riktig handlingsrekkefølge?',
    choices: [
      {
        id: 'a',
        label: 'Ring 110 først, så evakuer.',
        isCorrect: false,
        feedback: 'Feil rekkefølge. Personsikkerhet er alltid prioritet 1. Evakuer ALLE umiddelbart, ring 110 etter at du er ute. Sekunder teller.',
      },
      {
        id: 'b',
        label: 'Sjekk lageret for å vurdere alvorlighetsgraden, så ta beslutning.',
        isCorrect: false,
        feedback: 'Svært farlig. Du skal aldri gå mot en brann for å "sjekke". Behandle alltid brannalarm som ekte inntil brannvesenet bekrefter annet.',
      },
      {
        id: 'c',
        label: 'Evakuer alle umiddelbart, ring 110 fra utsiden, tell personell ved møteplass.',
        isCorrect: true,
        feedback: 'Riktig! 1) Evakuer alle, 2) Ring 110 fra utsiden, 3) Tell personell ved møteplass. Gå aldri tilbake inn i bygningen.',
      },
      {
        id: 'd',
        label: 'Bruk brannslukkeren på lageret, ring 110 etterpå.',
        isCorrect: false,
        feedback: 'Feil. Uten evakuering setter du alle i fare. Brannslukker er kun for svært småe, kontrollerte branner — og kun etter evakuering er startet.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'bered-02',
    icon: '🤒',
    title: 'Kunde besvimer',
    context: 'En eldre kunde besvimer ved kassen i Kiwi. Ingen åpenbar grunn. Kunden ligger på gulvet og er bevisstløs.',
    question: 'Hva gjør du?',
    choices: [
      {
        id: 'a',
        label: 'Ring 113, legg kunden i stabilt sideleie, sjekk pust, hold kunden varm, hold andre unna.',
        isCorrect: true,
        feedback: 'Riktig! Ring 113 umiddelbart. Stabilt sideleie hindrer kvelning. Sjekk pust/puls. Flytt ikke pasienten unødvendig — vent på ambulansen.',
      },
      {
        id: 'b',
        label: 'Gi kunden vann og sett dem opp mot veggen.',
        isCorrect: false,
        feedback: 'Feil. En bevisstløs person skal aldri gis mat eller drikke — fare for kvelning. Ring 113 og legg i stabilt sideleie.',
      },
      {
        id: 'c',
        label: 'Bær kunden til et rolig rom slik at de ikke forstyrres.',
        isCorrect: false,
        feedback: 'Feil. Flytt aldri en bevisstløs person unødvendig — det kan forverre skader. Ring 113 og vent på fagfolk.',
      },
      {
        id: 'd',
        label: 'Vent til kunden våkner og spør hva som skjedde.',
        isCorrect: false,
        feedback: 'Feil og potensielt livstruende. En bevisstløs person trenger umiddelbar medisinsk hjelp. Ring 113 nå.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'bered-03',
    icon: '🔫',
    title: 'Ran',
    context: 'Butikken din er nettopp ranet. Ranerne har forlatt stedet. Kassemedarbeideren er skaket men uskadt.',
    question: 'Hva er riktig respons umiddelbart etter ranet?',
    choices: [
      {
        id: 'a',
        label: 'Sjekk kassen for å se hvor mye som mangler, skriv rapport.',
        isCorrect: false,
        feedback: 'Feil. Berør ingenting — det er et åsted. Politiet trenger tekniske bevis. Pengene er sekundært.',
      },
      {
        id: 'b',
        label: 'Ring 112, sørg for at alle er trygge, ikke rør noe, ta vare på ansatte psykisk.',
        isCorrect: true,
        feedback: 'Riktig! 1) Ring 112, 2) Sjekk at alle er trygge, 3) Ikke rør noe (åstedssikring), 4) Ta vare på ansatte — ran er et traume. Tilby psykologhjelp.',
      },
      {
        id: 'c',
        label: 'Løp etter ranerne for å huske utseendet deres.',
        isCorrect: false,
        feedback: 'Svært farlig og ulovlig å ta loven i egne hender. Ring politiet og gi dem beskrivelse fra trygt sted.',
      },
      {
        id: 'd',
        label: 'Åpne butikken igjen så raskt som mulig for å vise at dere ikke lar seg skremme.',
        isCorrect: false,
        feedback: 'Feil. Butikken er et åsted og skal ikke gjenåpnes før politiet har frigjort den. De ansatte trenger også tid til å bearbeide hendelsen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'bered-04',
    icon: '⚡',
    title: 'Krisekommunikasjon — strømbrudd',
    context: 'Strømbrudd gjør at Coop Extra ikke kan åpne en hel fredag. Mange kunder har allerede stilt seg opp utenfor.',
    question: 'Hva er riktig kommunikasjonsstrategi?',
    choices: [
      {
        id: 'a',
        label: 'Vent til problemet er løst, deretter kommuniser at alt er normalt igjen.',
        isCorrect: false,
        feedback: 'Feil. Kunder som allerede er på stedet får ingen info og opplever det som respektløst. Kommuniser umiddelbart.',
      },
      {
        id: 'b',
        label: 'Post en unnskyldning på Instagram og håp at kundene ser det.',
        isCorrect: false,
        feedback: 'Ikke godt nok. Mange kunder er utenfor butikken akkurat nå og sjekker ikke Instagram. Bruk alle kanaler, inkludert skilt på døren.',
      },
      {
        id: 'c',
        label: 'Ikke si noe — kundene forstår at det er force majeure.',
        isCorrect: false,
        feedback: 'Feil. Kundene vet ingenting og vil føle seg ignorert. Manglende kommunikasjon i krise er alltid verre enn åpen kommunikasjon.',
      },
      {
        id: 'd',
        label: 'Umiddelbar melding på alle kanaler (nettside, Google, sosiale medier, skilt), ærlig om årsak og forventet åpningstid.',
        isCorrect: true,
        feedback: 'Riktig! Proaktiv, ærlig kommunikasjon på alle kanaler. Kunder setter pris på ærlighet og slipper å vente forgjeves. Oppdater når ny info er klar.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'bered-05',
    icon: '👔',
    title: 'Lederskap i krise',
    context: 'Det er oppdaget en alvorlig matforgiftning knyttet til en rett fra restauranten din. 3 gjester er innlagt på sykehus.',
    question: 'Hva er lederens viktigste oppgave i de første 30 minuttene?',
    choices: [
      {
        id: 'a',
        label: 'Finn ut hvem av de ansatte som er skyldig og konfronter dem.',
        isCorrect: false,
        feedback: 'Feil prioritet. Årsaksundersøkelse kommer etter at de akutte tingene er håndtert. Ansvarsfordeling er ikke krisens første oppgave.',
      },
      {
        id: 'b',
        label: 'Ring forsikringsselskapet for å sikre dekning.',
        isCorrect: false,
        feedback: 'Viktig, men ikke i de første 30 minuttene. Fokuser først på folkenes helse, myndighetene og kundekommunikasjon.',
      },
      {
        id: 'c',
        label: 'Steng restauranten, varsle Mattilsynet, kontakt alle gjester som spiste retten, brief personalet.',
        isCorrect: true,
        feedback: 'Riktig! 1) Steng for å hindre flere skader, 2) Varsle Mattilsynet (pålagt), 3) Kontakt berørte gjester, 4) Brief personalet rolig og tydelig. Lederskap = handling + kommunikasjon.',
      },
      {
        id: 'd',
        label: 'Hold informasjonen internt til du vet mer — ikke skap panikk.',
        isCorrect: false,
        feedback: 'Feil og potensielt ulovlig. Mattilsynet skal varsles umiddelbart ved mistanke om matforgiftning. Skjuling forverrer situasjonen enormt.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
