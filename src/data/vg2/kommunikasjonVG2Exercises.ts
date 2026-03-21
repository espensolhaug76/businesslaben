import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ Profesjonell kommunikasjon tilpasser seg mottakeren — ikke omvendt. Les rommet!'

export const KOMMUNIKASJON_VG2_EXERCISES: QuizExercise[] = [
  {
    id: 'komvg2-01',
    icon: '🤝',
    title: 'B2B-presentasjon',
    context: 'Du skal presentere et leverandørtilbud til innkjøpssjefen hos Coop. Hun er opptatt og har 15 minutter.',
    question: 'Hva er det viktigste å fokusere på i presentasjonen?',
    choices: [
      {
        id: 'a',
        label: 'Detaljerte produktbeskrivelser og tekniske spesifikasjoner.',
        isCorrect: false,
        feedback: 'Feil. B2B-kjøpere bryr seg om ROI og forretningsnytte, ikke tekniske detaljer. Kom til poenget.',
      },
      {
        id: 'b',
        label: 'ROI, besparelse og forretningsverdi — konkret, tallbasert og kortfattet.',
        isCorrect: true,
        feedback: 'Riktig! B2B-kommunikasjon dreier seg om business case. "Dette sparer dere 180 000 kr/år og øker margin med 2%" er langt mer overbevisende enn produktfunksjoner.',
      },
      {
        id: 'c',
        label: 'Bedriftens historie og verdier for å bygge tillit.',
        isCorrect: false,
        feedback: 'Feil for en 15-minutters pitch. Historiefortelling kan komme, men innkjøpssjefen trenger tallene først.',
      },
      {
        id: 'd',
        label: 'Vis alle produktene i sortimentet slik at hun har oversikt.',
        isCorrect: false,
        feedback: 'Feil. Å vise alt er å vise ingenting. Velg de 2–3 produktene som gir mest verdi for Coop og fokuser på dem.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'komvg2-02',
    icon: '💡',
    title: 'Investorpitch',
    context: 'Du har 3 minutter på å pitche din nye reiselivsapp for en investor på Shark Tank Norge.',
    question: 'Hva MÅ absolutt være med i en 3-minutters investorpitch?',
    choices: [
      {
        id: 'a',
        label: 'Problem → Løsning → Markedsstørrelse → Forretningsmodell → Team → Hva du trenger.',
        isCorrect: true,
        feedback: 'Riktig! Dette er Elevator Pitch-modellen. Investorer vurderer: Er problemet reelt? Er løsningen god? Er markedet stort nok? Kan dette teamet gjøre det?',
      },
      {
        id: 'b',
        label: 'En lang produktdemonstrasjon som viser alle funksjonene.',
        isCorrect: false,
        feedback: 'Feil. 3 minutter er ikke nok til demo. Investorer kjøper ideen og teamet, ikke produktet i seg selv.',
      },
      {
        id: 'c',
        label: 'Kun markedsanalyse og konkurrentoversikt.',
        isCorrect: false,
        feedback: 'Feil. Markedsanalyse er viktig, men ikke nok alene. Investoren trenger hele bildet — spesielt forretningsmodellen.',
      },
      {
        id: 'd',
        label: 'En entusiastisk fortelling om hvorfor du er lidenskapelig opptatt av ideen.',
        isCorrect: false,
        feedback: 'Lidenskap er bra, men ikke nok. Investorer trenger tall og struktur. Kombinér lidenskap med data.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'komvg2-03',
    icon: '📰',
    title: 'Presserespons',
    context: 'En VG-journalist ringer og spør om en ansatt som angivelig opptrådte rasistisk mot en kunde. Hendelsen er lagt ut på TikTok.',
    question: 'Hva svarer du?',
    choices: [
      {
        id: 'a',
        label: '"Ingen kommentar."',
        isCorrect: false,
        feedback: 'Feil. "Ingen kommentar" tolkes alltid som skjuling. Det forverrer mediedekningen dramatisk.',
      },
      {
        id: 'b',
        label: 'Benekt hendelsen umiddelbart og forsvar den ansatte.',
        isCorrect: false,
        feedback: 'Farlig. Uten full oversikt risikerer du å lyve på trykk. Det kan ødelegge bedriftens troverdighet permanent.',
      },
      {
        id: 'c',
        label: '"Vi er kjent med saken og tar den svært alvorlig. Vi undersøker nå og vil gi en uttalelse innen kl. 15."',
        isCorrect: true,
        feedback: 'Riktig! Bekreft at du kjenner til saken, vis at du tar det alvorlig, gi en konkret tidsfrist for tilbakemelding. Aldri improviser med pressen uten fakta.',
      },
      {
        id: 'd',
        label: 'Be journalisten ringe tilbake i morgen slik at du får tid til å forberede deg.',
        isCorrect: false,
        feedback: 'Feil. Morgendagens avisforsider blir skrevet i dag. Be om noen timer, ikke en dag.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'komvg2-04',
    icon: '👔',
    title: 'Møtefasilitering',
    context: 'Du leder et avdelingsmøte hos Elkjøp. Diskusjonen sporer av og folk snakker i munnen på hverandre om en uenighet om vaktlista.',
    question: 'Hva gjør en god møteleder?',
    choices: [
      {
        id: 'a',
        label: 'La diskusjonen gå — det er bra at folk engasjerer seg.',
        isCorrect: false,
        feedback: 'Feil. Ustrukturert diskusjon koster tid og skaper frustrasjon. Møtelederen er ansvarlig for prosessen.',
      },
      {
        id: 'b',
        label: 'Avslutt møtet og ta saken separat med de involverte.',
        isCorrect: false,
        feedback: 'Kan fungere, men ikke alltid riktig. Prøv å redde møtet først ved å sette struktur, før du eskalerer.',
      },
      {
        id: 'c',
        label: 'Avbryt høflig, oppsummer diskusjonen, klar for talerliste, returner til agendapunktet.',
        isCorrect: true,
        feedback: 'Riktig! "Takk alle — la meg oppsummere der vi er. La oss gi én person av gangen ordet. Vi har 5 minutter til å avgjøre dette." Struktur redder møter.',
      },
      {
        id: 'd',
        label: 'Ta parti med den ansatte som har mest erfaring.',
        isCorrect: false,
        feedback: 'Feil. En god møteleder er nøytral og sørger for rettferdig prosess — ikke vinner på basis av erfaring.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'komvg2-05',
    icon: '🚨',
    title: 'Krisekommunikasjon',
    context: 'Rema 1000 har solgt utgått kjøttdeig. 12 kunder er syke. VG har saken. Du er kommunikasjonssjef.',
    question: 'Hva er den beste strategien for pressemeldingen?',
    choices: [
      {
        id: 'a',
        label: 'Minimal informasjon — si bare at dere undersøker saken.',
        isCorrect: false,
        feedback: 'Feil. Minimal informasjon skaper vakuum som media fyller med spekulasjon. Vær proaktiv og åpen.',
      },
      {
        id: 'b',
        label: 'Fokuser på at det er leverandørens feil, ikke Rema 1000s.',
        isCorrect: false,
        feedback: 'Feil. Ansvarspulverisering i krise ødelegger troverdigheten. Ta ansvar for kunden, uansett hvem som er teknisk skyldig.',
      },
      {
        id: 'c',
        label: 'Vær ærlig, ta ansvar, beskriv konkrete tiltak, gi info til berørte kunder, varsle om tilbaketrekking.',
        isCorrect: true,
        feedback: 'Riktig! Proaktiv ærlighet gjenoppbygger tillit raskest. Johnson & Johnson-modellen fra Tylenol-krisen 1982 er gullstandarden: ta ansvar, handle raskt, kommuniser åpent.',
      },
      {
        id: 'd',
        label: 'Vent til alle fakta er klare før du sier noe — ca. 48 timer.',
        isCorrect: false,
        feedback: 'Feil. 48 timer er en evighet i krisekommunikasjon. Kommuniser det du VET nå, og oppdater løpende.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
