import type { QuizExercise } from '@/types/Quiz'

export const SVINN_EXERCISES: QuizExercise[] = [
  {
    id: 'svinn-vg2-01',
    icon: '🛒',
    title: 'Svinntyper i dagligvare',
    context:
      'En dagligvarebutikk registrerer et totalt svinn på 2,8% av omsetningen etter årets varetelling. Butikksjefen skal presentere tiltaksplan for eieren.',
    question:
      'Hva er den vanligste årsaken til svinn i en dagligvarebutikk?',
    choices: [
      {
        id: 'a',
        label:
          'Feil i varemottak — leverandører leverer færre varer enn det som faktureres.',
        isCorrect: false,
        feedback:
          'Leverandørfeil er en type svinn, men utgjør vanligvis kun 5–10% av totalt svinn. Det er ikke den dominerende årsaken.',
      },
      {
        id: 'b',
        label:
          'Kassafeil — feilregistrering ved kassen fører til at varer ikke betales for.',
        isCorrect: false,
        feedback:
          'Kassafeil er en reell kilde til svinn, men utgjør normalt under 10% av totalt svinn i dagligvare.',
      },
      {
        id: 'c',
        label:
          'Butikktyverier (ekstern) + ansattetyverier (intern) utgjør ca. 60–70% av totalt svinn i dagligvare.',
        isCorrect: true,
        feedback:
          'Riktig! Ifølge bransjestudier er tyveri den desidert største svinnkilden. Eksterne tyverier (butikktyver) og interne (ansatte) utgjør til sammen 60–70%. Resten fordeler seg på leverandørfeil, ukurans og administrativt svinn.',
      },
      {
        id: 'd',
        label:
          'Ukurans — varer som går ut på dato før de selges, er alltid den største svinnkilden.',
        isCorrect: false,
        feedback:
          'Ukurans er betydelig i ferskvaredelen, men utgjør totalt sett kun 20–25% av svinn i dagligvare. Tyveri er større.',
      },
    ],
    espenTip:
      '⚠️ 1% svinn kan utgjøre forskjellen mellom overskudd og tap. Svinn er tyveri fra bedriftens fremtid!',
  },
  {
    id: 'svinn-vg2-02',
    icon: '🌸',
    title: 'Ukurans',
    context:
      'En blomsterbutikk bestiller 200 buketter per uke. Gjennomsnittlig kastes 60 buketter (30%) fordi de visner før de selges. Eieren lurer på om det finnes et faglig begrep for dette og hvordan det kan reduseres.',
    question:
      'Hva kalles dette svinnfenomenet, og hva er det beste tiltaket?',
    choices: [
      {
        id: 'a',
        label:
          'Inkurans — varer som ikke lenger er etterspurt i markedet, typisk for klær og elektronikk.',
        isCorrect: false,
        feedback:
          'Nesten riktig begrep, men ikke helt: inkurans brukes gjerne om varer som ikke lenger er salgbare pga. moter eller teknologi. Blomster som visner er et tidsspørsmål, ikke markedsspørsmål.',
      },
      {
        id: 'b',
        label:
          'Ukurans — varer som mister verdi pga. tid/foreldelse. Håndteres med bedre prognose og rotasjonssystem (FIFO).',
        isCorrect: true,
        feedback:
          'Riktig! Ukurans er svinn som skyldes at varer blir for gamle eller mister kvalitet over tid. FIFO (First In, First Out) sikrer at eldste varer selges først. Bedre behovsprognoser og prisreduksjon på varer nær foreldelse er også effektive tiltak.',
      },
      {
        id: 'c',
        label:
          'Administrasjonssvinn — feilregistrering i varesystemet gjør at varene "forsvinner" på papiret.',
        isCorrect: false,
        feedback:
          'Feil. Administrasjonssvinn er datafeil i lagersystemet. Blomster som visner er et fysisk svinn pga. begrenset holdbarhet — det er ukurans.',
      },
      {
        id: 'd',
        label:
          'Svinnprosent — all kassering av varer kalles svinnprosent, uavhengig av årsak.',
        isCorrect: false,
        feedback:
          'Feil. Svinnprosent er et mål på omfanget av svinn (30%), ikke et navn på svinntypen. Svinntypen her er ukurans.',
      },
    ],
    espenTip:
      '⚠️ 1% svinn kan utgjøre forskjellen mellom overskudd og tap. Svinn er tyveri fra bedriftens fremtid!',
  },
  {
    id: 'svinn-vg2-03',
    icon: '🔐',
    title: 'Forebygging av internt svinn',
    context:
      'En butikkjede merker at svinn er systematisk høyere i avdelinger med færre ansatte på vakt. Internrevisjonen mistenker at interne tyverier kan bidra. Ledelsen vil innføre tiltak.',
    question:
      'Hva er det mest effektive samlede tiltaket mot interne tyverier i en butikk?',
    choices: [
      {
        id: 'a',
        label:
          'Installer kameraer overalt — overvåking alene stopper all uønsket atferd.',
        isCorrect: false,
        feedback:
          'Kameraer er viktige, men ikke tilstrekkelig alene. Ansatte som vet kameraene finnes kan omgå dem. En kombinasjon av tiltak er mer effektiv.',
      },
      {
        id: 'b',
        label:
          'Gjennomfør stikkprøve-ransakelser av ansatte ved utgang — avskrekking gjennom kontroll.',
        isCorrect: false,
        feedback:
          'Ransakelser uten grunnlag er juridisk problematisk og skader arbeidsklima alvorlig. Det er ikke et egnet primærtiltak.',
      },
      {
        id: 'c',
        label:
          'Tydelig policy og konsekvenser, kameraovervåking, varetellingssystem og åpen kultur — ikke ett enkelt tiltak alene.',
        isCorrect: true,
        feedback:
          'Riktig! Forskning viser at kombinasjonen av klar policy, teknisk kontroll (kamera, kasselogg), løpende varetelling og en åpen kultur der ansatte tør å varsle, er det mest effektive.',
      },
      {
        id: 'd',
        label:
          'Stol på alle ansatte og anta at svinn skyldes leverandørfeil — mistenksomhet skaper dårlig arbeidsmiljø.',
        isCorrect: false,
        feedback:
          'Tillit er viktig, men å ignorere intern svinnrisiko er naivt og kostbart. Systematisk kontroll er ikke det samme som mistenksomhet.',
      },
    ],
    espenTip:
      '⚠️ 1% svinn kan utgjøre forskjellen mellom overskudd og tap. Svinn er tyveri fra bedriftens fremtid!',
  },
  {
    id: 'svinn-vg2-04',
    icon: '📦',
    title: 'Svinnprosent — varetelling',
    context:
      'En klesprodusent har et bokført lager på 500 enheter av en jakkemodell. Etter fysisk varetelling er kun 472 enheter funnet. Bransjegjennomsnittet for svinn i klesbransjen er 1–2%.',
    question:
      'Hva er svinnprosenten, og hva bør bedriften gjøre?',
    choices: [
      {
        id: 'a',
        label:
          '2,8% — innenfor akseptabel margin for klesbransjen. Ingen videre tiltak nødvendig.',
        isCorrect: false,
        feedback:
          'Feil beregning: (500 − 472) / 500 × 100 = 5,6%, ikke 2,8%. Og 5,6% er langt over bransjesnitt — tiltak er nødvendig.',
      },
      {
        id: 'b',
        label:
          '5,6% — godt over bransjesnitt på 1–2%. Krever umiddelbar undersøkelse av årsak og tiltak.',
        isCorrect: true,
        feedback:
          'Riktig! (500 − 472) / 500 × 100 = 5,6%. Dette er mer enn dobbelt så høyt som bransjegjennomsnittet og representerer betydelig verditap. Mulige årsaker: tyveri, feilregistrering, leverandøravvik eller produksjonsfeil.',
      },
      {
        id: 'c',
        label:
          '28% — antall manglende enheter dividert med differansen mellom bokført og talt.',
        isCorrect: false,
        feedback:
          'Feil formel. Svinnprosent = (bokført − talt) / bokført × 100 = (500 − 472) / 500 × 100 = 5,6%.',
      },
      {
        id: 'd',
        label:
          '94,4% — varene som faktisk er på lager i prosent av det som er bokført.',
        isCorrect: false,
        feedback:
          'Feil. Du har beregnet beholdningsprosenten (472/500 = 94,4%), ikke svinnprosenten. Svinn = det som mangler i prosent av det som skulle vært der.',
      },
    ],
    espenTip:
      '⚠️ 1% svinn kan utgjøre forskjellen mellom overskudd og tap. Svinn er tyveri fra bedriftens fremtid!',
  },
  {
    id: 'svinn-vg2-05',
    icon: '📋',
    title: 'Leverandørfeil ved varemottak',
    context:
      'En grossist mottar en levering fra sin faste leverandør. Følgeseddelen og fakturaen angir 100 esker. Ved mottakskontroll telles kun 94 esker. Mottaker er usikker på hva som skal gjøres.',
    question:
      'Hva er riktig fremgangsmåte når leverandøren fakturerer for 100 esker men kun 94 ankommer?',
    choices: [
      {
        id: 'a',
        label:
          'Betal fakturaen for 100 esker og vent på at leverandøren sender de manglende eskene.',
        isCorrect: false,
        feedback:
          'Feil. Å betale for varer som ikke er mottatt er uakseptabelt. Bedriften bør aldri akseptere avvik uten dokumentasjon og reklamasjon.',
      },
      {
        id: 'b',
        label:
          'Dokumenter avviket ved mottak, send reklamasjon til leverandør umiddelbart med foto og mottaksrapport.',
        isCorrect: true,
        feedback:
          'Riktig! Varemottak er et kritisk kontrollpunkt. Avvik skal alltid dokumenteres med foto, signert mottaksrapport og sendes leverandøren samme dag. Reklamasjonsrett kan gå tapt hvis avviket ikke meldes i tide.',
      },
      {
        id: 'c',
        label:
          'Anta at egne ansatte har telt feil og godkjenn leveransen som komplett.',
        isCorrect: false,
        feedback:
          'Feil. Å godkjenne en leveranse uten å ha verifisert at den er komplett, fritar leverandøren for ansvar. Alltid dokumenter avvik.',
      },
      {
        id: 'd',
        label:
          'Vent til neste levering og ta det opp muntlig med sjåføren — unngå å gjøre det til en stor sak.',
        isCorrect: false,
        feedback:
          'Feil. Muntlig og uformell håndtering av avvik gir ingen juridisk rett til kompensasjon. Skriftlig reklamasjon ved mottak er påkrevd.',
      },
    ],
    espenTip:
      '⚠️ 1% svinn kan utgjøre forskjellen mellom overskudd og tap. Svinn er tyveri fra bedriftens fremtid!',
  },
]
