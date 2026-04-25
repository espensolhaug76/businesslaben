        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🔗',
            title: 'Verdikjeden',
            quote: 'Fra råvare til kunde.',
            content: 'Verdikjeden: alle aktiviteter fra råvare til ferdig produkt i kundens hånd. Porters verdikjede-analyse identifiserer hvor verdien skapes — og hvor det kan effektiviseres. Hver etappe er mulighet for konkurransefortrinn.',
            subpoints: [
                  { label: 'HVOR VERDIEN SKAPES', text: 'Identifiser kjerneaktiviteter som faktisk skaper kundeverdi.' },
          { label: 'HVOR EFFEKTIVISERE', text: 'Hver etappe er mulighet for kostnadskutt eller forbedring.' },
            ],
            practical: 'Tegn verdikjeden for et produkt du kjenner — fra råvare til kunde.',
            exercises: [
            {
      id: 'ml210-1-1',
      icon: '🔗',
      title: 'Hva',
      question: 'Hva er verdikjeden?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'Bredere.' },
{ id: 'b', label: 'Alle aktiviteter fra råvare til ferdig produkt i kundens hånd', isCorrect: true, feedback: 'Riktig! Helhetlig analyseramme.' },
{ id: 'c', label: 'Bare produksjon', isCorrect: false, feedback: 'Smalt.' },
{ id: 'd', label: 'Bare logistikk', isCorrect: false, feedback: 'Smalt.' },
      ],
      espenTip: 'Porter introduserte begrepet i 1985. Fortsatt sentralt i strategisk analyse.',
    },
    {
      id: 'ml210-1-2',
      icon: '🔗',
      title: 'Bruk',
      question: 'Hvordan brukes verdikjede-analyse?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verktøy.' },
{ id: 'b', label: 'Identifisere hvor verdi skapes og hvor effektivisering er mulig', isCorrect: true, feedback: 'Riktig! Strategisk verktøy for konkurransefortrinn.' },
{ id: 'c', label: 'Erstatte regnskap', isCorrect: false, feedback: 'Komplementært.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Tesla har analysert hele verdikjeden — derfor lager de mye internt (batterier, programvare). Strategisk integrasjon.',
    },
    {
      id: 'ml210-1-3',
      icon: '🔗',
      title: 'Eksempel',
      question: 'Hvor i verdikjeden skaper IKEA verdi?',
      choices: [
        { id: 'a', label: 'Bare i butikken', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Design + flatpakke + selvbetjening + masseinnkjøp + logistikk', isCorrect: true, feedback: 'Riktig! Hele verdikjeden optimalisert.' },
{ id: 'c', label: 'Bare design', isCorrect: false, feedback: 'Bredere strategi.' },
{ id: 'd', label: 'Bare reklame', isCorrect: false, feedback: 'Sekundært.' },
      ],
      espenTip: 'IKEA-modellen er klassisk eksempel på verdikjede-innovasjon. Hver etappe utfordret tradisjonell møbelindustri.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🛣️',
            title: 'Kanalvalg og kontroll',
            quote: 'Direkte vs indirekte.',
            content: 'Direkte distribusjon: produsent selger rett til kunde (Tesla, Apple Store). Høy kontroll, lav rekkevidde. Indirekte: via mellomledd (Coca-Cola → REMA → kunde). Lav kontroll, høy rekkevidde. Trade-off mellom kontroll og rekkevidde. Velg basert på merkeposisjonering.',
            subpoints: [
                  { label: 'DIREKTE', text: 'Høy kontroll, lav rekkevidde — Tesla, Apple.' },
          { label: 'INDIREKTE', text: 'Lav kontroll, høy rekkevidde — Coca-Cola, P&G.' },
            ],
            practical: 'Hvilke produkter kjøper du direkte fra produsent? Hvilke via mellomledd?',
            exercises: [
            {
      id: 'ml210-2-1',
      icon: '🛣️',
      title: 'Direkte',
      question: 'Hva kjennetegner direkte distribusjon?',
      choices: [
        { id: 'a', label: 'Lav kontroll', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Høy kontroll over kundeopplevelse, men lavere rekkevidde', isCorrect: true, feedback: 'Riktig! Bytte: kontroll vs skala.' },
{ id: 'c', label: 'Bare for digitale produkter', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Tesla nektet å bruke bilforhandlere — endret hele bransjen. Direkte distribusjon som strategi.',
    },
    {
      id: 'ml210-2-2',
      icon: '🛣️',
      title: 'Indirekte',
      question: 'Hvorfor velger Coca-Cola indirekte?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Kunne ikke bygd millioner av direkte-kanaler — trenger eksisterende infrastruktur', isCorrect: true, feedback: 'Riktig! Skala krever mellomledd. Coca-Cola via butikker, restauranter overalt.' },
{ id: 'c', label: 'Bare for å spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Coca-Cola distribueres til over 200 land via tusenvis av distributører. Direkte ville vært umulig.',
    },
    {
      id: 'ml210-2-3',
      icon: '🛣️',
      title: 'Hybrid',
      question: 'Brukes hybrid?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Ofte — produsenten har egne flagskip-butikker + indirekte distribusjon for skala', isCorrect: true, feedback: 'Riktig! Beste av begge verdener. Apple har egne butikker + nettbutikker + butikker som forhandlere.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Brukes alle størrelser.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig.' },
      ],
      espenTip: 'Apple Stores: opplevelse og kontroll. Apple på norske mobiloperatører: skala. Hybrid-strategi.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '⚔️',
            title: 'Maktbalansen i kanalen',
            quote: 'Produsent vs detaljist.',
            content: 'Tidligere produsentdominans (TINE bestemte hvilke meieri-produkter butikken fikk). Nå kjededominans (NorgesGruppen, Coop, REMA dikterer pris og hyllemeter). EMV (egne merkevarer) gir kjedene ekstra makt. Detaljistmakt har omformet hele norsk dagligvare.',
            subpoints: [
                  { label: 'HISTORISK SKIFTE', text: 'Fra produsentdominans til kjededominans i mange bransjer.' },
          { label: 'EMV-EFFEKT', text: 'Kjedenes egne merker truer produsentmerker.' },
            ],
            practical: 'Hvem har mest makt i bransjen du kjenner — produsent eller detaljist? Hvorfor?',
            exercises: [
            {
      id: 'ml210-3-1',
      icon: '⚔️',
      title: 'Skift',
      question: 'Hva har skjedd med makten?',
      choices: [
        { id: 'a', label: 'Ingenting endret', isCorrect: false, feedback: 'Stort skift.' },
{ id: 'b', label: 'Fra produsenten til kjedene — særlig i dagligvare', isCorrect: true, feedback: 'Riktig! Konsolidering på detaljistsiden har endret balansen.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt fenomen.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt skift.' },
      ],
      espenTip: 'Wal-Mart har sterkere makt over P&G enn omvendt. Tilsvarende NorgesGruppen vs TINE i Norge.',
    },
    {
      id: 'ml210-3-2',
      icon: '⚔️',
      title: 'EMV',
      question: 'Hvordan gir EMV mer makt?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Kjedene kan true: \'Hvis du ikke senker pris, satser vi på vår egen versjon\'', isCorrect: true, feedback: 'Riktig! Konkret pressmiddel mot produsenter.' },
{ id: 'c', label: 'Bare estetikk', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig.' },
      ],
      espenTip: 'First Price-melk truer TINE-melk. Tine må enten kutte pris eller akseptere lavere markedsandel.',
    },
    {
      id: 'ml210-3-3',
      icon: '⚔️',
      title: 'Strategisk respons',
      question: 'Hva kan produsenter gjøre?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Strategisk feil.' },
{ id: 'b', label: 'Bygge sterk merkevare som forbrukere etterspør, innovere så EMV ikke kan kopiere', isCorrect: true, feedback: 'Riktig! Forsvar via differensiering.' },
{ id: 'c', label: 'Saksøke kjedene', isCorrect: false, feedback: 'Sjelden mulig.' },
{ id: 'd', label: 'Slutte å produsere', isCorrect: false, feedback: 'Urealistisk.' },
      ],
      espenTip: 'TINE har respondert med innovasjon — yoghurt-varianter, plantebaserte. EMV følger sjelden i innovasjon.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📊',
            title: 'Distribusjonsgrad',
            quote: 'Intensiv, selektiv, eksklusiv.',
            content: 'Strategisk valg: Intensiv (overalt — Coca-Cola, tyggegummi). Selektiv (utvalgte forhandlere — Levis, Apple). Eksklusiv (kun få utvalgte — Rolex, Tesla). Distribusjonsgraden må passe merkets posisjon. Premium krever begrenset distribusjon — overalt = ikke premium.',
            subpoints: [
                  { label: 'INTENSIV', text: 'Maksimal tilgjengelighet — for masseprodukter.' },
          { label: 'EKSKLUSIV', text: 'Begrenset distribusjon — for premium-merker.' },
            ],
            practical: 'Hvor distribusjons-intensivt er produkter du kjenner? Hvorfor?',
            exercises: [
            {
      id: 'ml210-4-1',
      icon: '📊',
      title: '3 grader',
      question: 'Hva er de 3 distribusjonsgradene?',
      choices: [
        { id: 'a', label: 'Stor, mellom, liten', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'b', label: 'Intensiv, selektiv, eksklusiv', isCorrect: true, feedback: 'Riktig! Strategiske valg basert på merkeposisjon.' },
{ id: 'c', label: 'Lokal, nasjonal, global', isCorrect: false, feedback: 'Annet ramme — geografisk.' },
{ id: 'd', label: 'Bare 2', isCorrect: false, feedback: 'For få.' },
      ],
      espenTip: 'Coca-Cola: intensiv. Apple: selektiv. Rolex: eksklusiv. Hver passer sin posisjon.',
    },
    {
      id: 'ml210-4-2',
      icon: '📊',
      title: 'Premium-paradoks',
      question: 'Hvorfor ikke distribuere premium overalt?',
      choices: [
        { id: 'a', label: 'For komplisert', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'b', label: 'Overalt = ikke premium. Eksklusivitet er del av merkevaren', isCorrect: true, feedback: 'Riktig! Tilgjengelighet og premium er motpoler.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'For dyrt', isCorrect: false, feedback: 'Sekundært.' },
      ],
      espenTip: 'Hermès vil ikke ha distribusjon overalt. Produktene mister sin eksklusivitet om alle kan kjøpe.',
    },
    {
      id: 'ml210-4-3',
      icon: '📊',
      title: 'Norsk eksempel',
      question: 'Hvor distribueres TINE?',
      choices: [
        { id: 'a', label: 'Bare i Oslo', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Intensiv — overalt i norske butikker, både dagligvare og bensinstasjoner', isCorrect: true, feedback: 'Riktig! Mat-produsenter trenger maks tilgjengelighet.' },
{ id: 'c', label: 'Bare i Coop', isCorrect: false, feedback: 'TINE er overalt.' },
{ id: 'd', label: 'Bare gjennom internett', isCorrect: false, feedback: 'Lite av norsk meieri-salg.' },
      ],
      espenTip: 'Massforbruk-produkter krever intensiv distribusjon. Tilgjengelighet = salg.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🔄',
            title: 'Supply Chain Management (SCM)',
            quote: 'Integrert styring.',
            content: 'SCM: integrert styring av hele forsyningskjeden — fra leverandør til sluttkunde. SAP, Oracle, Salesforce leverer SCM-systemer som sporer en vare gjennom 50 ledd og 5 land i sanntid. Effektiv SCM = lavere kostnader, færre lagre, raskere respons.',
            subpoints: [
                  { label: 'INTEGRERT', text: 'Hele kjeden — leverandør til kunde — som ett system.' },
          { label: 'DIGITALISERT', text: 'SAP, Oracle gir sanntids-oversikt over hele kjeden.' },
            ],
            practical: 'Hvordan tror du Apple sporer en iPhone-komponent fra fabrikk i Kina til butikk i Oslo?',
            exercises: [
            {
      id: 'ml210-5-1',
      icon: '🔄',
      title: 'Hva',
      question: 'Hva er SCM?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Integrert styring av hele forsyningskjeden — fra leverandør til kunde', isCorrect: true, feedback: 'Riktig! Helhetlig optimalisering, ikke siloer.' },
{ id: 'c', label: 'Bare regnskap', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Apple har en av verdens mest sofistikerte SCM-systemer. Tim Cook bygde det — derfor ble han CEO.',
    },
    {
      id: 'ml210-5-2',
      icon: '🔄',
      title: 'Verdi',
      question: 'Hva gir effektiv SCM?',
      choices: [
        { id: 'a', label: 'Bare lavere kostnader', isCorrect: false, feedback: 'Multi-dimensjonal verdi.' },
{ id: 'b', label: 'Lavere kostnader + færre lagre + raskere respons + bedre kundeopplevelse', isCorrect: true, feedback: 'Riktig! Strategisk fortrinn på flere dimensjoner.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Verdi i alle størrelser.' },
      ],
      espenTip: 'Walmart bygde sitt imperium på SCM. Lave priser muliggjort av effektiv forsyningskjede.',
    },
    {
      id: 'ml210-5-3',
      icon: '🔄',
      title: 'Verktøy',
      question: 'Hvilke verktøy brukes?',
      choices: [
        { id: 'a', label: 'Bare Excel', isCorrect: false, feedback: 'For begrenset.' },
{ id: 'b', label: 'SAP, Oracle, Salesforce — sanntids-systemer som integrerer hele kjeden', isCorrect: true, feedback: 'Riktig! Industristandarder. Investering i milliarder.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte systemer.' },
{ id: 'd', label: 'Bare papir', isCorrect: false, feedback: 'Foreldet.' },
      ],
      espenTip: 'Norske store bedrifter (Equinor, Hydro, Telenor) bruker alle SAP eller Oracle for SCM. Kostnad: hundretalls millioner per implementasjon.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🌐',
            title: 'Omnikanal',
            quote: 'Sømløs på tvers av kanaler.',
            content: 'Omnikanal: sømløs kundeopplevelse på tvers av alle plattformer. Kunden starter på Instagram, fortsetter på nettside, henter i butikk, returnerer via post. Krever integrert IT, lager og kundeservice. Multikanal (har flere kanaler) er ikke det samme som omnikanal (sømløs integrasjon).',
            subpoints: [
                  { label: 'SØMLØS', text: 'Bytter mellom kanaler uten å miste kontekst.' },
          { label: 'INTEGRERT BAK', text: 'Krever felles IT, lager, kundeservice — alt som ett system.' },
            ],
            practical: 'Hvilke bedrifter har god omnikanal-opplevelse? Hva gjør dem gode?',
            exercises: [
            {
      id: 'ml210-6-1',
      icon: '🌐',
      title: 'Definisjon',
      question: 'Hva er omnikanal?',
      choices: [
        { id: 'a', label: 'Mange kanaler', isCorrect: false, feedback: 'Det er multikanal — annet.' },
{ id: 'b', label: 'Sømløs integrasjon på tvers av alle kanaler', isCorrect: true, feedback: 'Riktig! Kunden merker ikke skillet — alt henger sammen.' },
{ id: 'c', label: 'Bare nettsalg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare butikk', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Apple er omnikanal: kjøp på app, henting i butikk, retur via post — sømløst i ett system.',
    },
    {
      id: 'ml210-6-2',
      icon: '🌐',
      title: 'Multikanal vs omnikanal',
      question: 'Hva er forskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Multikanal har flere kanaler; omnikanal integrerer dem til ett system', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare språkforskjell', isCorrect: false, feedback: 'Strategisk forskjell.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Mange bedrifter sier \'omnikanal\' men har bare multikanal — separate systemer per kanal.',
    },
    {
      id: 'ml210-6-3',
      icon: '🌐',
      title: 'Krav',
      question: 'Hva kreves for ekte omnikanal?',
      choices: [
        { id: 'a', label: 'Bare flere nettsider', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Integrert IT, felles lagerstyring, koordinert kundeservice', isCorrect: true, feedback: 'Riktig! Stor IT-investering. Tar år å bygge.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Konsekvens, ikke krav.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert investering.' },
      ],
      espenTip: 'Komplett.no har bygget sterk omnikanal — del av deres konkurransefortrinn.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🚛',
            title: 'Fysisk logistikk',
            quote: 'Effektivitet som fortrinn.',
            content: 'Effektivitet i logistikk er konkurransefortrinn. Amazons én-dagers-levering, IKEAs flatpakke, Zalandos gratis returrett — alle er logistikk-revolusjoner som har endret hva kundene forventer. Investering i logistikk skaper barrierer konkurrenter ikke kan overvinne.',
            subpoints: [
                  { label: 'FORVENTNINGS-DRIVER', text: 'Når én aktør hever standard, må alle følge etter.' },
          { label: 'BARRIERE', text: 'Logistikk-investering på milliarder skaper inngangsbarrierer.' },
            ],
            practical: 'Hvordan har Amazon endret dine forventninger til levering? Hva forventer du nå?',
            exercises: [
            {
      id: 'ml210-7-1',
      icon: '🚛',
      title: 'Amazon',
      question: 'Hva har Amazon brukt på logistikk?',
      choices: [
        { id: 'a', label: '10 millioner USD', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Over 100 milliarder USD over årene', isCorrect: true, feedback: 'Riktig! Massiv investering — bygger uovervinnelig konkurransefortrinn.' },
{ id: 'c', label: 'Bare 1 milliard', isCorrect: false, feedback: 'For lite.' },
{ id: 'd', label: 'Helt urelevant', isCorrect: false, feedback: 'Strategisk sentralt.' },
      ],
      espenTip: 'Amazons logistikk-network er nå større enn UPS i USA. Kjøper konkurrentene fly, lastebiler.',
    },
    {
      id: 'ml210-7-2',
      icon: '🚛',
      title: 'IKEA',
      question: 'Hva er IKEAs logistikk-innovasjon?',
      choices: [
        { id: 'a', label: 'Bare lave priser', isCorrect: false, feedback: 'Konsekvens.' },
{ id: 'b', label: 'Flatpakke — kunden tar med varen hjem, sparer logistikk', isCorrect: true, feedback: 'Riktig! Revolusjonerende. Kunden gjør del av jobben.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturell innovasjon.' },
{ id: 'd', label: 'Bare reklame', isCorrect: false, feedback: 'Sekundært.' },
      ],
      espenTip: 'IKEA-konseptet ble bygget rundt flatpakke fra start. Hele forretningsmodellen avhenger av det.',
    },
    {
      id: 'ml210-7-3',
      icon: '🚛',
      title: 'Forventning',
      question: 'Hva har skjedd med kundeforventninger?',
      choices: [
        { id: 'a', label: 'Uendret', isCorrect: false, feedback: 'Endret dramatisk.' },
{ id: 'b', label: 'Forventer hurtigere levering, gratis retur, sporing — Amazon har satt standard', isCorrect: true, feedback: 'Riktig! Andre må følge etter. Kostnaden faller på alle.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt fenomen.' },
{ id: 'd', label: 'Bare for unge', isCorrect: false, feedback: 'Alle aldre.' },
      ],
      espenTip: 'Norske nettbutikker må nå tilby raskere levering enn for 10 år siden. Amazon-effekten.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🌍',
            title: 'Internasjonal distribusjon',
            quote: 'Lange kjeder, mange land.',
            content: 'Eksport krever andre distribusjonsstrategier: agenter, importører, joint ventures, datterselskaper. Lange kjeder = høyere kostnader og mindre kontroll. Nye markeder krever ofte lokale partnere som forstår kultur, lover, forhandlingsskikker. Norske bedrifter (laksenæring, olje) har lang erfaring her.',
            subpoints: [
                  { label: 'FLERE LEDD', text: 'Internasjonal kjede typisk lengre enn nasjonal.' },
          { label: 'LOKAL EKSPERTISE', text: 'Lokale partnere forstår kultur og regulering bedre.' },
            ],
            practical: 'Hvordan distribueres norsk laks i Asia? Hvilke ledd?',
            exercises: [
            {
      id: 'ml210-8-1',
      icon: '🌍',
      title: 'Etableringsstrategier',
      question: 'Hva er typiske valg?',
      choices: [
        { id: 'a', label: 'Bare egen butikk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Eksport, agent, importør, joint venture, datterselskap', isCorrect: true, feedback: 'Riktig! Skala fra lavest til høyest engasjement.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare gjennom Amazon', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Strategi avhenger av marked-størrelse, ressurser, risikotoleranse, kunnskap om markedet.',
    },
    {
      id: 'ml210-8-2',
      icon: '🌍',
      title: 'Risiko',
      question: 'Hva er hovedrisiko ved lange kjeder?',
      choices: [
        { id: 'a', label: 'Ingen risiko', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'b', label: 'Mister kontroll over kundeopplevelse, høyere kostnader, lokale partnere kan svikte', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal risiko.' },
{ id: 'c', label: 'Bare juridisk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'H&M har strenge krav til leverandører globalt — bygget etter tidligere skandaler om barnearbeid.',
    },
    {
      id: 'ml210-8-3',
      icon: '🌍',
      title: 'Norsk eksempel',
      question: 'Hvordan distribueres norsk laks?',
      choices: [
        { id: 'a', label: 'Bare i Norge', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Globalt via agenter, importører — Mowi, Salmar har lange internasjonale kjeder', isCorrect: true, feedback: 'Riktig! Norge eksporterer 95 % av lakseproduksjonen. Kompleks distribusjon.' },
{ id: 'c', label: 'Bare via post', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Aldri eksportert', isCorrect: false, feedback: 'Helt feil — Norges største eksportvare etter olje.' },
      ],
      espenTip: 'Norsk laks i Tokyo: produsert i Frøya, fløyet til Tokyo, distribuert via lokale grossister, til restauranter. 4-5 ledd.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🏬',
            title: 'Beliggenhet',
            quote: 'Sted, sted, sted.',
            content: 'Fysiske butikker står og faller på beliggenhet. Makrobeliggenhet: hvilken by/bydel. Mikrobeliggenhet: hvilken side av gata, hvilken etasje i kjøpesenteret. Fra \'destination retail\' (folk kommer for deg) til \'foot traffic\' (du fanger forbipasserende). Beliggenhet er strategi.',
            subpoints: [
                  { label: 'MAKRO + MIKRO', text: 'By + nøyaktig plassering — begge teller.' },
          { label: 'DESTINATION vs TRAFFIC', text: 'Folk kommer for deg vs du fanger forbipasserende.' },
            ],
            practical: 'Hvilke butikker er bra plassert? Hva gjør plasseringen god?',
            exercises: [
            {
      id: 'ml210-9-1',
      icon: '🏬',
      title: 'Hvor viktig',
      question: 'Hvor viktig er beliggenhet?',
      choices: [
        { id: 'a', label: 'Lite', isCorrect: false, feedback: 'Tvert imot — kritisk.' },
{ id: 'b', label: 'Avgjørende — \'sted, sted, sted\' i fysisk handel', isCorrect: true, feedback: 'Riktig! Klassisk eiendomsmegler-mantra gjelder også butikk.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Apple Stores: alltid i premium-plasseringer. Bygger merkeverdi via beliggenhet.',
    },
    {
      id: 'ml210-9-2',
      icon: '🏬',
      title: 'Destination',
      question: 'Hva er destination retail?',
      choices: [
        { id: 'a', label: 'Bare flyplasser', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Folk kommer spesielt for å handle hos deg — krever sterkt merke', isCorrect: true, feedback: 'Riktig! IKEA er destination — folk planlegger besøk.' },
{ id: 'c', label: 'Bare i sentrum', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'IKEA kan plassere seg utenfor by-sentre — folk kjører for å handle. Lavere leie, høyere lønnsomhet.',
    },
    {
      id: 'ml210-9-3',
      icon: '🏬',
      title: 'Mikro',
      question: 'Hva betyr mikrobeliggenhet?',
      choices: [
        { id: 'a', label: 'Bare landet', isCorrect: false, feedback: 'Det er makro.' },
{ id: 'b', label: 'Eksakt sted: side av gata, etasje, hjørne', isCorrect: true, feedback: 'Riktig! Detaljnivå som kan avgjøre suksess vs fiasko.' },
{ id: 'c', label: 'Bare nettside', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturell vurdering.' },
      ],
      espenTip: 'Studier viser at solside vs skyggeside av gata kan gi 30 % forskjell i fottrafikk. Mikrobeliggenhet er alvor.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📲',
            title: 'Plattformøkonomi',
            quote: 'Disrupsjon av tradisjonelle kjeder.',
            content: 'Plattformer (Amazon, Uber, Airbnb, Vinted) disrupter tradisjonelle distribusjonskanaler. Bryter ned mellomledd ved å koble produsent direkte med forbruker. Endrer maktbalansen. Norske eksempler: Finn.no (eiendom), Vipps (betaling), kolonial.no (mat). Ikke alle bransjer er like sårbare.',
            subpoints: [
                  { label: 'DISRUPSJON', text: 'Plattformer fjerner tradisjonelle mellomledd.' },
          { label: 'NETTVERKSEFFEKT', text: 'Verdi øker med antall brukere — vinneren tar alt.' },
            ],
            practical: 'Hvilke bransjer har du sett plattformer disrupte? Hvilke er fortsatt tradisjonelle?',
            exercises: [
            {
      id: 'ml210-10-1',
      icon: '📲',
      title: 'Hva',
      question: 'Hva er plattformøkonomi?',
      choices: [
        { id: 'a', label: 'Bare sosiale medier', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Digitale plattformer som kobler tilbydere og brukere — disrupterer tradisjonelle mellomledd', isCorrect: true, feedback: 'Riktig! Strukturell endring i mange bransjer.' },
{ id: 'c', label: 'Bare for finans', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt fenomen.' },
      ],
      espenTip: 'Uber: kobler sjåfører og passasjerer. Airbnb: koblet utleiere og leietakere. Plattform-modellen er overalt nå.',
    },
    {
      id: 'ml210-10-2',
      icon: '📲',
      title: 'Nettverkseffekt',
      question: 'Hva er nettverkseffekten?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt fenomen.' },
{ id: 'b', label: 'Verdien av plattformen øker med antall brukere', isCorrect: true, feedback: 'Riktig! Vipps blir mer verdifull jo flere som har den.' },
{ id: 'c', label: 'Bare for telekom', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Klassisk: telefon. Én telefon = verdiløs. Mange telefoner = uunnværlig. Vinner-tar-alt-dynamikk.',
    },
    {
      id: 'ml210-10-3',
      icon: '📲',
      title: 'Norske eksempler',
      question: 'Hvilke norske plattformer kjenner du?',
      choices: [
        { id: 'a', label: 'Bare amerikanske', isCorrect: false, feedback: 'Norge har egne.' },
{ id: 'b', label: 'Finn.no, Vipps, Kolonial.no, Schibsted — alle plattformer', isCorrect: true, feedback: 'Riktig! Norge har sterke nasjonale plattformer som har stått imot global konkurranse.' },
{ id: 'c', label: 'Bare Vipps', isCorrect: false, feedback: 'Flere.' },
{ id: 'd', label: 'Ingen norske', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Finn.no har 80 %+ av norsk eiendomsmarkedsplass. Vinner-tar-alt-dynamikk i Norge.',
    },
            ],
          },
        ]

        export default function DistribusjonsstrategiAvansertModule() {
          return (
            <DrawerModule
              moduleCode="ML2-10"
              moduleTitle="Distribusjonsstrategier (avansert)"
              moduleIcon="🚚"
              storageKey="learning-ml2-distribusjonsstrategi-avansert"
              completeRoute="/learning/ml2/distribusjonsstrategi-avansert/complete"
              phases={phases}
              intro="Distribusjon handler om å vinne kampen om hylleplassen og kundens tid. Fra tradisjonell verdikjede til omnikanal og plattformøkonomi — strukturen har endret seg dramatisk."
              vissteduAt="Amazon brukte over 100 milliarder USD på logistikk for å bygge én-dagers-levering. Det er en uoverkommelig barriere for konkurrenter — strategisk distribusjon som konkurransefortrinn."
              espenSier="Distribusjon er ofte usynlig for kunden, men avgjørende for bedriften. Beste produkt + dårlig distribusjon = ingen salg."
      presentationLink={{ route: '/learning/presentations/ml2/distribusjonsstrategi-avansert', description: 'Distribusjonsstrategier (avansert) — 10 slides' }}
            />
          )
        }
