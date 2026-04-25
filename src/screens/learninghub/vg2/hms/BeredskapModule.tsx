import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🚨',
    title: 'Beredskap — Når det utenkelige skjer',
    quote: '«En plan er verdiløs hvis den ikke er øvd på.»',
    content: 'Beredskapsplanen er bedriftens operative manual for krisehåndtering. Den beskriver hvem som gjør hva, i hvilken rekkefølge, og med hvilke ressurser — slik at kaos reduseres til kontroll.',
    subpoints: [
      { label: 'Hvem trenger beredskapsplan?', text: 'Alle bedrifter — men spesielt servicebedrifter som håndterer mange gjester og ansatte.' },
      { label: 'Hva dekkes?', text: 'Brann, ran, strømbrudd, IT-kollaps, medisinsk nødstilfelle, trusler og PLIVO (pågående livstruende vold).' },
      { label: 'Øving er kritisk', text: 'En plan ingen har øvd på er verdiløs under press. Regelmessige øvelser er påkrevd.' },
    ],
    practical: 'Tenk på din nåværende arbeidsplass (eller skole). Hva er beredskapsplanen for brann? For ran? For medisinsk nødstilfelle?',
    exercises: [
      {
        id: 'B1-1',
        icon: '🚨',
        title: 'Beredskapsplanens formål',
        question: 'Hva er det primære formålet med en beredskapsplan?',
        choices: [
          { id: 'a', label: 'Å tilfredsstille krav fra Internkontrollforskriften', isCorrect: false, feedback: 'Det er et krav, men ikke det primære formålet.' },
          { id: 'b', label: 'Å redusere kaos til kontroll ved å definere hvem gjør hva under en krise', isCorrect: true, feedback: 'Riktig! Under en krise tar frykt og adrenalin over. En beredskapsplan som er øvd inn gir kroppen en automatisk respons.' },
          { id: 'c', label: 'Å unngå at bedriften får bøter', isCorrect: false, feedback: 'Bøtevern er en konsekvens, ikke det primære formålet.' },
        ],
        espenTip: 'En beredskapsplan er som å vite nødruten ut av flyet. Du håper aldri å trenge den — men er takknemlig for at du kjenner den.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📋',
    title: 'Beredskapsplanens innhold — Hva skal den inneholde?',
    quote: '«En krise er ikke tid for improvisasjon — men for utføring av det innøvde.»',
    content: 'En komplett beredskapsplan adresserer de scenarier bedriften kan møte med varslingskjeder, rollefordeling og konkrete handlingsinstrukser.',
    subpoints: [
      { label: 'Varslingskjede', text: 'Hvem varsler hvem i hvilken rekkefølge? Interne og eksterne (politi, brannvesen, AMK).' },
      { label: 'Rollefordeling', text: 'Hvem er krisekommunikasjonsansvarlig? Hvem er evakueringsleder? Hvem varsler media?' },
      { label: 'Handlingskort', text: 'Korte, enkle instrukser per scenario: "Ved ran: samarbeid, lyd alarm, ring politiet."' },
      { label: 'Reserveløsninger', text: 'Hva gjør vi uten strøm? Uten internett? Uten kassasystem?' },
    ],
    practical: 'Lag et enkelt handlingskort for "Gjest faller bevisstløs i lobbyen" på et hotell.',
    exercises: [
      {
        id: 'B2-1',
        icon: '📋',
        title: 'Handlingskort',
        question: 'Hva er et "handlingskort" i beredskapsplanen?',
        choices: [
          { id: 'a', label: 'Et visittkort med nødnummere', isCorrect: false, feedback: 'Nødnumre er viktig, men et handlingskort er mer enn det.' },
          { id: 'b', label: 'En kort, konkret instruksliste for hva som gjøres trinn for trinn i et spesifikt scenario', isCorrect: true, feedback: 'Riktig! Et handlingskort gir enkle, nummererte trinn for ett spesifikt scenario — slik at den ansatte kan handle raskt under stress.' },
          { id: 'c', label: 'Bedriftens generelle HMS-håndbok', isCorrect: false, feedback: 'HMS-håndboken er bredt og detaljert. Et handlingskort er kort og spesifikt for ett scenario.' },
        ],
        espenTip: 'Handlingskort: Maks 5–7 enkle trinn. Enkelt nok til at du kan følge det i panikk.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔒',
    title: 'Fysiske sikkerhetstiltak — Materielle barrierer',
    quote: '«Et godt lås er billigst forsikring som finnes.»',
    content: 'Fysiske sikkerhetstiltak er materielle hindringer som gjør det vanskelig å bryte seg inn eller skade bedriften. De er den første barrieren i et lagdelt sikkerhetsystem.',
    subpoints: [
      { label: 'Eksempler', text: 'Solide dører, vinduspanser, låser, kasseboks forankret i vegg, bom ved innkjørsel.' },
      { label: 'Brannsikre konstruksjoner', text: 'Branndører og -vegger bremser spredning og gir evakueringstid.' },
      { label: 'Sperringssoner', text: 'Definerte soner som begrenser ubetjent adgang til sensitive områder.' },
    ],
    practical: 'Gå gjennom inngangen til din skole. Hvilke fysiske sikkerhetstiltak finnes? Hva mangler?',
    exercises: [
      {
        id: 'B3-1',
        icon: '🔒',
        title: 'Fysiske tiltak',
        question: 'Hva karakteriserer et FYSISK sikkerhetstiltak?',
        choices: [
          { id: 'a', label: 'Det bruker teknologi som alarmer og kameraer', isCorrect: false, feedback: 'Det beskriver tekniske tiltak, ikke fysiske.' },
          { id: 'b', label: 'Det er et materielt, håndgripelig hinder som begrenser fysisk tilgang', isCorrect: true, feedback: 'Riktig! Fysiske tiltak er konkrete barrierer: låser, dører, gjerder, kassebokser. De er teknologiuavhengige.' },
          { id: 'c', label: 'Det er regler og prosedyrer for atferd', isCorrect: false, feedback: 'Det beskriver administrative tiltak.' },
        ],
        espenTip: 'De fire tiltakstypene: Fysisk (materiell), Teknisk (elektronikk), Manuell (mennesker), Administrativ (regler).',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📷',
    title: 'Tekniske sikkerhetstiltak — Elektroniske systemer',
    quote: '«Kameraet skremmer. Alarmen varsler. Adgangskontrollen hindrer.»',
    content: 'Tekniske sikkerhetstiltak er elektroniske og digitale systemer som overvåker, varsler og begrenser adgang. De kompletterer fysiske tiltak og gir sanntidsinformasjon.',
    subpoints: [
      { label: 'Tyverisikring', text: 'EAS (Electronic Article Surveillance) — sensorrekker i butikkdører.' },
      { label: 'Kameraovervåking', text: 'CCTV: avskrekkende og bevisdokumenterende. Lagres vanligvis 30 dager.' },
      { label: 'Brannvarslingsanlegg', text: 'Røykdetektorer, sprinkleranlegg, manuelle nødpunkter.' },
      { label: 'Adgangskontroll', text: 'Nøkkelkort, PIN-koder, biometri — begrenser hvem som kan gå hvor.' },
    ],
    practical: 'Hotell Thon i Oslo bruker elektroniske nøkkelkort. Hva er fordelene vs. en vanlig nøkkel?',
    exercises: [
      {
        id: 'B4-1',
        icon: '📷',
        title: 'Tekniske vs. fysiske tiltak',
        question: 'Et kameraovervåkingsanlegg er et eksempel på hvilket sikkerhetstiltak?',
        choices: [
          { id: 'a', label: 'Fysisk tiltak', isCorrect: false, feedback: 'Kamera er elektronisk — det er et teknisk tiltak.' },
          { id: 'b', label: 'Teknisk tiltak — elektronisk system for overvåking', isCorrect: true, feedback: 'Riktig! Kamera er teknologidrevet og elektronisk. Det er et teknisk sikkerhetstiltak.' },
          { id: 'c', label: 'Administrativt tiltak', isCorrect: false, feedback: 'Administrative tiltak er regler og prosedyrer, ikke teknologiske systemer.' },
        ],
        espenTip: 'Tekniske tiltak trenger strøm og vedlikehold. Fysiske tiltak fungerer uten strøm. Begge trengs.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📝',
    title: 'Administrative tiltak — Rutiner og instrukser',
    quote: '«De beste sikkerhetstiltakene er de som aldri trenger å brukes.»',
    content: 'Administrative sikkerhetstiltak er prosedyrer, regler, opplæring og kulturbygging som forebygger sikkerhetshendelser og standardiserer responsen når de likevel skjer.',
    subpoints: [
      { label: 'Ransinstruks', text: 'Konkrete retningslinjer for atferd under et ran — samarbeid, memorer signalement.' },
      { label: 'Adgangsregulering', text: 'Hvem har nøkler? Hvem kan gå til bakrom? Rutiner for å registrere og trekke tilbake adgang.' },
      { label: 'Holdningsskapende arbeid', text: 'Opplæring i å gjenkjenne truende atferd og eskalere korrekt.' },
      { label: 'Turnus og dobbeltbemanning', text: 'Ansatte skal aldri jobbe alene i risikosituasjoner (nattskift, stor kontanthåndtering).' },
    ],
    practical: 'Lag en enkel ransinstruks for en Narvesen-kiosk i 5 korte punkter.',
    exercises: [
      {
        id: 'B5-1',
        icon: '📝',
        title: 'Administrative tiltak',
        question: 'En butikk innfører regel om at to ansatte alltid skal håndtere kontanttellingen i kasserommmet. Hva slags tiltak er dette?',
        choices: [
          { id: 'a', label: 'Teknisk tiltak — fordi det handler om kassen', isCorrect: false, feedback: 'Kassen er teknisk, men regelen om to ansatte er en prosedyre — et administrativt tiltak.' },
          { id: 'b', label: 'Administrativt tiltak — en prosedyre som regulerer atferd', isCorrect: true, feedback: 'Riktig! To-person-regelen er en administrativ prosedyre som forebygger underslag og øker sikkerheten.' },
          { id: 'c', label: 'Manuelt tiltak — vektere', isCorrect: false, feedback: 'Manuelt tiltak innebærer menneskelig vakttjeneste, som vektere. To ansatte er en administrativ regel.' },
        ],
        espenTip: 'Administrative tiltak: Regler, rutiner, opplæring, prosedyrer — papir og kultur, ikke teknologi.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '👮',
    title: 'Manuelle tiltak — Menneskelig tilstedeværelse',
    quote: '«Den synlige vekteren er det beste avskrekkingstiltaket.»',
    content: 'Manuelle sikkerhetstiltak baserer seg på menneskelig tilstedeværelse for å avskrekke, observere og respondere. De er kostbare men effektive.',
    subpoints: [
      { label: 'Vektertjenester', text: 'Securitas og G4S leverer vakthold. Avskrekkende synlighet og rask respons.' },
      { label: 'Inspeksjonsrunder', text: 'Regelmessige patruljer av bygg, parkeringsanlegg og bakrom.' },
      { label: 'Nattevakt', text: 'Hoteller og kjøpesenter med nattevakt reduserer tyverisrisiko dramatisk.' },
      { label: 'Vert og portner', text: 'Resepsjonist med oversikt over inn- og utpasseringer er et manuelt tiltak.' },
    ],
    practical: 'Sammenlign manuelle og tekniske tiltak for et lite reiselivs-selskap. Hva gir best verdi for pengene?',
    exercises: [
      {
        id: 'B6-1',
        icon: '👮',
        title: 'Manuelle tiltak',
        question: 'En kaffebar innfører regelmessige runder av ansatte etter stengetid. Hva slags tiltak er dette?',
        choices: [
          { id: 'a', label: 'Administrativt tiltak — fordi det er en rutine', isCorrect: false, feedback: 'Rutinen som sier "gjennomfør runder" er administrativ. Men selve rundegjennomføringen av en person er et manuelt tiltak.' },
          { id: 'b', label: 'Manuelt tiltak — menneskelig tilstedeværelse for inspeksjon', isCorrect: true, feedback: 'Riktig! Fysisk inspeksjonsrunde utført av et menneske er et klassisk manuelt tiltak.' },
          { id: 'c', label: 'Fysisk tiltak', isCorrect: false, feedback: 'Fysiske tiltak er materielle hindringer, ikke menneskelige handlinger.' },
        ],
        espenTip: 'Manuelt tiltak = Et menneske observerer og handler. Teknisk tiltak = En maskin gjør det.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🏨',
    title: 'Thon Hotel — Beredskapsplan i praksis',
    quote: '«Et stort hotell er et minisamfunn — og alt som skjer i et samfunn, kan skje her.»',
    content: 'Et stort Thon-hotell kombinerer alle fire sikkerhetskategorier i én integrert beredskapsplan. Eksempelet viser hvordan tiltak utfyller hverandre.',
    subpoints: [
      { label: 'Fysisk', text: 'Brannsikre dører, safe i resepsjonen forankret i veggen.' },
      { label: 'Teknisk', text: 'Elektroniske nøkkelkort (adgangskontroll), brannvarslingsanlegg, kameraovervåking.' },
      { label: 'Manuell', text: 'Securitas nattevakt, regelmessige patruljer.' },
      { label: 'Administrativ', text: 'Ransinstruks på bakrom, beredskapsplan tilgjengelig for alle ansatte, månedlige øvelser.' },
    ],
    practical: 'Hvis kassasystemet på hotellet kollapser, hva er reserveløsningen? Lag en enkel reserveplan.',
    exercises: [
      {
        id: 'B7-1',
        icon: '🏨',
        title: 'Integrerte tiltak',
        question: 'Thon-hotellet innfører ransikring: safe i veggen (A), kameraer i resepsjonen (B), ransinstruks for nattevakt (C), og Securitas-patruljer (D). Kategoriser tiltakene.',
        choices: [
          { id: 'a', label: 'A=Fysisk, B=Teknisk, C=Administrativ, D=Manuell', isCorrect: true, feedback: 'Riktig! Alle fire kategorier er representert. Slik fungerer et helhetlig sikkerhetsystem — lagdelte barrierer der en svikt ikke betyr totalt sammenbrudd.' },
          { id: 'b', label: 'A=Teknisk, B=Fysisk, C=Manuell, D=Administrativ', isCorrect: false, feedback: 'Safe i vegg er et materielt hinder (fysisk), kamera er elektronikk (teknisk). Sjekk kategoriene igjen.' },
          { id: 'c', label: 'A=Administrativ, B=Teknisk, C=Fysisk, D=Manuell', isCorrect: false, feedback: 'Safe er fysisk (materiell barriere), ikke administrativ.' },
        ],
        espenTip: 'Et godt sikkerhetsystem bruker alle fire kategorier. Svikt i én kategori skal ikke gi totalt sammenbrudd.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🔌',
    title: 'Reserveløsninger — Drifte uten strøm eller internett',
    quote: '«Det er ikke om systemet kollapser — men når.»',
    content: 'Moderne bedrifter er avhengige av digitale systemer. Beredskapsplanen må inkludere reserverutiner for kritiske systemer som kan falle ut.',
    subpoints: [
      { label: 'Strømbrudd', text: 'Nødstrøm (UPS/aggregat) for kritiske systemer. Manuelle rutiner for resten.' },
      { label: 'Kassasystem ned', text: 'Papirlapp + penn for ordre. Vipps som betalingsalternativ.' },
      { label: 'Internett ned', text: 'Hva kan gjøres offline? Har vi alle nødnummere tilgjengelig uten internett?' },
      { label: 'Kommunikasjon ved mobilnettbrudd', text: 'Fast telefon, radio, forhåndsdefinerte møtepunkter.' },
    ],
    practical: 'Et hotell har strøm-blackout kl. 19:00 med 200 gjester innenfor. Lag de 5 første handlingspunktene.',
    exercises: [
      {
        id: 'B8-1',
        icon: '🔌',
        title: 'Reserveplan',
        question: 'Et serveringssted mister internett-forbindelsen midt i en travel lunsjrusj. Hva er den BEST forberedte responsen?',
        choices: [
          { id: 'a', label: 'Stenge for dagen — uten internett kan de ikke drifte', isCorrect: false, feedback: 'Et godt forberedt serveringssted har analoge reserverutiner.' },
          { id: 'b', label: 'Bytte til manuell bestillingslapp, tilby kontant/Vipps, og varsle kundene om ventetid', isCorrect: true, feedback: 'Riktig! En ferdig reserveplan inkluderer disse elementene. De ansatte vet hva de gjør fordi de har øvd på det.' },
          { id: 'c', label: 'Prøve å fikse internett selv', isCorrect: false, feedback: 'IT-feilsøking tar tid og er spesialistarbeid. Reserveplanen skal gjøre bedriften i stand til å drifte mens IT-problemet løses.' },
        ],
        espenTip: 'Reserveplan = hva gjør vi MENS det vanlige ikke fungerer. Ikke hva gjør vi for å fikse det vanlige.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Internkontrollforskriften',
    quote: '«Beredskap er ikke valgfritt — det er lovpålagt.»',
    content: 'Internkontrollforskriften (forskrift om systematisk helse-, miljø- og sikkerhetsarbeid) pålegger alle virksomheter å ha dokumenterte rutiner for krisehåndtering.',
    subpoints: [
      { label: 'Hvem gjelder den?', text: 'Alle arbeidsgivere i Norge, uavhengig av størrelse.' },
      { label: 'Kravene', text: 'Kartlegge farer (ROS), utarbeide handlingsplan, gjennomføre øvelser, dokumentere.' },
      { label: 'Tilsyn', text: 'Arbeidstilsynet, DSB og Mattilsynet kan foreta tilsyn og gi pålegg.' },
      { label: 'Sanksjon', text: 'Manglende beredskapsplan kan gi tvangsmulkt og i alvorlige tilfeller virksomhetsstopp.' },
    ],
    practical: 'Finn beredskapsplan-dokumentet for din arbeidsplass/skole. Er det oppdatert? Er du kjent med innholdet?',
    exercises: [
      {
        id: 'B9-1',
        icon: '⚖️',
        title: 'Internkontrollforskriften',
        question: 'En liten kafé med 4 ansatte hevder de er for små til å trenge en beredskapsplan. Er dette korrekt?',
        choices: [
          { id: 'a', label: 'Ja — internkontrollforskriften gjelder bare bedrifter over 10 ansatte', isCorrect: false, feedback: 'Feil! Internkontrollforskriften gjelder ALLE arbeidsgivere, uavhengig av størrelse.' },
          { id: 'b', label: 'Nei — internkontrollforskriften gjelder alle arbeidsgivere i Norge', isCorrect: true, feedback: 'Riktig! Det er ingen minstegrense for antall ansatte. Selv en arbeidsgiver med én ansatt er forpliktet.' },
          { id: 'c', label: 'Kanskje — det avhenger av bransje og risikoprofil', isCorrect: false, feedback: 'Lovplikten gjelder uansett bransje. Omfanget av beredskapsplanen kan tilpasses størrelse og risiko, men plikten gjelder alle.' },
        ],
        espenTip: 'Internkontrollforskriften = Alle. Ingen unntak for størrelse.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Beredskap er kultur, ikke papir',
    quote: '«Den beste beredskapen du kan ha, er ansatte som vet hva de skal gjøre uten å tenke seg om.»',
    content: 'Beredskapsplanen er et levende dokument som kombinerer alle fire sikkerhetstiltakstypene og trenger regelmessig øving for å ha reell verdi.',
    subpoints: [
      { label: 'Fire barrierer', text: 'Fysisk + Teknisk + Manuell + Administrativ = helhetlig sikkerhet.' },
      { label: 'Reserveløsninger', text: 'Alt kritisk trenger en "plan B" som er innøvd.' },
      { label: 'Internkontrollforskriften', text: 'Lovpålagt for alle arbeidsgivere.' },
      { label: 'Øving er avgjørende', text: 'En plan ingen kjenner er verdiløs.' },
    ],
    practical: 'Gjennomfør en beredskapsøvelse på din arbeidsplass. Evaluer: hva fungerte? Hva bør forbedres?',
    exercises: [
      {
        id: 'B10-1',
        icon: '✅',
        title: 'Oppsummering — de fire tiltakene',
        question: 'Hvilken rekkefølge bør man normalt prioritere de fire sikkerhetstiltakstypene i for en servicebedrift?',
        choices: [
          { id: 'a', label: 'Teknisk → Administrativ → Manuell → Fysisk', isCorrect: false, feedback: 'Det finnes ikke én riktig rekkefølge — de utfyller hverandre. Slik tenker man ikke i beredskapsplanlegging.' },
          { id: 'b', label: 'Alle fire implementeres parallelt og kompletterer hverandre — de er ikke substitutter', isCorrect: true, feedback: 'Riktig! De fire tiltakstypene er komplementære, ikke substitutter. Svikt i én kategori kompenseres av de andre.' },
          { id: 'c', label: 'Fysisk → Teknisk → Manuell → Administrativ i stigende kostnad', isCorrect: false, feedback: 'Kostnadrekkefølgen er ikke beredskapsplanleggingens logikk. Alle fire trengs fra starten.' },
        ],
        espenTip: 'Lagdelt sikkerhet: Ingen enkelt barriere er idiotsikker. Styrken er at angriper/uhell møter FLERE barrierer.',
      },
    ],
  },
]

export default function BeredskapModule() {
  return (
    <DrawerModule
      moduleCode="HMS-VG2-3"
      moduleTitle="Beredskap og krisehåndtering"
      moduleIcon="🚨"
      storageKey="learning-vg2-beredskap"
      completeRoute="/learning/vg2/hms/beredskap/complete"
      phases={phases}
      intro="Beredskapsplaner, fire typer sikkerhetstiltak og reserveløsninger — fra forebygging til krisehåndtering i praksis."
      vissteduAt="Studier viser at bedrifter med regelmessige beredskapsøvelser håndterer kriser 40 % raskere enn bedrifter uten øvelse — selv om planene er identiske."
      espenSier="En plan som ikke er øvd er bare papir. Beredskap er det muskelminnet du bygger gjennom øvelse — slik at kroppen vet hva den skal gjøre når hodet er stresset."
      presentationLink={{ route: '/learning/presentations/beredskap', description: 'Beredskapsplan — en visuell presentasjon' }}
    />
  )
}
