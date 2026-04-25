import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '💰',
    title: 'Lønn — mer enn du tror',
    quote: 'Arbeidsgiver betaler 30–40% mer enn bruttolønnen din',
    content: 'Bruttolønn er bare starten på hva en ansatt koster bedriften. Arbeidsgiver må i tillegg betale arbeidsgiveravgift, feriepengeavsetning og pensjon — noe som gjør den totale personalkostnaden betydelig høyere enn stillingsannonsen tilsier.',
    subpoints: [
      'Bruttolønn: det du ser på lønnsslippen',
      'Arbeidsgiveravgift: ekstra skatt betalt av arbeidsgiver',
      'Feriepengeavsetning: settes av løpende for utbetaling i juni',
      'Pensjon: OTP-innskudd betalt av arbeidsgiver',
      'Total kostnad er typisk 30–40% høyere enn bruttolønnen',
    ],
    practical: 'En butikkansatt med 400.000 kr i årslønn koster arbeidsgiveren ca. 480.000–520.000 kr totalt inkl. avgifter og tillegg.',
    exercises: [
      {
        id: 'lp-1-1',
        question: 'Hva er "totale personalkostnader" for en arbeidsgiver?',
        choices: [
          { id: 'a', text: 'Kun bruttolønnen som står i kontrakten' },
          { id: 'b', text: 'Bruttolønn + arbeidsgiveravgift + feriepenger + pensjon' },
          { id: 'c', text: 'Nettolønnen den ansatte får utbetalt' },
          { id: 'd', text: 'Lønn + bonuser' },
        ],
        correctId: 'b',
        explanation: 'Totale personalkostnader inkluderer bruttolønn PLUSS alle tilleggsutgifter: arbeidsgiveravgift, feriepengeavsetning og pensjonsinnskudd.',
      },
      {
        id: 'lp-1-2',
        question: 'Hvor mye mer enn bruttolønnen budsjetterer typisk en arbeidsgiver for en stilling?',
        choices: [
          { id: 'a', text: '5–10%' },
          { id: 'b', text: '10–15%' },
          { id: 'c', text: '30–40%' },
          { id: 'd', text: '100%' },
        ],
        correctId: 'c',
        explanation: 'Arbeidsgiver betaler typisk 30–40% mer enn bruttolønnen når arbeidsgiveravgift, feriepenger og pensjon er inkludert.',
      },
      {
        id: 'lp-1-3',
        question: 'En stillingsannonse oppgir 500 000 kr i lønn. Hva budsjetterer en realistisk arbeidsgiver for denne stillingen?',
        choices: [
          { id: 'a', text: '500 000 kr' },
          { id: 'b', text: '550 000 kr' },
          { id: 'c', text: '620 000–680 000 kr' },
          { id: 'd', text: '1 000 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Med 30–40% tillegg på 500 000 kr gir 650 000–700 000 kr i totale personalkostnader. Riktig svaralternativ er 620 000–680 000 kr.',
      },
      {
        id: 'lp-1-4',
        question: 'Hvorfor er det viktig for en leder å kjenne til totale personalkostnader?',
        choices: [
          { id: 'a', text: 'Det er ikke viktig — HR håndterer dette' },
          { id: 'b', text: 'For å budsjettere riktig og ta gode bemanningsbeslutninger' },
          { id: 'c', text: 'Kun for å forhandle lønn med ansatte' },
          { id: 'd', text: 'Kun for årsrapportering' },
        ],
        correctId: 'b',
        explanation: 'En leder som bare kjenner bruttolønnen, kan underbudsjettere kraftig og ta dårlige beslutninger om bemanning og lønnsomhet.',
      },
      {
        id: 'lp-1-5',
        question: 'Hva kalles den samlede kostnaden arbeidsgiver har for en ansatt utover bruttolønnen?',
        choices: [
          { id: 'a', text: 'Personalkostnader' },
          { id: 'b', text: 'Lønnskostnader' },
          { id: 'c', text: 'Arbeidsgiversavgifter og sosiale kostnader' },
          { id: 'd', text: 'Alle svaralternativene er riktige' },
        ],
        correctId: 'd',
        explanation: 'Alle begrepene brukes om kostnader utover bruttolønnen. "Sosiale kostnader" er et samlebegrep for arbeidsgiveravgift, feriepenger og pensjon.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🏛️',
    title: 'Arbeidsgiveravgift',
    quote: '14,1% ekstra på toppen av lønnen — betales av arbeidsgiver',
    content: 'Arbeidsgiveravgiften er en avgift arbeidsgiver betaler til staten, beregnet av bruttolønnen. Satsen varierer geografisk: høyest i sentrale strøk (14,1%) og lavest (0%) i Nord-Norge for å stimulere til næringsvirksomhet der.',
    subpoints: [
      'Standardsats sentralt: 14,1% av bruttolønnen',
      'Redusert sats i distriktskommuner: helt ned til 0% i Nord-Troms og Finnmark',
      'Betales månedlig til Skatteetaten av arbeidsgiver',
      'En ansatt med 400 000 kr lønn koster 56 400 kr i arbeidsgiveravgift',
    ],
    practical: 'Arbeidsgiveravgiften er en direkte kostnad for bedriften — den synlige skatteeffekten av å ansette noen.',
    exercises: [
      {
        id: 'lp-2-1',
        question: 'Hva er standardsatsen for arbeidsgiveravgift i sentrale strøk?',
        choices: [
          { id: 'a', text: '7,9%' },
          { id: 'b', text: '10,6%' },
          { id: 'c', text: '14,1%' },
          { id: 'd', text: '25%' },
        ],
        correctId: 'c',
        explanation: 'Standardsatsen for arbeidsgiveravgift er 14,1% av bruttolønnen i sentrale strøk. Denne betales av arbeidsgiver i tillegg til lønnen.',
      },
      {
        id: 'lp-2-2',
        question: 'Hvem betaler arbeidsgiveravgiften?',
        choices: [
          { id: 'a', text: 'Den ansatte betaler det av sin lønn' },
          { id: 'b', text: 'Arbeidsgiver betaler det til staten i tillegg til lønnen' },
          { id: 'c', text: 'Staten betaler det som støtte til bedriftene' },
          { id: 'd', text: 'Det trekkes automatisk fra arbeidstakers skatt' },
        ],
        correctId: 'b',
        explanation: 'Arbeidsgiveravgiften betales av arbeidsgiver — den ansatte verken ser eller betaler denne avgiften. Den er en ekstra kostnad for bedriften.',
      },
      {
        id: 'lp-2-3',
        question: 'Hva er arbeidsgiveravgiften for en ansatt med 400 000 kr i årslønn (sats 14,1%)?',
        choices: [
          { id: 'a', text: '28 200 kr' },
          { id: 'b', text: '40 000 kr' },
          { id: 'c', text: '56 400 kr' },
          { id: 'd', text: '100 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Arbeidsgiveravgift = 400 000 × 14,1% = 56 400 kr. Dette betales i tillegg til de 400 000 kr i lønn.',
      },
      {
        id: 'lp-2-4',
        question: 'Hvorfor er arbeidsgiveravgiftssatsen lavere i Nord-Norge enn i sentrale strøk?',
        choices: [
          { id: 'a', text: 'Fordi lønningene er høyere i Nord-Norge' },
          { id: 'b', text: 'For å stimulere til næringsvirksomhet og bosetting i distriktene' },
          { id: 'c', text: 'Fordi det er færre ansatte der' },
          { id: 'd', text: 'Det er ingen forskjell i satsen' },
        ],
        correctId: 'b',
        explanation: 'Differensiert arbeidsgiveravgift er et distriktspolitisk virkemiddel som gjør det rimeligere å drive næringsvirksomhet i utkantstrøk.',
      },
      {
        id: 'lp-2-5',
        question: 'En bedrift vurderer å ansette tre fulltidsansatte à 350 000 kr. Hva blir total arbeidsgiveravgift per år (sats 14,1%)?',
        choices: [
          { id: 'a', text: '49 350 kr' },
          { id: 'b', text: '98 700 kr' },
          { id: 'c', text: '148 050 kr' },
          { id: 'd', text: '200 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Arbeidsgiveravgift per ansatt: 350 000 × 14,1% = 49 350 kr. For tre ansatte: 49 350 × 3 = 148 050 kr.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🏖️',
    title: 'Feriepenger',
    quote: 'Feriepenger er IKKE bonus — de erstatter lønn i ferien',
    content: 'Feriepenger er opptjent fjoråret og utbetales i juni som kompensasjon for at den ansatte ikke får lønn under ferien. Det er ikke ekstra penger — det er en omfordeling av lønnen over tid.',
    subpoints: [
      'Sats: 10,2% av fjorårets bruttolønn (12% over 60 år)',
      'Utbetales i juni — da trekkes det ikke skattetrekk',
      'Ferieloven gir rett til 25 virkedager ferie (4 uker + 1 dag)',
      'Eksempel: 400 000 kr lønn → 40 800 kr i feriepenger',
      'Avsetning skjer løpende — bedriften setter av penger månedlig',
    ],
    practical: 'Husk: i juni trekkes ikke skattetrekk av feriepengene. Det betyr at utbetalingen er høyere enn vanlig, men at man betaler mer skatt neste år.',
    exercises: [
      {
        id: 'lp-3-1',
        question: 'Hva er feriepenger egentlig?',
        choices: [
          { id: 'a', text: 'En bonus arbeidsgiver gir for god jobb' },
          { id: 'b', text: 'Erstatning for lønn i ferien — opptjent forrige år' },
          { id: 'c', text: 'Et tilskudd fra staten til ansatte' },
          { id: 'd', text: 'Ekstra lønn for overtid' },
        ],
        correctId: 'b',
        explanation: 'Feriepenger er ikke bonus — de erstatter lønn under ferieavvikling. De er opptjent foregående år og utbetales typisk i juni.',
      },
      {
        id: 'lp-3-2',
        question: 'Hva er standard feriepengeprosent for de fleste ansatte?',
        choices: [
          { id: 'a', text: '8%' },
          { id: 'b', text: '10,2%' },
          { id: 'c', text: '15%' },
          { id: 'd', text: '12%' },
        ],
        correctId: 'b',
        explanation: 'Standard sats er 10,2% av fjorårets bruttolønn. For ansatte over 60 år er satsen 12%.',
      },
      {
        id: 'lp-3-3',
        question: 'Hva er feriepengene for en ansatt som tjente 500 000 kr i fjor (sats 10,2%)?',
        choices: [
          { id: 'a', text: '25 500 kr' },
          { id: 'b', text: '42 000 kr' },
          { id: 'c', text: '51 000 kr' },
          { id: 'd', text: '60 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Feriepenger = 500 000 × 10,2% = 51 000 kr.',
      },
      {
        id: 'lp-3-4',
        question: 'Hva er spesielt med feriepengeutbetalingen i juni?',
        choices: [
          { id: 'a', text: 'Det trekkes dobbelt skattetrekk i juni' },
          { id: 'b', text: 'Det trekkes ikke skattetrekk av feriepengene i juni' },
          { id: 'c', text: 'Ansatte får ikke feriepenger i juni' },
          { id: 'd', text: 'Feriepenger beskattes aldri' },
        ],
        correctId: 'b',
        explanation: 'I juni trekkes ikke skattetrekk av feriepengene. Dette betyr en høyere utbetaling den måneden, men skatten gjøres opp ved ligningen.',
      },
      {
        id: 'lp-3-5',
        question: 'Hvor mange virkedager ferie har en ansatt rett på etter Ferieloven?',
        choices: [
          { id: 'a', text: '20 virkedager' },
          { id: 'b', text: '25 virkedager (4 uker + 1 dag)' },
          { id: 'c', text: '30 virkedager' },
          { id: 'd', text: '10 virkedager' },
        ],
        correctId: 'b',
        explanation: 'Ferieloven gir rett til 25 virkedager ferie, tilsvarende 4 uker og 1 dag. Mange tariffavtaler gir 5 uker.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '👴',
    title: 'Pensjon og fremtiden',
    quote: 'Minimum 2% — men mange bedrifter betaler mer for å tiltrekke seg ansatte',
    content: 'OTP (Obligatorisk Tjenestepensjon) ble innført i 2006 og sikrer at alle ansatte har en pensjonsordning. Arbeidsgiver betaler inn en prosentandel av lønnen til en pensjonskonto for den ansatte.',
    subpoints: [
      'Minimum 2% av lønn mellom 1G og 12G',
      'Mange bedrifter tilbyr 3–5% for å tiltrekke seg gode kandidater',
      'Pengene er den ansattes — de tas med ved jobbskifte',
      '1G (grunnbeløpet i Folketrygden) justeres årlig',
      'God pensjon er et viktig rekrutteringsargument',
    ],
    practical: 'For en ansatt med 400 000 kr i lønn og 2% pensjon betyr det 8 000 kr i pensjonsinnskudd per år fra arbeidsgiver.',
    exercises: [
      {
        id: 'lp-4-1',
        question: 'Hva er minimumssatsen for OTP (Obligatorisk Tjenestepensjon)?',
        choices: [
          { id: 'a', text: '0,5% av lønnen' },
          { id: 'b', text: '2% av lønn mellom 1G og 12G' },
          { id: 'c', text: '5% av lønnen' },
          { id: 'd', text: '10% av lønnen' },
        ],
        correctId: 'b',
        explanation: 'Minimumssatsen for OTP er 2% av lønn mellom 1G (grunnbeløpet i Folketrygden) og 12G.',
      },
      {
        id: 'lp-4-2',
        question: 'Hva skjer med pensjonsmidlene når en ansatt slutter i jobben?',
        choices: [
          { id: 'a', text: 'De beholdes av arbeidsgiveren' },
          { id: 'b', text: 'De utbetales som sluttvederlag' },
          { id: 'c', text: 'De følger med den ansatte til ny arbeidsgiver' },
          { id: 'd', text: 'De går tapt' },
        ],
        correctId: 'c',
        explanation: 'Pensjonsmidlene er den ansattes eiendom og følger med ved jobbskifte. De samles i en pensjonskapitalbevis-konto.',
      },
      {
        id: 'lp-4-3',
        question: 'En ansatt har 360 000 kr i årslønn og arbeidsgiver betaler 2% i pensjon. Hva er det årlige pensjonsinnskuddet?',
        choices: [
          { id: 'a', text: '3 600 kr' },
          { id: 'b', text: '7 200 kr' },
          { id: 'c', text: '10 000 kr' },
          { id: 'd', text: '18 000 kr' },
        ],
        correctId: 'b',
        explanation: 'Pensjonsinnskudd = 360 000 × 2% = 7 200 kr per år.',
      },
      {
        id: 'lp-4-4',
        question: 'Hvorfor velger mange bedrifter å betale mer enn minimumspensjon?',
        choices: [
          { id: 'a', text: 'Fordi loven krever det' },
          { id: 'b', text: 'For å tiltrekke og beholde gode medarbeidere' },
          { id: 'c', text: 'Fordi det reduserer skatten' },
          { id: 'd', text: 'Det er ingen grunn — alle betaler minimum' },
        ],
        correctId: 'b',
        explanation: 'God pensjonsordning er et konkurransefortrinn i rekruttering. Spesielt unge arbeidstakere verdsetter dette høyere enn tidligere generasjoner.',
      },
      {
        id: 'lp-4-5',
        question: 'Hva er 1G i norsk sammenheng?',
        choices: [
          { id: 'a', text: 'Én ganger gruntrinnet i norsk skole' },
          { id: 'b', text: 'Grunnbeløpet i Folketrygden — justeres årlig av Stortinget' },
          { id: 'c', text: 'Gjennomsnittslønnen i Norge' },
          { id: 'd', text: 'Grensen for skattefritak' },
        ],
        correctId: 'b',
        explanation: '1G er grunnbeløpet i Folketrygden, justert av Stortinget hvert år. Det brukes som referanse i mange trygde- og pensjonsberegninger.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🧮',
    title: 'Regnestykket — total personalkostnad',
    quote: 'Budsjetter alltid med totalkostnad, ikke bruttolønn',
    content: 'Når du summerer alle elementer — bruttolønn, arbeidsgiveravgift, feriepengeavsetning og pensjon — ser du hva en ansatt faktisk koster bedriften per måned. Dette er grunnlaget for all lønnsom bemanningsplanlegging.',
    subpoints: [
      'Kari: 220 kr/t × 162,5 t/mnd = 35 750 kr bruttolønn',
      'Arbeidsgiveravgift (14,1%): +5 041 kr',
      'Feriepengeavsetning (10,2%): +3 647 kr',
      'Pensjon (2%): +715 kr',
      'TOTAL: 45 153 kr/mnd',
    ],
    practical: 'Sett opp samme kalkyle for en annen ansatt. Husk at timene varierer — deltidsansatte har lavere totalkostnad, men høyere kostnad per faktisk arbeidstime.',
    exercises: [
      {
        id: 'lp-5-1',
        question: 'Kari tjener 35 750 kr/mnd brutto. Arbeidsgiveravgiften er 14,1%. Hva er arbeidsgiveravgiften?',
        choices: [
          { id: 'a', text: '3 575 kr' },
          { id: 'b', text: '5 041 kr' },
          { id: 'c', text: '7 150 kr' },
          { id: 'd', text: '9 000 kr' },
        ],
        correctId: 'b',
        explanation: 'Arbeidsgiveravgift = 35 750 × 14,1% = 5 040,75 kr ≈ 5 041 kr.',
      },
      {
        id: 'lp-5-2',
        question: 'I kalkylen fra eksemplet er Karis totale kostnad ca. 45 153 kr/mnd. Hva er dette i prosent av bruttolønnen?',
        choices: [
          { id: 'a', text: 'Ca. 110%' },
          { id: 'b', text: 'Ca. 120%' },
          { id: 'c', text: 'Ca. 126%' },
          { id: 'd', text: 'Ca. 150%' },
        ],
        correctId: 'c',
        explanation: '45 153 / 35 750 ≈ 1,263 = ca. 126% av bruttolønnen. Totalkostnaden er altså ca. 26% høyere enn bruttolønnen.',
      },
      {
        id: 'lp-5-3',
        question: 'En leder vil ansette en ekstra fulltidsansatt til 40 000 kr/mnd brutto. Hva bør hun budsjettere?',
        choices: [
          { id: 'a', text: '40 000 kr/mnd' },
          { id: 'b', text: '44 000 kr/mnd' },
          { id: 'c', text: 'Ca. 50 000–52 000 kr/mnd' },
          { id: 'd', text: 'Ca. 70 000 kr/mnd' },
        ],
        correctId: 'c',
        explanation: 'Med ca. 26–30% tillegg for avgifter og avsetninger: 40 000 × 1,26–1,30 ≈ 50 400–52 000 kr/mnd.',
      },
      {
        id: 'lp-5-4',
        question: 'Hva er feriepengeavsetningen for en ansatt med 35 750 kr/mnd i bruttolønn (sats 10,2%)?',
        choices: [
          { id: 'a', text: '1 788 kr' },
          { id: 'b', text: '2 860 kr' },
          { id: 'c', text: '3 647 kr' },
          { id: 'd', text: '5 000 kr' },
        ],
        correctId: 'c',
        explanation: 'Feriepengeavsetning = 35 750 × 10,2% = 3 646,5 kr ≈ 3 647 kr.',
      },
      {
        id: 'lp-5-5',
        question: 'Hvorfor er det viktig å beregne total personalkostnad og ikke bare bruttolønn ved budsjettering?',
        choices: [
          { id: 'a', text: 'Det er et lovkrav' },
          { id: 'b', text: 'For å unngå underbudsjettering og ta riktige bemanningsbeslutninger' },
          { id: 'c', text: 'For å gi inntrykk av at bedriften er stor' },
          { id: 'd', text: 'Det er ikke viktig for små bedrifter' },
        ],
        correctId: 'b',
        explanation: 'Å bare budsjettere med bruttolønn kan gi store overraskelser. Total personalkostnad gir det reelle bildet for lønnsomhets- og bemanningsbeslutninger.',
      },
    ],
  },
]

export default function LonnPersonalkostnaderModule() {
  return (
    <DrawerModule
      moduleCode="FD-VG2-2"
      moduleTitle="Lønn og personalkostnader"
      moduleIcon="💸"
      storageKey="learning-vg2-lonn-personalkostnader"
      completeRoute="/learning/vg2/okonomi/lonn-personalkostnader/complete"
      phases={phases}
      intro="Lønn er mer enn det du ser på lønnsslippen. Arbeidsgiver betaler betydelig mer enn bruttolønnen din — og som fremtidig leder må du forstå de reelle personalkostnadene."
      vissteduAt="En stillingsannonse med 400 000 kr i lønn betyr at bedriften egentlig budsjetterer rundt 480 000 kr for den stillingen."
      espenSier="Neste gang du ser en stillingsannonse, vet du at bedriften betaler 30–40% mer enn det som står. Det er viktig å forstå dette som leder og som fremtidig arbeidstaker."
      presentationLink={{ route: '/learning/presentations/lonn-personalkostnader', description: 'Lønn og personalkostnader — hva koster en ansatt egentlig bedriften?' }}
    />
  )
}
