        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🏗️',
            title: 'Organisasjonsstruktur',
            quote: 'Strukturen følger strategien.',
            content: 'Funksjonell, produktbasert, markedsbasert, matrise. Velg basert på strategi: ett produkt + ett marked = funksjonell. Mange produkter = produktbasert. Globale markeder = matrise. Endrer du strategi, må strukturen vurderes på nytt.',
            subpoints: [
                  { label: 'FØLGER STRATEGI', text: 'Endre strategi = vurder struktur.' },
          { label: 'FLERE TYPER', text: 'Funksjonell, produkt, marked, matrise.' },
            ],
            practical: 'Hvilken struktur passer en lokal kafé vs en global teknologi-bedrift?',
            exercises: [
            {
      id: 'ml213-1-1',
      icon: '🏗️',
      title: 'Strukturer',
      question: 'Hvilke hovedtyper finnes?',
      choices: [
        { id: 'a', label: 'Bare hierarkisk', isCorrect: false, feedback: 'For begrenset.' },
{ id: 'b', label: 'Funksjonell, produktbasert, markedsbasert, matrise', isCorrect: true, feedback: 'Riktig! De viktigste organisasjonsformene.' },
{ id: 'c', label: 'Bare flat', isCorrect: false, feedback: 'For begrenset.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte valg.' },
      ],
      espenTip: 'Alfred Chandler: \'Structure follows strategy\'. Klassisk innsikt fra 1962.',
    },
    {
      id: 'ml213-1-2',
      icon: '🏗️',
      title: 'Matrise',
      question: 'Når brukes matriseorganisasjon?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Når man trenger både funksjonell ekspertise og produkt/markedsfokus', isCorrect: true, feedback: 'Riktig! Brukes i komplekse globale selskaper.' },
{ id: 'c', label: 'Bare for små', isCorrect: false, feedback: 'Tvert imot — for store.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'P&G, Microsoft bruker matrise. Komplisert, men gir balanse mellom dimensjoner.',
    },
    {
      id: 'ml213-1-3',
      icon: '🏗️',
      title: 'Test',
      question: 'Hvordan velge struktur?',
      choices: [
        { id: 'a', label: 'Magefølelse', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'b', label: 'Basert på strategi — hvilken struktur støtter målene best?', isCorrect: true, feedback: 'Riktig! Strukturen følger strategien.' },
{ id: 'c', label: 'Bare etter størrelse', isCorrect: false, feedback: 'Strategi viktigere.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Endre strategi → vurder struktur. Behold gammel struktur med ny strategi = friksjon.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🎭',
            title: 'Bedriftskultur',
            quote: 'De usynlige reglene.',
            content: 'Kultur = \'slik gjør vi det her\' uten at noen sier det. Sterk kultur kan være konkurransefortrinn (Apple, Patagonia). Eller bremsekloss for endring. Kultur dannes av: ledelsens eksempel, hva som premieres, hva som tolereres. Tar år å bygge, kan brytes på dager.',
            subpoints: [
                  { label: 'USYNLIG', text: 'Kultur uttrykkes i handlinger, ikke verdiplakater.' },
          { label: 'LEDELSENS EKSEMPEL', text: 'Hva ledere gjør betyr mer enn hva de sier.' },
            ],
            practical: 'Hva er de usynlige reglene på arbeidsplass du kjenner? Hvordan påvirker de hverdagen?',
            exercises: [
            {
      id: 'ml213-2-1',
      icon: '🎭',
      title: 'Hva',
      question: 'Hva er bedriftskultur?',
      choices: [
        { id: 'a', label: 'Verdiplakater', isCorrect: false, feedback: 'Plakater er ord — kultur er handling.' },
{ id: 'b', label: 'De usynlige reglene som styrer hvordan ansatte oppfører seg', isCorrect: true, feedback: 'Riktig! \'Slik gjør vi det her\'-uten at noen sier det.' },
{ id: 'c', label: 'Antall ansatte', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bedriftens logo', isCorrect: false, feedback: 'Visuelt uttrykk, ikke kultur.' },
      ],
      espenTip: 'Test: Hva ville ny ansatt sett etter en uke som hun ville fortalt vennen sin? Det er kultur.',
    },
    {
      id: 'ml213-2-2',
      icon: '🎭',
      title: 'Drucker-sitatet',
      question: 'Hva betyr \'Culture eats strategy for breakfast\'?',
      choices: [
        { id: 'a', label: 'Strategi viktigere', isCorrect: false, feedback: 'Tvert imot — kultur sterkere.' },
{ id: 'b', label: 'Kultur slår strategi — uten støttende kultur kan ikke strategi gjennomføres', isCorrect: true, feedback: 'Riktig! Klassisk innsikt.' },
{ id: 'c', label: 'Frokost viktigst', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'd', label: 'Kun for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Den beste strategien dør hvis kulturen motsetter seg den. Kultur er fundamentet.',
    },
    {
      id: 'ml213-2-3',
      icon: '🎭',
      title: 'Lederens rolle',
      question: 'Hva former kultur mest?',
      choices: [
        { id: 'a', label: 'HR-policyer', isCorrect: false, feedback: 'Policyer alene endrer ikke kultur.' },
{ id: 'b', label: 'Ledelsens daglige eksempel', isCorrect: true, feedback: 'Riktig! \'Walk the talk\'. Folk kopierer ledere.' },
{ id: 'c', label: 'Plakater', isCorrect: false, feedback: 'Pynt.' },
{ id: 'd', label: 'Lønn', isCorrect: false, feedback: 'Sekundært.' },
      ],
      espenTip: 'Steve Jobs: \'kultur er det som skjer når lederen ikke er i rommet\'. Riktig observasjon.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🔄',
            title: 'Endringsledelse',
            quote: 'Lede gjennom endring.',
            content: 'John Kotters 8-stegs-modell er klassikeren: 1) Skap nødfølelse, 2) Bygg ledende koalisjon, 3) Visjon, 4) Kommuniser, 5) Fjern hindringer, 6) Feire seire, 7) Forankre, 8) Befest i kultur. 70 % av endringsprogrammer mislykkes — typisk pga svak kommunikasjon.',
            subpoints: [
                  { label: '8 STEG', text: 'Strukturert tilnærming. Hopper du steg, mislykkes.' },
          { label: '70 % MISLYKKES', text: 'Kommunikasjon er typisk svakeste punkt.' },
            ],
            practical: 'Hvilken endring du har vært del av lyktes? Hva avgjorde?',
            exercises: [
            {
      id: 'ml213-3-1',
      icon: '🔄',
      title: 'Antall steg',
      question: 'Hvor mange steg har Kotter?',
      choices: [
        { id: 'a', label: '3', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '8', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
{ id: 'c', label: '12', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: 'Bare 1', isCorrect: false, feedback: 'For lite.' },
      ],
      espenTip: 'Modellen utviklet etter studier av 100+ endringsprogrammer. Fortsatt dominerende.',
    },
    {
      id: 'ml213-3-2',
      icon: '🔄',
      title: 'Første steg',
      question: 'Hva er første steg?',
      choices: [
        { id: 'a', label: 'Ny teknologi', isCorrect: false, feedback: 'Senere steg.' },
{ id: 'b', label: 'Skape nødfølelse — vise hvorfor endring er nødvendig', isCorrect: true, feedback: 'Riktig! Uten følt behov motsetter folk endring.' },
{ id: 'c', label: 'Strategi', isCorrect: false, feedback: 'Senere.' },
{ id: 'd', label: 'Strukturendring', isCorrect: false, feedback: 'Senere.' },
      ],
      espenTip: 'Mange ledere starter med strukturendring. Møtes med motstand fordi folk ikke forstår hvorfor.',
    },
    {
      id: 'ml213-3-3',
      icon: '🔄',
      title: 'Hovedfeil',
      question: 'Hvor svikter endring oftest?',
      choices: [
        { id: 'a', label: 'For dyrt', isCorrect: false, feedback: 'Sjelden hovedårsak.' },
{ id: 'b', label: 'Dårlig kommunikasjon — strategien når aldri ut', isCorrect: true, feedback: 'Riktig! Mest vanlige feil.' },
{ id: 'c', label: 'For mange møter', isCorrect: false, feedback: 'Symptom.' },
{ id: 'd', label: 'Endring lykkes alltid', isCorrect: false, feedback: 'Helt feil — 70 % mislykkes.' },
      ],
      espenTip: 'Bruk minst halvparten av endringsbudsjettet på kommunikasjon, opplæring og motivasjon.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎚️',
            title: 'Lederstiler på strategisk nivå',
            quote: 'Inspirerende vs kontrollbasert.',
            content: 'Inspirerende ledelse (Jobs, Musk) skaper engasjement og innovasjon. Kontrollbasert (mange tradisjonelle CEO-er) gir presis utførelse. Begge har sin plass. Krise = mer kontroll. Vekst = mer inspirasjon. Beste ledere veksler basert på situasjon.',
            subpoints: [
                  { label: 'INSPIRERENDE', text: 'Skaper engasjement og innovasjon — passer vekst.' },
          { label: 'KONTROLLBASERT', text: 'Gir presis utførelse — passer krise og rutine.' },
            ],
            practical: 'Hvilken lederstil har vært mest effektiv i din erfaring?',
            exercises: [
            {
      id: 'ml213-4-1',
      icon: '🎚️',
      title: 'Inspirerende',
      question: 'Hva kjennetegner inspirerende ledelse?',
      choices: [
        { id: 'a', label: 'Mikromanagement', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Visjonsdrevet, motiverende, gir autonomi', isCorrect: true, feedback: 'Riktig! Skaper engasjement og innovasjon.' },
{ id: 'c', label: 'Bare regler', isCorrect: false, feedback: 'Det er kontrollbasert.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert tilnærming.' },
      ],
      espenTip: 'Steve Jobs er klassisk eksempel. Inspirerte Apple til innovasjon, men også kjent for å være krevende.',
    },
    {
      id: 'ml213-4-2',
      icon: '🎚️',
      title: 'Kontrollbasert',
      question: 'Når passer kontrollbasert?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Krise, rutinepreget arbeid, høyrisikobransjer', isCorrect: true, feedback: 'Riktig! Sikkerhet og presisjon krever kontroll.' },
{ id: 'c', label: 'Bare for unge', isCorrect: false, feedback: 'Aldersnøytralt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Flybransjen, kjernekraft, militær — strukturert kontroll er passende. Innovasjon-bransjer trenger annet.',
    },
    {
      id: 'ml213-4-3',
      icon: '🎚️',
      title: 'Veksle',
      question: 'Bør ledere veksle?',
      choices: [
        { id: 'a', label: 'Aldri — én stil for hele karrieren', isCorrect: false, feedback: 'For rigid.' },
{ id: 'b', label: 'Ja — basert på situasjon, oppgave, team-modenhet', isCorrect: true, feedback: 'Riktig! Situasjonsbestemt ledelse.' },
{ id: 'c', label: 'Bare i krise', isCorrect: false, feedback: 'For begrenset.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Beste ledere har repertoar av stiler og bytter bevisst. Mindre fleksible blir mindre effektive.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📢',
            title: 'Internmarkedsføring',
            quote: 'Selg strategien til de ansatte.',
            content: 'Internmarkedsføring: selge strategien til de ansatte før den selges til kunden. Hvis ikke ansatte tror på merkevaren, klarer de heller ikke formidle den. SAS, Hurtigruten, IKEA bruker betydelige ressurser på ansatt-engasjement. Eksterne kampanjer dør hvis interne ikke er med.',
            subpoints: [
                  { label: 'ANSATTE FØRST', text: 'Selg internt før eksternt.' },
          { label: 'AMBASSADØRER', text: 'Engasjerte ansatte er beste merkeambassadører.' },
            ],
            practical: 'Hvordan kommuniserer bedriften du jobber for / kjenner med ansatte om strategi?',
            exercises: [
            {
      id: 'ml213-5-1',
      icon: '📢',
      title: 'Hva',
      question: 'Hva er internmarkedsføring?',
      choices: [
        { id: 'a', label: 'Reklame plassert internt', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Selge strategien til ansatte før den selges til kunden', isCorrect: true, feedback: 'Riktig! Bygger interne ambassadører.' },
{ id: 'c', label: 'Bare ansatte-rabatt', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Internasjonal markedsføring', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Engasjerte ansatte selger merkevaren autentisk — bedre enn noen reklame.',
    },
    {
      id: 'ml213-5-2',
      icon: '📢',
      title: 'Hvorfor',
      question: 'Hvorfor er det viktig?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Hvis ansatte ikke tror på merket, klarer de ikke formidle det til kundene', isCorrect: true, feedback: 'Riktig! Autentisitet kommer innenfra.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Sjekk: kan dine ansatte forklare merkets verdier på 30 sekunder? Hvis ikke, mangler internmarkedsføring.',
    },
    {
      id: 'ml213-5-3',
      icon: '📢',
      title: 'Norsk eksempel',
      question: 'Hvilken norsk bedrift er sterk på dette?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'b', label: 'Hurtigruten — investerer mye i ansatt-engasjement og opplæring', isCorrect: true, feedback: 'Riktig! Reise-opplevelse leveres av ansatte. Kritisk å ha dem ombord.' },
{ id: 'c', label: 'Bare statlige', isCorrect: false, feedback: 'Privat sektor like aktivt.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Norge er aktivt.' },
      ],
      espenTip: 'Hurtigrutens reise fra ferje til opplevelse krevde massiv intern-merkebygging.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🎓',
            title: 'Kompetansestrategi',
            quote: 'Sikre fremtidens kompetanse.',
            content: 'Sikre at bedriften har hodene som trengs for fremtiden. Krever aktivt arbeid: kompetansekartlegging, læring og utvikling, rekruttering på lang sikt. Tek-bedrifter bruker mer på rekruttering enn på reklame. Kompetanse er strategisk ressurs i kunnskapsøkonomien.',
            subpoints: [
                  { label: 'FREMTIDSKOMPETANSE', text: 'Hva trengs om 3-5 år, ikke bare nå.' },
          { label: 'AKTIVT ARBEID', text: 'Kompetansestrategi krever bevisst innsats over år.' },
            ],
            practical: 'Hvilken kompetanse vil bedriften du jobber for / kjenner trenge om 5 år?',
            exercises: [
            {
      id: 'ml213-6-1',
      icon: '🎓',
      title: 'Hva',
      question: 'Hva er kompetansestrategi?',
      choices: [
        { id: 'a', label: 'Tilfeldig rekruttering', isCorrect: false, feedback: 'Strategisk planlegging.' },
{ id: 'b', label: 'Planlegging av fremtidig kompetansebehov', isCorrect: true, feedback: 'Riktig! Hvilke ferdigheter trenger vi om 3-5 år?' },
{ id: 'c', label: 'Bare opplæring', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Spør: hvilke jobber finnes om 5 år som ikke finnes nå? AI, dataanalyse, bærekraft — alle krever ny kompetanse.',
    },
    {
      id: 'ml213-6-2',
      icon: '🎓',
      title: 'Tek-bransjen',
      question: 'Hva er typisk for tek-bedrifter?',
      choices: [
        { id: 'a', label: 'Lavt rekrutteringsbudsjett', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Bruker mer på rekruttering enn reklame — talent er knapphetsressurs', isCorrect: true, feedback: 'Riktig! Kunnskapsøkonomien har snudd prioriteringene.' },
{ id: 'c', label: 'Bare egne ansatte', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert prioritering.' },
      ],
      espenTip: 'Google bruker over 1 mrd USD årlig på rekruttering. Talent er viktigere enn reklame for dem.',
    },
    {
      id: 'ml213-6-3',
      icon: '🎓',
      title: 'Bygging',
      question: 'Hvordan bygge kompetanse?',
      choices: [
        { id: 'a', label: 'Bare ansette', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Kombinasjon: rekruttere + utvikle eksisterende + lære av eksterne', isCorrect: true, feedback: 'Riktig! Multi-strategi.' },
{ id: 'c', label: 'Bare ekstern opplæring', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: '70-20-10-modell: 70 % læring fra arbeid, 20 % fra andre, 10 % fra formelle kurs.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '⚡',
            title: 'Agil organisering',
            quote: 'Snu seg raskt i digitalt marked.',
            content: 'Spotifys squad/tribe-modell, Amazons \'two pizza teams\' — små autonome enheter som kan beslutte og utføre raskt. Motsatt av tradisjonell hierarkisk struktur. Krever moden organisasjon — ellers blir det kaos. Norske: DnB Marketing, Telenor Digital, Schibsted.',
            subpoints: [
                  { label: 'SQUADS', text: 'Små selvgående team, 5-10 personer.' },
          { label: 'AUTONOMI', text: 'Beslutninger nær kunden, raskere respons.' },
            ],
            practical: 'Hvilke fordeler og utfordringer ser du med agil organisering?',
            exercises: [
            {
      id: 'ml213-7-1',
      icon: '⚡',
      title: 'Spotify-modell',
      question: 'Hva kjennetegner Spotify-modellen?',
      choices: [
        { id: 'a', label: 'Stor sentralisering', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Små autonome team (squads) organisert rundt produkter', isCorrect: true, feedback: 'Riktig! Squads med klart mandat og produktfokus.' },
{ id: 'c', label: 'Bare for IT', isCorrect: false, feedback: 'Brukes nå mange bransjer.' },
{ id: 'd', label: 'Ingen ledere', isCorrect: false, feedback: 'Det er ledere — bare flatere.' },
      ],
      espenTip: 'DnB Marketing implementerte squad-modell rundt 2018-2020. Resultatet var raskere respons og mer innovasjon.',
    },
    {
      id: 'ml213-7-2',
      icon: '⚡',
      title: 'Krav',
      question: 'Hva må være på plass?',
      choices: [
        { id: 'a', label: 'Mange ansatte', isCorrect: false, feedback: 'Størrelse er ikke avgjørende.' },
{ id: 'b', label: 'Klare mål, sterk kultur, modne team som tåler autonomi', isCorrect: true, feedback: 'Riktig! Agil krever moden organisasjon. Uten kultur blir det kaos.' },
{ id: 'c', label: 'Kun digitale produkter', isCorrect: false, feedback: 'Brukes nå bredt.' },
{ id: 'd', label: 'Ingen ledelse', isCorrect: false, feedback: 'Krever sterk ledelse, bare annerledes.' },
      ],
      espenTip: 'Slipp først ut autonomi når teamene har bevist seg. For tidlig autonomi gir fragmentering.',
    },
    {
      id: 'ml213-7-3',
      icon: '⚡',
      title: 'Risiko',
      question: 'Hva kan gå galt?',
      choices: [
        { id: 'a', label: 'Folk blir for spesialisert', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ingen koordinasjon — alle løper i hver sin retning', isCorrect: true, feedback: 'Riktig! Uten klare overordnede mål blir autonomi til kaos.' },
{ id: 'c', label: 'For mye sentralisering', isCorrect: false, feedback: 'Helt feil retning.' },
{ id: 'd', label: 'For mange møter', isCorrect: false, feedback: 'Agil reduserer typisk møter.' },
      ],
      espenTip: '\'Aligned autonomy\': Klar overordnet retning, autonomi i hvordan målet nås.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🔗',
            title: 'Samarbeid og team',
            quote: 'Bryte ned siloer.',
            content: 'Bryte ned siloer mellom avdelinger. Cross-funksjonelle team, felles KPI-er, samlokalisering. Sikre at marked, IT, salg og produkt jobber mot samme mål, ikke konkurrerer internt. Siloer er klassisk problem i funksjonelle organisasjoner.',
            subpoints: [
                  { label: 'CROSS-FUNKSJONELL', text: 'Team på tvers av avdelinger.' },
          { label: 'FELLES KPI', text: 'Samme mål gir samme retning.' },
            ],
            practical: 'Ser du siloer i bedriften du jobber for / kjenner? Hvordan kunne de brytes?',
            exercises: [
            {
      id: 'ml213-8-1',
      icon: '🔗',
      title: 'Siloer',
      question: 'Hva er siloer?',
      choices: [
        { id: 'a', label: 'Bygninger', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Avdelinger som jobber isolert og ikke koordinerer godt', isCorrect: true, feedback: 'Riktig! Klassisk problem i funksjonelle organisasjoner.' },
{ id: 'c', label: 'Bare for offentlig', isCorrect: false, feedback: 'Gjelder alle organisasjoner.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt fenomen.' },
      ],
      espenTip: 'Siloer skaper friksjon, dobbeltarbeid, motstridende prioriteringer. Avgjørende å motvirke.',
    },
    {
      id: 'ml213-8-2',
      icon: '🔗',
      title: 'Bryte ned',
      question: 'Hvordan bryte siloer?',
      choices: [
        { id: 'a', label: 'Aksepter dem', isCorrect: false, feedback: 'Strategi-feil.' },
{ id: 'b', label: 'Cross-funksjonelle team, felles KPI-er, samlokalisering', isCorrect: true, feedback: 'Riktig! Multi-tiltak nødvendig.' },
{ id: 'c', label: 'Bare flere møter', isCorrect: false, feedback: 'Symptom-behandling.' },
{ id: 'd', label: 'Mer hierarki', isCorrect: false, feedback: 'Forverrer ofte problemet.' },
      ],
      espenTip: 'Spotifys tribes er konkret tiltak: medlemmer fra ulike fag samles rundt produkt-tema.',
    },
    {
      id: 'ml213-8-3',
      icon: '🔗',
      title: 'Cross-funksjonelt',
      question: 'Hva betyr cross-funksjonelt team?',
      choices: [
        { id: 'a', label: 'Samme avdeling', isCorrect: false, feedback: 'Det er funksjonelt.' },
{ id: 'b', label: 'Medlemmer fra ulike fag (marked, IT, salg, produkt) jobber sammen', isCorrect: true, feedback: 'Riktig! Bryter siloer ved struktur.' },
{ id: 'c', label: 'Bare for IT', isCorrect: false, feedback: 'Bredere bruk.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Klassisk eksempel: produktlanseringsteam med marketing, salg, produktdesign, IT — alle sammen for ett mål.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌍',
            title: 'Hurtigrutens kulturreise',
            quote: 'Fra ferje til opplevelse.',
            content: 'Hurtigruten omformet seg fra lokal ferje-leverandør til globalt premium-cruiseselskap. Krevde fundamental kulturendring — fra \'vi er ferje\' til \'vi er opplevelse\'. Ny rekruttering, betydelig opplæring, lederendringer. Strategi mislyktes flere ganger før kulturen kom på plass. Klassisk eksempel.',
            subpoints: [
                  { label: 'KULTUR FØLGER STRATEGI', text: 'Strategiendring krevde kulturendring.' },
          { label: 'TAR ÅR', text: 'Reell kulturendring kan ta 5-10 år.' },
            ],
            practical: 'Hvilke andre norske bedrifter har gjort store kulturendringer?',
            exercises: [
            {
      id: 'ml213-9-1',
      icon: '🌍',
      title: 'Hva',
      question: 'Hva endret Hurtigruten?',
      choices: [
        { id: 'a', label: 'Bare logo', isCorrect: false, feedback: 'Mye dypere.' },
{ id: 'b', label: 'Fra ferje-leverandør til premium-cruise — kulturendring fra \'transport\' til \'opplevelse\'', isCorrect: true, feedback: 'Riktig! Fundamental endring i identitet.' },
{ id: 'c', label: 'Bare priser', isCorrect: false, feedback: 'Bredere endring.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Hurtigruten er nå internasjonal premium-merkevare. Reisen er ikke \'å komme dit\', men \'å oppleve underveis\'.',
    },
    {
      id: 'ml213-9-2',
      icon: '🌍',
      title: 'Tid',
      question: 'Hvor lang tid tok det?',
      choices: [
        { id: 'a', label: 'Måneder', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: 'År — flere mislykkede forsøk før kulturen kom på plass', isCorrect: true, feedback: 'Riktig! Kulturendring tar tid og tålmodighet.' },
{ id: 'c', label: 'Uker', isCorrect: false, feedback: 'Helt urealistisk.' },
{ id: 'd', label: 'Generasjoner', isCorrect: false, feedback: 'Overdrevet, men ofte år.' },
      ],
      espenTip: 'Realistisk regne 5-10 år for fundamental kulturendring i etablert organisasjon.',
    },
    {
      id: 'ml213-9-3',
      icon: '🌍',
      title: 'Lærdom',
      question: 'Hva er strategisk lærdom?',
      choices: [
        { id: 'a', label: 'Kultur er rask å endre', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Strategiendring krever kulturendring — tar tid og krever bevisst innsats', isCorrect: true, feedback: 'Riktig! Mange undervurderer dette.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Equinor (tidligere Statoil) er pågående eksempel — fra olje til energi. Pågår fortsatt.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🚀',
            title: 'Strategi-implementering',
            quote: 'Bro mellom strategi og resultat.',
            content: 'Strategien dør uten organisasjon som er rigget for å gjennomføre den. Implementering krever: tydelige KPI-er, månedlig oppfølging, ledelse-engasjement, tilstrekkelige ressurser, kommunikasjon på alle nivåer. 70 % av strategier mislykkes på implementering — typisk pga svak kultur eller kommunikasjon.',
            subpoints: [
                  { label: 'HELHET', text: 'Strategi + struktur + kultur = implementering.' },
          { label: '70 % MISLYKKES', text: 'Implementering er hardere enn planlegging.' },
            ],
            practical: 'Hva har du sett som har skilt vellykkede fra mislykkede implementeringer?',
            exercises: [
            {
      id: 'ml213-10-1',
      icon: '🚀',
      title: 'Nøkkelen',
      question: 'Hva er broen mellom strategi og resultat?',
      choices: [
        { id: 'a', label: 'Bare planlegging', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Organisasjonen — kultur, struktur, prosesser som støtter strategien', isCorrect: true, feedback: 'Riktig! Implementering er organisasjonens oppgave.' },
{ id: 'c', label: 'Bare penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Beste strategi blir verdiløs uten organisasjon som kan utføre den. Realitet.',
    },
    {
      id: 'ml213-10-2',
      icon: '🚀',
      title: 'Hva trengs',
      question: 'Hva trengs for vellykket implementering?',
      choices: [
        { id: 'a', label: 'Bare god plan', isCorrect: false, feedback: 'Plan uten utførelse er ingenting.' },
{ id: 'b', label: 'KPI-er + oppfølging + ledelse-engasjement + ressurser + kommunikasjon', isCorrect: true, feedback: 'Riktig! Helhetlig systemarbeid.' },
{ id: 'c', label: 'Bare penger', isCorrect: false, feedback: 'Penger uten retning er bortkastet.' },
{ id: 'd', label: 'Bare beste folk', isCorrect: false, feedback: 'Folk uten retning får ikke gjort noe.' },
      ],
      espenTip: 'Implementering er disiplin. Følg opp månedlig, juster basert på data, kommuniser konstant.',
    },
    {
      id: 'ml213-10-3',
      icon: '🚀',
      title: 'Suksessrate',
      question: 'Hvor mange strategier lykkes?',
      choices: [
        { id: 'a', label: '90 %', isCorrect: false, feedback: 'Helt feil — mye lavere.' },
{ id: 'b', label: '30 % — 70 % mislykkes', isCorrect: true, feedback: 'Riktig! McKinsey-data konsistent over år.' },
{ id: 'c', label: 'Alle', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: '10 %', isCorrect: false, feedback: 'Lavere enn realiteten.' },
      ],
      espenTip: 'Statistikken er stabil — ikke fordi strategi er svak, men fordi implementering er undervurdert.',
    },
            ],
          },
        ]

        export default function OrganiseringOgLedelseStrategiskModule() {
          return (
            <DrawerModule
              moduleCode="ML2-13"
              moduleTitle="Organisering og ledelse (strategisk nivå)"
              moduleIcon="🏢"
              storageKey="learning-ml2-organisering-og-ledelse-strategisk"
              completeRoute="/learning/ml2/organisering-og-ledelse-strategisk/complete"
              phases={phases}
              intro="Strategisk organisasjonsdesign — hvordan bygge organisasjon som gjennomfører strategien. Kultur, struktur, endringsledelse, agil organisering. \'Culture eats strategy for breakfast\' — Drucker."
              vissteduAt="Hurtigruten endret seg fra ferge-leverandør til premium-cruise. Krevde fundamental kulturendring fra \'vi er ferje\' til \'vi er opplevelse\'. Tok år."
              espenSier="Strategien dør uten en organisasjon som er rigget for å gjennomføre den. Kultur er den usynlige kraften som avgjør om strategien blir til handling."
      presentationLink={{ route: '/learning/presentations/ml2/organisering-og-ledelse-strategisk', description: 'Organisering og ledelse (strategisk nivå) — 10 slides' }}
            />
          )
        }
