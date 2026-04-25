        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📋',
            title: 'Hvorfor budsjettere?',
            quote: 'Forutse, styre, dokumentere.',
            content: 'Tre hovedformål: 1) Forutse fremtiden — hva trenger vi når? 2) Styre driften — på sporet eller ikke? 3) Dokumentere behov for kapital — banker og investorer krever budsjett. Et godt budsjett gir deg svar før spørsmålene oppstår.',
            subpoints: [
                  { label: '3 FORMÅL', text: 'Forutse, styre, dokumentere.' },
          { label: 'STRATEGI I TALL', text: 'Budsjett er strategi uttrykt i kroner.' },
            ],
            practical: 'Har du erfart prosjekt uten budsjett? Hvilke problemer oppstod?',
            exercises: [
            {
      id: 'ent107-1-1',
      icon: '📋',
      title: 'Hovedformål',
      question: 'Hva er hovedformålene?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Forutse fremtiden, styre driften, dokumentere kapitalbehov', isCorrect: true, feedback: 'Riktig! Tre formål.' },
{ id: 'c', label: 'Bare regnskap', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare kontroll', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Budsjett er ikke prediksjon — det er styringsverktøy. Forskjell.',
    },
    {
      id: 'ent107-1-2',
      icon: '📋',
      title: 'Strategi',
      question: 'Hva er forholdet til strategi?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Sterk kobling.' },
{ id: 'b', label: 'Budsjett er strategi uttrykt i kroner', isCorrect: true, feedback: 'Riktig! Operasjonalisering.' },
{ id: 'c', label: 'Bare økonomi', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Vil du vekste? Vis det i budsjettet. Vil du kutte? Vis det i budsjettet. Strategi → tall.',
    },
    {
      id: 'ent107-1-3',
      icon: '📋',
      title: 'Investorer',
      question: 'Hvorfor krever investorer budsjett?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Måle om bedriften vil gi avkastning på investeringen', isCorrect: true, feedback: 'Riktig! Risikovurdering.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk krav.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Ingen investor gir penger uten å se forventet kontantstrøm og lønnsomhet over tid.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📈',
            title: 'Resultatbudsjett',
            quote: 'Lønnsomhet over perioden.',
            content: 'Resultatbudsjett: planlagt inntekt minus planlagte kostnader over en periode (typisk ett år). Viser om bedriften vil gå med overskudd. Kunst: ikke være for optimistisk — pessimistiske scenarier gir mer realistisk planlegging. Bygg gjerne \'best case\', \'worst case\', \'most likely\'.',
            subpoints: [
                  { label: 'LØNNSOMHET', text: 'Inntekter minus kostnader over perioden.' },
          { label: 'FLERE SCENARIER', text: 'Best, worst, most likely — bedre risikovurdering.' },
            ],
            practical: 'Lag et enkelt resultatbudsjett for et personlig prosjekt — inntekter og utgifter over 6 mnd.',
            exercises: [
            {
      id: 'ent107-2-1',
      icon: '📈',
      title: 'Hva',
      question: 'Hva viser resultatbudsjett?',
      choices: [
        { id: 'a', label: 'Bare inntekter', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Inntekter minus kostnader = forventet resultat', isCorrect: true, feedback: 'Riktig! Lønnsomhet.' },
{ id: 'c', label: 'Bare kostnader', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Resultatbudsjett er det viktigste budsjettet for å vurdere lønnsomhet.',
    },
    {
      id: 'ent107-2-2',
      icon: '📈',
      title: 'Periode',
      question: 'Typisk periode?',
      choices: [
        { id: 'a', label: '1 år', isCorrect: true, feedback: 'Riktig! Standard.' },
{ id: 'b', label: '1 dag', isCorrect: false, feedback: 'For kort.' },
{ id: 'c', label: '100 år', isCorrect: false, feedback: 'For langt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Årlig budsjett, brutt ned til måneder for oppfølging. Standard struktur.',
    },
    {
      id: 'ent107-2-3',
      icon: '📈',
      title: 'Optimisme',
      question: 'Hva er klassisk feil?',
      choices: [
        { id: 'a', label: 'For pessimistisk', isCorrect: false, feedback: 'Sjelden problem.' },
{ id: 'b', label: 'For optimistisk — overestimere inntekter, underestimere kostnader', isCorrect: true, feedback: 'Riktig! Vanligste feil.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Hofstadters lov: \'It always takes longer than you expect, even when you take into account Hofstadter\'s Law.\'',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '💧',
            title: 'Likviditetsbudsjett',
            quote: 'Kontanter måned for måned.',
            content: 'Likviditetsbudsjett: oversikt over innbetalinger og utbetalinger måned for måned. Har vi penger i kassa til å betale regninger? Mange lønnsomme bedrifter går konkurs av likviditetskrise — du kan ikke betale lønn med fakturaer.',
            subpoints: [
                  { label: 'KASSEFLYT', text: 'Faktiske penger inn og ut, ikke regnskapsmessig overskudd.' },
          { label: 'CASH IS KING', text: 'Lønnsomhet på papiret er lite verdt uten kontanter.' },
            ],
            practical: 'Hva er forskjellen på lønnsomhet og likviditet for en bedrift?',
            exercises: [
            {
      id: 'ent107-3-1',
      icon: '💧',
      title: 'Hva',
      question: 'Hva viser likviditetsbudsjett?',
      choices: [
        { id: 'a', label: 'Bare overskudd', isCorrect: false, feedback: 'Det er resultat.' },
{ id: 'b', label: 'Faktiske innbetalinger og utbetalinger måned for måned', isCorrect: true, feedback: 'Riktig! Cash flow.' },
{ id: 'c', label: 'Bare lønninger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Salg på faktura skaper inntekt på papiret, men ikke kontant — kunden betaler senere.',
    },
    {
      id: 'ent107-3-2',
      icon: '💧',
      title: 'Hvorfor',
      question: 'Hvorfor er det kritisk?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Bedriften kan være lønnsom på papiret, men likevel gå konkurs av kontantmangel', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Norwegian rapporterte rekordtall 2019. Konkurs 2020 — likviditetskrise. Klassisk feil.',
    },
    {
      id: 'ent107-3-3',
      icon: '💧',
      title: 'Norske eksempler',
      question: 'Når er likviditet kritisk?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Vekstfaser, sesong-bedrifter, ny investering — alle krever cash buffer', isCorrect: true, feedback: 'Riktig! Multi-faser.' },
{ id: 'c', label: 'Bare i krise', isCorrect: false, feedback: 'Konstant viktig.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Sesong-bedrifter (turisme, jul-handel) har spesielt stor likviditetsutfordring. Krever planlegging.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🔒',
            title: 'Faste og variable kostnader',
            quote: 'Strukturell forskjell.',
            content: 'Faste kostnader: uavhengige av salg (husleie, fastlønn, forsikring). Variable kostnader: følger salget (råvarer, provisjon, frakt). Forstå skillet — det er nøkkelen til alle videre lønnsomhetsberegninger. Høye faste kostnader = sårbar ved salgsfall.',
            subpoints: [
                  { label: 'FASTE', text: 'Uavhengige av salg — alltid der.' },
          { label: 'VARIABLE', text: 'Følger salget — øker når salget øker.' },
            ],
            practical: 'List kostnader for en lokal kafé — hvilke er faste, hvilke variable?',
            exercises: [
            {
      id: 'ent107-4-1',
      icon: '🔒',
      title: 'Faste',
      question: 'Eksempler på faste kostnader?',
      choices: [
        { id: 'a', label: 'Råvarer', isCorrect: false, feedback: 'Variable.' },
{ id: 'b', label: 'Husleie, fastlønn, forsikring, lisenser', isCorrect: true, feedback: 'Riktig! Uavhengige av salg.' },
{ id: 'c', label: 'Frakt', isCorrect: false, feedback: 'Variable.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Disse må betales selv om bedriften ikke selger noe. Konstant utgift.',
    },
    {
      id: 'ent107-4-2',
      icon: '🔒',
      title: 'Variable',
      question: 'Eksempler på variable?',
      choices: [
        { id: 'a', label: 'Husleie', isCorrect: false, feedback: 'Fast.' },
{ id: 'b', label: 'Råvarer, provisjon, frakt, emballasje', isCorrect: true, feedback: 'Riktig! Følger salget.' },
{ id: 'c', label: 'Forsikring', isCorrect: false, feedback: 'Fast.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mer salg = mer råvarer = mer variable kostnader. Skala lineært.',
    },
    {
      id: 'ent107-4-3',
      icon: '🔒',
      title: 'Strategi',
      question: 'Hvorfor er fordelingen viktig?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Høye faste kostnader = sårbar ved salgsfall — break-even må analyseres', isCorrect: true, feedback: 'Riktig! Strategisk risiko.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Restauranter med høy husleie er sårbare. Pandemi rammet dem hardt — kostnader påløper uten salg.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🎯',
            title: 'Nullpunktanalyse',
            quote: 'Break-even-punkt.',
            content: 'Nullpunktanalyse (break-even): hvor mye må vi selge for å gå i null? Faste kostnader / dekningsbidrag per enhet. Eksempel: 200 000 kr i faste kostnader / 100 kr DB = 2 000 enheter. Hvis du tror du selger 1 500, er det røde lys. Kritisk verktøy for prising og lansering.',
            subpoints: [
                  { label: 'FORMEL', text: 'Break-even = faste kostnader / DB per enhet.' },
          { label: 'BESLUTNING', text: 'Sammenligne med realistisk salgsestimat.' },
            ],
            practical: 'Faste kostnader 100 000. DB per enhet 50 kr. Hva er break-even?',
            exercises: [
            {
      id: 'ent107-5-1',
      icon: '🎯',
      title: 'Hva',
      question: 'Hva er nullpunkt?',
      choices: [
        { id: 'a', label: 'Når man går konkurs', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Når inntekter dekker totale kostnader — verken tap eller fortjeneste', isCorrect: true, feedback: 'Riktig! Kritisk milestone.' },
{ id: 'c', label: 'Når lager er tomt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Break-even forteller minimumsvolum for lønnsomhet. Under = tap, over = profitt.',
    },
    {
      id: 'ent107-5-2',
      icon: '🎯',
      title: 'Beregning',
      question: 'Faste 100 000. DB 50 kr. Break-even?',
      choices: [
        { id: 'a', label: '1 000 enheter', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'b', label: '2 000 enheter (100 000 / 50)', isCorrect: true, feedback: 'Riktig! Klassisk beregning.' },
{ id: 'c', label: '5 000 enheter', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'd', label: '10 000 enheter', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Sjekk: kan vi realistisk selge 2000+ enheter? Hvis ikke, ikke lansér.',
    },
    {
      id: 'ent107-5-3',
      icon: '🎯',
      title: 'Bruk',
      question: 'Når brukes break-even?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Lansering, prising, kapasitetsplanlegging', isCorrect: true, feedback: 'Riktig! Strategisk verktøy.' },
{ id: 'c', label: 'Bare etter lansering', isCorrect: false, feedback: 'Bør være før.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Beregn break-even FØR lansering. Avdekker urealistiske planer.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '📊',
            title: 'Dekningsbidrag',
            quote: 'Hva sitter vi igjen med per enhet?',
            content: 'Dekningsbidrag = Salgspris - Variable kostnader. Hva sitter vi igjen med per solgt enhet til å dekke faste kostnader og fortjeneste? Selger du for 200 og det koster 80 i råvarer, er DB 120 — det er pengene du har å jobbe med. Dekningsgrad = DB i prosent av salgspris.',
            subpoints: [
                  { label: 'FORMEL', text: 'DB = Pris - Variable kostnader.' },
          { label: 'DEKNINGSGRAD', text: 'DB i prosent av salgspris.' },
            ],
            practical: 'Pris 200 kr. Variable kostnader 80 kr. Hva er DB og DG?',
            exercises: [
            {
      id: 'ent107-6-1',
      icon: '📊',
      title: 'Definisjon',
      question: 'Hva er DB?',
      choices: [
        { id: 'a', label: 'Total inntekt', isCorrect: false, feedback: 'Bruttoinntekt.' },
{ id: 'b', label: 'Salgspris minus variable kostnader', isCorrect: true, feedback: 'Riktig! Det som er igjen.' },
{ id: 'c', label: 'Bare overskudd', isCorrect: false, feedback: 'DB inkluderer faste kostnader.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'DB = 200 - 80 = 120 kr. Disse 120 kr skal dekke faste kostnader og fortjeneste.',
    },
    {
      id: 'ent107-6-2',
      icon: '📊',
      title: 'DG',
      question: 'Pris 200, DB 120. DG?',
      choices: [
        { id: 'a', label: '20 %', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'b', label: '60 % (120/200)', isCorrect: true, feedback: 'Riktig! DB i prosent av salgspris.' },
{ id: 'c', label: '40 %', isCorrect: false, feedback: 'Det er VK-andel.' },
{ id: 'd', label: '100 %', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'DG er nyttig for sammenligning på tvers av produkter med ulik pris.',
    },
    {
      id: 'ent107-6-3',
      icon: '📊',
      title: 'Avanse vs DG',
      question: 'Forskjell?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Avanse = av innkjøpspris. DG = av salgspris', isCorrect: true, feedback: 'Riktig! Klassisk feil i butikkdrift.' },
{ id: 'c', label: 'Bare for B2B', isCorrect: false, feedback: 'Begge brukes overalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: '50 % avanse = 33 % DG. Mange nye butikkeiere blander disse — kan gå konkurs.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '💰',
            title: 'Prissetting i oppstarten',
            quote: 'Selvkost vs markedsbasert.',
            content: 'To hovedtilnærminger: Selvkost (alle kostnader + påslag — sikrer lønnsomhet) vs markedsbasert (hva er kunden villig til å betale — riktigere, men krever testing). Beste tilnærming er ofte hybrid: bruk markedsbasert for å sette pris, sjekk mot selvkost for å sikre lønnsomhet.',
            subpoints: [
                  { label: 'SELVKOST', text: 'Sikrer at hver enhet er lønnsom.' },
          { label: 'MARKEDSBASERT', text: 'Maximerer pris kunden vil betale.' },
            ],
            practical: 'Hvilken tilnærming ville du brukt for et nytt produkt?',
            exercises: [
            {
      id: 'ent107-7-1',
      icon: '💰',
      title: 'Selvkost',
      question: 'Hva er selvkost-prising?',
      choices: [
        { id: 'a', label: 'Kunden bestemmer', isCorrect: false, feedback: 'Det er markedsbasert.' },
{ id: 'b', label: 'Alle kostnader + påslag for fortjeneste = pris', isCorrect: true, feedback: 'Riktig! Sikrer lønnsomhet.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Garanterer at hver enhet er lønnsom. Men kan undervurdere hva markedet vil betale.',
    },
    {
      id: 'ent107-7-2',
      icon: '💰',
      title: 'Marked',
      question: 'Markedsbasert?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Hva kunden er villig til å betale — testing avgjør', isCorrect: true, feedback: 'Riktig! Maksimerer pris.' },
{ id: 'c', label: 'Bare lavest pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'Apple bruker markedsbasert prising. Kunder betaler premium fordi de vil — ikke fordi det er kostnaden + påslag.',
    },
    {
      id: 'ent107-7-3',
      icon: '💰',
      title: 'Hybrid',
      question: 'Beste tilnærming?',
      choices: [
        { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Hybrid — markedsbasert som hovedregel, sjekk mot selvkost for lønnsomhet', isCorrect: true, feedback: 'Riktig! Beste av begge.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'Markedsbasert maksimerer inntekt. Selvkost-sjekk sikrer at vi ikke selger med tap.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🔍',
            title: 'Økonomisk kontroll',
            quote: 'Sammenlign budsjett mot faktiske tall.',
            content: 'Sammenlign budsjett mot faktiske tall hver måned. Avvik gir signal: revider budsjettet, eller endre driften. Mange gründere lager budsjett én gang og ignorerer det — det er sløsing av tid. Disiplinert månedlig review er kritisk.',
            subpoints: [
                  { label: 'MÅNEDLIG', text: 'Sammenlign minst månedlig.' },
          { label: 'AVVIK = LÆRING', text: 'Forstå hvorfor og juster.' },
            ],
            practical: 'Hvor ofte ville du sammenlignet budsjett mot virkelighet?',
            exercises: [
            {
      id: 'ent107-8-1',
      icon: '🔍',
      title: 'Frekvens',
      question: 'Hvor ofte review?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Månedlig minimum', isCorrect: true, feedback: 'Riktig! Standard frekvens.' },
{ id: 'c', label: 'Hver dag', isCorrect: false, feedback: 'For ofte.' },
{ id: 'd', label: 'Årlig', isCorrect: false, feedback: 'For sjelden.' },
      ],
      espenTip: 'Månedlig regnskap kommer typisk uansett. Bruk det aktivt — ikke bare for skattemyndighetene.',
    },
    {
      id: 'ent107-8-2',
      icon: '🔍',
      title: 'Avvik',
      question: 'Hva gjøre med avvik?',
      choices: [
        { id: 'a', label: 'Ignorere', isCorrect: false, feedback: 'Tap av læring.' },
{ id: 'b', label: 'Forstå hvorfor — juster budsjett eller drift', isCorrect: true, feedback: 'Riktig! Læringsprosess.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Stort positivt avvik kan være like alarmerende som negativt — kan tyde på dårlig planlegging.',
    },
    {
      id: 'ent107-8-3',
      icon: '🔍',
      title: 'Verdi',
      question: 'Hva er verdien av kontroll?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'b', label: 'Lærer kontinuerlig — bedre planlegging neste runde', isCorrect: true, feedback: 'Riktig! Iterativ forbedring.' },
{ id: 'c', label: 'Bare for revisor', isCorrect: false, feedback: 'For ledelse først.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Bedrifter som måler systematisk forbedrer seg konsistent. Disiplin er konkurransefortrinn.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '💼',
            title: 'Kahoots tidlige budsjett',
            quote: 'Stram likviditetsstyring.',
            content: 'Kahoot startet med begrenset kapital. Stram likviditetsstyring (cash burn) ble fulgt månedlig — én forsinket investering kunne tatt livet av selskapet i tidlig fase. God økonomistyring var like viktig som produktet. Klassisk eksempel på disiplinert oppstart.',
            subpoints: [
                  { label: 'CASH BURN', text: 'Hvor raskt bedriften bruker kontanter.' },
          { label: 'MÅNEDLIG', text: 'Daglig oversikt i kritiske faser.' },
            ],
            practical: 'Hva ville du fulgt opp daglig hvis du var startup-CEO?',
            exercises: [
            {
      id: 'ent107-9-1',
      icon: '💼',
      title: 'Cash burn',
      question: 'Hva er cash burn?',
      choices: [
        { id: 'a', label: 'Branner', isCorrect: false, feedback: 'Bokstavelig — feil.' },
{ id: 'b', label: 'Hvor raskt bedriften bruker kontanter', isCorrect: true, feedback: 'Riktig! Standard startup-metric.' },
{ id: 'c', label: 'Bare lønninger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Beregnes som: (kontanter ved start - kontanter nå) / antall måneder. Standard startup-mål.',
    },
    {
      id: 'ent107-9-2',
      icon: '💼',
      title: 'Hvorfor',
      question: 'Hvorfor følge så tett?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'I tidlig fase kan én feil ta livet av selskapet — kontroll = overlevelse', isCorrect: true, feedback: 'Riktig! Eksistensielt.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare estetikk', isCorrect: false, feedback: 'Strategisk verdi.' },
      ],
      espenTip: 'Mange startups har stengt fordi de oppdaget likviditetskrise for sent. Ukentlig sjekk er minimum.',
    },
    {
      id: 'ent107-9-3',
      icon: '💼',
      title: 'Lærdom',
      question: 'Strategisk lærdom?',
      choices: [
        { id: 'a', label: 'Bare ide teller', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Økonomistyring er like kritisk som produktet — særlig i tidlig fase', isCorrect: true, feedback: 'Riktig! Helhetlig syn.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Kahoot bygde milliardselskap pga både produkt OG økonomistyring. Ingen kan stå alene.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎯',
            title: 'Forskjellen suksess vs konkurs',
            quote: 'Disiplin slår geni.',
            content: 'God økonomistyring er forskjellen på suksess og konkurs. Bedriften kan ha en fantastisk idé, godt team og lojale kunder — men hvis pengene tar slutt, er alt over. Mange genier har sett bedriften sin gå konkurs av dårlig økonomistyring. Disiplin slår geni.',
            subpoints: [
                  { label: 'DISIPLIN > GENI', text: 'Beste idé dør uten økonomistyring.' },
          { label: 'OVERLEVELSE FØRST', text: 'Kan ikke vokse uten å overleve.' },
            ],
            practical: 'Hva ville du prioritert: bedre produkt eller bedre økonomistyring?',
            exercises: [
            {
      id: 'ent107-10-1',
      icon: '🎯',
      title: 'Forskjell',
      question: 'Hva skiller suksess fra konkurs?',
      choices: [
        { id: 'a', label: 'Bare flaks', isCorrect: false, feedback: 'Strukturelle drivere.' },
{ id: 'b', label: 'Disiplinert økonomistyring sammen med godt produkt', isCorrect: true, feedback: 'Riktig! Begge må være på plass.' },
{ id: 'c', label: 'Bare ide', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'Forskning: 65 % av startups som mislykkes nevner økonomistyring som hovedårsak.',
    },
    {
      id: 'ent107-10-2',
      icon: '🎯',
      title: 'Geni vs disiplin',
      question: 'Hva slår hva?',
      choices: [
        { id: 'a', label: 'Geni alltid', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Disiplin slår geni — særlig i økonomi', isCorrect: true, feedback: 'Riktig! Strukturelt mønster.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Mange genier har sett gode bedrifter gå konkurs. Disiplin er undervurdert ferdighet.',
    },
    {
      id: 'ent107-10-3',
      icon: '🎯',
      title: 'Hovedlærdom',
      question: 'Hovedlærdommen?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Bygg disiplinerte økonomistyring fra dag 1 — ikke vent', isCorrect: true, feedback: 'Riktig! Proaktivt.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Sett opp regnskaps-systemer fra start. Bruk regnskapsfører. Ikke vent til problemene oppstår.',
    },
            ],
          },
        ]

        export default function OkonomiskPlanleggingBudsjettModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-07"
              moduleTitle="Økonomisk planlegging og budsjett"
              moduleIcon="📊"
              storageKey="learning-ent1-okonomisk-planlegging-budsjett"
              completeRoute="/learning/ent1/okonomisk-planlegging-budsjett/complete"
              phases={phases}
              intro="Kontroll på kronene — budsjett, dekningsbidrag og likviditet for nye gründere. God økonomistyring er forskjellen på suksess og konkurs."
              vissteduAt="Norske startups som mangler god økonomistyring har 3-5x høyere konkurs-rate enn de med disiplinert budsjettering. Tall slår magefølelse."
              espenSier="Mange gründere er flinke med produkt og dårlige med tall. De som mestrer begge vinner."
      presentationLink={{ route: '/learning/presentations/ent1/okonomisk-planlegging-budsjett', description: 'Økonomisk planlegging og budsjett — 10 slides' }}
            />
          )
        }
