import DrawerModule from '../../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🎙️',
    title: 'Retorikkens tre appellformer — etos, patos, logos',
    quote: 'Folk kjøper ikke hva du gjør, de kjøper hvorfor du gjør det. — Simon Sinek',
    content: 'Aristoteles identifiserte for over 2 300 år siden at overbevisende kommunikasjon hviler på tre søyler: etos (troverdighet), patos (følelsesmessig appell) og logos (logisk argumentasjon). Steve Jobs mestret alle tre — han bygget etos gjennom årevis med innovasjon, skapte patos med fortellinger om å endre verden, og brukte logos med tekniske spesifikasjoner.',
    subpoints: [
      'ETOS: Troverdighet bygges over tid gjennom dokumentert kompetanse, konsistent atferd og åpenhet om egne begrensninger',
      'PATOS: Følelsesmessig appell betyr å koble budskapet til noe lytteren genuint bryr seg om',
      'LOGOS: Statistikk, konkrete eksempler og klare årsak-virkning-kjeder gir de rasjonelle begrunnelsene',
    ],
    practical: 'Neste gang du skal overbevise noen om noe, sjekk om du har alle tre: Hvorfor skal de stole på deg? Hva betyr dette for dem personlig? Hvilke bevis støtter argumentet ditt?',
    exercises: [
      {
        id: 'pk-1-1',
        question: 'Hva er etos i retorikk?',
        choices: [
          { id: 'a', text: 'Logisk argumentasjon med fakta og tall' },
          { id: 'b', text: 'Avsenderens troverdighet og karakter' },
          { id: 'c', text: 'Følelsesmessig appell til publikum' },
          { id: 'd', text: 'Bruken av metaforer i tale' },
        ],
        correctId: 'b',
        explanation: 'Etos handler om avsenderens troverdighet — hvem du er, hva du har oppnådd, og hvorfor publikum skal stole på deg.',
      },
      {
        id: 'pk-1-2',
        question: 'En selger viser statistikk og forskning for å overbevise en kunde. Hvilken appellform bruker selgeren?',
        choices: [
          { id: 'a', text: 'Etos' },
          { id: 'b', text: 'Patos' },
          { id: 'c', text: 'Logos' },
          { id: 'd', text: 'Kairos' },
        ],
        correctId: 'c',
        explanation: 'Logos er den logiske appellformen — å bruke fakta, data, statistikk og logisk argumentasjon for å overbevise.',
      },
      {
        id: 'pk-1-3',
        question: 'Hva er patos i kommunikasjon?',
        choices: [
          { id: 'a', text: 'Å vise sin faglige bakgrunn og erfaring' },
          { id: 'b', text: 'Å appellere til publikums følelser og verdier' },
          { id: 'c', text: 'Å presentere logiske bevis' },
          { id: 'd', text: 'Å snakke sakte og tydelig' },
        ],
        correctId: 'b',
        explanation: 'Patos handler om å skape en emosjonell forbindelse mellom budskapet og lytteren — å koble det til noe de genuint bryr seg om.',
      },
      {
        id: 'pk-1-4',
        question: 'En student pitcher en forretningsidé. Hvilken kombinasjon av appellformer er mest effektiv?',
        choices: [
          { id: 'a', text: 'Kun logos — investorer bryr seg bare om tall' },
          { id: 'b', text: 'Kun patos — følelser selger best' },
          { id: 'c', text: 'Alle tre: etos, patos og logos' },
          { id: 'd', text: 'Kun etos — troverdighet er alt' },
        ],
        correctId: 'c',
        explanation: 'De mest overbevisende talerne kombinerer alle tre appellformene — troverdighet (etos), følelsesmessig forbindelse (patos) og logiske bevis (logos).',
      },
      {
        id: 'pk-1-5',
        question: 'Hva brukte Aristoteles til å beskrive de tre søylene for overbevisende kommunikasjon?',
        choices: [
          { id: 'a', text: 'Ratio, emotio og credito' },
          { id: 'b', text: 'Etos, patos og logos' },
          { id: 'c', text: 'Ethos, pathos og kairos' },
          { id: 'd', text: 'Kommunikasjon, overtalelse og argumentasjon' },
        ],
        correctId: 'b',
        explanation: 'Aristoteles definerte etos (troverdighet), patos (følelsesmessig appell) og logos (logisk argumentasjon) som de tre grunnleggende appellformene i retorikk.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '✉️',
    title: 'Forretningsbrev og e-post — struktur og tone',
    quote: 'Klart språk er ikke bare høflig — det er respektfullt for leserens tid.',
    content: 'Et formelt forretningsbrev har fast struktur: avsenderinfo øverst, dato, mottakers navn og adresse, emnefelt som oppsummerer saken, brødtekst med kontekst og budskap, og høflig avslutning. Norsk forretningsspråk er direkte og likeverdig — vi sier «du» til direktøren. E-post er et juridisk dokument.',
    subpoints: [
      'STRUKTUR: Emnefelt, én idé per avsnitt, konkret avslutning med tydelig handlingsoppfordring',
      'TONE: Profesjonell betyr ikke stiv — bruk «du», skriv i aktiv form, unngå kansellispråk',
      'JURIDISK BEVISSTHET: E-post om avtalevilkår og leveransebetingelser kan utgjøre en bindende kontrakt',
    ],
    practical: 'Øv deg på å skrive e-poster under 100 ord som likevel inneholder alt mottakeren trenger. Korthet er en form for respekt.',
    exercises: [
      {
        id: 'pk-2-1',
        question: 'Hva er viktig å huske om e-post i forretningskommunikasjon?',
        choices: [
          { id: 'a', text: 'Det er uformelt og kan ikke brukes som bevis' },
          { id: 'b', text: 'Det er et juridisk dokument som kan legges frem i retten' },
          { id: 'c', text: 'Det er kun for intern kommunikasjon' },
          { id: 'd', text: 'Det trenger ikke emnefelt' },
        ],
        correctId: 'b',
        explanation: 'E-post mellom bedrifter om avtaler, priser og leveranser kan utgjøre en bindende kontrakt og brukes som bevis i juridiske tvister.',
      },
      {
        id: 'pk-2-2',
        question: 'Hva kjennetegner norsk forretningsspråk etter «du»-reformen?',
        choices: [
          { id: 'a', text: 'Stivt og formelt med titler som «Herr» og «Fru»' },
          { id: 'b', text: 'Direkte og likeverdig — vi sier «du» til alle' },
          { id: 'c', text: 'Engelsk er standard i alle offisielle brev' },
          { id: 'd', text: 'Bare sjefens navn brukes, aldri «du»' },
        ],
        correctId: 'b',
        explanation: 'Etter «du»-reformen på 1970-tallet er norsk forretningsspråk direkte og likeverdig — vi bruker «du» uavhengig av tittel eller hierarki.',
      },
      {
        id: 'pk-2-3',
        question: 'Hva er riktig norsk forretningsspråk for å be om noe?',
        choices: [
          { id: 'a', text: '«Vi tillater oss å anmode om tilbakemelding innen fredag»' },
          { id: 'b', text: '«Gi oss svar nå»' },
          { id: 'c', text: '«Vi ber om tilbakemelding innen fredag»' },
          { id: 'd', text: '«Kanskje det er mulig å se på om du kan svare»' },
        ],
        correctId: 'c',
        explanation: 'Kansellispråk som «vi tillater oss å anmode om» bør erstattes med enkelt og direkte språk som «vi ber om» — det er mer profesjonelt.',
      },
      {
        id: 'pk-2-4',
        question: 'Hva bør emnefeltet i en forretningsepost inneholde?',
        choices: [
          { id: 'a', text: 'Kun avsenders navn' },
          { id: 'b', text: 'En lang og detaljert beskrivelse av alt i e-posten' },
          { id: 'c', text: 'En kort, presis oppsummering av saken' },
          { id: 'd', text: 'Emnefeltet er ikke nødvendig i interne e-poster' },
        ],
        correctId: 'c',
        explanation: 'Emnefeltet bør gi mottakeren en klar forventning om innholdet — en kort og presis setning som oppsummerer saken.',
      },
      {
        id: 'pk-2-5',
        question: 'Hva er norsk norm for svartid på e-post i forretningslivet?',
        choices: [
          { id: 'a', text: 'Innen én time' },
          { id: 'b', text: 'Innen én arbeidsdag' },
          { id: 'c', text: 'Innen én uke' },
          { id: 'd', text: 'Svartid er ikke viktig i e-postkultur' },
        ],
        correctId: 'b',
        explanation: 'Norsk forretningskultur forventer svar på e-post innen én arbeidsdag. Å vente tre dager sender et signal om lav prioritering av mottakeren.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📊',
    title: 'Presentasjonsteknikk og nervøsitet',
    quote: 'Nervøsitet er ikke svakhet — det er kroppen din som gjør seg klar til å prestere.',
    content: 'Den klassiske presentasjonsstrukturen: fortell dem hva du skal fortelle dem (intro), fortell dem det (hoveddel), fortell dem hva du fortalte dem (oppsummering). STAR-metoden: Situasjon, Task, Action, Result. Slides med mye tekst konkurrerer med talerens stemme.',
    subpoints: [
      'FORBEREDELSE: De beste presentatørene øver høyt — stemmeleie, pauser og kroppsspråk kan bare trenes ved faktisk å stå og snakke',
      'SLIDES: Maks seks ord per slide, ett sentralt bilde eller diagram, stor font',
      'SPØRSMÅL: Det er lov å ikke vite alt — si «godt spørsmål, jeg vil finne ut og komme tilbake»',
    ],
    practical: 'Øv tre ganger høyt alene før en viktig presentasjon — første gang for struktur, andre for timing, tredje for å høre deg selv og justere tonen.',
    exercises: [
      {
        id: 'pk-3-1',
        question: 'Hva er den klassiske trestegs presentasjonsstrukturen?',
        choices: [
          { id: 'a', text: 'Intro, mening, konklusjon' },
          { id: 'b', text: 'Fortell dem hva du skal si, si det, fortell dem hva du sa' },
          { id: 'c', text: 'Problem, analyse, løsning' },
          { id: 'd', text: 'Åpning, midtdel, avslutning' },
        ],
        correctId: 'b',
        explanation: 'Den klassiske strukturen er: fortell dem hva du skal fortelle dem (introduksjon med agenda), fortell dem det (hoveddelen), fortell dem hva du fortalte dem (oppsummering).',
      },
      {
        id: 'pk-3-2',
        question: 'Hva betyr STAR-metoden i presentasjonsteknikk?',
        choices: [
          { id: 'a', text: 'Start, Tale, Avslutning, Respons' },
          { id: 'b', text: 'Situasjon, Task, Action, Result' },
          { id: 'c', text: 'Struktur, Tema, Argument, Referanse' },
          { id: 'd', text: 'Slide, Tekst, Animasjon, Resultat' },
        ],
        correctId: 'b',
        explanation: 'STAR-metoden: Situasjon (kontekst), Task (oppgaven), Action (hva som ble gjort), Result (hva som skjedde). Spesielt nyttig for case-baserte presentasjoner.',
      },
      {
        id: 'pk-3-3',
        question: 'Hva er anbefalt maksimalt antall ord per slide i en presentasjon?',
        choices: [
          { id: 'a', text: 'Seks ord' },
          { id: 'b', text: 'Tjue ord' },
          { id: 'c', text: 'Femti ord' },
          { id: 'd', text: 'Ingen begrensning — mer informasjon er bedre' },
        ],
        correctId: 'a',
        explanation: 'Maks seks ord per slide — alt annet tilhører et notatdokument. Slides med mye tekst konkurrerer med talerens stemme og tvinger publikum til å velge mellom å lese og å lytte.',
      },
      {
        id: 'pk-3-4',
        question: 'Hva bør du gjøre hvis du ikke kan svare på et spørsmål under en presentasjon?',
        choices: [
          { id: 'a', text: 'Finne på et svar for å ikke virke uvitende' },
          { id: 'b', text: 'Avbryte presentasjonen og avslutte' },
          { id: 'c', text: 'Si at spørsmålet er irrelevant' },
          { id: 'd', text: 'Erkjenne at du ikke vet, og love å finne ut og komme tilbake' },
        ],
        correctId: 'd',
        explanation: 'Det er lov å ikke vite alt. Si: «Det er et godt spørsmål — jeg har ikke svaret nå, men jeg vil finne ut og komme tilbake til deg innen i morgen.» Ærlighet bygger etos.',
      },
      {
        id: 'pk-3-5',
        question: 'Hva er nervøsitet forut for en presentasjon egentlig?',
        choices: [
          { id: 'a', text: 'Et tegn på at du ikke er forberedt nok' },
          { id: 'b', text: 'Adrenalin — energi kroppen produserer for å prestere' },
          { id: 'c', text: 'Et tegn på at du bør unngå presentasjoner' },
          { id: 'd', text: 'Et tegn på mangel på selvtillit som bør behandles' },
        ],
        correctId: 'b',
        explanation: 'Nervøsitet er adrenalin, og adrenalin er energi. Utfordringen er å kanalisere denne energien til engasjement fremfor å la den låse deg.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🤝',
    title: 'Forhandling — prinsipper og teknikker',
    quote: 'Den beste forhandleren er den som lar motparten gå hjem som vinner. — Roger Fisher',
    content: 'Prinsippbasert forhandling (Harvard-metoden) fokuserer på interesser fremfor posisjoner. BATNA — Best Alternative To Negotiated Agreement — er det viktigste begrepet: hva gjør du hvis forhandlingene bryter sammen? Jo sterkere BATNA, jo mer makt har du.',
    subpoints: [
      'BATNA: Finn din beste alternativ FØR forhandlingen starter — uten den vet du ikke når du bør gå fra bordet',
      'INTERESSER VS POSISJONER: Spør «hvorfor vil de det?» i stedet for å motsi «hva de vil»',
      'NORSK STIL: Norske forhandlere forventer fakta, direkthet og respekt — overdreven selvsalg oppfattes som useriøst',
    ],
    practical: 'Før en viktig forhandling: skriv ned din BATNA, motpartens sannsynlige BATNA, og de tre interessene du tror er viktigst for begge parter.',
    glossaryTerm: 'BATNA',
    exercises: [
      {
        id: 'pk-4-1',
        question: 'Hva betyr BATNA i forhandlingsteknikk?',
        choices: [
          { id: 'a', text: 'Best Approach To Negotiating Agreements' },
          { id: 'b', text: 'Basic Alternative To Negotiation Analysis' },
          { id: 'c', text: 'Best Alternative To Negotiated Agreement' },
          { id: 'd', text: 'Bargaining And Trade Negotiation Approach' },
        ],
        correctId: 'c',
        explanation: 'BATNA er «Best Alternative To Negotiated Agreement» — hva du gjør hvis forhandlingene bryter sammen. Jo sterkere BATNA, jo mer forhandlingskraft har du.',
      },
      {
        id: 'pk-4-2',
        question: 'Hva er prinsippbasert forhandling (Harvard-metoden)?',
        choices: [
          { id: 'a', text: 'Å forsvare sin posisjon med alle midler' },
          { id: 'b', text: 'Å fokusere på interesser fremfor posisjoner for å finne win-win løsninger' },
          { id: 'c', text: 'Å alltid gi etter for å unngå konflikt' },
          { id: 'd', text: 'Å bruke aggressive taktikker for å vinne' },
        ],
        correctId: 'b',
        explanation: 'Prinsippbasert forhandling fokuserer på underliggende interesser (hva du egentlig vil oppnå) fremfor posisjoner (hva du sier du vil ha) for å finne kreative win-win løsninger.',
      },
      {
        id: 'pk-4-3',
        question: 'Hva er et effektivt verktøy etter å ha lagt frem et tilbud i en forhandling?',
        choices: [
          { id: 'a', text: 'Umiddelbart tilby mer for å vise velvilje' },
          { id: 'b', text: 'Holde munn — den som snakker først etter tilbudet gir vanligvis etter' },
          { id: 'c', text: 'Fortelle om alle andre tilbud du har fått' },
          { id: 'd', text: 'Trekke tilbudet tilbake og starte på nytt' },
        ],
        correctId: 'b',
        explanation: 'Stillhet er et kraftig forhandlingsverktøy. Etter å ha lagt frem et tilbud, hold munn — presset til å fylle stillheten faller på motparten, og den som snakker først gir vanligvis etter.',
      },
      {
        id: 'pk-4-4',
        question: 'Hva er forskjellen mellom posisjon og interesse i en forhandling?',
        choices: [
          { id: 'a', text: 'Det er ingen praktisk forskjell' },
          { id: 'b', text: 'Posisjon er hva du sier du vil ha; interesse er hva du egentlig trenger' },
          { id: 'c', text: 'Posisjon er mer viktig enn interesse' },
          { id: 'd', text: 'Interesse er en juridisk term, posisjon er en forhandlingsterm' },
        ],
        correctId: 'b',
        explanation: 'Posisjon er hva du sier du vil ha; interesse er den underliggende grunnen til at du vil ha det. Å forstå interessene åpner for kreative løsninger.',
      },
      {
        id: 'pk-4-5',
        question: 'Hva kjennetegner norsk forhandlingskultur?',
        choices: [
          { id: 'a', text: 'Aggressiv og hierarkisk' },
          { id: 'b', text: 'Konsensorientert, egalitær og faktabasert' },
          { id: 'c', text: 'Fokusert på relasjonsbygging over mange måneder' },
          { id: 'd', text: 'Streng hierarkisk der sjefens ord er endelig' },
        ],
        correctId: 'b',
        explanation: 'Norsk forhandlingskultur er konsensorientert og egalitær — man søker løsninger alle kan leve med, hierarki spiller liten rolle, og aggressive taktikker slår som regel tilbake.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '👁️',
    title: 'Nonverbal kommunikasjon i profesjonell kontekst',
    quote: 'Det du gjør snakker så høyt at jeg ikke hører hva du sier. — Ralph Waldo Emerson',
    content: 'Over 60 % av kommunikasjonsbudskapet i ansikt-til-ansikt-møter formidles nonverbalt. I norsk profesjonell kontekst er øyekontakt forventet og viktig. Proksemikk (fysisk avstand) i Norge: 50–120 cm for profesjonelle kontekster. Videosamtaler har egne regler: kamera i øyenhøyde, nøytral bakgrunn, lys fra fronten.',
    subpoints: [
      'ØYEKONTAKT: Norsk norm: hold øyekontakt ca. 60–70 % av tiden under samtale',
      'PROKSEMIKK: Respekter folks «boble» på ca. 1 meter i profesjonelle sammenhenger',
      'VIDEOMØTER: Kamera i øyehøyde, ansiktet godt opplyst, ingen forstyrrende bakgrunn',
    ],
    practical: 'Øv deg på å legge merke til andres kroppsspråk i neste klassetime eller møte — se hvem som er engasjert og hvem som er ute mentalt.',
    exercises: [
      {
        id: 'pk-5-1',
        question: 'Hva er proksemikk?',
        choices: [
          { id: 'a', text: 'Læren om kroppsspråk og ansiktsuttrykk' },
          { id: 'b', text: 'Studiet av fysisk avstand mellom mennesker i kommunikasjon' },
          { id: 'c', text: 'Bruken av stemmetoneleie i presentasjoner' },
          { id: 'd', text: 'Nonverbal kommunikasjon via hender og armer' },
        ],
        correctId: 'b',
        explanation: 'Proksemikk er studiet av fysisk avstand (nærhet) mellom mennesker i kommunikasjonssituasjoner. I profesjonelle norske kontekster er ca. 50–120 cm normen.',
      },
      {
        id: 'pk-5-2',
        question: 'Hvor mye av kommunikasjonsbudskapet i ansikt-til-ansikt-møter anslås å formidles nonverbalt?',
        choices: [
          { id: 'a', text: 'Ca. 10 %' },
          { id: 'b', text: 'Ca. 30 %' },
          { id: 'c', text: 'Over 60 %' },
          { id: 'd', text: 'Ca. 50 %' },
        ],
        correctId: 'c',
        explanation: 'Forskning anslår at over 60 % av kommunikasjonsbudskapet i ansikt-til-ansikt-møter formidles nonverbalt — gjennom kroppsspråk, tonefall og ansiktsuttrykk.',
      },
      {
        id: 'pk-5-3',
        question: 'Hva er normen for øyekontakt i profesjonelle norske samtaler?',
        choices: [
          { id: 'a', text: 'Unngå øyekontakt for å vise respekt' },
          { id: 'b', text: 'Hold konstant øyekontakt uten å se bort' },
          { id: 'c', text: 'Hold øyekontakt ca. 60–70 % av tiden' },
          { id: 'd', text: 'Øyekontakt er kun aktuelt mellom likestilte' },
        ],
        correctId: 'c',
        explanation: 'Norsk norm: ca. 60–70 % øyekontakt under samtale — nok til å signalisere tillit og interesse, men ikke så mye at det blir ubehagelig.',
      },
      {
        id: 'pk-5-4',
        question: 'Hva bør du prioritere for profesjonell fremtreden i videomøter?',
        choices: [
          { id: 'a', text: 'Kamera nedenifra for å virke taller' },
          { id: 'b', text: 'Lys bakfra for en dramatisk effekt' },
          { id: 'c', text: 'Kamera i øyenhøyde, lys fra fronten, nøytral bakgrunn' },
          { id: 'd', text: 'Virtuell bakgrunn med bedriftens logo' },
        ],
        correctId: 'c',
        explanation: 'Kamera i øyenhøyde (ikke nedenfra), ansiktet godt opplyst fra fronten (ikke bakfra), og nøytral ryddig bakgrunn kommuniserer profesjonalitet.',
      },
      {
        id: 'pk-5-5',
        question: 'Hva signaliserer en person som sitter fremoverlent med åpne hender i et møte?',
        choices: [
          { id: 'a', text: 'Lav interesse og kjedsomhet' },
          { id: 'b', text: 'Engasjement og åpenhet' },
          { id: 'c', text: 'Nervøsitet og usikkerhet' },
          { id: 'd', text: 'Dominans og kontroll' },
        ],
        correctId: 'b',
        explanation: 'Fremoverlent kropp og åpne hender signaliserer engasjement, interesse og åpenhet. Tilbakelent holdning og krysstede armer signaliserer det motsatte.',
      },
    ],
  },
];

export default function ProfesjonellKommunikasjonModule() {
  return (
    <DrawerModule
      moduleCode="KK-VG2-1"
      moduleTitle="Avansert kommunikasjon"
      moduleIcon="🎙️"
      storageKey="learning-vg2-profesjonell-kommunikasjon"
      completeRoute="/learning/vg2/kultur/profesjonell-kommunikasjon/complete"
      phases={phases}
      intro="Profesjonell kommunikasjon er grunnlaget for alt som skjer i næringslivet — salg, ledelse, forhandlinger og samarbeid. Å beherske kommunikasjon er ikke bare en fordel, det er en kjernekompetanse som skiller gode fagpersoner fra de beste."
      vissteduAt="Forskning fra Harvard Business School viser at folk tar sin første vurdering av om de liker og stoler på noen innen 100 millisekunder — lenge før personen har sagt ett ord. Inntreden i et rom, håndhilsning og første øyekontakt er kritisk."
      espenSier="I mine år som rådgiver har jeg sett utallige dyktige fagpersoner tape mot svakere kandidater fordi de undervurderte kommunikasjon. Kunnskap du ikke kan formidle er halv kunnskap."
      presentationLink={{ route: '/learning/presentations/kommunikasjon', description: 'Kommunikasjon — en visuell gjennomgang av profesjonell kommunikasjon' }}
    />
  );
}
