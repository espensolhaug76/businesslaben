import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🔗',
    title: 'Distribusjonskanaler og mellomledd',
    quote: 'Fra produsent til forbruker',
    content: 'En distribusjonskanal er veien produktet tar fra produsent til forbruker. Mellomledd tilfører verdi gjennom logistikk, eksponering og service. De elimineres ikke av digital teknologi — de transformeres (reisebyrå → Booking.com).',
    subpoints: [
      'DIREKTE (null ledd): Produsent → Forbruker — Tesla, Dell.com, Apple Store. Full kontroll, høyere margin',
      'KORTE KANALER (ett ledd): Produsent → Detaljist → Forbruker — Orkla → Rema 1000',
      'LANGE KANALER (to+ ledd): Produsent → Grossist → Detaljist → Forbruker — internasjonale markeder',
      'DIGITALE KANALER: Produsent → App/nettbutikk → Forbruker — Amazon, Shopify, AirBnB',
    ],
    practical: 'Mellomledd ELIMINERES ikke av digital teknologi — de transformeres. Reisebyrå → Booking.com, fysisk butikk → Amazon.',
    glossaryTerm: 'Distribusjonskanal',
    exercises: [
      {
        id: 'ds-1-1',
        question: 'Hva er en distribusjonskanal?',
        choices: [
          { id: 'a', text: 'En TV-kanal for reklame' },
          { id: 'b', text: 'Veien produktet tar fra produsent til endelig forbruker' },
          { id: 'c', text: 'Bedriftens interne kommunikasjon' },
          { id: 'd', text: 'Systemet for kundeklager' },
        ],
        correctId: 'b',
        explanation: 'En distribusjonskanal er hele kjeden av aktører og aktiviteter som fører produktet fra produsenten til den endelige forbrukeren — inkludert grossister, detaljister og logistikk.',
      },
      {
        id: 'ds-1-2',
        question: 'Tesla selger direkte til kunder uten forhandlere. Hva er fordelen?',
        choices: [
          { id: 'a', text: 'Lavere produksjonskostnader' },
          { id: 'b', text: 'Full kontroll over pris, opplevelse og kundedata' },
          { id: 'c', text: 'Bedre produktkvalitet' },
          { id: 'd', text: 'Raskere leveringstid alltid' },
        ],
        correctId: 'b',
        explanation: 'Direkte distribusjon gir full kontroll over pris, kundeopplevelse og kundedata — Tesla vet nøyaktig hvem som kjøper hva og kan optimere hele salgsprosessen.',
      },
      {
        id: 'ds-1-3',
        question: 'Orkla selger via Rema 1000 til forbrukerne. Hvilken kanaltype er dette?',
        choices: [
          { id: 'a', text: 'Direkte distribusjon (null ledd)' },
          { id: 'b', text: 'Kort kanal (ett ledd)' },
          { id: 'c', text: 'Lang kanal (to+ ledd)' },
          { id: 'd', text: 'Digital kanal' },
        ],
        correctId: 'b',
        explanation: 'Produsent (Orkla) → Detaljist (Rema 1000) → Forbruker er en kort kanal med ett mellomledd. Vanligst i norsk dagligvare.',
      },
      {
        id: 'ds-1-4',
        question: 'Hva er et digitalt mellomledd?',
        choices: [
          { id: 'a', text: 'En nettside som selger produkter' },
          { id: 'b', text: 'En digital platform (Amazon, AirBnB) som kobler produsent/tilbyder med forbruker' },
          { id: 'c', text: 'E-post markedsføring' },
          { id: 'd', text: 'Sosiale medier-reklame' },
        ],
        correctId: 'b',
        explanation: 'Digitale mellomledd som Amazon og AirBnB er digitale «gatekeepers» — de eliminerte ikke tradisjonelle mellomledd, men erstattet dem med digitale plattformer.',
      },
      {
        id: 'ds-1-5',
        question: 'Hva skjer med reisebyråer når Booking.com og Airbnb overtar?',
        choices: [
          { id: 'a', text: 'Mellomleddet forsvinner helt' },
          { id: 'b', text: 'Mellomleddet transformeres — fysisk byrå → digital plattform' },
          { id: 'c', text: 'Reisebyråer vokser sterkere' },
          { id: 'd', text: 'Ingen endring — distribusjon er uberørt av digital teknologi' },
        ],
        correctId: 'b',
        explanation: 'Mellomledd elimineres sjelden — de transformeres. Booking.com og Airbnb er digitale mellomleddsaktører som har erstattet tradisjonelle reisebyråer.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📡',
    title: 'Intensiv, selektiv og eksklusiv distribusjon',
    quote: 'Tre strategier i dybden',
    content: 'Valget av distribusjonsstrategi speiler merkevarens posisjonering. Intensiv: overalt (tyggegummi, Red Bull). Selektiv: begrenset antall utvalgte distributører (Apple-produkter via Apple Store og godkjente forhandlere). Eksklusiv: én distributør per område (Ferrari, Rolex).',
    subpoints: [
      'INTENSIV: Produktet tilgjengelig overalt — maksimal dekning for lavpris convenience goods',
      'SELEKTIV: Begrenset antall utvalgte distributører — balanse mellom dekning og kontroll',
      'EKSKLUSIV: Én distributør per geografisk område — luksus og høyspesialiserte produkter',
    ],
    practical: 'Volvo begynte å selge direkte online 2021. Tesla er 100 % direkte. Porsches selektive nettverk gir personlig service men begrenset dekning.',
    glossaryTerm: 'Distribusjonsstrategi',
    exercises: [
      {
        id: 'ds-2-1',
        question: 'Hva er intensiv distribusjon?',
        choices: [
          { id: 'a', text: 'Kun salg gjennom egne butikker' },
          { id: 'b', text: 'Produktet tilgjengelig i så mange utsalgssteder som mulig' },
          { id: 'c', text: 'Distribusjon kun i premium-butikker' },
          { id: 'd', text: 'Distribusjon i utvalgte markeder' },
        ],
        correctId: 'b',
        explanation: 'Intensiv distribusjon betyr maksimal tilgjengelighet — produktet finnes i alle butikker, bensinstasjoner og kiosker. Brukes for lavpris convenience-produkter som tyggegummi og Red Bull.',
      },
      {
        id: 'ds-2-2',
        question: 'Apple selger via Apple Store OG godkjente forhandlere som Elkjøp. Hvilken strategi er dette?',
        choices: [
          { id: 'a', text: 'Intensiv distribusjon' },
          { id: 'b', text: 'Selektiv distribusjon' },
          { id: 'c', text: 'Eksklusiv distribusjon' },
          { id: 'd', text: 'Direkte distribusjon' },
        ],
        correctId: 'b',
        explanation: 'Selektiv distribusjon betyr et begrenset antall utvalgte forhandlere — Apple kontrollerer hvem som selger produktene for å sikre riktig kundeopplevelse og merkevarekommunikasjon.',
      },
      {
        id: 'ds-2-3',
        question: 'Ferrari har én forhandler per storby. Hva er distribusjonsstrategien?',
        choices: [
          { id: 'a', text: 'Intensiv distribusjon' },
          { id: 'b', text: 'Selektiv distribusjon' },
          { id: 'c', text: 'Eksklusiv distribusjon' },
          { id: 'd', text: 'Direkte distribusjon' },
        ],
        correctId: 'c',
        explanation: 'Eksklusiv distribusjon gir én forhandler eksklusivretten i et geografisk område — brukes for luksusvarer og høyspesialiserte produkter for å opprettholde eksklusivitet og kontroll.',
      },
      {
        id: 'ds-2-4',
        question: 'Hva er fordelen med selektiv distribusjon fremfor intensiv?',
        choices: [
          { id: 'a', text: 'Lavere distribusjonskostnader alltid' },
          { id: 'b', text: 'Bedre kontroll over kundeopplevelsen og merkevarepresentasjon' },
          { id: 'c', text: 'Høyere salgsvolum' },
          { id: 'd', text: 'Tilgang til alle markeder' },
        ],
        correctId: 'b',
        explanation: 'Selektiv distribusjon gir bedre kontroll over hvordan produktet presenteres og selges — man sikrer at forhandlerne har riktig kompetanse og at merkevarekommunikasjonen er konsistent.',
      },
      {
        id: 'ds-2-5',
        question: 'For hvilke produkter er intensiv distribusjon mest hensiktsmessig?',
        choices: [
          { id: 'a', text: 'Luksusklokker og premium fashion' },
          { id: 'b', text: 'Lavpris convenience-produkter som tyggegummi, Red Bull og batterier' },
          { id: 'c', text: 'Spesialmaskiner for industrien' },
          { id: 'd', text: 'Produkter med høyt servicebehov' },
        ],
        correctId: 'b',
        explanation: 'Intensiv distribusjon passer best for lavpris convenience-produkter som kjøpes impulsivt — jo flere steder tilgjengelig, jo høyere salgsvolum.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🏪',
    title: 'Vertikale markedsføringssystemer (VMS)',
    quote: 'Franchising og integrerte kanaler',
    content: 'Et vertikalt markedsføringssystem er når produsent, grossist og detaljist samarbeider som en enhet. Corporativt VMS: ett selskap eier hele kjeden (Zara). Kontraktuelt VMS (franchising): McDonald\'s har 40 000+ restauranter i 100+ land. Administrert VMS: én aktør dominerer (IKEA og leverandørene).',
    subpoints: [
      'CORPORATIVT VMS: Ett selskap eier hele kjeden — Zara eier design, produksjon og alle butikker',
      'KONTRAKTUELT VMS (FRANCHISING): McDonald\'s gir konsept mot fee + royalty — 40 000+ restauranter',
      'ADMINISTRERT VMS: Én aktør dominerer uten formell kontrakt — IKEA dikterer leverandørvilkår',
    ],
    practical: 'Franchising er en av de mest effektive distribusjonsstrategiene i historien. McDonald\'s franchisesystem er en større organisasjon enn de fleste land.',
    glossaryTerm: 'Vertikalt markedsføringssystem',
    exercises: [
      {
        id: 'ds-3-1',
        question: 'Hva er franchising?',
        choices: [
          { id: 'a', text: 'Et system der franchisetaker eier merkenavnet' },
          { id: 'b', text: 'En kontraktuell avtale der franchisegiver gir rett til konsept mot fee og royalty' },
          { id: 'c', text: 'Når et selskap kjøper opp sine leverandører' },
          { id: 'd', text: 'Et joint venture mellom to selskaper' },
        ],
        correctId: 'b',
        explanation: 'Franchising er en kontraktuell avtale der franchisegiver (McDonald\'s, 7-Eleven) gir rett til å bruke konseptet, merkevaren og systemene mot et engangsgebyr (fee) og løpende royalty.',
      },
      {
        id: 'ds-3-2',
        question: 'Hva er fordelen med franchising for franchisegiveren?',
        choices: [
          { id: 'a', text: 'Full kontroll over alle operasjoner' },
          { id: 'b', text: 'Skalering uten kapitalkrav — franchisetageren investerer' },
          { id: 'c', text: 'Alle inntekter tilfaller franchisegiveren' },
          { id: 'd', text: 'Ingen juridiske forpliktelser' },
        ],
        correctId: 'b',
        explanation: 'Franchising lar selskapet skalere raskt uten å investere egen kapital — franchisetageren investerer i lokalet og driften mens franchisegiveren tjener på fee og royalty.',
      },
      {
        id: 'ds-3-3',
        question: 'Zara eier design, produksjon og alle butikker. Hva er dette?',
        choices: [
          { id: 'a', text: 'Kontraktuelt VMS (franchising)' },
          { id: 'b', text: 'Corporativt VMS' },
          { id: 'c', text: 'Administrert VMS' },
          { id: 'd', text: 'Selektiv distribusjon' },
        ],
        correctId: 'b',
        explanation: 'Corporativt VMS betyr at ett selskap eier og kontrollerer hele distribusjonskjeden — Zara eier design, produksjon, logistikk og alle butikker for full kontroll.',
      },
      {
        id: 'ds-3-4',
        question: 'IKEA dikterer leverandørenes betingelser uten formell kontrakt pga. sin markedsmakt. Hva er dette?',
        choices: [
          { id: 'a', text: 'Corporativt VMS' },
          { id: 'b', text: 'Kontraktuelt VMS' },
          { id: 'c', text: 'Administrert VMS' },
          { id: 'd', text: 'Eksklusiv distribusjon' },
        ],
        correctId: 'c',
        explanation: 'Administrert VMS oppstår når én aktør dominerer kjeden basert på størrelse og markedsmakt — uten formell kontrakt. IKEA og Walmart er kjente eksempler.',
      },
      {
        id: 'ds-3-5',
        question: 'McDonald\'s eier merkevaren, ikke restaurantbyggene. Hva tjener de primært penger på?',
        choices: [
          { id: 'a', text: 'Salg av burgere og mat' },
          { id: 'b', text: 'Franchiseavgifter og leie av eiendommer til franchisetagerne' },
          { id: 'c', text: 'Salg av aksjer' },
          { id: 'd', text: 'Reklameinntekter' },
        ],
        correctId: 'b',
        explanation: 'McDonald\'s er i realiteten verdens største eiendomsselskap — de eier eiendommene og leier dem tilbake til franchisetagerne, i tillegg til franchiseavgifter. Restaurantdrift er sekundær inntektskilde.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💻',
    title: 'E-handel og omnikanal',
    quote: 'Fysisk og digital integrasjon',
    content: 'Kunder forventer en sømløs opplevelse uavhengig av kanal — det er omnikanalstrategien. Multikanal tilbyr separate kanaler (nettbutikk OG fysisk butikk), men de er ikke integrerte. Omnikanal integrerer alle kanaler — kunden starter på nett, prøver i butikk, betaler med app.',
    subpoints: [
      'SINGLEKANAL: Kun én kanal — enklest å drifte, men begrenser kundens valgfrihet',
      'MULTIKANAL: Flere separate, ikke-integrerte kanaler — ulik service per kanal',
      'OMNIKANAL: Alle kanaler integrerte — felles inventory, kundeprofil og kommunikasjon',
      'D2C (DIRECT TO CONSUMER): Tesla, Warby Parker, Gymshark — bygg direkte kundeforhold og data',
    ],
    practical: 'Zalando er Norges største nettmotebutikk men åpner nå fysiske butikker — fordi 80 % av fasjonkunder vil ta på klær før kjøp.',
    glossaryTerm: 'Omnikanal',
    exercises: [
      {
        id: 'ds-4-1',
        question: 'Hva er omnikanal-strategi?',
        choices: [
          { id: 'a', text: 'Å ha mange separate salgskanaler' },
          { id: 'b', text: 'En integrert strategi der alle kanaler gir en sømløs kundeopplevelse' },
          { id: 'c', text: 'Å selge i mange land' },
          { id: 'd', text: 'Å bruke mange reklamekanaler' },
        ],
        correctId: 'b',
        explanation: 'Omnikanal integrerer alle salgs- og servicekanaler slik at kunden får en sømløs opplevelse — man kan starte kjøpet på nett, prøve i butikk og returnere via app, med felles kundeprofil overalt.',
      },
      {
        id: 'ds-4-2',
        question: 'Hva er forskjellen mellom multikanal og omnikanal?',
        choices: [
          { id: 'a', text: 'Det er ingen praktisk forskjell' },
          { id: 'b', text: 'Multikanal tilbyr separate ikke-integrerte kanaler; omnikanal integrerer alle til én sømløs opplevelse' },
          { id: 'c', text: 'Omnikanal bruker færre kanaler' },
          { id: 'd', text: 'Multikanal er kun for fysiske butikker' },
        ],
        correctId: 'b',
        explanation: 'Multikanal = separate kanaler (nettbutikk og fysisk butikk fungerer uavhengig). Omnikanal = alle kanaler er integrerte — felles inventory, kundedata og kommunikasjon på tvers.',
      },
      {
        id: 'ds-4-3',
        question: 'Hvorfor åpner Zalando fysiske butikker selv om de er en nettaktør?',
        choices: [
          { id: 'a', text: 'Fordi nettbutikk er ulønnsomme' },
          { id: 'b', text: 'Fordi 80 % av fasjonkunder vil ta på klær før kjøp' },
          { id: 'c', text: 'Fordi loven krever det' },
          { id: 'd', text: 'For å konkurrere med Amazon' },
        ],
        correctId: 'b',
        explanation: 'Zalando og andre e-handelaktører åpner fysiske butikker fordi kunder ønsker å ta på og prøve klær. En ren digital tilstedeværelse dekker ikke alle kundebehov — den fysiske kanalen er viktig.',
      },
      {
        id: 'ds-4-4',
        question: 'Hva er D2C (Direct to Consumer)?',
        choices: [
          { id: 'a', text: 'Digitalt design av forbrukerprodukter' },
          { id: 'b', text: 'En strategi der bedriften selger direkte til kunder uten mellomledd' },
          { id: 'c', text: 'Digital markedsføring til forbrukere' },
          { id: 'd', text: 'Et lojalitetsprogram for direktekjøpere' },
        ],
        correctId: 'b',
        explanation: 'D2C (Direct to Consumer) betyr å selge direkte til kunden uten mellomledd — som Tesla og Gymshark. Det gir direkte kundeforhold, data og kontroll, men krever eget distribusjonssystem.',
      },
      {
        id: 'ds-4-5',
        question: 'Hva er den viktigste fordelen med omnikanal for kunden?',
        choices: [
          { id: 'a', text: 'Lavere priser' },
          { id: 'b', text: 'Sømløs opplevelse — kan handle, returnere og kommunisere på tvers av alle kanaler' },
          { id: 'c', text: 'Raskere levering alltid' },
          { id: 'd', text: 'Mer reklame' },
        ],
        correctId: 'b',
        explanation: 'Omnikanal gir kunden frihet til å bruke ulike kanaler sømløst — starte på nett, prøve i butikk, betale med app, returnere via post — uten å starte prosessen på nytt i hver kanal.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📦',
    title: 'Logistikk, lagerstyring og SCM',
    quote: 'Fra leverandør til kunde',
    content: 'Supply Chain Management (SCM) handler om å styre hele verdikjeden fra råvare til forbruker effektivt. Just-in-Time (JIT): motta varer akkurat når de trengs — null lager, men sårbar (COVID-19). Last mile delivery er det dyreste og vanskeligste leddet — siste kilometer til kunden.',
    subpoints: [
      'JUST-IN-TIME (JIT): Null lager — minimerer kostnader men sårbar for forsinkelser (Toyota oppfant dette)',
      'CROSS-DOCKING: Varer lastes direkte fra innkommende til utgående transport uten lagerhold (Walmart)',
      'LAST MILE DELIVERY: Det dyreste leddet — siste kilometer til kunden (Posten, Bring, Helthjem)',
      'BÆREKRAFTIG LOGISTIKK: Elektrifisering, sjøfrakt fremfor fly, ruteoptimalisering',
    ],
    practical: 'Amazon Prime sin 1-dags levering er ikke lønnsom alene — det er et lojalitetsverktøy. Prime-kunder kjøper 4x mer enn ikke-Prime.',
    glossaryTerm: 'Supply chain management',
    exercises: [
      {
        id: 'ds-5-1',
        question: 'Hva er Supply Chain Management (SCM)?',
        choices: [
          { id: 'a', text: 'Ledelse av salgsteamet' },
          { id: 'b', text: 'Styring av hele verdikjeden fra råvare til forbruker' },
          { id: 'c', text: 'Digital markedsføring i forsyningskjeden' },
          { id: 'd', text: 'Kontroll av produktkvalitet' },
        ],
        correctId: 'b',
        explanation: 'SCM handler om å planlegge, gjennomføre og kontrollere alle aktiviteter i forsyningskjeden — fra råvareanskaffelse via produksjon og lagerstyring til levering til kunden.',
      },
      {
        id: 'ds-5-2',
        question: 'Hva er Just-in-Time (JIT) logistikk?',
        choices: [
          { id: 'a', text: 'Å levere produkter én dag forsinket' },
          { id: 'b', text: 'Å motta varer akkurat når de trengs — minimalt lager' },
          { id: 'c', text: 'Å produsere i sanntid basert på bestillinger' },
          { id: 'd', text: 'Å ha store lagre for å møte uventet etterspørsel' },
        ],
        correctId: 'b',
        explanation: 'JIT betyr å motta varer akkurat når de trengs i produksjonen eller salget — null eller minimalt lager. Toyota oppfant dette systemet. Fordelen: lave lagerkostnader. Risikoen: sårbar for forsinkelser.',
      },
      {
        id: 'ds-5-3',
        question: 'Hva avdekket COVID-19-pandemien om JIT-systemer?',
        choices: [
          { id: 'a', text: 'At JIT er den beste logistikkstrategien' },
          { id: 'b', text: 'At JIT er sårbar for forstyrrelser — manglende halvledere lammet bilindustrien' },
          { id: 'c', text: 'At JIT ikke brukes i praksis' },
          { id: 'd', text: 'At JIT øker lønnsomheten i krisetider' },
        ],
        correctId: 'b',
        explanation: 'Pandemien avslørte JIT-sårbarhet: halvledermangel fordi bilindustrien hadde minimale lagre lammet produksjonen. Mange bedrifter revurderer nå JIT til fordel for mer robuste forsyningskjeder.',
      },
      {
        id: 'ds-5-4',
        question: 'Hva er «last mile delivery»?',
        choices: [
          { id: 'a', text: 'Den siste leveransen i et selskapts historie' },
          { id: 'b', text: 'Det siste leddet i distribusjonskjeden — levering fra distribusjonssenter til kunden' },
          { id: 'c', text: 'Internasjonal luftfrakt' },
          { id: 'd', text: 'Retur-logistikk' },
        ],
        correctId: 'b',
        explanation: 'Last mile delivery er det siste leddet — fra distribusjonssenter til kundens dør. Det er det dyreste og vanskeligste leddet fordi det er fragmentert og lite effektivt (mange stoppesteder).',
      },
      {
        id: 'ds-5-5',
        question: 'Hva er Amazon Prime sin egentlige strategiske hensikt?',
        choices: [
          { id: 'a', text: 'Å tjene penger direkte på abonnementsavgiften' },
          { id: 'b', text: 'Et lojalitetsverktøy — Prime-kunder kjøper 4x mer enn ikke-Prime' },
          { id: 'c', text: 'Å konkurrere direkte med Netflix' },
          { id: 'd', text: 'Å redusere Amazons logistikkkostnader' },
        ],
        correctId: 'b',
        explanation: 'Amazon Prime sin 1-dags levering er ikke nødvendigvis lønnsom isolert — men Prime-abonnenter kjøper 4x mer enn vanlige kunder. Det er et lojalitetsverktøy som øker total kjøpsverdi.',
      },
    ],
  },
];

export default function DistribusjonsstrategiModule() {
  return (
    <DrawerModule
      moduleCode="ML1-07"
      moduleTitle="Distribusjonsstrategi"
      moduleIcon="🚚"
      storageKey="learning-ml1-distribusjonsstrategi"
      completeRoute="/learning/ml1/distribusjonsstrategi/complete"
      phases={phases}
      intro="Distribusjonsstrategi handler om å velge de riktige kanalene for å gjøre produktet tilgjengelig for kunden — på riktig sted, til riktig tid og til lavest mulig kostnad."
      vissteduAt="McDonald's er verdens største eiendomsselskap — ikke matselskap. De tjener penger på franchiseavgifter og leie av eiendommene til franchisedriverne. Restaurantdrift er sekundær."
      espenSier="Tesla disrupted bilindustrien ikke bare med elektriske biler — men ved å eliminere forhandlerleddet. Direkte salg gir Tesla full kontroll over pris, opplevelse og kundedata. Det er distribusjon som konkurransefortrinn."
      presentationLink={{ route: '/learning/presentations/distribusjon', description: 'Distribusjon — direkte/indirekte, distribusjonsgrad og omnikanal' }}
    />
  );
}
