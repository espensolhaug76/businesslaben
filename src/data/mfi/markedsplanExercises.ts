import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP =
  '⚠️ Et mål uten tidsfrist er bare en drøm. SMART-mål er ryggraden i enhver markedsplan!'

export const MARKEDSPLAN_EXERCISES: QuizExercise[] = [
  {
    id: 'mplan-01',
    icon: '🎯',
    title: 'SMART-mål',
    context:
      'Startup-bedriften FreshBox skal lage sin første markedsplan. I møtet foreslår noen: "Målet vårt er å få flere kunder og bli mer kjent." Markedssjefen rister på hodet.',
    question: 'Hvorfor er "vi vil ha flere kunder og bli mer kjent" et dårlig markedsmål?',
    choices: [
      {
        id: 'a',
        label: 'Fordi det er for ambisiøst — man bør starte med små mål.',
        isCorrect: false,
        feedback:
          'Feil. Problemet er ikke ambisjonsnivået, men at målet mangler de konkrete egenskapene som gjør det brukbart. Et mål kan godt være ambisiøst, men det MÅ være målbart og tidsavgrenset for at man skal vite om man lykkes.',
      },
      {
        id: 'b',
        label: 'Fordi det er negativt formulert — mål bør alltid være positive.',
        isCorrect: false,
        feedback:
          'Feil. Formuleringen er faktisk positiv. Problemet ligger i at målet mangler presisjon: Hvor mange nye kunder? Innen når? Hvordan måler vi "mer kjent"? Uten dette kan man ikke evaluere om man har lykkes.',
      },
      {
        id: 'c',
        label:
          'Fordi det ikke er SMART: det er ikke målbart (ingen tall), ikke tidsavgrenset (ingen frist) og ikke spesifikt nok til å styre innsatsen.',
        isCorrect: true,
        feedback:
          'Riktig! SMART-rammeverket krever at mål er Spesifikke, Målbare, Oppnåelige, Relevante og Tidsavgrensede. Et godt SMART-mål ville vært: "Øke antall nye abonnenter med 200 i løpet av Q2 2025 via Instagram-kampanje."',
      },
      {
        id: 'd',
        label: 'Fordi markedsplanen allerede har for mange mål.',
        isCorrect: false,
        feedback:
          'Feil. Antall mål er ikke problemet her — kvaliteten på målet er. Selv ett dårlig formulert mål er ubrukbart, mens fem godt formulerte SMART-mål kan gi klar retning for hele teamet.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mplan-02',
    icon: '🎯',
    title: 'Målgruppevalg',
    context:
      'StartUp Energi lanserer en ny energidrikk kalt "VOLT". Grunnleggerne sier: "Vi vil nå absolutt alle — fra studenter til pensjonister!" De har et budsjett på 80 000 kr.',
    question: 'Hva er den beste markedsstrategien for VOLT med dette budsjettet?',
    choices: [
      {
        id: 'a',
        label: 'Spre budsjettet jevnt på TV, radio, aviser og sosiale medier for å nå flest mulig.',
        isCorrect: false,
        feedback:
          'Feil. Med 80 000 kr vil du ikke nå nok mennesker på noen av kanalene til å skape effekt. "Spray and pray"-strategien er ineffektiv for small-budget bedrifter og gir sjelden målbar avkastning.',
      },
      {
        id: 'b',
        label:
          'Velg ett primærsegment (f.eks. 18–25 år, aktive studenter) og tilpass budskap og kanal til dem — ikke prøv å nå alle.',
        isCorrect: true,
        feedback:
          'Riktig! Segmentering handler om å bruke ressursene der de gir størst effekt. Ved å fokusere på én primærmålgruppe kan du lage et mer relevant budskap, velge riktig kanal (f.eks. TikTok/Instagram) og måle resultatene presist. Senere kan du utvide til nye segmenter.',
      },
      {
        id: 'c',
        label: 'Bruk alle midlene på én stor TV-reklame for maksimal synlighet.',
        isCorrect: false,
        feedback:
          'Feil. TV-reklame er svært kostbar og rettet mot et bredt, udifferensiert publikum. For en ny merkevare med begrenset budsjett vil denne strategien gi for lav kostnad-per-kjøp og liten mulighet til å optimalisere underveis.',
      },
      {
        id: 'd',
        label: 'Ikke bruke penger på markedsføring ennå — vent til produktet er mer kjent.',
        isCorrect: false,
        feedback:
          'Feil. Produkter blir ikke kjente av seg selv. Uten markedsføring skjer det ingenting. Poenget er ikke om man skal markedsføre, men hvordan man gjør det smart innenfor budsjettet.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mplan-03',
    icon: '✂️',
    title: 'Kanalvalg og budsjett',
    context:
      'Ny lokal frisørsalong "Klippekunst" åpner i Trondheim sentrum. De har 5 000 kr i markedsføringsbudsjett og ønsker å nå lokale kunder raskt.',
    question: 'Hvilken markedsføringsstrategi gir best lokalt gjennomslag for 5 000 kr?',
    choices: [
      {
        id: 'a',
        label: 'Kjøp en helsides annonse i Adresseavisen — stor lokal avis med mange lesere.',
        isCorrect: false,
        feedback:
          'Feil. En helsides avisannonse koster gjerne 15 000–50 000 kr og vil spise opp hele budsjettet og mer. Aviser har også fallende opplag og når ikke primærmålgruppen (18–45 år) effektivt.',
      },
      {
        id: 'b',
        label: 'Bruk pengene på nasjonal influencer-kampanje for maksimal rekkevidde.',
        isCorrect: false,
        feedback:
          'Feil. En nasjonal kampanje er ikke relevant for en lokal frisørsalong. Det nytter ikke at folk i Bergen og Oslo vet om salongën i Trondheim. Lokal relevans er nøkkelen her.',
      },
      {
        id: 'c',
        label: 'Send ut reklamepostkort til alle husstander i nærområdet.',
        isCorrect: false,
        feedback:
          'Feil. Direct mail er dyrt (produksjon + porto) og har lav svarprosent. Det er vanskelig å måle effekten, og det gir ingen mulighet til digital interaksjon som bestilling av time eller deling.',
      },
      {
        id: 'd',
        label:
          'Instagram (lokal geo-targeting mot Trondheim) + Google My Business-profil (gratis lokal SEO) — høy lokal rekkevidde til lav kostnad med målbare resultater.',
        isCorrect: true,
        feedback:
          'Riktig! Instagram med geografisk targeting lar deg nå folk i Trondheim spesifikt for noen hundre kroner. Google My Business er gratis og avgjørende for lokal synlighet i søk ("frisør Trondheim"). Denne kombinasjonen gir best ROI for et lite lokalbudsjett.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mplan-04',
    icon: '📋',
    title: 'Hva mangler i markedsplanen?',
    context:
      'Studentbedriften "PizzaRun" har laget sin første markedsplan. Den inneholder: tydelig SMART-mål, definert målgruppe (studenter 18–25) og valgt kanal (Snapchat og Instagram). Veilederen sier planen er ikke ferdig.',
    question: 'Hva mangler i PizzaRuns markedsplan for at den skal være komplett?',
    choices: [
      {
        id: 'a',
        label: 'De mangler et konkurranse-avsnitt som beskriver Dominos og Peppes.',
        isCorrect: false,
        feedback:
          'Feil. Konkurranseanalyse er nyttig som bakgrunn, men er ikke en kjernedel av selve markedsplanen. Veilederen etterlyser noe mer operasjonelt og målbart.',
      },
      {
        id: 'b',
        label: 'De mangler en bedriftshistorie og "om oss"-seksjon.',
        isCorrect: false,
        feedback:
          'Feil. En "om oss"-seksjon hører hjemme i en forretningsplan eller presentasjon, ikke i en markedsplan. Markedsplanen fokuserer på hva man skal gjøre, til hvem, med hva og hvordan man måler resultatet.',
      },
      {
        id: 'c',
        label: 'De mangler flere sosiale mediekanaler — TikTok og YouTube burde vært med.',
        isCorrect: false,
        feedback:
          'Feil. Å legge til flere kanaler løser ikke problemet. Planen mangler noe fundamentalt som ikke handler om å velge flere kanaler, men om å strukturere gjennomføringen og evaluere resultater.',
      },
      {
        id: 'd',
        label:
          'Budsjett (hva koster det?), tidslinje (når skjer hva?) og KPIer (hvordan måler vi suksess?) — uten disse vet man ikke om planen lykkes.',
        isCorrect: true,
        feedback:
          'Riktig! En komplett markedsplan inneholder alltid: mål, målgruppe, kanaler, budsjett, tidslinje og KPIer (Key Performance Indicators). Uten budsjett vet man ikke hva det koster, uten tidslinje vet man ikke når, og uten KPIer vet man ikke om man lykkes.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mplan-05',
    icon: '📊',
    title: 'Evaluering av kampanje — NPS',
    context:
      'Etter en tre måneder lang kampanje for den nye energidrikken VOLT måler man resultater. Net Promoter Score (NPS) gikk fra 32 til 51. Teamet er usikre på om dette er bra.',
    question: 'Hva betyr endringen i NPS, og var kampanjen vellykket?',
    choices: [
      {
        id: 'a',
        label: 'NPS på 51 er middelmådig — man bør sikte på 100 for å lykkes.',
        isCorrect: false,
        feedback:
          'Feil. NPS er en skala fra -100 til +100. En NPS over 50 regnes som "excellent" i de fleste bransjer. Svært få merker når over 70–80. En NPS på 51 er et sterkt resultat.',
      },
      {
        id: 'b',
        label:
          'NPS-økning på 19 poeng er stor — NPS over 50 regnes som "excellent". Kampanjen bidro tydelig til økt kundetilfredshet og lojalitet.',
        isCorrect: true,
        feedback:
          'Riktig! Net Promoter Score måler hvor sannsynlig det er at kunder vil anbefale produktet til andre. En økning fra 32 til 51 er 19 poeng — en betydelig forbedring. NPS over 50 klassifiseres som "excellent", og dette indikerer at kampanjen lyktes med å bygge merkevarelojalitet.',
      },
      {
        id: 'c',
        label: 'NPS måler bare om folk liker logoen — ikke kampanjens effekt.',
        isCorrect: false,
        feedback:
          'Feil. NPS (Net Promoter Score) er et av de mest brukte måleinstrumentene for kundetilfredshet og lojalitet. Det måles ved spørsmålet: "Hvor sannsynlig er det at du vil anbefale oss til en venn?" — en kraftig indikator på fremtidig vekst.',
      },
      {
        id: 'd',
        label: 'Vi kan ikke si noe om kampanjen uten å vite antall nye kunder.',
        isCorrect: false,
        feedback:
          'Feil. Antall nye kunder er én KPI, men NPS måler noe annet og like viktig: kvaliteten på kundeopplevelsen og sannsynligheten for organisk vekst gjennom anbefalinger. Begge KPIer er verdifulle og komplementerer hverandre.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
