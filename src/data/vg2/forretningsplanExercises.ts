import type { QuizExercise } from '@/types/Quiz'

export const FORRETNINGSPLAN_EXERCISES: QuizExercise[] = [
  {
    id: 'fp-vg2-01',
    icon: '💡',
    title: 'Forretningsidé',
    context:
      'Du er med på å starte fjordopplevelse-bedriften Fjord Adventures AS i Flåm. Dere skal skrive forretningsplan og trenger å formulere en tydelig forretningsidé.',
    question:
      'Hva er den sterkeste forretningsidéen for Fjord Adventures AS?',
    choices: [
      {
        id: 'a',
        label: 'Vi tilbyr opplevelser i naturen til folk som liker friluftsliv.',
        isCorrect: false,
        feedback:
          'For vag — beskriver ikke hvem kunden er, hva som tilbys eller hva som skiller dere fra konkurrentene.',
      },
      {
        id: 'b',
        label:
          'Skreddersydde fjordopplevelser for grupper på 6–20 personer — premium kayaking, lokal mat og overnatting i pakke.',
        isCorrect: true,
        feedback:
          'Riktig! Tydelig målgruppe, konkret produkt og en klar differensiering (premium pakke med lokal mat og overnatting) gjør dette til en sterk forretningsidé.',
      },
      {
        id: 'c',
        label:
          'Vi skal bli den beste reiselivsbedriften på Vestlandet og levere god kundeservice.',
        isCorrect: false,
        feedback:
          'Dette er et mål, ikke en forretningsidé. Mangler konkret beskrivelse av produkt, målgruppe og verdiforslag.',
      },
      {
        id: 'd',
        label: 'Fjordturer for alle — familier, par og bedrifter — til lave priser.',
        isCorrect: false,
        feedback:
          '"For alle" er ingen målgruppe. Kombinasjonen av lavpris og premium er heller ikke en klar strategi.',
      },
    ],
    espenTip:
      '⚠️ En forretningsplan er kompasset til bedriften din — uten den flyr du blind!',
  },
  {
    id: 'fp-vg2-02',
    icon: '🔍',
    title: 'Markedsanalyse — PEST',
    context:
      'Fjord Adventures AS skal gjennomføre en grundig markedsanalyse før oppstart. Styret diskuterer hvilke analyseverktøy som bør brukes for å forstå de eksterne omgivelsene.',
    question:
      'Hva er en PEST-analyse, og hva brukes den til i en forretningsplan?',
    choices: [
      {
        id: 'a',
        label:
          'En intern analyse av bedriftens styrker og svakheter — tilsvarende S og W i en SWOT.',
        isCorrect: false,
        feedback:
          'Feil. PEST analyserer ytre faktorer, ikke interne. SWOT dekker både interne (S, W) og eksterne (O, T).',
      },
      {
        id: 'b',
        label:
          'En analyse som bare ser på direkte konkurrenter og deres priser i markedet.',
        isCorrect: false,
        feedback:
          'Feil. Konkurrentanalyse er en separat analyse. PEST ser på det brede makromiljøet rundt bedriften.',
      },
      {
        id: 'c',
        label:
          'Politiske, Økonomiske, Sosiale og Teknologiske faktorer som påvirker bedriften utenfra.',
        isCorrect: true,
        feedback:
          'Riktig! PEST kartlegger makromiljøet: lover og regler (P), rentenivå og konjunkturer (E), demografiske trender (S) og teknologiske endringer (T).',
      },
      {
        id: 'd',
        label:
          'En finansiell analyse av bedriftens kostnader, inntekter og likviditet.',
        isCorrect: false,
        feedback:
          'Feil. Det er et budsjett og en regnskapsanalyse du beskriver, ikke en PEST-analyse.',
      },
    ],
    espenTip:
      '⚠️ En forretningsplan er kompasset til bedriften din — uten den flyr du blind!',
  },
  {
    id: 'fp-vg2-03',
    icon: '🧮',
    title: 'Budsjett og driftsresultat',
    context:
      'Fjord Adventures AS har utarbeidet følgende prognose for første driftsår: Inntekter 2 100 000 kr, varekostnader 420 000 kr, lønnskostnader 840 000 kr, husleie 180 000 kr og andre driftskostnader 260 000 kr.',
    question: 'Hva er det budsjetterte driftsresultatet for første år?',
    choices: [
      {
        id: 'a',
        label: '240 000 kr',
        isCorrect: false,
        feedback:
          'Feil. Sjekk regnestykket: 2 100 000 − 420 000 − 840 000 − 180 000 − 260 000 = 400 000 kr.',
      },
      {
        id: 'b',
        label: '560 000 kr',
        isCorrect: false,
        feedback:
          'Feil. Du har sannsynligvis glemt å trekke fra alle kostnadsposter. Husk å summere alle fire kostnadene.',
      },
      {
        id: 'c',
        label: '1 680 000 kr',
        isCorrect: false,
        feedback:
          'Feil. Dette er trolig bare inntekter minus én kostnadspost. Alle fire kostnadsposter skal trekkes fra.',
      },
      {
        id: 'd',
        label: '400 000 kr',
        isCorrect: true,
        feedback:
          'Riktig! 2 100 000 − 420 000 − 840 000 − 180 000 − 260 000 = 400 000 kr. Positivt driftsresultat — bedriften er lønnsom i år 1.',
      },
    ],
    espenTip:
      '⚠️ En forretningsplan er kompasset til bedriften din — uten den flyr du blind!',
  },
  {
    id: 'fp-vg2-04',
    icon: '⚠️',
    title: 'Risikovurdering i forretningsplanen',
    context:
      'Fjord Adventures AS skal presentere risikovurderingen sin for potensielle investorer. Investorene spør om hva styret ser som den største risikoen for bedriften.',
    question:
      'Hva er den største risikoen for en fjordturismebedrift som Fjord Adventures AS?',
    choices: [
      {
        id: 'a',
        label:
          'Sesongavhengighet (ca. 80% av inntektene i mai–september) og klimarisiko — krever diversifisering eller bufferfond.',
        isCorrect: true,
        feedback:
          'Riktig! Sesongavhengighet er en strukturell risiko i norsk reiseliv. Løsninger kan være vinteraktiviteter, bedriftsmarkedet eller et bufferfond tilsvarende 3–6 måneders faste kostnader.',
      },
      {
        id: 'b',
        label:
          'For mange konkurrenter i Flåm-området som tilbyr samme produkt til lavere pris.',
        isCorrect: false,
        feedback:
          'Konkurranse er en risiko, men ikke den største. Sesongvariasjonen påvirker hele bedriftens overlevelse gjennom vinterhalvåret.',
      },
      {
        id: 'c',
        label:
          'Dårlig markedsføring på sosiale medier som gjør at bedriften ikke får nok kunder.',
        isCorrect: false,
        feedback:
          'Markedsføring er operasjonell risiko som kan løses. Sesongrisiko er strukturell og påvirker hele forretningsmodellen.',
      },
      {
        id: 'd',
        label:
          'Vanskeligheter med å rekruttere kvalifiserte guider til sommesesongen.',
        isCorrect: false,
        feedback:
          'Bemanningsutfordringer er reelle, men kan håndteres med planlegging. Sesong- og klimarisiko truer selve inntektsgrunnlaget.',
      },
    ],
    espenTip:
      '⚠️ En forretningsplan er kompasset til bedriften din — uten den flyr du blind!',
  },
  {
    id: 'fp-vg2-05',
    icon: '🏦',
    title: 'Finansiering av oppstart',
    context:
      'Fjord Adventures AS trenger 1 500 000 kr i oppstartskapital for å dekke utstyr, kjøretøy, markedsføring og driftskapital det første halvåret. Gründerne diskuterer hvordan de best finansierer dette.',
    question:
      'Hvilken finansieringsmiks er mest hensiktsmessig for Fjord Adventures AS?',
    choices: [
      {
        id: 'a',
        label:
          'Fullt banklån på 1 500 000 kr — enklest å ordne og gründerne beholder full kontroll.',
        isCorrect: false,
        feedback:
          'Risikabelt. Banken vil kreve sikkerhet og egenkapital. Full lånefinansiering gir høy gjeldsgrad og sårbarhet i dårlige perioder.',
      },
      {
        id: 'b',
        label:
          'Kun egenkapital fra gründerne — unngår renter og beholder full frihet.',
        isCorrect: false,
        feedback:
          'Mulig om gründerne har midlene, men de fleste har ikke 1,5 MNOK tilgjengelig. Det er heller ikke optimalt å binde all privat kapital i én bedrift.',
      },
      {
        id: 'c',
        label:
          'Søk kun Innovasjon Norge-tilskudd — pengene er gratis og trenger ikke tilbakebetales.',
        isCorrect: false,
        feedback:
          'Tilskudd fra Innovasjon Norge finansierer sjelden hele prosjektet, og søknadsprosessen tar tid. En bedrift kan ikke planlegge som om tilskudd er sikkert.',
      },
      {
        id: 'd',
        label:
          'Egenkapital 30% + banklån 40% + Innovasjon Norge tilskudd 30% — diversifisert og realistisk.',
        isCorrect: true,
        feedback:
          'Riktig! En diversifisert finansieringsmiks reduserer risiko. Egenkapital viser commitment, banklån er forutsigbart, og Innovasjon Norge støtter nyskaping i distriktene. Mange oppstartsbedrifter i reiselivet bruker nettopp denne modellen.',
      },
    ],
    espenTip:
      '⚠️ En forretningsplan er kompasset til bedriften din — uten den flyr du blind!',
  },
]
