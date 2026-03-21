import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ Det finnes alltid et udekket behov i markedet. Posisjoneringskartet hjelper deg finne det!'

export const POSISJONERING_EXERCISES: QuizExercise[] = [
  {
    id: 'pos-01',
    icon: '🗺️',
    title: 'Posisjoneringskartet',
    context: 'Du skal plassere norske dagligvarekjeder på et posisjoneringskartet med aksene Lavpris ↔ Premium og Lokal ↔ Nasjonal.',
    question: 'Hvilken plassering stemmer best for Kiwi og Meny?',
    choices: [
      {
        id: 'a',
        label: 'Kiwi = Premium/Nasjonal, Meny = Lavpris/Nasjonal.',
        isCorrect: false,
        feedback: 'Feil. Kiwi er NorgesGruppens lavpriskjede, ikke premium. Meny er premium-segmentet.',
      },
      {
        id: 'b',
        label: 'Kiwi = Lavpris/Nasjonal, Meny = Premium/Nasjonal.',
        isCorrect: true,
        feedback: 'Riktig! Kiwi er lavpris med nasjonal dekning. Meny posisjonerer seg som kvalitet og utvalg — Norges mest premium dagligvarekjede.',
      },
      {
        id: 'c',
        label: 'Kiwi = Lavpris/Lokal, Meny = Premium/Lokal.',
        isCorrect: false,
        feedback: 'Feil. Både Kiwi og Meny er nasjonale kjeder med butikker over hele Norge.',
      },
      {
        id: 'd',
        label: 'Begge er i samme posisjon — de konkurrerer i samme segment.',
        isCorrect: false,
        feedback: 'Feil. De har bevisst ulik posisjonering — Kiwi på pris, Meny på kvalitet og utvalg. Det er nettopp det som gjør dem til ulike merker.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pos-02',
    icon: '🎯',
    title: 'Gap i markedet',
    context: 'Du ser på posisjoneringskartet for norsk dagligvare. Kiwi, Rema 1000, Coop Prix er lavpris/nasjonal. Meny og Jacobs er premium/nasjonal.',
    question: 'Hvilken posisjon er tilsynelatende ledig?',
    choices: [
      {
        id: 'a',
        label: 'Lavpris/Lokal — en rimelig, lokalt eid dagligvare.',
        isCorrect: false,
        feedback: 'Delvis riktig, men dette segmentet har allerede Joker og Nærbutikken. Det er ikke et tydelig gap.',
      },
      {
        id: 'b',
        label: 'Premium/Nasjonal — enda en premiumbedrift nasjonalt.',
        isCorrect: false,
        feedback: 'Feil. Premium/Nasjonal er allerede dekket av Meny og Spar. Ingen tydelig gap her.',
      },
      {
        id: 'c',
        label: 'Premium/Lokal — kvalitetsprodukter med lokal identitet og kortreist profil.',
        isCorrect: true,
        feedback: 'Riktig! Premium + lokal er underrepresentert i norsk dagligvare. Matkooperativet og lignende konsepter prøver å fylle dette gapet.',
      },
      {
        id: 'd',
        label: 'Lavpris/Internasjonal — importerte lavprisprodukter.',
        isCorrect: false,
        feedback: 'Feil. "Internasjonal" er ikke en relevant dimensjon i den norske lokale dagligvarekonteksten.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pos-03',
    icon: '☕',
    title: 'Differensiering',
    context: 'En ny kaffekjede vil inn i Oslo-markedet. Starbucks (premium/internasjonal) og Kaffebrenneriet (premium/lokal) dominerer allerede.',
    question: 'Hva er den smarteste posisjoneringsstrategien?',
    choices: [
      {
        id: 'a',
        label: 'Kopier Starbucks-konseptet men billigere.',
        isCorrect: false,
        feedback: 'Feil. Priskrig mot en etablert aktør er sjelden bærekraftig. Du trenger differensiering, ikke kopiering.',
      },
      {
        id: 'b',
        label: 'Finn en udekket nisje: f.eks. raskeste kaffe (under 90 sekunder, kun to-go) for travle pendlere.',
        isCorrect: true,
        feedback: 'Riktig! I stedet for å konkurrere head-to-head, finn en posisjon ingen eier. "Raskest for pendlere" er konkret, målbart og møter et reelt behov.',
      },
      {
        id: 'c',
        label: 'Vær alt for alle — bredest mulig meny til alle prispunkter.',
        isCorrect: false,
        feedback: 'Feil. "Alt for alle" resulterer i at du betyr ingenting for noen. Posisjonering handler om å velge hva du IKKE er like mye som hva du er.',
      },
      {
        id: 'd',
        label: 'Bruk lavere priser enn alle konkurrenter.',
        isCorrect: false,
        feedback: 'Feil som langsiktig strategi. Lavpriskrig uten kostnadsfordel er ikke bærekraftig i kaffebransjen med høye råvarekostnader.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pos-04',
    icon: '✈️',
    title: 'Repositionering',
    context: 'Norwegian Airlines fikk sterkt skadet omdømme etter konkursen i 2020. De ønsker å repositionere seg som "pålitelig og moderne".',
    question: 'Hva er den viktigste utfordringen ved repositionering?',
    choices: [
      {
        id: 'a',
        label: 'Det er for dyrt å lage nye logoer og reklamemateriell.',
        isCorrect: false,
        feedback: 'Feil. Repositionering handler ikke om logo — det handler om å endre forbrukernes mentale bilde av merkevaren.',
      },
      {
        id: 'b',
        label: 'Forbrukeres mentale bilde endres sakte — tar 3–5 år med konsistent handling og kommunikasjon.',
        isCorrect: true,
        feedback: 'Riktig! Forbrukere husker sin siste erfaring. Du kan ikke "annonsere" deg ut av et dårlig omdømme — du må bevise det over tid med konsekvent leveranse.',
      },
      {
        id: 'c',
        label: 'Nye konkurrenter vil alltid blokkere repositioneringen.',
        isCorrect: false,
        feedback: 'Feil. Konkurrenter er ikke det største hinderet — den største utfordringen er forbrukernes mentale treghet.',
      },
      {
        id: 'd',
        label: 'Sosiale medier gjør repositionering umulig fordi folk husker alt.',
        isCorrect: false,
        feedback: 'Delvis sant, men ikke hele svaret. Sosiale medier kan også brukes aktivt til repositionering. Konsistens over tid er nøkkelen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'pos-05',
    icon: '🌊',
    title: 'Blue Ocean Strategy',
    context: 'Cirque du Soleil skapte et helt nytt underholdningsmarked ved å kombinere sirkus og teater — uten dyr, med artister og musikk.',
    question: 'Hva er kjerneprinsippet i Blue Ocean Strategy?',
    choices: [
      {
        id: 'a',
        label: 'Senk prisene til under alle konkurrenter for å dominere markedet.',
        isCorrect: false,
        feedback: 'Feil. Dette er klassisk Red Ocean-tenkning — konkurranse på pris i eksisterende marked.',
      },
      {
        id: 'b',
        label: 'Kopier det som fungerer hos markedslederen og gjør det litt bedre.',
        isCorrect: false,
        feedback: 'Feil. Dette er også Red Ocean-tenkning. Blue Ocean handler om å unngå konkurranse, ikke å vinne den.',
      },
      {
        id: 'c',
        label: 'Skape et nytt marked der konkurranse ikke eksisterer, ved å kombinere elementer på nye måter.',
        isCorrect: true,
        feedback: 'Riktig! Blue Ocean = nytt marked, ingen konkurrenter. Cirque du Soleil konkurrerte ikke med andre sirkus — de skapte en ny kategori. Spørsmålet er: hva kan DU kombinere unikt?',
      },
      {
        id: 'd',
        label: 'Fokusere kun på de mest lønnsomme kundene og ignorere alle andre.',
        isCorrect: false,
        feedback: 'Feil. Dette er segmentering, ikke Blue Ocean. Blue Ocean handler om å skape ny verdi, ikke optimere for eksisterende kunder.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
