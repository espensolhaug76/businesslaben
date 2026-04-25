        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '⚖️',
            title: 'Markedsføringsloven — lovens ramme',
            quote: 'Den sentrale loven for hva som er lov i reklame og salg.',
            content: 'Markedsføringsloven (mfl.) regulerer all kommersiell kommunikasjon i Norge. Forbyr urimelig handelspraksis (§ 6), villedende handlinger (§ 7) og aggressive metoder (§ 9). Forbrukertilsynet håndhever — kan gi forbud, dagbøter og overtredelsesgebyr opp til 4 % av omsetning. Loven gjelder all markedsføring uavhengig av kanal — fra TV til TikTok, fra plakat til personlig salg.',
            subpoints: [
                  { label: 'URIMELIG HANDELSPRAKSIS', text: '§ 6 — generell forbudsbestemmelse mot uredelig forretningsmetode.' },
          { label: 'VILLEDENDE', text: '§ 7 — kan ikke gi inntrykk som er objektivt usant. \'Norges beste\' krever dokumentasjon.' },
          { label: 'AGGRESSIVE METODER', text: '§ 9 — forbud mot påtrengende reklame, særlig mot sårbare grupper.' },
            ],
            practical: 'Hvor mange ulovlige reklamer ser du daglig uten å tenke over det? Hva ville du klaget på hvis du visste hvordan?',
            exercises: [
            {
      id: 'ml114-1-1',
      icon: '⚖️',
      title: 'Hvem håndhever',
      question: 'Hvilket organ håndhever Markedsføringsloven?',
      choices: [
        { id: 'a', label: 'Datatilsynet', isCorrect: false, feedback: 'De håndhever GDPR/personvern, ikke markedsføring.' },
{ id: 'b', label: 'Forbrukertilsynet', isCorrect: true, feedback: 'Riktig! Forbrukertilsynet (tidligere Forbrukerombudet) er primær håndhever.' },
{ id: 'c', label: 'Konkurransetilsynet', isCorrect: false, feedback: 'De håndterer kartellsaker, ikke reklame.' },
{ id: 'd', label: 'Mattilsynet', isCorrect: false, feedback: 'Bare for matprodukter — ikke reklame generelt.' },
      ],
      espenTip: 'Forbrukertilsynet publiserer alle vedtak åpent på forbrukertilsynet.no. Sjekk konkrete eksempler der.',
    },
    {
      id: 'ml114-1-2',
      icon: '⚖️',
      title: 'Villedende',
      question: 'En butikk reklamerer \'Norges billigste\'. Hva må butikken kunne dokumentere?',
      choices: [
        { id: 'a', label: 'Subjektiv mening', isCorrect: false, feedback: 'Reklame med faktapåstander må kunne dokumenteres.' },
{ id: 'b', label: 'Objektivt grunnlag — sammenligning med konkurrenter på samme produkter', isCorrect: true, feedback: 'Riktig! § 7 krever dokumentasjon. \'Norges billigste\' uten faktagrunnlag er villedende reklame.' },
{ id: 'c', label: 'Bare bedriftens egen oppfatning', isCorrect: false, feedback: 'Subjektiv tro er ikke nok juridisk.' },
{ id: 'd', label: 'Ingenting — det er bare reklame', isCorrect: false, feedback: 'Helt feil — alle faktapåstander må kunne dokumenteres.' },
      ],
      espenTip: 'Hvis du ikke kan dokumentere påstanden i en rettssak, ikke bruk den i reklamen. Enkelt regel.',
    },
    {
      id: 'ml114-1-3',
      icon: '⚖️',
      title: 'Maksbot',
      question: 'Hva er maks gebyr Forbrukertilsynet kan gi?',
      choices: [
        { id: 'a', label: '10 000 kr', isCorrect: false, feedback: 'Underestimert — gebyrer kan bli enorme.' },
{ id: 'b', label: '100 000 kr', isCorrect: false, feedback: 'Også for lavt for grove brudd.' },
{ id: 'c', label: 'Opp til 4 % av selskapets årsomsetning', isCorrect: true, feedback: 'Riktig! Etter lovendring i 2022 kan overtredelsesgebyr være opp til 4 % av omsetning. Tilpasset etter EU-regler.' },
{ id: 'd', label: 'Det er ikke gebyr — bare advarsel', isCorrect: false, feedback: 'Helt feil — gebyrene kan være store.' },
      ],
      espenTip: 'For Meta og Google kunne 4 % gjøre milliarder. For en norsk SMB betyr det også ofte konkurs.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📜',
            title: 'God markedsføringsskikk',
            quote: 'Reklamen skal ikke stride mot allmenne etiske og moralske verdier.',
            content: '§ 2 i Markedsføringsloven krever god markedsføringsskikk — utover lovkrav. Reklame som spiller på kroppspress, frykt eller utnyttelse av sårbare grupper kan være lovlig på papiret, men i strid med god skikk. Reklamenemnda (NRMM) håndterer klager basert på etisk vurdering. Bransjenormer fra Annonsørforeningen og NHO supplerer loven. Etikk er bredere enn jus — og påvirker omdømmet sterkere enn bøter.',
            subpoints: [
                  { label: 'BREDERE ENN LOVEN', text: 'Etisk akseptabelt > juridisk akseptabelt. Du kan vinne sak men tape merkevare.' },
          { label: 'REKLAMENEMNDA', text: 'NRMM behandler klager basert på etiske retningslinjer fra bransjen.' },
          { label: 'OMDØMME', text: 'Sosiale medier sprer dårlige opplevelser raskere enn noen gang.' },
            ],
            practical: 'Husker du en reklame som var lovlig, men som du synes var på etisk grenseland? Hva var ditt instinkt?',
            exercises: [
            {
      id: 'ml114-2-1',
      icon: '📜',
      title: 'Reklamenemnda',
      question: 'Hva er Næringslivets Reklamemiljø (NRMM)?',
      choices: [
        { id: 'a', label: 'Statlig domstol', isCorrect: false, feedback: 'Det er en bransjeorganisasjon, ikke statlig.' },
{ id: 'b', label: 'Privat organ som behandler klager basert på god skikk', isCorrect: true, feedback: 'Riktig! NRMM er bransjens egen klage-instans. Avgjørelser er anbefalinger, ikke pålegg — men ofte respektert.' },
{ id: 'c', label: 'Forbrukertilsynet', isCorrect: false, feedback: 'Forbrukertilsynet er statlig, NRMM er privat.' },
{ id: 'd', label: 'Reklamebyråenes lobby', isCorrect: false, feedback: 'De jobber med etikk, ikke lobby.' },
      ],
      espenTip: 'Selvregulering: bransjen vurderer om kampanjer er i tråd med god skikk. Ofte raskere enn rettsbehandling.',
    },
    {
      id: 'ml114-2-2',
      icon: '📜',
      title: 'Lov vs etikk',
      question: 'En reklame er teknisk lovlig, men spiller på kroppskompleks. Hva sier lovverket?',
      choices: [
        { id: 'a', label: 'Det er greit fordi det er lovlig', isCorrect: false, feedback: 'Lovlighet ≠ etisk forsvarlig.' },
{ id: 'b', label: 'God markedsføringsskikk (§ 2) kan likevel være brutt', isCorrect: true, feedback: 'Riktig! § 2 krever bredere etisk vurdering. Bransjenemnda kan også reagere.' },
{ id: 'c', label: 'Forbudt etter likestillingsloven', isCorrect: false, feedback: 'Likestillingsloven har strenge krav om kjønnsstereotypier.' },
{ id: 'd', label: 'Bare hvis det er rettet mot barn', isCorrect: false, feedback: 'Sårbarhet utvides — eldre, syke, lavinntekt også beskyttet.' },
      ],
      espenTip: 'H&Ms \'coolest monkey in the jungle\' (svart barn i ape-genser) var teknisk lovlig, men ødela merkevaren globalt. Etikk slår jus over tid.',
    },
    {
      id: 'ml114-2-3',
      icon: '📜',
      title: 'Sosiale medier-effekt',
      question: 'Hvorfor er etikk viktigere nå enn før?',
      choices: [
        { id: 'a', label: 'Lovene er strengere', isCorrect: false, feedback: 'Lovene er strenge, men hovedforskjellen er sosiale medier.' },
{ id: 'b', label: 'Sosiale medier sprer dårlige opplevelser raskere — krise på timer, ikke uker', isCorrect: true, feedback: 'Riktig! Én viral klage kan ødelegge omdømme bygget over år. Hastighet og rekkevidde er fundamentalt endret.' },
{ id: 'c', label: 'Kunder bryr seg ikke', isCorrect: false, feedback: 'Tvert imot — særlig yngre kunder bryr seg mer.' },
{ id: 'd', label: 'Gamle regler er irrelevante', isCorrect: false, feedback: 'Tradisjonelle regler gjelder fortsatt — men håndhevelsen er raskere via offentligheten.' },
      ],
      espenTip: 'Krisesimulering bør være standard øvelse for store bedrifter. Hva skjer når en feil treffer Twitter?',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🛒',
            title: 'Angrerettloven',
            quote: '14 dagers angrefrist for fjernsalg.',
            content: 'Angrerettloven gir kunden rett til å returnere varen innen 14 dager når kjøpet skjedde utenom fast utsalgssted (nett, telefonsalg, dørsalg). Bedriften må informere tydelig om angreretten — ellers utvides fristen til 12 måneder. Returkostnader skal opplyses. Visse varer (ferskvarer, individuelt tilpasset, hygieneprodukter åpnet) er unntatt. Klassiske feil: skjult informasjon, vanskelig retur-prosess, urimelige gebyrer.',
            subpoints: [
                  { label: '14 DAGER', text: 'Standard frist for fjernsalg. Starter fra mottakelse, ikke bestilling.' },
          { label: 'INFORMASJONSPLIKT', text: 'Bedriften må informere klart. Skjuler du info — fristen utvides til 12 måneder.' },
          { label: 'UNNTAK', text: 'Skreddersøm, ferskvarer, åpnede hygieneprodukter, abonnement på digitale ytelser etter levering.' },
            ],
            practical: 'Sist du kjøpte noe på nett — hvor lett var det å finne info om angreretten?',
            exercises: [
            {
      id: 'ml114-3-1',
      icon: '🛒',
      title: 'Frist',
      question: 'Standard angrefrist?',
      choices: [
        { id: 'a', label: '7 dager', isCorrect: false, feedback: 'Underestimert — 14 er hovedregel.' },
{ id: 'b', label: '14 dager', isCorrect: true, feedback: 'Riktig! Lov om angrerett § 21 setter 14 dager som hovedregel for fjernsalg.' },
{ id: 'c', label: '30 dager', isCorrect: false, feedback: 'For lang for lovkrav — men noen butikker tilbyr lenger frivillig.' },
{ id: 'd', label: '12 måneder', isCorrect: false, feedback: 'Bare hvis bedriften ikke informerte korrekt om angreretten.' },
      ],
      espenTip: 'Mange butikker tilbyr 30-60 dager åpen kjøp som konkurransefortrinn. Lovkravet er minimum, ikke maksimum.',
    },
    {
      id: 'ml114-3-2',
      icon: '🛒',
      title: 'Når starter fristen',
      question: 'Når begynner 14-dagersfristen å løpe?',
      choices: [
        { id: 'a', label: 'Når du bestiller', isCorrect: false, feedback: 'Galt — det er ikke leveringstidspunkt.' },
{ id: 'b', label: 'Når varen er mottatt', isCorrect: true, feedback: 'Riktig! Fristen starter når du fysisk har varen, ikke ved bestilling. Gir tid til faktisk vurdering.' },
{ id: 'c', label: 'Når du betaler', isCorrect: false, feedback: 'Betalingsdato er ikke avgjørende.' },
{ id: 'd', label: 'Når selger sender', isCorrect: false, feedback: 'Kunden vet ikke nødvendigvis dette tidspunktet.' },
      ],
      espenTip: 'Dokumenter mottaksdatoen — viktig hvis det blir tvist om angrefristens start.',
    },
    {
      id: 'ml114-3-3',
      icon: '🛒',
      title: 'Når angreretten utvides',
      question: 'Hva skjer hvis bedriften ikke informerer korrekt om angreretten?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Helt feil — det er konsekvenser.' },
{ id: 'b', label: 'Fristen utvides til 12 måneder', isCorrect: true, feedback: 'Riktig! Bedriften \'mister\' den korte fristen som straff for manglende info. Krevende konsekvens.' },
{ id: 'c', label: 'Bedriften får bot på 100 000 kr', isCorrect: false, feedback: 'Bot kan komme i tillegg, men hovedeffekten er fristforlengelse.' },
{ id: 'd', label: 'Salget blir ugyldig', isCorrect: false, feedback: 'Salget er gyldig — angreretten er bare utvidet.' },
      ],
      espenTip: 'Tydelig info i kjøpsprosessen er ikke bare god service — det er beskyttelse mot 12-måneders returkrav.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '💻',
            title: 'E-handelsloven',
            quote: 'Krav til informasjon på nett.',
            content: 'E-handelsloven krever informasjon på nettside: foretaksnavn, adresse, kontaktinfo, MVA-nummer. Klare bestillingsregler — kunden må vite hva hun bestiller, totalpris (inkl. mva og frakt), leveringstid. Bekreftelse skal sendes umiddelbart etter kjøp. Brudd kan gi bøter og pålegg fra Forbrukertilsynet. Mange små nettbutikker mangler grunnleggende info — risikabelt.',
            subpoints: [
                  { label: 'INFO-PLIKT', text: 'Foretaksnavn, adresse, e-post, MVA-nr, foretaksnummer skal være lett synlig.' },
          { label: 'PRIS', text: 'Totalpris inkludert avgifter og frakt skal være tydelig før kjøp.' },
          { label: 'BEKREFTELSE', text: 'Umiddelbart etter kjøp — typisk e-post med ordrenummer.' },
            ],
            practical: 'Sjekk en lokal nettbutikk: finner du all påkrevd info? Hva mangler?',
            exercises: [
            {
      id: 'ml114-4-1',
      icon: '💻',
      title: 'Krav til info',
      question: 'Hva må alltid være lett tilgjengelig på nettbutikken?',
      choices: [
        { id: 'a', label: 'CV til ansatte', isCorrect: false, feedback: 'Ikke nødvendig.' },
{ id: 'b', label: 'Foretaksnavn, adresse, e-post, MVA-nr, organisasjonsnr', isCorrect: true, feedback: 'Riktig! E-handelsloven § 10 krever dette. Ofte plassert i bunnmenyen.' },
{ id: 'c', label: 'Bare logo', isCorrect: false, feedback: 'Logo holder ikke som identifikasjon.' },
{ id: 'd', label: 'Bare telefonnummer', isCorrect: false, feedback: 'Ikke nok — e-post er primær kommunikasjon i e-handel.' },
      ],
      espenTip: 'Lag en \'Om oss\'- eller \'Kontakt\'-side med all info samlet. Lett for kunder, lett for tilsyn.',
    },
    {
      id: 'ml114-4-2',
      icon: '💻',
      title: 'Pris-info',
      question: 'Hva skal være tydelig før kunden klikker \'Kjøp\'?',
      choices: [
        { id: 'a', label: 'Bare prisen på produktet', isCorrect: false, feedback: 'For lite — full kostnad må vises.' },
{ id: 'b', label: 'Totalpris inkludert mva og frakt', isCorrect: true, feedback: 'Riktig! Skjult fraktkostnad oppdaget i siste øyeblikk er ulovlig og skaper handlevogn-forlatelse.' },
{ id: 'c', label: 'Pris uten avgifter', isCorrect: false, feedback: 'Brutto pris er ulovlig for forbrukere.' },
{ id: 'd', label: 'Bare omtrentlig pris', isCorrect: false, feedback: 'Eksakt pris kreves.' },
      ],
      espenTip: 'Vis full pris tidlig. Skjult kostnad i siste steg gir lavere konvertering OG juridisk risiko.',
    },
    {
      id: 'ml114-4-3',
      icon: '💻',
      title: 'Bekreftelse',
      question: 'Når må kjøpsbekreftelse sendes?',
      choices: [
        { id: 'a', label: 'Når varen er sendt', isCorrect: false, feedback: 'For sent — bekreftelse skal være ved kjøp, ikke sending.' },
{ id: 'b', label: 'Umiddelbart etter kjøp', isCorrect: true, feedback: 'Riktig! E-handelsloven krever at bekreftelse sendes umiddelbart — typisk via e-post med ordrenummer.' },
{ id: 'c', label: 'Bare hvis kunden ber om det', isCorrect: false, feedback: 'Loven krever automatisk bekreftelse.' },
{ id: 'd', label: 'Innen 14 dager', isCorrect: false, feedback: 'For sent — kunden vil vite umiddelbart at kjøp er gjort.' },
      ],
      espenTip: 'Automatisert e-post fra system. Inkluder ordrenummer, varer, totalpris, leveringsestimat.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🌍',
            title: 'Åpenhetsloven',
            quote: 'Krav om kontroll med menneskerettigheter i hele verdikjeden.',
            content: 'Åpenhetsloven (2022) krever at norske bedrifter med over 50 ansatte (eller 70 mill omsetning) dokumenterer kontroll med menneskerettigheter og arbeidsforhold i leverandørkjeden. Forbrukere har rett til innsyn i bedriftens funn — bedriften må svare innen 3 uker. Brudd kan gi sanksjoner. Loven har gjort ESG (Environmental, Social, Governance) til obligatorisk fra håndtering av leverandører — tøff for bedrifter med komplekse globale kjeder.',
            subpoints: [
                  { label: 'HVEM RAMMES', text: 'Bedrifter med 50+ ansatte eller 70 mill omsetning eller balansesum 35 mill.' },
          { label: 'HELE KJEDEN', text: 'Ikke bare egen bedrift — også leverandører og deres leverandører.' },
          { label: 'INNSYNSRETT', text: 'Forbrukere kan be om innsyn i bedriftens analyse. Svar innen 3 uker.' },
            ],
            practical: 'Kjenner du noen norske merkevarer som har slitt med leverandørkjede-skandaler? Hvordan håndterte de det?',
            exercises: [
            {
      id: 'ml114-5-1',
      icon: '🌍',
      title: 'Hvem rammes',
      question: 'Hvilke bedrifter må følge Åpenhetsloven?',
      choices: [
        { id: 'a', label: 'Alle bedrifter', isCorrect: false, feedback: 'For bredt — det er størrelsesgrenser.' },
{ id: 'b', label: 'Bedrifter over 50 ansatte (eller omsetning > 70 mill, eller balansesum > 35 mill)', isCorrect: true, feedback: 'Riktig! Mellomstore og store bedrifter er primær målgruppe. Små unntatt for å unngå byrde.' },
{ id: 'c', label: 'Kun børsnoterte', isCorrect: false, feedback: 'Bredere enn børsnoterte.' },
{ id: 'd', label: 'Kun statlige', isCorrect: false, feedback: 'Loven gjelder primært private — staten har egne regler.' },
      ],
      espenTip: 'Loven har trappet seg gradvis inn. Sjekk om din arbeidsplass er omfattet — informasjonsplikt er tydelig.',
    },
    {
      id: 'ml114-5-2',
      icon: '🌍',
      title: 'Hvor langt strekker den seg',
      question: 'Må bedriften kontrollere bare egne ansatte?',
      choices: [
        { id: 'a', label: 'Ja, kun egne ansatte', isCorrect: false, feedback: 'For smalt — loven er bredere.' },
{ id: 'b', label: 'Hele leverandørkjeden — også leverandørenes leverandører', isCorrect: true, feedback: 'Riktig! Loven krever \'aktsomhetsvurderinger\' gjennom hele kjeden. Det er der utfordringene ligger.' },
{ id: 'c', label: 'Bare første ledd', isCorrect: false, feedback: 'For smalt — loven krever full kjede.' },
{ id: 'd', label: 'Bare norske leverandører', isCorrect: false, feedback: 'Globale leverandører er like omfattet — kanskje viktigst.' },
      ],
      espenTip: 'Klesbransjen og elektronikk er mest komplisert — kjeder med 4-5 ledd til Asia/Afrika.',
    },
    {
      id: 'ml114-5-3',
      icon: '🌍',
      title: 'Innsynsplikt',
      question: 'En forbruker krever innsyn i bedriftens leverandøranalyse. Hva må bedriften gjøre?',
      choices: [
        { id: 'a', label: 'Ignorere — ingen plikt', isCorrect: false, feedback: 'Klart feil — innsynsrett er sentralt i loven.' },
{ id: 'b', label: 'Svare innen 3 uker med relevant info', isCorrect: true, feedback: 'Riktig! Forbrukere har rett til innsyn. Bedriften må svare grundig innen rimelig tid.' },
{ id: 'c', label: 'Bare svare hvis avis spør', isCorrect: false, feedback: 'Loven gjelder alle borgere, ikke bare media.' },
{ id: 'd', label: 'Saksøke forbrukeren', isCorrect: false, feedback: 'Helt feil — det er forbrukerens lovfestede rett.' },
      ],
      espenTip: 'Lag en standardprosess for innsynskrav. Spar dokumentasjon ryddig — du må vise frem hvordan du har analysert.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '👶',
            title: 'Beskyttelse av barn',
            quote: 'Spesielt strenge regler for reklame mot barn og unge.',
            content: 'Markedsføringsloven har strenge særregler for barn (under 18). § 21 krever at reklame ikke skal stride mot god skikk overfor mindreårige — hensyn til barns lette påvirkbarhet. Forbud mot å bruke barn til å oppfordre kjøp (\'be foreldrene dine kjøpe\'). Reklame for usunn mat, alkohol og spill mot mindreårige er sterkt regulert. Norske regler er strengere enn EU-minimum. Influencere må være ekstra forsiktige med følgere under 18.',
            subpoints: [
                  { label: 'INGEN UTNYTTELSE', text: 'Barn skal ikke utnyttes som direkte påvirkningskanal mot foreldre.' },
          { label: 'PRODUKTKATEGORIER', text: 'Alkohol, gambling, usunn mat — strenge restriksjoner mot barn.' },
          { label: 'STRENGERE I NORGE', text: 'Norske regler er strengere enn mange andre land — viktig for internasjonale kampanjer.' },
            ],
            practical: 'Tenk på en reklame du så som barn. Husker du den fortsatt? Hva forteller det om effekten på unge?',
            exercises: [
            {
      id: 'ml114-6-1',
      icon: '👶',
      title: 'Hovedprinsippet',
      question: 'Hvorfor er reklame mot barn særlig regulert?',
      choices: [
        { id: 'a', label: 'Barn forstår reklame bedre enn voksne', isCorrect: false, feedback: 'Tvert imot — barn skiller dårligere reklame fra redaksjonelt innhold.' },
{ id: 'b', label: 'Barn mangler erfaring til å vurdere kommersielle budskap kritisk', isCorrect: true, feedback: 'Riktig! Markedsføringsloven anerkjenner at barn er mer påvirkbare og har mindre evne til kritisk vurdering.' },
{ id: 'c', label: 'Barn har ingen penger uansett', isCorrect: false, feedback: 'De påvirker familiekjøp betydelig — pester power.' },
{ id: 'd', label: 'Det er ikke regulert', isCorrect: false, feedback: 'Helt feil — det er noen av de strengeste reglene.' },
      ],
      espenTip: 'Pester power: barn påvirker mor/fars kjøp på matvarer, leker, ferier. Derfor reklamerer matprodusenter direkte til barn — under strenge regler.',
    },
    {
      id: 'ml114-6-2',
      icon: '👶',
      title: 'Ulovlig grep',
      question: 'Hvilket grep er klart ulovlig i reklame mot barn?',
      choices: [
        { id: 'a', label: 'Bruke fargerike bilder', isCorrect: false, feedback: 'Lovlig så lenge ikke villedende.' },
{ id: 'b', label: 'Direkte oppfordre barn til å be foreldre kjøpe produktet', isCorrect: true, feedback: 'Riktig! § 21 forbyr dette eksplisitt. \'Mas på mor!\' eller \'Be far om en til!\' er ulovlig.' },
{ id: 'c', label: 'Beskrive produktet enkelt', isCorrect: false, feedback: 'Tilpasset språk er lovlig.' },
{ id: 'd', label: 'Bruke musikk', isCorrect: false, feedback: 'Musikk er lovlig.' },
      ],
      espenTip: 'Sjekk reklamen din: oppfordrer den barn å påvirke foreldre? Hvis ja, juridisk problem.',
    },
    {
      id: 'ml114-6-3',
      icon: '👶',
      title: 'Strenge kategorier',
      question: 'Hvilken kategori har særlig strenge restriksjoner mot barn?',
      choices: [
        { id: 'a', label: 'Bøker', isCorrect: false, feedback: 'Bøker er ikke spesielt regulert mot barn.' },
{ id: 'b', label: 'Alkohol — totalforbud i alle kanaler som når barn', isCorrect: true, feedback: 'Riktig! Norge har totalforbud mot alkoholreklame som kan nå barn. Strengere enn EU-minimum.' },
{ id: 'c', label: 'Klær', isCorrect: false, feedback: 'Klesreklame er minimalt regulert mot barn.' },
{ id: 'd', label: 'Ferier', isCorrect: false, feedback: 'Ikke spesielt regulert mot barn.' },
      ],
      espenTip: 'Også restriksjoner: usunn mat, gambling, kosmetisk kirurgi, slankekur — alle har spesielle regler mot barn.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🌱',
            title: 'Grønnvasking',
            quote: 'Det er ulovlig å lyve om miljøgevinster.',
            content: 'Forbrukertilsynet slår ned hardt på grønnvasking — bruk av vage eller udokumenterte miljøpåstander. SAS, flyselskaper og bilprodusenter har alle fått pålegg om å fjerne påstander om \'klimanøytral\' uten dokumentasjon. EUs Green Claims-direktiv (2024) skjerper kravene ytterligere. Spesifikke, dokumenterte og målbare påstander er kravet. Generelle ord som \'grønn\', \'bærekraftig\', \'miljøvennlig\' uten kontekst er ikke akseptable lenger.',
            subpoints: [
                  { label: 'DOKUMENTASJON', text: 'Hvert miljøpåstand må kunne dokumenteres med data og uavhengig verifikasjon.' },
          { label: 'SPESIFIKK > GENERELL', text: '\'25 % redusert utslipp i 2023 vs 2019\' > \'Mer miljøvennlig\'.' },
          { label: 'EU-RAMMEVERK', text: 'Green Claims-direktivet skjerper kravene ytterligere — bedrifter må forberede seg.' },
            ],
            practical: 'Sett deg selv som tilsynsperson. Hvilke \'grønne\' reklamer ville du undersøkt nærmere?',
            exercises: [
            {
      id: 'ml114-7-1',
      icon: '🌱',
      title: 'Grønnvasking',
      question: 'Hva er grønnvasking?',
      choices: [
        { id: 'a', label: 'Å vaske miljøvennlig', isCorrect: false, feedback: 'Bokstavelig tolkning — feil.' },
{ id: 'b', label: 'Å lyve eller bruke vage påstander om miljøprofil', isCorrect: true, feedback: 'Riktig! Grønnvasking er villedning om miljøgevinster. Forbudt under markedsføringsloven.' },
{ id: 'c', label: 'Sertifisering som økologisk', isCorrect: false, feedback: 'Det er reell miljømerking, ikke grønnvasking.' },
{ id: 'd', label: 'Reduksjon av energiforbruk', isCorrect: false, feedback: 'Det er bra praksis, ikke grønnvasking.' },
      ],
      espenTip: 'Forbrukertilsynet har slått ned på SAS, Norwegian, Statkraft og mange andre. Sjekk forbrukertilsynet.no for konkrete saker.',
    },
    {
      id: 'ml114-7-2',
      icon: '🌱',
      title: 'Akseptabelt vs ikke',
      question: 'Hvilken miljøpåstand er akseptabel?',
      choices: [
        { id: 'a', label: 'Vi er en grønn bedrift', isCorrect: false, feedback: 'For vagt — ingen dokumentasjon.' },
{ id: 'b', label: 'Vi reduserte CO2-utslipp med 23 % fra 2019 til 2023, verifisert av PwC', isCorrect: true, feedback: 'Riktig! Spesifikt, målbart, tidsbestemt og uavhengig verifisert. Standard for akseptabelt.' },
{ id: 'c', label: 'Klimanøytral via kompensasjon (uten å si hvor mye)', isCorrect: false, feedback: 'Forbrukertilsynet har slått ned på dette spesifikt — vag kompensasjon er ikke nok.' },
{ id: 'd', label: 'Bærekraftig', isCorrect: false, feedback: 'Tomt buzzword uten dokumentasjon.' },
      ],
      espenTip: 'Generell regel: hver påstand må være sann, spesifikk, dokumentert og verifiserbar.',
    },
    {
      id: 'ml114-7-3',
      icon: '🌱',
      title: 'Konsekvens',
      question: 'Hva kan grønnvasking koste bedriften?',
      choices: [
        { id: 'a', label: 'Bare advarsel', isCorrect: false, feedback: 'Ofte mer alvorlig — pålegg, gebyr og krav om endring.' },
{ id: 'b', label: 'Pålegg om endring + overtredelsesgebyr opp til 4 % av omsetning + omdømmetap', isCorrect: true, feedback: 'Riktig! Både juridiske sanksjoner og markedsføringsmessig skade. Forbrukere boikotter ofte.' },
{ id: 'c', label: 'Ingenting — det er bare reklame', isCorrect: false, feedback: 'Helt feil — strenge sanksjoner.' },
{ id: 'd', label: 'Fengsel for daglig leder', isCorrect: false, feedback: 'Sjelden direkte fengselsstraff, men er straffverdig.' },
      ],
      espenTip: 'Patagonia og andre \'ekte\' bærekraftsmerker bruker dette som konkurransefortrinn — andre kan ikke kopiere autentiske data.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🤝',
            title: 'Samfunnsansvar (CSR)',
            quote: 'Å gå lenger enn loven krever for å bidra positivt til samfunnet.',
            content: 'CSR (Corporate Social Responsibility) er bedriftens frivillige bidrag — utover lovkrav. Investering i lokalsamfunn, etiske leverandørkjeder, miljøtiltak utover minimum. Drives av forventninger fra kunder (særlig yngre), ansatte (rekrutteringsfortrinn), investorer (ESG-fond) og samfunnet generelt. Ikke alltid lønnsomt på kort sikt — men bygger merkevare og lojalitet langsiktig. Norske eksempler: Stormberg, Patagonia (USA, men sterkt i Norge), Tomra.',
            subpoints: [
                  { label: 'UTOVER LOVEN', text: 'CSR er frivillig — det som ikke er lovpålagt, men forventet av interessenter.' },
          { label: 'KUNDESEGMENT', text: 'Yngre forbrukere prioriterer CSR. Eldre fortsatt mer pris-fokuserte.' },
          { label: 'AUTENTISITET', text: 'Ekte CSR > grønnvasking. Forbrukere gjennomskuer raskt.' },
            ],
            practical: 'Hvilke bedrifter du kjenner, har reelt CSR-engasjement utover ord? Hva gjør de annerledes?',
            exercises: [
            {
      id: 'ml114-8-1',
      icon: '🤝',
      title: 'Hva er CSR',
      question: 'Hva er definisjonen av CSR?',
      choices: [
        { id: 'a', label: 'Lovkrav om miljørapportering', isCorrect: false, feedback: 'CSR er frivillig — utover lovkrav.' },
{ id: 'b', label: 'Frivillig samfunnsbidrag utover lovens minimum', isCorrect: true, feedback: 'Riktig! Skiller seg fra compliance ved at det er valgfritt — men strategisk viktig.' },
{ id: 'c', label: 'Bare donasjoner til veldedighet', isCorrect: false, feedback: 'CSR er bredere — inkluderer ansatte, leverandører, miljø.' },
{ id: 'd', label: 'Reklame', isCorrect: false, feedback: 'Ikke CSR — selv om CSR brukes i reklame.' },
      ],
      espenTip: 'CSR er ikke marketing — men resultatet er ofte bedre marketing. Forskjellen ligger i intensjon og varighet.',
    },
    {
      id: 'ml114-8-2',
      icon: '🤝',
      title: 'Stormberg',
      question: 'Hva er Stormberg sin CSR-strategi?',
      choices: [
        { id: 'a', label: 'Kun donerer overskudd', isCorrect: false, feedback: 'De gjør mer.' },
{ id: 'b', label: 'Ansetter folk med hull i CV-en, åpenhet om kostnadsstruktur', isCorrect: true, feedback: 'Riktig! Stormberg har bygget merkevare på sosial profil. Kundene velger dem ikke bare for produktet.' },
{ id: 'c', label: 'Ingen CSR', isCorrect: false, feedback: 'Helt feil — sentralt for merkevaren.' },
{ id: 'd', label: 'Bare på papir', isCorrect: false, feedback: 'Stormberg er kjent for konkrete handlinger.' },
      ],
      espenTip: 'Verdibasert differensiering er vanskelig å kopiere. Konkurrenter kan matche pris og kvalitet, men ikke autentiske verdier på et øyeblikk.',
    },
    {
      id: 'ml114-8-3',
      icon: '🤝',
      title: 'Forretningssaken',
      question: 'Hvorfor lønner CSR seg langsiktig?',
      choices: [
        { id: 'a', label: 'Det gjør det ikke', isCorrect: false, feedback: 'Forskning viser klart positiv effekt over tid.' },
{ id: 'b', label: 'Bedre rekruttering, lojalere kunder, lavere risiko, ESG-investorer', isCorrect: true, feedback: 'Riktig! Multi-stakeholder-fordel. Yngre talenter velger CSR-bedrifter; ESG-fond har vokst eksponentielt.' },
{ id: 'c', label: 'Kun donasjoner gir skattefordel', isCorrect: false, feedback: 'Skattefordel er sekundært — strategiske gevinster er primære.' },
{ id: 'd', label: 'Bare for offentlige bedrifter', isCorrect: false, feedback: 'Helt feil — privat sektor ofte ledende.' },
      ],
      espenTip: 'Goldman Sachs slutta å investere i \'kritiske\' selskaper. ESG-fond utgjør nå over 30 % av globalt investert kapital.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌐',
            title: 'Influencer-regulering',
            quote: 'Norge har noen av Europas strengeste influencer-regler.',
            content: 'Influencere må merke alle betalte samarbeid — #reklame eller #annonse. Forbrukertilsynet kontrollerer regelmessig og har bøtelagt mange. Strenge tilleggsregler for influencere som har følgere under 18 — restriksjoner mot reklame for kosmetisk kirurgi, slanking, ekstreme dietter. Bransjeavtalen mellom influencere og Forbrukertilsynet (2018) etablerte standarder. Mange brudd har ført til offentlig advarsel og bøter — sosiale medier følger nøye med.',
            subpoints: [
                  { label: 'MERKEPLIKT', text: 'All betalt innhold må merkes #reklame eller #annonse — synlig fra start.' },
          { label: 'UNGE FØLGERE', text: 'Influencere med følgere under 18 har ekstra restriksjoner — særlig kosmetikk og slanking.' },
          { label: 'HÅNDHEVELSE', text: 'Forbrukertilsynet kontrollerer regelmessig. Brudd offentliggjøres.' },
            ],
            practical: 'Følger du noen influencer? Hvor synlig er reklame-merkingen? Hva med sponsede produkter som ikke merkes?',
            exercises: [
            {
      id: 'ml114-9-1',
      icon: '🌐',
      title: 'Merkeplikt',
      question: 'Hva må norske influencere gjøre med betalt innhold?',
      choices: [
        { id: 'a', label: 'Ingenting — det er åpenbart', isCorrect: false, feedback: 'Helt feil — Forbrukertilsynet krever tydelig merking.' },
{ id: 'b', label: 'Tydelig merke det med #reklame eller #annonse — synlig fra start', isCorrect: true, feedback: 'Riktig! Brudd på merkeplikten kan gi bot. Mange har fått advarsler eller bøter.' },
{ id: 'c', label: 'Bare merke hvis annonsør krever det', isCorrect: false, feedback: 'Krav fra loven, ikke avtale.' },
{ id: 'd', label: 'Gjøre det privat', isCorrect: false, feedback: 'Da er det ikke reklame, og merkeplikten gjelder ikke.' },
      ],
      espenTip: 'Forbrukertilsynet sjekker influencer-kontoer regelmessig. Vær sikker — merk alltid om du har fått betalt eller produkt gratis.',
    },
    {
      id: 'ml114-9-2',
      icon: '🌐',
      title: 'Unge følgere',
      question: 'Hvilke ekstra regler gjelder for influencere med mange unge følgere?',
      choices: [
        { id: 'a', label: 'Ingen ekstra regler', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Restriksjoner mot reklame for kosmetisk kirurgi, slanking, ekstreme dietter', isCorrect: true, feedback: 'Riktig! Bransjeavtalen + lovendringer gir særlige vern for unge mot påvirkning på kropp og helse.' },
{ id: 'c', label: 'Bare lov å reklamere for klær', isCorrect: false, feedback: 'For begrenset — andre kategorier også lovlig.' },
      ],
      espenTip: 'Norske influencer-bransjen har egen norm om dette — utviklet sammen med Forbrukertilsynet for å være proaktive.',
    },
    {
      id: 'ml114-9-3',
      icon: '🌐',
      title: 'Bot',
      question: 'Hva kan en influencer få for brudd på merkeplikten?',
      choices: [
        { id: 'a', label: 'Bare advarsel', isCorrect: false, feedback: 'Ofte verre.' },
{ id: 'b', label: 'Bot — flere norske influencere har fått 50 000-200 000 kr i overtredelsesgebyr', isCorrect: true, feedback: 'Riktig! Forbrukertilsynet har bøtelagt flere kjente influencere. Saker offentliggjøres.' },
{ id: 'c', label: 'Fengsel', isCorrect: false, feedback: 'Sjeldnere fysisk straff — primært økonomisk og omdømme.' },
{ id: 'd', label: 'Ingenting', isCorrect: false, feedback: 'Helt feil — strenge sanksjoner i Norge.' },
      ],
      espenTip: 'Bot er ofte mindre enn omdømme-tapet. Når Forbrukertilsynet offentliggjør sak, sprer det seg via media.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🔐',
            title: 'Etikk i praksis',
            quote: 'Den enkleste etiske testen: \'Ville jeg vært stolt av denne på forsiden av Aftenposten?\'',
            content: 'Etisk markedsføring krever bevisste valg hver dag, ikke bare ved kriser. Klassiske etiske dilemmaer: aggressivt salg til sårbare grupper (eldre, syke, lavinntekt), bruk av frykt som virkemiddel, manipulasjon via personalisering og data, falsk skarphet (\'bare 2 igjen!\'). Etisk vurderingsmodell: er det lovlig? Er det rettferdig? Tåler det dagens lys? Vil jeg være stolt om 10 år? Hvis ett svar er nei, revider valget. Etisk drift bygger merkevare som tåler kriser — og er ofte den eneste vedvarende konkurransefordel.',
            subpoints: [
                  { label: '4-STEGS-TEST', text: 'Lovlig? Rettferdig? Tåler offentlighet? Stolt om 10 år?' },
          { label: 'KORTSIKTIG vs LANGSIKTIG', text: 'Uetisk salg fungerer kortsiktig — ødelegger lojalitet og omdømme langsiktig.' },
          { label: 'KULTUR', text: 'Etikk er ikke regler men kultur. Ledelsens eksempel teller mest.' },
            ],
            practical: 'Hva ville du gjort hvis sjefen din ba deg gjøre noe etisk problematisk men teknisk lovlig?',
            exercises: [
            {
      id: 'ml114-10-1',
      icon: '🔐',
      title: 'Etisk test',
      question: 'Hva er den enkleste etiske testen?',
      choices: [
        { id: 'a', label: 'Hva sier juristen?', isCorrect: false, feedback: 'Jus er minimum, ikke etikk-test.' },
{ id: 'b', label: 'Ville jeg vært stolt om denne handlingen sto på forsiden av Aftenposten?', isCorrect: true, feedback: 'Riktig! Aviskolonne-testen er klassisk og praktisk. Hvis nei, ikke gjør det.' },
{ id: 'c', label: 'Hva tjener mest penger?', isCorrect: false, feedback: 'Selger-perspektiv — uetisk og kortsiktig.' },
{ id: 'd', label: 'Hva forventer ledelsen?', isCorrect: false, feedback: 'Press fra ledelsen er ingen unnskyldning for uetisk handling.' },
      ],
      espenTip: 'En annen variant: \'Hadde jeg solgt dette til min mor?\' Hvis nei, ikke selg det til andre.',
    },
    {
      id: 'ml114-10-2',
      icon: '🔐',
      title: 'Sårbare grupper',
      question: 'Et selskap selger forsikring til en eldre kunde som tydelig ikke forstår produktet. Hva sier loven?',
      choices: [
        { id: 'a', label: 'Lovlig så lenge kontrakt er signert', isCorrect: false, feedback: 'Helt feil — sårbare grupper har spesielt vern.' },
{ id: 'b', label: 'Kan være ulovlig — markedsføringsloven beskytter sårbare grupper', isCorrect: true, feedback: 'Riktig! § 7 og § 9 i mfl. beskytter mot urimelig handelspraksis, særlig overfor barn, eldre og andre sårbare.' },
{ id: 'c', label: 'Avhenger kun av kontraktstørrelse', isCorrect: false, feedback: 'Beløp er ikke avgjørende — forståelse er.' },
{ id: 'd', label: 'Salg er aldri ulovlig', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Hvis kunden virker forvirret, stopp salget. Forklar igjen, eller foreslå at hun tar med pårørende. Lønnsomheten ligger i langsiktig tillit.',
    },
    {
      id: 'ml114-10-3',
      icon: '🔐',
      title: 'Falsk skarphet',
      question: 'En nettbutikk viser alltid \'Bare 2 igjen!\' selv om lageret er fullt. Hva er problemet?',
      choices: [
        { id: 'a', label: 'Ingenting — det er smart psykologi', isCorrect: false, feedback: 'Det er klart villedende reklame.' },
{ id: 'b', label: 'Villedende handelspraksis (§ 7) — kan gi bot fra Forbrukertilsynet', isCorrect: true, feedback: 'Riktig! Falsk knapphet for å presse kjøp er villedende. Booking.com fikk milliardbot fra EU for dette.' },
{ id: 'c', label: 'Bare problem hvis kunder klager', isCorrect: false, feedback: 'Klager fra forbrukere er én utløser, men brudd står uansett.' },
{ id: 'd', label: 'Lovlig fordi alle gjør det', isCorrect: false, feedback: 'Andre brudd legitimerer ikke ditt eget.' },
      ],
      espenTip: 'EU og norske myndigheter slår hardt ned på \'dark patterns\' i e-handel. Falsk knapphet er en av de hyppigst sanksjonerte.',
    },
            ],
          },
        ]

        export default function MarkedsforingsLovverkEtikkModule() {
          return (
            <DrawerModule
              moduleCode="ML1-14"
              moduleTitle="Markedsføringens lovverk og etikk"
              moduleIcon="⚖️"
              storageKey="learning-ml1-markedsforings-lovverk-etikk"
              completeRoute="/learning/ml1/markedsforings-lovverk-etikk/complete"
              phases={phases}
              intro="Markedsføringen i Norge er strengt regulert. Markedsføringsloven, Angrerettloven, Åpenhetsloven og en rekke spesiallover setter rammer. Forbrukertilsynet håndhever — bøter kan være store. Men etikk går utover lovkrav: omdømmet ditt avgjør langsiktig overlevelse mer enn rettsavgjørelser. Sosiale medier har gjort hver feil potensielt offentlig."
              vissteduAt="Forbrukertilsynet ila bøter på over 100 millioner kroner i 2023. Norge har noen av Europas strengeste regler for reklame mot barn — strengere enn EU-minimum."
              espenSier="Etisk drift er ikke en kostnad, men en investering. Bedrifter som tar lover og etikk på alvor bygger merkevare som tåler kriser. De som tar snarveier står før eller siden i Forbrukertilsynets søkelys — eller på forsiden av Aftenposten."
      presentationLink={{ route: '/learning/presentations/ml1/markedsforings-lovverk-etikk', description: 'Markedsføringens lovverk og etikk — 10 slides' }}
            />
          )
        }
