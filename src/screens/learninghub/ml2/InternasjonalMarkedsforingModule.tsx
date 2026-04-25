        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🌐',
            title: 'Hvorfor internasjonalisere?',
            quote: 'Vekst, skala, risikospredning.',
            content: 'Tre hovedgrunner: 1) Vekst (norsk marked er begrenset til 5,5 mill personer). 2) Stordriftsfordeler (samme produkt selges flere ganger). 3) Risikospredning (ikke avhengig av norsk konjunktur). Norske bedrifter som vokser mer enn 100x må typisk ut.',
            subpoints: [
                  { label: 'VEKST', text: 'Norge er for lite for store ambisjoner.' },
          { label: 'RISIKO', text: 'Spre eksponering over flere markeder.' },
            ],
            practical: 'Hvilken norsk bedrift har vokst stort gjennom internasjonalisering?',
            exercises: [
            {
      id: 'ml215-1-1',
      icon: '🌐',
      title: 'Hovedgrunn',
      question: 'Hvorfor internasjonalisere?',
      choices: [
        { id: 'a', label: 'Bare prestige', isCorrect: false, feedback: 'Strategiske grunner.' },
{ id: 'b', label: 'Vekst, stordriftsfordeler, risikospredning', isCorrect: true, feedback: 'Riktig! Tre hovedgrunner.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Tomra startet i Norge, vokste til 100+ land. Norsk marked alene var ikke nok for global ambisjon.',
    },
    {
      id: 'ml215-1-2',
      icon: '🌐',
      title: 'Norsk størrelse',
      question: 'Hvor stort er norsk marked?',
      choices: [
        { id: 'a', label: '100 mill', isCorrect: false, feedback: 'For høyt.' },
{ id: 'b', label: '5,5 millioner mennesker', isCorrect: true, feedback: 'Riktig! Begrenser vekst-potensial for store bedrifter.' },
{ id: 'c', label: '1 mrd', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret tall.' },
      ],
      espenTip: 'Med 5,5 mill innbyggere er Norge mindre enn én amerikansk delstat. Begrenser nasjonal skala.',
    },
    {
      id: 'ml215-1-3',
      icon: '🌐',
      title: 'Risiko',
      question: 'Hvordan reduserer eksport risiko?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Norsk konjunkturnedgang rammer mindre når man har inntekt fra mange markeder', isCorrect: true, feedback: 'Riktig! Diversifisering.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for olje', isCorrect: false, feedback: 'Gjelder alle bransjer.' },
      ],
      espenTip: 'Da norsk olje falt i 2014, klarte bedrifter med internasjonal eksponering seg bedre.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🛤️',
            title: 'Etableringsstrategier',
            quote: 'Fra eksport til datterselskap.',
            content: 'Fra lavt til høyt engasjement: 1) Eksport (selg fra Norge), 2) Lisensiering (la andre produsere), 3) Franchising (la andre drive), 4) Joint Venture (sammen med lokal partner), 5) Heleid datterselskap (full kontroll, full risiko). Ulike krav til ressurser og risiko.',
            subpoints: [
                  { label: 'LAV→HØY', text: 'Risiko og engasjement øker fra eksport til datterselskap.' },
          { label: 'VALG', text: 'Avhenger av marked, ressurser, kontroll-behov.' },
            ],
            practical: 'Hva er forskjellen på McDonald\'s franchise-modell og Apples direkte butikker?',
            exercises: [
            {
      id: 'ml215-2-1',
      icon: '🛤️',
      title: 'Etableringsstrategier',
      question: 'Hva er de 5 hovedstrategiene?',
      choices: [
        { id: 'a', label: 'Bare eksport', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Eksport, lisensiering, franchising, joint venture, datterselskap', isCorrect: true, feedback: 'Riktig! Strukturert kontinuum.' },
{ id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Velg basert på ressurser og marked-kunnskap. Lavrisiko = eksport. Høy kontroll = datterselskap.',
    },
    {
      id: 'ml215-2-2',
      icon: '🛤️',
      title: 'Joint Venture',
      question: 'Når passer joint venture?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'I markeder der lokal kunnskap er kritisk eller lov krever lokalpartner', isCorrect: true, feedback: 'Riktig! Mange asiatiske markeder krever JV.' },
{ id: 'c', label: 'Bare for små', isCorrect: false, feedback: 'For store også.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Kina krever ofte JV med kinesisk partner. Bilbransjen er klassisk eksempel.',
    },
    {
      id: 'ml215-2-3',
      icon: '🛤️',
      title: 'Heleid datter',
      question: 'Når heleid datterselskap?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes ofte.' },
{ id: 'b', label: 'Når full kontroll er kritisk og man har ressurser til risikoen', isCorrect: true, feedback: 'Riktig! Strategisk valg.' },
{ id: 'c', label: 'Bare for små', isCorrect: false, feedback: 'For store typisk.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig.' },
      ],
      espenTip: 'Apple bygger heleide butikker i premium-markeder. Vil ikke kompromisse opplevelsen.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🎭',
            title: 'Kulturell forståelse',
            quote: 'Hofstedes dimensjoner.',
            content: 'Geert Hofstede identifiserte 6 kulturelle dimensjoner: maktavstand, individualisme/kollektivisme, maskulinitet/femininitet, usikkerhetsunngåelse, langtidsorientering, ettergivenhet. Norge skiller seg sterkt fra Asia på flere dimensjoner — påvirker både salgssamtaler og lederstil.',
            subpoints: [
                  { label: '6 DIMENSJONER', text: 'Måler kulturelle forskjeller systematisk.' },
          { label: 'NORGE = EKSTREMT', text: 'Lavt maktdistanse, høy individualisme, lav maskulinitet.' },
            ],
            practical: 'Hva tror du er største kulturforskjell mellom Norge og Japan i forretningskontekst?',
            exercises: [
            {
      id: 'ml215-3-1',
      icon: '🎭',
      title: 'Hva',
      question: 'Hva er Hofstedes dimensjoner brukt til?',
      choices: [
        { id: 'a', label: 'Beregne valuta', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Forstå kulturelle forskjeller mellom land', isCorrect: true, feedback: 'Riktig! Verktøy for global ledelse.' },
{ id: 'c', label: 'Måle BNP', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Finne nye markeder', isCorrect: false, feedback: 'Bredere strategi.' },
      ],
      espenTip: 'Hofstede-modellen er fra 1980-tallet, fortsatt mye brukt i internasjonal forretningslitteratur.',
    },
    {
      id: 'ml215-3-2',
      icon: '🎭',
      title: 'Norge',
      question: 'Hvor ligger Norge?',
      choices: [
        { id: 'a', label: 'Verdens høyeste maktdistanse', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Blant de laveste i maktdistanse, høyest individualisme, lavest maskulinitet', isCorrect: true, feedback: 'Riktig! Norge er ekstreme på flere dimensjoner.' },
{ id: 'c', label: 'Gjennomsnittlig', isCorrect: false, feedback: 'Norge skiller seg.' },
      ],
      espenTip: 'Norske ledere reiser til Asia og blir sjokkert over maktavstand. Lokal kunnskap kritisk.',
    },
    {
      id: 'ml215-3-3',
      icon: '🎭',
      title: 'Praktisk',
      question: 'Hvorfor er dette viktig for marketing?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Norske direkte kommunikasjon kan oppleves uhøflig i Asia. Tilpas budskap til kultur', isCorrect: true, feedback: 'Riktig! Pepsi mistet milliarder i Kina på feilmeldt tagline.' },
{ id: 'c', label: 'Bare for HR', isCorrect: false, feedback: 'Markedsføring også.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'KFC-tagline \'finger lickin\' good\' ble oversatt til \'eat your fingers off\' i Kina. Dyrt feil.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '⚖️',
            title: 'Standardisering vs adaptasjon',
            quote: 'Glocal — lik markedsmiks vs lokal tilpasning.',
            content: 'Standardisering: lik markedsmiks overalt (lavere kostnad, sterkere global merkevare). Adaptasjon: lokal tilpasning (bedre kulturell relevans, høyere kostnad). De fleste store merkevarer kombinerer (\'glocal\'): McDonalds har Big Mac globalt + lokale spesialiteter (McSpicy Paneer i India, Rejmyre Burger i Sverige).',
            subpoints: [
                  { label: 'STANDARD = SKALA', text: 'Stordriftsfordel + global merkebygging.' },
          { label: 'ADAPTASJON = RELEVANS', text: 'Lokal tilpasning + kulturell sensitivitet.' },
            ],
            practical: 'Hvilke globale merker har du sett tilpasse til Norge? Hva endret de?',
            exercises: [
            {
      id: 'ml215-4-1',
      icon: '⚖️',
      title: 'Glocal',
      question: 'Hva er glocal?',
      choices: [
        { id: 'a', label: 'Bare lokal', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Kombinasjon av global standardisering og lokal tilpasning', isCorrect: true, feedback: 'Riktig! Beste av begge verdener.' },
{ id: 'c', label: 'Bare global', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Begrepet kombinerer \'global\' og \'local\'. Klassisk strategi for store merker.',
    },
    {
      id: 'ml215-4-2',
      icon: '⚖️',
      title: 'Hva tilpasses',
      question: 'Hva tilpasses lokalt?',
      choices: [
        { id: 'a', label: 'Bare logo', isCorrect: false, feedback: 'Logo er typisk standard.' },
{ id: 'b', label: 'Produkt, smaker, regelverk, sosiale normer — etter behov', isCorrect: true, feedback: 'Riktig! Tilpas det som faktisk trenger lokal sensitivitet.' },
{ id: 'c', label: 'Alt', isCorrect: false, feedback: 'For stor jobb.' },
{ id: 'd', label: 'Ingenting', isCorrect: false, feedback: 'For rigid.' },
      ],
      espenTip: 'Apple oversetter alt til lokale språk. Coca-Cola endret oppskrift i Mexico (mer sukker).',
    },
    {
      id: 'ml215-4-3',
      icon: '⚖️',
      title: 'Norsk eksempel',
      question: 'Hvilke tilpasninger har du sett i Norge?',
      choices: [
        { id: 'a', label: 'Bare språk', isCorrect: false, feedback: 'Mer enn språk.' },
{ id: 'b', label: 'Språk + lokale tilbud (laksevarianter på McDonald\'s), bærekraft-meldinger', isCorrect: true, feedback: 'Riktig! Norge er liten, men kreative tilpasninger.' },
{ id: 'c', label: 'Helt nytt brand', isCorrect: false, feedback: 'Sjelden for kostbart.' },
{ id: 'd', label: 'Ingenting', isCorrect: false, feedback: 'Tilpasninger finnes alltid.' },
      ],
      espenTip: 'IKEA-pampelse-laksen er klassisk eksempel. Lokal tilpasning innenfor global ramme.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📋',
            title: 'Landanalysen (PESTEL)',
            quote: 'Kartlegg risiko før inntreden.',
            content: 'PESTEL-analyse av nytt land: Politisk stabilitet, Økonomisk styrke, Sosiale normer, Teknologi-modenhet, Miljølovgivning, Lovverk. Et 50-siders PESTEL-dokument er standard før store internasjonale satsninger. Avdekker risiko du kanskje ikke hadde tenkt på.',
            subpoints: [
                  { label: 'RISK FØR INNTRED', text: 'Bedre å oppdage risiko på papir enn i marked.' },
          { label: 'STANDARD VERKTØY', text: 'Brukes for alle internasjonale satsninger.' },
            ],
            practical: 'Hva ville vært viktigste PESTEL-faktor om du skulle åpne norsk bedrift i Brasil?',
            exercises: [
            {
      id: 'ml215-5-1',
      icon: '📋',
      title: 'PESTEL',
      question: 'Hva analyserer PESTEL?',
      choices: [
        { id: 'a', label: 'Bare økonomi', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Politisk, Økonomisk, Sosialt, Teknologisk, Environmental, Lovmessig', isCorrect: true, feedback: 'Riktig! 6 dimensjoner.' },
{ id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver dimensjon kan inneholde dealbreakers. Sjekk alle, ikke bare én.',
    },
    {
      id: 'ml215-5-2',
      icon: '📋',
      title: 'Politisk',
      question: 'Hva inkluderer politisk risiko?',
      choices: [
        { id: 'a', label: 'Bare valg', isCorrect: false, feedback: 'Bredere.' },
{ id: 'b', label: 'Stabilitet, korrupsjon, regulering, handelsavtaler', isCorrect: true, feedback: 'Riktig! Politikk påvirker marked direkte.' },
{ id: 'c', label: 'Bare militær', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare lovkrav', isCorrect: false, feedback: 'Bredere.' },
      ],
      espenTip: 'Russland-invasjonen 2022 viste hvor raskt politisk risiko kan ramme. Vestlige bedrifter måtte trekke seg ut.',
    },
    {
      id: 'ml215-5-3',
      icon: '📋',
      title: 'Hvorfor',
      question: 'Hvorfor gjøre PESTEL?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verktøy.' },
{ id: 'b', label: 'Avdekke risiko og muligheter — bedre å oppdage på papir enn i marked', isCorrect: true, feedback: 'Riktig! Forebygger dyre feil.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Brukes alle størrelser.' },
      ],
      espenTip: 'Mange bedrifter har kostbar læring fra å hoppe inn i nye markeder uten skikkelig analyse.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '💱',
            title: 'Internasjonal prising',
            quote: 'Valuta, dumping, transfer pricing.',
            content: 'Internasjonal prising er komplekst: valutasvingninger (krone-svekkelse gir norske eksportører fordel), dumping (selge under selvkost — ofte ulovlig), transfer pricing (interne priser mellom datterselskaper — strengt skattemessig regulert). Skattemyndigheter har strenge regler.',
            subpoints: [
                  { label: 'VALUTARISIKO', text: 'Krone-svingninger påvirker eksportører dramatisk.' },
          { label: 'TRANSFER PRICING', text: 'Strengt regulert for å hindre skatte-omgåelse.' },
            ],
            practical: 'Hva skjer med norsk laks-eksport når kronen styrker seg vs USD?',
            exercises: [
            {
      id: 'ml215-6-1',
      icon: '💱',
      title: 'Valutasvingning',
      question: 'Hva skjer ved sterk krone?',
      choices: [
        { id: 'a', label: 'Norsk eksport blir billigere', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Norsk eksport blir dyrere internasjonalt — vanskeligere å selge', isCorrect: true, feedback: 'Riktig! Strukturell utfordring for eksportbransjer.' },
{ id: 'c', label: 'Ingen effekt', isCorrect: false, feedback: 'Stor effekt.' },
{ id: 'd', label: 'Bare for olje', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Norske eksportører har historisk slitt når kronen er sterk. Importører tjener motsatt.',
    },
    {
      id: 'ml215-6-2',
      icon: '💱',
      title: 'Dumping',
      question: 'Hva er dumping?',
      choices: [
        { id: 'a', label: 'Lovlig prisstrategi', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Selge under selvkost — ofte ulovlig som anti-konkurranse-tiltak', isCorrect: true, feedback: 'Riktig! WTO-regler hindrer dumping.' },
{ id: 'c', label: 'Bare i Kina', isCorrect: false, feedback: 'Globalt fenomen.' },
{ id: 'd', label: 'Helt vanlig', isCorrect: false, feedback: 'Ulovlig praksis.' },
      ],
      espenTip: 'EU har anti-dumping-tariffer mot kinesiske produkter (sykler, sko). Norge følger EU-regler via EØS.',
    },
    {
      id: 'ml215-6-3',
      icon: '💱',
      title: 'Transfer pricing',
      question: 'Hva er det?',
      choices: [
        { id: 'a', label: 'Frakt over landegrenser', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Interne priser mellom datterselskaper — strengt skattemessig regulert', isCorrect: true, feedback: 'Riktig! Skattemyndigheter sikrer at multinasjonaler betaler skatt der verdien skapes.' },
{ id: 'c', label: 'Valutakurser', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Reise-utgifter', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Multinasjonaler kan ellers flytte profitt til lavskatteland via interne priser. Strengt regulert.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📦',
            title: 'Logistikk og toll',
            quote: 'Incoterms og handelsavtaler.',
            content: 'Incoterms (International Commercial Terms) er standardisert ramme for hvem som har ansvar for varene under transport (FOB, CIF, etc.). Tollbarrierer varierer per land. Handelsavtaler (EØS gir Norge full markedsadgang i EU). Toll og avgifter kan utgjøre 20-40 % av varens pris i fjerne markeder.',
            subpoints: [
                  { label: 'INCOTERMS', text: 'Standardisert ansvarsfordeling for internasjonal transport.' },
          { label: 'EØS', text: 'Norge har full markedsadgang i EU — kritisk for eksport.' },
            ],
            practical: 'Hva betyr \'EXW\' eller \'CIF\'? Hvilken er bedre for kjøperen?',
            exercises: [
            {
      id: 'ml215-7-1',
      icon: '📦',
      title: 'Incoterms',
      question: 'Hva er Incoterms?',
      choices: [
        { id: 'a', label: 'Et IT-system', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Standardiserte vilkår for ansvar i internasjonal handel', isCorrect: true, feedback: 'Riktig! Bestemmer hvem som har ansvaret hvor i transport-kjeden.' },
{ id: 'c', label: 'Tollavgifter', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'En valuta', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Incoterms vedlikeholdes av ICC. Oppdateres ca hvert 10. år. Siste versjon: Incoterms 2020.',
    },
    {
      id: 'ml215-7-2',
      icon: '📦',
      title: 'EØS',
      question: 'Hvor viktig er EØS-avtalen?',
      choices: [
        { id: 'a', label: 'Lite', isCorrect: false, feedback: 'Kritisk for norsk eksport.' },
{ id: 'b', label: 'Kritisk — gir Norge full markedsadgang i EU uten toll', isCorrect: true, feedback: 'Riktig! 80 % av norsk eksport går til EU.' },
{ id: 'c', label: 'Bare olje', isCorrect: false, feedback: 'Gjelder alle bransjer.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt feil — internasjonal avtale.' },
      ],
      espenTip: 'Uten EØS ville norske bedrifter måttet betale EU-toll. Stor konkurranseulempe.',
    },
    {
      id: 'ml215-7-3',
      icon: '📦',
      title: 'Toll-andel',
      question: 'Hvor mye kan toll være?',
      choices: [
        { id: 'a', label: 'Bare 1-2 %', isCorrect: false, feedback: 'Kan være mye høyere.' },
{ id: 'b', label: '20-40 % i fjerne markeder med høye barrierer', isCorrect: true, feedback: 'Riktig! Strukturelt utfordring for eksport.' },
{ id: 'c', label: 'Aldri toll', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: '100 %', isCorrect: false, feedback: 'Sjelden så høyt.' },
      ],
      espenTip: 'Brasil, India har historisk hatt høye importtoll. Strategisk barriere for utenlandske aktører.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '📢',
            title: 'Global kommunikasjon',
            quote: 'Språk og kulturelle koder.',
            content: 'Engelske slagord oversettes ikke alltid godt. Bilder av kvinner uten hijab vil ikke fungere i Saudi-Arabia. Lokale byråer er uvurderlige. Sentralisert global kommunikasjon kan spare penger, men risikere kulturelle blunder. Beste praksis: global ramme, lokal eksekvering.',
            subpoints: [
                  { label: 'OVERSETTELSE-RISIKO', text: 'Direkte oversettelse gir ofte uheldige resultater.' },
          { label: 'LOKAL EKSPERTISE', text: 'Lokale byråer kjenner kulturelle koder.' },
            ],
            practical: 'Husker du noen reklame som klart ikke fungerte fordi den ble oversatt direkte?',
            exercises: [
            {
      id: 'ml215-8-1',
      icon: '📢',
      title: 'Risiko',
      question: 'Hva er hovedrisiko ved global kommunikasjon?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Kulturelle blunder pga manglende lokal kunnskap', isCorrect: true, feedback: 'Riktig! Klassisk feilkilde.' },
{ id: 'c', label: 'For dyrt', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'KFC, Pepsi, HSBC — alle har gjort kostbare oversettelses-feil. Lokal sjekk er ikke valgfritt.',
    },
    {
      id: 'ml215-8-2',
      icon: '📢',
      title: 'Beste praksis',
      question: 'Hvordan håndtere?',
      choices: [
        { id: 'a', label: 'Bare oversette mekanisk', isCorrect: false, feedback: 'Risikabelt.' },
{ id: 'b', label: 'Global merkeramme + lokal eksekvering med lokale byråer', isCorrect: true, feedback: 'Riktig! Konsistens + relevans.' },
{ id: 'c', label: 'Bare lokalt', isCorrect: false, feedback: 'Mister merkeintegritet.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'McDonald\'s: global Big Mac + lokal meny. Global merkeramme + lokal eksekvering. Beste av begge.',
    },
    {
      id: 'ml215-8-3',
      icon: '📢',
      title: 'Bilder',
      question: 'Hva med bildebruk?',
      choices: [
        { id: 'a', label: 'Standard overalt', isCorrect: false, feedback: 'Risikabelt.' },
{ id: 'b', label: 'Tilpas til kulturelle normer — alkohol, kvinner, religion', isCorrect: true, feedback: 'Riktig! Visuelle normer varierer dramatisk.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Aldri tilpasse', isCorrect: false, feedback: 'Strategisk feil.' },
      ],
      espenTip: 'Saudi-Arabia: ingen alkohol-bilder, kvinner med hijab, religiøse hensyn. Strenge regler.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Risiko ute',
            quote: 'Politisk, korrupsjon, jus.',
            content: 'Politisk risiko: regimer endres, eiendeler kan eksproprieres. Korrupsjon: nødvendig i noen markeder, ulovlig hjemme. Juridiske forskjeller: kontrakter kan være verdiløse i visse land. Forsikringer mot disse finnes (GIEK i Norge, Atradius globalt). Norske bedrifter må navigere komplekst.',
            subpoints: [
                  { label: 'POLITISK', text: 'Regimer endres, krig, ekspropriasjon.' },
          { label: 'KORRUPSJON', text: 'Norske bedrifter forbudt under norsk lov, selv i utlandet.' },
            ],
            practical: 'Hvilke risiko ville du vurdert før norsk bedrift ekspanderer til Russland eller Saudi-Arabia?',
            exercises: [
            {
      id: 'ml215-9-1',
      icon: '⚠️',
      title: 'Politisk risiko',
      question: 'Hva er typisk politisk risiko?',
      choices: [
        { id: 'a', label: 'Bare valg', isCorrect: false, feedback: 'Bredere.' },
{ id: 'b', label: 'Regimeendringer, krig, ekspropriasjon, sanksjoner', isCorrect: true, feedback: 'Riktig! Bredt spekter av risiko.' },
{ id: 'c', label: 'Bare lokal lov', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Russland-invasjonen 2022: vestlige bedrifter måtte trekke seg ut, tape milliarder. Politisk risiko realisert.',
    },
    {
      id: 'ml215-9-2',
      icon: '⚠️',
      title: 'Korrupsjon',
      question: 'Hva sier norsk lov om korrupsjon i utlandet?',
      choices: [
        { id: 'a', label: 'Lovlig hvis lokalt akseptert', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Forbudt under norsk lov — selv om praksis i utlandet', isCorrect: true, feedback: 'Riktig! Norske straffeloven gjelder norske bedrifter globalt.' },
{ id: 'c', label: 'Bare i Norge', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Streng lov.' },
      ],
      espenTip: 'Statoil-saken (Iran 2003): bot på 80 mill USD. Norske bedrifter holdes ansvarlige globalt.',
    },
    {
      id: 'ml215-9-3',
      icon: '⚠️',
      title: 'Forsikring',
      question: 'Hvilken norsk institusjon hjelper med eksportrisiko?',
      choices: [
        { id: 'a', label: 'Banken', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'GIEK — Garantiinstituttet for eksportkreditt', isCorrect: true, feedback: 'Riktig! Statlig institusjon for eksportrisiko.' },
{ id: 'c', label: 'Brønnøysund', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Skattetaten', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'GIEK garanterer for eksportkreditt og politisk risiko. Kritisk for norske eksportbedrifter.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🌊',
            title: 'Norwegians USA-satsing',
            quote: 'Klassisk eksempel på mislykket internasjonalisering.',
            content: 'Norwegian satset hardt på lavprisflyvninger til USA. Manglende lokalkunnskap, hard konkurranse, valutarisiko og pandemi førte til konkurs i 2020. Lærdom: lokal innsikt og finansiell bærekraft må være på plass før internasjonal vekst. Verden er ett marked, men med mange lokale sannheter.',
            subpoints: [
                  { label: 'LÆRDOM', text: 'Lokal innsikt + finansiell bærekraft må være på plass.' },
          { label: 'YDMYKHET', text: 'Det som virker hjemme er ikke automatisk overførbart.' },
            ],
            practical: 'Hva skulle Norwegian gjort annerledes? Hva kunne hindret konkursen?',
            exercises: [
            {
      id: 'ml215-10-1',
      icon: '🌊',
      title: 'Norwegian',
      question: 'Hva skjedde med Norwegians USA-satsing?',
      choices: [
        { id: 'a', label: 'Stor suksess', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Endte i konkurs 2020 — manglende lokalkunnskap, valutarisiko, pandemi', isCorrect: true, feedback: 'Riktig! Klassisk eksempel på mislykket internasjonalisering.' },
{ id: 'c', label: 'Pågår fortsatt', isCorrect: false, feedback: 'Avsluttet.' },
{ id: 'd', label: 'Aldri prøvd', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Norwegian Long Haul-strategien er case study i internasjonal markedsføring. Mange feil i utførelsen.',
    },
    {
      id: 'ml215-10-2',
      icon: '🌊',
      title: 'Hovedlærdom',
      question: 'Hva er strategisk lærdom?',
      choices: [
        { id: 'a', label: 'Aldri internasjonalisere', isCorrect: false, feedback: 'For dogmatisk.' },
{ id: 'b', label: 'Lokal innsikt og finansiell bærekraft må være på plass', isCorrect: true, feedback: 'Riktig! Grundig forberedelse før vekst.' },
{ id: 'c', label: 'Bare amerikanske aktører lykkes', isCorrect: false, feedback: 'For pessimistisk.' },
{ id: 'd', label: 'Tilfeldighet', isCorrect: false, feedback: 'Strukturelle årsaker.' },
      ],
      espenTip: 'Mange norske bedrifter har lykkes internasjonalt — men har gjort grundig forberedelse.',
    },
    {
      id: 'ml215-10-3',
      icon: '🌊',
      title: 'Suksess-faktor',
      question: 'Hva må være på plass?',
      choices: [
        { id: 'a', label: 'Bare penger', isCorrect: false, feedback: 'Ikke nok.' },
{ id: 'b', label: 'Lokal kunnskap, finansiell styrke, klar strategi, kulturell sensitivitet', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal forberedelse.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Tomra, Equinor, Yara — alle har lykkes globalt. Felles: grundig forberedelse, ikke \'cowboy-tilnærming\'.',
    },
            ],
          },
          {
            phaseNumber: 11,
            icon: '📈',
            title: 'Internasjonal suksess',
            quote: 'Ydmykhet overfor lokale forskjeller.',
            content: 'Internasjonal suksess krever ydmykhet overfor lokale forskjeller. Det som virker hjemme er ikke automatisk overførbart — kulturen, kjøpsadferden og konkurransen er alltid annerledes. Norske bedrifter som lykkes globalt: Tomra, Equinor, Yara, DNV, Mowi. Felles: respekt for det lokale.',
            subpoints: [
                  { label: 'YDMYKHET', text: 'Strategisk dyd i internasjonal forretning.' },
          { label: 'LOKAL = STRATEGI', text: 'Tilpasning er ikke svakhet, det er strategi.' },
            ],
            practical: 'Hvilke norske bedrifter ser du som lykkes internasjonalt? Hva gjør dem annerledes?',
            exercises: [
            {
      id: 'ml215-11-1',
      icon: '📈',
      title: 'Suksess-faktor',
      question: 'Hva er felles for vellykkede norske eksportbedrifter?',
      choices: [
        { id: 'a', label: 'Bare lave priser', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Respekt for lokale forskjeller + langsiktig satsing + finansiell styrke', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal forklaring.' },
{ id: 'c', label: 'Bare offentlig støtte', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Tilfeldighet', isCorrect: false, feedback: 'Strukturelle drivere.' },
      ],
      espenTip: 'Tomra: 30+ år i internasjonalisering. Equinor: lokal partnerskap globalt. Yara: tilpasset gjødsel per region.',
    },
    {
      id: 'ml215-11-2',
      icon: '📈',
      title: 'Norske eksempler',
      question: 'Hvilken norsk bedrift er størst internasjonalt?',
      choices: [
        { id: 'a', label: 'Bare Equinor', isCorrect: false, feedback: 'Mange er store.' },
{ id: 'b', label: 'Equinor, Yara, Mowi, Telenor, DNV, Hydro — flere milliarder USD i internasjonal omsetning', isCorrect: true, feedback: 'Riktig! Norge har flere globale aktører.' },
{ id: 'c', label: 'Bare Vipps', isCorrect: false, feedback: 'For smalt — Vipps er nasjonal.' },
{ id: 'd', label: 'Ingen', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Norge har relativt mange globale selskaper for sin størrelse. Olje + maritim + sjømat har bygget eksport-kompetanse.',
    },
    {
      id: 'ml215-11-3',
      icon: '📈',
      title: 'Lærdom',
      question: 'Hva er hovedlærdommen?',
      choices: [
        { id: 'a', label: 'Internasjonalisering er enkelt', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Krever ydmykhet, forberedelse, finansiell styrke og tålmodighet', isCorrect: true, feedback: 'Riktig! Modne strategi.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Mange små lykkes.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte krav.' },
      ],
      espenTip: '\'Verden er ett marked, men med mange lokale sannheter.\' — moderne motto for internasjonal markedsføring.',
    },
            ],
          },
        ]

        export default function InternasjonalMarkedsforingModule() {
          return (
            <DrawerModule
              moduleCode="ML2-15"
              moduleTitle="Markedsføring på internasjonale markeder"
              moduleIcon="🌍"
              storageKey="learning-ml2-internasjonal-markedsforing"
              completeRoute="/learning/ml2/internasjonal-markedsforing/complete"
              phases={phases}
              intro="Verden som lekeplass — internasjonalisering gir vekst, stordriftsfordeler og risikospredning. Krever forståelse for kultur, etableringsstrategier og standardisering vs lokal tilpasning."
              vissteduAt="Norsk laks-eksport er nå over 100 milliarder kroner årlig — Norges nest største eksportvare etter olje. 95 % eksporteres. Internasjonal markedsføring er nasjonens vekstmotor."
              espenSier="Internasjonalisering er ikke bare \'å selge ut\'. Det krever ydmykhet overfor lokale forskjeller — det som virker hjemme er sjelden direkte overførbart."
      presentationLink={{ route: '/learning/presentations/ml2/internasjonal-markedsforing', description: 'Markedsføring på internasjonale markeder — 10 slides' }}
            />
          )
        }
