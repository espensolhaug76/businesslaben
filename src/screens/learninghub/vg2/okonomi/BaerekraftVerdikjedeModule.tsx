import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🌍',
    title: 'Den bærekraftige kjeden — Ansvar fra råvare til avfall',
    quote: '«Du kan ikke outsource ansvaret ditt.»',
    content: 'Bærekraftsansvaret strekker seg langt utover bedriftens egne lokaler. Moderne bedrifter er forventet å overvåke og forbedre hele verdikjeden — fra råvareutvinning og transport til salg og avfallshåndtering.',
    subpoints: [
      { label: 'Utvidet ansvar', text: 'Bedriften er ansvarlig for mer enn egne aktiviteter — inkludert leverandørers og underleverandørers praksis.' },
      { label: 'Tre dimensjoner av bærekraft', text: 'Miljø (klima, ressurser), Sosialt (arbeidsforhold, menneskerettigheter), Økonomi (lønnsomhet).' },
      { label: 'Fra lineær til sirkulær', text: 'Fra "ta-bruke-kaste"-modellen til systemer der ressurser holdes i omløp.' },
    ],
    practical: 'Tegn verdikjeden til en norsk hotellkjede. Marker alle steder der det finnes bærekraftsproblemer.',
    exercises: [
      {
        id: 'BV1-1',
        icon: '🌍',
        title: 'Omfanget av bærekraftsansvar',
        question: 'Hva menes med at bærekraftsansvaret strekker seg "utover bedriftens egne lokaler"?',
        choices: [
          { id: 'a', label: 'Bedriften har ansvar for å rydde opp i nærområdet rundt bedriften', isCorrect: false, feedback: 'Det er et veldig smalt syn. Det handler om verdikjedens utstrekning globalt.' },
          { id: 'b', label: 'Bedriften er medansvarlig for konsekvensene av hele verdikjeden — inkludert leverandørers praksiser', isCorrect: true, feedback: 'Riktig! En norsk bedrift som kjøper tekstiler fra Bangladesh har et medansvar for forholdene i den fabrikken.' },
          { id: 'c', label: 'Bedriften må sponse lokale miljøtiltak i nærsamfunnet', isCorrect: false, feedback: 'Lokalt engasjement er positivt, men det er ikke det bærekraftansvaret refererer til her.' },
        ],
        espenTip: 'Tenk "fra jord til bord" — alt som skjer langs veien er ditt medansvar.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '💨',
    title: 'Scope 3-utslipp — Ansvar for leverandørenes fotavtrykk',
    quote: '«90 % av problemet er usynlig — fordi det skjer et annet sted.»',
    content: 'Klimagassutslipp deles inn i tre "scopes". Scope 3 er de indirekte utslippene i verdikjeden — og de utgjør typisk over 90 % av en bedrifts totale klimafotavtrykk.',
    subpoints: [
      { label: 'Scope 1', text: 'Egne direkte utslipp — bedriftens kjøretøy, fyringsolje, lekkasje.' },
      { label: 'Scope 2', text: 'Indirekte utslipp fra kjøpt energi — strøm og fjernvarme.' },
      { label: 'Scope 3', text: 'Alle andre indirekte utslipp: leverandørkjede, transport av varer, ansattes reiser, avfall, produktbruk.' },
      { label: 'Hvorfor er Scope 3 viktigst?', text: 'For en klesbutikk er 95 % av utslippene i Scope 3 — produksjonen skjer i fabrikken i Asia.' },
    ],
    practical: 'Hvilke Scope 3-utslipp er størst for en norsk kafé? Lag en liste i prioritert rekkefølge.',
    exercises: [
      {
        id: 'BV2-1',
        icon: '💨',
        title: 'Scope 3 i praksis',
        question: 'En norsk klesbutikk annonserer at de er "klimanøytrale" basert på sine Scope 1 og 2-utslipp. Hva er problemet med denne påstanden?',
        choices: [
          { id: 'a', label: 'Ingenting — Scope 1 og 2 dekker alle klimagassutslipp', isCorrect: false, feedback: 'Nei — Scope 1 og 2 dekker bare egne og energirelaterte utslipp. Scope 3 fra produksjonen i Asia er ikke inkludert.' },
          { id: 'b', label: 'De ignorerer Scope 3-utslippene fra produksjon og frakt, som typisk er 90+ % av klesbutikkens klimafotavtrykk', isCorrect: true, feedback: 'Riktig! For en klesbutikk er produksjonsutslippene i leverandørkjeden (Scope 3) langt større enn hva Scope 1 og 2 dekker. Å kalle seg klimanøytral uten Scope 3 er misvisende.' },
          { id: 'c', label: 'De bør bare kutte energiforbruket i butikken', isCorrect: false, feedback: 'Å kutte energi er bra, men det adresserer ikke den primære kilden til utslipp.' },
        ],
        espenTip: 'Grønnvasking! Markedsføringsloven forbyr villedende miljøpåstander. Scope 3 må inkluderes for at klimanøytralitet-påstanden skal holde vann.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔗',
    title: 'Verdikjeden — Porters fem primæraktiviteter',
    quote: '«Verdi skapes i hvert ledd — og kan mistes i hvert ledd.»',
    content: 'Michael Porters verdikjedemodell bryter ned en bedrifts aktiviteter i primæraktiviteter (direkte verdiskaping) og støtteaktiviteter. Bærekraft berører hvert eneste ledd.',
    subpoints: [
      { label: '1. Inngående logistikk', text: 'Mottak, lagring og transport av innsatsvarer.' },
      { label: '2. Primæraktiviteter/drift', text: 'Selve produksjonen eller tjenesteleveransen.' },
      { label: '3. Utgående logistikk', text: 'Lagring og levering av ferdige produkter til kunder.' },
      { label: '4. Markedsføring og salg', text: 'Aktiviteter for å gjøre kundene kjent med og kjøpe produktet.' },
      { label: '5. Service', text: 'Etter-salgsservice, reklamasjoner, retur og resirkulering.' },
    ],
    practical: 'For et reiselivsselskap — tegn verdikjeden og identifiser det leddet med størst potensial for bærekraftsforbedring.',
    exercises: [
      {
        id: 'BV3-1',
        icon: '🔗',
        title: 'Verdikjedens ledd',
        question: 'En norsk kjede av utleiehytter vil redusere sitt miljøavtrykk. I hvilket ledd i verdikjeden har de størst potensial?',
        choices: [
          { id: 'a', label: 'Markedsføring og salg — by kun på nettbasert markedsføring', isCorrect: false, feedback: 'Digital markedsføring hjelper litt, men det er ikke der det største potensialet ligger.' },
          { id: 'b', label: 'Inngående logistikk — velge bærekraftige leverandører av mat, rengjøringsmidler og møbler', isCorrect: true, feedback: 'Riktig! Innkjøp er der de fleste bedrifter har størst innflytelse på sitt Scope 3-fotavtrykk. Riktige krav til leverandører gir størst effekt.' },
          { id: 'c', label: 'Service — la gjestene sortere avfall selv', isCorrect: false, feedback: 'Avfallssortering er bra men lite — innkjøpsleddets leverandørvalg har langt større effekt.' },
        ],
        espenTip: 'Innkjøp er den kraftigste bærekraftsarmen for de fleste bedrifter — dine leverandørvalg definerer ditt fotavtrykk.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔍',
    title: 'Sporbarhet — Vite hvor varen kommer fra',
    quote: '«Hvis du ikke vet hvor det kommer fra, kan du ikke stole på det.»',
    content: 'Sporbarhet er evnen til å følge et produkt tilbake gjennom alle ledd i produksjonen. Det er et krav fra lovgivere, investorer og kunder i stadig større grad.',
    subpoints: [
      { label: 'Hva er sporbarhet?', text: 'Dokumentasjon av hele råvare-til-hylle-reisen for et produkt.' },
      { label: 'Digitale systemer', text: 'Blockchain og RFID muliggjør nær-sanntids sporing i komplekse verdikjeder.' },
      { label: 'Åpenhetsloven', text: 'Norske bedrifter over en viss størrelse plikter å offentliggjøre informasjon om leverandørkjedens arbeidsforhold.' },
      { label: 'Kundeforventninger', text: 'Stadig flere forbrukere ønsker å vite hvem som produserte varene og under hvilke forhold.' },
    ],
    practical: 'Du skal kjøpe uniformer til en ny restaurant. Hvilke spørsmål stiller du leverandøren for å sjekke sporbarhet?',
    exercises: [
      {
        id: 'BV4-1',
        icon: '🔍',
        title: 'Sporbarhetsutfordringen',
        question: 'Voice (norsk klesgrossist) offentliggjør sine leverandørfabrikkers navn og land. Hvilken verdi gir dette?',
        choices: [
          { id: 'a', label: 'Ingen praktisk verdi — det er bare PR', isCorrect: false, feedback: 'Det er mer enn PR. Åpenhet skaper accountability og tvinger fabrikker til å forbedre seg.' },
          { id: 'b', label: 'Det muliggjør uavhengig kontroll av arbeidsforhold, og reduserer risiko for at problemer skjules', isCorrect: true, feedback: 'Riktig! Åpenhet om leverandørkjeden betyr at journalister, NGO-er og myndigheter kan sjekke forholdene. Det skaper ekte ansvarliggjøring.' },
          { id: 'c', label: 'Det oppfyller kun et lovkrav og har ingen annen verdi', isCorrect: false, feedback: 'Åpenhetsloven er én grunn, men den strategiske verdien går langt utover compliance.' },
        ],
        espenTip: 'Åpenhet = accountability. Bedrifter som skjuler leverandørkjeden har noe å skjule.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🤝',
    title: 'Leverandøroppfølging — Stille krav og sjekke',
    quote: '«Tillitt er bra, kontroll er bedre.»',
    content: 'Det er ikke nok å ha gode intensjoner i leverandøravtalen. Systematisk leverandøroppfølging er nødvendig for å sikre at kravene faktisk etterleves i praksis.',
    subpoints: [
      { label: 'Kravspesifikasjon', text: 'Klare krav til miljø, arbeidsforhold og antikorrupsjon i kontrakter.' },
      { label: 'Revisjoner og inspeksjoner', text: 'Tredjepartsrevisjoner som SA8000, Fairtrade eller uanmeldte besøk.' },
      { label: 'Aktsomhetsvurderinger', text: 'Risikobasert undersøkelse for å identifisere potensielle brudd på menneskerettigheter.' },
      { label: 'Sanksjonsmuligheter', text: 'Avvikling av leverandørforhold ved alvorlige brudd er et nødvendig virkemiddel.' },
    ],
    practical: 'Lag et enkelt "leverandørscorecard" for en norsk hotel med 5 kriterier for bærekraftsvurdering.',
    exercises: [
      {
        id: 'BV5-1',
        icon: '🤝',
        title: 'Leverandøroppfølging',
        question: 'En hotellkjede har en leverandør av tekstiler som de ikke har besøkt på 4 år. De har bare en skriftlig erklæring om at forholdene er i orden. Er dette tilstrekkelig leverandøroppfølging?',
        choices: [
          { id: 'a', label: 'Ja — en skriftlig erklæring er juridisk bindende og bør holde', isCorrect: false, feedback: 'En erklæring er lett å skrive uten å etterleve den. Ekte oppfølging krever verificering.' },
          { id: 'b', label: 'Nei — systematisk leverandøroppfølging krever periodiske inspeksjoner og/eller tredjepartsrevisjoner', isCorrect: true, feedback: 'Riktig! Åpenhetsloven og god praksis krever aktiv oppfølging, ikke bare erklæringer. En erklæring er et startpunkt, ikke en garanti.' },
          { id: 'c', label: 'Ja — det er leverandørens ansvar å overholde kravene, ikke hotellkjedens', isCorrect: false, feedback: 'Nei — ifølge Åpenhetsloven er det kjøpers ansvar å gjennomføre aktsomhetsvurderinger av leverandørkjeden.' },
        ],
        espenTip: 'Åpenhetsloven (2022): Virksomheter over 50 ansatte plikter å gjennomføre aktsomhetsvurderinger og offentliggjøre disse.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🚂',
    title: 'CargoNet — Gods fra vei til jernbane',
    quote: '«Det grønneste transportmidlet er det man allerede har bygget.»',
    content: 'CargoNet er Norges viktigste aktør for godstransport på jernbane. Ved å flytte gods fra vei til jernbane sparer de enorme mengder CO2.',
    subpoints: [
      { label: 'Omfanget', text: 'CargoNet erstatter i snitt 1 200 trailere per dag ved å kjøre gods på jernbane.' },
      { label: 'Klimaeffekten', text: 'Sparer nesten 700 000 CO2-ekvivalenter per år sammenlignet med veitransport.' },
      { label: 'Scope 3 for kundene', text: 'Bedrifter som bruker CargoNet i stedet for lastebiler reduserer sine egne Scope 3-utslipp.' },
      { label: 'Utfordringen', text: 'Jernbanen er begrenset til bestemte ruter og krever omlasting — ikke alltid mer effektivt door-to-door.' },
    ],
    practical: 'For hvilke typer varer er jernbanetransport BEST egnet? Og for hvilke er den minst egnet?',
    exercises: [
      {
        id: 'BV6-1',
        icon: '🚂',
        title: 'Modal shift',
        question: 'Hva menes med "modal shift" i transportsammenheng?',
        choices: [
          { id: 'a', label: 'At transportselskapet skifter til en ny forretningsmodell', isCorrect: false, feedback: 'Modal betyr "transportform", ikke forretningsmodell.' },
          { id: 'b', label: 'Overflytting av gods fra ett transportmiddel (bil) til et mer klimavennlig (jernbane/skip)', isCorrect: true, feedback: 'Riktig! Modal shift er en av de mest effektive strategiene for å redusere klimagassutslipp fra transport.' },
          { id: 'c', label: 'En ny metode for å pakke gods mer effektivt', isCorrect: false, feedback: 'Emballasjereduksjon er en annen strategi. Modal shift handler om valg av transportform.' },
        ],
        espenTip: 'Jernbane er 7-10 ganger mer energieffektivt enn lastebil. Modal shift er et av de kraftigste virkemidlene vi har.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '👗',
    title: 'Voice — Transparens i tekstilbransjen',
    quote: '«Bærekraft uten åpenhet er bare greenwashing.»',
    content: 'Voice er en norsk kleskjede som eier merkevarer som Match og VIC. De har tatt grep for å øke transparensen i sin leverandørkjede ved å offentliggjøre lister over sine produksjonsfabrikker.',
    subpoints: [
      { label: 'Utfordringen', text: 'Tekstilbransjen er beryktet for dårlige arbeidsforhold i fabrikker i Asia og Bangladesh.' },
      { label: 'Voices grep', text: 'Offentliggjøring av fabrikklister gjør det mulig for journalister og NGO-er å gjøre uavhengige inspeksjoner.' },
      { label: 'Sirkulære løsninger', text: 'Voice investerer i systemer for innsamling og gjenbruk av klær.' },
      { label: 'Markedsfordelen', text: 'Økt transparens bygger tillit hos miljøbevisste forbrukere og reduserer omdømmerisiko.' },
    ],
    practical: 'Søk opp "Voice supplier list" på nett. Hva kan du finne ut om fabrikkene fra slike lister?',
    exercises: [
      {
        id: 'BV7-1',
        icon: '👗',
        title: 'Åpenhet som strategi',
        question: 'Hvilken risiko tar Voice ved å offentliggjøre sine leverandørfabrikker?',
        choices: [
          { id: 'a', label: 'Ingen risiko — dette er bare positiv PR', isCorrect: false, feedback: 'Det er en reell risiko: fabrikkinspeksjoner kan avdekke problemer som gir negativ medieomtale.' },
          { id: 'b', label: 'Journalister og NGO-er kan inspisere fabrikkene og avsløre problemer som gir dårlig publisitet', isCorrect: true, feedback: 'Riktig! Åpenhet er et tveegget sverd — det bygger tillit, men gjør deg også sårbar for kritikk hvis det avdekkes problemer. Det er likevel det riktige å gjøre.' },
          { id: 'c', label: 'Konkurrenter kan stjele leverandørforholdene deres', isCorrect: false, feedback: 'Leverandørforhold er basert på relasjoner og avtaler, ikke bare kjennskap til fabrikknavn.' },
        ],
        espenTip: 'Ekte bærekraft handler om å tåle gransking — ikke bare å ha flotte ord i årsrapporten.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Misforståelser — Bærekraft er mer enn resirkulering',
    quote: '«Å kildesortere er starten, ikke slutten.»',
    content: 'Den vanligste misforståelsen om bærekraft er at det handler om kildesortering og papirstrå. Bærekraft i næringslivet handler om fundamentale endringer i forretningsmodeller.',
    subpoints: [
      { label: 'Myte: Bærekraft = kildesortering', text: 'Kildesortering er bra, men det er det minste tilgjengelige tiltaket.' },
      { label: 'Myte: Bærekraft er dyrt', text: 'Forskning viser at bærekraftige bedrifter over tid er mer lønnsomme — sparer energi, unngår bøter, tiltrekker talent.' },
      { label: 'Myte: Bærekraft vs. profitt', text: 'ESG-forskning (Environmental, Social, Governance) viser at de to ikke er motsetninger.' },
      { label: 'Myte: Bare store bedrifter har ansvar', text: 'Åpenhetsloven gjelder bedrifter fra 50 ansatte. Og alle bedrifter kan gjøre valg.' },
    ],
    practical: 'Lag en liste over de tre tingene en liten kafé kan gjøre for størst bærekraftseffekt — uten å kildesortere.',
    exercises: [
      {
        id: 'BV8-1',
        icon: '♻️',
        title: 'Bærekraftsmisforståelse',
        question: 'En restaurant bytter alle sugerør fra plast til papir og markedsfører seg som "bærekraftig". Hva er problemet?',
        choices: [
          { id: 'a', label: 'Ingenting — alle bidrag teller', isCorrect: false, feedback: 'Det er et bidrag, men å kalle seg bærekraftig basert på sugerør er typisk grønnvasking.' },
          { id: 'b', label: 'Det er grønnvasking — restauranten tar et minimalt tiltak mens de ignorerer større påvirkningskilder som matsvinn og kjøttmenyen', isCorrect: true, feedback: 'Riktig! Å fremheve et lite tiltak som bevis på bærekraft, mens man ignorerer store påvirkningskilder, er en form for grønnvasking.' },
          { id: 'c', label: 'Papirsugerør er faktisk ikke mer bærekraftig enn plast', isCorrect: false, feedback: 'Det er et faktum, men det adresserer ikke kjernen i spørsmålet om markedsføringspåstanden.' },
        ],
        espenTip: 'Grønnvasking: å markedsføre seg som grønn uten å adressere bedriftens faktiske største utslippskilder.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Åpenhetsloven',
    quote: '«Det som ikke måles, forbedres ikke.»',
    content: 'Åpenhetsloven trådte i kraft i Norge 1. juli 2022 og pålegger større virksomheter å gjennomføre aktsomhetsvurderinger og offentliggjøre informasjon om leverandørkjedens arbeidsforhold.',
    subpoints: [
      { label: 'Hvem gjelder den?', text: 'Virksomheter med minst 50 ansatte, 70 mill. kr i omsetning, og 35 mill. kr i balanse.' },
      { label: 'Hva kreves?', text: '(1) Gjennomføre aktsomhetsvurderinger. (2) Offentliggjøre redegjørelse. (3) Svar på forespørsler fra forbrukere.' },
      { label: 'Forbrukerretten', text: 'Alle kan kreve å få vite om og hvordan bedriften jobber med menneskerettigheter i leverandørkjeden.' },
      { label: 'Sanksjon', text: 'Forbrukertilsynet kan gi pålegg og overtredelsesgebyr ved brudd.' },
    ],
    practical: 'Du jobber i innkjøpsavdelingen til en norsk hotellkjede med 200 ansatte. Hva må du gjøre etter Åpenhetsloven?',
    exercises: [
      {
        id: 'BV9-1',
        icon: '⚖️',
        title: 'Åpenhetsloven',
        question: 'Hva er en "aktsomhetsvurdering" etter Åpenhetsloven?',
        choices: [
          { id: 'a', label: 'En kontroll av om leverandøren er lønnsom nok', isCorrect: false, feedback: 'Aktsomhetsvurderinger handler om menneskerettigheter og arbeidsforhold, ikke om lønnsomhet.' },
          { id: 'b', label: 'En risikobasert undersøkelse for å identifisere og håndtere faktisk og potensiell skade på menneskerettigheter i leverandørkjeden', isCorrect: true, feedback: 'Riktig! Bedriften må aktivt kartlegge risiko for brudd på menneskerettigheter hos leverandørene og dokumentere hva de gjør med det.' },
          { id: 'c', label: 'En juridisk vurdering av om leverandøravtalene er juridisk korrekte', isCorrect: false, feedback: 'Kontraktgjennomgang er separat fra aktsomhetsvurdering. Aktsomhetsvurdering handler om faktiske forhold i produksjonen.' },
        ],
        espenTip: 'Åpenhetsloven gir alle forbrukere rett til å spørre bedriften: "Har du sjekket at leverandørene dine respekterer grunnleggende rettigheter?"',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Bærekraft som konkurransefortrinn',
    quote: '«Bedrifter som ikke tilpasser seg trendene, taper konkurransekraft.»',
    content: 'Bærekraft i verdikjeden har gått fra frivillig til nødvendig. Reguleringer, investorer, kunder og talentmarkedet krever nå at bedrifter tar ansvar for hele sin verdikjede.',
    subpoints: [
      { label: 'Scope 3 er størst', text: 'Indirekte utslipp i verdikjeden utgjør 90+ % av mange bedrifters klimafotavtrykk.' },
      { label: 'Sporbarhet og åpenhet', text: 'Åpenhetsloven krever at du vet hvem du handler med og under hvilke forhold.' },
      { label: 'Leverandøroppfølging', text: 'Erklæringer holder ikke — periodiske revisjoner er nødvendig.' },
      { label: 'Norske eksempler', text: 'CargoNet (modal shift) og Voice (leverandør透明) viser veien.' },
    ],
    practical: 'Skriv en kort bærekraftsstrategi for en norsk turistattraksjons verdikjede. Hvilke tre tiltak har størst effekt?',
    exercises: [
      {
        id: 'BV10-1',
        icon: '🎯',
        title: 'Helhetsforståelse',
        question: 'En bedrift vil forbedre sitt bærekraftsarbeid og har begrenset tid og penger. Hva bør de prioritere FØRST?',
        choices: [
          { id: 'a', label: 'Bytte til miljømerket kontorpapir og miljøvennlig kaffe i kantinen', isCorrect: false, feedback: 'Disse tiltakene er Scope 1/2-tiltak og har svært liten effekt sammenlignet med Scope 3.' },
          { id: 'b', label: 'Kartlegge Scope 3-utslipp og starte dialog med de 3–5 største leverandørene om forbedring', isCorrect: true, feedback: 'Riktig! Scope 3 er der hoveddelen av miljøpåvirkningen ligger. Leverandørdialog og krav gir størst effekt per investerte krone.' },
          { id: 'c', label: 'Publisere en fin bærekraftsrapport for å vise kundene engasjementet', isCorrect: false, feedback: 'En rapport uten underliggende tiltak er grønnvasking. Handlingen kommer før rapporten.' },
        ],
        espenTip: 'Prioriter Scope 3 og leverandørkjeden. Det gir størst effekt — og er hva kundene, bankene og myndighetene faktisk ser etter.',
      },
    ],
  },
]

export default function BaerekraftVerdikjedeModule() {
  return (
    <DrawerModule
      moduleCode="OK-VG2-9"
      moduleTitle="Bærekraft i verdikjeden"
      moduleIcon="🌍"
      storageKey="learning-vg2-baerekraft-verdikjede"
      completeRoute="/learning/vg2/okonomi/baerekraft-verdikjede/complete"
      phases={phases}
      intro="Forstå Scope 3-utslipp, sporbarhet og leverandøroppfølging — og hvorfor bærekraft handler om mye mer enn kildesortering."
      vissteduAt="For en norsk klesbutikk stammer typisk over 95 % av klimagassutslippene fra produksjon og transport i Asia — ikke fra butikken selv."
      espenSier="Bærekraft er ikke et CSR-prosjekt — det er kjernestrategi. De bedriftene som tar dette på alvor nå, vil ha et enormt konkurransefortrinn om 10 år."
      presentationLink={{ route: '/learning/presentations/baerekraft-verdikjede', description: 'Bærekraft i verdikjeden — en visuell presentasjon' }}
    />
  )
}
