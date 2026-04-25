import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '💻',
    title: 'CRM — fra adressebok til sentralnervesystem',
    quote: '"Et CRM-system er ikke et sted man lagrer kontakter — det er stedet bedriften tenker om kundene sine."',
    content: 'I dagens omnikanal-marked er relasjonsbygging systemdrevet. Kunder forventer at enhver ansatt kjenner historikken, preferansene og problemene deres — uavhengig av hvem de snakket med sist. CRM-systemer (Customer Relationship Management) gjør dette mulig ved å samle all kundeinformasjon på ett sted.',
    subpoints: [
      { label: 'Problemet uten CRM', text: 'Kunden ringer og forklarer problemet for tredje gang til en ny person. Frustrasjon, tapte salg, dårlig omdømme' },
      { label: 'Løsningen med CRM', text: 'All dialog, alle kjøp og alle preferanser er logget. Enhver ansatt ser hele historikken umiddelbart' },
      { label: 'Mer enn kontakter', text: 'CRM er ikke en adressebok — det er et verktøy for analyse, prognose og automatisering' },
      { label: 'Markedsandel', text: 'Over 90 % av Fortune 500-bedrifter bruker CRM. Norske SMBer er i ferd med å ta det i bruk' },
    ],
    practical: 'Undersøk: Vet du om bedriften du jobber på har et CRM-system? Hva heter det? Har du tilgang til det?',
    exercises: [
      {
        id: 'dk1-1',
        icon: '💻',
        title: 'CRM-forståelse',
        question: 'Hva er det viktigste CRM-systemet gjør annerledes enn en vanlig kontaktliste?',
        choices: [
          { id: 'a', label: 'Det lagrer bilder av kundene', isCorrect: false, feedback: 'Bilder er ikke CRMs kjerneverdi. Kjernen er samling og tilgjengeliggjøring av all kundeinteraksjon.' },
          { id: 'b', label: 'Det samler all interaksjon, kjøpshistorikk og preferanser for en helhetlig kundeoversikt', isCorrect: true, feedback: 'Riktig! CRM skaper en 360-graders kundeprofil som all relevant informasjon er knyttet til.' },
          { id: 'c', label: 'Det sender automatisk julekort til kundene', isCorrect: false, feedback: 'Automatisert kommunikasjon er en funksjon, men ikke det som skiller CRM fra en adressebok.' },
          { id: 'd', label: 'Det er raskere enn Excel', isCorrect: false, feedback: 'Hastighet er ikke poenget. Helhetlig kundeinnsikt på tvers av alle ansatte er kjernefordelen.' },
        ],
        espenTip: 'CRM = "Customer Relationship Management". Hjertet er "Relationship" — å forvalte relasjonen systematisk over tid, ikke bare lagre kontaktinformasjon.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🏗️',
    title: 'CRM-systemets arkitektur',
    quote: '"Data inn er data ut — CRM er bare så nyttig som den informasjonen som registreres."',
    content: 'Effektiv bruk av CRM handler om datadisiplin: å registrere møtenotater, kjøpshistorikk og kundepreferanser konsekvent. Et CRM-system er organisert rundt noen kjerneelementer som henger sammen og gir et helhetlig bilde.',
    subpoints: [
      { label: 'Kontaktobjekter', text: 'Individer (Contacts) og virksomheter (Accounts). Knyttes til hverandre — John Nilsen er innkjøpssjef i Rema 1000 AS' },
      { label: 'Aktivitetslogg', text: 'Alle møter, samtaler og epost-dialog logges. Hvem snakket med hvem, når og om hva' },
      { label: 'Muligheter (Deals)', text: 'Salgs-muligheter med verdi, sannsynlighet og forventet dato. Grunnlaget for salgsprognoser' },
      { label: 'Saker (Cases)', text: 'Kundeklager og serviceforespørsler trackes fra mottakelse til løsning' },
    ],
    practical: 'Tenk over: Hva skjer om en salgsperson slutter uten å ha registrert noe i CRM? Hva mister bedriften? Det er svaret på hvorfor CRM-registrering er kritisk.',
    exercises: [
      {
        id: 'dk2-1',
        icon: '🏗️',
        title: 'Datadisiplin',
        question: 'En selger har hatt 5 kundemøter men ikke registrert noe i CRM. Hun slutter. Hva er konsekvensen?',
        choices: [
          { id: 'a', label: 'Minimal — ny selger kan ringe og spørre kunden på nytt', isCorrect: false, feedback: 'Kunden må gjenfortelle alt. Dette er frustrerende og profesjonelt pinlig for bedriften.' },
          { id: 'b', label: 'Bedriften mister all kunnskap om relasjonene og salgsprosessens status', isCorrect: true, feedback: 'Riktig! Kunnskap som lever bare i hodene til ansatte, forsvinner når de slutter.' },
          { id: 'c', label: 'Ingen problem — salgstall er det eneste som teller', isCorrect: false, feedback: 'Salgstall sier IKKE hvem som er i pipeline, hva som ble lovet, eller hva kunden forventer.' },
          { id: 'd', label: 'Lett å rekonstruere fra epost-historikk', isCorrect: false, feedback: 'E-post gir fragmenter, men ikke det strukturerte bildet et CRM gir. Dessuten: e-post er ikke tilgjengelig for andre.' },
        ],
        espenTip: 'CRM-logikk: Data tilhører BEDRIFTEN, ikke selgeren. Det er grunnen til at registrering er plikt, ikke valg. Bedriften eier relasjonen.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🌊',
    title: 'Lead og salgstrakt — fra interesse til kjøp',
    quote: '"Et lead er en invitasjon, ikke et salg. Salgstrakten er veien fra invitasjon til kontrakt."',
    content: 'I CRM-systemer er salgsprosessen visualisert som en trakt: mange potensielle kunder (leads) øverst, færre og færre når de beveger seg mot kjøpsbeslutningen, og noen som faktisk konverterer til kunder. Salgstrakten hjelper bedriften å prioritere og predikere inntekter.',
    subpoints: [
      { label: 'Lead', text: 'En person eller virksomhet som har vist interesse — lastet ned en ressurs, meldt seg på nyhetsbrev, fylt ut skjema' },
      { label: 'Prospekt', text: 'Et lead som er kvalifisert: har budsjett, beslutningsmyndighet og reelt behov' },
      { label: 'Mulighet (Deal)', text: 'Aktivt salgsforsøk pågår. Pris er diskutert, tilbud er sendt, forhandling starter' },
      { label: 'Konverteringsrate', text: '100 leads → 20 prospekter → 5 muligheter → 2 salg. Disse tallene driver strategiske beslutninger' },
    ],
    practical: 'Analyser: Vet du hva konverteringsraten er i virksomheten du kjenner? Hva forteller en lav konverteringsrate fra lead til prospekt deg?',
    exercises: [
      {
        id: 'dk3-1',
        icon: '🌊',
        title: 'Salgstrakten',
        question: 'En bedrift ser at de har 500 leads men bare 2 konverterer til kunder. Hva indikerer dette?',
        choices: [
          { id: 'a', label: 'At bedriften trenger mer markedsføring for å generere flere leads', isCorrect: false, feedback: 'Problemet er ikke antall leads — det er konverteringsraten. Flere leads vil gi samme lave yield.' },
          { id: 'b', label: 'At noe er galt i kvalifiseringsprosessen eller tilbudet — leads er for dårlig kvalifiserte', isCorrect: true, feedback: 'Riktig! 0,4 % konverteringsrate er ekstremt lavt. Enten er leads dårlig kvalifisert eller tilbudet treffer ikke.' },
          { id: 'c', label: 'At prisen er for høy', isCorrect: false, feedback: 'Pris er én mulig faktor, men konverteringsrate-analyse krever mer data før vi konkluderer.' },
          { id: 'd', label: 'At CRM-systemet fungerer dårlig', isCorrect: false, feedback: 'CRM-systemet er et verktøy — det dårlige resultatet skyldes forretningsprosessen, ikke verktøyet.' },
        ],
        espenTip: 'Salgstrakt = diagnose-verktøy. Lav konvertering tidlig i trakten = for dårlig leadskvalitet. Lav konvertering sent i trakten = problemer med tilbud, pris eller troverdighet.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🎫',
    title: 'Ticketing-systemet — kundeservice som saksbehandling',
    quote: '"En ticket er en kontrakt mellom kunden og bedriften: Vi har hørt deg, og vi løser det."',
    content: 'I kundeservice brukes ticketing-systemer for å håndtere henvendelser systematisk. En kundeepost, chat eller telefon oppretter automatisk en "ticket" — en sak med unikt saksnummer som spores fra opprettelse til løsning. Populære systemer er Zendesk, Freshdesk og HubSpot Service Hub.',
    subpoints: [
      { label: 'Ticket-livsløp', text: 'Åpen → Under behandling → Venter på kunde → Løst → Lukket. Alle statusendringer logges' },
      { label: 'Saksnummer', text: 'Kunden får saksnummer og kan følge status. Øker tillit og reduserer "hva skjer med saken min?"-henvendelser' },
      { label: 'SLA (Service Level Agreement)', text: 'Definerte svartider. "Alle saker svares innen 4 arbeidstimer." Systemet varsler om SLA brytes' },
      { label: 'Analyse', text: 'Gjennomsnittlig løsningstid, antall eskalerte saker, kundetilfredshet (CSAT) — alle måles automatisk' },
    ],
    practical: 'Tenk over: Hva skjer med kundehenvendelser i en bedrift uten ticketing? Hvem svarer? Hvem vet hva som er svart? Hva skjer om ansvarlig person er syk?',
    exercises: [
      {
        id: 'dk4-1',
        icon: '🎫',
        title: 'Ticketing-systemet',
        question: 'En kunde klager på en feil i ordren. De ringer på mandag og prater med Per, men han er syk tirsdag. Maria tar telefonen. Hva gjør ticketing-systemet for Maria?',
        choices: [
          { id: 'a', label: 'Maria må be kunden ringe tilbake når Per er frisk', isCorrect: false, feedback: 'Ticket-systemet finnes nettopp for å unngå dette. Maria ser historikken umiddelbart.' },
          { id: 'b', label: 'Maria ser hele historikken: hva kunden sa mandag, hva Per lovte, og hva status er', isCorrect: true, feedback: 'Riktig! Ticketing gjør at ansatte er utskiftbare uten at kunden merker det.' },
          { id: 'c', label: 'Kunden får automatisk refusjon fordi saken ikke er løst innen 24 timer', isCorrect: false, feedback: 'Automatisk refusjon er ikke standard ticketing-funksjon — men SLA-varsler kan eskalere saken.' },
          { id: 'd', label: 'Per varsles automatisk via SMS om at kunden har ringt igjen', isCorrect: false, feedback: 'Systemet kan varsle, men Maria kan håndtere saken uten Per basert på historikken.' },
        ],
        espenTip: 'Ticketing = institusjonell hukommelse. Kunden er ikke avhengig av at "den rette personen" er på jobb — alle kan hjelpe med full kontekst.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🤖',
    title: 'Automasjon og AI — fremtiden er allerede her',
    quote: '"Automasjon fjerner ikke behovet for menneskelig kontakt — det frigjør tid til den viktige kontakten."',
    content: 'Moderne CRM-systemer integrerer AI og automasjon for å predikere kundeadferd, automatisere repeterende oppgaver og betjene kunder 24/7 via chatbots. AI-drevne innsikter hjelper selgere å prioritere de mest lovende leadene og forutsi hvilke kunder som er i ferd med å churne (forlate).',
    subpoints: [
      { label: 'Lead-scoring', text: 'AI analyserer adferd (sidebesøk, e-post-åpning, tilbudsvisning) og gir leads en score. Høy score = prioriter nå' },
      { label: 'Chatbots', text: 'AI-baserte chatbots håndterer FAQ og enkle bestillinger 24/7. Eskalerer til menneske ved komplekse saker' },
      { label: 'Churn-prediksjon', text: 'AI identifiserer kunder som er i ferd med å si opp abonnement — slik at selgere kan handle proaktivt' },
      { label: 'E-post-automasjon', text: 'Trigger-baserte epost-sekvenser: "Kunde lastet ned whitepaper → send oppfølgingsepost dag 3"' },
    ],
    practical: 'Refleksjon: Hvilke oppgaver i kundeservice tror du AI vil overta i løpet av de neste 5 årene? Hvilke oppgaver tror du vil forbli menneskelige?',
    exercises: [
      {
        id: 'dk5-1',
        icon: '🤖',
        title: 'AI i CRM',
        question: 'En CRM viser at en langtidskunde har åpnet alle prosemail om en konkurrent og ikke bestilt på 3 måneder. Hva bør selgeren gjøre?',
        choices: [
          { id: 'a', label: 'Ingenting — kunden kontakter dem selv om de vil fortsette', isCorrect: false, feedback: 'Passivitet er churns beste venn. Dataene viser et klart faresignal.' },
          { id: 'b', label: 'Proaktivt ta kontakt med verditilbud eller undersøke om det er et problem å løse', isCorrect: true, feedback: 'Riktig! Churn-prediksjon gir selgere muligheten til å handle FØR kunden faktisk churner.' },
          { id: 'c', label: 'Sende masse-epost med rabatt til alle kunder', isCorrect: false, feedback: 'Mass-utsendelse er ikke målrettet og kan virke uprofesjonelt. Personlig kontakt er sterkere.' },
          { id: 'd', label: 'Slette kunden fra systemet om de ikke svarer', isCorrect: false, feedback: 'Sletting er feil — historikken er verdifull og GDPR krever begrunnelse for sletting.' },
        ],
        espenTip: 'AI-drevne CRM-innsikter er bare nyttige om noen handler på dem. Dataene forteller hva som skjer — mennesket bestemmer hva som gjøres.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🏢',
    title: 'SuperOffice og HubSpot — norske eksempler',
    quote: '"SuperOffice er ikke bare et system — det er måten norske bedrifter bygger kundelojalitet på."',
    content: 'SuperOffice er Europas ledende CRM-system for mellomstore B2B-virksomheter, med sterkt fotfeste i det norske markedet. HubSpot er globalt ledende for digitalt drevne bedrifter. Begge eksemplifiserer moderne CRM i norsk kontekst.',
    subpoints: [
      { label: 'SuperOffice', text: 'Norsk-utviklet, brukt av tusenvis av norske B2B-bedrifter. Integrerer salg, markedsføring og kundeservice' },
      { label: 'Hvordan det brukes', text: 'Salgsprosess: lead opprettes → selger følger pipeline → avtale signeres → faktura sendes, alt i ett system' },
      { label: 'HubSpot', text: 'Markedsleder globalt. Starter gratis, skalerer med bedriften. Sterk på inbound marketing og automatisering' },
      { label: 'Inbound-logikken', text: 'I HubSpot: potensiell kunde laster ned e-bok → lead opprettes automatisk → selger varsles → oppfølgings-epost kjøres automatisk' },
    ],
    practical: 'Undersøk: Søk "SuperOffice demo" eller "HubSpot CRM gratis" på nettet. Se en kort demo-video. Hva er de tre viktigste funksjonene du observerer?',
    exercises: [
      {
        id: 'dk6-1',
        icon: '🏢',
        title: 'CRM i norsk kontekst',
        question: 'En norsk rørleggervirksomhet skal velge CRM. De er 15 ansatte og jobber primært med B2B-kunder. Hva er viktigste valg-kriterier?',
        choices: [
          { id: 'a', label: 'At systemet er det globalt mest kjente merket', isCorrect: false, feedback: 'Merkevarekjennskap er ikke et funksjonelt kriterium. Tilpasning til bedriftens prosesser er viktigere.' },
          { id: 'b', label: 'Enkel integrasjon med regnskapssystem, mobiltilgang, og pris tilpasset SMB', isCorrect: true, feedback: 'Riktig! For en 15-manns B2B-bedrift er integrasjoner, brukervennlighet og pris de avgjørende faktorene.' },
          { id: 'c', label: 'At det har AI-chatbot for B2C-kundeservice', isCorrect: false, feedback: 'B2C chatbot er ikke relevant for en B2B-rørleggervirksomhet.' },
          { id: 'd', label: 'At alle i bransjen bruker det samme systemet', isCorrect: false, feedback: 'Bransjenorm er ikke et funksjonelt kriterium — tilpasning til egne prosesser er viktigst.' },
        ],
        espenTip: 'CRM-valg = match mellom bedriftens prosesser og systemets funksjonalitet. Det beste CRM er det som faktisk brukes konsekvent av alle ansatte.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🛒',
    title: 'Komplett.no og Zendesk — kundeservice i skala',
    quote: '"Saksnummeret er ikke bare et tall — det er kundens garanti for at de ikke er glemt."',
    content: 'Komplett.no er Norges største nettbutikk for elektronikk og bruker Zendesk som ticketing-system for kundeservice. Eksemplet illustrerer hvordan et profesjonelt ticketing-system håndterer tusenvis av henvendelser daglig og gir god kundeopplevelse i stor skala.',
    subpoints: [
      { label: 'Volumet', text: 'Komplett.no behandler titusener av ordrer ukentlig. Uten strukturert ticketing er kundeservice kaotisk' },
      { label: 'Automatisk opprettelse', text: 'Kunden sender epost til support@komplett.no → Zendesk oppretter automatisk ticket med saksnummer → kvittering til kunden' },
      { label: 'Kontekst for alle', text: 'Enhver Komplett-ansatt som åpner ticketen ser kjøpshistorikk, tidligere kontakt og hva som er lovet' },
      { label: 'SLA-oppfølging', text: 'Zendesk varsler saksbehandler automatisk om saken nærmer seg SLA-brudd (f.eks. 4-timers svarfrist)' },
    ],
    practical: 'Test: Send en henvendelse til en stor nettbutikks kundeservice. Observer: Får du saksnummer? Hvor lang tid tar svar? Er svaret personlig eller generisk?',
    exercises: [
      {
        id: 'dk7-1',
        icon: '🛒',
        title: 'Ticketing i stor skala',
        question: 'Komplett.no mottar 500 kundehenvendelser på en fredag ettermiddag. Hva er det viktigste Zendesk bidrar med i dette scenariet?',
        choices: [
          { id: 'a', label: 'Å automatisk svare alle med generisk epost', isCorrect: false, feedback: 'Generiske svar er et alternativ for enklere saker, men kjerneverdien er organisering og prioritering.' },
          { id: 'b', label: 'Systematisk organisering, prioritering og sporbarhet for alle 500 saker', isCorrect: true, feedback: 'Riktig! Uten system er 500 henvendelser kaos. Zendesk gjør det håndterbart og sporbart.' },
          { id: 'c', label: 'Å sende alle henvendelser videre til en ekstern call-senter', isCorrect: false, feedback: 'Zendesk er et inhouse-verktøy som hjelper Komplett.no håndtere henvendelser selv.' },
          { id: 'd', label: 'Å filtrere ut uberettigede krav automatisk', isCorrect: false, feedback: 'Ticketing-systemer organiserer saker, men vurdering av berettigede/uberettigede krav er menneskelig jobb.' },
        ],
        espenTip: 'Ticketing-systemer er skalerbar kundeservice. Fra 10 til 10 000 henvendelser — prosessen er den samme. Det er derfor de er standard i alle store servicevirksomheter.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🚫',
    title: 'Misforståelse — CRM er ikke en adressebok',
    quote: '"En adressebok forteller hvem kunden er. Et CRM forteller hva som skal skje neste gang du møter dem."',
    content: 'Den vanligste misforståelsen om CRM er at det er et avansert adresseregister. Dette fører til at systemet bare brukes til å lagre navn og telefonnumre, og at 90 % av verdien forblir ubrukt. CRM er i virkeligheten bedriftens sentralnervesystem for relasjoner, analyse og prognose.',
    subpoints: [
      { label: 'Myten', text: '"CRM er bare en glorifisert digital adressebok." Feil — den ignorerer analyse, prognose og automasjon' },
      { label: 'Realiteten', text: 'CRM predikerer inntekt, identifiserer churn-risiko, automatiserer kommunikasjon, og dokumenterer bedriftens relasjoner' },
      { label: 'Konsekvensen av myten', text: 'Systemet brukes halvhjertet, data er ufullstendig, og verdien realiseres aldri' },
      { label: 'Suksessfaktoren', text: 'CRM-suksess = konsekvent registrering av ALLE interaksjoner. Ufullstendig data = ubrukelig analyse' },
    ],
    practical: 'Refleksjon: Hva ville en selger som bruker CRM kun som adressebok gå glipp av i sin daglige arbeidshverdag? List opp tre konkrete ting.',
    exercises: [
      {
        id: 'dk8-1',
        icon: '🚫',
        title: 'CRM-misforståelsen',
        question: 'En salgsleder ser at teamet bare logger kundekontakter i CRM, men ikke noterer hva som ble diskutert. Hva er konsekvensen?',
        choices: [
          { id: 'a', label: 'Ingen — selgerens hukommelse er tilstrekkelig', isCorrect: false, feedback: 'Menneskelig hukommelse svikter, er udelbar, og forsvinner når selgeren slutter.' },
          { id: 'b', label: 'CRM mister sin prediktive og analytiske verdi — det blir bare en kontaktliste', isCorrect: true, feedback: 'Riktig! CRM-verdi = datakvalitet. Ufullstendige data = bare en fancy adressebok.' },
          { id: 'c', label: 'Teknologileverandøren vil hjelpe dem å fylle inn data automatisk', isCorrect: false, feedback: 'Teknologi kan støtte registrering, men selgerens innsikt fra kundemøtet kan ikke automatiseres.' },
          { id: 'd', label: 'Problemet løses ved å kjøpe et dyrere CRM-system', isCorrect: false, feedback: 'Dyrere system løser ikke dårlige brukerrutiner. CRM-kultur er viktigere enn CRM-teknologi.' },
        ],
        espenTip: 'Garbage in, garbage out. Kvaliteten på CRM-analyser avhenger 100 % av kvaliteten på registreringen. Det er grunnen til at CRM-registrering er en jobbplikt, ikke et valg.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'GDPR og CRM — lagring med ansvar',
    quote: '"CRM-data er ikke bedriftens eiendom — det er data individet har betrodd bedriften."',
    content: 'CRM-systemer lagrer store mengder personopplysninger. Personopplysningsloven (GDPR) setter klare krav til hvordan disse dataene behandles. For CRM-brukere betyr dette at registrering, lagring og sletting av data må følge GDPR-prinsipper.',
    subpoints: [
      { label: 'Behandlingsgrunnlag', text: 'Data kan kun registreres om det finnes et lovlig grunnlag: samtykke, kontraktsnødvendighet, eller berettiget interesse' },
      { label: 'Lagringstid', text: 'Data skal slettes når formålet er oppfylt. Et lead som aldri ble kunde? Slett etter rimelig tid' },
      { label: 'Tilgangskontroll', text: 'Kun ansatte som trenger data for jobben sin, skal ha tilgang. Ikke alle trenger å se all kundeinformasjon' },
      { label: 'Dataportabilitet', text: 'Kunder kan be om kopi av alle data om dem. CRM må kunne eksportere dette enkelt' },
    ],
    practical: 'Sjekk: Er CRM-systemet på din arbeidsplass GDPR-konfigurert? Hvem har tilgang til kundedata? Er det noen data som bør slettes?',
    exercises: [
      {
        id: 'dk9-1',
        icon: '⚖️',
        title: 'GDPR og CRM',
        question: 'En CRM-database inneholder kontaktinformasjon om potensielle kunder fra en messe for 5 år siden. Ingen av dem ble kunder. Hva bør gjøres?',
        choices: [
          { id: 'a', label: 'Beholdes — de kan bli kunder i fremtiden', isCorrect: false, feedback: '"Kan bli kunder" er ikke et lovlig behandlingsgrunnlag etter GDPR. Formålsbegrensning gjelder.' },
          { id: 'b', label: 'Slettes — formålet med lagringen (potensielt salg) er ikke lenger aktuelt', isCorrect: true, feedback: 'Riktig! GDPR-prinsippet om lagringstid: slett når formålet er oppfylt eller bortfalt.' },
          { id: 'c', label: 'Overføres til en passiv database for å spare plass', isCorrect: false, feedback: 'Å flytte data til et annet system løser ikke GDPR-problemet — data er fortsatt lagret uten formål.' },
          { id: 'd', label: 'Sendes masse-epost for å sjekke om noen er interessert', isCorrect: false, feedback: 'Masse-epost uten samtykke er brudd på Markedsføringsloven og GDPR.' },
        ],
        espenTip: 'GDPR-lagringsregel for CRM: Aktiv kunde = beholdes. Inaktiv lead etter rimelig tid = slett. "Rimelig tid" er bransjeavhengig, men 5 år uten interaksjon er åpenbart for lenge.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌟',
    title: 'Oppsummering — CRM som konkurransefortrinn',
    quote: '"Den bedriften som kjenner kundene sine best, vinner."',
    content: 'CRM-systemer er ikke teknologi for sin egen skyld — de er et strategisk verktøy for å bygge og bevare kunderelasjoner systematisk. I et marked der alle tilbyr lignende produkter, er det kvaliteten på kundeopplevelsen som differensierer. CRM er infrastrukturen for den differensieringen.',
    subpoints: [
      { label: 'CRM', text: 'Bedriftens sentralnervesystem for kunderelasjoner — ikke en adressebok' },
      { label: 'Salgstrakt', text: 'Lead → Prospekt → Mulighet → Kunde. Konverteringsrate er nøkkel-KPI' },
      { label: 'Ticketing', text: 'Strukturert kundeservice med sporbarhet, SLA og helhetlig historikk' },
      { label: 'Automasjon og AI', text: 'Lead-scoring, churn-prediksjon, epost-automasjon — frigjør tid til verdifull menneskelig kontakt' },
      { label: 'GDPR', text: 'Behandlingsgrunnlag, lagringstid, tilgangskontroll. Data behandles med ansvar' },
    ],
    practical: 'Neste steg: Opprett en gratis HubSpot CRM-konto og utforsk systemet. Det tar 5 minutter og gir deg praktisk erfaring med profesjonelle CRM-systemer.',
    exercises: [
      {
        id: 'dk10-1',
        icon: '🌟',
        title: 'Oppsummering',
        question: 'Hva er den viktigste enkeltfaktoren for at et CRM-system skal gi verdi for en bedrift?',
        choices: [
          { id: 'a', label: 'At de kjøper det dyreste tilgjengelige systemet', isCorrect: false, feedback: 'Pris korrelerer ikke med verdi. Tilpasning til prosesser og konsekvent bruk er viktigere.' },
          { id: 'b', label: 'Konsekvent registrering av alle interaksjoner av alle ansatte', isCorrect: true, feedback: 'Riktig! CRM er bare så nyttig som dataene som er i det. Konsistens er nøkkelen.' },
          { id: 'c', label: 'Integrasjon med AI-chatbot', isCorrect: false, feedback: 'AI-funksjoner er verdifulle, men baseres på data-kvaliteten som ligger til grunn.' },
          { id: 'd', label: 'At det er skybasert og tilgjengelig på mobil', isCorrect: false, feedback: 'Tilgjengelighet er viktig, men ikke den avgjørende faktoren for verdirealisering.' },
        ],
        espenTip: 'CRM-loven: Verdien av et CRM = (Antall ansatte som bruker det) × (Kvaliteten på dataregistreringen). Begge faktorer må være høye. En ansatt som ikke registrerer, ødelegger for alle.',
      },
    ],
  },
]

export default function DigitaleSystemKundeoppfolgingModule() {
  return (
    <DrawerModule
      moduleCode="OK-VG2-11"
      moduleTitle="Digitale system og kundeoppfølging"
      moduleIcon="💻"
      storageKey="learning-vg2-digitale-system-kundeoppfolging"
      completeRoute="/learning/vg2/okonomi/digitale-system-kundeoppfolging/complete"
      phases={phases}
      intro="Bruk av digitale system — CRM, booking og kommunikasjonsverktøy — for å følge opp kunder og kollegaer."
      vissteduAt="Bedrifter som systematisk bruker CRM rapporterer i snitt 25–30 % høyere kundelojalitet enn de som ikke gjør det. Hjertet i CRM er ikke teknologien, men «Relationship» — å forvalte relasjonen over tid."
      espenSier="Data tilhører bedriften, ikke selgeren. Det er derfor registrering er plikt, ikke valg. Salgstrakten er et diagnoseverktøy — bruk den til å finne hvor kundene faller fra, ikke bare som en rapport på slutten av kvartalet."
      presentationLink={{ route: '/learning/presentations/digitale-system-kundeoppfolging', description: 'Digitale system for kundeoppfølging — en visuell presentasjon' }}
    />
  )
}
