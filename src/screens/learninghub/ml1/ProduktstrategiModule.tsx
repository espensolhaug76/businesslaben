import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📈',
    title: 'Produktets livssyklus (PLC)',
    quote: 'Fra introduksjon til tilbakegang',
    content: 'PLC beskriver et produkts "liv" gjennom fire faser: Introduksjon (lavt salg, høye kostnader), Vekst (rask salgsvekst), Modenhet (flater ut, priskrig), Tilbakegang (salget faller). Alle produkter gjennomgår disse fasene — men i ulik hastighet.',
    subpoints: [
      'INTRODUKSJON: Lavt salg, høye lanseringskostnader, null fortjeneste — mål: skape bevissthet',
      'VEKST: Rask salgsvekst, konkurrenter kopierer, fortjeneste stiger kraftig — mål: bygge markedsandel',
      'MODENHET: Salgsvekst flater, sterk konkurranse, priskrig — mål: forsvare posisjon',
      'TILBAKEGANG: Salget faller, teknologi erstattet — beslutning: revitalisér, melk, eller avvikle',
    ],
    practical: 'Grandiosa Original er i modenhetsfasen — Orkla forsøker å forlenge den med nye varianter (Grandiosa XXL, Grandiosa vegetar).',
    glossaryTerm: 'Produktets livssyklus',
    exercises: [
      {
        id: 'ps-1-1',
        question: 'I hvilken PLC-fase er salget høyest og vekstraten begynner å flate ut?',
        choices: [
          { id: 'a', text: 'Introduksjon' },
          { id: 'b', text: 'Vekst' },
          { id: 'c', text: 'Modenhet' },
          { id: 'd', text: 'Tilbakegang' },
        ],
        correctId: 'c',
        explanation: 'I modenhetsfarsen er salget høyest, men vekstraten flater ut. Konkurransen er sterk, priskrig er vanlig, og fokuset skifter til kostnadseffektivitet og lojalitet.',
      },
      {
        id: 'ps-1-2',
        question: 'Et nytt produkt lanseres med store markedsføringskostnader og null fortjeneste. Hvilken fase er dette?',
        choices: [
          { id: 'a', text: 'Vekst' },
          { id: 'b', text: 'Modenhet' },
          { id: 'c', text: 'Tilbakegang' },
          { id: 'd', text: 'Introduksjon' },
        ],
        correctId: 'd',
        explanation: 'Introduksjonsfasen kjennetegnes av lavt salg, høye lanseringskostnader (R&D, markedsføring) og negativ til null fortjeneste. Målet er å skape bevissthet.',
      },
      {
        id: 'ps-1-3',
        question: 'DVD-spillere er i sterk tilbakegang. Hva er riktig strategi ifølge PLC-tenkning?',
        choices: [
          { id: 'a', text: 'Investér massivt for å snu trenden' },
          { id: 'b', text: 'Vurder å revitalisere, melke resterende inntekter, eller avvikle produktlinjen' },
          { id: 'c', text: 'Sett ned prisen drastisk' },
          { id: 'd', text: 'Utvid til nye geografiske markeder' },
        ],
        correctId: 'b',
        explanation: 'I tilbakegangsfasen er strategien å vurdere tre alternativer: revitalisere (sjeldent vellykket), melke resterende inntekter uten ny investering, eller avvikle og frigjøre ressurser.',
      },
      {
        id: 'ps-1-4',
        question: 'Orkla lanserer Grandiosa XXL og Grandiosa vegetar. Hvilken PLC-strategi er dette?',
        choices: [
          { id: 'a', text: 'Introdusere en ny produktkategori' },
          { id: 'b', text: 'Forlenge modenhetsfarsen med linjeforlengelse' },
          { id: 'c', text: 'Avvikle originalproduktet' },
          { id: 'd', text: 'Reposisjonere til et nytt segment' },
        ],
        correctId: 'b',
        explanation: 'Nye varianter av et modent produkt er en klassisk strategi for å forlenge modenhetsfasen — man bruker merkevarens styrke til å tiltrekke nye segmenter og stimulere eksisterende kunder.',
      },
      {
        id: 'ps-1-5',
        question: 'I hvilken PLC-fase er fortjenesten høyest?',
        choices: [
          { id: 'a', text: 'Introduksjon' },
          { id: 'b', text: 'Vekst og tidlig modenhet' },
          { id: 'c', text: 'Sent i tilbakegangsfasen' },
          { id: 'd', text: 'Fortjenesten er lik i alle faser' },
        ],
        correctId: 'b',
        explanation: 'Fortjenesten er typisk høyest i vekstfasen og tidlig modenhet — salget vokser raskt, markedsandelen er bygget, men kostnadskutt og priskrig har ennå ikke begynt for alvor.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🗃️',
    title: 'Sortimentsbeslutninger',
    quote: 'Bredde og dybde i produktportefølje',
    content: 'Bedrifter beslutter bredden (antall produktlinjer) og dybden (antall varianter per linje) i sortimentet. Bredt sortiment reduserer risiko men øker kompleksitet. Smalt fokus gir kompetanse men sårbarhet. Rema 1000 velger smalhet for å holde priser nede.',
    subpoints: [
      'BREDDE: Antall ulike produktlinjer (Apple: iPhone, Mac, iPad, Watch, AirPods = bred)',
      'DYBDE: Antall varianter innen én linje (iPhone 15, 15 Plus, 15 Pro, 15 Pro Max = dyp)',
      'KONSISTENS: I hvilken grad produktlinjene er relatert (P&G har bleier, barberblader — lite konsistens)',
      'AVGJØRELSEN: Bredt = reduserer risiko men øker kompleksitet; smalt = kompetanse men sårbarhet',
    ],
    practical: 'Rema 1000 velger smalhet (350 varer) for å holde priser nede. Linjeforlengelse er vanligst: Coca-Cola Diet, Coca-Cola Zero, Coca-Cola Cherry.',
    glossaryTerm: 'Sortimentsbeslutninger',
    exercises: [
      {
        id: 'ps-2-1',
        question: 'Hva betyr bredde i sortimentsbeslutninger?',
        choices: [
          { id: 'a', text: 'Antall varianter innen én produktlinje' },
          { id: 'b', text: 'Antall ulike produktlinjer bedriften tilbyr' },
          { id: 'c', text: 'Størrelsen på produktene' },
          { id: 'd', text: 'Antall land bedriften selger i' },
        ],
        correctId: 'b',
        explanation: 'Bredde refererer til antall ulike produktlinjer. Apple (iPhone, Mac, iPad, Watch, AirPods) har bredt sortiment. En spesialistbutikk for vin har smalt sortiment.',
      },
      {
        id: 'ps-2-2',
        question: 'Hva betyr dybde i sortimentsbeslutninger?',
        choices: [
          { id: 'a', text: 'Hvor dypt i verdikjeden bedriften er integrert' },
          { id: 'b', text: 'Antall varianter innen én og samme produktlinje' },
          { id: 'c', text: 'Antall produktlinjer bedriften tilbyr' },
          { id: 'd', text: 'Prisforskjellen mellom billigste og dyreste produkt' },
        ],
        correctId: 'b',
        explanation: 'Dybde refererer til antall varianter innen én produktlinje. iPhone 15, 15 Plus, 15 Pro og 15 Pro Max = dyp produktlinje. Én enkelt iPhone-modell = grunn linje.',
      },
      {
        id: 'ps-2-3',
        question: 'Hva er linjeforlengelse (product line extension)?',
        choices: [
          { id: 'a', text: 'Å lansere et helt nytt produkt under et nytt merkenavn' },
          { id: 'b', text: 'Å bruke eksisterende merkenavn for å lansere varianter i samme kategori' },
          { id: 'c', text: 'Å forlenge garantitiden på eksisterende produkter' },
          { id: 'd', text: 'Å ekspandere til nye geografiske markeder' },
        ],
        correctId: 'b',
        explanation: 'Linjeforlengelse bruker eksisterende merkenavn til nye varianter — Coca-Cola Diet, Coca-Cola Zero, Coca-Cola Cherry. Man drar nytte av merkeverdien uten å bygge nytt merke.',
      },
      {
        id: 'ps-2-4',
        question: 'Rema 1000 har 350 varer mot Menys 3 000. Hva er strategien bak?',
        choices: [
          { id: 'a', text: 'Rema har ikke råd til flere leverandøravtaler' },
          { id: 'b', text: 'Smalt sortiment holder kompleksiteten nede og muliggjør lavere priser' },
          { id: 'c', text: 'Norsk lov begrenser antall varer i dagligvare' },
          { id: 'd', text: 'Kundene klager på for bredt utvalg overalt' },
        ],
        correctId: 'b',
        explanation: 'Remas smale sortiment er et bevisst strategisk valg — færre produkter = lavere logistikkkostnader, enklere innkjøpsavtaler og klarere posisjonering. Det er ikke en svakhet, men en styrke.',
      },
      {
        id: 'ps-2-5',
        question: 'Hva er ulempen med et bredt produktsortiment?',
        choices: [
          { id: 'a', text: 'Det er vanskeligere å bygge sterk posisjonering for hvert produkt' },
          { id: 'b', text: 'Det reduserer risiko for mye' },
          { id: 'c', text: 'Kunder blir for fornøyde' },
          { id: 'd', text: 'Det er ingen ulemper med bredt sortiment' },
        ],
        correctId: 'a',
        explanation: 'Bredt sortiment øker kompleksitet, krever mer ressurser, og gjør det vanskeligere å bygge sterk, konsistent posisjonering for hvert enkelt produkt.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔬',
    title: 'Produktutvikling og innovasjonsprosessen',
    quote: 'Fra idé til lansering',
    content: 'Ny produktutvikling (NPD) er høyrisiko — over 80 % av nye produkter feiler. En strukturert prosess reduserer risiko: Idégenerering → Utvalg → Konsepttest → Utvikling og test → Lansering. «Fail fast, fail cheap» er Silicon Valley-mantraet.',
    subpoints: [
      'FASE 1 — IDÉGENERERING: Kunder, konkurrenter, ansatte, forskning',
      'FASE 2 — UTVALG: Filtrér idéer mot markedspotensial, teknisk gjennomførbarhet, strategisk fit',
      'FASE 3 — KONSEPTTEST: Vis konseptet til potensielle kunder UTEN å produsere det',
      'FASE 4 — UTVIKLING OG TEST: Lag prototype, test, iterér — «fail fast, fail cheap»',
      'FASE 5 — LANSERING: Full kommersiell lansering, koordiner pris, distribusjon og kommunikasjon',
    ],
    practical: '"De beste produktutviklerne tilbringer 50 % av tiden med kunder, ikke på kontoret." — Steve Jobs.',
    glossaryTerm: 'Produktutvikling',
    exercises: [
      {
        id: 'ps-3-1',
        question: 'Hva er statistikken for suksessrate for nye produkter?',
        choices: [
          { id: 'a', text: 'Ca. 80 % av nye produkter lykkes' },
          { id: 'b', text: 'Over 80 % av nye produkter feiler' },
          { id: 'c', text: 'Halvparten lykkes, halvparten feiler' },
          { id: 'd', text: 'Det varierer for mye til å gi statistikk' },
        ],
        correctId: 'b',
        explanation: 'Over 80 % av nye produkter feiler — dette understreker viktigheten av en strukturert produktutviklingsprosess for å redusere risikoen for kostbare feil.',
      },
      {
        id: 'ps-3-2',
        question: 'Hva er en konsepttest i produktutviklingen?',
        choices: [
          { id: 'a', text: 'Å teste produksjonsprosessen i fabrikken' },
          { id: 'b', text: 'Å vise konseptet til potensielle kunder UTEN å produsere det' },
          { id: 'c', text: 'Å teste reklamekonsepter på ulike segmenter' },
          { id: 'd', text: 'Å lage en prototype og testprodusere' },
        ],
        correctId: 'b',
        explanation: 'En konsepttest validerer interesse og betalingsvillighet ved å presentere idéen for potensielle kunder — uten å investere i full utvikling. Det er billig kundeinnsikt tidlig i prosessen.',
      },
      {
        id: 'ps-3-3',
        question: 'Hva betyr «fail fast, fail cheap» i produktutvikling?',
        choices: [
          { id: 'a', text: 'Å avslutte prosessen raskt hvis første idé ikke fungerer' },
          { id: 'b', text: 'Å teste raskt og billig med prototyper for å avdekke feil tidlig' },
          { id: 'c', text: 'Å senke prisen så raskt som mulig ved lansering' },
          { id: 'd', text: 'Å ansette billig arbeidskraft' },
        ],
        correctId: 'b',
        explanation: '«Fail fast, fail cheap» betyr å iterere raskt med billige prototyper for å avdekke problemer tidlig — da koster feilene lite. Å oppdage feil etter full lansering er langt dyrere.',
      },
      {
        id: 'ps-3-4',
        question: 'Hvilke kriterier bør idéer filtreres mot i utvalgsfarsen (fase 2)?',
        choices: [
          { id: 'a', text: 'Kun lønnsomhetspotensial' },
          { id: 'b', text: 'Markedspotensial, teknisk gjennomførbarhet, strategisk fit og lønnsomhetspotensial' },
          { id: 'c', text: 'Kun teknisk gjennomførbarhet' },
          { id: 'd', text: 'Kun hva ledelsens favoritter foretrekker' },
        ],
        correctId: 'b',
        explanation: 'I utvalgsfarsen filtreres idéer mot fire kriterier: markedspotensial (er det et marked?), teknisk gjennomførbarhet (kan vi lage det?), strategisk fit (passer det strategien?) og lønnsomhet.',
      },
      {
        id: 'ps-3-5',
        question: 'Hva er hensikten med å tilbringe tid med kunder under produktutvikling?',
        choices: [
          { id: 'a', text: 'For å selge eksisterende produkter' },
          { id: 'b', text: 'For å forstå reelle behov, pain points og betalingsvillighet' },
          { id: 'c', text: 'For å oppfylle lov om forbrukervern' },
          { id: 'd', text: 'For å samle kontaktinformasjon' },
        ],
        correctId: 'b',
        explanation: 'Kundeinnsikt er fundamentalt i god produktutvikling — å forstå reelle behov, frustrasjoner (pain points) og hva kunder faktisk er villige til å betale for, forhindrer kostbare antagelsesfeil.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '⭐',
    title: 'Merkevarestrategi',
    quote: 'Merkevarearkitektur og merkeverdi',
    content: 'En merkevare er mer enn et logo — det er summen av alle assosiasjoner kunden har til et navn. Merkeverdi (brand equity) = premium-pris + lojalitet. Merkearkitektur: monolittisk (Apple — alt er Apple), pluralistisk (Orkla — separate merker), hybrid (Toyota + Lexus).',
    subpoints: [
      'MERKEVERDI: Merkevarens verdi utover fysisk produkt — Apple er verdt 2500 mrd dollar',
      'MERKEARKITEKTUR: Monolittisk (ett merke for alt), Pluralistisk (ulike merker), Hybrid (kombinasjon)',
      'MERKEUTVIDELSE: Bruk eksisterende merkenavn for nytt produkt — Nike → Nike+, Nike Run Club',
      'PRIVAT MERKE: Butikkens eget merke — First Price (NorgesGruppen) konkurrerer på pris',
    ],
    practical: 'Det koster 10x mer å bygge et nytt merke enn å forlenge et eksisterende. Merkevare er den dyreste og mest verdifulle eiendelen de fleste bedrifter har.',
    glossaryTerm: 'Merkevare',
    exercises: [
      {
        id: 'ps-4-1',
        question: 'Hva er merkeverdi (brand equity)?',
        choices: [
          { id: 'a', text: 'Prisen på å registrere et varemerke' },
          { id: 'b', text: 'Merkevarens verdi utover det fysiske produktet — premium-pris, lojalitet og nytt produkt-mottak' },
          { id: 'c', text: 'Omsetningen generert av merkevaren det siste året' },
          { id: 'd', text: 'Antall kunder som kjenner til merket' },
        ],
        correctId: 'b',
        explanation: 'Brand equity er den ekstra verdien merkevaren gir utover det fysiske produktet — Apples iPhone koster ca. 400 USD å produsere, men selges for 1000 USD+. Differansen er merkeverdi.',
      },
      {
        id: 'ps-4-2',
        question: 'Apple bruker ett merkenavn på iPhone, MacBook og Apple Watch. Hva er dette for merkearkitektur?',
        choices: [
          { id: 'a', text: 'Pluralistisk merkearkitektur' },
          { id: 'b', text: 'Hybrid merkearkitektur' },
          { id: 'c', text: 'Monolittisk merkearkitektur' },
          { id: 'd', text: 'Privat merkearkitektur' },
        ],
        correctId: 'c',
        explanation: 'Monolittisk merkearkitektur betyr at ett merkenavn brukes på alle produkter — alt fra Apple er "Apple". Dette bygger sterk merkevare, men risikerer å skalere negativt assosiasjoner.',
      },
      {
        id: 'ps-4-3',
        question: 'Orkla eier Grandiosa, Stabburet og Toro som separate merker. Hva er dette?',
        choices: [
          { id: 'a', text: 'Monolittisk merkearkitektur' },
          { id: 'b', text: 'Pluralistisk merkearkitektur' },
          { id: 'c', text: 'Hybrid merkearkitektur' },
          { id: 'd', text: 'Linjeforlengelse' },
        ],
        correctId: 'b',
        explanation: 'Pluralistisk merkearkitektur betyr at hvert produkt eller produktlinje har sitt eget merkenavn. Orklas separate merker kan henvende seg til ulike segmenter uten å skade hverandre.',
      },
      {
        id: 'ps-4-4',
        question: 'Hva er en merkeutvidelse?',
        choices: [
          { id: 'a', text: 'Å øke annonserings-budsjettet' },
          { id: 'b', text: 'Å bruke eksisterende merkenavn for å lansere et nytt produkt' },
          { id: 'c', text: 'Å utvide distribusjonsnettet' },
          { id: 'd', text: 'Å ansette en ny merkevaresjef' },
        ],
        correctId: 'b',
        explanation: 'Merkeutvidelse (brand extension) betyr å bruke et etablert merkenavn for å lansere et nytt produkt. Nike → Nike Run Club. Fordelen er å utnytte eksisterende merkeverdi. Risikoen er å svekke originalmerket.',
      },
      {
        id: 'ps-4-5',
        question: 'Hva er et privat merke (private label)?',
        choices: [
          { id: 'a', text: 'Et merke eid av en privatperson' },
          { id: 'b', text: 'Butikkens eget merke som konkurrerer med nasjonale merker' },
          { id: 'c', text: 'Et merke kun tilgjengelig på internett' },
          { id: 'd', text: 'Et merke ikke tilgjengelig for offentligheten' },
        ],
        correctId: 'b',
        explanation: 'Private label er butikkens eget merke — som NorgesGruppens «First Price». Det konkurrerer med nasjonale merker på pris og gir butikken bedre marginer.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📬',
    title: 'Emballasje som markedsføringsverktøy',
    quote: 'Den stille selgeren',
    content: 'Emballasje kalles "den stille selgeren" — i butikken er det det siste markedsføringstiltaket før kjøp. Kunden bruker 5 sekunder på å velge mellom to lignende produkter. Emballasje spiller funksjonell, kommunikativ og differensierende rolle.',
    subpoints: [
      'FUNKSJONELL ROLLE: Beskytte, oppbevare, transportere produktet',
      'KOMMUNIKATIV ROLLE: Formidle merkevare, ingredienser, sertifiseringer (Nespresso-kapslenes farger)',
      'DIFFERENSIERING: Toblerone-formen, Perrier-flasken, Apple-boksen er ikoniske',
      'BÆREKRAFT: EU Packaging Regulation 2024 tvinger bedrifter til omstilling',
    ],
    practical: '"Emballasjedesign er en 5-sekunders reklamekampanje i butikkhyllen."',
    glossaryTerm: 'Emballasje',
    exercises: [
      {
        id: 'ps-5-1',
        question: 'Hvorfor kalles emballasje «den stille selgeren»?',
        choices: [
          { id: 'a', text: 'Fordi den ikke lager lyd' },
          { id: 'b', text: 'Fordi den er det siste markedsføringstiltaket rett før kjøpsbeslutningen i butikken' },
          { id: 'c', text: 'Fordi den henvender seg kun til stille kunder' },
          { id: 'd', text: 'Fordi den er dyrere enn tradisjonell reklame' },
        ],
        correctId: 'b',
        explanation: 'Emballasje er «den stille selgeren» fordi den er det siste markedsføringskontaktpunktet rett før kjøpsbeslutningen — kunden tar produktet i hånden og bestemmer seg i løpet av 5 sekunder.',
      },
      {
        id: 'ps-5-2',
        question: 'Nespresso-kapslers farger kommuniserer smaksintensitet. Hvilken rolle fyller emballasjen her?',
        choices: [
          { id: 'a', text: 'Funksjonell rolle (beskytte produktet)' },
          { id: 'b', text: 'Kommunikativ rolle (formidle informasjon og merkevare)' },
          { id: 'c', text: 'Bærekraftsrolle' },
          { id: 'd', text: 'Logistikkrolle' },
        ],
        correctId: 'b',
        explanation: 'Nespresso-kapslenes fargesystem er et eksempel på emballasjens kommunikative rolle — den formidler informasjon (smaksintensitet) direkte i kjøpsøyeblikket uten tekst.',
      },
      {
        id: 'ps-5-3',
        question: 'Toblerone-formen og Perrier-flasken er gjenkjennbare uten merkenavn. Hva er dette?',
        choices: [
          { id: 'a', text: 'Funksjonell emballasje' },
          { id: 'b', text: 'Emballasje som differensiering og identitetsskaper' },
          { id: 'c', text: 'Juridisk krav til produktidentifikasjon' },
          { id: 'd', text: 'Standardisert europeisk emballasjeform' },
        ],
        correctId: 'b',
        explanation: 'Ikonisk emballasjeform er en kraftig differensiering — Toblerone-trekanten og Perrier-flasken er umiddelbart gjenkjennbare uten merkenavn, noe som bygger sterk merkevareidentitet.',
      },
      {
        id: 'ps-5-4',
        question: 'Hva driver økt fokus på bærekraftig emballasje?',
        choices: [
          { id: 'a', text: 'Kun forbrukerpreferanser' },
          { id: 'b', text: 'Økt regulering (EU Packaging Regulation) kombinert med forbrukerpreferanser' },
          { id: 'c', text: 'Det er alltid billigere med bærekraftig emballasje' },
          { id: 'd', text: 'Forbrukere er alltid villige til å betale mer for bærekraft' },
        ],
        correctId: 'b',
        explanation: 'Bærekraftig emballasje drives av både økt regulering (EU Packaging Regulation 2024) og forbrukerpreferanser. Forbrukere foretrekker bærekraft, men betaler ikke nødvendigvis mer for det.',
      },
      {
        id: 'ps-5-5',
        question: 'Kunder sparer Apple-boksen og synes den er kunstnerisk. Hva viser dette?',
        choices: [
          { id: 'a', text: 'At Apple bruker for mye ressurser på emballasje' },
          { id: 'b', text: 'At emballasje kan bli en del av produktopplevelsen og merkevareidentiteten' },
          { id: 'c', text: 'At produktet er for dyrt' },
          { id: 'd', text: 'At folk er irrasjonelle i sin forbrukeratferd' },
        ],
        correctId: 'b',
        explanation: 'Apples emballasjedesign er en del av merkevareopplevelsen — unboxing-opplevelsen er nøye gjennomtenkt og bidrar til premiumoppfatningen og tilknytningen til merket.',
      },
    ],
  },
];

export default function ProduktstrategiModule() {
  return (
    <DrawerModule
      moduleCode="ML1-05"
      moduleTitle="Produktstrategi"
      moduleIcon="📦"
      storageKey="learning-ml1-produktstrategi"
      completeRoute="/learning/ml1/produktstrategi/complete"
      phases={phases}
      intro="Produktstrategi handler om å ta de riktige beslutningene om hva du selger, hvem du selger til, og hvordan du posisjonerer produktet gjennom hele livsløpet — fra idé til avvikling."
      vissteduAt="Grandiosa er Norges mestselgende matprodukt siden 1980-tallet. Orkla har brukt PLC-tenkning konsekvent: nye varianter introduseres for å forlenge modenhetsfarsen, mens originalen forsvarer sin markedsandel."
      espenSier="Det er fristende å legge til produkter og varianter — men smal fokus og dyp kompetanse innen ett segment er ofte mer lønnsomt enn å spre seg tynt utover."
      presentationLink={{ route: '/learning/presentations/produkt', description: 'Produkt — kjerneproduktet, Maslow, livssyklus og sortiment' }}
    />
  );
}
