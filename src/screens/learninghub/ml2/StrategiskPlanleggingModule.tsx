        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🎯',
            title: 'Hva er strategi?',
            quote: 'Strategi er valgene som binder sammen mål, ressurser og marked.',
            content: 'Strategi er bedriftens overordnede valg for hvordan den skal nå målene sine — på lang sikt. Skiller seg fra taktikk (kortsiktige tiltak) og operasjonell ledelse (daglig drift). Strategiske valg er sjeldne, store og vanskelige å reversere — markedsvalg, produktportefølje, geografisk ekspansjon. Tar tid å implementere; tar tid å snu.',
            subpoints: [
                  { label: 'LANG SIKT', text: 'Strategi handler om 3-10 år fremover, ikke neste kvartal.' },
          { label: 'VANSKELIG Å REVERSERE', text: 'Strategiske valg krever ofte år å implementere. Velg klokt.' },
            ],
            practical: 'Hva er din egen \'strategi\' for de neste 5 årene? Hvor mange viktige valg har du allerede tatt?',
            exercises: [
            {
      id: 'ml201-1-1',
      icon: '🎯',
      title: 'Strategi vs taktikk',
      question: 'Hva er forskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil — viktig skille.' },
{ id: 'b', label: 'Strategi er lange linjer, taktikk er kortsiktige tiltak', isCorrect: true, feedback: 'Riktig! Strategi binder år sammen, taktikk binder uker.' },
{ id: 'c', label: 'Strategi er for store bedrifter', isCorrect: false, feedback: 'Alle har strategi — bevisst eller ubevisst.' },
{ id: 'd', label: 'Taktikk er viktigere', isCorrect: false, feedback: 'Taktikk uten strategi er handling uten retning.' },
      ],
      espenTip: 'En lansering er taktikk; valg av hvilket marked som lanseres i, er strategi.',
    },
    {
      id: 'ml201-1-2',
      icon: '🎯',
      title: 'Reversibilitet',
      question: 'Hva kjennetegner strategiske valg?',
      choices: [
        { id: 'a', label: 'Lett å reversere', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Vanskelig å reversere — krever år å implementere og snu', isCorrect: true, feedback: 'Riktig! Strategiske valg er sjelden noe man tar lett. Mister du markedet i Sverige, er det vanskelig å vinne tilbake.' },
{ id: 'c', label: 'Tatt på dagsbasis', isCorrect: false, feedback: 'Daglig beslutninger er operasjonelle.' },
{ id: 'd', label: 'Bare av styret', isCorrect: false, feedback: 'Operativt ledere tar også strategiske valg.' },
      ],
      espenTip: 'Test før beslutning: \'Kan vi snu denne om 6 måneder?\' Hvis nei, er det strategi — og krever bedre forberedelse.',
    },
    {
      id: 'ml201-1-3',
      icon: '🎯',
      title: 'Hvor lang horisont',
      question: 'Hvor lang er typisk strategisk horisont?',
      choices: [
        { id: 'a', label: '1-2 år', isCorrect: false, feedback: 'For kort — det er taktikk.' },
{ id: 'b', label: '3-10 år', isCorrect: true, feedback: 'Riktig! Strategisk planlegging ser typisk 3-10 år frem. Lengre i kapital-tunge bransjer (energi).' },
{ id: 'c', label: '30+ år', isCorrect: false, feedback: 'Sjelden — verden endrer seg for raskt.' },
{ id: 'd', label: 'Bare neste kvartal', isCorrect: false, feedback: 'Det er rapportering, ikke strategi.' },
      ],
      espenTip: 'Tek-bedrifter jobber ofte med 3-5 års horisont; energibedrifter 10-30 år. Tilpass etter bransjens dynamikk.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🌟',
            title: 'Visjon og verdier',
            quote: 'Ledestjernen og de moralske grensene.',
            content: 'Visjonen er det inspirerende bildet av bedriftens drømmesituasjon. Skal motivere ansatte og kunder, men være realistisk nok til å være troverdig. Verdiene er de etiske rammene — hvordan vi skal opptre når visjonen jages. Sammen utgjør de det \'ufordrekrelige\' når strategien endres.',
            subpoints: [
                  { label: 'VISJONEN MOTIVERER', text: 'Skal være inspirerende, men ikke så vag at ingen forstår hva den betyr.' },
          { label: 'VERDIENE STYRER', text: 'Hvordan vi opptrer når strategien settes på prøve.' },
            ],
            practical: 'Hva er din egen \'visjon\' for arbeidslivet? Hva er dine personlige verdier som ikke skal kompromisses?',
            exercises: [
            {
      id: 'ml201-2-1',
      icon: '🌟',
      title: 'Hva er en god visjon',
      question: 'Hvilken er en god visjon?',
      choices: [
        { id: 'a', label: '\'Vi skal selge mest mulig\'', isCorrect: false, feedback: 'For vagt og lite inspirerende.' },
{ id: 'b', label: '\'Vi skal gjøre Norge til verdens mest bærekraftige industriland\'', isCorrect: true, feedback: 'Riktig! Konkret nok til å forstå, ambisiøst nok til å motivere, langsiktig nok til å være strategisk.' },
{ id: 'c', label: '\'Vi skal følge alle lover\'', isCorrect: false, feedback: 'Lovpålagt — ikke en visjon.' },
{ id: 'd', label: '\'Vi skal ha størst budsjett\'', isCorrect: false, feedback: 'Internt fokus, ikke eksternt.' },
      ],
      espenTip: 'En god visjon kan forklares på 30 sekunder og inspirerer til handling — selv ti år ned i organisasjonen.',
    },
    {
      id: 'ml201-2-2',
      icon: '🌟',
      title: 'Visjonens rolle',
      question: 'Hva er visjonens primære rolle?',
      choices: [
        { id: 'a', label: 'Skattemessig avkastning', isCorrect: false, feedback: 'Visjonen er ikke et finansielt verktøy.' },
{ id: 'b', label: 'Inspirere og koordinere ansatte mot felles mål', isCorrect: true, feedback: 'Riktig! Visjonen samler organisasjonen. Uten klar visjon drar folk i ulike retninger.' },
{ id: 'c', label: 'Imponere konkurrenter', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Bare for reklame', isCorrect: false, feedback: 'Visjonen er internt verktøy primært.' },
      ],
      espenTip: 'Test: Hvis du sletter visjonen i morgen, ville noen merke det? Hvis ikke, er den ikke en ekte visjon.',
    },
    {
      id: 'ml201-2-3',
      icon: '🌟',
      title: 'Verdier i praksis',
      question: 'Hva er hovedformålet med uttalte verdier?',
      choices: [
        { id: 'a', label: 'Pynt på veggen', isCorrect: false, feedback: 'Døde verdier blir akkurat det.' },
{ id: 'b', label: 'Kompass når strategi settes på prøve — hvordan opptrer vi når det stormer?', isCorrect: true, feedback: 'Riktig! Verdier viser seg i kriser, ikke i gode tider. Ledelsens handlinger viser hvilke verdier som faktisk er reelle.' },
{ id: 'c', label: 'HR-policy', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Kontraktklausul', isCorrect: false, feedback: 'Verdier er bredere enn juridisk.' },
      ],
      espenTip: 'Test: Hva gjorde dere sist det var konflikt mellom inntjening og en uttalt verdi? Svaret avslører de reelle verdiene.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🌐',
            title: 'PESTEL-analyse',
            quote: 'Kartlegging av makroforhold som påvirker bedriften.',
            content: 'PESTEL strukturerer analysen av eksterne påvirkningsfaktorer: Politiske (regulering, valg), Økonomiske (BNP, rente, inflasjon), Sosiale (demografi, kultur), Teknologiske (innovasjon, automatisering), Environmental (miljø, klima), Lovmessige (nye lover). Brukes som grunnlag for strategi — du kan ikke planlegge uten å forstå rammene.',
            subpoints: [
                  { label: 'EKSTERNT FOKUS', text: 'PESTEL ser utenfor bedriften — på rammene den opererer i.' },
          { label: 'ALLE 6 KATEGORIER', text: 'Hopper du over én kategori, kan en blindsone ramme deg.' },
            ],
            practical: 'Velg en bransje og gjør en quick PESTEL: hva er viktigste politiske, økonomiske, sosiale, teknologiske, miljømessige og lovmessige drivere?',
            exercises: [
            {
      id: 'ml201-3-1',
      icon: '🌐',
      title: 'PESTEL',
      question: 'Hva står PESTEL for?',
      choices: [
        { id: 'a', label: 'Pris, Etterspørsel, Salg, Teknologi, Etikk, Lovverk', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Politisk, Økonomisk, Sosialt, Teknologisk, Environmental, Lovverk', isCorrect: true, feedback: 'Riktig! Det klassiske rammeverket for makroforhold-analyse.' },
{ id: 'c', label: 'Produksjon, Eksport, Salg, Transport, Energi, Logistikk', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Press, Effekt, Strategi, Tiltak, Evaluering, Læring', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'PESTEL er enkelt verktøy — bare lag en tabell med 6 kolonner og fyll inn faktorene per kategori.',
    },
    {
      id: 'ml201-3-2',
      icon: '🌐',
      title: 'Hvorfor PESTEL',
      question: 'Hvorfor brukes PESTEL?',
      choices: [
        { id: 'a', label: 'Pynt i strategidokumentet', isCorrect: false, feedback: 'Skal være praktisk verktøy.' },
{ id: 'b', label: 'Strukturert oversikt over eksterne påvirkningsfaktorer', isCorrect: true, feedback: 'Riktig! PESTEL hindrer at viktige eksterne forhold overses i strategien.' },
{ id: 'c', label: 'Bare for offentlige bedrifter', isCorrect: false, feedback: 'Brukes i alle bedrifter.' },
{ id: 'd', label: 'Erstatter SWOT', isCorrect: false, feedback: 'Komplementært, ikke erstatning.' },
      ],
      espenTip: 'PESTEL kommer FØR SWOT. Først forstår du eksterne forhold (PESTEL), så kobler du dem til egne styrker/svakheter (SWOT).',
    },
    {
      id: 'ml201-3-3',
      icon: '🌐',
      title: 'Praktisk eksempel',
      question: 'Norsk fiskeoppdrett rammet av nye EU-regler om fôringredienser. Hvilken PESTEL-kategori?',
      choices: [
        { id: 'a', label: 'Sosial', isCorrect: false, feedback: 'Sosiale faktorer er demografi/kultur.' },
{ id: 'b', label: 'Lovmessig (eller Politisk)', isCorrect: true, feedback: 'Riktig! EU-regulering er typisk Lovmessig — ofte koblet til Politisk.' },
{ id: 'c', label: 'Teknologisk', isCorrect: false, feedback: 'Teknologi er innovasjon, ikke regulering.' },
{ id: 'd', label: 'Environmental', isCorrect: false, feedback: 'Miljø er konsekvensen, ikke reguleringen.' },
      ],
      espenTip: 'Mange faktorer hører i flere kategorier. Det er greit — viktig er å fange dem opp.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📊',
            title: 'SWOT-analyse',
            quote: 'Indre styrker og svakheter, ytre muligheter og trusler.',
            content: 'SWOT (Strengths, Weaknesses, Opportunities, Threats) syntetiserer interne ressurser med eksterne forhold. S+W er internt, O+T er eksternt. Brukes som grunnlag for strategiske valg: hvordan utnytte styrker mot muligheter? Hvordan beskytte svakheter mot trusler? TOWS-matrisen tar SWOT et steg videre — kobler faktorene for å finne konkrete strategier.',
            subpoints: [
                  { label: 'S+W = INTERNT', text: 'Styrker og svakheter handler om bedriften selv.' },
          { label: 'O+T = EKSTERNT', text: 'Muligheter og trusler handler om markedet og omverden.' },
            ],
            practical: 'Lag en quick SWOT for deg selv som arbeidssøker. Hva er dine styrker, svakheter, muligheter, trusler?',
            exercises: [
            {
      id: 'ml201-4-1',
      icon: '📊',
      title: 'Hva betyr SWOT',
      question: 'Hvilke fire elementer?',
      choices: [
        { id: 'a', label: 'Styrker, Salg, Omsetning, Teknologi', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Strengths, Weaknesses, Opportunities, Threats', isCorrect: true, feedback: 'Riktig! Klassisk strategisk verktøy. S+W internt, O+T eksternt.' },
{ id: 'c', label: 'Strategi, Vekst, Optimalisering, Trender', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Sosialt, Vennlig, Original, Trygt', isCorrect: false, feedback: 'Helt feil tolkning.' },
      ],
      espenTip: 'SWOT er bare et rammeverk. Verdien ligger i å koble faktorene — TOWS-matrisen er neste steg.',
    },
    {
      id: 'ml201-4-2',
      icon: '📊',
      title: 'Internt vs eksternt',
      question: 'Hva er typisk Strength?',
      choices: [
        { id: 'a', label: 'Lave renter i markedet', isCorrect: false, feedback: 'Det er ekstern Opportunity.' },
{ id: 'b', label: 'Sterk merkevare med 80 % uhjulpen kjennskap', isCorrect: true, feedback: 'Riktig! Merkevare er intern ressurs — kontrollert av bedriften.' },
{ id: 'c', label: 'Konkurrent går konkurs', isCorrect: false, feedback: 'Ekstern Opportunity.' },
{ id: 'd', label: 'Inflasjon på 5 %', isCorrect: false, feedback: 'Ekstern Threat eller Opportunity.' },
      ],
      espenTip: 'Test: Hvis du våkner i morgen og bedriften er borte, finnes faktoren fortsatt? Hvis ja: ekstern. Hvis nei: intern.',
    },
    {
      id: 'ml201-4-3',
      icon: '📊',
      title: 'TOWS',
      question: 'Hva er fordelen med TOWS-matrisen sammenlignet med ren SWOT?',
      choices: [
        { id: 'a', label: 'Den er kortere', isCorrect: false, feedback: 'Det er motsatt.' },
{ id: 'b', label: 'Kobler faktorene — hvordan utnytte styrke mot mulighet, etc', isCorrect: true, feedback: 'Riktig! TOWS gir konkrete strategier. SWOT alene er bare en liste.' },
{ id: 'c', label: 'Kun for offentlige', isCorrect: false, feedback: 'Brukes alle steder.' },
{ id: 'd', label: 'Erstatter PESTEL', isCorrect: false, feedback: 'Komplementær.' },
      ],
      espenTip: 'TOWS-matrisen har 4 kvadranter: SO (offensivt), WO (forbedring), ST (defensivt), WT (overlevelse).',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🔑',
            title: 'Kritiske suksessfaktorer',
            quote: 'De få tingene som MÅ gå bra for at strategien skal lykkes.',
            content: 'Kritiske suksessfaktorer (CSF — Critical Success Factors) er de få variablene som er avgjørende for strategiens suksess. Identifisering av CSF tvinger frem prioritering — du kan ikke vinne på alt. For en kafé: beliggenhet, kvalitet på kaffe, dyktige baristaer, lojale kunder. Hver CSF får målbare KPI-er for oppfølging.',
            subpoints: [
                  { label: 'FÅ TING', text: '3-5 CSF-er per bedrift. Mer enn det er listen — ikke prioritering.' },
          { label: 'MÅLBARE', text: 'Hver CSF får KPI-er som måles regelmessig.' },
            ],
            practical: 'Hva er KPI-ene som mest påvirker en lokal restaurants suksess? Velg 3-5.',
            exercises: [
            {
      id: 'ml201-5-1',
      icon: '🔑',
      title: 'Antall CSF',
      question: 'Hvor mange kritiske suksessfaktorer bør en bedrift typisk ha?',
      choices: [
        { id: 'a', label: '20-30', isCorrect: false, feedback: 'For mange — er ikke prioritering.' },
{ id: 'b', label: '3-5', isCorrect: true, feedback: 'Riktig! Få nok til å fokusere på, mange nok til å dekke kjerneområdene.' },
{ id: 'c', label: 'Bare 1', isCorrect: false, feedback: 'For få — for sårbart.' },
{ id: 'd', label: '100', isCorrect: false, feedback: 'Helt feil — det er ingen prioritering.' },
      ],
      espenTip: 'Hvis listen din har 20 CSF-er, har du ikke prioritert. Velg de 3-5 som faktisk avgjør om du lykkes eller mislykkes.',
    },
    {
      id: 'ml201-5-2',
      icon: '🔑',
      title: 'Eksempel på CSF',
      question: 'Hvilken er typisk CSF for en SaaS-startup?',
      choices: [
        { id: 'a', label: 'Kontorets størrelse', isCorrect: false, feedback: 'Operativt detalj, ikke kritisk.' },
{ id: 'b', label: 'Customer churn rate (kundefrafall)', isCorrect: true, feedback: 'Riktig! For SaaS er det kritisk å beholde kunder. 5 % månedlig churn = 50 % årlig — bedriften dør.' },
{ id: 'c', label: 'Antall ansatte', isCorrect: false, feedback: 'Ressurs, ikke CSF.' },
{ id: 'd', label: 'Mengden kaffe konsumert', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Bransjespesifikt: SaaS = churn, hotell = belegg, butikk = omsetning per kvm, fly = belegg + drivstoff.',
    },
    {
      id: 'ml201-5-3',
      icon: '🔑',
      title: 'KPI for CSF',
      question: 'Hvorfor må CSF kobles med KPI?',
      choices: [
        { id: 'a', label: 'Lovkrav', isCorrect: false, feedback: 'Ikke lovpålagt.' },
{ id: 'b', label: 'For å måle om vi faktisk lykkes med det kritiske — ikke bare snakke om det', isCorrect: true, feedback: 'Riktig! Uten måling er CSF bare en samtale. KPI gjør det operativt.' },
{ id: 'c', label: 'Pynt for ledelsen', isCorrect: false, feedback: 'Verktøy for styring.' },
{ id: 'd', label: 'Erstatter strategien', isCorrect: false, feedback: 'Støtter strategien.' },
      ],
      espenTip: 'Klassisk feil: snakke om kundetilfredshet (CSF) uten å måle NPS (KPI). Da er det bare ord.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🛤️',
            title: 'Planleggingsprosessen',
            quote: 'Visjon → analyse → mål → strategi → implementering.',
            content: 'Strategisk planlegging er en strukturert prosess: 1) Visjon og verdier, 2) Analyse (PESTEL + SWOT), 3) Mål (SMART), 4) Strategi (valg av retning), 5) Implementering (handlingsplan). Hopper du over et steg, blir resten gjetning. Alle stegene må være eksplisitte og dokumentert. De fleste mislykkes på implementering — strategien skrives, men kommer aldri ut av møterommet.',
            subpoints: [
                  { label: 'STRUKTUR', text: '5 steg som bygger på hverandre — ikke valgfri rekkefølge.' },
          { label: 'DOKUMENTASJON', text: 'Strategi som ikke er skrevet ned er ikke strategi.' },
            ],
            practical: 'Hvilken strategiprosess har du sett i praksis (skole, fritidsorganisasjon, jobb)? Hva manglet?',
            exercises: [
            {
      id: 'ml201-6-1',
      icon: '🛤️',
      title: 'Riktig rekkefølge',
      question: 'Hva kommer FØRST?',
      choices: [
        { id: 'a', label: 'Mål', isCorrect: false, feedback: 'Mål kommer etter analyse.' },
{ id: 'b', label: 'Visjon og verdier', isCorrect: true, feedback: 'Riktig! Du må vite hvor du vil og hvordan du oppfører deg, før alt annet.' },
{ id: 'c', label: 'Strategi', isCorrect: false, feedback: 'Kommer mye senere.' },
{ id: 'd', label: 'Implementering', isCorrect: false, feedback: 'Siste steg, ikke første.' },
      ],
      espenTip: 'Mange hopper rett til mål eller strategi. Resultat: planlegging uten retning.',
    },
    {
      id: 'ml201-6-2',
      icon: '🛤️',
      title: 'Hvor mislykkes',
      question: 'Hvor svikter strategier oftest?',
      choices: [
        { id: 'a', label: 'I mål-fasen', isCorrect: false, feedback: 'Mål er typisk best gjennomtenkt.' },
{ id: 'b', label: 'I implementering — strategien kommer aldri ut av møterommet', isCorrect: true, feedback: 'Riktig! 70 % av strategier mislykkes pga svak implementering. Skrevet, men ikke gjort.' },
{ id: 'c', label: 'I analyse', isCorrect: false, feedback: 'Analyse gjøres ofte for grundig.' },
{ id: 'd', label: 'Strategi er alltid suksess', isCorrect: false, feedback: 'Helt feil — flertall mislykkes.' },
      ],
      espenTip: 'Bruk like mye tid på implementering som på utforming. Følg opp månedlig — ikke arkiver dokumentet.',
    },
    {
      id: 'ml201-6-3',
      icon: '🛤️',
      title: 'Dokumentasjon',
      question: 'Hvorfor må strategi dokumenteres?',
      choices: [
        { id: 'a', label: 'Lovkrav', isCorrect: false, feedback: 'Ikke lovkrav for private.' },
{ id: 'b', label: 'For å koordinere folk og kunne følge opp', isCorrect: true, feedback: 'Riktig! Uskreven strategi blir til 12 versjoner i 12 hoder. Skriftlig + delt = felles forståelse.' },
{ id: 'c', label: 'For å imponere', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Det må ikke', isCorrect: false, feedback: 'Da blir det kaos.' },
      ],
      espenTip: '1-side strategi som alle kan handle på > 200-side dokument som ingen leser.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🎯',
            title: 'Strategiske valg',
            quote: 'Strategi er like mye om hva man IKKE skal gjøre.',
            content: 'Strategi krever prioritering — du har begrenset tid, penger og energi. Klassiske valg: hvilke markeder å satse på, hvilke å forlate; hvilke produkter å utvikle, hvilke å fase ut; hvilke kunder å beholde, hvilke å la gå. De fleste bedrifter sier ja til for mye — sprer seg tynt. Beste strategi: si nei til 90 % for å vinne på de 10 %.',
            subpoints: [
                  { label: 'FOKUS', text: 'Konsentrasjon av ressurser på få områder slår spredning hver gang.' },
          { label: 'VALG = OFRE', text: 'Hvert ja er et nei til noe annet. Bevisst om ofrene gir bedre valg.' },
            ],
            practical: 'I ditt liv: hva har du sagt nei til for å få plass til viktige ja? Hva burde du sagt nei til?',
            exercises: [
            {
      id: 'ml201-7-1',
      icon: '🎯',
      title: 'Strategiens essens',
      question: 'Hva er kjernen i strategi?',
      choices: [
        { id: 'a', label: 'Gjøre alt', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Velge bevisst hva man IKKE skal gjøre', isCorrect: true, feedback: 'Riktig! Michael Porter: \'The essence of strategy is choosing what not to do.\' Fokus skaper resultater.' },
{ id: 'c', label: 'Ha størst budsjett', isCorrect: false, feedback: 'Penger uten retning gir ingenting.' },
{ id: 'd', label: 'Følge konkurrentene', isCorrect: false, feedback: 'Det er imitasjon, ikke strategi.' },
      ],
      espenTip: 'Apple sa nei til netbooks og Android-strategi. Konsentrerte seg om iPhone — vant kategorien.',
    },
    {
      id: 'ml201-7-2',
      icon: '🎯',
      title: 'Spredning',
      question: 'Hvorfor mislykkes spredning ofte?',
      choices: [
        { id: 'a', label: 'Krever for mye penger', isCorrect: false, feedback: 'Penger er ikke hovedproblem.' },
{ id: 'b', label: 'Tynn fokusering — ressurser fordeles på for mange områder', isCorrect: true, feedback: 'Riktig! Når du gjør 10 ting halvveis, vinner ingen av dem. Konsentrasjon slår spredning.' },
{ id: 'c', label: 'Konkurrentene blir misunnelige', isCorrect: false, feedback: 'Ikke relevant.' },
{ id: 'd', label: 'Det er alltid suksess', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Klassisk feil: bedrifter som sier ja til alle muligheter. De fleste mislykkes.',
    },
    {
      id: 'ml201-7-3',
      icon: '🎯',
      title: 'Trade-offs',
      question: 'Hva mente Porter med \'strategy is about trade-offs\'?',
      choices: [
        { id: 'a', label: 'Børshandel', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Hvert valg krever ofring av andre muligheter', isCorrect: true, feedback: 'Riktig! Du kan ikke være alt for alle. Hvert ja er et nei. Trade-offs avgjør identitet.' },
{ id: 'c', label: 'Bare for store bedrifter', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Kun for finansiering', isCorrect: false, feedback: 'Strategi er bredere.' },
      ],
      espenTip: 'Telia kan ikke være både premium og lavpris. Velger en — og holder seg til det.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '📈',
            title: 'Vekststrategier (Ansoff)',
            quote: 'Fire veier til vekst.',
            content: 'Ansoffs matrise gir fire vekststrategier: 1) Markedsinntrenging (samme produkt, samme marked — selg mer), 2) Markedsutvikling (samme produkt, nytt marked — eksport), 3) Produktutvikling (nytt produkt, samme marked — innovasjon), 4) Diversifikasjon (nytt produkt, nytt marked — risikabelt). Risiko øker fra 1 til 4. De fleste vellykkede bedrifter starter med 1-2 før de eventuelt prøver 3-4.',
            subpoints: [
                  { label: 'RISIKO STIGER', text: 'Markedsinntrenging er lavest risiko, diversifikasjon høyest.' },
          { label: 'REKKEFØLGE', text: 'Lønnsomme bedrifter behersker først lavrisikostrategier før høyrisiko.' },
            ],
            practical: 'En lokal bakeri ønsker vekst. Hvilke 4 strategier kan de velge mellom (Ansoff)? Hvilken er minst risikabel?',
            exercises: [
            {
      id: 'ml201-8-1',
      icon: '📈',
      title: 'Ansoff-strategier',
      question: 'Hvor mange strategier finnes i Ansoffs matrise?',
      choices: [
        { id: 'a', label: '2', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '4', isCorrect: true, feedback: 'Riktig! Markedsinntrenging, markedsutvikling, produktutvikling, diversifikasjon — kombinasjoner av kjent/nytt produkt × kjent/nytt marked.' },
{ id: 'c', label: '6', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: '10', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Tegn matrisen: produkt på x-aksen (nåværende/nytt), marked på y-aksen. Får 4 felter.',
    },
    {
      id: 'ml201-8-2',
      icon: '📈',
      title: 'Risikorangering',
      question: 'Hvilken Ansoff-strategi er høyest risiko?',
      choices: [
        { id: 'a', label: 'Markedsinntrenging', isCorrect: false, feedback: 'Lavest risiko — kjent terreng.' },
{ id: 'b', label: 'Diversifikasjon — nytt produkt i nytt marked', isCorrect: true, feedback: 'Riktig! Begge faktorer er nye. Ofte kalt \'bet the company\'-strategi.' },
{ id: 'c', label: 'Produktutvikling', isCorrect: false, feedback: 'Mellomrisiko.' },
{ id: 'd', label: 'Markedsutvikling', isCorrect: false, feedback: 'Mellomrisiko.' },
      ],
      espenTip: 'Nokia diversifiserte fra papir til mobiltelefoner — og lyktes. De fleste diversifikasjonsforsøk mislykkes.',
    },
    {
      id: 'ml201-8-3',
      icon: '📈',
      title: 'Praktisk eksempel',
      question: 'Norsk laksebrand starter salg i Kina. Hvilken Ansoff-strategi?',
      choices: [
        { id: 'a', label: 'Markedsinntrenging', isCorrect: false, feedback: 'Marked endres.' },
{ id: 'b', label: 'Markedsutvikling — samme produkt, nytt marked', isCorrect: true, feedback: 'Riktig! Lakse-produktet er likt, men det kinesiske markedet er nytt. Klassisk markedsutvikling via eksport.' },
{ id: 'c', label: 'Diversifikasjon', isCorrect: false, feedback: 'Bare ett av to elementer er nytt.' },
{ id: 'd', label: 'Produktutvikling', isCorrect: false, feedback: 'Produktet er likt.' },
      ],
      espenTip: 'Norsk fiskebransje har gjort markedsutvikling i 50 år. Eksport er nasjonens vekstmotor.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌱',
            title: 'Bærekraftig strategi',
            quote: 'Profitt + people + planet.',
            content: 'Moderne strategi inkluderer bærekraft som strategisk dimensjon, ikke bare risiko. Triple Bottom Line (Profit, People, Planet). EUs taksonomi og Åpenhetsloven gjør bærekraft til lovkrav. ESG-investorer prioriterer bærekraftige bedrifter. Norske eksempler: Equinor pivotert til energiselskap; Hydro elektrifiserer aluminium; Tomra dedikert til sirkulær økonomi. Ikke bare etikk — strategisk konkurransefortrinn.',
            subpoints: [
                  { label: 'TRIPLE BOTTOM LINE', text: 'Profit + People + Planet — alle tre måles og rapporteres.' },
          { label: 'STRATEGISK FORTRINN', text: 'Bærekraft kan være konkurransefortrinn, ikke kun kostnad.' },
            ],
            practical: 'Hvilken bedrift har du sett bygge konkurransefortrinn rundt bærekraft? Hva gjør de annerledes?',
            exercises: [
            {
      id: 'ml201-9-1',
      icon: '🌱',
      title: 'Triple Bottom Line',
      question: 'Hva betyr Triple Bottom Line?',
      choices: [
        { id: 'a', label: 'Tre måleenheter for omsetning', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'People, Planet, Profit — bedriftens tre bunnlinjer', isCorrect: true, feedback: 'Riktig! Måle bedriften på sosial, miljømessig og økonomisk effekt. Ikke bare overskudd.' },
{ id: 'c', label: 'Tre nivåer av kostnader', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Konkurransestrategier', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'EUs CSRD (Corporate Sustainability Reporting Directive) krever trippelt rapportering for store bedrifter.',
    },
    {
      id: 'ml201-9-2',
      icon: '🌱',
      title: 'ESG',
      question: 'Hva er ESG?',
      choices: [
        { id: 'a', label: 'Et regnskapssystem', isCorrect: false, feedback: 'Ikke regnskap.' },
{ id: 'b', label: 'Environmental, Social, Governance — investorenes vurderingskriterier', isCorrect: true, feedback: 'Riktig! ESG-fond har vokst eksplosivt. Bedrifter med dårlig ESG-score får dårligere finansieringsbetingelser.' },
{ id: 'c', label: 'Et europeisk salgssystem', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'ESG handler kun om miljø', isCorrect: false, feedback: 'For smalt — også sosiale og styringsmessige.' },
      ],
      espenTip: 'ESG-investerte midler globalt: over 30 trillion USD. Bærekraft er nå mainstream finansiell vurdering.',
    },
    {
      id: 'ml201-9-3',
      icon: '🌱',
      title: 'Norsk eksempel',
      question: 'Hvilket norsk selskap er kjent for strategisk bærekraft?',
      choices: [
        { id: 'a', label: 'Tomra — sirkulær økonomi som forretningsmodell', isCorrect: true, feedback: 'Riktig! Tomra har bygget global posisjon på resirkulering, panteautomater, sortering. Bærekraft er kjernekompetanse.' },
{ id: 'b', label: 'Statoil/Equinor — bare petroleum', isCorrect: false, feedback: 'Equinor pivoterer faktisk til fornybart.' },
{ id: 'c', label: 'REMA 1000 — kun pris', isCorrect: false, feedback: 'Bærekraft er sekundært i deres strategi.' },
{ id: 'd', label: 'Ingen norske selskaper', isCorrect: false, feedback: 'Helt feil — flere norske ledende.' },
      ],
      espenTip: 'Tomra er bevis på at bærekraft + lønnsomhet er forenelig. Verdsatt over 30 milliarder NOK på Oslo Børs.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🚀',
            title: 'Implementering',
            quote: 'Strategi uten implementering er bare ord.',
            content: '70 % av strategier mislykkes på implementering. Klassiske feil: dårlig kommunikasjon (ansatte forstår ikke strategien), manglende ressurser, ingen oppfølging, motstand mot endring. Suksess krever: tydelige KPI-er, månedlig oppfølging, ledelses-engasjement, tilstrekkelig ressursallokering, og kommunikasjon på alle nivåer. Ikke bare på toppledermøter.',
            subpoints: [
                  { label: '70 % MISLYKKES', text: 'McKinsey-studier viser konsistent at flertallet ikke når mål.' },
          { label: 'KOMMUNIKASJON', text: 'Hvis ansatte ikke forstår strategien, kan de ikke gjennomføre den.' },
            ],
            practical: 'Hvilken endring du har vært del av lyktes eller mislyktes? Hva avgjorde?',
            exercises: [
            {
      id: 'ml201-10-1',
      icon: '🚀',
      title: 'Suksessrate',
      question: 'Hvor mange strategier mislykkes typisk?',
      choices: [
        { id: 'a', label: '10 %', isCorrect: false, feedback: 'Underestimert.' },
{ id: 'b', label: '70 %', isCorrect: true, feedback: 'Riktig! McKinsey-tall. Konsistent over år og bransjer.' },
{ id: 'c', label: '5 %', isCorrect: false, feedback: 'Langt for lavt.' },
{ id: 'd', label: 'Alle lykkes', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Det er DERFOR implementering er like viktig som strategi. Ofte vanskeligere.',
    },
    {
      id: 'ml201-10-2',
      icon: '🚀',
      title: 'Hovedfeil',
      question: 'Hva er vanligste implementeringsfeil?',
      choices: [
        { id: 'a', label: 'For dyrt', isCorrect: false, feedback: 'Sjelden hovedårsak.' },
{ id: 'b', label: 'Dårlig kommunikasjon — ansatte forstår ikke strategien', isCorrect: true, feedback: 'Riktig! Strategi som bare lever på toppledernivå når aldri ut. Krever konstant kommunikasjon.' },
{ id: 'c', label: 'For mye dokumentasjon', isCorrect: false, feedback: 'Sjelden problem.' },
{ id: 'd', label: 'For mange møter', isCorrect: false, feedback: 'Symptom, ikke årsak.' },
      ],
      espenTip: 'Test: Be tilfeldig ansatt forklare strategien. Hvis de ikke kan, har du implementeringsproblem.',
    },
    {
      id: 'ml201-10-3',
      icon: '🚀',
      title: 'Hva trengs',
      question: 'Hva trengs for vellykket implementering?',
      choices: [
        { id: 'a', label: 'KPI-er, oppfølging, ledelse-engasjement, ressurser, kommunikasjon', isCorrect: true, feedback: 'Riktig! Helhetlig systemarbeid — ikke bare planning.' },
{ id: 'b', label: 'Bare en god plan', isCorrect: false, feedback: 'Plan uten utførelse er ingenting.' },
{ id: 'c', label: 'Bare penger', isCorrect: false, feedback: 'Penger uten ledelse er bortkastet.' },
{ id: 'd', label: 'Bare beste folk', isCorrect: false, feedback: 'Folk uten retning får ikke gjort noe.' },
      ],
      espenTip: 'Implementering er disiplin. Følg opp månedlig, juster basert på data, kommuniser konstant. Strategi er et verb, ikke et substantiv.',
    },
            ],
          },
        ]

        export default function StrategiskPlanleggingModule() {
          return (
            <DrawerModule
              moduleCode="ML2-01"
              moduleTitle="Strategisk planlegging"
              moduleIcon="🎯"
              storageKey="learning-ml2-strategisk-planlegging"
              completeRoute="/learning/ml2/strategisk-planlegging/complete"
              phases={phases}
              intro="Strategi er valgene som sikrer overlevelse og vekst på lang sikt. Strategisk planlegging gir struktur til disse valgene — fra visjon via analyse til konkrete tiltak. Uten strategi styrer du etter dagens vær; med strategi bygger du for hele året."
              vissteduAt="Equinor brukte strategisk planlegging til å pivotere fra ren olje- og gass-aktør til energiselskap. Navneskiftet i 2018 var det synlige resultatet av en planleggingsprosess som tok 5 år."
              espenSier="Strategi er like mye om hva du IKKE skal gjøre. Den viktigste øvelsen er å si nei til 90 % av mulighetene, slik at du kan vie alt fokus til de 10 % som virkelig betyr noe."
      presentationLink={{ route: '/learning/presentations/ml2/strategisk-planlegging', description: 'Strategisk planlegging — 10 slides' }}
            />
          )
        }
