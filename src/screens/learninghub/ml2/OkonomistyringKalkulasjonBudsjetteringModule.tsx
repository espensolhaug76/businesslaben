        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '💰',
            title: 'Økonomi og markedsføring',
            quote: 'Markedsføreren må forstå regnskapet.',
            content: 'Markedsføreren må forstå regnskapet for å få budsjetter. Argumentet \'kampanjen var kreativ\' faller flatt i toppledelsen. Argumentet \'ROI 4,2 og dekningsmargin 32 %\' åpner kassen. Økonomisk språk er marketing-direktørens viktigste verktøy.',
            subpoints: [
                  { label: 'SPRÅK', text: 'Økonomi er ledelsens språk — marketing må snakke det.' },
          { label: 'BUDSJETT', text: 'Forsvar krever tall, ikke følelser.' },
            ],
            practical: 'Har du sett markedsføring forsvart med tall? Hva ble effektivt?',
            exercises: [
            {
      id: 'ml216-1-1',
      icon: '💰',
      title: 'Hvorfor',
      question: 'Hvorfor må marketing forstå økonomi?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'For å forsvare budsjett og bygge troverdighet i ledelsen', isCorrect: true, feedback: 'Riktig! Tall snakker høyere enn ord.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Marketing-direktører som mestrer økonomi blir promotert til CEO. De som ikke gjør det, blir værende i marketing.',
    },
    {
      id: 'ml216-1-2',
      icon: '💰',
      title: 'Argument',
      question: 'Hvilket argument fungerer i ledelsen?',
      choices: [
        { id: 'a', label: '\'Kampanjen var kreativ\'', isCorrect: false, feedback: 'Faller flatt.' },
{ id: 'b', label: '\'ROI 4,2 og dekningsmargin 32 %\'', isCorrect: true, feedback: 'Riktig! Konkrete tall vinner debatten.' },
{ id: 'c', label: '\'Folk likte den\'', isCorrect: false, feedback: 'For vagt.' },
{ id: 'd', label: '\'Vi hadde det gøy\'', isCorrect: false, feedback: 'Helt feil tilnærming.' },
      ],
      espenTip: 'Test: kan du beskrive marketing-effekten i tall? Hvis nei, vil du tape budsjett-debatten.',
    },
    {
      id: 'ml216-1-3',
      icon: '💰',
      title: 'Verdi',
      question: 'Hva er marketing-direktørens viktigste verktøy?',
      choices: [
        { id: 'a', label: 'Bare kreativitet', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Økonomisk språk — kombinert med kreativitet', isCorrect: true, feedback: 'Riktig! Begge må være på plass.' },
{ id: 'c', label: 'Bare nettverk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Phil Kotler: \'Marketing is too important to be left to the marketing department.\' Marketing er hele bedriften.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📊',
            title: 'Kalkulasjonsmetoder',
            quote: 'Bidragsmetoden vs selvkostmetoden.',
            content: 'Bidragsmetoden: variable kostnader + dekningsbidrag. Brukes for kortsiktige beslutninger (\'skal vi ta neste ordre?\'). Selvkostmetoden: alle kostnader + påslag. Brukes for langsiktige beslutninger (\'er produktet lønnsomt?\'). Begge har sin plass.',
            subpoints: [
                  { label: 'BIDRAG = KORTSIKT', text: 'Variable kostnader + dekningsbidrag.' },
          { label: 'SELVKOST = LANGSIKT', text: 'Alle kostnader + påslag.' },
            ],
            practical: 'Når ville du brukt selvkost vs bidragsmetoden?',
            exercises: [
            {
      id: 'ml216-2-1',
      icon: '📊',
      title: 'Bidrag',
      question: 'Når brukes bidragsmetoden?',
      choices: [
        { id: 'a', label: 'Langsiktige beslutninger', isCorrect: false, feedback: 'Det er selvkost.' },
{ id: 'b', label: 'Kortsiktige beslutninger med ledig kapasitet', isCorrect: true, feedback: 'Riktig! Når faste kostnader er allerede dekket.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'd', label: 'Bare for offentlig', isCorrect: false, feedback: 'Privat sektor.' },
      ],
      espenTip: 'Hotell med ledig kapasitet: bidragsmetoden viser at last-minute-rabatt fortsatt er lønnsom.',
    },
    {
      id: 'ml216-2-2',
      icon: '📊',
      title: 'Selvkost',
      question: 'Når brukes selvkost?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Langsiktige beslutninger om produktets reelle lønnsomhet', isCorrect: true, feedback: 'Riktig! Dekker alle kostnader for full vurdering.' },
{ id: 'c', label: 'Bare i offentlig sektor', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Aldri kortsiktig', isCorrect: false, feedback: 'Det er korrekt — bidrag er kortsiktig.' },
      ],
      espenTip: 'Settes priser for hele året: selvkost. Vurderes om man skal kutte produktet: selvkost.',
    },
    {
      id: 'ml216-2-3',
      icon: '📊',
      title: 'Forskjell',
      question: 'Hva er hovedforskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Selvkost inkluderer alle kostnader; bidrag bare variable', isCorrect: true, feedback: 'Riktig! Strukturell forskjell som styrer beslutninger.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Strategiske valg.' },
{ id: 'd', label: 'Bare for små', isCorrect: false, feedback: 'Begge brukes overalt.' },
      ],
      espenTip: 'Norske bedrifter bruker oftest bidragsmetoden i operasjonelle beslutninger, selvkost i strategiske.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📈',
            title: 'Dekningsbidrag',
            quote: 'Hva sitter vi igjen med per enhet?',
            content: 'Dekningsbidrag = Salgspris - Variable kostnader. Hvor mye sitter vi igjen med per solgte enhet til å dekke faste kostnader og fortjeneste? Avgjør hvilke produkter som er verdt å selge. Dekningsgrad = dekningsbidrag i prosent av salgspris.',
            subpoints: [
                  { label: 'FORMEL', text: 'DB = Pris - Variable kostnader.' },
          { label: 'BESLUTNING', text: 'Lavt DB = vanskelig å være lønnsom selv ved høyt volum.' },
            ],
            practical: 'Et produkt selges for 100 kr. Variable kostnader 60 kr. Hva er dekningsbidraget?',
            exercises: [
            {
      id: 'ml216-3-1',
      icon: '📈',
      title: 'Definisjon',
      question: 'Hva er dekningsbidrag?',
      choices: [
        { id: 'a', label: 'Total inntekt', isCorrect: false, feedback: 'Bruttoinntekt, ikke DB.' },
{ id: 'b', label: 'Salgspris minus variable kostnader', isCorrect: true, feedback: 'Riktig! Det som er igjen til faste kostnader og overskudd.' },
{ id: 'c', label: 'Bare overskudd', isCorrect: false, feedback: 'For smalt — DB inkluderer faste kostnader.' },
{ id: 'd', label: 'Faste kostnader', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Dekningsbidrag = 100 - 60 = 40 kr per enhet. Disse 40 kr skal dekke faste kostnader.',
    },
    {
      id: 'ml216-3-2',
      icon: '📈',
      title: 'Dekningsgrad',
      question: 'Hva er dekningsgrad i samme eksempel?',
      choices: [
        { id: 'a', label: '20 %', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'b', label: '40 % (40/100)', isCorrect: true, feedback: 'Riktig! DB i prosent av salgspris.' },
{ id: 'c', label: '60 %', isCorrect: false, feedback: 'Det er variable kostnaders andel.' },
{ id: 'd', label: '100 %', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Dekningsgrad er nyttig for sammenligning på tvers av produkter med ulik pris.',
    },
    {
      id: 'ml216-3-3',
      icon: '📈',
      title: 'Avanse vs DG',
      question: 'Hva er forskjellen på avanse og dekningsgrad?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Avanse = av innkjøpspris. Dekningsgrad = av salgspris', isCorrect: true, feedback: 'Riktig! Klassisk feil i butikkdrift.' },
{ id: 'c', label: 'Bare for B2B', isCorrect: false, feedback: 'Begge brukes overalt.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Brukes globalt.' },
      ],
      espenTip: '50 % avanse = 33 % dekningsgrad. Mange nye butikkeiere blander disse — kan gå konkurs.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎯',
            title: 'Nullpunktsanalyse (break-even)',
            quote: 'Hvor mange må selge for å gå i null?',
            content: 'Break-even point = faste kostnader / dekningsbidrag per enhet. Eksempel: faste kostnader 1 mill, DB 100 kr/enhet → må selge 10 000 enheter for å gå i null. Kritisk for prising og lansering. Hvis du tror du selger 8 000 = stopp.',
            subpoints: [
                  { label: 'FORMEL', text: 'Break-even = Faste kostnader / DB per enhet.' },
          { label: 'BRUK', text: 'Lansering, prising, kapasitetsplanlegging.' },
            ],
            practical: 'Faste kostnader 500 000. DB per enhet 250 kr. Hva er break-even?',
            exercises: [
            {
      id: 'ml216-4-1',
      icon: '🎯',
      title: 'Definisjon',
      question: 'Hva er break-even?',
      choices: [
        { id: 'a', label: 'Når bedriften går konkurs', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Punktet der inntekter dekker totale kostnader — verken tap eller fortjeneste', isCorrect: true, feedback: 'Riktig! Kritisk milestone.' },
{ id: 'c', label: 'Når lageret er tomt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Når kapitalen er brukt opp', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Break-even forteller minimumsvolum for lønnsomhet. Under = tap, over = profitt.',
    },
    {
      id: 'ml216-4-2',
      icon: '🎯',
      title: 'Beregning',
      question: 'Faste kostnader 500 000. DB 250 kr. Break-even?',
      choices: [
        { id: 'a', label: '1 000 enheter', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'b', label: '2 000 enheter (500000 / 250)', isCorrect: true, feedback: 'Riktig! Klassisk break-even-beregning.' },
{ id: 'c', label: '5 000 enheter', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'd', label: '10 000 enheter', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Sjekk neste: kan vi realistisk selge 2000+ enheter? Hvis ikke, ikke lansér.',
    },
    {
      id: 'ml216-4-3',
      icon: '🎯',
      title: 'Lansering',
      question: 'Hvordan brukes break-even ved lansering?',
      choices: [
        { id: 'a', label: 'Bare etter lansering', isCorrect: false, feedback: 'Bør være før.' },
{ id: 'b', label: 'Beregn FØR lansering — sammenlign med realistisk salgsestimat', isCorrect: true, feedback: 'Riktig! Avdekker urealistiske planer.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hvis break-even = 50 000 enheter, men markedet er bare 30 000 totalt — ikke lansér.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📋',
            title: 'Budsjettering',
            quote: 'Resultatbudsjett vs likviditetsbudsjett.',
            content: 'Budsjettering: planlegging av fremtidige inntekter og kostnader. Resultatbudsjett (lønnsomhet over perioden), likviditetsbudsjett (kontanter måned for måned), investeringsbudsjett (anleggsmidler). Alle tre må stemme — kan være lønnsom på papiret, men gå konkurs av likviditetsmangel.',
            subpoints: [
                  { label: '3 BUDSJETTER', text: 'Resultat + likviditet + investering.' },
          { label: 'LIKVIDITET KRITISK', text: 'Kan gå konkurs selv med overskudd på papiret.' },
            ],
            practical: 'Hva er forskjellen på lønnsomhet og likviditet for en bedrift?',
            exercises: [
            {
      id: 'ml216-5-1',
      icon: '📋',
      title: '3 typer',
      question: 'Hvilke 3 budsjetter?',
      choices: [
        { id: 'a', label: 'Bare resultat', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Resultatbudsjett, likviditetsbudsjett, investeringsbudsjett', isCorrect: true, feedback: 'Riktig! Komplett budsjett-pakke.' },
{ id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Alle tre må stemme. Mange bedrifter glemmer likviditet — det dreper dem.',
    },
    {
      id: 'ml216-5-2',
      icon: '📋',
      title: 'Likviditet',
      question: 'Hva er likviditetsbudsjett?',
      choices: [
        { id: 'a', label: 'Plan for forventet overskudd', isCorrect: false, feedback: 'Det er resultatbudsjett.' },
{ id: 'b', label: 'Oversikt over innbetalinger og utbetalinger måned for måned', isCorrect: true, feedback: 'Riktig! Ser om det er penger til å betale regninger.' },
{ id: 'c', label: 'Bare for konkursvurdering', isCorrect: false, feedback: 'Brukes løpende.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Salg gir ikke likviditet umiddelbart — kunder betaler senere. Krevende cash-flow-styring.',
    },
    {
      id: 'ml216-5-3',
      icon: '📋',
      title: 'Lønnsom men konkurs',
      question: 'Hvordan kan dette skje?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Salg på faktura skaper inntekt på papiret, men ikke kontant — leverandører må betales nå', isCorrect: true, feedback: 'Riktig! Klassisk vekstbedrift-utfordring.' },
{ id: 'c', label: 'Bare i krise', isCorrect: false, feedback: 'Vanlig problem.' },
{ id: 'd', label: 'Bare offentlig sektor', isCorrect: false, feedback: 'Privat også.' },
      ],
      espenTip: 'Norwegian rapporterte rekordtall 2019. Gikk konkurs 2020 — likviditetskrise. Klassisk eksempel.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '💧',
            title: 'Likviditetsstyring',
            quote: 'Cash is king.',
            content: 'Likviditet: bedriftens evne til å betale løpende forpliktelser. Mange lønnsomme bedrifter går konkurs av likviditetskrise. Kunder som betaler sent + leverandører som krever rask betaling = likviditetskrise selv om regnskapet ser bra ut. \'Cash is king\' — også for vekstbedrifter.',
            subpoints: [
                  { label: 'KASSEFLYT', text: 'Sikre at det er penger til å betale når det trengs.' },
          { label: 'VEKSTPARADOKS', text: 'Vekst kan øke likviditetsbehov dramatisk.' },
            ],
            practical: 'Hva ville du gjort hvis kunden ikke betaler i tide?',
            exercises: [
            {
      id: 'ml216-6-1',
      icon: '💧',
      title: 'Definisjon',
      question: 'Hva er likviditet?',
      choices: [
        { id: 'a', label: 'Total formue', isCorrect: false, feedback: 'For bredt.' },
{ id: 'b', label: 'Bedriftens evne til å betale løpende forpliktelser', isCorrect: true, feedback: 'Riktig! Kortsiktig betalingsevne.' },
{ id: 'c', label: 'Bare overskudd', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: '\'Cash is king\' i forretningslivet. Likviditet > lønnsomhet i nedgangstider.',
    },
    {
      id: 'ml216-6-2',
      icon: '💧',
      title: 'Vekst-paradoks',
      question: 'Hvorfor er vekst risikabelt for likviditet?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Salg vokser → må kjøpe mer lager + lønne mer + betale leverandører — før kunder betaler', isCorrect: true, feedback: 'Riktig! Klassisk vekstbedrift-utfordring.' },
{ id: 'c', label: 'Vekst er alltid bra', isCorrect: false, feedback: 'Kan være risikabelt.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Mange suksessbedrifter går konkurs midt i veksten. Likviditet må følges nøye.',
    },
    {
      id: 'ml216-6-3',
      icon: '💧',
      title: 'Tiltak',
      question: 'Hvordan styrke likviditet?',
      choices: [
        { id: 'a', label: 'Bare øke salg', isCorrect: false, feedback: 'Kan forverre.' },
{ id: 'b', label: 'Raskere kundeinnbetalinger + lengre leverandørgjeld + lavere lager', isCorrect: true, feedback: 'Riktig! Arbeidskapital-styring.' },
{ id: 'c', label: 'Bare lån mer', isCorrect: false, feedback: 'Sekundært tiltak.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte tiltak.' },
      ],
      espenTip: 'Klassiske tiltak: tilbud om rabatt for rask betaling, faktura-rapportering, factoring.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📊',
            title: 'Investeringsanalyse',
            quote: 'Lønnsomt prosjekt eller ikke?',
            content: 'Investeringsanalyse: er det lønnsomt å starte dette prosjektet? Nåverdimetoden (NPV — diskonterte fremtidige kontantstrømmer minus investering), internrente, payback-periode (hvor lang tid før investeringen er tilbakebetalt). Tidsverdien av penger er sentralt: 100 kr i dag er verdt mer enn 100 kr om fem år.',
            subpoints: [
                  { label: 'NPV', text: 'Nåverdi av fremtidige kontantstrømmer.' },
          { label: 'PAYBACK', text: 'Hvor lang tid til investeringen tilbakebetales.' },
            ],
            practical: 'Investering 1 mill. Forventet årlig kontantstrøm 250 000 kr. Hva er payback?',
            exercises: [
            {
      id: 'ml216-7-1',
      icon: '📊',
      title: 'Tidsverdi',
      question: 'Hvorfor er 100 kr i dag verdt mer enn 100 kr om 5 år?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Kan investere de 100 i dag og få avkastning over 5 år', isCorrect: true, feedback: 'Riktig! Tidsverdien av penger.' },
{ id: 'c', label: 'Inflasjon', isCorrect: false, feedback: 'Også en faktor, men ikke kjernen.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Diskonteringsrente representerer alternativ avkastning. Sentralt i NPV-beregning.',
    },
    {
      id: 'ml216-7-2',
      icon: '📊',
      title: 'Payback',
      question: 'Investering 1 mill. Årlig kontantstrøm 250 000. Payback?',
      choices: [
        { id: 'a', label: '1 år', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'b', label: '4 år (1 000 000 / 250 000)', isCorrect: true, feedback: 'Riktig! Enkel beregning.' },
{ id: 'c', label: '10 år', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'd', label: '20 år', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Payback er enkel og populær, men ignorerer tidsverdien av penger.',
    },
    {
      id: 'ml216-7-3',
      icon: '📊',
      title: 'Beste metode',
      question: 'Hvilken metode er teoretisk best?',
      choices: [
        { id: 'a', label: 'Payback', isCorrect: false, feedback: 'Enkel, men ufullstendig.' },
{ id: 'b', label: 'NPV — Net Present Value', isCorrect: true, feedback: 'Riktig! Tar hensyn til tidsverdien av penger.' },
{ id: 'c', label: 'Magefølelse', isCorrect: false, feedback: 'Subjektiv.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'NPV er gullstandarden. Payback brukes som supplement for likviditetshensyn.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '📐',
            title: 'Nøkkeltall',
            quote: 'Rentabilitet, likviditet, soliditet.',
            content: 'Tre hovedkategorier: Rentabilitet (avkastning på investert kapital), Likviditet (evne til å betale løpende), Soliditet (egenkapital som andel av totalkapital). Nøkkeltall gir rask vurdering av økonomisk helse. Brukes av investorer, banker, ledelse for å sammenligne bedrifter.',
            subpoints: [
                  { label: '3 KATEGORIER', text: 'Rentabilitet, likviditet, soliditet.' },
          { label: 'BENCHMARK', text: 'Sammenlign mot bransjegjennomsnitt.' },
            ],
            practical: 'Hvilke nøkkeltall ville du sjekket før investering i en bedrift?',
            exercises: [
            {
      id: 'ml216-8-1',
      icon: '📐',
      title: 'Kategorier',
      question: 'Hva er de 3 hovedkategoriene?',
      choices: [
        { id: 'a', label: 'Bare rentabilitet', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Rentabilitet, likviditet, soliditet', isCorrect: true, feedback: 'Riktig! Tre dimensjoner av økonomisk helse.' },
{ id: 'c', label: 'Bare overskudd', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver kategori har egne nøkkeltall. Komplett bilde krever alle tre.',
    },
    {
      id: 'ml216-8-2',
      icon: '📐',
      title: 'Soliditet',
      question: 'Hva måler soliditet?',
      choices: [
        { id: 'a', label: 'Salgsvolum', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Egenkapital som andel av totalkapital — robusthet mot tap', isCorrect: true, feedback: 'Riktig! Buffer mot dårlige tider.' },
{ id: 'c', label: 'Bare lønninger', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Norsk standard: soliditet > 30 % regnes som solid. Under 10 % er risikabelt.',
    },
    {
      id: 'ml216-8-3',
      icon: '📐',
      title: 'Bruk',
      question: 'Hvem bruker nøkkeltall?',
      choices: [
        { id: 'a', label: 'Bare ledelsen', isCorrect: false, feedback: 'Bredere bruk.' },
{ id: 'b', label: 'Investorer, banker, leverandører, ledelsen, ansatte', isCorrect: true, feedback: 'Riktig! Alle interessenter.' },
{ id: 'c', label: 'Bare offentlige', isCorrect: false, feedback: 'Privat sektor like aktivt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk verktøy.' },
      ],
      espenTip: 'Banker krever nøkkeltall før de gir lån. Investorer ser på nøkkeltall før de kjøper aksjer.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🎯',
            title: 'ROI i markedsføring',
            quote: 'Avkastning på markedsbudsjett.',
            content: 'ROI = (gevinst - kostnad) / kostnad × 100. Inkluderer alle marketing-kostnader (også internt arbeid). Hvis ROI er 30 %, er hver krone investert verdt 1,30 kr. Vanskelig å beregne presist for merkebygging — men kritisk for å rettferdiggjøre marketing-budsjett i ledelsen.',
            subpoints: [
                  { label: 'FORMEL', text: 'ROI = (gevinst - kostnad) / kostnad × 100.' },
          { label: 'HELHETLIG', text: 'Inkluder alle kostnader, ikke bare annonser.' },
            ],
            practical: 'Hvordan ville du beregnet ROI for en kampanje du har sett?',
            exercises: [
            {
      id: 'ml216-9-1',
      icon: '🎯',
      title: 'Definisjon',
      question: 'Hva er ROI?',
      choices: [
        { id: 'a', label: 'Bare omsetning', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: '(Gevinst - kostnad) / kostnad × 100', isCorrect: true, feedback: 'Riktig! Standard formel for avkastning.' },
{ id: 'c', label: 'Bare kostnad', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'ROI 30 % = 1.30 kr tilbake per krone investert. Standard finansielt mål.',
    },
    {
      id: 'ml216-9-2',
      icon: '🎯',
      title: 'Inkluder',
      question: 'Hva må inkluderes i marketing-kostnad?',
      choices: [
        { id: 'a', label: 'Bare annonser', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Annonser + internt arbeid + byråer + teknologi', isCorrect: true, feedback: 'Riktig! Helhetlig kostnadsbilde.' },
{ id: 'c', label: 'Bare lønninger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange undervurderer marketing-kostnad ved å glemme internt arbeid. Gir feilaktig høy ROI.',
    },
    {
      id: 'ml216-9-3',
      icon: '🎯',
      title: 'Vanskelig',
      question: 'Hvorfor er merkebygging vanskelig å attribuere?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelle årsaker.' },
{ id: 'b', label: 'Effekt skjer over år, mange faktorer påvirker, ikke direkte salg-link', isCorrect: true, feedback: 'Riktig! Strukturell utfordring.' },
{ id: 'c', label: 'Bare for B2B', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Coca-Cola kan ikke beregne nøyaktig ROI for julekampanjen. Men de vet at kjennskap holdes høyt — strategisk verdi.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📈',
            title: 'Hvorfor økonomisk forståelse er kritisk',
            quote: 'Marketing uten økonomi mister troverdighet.',
            content: 'Uten økonomisk kontroll dør selv den beste markedsstrategi. Markedsføring som ikke kan begrunnes med tall mister først budsjett, så stemme i ledelsen, så plass. Marketing-direktører som mestrer økonomi blir promotert. De som ikke gjør det, blir værende i marketing.',
            subpoints: [
                  { label: 'TROVERDIGHET', text: 'Tall snakker høyere enn ord i ledelsen.' },
          { label: 'KARRIERE', text: 'Økonomi-mestring skiller marketing-direktører som blir CEO.' },
            ],
            practical: 'Hva er de viktigste tallene en marketing-leder bør forstå?',
            exercises: [
            {
      id: 'ml216-10-1',
      icon: '📈',
      title: 'Konsekvens',
      question: 'Hva skjer med marketing uten tall?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Stort tap.' },
{ id: 'b', label: 'Mister budsjett, stemme, og til slutt plass i ledelsen', isCorrect: true, feedback: 'Riktig! Klassisk forløp.' },
{ id: 'c', label: 'Blir mer kreativ', isCorrect: false, feedback: 'Ikke nødvendigvis.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'I nedgangstider er marketing-budsjett ofte først ut. Tall-baserte argumenter beskytter.',
    },
    {
      id: 'ml216-10-2',
      icon: '📈',
      title: 'Karriere',
      question: 'Hva skiller marketing-direktører som blir CEO?',
      choices: [
        { id: 'a', label: 'Bare kreativitet', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Økonomisk forståelse + strategi + folk-kompetanse', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal kompetanse.' },
{ id: 'c', label: 'Bare nettverk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'Coca-Cola, P&G, Unilever — mange CEO-er kommer fra marketing. Felles: økonomisk mestring.',
    },
    {
      id: 'ml216-10-3',
      icon: '📈',
      title: 'Utvikling',
      question: 'Hvordan utvikle økonomisk forståelse?',
      choices: [
        { id: 'a', label: 'Bare kurs', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Lær regnskap + jobb tett med CFO + les bedriftens regnskap', isCorrect: true, feedback: 'Riktig! Praktisk + formell læring.' },
{ id: 'c', label: 'Bare lese bøker', isCorrect: false, feedback: 'For passivt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Marketing-leder bør kunne lese resultatregnskap, balanse, kontantstrøm. Grunnleggende ferdighet.',
    },
            ],
          },
        ]

        export default function OkonomistyringKalkulasjonBudsjetteringModule() {
          return (
            <DrawerModule
              moduleCode="ML2-16"
              moduleTitle="Økonomistyring, kalkulasjon og budsjettering"
              moduleIcon="💰"
              storageKey="learning-ml2-okonomistyring-kalkulasjon-budsjettering"
              completeRoute="/learning/ml2/okonomistyring-kalkulasjon-budsjettering/complete"
              phases={phases}
              intro="Tallenes tale — kalkulasjon, dekningsbidrag og budsjett som beslutningsgrunnlag for markedsføreren. Markedsføring uten økonomisk forståelse mister troverdighet i ledelsen."
              vissteduAt="Markedsdirektører som kan vise ROI behold budsjett. De som ikke kan, taper det. Økonomisk språk er marketing-direktørens viktigste verktøy."
              espenSier="Markedsføring som ikke kan begrunnes med tall mister først budsjett, så stemme i ledelsen, så plass. Lær økonomi-språket."
      presentationLink={{ route: '/learning/presentations/ml2/okonomistyring-kalkulasjon-budsjettering', description: 'Økonomistyring, kalkulasjon og budsjettering — 10 slides' }}
            />
          )
        }
