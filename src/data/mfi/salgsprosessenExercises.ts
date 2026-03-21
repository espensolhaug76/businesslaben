import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ En god selger lytter mer enn de snakker. Bruk 70% av tiden på spørsmål!'

export const SALGSPROSESSEN_EXERCISES: QuizExercise[] = [
  {
    id: 'salg-01',
    icon: '🤝',
    title: 'Kontaktfasen',
    context:
      'Du jobber som selger hos XXL Sport. En kunde kommer inn og ser seg rundt blant ryggsekker. Du har 30 sekunder på deg til å gjøre et godt førsteinntrykk.',
    question: 'Hva er den beste måten å ta kontakt med kunden på?',
    choices: [
      {
        id: 'a',
        label: 'Gå bort med en gang og presenter den nyeste og dyreste ryggsekken.',
        isCorrect: false,
        feedback:
          'Feil. Å pitche produkter umiddelbart før du vet hva kunden trenger, er å selge i blinde. Du risikerer å presentere feil produkt og miste tilliten.',
      },
      {
        id: 'b',
        label: 'La kunden se seg rundt alene — de spør selv hvis de trenger hjelp.',
        isCorrect: false,
        feedback:
          'Feil. Passiv tilnærming fører til at mange kunder forlater butikken uten å kjøpe. Kunder forventer proaktiv, men ikke påtrengende, service.',
      },
      {
        id: 'c',
        label:
          'Gi kunden 30 sekunder, etabler øyekontakt, smile og spør åpent: "Hva leter du etter i dag?"',
        isCorrect: true,
        feedback:
          'Riktig! Å gi kunden litt rom først viser respekt. Åpent spørsmål ("Hva leter du etter?") inviterer til dialog og gir deg informasjon om kundens behov — det er kontaktfasens mål.',
      },
      {
        id: 'd',
        label: 'Spør: "Skal du kjøpe noe i dag, eller bare se?"',
        isCorrect: false,
        feedback:
          'Feil. Dette er et lukket og defensivt spørsmål som setter kunden i forsvarsposisjon. Det signaliserer at du ikke er interessert i å hjelpe, bare i å selge.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'salg-02',
    icon: '🎒',
    title: 'Behovsavdekking',
    context:
      'Kunden hos XXL sier: "Jeg trenger en ny ryggsekk." Du er nå i behovsavdekkingsfasen og ønsker å finne ut mer.',
    question: 'Hva er den beste oppfølgingen for å avdekke kundens faktiske behov?',
    choices: [
      {
        id: 'a',
        label: '"Vil du ha en billig eller dyr en?"',
        isCorrect: false,
        feedback:
          'Feil. Å starte med pris er for tidlig i behovsavdekkingen. Du vet ennå ikke hva kunden faktisk trenger, og pris bør komme etter at behovet er kartlagt.',
      },
      {
        id: 'b',
        label: '"Skal du bruke den til skole, turer eller begge deler?"',
        isCorrect: true,
        feedback:
          'Riktig! Dette er et godt åpent behovsspørsmål som avdekker bruksområde — den viktigste faktoren for å anbefale riktig produkt. Du skaper dialog og viser genuint interesse for kundens situasjon.',
      },
      {
        id: 'c',
        label: '"Vi har mange flotte ryggsekker — la meg vise deg disse tre!"',
        isCorrect: false,
        feedback:
          'Feil. Du hopper over behovsavdekkingen og går rett til presentasjon. Uten å vite hva kunden trenger, anbefaler du i blinde og risikerer å anbefale feil produkt.',
      },
      {
        id: 'd',
        label: '"Er det en Fjällräven du er ute etter?"',
        isCorrect: false,
        feedback:
          'Feil. Dette er et ledende spørsmål som begrenser svarmulighetene. Kunden kan føle seg presset til å si ja, selv om de egentlig ikke hadde tenkt på det merket.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'salg-03',
    icon: '💼',
    title: 'Argumentasjon med FAB-modellen',
    context:
      'Kunden vurderer en Fjällräven Kånken til 1 099 kr. De fortalte deg at de trenger en sekk for daglige turer til skolen og er opptatt av slitestyrke.',
    question: 'Hvilken argumentasjon er best i henhold til FAB-modellen (Feature, Advantage, Benefit)?',
    choices: [
      {
        id: 'a',
        label: '"Kånken er veldig populær og mange kjøper den."',
        isCorrect: false,
        feedback:
          'Feil. Dette er sosial bevis, men ikke FAB-argumentasjon. Du kobler ikke produktets egenskaper til denne kundens spesifikke behov for slitestyrke og skolebruk.',
      },
      {
        id: 'b',
        label: '"Den er laget av Vinylon F-stoff (F), som er ekstremt slitesterkt (A) — så den holder hele skoleløpet ditt uten å gå i stykker (B)."',
        isCorrect: true,
        feedback:
          'Riktig! Dette er FAB-modellen i praksis: Feature (Vinylon F-stoff) → Advantage (slitesterkt) → Benefit (holder hele skoleløpet). Du kobler produktets egenskaper direkte til kundens uttalte behov.',
      },
      {
        id: 'c',
        label: '"Den finnes i mange farger og størrelser, så du finner sikkert en du liker."',
        isCorrect: false,
        feedback:
          'Feil. Farge og størrelse er irrelevant for denne kundens behov (slitestyrke). God argumentasjon handler om å koble riktige produktfordeler til kundens spesifikke behov.',
      },
      {
        id: 'd',
        label: '"1 099 kr er egentlig ikke så dyrt når man ser på kvaliteten."',
        isCorrect: false,
        feedback:
          'Feil. Du starter med pris-forsvar uten å ha bygget opp verdien av produktet. FAB-modellen sier at du skal argumentere for verdi FØR du diskuterer pris.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'salg-04',
    icon: '💬',
    title: 'Innvendingshåndtering',
    context:
      'Kunden vurderer fortsatt Fjällräven Kånken, men sier: "Den er litt dyr..." og ser usikker ut.',
    question: 'Hva er den beste måten å håndtere denne innvendingen på?',
    choices: [
      {
        id: 'a',
        label: '"Ja, den er dyr. Vi har billigere alternativer hvis du vil se på dem."',
        isCorrect: false,
        feedback:
          'Feil. Du kapitulerer umiddelbart og avleder fra produktet. Dette signaliserer at du ikke tror på produktets verdi, og du mister salget av en kunde som egentlig var interessert.',
      },
      {
        id: 'b',
        label: '"Jeg kan gi deg 10% rabatt hvis du kjøper nå."',
        isCorrect: false,
        feedback:
          'Feil. Å gi rabatt som første respons på en prisinnvending ødelegger marginen og lærer kunden at de alltid kan prute. Prøv å rettferdiggjøre verdien først.',
      },
      {
        id: 'c',
        label: '"Prisen gjenspeiler kvaliteten — det er en god investering."',
        isCorrect: false,
        feedback:
          'Feil. Dette er en defensiv og vag respons. Du sier ingenting konkret som hjelper kunden å forstå hvorfor prisen er verdt det for akkurat dem.',
      },
      {
        id: 'd',
        label: '"Jeg forstår at prisen er høy — men Kånken varer i 10+ år og har livstidsgaranti. Brukt per dag koster den deg under én krone. Det blir billigere over tid."',
        isCorrect: true,
        feedback:
          'Riktig! Du anerkjenner innvendingen (viser empati), men motargumenterer med konkret verdi: levetid, garanti og kostnad per bruk. Dette er profesjonell innvendingshåndtering som bygger tillit og rettferdiggjør prisen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'salg-05',
    icon: '🏁',
    title: 'Avslutningsteknikker',
    context:
      'Kunden har hatt en god samtale med deg og virker positiv til Kånken. Plutselig sier de: "Jeg må tenke litt på det..." og begynner å bevege seg mot utgangen.',
    question: 'Hvilken avslutningsteknikk er mest effektiv i denne situasjonen?',
    choices: [
      {
        id: 'a',
        label: '"Selvfølgelig! Ta den tiden du trenger. Ha en fin dag!"',
        isCorrect: false,
        feedback:
          'Feil. Dette er passiv aksept av at salget er tapt. Kunder som forlater butikken for å "tenke" kjøper sjelden produktet etterpå. Du gir opp for tidlig.',
      },
      {
        id: 'b',
        label: '"Hva er det du er usikker på? La oss se om vi kan løse det nå."',
        isCorrect: true,
        feedback:
          'Riktig! Dette kalles reversalt avslutning — du utfordrer nølingen ved å avdekke den underliggende bekymringen. Kunden sier sjelden hva de egentlig er usikre på, og dette spørsmålet gir deg mulighet til å løse den reelle innvendingen.',
      },
      {
        id: 'c',
        label: '"Vi har bare to igjen på lager — det er fort gjort at de er borte!"',
        isCorrect: false,
        feedback:
          'Feil. Falsk knapphetspress er uetisk og kan oppfattes som manipulerende. Dersom kunden oppdager at det ikke stemmer, mister du both salget og tilliten.',
      },
      {
        id: 'd',
        label: '"Vil du ha den i blå eller sort?" (forutsett kjøpet)',
        isCorrect: false,
        feedback:
          'Feil. Alternativt avslutning kan fungere i noen situasjoner, men her har kunden eksplisitt sagt at de vil tenke. Å ignorere dette og presse på vil oppleves som påtrengende og respektløst.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
