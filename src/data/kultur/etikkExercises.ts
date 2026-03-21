import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const ETIKK_EXERCISES: QuizExercise[] = [
  {
    id: 'etikk-01',
    icon: '🏦',
    title: 'Kollega tar fra kassen',
    context:
      'Du jobber kveldssjift i en dagligvarebutikk. De siste ukene har du lagt merke til at en kollega jevnlig åpner kassen uten å registrere noe salg og putter penger i lommen.',
    question:
      'Du er ganske sikker på at kollegaen stjeler fra kassen. Hva gjør du?',
    choices: [
      {
        id: 'a',
        label:
          'Konfrontere kollegaen direkte på lageret og si at de må slutte, ellers sier du fra.',
        isCorrect: false,
        feedback:
          'Feil. Å konfrontere kollegaen alene kan eskalere situasjonen og sette deg i en ubehagelig eller utrygg posisjon. Det er heller ikke din rolle å håndtere dette alene.',
      },
      {
        id: 'b',
        label:
          'Rapportere det du har observert til nærmeste leder eller verneombud — stiltiende aksept gjør deg medskyldig, og varsling er din rett og plikt.',
        isCorrect: true,
        feedback:
          'Riktig! Kassasvinn er tyveri, og det å se bort fra det kan gjøre deg medansvarlig. Arbeidsmiljøloven gir deg rett til å varsle om kritikkverdige forhold — og arbeidsgiver har plikt til å beskytte varsleren.',
      },
      {
        id: 'c',
        label:
          'Fortelle de andre kollegaene om det du har sett — jo flere som vet, jo raskere stoppes det.',
        isCorrect: false,
        feedback:
          'Feil. Å spre informasjon blant kollegaer er ikke varsling — det er sladder. Det kan svekke saken, skade omdømmet til den mistenkte unødvendig og skape et dårlig arbeidsmiljø.',
      },
      {
        id: 'd',
        label:
          'Ignorere det — det er ikke ditt ansvar, og du vil ikke havne i en ubehagelig konflikt på jobben.',
        isCorrect: false,
        feedback:
          'Feil. Passiv aksept av uetisk atferd gjør deg indirekte medskyldig. Det er også urettferdig overfor butikken og alle ærlige kolleger.',
      },
    ],
    espenTip:
      '⚠️ Yrkesstolthet betyr å gjøre det rette også når ingen ser på. Din integritet er din viktigste ressurs!',
  },
  {
    id: 'etikk-02',
    icon: '🏷️',
    title: 'Feilmerket pris på Dyson-støvsuger',
    context:
      'Du åpner butikken om morgenen og oppdager at en Dyson-støvsuger er priset til 499 kr på hylla. Den riktige prisen er 4 990 kr. En kollega har tydeligvis glemt en null. Det er allerede tre kunder i butikken som har lagt den i handlekurven.',
    question:
      'Dyson-støvsugeren er feilpriset. Du oppdager det mens kunder allerede har plukket den opp. Hva gjør du?',
    choices: [
      {
        id: 'a',
        label:
          'La kundene kjøpe til 499 kr — butikken er bundet av hylleprisen, og det er bedre for omdømmet enn en konflikt.',
        isCorrect: false,
        feedback:
          'Feil i denne konteksten. Prisloven sier at butikken er bundet av oppgitt pris — men det gjelder kun ved kassen. Frem til kunden betaler kan butikken korrigere en åpenbar feil. Å selge til 499 kr vil gi et tap på over 13 000 kr om alle tre kjøper.',
      },
      {
        id: 'b',
        label:
          'Informere leder umiddelbart, rette prisen og beklage overfor kunder som allerede har plukket varen — forklar at det var en trykkfeil.',
        isCorrect: true,
        feedback:
          'Riktig! En åpenbar feil (nesten 90% avvik) gir butikken rett til å korrigere prisen før salget er gjennomført. Du er ærlig, rask og profesjonell. Kunden settes ikke i en vanskelig situasjon.',
      },
      {
        id: 'c',
        label:
          'Fjerne støvsugeren diskret fra hyllen og si ingenting — problemet løser seg selv.',
        isCorrect: false,
        feedback:
          'Feil. Å skjule feilen uten å si fra til leder eller berørte kunder er uetisk. Kunder som allerede har plukket varen kan bli sinte og forvirret ved kassen.',
      },
      {
        id: 'd',
        label:
          'Vente til leder kommer på jobb — det er ikke din beslutning å ta.',
        isCorrect: false,
        feedback:
          'Feil. Det er allerede kunder i butikken med feilpriset vare. Å vente passivt forverrer situasjonen. Ta initiativ og kontakt leder med en gang — det er god yrkesetikk.',
      },
    ],
    espenTip:
      '⚠️ Yrkesstolthet betyr å gjøre det rette også når ingen ser på. Din integritet er din viktigste ressurs!',
  },
  {
    id: 'etikk-03',
    icon: '🤫',
    title: 'Uoffisiell rabatt',
    context:
      'Du jobber som selger i en sportsbutikk. En hyggelig stamkunde du kjenner godt ler og sier: "Kom igjen, gi meg 10% ekstra på denne jakken — mellom oss, ingen trenger å vite det."',
    question:
      'Stamkunden ber om en uoffisiell rabatt "mellom dere". Hva svarer du?',
    choices: [
      {
        id: 'a',
        label:
          'Gi rabatten — stamkunder fortjener litt ekstra, og det er jo bare 10%.',
        isCorrect: false,
        feedback:
          'Feil. Å gi uautoriserte rabatter er å ta seg til rette med butikkens midler. Det er uetisk og kan regnes som underslag — uavhengig av beløpets størrelse.',
      },
      {
        id: 'b',
        label:
          '"Jeg kan dessverre ikke gi rabatter utenom kampanjer — det er ikke rettferdig overfor andre kunder og strider mot butikkens retningslinjer. Men meld deg på loyalitetsprogrammet vårt!"',
        isCorrect: true,
        feedback:
          'Riktig! Du er ærlig og tydelig uten å være kald. Ved å foreslå et legitimt alternativ viser du at du vil hjelpe — innenfor rammene. Det er profesjonell integritet i praksis.',
      },
      {
        id: 'c',
        label:
          'Si at du kan gi rabatten, men bare hvis kunden lover å kjøpe noe mer neste gang.',
        isCorrect: false,
        feedback:
          'Feil. Dette er en uoffisiell avtale som er like uetisk som alternativ A. Du kan ikke bruke butikkens priser som personlig byttemiddel.',
      },
      {
        id: 'd',
        label:
          'Spørre lederen din i det skjulte om det er greit — hvis leder sier ja, gjør du det.',
        isCorrect: false,
        feedback:
          'Nær, men ikke helt. I prinsippet kan du spørre leder om å godkjenne en rabatt. Men å gjøre det "i det skjulte" signaliserer at du allerede vet det ikke er greit. Be heller kunden vente og spør leder åpent.',
      },
    ],
    espenTip:
      '⚠️ Yrkesstolthet betyr å gjøre det rette også når ingen ser på. Din integritet er din viktigste ressurs!',
  },
  {
    id: 'etikk-04',
    icon: '📋',
    title: 'Feil i konkurrentens brosjyre',
    context:
      'Du jobber i markedsføring for et reisebyrå. Under markedsresearch oppdager du at en konkurrent har en feil i sin faglige brosjyre — de hevder et bestemmelsessted er visumfritt for norske statsborgere, men det er det ikke lenger.',
    question:
      'Du vet at konkurrenten har feil fakta i brosjyren sin. Hva gjør du?',
    choices: [
      {
        id: 'a',
        label:
          'Si fra til konkurrenten — det er uansvarlig å la norske turister reise med feil informasjon.',
        isCorrect: false,
        feedback:
          'Edelt, men ikke juridisk påkrevd. Du er ikke forpliktet til å varsle en konkurrent. Det er heller ikke galt å gjøre det, men det er ikke standardforventningen i næringslivet.',
      },
      {
        id: 'b',
        label:
          'Bruke feilen aktivt i egen markedsføring: "Hos oss får du riktig visuminformasjon — i motsetning til andre."',
        isCorrect: false,
        feedback:
          'Feil. Dette er villedende sammenlignende reklame og kan bryte markedsføringsloven. Det er dessuten uetisk å bygge markedsføring på konkurrentens feil.',
      },
      {
        id: 'c',
        label:
          'Du er ikke forpliktet til å varsle konkurrenten, men du bør heller ikke aktivt bruke feilen i markedsføringen din — det er uetisk og potensielt ulovlig.',
        isCorrect: true,
        feedback:
          'Riktig! Du har ingen juridisk varslerplikt overfor konkurrenter. Men å aktivt utnytte feilen i markedsføring er i strid med god forretningsskikk og markedsføringsloven. Den etiske linjen er klar: ikke utnytt andres feil til å villede markedet.',
      },
      {
        id: 'd',
        label:
          'Publisere en generell informasjonsartikkel om visumregler uten å nevne konkurrenten — da hjelper du kundene uten å ta stilling.',
        isCorrect: false,
        feedback:
          'Dette er faktisk en god løsning i praksis, men det er ikke det beste svaret på hva som er etisk korrekt i denne situasjonen. Alternativ C svarer mer presist på det etiske dilemmaet.',
      },
    ],
    espenTip:
      '⚠️ Yrkesstolthet betyr å gjøre det rette også når ingen ser på. Din integritet er din viktigste ressurs!',
  },
  {
    id: 'etikk-05',
    icon: '📱',
    title: 'Kollega klager på kunde i sosiale medier',
    context:
      'Du er på vei hjem fra jobb og scroller gjennom Facebook. Du ser at en kollega har postet: "Herregud, noen kunder er SÅ irriterende. Skjønner ikke hvorfor vi skal finne oss i den oppførselen 🙄" — med en detaljert beskrivelse av en hendelse som skjedde i dag. Profilen er "privat" men mange kollegaer og bekjente kan se det.',
    question:
      'Kollega har postet frustrert om en kunde på privat Facebook. Du ser det. Hva gjør du?',
    choices: [
      {
        id: 'a',
        label:
          'Liker posten og kommenterer "haha, kjente meg igjen!" — kollegaen trenger å føle seg støttet.',
        isCorrect: false,
        feedback:
          'Feil. Å like eller kommentere gjør deg medskyldig i spredningen. Det kan også sees av felles bekjente og gjøre skaden større.',
      },
      {
        id: 'b',
        label:
          'Si fra til kollegaen privat — forklare at posten kan skade bedriftens omdømme og potensielt bryte taushetsplikten og GDPR.',
        isCorrect: true,
        feedback:
          'Riktig! Den beste tilnærmingen er å ta det direkte med kollegaen — ikke over hodet deres. Kunden kan identifiseres av de som var tilstede. Dette kan bryte GDPR (personopplysningsloven) og taushetsplikten som gjelder i de fleste servicenæringer.',
      },
      {
        id: 'c',
        label:
          'Dele posten videre med en kommentar: "Skjønner deg, men kanskje ikke smart å poste dette?"',
        isCorrect: false,
        feedback:
          'Feil. Å dele posten videre — selv med en advarsel — sprer innholdet ytterligere og gjør situasjonen verre.',
      },
      {
        id: 'd',
        label:
          'Ignorere det — det er kollegas private profil og din sak er det ikke.',
        isCorrect: false,
        feedback:
          'Feil. "Privat profil" fritar ikke fra ansvar. Bedriften kan holdes ansvarlig for ansattes publisering om kunder, og kollegaen din risikerer alvorlige konsekvenser. Et vennlig privat tips er det rette å gjøre.',
      },
    ],
    espenTip:
      '⚠️ Yrkesstolthet betyr å gjøre det rette også når ingen ser på. Din integritet er din viktigste ressurs!',
  },
]
