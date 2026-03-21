import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ Konflikter løst tidlig koster minst. Ignorerte konflikter koster mest!'

export const KONFLIKTHANDTERING_EXERCISES: QuizExercise[] = [
  {
    id: 'konf-01',
    icon: '💼',
    title: 'Konflikter mellom ansatte',
    context: 'To erfarne selgere hos XXL krangler om hvem som "eier" en stor bedriftskunde som begge har hatt kontakt med. De nekter å snakke sammen.',
    question: 'Hva bør leder gjøre?',
    choices: [
      {
        id: 'a',
        label: 'Bestem hvem som vant og gi kunden til den med lengst ansiennitet.',
        isCorrect: false,
        feedback: 'Feil. Å "vinne" uten systemendring løser ikke den underliggende årsaken — mangel på klare kundeansvar-regler.',
      },
      {
        id: 'b',
        label: 'Ignorer konflikten — voksne folk ordner det selv.',
        isCorrect: false,
        feedback: 'Feil. Ignorerte konflikter eskalerer. Forskning viser at konflikter som ikke håndteres innen 2 uker, sjelden løser seg selv.',
      },
      {
        id: 'c',
        label: 'Innfør et CRM-system med klare kundeansvarsregler, snakk med begge og fastsett regler fremover.',
        isCorrect: true,
        feedback: 'Riktig! Konflikten er et symptom på et systemfeil (manglende kundeansvarsstruktur). Fiks systemet + håndter personene. CRM + tydelige regler hindrer gjentakelse.',
      },
      {
        id: 'd',
        label: 'Del kunden 50/50 mellom dem.',
        isCorrect: false,
        feedback: 'Midlertidig løsning som skaper nye problemer. Hvem tar beslutninger? Hvem kontakter kunden? Uklarheten fortsetter.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'konf-02',
    icon: '😤',
    title: 'Kunde vs. ansatt',
    context: 'En kunde skriker til en kassaansatt foran 10 andre kunder ved Coop. Den ansatte ser ut til å holde tårene tilbake.',
    question: 'Hva gjør lederen som er på gulvet?',
    choices: [
      {
        id: 'a',
        label: 'Vent til situasjonen roe seg av seg selv.',
        isCorrect: false,
        feedback: 'Feil. Å ikke gripe inn signaliserer til den ansatte at bedriften ikke støtter dem. Det er demoraliserende og uakseptabelt.',
      },
      {
        id: 'b',
        label: 'Be kunden forlate butikken umiddelbart.',
        isCorrect: false,
        feedback: 'For drastisk som første tiltak. Prøv å deeskalere og flytte situasjonen unna andre kunder først.',
      },
      {
        id: 'c',
        label: 'Gå til situasjonen, be kunden med deg til et rolig sted, la den ansatte komme unna, håndter kunden privat.',
        isCorrect: true,
        feedback: 'Riktig! Fjern konflikten fra publikum, beskytt den ansatte, håndter kunden privat. Etterpå: sjekk inn med den ansatte og tilby støtte.',
      },
      {
        id: 'd',
        label: 'Gi kunden kompensasjon umiddelbart for å roe situasjonen.',
        isCorrect: false,
        feedback: 'Feil. Å belønne aggressiv atferd lærer kunden at det lønner seg å skrike. Deeskalér først, vurder kompensasjon separat.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'konf-03',
    icon: '📦',
    title: 'Leverandørkonflikt',
    context: 'En leverandør av sportsutstyr til din butikk leverer feil varer for tredje gang på rad. Du vurderer å bytte leverandør.',
    question: 'Hva gjøres FØR du bytter?',
    choices: [
      {
        id: 'a',
        label: 'Bytt leverandør umiddelbart — tre feil er nok.',
        isCorrect: false,
        feedback: 'For raskt. Du bør gi formell advarsel med tidsfrist. Et bytte er kostbart og ta tid — det er verdt å prøve én siste gang.',
      },
      {
        id: 'b',
        label: 'Send en formell skriftlig klage med dokumentasjon, krev møte på direktørnivå, sett tydelig tidsfrist for forbedring.',
        isCorrect: true,
        feedback: 'Riktig! Formell klage med dokumentasjon + møte på riktig nivå + tidsfrist. Dette gir leverandøren én sjanse til å rette opp, og dokumenterer saken hvis du bytter.',
      },
      {
        id: 'c',
        label: 'Ring leverandørens selger og klage muntlig.',
        isCorrect: false,
        feedback: 'Ikke nok. Muntlige klager er vanskelige å dokumentere og går ofte ikke opp i systemet. Skriftlig dokumentasjon er nødvendig.',
      },
      {
        id: 'd',
        label: 'Ignorer feilene — alle leverandører gjør feil.',
        isCorrect: false,
        feedback: 'Feil. Tre feil på rad er et mønster, ikke en tilfeldighet. Det påvirker ditt lager, din service og dine kunder.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'konf-04',
    icon: '📊',
    title: 'Strategikonflikt i ledergruppa',
    context: 'Halvparten av ledergruppa hos Thon Hotels vil ekspandere med 3 nye hoteller. Den andre halvparten mener dere bør konsolidere og bli lønnsomme i eksisterende. Møtet er fastlåst.',
    question: 'Hva er beste fremgangsmåte?',
    choices: [
      {
        id: 'a',
        label: 'Stemme over saken — flertallet vinner.',
        isCorrect: false,
        feedback: 'Risikabelt for en strategisk beslutning. 50/50-stemme skaper vinnere og tapere, og taperne kan sabotere gjennomføringen.',
      },
      {
        id: 'b',
        label: 'Strukturert beslutningsmøte med databaserte presentasjoner fra begge sider + ekstern fasilitator + styrets avgjørelse.',
        isCorrect: true,
        feedback: 'Riktig! Store strategiske beslutninger trenger struktur, data og legitimitet. En ekstern fasilitator fjerner personlige dynamikker. Styret tar den endelige beslutningen.',
      },
      {
        id: 'c',
        label: 'La administrerende direktør bestemme alene for å bryte dødlåsen.',
        isCorrect: false,
        feedback: 'Mulig, men ikke optimalt. Uten forankring i ledergruppa vil gjennomføringen bli vanskelig.',
      },
      {
        id: 'd',
        label: 'Utsett beslutningen til neste kvartal for å samle mer data.',
        isCorrect: false,
        feedback: 'Utsettelse er sjelden svaret. Sørg heller for at riktig data presenteres på neste møte og ta beslutningen da.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'konf-05',
    icon: '🔔',
    title: 'Varsling',
    context: 'En ansatt varsler om at salgssjefen manipulerer salgsrapportene for å nå bonusmål. Salgssjefen er populær i bedriften.',
    question: 'Hva er riktig prosedyre for arbeidsgiver?',
    choices: [
      {
        id: 'a',
        label: 'Konfronter salgssjefen direkte med anklagen.',
        isCorrect: false,
        feedback: 'Feil. Arbeidsmiljøloven krever upartisk undersøkelse. Direkte konfrontasjon kan ødelegge bevis og true varsleren.',
      },
      {
        id: 'b',
        label: 'Ignorer varselet — det er sannsynligvis en intern rivalisering.',
        isCorrect: false,
        feedback: 'Ulovlig. Arbeidsmiljøloven §2A-3 krever at arbeidsgiver undersøker varsler forsvarlig. Ignorering er brudd på loven.',
      },
      {
        id: 'c',
        label: 'Ta varselet alvorlig, behandle det konfidensielt, la upartisk part (HR/revisor) undersøke, beskytt varsleren.',
        isCorrect: true,
        feedback: 'Riktig! Varsleren er beskyttet mot gjengjeldelse (aml §2A-4). Arbeidsgiver har omvendt bevisbyrde ved gjengjeldelse. Upartisk undersøkelse er lovpålagt.',
      },
      {
        id: 'd',
        label: 'Fortell varslerens kolleger slik at saken belyses fra flere sider.',
        isCorrect: false,
        feedback: 'Feil. Konfidensialitet er grunnleggende. Å spre informasjonen bryter tilliten og kan eksponere varsleren for gjengjeldelse.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
