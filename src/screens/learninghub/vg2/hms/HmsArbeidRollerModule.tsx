import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🦺',
    title: 'HMS — systematisk og lovpålagt',
    quote: '"HMS er ikke en hendelse én gang i året — det er en kontinuerlig prosess."',
    content: 'Helse, miljø og sikkerhet (HMS) er lovpålagt systematisk arbeid som kalles Internkontroll. Det handler ikke om å fylle ut skjemaer — det handler om å skape en arbeidsplass der ingen blir skadet, syke eller ekskludert. Alle virksomheter med ansatte er forpliktet til å jobbe systematisk med HMS.',
    subpoints: [
      { label: 'Lovpålagt', text: 'Alle norske virksomheter med ansatte plikter å ha et fungerende HMS-system (Arbeidsmiljøloven + Internkontrollforskriften)' },
      { label: 'Systematisk', text: 'HMS er ikke tilfeldig — det er en strukturert prosess med fire klare trinn som gjentas kontinuerlig' },
      { label: 'Ansvar', text: 'Daglig leder har det øverste juridiske ansvaret for HMS. Alle ansatte har medvirkningsplikt' },
      { label: 'Mål', text: 'Null skader, null sykefravær relatert til arbeid, et inkluderende og trygt arbeidsmiljø' },
    ],
    practical: 'Finn ut: Har arbeidsplassen din en HMS-håndbok eller HMS-policy? Vet du hvem verneombudet er? Vet du hvordan du melder avvik?',
    exercises: [
      {
        id: 'hms1-1',
        icon: '🦺',
        title: 'Grunnleggende HMS',
        question: 'Hva er kjernen i det systematiske HMS-arbeidet som kalles Internkontroll?',
        choices: [
          { id: 'a', label: 'En gang i året sjekke at brannslukker er på plass', isCorrect: false, feedback: 'Det er en del av HMS, men internkontroll er langt mer omfattende og kontinuerlig.' },
          { id: 'b', label: 'En kontinuerlig prosess med kartlegging, planlegging, tiltak og oppfølging', isCorrect: true, feedback: 'Riktig! Internkontroll er en syklisk prosess med fire trinn som gjentas.' },
          { id: 'c', label: 'Å sende HMS-rapport til Arbeidstilsynet hvert år', isCorrect: false, feedback: 'Arbeidstilsynet fører tilsyn, men HMS-arbeidet er internt og kontinuerlig.' },
          { id: 'd', label: 'Å kjøpe verneutstyr til alle ansatte', isCorrect: false, feedback: 'Verneutstyr er ett tiltak, men HMS-arbeid er mye bredere.' },
        ],
        espenTip: 'Huskeregel: HMS = "Hjelp Meg Systematisk". Det er en syklus som aldri stopper.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔄',
    title: 'Internkontroll — de fire trinnene',
    quote: '"Internkontroll er som et hjul: det stopper aldri å rulle."',
    content: 'Internkontrollforskriften strukturerer HMS-arbeidet i fire logiske trinn som gjentas som en kontinuerlig syklus. Hvert trinn bygger på det forrige, og tilsammen sikrer de at arbeidsmiljøet forbedres over tid.',
    subpoints: [
      { label: 'Trinn 1: Sette i gang', text: 'Leder fastslår formål, dokumenterer hvem som har ansvar og forplikter virksomheten til HMS-arbeid' },
      { label: 'Trinn 2: Kartlegge', text: 'Risikovurdering (ROS-analyse) av alle arbeidsoperasjoner. Hva kan gå galt? Hva er konsekvensen?' },
      { label: 'Trinn 3: Planlegge tiltak', text: 'Sett opp handlingsplan med konkrete tiltak, ansvarlige og tidsfrister' },
      { label: 'Trinn 4: Følge opp', text: 'Vernerunder, avviksmeldinger, og evaluering. Syklusens output starter neste runde' },
    ],
    practical: 'Tenk gjennom: Er det noen risiko på din arbeidsplass som ikke er kartlagt? Hva kan gå galt i ditt daglige arbeid? Skriv ned tre potensielle farer.',
    exercises: [
      {
        id: 'hms2-1',
        icon: '🔄',
        title: 'Rekkefølgen i internkontroll',
        question: 'Du starter i ny jobb og daglig leder sier "vi trenger å fornye HMS-arbeidet". Hva er det første steget?',
        choices: [
          { id: 'a', label: 'Kjøpe nytt verneutstyr', isCorrect: false, feedback: 'Tiltak (trinn 3) kommer etter at man har kartlagt risiko. Ikke start med løsninger.' },
          { id: 'b', label: 'Kalle inn til brannøvelse', isCorrect: false, feedback: 'Brannøvelse er et konkret tiltak, ikke det første steget i HMS-arbeidet.' },
          { id: 'c', label: 'Etablere ansvarsfordeling og forplikte virksomheten til HMS-arbeid', isCorrect: true, feedback: 'Riktig! Trinn 1 handler om forpliktelse og ansvarsfordeling — grunnlaget for alt annet.' },
          { id: 'd', label: 'Velge verneombud', isCorrect: false, feedback: 'Verneombudsvalg er viktig, men ikke det første steget i internkontroll.' },
        ],
        espenTip: 'Fire trinn: 1) Forplikte, 2) Kartlegge, 3) Planlegge, 4) Følge opp. Husk: du kan ikke planlegge tiltak før du vet hva problemene er.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '👔',
    title: 'Daglig leders ansvar',
    quote: '"Du kan delegere oppgaver, men du kan aldri delegere juridisk ansvar."',
    content: 'Daglig leder bærer det øverste juridiske ansvaret for HMS i virksomheten. Dette kan ikke overføres til HR-avdelingen, verneombudet eller en HMS-koordinator. Ansvaret betyr at leder er forpliktet til å prioritere HMS-ressurser og sikre at tiltak gjennomføres.',
    subpoints: [
      { label: 'Juridisk ansvar', text: 'Daglig leder kan straffes ved brudd på Arbeidsmiljøloven — bøter og i alvorlige tilfeller fengsel' },
      { label: 'Prioritering', text: 'HMS-tiltak kan ikke nedprioriteres på grunn av økonomi alene — dette er et lovkrav' },
      { label: 'Opplæring', text: 'Leder plikter å sørge for tilstrekkelig HMS-opplæring til alle ansatte' },
      { label: 'Avviksbehandling', text: 'Leder plikter å behandle og lukke innmeldte avvik innen rimelig tid' },
    ],
    practical: 'Refleksjon: Tenk på en arbeidsplass du kjenner. Er det noen HMS-problemer som ikke er tatt tak i? Hva kan årsaken være til at de ikke er løst?',
    exercises: [
      {
        id: 'hms3-1',
        icon: '👔',
        title: 'Lederansvar',
        question: 'En daglig leder sier: "Verneombudet tar seg av HMS — det er ikke mitt ansvar." Er dette korrekt?',
        choices: [
          { id: 'a', label: 'Ja, verneombudet er HMS-ansvarlig når det er valgt', isCorrect: false, feedback: 'Verneombudet overvåker og rapporterer, men bærer ikke det juridiske HMS-ansvaret.' },
          { id: 'b', label: 'Ja, men bare for den fysiske sikkerheten', isCorrect: false, feedback: 'Det juridiske ansvaret er ubegrenset og kan ikke deles med verneombudet.' },
          { id: 'c', label: 'Nei, det juridiske HMS-ansvaret ligger alltid hos daglig leder', isCorrect: true, feedback: 'Riktig! Ansvaret kan ikke delegeres vekk. Verneombudet er en overvåker, ikke en ansvarshaver.' },
          { id: 'd', label: 'Avhenger av virksomhetens størrelse', isCorrect: false, feedback: 'Uavhengig av størrelse er daglig leder juridisk ansvarlig for HMS.' },
        ],
        espenTip: 'Huskeregel: Ansvaret følger myndigheten. Daglig leder har myndighet → daglig leder har ansvar.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '👷',
    title: 'Verneombudet — overvåker, ikke ansvarshaver',
    quote: '"Verneombudet er arbeidskollegenes øyne og ører — ikke leders stedfortreder."',
    content: 'Verneombudet er en demokratisk valgt representant som overvåker arbeidsmiljøet på vegne av arbeidstakerne. Rollen er grunnleggende annerledes enn daglig leder: verneombudet har rett til å stanse farlig arbeid umiddelbart, men har ikke plikt til å utbedre problemet.',
    subpoints: [
      { label: 'Demokratisk valgt', text: 'Velges av og blant arbeidstakerne — ikke utpekt av leder. Virksomheter med 10+ ansatte er lovpålagt å ha verneombud' },
      { label: 'Overvåking', text: 'Gjennomfører vernerunder, mottar avviksmeldinger, og rapporterer til ledelsen' },
      { label: 'Stansingsrett', text: 'Juridisk rett til umiddelbart å stanse arbeid som er til fare for liv og helse — uten å spørre leder' },
      { label: 'Ikke utbedringsplikt', text: 'Verneombudet plikter IKKE å utbedre problemer — det er alltid lederens oppgave' },
    ],
    practical: 'Finn verneombudet på din arbeidsplass eller skole. Vet du hvem det er? Vet du hva du kan bruke dem til? Du kan alltid melde bekymringer til verneombudet.',
    exercises: [
      {
        id: 'hms4-1',
        icon: '👷',
        title: 'Verneombudets rolle',
        question: 'Verneombudet på et lager oppdager at et reoloppsett er ustabilt og kan falle. Hva kan verneombudet gjøre?',
        choices: [
          { id: 'a', label: 'Skrive en rapport som sendes til leder innen 30 dager', isCorrect: false, feedback: 'For en umiddelbar fare kan verneombudet handle raskere enn 30 dager.' },
          { id: 'b', label: 'Reparere reoloppsettet selv etter arbeidstid', isCorrect: false, feedback: 'Verneombudet plikter ikke og bør ikke selv utbedre fysiske farer.' },
          { id: 'c', label: 'Umiddelbart stanse arbeid i det farlige området og varsle leder', isCorrect: true, feedback: 'Riktig! Verneombudet har juridisk stansingsrett ved umiddelbar fare.' },
          { id: 'd', label: 'Ta bildet og legge det ut på intern chat for å skape bevissthet', isCorrect: false, feedback: 'Informasjonsdeling er fint, men ved umiddelbar fare brukes stansingsretten.' },
        ],
        espenTip: 'Verneombudet er en "varsler med myndighet". De kan stoppe farlig arbeid øyeblikkelig — det er en sterk juridisk rettighet, ikke bare en anbefaling.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🏛️',
    title: 'AMU — Arbeidsmiljøutvalget',
    quote: '"AMU er arbeidslivets minidemokrati — leder og ansatte bestemmer HMS sammen."',
    content: 'I virksomheter med 50 eller flere ansatte er det lovpålagt å opprette et Arbeidsmiljøutvalg (AMU). AMU er et partssammensatt organ der representanter fra leder og ansatte møtes jevnlig for å drøfte og beslutte HMS-tiltak.',
    subpoints: [
      { label: 'Sammensetning', text: 'Lik representasjon: halvparten fra ledelsen, halvparten valgt av ansatte. Verneombud er alltid med' },
      { label: 'Mandat', text: 'AMU behandler alle saker av vesentlig betydning for arbeidsmiljø: nybygg, omorganisering, helse, trivsel' },
      { label: 'Møtehyppighet', text: 'Minst fire ganger per år. Protokoll skrives og arkiveres' },
      { label: 'Beslutninger', text: 'AMU kan fremme forslag og gi pålegg til leder — leder plikter å følge opp' },
    ],
    practical: 'Visste du at? Hvis du jobber i en virksomhet med 50+ ansatte, kan du be om innsyn i AMU-protokollene. Det er et åpent, demokratisk organ.',
    exercises: [
      {
        id: 'hms5-1',
        icon: '🏛️',
        title: 'AMU',
        question: 'En bedrift har 60 ansatte og har ikke opprettet AMU. Hva er situasjonen?',
        choices: [
          { id: 'a', label: 'Det er frivillig om de vil ha AMU', isCorrect: false, feedback: 'AMU er lovpålagt for virksomheter med 50+ ansatte etter Arbeidsmiljøloven.' },
          { id: 'b', label: 'De bryter Arbeidsmiljøloven og kan bli pålagt å opprette AMU', isCorrect: true, feedback: 'Riktig! AMU er et lovkrav over 50 ansatte og manglende etterlevelse er lovbrudd.' },
          { id: 'c', label: 'De kan erstatte AMU med et godt verneombud', isCorrect: false, feedback: 'Verneombud og AMU er separate krav og dekker ulike funksjoner.' },
          { id: 'd', label: 'AMU kreves bare i industrien, ikke i servicebransjen', isCorrect: false, feedback: 'AMU kreves i alle bransjer for virksomheter med 50+ ansatte.' },
        ],
        espenTip: 'Grenseverdier å huske: 10+ ansatte = verneombud påkrevd. 50+ ansatte = AMU påkrevd.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '📝',
    title: 'Avvikssystemet — lære av feil',
    quote: '"Et avvik som ikke meldes, skjer om igjen."',
    content: 'Avvikssystemet er det operative hjertet i HMS-arbeidet. Alle avvik fra prosedyrer, alle nestenulykker og alle faktiske skader skal meldes inn. Systemet fungerer bare når ansatte faktisk bruker det — og leder faktisk følger opp.',
    subpoints: [
      { label: 'Avvik', text: 'Enhver hendelse der noe ikke gikk som planlagt — brudd på rutine, nestenulykke, skade' },
      { label: 'Meldeplikt', text: 'Alle ansatte plikter å melde avvik. Ikke bare alvorlige hendelser — også nestenulykker er gull' },
      { label: 'Behandling', text: 'Leder plikter å behandle, registrere og lukke avviksmeldinger innen rimelig tid' },
      { label: 'Læring', text: 'Avviksstatistikk avdekker mønstre — mange nestenulykker i ett område = systemisk problem' },
    ],
    practical: 'Huskeregel: En nestenulykke er en gave — den viser at noe er feil UTEN at noen ble skadet. Meld den alltid!',
    exercises: [
      {
        id: 'hms6-1',
        icon: '📝',
        title: 'Avviksmeldingen',
        question: 'En ansatt glir på et vått gulv men faller ikke. Skal dette meldes som avvik?',
        choices: [
          { id: 'a', label: 'Nei, ingen ble skadet så det er ikke nødvendig', isCorrect: false, feedback: 'Nestenulykker er like viktige å melde som faktiske ulykker — de varsler om systemisk risiko.' },
          { id: 'b', label: 'Ja, nestenulykker er svært verdifulle og skal alltid meldes', isCorrect: true, feedback: 'Riktig! Nestenulykken viser at gulvet er farlig. Fix det FØR noen faktisk faller.' },
          { id: 'c', label: 'Kun hvis det er en gjest og ikke en ansatt', isCorrect: false, feedback: 'Avvikssystemet gjelder for alle på arbeidsplassen.' },
          { id: 'd', label: 'Bare hvis det skjer mer enn én gang', isCorrect: false, feedback: 'Én nestenulykke er nok. Meld og utbedre umiddelbart.' },
        ],
        espenTip: 'Nestenulykker er systemets viktigste signal. Mange nestenulykker + ingen melding = systemsvikt. Mange nestenulykker + melding + utbedring = god HMS-kultur.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🏭',
    title: 'Asko-eksemplet — HMS i lagerhverdagen',
    quote: '"Verneombudet er en venn med juridisk myndighet — bruk dem."',
    content: 'Hos Asko (NorgesGruppens distribusjonskjede) utgjør truck-kjøring og tunge løft store HMS-risikoer. Eksemplet illustrerer samspillet mellom ansattes atferd, verneombudets rolle og lederens ansvar.',
    subpoints: [
      { label: 'Situasjonen', text: 'Verneombudet gjennomfører vernerunde og oppdager ustabile reoler i lagerbygget' },
      { label: 'Verneombudets tiltak', text: 'Skriver avviksmelding umiddelbart. Kan stanse arbeid i området om faren er umiddelbar' },
      { label: 'Lederens plikt', text: 'Daglig leder er forpliktet til å utbedre feilen — ikke bare notere den' },
      { label: 'Ansattes medvirkning', text: 'En ansatt som ikke bruker verneskoene bryter sin medvirkningsplikt (AML § 2-3)' },
    ],
    practical: 'Refleksjon: Hva ville du gjort om du oppdaget en umiddelbar fare på jobben og leder ikke tok det seriøst? Du har faktisk juridiske rettigheter i denne situasjonen.',
    exercises: [
      {
        id: 'hms7-1',
        icon: '🏭',
        title: 'Medvirkningsplikt',
        question: 'En ansatt hos Asko nekter å bruke verneskorer fordi de er ubehagelige. Hva er situasjonen?',
        choices: [
          { id: 'a', label: 'Ansattes rett til å velge komfort går foran vernekrav', isCorrect: false, feedback: 'Nei. Arbeidstakers medvirkningsplikt krever at påbudt verneutstyr brukes.' },
          { id: 'b', label: 'Ansatten bryter sin medvirkningsplikt etter Arbeidsmiljøloven', isCorrect: true, feedback: 'Riktig! AML § 2-3 pålegger ansatte å bruke påbudt verneutstyr.' },
          { id: 'c', label: 'Det er OK om verneskorne er ubrukelige', isCorrect: false, feedback: 'Ansatten bør rapportere ubrukelig verneutstyr som avvik — men ikke la være å bruke det.' },
          { id: 'd', label: 'Kun leder kan kreve at verneskorne brukes', isCorrect: false, feedback: 'Medvirkningsplikten er lovfestet — ikke avhengig av leders direkte pålegg i den aktuelle situasjonen.' },
        ],
        espenTip: 'AML § 2-3: Ansatte plikter å medvirke til HMS-arbeid, bruke verneutstyr, og melde fra om farer. Dette er juridisk plikt, ikke bare god praksis.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🚫',
    title: 'Vanlig misforståelse — verneombudet er ikke HMS-sjef',
    quote: '"Å skyve HMS-ansvaret til verneombudet er ikke delegering — det er ansvarsfraskrivelse."',
    content: 'Den vanligste og mest alvorlige misforståelsen i HMS-arbeid er å tro at verneombudet er en slags HMS-sjef med ansvar for å utbedre problemer. Dette er feil. Verneombudet er arbeidskollegenes representant — ikke en del av ledelseshierarkiet.',
    subpoints: [
      { label: 'Myten', text: '"Verneombudet er HMS-sjef og har ansvar for utbedring." Feil!' },
      { label: 'Realiteten', text: 'Verneombudet overvåker, rapporterer og kan stanse farlig arbeid — men utbedringsansvar tilhører leder' },
      { label: 'Konsekvensen av myten', text: 'Leder unndrar seg ansvar. Verneombudet overarbeides og undermineres. Problemer forblir uløst' },
      { label: 'Den sanne styrken', text: 'Verneombudet kan umiddelbart stanse farlig arbeid — det er en makt ingen andre ansatte har' },
    ],
    practical: 'Diskuter: Har du noen gang hørt noen si "det er verneombudets ansvar"? Hva er konsekvensen av dette synet? Hvem er i praksis ansvarlig?',
    exercises: [
      {
        id: 'hms8-1',
        icon: '🚫',
        title: 'Ansvarsmisforståelse',
        question: 'En daglig leder sier til verneombudet: "Du er verneombud — da er det ditt ansvar at verneutstyret er i orden." Hva er galt med dette?',
        choices: [
          { id: 'a', label: 'Ingenting — det er korrekt fordeling av ansvar', isCorrect: false, feedback: 'Feil. Verneombudet overvåker, men ansvar for utstyr og utbedring ligger hos leder.' },
          { id: 'b', label: 'Daglig leder overfører juridisk ansvar de ikke kan overføre', isCorrect: true, feedback: 'Riktig! Det juridiske HMS-ansvaret kan ikke delegeres vekk fra daglig leder.' },
          { id: 'c', label: 'Verneombudet bør takke ja til dette ansvaret', isCorrect: false, feedback: 'Å ta på seg ansvar man ikke juridisk har, er en felle som underminerer verneombudets egentlige rolle.' },
          { id: 'd', label: 'Det er greit i mindre virksomheter', isCorrect: false, feedback: 'Størrelse på virksomheten endrer ikke hvem som har det juridiske HMS-ansvaret.' },
        ],
        espenTip: 'Huskeregel: Verneombud = øyne og ører. Daglig leder = ansvar og handling. Disse rollene kan ikke byttes.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Arbeidsmiljøloven og Internkontrollforskriften',
    quote: '"Arbeidsmiljøloven er en av Norges viktigste velferdslov — den beskytter deg på jobb."',
    content: 'HMS-arbeid er forankret i to sentrale rettskilder: Arbeidsmiljøloven (AML) og Internkontrollforskriften (IK-forskriften). Disse utfyller hverandre — AML fastslår rettighetene, IK-forskriften beskriver prosessen for å ivareta dem.',
    subpoints: [
      { label: 'AML kap. 3', text: 'Arbeidsgivers og arbeidstakers plikter i det systematiske HMS-arbeidet' },
      { label: 'AML kap. 6', text: 'Verneombudsordningen — plikt til valg, rettigheter og beskyttelse mot gjengjeldelse' },
      { label: 'AML kap. 7', text: 'Arbeidsmiljøutvalget (AMU) — sammensetning, mandat og møteplikt' },
      { label: 'Internkontrollforskriften', text: 'Konkretiserer kravene til dokumentasjon, prosedyrer og systematikk i HMS-arbeidet' },
    ],
    practical: 'Les gjerne: AML § 2-1 (arbeidsgivers plikter) og § 2-3 (arbeidstakers plikter). De er korte og klare. Du finner dem på lovdata.no.',
    exercises: [
      {
        id: 'hms9-1',
        icon: '⚖️',
        title: 'Lovverk',
        question: 'Hvilken lovparagraf gir verneombudet rett til umiddelbart å stanse farlig arbeid?',
        choices: [
          { id: 'a', label: 'Brann- og eksplosjonsvernloven', isCorrect: false, feedback: 'Brannloven regulerer brannforebygging. Verneombudets stansingsrett er i Arbeidsmiljøloven.' },
          { id: 'b', label: 'Internkontrollforskriften § 5', isCorrect: false, feedback: 'IK-forskriften regulerer prosessen for HMS-arbeid, ikke verneombudets rettigheter.' },
          { id: 'c', label: 'Arbeidsmiljøloven kapittel 6', isCorrect: true, feedback: 'Riktig! AML kap. 6 regulerer verneombudsordningen, inkludert stansingsretten.' },
          { id: 'd', label: 'Folkehelscloven', isCorrect: false, feedback: 'Folkehelseloven handler om befolkningens generelle helse, ikke arbeidsplassens HMS.' },
        ],
        espenTip: 'AML struktur: Kap. 3 = systematisk HMS. Kap. 6 = verneombud. Kap. 7 = AMU. Enkelt å huske: 3, 6, 7.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌟',
    title: 'Oppsummering — HMS som profesjonell kompetanse',
    quote: '"En fagarbeider som kan HMS, er ikke bare tryggere — de er mer verdifulle for enhver arbeidsgiver."',
    content: 'HMS-kunnskap er en av de mest etterspurte kompetansene i service- og reiselivsnæringen. Bedrifter som scorer høyt på HMS har lavere sykefravær, færre ulykker og bedre arbeidsmiljø. Du er nå rustet til å bidra aktivt — som ansatt, verneombud, eller fremtidig leder.',
    subpoints: [
      { label: 'Internkontroll', text: '4 trinn: Forplikte → Kartlegge → Planlegge → Følge opp. Syklusen gjentas kontinuerlig' },
      { label: 'Ansvarsfordeling', text: 'Daglig leder: juridisk ansvar. Verneombud: overvåking og stansingsrett. Alle ansatte: medvirkningsplikt' },
      { label: 'Verneombud', text: 'Demokratisk valgt, kan stanse farlig arbeid, har ikke utbedringsansvar' },
      { label: 'AMU', text: 'Lovpålagt ved 50+ ansatte. Partssammensatt. Behandler vesentlige arbeidsmiljøsaker' },
      { label: 'Avvikssystem', text: 'Hjertet i HMS-arbeidet. Meld alltid — også nestenulykker' },
    ],
    practical: 'Neste steg: Finn Arbeidstilsynets veileder "Trinn i HMS-arbeidet" på arbeidstilsynet.no. Den er gratis og gir en praktisk innføring du kan bruke umiddelbart.',
    exercises: [
      {
        id: 'hms10-1',
        icon: '🌟',
        title: 'Oppsummering',
        question: 'Hvem kan umiddelbart stanse arbeid som er til fare for liv og helse uten å spørre leder?',
        choices: [
          { id: 'a', label: 'Daglig leder', isCorrect: false, feedback: 'Daglig leder har myndighet, men det er VERNEOMBUDET som spesifikt er gitt denne stansingsretten i loven.' },
          { id: 'b', label: 'Arbeidsmiljøutvalget (AMU)', isCorrect: false, feedback: 'AMU er et kollegialt organ som møtes periodisk — ikke noe som kan stanse arbeid øyeblikkelig.' },
          { id: 'c', label: 'Verneombudet', isCorrect: true, feedback: 'Riktig! Verneombudet har en unik juridisk rett til umiddelbar stansing av farlig arbeid (AML kap. 6).' },
          { id: 'd', label: 'Enhver ansatt', isCorrect: false, feedback: 'Alle ansatte plikter å varsle om farer, men den juridiske stansingsretten tilhører verneombudet.' },
        ],
        espenTip: 'Verneombudets stansingsrett er unik i norsk arbeidsliv. Det er en sterk juridisk rettighet som skiller rollen fra alle andre funksjoner på arbeidsplassen.',
      },
    ],
  },
]

export default function HmsArbeidRollerModule() {
  return (
    <DrawerModule
      moduleCode="HMS-VG2-7"
      moduleTitle="HMS-arbeid og roller"
      moduleIcon="🦺"
      storageKey="learning-vg2-hms-arbeid-roller"
      completeRoute="/learning/vg2/hms/hms-arbeid-roller/complete"
      phases={phases}
      intro="Systematisk HMS-arbeid, internkontroll og rollene til arbeidsgiver, arbeidstaker og verneombud."
      vissteduAt="Alle virksomheter med 10 eller flere ansatte må etter loven ha et verneombud, og fra 50 ansatte kreves også et arbeidsmiljøutvalg (AMU). Internkontrollforskriften gjelder uansett størrelse — fra første ansatt."
      espenSier="HMS er en syklus: forplikte, kartlegge, planlegge, følge opp. Du kan ikke planlegge tiltak før du vet hva problemene er. Og husk: ansvaret følger myndigheten — daglig leder har myndighet, derfor har daglig leder ansvar."
      presentationLink={{ route: '/learning/presentations/hms-arbeid-roller', description: 'HMS-arbeid og roller — en visuell presentasjon' }}
    />
  )
}
