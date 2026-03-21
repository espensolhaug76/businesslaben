import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const PRISSTRATEGI_ML1_EXERCISES: QuizExercise[] = [
  {
    id: 'pml_1',
    icon: '✈️',
    title: 'Priselastisitet for flyreiser',
    context: 'Ryanair øker prisene med 10% på en populær rute. Analysen viser at billettssalget faller med 15%. En parallell rute med togalternativ tilbyr lignende reisetid til halvparten av prisen.',
    question: 'En 10% prisøkning på Ryanair-billetter fører til 15% salgsfall. Hva er priselastisiteten?',
    choices: [
      { id: 'a', label: 'Uelastisk (|E| = 0,67) — etterspørselen er lite sensitiv for prisendringer', isCorrect: false, feedback: 'Uelastisk betyr at salget faller MINDRE enn prisøkningen (|E| < 1). Her faller salget MER (15%) enn prisøkningen (10%), som gir |E| = 1,5. Det er elastisk etterspørsel.' },
      { id: 'b', label: 'Nøytral elastisitet (|E| = 1) — prisendring gir proporsjonal salgsendring', isCorrect: false, feedback: 'Nøytral elastisitet (|E| = 1) ville bety at 10% prisøkning gir nøyaktig 10% salgsfall. Her er salgsfallet 15%, som gir E = 15/10 = 1,5. Det er over 1, altså elastisk.' },
      { id: 'c', label: 'Elastisk (|E| = 1,5) — etterspørselen er sensitiv for prisendringer', isCorrect: true, feedback: 'Riktig! E = %ΔQ / %ΔP = 15% / 10% = 1,5. Siden |E| > 1 er etterspørselen elastisk. Flyreiser har elastisk etterspørsel fordi det finnes substitutter (tog, buss, bil) og kundene er prisfølsomme.' },
      { id: 'd', label: 'Perfekt elastisk (|E| = ∞) — kundene bytter umiddelbart ved minste prisøkning', isCorrect: false, feedback: 'Perfekt elastisitet betyr at enhver prisøkning driver salget til null — noe som ikke er realistisk her. E = 1,5 er elastisk, men ikke perfekt elastisk. Noen kunder er villige til å betale mer for bekvemmelighet.' },
    ],
    espenTip: 'Formelen E = %ΔQ / %ΔP: Teller er salgsendring, nevner er prisendring. Over 1 = elastisk (sensitiv). Under 1 = uelastisk (robust). Flyreiser er elastiske; insulin er uelastisk.',
  },
  {
    id: 'pml_2',
    icon: '📱',
    title: 'Apples prisingsmetode',
    context: 'En Apple iPhone 15 Pro koster omtrent 420 dollar å produsere (komponenter, arbeidskraft, logistikk). Apple selger den for 1 199 dollar i USA. Apple bruker ingen prisberegning basert på produksjonskost + margin.',
    question: 'Apple setter iPhone-prisen basert på hva kunder er villige til å betale, ikke produksjonskostnaden. Hvilken prisingsmetode er dette?',
    choices: [
      { id: 'a', label: 'Kostbasert prising — kostnad pluss ønsket fortjenestemargin', isCorrect: false, feedback: 'Kostbasert prising tar utgangspunkt i produksjonskostnaden og legger til en markup. Apple gjør det motsatte: de starter med hva markedet vil betale, ikke hva det koster å produsere.' },
      { id: 'b', label: 'Verdibasert prising — prissetter etter opplevd kundeverdi', isCorrect: true, feedback: 'Riktig! Verdibasert prising betyr at prisen settes basert på kundens opplevde verdi — ikke produksjonskostnaden. Apple-kunder betaler for merkevare, design og økosystem, ikke bare for hardware.' },
      { id: 'c', label: 'Konkurransebasert prising — matcher konkurrentenes priser', isCorrect: false, feedback: 'Konkurransebasert prising ville bety at Apple matchet Samsung eller andre Android-produsenter. Apple priser konsekvent over konkurrentene — fordi de har en merkevareverdi som gjør det mulig.' },
      { id: 'd', label: 'Dynamisk prising — prisen justeres automatisk basert på etterspørsel', isCorrect: false, feedback: 'Dynamisk prising endrer prisen i sanntid (som flyselskaper og hoteller). Apple holder konsistente priser ved lansering — verdibasert prising, ikke dynamisk.' },
    ],
    espenTip: 'Verdibasert prising gir de beste marginene, men krever sterk merkevare og god kundeinnsikt. Apple demonstrerer dette perfekt: 60% fortjenestemargin er unikt i mobilbransjen.',
  },
  {
    id: 'pml_3',
    icon: '⚓',
    title: 'Anchoring i prispsykologi',
    context: 'En møbelbutikk priser en sofa til "ordinær pris 12 000 kr, nå 6 000 kr". En kaffebar har tre størrelser: liten 35 kr, medium 45 kr, stor 49 kr. Starbucks bruker betegnelsene "tall", "grande" og "venti" istedenfor small/medium/large.',
    question: 'Hva er "anchoring" i prispsykologi?',
    choices: [
      { id: 'a', label: 'At kunder ankrer til laveste pris og alltid velger billigste alternativ', isCorrect: false, feedback: 'Anchoring handler ikke om at folk velger billigst — det handler om at den FØRSTE prisen de ser setter referansepunktet. Faktisk er konsekvensen ofte at folk velger mellom-alternativet som ser "rimelig" ut mot ankeret.' },
      { id: 'b', label: 'Den første prisen man ser setter referansepunkt — alt sammenlignes med dette ankeret', isCorrect: true, feedback: 'Riktig! Anchoring: den første prisen du eksponeres for setter hjernen din i et referansepunkt. "Fra 12 000, nå 6 000!" — uten 12 000-ankeret ville 6 000 bare vært "6 000 kr". Med ankeret er det "halvpris" — en psykologisk gevinst.' },
      { id: 'c', label: 'At kunder alltid velger midtprisalternativet uansett hva prisene er', isCorrect: false, feedback: 'Det du beskriver kalles "compromise effect" eller decoy pricing, ikke anchoring. Anchoring handler spesifikt om referansepunktets rolle — den første prisen som setter forventninger.' },
      { id: 'd', label: 'At høy pris alltid signaliserer høy kvalitet og øker salget', isCorrect: false, feedback: 'Prisen som kvalitetssignal er ett aspekt av prispsykologi, men det er ikke anchoring. Anchoring handler om den første prisen som referansepunkt — den kan være høy (for å gjøre resten billig) eller lav.' },
    ],
    espenTip: 'Anchoring brukes overalt: eiendomsmeglere viser dyreste eiendommer først, restauranter plasserer dyrest rett på menyen. Neste gang du ser "fra X, nå Y" — spør deg selv: hva er ankeret her?',
  },
  {
    id: 'pml_4',
    icon: '🎬',
    title: 'Prisdiskriminering på kino',
    context: 'Kinopolis tar 150 kr for voksne, 100 kr for studenter og 80 kr for barn for å se samme film i samme sal til samme tidspunkt. Produksjonskostnaden per sete er identisk uansett hvem som sitter der.',
    question: 'Kinoen tar 150 kr for voksne, 100 kr for studenter og 80 kr for barn for samme film. Hva er dette?',
    choices: [
      { id: 'a', label: '1. grads prisdiskriminering — personlig prising basert på individuell betalingsvillighet', isCorrect: false, feedback: '1. grads prisdiskriminering betyr at HVER enkelt kunde betaler nøyaktig sin maksimale betalingsvillighet — en ekstremt finkornet og personlig prising. Kino-eksemplet bruker brede segmenter (student, barn), ikke individuell prising.' },
      { id: 'b', label: '2. grads prisdiskriminering — volumrabatt basert på kjøpsmengde', isCorrect: false, feedback: '2. grads prisdiskriminering gir rabatt basert på MENGDE kjøpt (jo mer du kjøper, jo billigere per enhet). Kinoen diskriminerer mellom KUNDEGRUPPER — ikke basert på volum. Det er 3. grads.' },
      { id: 'c', label: '3. grads prisdiskriminering — ulik pris til ulike segmenter basert på betalingsvillighet', isCorrect: true, feedback: 'Riktig! 3. grads prisdiskriminering betyr å segmentere kunder i grupper med ulik betalingsvillighet og prise ulikt til hver gruppe. Studenter og barn har lavere betalingsvillighet enn voksne — kinoen fanger verdi fra begge.' },
      { id: 'd', label: 'Dynamisk prising — prisene justeres basert på belegg og etterspørsel', isCorrect: false, feedback: 'Dynamisk prising endrer prisen basert på tid og etterspørsel (som flyselskaper). Kino-eksemplet har faste priser per kundegruppe — ikke tid-/etterspørselsstyrte priser. Det er segmentbasert prisdiskriminering.' },
    ],
    espenTip: 'Prisdiskriminering er LOVLIG og ekstremt vanlig: studentrabatt, honnørpris, barnepris, tidligbooking-pris. Alle disse er 3. grads diskriminering — selger det samme til ulik pris basert på betalingsvillighet.',
  },
  {
    id: 'pml_5',
    icon: '⚡',
    title: 'Dynamisk prising i praksis',
    context: 'En Uber-sjåfør sitter hjemme en lørdagskveld. Konserten i sentrum slutter kl. 23.00. Appen viser at prisen har økt 3,5x normalpris (surge pricing). 200 reisende venter på transport, men bare 30 sjåfører er tilgjengelige.',
    question: 'Hva er dynamisk prising?',
    choices: [
      { id: 'a', label: 'Å sette ulik pris for ulike kundesegmenter basert på alder og inntekt', isCorrect: false, feedback: 'Det er segmentbasert prisdiskriminering (3. grads), ikke dynamisk prising. Dynamisk prising handler om at prisen endres i SANNTID basert på etterspørsel og tilbud — ikke om hvem kunden er.' },
      { id: 'b', label: 'Priser justeres automatisk i sanntid basert på etterspørsel, kapasitet og konkurranse', isCorrect: true, feedback: 'Riktig! Dynamisk prising er algoritmisk prissetting i sanntid. Uber surge pricing er et klassisk eksempel: høy etterspørsel → pris øker → flere sjåfører incentiviseres til å kjøre → balanse gjenopprettes.' },
      { id: 'c', label: 'Å endre prisen sesongbasert — høyere om sommeren, lavere om vinteren', isCorrect: false, feedback: 'Sesongprising er en enkel form for prisjustering, men det er ikke dynamisk prising. Dynamisk prising er kontinuerlig, algoritmedrevet sanntids-optimering — ikke forhåndsprogrammerte sesongpriser.' },
      { id: 'd', label: 'Priskonkurranse der bedrifter konstant underslår hverandre for å vinne markedsandel', isCorrect: false, feedback: 'Det er en priskrig, ikke dynamisk prising. Dynamisk prising er internt optimering av egne priser basert på data — ikke å reagere på konkurrenters prising for å slå dem.' },
    ],
    espenTip: 'Amazon endrer priser 2,5 millioner ganger per dag. En algoritme overvåker konkurrenter, lager og etterspørsel kontinuerlig. For forbrukere: sjekk priser på ulike tider — morgen og natt er ofte billigst.',
  },
]
