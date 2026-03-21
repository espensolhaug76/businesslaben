import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '🛍️ Spør alltid: dekker dette et reelt behov, eller er behovet skapt av markedsføringen?'

export const PRODUKT_BEHOV_EXERCISES: QuizExercise[] = [
  {
    id: 'pb-01',
    icon: '🔺',
    title: 'Maslows behovspyramide',
    context:
      'En kunde ser på to regnjakker: en ukjent merkevare til 499 kr og en Moncler-dunjjakke til 14 990 kr. Begge holder vann like bra. Kunden velger Moncler.',
    question: 'Hvilket behovsnivå i Maslows pyramide dekker Moncler-jakken som den billige jakken ikke dekker?',
    choices: [
      {
        id: 'a',
        label: 'Fysiologiske behov — kunden trenger varme og tørrhet.',
        isCorrect: false,
        feedback:
          'Feil. Fysiologiske behov handler om overlevelse: mat, varme og ly. Begge jakkene dekker dette behovet like godt. Prisen på Moncler-jakken kan ikke rettferdiggjøres med fysiologisk funksjon alene.',
      },
      {
        id: 'b',
        label: 'Trygghetsbehov — Moncler er et tryggere og mer holdbart merke.',
        isCorrect: false,
        feedback:
          'Feil. Trygghetsbehov handler om sikkerhet, stabilitet og forutsigbarhet. Selv om Moncler er et kvalitetsmerke, er det ikke trygghetsnivået som forklarer prisvalget — begge jakkene gir like god fysisk beskyttelse.',
      },
      {
        id: 'c',
        label: 'Anerkjennelsesbehov — Moncler-merket gir status og sosial prestisje.',
        isCorrect: true,
        feedback:
          'Riktig! Anerkjennelsesnivået (esteem needs) handler om status, prestisje og respekt fra andre. Moncler-jakken er et statussymbol som signaliserer velstand og god smak. Kunden kjøper ikke bare en jakke — de kjøper tilhørighet til en eksklusiv gruppe.',
      },
      {
        id: 'd',
        label: 'Selvrealisering — kunden uttrykker sin personlighet gjennom mote.',
        isCorrect: false,
        feedback:
          'Feil. Selvrealisering handler om å nå sitt fulle potensial og uttrykke sin innerste identitet. Selv om mote kan bidra til selvuttrykk, er det primære motivet for Moncler-kjøpet statusen og anerkjennelsen fra omgivelsene.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pb-02',
    icon: '💡',
    title: 'Reelle vs skapte behov',
    context:
      'Apple lanserer iPhone 16. Mange kunder som allerede har en fungerende iPhone 15 stiller seg i kø for å kjøpe den nye modellen. Den største nyheten er en litt bedre kamera og en ny farge.',
    question: 'Hva beskriver best hva Apple gjør med iPhone-markedsføringen?',
    choices: [
      {
        id: 'a',
        label: 'Apple dekker et reelt behov, fordi alle trenger en telefon.',
        isCorrect: false,
        feedback:
          'Feil. At alle trenger en telefon er et reelt behov — men dette behovet er allerede dekket av iPhone 15. Det nye behovet (for iPhone 16 spesifikt) er ikke reelt; kunden klarte seg fint uten den nye modellen.',
      },
      {
        id: 'b',
        label: 'Apple skaper et behov gjennom markedsføring, trender og FOMO — et skapt behov.',
        isCorrect: true,
        feedback:
          'Riktig! Apple er mestre i å skape behov. Gjennom hype, influencer-markedsføring og FOMO (fear of missing out) får Apple kunder til å ønske seg noe de ikke egentlig trenger. Kunden med iPhone 15 har et skapt behov for iPhone 16.',
      },
      {
        id: 'c',
        label: 'Apple tilfredsstiller trygghetsbehovet fordi ny telefon er mer sikker.',
        isCorrect: false,
        feedback:
          'Feil. Sikkerhet kan være en faktor, men det forklarer ikke hvorfor folk stiller i kø for en litt bedre kamera. Sikkerhetsoppdateringer er tilgjengelig for eldre modeller også.',
      },
      {
        id: 'd',
        label: 'Apple løser et funksjonelt problem fordi iPhone 15 er for gammel.',
        isCorrect: false,
        feedback:
          'Feil. En ett år gammel iPhone 15 er ikke funksjonelt utdatert. Oppfatningen av at den er "gammel" er i seg selv et resultat av Apples markedsføring — det er nettopp et skapt behov.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pb-03',
    icon: '📦',
    title: 'Produktets tre nivåer',
    context:
      'Du jobber i en butikk som selger Rolex-klokker. En kunde spør: "Hvorfor koster en Rolex Submariner 90 000 kr? Den viser jo bare klokken, akkurat som en klokke til 500 kr."',
    question: 'Hvilken forklaring bruker produktets tre nivåer best til å svare kunden?',
    choices: [
      {
        id: 'a',
        label: '"Rolex er laget av bedre materialer, så den er mer nøyaktig og holdbar."',
        isCorrect: false,
        feedback:
          'Feil. Dette forklarer kun det faktiske produktnivået (materialer og funksjon). Du nevner ikke kjernenytten eller det utvidede produktet — og du svarer ikke på hvorfor kunden egentlig betaler 90 000 kr.',
      },
      {
        id: 'b',
        label: '"En Rolex er egentlig ikke en klokke — kjernenytten er status og arv. Selve klokken er det faktiske produktet, men 90 000 kr betaler du for merkets historie, service og sosial signalverdi."',
        isCorrect: true,
        feedback:
          'Riktig! Du beskriver alle tre nivåer: Kjernenytte (status, arv, selvrealisering), Faktisk produkt (klokken med sveitsisk mekanikk) og Utvidet produkt (livslang service, eksklusivitet, arvestykke). Ingen kjøper en Rolex bare for å se klokken.',
      },
      {
        id: 'c',
        label: '"Rolex har bedre kundeservice og lengre garanti enn billige klokker."',
        isCorrect: false,
        feedback:
          'Feil. Du nevner bare det utvidede produktnivået (garanti og service). Dette er én del av forklaringen, men du hopper over kjernenytten — som er den egentlige grunnen til at Rolex er verdt 90 000 kr.',
      },
      {
        id: 'd',
        label: '"Rolex er et eksklusivt merke, og prisen skyldes at de produserer færre klokker."',
        isCorrect: false,
        feedback:
          'Feil. Begrenset produksjon er en faktor, men det forklarer ikke de tre produktnivåene. Du sier heller ikke noe om hva kunden faktisk kjøper (kjernenytte og utvidet produktverdi).',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pb-04',
    icon: '🍕',
    title: 'Sortimentsbredde og -dybde',
    context:
      'Grandiosa er Norges bestselgende pizza. Orkla har bygget et bredt sortiment rundt merket: original, glutenfri, mini, snacks og Grandiosa-saus. Rema 1000 har derimot én variant av sin egne-merkevare pizza i tre størrelser.',
    question: 'Hva er den korrekte beskrivelsen av Grandiosas sortimentsstrategi sammenlignet med Rema 1000s egne-merkevare?',
    choices: [
      {
        id: 'a',
        label: 'Grandiosa har stor sortimentsdybde; Rema 1000 har stor sortimentsbredde.',
        isCorrect: false,
        feedback:
          'Feil. Du blander begrepene. Grandiosa har mange ulike produktkategorier under ett merke (bredde), mens Rema 1000 har én kategori (pizza) i noen størrelser (dybde innen én kategori).',
      },
      {
        id: 'b',
        label: 'Grandiosa har stor sortimentsbredde; Rema 1000 har liten sortimentsdybde fordi de kun har tre størrelser.',
        isCorrect: false,
        feedback:
          'Delvis riktig om Grandiosa, men definisjonen av Rema 1000 er feil. Tre størrelser av én pizza-variant er lav bredde (én kategori) og moderat dybde (tre varianter). Det er ikke lav dybde — det er begrenset bredde.',
      },
      {
        id: 'c',
        label: 'Grandiosa har stor sortimentsbredde (mange kategorier: pizza, snacks, saus); Rema 1000 satser på dybde innen én kategori med fokus på pris.',
        isCorrect: true,
        feedback:
          'Riktig! Sortimentsbredde = antall ulike produktkategorier. Grandiosa strekker seg bredt (pizza, snacks, saus). Rema 1000s egne merkevare fokuserer heller på én kategori til lav pris — dette er en fokusert strategi mot prisbeviste kunder.',
      },
      {
        id: 'd',
        label: 'Begge merker har samme strategi — de prøver begge å nå flest mulig kunder.',
        isCorrect: false,
        feedback:
          'Feil. Strategiene er fundamentalt forskjellige. Grandiosa bruker merkestyrke og bredde for å forsvare høyere pris og bred appell. Rema 1000s egne merke bruker lavpris og enkelhet for å nå prisbeviste segmenter.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pb-05',
    icon: '🧠',
    title: 'Behov og markedsføring',
    context:
      'Et energidrikkmerke bruker 500 millioner kroner på sponsing av ekstremsporten, musikk-festivaler og gaming-turneringer. De selger i prinsippet sukkerholdig vann med koffein til 25 kr per boks.',
    question: 'Hva er den viktigste grunnen til at folk betaler premiumprisen for dette produktet fremfor et billig alternativ?',
    choices: [
      {
        id: 'a',
        label: 'Produktet smaker bedre og gir mer energi enn billigere alternativer.',
        isCorrect: false,
        feedback:
          'Feil. Blindtester viser at de fleste ikke kan skille energidrikker fra hverandre på smak. Energieffekten er primært koffein, som finnes i kaffe til en tiendedel av prisen. Den opplevde smaksforskjellen er i stor grad psykologisk.',
      },
      {
        id: 'b',
        label: 'Merket har bygget en identitet og livsstil gjennom markedsføring som kunden ønsker å assosieres med.',
        isCorrect: true,
        feedback:
          'Riktig! Energidrikker selger ikke bare koffein — de selger en identitet. Gjennom ekstremsport, musikk og gaming-sponsing skaper merket en livsstilsassosiasjon. Kunden betaler for å tilhøre denne kulturen, ikke for sukkervann. Dette er et skapt behov på anerkjennelsesnivå.',
      },
      {
        id: 'c',
        label: 'Flasken og emballasjen er bedre designet og mer praktisk enn konkurrentene.',
        isCorrect: false,
        feedback:
          'Feil. Emballasje er det faktiske produktnivået og kan forklare noe, men det rettferdiggjør ikke en premiumspris på 5–10 ganger mer enn et tilsvarende produkt. Designet er en del av merkeidentiteten, men er ikke primærforklaringen.',
      },
      {
        id: 'd',
        label: 'Ingrediensene er høyere kvalitet og mer naturlige enn i billige merkevarer.',
        isCorrect: false,
        feedback:
          'Feil. De fleste energidrikker inneholder de samme basisingrediensene: koffein, taurin, B-vitaminer og sukker. Det er ikke ingrediensforskjellen som skaper prispremien — det er merkevarebyggingen og den tilknyttede livsstilen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
