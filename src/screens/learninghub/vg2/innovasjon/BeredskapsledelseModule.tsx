import DrawerModule from '../../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🔄',
    title: 'Kriseledelsens faser',
    quote: 'Den beste kriseresponsen er den som aldri ble nødvendig fordi forebyggingen virket',
    content: 'Kriseledelse deles inn i tre faser: førkrise, krisefase og etterkrise. I førkrisen forebygger og planlegger man. I krisefasen håndterer man situasjonen. I etterkrisen evaluerer og gjenoppretter man.',
    subpoints: [
      'FØR-KRISEN: Risikoanalyse, beredskapsplaner, opplæring og øvelser',
      'KRISEFASEN: Deteksjon, varsling, respons og krisekommunikasjon',
      'ETTER-KRISEN: Evaluering, gjenoppretting og læring',
    ],
    practical: 'En hotellkjede oppdager en legionellabakterie i vannsystemet. De aktiverer beredskapsplanen, evakuerer gjester, varsler helsemyndigheter og kommuniserer åpent med media — klassisk god krisehåndtering.',
    exercises: [
      {
        id: 'bl-1-1',
        question: 'Hvilken fase i kriseledelse handler om forebygging og planlegging?',
        choices: [
          { id: 'a', text: 'Krisefasen' },
          { id: 'b', text: 'Etterkrisen' },
          { id: 'c', text: 'Førkrisen' },
          { id: 'd', text: 'Responsfasen' },
        ],
        correctId: 'c',
        explanation: 'Førkrisen er fasen der man forebygger, planlegger, trener og øver for å være forberedt på potensielle kriser.',
      },
      {
        id: 'bl-1-2',
        question: 'Hva er hovedoppgaven i krisefasen?',
        choices: [
          { id: 'a', text: 'Skrive beredskapsplaner' },
          { id: 'b', text: 'Håndtere den pågående situasjonen' },
          { id: 'c', text: 'Evaluere hva som gikk galt' },
          { id: 'd', text: 'Ansette krisekonsulenter' },
        ],
        correctId: 'b',
        explanation: 'I krisefasen er fokuset på å håndtere den aktive situasjonen: deteksjon, varsling, respons og kommunikasjon.',
      },
      {
        id: 'bl-1-3',
        question: 'Hva skjer i etterkrisen?',
        choices: [
          { id: 'a', text: 'Man aktiverer beredskapsplanen' },
          { id: 'b', text: 'Man trener ansatte for første gang' },
          { id: 'c', text: 'Man evaluerer, gjenoppretter og lærer' },
          { id: 'd', text: 'Man ignorerer hendelsen' },
        ],
        correctId: 'c',
        explanation: 'Etterkrisen handler om evaluering av responsen, gjenoppretting til normal drift og å lære av erfaringene.',
      },
      {
        id: 'bl-1-4',
        question: 'En virksomhet gjennomfører regelmessige risikoanalyser og øvelser. Hvilken fase befinner de seg i?',
        choices: [
          { id: 'a', text: 'Krisefasen' },
          { id: 'b', text: 'Etterkrisen' },
          { id: 'c', text: 'Responsfasen' },
          { id: 'd', text: 'Førkrisen' },
        ],
        correctId: 'd',
        explanation: 'Risikoanalyser og øvelser er typiske aktiviteter i førkrisen, der målet er å forebygge og forberede seg.',
      },
      {
        id: 'bl-1-5',
        question: 'Hva er riktig rekkefølge i kriseledelsens faser?',
        choices: [
          { id: 'a', text: 'Krise → Førkrise → Etterkrise' },
          { id: 'b', text: 'Etterkrise → Krise → Førkrise' },
          { id: 'c', text: 'Førkrise → Krise → Etterkrise' },
          { id: 'd', text: 'Førkrise → Etterkrise → Krise' },
        ],
        correctId: 'c',
        explanation: 'Den logiske rekkefølgen er: Førkrise (forberedelse) → Krisefase (håndtering) → Etterkrise (evaluering og gjenoppretting).',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📢',
    title: 'Kommunikasjon under krise',
    quote: 'I krisen er det ikke sannheten som seirer — det er den versjonen som kommuniseres raskest og tydeligst',
    content: 'Krisekommunikasjon handler om å formidle riktig informasjon raskt, nøyaktig og empatisk. Prinsippene er hastighet (vær først), nøyaktighet (vær korrekt) og empati (vis omsorg). Tomrommet fylles alltid — enten av deg eller av rykter.',
    subpoints: [
      'HASTIGHET: Si noe tidlig, selv om du ikke har alle svarene ennå',
      'NØYAKTIGHET: Ikke spre ubekreftet informasjon — korriger åpent hvis du tar feil',
      'EMPATI: Anerkjenn berørte parters følelser og situasjon',
    ],
    practical: 'Et flyselskap mister kontakt med et fly. De kommuniserer umiddelbart at de undersøker situasjonen, oppretter en pårørendelinje og oppdaterer jevnlig — selv uten svar. Dette er bedre enn taushet.',
    glossaryTerm: 'Krisekommunikasjon',
    exercises: [
      {
        id: 'bl-2-1',
        question: 'Hva er de tre hovedprinsippene i krisekommunikasjon?',
        choices: [
          { id: 'a', text: 'Taushet, kontroll og juridisk vern' },
          { id: 'b', text: 'Hastighet, nøyaktighet og empati' },
          { id: 'c', text: 'Offensiv, defensiv og nøytral' },
          { id: 'd', text: 'Intern, ekstern og digital' },
        ],
        correctId: 'b',
        explanation: 'God krisekommunikasjon bygger på hastighet (vær tidlig ute), nøyaktighet (vær korrekt) og empati (vis omsorg for berørte).',
      },
      {
        id: 'bl-2-2',
        question: 'Hvorfor er det viktig å kommunisere tidlig i en krise, selv om man ikke har alle svarene?',
        choices: [
          { id: 'a', text: 'For å imponere media' },
          { id: 'b', text: 'For å hindre at tomrommet fylles av rykter' },
          { id: 'c', text: 'Fordi loven krever det' },
          { id: 'd', text: 'For å unngå å betale erstatning' },
        ],
        correctId: 'b',
        explanation: 'Informasjonsvakuum fylles alltid — enten av virksomheten selv, eller av spekulasjoner og rykter. Tidlig kommunikasjon gir kontroll over narrativet.',
      },
      {
        id: 'bl-2-3',
        question: 'En bedrift oppdager at de spredte feil informasjon under en krise. Hva bør de gjøre?',
        choices: [
          { id: 'a', text: 'Ignorere det og håpe ingen la merke til det' },
          { id: 'b', text: 'Korriger åpent og ta ansvar for feilen' },
          { id: 'c', text: 'Skylde på media' },
          { id: 'd', text: 'Trekke tilbake all kommunikasjon' },
        ],
        correctId: 'b',
        explanation: 'Nøyaktighet inkluderer å korrigere feil åpent. Å ta ansvar for feilinformasjon bygger tillit fremfor å ødelegge det.',
      },
      {
        id: 'bl-2-4',
        question: 'Hva betyr empati i krisekommunikasjon?',
        choices: [
          { id: 'a', text: 'Å unngå å si noe som kan brukes mot deg i retten' },
          { id: 'b', text: 'Å anerkjenne berørte parters følelser og situasjon' },
          { id: 'c', text: 'Å sende blomster til journalister' },
          { id: 'd', text: 'Å ha en hyggelig talsperson' },
        ],
        correctId: 'b',
        explanation: 'Empati i krisekommunikasjon handler om genuint å anerkjenne og adressere følelsene og bekymringene til de som er berørt av krisen.',
      },
      {
        id: 'bl-2-5',
        question: 'Hva er en talsperson i krisekommunikasjon?',
        choices: [
          { id: 'a', text: 'En advokat som hindrer informasjonsflyt' },
          { id: 'b', text: 'Den personen som offisielt kommuniserer på vegne av virksomheten' },
          { id: 'c', text: 'En ekstern konsulent uten kunnskap om virksomheten' },
          { id: 'd', text: 'En sosiale medier-ansatt' },
        ],
        correctId: 'b',
        explanation: 'Talspersonen er den offisielle stemmen utad under en krise. Én tydelig talsperson sikrer konsistent og koordinert kommunikasjon.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🏗️',
    title: 'Organisering av beredskapsarbeid',
    quote: 'En beredskapsplan uten tydelig ansvarsfordeling er en huskelapp, ikke en plan',
    content: 'Beredskapsarbeid krever klar struktur. ICS (Incident Command System) er et mye brukt system med tydelig kommandolinje. Et kriseteam bør ha definerte roller: kriseledelsen, talsperson, operasjonsleder og støttefunksjoner.',
    subpoints: [
      'ICS: Incident Command System — skalerbar struktur brukt av nødetater og store virksomheter',
      'KRISETEAM: Dedikert gruppe med klare roller og myndighet',
      'ANSVARSFORDELING: Hvem bestemmer hva, hvem kommuniserer og hvem utfører tiltak',
    ],
    practical: 'Under en stor matvarekrise aktiverte Rema 1000 sitt kriseteam: administrerende direktør ledet, kommunikasjonsdirektøren var talsperson, driftssjefen koordinerte tilbaketrekking av varer — tydelig rollefordeling.',
    exercises: [
      {
        id: 'bl-3-1',
        question: 'Hva står ICS for i beredskapssammenheng?',
        choices: [
          { id: 'a', text: 'Internal Crisis System' },
          { id: 'b', text: 'Incident Command System' },
          { id: 'c', text: 'International Crisis Strategy' },
          { id: 'd', text: 'Integrated Communication System' },
        ],
        correctId: 'b',
        explanation: 'ICS (Incident Command System) er et standardisert system for ledelse av hendelser, opprinnelig utviklet av brannvesenet i USA og nå brukt globalt.',
      },
      {
        id: 'bl-3-2',
        question: 'Hva er formålet med et kriseteam?',
        choices: [
          { id: 'a', text: 'Å spare penger ved å redusere staben' },
          { id: 'b', text: 'Å ha en dedikert gruppe med klare roller som håndterer krisen koordinert' },
          { id: 'c', text: 'Å informere media om alt som skjer internt' },
          { id: 'd', text: 'Å erstatte den ordinære ledelsen permanent' },
        ],
        correctId: 'b',
        explanation: 'Kriseteamet er en dedikert gruppe med forhåndsdefinerte roller og myndighet som sikrer koordinert og effektiv håndtering av krisen.',
      },
      {
        id: 'bl-3-3',
        question: 'Hvorfor er tydelig ansvarsfordeling viktig i beredskapsarbeid?',
        choices: [
          { id: 'a', text: 'For å gi alle ansatte samme ansvar' },
          { id: 'b', text: 'For å sikre at ingen trenger å ta beslutninger' },
          { id: 'c', text: 'For å unngå kaos og forsinkelser når krisen oppstår' },
          { id: 'd', text: 'For å tilfredsstille formelle krav uten praktisk nytte' },
        ],
        correctId: 'c',
        explanation: 'I en krisesituasjon er tid kritisk. Tydelig ansvarsfordeling sikrer at riktige personer tar riktige beslutninger raskt, uten å miste tid på uklarhet.',
      },
      {
        id: 'bl-3-4',
        question: 'Hva kjennetegner ICS som system?',
        choices: [
          { id: 'a', text: 'Det er kun for militære operasjoner' },
          { id: 'b', text: 'Det er skalerbart og kan brukes til store og små hendelser' },
          { id: 'c', text: 'Det krever alltid minst 50 personer' },
          { id: 'd', text: 'Det ble avviklet etter 2010' },
        ],
        correctId: 'b',
        explanation: 'ICS er designet for å være skalerbart — strukturen kan brukes til en liten hendelse med få personer eller en stor katastrofe med hundrevis av ressurser.',
      },
      {
        id: 'bl-3-5',
        question: 'Hvem bør typisk være talsperson i en krisesituasjon?',
        choices: [
          { id: 'a', text: 'Den første ansatte som svarer telefonen' },
          { id: 'b', text: 'En forhåndsutpekt person med trening i krisekommunikasjon' },
          { id: 'c', text: 'Den ansatte som er minst involvert' },
          { id: 'd', text: 'En ekstern PR-byrå uten kjennskap til virksomheten' },
        ],
        correctId: 'b',
        explanation: 'Talspersonen bør være forhåndsutpekt og trent i krisekommunikasjon, slik at de kan kommunisere tydelig og konsistent under press.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🎓',
    title: 'Øvelse og testing',
    quote: 'En beredskapsplan som aldri er testet, er bare gode intensjoner på papir',
    content: 'Beredskapsplaner må testes regelmessig. To vanlige øvelsesformer er tabletop-øvelser (diskusjonsbaserte scenariogjennomganger) og fullskalaøvelser (realistisk simulering med alle ressurser aktivert).',
    subpoints: [
      'TABLETOP: Diskusjonsbasert øvelse rundt et scenario — billig og effektiv for å teste planer',
      'FULLSKALA: Realistisk simulering med faktiske ressurser — dyrere men gir mer realistisk læring',
      'FREKVENS: Minst én øvelse per år anbefales, hyppigere for virksomheter med høy risiko',
    ],
    practical: 'Et sykehus gjennomfører månedlige tabletop-øvelser der ledere diskuterer scenarier, og én fullskalaøvelse per år der de simulerer en masseulykke med statister og ambulanser.',
    exercises: [
      {
        id: 'bl-4-1',
        question: 'Hva er en tabletop-øvelse?',
        choices: [
          { id: 'a', text: 'En øvelse der man faktisk evakuerer bygningen' },
          { id: 'b', text: 'En diskusjonsbasert gjennomgang av et krisescenario' },
          { id: 'c', text: 'En øvelse med fullskala ressurser' },
          { id: 'd', text: 'En bordtennis-konkurranse for teambuilding' },
        ],
        correctId: 'b',
        explanation: 'En tabletop-øvelse er en diskusjonsbasert scenariogjennomgang der deltakerne snakker seg gjennom et krisescenario uten å aktivere faktiske ressurser.',
      },
      {
        id: 'bl-4-2',
        question: 'Hva kjennetegner en fullskalaøvelse?',
        choices: [
          { id: 'a', text: 'Den gjennomføres kun på papir' },
          { id: 'b', text: 'Den simulerer et scenario realistisk med faktiske ressurser og personell' },
          { id: 'c', text: 'Den involverer kun ledelsen' },
          { id: 'd', text: 'Den varer maks 30 minutter' },
        ],
        correctId: 'b',
        explanation: 'En fullskalaøvelse simulerer en krise så realistisk som mulig, med faktiske ressurser, personell og prosedyrer aktivert — som en ekte krise.',
      },
      {
        id: 'bl-4-3',
        question: 'Hvorfor er det viktig å øve på beredskapsplaner?',
        choices: [
          { id: 'a', text: 'Fordi forsikringen krever det' },
          { id: 'b', text: 'For å avdekke svakheter og sikre at planen faktisk fungerer i praksis' },
          { id: 'c', text: 'For å gi ansatte fri fra vanlig arbeid' },
          { id: 'd', text: 'Planer trenger ikke øving hvis de er godt skrevet' },
        ],
        correctId: 'b',
        explanation: 'Øvelser avdekker gap mellom plan og virkelighet. En plan som ikke er testet, kan ha kritiske svakheter som kun oppdages under press.',
      },
      {
        id: 'bl-4-4',
        question: 'Hvilken øvelsesform er billigst og enklest å gjennomføre?',
        choices: [
          { id: 'a', text: 'Fullskalaøvelse' },
          { id: 'b', text: 'Feltøvelse med redningspersonell' },
          { id: 'c', text: 'Tabletop-øvelse' },
          { id: 'd', text: 'Internasjonale krisesimuleringer' },
        ],
        correctId: 'c',
        explanation: 'Tabletop-øvelser er billige og enkle å arrangere — de krever kun at deltakerne samles for å diskutere et scenario, uten behov for faktisk utstyr eller ressurser.',
      },
      {
        id: 'bl-4-5',
        question: 'Hvor ofte anbefales det å gjennomføre beredskapsøvelser?',
        choices: [
          { id: 'a', text: 'Hvert tiende år' },
          { id: 'b', text: 'Kun etter en faktisk krise' },
          { id: 'c', text: 'Minst én gang per år, hyppigere ved høy risiko' },
          { id: 'd', text: 'Det er ingen anbefalinger om frekvens' },
        ],
        correctId: 'c',
        explanation: 'Anbefalingen er minst én øvelse per år for å holde beredskapsevnen ved like. Virksomheter med høy risikoprofil bør øve hyppigere.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🔍',
    title: 'Læring etter krise',
    quote: 'En krise du ikke lærer av, er dobbelt bortkastet',
    content: 'Etter en krise er evaluering avgjørende. Post-incident-analyse kartlegger hva som skjedde, hva som fungerte, hva som feilet og hva som må forbedres. Resiliens er evnen til å komme sterkere tilbake etter en krise.',
    subpoints: [
      'POST-INCIDENT-ANALYSE: Strukturert gjennomgang av hendelsen med alle involverte parter',
      'RESILIENS: Evnen til å absorbere et sjokk og gjenopprette — eller komme sterkere tilbake',
      'FORBEDRING: Konkrete tiltak som oppdaterer beredskapsplanen basert på læringen',
    ],
    practical: 'Etter at et hotell ble rammet av et cyberangrep, gjennomførte de en grundig post-incident-analyse. De oppdaget at varslingssystemet var for tregt og at ansatte ikke visste hvem de skulle kontakte — begge deler ble umiddelbart forbedret.',
    exercises: [
      {
        id: 'bl-5-1',
        question: 'Hva er en post-incident-analyse?',
        choices: [
          { id: 'a', text: 'En analyse som gjennomføres FØR krisen for å forebygge' },
          { id: 'b', text: 'En strukturert gjennomgang av hendelsen etter at krisen er over' },
          { id: 'c', text: 'En rapport som kun sendes til forsikringsselskapet' },
          { id: 'd', text: 'En øvelse der man simulerer en krise' },
        ],
        correctId: 'b',
        explanation: 'Post-incident-analyse gjennomføres etter en krise for å kartlegge hva som skjedde, hva som fungerte og hva som må forbedres.',
      },
      {
        id: 'bl-5-2',
        question: 'Hva betyr resiliens i beredskapssammenheng?',
        choices: [
          { id: 'a', text: 'Evnen til å unngå alle kriser' },
          { id: 'b', text: 'Evnen til å absorbere sjokk og komme tilbake — gjerne sterkere' },
          { id: 'c', text: 'Å ha mange ansatte i reserve' },
          { id: 'd', text: 'Å ikke kommunisere om kriser eksternt' },
        ],
        correctId: 'b',
        explanation: 'Resiliens er organisasjonens evne til å tåle kriser, tilpasse seg og gjenopprette normal drift — ideelt sett med forbedret kapasitet.',
      },
      {
        id: 'bl-5-3',
        question: 'Hvem bør delta i en post-incident-analyse?',
        choices: [
          { id: 'a', text: 'Kun toppledelsen' },
          { id: 'b', text: 'Kun de som gjorde feil under krisen' },
          { id: 'c', text: 'Alle relevante involverte parter fra krisen' },
          { id: 'd', text: 'Eksterne konsulenter uten kjennskap til hendelsen' },
        ],
        correctId: 'c',
        explanation: 'For å få et fullstendig bilde bør alle relevante parter delta — fra operativt personell til ledelse. Ulike perspektiver gir bedre læring.',
      },
      {
        id: 'bl-5-4',
        question: 'Hva er det viktigste resultatet av en post-incident-analyse?',
        choices: [
          { id: 'a', text: 'En liste over hvem som gjorde feil' },
          { id: 'b', text: 'Konkrete tiltak som forbedrer beredskapsplanen' },
          { id: 'c', text: 'En rapport som arkiveres uten oppfølging' },
          { id: 'd', text: 'Mediedekning av krisen' },
        ],
        correctId: 'b',
        explanation: 'Analysen er kun verdifull hvis den fører til konkrete forbedringer i beredskapsplan, prosedyrer og opplæring.',
      },
      {
        id: 'bl-5-5',
        question: 'Hvorfor er det viktig å lære av kriser?',
        choices: [
          { id: 'a', text: 'For å finne syndebukker i organisasjonen' },
          { id: 'b', text: 'For å øke beredskapsevnen og redusere risikoen for fremtidige kriser' },
          { id: 'c', text: 'For å bevise at krisen ikke var lederens feil' },
          { id: 'd', text: 'Det er ikke nødvendig — én krise er nok læring' },
        ],
        correctId: 'b',
        explanation: 'Læring etter krise er essensielt for kontinuerlig forbedring av beredskapsevnen. Organisasjoner som lærer av kriser er bedre rustet for fremtidige hendelser.',
      },
    ],
  },
];

export default function BeredskapsledelseModule() {
  return (
    <DrawerModule
      moduleCode="IMF-VG2-5"
      moduleTitle="Beredskapsledelse"
      moduleIcon="🚨"
      storageKey="learning-vg2-beredskapsledelse"
      completeRoute="/learning/vg2/innovasjon/beredskapsledelse/complete"
      phases={phases}
      intro="Beredskapsledelse handler om å forberede seg på det uventede — og å håndtere det profesjonelt når det likevel skjer."
      vissteduAt="Etter 22. juli 2011 gjennomgikk Norge den mest omfattende revisjonen av beredskapsstrukturen siden andre verdenskrig. Bedrifter med dokumentert beredskapsplan overlever kriser 40% raskere."
      espenSier="Jeg har sett virksomheter håndtere kriser eksepsjonelt godt og noen katastrofalt dårlig — og forskjellen er nesten alltid forberedelse, ikke intelligens."
      presentationLink={{ route: '/learning/presentations/konflikt-nod', description: 'Konflikt og nød — en visuell gjennomgang av beredskapsledelse og krisehåndtering' }}
    />
  );
}
