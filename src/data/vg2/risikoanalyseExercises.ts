import type { QuizExercise } from '@/types/Quiz'

export const RISIKOANALYSE_EXERCISES: QuizExercise[] = [
  {
    id: 'risk-vg2-01',
    icon: '🎲',
    title: 'Risikoscore — sannsynlighet × konsekvens',
    context:
      'En bedrift gjennomfører en risikoanalyse og bruker en 5×5 risikomatrise der score = sannsynlighet × konsekvens. Et datainnbrudd vurderes til: sannsynlighet 2/5, konsekvens 5/5.',
    question:
      'Hva er risikoscoren for datainnbrudd, og hva bør bedriften gjøre?',
    choices: [
      {
        id: 'a',
        label:
          'Risikoscore = 3. Lav score — trenger ikke prioriteres nå.',
        isCorrect: false,
        feedback:
          'Feil beregning. 2 × 5 = 10, ikke 3. En score på 10 av 25 er i øvre del av skalaen og krever tiltak.',
      },
      {
        id: 'b',
        label:
          'Risikoscore = 7. Middels risiko — settes opp til neste kvartalsmøte.',
        isCorrect: false,
        feedback:
          'Feil beregning. Sannsynlighet × konsekvens = 2 × 5 = 10, ikke 7.',
      },
      {
        id: 'c',
        label:
          'Risikoscore = 10 av 25. Høy konsekvens krever tiltak selv ved lav sannsynlighet — f.eks. kryptering, tilgangsstyring og backup-rutiner.',
        isCorrect: true,
        feedback:
          'Riktig! 2 × 5 = 10 av 25. Selv om sannsynligheten er lav (2/5), er konsekvensen ekstrem (5/5 — kan bety GDPR-brudd, tap av kundedata og omdømmeskade). Slike risikoer må alltid håndteres.',
      },
      {
        id: 'd',
        label:
          'Risikoscore = 2,5. Dividerer sannsynlighet med konsekvens for å normalisere resultatet.',
        isCorrect: false,
        feedback:
          'Feil. Risikoscore beregnes ved å multiplisere (×), ikke dividere (/). 2 × 5 = 10.',
      },
    ],
    espenTip:
      '⚠️ Risiko du ikke ser komme, er den farligste. Bruk risikomatrisen aktivt — ikke bare på papir!',
  },
  {
    id: 'risk-vg2-02',
    icon: '🗺️',
    title: 'Risikomatrise — prioritering',
    context:
      'En bedrift har kartlagt 12 risikoer og plottet dem i en 5×5 risikomatrise med fargekoder: grønn (lav), gul (middels), oransje (høy) og rød (kritisk).',
    question: 'Hvilke risikoer bør prioriteres FØRST og få umiddelbare tiltak?',
    choices: [
      {
        id: 'a',
        label:
          'Risikoer med lav sannsynlighet men høy konsekvens — de er mest uventede og overrasker bedriften.',
        isCorrect: false,
        feedback:
          'Disse er viktige, men ikke de som prioriteres aller først. Rød sone (høy sannsynlighet + høy konsekvens) er mest akutt.',
      },
      {
        id: 'b',
        label:
          'Høy sannsynlighet + høy konsekvens (rød sone) — disse trenger umiddelbare forebyggende tiltak.',
        isCorrect: true,
        feedback:
          'Riktig! Rød sone representerer risikoer som er både sannsynlige og alvorlige. De krever umiddelbar handling: forebygging, beredskapsplan eller overføring av risiko (forsikring).',
      },
      {
        id: 'c',
        label:
          'Risikoer med høy sannsynlighet men lav konsekvens — de inntreffer oftest og tapper bedriften for tid.',
        isCorrect: false,
        feedback:
          'Disse håndteres løpende, men er ikke de mest kritiske. Konsekvensens alvorlighet er avgjørende for prioritering.',
      },
      {
        id: 'd',
        label:
          'Alle risikoer behandles likt — ingen skal prioriteres foran andre i en rettferdig risikoanalyse.',
        isCorrect: false,
        feedback:
          'Feil. Hele poenget med en risikomatrise er nettopp å prioritere ressursene mot de alvorligste risikoene.',
      },
    ],
    espenTip:
      '⚠️ Risiko du ikke ser komme, er den farligste. Bruk risikomatrisen aktivt — ikke bare på papir!',
  },
  {
    id: 'risk-vg2-03',
    icon: '🚚',
    title: 'Leverandørrisiko',
    context:
      'En produksjonsbedrift kjøper 90% av en kritisk komponent fra én og samme leverandør i utlandet. Leverandøren varsler at de vurderer å legge ned sin norske salgsenhet.',
    question:
      'Hva er det beste forebyggende tiltaket mot leverandørrisiko av denne typen?',
    choices: [
      {
        id: 'a',
        label:
          'Skrive en lengre kontrakt med nåværende leverandør — binding gir forutsigbarhet.',
        isCorrect: false,
        feedback:
          'En lengre kontrakt hjelper ikke hvis leverandøren likevel legger ned. Juridisk binding løser ikke den underliggende avhengighetsrisikoen.',
      },
      {
        id: 'b',
        label:
          'Investere i egen produksjon av komponenten for å bli selvforsynt.',
        isCorrect: false,
        feedback:
          'Mulig på sikt, men kapitalintensivt og ikke egnet som kortsiktig tiltak. Leverandørdiversifisering er mer realistisk.',
      },
      {
        id: 'c',
        label:
          'Ha 2–3 alternative leverandører og buffer-lager på 2–4 uker — ikke bli avhengig av én kilde.',
        isCorrect: true,
        feedback:
          'Riktig! Leverandørdiversifisering er gullstandarden. Buffer-lager på 2–4 uker gir tid til å aktivere alternativ leverandør. Dette er standard praksis i supply chain management.',
      },
      {
        id: 'd',
        label:
          'Forhandle ned prisen kraftig med nåværende leverandør for å øke lønnsomheten.',
        isCorrect: false,
        feedback:
          'Prisforhandling adresserer ikke risikoen. Tvert imot kan aggressiv prispress øke sannsynligheten for at leverandøren avslutter forholdet.',
      },
    ],
    espenTip:
      '⚠️ Risiko du ikke ser komme, er den farligste. Bruk risikomatrisen aktivt — ikke bare på papir!',
  },
  {
    id: 'risk-vg2-04',
    icon: '👤',
    title: 'Nøkkelpersonrisiko',
    context:
      'Salgssjefen i en mellomstor bedrift håndterer kunderelasjoner som representerer 60% av omsetningen. Hun har bygget opp disse relasjonene over seks år og sier nå opp med én måneds oppsigelsestid.',
    question:
      'Hva er konsekvensen, og hvordan burde bedriften ha håndtert denne risikoen tidligere?',
    choices: [
      {
        id: 'a',
        label:
          'Lav risiko — kunder er lojale mot bedriften, ikke enkeltpersoner.',
        isCorrect: false,
        feedback:
          'Feil. I B2B-salg er personlige relasjoner svært viktige. 60% av omsetningen er i høyeste grad eksponert.',
      },
      {
        id: 'b',
        label:
          'Svært høy risiko — bedriften er for avhengig av én person. Trenger kompetanseoverføring og CRM-system med all kundeinformasjon.',
        isCorrect: true,
        feedback:
          'Riktig! Nøkkelpersonrisiko er en av de vanligste og undervurderte risikoene i SMB-bedrifter. Forebygging: systematisk CRM-bruk, teambasert kundeoppfølging og kompetansedelingsprogrammer.',
      },
      {
        id: 'c',
        label:
          'Middels risiko — en ny salgssjef vil raskt bygge opp tilsvarende kunderelasjoner.',
        isCorrect: false,
        feedback:
          'Feil. Å bygge opp kundeforhold over 60% av omsetningen tar år, ikke måneder. Inntektsbortfall i mellomtiden kan true bedriftens eksistens.',
      },
      {
        id: 'd',
        label:
          'Ingen risiko — arbeidsavtalen kan inneholde konkurranseklausuler som hindrer henne i å ta kundene med seg.',
        isCorrect: false,
        feedback:
          'Feil. Konkurranseklausuler er begrenset etter arbeidsmiljøloven og hindrer ikke kunder i å følge personen frivillig. Risikoen er reell.',
      },
    ],
    espenTip:
      '⚠️ Risiko du ikke ser komme, er den farligste. Bruk risikomatrisen aktivt — ikke bare på papir!',
  },
  {
    id: 'risk-vg2-05',
    icon: '📰',
    title: 'Omdømmerisiko og krisekommunikasjon',
    context:
      'VG publiserer en artikkel om en ansatt i bedriften din som skal ha oppført seg upassende mot kunder. Artikkelen spres på sosiale medier og bedriften mottar hundrevis av negative kommentarer innen første time.',
    question:
      'Hva er riktig kriserespons for bedriftens ledelse i denne situasjonen?',
    choices: [
      {
        id: 'a',
        label:
          'Vent og se — ikke reager impulsivt før alle fakta er på bordet. Saker blåser over av seg selv.',
        isCorrect: false,
        feedback:
          'Feil. "Vent og se" er den verste strategien i en krise. Sosiale medier eskalerer raskt. Taushet tolkes som skyld.',
      },
      {
        id: 'b',
        label:
          'Reager raskt (innen 2 timer), ta ansvar der det er relevant, presenter konkrete tiltak — ikke ignorer situasjonen.',
        isCorrect: true,
        feedback:
          'Riktig! Krisekommunikasjon krever hurtighet, ærlighet og handlingsorientering. Bedrifter som responderer raskt og troverdig, begrenser omdømmeskaden betydelig.',
      },
      {
        id: 'c',
        label:
          'Nekt for alt og angrip journalistens troverdighet — vis at bedriften ikke lar seg diktere av mediene.',
        isCorrect: false,
        feedback:
          'Feil. Benekting uten grunnlag og angrep på medier øker skaden dramatisk. Dette er en av de mest skadelige krisetaktikkene.',
      },
      {
        id: 'd',
        label:
          'Send en juridisk advarsel til VG og krev at artikkelen fjernes umiddelbart.',
        isCorrect: false,
        feedback:
          'Feil. Juridiske trusler mot pressen eskalerer normalt saken og gir negativ oppmerksomhet. Kommunikasjon er nesten alltid bedre enn konfrontasjon i første fase.',
      },
    ],
    espenTip:
      '⚠️ Risiko du ikke ser komme, er den farligste. Bruk risikomatrisen aktivt — ikke bare på papir!',
  },
]
