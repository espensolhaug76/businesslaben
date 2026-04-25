        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🎨',
            title: 'Guerilla Marketing',
            quote: 'Kreativ markedsføring med lavt budsjett.',
            content: 'Skape oppmerksomhet uten dyre annonser. Stunts, gateteater, viral video, uvanlige plasseringer. Kahoot ble kjent ved å gi det gratis til lærere — som så solgte det videre til skolene sine. Kreativitet over budsjett.',
            subpoints: [
                  { label: 'KREATIVITET', text: 'Slår budsjett ofte i tidlig fase.' },
          { label: 'VIRAL POTENSIAL', text: 'Gode ideer sprer seg gratis.' },
            ],
            practical: 'Hvilke kreative markedsføringsstunt du har sett? Hvorfor virket de?',
            exercises: [
            {
      id: 'ent108-1-1',
      icon: '🎨',
      title: 'Hva',
      question: 'Hva er guerilla marketing?',
      choices: [
        { id: 'a', label: 'Bare aggressiv reklame', isCorrect: false, feedback: 'Kreativ tilnærming.' },
{ id: 'b', label: 'Kreativ, lavbudsjett — skape oppmerksomhet uten dyre annonser', isCorrect: true, feedback: 'Riktig! Strategisk valg.' },
{ id: 'c', label: 'Krigsmetafor', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'd', label: 'Bare militære kanaler', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Begrepet kommer fra geriljakrig — bruke kreativitet og overraskelse mot overlegne motstandere.',
    },
    {
      id: 'ent108-1-2',
      icon: '🎨',
      title: 'Eksempel',
      question: 'Kahoot-eksempel?',
      choices: [
        { id: 'a', label: 'Bare betalt reklame', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Gratis til lærere — som spredte det viralt til skolene sine', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Norsk eksempel.' },
      ],
      espenTip: 'Kahoot ble milliardselskap dels gjennom denne lavbudsjett-strategien. Validering + viral spredning.',
    },
    {
      id: 'ent108-1-3',
      icon: '🎨',
      title: 'Når',
      question: 'Når passer guerilla?',
      choices: [
        { id: 'a', label: 'Bare for store', isCorrect: false, feedback: 'Tvert imot — for små.' },
{ id: 'b', label: 'Tidlig fase med lite kapital og mye tid', isCorrect: true, feedback: 'Riktig! Match til situasjon.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Når du har $0 marketing-budsjett men tid og kreativitet, er guerilla overlegen.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📱',
            title: 'Sosiale medier for gründere',
            quote: 'Bygge fellesskap og dialog.',
            content: 'Bygge fellesskap og dialog med kundene gjennom TikTok, Instagram, LinkedIn. Velg én eller to plattformer der målgruppen er, ikke prøv å være overalt. Konsistens er viktigere enn frekvens. Vipps har vokst eksplosivt på TikTok.',
            subpoints: [
                  { label: 'VELG ÉN', text: 'Bedre å være sterk på én plattform enn svak på alle.' },
          { label: 'KONSISTENS', text: 'Regelmessig poster slår sporadiske bursts.' },
            ],
            practical: 'Hvilken plattform passer ideen din best? Hvorfor?',
            exercises: [
            {
      id: 'ent108-2-1',
      icon: '📱',
      title: 'Strategi',
      question: 'Hva er beste strategi?',
      choices: [
        { id: 'a', label: 'Være på alle', isCorrect: false, feedback: 'For mye for én person.' },
{ id: 'b', label: 'Velge én eller to plattformer der målgruppen er', isCorrect: true, feedback: 'Riktig! Fokus over spredning.' },
{ id: 'c', label: 'Bare på Facebook', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Bedre å være sterk på TikTok enn middels på 5 plattformer. Fokus.',
    },
    {
      id: 'ent108-2-2',
      icon: '📱',
      title: 'Plattformer',
      question: 'Hvilken målgruppe?',
      choices: [
        { id: 'a', label: 'TikTok bare gamle', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'TikTok 15-25, Instagram 20-40, Facebook 30+, LinkedIn B2B', isCorrect: true, feedback: 'Riktig! Match til målgruppe.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
      ],
      espenTip: 'Sjekk hvor målgruppen din er. Ikke gå dit fordi det er trendy — gå dit fordi de er der.',
    },
    {
      id: 'ent108-2-3',
      icon: '📱',
      title: 'Vipps',
      question: 'Hva gjorde Vipps?',
      choices: [
        { id: 'a', label: 'Bare TV-reklame', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Viral innhold på TikTok og Instagram — humoristisk, lokal', isCorrect: true, feedback: 'Riktig! Vipps er case-studie.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'd', label: 'Aldri sosiale medier', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Vipps\' sosial-strategi: humor, norsk, rask respons. Bygde merkevare som \'norsk og folkelig\'.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📚',
            title: 'Innholdsmarkedsføring',
            quote: 'Del kunnskap som er nyttig.',
            content: 'Del kunnskap som er nyttig for kunden for å bygge tillit. Gründer-blogger, video-tutorials, gratis e-bøker. \'Hjelp, ikke selg\' — over tid blir du den foretrukne eksperten. DnB sin Magma er klassisk eksempel — gir bort kunnskap, vinner kunder.',
            subpoints: [
                  { label: 'VERDI FØRST', text: 'Gi gratis verdi før du ber om noe.' },
          { label: 'AUTORITET', text: 'Bli ekspert i nisjen — kunder følger.' },
            ],
            practical: 'Hva er du ekspert på? Hvordan kunne du delt kunnskap?',
            exercises: [
            {
      id: 'ent108-3-1',
      icon: '📚',
      title: 'Prinsipp',
      question: 'Hva er kjernen?',
      choices: [
        { id: 'a', label: 'Bare selge', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Hjelp først, salg kommer naturlig', isCorrect: true, feedback: 'Riktig! Tillitsbygging.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Hubspot bygde milliardselskap på å gi bort markedsføring-guider gratis. Standard nå.',
    },
    {
      id: 'ent108-3-2',
      icon: '📚',
      title: 'Frekvens',
      question: 'Hvor ofte publisere?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Minst ukentlig — konsistens er nøkkelen', isCorrect: true, feedback: 'Riktig! Bygger momentum.' },
{ id: 'c', label: 'Bare en gang', isCorrect: false, feedback: 'For lite.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Sporadisk innhold mister momentum. Velg én kanal og publiser konsistent der.',
    },
    {
      id: 'ent108-3-3',
      icon: '📚',
      title: 'Norsk eksempel',
      question: 'Hvilken norsk?',
      choices: [
        { id: 'a', label: 'REMA 1000', isCorrect: false, feedback: 'Reklame-fokusert.' },
{ id: 'b', label: 'DnB Magma — bygger DnB som ekspert via verdifullt innhold', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare amerikanske', isCorrect: false, feedback: 'Norske gjør det også.' },
      ],
      espenTip: 'Andre: Equinor sin Energi-podkast, Schibsted sine guider, Nordnet sin investorblogg.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🤝',
            title: 'Personlig salg',
            quote: 'Banking on doors.',
            content: 'Den viktigste kanalen for nystartede. \'Banking on doors\' — direkte kontakt med potensielle kunder. Hver salgssamtale gir læring om hva som virker. Outsource ikke salget — som gründer må DU selge selv først. Klarna brukte 3 år på direkte salg før de skalerte.',
            subpoints: [
                  { label: 'BANKING ON DOORS', text: 'Direkte kontakt slår alle kanaler tidlig.' },
          { label: 'LÆRING', text: 'Hver samtale lærer om kunden.' },
            ],
            practical: 'Hvor mange potensielle kunder har du snakket direkte med om ideen din?',
            exercises: [
            {
      id: 'ent108-4-1',
      icon: '🤝',
      title: 'Hvorfor',
      question: 'Hvorfor må gründer selge selv?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Lærer mest om markedet — ingen andre kan i tidlig fase', isCorrect: true, feedback: 'Riktig! Kunnskap er kritisk.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Universal sannhet.' },
      ],
      espenTip: 'Steve Blank: \'Get out of the building.\' Gründer må snakke med kunder direkte.',
    },
    {
      id: 'ent108-4-2',
      icon: '🤝',
      title: 'Klarna',
      question: 'Hva gjorde Klarna?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: '3 år direkte salg til nettbutikker før skalering', isCorrect: true, feedback: 'Riktig! Disiplinert oppstart.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare via venner', isCorrect: false, feedback: 'Profesjonelt salg.' },
      ],
      espenTip: 'Klarna er nå milliardselskap. Tidlig disiplinert salg bygde fundamentet.',
    },
    {
      id: 'ent108-4-3',
      icon: '🤝',
      title: 'Antall',
      question: 'Hvor mange samtaler?',
      choices: [
        { id: 'a', label: '1-2', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: 'Mange — sett mål av samtaler/uke', isCorrect: true, feedback: 'Riktig! Strukturert tilnærming.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare hvis billig', isCorrect: false, feedback: 'Investering verdt det.' },
      ],
      espenTip: 'Beste gründere: 5+ kundesamtaler per uke i tidlig fase. Bygger forståelse og pipeline.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '👥',
            title: 'Referansemarkedsføring',
            quote: 'Bruke fornøyde kunder.',
            content: 'Bruk fornøyde kunder for å skaffe nye (Word of Mouth). Anbefalingen fra en venn er kraftigere enn alle annonser sammen. Be aktivt om henvisninger — de fleste fornøyde kunder anbefaler ikke uten å bli spurt. Klassisk undervurdert kanal.',
            subpoints: [
                  { label: 'WOM', text: 'Sterkeste markedsføringsform — gratis.' },
          { label: 'AKTIV BE', text: 'Spør — folk anbefaler ikke uten oppfordring.' },
            ],
            practical: 'Hvordan ville du oppfordret kunder til å henvise andre?',
            exercises: [
            {
      id: 'ent108-5-1',
      icon: '👥',
      title: 'Verdi',
      question: 'Hvor verdifull er WOM?',
      choices: [
        { id: 'a', label: 'Lite', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Sterkeste markedsføringsform — anbefaling fra venn slår all reklame', isCorrect: true, feedback: 'Riktig! Forskningsbasert.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert effekt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Nielsen-forskning: 92 % stoler på anbefaling fra venner. 33 % på reklame. Stor forskjell.',
    },
    {
      id: 'ent108-5-2',
      icon: '👥',
      title: 'Be aktivt',
      question: 'Hvorfor be om henvisninger?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'De fleste fornøyde kunder anbefaler ikke uten å bli spurt', isCorrect: true, feedback: 'Riktig! Aktivt steg.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Test: ble du spurt om å anbefale sist du var fornøyd? Sjelden — det er taps-mulighet.',
    },
    {
      id: 'ent108-5-3',
      icon: '👥',
      title: 'Insentiver',
      question: 'Bør man gi insentiver?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Kan virke.' },
{ id: 'b', label: 'Av og til — Dropbox vokste eksplosivt med \'gi 500 MB, få 500 MB\'', isCorrect: true, feedback: 'Riktig! Klassisk vekst-trick.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig.' },
      ],
      espenTip: 'Refer-a-friend programmer kan akselerere vekst dramatisk. Krever produkt verd å anbefale.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🌐',
            title: 'Nettverksbygging',
            quote: 'Bruke eksisterende kontakter.',
            content: 'Bruk eksisterende kontakter og delta på gründer-treff (StartupLab, MESH, Innovasjon Norge events). Mange forretningsmuligheter starter ved en samtale ved kaffemaskinen — ikke en LinkedIn-melding. Bygg nettverk før du trenger det.',
            subpoints: [
                  { label: 'EKSISTERENDE KONTAKTER', text: 'Begynn der du allerede er kjent.' },
          { label: 'FYSISK SLÅR DIGITAL', text: 'Ekte møter bygger sterkere relasjoner.' },
            ],
            practical: 'Hvilke nettverk har du allerede? Hvem kunne hjulpet deg?',
            exercises: [
            {
      id: 'ent108-6-1',
      icon: '🌐',
      title: 'Hvor starte',
      question: 'Hvor starte nettverksbygging?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Eksisterende kontakter først — venner, kolleger, alumni', isCorrect: true, feedback: 'Riktig! Lavest barriere.' },
{ id: 'c', label: 'Bare LinkedIn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare gjennom annonser', isCorrect: false, feedback: 'For passivt.' },
      ],
      espenTip: 'De fleste forretningsmuligheter kommer fra \'andre-grads\' kontakter — venners venner.',
    },
    {
      id: 'ent108-6-2',
      icon: '🌐',
      title: 'Norske miljøer',
      question: 'Hvor møte gründere?',
      choices: [
        { id: 'a', label: 'Bare på nett', isCorrect: false, feedback: 'Fysisk er bedre.' },
{ id: 'b', label: 'StartupLab Oslo, MESH, Innovasjon Norge events, lokale meetups', isCorrect: true, feedback: 'Riktig! Aktivt miljø.' },
{ id: 'c', label: 'Bare i utlandet', isCorrect: false, feedback: 'Norge har sterke miljøer.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'StartupLab er Norges største startup-hub. Mange suksesser har kommet derfra.',
    },
    {
      id: 'ent108-6-3',
      icon: '🌐',
      title: 'Timing',
      question: 'Når bygge nettverk?',
      choices: [
        { id: 'a', label: 'Bare når man trenger', isCorrect: false, feedback: 'For sent.' },
{ id: 'b', label: 'Bygg nettverk før du trenger det — relasjoner tar tid', isCorrect: true, feedback: 'Riktig! Proaktiv.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare etter suksess', isCorrect: false, feedback: 'For sent.' },
      ],
      espenTip: 'Karateka: \'Plant trees before you need shade.\' Nettverk er trærne.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🔍',
            title: 'Digital synlighet (SEO)',
            quote: 'Bli funnet på Google.',
            content: 'Sørge for at folk finner deg når de søker etter problemet du løser. Google Søkekonsoll, Google Analytics — gratis verktøy som forteller hva folk faktisk søker etter. Skriv innhold som svarer på de spørsmålene. SEO tar 6-12 måneder å virke, men holder lenge.',
            subpoints: [
                  { label: 'INTENSJON', text: 'SEO fanger folk som faktisk søker etter løsning.' },
          { label: 'LANG SIKT', text: 'Tar tid, men holder lenge.' },
            ],
            practical: 'Hva ville folk søkt på Google for å finne din bedrift?',
            exercises: [
            {
      id: 'ent108-7-1',
      icon: '🔍',
      title: 'SEO-tid',
      question: 'Hvor lang tid tar SEO?',
      choices: [
        { id: 'a', label: '1 dag', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: '6-12 måneder for å se reell trafikk', isCorrect: true, feedback: 'Riktig! Lang sikt.' },
{ id: 'c', label: '10 år', isCorrect: false, feedback: 'For langt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'SEO er investering, ikke kortsiktig. Men holder lenge når du er etablert.',
    },
    {
      id: 'ent108-7-2',
      icon: '🔍',
      title: 'Verktøy',
      question: 'Gratis verktøy?',
      choices: [
        { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Mange finnes.' },
{ id: 'b', label: 'Google Search Console, Google Analytics, Google Trends', isCorrect: true, feedback: 'Riktig! Alle gratis.' },
{ id: 'c', label: 'Bare betalte', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Google gir bort enorm verdi gratis. Bruk verktøyene aktivt.',
    },
    {
      id: 'ent108-7-3',
      icon: '🔍',
      title: 'Strategi',
      question: 'Hva er beste startstrategi?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Skriv innhold som svarer på spørsmål målgruppen din søker etter', isCorrect: true, feedback: 'Riktig! Match intensjon.' },
{ id: 'c', label: 'Bare logo-design', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Sjekk søkevolum med Google Keyword Planner. Skriv innhold for de spørsmålene.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🎯',
            title: 'Salgstrakt',
            quote: 'Oppmerksomhet → interesse → vurdering → kjøp.',
            content: 'Kundereise gjennom 4 stadier. Mål antall personer i hver fase. Hvis 1000 ser annonsen, 100 klikker, 10 ber om demo, 1 kjøper — er konvertering 0,1 %. Tall som dette gjør markedsføringen styrbar. Fokus optimalisering på flaskehalser.',
            subpoints: [
                  { label: '4 STADIER', text: 'Oppmerksomhet, interesse, vurdering, kjøp.' },
          { label: 'FLASKEHALS', text: 'Optimaliser der folk faller fra.' },
            ],
            practical: 'Tegn salgstrakten for en bedrift du kjenner. Hvor er flaskehalsene?',
            exercises: [
            {
      id: 'ent108-8-1',
      icon: '🎯',
      title: 'Stadier',
      question: '4 stadier?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Oppmerksomhet, interesse, vurdering, kjøp (AIDA-lignende)', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
{ id: 'c', label: 'Bare kjøp', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Trakt-metaforen: bredt på toppen, smalt på bunnen. Mange begynner, få kjøper.',
    },
    {
      id: 'ent108-8-2',
      icon: '🎯',
      title: 'Måle',
      question: 'Hvorfor måle hver fase?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Identifisere flaskehalser — hvor folk faller fra', isCorrect: true, feedback: 'Riktig! Optimaliseringspoeng.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare estetikk', isCorrect: false, feedback: 'Strategisk verdi.' },
      ],
      espenTip: 'Hvis 90 % faller fra mellom interesse og vurdering, vet du hvor du må fikse.',
    },
    {
      id: 'ent108-8-3',
      icon: '🎯',
      title: 'Konvertering',
      question: '1000 → 100 → 10 → 1. Hva er konvertering?',
      choices: [
        { id: 'a', label: '10 %', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: '0,1 % fra topp til bunn', isCorrect: true, feedback: 'Riktig! 1/1000.' },
{ id: 'c', label: '1 %', isCorrect: false, feedback: 'Feil.' },
      ],
      espenTip: 'Lav konvertering er normalt på topp av trakt. Optimaliser hvert stadium for å øke total.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '👤',
            title: 'Eierne som markedsførere',
            quote: 'Beste salgsteam i starten.',
            content: 'I starten er eierne de viktigste markedsførerne og selgerne. Ingen kjenner produktet bedre, ingen har sterkere insentiv. Outsourcing kommer senere — først må gründerne lære markedet selv. Brian Chesky (Airbnb) sov hos kunder for å lære.',
            subpoints: [
                  { label: 'KUNNSKAP', text: 'Gründer kjenner produktet best.' },
          { label: 'INSENTIV', text: 'Gründer har sterkest motivasjon for suksess.' },
            ],
            practical: 'Når kan gründer overlate marketing til andre?',
            exercises: [
            {
      id: 'ent108-9-1',
      icon: '👤',
      title: 'Hvorfor',
      question: 'Hvorfor må gründer markedsføre selv?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Beste produktkunnskap + sterkest insentiv + lærer markedet', isCorrect: true, feedback: 'Riktig! Multi-fordel.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare i krise', isCorrect: false, feedback: 'Konstant tidlig.' },
      ],
      espenTip: 'Gründer-til-kunde-kontakt er undervurdert. Bygger forståelse og relasjoner.',
    },
    {
      id: 'ent108-9-2',
      icon: '👤',
      title: 'Outsource',
      question: 'Når outsource?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Senere er det riktig.' },
{ id: 'b', label: 'Når du har systematisert prosessen og kan trene andre', isCorrect: true, feedback: 'Riktig! Systemer først.' },
{ id: 'c', label: 'Bare når dyrt', isCorrect: false, feedback: 'Strategisk vurdering.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Du kan ikke outsource det du ikke selv mestrer. Lær først, deleger så.',
    },
    {
      id: 'ent108-9-3',
      icon: '👤',
      title: 'Brian Chesky',
      question: 'Hva gjorde Airbnb-grunnlegger?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'Mer dramatisk.' },
{ id: 'b', label: 'Sov hos kunder, fotograferte leiligheter selv — for å lære', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Bare nettsted', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Y Combinators \'Do things that don\'t scale\'. Manuelt arbeid i tidlig fase bygger fundament.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🚀',
            title: 'Startups marketing-prinsipper',
            quote: 'Lavbudsjett-kreativitet vinner.',
            content: 'Lavbudsjett-kreativitet slår dyrt og kjedelig. Som ny gründer har du tiden, hjernen og motivasjonen — bruk dem. Test mye, lær raskt, dobbel ned på det som virker. Glem reklamebyråer i tidlig fase. Du er den beste markedsføreren bedriften har.',
            subpoints: [
                  { label: 'KREATIVITET > BUDSJETT', text: 'Tid og hjerne er gratis ressurser.' },
          { label: 'TEST + LÆR', text: 'Iterativ tilnærming til markedsføring.' },
            ],
            practical: 'Hva er den viktigste lærdommen om marketing for nystartede?',
            exercises: [
            {
      id: 'ent108-10-1',
      icon: '🚀',
      title: 'Prinsipp',
      question: 'Hovedprinsipp?',
      choices: [
        { id: 'a', label: 'Bare betalt reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Kreativitet + iterasjon + læring slår budsjett', isCorrect: true, feedback: 'Riktig! Strategisk fokus.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare ide', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Best gründere kombinerer kreativitet med disiplinert måling. Lærer raskt hva som virker.',
    },
    {
      id: 'ent108-10-2',
      icon: '🚀',
      title: 'Reklamebyrå',
      question: 'Når trenge byrå?',
      choices: [
        { id: 'a', label: 'Fra dag 1', isCorrect: false, feedback: 'For tidlig.' },
{ id: 'b', label: 'Når du har systematisert hva som virker — byråer skalerer, ikke oppdager', isCorrect: true, feedback: 'Riktig! Riktig fase.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Senere er det riktig.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
      ],
      espenTip: 'Byråer er gode til å skalere kjente formater. Mindre gode til å oppdage hva som virker for ditt nye produkt.',
    },
    {
      id: 'ent108-10-3',
      icon: '🚀',
      title: 'Lærdom',
      question: 'Beste lærdommen?',
      choices: [
        { id: 'a', label: 'Bare bruk penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Du er den beste marketer-bedriften har — i tidlig fase', isCorrect: true, feedback: 'Riktig! Selv-tro.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Mange gründere undervurderer egen marketing-evne. Test selv, lær selv, vinn selv.',
    },
            ],
          },
        ]

        export default function MarkedsforingSalgNystartedeModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-08"
              moduleTitle="Markedsføring og salg for nystartede"
              moduleIcon="📢"
              storageKey="learning-ent1-markedsforing-salg-nystartede"
              completeRoute="/learning/ent1/markedsforing-salg-nystartede/complete"
              phases={phases}
              intro="Nå ut til de første kundene når merkevaren er ukjent og budsjettet lite. Guerilla marketing, sosiale medier, personlig salg og referanser er gull for nystartede."
              vissteduAt="I starten er eierne de viktigste markedsførerne og selgerne. Ingen kjenner produktet bedre, ingen har sterkere insentiv. Outsourcing kommer senere."
              espenSier="Lavbudsjett-kreativitet slår dyrt og kjedelig. Som ny gründer har du tiden, hjernen og motivasjonen — bruk dem."
      presentationLink={{ route: '/learning/presentations/ent1/markedsforing-salg-nystartede', description: 'Markedsføring og salg for nystartede — 10 slides' }}
            />
          )
        }
