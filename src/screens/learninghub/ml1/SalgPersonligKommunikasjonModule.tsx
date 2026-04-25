        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🤝',
            title: 'Salgsprosessen — fra forberedelse til avslutning',
            quote: 'Et godt salg starter lenge før du møter kunden, og slutter aldri.',
            content: 'Personlig salg følger en strukturert prosess i syv steg: planlegging, kontakt, behovsanalyse, presentasjon, innvendingsbehandling, avslutning og etterarbeid. Hvert steg har egne ferdigheter og krav. Forberedelse er ofte forskjellen mellom et amatørmøte og et profesjonelt salgsmøte. Etterarbeid er forskjellen mellom én transaksjon og en livslang kunderelasjon.',
            subpoints: [
                  { label: 'PLANLEGGING', text: 'Researche kunden, definere mål med møtet, forberede aktuelle eksempler og motforestillinger.' },
          { label: 'KONTAKT', text: 'Skape tillit raskt — første 30 sekundene avgjør tonen for resten av samtalen.' },
          { label: 'OPPFØLGING', text: 'Etterarbeid sikrer at kunden er fornøyd, dokumenterer avtalen og åpner for gjenkjøp.' },
            ],
            practical: 'Tenk på siste gang du selv kjøpte noe dyrt. Hvilke faser i salgsprosessen møtte du? Var noen utelatt? Hvordan påvirket det din opplevelse?',
            exercises: [
            {
      id: 'ml111-1-1',
      icon: '🤝',
      title: 'Salgsprosessens steg',
      question: 'Hva er den klassiske rekkefølgen i salgsprosessen?',
      choices: [
        { id: 'a', label: 'Avslutning, presentasjon, behovsanalyse, kontakt, planlegging', isCorrect: false, feedback: 'Dette er rekkefølgen omvendt — du kan ikke avslutte før du har forstått behovet.' },
{ id: 'b', label: 'Planlegging, kontakt, behovsanalyse, presentasjon, innvendingsbehandling, avslutning, etterarbeid', isCorrect: true, feedback: 'Riktig! Den klassiske syvtrinnsmodellen følger en logisk progresjon fra forberedelse til langsiktig oppfølging.' },
{ id: 'c', label: 'Kontakt, avslutning, etterarbeid, planlegging', isCorrect: false, feedback: 'Etterarbeid kommer etter avslutning, ikke før planlegging av neste salg.' },
{ id: 'd', label: 'Behovsanalyse, planlegging, kontakt, presentasjon', isCorrect: false, feedback: 'Planlegging må komme først — du kan ikke analysere behov uten først å forberede deg.' },
      ],
      espenTip: 'Planlegging og etterarbeid er de to fasene som oftest blir hoppet over — og som skiller proff salg fra amatørarbeid.',
    },
    {
      id: 'ml111-1-2',
      icon: '🤝',
      title: 'Forberedelse',
      question: 'En selger fra et IT-selskap skal møte daglig leder i en mellomstor butikk-kjede. Hva er den viktigste forberedelsen?',
      choices: [
        { id: 'a', label: 'Å pugge alle tekniske spesifikasjoner i produktet', isCorrect: false, feedback: 'Detaljkunnskap er nyttig, men sekundært. Først må du forstå kundens behov.' },
{ id: 'b', label: 'Å undersøke kundens bransje, utfordringer og hva de allerede bruker av IT-systemer', isCorrect: true, feedback: 'Riktig! Researche kunden viser respekt og lar deg stille relevante spørsmål — i stedet for generiske presentasjoner.' },
{ id: 'c', label: 'Å lære presentasjonen utenat slik at du kan kjøre den uten avbrudd', isCorrect: false, feedback: 'En memorert presentasjon er det motsatte av god salg — du må kunne improvisere basert på kundens reaksjoner.' },
{ id: 'd', label: 'Å kjøpe en dyr lunsj som påskjønnelse', isCorrect: false, feedback: 'Bestikkelse er ikke salg. Det er heller ikke profesjonelt og kan bryte etiske retningslinjer.' },
      ],
      espenTip: '5–10 minutters Google-research før møtet kan løfte hele samtalen. Sjekk siste års rapport, nyheter, og hvem du møter.',
    },
    {
      id: 'ml111-1-3',
      icon: '🤝',
      title: 'Etterarbeid',
      question: 'Hvorfor er etterarbeid så viktig i moderne salg?',
      choices: [
        { id: 'a', label: 'Det er obligatorisk etter norsk lov', isCorrect: false, feedback: 'Loven krever ikke etterarbeid utover ev. forbrukerrettigheter — det er en strategisk valg.' },
{ id: 'b', label: 'Det er 5–7 ganger billigere å beholde en kunde enn å skaffe en ny', isCorrect: true, feedback: 'Riktig! Etterarbeid bygger lojalitet og gjenkjøp. CAC (Customer Acquisition Cost) for nye kunder er typisk 5–7× høyere enn å pleie eksisterende.' },
{ id: 'c', label: 'Det øker selgers bonus', isCorrect: false, feedback: 'Bonus avhenger av nytt salg, ikke etterarbeid — selv om etterarbeid skaper grunnlag for fremtidig salg.' },
{ id: 'd', label: 'Etterarbeid er kun for B2B', isCorrect: false, feedback: 'B2C trenger like mye etterarbeid som B2B — kanskje mer, fordi privatpersoner deler erfaringer på sosiale medier.' },
      ],
      espenTip: 'Send en oppsummerings-e-post 24 timer etter møtet. Det viser profesjonalitet og dokumenterer hva som ble avtalt.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '👂',
            title: 'Behovsanalyse — kunsten å lytte',
            quote: 'Den som spør, styrer samtalen.',
            content: 'Behovsanalyse er hjertet i moderne salg. Selgers viktigste verktøy er ikke produktet, men spørsmålene. SPIN-modellen (Situation, Problem, Implication, Need-payoff) gir struktur. Åpne spørsmål («fortell meg om...») gir mye informasjon; lukkede spørsmål («er det X eller Y?») bekrefter detaljer. 70/30-regelen sier at kunden skal snakke 70 % av tiden — selger 30 %. Stillhet er en venn: la kunden tenke ferdig før du fyller pausen.',
            subpoints: [
                  { label: 'ÅPNE SPØRSMÅL', text: 'Begynner med hva, hvordan, hvorfor — gir lange, informasjonsrike svar.' },
          { label: 'SPIN-MODELLEN', text: 'Situation (kontekst), Problem (utfordring), Implication (konsekvens), Need-payoff (verdi av løsning).' },
          { label: 'AKTIV LYTTING', text: 'Gjentar med egne ord, stiller oppfølgingsspørsmål, dokumenterer underveis. Ikke planlegg neste setning mens kunden snakker.' },
            ],
            practical: 'Tenk på en samtale du har hatt der den andre virkelig lyttet til deg. Hva gjorde de annerledes? Hvordan kjentes det?',
            exercises: [
            {
      id: 'ml111-2-1',
      icon: '👂',
      title: '70/30-regelen',
      question: 'Hva betyr 70/30-regelen i salg?',
      choices: [
        { id: 'a', label: '70 % rabatt, 30 % full pris', isCorrect: false, feedback: 'Dette er prising, ikke samtaleteknikk.' },
{ id: 'b', label: '70 % av kundene kjøper, 30 % avslår', isCorrect: false, feedback: 'Dette er konverteringsstatistikk, ikke en samtaleregel.' },
{ id: 'c', label: 'Kunden snakker 70 % av tiden, selger 30 %', isCorrect: true, feedback: 'Riktig! Forskning viser at de mest suksessfulle B2B-selgerne følger denne fordelingen — de stiller spørsmål og lytter mer enn de presenterer.' },
{ id: 'd', label: '70 % planlegging, 30 % gjennomføring', isCorrect: false, feedback: 'Forberedelse er viktig, men dette er ikke det 70/30-regelen handler om.' },
      ],
      espenTip: 'Klokke deg selv neste gang du har en salgssamtale. De fleste oppdager at de snakker langt mer enn de tror.',
    },
    {
      id: 'ml111-2-2',
      icon: '👂',
      title: 'Åpne vs. lukkede spørsmål',
      question: 'Hvilket er et åpent spørsmål?',
      choices: [
        { id: 'a', label: 'Bruker du PC eller Mac?', isCorrect: false, feedback: 'Dette er lukket — kun to mulige svar.' },
{ id: 'b', label: 'Fortell meg om hvordan dere håndterer kundeklager i dag', isCorrect: true, feedback: 'Riktig! Et åpent spørsmål inviterer til lange, informasjonsrike svar og avdekker både fakta og holdninger.' },
{ id: 'c', label: 'Er du fornøyd med leverandøren?', isCorrect: false, feedback: 'Lukket — kun ja/nei-svar.' },
{ id: 'd', label: 'Når begynner kontrakten?', isCorrect: false, feedback: 'Lukket — krever et spesifikt svar.' },
      ],
      espenTip: 'Bytt ut «er», «kan», «vil» med «hva», «hvordan», «hvorfor» — så blir spørsmålene dine straks mer åpne.',
    },
    {
      id: 'ml111-2-3',
      icon: '👂',
      title: 'SPIN-modellen',
      question: 'Hva står \'I\' for i SPIN-modellen?',
      choices: [
        { id: 'a', label: 'Information — informasjon om produktet', isCorrect: false, feedback: 'Feil — SPIN handler om kundens situasjon, ikke produktopplysninger.' },
{ id: 'b', label: 'Implication — konsekvensen av å ikke løse problemet', isCorrect: true, feedback: 'Riktig! \'Implication\' utforsker hvilken smerte problemet skaper hvis det ikke løses — som motiverer kunden til å handle.' },
{ id: 'c', label: 'Investment — hvor mye kunden er villig til å investere', isCorrect: false, feedback: '\'I\' i SPIN handler om konsekvens, ikke budsjett (det kommer senere).' },
{ id: 'd', label: 'Interest — kundens interessenivå', isCorrect: false, feedback: 'Interesse er resultat av god behovsanalyse, ikke en av komponentene i SPIN.' },
      ],
      espenTip: 'Implication er det vanskeligste steget — der spør du kunden om kostnaden av å IKKE handle. Riktig stilt skaper det presserende behov.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🛡️',
            title: 'Innvendingsbehandling — \'nei\' som mulighet',
            quote: 'Hver innvending er en invitasjon til dypere samtale.',
            content: 'Innvendinger er ikke avslag — de er signaler om at kunden trenger mer informasjon. Vanlige innvendinger: «for dyrt», «vi har allerede en leverandør», «vi må tenke på det», «ikke nå». Hver av dem har en standard responsteknikk: lytt → bekreft → spør → svar → bekreft igjen. «For dyrt» betyr ofte «jeg ser ikke nok verdi». Da må du tilbake til behovsanalyse, ikke svare med rabatt. Aldri argumenter mot kunden — du kan vinne diskusjonen og tape salget.',
            subpoints: [
                  { label: 'LYTT FØRST', text: 'Avbryt aldri en innvending. La kunden snakke ferdig — ofte gir de svaret selv.' },
          { label: '\'FOR DYRT\' = USIKKER VERDI', text: 'Pris er sjelden den faktiske innvendingen. Det er at oppfattet verdi er lavere enn pris.' },
          { label: 'BEKREFT FØR DU SVARER', text: '«Jeg forstår at det føles høyt. La oss se på hva du faktisk får for pengene.»' },
            ],
            practical: 'Hva sier du selv når du ikke vil kjøpe noe? Er svaret ditt alltid det \'ekte\' problemet? Hva ligger ofte under overflaten?',
            exercises: [
            {
      id: 'ml111-3-1',
      icon: '🛡️',
      title: '\'For dyrt\'',
      question: 'En kunde sier «det er for dyrt». Hva er beste første respons?',
      choices: [
        { id: 'a', label: 'OK, jeg kan gi deg 15 % rabatt', isCorrect: false, feedback: 'Rabatt er sjelden løsningen — det signaliserer at du ikke trodde på prisen selv.' },
{ id: 'b', label: '«Jeg forstår. Kan du si litt mer om hva du sammenligner med?»', isCorrect: true, feedback: 'Riktig! Du må forstå referansen. Sammenligner kunden med konkurrent, eget budsjett, eller egen oppfattet verdi? Hver krever ulik respons.' },
{ id: 'c', label: 'Det er markedspris, alle tar det samme', isCorrect: false, feedback: 'Defensivt og bortforklarende — kan oppfattes som arrogant.' },
{ id: 'd', label: 'Greit, da finner vi noe billigere', isCorrect: false, feedback: 'Du gir opp salget umiddelbart — kunden får ikke verdivurdering du burde gi.' },
      ],
      espenTip: '«For dyrt» er sjelden om kroner. Det handler om at kunden ikke ser verdien tydelig nok. Tilbake til behovsanalyse, ikke til prislisten.',
    },
    {
      id: 'ml111-3-2',
      icon: '🛡️',
      title: 'Vi har allerede en leverandør',
      question: 'Hvordan håndtere denne klassiske innvendingen best?',
      choices: [
        { id: 'a', label: 'OK, da gir jeg meg', isCorrect: false, feedback: 'For raskt — du har ikke utforsket muligheten ennå.' },
{ id: 'b', label: '«Bra! Hvordan er du fornøyd med dem?» og lytte etter pain points', isCorrect: true, feedback: 'Riktig! En fornøyd kunde har likevel ofte småsmerter. Disse kan du adressere — og bli en alternativ leverandør på sikt.' },
{ id: 'c', label: 'Si at konkurrenten er dårlig', isCorrect: false, feedback: 'Aldri snakk dårlig om konkurrenter — det reflekterer dårlig på deg.' },
{ id: 'd', label: 'Tilby å overta hele kontrakten umiddelbart', isCorrect: false, feedback: 'Aggressivt og urealistisk — kontrakter har bindingstider og bytter krever tillit som du ikke har bygget ennå.' },
      ],
      espenTip: '«Vi har en leverandør» er ikke et nei — det er en startposisjon. Spør om opplevelsen, finn smertene, posisjoner deg som backup.',
    },
    {
      id: 'ml111-3-3',
      icon: '🛡️',
      title: 'Hvordan respondere på avslag',
      question: 'Kunden takker nei etter et godt møte. Hva gjør du?',
      choices: [
        { id: 'a', label: 'Press hardere — kanskje de bare trenger en siste dytt', isCorrect: false, feedback: 'Aldri press etter en klar nei — det ødelegger forholdet og fremtidige muligheter.' },
{ id: 'b', label: 'Takk høflig, spør om feedback, og hold kontakten over tid', isCorrect: true, feedback: 'Riktig! Et nei i dag er ikke et nei for alltid. Profesjonell håndtering åpner døren for senere salg når situasjonen endrer seg.' },
{ id: 'c', label: 'Aldri kontakt dem igjen', isCorrect: false, feedback: 'Du brenner broer. 80 % av salg kommer etter 5+ kontakter — gi ikke opp etter ett nei.' },
{ id: 'd', label: 'Send fakturaen likevel', isCorrect: false, feedback: 'Selvsagt ulovlig og ødeleggende for omdømmet.' },
      ],
      espenTip: 'De fleste salg krever 5–7 kontakter før avslutning. Et \'nei\' i dag kan bli \'ja\' om seks måneder hvis du holder kontakten profesjonelt.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🗣️',
            title: 'Ikke-verbal kommunikasjon',
            quote: 'Kroppen din snakker høyere enn munnen din.',
            content: 'Forskning viser at mer enn halvparten av kommunikasjonsbudskapet formidles ikke-verbalt. Kroppsspråk, blikkontakt, tonefall, ansiktsmimikk og avstand påvirker hvordan budskapet mottas. Et selvsikkert blikk og avslappet kropp signaliserer trygghet. Krysset armer signaliserer forsvar. Speiling (mirroring) av kundens kroppsspråk skaper ubevisst tillit. I digitale møter blir tonefallet og ansiktsuttrykk enda viktigere — kameraet skal være på.',
            subpoints: [
                  { label: 'BLIKKONTAKT', text: 'Hold kontakt 60–70 % av tiden — for lite virker upålitelig, for mye virker truende.' },
          { label: 'ÅPEN HOLDNING', text: 'Skuldre tilbake, armer ikke krysset, vendt mot kunden — signaliserer åpenhet og selvtillit.' },
          { label: 'SPEILING', text: 'Diskret etterligne kundens kroppsspråk og taletempo bygger ubevisst rapport — ikke karikere.' },
            ],
            practical: 'Sett deg foran et speil og hold en 1-minutt presentasjon. Hva ser du? Hvordan er kroppsspråket ditt under stress?',
            exercises: [
            {
      id: 'ml111-4-1',
      icon: '🗣️',
      title: 'Andelen ikke-verbal kommunikasjon',
      question: 'Hvor stor andel av kommunikasjon formidles vanligvis ikke-verbalt?',
      choices: [
        { id: 'a', label: '10 %', isCorrect: false, feedback: 'Altfor lavt — ord er bare en mindre del av budskapet.' },
{ id: 'b', label: '30 %', isCorrect: false, feedback: 'Underestimert — kroppsspråk og tonefall står for mer enn ordene.' },
{ id: 'c', label: 'Mer enn 50 %', isCorrect: true, feedback: 'Riktig! Kroppsspråk, ansiktsuttrykk og tonefall står for hoveddelen av hvordan budskapet oppfattes — særlig under stress eller konflikt.' },
{ id: 'd', label: 'Ord er det viktigste — over 80 %', isCorrect: false, feedback: 'Feil — selv om ordene betyr noe, dominerer ikke-verbale signaler i konfliktsituasjoner og emosjonelle samtaler.' },
      ],
      espenTip: 'I digitale møter går mye ikke-verbalt tapt. Slå på kamera og vær bevisst stemmebruk for å kompensere.',
    },
    {
      id: 'ml111-4-2',
      icon: '🗣️',
      title: 'Speiling',
      question: 'Hva er \'mirroring\' i salg?',
      choices: [
        { id: 'a', label: 'Å gjenta kundens setninger ord for ord', isCorrect: false, feedback: 'Det er parafrasering, ikke speiling.' },
{ id: 'b', label: 'Diskret å etterligne kundens kroppsspråk og taletempo for å bygge tillit', isCorrect: true, feedback: 'Riktig! Subtil speiling skaper ubevisst rapport. Hvis kunden snakker rolig, ikke snakk fort. Hvis hun lener seg fram, lene deg fram.' },
{ id: 'c', label: 'Å bruke speil i butikken for å se flere produkter', isCorrect: false, feedback: 'Bokstavelig tolkning — feil kontekst.' },
{ id: 'd', label: 'Å la kunden lese sin egen kontrakt', isCorrect: false, feedback: 'Det er kontraktsbehandling, ikke ikke-verbal kommunikasjon.' },
      ],
      espenTip: 'Speiling skal være subtil — overdrivelse oppfattes som nedlatende. Tenk diskret samkjøring av tempo og energi.',
    },
    {
      id: 'ml111-4-3',
      icon: '🗣️',
      title: 'Krysset armer',
      question: 'Hva signaliserer typisk krysset armer hos en kunde?',
      choices: [
        { id: 'a', label: 'Stor interesse for produktet', isCorrect: false, feedback: 'Vanligvis det motsatte — krysset armer er ofte forsvarsposisjon.' },
{ id: 'b', label: 'Forsvar, skepsis eller ubehag', isCorrect: true, feedback: 'Riktig! Krysset armer er klassisk lukket-kroppsspråk. Det betyr ikke alltid avvisning, men det er et signal om at du må jobbe for å åpne kunden opp.' },
{ id: 'c', label: 'At kunden har det kaldt', isCorrect: false, feedback: 'Mulig — men i forretningskontekst tolkes det vanligvis som forsvar.' },
{ id: 'd', label: 'At kunden er klar til å signere', isCorrect: false, feedback: 'Tvert imot — du har ofte mer arbeid å gjøre med å skape trygghet.' },
      ],
      espenTip: 'Når du ser krysset armer: bytt tema, still et åpent spørsmål, eller bytt fysisk posisjon. Bryt mønsteret før du fortsetter.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📈',
            title: 'Mersalg og oppsalg',
            quote: 'Den enkleste vei til økt omsetning er gjennom kunder du allerede har.',
            content: 'Mersalg (cross-sell) tilbyr et komplementært produkt («en kake til kaffen»). Oppsalg (upsell) tilbyr en bedre versjon («espresso i stedet for filterkaffe»). Begge øker ordreverdien og kundeopplevelsen — hvis det er reell verdi for kunden. Klassisk feil: aggressivt mersalg av irrelevante produkter. Det skaper irritasjon og tap av tillit. Den som mestrer mersalg lytter aktivt og foreslår basert på det kunden faktisk trenger.',
            subpoints: [
                  { label: 'MERSALG', text: 'Tilbud av komplementære produkter — pølse + lompe, kontrakt + service, sko + smøremiddel.' },
          { label: 'OPPSALG', text: 'Tilbud av en oppgradert variant — premium-versjon, lengre garanti, større pakke.' },
          { label: 'RELEVANS', text: 'Mersalg som ikke gir verdi for kunden ødelegger tillit. Foreslå kun det du selv ville kjøpt i samme situasjon.' },
            ],
            practical: 'Husk siste gang du kjøpte noe og fikk et tilleggstilbud. Ble du glad eller irritert? Hva avgjorde reaksjonen?',
            exercises: [
            {
      id: 'ml111-5-1',
      icon: '📈',
      title: 'Mersalg vs. oppsalg',
      question: 'Hva er forskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Feil — de er beslektede, men distinkte teknikker.' },
{ id: 'b', label: 'Mersalg = komplementært tilleggsprodukt; oppsalg = oppgradert variant av samme', isCorrect: true, feedback: 'Riktig! Mersalg utvider tilbudet (kake + kaffe), oppsalg forbedrer det (espresso > kaffe). Begge øker ordreverdi.' },
{ id: 'c', label: 'Mersalg gjelder B2B, oppsalg gjelder B2C', isCorrect: false, feedback: 'Begge fungerer i begge segmenter.' },
{ id: 'd', label: 'Mersalg er ulovlig, oppsalg er lovlig', isCorrect: false, feedback: 'Begge er fullt lovlig så lenge tilbudet er reelt og ikke villedende.' },
      ],
      espenTip: 'McDonald\'s er mestere i begge: «Vil du ha pommes frites til?» (mersalg) og «Vil du oppgradere til large?» (oppsalg).',
    },
    {
      id: 'ml111-5-2',
      icon: '📈',
      title: 'Når mersalg går galt',
      question: 'Hva er den vanligste feilen i mersalg?',
      choices: [
        { id: 'a', label: 'Å tilby for lite', isCorrect: false, feedback: 'Underdosering er mindre skadelig enn overdosering.' },
{ id: 'b', label: 'Å foreslå irrelevante produkter aggressivt', isCorrect: true, feedback: 'Riktig! Aggressivt mersalg av produkter kunden ikke trenger ødelegger tilliten — og kan skade hele relasjonen.' },
{ id: 'c', label: 'Å gi for mye rabatt', isCorrect: false, feedback: 'Rabatt er ikke mersalg.' },
{ id: 'd', label: 'Å bruke for mye tid på det', isCorrect: false, feedback: 'Tid er sjelden problemet — relevans er.' },
      ],
      espenTip: 'Test deg selv: «Ville jeg selv kjøpt dette i kundens situasjon?» Hvis nei, ikke foreslå det.',
    },
    {
      id: 'ml111-5-3',
      icon: '📈',
      title: 'Effekt av godt mersalg',
      question: 'En forsikringsmegler tilbyr en ny kunde innboforsikring sammen med bilforsikring. Kunden takker ja. Hva har skjedd?',
      choices: [
        { id: 'a', label: 'Kunden er presset til et kjøp hun ikke trenger', isCorrect: false, feedback: 'Hvis innboforsikring var en åpenbar mangel, var dette nyttig — ikke press.' },
{ id: 'b', label: 'Megleren har gjort et godt mersalg som gir verdi til kunden og økt ordreverdi', isCorrect: true, feedback: 'Riktig! Hvis kunden manglet innboforsikring og megleren oppdaget det, er dette mersalg som tjener begge.' },
{ id: 'c', label: 'Megleren bryter loven', isCorrect: false, feedback: 'Mersalg er fullt lovlig så lenge produktet er relevant og kunden samtykker.' },
{ id: 'd', label: 'Kunden vil angre umiddelbart', isCorrect: false, feedback: 'Hvis behovet var reelt og kunden valgte selv, vil hun ofte være takknemlig.' },
      ],
      espenTip: 'Profesjonell mersalg starter med behovsanalyse. Megleren oppdager hull, foreslår løsning, kunden velger selv.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🎯',
            title: 'Selgerens egenskaper',
            quote: 'Empati og integritet slår karisma og volum hver gang.',
            content: 'Forskning viser at de mest suksessfulle selgerne deler fire kjerneegenskaper: empati (forstår kundens situasjon), ego-drive (vil vinne salget), produktkunnskap (kan svare presist på spørsmål), og integritet (lover kun det som holdes). Mangler én av disse, faller hele kjedet. Empati uten ego-drive gir for myk salg. Ego uten empati gir aggressivt salg. Kunnskap uten integritet gir kortsiktig salg. Integritet uten kunnskap gir tap av troverdighet. Alle fire må være på plass.',
            subpoints: [
                  { label: 'EMPATI', text: 'Evnen til å sette seg i kundens sko, forstå hennes utfordringer og prioriteringer.' },
          { label: 'EGO-DRIVE', text: 'Indre motivasjon for å lykkes med salget — uten å bli aggressiv.' },
          { label: 'INTEGRITET', text: 'Lover kun det du kan holde. Sier nei hvis produktet ikke passer.' },
            ],
            practical: 'Hvilke av de fire egenskapene tror du er mest mangelvare i salgsmiljøet du kjenner? Hvorfor?',
            exercises: [
            {
      id: 'ml111-6-1',
      icon: '🎯',
      title: 'Hva slår alt annet',
      question: 'Hva er den viktigste enkeltegenskapen ifølge salgsforskning?',
      choices: [
        { id: 'a', label: 'Karisma og selvsikkerhet', isCorrect: false, feedback: 'Hjelper, men er sekundært til empati og ferdigheter.' },
{ id: 'b', label: 'Empati — evnen til å forstå kundens situasjon og behov', isCorrect: true, feedback: 'Riktig! Empati er konsistent rangert som den viktigste enkeltegenskapen. Uten empati blir salg en transaksjon i stedet for en relasjon.' },
{ id: 'c', label: 'Aggressivitet og pågåenhet', isCorrect: false, feedback: 'Aggressivt salg gir kortvarig effekt, men ødelegger tillit på sikt.' },
{ id: 'd', label: 'Tekniske ferdigheter med CRM-systemer', isCorrect: false, feedback: 'Verktøy hjelper, men avgjør ikke salgssuksess.' },
      ],
      espenTip: 'Empati kan trenes opp. Begynn med å lytte 30 % mer enn du føler du burde — og se hva som skjer med samtalene.',
    },
    {
      id: 'ml111-6-2',
      icon: '🎯',
      title: 'Integritet i praksis',
      question: 'En selger oppdager at produktet hennes ikke passer kundens behov. Hva gjør hun?',
      choices: [
        { id: 'a', label: 'Selger likevel — det er hennes jobb', isCorrect: false, feedback: 'Kortsiktig salg, men langsiktig tap av tillit. Kunden kommer aldri tilbake — og kan dele negativ erfaring.' },
{ id: 'b', label: 'Sier ærlig at produktet ikke passer, foreslår alternativer (gjerne hos konkurrent)', isCorrect: true, feedback: 'Riktig! Integritet bygger tillit som gir gjenkjøp og henvisninger. En \'tapt\' salg som er ærlig kan gi 5 nye henvisninger.' },
{ id: 'c', label: 'Lyver om at produktet passer', isCorrect: false, feedback: 'Klart uetisk og ofte ulovlig — kan ende med klage og rettsak.' },
{ id: 'd', label: 'Sier ingenting og lar kunden velge selv', isCorrect: false, feedback: 'Passivt og uærlig. Kunden tror hun har fått råd.' },
      ],
      espenTip: 'Den ærligste selgeren får ofte mest henvisninger. Folk anbefaler alltid den de stoler på, ikke den som overtalte dem.',
    },
    {
      id: 'ml111-6-3',
      icon: '🎯',
      title: 'Ego-drive vs. empati',
      question: 'Hva skjer hvis selger har sterk ego-drive uten empati?',
      choices: [
        { id: 'a', label: 'Hun blir best i bransjen', isCorrect: false, feedback: 'Tvert imot — uten empati taper hun langsiktige relasjoner.' },
{ id: 'b', label: 'Hun selger aggressivt og brenner kunderelasjoner', isCorrect: true, feedback: 'Riktig! Ego uten empati gir kortsiktige seire og langsiktig tap. Kunder slutter å ta telefonen.' },
{ id: 'c', label: 'Hun blir den mest etiske', isCorrect: false, feedback: 'Etikk krever empati — uten det er etikk vanskelig å praktisere.' },
{ id: 'd', label: 'Det spiller ingen rolle', isCorrect: false, feedback: 'Det spiller stor rolle — balansen mellom drive og empati er kritisk.' },
      ],
      espenTip: 'Mange tror salg handler om aggressivitet. De beste selgerne er stille, lyttende, empatiske — men har sterk indre motivasjon for å hjelpe kunden å lykkes.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📞',
            title: 'Etterarbeid og oppfølging',
            quote: 'Salget slutter ikke ved kassen — det starter der.',
            content: 'God etteroppfølging er ofte forskjellen på én transaksjon og en livslang kunde. Standard rutiner: takkemelding samme dag, oppfølgingssamtale etter 2 uker, sjekk-inn etter 3–6 måneder. CRM-systemer (Salesforce, HubSpot, Lime) automatiserer mye, men personlig kontakt slår alltid generiske e-poster. Lojale kunder gir gjenkjøp, henvisninger og toleranse for feil. Tap av kunde fra dårlig etterarbeid koster typisk 5–7× mer enn det å beholde dem.',
            subpoints: [
                  { label: 'TAKKEMELDING', text: 'Innen 24 timer etter signering. Bekrefter avtalen og åpner for spørsmål.' },
          { label: 'OPPFØLGING', text: 'Strukturert sjekk-inn etter 2 uker, 3 måneder, 12 måneder. CRM-system gir påminnelser.' },
          { label: 'CAC vs. CLV', text: 'Customer Acquisition Cost (CAC) er typisk 5–7× høyere enn å beholde en kunde. Etterarbeid er en av de mest lønnsomme aktivitetene en selger gjør.' },
            ],
            practical: 'Tenk på en gang du opplevde fantastisk etterarbeid (f.eks. fra en mekaniker eller forsikringsselger). Hvorfor husker du det?',
            exercises: [
            {
      id: 'ml111-7-1',
      icon: '📞',
      title: 'Forholdet CAC vs. CLV',
      question: 'Hvor mye dyrere er det typisk å skaffe en ny kunde enn å beholde en eksisterende?',
      choices: [
        { id: 'a', label: 'Cirka likt', isCorrect: false, feedback: 'Forskning viser tydelig at det er mye dyrere å skaffe nye.' },
{ id: 'b', label: '5–7 ganger dyrere', isCorrect: true, feedback: 'Riktig! Bransjegjennomsnittet er 5–7×. I noen bransjer er det opp til 25× dyrere å skaffe en ny kunde enn å beholde en eksisterende.' },
{ id: 'c', label: '1,5 ganger dyrere', isCorrect: false, feedback: 'Underestimert — det er ikke bare prospekteringskostnad, men også tid for opplæring og oppbygging av tillit.' },
{ id: 'd', label: 'Det er billigere å skaffe nye', isCorrect: false, feedback: 'Helt feil — eksisterende kunder gir høyere konverteringsrate, lavere salgsmotstand og mer mersalg.' },
      ],
      espenTip: 'Det er derfor abonnement-modeller er så populære: de bygger inn etterarbeid og lojalitet i selve forretningsmodellen.',
    },
    {
      id: 'ml111-7-2',
      icon: '📞',
      title: 'CRM',
      question: 'Hva er hovednytten av et CRM-system for selgere?',
      choices: [
        { id: 'a', label: 'Det erstatter behovet for personlig kontakt', isCorrect: false, feedback: 'Aldri — CRM er verktøy, ikke erstatning for relasjoner.' },
{ id: 'b', label: 'Det husker for deg: hvem du har kontaktet, når, og hva ble avtalt', isCorrect: true, feedback: 'Riktig! CRM gir struktur og påminnelser, slik at ingen kunder faller mellom to stoler. Personlig kontakt på toppen av god struktur er gull.' },
{ id: 'c', label: 'Det selger automatisk uten menneskelig innsats', isCorrect: false, feedback: 'AI-drevet salg eksisterer i begrenset form, men personlig salg krever fortsatt mennesker.' },
{ id: 'd', label: 'Det er kun for store bedrifter', isCorrect: false, feedback: 'Selv små bedrifter har stor nytte — fra Pipedrive og HubSpot til enkle Excel-ark.' },
      ],
      espenTip: 'Selv et godt vedlikeholdt Excel-ark kan fungere som CRM. Det viktigste er disiplin, ikke verktøy.',
    },
    {
      id: 'ml111-7-3',
      icon: '📞',
      title: 'Etterarbeid timing',
      question: 'Når bør første etteroppfølging skje etter et stort salg?',
      choices: [
        { id: 'a', label: 'Innen 1 time', isCorrect: false, feedback: 'Overdrevet — kan virke desperat.' },
{ id: 'b', label: 'Innen 24 timer', isCorrect: true, feedback: 'Riktig! Takkemelding og bekreftelse innen 24 timer er standard for profesjonelt salg. Det signaliserer ansvar og bygger tillit fra dag én.' },
{ id: 'c', label: 'Etter en uke', isCorrect: false, feedback: 'For sent — kunden begynner å lure på om hun gjorde riktig kjøp.' },
{ id: 'd', label: 'Aldri — la kunden ta kontakt selv', isCorrect: false, feedback: 'Da forsvinner relasjonen, og du mister mersalg- og henvisningsmuligheter.' },
      ],
      espenTip: 'Sett opp en automatisk påminnelse i kalenderen samme dag som du signerer. Aldri stol på hukommelsen alene.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '💞',
            title: 'Relasjonsmarkedsføring',
            quote: 'Lojale kunder er en gående reklame.',
            content: 'Relasjonsmarkedsføring fokuserer på langsiktige bånd gjennom tillit og gjensidighet. Det er motsetningen til transaksjonsmarkedsføring (én og én transaksjon). Spesielt verdifullt i B2B (lange kontrakter), eiendom, finans, helse og luksussegmenter. Lojale kunder kjøper mer per transaksjon, oftere, og henviser flere — og er mer tilgivende for feil. Net Promoter Score (NPS) måler lojalitet via ett spørsmål: «Hvor sannsynlig er det at du anbefaler oss til en venn (0–10)?» NPS over 50 er fremragende.',
            subpoints: [
                  { label: 'TRANSAKSJON vs. RELASJON', text: 'Transaksjon: enkeltsalg uten oppfølging. Relasjon: livssyklusperspektiv på kunden.' },
          { label: 'CLV — CUSTOMER LIFETIME VALUE', text: 'Total verdi en kunde bringer over hele forholdet — ofte 10–100× første ordreverdi.' },
          { label: 'NPS', text: 'Net Promoter Score måler lojalitet. Promotorer (9–10) henviser; Detractors (0–6) skader merkevaren aktivt.' },
            ],
            practical: 'Tenk på en bedrift du har vært kunde hos i mange år. Hva har de gjort som har holdt deg lojal? Hva ville fått deg til å bytte?',
            exercises: [
            {
      id: 'ml111-8-1',
      icon: '💞',
      title: 'Customer Lifetime Value',
      question: 'Hva er CLV?',
      choices: [
        { id: 'a', label: 'Customer Loss Vector — hvor mange kunder som forlater bedriften', isCorrect: false, feedback: 'Galt akronym — riktig er Lifetime Value.' },
{ id: 'b', label: 'Customer Lifetime Value — total verdi en kunde bringer over hele forholdet', isCorrect: true, feedback: 'Riktig! CLV er en av de viktigste KPI-ene i moderne markedsføring. Det styrer hvor mye du har råd til å investere i å skaffe nye kunder.' },
{ id: 'c', label: 'Customer Loyalty Voucher — bonusordning', isCorrect: false, feedback: 'Ikke et standard markedsføringsbegrep.' },
{ id: 'd', label: 'Cost-Linked Volume — kostnad per solgte enhet', isCorrect: false, feedback: 'Helt annet konsept (kostnadsanalyse).' },
      ],
      espenTip: 'En Telia-mobilkunde har CLV på rundt 30 000 kr over 5 år. Det forklarer hvorfor de bruker tusener på å skaffe hver ny kunde.',
    },
    {
      id: 'ml111-8-2',
      icon: '💞',
      title: 'NPS',
      question: 'Hva måler NPS (Net Promoter Score)?',
      choices: [
        { id: 'a', label: 'Antall ansatte som anbefaler bedriften', isCorrect: false, feedback: 'Det er Employee NPS, en annen variant.' },
{ id: 'b', label: 'Hvor sannsynlig kunder anbefaler bedriften til andre, på en skala 0–10', isCorrect: true, feedback: 'Riktig! NPS er det mest brukte målet på kundelojalitet globalt. Måles via ett enkelt spørsmål og brukes som strategisk KPI i de fleste store bedrifter.' },
{ id: 'c', label: 'Antall produkter solgt per måned', isCorrect: false, feedback: 'Det er enklere salgsstatistikk.' },
{ id: 'd', label: 'Markedsandel', isCorrect: false, feedback: 'Det er en helt annen metrikk.' },
      ],
      espenTip: 'NPS = % Promotorer (9–10) minus % Detractors (0–6). Score over 50 er fremragende, over 70 er verdensklasse.',
    },
    {
      id: 'ml111-8-3',
      icon: '💞',
      title: 'Verdien av lojale kunder',
      question: 'Hva er den største økonomiske fordelen med lojale kunder?',
      choices: [
        { id: 'a', label: 'De betaler høyere pris', isCorrect: false, feedback: 'Noen ganger, men ikke hovedfordelen.' },
{ id: 'b', label: 'De kjøper mer, oftere, henviser nye, og koster lite å betjene', isCorrect: true, feedback: 'Riktig! Lojale kunder gir flere inntektsstrømmer (gjenkjøp, mersalg, henvisninger) og lavere kostnader (mindre support, raskere salgsprosess).' },
{ id: 'c', label: 'De krever mer support', isCorrect: false, feedback: 'Tvert imot — lojale kunder forstår produktet bedre og bruker mindre support.' },
{ id: 'd', label: 'De kjøper alltid det dyreste', isCorrect: false, feedback: 'Lojalitet handler om gjenkjøp, ikke premium-valg.' },
      ],
      espenTip: 'En lojal kunde med 10 års forhold genererer typisk 15–20× mer overskudd enn en engangskunde — selv om første ordreverdi er identisk.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌐',
            title: 'Digital salgsstøtte',
            quote: 'Moderne salg er hybrid — fysisk møte støttet av digitale verktøy.',
            content: 'CRM, e-postautomatisering, video-konferanse, sosiale medier-research, og dataanalyse er nå standard salgsstøtte. LinkedIn Sales Navigator gir innsikt i potensielle kunder. Loom og Zoom muliggjør personlige videoer på skala. ChatGPT og lignende AI-verktøy støtter forberedelser og oppfølging. Selv den beste selger trenger digital infrastruktur for å skalere. Men: digitale verktøy erstatter ikke menneskelig kontakt — de forsterker den.',
            subpoints: [
                  { label: 'SOCIAL SELLING', text: 'Bruk av LinkedIn, Twitter og bransjefora for å bygge relasjoner før første møte.' },
          { label: 'VIDEOMELDING', text: 'Personlige videoer (Loom, Vidyard) skaper personlig kontakt på skala.' },
          { label: 'AI-STØTTE', text: 'ChatGPT og lignende verktøy hjelper med forberedelse, e-postutkast og dataanalyse — men erstatter ikke samtalen.' },
            ],
            practical: 'Hvilke digitale verktøy ville hjulpet en lokal butikk-eier å bli en bedre selger? Hvilke er overflødige?',
            exercises: [
            {
      id: 'ml111-9-1',
      icon: '🌐',
      title: 'Social selling',
      question: 'Hva er kjernen i \'social selling\'?',
      choices: [
        { id: 'a', label: 'Å selge produkter via Facebook-annonser', isCorrect: false, feedback: 'Det er sosiale medier-annonsering, ikke social selling.' },
{ id: 'b', label: 'Å bygge relasjoner og synlighet på sosiale medier før første møte', isCorrect: true, feedback: 'Riktig! Social selling betyr å være tilstede der kundene allerede er — LinkedIn for B2B, Instagram for forbrukere — og bygge tillit over tid.' },
{ id: 'c', label: 'Å være sosial under salgsmøter', isCorrect: false, feedback: 'Det er bare god folkeskikk, ikke en strategi.' },
{ id: 'd', label: 'Å selge til venner på Facebook', isCorrect: false, feedback: 'Det er nettverksspam, ikke profesjonelt salg.' },
      ],
      espenTip: 'LinkedIn er den primære B2B-plattformen for social selling. Begynn med å kommentere, dele og publisere — bygg tillit før du spør om noe.',
    },
    {
      id: 'ml111-9-2',
      icon: '🌐',
      title: 'AI i salg',
      question: 'Hvordan brukes AI best i moderne salg?',
      choices: [
        { id: 'a', label: 'Som erstatning for selgere', isCorrect: false, feedback: 'AI kan ikke bygge tillit eller forstå nyanser i menneskelige forhold.' },
{ id: 'b', label: 'Som forberedelse, oppfølging og analyse — verktøy, ikke erstatning', isCorrect: true, feedback: 'Riktig! AI hjelper med research, e-postutkast, oppfølging og dataanalyse. Det frigjør tid til det viktigste: relasjonen med kunden.' },
{ id: 'c', label: 'Bare for å skrive automatiske e-poster', isCorrect: false, feedback: 'Begrenset bruk — AI kan mye mer enn dette.' },
{ id: 'd', label: 'AI har ingen rolle i salg', isCorrect: false, feedback: 'Feil — det endrer arbeidsmåten betydelig allerede.' },
      ],
      espenTip: 'Bruk AI til kjedelige oppgaver (mail-sammendrag, research). Reserver menneskelig tid til det maskiner ikke kan: ekte samtale.',
    },
    {
      id: 'ml111-9-3',
      icon: '🌐',
      title: 'Digital + fysisk',
      question: 'Hva kjennetegner moderne hybrid salg?',
      choices: [
        { id: 'a', label: 'Kun digitale møter, aldri fysisk', isCorrect: false, feedback: 'Mister mye tillitsbygging — fysisk møte er fortsatt verdifullt.' },
{ id: 'b', label: 'Kombinasjon av digitale verktøy og fysiske møter, optimalisert per fase', isCorrect: true, feedback: 'Riktig! Digital research, første møte digitalt, viktig presentasjon fysisk, oppfølging via CRM. Hver fase får riktig kanal.' },
{ id: 'c', label: 'Aldri digitale verktøy — kun personlige relasjoner', isCorrect: false, feedback: 'Tradisjonelt og lite skalerbart.' },
{ id: 'd', label: 'Tilfeldig blanding uten plan', isCorrect: false, feedback: 'Mangler struktur og fører til ineffektivitet.' },
      ],
      espenTip: 'Generelt: digital for screening og oppfølging, fysisk for tillitskritiske beslutninger. Tilpass per kunde og situasjon.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎓',
            title: 'Etikk og profesjonalitet',
            quote: 'Den ærligste selgeren bygger den sterkeste merkevaren.',
            content: 'God salgsetikk handler om å gjøre det rette selv når det koster. Aldri lyve om produktet, aldri presse kunder til kjøp de ikke trenger, aldri snakke nedsettende om konkurrenter. Norsk markedsføringslov og bransjenormer setter klare grenser, men etikk går utover lovkrav. Lojale kunder kommer fra ærlighet over tid — ikke fra kortsiktige seire. Norsk Forbrukertilsyn slår hardt ned på villedende salg, og sosiale medier sprer dårlige opplevelser raskere enn noen gang.',
            subpoints: [
                  { label: 'ÆRLIGHET', text: 'Lov ikke det du ikke kan holde. Si nei hvis produktet ikke passer.' },
          { label: 'INGEN PRESS', text: 'Aggressivt salg gir kortvarig seier og langsiktig tap. Lovverket beskytter spesielt sårbare grupper (eldre, unge).' },
          { label: 'KONKURRENTBEHANDLING', text: 'Aldri snakk nedsettende om konkurrenter. Det reflekterer dårlig på deg, ikke dem.' },
            ],
            practical: 'Tenk på en gang du opplevde uærlig salg. Hvordan reagerte du? Kom du noensinne tilbake? Hva sa du til andre om opplevelsen?',
            exercises: [
            {
      id: 'ml111-10-1',
      icon: '🎓',
      title: 'Konkurrentkritikk',
      question: 'En kunde spør om en konkurrent. Hva er beste respons?',
      choices: [
        { id: 'a', label: '«De er dårlige, kjøp aldri av dem»', isCorrect: false, feedback: 'Aldri snakk nedsettende — det reflekterer dårlig på deg.' },
{ id: 'b', label: '«Det er en god aktør. Vi løser problemet litt annerledes — la meg vise hvordan»', isCorrect: true, feedback: 'Riktig! Anerkjenn konkurrenten profesjonelt og posisjoner deg ved å forklare ditt eget fortrinn — ikke deres svakhet.' },
{ id: 'c', label: 'Late som du ikke kjenner dem', isCorrect: false, feedback: 'Uærlig og umulig i en bransje du jobber i.' },
{ id: 'd', label: 'Tilby umiddelbart 50 % rabatt for å vinne salget', isCorrect: false, feedback: 'Desperat og ulønnsomt. Bygger ikke verdi.' },
      ],
      espenTip: 'Den profesjonelle selgeren kan beskrive konkurrentens styrker objektivt — og forklare hvorfor sin egen løsning passer bedre i akkurat denne kundens situasjon.',
    },
    {
      id: 'ml111-10-2',
      icon: '🎓',
      title: 'Press på sårbare grupper',
      question: 'Et selskap selger forsikring til en eldre kunde som tydelig ikke forstår produktet. Hva sier markedsføringsloven?',
      choices: [
        { id: 'a', label: 'Salget er lovlig så lenge kunden signerer', isCorrect: false, feedback: 'Feil — markedsføringsloven har spesielle vern mot urimelig handelspraksis overfor sårbare grupper.' },
{ id: 'b', label: 'Salget kan være ulovlig — markedsføringsloven beskytter sårbare grupper mot uforholdsmessig påvirkning', isCorrect: true, feedback: 'Riktig! § 7 og § 9 i markedsføringsloven beskytter mot urimelig handelspraksis, særlig overfor barn, eldre og andre i sårbare situasjoner.' },
{ id: 'c', label: 'Det avhenger kun av kontraktstørrelsen', isCorrect: false, feedback: 'Beløp er ikke det avgjørende — det er om kunden har forstått hva hun signerer.' },
{ id: 'd', label: 'Salg er aldri ulovlig', isCorrect: false, feedback: 'Feil — uetisk salg kan både være lovbrudd og gi sivilrettslige konsekvenser.' },
      ],
      espenTip: 'Hvis kunden virker forvirret, stopp salget. Forklar igjen, eller foreslå at hun tar med seg en pårørende. Lønnsomheten ligger i langsiktig tillit.',
    },
    {
      id: 'ml111-10-3',
      icon: '🎓',
      title: 'Etisk vurdering',
      question: 'Hva bør du spørre deg selv før du anbefaler et produkt?',
      choices: [
        { id: 'a', label: 'Hva tjener jeg mest på?', isCorrect: false, feedback: 'Selger-perspektiv — uetisk og kortsiktig.' },
{ id: 'b', label: 'Ville jeg selv kjøpt dette i kundens situasjon?', isCorrect: true, feedback: 'Riktig! Den enkleste etiske testen: \'Ville jeg anbefalt dette til min mor / søster / venn?\' Hvis nei, ikke selg det.' },
{ id: 'c', label: 'Hva sier kontraktssjefen?', isCorrect: false, feedback: 'Kontrakter er juridisk, ikke etisk.' },
{ id: 'd', label: 'Hva forventer ledelsen?', isCorrect: false, feedback: 'Press fra ledelsen er ingen unnskyldning for uetisk salg.' },
      ],
      espenTip: 'Den enkleste etiske testen er den såkalte \'aviskolonne-testen\': ville du vært komfortabel hvis salget ble omtalt på forsiden av Aftenposten? Hvis nei, ikke gjør det.',
    },
            ],
          },
        ]

        export default function SalgPersonligKommunikasjonModule() {
          return (
            <DrawerModule
              moduleCode="ML1-11"
              moduleTitle="Salg og personlig kommunikasjon"
              moduleIcon="🤝"
              storageKey="learning-ml1-salg-personlig-kommunikasjon"
              completeRoute="/learning/ml1/salg-personlig-kommunikasjon/complete"
              phases={phases}
              intro="Personlig salg er den dyreste, men ofte mest effektive formen for markedskommunikasjon. Det handler om å bygge tillit, lytte aktivt og hjelpe kunden å løse et reelt problem — ikke om å presse igjennom et salg. Moderne salg er rådgivning, ikke overtalelse."
              vissteduAt="70/30-regelen i salgssamtaler er forskningsbasert: de mest suksessfulle B2B-selgerne snakker bare 30 % av tiden og bruker resterende 70 % på å lytte aktivt. Likevel praktiserer under 20 % av selgere dette i hverdagen."
              espenSier="Den viktigste salgsteknikken er ikke å snakke smart, men å stille gode spørsmål og virkelig høre etter. Når kunden føler seg forstått, er halve jobben gjort. Det er tillitsbygging — ikke overtalelse."
      presentationLink={{ route: '/learning/presentations/ml1/salg-personlig-kommunikasjon', description: 'Salg og personlig kommunikasjon — 10 slides' }}
            />
          )
        }
