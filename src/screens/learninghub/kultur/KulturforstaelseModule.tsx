import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🧊',
    title: 'Hva er kultur og kulturelle verdier?',
    quote: 'Kultur er som et isfjell — det du ser er det minste og minst farlige.',
    content: 'Eisberg-modellen for kultur skiller mellom det synlige og det usynlige. Over vannflaten finner vi de umiddelbart observerbare elementene: mat, klesdrakt, musikk, kunst, språk og høytider. Under vannflaten finner vi verdier, antakelser, rolleforventninger, tidsoppfatning, synet på autoritet og regler for høflighet — og det er her de fleste kulturkollisjoner skjer.',
    subpoints: [
      { label: 'SYNLIG KULTUR', text: 'Mat, språk, musikk, klær, arkitektur og tradisjoner — lettobserverbare, men et dårlig grunnlag for dype slutninger om en kultur.' },
      { label: 'USYNLIG KULTUR', text: 'Verdier, antakelser om tid og hierarki, kjønnsroller, kommunikasjonsregler og forestillinger om hva som er «naturlig» — dette er det som virkelig former atferd.' },
      { label: 'KULTURSJOKK', text: 'Reaksjonen når usynlig kultur kolliderer — norske studenter i Asia opplever dette intenst når deres vante direktekommunikasjon tolkes som uhøflighet.' },
    ],
    practical: 'Når du møter en kunde med annen kulturbakgrunn, vær nysgjerrig og åpen heller enn å projisere antakelser — still spørsmål, observer og tilpass deg det du faktisk ser.',
    exercises: [
      {
        id: 'kf-1-1',
        question: 'Hva representerer den «synlige» delen av kulturisfjellet?',
        choices: [
          { id: 'a', text: 'Verdier og antakelser' },
          { id: 'b', text: 'Mat, musikk, klær, språk og tradisjoner' },
          { id: 'c', text: 'Synet på autoritet og hierarki' },
          { id: 'd', text: 'Regler for høflighet og kommunikasjon' },
        ],
        correctId: 'b',
        explanation: 'Den synlige delen av kulturisfjellet er det umiddelbart observerbare — mat, musikk, klær og tradisjoner. Men dette er bare toppen av isfjellet.',
      },
      {
        id: 'kf-1-2',
        question: 'Hvor skjer de fleste kulturkollisjoner ifølge isfjellmodellen?',
        choices: [
          { id: 'a', text: 'I den synlige delen — mat og klær' },
          { id: 'b', text: 'I den usynlige delen — verdier, antakelser og kommunikasjonsregler' },
          { id: 'c', text: 'Kun i høflighetsregler' },
          { id: 'd', text: 'Kun i språkbarrierer' },
        ],
        correctId: 'b',
        explanation: 'Kulturkollisjoner skjer oftest i det usynlige — når verdier, forventninger og kommunikasjonsregler krasjer uten at noen av partene er klar over det.',
      },
      {
        id: 'kf-1-3',
        question: 'En japansk turist svarer «ja» på spørsmål om de fant det de lette etter, men er tydelig ikke fornøyd. Hva kan forklare dette?',
        choices: [
          { id: 'a', text: 'Turisten lyver' },
          { id: 'b', text: 'I japansk kultur kan «ja» bety «jeg hørte deg» og direkte avvisning er uhøflig' },
          { id: 'c', text: 'Turisten misforsto spørsmålet' },
          { id: 'd', text: 'Det er tilfeldig' },
        ],
        correctId: 'b',
        explanation: 'I japansk kultur er direkte avvisning uhøflig — «ja» eller nøling kan bety «nei». Dette er usynlig kulturell kommunikasjon som skaper misforståelser.',
      },
      {
        id: 'kf-1-4',
        question: 'Hva er kultursjokk?',
        choices: [
          { id: 'a', text: 'Reaksjonen på ukjent mat eller klesdrakt' },
          { id: 'b', text: 'Reaksjonen som oppstår når ens usynlige kulturelle antakelser møter grunnleggende andre antakelser' },
          { id: 'c', text: 'Angst ved å reise til utlandet' },
          { id: 'd', text: 'Sjokk over kulturelle sehensverdigheter' },
        ],
        correctId: 'b',
        explanation: 'Kultursjokk oppstår når det usynlige krasjer — når ens automatiske antakelser om hva som er «normalt» møter en virkelighet som fungerer fundamentalt annerledes.',
      },
      {
        id: 'kf-1-5',
        question: 'Hva er den beste tilnærmingen ved møte med en kunde fra en annen kulturbakgrunn?',
        choices: [
          { id: 'a', text: 'Bruke stereotypier om kulturen for å tilpasse seg' },
          { id: 'b', text: 'Vær nysgjerrig, observer, still spørsmål og tilpass deg det du faktisk ser' },
          { id: 'c', text: 'Behandle alle kunder nøyaktig likt uavhengig av kontekst' },
          { id: 'd', text: 'Unngå kulturelle temaer helt' },
        ],
        correctId: 'b',
        explanation: 'Nysgjerrighet og åpenhet er bedre enn stereotypier — kulturelle tendenser er gruppebaserte, ikke individuelle, og du bør alltid se og lytte til det konkrete mennesket foran deg.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📐',
    title: 'Hofstedes kulturdimensjoner',
    quote: 'Du kan ikke forstå andre kulturer uten å forstå din egen.',
    content: 'Geert Hofstede identifiserte systematiske kulturelle dimensjoner som forklarer forskjeller i atferd på tvers av landegrenser. For norske servicearbeidere er maktavstand, individualisme og usikkerhetsunngåelse spesielt relevante.',
    subpoints: [
      { label: 'MAKTAVSTAND', text: 'I norsk service forventer kunder å bli behandlet som likeverdige — overdreven formalitet eller servilitet virker fremmed og kunstig for nordmenn.' },
      { label: 'INDIVIDUALISME', text: 'Norske kunder forventer personlig tilpasset service og å bli sett som individer, ikke som del av en gruppe — tiltal dem alltid direkte.' },
      { label: 'USIKKERHETSUNNGÅELSE', text: 'Kunder fra høy-UAI-kulturer trenger mer struktur og forsikring — gi dem klare prosedyrer, garantier og forutsigbarhet for å skape trygghet.' },
    ],
    practical: 'Bruk Hofstede-modellen som en hypotese, ikke en fasit — kulturdimensjoner beskriver tendenser i grupper, ikke enkeltindividers atferd.',
    glossaryTerm: 'Kulturdimensjoner (Hofstede)',
    exercises: [
      {
        id: 'kf-2-1',
        question: 'Norge scorer svært lavt på Hofstedes maktavstand (PDI). Hva betyr dette i praksis?',
        choices: [
          { id: 'a', text: 'Nordmenn respekterer ikke autoritet' },
          { id: 'b', text: 'Norsk arbeidskultur er flat — fornavn med sjefen er standard og hierarki er usynlig' },
          { id: 'c', text: 'Nordmenn er uformelle av natur' },
          { id: 'd', text: 'Norge har ingen ledere' },
        ],
        correctId: 'b',
        explanation: 'Lav maktavstand betyr at folk aksepterer ujevn maktfordeling i liten grad — i Norge er det naturlig å kalle sjefen ved fornavn og si meningen sin oppover.',
      },
      {
        id: 'kf-2-2',
        question: 'En kunde fra India med høy maktavstand besøker en norsk butikk. Hva kan skape misforståelse?',
        choices: [
          { id: 'a', text: 'At butikken er for stor' },
          { id: 'b', text: 'At den norske servicemedarbeideren er for direkte og uformell — kunden kan forvente mer respektfull formalitet basert på sin kulturbakgrunn' },
          { id: 'c', text: 'At produktene er for dyre' },
          { id: 'd', text: 'Språkbarrierer' },
        ],
        correctId: 'b',
        explanation: 'I kulturer med høy maktavstand forventes mer formell, hierarkibevisst kommunikasjon — norsk uformell direkthet kan oppfattes som mangel på respekt.',
      },
      {
        id: 'kf-2-3',
        question: 'Japan er en kollektivistisk kultur, Norge er individualistisk. Hva er den viktigste praktiske konsekvensen?',
        choices: [
          { id: 'a', text: 'Japanere er snillere enn nordmenn' },
          { id: 'b', text: 'Japanske kunder/kolleger kan vektlegge gruppeharmoni mer enn individuelle synspunkter — og unngå å skille seg ut' },
          { id: 'c', text: 'Nordmenn er mer selvstendige' },
          { id: 'd', text: 'Det er ingen praktisk forskjell' },
        ],
        correctId: 'b',
        explanation: 'I kollektivistiske kulturer er gruppeharmoni viktig — det å skille seg ut, si imot eller vise misnøye direkte kan bryte sosiale normer.',
      },
      {
        id: 'kf-2-4',
        question: 'Hva betyr høy usikkerhetsunngåelse (UAI) for en kundes behov i en servicekontekst?',
        choices: [
          { id: 'a', text: 'Kunden er redd' },
          { id: 'b', text: 'Kunden trenger mer struktur, klare regler og forutsigbarhet for å føle seg trygg' },
          { id: 'c', text: 'Kunden liker ikke norsk service' },
          { id: 'd', text: 'Kunden stiller mange spørsmål' },
        ],
        correctId: 'b',
        explanation: 'Høy UAI betyr at tvetydighet og usikkerhet er ubehagelig — disse kundene settes pris på tydelige garantier, klare prosedyrer og forutsigbar service.',
      },
      {
        id: 'kf-2-5',
        question: 'Hva er den viktigste begrensningen ved å bruke Hofstede-modellen i praksis?',
        choices: [
          { id: 'a', text: 'Den er for gammel' },
          { id: 'b', text: 'Den beskriver tendenser i grupper, ikke enkeltindividers atferd — man bør aldri behandle et individ som stereotyp av sin kultur' },
          { id: 'c', text: 'Den er kun relevant for business' },
          { id: 'd', text: 'Den er for komplisert' },
        ],
        correctId: 'b',
        explanation: 'Kulturdimensjoner er statistiske tendenser i store grupper — en person fra India med lav maktavstand finnes selvsagt. Bruk modellen som utgangspunkt, ikke fasit.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🗣️',
    title: 'Høy- vs lavkontekstkulturer i service',
    quote: 'I lavkontekstkulturer sier man det man mener. I høykontekstkulturer mener man mer enn det man sier.',
    content: 'I lavkontekstkulturer som Norge og Tyskland er kommunikasjon eksplisitt og direkte. I høykontekstkulturer som Japan, Kina og mange arabiske land bærer kontekst, relasjoner og det usagte mye av kommunikasjonsinnholdet. Et «ja» kan bety «jeg hørte deg», og å si «nei» direkte er uhøflig.',
    subpoints: [
      { label: 'NORSK DIREKTEKOMMUNIKASJON', text: 'Norge er en lavkontekstkultur — kunder og kolleger forventer at du sier det du mener, og at de kan gjøre det samme uten å fornærme.' },
      { label: 'IMPLISITTE SIGNALER', text: 'Høykontekstkunder kommuniserer misnøye indirekte: de kan bli stille, virke tilbaketrukket eller gjenta spørsmålet sitt på en ny måte — observer dette.' },
      { label: 'RELASJONSBYGGING', text: 'I høykontekstkulturer er relasjonen grunnlaget for kommunikasjon — å bruke litt tid på smalltalk og personlig anerkjennelse er ikke bortkastet tid, det er nødvendig.' },
    ],
    practical: 'Med kunder fra høykontekstkulturer: spør heller én gang for mye enn én gang for lite, og vær oppmerksom på kroppsspråk og pauser som bærer budskap.',
    exercises: [
      {
        id: 'kf-3-1',
        question: 'Hva kjennetegner lavkontekstkommunikasjon?',
        choices: [
          { id: 'a', text: 'Man bruker mye kontekst og underforståtte budskap' },
          { id: 'b', text: 'Kommunikasjonen er eksplisitt og direkte — det som sies er det som menes' },
          { id: 'c', text: 'Man snakker lavt' },
          { id: 'd', text: 'Man kommuniserer gjennom skrift heller enn tale' },
        ],
        correctId: 'b',
        explanation: 'Lavkontekst betyr at budskapet ligger i ordene — ikke i kontekst, kroppsspråk eller relasjonshistorikk. Norge og Tyskland er typiske lavkontekstkulturer.',
      },
      {
        id: 'kf-3-2',
        question: 'En norsk servicemedarbeider tar «ja» fra en japansk gjest for et ja og går videre. Hva er risikoen?',
        choices: [
          { id: 'a', text: 'Ingenting — ja betyr ja' },
          { id: 'b', text: 'Gjesten kan ha ment noe annet med «ja» (f.eks. «jeg hørte deg») og er nå uhjulpen og misfornøyd' },
          { id: 'c', text: 'Det er alltid riktig å stole på det kunden sier' },
          { id: 'd', text: 'Japanske gjester liker ikke å bli spurt for mye' },
        ],
        correctId: 'b',
        explanation: 'I høykontekstkulturer betyr «ja» ikke alltid «ja» — det kan bety «jeg vil ikke si nei direkte fordi det er uhøflig». Les hele situasjonen, ikke bare ordene.',
      },
      {
        id: 'kf-3-3',
        question: 'Hva er det beste rådet for å serve kunder fra høykontekstkulturer?',
        choices: [
          { id: 'a', text: 'Snakk saktere og tydeligere' },
          { id: 'b', text: 'Spør heller én gang for mye enn én gang for lite, og observer kroppsspråk og pauser' },
          { id: 'c', text: 'Unngå samtale og la dem handle i fred' },
          { id: 'd', text: 'Bruk kun skriftlig kommunikasjon' },
        ],
        correctId: 'b',
        explanation: 'Proaktiv hjelp og oppmerksomhet på ikke-verbale signaler er nøkkelen — høykontekstkunder kommuniserer behov indirekte og forventer at du leser situasjonen.',
      },
      {
        id: 'kf-3-4',
        question: 'Hvorfor er relasjonsbygging viktigere i høykontekstkulturer enn lavkontekstkulturer?',
        choices: [
          { id: 'a', text: 'Fordi de er mer sosiale' },
          { id: 'b', text: 'Fordi kommunikasjon og tillit er relasjonsbasert — uten etablert relasjon er effektiv kommunikasjon vanskelig' },
          { id: 'c', text: 'Fordi de ikke forstår direkte kommunikasjon' },
          { id: 'd', text: 'Det er ikke viktigere' },
        ],
        correctId: 'b',
        explanation: 'I høykontekstkulturer er relasjonen selve kommunikasjonskanalen — tillit og kjennskap til personen er nødvendig for at budskapet skal forstås riktig.',
      },
      {
        id: 'kf-3-5',
        question: 'En norsk leder arbeider med et arabisk partnerselskap og er frustrert over at møtene ikke handler om saken. Hva er forklaringen?',
        choices: [
          { id: 'a', text: 'De arabiske partnerne er uorganiserte' },
          { id: 'b', text: 'Arabisk forretningskultur er høykontekst — relasjonsbygging er en forutsetning for forretning, ikke bortkastet tid' },
          { id: 'c', text: 'Det er språkbarrierer' },
          { id: 'd', text: 'Det er et tegn på at de ikke er interessert' },
        ],
        correctId: 'b',
        explanation: 'I høykontekstkulturer er relasjonen valutaen — du kan ikke hoppe rett til business uten å først investere i tillit og personlig kjennskap.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🤝',
    title: 'Kulturforskjeller i forretningslivet',
    quote: 'Forretningskultur er lokal selv i en global økonomi.',
    content: 'Møtekultur varierer dramatisk på tvers av kulturer. I Norge er møter uformelle og beslutninger tas av hvem som helst i rommet. I Tyskland er møter formelle og forberedelse forventet. I arabisk forretningskultur er relasjoner selve valutaen — mange møter handler om å bygge tillit.',
    subpoints: [
      { label: 'NORSK MØTEKULTUR', text: 'Punkt 08:00 betyr 08:00, alle kan bidra uavhengig av tittel, uenighet er velkomment og beslutninger er åpne for endring hvis nye argumenter dukker opp.' },
      { label: 'TIDSORIENTERING', text: 'Monokrone kulturer (Skandinavia, Germany) håndterer én ting av gangen og respekterer tidsfrister strengt. Polykrone kulturer (Sør-Europa, Midtøsten) håndterer mange ting parallelt og er mer fleksible med tid.' },
      { label: 'RELASJON VS TRANSAKSJON', text: 'Norske forretningsmøter er ofte transaksjonsbaserte (hva er saken, hva er løsningen). Mange kulturer krever relasjonsinvestering før forretningstransaksjon er mulig.' },
    ],
    practical: 'Når du jobber med kolleger eller kunder fra andre kulturer, invester i å lære litt om deres bakgrunn — det viser respekt og gir deg et enormt fortrinn.',
    exercises: [
      {
        id: 'kf-4-1',
        question: 'Hva er en monokron tidsorientering?',
        choices: [
          { id: 'a', text: 'Å alltid komme presis til møter' },
          { id: 'b', text: 'Å håndtere én ting av gangen og respektere tidsfrister strengt' },
          { id: 'c', text: 'Å alltid ha klokke på seg' },
          { id: 'd', text: 'Å jobbe overtid' },
        ],
        correctId: 'b',
        explanation: 'Monokron (én-på-én-gang) tidsorientering er typisk for Skandinavia og Nord-Europa — agendaen følges, møter slutter til angitt tid og frister respekteres.',
      },
      {
        id: 'kf-4-2',
        question: 'En norsk leder er frustrert over at hans brasilianske kolleger håndterer mange saker parallelt i møtet. Hva er forklaringen?',
        choices: [
          { id: 'a', text: 'De er uorganiserte' },
          { id: 'b', text: 'Brasil er en polykron kultur der det er normalt å håndtere flere ting samtidig og ha fleksibel tidsforståelse' },
          { id: 'c', text: 'De respekterer ikke den norske lederen' },
          { id: 'd', text: 'Det er en tilfeldighet' },
        ],
        correctId: 'b',
        explanation: 'Polykrone kulturer håndterer naturlig mange ting parallelt — det er ikke uorganisert, det er en annen og like gyldig arbeidsform.',
      },
      {
        id: 'kf-4-3',
        question: 'Hva menes med at arabisk forretningskultur er «relasjonsbasert»?',
        choices: [
          { id: 'a', text: 'At man er vennlige mot hverandre i møter' },
          { id: 'b', text: 'At personlig tillit og kjennskap er en forutsetning for forretningstransaksjoner — uten relasjonen skjer det ikke business' },
          { id: 'c', text: 'At man bruker mye tid på mat' },
          { id: 'd', text: 'At man alltid introduserer seg' },
        ],
        correctId: 'b',
        explanation: 'I relasjonsbaserte kulturer er tillit og personlig kjennskap grunnlaget for all forretningsvirksomhet — transaksjonene følger naturlig av relasjonen, ikke omvendt.',
      },
      {
        id: 'kf-4-4',
        question: 'Reitangruppen har møtt utfordringer i sin internasjonale ekspansjon. Hva er den sannsynlige årsaken?',
        choices: [
          { id: 'a', text: 'Produktene er ikke gode nok internasjonalt' },
          { id: 'b', text: 'Norsk ledelsesstil med flat hierarki fungerer ikke alltid i markeder med høyere maktavstand' },
          { id: 'c', text: 'Norsk mat er ikke populær i andre land' },
          { id: 'd', text: 'Rema 1000 er for dyr i utlandet' },
        ],
        correctId: 'b',
        explanation: 'Norsk flat, uformell ledelsesstil kan oppfattes som mangel på autoritet og respekt i kulturer der hierarki og formalitet er forventet.',
      },
      {
        id: 'kf-4-5',
        question: 'Hva er det viktigste du kan gjøre når du skal samarbeide med en kollega fra en annen kultur?',
        choices: [
          { id: 'a', text: 'Behandle dem akkurat som norske kolleger' },
          { id: 'b', text: 'Investere tid i å lære om deres kulturbakgrunn — det viser respekt og gir deg et fortrinn' },
          { id: 'c', text: 'Unngå kulturelle temaer for å unngå misforståelser' },
          { id: 'd', text: 'Bruke engelsk alltid' },
        ],
        correctId: 'b',
        explanation: 'Nysgjerrighet og investering i forståelse er det mest respektfulle og praktisk nyttige — folk setter pris på at andre bryr seg om å forstå dem.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🌈',
    title: 'Inkludering og mangfold på arbeidsplassen',
    quote: 'Mangfold er å bli invitert til festen. Inkludering er å bli bedt om å danse.',
    content: 'Mangfold på arbeidsplassen er ikke bare et moralsk imperativ — det er en solid forretningsstrategi. McKinseys forskning viser at bedrifter i det øverste kvartil for etnisk mangfold er 35% mer sannsynlige til å ha over gjennomsnittet finansiell avkastning.',
    subpoints: [
      { label: 'FORRETNINGSCASEN', text: 'Mangfoldige team presterer bedre på innovasjon og problemløsning fordi de unngår groupthink og bringer inn perspektiver flertallet ikke ser.' },
      { label: 'UBEVISST BIAS', text: 'Vi alle har ubevisste fordommer som påvirker hvem vi ansetter, forfremmer og lytter til — bevissthet om bias er første steg mot å motvirke det.' },
      { label: 'PSYKOLOGISK TRYGGHET', text: 'Ekte inkludering krever at alle kan si sin mening uten frykt for latterliggjøring — forskning av Amy Edmondson viser at dette er den viktigste faktoren for teamprestasjoner.' },
    ],
    practical: 'Tenk over om alle stemmer i teamet ditt virkelig blir hørt i møter og beslutningsprosesser — de stileste stemmene har ofte de viktigste perspektivene.',
    exercises: [
      {
        id: 'kf-5-1',
        question: 'Hva sier McKinseys forskning om bedrifter med høyt etnisk mangfold?',
        choices: [
          { id: 'a', text: 'De har mer intern konflikt' },
          { id: 'b', text: 'De er 35% mer sannsynlige til å ha over gjennomsnittet finansiell avkastning' },
          { id: 'c', text: 'De har lavere produktivitet' },
          { id: 'd', text: 'De er vanskeligere å lede' },
        ],
        correctId: 'b',
        explanation: 'McKinseys forskning dokumenterer en klar sammenheng mellom etnisk mangfold og finansiell prestasjon — mangfold er god forretning, ikke bare god moral.',
      },
      {
        id: 'kf-5-2',
        question: 'Hva er forskjellen mellom mangfold og inkludering?',
        choices: [
          { id: 'a', text: 'Det er det samme' },
          { id: 'b', text: 'Mangfold er å ha folk med ulik bakgrunn tilstede; inkludering er å sikre at alle faktisk bidrar og hører til' },
          { id: 'c', text: 'Mangfold handler om kjønn, inkludering om etnisitet' },
          { id: 'd', text: 'Inkludering er et strengere krav' },
        ],
        correctId: 'b',
        explanation: 'Mangfold er komposisjon (hvem er i rommet). Inkludering er kultur (hvem har faktisk en stemme og føler seg som en del av laget).',
      },
      {
        id: 'kf-5-3',
        question: 'Hva er ubevisst bias?',
        choices: [
          { id: 'a', text: 'Bevisste fordommer man er klar over' },
          { id: 'b', text: 'Automatiske fordommer som påvirker vurderinger uten at man er klar over det' },
          { id: 'c', text: 'Kulturelle misforståelser' },
          { id: 'd', text: 'Diskriminering' },
        ],
        correctId: 'b',
        explanation: 'Ubevisst bias er automatiske, ubevisste antakelser som påvirker hvem vi ansetter, lytter til og forfremmer — alle har det, og bevissthet er første steg mot å motvirke det.',
      },
      {
        id: 'kf-5-4',
        question: 'Hva er forskjellen mellom likebehandling og likestilling?',
        choices: [
          { id: 'a', text: 'Det er det samme' },
          { id: 'b', text: 'Likebehandling gir alle de samme mulighetene; likestilling gir alle de verktøyene de faktisk trenger for å lykkes' },
          { id: 'c', text: 'Likestilling handler kun om kjønn' },
          { id: 'd', text: 'Likebehandling er lovkrav, likestilling er valgfritt' },
        ],
        correctId: 'b',
        explanation: 'Å gi alle «de samme mulighetene» kan opprettholde ulikhet hvis noen startet med ulike forutsetninger — ekte inkludering krever å gi alle det de trenger for å lykkes på lik linje.',
      },
      {
        id: 'kf-5-5',
        question: 'Hva er groupthink og hvorfor er mangfold en motgift?',
        choices: [
          { id: 'a', text: 'Groupthink er å bruke gruppearbeid — mangfold gjør grupper mer effektive' },
          { id: 'b', text: 'Groupthink er fenomenet der grupper konvergerer mot enhet og unngår dissens — mangfoldige perspektiver utfordrer dette og gir bedre beslutninger' },
          { id: 'c', text: 'Groupthink er kun et problem i store bedrifter' },
          { id: 'd', text: 'Det er ingen kobling mellom mangfold og groupthink' },
        ],
        correctId: 'b',
        explanation: 'Groupthink skjer når grupper med lik bakgrunn unnlater å utfordre hverandre — mangfoldige perspektiver bryter opp dette mønsteret og gir mer kreativ problemløsning.',
      },
    ],
  },
]

export default function KulturforstaelseModule() {
  return (
    <DrawerModule
      moduleCode="KS3"
      moduleTitle="Kulturforståelse og mangfold"
      moduleIcon="🌍"
      storageKey="learning-kultur-kulturforstaelse"
      completeRoute="/learning/kultur/kulturforstaelse/complete"
      phases={PHASES}
      intro="Norsk næringsliv er mer internasjonalt enn noen gang — vi selger til turister fra hele verden, vi har kolleger med røtter fra dusinvis av land, og norske bedrifter opererer i markeder med fundamentalt andre kulturelle premisser. Kulturforståelse er ikke politisk korrekthet, det er en praktisk kompetanse som gjør deg til en bedre medarbeider, leder og serviceyter."
      vissteduAt="Norge er konsekvent rangert blant verdens laveste på Hofstedes maktavstandsindeks, noe som gjør norsk arbeidslivkultur ekstremt unik globalt. Det som oppfattes som respektfull direkthet og likhet i Norge kan oppfattes som mangel på respekt for autoritet i mange andre kulturer — noe som overrasker mange nordmenn på sin første internasjonale arbeidsplass."
      espenSier="Kulturforståelse er en av de ferdighetene jeg ser gjøre størst forskjell for unge mennesker som vil bygge en karriere i norsk næringsliv. Norge er genuint mangfoldig, og bedriftene som lykkes best er de som gjør mangfold til en styrke snarere enn en komplikasjon. Start med nysgjerrighet — det er den beste kulturdimensjonen du kan utvikle."
      presentationLink={{ route: '/learning/presentations/relasjonsbygging', description: 'Relasjonsbygging — en visuell gjennomgang av nettverk og B2B' }}
    />
  )
}
