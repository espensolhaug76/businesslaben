import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Rekruttering — Å finne de rette menneskene',
    quote: '«Ansettelse er den viktigste beslutningen en leder tar.»',
    content: 'Rekruttering er en strategisk investering i menneskelig kapital. I service- og reiselivsnæringen er de ansatte bedriftens fremste ressurs — de er produktet kunden opplever. En feilansettelse koster bedriften tid, penger og omdømme.',
    subpoints: [
      { label: 'Strategisk prosess', text: 'Rekruttering starter lenge før stillingsannonsen publiseres.' },
      { label: 'Menneskene er produktet', text: 'I servicebedrifter leverer de ansatte produktet direkte til kunden.' },
      { label: 'Kostnaden ved feilansettelse', text: 'En feilrekruttering kan koste 6–12 måneders lønn inkl. opplæring og exit.' },
    ],
    practical: 'Tenk på en god kundeopplevelse du har hatt. Hva var det den ansatte gjorde som gjorde det spesielt?',
    exercises: [
      {
        id: 'R1-1',
        icon: '🤔',
        title: 'Strategisk rekruttering',
        question: 'Hvorfor kalles rekruttering en "strategisk prosess"?',
        choices: [
          { id: 'a', label: 'Fordi man bruker strategispill for å velge kandidater', isCorrect: false, feedback: 'Feil — det handler ikke om spill.' },
          { id: 'b', label: 'Fordi man nøye planlegger behovet, kravene og prosessen lenge før ansettelse', isCorrect: true, feedback: 'Riktig! En strategisk rekrutteringsprosess starter med grundig planlegging av hvilken kompetanse bedriften faktisk trenger.' },
          { id: 'c', label: 'Fordi HR-avdelingen har en overordnet strategi for selskapet', isCorrect: false, feedback: 'Delvis riktig, men dette svarer ikke på spørsmålet.' },
        ],
        espenTip: 'En strategisk prosess betyr at man tenker fremover — hva trenger bedriften om 2 år, ikke bare i dag?',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔄',
    title: 'Rekrutteringshjulet — Fra jobbanalyse til onboarding',
    quote: '«En god ansettelse begynner med å vite hva du leter etter.»',
    content: 'Rekrutteringshjulet er en syklisk modell som beskriver hele ansettelsesprosessen fra start til slutt. Ingen faser kan hoppes over uten å øke risikoen for feilansettelse.',
    subpoints: [
      { label: '1. Jobbanalyse', text: 'Kartlegge hva stillingen krever av oppgaver, ansvar og personlighet.' },
      { label: '2. Utlysning og søknadsbehandling', text: 'Formulere annonse, motta og sile søknader.' },
      { label: '3. Intervju og utvelgelse', text: 'Strukturerte intervjuer, arbeidsprøver og referansesjekk.' },
      { label: '4. Tilbud og kontrakt', text: 'Tilby jobb og utforme arbeidsavtale.' },
      { label: '5. Onboarding', text: 'Strukturert innføring av den nyansatte i kultur og arbeidsoppgaver.' },
    ],
    practical: 'Tegn rekrutteringshjulet på et ark. Diskuter: hva skjer hvis man hopper over onboarding-fasen?',
    exercises: [
      {
        id: 'R2-1',
        icon: '🔄',
        title: 'Riktig rekkefølge',
        question: 'Hva er den FØRSTE fasen i et rekrutteringshjul?',
        choices: [
          { id: 'a', label: 'Publisere stillingsannonse', isCorrect: false, feedback: 'Annonsen publiseres etter at jobbanalysen er gjort — ellers vet du ikke hva du skal søke etter.' },
          { id: 'b', label: 'Jobbanalyse — kartlegge oppgaver og krav til stillingen', isCorrect: true, feedback: 'Korrekt! Jobbanalysen er fundamentet. Uten den vet du ikke hva du skal lyse ut etter.' },
          { id: 'c', label: 'Gjennomføre intervjuer', isCorrect: false, feedback: 'Intervjuer skjer sent i prosessen, etter at søknader er sortert.' },
        ],
        espenTip: 'Husk sekvensen: Analyser → Annonser → Sil → Intervju → Sjekk → Tilbud → Onboard.',
      },
      {
        id: 'R2-2',
        icon: '🚀',
        title: 'Onboarding',
        question: 'Hva er formålet med onboarding?',
        choices: [
          { id: 'a', label: 'Å gi den nyansatte en velkomstpakke med merkede gjenstander', isCorrect: false, feedback: 'Det kan inngå, men det er ikke formålet med onboarding.' },
          { id: 'b', label: 'Strukturert integrering av den nyansatte i bedriftens kultur, systemer og arbeidsoppgaver', isCorrect: true, feedback: 'Riktig! God onboarding reduserer opplæringstid og øker sjansen for at den ansatte trives og blir.' },
          { id: 'c', label: 'En obligatorisk prøvetid på tre måneder', isCorrect: false, feedback: 'Prøvetid er et juridisk begrep i arbeidsmiljøloven, ikke det samme som onboarding.' },
        ],
        espenTip: 'Bedrifter med god onboarding beholder nyansatte lenger — og det sparer penger.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔍',
    title: 'Jobbanalyse — Kartlegge oppgaver og krav',
    quote: '«Hvis du ikke vet hva du leter etter, vil du ikke gjenkjenne det når du finner det.»',
    content: 'En jobbanalyse er en systematisk kartlegging av stillingens innhold. Den er grunnlaget for stillingsannonsen, intervjuguiden og prøvetidens vurderingskriterier.',
    subpoints: [
      { label: 'Arbeidsoppgaver', text: 'Hva skal personen gjøre? Daglige, ukentlige og periodiske oppgaver.' },
      { label: 'Ansvarsområder', text: 'Hva er personen ansvarlig for — bunn, omdømme, sikkerhet?' },
      { label: 'Formelle krav', text: 'Fagbrev, sertifikater, språkkunnskaper, lisenspåkrevde oppgaver.' },
      { label: 'Personlige egenskaper', text: 'I SSR veier pålitelighet, serviceinnstilling og fleksibilitet tyngst.' },
    ],
    practical: 'Skriv din egen jobbanalyse for rollen som resepsjonist på et hotell. Hva kreves av oppgaver, ansvar og personlighet?',
    exercises: [
      {
        id: 'R3-1',
        icon: '📋',
        title: 'Jobbanalyse vs. stillingsannonse',
        question: 'Hva er forholdet mellom jobbanalyse og stillingsannonse?',
        choices: [
          { id: 'a', label: 'De er det samme — stillingsannonsen er jobbanalysen', isCorrect: false, feedback: 'Nei — jobbanalysen er det interne dokumentet, stillingsannonsen er det eksterne markedsføringen.' },
          { id: 'b', label: 'Jobbanalysen skrives internt først, og er grunnlaget for hva som tas inn i annonsen', isCorrect: true, feedback: 'Riktig! Jobbanalysen er det interne arbeidsverktøyet som gir innholdet til annonsen.' },
          { id: 'c', label: 'Stillingsannonsen skrives alltid av HR, mens jobbanalysen skrives av leder', isCorrect: false, feedback: 'Hvem som skriver dem varierer med bedriftsstørrelse — dette er ikke det sentrale poenget.' },
        ],
        espenTip: 'Tenk: jobbanalyse er for internt bruk (hvem passer?), stillingsannonsen er ekstern markedsføring (hvem søker?).',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📚',
    title: 'Sentrale begreper — Prøvetid, referansesjekk og attest',
    quote: '«Kjenner du begrepene, forstår du rettighetene.»',
    content: 'I rekrutteringsprosessen møter du en rekke juridiske og administrative begreper. Det er viktig å forstå dem presist, spesielt fordi mange arbeidstakere misforstår sine egne rettigheter.',
    subpoints: [
      { label: 'Prøvetid', text: 'Maks 6 måneder fra start. Arbeidsgiver kan si opp med kortere frist ved mangelfull tilpasning, dyktighet eller pålitelighet.' },
      { label: 'Referansesjekk', text: 'Arbeidsgiver kontakter tidligere sjefer for å verifisere opplysninger og vurdere kandidaten.' },
      { label: 'Attest', text: 'Formelt dokument fra tidligere arbeidsgiver som bekrefter ansettelsens varighet og innhold. Taushetsplikten setter grenser for hva som kan stå.' },
      { label: 'Onboarding', text: 'Strukturert opplæring og sosialisering av nyansatt i bedriften.' },
      { label: 'Personlig egnethet', text: 'I SSR vektlegges holdninger og tilpasningsevne høyt i utvelgelsen.' },
    ],
    practical: 'Du mottar en referanse fra en tidligere arbeidsgiver som bare sier "personen jobbet her fra 2022–2024". Hva kan du konkludere — og hva kan du IKKE konkludere?',
    exercises: [
      {
        id: 'R4-1',
        icon: '⚖️',
        title: 'Prøvetidens lengde',
        question: 'Hva er maksimal prøvetid etter arbeidsmiljøloven?',
        choices: [
          { id: 'a', label: '3 måneder', isCorrect: false, feedback: 'Tre måneder er minimum — maksimum er seks måneder. Mange bedrifter bruker tre måneder i praksis.' },
          { id: 'b', label: '6 måneder', isCorrect: true, feedback: 'Riktig! Arbeidsmiljøloven sier maks 6 måneder prøvetid. Den kan forlenges dersom den ansatte har vært fraværende i prøveperioden.' },
          { id: 'c', label: '12 måneder', isCorrect: false, feedback: 'Et år er for lenge — loven setter grensen ved 6 måneder.' },
        ],
        espenTip: 'Husk: 6 måneder max prøvetid. Oppsigelse i prøvetiden krever saklig grunn: tilpasning, dyktighet eller pålitelighet.',
      },
      {
        id: 'R4-2',
        icon: '🔒',
        title: 'Referansesjekk og personvern',
        question: 'Hva er en referansesjekk?',
        choices: [
          { id: 'a', label: 'En obligatorisk bakgrunnssjekk av kriminelle registre', isCorrect: false, feedback: 'Politiattest er det obligatoriske begreper for visse yrker. Referansesjekk er fra tidligere arbeidsgivere.' },
          { id: 'b', label: 'Arbeidsgiver kontakter oppgitte referansepersoner for å verifisere kandidaten', isCorrect: true, feedback: 'Riktig! Typisk er referansepersoner tidligere ledere som kan bekrefte arbeidsevne og holdninger.' },
          { id: 'c', label: 'En test kandidaten tar for å sjekke sine faglige kunnskaper', isCorrect: false, feedback: 'Det er en arbeidstest eller fagprøve, ikke referansesjekk.' },
        ],
        espenTip: 'Referansesjekken er din "forsikring" — en god kandidat bør tåle at arbeidsgiveren snakker med de tidligere sjefer.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🤝',
    title: 'Hva arbeidsgivere i SSR ser etter',
    quote: '«Holdninger lærer du ikke bort — kunnskap kan du.»',
    content: 'I salg, service og reiseliv er jobben å levere opplevelser til mennesker. Det gjør at personlige egenskaper vektes annerledes enn i mange andre yrker. En positiv holdning og pålitelighet kan trumfe manglende erfaring.',
    subpoints: [
      { label: 'Holdninger og serviceinnstilling', text: 'En naturlig glede ved å hjelpe andre er vanskelig å trene opp.' },
      { label: 'Pålitelighet og punktlighet', text: 'Møter kandidaten presis til intervjuet? Holder hen avtaler?' },
      { label: 'Fleksibilitet', text: 'Servicebransjen krever kvelds-, helge- og helligdagsvakter.' },
      { label: 'Kroppsspråk og presentasjon', text: 'Førsteinntrykket til kunden starter med de ansattes fremtoning.' },
    ],
    practical: 'Rollespill: Gjennomfør et intervju for jobben som barista. Hva spør du om for å avdekke holdninger — ikke bare kunnskap?',
    exercises: [
      {
        id: 'R5-1',
        icon: '⭐',
        title: 'Personlig egnethet',
        question: 'Hvorfor vektlegger SSR-bedrifter personlig egnethet høyere enn i mange andre bransjer?',
        choices: [
          { id: 'a', label: 'Fordi faglige ferdigheter ikke trengs i serviceyrkene', isCorrect: false, feedback: 'Feil — faglige ferdigheter trengs, men de er lettere å lære opp enn holdninger.' },
          { id: 'b', label: 'Fordi de ansatte leverer opplevelsen direkte — et surt ansikt kan ødelegge hele oppholdet', isCorrect: true, feedback: 'Riktig! I SSR ER de ansatte produktet. Tekniske ferdigheter kan trenes; genuin serviceinnstilling er vanskeligere å forme.' },
          { id: 'c', label: 'Fordi det er billigere å trene opp fagkunnskap enn å finne kandidater med riktig personlighet', isCorrect: false, feedback: 'Delvis sant, men den egentlige grunnen er at holdningen påvirker kundeopplevelsen direkte.' },
        ],
        espenTip: 'Husk: "Hire for attitude, train for skill" — en vanlig setning i serviceledelse.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🚌',
    title: 'Vy Drammen — Mangfoldsrekruttering i praksis',
    quote: '«Mangfold i arbeidsstyrken gjenspeiler mangfoldet i kundene.»',
    content: 'Vy sin bussdivisjon i Drammen vant en nasjonal mangfoldspris for sin bevisste rekrutteringsstrategi. De rekrutterte aktivt ufaglærte arbeidssøkere og kvinner til sjåførrollen — et tradisjonelt mannsdominert yrke.',
    subpoints: [
      { label: 'Problemet', text: 'Bransjen slet med sjåfør-mangel og lav kvinneandel.' },
      { label: 'Løsningen', text: 'Oppsøkte aktuelle kandidater på tvers av kjønn, etnisitet og alder. Tilbød intern opplæring til busslisens.' },
      { label: 'Resultatet', text: 'Økt mangfold, bedre trivselsscorer og nominasjon til mangfoldsprisen.' },
      { label: 'Lærdommen', text: 'Kravspesifikasjoner kan utilsiktet diskriminere — vær bevisst på hvilke krav som virkelig er nødvendige.' },
    ],
    practical: 'Hvilke krav i en stillingsannonse for resepsjonist kunne utilsiktet ekskludere gode kandidater?',
    exercises: [
      {
        id: 'R6-1',
        icon: '🌍',
        title: 'Mangfold og rekruttering',
        question: 'Hva var den viktigste strategiske beslutningen Vy Drammen tok for å øke mangfoldet?',
        choices: [
          { id: 'a', label: 'De senket kravene til sjåfører for å få inn flere søkere', isCorrect: false, feedback: 'Nei — de senket ikke kravene til utførelse. De tilbød intern opplæring i stedet for å kreve at folk allerede hadde buss-lisens.' },
          { id: 'b', label: 'De oppsøkte aktuelle kandidater på tvers av bakgrunn og tilbød intern opplæring', isCorrect: true, feedback: 'Riktig! I stedet for å vente på søkere med riktig CV, gikk de ut og rekrutterte fra grupper som sjelden søkte — og ga dem opplæringen de trengte.' },
          { id: 'c', label: 'De fjernet krav om norskferdigheter for å nå flere kandidater', isCorrect: false, feedback: 'Buss-sjåfører må kommunisere med passasjerer — norskferdigheter er et reelt krav i en slik rolle.' },
        ],
        espenTip: 'Proaktiv rekruttering betyr at du ikke venter på søkerne å komme til deg — du oppsøker dem.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🛒',
    title: 'Kiwi-metoden — Fleksibilitet og kroppsspråk',
    quote: '«Karakterer forteller hva du kan. Kroppsspråk viser hvem du er.»',
    content: 'Kiwi-butikksjefer forteller at de under intervjuer legger mer vekt på om kandidaten virker naturlig serviceinnstilt og fleksibel enn på skolekarakterer. Den beste butikkmedarbeideren er ikke alltid topp-student.',
    subpoints: [
      { label: 'Kroppsspråk', text: 'Åpen holdning, øyekontakt, smil — signaliserer serviceinnstilling.' },
      { label: 'Fleksibilitet', text: 'Kan du jobbe fredagskveld? Lørdager? Helligdager? I SSR er dette reelle krav.' },
      { label: 'Ekte interesse', text: 'Har kandidaten lest om bedriften? Stilt forberedende spørsmål?' },
      { label: 'Liten "prøve"', text: 'Noen butikksjefer observerer hvordan kandidaten oppfører seg i kassa-køen FØR intervjuet starter.' },
    ],
    practical: 'Forbered deg til et intervju på Kiwi. Hva gjør du for å vise serviceinnstilling — før du engang åpner munnen?',
    exercises: [
      {
        id: 'R7-1',
        icon: '😊',
        title: 'Ikke-verbale signaler',
        question: 'En jobbkandidat ankommer 10 minutter tidlig, holder døren åpen for en eldre person, smiler til resepsjonisten og sitter avslappet med åpent kroppsspråk. Hva signaliserer dette?',
        choices: [
          { id: 'a', label: 'Ingenting spesielt — det er bare vanlig folkeskikk', isCorrect: false, feedback: 'Kloke arbeidsgivere ser nettopp dette som en "test" — atferd FØR intervjuet starter er svært avslørende.' },
          { id: 'b', label: 'Kandidaten er sannsynligvis serviceinnstilt, punktlig og viser respekt for andre', isCorrect: true, feedback: 'Riktig! Mange arbeidsgivere observerer kandidater fra det øyeblikket de ankommer — ikke bare under det formelle intervjuet.' },
          { id: 'c', label: 'Kandidaten er overdrevent ivrig og bør vurderes kritisk', isCorrect: false, feedback: 'Tvert imot — naturlig høflighet og punktlighet er svært positive signaler for en servicestilling.' },
        ],
        espenTip: 'Intervjuet starter idet du trer inn i bygget — ikke når du setter deg ned.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Misforståelser om rekruttering og prøvetid',
    quote: '«Du har rettigheter — men du har også plikter.»',
    content: 'Mange nyansatte og jobbsøkere har feiloppfatninger om sine rettigheter. Det er spesielt vanlig å misforstå hva prøvetid betyr juridisk sett.',
    subpoints: [
      { label: 'Myte: Manglende erfaring diskvalifiserer', text: 'Feil — mange SSR-bedrifter foretrekker holdninger fremfor erfaring og lærer opp selv.' },
      { label: 'Myte: Prøvetid = fri oppsigelse', text: 'Feil — arbeidsgiver MÅ gi saklig begrunnelse: tilpasning, dyktighet eller pålitelighet. Ikke bare "vi liker deg ikke".' },
      { label: 'Myte: Bytterett er en lovfestet rett', text: 'Nei, bytterett er en frivillig kundeservice, ikke en lovfestet plikt.' },
      { label: 'Myte: Arbeidsavtalen kan endres muntlig', text: 'Vesentlige endringer i arbeidsforholdet krever skriftlig enighet.' },
    ],
    practical: 'En nytilsatt selger blir sagt opp etter 2 måneder. Sjefen sier "vi er ikke fornøyde". Er dette nok begrunnelse?',
    exercises: [
      {
        id: 'R8-1',
        icon: '❌',
        title: 'Saklig oppsigelse i prøvetid',
        question: 'En leder sier "Jeg synes ikke du passer inn" som begrunnelse for oppsigelse i prøvetid. Er dette saklig nok etter arbeidsmiljøloven?',
        choices: [
          { id: 'a', label: 'Ja, i prøvetiden kan arbeidsgiver si opp uten begrunnelse', isCorrect: false, feedback: 'Feil! Selv i prøvetiden krever loven en saklig begrunnelse — enten tilpasning, dyktighet eller pålitelighet.' },
          { id: 'b', label: 'Nei, arbeidsgiver må begrunne med tilpasning, dyktighet eller pålitelighet — ikke bare "dårlig kjemi"', isCorrect: true, feedback: 'Riktig! Arbeidsmiljøloven krever konkret og saklig begrunnelse. "Passer ikke inn" er ikke tilstrekkelig uten å spesifisere hva som faktisk har vært utilstrekkelig.' },
          { id: 'c', label: 'Ja, men bare hvis bedriften har dokumentert det skriftlig', isCorrect: false, feedback: 'Dokumentasjon hjelper, men selve begrunnelsen ("passer ikke inn") er fortsatt ikke saklig nok alene.' },
        ],
        espenTip: 'Huskeregel: Prøvetid gir kortere oppsigelsestid, men IKKE rett til ubegrunnet oppsigelse.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Arbeidsmiljøloven',
    quote: '«Loven sier ikke hvem du skal ansette — men hvordan.»',
    content: 'Rekrutteringsprosessen er regulert av arbeidsmiljøloven og likestillingslovgivningen. Arbeidsgivere har plikt til å behandle alle søkere likt og ikke innhente ulovlig informasjon.',
    subpoints: [
      { label: 'AML kapittel 14 — Ansettelse', text: 'Krav til arbeidsavtale, informasjon til søkere, og plikt til likebehandling.' },
      { label: 'AML kapittel 15 — Oppsigelsesvern', text: 'Saklighetskravet, oppsigelsesfrister, og fortrinnsrett ved nedbemanning.' },
      { label: 'Diskrimineringsforbud', text: 'Likestillings- og diskrimineringsloven forbyr å spørre om graviditet, religion, seksuell orientering, etnisitet.' },
      { label: 'Ulovlig informasjonsinnhenting', text: 'Det er ulovlig å spørre om sykdomshistorikk og familieplanlegging i intervjuer.' },
    ],
    practical: 'En jobbsøker blir spurt: "Planlegger du å få barn de neste to årene?" Hva er problemet med dette spørsmålet?',
    exercises: [
      {
        id: 'R9-1',
        icon: '🔒',
        title: 'Ulovlige intervjuspørsmål',
        question: 'Hvilke av disse spørsmålene er ULOVLIG å stille i et jobbintervju?',
        choices: [
          { id: 'a', label: '"Kan du jobbe lørdager og søndager?"', isCorrect: false, feedback: 'Dette er et lovlig spørsmål — fleksibilitet er en reell jobbforutsetning i SSR.' },
          { id: 'b', label: '"Er du gravid eller planlegger du graviditet?"', isCorrect: true, feedback: 'Riktig! Det er forbudt å innhente opplysninger om graviditet, familieplanlegging eller fødselspermisjon under intervjuet etter likestillings- og diskrimineringsloven.' },
          { id: 'c', label: '"Har du erfaring med kassasystem?"', isCorrect: false, feedback: 'Faglig erfaring er høyst relevant å spørre om.' },
        ],
        espenTip: 'Forbudte spørsmål gjelder: graviditet, religion, etnisitet, seksuell orientering, politisk syn.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Rekruttering som strategisk investering',
    quote: '«Den beste tid å plante et tre var for 20 år siden. Den nest beste er nå.»',
    content: 'Rekruttering er ikke bare administrasjon — det er en av de viktigste investeringene en bedrift gjør. Riktig person i riktig stilling gir bedre service, lavere sykefravær og et sterkere omdømme.',
    subpoints: [
      { label: 'Rekrutteringshjulet er syklisk', text: 'Jobbanalyse → Utlysning → Siling → Intervju → Referanse → Tilbud → Onboarding.' },
      { label: 'SSR vektlegger holdninger', text: 'Pålitelighet, serviceinnstilling og fleksibilitet veier tungt.' },
      { label: 'Prøvetid er ikke fri oppsigelse', text: 'Saklig grunn: tilpasning, dyktighet, pålitelighet.' },
      { label: 'Lovkrav', text: 'AML kap. 14 og 15, diskrimineringsforbud.' },
    ],
    practical: 'Lag en komplett rekrutteringsplan for en ny servitørstilling. Inkluder alle faser, og beskriv hva du ser etter i hvert trinn.',
    exercises: [
      {
        id: 'R10-1',
        icon: '✅',
        title: 'Helhetsforståelse',
        question: 'Hva er den mest kritiske fasen i rekrutteringshjulet, og hvorfor?',
        choices: [
          { id: 'a', label: 'Publiseringen av stillingsannonsen — for å tiltrekke flest mulig søkere', isCorrect: false, feedback: 'Antall søkere er ikke målet — riktig kandidat er målet. En dårlig jobbanalyse gir mange irrelevante søkere.' },
          { id: 'b', label: 'Jobbanalysen — fordi den definerer hva du leter etter og er grunnlaget for alle andre faser', isCorrect: true, feedback: 'Riktig! En grundig jobbanalyse er fundamentet. Uten den vet du ikke hvem du søker, hva du spør om i intervjuet, eller hva du vurderer i prøvetiden.' },
          { id: 'c', label: 'Onboardingen — for å sikre at personen trives og blir', isCorrect: false, feedback: 'Onboarding er viktig, men begynner etter ansettelsen. Jobbanalysen er kritisk fordi den styrer hele prosessen fra dag 1.' },
        ],
        espenTip: 'Alt starter med jobbanalysen — den er hjulets nav som de andre ekene spinner rundt.',
      },
      {
        id: 'R10-2',
        icon: '📊',
        title: 'Oppsummeringsquiz',
        question: 'En bedrift ansetter en ny ansatt med 6 måneders prøvetid. Etter 4 måneder slutter den ansatte alltid 15 minutter for sent. Hva kan arbeidsgiver gjøre?',
        choices: [
          { id: 'a', label: 'Ingenting — det er ikke nok til oppsigelse', isCorrect: false, feedback: 'Gjentatt manglende punktlighet kan kvalifisere som manglende pålitelighet — noe AML nevner som saklig grunn i prøvetid.' },
          { id: 'b', label: 'Gi skriftlig advarsel og dokumentere forholdet, og eventuelt si opp under henvisning til pålitelighet', isCorrect: true, feedback: 'Riktig prosedyre! Dokumenter advarslene. Vedvarende punktlighetsproblemer kan gi saklig grunn til oppsigelse i prøvetid under "pålitelighet".' },
          { id: 'c', label: 'Vente til prøvetiden utløper og si opp med én måneds varsel', isCorrect: false, feedback: 'Bedriften kan handle i prøvetiden. Å vente til den utløper gir faktisk kortere varsel-tid, ikke lenger.' },
        ],
        espenTip: 'DOKUMENTASJON er nøkkelord. Advarsel må gis skriftlig for at den kan brukes som grunnlag for oppsigelse.',
      },
    ],
  },
]

export default function RekrutteringsprosesserModule() {
  return (
    <DrawerModule
      moduleCode="OK-VG2-3"
      moduleTitle="Rekrutteringsprosesser"
      moduleIcon="👥"
      storageKey="learning-vg2-rekrutteringsprosesser"
      completeRoute="/learning/vg2/okonomi/rekrutteringsprosesser/complete"
      phases={phases}
      intro="Fra jobbanalyse til onboarding — forstå hele rekrutteringshjulet og hva arbeidsgivere i SSR faktisk ser etter."
      vissteduAt="Studier viser at en feilansettelse koster bedriften mellom 6 og 12 måneders lønn inkludert opplæringskostnader og produktivitetstap."
      espenSier="I servicebransjen er holdning viktigere enn CV. Møt presis, smile naturlig og vis at du genuint ønsker å hjelpe — det er bedre enn alle sertifikater i verden."
      presentationLink={{ route: '/learning/presentations/rekrutteringsprosesser', description: 'Rekrutteringsprosesser — en visuell presentasjon' }}
    />
  )
}
