        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '💵',
            title: 'Kapitalbehov',
            quote: 'Hvor mye trenger vi?',
            content: 'Kapitalbehov: hvor mye penger trenger vi før vi begynner å tjene penger? Beregn likviditetsbehovet måned for måned: lønn, husleie, utstyr, markedsføring, mva. Mange undervurderer behovet og må hente nye penger i en svak posisjon.',
            subpoints: [
                  { label: 'LIKVIDITETSBEHOV', text: 'Måned-for-måned-beregning av cash-behov.' },
          { label: 'MARGIN', text: 'Legg til 30-50 % buffer — uventede kostnader kommer alltid.' },
            ],
            practical: 'Hva ville en lokal kafé trenge i kapital før den begynte å tjene penger?',
            exercises: [
            {
      id: 'ent106-1-1',
      icon: '💵',
      title: 'Hva',
      question: 'Hva er kapitalbehov?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Penger som trengs før bedriften går i pluss', isCorrect: true, feedback: 'Riktig! \'Runway\' til lønnsomhet.' },
{ id: 'c', label: 'Bare oppstart', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: '\'Runway\' i startup-språk: hvor lang tid bedriften kan operere uten ny kapital.',
    },
    {
      id: 'ent106-1-2',
      icon: '💵',
      title: 'Beregning',
      question: 'Hvordan beregne?',
      choices: [
        { id: 'a', label: 'Magefølelse', isCorrect: false, feedback: 'For unøyaktig.' },
{ id: 'b', label: 'Måned for måned: alle utgifter minus forventede inntekter', isCorrect: true, feedback: 'Riktig! Strukturert beregning.' },
{ id: 'c', label: 'Bare en sum', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Likviditetsbudsjett er standard verktøy. Excel-template tilgjengelig fra Innovasjon Norge.',
    },
    {
      id: 'ent106-1-3',
      icon: '💵',
      title: 'Buffer',
      question: 'Hvor mye buffer?',
      choices: [
        { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'For risikabelt.' },
{ id: 'b', label: '30-50 % over beregnet behov — uventede kostnader kommer alltid', isCorrect: true, feedback: 'Riktig! Realistisk margin.' },
{ id: 'c', label: '100 %', isCorrect: false, feedback: 'Ofte for mye.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Murphys lov i forretning: alt tar lengre tid og koster mer enn planlagt. Buffer er nødvendig.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🏠',
            title: 'Egenkapital',
            quote: 'Sparepenger og \'love money\'.',
            content: 'Egenkapital: penger gründerne selv spytter inn eller henter fra venner og familie (\'love money\'). Risiko deles ofte med personlige relasjoner — sørg for klare avtaler selv med mor og far. Egenkapital signaliserer commitment til andre investorer.',
            subpoints: [
                  { label: 'EGNE PENGER', text: 'Personlig investering signaliserer tro.' },
          { label: 'LOVE MONEY', text: 'Familie/venner — krever klare avtaler.' },
            ],
            practical: 'Hva er fordeler og ulemper ved å låne av familie?',
            exercises: [
            {
      id: 'ent106-2-1',
      icon: '🏠',
      title: 'Hva',
      question: 'Hva er egenkapital?',
      choices: [
        { id: 'a', label: 'Bare lån', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Penger eierne selv legger inn — ikke lån, men eierandel', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare fra venner', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Egenkapital er buffer mot tap. Større egenkapital = lavere risiko for bedriften.',
    },
    {
      id: 'ent106-2-2',
      icon: '🏠',
      title: 'Love money',
      question: 'Hva er love money?',
      choices: [
        { id: 'a', label: 'Romantiske partnere', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Investeringer fra venner og familie', isCorrect: true, feedback: 'Riktig! Folk som investerer i deg pga relasjon.' },
{ id: 'c', label: 'Bare gaver', isCorrect: false, feedback: 'Investering, ikke gaver.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange suksess-startups startet med love money. Klare avtaler er kritiske for å bevare relasjoner.',
    },
    {
      id: 'ent106-2-3',
      icon: '🏠',
      title: 'Risiko',
      question: 'Hva er risiko ved love money?',
      choices: [
        { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'b', label: 'Tap av relasjoner hvis det går galt', isCorrect: true, feedback: 'Riktig! Personlig risiko.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare økonomisk', isCorrect: false, feedback: 'Større risiko enn økonomisk.' },
      ],
      espenTip: 'Klart definerte vilkår skriftlig: er det lån, gave eller eierandel? Forebygg konflikt.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🏦',
            title: 'Lån og kreditt',
            quote: 'Banklån og leverandørkreditt.',
            content: 'Banklån: krever sikkerhet og personlig garanti for små bedrifter. Banker er konservative — de vil sjelden finansiere ren oppstartsrisiko. Kassekreditt: fleksibilitet på løpende konto. Leverandørkreditt: utsatt betaling fra leverandører — gratis finansiering hvis man bruker den riktig.',
            subpoints: [
                  { label: 'BANKLÅN', text: 'Krever sikkerhet — vanskelig for oppstart.' },
          { label: 'LEVERANDØRKREDITT', text: 'Utsatt betaling = gratis finansiering.' },
            ],
            practical: 'Hvilke kredittformer ville du brukt for å finansiere en ny bedrift?',
            exercises: [
            {
      id: 'ent106-3-1',
      icon: '🏦',
      title: 'Banklån',
      question: 'Hva krever banker?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Strenge krav.' },
{ id: 'b', label: 'Sikkerhet (pant), personlig garanti, dokumentasjon', isCorrect: true, feedback: 'Riktig! Konservative.' },
{ id: 'c', label: 'Bare god ide', isCorrect: false, feedback: 'For lite.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Banker tjener på rente, ikke risiko. Vil ha sikkerhet for å begrense tap ved konkurs.',
    },
    {
      id: 'ent106-3-2',
      icon: '🏦',
      title: 'Leverandørkreditt',
      question: 'Hva er leverandørkreditt?',
      choices: [
        { id: 'a', label: 'Lån fra bank', isCorrect: false, feedback: 'Annet.' },
{ id: 'b', label: 'Utsatt betaling fra leverandører — typisk 30-60 dager', isCorrect: true, feedback: 'Riktig! Innebygget finansiering.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Brukes alle størrelser.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Klassisk finansiering: kjøp i dag, betal om 60 dager. Selg varene først, betal leverandøren etterpå.',
    },
    {
      id: 'ent106-3-3',
      icon: '🏦',
      title: 'Personlig garanti',
      question: 'Hva er personlig garanti?',
      choices: [
        { id: 'a', label: 'Aksjekapital', isCorrect: false, feedback: 'Annet.' },
{ id: 'b', label: 'Du står personlig ansvarlig for lånet selv om bedriften er AS', isCorrect: true, feedback: 'Riktig! Bryter ned AS-skjermen.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Krever ofte for små.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange små AS-eiere må gi personlig garanti for banklån. Bryter den begrensede ansvar-fordelen.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🇳🇴',
            title: 'Innovasjon Norge',
            quote: 'Statlige tilskudd og lån.',
            content: 'Innovasjon Norge tilbyr markedsavklaringstilskudd (opp til 100 000 kr), kommersialiseringstilskudd og lån. Forskningsrådet finansierer FoU. Søknadsprosessen er omfattende — men gratis penger er verdt arbeidet. Stort statlig støtteapparat for norske gründere.',
            subpoints: [
                  { label: 'FLERE ORDNINGER', text: 'Tilskudd, lån, mentor, internasjonalisering.' },
          { label: 'OMFATTENDE SØKNAD', text: 'Tar tid — men ofte verdt det.' },
            ],
            practical: 'Hva ville du søkt om hos Innovasjon Norge for en startup-ide?',
            exercises: [
            {
      id: 'ent106-4-1',
      icon: '🇳🇴',
      title: 'Hva',
      question: 'Hva er Innovasjon Norge?',
      choices: [
        { id: 'a', label: 'Privat bank', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Statlig institusjon for å støtte næringsutvikling', isCorrect: true, feedback: 'Riktig! Statlig hjelpe-organisasjon.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'For oppstart også.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Innovasjon Norge har 30 kontorer i Norge + flere internasjonalt. Bredt mandat.',
    },
    {
      id: 'ent106-4-2',
      icon: '🇳🇴',
      title: 'Markedsavklaringstilskudd',
      question: 'Hva er det?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Tilskudd opp til 100 000 kr for å undersøke om idé har marked', isCorrect: true, feedback: 'Riktig! Tidlig fase-støtte.' },
{ id: 'c', label: 'Bare lån', isCorrect: false, feedback: 'Tilskudd, ikke lån.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Brukes for kundeintervjuer, markedsundersøkelser, validering. Lav-risiko statlig støtte.',
    },
    {
      id: 'ent106-4-3',
      icon: '🇳🇴',
      title: 'Søknad',
      question: 'Hva kreves i søknad?',
      choices: [
        { id: 'a', label: 'Bare ide', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Forretningsplan, markedsanalyse, team-presentasjon, milepæler', isCorrect: true, feedback: 'Riktig! Strukturert dokumentasjon.' },
{ id: 'c', label: 'Bare økonomi', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Innovasjon Norge har egne maler. Bruk veiledere — ofte gratis støtte til søknads-skriving.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🌐',
            title: 'Crowdfunding',
            quote: 'Folkefinansiering.',
            content: 'Crowdfunding: hente små beløp fra mange mennesker via plattformer som Kickstarter, Indiegogo eller norske Folkeinvest. Gir både penger og første kundebase samtidig — perfekt validering av produktidé. Mange suksesser har startet her.',
            subpoints: [
                  { label: 'VALIDATION + PENGER', text: 'Markedsbevisning gjennom forhåndsbestillinger.' },
          { label: 'PLATTFORMER', text: 'Kickstarter (intl), Folkeinvest (norsk).' },
            ],
            practical: 'Hvilke produkter du kjenner har startet via crowdfunding?',
            exercises: [
            {
      id: 'ent106-5-1',
      icon: '🌐',
      title: 'Hva',
      question: 'Hva er crowdfunding?',
      choices: [
        { id: 'a', label: 'Lån fra bank', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Hente små beløp fra mange via digitale plattformer', isCorrect: true, feedback: 'Riktig! Folkefinansiering.' },
{ id: 'c', label: 'Bare for vekselgjeld', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Pebble Watch hentet 10+ mill USD i 2012 via Kickstarter. Klassisk eksempel på crowdfunding-suksess.',
    },
    {
      id: 'ent106-5-2',
      icon: '🌐',
      title: 'Norsk plattform',
      question: 'Hvilken norsk plattform?',
      choices: [
        { id: 'a', label: 'Bare amerikanske', isCorrect: false, feedback: 'Norske finnes.' },
{ id: 'b', label: 'Folkeinvest (aksje-basert), Bidra.no (donasjon)', isCorrect: true, feedback: 'Riktig! Norske alternativer.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Folkeinvest er regulert av Finanstilsynet. Aksje-crowdfunding lovregulert i Norge.',
    },
    {
      id: 'ent106-5-3',
      icon: '🌐',
      title: 'Fordel',
      question: 'Hva er hovedfordelen?',
      choices: [
        { id: 'a', label: 'Bare penger', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Validering — hvis folk forhåndsbestiller, har du marked', isCorrect: true, feedback: 'Riktig! Beste markedsundersøkelse.' },
{ id: 'c', label: 'Lavere skatt', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forhåndsbestilling er strengeste markedstest. Folk som faktisk legger ut penger.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '👼',
            title: 'Business Angels',
            quote: 'Engleinvestorer.',
            content: 'Business Angels (engleinvestorer): private investorer som bidrar med både kapital (typisk 500 000 — 5 millioner) og kompetanse. De forventer ofte 10-30 % eierandel og aktiv styreplass. Bra for bedrifter som trenger mer enn penger. Norske angels: SmartEnergi, Norway Angel Network.',
            subpoints: [
                  { label: 'PENGER + KOMPETANSE', text: 'Mer enn kapital — mentorskap og nettverk.' },
          { label: 'EIERANDEL', text: '10-30 % typisk for tidlig fase.' },
            ],
            practical: 'Hva ville du verdsatt mest fra en engleinvestor — penger eller kompetanse?',
            exercises: [
            {
      id: 'ent106-6-1',
      icon: '👼',
      title: 'Hva',
      question: 'Hva tilbyr engleinvestorer?',
      choices: [
        { id: 'a', label: 'Bare penger', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Kapital + kompetanse + nettverk + mentorskap', isCorrect: true, feedback: 'Riktig! Multi-pakke.' },
{ id: 'c', label: 'Bare lån', isCorrect: false, feedback: 'Eierandel, ikke lån.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: '\'Smart money\' — penger med ekspertise. Verdifullt for unge gründere.',
    },
    {
      id: 'ent106-6-2',
      icon: '👼',
      title: 'Eierandel',
      question: 'Hva forventer de?',
      choices: [
        { id: 'a', label: '0 %', isCorrect: false, feedback: 'Sjelden.' },
{ id: 'b', label: '10-30 % eierandel + ofte styreplass', isCorrect: true, feedback: 'Riktig! Aktivt eierskap.' },
{ id: 'c', label: '100 %', isCorrect: false, feedback: 'Helt urealistisk.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Engleinvestorer satser på vekst — kompenserer høy risiko med stor eierandel ved suksess.',
    },
    {
      id: 'ent106-6-3',
      icon: '👼',
      title: 'Norske',
      question: 'Norske angels-nettverk?',
      choices: [
        { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Norway Angel Network, SmartEnergi, lokale grupper', isCorrect: true, feedback: 'Riktig! Aktiv miljø.' },
{ id: 'c', label: 'Bare en', isCorrect: false, feedback: 'Flere finnes.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Norge har voksende engle-miljø. Mange tidligere gründere reinvesterer profitt i nye startups.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🎒',
            title: 'Bootstrapping',
            quote: 'Drive for egne midler.',
            content: 'Bootstrapping: drive for egne midler uten ekstern kapital. Fokus på lav kostnad og rask inntjening. Mange suksesser startet bootstrapped (Mailchimp, GitHub, Basecamp) — gir full kontroll, men begrenser veksttakten. Norsk eksempel: Visma startet bootstrapped.',
            subpoints: [
                  { label: 'FULL KONTROLL', text: 'Ingen investorer = ingen krav på styret.' },
          { label: 'BEGRENSER VEKST', text: 'Kapitalmangel kan hindre rask skalering.' },
            ],
            practical: 'Hva er fordeler og ulemper ved bootstrapping?',
            exercises: [
            {
      id: 'ent106-7-1',
      icon: '🎒',
      title: 'Hva',
      question: 'Hva er bootstrapping?',
      choices: [
        { id: 'a', label: 'Crowdfunding', isCorrect: false, feedback: 'Annet.' },
{ id: 'b', label: 'Drive for egne midler uten ekstern kapital', isCorrect: true, feedback: 'Riktig! Egenfinansiert vekst.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'For oppstart især.' },
      ],
      espenTip: 'Mailchimp ble bootstrapped fra startup til 12 mrd USD-salg. Klassisk eksempel.',
    },
    {
      id: 'ent106-7-2',
      icon: '🎒',
      title: 'Fordel',
      question: 'Hva er hovedfordelen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Full kontroll + ingen press fra investorer', isCorrect: true, feedback: 'Riktig! Strategisk frihet.' },
{ id: 'c', label: 'Mest penger', isCorrect: false, feedback: 'Tvert imot — mindre.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Mailchimp-grunnleggerne solgte for 12 mrd USD — beholdt full kontroll hele veien.',
    },
    {
      id: 'ent106-7-3',
      icon: '🎒',
      title: 'Ulempe',
      question: 'Hva er hovedulempen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Begrenset vekstkapital — vanskelig å skalere raskt', isCorrect: true, feedback: 'Riktig! Strategisk trade-off.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for små', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Konkurrenter med mye kapital kan kjøpe markedsandel. Bootstrapping krever forsiktig vekst.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🎤',
            title: 'Pitching for kapital',
            quote: 'Overbevis investorer på 3 minutter.',
            content: 'Hvordan presentere idéen for å overbevise investorer på 3 minutter. Standard pitch er 3-10 minutter: problem, løsning, marked, forretningsmodell, team, traksjon, behov. Øv mange ganger — du får bare ett møte per investor. Gode pitch-kurs gjennom Innovasjon Norge.',
            subpoints: [
                  { label: 'STRUKTUR', text: 'Problem → løsning → marked → modell → team → behov.' },
          { label: 'ØVELSE', text: 'Pitch må sitte — du får én sjanse.' },
            ],
            practical: 'Hva ville du inkludert i en 3-minutters pitch for ideen din?',
            exercises: [
            {
      id: 'ent106-8-1',
      icon: '🎤',
      title: 'Struktur',
      question: 'Hva er typisk pitch-struktur?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Problem → løsning → marked → modell → team → traksjon → behov', isCorrect: true, feedback: 'Riktig! Standard mal.' },
{ id: 'c', label: 'Bare produktet', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare økonomi', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Y Combinator har egen pitch-mal. Brukt globalt nå.',
    },
    {
      id: 'ent106-8-2',
      icon: '🎤',
      title: 'Tid',
      question: 'Hvor lang er typisk pitch?',
      choices: [
        { id: 'a', label: '1 time', isCorrect: false, feedback: 'For lang.' },
{ id: 'b', label: '3-10 minutter', isCorrect: true, feedback: 'Riktig! Kort og presis.' },
{ id: 'c', label: '30 sekunder', isCorrect: false, feedback: 'For kort for full pitch.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Elevator pitch: 30-60 sek. Full investor-pitch: 5-10 min. VC-møte: 30-60 min.',
    },
    {
      id: 'ent106-8-3',
      icon: '🎤',
      title: 'Øvelse',
      question: 'Hvor mange ganger øve?',
      choices: [
        { id: 'a', label: '1 gang', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Mange — du får én sjanse per investor', isCorrect: true, feedback: 'Riktig! Pitch må være polert.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Beste gründere øver 50+ ganger før viktig pitch. Ord, tempo, kroppsspråk — alt må sitte.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🚀',
            title: 'No Isolation sin reise',
            quote: 'Klassisk kapitaltrappestige.',
            content: 'No Isolation lager teknologi mot ensomhet (AV1-roboten for kronisk syke barn). Startet med crowdfunding (validering + penger), så Innovasjon Norge (utvikling), deretter venture capital (skalering). Klassisk kapitaltrappestige fra idé til vekst.',
            subpoints: [
                  { label: 'TRAPPESTIGE', text: 'Crowdfunding → tilskudd → angels → VC.' },
          { label: 'MATCH FASE', text: 'Hver finansieringskilde passer en fase.' },
            ],
            practical: 'Tegn kapitaltrappestige fra ide til IPO. Hvilke kilder finnes på hvert nivå?',
            exercises: [
            {
      id: 'ent106-9-1',
      icon: '🚀',
      title: 'Trappestige',
      question: 'Hva er kapitaltrappestige?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Sekvens av finansieringskilder fra ide til vekst', isCorrect: true, feedback: 'Riktig! Strategisk progresjon.' },
{ id: 'c', label: 'Bare ett trinn', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Standard sekvens: love money → tilskudd → crowdfunding → angels → VC → IPO. Hver fase har sin kilde.',
    },
    {
      id: 'ent106-9-2',
      icon: '🚀',
      title: 'No Isolation',
      question: 'Hva gjorde No Isolation?',
      choices: [
        { id: 'a', label: 'Bare bank', isCorrect: false, feedback: 'Mer komplekst.' },
{ id: 'b', label: 'Crowdfunding først, så Innovasjon Norge, så VC', isCorrect: true, feedback: 'Riktig! Klassisk progresjon.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare egenkapital', isCorrect: false, feedback: 'For begrenset.' },
      ],
      espenTip: 'AV1-roboten validerte først via crowdfunding. Bevis på etterspørsel ga lettere tilgang til neste runde.',
    },
    {
      id: 'ent106-9-3',
      icon: '🚀',
      title: 'Lærdom',
      question: 'Hva er strategisk lærdom?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
{ id: 'b', label: 'Match finansieringskilde til vekstfase — ikke hopp over trinn', isCorrect: true, feedback: 'Riktig! Strukturert tilnærming.' },
{ id: 'c', label: 'Bare VC fra start', isCorrect: false, feedback: 'For tidlig.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'VC-er investerer ikke i tidlig idé. Begynn med love money og crowdfunding for validering.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎯',
            title: 'Riktig finansiering = runway',
            quote: 'Tid til å bevise modellen.',
            content: 'Riktig finansiering gir bedriften nødvendig \'runway\' til å ta av — tid til å bevise modellen før pengene tar slutt. For lite penger gir desperate beslutninger; for mye gir slappe vaner. Mål: 18-24 mnd runway etter hver finansieringsrunde.',
            subpoints: [
                  { label: 'RUNWAY', text: 'Hvor lenge bedriften kan operere uten ny kapital.' },
          { label: '18-24 MND', text: 'Standard mål etter finansieringsrunde.' },
            ],
            practical: 'Hva er ditt \'runway\' for et personlig prosjekt? Hvor lang tid kan du holde på?',
            exercises: [
            {
      id: 'ent106-10-1',
      icon: '🎯',
      title: 'Runway',
      question: 'Hva er runway?',
      choices: [
        { id: 'a', label: 'Flyplass', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Hvor lenge bedriften kan operere uten ny kapital', isCorrect: true, feedback: 'Riktig! Kritisk metric.' },
{ id: 'c', label: 'Bare overskudd', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Klassisk startup-metric. Beregnes som: kontanter / månedlig forbruk.',
    },
    {
      id: 'ent106-10-2',
      icon: '🎯',
      title: 'Mål',
      question: 'Hva er målet etter finansieringsrunde?',
      choices: [
        { id: 'a', label: '3 mnd', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: '18-24 mnd', isCorrect: true, feedback: 'Riktig! Standard mål.' },
{ id: 'c', label: '10 år', isCorrect: false, feedback: 'For langt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: '18-24 mnd gir tid til å bevise milepæler før neste finansieringsrunde.',
    },
    {
      id: 'ent106-10-3',
      icon: '🎯',
      title: 'For mye penger',
      question: 'Hva er problemet med for mye?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'b', label: 'Slappe vaner — bruker for mye, mister disiplinen', isCorrect: true, feedback: 'Riktig! Strukturell risiko.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange unicorn-startups som hentet for mye kapital har gått konkurs. Disiplin er strategisk fortrinn.',
    },
            ],
          },
        ]

        export default function FinansieringTilskuddModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-06"
              moduleTitle="Finansiering og tilskudd"
              moduleIcon="💵"
              storageKey="learning-ent1-finansiering-tilskudd"
              completeRoute="/learning/ent1/finansiering-tilskudd/complete"
              phases={phases}
              intro="Kapital til oppstarten — fra egne sparepenger til engleinvestorer. Riktig finansiering gir bedriften nødvendig \'runway\' til å ta av."
              vissteduAt="Innovasjon Norge ga ut over 5 milliarder kroner i tilskudd og lån i 2023. Norske gründere har mange støtteordninger — de fleste vet ikke om dem."
              espenSier="For lite penger gir desperate beslutninger; for mye gir slappe vaner. Riktig mengde kapital er strategisk viktig."
      presentationLink={{ route: '/learning/presentations/ent1/finansiering-tilskudd', description: 'Finansiering og tilskudd — 10 slides' }}
            />
          )
        }
