        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📣',
            title: 'IMC — Integrert markedskommunikasjon',
            quote: 'Én stemme utad gjennom alle kanaler.',
            content: 'IMC betyr at alle kommunikasjonskanaler — reklame, PR, salg, sosiale medier, kundeservice, intern kommunikasjon — leverer samme kjernebudskap. Konsistens bygger merkevare; sprik forvirrer kunden. Krever sentral merkestyring og klar visuell identitet.',
            subpoints: [
                  { label: 'KONSISTENS', text: 'Samme budskap, tone og visuell identitet uansett kanal.' },
          { label: 'KOORDINERING', text: 'Sentralt brand-team koordinerer på tvers av avdelinger.' },
            ],
            practical: 'Velg en bedrift du kjenner. Er kommunikasjonen konsistent på tvers av Instagram, nettside, butikk, kundeservice?',
            exercises: [
            {
      id: 'ml211-1-1',
      icon: '📣',
      title: 'Definisjon',
      question: 'Hva betyr IMC?',
      choices: [
        { id: 'a', label: 'International Marketing Council', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Integrated Marketing Communications — én stemme utad', isCorrect: true, feedback: 'Riktig! Strategisk koordinering på tvers av kanaler.' },
{ id: 'c', label: 'Internet Marketing Channel', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Internal Management Committee', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'IMC ble populært på 1990-tallet da kanaler eksploderte. Krevde nytt rammeverk for å holde sammen.',
    },
    {
      id: 'ml211-1-2',
      icon: '📣',
      title: 'Hvorfor',
      question: 'Hvorfor er konsistens viktig?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Bygger gjenkjennelse over tid og tillit hos kunden', isCorrect: true, feedback: 'Riktig! Sprik svekker merkevare. Konsistens bygger.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare estetikk', isCorrect: false, feedback: 'Strategisk verdi.' },
      ],
      espenTip: 'Apple har holdt samme visuell identitet i 20+ år. Det bygger umiddelbar gjenkjennelse globalt.',
    },
    {
      id: 'ml211-1-3',
      icon: '📣',
      title: 'Norsk eksempel',
      question: 'Hvilken norsk bedrift er sterk på IMC?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Telenor — konsistent julekampanje, samme tone på alle kanaler i 10+ år', isCorrect: true, feedback: 'Riktig! Telenor er klassisk eksempel på langsiktig IMC.' },
{ id: 'c', label: 'Helt feil', isCorrect: false, feedback: 'Faktisk veldig sterk.' },
{ id: 'd', label: 'Bare DnB', isCorrect: false, feedback: 'DnB er også sterk, men Telenor er enda mer konsistent.' },
      ],
      espenTip: 'Test: når du tenker \'jul + telekom\' i Norge, hva ser du? Telenor-julekampanjen — det er IMC i praksis.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🎯',
            title: 'Kommunikasjonsmål',
            quote: 'Fra kjennskap til handling.',
            content: 'Kommunikasjonsmål struktureres typisk i hierarki: kjennskap (vet de at vi finnes?), kunnskap (forstår de hva vi gjør?), holdning (liker de oss?), preferanse (foretrekker de oss?), handling (kjøper de?). Hvert mål krever ulik strategi og budskap. AIDA-modellen er beslektet.',
            subpoints: [
                  { label: 'HIERARKI', text: 'Kunden må gjennom flere stadier før kjøp.' },
          { label: 'ULIKE TILTAK', text: 'Kjennskap krever bred reklame; handling krever konkret call-to-action.' },
            ],
            practical: 'Hvilket kommunikasjonsstadium er du selv i for et merke du vurderer å kjøpe?',
            exercises: [
            {
      id: 'ml211-2-1',
      icon: '🎯',
      title: 'Stadier',
      question: 'Hva er typisk hierarki?',
      choices: [
        { id: 'a', label: 'Bare pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Kjennskap → kunnskap → holdning → preferanse → handling', isCorrect: true, feedback: 'Riktig! Klassisk kommunikasjonshierarki.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert modell.' },
{ id: 'd', label: 'Bare reklame → kjøp', isCorrect: false, feedback: 'For forenklet.' },
      ],
      espenTip: 'Modellen kalles også \'effekthierarkiet\'. Kunden må gjennom hvert steg før kjøp.',
    },
    {
      id: 'ml211-2-2',
      icon: '🎯',
      title: 'Strategisk valg',
      question: 'Hvor er målgruppen din?',
      choices: [
        { id: 'a', label: 'Spiller ingen rolle', isCorrect: false, feedback: 'Avgjørende for strategi.' },
{ id: 'b', label: 'Avgjør hvilken type budskap som passer — kjennskap krever bredt, handling krever spesifikt', isCorrect: true, feedback: 'Riktig! Match budskap til hvor kunden er.' },
{ id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Alltid samme', isCorrect: false, feedback: 'Tilpasset stadium.' },
      ],
      espenTip: 'Lansering = bygge kjennskap (TV, store kampanjer). Etablert merke = drive handling (Google Ads, retargeting).',
    },
    {
      id: 'ml211-2-3',
      icon: '🎯',
      title: 'AIDA',
      question: 'Hva er AIDA?',
      choices: [
        { id: 'a', label: 'Et merke', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Attention, Interest, Desire, Action — klassisk reklamemodell', isCorrect: true, feedback: 'Riktig! Beslektet med kommunikasjonshierarkiet.' },
{ id: 'c', label: 'African International Development Agency', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert modell.' },
      ],
      espenTip: 'AIDA er fra 1898. Fortsatt relevant — alle steg må fungere for at reklame skal virke.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🎚️',
            title: 'Påvirkningsmiksen',
            quote: '5 hovedverktøy.',
            content: 'Påvirkningsmiksen består av 5 verktøy: reklame (massekjennskap), PR (troverdighet), salgsfremming (kortsiktig boost), personlig salg (B2B og høyverdig B2C), direkte markedsføring (lojalitet). Strategisk vekting basert på mål og målgruppe. Få bedrifter bruker bare én.',
            subpoints: [
                  { label: '5 VERKTØY', text: 'Reklame, PR, salgsfremming, personlig salg, DM.' },
          { label: 'STRATEGISK VEKTING', text: 'Velg miks basert på mål, ikke vane.' },
            ],
            practical: 'Hvilken påvirkningsmiks bruker bedrifter du kjenner? Hvilke er overrepresentert?',
            exercises: [
            {
      id: 'ml211-3-1',
      icon: '🎚️',
      title: '5 verktøy',
      question: 'Hva er de 5 verktøyene?',
      choices: [
        { id: 'a', label: 'Pris, produkt, plass, promo', isCorrect: false, feedback: 'Det er markedsmiksen.' },
{ id: 'b', label: 'Reklame, PR, salgsfremming, personlig salg, direkte markedsføring', isCorrect: true, feedback: 'Riktig! Klassisk inndeling av kommunikasjonsverktøy.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert modell.' },
      ],
      espenTip: 'Hver har egne styrker. Reklame = bredde. Personlig salg = dybde. Riktig miks varierer.',
    },
    {
      id: 'ml211-3-2',
      icon: '🎚️',
      title: 'PR styrke',
      question: 'Hva er PRs unike styrke?',
      choices: [
        { id: 'a', label: 'Lavest pris', isCorrect: false, feedback: 'Ofte dyrt.' },
{ id: 'b', label: 'Troverdighet — tredjepart sier det, ikke bedriften selv', isCorrect: true, feedback: 'Riktig! Omtale i media oppfattes mer pålitelig enn reklame.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Brukes alle størrelser.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: '1 god avisartikkel kan være verdt 10 sider med reklame. Troverdigheten er kritisk forskjell.',
    },
    {
      id: 'ml211-3-3',
      icon: '🎚️',
      title: 'Salgsfremming',
      question: 'Hva er salgsfremming best til?',
      choices: [
        { id: 'a', label: 'Langsiktig merkebygging', isCorrect: false, feedback: 'Tvert imot — kortsiktig.' },
{ id: 'b', label: 'Kortsiktig boost — kampanjer, rabatter, konkurranser', isCorrect: true, feedback: 'Riktig! Effekt umiddelbar, men varig effekt liten.' },
{ id: 'c', label: 'Bygge merkevare', isCorrect: false, feedback: 'Sjelden — kan til og med skade premium-merker.' },
{ id: 'd', label: 'Tilfeldig bruk', isCorrect: false, feedback: 'Strukturert verktøy.' },
      ],
      espenTip: 'Black Friday = klassisk salgsfremming. Boost i salgsperiode, men kunder venter på neste rabatt.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🛤️',
            title: 'Den digitale kundereisen',
            quote: 'Oppdage → vurdere → konvertere → beholde.',
            content: 'Tradisjonell trakt er ikke lineær lenger — kundene hopper inn og ut, sammenligner, leser anmeldelser, sjekker sosiale medier. Markedsføringen må være tilstede i alle ledd. Customer Journey Mapping er strategisk verktøy for å forstå alle berøringspunkter.',
            subpoints: [
                  { label: 'IKKE LINEÆR', text: 'Moderne kunder hopper mellom kanaler og stadier.' },
          { label: 'MULTI-TOUCHPOINT', text: '5-20 berøringspunkter typisk før kjøp.' },
            ],
            practical: 'Husk siste større kjøp — hvor mange touchpoints hadde du før kjøp? Hva avgjorde?',
            exercises: [
            {
      id: 'ml211-4-1',
      icon: '🛤️',
      title: '4 stadier',
      question: 'Hva er den digitale kundereisens 4 stadier?',
      choices: [
        { id: 'a', label: 'Tilfeldige', isCorrect: false, feedback: 'Strukturert modell.' },
{ id: 'b', label: 'Oppdage, vurdere, konvertere, beholde', isCorrect: true, feedback: 'Riktig! Standard rammeverk for digital markedsføring.' },
{ id: 'c', label: 'Pris, produkt, plass, promo', isCorrect: false, feedback: 'Det er markedsmiksen.' },
{ id: 'd', label: 'Bare kjøp', isCorrect: false, feedback: 'For forenklet.' },
      ],
      espenTip: 'Hvert stadium krever ulike kanaler og budskap. Oppdage = sosiale medier. Konvertere = nettside CTA.',
    },
    {
      id: 'ml211-4-2',
      icon: '🛤️',
      title: 'Touchpoints',
      question: 'Hvor mange touchpoints typisk?',
      choices: [
        { id: 'a', label: '1-2', isCorrect: false, feedback: 'Underestimert.' },
{ id: 'b', label: '5-20 i komplekse kjøp, 7+ i typiske B2C', isCorrect: true, feedback: 'Riktig! Multi-touch er regelen, ikke unntaket.' },
{ id: 'c', label: 'Bare 1', isCorrect: false, feedback: 'For lavt.' },
{ id: 'd', label: '100+', isCorrect: false, feedback: 'Overdrevet.' },
      ],
      espenTip: 'Selv om kunden kjøper på nettstedet, har hun typisk vært innom Google, Instagram, anmeldelser, venner først.',
    },
    {
      id: 'ml211-4-3',
      icon: '🛤️',
      title: 'Mapping',
      question: 'Hva er Customer Journey Mapping?',
      choices: [
        { id: 'a', label: 'Bare GPS', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Strukturert oversikt over alle touchpoints kunden har med bedriften', isCorrect: true, feedback: 'Riktig! Strategisk verktøy for å avdekke smutthull og forbedringspunkter.' },
{ id: 'c', label: 'Markedsanalyse', isCorrect: false, feedback: 'Beslektet, men spesifikt på reisen.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert metode.' },
      ],
      espenTip: 'Tegn ut hver touchpoint: Google-søk → klikk på annonse → nettside → produktside → handlevogn → bekreftelse → e-post. Avdekker friksjon.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📝',
            title: 'Innholdsstrategi',
            quote: 'Content marketing — hjelp, ikke selg.',
            content: 'Content marketing bygger autoritet og tillit gjennom verdifullt innhold. DnBs Magma-blogg, Hubspots guider, Patagonias miljøreportasjer. Strategien er langsiktig — bli den foretrukne eksperten, så kjøper folk fra deg når de er klare. Krever konsistens (minst ukentlig) og faktisk verdi.',
            subpoints: [
                  { label: 'VERDI FØRST', text: 'Hjelp, ikke selg. Bygger tillit som blir til salg.' },
          { label: 'KONSISTENS', text: 'Minst ukentlig publisering. Sporadisk mister momentum.' },
            ],
            practical: 'Hvilken bedrift bruker innhold som strategi? Stoler du mer på dem som leverandør?',
            exercises: [
            {
      id: 'ml211-5-1',
      icon: '📝',
      title: 'Prinsipp',
      question: 'Hva er kjernen i \'hjelp, ikke selg\'?',
      choices: [
        { id: 'a', label: 'Aldri selg noe', isCorrect: false, feedback: 'Du selger til slutt — bare ikke i hver artikkel.' },
{ id: 'b', label: 'Skap verdi for leseren først; salg kommer som naturlig konsekvens', isCorrect: true, feedback: 'Riktig! Bygger tillit over tid.' },
{ id: 'c', label: 'Kun bruk innhold til å selge produktet direkte', isCorrect: false, feedback: 'Da er det salgstekst, ikke content marketing.' },
{ id: 'd', label: 'Ignorer salgsmål', isCorrect: false, feedback: 'Mål skal være der, men nås gjennom verdi.' },
      ],
      espenTip: 'Hubspot bygde milliardselskap på å gi bort markedsføring-guider gratis. Gull-standard.',
    },
    {
      id: 'ml211-5-2',
      icon: '📝',
      title: 'Konsistens',
      question: 'Minimum publiseringsfrekvens?',
      choices: [
        { id: 'a', label: 'Én gang i året', isCorrect: false, feedback: 'For lavt.' },
{ id: 'b', label: 'Minst ukentlig', isCorrect: true, feedback: 'Riktig! Konsistens er nøkkelen til både SEO og målgruppe-vekst.' },
{ id: 'c', label: 'Bare når man har tid', isCorrect: false, feedback: 'Sporadisk innhold mister momentum.' },
{ id: 'd', label: 'Daglig', isCorrect: false, feedback: 'Bra, men ikke realistisk for de fleste.' },
      ],
      espenTip: 'Velg én kanal og publiser konsistent der, fremfor mange kanaler sporadisk.',
    },
    {
      id: 'ml211-5-3',
      icon: '📝',
      title: 'Norsk eksempel',
      question: 'Hvilken norsk bedrift har sterk innholdsmarkedsføring?',
      choices: [
        { id: 'a', label: 'REMA 1000', isCorrect: false, feedback: 'Reklame-fokusert.' },
{ id: 'b', label: 'DnB med Magma-bloggen om personlig økonomi', isCorrect: true, feedback: 'Riktig! Magma er DnBs innholdshub. Bygger DnB som ekspert.' },
{ id: 'c', label: 'Coop med katalog', isCorrect: false, feedback: 'Reklame, ikke innhold.' },
{ id: 'd', label: 'Telia med fakturaen', isCorrect: false, feedback: 'Faktura er ikke marketing.' },
      ],
      espenTip: 'Andre eksempler: Equinor sin Energi-podkast, Schibsted sine bransjeguider, Nordnet sin investorblogg.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '📱',
            title: 'Sosiale medier og dialog',
            quote: 'Fra monolog til samspill.',
            content: 'Sosiale medier endret reklamen fundamentalt: kunden kan svare, kritisere, dele og kjøpe direkte i samme kanal. Hver plattform har egen dynamikk: Facebook 30+, Instagram 20-40, TikTok 15-25, LinkedIn B2B. Krever responstid (timer, ikke dager) og evne til å håndtere ros og ris åpent.',
            subpoints: [
                  { label: 'DIALOG', text: 'Forskjell fra TV: kunden svarer.' },
          { label: 'PLATTFORMTILPASNING', text: 'Samme video til alle plattformer feiler.' },
            ],
            practical: 'Hvilken bedrift gjør best på sosiale medier? Hva gjør de annerledes?',
            exercises: [
            {
      id: 'ml211-6-1',
      icon: '📱',
      title: 'Plattformforskjell',
      question: 'Hva er typisk forskjell Facebook vs TikTok?',
      choices: [
        { id: 'a', label: 'De er like', isCorrect: false, feedback: 'Helt forskjellige.' },
{ id: 'b', label: 'Facebook har eldre brukere (30+), TikTok dominerer 15-25-segmentet', isCorrect: true, feedback: 'Riktig! Aldersprofilen er svært ulik.' },
{ id: 'c', label: 'Facebook er kun B2B', isCorrect: false, feedback: 'Begge er primært B2C.' },
{ id: 'd', label: 'TikTok forbudt i Norge', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Distribusjonsregel: opprett innhold for hver plattform, ikke kopier.',
    },
    {
      id: 'ml211-6-2',
      icon: '📱',
      title: 'Krise',
      question: 'Kunde klager høyt på Facebook. Hva gjør du?',
      choices: [
        { id: 'a', label: 'Slett kommentaren', isCorrect: false, feedback: 'Sjelden lurt — andre vil se.' },
{ id: 'b', label: 'Svar offentlig, profesjonelt, tilby å ta saken til DM', isCorrect: true, feedback: 'Riktig! Åpenhet og rask respons viser at du tar kunder på alvor.' },
{ id: 'c', label: 'Ignorer', isCorrect: false, feedback: 'Verste alternativ.' },
{ id: 'd', label: 'Saksøk kunden', isCorrect: false, feedback: 'Helt overdrevet.' },
      ],
      espenTip: 'United Airlines tapte over 1 mrd USD i markedsverdi på et viralt klipp. Krise-kommunikasjon er kritisk.',
    },
    {
      id: 'ml211-6-3',
      icon: '📱',
      title: 'Norsk eksempel',
      question: 'Hvilken norsk bedrift er sterk på sosial?',
      choices: [
        { id: 'a', label: 'Statkraft', isCorrect: false, feedback: 'Solid bedrift, mindre sosial-fokus.' },
{ id: 'b', label: 'Vipps med viralt innhold på TikTok og Instagram', isCorrect: true, feedback: 'Riktig! Vipps har vært ekstremt aktive — humor på TikTok.' },
{ id: 'c', label: 'Bolig.no', isCorrect: false, feedback: 'Mindre fokus.' },
{ id: 'd', label: 'Hydro', isCorrect: false, feedback: 'Mest B2B og pressekontakt.' },
      ],
      espenTip: 'Vipps\' strategi: humoristisk, lokal, rask respons. Bygger merkevare som \'norsk og folkelig\'.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '💰',
            title: 'Budsjettering',
            quote: 'Mål- og oppgavemetoden.',
            content: 'Tre vanlige metoder: prosent av omsetning (enkelt, men reaktivt), konkurranse-metoden (følg de andre), mål- og oppgavemetoden (regn ut hva som kreves for målene). Den siste er strategisk, men krever disiplin. Mange bedrifter underbudsjetterer kommunikasjon — særlig i nedgangstider.',
            subpoints: [
                  { label: 'MÅL- OG OPPGAVE', text: 'Strategisk: definer mål, beregn ressursbehov.' },
          { label: 'PROSENT', text: 'Enkelt: x % av omsetning. Men reaktivt og lite strategisk.' },
            ],
            practical: 'Hvor mye bør en lansering koste i kommunikasjon? Hvordan beregne?',
            exercises: [
            {
      id: 'ml211-7-1',
      icon: '💰',
      title: 'Beste metode',
      question: 'Hvilken er mest strategisk?',
      choices: [
        { id: 'a', label: 'Prosent av omsetning', isCorrect: false, feedback: 'Enkelt, men ikke strategisk.' },
{ id: 'b', label: 'Mål- og oppgavemetoden — definer mål, beregn behov', isCorrect: true, feedback: 'Riktig! Krever mer arbeid, men gir riktig allokering.' },
{ id: 'c', label: 'Følg konkurrentene', isCorrect: false, feedback: 'Reaktivt.' },
{ id: 'd', label: 'Bruk samme som i fjor', isCorrect: false, feedback: 'Ingen strategi.' },
      ],
      espenTip: 'Mål- og oppgavemetoden tvinger frem realisme — ofte avslører at mål er urealistiske med eksisterende budsjett.',
    },
    {
      id: 'ml211-7-2',
      icon: '💰',
      title: 'Risiko',
      question: 'Hva er risiko ved prosent-metoden?',
      choices: [
        { id: 'a', label: 'For komplisert', isCorrect: false, feedback: 'Tvert imot — for enkel.' },
{ id: 'b', label: 'Blir reaktivt — kutter budsjett når salg faller, men da trenger man mer marketing', isCorrect: true, feedback: 'Riktig! Klassisk feil. Mister momentum.' },
{ id: 'c', label: 'For dyrt', isCorrect: false, feedback: 'Er metoden — ikke nivået.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig metode.' },
      ],
      espenTip: 'Investorer studerer dette: bedrifter som økt marketing i krise (Amazon 2009) har gjort det bedre enn de som kuttet.',
    },
    {
      id: 'ml211-7-3',
      icon: '💰',
      title: 'Underbudsjettering',
      question: 'Hva er klassisk feil?',
      choices: [
        { id: 'a', label: 'Bruke for mye', isCorrect: false, feedback: 'Ofte motsatt problem.' },
{ id: 'b', label: 'Underbudsjettere kommunikasjon — særlig for nye produkter', isCorrect: true, feedback: 'Riktig! Lansering uten kommunikasjons-budsjett = produktet dør.' },
{ id: 'c', label: 'Bruke alt på reklame', isCorrect: false, feedback: 'Mangler mix-balanse.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert problem.' },
      ],
      espenTip: 'Tommelfingerregel: lansering trenger 20-50 % av forventet første-års-omsetning i kommunikasjon.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '📊',
            title: 'Effektmåling (KPI)',
            quote: 'Hvordan vet vi at det virker?',
            content: 'Kommunikasjon må måles. Digitale kanaler: presise tall (klikk, konvertering, ROAS). Tradisjonelle: estimater (TNS Gallup, Kantar målgruppeundersøkelser). Brand tracking måler kjennskap, preferanse over tid. Velg KPI etter mål — ikke \'vanity metrics\' som likes uten kobling til konvertering.',
            subpoints: [
                  { label: 'DIGITAL = PRESIST', text: 'Hver visning, klikk og konvertering kan spores.' },
          { label: 'VANITY METRICS', text: 'Likes uten kobling til salg er ofte vanity.' },
            ],
            practical: 'Hvilke KPI-er måler bedriften du jobber for / kjenner? Er det vanity eller verdi?',
            exercises: [
            {
      id: 'ml211-8-1',
      icon: '📊',
      title: 'Vanity metric',
      question: 'Hva er en vanity metric?',
      choices: [
        { id: 'a', label: 'Salg', isCorrect: false, feedback: 'Faktisk verdi.' },
{ id: 'b', label: 'Antall likes uten kobling til konvertering', isCorrect: true, feedback: 'Riktig! Måler synlighet, ikke verdi.' },
{ id: 'c', label: 'ROAS', isCorrect: false, feedback: 'Direkte verdi-mål.' },
{ id: 'd', label: 'Customer Lifetime Value', isCorrect: false, feedback: 'Strategisk verdi-mål.' },
      ],
      espenTip: 'Steve Jobs sa: \'I don\'t care what people say about me. I care what they buy.\' Effekt > eksponering.',
    },
    {
      id: 'ml211-8-2',
      icon: '📊',
      title: 'ROAS',
      question: 'Hva betyr ROAS?',
      choices: [
        { id: 'a', label: 'Rate of Annual Sales', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Return on Ad Spend — inntekt per annonsekrone', isCorrect: true, feedback: 'Riktig! Standard performance metric.' },
{ id: 'c', label: 'Average Sales', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Risk Assessment', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'ROAS 4 = hver krone i annonser ga 4 kroner i salg. Over 3 regnes generelt som lønnsomt.',
    },
    {
      id: 'ml211-8-3',
      icon: '📊',
      title: 'Brand tracking',
      question: 'Hva måles?',
      choices: [
        { id: 'a', label: 'Bare salget', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Kjennskap, preferanse, oppfattet kvalitet over tid', isCorrect: true, feedback: 'Riktig! Strategiske indikatorer på merkets helse.' },
{ id: 'c', label: 'Antall ansatte', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Konkurrenters salg', isCorrect: false, feedback: 'Sekundært.' },
      ],
      espenTip: 'Norske store bedrifter gjør kvartalsvis brand tracking. Tidlig signal hvis merket begynner å falme.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🎬',
            title: 'Kreativ utforming',
            quote: 'Idéen slår produksjonsbudsjettet.',
            content: 'Lavbudsjett-kampanjer med god idé slår dyrt produserte uten idé. Apple sin \'1984\' og Coca-Colas julekampanjer er begge bevis. På sosiale medier avgjør de første 3 sekundene. Norske eksempler: Telenor-julekampanjen, Spotify Wrapped, IKEA-katalogen. Kreativitet er strategi.',
            subpoints: [
                  { label: 'IDÉ > BUDSJETT', text: 'God idé med lavt budsjett slår dårlig idé med stort budsjett.' },
          { label: 'FØRSTE 3 SEK', text: 'På sosiale medier avgjør hookene umiddelbart.' },
            ],
            practical: 'Hvilken reklame husker du best siste år? Hva gjorde den minneverdig?',
            exercises: [
            {
      id: 'ml211-9-1',
      icon: '🎬',
      title: 'Hva avgjør',
      question: 'Hva er viktigst for at reklame skal virke?',
      choices: [
        { id: 'a', label: 'Stort produksjonsbudsjett', isCorrect: false, feedback: 'Hjelper, men sekundært.' },
{ id: 'b', label: 'En klar, sterk kreativ idé', isCorrect: true, feedback: 'Riktig! Lavbudsjett med god idé slår dyrt uten idé.' },
{ id: 'c', label: 'Mange budskap samtidig', isCorrect: false, feedback: 'Tvert imot — fokus slår spredning.' },
{ id: 'd', label: 'Lengde — minst 60 sekunder', isCorrect: false, feedback: 'Korte er ofte mer effektive på sosiale medier.' },
      ],
      espenTip: 'Apple-eksempel: \'1984\'-reklamen kostet lite i produksjon, ekstremt sterk idé. Endret bransjen.',
    },
    {
      id: 'ml211-9-2',
      icon: '🎬',
      title: 'Sosial medier-attention',
      question: 'Hvor viktige er første sekunder?',
      choices: [
        { id: 'a', label: 'Lite — folk ser uansett ferdig', isCorrect: false, feedback: 'Helt feil — folk scroller.' },
{ id: 'b', label: 'Avgjørende — du har 3 sekunder før de scroller videre', isCorrect: true, feedback: 'Riktig! Algoritmen + adferd betyr at hookene må være på plass i sekund 1-3.' },
{ id: 'c', label: 'Slutten viktigst', isCorrect: false, feedback: 'CTA er viktig, men hvis ingen ser frem til slutten...' },
{ id: 'd', label: 'Bare lengde', isCorrect: false, feedback: 'Innhold > lengde.' },
      ],
      espenTip: 'TikTok-skapere bruker 80 % av tiden på de første 3 sekundene. Viktig kunnskap.',
    },
    {
      id: 'ml211-9-3',
      icon: '🎬',
      title: 'Klassiske grep',
      question: 'Hvilket er IKKE et klassisk kreativt grep?',
      choices: [
        { id: 'a', label: 'Humor', isCorrect: false, feedback: 'Klassisk grep.' },
{ id: 'b', label: 'Historiefortelling', isCorrect: false, feedback: 'En av de mest effektive.' },
{ id: 'c', label: 'Bare prislister og spesifikasjoner', isCorrect: true, feedback: 'Riktig! Rene fakta-lister er informasjon, ikke kreativ reklame. De huskes ikke.' },
{ id: 'd', label: 'Provokasjon', isCorrect: false, feedback: 'Risikabelt grep — Benetton brukte det.' },
      ],
      espenTip: 'Faktabasert reklame har sin plass (B2B), men trenger fortsatt en historie for å feste seg.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎯',
            title: 'Strategisk synergi',
            quote: 'Når 1+1 blir 3.',
            content: 'God strategisk kommunikasjon utnytter synergi mellom kanaler. TV-reklame skaper kjennskap som forsterkes av Google-søk og handles på nettsiden. Influencer-anbefaling skaper interesse som drives til konvertering via retargeting. Strategien tenker helhet, ikke siloer per kanal.',
            subpoints: [
                  { label: 'SYNERGI', text: 'Kanaler forsterker hverandre når koordinert.' },
          { label: 'HELHET', text: 'Strategi må tenke kanal-overskridende, ikke per silo.' },
            ],
            practical: 'Hvilken kampanje du har sett brukte flere kanaler effektivt sammen?',
            exercises: [
            {
      id: 'ml211-10-1',
      icon: '🎯',
      title: 'Synergi',
      question: 'Hva er synergi-effekt?',
      choices: [
        { id: 'a', label: 'Kostnadskutt', isCorrect: false, feedback: 'Kan være, men ikke kjernen.' },
{ id: 'b', label: 'Når kanaler forsterker hverandre — total effekt > sum av deler', isCorrect: true, feedback: 'Riktig! 1+1=3-prinsippet.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Brukes alle størrelser.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'TV-reklame + retargeting på Facebook + e-post = mye sterkere enn én kanal alene.',
    },
    {
      id: 'ml211-10-2',
      icon: '🎯',
      title: 'Helhet',
      question: 'Hvorfor må strategi tenke helhet?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Kunden opplever merket som ett — ikke som separate kanaler', isCorrect: true, feedback: 'Riktig! Sprik mellom kanaler skader merket.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Kunden bryr seg ikke om hvilken avdeling som driver kanalen. Hun ser bare merket — eller mangelen på konsistens.',
    },
    {
      id: 'ml211-10-3',
      icon: '🎯',
      title: 'Hva er strategisk komm.',
      question: 'Hva kjennetegner strategisk kommunikasjon?',
      choices: [
        { id: 'a', label: 'Mest mulig støy', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Bygger langsiktige verdier — ikke bare kortsiktig støy', isCorrect: true, feedback: 'Riktig! Modern tenkning. Konsistens over tid bygger merkekapital.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Kommunikasjon er bygging av langsiktige verdier — ikke et serie av engangshendelser.',
    },
            ],
          },
        ]

        export default function KommunikasjonsstrategierModule() {
          return (
            <DrawerModule
              moduleCode="ML2-11"
              moduleTitle="Kommunikasjonsstrategier"
              moduleIcon="📣"
              storageKey="learning-ml2-kommunikasjonsstrategier"
              completeRoute="/learning/ml2/kommunikasjonsstrategier/complete"
              phases={phases}
              intro="Integrert markedskommunikasjon (IMC) — én stemme utad gjennom alle kanaler. Strategisk kommunikasjon binder sammen reklame, PR, salg, sosiale medier og innhold til ett konsistent budskap som bygger merkevare over tid."
              vissteduAt="Telenor har holdt julekampanje-stilen konsistent i over 10 år. Forbrukerne forventer kampanjen — det er en kulturell hendelse. Konsistens over tid bygger \'mental hylleplassering\'."
              espenSier="Kommunikasjon uten strategi er bare støy. Strategisk kommunikasjon koordinerer alle kanaler mot felles mål — bygger merkevare som tåler kriser."
      presentationLink={{ route: '/learning/presentations/ml2/kommunikasjonsstrategier', description: 'Kommunikasjonsstrategier — 10 slides' }}
            />
          )
        }
