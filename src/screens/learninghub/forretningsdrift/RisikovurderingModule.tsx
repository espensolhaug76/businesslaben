import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '⚠️',
    title: 'Hva er risikovurdering?',
    quote: 'Den som ikke planlegger for det uventede, planlegger for å bli overrasket.',
    content:
      'En risikovurdering er en systematisk gjennomgang av hva som kan gå galt i en bedrift, og hvilke konsekvenser dette kan få. Arbeidsmiljøloven § 3-1 pålegger alle norske arbeidsgivere å kartlegge risikoer på arbeidsplassen. Risikovurdering er ikke bare for store bedrifter — en liten kiosk på en turistdestinasjon har risikoer knyttet til tyveri, ulykker, brann og sykdom blant ansatte. En god risikovurdering følger fire steg: (1) Identifiser farekilder, (2) Vurder hvem som kan bli skadet og hvordan, (3) Estimer sannsynlighet og alvorlighet, (4) Sett inn tiltak og dokumenter. Risikovurderingen skal oppdateres regelmessig og alltid ved endringer i driften.',
    subpoints: [
      { label: 'FAREKILDE', text: 'Noe som kan forårsake skade — f.eks. glatt gulv, farlige kjemikalier, tunge løft eller psykososialt press.' },
      { label: 'RISIKOVURDERING', text: 'Kombinasjonen av sannsynligheten for at noe skjer og konsekvensen hvis det skjer. Høy sannsynlighet + alvorlig konsekvens = høy risiko.' },
      { label: 'LOVKRAV', text: 'Arbeidsmiljøloven § 3-1 krever at alle arbeidsgivere gjennomfører risikovurdering og iverksetter nødvendige tiltak.' },
    ],
    practical:
      'Velg en arbeidsoppgave du kjenner (f.eks. servering i en restaurant). List tre potensielle farer ved oppgaven og vurder om de har høy eller lav risiko.',
    exercises: [
      {
        id: 'rv-1-1',
        question: 'Hva er hensikten med en risikovurdering på arbeidsplassen?',
        choices: [
          { id: 'a', text: 'Å finne ut hvem som har skylden når noe går galt' },
          { id: 'b', text: 'Å systematisk identifisere farer og sette inn tiltak for å forebygge skader' },
          { id: 'c', text: 'Å dokumentere alle ulykker som har skjedd tidligere' },
          { id: 'd', text: 'Å forsikre bedriften mot fremtidige krav' },
        ],
        correctId: 'b',
        explanation: 'Risikovurdering handler om å forutse og forebygge — ikke å fordele skyld etter at noe har gått galt. Målet er trygge arbeidsforhold for alle ansatte.',
      },
      {
        id: 'rv-1-2',
        question: 'Hvilken norsk lov pålegger arbeidsgivere å gjennomføre risikovurdering?',
        choices: [
          { id: 'a', text: 'Ferieloven' },
          { id: 'b', text: 'Markedsføringsloven' },
          { id: 'c', text: 'Arbeidsmiljøloven § 3-1' },
          { id: 'd', text: 'Regnskapsloven' },
        ],
        correctId: 'c',
        explanation: 'Arbeidsmiljøloven § 3-1 er klar: alle arbeidsgivere plikter å kartlegge risikoer, vurdere dem og sette inn tiltak. Dette gjelder bedrifter av alle størrelser.',
      },
      {
        id: 'rv-1-3',
        question: 'Når skal en risikovurdering oppdateres?',
        choices: [
          { id: 'a', text: 'Aldri — én gang er nok' },
          { id: 'b', text: 'Hvert tiende år' },
          { id: 'c', text: 'Bare etter at en ulykke har skjedd' },
          { id: 'd', text: 'Regelmessig og alltid ved endringer i driften, utstyr eller arbeidsforhold' },
        ],
        correctId: 'd',
        explanation: 'Risikovurderingen er et levende dokument — den må oppdateres ved endringer som nytt utstyr, nye ansatte, nye arbeidsoppgaver eller etter hendelser.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📊',
    title: 'Sannsynlighet og konsekvens',
    quote: 'Ikke all risiko er lik — lær å skille mellom det som er sannsynlig og det som er alvorlig.',
    content:
      'For å prioritere tiltak bruker vi en risikomatrise der vi vurderer to dimensjoner: sannsynlighet (hvor trolig er det at dette skjer?) og konsekvens (hvor alvorlig er det hvis det skjer?). Begge vurderes gjerne på en skala fra 1 til 5. Risikoen beregnes som: Risiko = Sannsynlighet × Konsekvens. En hendelse med lav sannsynlighet (1) men katastrofal konsekvens (5) gir risikoverdi 5 — mens en hendelse med middels sannsynlighet (3) og middels konsekvens (3) gir risikoverdi 9. Den sistnevnte bør faktisk prioriteres høyere! Risikomatrisen hjelper ledelsen å fokusere ressursene på de farene som faktisk utgjør størst trussel mot ansatte og drift.',
    subpoints: [
      { label: 'SANNSYNLIGHET', text: 'Hvor ofte kan vi forvente at hendelsen skjer? Skala 1–5: 1 = svært sjelden, 5 = forventes å skje ofte.' },
      { label: 'KONSEKVENS', text: 'Hvor alvorlig er skaden hvis hendelsen inntreffer? Skala 1–5: 1 = ubetydelig, 5 = katastrofal (dødsfall, alvorlig miljøskade).' },
      { label: 'RISIKOMATRISE', text: 'Et visuelt verktøy som krysser sannsynlighet og konsekvens for å vise risikonivå — grønn (lav), gul (middels), rød (høy).' },
    ],
    practical:
      'Lag en enkel risikomatrise (3×3) og plasser disse hendelsene: (A) Ansatt snubler i ledning, (B) Datainnbrudd, (C) Sykefravær i ferien. Diskuter prioriteringsrekkefølge.',
    exercises: [
      {
        id: 'rv-2-1',
        question: 'En butikk vurderer to risikoer: (A) Glatt gulv ved inngangen — sannsynlighet 4, konsekvens 3. (B) Strømbrudd — sannsynlighet 1, konsekvens 4. Hvilken risiko bør prioriteres?',
        choices: [
          { id: 'a', text: 'Strømbruddet (B) fordi konsekvensen er høyere' },
          { id: 'b', text: 'Glatt gulv (A) fordi risikoverdien er 12 mot strømbruddet som er 4' },
          { id: 'c', text: 'Begge er like viktige — de skal prioriteres likt' },
          { id: 'd', text: 'Ingen av dem krever tiltak' },
        ],
        correctId: 'b',
        explanation: 'Risiko = Sannsynlighet × Konsekvens. Glatt gulv: 4×3=12. Strømbrudd: 1×4=4. Glatt gulv utgjør altså tre ganger så stor risiko og bør prioriteres.',
      },
      {
        id: 'rv-2-2',
        question: 'Hva er formålet med en risikomatrise?',
        choices: [
          { id: 'a', text: 'Å beregne forsikringspremien for bedriften' },
          { id: 'b', text: 'Å visuelt prioritere risikoer etter sannsynlighet og konsekvens slik at tiltak kan settes inn riktig' },
          { id: 'c', text: 'Å dokumentere ulykker for Arbeidstilsynet' },
          { id: 'd', text: 'Å beregne bedriftens lønnsomhet' },
        ],
        correctId: 'b',
        explanation: 'Risikomatrisen er et prioriteringsverktøy — den gjør det mulig å se hvilke risikoer som er mest kritiske og bør håndteres først, slik at ressursene brukes effektivt.',
      },
      {
        id: 'rv-2-3',
        question: 'En hendelse har svært lav sannsynlighet, men kan føre til tap av menneskeliv. Hva bør bedriften gjøre?',
        choices: [
          { id: 'a', text: 'Ignorere den — lav sannsynlighet betyr liten risiko' },
          { id: 'b', text: 'Bare forsikre seg mot den' },
          { id: 'c', text: 'Innføre forebyggende tiltak og beredskapsplan, selv om sannsynligheten er lav — fordi konsekvensen er katastrofal' },
          { id: 'd', text: 'Vente til den faktisk skjer før man handler' },
        ],
        correctId: 'c',
        explanation: 'Risiko med katastrofal konsekvens (som tap av liv) skal alltid ha forebyggende tiltak og beredskapsplan, uavhengig av sannsynligheten. Potensielt tap av liv er aldri akseptabel restrisiko.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🛡️',
    title: 'Forebyggende tiltak',
    quote: 'Det beste tiltaket er det som fjerner faren helt — alt annet er nestnest best.',
    content:
      'Forebyggende tiltak følger et hierarki der de mest effektive tiltakene eliminerer faren, mens de minst effektive bare reduserer skadeomfanget. Hierarkiet ser slik ut: (1) Eliminer faren (fjern farekliden helt), (2) Substituer (erstatt med noe mindre farlig), (3) Ingeniørtiltak (bygg inn sikring i utstyr), (4) Administrative tiltak (rutiner, opplæring, skilting), (5) Verneutstyr (siste utvei). For en servicebedrift kan dette se slik ut: Glatt gulv → Sett inn sklisikkert belegg (ingeniørtiltak) → Advarselsskilt (administrativt). Opplæring er alltid viktig, men kan aldri erstatte fysiske sikringstiltak alene. Alle tiltak skal dokumenteres i bedriftens HMS-system.',
    subpoints: [
      { label: 'TILTAKSHIERARKIET', text: 'Eliminer → Substituer → Ingeniørtiltak → Administrative tiltak → Verneutstyr. Prioriter alltid det øverste nivået som er gjennomførbart.' },
      { label: 'DOKUMENTASJON', text: 'Alle risikovurderinger og tiltak skal dokumenteres skriftlig. Dette er lovpålagt og beskytter både ansatte og arbeidsgiver.' },
      { label: 'RESTRISIKO', text: 'Risikoen som gjenstår etter at tiltak er innført. Nullrisiko finnes ikke — målet er akseptabel restrisiko.' },
    ],
    practical:
      'For en av farene du identifiserte i fase 1: beskriv ett tiltak fra hvert nivå i hierarkiet (eliminering, substitusjon, ingeniørtiltak, administrativt tiltak og verneutstyr).',
    exercises: [
      {
        id: 'rv-3-1',
        question: 'En restaurant bruker et meget skarpt maskinkniv som har forårsaket tre kutt på to måneder. Hva er det BESTE forebyggende tiltaket?',
        choices: [
          { id: 'a', text: 'Gi de ansatte skjærehansker (verneutstyr)' },
          { id: 'b', text: 'Sette opp et advarselsskilt ved maskinen (administrativt tiltak)' },
          { id: 'c', text: 'Bytte ut maskinen med en modell med automatisk kuttsikring (ingeniørtiltak) eller vurdere om maskinen er nødvendig (eliminering)' },
          { id: 'd', text: 'Holde et møte om sikkerhet (administrativt tiltak)' },
        ],
        correctId: 'c',
        explanation: 'I tiltakshierarkiet er ingeniørtiltak (sikring i utstyr) og eliminering langt mer effektivt enn verneutstyr eller administrative tiltak. Hansker og skilt kan fjernes eller glemmes — en maskin med innebygd sikring ikke.',
      },
      {
        id: 'rv-3-2',
        question: 'Hva betyr "restrisiko"?',
        choices: [
          { id: 'a', text: 'Risikoen som er lovet bort til et forsikringsselskap' },
          { id: 'b', text: 'Risikoen som gjenstår etter at alle tiltak er innført — nullrisiko finnes ikke' },
          { id: 'c', text: 'Risiko som kun gjelder for lagerarbeider' },
          { id: 'd', text: 'Risiko som er for liten til å bekymre seg over' },
        ],
        correctId: 'b',
        explanation: 'Etter at alle rimelige tiltak er innført, vil det alltid gjenstå en restrisiko. Målet med risikovurdering er ikke nullrisiko, men å redusere risikoen til et akseptabelt nivå.',
      },
      {
        id: 'rv-3-3',
        question: 'Hvorfor er verneutstyr (f.eks. hjelm eller hansker) det LAVESTE nivået i tiltakshierarkiet?',
        choices: [
          { id: 'a', text: 'Fordi verneutstyr er dyrt' },
          { id: 'b', text: 'Fordi det ikke finnes verneutstyr som passer i servicenæringen' },
          { id: 'c', text: 'Fordi verneutstyr ikke fjerner faren — det reduserer bare skaden dersom en ulykke skjer, og det kan fjernes eller brukes feil' },
          { id: 'd', text: 'Fordi Arbeidstilsynet ikke godkjenner verneutstyr' },
        ],
        correctId: 'c',
        explanation: 'Verneutstyr er det siste forsvaret — det beskytter ikke hvis det glemmes, brukes feil eller tas av. Tiltak som eliminerer eller bygger inn sikkerheten i selve systemet er alltid å foretrekke.',
      },
    ],
  },
]

export default function RisikovurderingModule() {
  return (
    <DrawerModule
      moduleCode="FD7"
      moduleTitle="Risikovurdering og forebyggende tiltak"
      moduleIcon="⚠️"
      storageKey="learning-risikovurdering"
      completeRoute="/learning/forretningsdrift/risikovurdering/complete"
      phases={phases}
      intro="Alle arbeidsplasser har risikoer — de kloke bedriftene finner dem FØR ulykken skjer. Risikovurdering er lovpålagt og livsviktig."
      vissteduAt="Over 25 000 arbeidsulykker meldes til Arbeidstilsynet hvert år i Norge. Systematisk risikovurdering kan forebygge de fleste av dem."
      espenSier="Risikovurdering er ikke papirarbeid for å gjøre Arbeidstilsynet fornøyd. Det er verktøyet du bruker for å sørge for at kollegene dine kommer hjem i stykker."
      presentationLink={{ route: '/learning/presentations/risikovurdering', description: 'Risikovurdering — en visuell gjennomgang av ROS-analyse og forebyggende tiltak' }}
    />
  )
}
