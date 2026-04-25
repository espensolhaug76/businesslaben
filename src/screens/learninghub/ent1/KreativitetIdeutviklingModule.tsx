        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🎨',
            title: 'Hva er kreativitet?',
            quote: 'Skape noe nytt og nyttig.',
            content: 'Kreativitet er evnen til å skape noe som er både nytt og nyttig i en gitt kontekst. Bare nytt = ubrukelig kunst. Bare nyttig = standardvare. Kreativitet er kombinasjonen — og den kan trenes opp gjennom teknikker og riktig miljø.',
            subpoints: [
                  { label: 'NYTT + NYTTIG', text: 'Begge kreves — bare ett er ikke nok.' },
          { label: 'KAN TRENES', text: 'Ferdighet, ikke medfødt evne.' },
            ],
            practical: 'Hva er det mest kreative du har laget? Hva gjorde det kreativt — nytt? Nyttig? Begge?',
            exercises: [
            {
      id: 'ent102-1-1',
      icon: '🎨',
      title: 'Definisjon',
      question: 'Hva er kreativitet?',
      choices: [
        { id: 'a', label: 'Bare kunst', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Skape noe som er både nytt og nyttig i kontekst', isCorrect: true, feedback: 'Riktig! Praktisk definisjon.' },
{ id: 'c', label: 'Bare for kunstnere', isCorrect: false, feedback: 'Bredt fenomen.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Definisjonen er fra forskning. \'Nyttig\' tilfører praktisk verdi.',
    },
    {
      id: 'ent102-1-2',
      icon: '🎨',
      title: 'Trening',
      question: 'Kan kreativitet trenes?',
      choices: [
        { id: 'a', label: 'Nei', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — gjennom teknikker, eksponering for ideer, riktig miljø', isCorrect: true, feedback: 'Riktig! Forskningsbasert.' },
{ id: 'c', label: 'Bare for unge', isCorrect: false, feedback: 'Hele livet.' },
{ id: 'd', label: 'Bare for kunstnere', isCorrect: false, feedback: 'Alle kan.' },
      ],
      espenTip: 'Mange tror kreativitet er medfødt. Forskningen viser tydelig at det kan utvikles.',
    },
    {
      id: 'ent102-1-3',
      icon: '🎨',
      title: 'Bare nytt',
      question: 'Hva er bare \'nytt\' uten \'nyttig\'?',
      choices: [
        { id: 'a', label: 'Genialt', isCorrect: false, feedback: 'For optimistisk.' },
{ id: 'b', label: 'Ofte ubrukelig — kunst som ingen vil ha eller forstå', isCorrect: true, feedback: 'Riktig! Praktisk verdi mangler.' },
{ id: 'c', label: 'Alltid bra', isCorrect: false, feedback: 'Ikke nødvendigvis.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Test: hvem har nytte av ideen din? Hvis ingen — er det kanskje kunst, ikke entreprenørskap.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🔄',
            title: 'Kreative prosesser',
            quote: '4 faser: forberedelse → inkubasjon → illuminasjon → verifikasjon.',
            content: 'Kreative prosesser har 4 faser: 1) Forberedelse (samle materiale), 2) Inkubasjon (la underbevisstheten jobbe), 3) Illuminasjon (aha-opplevelsen), 4) Verifikasjon (test og videreutvikle). Mange tror kreativitet bare er punkt 3 — men de andre er like viktige.',
            subpoints: [
                  { label: '4 FASER', text: 'Bevisst struktur, ikke bare \'aha-øyeblikk\'.' },
          { label: 'INKUBASJON', text: 'La underbevisstheten jobbe — ofte undervurdert.' },
            ],
            practical: 'Har du opplevd \'aha-opplevelser\'? Hva gjorde du før de kom?',
            exercises: [
            {
      id: 'ent102-2-1',
      icon: '🔄',
      title: 'Faser',
      question: 'Hva er de 4 fasene?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Forberedelse, inkubasjon, illuminasjon, verifikasjon', isCorrect: true, feedback: 'Riktig! Klassisk kreativ prosess.' },
{ id: 'c', label: 'Plan, gjennomføring, evaluering', isCorrect: false, feedback: 'For generell.' },
{ id: 'd', label: 'Bare aha-øyeblikket', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Wallas modell fra 1926. Fortsatt aktuell beskrivelse av kreative prosesser.',
    },
    {
      id: 'ent102-2-2',
      icon: '🔄',
      title: 'Inkubasjon',
      question: 'Hva er inkubasjon?',
      choices: [
        { id: 'a', label: 'Bare hvile', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'La underbevisstheten jobbe med problemet — gå tur, dusj, sove', isCorrect: true, feedback: 'Riktig! Hjernen jobber selv om bevisstheten er andre steder.' },
{ id: 'c', label: 'Bare lese', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange aha-øyeblikk kommer i dusjen, på tur, eller om natten. Hjernen kobler ideer i hvile.',
    },
    {
      id: 'ent102-2-3',
      icon: '🔄',
      title: 'Verifikasjon',
      question: 'Hvorfor er verifikasjon viktig?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk steg.' },
{ id: 'b', label: 'Test om idéen faktisk fungerer — mange aha-ideer er flopp i praksis', isCorrect: true, feedback: 'Riktig! Praktisk validering.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Mange \'genialitet\' viser seg å være urealistisk når man tester. Verifikasjon sparer ressurser.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '⚡',
            title: 'Brainstorming',
            quote: 'Idémyldring — regler er viktige.',
            content: 'Klassisk idémyldring (brainstorming) har tre regler: 1) Ingen kritikk under ide-fasen, 2) Kvantitet foran kvalitet, 3) Bygg videre på andres ideer. Klassisk i grupper, men også effektiv individuelt — sett en timer på 15 minutter og skriv ned alt.',
            subpoints: [
                  { label: '3 REGLER', text: 'Ingen kritikk, kvantitet, bygge videre.' },
          { label: 'FORSKJELL', text: 'Brainstorm + senere kritisk vurdering — ikke samtidig.' },
            ],
            practical: 'Test brainstorming på en utfordring du har. 15 min, ingen kritikk, kvantitet.',
            exercises: [
            {
      id: 'ent102-3-1',
      icon: '⚡',
      title: 'Regler',
      question: 'Hva er klassiske brainstorm-regler?',
      choices: [
        { id: 'a', label: 'Bare evaluer', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ingen kritikk, kvantitet > kvalitet, bygg videre', isCorrect: true, feedback: 'Riktig! Tre kjerneregler.' },
{ id: 'c', label: 'Bare individuelt', isCorrect: false, feedback: 'Begge fungerer.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Reglene utviklet av Alex Osborn på 1950-tallet. Fortsatt grunnleggende.',
    },
    {
      id: 'ent102-3-2',
      icon: '⚡',
      title: 'Kritikk',
      question: 'Hvorfor ingen kritikk?',
      choices: [
        { id: 'a', label: 'For å være snill', isCorrect: false, feedback: 'Strategisk grunn.' },
{ id: 'b', label: 'Kritikk dreper kreativitet — folk slutter å foreslå', isCorrect: true, feedback: 'Riktig! Trygghet er forutsetning for kreativitet.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Senere kommer kritisk fase — der vurderes ideene. Men ikke under generering.',
    },
    {
      id: 'ent102-3-3',
      icon: '⚡',
      title: 'Kvantitet',
      question: 'Hvorfor kvantitet > kvalitet?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'De fleste \'gode ideer\' kommer etter de 50 første dårlige', isCorrect: true, feedback: 'Riktig! Volum er forutsetning for kvalitet.' },
{ id: 'c', label: 'Pynt', isCorrect: false, feedback: 'Praktisk regel.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Mål: 100+ ideer på 30 min. Kvalitet kommer naturlig av kvantitet.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎯',
            title: 'SCAMPER-metoden',
            quote: 'Strukturert kreativitet.',
            content: 'SCAMPER er sjekkliste for å transformere eksisterende ideer: Substitute (bytte ut), Combine (kombinere), Adapt (tilpasse), Modify (modifisere), Put to another use (annet bruk), Eliminate (fjerne), Reverse (snu). En time med SCAMPER gir ofte 50+ varianter.',
            subpoints: [
                  { label: 'SJEKKLISTE', text: '7 transformasjoner av eksisterende ide.' },
          { label: 'STRUKTURERT', text: 'Tvinger frem ulike perspektiver.' },
            ],
            practical: 'Velg et hverdags-produkt. Bruk SCAMPER på det — hva kan endres?',
            exercises: [
            {
      id: 'ent102-4-1',
      icon: '🎯',
      title: 'Hva',
      question: 'Hva betyr SCAMPER?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Akronym.' },
{ id: 'b', label: 'Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse', isCorrect: true, feedback: 'Riktig! 7 transformasjons-typer.' },
{ id: 'c', label: 'Bare 3 typer', isCorrect: false, feedback: 'For få.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Bob Eberle utviklet SCAMPER på 1970-tallet. Fortsatt mye brukt.',
    },
    {
      id: 'ent102-4-2',
      icon: '🎯',
      title: 'Bruk',
      question: 'Hvordan brukes SCAMPER?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Som sjekkliste — gå gjennom hver bokstav for ditt produkt/tjeneste', isCorrect: true, feedback: 'Riktig! Tvinger frem nye perspektiver.' },
{ id: 'c', label: 'Bare i tek', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Bare for kunst', isCorrect: false, feedback: 'Praktisk verktøy.' },
      ],
      espenTip: 'Eksempel for kafé: S-bytte ut bønner med te-blader? C-kombinere kafé med bokhandel? E-fjerne sukker?',
    },
    {
      id: 'ent102-4-3',
      icon: '🎯',
      title: 'Verdi',
      question: 'Hva gir SCAMPER?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Tvinger frem 50+ ide-varianter på en time', isCorrect: true, feedback: 'Riktig! Volum-effekt.' },
{ id: 'c', label: 'Bare 1 idé', isCorrect: false, feedback: 'For lite.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Strukturerte teknikker dobler ide-volum vs ustrukturert brainstorming. Forskningsstøttet.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '👥',
            title: 'Design Thinking',
            quote: 'Brukersentrert metode.',
            content: 'Design Thinking er brukersentrert metode i 5 faser: empati (forstå brukeren), definere (klart problem), idéutvikling, prototype, testing. Brukt av Apple, IDEO og Stanford d.school. Tester alltid med ekte brukere før investering. Iterativ — gå gjennom syklusen flere ganger.',
            subpoints: [
                  { label: 'BRUKERSENTRERT', text: 'Empati for brukeren er steg 1.' },
          { label: 'ITERATIV', text: 'Test, lær, forbedre — gjenta.' },
            ],
            practical: 'Hvilke produkter har du sett som tydelig er designet \'for brukeren\' vs \'for ingeniøren\'?',
            exercises: [
            {
      id: 'ent102-5-1',
      icon: '👥',
      title: '5 faser',
      question: 'Hva er fasene i Design Thinking?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Empati, definere, idéutvikling, prototype, testing', isCorrect: true, feedback: 'Riktig! 5 iterative steg.' },
{ id: 'c', label: 'Bare 2 steg', isCorrect: false, feedback: 'For få.' },
{ id: 'd', label: 'Plan, gjennomføring, evaluering', isCorrect: false, feedback: 'For generell.' },
      ],
      espenTip: 'Stanford d.school har popularisert metoden. Brukt globalt nå.',
    },
    {
      id: 'ent102-5-2',
      icon: '👥',
      title: 'Empati',
      question: 'Hvorfor empati som steg 1?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Forstå brukerens reelle behov før du prøver å løse — ofte feil problem ellers', isCorrect: true, feedback: 'Riktig! Klassisk feil: løse feil problem.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'IDEO bruker observasjon i brukerens hverdag — ikke bare intervjuer. Skjuler ofte virkelige behov.',
    },
    {
      id: 'ent102-5-3',
      icon: '👥',
      title: 'Iterativ',
      question: 'Hva betyr iterativ?',
      choices: [
        { id: 'a', label: 'Bare en gang', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Gå gjennom syklusen flere ganger — lære og forbedre', isCorrect: true, feedback: 'Riktig! Prosess, ikke event.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Første prototype er sjelden riktig. Iterasjoner forbedrer dramatisk over tid.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🔬',
            title: 'Fra idé til mulighet',
            quote: 'Vurdere realisme.',
            content: 'Vurder om ideen løser et faktisk problem for en betalingsvillig målgruppe. Tre spørsmål: 1) Er problemet reelt? 2) Er målgruppen stor nok? 3) Er de villige til å betale? Hvis ett svar er nei, går du tilbake til tegnebrettet. Mange ideer dør på \'betalingsvilje\'-spørsmålet.',
            subpoints: [
                  { label: '3 SPØRSMÅL', text: 'Reelt problem? Stor målgruppe? Betalingsvilje?' },
          { label: 'BETALINGSVILJE', text: 'Ofte vanskeligst å validere.' },
            ],
            practical: 'Test en ide du har: er problemet reelt? Stort nok marked? Vil folk betale?',
            exercises: [
            {
      id: 'ent102-6-1',
      icon: '🔬',
      title: '3 spørsmål',
      question: 'Hva må valideres?',
      choices: [
        { id: 'a', label: 'Bare ide', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Reelt problem + stor målgruppe + betalingsvilje', isCorrect: true, feedback: 'Riktig! Tre kritiske kriterier.' },
{ id: 'c', label: 'Bare betalingsvilje', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange ideer feiler på ett av disse. Validering før investering sparer ressurser.',
    },
    {
      id: 'ent102-6-2',
      icon: '🔬',
      title: 'Vanskeligst',
      question: 'Hvilket spørsmål er ofte vanskeligst?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Betalingsvilje — folk sier ofte \'ja, jeg ville kjøpt\' uten å gjøre det', isCorrect: true, feedback: 'Riktig! Sier-gjør-gap er reelt.' },
{ id: 'c', label: 'Bare ide', isCorrect: false, feedback: 'Lett å vurdere.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Test betalingsvilje før investering: be folk forhåndsbestille, kickstarter, etc.',
    },
    {
      id: 'ent102-6-3',
      icon: '🔬',
      title: 'Når si nei',
      question: 'Når bør du droppe ideen?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Strategi-feil.' },
{ id: 'b', label: 'Hvis ett av de 3 kriteriene er nei', isCorrect: true, feedback: 'Riktig! Disiplinert kriterieanvendelse.' },
{ id: 'c', label: 'Bare hvis penger mangler', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange gründere er forelsket i ideen sin. Disiplinert kriteriebruk redder fra dårlige investeringer.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🚧',
            title: 'Kreativitetens fiender',
            quote: 'Frykt, rutine, tidlig evaluering.',
            content: 'Kreativitetens fiender: 1) Frykt for å \'drite seg ut\' (selvkritikk), 2) Rutine-tenkning (\'slik gjør vi det her\'), 3) For tidlig evaluering (\'det vil aldri funke\'). Sterke kulturer i bedrifter kan kvele kreativitet i fødselen. Trygghet er forutsetning for kreativitet.',
            subpoints: [
                  { label: '3 FIENDER', text: 'Frykt, rutine, tidlig evaluering.' },
          { label: 'KULTUR-EFFEKT', text: 'Sterk kultur kan kvele kreativitet.' },
            ],
            practical: 'Hvilke \'kreativitetsfiender\' har du selv opplevd? På skolen? På jobb?',
            exercises: [
            {
      id: 'ent102-7-1',
      icon: '🚧',
      title: 'Fiender',
      question: 'Hva er klassiske fiender?',
      choices: [
        { id: 'a', label: 'Bare penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Frykt, rutine-tenkning, for tidlig evaluering', isCorrect: true, feedback: 'Riktig! 3 hovedhindre.' },
{ id: 'c', label: 'Bare tid', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Edward de Bono identifiserte disse på 1970-tallet. Fortsatt aktuelle.',
    },
    {
      id: 'ent102-7-2',
      icon: '🚧',
      title: 'Frykt',
      question: 'Hvordan reduserer frykt kreativitet?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Folk holder ideer for seg selv pga frykt for å bli latterliggjort', isCorrect: true, feedback: 'Riktig! Trygghet er forutsetning.' },
{ id: 'c', label: 'Bare for unge', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Google\'s \'psychological safety\'-forskning viser dette tydelig. Trygge team innoverer mer.',
    },
    {
      id: 'ent102-7-3',
      icon: '🚧',
      title: 'Tidlig evaluering',
      question: 'Hvorfor er det fiende?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Stopper ideer før de er fullstendige — kritikk drepper kreativitet', isCorrect: true, feedback: 'Riktig! Skill mellom generering og evaluering.' },
{ id: 'c', label: 'Pynt', isCorrect: false, feedback: 'Praktisk regel.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Brainstorm-regelen \'ingen kritikk\' adresserer dette. La ideen vokse før du dømmer.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🛠️',
            title: 'Prototype',
            quote: 'Enkel modell for å teste.',
            content: 'En prototype er en enkel modell av produktet for å teste funksjon og få tilbakemelding tidlig. Trenger ikke være perfekt — papirskisser, Lego-modeller eller PowerPoint-mockup gir mer læring per krone enn ferdige prototyper. \'Failed fast\' med billige prototyper.',
            subpoints: [
                  { label: 'ENKLE', text: 'Trenger ikke være perfekt — bare nok til å teste.' },
          { label: 'BILLIG = LÆRING', text: 'Mer læring per krone enn ferdige prototyper.' },
            ],
            practical: 'Hvilken prototype kunne du laget på 1 time for en ide du har?',
            exercises: [
            {
      id: 'ent102-8-1',
      icon: '🛠️',
      title: 'Definisjon',
      question: 'Hva er en prototype?',
      choices: [
        { id: 'a', label: 'Bare ferdig produkt', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Enkel modell for å teste funksjon og få tilbakemelding', isCorrect: true, feedback: 'Riktig! Lærings-verktøy.' },
{ id: 'c', label: 'Bare for tek', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk verktøy.' },
      ],
      espenTip: 'Airbnb-grunnleggerne lagde første versjon med papir og luftmadrasser. Klassisk minimum viable product.',
    },
    {
      id: 'ent102-8-2',
      icon: '🛠️',
      title: 'Hvor enkel',
      question: 'Hvor enkel kan en prototype være?',
      choices: [
        { id: 'a', label: 'Bare ferdig produkt', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Papirskisser, Lego, PowerPoint — så enkelt som mulig', isCorrect: true, feedback: 'Riktig! Enkelt = raskt = billig læring.' },
{ id: 'c', label: 'Bare 3D-print', isCorrect: false, feedback: 'Sjelden nødvendig.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Airbnb startet med papp og fotos. Enkel prototype, stor læring.',
    },
    {
      id: 'ent102-8-3',
      icon: '🛠️',
      title: 'Hvorfor billig',
      question: 'Hvorfor enkle prototyper?',
      choices: [
        { id: 'a', label: 'Spare penger', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'b', label: 'Mer læring per krone — kan teste flere varianter, lære raskt', isCorrect: true, feedback: 'Riktig! Iterativ læring.' },
{ id: 'c', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verdi.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Lean Startup-prinsipp: minst mulig prototype som tester hovedhypotesen. Spar resten.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '✈️',
            title: 'Airbnb sin kreative reise',
            quote: 'Stor idé født av lite problem.',
            content: 'Brian Chesky og Joe Gebbia kunne ikke betale husleia i 2007. De blåste opp luftmadrasser og leide ut til konferansegjester. Det enkle prototypen ble til Airbnb — verdt 100+ milliarder dollar i dag. Stor idé født av lite problem og enkel prototype. Klassisk eksempel.',
            subpoints: [
                  { label: 'ENKLE START', text: 'Stor virksomhet kan starte ekstremt enkelt.' },
          { label: 'REELLE PROBLEM', text: 'De løste eget problem først.' },
            ],
            practical: 'Hva er ditt \'lille problem\' du kunne løst og som andre også har?',
            exercises: [
            {
      id: 'ent102-9-1',
      icon: '✈️',
      title: 'Hva',
      question: 'Hvordan startet Airbnb?',
      choices: [
        { id: 'a', label: 'Stort venture-fond', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Stiftere kunne ikke betale husleia, leide ut luftmadrasser til konferansegjester', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare i SF', isCorrect: false, feedback: 'Globalt nå.' },
      ],
      espenTip: 'Airbnb-historien er studie-objekt på Harvard Business School. Liten start, global skala.',
    },
    {
      id: 'ent102-9-2',
      icon: '✈️',
      title: 'Lærdom',
      question: 'Hva er lærdommen?',
      choices: [
        { id: 'a', label: 'Bare flaks', isCorrect: false, feedback: 'Strukturelle elementer.' },
{ id: 'b', label: 'Stor idé kan starte ekstremt enkelt — fra eget problem', isCorrect: true, feedback: 'Riktig! Demokratiserer entreprenørskap.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt mønster.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'Dropbox, Slack, Pinterest — alle startet som løsning på grunder-problemer. Bygget bedrifter på det.',
    },
    {
      id: 'ent102-9-3',
      icon: '✈️',
      title: 'Skalering',
      question: 'Hvordan ble Airbnb stor?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert vekst.' },
{ id: 'b', label: 'Validerte tidlig + bygde plattform + globaliserte gradvis', isCorrect: true, feedback: 'Riktig! Iterativ vekst.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Tok 5 år før Airbnb ble lønnsom. Tålmodig kapital + grit + iterasjon.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎓',
            title: 'Kreativitet kan trenes',
            quote: 'Demokratisert evne.',
            content: 'Alle kan trene opp sin kreativitet gjennom teknikker og riktig miljø. Det er ingen \'kreativ gen\' — det er øvelse, eksponering for mange ideer, og en kultur som tør å feile. Innfør strukturert kreativitet i hverdagen: SCAMPER, Design Thinking, brainstorming.',
            subpoints: [
                  { label: 'DEMOKRATISERT', text: 'Alle kan trene seg opp.' },
          { label: 'ØVELSE', text: 'Trening + miljø + eksponering for ideer.' },
            ],
            practical: 'Hva er ett konkret tiltak du kan starte med for å bli mer kreativ?',
            exercises: [
            {
      id: 'ent102-10-1',
      icon: '🎓',
      title: 'Trening',
      question: 'Kan kreativitet trenes?',
      choices: [
        { id: 'a', label: 'Nei', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — gjennom teknikker og bevisst praksis', isCorrect: true, feedback: 'Riktig! Forskningsbasert.' },
{ id: 'c', label: 'Bare for kunstnere', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare for unge', isCorrect: false, feedback: 'Hele livet.' },
      ],
      espenTip: 'Mange tror kreativitet er medfødt. Forskningen viser tydelig at det kan utvikles.',
    },
    {
      id: 'ent102-10-2',
      icon: '🎓',
      title: 'Hvordan',
      question: 'Hva kreves?',
      choices: [
        { id: 'a', label: 'Bare flaks', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Teknikker (SCAMPER, brainstorming) + eksponering for nye ideer + trygt miljø', isCorrect: true, feedback: 'Riktig! Multi-faktor.' },
{ id: 'c', label: 'Bare lese', isCorrect: false, feedback: 'For passivt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Praksis: 30 min daglig brainstorm. Sett timer. Bygg ferdighet gradvis.',
    },
    {
      id: 'ent102-10-3',
      icon: '🎓',
      title: 'Lærdom',
      question: 'Hva er hovedlærdommen?',
      choices: [
        { id: 'a', label: 'Bare noen kan', isCorrect: false, feedback: 'For pessimistisk.' },
{ id: 'b', label: 'Alle kan bli mer kreative — det er ferdighet, ikke gave', isCorrect: true, feedback: 'Riktig! Demokratiserer kreativitet.' },
{ id: 'c', label: 'Bare for tek', isCorrect: false, feedback: 'Bredt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Skoler og bedrifter underviser kreativitet som ferdighet. Tidligere forbeholdt \'kunstnere\'.',
    },
            ],
          },
        ]

        export default function KreativitetIdeutviklingModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-02"
              moduleTitle="Kreativitet og idéutvikling"
              moduleIcon="🎨"
              storageKey="learning-ent1-kreativitet-ideutvikling"
              completeRoute="/learning/ent1/kreativitet-ideutvikling/complete"
              phases={phases}
              intro="Kunsten å tenke nytt — teknikker som hjelper deg fra hvit ark til konkret forretningsidé. Kreativitet kan trenes gjennom riktig metode og miljø."
              vissteduAt="Forskning viser at kreativitet ikke er en medfødt gave — det er en ferdighet som kan trenes. Strukturerte teknikker som SCAMPER og Design Thinking dobler ide-volum og kvalitet."
              espenSier="Kreativitet uten metode er bare flaks. Med metode blir det forutsigbar produktiv prosess."
      presentationLink={{ route: '/learning/presentations/ent1/kreativitet-ideutvikling', description: 'Kreativitet og idéutvikling — 10 slides' }}
            />
          )
        }
