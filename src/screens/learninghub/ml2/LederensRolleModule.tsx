        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🤝',
            title: 'Ledelse vs administrasjon',
            quote: 'Endring vs opprettholde.',
            content: 'Ledelse skaper endring (visjon, motivasjon, retning). Administrasjon opprettholder eksisterende systemer (planer, regler, budsjett). Begge er nødvendige. Mange lederstillinger har 70 % administrasjon og 30 % ledelse — men det er de 30 % som skiller god leder fra god administrator.',
            subpoints: [
                  { label: 'LEDELSE', text: 'Endring, visjon, motivasjon, retning.' },
          { label: 'ADMINISTRASJON', text: 'Opprettholde, planlegge, budsjettere, kontrollere.' },
            ],
            practical: 'Tenk på en sjef du har hatt. Var hun mest leder eller administrator? Hvilke av delene var sterkest?',
            exercises: [
            {
      id: 'ml204-1-1',
      icon: '🤝',
      title: 'Forskjell',
      question: 'Hva er hovedforskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Ledelse skaper endring; administrasjon opprettholder', isCorrect: true, feedback: 'Riktig! Begge nødvendige, men distinkte funksjoner.' },
{ id: 'c', label: 'Ledelse er for store bedrifter', isCorrect: false, feedback: 'Begge brukes i alle størrelser.' },
{ id: 'd', label: 'Administrasjon er for offentlig sektor', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'John Kotter: \'Management is about coping with complexity. Leadership is about coping with change.\' Klar definisjon.',
    },
    {
      id: 'ml204-1-2',
      icon: '🤝',
      title: 'Balansen',
      question: 'Hva er typisk fordeling for en mellomleder?',
      choices: [
        { id: 'a', label: '100 % ledelse', isCorrect: false, feedback: 'Urealistisk.' },
{ id: 'b', label: '50/50', isCorrect: false, feedback: 'Sjelden — varierer med rolle.' },
{ id: 'c', label: 'Mange jobber er 70 % administrasjon, 30 % ledelse — men de 30 % skiller god leder fra god administrator', isCorrect: true, feedback: 'Riktig! Realistisk fordeling. Skill mellom oppgaver bevisst.' },
{ id: 'd', label: '100 % administrasjon', isCorrect: false, feedback: 'Da er det administrator-stilling.' },
      ],
      espenTip: 'Spør: hvor mye av tiden bruker jeg på endring/visjon vs. rapportering/møter? Det avgjør om du er leder.',
    },
    {
      id: 'ml204-1-3',
      icon: '🤝',
      title: 'Test',
      question: 'Hvordan teste om du er leder?',
      choices: [
        { id: 'a', label: 'Stillingstittel', isCorrect: false, feedback: 'Tittel sier ingenting om handling.' },
{ id: 'b', label: 'Følger folk deg frivillig — selv uten formell makt?', isCorrect: true, feedback: 'Riktig! Lederskap måles i påvirkning, ikke posisjon. Hvis folk følger deg uten at de må, er du leder.' },
{ id: 'c', label: 'Lønnsnivå', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Antall ansatte', isCorrect: false, feedback: 'Ikke definerende.' },
      ],
      espenTip: 'Sjekk: når du foreslår noe i et møte, lytter folk? Det er den ekte testen.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🎭',
            title: 'Mintzbergs lederroller',
            quote: '10 roller i 3 kategorier.',
            content: 'Henry Mintzberg identifiserte 10 lederroller: Interpersonale (galionsfigur, leder, kontaktperson), Informasjon (overvåker, sender, talsperson), Beslutning (entreprenør, problemløser, ressursfordeler, forhandler). Lederen veksler mellom rollene gjennom dagen — ofte ubevisst.',
            subpoints: [
                  { label: '3 KATEGORIER', text: 'Interpersonal, informasjon, beslutning.' },
          { label: '10 ROLLER', text: 'Lederen veksler mellom dem etter situasjon.' },
            ],
            practical: 'Hvilke av Mintzbergs roller har du sett en sjef gjøre i løpet av en uke?',
            exercises: [
            {
      id: 'ml204-2-1',
      icon: '🎭',
      title: 'Antall roller',
      question: 'Hvor mange lederroller identifiserte Mintzberg?',
      choices: [
        { id: 'a', label: '5', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '10', isCorrect: true, feedback: 'Riktig! Klassisk modell fra 1970-tallet, fortsatt aktuelt.' },
{ id: 'c', label: '20', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: '3', isCorrect: false, feedback: 'Det er kategoriene.' },
      ],
      espenTip: 'Modellen er deskriptiv, ikke preskriptiv. Beskriver hva ledere faktisk gjør, ikke hva de bør gjøre.',
    },
    {
      id: 'ml204-2-2',
      icon: '🎭',
      title: 'Kategorier',
      question: 'Hva er de 3 kategoriene?',
      choices: [
        { id: 'a', label: 'Strategi, taktikk, operativt', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'b', label: 'Interpersonale, informasjon, beslutning', isCorrect: true, feedback: 'Riktig! Tre dimensjoner av lederarbeid.' },
{ id: 'c', label: 'Lønn, bonus, karriere', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Pris, produkt, plass', isCorrect: false, feedback: 'Det er markedsmiks.' },
      ],
      espenTip: 'Interpersonale: hvordan lederen relaterer til folk. Informasjon: håndtering av data. Beslutning: valg under usikkerhet.',
    },
    {
      id: 'ml204-2-3',
      icon: '🎭',
      title: 'Bruk i praksis',
      question: 'Hvordan brukes modellen praktisk?',
      choices: [
        { id: 'a', label: 'Som sjekkliste på roller man faktisk fyller', isCorrect: true, feedback: 'Riktig! Bevisstgjøre fordelingen. Mange undervurderer hvor mye tid som går til informasjonsrolle.' },
{ id: 'b', label: 'Som lønnsmodell', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'c', label: 'Bare for konsulenter', isCorrect: false, feedback: 'Bredere bruk.' },
{ id: 'd', label: 'Erstatte stillingsbeskrivelser', isCorrect: false, feedback: 'Komplementært verktøy.' },
      ],
      espenTip: 'Loggfør én uke: hvilke roller fyller du? Avslører gap mellom intensjon og praksis.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📚',
            title: 'Fayols funksjoner',
            quote: '5 klassiske lederfunksjoner.',
            content: 'Henri Fayol (1916) identifiserte 5 lederfunksjoner: Planlegge, Organisere, Lede, Samordne, Kontrollere. Modellen er over 100 år gammel — fortsatt fundament i ledelseslitteratur. Hver funksjon krever ulike ferdigheter.',
            subpoints: [
                  { label: '5 FUNKSJONER', text: 'Planlegge, organisere, lede, samordne, kontrollere.' },
          { label: '100+ ÅR GAMMEL', text: 'Fortsatt fundament — endringene er i nyanser, ikke struktur.' },
            ],
            practical: 'Hvilke av Fayols 5 funksjoner gjør en lærer på en skole? Alle 5?',
            exercises: [
            {
      id: 'ml204-3-1',
      icon: '📚',
      title: 'Antall',
      question: 'Hvor mange funksjoner identifiserte Fayol?',
      choices: [
        { id: 'a', label: '3', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '5', isCorrect: true, feedback: 'Riktig! Planlegge, organisere, lede, samordne, kontrollere.' },
{ id: 'c', label: '7', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: '10', isCorrect: false, feedback: 'Det er Mintzbergs roller.' },
      ],
      espenTip: 'Fayol var ingeniør i fransk gruveselskap — utviklet modellen fra praktisk erfaring. Holder seg fortsatt.',
    },
    {
      id: 'ml204-3-2',
      icon: '📚',
      title: 'Eksempel',
      question: 'Hva inkluderer \'kontrollere\'?',
      choices: [
        { id: 'a', label: 'Diktere alt', isCorrect: false, feedback: 'For autoritært.' },
{ id: 'b', label: 'Måle mot mål, identifisere avvik, justere', isCorrect: true, feedback: 'Riktig! Kontrollere = oppfølging, ikke micromanagement.' },
{ id: 'c', label: 'Spionere på ansatte', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'd', label: 'Ferie-godkjenninger', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Kontrollere = closing the loop. Måler du mot mål, kan du justere. Uten måling er ledelse blind.',
    },
    {
      id: 'ml204-3-3',
      icon: '📚',
      title: 'Aktualitet',
      question: 'Er Fayols modell fortsatt relevant?',
      choices: [
        { id: 'a', label: 'Nei, helt foreldet', isCorrect: false, feedback: 'Tvert imot — fortsatt fundament.' },
{ id: 'b', label: 'Ja, fortsatt relevant — endringene er i nyanser, ikke struktur', isCorrect: true, feedback: 'Riktig! Funksjonene har samme essens i 1916 som i 2024. Bare verktøyene er nye.' },
{ id: 'c', label: 'Bare for offentlig sektor', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Bare for små bedrifter', isCorrect: false, feedback: 'Skala-uavhengig.' },
      ],
      espenTip: 'Det som har endret seg: hvordan vi planlegger (digitale verktøy), hvordan vi leder (flatere kultur). Funksjonene er like.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎚️',
            title: 'Lederstiler',
            quote: 'Fra autoritær til delegerende.',
            content: 'Klassiske lederstiler: Autoritær (sjefen bestemmer alene), Demokratisk (felles beslutning), Delegerende (ansatte bestemmer selv). Ingen er \'best\' — riktig stil avhenger av situasjon. Krise = autoritær. Kreativt arbeid = demokratisk. Erfaren team = delegerende. Beste ledere veksler.',
            subpoints: [
                  { label: 'INGEN ER BEST', text: 'Effekt avhenger av situasjon, oppgave og medarbeider.' },
          { label: 'VEKSLE', text: 'Beste ledere bytter stil basert på kontekst — ikke etter komfort.' },
            ],
            practical: 'Hvilken lederstil har du selv? Når funker den, når funker den ikke?',
            exercises: [
            {
      id: 'ml204-4-1',
      icon: '🎚️',
      title: '3 stiler',
      question: 'Hva er de 3 klassiske stilene?',
      choices: [
        { id: 'a', label: 'Autoritær, demokratisk, delegerende', isCorrect: true, feedback: 'Riktig! Klassisk Lewin-modell. Variasjoner finnes.' },
{ id: 'b', label: 'Hard, myk, mellomtøff', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'c', label: 'Kreativ, analytisk, sosial', isCorrect: false, feedback: 'Det er personlighetstyper.' },
{ id: 'd', label: 'Inntern, ekstern, blandet', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Kurt Lewin gjorde de første eksperimentene på lederstiler i 1939. Modellen er klassisk.',
    },
    {
      id: 'ml204-4-2',
      icon: '🎚️',
      title: 'Krise',
      question: 'Hvilken stil i akutt krise?',
      choices: [
        { id: 'a', label: 'Demokratisk', isCorrect: false, feedback: 'For tregt.' },
{ id: 'b', label: 'Autoritær — rask beslutning, klar kommando', isCorrect: true, feedback: 'Riktig! Kriser krever rask handling. Konsensus i krise gir lammet organisasjon.' },
{ id: 'c', label: 'Delegerende', isCorrect: false, feedback: 'For passivt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Krise krever struktur.' },
      ],
      espenTip: 'Tenk pandemi-respons. Statsministerens autoritære stil i mars 2020 var nødvendig — selv i konsensus-Norge.',
    },
    {
      id: 'ml204-4-3',
      icon: '🎚️',
      title: 'Kreativitet',
      question: 'Hvilken stil for kreativt prosjekt?',
      choices: [
        { id: 'a', label: 'Autoritær', isCorrect: false, feedback: 'Kveler kreativitet.' },
{ id: 'b', label: 'Demokratisk eller delegerende — gir rom for innspill og initiativ', isCorrect: true, feedback: 'Riktig! Kreativitet trenger psykologisk trygghet. Autoritær kveler.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Skadelig for prosess.' },
{ id: 'd', label: 'Veksle hver dag', isCorrect: false, feedback: 'Skaper forvirring.' },
      ],
      espenTip: 'Pixars suksess: ledere skaper ramme, lar kreatører fylle innholdet. Delegerende stil med tydelige mål.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🎯',
            title: 'Situasjonsbestemt ledelse',
            quote: 'Tilpass etter medarbeider.',
            content: 'Hersey og Blanchards modell: tilpass lederstil etter medarbeiderens kompetanse OG motivasjon. Ny + motivert = instruere. Erfaren + motivert = delegere. Erfaren + umotivert = støtte. Ny + umotivert = veilede tett. Fire stiler matched til fire medarbeider-tilstander.',
            subpoints: [
                  { label: '4 STILER', text: 'Instruere, veilede, støtte, delegere.' },
          { label: 'KOMPETANSE × MOTIVASJON', text: 'Begge dimensjoner avgjør hvilken stil som passer.' },
            ],
            practical: 'Tenk på en venn / ansatt du har — hva er deres kompetanse og motivasjon nivå? Hvilken stil passer?',
            exercises: [
            {
      id: 'ml204-5-1',
      icon: '🎯',
      title: 'To dimensjoner',
      question: 'Hva er de 2 hoveddimensjonene?',
      choices: [
        { id: 'a', label: 'Lønn og bonus', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'b', label: 'Kompetanse og motivasjon', isCorrect: true, feedback: 'Riktig! Disse to bestemmer hvilken stil som er optimal.' },
{ id: 'c', label: 'Alder og erfaring', isCorrect: false, feedback: 'Bare delvis riktig.' },
{ id: 'd', label: 'Kjønn og personlighet', isCorrect: false, feedback: 'Helt urelevant for modellen.' },
      ],
      espenTip: 'Spør per medarbeider: kan hun? Vil hun? Svarene styrer stilvalget.',
    },
    {
      id: 'ml204-5-2',
      icon: '🎯',
      title: 'Ny + motivert',
      question: 'Ny ansatt, høy motivasjon — hvilken stil?',
      choices: [
        { id: 'a', label: 'Delegere — la henne finne ut selv', isCorrect: false, feedback: 'Risikabelt — mangler kompetanse.' },
{ id: 'b', label: 'Instruere — gi tydelig opplæring', isCorrect: true, feedback: 'Riktig! Hun vil, men kan ikke ennå. Trenger struktur og opplæring.' },
{ id: 'c', label: 'Ignorere', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Saksøke', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Klassisk feil: kaste motiverte nye ansatte ut i dypen \'fordi de er ivrige\'. Resultat: feil og frustrasjon.',
    },
    {
      id: 'ml204-5-3',
      icon: '🎯',
      title: 'Erfaren + motivert',
      question: 'Erfaren, høy motivasjon — hvilken stil?',
      choices: [
        { id: 'a', label: 'Instruere', isCorrect: false, feedback: 'Frustrerer henne — hun kan jo.' },
{ id: 'b', label: 'Delegere — gi henne ansvar og frihet', isCorrect: true, feedback: 'Riktig! Hun kan og vil. Maksimer hennes potensial via autonomi.' },
{ id: 'c', label: 'Mikromanagere', isCorrect: false, feedback: 'Verste alternativ — kveler motivasjon.' },
{ id: 'd', label: 'Tett oppfølging', isCorrect: false, feedback: 'Unødvendig — hun klarer selv.' },
      ],
      espenTip: 'Erfarne folk slutter når de mikromanages. Gi dem rom — de leverer mer.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🗣️',
            title: 'Intern kommunikasjon',
            quote: 'Lederen som budbringer.',
            content: 'Lederen er primær kanal for visjon, strategi og endring. Hvis ledelsen ikke kan forklare strategien på 30 sekunder, vil ingen lenger ned i organisasjonen huske den. Forskning viser at folk må høre samme budskap 7+ ganger før det fester seg. Repetisjon er ikke svakhet — det er nødvendig.',
            subpoints: [
                  { label: 'KLARHET KREVES', text: 'Hvis du ikke kan forklare strategien kort, har du ikke klar strategi.' },
          { label: 'REPETISJON', text: 'Folk må høre samme budskap 7+ ganger. Ikke vær redd for å gjenta.' },
            ],
            practical: 'Hva er strategien til bedriften du jobber for / kjenner? Kan du forklare den på 30 sekunder?',
            exercises: [
            {
      id: 'ml204-6-1',
      icon: '🗣️',
      title: 'Strategi-test',
      question: 'Hva er beste test for klar strategi?',
      choices: [
        { id: 'a', label: '100-siders dokument', isCorrect: false, feedback: 'Lengde er motsatt indikator.' },
{ id: 'b', label: 'Kan forklares på 30 sekunder', isCorrect: true, feedback: 'Riktig! Kort = klar. Lang = uklar.' },
{ id: 'c', label: 'Bare ledelsen forstår', isCorrect: false, feedback: 'Da er den ikke implementerbar.' },
{ id: 'd', label: 'Skrevet på engelsk', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Test: spør tilfeldig ansatt om bedriftens strategi. Hvis svaret varierer, er kommunikasjonen svak.',
    },
    {
      id: 'ml204-6-2',
      icon: '🗣️',
      title: 'Repetisjon',
      question: 'Hvor mange ganger må folk høre budskap?',
      choices: [
        { id: 'a', label: '1 gang', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '7+ ganger før det fester seg', isCorrect: true, feedback: 'Riktig! Klassisk forskning. Repetisjon er ikke kjedelig — det er nødvendig.' },
{ id: 'c', label: '100 ganger', isCorrect: false, feedback: 'Overdrevet.' },
{ id: 'd', label: 'Bare 2', isCorrect: false, feedback: 'For få for varig forankring.' },
      ],
      espenTip: 'Politikere vet dette. Samme tale gjentas i 6 måneder før den fester seg. Ledere må gjøre det samme.',
    },
    {
      id: 'ml204-6-3',
      icon: '🗣️',
      title: 'Hvor',
      question: 'Hvor bør strategien kommuniseres?',
      choices: [
        { id: 'a', label: 'Kun toppledermøter', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Alle nivåer — fra toppmøte til kantine, gjennom flere kanaler', isCorrect: true, feedback: 'Riktig! Multi-kanal, multi-nivå. Repetisjon i ulike formater fester budskapet.' },
{ id: 'c', label: 'Bare i e-post', isCorrect: false, feedback: 'For ensformig.' },
{ id: 'd', label: 'Aldri', isCorrect: false, feedback: 'Da blir den ikke fulgt.' },
      ],
      espenTip: 'All-hands møter, avdelingsmøter, 1:1, e-post, intranett, kantine-snakk. Alle kanaler.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '⚖️',
            title: 'Beslutningsprosesser',
            quote: 'Hvordan ta gode valg under usikkerhet.',
            content: 'Beslutninger varierer fra rasjonelle (analyse, faktagrunnlag) til intuitive (magefølelse, mønsterklare). Erfaring gjør intuisjon mer pålitelig. Beste praksis: rasjonell analyse for store/strategiske valg, intuitiv for hverdagsbeslutninger. RACI-modell hjelper å definere hvem som bestemmer hva.',
            subpoints: [
                  { label: 'RASJONELL vs INTUITIV', text: 'Begge har sin plass. Riktig stil per beslutningstype.' },
          { label: 'RACI', text: 'Responsible, Accountable, Consulted, Informed. Klargjør beslutningsmyndighet.' },
            ],
            practical: 'Tenk på en stor beslutning du har tatt. Var den primært rasjonell eller intuitiv? Var det riktig stil?',
            exercises: [
            {
      id: 'ml204-7-1',
      icon: '⚖️',
      title: 'Når rasjonell',
      question: 'Når brukes rasjonell beslutning best?',
      choices: [
        { id: 'a', label: 'Hver dag', isCorrect: false, feedback: 'For tidskrevende for små valg.' },
{ id: 'b', label: 'Store, strategiske valg med tid og data tilgjengelig', isCorrect: true, feedback: 'Riktig! Når innsatsen er høy og tid finnes, er rasjonell analyse verdifull.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare i krise', isCorrect: false, feedback: 'I krise har du sjelden tid.' },
      ],
      espenTip: 'Investeringsbeslutninger > 1 mill kr: alltid rasjonell analyse. Mindre beslutninger: intuisjon kan holde.',
    },
    {
      id: 'ml204-7-2',
      icon: '⚖️',
      title: 'Erfaring',
      question: 'Hva gjør intuisjon mer pålitelig?',
      choices: [
        { id: 'a', label: 'Alder', isCorrect: false, feedback: 'Ikke direkte.' },
{ id: 'b', label: 'Erfaring — mønstergjenkjenning bygd over år', isCorrect: true, feedback: 'Riktig! Erfarne ledere har \'sett dette før\' — intuisjon er internalisert kunnskap.' },
{ id: 'c', label: 'Personlighet', isCorrect: false, feedback: 'Mindre relevant.' },
{ id: 'd', label: 'Bare flaks', isCorrect: false, feedback: 'Helt feil — bygges over tid.' },
      ],
      espenTip: 'Brannmenn tar beslutninger på sekunder basert på intuisjon. Det er erfaring komprimert.',
    },
    {
      id: 'ml204-7-3',
      icon: '⚖️',
      title: 'RACI',
      question: 'Hva betyr RACI?',
      choices: [
        { id: 'a', label: 'Tilfeldige bokstaver', isCorrect: false, feedback: 'Strukturert modell.' },
{ id: 'b', label: 'Responsible, Accountable, Consulted, Informed', isCorrect: true, feedback: 'Riktig! Klassisk verktøy for å klargjøre beslutningsmyndighet i komplekse prosjekter.' },
{ id: 'c', label: 'Recover, Analyze, Create, Improve', isCorrect: false, feedback: 'Helt feil definisjon.' },
{ id: 'd', label: 'En type lønnsstruktur', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Hver oppgave: én R, én A, flere C, mange I. Tvinger frem klarhet.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '💎',
            title: 'Emosjonell intelligens (EQ)',
            quote: 'Viktigere enn IQ for ledelse.',
            content: 'Daniel Goleman: 5 komponenter — selvbevissthet, selvkontroll, motivasjon, empati, sosiale ferdigheter. Forskning viser at EQ er viktigere enn IQ for lederprestasjon. Ledere uten EQ blir teknisk dyktige, men skaper toxic kultur. EQ kan trenes — er ikke statisk.',
            subpoints: [
                  { label: '5 KOMPONENTER', text: 'Selvbevissthet, selvkontroll, motivasjon, empati, sosiale ferdigheter.' },
          { label: 'EQ > IQ', text: 'For ledelse, ikke for teknisk fagarbeid.' },
            ],
            practical: 'Hvilke av Golemans 5 EQ-komponenter er din sterkeste? Hvilken bør du trene mest?',
            exercises: [
            {
      id: 'ml204-8-1',
      icon: '💎',
      title: 'Antall komponenter',
      question: 'Hvor mange?',
      choices: [
        { id: 'a', label: '3', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '5', isCorrect: true, feedback: 'Riktig! Selvbevissthet, selvkontroll, motivasjon, empati, sosiale ferdigheter.' },
{ id: 'c', label: '10', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: 'Bare empati', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Goleman publiserte \'Emotional Intelligence\' i 1995. Boken endret moderne ledelseslitteratur.',
    },
    {
      id: 'ml204-8-2',
      icon: '💎',
      title: 'EQ vs IQ',
      question: 'Hva er viktigere for ledelse?',
      choices: [
        { id: 'a', label: 'IQ alene', isCorrect: false, feedback: 'Ofte teknisk dyktig, dårlig leder.' },
{ id: 'b', label: 'EQ — emosjonell intelligens — er konsistent rangert som viktigere', isCorrect: true, feedback: 'Riktig! Forskning støtter dette. IQ får deg ansatt; EQ får deg promotert.' },
{ id: 'c', label: 'Like viktig', isCorrect: false, feedback: 'EQ skiller seg ut i ledelse.' },
{ id: 'd', label: 'Ingen forskjell', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Smarte ingeniører som blir ledere uten EQ skaper ofte toxic team. Ferdigheter ≠ ledelse.',
    },
    {
      id: 'ml204-8-3',
      icon: '💎',
      title: 'Trening',
      question: 'Kan EQ trenes?',
      choices: [
        { id: 'a', label: 'Nei — du er født med det', isCorrect: false, feedback: 'Helt feil — kan trenes hele livet.' },
{ id: 'b', label: 'Ja — alle 5 komponentene kan utvikles', isCorrect: true, feedback: 'Riktig! Selvbevissthet er startpunkt. Refleksjon, feedback, coaching hjelper.' },
{ id: 'c', label: 'Bare i ungdom', isCorrect: false, feedback: 'Trene-kapasitet vedvarer.' },
{ id: 'd', label: 'Bare for kvinner', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Begin med selvbevissthet: hvordan reagerer jeg på stress? Hvordan oppfattes jeg? Mest grunnleggende ferdighet å bygge på.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🚀',
            title: 'Endringsledelse',
            quote: 'Lede gjennom endring.',
            content: 'Endring er konstant. John Kotters 8-stegs-modell: 1) Skap nødfølelse, 2) Bygg ledende koalisjon, 3) Visjon, 4) Kommuniser, 5) Fjern hindringer, 6) Feire seire underveis, 7) Forankre, 8) Befest i kultur. 70 % av endringsprogrammer mislykkes — typisk på kommunikasjon og forankring.',
            subpoints: [
                  { label: '8 STEG', text: 'Kotters klassiske modell. Hopper du steg, mislykkes ofte.' },
          { label: '70 % MISLYKKES', text: 'Kommunikasjon og forankring er vanligste svake punkt.' },
            ],
            practical: 'Hvilken stor endring i livet ditt har du opplevd? Var Kotters steg fulgt?',
            exercises: [
            {
      id: 'ml204-9-1',
      icon: '🚀',
      title: 'Antall steg',
      question: 'Hvor mange steg har Kotter?',
      choices: [
        { id: 'a', label: '3', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '8', isCorrect: true, feedback: 'Riktig! Klassisk endringsmodell. Hver steg bygger på forrige.' },
{ id: 'c', label: '12', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: 'Bare 1', isCorrect: false, feedback: 'For lite.' },
      ],
      espenTip: 'Kotter publiserte modellen i 1995 etter studier av 100+ endringsprogrammer. Fortsatt dominerende.',
    },
    {
      id: 'ml204-9-2',
      icon: '🚀',
      title: 'Første steg',
      question: 'Hva er første steg?',
      choices: [
        { id: 'a', label: 'Implementere ny teknologi', isCorrect: false, feedback: 'Senere steg.' },
{ id: 'b', label: 'Skape nødfølelse — vise hvorfor endring er nødvendig', isCorrect: true, feedback: 'Riktig! Uten følt behov motsetter folk endring. Skap forståelse for hvorfor først.' },
{ id: 'c', label: 'Skrive ny strategi', isCorrect: false, feedback: 'Senere.' },
{ id: 'd', label: 'Endre organisasjonskart', isCorrect: false, feedback: 'Senere.' },
      ],
      espenTip: 'Mange ledere starter med strukturendring. Det blir møtt med motstand fordi folk ikke forstår hvorfor.',
    },
    {
      id: 'ml204-9-3',
      icon: '🚀',
      title: 'Hovedsvakhet',
      question: 'Hvor svikter endring oftest?',
      choices: [
        { id: 'a', label: 'For dyrt', isCorrect: false, feedback: 'Sjelden hovedårsak.' },
{ id: 'b', label: 'Dårlig kommunikasjon og manglende forankring', isCorrect: true, feedback: 'Riktig! Mest vanlige svake punkt. Strategi som ikke når ut, blir ikke implementert.' },
{ id: 'c', label: 'For mange møter', isCorrect: false, feedback: 'Symptom.' },
{ id: 'd', label: 'Endring fungerer alltid', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Bruk minst halvparten av endringsbudsjettet på kommunikasjon. Mange bruker 90 % på prosess.',
    },
            ],
          },
        ]

        export default function LederensRolleModule() {
          return (
            <DrawerModule
              moduleCode="ML2-04"
              moduleTitle="Lederens rolle og funksjon"
              moduleIcon="👤"
              storageKey="learning-ml2-lederens-rolle"
              completeRoute="/learning/ml2/lederens-rolle/complete"
              phases={phases}
              intro="Lederens jobb er å få frem det beste i andre — gjøre dem produktive på vei mot felles mål. Skiller seg fra administrasjon (opprettholde) og fagutøvelse (gjøre). God ledelse er broen mellom strategi og resultat."
              vissteduAt="Studier viser at den enkelte leders innflytelse er én av de største faktorene for ansattes engasjement og produktivitet. \'Folk slutter ikke i bedrifter — de slutter i sjefer.\'"
              espenSier="Ledelse er ikke en tittel; det er en handling. Den beste lederen er den som folk ikke merker, men som likevel får ting til å fungere — og som folk vil følge når det stormer."
      presentationLink={{ route: '/learning/presentations/ml2/lederens-rolle', description: 'Lederens rolle og funksjon — 10 slides' }}
            />
          )
        }
