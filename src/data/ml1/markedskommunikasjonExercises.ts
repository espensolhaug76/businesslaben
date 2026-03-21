import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const MARKEDSKOMMUNIKASJON_EXERCISES: QuizExercise[] = [
  {
    id: 'mk_1',
    icon: '📡',
    title: 'Støy i kommunikasjonsprosessen',
    context: 'Et norsk forsikringsselskap sender en e-post med tilbud om bilforsikring. Halvparten av mottakerne åpner aldri e-posten. Av de som åpner, forstår mange ikke hva "ansvarsforsikring vs. kaskoforsikring" betyr. Noen leser den mens de ser på TV og mister tråden.',
    question: 'Hva er "støy" i kommunikasjonsprosessen?',
    choices: [
      { id: 'a', label: 'Høy lydstyrke i reklamefilmer på TV', isCorrect: false, feedback: 'Høy lyd er ett eksempel på fysisk støy, men begrepet "støy" i kommunikasjonsteori er mye bredere. Det inkluderer teknisk støy (dårlig mottak), semantisk støy (misforståtte ord) og psykologisk støy (uinteressert mottaker) — alt som forstyrrer budskapsoverføringen.' },
      { id: 'b', label: 'Alt som forstyrrer overføringen av budskapet mellom sender og mottaker', isCorrect: true, feedback: 'Riktig! Støy er alt som hindrer budskapet i å nå frem slik avsenderen mente det. I eksempelet: e-posten som ikke åpnes (teknisk støy), misforstått fagterminologi (semantisk støy), og TV på i bakgrunnen (psykologisk støy).' },
      { id: 'c', label: 'Konkurrenters markedskommunikasjon som forstyrrer eget budskap', isCorrect: false, feedback: 'Konkurrenters kommunikasjon kan bidra til støy i forbrukerens hode (mange meldinger = forvirring), men støy i kommunikasjonsmodellen handler primært om forstyrrelser i selve overføringen av budskapet — ikke konkurranse.' },
      { id: 'd', label: 'Negative kundekommentarer og dårlige anmeldelser i sosiale medier', isCorrect: false, feedback: 'Negative kommentarer er feedback (tilbakemelding) i kommunikasjonsprosessen, ikke støy. Støy forstyrrer budskapet underveis — det er ikke det samme som negativ respons på et mottatt budskap.' },
    ],
    espenTip: 'Tre typer støy: Teknisk (nettet krasjer, dårlig lyd), Semantisk (misforstått tekst, ukjente begreper), Psykologisk (mottaker er uinteressert, distrahert). Den viktigste: psykologisk — vi ignorerer det meste.',
  },
  {
    id: 'mk_2',
    icon: '👁️',
    title: 'AIDA-modellens første steg',
    context: 'Norsk Tipping lanserer en ny reklamekampanje for ansvarlig spill. De vurderer to tilnærminger: A) En tradisjonell informasjonsbrosjyre med fakta om spilleavhengighet, eller B) En provoserende plakat med et uventet visuelt grep som stopper folk midt i gaten.',
    question: 'I AIDA-modellen — hva er FØRSTE steg og hva betyr det?',
    choices: [
      { id: 'a', label: 'Action (Handling) — å utløse kjøp eller respons fra kunden', isCorrect: false, feedback: 'Action er det SISTE steget i AIDA, ikke det første. Rekkefølgen er Attention → Interest → Desire → Action. Uten å fange oppmerksomheten først, er det umulig å komme til handling.' },
      { id: 'b', label: 'Attention (Oppmerksomhet) — å få kunden til å legge merke til kommunikasjonen', isCorrect: true, feedback: 'Riktig! Attention er AIDA-modellens første steg. Uten oppmerksomhet finnes det ikke interesse, ønske eller handling. Vi eksponeres for 4 000–10 000 reklamestimuli daglig — å bryte gjennom støyen er utfordringen.' },
      { id: 'c', label: 'Awareness (Bevissthet) — å skape bred kjennskap til produktet i markedet', isCorrect: false, feedback: 'Awareness er et nærliggende begrep, men AIDA-modellens første A står for "Attention" — oppmerksomhet. Awareness er mer et overordnet kommunikasjonsmål; Attention er det spesifikke øyeblikket kommunikasjonen fanger mottakeren.' },
      { id: 'd', label: 'Appeal (Appell) — å gjøre kommunikasjonen emosjonelt relevant for målgruppen', isCorrect: false, feedback: 'Appeal er ikke et steg i AIDA-modellen. AIDA-stegene er Attention, Interest, Desire, Action. Emosjonell appell er en teknikk som brukes i flere av stegene, men ikke et selvstendig steg.' },
    ],
    espenTip: 'AIDA i rekkefølge: Attention = "Se her!" → Interest = "Vil vite mer" → Desire = "Vil ha det" → Action = "Kjøper". Uten A finnes ikke resten. Det er derfor kreativ oppmerksomhetsfanging er så viktig.',
  },
  {
    id: 'mk_3',
    icon: '💰',
    title: 'Betalt vs. fortjent media',
    context: 'Fjordkraft kjøper TV-reklame for 2 millioner kroner og kjøre Google-annonser for 500 000 kroner. Samme uke vinner Fjordkraft en pris for beste kundeservice, og NRK lager en nyhetssak om det. Tusenvis av kunder deler nyhetssaken på Facebook.',
    question: 'Hva er forskjellen mellom betalt reklame (paid) og fortjent mediaomtale (earned)?',
    choices: [
      { id: 'a', label: 'Betalt er digitalt, fortjent er trykt — de skilles på medium', isCorrect: false, feedback: 'Skillet mellom paid og earned handler ikke om digitalt vs. trykt. Begge kan eksistere i alle medier. Skillet er om bedriften betaler for eksponeringen (paid) eller om den oppstår organisk basert på fortjeneste (earned).' },
      { id: 'b', label: 'Betalt er kontrollerbar men kostbar; fortjent er ikke-betalt eksponering som er mer troverdig', isCorrect: true, feedback: 'Riktig! Paid media er betalt og kontrollerbar (du bestemmer budskapet), men forbrukere vet at det er reklame. Earned media (presseomtale, deling) er ikke-betalt, ukontrollerbar, men oppfattes som langt mer troverdig.' },
      { id: 'c', label: 'Betalt er kortsiktig kampanje; fortjent er langsiktig merkevarebygging', isCorrect: false, feedback: 'Tidsperspektiv er ikke det primære skillet. Betalt reklame kan absolutt brukes til langsiktig merkevarebygging (som Coca-Colas kampanjer i 100 år). Skillet er betalingsforholdet og graden av kontroll.' },
      { id: 'd', label: 'Betalt media er ineffektivt; fortjent media er alltid mer effektivt', isCorrect: false, feedback: 'Det er ikke riktig å si at betalt alltid er dårligere. Betalt gir kontroll og forutsigbarhet. Fortjent er mer troverdig men uforutsigbart. Den beste strategien (PESO) kombinerer begge.' },
    ],
    espenTip: 'Huskeregel: Paid = du betaler for plassen. Earned = du fortjener omtalen. Owned = du eier kanalen. Shared = folk deler frivillig. PESO-modellen bruker alle fire i kombinasjon.',
  },
  {
    id: 'mk_4',
    icon: '🔴',
    title: 'Red Bull og innholdsmarkedsføring',
    context: 'Red Bull Media House produserer en Formel 1-dokumentar, sponser Felix Baumgartners hopp fra stratosfæren (14 millioner TV-seere), driver Servus TV (en TV-kanal), utgir Red Bulletin-magasinet og har 17 millioner YouTube-abonnenter. De selger energidrikk.',
    question: 'Red Bull produserer ekstremsporthendelser og dokumentarer. Hva kalles denne markedsføringsstrategien?',
    choices: [
      { id: 'a', label: 'Sponsing — Red Bull betaler for å knytte merkevaren til andre begivenheter', isCorrect: false, feedback: 'Sponsing er å betale for å assosiere merkevaren med andres arrangementer. Red Bull EIER og PRODUSERER sine egne medier og arrangementer — de er ikke sponsorer, de er innholdsprodusenter. Det er content marketing.' },
      { id: 'b', label: 'PR (Public Relations) — Red Bull skaper positiv medieomtale gjennom spektakulære hendelser', isCorrect: false, feedback: 'PR handler om å bygge relasjoner med mediene for å få omtale. Red Bull produserer sitt eget innhold og eier sine egne kanaler — det er innholdsmarkedsføring (content marketing), ikke PR. Selv om PR er en bieffekt.' },
      { id: 'c', label: 'Innholdsmarkedsføring (content marketing) — skape verdifullt innhold som tiltrekker målgruppen', isCorrect: true, feedback: 'Riktig! Innholdsmarkedsføring = skape innhold som målgruppen faktisk vil ha, fremfor å avbryte dem med reklame. Red Bull er den ultimate content marketer: de er i praksis et medieselskap som OGSÅ selger energidrikk.' },
      { id: 'd', label: 'Produktplassering — Red Bull plasserer produktet i underholdningsinnhold', isCorrect: false, feedback: 'Produktplassering er å sette produktet inn i andres innhold (en skuespiller drikker Red Bull i en film). Red Bull lager sitt EGET innhold fra bunnen av — det er innholdsmarkedsføring i stor skala, ikke produktplassering.' },
    ],
    espenTip: 'Red Bull bruker 30-40% av omsetningen på markedsføring — men mesteparten er innholdsmarkedsføring, ikke tradisjonell reklame. Resultatet: Red Bull er ikke bare en drikk, det er en livsstil og en mediebedrift.',
  },
  {
    id: 'mk_5',
    icon: '🔄',
    title: 'Integrert markedskommunikasjon (IMK)',
    context: 'IKEA kommuniserer "Du er hjemme hos IKEA" gjennom TV-reklame, den digitale katalogen, Instagram, butikkdesign, IKEA Family-appen og ukentlige e-posttilbud. Alle kanaler bruker samme visuell identitet, tone og budskap. En kunde opplever samme IKEA uansett kanal.',
    question: 'Hva er integrert markedskommunikasjon (IMK)?',
    choices: [
      { id: 'a', label: 'Å bruke flest mulig kommunikasjonskanaler for maksimal dekning', isCorrect: false, feedback: 'Mange kanaler alene er ikke IMK. Nøkkelorden er INTEGRASJON — kanalene må koordineres for å sende ett konsistent budskap. Mange ukordinerte kanaler gir forvirring, ikke integrert kommunikasjon.' },
      { id: 'b', label: 'Koordinering av alle kommunikasjonskanaler for å sende konsistent budskap til kunden', isCorrect: true, feedback: 'Riktig! IMK = ett konsistent budskap, én visuell identitet, én tone — på tvers av alle kanaler (TV, nett, sosiale medier, butikk, e-post). IKEA er et perfekt eksempel: uansett kanal møter du det samme IKEA.' },
      { id: 'c', label: 'Digital markedsføring som integrerer alle digitale plattformer', isCorrect: false, feedback: 'IMK er ikke begrenset til digitale kanaler — det inkluderer alle kommunikasjonskanaler inkludert TV, radio, fysisk butikk og trykt materiale. Digitalt er én del av IMK, ikke hele definisjonen.' },
      { id: 'd', label: 'Reklame som er integrert i produktet, som Nike-logoen på skoene', isCorrect: false, feedback: 'Produktmerking er ikke IMK. IMK er en strategisk tilnærming til å koordinere ALL kommunikasjon på tvers av kanaler — ikke å trykke logoen på produktet. Det er en helhetlig kommunikasjonsstrategi.' },
    ],
    espenTip: 'En kunde møter din bedrift på 8–12 touch points før kjøp. Hvert touch point er en sjanse til å styrke ELLER svekke merkevaren. IMK sikrer at alle touch points sender samme positive signal.',
  },
]
