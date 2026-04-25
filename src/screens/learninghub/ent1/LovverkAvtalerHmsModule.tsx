        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📚',
            title: 'Relevante lover',
            quote: 'Hvilke lover påvirker?',
            content: 'Avtaleloven (når er en avtale bindende?), kjøpsloven (B2B-handel), forbrukerkjøpsloven (B2C-handel), markedsføringsloven (reklamens grenser), arbeidsmiljøloven (ansattes rettigheter), regnskapsloven, skatteloven. En gründer trenger ikke være jurist, men må kjenne grunnleggende regler.',
            subpoints: [
                  { label: 'FLERE LOVER', text: 'Multi-lov rammeverk for bedrifter.' },
          { label: 'GRUNNLEGGENDE', text: 'Kjenne hovedreglene i hver.' },
            ],
            practical: 'Hvilke lover er mest aktuelle for ideen din?',
            exercises: [
            {
      id: 'ent109-1-1',
      icon: '📚',
      title: 'Hvilke',
      question: 'Hvilke er sentrale?',
      choices: [
        { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Avtaleloven, kjøpsloven, forbrukerkjøpsloven, markedsføringsloven, arbeidsmiljøloven', isCorrect: true, feedback: 'Riktig! Multi-lov.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Norske lover.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver lov dekker et område. Bedriften må forholde seg til flere samtidig.',
    },
    {
      id: 'ent109-1-2',
      icon: '📚',
      title: 'Avtaleloven',
      question: 'Hva sier den?',
      choices: [
        { id: 'a', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'b', label: 'Når er en avtale bindende — tilbud, aksept, vilkår', isCorrect: true, feedback: 'Riktig! Grunnleggende kontraktsrett.' },
{ id: 'c', label: 'Bare for B2C', isCorrect: false, feedback: 'Begge.' },
      ],
      espenTip: 'Muntlig avtale er like bindende som skriftlig — bare vanskeligere å bevise. Skriv ned!',
    },
    {
      id: 'ent109-1-3',
      icon: '📚',
      title: 'Forbrukerkjøps',
      question: 'Forbrukerkjøpsloven gjelder?',
      choices: [
        { id: 'a', label: 'Alle salg', isCorrect: false, feedback: 'For bredt.' },
{ id: 'b', label: 'Bare salg til forbrukere — ikke B2B', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare B2B', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forbrukerkjøpsloven gir kunder sterkere vern enn kjøpsloven. Husk skillet.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📝',
            title: 'Kontrakter',
            quote: 'Skriftlige avtaler er gull.',
            content: 'Viktigheten av skriftlige avtaler med kunder, leverandører og ansatte. \'Avtaler er bindende\' selv om de er muntlige — men bevisbyrden er enorm. En enkel skriftlig kontrakt sparer deg for konflikter senere. Bruk maler — ikke finn opp hjulet.',
            subpoints: [
                  { label: 'SKRIFTLIG', text: 'Bevis ved tvist.' },
          { label: 'MALER', text: 'Bruk standardavtaler — ikke finn opp.' },
            ],
            practical: 'Hvilke avtaler ville du sikret skriftlig fra dag 1?',
            exercises: [
            {
      id: 'ent109-2-1',
      icon: '📝',
      title: 'Hvorfor',
      question: 'Hvorfor skriftlig?',
      choices: [
        { id: 'a', label: 'Lovkrav', isCorrect: false, feedback: 'Ofte ikke.' },
{ id: 'b', label: 'Bevis ved konflikt — muntlig er bindende men umulig å bevise', isCorrect: true, feedback: 'Riktig! Praktisk verdi.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Test: kan du bevise hva som ble avtalt? Hvis bare \'min hukommelse\', taper du i retten.',
    },
    {
      id: 'ent109-2-2',
      icon: '📝',
      title: 'Med kunder',
      question: 'Hva sikre skriftlig?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Pris, leveringsbetingelser, garantier, ansvarsbegrensning', isCorrect: true, feedback: 'Riktig! Kjernevilkår.' },
{ id: 'c', label: 'Bare pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Standardvilkår på faktura er minimum. For større avtaler: egen kontrakt.',
    },
    {
      id: 'ent109-2-3',
      icon: '📝',
      title: 'Maler',
      question: 'Hvor finne maler?',
      choices: [
        { id: 'a', label: 'Måtte alltid lage selv', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Standardavtaler fra advokat-firmaer, bransjeorganer', isCorrect: true, feedback: 'Riktig! Mange tilgjengelige.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Frivillig.' },
      ],
      espenTip: 'NHO, Virke, advokatkontorer publiserer maler. Tilpas til din situasjon, ikke kopier blindt.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🦺',
            title: 'HMS — Helse, miljø og sikkerhet',
            quote: 'Internkontrollforskriften.',
            content: 'Internkontrollforskriften krever at alle bedrifter har systematisk HMS-arbeid. Selv en énmannsbedrift må ha skrevne prosedyrer for risikovurdering, opplæring og oppfølging. Arbeidstilsynet kan kontrollere uanmeldt. Bøter ved brudd kan være store.',
            subpoints: [
                  { label: 'ALLE BEDRIFTER', text: 'Selv små må ha HMS-system.' },
          { label: 'DOKUMENTERT', text: 'Skriftlig HMS-arbeid er lovkravet.' },
            ],
            practical: 'Hvilke HMS-risikoer ville du dokumentert for en lokal kafé?',
            exercises: [
            {
      id: 'ent109-3-1',
      icon: '🦺',
      title: 'Hvem omfattes',
      question: 'Hvem må ha HMS?',
      choices: [
        { id: 'a', label: 'Bare store', isCorrect: false, feedback: 'Alle bedrifter.' },
{ id: 'b', label: 'Alle bedrifter — selv énmannsbedrift', isCorrect: true, feedback: 'Riktig! Lovkrav for alle.' },
{ id: 'c', label: 'Bare offentlige', isCorrect: false, feedback: 'Privat sektor også.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Internkontrollforskriften har ingen størrelses-grense. Skala på kravene varierer.',
    },
    {
      id: 'ent109-3-2',
      icon: '🦺',
      title: 'Arbeidstilsynet',
      question: 'Kan de kontrollere?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Konstant kontroll.' },
{ id: 'b', label: 'Ja — uanmeldt — og kan stenge drift ved brudd', isCorrect: true, feedback: 'Riktig! Sterke beføyelser.' },
{ id: 'c', label: 'Bare etter klage', isCorrect: false, feedback: 'Også proaktivt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Arbeidstilsynet er aktivt. Bedrifter rammes regelmessig av kontroller.',
    },
    {
      id: 'ent109-3-3',
      icon: '🦺',
      title: 'Konsekvens',
      question: 'Konsekvenser av brudd?',
      choices: [
        { id: 'a', label: 'Bare advarsel', isCorrect: false, feedback: 'Mer alvorlig.' },
{ id: 'b', label: 'Bøter, pålegg, stengning av drift', isCorrect: true, feedback: 'Riktig! Reelle sanksjoner.' },
{ id: 'c', label: 'Lovstridig å straffe', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Bøter for HMS-brudd kan være over 1 mill kr for små bedrifter. Krever proaktiv håndtering.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🔍',
            title: 'Risikovurdering',
            quote: 'Identifisere farer.',
            content: 'Identifisere farer og iverksette tiltak for å forebygge ulykker eller sykdom. Fysiske farer (brann, fall), psykososiale (stress, mobbing), kjemiske (allergi). Skriv det ned — udokumentert HMS er som ingen HMS. Standard ROS-analyse: vurder sannsynlighet × konsekvens.',
            subpoints: [
                  { label: 'ROS-ANALYSE', text: 'Risiko + Sårbarhet = struktur.' },
          { label: 'DOKUMENTERT', text: 'Skrevne prosedyrer = bevis ved kontroll.' },
            ],
            practical: 'Lag en enkel ROS for en lokal kafé — 3 risikoer.',
            exercises: [
            {
      id: 'ent109-4-1',
      icon: '🔍',
      title: 'ROS',
      question: 'Hva er ROS?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert akronym.' },
{ id: 'b', label: 'Risiko og sårbarhet — analyse av hva som kan gå galt', isCorrect: true, feedback: 'Riktig! Standard verktøy.' },
{ id: 'c', label: 'Bare for offshore', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'ROS-analyser brukes både i HMS, IT-sikkerhet, beredskapsplanlegging.',
    },
    {
      id: 'ent109-4-2',
      icon: '🔍',
      title: 'Type risikoer',
      question: 'Hvilke typer?',
      choices: [
        { id: 'a', label: 'Bare fysisk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Fysiske, psykososiale, kjemiske, biologiske', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal.' },
{ id: 'c', label: 'Bare brann', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Psykososiale risikoer (stress, mobbing) er ofte oversett — men reelle og lovregulerte.',
    },
    {
      id: 'ent109-4-3',
      icon: '🔍',
      title: 'Skrive ned',
      question: 'Hvorfor skrive?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Lovkrav.' },
{ id: 'b', label: 'Lovkrav + bevis ved kontroll + grunnlag for tiltak', isCorrect: true, feedback: 'Riktig! Multi-formål.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare for revisor', isCorrect: false, feedback: 'Bredere.' },
      ],
      espenTip: 'Udokumentert HMS = ingen HMS i Arbeidstilsynets øyne. Sett av tid til skriftlig arbeid.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🔒',
            title: 'Personvern (GDPR)',
            quote: 'Strenge regler.',
            content: 'Regler for hvordan bedriften skal håndtere kunde- og ansattopplysninger. Krev samtykke før innsamling, dokumenter formål, slett data når formålet er oppfylt. Brudd kan gi 4 % av global omsetning i bot — også for små bedrifter. Datatilsynet håndhever.',
            subpoints: [
                  { label: 'SAMTYKKE', text: 'Krev aktivt samtykke for behandling.' },
          { label: '4 % OMSETNING', text: 'Maks bot — selv små bedrifter rammes.' },
            ],
            practical: 'Hvilke personopplysninger samler bedriften du jobber for / kjenner?',
            exercises: [
            {
      id: 'ent109-5-1',
      icon: '🔒',
      title: 'Maks bot',
      question: 'Hvor høy kan boten være?',
      choices: [
        { id: 'a', label: '10 000 kr', isCorrect: false, feedback: 'For lavt.' },
{ id: 'b', label: '4 % av global omsetning eller 20 mill euro', isCorrect: true, feedback: 'Riktig! Strenge sanksjoner.' },
{ id: 'c', label: '100 000 kr', isCorrect: false, feedback: 'For lavt for store brudd.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Meta er bøtelagt over 1 mrd euro under GDPR. Selv små norske bedrifter har fått bøter på flere hundre tusen.',
    },
    {
      id: 'ent109-5-2',
      icon: '🔒',
      title: 'Datainnbrudd',
      question: 'Hvor raskt melde?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Lovkrav.' },
{ id: 'b', label: 'Innen 72 timer etter oppdagelse', isCorrect: true, feedback: 'Riktig! Standard frist.' },
{ id: 'c', label: '30 dager', isCorrect: false, feedback: 'For sent.' },
{ id: 'd', label: 'Bare hvis stort', isCorrect: false, feedback: 'Generelt krav.' },
      ],
      espenTip: 'Frist starter når du oppdager — ikke når du har løst. Ha rutiner klar.',
    },
    {
      id: 'ent109-5-3',
      icon: '🔒',
      title: 'Rettigheter',
      question: 'Brukerens rettigheter?',
      choices: [
        { id: 'a', label: 'Bare innsyn', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Innsyn, retting, sletting, dataportabilitet', isCorrect: true, feedback: 'Riktig! Fire kjerne-rettigheter.' },
{ id: 'c', label: 'Ingen', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Sett opp prosess for å håndtere innsynsbegjæringer. 30 dager til å svare.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🛡️',
            title: 'Immaterielle rettigheter (IPR)',
            quote: 'Patent, design, varemerke.',
            content: 'Beskyttelse av oppfinnelser (patent), design (designregistrering) og navn/logo (varemerke). Patent koster 50 000-500 000 kr og varer 20 år. Varemerke er billigere og varer evig så lenge det fornyes. Patentstyret håndterer alt i Norge. Internasjonalt via WIPO.',
            subpoints: [
                  { label: '3 TYPER', text: 'Patent (oppfinnelser), design, varemerke (navn/logo).' },
          { label: 'PATENTSTYRET', text: 'Norsk myndighet for IPR.' },
            ],
            practical: 'Hva ville du beskyttet av immaterielle verdier i ideen din?',
            exercises: [
            {
      id: 'ent109-6-1',
      icon: '🛡️',
      title: '3 typer',
      question: 'Hvilke typer IPR finnes?',
      choices: [
        { id: 'a', label: 'Bare patent', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Patent (oppfinnelser), design, varemerke (navn/logo)', isCorrect: true, feedback: 'Riktig! Tre hovedtyper.' },
{ id: 'c', label: 'Bare logo', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver type har egne søknadsprosess. Patent er dyrest og tregest, varemerke billigst og raskest.',
    },
    {
      id: 'ent109-6-2',
      icon: '🛡️',
      title: 'Patent kostnad',
      question: 'Hva koster patent?',
      choices: [
        { id: 'a', label: 'Gratis', isCorrect: false, feedback: 'Krever penger.' },
{ id: 'b', label: '50 000-500 000 kr per land', isCorrect: true, feedback: 'Riktig! Dyrt internasjonalt.' },
{ id: 'c', label: '1000 kr', isCorrect: false, feedback: 'For lavt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Patenter koster mye fordi de gir 20 års monopol. Vurder om verdien rettferdiggjør kostnaden.',
    },
    {
      id: 'ent109-6-3',
      icon: '🛡️',
      title: 'Varemerke',
      question: 'Hva varer evig?',
      choices: [
        { id: 'a', label: 'Patent', isCorrect: false, feedback: 'Bare 20 år.' },
{ id: 'b', label: 'Varemerke — så lenge det fornyes', isCorrect: true, feedback: 'Riktig! Coca-Cola fra 1893 fortsatt beskyttet.' },
{ id: 'c', label: 'Design', isCorrect: false, feedback: 'Begrenset tid.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Varemerker fornyes hvert 10. år. Coca-Cola-merket er over 130 år gammelt — fortsatt beskyttet.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '👔',
            title: 'Arbeidsgiveransvar',
            quote: 'Plikter med ansatte.',
            content: 'Plikter når man ansetter første medarbeider: skriftlig kontrakt, lønnsavregning, skattetrekk, arbeidsgiveravgift, OTP-pensjon, yrkesskadeforsikring, oppsigelsesvern. Bruk gjerne lønnssystem som Tripletex eller Conta. Komplekst — bruk regnskapsfører.',
            subpoints: [
                  { label: 'MANGE PLIKTER', text: 'Multi-dimensjonalt arbeidsgiveransvar.' },
          { label: 'LØNNSSYSTEM', text: 'Bruk verktøy — ikke regn manuelt.' },
            ],
            practical: 'Hva må være på plass før du ansetter første medarbeider?',
            exercises: [
            {
      id: 'ent109-7-1',
      icon: '👔',
      title: 'Hva må være på plass',
      question: 'Hva trengs?',
      choices: [
        { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Skriftlig kontrakt, OTP, yrkesskadeforsikring, lønnsavregning', isCorrect: true, feedback: 'Riktig! Multi-element.' },
{ id: 'c', label: 'Bare e-post', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Sjekkliste fra Altinn eller Skatteetaten. Komplisert å huske alt selv.',
    },
    {
      id: 'ent109-7-2',
      icon: '👔',
      title: 'OTP',
      question: 'Hva er OTP?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Akronym.' },
{ id: 'b', label: 'Obligatorisk tjenestepensjon — fra 1 ansatt med 20 %+ stilling', isCorrect: true, feedback: 'Riktig! Lovkrav.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'For alle.' },
{ id: 'd', label: 'Frivillig', isCorrect: false, feedback: 'Lovkrav.' },
      ],
      espenTip: 'Manglende OTP gir bøter. Velg pensjonsleverandør (DnB, Storebrand, KLP).',
    },
    {
      id: 'ent109-7-3',
      icon: '👔',
      title: 'Verktøy',
      question: 'Hvilke verktøy?',
      choices: [
        { id: 'a', label: 'Bare Excel', isCorrect: false, feedback: 'For komplisert.' },
{ id: 'b', label: 'Tripletex, Conta, Power Office Go — lønns- og regnskapssystemer', isCorrect: true, feedback: 'Riktig! Norske systemer.' },
{ id: 'c', label: 'Bare papir', isCorrect: false, feedback: 'Foreldet.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Lønnsystem koster 200-500 kr/mnd per ansatt. Verdt det — automatiserer skattetrekk, AGA, OTP.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '⚖️',
            title: 'Etikk i entreprenørskap',
            quote: 'Korrupsjon og rettferdig konkurranse.',
            content: 'Å gjøre det rette, selv når ingen ser på. Korrupsjon, misvisende reklame, urettferdig konkurranse — alt dette kan være lønnsomt på kort sikt, men ødelegger merkevaren og kan gi straffeforfølgelse på lang sikt. Norske lover gjelder norske bedrifter globalt.',
            subpoints: [
                  { label: 'LANGSIKT > KORTSIKT', text: 'Etisk drift bygger merkevare.' },
          { label: 'GLOBAL JURISDIKSJON', text: 'Norske lover følger norske bedrifter ut.' },
            ],
            practical: 'Hva ville du gjort hvis sjefen din ba deg betale bestikkelse for kontrakt?',
            exercises: [
            {
      id: 'ent109-8-1',
      icon: '⚖️',
      title: 'Korrupsjon',
      question: 'Hva sier norsk lov?',
      choices: [
        { id: 'a', label: 'Lovlig hvis utlandet', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Forbudt under norsk lov — også i utlandet', isCorrect: true, feedback: 'Riktig! Ekstraterritoriell jurisdiksjon.' },
{ id: 'c', label: 'Bare i Norge', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Statoil-saken (Iran 2003): bot på 80 mill USD. Norske bedrifter holdes ansvarlige globalt.',
    },
    {
      id: 'ent109-8-2',
      icon: '⚖️',
      title: 'Hovedlærdom',
      question: 'Hva er etisk hovedlærdom?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Etisk drift bygger merkevare; uetisk drift ødelegger den', isCorrect: true, feedback: 'Riktig! Strategisk verdi.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Patagonia, Stormberg, Tomra — bygget på etisk drift. Konkurransefortrinn.',
    },
    {
      id: 'ent109-8-3',
      icon: '⚖️',
      title: 'Test',
      question: 'Etisk test?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Aviskolonne-test: ville jeg vært stolt om handlingen sto på forsiden', isCorrect: true, feedback: 'Riktig! Praktisk test.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Etikk er bredere.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hvis du ikke vil at moren din ser handlingen i avisen — ikke gjør det.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '📊',
            title: 'Dokumentasjon for vekst',
            quote: 'Investorer krever orden.',
            content: 'Investorer, banker og store kunder forventer dokumentert HMS, GDPR-compliance, rene avtaler. Mange gründere mister investorer pga rotete dokumentasjon — selv med god ide. Orden i sysakene gir troverdighet og trygghet for vekst.',
            subpoints: [
                  { label: 'DUE DILIGENCE', text: 'Investorer går gjennom alt.' },
          { label: 'PROAKTIV', text: 'Bygg dokumentasjon fra start.' },
            ],
            practical: 'Hva ville investorer sett på i \'due diligence\'?',
            exercises: [
            {
      id: 'ent109-9-1',
      icon: '📊',
      title: 'Due diligence',
      question: 'Hva er det?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Investors gjennomgang av bedriftens dokumentasjon før investering', isCorrect: true, feedback: 'Riktig! Standard prosess.' },
{ id: 'c', label: 'Bare regnskap', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Frivillig prosess.' },
      ],
      espenTip: 'DD inkluderer juridisk, økonomisk, kommersiell, teknisk vurdering. Tar uker.',
    },
    {
      id: 'ent109-9-2',
      icon: '📊',
      title: 'Hva sjekkes',
      question: 'Hva sjekker investorer?',
      choices: [
        { id: 'a', label: 'Bare ide', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Avtaler, IPR, regnskap, HMS, GDPR, ansatt-kontrakter', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
{ id: 'c', label: 'Bare team', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hvis dokumentasjon er rotete, krever investorene rabatt — eller dropper investeringen.',
    },
    {
      id: 'ent109-9-3',
      icon: '📊',
      title: 'Proaktiv',
      question: 'Hvorfor bygge tidlig?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Vanskelig å rydde opp senere — bedre å gjøre rett fra start', isCorrect: true, feedback: 'Riktig! Forebygging.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare for tek', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Standard advokat-tariff for å rydde opp i etablert bedrift: 500 000+. Bedre å betale 50 000 i starten.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎯',
            title: 'Hovedlærdom — orden gir vekst',
            quote: 'Profesjonalitet fra dag 1.',
            content: 'Orden i sysakene gir troverdighet og trygghet for vekst. Investorer, banker og store kunder forventer dokumentert HMS, GDPR-compliance, rene avtaler. Uten det stoppes mange dører — uansett hvor god ideen er.',
            subpoints: [
                  { label: 'PROFESJONELL', text: 'Behandle bedriften som profesjonell organisasjon.' },
          { label: 'STRATEGISK', text: 'Juridisk arbeid er strategisk forsvar.' },
            ],
            practical: 'Hva er den viktigste lærdommen om juss og etikk for entreprenører?',
            exercises: [
            {
      id: 'ent109-10-1',
      icon: '🎯',
      title: 'Hovedlærdom',
      question: 'Hva er den viktigste?',
      choices: [
        { id: 'a', label: 'Bare ide teller', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Orden i sysakene = grunnlag for vekst og investering', isCorrect: true, feedback: 'Riktig! Multi-stakeholder-krav.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Mange suksess-startups har juridiske problemer som hindrer vekst. Forebygg fra start.',
    },
    {
      id: 'ent109-10-2',
      icon: '🎯',
      title: 'Investering',
      question: 'Hvor mye investere i juss?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: '5-10 % av tidlig kapital — verdt forebyggingen', isCorrect: true, feedback: 'Riktig! Akseptabel investering.' },
{ id: 'c', label: '100 %', isCorrect: false, feedback: 'For mye.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Rådene fra advokat før etablering kan spare millioner senere. Betal nå eller mer senere.',
    },
    {
      id: 'ent109-10-3',
      icon: '🎯',
      title: 'Hovedfeil',
      question: 'Klassisk feil?',
      choices: [
        { id: 'a', label: 'For mye juss', isCorrect: false, feedback: 'Sjelden problem.' },
{ id: 'b', label: 'Ignorere juss til problemer oppstår — for sent', isCorrect: true, feedback: 'Riktig! Reaktiv tilnærming.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: '\'Penny wise, pound foolish\' — spare på advokat = miste investering eller kunde.',
    },
            ],
          },
        ]

        export default function LovverkAvtalerHmsModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-09"
              moduleTitle="Lovverk, avtaler og HMS"
              moduleIcon="⚖️"
              storageKey="learning-ent1-lovverk-avtaler-hms"
              completeRoute="/learning/ent1/lovverk-avtaler-hms/complete"
              phases={phases}
              intro="Sikkerhet og juridisk trygghet — rammene som beskytter bedriften og gjør vekst mulig. Dårlig juridisk arbeid kan ta livet av selv den beste ide."
              vissteduAt="Norske gründere ignorerer ofte juridiske detaljer i tidlig fase. Det kommer tilbake som store problemer når bedriften vokser. Gjør det rett fra start."
              espenSier="Orden i sysakene gir troverdighet og trygghet for vekst. Investorer, banker og store kunder forventer dokumentert HMS, GDPR-compliance og rene avtaler."
      presentationLink={{ route: '/learning/presentations/ent1/lovverk-avtaler-hms', description: 'Lovverk, avtaler og HMS — 10 slides' }}
            />
          )
        }
