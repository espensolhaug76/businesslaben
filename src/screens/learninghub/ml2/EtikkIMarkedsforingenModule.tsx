        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '⚖️',
            title: 'Etiske dilemmaer',
            quote: 'Når det ikke finnes ett rett svar.',
            content: 'Etiske dilemmaer er situasjoner der valget er vanskelig — hvor flere verdier kommer i konflikt. Salg av sukkerbrus til barn (lovlig, men sundt?). Akseptere lukrativ ordre fra autoritært regime? Etikk handler om bevisst refleksjon, ikke automatiske svar.',
            subpoints: [
                  { label: 'KONFLIKT MELLOM VERDIER', text: 'Inntjening vs ansvar, vekst vs miljø, hastighet vs grundighet.' },
          { label: 'INGEN ENKEL FASIT', text: 'Etikk krever vurdering — ikke regel-mekanisme.' },
            ],
            practical: 'Hvilket etisk dilemma har du sett i en bedrift? Hvordan ble det løst?',
            exercises: [
            {
      id: 'ml206-1-1',
      icon: '⚖️',
      title: 'Definisjon',
      question: 'Hva er et etisk dilemma?',
      choices: [
        { id: 'a', label: 'Et juridisk problem', isCorrect: false, feedback: 'Etikk er bredere enn jus.' },
{ id: 'b', label: 'Situasjon der flere verdier kommer i konflikt og det ikke finnes ett rett svar', isCorrect: true, feedback: 'Riktig! Krever bevisst refleksjon, ikke regel-anvendelse.' },
{ id: 'c', label: 'Bare et matspørsmål', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare for filosofer', isCorrect: false, feedback: 'Praktisk dagligdagse spørsmål.' },
      ],
      espenTip: 'Eksempel: ny medarbeider er dårlig på jobben. Si opp (rasjonelt) eller gi sjanse (omsorg)? Klassisk dilemma.',
    },
    {
      id: 'ml206-1-2',
      icon: '⚖️',
      title: 'Test',
      question: 'Hva er den enkleste etikk-testen?',
      choices: [
        { id: 'a', label: 'Hva sier juristen', isCorrect: false, feedback: 'For smalt — etikk er bredere.' },
{ id: 'b', label: 'Aviskolonne-test: ville jeg vært stolt om handlingen sto på forsiden', isCorrect: true, feedback: 'Riktig! Praktisk og sterk test. Hvis nei, ikke gjør det.' },
{ id: 'c', label: 'Hva sier konkurrenten', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Kostnad/nytte-analyse', isCorrect: false, feedback: 'Mangler etisk dimensjon.' },
      ],
      espenTip: 'Andre tester: ville jeg solgt dette til min mor? Vil jeg være stolt om 10 år?',
    },
    {
      id: 'ml206-1-3',
      icon: '⚖️',
      title: 'Aktualisering',
      question: 'Hvorfor er etikk viktigere nå?',
      choices: [
        { id: 'a', label: 'Lovverket er strengere', isCorrect: false, feedback: 'Lovverk er strengt, men sosial medier er hovedforskjellen.' },
{ id: 'b', label: 'Sosiale medier sprer dårlige opplevelser raskere — én viral klage kan ødelegge omdømme', isCorrect: true, feedback: 'Riktig! Krise på timer, ikke uker. Etikk har blitt strategisk forsvar.' },
{ id: 'c', label: 'Folk bryr seg ikke', isCorrect: false, feedback: 'Tvert imot — yngre bryr seg mer.' },
{ id: 'd', label: 'Bare for store bedrifter', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'United Airlines tapte over 1 mrd USD i markedsverdi på et viralt klipp i 2009.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📜',
            title: 'Lovlighet vs moral',
            quote: 'Lovlig ≠ etisk forsvarlig.',
            content: 'Selv om noe er lovlig, kan det være uetisk. Spillselskaper opererer innenfor loven, men kan utnytte spillavhengighet. Tobakksreklame var lovlig i tiår — etisk svært tvilsomt. Etikk går utover lovkrav. God forretning krever bevisst etisk standard, ikke kun compliance.',
            subpoints: [
                  { label: 'MINIMUM vs ANSVAR', text: 'Loven er minstekravet. Etikk er hva man bør gjøre.' },
          { label: 'FORSIKTIG MED LOV-FORSVAR', text: '\'Det er lovlig\' er sjelden tilstrekkelig etisk forsvar.' },
            ],
            practical: 'Tenk på en bransje der etikk og jus er åpenbart ulik. Hvilken? Hvorfor?',
            exercises: [
            {
      id: 'ml206-2-1',
      icon: '📜',
      title: 'Forskjell',
      question: 'Hva er forskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Lovlighet er minimum, moral er bredere etisk vurdering', isCorrect: true, feedback: 'Riktig! Mange handlinger er lovlige men uetiske. God forretning krever begge.' },
{ id: 'c', label: 'Lovlighet er for personer, moral for bedrifter', isCorrect: false, feedback: 'Begge gjelder begge.' },
{ id: 'd', label: 'Moral er bare for kirken', isCorrect: false, feedback: 'Sekulær etikk er like reell.' },
      ],
      espenTip: 'Kant og Mill ga oss verdslige etiske rammeverk. Ikke kun religiøst spørsmål.',
    },
    {
      id: 'ml206-2-2',
      icon: '📜',
      title: 'Eksempel',
      question: 'Hva er klassisk eksempel på \'lovlig men uetisk\'?',
      choices: [
        { id: 'a', label: 'Spillselskaper som utnytter spillavhengige', isCorrect: true, feedback: 'Riktig! Lovlig drift, men kan utnytte sårbare. Etisk svært tvilsomt.' },
{ id: 'b', label: 'Sykehus som behandler pasienter', isCorrect: false, feedback: 'Etisk forsvarlig.' },
{ id: 'c', label: 'Skoler som underviser barn', isCorrect: false, feedback: 'Etisk forsvarlig.' },
{ id: 'd', label: 'Bondegårder som dyrker mat', isCorrect: false, feedback: 'Etisk forsvarlig.' },
      ],
      espenTip: 'Norge har strengere regler om gambling enn mange andre land — nettopp pga etiske bekymringer.',
    },
    {
      id: 'ml206-2-3',
      icon: '📜',
      title: 'Konsekvens',
      question: 'Hva skjer når \'lovlig men uetisk\' oppdages?',
      choices: [
        { id: 'a', label: 'Ingen konsekvens', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Omdømmetap, kundeboikott, presset til endring', isCorrect: true, feedback: 'Riktig! Selv lovlig handling kan ødelegge merkevaren hvis den oppfattes uetisk.' },
{ id: 'c', label: 'Bedre omdømme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Skattefordel', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'VW Dieselgate var teknisk ulovlig, men selve etisk svikten skadet merkevaren mest.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📦',
            title: 'Produktetikk',
            quote: 'Farlige produkter, planlagt foreldelse.',
            content: 'Produktetikk: er produktet trygt? Bygd for å vare? Er emballasjen unødvendig? \'Planlagt foreldelse\' (planned obsolescence) — produsenter som bygger inn slitasje for å tvinge frem nytt kjøp — er etisk kontroversielt. EU har innført \'right to repair\' for å motvirke dette.',
            subpoints: [
                  { label: 'TRYGGHET', text: 'Produktet skal ikke skade brukeren under normal bruk.' },
          { label: 'HOLDBARHET', text: 'Designet for å vare, ikke for tidlig svikt.' },
            ],
            practical: 'Hvilke produkter rundt deg virker designet for kort levetid? Skohæler? Telefoner? Vaskemaskiner?',
            exercises: [
            {
      id: 'ml206-3-1',
      icon: '📦',
      title: 'Planlagt foreldelse',
      question: 'Hva er det?',
      choices: [
        { id: 'a', label: 'Produkter blir gamle naturlig', isCorrect: false, feedback: 'Det er bare slitasje.' },
{ id: 'b', label: 'Produsenten bygger inn slitasje for å tvinge frem nytt kjøp', isCorrect: true, feedback: 'Riktig! Etisk svært kontroversielt. Apple har vært i søkelyset.' },
{ id: 'c', label: 'Lovkrav om garanti', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'd', label: 'Resirkulering', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Apples \'batteri-degradering\' i eldre iPhones var del av en forlikssak — Apple måtte betale milliarder.',
    },
    {
      id: 'ml206-3-2',
      icon: '📦',
      title: 'Right to repair',
      question: 'Hva er det?',
      choices: [
        { id: 'a', label: 'Bare for biler', isCorrect: false, feedback: 'Bredere.' },
{ id: 'b', label: 'EU-regler som gir forbrukere rett til å reparere — krever tilgjengelige deler', isCorrect: true, feedback: 'Riktig! Mottiltak mot planlagt foreldelse. Strengere fra 2024.' },
{ id: 'c', label: 'Bare for klær', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Frivillig', isCorrect: false, feedback: 'Lovkrav i EU.' },
      ],
      espenTip: 'EU-direktiv tvinger produsenter å gjøre reservedeler tilgjengelige — også for batterier i mobiler.',
    },
    {
      id: 'ml206-3-3',
      icon: '📦',
      title: 'Etisk produkt',
      question: 'Hva er kjennetegn på etisk produkt?',
      choices: [
        { id: 'a', label: 'Lavest pris', isCorrect: false, feedback: 'Pris alene er ikke etisk.' },
{ id: 'b', label: 'Trygt, holdbart, reparbart, ærlig markedsført', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal etikk. Hver dimensjon teller.' },
{ id: 'c', label: 'Mest reklame', isCorrect: false, feedback: 'Ofte motsatt — overselgning er etisk problematisk.' },
{ id: 'd', label: 'Bare premium', isCorrect: false, feedback: 'Pris er ikke etikk.' },
      ],
      espenTip: 'Patagonia annonserer \'Don\'t buy this jacket\' — oppfordrer reparasjon. Etisk produkt-strategi.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '💰',
            title: 'Prisetikk',
            quote: 'Karteller, sårbare grupper.',
            content: 'Prissamarbeid (karteller) er ulovlig — bedrifter kan ikke avtale priser. Maks straff: 10 % av omsetning. Like alvorlig: prising som utnytter sårbare. Sterk prisstigning på nødvendighetsvarer i krise (smittevern, drivstoff under naturkatastrofer) gir omdømmetap selv om lovlig.',
            subpoints: [
                  { label: 'KARTELLER ULOVLIG', text: 'Konkurransetilsynet håndhever — bot opp til 10 % av omsetning.' },
          { label: 'UTNYTTELSE', text: 'Lovlig prisstigning kan være etisk uforsvarlig.' },
            ],
            practical: 'Hvilke priser har du sett som virket urimelig høye? Var de lovlige eller bare uetiske?',
            exercises: [
            {
      id: 'ml206-4-1',
      icon: '💰',
      title: 'Kartell',
      question: 'Hva er prissamarbeid (kartell)?',
      choices: [
        { id: 'a', label: 'Lovlig samarbeid', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ulovlig avtale mellom konkurrenter om priser', isCorrect: true, feedback: 'Riktig! Konkurransetilsynet håndhever strengt. Maks 10 % av omsetning i bot.' },
{ id: 'c', label: 'Felles markedsføring', isCorrect: false, feedback: 'Bare hvis samarbeid om pris er involvert.' },
{ id: 'd', label: 'Skattesvindel', isCorrect: false, feedback: 'Helt feil definisjon.' },
      ],
      espenTip: 'Saksene mot meieribransjen og dagligvarekjedene har gitt store bøter. Konkurransetilsynet er aktivt.',
    },
    {
      id: 'ml206-4-2',
      icon: '💰',
      title: 'Kriseprising',
      question: 'Selger ekstrem dyrt smittevernutstyr i pandemi — etisk?',
      choices: [
        { id: 'a', label: 'Lovlig og greit', isCorrect: false, feedback: 'Lovlig kanskje, men etisk svært tvilsomt.' },
{ id: 'b', label: 'Lovlig kan det være, men ofte etisk uforsvarlig — utnyttelse av sårbarhet', isCorrect: true, feedback: 'Riktig! Lovlighet og etikk er ulike. Krise-prising rammer omdømme.' },
{ id: 'c', label: 'Alltid ulovlig', isCorrect: false, feedback: 'Ikke alltid juridisk forbudt.' },
{ id: 'd', label: 'Bare problematisk hvis avis skriver', isCorrect: false, feedback: 'Etikk er uavhengig av oppmerksomhet.' },
      ],
      espenTip: 'Norske myndigheter innførte \'krigslov\' for nødvendige varer i pandemi-startfasen for å hindre prisspekulasjon.',
    },
    {
      id: 'ml206-4-3',
      icon: '💰',
      title: 'Prisdiskriminering',
      question: 'Er det etisk å ta ulik pris av ulike kunder?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For dogmatisk.' },
{ id: 'b', label: 'Det avhenger — segmentert prising (studentrabatt) er ofte greit; utnyttelse av desperate er ikke', isCorrect: true, feedback: 'Riktig! Kontekst avgjør. Yield management er aksepterbart, utnyttelse er ikke.' },
{ id: 'c', label: 'Alltid greit', isCorrect: false, feedback: 'For liberalt.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Praksis brukes overalt.' },
      ],
      espenTip: 'Test: vil kunden føle seg behandlet rettferdig hvis hun fant ut hva andre betalte? Det er etisk-testen.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📢',
            title: 'Kommunikasjonsetikk',
            quote: 'Kroppspress, skjult reklame.',
            content: 'Etiske utfordringer i kommunikasjon: kroppspress (urealistiske idealer), skjult reklame (influencere som ikke merker betalt innhold), frykt-baserte kampanjer, manipulering av barn. Forbrukertilsynet håndhever, men mye er etisk problematisk selv om lovlig. Markedsføringsloven § 2 krever \'god markedsføringsskikk\'.',
            subpoints: [
                  { label: 'KROPPSPRESS', text: 'Reklame med photoshoppede kropper kan være lovlig, men ofte uetisk.' },
          { label: 'SKJULT REKLAME', text: 'Influencer-merking er lovkrav, men etisk forventning er bredere.' },
            ],
            practical: 'Hvilke reklamer du har sett kommer på etisk grenseland? Hva gjør dem problematiske?',
            exercises: [
            {
      id: 'ml206-5-1',
      icon: '📢',
      title: 'Kroppspress',
      question: 'Er photoshoppet kropp i klesreklame etisk?',
      choices: [
        { id: 'a', label: 'Helt OK', isCorrect: false, feedback: 'Etisk svært tvilsomt — særlig mot unge.' },
{ id: 'b', label: 'Etisk problematisk — skaper urealistiske idealer som påvirker mental helse', isCorrect: true, feedback: 'Riktig! Norge krever nå merking av photoshoppede bilder mot ungdom.' },
{ id: 'c', label: 'Bare i Norge problem', isCorrect: false, feedback: 'Globalt problem.' },
{ id: 'd', label: 'Bare hvis avsendt fra utlandet', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Norge: krav om merking av retusjerte bilder rettet mot unge. Etisk + juridisk respons.',
    },
    {
      id: 'ml206-5-2',
      icon: '📢',
      title: 'Skjult reklame',
      question: 'Hva er problemet med uemerket sponsret innhold?',
      choices: [
        { id: 'a', label: 'Ingen problem', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Manipulasjon — leseren tror det er ektevisning, ikke betalt påvirkning', isCorrect: true, feedback: 'Riktig! Lovkrav om merking. Etisk dypere — handler om informert valg.' },
{ id: 'c', label: 'Bare for store influencere', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Norge har strenge regler.' },
      ],
      espenTip: 'Forbrukertilsynet kontrollerer aktivt og bøtelegger influencere. Sjekk forbrukertilsynet.no.',
    },
    {
      id: 'ml206-5-3',
      icon: '📢',
      title: 'Frykt',
      question: 'Bruk av frykt i reklame — etisk?',
      choices: [
        { id: 'a', label: 'Aldri OK', isCorrect: false, feedback: 'For dogmatisk.' },
{ id: 'b', label: 'Det avhenger — frykt for reell risiko (brann, ulykke) er ofte OK; oppdiktet frykt er manipulering', isCorrect: true, feedback: 'Riktig! Forsikringsreklame om brannrisiko er informativ. Skapt frykt om sosial avvisning er manipulering.' },
{ id: 'c', label: 'Alltid greit', isCorrect: false, feedback: 'Mange tilfeller etisk problematiske.' },
{ id: 'd', label: 'Bare for barn', isCorrect: false, feedback: 'Gjelder alle målgrupper.' },
      ],
      espenTip: 'Test: er frykten reell og relevant, eller skapt for å manipulere? Det er den etiske grensen.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🤖',
            title: 'Digital etikk',
            quote: 'Data, overvåking, algoritmer.',
            content: 'Bruk av data og algoritmer reiser nye etiske spørsmål. Sosiale medier-plattformer kan optimere for engasjement på bekostning av brukernes mentale helse. Algoritmer kan utnytte sårbare grupper. Personalisering kan bli manipulering. AI-genererte deepfakes utfordrer hva som er sant. Digital etikk er ny disiplin under utvikling.',
            subpoints: [
                  { label: 'ALGORITME-MAKT', text: 'Algoritmer styrer hva milliarder ser. Stort etisk ansvar.' },
          { label: 'DEEPFAKES', text: 'AI-generert innhold utfordrer \'sannhet\' i mediene.' },
            ],
            practical: 'Hvilke algoritmer påvirker deg daglig? Sosiale medier-feed? Anbefalinger? Hva ser du som etisk problematisk?',
            exercises: [
            {
      id: 'ml206-6-1',
      icon: '🤖',
      title: 'Algoritmer',
      question: 'Hva er etisk problem med engasjement-optimering?',
      choices: [
        { id: 'a', label: 'Ingen problem', isCorrect: false, feedback: 'Mye dokumenterte etiske problemer.' },
{ id: 'b', label: 'Optimering for engasjement kan skade mental helse — viser sterke følelser, polarisering, avhengighet', isCorrect: true, feedback: 'Riktig! Klassisk dilemma. Forretningsmodellen vs brukerwelfare.' },
{ id: 'c', label: 'Bare TikTok-problem', isCorrect: false, feedback: 'Alle plattformer.' },
{ id: 'd', label: 'Bare for barn', isCorrect: false, feedback: 'Voksne også rammet.' },
      ],
      espenTip: 'Frances Haugen (Facebook-whistleblower) viste at Facebook visste om mental helse-skader, men prioriterte engasjement.',
    },
    {
      id: 'ml206-6-2',
      icon: '🤖',
      title: 'Cambridge Analytica',
      question: 'Hva skjedde?',
      choices: [
        { id: 'a', label: 'Lovlig markedsføring', isCorrect: false, feedback: 'Helt feil — datatyveri og misbruk.' },
{ id: 'b', label: 'Personlige data fra 87 millioner Facebook-profiler ble brukt uten samtykke til politisk profilering', isCorrect: true, feedback: 'Riktig! En av de største personvernsskandalene noensinne. Drev frem GDPR.' },
{ id: 'c', label: 'En type sosial medie', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare et lite problem', isCorrect: false, feedback: 'Globalt sjokk.' },
      ],
      espenTip: 'Saken endret personvern globalt og var sentral driver bak GDPR i 2018.',
    },
    {
      id: 'ml206-6-3',
      icon: '🤖',
      title: 'Deepfakes',
      question: 'Etisk problem?',
      choices: [
        { id: 'a', label: 'Bare underholdning', isCorrect: false, feedback: 'Mye mer alvorlig.' },
{ id: 'b', label: 'AI-generert innhold kan brukes til svindel, politisk manipulasjon, skade omdømme', isCorrect: true, feedback: 'Riktig! Voksende etisk og juridisk utfordring. EU jobber med AI-Act.' },
{ id: 'c', label: 'Aldri etisk problem', isCorrect: false, feedback: 'Mange klare problemer.' },
{ id: 'd', label: 'Bare for kjendiser', isCorrect: false, feedback: 'Alle kan være målet.' },
      ],
      espenTip: 'Norske myndigheter ser på krav om merking av AI-generert innhold. EU AI-Act tar lederrolle.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🧭',
            title: 'Etisk beslutningsmodell',
            quote: 'Strukturert vurdering.',
            content: 'Etiske dilemmaer kan løses via strukturert refleksjon. Standard 4-stegs-test: 1) Er det lovlig? 2) Er det rettferdig? 3) Tåler det dagens lys (offentlig diskusjon)? 4) Vil jeg være stolt om 10 år? Hvis ett svar er nei, revurder valget. Modellen tvinger frem bevisst etisk vurdering.',
            subpoints: [
                  { label: '4 STEG', text: 'Lovlig, rettferdig, offentlig, langsiktig stolthet.' },
          { label: 'HJELPEMIDDEL', text: 'Strukturert refleksjon slår automatisk reaksjon.' },
            ],
            practical: 'Tenk på en vanskelig beslutning du har tatt. Bruk 4-stegs-testen. Ville svarene endret beslutningen?',
            exercises: [
            {
      id: 'ml206-7-1',
      icon: '🧭',
      title: '4 spørsmål',
      question: 'Hva er den vanlige etiske beslutningsmodellen?',
      choices: [
        { id: 'a', label: 'Bare \'er det lovlig\'', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Lovlig, rettferdig, tåler offentlighet, stolt om 10 år', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal vurdering. Hindrer kortsiktig egoisme.' },
{ id: 'c', label: 'Bare \'tjener jeg penger\'', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'd', label: 'Bare \'hva sier sjefen\'', isCorrect: false, feedback: 'Etikk er individuell ansvar.' },
      ],
      espenTip: 'Bruk testen i konkrete dilemmaer. Hvis du ikke kan svare \'ja\' på alle 4, har du etisk problem.',
    },
    {
      id: 'ml206-7-2',
      icon: '🧭',
      title: 'Hvorfor',
      question: 'Hvorfor strukturert refleksjon?',
      choices: [
        { id: 'a', label: 'Tar lengre tid', isCorrect: false, feedback: 'Funksjon, ikke ulempe.' },
{ id: 'b', label: 'Hindrer raske, instinktive valg som senere viser seg uetiske', isCorrect: true, feedback: 'Riktig! Tvinger pause for vurdering. Slow-thinking slår fast-thinking i etiske valg.' },
{ id: 'c', label: 'Helt unødvendig', isCorrect: false, feedback: 'Forskning viser stor verdi.' },
{ id: 'd', label: 'Bare for jurister', isCorrect: false, feedback: 'Praktisk verktøy for alle.' },
      ],
      espenTip: 'Daniel Kahneman: System 1 (rask) vs System 2 (sakte). Etikk krever System 2-tenkning.',
    },
    {
      id: 'ml206-7-3',
      icon: '🧭',
      title: 'Bruk',
      question: 'Når brukes etikk-modell?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Bør brukes regelmessig.' },
{ id: 'b', label: 'Ved alle beslutninger med etisk dimensjon — særlig grå-soner', isCorrect: true, feedback: 'Riktig! Innebygd vane. Ikke bare ved kriser.' },
{ id: 'c', label: 'Kun ved skandaler', isCorrect: false, feedback: 'For sent.' },
{ id: 'd', label: 'Bare i HR-saker', isCorrect: false, feedback: 'For smalt — gjelder alle.' },
      ],
      espenTip: 'Innfør etikk-vurdering som standard del av strategiprosesser. Forebygging slår krisehåndtering.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🚨',
            title: 'Whistleblowing',
            quote: 'Si fra om uetisk forhold.',
            content: 'Whistleblowing er å varsle om uetiske eller ulovlige forhold internt — eller eksternt hvis intern varsling ikke virker. Norsk arbeidsmiljølov beskytter varslere mot represalier. Gode bedrifter har etablerte kanaler. Berømte saker: Frances Haugen (Facebook), Edward Snowden (NSA), Sherron Watkins (Enron). Krever mot, men beskyttet ved lov.',
            subpoints: [
                  { label: 'LOVBESKYTTET', text: 'Arbeidsmiljølov § 2A. Beskyttelse mot oppsigelse, sanksjoner.' },
          { label: 'KANALER', text: 'Gode bedrifter har anonyme varslingskanaler internt.' },
            ],
            practical: 'Ville du varslet om uetiske forhold på arbeidsplassen din? Hva ville hindret deg?',
            exercises: [
            {
      id: 'ml206-8-1',
      icon: '🚨',
      title: 'Definisjon',
      question: 'Hva er whistleblowing?',
      choices: [
        { id: 'a', label: 'Sport', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Varsling om uetiske eller ulovlige forhold internt eller eksternt', isCorrect: true, feedback: 'Riktig! Beskyttet under arbeidsmiljøloven. Modig handling med stor effekt.' },
{ id: 'c', label: 'Reklame i radio', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Type konkurranse', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Berømte saker har endret hele bransjer. Frances Haugen-varselet endret Facebook-debatten globalt.',
    },
    {
      id: 'ml206-8-2',
      icon: '🚨',
      title: 'Beskyttelse',
      question: 'Hva sier norsk lov?',
      choices: [
        { id: 'a', label: 'Varslere kan sies opp', isCorrect: false, feedback: 'Helt feil — sterkt beskyttet.' },
{ id: 'b', label: 'Arbeidsmiljølov § 2A beskytter varslere mot represalier', isCorrect: true, feedback: 'Riktig! Lovfestet vern. Bryter arbeidsgiver dette, store konsekvenser.' },
{ id: 'c', label: 'Bare statlige beskyttet', isCorrect: false, feedback: 'Privat sektor like beskyttet.' },
{ id: 'd', label: 'Ingen beskyttelse', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Loven krever også at bedrifter har etablerte varslingskanaler — særlig over visse størrelser.',
    },
    {
      id: 'ml206-8-3',
      icon: '🚨',
      title: 'Først intern',
      question: 'Bør man varsle internt eller eksternt?',
      choices: [
        { id: 'a', label: 'Alltid eksternt', isCorrect: false, feedback: 'Lovkrav er typisk intern først.' },
{ id: 'b', label: 'Først intern; ekstern kun hvis intern ikke virker', isCorrect: true, feedback: 'Riktig! Loven krever forsøk på intern varsling først, med unntak for åpenbare lovbrudd.' },
{ id: 'c', label: 'Bare anonymt på internett', isCorrect: false, feedback: 'Sjelden lovbeskyttet.' },
{ id: 'd', label: 'Aldri varsle', isCorrect: false, feedback: 'Helt feil — varsling er ofte etisk plikt.' },
      ],
      espenTip: 'Sjekk bedriftens varslingsrutine. Hvis ingen finnes — det er i seg selv et etisk problem.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🎯',
            title: 'Etisk kultur',
            quote: 'Kultur slår strategi.',
            content: 'Etisk kultur bygges, ikke skrives. Verdier på veggen er ord; etisk kultur vises i hvordan ledelsen reagerer i krise, hvem som premieres, hva som tolereres. Sterk etisk kultur: åpenhet, læring fra feil, mulighet for å si fra. Svak etisk kultur: \'gjør hva som trengs\' for å nå mål, ignorere røde flagg.',
            subpoints: [
                  { label: 'HANDLING > ORD', text: 'Kultur vises i hva som premieres, ikke hva som plakatderives.' },
          { label: 'LEDELSENS EKSEMPEL', text: 'Ledere setter standarden. Hva de gjør betyr mer enn hva de sier.' },
            ],
            practical: 'Hvilke handlinger fra ledere du har observert har formet etisk kultur — positivt eller negativt?',
            exercises: [
            {
      id: 'ml206-9-1',
      icon: '🎯',
      title: 'Hvordan dannes',
      question: 'Hvordan dannes etisk kultur?',
      choices: [
        { id: 'a', label: 'Verdiplakater på vegg', isCorrect: false, feedback: 'Pynt — kultur er handling.' },
{ id: 'b', label: 'Ledelsens eksempel + hva som premieres + hva som tolereres', isCorrect: true, feedback: 'Riktig! Tre kraftige drivere. Sammen former de kulturen.' },
{ id: 'c', label: 'HR-kurs', isCorrect: false, feedback: 'Kurs alene endrer ikke kultur.' },
{ id: 'd', label: 'Lønnsnivå', isCorrect: false, feedback: 'Helt urelevant for etisk kultur.' },
      ],
      espenTip: 'Test: hva ble belønnet sist? Hva ble straffet? Det er den ekte kulturen.',
    },
    {
      id: 'ml206-9-2',
      icon: '🎯',
      title: 'Røde flagg',
      question: 'Tegn på svak etisk kultur?',
      choices: [
        { id: 'a', label: 'Åpenhet om feil', isCorrect: false, feedback: 'Tegn på sterk kultur.' },
{ id: 'b', label: '\'Gjør hva som trengs\'-mentalitet, frykt for å si fra, ignorerte advarsler', isCorrect: true, feedback: 'Riktig! Klassiske tegn. Wells Fargo-skandalen var resultat av slik kultur.' },
{ id: 'c', label: 'Mange møter', isCorrect: false, feedback: 'Symptom, ikke årsak.' },
{ id: 'd', label: 'Lave lønninger', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Wells Fargo: 5000+ ansatte opprettet falske kontoer pga press. Kultur belønnet \'tall\', straffet ikke svindel.',
    },
    {
      id: 'ml206-9-3',
      icon: '🎯',
      title: 'Bygging',
      question: 'Hvordan bygge etisk kultur?',
      choices: [
        { id: 'a', label: 'Bare flere policyer', isCorrect: false, feedback: 'Policyer endrer ikke adferd.' },
{ id: 'b', label: 'Ledelse som modellerer, premiering av etisk handling, åpne varslingskanaler, læring fra feil', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal innsats over tid. Tar år.' },
{ id: 'c', label: 'Bare flere kurs', isCorrect: false, feedback: 'Kurs alene er insufficient.' },
{ id: 'd', label: 'Bare høyere lønn', isCorrect: false, feedback: 'Ikke direkte sammenheng.' },
      ],
      espenTip: 'Patagonias kultur: ærlighet om feil. Annual report-rapporten inkluderer egne svakheter. Bygger tillit.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📈',
            title: 'Etikk som strategi',
            quote: 'Konkurransefortrinn på sikt.',
            content: 'Etisk drift er ikke bare moralsk plikt — det er strategi. Bedrifter med sterk etikk: lojalere kunder, bedre rekruttering, lavere risiko, høyere tillit. Forskning viser positiv korrelasjon mellom etiske bedrifter og lønnsomhet på sikt. Investerer i etikk = investerer i langsiktig overlevelse. Patagonia, Stormberg, Tomra er eksempler.',
            subpoints: [
                  { label: 'LANGSIKT > KORTSIKT', text: 'Etikk koster kortsiktig, vinner langsiktig.' },
          { label: 'MULTI-VINNING', text: 'Lojalere kunder + bedre rekruttering + lavere risiko + høyere tillit.' },
            ],
            practical: 'Hvilke bedrifter du kjenner har bygget konkurransefortrinn på etikk? Hva gjør de annerledes?',
            exercises: [
            {
      id: 'ml206-10-1',
      icon: '📈',
      title: 'Sammenheng',
      question: 'Er etisk drift lønnsomt?',
      choices: [
        { id: 'a', label: 'Aldri lønnsomt — bare kostnad', isCorrect: false, feedback: 'Forskning viser tvert imot.' },
{ id: 'b', label: 'På sikt ja — sterke etiske bedrifter har bedre langsiktig avkastning', isCorrect: true, feedback: 'Riktig! Multipel forskning støtter dette. Etikk = strategi.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt fenomen.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle størrelser.' },
      ],
      espenTip: 'MSCI ESG-leaders index har slått brede markedet over flere tidsperioder. Tallene støtter etikk.',
    },
    {
      id: 'ml206-10-2',
      icon: '📈',
      title: 'Norsk eksempel',
      question: 'Hvilket norsk selskap er kjent for etisk strategi?',
      choices: [
        { id: 'a', label: 'Patagonia (USA-basert, men sterkt i Norge)', isCorrect: false, feedback: 'Faktisk amerikansk.' },
{ id: 'b', label: 'Stormberg — ansetter folk med hull i CV-en, åpenhet om kostnader', isCorrect: true, feedback: 'Riktig! Norsk selskap som har bygget hele merkevaren på etikk.' },
{ id: 'c', label: 'REMA 1000 — kun pris', isCorrect: false, feedback: 'Pris er deres strategi, ikke etikk.' },
{ id: 'd', label: 'Ingen norske', isCorrect: false, feedback: 'Helt feil — flere ledende.' },
      ],
      espenTip: 'Stormberg er bevis på at etisk strategi fungerer i norsk marked. Lojale kunder, sterkt omdømme.',
    },
    {
      id: 'ml206-10-3',
      icon: '📈',
      title: 'Lærdom',
      question: 'Hva er hovedlærdommen om etikk i markedsføring?',
      choices: [
        { id: 'a', label: 'Ignorer det', isCorrect: false, feedback: 'Strategi-død.' },
{ id: 'b', label: 'Etikk er ikke valgfritt — det er strategisk konkurransefortrinn på sikt', isCorrect: true, feedback: 'Riktig! Modern tenkning. Bedrifter som ikke ser dette taper kapital, talenter, kunder.' },
{ id: 'c', label: 'Kun for små bedrifter', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Bare hvis lovkrav', isCorrect: false, feedback: 'For passivt.' },
      ],
      espenTip: 'Den enkleste regelen: ville du vært stolt av handlingen om den sto på forsiden? Hvis nei, ikke gjør det.',
    },
            ],
          },
        ]

        export default function EtikkIMarkedsforingenModule() {
          return (
            <DrawerModule
              moduleCode="ML2-06"
              moduleTitle="Etikk i markedsføringen"
              moduleIcon="⚖️"
              storageKey="learning-ml2-etikk-i-markedsforingen"
              completeRoute="/learning/ml2/etikk-i-markedsforingen/complete"
              phases={phases}
              intro="Etiske dilemmaer i reklame, salg og dataetikk — grensen mellom påvirkning og manipulasjon. Lovlighet er minimum; etikk går utover. Sosiale medier har gjort hver feil potensielt offentlig."
              vissteduAt="Cambridge Analytica brukte personlige data fra 87 millioner Facebook-profiler uten samtykke til politisk profilering. Saken endret personvern globalt og var sentral driver bak GDPR."
              espenSier="Aviskolonne-testen er den enkleste etikk-testen: ville du vært stolt om handlingen sto på forsiden av Aftenposten? Hvis nei, ikke gjør det."
      presentationLink={{ route: '/learning/presentations/ml2/etikk-i-markedsforingen', description: 'Etikk i markedsføringen — 10 slides' }}
            />
          )
        }
