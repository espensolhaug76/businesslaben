import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP =
  '⚠️ Forbrukerombudet kan gi bøter og påbud. Alltid merk annonser og sjekk prisinformasjon!'

export const MARKEDSFORINGSLOVEN_EXERCISES: QuizExercise[] = [
  {
    id: 'mfl-01',
    icon: '📱',
    title: 'Influencer-reklame og merkeplikt',
    context:
      'Nora har 550 000 følgere på Instagram. Hun legger ut et innlegg med bilder av Glossier-produkter og skriver "Elsker disse! Hudpleien min for livet 🌿". Hun har mottatt produktene gratis fra Glossier, men nevner ikke dette.',
    question: 'Hva er det juridiske problemet med Noras innlegg?',
    choices: [
      {
        id: 'a',
        label: 'Det er ingen problem — hun deler bare sin personlige mening.',
        isCorrect: false,
        feedback:
          'Feil. Når man mottar produkter, penger eller andre fordeler for å promotere noe, er det reklame uansett hvor personlig det virker. Inntrykket av å dele en "ærlig mening" er nettopp det som gjør umerket reklame villedende.',
      },
      {
        id: 'b',
        label:
          'Brudd på markedsføringsloven §3 — sponset innhold MÅ merkes tydelig med #annonse eller #reklame.',
        isCorrect: true,
        feedback:
          'Riktig! Markedsføringsloven §3 fastslår at reklame alltid skal fremstå som reklame. Forbrukertilsynet krever at merking som #annonse eller #reklame er tydelig og plassert i starten av innlegget — ikke gjemt blant mange andre emneknagger.',
      },
      {
        id: 'c',
        label: 'Problemet er at hun ikke har opphavsrett til bildene.',
        isCorrect: false,
        feedback:
          'Feil. Opphavsrett er et separat juridisk spørsmål. Det primære problemet her er brudd på markedsføringsloven og plikten til å merke reklame som reklame.',
      },
      {
        id: 'd',
        label: 'Det er bare et problem hvis hun har fått betalt — gratis produkter gjelder ikke.',
        isCorrect: false,
        feedback:
          'Feil. Merkeplikten gjelder all form for kompensasjon: penger, gratis produkter, rabatter, reiser eller andre fordeler. Det er ingen juridisk forskjell mellom å bli betalt og å motta gratis varer.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mfl-02',
    icon: '🏷️',
    title: 'Villedende prismarkedsføring',
    context:
      'En sportsbutikk annonserer: "Salg! 50% rabatt på alt — kun denne helgen!" Men varene ble aldri solgt til den oppgitte "full pris" — butikken satte opp prisene kunstig rett før salget for å gjøre rabatten større.',
    question: 'Hvilken lov bryter butikken, og hva kalles dette?',
    choices: [
      {
        id: 'a',
        label: 'Dette er lovlig — butikker kan sette prisene sine fritt.',
        isCorrect: false,
        feedback:
          'Feil. Butikker har riktignok stor frihet til å sette priser, men referansepriser i reklame (den prisen man sammenligner rabattprisen mot) må ha vært den faktiske salgsprisen. Kunstig oppblåste referansepriser er ulovlig.',
      },
      {
        id: 'b',
        label: 'Brudd på konkurranseloven — de hindrer fri konkurranse.',
        isCorrect: false,
        feedback:
          'Feil. Konkurranseloven regulerer samarbeid mellom bedrifter (kartell, prissamarbeid). Her dreier det seg om villedende kommunikasjon mot forbrukere, som reguleres av markedsføringsloven.',
      },
      {
        id: 'c',
        label: 'Brudd på regnskapsloven — de fører ikke regnskap korrekt.',
        isCorrect: false,
        feedback:
          'Feil. Regnskapsloven handler om regnskapsføring, ikke markedsføring. Det juridiske problemet her er den villedende prispresentasjonen overfor forbrukerne.',
      },
      {
        id: 'd',
        label:
          'Villedende markedsføring (Mfl. §7) — referanseprisen må ha vært en reell salgspris for at rabatten skal være lovlig.',
        isCorrect: true,
        feedback:
          'Riktig! Markedsføringsloven §7 forbyr villedende fremstillinger. En "50% rabatt" er villedende dersom referanseprisen aldri var den faktiske salgsprisen. Forbrukertilsynet har gitt store bøter for nettopp slike falske "førkris".',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mfl-03',
    icon: '📧',
    title: 'E-postmarkedsføring og samtykke',
    context:
      'Rema 1000 sender ukentlig e-postreklame til alle kunder som har handlet for over 200 kr i butikken. Kundene har oppgitt e-post ved kjøp, men har ikke eksplisitt samtykket til å motta markedsføring.',
    question: 'Hva er det rettslige problemet med denne praksisen?',
    choices: [
      {
        id: 'a',
        label:
          'Brudd på GDPR og ekomloven — markedsføring via e-post krever eksplisitt forhåndssamtykke fra mottakeren.',
        isCorrect: true,
        feedback:
          'Riktig! GDPR og den norske ekomloven §2-7b krever at forbrukere aktivt har samtykket til å motta e-postreklame. Det er ikke nok at de har oppgitt e-post i en annen sammenheng. Samtykket må være frivillig, spesifikt og informert.',
      },
      {
        id: 'b',
        label: 'Det er lovlig — kunden valgte selv å oppgi e-postadressen sin.',
        isCorrect: false,
        feedback:
          'Feil. Å oppgi e-post for å gjennomføre et kjøp er ikke det samme som å samtykke til markedsføring. Formålet med å innhente e-post og bruke den til reklame er to forskjellige ting, og krever separate samtykker.',
      },
      {
        id: 'c',
        label: 'Det er et problem bare hvis e-postene inneholder feilaktig informasjon.',
        isCorrect: false,
        feedback:
          'Feil. Problemet er ikke innholdet i e-postene, men at de sendes uten gyldig samtykke. Det er brudd på loven uavhengig av om innholdet er korrekt og redelig.',
      },
      {
        id: 'd',
        label: 'Greit så lenge kundene kan melde seg av (opt-out).',
        isCorrect: false,
        feedback:
          'Feil. Opt-out (mulighet for avmelding) er nødvendig, men ikke tilstrekkelig. Norsk og europeisk lov krever opt-in — aktivt samtykke FØR du begynner å sende markedsføring. Opt-out erstatter ikke kravet om forhåndssamtykke.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mfl-04',
    icon: '🍺',
    title: 'Alkoholreklame i Norge',
    context:
      'En norsk matvarebedrift lanserer et nytt øl. I annonsen bruker de bilder av unge, attraktive mennesker på festival som holder øl og ser ut til å ha det fantastisk. Annonsen publiseres på Instagram og i matmagasiner.',
    question: 'Hva er det juridiske problemet med denne kampanjen?',
    choices: [
      {
        id: 'a',
        label: 'Annonsen er lovlig fordi den ikke inneholder eksplisitt drikking.',
        isCorrect: false,
        feedback:
          'Feil. Alkoholloven §9-2 forbyr all reklame for alkohol i Norge — det gjelder uavhengig av om man faktisk ser noen drikke i annonsen. Å vise øl i en positiv kontekst er mer enn nok til å bryte loven.',
      },
      {
        id: 'b',
        label: 'Problemet er at modellene er for unge — de burde brukt eldre skuespillere.',
        isCorrect: false,
        feedback:
          'Feil. Alder på modellene er et sekundært problem. Grunnproblemet er at alkoholreklame er totalforbudt i Norge. Det finnes ingen "lovlig" versjon av alkoholreklame rettet mot norske forbrukere.',
      },
      {
        id: 'c',
        label: 'Instagram-annonser er unntatt alkoholreklameforbudet.',
        isCorrect: false,
        feedback:
          'Feil. Det finnes ingen slik unntak. Alkohollovens reklameforbud gjelder alle mediekanaler — TV, aviser, sosiale medier, utendørsreklame og digitale plattformer.',
      },
      {
        id: 'd',
        label:
          'Alkoholreklame er totalforbudt i Norge (alkoholloven §9-2). All kommersiell markedsføring av alkohol er ulovlig uavhengig av kanal.',
        isCorrect: true,
        feedback:
          'Riktig! Norge har et av verdens strengeste alkoholreklameforbud. §9-2 i alkoholloven forbyr all reklame for alkohol. Brudd kan medføre store bøter. Unntak finnes kun for visse fagpublikasjoner rettet mot bransjen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'mfl-05',
    icon: '☕',
    title: 'Superlativ og "puffery"',
    context:
      'Et lite norsk kaffebrenneri skriver i annonsen sin: "Norges beste kaffe — garantert!" De har ingen priser, kåringer eller dokumentasjon som underbygger påstanden.',
    question: 'Er denne reklamepåstanden lovlig etter markedsføringsloven?',
    choices: [
      {
        id: 'a',
        label: 'Nei — "beste" er en udokumentert påstand og dermed villedende markedsføring.',
        isCorrect: false,
        feedback:
          'Feil. Det finnes et viktig juridisk prinsipp kalt "puffery" eller reklameskryt: vage superlativpåstander som "best", "størst" og "nummer én" som ingen rimelig person oppfatter som faktapåstander, er generelt tillatt. Disse kan ikke verifiseres og anses som åpenbart subjektive.',
      },
      {
        id: 'b',
        label: 'Nei — de må oppgi hvilken kåring eller test som viser at de er best.',
        isCorrect: false,
        feedback:
          'Feil. Dokumentasjonskravet gjelder for faktapåstander som kan verifiseres — for eksempel "Testet best av Forbrukerrådet" eller "Nr. 1 i salg". Generelle superlativ som "Norges beste" er et annet juridisk tilfelle.',
      },
      {
        id: 'c',
        label: 'Ja, men bare hvis de selger kaffe i hele Norge.',
        isCorrect: false,
        feedback:
          'Feil. Lovligheten av reklamepåstanden er ikke avhengig av geografisk rekkevidde. Puffery-prinsippet gjelder uavhengig av om bedriften faktisk er tilstede i hele landet.',
      },
      {
        id: 'd',
        label:
          'Ja — dette er lovlig subjektivt reklameskryt (puffery). Vage superlativ uten faktapåstand er tillatt og anses ikke som villedende.',
        isCorrect: true,
        feedback:
          'Riktig! "Puffery" er reklamepåstander som er så overdrevne eller vage at ingen rimelig person vil oppfatte dem som faktapåstander. "Norges beste kaffe" kan ikke objektivt verifiseres, og forbrukere forstår at det er markedsføringsspråk. Forbrukertilsynet forfølger ikke slike påstander.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
