import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const MARKEDSFORINGFAG_EXERCISES: QuizExercise[] = [
  {
    id: 'mf_1',
    icon: '🎯',
    title: 'Markedsorientering i praksis',
    context: 'Et norsk sportsutstyrsfirma vurderer to strategier: A) Produsere det de er gode på og finne kunder for det, eller B) Undersøke hva aktive nordmenn savner og utvikle produkter basert på det.',
    question: 'Hva kjennetegner en markedsorientert bedrift?',
    choices: [
      { id: 'a', label: 'Bedriften fokuserer på å produsere mest mulig effektivt', isCorrect: false, feedback: 'Det er produksjonsorientering — fokus på intern effektivitet, ikke på hva markedet vil ha. En markedsorientert bedrift starter med kundebehovet, ikke produksjonen.' },
      { id: 'b', label: 'Bedriften undersøker kundebehov og tilpasser produktet deretter', isCorrect: true, feedback: 'Riktig! En markedsorientert bedrift starter alltid med spørsmålet "hva trenger kunden?" — og lar svaret styre produktutvikling og kommunikasjon.' },
      { id: 'c', label: 'Bedriften bruker mest mulig ressurser på reklame og salg', isCorrect: false, feedback: 'Det er salgsorientering — troen på at nok reklame kan selge hva som helst. Markedsorientering handler om å forstå og møte kundebehov, ikke å presse produkter på folk.' },
      { id: 'd', label: 'Bedriften følger konkurrentenes priser og produkter tett', isCorrect: false, feedback: 'Det er konkurranseorientering, ikke markedsorientering. Markedsorienteringen retter blikket mot kundene — ikke konkurrentene.' },
    ],
    espenTip: 'Huskeregel: Markedsorientert = "Hva vil kunden ha?" Produktorientert = "Hvem kan vi selge dette til?" Spørsmålet du stiller FØRST avgjør alt.',
  },
  {
    id: 'mf_2',
    icon: '📼',
    title: 'Blockbuster vs Netflix',
    context: 'Blockbuster hadde i 2004 over 9 000 butikker globalt, 60 000 ansatte og dominerte videomarkedet. I 2010 gikk de konkurs. Netflix, som startet med DVD i posten i 1997, har i dag over 260 millioner abonnenter.',
    question: 'Hva var Blockbusters fundamentale strategiske feil?',
    choices: [
      { id: 'a', label: 'De hadde ikke teknologisk kompetanse til å utvikle en streamingplattform', isCorrect: false, feedback: 'Teknologi var ikke problemet — Blockbuster forstod godt at digital distribusjon kom. De valgte bevisst å ikke satse på det fordi det ville kannibalisere butikkenes inntekter. Det var en strategisk, ikke teknologisk feil.' },
      { id: 'b', label: 'De fokuserte på å beskytte eksisterende forretningsmodell fremfor å løse kundens reelle behov', isCorrect: true, feedback: 'Riktig! Blockbuster visste at kundene hatet sen-gebyrer og ville ha bekvemmelighet. Men de beskyttet butikkmodellen fremfor å følge kunden. Netflix løste det kundene faktisk ville ha — ingen sen-gebyrer, ingen biltur.' },
      { id: 'c', label: 'De hadde for lite kapital til å investere i ny teknologi', isCorrect: false, feedback: 'Blockbuster var et milliardselskap — kapital var ikke problemet. De hadde faktisk tilbud om å kjøpe Netflix i 2000 for 50 millioner dollar, men avslo. Problemet var strategi og vilje til endring, ikke penger.' },
      { id: 'd', label: 'Netflix stjal kunder fra Blockbuster ved hjelp av uetisk konkurranse', isCorrect: false, feedback: 'Netflix vant rettferdig ved å løse et reelt kundeproblem bedre. Ingen sen-gebyrer, hjemlevering, og senere streaming. Det er ikke uetisk — det er markedsorientering i praksis.' },
    ],
    espenTip: 'Blockbuster tilbød Netflix 50 millioner dollar i 2000 — og avslo. Netflix er i dag verdt over 200 milliarder dollar. Historiens dyreste "nei".',
  },
  {
    id: 'mf_3',
    icon: '🤝',
    title: 'Relasjonsmarkedsføring',
    context: 'En bank vurderer to tilnærminger: A) Maksimere antall nye kontoåpninger per kvartal, eller B) Bygge lojalitet hos eksisterende kunder gjennom personlig rådgivning, gode betingelser og proaktiv kontakt.',
    question: 'Hva er relasjonsmarkedsføring?',
    choices: [
      { id: 'a', label: 'Markedsføring via sosiale medier og digitale relasjonsplattformer', isCorrect: false, feedback: 'Sosiale medier er en kanal, ikke en strategi. Relasjonsmarkedsføring handler om å bygge varige kunderelasjoner — det kan skje gjennom sosiale medier, men det er ikke definisjonen.' },
      { id: 'b', label: 'Strategi for å bygge langsiktige, lønnsomme kunderelasjoner fremfor engangssalg', isCorrect: true, feedback: 'Riktig! Relasjonsmarkedsføring er en filosofi om at det er mer lønnsomt å beholde og utvikle eksisterende kunder enn å jakte på nye. CLV (Customer Lifetime Value) er nøkkeltallet.' },
      { id: 'c', label: 'Bruk av kjendiser og influencere for å bygge merkevarerelasjon', isCorrect: false, feedback: 'Det er influencer-markedsføring — en taktikk, ikke en strategi. Relasjonsmarkedsføring handler om direkte relasjoner mellom bedrift og kunde over tid.' },
      { id: 'd', label: 'Kundeklubber og lojalitetsprogrammer som Coops-kort og SAS EuroBonus', isCorrect: false, feedback: 'Lojalitetsprogrammer er verktøy for relasjonsmarkedsføring, men de er ikke definisjonen. Relasjonsmarkedsføring er den overordnede strategien om å prioritere langsiktige kunderelasjoner — lojalitetsprogrammer er ett av mange virkemidler.' },
    ],
    espenTip: 'Det koster 5-7x mer å skaffe en ny kunde enn å beholde en eksisterende. Likevel bruker de fleste bedrifter mer på nykundeakkvisisjon enn på kundepleie. Tenk på det.',
  },
  {
    id: 'mf_4',
    icon: '🏢',
    title: 'Interessentanalyse',
    context: 'Equinor planlegger å åpne en ny gassterminal utenfor en norsk kystby. Prosjektet skaper arbeidsplasser, men kan påvirke lokalt fiske og turisme. Ulike grupper har ulike meninger om prosjektet.',
    question: 'Hvem er en bedrifts interessenter (stakeholders)?',
    choices: [
      { id: 'a', label: 'Kun aksjonærer og investorer som har finansiell interesse i bedriften', isCorrect: false, feedback: 'Aksjonærer er viktige interessenter, men langt fra de eneste. Interessentbegrepet er bredere: alle som påvirker eller påvirkes av bedriften, inkludert ansatte, kunder, lokalsamfunn og myndigheter.' },
      { id: 'b', label: 'Alle som påvirker eller påvirkes av bedriftens aktiviteter, inkl. ansatte, kunder, leverandører og samfunnet', isCorrect: true, feedback: 'Riktig! Interessentanalyse kartlegger alle parter med en "stake" (andel/interesse) i bedriftens aktiviteter — ikke bare de med finansiell interesse, men alle som berøres.' },
      { id: 'c', label: 'Kun interne parter som ansatte og ledelse', isCorrect: false, feedback: 'Ansatte og ledelse er interne interessenter, men interessentbegrepet inkluderer også eksterne: kunder, leverandører, lokalsamfunn, medier, myndigheter og konkurrenter.' },
      { id: 'd', label: 'Kunder og leverandører som bedriften har kontrakter med', isCorrect: false, feedback: 'Kontraktspartnere er interessenter, men definisjonen er bredere. Et fiskemiljø uten kontrakt med Equinor er likevel en interessent hvis planen påvirker fiskemulighetene deres.' },
    ],
    espenTip: 'Patagonia bruker interessentanalyse i ALLE produktbeslutninger — ikke bare kunder og investorer, men miljø og lokalsamfunn. Det har gjort dem til ett av verdens mest verdsatte merkevarer.',
  },
  {
    id: 'mf_5',
    icon: '💰',
    title: 'Customer Lifetime Value',
    context: 'En kaffebar beregner at en typisk kunde besøker dem 3 ganger per uke, bruker 50 kr per besøk, og er lojal i gjennomsnitt 4 år. En ny kunde koster 200 kr å skaffe gjennom markedsføring.',
    question: 'Hva menes med CLV (Customer Lifetime Value)?',
    choices: [
      { id: 'a', label: 'Total fortjeneste bedriften tjener i løpet av ett regnskapsår', isCorrect: false, feedback: 'Det er årsresultat, ikke CLV. CLV er knyttet til en enkelt kundes verdi over hele kundeforholdet — ikke bedriftens totale resultat.' },
      { id: 'b', label: 'Total verdi en kunde gir bedriften gjennom hele kundeforholdet', isCorrect: true, feedback: 'Riktig! CLV = gjennomsnittlig kjøp × kjøpsfrekvens × kundeforhold-lengde. I kaffebar-eksemplet: 50 kr × 3/uke × 52 uker × 4 år = 31 200 kr. Å bruke 200 kr på å skaffe denne kunden er en svært god investering!' },
      { id: 'c', label: 'Prisen en kunde er villig til å betale for et produkt', isCorrect: false, feedback: 'Det er betalingsvilje (willingness to pay), ikke CLV. CLV handler om den totale verdien over hele relasjonen — ikke prisen på ett enkelt kjøp.' },
      { id: 'd', label: 'Kostnaden ved å skaffe en ny kunde gjennom markedsføring', isCorrect: false, feedback: 'Det er Customer Acquisition Cost (CAC), ikke CLV. CLV og CAC brukes sammen: hvis CLV er mye høyere enn CAC, er markedsføringen lønnsom. I eksemplet: CLV 31 200 kr vs. CAC 200 kr = svært lønnsomt!' },
    ],
    espenTip: 'Amazon Prime-kunder har dobbelt så høy CLV som ikke-Prime-kunder. Derfor "mister" Amazon penger på Prime-fordeler — de investerer i å øke CLV. Genialiteten ligger i det langsiktige perspektivet.',
  },
]
