import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🌱',
    title: 'Triple Bottom Line',
    quote: 'Profit, People, Planet — ikke bare bunnlinjen.',
    content: 'John Elkington introduserte Triple Bottom Line i 1994: Bedrifter skal måles på økonomi (profit), mennesker (people) og miljø (planet) — ikke bare økonomi. Moderne CSR (Corporate Social Responsibility) er strategisk integrert, ikke bare filantropi. Norske eksempler: Stormberg integrerer etikk i forretningsmodellen, Equinor har klimamål i strategien, Patagonia donerer 1% til miljø. CSR påvirker investor-attraktivitet, kundebånd og medarbeider-engasjement.',
    subpoints: [
      { label: 'TRE LINJER', text: 'Økonomi, mennesker, miljø måles parallelt.' },
      { label: 'STRATEGISK', text: 'Integrert i forretningsmodell, ikke veldedighet på siden.' },
    ],
    practical: 'Hvilken av Profit/People/Planet er sterkest i din bedrift?',
    exercises: [
      {
        id: 'ent218-1-1',
        icon: '🌱',
        title: 'Definisjon',
        question: 'Hva er Triple Bottom Line?',
        choices: [
          { id: 'a', label: 'Bare overskudd', isCorrect: false, feedback: 'Tre linjer.' },
          { id: 'b', label: 'Profit, People, Planet — tredelt måling av bedriftens prestasjon', isCorrect: true, feedback: 'Riktig! Elkingtons rammeverk.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Bærekrafts-rammeverk.' },
        ],
        espenTip: 'Elkington 1994 — fortsatt grunnstein i moderne CSR.',
      },
      {
        id: 'ent218-1-2',
        icon: '🌱',
        title: 'Strategisk',
        question: 'Hva skiller moderne CSR fra filantropi?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjell.' },
          { id: 'b', label: 'CSR er integrert i strategien, filantropi er donasjon på siden', isCorrect: true, feedback: 'Riktig! Kjerneskille.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk forskjell.' },
        ],
        espenTip: 'Donasjoner er greit, men CSR handler om hvordan bedriften driver hver dag.',
      },
      {
        id: 'ent218-1-3',
        icon: '🌱',
        title: 'Stormberg',
        question: 'Hva gjør Stormberg som CSR-eksempel?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisste valg.' },
          { id: 'b', label: 'Ansetter folk med hull i CV, fair-trade, miljøkrav til leverandører', isCorrect: true, feedback: 'Riktig! Integrert CSR.' },
          { id: 'c', label: 'Bare donasjon', isCorrect: false, feedback: 'Strategisk valg.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Forretningsvalg.' },
        ],
        espenTip: 'Stormberg er differensiert merke nettopp på grunn av CSR — kunder betaler premium.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '👥',
    title: 'Interessentmodellen (stakeholders)',
    quote: 'Bedriften har flere eiere enn aksjonærer.',
    content: 'Edward Freeman: Stakeholder-teori — bedriften skal balansere interesser fra alle som påvirkes: Eiere, ansatte, kunder, leverandører, lokalsamfunn, myndigheter, fremtidige generasjoner. Motsats: Friedmans shareholder-doktrine ("the social responsibility of business is to increase profits"). Moderne syn anerkjenner at langsiktig aksjonær-verdi krever stakeholder-balanse. Norge ligger nær stakeholder-modellen — sterk ansattvern, samfunnsansvar i lov.',
    subpoints: [
      { label: 'BREDT', text: 'Mange parter har legitime interesser.' },
      { label: 'BALANSE', text: 'Konflikter mellom stakeholders må håndteres.' },
    ],
    practical: 'Hvem er din bedrifts viktigste stakeholders utenom aksjonærer?',
    exercises: [
      {
        id: 'ent218-2-1',
        icon: '👥',
        title: 'Freeman',
        question: 'Hvem er stakeholders?',
        choices: [
          { id: 'a', label: 'Bare eiere', isCorrect: false, feedback: 'Bredere.' },
          { id: 'b', label: 'Alle som påvirker eller blir påvirket av bedriften', isCorrect: true, feedback: 'Riktig! Freemans definisjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konseptuelt.' },
        ],
        espenTip: 'Freemans bok 1984 endret synet på bedriftens rolle i samfunnet.',
      },
      {
        id: 'ent218-2-2',
        icon: '👥',
        title: 'Friedman',
        question: 'Hva sa Friedman?',
        choices: [
          { id: 'a', label: 'Bare CSR', isCorrect: false, feedback: 'Tvert imot.' },
          { id: 'b', label: 'Bedriftens eneste sosialansvar er å skape overskudd til aksjonærer', isCorrect: true, feedback: 'Riktig! Klassisk shareholder-syn.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Klassisk standpunkt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Økonomisk syn.' },
        ],
        espenTip: 'Friedman 1970 i NYT — provokerende, men dominerte næringslivet i flere tiår.',
      },
      {
        id: 'ent218-2-3',
        icon: '👥',
        title: 'Norsk',
        question: 'Hvor ligger Norge?',
        choices: [
          { id: 'a', label: 'Ren shareholder', isCorrect: false, feedback: 'Mer balansert.' },
          { id: 'b', label: 'Nær stakeholder-modellen — sterk ansattvern og samfunnsansvar i lov', isCorrect: true, feedback: 'Riktig! Nordisk modell.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Kulturelt mønster.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strukturelt mønster.' },
        ],
        espenTip: 'Bedriftsdemokrati, ansatte i styret, hovedavtaler — Norge har stakeholder-tradisjon.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🌍',
    title: 'FNs Bærekraftsmål (SDG)',
    quote: '17 mål, en felles agenda.',
    content: 'FNs 17 bærekraftsmål (Sustainable Development Goals) ble vedtatt 2015 — globalt rammeverk for 2030. Eksempler: Mål 5 (likestilling), Mål 7 (ren energi), Mål 12 (ansvarlig forbruk), Mål 13 (klimaaksjon). Strategisk valg for bedrifter: Velg ut 2-4 mål dere faktisk kan påvirke vesentlig — ikke spre seg på alle 17. Equinor fokuserer på mål 7 og 13. DNB på 5 (kvinner i finans). Knytt mål til konkrete KPIer og rapportering.',
    subpoints: [
      { label: 'FOKUSER', text: 'Velg få mål, gjør dem grundig.' },
      { label: 'MÅLBARE', text: 'Knytt SDG til konkrete bedrifts-KPIer.' },
    ],
    practical: 'Hvilke 2-3 SDG-er er mest relevante for din bedrift?',
    exercises: [
      {
        id: 'ent218-3-1',
        icon: '🌍',
        title: 'SDG',
        question: 'Hvor mange SDG-er finnes?',
        choices: [
          { id: 'a', label: '5', isCorrect: false, feedback: 'Flere.' },
          { id: 'b', label: '17', isCorrect: true, feedback: 'Riktig! Vedtatt 2015.' },
          { id: 'c', label: '50', isCorrect: false, feedback: 'For mange.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert tall.' },
        ],
        espenTip: 'Under hver SDG er det 169 delmål med konkrete indikatorer.',
      },
      {
        id: 'ent218-3-2',
        icon: '🌍',
        title: 'Strategi',
        question: 'Bør bedrifter dekke alle 17?',
        choices: [
          { id: 'a', label: 'Ja, alle', isCorrect: false, feedback: 'Spreder for tynt.' },
          { id: 'b', label: 'Nei — fokuser på 2-4 hvor dere har vesentlig påvirkning', isCorrect: true, feedback: 'Riktig! Strategisk fokus.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
          { id: 'd', label: 'Bare en', isCorrect: false, feedback: 'For smalt også.' },
        ],
        espenTip: 'PwC-undersøkelse: De fleste norske bedrifter velger 3-5 SDG-er. Mer = vannet ut.',
      },
      {
        id: 'ent218-3-3',
        icon: '🌍',
        title: 'Equinor',
        question: 'Hvilke SDG-er er sentrale for Equinor?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valgt.' },
          { id: 'b', label: 'SDG 7 (ren energi) og 13 (klimaaksjon) — kjernevirksomhet', isCorrect: true, feedback: 'Riktig! Strategisk fokus.' },
          { id: 'c', label: 'Bare alle', isCorrect: false, feedback: 'Fokusert.' },
          { id: 'd', label: 'Bare 1', isCorrect: false, feedback: 'Flere.' },
        ],
        espenTip: 'Equinors havvind- og hydrogen-satsninger er konkret oppfølging av SDG 7 og 13.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🤔',
    title: 'Etiske dilemmaer i ledelse',
    quote: 'Når det riktige er det dyre.',
    content: 'Etiske dilemmaer oppstår når økonomiske mål kolliderer med moralske verdier. Eksempler: Outsource produksjon til land med dårlige arbeidsforhold, lønne kvinner og menn likt selv om markedet ikke krever det, kutte i sikkerhet for bedre marginer. Etiske rammeverk hjelper: Konsekvensetikk (utilitarisme — størst nytte for flest), pliktetikk (Kant — handle som det er en regel for alle), dydsetikk (Aristoteles — hva ville en god person gjøre).',
    subpoints: [
      { label: 'KONFLIKT', text: 'Etiske valg er ofte mellom to gode hensyn.' },
      { label: 'RAMMEVERK', text: 'Bruk struktur for å tenke gjennom dilemmaer.' },
    ],
    practical: 'Hvilket etisk dilemma har du selv stått i på jobben?',
    exercises: [
      {
        id: 'ent218-4-1',
        icon: '🤔',
        title: 'Utilitarisme',
        question: 'Hva er utilitarisme?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Etisk teori.' },
          { id: 'b', label: 'Det riktige er det som gir størst total nytte for flest', isCorrect: true, feedback: 'Riktig! Konsekvensetikk.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Etisk rammeverk.' },
          { id: 'd', label: 'Bare nytte', isCorrect: false, feedback: 'Mer presist — total nytte.' },
        ],
        espenTip: 'Bentham og Mill — populært for praktiske beslutninger, men kan rettferdiggjøre å skade få for å hjelpe mange.',
      },
      {
        id: 'ent218-4-2',
        icon: '🤔',
        title: 'Kant',
        question: 'Hva er Kants kategoriske imperativ?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Etisk prinsipp.' },
          { id: 'b', label: 'Handle slik at handlingen kunne være regel for alle', isCorrect: true, feedback: 'Riktig! Pliktetikk.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert prinsipp.' },
          { id: 'd', label: 'Bare nytte', isCorrect: false, feedback: 'Konsekvenser ikke alt.' },
        ],
        espenTip: 'Kants test: Hvis alle gjorde dette, ville det fortsatt være riktig? Hvis nei, ikke gjør det.',
      },
      {
        id: 'ent218-4-3',
        icon: '🤔',
        title: 'Dydsetikk',
        question: 'Hva er dydsetikk?',
        choices: [
          { id: 'a', label: 'Bare regler', isCorrect: false, feedback: 'Annet rammeverk.' },
          { id: 'b', label: 'Hva ville en person med god karakter gjøre i denne situasjonen?', isCorrect: true, feedback: 'Riktig! Aristoteles.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Klassisk etikk.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Karakter-etikk.' },
        ],
        espenTip: 'Mindre rigid enn pliktetikk, mer kontekstavhengig. Bygger på praktisk visdom.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🚫',
    title: 'Grønnvasking og omdømme',
    quote: 'Det som ikke er ekte, blir avslørt.',
    content: 'Grønnvasking (greenwashing): Bedrifter markedsfører bærekraft de ikke faktisk leverer. Eksempler: Bilprodusenter som påstår "miljøvennlig" mens de selger SUV-er, oljeselskaper som lager grønne kampanjer. Konsekvenser: Tap av tillit, regulatoriske bøter (EU-direktiv kommer 2026), kunde-boikotter. Forbrukerrådet og media holder øye. Norske eksempler: Tide bussene fikk kritikk for "grønne" busser med diesel. Strategi: Bare påstå det dere kan dokumentere.',
    subpoints: [
      { label: 'EKTHET', text: 'Si bare det dere kan dokumentere.' },
      { label: 'JURIDISK', text: 'EU-direktiv mot grønnvasking kommer.' },
    ],
    practical: 'Har bedriften din risikert grønnvasking-anklager?',
    exercises: [
      {
        id: 'ent218-5-1',
        icon: '🚫',
        title: 'Definisjon',
        question: 'Hva er grønnvasking?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert begrep.' },
          { id: 'b', label: 'Markedsføring av bærekraft som ikke leveres i praksis', isCorrect: true, feedback: 'Riktig! Klassisk definisjon.' },
          { id: 'c', label: 'Bare PR', isCorrect: false, feedback: 'Spesifikt om miljø.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Markedsføringspraksis.' },
        ],
        espenTip: 'Forbrukertilsynet kan bøtelegge for villedende miljømarkedsføring.',
      },
      {
        id: 'ent218-5-2',
        icon: '🚫',
        title: 'Konsekvens',
        question: 'Hva er kostnaden ved grønnvasking?',
        choices: [
          { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Stor kostnad.' },
          { id: 'b', label: 'Tap av tillit, kundeflukt, bøter, omdømmeskade', isCorrect: true, feedback: 'Riktig! Mange konsekvenser.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkrete konsekvenser.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'Volkswagen Dieselgate kostet 30+ milliarder USD og varig omdømmeskade.',
      },
      {
        id: 'ent218-5-3',
        icon: '🚫',
        title: 'Forebygging',
        question: 'Hvordan unngår man grønnvasking?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Mer enn juridisk.' },
          { id: 'b', label: 'Si bare det som kan dokumenteres med tall og tredjepart', isCorrect: true, feedback: 'Riktig! Substans før påstand.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Aldri snakke om miljø', isCorrect: false, feedback: 'For defensivt.' },
        ],
        espenTip: 'Sertifiseringer (Svanemerket, ISO 14001, B-Corp) gir uavhengig validering.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '📜',
    title: 'Code of Conduct',
    quote: 'Skrevne regler for hvordan vi oppfører oss.',
    content: 'Etiske retningslinjer (Code of Conduct) er bedriftens skrevne kjøreregler for ansatte og leverandører. Tema: Antikorrupsjon, gaver og representasjon, interessekonflikter, varsling, diskriminering, miljø, datasikkerhet. Norske bedrifter må også følge åpenhetsloven (2022): Aktsomhetsvurdering for menneskerettigheter og anstendige arbeidsforhold i leverandørkjeden. Equinor og DNB har omfattende Code of Conduct med årlig opplæring. Mindre bedrifter trenger enklere versjoner.',
    subpoints: [
      { label: 'KONKRET', text: 'Klare eksempler på akseptabel og uakseptabel atferd.' },
      { label: 'ÅPENHETSLOVEN', text: 'Krav til aktsomhet i leverandørkjeden — alle bedrifter over 50 ansatte.' },
    ],
    practical: 'Har din bedrift en skriftlig Code of Conduct?',
    exercises: [
      {
        id: 'ent218-6-1',
        icon: '📜',
        title: 'Innhold',
        question: 'Typiske temaer i Code of Conduct?',
        choices: [
          { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Mange temaer.' },
          { id: 'b', label: 'Antikorrupsjon, gaver, interessekonflikter, varsling, diskriminering', isCorrect: true, feedback: 'Riktig! Bredt.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Atferdsregler.' },
        ],
        espenTip: 'En god Code of Conduct har konkrete eksempler — ikke bare prinsipper.',
      },
      {
        id: 'ent218-6-2',
        icon: '📜',
        title: 'Åpenhetsloven',
        question: 'Hva krever åpenhetsloven (2022)?',
        choices: [
          { id: 'a', label: 'Bare regnskap', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'b', label: 'Aktsomhetsvurdering av menneskerettigheter og arbeidsforhold i leverandørkjeden', isCorrect: true, feedback: 'Riktig! Sentral lov.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret krav.' },
          { id: 'd', label: 'Bare miljø', isCorrect: false, feedback: 'Også menneskerettigheter.' },
        ],
        espenTip: 'Loven gjelder alle bedrifter over 50 ansatte / 70 mill kr omsetning. Forbrukertilsynet håndhever.',
      },
      {
        id: 'ent218-6-3',
        icon: '📜',
        title: 'Implementering',
        question: 'Hva er nøkkelen til effektiv Code of Conduct?',
        choices: [
          { id: 'a', label: 'Bare PR', isCorrect: false, feedback: 'Reell forankring.' },
          { id: 'b', label: 'Opplæring, eksempler, varslingskanaler, oppfølging av brudd', isCorrect: true, feedback: 'Riktig! Levende dokument.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare på veggen', isCorrect: false, feedback: 'Lett å skrive, vanskelig å leve.' },
        ],
        espenTip: 'En Code of Conduct uten håndhevelse er verre enn ingen — gir falsk sikkerhet.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '💚',
    title: 'Sosialt entreprenørskap',
    quote: 'Forretning som løser sosiale problemer.',
    content: 'Sosiale entreprenører bruker forretningsmodeller for å løse samfunnsproblemer. Skille fra veldedighet: Inntektene må dekke kostnadene, men profitt er ikke hovedmål. Eksempler: Yunus Grameen Bank (mikrofinans, Nobelpris), TOMS (kjøp en, gi en), norske Stiftelsen Tinngården (rusrehabilitering gjennom arbeid), Sammen om en Jobb (rekruttering for marginale grupper). B-Corp-sertifisering verdsetter samfunnsformål. Stadig flere unge gründere velger denne modellen.',
    subpoints: [
      { label: 'BÆREKRAFTIG', text: 'Selv-finansierende, ikke avhengig av donasjoner.' },
      { label: 'IMPACT', text: 'Måles i sosial effekt, ikke bare profitt.' },
    ],
    practical: 'Hvilket samfunnsproblem kunne din bedrift bidra til å løse?',
    exercises: [
      {
        id: 'ent218-7-1',
        icon: '💚',
        title: 'Definisjon',
        question: 'Hva kjennetegner sosialt entreprenørskap?',
        choices: [
          { id: 'a', label: 'Bare veldedighet', isCorrect: false, feedback: 'Forretningsmodell, ikke veldedighet.' },
          { id: 'b', label: 'Forretningsmodell som løser samfunnsproblem — selvfinansierende', isCorrect: true, feedback: 'Riktig! Hybridmodell.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert konsept.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Forretningsform.' },
        ],
        espenTip: 'Skiller seg fra både ren bedrift (profitt-først) og NGO (donasjon-finansiert).',
      },
      {
        id: 'ent218-7-2',
        icon: '💚',
        title: 'Yunus',
        question: 'Hva gjorde Muhammad Yunus?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Banebrytende arbeid.' },
          { id: 'b', label: 'Etablerte mikrofinans for fattige i Bangladesh — Nobelpris 2006', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
          { id: 'c', label: 'Bare bank', isCorrect: false, feedback: 'Sosial misjon.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Sosialt entreprenørskap.' },
        ],
        espenTip: 'Grameen Bank har lånt ut milliarder dollar i mikrolån, hovedsakelig til kvinner.',
      },
      {
        id: 'ent218-7-3',
        icon: '💚',
        title: 'B-Corp',
        question: 'Hva er B-Corp-sertifisering?',
        choices: [
          { id: 'a', label: 'Bare regnskap', isCorrect: false, feedback: 'Bredere.' },
          { id: 'b', label: 'Sertifisering for bedrifter som balanserer profitt og samfunnsformål', isCorrect: true, feedback: 'Riktig! Internasjonal merkeordning.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret sertifisering.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Frivillig sertifisering.' },
        ],
        espenTip: 'B-Lab driver sertifiseringen. 7000+ B-Corps globalt — Patagonia og Ben & Jerry\'s er kjente.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '📋',
    title: 'ESG-rapportering',
    quote: 'Det som måles, blir styrt.',
    content: 'ESG (Environmental, Social, Governance) er rammeverket investorer bruker for bærekrafts-vurdering. EUs CSRD-direktiv (Corporate Sustainability Reporting Directive) krever omfattende ESG-rapportering for store selskaper fra 2024-2026. ESRS-standardene (European Sustainability Reporting Standards) detaljerer hva som skal rapporteres. Norske krav: Regnskapsloven §3-3c (samfunnsansvar). Verktøy: GRI Standards, SASB, TCFD (klimarisiko). Stadig flere investorer screen-er på ESG-skår.',
    subpoints: [
      { label: 'CSRD', text: 'EU-direktiv ruller ut omfattende rapporteringskrav 2024-2026.' },
      { label: 'INVESTORKRAV', text: 'ESG-skår påvirker tilgang til kapital.' },
    ],
    practical: 'Rapporterer din bedrift på ESG i dag?',
    exercises: [
      {
        id: 'ent218-8-1',
        icon: '📋',
        title: 'ESG',
        question: 'Hva står ESG for?',
        choices: [
          { id: 'a', label: 'Bare miljø', isCorrect: false, feedback: 'Tre dimensjoner.' },
          { id: 'b', label: 'Environmental, Social, Governance', isCorrect: true, feedback: 'Riktig! Klassisk forkortelse.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Standard rammeverk.' },
        ],
        espenTip: 'E = klima, ressurser. S = ansatte, lokalsamfunn. G = styring, etikk, åpenhet.',
      },
      {
        id: 'ent218-8-2',
        icon: '📋',
        title: 'CSRD',
        question: 'Hva er CSRD?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikk direktiv.' },
          { id: 'b', label: 'EU-direktiv som krever omfattende bærekrafts-rapportering', isCorrect: true, feedback: 'Riktig! Stort regelverk.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret regelverk.' },
          { id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Phasing inn for ulike størrelser.' },
        ],
        espenTip: 'Først store børsnoterte 2024, deretter store ikke-noterte 2025, så SMB 2026.',
      },
      {
        id: 'ent218-8-3',
        icon: '📋',
        title: 'Bruk',
        question: 'Hvorfor er ESG viktig for kapitaltilgang?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Markedseffekt.' },
          { id: 'b', label: 'Investorer screener — dårlig ESG = lavere tilgang og høyere rente', isCorrect: true, feedback: 'Riktig! Kapitalmarkedseffekt.' },
          { id: 'c', label: 'Bare PR', isCorrect: false, feedback: 'Reell finansiell effekt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Markedsdrevet.' },
        ],
        espenTip: 'Norske banker (DNB, Nordea) priser bærekrafts-koblede lån — bedre ESG = lavere rente.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '🛡️',
    title: 'Korrupsjon og antikorrupsjon',
    quote: 'Smøring er aldri smart.',
    content: 'Korrupsjon: Misbruk av makt for personlig vinning. Norske ledere må følge norsk straffelov (§§387-389) og US Foreign Corrupt Practices Act ved internasjonal virksomhet (gjelder dollar-transaksjoner). Vanlige fallgruver: Gaver til offentlige tjenestepersoner, "facilitation payments" i u-land, mellomledd som betaler bestikkelser. Forebygging: Klare regler i Code of Conduct, opplæring, due diligence på partnere, varslingskanaler. Yara-saken (2014): 295 mill kr i bot for korrupsjon i Libya og India.',
    subpoints: [
      { label: 'NULLTOLERANSE', text: 'Korrupsjon er aldri akseptabelt — uansett hvor.' },
      { label: 'GLOBAL', text: 'Norske ledere kan straffes for korrupsjon i utlandet.' },
    ],
    practical: 'Har bedriften din rutiner for å avdekke korrupsjon?',
    exercises: [
      {
        id: 'ent218-9-1',
        icon: '🛡️',
        title: 'Definisjon',
        question: 'Hva er korrupsjon?',
        choices: [
          { id: 'a', label: 'Bare gaver', isCorrect: false, feedback: 'Bredere.' },
          { id: 'b', label: 'Misbruk av betrodd makt for personlig eller bedriftens vinning', isCorrect: true, feedback: 'Riktig! Klassisk definisjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert begrep.' },
          { id: 'd', label: 'Bare politisk', isCorrect: false, feedback: 'Også privat sektor.' },
        ],
        espenTip: 'Transparency Internationals definisjon. Norge er blant minst korrupte land — men ikke immune.',
      },
      {
        id: 'ent218-9-2',
        icon: '🛡️',
        title: 'Yara',
        question: 'Hva skjedde i Yara-saken?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret sak.' },
          { id: 'b', label: 'Yara fikk 295 mill kr i bot for korrupsjon i Libya og India', isCorrect: true, feedback: 'Riktig! Stor norsk sak 2014.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Konkret sak.' },
          { id: 'd', label: 'Ingen sak', isCorrect: false, feedback: 'Stor sak.' },
        ],
        espenTip: 'Tidligere CFO og styreleder ble personlig dømt. Viser at ledere kan stilles til ansvar.',
      },
      {
        id: 'ent218-9-3',
        icon: '🛡️',
        title: 'Forebygging',
        question: 'Hva er beste forebygging?',
        choices: [
          { id: 'a', label: 'Bare retningslinjer', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'b', label: 'Klare regler + opplæring + due diligence + varslingskanaler', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Antikorrupsjon må være levende prosess — ikke et dokument som ligger i skuffen.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌐',
    title: 'Etikk i fremtiden',
    quote: 'Nye dilemmaer krever ny tenkning.',
    content: 'Fremtidens etiske utfordringer: AI-etikk (algoritmisk bias, automatiserte beslutninger, ansvarsforhold), datapersonvern (overvåking, samtykke), klima (rettferdig overgang, klimagjeld), bioteknologi (genredigering, syntetisk biologi). EU AI Act og GDPR setter rammer. Bedrifter trenger etikkomiteer for komplekse beslutninger — DNB og Telenor har dette. Yngre generasjoner krever sterkere etisk profil hos arbeidsgivere. Etikk blir konkurransefortrinn.',
    subpoints: [
      { label: 'AI-ETIKK', text: 'Automatiserte beslutninger reiser nye spørsmål.' },
      { label: 'GENERASJONSSKIFTE', text: 'Yngre arbeidstakere prioriterer etikk høyere.' },
    ],
    practical: 'Hvilken ny etisk utfordring forventer du i din bransje?',
    exercises: [
      {
        id: 'ent218-10-1',
        icon: '🌐',
        title: 'AI',
        question: 'Sentralt etisk spørsmål om AI?',
        choices: [
          { id: 'a', label: 'Bare hastighet', isCorrect: false, feedback: 'Etisk.' },
          { id: 'b', label: 'Bias i data, ansvar for automatiske beslutninger, åpenhet om bruk', isCorrect: true, feedback: 'Riktig! Sentrale dilemmaer.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Etiske spørsmål.' },
        ],
        espenTip: 'EU AI Act trådte i kraft 2024 — graderer AI-systemer etter risiko.',
      },
      {
        id: 'ent218-10-2',
        icon: '🌐',
        title: 'Generasjon',
        question: 'Hva forventer Gen Z av arbeidsgivere?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Mer enn det.' },
          { id: 'b', label: 'Sterk etisk profil, klima-ansvar, mangfold, autentiske verdier', isCorrect: true, feedback: 'Riktig! Generasjonsskifte.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Verdier.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Forventninger.' },
        ],
        espenTip: 'Studier viser at 75% av Gen Z velger arbeidsgiver basert på verdier, ikke bare lønn.',
      },
      {
        id: 'ent218-10-3',
        icon: '🌐',
        title: 'Konkurransefortrinn',
        question: 'Hvordan blir etikk konkurransefortrinn?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Tvert imot — viktig.' },
          { id: 'b', label: 'Tiltrekker talent, kunder, investorer som verdsetter ansvar', isCorrect: true, feedback: 'Riktig! Strategisk verdi.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Markedseffekt.' },
        ],
        espenTip: 'Stormberg, Kahoot og Cognite konkurrerer på verdier — ikke bare produkt og pris.',
      },
    ],
  },
]

export default function CsrEtikkModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-18"
      moduleTitle="CSR og etikk"
      moduleIcon="🌱"
      storageKey="learning-ent2-csr-etikk"
      completeRoute="/learning/ent2/csr-etikk/complete"
      phases={phases}
      intro="Corporate social responsibility, etiske dilemmaer og bærekraftsrapportering for vekstbedrifter — fra Triple Bottom Line til ESG og åpenhetsloven."
      vissteduAt="Norske selskaper rangeres høyt globalt på CSR. Likevel viser saker som Yara-korrupsjonen at også norske bedrifter må jobbe systematisk med etikk."
      espenSier="Etikk er ikke en kostnad — det er en investering i langsiktig tillit. De som vinner tilliten, vinner også markedet."
      presentationLink={{ route: '/learning/presentations/ent2/csr-etikk', description: 'CSR og etikk — 10 slides' }}
    />
  )
}
