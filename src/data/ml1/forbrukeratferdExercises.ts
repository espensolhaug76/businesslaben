import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const FORBRUKERATFERD_EXERCISES: QuizExercise[] = [
  {
    id: 'fb_1',
    icon: '🔍',
    title: 'Kjøpsprosessens faser',
    context: 'Kari merker at bildekk blir glatte og at snøen er på vei. Hun åpner Google og søker "beste vinterdekk 2024 SUV" og begynner å lese tester og sammenligninger fra NAF og Hjulet.no.',
    question: 'I hvilken fase av kjøpsprosessen befinner Kari seg?',
    choices: [
      { id: 'a', label: 'Fase 1 — Bevisstgjøring, hun innser at hun trenger nye dekk', isCorrect: false, feedback: 'Kari har allerede passert bevisstgjøringsfasen — hun vet at hun trenger vinterdekk. Bevisstgjøring skjer i det øyeblikket hun innser behovet (da hun merket at dekkene var glatte). Nå søker hun aktivt informasjon.' },
      { id: 'b', label: 'Fase 2 — Informasjonssøk, etter at hun har identifisert behovet', isCorrect: true, feedback: 'Riktig! Kari er i fase 2 — Informasjonssøk. Hun har allerede identifisert behovet (fase 1), og søker nå aktivt ekstern informasjon via Google, NAF-tester og anmeldelser for å finne det beste alternativet.' },
      { id: 'c', label: 'Fase 3 — Vurdering av alternativer, hun sammenligner dekkmerker', isCorrect: false, feedback: 'Vurderingsfasen (fase 3) skjer etter at hun har samlet informasjon. Når Kari begynner å sammenligne Michelin vs. Continental vs. Pirelli direkte mot hverandre på kriterier som pris og ytelse — da er hun i fase 3. Nå søker hun fortsatt bredt.' },
      { id: 'd', label: 'Fase 4 — Kjøpsbeslutning, hun er klar til å kjøpe', isCorrect: false, feedback: 'Kjøpsbeslutningen (fase 4) skjer etter at hun har vurdert alternativene og valgt ett merke. Kari er ikke der ennå — hun søker fremdeles etter informasjon og har ikke begynt å sammenligne konkrete alternativer.' },
    ],
    espenTip: 'Huskeregel for kjøpsprosessen: Behov → Søk → Vurder → Kjøp → Evaluer. Markedsførere som kun fokuserer på kjøpsøyeblikket (fase 4) taper mot dem som er til stede i alle faser — spesielt søkefasen.',
  },
  {
    id: 'fb_2',
    icon: '🧠',
    title: 'Kognitiv dissonans',
    context: 'Petter kjøpte en iPhone 15 Pro for 14 000 kr. Dagen etter begynner han å lure på om han burde ha valgt Samsung Galaxy S24 i stedet — nå er han usikker på om han tok riktig valg. Han søker på nettet etter sammenligninger og leser anmeldelser som bekrefter at iPhonen er best.',
    question: 'Hva er kognitiv dissonans etter et kjøp?',
    choices: [
      { id: 'a', label: 'En kognitiv prosess der kunden rasjonelt evaluerer kjøpets kvalitet', isCorrect: false, feedback: 'Kognitiv dissonans er ikke en nøytral evalueringsprosess — det er et ubehagelig psykologisk tilstand av tvil og angst. Petters Google-søk etter bekreftelse er et typisk symptom: han søker å redusere dissonansen, ikke objektivt evaluere.' },
      { id: 'b', label: 'Kjøpsangst — tvil om man tok riktig valg, som kan føre til retur og negativ omtale', isCorrect: true, feedback: 'Riktig! Kognitiv dissonans er den psykologiske spenningen mellom "jeg kjøpte X" og "kanskje Y var bedre". Det kan føre til retur, negativ Word-of-Mouth og frafall. Amazon bekjemper dette med rask levering og enkel retur — bekreft kjøpet raskt!' },
      { id: 'c', label: 'Positiv eufori etter et kjøp man er svært fornøyd med', isCorrect: false, feedback: 'Det er det motsatte av kognitiv dissonans. Positiv kjøpseufori kalles "buyer\'s high" og er det markedsførere streber etter å skape. Kognitiv dissonans er kjøpsangsten som oppstår etter dyre eller komplekse kjøp.' },
      { id: 'd', label: 'Kundens bevisste sammenligning av produkter etter kjøpet', isCorrect: false, feedback: 'Kognitiv dissonans er ikke en bevisst, rasjonell analyse — det er en emosjonell ubehagstilstand. At Petter søker etter bekreftelse (ikke objektiv sammenligning) er nettopp tegnet på dissonans: han vil ha bekreftet at han hadde rett.' },
    ],
    espenTip: 'Amazon sender bekreftelses-e-post umiddelbart etter kjøp, med leveringsdato og "smart valg"-meldinger. Alt designet for å redusere kognitiv dissonans — og dermed redusere returer og negativ omtale.',
  },
  {
    id: 'fb_3',
    icon: '👥',
    title: 'Ytre påvirkningsfaktorer',
    context: 'Forskning på kjøpsatferd viser at ulike faktorer påvirker forbrukernes valg i ulik grad. Kulturelle normer, sosiale grupper, familiemedlemmer og sosial klasse spiller alle inn — men ikke likt.',
    question: 'Hvilken ytre faktor påvirker kjøpsbeslutninger sterkest for de fleste forbrukere?',
    choices: [
      { id: 'a', label: 'Kultur — samfunnets normer og verdier styrer alle kjøp', isCorrect: false, feedback: 'Kultur er en viktig og bred påvirkningsfaktor, men den virker på makronivå. Innenfor samme kultur tar folk svært ulike kjøpsbeslutninger. Familie påvirker mer direkte og personlig enn den generelle kulturen man lever i.' },
      { id: 'b', label: 'Sosial klasse — inntekt og utdanning bestemmer hva vi kjøper', isCorrect: false, feedback: 'Sosial klasse påvirker kjøpsmønstre, men det er ikke den sterkeste faktoren for de fleste individuelle kjøp. To mennesker med samme inntekt kan ta svært ulike kjøpsbeslutninger basert på familiens preferanser og verdier.' },
      { id: 'c', label: 'Familie', isCorrect: true, feedback: 'Riktig! Familie er den sterkeste ytre påvirkningsfaktoren for de fleste forbrukere. Kjøpsvaner, merkevarepreferanser og forbruksverdier overføres fra foreldre til barn. Familiens mening er også avgjørende for store kjøp som hus, bil og feriereiser.' },
      { id: 'd', label: 'Referansegrupper som influencere og kjendiser', isCorrect: false, feedback: 'Referansegrupper er viktige, særlig for produkter som signaliserer tilhørighet (klær, sko, teknologi). Men for de fleste forbrukere er familiens direkte påvirkning sterkere enn influencere de aldri har møtt.' },
    ],
    espenTip: 'Merkevarer vet dette: IKEA retter reklame mot hele familien (viser familielykke). Leketøysprodusenter retter seg mot foreldre, ikke barn. Den som påvirker kjøpsbeslutningen er ikke alltid den som bruker produktet.',
  },
  {
    id: 'fb_4',
    icon: '🏢',
    title: 'Kjøpssenteret i B2B',
    context: 'Telenor vurderer å bytte sitt CRM-system (kundedatabasesystem). IT-avdelingen identifiserer behovet, salgssjefen skal bruke det daglig, innkjøpsavdelingen forhandler pris, CFO godkjenner budsjettet, og konsulenter gir faglige råd.',
    question: 'Hva er "kjøpssenteret" (buying center) i B2B?',
    choices: [
      { id: 'a', label: 'Den fysiske avdelingen eller bygningen der innkjøpsbeslutninger tas', isCorrect: false, feedback: 'Kjøpssenteret er ikke et fysisk sted — det er en konseptuell gruppe av mennesker med ulike roller i kjøpsprosessen. I Telenor-eksemplet er kjøpssenteret spredt på tvers av IT, salg, innkjøp og finans.' },
      { id: 'b', label: 'Gruppen av personer i en bedrift som er involvert i kjøpsbeslutningen', isCorrect: true, feedback: 'Riktig! Kjøpssenteret inkluderer alle med en rolle i B2B-kjøpet: initiativtaker (IT-avdelingen), bruker (salgssjefen), influencer (konsulenter), gatekeeper (innkjøp), beslutningstaker (CFO), og kjøper (innkjøpsavdelingen).' },
      { id: 'c', label: 'Direktøren eller styret som har det endelige budsjettet', isCorrect: false, feedback: 'Beslutningstakeren (CFO/styre) er én rolle i kjøpssenteret — men ikke hele kjøpssenteret. Et effektivt B2B-salg adresserer ALLE rollene: brukerne (funksjoner), influencerne (råd), gatekeeperne (tilgang) og beslutningstakerne (godkjenning).' },
      { id: 'd', label: 'Innkjøpsavdelingen som håndterer alle bedriftskjøp profesjonelt', isCorrect: false, feedback: 'Innkjøpsavdelingen er kjøperen — én av seks roller i kjøpssenteret. De håndterer selve transaksjonen, men påvirker ofte ikke den strategiske beslutningen om hva som skal kjøpes og fra hvem.' },
    ],
    espenTip: 'B2B-selgere som kun selger til innkjøpsavdelingen taper mot selgere som navigerer hele kjøpssenteret. LinkedIn er perfekt for dette — finn alle beslutningstakere og influencere og bygg relasjoner med dem alle.',
  },
  {
    id: 'fb_5',
    icon: '🔄',
    title: 'B2B vs. B2C kjøpsprosess',
    context: 'Sammenlign to kjøp: A) Nora kjøper en ny jakke på ZARA for 799 kr på impuls etter å ha sett den på Instagram. B) Statoil velger ny leverandør av industrikjemikalier i en 3-årskontrakt verdt 50 millioner kr.',
    question: 'Hva er den viktigste forskjellen mellom B2B og B2C kjøpsprosessen?',
    choices: [
      { id: 'a', label: 'B2B-kjøp er alltid dyrere enn B2C-kjøp', isCorrect: false, feedback: 'Pris er ikke den definerende forskjellen — det finnes dyre B2C-kjøp (eiendom, bil) og billige B2B-kjøp (kontorrekvisita). Den fundamentale forskjellen handler om beslutningsprosessen: hvem bestemmer, hvordan og hvor lang tid.' },
      { id: 'b', label: 'B2B-prosessen er mer rasjonell, lengre og involverer flere beslutningstakere', isCorrect: true, feedback: 'Riktig! B2B kjennetegnes av: rasjonell ROI-evaluering (ikke følelser), lang beslutningsprosess (3–18 måneder for store kjøp), og et kjøpssenter med mange involverte. B2C: ofte emosjonelt, raskt, én person bestemmer.' },
      { id: 'c', label: 'B2C-kjøp krever mer dokumentasjon og formelle prosesser', isCorrect: false, feedback: 'Det motsatte er sant. B2B-kjøp krever formell dokumentasjon: tilbudsforespørsler (RFQ), anbud, kontrakter, SLA-er, revisjoner. B2C-kjøp er typisk enkle og uformelle — Nora trenger ikke skrive en rapport om jakken hun kjøpte.' },
      { id: 'd', label: 'B2B-markedsføring bruker alltid sosiale medier, B2C bruker tradisjonelle medier', isCorrect: false, feedback: 'Begge bruker sosiale medier og tradisjonelle medier. LinkedIn er viktig for B2B, Instagram for mange B2C — men det handler om kanalvalg basert på målgruppe, ikke en fast regel om B2B vs. B2C.' },
    ],
    espenTip: 'I B2B-salg sier man: "Selg til hjernen, ikke til hjertet." ROI-kalkulatorer, case studies og tekniske spesifikasjoner er B2B-verktøy. I B2C selger du til hjertet — og hjernen rasjonaliserer etterpå.',
  },
]
