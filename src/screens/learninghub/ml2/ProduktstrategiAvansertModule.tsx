        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📦',
            title: 'Strategisk produktbeslutning',
            quote: 'Hva skal vi tilby?',
            content: 'Strategiske produktvalg avgjør bedriftens identitet — kan ikke endres uten store kostnader. Hva skal vi tilby? Hvilke segmenter? Hvilke skal vi velge bort? Disse valgene styrer alt fra investeringer til organisering.',
            subpoints: [
                  { label: 'LANGSIKTIG', text: 'Produktvalg krever ofte år å implementere.' },
          { label: 'VELG BORT', text: 'Like viktig å velge bort som å velge inn.' },
            ],
            practical: 'Hvilke produktområder har bedrifter du kjenner valgt bort de siste årene?',
            exercises: [
            {
      id: 'ml208-1-1',
      icon: '📦',
      title: 'Hvorfor strategisk',
      question: 'Hvorfor er produktbeslutninger strategiske?',
      choices: [
        { id: 'a', label: 'Tilfeldige', isCorrect: false, feedback: 'Strategiske.' },
{ id: 'b', label: 'Lange implementeringstider, høye investeringer, vanskelig å reversere', isCorrect: true, feedback: 'Riktig! Definerer bedriften.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Bare i salg', isCorrect: false, feedback: 'Bredere effekt.' },
      ],
      espenTip: 'Apple iPad var strategisk: 5 års utvikling, milliarder i investering. Bygde ny kategori.',
    },
    {
      id: 'ml208-1-2',
      icon: '📦',
      title: 'Velge bort',
      question: 'Hvorfor er det viktig å velge bort?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'b', label: 'Konsentrer ressurser på det som gir mest verdi', isCorrect: true, feedback: 'Riktig! Fokus slår spredning.' },
{ id: 'c', label: 'Bare for små', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Apple sa nei til netbooks, Android-strategi. Konsentrerte seg om iPhone — vant kategorien.',
    },
    {
      id: 'ml208-1-3',
      icon: '📦',
      title: 'Test',
      question: 'Hvor langt frem ser produktbeslutninger?',
      choices: [
        { id: 'a', label: 'Neste uke', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: '3-10 år eller lenger', isCorrect: true, feedback: 'Riktig! Produktledelse er langsiktig disiplin.' },
{ id: 'c', label: 'Bare neste år', isCorrect: false, feedback: 'For kort.' },
{ id: 'd', label: '100 år', isCorrect: false, feedback: 'Overdrevet.' },
      ],
      espenTip: 'Bil-produsenter planlegger 7-10 år frem. Mat-produsenter 2-3 år.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🔄',
            title: 'PLC i strategi',
            quote: 'Tilpas tiltak per livsfase.',
            content: 'Produktets livssyklus styrer hvilke tiltak som lønner seg per fase. Introduksjon: investere i kjennskap. Vekst: bygge distribusjon. Modning: kostnadskutt + variasjon. Tilbakegang: skum overskudd, planlegg avvikling. Feil tiltak per fase = sløsing.',
            subpoints: [
                  { label: '4 FASER', text: 'Introduksjon, vekst, modning, tilbakegang.' },
          { label: 'ULIKE TILTAK', text: 'Hver fase krever ulike investeringer og strategier.' },
            ],
            practical: 'Identifiser et produkt i hver fase: introduksjon, vekst, modning, tilbakegang.',
            exercises: [
            {
      id: 'ml208-2-1',
      icon: '🔄',
      title: '4 faser',
      question: 'Hva er PLC-fasene?',
      choices: [
        { id: 'a', label: 'Plan, gjennomføring, evaluering, justering', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'b', label: 'Introduksjon, vekst, modning, tilbakegang', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
{ id: 'c', label: 'Lansering, eksport, tilbakekalling', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare 2', isCorrect: false, feedback: 'For få.' },
      ],
      espenTip: 'Smarttelefoner: i modning. AI-assistenter: i vekst. Faks: i tilbakegang.',
    },
    {
      id: 'ml208-2-2',
      icon: '🔄',
      title: 'Modning',
      question: 'Hva er typisk strategi i modningsfasen?',
      choices: [
        { id: 'a', label: 'Massiv reklame', isCorrect: false, feedback: 'Det er introduksjon.' },
{ id: 'b', label: 'Kostnadskutt, varianter, melke profitten', isCorrect: true, feedback: 'Riktig! Etablert produkt — fokus på effektivitet og forlengelse.' },
{ id: 'c', label: 'Avvikle umiddelbart', isCorrect: false, feedback: 'Tidlig — modning kan vare lenge.' },
{ id: 'd', label: 'Helt ny utvikling', isCorrect: false, feedback: 'Senere fase.' },
      ],
      espenTip: 'Coca-Cola Classic er i evig modning. Konstant variasjon (Cherry, Vanilla, Zero) holder kategorien i live.',
    },
    {
      id: 'ml208-2-3',
      icon: '🔄',
      title: 'Tilbakegang',
      question: 'Hva i tilbakegangsfasen?',
      choices: [
        { id: 'a', label: 'Investere mer', isCorrect: false, feedback: 'Sjelden lønnsomt.' },
{ id: 'b', label: 'Skum overskudd, planlegg avvikling, ressurser til nye produkter', isCorrect: true, feedback: 'Riktig! Maksimer kortsiktig profitt fra eksisterende, invester i fremtiden.' },
{ id: 'c', label: 'Helt ignorere', isCorrect: false, feedback: 'Fortsatt cash-strøm å høste.' },
{ id: 'd', label: 'Lovstridig å selge', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Kodak feilet ved å investere i film mens digital tok over. PLC-feil i tilbakegang.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📊',
            title: 'BCG-matrisen',
            quote: 'Stjerner, melkekyr, spørsmålstegn, hunder.',
            content: 'BCG-matrisen klassifiserer produkter etter markedsvekst (y-akse) og relativ markedsandel (x-akse). 4 kategorier: Stjerner (vekst+stor andel), Spørsmålstegn (vekst+liten andel), Melkekyr (lav vekst+stor andel), Hunder (lav vekst+liten andel). Strategi: melk kuene, dyrk stjernene, vurder spørsmålstegn, fas ut hunder.',
            subpoints: [
                  { label: '4 KATEGORIER', text: 'Stjerner, spørsmålstegn, melkekyr, hunder.' },
          { label: 'CASH FLOW', text: 'Melkekyr finansierer stjerner og spørsmålstegn.' },
            ],
            practical: 'Plot 5 produkter du kjenner i BCG-matrisen. Hvilke er stjerner? Hunder?',
            exercises: [
            {
      id: 'ml208-3-1',
      icon: '📊',
      title: '4 kvadranter',
      question: 'Hva er BCG-kvadrantene?',
      choices: [
        { id: 'a', label: 'Tilfeldige navn', isCorrect: false, feedback: 'Strukturert modell.' },
{ id: 'b', label: 'Stjerner, spørsmålstegn, melkekyr, hunder', isCorrect: true, feedback: 'Riktig! Klassisk modell fra Boston Consulting Group.' },
{ id: 'c', label: 'Pris, produkt, plass, promo', isCorrect: false, feedback: 'Det er markedsmiks.' },
{ id: 'd', label: 'ABC-segmenter', isCorrect: false, feedback: 'Helt feil ramme.' },
      ],
      espenTip: 'Tegn matrisen: vekst på y-akse, andel på x-akse. Plot produkter.',
    },
    {
      id: 'ml208-3-2',
      icon: '📊',
      title: 'Strategi',
      question: 'Hva er strategien for melkekyr?',
      choices: [
        { id: 'a', label: 'Investere mer', isCorrect: false, feedback: 'Avhenger — hvis lav vekst, sjelden lønnsomt.' },
{ id: 'b', label: 'Maksimer cash flow, finansier stjerner og spørsmålstegn', isCorrect: true, feedback: 'Riktig! Melkekyr er bedriftens kontant-generatorer.' },
{ id: 'c', label: 'Avvikle umiddelbart', isCorrect: false, feedback: 'For tidlig — fortsatt lønnsomme.' },
{ id: 'd', label: 'Ignorere', isCorrect: false, feedback: 'Strategisk verdifulle.' },
      ],
      espenTip: 'Marlboro for Philip Morris er klassisk melkeku. Finansierer ekspansjon i andre kategorier.',
    },
    {
      id: 'ml208-3-3',
      icon: '📊',
      title: 'Hunder',
      question: 'Hva med hunder?',
      choices: [
        { id: 'a', label: 'Investere kraftig', isCorrect: false, feedback: 'Sjelden lønnsomt.' },
{ id: 'b', label: 'Som regel avvikle eller minimere', isCorrect: true, feedback: 'Riktig! Lav vekst + liten andel = lite fremtid. Frigjør ressurser.' },
{ id: 'c', label: 'Beholde som tradisjon', isCorrect: false, feedback: 'Romantisk, ikke strategisk.' },
{ id: 'd', label: 'Bare reklamere mer', isCorrect: false, feedback: 'Sjelden hjelper.' },
      ],
      espenTip: 'Unntak: hunder kan ha strategisk verdi (komplementærprodukt) selv om økonomisk svake.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📐',
            title: 'Sortimentstrategi',
            quote: 'Bredde vs dybde.',
            content: 'Bredde = antall produktgrupper. Dybde = varianter innen gruppe. Strategiske valg: smalt + dypt (nisje, premium), bredt + dypt (full-line warehouse), bredt + grunt (butikk), smalt + grunt (oppstart). Hver strategi har egne fordeler og kostnader.',
            subpoints: [
                  { label: 'BREDDE × DYBDE', text: 'Strategisk valg som styrer sortimentet.' },
          { label: 'FOKUS vs OMFANG', text: 'Bytter mellom dybde og bredde basert på posisjonering.' },
            ],
            practical: 'Hva er bredden og dybden i din lokale dagligvarebutikk vs Apple Store?',
            exercises: [
            {
      id: 'ml208-4-1',
      icon: '📐',
      title: 'Bredde',
      question: 'Hva betyr bredde?',
      choices: [
        { id: 'a', label: 'Antall ansatte', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Antall produktgrupper bedriften tilbyr', isCorrect: true, feedback: 'Riktig! Hvor mange ulike kategorier dekkes.' },
{ id: 'c', label: 'Bare for hyller', isCorrect: false, feedback: 'For konkret.' },
{ id: 'd', label: 'Geografisk spredning', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Apple: smal bredde (telefoner, datamaskiner, klokker, ører). REMA: bred bredde (alt fra mat til drikke til hygiene).',
    },
    {
      id: 'ml208-4-2',
      icon: '📐',
      title: 'Dybde',
      question: 'Hva betyr dybde?',
      choices: [
        { id: 'a', label: 'Hyllehøyde', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Antall varianter innen samme produktgruppe', isCorrect: true, feedback: 'Riktig! Hvor mange valg innen kategorien.' },
{ id: 'c', label: 'Pris-spenn', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Geografisk', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Apple iPhone: ~10 modeller (dyp). Telenor mobilabonnement: 4-5 valg (grunn dybde).',
    },
    {
      id: 'ml208-4-3',
      icon: '📐',
      title: 'Premium',
      question: 'Hva er typisk for premium-merker?',
      choices: [
        { id: 'a', label: 'Bredt og grunt', isCorrect: false, feedback: 'Det er typisk lavpris.' },
{ id: 'b', label: 'Smalt og dypt — fokus på få kategorier med mange varianter', isCorrect: true, feedback: 'Riktig! Premium-merker holder fokus, ikke spreder seg.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare smalt', isCorrect: false, feedback: 'Også dybde teller.' },
      ],
      espenTip: 'Rolex: kun klokker (smalt), men mange varianter (dyp). Klassisk premium-strategi.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🏗️',
            title: 'Merkevarearkitektur',
            quote: 'House of Brands vs Branded House.',
            content: 'Hvordan organisere flere merker. House of Brands (P&G, Unilever): mange selvstendige merker (Pampers, Tide, Gillette). Branded House (Apple, Microsoft): alt under hovedmerket. Hybrid (Toyota + Lexus): kombinasjon. Valg påvirker markedsføringskostnader, risiko og fleksibilitet.',
            subpoints: [
                  { label: 'HOUSE OF BRANDS', text: 'Mange selvstendige merker — fleksibilitet, men dyrt.' },
          { label: 'BRANDED HOUSE', text: 'Ett hovedmerke for alt — billig, men sårbar.' },
            ],
            practical: 'Hvilken merkearkitektur bruker bedrifter du kjenner? Coca-Cola? Marriott?',
            exercises: [
            {
      id: 'ml208-5-1',
      icon: '🏗️',
      title: 'Forskjell',
      question: 'Hva er hovedforskjellen?',
      choices: [
        { id: 'a', label: 'Bare logo', isCorrect: false, feedback: 'Strukturell forskjell.' },
{ id: 'b', label: 'Antall merker — House of Brands har mange uavhengige; Branded House har ett dominerende', isCorrect: true, feedback: 'Riktig! Strukturell strategi-forskjell.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle størrelser.' },
      ],
      espenTip: 'P&G har 65 merker. Apple har én. Begge ekstremt vellykket — ulike strategier.',
    },
    {
      id: 'ml208-5-2',
      icon: '🏗️',
      title: 'P&G',
      question: 'Hvorfor velger P&G House of Brands?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Segmentere kunder, redusere risiko ved skandale, lansere uten å risikere kjernemerket', isCorrect: true, feedback: 'Riktig! Multipel strategisk verdi.' },
{ id: 'c', label: 'Bare for å forvirre', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Hvis ett P&G-merke skandaliseres, rammer det ikke de 64 andre. Risikospredning.',
    },
    {
      id: 'ml208-5-3',
      icon: '🏗️',
      title: 'Apple',
      question: 'Hvorfor velger Apple Branded House?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Kapitalisere på kjernemerkets styrke — alle produkter får drahjelp av Apple-navnet', isCorrect: true, feedback: 'Riktig! Konsentrert merkevareverdi.' },
{ id: 'c', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Risikoen: én skandale rammer alle Apple-produkter. Strategisk avveining for sterke merker.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '💡',
            title: 'Innovasjon',
            quote: 'Inkrementell vs radikal.',
            content: 'Inkrementell innovasjon: forbedre eksisterende produkter (iPhone 14 → 15). Lav risiko, lav avkastning. Radikal innovasjon: helt nye løsninger (iPhone i 2007). Høy risiko, kan endre bransjer. Bedrifter trenger begge — inkrementell for cashflow, radikal for fremtid.',
            subpoints: [
                  { label: 'INKREMENTELL', text: 'Forbedring av eksisterende — lav risiko, lav avkastning.' },
          { label: 'RADIKAL', text: 'Helt nytt — høy risiko, kan transformere bransje.' },
            ],
            practical: 'Hvilke innovasjoner har du sett siste år? Hvilke er inkrementelle? Radikale?',
            exercises: [
            {
      id: 'ml208-6-1',
      icon: '💡',
      title: 'Forskjell',
      question: 'Hva er forskjellen?',
      choices: [
        { id: 'a', label: 'Pris', isCorrect: false, feedback: 'Strategisk forskjell.' },
{ id: 'b', label: 'Inkrementell forbedrer eksisterende; radikal skaper helt nytt', isCorrect: true, feedback: 'Riktig! Risiko og potensial varierer dramatisk.' },
{ id: 'c', label: 'Bare i tech', isCorrect: false, feedback: 'Gjelder alle bransjer.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert skille.' },
      ],
      espenTip: 'Tesla Model 3 var radikal innovasjon. Tesla Model 3 2024-versjon er inkrementell.',
    },
    {
      id: 'ml208-6-2',
      icon: '💡',
      title: 'Risiko',
      question: 'Hvorfor er radikal mer risikabelt?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelle årsaker.' },
{ id: 'b', label: 'Mer ukjent, krever lengre utvikling, kan flopp', isCorrect: true, feedback: 'Riktig! Apple Newton (1993) var radikal — flopp. iPhone (2007) var radikal — suksess.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Gjelder overalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: '70 % av radikale innovasjoner mislykkes. Men de få som lykkes endrer bransjer.',
    },
    {
      id: 'ml208-6-3',
      icon: '💡',
      title: 'Balanse',
      question: 'Trenger man begge?',
      choices: [
        { id: 'a', label: 'Bare radikal', isCorrect: false, feedback: 'For risikabelt.' },
{ id: 'b', label: 'Begge — inkrementell for stabilt cashflow, radikal for fremtid', isCorrect: true, feedback: 'Riktig! Ofte 70-80 % inkrementell, 20-30 % radikal.' },
{ id: 'c', label: 'Bare inkrementell', isCorrect: false, feedback: 'Mister fremtidsmuligheter.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk balansering.' },
      ],
      espenTip: 'Google har bevisst 70/20/10-regel: 70 % kjerne, 20 % beslektet, 10 % radikalt. Strukturert balansering.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🤝',
            title: 'Open Innovation',
            quote: 'Hent ideer utenfra.',
            content: 'Open Innovation: hent innovasjonskraft utenfra. Procter & Gamble sitt \'Connect+Develop\'-program henter inn tusenvis av eksterne ideer årlig. 50 % av P&G-innovasjoner kommer nå utenfra. Reduserer FoU-kostnader, øker hastighet. Krever kultur som verdsetter eksterne ideer.',
            subpoints: [
                  { label: 'UTENFRA-IDEER', text: 'Kunder, akademia, oppstartsbedrifter, leverandører.' },
          { label: 'ENDRE KULTUR', text: 'Krever \'not invented here\'-syndromet bekjempes.' },
            ],
            practical: 'Hvilke ideer rundt deg kunne en bedrift kjøpt? Hvor finner de ideene?',
            exercises: [
            {
      id: 'ml208-7-1',
      icon: '🤝',
      title: 'Hva',
      question: 'Hva er Open Innovation?',
      choices: [
        { id: 'a', label: 'Innovere åpent på TV', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Hente innovasjonskraft utenfra — kunder, akademia, startups', isCorrect: true, feedback: 'Riktig! Bryte \'not invented here\'.' },
{ id: 'c', label: 'Patent-fri', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare i tech', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'Eli Lilly InnoCentive: belønner globale forskere for å løse spesifikke utfordringer. Klassisk Open Innovation.',
    },
    {
      id: 'ml208-7-2',
      icon: '🤝',
      title: 'P&G',
      question: 'Hvor mye av P&G-innovasjonene kommer utenfra?',
      choices: [
        { id: 'a', label: '10 %', isCorrect: false, feedback: 'Underestimert.' },
{ id: 'b', label: 'Cirka 50 %', isCorrect: true, feedback: 'Riktig! Connect+Develop-programmet har transformert P&G-innovasjon.' },
{ id: 'c', label: 'Aldri utenfra', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: '100 %', isCorrect: false, feedback: 'For høyt.' },
      ],
      espenTip: 'Resultatet: P&G-innovasjons-suksessrate doblet. Mer for mindre.',
    },
    {
      id: 'ml208-7-3',
      icon: '🤝',
      title: 'Hindringer',
      question: 'Hva hindrer Open Innovation?',
      choices: [
        { id: 'a', label: 'Ingen hindringer', isCorrect: false, feedback: 'Mange hindringer.' },
{ id: 'b', label: '\'Not invented here\'-syndrom — ansatte motsetter seg eksterne ideer', isCorrect: true, feedback: 'Riktig! Kulturelt fenomen. Krever bevisst kulturarbeid.' },
{ id: 'c', label: 'Bare juss', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Kostnader', isCorrect: false, feedback: 'Sjelden hovedårsak.' },
      ],
      espenTip: 'Krever IP-ledelse: hvordan håndtere immaterielle rettigheter med eksterne. Ofte juridisk komplisert.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🛠️',
            title: 'Ettermarked og service',
            quote: 'Der pengene ofte ligger.',
            content: 'Ettermarked (after-sales): service, vedlikehold, oppgraderinger, forbruksmateriell. Rolls-Royce tjener mer på vedlikehold av flymotorer enn på selve motorene. Apple Service-segmentet (App Store, iCloud, AppleCare) vokser raskere enn iPhone-salg. Ettermarkedet er ofte mer lønnsomt enn førstesalg.',
            subpoints: [
                  { label: 'MER LØNNSOMT', text: 'Marginer ofte 2-3x høyere enn førstesalg.' },
          { label: 'LOJALITETSDRIVER', text: 'God service binder kunden lenger.' },
            ],
            practical: 'Hvilke produkter du kjenner har stort ettermarked? Bil? Telefon? Vaskemaskin?',
            exercises: [
            {
      id: 'ml208-8-1',
      icon: '🛠️',
      title: 'Definisjon',
      question: 'Hva er ettermarkedet?',
      choices: [
        { id: 'a', label: 'Reklame', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Service, vedlikehold, oppgraderinger, forbruksmateriell etter førstesalg', isCorrect: true, feedback: 'Riktig! Hele kjøpsforholdet etter signering.' },
{ id: 'c', label: 'Andre kunder', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare garanti', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Bil: 70 % av profitten over levetiden er ettermarked (service, deler). 30 % er førstesalg.',
    },
    {
      id: 'ml208-8-2',
      icon: '🛠️',
      title: 'Hvorfor lønnsomt',
      question: 'Hvorfor er ettermarkedet ofte mer lønnsomt?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelle årsaker.' },
{ id: 'b', label: 'Færre konkurrenter, kunden er allerede \'fanget\', høyere marginer', isCorrect: true, feedback: 'Riktig! Originalpartner har konkurransefortrinn etter salg.' },
{ id: 'c', label: 'Loven krever det', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for biler', isCorrect: false, feedback: 'Mange bransjer.' },
      ],
      espenTip: 'Apple kunder kjøper alle tilbehør i Apple-økosystemet. Lock-in skaper premium ettermarked.',
    },
    {
      id: 'ml208-8-3',
      icon: '🛠️',
      title: 'Apple Service',
      question: 'Hvordan vokser Apple Services?',
      choices: [
        { id: 'a', label: 'Krymper', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Vokser raskere enn iPhone-salg — App Store, iCloud, Apple Music', isCorrect: true, feedback: 'Riktig! Strategisk skifte fra hardware-fokus til service-fokus.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
{ id: 'd', label: 'Helt urelevant', isCorrect: false, feedback: 'Sentralt for Apple-strategi.' },
      ],
      espenTip: 'Apple Services genererer over 80 milliarder USD årlig. Strategisk overgang fra produkt til plattform.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⏰',
            title: 'Time-to-market',
            quote: 'Hastighet er konkurranse.',
            content: 'Time-to-market: hvor raskt fra idé til lansert produkt. Korte sykluser (Spotify, Tesla) gir konkurransefortrinn — kan respondere på trender, fange muligheter. Lange sykluser (Boeing, farma) krever stor satsing per produkt. Agile metoder reduserer time-to-market betydelig.',
            subpoints: [
                  { label: 'RASKHET = KONKURRANSE', text: 'Korte sykluser gir fleksibilitet og fortrinn.' },
          { label: 'AGILE METODER', text: 'Iterative utvikling reduserer time-to-market dramatisk.' },
            ],
            practical: 'Hvor lang er time-to-market i bransjer du kjenner? Mat (uker)? Bil (år)? Mobil (måneder)?',
            exercises: [
            {
      id: 'ml208-9-1',
      icon: '⏰',
      title: 'Definisjon',
      question: 'Hva er time-to-market?',
      choices: [
        { id: 'a', label: 'Reklame-tid', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Tid fra idé til lansert produkt', isCorrect: true, feedback: 'Riktig! Kritisk konkurranseparameter.' },
{ id: 'c', label: 'Bare planlegging', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Levering til kunde', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Tesla Model S: 3 år fra idé til lansering. Tradisjonelle bilprodusenter: 5-7 år.',
    },
    {
      id: 'ml208-9-2',
      icon: '⏰',
      title: 'Hvorfor',
      question: 'Hvorfor er kort time-to-market viktig?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Respondere på trender, fange muligheter, slå konkurrenter', isCorrect: true, feedback: 'Riktig! Strategisk hastighet.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk verdi.' },
      ],
      espenTip: 'Zara revolusjonerte mote: 15 dager fra design til butikk. Konkurrentene 6 måneder.',
    },
    {
      id: 'ml208-9-3',
      icon: '⏰',
      title: 'Agile',
      question: 'Hvordan reduserer agile time-to-market?',
      choices: [
        { id: 'a', label: 'Bare ved å presse hardere', isCorrect: false, feedback: 'Strukturell endring.' },
{ id: 'b', label: 'Iterative utvikling, MVP, kontinuerlig levering, mindre planlegging på forhånd', isCorrect: true, feedback: 'Riktig! Bytter perfekt plan med rask læring.' },
{ id: 'c', label: 'Lavere kvalitet', isCorrect: false, feedback: 'Ofte motsatt — kvalitet bygges inn.' },
{ id: 'd', label: 'Bare for software', isCorrect: false, feedback: 'Brukes nå overalt.' },
      ],
      espenTip: 'Spotify deployer kode 1000+ ganger per dag. Tradisjonell software: månedlige releases.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🌍',
            title: 'Apple iPhone-økosystemet',
            quote: 'Ekosystem som strategi.',
            content: 'Apple iPhone selger godt — men det virkelige forretningsbygget er økosystemet rundt: App Store, iCloud, Apple Music, AppleCare, Apple Pay. Hver iPhone-bruker genererer abonnementsinntekter i mange år. Strategisk porteføljebygging — produktet er bare første kontaktpunkt.',
            subpoints: [
                  { label: 'ØKOSYSTEM-STRATEGI', text: 'Produktet er døråpner; tjenester er forretning.' },
          { label: 'LOCK-IN', text: 'Hver tjeneste binder kunden tettere til økosystemet.' },
            ],
            practical: 'Hvilke andre økosystemer kjenner du? Google? Microsoft? Amazon? Hva binder deg?',
            exercises: [
            {
      id: 'ml208-10-1',
      icon: '🌍',
      title: 'Hva er strategien',
      question: 'Hva er Apples virkelige strategi?',
      choices: [
        { id: 'a', label: 'Selge mest mulig telefoner', isCorrect: false, feedback: 'Det er taktikk.' },
{ id: 'b', label: 'Bygge økosystem som binder kunden — telefon er døråpner, tjenester er pengemaskinen', isCorrect: true, feedback: 'Riktig! Strategisk skifte over 10+ år.' },
{ id: 'c', label: 'Bli størst', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'd', label: 'Bare design', isCorrect: false, feedback: 'Sekundært.' },
      ],
      espenTip: 'Apple Services genererer nå mer enn iPhone-salg i marginer. Strategisk transformasjon.',
    },
    {
      id: 'ml208-10-2',
      icon: '🌍',
      title: 'Lock-in',
      question: 'Hva betyr lock-in?',
      choices: [
        { id: 'a', label: 'Bytte er enkelt', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Bytte er vanskelig pga investeringer i økosystemet', isCorrect: true, feedback: 'Riktig! AirPods + Apple Watch + iPad gjør det dyrt å bytte til Android.' },
{ id: 'c', label: 'Bare juridisk', isCorrect: false, feedback: 'Bredere fenomen.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Familie-deling, foto-bibliotek, abonnementer — alt øker bytte-kostnad.',
    },
    {
      id: 'ml208-10-3',
      icon: '🌍',
      title: 'Lærdom',
      question: 'Hva er strategisk lærdom?',
      choices: [
        { id: 'a', label: 'Selg billigst', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Bygg langsiktig kunderelasjon via flere produkter/tjenester — ikke bare engangssalg', isCorrect: true, feedback: 'Riktig! Customer Lifetime Value-tenkning.' },
{ id: 'c', label: 'Bare i tech', isCorrect: false, feedback: 'Gjelder mange bransjer.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'BMW prøver samme: bil + service + finansiering + abonnement på funksjoner. Økosystem-tankegang sprer seg.',
    },
            ],
          },
        ]

        export default function ProduktstrategiAvansertModule() {
          return (
            <DrawerModule
              moduleCode="ML2-08"
              moduleTitle="Produktstrategi (avansert)"
              moduleIcon="📦"
              storageKey="learning-ml2-produktstrategi-avansert"
              completeRoute="/learning/ml2/produktstrategi-avansert/complete"
              phases={phases}
              intro="Strategisk produktledelse på VG3-nivå: PLC, BCG-matrise, sortiment, innovasjon, ettermarked. Produktledelse er kunsten å bygge en lønnsom portefølje over tid."
              vissteduAt="Apple investerer 7-8 % av omsetningen i FoU. Det er rundt 30 milliarder USD årlig. Produktstrategi krever kontinuerlig investering, ikke engangsbeslutninger."
              espenSier="Strategisk produktledelse handler om å holde mange baller i lufta over tid: melkekyr i dag, stjerner for i morgen."
      presentationLink={{ route: '/learning/presentations/ml2/produktstrategi-avansert', description: 'Produktstrategi (avansert) — 10 slides' }}
            />
          )
        }
