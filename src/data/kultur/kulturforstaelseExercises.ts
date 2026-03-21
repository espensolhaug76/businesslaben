import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const KULTURFORSTAELSE_EXERCISES: QuizExercise[] = [
  {
    id: 'kultur-01',
    icon: '🏯',
    title: 'Japansk reisegruppe på hotellet',
    context:
      'Du jobber i resepsjonen på et hotell i Bergen. En gruppe på 12 japanske turister ankommer for innsjekk. Reiselederen hilser deg med et lite nikk.',
    question:
      'Hva bør du gjøre for å gi gruppen en kulturelt bevisst og respektfull velkomst?',
    choices: [
      {
        id: 'a',
        label:
          'Gå rundt skranken, ta alle i hånden med et bredt smil og introduser deg med fornavn for å gjøre stemningen uformell og varm.',
        isCorrect: false,
        feedback:
          'Feil. Japansk kultur verdsetter formell distanse og hierarki, spesielt ved første møte. Overdreven uformell kroppskontakt kan oppleves som invaderende.',
      },
      {
        id: 'b',
        label:
          'Bukk lett som respons på hilsenen, hold en rolig og formell tone, unngå intens stirring og gi romkortene med to hender.',
        isCorrect: true,
        feedback:
          'Riktig! I japansk kultur er bukking en respektfull hilsen, og å gi gjenstander med to hender er et tegn på aktelse. Rolig og formell kommunikasjon samsvarer med kulturelle forventninger og gjør gjestene komfortable.',
      },
      {
        id: 'c',
        label:
          'Snakke sakte og høyt på norsk — japanere er vant til turister og skjønner mer enn man tror.',
        isCorrect: false,
        feedback:
          'Feil. Å snakke høyere hjelper ikke forståelsen og kan virke nedlatende. Bruk heller enkle engelske ord, bilder og kroppsspråk.',
      },
      {
        id: 'd',
        label:
          'Spørre reiselederen om hele gruppen foretrekker å bli behandlet "på japansk vis" eller som norske gjester.',
        isCorrect: false,
        feedback:
          'Feil. Dette spørsmålet kan oppleves som klossete og sette reiselederen i en vanskelig posisjon. Tilpass deg situasjonen naturlig — uten å gjøre et nummer av kulturforskjellene.',
      },
    ],
    espenTip:
      '⚠️ God service tilpasser seg kunden — ikke omvendt. Kulturell bevissthet gir bedre kundeopplevelser!',
  },
  {
    id: 'kultur-02',
    icon: '🤲',
    title: 'Håndhilsing og kulturelle normer',
    context:
      'Du er resepsjonist på et forretningshotell i Oslo. En mannlig gjest fra Saudi-Arabia ankommer og skal sjekke inn. Din kvinnelige kollega strekker ut hånden for å hilse — men gjesten unngår å ta den.',
    question:
      'Gjesten tar ikke i hånden til den ansatte. Hva er riktig reaksjon?',
    choices: [
      {
        id: 'a',
        label:
          'Spørre gjesten diskret om han har noe mot å hilse på kvinner — bare for å forstå situasjonen bedre.',
        isCorrect: false,
        feedback:
          'Feil. Dette setter gjesten i en ubehagelig posisjon og er unødvendig. Reaksjonen er forklart av kulturell og religiøs kontekst — ikke noe som trenger kartlegging.',
      },
      {
        id: 'b',
        label:
          'Kollegaen trekker hånden tilbake med et smil, nikker vennlig, og fortsetter innsjekkingen som normalt uten å gjøre noe nummer av det.',
        isCorrect: true,
        feedback:
          'Riktig! I konservativ islamsk tradisjon unngår noen menn fysisk kontakt med kvinner de ikke er beslektet med. Å respektere dette uten å vise overraskelse eller ubehag er profesjonell og kulturelt sensitiv service.',
      },
      {
        id: 'c',
        label:
          'Reagere med overraskelse og si: "I Norge hilser vi alltid med håndtrykk — det er bare en skikk."',
        isCorrect: false,
        feedback:
          'Feil. Dette er konfronterende og kulturelt ufølsomt. Det norske håndtrykket er ikke en universell norm som andre plikter å følge.',
      },
      {
        id: 'd',
        label:
          'Bytte ut den ansatte med en mannlig kollega for resten av innsjekkingsprosessen.',
        isCorrect: false,
        feedback:
          'Feil. Dette er unødvendig og kan faktisk oppleves som diskriminering av den ansatte. En vennlig nikk er tilstrekkelig og profesjonelt nok.',
      },
    ],
    espenTip:
      '⚠️ God service tilpasser seg kunden — ikke omvendt. Kulturell bevissthet gir bedre kundeopplevelser!',
  },
  {
    id: 'kultur-03',
    icon: '🇺🇸',
    title: 'Høylytt amerikansk turist',
    context:
      'Du er resepsjonist på et boutique-hotell i Tromsø. En amerikansk turist kommer bestemt bort til skranken og klager høylytt på at rommet var kaldt og at frokosten var "terrible". Andre gjester hører det.',
    question:
      'Turisten er direkte og høylytt. Hva er viktig å ha i bakhodet når du håndterer situasjonen?',
    choices: [
      {
        id: 'a',
        label:
          'Senke stemmen og be turisten om å roe seg — det er ubehagelig for andre gjester.',
        isCorrect: false,
        feedback:
          'Feil. Å be en opprørt person "roe seg" eskalerer nesten alltid situasjonen. Det oppleves som nedlatende og avvisende.',
      },
      {
        id: 'b',
        label:
          'Amerikanere er vant til direkte og høylytt kommunikasjon — det betyr ikke nødvendigvis sinne. Ta det ikke personlig, og fokuser på å løse problemet konkret og raskt.',
        isCorrect: true,
        feedback:
          'Riktig! I amerikansk servicekultur er direkte og høylytt kommunikasjon normalt, ikke nødvendigvis aggressivt. "The customer is always right"-mentaliteten er utbredt. Anerkjenn klagen, løs problemet og ikke tolke volumet som personlig angrep.',
      },
      {
        id: 'c',
        label:
          'Tolke høy stemme som aggresjon og tilkalle vakt — du er ikke pliktig til å tåle dårlig oppførsel.',
        isCorrect: false,
        feedback:
          'Feil. Det er ingen aggresjon beskrevet her — kun høy stemme og direkte klage. Å tilkalle vakt vil eskalere situasjonen dramatisk og er ute av proporsjoner.',
      },
      {
        id: 'd',
        label:
          'Forklare rolig at i Norge kommuniserer vi stille og at turisten bør tilpasse seg lokal kultur.',
        isCorrect: false,
        feedback:
          'Feil. Dette er arrogant og kulturelt blindt. Betalende gjester tilpasser seg ikke hotellets kommunikasjonskultur — hotellet tilpasser seg gjesten.',
      },
    ],
    espenTip:
      '⚠️ God service tilpasser seg kunden — ikke omvendt. Kulturell bevissthet gir bedre kundeopplevelser!',
  },
  {
    id: 'kultur-04',
    icon: '🌙',
    title: 'Ramadan og tilrettelegging på jobb',
    context:
      'Du er daglig leder i en kaffebar. En av dine ansatte, Fatima, forteller at hun faster i ramadan og ber om å flytte lunsjpausen til etter solnedgang (ca. kl. 21:00 i april).',
    question:
      'Fatima ber om endret lunsjpause under ramadan. Hva er riktig tilnærming som arbeidsgiver?',
    choices: [
      {
        id: 'a',
        label:
          'Si at alle ansatte har likt oppsatte pauser og at unntak ikke er mulig — det skaper presedens.',
        isCorrect: false,
        feedback:
          'Feil. Diskrimineringsloven krever at arbeidsgiver gjør rimelige tilpasninger for religiøs praksis. Å avvise uten videre vurdering er lovstridig.',
      },
      {
        id: 'b',
        label:
          'Tilpasse lunsjpausen for Fatima i ramadan-perioden — diskrimineringsloven krever rimelig tilrettelegging for religiøs praksis.',
        isCorrect: true,
        feedback:
          'Riktig! Likestillings- og diskrimineringsloven gir ansatte rett til rimelig tilrettelegging for religion. En endret pausetid er en enkel tilpasning som ikke skader driften og viser inkluderende ledelse.',
      },
      {
        id: 'c',
        label:
          'Tilby å sette opp Fatima på kvelds- og nattskift i hele ramadan slik at problemet løser seg selv.',
        isCorrect: false,
        feedback:
          'Feil. Å flytte ansatte til andre skift uten deres ønske er ikke rimelig tilrettelegging — det er å straffe dem for religiøs praksis.',
      },
      {
        id: 'd',
        label:
          'Si at du respekterer religionen men at det er umulig å endre rutinene i en travel periode som april.',
        isCorrect: false,
        feedback:
          'Feil. Travlhet i driften fritar ikke arbeidsgiver fra plikten til å vurdere rimelig tilpasning. Loven setter terskelen lavt — tilpasningen skal bare ikke medføre uforholdsmessig byrde.',
      },
    ],
    espenTip:
      '⚠️ God service tilpasser seg kunden — ikke omvendt. Kulturell bevissthet gir bedre kundeopplevelser!',
  },
  {
    id: 'kultur-05',
    icon: '🌍',
    title: 'Språkbarriere: Spansk turist',
    context:
      'Du jobber i informasjonsskranken på Bryggen i Bergen. En eldre dame kommer bort til deg — hun er tydelig forvirret og snakker raskt på spansk. Hun verken snakker norsk eller engelsk.',
    question:
      'Turisten snakker kun spansk. Hva er den beste måten å hjelpe henne på?',
    choices: [
      {
        id: 'a',
        label:
          'Si "Sorry, no Spanish!" og peke henne videre til turistinformasjonen nede i gaten.',
        isCorrect: false,
        feedback:
          'Feil. Å sende bort en forvirret og eldre turist uten å forsøke å hjelpe er dårlig service og lite menneskelig. Du gir opp for tidlig.',
      },
      {
        id: 'b',
        label:
          'Ringe etter en kollega som kan spansk — ingen kan forvente at du kommuniserer uten felles språk.',
        isCorrect: false,
        feedback:
          'Delvis greit i noen situasjoner, men som førstesteg er det en omvei. Det finnes enklere og raskere verktøy tilgjengelig.',
      },
      {
        id: 'c',
        label:
          'Bruke Google Translate eller tolk-appen på mobilen, snakke i enkle setninger, bruke bilder og kart, og vise tålmodighet og et vennlig smil.',
        isCorrect: true,
        feedback:
          'Riktig! Teknologien finnes og fungerer godt nok til å avklare de fleste praktiske behov. Et vennlig kroppsspråk og tålmodighet kommuniserer omsorg på tvers av språkbarrierer. Kunden skal gå derfra og føle seg hjulpet — ikke avvist.',
      },
      {
        id: 'd',
        label:
          'Snakke sakte og tydelig på norsk og håpe at noen av ordene likner spansk — det er begge romanske språk.',
        isCorrect: false,
        feedback:
          'Feil. Norsk er et germansk språk og ligner ikke spansk. Å snakke sakte på et språk kunden ikke forstår hjelper ingenting.',
      },
    ],
    espenTip:
      '⚠️ God service tilpasser seg kunden — ikke omvendt. Kulturell bevissthet gir bedre kundeopplevelser!',
  },
]
