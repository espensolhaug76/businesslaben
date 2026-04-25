import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📊',
    title: 'Nøkkeltall — Bedriftens helsetilstand',
    quote: '«Du kan ikke styre det du ikke måler.»',
    content: 'Nøkkeltall er relative indikatorer som gjør det mulig å måle og sammenligne en bedrifts finansielle helsetilstand — på tvers av bransjer, størrelser og tidsperioder. En bedrift med god helse på alle fire dimensjoner er robust mot kriser.',
    subpoints: [
      { label: 'De fire dimensjonene', text: 'Rentabilitet, Likviditet, Soliditet og Dekningsgrad.' },
      { label: 'Relativt, ikke absolutt', text: 'Nøkkeltall er prosenter og forholdstall — ikke kronebeløp. Det er det som gjør dem sammenlignbare.' },
      { label: 'Brukes av banker og investorer', text: 'Banken ser på disse tallene når de vurderer lånesøknader.' },
    ],
    practical: 'Se for deg en lege som sjekker pulsen din. Nøkkeltall er akkurat som vitale tegn — de forteller deg om "pasienten" (bedriften) er frisk.',
    exercises: [
      {
        id: 'N1-1',
        icon: '🏥',
        title: 'Hva er nøkkeltall?',
        question: 'Hvorfor er nøkkeltall nyttigere enn å bare se på absolutte kronebeløp?',
        choices: [
          { id: 'a', label: 'Fordi det er lettere å regne med prosenter', isCorrect: false, feedback: 'Dette er ikke grunnen til at nøkkeltall er nyttige.' },
          { id: 'b', label: 'Fordi de muliggjør sammenligning mellom bedrifter av ulik størrelse og over tid', isCorrect: true, feedback: 'Riktig! En omsetning på 10 millioner sier ingenting alene — men et overskudd på 15 % av omsetningen er meningsfylt å sammenligne.' },
          { id: 'c', label: 'Fordi banker krever det i lånesøknader', isCorrect: false, feedback: 'Det stemmer at banker bruker dem, men det er ikke grunnen til at de er nyttige.' },
        ],
        espenTip: 'Forholdstall (%) er alltid mer informativt enn absolutte tall (kr) alene.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '💰',
    title: 'Rentabilitet — Kapitalens avkastning',
    quote: '«Penger skal jobbe — ikke sove.»',
    content: 'Rentabilitet måler hvor effektivt bedriften bruker kapitalen sin til å skape overskudd. Totalkapitalrentabiliteten er det mest brukte rentabilitetsmålet.',
    subpoints: [
      { label: 'Totalkapitalrentabilitet', text: 'TKR = (Driftsresultat + Finansinntekter) / Totalkapital × 100. Måler avkastning på ALL investert kapital.' },
      { label: 'Egenkapitalrentabilitet', text: 'EKR = Årsoverskudd / Egenkapital × 100. Måler avkastningen på eiernes egne midler.' },
      { label: 'Referanseverdi', text: 'Bør normalt overstige risikofri rente (statsobligasjoner) pluss en risikopremie.' },
    ],
    practical: 'Bedrift A har investert 2 mill. kr og tjener 300 000 kr. Bedrift B har investert 10 mill. kr og tjener 900 000 kr. Hvem er mest lønnsom? (Regn ut TKR for begge.)',
    exercises: [
      {
        id: 'N2-1',
        icon: '📈',
        title: 'Beregning av TKR',
        question: 'En bedrift har driftsresultat på 400 000 kr og totalkapital på 2 000 000 kr. Hva er totalkapitalrentabiliteten?',
        choices: [
          { id: 'a', label: '5 %', isCorrect: false, feedback: '400 000 / 2 000 000 = 0,20 = 20 %. Sjekk regnestykket ditt.' },
          { id: 'b', label: '20 %', isCorrect: true, feedback: 'Riktig! TKR = 400 000 / 2 000 000 × 100 = 20 %. Dette er en god avkastning.' },
          { id: 'c', label: '40 %', isCorrect: false, feedback: 'Du har sikkert delt feil vei. Husk: driftsresultat ÷ totalkapital × 100.' },
        ],
        espenTip: 'Formel: TKR = Driftsresultat / Totalkapital × 100. Prosenten sier: for hver 100 kr investert tjener bedriften X kr.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💧',
    title: 'Likviditetsgrad 1 — Evnen til å betale regninger',
    quote: '«En bedrift kan overleve uten overskudd, men ikke uten penger i kassa.»',
    content: 'Likviditet handler om bedriftens evne til å betale sine kortsiktige forpliktelser etter hvert som de forfaller. Likviditetsgrad 1 (LG1) er det viktigste nøkkeltallet for kortsiktig betalingsevne.',
    subpoints: [
      { label: 'Formel', text: 'LG1 = Omløpsmidler / Kortsiktig gjeld. Bør helst være over 2.' },
      { label: 'Omløpsmidler', text: 'Kassekredit, bankkonto, kundefordringer, varelager — ting som kan gjøres til penger innen ett år.' },
      { label: 'Likviditetsskvisen', text: 'En bedrift med høy omsetning og godt overskudd kan likevel gå konkurs hvis den har dårlig likviditet.' },
    ],
    practical: 'Bedrift A har omløpsmidler på 800 000 og kortsiktig gjeld på 600 000. Regn ut LG1. Er den frisk nok?',
    exercises: [
      {
        id: 'N3-1',
        icon: '💧',
        title: 'Beregning av LG1',
        question: 'En bedrift har omløpsmidler på 1 200 000 kr og kortsiktig gjeld på 500 000 kr. Hva er likviditetsgrad 1?',
        choices: [
          { id: 'a', label: '1,2', isCorrect: false, feedback: '1 200 000 / 500 000 = 2,4, ikke 1,2.' },
          { id: 'b', label: '2,4', isCorrect: true, feedback: 'Riktig! LG1 = 1 200 000 / 500 000 = 2,4. Dette er over 2, som er referanseverdien — bedriften er i god likviditetsform.' },
          { id: 'c', label: '4,2', isCorrect: false, feedback: 'Sjekk regnestykket: del omløpsmidler PÅ kortsiktig gjeld.' },
        ],
        espenTip: 'LG1 bør være over 2. Det betyr at du har dobbelt så mye lett tilgjengelig som det du skylder på kort sikt.',
      },
      {
        id: 'N3-2',
        icon: '⚠️',
        title: 'Likviditetsparadoks',
        question: 'En restaurant har 800 000 kr i overskudd dette året, men banken er bekymret. Hva kan forklaringen være?',
        choices: [
          { id: 'a', label: 'Banken har gjort en feil i sine beregninger', isCorrect: false, feedback: 'Det er usannsynlig. Det er nok en god grunn til bekymringen.' },
          { id: 'b', label: 'Restauranten har høyt overskudd men lav likviditet — de mangler kontanter til å betale regninger', isCorrect: true, feedback: 'Riktig! Overskudd og likviditet er ikke det samme. Overskuddet kan sitte i varelager eller kundefordringer mens regningene forfaller.' },
          { id: 'c', label: 'Bankens rentekrav er for høyt', isCorrect: false, feedback: 'Renter er en kostnad, men det svarer ikke på spørsmålet om bekymringen.' },
        ],
        espenTip: 'Huskeregel: Overskudd = regnskapet viser pluss. Likviditet = penger tilgjengelig NÅ.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🏛️',
    title: 'Soliditet — Evnen til å tåle tap',
    quote: '«Soliditet er bufferen mot uvær.»',
    content: 'Soliditet måler bedriftens evne til å tåle tap over tid. En bedrift med høy egenkapitalprosent er mer robust enn en med mye gjeld. Egenkapitalprosenten er det viktigste soliditetsmålet.',
    subpoints: [
      { label: 'Egenkapitalprosent', text: 'EKP = Egenkapital / Totalkapital × 100. Referanseverdi: over 30–35 % er bra.' },
      { label: 'Lav soliditet', text: 'Bedriften finansierer seg primært med lån. Sårbar ved renteøkning eller nedgang.' },
      { label: 'Høy soliditet', text: 'Mye egenkapital. Bedriften tåler tap uten å gå konkurs.' },
    ],
    practical: 'Bedrift A: egenkapital 2 mill., totalkapital 5 mill. Bedrift B: egenkapital 500 000, totalkapital 5 mill. Hvem er mest solid?',
    exercises: [
      {
        id: 'N4-1',
        icon: '🏛️',
        title: 'Beregning av soliditet',
        question: 'En bedrift har egenkapital på 1 500 000 kr og totalkapital på 5 000 000 kr. Hva er egenkapitalprosenten?',
        choices: [
          { id: 'a', label: '15 %', isCorrect: false, feedback: '1 500 000 / 5 000 000 = 0,30 = 30 %. Husk å gange med 100.' },
          { id: 'b', label: '30 %', isCorrect: true, feedback: 'Riktig! EKP = 1 500 000 / 5 000 000 × 100 = 30 %. Dette er på grensen til tilfredsstillende soliditet.' },
          { id: 'c', label: '45 %', isCorrect: false, feedback: 'Sjekk tallene: 1,5 mill. / 5 mill. × 100 = 30 %.' },
        ],
        espenTip: 'Referanse: 30 % er "OK", over 35 % er bra. Under 20 % er bekymringsfullt for långivere.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📉',
    title: 'Dekningsgrad — Andelen til faste kostnader',
    quote: '«Dekningsgraden forteller deg om du har råd til å drive.»',
    content: 'Dekningsgraden viser hvor stor andel av salgsinntekten som er igjen til å dekke de faste kostnadene etter at de variable kostnadene er betalt.',
    subpoints: [
      { label: 'Formel', text: 'DG = (Salgsinntekter − Variable kostnader) / Salgsinntekter × 100.' },
      { label: 'Tolkning', text: 'DG på 40 % betyr at 40 øre av hver krone til overs etter variable kostnader går til å dekke husleie, lønn, etc.' },
      { label: 'Kritisk punkt', text: 'Når dekningsbidraget akkurat dekker de faste kostnadene = nullpunkt (break-even).' },
    ],
    practical: 'En kafé har salgsinntekter på 500 000 og variable kostnader på 200 000. Hva er dekningsgraden?',
    exercises: [
      {
        id: 'N5-1',
        icon: '📉',
        title: 'Dekningsgrad',
        question: 'En bedrift har salgsinntekter på 800 000 kr og variable kostnader på 320 000 kr. Hva er dekningsgraden?',
        choices: [
          { id: 'a', label: '40 %', isCorrect: false, feedback: '(800 000 − 320 000) / 800 000 = 480 000 / 800 000 = 60 %. Ikke 40 %.' },
          { id: 'b', label: '60 %', isCorrect: true, feedback: 'Riktig! DG = (800 000 − 320 000) / 800 000 × 100 = 60 %.' },
          { id: 'c', label: '25 %', isCorrect: false, feedback: 'Sjekk formelen: (Salgsinntekter − Variable kostnader) / Salgsinntekter × 100.' },
        ],
        espenTip: 'Enkel huskeregel: DG = DB / Salgsinntekter × 100, der DB = Salgsinntekter − Variable kostnader.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🚚',
    title: 'Transportselskapet — Et praktisk eksempel',
    quote: '«Ulike bransjer krever ulike normer for nøkkeltall.»',
    content: 'Et transportselskap har kjøpt nye lastebiler finansiert med banklån. Dette påvirker nøkkeltallene på bestemte måter. La oss analysere situasjonen.',
    subpoints: [
      { label: 'Lav soliditet', text: 'Bilene er finansiert med lån → mye gjeld → lav egenkapitalprosent.' },
      { label: 'Stabil likviditet', text: 'Langtidskontrakter med NorgesGruppen gir stabile innbetalinger med 14 dagers frist.' },
      { label: 'Lav, men forutsigbar rentabilitet', text: 'Lav margin per tur, men høyt volum gir stabilt overskudd.' },
      { label: 'God dekningsgrad', text: 'Diesel og sjåfør er variable kostnader — kjøretøy og administrasjon er faste.' },
    ],
    practical: 'Hvis banken hever renten med 2 %, hvilke av de fire nøkkeltallene påvirkes mest for dette selskapet?',
    exercises: [
      {
        id: 'N6-1',
        icon: '🚚',
        title: 'Nøkkeltall i transportbransjen',
        question: 'Transportselskapet har LG1 = 1.7. Banken krever at det holdes over 1.5. Er dette tilfredsstillende?',
        choices: [
          { id: 'a', label: 'Nei — LG1 bør være over 2, så 1.7 er for lavt', isCorrect: false, feedback: 'For mange bransjer er 2 ideelt, men bankens krav her er 1.5, og bedriften er på 1.7 — over grensen.' },
          { id: 'b', label: 'Ja — LG1 er over bankens kravgrense på 1.5, men bør overvåkes nøye', isCorrect: true, feedback: 'Riktig! Bedriften møter bankens krav, men med liten margin. Et uventet tap kan bryte grensen.' },
          { id: 'c', label: 'Ja — 1.7 er utmerket, ingen grunn til bekymring', isCorrect: false, feedback: 'Med liten buffer til bankens kravgrense bør bedriften overvåke likviditeten nøye.' },
        ],
        espenTip: 'Nøkkeltall leses alltid i kontekst. Referanseverdiene varierer mellom bransjer.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🔧',
    title: 'Arbeidskapital — Penger til daglig drift',
    quote: '«Arbeidskapitalen er smøringen som holder maskineriet i gang.»',
    content: 'Arbeidskapital er pengene som er disponible for daglig drift etter at kortsiktig gjeld er trukket fra omløpsmidlene. Det er forskjellen mellom det du har lett tilgjengelig og det du skylder på kort sikt.',
    subpoints: [
      { label: 'Formel', text: 'Arbeidskapital = Omløpsmidler − Kortsiktig gjeld.' },
      { label: 'Positiv arbeidskapital', text: 'Bedriften har mer lett tilgjengelige midler enn kortsiktig gjeld. God buffer.' },
      { label: 'Negativ arbeidskapital', text: 'Farlig signal — bedriften kan ikke betale sine løpende forpliktelser fra tilgjengelige midler.' },
    ],
    practical: 'En restaurant har omløpsmidler på 450 000 og kortsiktig gjeld på 380 000. Hva er arbeidskapitalen?',
    exercises: [
      {
        id: 'N7-1',
        icon: '🔧',
        title: 'Beregning av arbeidskapital',
        question: 'En bedrift har omløpsmidler på 900 000 kr og kortsiktig gjeld på 650 000 kr. Hva er arbeidskapitalen?',
        choices: [
          { id: 'a', label: '250 000 kr', isCorrect: true, feedback: 'Riktig! Arbeidskapital = 900 000 − 650 000 = 250 000 kr. Positiv arbeidskapital er et godt tegn.' },
          { id: 'b', label: '1 550 000 kr', isCorrect: false, feedback: 'Du har lagt sammen i stedet for å trekke fra. Formelen er omløpsmidler MINUS kortsiktig gjeld.' },
          { id: 'c', label: '−250 000 kr', isCorrect: false, feedback: 'Du har snudd regnestykket. 900 000 − 650 000 = +250 000, ikke negativt.' },
        ],
        espenTip: 'Positiv arbeidskapital = trygghet. Negativ = krise. Null = akkurat på kanten.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Misforståelser — Overskudd er ikke penger i kassa',
    quote: '«Det finnes løgnere, jøvla løgnere — og regnskapet.»',
    content: 'Den vanligste og farligste misforståelsen i økonomi er å tro at regnskapsmessig overskudd er det samme som penger på bankkontoen. De er fundamentalt forskjellige begreper.',
    subpoints: [
      { label: 'Overskudd vs. likviditet', text: 'Overskudd = Inntekter − Kostnader. Likviditet = inn- og utbetalinger. De er IKKE det samme.' },
      { label: 'Avskrivninger', text: 'En maskin til 1 mill. kr avskrives over 5 år. Det gir 200 000 i kostnad — men null i utbetaling det aktuelle året.' },
      { label: 'Kredittsalg', text: 'Bedriften fakturerer 500 000 kr i november. Det er inntekt, men pengene kommer kanskje ikke inn før januar.' },
      { label: 'Konkurs med overskudd', text: 'Det er mulig å gå konkurs med positivt årsresultat — hvis du ikke har penger til å betale lønn i dag.' },
    ],
    practical: 'En konsulent leverer faktura på 200 000 i desember, men kunden betaler ikke før mars. Hvem viser inntekten i regnskapet for desember?',
    exercises: [
      {
        id: 'N8-1',
        icon: '💡',
        title: 'Overskudd vs. likviditet',
        question: 'En bedrift viser 500 000 kr i årsoverskudd, men søker om betalingsutsettelse hos leverandørene. Hva er den mest sannsynlige forklaringen?',
        choices: [
          { id: 'a', label: 'Regnskapet er feil — bedriften kan ikke ha overskudd og pengeproblemer samtidig', isCorrect: false, feedback: 'Dette er faktisk mulig! Overskudd og likviditet er to ulike ting.' },
          { id: 'b', label: 'Bedriften har høyt overskudd i regnskapet, men pengene sitter fast i kundefordringer eller varelager', isCorrect: true, feedback: 'Riktig! Kredittsalg og store varelager kan skape en situasjon der regnskapet viser overskudd, mens kassen er tom.' },
          { id: 'c', label: 'Bedriften har betalt for store utbytter til eierne', isCorrect: false, feedback: 'Mulig, men ikke den "mest sannsynlige" forklaringen gitt informasjonen i spørsmålet.' },
        ],
        espenTip: 'Husk: Regnskap måler verdier (periodisert). Likviditet måler kontantstrøm (kassaprinsipp).',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Verdifastsettelse og lovverk',
    quote: '«Regnskapsreglene er ikke valg — de er krav.»',
    content: 'Beregning og tolkning av nøkkeltall påvirkes av regnskapslovens regler for verdifastsettelse av eiendeler. Det er viktig å forstå disse prinsippene.',
    subpoints: [
      { label: 'Historisk kost', text: 'Eiendeler vurderes til anskaffelseskost (hva du betalte), ikke markedsverdi.' },
      { label: 'Laveste verdis prinsipp', text: 'Varelager vurderes til lavest av anskaffelseskost og virkelig verdi.' },
      { label: 'Avskrivninger', text: 'Driftsmidler avskrives over forventet levetid. Påvirker rentabiliteten.' },
      { label: 'Regnskapsloven', text: 'Norske bedrifter over en viss størrelse har plikt til å utarbeide årsregnskap etter regnskapsloven.' },
    ],
    practical: 'Hvorfor kan to bedrifter med identiske varelager vise ulike balansetall?',
    exercises: [
      {
        id: 'N9-1',
        icon: '⚖️',
        title: 'Regnskapslovens prinsipp',
        question: 'En bedrift kjøpte en varebil for 400 000 kr for 4 år siden. Bilen er nå verdt 100 000 kr i markedet. Hvilken verdi brukes i regnskapet (forutsatt lineær avskrivning over 5 år)?',
        choices: [
          { id: 'a', label: '100 000 kr — markedsverdien', isCorrect: false, feedback: 'Regnskapet bruker ikke markedsverdi for driftsmidler. Det bruker bokført verdi (anskaffelseskost minus avskrivninger).' },
          { id: 'b', label: '80 000 kr — bokført verdi etter 4 år med lineære avskrivninger', isCorrect: true, feedback: 'Riktig! Lineær avskrivning: 400 000 / 5 = 80 000 kr per år. Etter 4 år: 400 000 − (4 × 80 000) = 80 000 kr i bokført verdi.' },
          { id: 'c', label: '400 000 kr — anskaffelseskost', isCorrect: false, feedback: 'Anskaffelseskost er utgangspunktet, men avskrivninger reduserer bokført verdi hvert år.' },
        ],
        espenTip: 'Lineær avskrivning: del anskaffelseskost på antall år. Trekk fra for hvert år som har gått.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Nøkkeltall i sammenheng',
    quote: '«Ét nøkkeltall er et ryktemål. Alle fire er sannheten.»',
    content: 'Nøkkeltall gir størst verdi når de leses i sammenheng. En bedrift med god rentabilitet men dårlig likviditet er i fare. En bedrift med alle fire på grønt er robust.',
    subpoints: [
      { label: 'Rentabilitet', text: 'TKR og EKR — hvor effektivt jobber kapitalen?' },
      { label: 'Likviditet', text: 'LG1 bør være over 2 — kan vi betale regningene nå?' },
      { label: 'Soliditet', text: 'EKP bør være over 30 % — tåler vi tap?' },
      { label: 'Dekningsgrad', text: 'DG viser andelen som dekker faste kostnader.' },
      { label: 'Arbeidskapital', text: 'Positiv arbeidskapital = buffer for daglig drift.' },
    ],
    practical: 'Lag en "helsesjekk" for din lokale Kiwi-butikk. Hvilke av disse nøkkeltallene tror du er sterkest og svakest?',
    exercises: [
      {
        id: 'N10-1',
        icon: '🎯',
        title: 'Helhetsvurdering',
        question: 'En bedrift har: TKR = 8 %, LG1 = 0.8, EKP = 25 %, DG = 55 %. Hva er den viktigste bekymringen?',
        choices: [
          { id: 'a', label: 'Lav rentabilitet (TKR = 8 %)', isCorrect: false, feedback: '8 % TKR er lav men ikke kritisk. Den mest akutte bekymringen er et annet nøkkeltall.' },
          { id: 'b', label: 'Lav likviditet (LG1 = 0.8) — bedriften kan ikke betale løpende forpliktelser', isCorrect: true, feedback: 'Riktig! LG1 under 1 er kritisk — det betyr at bedriften har mer kortsiktig gjeld enn omløpsmidler. Dette er en akutt likviditetskrise.' },
          { id: 'c', label: 'Lav soliditet (EKP = 25 %)', isCorrect: false, feedback: '25 % EKP er i nedre del av akseptabelt, men ikke akutt. LG1 = 0.8 er den kritiske verdien.' },
        ],
        espenTip: 'Likviditetsgraden er den mest akutte indikatoren. En bedrift kan overleve lav soliditet over tid, men konkurs fra likviditetsmangel kan skje på dager.',
      },
      {
        id: 'N10-2',
        icon: '📊',
        title: 'Nøkkeltall og konkurs',
        question: 'Bedrift A har årsoverskudd 600 000 kr, men LG1 = 0.6. Bedrift B har årsunderskudd 100 000 kr, men LG1 = 3.0. Hvem er i størst risiko for konkurs?',
        choices: [
          { id: 'a', label: 'Bedrift B — fordi den har underskudd', isCorrect: false, feedback: 'Paradoksalt nok er ikke underskudd i seg selv konkurssymptom. Et selskap med solid likviditet kan finansiere seg gjennom et dårlig år.' },
          { id: 'b', label: 'Bedrift A — fordi LG1 = 0.6 betyr at den ikke kan betale løpende regninger', isCorrect: true, feedback: 'Riktig! Bedrift A kan gå konkurs til tross for overskudd, fordi den ikke har tilgjengelig kapital til å betale fakturaer og lønn.' },
          { id: 'c', label: 'Begge er like risikable', isCorrect: false, feedback: 'Nei — akutt likviditetsmangel (LG1 = 0.6) er langt mer kritisk enn et beskjedent underskudd med god likviditetsbuffer.' },
        ],
        espenTip: 'Husk: "Cash is king." Overskudd er sunnhet på lang sikt. Likviditet avgjør om du overlever i morgen.',
      },
    ],
  },
]

export default function NokkeltallLonnsomhetModule() {
  return (
    <DrawerModule
      moduleCode="OK-VG2-7N"
      moduleTitle="Nøkkeltall og lønnsomhet"
      moduleIcon="📊"
      storageKey="learning-vg2-nokkeltall-lonnsomhet"
      completeRoute="/learning/vg2/okonomi/nokkeltall-lonnsomhet/complete"
      phases={phases}
      intro="Lær å lese bedriftens finansielle helsetilstand gjennom de fire nøkkeltallene: rentabilitet, likviditet, soliditet og dekningsgrad."
      vissteduAt="En bedrift kan faktisk gå konkurs med positivt årsresultat — dersom den mangler kontanter til å betale lønn og regninger i dag."
      espenSier="Nøkkeltall er bedriftens vitale tegn. En lege sjekker puls, blodtrykk og temperatur — du sjekker TKR, LG1 og EKP. Lær å lese dem sammen, ikke hver for seg."
      presentationLink={{ route: '/learning/presentations/nokkeltall-lonnsomhet', description: 'Nøkkeltall og lønnsomhet — en visuell presentasjon' }}
    />
  )
}
