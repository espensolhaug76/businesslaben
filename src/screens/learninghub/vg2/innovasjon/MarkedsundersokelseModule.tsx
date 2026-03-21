import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔎',
    title: 'Primær vs sekundær markedsundersøkelse',
    quote: 'Svar finnes kanskje allerede — spørsmålet er om de er gode nok for deg.',
    content: 'Primærdata samles inn selv fra kilden — dyrt og tidkrevende, men fersk og skreddersydd. Sekundærdata er allerede eksisterende informasjon — raskere og billigere, men kan være utdatert eller for generell.',
    subpoints: [
      'PRIMÆRDATA: Samles inn via spørreundersøkelse, intervju eller observasjon — fersk, relevant, men kostbar',
      'SEKUNDÆRDATA: Eksisterende kilder som SSB, Kantar-rapporter eller bransjestatistikk — rask tilgang',
      'KOMBINASJON: De fleste profesjonelle undersøkelser starter med sekundær og supplerer med primær',
    ],
    practical: 'Neste gang du starter et prosjekt: sjekk alltid om dataene allerede finnes (SSB, bransjeorganisasjoner) før du lager en spørreundersøkelse.',
    glossaryTerm: 'Markedsundersokelse',
    exercises: [
      {
        id: 'mu-1-1',
        question: 'Hva er primærdata i markedsundersøkelse?',
        choices: [
          { id: 'a', text: 'Data fra SSB og andre offentlige registre' },
          { id: 'b', text: 'Data samlet inn direkte fra kilden for ditt spesifikke formål' },
          { id: 'c', text: 'Historiske data fra tidligere undersøkelser' },
          { id: 'd', text: 'Data kjøpt fra analysebyrå' },
        ],
        correctId: 'b',
        explanation: 'Primærdata er informasjon du samler inn selv, direkte fra respondenter, tilpasset ditt spesifikke formål.',
      },
      {
        id: 'mu-1-2',
        question: 'En bedrift vil forstå bransjens generelle trender raskt. Hva er best egnet?',
        choices: [
          { id: 'a', text: 'Primærdata — gjennomfør en spørreundersøkelse' },
          { id: 'b', text: 'Sekundærdata — bransjestatistikk og Kantar-rapporter' },
          { id: 'c', text: 'Dybdeintervjuer med kunder' },
          { id: 'd', text: 'Observasjonsstudier' },
        ],
        correctId: 'b',
        explanation: 'Sekundærdata er raskere og billigere for generelle trendanalyser — bransjestatistikk og eksisterende rapporter gir raskt overblikk.',
      },
      {
        id: 'mu-1-3',
        question: 'Hva er den viktigste ulempen med sekundærdata?',
        choices: [
          { id: 'a', text: 'Det er for dyrt å bruke' },
          { id: 'b', text: 'Det kan være utdatert eller for generelt for ditt spesifikke behov' },
          { id: 'c', text: 'Det er vanskelig å finne' },
          { id: 'd', text: 'Det er upålitelig' },
        ],
        correctId: 'b',
        explanation: 'Sekundærdata kan mangle presisjon — dataene er ikke samlet inn for ditt spesifikke formål og kan være utdatert.',
      },
      {
        id: 'mu-1-4',
        question: 'NRK starter med Kantar-paneldata og bestiller deretter primærforskning. Hva er dette?',
        choices: [
          { id: 'a', text: 'En feil tilnærming — man bør velge ett av alternativene' },
          { id: 'b', text: 'Klok kombinasjon: sekundær gir overblikk, primær gir dybde der det trengs' },
          { id: 'c', text: 'Dobbel nedfall av tid og ressurser' },
          { id: 'd', text: 'Det er kun relevant for store selskaper' },
        ],
        correctId: 'b',
        explanation: 'Den klokeste tilnærmingen er å starte med billig sekundærdata for overblikk, og supplere med primærdata der hullene er størst.',
      },
      {
        id: 'mu-1-5',
        question: 'Rema 1000 bruker paneler på 200 000+ for å teste produkter digitalt. Hva slags data er dette?',
        choices: [
          { id: 'a', text: 'Sekundærdata fra offentlige registre' },
          { id: 'b', text: 'Primærdata samlet inn spesifikt for å vurdere produktlansering' },
          { id: 'c', text: 'Intern statistikk fra salgsdata' },
          { id: 'd', text: 'Data fra leverandørene' },
        ],
        correctId: 'b',
        explanation: 'Når Rema 1000 tester nye produkter mot spesifikke paneler, samler de inn primærdata — ny, skreddersydd informasjon for deres beslutning.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📊',
    title: 'Kvantitative metoder',
    quote: 'Tall gir bredde — men bare riktig stilte spørsmål gir riktige tall.',
    content: 'Kvantitative metoder samler inn målbare data fra mange respondenter for å trekke statistiske slutninger. Spørreundersøkelsen er den vanligste formen og bruker skalaer, flervalg og rangering.',
    subpoints: [
      'UTVALGSSTØRRELSE: Større utvalg gir lavere feilmargin — men etter ca. 1000 flater forbedringen ut',
      'SPØRSMÅLSDESIGN: Unngå ledende, doble eller tvetydige spørsmål — de ødelegger datakvaliteten',
      'SKALATYPER: Likert-skala (1–5) for holdninger; NPS (0–10) for kundelojalitet',
    ],
    practical: 'Test alltid spørreskjemaet på 5–10 personer internt før utsending. Misforståtte spørsmål oppdages nesten alltid i piloten.',
    exercises: [
      {
        id: 'mu-2-1',
        question: 'Hva er formålet med kvantitative markedsundersøkelser?',
        choices: [
          { id: 'a', text: 'Å forstå dyp motivasjon hos enkeltpersoner' },
          { id: 'b', text: 'Å samle målbare data fra mange respondenter for statistiske slutninger' },
          { id: 'c', text: 'Å observere kundeatferd i butikk' },
          { id: 'd', text: 'Å gjennomføre dybdesamtaler med kunder' },
        ],
        correctId: 'b',
        explanation: 'Kvantitative metoder gir bredde — målbare data fra store utvalg som gir grunnlag for statistiske slutninger om en større gruppe.',
      },
      {
        id: 'mu-2-2',
        question: 'Et spørsmål lyder: "Syns du ikke at vår service er ekstraordinært god?" Hva er problemet?',
        choices: [
          { id: 'a', text: 'Spørsmålet er for kort' },
          { id: 'b', text: 'Det er et ledende spørsmål som systematisk vrir svarene' },
          { id: 'c', text: 'Spørsmålet er for komplisert' },
          { id: 'd', text: 'Det er ingen problemer med spørsmålet' },
        ],
        correctId: 'b',
        explanation: 'Ledende spørsmål presser respondenten mot et bestemt svar og ødelegger datakvaliteten stille og effektivt.',
      },
      {
        id: 'mu-2-3',
        question: 'Hva er Likert-skalaen brukt til?',
        choices: [
          { id: 'a', text: 'Å rangere konkurrenter' },
          { id: 'b', text: 'Å måle holdninger og grad av enighet/uenighet (1–5)' },
          { id: 'c', text: 'Å beregne NPS-score' },
          { id: 'd', text: 'Å telle antall respondenter' },
        ],
        correctId: 'b',
        explanation: 'Likert-skalaen (1 = svært uenig til 5 = svært enig) er standard for å måle holdninger og grad av enighet i spørreundersøkelser.',
      },
      {
        id: 'mu-2-4',
        question: 'Hva er NPS (Net Promoter Score)?',
        choices: [
          { id: 'a', text: 'Et finansielt nøkkeltall for bedriften' },
          { id: 'b', text: 'Et mål (0–10) på kundelojalitet og vilje til å anbefale' },
          { id: 'c', text: 'En skala for produktkvalitet' },
          { id: 'd', text: 'En type spørreundersøkelse' },
        ],
        correctId: 'b',
        explanation: 'NPS (0–10) måler kundelojalitet ved å spørre: "Hvor sannsynlig er det at du anbefaler oss til andre?" Poengsummen beregnes fra svardistribusjonen.',
      },
      {
        id: 'mu-2-5',
        question: 'Hvorfor er det viktig å pilot-teste spørreskjemaet internt?',
        choices: [
          { id: 'a', text: 'For å spare penger' },
          { id: 'b', text: 'Misforståtte spørsmål oppdages nesten alltid i piloten, ikke i analysen' },
          { id: 'c', text: 'Det er et lovkrav' },
          { id: 'd', text: 'For å øke antall respondenter' },
        ],
        correctId: 'b',
        explanation: 'Pilot-testing avdekker uklare, tvetydige eller misforståtte spørsmål før de ødelegger hele datasettet.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🗣️',
    title: 'Kvalitative metoder',
    quote: 'Kvantitativt sier hva og hvor mange — kvalitativt sier hvorfor.',
    content: 'Kvalitative metoder gir dybdeforståelse som tall alene ikke kan gi. Dybdeintervju, fokusgruppe og observasjon lar deg forstå motivasjon, holdninger og atferd på et dypere nivå.',
    subpoints: [
      'DYBDEINTERVJU: Rike, personlige innsikter — nyttig for sensitive temaer og komplekse beslutninger',
      'FOKUSGRUPPE: Avdekker sosiale normer, men dominanseffekten er en metodisk risiko',
      'OBSERVASJON: Mystery shopping viser hva folk faktisk gjør, ikke hva de tror de gjør',
    ],
    practical: 'Bruk kvalitativ metode tidlig for å forstå problemet, og kvantitativ etterpå for å måle omfanget.',
    exercises: [
      {
        id: 'mu-3-1',
        question: 'Hva er det unike bidrage fra kvalitative metoder?',
        choices: [
          { id: 'a', text: 'Å nå et stort antall respondenter' },
          { id: 'b', text: 'Dybdeforståelse — å forstå HVORFOR folk tenker og handler som de gjør' },
          { id: 'c', text: 'Å produsere statistisk generaliserbare resultater' },
          { id: 'd', text: 'Å måle markedsandeler' },
        ],
        correctId: 'b',
        explanation: 'Kvalitative metoder gir dybdeforståelse — de avdekker motivasjon, underliggende holdninger og årsaker som talldata ikke kan forklare.',
      },
      {
        id: 'mu-3-2',
        question: 'Vinmonopolet brukte dybdeintervjuer og oppdaget at kunder ikke mislikte ventetiden, men følelsen av å bli dømt. Hva illustrerer dette?',
        choices: [
          { id: 'a', text: 'At dybdeintervjuer er unødvendige' },
          { id: 'b', text: 'At kvalitative metoder avdekker innsikter som talldata aldri ville gitt' },
          { id: 'c', text: 'At Vinmonopolet hadde dårlig service' },
          { id: 'd', text: 'At kunder alltid lyver i spørreundersøkelser' },
        ],
        correctId: 'b',
        explanation: 'Dybdeintervjuet avdekket den reelle årsaken til misnøye — noe som ville vært umulig å oppdage med en spørreundersøkelse alene.',
      },
      {
        id: 'mu-3-3',
        question: 'Hva er "dominanseffekten" i fokusgrupper?',
        choices: [
          { id: 'a', text: 'At moderatoren kontrollerer for mye' },
          { id: 'b', text: 'At én sterk stemme dominerer og påvirker hele gruppens svar' },
          { id: 'c', text: 'At fokusgrupper gir for bredt perspektiv' },
          { id: 'd', text: 'At deltakere ikke ønsker å delta' },
        ],
        correctId: 'b',
        explanation: 'Dominanseffekten er en metodisk risiko i fokusgrupper: én sterk stemme kan påvirke hele gruppens svar og gi et skjevt bilde av holdningene.',
      },
      {
        id: 'mu-3-4',
        question: 'Hva er mystery shopping?',
        choices: [
          { id: 'a', text: 'En type spørreundersøkelse om shoppingvaner' },
          { id: 'b', text: 'Observasjonsmetode der man opptrer som vanlig kunde for å observere faktisk service' },
          { id: 'c', text: 'Et digitalt overvåkningssystem' },
          { id: 'd', text: 'En konkurrentanalyse' },
        ],
        correctId: 'b',
        explanation: 'Mystery shopping er observasjonsmetode der testpersoner opptrer som vanlige kunder for å observere og rapportere faktisk servicekvalitet.',
      },
      {
        id: 'mu-3-5',
        question: 'Når bør du bruke kvalitativ metode fremfor kvantitativ?',
        choices: [
          { id: 'a', text: 'Når du trenger statistisk representativitet' },
          { id: 'b', text: 'Tidlig i prosessen for å forstå problemet og kundenes motivasjon' },
          { id: 'c', text: 'Alltid — kvalitativt er alltid bedre' },
          { id: 'd', text: 'Kun for store bedrifter med store budsjetter' },
        ],
        correctId: 'b',
        explanation: 'Kvalitativ metode egner seg best tidlig i prosessen for å forstå problemet og motivasjon. Kvantitativ metode brukes etterpå for å måle omfang.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🎯',
    title: 'Utvalg og representativitet',
    quote: 'Et skjevt utvalg gir sikre svar på feil spørsmål.',
    content: 'Populasjon er hele gruppen du vil si noe om; utvalg er de du faktisk spør. For gyldige konklusjoner må utvalget representere populasjonens sammensetning på relevante variabler.',
    subpoints: [
      'TILFELDIG UTVALG: Alle har lik sjanse for å bli valgt — gir best representativitet',
      'UTVALGSSKJEVHET: Selvseleksjon, frafall og convenience sampling er vanligste kilder',
      'FEILMARGIN: Representativt utvalg på 1000 gir typisk ±3% feilmargin (95% konfidensintervall)',
    ],
    practical: 'Beskriv alltid utvalgsmetoden din i rapporten — hvem ble spurt, hvordan, og hvem svarte ikke. Transparens styrker troverdigheten.',
    exercises: [
      {
        id: 'mu-4-1',
        question: 'Hva er forskjellen på populasjon og utvalg?',
        choices: [
          { id: 'a', text: 'De er det samme i markedsundersøkelse' },
          { id: 'b', text: 'Populasjon er hele gruppen man vil si noe om; utvalg er de man faktisk spør' },
          { id: 'c', text: 'Populasjon er de som faktisk svarer; utvalg er alle potensielle respondenter' },
          { id: 'd', text: 'Utvalg er alltid større enn populasjon' },
        ],
        correctId: 'b',
        explanation: 'Populasjon = hele målgruppen (f.eks. alle norske forbrukere 18–65). Utvalg = de personene som faktisk deltar i undersøkelsen.',
      },
      {
        id: 'mu-4-2',
        question: 'En undersøkelse blant 3000 Tinder-brukere om norsk ungdoms kjærlighet. Hva er problemet?',
        choices: [
          { id: 'a', text: 'Utvalget er for lite' },
          { id: 'b', text: 'Tinder-brukere er en selvselektert gruppe som ikke representerer alle norske ungdommer' },
          { id: 'c', text: 'Det er ingen problemer — 3000 er et stort utvalg' },
          { id: 'd', text: 'Spørsmålene er for personlige' },
        ],
        correctId: 'b',
        explanation: 'Tinder-brukere er selvselektert — de har valgt å bruke en spesifikk app. De representerer ikke alle norske ungdommer og gir et skjevt bilde.',
      },
      {
        id: 'mu-4-3',
        question: 'Hva er "convenience sampling"?',
        choices: [
          { id: 'a', text: 'Et veldig nøyaktig utvalgsmetode' },
          { id: 'b', text: 'Å spørre dem som er lettest tilgjengelig — praktisk men gir sjelden generaliserbare resultater' },
          { id: 'c', text: 'Et digitalt utvalgsverktøy' },
          { id: 'd', text: 'Stratifisert tilfeldig utvalg' },
        ],
        correctId: 'b',
        explanation: 'Convenience sampling er å spørre dem som er lettest tilgjengelige (f.eks. venner, studenter). Praktisk, men resultater kan sjelden generaliseres til hele populasjonen.',
      },
      {
        id: 'mu-4-4',
        question: 'Hva betyr en feilmargin på ±3% med 95% konfidensintervall?',
        choices: [
          { id: 'a', text: '3% av respondentene svarte feil' },
          { id: 'b', text: 'Man er 95% sikker på at det sanne svaret ligger innenfor ±3 prosentpoeng fra funnet' },
          { id: 'c', text: 'Undersøkelsen har 3% feil i beregningene' },
          { id: 'd', text: 'Kun 95% av respondentene ble inkludert' },
        ],
        correctId: 'b',
        explanation: 'Feilmargin ±3% med 95% konfidensintervall betyr at man er 95% sikker på at det sanne svaret i populasjonen ligger innenfor ±3 prosentpoeng av funnet.',
      },
      {
        id: 'mu-4-5',
        question: 'Ipsos bruker stratifisert tilfeldig utvalg i sine nasjonale paneler. Hva betyr dette?',
        choices: [
          { id: 'a', text: 'De spør de første 1000 de finner' },
          { id: 'b', text: 'De sikrer at utvalget gjenspeiler befolkningens fordeling på alder, kjønn og geografi' },
          { id: 'c', text: 'De velger tilfeldige respondenter uten hensyn til representativitet' },
          { id: 'd', text: 'De kun spør folk i de største byene' },
        ],
        correctId: 'b',
        explanation: 'Stratifisert utvalg deler populasjonen i strata (grupper) og tar proporsjonal andel fra hvert, noe som sikrer representativitet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '💡',
    title: 'Tolkning av data og beslutninger',
    quote: 'Data er råvaren. Innsikt er produktet. Beslutning er målet.',
    content: 'Den største feilen i markedsundersøkelse er ikke å samle dårlige data — det er å tolke gode data gjennom bekreftelsesbias. En god analyse finner funn som motstrider hypotesen din, ikke bare de som bekrefter den.',
    subpoints: [
      'BEKREFTELSESBIAS: Motgift er å aktivt lete etter funn som motstrider hypotesen din',
      'INNSIKT VS DATA: "67% er misfornøyde" er data. "Kunder forlater oss fordi de føler seg ignorert" er innsikt',
      'BESLUTNINGSGRUNNLAG: Koble alltid funn til konkret anbefalt handling',
    ],
    practical: 'Avslutt alltid en undersøkelsesrapport med en "Hva nå?"-seksjon: tre konkrete anbefalinger med prioriteringsrekkefølge.',
    exercises: [
      {
        id: 'mu-5-1',
        question: 'Hva er bekreftelsesbias i tolkning av markedsundersøkelser?',
        choices: [
          { id: 'a', text: 'Å bekrefte at dataene er korrekte' },
          { id: 'b', text: 'Tendensen til å legge mer vekt på funn som støtter det man allerede tror' },
          { id: 'c', text: 'Å bekrefte resultatene med en ny undersøkelse' },
          { id: 'd', text: 'At flertallet av respondentene er enige' },
        ],
        correctId: 'b',
        explanation: 'Bekreftelsesbias er tendensen til å legge mer vekt på data som bekrefter eksisterende oppfatning og ignorere data som utfordrer den.',
      },
      {
        id: 'mu-5-2',
        question: 'Coop bruker lojalitetskortdata til å planlegge sortiment. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', text: 'Primær spørreundersøkelse' },
          { id: 'b', text: 'Datadrevet beslutningstaking basert på atferdsdata' },
          { id: 'c', text: 'Kvalitativ observasjon' },
          { id: 'd', text: 'Mystery shopping' },
        ],
        correctId: 'b',
        explanation: 'Coop bruker transaksjonsdata fra lojalitetskort — atferdsdata som viser hva kunder faktisk kjøper, ikke hva de sier de kjøper.',
      },
      {
        id: 'mu-5-3',
        question: '"67% av kundene er misfornøyde med leveringstiden." Hva mangler for at dette er en god innsikt?',
        choices: [
          { id: 'a', text: 'Ingenting — dette er en god innsikt' },
          { id: 'b', text: 'Forklaringen på HVORFOR de er misfornøyde og hva som bør gjøres' },
          { id: 'c', text: 'En høyere prosentandel' },
          { id: 'd', text: 'Data fra konkurrenter' },
        ],
        correctId: 'b',
        explanation: 'Et datapunkt er ikke en innsikt. En innsikt forklarer årsaken og peker på handlingen — "67% er misfornøyde fordi pakker ofte ankommer etter kl. 20".',
      },
      {
        id: 'mu-5-4',
        question: 'Hva er "prinsippet om innsikt først, bevis etter" i presentasjon av funn?',
        choices: [
          { id: 'a', text: 'Å begynne rapporten med metodedelen' },
          { id: 'b', text: 'Det viktigste funnet kommuniseres i første setning, deretter støttes det med data' },
          { id: 'c', text: 'Å presentere all rådata før konklusjonene' },
          { id: 'd', text: 'At bevisene er viktigere enn innsiktene' },
        ],
        correctId: 'b',
        explanation: 'Effektiv kommunikasjon av funn starter med hovedkonklusjonen, deretter støttedata. Dette er langt mer overbevisende enn å la leseren vente på konklusjonen.',
      },
      {
        id: 'mu-5-5',
        question: 'Hva er den beste praksisen for å avslutte en markedsundersøkelsesrapport?',
        choices: [
          { id: 'a', text: 'En oppsummering av metodikken' },
          { id: 'b', text: 'Tre konkrete anbefalinger med prioriteringsrekkefølge — "Hva nå?"' },
          { id: 'c', text: 'En liste over alle respondentene' },
          { id: 'd', text: 'En diskusjon av hva fremtidige undersøkelser bør se på' },
        ],
        correctId: 'b',
        explanation: 'En rapport uten handlingspunkter er arkivmateriale. Alltid avslutte med konkrete anbefalinger som kobler funn til handling.',
      },
    ],
  },
]

export default function MarkedsundersokelseModule() {
  return (
    <DrawerModule
      moduleCode="IMF-VG2-2"
      moduleTitle="Markedsundersøkelser"
      moduleIcon="🔎"
      storageKey="learning-vg2-markedsundersokelse"
      completeRoute="/learning/vg2/innovasjon/markedsundersokelse/complete"
      phases={phases}
      intro="Markedsundersøkelser reduserer risikoen for kostbare feilskjær. En god undersøkelse gir innsikt som støtter bedre beslutninger — enten det er en ny produktlansering, en prisendring eller en kampanje."
      vissteduAt="SSB publiserer over 1000 statistikkserier som alle er gratis tilgjengelig — en gullgruve av sekundærdata for norske bedrifter."
      espenSier="Det jeg ser oftest er at bedrifter hopper rett til løsningen uten å forstå problemet godt nok. En time med fem kunder kan spare måneder med feil retning."
      presentationLink={{ route: '/learning/presentations/markedsplan', description: 'Markedsplan — en visuell gjennomgang av markedsundersøkelse og SOFT-analyse' }}
    />
  )
}
