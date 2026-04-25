import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '💡',
    title: 'Innovasjon — Fra idé til verdiskaping',
    quote: '«En idé er ikke innovasjon — det er starten på et arbeid.»',
    content: 'Innovasjon er frembringelsen av noe nytt som tas i bruk og skaper kommersiell eller samfunnsmessig verdi. Det handler ikke om å tenke kreativt — det handler om å realisere noe som faktisk gjør en forskjell.',
    subpoints: [
      { label: 'Definisjon', text: 'Innovasjon = Idé + Gjennomføring + Verdi. Alle tre elementer er nødvendige.' },
      { label: 'Ikke bare teknologi', text: 'Innovasjon kan være ny tjeneste, ny forretningsmodell, ny prosess, ny distribusjon.' },
      { label: 'Lønnsomhet og bærekraft', text: 'Innovasjon må balansere kommersiell levedyktighet med klima- og etikkhensyn.' },
    ],
    practical: 'Tenk på en innovasjon i SSR-bransjen du synes er genial. Hva var idéen — og hva var gjennomføringen?',
    exercises: [
      {
        id: 'IP1-1',
        icon: '💡',
        title: 'Hva er innovasjon?',
        question: 'En student får en idé om en app som oversetter matallergener. Idéen er aldri blitt noe av. Er dette innovasjon?',
        choices: [
          { id: 'a', label: 'Ja — å komme opp med en ny idé er alltid innovasjon', isCorrect: false, feedback: 'Nei — en idé som aldri realiseres er bare kreativitet. Innovasjon krever gjennomføring og verdiskaping.' },
          { id: 'b', label: 'Nei — innovasjon krever at idéen tas i bruk og skaper verdi', isCorrect: true, feedback: 'Riktig! Ifølge definisjonen er en god idé ikke innovasjon inntil den faktisk implementeres og skaper verdi for noen.' },
          { id: 'c', label: 'Kanskje — det avhenger av om appen er patenterbar', isCorrect: false, feedback: 'Patent er ikke et krav for innovasjon. Det avgjørende er om idéen realiseres og skaper verdi.' },
        ],
        espenTip: 'Huskeregelen: Innovasjon = Idé × Gjennomføring × Verdi. Hvis ett av elementene er 0, er resultatet 0.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔬',
    title: 'Inkrementell innovasjon — Gradvis forbedring',
    quote: '«De fleste innovasjoner er ikke revolusjoner — de er trinnvise forbedringer.»',
    content: 'Inkrementell innovasjon er kontinuerlige, trinnvise forbedringer av eksisterende produkter, tjenester eller prosesser. Det er den vanligste og mest stabile formen for innovasjon.',
    subpoints: [
      { label: 'Hva er det?', text: 'Forbedre det eksisterende fremfor å erstatte det. Stadig bedre, ikke revolusjonerende.' },
      { label: 'Eksempler', text: 'Hotell legger til digital innsjekking. Kafé tilbyr ny smaksvariant. Restaurant forbedrer bestillingsprosessen.' },
      { label: 'Fordeler', text: 'Lavere risiko, kjent kunde, bygger på eksisterende kompetanse.' },
      { label: 'Ulempene', text: 'Kan ikke forsvare seg mot radikale forstyrrere (jf. Kodak vs. Instagram).' },
    ],
    practical: 'Finn tre inkrementelle innovasjoner i en Kiwi-butikk de siste fem årene.',
    exercises: [
      {
        id: 'IP2-1',
        icon: '🔬',
        title: 'Inkrementell vs. radikal',
        question: 'En restaurantkjede innfører digitalt bestillingssystem for å erstatte papirlapper til kjøkkenet. Er dette inkrementell eller radikal innovasjon?',
        choices: [
          { id: 'a', label: 'Radikal — det er en ny teknologi', isCorrect: false, feedback: 'Det er ny teknologi, men den forbedrer en eksisterende prosess (bestilling) fremfor å erstatte hele forretningsmodellen.' },
          { id: 'b', label: 'Inkrementell — det forbedrer en eksisterende prosess uten å endre kjerneproduktet (maten)', isCorrect: true, feedback: 'Riktig! Digital bestilling er en prosessforbedring. Restauranten serverer fortsatt mat på samme måte — prosessen er bare mer effektiv.' },
          { id: 'c', label: 'Det er ikke innovasjon — slike systemer finnes allerede', isCorrect: false, feedback: 'Ny for bedriften teller. Ikke alle innovasjoner trenger å være verdens første.' },
        ],
        espenTip: 'Inkrementell: gjør det eksisterende bedre. Radikal: erstatter det eksisterende med noe fundamentalt nytt.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💥',
    title: 'Radikal innovasjon — Banebrytende endring',
    quote: '«Disrupsjon er ikke en ulykke — det er resultatet av at noen torde å tenke annerledes.»',
    content: 'Radikal innovasjon skaper helt nye løsninger som endrer et marked fundamentalt. De erstatter etablerte produkter og skaper nye industrier — men de er risikable og krever tålmodige investorer.',
    subpoints: [
      { label: 'Hva er det?', text: 'Fundamentalt nye løsninger som endrer hele bransjer, ikke bare forbedrer dem.' },
      { label: 'Disrupsjon', text: 'Nye aktører med radikalt nye forretningsmodeller utfordrer etablerte spillere.' },
      { label: 'Eksempler globalt', text: 'Airbnb disrupterte hotellbransjen. Uber disrupterte taxi. Spotify disrupterte platebutikker.' },
      { label: 'Norsk kontekst', text: 'Digital reiseliv-booking (vy.no vs. billettsalg i skranke) endret reiselivsbransjen.' },
    ],
    practical: 'Hvilken norsk SSR-bransje er mest sårbar for disrupsjon de neste 10 årene? Hvorfor?',
    exercises: [
      {
        id: 'IP3-1',
        icon: '💥',
        title: 'Disrupsjon',
        question: 'Airbnb er et eksempel på radikal innovasjon. Hva er det som gjør det radikalt (fremfor inkrementelt)?',
        choices: [
          { id: 'a', label: 'Det er en ny app — teknologien er radikalt ny', isCorrect: false, feedback: 'Apper er ikke i seg selv radikale. Det er forretningsmodellen som er revolusjonerende.' },
          { id: 'b', label: 'Det endret fundamentalt HVEM som tilbyr overnatting — fra hoteller til privatpersoner — og brøt ned bransjestrukturen', isCorrect: true, feedback: 'Riktig! Airbnb skapte et helt nytt marked (P2P-utleie) som ikke fantes, fremfor å forbedre et eksisterende hotell.' },
          { id: 'c', label: 'Det er billigere enn hotell', isCorrect: false, feedback: 'Prisen er én fordel, men det er ikke det som gjør innovasjonen radikal.' },
        ],
        espenTip: 'Radikal innovasjon handler om nye forretningsmodeller, ikke bare nye produkter. Airbnb "eier" ingen rom — men er verdens største overnattingsplattform.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔄',
    title: 'Produktutviklingsprosessen — Fra idé til marked',
    quote: '«Fail fast, learn faster.»',
    content: 'Produktutvikling er den strukturerte prosessen fra idé til ferdig produkt eller tjeneste i markedet. En god prosess reduserer risiko og sikrer at man tester underveis.',
    subpoints: [
      { label: '1. Idégenerering', text: 'Brainstorm, kundeintervjuer, benchmarking, trendanalyse.' },
      { label: '2. Konseptutvikling', text: 'Velg lovende idéer, utvikle konsept, lag prototype.' },
      { label: '3. Testing og validering', text: 'Test på utvalgte kunder, samle feedback, iterer.' },
      { label: '4. Lansering', text: 'Rull ut til markedet med kampanje og oppfølging.' },
    ],
    practical: 'Du jobber for et reisebyrå. Design en 4-ukers prosess for å utvikle og teste et nytt tur-produkt til Svalbard.',
    exercises: [
      {
        id: 'IP4-1',
        icon: '🔄',
        title: 'Produktutviklingsprosessen',
        question: 'Hva er poenget med å teste en prototype på noen få kunder FØR full lansering?',
        choices: [
          { id: 'a', label: 'Å spare penger på markedsføring', isCorrect: false, feedback: 'Testing kan spare penger totalt, men ikke primært på markedsføring.' },
          { id: 'b', label: 'Å avdekke problemer og samle feedback mens det fortsatt er enkelt og billig å endre produktet', isCorrect: true, feedback: 'Riktig! Det er langt billigere å korrigere kurs basert på feedback fra 10 testkunder enn å lansere til 10 000 kunder og oppdage at produktet er feil.' },
          { id: 'c', label: 'Fordi loven krever testing av nye produkter', isCorrect: false, feedback: 'Det er ikke et generelt lovkrav — det er god forretningsmessig praksis.' },
        ],
        espenTip: '"Fail fast" betyr ikke å mislykkes — det betyr å teste tidlig og lære raskt, slik at du ikke bruker millioner på feil produkt.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📋',
    title: 'Lønnsomhet, klima og etikk i produktutvikling',
    quote: '«Fremtidens kunder vil strafe produkter som ikke tar hensyn til klima og etikk.»',
    content: 'Nye produkter og tjenester må i dag vurderes mot tre krav: kommersiell lønnsomhet, klimapåvirkning og etiske konsekvenser. Alle tre er nå forventninger fra kunder, investorer og myndigheter.',
    subpoints: [
      { label: 'Lønnsomhet', text: 'Produktet må skape nok verdi til at kunder vil betale en pris som dekker kostnadene.' },
      { label: 'Klima', text: 'LCA (livssyklusanalyse) kartlegger klimaavtrykket fra "vugge til grav".' },
      { label: 'Etikk', text: 'Hvem produserer? Under hvilke forhold? Er markedsføringen ærlig?' },
      { label: 'Sirkulær design', text: 'Produkter bør designes for gjenbruk, reparasjon og resirkulering fra starten.' },
    ],
    practical: 'Et reisebyrå vil lage en ny "adventure-tur" til Amazonas. Hvilke etikk- og klimahensyn må de vurdere?',
    exercises: [
      {
        id: 'IP5-1',
        icon: '📋',
        title: 'Tredobbel bunnlinje',
        question: 'Et turistselskap i Lofoten vurderer å tilby sommerturer med helikopter for å nå fjerne strender. Det er lønnsomt. Hva må vurderes utover lønnsomhet?',
        choices: [
          { id: 'a', label: 'Ingenting — lønnsomhet er tilstrekkelig kriterium', isCorrect: false, feedback: 'I dag er lønnsomhet alene ikke tilstrekkelig. Kunder, samarbeidspartnere og myndigheter forventer at klimakonsekvenser og etikk vurderes.' },
          { id: 'b', label: 'Klimaavtrykket fra helikopterflyving, støyulemper for lokalbefolkning og miljøpåvirkning på sårbar natur', isCorrect: true, feedback: 'Riktig! Triple bottom line: folk (lokalsamfunn), planet (klimaavtrykk, natur), profitt (lønnsomhet). Alle tre må vurderes.' },
          { id: 'c', label: 'Om konkurrentene tilbyr samme produkt', isCorrect: false, feedback: 'Konkurrentanalyse er en del av markedsstrategien, men svarer ikke på det etiske/klimamessige spørsmålet.' },
        ],
        espenTip: '"Triple bottom line": Folk, Planet, Profitt. Ekte bærekraft krever at alle tre er grønne.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🏨',
    title: 'Scandic — Digital innsjekking og minibarer',
    quote: '«Det mest bærekraftige rommet er et rom som ikke trenger det.»',
    content: 'Scandic Hotels gjennomgikk en innovasjonsprosess som resulterte i to endringer: innføring av digitale innsjekk-kiosker og fjerning av minibarene fra rommene.',
    subpoints: [
      { label: 'Digital innsjekking', text: 'Kiosker i lobbyen reduserer kø, frigjør personale til mer verdifull service, og gir raskere prosess for hyppige gjester.' },
      { label: 'Fjerning av minibarer', text: 'Minibarene kostet mer å vedlikeholde enn de genererte i omsetning. I tillegg krevde de mye energi.' },
      { label: 'Inkrementell, ikke radikal', text: 'Scandic endret PROSESSEN og produktinnholdet — ikke hele forretningsmodellen.' },
      { label: 'Bærekraft som driver', text: 'Begge endringer reduserte energiforbruk og driftskostnader, noe som ga klima- og økonomigevinst.' },
    ],
    practical: 'Hvilke av de ansattes oppgaver ble frigjort når Scandic innførte digital innsjekking? Hva bruker de tiden til nå?',
    exercises: [
      {
        id: 'IP6-1',
        icon: '🏨',
        title: 'Scandic-caset',
        question: 'Hva slags innovasjon er Scandics innføring av digitale innsjekkingskiosker?',
        choices: [
          { id: 'a', label: 'Radikal innovasjon — Scandic var det første hotellet i verden med digital innsjekking', isCorrect: false, feedback: 'Det var ikke det første i verden, og det endret ikke hotellbransjens grunnleggende forretningsmodell.' },
          { id: 'b', label: 'Inkrementell innovasjon — det forbedrer en eksisterende prosess (innsjekking) uten å endre kjerneproduktet (overnatting)', isCorrect: true, feedback: 'Riktig! Digitale kiosker forbedrer innsjekkingsprosessen. Gjesten bor fortsatt på et rom — prosessen er bare mer effektiv.' },
          { id: 'c', label: 'Prosessinnovasjon (intern), ikke produktinnovasjon', isCorrect: false, feedback: 'Det er faktisk begge deler — intern prosessforbedring med ekstern synlighet for gjestene. Men svaret er nær nok inkrementell.' },
        ],
        espenTip: 'Ikke all innovasjon er radikal. De fleste verdiskapende innovasjoner er inkrementelle forbedringer av eksisterende prosesser.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '⛷️',
    title: 'Trysil — Fra alpinbakke til helårsdestinasjon',
    quote: '«Det smarteste Trysil gjorde var å ikke prøve å bli Åre — men å bli et bedre Trysil.»',
    content: 'Destinasjon Trysil har over 20 år innovert seg fra en ren vintersportdestinasjon til en bærekraftig helårsdestinasjons. Stisykkelanlegg, sommeropplevelser og "nærturisme" er kjernen.',
    subpoints: [
      { label: 'Problemet', text: 'Klimaendringer truer snøsesongen. Avhengighet av én sesong er sårbart.' },
      { label: 'Innovasjonen', text: 'Investering i Norges beste stisykkelnett (over 200 km stier) for sommermarkedet.' },
      { label: 'Virkemiddelapparatet', text: 'Tilskudd fra Innovasjon Norge til produktutvikling for ny sesong.' },
      { label: 'Resultatet', text: 'Belegg i sommersesongen er nær vinterbelegg. Destinasjonen er langt mer robust.' },
    ],
    practical: 'Hvilke andre norske vinterdestinasjoner bør følge Tryslils eksempel? Hva ville du anbefalt dem å gjøre?',
    exercises: [
      {
        id: 'IP7-1',
        icon: '⛷️',
        title: 'Trysils strategi',
        question: 'Hva er det primære strategiske motivet for Trysils investering i sommerturisme?',
        choices: [
          { id: 'a', label: 'Å tjene mer penger — sommerprisene er høyere enn vinterprisene', isCorrect: false, feedback: 'Prismotivet er en faktor, men det er ikke det primære. Det handler om robusthet.' },
          { id: 'b', label: 'Å redusere sårbarheten overfor klimaendringer og skape en helårsdestinasjon som tåler sviktende snøsesonger', isCorrect: true, feedback: 'Riktig! Klimaendringer truer snøsesongen. Ved å diversifisere til sommer reduserer Trysil risikoen for at en dårlig vintersesong ødelegger hele årets økonomi.' },
          { id: 'c', label: 'Fordi det er krav fra Innovasjon Norge for å motta støtte', isCorrect: false, feedback: 'Innovasjon Norge støtter strategien, men den er ikke drevet av et slikt krav.' },
        ],
        espenTip: 'Trysil viser at innovasjon ikke alltid handler om teknologi — det kan handle om å forstå at markedet endrer seg og omstille seg proaktivt.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Misforståelse — Innovasjon krever ikke alltid ny teknologi',
    quote: '«Den viktigste innovasjonen i restaurantbransjen er kanskje et smartere bestillingssystem — ikke en ny rett.»',
    content: 'Mange elever tror at innovasjon alltid handler om ny teknologi eller store, revolusjonerende oppfinnelser. I virkeligheten er innovasjon langt bredere.',
    subpoints: [
      { label: 'Myte: Innovasjon = teknologi', text: 'Feil — nye serviseformer, nye åpningstider, nye betalingsløsninger er også innovasjon.' },
      { label: 'Myte: Bare store selskaper innoverer', text: 'Den lokale kaféen som innfører takeaway-abonnement, innoverer.' },
      { label: 'Myte: Innovasjon er ekstraordinært', text: 'De fleste innovasjoner er hverdagslige, trinnvise forbedringer.' },
      { label: 'Myte: Idéen er nok', text: 'En idé uten gjennomføring og verdiskaping er ikke innovasjon.' },
    ],
    practical: 'Finn en ikke-teknologisk innovasjon i SSR-bransjen som har hatt stor effekt på kundene.',
    exercises: [
      {
        id: 'IP8-1',
        icon: '⚠️',
        title: 'Bredden av innovasjon',
        question: 'En restaurant innfører ny rutine: servitørene lærer gjestenes navn og bruker dem aktivt. Er dette innovasjon?',
        choices: [
          { id: 'a', label: 'Nei — det er bare god service, ikke innovasjon', isCorrect: false, feedback: 'Grensen er flytende. En systematisert ny praksis som skaper differensiering og verdi kan godt kalles prosesinnovasjon.' },
          { id: 'b', label: 'Ja — det er en prosesinnovasjon som differensierer restauranten og skaper ny verdi for gjestene', isCorrect: true, feedback: 'Riktig! Innovasjon trenger ikke ny teknologi. En ny servicerutine som konsekvent øker kundetilfredshet er en prosesinnovasjon.' },
          { id: 'c', label: 'Kanskje — bare hvis det er patenterbart', isCorrect: false, feedback: 'Patent er ikke et krav for innovasjon. De fleste prosesinnovasjoner er upatenlerbare.' },
        ],
        espenTip: 'Innovasjon er bredt: nye produkter, tjenester, prosesser, forretningsmodeller, organisasjonsformer og markedsstrategier teller alle.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Patent, varemerke og Innovasjon Norge',
    quote: '«Immaterielle rettigheter er ikke et juridisk detaljspørsmål — det er verdier på balansen.»',
    content: 'Innovasjon kan beskyttes gjennom patenter, varemerker og designregistrering. Norske bedrifter kan også søke støtte gjennom Innovasjon Norge og SkatteFUNN.',
    subpoints: [
      { label: 'Patent', text: 'Gir tidsbegrenset monopol på en oppfinnelse (teknisk løsning). Maks 20 år. Forutsetter nyhet og oppfinnelseshøyde.' },
      { label: 'Varemerke', text: 'Beskytter navn, logo, slagord. Kan fornyes. Utgangspunkt: 10 år av gangen.' },
      { label: 'Design', text: 'Beskytter utseendet (form, farger, mønster) på et produkt.' },
      { label: 'Innovasjon Norge', text: 'Statlig virkemiddelapparat som gir tilskudd og lån til innovasjonsprosjekter.' },
      { label: 'SkatteFUNN', text: 'Skattefradrag for FoU-kostnader — tilgjengelig for alle norske bedrifter.' },
    ],
    practical: 'En restaurantkjede vil beskytte sin hemmelige saussoppskrift. Hvilke juridiske verktøy kan de bruke?',
    exercises: [
      {
        id: 'IP9-1',
        icon: '⚖️',
        title: 'Immaterielle rettigheter',
        question: 'En reiselivsbedrift lager en ny app for reiseleder og vil beskytte den. Hva er det mest relevante juridiske verktøyet?',
        choices: [
          { id: 'a', label: 'Varemerkeregistrering — beskytt app-ikonet og navneet', isCorrect: false, feedback: 'Varemerke beskytter logo og navn, men ikke funksjonaliteten i appen.' },
          { id: 'b', label: 'Patent på den tekniske løsningen (algoritmer og funksjonalitet) og varemerke for navn/logo', isCorrect: true, feedback: 'Riktig! Patent beskytter tekniske oppfinnelser (selve funksjonaliteten), mens varemerke beskytter merkevaren. Begge er relevante for en app.' },
          { id: 'c', label: 'Designregistrering — beskytt appens utseende', isCorrect: false, feedback: 'Design beskytter utseendet, men ikke funksjonaliteten som er kjerneverdien i en app.' },
        ],
        espenTip: 'For en app: Patent = funksjonalitet. Varemerke = navn/logo. Designregistrering = utseende (UI). Mange apper bruker alle tre.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Innovasjon som konkurransefortrinn',
    quote: '«De som slutter å innovere, begynner å stagnere.»',
    content: 'Innovasjon er ikke et prosjekt — det er en kontinuerlig prosess. Bedrifter som integrerer innovasjon i sin kultur og strategi, bygger langvarig konkurransefortrinn.',
    subpoints: [
      { label: 'Inkrementell vs. radikal', text: 'De fleste bedrifter lever av inkrementell innovasjon — men radikal innovasjon er nødvendig for å møte disrupsjon.' },
      { label: 'Produktutviklingsprosessen', text: 'Test tidlig, lær raskt, iterer.' },
      { label: 'Tredobbel bunnlinje', text: 'Lønnsomhet + klima + etikk er nå forventningen.' },
      { label: 'Virkemiddelapparatet', text: 'Innovasjon Norge og SkatteFUNN kan delfinansiere innovasjonsarbeid.' },
    ],
    practical: 'Hvilken innovasjon ville du foreslå for din skoles kantineordning? Gå gjennom hele produktutviklingsprosessen.',
    exercises: [
      {
        id: 'IP10-1',
        icon: '🎯',
        title: 'Innovasjonsforståelse',
        question: 'En hotellkjede sier "Vi innoverer" fordi de byttet til digitale menyer. En konkurrent lanserer et nytt helårs-aktivitetsprogram som åpner et helt nytt kundesegment. Hva skiller de to?',
        choices: [
          { id: 'a', label: 'Ingenting — begge innoverer', isCorrect: false, feedback: 'Begge innoverer, men på fundamentalt ulike nivåer.' },
          { id: 'b', label: 'Den første driver inkrementell (prosesforbedring), den andre driver radikal/strategisk innovasjon som åpner nye markeder', isCorrect: true, feedback: 'Riktig! Digital meny er inkrementell prosesforbedring. Nytt helårsprogram er strategisk innovasjon som endrer bedriftens posisjon i markedet.' },
          { id: 'c', label: 'Den andre er risikofri, den første er risikofull', isCorrect: false, feedback: 'Tvert imot — det nye aktivitetsprogrammet innebærer høyere risiko (og potensielt høyere avkastning).' },
        ],
        espenTip: 'Inkrementell innovasjon gir trygg, gradvis forbedring. Strategisk innovasjon åpner nye markeder — men krever mer mot og kapital.',
      },
    ],
  },
]

export default function InnovasjonProduktutviklingModule() {
  return (
    <DrawerModule
      moduleCode="MK-VG2-3"
      moduleTitle="Innovasjon og produktutvikling"
      moduleIcon="💡"
      storageKey="learning-vg2-innovasjon-produktutvikling"
      completeRoute="/learning/vg2/kommunikasjon/innovasjon-produktutvikling/complete"
      phases={phases}
      intro="Fra idé til verdi — forstå innovasjonsprosessen, skille inkrementell fra radikal innovasjon, og se hvordan Scandic og Trysil innoverer i praksis."
      vissteduAt="En idé blir ikke innovasjon før den tas i bruk og skaper verdi. Tusenvis av gode idéer dør i gjennomføringsfasen — det er der det virkelige arbeidet begynner."
      espenSier="Innovasjon er ikke for de store. En kafé som introduserer takeaway-abonnement, innoverer. Spør deg alltid: hva kan vi gjøre litt bedre eller litt annerledes?"
      presentationLink={{ route: '/learning/presentations/innovasjon-produktutvikling', description: 'Innovasjon og produktutvikling — en visuell presentasjon' }}
    />
  )
}
