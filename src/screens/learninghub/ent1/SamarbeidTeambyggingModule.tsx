        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '👥',
            title: 'Hvorfor team?',
            quote: 'Utfyllende kompetanse.',
            content: 'Klassisk modell: \'Hacker\' (teknisk), \'Hustler\' (forretning) og \'Hipster\' (design). De fleste vellykkede oppstartsbedrifter har minst to gründere — én alene har sjelden alle ferdighetene som trengs. Komplementære evner > like kopier.',
            subpoints: [
                  { label: 'HACKER + HUSTLER + HIPSTER', text: 'Klassisk komplementær triade.' },
          { label: 'MULTI-FERDIGHET', text: 'Få har alt selv.' },
            ],
            practical: 'Hva er din \'rolle\' (hacker, hustler eller hipster)? Hvem trenger du på teamet?',
            exercises: [
            {
      id: 'ent110-1-1',
      icon: '👥',
      title: '3 typer',
      question: 'Hva er klassisk gründertriaden?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Hacker (teknisk), Hustler (forretning), Hipster (design)', isCorrect: true, feedback: 'Riktig! Komplementære roller.' },
{ id: 'c', label: 'Bare en type', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Begrepet kommer fra Y Combinator-miljøet. Tre komplementære perspektiver.',
    },
    {
      id: 'ent110-1-2',
      icon: '👥',
      title: 'Solo',
      question: 'Hvorfor solo-gründer ofte taper?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Få har alle nødvendige ferdigheter selv', isCorrect: true, feedback: 'Riktig! Multi-ferdighet kreves.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for tek', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Solo-gründere kan lykkes (Mailchimp, Basecamp), men er statistisk sjeldent.',
    },
    {
      id: 'ent110-1-3',
      icon: '👥',
      title: 'Komplementær',
      question: 'Hva betyr komplementær?',
      choices: [
        { id: 'a', label: 'Like kopier', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Utfyllende ferdigheter — ikke konkurrerende', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare venner', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'To ingeniører er ikke komplementært — bare dobbelt så mye av samme. Trenger forretning + design.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🌊',
            title: 'Team-modning (Tuckman)',
            quote: 'Forming, storming, norming, performing.',
            content: 'Bruce Tuckmans fire faser: forming (oppstart, høflig), storming (konflikter, posisjoneringer), norming (regler etableres), performing (full effektivitet). Mange team gir opp i storming-fasen — det er normalt og må gjennomleves.',
            subpoints: [
                  { label: '4 FASER', text: 'Forming → storming → norming → performing.' },
          { label: 'STORMING NORMALT', text: 'Konflikter er sunne — bygger team.' },
            ],
            practical: 'Hvilken fase er et team du har vært del av? Storming?',
            exercises: [
            {
      id: 'ent110-2-1',
      icon: '🌊',
      title: 'Faser',
      question: 'Hva er Tuckmans 4 faser?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Forming, storming, norming, performing', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
{ id: 'c', label: 'Bare oppstart', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Tuckman publiserte i 1965. Lagt til \'adjourning\' senere for team-avslutning.',
    },
    {
      id: 'ent110-2-2',
      icon: '🌊',
      title: 'Storming',
      question: 'Hva er storming?',
      choices: [
        { id: 'a', label: 'Bare ros', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Konflikter, posisjoneringer, definere roller', isCorrect: true, feedback: 'Riktig! Sunn fase.' },
{ id: 'c', label: 'Slutten', isCorrect: false, feedback: 'Det er adjourning.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Storming er ikke svikt — det er bygging. Team som unngår storming når sjelden performing.',
    },
    {
      id: 'ent110-2-3',
      icon: '🌊',
      title: 'Lærdom',
      question: 'Hva er lærdommen?',
      choices: [
        { id: 'a', label: 'Unngå konflikt', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Konflikt er sunt — gjennomgå det med struktur', isCorrect: true, feedback: 'Riktig! Strategisk håndtering.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Mange team gir opp i storming. De som klarer det får full effektivitet i performing.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🎭',
            title: 'Belbins teamroller',
            quote: '9 roller i et team.',
            content: 'Meredith Belbin identifiserte 9 team-roller: idéskaperen, iverksetteren, koordinatoren, analytikeren m.fl. Alle roller er nødvendige; team som mangler én rolle kompenserer dårlig. Belbin-test kan brukes for å analysere ditt team.',
            subpoints: [
                  { label: '9 ROLLER', text: 'Multi-rolle-team.' },
          { label: 'BALANSE', text: 'Manglende roller skaper svakhet.' },
            ],
            practical: 'Hvilken Belbin-rolle tror du er din naturlige?',
            exercises: [
            {
      id: 'ent110-3-1',
      icon: '🎭',
      title: 'Antall',
      question: 'Hvor mange roller?',
      choices: [
        { id: 'a', label: '3', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '9', isCorrect: true, feedback: 'Riktig! Belbins komplette modell.' },
{ id: 'c', label: '20', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver rolle har styrker og \'tillatte svakheter\'. Sammen utfyller de hverandre.',
    },
    {
      id: 'ent110-3-2',
      icon: '🎭',
      title: 'Idéskaper',
      question: 'Hva gjør idéskaperen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Genererer kreative ideer og løsninger', isCorrect: true, feedback: 'Riktig! Kreativ rolle.' },
{ id: 'c', label: 'Bare lytte', isCorrect: false, feedback: 'Det er overvåkeren.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver rolle er beskrevet i Belbin-modellen. Idéskaper er en av de mest synlige.',
    },
    {
      id: 'ent110-3-3',
      icon: '🎭',
      title: 'Test',
      question: 'Hva er Belbin-testen?',
      choices: [
        { id: 'a', label: 'Personlighetstest', isCorrect: false, feedback: 'Spesifikk team-test.' },
{ id: 'b', label: 'Spørreskjema som identifiserer dine teamroller', isCorrect: true, feedback: 'Riktig! Praktisk verktøy.' },
{ id: 'c', label: 'IQ-test', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Belbin-test er kommersiell tjeneste. Mange bedrifter bruker det for team-utvikling.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '💬',
            title: 'Kommunikasjon i teamet',
            quote: 'Åpenhet og lytting.',
            content: 'Åpenhet, aktiv lytting og konstruktiv tilbakemelding. Slack, Teams, Notion gjør den daglige kommunikasjonen lett — men ingen verktøy erstatter ærlige samtaler. Etablér rutiner for både formell og uformell kontakt. Sett av tid til 1:1.',
            subpoints: [
                  { label: 'ÅPENHET', text: 'Si fra før det blir konflikt.' },
          { label: 'RUTINER', text: 'Faste samtaler bygger sikkerhet.' },
            ],
            practical: 'Hvilke kommunikasjons-vaner ville du etablert i et nytt team?',
            exercises: [
            {
      id: 'ent110-4-1',
      icon: '💬',
      title: 'Verktøy vs samtaler',
      question: 'Hva er viktigst?',
      choices: [
        { id: 'a', label: 'Slack alene', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Verktøy + ekte samtaler — begge nødvendig', isCorrect: true, feedback: 'Riktig! Komplementært.' },
{ id: 'c', label: 'Bare e-post', isCorrect: false, feedback: 'For tregt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Verktøy er tidssparere, ikke relasjon-byggere. Trenger fysisk/video-tid for tillit.',
    },
    {
      id: 'ent110-4-2',
      icon: '💬',
      title: '1:1',
      question: 'Hva er 1:1?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Faste 1-mot-1 samtaler mellom leder og ansatt', isCorrect: true, feedback: 'Riktig! Standard ledelsesverktøy.' },
{ id: 'c', label: 'Bare i krise', isCorrect: false, feedback: 'Konstant praksis.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Beste team har faste 1:1 ukentlig eller annenhver uke. Bygger tillit og fanger problemer tidlig.',
    },
    {
      id: 'ent110-4-3',
      icon: '💬',
      title: 'Aktivt lytte',
      question: 'Hva betyr aktivt lytte?',
      choices: [
        { id: 'a', label: 'Bare være stille', isCorrect: false, feedback: 'For passivt.' },
{ id: 'b', label: 'Forstå før du svarer — gjenta tilbake, still oppfølgingsspørsmål', isCorrect: true, feedback: 'Riktig! Strukturert teknikk.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare høre', isCorrect: false, feedback: 'For passivt.' },
      ],
      espenTip: 'Stephen Covey: \'Forstå først, så bli forstått.\' Klassisk innsikt om kommunikasjon.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🤜',
            title: 'Konflikthåndtering',
            quote: 'Løse uenigheter konstruktivt.',
            content: 'Hvordan løse uenigheter før de ødelegger bedriften. Lytt aktivt, fokuser på problemet (ikke personen), søk felles interesser, kompromiss eller mekling. Aksjonæravtalen er førstelinjeforsvar mot eskalering. Eksterne meklere kan hjelpe.',
            subpoints: [
                  { label: 'PROBLEM > PERSON', text: 'Skill mellom person og problem.' },
          { label: 'AKSJONÆRAVTALE', text: 'Forebygging er bedre enn løsning.' },
            ],
            practical: 'Hvordan ville du håndtert konflikt med medgründer om strategi?',
            exercises: [
            {
      id: 'ent110-5-1',
      icon: '🤜',
      title: 'Problem vs person',
      question: 'Hovedprinsippet?',
      choices: [
        { id: 'a', label: 'Angripe personen', isCorrect: false, feedback: 'For destruktivt.' },
{ id: 'b', label: 'Skille person og problem — angripe problemet, ikke personen', isCorrect: true, feedback: 'Riktig! Klassisk teknikk.' },
{ id: 'c', label: 'Ignorere', isCorrect: false, feedback: 'Eskalerer.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Harvard Negotiation Project: \'Hard on the problem, soft on the people.\' Effektiv tilnærming.',
    },
    {
      id: 'ent110-5-2',
      icon: '🤜',
      title: 'Mekling',
      question: 'Når mekling?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Effektivt verktøy.' },
{ id: 'b', label: 'Når intern løsning ikke virker — ekstern part hjelper', isCorrect: true, feedback: 'Riktig! Profesjonell hjelp.' },
{ id: 'c', label: 'Bare i retten', isCorrect: false, feedback: 'Mekling unngår retten.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mekling koster langt mindre enn rettsak. Mange tvister løses raskt med god mekler.',
    },
    {
      id: 'ent110-5-3',
      icon: '🤜',
      title: 'Forebygging',
      question: 'Beste forebygging?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Aksjonæravtale + faste team-møter + åpenhet', isCorrect: true, feedback: 'Riktig! Multi-tiltak.' },
{ id: 'c', label: 'Bare avtale', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Forebygging er overlegen håndtering. Avtaler + kultur er nøkkelen.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🔥',
            title: 'Motivasjon',
            quote: 'Indre vs ytre.',
            content: 'Indre motivasjon (mestring, mening) vs ytre motivasjon (lønn, bonus). Daniel Pinks bok \'Drive\' viser at autonomi, mestring og formål driver høy ytelse mer enn pengebelønning. Lønn er nødvendig men ikke tilstrekkelig.',
            subpoints: [
                  { label: 'INDRE > YTRE', text: 'Indre motivasjon varer lenger.' },
          { label: 'DRIVE', text: 'Autonomi + mestring + formål.' },
            ],
            practical: 'Hva motiverer deg mest — penger eller mening?',
            exercises: [
            {
      id: 'ent110-6-1',
      icon: '🔥',
      title: 'Pinks 3',
      question: 'Hva er Daniel Pinks 3 drivere?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Autonomi, mestring, formål', isCorrect: true, feedback: 'Riktig! \'Drive\'-modell.' },
{ id: 'c', label: 'Bare penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Pinks \'Drive\' (2009) endret motivasjons-tenkning. Forskningsbasert.',
    },
    {
      id: 'ent110-6-2',
      icon: '🔥',
      title: 'Lønn',
      question: 'Hvor langt rekker lønn?',
      choices: [
        { id: 'a', label: 'Uendelig', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Nødvendig, men ikke tilstrekkelig — folk venner seg til lønn', isCorrect: true, feedback: 'Riktig! Pengelykke flater ut.' },
{ id: 'c', label: 'Bare for unge', isCorrect: false, feedback: 'Aldersnøytralt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forskning: pengelykke flate ut etter ~75 000 USD i USA. Mer penger ≠ mer motivasjon.',
    },
    {
      id: 'ent110-6-3',
      icon: '🔥',
      title: 'Formål',
      question: 'Hvorfor formål?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Folk vil føle at arbeidet betyr noe — særlig yngre', isCorrect: true, feedback: 'Riktig! Generasjons-skifte.' },
{ id: 'c', label: 'Bare i frivillig sektor', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk verdi.' },
      ],
      espenTip: 'Yngre prioriterer formål høyere enn forrige generasjoner. Strategisk tilpasning kreves.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '💻',
            title: 'Virtuelle team',
            quote: 'Samarbeid via digitale verktøy.',
            content: 'Samarbeid via digitale verktøy (Slack, Teams, Trello, Notion). Pandemien viste at det funker — men krever klarere prosesser, regelmessige videosamtaler, og bevisst innsats for å bygge team-følelsen som kommer naturlig på kontoret.',
            subpoints: [
                  { label: 'VERKTØY', text: 'Slack, Teams, Notion, Trello er standard.' },
          { label: 'BEVISST INNSATS', text: 'Team-følelse må bygges aktivt online.)' },
            ],
            practical: 'Hva er forskjellen på fysisk og virtuelt teamarbeid?',
            exercises: [
            {
      id: 'ent110-7-1',
      icon: '💻',
      title: 'Verktøy',
      question: 'Hvilke standard verktøy?',
      choices: [
        { id: 'a', label: 'Bare e-post', isCorrect: false, feedback: 'For begrenset.' },
{ id: 'b', label: 'Slack/Teams (chat), Notion (dokumenter), Trello (oppgaver), Zoom (video)', isCorrect: true, feedback: 'Riktig! Verktøystakk.' },
{ id: 'c', label: 'Bare telefon', isCorrect: false, feedback: 'For begrenset.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver kategori har egne ledende verktøy. Velg hva som passer team-størrelse og kultur.',
    },
    {
      id: 'ent110-7-2',
      icon: '💻',
      title: 'Utfordring',
      question: 'Hva er hovedutfordringen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Bygge team-følelse og tillit uten fysisk kontakt', isCorrect: true, feedback: 'Riktig! Strukturell utfordring.' },
{ id: 'c', label: 'Bare teknologi', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Pandemien viste utfordringen: tillit bygges saktere virtuelt. Krever bevisst arbeid.',
    },
    {
      id: 'ent110-7-3',
      icon: '💻',
      title: 'Hybrid',
      question: 'Beste tilnærming?',
      choices: [
        { id: 'a', label: 'Bare virtuelt', isCorrect: false, feedback: 'Mister noe.' },
{ id: 'b', label: 'Hybrid — fysiske møter regelmessig + virtuell daglig kommunikasjon', isCorrect: true, feedback: 'Riktig! Beste av begge.' },
{ id: 'c', label: 'Bare fysisk', isCorrect: false, feedback: 'Mister fleksibilitet.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Mange selskaper finner hybrid optimalt — fast i samme rom kvartalsvis, virtuell daglig.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '👤',
            title: 'Lederrollen i oppstarten',
            quote: 'Fra \'doer\' til \'enabler\'.',
            content: 'Gründerens rolle endrer seg. I starten er du \'doer\' (gjør alt selv). Etter hvert \'enabler\' (lar andre gjøre). Mange gründere klarer ikke overgangen — og blir flaskehalsen som hindrer veksten. Krever bevisst skifte i mindset.',
            subpoints: [
                  { label: 'DOER → ENABLER', text: 'Skifte i fokus etter hvert som teamet vokser.' },
          { label: 'FLASKEHALS-RISIKO', text: 'Gründer kan bli vekstbremmer.' },
            ],
            practical: 'Hva ville du synes vanskelig med å delegere oppgaver?',
            exercises: [
            {
      id: 'ent110-8-1',
      icon: '👤',
      title: 'Skifte',
      question: 'Hva må gründer skifte?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Fra å gjøre alt selv til å la andre gjøre — lede vs utføre', isCorrect: true, feedback: 'Riktig! Strukturell endring.' },
{ id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Mange gründere identifiserer seg med å gjøre. Skifte til ledelse er emosjonelt vanskelig.',
    },
    {
      id: 'ent110-8-2',
      icon: '👤',
      title: 'Flaskehals',
      question: 'Hvorfor blir gründer flaskehals?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Tar alle beslutninger selv — teamet kan ikke handle uten gründer', isCorrect: true, feedback: 'Riktig! Sentralisering.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Klassisk vekst-problem. Bedrift kan ikke vokse forbi gründerens daglige kapasitet.',
    },
    {
      id: 'ent110-8-3',
      icon: '👤',
      title: 'Løsning',
      question: 'Hvordan unngå?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Aktivt delegere + bygge systemer + ansette ledere', isCorrect: true, feedback: 'Riktig! Strukturelt arbeid.' },
{ id: 'c', label: 'Bare gjøre mer selv', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Microsoft Bill Gates, Amazon Jeff Bezos — alle delegerte aktivt for å skalere. Modellen er klar.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Snapchat-stiftelsen',
            quote: 'Hva som skjer uten avtale.',
            content: 'Snapchat ble stiftet av Evan Spiegel, Bobby Murphy og Reggie Brown. Brown ble skviset ut i tidlig fase — over 150 millioner dollar i rettssak senere. Konflikt om eierskap er en hovedårsak til at gründerteam kollapser. Skriv aksjonæravtale TIDLIG.',
            subpoints: [
                  { label: 'KLASSISK FEIL', text: 'Stiftelses-konflikt er svært vanlig.' },
          { label: 'AKSJONÆRAVTALE TIDLIG', text: 'Forebygg når dere er enige.' },
            ],
            practical: 'Hva ville vært i din aksjonæravtale med medgründer?',
            exercises: [
            {
      id: 'ent110-9-1',
      icon: '⚠️',
      title: 'Hva skjedde',
      question: 'Hva med Reggie Brown?',
      choices: [
        { id: 'a', label: 'Forblev grunnlegger', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Skviset ut, saksøkte, fikk over 150 mill USD', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Helt fiktivt', isCorrect: false, feedback: 'Reell sak.' },
      ],
      espenTip: 'Snapchat-saken er studie-objekt. Lærdom: aksjonæravtale tidlig.',
    },
    {
      id: 'ent110-9-2',
      icon: '⚠️',
      title: 'Frekvens',
      question: 'Hvor vanlige er gründer-konflikter?',
      choices: [
        { id: 'a', label: 'Sjelden', isCorrect: false, feedback: 'Vanlig.' },
{ id: 'b', label: 'Veldig vanlige — 65 % av startup-kollaps har komponent', isCorrect: true, feedback: 'Riktig! Strukturelt mønster.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forskning konsistent: konflikt er hovedårsak til startup-kollaps. Forebygg!',
    },
    {
      id: 'ent110-9-3',
      icon: '⚠️',
      title: 'Når avtale',
      question: 'Når skrive avtale?',
      choices: [
        { id: 'a', label: 'Når konflikt', isCorrect: false, feedback: 'For sent.' },
{ id: 'b', label: 'Før dere starter sammen — alltid før konflikt', isCorrect: true, feedback: 'Riktig! Proaktiv.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Når dere er i forelskede gründer-fasen er det enklest å bli enige. Konflikt-fase er for sent.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🏆',
            title: 'Team slår idé',
            quote: 'Investorer satser på folk.',
            content: 'En middels idé med fantastisk team vinner over en fantastisk idé med middels team. Investorer satser ofte mer på team enn på produkt — fordi en sterkt team kan endre produkt, men et svakt team kan ikke endre seg selv. Bygg team først, idé andre.',
            subpoints: [
                  { label: 'TEAM > IDÉ', text: 'Sterkt team adapterer; svakt team kollapser.' },
          { label: 'INVESTORER VET', text: 'Satser på folk over produkt.' },
            ],
            practical: 'Hva er den viktigste lærdommen om team for entreprenører?',
            exercises: [
            {
      id: 'ent110-10-1',
      icon: '🏆',
      title: 'Hva slår',
      question: 'Hva slår alt annet?',
      choices: [
        { id: 'a', label: 'Bare ide', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Middels idé + fantastisk team > fantastisk idé + middels team', isCorrect: true, feedback: 'Riktig! Investor-prinsipp.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert mønster.' },
{ id: 'd', label: 'Bare penger', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Y Combinator, Sequoia, andre topp-investorer satser på team. Klassisk innsikt.',
    },
    {
      id: 'ent110-10-2',
      icon: '🏆',
      title: 'Hvorfor',
      question: 'Hvorfor team viktigst?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Sterkt team kan endre produkt; svakt team kan ikke endre seg selv', isCorrect: true, feedback: 'Riktig! Adaptivitet.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for tek', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Pivot er normalt. Team som klarer pivot vinner. Svakt team feiler ved første utfordring.',
    },
    {
      id: 'ent110-10-3',
      icon: '🏆',
      title: 'Lærdom',
      question: 'Hovedlærdom?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Bygg team før du investerer i produkt', isCorrect: true, feedback: 'Riktig! Strategisk prioritering.' },
{ id: 'c', label: 'Bare ide', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Steve Jobs: \'Hire smart people and let them tell you what to do.\' Klassisk innsikt.',
    },
            ],
          },
        ]

        export default function SamarbeidTeambyggingModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-10"
              moduleTitle="Samarbeid og teambygging"
              moduleIcon="🤝"
              storageKey="learning-ent1-samarbeid-teambygging"
              completeRoute="/learning/ent1/samarbeid-teambygging/complete"
              phases={phases}
              intro="Sammen er vi sterkere — utfyllende kompetanse og god dynamikk er ofte viktigere enn ideen. Investorer satser på team — ofte mer enn på produkt."
              vissteduAt="En middels idé med fantastisk team vinner over en fantastisk idé med middels team. Investorer satser ofte mer på team enn på produkt."
              espenSier="Mange gründerteam kollapser pga konflikt om eierskap — ikke pga produkt. Skriv aksjonæravtale TIDLIG."
      presentationLink={{ route: '/learning/presentations/ent1/samarbeid-teambygging', description: 'Samarbeid og teambygging — 10 slides' }}
            />
          )
        }
