        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🌱',
            title: 'Hva er skalering?',
            quote: 'Vokse uten å miste det som virker.',
            content: 'Skalering = vokse omsetning og volum uten tilsvarende økning i kostnader. Forretningsmodellen må være repeterbar — produktet må kunne selges til mange likes kunder uten omfattende tilpasning. SaaS skalerer bra (samme kode, mange kunder). Konsulentbyrå skalerer dårlig (lineær mellom omsetning og ansatte). Skala krever forretningsmodell som er bygget for det.',
            subpoints: [
                  { label: 'REPETISJON', text: 'Skalerbar modell = produkt selger til mange like kunder.' },
          { label: 'MODELL', text: 'Konsulent vs SaaS — radikalt forskjellig skalerbarhet.' },
            ],
            practical: 'Er din forretningsmodell skalerbar? Hvorfor/hvorfor ikke?',
            exercises: [
            {
      id: 'ent212-1-1',
      icon: '🌱',
      title: 'Definisjon',
      question: 'Hva er skalering?',
      choices: [
        { id: 'a', label: 'Bare vokse', isCorrect: false, feedback: 'Mer presist.' },
{ id: 'b', label: 'Vokse omsetning uten tilsvarende kostnadsøkning', isCorrect: true, feedback: 'Riktig! Definisjon.' },
{ id: 'c', label: 'Bare ansette', isCorrect: false, feedback: 'Konsekvens, ikke definisjon.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Marginal kostnad per ny kunde må være lav. Det er kjernen i skalering.',
    },
    {
      id: 'ent212-1-2',
      icon: '🌱',
      title: 'Modell',
      question: 'SaaS vs konsulent?',
      choices: [
        { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Stor forskjell.' },
{ id: 'b', label: 'SaaS skalerer (samme kode, mange kunder); konsulent er lineært timer/kr', isCorrect: true, feedback: 'Riktig! Forretningsmodell-forskjell.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Modell-forskjell.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Konsulent kan skalere via spesialisering eller produkter — men starten er lineær.',
    },
    {
      id: 'ent212-1-3',
      icon: '🌱',
      title: 'Eksempel',
      question: 'Hvorfor skalerer Kahoot?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Software brukt av millioner — marginalkostnad per bruker nær null', isCorrect: true, feedback: 'Riktig! Klassisk software-skalering.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Modellen er kjernen.' },
{ id: 'd', label: 'Bare ansatte', isCorrect: false, feedback: 'Skala kommer fra modell.' },
      ],
      espenTip: 'Kahoot har 20% av norsk arbeidsstyrke som brukere — samme kode for alle.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🔄',
            title: 'Product-market fit',
            quote: 'Når produktet finner markedet.',
            content: 'PMF = produktet løser problemet markedet faktisk har. Marc Andreessen: \'Du kjenner det når du har det — kunden kjøper raskere enn du klarer å levere.\' Før PMF: ikke skaler, du vil bare gjøre feil raskere. Etter PMF: skaler aggressivt. Mange startups feiler ved å skalere før de har PMF. Slack hadde PMF før de gikk i markedsmodus.',
            subpoints: [
                  { label: 'FØR', text: 'Ikke skaler før PMF — du repeterer feil.' },
          { label: 'ETTER', text: 'Etter PMF skaler raskt før konkurrenter kommer.' },
            ],
            practical: 'Har din bedrift product-market fit? Hvordan vet du?',
            exercises: [
            {
      id: 'ent212-2-1',
      icon: '🔄',
      title: 'Definisjon',
      question: 'Hva er PMF?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'Mer presist.' },
{ id: 'b', label: 'Produktet løser kundens problem så godt at etterspørselen er sterk', isCorrect: true, feedback: 'Riktig! PMF-definisjon.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsfaktor.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Andreessen: \'Customers are buying as fast as you can make it.\'',
    },
    {
      id: 'ent212-2-2',
      icon: '🔄',
      title: 'Tegn',
      question: 'Tegn på PMF?',
      choices: [
        { id: 'a', label: 'Bare gode tilbakemeldinger', isCorrect: false, feedback: 'Sterkere tegn.' },
{ id: 'b', label: 'Organisk vekst, lav churn, kunder anbefaler andre, du sliter med å levere', isCorrect: true, feedback: 'Riktig! Sterke signaler.' },
{ id: 'c', label: 'Bare et salg', isCorrect: false, feedback: 'Trenger mønster.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte signaler.' },
      ],
      espenTip: 'Sean Ellis test: spør kunder hvor skuffet de blir hvis de mister produktet. >40% \'veldig skuffet\' = PMF.',
    },
    {
      id: 'ent212-2-3',
      icon: '🔄',
      title: 'Før vs etter',
      question: 'Hva endres ved PMF?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk skift.' },
{ id: 'b', label: 'Før PMF = optimaliser produkt; etter PMF = skaler salg/markedsføring', isCorrect: true, feedback: 'Riktig! To ulike faser.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk skift.' },
{ id: 'd', label: 'Bare ansette', isCorrect: false, feedback: 'Strategisk fokusskift.' },
      ],
      espenTip: 'Skalering før PMF = brenner kapital på feil retning. Etter PMF = optimaliser distribusjon.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📊',
            title: 'Skalere salg og markedsføring',
            quote: 'Bygge salgsmaskin som vokser.',
            content: 'Skalering av salg krever: 1) Repeterbar salgsprosess (alle kan selge samme måten), 2) Salgsmateriell og playbooks, 3) CRM-system (HubSpot, Salesforce), 4) Klare KPI-er (CAC, LTV, conversion). Outbound vs inbound: outbound skaler ved å ansette flere selgere, inbound ved å investere i innhold/SEO. Hubspot vokste ved inbound. Oracle ved outbound.',
            subpoints: [
                  { label: 'PROSESS', text: 'Du skaler ikke selgere, du skaler prosess.' },
          { label: 'MÅLBARE', text: 'CAC, LTV, churn — sjekkpunkter du må beherske.' },
            ],
            practical: 'Hvordan skalerer din bedrift salget?',
            exercises: [
            {
      id: 'ent212-3-1',
      icon: '📊',
      title: 'Krav',
      question: 'Hva skal til for å skalere salg?',
      choices: [
        { id: 'a', label: 'Bare flere selgere', isCorrect: false, feedback: 'Trenger system.' },
{ id: 'b', label: 'Repeterbar prosess, playbooks, CRM, KPI-er', isCorrect: true, feedback: 'Riktig! Systemiske krav.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Bredere system.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Uten prosess gjør hver selger sin egen variant — uskalerbar.',
    },
    {
      id: 'ent212-3-2',
      icon: '📊',
      title: 'Inbound',
      question: 'Hva er inbound salg?',
      choices: [
        { id: 'a', label: 'Selger ringer ut', isCorrect: false, feedback: 'Det er outbound.' },
{ id: 'b', label: 'Kunder kommer til deg via innhold, SEO, anbefaling', isCorrect: true, feedback: 'Riktig! Pull-modell.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Spesifikk modell.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert tilnærming.' },
      ],
      espenTip: 'Inbound: kunde-magnet (innhold, SEO). Outbound: cold calling, e-post.',
    },
    {
      id: 'ent212-3-3',
      icon: '📊',
      title: 'KPI',
      question: 'Viktigste salgs-KPI ved skalering?',
      choices: [
        { id: 'a', label: 'Bare omsetning', isCorrect: false, feedback: 'Grovt.' },
{ id: 'b', label: 'CAC og LTV — kostnad per kunde og kundens livstidsverdi', isCorrect: true, feedback: 'Riktig! Lønnsomhet.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Forretningsfaktor.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret KPI.' },
      ],
      espenTip: 'LTV/CAC > 3 = sunn bedrift. < 1 = brenner penger.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '👥',
            title: 'Skalere team og ansette',
            quote: 'Hvordan vokse fra 10 til 100.',
            content: 'Hver fordobling av ansatte krever ny struktur. 10 ansatte: alle vet alt. 25: avdelinger oppstår. 50: ledelseslag. 100: politikker. 250: byråkrati uten kjent kultur. Reed Hoffmans \'Blitzscaling\': prioriter hastighet over effektivitet i vekstfase. Men: feil ansettelse er dyrere enn ingen ansettelse. Stripe har egne \'first 100 engineers\'-playbook.',
            subpoints: [
                  { label: 'FASER', text: '10/25/50/100 — ulike utfordringer.' },
          { label: 'FEIL', text: 'Bedre å vente enn ansette feil person.' },
            ],
            practical: 'Hvor mange ansatte er din bedrift? Hva er neste utfordring?',
            exercises: [
            {
      id: 'ent212-4-1',
      icon: '👥',
      title: 'Faser',
      question: 'Hva skjer ved 50 ansatte?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Ledelseslag oppstår — ledere som leder ledere, ikke bare bidragsytere', isCorrect: true, feedback: 'Riktig! Klassisk overgang.' },
{ id: 'c', label: 'Ingenting', isCorrect: false, feedback: 'Stort skille.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Organisatorisk.' },
      ],
      espenTip: '10-50: alle bidragsytere. 50+: ledelse blir egen disiplin.',
    },
    {
      id: 'ent212-4-2',
      icon: '👥',
      title: 'Feilansettelse',
      question: 'Hvor mye koster feilansettelse?',
      choices: [
        { id: 'a', label: 'Lite', isCorrect: false, feedback: 'Mye.' },
{ id: 'b', label: 'Estimat: 2-3 ganger årslønn pluss forsinkelser', isCorrect: true, feedback: 'Riktig! Stort tap.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert estimat.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Forretningstap.' },
      ],
      espenTip: 'Tap inkluderer: lønn, opplæring, sluttpakke, tapt momentum, lederens tid.',
    },
    {
      id: 'ent212-4-3',
      icon: '👥',
      title: 'Blitzscaling',
      question: 'Hva er Reid Hoffmans blitzscaling?',
      choices: [
        { id: 'a', label: 'Bare ansette', isCorrect: false, feedback: 'Mer strategisk.' },
{ id: 'b', label: 'Prioriter hastighet over effektivitet i vekstfase for å vinne marked', isCorrect: true, feedback: 'Riktig! Konsept fra LinkedIn-grunnlegger.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert tilnærming.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Brukt av Facebook, Airbnb, Uber. Risiko: brenner kapital, bygger gjeld.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '⚙️',
            title: 'Skalere systemer og prosesser',
            quote: 'Automatisering og infrastruktur.',
            content: 'Det som virker manuelt for 10 kunder dør ved 1000. Skalering krever: 1) Automatisering av repetitive oppgaver, 2) Selvbetjening for kundene, 3) Robust IT-infrastruktur (cloud), 4) Dokumentasjon og prosessbeskrivelser. Stripe vokste ved å gjøre betaling 7 linjer kode. Shopify gjør e-handel selv-betjent. Manuelle workarounds som virker tidlig blir flaskehalser senere.',
            subpoints: [
                  { label: 'AUTOMATISER', text: 'Det som gjøres ofte må automatiseres.' },
          { label: 'SELVBETJENING', text: 'Kunden gjør jobben — du skalerer bedre.' },
            ],
            practical: 'Hva er din bedrifts største flaskehals i prosesser?',
            exercises: [
            {
      id: 'ent212-5-1',
      icon: '⚙️',
      title: 'Hva',
      question: 'Hva må skaleres i prosesser?',
      choices: [
        { id: 'a', label: 'Bare ansette flere', isCorrect: false, feedback: 'Bedre å automatisere.' },
{ id: 'b', label: 'Automatisering, selvbetjening, IT, dokumentasjon', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: '10 kunder kan håndteres med Excel. 1000 trenger system.',
    },
    {
      id: 'ent212-5-2',
      icon: '⚙️',
      title: 'Eksempel',
      question: 'Hva gjorde Stripe?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'Produktet var nøkkelen.' },
{ id: 'b', label: 'Gjorde betaling til 7 linjer kode — selvbetjent integrasjon', isCorrect: true, feedback: 'Riktig! Skalerings-mester.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisst design.' },
{ id: 'd', label: 'Bare ansatte', isCorrect: false, feedback: 'Produkt-design.' },
      ],
      espenTip: 'Stripe vant fordi de gjorde det enkelt for utviklere. Selvbetjening = skala.',
    },
    {
      id: 'ent212-5-3',
      icon: '⚙️',
      title: 'Manuelt',
      question: 'Hvorfor kollapser manuelle prosesser?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Lineær arbeidsmengde med kunde-vekst — flere kunder = flere timer', isCorrect: true, feedback: 'Riktig! Skala-blokkering.' },
{ id: 'c', label: 'Lov', isCorrect: false, feedback: 'Operasjonelt.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Operasjonell svikt.' },
      ],
      espenTip: 'Manuelt gjør det at du må ansette én ny per X kunder. Bryter skalering.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🌐',
            title: 'Internasjonalisering',
            quote: 'Vokse ut av Norge.',
            content: 'Norge er for lite for store ambisjoner. Norske scaleups går tidlig ut. Strategi: 1) Norden først (likhet i marked), 2) Engelsk-talende (UK/USA), 3) Lokaliser produkt + språk + betaling. Kahoot har 80% inntekter utenfor Norge. Cognite valgte USA før Asia. Risiko: språk, kultur, regulering. Mest vellykkede: nordisk hjemmebane → engelsk-talende → resten.',
            subpoints: [
                  { label: 'TIDLIG', text: 'Norge er for lite. Tenk globalt fra start.' },
          { label: 'FOKUS', text: 'Velg ett nytt marked, ikke fem.' },
            ],
            practical: 'Hvilke markeder bør din bedrift inn i? I hvilken rekkefølge?',
            exercises: [
            {
      id: 'ent212-6-1',
      icon: '🌐',
      title: 'Hvorfor',
      question: 'Hvorfor må norske bedrifter ut?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Norge er for lite — kun 5,5M innbyggere', isCorrect: true, feedback: 'Riktig! Markedstørrelse.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsfaktor.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Sammenlignet: USA 330M, EU 450M, Kina 1,4B. Norsk bedrift bygd for hjemme = liten.',
    },
    {
      id: 'ent212-6-2',
      icon: '🌐',
      title: 'Strategi',
      question: 'Hva er beste rekkefølge?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Norden → engelsktalende → resten — kultur-likhet først', isCorrect: true, feedback: 'Riktig! Risiko-trapp.' },
{ id: 'c', label: 'Kina først', isCorrect: false, feedback: 'Stort kultur-gap.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Sverige er lik Norge. UK gir engelsk + tilgang til USA. Asia kommer sist.',
    },
    {
      id: 'ent212-6-3',
      icon: '🌐',
      title: 'Eksempel',
      question: 'Hva gjorde Kahoot?',
      choices: [
        { id: 'a', label: 'Norge bare', isCorrect: false, feedback: 'Tidlig ut.' },
{ id: 'b', label: 'Tidlig USA-fokus — der er skole-markedet stort', isCorrect: true, feedback: 'Riktig! Strategisk valg.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisst.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'Kahoots stiftere flyttet til USA. Marked var der lærerne var. 80% inntekter utenlands.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '💰',
            title: 'Skalere finansiering',
            quote: 'Vokse kapital med vekst.',
            content: 'Skalerings-rundene: Seed (1-5M) → Series A (10-30M) → Series B (50-150M) → Series C (>150M). Hver runde har klare milepæler: A = PMF + tidlig skala, B = repeterbar vekst, C = markedslederskap. Norske scaleups som Cognite har vært gjennom alle. Equity vs gjeld vs venture: tidlig fase = equity (mest fleksibelt), sen fase kan også gjeld. Værvarsel: brenner mer enn 18 måneder cash = problem.',
            subpoints: [
                  { label: 'MILEPÆLER', text: 'Hver runde krever spesifikk fremgang.' },
          { label: 'RUNWAY', text: 'Alltid 18 måneders cash i banken.' },
            ],
            practical: 'Hvor mange måneder runway har din bedrift?',
            exercises: [
            {
      id: 'ent212-7-1',
      icon: '💰',
      title: 'Runder',
      question: 'Hva er Series A?',
      choices: [
        { id: 'a', label: 'Første runde', isCorrect: false, feedback: 'Det er seed.' },
{ id: 'b', label: 'Større runde etter PMF — typisk 10-30M for å skalere', isCorrect: true, feedback: 'Riktig! Vekstrunde.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Finansieringsrunde.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Seed → A → B → C. Beløp og krav øker hver runde.',
    },
    {
      id: 'ent212-7-2',
      icon: '💰',
      title: 'Milepæl',
      question: 'Hva forventer Series A-investor?',
      choices: [
        { id: 'a', label: 'Bare ide', isCorrect: false, feedback: 'Senere fase.' },
{ id: 'b', label: 'Product-market fit, repeterbar inntekt, klar skaleringsplan', isCorrect: true, feedback: 'Riktig! Bevis på modell.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte krav.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Forretningskrav.' },
      ],
      espenTip: 'Series A er ikke for ide — det er for å akselerere modell som virker.',
    },
    {
      id: 'ent212-7-3',
      icon: '💰',
      title: 'Runway',
      question: 'Hva er runway?',
      choices: [
        { id: 'a', label: 'Bare flytur', isCorrect: false, feedback: 'Forretningsbegrep.' },
{ id: 'b', label: 'Måneder med driftskapital før pengene tar slutt', isCorrect: true, feedback: 'Riktig! Survival-måling.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Finansiell måling.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Runway = (cash i banken) / (månedlig burn). Under 6 måneder = krise.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🏆',
            title: 'Bygge markedsposisjon',
            quote: 'Fra utfordrer til markedsleder.',
            content: 'Markedsposisjon: 1) Niche-leder (best i smal nisje), 2) Utfordrer (nr 2-3, kjemper opp), 3) Markedsleder (nr 1, definerer marked), 4) Følger (kopierer leder). Strategi varierer: utfordrer differensierer, leder forsvarer. Tomra er global markedsleder i panteautomater. Vipps er nasjonal leder. Strategi for å beholde posisjon: kontinuerlig innovasjon + brand-bygging + lojalitet.',
            subpoints: [
                  { label: 'NISJE', text: 'Bedre å være leder i nisje enn nr 5 i breddt marked.' },
          { label: 'FORSVARE', text: 'Markedsleder bruker mer på forsvar enn angrep.' },
            ],
            practical: 'Hva er din bedrifts markedsposisjon?',
            exercises: [
            {
      id: 'ent212-8-1',
      icon: '🏆',
      title: 'Posisjoner',
      question: 'Fire grunntyper markedsposisjoner?',
      choices: [
        { id: 'a', label: 'Bare leder', isCorrect: false, feedback: 'Fire roller.' },
{ id: 'b', label: 'Niche-leder, utfordrer, markedsleder, følger', isCorrect: true, feedback: 'Riktig! Strategiske roller.' },
{ id: 'c', label: 'Bare 2', isCorrect: false, feedback: 'Fire kategorier.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hver rolle har egen optimalstrategi. Følger-strategi = lavpris kopi.',
    },
    {
      id: 'ent212-8-2',
      icon: '🏆',
      title: 'Nisje',
      question: 'Hvorfor velge nisje?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Mindre konkurranse, lettere å bli leder, høyere marginer', isCorrect: true, feedback: 'Riktig! Strategi for små.' },
{ id: 'c', label: 'Bare PR', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Better at one thing > medium at many. Tomra er nesten alene globalt på pante.',
    },
    {
      id: 'ent212-8-3',
      icon: '🏆',
      title: 'Eksempel',
      question: 'Hvordan forsvarer Vipps posisjonen?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'Mer omfattende.' },
{ id: 'b', label: 'Brand, integrasjoner, brukervennlighet, økosystem, banktilknytning', isCorrect: true, feedback: 'Riktig! Helhetlig forsvar.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk forsvar.' },
      ],
      espenTip: 'Vipps forsvarer mot internasjonale (Apple Pay, Google Pay) ved nettverkseffekt og lokal tilpasning.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Misforståelser om skalering',
            quote: 'Vanlige feil ved vekst.',
            content: 'Vanlige feil: 1) Skalere før PMF — repeterer feil raskere. 2) Ansette for raskt — bygger feil kultur. 3) Ignorere kostnader — \'vi skal vokse oss til lønnsomhet\' fungerer sjelden. 4) Glemme kunden — ny ansatte er ikke kundefokuserte. 5) Holde på alle små kunder — drenerer ressurser. WeWork eksemplifiserer flere — skalerte uten lønnsomhet.',
            subpoints: [
                  { label: 'SEKVENS', text: 'PMF før skala. Lønnsomhet før vekst (vanligvis).' },
          { label: 'KUNDEKULTUR', text: 'Skala kan tørke ut kundefokus.' },
            ],
            practical: 'Hvilken misforståelse om skalering kjenner du igjen?',
            exercises: [
            {
      id: 'ent212-9-1',
      icon: '⚠️',
      title: 'Feil',
      question: 'Største vanlige skaleringsfeil?',
      choices: [
        { id: 'a', label: 'Bare ansette', isCorrect: false, feedback: 'Konsekvens.' },
{ id: 'b', label: 'Skalere før product-market fit', isCorrect: true, feedback: 'Riktig! Sentral feil.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategi-feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Skalere uten PMF = brenne kapital på feil retning. Klassisk dødsårsak.',
    },
    {
      id: 'ent212-9-2',
      icon: '⚠️',
      title: 'Lønnsom',
      question: 'Vokse seg til lønnsomhet?',
      choices: [
        { id: 'a', label: 'Alltid riktig', isCorrect: false, feedback: 'Sjelden.' },
{ id: 'b', label: 'Risikabelt — fungerer for noen plattformer, ofte ikke', isCorrect: true, feedback: 'Riktig! Avhenger av modell.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Aldri', isCorrect: false, feedback: 'Noen ganger virker det.' },
      ],
      espenTip: 'Amazon brukte 14 år på lønnsomhet — og hadde plan. WeWork hadde ikke.',
    },
    {
      id: 'ent212-9-3',
      icon: '⚠️',
      title: 'Kunder',
      question: 'Hva er problemet med å holde alle små kunder?',
      choices: [
        { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Stort problem.' },
{ id: 'b', label: 'Drenerer ressurser — bedre å fokusere på lønnsomme kundesegmenter', isCorrect: true, feedback: 'Riktig! Pareto-prinsippet.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: '20% av kunder gir 80% av omsetning. Skill mellom verdifulle og verdiløse.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '⚖️',
            title: 'Lovverk ved skalering',
            quote: 'Compliance-utfordringer ved vekst.',
            content: 'Skalering møter nye lovkrav: GDPR (datavolum øker), åpenhetsloven (>50 ansatte = krav), arbeidsmiljøloven (verneombud, AMU), regnskapsloven (revisjonsplikt), MVA-grenser (ulike land), produktansvarslov, skatte-EOR ved internasjonale ansatte. Mange scaleups blir overrasket av compliance-byrden. Bygg compliance-funksjon ved 25-50 ansatte.',
            subpoints: [
                  { label: 'TERSKLER', text: 'Visse antall ansatte/omsetning utløser nye krav.' },
          { label: 'INTERNASJONALT', text: 'Hvert land har egne regler.' },
            ],
            practical: 'Hvilke compliance-krav vil din bedrift møte ved vekst?',
            exercises: [
            {
      id: 'ent212-10-1',
      icon: '⚖️',
      title: 'GDPR',
      question: 'Hvorfor er GDPR utfordring ved skalering?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Mer data = mer ansvar, internasjonale krav, prosessdokumentasjon', isCorrect: true, feedback: 'Riktig! Datavolum-effekt.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelle krav.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Compliance.' },
      ],
      espenTip: '1000 kunder = 1000 datasubjekter med rettigheter (innsyn, sletting). Skala = byrde.',
    },
    {
      id: 'ent212-10-2',
      icon: '⚖️',
      title: 'Åpenhet',
      question: 'Når trer åpenhetsloven inn?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Konkret terskel.' },
{ id: 'b', label: 'Ved >50 ansatte ELLER ved store omsetnings-/balanse-grenser', isCorrect: true, feedback: 'Riktig! Terskel-utløsende.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Konkret terskel.' },
      ],
      espenTip: 'Åpenhetsloven krever aktsomhetsvurderinger og rapportering om menneskerettigheter.',
    },
    {
      id: 'ent212-10-3',
      icon: '⚖️',
      title: 'Internasjonalt',
      question: 'Hva er EOR?',
      choices: [
        { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Konkret tjeneste.' },
{ id: 'b', label: 'Employer of Record — selskap som ansetter på dine vegne i andre land', isCorrect: true, feedback: 'Riktig! Skala-verktøy.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Compliance-løsning.' },
      ],
      espenTip: 'EOR (Deel, Remote) lar deg ansette globalt uten å stifte selskap i hvert land.',
    },
            ],
          },
        ]

        export default function ForretningsutviklingSkaleringModule() {
          return (
            <DrawerModule
              moduleCode="ENT2-12"
              moduleTitle="Forretningsutvikling og skalering"
              moduleIcon="📈"
              storageKey="learning-ent2-forretningsutvikling-skalering"
              completeRoute="/learning/ent2/forretningsutvikling-skalering/complete"
              phases={phases}
              intro="Skalering er kunsten å vokse uten å miste kvalitet eller kultur. Mange startups dør i overgangen fra 10 til 100 ansatte."
              vissteduAt="Norske scaleups som Kahoot, Cognite og Oda har skalert raskt internasjonalt — alle har egne \'scaling playbooks\'."
              espenSier="Skalering = repetisjon av suksess. Ikke vokse før du har funnet noe som fungerer — men når du har, vokse raskt."
      presentationLink={{ route: '/learning/presentations/ent2/forretningsutvikling-skalering', description: 'Forretningsutvikling og skalering — 10 slides' }}
            />
          )
        }
