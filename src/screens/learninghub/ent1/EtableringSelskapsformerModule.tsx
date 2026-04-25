        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🏛️',
            title: 'Valg av selskapsform',
            quote: 'ENK eller AS — eller noe annet.',
            content: 'Hovedvalget i Norge: Enkeltpersonforetak (ENK) vs Aksjeselskap (AS). ENK er enkelt og billig, men gir personlig ansvar. AS gir begrenset ansvar, men krever 30 000 kr i aksjekapital og mer formalitet. Andre former: ANS, DA, NUF — sjeldnere brukt.',
            subpoints: [
                  { label: 'ENK = ENKELT', text: 'Lav terskel, men personlig ansvar.' },
          { label: 'AS = TRYGT', text: 'Begrenset ansvar, men mer formalitet og kapitalkrav.' },
            ],
            practical: 'Hva ville du valgt for et lite sideprosjekt — ENK eller AS?',
            exercises: [
            {
      id: 'ent105-1-1',
      icon: '🏛️',
      title: 'Hovedvalg',
      question: 'Hva er hovedvalget i Norge?',
      choices: [
        { id: 'a', label: 'ENK eller AS', isCorrect: true, feedback: 'Riktig! De vanligste formene.' },
{ id: 'b', label: 'Bare AS', isCorrect: false, feedback: 'For smalt.' },
{ id: 'c', label: 'Bare ENK', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Over 90 % av norske bedrifter er enten ENK eller AS. De andre formene er nisje.',
    },
    {
      id: 'ent105-1-2',
      icon: '🏛️',
      title: 'Forskjell',
      question: 'Hovedforskjell ENK vs AS?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'ENK = personlig ansvar. AS = begrenset ansvar (kun aksjekapital risikeres)', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Begge brukes alle størrelser.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'ENK: bedriften = du. AS: bedriften er egen juridisk enhet adskilt fra eier.',
    },
    {
      id: 'ent105-1-3',
      icon: '🏛️',
      title: 'Når ENK',
      question: 'Når passer ENK?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Soloprenører, lavrisiko, lite kapital, sideprosjekt', isCorrect: true, feedback: 'Riktig! Lav-terskel-løsning.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Mange frilansere og konsulenter starter ENK. Kan bytte til AS når omsetningen vokser.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📜',
            title: 'Aksjeselskap (AS)',
            quote: 'Begrenset ansvar.',
            content: 'AS krever minimum 30 000 kr i aksjekapital. Begrenset ansvar — eierne risikerer kun aksjekapitalen, ikke privat formue. Du kan jobbe som ansatt i ditt eget AS. Krever revisor over visse grenser. Standard for bedrifter med vekstambisjoner og ekstern finansiering.',
            subpoints: [
                  { label: '30 000 KR', text: 'Minimum aksjekapital.' },
          { label: 'BEGRENSET ANSVAR', text: 'Eierne risikerer kun aksjekapitalen.' },
            ],
            practical: 'Hva er minste aksjekapital for AS i Norge?',
            exercises: [
            {
      id: 'ent105-2-1',
      icon: '📜',
      title: 'Aksjekapital',
      question: 'Minimum aksjekapital?',
      choices: [
        { id: 'a', label: '10 000 kr', isCorrect: false, feedback: 'For lavt.' },
{ id: 'b', label: '30 000 kr', isCorrect: true, feedback: 'Riktig! Senket fra 100 000 i 2012.' },
{ id: 'c', label: '100 000 kr', isCorrect: false, feedback: 'Gammel grense, ikke gjeldende.' },
{ id: 'd', label: '1 mill kr', isCorrect: false, feedback: 'For høyt.' },
      ],
      espenTip: 'Kravet ble senket fra 100 000 til 30 000 i 2012 for å gjøre AS-etablering enklere.',
    },
    {
      id: 'ent105-2-2',
      icon: '📜',
      title: 'Ansvar',
      question: 'Hvor stort er eiers ansvar?',
      choices: [
        { id: 'a', label: 'Ubegrenset', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Begrenset til aksjekapitalen — privat formue er beskyttet', isCorrect: true, feedback: 'Riktig! Hovedfordel ved AS.' },
{ id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hvis AS-et går konkurs, taper eierne kun aksjekapitalen. Privat formue er beskyttet.',
    },
    {
      id: 'ent105-2-3',
      icon: '📜',
      title: 'Krav',
      question: 'Hvilke andre krav har AS?',
      choices: [
        { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Mange krav.' },
{ id: 'b', label: 'Styre, revisor (over visse grenser), årsregnskap, generalforsamling', isCorrect: true, feedback: 'Riktig! Formelle krav.' },
{ id: 'c', label: 'Bare aksjekapital', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'AS krever mer formalitet enn ENK. Pris for begrenset ansvar.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '👤',
            title: 'Enkeltpersonforetak (ENK)',
            quote: 'Lav terskel, personlig ansvar.',
            content: 'ENK: lav etableringsterskel — kun registrering i Brønnøysund (gratis i Foretaksregisteret, gebyr i Enhetsregisteret). Men: fullt personlig ansvar for gjeld og forpliktelser. Bedriften = du. Banken kan ta huset hvis det går galt. Vanlig for soloprenører og bi-virksomheter.',
            subpoints: [
                  { label: 'LAV TERSKEL', text: 'Enkel og billig å starte.' },
          { label: 'PERSONLIG ANSVAR', text: 'Bedriften = du. Privat formue er ikke beskyttet.' },
            ],
            practical: 'Hva er risikoen ved ENK hvis bedriften går konkurs?',
            exercises: [
            {
      id: 'ent105-3-1',
      icon: '👤',
      title: 'Etablering',
      question: 'Hvordan etablere ENK?',
      choices: [
        { id: 'a', label: 'Bare via advokat', isCorrect: false, feedback: 'Ikke nødvendig.' },
{ id: 'b', label: 'Registrere i Brønnøysund — kan gjøres på nett, raskt', isCorrect: true, feedback: 'Riktig! Lav terskel.' },
{ id: 'c', label: 'Bare via bank', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Altinn-portalen tar deg gjennom prosessen. Tar typisk 1-2 dager å bli registrert.',
    },
    {
      id: 'ent105-3-2',
      icon: '👤',
      title: 'Ansvar',
      question: 'Hva er ENK-ansvar?',
      choices: [
        { id: 'a', label: 'Begrenset', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Fullt personlig ansvar — privat formue er ikke beskyttet', isCorrect: true, feedback: 'Riktig! Hovedrisikoen.' },
{ id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Kreditorer kan kreve betaling fra privat formue, hus, sparepenger. Stor personlig risiko.',
    },
    {
      id: 'ent105-3-3',
      icon: '👤',
      title: 'Når',
      question: 'Når passer ENK?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Soloprenør, lavrisiko-virksomhet, sideprosjekt, lite kapital', isCorrect: true, feedback: 'Riktig! Lav-terskel-løsning.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange konsulenter, frilansere starter ENK. Bytter ofte til AS når omsetningen passerer 500 000-1 mill.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📝',
            title: 'Registreringsprosessen',
            quote: 'Brønnøysund og Altinn.',
            content: 'Samordnet registermelding via Altinn — én utfylling registrerer deg i alle relevante registre (Foretaksregisteret, Enhetsregisteret, MVA hvis omsetning > 50 000). Får organisasjonsnummer på dagen ofte. Helt gratis for ENK i Enhetsregisteret, gebyr for AS-registrering.',
            subpoints: [
                  { label: 'ALTINN', text: 'Digital plattform — én søknad.' },
          { label: 'ORG.NR.', text: 'Får organisasjonsnummer raskt — ofte samme dag.' },
            ],
            practical: 'Hva er fordelen med digital registrering via Altinn?',
            exercises: [
            {
      id: 'ent105-4-1',
      icon: '📝',
      title: 'Hvor',
      question: 'Hvor registreres bedrifter?',
      choices: [
        { id: 'a', label: 'Skattetaten', isCorrect: false, feedback: 'Skattetaten er for skatt.' },
{ id: 'b', label: 'Brønnøysundregistrene via Altinn', isCorrect: true, feedback: 'Riktig! Sentral registrering.' },
{ id: 'c', label: 'Bare hos kommunen', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Brønnøysundregistrene er sentralt foretaksregister. Altinn er den digitale grensesnittet.',
    },
    {
      id: 'ent105-4-2',
      icon: '📝',
      title: 'Mva',
      question: 'Når kreves mva-registrering?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Lovkrav over visse grenser.' },
{ id: 'b', label: 'Når omsetningen passerer 50 000 kr per år', isCorrect: true, feedback: 'Riktig! Lovgrense.' },
{ id: 'c', label: 'Bare for B2B', isCorrect: false, feedback: 'Gjelder all mva-pliktig omsetning.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Frem til 50 000 kr i omsetning er du fritatt for mva. Over: må registreres og kreve inn mva.',
    },
    {
      id: 'ent105-4-3',
      icon: '📝',
      title: 'Tidsbruk',
      question: 'Hvor lang tid?',
      choices: [
        { id: 'a', label: 'Bare måneder', isCorrect: false, feedback: 'For tregt.' },
{ id: 'b', label: 'ENK: timer-dager. AS: dager-uker', isCorrect: true, feedback: 'Riktig! Norske rammer er effektive.' },
{ id: 'c', label: 'Bare år', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Norge er rangert høyt internasjonalt for hvor lett det er å starte bedrift.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🛡️',
            title: 'Skatter og avgifter',
            quote: 'MVA, skattetrekk, arbeidsgiveravgift.',
            content: 'MVA: 25 % standard, 15 % på mat, 12 % på persontransport, 0 % på enkelte tjenester. Skattetrekk: 15 % forskuddsskatt for ENK. AS-eiere får utbytte med 35,2 % skatt. Arbeidsgiveravgift: 14,1 % i sone 1, lavere i andre soner. Komplekst — bruk regnskapsfører.',
            subpoints: [
                  { label: 'MVA', text: '25 % standard, lavere på mat, transport.' },
          { label: 'ENK vs AS', text: 'Ulike skatteregler for ulike former.' },
            ],
            practical: 'Hva er standard mva-sats i Norge?',
            exercises: [
            {
      id: 'ent105-5-1',
      icon: '🛡️',
      title: 'Mva',
      question: 'Hva er standard mva i Norge?',
      choices: [
        { id: 'a', label: '12 %', isCorrect: false, feedback: 'Det er på persontransport.' },
{ id: 'b', label: '25 %', isCorrect: true, feedback: 'Riktig! Standardsatsen.' },
{ id: 'c', label: '15 %', isCorrect: false, feedback: 'Det er på mat.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mat: 15 %. Persontransport: 12 %. Standard: 25 %. Helse, undervisning, finans: 0 %.',
    },
    {
      id: 'ent105-5-2',
      icon: '🛡️',
      title: 'ENK-skatt',
      question: 'Hvordan skatter ENK?',
      choices: [
        { id: 'a', label: 'Bare som ansatt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Personlig næringsinntekt — beskattes med personlig inntektsskatt', isCorrect: true, feedback: 'Riktig! Som personlig inntekt.' },
{ id: 'c', label: 'Aldri skatt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'ENK-overskudd er personlig inntekt. Trygdeavgift, trinnskatt, kommunal skatt — opp til ~50 %.',
    },
    {
      id: 'ent105-5-3',
      icon: '🛡️',
      title: 'Bruk regnskapsfører',
      question: 'Når bruke regnskapsfører?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Anbefales i de fleste tilfeller.' },
{ id: 'b', label: 'Fra dag 1 — komplekst regelverk gir lett feil med store konsekvenser', isCorrect: true, feedback: 'Riktig! Spar tid og unngå feil.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Selv små bør ha hjelp.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Regnskapsfører koster 1500-3000 kr/mnd for små bedrifter. Verdien er typisk høyere — unngår feil og frigjør tid.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '📄',
            title: 'Forsikringer',
            quote: 'Yrkesskade, ansvarsforsikring, OTP.',
            content: 'Yrkesskadeforsikring er lovpålagt for alle ansatte (også deg selv hvis du er ansatt i eget AS). Ansvarsforsikring beskytter bedriften mot erstatningskrav fra kunder. OTP (obligatorisk tjenestepensjon) er pålagt fra 1 ansatt med over 20 % stilling. Vurder også: avbruddsforsikring, cyber-forsikring.',
            subpoints: [
                  { label: 'YRKESSKADE', text: 'Lovpålagt for alle ansatte.' },
          { label: 'ANSVARSFORSIKRING', text: 'Beskytter mot kundekrav.' },
            ],
            practical: 'Hvilke forsikringer ville du tegnet for en ny bedrift?',
            exercises: [
            {
      id: 'ent105-6-1',
      icon: '📄',
      title: 'Lovpålagt',
      question: 'Hvilke forsikringer er lovpålagt?',
      choices: [
        { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Yrkesskadeforsikring + OTP fra 1 ansatt med 20 %+ stilling', isCorrect: true, feedback: 'Riktig! Minimumskrav.' },
{ id: 'c', label: 'Bare brann', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Manglende lovpålagt forsikring kan gi store bøter og personlig erstatningsansvar.',
    },
    {
      id: 'ent105-6-2',
      icon: '📄',
      title: 'Ansvarsforsikring',
      question: 'Hva dekker den?',
      choices: [
        { id: 'a', label: 'Bare brann', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Erstatningskrav fra tredjepart (kunder, leverandører)', isCorrect: true, feedback: 'Riktig! Stor risiko-reduksjon.' },
{ id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Klassisk eksempel: kunde skader seg på dine premisser. Ansvarsforsikring dekker erstatningen.',
    },
    {
      id: 'ent105-6-3',
      icon: '📄',
      title: 'Pris',
      question: 'Cirka pris for grunnleggende forsikrings-pakke?',
      choices: [
        { id: 'a', label: 'Gratis', isCorrect: false, feedback: 'Koster penger.' },
{ id: 'b', label: '5 000-15 000 kr/år for liten bedrift', isCorrect: true, feedback: 'Riktig! Akseptabel kostnad mot risiko.' },
{ id: 'c', label: '100 000 kr/år', isCorrect: false, feedback: 'Vanligvis lavere for små.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Sammenlign tilbud fra If, Gjensidige, Tryg. Selvbetjent online-portaler gjør det enkelt.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🏷️',
            title: 'Navn og merkevare',
            quote: 'Foretaksnavn og varemerke.',
            content: 'Foretaksnavnet må være unikt i Norge — sjekk på Brønnøysund. Vil du beskytte logo og merke, må du registrere varemerke hos Patentstyret (2 700 kr for første klasse, 1 350 for tilleggsklasser). Internasjonalt kan beskyttelsen utvides via WIPO Madrid-protokollen.',
            subpoints: [
                  { label: 'UNIKT NAVN', text: 'Sjekk Brønnøysund før du velger.' },
          { label: 'PATENTSTYRET', text: 'Varemerke-beskyttelse for logo og navn.' },
            ],
            practical: 'Hvordan ville du valgt navn til en ny bedrift?',
            exercises: [
            {
      id: 'ent105-7-1',
      icon: '🏷️',
      title: 'Foretaksnavn',
      question: 'Hvor sjekkes navn?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Brønnøysund — må være unikt', isCorrect: true, feedback: 'Riktig! Lovkrav om unikhet.' },
{ id: 'c', label: 'Bare i butikk', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Foretaksnavn-database er åpen på brreg.no. Sjekk før du velger og registrerer.',
    },
    {
      id: 'ent105-7-2',
      icon: '🏷️',
      title: 'Varemerke',
      question: 'Hvem registrerer varemerker?',
      choices: [
        { id: 'a', label: 'Bare Brønnøysund', isCorrect: false, feedback: 'Det er foretaksnavn.' },
{ id: 'b', label: 'Patentstyret', isCorrect: true, feedback: 'Riktig! Egen myndighet.' },
{ id: 'c', label: 'Skattetaten', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Kommunen', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Patentstyret håndterer varemerker, design og patenter. Egne søknadsprosesser per type.',
    },
    {
      id: 'ent105-7-3',
      icon: '🏷️',
      title: 'Pris',
      question: 'Hvor mye koster varemerke i Norge?',
      choices: [
        { id: 'a', label: 'Gratis', isCorrect: false, feedback: 'Koster penger.' },
{ id: 'b', label: 'Ca 2 700 kr for første klasse', isCorrect: true, feedback: 'Riktig! Akseptabel kostnad for beskyttelse.' },
{ id: 'c', label: '100 000 kr', isCorrect: false, feedback: 'For høyt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Varemerke gjelder i 10 år, fornybart. Krever aktiv registrering — ikke automatisk.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🤝',
            title: 'Avtaler mellom gründere',
            quote: 'Aksjonæravtale er gull verdt.',
            content: 'Aksjonæravtale: hvem som bestemmer hva, hvordan utbytter fordeles, hva som skjer hvis en gründer slutter eller dør. Mange gründere venter til konflikten oppstår — for sent. Klassisk eksempel: To venner uten avtale, konflikt etter 2 år, rettssak i 3 år, bedriften gikk konkurs.',
            subpoints: [
                  { label: 'PROAKTIV', text: 'Skriv avtalen før konflikten.' },
          { label: 'DEKK ALT', text: 'Beslutninger, utbytte, exit, dødsfall.' },
            ],
            practical: 'Hvilke punkter ville du sikret i aksjonæravtale med medgründer?',
            exercises: [
            {
      id: 'ent105-8-1',
      icon: '🤝',
      title: 'Når',
      question: 'Når skrive aksjonæravtale?',
      choices: [
        { id: 'a', label: 'Når konflikten oppstår', isCorrect: false, feedback: 'For sent.' },
{ id: 'b', label: 'Før dere starter sammen — alltid før konflikt', isCorrect: true, feedback: 'Riktig! Proaktiv.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Når dere er i forelskede gründer-fasen er det enklest å bli enige. Konflikt-fase er for sent.',
    },
    {
      id: 'ent105-8-2',
      icon: '🤝',
      title: 'Innhold',
      question: 'Hva skal aksjonæravtale dekke?',
      choices: [
        { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Beslutninger, utbytte, eksit, dødsfall, vetorett, kjøpsrett', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Standard mal finnes — bruk advokat for å tilpasse til deres situasjon.',
    },
    {
      id: 'ent105-8-3',
      icon: '🤝',
      title: 'Kostnad',
      question: 'Hva koster aksjonæravtale?',
      choices: [
        { id: 'a', label: 'Gratis', isCorrect: false, feedback: 'Koster typisk penger.' },
{ id: 'b', label: '5 000-30 000 kr for advokat-utforming', isCorrect: true, feedback: 'Riktig! Verdt det.' },
{ id: 'c', label: '100 000+', isCorrect: false, feedback: 'Sjelden så høyt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Spar penger på dette og du kan tape millioner senere. Klassisk klok investering.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Snapchat-rettssaken',
            quote: 'Hva som skjer uten avtale.',
            content: 'Snapchat ble stiftet av Evan Spiegel, Bobby Murphy og Reggie Brown. Brown ble skviset ut i tidlig fase — over 150 millioner dollar i rettssak senere. Konflikt om eierskap er en hovedårsak til at gründerteam kollapser. Skriv aksjonæravtale TIDLIG.',
            subpoints: [
                  { label: 'KONFLIKT-RISIKO', text: 'Tidlig konflikt om eierskap er vanlig.' },
          { label: 'DYRT', text: 'Rettssaker kan koste mer enn aksjonæravtale 1000x.' },
            ],
            practical: 'Hva ville du gjort annerledes hvis du var Snapchat-grunnlegger?',
            exercises: [
            {
      id: 'ent105-9-1',
      icon: '⚠️',
      title: 'Hva skjedde',
      question: 'Hva skjedde med Reggie Brown?',
      choices: [
        { id: 'a', label: 'Forblev grunnlegger', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ble skviset ut, saksøkte og fikk over 150 mill USD', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Helt fiktivt', isCorrect: false, feedback: 'Reell sak.' },
      ],
      espenTip: 'Snapchat-saken er studie-objekt på business schools globalt. Lærdom om aksjonæravtale.',
    },
    {
      id: 'ent105-9-2',
      icon: '⚠️',
      title: 'Lærdom',
      question: 'Hva er lærdommen?',
      choices: [
        { id: 'a', label: 'Aldri samarbeid', isCorrect: false, feedback: 'For dramatisk.' },
{ id: 'b', label: 'Skriv aksjonæravtale TIDLIG — før konflikt', isCorrect: true, feedback: 'Riktig! Proaktiv beskyttelse.' },
{ id: 'c', label: 'Bare ha én grunnlegger', isCorrect: false, feedback: 'Sjelden mulig.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange gründerteam kollapser pga konflikt. Avtalen er forsikring mot dette.',
    },
    {
      id: 'ent105-9-3',
      icon: '⚠️',
      title: 'Frekvens',
      question: 'Hvor vanlig er gründerkonflikter?',
      choices: [
        { id: 'a', label: 'Sjelden', isCorrect: false, feedback: 'Mye vanligere.' },
{ id: 'b', label: 'Veldig vanlige — ofte hovedårsak til startup-kollaps', isCorrect: true, feedback: 'Riktig! Vanlig problem.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt fenomen.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'Forskning: 65 % av startup-kollaps har en gründer-konflikt-komponent.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎯',
            title: 'Velge riktig form',
            quote: 'Match til ambisjon og risiko.',
            content: 'Velg form som gir nødvendig trygghet og rom for vekst. Ikke overinvester i AS hvis du tester en sideforretning — ENK er ofte rett start. Vurder å bytte til AS når omsetningen vokser, du tar inn investorer, eller risikoen øker. Mange suksess-bedrifter startet ENK.',
            subpoints: [
                  { label: 'MATCH', text: 'Form skal matche ambisjon og risiko.' },
          { label: 'BYTTE', text: 'Du kan starte ENK og bytte til AS senere.' },
            ],
            practical: 'Hva ville du valgt for: a) konsulent-bivirksomhet, b) tek-startup med vekstambisjoner?',
            exercises: [
            {
      id: 'ent105-10-1',
      icon: '🎯',
      title: 'Soloprenør',
      question: 'Hva passer en konsulent som starter alene?',
      choices: [
        { id: 'a', label: 'AS umiddelbart', isCorrect: false, feedback: 'Ofte overinvestering.' },
{ id: 'b', label: 'ENK først — kan bytte til AS hvis omsetningen vokser', isCorrect: true, feedback: 'Riktig! Lavterskel-tilnærming.' },
{ id: 'c', label: 'ANS', isCorrect: false, feedback: 'Krever to personer.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Mange frilanskonsulenter forblir ENK hele karrieren. Fungerer godt hvis omsetning er begrenset.',
    },
    {
      id: 'ent105-10-2',
      icon: '🎯',
      title: 'Vekst-startup',
      question: 'Hva passer tek-startup med ambisjoner?',
      choices: [
        { id: 'a', label: 'ENK', isCorrect: false, feedback: 'For begrensende.' },
{ id: 'b', label: 'AS — kreves for å ta inn investorer', isCorrect: true, feedback: 'Riktig! Investor-vennlig.' },
{ id: 'c', label: 'ANS', isCorrect: false, feedback: 'Sjelden brukt for tek.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Investorer kjøper aksjer i AS. ENK kan ikke ta inn ekstern kapital på samme måte.',
    },
    {
      id: 'ent105-10-3',
      icon: '🎯',
      title: 'Bytte',
      question: 'Kan man bytte form senere?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — kan bytte ENK til AS, ofte naturlig vei', isCorrect: true, feedback: 'Riktig! Strategisk fleksibilitet.' },
{ id: 'c', label: 'Bare en gang i livet', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Skattetaten har egne regler for konvertering. Bruk regnskapsfører/advokat ved bytte.',
    },
            ],
          },
        ]

        export default function EtableringSelskapsformerModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-05"
              moduleTitle="Etablering og selskapsformer"
              moduleIcon="🏛️"
              storageKey="learning-ent1-etablering-selskapsformer"
              completeRoute="/learning/ent1/etablering-selskapsformer/complete"
              phases={phases}
              intro="Fra idé til juridisk enhet — selskapsformer, registrering og første praktiske steg. Riktig form gir nødvendig trygghet og rom for vekst."
              vissteduAt="I Norge registreres rundt 60 000 nye foretak hvert år. ENK er vanligst for soloprenører, AS er standard for bedrifter med vekstambisjoner."
              espenSier="Mange gründere overinvesterer i AS for tidlig. ENK er ofte rett start — kan bytte til AS senere når omsetningen vokser."
      presentationLink={{ route: '/learning/presentations/ent1/etablering-selskapsformer', description: 'Etablering og selskapsformer — 10 slides' }}
            />
          )
        }
