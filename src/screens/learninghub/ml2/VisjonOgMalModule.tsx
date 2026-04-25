        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '💡',
            title: 'Forretningsidé',
            quote: 'Hva, for hvem, hvordan, hvorfor oss.',
            content: 'Forretningsideen svarer på fire spørsmål: Hva skal vi gjøre? For hvem? Hvordan? Hvorfor oss? Skal kunne forklares på 30 sekunder. Klar forretningsidé skiller deg fra konkurrentene.',
            subpoints: [
                  { label: '4 SPØRSMÅL', text: 'Hva, for hvem, hvordan, hvorfor oss — alle må kunne besvares.' },
          { label: 'KORT', text: '30 sekunder eller mindre. Lengre er signal om uklarhet.' },
            ],
            practical: 'Forklar bedriften du jobber for / handler hos på 30 sekunder. Lett eller vanskelig?',
            exercises: [
            {
      id: 'ml202-1-1',
      icon: '💡',
      title: '4 spørsmål',
      question: 'Hva er de 4 spørsmålene i forretningsideen?',
      choices: [
        { id: 'a', label: 'Mål, strategi, tiltak, kontroll', isCorrect: false, feedback: 'Det er strategiprosessen, ikke forretningsidé.' },
{ id: 'b', label: 'Hva, for hvem, hvordan, hvorfor oss', isCorrect: true, feedback: 'Riktig! Klassisk modell. Alle 4 må besvares klart.' },
{ id: 'c', label: 'Pris, produkt, plass, påvirkning', isCorrect: false, feedback: 'Det er markedsmiksen.' },
{ id: 'd', label: 'Hvor, når, hvordan, hvor mye', isCorrect: false, feedback: 'Helt feil ramme.' },
      ],
      espenTip: 'Test deg selv: kan du svare på alle 4 om din egen jobb? De fleste sliter med \'hvorfor oss\'.',
    },
    {
      id: 'ml202-1-2',
      icon: '💡',
      title: 'Lengde',
      question: 'Hvor lang bør forretningsideen være?',
      choices: [
        { id: 'a', label: 'Minst 5 sider', isCorrect: false, feedback: 'For lang — tegn på uklart fokus.' },
{ id: 'b', label: '30 sekunder å forklare', isCorrect: true, feedback: 'Riktig! \'Elevator pitch\'. Kortere er klarere.' },
{ id: 'c', label: 'Kun overskriften', isCorrect: false, feedback: 'For kort — mangler innhold.' },
{ id: 'd', label: 'Uvesentlig', isCorrect: false, feedback: 'Lengde signaliserer klarhet.' },
      ],
      espenTip: 'Hvis du må snakke i 5 minutter for å forklare hva bedriften gjør, har du et fokusproblem.',
    },
    {
      id: 'ml202-1-3',
      icon: '💡',
      title: 'Hvorfor oss',
      question: 'Hva sikter \'hvorfor oss\' til?',
      choices: [
        { id: 'a', label: 'Geografi', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Differensiering — hva gjør oss unike sammenlignet med konkurrenter', isCorrect: true, feedback: 'Riktig! Uten klart svar er du bare en av mange.' },
{ id: 'c', label: 'Lønn', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bedriftens alder', isCorrect: false, feedback: 'Sjelden differensiator.' },
      ],
      espenTip: 'Stormberg: \'Vi ansetter folk med hull i CV-en\'. Det er klart \'hvorfor oss\'.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🌟',
            title: 'Visjon',
            quote: 'Et inspirerende bilde av drømmesituasjonen.',
            content: 'Visjonen er det inspirerende bildet av bedriftens drømmesituasjon i fremtiden. Skal motivere — ikke beskrive nåværende drift. Eksempel: Tomras \'Lead the resource revolution\' inspirerer ansatte til å se seg som del av noe større.',
            subpoints: [
                  { label: 'INSPIRERENDE', text: 'Skal vekke følelser, ikke bare beskrive aktivitet.' },
          { label: 'FREMTIDIG', text: 'Beskriver hvor vi vil — ikke hvor vi er nå.' },
            ],
            practical: 'Hva er Norges visjon? Norge har egentlig ikke en eksplisitt — diskuter om den burde finnes.',
            exercises: [
            {
      id: 'ml202-2-1',
      icon: '🌟',
      title: 'God visjon',
      question: 'Hvilken er en god visjon?',
      choices: [
        { id: 'a', label: 'Vi skal vokse 5 % per år', isCorrect: false, feedback: 'Det er et mål, ikke visjon.' },
{ id: 'b', label: 'Lead the resource revolution (Tomra)', isCorrect: true, feedback: 'Riktig! Inspirerende, fremtidig, klart eierskap. Tomra-eksempel.' },
{ id: 'c', label: 'Vi skal følge alle lover', isCorrect: false, feedback: 'Lovkrav, ikke visjon.' },
{ id: 'd', label: 'Vi skal ha størst budsjett', isCorrect: false, feedback: 'Internt fokus.' },
      ],
      espenTip: 'Test: Vekker visjonen følelser? Hvis ikke, er den for tørr.',
    },
    {
      id: 'ml202-2-2',
      icon: '🌟',
      title: 'Funksjon',
      question: 'Hva skal visjonen gjøre?',
      choices: [
        { id: 'a', label: 'Erstatte strategi', isCorrect: false, feedback: 'Visjonen er INPUT til strategi.' },
{ id: 'b', label: 'Inspirere og forene ansatte mot felles fremtidsbilde', isCorrect: true, feedback: 'Riktig! Visjon = nordstjernen. Strategien er kursen mot den.' },
{ id: 'c', label: 'Bare for reklame', isCorrect: false, feedback: 'Internt verktøy primært.' },
{ id: 'd', label: 'Skattefradrag', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Test: Hvis du sletter visjonen i morgen, ville noen merke? Hvis ikke — den er ikke ekte.',
    },
    {
      id: 'ml202-2-3',
      icon: '🌟',
      title: 'Tidshorisont',
      question: 'Hvor langt frem ser visjonen?',
      choices: [
        { id: 'a', label: 'Bare neste år', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: '10-30 år eller lenger — mål man kanskje aldri når', isCorrect: true, feedback: 'Riktig! Visjon er nordstjernen — du kommer aldri helt frem, men den styrer kursen.' },
{ id: 'c', label: 'Bare neste kvartal', isCorrect: false, feedback: 'Det er rapportering.' },
{ id: 'd', label: '100 år', isCorrect: false, feedback: 'For langt for praktisk styring.' },
      ],
      espenTip: 'JFKs \'mann på månen\' var visjon med ~10-årshorisont. Sjeldent ambisiøst, men oppnåelig.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🪜',
            title: 'Målhierarkiet',
            quote: 'Visjon → hovedmål → delmål → handlingsmål.',
            content: 'Mål struktureres i hierarki: visjonen (lang sikt), hovedmål (3-5 år), delmål (1 år), handlingsmål (måneder). Hvert nivå konkretiserer det forrige. Visjon \'verdens beste\' blir til handlingsmål \'levere innen 24 timer\'.',
            subpoints: [
                  { label: 'STRUKTUR', text: 'Hvert nivå konkretiserer det forrige.' },
          { label: 'KOBLING', text: 'Handlingsmålet på lavt nivå skal kunne spores tilbake til visjonen.' },
            ],
            practical: 'Tegn ditt eget målhierarki for et personlig prosjekt — visjon ned til neste-uke-handling.',
            exercises: [
            {
      id: 'ml202-3-1',
      icon: '🪜',
      title: 'Hierarki',
      question: 'Hva er riktig rekkefølge fra topp?',
      choices: [
        { id: 'a', label: 'Handlingsmål → delmål → hovedmål → visjon', isCorrect: false, feedback: 'Omvendt — visjonen er øverst.' },
{ id: 'b', label: 'Visjon → hovedmål → delmål → handlingsmål', isCorrect: true, feedback: 'Riktig! Top-down strukturering. Hvert nivå må kobles oppover.' },
{ id: 'c', label: 'Tilfeldig rekkefølge', isCorrect: false, feedback: 'Strukturert hierarki er nødvendig.' },
{ id: 'd', label: 'Kun visjon', isCorrect: false, feedback: 'For lite konkret.' },
      ],
      espenTip: 'Test: kan handlingsmål spores til visjon? Hvis ikke, er det isolert aktivitet.',
    },
    {
      id: 'ml202-3-2',
      icon: '🪜',
      title: 'Kobling',
      question: 'Hvorfor må handlingsmål kobles til visjon?',
      choices: [
        { id: 'a', label: 'Lovkrav', isCorrect: false, feedback: 'Ikke lovkrav.' },
{ id: 'b', label: 'For å sikre at daglige handlinger faktisk bygger mot langsiktig retning', isCorrect: true, feedback: 'Riktig! Uten kobling blir aktivitet bare aktivitet — ikke fremgang.' },
{ id: 'c', label: 'Ingen god grunn', isCorrect: false, feedback: 'Det er kjernehensikten.' },
{ id: 'd', label: 'For å imponere', isCorrect: false, feedback: 'Internt verktøy.' },
      ],
      espenTip: 'Spør per oppgave: hvilket hovedmål bygger denne mot? Hvis svaret er \'vet ikke\', revurder oppgaven.',
    },
    {
      id: 'ml202-3-3',
      icon: '🪜',
      title: 'Tidshorisonter',
      question: 'Typisk tidshorisont per nivå?',
      choices: [
        { id: 'a', label: 'Visjon = i dag, handlingsmål = 100 år', isCorrect: false, feedback: 'Helt feil retning.' },
{ id: 'b', label: 'Visjon = 10+ år, hovedmål = 3-5 år, delmål = 1 år, handlingsmål = uker/måneder', isCorrect: true, feedback: 'Riktig! Hver nivå har sin tidshorisont. Konkretisering skjer som tiden krymper.' },
{ id: 'c', label: 'Alle nivåer er 1 år', isCorrect: false, feedback: 'Mister verdi som hierarki.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert tidsfordeling er essensielt.' },
      ],
      espenTip: 'Quartersmål er typisk delmål-nivå. Daglige oppgaver er handlingsmål.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎯',
            title: 'SMART-mål',
            quote: 'Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt.',
            content: 'SMART er rammeverket for gode mål. \'Vi skal vokse\' er ikke SMART. \'Øke omsetningen i Norge med 15 % innen 31.12\' er SMART. Alle 5 kriteriene må være oppfylt — mangler ett, taper målet styringsverdi.',
            subpoints: [
                  { label: 'ALLE 5 KRITERIER', text: 'Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt — alle må være oppfylt.' },
          { label: 'STYRING', text: 'SMART-mål gir grunnlag for både planlegging og evaluering.' },
            ],
            practical: 'Skriv et SMART-mål for skoleåret. Hva er spesifikt, målbart, ambisiøst, realistisk og tidsbestemt?',
            exercises: [
            {
      id: 'ml202-4-1',
      icon: '🎯',
      title: 'Hva betyr S',
      question: 'Hva står S for?',
      choices: [
        { id: 'a', label: 'Salg', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Spesifikt — klart hva som skal oppnås', isCorrect: true, feedback: 'Riktig! Vagt mål er ubrukbart for styring.' },
{ id: 'c', label: 'Stort', isCorrect: false, feedback: 'Det dekkes av A og R.' },
{ id: 'd', label: 'Strategi', isCorrect: false, feedback: 'Helt feil ramme.' },
      ],
      espenTip: 'Test: kan to mennesker tolke målet på samme måte? Hvis nei, ikke spesifikt nok.',
    },
    {
      id: 'ml202-4-2',
      icon: '🎯',
      title: 'M og R i konflikt',
      question: 'Et \'realistisk\' og \'ambisiøst\' mål — hvordan balansere?',
      choices: [
        { id: 'a', label: 'Velg det letteste', isCorrect: false, feedback: 'Da blir det ikke ambisiøst.' },
{ id: 'b', label: 'Stretch-mål: utfordrende men mulig med innsats — typisk 70-90 % suksessrate', isCorrect: true, feedback: 'Riktig! Ambisjon driver innsats; realisme sikrer motivasjon. Balansen er kunsten.' },
{ id: 'c', label: 'Velg det umulige', isCorrect: false, feedback: 'Da mister teamet motivasjon.' },
{ id: 'd', label: 'Velg uten å tenke', isCorrect: false, feedback: 'Tilfeldighet gir dårlige mål.' },
      ],
      espenTip: 'Klassisk regel: ambisiøst nok til å bli svett, realistisk nok til å være nåbart med innsats.',
    },
    {
      id: 'ml202-4-3',
      icon: '🎯',
      title: 'Tid',
      question: 'Hvorfor må mål være tidsbestemt?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Ikke estetikk — funksjon.' },
{ id: 'b', label: 'Uten frist mister målet drivkraft og målbarhet', isCorrect: true, feedback: 'Riktig! \'Innen et tidspunkt\' tvinger frem prioritering. Uten frist utsettes alt.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Ikke lovkrav.' },
{ id: 'd', label: 'Kun for store mål', isCorrect: false, feedback: 'Gjelder alle mål.' },
      ],
      espenTip: 'Bruk konkrete datoer: \'31.12.2025\', ikke \'snart\'. Da er det målbart.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📈',
            title: 'Vekststrategier',
            quote: '4 veier til vekst (Ansoff).',
            content: 'Ansoffs matrise: Markedsinntrenging (kjent produkt + kjent marked, lav risiko), Markedsutvikling (kjent produkt + nytt marked), Produktutvikling (nytt produkt + kjent marked), Diversifikasjon (nytt produkt + nytt marked, høy risiko). Risiko stiger fra 1 til 4. De fleste lykkes best med 1-2 før de prøver 3-4.',
            subpoints: [
                  { label: '4 STRATEGIER', text: 'Markedsinntrenging, markedsutvikling, produktutvikling, diversifikasjon.' },
          { label: 'RISIKO STIGER', text: 'Klassisk regel: behersker du de letteste først.' },
            ],
            practical: 'En lokal kafé vil vokse. Hvilken Ansoff-strategi gir lavest risiko?',
            exercises: [
            {
      id: 'ml202-5-1',
      icon: '📈',
      title: 'Mest risikabel',
      question: 'Hvilken Ansoff er høyest risiko?',
      choices: [
        { id: 'a', label: 'Markedsinntrenging', isCorrect: false, feedback: 'Lavest risiko — kjent terreng.' },
{ id: 'b', label: 'Diversifikasjon — nytt produkt i nytt marked', isCorrect: true, feedback: 'Riktig! Begge dimensjoner er nye. Ofte \'bet the company\'.' },
{ id: 'c', label: 'Produktutvikling', isCorrect: false, feedback: 'Mellomrisiko.' },
{ id: 'd', label: 'Markedsutvikling', isCorrect: false, feedback: 'Mellomrisiko.' },
      ],
      espenTip: 'Nokia diversifiserte fra papir til mobil — lykkes. De fleste forsøk mislykkes.',
    },
    {
      id: 'ml202-5-2',
      icon: '📈',
      title: 'Lavrisiko',
      question: 'Hvilken er lavest risiko?',
      choices: [
        { id: 'a', label: 'Markedsinntrenging — selg mer av det du har til kunder du har', isCorrect: true, feedback: 'Riktig! Begge faktorer er kjent. Lavest risiko, men også begrenset vekstpotensial.' },
{ id: 'b', label: 'Diversifikasjon', isCorrect: false, feedback: 'Helt feil ende.' },
{ id: 'c', label: 'Produktutvikling', isCorrect: false, feedback: 'Mellomrisiko.' },
{ id: 'd', label: 'Ingen — alle er like risikable', isCorrect: false, feedback: 'Risiko varierer betydelig.' },
      ],
      espenTip: 'Markedsinntrenging er ofte beste startsted. Optimalisér eksisterende før du eksperimenterer.',
    },
    {
      id: 'ml202-5-3',
      icon: '📈',
      title: 'Norsk eksempel',
      question: 'Norsk laks-eksport til Kina — hvilken Ansoff?',
      choices: [
        { id: 'a', label: 'Markedsinntrenging', isCorrect: false, feedback: 'Kina er nytt marked.' },
{ id: 'b', label: 'Markedsutvikling — samme produkt, nytt marked', isCorrect: true, feedback: 'Riktig! Klassisk eksport. Lakse-produktet er likt; kinesisk marked er nytt.' },
{ id: 'c', label: 'Diversifikasjon', isCorrect: false, feedback: 'Bare ett av to elementer er nytt.' },
{ id: 'd', label: 'Produktutvikling', isCorrect: false, feedback: 'Produktet er likt.' },
      ],
      espenTip: 'Norsk fiskebransje har 50 år erfaring med markedsutvikling. Eksport er nasjonens vekstmotor.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '⚔️',
            title: 'Konkurransestrategier',
            quote: 'Porters 3 generiske strategier.',
            content: 'Porter identifiserte 3 generiske konkurransestrategier: Kostnadslederskap (vær billigst — IKEA, Ryanair), Differensiering (vær unik — Apple, Tesla), Fokusering (vær best i en nisje — Rolex, Patagonia). Den som prøver alt blir best i ingenting. Velg én og hold deg til den.',
            subpoints: [
                  { label: '3 STRATEGIER', text: 'Kostnadslederskap, differensiering, fokusering.' },
          { label: 'VELG ÉN', text: 'Hybridposisjoner mislykkes ofte. Klart valg gir klarhet.' },
            ],
            practical: 'Velg en bedrift du kjenner. Hvilken Porter-strategi følger de? Lykkes de med valget?',
            exercises: [
            {
      id: 'ml202-6-1',
      icon: '⚔️',
      title: 'Porters 3',
      question: 'Hva er Porters 3 generiske strategier?',
      choices: [
        { id: 'a', label: 'Mål, strategi, kontroll', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'b', label: 'Kostnadslederskap, differensiering, fokusering', isCorrect: true, feedback: 'Riktig! Klassisk Porter. Alle bedrifter må velge én.' },
{ id: 'c', label: 'Salg, marked, produkt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Vekst, modning, tilbakegang', isCorrect: false, feedback: 'Det er PLC.' },
      ],
      espenTip: 'Hybridforsøk er ofte \'stuck in the middle\' — verken billig nok eller distinkt nok.',
    },
    {
      id: 'ml202-6-2',
      icon: '⚔️',
      title: 'IKEA',
      question: 'Hvilken Porter-strategi følger IKEA?',
      choices: [
        { id: 'a', label: 'Differensiering — eksklusivt design', isCorrect: false, feedback: 'Det er Hermès.' },
{ id: 'b', label: 'Kostnadslederskap — laveste pris via masseproduksjon og flatpakker', isCorrect: true, feedback: 'Riktig! IKEA er klassisk kostnadsleder. Hele forretningsmodellen er bygget for lavest pris.' },
{ id: 'c', label: 'Fokusering — kun premium-kunder', isCorrect: false, feedback: 'Tvert imot — bredt marked.' },
{ id: 'd', label: 'Ingen strategi', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'IKEA-modellen: flatpakke, selvbetjening, masseinnkjøp = lave kostnader = lave priser.',
    },
    {
      id: 'ml202-6-3',
      icon: '⚔️',
      title: 'Stuck in the middle',
      question: 'Hva betyr \'stuck in the middle\'?',
      choices: [
        { id: 'a', label: 'Bedriften er midt i markedet', isCorrect: false, feedback: 'For konkret tolkning.' },
{ id: 'b', label: 'Bedriften prøver å være både billig og unik — lykkes med ingen', isCorrect: true, feedback: 'Riktig! Porter-advarsel. Konkurranse-faglig dødssone — verken kostnadsleder eller differensiator.' },
{ id: 'c', label: 'Geografisk midt i landet', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Mellomstor bedrift', isCorrect: false, feedback: 'Ikke størrelse, posisjonering.' },
      ],
      espenTip: 'Klassisk feil: prøve å konkurrere med Walmart på pris OG med Apple på design. Velg én ende.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📊',
            title: 'GAP-analyse',
            quote: 'Forskjellen mellom hvor vi er og hvor vi vil.',
            content: 'GAP-analyse identifiserer avstanden mellom nåværende ytelse og ønsket ytelse. Brukes for å avdekke hvor mye innsats som kreves. Eksempel: nåværende markedsandel 12 %, mål 20 % = GAP på 8 prosentpoeng. Tiltak må adressere gapet konkret.',
            subpoints: [
                  { label: 'GAP = INNSATS', text: 'Større GAP = større innsats kreves.' },
          { label: 'KONKRET', text: 'Tall, ikke følelser. \'Vi må vokse\' er ikke GAP-analyse.' },
            ],
            practical: 'Hva er ditt eget GAP — hvor er du, hvor vil du være? Hva er innsatsen som kreves?',
            exercises: [
            {
      id: 'ml202-7-1',
      icon: '📊',
      title: 'Hva er GAP',
      question: 'Hva er en GAP-analyse?',
      choices: [
        { id: 'a', label: 'Analyse av kjønnsfordeling', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Forskjellen mellom nåværende og ønsket tilstand', isCorrect: true, feedback: 'Riktig! Gap = avstanden å lukke. Brukes for å konkretisere innsatsen.' },
{ id: 'c', label: 'Geografisk avstand', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Lønnsforskjell', isCorrect: false, feedback: 'Det er en spesifikk type GAP, ikke generelt.' },
      ],
      espenTip: 'Tegn pil: \'her er vi\' → \'her vil vi\'. Pilens lengde er gapet.',
    },
    {
      id: 'ml202-7-2',
      icon: '📊',
      title: 'Bruk',
      question: 'Når bruker man GAP-analyse?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'For å konkretisere hva som kreves for å nå mål', isCorrect: true, feedback: 'Riktig! Tvinger frem realisme om innsats og ressurser. Stoppes ofte at \'urealistiske mål\' avsløres.' },
{ id: 'c', label: 'Bare for offentlig sektor', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Bare på regnskap', isCorrect: false, feedback: 'Bredere bruk.' },
      ],
      espenTip: 'Spør per mål: \'hvor stort er gapet?\' Hvis du ikke kan tallfeste, er målet ikke godt nok definert.',
    },
    {
      id: 'ml202-7-3',
      icon: '📊',
      title: 'Eksempel',
      question: 'Markedsandel nå 10 %, mål 25 %. Hva er GAP?',
      choices: [
        { id: 'a', label: '10 prosentpoeng', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'b', label: '15 prosentpoeng', isCorrect: true, feedback: 'Riktig! 25-10 = 15. Det er gapet å lukke.' },
{ id: 'c', label: '25 prosentpoeng', isCorrect: false, feedback: 'Det er målet, ikke gapet.' },
{ id: 'd', label: 'Umulig å beregne', isCorrect: false, feedback: 'Enkel subtraksjon.' },
      ],
      espenTip: 'Gapet er 15 pp. Spør: hva kreves for å vinne 15 pp markedsandel? Tiltak, ressurser, tid?',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '⚖️',
            title: 'Verdigrunnlag',
            quote: 'De etiske rammene som styrer hverdagen.',
            content: 'Verdigrunnlaget er de moralske grensene for hvordan ansatte skal opptre — særlig i situasjoner der strategien settes på prøve. Eksempel: NHO sin verdiplattform inkluderer integritet, ansvar, åpenhet. Verdier viser seg i handlinger, ikke plakater. Ledelsens eksempel teller mest.',
            subpoints: [
                  { label: 'HANDLING > ORD', text: 'Verdier vises i hva som premieres, ikke hva som ropes ut.' },
          { label: 'LEDELSENS EKSEMPEL', text: 'Ledere setter standard. Hva de gjør betyr mer enn hva de sier.' },
            ],
            practical: 'Hvilke verdier ser du tydelig i bedrifter du kjenner? Hvilke \'står på plakaten\' men er ikke ekte?',
            exercises: [
            {
      id: 'ml202-8-1',
      icon: '⚖️',
      title: 'Hvor verdier vises',
      question: 'Hvor ser man ekte verdier?',
      choices: [
        { id: 'a', label: 'På verdiplakaten', isCorrect: false, feedback: 'Plakat = ord. Ikke nødvendigvis handling.' },
{ id: 'b', label: 'I konflikt mellom inntjening og verdier — hva ble valgt?', isCorrect: true, feedback: 'Riktig! Verdier testes når det koster. Velges inntjening, er verdiene ikke ekte.' },
{ id: 'c', label: 'I årsrapporten', isCorrect: false, feedback: 'Kan være pynt.' },
{ id: 'd', label: 'I HR-systemet', isCorrect: false, feedback: 'Bare hvis fulgt opp.' },
      ],
      espenTip: 'Test: sist det var konflikt mellom verdi og inntjening — hva vant? Det er den ekte verdien.',
    },
    {
      id: 'ml202-8-2',
      icon: '⚖️',
      title: 'Lederens rolle',
      question: 'Hva er viktigst for verdier?',
      choices: [
        { id: 'a', label: 'Plakater på veggen', isCorrect: false, feedback: 'Pynt.' },
{ id: 'b', label: 'Ledelsens daglige eksempel', isCorrect: true, feedback: 'Riktig! \'Walk the talk\'. Folk ser hva ledere faktisk gjør — kopierer det.' },
{ id: 'c', label: 'Ansatt-håndbok', isCorrect: false, feedback: 'Dokumenter alene endrer ikke kultur.' },
{ id: 'd', label: 'Reklame', isCorrect: false, feedback: 'Eksternt — ikke kultur.' },
      ],
      espenTip: 'Steve Jobs: \'kultur er det som skjer når lederen ikke er i rommet\'. Riktig observasjon.',
    },
    {
      id: 'ml202-8-3',
      icon: '⚖️',
      title: 'Funksjon',
      question: 'Hva er verdienes hovedfunksjon?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Ikke estetikk.' },
{ id: 'b', label: 'Beslutningsstøtte når strategi er uklar — verdiene viser hvordan', isCorrect: true, feedback: 'Riktig! Verdier er kompass i grå-soner der reglene ikke gir svar.' },
{ id: 'c', label: 'Kontraktklausul', isCorrect: false, feedback: 'Verdier er bredere.' },
{ id: 'd', label: 'Skattesak', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Når i tvil, spør: \'hva sier våre verdier?\' Hvis svaret ikke gir retning, er verdiene ubrukelige.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🎯',
            title: 'Strategi-implementering',
            quote: 'Den vanskelige delen.',
            content: '70 % av strategier mislykkes på implementering. Hovedfeil: dårlig kommunikasjon, manglende ressurser, ingen oppfølging. Krever: tydelige KPI-er, månedlig oppfølging, ledelse-engasjement. Strategi er et verb, ikke et substantiv.',
            subpoints: [
                  { label: '70 % MISLYKKES', text: 'McKinsey-tall over år. Mest pga svak implementering.' },
          { label: 'KOMMUNIKASJON', text: 'Hvis ansatte ikke forstår strategien, blir den ikke fulgt.' },
            ],
            practical: 'Hvilke endringer du har vært del av lyktes? Hva avgjorde — plan eller utførelse?',
            exercises: [
            {
      id: 'ml202-9-1',
      icon: '🎯',
      title: 'Suksessrate',
      question: 'Hvor mange strategier lykkes typisk?',
      choices: [
        { id: 'a', label: '90 %', isCorrect: false, feedback: 'Helt feil — mye lavere.' },
{ id: 'b', label: '30 % — 70 % mislykkes', isCorrect: true, feedback: 'Riktig! McKinsey-data. Implementering er hardere enn planlegging.' },
{ id: 'c', label: 'Alle', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: '10 %', isCorrect: false, feedback: 'Lavere enn realiteten.' },
      ],
      espenTip: 'Statistikken er stabil — ikke fordi strategi er svak, men fordi implementering er undervurdert.',
    },
    {
      id: 'ml202-9-2',
      icon: '🎯',
      title: 'Hvor svikter',
      question: 'Hvor svikter strategier mest?',
      choices: [
        { id: 'a', label: 'I planleggings-fasen', isCorrect: false, feedback: 'Planer er typisk gode.' },
{ id: 'b', label: 'I implementering — strategien kommer aldri ut av møterommet', isCorrect: true, feedback: 'Riktig! Mest vanlige feil. Krever like mye fokus som planlegging.' },
{ id: 'c', label: 'I analyse', isCorrect: false, feedback: 'Analyse er ofte for grundig.' },
{ id: 'd', label: 'Strategier feiler aldri', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Test: spør tilfeldig ansatt — kan hun forklare strategien? Hvis ikke, har du implementeringsproblem.',
    },
    {
      id: 'ml202-9-3',
      icon: '🎯',
      title: 'Beste fix',
      question: 'Hva er beste fix for implementering?',
      choices: [
        { id: 'a', label: 'Bare bedre planer', isCorrect: false, feedback: 'Plan uten utførelse er ingenting.' },
{ id: 'b', label: 'Tydelige KPI-er, månedlig oppfølging, ledelse-engasjement, kommunikasjon', isCorrect: true, feedback: 'Riktig! Helhetlig systemarbeid. Disiplin over tid.' },
{ id: 'c', label: 'Mer dokumentasjon', isCorrect: false, feedback: 'Dokumenter alene hjelper ikke.' },
{ id: 'd', label: 'Bare mer penger', isCorrect: false, feedback: 'Penger uten retning er bortkastet.' },
      ],
      espenTip: 'Implementering er en disiplin. Strategi-møter månedlig — ikke arkiver dokumentet og glem.',
    },
            ],
          },
        ]

        export default function VisjonOgMalModule() {
          return (
            <DrawerModule
              moduleCode="ML2-02"
              moduleTitle="Visjon, mål og overordnede strategier"
              moduleIcon="🌟"
              storageKey="learning-ml2-visjon-og-mal"
              completeRoute="/learning/ml2/visjon-og-mal/complete"
              phases={phases}
              intro="Hvor skal vi? Visjonen gir retning, målene gir struktur, strategien viser veien. Uten klare mål er det umulig å vite om strategien virker."
              vissteduAt="Equinor sin visjon \'Vi former fremtidens energi\' kom etter Statoil-til-Equinor-skiftet i 2018 — og signaliserer overgangen fra olje til energi. En 6-ords visjon endret hele strategien."
              espenSier="Visjonen er ikke en plakat på veggen — den er testen for hver beslutning. \'Bringer dette oss nærmere visjonen?\' Hvis nei, ikke gjør det."
      presentationLink={{ route: '/learning/presentations/ml2/visjon-og-mal', description: 'Visjon, mål og overordnede strategier — 10 slides' }}
            />
          )
        }
