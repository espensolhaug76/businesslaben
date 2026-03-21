import DrawerModule from '../../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🌐',
    title: 'Globaliseringens drivkrefter',
    quote: 'Globalisering er ikke en politisk ideologi — det er et sett av teknologiske og økonomiske krefter som forandrer hva som er mulig.',
    content: 'Globaliseringen drives av teknologi (internett, containerfrakt), handelsliberalisering (WTO, EØS) og kapitalflyt. COVID-19 avdekket sårbarhet i globale forsyningskjeder. Ny trend: «friendshoring» og «nearshoring». Jotun maling er et norsk eksempel på vellykket globalisering.',
    subpoints: [
      'TEKNOLOGI: Internett har gjort det mulig å eksportere digitale tjenester fra Tromsø til Tokyo',
      'DEGLOBALISERING: Etter 2020 prioriterer mange kortere, mer robuste forsyningskjeder over laveste kostnad',
      'JOTUN: Fra Sandefjord i 1926 til blant verdens største malingsselskaper — gradvis, markedsbasert internasjonalisering',
    ],
    practical: 'Velg et norsk produkt du bruker i hverdagen og spor så mange ledd i forsyningskjeden du kan — du vil bli overrasket over hvor mange land som er involvert.',
    exercises: [
      {
        id: 'im-1-1',
        question: 'Hva er de tre hoveddrivkreftene bak globaliseringen?',
        choices: [
          { id: 'a', text: 'Krig, migrasjon og klimaendringer' },
          { id: 'b', text: 'Teknologi, handelsliberalisering og kapitalflyt' },
          { id: 'c', text: 'Demokrati, kapitalisme og imperialisme' },
          { id: 'd', text: 'Språk, kultur og religion' },
        ],
        correctId: 'b',
        explanation: 'De tre hoveddrivkreftene er teknologi (internett, containerfrakt), handelsliberalisering (WTO, EØS-avtaler) og fri kapitalflyt over landegrenser.',
      },
      {
        id: 'im-1-2',
        question: 'Hva avdekket COVID-19-pandemien om globale forsyningskjeder?',
        choices: [
          { id: 'a', text: 'At globaliseringen ikke hadde noen negativ sider' },
          { id: 'b', text: 'Sårbarhet — mangel på smittevernutstyr, halvledermangel og logistikkkollaps' },
          { id: 'c', text: 'At norske bedrifter var best forberedt' },
          { id: 'd', text: 'At Asia produserer alle nødvendige varer' },
        ],
        correctId: 'b',
        explanation: 'Pandemien avdekket massiv sårbarhet: mangel på smittevernutstyr, halvledermangel som lammet bilindustrien, og logistikkkollaps i havner globalt.',
      },
      {
        id: 'im-1-3',
        question: 'Hva er «friendshoring»?',
        choices: [
          { id: 'a', text: 'Å ansette venner i ledende stillinger' },
          { id: 'b', text: 'Å flytte produksjon til politisk allierte land for å redusere risiko' },
          { id: 'c', text: 'En norsk strategi for å hjelpe utviklingsland' },
          { id: 'd', text: 'En nettverksplattform for internasjonale forretninger' },
        ],
        correctId: 'b',
        explanation: 'Friendshoring betyr å flytte produksjon og forsyningskjeder til politisk allierte land — en respons på geopolitisk risiko, som f.eks. Kina–USA-spenningene.',
      },
      {
        id: 'im-1-4',
        question: 'Hva gjør containerfrakt til en viktig driver for globalisering?',
        choices: [
          { id: 'a', text: 'Det er den eneste måten å frakte varer over havet' },
          { id: 'b', text: 'Det har dramatisk redusert kostnaden ved å frakte varer mellom land' },
          { id: 'c', text: 'Det eliminerer all tollavgift' },
          { id: 'd', text: 'Det er raskere enn luftfrakt' },
        ],
        correctId: 'b',
        explanation: 'Standardiserte containere har dramatisk redusert kostnadene ved sjøfrakt — å sende en container fra Kina til Europa koster noen tusen kroner, noe som muliggjør global varehandel.',
      },
      {
        id: 'im-1-5',
        question: 'Hva kjennetegner Jotuns internasjonaliseringsstrategi?',
        choices: [
          { id: 'a', text: 'Rask ekspansjon til alle markeder samtidig via oppkjøp' },
          { id: 'b', text: 'Gradvis, markedsbasert internasjonalisering over 100 år med lokal tilpasning' },
          { id: 'c', text: 'Kun eksport, ingen lokal produksjon utenfor Norge' },
          { id: 'd', text: 'Fokus utelukkende på Europa' },
        ],
        correctId: 'b',
        explanation: 'Jotun er et eksempel på gradvis internasjonalisering — startet med skipsmaling i Sandefjord i 1926 og ekspanderte over tid til produksjon og salg i over 100 land med sterk lokal tilpasning.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📈',
    title: 'Internasjonaliseringsstrategier',
    quote: 'Et selskap som vil inn i et nytt marked må bestemme: hvor mye kontroll vil vi ha, og hvor mye risiko kan vi bære?',
    content: 'Strategier rangert etter økt forpliktelse og risiko: eksport (lavest), lisensiering, franchising, joint venture, heleid datterselskap (høyest kontroll/risiko). Uppsala-modellen: start med kulturelt nære markeder, beveg deg gradvis mot fjernere.',
    subpoints: [
      'EKSPORT: Lavest risiko, lavest kontroll — egnet for testing av utenlandsk etterspørsel',
      'JOINT VENTURE: Partnere med lokal kompetanse åpner dører — men krever grundig due diligence',
      'UPPSALA-MODELLEN: Kulturell og geografisk nærhet reduserer læringskostnadene',
    ],
    practical: 'Velg en norsk bedrift og undersøk hvilke internasjonaliseringsstrategier de bruker i ulike land — de fleste store norske selskaper bruker en portefølje av strategier simultaneously.',
    glossaryTerm: 'Internasjonalisering',
    exercises: [
      {
        id: 'im-2-1',
        question: 'Hvilken internasjonaliseringsstrategi gir størst kontroll, men høyest risiko?',
        choices: [
          { id: 'a', text: 'Eksport' },
          { id: 'b', text: 'Lisensiering' },
          { id: 'c', text: 'Franchising' },
          { id: 'd', text: 'Heleid datterselskap' },
        ],
        correctId: 'd',
        explanation: 'Et heleid datterselskap (wholly owned subsidiary) gir full kontroll — men krever full kapitalinvestering, og man bærer all risiko selv.',
      },
      {
        id: 'im-2-2',
        question: 'Hva er lisensiering som internasjonaliseringsstrategi?',
        choices: [
          { id: 'a', text: 'Å søke om tillatelse fra myndighetene til å eksportere' },
          { id: 'b', text: 'Å la et utenlandsk selskap bruke din teknologi eller merkevare mot royalties' },
          { id: 'c', text: 'Å kjøpe opp et utenlandsk selskap' },
          { id: 'd', text: 'Å samarbeide med et lokalt selskap om eierskap' },
        ],
        correctId: 'b',
        explanation: 'Lisensiering innebærer at et utenlandsk selskap får rett til å bruke din teknologi, patent eller merkevare mot betaling av royalties — passiv inntekt, men begrenset kontroll.',
      },
      {
        id: 'im-2-3',
        question: 'Hva sier Uppsala-modellen om internasjonaliseringsprosessen?',
        choices: [
          { id: 'a', text: 'Bedrifter bør starte med de største og mest lønnsomme markedene' },
          { id: 'b', text: 'Bedrifter starter vanligvis med kulturelt og geografisk nære markeder og beveger seg gradvis utover' },
          { id: 'c', text: 'Alle markeder er like krevende' },
          { id: 'd', text: 'Internasjonalisering bør alltid skje gjennom oppkjøp' },
        ],
        correctId: 'b',
        explanation: 'Uppsala-modellen beskriver en empirisk tendens: bedrifter starter med nære markeder (Norge → Sverige → Danmark → Nederland) og ekspanderer gradvis til fjernere markeder etter hvert som de bygger kompetanse.',
      },
      {
        id: 'im-2-4',
        question: 'Hva er fordelen med joint venture fremfor heleid datterselskap?',
        choices: [
          { id: 'a', text: 'Mer kontroll og høyere fortjeneste' },
          { id: 'b', text: 'Tilgang til lokal partners kompetanse og nettverk, delt risiko' },
          { id: 'c', text: 'Ingen juridiske komplikasjoner' },
          { id: 'd', text: 'Billigere å etablere alltid' },
        ],
        correctId: 'b',
        explanation: 'I et joint venture deler man risiko og kapital, og man får tilgang til den lokale partnerens markedskunnskap, nettverk og distribusjon — noe som kan være avgjørende i ukjente markeder.',
      },
      {
        id: 'im-2-5',
        question: 'Orkla bruker eksport til Sverige og lisensiering i Baltikum. Hva kalles dette?',
        choices: [
          { id: 'a', text: 'Inkonsistent strategi' },
          { id: 'b', text: 'En portefølje av internasjonaliseringsstrategier tilpasset ulike markeder' },
          { id: 'c', text: 'Multinasjonal strategi' },
          { id: 'd', text: 'Uppsala-paradokset' },
        ],
        correctId: 'b',
        explanation: 'Store norske selskaper bruker som regel en portefølje av ulike internasjonaliseringsstrategier tilpasset hvert markeds karakteristikker — det er god og pragmatisk praksis.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🗺️',
    title: 'Kulturelle barrierer i internasjonal handel',
    quote: 'Å lære et marked å kjenne er ikke å lese en rapport om det — det er å forstå hva folk der bryr seg om.',
    content: 'CAGE-rammeverket (Ghemawat) strukturerer avstandsvurderingen langs fire dimensjoner: Cultural (religion, verdier), Administrative (handelshindre), Geographic (fysisk avstand), Economic (inntektsforskjeller). Ikea-eksempelet viser at antagelsen om at det som fungerer hjemme fungerer alle steder er en av de vanligste feilene.',
    subpoints: [
      'CAGE-RAMMEVERKET: Store scorer på alle fire aksene er et advarselstegn om at markedet er krevende',
      'IKEA: Produkter som var for smale for amerikanske sengetøy og glass for små for is — klassisk kultursvikt',
      'RELASJONSBYGGING: I mange markeder er personlig tillit en forutsetning for forretninger',
    ],
    practical: 'Velg ett land du er nysgjerrig på å gjøre forretninger i og lag en CAGE-analyse sammenlignet med Norge — det vil raskt avdekke de viktigste utfordringene.',
    exercises: [
      {
        id: 'im-3-1',
        question: 'Hva står CAGE for i CAGE-rammeverket?',
        choices: [
          { id: 'a', text: 'Cost, Access, Growth, Earnings' },
          { id: 'b', text: 'Cultural, Administrative, Geographic, Economic' },
          { id: 'c', text: 'Competition, Advantage, Geography, Exports' },
          { id: 'd', text: 'Consumer, Attitude, Government, Entry' },
        ],
        correctId: 'b',
        explanation: 'CAGE (Pankaj Ghemawat) står for Cultural (religion, verdier, normer), Administrative (handelshindre, valuta), Geographic (fysisk avstand) og Economic (inntektsforskjeller, forbrukermønstre).',
      },
      {
        id: 'im-3-2',
        question: 'Hva lærte Ikea da de gikk inn i USA-markedet?',
        choices: [
          { id: 'a', text: 'At møbelmarkedet er mettet i USA' },
          { id: 'b', text: 'At sengene var for smale for amerikanske sengetøy og glass for små for isfylte drikker' },
          { id: 'c', text: 'At amerikanere foretrekker flat-pack møbler' },
          { id: 'd', text: 'At prisen var for høy for det amerikanske markedet' },
        ],
        correctId: 'b',
        explanation: 'Ikeas senger var for smale for amerikanske sengetøystørrelser, og glassvarene var for små for amerikanernes is-fylt-glass-kultur — klassisk eksempel på å anta at det hjemlige fungerer globalt.',
      },
      {
        id: 'im-3-3',
        question: 'Hva kjennetegner relasjonsbygging i mange Midtøsten- og asiatiske markeder?',
        choices: [
          { id: 'a', text: 'Forhandlinger kan starte umiddelbart ved første møte' },
          { id: 'b', text: 'Personlig tillit må bygges over uker eller måneder før forretningsmessige diskusjoner' },
          { id: 'c', text: 'Digitale kommunikasjonsplattformer erstatter personlige møter' },
          { id: 'd', text: 'Prisforhandlinger er viktigere enn relasjoner' },
        ],
        correctId: 'b',
        explanation: 'I mange markeder — spesielt i Asia, Midtøsten og Latin-Amerika — er personlig tillit en forutsetning for forretninger. Å hoppe over relasjonsbyggingsfasen er en kostbar feil.',
      },
      {
        id: 'im-3-4',
        question: 'Hvorfor er kulturelle barrierer ofte mer utfordrende enn tekniske hindringer?',
        choices: [
          { id: 'a', text: 'Fordi de er dyrere å overkomme' },
          { id: 'b', text: 'Fordi de er usynlige — man oppdager dem ikke alltid før man har tredd i fellen' },
          { id: 'c', text: 'Fordi myndighetene ikke tillater kulturell tilpasning' },
          { id: 'd', text: 'Fordi tekniske hindringer enkelt fjernes av WTO' },
        ],
        correctId: 'b',
        explanation: 'Kulturelle barrierer er usynlige — en tollsats ser du på et skjema, men en kulturell misforståelse oppdager du ofte ikke før du har skadet en relasjon.',
      },
      {
        id: 'im-3-5',
        question: 'Hva betyr lav CAGE-score mellom to land?',
        choices: [
          { id: 'a', text: 'Det er høy risiko å gjøre forretninger mellom landene' },
          { id: 'b', text: 'Landene er like nok til at handel er relativt lettere' },
          { id: 'c', text: 'Det er ingen handelsavtaler mellom landene' },
          { id: 'd', text: 'Landene konkurrerer om de samme produktene' },
        ],
        correctId: 'b',
        explanation: 'Lav CAGE-score betyr at landene er nære hverandre — kulturelt, administrativt, geografisk og/eller økonomisk. Det betyr at handel er relativt lettere og billigere å etablere.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💱',
    title: 'Valutarisiko og handelsbarrierer',
    quote: 'En norsk eksportør som selger i euro men har kostnader i kroner, driver ikke bare en bedrift — de driver en valutaspekulasjon uten å vite om det.',
    content: 'Valutarisiko: lakseoppdretteres kostnader i NOK, inntekter i EUR. Løsninger: terminkontrakter, valutakontoer. Handelsbarrierer: ikke bare tariffer, men tekniske standarder (CE-merking), sanitære krav og kvoter. Brexit økte kostnadene for norsk lakseeksport til UK med ca. 20 %.',
    subpoints: [
      'TERMINKONTRAKTER: Låser valutakursen for fremtidige transaksjoner — gir forutsigbarhet',
      'BREXIT: Norske eksportører møtte plutselig tollskranker de ikke hadde erfaring med',
      'TEKNISKE HANDELSHINDRE: CE-merking, REACH-kjemikalier og GDPR er alle reelle kostnader',
    ],
    practical: 'Se på en norsk eksportbedrifts årsrapport og finn om de rapporterer valutaeksponering og hedgingstrategi — det sier mye om modenheten i risikostyringen.',
    exercises: [
      {
        id: 'im-4-1',
        question: 'Hva er valutarisiko for en norsk eksportbedrift?',
        choices: [
          { id: 'a', text: 'Risikoen for at valuta blir avskaffet' },
          { id: 'b', text: 'Risikoen for at endringer i valutakursen påvirker lønnsomheten negativt' },
          { id: 'c', text: 'Risikoen for at utenlandske kunder ikke betaler' },
          { id: 'd', text: 'Risikoen for valutaforfalskning' },
        ],
        correctId: 'b',
        explanation: 'Valutarisiko oppstår når inntekter og kostnader er i ulike valutaer. Hvis kronen styrker seg, får eksportøren mindre norske kroner for sine utenlandske inntekter.',
      },
      {
        id: 'im-4-2',
        question: 'Hva er en terminkontrakt (forward contract) i valutasikring?',
        choices: [
          { id: 'a', text: 'En kontrakt om å levere varer på et fremtidig tidspunkt' },
          { id: 'b', text: 'En avtale om å kjøpe eller selge valuta til en bestemt kurs på en fremtidig dato' },
          { id: 'c', text: 'En langsiktig arbeidskontrakt for internasjonale ansatte' },
          { id: 'd', text: 'En forsikringsordning mot handelstvister' },
        ],
        correctId: 'b',
        explanation: 'En terminkontrakt låser en fremtidig valutakurs — eksportøren vet nøyaktig hva de får i norske kroner for fremtidige euro-inntekter, uavhengig av kurssvingninger.',
      },
      {
        id: 'im-4-3',
        question: 'Hva er tekniske handelshindre?',
        choices: [
          { id: 'a', text: 'Problemer med it-systemer i tollbehandling' },
          { id: 'b', text: 'Krav som CE-merking, produktstandarder og sanitære krav som øker kostnadene for eksportører' },
          { id: 'c', text: 'Mangel på havnekapasitet i mottakerlandet' },
          { id: 'd', text: 'Teknologisk etterslep i norsk industri' },
        ],
        correctId: 'b',
        explanation: 'Tekniske handelshindre er ikke-tariffer-baserte barrierer: CE-merking for EU-markedet, FDA-godkjenning for USA, REACH-kjemikalieregelverk — alle øker kostnadene for eksportører.',
      },
      {
        id: 'im-4-4',
        question: 'Hva ble konsekvensen av Brexit for norsk lakseeksport til Storbritannia?',
        choices: [
          { id: 'a', text: 'Eksporten stoppet helt' },
          { id: 'b', text: 'Økte kostnader på ca. 20 % på grunn av tollbehandling og veterinærattester' },
          { id: 'c', text: 'Eksporten økte fordi britene trengte mer mat' },
          { id: 'd', text: 'Ingen konsekvenser — Storbritannia er utenfor EØS' },
        ],
        correctId: 'b',
        explanation: 'Brexit skapte nye tollgrenser, veterinærattester og forsinkelser ved grensen som økte kostnadene for norsk lakseeksport til UK med anslagsvis 20 %.',
      },
      {
        id: 'im-4-5',
        question: 'Hva er WTOs funksjon i internasjonal handel?',
        choices: [
          { id: 'a', text: 'Å fastsette alle globale valutakurser' },
          { id: 'b', text: 'Å gi forum for handelsforhandlinger og tvisteløsning mellom land' },
          { id: 'c', text: 'Å kontrollere alle tollavgifter direkte' },
          { id: 'd', text: 'Å drive internasjonal shipping og logistikk' },
        ],
        correctId: 'b',
        explanation: 'WTO gir et multilateralt forum for handelsforhandlinger, fastsetter MFN-prinsippet (like tollsatser til alle) og har en tvisteløsningsmekanisme for handelskonflikter.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🏛️',
    title: 'WTO, EØS og norske eksportmuligheter',
    quote: 'Norges EØS-avtale er en av de mest verdifulle bilaterale avtalene i verden — og de fleste nordmenn vet ikke hva den innebærer.',
    content: 'EØS-avtalen (1994) gir Norge tilgang til EUs indre marked uten EU-medlemskap. Norske bedrifter konkurrerer på like vilkår med europeiske bedrifter i 27 EU-land. Oljefondet er over 20 000 milliarder kroner investert globalt — Norges internasjonale finansielle fotavtrykk er enormt.',
    subpoints: [
      'EØS-TILGANG: Norske bedrifter kan selge i EU uten tollavgifter — en fordel mange ganger mer verdt enn EØS-midlene',
      'MFN-PRINSIPPET: WTOs Most Favoured Nation betyr at handelsfordeler gjelder alle WTO-land',
      'OLJEFONDET: Med 1,8 % eierskap i alle børsnoterte selskaper er Norge verdens største kapitaleksportør per innbygger',
    ],
    practical: 'Gå til regjeringen.no og les ett avsnitt om EØS-avtalen — det er en del av den norske samfunnskontrakten som enhver næringslivskandidat bør kjenne til.',
    exercises: [
      {
        id: 'im-5-1',
        question: 'Hva gir EØS-avtalen norske bedrifter?',
        choices: [
          { id: 'a', text: 'Stemmerett i EU-parlamentet' },
          { id: 'b', text: 'Tilgang til EUs indre marked på samme vilkår som EU-bedrifter' },
          { id: 'c', text: 'Fritak fra alle europeiske miljøregler' },
          { id: 'd', text: 'Rett til å bruke euro som valuta' },
        ],
        correctId: 'b',
        explanation: 'EØS-avtalen gir Norge, Island og Liechtenstein tilgang til EUs indre marked — norske bedrifter kan selge i alle 27 EU-land på de samme vilkårene som tyske og franske bedrifter.',
      },
      {
        id: 'im-5-2',
        question: 'Hva er MFN-prinsippet i WTO?',
        choices: [
          { id: 'a', text: 'Miljøvennlige varer får reduserte tollsatser' },
          { id: 'b', text: 'Handelsfordeler gitt til ett land gjelder automatisk alle WTO-medlemmer' },
          { id: 'c', text: 'Multinasjonale selskaper har særlige rettigheter' },
          { id: 'd', text: 'Fattige land er fritatt fra alle tollsatser' },
        ],
        correctId: 'b',
        explanation: 'MFN (Most Favoured Nation) betyr at hvis ett WTO-land gir et annet reduserte tollsatser, gjelder de samme satsene automatisk for alle andre WTO-medlemmer.',
      },
      {
        id: 'im-5-3',
        question: 'Hva er unntaket fra EØS-integrasjonen av betydning for Norge?',
        choices: [
          { id: 'a', text: 'Oljeindustrien er ikke med' },
          { id: 'b', text: 'Fiskerisektoren er ikke fullt integrert i EUs indre marked' },
          { id: 'c', text: 'Finanstjenester er unntatt' },
          { id: 'd', text: 'Teknologiselskaper er ikke dekket' },
        ],
        correctId: 'b',
        explanation: 'Fiskerisektoren er det viktigste unntaket fra EØS-integrasjonen — norsk sjømateksport møter fortsatt tollavgifter i EU, noe som er et vedvarende spenningspunkt.',
      },
      {
        id: 'im-5-4',
        question: 'Hva er Norges ekspportandel av BNP, og hva forteller det?',
        choices: [
          { id: 'a', text: 'Ca. 10 % — Norge er lite eksponert for globale markeder' },
          { id: 'b', text: 'Ca. 40 % — norsk velstand er fundamentalt avhengig av åpne internasjonale markeder' },
          { id: 'c', text: 'Ca. 70 % — Norge er verdens mest eksportorienterte land' },
          { id: 'd', text: 'Ca. 25 % — tilsvarende gjennomsnittet for vestlige land' },
        ],
        correctId: 'b',
        explanation: 'Eksporten utgjør ca. 40 % av norsk BNP — til sammenligning er USA på 12 %. Dette betyr at norsk velstand er fundamentalt avhengig av åpne internasjonale markeder.',
      },
      {
        id: 'im-5-5',
        question: 'Hvorfor er det viktig for norske SMB-er å forstå internasjonale markeder?',
        choices: [
          { id: 'a', text: 'Kun store bedrifter trenger internasjonal kunnskap' },
          { id: 'b', text: 'Fordi de allerede er i internasjonale markeder — utenlandske konkurrenter er i det norske markedet' },
          { id: 'c', text: 'For å søke om EU-midler' },
          { id: 'd', text: 'Fordi norsk lov krever internasjonal ekspansjon' },
        ],
        correctId: 'b',
        explanation: 'Norske SMB-er er allerede i internasjonale markeder om de vet om det eller ikke — konkurrenter fra kontinentet er aktive i Norge. Spørsmålet er om internasjonalisering skjer bevisst eller reaktivt.',
      },
    ],
  },
];

export default function InternasjonaleMarkederModule() {
  return (
    <DrawerModule
      moduleCode="KK-VG2-4"
      moduleTitle="Internasjonale markeder"
      moduleIcon="🌐"
      storageKey="learning-vg2-internasjonale-markeder"
      completeRoute="/learning/vg2/kultur/internasjonale-markeder/complete"
      phases={phases}
      intro="Norsk næringsliv er blant verdens mest internasjonaliserte, relativt til landets størrelse. Fra laks og aluminium til skipsfart og programvare — norske bedrifter opererer i globale markeder."
      vissteduAt="Norge er et av verdens mest handelsorienterte land målt som andel av BNP — eksporten utgjør rundt 40 % av brutto nasjonalproduktet. Til sammenligning er USA rundt 12 %."
      espenSier="Jeg sier alltid det samme til norske SMB-er som er nølende til internasjonal ekspansjon: dere er allerede i internasjonale markeder, enten dere vet om det eller ikke — konkurrentene fra kontinentet er allerede i det norske markedet ditt."
      presentationLink={{ route: '/learning/presentations/relasjonsbygging', description: 'Relasjonsbygging — en visuell gjennomgang av interkulturell kommunikasjon' }}
    />
  );
}
