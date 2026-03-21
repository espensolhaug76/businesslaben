import DrawerModule, { type DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📋',
    title: 'Beredskapsplan',
    quote: 'En plan skrevet i fred redder liv og bedrift i krise',
    content: 'En beredskapsplan er en forhåndslaget plan for hva som skal gjøres i ulike krisesituasjoner. Den svarer på: Hvem gjør hva? Hvem varsles? Hva er prioritet 1, 2, 3? God beredskapsplanlegging reduserer skaden betraktelig når krisen inntreffer.',
    subpoints: [
      'Beredskapsplanen skal være lett tilgjengelig for alle ansatte',
      'Eksempel: ved brann: evakuering (1) → varsle brannvesen (1) → informere eier (2)',
      'Planen skal dekke de mest sannsynlige scenariene',
      'Planen skal oppdateres jevnlig',
    ],
    practical: 'Lag en enkel beredskapsplan for tre scenarioer: brann, innbrudd og nøkkelansatt som plutselig blir sykemeldt. Hvem gjør hva?',
    exercises: [
      {
        id: 'co-1-1',
        question: 'Hva er formålet med en beredskapsplan?',
        choices: [
          { id: 'a', text: 'Å tilfredsstille forsikringsselskapet' },
          { id: 'b', text: 'Å ha en klar handlingsplan klar slik at kriser håndteres effektivt' },
          { id: 'c', text: 'Å dokumentere historiske hendelser' },
          { id: 'd', text: 'Å gi ansatte mer å gjøre' },
        ],
        correctId: 'b',
        explanation: 'Beredskapsplanen sikrer at alle vet hva de skal gjøre i en krise — noe som reduserer panikk og skader.',
      },
      {
        id: 'co-1-2',
        question: 'Hva bør en god beredskapsplan inneholde?',
        choices: [
          { id: 'a', text: 'Kun kontaktlisten til ledelsen' },
          { id: 'b', text: 'Hvem gjør hva, hvem varsles, og hva er prioriteringene' },
          { id: 'c', text: 'En liste over alle ansatte' },
          { id: 'd', text: 'Bedriftens budsjetttall' },
        ],
        correctId: 'b',
        explanation: 'En god beredskapsplan svarer på hvem som gjør hva, hvem som varsles, og hvilke tiltak som prioriteres i ulike krisescenarioer.',
      },
      {
        id: 'co-1-3',
        question: 'Hvor bør beredskapsplanen oppbevares?',
        choices: [
          { id: 'a', text: 'Kun i daglig leders skuff' },
          { id: 'b', text: 'Lett tilgjengelig for alle ansatte — både digitalt og på trykk' },
          { id: 'c', text: 'Kun hos forsikringsselskapet' },
          { id: 'd', text: 'I et låst skap bare ledere har nøkkel til' },
        ],
        correctId: 'b',
        explanation: 'Beredskapsplanen er ubrukelig hvis ingen vet hvor den er. Den skal være lett tilgjengelig for alle ansatte.',
      },
      {
        id: 'co-1-4',
        question: 'Hvilke scenarioer bør en butikk prioritere i sin beredskapsplan?',
        choices: [
          { id: 'a', text: 'Kun ekstreme og usannsynlige katastrofer' },
          { id: 'b', text: 'De mest sannsynlige: brann, innbrudd, IT-svikt, nøkkelansatt syk' },
          { id: 'c', text: 'Kun scenarioer forsikringen dekker' },
          { id: 'd', text: 'Alt mulig — jo mer detaljert jo bedre' },
        ],
        correctId: 'b',
        explanation: 'Start med de mest sannsynlige og mest skadelige scenariene. En for detaljert plan brukes aldri — hold den enkel og praktisk.',
      },
      {
        id: 'co-1-5',
        question: 'Hvor ofte bør beredskapsplanen oppdateres?',
        choices: [
          { id: 'a', text: 'Aldri — den er laget en gang for alle' },
          { id: 'b', text: 'Regelmessig og ved endringer i bedriften' },
          { id: 'c', text: 'Kun etter at en krise har inntruffet' },
          { id: 'd', text: 'Hvert tiende år' },
        ],
        correctId: 'b',
        explanation: 'Beredskapsplanen skal oppdateres jevnlig og alltid ved endringer: nye ansatte, ny lokasjon, nye risikofaktorer.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📢',
    title: 'Krisekommunikasjon',
    quote: 'Taushet i en krise blir tolket som skyld',
    content: 'Når en krise inntreffer, er kommunikasjonen avgjørende. Dårlig kommunikasjon kan forsterke krisen og ødelegge omdømmet. God krisekommunikasjon er rask, ærlig og empatisk.',
    subpoints: [
      'Gullstandard: kommunikér innen 1 time fra krisen starter',
      'Krisens 3 C-er: Compassion (medfølelse), Competence (kompetanse), Command (kontroll)',
      'Kommunikér til alle berørte: ansatte, kunder, media, myndigheter',
      'Vær ærlig — løgn eller tildekking forverrer alltid',
    ],
    practical: 'Skriv en tenkt krisemelding for en scenario: butikken har fått inn varer med feil og kunder kan ha kjøpt dem. Hva kommuniserer du og til hvem?',
    exercises: [
      {
        id: 'co-2-1',
        question: 'Hva er "gullstandarden" for responstid i krisekommunikasjon?',
        choices: [
          { id: 'a', text: 'Innen 24 timer' },
          { id: 'b', text: 'Innen 1 time' },
          { id: 'c', text: 'Innen en uke' },
          { id: 'd', text: 'Det er ingen standard' },
        ],
        correctId: 'b',
        explanation: 'Krisekommunikasjonseksperter anbefaler å kommunisere innen 1 time. Rask respons viser at bedriften tar situasjonen på alvor.',
      },
      {
        id: 'co-2-2',
        question: 'En butikk har solgt et farlig produkt. Hva er feil tilnærming til krisekommunikasjon?',
        choices: [
          { id: 'a', text: 'Informere kundene umiddelbart om faren' },
          { id: 'b', text: 'Vente og håpe ingen legger merke til det' },
          { id: 'c', text: 'Tilby refusjon til berørte kunder' },
          { id: 'd', text: 'Kontakte mediene proaktivt' },
        ],
        correctId: 'b',
        explanation: 'Taushet tolkes som skyld og gjør situasjonen verre. Proaktiv, ærlig kommunikasjon begrenser skaden.',
      },
      {
        id: 'co-2-3',
        question: 'Hva menes med "Compassion" i krisens 3 C-er?',
        choices: [
          { id: 'a', text: 'Å vise kompetanse og handlekraft' },
          { id: 'b', text: 'Å vise medfølelse og empati for de som er rammet' },
          { id: 'c', text: 'Å ta kontroll over situasjonen' },
          { id: 'd', text: 'Å kommunisere til media' },
        ],
        correctId: 'b',
        explanation: 'Compassion = medfølelse. Å anerkjenne at folk er rammet og vise empati er det første og viktigste i krisekommunikasjon.',
      },
      {
        id: 'co-2-4',
        question: 'Hvem skal informeres ved en krise i en butikk?',
        choices: [
          { id: 'a', text: 'Kun ledelsen' },
          { id: 'b', text: 'Alle berørte: ansatte, kunder, leverandører og eventuelle myndigheter' },
          { id: 'c', text: 'Kun kundene som direkte er rammet' },
          { id: 'd', text: 'Kun mediene for å kontrollere historien' },
        ],
        correctId: 'b',
        explanation: 'God krisekommunikasjon når alle berørte parter. Å utelate noen kan føre til mistillit og rykter.',
      },
      {
        id: 'co-2-5',
        question: 'En bedrift løy om omfanget av en krise og det ble avslørt. Hva er den typiske konsekvensen?',
        choices: [
          { id: 'a', text: 'Ingen — folk glemmer det raskt' },
          { id: 'b', text: 'Alvorlig og langvarig omdømmeskade — verre enn selve krisen' },
          { id: 'c', text: 'Bedriften unngår bøter' },
          { id: 'd', text: 'Kundene forstår at det var nødvendig' },
        ],
        correctId: 'b',
        explanation: 'Løgn og tildekking som avsløres fører til alvorlig omdømmeskade — som gjerne er verre og mer langvarig enn selve krisen.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🎯',
    title: 'Øvelse og testing',
    quote: 'En beredskapsplan du aldri har øvd på, er bare papir',
    content: 'En beredskapsplan er bare effektiv hvis de ansatte faktisk kan bruke den. Regelmessige øvelser sikrer at alle vet hva de skal gjøre, avdekker svakheter i planen, og bygger trygghet og rutiner.',
    subpoints: [
      'Brannøvelse: gjennomfør minst én gang per år',
      'Tabletop-øvelse: gjennomgå hypotetisk scenario rundt et bord',
      'Test backup-systemer månedlig',
      'Dokumentér og evaluer etter hver øvelse',
    ],
    practical: 'Planlegg en tabletop-øvelse for teamet: velg et scenario (eks. strømbrudd i 24 timer), gå gjennom hva som skjer steg for steg.',
    exercises: [
      {
        id: 'co-3-1',
        question: 'Hva er en "tabletop-øvelse"?',
        choices: [
          { id: 'a', text: 'En øvelse der man rydder kontorene' },
          { id: 'b', text: 'En simulert gjennomgang av et krisescenario rundt et bord' },
          { id: 'c', text: 'En fysisk evakueringsøvelse' },
          { id: 'd', text: 'En test av IT-systemer' },
        ],
        correctId: 'b',
        explanation: 'Tabletop-øvelse er en simulert gjennomgang der teamet går gjennom hva som skjer i et hypotetisk scenario, uten faktisk å handle som i en ekte krise.',
      },
      {
        id: 'co-3-2',
        question: 'Hvorfor er det viktig å øve på beredskapsplanen?',
        choices: [
          { id: 'a', text: 'For å oppdatere planen hvert år' },
          { id: 'b', text: 'For at ansatte skal kjenne planen og avdekke svakheter' },
          { id: 'c', text: 'Fordi loven krever det i alle bedrifter' },
          { id: 'd', text: 'For å imponere forsikringsselskapet' },
        ],
        correctId: 'b',
        explanation: 'Øvelser sikrer at ansatte faktisk vet hva de skal gjøre, og avdekker svakheter i planen mens det fortsatt er fredstid.',
      },
      {
        id: 'co-3-3',
        question: 'Hva bør man gjøre etter en øvelse?',
        choices: [
          { id: 'a', text: 'Arkivere øvelsesrapporten og vente til neste år' },
          { id: 'b', text: 'Evaluere hva som gikk bra/dårlig og oppdatere planen' },
          { id: 'c', text: 'Gi en klapp på skulderen til alle som deltok' },
          { id: 'd', text: 'Melde til Arbeidstilsynet' },
        ],
        correctId: 'b',
        explanation: 'Evaluering etter øvelsen er kritisk for læring. Oppdater planen basert på funn fra øvelsen.',
      },
      {
        id: 'co-3-4',
        question: 'Hvor ofte anbefales brannøvelse for de fleste bedrifter?',
        choices: [
          { id: 'a', text: 'Hvert tiende år' },
          { id: 'b', text: 'Minst én gang per år' },
          { id: 'c', text: 'Kun ved innflytting' },
          { id: 'd', text: 'Månedlig' },
        ],
        correctId: 'b',
        explanation: 'Brannøvelse bør gjennomføres minst én gang per år for å sikre at alle ansatte kjenner evakueringsrutinene.',
      },
      {
        id: 'co-3-5',
        question: 'En bedrift oppdager under en tabletop-øvelse at ingen vet hvem som har ansvaret ved strømbrudd. Hva bør de gjøre?',
        choices: [
          { id: 'a', text: 'Ignorere det — strømbrudd er sjeldent' },
          { id: 'b', text: 'Oppdatere beredskapsplanen med klare ansvarsroller for strømbruddsscenario' },
          { id: 'c', text: 'Ansette en strømberedskapsekspert' },
          { id: 'd', text: 'Kjøpe en generator og glemme det' },
        ],
        correctId: 'b',
        explanation: 'Å avdekke uklare ansvarsroller er nettopp formålet med øvelsen. Oppdater planen umiddelbart med tydelige roller.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🛡️',
    title: 'Forsikring',
    quote: 'Forsikring er ikke en kostnad — det er det du betaler for å overleve en katastrofe',
    content: 'Riktig forsikring er en kritisk del av beredskapen. For en bedrift finnes det mange typer forsikringer. De viktigste for butikker og handelsvirksomhet er ansvarsforsikring, driftsavbruddsforsikring og innbo- og løsøreforsikring.',
    subpoints: [
      'Ansvarsforsikring: dekker skader bedriften påfører kunder/tredjepart',
      'Driftsavbruddsforsikring: betaler løpende kostnader ved tvungen stengning',
      'Innbo/løsøre: dekker tap av varelager ved brann, innbrudd',
      'Gjennomgå forsikringen jevnlig — verdiene endrer seg',
    ],
    practical: 'Sjekk bedriftens forsikringspolise: er alle relevante scenarioer dekket? Er verdiene oppdaterte?',
    exercises: [
      {
        id: 'co-4-1',
        question: 'Hva dekker driftsavbruddsforsikring?',
        choices: [
          { id: 'a', text: 'Skader på varelageret' },
          { id: 'b', text: 'Løpende kostnader som lønn og leie når bedriften er tvunget til å stenge' },
          { id: 'c', text: 'Kundeskader i butikken' },
          { id: 'd', text: 'Nettangrep og IT-svikt' },
        ],
        correctId: 'b',
        explanation: 'Driftsavbruddsforsikring dekker løpende kostnader (lønn, leie) i perioden bedriften er tvunget til å holde stengt pga. skade.',
      },
      {
        id: 'co-4-2',
        question: 'En kunde glir på et glatt gulv i butikken og bryter armen. Hvilken forsikring er viktigst her?',
        choices: [
          { id: 'a', text: 'Innboforsikring' },
          { id: 'b', text: 'Ansvarsforsikring' },
          { id: 'c', text: 'Reiseforsikring' },
          { id: 'd', text: 'Livsforsikring' },
        ],
        correctId: 'b',
        explanation: 'Ansvarsforsikring dekker skader bedriften påfører tredjepart (kunder, leverandører). Dette er en av de viktigste forsikringene for butikker.',
      },
      {
        id: 'co-4-3',
        question: 'Hvorfor bør bedriften jevnlig gjennomgå forsikringsavtalen?',
        choices: [
          { id: 'a', text: 'For å finne billigere alternativer' },
          { id: 'b', text: 'Fordi verdiene endrer seg — ny utstyr, økt varelager, nye risikoer' },
          { id: 'c', text: 'Forsikringsselskapet krever det' },
          { id: 'd', text: 'Det er ikke nødvendig — forsikringen er alltid dekkende' },
        ],
        correctId: 'b',
        explanation: 'Bedriftens verdier og risikobilde endrer seg over tid. Uten jevnlig gjennomgang kan du være underforsikret uten å vite det.',
      },
      {
        id: 'co-4-4',
        question: 'En butikk brenner ned og er stengt i 3 måneder. Hvilken forsikring er viktigst for å overleve perioden?',
        choices: [
          { id: 'a', text: 'Ansvarsforsikring' },
          { id: 'b', text: 'Driftsavbruddsforsikring' },
          { id: 'c', text: 'Reiseforsikring' },
          { id: 'd', text: 'Helseforsikring for ansatte' },
        ],
        correctId: 'b',
        explanation: 'Driftsavbruddsforsikring dekker løpende kostnader mens butikken er stengt — uten den kan butikken gå konkurs selv om bygningen gjenoppbygges.',
      },
      {
        id: 'co-4-5',
        question: 'Hva betyr det å være "underforsikret"?',
        choices: [
          { id: 'a', text: 'At du betaler for mye i premie' },
          { id: 'b', text: 'At forsikringen ikke dekker de faktiske verdiene eller skadene fullt ut' },
          { id: 'c', text: 'At du har for mange forsikringer' },
          { id: 'd', text: 'At forsikringen er utdatert' },
        ],
        correctId: 'b',
        explanation: 'Underforsikring betyr at forsikringssummen er lavere enn de faktiske verdiene. Ved skade får du ikke dekket det fulle tapet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🔄',
    title: 'Erfaringslæring etter krise',
    quote: 'Den eneste gode krisen er en du lærer noe av',
    content: 'En krise er en mulighet til å lære og forbedre seg. Etter enhver hendelse — stor eller liten — bør bedriften gjennomføre en strukturert evaluering: hva gikk bra, hva gikk dårlig, og hva gjøres annerledes neste gang.',
    subpoints: [
      'Evaluer alltid etter hendelse: hva gikk bra og dårlig?',
      'Oppdater beredskapsplanen basert på erfaringen',
      'Informér og involver ansatte i evalueringen',
      'COVID-19 lærte bedrifter viktigheten av digital beredskap',
      'Dokumentér hendelsen for fremtidig læring',
    ],
    practical: 'Etter neste avvik eller hendelse: gjennomfør en 15-minutters evaluering med teamet. Still tre spørsmål: Hva skjedde? Hva lærte vi? Hva endrer vi?',
    exercises: [
      {
        id: 'co-5-1',
        question: 'Hva er formålet med en evaluering etter en krise?',
        choices: [
          { id: 'a', text: 'Å finne noen å skylde på' },
          { id: 'b', text: 'Å lære av erfaringen og forbedre beredskapen' },
          { id: 'c', text: 'Å dokumentere for forsikringsselskapet' },
          { id: 'd', text: 'Å vise Arbeidstilsynet at du har gjort jobben' },
        ],
        correctId: 'b',
        explanation: 'Formålet er læring og forbedring. En god evaluering gjør bedriften bedre rustet til å håndtere neste krise.',
      },
      {
        id: 'co-5-2',
        question: 'En butikk opplevde IT-svikt som stanset kortbetalingen i 4 timer. Hva bør de lære av dette?',
        choices: [
          { id: 'a', text: 'At IT alltid svikter og det er ingenting å gjøre' },
          { id: 'b', text: 'At de trenger en beredskapsrutine for kontantbetaling og raskere IT-support' },
          { id: 'c', text: 'At de bør si opp IT-leverandøren umiddelbart' },
          { id: 'd', text: 'Ingenting — IT-svikt er normalt' },
        ],
        correctId: 'b',
        explanation: 'IT-svikt er en vanlig krisetype. Læringen er å ha backup-rutiner (kontantbetaling) og raskere support-tilgang til neste gang.',
      },
      {
        id: 'co-5-3',
        question: 'Hvem bør involveres i evalueringen etter en krise?',
        choices: [
          { id: 'a', text: 'Kun ledelsen' },
          { id: 'b', text: 'De ansatte som var involvert i håndteringen' },
          { id: 'c', text: 'Kun verneombudet' },
          { id: 'd', text: 'En ekstern konsulent' },
        ],
        correctId: 'b',
        explanation: 'De ansatte som faktisk håndterte situasjonen har verdifull innsikt. Å involvere dem i evalueringen gir bedre læring og økt eierskap til forbedringene.',
      },
      {
        id: 'co-5-4',
        question: 'Hva var en viktig lærdom for mange bedrifter fra COVID-19-pandemien?',
        choices: [
          { id: 'a', text: 'At fysisk tilstedeværelse alltid er best' },
          { id: 'b', text: 'Viktigheten av digital beredskap og fleksible bemanningsplaner' },
          { id: 'c', text: 'At kriser alltid varer under 3 måneder' },
          { id: 'd', text: 'At forsikring dekker alle tap' },
        ],
        correctId: 'b',
        explanation: 'COVID-19 lærte bedrifter at digital beredskap (hjemmekontor, netthandel) og fleksibilitet i bemanning er kritisk i en langvarig krise.',
      },
      {
        id: 'co-5-5',
        question: 'Hva er neste steg etter at evalueringen er gjennomført?',
        choices: [
          { id: 'a', text: 'Arkivere rapporten og gå videre' },
          { id: 'b', text: 'Oppdatere beredskapsplanen og implementere forbedringene' },
          { id: 'c', text: 'Publisere evalueringen på bedriftens nettside' },
          { id: 'd', text: 'Vente til neste krise for å se om forbedringene virker' },
        ],
        correctId: 'b',
        explanation: 'En evaluering uten oppfølging er bortkastet. Oppdater beredskapsplanen og implementer konkrete forbedringer umiddelbart.',
      },
    ],
  },
]

export default function ContingencyModule() {
  return (
    <DrawerModule
      moduleCode="FD5"
      moduleTitle="Beredskap og risikostyring"
      moduleIcon="🚨"
      storageKey="learning-contingency"
      completeRoute="/learning/forretningsdrift/contingency/complete"
      phases={phases}
      intro="En krise er ikke om — men når. Bedrifter med en beredskapsplan overlever kriser langt bedre enn de uten."
      vissteduAt="60% av småbedrifter som rammes av en stor krise uten beredskapsplan, går konkurs innen 2 år."
      espenSier="Du trenger ikke planlegge for alt — men du trenger en plan for de mest sannsynlige scenariene. Start enkelt: brann, tyveri, nøkkelmedarbeider syk."
      presentationLink={{ route: '/learning/presentations/beredskapsplaner', description: 'Beredskapsplaner — en visuell gjennomgang av krisehåndtering og varsling' }}
    />
  )
}
