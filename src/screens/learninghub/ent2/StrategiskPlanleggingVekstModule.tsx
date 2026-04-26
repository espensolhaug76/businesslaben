        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🎯',
            title: 'Hva er strategi?',
            quote: 'Strategi er valg av posisjon og retning.',
            content: 'Strategi handler om hvordan bedriften skaper og leverer unik verdi over tid. Det er sammenhengende valg om hvor man konkurrerer, hvordan man vinner, og hvilke ressurser man bruker. Michael Porter skiller mellom operasjonell effektivitet (gjøre samme bedre) og strategi (gjøre noe annet). Equinor flyttet fra olje mot havvind — strategisk valg.',
            subpoints: [
                  { label: 'VALG', text: 'Strategi er hva du gjør OG ikke gjør.' },
          { label: 'RETNING', text: 'Lang sikt, ikke daglige beslutninger.' },
            ],
            practical: 'Hva er din bedrifts strategiske valg de neste tre årene?',
            exercises: [
            {
      id: 'ent211-1-1',
      icon: '🎯',
      title: 'Definisjon',
      question: 'Hva er strategi?',
      choices: [
        { id: 'a', label: 'Bare daglige beslutninger', isCorrect: false, feedback: 'Det er operasjonelt.' },
{ id: 'b', label: 'Sammenhengende valg om posisjon og retning på lang sikt', isCorrect: true, feedback: 'Riktig! Porters definisjon.' },
{ id: 'c', label: 'Bare budsjett', isCorrect: false, feedback: 'Strategi gir budsjettet retning.' },
{ id: 'd', label: 'Tilfeldige valg', isCorrect: false, feedback: 'Strategi er strukturert.' },
      ],
      espenTip: 'Porter: Strategi er å velge en unik posisjon i markedet.',
    },
    {
      id: 'ent211-1-2',
      icon: '🎯',
      title: 'Porter',
      question: 'Hva skiller strategi fra operasjonell effektivitet?',
      choices: [
        { id: 'a', label: 'Strategi = gjøre noe annet, OE = gjøre samme bedre', isCorrect: true, feedback: 'Riktig! Klar Porter-distinksjon.' },
{ id: 'b', label: 'Ingen forskjell', isCorrect: false, feedback: 'Stor forskjell.' },
{ id: 'c', label: 'Bare størrelse', isCorrect: false, feedback: 'Begrepsmessig forskjell.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt skille.' },
      ],
      espenTip: 'OE er nødvendig men ikke nok — uten unik posisjon konkurrerer alle på pris.',
    },
    {
      id: 'ent211-1-3',
      icon: '🎯',
      title: 'Equinor',
      question: 'Hvorfor er Equinors satsning på havvind strategisk?',
      choices: [
        { id: 'a', label: 'Bare trend', isCorrect: false, feedback: 'Strukturelt valg.' },
{ id: 'b', label: 'Strategisk omposisjonering — bygger fremtidsbedrift på eksisterende kompetanse', isCorrect: true, feedback: 'Riktig! Klassisk strategisk valg.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisst valg.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Massive investeringer.' },
      ],
      espenTip: 'Bruker offshore-kompetansen til å bygge ny vekstmotor — strategi er å se trender og posisjonere seg.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🌍',
            title: 'PESTEL-analyse',
            quote: 'Forstå makro-omgivelsene.',
            content: 'PESTEL kartlegger Politiske, Økonomiske, Sosiokulturelle, Teknologiske, Miljømessige og Lovmessige faktorer som påvirker bedriften. Politiske vedtak om elbiler påvirker Tesla og bilbransjen. Demografi (aldring) påvirker helse-startups. Teknologi (AI) endrer alle bransjer. Klimakrav påvirker Equinor. Bruk PESTEL før strategiske valg.',
            subpoints: [
                  { label: 'MAKRO', text: 'Faktorer du ikke kontrollerer.' },
          { label: 'BREDT', text: 'Tving deg til å se utenfor egen bransje.' },
            ],
            practical: 'Hvilken PESTEL-faktor påvirker din bedrift mest?',
            exercises: [
            {
      id: 'ent211-2-1',
      icon: '🌍',
      title: 'Hva',
      question: 'Hva er PESTEL?',
      choices: [
        { id: 'a', label: 'Bare politisk', isCorrect: false, feedback: 'Seks faktorer.' },
{ id: 'b', label: 'Politisk, Økonomisk, Sosiokulturelt, Teknologisk, Miljø, Lovmessig', isCorrect: true, feedback: 'Riktig! Bredt rammeverk.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'd', label: 'Konkurrenter', isCorrect: false, feedback: 'Det er Porter 5.' },
      ],
      espenTip: 'PESTEL = makroanalyse. Porter 5 = bransjeanalyse. SWOT = bedriftsanalyse.',
    },
    {
      id: 'ent211-2-2',
      icon: '🌍',
      title: 'Eksempel',
      question: 'Hvordan påvirket teknologi-faktoren Kodak?',
      choices: [
        { id: 'a', label: 'Ikke i det hele tatt', isCorrect: false, feedback: 'Knuste dem.' },
{ id: 'b', label: 'Digitalisering ødela film-forretningen — Kodak så det men handlet ikke', isCorrect: true, feedback: 'Riktig! Klassisk strategi-feil.' },
{ id: 'c', label: 'Hjalp dem', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Bare litt', isCorrect: false, feedback: 'Eksistensielt.' },
      ],
      espenTip: 'Kodak oppfant digital fotografering men beholdt fokus på film. Teknologi-trend de ikke responderte på.',
    },
    {
      id: 'ent211-2-3',
      icon: '🌍',
      title: 'Bruk',
      question: 'Når bruker du PESTEL?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Standard verktøy.' },
{ id: 'b', label: 'Ved strategi-utvikling og store investeringer', isCorrect: true, feedback: 'Riktig! Strategisk planlegging.' },
{ id: 'c', label: 'Bare daglig', isCorrect: false, feedback: 'Makro-perspektiv.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Brukes typisk hvert 1-3 år ved strategi-revisjon, eller ved store omstillinger.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🏰',
            title: 'Porters 5 Forces (avansert)',
            quote: 'Bransjestruktur og lønnsomhet.',
            content: 'Porter 5: Konkurrenter (rivalitet), nye aktører (inntreden), substitutter, leverandørmakt, kundemakt. Sammen avgjør de bransjens lønnsomhet. Norsk dagligvare har sterk leverandørmakt (få kjeder), lav inntreden (regulering), men sterk konkurranse. Streaming endrer Hollywood — substitutter forandrer alt. Bruk Porter 5 før du går inn i en bransje.',
            subpoints: [
                  { label: 'BRANSJE', text: 'Forklarer hvorfor noen bransjer er lønnsomme.' },
          { label: 'VALG', text: 'Sterke krefter = lav lønnsomhet, svake = høy.' },
            ],
            practical: 'Hvilken av de 5 kreftene er sterkest i din bransje?',
            exercises: [
            {
      id: 'ent211-3-1',
      icon: '🏰',
      title: 'Modell',
      question: 'Porter 5 sine fem krefter?',
      choices: [
        { id: 'a', label: 'Bare konkurrenter', isCorrect: false, feedback: 'Fem faktorer.' },
{ id: 'b', label: 'Rivalitet, inntreden, substitutter, leverandørmakt, kundemakt', isCorrect: true, feedback: 'Riktig! Klassiker.' },
{ id: 'c', label: 'Bare pris', isCorrect: false, feedback: 'Mer komplekst.' },
{ id: 'd', label: 'PESTEL', isCorrect: false, feedback: 'Det er noe annet.' },
      ],
      espenTip: 'Lærte 1979, fortsatt grunnstein i strategi-undervisning.',
    },
    {
      id: 'ent211-3-2',
      icon: '🏰',
      title: 'Bruk',
      question: 'Hva forteller Porter 5?',
      choices: [
        { id: 'a', label: 'Bedrifts-strategi', isCorrect: false, feedback: 'Det er én anvendelse.' },
{ id: 'b', label: 'Bransjens strukturelle attraktivitet og lønnsomhet', isCorrect: true, feedback: 'Riktig! Bransje-nivå.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert analyse.' },
      ],
      espenTip: 'Sterk leverandørmakt + stor kundemakt = vanskelig bransje uavhengig av strategi.',
    },
    {
      id: 'ent211-3-3',
      icon: '🏰',
      title: 'Eksempel',
      question: 'Hvorfor er flyselskaper ulønnsomme?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Sterke krefter — leverandører (fly), kunder (pris), konkurranse, substitutter', isCorrect: true, feedback: 'Riktig! Klassisk Porter-eksempel.' },
{ id: 'c', label: 'Bare flaks', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Bransjestrukturelt.' },
      ],
      espenTip: 'Warren Buffett: \'Hvis Wright-brødrene visste hvor lite penger flyselskaper ville tjene, hadde de skutt seg selv ned.\'',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📊',
            title: 'BCG-matrisen',
            quote: 'Portefølje-strategi for produkter.',
            content: 'BCG-matrisen plasserer produkter etter markedsandel og markedsvekst: Stjerner (høy/høy — invester), Kontantkyr (høy/lav — melk), Spørsmålstegn (lav/høy — vurder) og Hunder (lav/lav — selg/avvikl). Telenor Mobil er kontantku, satellittsatsninger var stjerner/spørsmålstegn. Brukes ved strategiske ressursvalg.',
            subpoints: [
                  { label: 'PORTEFØLJE', text: 'Tenk på flere produkter samtidig.' },
          { label: 'RESSURSER', text: 'Hvor skal vi investere, melke, avvikle?' },
            ],
            practical: 'Hvilke produkter har bedriften din i hver kategori?',
            exercises: [
            {
      id: 'ent211-4-1',
      icon: '📊',
      title: 'Modell',
      question: 'BCG sine fire kategorier?',
      choices: [
        { id: 'a', label: 'Bare produkt', isCorrect: false, feedback: 'Fire kategorier.' },
{ id: 'b', label: 'Stjerner, Kontantkyr, Spørsmålstegn, Hunder', isCorrect: true, feedback: 'Riktig! Klassisk matrise.' },
{ id: 'c', label: 'Bare 2', isCorrect: false, feedback: 'Fire kvadranter.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Boston Consulting Group, 1970. Akse 1: relativ markedsandel. Akse 2: markedsvekst.',
    },
    {
      id: 'ent211-4-2',
      icon: '📊',
      title: 'Strategi',
      question: 'Hva gjør du med en kontantku?',
      choices: [
        { id: 'a', label: 'Avvikl', isCorrect: false, feedback: 'Generer kontanter.' },
{ id: 'b', label: 'Melk for å finansiere stjerner og spørsmålstegn', isCorrect: true, feedback: 'Riktig! Klassisk strategi.' },
{ id: 'c', label: 'Bare invester', isCorrect: false, feedback: 'Begrenset vekst.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Kontantkyr betaler for fremtiden. Stjerner blir morgendagens kontantkyr.',
    },
    {
      id: 'ent211-4-3',
      icon: '📊',
      title: 'Eksempel',
      question: 'Hva er Microsoft Office?',
      choices: [
        { id: 'a', label: 'Stjerne', isCorrect: false, feedback: 'Lavt vekst nå.' },
{ id: 'b', label: 'Kontantku — høy markedsandel, lav vekst, generer enorm cash', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Hund', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Spørsmålstegn', isCorrect: false, feedback: 'Etablert.' },
      ],
      espenTip: 'Office finansierer Azure (stjerne) og AI-satsninger (spørsmålstegn). Klassisk portefølje-tenkning.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🚀',
            title: 'Ansoff-matrisen',
            quote: 'Vekststrategier i 2x2.',
            content: 'Ansoff-matrisen viser fire vekststrategier: Markedspenetrasjon (eksisterende produkt + marked, mest sikkert), Produktutvikling (nytt produkt + eksisterende marked), Markedsutvikling (eksisterende produkt + nytt marked), Diversifisering (nytt + nytt, mest risiko). Tomra penetrerer eksisterende panteautomat-marked, utviklet sortering (produkt-utvikling), gikk til USA (markedsutvikling). Diversifisering er sjelden — Virgin er unntaket.',
            subpoints: [
                  { label: 'RISIKO', text: 'Diversifisering = høyest risiko.' },
          { label: 'VALG', text: 'Velg én eller to retninger, ikke alle.' },
            ],
            practical: 'Hvilken Ansoff-strategi følger din bedrift nå?',
            exercises: [
            {
      id: 'ent211-5-1',
      icon: '🚀',
      title: 'Modell',
      question: 'Ansoff sine fire vekststrategier?',
      choices: [
        { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Fire.' },
{ id: 'b', label: 'Penetrasjon, produktutvikling, markedsutvikling, diversifisering', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
{ id: 'c', label: 'Bare BCG', isCorrect: false, feedback: 'Annet rammeverk.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Igor Ansoff, 1957. Akse 1: produkt (eksisterende/nytt). Akse 2: marked (eksisterende/nytt).',
    },
    {
      id: 'ent211-5-2',
      icon: '🚀',
      title: 'Risiko',
      question: 'Hvilken er mest risikabel?',
      choices: [
        { id: 'a', label: 'Penetrasjon', isCorrect: false, feedback: 'Sikrest.' },
{ id: 'b', label: 'Diversifisering — nytt produkt + nytt marked = ukjent på alt', isCorrect: true, feedback: 'Riktig! Høyest risiko, høyest gevinst.' },
{ id: 'c', label: 'Produktutvikling', isCorrect: false, feedback: 'Du kjenner markedet.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Risikograd er målt.' },
      ],
      espenTip: 'Diversifisering = bygge ny bedrift fra null. Mange feiler her.',
    },
    {
      id: 'ent211-5-3',
      icon: '🚀',
      title: 'Eksempel',
      question: 'Hva gjorde Tomra med USA-ekspansjon?',
      choices: [
        { id: 'a', label: 'Penetrasjon', isCorrect: false, feedback: 'Nytt marked.' },
{ id: 'b', label: 'Markedsutvikling — eksisterende produkt i nytt geografisk marked', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Diversifisering', isCorrect: false, feedback: 'Samme produkt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Tomra eksporterer norsk panteautomat-teknologi globalt. Markedsutvikling.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '⚔️',
            title: 'Konkurransefortrinn',
            quote: 'Hva gjør deg unik?',
            content: 'Porter: To grunntyper konkurransefortrinn — kostnadslederskap (være billigst) eller differensiering (være best/unik). I tillegg fokuseringstrategi (smal nisje). Rema 1000 er kostnadsleder. Stormberg differensierer på etikk og produktkvalitet. Apple differensierer på design og økosystem. Du må velge — å prøve begge gir \'stuck in the middle\'.',
            subpoints: [
                  { label: 'VELG', text: 'Differensiering eller kostnad — sjelden begge.' },
          { label: 'VARIG', text: 'Konkurransefortrinn må forsvares mot kopi.' },
            ],
            practical: 'Hva er bedriften din sitt primære konkurransefortrinn?',
            exercises: [
            {
      id: 'ent211-6-1',
      icon: '⚔️',
      title: 'Typer',
      question: 'Porters generiske strategier?',
      choices: [
        { id: 'a', label: 'Bare pris', isCorrect: false, feedback: 'To pluss fokus.' },
{ id: 'b', label: 'Kostnadslederskap, differensiering og fokuseringstrategi', isCorrect: true, feedback: 'Riktig! Tre grunntyper.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Stuck in the middle = verken billigst eller best — taper.',
    },
    {
      id: 'ent211-6-2',
      icon: '⚔️',
      title: 'Differensiering',
      question: 'Hva må du gjøre for å differensiere?',
      choices: [
        { id: 'a', label: 'Senke pris', isCorrect: false, feedback: 'Det er kostnadsstrategi.' },
{ id: 'b', label: 'Skape unik verdi kunden er villig til å betale ekstra for', isCorrect: true, feedback: 'Riktig! Premium-posisjon.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Kopi', isCorrect: false, feedback: 'Tvert imot.' },
      ],
      espenTip: 'Apple, Mercedes, Stormberg — kunder betaler premium for opplevd merverdi.',
    },
    {
      id: 'ent211-6-3',
      icon: '⚔️',
      title: 'Eksempel',
      question: 'Hvordan differensierer Stormberg?',
      choices: [
        { id: 'a', label: 'Lavest pris', isCorrect: false, feedback: 'Mellompris.' },
{ id: 'b', label: 'Etikk (fair trade, miljø) og kvalitet — etisk premium-merke', isCorrect: true, feedback: 'Riktig! Klart valg.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Stormberg ansetter folk med hull i CV — etisk profil = differensiering. Bevisst strategi.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🎯',
            title: 'Visjon, misjon og verdier',
            quote: 'Hvor skal vi, hvorfor finnes vi?',
            content: 'Visjon = drømmen om fremtiden (\'hva ønsker vi å bli\'). Misjon = nåværende oppgave (\'hvorfor finnes vi\'). Verdier = hvordan vi oppfører oss. Equinors visjon er \'energi for et bedre liv\'. NSB → Vy endret visjon fra \'jernbane\' til \'mobilitet\'. Verdier styrer beslutninger når regler ikke rekker. Bra V/M/V = beslutningskompass.',
            subpoints: [
                  { label: 'VISJON', text: 'Inspirerer ansatte og rekruttering.' },
          { label: 'VERDIER', text: 'Test: vil du fyre for brudd, ikke bare belønne for etterlevelse?' },
            ],
            practical: 'Hva er din bedrifts visjon? Misjon? Verdier?',
            exercises: [
            {
      id: 'ent211-7-1',
      icon: '🎯',
      title: 'Forskjell',
      question: 'Visjon vs misjon?',
      choices: [
        { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjell.' },
{ id: 'b', label: 'Visjon = fremtidig drøm, misjon = nåværende oppgave', isCorrect: true, feedback: 'Riktig! Tidshorisont skiller.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk verktøy.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Visjon: \'En verden uten kreft.\' Misjon: \'Vi forsker på kreftbehandling.\'',
    },
    {
      id: 'ent211-7-2',
      icon: '🎯',
      title: 'Verdier',
      question: 'Når er verdier ekte?',
      choices: [
        { id: 'a', label: 'På veggen', isCorrect: false, feedback: 'Lett å skrive.' },
{ id: 'b', label: 'Når du sier opp folk eller mister kunder for å forsvare dem', isCorrect: true, feedback: 'Riktig! Tester verdier.' },
{ id: 'c', label: 'I markedsføring', isCorrect: false, feedback: 'Lett å påberope.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Tester gjennom handling.' },
      ],
      espenTip: 'Patagonia tapte kunder ved å ta miljøstandpunkt. Det viser ekte verdier.',
    },
    {
      id: 'ent211-7-3',
      icon: '🎯',
      title: 'Equinor',
      question: 'Hvorfor endret Statoil til Equinor?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Visjon-skift fra olje til energi — \'energi for et bedre liv\'', isCorrect: true, feedback: 'Riktig! Strategisk omposisjonering.' },
{ id: 'c', label: 'Bare design', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Equinor signaliserer langsiktig strategi mot havvind, hydrogen, CO2-lagring.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '📐',
            title: 'OKR og KPI',
            quote: 'Måling og oppfølging av strategi.',
            content: 'OKR (Objectives & Key Results) brukt av Google, Spotify og mange norske scaleups. Tre nivåer: Objective (kvalitativt mål, inspirerende), Key Results (3-5 målbare resultater per objective). KPI = løpende drifts-måling. OKR settes hver kvartal, KPI måles løpende. Skille: KPI for \'business as usual\', OKR for \'noe vi skal endre/vekse\'.',
            subpoints: [
                  { label: 'MÅLBARE', text: 'Det som måles, blir gjort.' },
          { label: 'OFTE', text: 'Kvartalsvis revurdering — ikke årlig planlegging.' },
            ],
            practical: 'Hva er din bedrifts viktigste OKR for kvartalet?',
            exercises: [
            {
      id: 'ent211-8-1',
      icon: '📐',
      title: 'Hva',
      question: 'Hva er OKR?',
      choices: [
        { id: 'a', label: 'Bare KPI', isCorrect: false, feedback: 'Forskjellig formål.' },
{ id: 'b', label: 'Objectives & Key Results — kvartalsvise endrings-mål', isCorrect: true, feedback: 'Riktig! Google-modellen.' },
{ id: 'c', label: 'Bare visjon', isCorrect: false, feedback: 'Konkrete mål.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'John Doerr brakte OKR fra Intel til Google. Boken \'Measure What Matters\'.',
    },
    {
      id: 'ent211-8-2',
      icon: '📐',
      title: 'Forskjell',
      question: 'OKR vs KPI?',
      choices: [
        { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjellige.' },
{ id: 'b', label: 'OKR = endringsmål kvartalsvis, KPI = løpende drift', isCorrect: true, feedback: 'Riktig! Skiller seg.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk skille.' },
      ],
      espenTip: 'KPI: månedlig omsetning. OKR: lansere produkt X innen Q2.',
    },
    {
      id: 'ent211-8-3',
      icon: '📐',
      title: 'Eksempel',
      question: 'Eksempel på god OKR?',
      choices: [
        { id: 'a', label: '\'Bli bedre\'', isCorrect: false, feedback: 'For vagt.' },
{ id: 'b', label: 'O: Bli den foretrukne SaaS-leverandøren. KR: Vokse fra 100 til 200 kunder, 95% retention, NPS 50', isCorrect: true, feedback: 'Riktig! Strukturert.' },
{ id: 'c', label: 'Bare omsetning', isCorrect: false, feedback: 'Bare ett tall.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert format.' },
      ],
      espenTip: 'OKR skal være ambisiøs — 70% oppnåelse er ofte målet, ikke 100%.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Misforståelser om strategi',
            quote: 'Vanlige feil i strategi-arbeid.',
            content: 'Vanlige feil: 1) Strategi er bare planlegging — nei, det er valg om hva man IKKE gjør. 2) Strategi er for store bedrifter — nei, små trenger fokus mer. 3) Strategi er ledelsens jobb alene — nei, må forankres i hele organisasjonen. 4) Visjon er strategi — nei, visjonen er inspirasjon, strategi er handlingsplan. 5) Strategi er statisk — må revideres kvartalsvis.',
            subpoints: [
                  { label: 'VALG', text: 'Strategi krever sterke nei-er.' },
          { label: 'LEVENDE', text: 'Strategi som ikke endres er død strategi.' },
            ],
            practical: 'Hvilken misforståelse har du selv hatt om strategi?',
            exercises: [
            {
      id: 'ent211-9-1',
      icon: '⚠️',
      title: 'Mest vanlig',
      question: 'Hva er den største misforståelsen?',
      choices: [
        { id: 'a', label: 'Strategi = bare ledelsens jobb', isCorrect: false, feedback: 'En av flere.' },
{ id: 'b', label: 'Strategi = mer av alt — egentlig handler det om å velge bort', isCorrect: true, feedback: 'Riktig! Sentral Porter-innsikt.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Liten misforståelse.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Porter: \'The essence of strategy is choosing what NOT to do.\' Sterke nei-er.',
    },
    {
      id: 'ent211-9-2',
      icon: '⚠️',
      title: 'Statisk',
      question: 'Er strategi statisk?',
      choices: [
        { id: 'a', label: 'Ja, fast', isCorrect: false, feedback: 'Endrer seg.' },
{ id: 'b', label: 'Nei — må revideres jevnlig (kvartalsvis) når omgivelsene endres', isCorrect: true, feedback: 'Riktig! Levende dokument.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert revisjon.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Kodak hadde strategi men endret den ikke. Blockbuster også. Konsekvenser.',
    },
    {
      id: 'ent211-9-3',
      icon: '⚠️',
      title: 'Liten',
      question: 'Trenger små bedrifter strategi?',
      choices: [
        { id: 'a', label: 'Nei', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — faktisk mer enn store; har færre ressurser å sløse på feil retning', isCorrect: true, feedback: 'Riktig! Fokus mer kritisk.' },
{ id: 'c', label: 'Bare for å imponere', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk verktøy.' },
      ],
      espenTip: 'Stor bedrift kan tolerere strategi-feil. Liten gründer går konkurs.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '⚖️',
            title: 'Lovverk og strategiske rammer',
            quote: 'Eksterne rammer for strategi.',
            content: 'Strategiske valg påvirkes av: konkurranselovgivning (forbud mot prissamarbeid), GDPR (databegrensninger), klimakrav og taksonomi (EU-regler), åpenhetsloven (rapporteringskrav), arbeidsmiljøloven og arbeidsrett (HR-rammer), EUs Digital Services Act (DSA). Equinor må følge taksonomi for å hente kapital. Strategi må være lovlig OG attraktiv for investorer.',
            subpoints: [
                  { label: 'RAMMER', text: 'Lov gir både hindringer og muligheter.' },
          { label: 'ESG', text: 'Strategi må svare på bærekraftskrav.' },
            ],
            practical: 'Hvilke lovverk påvirker din bedrift sin strategi?',
            exercises: [
            {
      id: 'ent211-10-1',
      icon: '⚖️',
      title: 'Konkurranse',
      question: 'Hva forbyr konkurranseloven?',
      choices: [
        { id: 'a', label: 'All konkurranse', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Prissamarbeid og misbruk av dominerende stilling', isCorrect: true, feedback: 'Riktig! Sentrale forbud.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Strukturelle forbud.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert lov.' },
      ],
      espenTip: 'Konkurransetilsynet håndhever. Bøter kan være 10% av global omsetning.',
    },
    {
      id: 'ent211-10-2',
      icon: '⚖️',
      title: 'ESG',
      question: 'Hva er EU-taksonomien?',
      choices: [
        { id: 'a', label: 'Bare skatt', isCorrect: false, feedback: 'Bærekrafts-rammeverk.' },
{ id: 'b', label: 'Klassifisering av hva som er bærekraftige økonomiske aktiviteter', isCorrect: true, feedback: 'Riktig! Påvirker kapital-tilgang.' },
{ id: 'c', label: 'Bare en list', isCorrect: false, feedback: 'Strukturelt rammeverk.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Investorer krever taksonomi-rapportering. Påvirker hva bedrifter kan gjøre og finansiere.',
    },
    {
      id: 'ent211-10-3',
      icon: '⚖️',
      title: 'Strategi',
      question: 'Hvordan påvirker dette strategi?',
      choices: [
        { id: 'a', label: 'Ikke', isCorrect: false, feedback: 'Helt sentralt.' },
{ id: 'b', label: 'Strategiske valg må være både lovlige og bærekrafts-rapporterbare', isCorrect: true, feedback: 'Riktig! Doble krav.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt krav.' },
      ],
      espenTip: 'Investor-attraktivitet krever ESG-strategi. Lovkrav setter rammen.',
    },
            ],
          },
        ]

        export default function StrategiskPlanleggingVekstModule() {
          return (
            <DrawerModule
              moduleCode="ENT2-11"
              moduleTitle="Strategisk planlegging for vekst"
              moduleIcon="🎯"
              storageKey="learning-ent2-strategisk-planlegging-vekst"
              completeRoute="/learning/ent2/strategisk-planlegging-vekst/complete"
              phases={phases}
              intro="Strategi er valgene du tar for å vinne — hva du gjør, hva du IKKE gjør, og hvor du satser. Vekstbedrifter trenger systematisk strategisk arbeid."
              vissteduAt="Norske selskaper som Equinor, Telenor og DNB har egne strategi-avdelinger. Mindre vekstbedrifter må gjøre samme tenkning, bare i mindre skala."
              espenSier="Strategi handler om prioritering. Du kan ikke gjøre alt — så hva velger du å satse på, og hva sier du nei til?"
      presentationLink={{ route: '/learning/presentations/ent2/strategisk-planlegging-vekst', description: 'Strategisk planlegging for vekst — 10 slides' }}
            />
          )
        }
