import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Hva er risiko?',
    quote: 'Risiko du ikke ser komme er den farligste',
    content: 'Risiko er sannsynligheten for at noe uønsket skjer, multiplisert med konsekvensene. Alle virksomheter har risiko — spørsmålet er ikke om du har risiko, men om du har oversikt over den.',
    subpoints: [
      'Risiko = Sannsynlighet × Konsekvens',
      'Intern risiko: feil, svikt, dårlige beslutninger internt',
      'Ekstern risiko: markedsendringer, konkurrenter, naturhendelser',
      'Å ha oversikt er første steg i risikostyring',
    ],
    practical: 'List opp 5 risikoer for en liten butikk. Del dem i interne og eksterne. Hvilke tre er mest kritiske?',
    exercises: [
      {
        id: 'ri-1-1',
        question: 'Hva er formelen for risiko?',
        choices: [
          { id: 'a', text: 'Risiko = Antall hendelser / År' },
          { id: 'b', text: 'Risiko = Sannsynlighet × Konsekvens' },
          { id: 'c', text: 'Risiko = Kostnad / Forsikring' },
          { id: 'd', text: 'Risiko = Trussel - Tiltak' },
        ],
        correctId: 'b',
        explanation: 'Risiko beregnes som sannsynligheten for at noe uønsket skjer, multiplisert med konsekvensen dersom det skjer.',
      },
      {
        id: 'ri-1-2',
        question: 'En hendelse har lav sannsynlighet men svært høy konsekvens (f.eks. brann). Hva er riktig tilnærming?',
        choices: [
          { id: 'a', text: 'Ignorer den — sannsynligheten er lav' },
          { id: 'b', text: 'Ta den på alvor — høy konsekvens gjør den viktig å planlegge for' },
          { id: 'c', text: 'Reduser kun sannsynligheten' },
          { id: 'd', text: 'Aksepter risikoen' },
        ],
        correctId: 'b',
        explanation: 'Selv lav sannsynlighet × høy konsekvens kan gi høy risikoscore. Slike scenarioer krever beredskapsplanlegging.',
      },
      {
        id: 'ri-1-3',
        question: 'Hva er forskjellen på intern og ekstern risiko?',
        choices: [
          { id: 'a', text: 'Intern risiko er alltid større enn ekstern' },
          { id: 'b', text: 'Intern: risiko fra egne beslutninger/feil. Ekstern: risiko fra omgivelsene' },
          { id: 'c', text: 'Ekstern risiko kan alltid unngås, intern risiko ikke' },
          { id: 'd', text: 'Det er ingen praktisk forskjell' },
        ],
        correctId: 'b',
        explanation: 'Intern risiko (feil, svikt, beslutninger) kan ofte kontrolleres og reduseres. Ekstern risiko (marked, konkurrenter) krever tilpasning.',
      },
      {
        id: 'ri-1-4',
        question: 'Hva er formålet med risikoanalyse?',
        choices: [
          { id: 'a', text: 'Å eliminere all risiko' },
          { id: 'b', text: 'Å identifisere, vurdere og håndtere risiko systematisk' },
          { id: 'c', text: 'Å unngå å ta beslutninger' },
          { id: 'd', text: 'Kun å tilfredsstille forsikringsselskapet' },
        ],
        correctId: 'b',
        explanation: 'Risikoanalyse er ikke å eliminere all risiko (umulig), men å ha systematisk oversikt og håndtere risiko bevisst.',
      },
      {
        id: 'ri-1-5',
        question: 'Hva betyr det å "ta risiko" som en del av forretningsdriften?',
        choices: [
          { id: 'a', text: 'Å handle uten å vurdere konsekvenser' },
          { id: 'b', text: 'Å ta bevisste, kalkulerte risikoer for å skape verdier' },
          { id: 'c', text: 'Å ignorere HMS-regler' },
          { id: 'd', text: 'At risiko alltid er negativt' },
        ],
        correctId: 'b',
        explanation: 'All forretningsdrift innebærer risiko. God risikostyring betyr å ta bevisste, kalkulerte risikoer der forventet gevinst overstiger risikokostnaden.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📊',
    title: 'Risikomatrisen',
    quote: 'Sannsynlighet × Konsekvens = Risikoscore',
    content: 'Risikomatrisen er et visuelt verktøy for å vurdere og prioritere risiko. Hver risiko plasseres basert på sannsynlighet (1–5) og konsekvens (1–5). Resultatet avgjør om risikoen er akseptabel, bør håndteres, eller er kritisk.',
    subpoints: [
      'Grønn sone (1–5): akseptabel risiko',
      'Gul sone (6–14): bør håndteres',
      'Rød sone (15–25): kritisk — must handle nå',
      'Eksempel: datainnbrudd → sannsynlighet 3 × konsekvens 5 = 15 (rød)',
    ],
    practical: 'Plasser 5 risikoer for en butikk i risikomatrisen. Hvilke havner i rød sone og krever umiddelbare tiltak?',
    glossaryTerm: 'Risikomatrise',
    exercises: [
      {
        id: 'ri-2-1',
        question: 'En risiko har sannsynlighet 4 og konsekvens 4. Hva er risikoverdien og hvilken sone?',
        choices: [
          { id: 'a', text: '8 (gul sone)' },
          { id: 'b', text: '16 (rød sone)' },
          { id: 'c', text: '4 (grønn sone)' },
          { id: 'd', text: '44 (kritisk)' },
        ],
        correctId: 'b',
        explanation: 'Risikoverdi = 4 × 4 = 16. Dette er i rød sone (≥15) og krever umiddelbare tiltak.',
      },
      {
        id: 'ri-2-2',
        question: 'Hva er den anbefalte handlingen for risiko i rød sone?',
        choices: [
          { id: 'a', text: 'Aksepter risikoen og gå videre' },
          { id: 'b', text: 'Dokumenter den og revurder neste år' },
          { id: 'c', text: 'Handle umiddelbart for å redusere risikoen' },
          { id: 'd', text: 'Forsikr deg mot risikoen og glem den' },
        ],
        correctId: 'c',
        explanation: 'Rød sone (15–25) betyr kritisk risiko som krever umiddelbar handling. Venter du, kan konsekvensene bli alvorlige.',
      },
      {
        id: 'ri-2-3',
        question: 'Datainnbrudd vurderes med sannsynlighet 3 og konsekvens 5. Hva er risikoverdien?',
        choices: [
          { id: 'a', text: '8' },
          { id: 'b', text: '12' },
          { id: 'c', text: '15' },
          { id: 'd', text: '25' },
        ],
        correctId: 'c',
        explanation: 'Risikoverdi = 3 × 5 = 15 — akkurat på grensen til rød sone, og må håndteres.',
      },
      {
        id: 'ri-2-4',
        question: 'En risiko er i grønn sone. Hva betyr dette?',
        choices: [
          { id: 'a', text: 'Risikoen kan ignoreres for alltid' },
          { id: 'b', text: 'Risikoen er akseptabel — overvåk den men det kreves ikke umiddelbare tiltak' },
          { id: 'c', text: 'Risikoen er kritisk og krever straks tiltak' },
          { id: 'd', text: 'Forsikring er obligatorisk' },
        ],
        correctId: 'b',
        explanation: 'Grønn sone (1–5) betyr akseptabel risiko. Den bør fortsatt overvåkes, men krever ikke umiddelbare store tiltak.',
      },
      {
        id: 'ri-2-5',
        question: 'Hva er fordelen med å bruke en risikomatrise fremfor en enkel liste?',
        choices: [
          { id: 'a', text: 'En matrise er lovpålagt' },
          { id: 'b', text: 'Den visualiserer og prioriterer risiko basert på sannsynlighet OG konsekvens' },
          { id: 'c', text: 'Den eliminerer behovet for risikovurdering' },
          { id: 'd', text: 'En matrise er raskere å lage' },
        ],
        correctId: 'b',
        explanation: 'Risikomatrisen kombinerer to dimensjoner visuelt, noe som gjør prioritering mye enklere enn en liste der alle risikoer ser like alvorlige ut.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🛡️',
    title: 'Risikoresponser',
    quote: 'Du kan ikke eliminere all risiko — men du kan velge respons',
    content: 'Det finnes fire strategier for å respondere på identifisert risiko: unngå, reduser, overfør og aksepter. Valg av strategi avhenger av risikoscoren og kostnaden ved tiltaket.',
    subpoints: [
      'UNNGÅ: avslutt aktiviteten som skaper risikoen',
      'REDUSER: iverksett tiltak (brannøvelse, backup, opplæring)',
      'OVERFØR: flytt risikoen (forsikring, kontrakter, outsourcing)',
      'AKSEPTER: bevisst valg om å leve med risikoen',
    ],
    practical: 'Velg en risiko og begrunn hvilken respons som er best. Hva koster hvert alternativ?',
    exercises: [
      {
        id: 'ri-3-1',
        question: 'En butikk selger et produkt med høy ulykkerisiko. De velger å slutte å selge det. Hvilken risikostrategi er dette?',
        choices: [
          { id: 'a', text: 'Reduser' },
          { id: 'b', text: 'Overfør' },
          { id: 'c', text: 'Unngå' },
          { id: 'd', text: 'Aksepter' },
        ],
        correctId: 'c',
        explanation: 'Å slutte med aktiviteten (selge produktet) er å UNNGÅ risikoen. Det er den mest effektive strategien, men innebærer ofte å gi opp inntekt.',
      },
      {
        id: 'ri-3-2',
        question: 'En bedrift kjøper ansvarsforsikring mot kundeskader. Hvilken risikostrategi er dette?',
        choices: [
          { id: 'a', text: 'Unngå' },
          { id: 'b', text: 'Reduser' },
          { id: 'c', text: 'Overfør' },
          { id: 'd', text: 'Aksepter' },
        ],
        correctId: 'c',
        explanation: 'Forsikring er klassisk OVERFØR-strategi — den finansielle konsekvensen av risikoen flyttes til forsikringsselskapet.',
      },
      {
        id: 'ri-3-3',
        question: 'En butikk innfører brannøvelse to ganger i året. Hvilken risikostrategi er dette?',
        choices: [
          { id: 'a', text: 'Unngå' },
          { id: 'b', text: 'Reduser' },
          { id: 'c', text: 'Overfør' },
          { id: 'd', text: 'Aksepter' },
        ],
        correctId: 'b',
        explanation: 'Brannøvelse REDUSERER konsekvensene av brann ved å gjøre ansatte bedre rustet. Selve branfaren elimineres ikke.',
      },
      {
        id: 'ri-3-4',
        question: 'Når er det riktig å AKSEPTERE en risiko?',
        choices: [
          { id: 'a', text: 'Alltid — det er billigst' },
          { id: 'b', text: 'Når risikoscoren er lav og tiltakskostnaden overstiger potensiell skade' },
          { id: 'c', text: 'Kun for røde risikoer' },
          { id: 'd', text: 'Aldri — alle risikoer må håndteres' },
        ],
        correctId: 'b',
        explanation: 'Akseptere er riktig når risikoscoren er lav (grønn sone) og det koster mer å håndtere risikoen enn det potensielle tapet.',
      },
      {
        id: 'ri-3-5',
        question: 'Hva er ulempen ved UNNGÅ-strategien?',
        choices: [
          { id: 'a', text: 'Den er for dyr å gjennomføre' },
          { id: 'b', text: 'Den innebærer ofte å gi opp muligheter eller inntekter' },
          { id: 'c', text: 'Den er ulovlig i Norge' },
          { id: 'd', text: 'Den krever forsikring' },
        ],
        correctId: 'b',
        explanation: 'Unngå-strategien er effektiv, men innebærer ofte at man gir opp aktiviteter — og dermed inntekter eller markedsandeler.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔄',
    title: 'SWOT vs risikoanalyse',
    quote: 'SWOT ser utenfra — risikoanalyse ser innenfra og ut',
    content: 'Både SWOT-analyse og risikoanalyse er nyttige verktøy, men de analyserer ulike aspekter. SWOT ser på strategiske styrker, svakheter, muligheter og trusler. Risikoanalyse kartlegger spesifikke operasjonelle hendelser.',
    subpoints: [
      'SWOT: strategisk perspektiv — hva posisjonerer bedriften godt/dårlig?',
      'Risikoanalyse: operasjonelt perspektiv — hva kan gå galt i driften?',
      'Trusler i SWOT kan bli utgangspunkt for risikoanalysen',
      'Begge er nødvendige for helhetlig risikostyring',
    ],
    practical: 'Gjennomfør en mini-SWOT for en lokal butikk og identifiser hvilke trusler som bør følges opp med risikoanalyse.',
    glossaryTerm: 'SWOT-analyse',
    exercises: [
      {
        id: 'ri-4-1',
        question: 'Hva analyserer SWOT-analysen?',
        choices: [
          { id: 'a', text: 'Spesifikke hendelser som kan gå galt i driften' },
          { id: 'b', text: 'Styrker, Svakheter, Muligheter og Trusler strategisk' },
          { id: 'c', text: 'Finansielle nøkkeltall' },
          { id: 'd', text: 'Kun interne forhold i bedriften' },
        ],
        correctId: 'b',
        explanation: 'SWOT analyserer Strengths, Weaknesses, Opportunities, Threats — et strategisk perspektiv på bedriftens posisjon.',
      },
      {
        id: 'ri-4-2',
        question: 'Hva er den viktigste forskjellen mellom SWOT og risikoanalyse?',
        choices: [
          { id: 'a', text: 'SWOT er mer matematisk' },
          { id: 'b', text: 'SWOT er strategisk; risikoanalyse er operasjonell og fokuserer på spesifikke hendelser' },
          { id: 'c', text: 'Risikoanalyse er kun for store bedrifter' },
          { id: 'd', text: 'De er det samme' },
        ],
        correctId: 'b',
        explanation: 'SWOT gir et strategisk overblikk. Risikoanalyse kartlegger spesifikke operasjonelle hendelser med sannsynlighet og konsekvens.',
      },
      {
        id: 'ri-4-3',
        question: 'En SWOT-analyse identifiserer "ny konkurrent åpner i nærheten" som trussel. Hva bør neste steg være?',
        choices: [
          { id: 'a', text: 'Ignorer det — trusler er alltid overdrivelse' },
          { id: 'b', text: 'Gjennomfør risikoanalyse for å vurdere sannsynlighet og konsekvens, og velg respons' },
          { id: 'c', text: 'Lukk bedriften umiddelbart' },
          { id: 'd', text: 'Det er ingen sammenheng mellom SWOT og risikoanalyse' },
        ],
        correctId: 'b',
        explanation: 'SWOT-trusler er naturlige utgangspunkter for risikoanalysen — nå vurderes de kvantitativt (sannsynlighet × konsekvens).',
      },
      {
        id: 'ri-4-4',
        question: 'Hva representerer "Svakheter" i en SWOT-analyse?',
        choices: [
          { id: 'a', text: 'Ytre faktorer som truer bedriften' },
          { id: 'b', text: 'Interne faktorer som setter bedriften i en dårligere posisjon enn konkurrentene' },
          { id: 'c', text: 'Muligheter bedriften har til å vokse' },
          { id: 'd', text: 'Risikofaktorer i omgivelsene' },
        ],
        correctId: 'b',
        explanation: 'Svakheter er interne faktorer som begrenser bedriftens konkurranseevne — f.eks. dårlig beliggenhet, lav kompetanse eller gammelt utstyr.',
      },
      {
        id: 'ri-4-5',
        question: 'Hva er fordelen med å bruke SWOT og risikoanalyse komplementært?',
        choices: [
          { id: 'a', text: 'Det tar dobbelt så lang tid — ingen fordel' },
          { id: 'b', text: 'Strategisk oversikt (SWOT) kombinert med operasjonell dybde (risikoanalyse) gir helhetlig risikostyring' },
          { id: 'c', text: 'Det eliminerer all risiko' },
          { id: 'd', text: 'Du trenger da ikke forsikring' },
        ],
        correctId: 'b',
        explanation: 'SWOT gir det strategiske kartet; risikoanalysen fyller inn de operasjonelle detaljene. Kombinert gir de et helhetlig bilde av bedriftens risikobilde.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📋',
    title: 'Beredskapsplan',
    quote: 'En plan skrevet i fred redder liv i krise',
    content: 'Beredskapsplanen er den praktiske konsekvensen av risikoanalysen. Den svarer på: Hvem gjør hva? Hvem varsles? Hva er prioritet 1, 2, 3? En god beredskapsplan gjøres kjent for alle ansatte og øves på.',
    subpoints: [
      'Beredskapsplanen er sluttproduktet av risikoanalysen',
      'Hvem gjør hva, hvem varsles, hva er prioritet',
      'Eksempel: ved brann: evakuering (1) → varsle brannvesen (1) → informere eier (2)',
      'Øv på planen — en plan du ikke har øvd er bare papir',
    ],
    practical: 'Lag en mini-beredskapsplan for to scenarioer for din arbeidsplass eller skolen.',
    exercises: [
      {
        id: 'ri-5-1',
        question: 'Hva er sammenhengen mellom risikoanalyse og beredskapsplan?',
        choices: [
          { id: 'a', text: 'Ingen sammenheng' },
          { id: 'b', text: 'Risikoanalysen identifiserer risiko; beredskapsplanen beskriver respons' },
          { id: 'c', text: 'Beredskapsplanen lages før risikoanalysen' },
          { id: 'd', text: 'De er det samme verktøyet' },
        ],
        correctId: 'b',
        explanation: 'Risikoanalysen kartlegger og prioriterer risiko. Beredskapsplanen er den praktiske handlingsplanen for å håndtere de identifiserte risikoene.',
      },
      {
        id: 'ri-5-2',
        question: 'Hva er de tre viktigste spørsmålene en beredskapsplan svarer på?',
        choices: [
          { id: 'a', text: 'Hva, hvorfor og hvem er skyldig?' },
          { id: 'b', text: 'Hvem gjør hva, hvem varsles, og hva er prioritet 1-2-3?' },
          { id: 'c', text: 'Hva koster det, hvem betaler og hvem er forsikret?' },
          { id: 'd', text: 'Når skjedde det, hva gikk galt og hvordan unngår vi det?' },
        ],
        correctId: 'b',
        explanation: 'En god beredskapsplan svarer konkret på: hvem har ansvar, hvem varsles (og i hvilken rekkefølge), og hvilke tiltak prioriteres.',
      },
      {
        id: 'ri-5-3',
        question: 'En beredskapsplan er laget men ingen ansatte kjenner til den. Hva er verdien?',
        choices: [
          { id: 'a', text: 'Full verdi — planen er der når den trengs' },
          { id: 'b', text: 'Lav verdi — en plan ingen kjenner til, er nesten like dårlig som ingen plan' },
          { id: 'c', text: 'Ingen relevans — planer er unødvendige' },
          { id: 'd', text: 'Leder kan alltid finne den i en krise' },
        ],
        correctId: 'b',
        explanation: 'En beredskapsplan som ikke er kommunisert og øvd på har svært lav verdi. I en krise er det ingen tid til å lese seg opp.',
      },
      {
        id: 'ri-5-4',
        question: 'Butikken har strømbrud. Ifølge beredskapsplanen: kasseapparater slås av (1), kunder informeres (1), leder varsles (2), leverandør utsettes (3). Hva er prioritet 1?',
        choices: [
          { id: 'a', text: 'Varsle leder' },
          { id: 'b', text: 'Utsette leverandøren' },
          { id: 'c', text: 'Slå av kasseapparater og informere kunder' },
          { id: 'd', text: 'Ringe elektrikeren' },
        ],
        correctId: 'c',
        explanation: 'Prioritet 1 er de umiddelbare tiltakene: sikre utstyr og informere berørte. Ledelse varsles etter at de akutte tiltakene er gjort.',
      },
      {
        id: 'ri-5-5',
        question: 'Hva bør gjøres etter at en krise er håndtert?',
        choices: [
          { id: 'a', text: 'Glemme det og gå videre' },
          { id: 'b', text: 'Evaluere hva som gikk bra/dårlig og oppdatere beredskapsplanen' },
          { id: 'c', text: 'Kun dokumentere for forsikringen' },
          { id: 'd', text: 'Vente til neste krise for å evaluere' },
        ],
        correctId: 'b',
        explanation: 'Evaluering etter en krise gir verdifull læring. Oppdater beredskapsplanen basert på erfaringene — neste krise håndteres da bedre.',
      },
    ],
  },
]

export default function RisikoanalyseModule() {
  return (
    <DrawerModule
      moduleCode="FD-VG2-4"
      moduleTitle="Risikoanalyse"
      moduleIcon="🔍"
      storageKey="learning-vg2-risikoanalyse"
      completeRoute="/learning/vg2/forretningsdrift/risikoanalyse/complete"
      phases={phases}
      intro="Alle virksomheter har risiko. Profesjonell risikostyring handler ikke om å unngå all risiko — det handler om å identifisere, vurdere og håndtere risiko på en systematisk måte."
      vissteduAt="Rema 1000 har en beredskapsplan for alt fra strømbrudd til pandemier. En god plan betyr at ansatte vet hva de skal gjøre — uten å måtte tenke i stresset øyeblikk."
      espenSier="Risikoanalyse er en av de ferdighetene som skiller gode ledere fra middelmådige. De beste lederne ser risiko før den inntreffer — og har en plan klar."
      presentationLink={{ route: '/learning/presentations/regler-lovverk', description: 'Regler og lovverk — en visuell gjennomgang av risikostyring og lovkrav' }}
    />
  )
}
