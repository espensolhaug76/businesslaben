import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const MARKEDSUNDERSOKELSE_EXERCISES: QuizExercise[] = [
  {
    id: 'markedsundersokelse-vg2-01',
    icon: '🍜',
    title: 'Primær vs. sekundærdata',
    context:
      'Du og teamet ditt vurderer å åpne et streetfood-konsept i Bergen rettet mot unge mellom 16 og 25 år. Dere skal gjennomføre en markedsundersøkelse før dere bestemmer dere.',
    question:
      'Hva er den beste datainnsamlingsmetoden for å forstå hva unge i Bergen tenker om det nye konseptet?',
    choices: [
      {
        id: 'a',
        label:
          'Kun sekundærdata fra SSB og bransjestatistikk — det er raskere og billigere enn å samle inn egne data.',
        isCorrect: false,
        feedback:
          'Sekundærdata gir god bakgrunnskontekst, men forteller deg ikke hva akkurat disse unge i Bergen faktisk synes om ditt spesifikke konsept. Du trenger primærdata for det.',
      },
      {
        id: 'b',
        label:
          'Kun observasjon av folk på streetfoodmarkeder — se hva de kjøper og trekk konklusjoner.',
        isCorrect: false,
        feedback:
          'Observasjon gir innsikt i atferd, men ikke i holdninger, preferanser eller betalingsvilje. Du vet ikke hvorfor folk kjøper det de kjøper.',
      },
      {
        id: 'c',
        label:
          'Primærdata i form av fokusgruppe med 8–12 unge + spørreskjema med minst 50 respondenter. SSB-data brukes som demografisk bakgrunnskontekst.',
        isCorrect: true,
        feedback:
          'Riktig! Kombinasjonen er gull: fokusgruppen avdekker dype meninger og nye idéer, mens spørreskjemaet kvantifiserer og generalisererer funnene. SSB-data gir deg den demografiske rammen.',
      },
      {
        id: 'd',
        label:
          'Spør venner og familie — de er mest ærlige og tilgjengelige.',
        isCorrect: false,
        feedback:
          'Feil. Venner og familie er ikke et representativt utvalg og vil ofte gi deg sosialt ønskelige svar. Dette er en klassisk skjevhet (bias) i markedsundersøkelser.',
      },
    ],
    espenTip:
      '⚠️ Data uten analyse er bare tall. Still de riktige spørsmålene BEFORE du samler inn data!',
  },
  {
    id: 'markedsundersokelse-vg2-02',
    icon: '📊',
    title: 'NPS-beregning',
    context:
      'En nettbutikk gjennomfører en kundetilfredshetsmåling med spørsmålet "Hvor sannsynlig er det at du anbefaler oss til en venn?" (skala 0–10). Resultatet: 40 % svarer 9–10 (promoters), 35 % svarer 7–8 (passive), 25 % svarer 0–6 (detractors).',
    question: 'Hva er NPS-scoren, og hva forteller den om bedriften?',
    choices: [
      {
        id: 'a',
        label:
          'NPS = 40 + 35 + 25 = 100. Maksimal score — alle kundene er fornøyde.',
        isCorrect: false,
        feedback:
          'Feil. NPS beregnes ikke ved å summere alle grupper. Formelen er: Promoters% − Detractors%. De passive teller ikke.',
      },
      {
        id: 'b',
        label:
          'NPS = 40 − 25 = 15. Positiv score, men under industri-benchmark på 50+. Det er tydelig forbedringspotensial.',
        isCorrect: true,
        feedback:
          'Riktig! NPS = Promoters% − Detractors% = 40 − 25 = 15. En positiv NPS er bra, men en score på 15 indikerer at mange kunder er nøytrale eller misfornøyde. Et mål bør være å flytte passive over til promoter-gruppen.',
      },
      {
        id: 'c',
        label:
          'NPS = 40 − 35 = 5. De passive er konkurrentene, og resultatet er kritisk lavt.',
        isCorrect: false,
        feedback:
          'Feil. De passive (7–8) trekkes ikke fra i NPS-formelen. Kun detractors (0–6) trekkes fra promoters (9–10).',
      },
      {
        id: 'd',
        label:
          'NPS = 75 − 25 = 50. Promoters og passive slås sammen mot detractors.',
        isCorrect: false,
        feedback:
          'Feil. I NPS-modellen er passive nøytrale og inngår ikke i beregningen. Kun promoters (9–10) minus detractors (0–6) gir NPS-scoren.',
      },
    ],
    espenTip:
      '⚠️ Data uten analyse er bare tall. Still de riktige spørsmålene BEFORE du samler inn data!',
  },
  {
    id: 'markedsundersokelse-vg2-03',
    icon: '❓',
    title: 'Ledende spørsmål i spørreskjema',
    context:
      'Et hotell sender ut en kundeundersøkelse etter opphold. Et av spørsmålene lyder: "Synes du ikke at vår service er utmerket og at du vil komme tilbake?"',
    question: 'Hva er det metodiske problemet med dette spørsmålet?',
    choices: [
      {
        id: 'a',
        label:
          'Spørsmålet er for langt og bør deles i to separate spørsmål.',
        isCorrect: false,
        feedback:
          'At spørsmålet stiller to ting på én gang (dobbelt spørsmål) er et problem, men det er ikke det mest alvorlige metodiske feilen her.',
      },
      {
        id: 'b',
        label:
          'Spørsmålet er ledende — formuleringen presser respondenten mot et positivt svar. Nøytral formulering som "Hvordan vurderer du servicen?" gir mer pålitelige data.',
        isCorrect: true,
        feedback:
          'Riktig! "Synes du ikke at..." er en klassisk ledende spørsmålskonstruksjon. Den forventede retningen er innebygd i spørsmålet, noe som skaper målefeil og gjør dataene ubrukelige til reell forbedring.',
      },
      {
        id: 'c',
        label:
          'Spørsmålet bruker feil måleskala — burde bruke 1–10 i stedet for ja/nei.',
        isCorrect: false,
        feedback:
          'Skalavalg er en teknisk beslutning, men det primære problemet her er at spørsmålet er ledende og ikke nøytralt formulert.',
      },
      {
        id: 'd',
        label:
          'Spørsmålet er for personlig og kan oppleves som et press på kunden til å si noe hyggelig.',
        isCorrect: false,
        feedback:
          'Det sosiale presset er en konsekvens av at spørsmålet er ledende, men selve fagbegrepet og problemet er at det er et ledende spørsmål — ikke at det er "personlig".',
      },
    ],
    espenTip:
      '⚠️ Data uten analyse er bare tall. Still de riktige spørsmålene BEFORE du samler inn data!',
  },
  {
    id: 'markedsundersokelse-vg2-04',
    icon: '🛒',
    title: 'Utvalg og representativitet',
    context:
      'En dagligvarebutikk vil undersøke kundetilfredsheten. De bestemmer seg for å stille spørsmål til kunder som handler mellom kl. 10.00 og 12.00 på hverdager.',
    question: 'Hva er det metodiske problemet med dette utvalget?',
    choices: [
      {
        id: 'a',
        label:
          'Utvalget er for lite — de burde spørre minst 1 000 kunder for at resultatet er gyldig.',
        isCorrect: false,
        feedback:
          'Utvalgsstørrelse er viktig, men det primære problemet her er hvem som er i utvalget — ikke hvor mange.',
      },
      {
        id: 'b',
        label:
          'Utvalget er ikke representativt — kveld- og helgekunder, yrkesaktive og barnefamilier er systematisk utelatt. Pensjonister og hjemmeværende er overrepresentert. Resultatet er skjevt (biased).',
        isCorrect: true,
        feedback:
          'Riktig! Et godt utvalg skal speile hele kundebasen. Ved kun å intervjue kunder midt på formiddagen på hverdager ekskluderer man alle som er på jobb eller skole — som trolig er flertallet av kundene.',
      },
      {
        id: 'c',
        label:
          'De burde ha brukt nettbasert spørreskjema i stedet for å snakke med folk i butikken.',
        isCorrect: false,
        feedback:
          'Metodevalget (personlig intervju vs. nettskjema) er ikke problemet her. Problemet er tidspunktets påvirkning på hvem som er tilgjengelig og dermed hvem utvalget representerer.',
      },
      {
        id: 'd',
        label:
          'Kunder er travle og vil ikke svare på spørsmål midt i handleturen — svarprosenten blir for lav.',
        isCorrect: false,
        feedback:
          'Lav svarprosent er en praktisk utfordring, men ikke det metodiske kjerneproblemet. Spørsmålet handler om utvalgets representativitet — ikke svarprosent.',
      },
    ],
    espenTip:
      '⚠️ Data uten analyse er bare tall. Still de riktige spørsmålene BEFORE du samler inn data!',
  },
  {
    id: 'markedsundersokelse-vg2-05',
    icon: '💸',
    title: 'Prissensitivitet og differensiering',
    context:
      'En nettbutikk for sportsutstyr gjennomfører en prisundersøkelse. 60 % av respondentene sier de ville byttet til en konkurrent dersom prisene økte med 15 %.',
    question: 'Hva er den viktigste strategiske konklusjonen av dette funnet?',
    choices: [
      {
        id: 'a',
        label:
          'Bedriften bør umiddelbart sette ned prisene med 15 % for å beholde kundene.',
        isCorrect: false,
        feedback:
          'Å senke prisene er ikke svaret — da svekkes marginen. Utfordringen er at produktet ikke er differensiert nok til å forsvare prisene som allerede finnes.',
      },
      {
        id: 'b',
        label:
          'Høy prissensitivitet signaliserer at produktet mangler sterk differensiering. Strategisk fokus bør være på å øke den opplevde verdien — ikke å konkurrere på pris alene.',
        isCorrect: true,
        feedback:
          'Riktig! Når kundene lett bytter ved prisøkning betyr det at de ikke ser nok unik verdi. Tiltak kan være bedre kundeservice, eksklusivt sortiment, lojalitetsprogram eller sterkere merkevarebygging.',
      },
      {
        id: 'c',
        label:
          'Undersøkelsen viser at 40 % er lojale — det er et sterkt resultat som ikke krever tiltak.',
        isCorrect: false,
        feedback:
          'Å tolke 40 % lojalitet som "sterkt" er en farlig feiltolkning. At 60 % er priselastiske er en alvorlig strategisk advarsel, spesielt i et konkurranseintensivt marked.',
      },
      {
        id: 'd',
        label:
          'Resultatet viser at kundene er fornøyde — de sier jo at de ville blitt hvis prisen holdes.',
        isCorrect: false,
        feedback:
          'Feil tolkning. At kunder blir ved uendret pris sier ingenting om tilfredshet — det sier bare at de aksepterer prisen i dag. 60 % byttevilje ved 15 % økning er et klart signal om manglende lojalitet.',
      },
    ],
    espenTip:
      '⚠️ Data uten analyse er bare tall. Still de riktige spørsmålene BEFORE du samler inn data!',
  },
]
