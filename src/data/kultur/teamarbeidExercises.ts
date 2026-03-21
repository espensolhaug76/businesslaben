import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const TEAMARBEID_EXERCISES: QuizExercise[] = [
  {
    id: 'team-01',
    icon: '🏪',
    title: 'Rollefordeling ved åpning av ny seksjon',
    context:
      'Elkjøp skal åpne en ny TV- og lyd-seksjon neste uke. Butikksjefen kaller inn til møte for å fordele ansvar for åpningen.',
    question:
      'Hvem bør ha ansvar for hva under åpningsforberedelsene?',
    choices: [
      {
        id: 'a',
        label:
          'Butikksjefen tar ansvar for alt — det er raskest og mest effektivt når det er travlt.',
        isCorrect: false,
        feedback:
          'Feil. Én person kan ikke håndtere alt alene uten at kvaliteten lider. Manglende rolleavklaring skaper kaos og overbelastning.',
      },
      {
        id: 'b',
        label:
          'Seksjonsleder koordinerer helheten, selgere forbereder produktkunnskap, lagermedarbeidere sørger for varebeholdning, og butikksjef klargjør kasse og systemer.',
        isCorrect: true,
        feedback:
          'Riktig! God rollefordeling betyr at alle vet hva de er ansvarlige for. Seksjonsleder eier helheten, mens spesialiserte roller sørger for sin del. Teamet leverer bedre enn én person alene.',
      },
      {
        id: 'c',
        label:
          'Alle gjør litt av alt etter hva som trengs — fleksibilitet er viktigere enn faste roller i en åpningsuke.',
        isCorrect: false,
        feedback:
          'Feil. "Alle gjør alt" høres fleksibelt ut, men i praksis betyr det at ingen eier noe — og ting faller mellom to stoler. Klare ansvarsområder er spesielt viktig i hektiske perioder.',
      },
      {
        id: 'd',
        label:
          'De mest erfarne ansatte tar alle nøkkeloppgavene — nyansatte kan se på og lære.',
        isCorrect: false,
        feedback:
          'Feil. Å utelate nyansatte fra reelt ansvar bremser læring og demper motivasjon. Alle bør ha en tydelig og meningsfull rolle i teamet.',
      },
    ],
    espenTip:
      '⚠️ Et godt team dekker hverandres styrker og svakheter. Rolleavklaring er nøkkelen til effektivt samarbeid!',
  },
  {
    id: 'team-02',
    icon: '⚡',
    title: 'Konflikt mellom kollegaer',
    context:
      'To kollegaer på Kiwi — Marius og Sara — er uenige om vaktlista for julen. De slutter å snakke med hverandre og stemningen i teamet er dårlig. Avdelingsleder Therese har lagt merke til det.',
    question:
      'Marius og Sara nekter å kommunisere. Hva bør leder Therese gjøre?',
    choices: [
      {
        id: 'a',
        label:
          'Ignorere det og håpe at det løser seg selv — voksne folk klarer å legge bort uenigheter.',
        isCorrect: false,
        feedback:
          'Feil. Uløste konflikter eskalerer og smitter over på resten av teamet. Passiv ledelse er ikke nøytral — den tillater problemet å vokse.',
      },
      {
        id: 'b',
        label:
          'Kalle inn begge til et felles møte umiddelbart og la dem legge frem saken sin for hverandre.',
        isCorrect: false,
        feedback:
          'Feil som første steg. Å sette to parter som ikke kommuniserer i samme rom uten forberedelse kan føre til konfrontasjon. Start alltid med individuelle samtaler.',
      },
      {
        id: 'c',
        label:
          'Gi Marius og Sara nye skift slik at de aldri jobber sammen — da forsvinner problemet.',
        isCorrect: false,
        feedback:
          'Feil. Dette er en snarvei som ikke løser konflikten — den gjemmer den. Teamet taper fleksibilitet, og problemet vil dukke opp igjen.',
      },
      {
        id: 'd',
        label:
          'Ta en strukturert samtale med hver av dem separat for å forstå begge perspektiver, og deretter jobbe mot en felles løsning — gjerne med begge til stede i neste runde.',
        isCorrect: true,
        feedback:
          'Riktig! Individuelle samtaler gir hver part mulighet til å bli hørt uten press. Leder forstår saken fra begge sider og kan fasilitere en konstruktiv dialog i neste steg. Dette er god konflikthåndtering.',
      },
    ],
    espenTip:
      '⚠️ Et godt team dekker hverandres styrker og svakheter. Rolleavklaring er nøkkelen til effektivt samarbeid!',
  },
  {
    id: 'team-03',
    icon: '🌀',
    title: 'Tuckmans faser: Kaotisk nytt team',
    context:
      'Et nytt prosjektteam hos Equinor har jobbet sammen i tre uker. Det er mye diskusjon, folk er uenige om alt, ingen beslutninger tas og stemningen er spent. Prosjektlederen er frustrert.',
    question:
      'Teamet diskuterer mye men bestemmer ingenting. I hvilken av Tuckmans faser er de — og hva bør leder gjøre?',
    choices: [
      {
        id: 'a',
        label:
          'Forming-fasen — teamet er nytt og trenger mer tid til å bli kjent. Leder bør organisere sosiale aktiviteter.',
        isCorrect: false,
        feedback:
          'Feil. Forming kjennetegnes av høflighet og forsiktig tilpasning, ikke aktiv konflikt og fastlåste diskusjoner. Dette teamet er forbi forming.',
      },
      {
        id: 'b',
        label:
          'Norming-fasen — teamet holder på å etablere felles spilleregler. Leder bør la prosessen gå sin gang.',
        isCorrect: false,
        feedback:
          'Feil. Norming kjennetegnes av at normer begynner å feste seg og samarbeid øker. Her er konfliktnivået fortsatt høyt — det er et kjennetegn på storming.',
      },
      {
        id: 'c',
        label:
          'Performing-fasen — teamet er effektivt og jobber godt, men trenger litt justering av prosessen.',
        isCorrect: false,
        feedback:
          'Feil. Performing er fasen der teamet fungerer høyt og selvstendig. Et team uten beslutninger og med høy konflikt er langt fra der.',
      },
      {
        id: 'd',
        label:
          'Storming-fasen (Tuckmans modell) — dette er normalt i nye team. Leder bør klargjøre felles mål, roller og beslutningsprosesser.',
        isCorrect: true,
        feedback:
          'Riktig! Storming kjennetegnes av nettopp dette: uenighet, konkurrerende ideer og frustrasjon. Det er en naturlig og nødvendig fase. Lederens jobb er å kanalisere energien — klargjøre mål, roller og hvordan beslutninger tas.',
      },
    ],
    espenTip:
      '⚠️ Et godt team dekker hverandres styrker og svakheter. Rolleavklaring er nøkkelen til effektivt samarbeid!',
  },
  {
    id: 'team-04',
    icon: '🕐',
    title: 'Møter som alltid overskrider tida',
    context:
      'Teamet på et reisebyrå har ukentlige mandagsmøter. Møtene er satt til 45 minutter men varer alltid over en time og 15 minutter. Folk sitter igjen med mange uavklarte oppgaver og mister konsentrasjonen.',
    question:
      'Møtene sprengen alltid tida. Hva er det beste tiltaket?',
    choices: [
      {
        id: 'a',
        label:
          'Flytte møtene til fredag ettermiddag — da har folk mer tid og mindre å rekke.',
        isCorrect: false,
        feedback:
          'Feil. Tidspunktet er ikke problemet — strukturen er. Å flytte møtet løser ingenting hvis rutinene er de samme.',
      },
      {
        id: 'b',
        label:
          'Korte ned møtet til 20 minutter — kortere møter tvinger folk til å komme til poenget.',
        isCorrect: false,
        feedback:
          'Delvis riktig idé, men ikke det beste svaret. Å bare kutte tida uten å innføre struktur fører til at viktige saker ikke behandles ferdig.',
      },
      {
        id: 'c',
        label:
          'Sende ut en fast agenda 24 timer i forveien, sette en tidsbegrensning per sak, og ha en dedikert møteleder som holder tida.',
        isCorrect: true,
        feedback:
          'Riktig! Effektive møter krever forberedelse (agenda i forkant), struktur (tidsbegrensning per punkt) og ledelse (noen som holder tida). Alle tre elementene er nødvendige — ett alene er ikke nok.',
      },
      {
        id: 'd',
        label:
          'Avslutte møtet presist på tid uansett — hvis saker ikke er dekket, tas de neste uke.',
        isCorrect: false,
        feedback:
          'For rigid. Å avskjære viktige diskusjoner midt i er frustrerende og uproduktivt. Målet er bedre struktur, ikke hard stopp uten hensyn til innhold.',
      },
    ],
    espenTip:
      '⚠️ Et godt team dekker hverandres styrker og svakheter. Rolleavklaring er nøkkelen til effektivt samarbeid!',
  },
  {
    id: 'team-05',
    icon: '🏆',
    title: 'Anerkjennelse av god innsats',
    context:
      'Leder Kristoffer har lagt merke til at Jonas på kundeservice brukte en hel time ekstra på å hjelpe en svært krevende og forvirret eldre kunde med å bytte sitt gamle abonnement. Kunden gikk fornøyd derfra.',
    question:
      'Jonas gjorde en eksepsjonell jobb med en vanskelig kunde. Hva bør Kristoffer gjøre?',
    choices: [
      {
        id: 'a',
        label:
          'Si fra til HR slik at Jonas kan få en lønnsbonus — penger motiverer best.',
        isCorrect: false,
        feedback:
          'Feil som eneste tiltak. Monetær belønning alene er ikke det mest virkningsfulle for motivasjon. Dessuten hjelper det ikke resten av teamet å vite hva god service ser ut som.',
      },
      {
        id: 'b',
        label:
          'Si ingenting — Jonas vet selv at han gjorde en god jobb, og det er jo bare normal arbeidsplikt.',
        isCorrect: false,
        feedback:
          'Feil. Å ta god innsats for gitt demotiverer over tid. Anerkjennelse koster ingenting og har stor effekt på arbeidsmiljø og motivasjon.',
      },
      {
        id: 'c',
        label:
          'Si til Jonas privat i etterkant: "Bra jobba i dag" — det holder.',
        isCorrect: false,
        feedback:
          'Bedre enn ingenting, men ikke optimalt. Privat tilbakemelding er fin, men her er det en god mulighet til å løfte hele teamets forståelse av hva god service er.',
      },
      {
        id: 'd',
        label:
          'Gi Jonas konkret og synlig anerkjennelse i teamet — nevne hva han gjorde og hvorfor det var bra. Det motiverer Jonas og setter standarden for resten av teamet.',
        isCorrect: true,
        feedback:
          'Riktig! Synlig anerkjennelse i teamet har dobbel effekt: Jonas føler seg sett og verdsatt, og resten av teamet får et konkret eksempel på hva god innsats ser ut som. Det bygger en kultur der god service er normen.',
      },
    ],
    espenTip:
      '⚠️ Et godt team dekker hverandres styrker og svakheter. Rolleavklaring er nøkkelen til effektivt samarbeid!',
  },
]
