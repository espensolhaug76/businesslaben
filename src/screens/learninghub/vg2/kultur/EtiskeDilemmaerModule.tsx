import DrawerModule from '../../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Etiske teorier — konsekvensetikk vs pliktetikk',
    quote: 'Det er ikke nok å gjøre det rette — vi må gjøre det rette av riktige grunner. — Immanuel Kant',
    content: 'Konsekvensetikk (utilitarisme) sier at den rette handlingen er den som gir best konsekvenser for flest mulig. Pliktetikk (deontologi, Kant) sier at noen handlinger er iboende rette eller gale uavhengig av konsekvensene. I praksis tar gode ledere hensyn til begge tilnærmingene.',
    subpoints: [
      'KONSEKVENSETIKK: Spørsmålet er alltid «Hvilken handling gir best utfall totalt sett?»',
      'PLIKTETIKK: Noen handlinger er gale uansett konsekvenser — å lyve er galt selv om det ikke oppdages',
      'I PRAKSIS: De fleste ledere ser etter løsninger som er både prinsipielt forsvarlige og gir gode resultater',
    ],
    practical: 'Neste gang du står overfor et etisk valg, still deg to spørsmål: «Hvilken handling gir best konsekvenser?» og «Hvilken handling er prinsipielt riktig?» — hvis svaret er ulikt, har du et ekte dilemma.',
    exercises: [
      {
        id: 'ed-1-1',
        question: 'Hva er kjernen i konsekvensetikk (utilitarisme)?',
        choices: [
          { id: 'a', text: 'Den rette handlingen er den som følger fastlagte regler' },
          { id: 'b', text: 'Den rette handlingen er den som produserer best konsekvenser for flest mulig' },
          { id: 'c', text: 'Den rette handlingen er den som gagner deg selv' },
          { id: 'd', text: 'Alle handlinger er like riktige' },
        ],
        correctId: 'b',
        explanation: 'Konsekvensetikk (utilitarisme, fra Bentham og Mill) sier at den moralsk rette handlingen er den som maksimerer nytten — best mulige konsekvenser for flest mulige mennesker.',
      },
      {
        id: 'ed-1-2',
        question: 'Hva er den grunnleggende forskjellen mellom pliktetikk og konsekvensetikk?',
        choices: [
          { id: 'a', text: 'Pliktetikk fokuserer på konsekvenser; konsekvensetikk på regler' },
          { id: 'b', text: 'Pliktetikk sier at noen handlinger er iboende riktige/gale; konsekvensetikk vurderer utfallet' },
          { id: 'c', text: 'De er i praksis identiske' },
          { id: 'd', text: 'Pliktetikk er religiøs; konsekvensetikk er sekulær' },
        ],
        correctId: 'b',
        explanation: 'Pliktetikk (Kant) sier at noen handlinger er iboende riktige eller gale — uavhengig av konsekvensene. Konsekvensetikk vurderer utelukkende utfallet av handlingen.',
      },
      {
        id: 'ed-1-3',
        question: 'Et selskap oppdager barnearbeid hos leverandøren. Konsekvensetikeren vil vurdere...',
        choices: [
          { id: 'a', text: 'Om det er juridisk forbudt' },
          { id: 'b', text: 'Om offentliggjøring eller intern reform gir best totalutfall' },
          { id: 'c', text: 'Om det er en absolutt plikt til åpenhet uansett konsekvenser' },
          { id: 'd', text: 'Hva konkurrentene gjør' },
        ],
        correctId: 'b',
        explanation: 'En konsekvensetiker vurderer hvilken handling som gir best utfall — kanskje stille reform skaper bedre resultater enn offentliggjøring som kan ødelegge arbeidsplasser.',
      },
      {
        id: 'ed-1-4',
        question: 'Hvem er mest kjent for å ha utviklet pliktetikken (deontologien)?',
        choices: [
          { id: 'a', text: 'Jeremy Bentham' },
          { id: 'b', text: 'John Stuart Mill' },
          { id: 'c', text: 'Immanuel Kant' },
          { id: 'd', text: 'Aristoteles' },
        ],
        correctId: 'c',
        explanation: 'Immanuel Kant er den mest kjente deontologiske etikeren — han utviklet det kategoriske imperativet: handle slik at din maksime kan gjøres til en universell lov.',
      },
      {
        id: 'ed-1-5',
        question: 'Hvordan håndterer de fleste gode ledere etiske dilemmaer?',
        choices: [
          { id: 'a', text: 'De følger kun konsekvensetikken' },
          { id: 'b', text: 'De følger kun pliktetikken' },
          { id: 'c', text: 'De tar hensyn til begge — prinsipielt forsvarlig OG gode konsekvenser' },
          { id: 'd', text: 'De delegerer etiske beslutninger til advokater' },
        ],
        correctId: 'c',
        explanation: 'I praksis kombinerer gode ledere begge tilnærminger — de ser etter løsninger som er prinsipielt forsvarlige (pliktetikk) og som gir gode resultater (konsekvensetikk).',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🌱',
    title: 'CSR — Corporate Social Responsibility',
    quote: 'Bedrifter eksisterer ikke i vakuum — de tar fra samfunnet og skylder samfunnet noe tilbake.',
    content: 'Carrolls pyramide: grunnmuren er økonomisk ansvar (overleve), deretter juridisk (følge lover), etisk (gjøre det rette uten å være påkrevd), og øverst filantropisk (bidra til samfunnet). Stormberg er et norsk eksempel på CSR som kjerneidentitet. CSR er også risikostyring.',
    subpoints: [
      'CARROLLS PYRAMIDE: Et selskap som ikke er lønnsomt kan ikke ta sosialt ansvar — men lønnsomhet alene er ikke nok',
      'STORMBERG: Inkluderingsstrategi viser at sosiale hensyn og forretningssuksess ikke er motsetninger',
      'OMDØMMERISIKO: Én avsløring av uetisk praksis kan utslette årevis med merkevarebygging',
    ],
    practical: 'Sjekk en norsk bedrifts årsrapport og se om CSR er integrert i forretningsmodellen eller presentert som et separat kapittel — det sier mye om hvor seriøst de tar det.',
    glossaryTerm: 'CSR (Corporate Social Responsibility)',
    exercises: [
      {
        id: 'ed-2-1',
        question: 'Hva er grunnmuren i Carrolls CSR-pyramide?',
        choices: [
          { id: 'a', text: 'Filantropisk ansvar' },
          { id: 'b', text: 'Etisk ansvar' },
          { id: 'c', text: 'Juridisk ansvar' },
          { id: 'd', text: 'Økonomisk ansvar' },
        ],
        correctId: 'd',
        explanation: 'Grunnmuren i Carrolls pyramide er det økonomiske ansvaret — bedriften må tjene penger og overleve for i det hele tatt å kunne ta noe annet ansvar.',
      },
      {
        id: 'ed-2-2',
        question: 'Hva kjennetegner Stormbergs tilnærming til CSR?',
        choices: [
          { id: 'a', text: 'CSR er et eget kapittel i årsrapporten uten forretningsmessig kobling' },
          { id: 'b', text: 'CSR er kjerneidentiteten i merkevaren, ikke et tillegg' },
          { id: 'c', text: 'Stormberg fokuserer kun på miljøvennlig produksjon' },
          { id: 'd', text: 'Stormberg har ingen formell CSR-strategi' },
        ],
        correctId: 'b',
        explanation: 'Stormbergs inkluderingsgaranti (30 % med redusert arbeidsevne), gjenbruksprogram og klimaregnskap er fundamentet i merkevaren — CSR som kjerneidentitet, ikke PR.',
      },
      {
        id: 'ed-2-3',
        question: 'Hva er riktig rekkefølge i Carrolls CSR-pyramide, fra bunn til topp?',
        choices: [
          { id: 'a', text: 'Filantropisk → Etisk → Juridisk → Økonomisk' },
          { id: 'b', text: 'Etisk → Juridisk → Filantropisk → Økonomisk' },
          { id: 'c', text: 'Økonomisk → Juridisk → Etisk → Filantropisk' },
          { id: 'd', text: 'Juridisk → Etisk → Økonomisk → Filantropisk' },
        ],
        correctId: 'c',
        explanation: 'Carrolls pyramide fra bunn til topp: Økonomisk (overleve) → Juridisk (følge regler) → Etisk (gjøre det rette) → Filantropisk (bidra til samfunnet).',
      },
      {
        id: 'ed-2-4',
        question: 'Hva viste Equinors klimasøksmål fra Greenpeace (2020) om CSR?',
        choices: [
          { id: 'a', text: 'At juridisk suksess er nok til å bygge omdømme' },
          { id: 'b', text: 'At man kan vinne juridisk men tape i omdømmekampen' },
          { id: 'c', text: 'At miljøorganisasjoner ikke har innflytelse' },
          { id: 'd', text: 'At norske selskaper ikke trenger CSR-strategi' },
        ],
        correctId: 'b',
        explanation: 'Equinor vant søksmålet juridisk, men tapte i omdømmekampen — et godt eksempel på at juridisk etterlevelse ikke er tilstrekkelig for omdømme og tillit.',
      },
      {
        id: 'ed-2-5',
        question: 'Hvorfor er CSR også risikostyring?',
        choices: [
          { id: 'a', text: 'Det reduserer forsikringspremiene' },
          { id: 'b', text: 'I sosiale mediers tidsalder kan én avsløring av uetisk praksis utslette årevis med merkevarebygging' },
          { id: 'c', text: 'Det øker aksjekursen automatisk' },
          { id: 'd', text: 'Det reduserer skattekostnader' },
        ],
        correctId: 'b',
        explanation: 'CSR er risikostyring fordi én avsløring av uetisk praksis kan ha enormt negativ effekt på omdømme, kundetillit og markedsverdi i en tid med sosiale medier og økt gjennomsiktighet.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔗',
    title: 'Leverandørkjede og etisk handel',
    quote: 'Prisen du ikke betaler for et produkt, betaler noen andre et annet sted.',
    content: 'Fairtrade sikrer rettferdige betingelser for produsenter i lavkostland. Telenor i Myanmar (2014–2021) er et lærerikt case om dilemmaet mellom tilstedeværelse og legitimering av et regime. Etisk handel Norge tilbyr standard for leverandørrevisjon.',
    subpoints: [
      'FAIRTRADE: Garanterer minimumspris og premietillegg til lokalsamfunnet — primært for kaffe, kakao, te og frukt',
      'LEVERANDØRREVISJON: Regelmessig, uanmeldt revisjon er det mest effektive verktøyet',
      'TELENOR I MYANMAR: Dilemmaet: trekker man seg ut, mister man muligheten til å påvirke',
    ],
    practical: 'Sjekk om dine favorittklesmerker er medlemmer av Etisk handel Norge eller har offentlig tilgjengelig leverandørliste — mangel på åpenhet er i seg selv informasjon.',
    exercises: [
      {
        id: 'ed-3-1',
        question: 'Hva garanterer Fairtrade-merket?',
        choices: [
          { id: 'a', text: 'At produktet er produsert i Norge' },
          { id: 'b', text: 'Minimumspris til produsenter og et premietillegg til lokalsamfunnet' },
          { id: 'c', text: 'At produktet er CO2-nøytralt' },
          { id: 'd', text: 'At ingen barn er involvert i produksjonen' },
        ],
        correctId: 'b',
        explanation: 'Fairtrade garanterer en minimumspris til produsenter uavhengig av markedsprissvingninger, pluss et Fairtrade-premietillegg til lokalsamfunnet for infrastruktur og utdanning.',
      },
      {
        id: 'ed-3-2',
        question: 'Hva var det etiske dilemmaet for Telenor i Myanmar?',
        choices: [
          { id: 'a', text: 'Om de skulle betale korrupsjon for konsesjoner' },
          { id: 'b', text: 'Om tilstedeværelse ga innflytelse og hjalp folk, eller legitimerte og støttet et autoritært regime' },
          { id: 'c', text: 'Om de skulle ansette lokale eller norske arbeidere' },
          { id: 'd', text: 'Om de skulle dele teknologipatenter med Myanmar' },
        ],
        correctId: 'b',
        explanation: 'Telenors dilemma: tilstedeværelse koblet folk til internett og ga en form for innflytelse, men infrastrukturen ble også brukt til å overvåke dissidenter etter militærkuppet.',
      },
      {
        id: 'ed-3-3',
        question: 'Hva er det mest effektive verktøyet for å sikre etisk leverandørkjede?',
        choices: [
          { id: 'a', text: 'Å stole på leverandørens egenerklæringer' },
          { id: 'b', text: 'Regelmessig, uanmeldt revisjon av leverandører' },
          { id: 'c', text: 'Å kun bruke norske leverandører' },
          { id: 'd', text: 'Å publisere etiske retningslinjer på nettsiden' },
        ],
        correctId: 'b',
        explanation: 'Regelmessig, uanmeldt leverandørrevisjon er det mest effektive verktøyet — men det koster ressurser og forutsetter at revisorene er reelt uavhengige.',
      },
      {
        id: 'ed-3-4',
        question: 'Hvilke produktkategorier dekker Fairtrade primært?',
        choices: [
          { id: 'a', text: 'Elektronikk og hvitevarer' },
          { id: 'b', text: 'Tekstiler og klær' },
          { id: 'c', text: 'Kaffe, kakao, te og frukt' },
          { id: 'd', text: 'Møbler og boligtilbehør' },
        ],
        correctId: 'c',
        explanation: 'Fairtrade gjelder primært for kaffe, kakao, te, frukt og noen andre landbruksprodukter — ikke tekstiler eller andre varekategorier.',
      },
      {
        id: 'ed-3-5',
        question: 'Hva betyr det at Telenor solgte seg ut av Myanmar i 2021?',
        choices: [
          { id: 'a', text: 'De mistet all innflytelse i landet' },
          { id: 'b', text: 'De valgte omdømmemessige hensyn over forretningsmessig tilstedeværelse' },
          { id: 'c', text: 'De ble tvunget ut av norske myndigheter' },
          { id: 'd', text: 'Det var en normal forretningsbeslutning uten etiske dimensjoner' },
        ],
        correctId: 'b',
        explanation: 'Telenors utgang fra Myanmar etter militærkuppet i 2021 handlet om at risikoen for å legitimere regimet og assosieres med menneskerettighetsbrudd oversteg forretningsverdien.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🚫',
    title: 'Korrupsjon og bestikkelser — norsk og internasjonal kontekst',
    quote: 'Det enkleste spørsmålet i anti-korrupsjonsarbeid: ville du vært komfortabel med å se dette på forsiden av Dagbladet?',
    content: 'Norsk straffelov definerer korrupsjon som å gi eller motta en utilbørlig fordel i forbindelse med en stilling. Statoil ble i 2006 ilagt 10,5 millioner dollar i bot for bestikkelser i Iran og Libya. Dagbladet-testen: ville du vært komfortabel med dette på forsiden i morgen?',
    subpoints: [
      'STRAFFELOVEN: Korrupsjon er straffbart med opptil 10 år — selskapet kan straffes i tillegg til enkeltpersoner',
      'KULTURELL KONTEKST: Norske bedrifter som opererer internasjonalt trenger klar gavepolicy',
      'EQUINOR-SAKEN: «Vi visste ikke» er ikke et forsvar for korrupsjon i datterselskaper',
    ],
    practical: 'For enhver tvilsom beslutning, spør deg om du ville vært komfortabel med den på forsiden av en norsk avis. Det er ikke en juridisk standard, men en praktisk etisk filter.',
    exercises: [
      {
        id: 'ed-4-1',
        question: 'Hva definerer norsk straffelov som korrupsjon?',
        choices: [
          { id: 'a', text: 'Å ta med seg kontorrekvisita hjem' },
          { id: 'b', text: 'Å gi eller motta en utilbørlig fordel i forbindelse med en stilling, verv eller oppdrag' },
          { id: 'c', text: 'Å lyve på CV-en' },
          { id: 'd', text: 'Å bruke arbeidstid på private gjøremål' },
        ],
        correctId: 'b',
        explanation: 'Straffeloven §§ 387-388 definerer korrupsjon som å gi eller motta en utilbørlig fordel i forbindelse med en stilling, verv eller oppdrag. Nøkkelordet er «utilbørlig».',
      },
      {
        id: 'ed-4-2',
        question: 'Hva er «Dagbladet-testen» i etisk beslutningstaking?',
        choices: [
          { id: 'a', text: 'En test der Dagbladet evaluerer bedrifters etikk' },
          { id: 'b', text: 'Spørsmålet: ville du vært komfortabel med å se denne beslutningen på forsiden av Dagbladet?' },
          { id: 'c', text: 'En juridisk standard for hva som er tillatt' },
          { id: 'd', text: 'En intern revisjonsmetode' },
        ],
        correctId: 'b',
        explanation: 'Dagbladet-testen er en enkel men effektiv etisk filter: spør deg selv om du ville vært komfortabel med å se beslutningen på forsiden av en norsk avis. Ikke en juridisk, men en praktisk etisk standard.',
      },
      {
        id: 'ed-4-3',
        question: 'Hva viste Statoil/Equinor-korrupsjonssaken fra 2006?',
        choices: [
          { id: 'a', text: 'At norske selskaper er immune mot korrupsjon' },
          { id: 'b', text: 'At korrupsjon i datterselskaper er selskapets ansvar — «vi visste ikke» er ikke et forsvar' },
          { id: 'c', text: 'At bøter ikke har preventiv effekt' },
          { id: 'd', text: 'At korrupsjon er akseptabelt i noen markeder' },
        ],
        correctId: 'b',
        explanation: 'Statoil-saken viste at selskapet er ansvarlig for korrupsjon begått gjennom datterselskaper og tredjepartsagenter — uvitenhetsargumentet holder ikke.',
      },
      {
        id: 'ed-4-4',
        question: 'Hva skiller korrupsjon fra normal gavegiving i forretningslivet?',
        choices: [
          { id: 'a', text: 'Verdien — alt over 100 kroner er korrupsjon' },
          { id: 'b', text: 'Om gaven er «utilbørlig» — gaven bryter med normal kutyme og er ment å påvirke beslutninger' },
          { id: 'c', text: 'Om gaven er deklarert på skattemeldingen' },
          { id: 'd', text: 'Det er ingen grense — all gavegiving er problematisk' },
        ],
        correctId: 'b',
        explanation: 'Skillet går ved «utilbørlig» — en flaske vin er innenfor normal kutyme, mens en feriereise til Maldivene som er ment å påvirke en beslutning er korrupsjon.',
      },
      {
        id: 'ed-4-5',
        question: 'Hvor rangerer Norge på Transparency Internationals korrupsjonsindeks?',
        choices: [
          { id: 'a', text: 'Midt på treet globalt' },
          { id: 'b', text: 'Blant de fire minst korrupte landene i verden' },
          { id: 'c', text: 'Kun bra i Norden, ikke globalt' },
          { id: 'd', text: 'Norge er ikke med i indeksen' },
        ],
        correctId: 'b',
        explanation: 'Transparency International rangerer konsekvent Norge blant de fire minst korrupte landene i verden — det betyr ikke at korrupsjon ikke finnes, men at det er sjeldent og alvorlig.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📢',
    title: 'Varsling og etiske retningslinjer',
    quote: 'Et selskaps etikk er bare så god som viljen til å høre ubehagelige sannheter.',
    content: 'Varsling er å si ifra om kritikkverdige forhold. AML §§ 2A-1 til 2A-7 forbyr gjengjeldelse mot varsler. NAV-skandalen viste at varsling må tas alvorlig umiddelbart. Tre-spørsmål-testen: Er det lovlig? Er det rettferdig? Ville jeg vært stolt av det i avisen?',
    subpoints: [
      'VARSLERRETTIGHETER: AML gir rett til å si fra internt, til Arbeidstilsynet, eller til media',
      'NAV-SKANDALEN: Intern varsling ble parkert — med tragiske konsekvenser for uskyldige',
      'TRE-SPØRSMÅL-TESTEN: Lovlig? Rettferdig? Stolt? — filtrerer ut de fleste etisk problematiske beslutninger',
    ],
    practical: 'Finn ut om bedriften du jobber for har en varslerkanal og at den faktisk brukes — det er et kvalitetstegn på ledelseskulturen.',
    glossaryTerm: 'Yrkesetikk',
    exercises: [
      {
        id: 'ed-5-1',
        question: 'Hva er varsling (whistleblowing)?',
        choices: [
          { id: 'a', text: 'Å si opp jobben sin på grunn av dårlige arbeidsforhold' },
          { id: 'b', text: 'Å si ifra om kritikkverdige forhold som regelbrudd, korrupsjon eller trakassering' },
          { id: 'c', text: 'Å diskutere arbeidsforholdene med kollegaer' },
          { id: 'd', text: 'Å klage til fagforeningen om lønn' },
        ],
        correctId: 'b',
        explanation: 'Varsling er å si ifra om kritikkverdige forhold på arbeidsplassen — regelbrudd, korrupsjon, trakassering, eller andre lovstridige eller moralsk forkastelige praksiser.',
      },
      {
        id: 'ed-5-2',
        question: 'Hva forbyr Arbeidsmiljølovens varslerbestemmelser (§§ 2A-1 til 2A-7)?',
        choices: [
          { id: 'a', text: 'At ansatte snakker med pressen' },
          { id: 'b', text: 'Gjengjeldelse mot ansatte som varsler' },
          { id: 'c', text: 'At ansatte varsler til Arbeidstilsynet uten å gå til leder først' },
          { id: 'd', text: 'Anonym varsling' },
        ],
        correctId: 'b',
        explanation: 'AML §§ 2A-1 til 2A-7 forbyr alle former for gjengjeldelse mot en varsler — å si ifra skal ikke føre til sanksjoner, utfrysing eller andre negative konsekvenser.',
      },
      {
        id: 'ed-5-3',
        question: 'Hva var den viktigste lærdommen fra NAV-skandalen?',
        choices: [
          { id: 'a', text: 'At NAV bør privatiseres' },
          { id: 'b', text: 'At intern varsling må tas alvorlig umiddelbart — systemsvikt kan skje selv i Norge' },
          { id: 'c', text: 'At EØS-reglene er for kompliserte' },
          { id: 'd', text: 'At varsling sjelden fører til noe positivt' },
        ],
        correctId: 'b',
        explanation: 'NAV-skandalen viste at interne varsler om feilpraksis ble ignorert for lenge — med den konsekvensen at uskyldige ble straffet. Varsling MÅ tas alvorlig med én gang.',
      },
      {
        id: 'ed-5-4',
        question: 'Hva er «tre-spørsmål-testen» i etisk beslutningstaking?',
        choices: [
          { id: 'a', text: 'Er det lønnsomt? Er det effektivt? Er det praktisk?' },
          { id: 'b', text: 'Er det lovlig? Er det rettferdig? Ville jeg vært stolt av det?' },
          { id: 'c', text: 'Er det raskt? Er det billig? Er det bra for kundene?' },
          { id: 'd', text: 'Vet sjefen om det? Er det dokumentert? Er det forsikret?' },
        ],
        correctId: 'b',
        explanation: 'Tre-spørsmål-testen: Er det lovlig? Er det rettferdig overfor alle involverte parter? Ville jeg vært stolt av å se det i avisen? Alle tre spørsmål må besvares positivt.',
      },
      {
        id: 'ed-5-5',
        question: 'Hva sier Åpenhetsloven (2022) som ble vedtatt i Norge?',
        choices: [
          { id: 'a', text: 'At alle bedrifter må publisere lønnsstatistikk' },
          { id: 'b', text: 'At større bedrifter må gjennomføre aktsomhetsvurderinger for menneskerettigheter i leverandørkjeden' },
          { id: 'c', text: 'At alle bedrifter må ha ekstern revisor' },
          { id: 'd', text: 'At selskaper over 50 ansatte må ha varslerkanal' },
        ],
        correctId: 'b',
        explanation: 'Åpenhetsloven pålegger bedrifter med over 50 ansatte og 35 millioner kroner i omsetning å gjennomføre aktsomhetsvurderinger for menneskerettigheter og anstendige arbeidsforhold i leverandørkjeden.',
      },
    ],
  },
];

export default function EtiskeDilemmaerModule() {
  return (
    <DrawerModule
      moduleCode="KK-VG2-3"
      moduleTitle="Etiske dilemmaer"
      moduleIcon="🧩"
      storageKey="learning-vg2-etiske-dilemmaer"
      completeRoute="/learning/vg2/kultur/etiske-dilemmaer/complete"
      phases={phases}
      intro="Etiske dilemmaer er situasjoner der det ikke finnes et åpenbart riktig svar, og der ulike verdier peker i ulike retninger. Å ha et bevisst etisk rammeverk gjør ikke beslutningene lette, men det gjør dem mer forsvarlige."
      vissteduAt="Norge vedtok i 2022 Åpenhetsloven, som pålegger større bedrifter å gjennomføre aktsomhetsvurderinger for menneskerettigheter i hele leverandørkjeden og publisere resultatet offentlig."
      espenSier="I mitt arbeid ser jeg to typer bedrifter: de som behandler etikk som et compliance-problem og de som behandler det som et lederansvar. De sistnevnte tar bedre beslutninger, tiltrekker seg bedre folk og har sterkere kultur."
      presentationLink={{ route: '/learning/presentations/etikk-baerekraft', description: 'Etikk og bærekraft — en visuell gjennomgang av CSR og etiske dilemmaer' }}
    />
  );
}
