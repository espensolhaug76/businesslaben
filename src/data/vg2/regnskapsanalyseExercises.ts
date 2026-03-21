import type { QuizExercise } from '@/types/Quiz'

export const REGNSKAPSANALYSE_EXERCISES: QuizExercise[] = [
  {
    id: 'ra-vg2-01',
    icon: '📊',
    title: 'Dekningsgrad',
    context:
      'Sportsbutikken Peak Performance AS avslutter regnskapsåret. Omsetning: 4 200 000 kr. Varekostnad (innkjøpspris + frakt): 2 100 000 kr.',
    question:
      'Hva er dekningsgraden til Peak Performance AS, og hva forteller den?',
    choices: [
      {
        id: 'a',
        label: '25% — butikken sitter igjen med én fjerdedel etter alle kostnader.',
        isCorrect: false,
        feedback:
          'Feil. 25% ville vært resultatgraden. Dekningsgrad beregnes kun mot varekostnad: (4 200 000 − 2 100 000) / 4 200 000 × 100 = 50%.',
      },
      {
        id: 'b',
        label:
          '50% — dekningsgraden som viser at halvparten av omsetningen bidrar til å dekke faste kostnader og gi overskudd.',
        isCorrect: true,
        feedback:
          'Riktig! DG = (4 200 000 − 2 100 000) / 4 200 000 × 100 = 50%. En DG på 50% er god for en sportsbutikk og betyr at for hver 100 kr solgt, går 50 kr til dekning av faste kostnader og resultat.',
      },
      {
        id: 'c',
        label: '200% — omsetningen er det dobbelte av varekostnaden.',
        isCorrect: false,
        feedback:
          'Feil. 200% er ikke meningsfullt som dekningsgrad. Du har delt omsetning på varekostnad, ikke beregnet dekningsbidrag i prosent av omsetning.',
      },
      {
        id: 'd',
        label: '2 100 000 kr — dekningsbidraget i kroner er det viktigste nøkkeltallet.',
        isCorrect: false,
        feedback:
          'Feil. 2 100 000 kr er dekningsbidraget (DB) i kroner, men spørsmålet spør etter dekningsgraden (DG) som er et prosenttall.',
      },
    ],
    espenTip:
      '⚠️ Nøkkeltall forteller historien bak tallene — lær dem utenat!',
  },
  {
    id: 'ra-vg2-02',
    icon: '💧',
    title: 'Likviditetsgrad 1',
    context:
      'Peak Performance AS har følgende balansetall ved årets slutt: Omløpsmidler (kasse, bank, kundefordringer, lager): 850 000 kr. Kortsiktig gjeld (leverandørgjeld, skyldig skatt, mv.): 420 000 kr.',
    question:
      'Hva er likviditetsgrad 1 (LG1), og hva betyr resultatet for bedriften?',
    choices: [
      {
        id: 'a',
        label:
          'LG1 = 0,49 — under 1 betyr at bedriften ikke kan betale kortsiktig gjeld. Kritisk situasjon.',
        isCorrect: false,
        feedback:
          'Feil. Du har snudd brøken: 420 000 / 850 000 = 0,49. Riktig formel er omløpsmidler / kortsiktig gjeld.',
      },
      {
        id: 'b',
        label:
          'LG1 = 1,50 — akseptabelt, men bør helst ligge nærmere 2 for god sikkerhet.',
        isCorrect: false,
        feedback:
          'Feil. 850 000 / 420 000 = 2,02, ikke 1,50. Sjekk divisjonen på nytt.',
      },
      {
        id: 'c',
        label:
          'LG1 = 2,02 — over 2 er god likviditet. Bedriften kan betale kortsiktig gjeld og har buffer.',
        isCorrect: true,
        feedback:
          'Riktig! LG1 = 850 000 / 420 000 = 2,02. Tommelfingerregelen er at LG1 bør være ≥ 2. Peak Performance AS er i en solid likviditetssituasjon.',
      },
      {
        id: 'd',
        label:
          'LG1 = 430 000 — differansen mellom omløpsmidler og kortsiktig gjeld viser arbeidskapitalen.',
        isCorrect: false,
        feedback:
          'Feil. 430 000 kr er arbeidskapitalen (omløpsmidler − kortsiktig gjeld), ikke likviditetsgrad 1. LG1 er et forholdstall, ikke et kronetall.',
      },
    ],
    espenTip:
      '⚠️ Nøkkeltall forteller historien bak tallene — lær dem utenat!',
  },
  {
    id: 'ra-vg2-03',
    icon: '⚖️',
    title: 'Break-even-analyse',
    context:
      'Peak Performance AS har faste kostnader på 1 800 000 kr per år (lønn, husleie, forsikring, mv.). Dekningsgraden er beregnet til 50% (fra forrige oppgave).',
    question: 'Hva er break-even-omsetningen for Peak Performance AS?',
    choices: [
      {
        id: 'a',
        label: '900 000 kr',
        isCorrect: false,
        feedback:
          'Feil. Du har ganget i stedet for å dividere: 1 800 000 × 0,50 = 900 000. Riktig formel: FK / DG% = 1 800 000 / 0,50 = 3 600 000 kr.',
      },
      {
        id: 'b',
        label: '2 700 000 kr',
        isCorrect: false,
        feedback:
          'Feil. Sjekk formelen: Break-even = Faste kostnader / Dekningsgrad = 1 800 000 / 0,50 = 3 600 000 kr.',
      },
      {
        id: 'c',
        label: '4 500 000 kr',
        isCorrect: false,
        feedback:
          'Feil. Du har trolig lagt til noe som ikke skal med. Break-even = 1 800 000 / 0,50 = 3 600 000 kr.',
      },
      {
        id: 'd',
        label:
          '3 600 000 kr — ved denne omsetningen dekker dekningsbidraget akkurat de faste kostnadene.',
        isCorrect: true,
        feedback:
          'Riktig! Break-even = FK / DG% = 1 800 000 / 0,50 = 3 600 000 kr. Faktisk omsetning på 4 200 000 kr er godt over break-even — bedriften er lønnsom.',
      },
    ],
    espenTip:
      '⚠️ Nøkkeltall forteller historien bak tallene — lær dem utenat!',
  },
  {
    id: 'ra-vg2-04',
    icon: '🏛️',
    title: 'Soliditet',
    context:
      'Peak Performance AS sin balanse viser: Egenkapital: 1 200 000 kr. Totalkapital (egenkapital + gjeld): 3 000 000 kr.',
    question:
      'Hva er soliditeten til Peak Performance AS, og hva sier den om bedriftens finansielle styrke?',
    choices: [
      {
        id: 'a',
        label:
          'Soliditet = 40% — over 30%-grensen. Bedriften tåler tap og har god evne til å finansiere seg.',
        isCorrect: true,
        feedback:
          'Riktig! Soliditet = (1 200 000 / 3 000 000) × 100 = 40%. En soliditet over 30–35% regnes generelt som god. Peak Performance AS er solid.',
      },
      {
        id: 'b',
        label:
          'Soliditet = 2,5 — totalkapital er 2,5 ganger egenkapitalen. Høy gjeldsgard.',
        isCorrect: false,
        feedback:
          'Feil. Du har beregnet gjeldsgraden (totalkapital / egenkapital), ikke soliditeten. Soliditet = egenkapital / totalkapital × 100 = 40%.',
      },
      {
        id: 'c',
        label:
          'Soliditet = 60% — gjelden utgjør 60% av totalkapitalen, noe som er bekymringsfullt.',
        isCorrect: false,
        feedback:
          'Feil. 60% er andelen gjeld av totalkapitalen (gjeldsandel), ikke soliditeten. Soliditet = egenkapital / totalkapital = 1 200 000 / 3 000 000 = 40%.',
      },
      {
        id: 'd',
        label:
          'Soliditet = 1 800 000 kr — gjelden i kroner er det viktigste soliditetsmålet.',
        isCorrect: false,
        feedback:
          'Feil. 1 800 000 kr er gjelden i kroner (3 000 000 − 1 200 000), men soliditet er et prosenttall som sier hvor stor andel egenkapitalen utgjør.',
      },
    ],
    espenTip:
      '⚠️ Nøkkeltall forteller historien bak tallene — lær dem utenat!',
  },
  {
    id: 'ra-vg2-05',
    icon: '🔎',
    title: 'Regnskapsanalyse — tolkning',
    context:
      'Peak Performance AS presenterer årsresultatet på generalforsamlingen. Omsetningen økte 15% fra fjoråret, men driftsresultatet er ned 8%. Styreleder er bekymret.',
    question:
      'Hva er den mest sannsynlige forklaringen på at omsetningen øker mens resultatet faller?',
    choices: [
      {
        id: 'a',
        label:
          'Kostnadene har økt mer enn inntektene — gjerne økte varekostnader, høyere lønn eller dyrere husleie. Krever kostnadsanalyse.',
        isCorrect: true,
        feedback:
          'Riktig! Når omsetning øker men resultat faller, betyr det at kostnadsveksten overstiger inntektsveksten. Mulige årsaker: innkjøpspriser opp, nye ansettelser, lønnsoppgjør eller økte leiekostnader. Neste steg er å se på kostnadsutviklingen linje for linje.',
      },
      {
        id: 'b',
        label:
          'Bedriften har for mange kunder og klarer ikke å levere godt nok — resulterer i reklamasjoner og refusjoner.',
        isCorrect: false,
        feedback:
          'Mulig, men ikke den mest sannsynlige eller vanlige forklaringen. Kostnadsvekst er langt hyppigere årsak til dette mønsteret.',
      },
      {
        id: 'c',
        label:
          'Regnskapet inneholder feil — økt omsetning og lavere resultat er et tegn på regnskapsmessige avvik.',
        isCorrect: false,
        feedback:
          'Feil. Dette er et vanlig mønster i næringslivet og krever ikke at regnskapet er feil. Forklaringen ligger nesten alltid i kostnadsutviklingen.',
      },
      {
        id: 'd',
        label:
          'Skattetrykket har økt betraktelig og spiser opp hele resultatforbedringen fra økt omsetning.',
        isCorrect: false,
        feedback:
          'Feil. Skatt beregnes av resultatet, ikke omsetningen. Skatt alene kan ikke forklare at driftsresultatet (før skatt) er ned når omsetningen øker.',
      },
    ],
    espenTip:
      '⚠️ Nøkkeltall forteller historien bak tallene — lær dem utenat!',
  },
]
