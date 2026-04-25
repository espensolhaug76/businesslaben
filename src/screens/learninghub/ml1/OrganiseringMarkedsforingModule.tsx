        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🏢',
            title: 'Hvorfor organisere',
            quote: 'Fordeling av oppgaver, ansvar og myndighet.',
            content: 'Organisering handler om å fordele oppgaver, ansvar og myndighet på en måte som gjør det mulig å nå målene effektivt. Uten klar struktur ender alle med å gjøre litt av alt — eller ingenting. God organisering klargjør: hvem gjør hva (oppgavefordeling), hvem bestemmer hva (myndighet), hvem rapporterer til hvem (ansvar). Disse tre er ofte i konflikt — løses med klare roller og koordinasjonsmekanismer.',
            subpoints: [
                  { label: 'OPPGAVE', text: 'Hvem gjør hva. Tydelig stillingsbeskrivelse + ansvarsområde.' },
          { label: 'MYNDIGHET', text: 'Hvem bestemmer hva. Beslutningsfullmakt på riktig nivå.' },
          { label: 'ANSVAR', text: 'Hvem rapporterer til hvem. Klar rapporteringslinje + målbare KPI-er.' },
            ],
            practical: 'Tenk på en gruppe-oppgave på skolen som gikk dårlig. Hva manglet — oppgavefordeling, myndighet eller ansvar?',
            exercises: [
            {
      id: 'ml115-1-1',
      icon: '🏢',
      title: 'Tre dimensjoner',
      question: 'Hvilke tre er kjerneorganiseringselementene?',
      choices: [
        { id: 'a', label: 'Lønn, bonus, ferie', isCorrect: false, feedback: 'Det er belønning, ikke struktur.' },
{ id: 'b', label: 'Oppgave, myndighet, ansvar', isCorrect: true, feedback: 'Riktig! Alle tre må stemme overens. Ofte forsvinner ansvar når oppgaver er uklare og myndighet er sentralisert.' },
{ id: 'c', label: 'Mål, tiltak, evaluering', isCorrect: false, feedback: 'Det er strategisk prosess, ikke organisering.' },
{ id: 'd', label: 'Inntekt, kostnad, overskudd', isCorrect: false, feedback: 'Det er økonomi.' },
      ],
      espenTip: 'Drømmesituasjon: Du har oppgaven, myndighet til å løse den, og ansvar for resultatet. Ofte mangler én av tre — og effektivitet faller.',
    },
    {
      id: 'ml115-1-2',
      icon: '🏢',
      title: 'Manglende ansvar',
      question: 'Hva skjer når mange er ansvarlig for samme oppgave?',
      choices: [
        { id: 'a', label: 'Bedre samarbeid', isCorrect: false, feedback: 'Tvert imot — ofte tomrom.' },
{ id: 'b', label: 'Ansvarlighet pulveriseres — ingen tar regning når noe går galt', isCorrect: true, feedback: 'Riktig! \'Bystander effect\' i organisasjoner. Når alle er ansvarlig, er ingen ansvarlig.' },
{ id: 'c', label: 'Mer kreativitet', isCorrect: false, feedback: 'Sjelden — flere kokker er ofte hindring.' },
{ id: 'd', label: 'Raskere beslutninger', isCorrect: false, feedback: 'Tvert imot — flere meninger gir tregere beslutninger.' },
      ],
      espenTip: 'Lag en RACI-matrise: Responsible, Accountable, Consulted, Informed. Tvinger frem klarhet.',
    },
    {
      id: 'ml115-1-3',
      icon: '🏢',
      title: 'Tegn på dårlig organisering',
      question: 'Hvilke tegn indikerer dårlig organisering?',
      choices: [
        { id: 'a', label: 'Møter med uklart formål, oppgaver som faller mellom stoler, beslutninger som ikke tas', isCorrect: true, feedback: 'Riktig! Klassiske tegn — alle peker på struktur-svakheter.' },
{ id: 'b', label: 'Mange ansatte', isCorrect: false, feedback: 'Størrelse alene er ikke problem.' },
{ id: 'c', label: 'Høy lønn', isCorrect: false, feedback: 'Ikke direkte tegn på dårlig organisering.' },
{ id: 'd', label: 'Liten omsetning', isCorrect: false, feedback: 'Ikke nødvendigvis organisering — kan være andre årsaker.' },
      ],
      espenTip: 'Spør deg selv etter et møte: hva ble besluttet, hvem skal gjøre hva, når er deadline. Hvis du ikke kan svare — møtet var dårlig.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📊',
            title: 'Funksjonell organisering',
            quote: 'Delt etter fag — Marked, Økonomi, HR.',
            content: 'Funksjonell organisering deler bedriften etter fagdisiplin: Marked, Økonomi, IT, HR, Salg. Enkelt og spesialisert — hver avdeling utvikler dyp kompetanse. Vanligst i små og mellomstore bedrifter. Svakhet: \'siloer\' — avdelinger snakker ikke sammen. Marked vet ikke hva Salg lover kundene; IT bygger uten input fra brukerne. Krever sterke koordinasjonsmekanismer.',
            subpoints: [
                  { label: 'STYRKER', text: 'Spesialisering, klar karriereplan, effektiv ressursutnyttelse innen hver fagdisiplin.' },
          { label: 'SVAKHETER', text: 'Silotenkning, dårlig koordinering på tvers, kunden \'tilhører\' ingen.' },
          { label: 'PASSER', text: 'Små/mellomstore bedrifter, stabilt marked, ett primært produkt.' },
            ],
            practical: 'Lokal frisørsalong med 8 ansatte — hvilken organisering passer? Hvorfor?',
            exercises: [
            {
      id: 'ml115-2-1',
      icon: '📊',
      title: 'Hva kjennetegner',
      question: 'Hva er funksjonell organisering?',
      choices: [
        { id: 'a', label: 'Hver kunde har egen ansvarlig', isCorrect: false, feedback: 'Det er kundebasert organisering.' },
{ id: 'b', label: 'Bedriften deles etter fag — Marked, Økonomi, HR, IT', isCorrect: true, feedback: 'Riktig! Klassisk organisasjonsform. Hver avdeling spesialiserer seg.' },
{ id: 'c', label: 'Kun ledelsen tar beslutninger', isCorrect: false, feedback: 'Det er sentralisering, ikke struktur.' },
{ id: 'd', label: 'Alle gjør alt', isCorrect: false, feedback: 'Det er flat struktur uten differensiering.' },
      ],
      espenTip: 'Funksjonell er ofte den \'naturlige\' første strukturen for små bedrifter. Vokser bedriften, blir det ofte for sentralisert.',
    },
    {
      id: 'ml115-2-2',
      icon: '📊',
      title: 'Silotenkning',
      question: 'Hva er hovedsvakheten ved funksjonell organisering?',
      choices: [
        { id: 'a', label: 'For dyrt', isCorrect: false, feedback: 'Faktisk ofte billig — spesialisering gir effektivitet.' },
{ id: 'b', label: '\'Siloer\' — avdelinger jobber isolert og koordinerer dårlig', isCorrect: true, feedback: 'Riktig! Klassisk silo-effekt. Marked og Salg snakker ikke; IT bygger feil løsninger.' },
{ id: 'c', label: 'For lite spesialisering', isCorrect: false, feedback: 'Tvert imot — for mye spesialisering.' },
{ id: 'd', label: 'For mange møter', isCorrect: false, feedback: 'Det er symptom, ikke årsak.' },
      ],
      espenTip: 'Bryt siloer med tverrfaglige team, felles KPI-er, samlokalisering. Strukturer som tvinger samarbeid.',
    },
    {
      id: 'ml115-2-3',
      icon: '📊',
      title: 'Når funksjonell passer best',
      question: 'Hvilken bedrift passer best for funksjonell organisering?',
      choices: [
        { id: 'a', label: 'Liten konsulentbedrift med 15 ansatte og ett primært tjenesteområde', isCorrect: true, feedback: 'Riktig! Liten størrelse + ett fagområde + stabilt marked = funksjonell er optimal.' },
{ id: 'b', label: 'Multinasjonalt konsern med 50 produktområder', isCorrect: false, feedback: 'For stort og komplekst — krever andre strukturer.' },
{ id: 'c', label: 'Startup som vokser med 50 % per år', isCorrect: false, feedback: 'Ustabilt — krever fleksible strukturer.' },
{ id: 'd', label: 'Bedrift med kunder i 30 land', isCorrect: false, feedback: 'Geografisk kompleksitet krever annen struktur.' },
      ],
      espenTip: 'De fleste små/mellomstore bedrifter starter funksjonelt. Bytter struktur når veksten krever det.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📦',
            title: 'Produktbasert organisering',
            quote: 'Egne avdelinger for hver produktgruppe.',
            content: 'Produktbasert organisering har separate enheter for hver produktgruppe — egen ledelse, marked, salg per produktlinje. Eksempler: Orkla har egne ledere for sjokolade, frosne måltider, dagligvare. P&G har \'business units\' per kategori (vask, hygiene, mat). Hver enhet kan optimalisere for sitt marked, men kan dublere ressurser (HR, IT). Passer for store bedrifter med diverse produktportefølje.',
            subpoints: [
                  { label: 'AUTONOMI', text: 'Hver produktenhet kan tilpasse strategi til sitt marked.' },
          { label: 'DUBLERING', text: 'Felles funksjoner (HR, IT, økonomi) dupliseres — ineffektivt for små.' },
          { label: 'PASSER', text: 'Store bedrifter med diverse produktlinjer — Orkla, Coca-Cola, P&G.' },
            ],
            practical: 'Hvis Tine plutselig fikk en revolusjonerende app-tjeneste — burde det vært egen produktenhet eller integrert med eksisterende?',
            exercises: [
            {
      id: 'ml115-3-1',
      icon: '📦',
      title: 'Hva kjennetegner',
      question: 'Produktbasert organisering har...',
      choices: [
        { id: 'a', label: 'Én leder for hele bedriften', isCorrect: false, feedback: 'Det er sentralisering.' },
{ id: 'b', label: 'Separate enheter med egen ledelse per produktgruppe', isCorrect: true, feedback: 'Riktig! Hver enhet er nesten en mini-bedrift. Egen P&L per produktlinje.' },
{ id: 'c', label: 'Funksjonelle avdelinger på tvers', isCorrect: false, feedback: 'Det er funksjonell organisering.' },
{ id: 'd', label: 'Kun salg-team', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Orkla er klassisk eksempel. Hvert merke (Pierre Robert, Stabburet, etc.) har egen ledelse, men deler back-office.',
    },
    {
      id: 'ml115-3-2',
      icon: '📦',
      title: 'Når passer det',
      question: 'Hvilken bedrift passer for produktbasert organisering?',
      choices: [
        { id: 'a', label: 'Liten kafé', isCorrect: false, feedback: 'For liten — funksjonell holder.' },
{ id: 'b', label: 'Stor bedrift med mange ulike produktkategorier', isCorrect: true, feedback: 'Riktig! Diversitet og størrelse rettferdiggjør produktbasert struktur. Hver kategori får dedikert oppmerksomhet.' },
{ id: 'c', label: 'Konsulentselskap med 10 ansatte', isCorrect: false, feedback: 'For lite.' },
{ id: 'd', label: 'Solo-gründer', isCorrect: false, feedback: 'Ikke meningsfullt på 1 person.' },
      ],
      espenTip: 'Når én CEO ikke kan ha oversikt over alle produktområder, må produktbasert struktur vurderes. Typisk over 100+ ansatte.',
    },
    {
      id: 'ml115-3-3',
      icon: '📦',
      title: 'Svakhet',
      question: 'Hva er hovedutfordringen med produktbasert organisering?',
      choices: [
        { id: 'a', label: 'For mange produkter', isCorrect: false, feedback: 'Bedriften velger antall produkter.' },
{ id: 'b', label: 'Dublering av ressurser — HR, IT, økonomi i hver enhet', isCorrect: true, feedback: 'Riktig! Mister stordriftsfordeler. Konkurranse om ressurser internt mellom enheter.' },
{ id: 'c', label: 'For lite spesialisering', isCorrect: false, feedback: 'Tvert imot — kanskje for mye.' },
{ id: 'd', label: 'For lite kontakt med kunder', isCorrect: false, feedback: 'Kontakten er gjerne sterk per produkt.' },
      ],
      espenTip: 'Mange løser med \'shared services\' — fellesfunksjoner som leverer til alle produktenheter. Hybrid-modell.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🌍',
            title: 'Markedsbasert organisering',
            quote: 'Egne team for B2C, B2B og offentlig.',
            content: 'Markedsbasert organisering har separate enheter for ulike kundetyper. DnB har egne avdelinger for privatkunder, bedrift, og det offentlige. Telia har samme. Hver enhet bygger spesialisert kunnskap om sin kundegruppes behov. Passer for bedrifter der ulike kunder har vidt forskjellige krav. Svakhet: produkt og merkevare kan bli inkonsistent på tvers av segmenter.',
            subpoints: [
                  { label: 'KUNDESPESIALISERING', text: 'Dyp innsikt i hvert segment — B2C jobber annerledes enn B2B.' },
          { label: 'HVERT SEGMENT EGEN P&L', text: 'Lønnsomhet per kundegruppe blir tydelig.' },
          { label: 'PASSER', text: 'Banker, telekom, IT-tjenester — hvor segmenter har vidt ulike behov.' },
            ],
            practical: 'Hvorfor har DnB egen \'Bedriftskunde\'-app i stedet for én felles? Hva forteller det om markedsorganisering?',
            exercises: [
            {
      id: 'ml115-4-1',
      icon: '🌍',
      title: 'Hva kjennetegner',
      question: 'Markedsbasert organisering deler...',
      choices: [
        { id: 'a', label: 'Etter geografi', isCorrect: false, feedback: 'Det er geografisk organisering.' },
{ id: 'b', label: 'Etter kundetype — B2C, B2B, offentlig', isCorrect: true, feedback: 'Riktig! Hver kundegruppe får dedikert team som forstår dens spesifikke behov.' },
{ id: 'c', label: 'Etter produkt', isCorrect: false, feedback: 'Det er produktbasert.' },
{ id: 'd', label: 'Etter funksjon', isCorrect: false, feedback: 'Det er funksjonell.' },
      ],
      espenTip: 'DnBs Personmarked, Bedriftsmarked og Offentlig sektor er distinkt organiserte med ulike metoder.',
    },
    {
      id: 'ml115-4-2',
      icon: '🌍',
      title: 'Når passer det',
      question: 'Når er markedsbasert mest hensiktsmessig?',
      choices: [
        { id: 'a', label: 'Ett produkt til én kundegruppe', isCorrect: false, feedback: 'For homogent — funksjonell holder.' },
{ id: 'b', label: 'Vidt forskjellige kundegrupper med vidt forskjellige behov', isCorrect: true, feedback: 'Riktig! Når B2C handler annerledes enn B2B, og det offentlige har egne anbudsregler, gir markedsbasert mening.' },
{ id: 'c', label: 'Bare nettbutikker', isCorrect: false, feedback: 'Markedsbasert er ikke kanal-spesifikt.' },
{ id: 'd', label: 'Kun for tjenester', isCorrect: false, feedback: 'Brukes også for produkter.' },
      ],
      espenTip: 'Telekom-bransjen er klassisk eksempel. Privatkunde-pakker er helt annerledes enn bedriftskunde-løsninger.',
    },
    {
      id: 'ml115-4-3',
      icon: '🌍',
      title: 'Svakhet',
      question: 'Hva er hovedutfordringen?',
      choices: [
        { id: 'a', label: 'For lite kontakt med kunder', isCorrect: false, feedback: 'Tvert imot — bedre kundekontakt.' },
{ id: 'b', label: 'Inkonsistent merkevare og produkt på tvers av segmenter', isCorrect: true, feedback: 'Riktig! Hver enhet kan utvikle eget produkt/budskap som ikke matcher andre. Krever felles merkestyring.' },
{ id: 'c', label: 'Lavere salg', isCorrect: false, feedback: 'Ofte høyere salg per kunde.' },
{ id: 'd', label: 'Færre ansatte', isCorrect: false, feedback: 'Ikke automatisk effekt.' },
      ],
      espenTip: 'Løsning: sentralt merkestyringsteam som koordinerer på tvers av markeder. Holder felles identitet selv med distinkte tilbud.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🤝',
            title: 'Linje- og stabsorganisasjon',
            quote: 'De operative støttes av eksperter.',
            content: 'Linje- og stabsorganisasjon kombinerer to typer roller. Linjen er de operative som leverer (selgere, butikkmedarbeidere, produksjonsarbeidere) — de har direkte kunde- eller produksjonsansvar. Staben er eksperter som støtter (jurister, analytikere, designere) — de gir råd uten direkte ansvar. Klart skille: linjen beslutter, staben rådgir. Forekommer i de fleste mellomstore-store organisasjoner.',
            subpoints: [
                  { label: 'LINJEN', text: 'Operative roller med direkte ansvar for resultat — selgere, produksjonsarbeidere, butikkmedarbeidere.' },
          { label: 'STAB', text: 'Spesialister som rådgir — jurister, HR-eksperter, dataanalytikere, designere.' },
          { label: 'KONFLIKT', text: 'Stab kan oppleves som \'overadministrasjon\'. Linjen kan oppleves som å ignorere ekspertråd.' },
            ],
            practical: 'På sykehus: leger og sykepleiere er linjen, administrasjon og IT er stab. Hva er typiske spenninger?',
            exercises: [
            {
      id: 'ml115-5-1',
      icon: '🤝',
      title: 'Forskjellen',
      question: 'Hva er hovedforskjellen på linje og stab?',
      choices: [
        { id: 'a', label: 'Linje er for produksjon, stab er for salg', isCorrect: false, feedback: 'Helt annet skille.' },
{ id: 'b', label: 'Linjen leverer direkte til kunden; staben gir råd og støtte', isCorrect: true, feedback: 'Riktig! Klassisk skille. Linjen har P&L-ansvar; staben har ekspertise-ansvar.' },
{ id: 'c', label: 'Linje er fast ansatt, stab er konsulenter', isCorrect: false, feedback: 'Begge er gjerne fast ansatt.' },
{ id: 'd', label: 'Det er to navn på samme ting', isCorrect: false, feedback: 'Helt feil — distinkt strukturskille.' },
      ],
      espenTip: 'På et sykehus: leger og sykepleiere er linjen, IT og HR er stab. Begge nødvendige.',
    },
    {
      id: 'ml115-5-2',
      icon: '🤝',
      title: 'Konflikt',
      question: 'Hva er typisk konflikt mellom linje og stab?',
      choices: [
        { id: 'a', label: 'Lønnsforskjeller', isCorrect: false, feedback: 'Eksisterer, men ikke kjernekonflikten.' },
{ id: 'b', label: 'Linjen ser stab som byråkratisk overhead; stab ser linjen som motvillig til ekspertråd', isCorrect: true, feedback: 'Riktig! Klassisk spenning i de fleste organisasjoner. Krever bevisst kulturarbeid.' },
{ id: 'c', label: 'Geografisk avstand', isCorrect: false, feedback: 'Ikke nødvendig kilde.' },
{ id: 'd', label: 'Det er ingen konflikt', isCorrect: false, feedback: 'I de fleste organisasjoner finnes denne spenningen.' },
      ],
      espenTip: 'Beste fix: stab må kunne \'tjene\' linjen, ikke \'styre\' linjen. Linjen må respektere ekspertise.',
    },
    {
      id: 'ml115-5-3',
      icon: '🤝',
      title: 'Hvem beslutter',
      question: 'Hvem beslutter i linje/stab-konflikt?',
      choices: [
        { id: 'a', label: 'Stab — de er ekspertene', isCorrect: false, feedback: 'Tvert imot — staben rådgir, linjen beslutter.' },
{ id: 'b', label: 'Linjen — de har P&L-ansvar og kjenner kunden', isCorrect: true, feedback: 'Riktig! Standard prinsipp. Stab gir råd; linjen har siste ord (med ansvar for konsekvenser).' },
{ id: 'c', label: 'Toppledelsen alltid', isCorrect: false, feedback: 'For sentralisert.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Ingen organisasjon fungerer slik.' },
      ],
      espenTip: 'Unntak: lovkrav (jus, sikkerhet, miljø). Da har stab vetorett. Ellers beslutter linjen.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🚀',
            title: 'Prosjektorganisering',
            quote: 'Midlertidig gruppe for å løse en spesifikk oppgave.',
            content: 'Prosjektorganisering setter sammen en midlertidig gruppe på tvers av avdelinger for å løse en spesifikk oppgave — produktlansering, kampanje, IT-implementasjon. Folk lånes fra ulike funksjoner og går tilbake når prosjektet er ferdig. Krever klar prosjektleder med myndighet, definert mandat og avslutningskriterier. Fungerer godt for komplekse, tidsbestemte oppgaver. Risiko: prosjekter blir \'evige\' uten klar avslutning.',
            subpoints: [
                  { label: 'MIDLERTIDIG', text: 'Klart start- og sluttpunkt. Ikke permanent struktur.' },
          { label: 'TVERRFAGLIG', text: 'Folk fra ulike funksjoner samles for spesifikt formål.' },
          { label: 'MANDAT', text: 'Klart definert: hva skal leveres, når, med hvilke ressurser.' },
            ],
            practical: 'En lokal kommune skal arrangere innovativ festival neste sommer. Hvordan kan prosjektorganisering brukes?',
            exercises: [
            {
      id: 'ml115-6-1',
      icon: '🚀',
      title: 'Når passer det',
      question: 'Når er prosjektorganisering best?',
      choices: [
        { id: 'a', label: 'Daglig drift', isCorrect: false, feedback: 'Permanent oppgave — krever permanent struktur.' },
{ id: 'b', label: 'Komplekse, tidsbestemte oppgaver med klare leveranser', isCorrect: true, feedback: 'Riktig! Lansering, kampanje, IT-rollout — alt med tydelig start, slutt og leveranse.' },
{ id: 'c', label: 'Bare for store bedrifter', isCorrect: false, feedback: 'Også små bedrifter bruker prosjekter.' },
{ id: 'd', label: 'Kun for IT', isCorrect: false, feedback: 'Brukes på alle områder.' },
      ],
      espenTip: 'Bryllupsplanlegging er klassisk prosjekt: midlertidig, klart mål, tidsbestemt, krever koordinering.',
    },
    {
      id: 'ml115-6-2',
      icon: '🚀',
      title: 'Krav til prosjektleder',
      question: 'Hva er kritisk for en prosjektleder?',
      choices: [
        { id: 'a', label: 'Mest erfaring', isCorrect: false, feedback: 'Ikke nok alene.' },
{ id: 'b', label: 'Tydelig myndighet og mandat fra ledelsen', isCorrect: true, feedback: 'Riktig! Uten myndighet blir prosjektleder bare koordinator. Trenger autoritet for å løse konflikter og prioritere.' },
{ id: 'c', label: 'Lavest lønn', isCorrect: false, feedback: 'Ikke relevant.' },
{ id: 'd', label: 'Ekspertise i alle fag', isCorrect: false, feedback: 'Umulig — prosjektleder leder, eksperter utfører.' },
      ],
      espenTip: 'PMI (Project Management Institute) sertifisering hjelper, men myndighet fra organisasjonen er viktigere.',
    },
    {
      id: 'ml115-6-3',
      icon: '🚀',
      title: 'Risiko',
      question: 'Hva er en typisk risiko?',
      choices: [
        { id: 'a', label: 'Prosjektet blir \'evig\' uten klar avslutning', isCorrect: true, feedback: 'Riktig! \'Scope creep\' — prosjektet vokser, deadline glipper. Krever stram styring.' },
{ id: 'b', label: 'Prosjektet blir for billig', isCorrect: false, feedback: 'Det er positivt.' },
{ id: 'c', label: 'For mange folk involvert', isCorrect: false, feedback: 'Mulig, men håndterbart med klare roller.' },
{ id: 'd', label: 'Prosjektet er for kort', isCorrect: false, feedback: 'For kort er sjelden problem.' },
      ],
      espenTip: 'Definer \'ferdig\' fra dag én. Hva må være levert, og hvordan måles det? Uten det blir prosjektet aldri ferdig.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🎭',
            title: 'Bedriftskultur',
            quote: 'De felles verdiene som preger hvordan ansatte jobber.',
            content: 'Bedriftskultur er de usynlige reglene som styrer hvordan folk oppfører seg — uten at noen sier det høyt. \'Slik gjør vi det her.\' Sterk kultur kan være konkurransefortrinn (Apple, Patagonia, Stormberg). Kan også være bremsekloss for endring (\'vi har alltid gjort det slik\'). Kultur dannes av: ledelsens eksempel, hva som premieres, hva som tolereres, hva som feires. Tar år å bygge, kan brytes på dager.',
            subpoints: [
                  { label: 'USYNLIG', text: 'Kultur uttrykkes i handlinger, ikke verdiplakater på veggen.' },
          { label: 'LEDELSENS EKSEMPEL', text: 'Ledere setter kulturen. Hva de gjør teller mye mer enn hva de sier.' },
          { label: 'REKRUTTERING', text: 'Kultur opprettholdes via rekruttering. Ansett for kultur, lær opp for ferdighet.' },
            ],
            practical: 'Hva er de usynlige reglene på din skole eller arbeidsplass? Hvordan påvirker de hvordan du oppfører deg?',
            exercises: [
            {
      id: 'ml115-7-1',
      icon: '🎭',
      title: 'Hva er kultur',
      question: 'Hva er bedriftskultur?',
      choices: [
        { id: 'a', label: 'Bedriftens verdiplakater', isCorrect: false, feedback: 'Plakater er ord — kultur er handling.' },
{ id: 'b', label: 'De usynlige reglene som styrer hvordan ansatte oppfører seg', isCorrect: true, feedback: 'Riktig! \'Slik gjør vi det her\'-uten at noen sier det. Mest definerende kraft i organisasjonen.' },
{ id: 'c', label: 'Antall ansatte', isCorrect: false, feedback: 'Helt annet.' },
{ id: 'd', label: 'Bedriftens logo', isCorrect: false, feedback: 'Visuelt uttrykk, ikke kultur.' },
      ],
      espenTip: 'Test: Hva ville en ny ansatt sett etter en uke som hun ville fortalt vennen sin? Det er kultur — ikke verdiplakatene.',
    },
    {
      id: 'ml115-7-2',
      icon: '🎭',
      title: 'Lederens rolle',
      question: 'Hva er viktigst for å forme kultur?',
      choices: [
        { id: 'a', label: 'Verdiseminar én gang i året', isCorrect: false, feedback: 'Ord uten handling.' },
{ id: 'b', label: 'Ledelsens daglige eksempel — hva ledere gjør, hvem de premierer, hva de tolererer', isCorrect: true, feedback: 'Riktig! Ledere setter kulturen. Hvis ledelsen sier \'ærlighet\' men premierer salgssvindel, vinner svindel-kulturen.' },
{ id: 'c', label: 'Plakater på veggen', isCorrect: false, feedback: 'Pynt, ikke kultur.' },
{ id: 'd', label: 'HR-policyer', isCorrect: false, feedback: 'Policyer alene endrer ikke kultur.' },
      ],
      espenTip: 'Steve Jobs sa: \'kultur er det som skjer når lederen ikke er i rommet\'. Riktig observasjon.',
    },
    {
      id: 'ml115-7-3',
      icon: '🎭',
      title: 'Culture eats strategy',
      question: 'Hva betyr Drucker-sitatet \'Culture eats strategy for breakfast\'?',
      choices: [
        { id: 'a', label: 'Strategi er viktigere enn kultur', isCorrect: false, feedback: 'Tvert imot — han mente kultur er sterkere.' },
{ id: 'b', label: 'Kultur slår strategi — uten støttende kultur kan ikke strategi gjennomføres', isCorrect: true, feedback: 'Riktig! Den beste strategien dør hvis kulturen motsetter seg den. Kultur er fundamentet.' },
{ id: 'c', label: 'Frokost er viktigst', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'd', label: 'Kun gyldig for store bedrifter', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Hurtigruten endret strategi til premium-cruise — men måtte først endre kultur fra \'vi er ferje\' til \'vi er opplevelse\'. Tok år.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🔄',
            title: 'Endringsledelse',
            quote: 'Evnen til å tilpasse organisasjonen til nye markedskrav.',
            content: 'Endringsledelse handler om å føre organisasjonen gjennom endring effektivt. John Kotters 8-stegs-modell er klassikeren: skap nødfølelse, bygg ledende koalisjon, kommuniser visjon, fjern hindringer, feire seire, forankre kulturen. De fleste endringsprogrammer mislykkes (70 % av McKinsey-studie) — typisk på grunn av kommunikasjonssvikt, manglende ledelses-engasjement, eller for rask gjennomføring. Krever bevisst arbeid, ikke bare \'beskjed\' om endring.',
            subpoints: [
                  { label: '8 STEGS-MODELL', text: 'Kotters klassiske modell — fra nødfølelse til kulturforankring.' },
          { label: '70 % MISLYKKES', text: 'Forskning viser at de fleste endringsprogram ikke når mål. Kommunikasjon er typisk svakt.' },
          { label: 'MENNESKENE', text: 'Endring handler ikke primært om teknologi eller prosess — om mennesker.' },
            ],
            practical: 'Husk en stor endring i livet ditt — flytte, bytte skole, ny jobb. Hva hjalp deg gjennom? Hva ville hjulpet mer?',
            exercises: [
            {
      id: 'ml115-8-1',
      icon: '🔄',
      title: 'Kotters modell',
      question: 'Hva er FØRSTE steg i Kotters endringsmodell?',
      choices: [
        { id: 'a', label: 'Implementer ny teknologi', isCorrect: false, feedback: 'Senere steg — ikke først.' },
{ id: 'b', label: 'Skap nødfølelse — vis hvorfor endring er nødvendig', isCorrect: true, feedback: 'Riktig! Uten følt behov motsetter folk endring. Skap forståelse for hvorfor først.' },
{ id: 'c', label: 'Skriv ny strategi', isCorrect: false, feedback: 'Strategi kommer senere.' },
{ id: 'd', label: 'Endre organisasjonskart', isCorrect: false, feedback: 'Senere steg.' },
      ],
      espenTip: 'Mange ledere starter med strukturendring. Det blir møtt med motstand fordi folk ikke forstår hvorfor.',
    },
    {
      id: 'ml115-8-2',
      icon: '🔄',
      title: 'Suksessrate',
      question: 'Cirka hvor mange endringsprogrammer mislykkes?',
      choices: [
        { id: 'a', label: '10 %', isCorrect: false, feedback: 'Underestimert.' },
{ id: 'b', label: '30 %', isCorrect: false, feedback: 'Også for lavt.' },
{ id: 'c', label: '70 %', isCorrect: true, feedback: 'Riktig! McKinsey-studier viser konsistent at 70 % av endringsprogrammer ikke når mål. Kommunikasjon er typisk svakest punkt.' },
{ id: 'd', label: '10 %', isCorrect: false, feedback: 'Overoptimistisk.' },
      ],
      espenTip: 'Hovedårsaker: dårlig kommunikasjon, manglende ledelse-engasjement, for rask gjennomføring uten å ta med folk.',
    },
    {
      id: 'ml115-8-3',
      icon: '🔄',
      title: 'Hovedfeil',
      question: 'Hva er den vanligste feilen?',
      choices: [
        { id: 'a', label: 'For dyrt', isCorrect: false, feedback: 'Sjelden hovedårsak.' },
{ id: 'b', label: 'Undervurdere den menneskelige siden — fokusere kun på prosess og teknologi', isCorrect: true, feedback: 'Riktig! Endring handler om mennesker. Ingen prosess-endring lykkes hvis menneskene ikke følger med.' },
{ id: 'c', label: 'For lite teknologi', isCorrect: false, feedback: 'Sjelden problem.' },
{ id: 'd', label: 'For mange møter', isCorrect: false, feedback: 'Symptom, ikke årsak.' },
      ],
      espenTip: 'Bruk minst halvparten av endringsbudsjettet på kommunikasjon, opplæring og motivasjon — ikke bare teknologi.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌱',
            title: 'Norsk organisasjonsmodell',
            quote: 'Flat struktur, autonomi, medbestemmelse.',
            content: 'Norge har en distinkt organisasjonsmodell preget av: flat hierarki (få nivåer mellom topp og bunn), høy autonomi (folk får løse oppgaver selv), medbestemmelse (lovpålagt tillitsvalgte og ansattrepresentasjon i styret), åpen kommunikasjon, forholdsvis lavt maktdistanse. Ofte konkurransefortrinn — gir engasjement og innovasjon. Utfordring: trege beslutninger ved konsensus-krav. Internasjonale selskaper må tilpasse til norsk modell.',
            subpoints: [
                  { label: 'FLAT', text: 'Få nivåer fra ansatt til toppleder. Folk forventes å ta initiativ.' },
          { label: 'AUTONOMI', text: 'Selvstendige team får mandat. Lavere mikro-ledelse enn i andre kulturer.' },
          { label: 'MEDBESTEMMELSE', text: 'Lovkrav om tillitsvalgte og ansattrepresentasjon i AS-styre med 30+ ansatte.' },
            ],
            practical: 'Sammenlign norsk arbeidsplass med en amerikansk eller asiatisk arbeidsplass. Hvor er forskjellene tydeligst?',
            exercises: [
            {
      id: 'ml115-9-1',
      icon: '🌱',
      title: 'Hvor passer norsk modell',
      question: 'Hvor lavt er norsk maktdistanse?',
      choices: [
        { id: 'a', label: 'Verdens høyeste', isCorrect: false, feedback: 'Helt feil — Norge ligger lavt.' },
{ id: 'b', label: 'Blant de laveste i verden — også lavere enn USA og UK', isCorrect: true, feedback: 'Riktig! Hofstede plasserer Norge i bunnsjikt. Folk forventer å bli hørt uavhengig av rang.' },
{ id: 'c', label: 'Gjennomsnittlig', isCorrect: false, feedback: 'Norge skiller seg klart.' },
{ id: 'd', label: 'Bare lavt på offentlig sektor', isCorrect: false, feedback: 'Privat sektor like flat.' },
      ],
      espenTip: 'Når en internasjonal sjef kommer til Norge: ikke forvent at folk venter på ordre. Forvent diskusjon og motspørsmål.',
    },
    {
      id: 'ml115-9-2',
      icon: '🌱',
      title: 'Medbestemmelse',
      question: 'Når kreves ansattrepresentasjon i AS-styret?',
      choices: [
        { id: 'a', label: 'Alltid', isCorrect: false, feedback: 'For bredt — størrelse teller.' },
{ id: 'b', label: 'Bedrifter med 30+ ansatte', isCorrect: true, feedback: 'Riktig! Aksjeloven § 6-4. Tilpasses størrelse.' },
{ id: 'c', label: 'Bare børsnoterte', isCorrect: false, feedback: 'Bredere enn børsnoterte.' },
{ id: 'd', label: 'Aldri', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Bedrifter over 50 ansatte har krav om at minst 1/3 av styret skal være ansattrepresentanter.',
    },
    {
      id: 'ml115-9-3',
      icon: '🌱',
      title: 'Trade-off',
      question: 'Hva er hovedutfordringen ved norsk modell?',
      choices: [
        { id: 'a', label: 'For autoritær', isCorrect: false, feedback: 'Tvert imot — for konsensus-orientert.' },
{ id: 'b', label: 'Tregere beslutninger pga konsensus-krav og medbestemmelse', isCorrect: true, feedback: 'Riktig! Demokrati tar tid. Internasjonale konkurrenter med autoritær kultur kan beslutte raskere.' },
{ id: 'c', label: 'For lite engasjement', isCorrect: false, feedback: 'Tvert imot — gir høyt engasjement.' },
{ id: 'd', label: 'For lave lønninger', isCorrect: false, feedback: 'Ikke et organisasjonsstrukturelt spørsmål.' },
      ],
      espenTip: 'Mange norske bedrifter balanserer: konsensus i strategi, autonomi i utførelse. Best av to verdener.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🚀',
            title: 'Agil organisering',
            quote: 'Evnen til å snu seg raskt i et digitalt marked.',
            content: 'Agil organisering inspirert av Spotify-modellen: små autonome team (squads, 5-10 personer) organisert rundt produkter, koordinert via tribes (50-150 personer). Tradisjonelle hierarkier erstattes med fleksible nettverk. Beslutninger tas nær kunden, ikke i toppledelsen. Krever sterk kultur og klare mål — ellers blir det kaos. Norske eksempler: DnB Marketing, Telenor Digital, Schibsted. Passer for digitale aktører i hurtig endring.',
            subpoints: [
                  { label: 'SQUADS', text: 'Små selvgående team, 5-10 personer, fokus på ett produkt eller område.' },
          { label: 'AUTONOMI', text: 'Beslutninger tas nær kunden, raskere respons enn hierarkisk kommandolinjen.' },
          { label: 'RISIKO', text: 'Uten klar kultur og mål blir det kaos. Krever moden organisasjon.' },
            ],
            practical: 'En norsk avis er stolt over å bytte fra tradisjonell redaksjonsstruktur til \'newsroom-squads\'. Hvilke fordeler/utfordringer?',
            exercises: [
            {
      id: 'ml115-10-1',
      icon: '🚀',
      title: 'Spotify-modellen',
      question: 'Hva kjennetegner Spotify-modellen?',
      choices: [
        { id: 'a', label: 'Stor sentralisering', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Små autonome team (squads) organisert rundt produkter', isCorrect: true, feedback: 'Riktig! Squads med klart mandat og produktfokus. Koordineres via tribes og chapters.' },
{ id: 'c', label: 'Bare for IT', isCorrect: false, feedback: 'Brukes nå i mange bransjer.' },
{ id: 'd', label: 'Ingen ledere', isCorrect: false, feedback: 'Det er ledere — bare flatere struktur.' },
      ],
      espenTip: 'DnB Marketing implementerte squad-modell rundt 2018-2020. Resultatet var raskere respons og mer innovasjon.',
    },
    {
      id: 'ml115-10-2',
      icon: '🚀',
      title: 'Når agil passer',
      question: 'Hva må være på plass for at agil skal fungere?',
      choices: [
        { id: 'a', label: 'Mange ansatte', isCorrect: false, feedback: 'Størrelse er ikke avgjørende.' },
{ id: 'b', label: 'Klare mål, sterk kultur, modne team som tåler autonomi', isCorrect: true, feedback: 'Riktig! Agil krever moden organisasjon. Uten kultur blir det kaos, ikke fleksibilitet.' },
{ id: 'c', label: 'Kun digitale produkter', isCorrect: false, feedback: 'Brukes nå bredt — også i fysiske produkter.' },
{ id: 'd', label: 'Ingen ledelse', isCorrect: false, feedback: 'Krever sterk ledelse, bare annerledes.' },
      ],
      espenTip: 'Slipp først ut autonomi når teamene har bevist seg. For tidlig autonomi gir fragmentering.',
    },
    {
      id: 'ml115-10-3',
      icon: '🚀',
      title: 'Risiko',
      question: 'Hva kan gå galt med agil organisering?',
      choices: [
        { id: 'a', label: 'Folk blir for spesialisert', isCorrect: false, feedback: 'Tvert imot — generalisering.' },
{ id: 'b', label: 'Ingen koordinasjon — alle løper i hver sin retning', isCorrect: true, feedback: 'Riktig! Uten klare overordnede mål og kultur, blir autonomi til kaos. Squads kan motarbeide hverandre.' },
{ id: 'c', label: 'For mye sentralisering', isCorrect: false, feedback: 'Helt feil retning.' },
{ id: 'd', label: 'For mange møter', isCorrect: false, feedback: 'Agil reduserer typisk møter.' },
      ],
      espenTip: 'Bukt løsning: \'Aligned autonomy\'. Klar overordnet retning fra ledelsen, autonomi i hvordan målet nås.',
    },
            ],
          },
        ]

        export default function OrganiseringMarkedsforingModule() {
          return (
            <DrawerModule
              moduleCode="ML1-15"
              moduleTitle="Organisering av markedsføringen"
              moduleIcon="🏢"
              storageKey="learning-ml1-organisering-markedsforing"
              completeRoute="/learning/ml1/organisering-markedsforing/complete"
              phases={phases}
              intro="Riktig organisering er broen mellom strategi og resultat. Med klar struktur, tydelig ansvar og god kultur går strategien fra dokument til daglig handling. Med uklar organisering forsvinner gode planer i koordineringskaos. Norge har sin egen organisasjonsmodell med flat struktur, autonomi og medbestemmelse — ofte konkurransefortrinn."
              vissteduAt="Tine sin omorganisering på 2010-tallet flyttet beslutningskraft fra produksjonsledelse til markedsteam. Resultat: raskere innovasjon (yoghurt-varianter, plantebaserte alternativer) og bedre tilpasning til hvert markedssegment. Strukturen ble til strategi."
              espenSier="Den vanligste organisasjons-feilen er å beholde gammel struktur når strategien endres. Strukturen følger strategien — ikke omvendt. Når dere endrer hvor dere vil, må dere ofte endre hvordan dere er organisert."
      presentationLink={{ route: '/learning/presentations/ml1/organisering-markedsforing', description: 'Organisering av markedsføringen — 10 slides' }}
            />
          )
        }
