import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📐',
    title: 'Tre prisstrategier',
    quote: 'Prisen du setter sier mer om merket ditt enn nesten noe annet',
    practical:
      'Kostbasert: Kostnad + påslag = pris (Rema 1000 egne varer). Markedsbasert: Pris etter konkurrentene (KIWI matcher Rema). Verdibasert: Pris etter kundens opplevde verdi (Starbucks, Apple). Verdibasert gir høyest marginer — men krever sterk merkevare.',
    glossaryTerm: 'Dekningsbidrag',
    exercises: [
      {
        id: 'pr-1-1',
        icon: '📐',
        title: 'Kostbasert prising',
        question: 'En bakeri beregner at hvert brød koster 12 kr å produsere og legger på 50% påslag. Hvilken prisstrategi bruker de?',
        choices: [
          { id: 'a', label: 'Verdibasert prising', isCorrect: false, feedback: 'Verdibasert prising tar utgangspunkt i hva kunden er villig til å betale — ikke i produksjonskostnaden. Her er det kostnaden som styrer prisen.' },
          { id: 'b', label: 'Konkurransebasert prising', isCorrect: false, feedback: 'Konkurransebasert prising betyr at konkurrentenes priser styrer din pris — bakeriet her starter med kostnaden, ikke konkurrentene.' },
          { id: 'c', label: 'Kostbasert prising', isCorrect: true, feedback: 'Riktig! Kostbasert prising starter med produksjonskostnaden og legger til et bestemt påslag — nøyaktig det bakeriet gjør.' },
          { id: 'd', label: 'Penetrasjonsprising', isCorrect: false, feedback: 'Penetrasjonsprising er en lanseringsstrategi med bevisst lav pris — det er ikke det samme som å beregne pris fra kostnad pluss påslag.' },
        ],
        espenTip: 'Kostbasert prising er enkel å beregne, men ignorerer hva kunden faktisk er villig til å betale — du kan derfor sette prisen for lavt og gå glipp av margin.',
      },
      {
        id: 'pr-1-2',
        icon: '🏪',
        title: 'Konkurransebasert prising',
        question: 'KIWI sjekker hva Rema 1000 tar for melk og prissetter sin melk tilsvarende. Hvilken strategi er dette?',
        choices: [
          { id: 'a', label: 'Kostbasert prising', isCorrect: false, feedback: 'Kostbasert starter med produksjonskostnaden — KIWI starter her med konkurrentens pris, noe som er en annen tilnærming.' },
          { id: 'b', label: 'Konkurransebasert prising', isCorrect: true, feedback: 'Riktig! Konkurransebasert prising betyr at konkurrentenes priser er referansepunktet — KIWI matcher Remas pris, noe som er klassisk markedsbasert.' },
          { id: 'c', label: 'Verdibasert prising', isCorrect: false, feedback: 'Verdibasert prising setter prisen etter kundens opplevde verdi, ikke etter konkurrentenes priser.' },
          { id: 'd', label: 'Skummingsprising', isCorrect: false, feedback: 'Skummingsprising er en strategi der man starter høyt og senker prisen over tid — ikke det samme som å kopiere konkurrentenes priser.' },
        ],
        espenTip: 'Konkurransebasert prising er vanlig i dagligvare der forbrukerne sammenligner priser — risikoen er at alle setter like priser og ingen tjener godt.',
      },
      {
        id: 'pr-1-3',
        icon: '☕',
        title: 'Verdibasert prising',
        question: 'Starbucks tar 75 kr for en caffe latte som koster 15 kr å lage. De setter prisen basert på opplevelsen og merkevaren. Dette er:',
        choices: [
          { id: 'a', label: 'Ulovlig prismanipulasjon', isCorrect: false, feedback: 'Det er fullt lovlig å ta en høy pris for et produkt — markedet bestemmer om kundene vil betale. Starbucks prissetter lovlig basert på opplevd verdi.' },
          { id: 'b', label: 'Kostbasert prising med høyt påslag', isCorrect: false, feedback: 'Selv om påslaget er høyt, er ikke dette kostbasert — de setter ikke prisen fra kostnad + påslag, men fra hva kunden verdsetter merkevaren til.' },
          { id: 'c', label: 'Verdibasert prising', isCorrect: true, feedback: 'Riktig! Verdibasert prising setter prisen etter kundens opplevde verdi — Starbucks selger en merkeopplevelse, ikke bare kaffe, og priser deretter.' },
          { id: 'd', label: 'Konkurransebasert prising', isCorrect: false, feedback: 'Konkurransebasert prising ville betydd at Starbucks matcher andre kaffebarers priser — de posisjonerer seg derimot bevisst høyere enn gjennomsnittet.' },
        ],
        espenTip: 'Verdibasert prising krever at du vet nøyaktig hva kunden verdsetter — og at merkevaren din faktisk leverer den verdien.',
      },
      {
        id: 'pr-1-4',
        icon: '🍎',
        title: 'Apple og verdibasert prising',
        question: 'Apple tar 15 000 kr for en iPhone som koster anslagsvis 3 000 kr å produsere. Hva er fordelen med verdibasert prising for Apple?',
        choices: [
          { id: 'a', label: 'Det er billigere for kundene enn andre smartphones', isCorrect: false, feedback: 'Apple er blant de dyreste smarttelefon-alternativene — fordelen er ikke lav pris for kundene, men høye marginer for Apple.' },
          { id: 'b', label: 'Det gir Apple svært høye marginer ved å prise etter merkevareverdi, ikke produksjonskostnad', isCorrect: true, feedback: 'Riktig! Når prisen settes etter opplevd merkevareverdi, kan Apple ta en massiv margin mellom produksjonskostnad og salgspris.' },
          { id: 'c', label: 'Det beskytter Apple mot konkurranse fra Samsung', isCorrect: false, feedback: 'Verdibasert prising gjør Apple dyrere, ikke mer beskyttet mot konkurranse — beskyttelsen kommer fra merkevarelojaliteten, ikke prisen i seg selv.' },
          { id: 'd', label: 'Det gjør det lettere å sammenligne produktene med konkurrentenes', isCorrect: false, feedback: 'Verdibasert prising gjør det faktisk vanskeligere å sammenligne direkte — Apple posisjonerer seg i en egen "premium"-kategori.' },
        ],
        espenTip: 'For verdibasert prising å fungere, må merkevaren faktisk levere opplevd verdi — ellers vil kundene ikke betale og heller velge billigere alternativer.',
      },
      {
        id: 'pr-1-5',
        icon: '🛒',
        title: 'Rema 1000 egne varer',
        question: 'Rema 1000 setter prisen på sine egne merkevarer (Rema-merket) ved å beregne produksjonskost og legge til et standard påslag. Hva er den viktigste svakheten ved denne tilnærmingen?',
        choices: [
          { id: 'a', label: 'Det er ulovlig å ha egne merkevarer i dagligvare', isCorrect: false, feedback: 'Det er helt lovlig for dagligvarekjeder å ha egne merkevarer (EMV) — det er en svært vanlig praksis.' },
          { id: 'b', label: 'Prisen kan bli for høy eller for lav i forhold til hva kundene faktisk er villige til å betale', isCorrect: true, feedback: 'Riktig! Kostbasert prising ignorerer markedets prissensitivitet og kundens verdioppfatning — prisen kan ende opp feil i begge retninger.' },
          { id: 'c', label: 'Rema kan ikke konkurrere med Lidl uten markedsbasert prising', isCorrect: false, feedback: 'Dette er ikke nødvendigvis sant — Rema bruker trolig en kombinasjon av strategier. Svakheten ved kostbasert er fundamental, ikke konkurrentspesifikk.' },
          { id: 'd', label: 'Kostbasert prising er kun lovlig for store bedrifter', isCorrect: false, feedback: 'Det finnes ingen lovmessige begrensninger på hvilken prisstrategi en bedrift kan bruke — kostbasert er lovlig for alle.' },
        ],
        espenTip: 'De beste bedriftene bruker kostbasert som et gulv (prisen kan ikke gå under kostprisen) men setter faktisk pris basert på markedet eller verdien.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🚗',
    title: 'Skumming vs penetrasjon',
    quote: 'Tesla tar premien fra early adopters — Dacia tar markedsandelen fra dag én',
    practical:
      'Skumming: høy startpris, senkes over tid. Brukes ved teknologilanseringer og luksusvarer. Tesla Cybertruck: 500 000 kr+. Penetrasjon: lav startpris for å raskt bygge markedsandel. Dacia Sandero fra 180 000 kr. Risiko med skumming: kopiering. Risiko med penetrasjon: lav margin.',
    exercises: [
      {
        id: 'pr-2-1',
        icon: '📱',
        title: 'Skummingsprising',
        question: 'Samsung lanserer ny Galaxy-telefon til 15 000 kr. Etter 6 måneder senkes prisen til 10 000 kr. Etter ett år til 8 000 kr. Dette er et eksempel på:',
        choices: [
          { id: 'a', label: 'Penetrasjonsprising', isCorrect: false, feedback: 'Penetrasjonsprising betyr å starte med lav pris for å vinne markedsandel raskt — Samsung starter her med høy pris og senker gradvis.' },
          { id: 'b', label: 'Skummingsprising', isCorrect: true, feedback: 'Riktig! Skummingsprising betyr høy startpris for å "skumme av" tidlige kjøpere som er villige til å betale premium, deretter senkes prisen etter hvert.' },
          { id: 'c', label: 'Psykologisk prising', isCorrect: false, feedback: 'Psykologisk prising handler om prisformateringen (999 kr vs 1000 kr) — ikke om å senke prisen systematisk over tid.' },
          { id: 'd', label: 'Kostbasert prising', isCorrect: false, feedback: 'Kostbasert prising endres ikke etter tid basert på markedsrespons — prissenkningen er en strategisk beslutning, ikke en kostnadsberegning.' },
        ],
        espenTip: 'Skumming fungerer fordi noen kunder er villige til å betale langt mer for å være "first" — og bedriften tjener høy margin på dem før prisen senkes.',
      },
      {
        id: 'pr-2-2',
        icon: '🚘',
        title: 'Dacia-eksempelet',
        question: 'Dacia lanserte Sandero i Norge fra 180 000 kr — langt under konkurrentene. Formålet var å raskt vinne markedsandeler. Hvilken strategi er dette?',
        choices: [
          { id: 'a', label: 'Skummingsprising', isCorrect: false, feedback: 'Skumming betyr å starte høyt og senke over tid — Dacia starter lavt for å raskt få mange kunder, noe som er det motsatte.' },
          { id: 'b', label: 'Verdibasert prising', isCorrect: false, feedback: 'Verdibasert prising tar utgangspunkt i kundens opplevde verdi, ikke i å utkonkurrere konkurrentene prismessig.' },
          { id: 'c', label: 'Penetrasjonsprising', isCorrect: true, feedback: 'Riktig! Penetrasjonsprising betyr lav startpris for å raskt bygge markedsandeler — nøyaktig det Dacia gjør med Sandero.' },
          { id: 'd', label: 'Kostbasert prising', isCorrect: false, feedback: 'Dacia setter prisen bevisst lavt for å konkurrere — kostbasert prising reflekterer produksjonskostnaden, ikke en bevisst strategisk prisenking.' },
        ],
        espenTip: 'Dacia har lyktes fordi de faktisk kan produsere bilen billig (kostnadsstruktur), ikke bare fordi de vil ha lav pris — penetrasjon krever lave faktiske kostnader for å være bærekraftig.',
      },
      {
        id: 'pr-2-3',
        icon: '⚡',
        title: 'Tesla og skumming',
        question: 'Tesla Cybertruck ble lansert til over 500 000 kr. Kun de mest betalingsvillige "early adopters" kjøpte den til den prisen. Hvilken risiko medfører skummingsstrategi?',
        choices: [
          { id: 'a', label: 'Kunder vil ikke forstå produktet og vil kjøpe det feil', isCorrect: false, feedback: 'Forståelse av produktet er ikke den primære risikoen ved skumming — den er relatert til markedsreaksjoner og konkurranse.' },
          { id: 'b', label: 'Konkurrenter kan kopiere produktet og selge billigere, og tappe markedsandeler', isCorrect: true, feedback: 'Riktig! Høy pris signaliserer høy margin, som tiltrekker konkurrenter — de kan kopiere og selge billigere og ta markedsandeler mens Tesla venter med å senke prisen.' },
          { id: 'c', label: 'Forbrukere kan saksøke Tesla for å ta for høy pris', isCorrect: false, feedback: 'Det er ikke ulovlig å ta en høy pris i et fritt marked — kunder velger selv om de vil betale.' },
          { id: 'd', label: 'Skumming fører alltid til tap i det første året', isCorrect: false, feedback: 'Skumming gir typisk svært høye marginer i det første året fra "early adopters" — det er det som gjør strategien attraktiv.' },
        ],
        espenTip: 'Tesla beskytter seg mot kopiering gjennom patenter og merkevarebygging — ikke alle kan beskytte seg like godt.',
      },
      {
        id: 'pr-2-4',
        icon: '🎮',
        title: 'Penetrasjon i digitale markeder',
        question: 'Spotify lanserte gratis lytteplattform med annonser for å raskt nå millioner av brukere, deretter presset de på for Premium-abonnement. Hva er risikoen med penetrasjonsstrategi?',
        choices: [
          { id: 'a', label: 'For mange kunder fører til kapasitetsproblemer', isCorrect: false, feedback: 'Digitale tjenester som Spotify er ikke begrenset av fysisk kapasitet på samme måte — risikoen er finansiell, ikke kapasitetsmessig.' },
          { id: 'b', label: 'Lav pris gir lav margin og kan være vanskelig å bære over tid hvis veksten er for treg', isCorrect: true, feedback: 'Riktig! Penetrasjon krever at man taper penger på kort sikt for å bygge markedsandel — hvis volumet ikke vokser raskt nok, er det finansielt svært krevende.' },
          { id: 'c', label: 'Kundene vil alltid kreve gratis produkt permanent', isCorrect: false, feedback: 'Selv om noen kunder aldri vil betale, viser Spotify at mange konverterer til betalt — "freemium"-modellen er bevist lønnsom for digitale tjenester.' },
          { id: 'd', label: 'Penetrasjonsprising er kun lovlig for digitale tjenester', isCorrect: false, feedback: 'Penetrasjonsprising brukes i alle bransjer — fysiske produkter, tjenester og digitale produkter. Det er ingen lovmessig begrensning.' },
        ],
        espenTip: 'Penetrasjon krever tålmodige investorer og sterk tro på at volumveksten til slutt gjør strategien lønnsom — det er ikke for alle bedrifter.',
      },
      {
        id: 'pr-2-5',
        icon: '🎯',
        title: 'Riktig strategi for produkttypen',
        question: 'En norsk gründer lanserer et revolusjonerende nytt medisinsk sporingsarmbånd. Hvilken lanseringsprisstrategi passer best?',
        choices: [
          { id: 'a', label: 'Penetrasjonsprising — lav startpris for å nå flest mulig', isCorrect: false, feedback: 'Medisinsk utstyr med teknologisk innovasjon og høy opplevd verdi egner seg bedre til skumming — tidlige brukere er ofte villige til å betale premiumpriser.' },
          { id: 'b', label: 'Skummingsprising — høy startpris, senkes over tid etter hvert som markedet modnes', isCorrect: true, feedback: 'Riktig! Innovativt medisinsk utstyr har en naturlig "early adopter"-gruppe (helsepersonell, teknologiinteresserte) som betaler premiumpriser — skumming utnytter dette.' },
          { id: 'c', label: 'Konkurransebasert prising — match konkurrentenes pris', isCorrect: false, feedback: 'Et revolusjonerende produkt har ingen direkte konkurrenter å matche prisen til — markedsbasert gir liten mening ved innovasjonslansering.' },
          { id: 'd', label: 'Kostbasert prising — produksjonskostnad pluss 30% påslag', isCorrect: false, feedback: 'Kostbasert vil sannsynligvis gi for lav pris for et revolusjonerende produkt der kunden verdsetter løsningen langt høyere enn produksjonskostnaden.' },
        ],
        espenTip: 'Tommelfingerregel: skumming passer for innovasjon og prestisje, penetrasjon passer for volum-markeder og nettverksprodukter der størrelse gir verdi.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🧠',
    title: 'Psykologisk prising',
    quote: '999 kr og 1 000 kr er ikke det samme — selv om forskjellen er én krone',
    practical:
      '19,90 vs 20,00 kr: hjernen leser venstre siffer først og kategoriserer 19 som "billigere kategori" enn 20. Forskning viser 87% velger ,90-prisen. Andre teknikker: ankerprising (gammel pris streket over), bundling (tre for to) og desimalfjerning (39 kr i stedet for 39,00 kr).',
    exercises: [
      {
        id: 'pr-3-1',
        icon: '🧠',
        title: 'Psykologisk prising — grunnprinsippet',
        question: 'Hvorfor velger 87% av forbrukere 19,90 kr fremfor 20,00 kr, selv om forskjellen er bare 10 øre?',
        choices: [
          { id: 'a', label: 'Fordi 19,90 alltid er billigere enn 20,00', isCorrect: false, feedback: 'Forskjellen er 10 øre — det er ikke den faktiske besparelsen som driver valget, men kognitiv prosessering av det venstre sifferet.' },
          { id: 'b', label: 'Hjernen leser venstre siffer først og kategoriserer 19 som lavere prisklasse enn 20', isCorrect: true, feedback: 'Riktig! Venstre siffer-effekten betyr at hjernen prosesserer 19 og 20 som kategorisk ulike — 19 oppfattes som "billig kategori", 20 som "dyrere kategori".' },
          { id: 'c', label: 'Fordi ,90-priser er lovpålagt i norsk detaljhandel', isCorrect: false, feedback: 'Det finnes ingen lov om at priser skal slutte på ,90 — det er en markedsstrategisk beslutning basert på forbrukerpsykologi.' },
          { id: 'd', label: 'Fordi butikkene slipper å gi tilbake veksel når prisen slutter på ,90', isCorrect: false, feedback: 'Praktiske vekselgrunner er en bieffekt, ikke årsaken til at ,90-prising påvirker kjøpsbeslutningen — det er hjernebearbeidingen som er årsaken.' },
        ],
        espenTip: 'Venstre siffer-effekten er en av de mest robuste funnene i forbrukerpsykologi — den fungerer på tvers av kulturer og aldersgrupper.',
      },
      {
        id: 'pr-3-2',
        icon: '🏷️',
        title: 'Ankerprising',
        question: 'En nettbutikk viser: "Var 1 299 kr, nå 599 kr". Hva er hensikten med å vise den opprinnelige prisen?',
        choices: [
          { id: 'a', label: 'Det er lovpålagt å vise original pris ved salg', isCorrect: false, feedback: 'Loven krever at originalprisen har vært reell og brukt i 30 dager — det er ikke en generell opplysningsplikt om hva prisen var.' },
          { id: 'b', label: 'Den høye opprinnelige prisen fungerer som anker og gjør 599 kr virke som et godt kjøp', isCorrect: true, feedback: 'Riktig! Ankerprising bruker en høy referansepris til å gjøre den faktiske prisen virke rimelig — hjernen sammenligner automatisk mot ankeret.' },
          { id: 'c', label: 'Det advarer kunden mot at produktet har hatt problemer', isCorrect: false, feedback: 'En lavere pris signaliserer ikke produktfeil — det er en salgsstimulerende teknikk, ikke en advarsel.' },
          { id: 'd', label: 'Det gjør det lettere for kunden å beregne besparelsen', isCorrect: false, feedback: 'Å hjelpe kunden beregne besparelse er en bieffekt — den primære psykologiske effekten er at ankeret gjør nåværende pris virke lavere.' },
        ],
        espenTip: 'Norsk lov krever at "fra"-prisen har vært reell i minst 30 dager — fiktive ankerprisere er ulovlig og kan gi bøter fra Forbrukertilsynet.',
      },
      {
        id: 'pr-3-3',
        icon: '📦',
        title: 'Bundling-prising',
        question: 'McDonald tilbyr "Meny" der burger, pommes frites og drikke samlet koster 129 kr, mens kjøpt separat koster 145 kr. Hva er fordelen for McDonald med denne bundlingen?',
        choices: [
          { id: 'a', label: 'McDonald sparer penger ved å selge tre ting på én gang', isCorrect: false, feedback: 'McDonald tjener faktisk litt mindre per bundle enn per enkeltprodukt — fordelen er økt totalomsetning og høyere snittkvittering per kunde.' },
          { id: 'b', label: 'Kunder kjøper mer produkter enn de hadde planlagt, noe som øker totalomsetningen', isCorrect: true, feedback: 'Riktig! Bundling får kunder til å kjøpe tilleggsprodukter de kanskje ikke hadde kjøpt alene — totalomsetningen øker selv om marginen per produkt er litt lavere.' },
          { id: 'c', label: 'Det er lovpålagt å tilby menyer i restaurantnæringen', isCorrect: false, feedback: 'Det er ikke noe lovkrav om å tilby bundles — det er en strategisk prisbeslutning.' },
          { id: 'd', label: 'Kunder husker bundle-prisen fremfor enkeltprisene, noe som skaper prissensitivitet', isCorrect: false, feedback: 'Bundling reduserer faktisk prissensitivitet ved å gjøre direkte prissammenligning vanskeligere — det er en fordel, ikke en ulempe.' },
        ],
        espenTip: 'Bundling brukes for å øke gjennomsnittlig transaksjonsstørrelse — det er derfor "Vil du ha pommes til det?" er et system, ikke en tilfeldig spørsmål.',
      },
      {
        id: 'pr-3-4',
        icon: '🔢',
        title: 'Desimalfjerning',
        question: 'En butikk prissetter lommebøker til "399" i stedet for "399,00 kr". Hva er den psykologiske effekten?',
        choices: [
          { id: 'a', label: 'Det gjør det vanskelige å sammenligne priser', isCorrect: false, feedback: 'Sammenlignbarhet påvirkes lite av desimaler — effekten er at prisen ser enklere og lavere ut uten unødvendig informasjon.' },
          { id: 'b', label: 'Prisen ser renere og lavere ut uten de unødvendige nullene', isCorrect: true, feedback: 'Riktig! Desimalfjerning gjør prisen visuelt enklere og oppleves som lavere — "399,00 kr" ser mer ut som en stor sum enn bare "399".' },
          { id: 'c', label: 'Det er et juridisk krav for prismerking av klær og aksessoarer', isCorrect: false, feedback: 'Det finnes ingen spesifikk lov om desimalvisning i priser — det er et markedsstrategisk valg.' },
          { id: 'd', label: 'Uten desimaler kan kunden ikke beregne merverdiavgiften', isCorrect: false, feedback: 'MVA-beregning gjøres fra prisen uansett — desimalvisning er irrelevant for avgiftsberegning.' },
        ],
        espenTip: 'Premium-butikker (Hermès, Chanel) bruker gjerne "3 500" uten ",00" fordi det fremstår som en rund, sikker pris — ikke en "salgs"-pris.',
      },
      {
        id: 'pr-3-5',
        icon: '⚠️',
        title: 'Etikk i psykologisk prising',
        question: 'En nettbutikk viser "kun 3 stykk igjen!" selv om de har 500 enheter på lager. Dette er et eksempel på:',
        choices: [
          { id: 'a', label: 'Lovlig psykologisk prising som alle nettbutikker bruker', isCorrect: false, feedback: 'Å påstå kunstig knapphet som ikke er reell er villedende markedsføring — det er ikke en lovlig praksis etter Markedsføringsloven.' },
          { id: 'b', label: 'Villedende markedsføring som bryter Markedsføringsloven', isCorrect: true, feedback: 'Riktig! Falsk knapphetssignalering er villedende markedsføring — det bryter Markedsføringsloven fordi det skaper et falskt inntrykk for å påvirke kjøpsbeslutningen.' },
          { id: 'c', label: 'En lovlig teknikk fordi kunden alltid kan sjekke varelageret selv', isCorrect: false, feedback: 'Kunden kan ikke sjekke varelageret — og nettopp derfor er det villedende å lyve om knapphet for å skape kunstig hastverk.' },
          { id: 'd', label: 'Nøytral informasjon om lagerstatus', isCorrect: false, feedback: 'Det er ikke nøytral informasjon — det er bevisst feil informasjon designet for å skape hastverk. Når lagerstatus er falsk, er det villedende.' },
        ],
        espenTip: 'Psykologisk prising er lovlig og vanlig — men kunstig knapphet, falske priser og villedende sammenligninger er ulovlig etter norsk lov.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📊',
    title: 'Dekningsbidrag og break-even',
    quote: 'Vet du ikke break-even-punktet ditt, vet du ikke om du tjener penger',
    practical:
      'Dekningsbidrag per enhet = Salgspris − Variable kostnader. Break-even = Faste kostnader ÷ Dekningsbidrag. Eks: Salgspris 200 kr, variable kostnader 80 kr, faste kostnader 36 000 kr → DB = 120 kr → Break-even = 300 enheter.',
    exercises: [
      {
        id: 'pr-4-1',
        icon: '📊',
        title: 'Beregning av dekningsbidrag',
        question: 'Et produkt selges for 350 kr. Variable kostnader per enhet er 140 kr. Hva er dekningsbidraget per enhet?',
        choices: [
          { id: 'a', label: '490 kr', isCorrect: false, feedback: 'Du har lagt sammen i stedet for å trekke fra — dekningsbidrag er salgspris MINUS variable kostnader: 350 − 140 = 210 kr.' },
          { id: 'b', label: '210 kr', isCorrect: true, feedback: 'Riktig! Dekningsbidrag per enhet = Salgspris − Variable kostnader = 350 − 140 = 210 kr.' },
          { id: 'c', label: '140 kr', isCorrect: false, feedback: 'Dette er de variable kostnadene, ikke dekningsbidraget — DB = Salgspris (350) − Variable kostnader (140) = 210 kr.' },
          { id: 'd', label: '350 kr', isCorrect: false, feedback: 'Dette er salgsprisen alene — dekningsbidraget er hva som gjenstår etter at variable kostnader er trukket fra: 350 − 140 = 210 kr.' },
        ],
        espenTip: 'Huskeregel: Dekningsbidrag = hva som er igjen til å dekke faste kostnader og gi fortjeneste, etter at du har betalt for det variable ved produksjonen.',
      },
      {
        id: 'pr-4-2',
        icon: '🏭',
        title: 'Break-even beregning',
        question: 'En bedrift har faste kostnader på 60 000 kr per måned og et dekningsbidrag per enhet på 150 kr. Hva er break-even-antallet?',
        choices: [
          { id: 'a', label: '9 000 000 enheter', isCorrect: false, feedback: 'Du har multiplisert i stedet for å dividere — Break-even = Faste kostnader ÷ DB per enhet = 60 000 ÷ 150 = 400 enheter.' },
          { id: 'b', label: '400 enheter', isCorrect: true, feedback: 'Riktig! Break-even = Faste kostnader ÷ DB per enhet = 60 000 ÷ 150 = 400 enheter.' },
          { id: 'c', label: '150 enheter', isCorrect: false, feedback: 'Dette er DB per enhet, ikke break-even antallet. Break-even = 60 000 ÷ 150 = 400 enheter.' },
          { id: 'd', label: '600 enheter', isCorrect: false, feedback: 'Kontroller beregningen: Break-even = Faste kostnader (60 000) ÷ DB per enhet (150) = 400, ikke 600.' },
        ],
        espenTip: 'Break-even forteller deg det minimale antallet du må selge for å ikke tape penger — alt over break-even er fortjeneste.',
      },
      {
        id: 'pr-4-3',
        icon: '💡',
        title: 'Hva er faste vs variable kostnader?',
        question: 'Hvilken av disse kostnadene er en variabel kostnad for en brødbakeri?',
        choices: [
          { id: 'a', label: 'Husleie for lokalet', isCorrect: false, feedback: 'Husleien er en fast kostnad — den betales uavhengig av om bakeriet baker 10 eller 1 000 brød per dag.' },
          { id: 'b', label: 'Lønnen til den faste daglig leder', isCorrect: false, feedback: 'Fast lønn til fast ansatte er en fast kostnad — den endres ikke med produksjonsvolumet.' },
          { id: 'c', label: 'Mel og ingredienser per brød', isCorrect: true, feedback: 'Riktig! Mel og ingredienser er variable kostnader — de øker direkte proporsjonalt med antall brød som produseres.' },
          { id: 'd', label: 'Avskrivning på ovnen', isCorrect: false, feedback: 'Avskrivning fordeles jevnt over tid uavhengig av produksjonsvolum — det er en fast kostnad.' },
        ],
        espenTip: 'Variable kostnader følger produksjonen — mer produksjon betyr høyere totale variable kostnader, men DB per enhet er stabil.',
      },
      {
        id: 'pr-4-4',
        icon: '📈',
        title: 'Break-even og prisendring',
        question: 'En bedrift har break-even på 500 enheter. Hvis de øker salgsprisen med 20 kr per enhet (variable kostnader er uendret), hva skjer med break-even?',
        choices: [
          { id: 'a', label: 'Break-even øker fordi prisen er høyere', isCorrect: false, feedback: 'Høyere pris gir høyere DB per enhet — da trenger du selge færre enheter for å dekke de faste kostnadene, altså synker break-even.' },
          { id: 'b', label: 'Break-even synker fordi DB per enhet øker', isCorrect: true, feedback: 'Riktig! Høyere salgspris gir høyere DB per enhet — break-even = Faste kostnader ÷ DB, så når DB øker, synker break-even-antallet.' },
          { id: 'c', label: 'Break-even forblir uendret fordi de faste kostnadene er de samme', isCorrect: false, feedback: 'Faste kostnader er uendret, men DB per enhet øker — break-even endres fordi teller er lik men nevner er høyere.' },
          { id: 'd', label: 'Break-even kan ikke beregnes uten å vite de variable kostnadene', isCorrect: false, feedback: 'De variable kostnadene er gitt som uendret i spørsmålet — break-even kan beregnes, og synker med 20 kr/enhet i økt DB.' },
        ],
        espenTip: 'En liten prisøkning kan ha stor effekt på break-even — det er ett av argumentene for å bruke verdibasert prising fremfor kostbasert.',
      },
      {
        id: 'pr-4-5',
        icon: '🎯',
        title: 'Dekningsbidrag i praksis',
        question: 'En kafé selger kaffe for 45 kr. Kaffebønnene, melk og strøm koster 12 kr per kopp. Husleie og lønninger koster 80 000 kr per måned. Hvor mange kopper kaffe per måned er break-even?',
        choices: [
          { id: 'a', label: '1 778 kopper', isCorrect: false, feedback: 'Sjekk beregningen: DB = 45 − 12 = 33 kr. Break-even = 80 000 ÷ 33 ≈ 2 424 kopper.' },
          { id: 'b', label: '2 424 kopper', isCorrect: true, feedback: 'Riktig! DB per kopp = 45 − 12 = 33 kr. Break-even = 80 000 ÷ 33 ≈ 2 424 kopper per måned.' },
          { id: 'c', label: '6 667 kopper', isCorrect: false, feedback: 'Sjekk beregningen: 80 000 ÷ 12 = 6 667, men du brukte variable kostnader i stedet for DB. DB = 45 − 12 = 33 kr. Break-even = 80 000 ÷ 33 ≈ 2 424.' },
          { id: 'd', label: '80 000 kopper', isCorrect: false, feedback: 'Dette er de faste kostnadene i kroner, ikke break-even antallet. Break-even = 80 000 ÷ 33 (DB per kopp) ≈ 2 424 kopper.' },
        ],
        espenTip: 'For en kafé med 8 timers åpningstid og 30 dager i måneden betyr 2 424 kopper omtrent 10 kopper per time — et realistisk mål for en liten kafé.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '⚔️',
    title: 'Priser og konkurrenter',
    quote: 'En priskrig har ingen vinnere — bare de som overlever lengst',
    practical:
      'Priskrig: alle senker priser, alle taper marginer, ingen bygger lojalitet. Alternativ: differensiere på verdi i stedet for pris. Eksempel: KIWI svarte ikke på Lidls priskriger ved å matche alle priser — de fokuserte på kvalitet, bredde og lojalitetsprogrammet.',
    exercises: [
      {
        id: 'pr-5-1',
        icon: '⚔️',
        title: 'Priskrig-dynamikk',
        question: 'To bensinstasjoner på samme veikryss begynner å senke prisene for å ta hverandres kunder. Etter noen uker er begge ulønnsomme. Hva illustrerer dette?',
        choices: [
          { id: 'a', label: 'At priser alltid bør settes så lavt som mulig', isCorrect: false, feedback: 'Lave priser er ikke alltid en god strategi — i en priskrig ender alle med lave marginer og ingen bygger lojalitet.' },
          { id: 'b', label: 'At priskrig er en lose-lose-situasjon der alle parter taper', isCorrect: true, feedback: 'Riktig! Priskrig fører til at alle aktører taper margin uten å bygge varig konkurransefordel — det er klassisk "race to the bottom".' },
          { id: 'c', label: 'At den første som senker prisen alltid vinner', isCorrect: false, feedback: 'I en priskrig har ingen av aktørene noe godt utfall — den som "vinner" er den som overlever lengst, ikke den som senket prisen først.' },
          { id: 'd', label: 'At konkurrenter alltid bør ignoreres i prissettingen', isCorrect: false, feedback: 'Konkurrenter bør absolutt overvåkes — men å reagere med prisreduksjoner er ikke alltid riktig svar. Alternative differensieringsstrategier er bedre.' },
        ],
        espenTip: 'Priskrig er som å holde pusten under vann i konkurranse med noen andre — den som overlever lengst "vinner", men alle er svekket.',
      },
      {
        id: 'pr-5-2',
        icon: '🛒',
        title: 'KIWI vs Lidl',
        question: 'Da Lidl etablerte seg i Norge med svært lave priser, valgte KIWI å fokusere på kvalitet, bredde og lojalitetsprogrammet heller enn å matche alle Lidls priser. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', label: 'En feilvurdering fra KIWIs side — de burde ha matchet Lidls priser', isCorrect: false, feedback: 'Resultatet viser at KIWIs strategi var korrekt — de unngikk priskrig og differensierte seg på verdi, noe som bevarte marginer.' },
          { id: 'b', label: 'Differensiering på verdi fremfor pris som respons på konkurrentpress', isCorrect: true, feedback: 'Riktig! KIWI valgte å konkurrere på andre parametre enn pris — bredde, kvalitet og lojalitetsprogram — og unngikk dermed en ødeleggende priskrig.' },
          { id: 'c', label: 'Manglende evne til å redusere kostnader nok til å matche Lidl', isCorrect: false, feedback: 'Dette var et bevisst strategisk valg, ikke en manglende evne — KIWI hadde mulighet til å senke priser, men valgte en annen strategi.' },
          { id: 'd', label: 'En kortsiktig løsning som er uholdbar på lang sikt', isCorrect: false, feedback: 'KIWIs strategi har vist seg å være holdbar over lang tid — differensiering på verdi er en mer bærekraftig strategi enn priskrig.' },
        ],
        espenTip: 'Differensiering på verdi er nesten alltid bedre enn priskrig — den bevarer marginer og bygger lojalitet som er vanskelig for konkurrenter å kopiere.',
      },
      {
        id: 'pr-5-3',
        icon: '💎',
        title: 'Premiumposisjonering mot priskrig',
        question: 'Hva er den beste langsiktige strategien for en bedrift som møter press fra billigkonkurrenter?',
        choices: [
          { id: 'a', label: 'Alltid matche konkurrentenes priser for å beholde markedsandel', isCorrect: false, feedback: 'Å alltid matche priser fører til priskrig og marginerosjon — det er en kortsiktig strategi som svekker bedriften over tid.' },
          { id: 'b', label: 'Differensiere på kvalitet, service eller merkevare slik at prisen ikke er det viktigste', isCorrect: true, feedback: 'Riktig! Differensiering på verdi-parametre utover pris er den beste langsiktige strategien — det gjør prisen mindre sentral i kjøpsbeslutningen.' },
          { id: 'c', label: 'Forlate markedet og finne nye markeder uten konkurranse', isCorrect: false, feedback: 'Å forlate et marked ved konkurranse er sjelden riktig svar — differensiering er mer lønnsomt enn å lete etter markeder uten konkurranse.' },
          { id: 'd', label: 'Sette prisene høyere enn konkurrentene uten noen begrunnelse', isCorrect: false, feedback: 'Høyere pris uten differensiert verdi vil bare miste kunder — premiumprising krever et tydelig verdiforslag som rettferdiggjør prisforskjellen.' },
        ],
        espenTip: 'Sterk merkevare er det beste "forsvarssystemet" mot prispress — lojale kunder bytter ikke til billigkonkurrenten for noen få kroner.',
      },
      {
        id: 'pr-5-4',
        icon: '🌍',
        title: 'Priskrig i globale markeder',
        question: 'Kinesiske produsenter selger solcellepaneler til langt under europeisk produksjonskostnad, noe som har ødelagt mange europeiske produsenter. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', label: 'Verdibasert prising fra kinesiske produsenter', isCorrect: false, feedback: 'Dette er ikke verdibasert prising — de priser bevisst lavt for å ta markedsandeler, ikke basert på opplevd verdi.' },
          { id: 'b', label: 'Aggressiv penetrasjonsprising (noen mener dumping) som ødelegger konkurrenter', isCorrect: true, feedback: 'Riktig! Dette er en ekstrem form for penetrasjonsprising — og muligens dumping (prising under kostnad) — som systematisk ødelegger konkurrenter.' },
          { id: 'c', label: 'Psykologisk prising for å nå europeiske forbrukere', isCorrect: false, feedback: 'Psykologisk prising er en kommunikasjonsteknikk (999 kr vs 1000 kr) — dette er strategisk underprising på makronivå.' },
          { id: 'd', label: 'Konkurransebasert prising der alle tilpasser seg markedsprisen', isCorrect: false, feedback: 'Konkurransebasert prising forutsetter et velfungerende marked — her priser én aktør bevisst for å eliminere konkurrentene, ikke for å matche markedet.' },
        ],
        espenTip: 'EU har innført anti-dumping-toll på kinesiske solcellepaneler som svar — viser at priskrig kan løse seg på reguleringsnivå, ikke bare markedsnivå.',
      },
      {
        id: 'pr-5-5',
        icon: '📉',
        title: 'Prisendring og etterspørsel',
        question: 'En kaffebar øker prisen på kaffe fra 45 kr til 50 kr. Salget faller fra 200 til 180 kopper per dag. Hva skjedde med total omsetning?',
        choices: [
          { id: 'a', label: 'Omsetningen falt fra 9 000 til 9 000 kr — ingen endring', isCorrect: false, feedback: 'Før: 200 × 45 = 9 000 kr. Etter: 180 × 50 = 9 000 kr. Dette er faktisk riktig — omsetningen er uendret! Men les svaralternativene nøye.' },
          { id: 'b', label: 'Omsetningen økte fra 9 000 til 9 000 kr — ingen endring i dette tilfellet', isCorrect: true, feedback: 'Riktig! Før: 200 × 45 = 9 000 kr. Etter: 180 × 50 = 9 000 kr. Omsetningen er identisk — men DB per kopp økte, så lønnsomheten er bedret.' },
          { id: 'c', label: 'Omsetningen falt fra 9 000 til 8 100 kr', isCorrect: false, feedback: 'Beregn etter: 180 × 50 = 9 000 kr, ikke 8 100 kr. 8 100 ville vært 180 × 45 (gammel pris × ny mengde), men den nye prisen er 50 kr.' },
          { id: 'd', label: 'Omsetningen økte fra 9 000 til 10 000 kr', isCorrect: false, feedback: '180 × 50 = 9 000 kr, ikke 10 000 kr. Beregn: ny mengde × ny pris.' },
        ],
        espenTip: 'Prisøkning gir ikke alltid lavere omsetning — om volumtapet er lavt nok, kan omsetning og lønnsomhet faktisk øke.',
      },
    ],
  },
]

export default function PrisstrategierModule() {
  return (
    <DrawerModule
      moduleCode="MFI-PS"
      moduleTitle="Prisstrategier"
      moduleIcon="💰"
      storageKey="learning-mfi-prisstrategier"
      completeRoute="/learning/mfi/prisstrategier/complete"
      phases={PHASES}
      intro="Pris er det kraftigste verktøyet i markedsføringmiksen — og det mest undervurderte. Feil pris kan ødelegge et ellers godt produkt. Riktig pris kommuniserer verdi, posisjonerer merkevaren og avgjør lønnsomheten. Fra break-even til psykologisk prising: her er det du må vite."
      vissteduAt="En prisøkning på 1% gir i snitt 11% økning i driftsresultatet for en gjennomsnitts-bedrift — mer enn noen annen variabel i markedsføringmiksen."
      espenSier="Neste gang du ser 'Was 299 kr — Now 199 kr', tenk over om 299 kr-prisen noen gang var reell. Ankerprising er en av de mest brukte — og effektive — psykologiske pristeknikkene."
      presentationLink={{ route: '/learning/presentations/konkurransemidlene' }}
    />
  )
}
