        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🎯',
            title: 'Kundebehov',
            quote: 'Maslows behovspyramide.',
            content: 'Maslows behovspyramide brukes for å forstå hva som driver kunden til kjøp. Fysiologi (mat, vann, søvn), trygghet, tilhørighet, anerkjennelse, selvrealisering. Mange produkter dekker mer enn ett nivå — sportsbil dekker både transport (fysiologi) og status (anerkjennelse).',
            subpoints: [
                  { label: 'PYRAMIDE', text: 'Lavere nivåer prioriteres før høyere.' },
          { label: 'MULTI-NIVÅ', text: 'Mange produkter dekker flere nivåer samtidig.' },
            ],
            practical: 'Hvilket Maslow-nivå dekker en mobiltelefon? Mange?',
            exercises: [
            {
      id: 'ent103-1-1',
      icon: '🎯',
      title: 'Maslow',
      question: 'Hva er nederst i Maslows pyramide?',
      choices: [
        { id: 'a', label: 'Selvrealisering', isCorrect: false, feedback: 'Topp.' },
{ id: 'b', label: 'Fysiologiske behov — mat, vann, søvn', isCorrect: true, feedback: 'Riktig! Grunnleggende.' },
{ id: 'c', label: 'Tilhørighet', isCorrect: false, feedback: 'Mellom.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert pyramide.' },
      ],
      espenTip: 'Maslow publiserte i 1943. Hierarkiet er: fysiologi → trygghet → tilhørighet → anerkjennelse → selvrealisering.',
    },
    {
      id: 'ent103-1-2',
      icon: '🎯',
      title: 'Eksempel',
      question: 'Hvilket behov dekker Rolex?',
      choices: [
        { id: 'a', label: 'Bare tid-dekning', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Anerkjennelse — status som kommuniserer suksess', isCorrect: true, feedback: 'Riktig! Premium-merker er statussignal.' },
{ id: 'c', label: 'Bare fysiologi', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'En 30 kr klokke viser tiden like presist. Rolex dekker høyere behov — status, identitet.',
    },
    {
      id: 'ent103-1-3',
      icon: '🎯',
      title: 'Multi-nivå',
      question: 'Kan ett produkt dekke flere nivåer?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — sportsbil dekker transport (fysiologi) + status (anerkjennelse)', isCorrect: true, feedback: 'Riktig! Flere lag samtidig.' },
{ id: 'c', label: 'Bare for premium', isCorrect: false, feedback: 'Gjelder mange produkter.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Apple iPhone: kommunikasjon (basisbehov) + status (anerkjennelse) + selvuttrykk (selvrealisering).',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🌐',
            title: 'Markedet',
            quote: 'Total adresserbar marked.',
            content: 'Markedet er summen av potensielle kunder som har et behov OG evne til å betale. En gründer må kunne kvantifisere markedet: antall potensielle kunder × gjennomsnittlig forbruk = total addressable market (TAM). Uten markedsstørrelse er forretningsplanen gjetning.',
            subpoints: [
                  { label: 'BEHOV + EVNE', text: 'Begge må være tilstede — drømmer er ikke marked.' },
          { label: 'TAM', text: 'Total Addressable Market = antall × forbruk.' },
            ],
            practical: 'Hva er TAM for en lokal kafé? Hvordan ville du regnet?',
            exercises: [
            {
      id: 'ent103-2-1',
      icon: '🌐',
      title: 'Definisjon',
      question: 'Hva er markedet?',
      choices: [
        { id: 'a', label: 'Alle som har internett', isCorrect: false, feedback: 'For bredt.' },
{ id: 'b', label: 'Potensielle kunder med behov OG evne til å betale', isCorrect: true, feedback: 'Riktig! Begge kriterier.' },
{ id: 'c', label: 'Alle som kjenner produktet', isCorrect: false, feedback: 'For bredt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Drømmer alene = ikke marked. Behov pluss kjøpekraft = marked.',
    },
    {
      id: 'ent103-2-2',
      icon: '🌐',
      title: 'TAM',
      question: 'Hva betyr TAM?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Akronym.' },
{ id: 'b', label: 'Total Addressable Market — total markedsstørrelse i kroner', isCorrect: true, feedback: 'Riktig! Standard begrep.' },
{ id: 'c', label: 'Tax And Marketing', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'TAM-SAM-SOM: Total → Serviceable → Obtainable. Trekkingen ned for realistiske mål.',
    },
    {
      id: 'ent103-2-3',
      icon: '🌐',
      title: 'Beregning',
      question: 'Lokal kafé — hvordan beregne TAM?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Antall mennesker innen 1 km × kaffe-forbruk × pris × frekvens', isCorrect: true, feedback: 'Riktig! Kvantitativ tilnærming.' },
{ id: 'c', label: 'Bare inntekt', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Eksempel: 5000 mennesker × 30 % kaffe-drikkere × 30 kr × 100 ganger/år = 4,5 mill TAM.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📊',
            title: 'Segmentering',
            quote: 'Dele markedet i grupper.',
            content: 'Segmentering: oppdeling av markedet i mindre grupper med fellestrekk. 4 vanlige kriterier: demografi (alder, kjønn, inntekt), geografi (sted), psykografi (livsstil, verdier), atferd (lojalitet, bruksmønster). Mest gründere bruker kombinasjon.',
            subpoints: [
                  { label: '4 KRITERIER', text: 'Demografi, geografi, psykografi, atferd.' },
          { label: 'KOMBINASJON', text: 'Sterke segmenter bruker flere kriterier samtidig.' },
            ],
            practical: 'Velg en bedrift. Hvilke segmenter ser du de retter seg mot? Hvilke kriterier?',
            exercises: [
            {
      id: 'ent103-3-1',
      icon: '📊',
      title: 'Kriterier',
      question: 'Hva er de 4 vanlige?',
      choices: [
        { id: 'a', label: 'Bare alder', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Demografi, geografi, psykografi, atferd', isCorrect: true, feedback: 'Riktig! Klassiske kriterier.' },
{ id: 'c', label: 'Bare inntekt', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Kotler popularierte rammeverket. Fortsatt grunnleggende i segmenteringsteori.',
    },
    {
      id: 'ent103-3-2',
      icon: '📊',
      title: 'Psykografi',
      question: 'Hva er psykografi?',
      choices: [
        { id: 'a', label: 'Bare alder', isCorrect: false, feedback: 'Det er demografi.' },
{ id: 'b', label: 'Livsstil, verdier, holdninger — hva motiverer kjøpsadferd', isCorrect: true, feedback: 'Riktig! Dypere enn demografi.' },
{ id: 'c', label: 'Bare hva folk har', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Psykografi er ofte mer prediktivt enn demografi. To 30-årige kvinner kan ha helt ulike kjøpsmønstre.',
    },
    {
      id: 'ent103-3-3',
      icon: '📊',
      title: 'Praksis',
      question: 'Hvordan bruke kombinasjon?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'F.eks. \'Oslo-baserte miljøbevisste 25-40-åringer med høy inntekt\'', isCorrect: true, feedback: 'Riktig! Multi-kriterium gir presisjon.' },
{ id: 'c', label: 'Bare ett kriterium', isCorrect: false, feedback: 'For lite presist.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Stormberg: \'norske familier som vil ha rimelige turklær med god kvalitet\'. Multi-kriterium.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎯',
            title: 'Målgruppevalg',
            quote: 'Velge mest attraktive segmenter.',
            content: 'Målgruppevalg: velg de mest attraktive segmentene for bedriftens ressurser. En gründer kan ikke betjene alle — fokus på ett segment gir bedre resultater enn å spre seg tynt utover hele markedet. Drucker: \'Marketing er hele jobben sett fra kundens perspektiv.\'',
            subpoints: [
                  { label: 'FOKUS', text: 'Velge bort er like viktig som velge inn.' },
          { label: 'RESSURSER', text: 'Match segment med bedriftens kapasitet.' },
            ],
            practical: 'Hva er du bedre på enn andre? Hvilket segment matcher det best?',
            exercises: [
            {
      id: 'ent103-4-1',
      icon: '🎯',
      title: 'Hvorfor velge',
      question: 'Hvorfor velge bort segmenter?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Fokus gir bedre resultater enn å spre seg tynt', isCorrect: true, feedback: 'Riktig! Strategisk prioritering.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'Drucker: \'Marketing er hele jobben sett fra kundens perspektiv.\' Velg én kunde-perspektiv først.',
    },
    {
      id: 'ent103-4-2',
      icon: '🎯',
      title: 'Test',
      question: 'Hvilket segment passer din bedrift?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Det som matcher bedriftens unike styrker og ressurser', isCorrect: true, feedback: 'Riktig! Match til kapasitet.' },
{ id: 'c', label: 'Bare det største', isCorrect: false, feedback: 'Ofte for tøff konkurranse.' },
{ id: 'd', label: 'Bare det rikeste', isCorrect: false, feedback: 'Ikke nødvendigvis riktig.' },
      ],
      espenTip: 'Test: hva gjør du bedre enn andre? Hvilket segment verdsetter det mest?',
    },
    {
      id: 'ent103-4-3',
      icon: '🎯',
      title: 'Konsentrert',
      question: 'Hva er konsentrert målgruppestrategi?',
      choices: [
        { id: 'a', label: 'Bare ett produkt', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Fokuser all innsats på ett nisje-segment', isCorrect: true, feedback: 'Riktig! Bli best i nisje.' },
{ id: 'c', label: 'Hele markedet', isCorrect: false, feedback: 'Det er udifferensiert.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Stormberg startet konsentrert (norske turfolk). Vokste senere bredere fra sterk nisje-posisjon.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📍',
            title: 'Posisjonering',
            quote: 'Eie ett ord i kundens hode.',
            content: 'Posisjonering: hvordan du ønsker kunden skal oppfatte deg sammenlignet med konkurrenter. Volvo = sikkerhet. Apple = innovasjon. IKEA = rimelig design. Én tydelig posisjon slår \'alt for alle\' hver gang. Test: hvilket ord forbinder kundene med ditt merke?',
            subpoints: [
                  { label: 'ÉTT ORD', text: 'Klassisk regel — én klar assosiasjon.' },
          { label: 'DIFFERENSIERING', text: 'Skill deg fra konkurrenter, ikke kopier.' },
            ],
            practical: 'Hvilket ord eier følgende merker: Volvo? Apple? Tesla? Stormberg?',
            exercises: [
            {
      id: 'ent103-5-1',
      icon: '📍',
      title: 'Hva',
      question: 'Hva er kjernen i posisjonering?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Eie ett ord/konsept i kundens bevissthet', isCorrect: true, feedback: 'Riktig! Klassisk konsept.' },
{ id: 'c', label: 'Lavest pris', isCorrect: false, feedback: 'En posisjon, ikke alle.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Al Ries og Jack Trout populariserte \'Positioning\' i 1981. Fortsatt fundamental teori.',
    },
    {
      id: 'ent103-5-2',
      icon: '📍',
      title: 'Test',
      question: 'Hvordan teste din posisjonering?',
      choices: [
        { id: 'a', label: 'Bare spør deg selv', isCorrect: false, feedback: 'Subjektivt.' },
{ id: 'b', label: 'Spør kundene hvilket ord de forbinder med merket', isCorrect: true, feedback: 'Riktig! Posisjonering er i kundens hode, ikke ledelsens.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hvis svarene varierer, har du ikke klar posisjonering. Konsekvens er forvirring.',
    },
    {
      id: 'ent103-5-3',
      icon: '📍',
      title: 'Klassiske eksempler',
      question: 'Hvilket ord eier Volvo?',
      choices: [
        { id: 'a', label: 'Hastighet', isCorrect: false, feedback: 'Det er Porsche.' },
{ id: 'b', label: 'Sikkerhet — bygget over 50 år konsistent', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Luksus', isCorrect: false, feedback: 'Mer Mercedes.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Volvo har holdt \'sikkerhet\' som kjerne i 50+ år. Konsistens skaper sterk posisjon.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🔍',
            title: 'Markedsundersøkelser',
            quote: 'Enkle metoder for oppstartsbedrifter.',
            content: 'Enkle metoder: 10-20 dybdeintervjuer med potensielle kunder, observasjon av eksisterende løsninger, enkle digitale spørreskjemaer (Google Forms). Trenger ikke være store undersøkelser — innsikten teller. Kvalitet > kvantitet i tidlig fase.',
            subpoints: [
                  { label: 'ENKELT', text: '10-20 intervjuer er ofte nok i tidlig fase.' },
          { label: 'KVALITATIV', text: 'Dybde slår bredde for å forstå behov.' },
            ],
            practical: 'Hvis du skulle teste en ide, hvem er de 10 første du ville snakket med?',
            exercises: [
            {
      id: 'ent103-6-1',
      icon: '🔍',
      title: 'Volum',
      question: 'Hvor mange intervjuer trengs i tidlig fase?',
      choices: [
        { id: 'a', label: 'Tusenvis', isCorrect: false, feedback: 'For mye for tidlig fase.' },
{ id: 'b', label: '10-20 dybdeintervjuer er ofte nok', isCorrect: true, feedback: 'Riktig! Kvalitet over kvantitet.' },
{ id: 'c', label: 'Bare ett', isCorrect: false, feedback: 'For lite.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Patrick van der Pijl: \'Etter 10 intervjuer ser du mønstre. Etter 20 har du innsikt.\'',
    },
    {
      id: 'ent103-6-2',
      icon: '🔍',
      title: 'Type',
      question: 'Hvilken type undersøkelse for tidlig fase?',
      choices: [
        { id: 'a', label: 'Bare spørreskjema', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Kvalitative dybdeintervjuer — hvorfor, ikke hvor mange', isCorrect: true, feedback: 'Riktig! Forstå motivasjon.' },
{ id: 'c', label: 'Bare statistikk', isCorrect: false, feedback: 'For sent.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Spørsmål: \'Hvordan løser du dette i dag?\' avdekker ofte virkelige behov mer enn \'Vil du ha dette?\'',
    },
    {
      id: 'ent103-6-3',
      icon: '🔍',
      title: 'Verktøy',
      question: 'Hvilke gratis verktøy?',
      choices: [
        { id: 'a', label: 'Bare bedrifts-CRM', isCorrect: false, feedback: 'For komplisert tidlig.' },
{ id: 'b', label: 'Google Forms, telefon, kafé-møter, LinkedIn-meldinger', isCorrect: true, feedback: 'Riktig! Enkle, gratis verktøy.' },
{ id: 'c', label: 'Bare McKinsey', isCorrect: false, feedback: 'Helt overdrevet.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange suksess-startups startet med Google Forms og 20 telefonsamtaler. Verktøy er sekundært.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '⚔️',
            title: 'Konkurrentanalyse',
            quote: 'Hvem er de andre?',
            content: 'Konkurrentanalyse: hvem er de andre, og hva er deres styrker og svakheter? Lag en matrise: konkurrenter på radene, dimensjoner (pris, kvalitet, service, brand) på kolonnene. Hvor er det åpning for deg? Substitutter er også konkurrenter — ikke bare direkte aktører.',
            subpoints: [
                  { label: 'MATRISE', text: 'Strukturert oversikt over konkurransebildet.' },
          { label: 'SUBSTITUTTER', text: 'Andre måter å løse samme behov er også konkurrenter.' },
            ],
            practical: 'Lag en konkurrent-matrise for en lokal bedrift du kjenner. Hvor er de svake?',
            exercises: [
            {
      id: 'ent103-7-1',
      icon: '⚔️',
      title: 'Hvor',
      question: 'Hvor finner du muligheter?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Der konkurrentene er svake og kunden er misfornøyd', isCorrect: true, feedback: 'Riktig! Klassisk strategi.' },
{ id: 'c', label: 'Bare lavere pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Test: hva klager kundene på når de bruker konkurrentens produkt? Det er din mulighet.',
    },
    {
      id: 'ent103-7-2',
      icon: '⚔️',
      title: 'Substitutter',
      question: 'Er substitutter konkurrenter?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — alt som løser samme behov er konkurrent', isCorrect: true, feedback: 'Riktig! Bredt perspektiv.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hjemmelaget kaffe konkurrerer med kaféen. Substitutter er ofte \'usynlige konkurrenter\'.',
    },
    {
      id: 'ent103-7-3',
      icon: '⚔️',
      title: 'Format',
      question: 'Hvordan strukturere?',
      choices: [
        { id: 'a', label: 'Bare tekst', isCorrect: false, feedback: 'For ustrukturert.' },
{ id: 'b', label: 'Matrise med konkurrenter × dimensjoner (pris, kvalitet, service, brand)', isCorrect: true, feedback: 'Riktig! Visuelt strukturert.' },
{ id: 'c', label: 'Bare en setning', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Excel/Google Sheets matrise med konkurrenter på rader, dimensjoner på kolonner. Klassisk verktøy.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '✨',
            title: 'Verdiløfte',
            quote: 'Den unike fordelen kunden får.',
            content: 'Verdiløfte (Value Proposition): den unike fordelen kunden får ved å velge akkurat oss. Skal kunne forklares på 30 sekunder, og må være forskjellig nok fra konkurrentene til at kunden faktisk velger annerledes. Strunk regel for entreprenører.',
            subpoints: [
                  { label: '30 SEKUNDER', text: 'Hvis lengre — ikke klart nok.' },
          { label: 'DIFFERENSIERING', text: 'Må være ulik nok til å motivere bytte.' },
            ],
            practical: 'Skriv ditt verdiløfte for noe du driver med. Kan du forklare det på 30 sekunder?',
            exercises: [
            {
      id: 'ent103-8-1',
      icon: '✨',
      title: 'Hva',
      question: 'Hva er verdiløftet?',
      choices: [
        { id: 'a', label: 'Bare logo', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Den unike fordelen kunden får ved å velge oss', isCorrect: true, feedback: 'Riktig! Klart formulert.' },
{ id: 'c', label: 'Reklamebudsjett', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Strategyzer-modellen har Value Proposition Canvas — eget verktøy for å bygge dette.',
    },
    {
      id: 'ent103-8-2',
      icon: '✨',
      title: 'Lengde',
      question: 'Hvor langt bør verdiløftet være?',
      choices: [
        { id: 'a', label: '5 sider', isCorrect: false, feedback: 'For langt.' },
{ id: 'b', label: '30 sekunder å forklare — gjerne én setning', isCorrect: true, feedback: 'Riktig! Korthet er klarhet.' },
{ id: 'c', label: 'Bare logo', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Tesla: \'Sustainable transport for the world.\' Apple: \'Think different.\' Ett ord eller setning.',
    },
    {
      id: 'ent103-8-3',
      icon: '✨',
      title: 'Test',
      question: 'Hvordan teste?',
      choices: [
        { id: 'a', label: 'Bare spør seg selv', isCorrect: false, feedback: 'Subjektivt.' },
{ id: 'b', label: 'Forklar til en ekstern person — forsto de poenget?', isCorrect: true, feedback: 'Riktig! Ekstern validering.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Hvis venner ikke kan gjenta verdiløftet etter at du har forklart, er det ikke klart nok.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '📈',
            title: 'Kahoot sin målgruppe',
            quote: 'Én klar målgruppe = vekst.',
            content: 'Kahoot kunne valgt mange målgrupper: bedrifter, konferanser, familier. De valgte lærere — én klar målgruppe, ett tydelig behov (engasjerende undervisning). Fokus ga eksplosiv vekst — først blant lærere, så ekspansjon til andre segmenter. Klassisk eksempel på fokusert oppstart.',
            subpoints: [
                  { label: 'ÉN MÅLGRUPPE', text: 'Lærere — klart definert.' },
          { label: 'EKSPANSJON SENERE', text: 'Bygg sterk base først, utvid etterpå.' },
            ],
            practical: 'Hva er din \'lærer-målgruppe\' — et veldig tydelig segment du kan dominere?',
            exercises: [
            {
      id: 'ent103-9-1',
      icon: '📈',
      title: 'Strategi',
      question: 'Hva valgte Kahoot?',
      choices: [
        { id: 'a', label: 'Alle målgrupper', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Én tydelig målgruppe (lærere) for å bygge sterk base', isCorrect: true, feedback: 'Riktig! Klassisk fokus-strategi.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare bedrifter', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Kahoot ble grunnlagt i Norge 2012. Vokste til milliardvurdering ved å starte fokusert.',
    },
    {
      id: 'ent103-9-2',
      icon: '📈',
      title: 'Hvorfor fokus',
      question: 'Hvorfor fokus i tidlig fase?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Begrensede ressurser — bygg sterk base først, utvid etterpå', isCorrect: true, feedback: 'Riktig! Strategisk prioritering.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for små', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Stormberg startet med turklær. Klassisk fokus → ekspansjon-strategi.',
    },
    {
      id: 'ent103-9-3',
      icon: '📈',
      title: 'Lærdom',
      question: 'Hva er strategisk lærdom?',
      choices: [
        { id: 'a', label: 'Selg til alle', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Velg én tydelig målgruppe — bygg sterk base — utvid', isCorrect: true, feedback: 'Riktig! Klassisk vekstmønster.' },
{ id: 'c', label: 'Bare for tek', isCorrect: false, feedback: 'Bredt anvendelig.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange startup-feil: prøver å selge til \'alle\'. Resulterer i å selge til ingen.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎓',
            title: 'Kjenne kunden',
            quote: 'Bedre enn deg selv.',
            content: 'Kjenn din kunde bedre enn du kjenner deg selv. Gründere som baserer seg på antakelser i stedet for kundekontakt, ender ofte med produkter ingen vil ha — uansett hvor smart løsningen er teknisk. Den eneste kuren mot dette er kontinuerlig kundekontakt.',
            subpoints: [
                  { label: 'KONTAKT', text: 'Snakk med kunder konstant — ikke bare i undersøkelser.' },
          { label: 'YDMYKHET', text: 'Anta at du ikke vet — bekreft alt med data.' },
            ],
            practical: 'Når snakket du sist med en potensiell kunde for ideen din?',
            exercises: [
            {
      id: 'ent103-10-1',
      icon: '🎓',
      title: 'Regel',
      question: 'Hva er gründer-regelen?',
      choices: [
        { id: 'a', label: 'Bare lytt til ledelsen', isCorrect: false, feedback: 'For internt.' },
{ id: 'b', label: 'Kjenn kunden bedre enn du kjenner deg selv', isCorrect: true, feedback: 'Riktig! Praktisk regel.' },
{ id: 'c', label: 'Stol på magefølelsen', isCorrect: false, feedback: 'Subjektivt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Steve Blank: \'Get out of the building.\' Klassisk Lean Startup-prinsipp.',
    },
    {
      id: 'ent103-10-2',
      icon: '🎓',
      title: 'Konsekvens',
      question: 'Hva skjer uten kundekontakt?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Produkter ingen vil ha — uansett teknisk smartness', isCorrect: true, feedback: 'Riktig! Klassisk startup-feil.' },
{ id: 'c', label: 'Bedre produkter', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: '70 % av startups mislykkes pga \'no market need\'. Hovedårsak til feil.',
    },
    {
      id: 'ent103-10-3',
      icon: '🎓',
      title: 'Frekvens',
      question: 'Hvor ofte snakke med kunder?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Konstant — ikke bare i \'undersøkelser\', men løpende dialog', isCorrect: true, feedback: 'Riktig! Kontinuerlig læring.' },
{ id: 'c', label: 'Bare i krise', isCorrect: false, feedback: 'For sjelden.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Beste gründere: 5+ kundesamtaler per uke. Lærer kontinuerlig.',
    },
            ],
          },
        ]

        export default function BehovMarkedSegmenteringModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-03"
              moduleTitle="Behov, marked og segmentering"
              moduleIcon="🎯"
              storageKey="learning-ent1-behov-marked-segmentering"
              completeRoute="/learning/ent1/behov-marked-segmentering/complete"
              phases={phases}
              intro="Finn din plass i markedet — kjenn kunden bedre enn du kjenner deg selv. Behov, marked, segmentering, målgruppevalg og posisjonering er entreprenørens kjerne-rammeverk."
              vissteduAt="Forskning viser at startup-suksess i 90 % av tilfellene er korrelert med markedsforståelse — ikke produkt eller team. \'Marked først\' er gull-regelen."
              espenSier="Mange gründere er forelsket i produktet sitt. De som lykkes er forelsket i kunden."
      presentationLink={{ route: '/learning/presentations/ent1/behov-marked-segmentering', description: 'Behov, marked og segmentering — 10 slides' }}
            />
          )
        }
