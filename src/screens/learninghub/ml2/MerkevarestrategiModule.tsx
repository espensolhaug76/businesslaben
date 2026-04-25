        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '⭐',
            title: 'Brand Equity',
            quote: 'Verdien av navnet.',
            content: 'Brand Equity er den ekstra verdien navnet tilfører produktet. To identiske t-skjorter — den ene med Lacoste-logo koster 1500 kr, den andre fra No Brand 200 kr. Forskjellen er ren merkevare.',
            subpoints: [
                  { label: 'VERDI UTOVER PRODUKT', text: 'Hva navnet tilfører på toppen av selve varen.' },
          { label: 'MÅLBART', text: 'Brand valuation gir konkrete tall — Apple, Google, Microsoft topper.' },
            ],
            practical: 'Hvilke merker betaler du premium for? Hva er du villig til å betale ekstra for navnet?',
            exercises: [
            {
      id: 'ml207-1-1',
      icon: '⭐',
      title: 'Definisjon',
      question: 'Hva er Brand Equity?',
      choices: [
        { id: 'a', label: 'Bedriftens egenkapital', isCorrect: false, feedback: 'Helt feil — brand vs balance sheet.' },
{ id: 'b', label: 'Den ekstra verdien navnet tilfører produktet utover det fysiske', isCorrect: true, feedback: 'Riktig! Premium kunden er villig til å betale fordi det er navnet.' },
{ id: 'c', label: 'Antall ansatte', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Reklamebudsjett', isCorrect: false, feedback: 'Det er kostnad, ikke verdi.' },
      ],
      espenTip: 'Top 5 globalt: Apple, Microsoft, Amazon, Google, Samsung. Verdier i hundrevis av milliarder USD.',
    },
    {
      id: 'ml207-1-2',
      icon: '⭐',
      title: 'Måling',
      question: 'Kan brand equity måles?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Tvert imot — flere metoder.' },
{ id: 'b', label: 'Ja — Interbrand, BrandZ, Brand Finance gir årlige rangeringer', isCorrect: true, feedback: 'Riktig! Tre store rangeringer publiseres årlig.' },
{ id: 'c', label: 'Bare av eier', isCorrect: false, feedback: 'Eksternt validert.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Global metode.' },
      ],
      espenTip: 'Norsk merkevaresterkest: Equinor, DnB, Telenor — basert på kjennskap, kvalitet, lojalitet, foretrukning.',
    },
    {
      id: 'ml207-1-3',
      icon: '⭐',
      title: 'Effekt',
      question: 'Hva gir sterk brand equity?',
      choices: [
        { id: 'a', label: 'Lavere lønnsomhet', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Pricing-makt, lojalitet, motstandskraft, lavere kapitalkostnad', isCorrect: true, feedback: 'Riktig! Multipel verdi. Strategisk fortrinn.' },
{ id: 'c', label: 'Helt urelevant', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare reklamefordel', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Apple-eksempel: 30-50 % premium over teknisk likeverdige produkter. Brand equity i kontanter.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🏗️',
            title: 'Aakers merkevaremodell',
            quote: '4 pilarer.',
            content: 'David Aaker definerte fire pilarer i merkebygging: Kjennskap (kjenner kundene merket?), Kvalitetsoppfatning (er det godt?), Assosiasjoner (hva tenker man på?), Lojalitet (kommer kunden tilbake?). Mål hver pilar, jobb med svakeste først.',
            subpoints: [
                  { label: '4 PILARER', text: 'Kjennskap, kvalitet, assosiasjoner, lojalitet.' },
          { label: 'MÅL HVER', text: 'Brand tracking-undersøkelser måler regelmessig.' },
            ],
            practical: 'Velg et merke. Vurder hver av Aakers 4 pilarer — hvilken er sterkest? Hvilken er svakest?',
            exercises: [
            {
      id: 'ml207-2-1',
      icon: '🏗️',
      title: '4 pilarer',
      question: 'Hva er Aakers 4 pilarer?',
      choices: [
        { id: 'a', label: 'Pris, produkt, plass, promo', isCorrect: false, feedback: 'Det er markedsmiks.' },
{ id: 'b', label: 'Kjennskap, kvalitetsoppfatning, assosiasjoner, lojalitet', isCorrect: true, feedback: 'Riktig! Bygger systematisk forståelse av merkets helse.' },
{ id: 'c', label: 'Bredde, dybde, høyde, volum', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Mål, strategi, tiltak, kontroll', isCorrect: false, feedback: 'Helt feil ramme.' },
      ],
      espenTip: 'Modellen er fra 1991, fortsatt dominerende i merkebygging.',
    },
    {
      id: 'ml207-2-2',
      icon: '🏗️',
      title: 'Bruk',
      question: 'Hvordan brukes modellen?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verktøy.' },
{ id: 'b', label: 'Mål hver pilar, identifiser svakeste, prioriter tiltak der', isCorrect: true, feedback: 'Riktig! Datadrevet merkebygging. Brand tracking-undersøkelser standard.' },
{ id: 'c', label: 'Bare i akademia', isCorrect: false, feedback: 'Mye praktisk bruk.' },
{ id: 'd', label: 'Erstatte SWOT', isCorrect: false, feedback: 'Komplementært verktøy.' },
      ],
      espenTip: 'Norske bedrifter bruker dette: Equinor, DnB gjør årlig brand tracking på alle 4 pilarer.',
    },
    {
      id: 'ml207-2-3',
      icon: '🏗️',
      title: 'Lojalitet',
      question: 'Hva er lojalitet?',
      choices: [
        { id: 'a', label: 'Bare gjenkjøp', isCorrect: false, feedback: 'For smalt — også preferanse.' },
{ id: 'b', label: 'Gjenkjøp + preferanse + tilgivelse for feil + henvisning av andre', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal lojalitet. Sterk lojalitet = motstandsdyktighet.' },
{ id: 'c', label: 'Bare for ansatte', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig kjøp', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'NPS (Net Promoter Score) måler henvisning-villighet. Fra 0-10. Score over 50 er fremragende.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '☂️',
            title: 'Paraply vs individuelle merker',
            quote: 'Strategisk valg.',
            content: 'Paraplymerke (Apple, Samsung) bruker samme navn på alle produkter — billig markedsføring, men én skandale rammer alt. Individuelle merker (P&G med Pampers, Tide, Gillette) gir fleksibilitet men koster mer. Hybrid er vanlig (Toyota + Lexus).',
            subpoints: [
                  { label: 'PARAPLY', text: 'Felles navn = billig + risiko (én skandale rammer alt).' },
          { label: 'INDIVIDUELL', text: 'Egne navn = dyrt + fleksibilitet (segmentere kunder).' },
            ],
            practical: 'Hvilken strategi bruker bedrifter du kjenner? Apple er paraply. Hva med Marabou (paraply) vs P&G (individuell)?',
            exercises: [
            {
      id: 'ml207-3-1',
      icon: '☂️',
      title: 'Forskjell',
      question: 'Hva er hovedforskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Paraply = ett navn for alt; individuelle = egne navn per produktgruppe', isCorrect: true, feedback: 'Riktig! Strategisk valg med store implikasjoner.' },
{ id: 'c', label: 'Paraply er for premium, individuell for lavpris', isCorrect: false, feedback: 'Begge brukes overalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Hyundai (paraply for biler) men Genesis er individuelt premium-merke. Hybrid-tilnærming.',
    },
    {
      id: 'ml207-3-2',
      icon: '☂️',
      title: 'Risiko',
      question: 'Hva er risiko ved paraply?',
      choices: [
        { id: 'a', label: 'Ingen risiko', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'b', label: 'Én skandale rammer alle produkter — som Volkswagen i Dieselgate', isCorrect: true, feedback: 'Riktig! Konsentrert risiko. Hele merkevaren skades samtidig.' },
{ id: 'c', label: 'For mye spesialisering', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'For lite reklame', isCorrect: false, feedback: 'Ikke relevant.' },
      ],
      espenTip: 'VW Dieselgate skadet hele Volkswagen-merket inkludert Audi, Skoda — alle paraply-produkter rammet.',
    },
    {
      id: 'ml207-3-3',
      icon: '☂️',
      title: 'P&G',
      question: 'Hvorfor velger P&G individuelle merker?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'b', label: 'Segmentere ulike kundetyper, redusere risiko, prøve produkter uten å skade andre merker', isCorrect: true, feedback: 'Riktig! Klassisk individuell-merke-strategi. Stor portefølje uten konsolidering.' },
{ id: 'c', label: 'Bare for å forvirre', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'P&G har Pampers, Tide, Gillette, Crest, Pantene — alle distinkte. Lar dem teste produkter uten risiko for kjernemerker.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🌐',
            title: 'Merkeutvidelse',
            quote: 'Bruke kjent navn i ny kategori.',
            content: 'Merkeutvidelse: Caterpillar (gravemaskiner) lager også Caterpillar-arbeidssko. Apple gikk fra datamaskiner til musikk (iPod), telefoner (iPhone), klokker. Suksess avhenger av at assosiasjonene \'passer\' den nye kategorien. Mislykkede: Colgate frosne måltider.',
            subpoints: [
                  { label: 'OVERFØRER ASSOSIASJONER', text: 'Caterpillar = robust → robuste sko, OK overføring.' },
          { label: 'RISIKO', text: 'Mislykket utvidelse kan skade kjernemerket.' },
            ],
            practical: 'Hvilke vellykkede merkeutvidelser har du sett? Hvilke mislykkede?',
            exercises: [
            {
      id: 'ml207-4-1',
      icon: '🌐',
      title: 'Hva er det',
      question: 'Hva er merkeutvidelse?',
      choices: [
        { id: 'a', label: 'Bytte navn', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Bruke kjent merkenavn i ny kategori', isCorrect: true, feedback: 'Riktig! Klassisk strategi. Apple = master.' },
{ id: 'c', label: 'Bare i markedsføring', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Lavest-risiko vekststrategi for sterke merker. Bygger på eksisterende kjennskap.',
    },
    {
      id: 'ml207-4-2',
      icon: '🌐',
      title: 'Suksess-faktor',
      question: 'Hva avgjør suksess?',
      choices: [
        { id: 'a', label: 'Pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Om assosiasjonene \'passer\' den nye kategorien', isCorrect: true, feedback: 'Riktig! Caterpillar = robust passer sko. Colgate = tannkrem passer ikke frosne måltider.' },
{ id: 'c', label: 'Reklamebudsjett', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Tilfeldighet', isCorrect: false, feedback: 'Strukturelle drivere.' },
      ],
      espenTip: 'Test: hvilke assosiasjoner har merket? Passer de naturlig til ny kategori?',
    },
    {
      id: 'ml207-4-3',
      icon: '🌐',
      title: 'Mislykket eksempel',
      question: 'Hvorfor feilet Colgate frosne måltider?',
      choices: [
        { id: 'a', label: 'Smakte dårlig', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Colgate = tannkrem-frisk smak. Kunder kunne ikke koble assosiasjoner til frosne måltider', isCorrect: true, feedback: 'Riktig! Mismatch i assosiasjoner. Klassisk eksempel på mislykket utvidelse.' },
{ id: 'c', label: 'For dyrt', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturell feil.' },
      ],
      espenTip: 'Lærdom: bare fordi merket er sterkt, betyr ikke at det passer alle kategorier.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '👤',
            title: 'Merkets personlighet',
            quote: 'Menneskelige egenskaper.',
            content: 'Merker får menneskelige egenskaper kunden kan relatere til. Volvo = ansvarlig, trygg. Harley-Davidson = opprørsk, fri. Apple = kreativ, smart. IKEA = praktisk, nordisk. Personlighet bygger emosjonell kobling utover ren funksjon.',
            subpoints: [
                  { label: 'MENNESKELIGE TREKK', text: 'Pålitelig, kreativ, kul, opprørsk — merker får disse.' },
          { label: 'EMOSJONELL KOBLING', text: 'Personlighet skaper bånd ut over funksjon.' },
            ],
            practical: 'Beskriv personligheten til 3 merker du kjenner. Volvo, Apple, REMA 1000 — hva er personlighet?',
            exercises: [
            {
      id: 'ml207-5-1',
      icon: '👤',
      title: 'Konsept',
      question: 'Hva betyr \'merkets personlighet\'?',
      choices: [
        { id: 'a', label: 'Eierens personlighet', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Menneskelige egenskaper kunden kobler til merket', isCorrect: true, feedback: 'Riktig! Selv om merker ikke er mennesker, oppfattes de som om de hadde personlighet.' },
{ id: 'c', label: 'Bare reklamefigur', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Logo-design', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Aaker definerte 5 dimensjoner: Sincerity, Excitement, Competence, Sophistication, Ruggedness.',
    },
    {
      id: 'ml207-5-2',
      icon: '👤',
      title: 'Volvo eksempel',
      question: 'Hva er Volvos personlighet?',
      choices: [
        { id: 'a', label: 'Aggressiv, vill', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Ansvarlig, trygg, familievennlig', isCorrect: true, feedback: 'Riktig! Volvo = sikkerhet er kjernepersonlighet bygget over tiår.' },
{ id: 'c', label: 'Luksuriøs, eksklusiv', isCorrect: false, feedback: 'Det er Mercedes/Audi.' },
{ id: 'd', label: 'Sport, hastighet', isCorrect: false, feedback: 'Det er Porsche.' },
      ],
      espenTip: 'Personlighet er konsistent over tid. Volvo har holdt \'sikkerhet\' som kjerne i 50+ år.',
    },
    {
      id: 'ml207-5-3',
      icon: '👤',
      title: 'Strategisk verdi',
      question: 'Hvorfor er personlighet viktig?',
      choices: [
        { id: 'a', label: 'Bare estetikk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Skaper emosjonell kobling — kunder kjøper merker som matcher selvbildet', isCorrect: true, feedback: 'Riktig! Vi kjøper merker som reflekterer hvem vi er eller vil være.' },
{ id: 'c', label: 'Lavere pris', isCorrect: false, feedback: 'Tvert imot — sterk personlighet gir premium.' },
{ id: 'd', label: 'Flere ansatte', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Harley-Davidson kjøpere er ofte langt fra opprørske livsmønstre — men kjøper opprøret som identitet.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🏷️',
            title: 'Private merker (EMV)',
            quote: 'Egne merkevarer fra detaljister.',
            content: 'Private Labels / EMV (Egne Merkevarer): First Price (NorgesGruppen), Coop X-tra, REMA Mer. Truer produsentmerker fordi prisen er lavere — men kvaliteten ofte sammenlignbar. Norske kjeder produserer 30-40 % av varene under egne merker. Strategisk pressmiddel mot leverandører.',
            subpoints: [
                  { label: 'KJEDENES EGNE', text: 'First Price, X-tra, Mer — produseres ofte av samme fabrikker som A-merker.' },
          { label: 'PRESSMIDDEL', text: 'EMV gir kjedene forhandlingsmakt mot produsentene.' },
            ],
            practical: 'Hva er forskjellen på First Price-melk og TINE-melk? Smak, pris, kvalitet?',
            exercises: [
            {
      id: 'ml207-6-1',
      icon: '🏷️',
      title: 'Hva er EMV',
      question: 'Hva betyr EMV i Norge?',
      choices: [
        { id: 'a', label: 'European Marketing Vision', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Egne MerkeVarer — kjedenes egne merker som First Price, X-tra, Mer', isCorrect: true, feedback: 'Riktig! Voksende andel av norsk dagligvare.' },
{ id: 'c', label: 'European Member Vision', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Et standardiseringsorgan', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: '30-40 % av norsk dagligvare er nå EMV. Andel vokser hver år.',
    },
    {
      id: 'ml207-6-2',
      icon: '🏷️',
      title: 'Strategi',
      question: 'Hvorfor satser kjedene på EMV?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'b', label: 'Høyere margin, pressmiddel mot produsentmerker, kundelojalitet til kjeden', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal verdi. Skifter makt fra produsent til detaljist.' },
{ id: 'c', label: 'Bare for å hjelpe forbrukere', isCorrect: false, feedback: 'For naivt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'EMV gir kjedene fra 25-40 % bruttomargin vs 15-20 % på A-merker. Stor økonomisk insentiv.',
    },
    {
      id: 'ml207-6-3',
      icon: '🏷️',
      title: 'Trussel',
      question: 'Hva betyr EMV for produsentmerker som TINE?',
      choices: [
        { id: 'a', label: 'Ingen trussel', isCorrect: false, feedback: 'Stor trussel.' },
{ id: 'b', label: 'Mister hyllemeter til EMV, må kutte priser, kan miste markedsandel', isCorrect: true, feedback: 'Riktig! Eksistensiell utfordring. Tine bruker innovasjon for å rettferdiggjøre premium.' },
{ id: 'c', label: 'Hjelper TINE', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'EMV er fullt lovlig.' },
      ],
      espenTip: 'Tine har respondert med innovasjon — yoghurt-varianter, plantebaserte, økologisk. EMV følger sjelden i innovasjon.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🛡️',
            title: 'Brand Equity Management',
            quote: 'Pleie og vedlikeholde verdien.',
            content: 'Brand Equity Management: hvordan pleie og vedlikeholde merkeverdien over tid. Konsistent kommunikasjon, beskytte posisjonering, oppfølging av kvalitet, krise-håndtering. Sterke merker (Coca-Cola, Apple) bruker enorme ressurser på å opprettholde verdien — det er aldri \'ferdig\'.',
            subpoints: [
                  { label: 'KONSTANT INNSATS', text: 'Merkevare bygges ikke én gang — krever kontinuerlig pleie.' },
          { label: 'KRISE-RESPONS', text: 'Hvordan ledelsen reagerer i krise kan styrke eller ødelegge merket.' },
            ],
            practical: 'Hvilken bedrift har du sett håndtere krise godt? Hvilke har gjort det dårlig?',
            exercises: [
            {
      id: 'ml207-7-1',
      icon: '🛡️',
      title: 'Hovedinnsats',
      question: 'Hva krever brand equity management?',
      choices: [
        { id: 'a', label: 'Engangsarbeid', isCorrect: false, feedback: 'Aldri ferdig.' },
{ id: 'b', label: 'Kontinuerlig pleie — konsistent kommunikasjon, kvalitet, krise-håndtering', isCorrect: true, feedback: 'Riktig! Merkebygging er pågående disiplin, ikke prosjekt.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Bredere arbeid.' },
{ id: 'd', label: 'Bare i krise', isCorrect: false, feedback: 'For reaktivt.' },
      ],
      espenTip: 'Coca-Cola bruker over 4 milliarder USD årlig på merkevedlikehold. Det er prisen for å holde topp-posisjon.',
    },
    {
      id: 'ml207-7-2',
      icon: '🛡️',
      title: 'Kriserespons',
      question: 'VW Dieselgate — hvordan håndterte de det?',
      choices: [
        { id: 'a', label: 'Perfekt', isCorrect: false, feedback: 'Helt feil — håndterte dårlig.' },
{ id: 'b', label: 'Dårlig — først fornektelse, så langsom respons. Ødela merket sterkt', isCorrect: true, feedback: 'Riktig! Klassisk dårlig kriserespons. Merket har slitt siden.' },
{ id: 'c', label: 'Aldri innrømmet noe', isCorrect: false, feedback: 'Til slutt måtte de — etter det var for sent.' },
{ id: 'd', label: 'Solgte selskapet', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Lærdom: rask, ærlig respons slår fornektelse. Tylenol-saken (Johnson & Johnson) er det klassiske eksempel på god håndtering.',
    },
    {
      id: 'ml207-7-3',
      icon: '🛡️',
      title: 'Konsistens',
      question: 'Hvorfor er konsistens viktig?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Bygger gjenkjennelse og tillit over tid — endring ofte forvirrer kundene', isCorrect: true, feedback: 'Riktig! Sterke merker er gjenkjennelige uansett kanal. Inkonsistens svekker.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare estetikk', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Tropicanas redesign i 2009: nytt logo og emballasje. Salget falt 20 % på 2 mnd. De gikk tilbake til original design.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '⚖️',
            title: 'Juridisk merkebeskyttelse',
            quote: 'Patentstyret + WIPO.',
            content: 'Varemerker registreres hos Patentstyret i Norge. Internasjonal beskyttelse via WIPO (Madrid-systemet). Beskyttelse mot piratkopier. Uten registrering kan andre lovlig kopiere navn og logo i Norge. Kostnad: 2 700 kr for første klasse i Norge, internasjonal tilkomst billigere via Madrid.',
            subpoints: [
                  { label: 'PATENTSTYRET', text: 'Norsk varemerke-registrering. Krever søknad.' },
          { label: 'WIPO', text: 'Internasjonal beskyttelse via Madrid-protokollen — kostnadseffektivt.' },
            ],
            practical: 'Sjekk en favorittlogo: er den varemerkeregistrert i Norge? (sjekk på Patentstyret.no)',
            exercises: [
            {
      id: 'ml207-8-1',
      icon: '⚖️',
      title: 'Hvor',
      question: 'Hvor registreres varemerker i Norge?',
      choices: [
        { id: 'a', label: 'Brønnøysund', isCorrect: false, feedback: 'Det er foretaksregistrering.' },
{ id: 'b', label: 'Patentstyret', isCorrect: true, feedback: 'Riktig! Patentstyret håndterer varemerker, design, patenter.' },
{ id: 'c', label: 'Skattetaten', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Konkurransetilsynet', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Patentstyret.no — søkemotor for varemerker er offentlig. Sjekk før du velger nytt navn.',
    },
    {
      id: 'ml207-8-2',
      icon: '⚖️',
      title: 'Internasjonalt',
      question: 'Hvordan beskytte internasjonalt?',
      choices: [
        { id: 'a', label: 'Søk i hvert land separat', isCorrect: false, feedback: 'Dyrt og tregt.' },
{ id: 'b', label: 'WIPO Madrid-protokollen — én søknad gir beskyttelse i 100+ land', isCorrect: true, feedback: 'Riktig! Kostnadseffektivt for internasjonale merker.' },
{ id: 'c', label: 'Patentstyret dekker hele verden', isCorrect: false, feedback: 'Bare Norge.' },
{ id: 'd', label: 'Ikke mulig', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Madrid-protokollen er administrert av WIPO (World Intellectual Property Organization).',
    },
    {
      id: 'ml207-8-3',
      icon: '⚖️',
      title: 'Kostnad',
      question: 'Cirka kostnad for varemerke i Norge?',
      choices: [
        { id: 'a', label: '1000 kr', isCorrect: false, feedback: 'For lavt.' },
{ id: 'b', label: 'Cirka 2 700 kr for første klasse', isCorrect: true, feedback: 'Riktig! Beskyttelse i 10 år, fornybart. Billig sammenlignet med risiko.' },
{ id: 'c', label: '100 000 kr', isCorrect: false, feedback: 'For høyt.' },
{ id: 'd', label: 'Gratis', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Beskyttelsen er der ikke automatisk — krever aktiv registrering. Mange små bedrifter glemmer dette.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌍',
            title: 'Global vs lokal merkevare',
            quote: 'Standardisering vs tilpasning.',
            content: 'Globale merker (Coca-Cola, McDonald\'s) standardiserer mest mulig — men tilpasser detaljer per marked. McDonald\'s har samme branding globalt, men McSpicy Paneer i India og Rejmyre Burger i Sverige. Strategisk valg basert på kategori og kultur. Mat tilpasses; teknologi standardiseres.',
            subpoints: [
                  { label: 'STANDARDISERING', text: 'Stordriftsfordel + global merkebygging.' },
          { label: 'TILPASNING', text: 'Lokal relevans + kulturell sensitivitet.' },
            ],
            practical: 'Hvilke globale merker har du sett \'tilpasse\' til Norge? Hva endret de? Hva beholdt de?',
            exercises: [
            {
      id: 'ml207-9-1',
      icon: '🌍',
      title: 'Hovedstrategi',
      question: 'Hva er McDonalds-strategien?',
      choices: [
        { id: 'a', label: '100 % standardisert', isCorrect: false, feedback: 'De tilpasser meny.' },
{ id: 'b', label: 'Glokal — global branding, lokal meny-tilpasning', isCorrect: true, feedback: 'Riktig! \'Glocalization\'. Big Mac globalt, lokale spesialiteter per marked.' },
{ id: 'c', label: '100 % lokalt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert strategi.' },
      ],
      espenTip: 'Reklame, logo, layout = global. Meny = lokal. Best of both worlds.',
    },
    {
      id: 'ml207-9-2',
      icon: '🌍',
      title: 'Tilpasning',
      question: 'Hva tilpasses lokalt?',
      choices: [
        { id: 'a', label: 'Bare logo', isCorrect: false, feedback: 'Logo er typisk standard.' },
{ id: 'b', label: 'Produkt, smaker, regelverk, sosiale normer — etter behov', isCorrect: true, feedback: 'Riktig! Tilpas det som faktisk trenger lokal sensitivitet.' },
{ id: 'c', label: 'Alt', isCorrect: false, feedback: 'For stor jobb.' },
{ id: 'd', label: 'Ingenting', isCorrect: false, feedback: 'For rigid.' },
      ],
      espenTip: 'Coca-Cola endret oppskrift i Mexico (mer sukker per kultur). Apple oversetter alt til lokale språk.',
    },
    {
      id: 'ml207-9-3',
      icon: '🌍',
      title: 'Norsk eksempel',
      question: 'Hva tilpasser globale merker i Norge?',
      choices: [
        { id: 'a', label: 'Bare språk', isCorrect: false, feedback: 'Mer enn språk.' },
{ id: 'b', label: 'Språk + lokale tilbud (laksevarianter på McDonald\'s), bærekraft-meldinger', isCorrect: true, feedback: 'Riktig! Norge er liten markedet, men kreative tilpasninger.' },
{ id: 'c', label: 'Helt nytt brand', isCorrect: false, feedback: 'Sjelden — for kostbart.' },
{ id: 'd', label: 'Ingenting', isCorrect: false, feedback: 'Tilpasninger finnes alltid.' },
      ],
      espenTip: 'IKEA pampelse-laksen i Norge er klassisk eksempel. Lokal tilpasning innenfor global ramme.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📊',
            title: 'Merkets fremtid',
            quote: 'Digital + bærekraft + autentisitet.',
            content: 'Merkebygging endres: yngre forbrukere (Gen Z, Millennials) prioriterer autentisitet, bærekraft, sosial ansvar over status og pris. Digitale kanaler (TikTok, Instagram) er primære kanaler. Influencere har stor påvirkning. Bærekraft er ikke valgfritt — det er forventning. Merker som overlever: ekte, ansvarlige, digitalt smarte.',
            subpoints: [
                  { label: 'YNGRE FORBRUKERE', text: 'Krever autentisitet og bærekraft, ikke bare reklame.' },
          { label: 'DIGITAL FØRST', text: 'TikTok og Instagram er nye merkebygging-kanaler.' },
            ],
            practical: 'Hvilke nye merker har vunnet markedet på digital + bærekraft + autentisitet?',
            exercises: [
            {
      id: 'ml207-10-1',
      icon: '📊',
      title: 'Yngre',
      question: 'Hva prioriterer Gen Z i merkevalg?',
      choices: [
        { id: 'a', label: 'Bare pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Autentisitet, bærekraft, sosialt ansvar — over status', isCorrect: true, feedback: 'Riktig! Generasjonsskifte i merkevareverdier. Bedrifter må tilpasse seg.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Tvert imot — skeptiske til reklame.' },
{ id: 'd', label: 'Bare luksus', isCorrect: false, feedback: 'Mindre enn forrige generasjon.' },
      ],
      espenTip: 'Patagonia, Allbirds, Stormberg vinner Gen Z-segment. Stort skifte fra LVMH-luksusmerker.',
    },
    {
      id: 'ml207-10-2',
      icon: '📊',
      title: 'Kanaler',
      question: 'Hvor bygges merker mest nå?',
      choices: [
        { id: 'a', label: 'Bare TV', isCorrect: false, feedback: 'Foreldet for unge.' },
{ id: 'b', label: 'TikTok, Instagram, YouTube + influencere', isCorrect: true, feedback: 'Riktig! Digital først. Yngre forbrukere møter merker her.' },
{ id: 'c', label: 'Bare aviser', isCorrect: false, feedback: 'Foreldet.' },
{ id: 'd', label: 'Bare butikk', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Norske TikTok-merker som Voi, Vipps har vokst eksponentielt på unge brukere via plattformen.',
    },
    {
      id: 'ml207-10-3',
      icon: '📊',
      title: 'Lærdom',
      question: 'Hva må moderne merker?',
      choices: [
        { id: 'a', label: 'Kun fokusere på pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Være ekte, ansvarlige, digitalt smarte — ikke bare reklame-tunge', isCorrect: true, feedback: 'Riktig! Helhetlig merkebygging. Kortsiktig reklame slår ikke langsiktig autentisitet.' },
{ id: 'c', label: 'Ignorere yngre kunder', isCorrect: false, feedback: 'Strategisk dødsfelle.' },
{ id: 'd', label: 'Bare bruke TV-reklame', isCorrect: false, feedback: 'Foreldet kanal for unge.' },
      ],
      espenTip: 'Stormberg er norsk eksempel: ekte verdier, sosiale medier, autentisk kommunikasjon. Vinner over generisk konkurranse.',
    },
            ],
          },
        ]

        export default function MerkevarestrategiModule() {
          return (
            <DrawerModule
              moduleCode="ML2-07"
              moduleTitle="Merkevarestrategi"
              moduleIcon="⭐"
              storageKey="learning-ml2-merkevarestrategi"
              completeRoute="/learning/ml2/merkevarestrategi/complete"
              phases={phases}
              intro="Brand Equity er den verdien navnet tilfører produktet utover det fysiske. Sterke merker gir prising-makt, lojalitet og motstandskraft mot kriser. Bygges over år gjennom konsistens."
              vissteduAt="Apple-merkevaren er verdsatt til over 500 milliarder dollar. Mer enn hele Norges fiskeeksport på 50 år."
              espenSier="En sterk merkevare er bedriftens eneste verdi som ikke står på balansen — men ofte den viktigste eiendelen."
      presentationLink={{ route: '/learning/presentations/ml2/merkevarestrategi', description: 'Merkevarestrategi — 10 slides' }}
            />
          )
        }
