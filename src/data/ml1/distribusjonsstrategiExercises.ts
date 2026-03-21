import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const DISTRIBUSJONSSTRATEGI_EXERCISES: QuizExercise[] = [
  {
    id: 'ds_1',
    icon: '🚗',
    title: 'Tesla og direkte distribusjon',
    context: 'Tesla selger alle sine biler direkte via Tesla.com og egne Tesla-butikker (showrooms). Det finnes ingen uavhengige Tesla-forhandlere. Kunden konfigurerer bilen online, betaler direkte til Tesla, og henter den i et Tesla-senter.',
    question: 'Tesla selger direkte til kunder uten forhandlere. Hva kaller vi dette?',
    choices: [
      { id: 'a', label: 'Selektiv distribusjon — Tesla velger ut spesielle forhandlere per region', isCorrect: false, feedback: 'Selektiv distribusjon betyr at produsenten velger et begrenset antall forhandlere. Tesla har ingen forhandlere i det hele tatt — de eier og driver alle salgskanaler selv. Det er direkte distribusjon.' },
      { id: 'b', label: 'Direkte distribusjon (null-ledds kanal) — produsent selger direkte til forbruker', isCorrect: true, feedback: 'Riktig! Null-ledds kanal betyr ingen mellomledd mellom produsent og forbruker. Tesla eier og kontrollerer hele kjeden: produksjon → nettbutikk/showroom → levering. Full kontroll, høyere marginer.' },
      { id: 'c', label: 'Intensiv distribusjon — Tesla er tilgjengelig overalt via alle mulige kanaler', isCorrect: false, feedback: 'Intensiv distribusjon maksimerer tilgjengeligheten ved å selge gjennom så mange kanaler som mulig (som tyggegummi). Tesla selger tvert imot gjennom svært begrensede, egne kanaler — det motsatte av intensivt.' },
      { id: 'd', label: 'Eksklusiv distribusjon — Tesla er kun tilgjengelig i utvalgte luksusutsalg', isCorrect: false, feedback: 'Eksklusiv distribusjon betyr én godkjent forhandler per geografisk område (som Rolex eller Ferrari). Tesla har ingen forhandlere — de eier alt selv. Det er direkte distribusjon, ikke eksklusivt via mellomledd.' },
    ],
    espenTip: 'Tesla disrupted ikke bare biler — de disrupted distribusjon. Tradisjonell bilbransje er avhengig av forhandlere. Tesla eliminerte dette leddet og tok full kontroll over pris, opplevelse og kundedata.',
  },
  {
    id: 'ds_2',
    icon: '⌚',
    title: 'Rolex og eksklusiv distribusjon',
    context: 'I Oslo selges Rolex kun via to godkjente juveler: Bjørklund og Thune. I London selges Rolex i færre enn 10 butikker i hele byen. Rolex eier ingen egne butikker — de bruker nøye utvalgte partnere som opprettholder merkeverdien.',
    question: 'Rolex selges kun via godkjente juveler med én forhandler per storby. Hvilken distribusjonsstrategi er dette?',
    choices: [
      { id: 'a', label: 'Intensiv distribusjon — produktet er tilgjengelig så mange steder som mulig', isCorrect: false, feedback: 'Intensiv distribusjon er stikk motsatt av hva Rolex gjør — den sikter mot maksimal tilgjengelighet (tyggegummi, Red Bull). Rolex begrenser bevisst tilgjengeligheten for å beskytte eksklusiviteten.' },
      { id: 'b', label: 'Selektiv distribusjon — et begrenset men ikke eksklusivt antall forhandlere', isCorrect: false, feedback: 'Selektiv distribusjon bruker et begrenset antall forhandlere, men uten eksklusivitetsavtaler per geografisk område. Rolex går lenger — de har i praksis én forhandler per storby. Det er eksklusiv distribusjon.' },
      { id: 'c', label: 'Eksklusiv distribusjon — begrenset antall nøye utvalgte distributører', isCorrect: true, feedback: 'Riktig! Eksklusiv distribusjon betyr svært få, nøye utvalgte distributører — gjerne med eksklusivitetsavtale per geografisk område. Rolex, Ferrari og Hermès bruker denne strategien for å opprettholde eksklusivitet og merkeverdi.' },
      { id: 'd', label: 'Direkte distribusjon — Rolex selger direkte til forbrukerne uten mellomledd', isCorrect: false, feedback: 'Direkte distribusjon betyr produsent → forbruker uten mellomledd (som Tesla). Rolex bruker godkjente juveler som mellomledd — det er ikke direkte. Det er eksklusiv distribusjon via utvalgte partnere.' },
    ],
    espenTip: 'Eksklusiv distribusjon bevarer eksklusiviteten og merkeverdien. Hvis Rolex ble solgt i alle kiosker, ville de sluttet å være Rolex. Distribusjonen ER en del av luksusproduktet.',
  },
  {
    id: 'ds_3',
    icon: '🍔',
    title: "McDonald's franchisesystem",
    context: "Det er 55 McDonald's-restauranter i Norge, drevet av lokale franchisedrivere. McDonald's Corporation eier ingen av de norske restaurantene direkte. Franchisedriverne betaler en inngangsavgift på ca. 1 million dollar globalt, pluss royalty på 4-5% av omsetningen til McDonald's.",
    question: "Hva er et franchisesystem og hva er McDonald's' rolle i det?",
    choices: [
      { id: 'a', label: "McDonald's eier alle restauranter og ansetter lokale ledere som drives som filialer", isCorrect: false, feedback: "Det er en filialmodell, ikke franchising. Franchising betyr at uavhengige bedrifter (franchisedrivere) eier og driver restaurantene — McDonald's eier konseptet og merkevaren, ikke restaurantene." },
      { id: 'b', label: "McDonald's er franchisegiver — de tilbyr konsept, merkevare og system mot avgift og royalty", isCorrect: true, feedback: "Riktig! McDonald's er franchisegiver (franchisor): de eier merkevaren, konseptet, systemene og opplæringen. Franchisedriverne (franchisees) betaler for retten til å bruke alt dette, og bærer den operative risikoen." },
      { id: 'c', label: "McDonald's er et kooperativ der alle restauranteiere eier selskapet i fellesskap", isCorrect: false, feedback: "Et kooperativ eies av medlemmene kollektivt (som Coop-kjeden). McDonald's er et børsnotert selskap der McDonald's Corporation er franchisegiver og tjener penger på avgifter og royalties — ikke et kooperativ." },
      { id: 'd', label: "McDonald's er en grossist som leverer mat og utstyr til selvstendige hamburgerbarer", isCorrect: false, feedback: "McDonald's er ikke en grossist — de selger ikke råvarer til uavhengige restauranter. De tilbyr et komplett konsept med merkevare, opplæring, meny og systemer mot franchiseavgift. Det er franchising." },
    ],
    espenTip: "McDonald's er faktisk et eiendomsselskap kledd som en fastfood-kjede. De eier tomtene restaurantene er bygget på, og leier dem tilbake til franchisedriverne. Eiendomsinntektene overstiger royalties.",
  },
  {
    id: 'ds_4',
    icon: '🛍️',
    title: 'Omnikanalstrategi i praksis',
    context: 'Varner (Cubus, Bik Bok, Dressmann) har nettbutikk og fysiske butikker. En kunde prøver en jakke i butikken, finner riktig størrelse, men kjøper den billigere online. Lagerstatus er ikke synkronisert mellom kanal, og kundeservice i butikk vet ikke om netthandelskjøp.',
    question: 'Hva er omnikanalstrategi?',
    choices: [
      { id: 'a', label: 'Å selge produkter gjennom flest mulig separate kanaler uten koordinering', isCorrect: false, feedback: 'Det er multikanal, ikke omnikanal. Multikanal betyr mange kanaler som opererer separat. Omnikanal krever INTEGRASJON — alle kanaler deler data og gir kunden en sømløs, helhetlig opplevelse.' },
      { id: 'b', label: 'Sømløs integrasjon av alle salgskanaler slik at kunden opplever én sammenhengende bedrift', isCorrect: true, feedback: 'Riktig! Omnikanal = alle kanaler er integrert: lagerstatus, kundeprofil og kommunikasjon er synkronisert. Kunden kan starte et kjøp på nett, prøve i butikk, returnere via app — og oppleve det som én bedrift.' },
      { id: 'c', label: 'Å ha en nettbutikk i tillegg til fysisk butikk', isCorrect: false, feedback: 'Å ha nettbutikk OG fysisk butikk er multikanal — to separate kanaler. Omnikanal krever at disse er integrert: felles lagersystem, felles kundeprofil, felles kommunikasjon. Varner-eksemplet illustrerer nettopp en multikanal som IKKE er omnikanal.' },
      { id: 'd', label: 'Distribusjon via sosiale medier og influencere i digitale kanaler', isCorrect: false, feedback: 'Sosiale medier er én kanal, ikke en omnistrategi. Omnikanal integrerer ALLE kanaler — fysisk butikk, nettbutikk, app, sosiale medier, e-post — i ett sammenhengende kundeopplevelsessystem.' },
    ],
    espenTip: 'Expertene i Norge er et godt eksempel på klikk-og-hent (omnikanal): bestill online, hent i nærmeste butikk innen 1 time. Det krever integrert lagerstyring og kommunikasjon mellom kanal.',
  },
  {
    id: 'ds_5',
    icon: '📦',
    title: 'Last mile delivery',
    context: 'Posten Norway kjører en pakke fra distribusjonssenter i Oslo til en kunde i Asker. Kjøring fra fabrikk i Kina til Oslo kostet 0,50 kr per pakke. Kjøringen fra distribusjonssenteret til hjemadressen i Asker koster 45 kr per pakke.',
    question: 'Hva er "last mile delivery" og hvorfor er det utfordrende?',
    choices: [
      { id: 'a', label: 'Levering til siste kunde i køen på et distribusjonssenter', isCorrect: false, feedback: '"Last mile" er ikke om kunder i kø på lageret. Det refererer til den geografiske siste strekningen i leveransen — fra distribusjonssenter til sluttkundens dør. Det er en logistikkterm, ikke en kø-metafor.' },
      { id: 'b', label: 'Siste del av leveransen til kunden — den dyreste og mest komplekse delen av logistikken', isCorrect: true, feedback: 'Riktig! Last mile = siste leveringsetappe fra distribusjonssenter til sluttkundens dør. Det er dyrt fordi leveranser er spredt geografisk, mange stopp per rute, ingen faste volum, og kunder er ikke alltid hjemme.' },
      { id: 'c', label: 'Internasjonal frakt fra produsent i Asia til europeisk distribusjonssenter', isCorrect: false, feedback: 'Internasjonal frakt er "first mile" eller "middle mile" — ikke last mile. Last mile er den korte, men dyre siste strekningen fra lokalt distribusjonssenter til kunden. Det er faktisk dyrest per kilometer.' },
      { id: 'd', label: 'Når en leveranse er forsinket og kunden er siste på ruten', isCorrect: false, feedback: '"Last mile" er ikke om forsinkelse eller rekkefølge på ruten. Det er en strukturell logistikktittel for det siste leddet i forsyningskjeden — siste kilometer fra distribusjonssenter til kunden.' },
    ],
    espenTip: 'Last mile er 53% av total leveringskostnad, men kun den siste 1-2% av den fysiske distansen. Amazon Prime Air (drone-levering) er under utvikling nettopp for å løse dette — automatisering av last mile.',
  },
]
