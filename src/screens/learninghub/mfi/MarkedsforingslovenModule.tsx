import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Hvorfor har vi Markedsføringsloven?',
    quote: 'Forbrukerombudet håndhever loven — og bøtene er store',
    practical:
      'Loven beskytter forbrukere mot villedende, aggressiv og urimelig markedsføring. Forbrukerombudet kan gi bøter på opptil 4% av årsomsetning.',
    exercises: [
      {
        id: 'mfl-1-1',
        question: 'Hva er hovedformålet med Markedsføringsloven?',
        choices: [
          { id: 'a', text: 'Å regulere priser i markedet' },
          { id: 'b', text: 'Å beskytte forbrukere mot villedende, aggressiv og urimelig markedsføring' },
          { id: 'c', text: 'Å fremme norsk næringsliv' },
          { id: 'd', text: 'Å kontrollere reklamebransjen' },
        ],
        correctId: 'b',
        explanation: 'Markedsføringsloven er en forbrukerbeskyttelseslov — den sikrer at forbrukere kan stole på informasjonen de får i markedsføring.',
      },
      {
        id: 'mfl-1-2',
        question: 'Hvem håndhever Markedsføringsloven i Norge?',
        choices: [
          { id: 'a', text: 'Skatteetaten' },
          { id: 'b', text: 'Politiet' },
          { id: 'c', text: 'Forbrukerombudet' },
          { id: 'd', text: 'Datatilsynet' },
        ],
        correctId: 'c',
        explanation: 'Forbrukerombudet er tilsynsorganet for Markedsføringsloven — de kan gi pålegg og bøter til bedrifter som bryter loven.',
      },
      {
        id: 'mfl-1-3',
        question: 'Hvor stor kan en bot fra Forbrukerombudet maksimalt være?',
        choices: [
          { id: 'a', text: '100 000 kr' },
          { id: 'b', text: '1 million kr' },
          { id: 'c', text: '4% av årsomsetning' },
          { id: 'd', text: '10 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Bøter kan utgjøre opptil 4% av årsomsetning — for store selskaper kan dette bli svært store beløp, noe som gjør det lønnsomt å overholde loven.',
      },
      {
        id: 'mfl-1-4',
        question: 'Hva menes med «aggressiv markedsføring» i lovens forstand?',
        choices: [
          { id: 'a', text: 'Markedsføring med høyt volum' },
          { id: 'b', text: 'Markedsføring som bruker press, trusler eller utilbørlig påvirkning for å få forbrukeren til å handle' },
          { id: 'c', text: 'Reklame med slående farger' },
          { id: 'd', text: 'Markedsføring rettet mot konkurrenter' },
        ],
        correctId: 'b',
        explanation: 'Aggressiv markedsføring er når bedriften presser eller manipulerer forbrukeren til kjøp — f.eks. ved å true med negative konsekvenser av å ikke kjøpe.',
      },
      {
        id: 'mfl-1-5',
        question: 'Hvilken av disse er et eksempel på villedende markedsføring?',
        choices: [
          { id: 'a', text: 'En reklame som viser produktet i best mulig lys' },
          { id: 'b', text: 'En annonse som hevder «klinisk bevist» uten noen klinisk studie bak påstanden' },
          { id: 'c', text: 'En sammenligning med konkurrentens pris som er korrekt' },
          { id: 'd', text: 'En humoristisk reklamekampanje' },
        ],
        correctId: 'b',
        explanation: 'Falske eller udokumenterte påstander («klinisk bevist», «anbefalt av leger») uten dokumentasjon er villedende og bryter Markedsføringsloven.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📱',
    title: 'Skjult reklame',
    quote: 'Alle betalte samarbeid MÅ merkes — uten unntak',
    practical:
      'Influencere, bloggere og alle som mottar betaling eller gratisvarer MÅ merke med #annonse. I 2023 fikk norske influencere bøter på 150.000 kr for manglende merking.',
    glossaryTerm: 'Skjult reklame',
    exercises: [
      {
        id: 'mfl-2-1',
        question: 'Hva er skjult reklame?',
        choices: [
          { id: 'a', text: 'Reklame som vises sent om natten' },
          { id: 'b', text: 'Betalt markedsføring som ikke er tydelig merket som reklame for forbrukeren' },
          { id: 'c', text: 'Reklame som er plassert bak andre produkter i butikken' },
          { id: 'd', text: 'Reklame i aviser med liten skrift' },
        ],
        correctId: 'b',
        explanation: 'Skjult reklame er når det ikke er tydelig for forbrukeren at innholdet er betalt — forbrukere har rett til å vite om de ser redaksjonelt innhold eller reklame.',
      },
      {
        id: 'mfl-2-2',
        question: 'En influencer mottar gratisvarer fra et merke og promoterer dem uten merking. Er dette lovlig?',
        choices: [
          { id: 'a', text: 'Ja, det er bare merkevaresamarbeid' },
          { id: 'b', text: 'Nei, selv gratisvarer er «betaling» og må merkes med #annonse' },
          { id: 'c', text: 'Ja, kun kontantbetaling krever merking' },
          { id: 'd', text: 'Det er en gråsone' },
        ],
        correctId: 'b',
        explanation: 'Loven er klar: enhver fordel (penger, varer, tjenester) som gis i bytte mot omtale krever merking som reklame — det finnes ingen «gratisvare-unntak».',
      },
      {
        id: 'mfl-2-3',
        question: 'Hvilken merking er korrekt for et betalt samarbeid på Instagram i Norge?',
        choices: [
          { id: 'a', text: '#samarbeid' },
          { id: 'b', text: '#annonse (eller «Annonse:» i begynnelsen av innlegget)' },
          { id: 'c', text: '#gifted' },
          { id: 'd', text: '#partnership' },
        ],
        correctId: 'b',
        explanation: 'Norsk lov krever tydelig merking med «Annonse» — engelske merker som «#ad» eller «#gifted» er ikke alltid tilstrekkelig klare for norske forbrukere.',
      },
      {
        id: 'mfl-2-4',
        question: 'Hva var straffen norske influencere fikk for manglende annonsemerking i 2023?',
        choices: [
          { id: 'a', text: 'En advarsel' },
          { id: 'b', text: 'Bøter på opptil 150 000 kr' },
          { id: 'c', text: 'Forbud mot å drive som influencer' },
          { id: 'd', text: 'Ingen — det er ikke straffbart' },
        ],
        correctId: 'b',
        explanation: 'I 2023 fikk norske influencere bøter på opptil 150 000 kr for manglende annonsemerking — Forbrukerombudet tar dette svært alvorlig.',
      },
      {
        id: 'mfl-2-5',
        question: 'Hvorfor er merkingskravet viktig for forbrukere?',
        choices: [
          { id: 'a', text: 'Fordi det hjelper dem å finne gode tilbud' },
          { id: 'b', text: 'Fordi det gir dem mulighet til å vurdere innholdet kritisk og vite at det er betalt påvirkning, ikke upartisk anbefaling' },
          { id: 'c', text: 'Fordi det er krav fra sosiale medieplattformer' },
          { id: 'd', text: 'Fordi det beskytter influencere juridisk' },
        ],
        correctId: 'b',
        explanation: 'Når forbrukere vet at noe er reklame, kan de vurdere påstander med passende skepsis — uten merking kan de ta reklamepåstander for upartiske anbefalinger.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💰',
    title: 'Villedende prismarkedsføring',
    quote: '"Før 999 kr, nå 299 kr" — bare lovlig hvis 999 var reell pris',
    practical:
      'Normalprisen må ha vært brukt i minst 30 dager. Bransjer som møbler og elektronikk bryter hyppig denne regelen.',
    exercises: [
      {
        id: 'mfl-3-1',
        question: 'Hva er villedende prismarkedsføring?',
        choices: [
          { id: 'a', text: 'Å sette høye priser' },
          { id: 'b', text: 'Å vise en «før-pris» som ikke reflekterer den faktiske normalprisen for å gjøre rabatten virke større' },
          { id: 'c', text: 'Å sette priser lavere enn konkurrentene' },
          { id: 'd', text: 'Å ha salg for ofte' },
        ],
        correctId: 'b',
        explanation: 'Villedende prismarkedsføring er å manipulere «før-priser» — å sette en kunstig høy normalpris slik at rabatten virker større enn den er.',
      },
      {
        id: 'mfl-3-2',
        question: 'Hvor lenge må normalprisen ha vært brukt for at en «Før X kr»-angivelse er lovlig?',
        choices: [
          { id: 'a', text: '7 dager' },
          { id: 'b', text: '14 dager' },
          { id: 'c', text: '30 dager' },
          { id: 'd', text: '60 dager' },
        ],
        correctId: 'c',
        explanation: 'Norsk lov krever at normalprisen («før-prisen») faktisk har vært brukt i minst 30 dager — det hindrer bedrifter i å sette en kunstig høy pris rett før et «salg».',
      },
      {
        id: 'mfl-3-3',
        question: 'En møbelbutikk setter normalprisen til 10 000 kr i én dag, og annonserer dagen etter «Salg! 50% rabatt — nå 5 000 kr». Hva er dette?',
        choices: [
          { id: 'a', text: 'Et lovlig tilbud' },
          { id: 'b', text: 'Villedende prismarkedsføring — normalprisen var ikke reell' },
          { id: 'c', text: 'Aggressiv men lovlig markedsføring' },
          { id: 'd', text: 'Bare kreativ markedsføring' },
        ],
        correctId: 'b',
        explanation: 'Prisen var kun satt i én dag — ikke de påkrevde 30 dagene. Rabatten er kunstig og villedende, noe som bryter Markedsføringsloven.',
      },
      {
        id: 'mfl-3-4',
        question: 'Hvilke bransjer bryter oftest reglene om villedende prismarkedsføring?',
        choices: [
          { id: 'a', text: 'Matbutikker og apotek' },
          { id: 'b', text: 'Møbler og elektronikk' },
          { id: 'c', text: 'Reise og hotell' },
          { id: 'd', text: 'Klær og sko' },
        ],
        correctId: 'b',
        explanation: 'Møbel- og elektronnikkbransjen er kjent for systematiske brudd på prismarkedsføringsloven — «alltid på salg»-problematikken har vært hyppig i norsk presse.',
      },
      {
        id: 'mfl-3-5',
        question: 'Hva er den korrekte måten å annonsere et prisavslag på?',
        choices: [
          { id: 'a', text: 'Vise den høyeste prisen man noen gang har hatt' },
          { id: 'b', text: 'Vise den faktiske normalprisen som har vært brukt i minst 30 dager, og den nye prisen' },
          { id: 'c', text: 'Kun vise ny pris uten referansepris' },
          { id: 'd', text: 'Vise veiledende utsalgspris fra produsenten' },
        ],
        correctId: 'b',
        explanation: 'En lovlig prisangivelse viser den faktiske normalprisen (brukt i minst 30 dager) og den nye prisen — det gir forbrukeren korrekt informasjon om besparelsen.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔒',
    title: 'GDPR og samtykke',
    quote: 'Forhåndskryssede bokser er IKKE gyldig samtykke',
    practical:
      'Du kan ikke sende nyhetsbrev til folk som ikke aktivt har bedt om det. Slette-rett: kunder kan kreve å bli slettet fra alle systemer.',
    exercises: [
      {
        id: 'mfl-4-1',
        question: 'Hva er GDPR?',
        choices: [
          { id: 'a', text: 'En norsk reklameloven' },
          { id: 'b', text: 'EUs personvernforordning som regulerer innsamling og bruk av persondata' },
          { id: 'c', text: 'En standard for digital markedsføring' },
          { id: 'd', text: 'En type digital sertifisering' },
        ],
        correctId: 'b',
        explanation: 'GDPR (General Data Protection Regulation) er EUs personvernlov som gjelder i hele EØS, inkludert Norge — den regulerer hvordan bedrifter håndterer persondata.',
      },
      {
        id: 'mfl-4-2',
        question: 'En nettbutikk krysser av for nyhetsbrev-samtykke automatisk ved registrering. Er dette lovlig?',
        choices: [
          { id: 'a', text: 'Ja, det er raskere for kunden' },
          { id: 'b', text: 'Nei, GDPR krever aktivt samtykke — forhåndskryssede bokser er ikke gyldig' },
          { id: 'c', text: 'Ja, som lenge som kunden kan melde seg av' },
          { id: 'd', text: 'Det er en gråsone' },
        ],
        correctId: 'b',
        explanation: 'GDPR krever aktivt og informert samtykke — en forhåndskrysset boks er ikke aktivt samtykke og bryter regelverket.',
      },
      {
        id: 'mfl-4-3',
        question: 'Hva er «slette-retten» under GDPR?',
        choices: [
          { id: 'a', text: 'Retten til å slette egne sosiale mediekontoer' },
          { id: 'b', text: 'Forbrukerens rett til å kreve at en bedrift sletter alle personopplysninger om dem' },
          { id: 'c', text: 'Retten til å slette dårlige anmeldelser' },
          { id: 'd', text: 'Bedriftens rett til å slette gamle kundeopplysninger' },
        ],
        correctId: 'b',
        explanation: 'Slette-retten («retten til å bli glemt») gir forbrukere rett til å kreve at bedriften sletter alle personopplysninger om dem — bedriften plikter å etterkomme dette.',
      },
      {
        id: 'mfl-4-4',
        question: 'Kan en bedrift sende markedsføring til alle som kjøpte av dem tidligere?',
        choices: [
          { id: 'a', text: 'Ja, de er allerede kunder' },
          { id: 'b', text: 'Nei, bedriften trenger gyldig samtykke for markedsführingskommunikasjon, selv til eksisterende kunder' },
          { id: 'c', text: 'Ja, som lenge de ikke protesterer' },
          { id: 'd', text: 'Kun for produkter de allerede har kjøpt' },
        ],
        correctId: 'b',
        explanation: 'Å ha kjøpt noe gir ikke bedriften rett til å sende markedsføring — det kreves aktivt samtykke for direktemarkedsføring.',
      },
      {
        id: 'mfl-4-5',
        question: 'Hva er «opt-in» prinsippet i digital markedsføring?',
        choices: [
          { id: 'a', text: 'At kunder automatisk er påmeldt til alt og selv må melde seg av' },
          { id: 'b', text: 'At kunder aktivt må samtykke («melde seg på») for å motta markedsføring' },
          { id: 'c', text: 'At man kan sende ett e-postmarkedsføring uten samtykke' },
          { id: 'd', text: 'At kunder mottar markedsføring som standard' },
        ],
        correctId: 'b',
        explanation: 'Opt-in betyr aktivt valg om å delta — kunden velger å motta markedsføring. Dette er GDPR-standarden og det motsatte av opt-out (automatisk påmeldt, selv melder seg av).',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🥊',
    title: 'Sammenlignende reklame',
    quote: 'Du kan sammenligne med konkurrenter — men alt må være sant',
    practical:
      'Lovlig å si "billigere enn Elkjøp" hvis det er sant og verifiserbart. Ulovlig å antyde at konkurrentens produkt er farlig uten dokumentasjon.',
    exercises: [
      {
        id: 'mfl-5-1',
        question: 'Er det lov å sammenligne seg direkte med konkurrenter i norsk reklame?',
        choices: [
          { id: 'a', text: 'Nei, det er alltid forbudt' },
          { id: 'b', text: 'Ja, men alle påstander må være sanne, verifiserbare og saklige' },
          { id: 'c', text: 'Ja, man kan si hva som helst' },
          { id: 'd', text: 'Kun med tillatelse fra konkurrenten' },
        ],
        correctId: 'b',
        explanation: 'Sammenlignende reklame er tillatt i Norge når den er sann, verifiserbar og ikke villedende — det er et nyttig verktøy når du faktisk har en fordel.',
      },
      {
        id: 'mfl-5-2',
        question: 'En butikk annonserer «Vi er billigere enn Elkjøp på TV-er». Hva krever loven for at dette er lovlig?',
        choices: [
          { id: 'a', text: 'Ingenting — det er fritt frem å sammenligne' },
          { id: 'b', text: 'At påstanden er sann og kan dokumenteres med faktiske prisammenligninger' },
          { id: 'c', text: 'Tillatelse fra Forbrukerombudet' },
          { id: 'd', text: 'Tillatelse fra Elkjøp' },
        ],
        correctId: 'b',
        explanation: 'Sammenlignende prisreklame krever at påstanden er faktisk korrekt og kan dokumenteres — villedende sammenligninger bryter loven.',
      },
      {
        id: 'mfl-5-3',
        question: 'En bedrift antyder i reklamen at konkurrentens produkt er farlig, uten å ha dokumentasjon for det. Hva er dette?',
        choices: [
          { id: 'a', text: 'Lovlig sammenlignende reklame' },
          { id: 'b', text: 'Ulovlig — ærekrenkende og villedende reklame mot konkurrent' },
          { id: 'c', text: 'En god konkurransestrategi' },
          { id: 'd', text: 'Grønnvasking' },
        ],
        correctId: 'b',
        explanation: 'Å antyde at konkurrenten er farlig uten dokumentasjon er ærekrenkende og bryter Markedsføringsloven — man kan kun fremme sanne og verifiserbare påstander.',
      },
      {
        id: 'mfl-5-4',
        question: 'Hva er kravet til «verifiserbarhet» i sammenlignende reklame?',
        choices: [
          { id: 'a', text: 'At reklamebyrået bekrefter påstanden' },
          { id: 'b', text: 'At en uavhengig part kunne kontrollere og bekrefte at påstanden er korrekt' },
          { id: 'c', text: 'At bedriften selv har sjekket prisen én gang' },
          { id: 'd', text: 'At det finnes et vitne' },
        ],
        correctId: 'b',
        explanation: 'Verifiserbar betyr at en tredjepart (f.eks. prisdatabase, uavhengig test) kan bekrefte påstanden — bedriften kan ikke bare påstå noe uten etterprøvbart grunnlag.',
      },
      {
        id: 'mfl-5-5',
        question: 'En bedrift sammenligner sin garanti (5 år) med bransjens standard (2 år). Er dette lovlig sammenlignende reklame?',
        choices: [
          { id: 'a', text: 'Nei, man kan ikke sammenligne med bransjestandard' },
          { id: 'b', text: 'Ja, dette er en saklig, sann og verifiserbar sammenligning som gir forbrukeren nyttig informasjon' },
          { id: 'c', text: 'Kun hvis man navngir spesifikke konkurrenter' },
          { id: 'd', text: 'Det er en gråsone' },
        ],
        correctId: 'b',
        explanation: 'Saklig sammenligning med bransjestandard er et godt eksempel på lovlig sammenlignende reklame — det er sant, verifiserbart og gir forbrukeren nyttig informasjon.',
      },
    ],
  },
]

export default function MarkedsforingslovenModule() {
  return (
    <DrawerModule
      moduleCode="MFI2"
      moduleTitle="Markedsføringsloven"
      moduleIcon="⚖️"
      storageKey="learning-mfi-markedsforingsloven"
      completeRoute="/learning/mfi/markedsforingsloven/complete"
      phases={PHASES}
      intro="Markedsføringsloven beskytter forbrukere mot villedende og aggressiv markedsføring. Forbrukerombudet håndhever loven og kan gi bøter til bedrifter som bryter den."
      vissteduAt="I 2023 fikk flere norske influencere bøter på opptil 150 000 kr for manglende annonsemerking på Instagram."
      espenSier="Scroll gjennom Instagram-feeden din og finn 3 annonser. Er alle merket korrekt? Ser du noen som burde vært merket?"
      presentationLink={{ route: '/learning/presentations/regelverk-markedsforing', description: 'Regelverk for markedsføring — en visuell gjennomgang av loven' }}
    />
  )
}
