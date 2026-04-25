        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🗺️',
            title: 'Hva er en forretningsmodell?',
            quote: 'Hvordan bedriften skaper, leverer og kaprer verdi.',
            content: 'Forretningsmodell beskriver hvordan bedriften skaper verdi (for kunden), leverer den (gjennom kanaler), og kaprer den (gjennom inntekter). Forklarer logikken bak hvordan bedriften tjener penger — uavhengig av selve produktet.',
            subpoints: [
                  { label: '3 KOMPONENTER', text: 'Skape + levere + kapre verdi.' },
          { label: 'LOGIKK', text: 'Beskriver hvordan bedriften tjener penger.' },
            ],
            practical: 'Beskriv en bedrifts forretningsmodell: hvordan skaper, leverer og kaprer de verdi?',
            exercises: [
            {
      id: 'ent104-1-1',
      icon: '🗺️',
      title: '3 deler',
      question: 'Hva er kjerneelementene?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Skape, levere, kapre verdi', isCorrect: true, feedback: 'Riktig! Tre dimensjoner.' },
{ id: 'c', label: 'Kun produkt', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forskjell fra produkt-fokus: forretningsmodellen handler om HVORDAN, ikke HVA.',
    },
    {
      id: 'ent104-1-2',
      icon: '🗺️',
      title: 'Forskjell',
      question: 'Forskjell på produkt og forretningsmodell?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Produkt = hva. Forretningsmodell = hvordan tjene penger på det', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Samme produkt kan ha ulike forretningsmodeller: kjøp, leie, abonnement, freemium.',
    },
    {
      id: 'ent104-1-3',
      icon: '🗺️',
      title: 'Eksempel',
      question: 'Spotify — beskriv modellen.',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Skape (musikkbibliotek) + levere (app) + kapre (abonnement + reklame)', isCorrect: true, feedback: 'Riktig! Komplett forretningsmodell.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Spotify-modellen er hybrid: gratis (med reklame) + premium (abonnement). Fanger ulike segmenter.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '👥',
            title: 'Kundesegmenter og verdiløfte',
            quote: 'Hjertet i BMC.',
            content: 'BMCs kjerne: hvem hjelper vi (kundesegmenter), og med hva (verdiløfte)? Disse to byggestenene må passe perfekt sammen — ellers kollapser hele modellen. Verdiløftet må løse et reelt problem for et reelt segment.',
            subpoints: [
                  { label: 'HVEM + HVA', text: 'Kundesegment + verdiløfte = match eller mismatch.' },
          { label: 'KJERNE', text: 'Andre 7 byggesteiner støtter disse to.' },
            ],
            practical: 'Kan du beskrive \'hvem\' og \'hva\' for en bedrift du kjenner?',
            exercises: [
            {
      id: 'ent104-2-1',
      icon: '👥',
      title: 'Kjerne',
      question: 'Hva er kjernen i BMC?',
      choices: [
        { id: 'a', label: 'Bare inntekt', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Match mellom kundesegment og verdiløfte', isCorrect: true, feedback: 'Riktig! Hovedtest.' },
{ id: 'c', label: 'Bare logo', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Strategyzer har eget Value Proposition Canvas — utdyper denne matchen.',
    },
    {
      id: 'ent104-2-2',
      icon: '👥',
      title: 'Mismatch',
      question: 'Hva skjer ved mismatch?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Modellen kollapser — produktet treffer ikke kunden', isCorrect: true, feedback: 'Riktig! Klassisk feil.' },
{ id: 'c', label: 'Pynt', isCorrect: false, feedback: 'Strategisk svikt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Google Glass var teknologisk imponerende, men matchet ikke noe reelt kundesegment. Mislyktes.',
    },
    {
      id: 'ent104-2-3',
      icon: '👥',
      title: 'Test',
      question: 'Hvordan teste match?',
      choices: [
        { id: 'a', label: 'Bare spørre seg selv', isCorrect: false, feedback: 'Subjektivt.' },
{ id: 'b', label: 'Snakke med kundesegmentet — bekrefter de problemet og løsningen?', isCorrect: true, feedback: 'Riktig! Validering.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hvis 10/10 kunder bekrefter problemet, er du på sporet. Hvis 2/10, er det galt segment.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📞',
            title: 'Kanaler og kunderelasjoner',
            quote: 'Hvordan nå og beholde kunder.',
            content: 'Kanaler: hvordan vi når kunden (nettbutikk, butikk, partnere). Kunderelasjoner: hvordan vi beholder kontakten (selvbetjening, personlig hjelp, abonnement). Sammen styrer de kundeopplevelsen. Velg basert på segment og verdiløfte.',
            subpoints: [
                  { label: 'KANALER', text: 'Hvordan nå kunden — direkte, indirekte, digitale.' },
          { label: 'RELASJONER', text: 'Hvordan beholde kunden — automatisert eller personlig.' },
            ],
            practical: 'Hvilke kanaler bruker bedriften du jobber for / kjenner? Hvilken relasjon har de?',
            exercises: [
            {
      id: 'ent104-3-1',
      icon: '📞',
      title: 'Kanaler',
      question: 'Hva er kanalvalget?',
      choices: [
        { id: 'a', label: 'Bare nettbutikk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Hvordan vi når kunden — direkte, indirekte, digitale, fysiske', isCorrect: true, feedback: 'Riktig! Strategisk valg.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Multi-kanal er normalt. Apple bruker både egne butikker og forhandlere.',
    },
    {
      id: 'ent104-3-2',
      icon: '📞',
      title: 'Relasjoner',
      question: 'Hvilke typer kunderelasjoner finnes?',
      choices: [
        { id: 'a', label: 'Bare personlig hjelp', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Selvbetjening, personlig, automatisert, abonnement, communities', isCorrect: true, feedback: 'Riktig! Mange typer.' },
{ id: 'c', label: 'Bare via telefon', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Spotify: selvbetjent app + community (delte spillelister). Hybrid-relasjon.',
    },
    {
      id: 'ent104-3-3',
      icon: '📞',
      title: 'Match',
      question: 'Hva må matche?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Kanal + relasjon må matche kundesegmentets forventning og verdiløftet', isCorrect: true, feedback: 'Riktig! Helhet.' },
{ id: 'c', label: 'Bare lavest pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Premium-segment forventer personlig service. Lavpris-segment aksepterer selvbetjening. Match.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '💰',
            title: 'Inntektsstrømmer',
            quote: 'Hvordan få betalt.',
            content: 'Inntektsstrømmer: hvordan skal vi faktisk få betalt? Salg, abonnement, leie, reklame, lisensiering, transaksjonsgebyr. De fleste vellykkede bedrifter har flere inntektsstrømmer for å spre risiko. Spotify: gratis + premium. Apple: produkt + tjeneste + App Store.',
            subpoints: [
                  { label: 'FLERE', text: 'Diversifiserte inntektsstrømmer reduserer risiko.' },
          { label: 'MODELLER', text: 'Salg, abonnement, leie, reklame, lisens — mange muligheter.' },
            ],
            practical: 'Hvilke inntektsstrømmer har bedriften du jobber for? Bare én eller flere?',
            exercises: [
            {
      id: 'ent104-4-1',
      icon: '💰',
      title: 'Hvor mange',
      question: 'Bør bedrifter ha flere inntektsstrømmer?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Strategisk fordel.' },
{ id: 'b', label: 'Ja — diversifisering reduserer risiko ved markedsendringer', isCorrect: true, feedback: 'Riktig! Standard finansprinsipp.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Apple Service-segmentet vokser raskere enn iPhone — diversifisering har bygget motstand.',
    },
    {
      id: 'ent104-4-2',
      icon: '💰',
      title: 'Modeller',
      question: 'Hvilke modeller finnes?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Salg, abonnement, leie, reklame, lisens, freemium, transaksjonsgebyr', isCorrect: true, feedback: 'Riktig! Mange muligheter.' },
{ id: 'c', label: 'Bare en type', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Microsoft pivoterte fra produktsalg (Office) til abonnement (Microsoft 365). Strategisk skifte.',
    },
    {
      id: 'ent104-4-3',
      icon: '💰',
      title: 'Eksempel',
      question: 'Spotify — hvilke inntektsstrømmer?',
      choices: [
        { id: 'a', label: 'Bare abonnement', isCorrect: false, feedback: 'Hybrid.' },
{ id: 'b', label: 'Premium-abonnement + reklame fra free-tier + bedriftsavtaler', isCorrect: true, feedback: 'Riktig! Multi-stream.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hybrid-modell gjør det mulig å fange flere kundesegmenter samtidig.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🔧',
            title: 'Nøkkelressurser og nøkkelaktiviteter',
            quote: 'Hva må vi ha og gjøre.',
            content: 'Nøkkelressurser: hva vi MÅ ha (mennesker, fysiske midler, immaterielle rettigheter, kapital). Nøkkelaktiviteter: hva vi MÅ gjøre hver dag (produksjon, salg, service, plattform-vedlikehold). Definerer kjerne-virksomheten.',
            subpoints: [
                  { label: 'RESSURSER', text: 'Hva må være på plass for å levere.' },
          { label: 'AKTIVITETER', text: 'Hva må gjøres daglig.' },
            ],
            practical: 'Hva er nøkkelressursene og -aktivitetene for en lokal kafé?',
            exercises: [
            {
      id: 'ent104-5-1',
      icon: '🔧',
      title: 'Forskjell',
      question: 'Forskjell på ressurser og aktiviteter?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Ressurser = hva du har. Aktiviteter = hva du gjør', isCorrect: true, feedback: 'Riktig! Statisk vs dynamisk.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Eksempel: Kafé. Ressurs = espressomaskin + lokale. Aktivitet = brygge kaffe + kundeservice.',
    },
    {
      id: 'ent104-5-2',
      icon: '🔧',
      title: 'Apple-ressurs',
      question: 'Hva er Apples viktigste ressurs?',
      choices: [
        { id: 'a', label: 'Bare bygninger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Merkevare, ansatte (designere, ingeniører), immaterielle rettigheter, økosystem', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal.' },
{ id: 'c', label: 'Bare penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Apples merkevare alene er verdsatt over 500 mrd USD. Største ressurs.',
    },
    {
      id: 'ent104-5-3',
      icon: '🔧',
      title: 'Test',
      question: 'Hvordan identifisere nøkkelressurser?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Spør: hva ville bedriften kollapset uten?', isCorrect: true, feedback: 'Riktig! Kritikalitets-test.' },
{ id: 'c', label: 'Bare økonomi', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Test: hvis vi mistet X, ville vi kunnet operere? Hvis nei = nøkkelressurs.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🤝',
            title: 'Nøkkelpartnere',
            quote: 'Hvem må vi samarbeide med.',
            content: 'Nøkkelpartnere: hvem må vi samarbeide med for å lykkes? Leverandører, allianser, teknologi-partnere, distribusjonspartnere. Sterke partnerskap kan være forskjellen på å klare alt selv (dyrt og sakte) eller skalere raskt. Apple og TSMC (chip-produsent) er klassisk eksempel.',
            subpoints: [
                  { label: 'STRATEGISK', text: 'Riktige partnere kan gi konkurransefortrinn.' },
          { label: 'FOKUS', text: 'Outsource det som ikke er kjernen.' },
            ],
            practical: 'Hvilke partnere er viktige for bedrifter du kjenner? Hva ville skjedd uten dem?',
            exercises: [
            {
      id: 'ent104-6-1',
      icon: '🤝',
      title: 'Hvorfor',
      question: 'Hvorfor partnere?',
      choices: [
        { id: 'a', label: 'Bare spare penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Få tilgang til ressurser/kompetanse vi ikke har — fokus på kjerne', isCorrect: true, feedback: 'Riktig! Strategisk valg.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Apple lager ikke chips selv — TSMC produserer. Apple fokuserer på design + økosystem.',
    },
    {
      id: 'ent104-6-2',
      icon: '🤝',
      title: 'Type',
      question: 'Hvilke type partnerskap?',
      choices: [
        { id: 'a', label: 'Bare leverandører', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Leverandører, allianser, joint ventures, distribusjon, teknologi', isCorrect: true, feedback: 'Riktig! Mange typer.' },
{ id: 'c', label: 'Bare bank', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Allianse: Spotify + Tesla (forhåndsinstallert). Distribusjon: Coca-Cola + McDonald\'s. Multi-typer.',
    },
    {
      id: 'ent104-6-3',
      icon: '🤝',
      title: 'Test',
      question: 'Når partner med noen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Når de har noe vi trenger og vi har noe de trenger — gjensidig verdi', isCorrect: true, feedback: 'Riktig! Win-win.' },
{ id: 'c', label: 'Bare når billig', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Tesla og Panasonic: Tesla trengte batterier, Panasonic trengte stor kunde. Strategisk partnerskap.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '💸',
            title: 'Kostnadsstruktur',
            quote: 'Hva er de største utgiftene.',
            content: 'Kostnadsstruktur: hva er de største utgiftene våre? Faste kostnader (uavhengige av salg — leie, lønn) vs variable (følger salget — råvarer, frakt). Forstå strukturen — det avgjør hvor sårbar du er ved svingninger i salget. Cost-driven vs value-driven modeller.',
            subpoints: [
                  { label: 'FASTE vs VARIABLE', text: 'Kjenn fordelingen — påvirker risiko.' },
          { label: 'STRATEGI', text: 'Cost-driven (lavpris) vs value-driven (premium).' },
            ],
            practical: 'Hva er de største kostnadspostene for en bedrift du kjenner? Faste eller variable?',
            exercises: [
            {
      id: 'ent104-7-1',
      icon: '💸',
      title: 'Forskjell',
      question: 'Faste vs variable?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Faste = uavhengige av salg. Variable = følger salget', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare beløp', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Husleie = fast (samme uansett salg). Råvarer = variable (mer salg = mer råvarer).',
    },
    {
      id: 'ent104-7-2',
      icon: '💸',
      title: 'Cost-driven',
      question: 'Hva er cost-driven modell?',
      choices: [
        { id: 'a', label: 'Bare premium', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Lavest mulig kostnader = lavest mulig pris (IKEA, Ryanair)', isCorrect: true, feedback: 'Riktig! Strategisk valg.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'IKEA optimaliserer hver kostnadspost. Lave priser er resultat av strukturell strategi.',
    },
    {
      id: 'ent104-7-3',
      icon: '💸',
      title: 'Risiko',
      question: 'Hva betyr høye faste kostnader?',
      choices: [
        { id: 'a', label: 'Bare positivt', isCorrect: false, feedback: 'Tveegget sverd.' },
{ id: 'b', label: 'Sårbar ved salgsfall — kostnader påløper uansett', isCorrect: true, feedback: 'Riktig! Strukturell risiko.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Restauranter med høy husleie er sårbare. Bare lavt salg over uker kan velte dem.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🔄',
            title: 'Lean Startup og pivot',
            quote: 'BMC som testverktøy.',
            content: 'Lean Startup: bruk BMC til å teste hypoteser. Hver byggesten er en antakelse — test den med ekte kunder. Hvis antakelsen feiler, må du \'pivotere\' (endre retning). Snapchat startet som geo-tagged bilder før de pivoterte til selvslettende meldinger. Klassisk eksempel.',
            subpoints: [
                  { label: 'HYPOTESER', text: 'Hver byggesten er antakelse — test.' },
          { label: 'PIVOT', text: 'Endre retning når antakelse feiler.' },
            ],
            practical: 'Hvilken antakelse i din ide kunne du testet i morgen?',
            exercises: [
            {
      id: 'ent104-8-1',
      icon: '🔄',
      title: 'Hva',
      question: 'Hva er Lean Startup-tilnærmingen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Test antakelser med ekte kunder før stor investering', isCorrect: true, feedback: 'Riktig! Forskningsbasert.' },
{ id: 'c', label: 'Bare planlegging', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare for tek', isCorrect: false, feedback: 'Bredt anvendelig.' },
      ],
      espenTip: 'Eric Ries populariserte Lean Startup. Modell brukt globalt nå.',
    },
    {
      id: 'ent104-8-2',
      icon: '🔄',
      title: 'Pivot',
      question: 'Hva er pivot?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'b', label: 'Endre retning når antakelse viser seg feil', isCorrect: true, feedback: 'Riktig! Adaptasjon.' },
{ id: 'c', label: 'Avslutte', isCorrect: false, feedback: 'For dramatisk.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Snapchat pivoterte fra geo-tagged bilder til selvslettende meldinger. Snapchat ble milliardselskap.',
    },
    {
      id: 'ent104-8-3',
      icon: '🔄',
      title: 'Hvorfor',
      question: 'Hvorfor pivotere?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Marked er ukjent terreng — antakelser viser seg ofte feil', isCorrect: true, feedback: 'Riktig! Realisme om usikkerhet.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for unge', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Mange suksess-startups pivoterte tidlig. Twitter startet som podcasting-plattform. YouTube som datingside.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '📋',
            title: 'BMC i praksis',
            quote: 'Hvordan bruke verktøyet.',
            content: 'BMC er ikke svaret — det er rammeverket som tvinger frem riktige spørsmål. Bruk det som dialog-verktøy, ikke fasit. Tegn ut canvas på vegg, fyll inn med post-its, diskuter med team. Iterer ofte. Bedre enn 100-side forretningsplan ingen leser.',
            subpoints: [
                  { label: 'DIALOG', text: 'Verktøy for samtale, ikke endelig fasit.' },
          { label: 'VISUELL', text: 'Tegn ut, bruk post-its, gjør synlig.' },
            ],
            practical: 'Tegn et BMC for en bedrifts-ide du har. Begynn med kundesegment + verdiløfte.',
            exercises: [
            {
      id: 'ent104-9-1',
      icon: '📋',
      title: 'Bruk',
      question: 'Hvordan bruke BMC?',
      choices: [
        { id: 'a', label: 'Som svar', isCorrect: false, feedback: 'Som rammeverk.' },
{ id: 'b', label: 'Som dialog-verktøy som tvinger frem riktige spørsmål', isCorrect: true, feedback: 'Riktig! Praktisk verktøy.' },
{ id: 'c', label: 'Bare for konsulenter', isCorrect: false, feedback: 'For ledelsen først.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Best praksis: BMC på storformat-papir, post-its for hver byggesten. Enkelt å iterere.',
    },
    {
      id: 'ent104-9-2',
      icon: '📋',
      title: 'Verdi',
      question: 'Hva gir BMC?',
      choices: [
        { id: 'a', label: 'Bare struktur', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Helhetsbilde + tvinger frem spørsmål + felles språk i teamet', isCorrect: true, feedback: 'Riktig! Multi-verdi.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Felles språk er undervurdert. BMC gjør det enkelt å diskutere strategi på tvers av roller.',
    },
    {
      id: 'ent104-9-3',
      icon: '📋',
      title: 'vs lang plan',
      question: 'Hvorfor BMC fremfor lang forretningsplan?',
      choices: [
        { id: 'a', label: 'Bare estetikk', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Lett å lese, lett å iterere, faktisk brukt av folk', isCorrect: true, feedback: 'Riktig! Praktisk overlegen.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: '200-side forretningsplan = 90 % sjanse at ingen leser. 1-side BMC = brukt jevnlig.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🚀',
            title: 'Spotify sin BMC',
            quote: 'Klassisk eksempel.',
            content: 'Spotify: Kundesegment = musikkfans. Verdiløfte = ubegrenset musikk billig. Kanaler = app, web. Inntekter = abonnement + reklame. Ressurser = musikkrettigheter + teknologi. Aktiviteter = utvikling + lisensiering. Partnere = plateselskaper. Kostnader = royalties + drift. BMC visualiserer hele modellen på én side.',
            subpoints: [
                  { label: 'HELHET', text: 'Alle 9 byggesteiner samlet.' },
          { label: 'KOMPLEKS MODELL', text: 'BMC gjør komplekse modeller forståelige.' },
            ],
            practical: 'Tegn BMC for Netflix. Hva er forskjellig fra Spotify?',
            exercises: [
            {
      id: 'ent104-10-1',
      icon: '🚀',
      title: 'Spotify-segment',
      question: 'Hva er Spotifys kundesegment?',
      choices: [
        { id: 'a', label: 'Bare musikere', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Musikkfans — globalt', isCorrect: true, feedback: 'Riktig! Bredt målmarked.' },
{ id: 'c', label: 'Bare bedrifter', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Spotify har 600+ mill brukere globalt. Massmarkedsmodell.',
    },
    {
      id: 'ent104-10-2',
      icon: '🚀',
      title: 'Spotify-inntekt',
      question: 'Hva er Spotifys inntektsmodell?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Abonnement + reklame fra free-tier', isCorrect: true, feedback: 'Riktig! Hybrid-modell.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hybrid-modell tillater å fange ulike kundesegmenter — gratis for budsjett-bevisste, premium for de som vil ha mer.',
    },
    {
      id: 'ent104-10-3',
      icon: '🚀',
      title: 'Spotify-partner',
      question: 'Hvem er Spotifys nøkkelpartnere?',
      choices: [
        { id: 'a', label: 'Bare brukere', isCorrect: false, feedback: 'Ikke partnere.' },
{ id: 'b', label: 'Plateselskaper og artister — uten musikkrettigheter, ingen tjeneste', isCorrect: true, feedback: 'Riktig! Kritiske partnere.' },
{ id: 'c', label: 'Bare Apple', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Spotify betaler 70+ % av inntektene til musikkrettigheter. Kritisk partnerskap.',
    },
            ],
          },
          {
            phaseNumber: 11,
            icon: '📐',
            title: 'BMC — levende dokument',
            quote: 'Utvikler seg med bedriften.',
            content: 'BMC er et levende dokument som utvikler seg med bedriften. Når marked endrer seg, må modellen oppdateres. Periodisk review (kvartalsvis) for vekstbedrifter. Spotify har endret BMC mange ganger — fra ren musikk til podcaster, lydbøker, livestreaming. Strategisk fleksibilitet.',
            subpoints: [
                  { label: 'LEVENDE', text: 'Oppdateres når marked endrer seg.' },
          { label: 'REVIEW', text: 'Kvartalsvis for vekstbedrifter.' },
            ],
            practical: 'Hvilke bedrifter har endret forretningsmodellen sin de siste 5 årene?',
            exercises: [
            {
      id: 'ent104-11-1',
      icon: '📐',
      title: 'Statisk?',
      question: 'Er BMC statisk?',
      choices: [
        { id: 'a', label: 'Ja, bestemmes én gang', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Nei — utvikler seg med bedriften og marked', isCorrect: true, feedback: 'Riktig! Levende dokument.' },
{ id: 'c', label: 'Bare hvert 10. år', isCorrect: false, feedback: 'For sjelden.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert review.' },
      ],
      espenTip: 'Spotify la til podcaster i 2018, lydbøker i 2022. Strategisk evolusjon.',
    },
    {
      id: 'ent104-11-2',
      icon: '📐',
      title: 'Microsoft',
      question: 'Hva endret Microsoft?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Stor endring.' },
{ id: 'b', label: 'Pivoterte fra produktsalg (Office) til abonnement (Microsoft 365)', isCorrect: true, feedback: 'Riktig! Forretningsmodell-innovasjon.' },
{ id: 'c', label: 'Bare logo', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Microsoft 365: predikerbar inntekt, lavere terskel for kunder. Strategisk transformation.',
    },
    {
      id: 'ent104-11-3',
      icon: '📐',
      title: 'Lærdom',
      question: 'Hva er strategisk lærdom?',
      choices: [
        { id: 'a', label: 'Modeller er statiske', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Strategisk fleksibilitet — vær villig til å endre modellen', isCorrect: true, feedback: 'Riktig! Dynamisk strategi.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Bedrifter som klamrer seg til gammel modell taper. Bedrifter som tør å pivotere vinner.',
    },
            ],
          },
        ]

        export default function ForretningsmodellBmcModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-04"
              moduleTitle="Forretningsmodellen (BMC)"
              moduleIcon="🗺️"
              storageKey="learning-ent1-forretningsmodell-bmc"
              completeRoute="/learning/ent1/forretningsmodell-bmc/complete"
              phases={phases}
              intro="Business Model Canvas — verktøyet som kondenserer en forretningsidé til ni byggeklosser. Visualiserer hele forretningsmodellen på én side. Brukt globalt av startups og store bedrifter."
              vissteduAt="Strategyzer (Alex Osterwalder) sin BMC har blitt brukt av over 5 millioner brukere globalt. Standard verktøy i moderne strategi."
              espenSier="BMC er ikke svaret — det er rammeverket som tvinger frem riktige spørsmål. Bruk det som dialog-verktøy, ikke fasit."
      presentationLink={{ route: '/learning/presentations/ent1/forretningsmodell-bmc', description: 'Forretningsmodellen (BMC) — 10 slides' }}
            />
          )
        }
