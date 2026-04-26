import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '💸',
    title: 'Likviditet — bedriftens blodtilførsel',
    quote: 'Overskudd er en mening, kontanter er et faktum.',
    content: 'Likviditet er evnen til å betale regninger når de forfaller. Lønnsomhet og likviditet er ikke det samme — bedrifter kan vokse seg til døde med god lønnsomhet og dårlig likviditet. Eksempel: Bedrift selger med 6 måneders kreditt, må betale lønn og leverandører hver måned. Klassisk vekstklemme. Norske scaleups som Oda og Kahoot har erfart hvordan rask vekst tærer på kontanter. Likviditet skiller suksess fra konkurs.',
    subpoints: [
      { label: 'CASH', text: 'Kontanter er konge — uavhengig av regnskapsoverskudd.' },
      { label: 'VEKSTKLEMME', text: 'Rask vekst krever ofte mer kapital før profitt.' },
    ],
    practical: 'Hvor lang likviditets-runway har bedriften din i dag?',
    exercises: [
      {
        id: 'ent217-1-1',
        icon: '💸',
        title: 'Definisjon',
        question: 'Hva er likviditet?',
        choices: [
          { id: 'a', label: 'Bare overskudd', isCorrect: false, feedback: 'Forskjellig.' },
          { id: 'b', label: 'Evnen til å betale regninger når de forfaller', isCorrect: true, feedback: 'Riktig! Cash on hand.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansbegrep.' },
        ],
        espenTip: 'Konkurs skyldes nesten alltid likviditetsmangel — ikke nødvendigvis manglende lønnsomhet.',
      },
      {
        id: 'ent217-1-2',
        icon: '💸',
        title: 'Forskjell',
        question: 'Lønnsomhet vs likviditet?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Ulikt.' },
          { id: 'b', label: 'Lønnsomhet = inntekt-kostnad. Likviditet = kontanter tilgjengelig', isCorrect: true, feedback: 'Riktig! Klart skille.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansforskjell.' },
        ],
        espenTip: 'Lønnsom bedrift kan gå konkurs. Ulønnsom bedrift kan ha god likviditet en stund.',
      },
      {
        id: 'ent217-1-3',
        icon: '💸',
        title: 'Vekstklemme',
        question: 'Hva er "vokse seg til døde"?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Klassisk fenomen.' },
          { id: 'b', label: 'Salget vokser raskere enn cash kommer inn — slipper opp', isCorrect: true, feedback: 'Riktig! Likviditetsklemme.' },
          { id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'Likviditetsproblem.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Likviditetsfenomen.' },
        ],
        espenTip: 'Lange kundekreditter + rask varelagervekst + vekst i lønnskostnader = klassisk dødsspiral.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔄',
    title: 'Arbeidskapital og styring',
    quote: 'Penger som ligger fast er penger som kunne jobbet.',
    content: 'Arbeidskapital = omløpsmidler - kortsiktig gjeld. Tre komponenter: Varelager (tied-up cash), kundefordringer (penger ute), leverandørgjeld (kortsiktig finansiering). Cash conversion cycle = lager-dager + kundeforde-dager - leverandør-dager. Lavere CCC = bedre likviditet. Norske dagligvarer (Rema, Kiwi) har negativ CCC: Selger varene før de betaler leverandørene. Tomra og Equinor har positiv men optimalisert CCC.',
    subpoints: [
      { label: 'CCC', text: 'Cash conversion cycle viser hvor lenge penger sitter fast.' },
      { label: 'OPTIMALISERING', text: 'Lavere lager + raskere innkreving + lengre leverandørkreditt.' },
    ],
    practical: 'Hva er den lengste komponenten i din arbeidskapital?',
    exercises: [
      {
        id: 'ent217-2-1',
        icon: '🔄',
        title: 'Komponenter',
        question: 'Tre hovedkomponenter i arbeidskapital?',
        choices: [
          { id: 'a', label: 'Bare lager', isCorrect: false, feedback: 'Tre deler.' },
          { id: 'b', label: 'Varelager, kundefordringer, leverandørgjeld', isCorrect: true, feedback: 'Riktig! Klassisk triade.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare bank', isCorrect: false, feedback: 'Annet.' },
        ],
        espenTip: 'Bygg cash-flow-budsjett som viser hver av disse separat — gir kontroll.',
      },
      {
        id: 'ent217-2-2',
        icon: '🔄',
        title: 'CCC',
        question: 'Hva er cash conversion cycle?',
        choices: [
          { id: 'a', label: 'Bare lager', isCorrect: false, feedback: 'Sammensatt mål.' },
          { id: 'b', label: 'Lager-dager + kundeforde-dager - leverandør-dager', isCorrect: true, feedback: 'Riktig! Helhetlig mål.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert formel.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansmål.' },
        ],
        espenTip: 'Amazon hadde -30 dager CCC i 2017 — solgte før de betalte leverandører. Strategi-fortrinn.',
      },
      {
        id: 'ent217-2-3',
        icon: '🔄',
        title: 'Optimalisering',
        question: 'Hvordan reduseres CCC?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'b', label: 'Mindre lager, raskere innkreving, lengre leverandørbetaling', isCorrect: true, feedback: 'Riktig! Tre håndtak.' },
          { id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'Bredere.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Faktura per dag i stedet for månedlig + kraftig purregrad gir ofte 10-30 dager spart.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💼',
    title: 'Finansieringskilder (avansert)',
    quote: 'Riktig kapital til riktig fase.',
    content: 'Vekstbedrifter går gjennom kapitalfaser: Pre-seed (gründerne, FFF), Seed (engleinvestorer, små VC), Serie A-C (Venture Capital), Vekstkapital (Private Equity), Børsnotering (IPO). Norske eksempler: Cognite (PE-eid), Kahoot (børs Oslo Børs), Oda (VC-finansiert). Hver fase har egne investortyper, krav til selskapets modenhet og forventet avkastning. Kapitaltrappen — feilvalg av investortype kan begrense fremtidige muligheter.',
    subpoints: [
      { label: 'KAPITALTRAPPEN', text: 'Investortype må matche bedriftens fase.' },
      { label: 'KOMPATIBILITET', text: 'Tidlige investorer kan blokkere senere finansiering.' },
    ],
    practical: 'Hvilken kapitalfase er bedriften din i nå?',
    exercises: [
      {
        id: 'ent217-3-1',
        icon: '💼',
        title: 'VC',
        question: 'Hva er Venture Capital?',
        choices: [
          { id: 'a', label: 'Banklån', isCorrect: false, feedback: 'Egenkapital.' },
          { id: 'b', label: 'Profesjonell egenkapital til skalerbare vekstbedrifter', isCorrect: true, feedback: 'Riktig! VC-definisjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Investortype.' },
        ],
        espenTip: 'Norske VC-er: Idekapital, Investinor, Northzone. Forventer 10x retur på vellykkede.',
      },
      {
        id: 'ent217-3-2',
        icon: '💼',
        title: 'PE',
        question: 'Hva skiller PE fra VC?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjell.' },
          { id: 'b', label: 'PE = etablerte selskaper med kontantstrøm. VC = vekst-startup', isCorrect: true, feedback: 'Riktig! Klart skille.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Investortype.' },
        ],
        espenTip: 'Norske PE: FSN Capital, Norvestor, Verdane. Tar ofte over og restrukturerer modne bedrifter.',
      },
      {
        id: 'ent217-3-3',
        icon: '💼',
        title: 'IPO',
        question: 'Hva er en IPO?',
        choices: [
          { id: 'a', label: 'Bare lån', isCorrect: false, feedback: 'Børsnotering.' },
          { id: 'b', label: 'Initial Public Offering — første gang aksjer selges på børsen', isCorrect: true, feedback: 'Riktig! Børsnotering.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert prosess.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Kapitaltransaksjon.' },
        ],
        espenTip: 'Oslo Børs har Main Market, Euronext Growth (vekstmarked), Euronext Expand. Ulike krav.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🏦',
    title: 'Lånefinansiering',
    quote: 'Gjeld er billigere enn egenkapital — men risikabelt.',
    content: 'Lånefinansiering: Banklån (fastrente eller flytende), kassekreditt (fleksibel), obligasjonslån (større beløp, ofte børsnotert). Sikkerhet: Pant i eiendom, varelager, kundefordringer. Personlig kausjon krever ofte for små bedrifter. Norske banker (DNB, Nordea, SR-Bank) krever ofte 30% egenkapital for bedriftslån. Renten består av referanserente (Nibor) + margin basert på risiko. Skattefradraget på rente gjør lån billigere enn EK.',
    subpoints: [
      { label: 'BILLIGERE', text: 'Lånerente er fradragsberettiget — gir skattefordel.' },
      { label: 'RISIKO', text: 'Faste forpliktelser uavhengig av resultat.' },
    ],
    practical: 'Har bedriften din kassekreditt? Hvor stor brukes den?',
    exercises: [
      {
        id: 'ent217-4-1',
        icon: '🏦',
        title: 'Typer',
        question: 'Hvilke låneformer er typiske?',
        choices: [
          { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Flere typer.' },
          { id: 'b', label: 'Banklån, kassekreditt, obligasjonslån, leverandørkreditt', isCorrect: true, feedback: 'Riktig! Bredt spekter.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansieringsformer.' },
        ],
        espenTip: 'Kassekreditt er fleksibel kortsiktig, banklån er langsiktig fastlån. Bruk begge strategisk.',
      },
      {
        id: 'ent217-4-2',
        icon: '🏦',
        title: 'Sikkerhet',
        question: 'Hva er pant?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Juridisk konsept.' },
          { id: 'b', label: 'Sikkerhet for lån — banken kan ta verdien ved mislighold', isCorrect: true, feedback: 'Riktig! Sikkerhetsstillelse.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Sikkerhet.' },
          { id: 'd', label: 'Bare bank', isCorrect: false, feedback: 'Konkret konsept.' },
        ],
        espenTip: 'Vanlige pantefelt: Eiendom, varelager, kundefordringer (factoring), maskiner. Tinglyses i Brønnøysund.',
      },
      {
        id: 'ent217-4-3',
        icon: '🏦',
        title: 'Skatteskjold',
        question: 'Hvorfor er lån billigere enn egenkapital?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturell grunn.' },
          { id: 'b', label: 'Renter er skattefradragsberettiget, utbytte ikke', isCorrect: true, feedback: 'Riktig! Skatteasymmetri.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Skatteregel.' },
          { id: 'd', label: 'Bare bank', isCorrect: false, feedback: 'Skattefordel.' },
        ],
        espenTip: 'Med 22% selskapsskatt er etter-skatt rente = nominell rente × 0.78. Stor fordel.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🚛',
    title: 'Leasing og factoring',
    quote: 'Frigjør kapital uten å eie.',
    content: 'Leasing: Leie maskiner/utstyr i stedet for å kjøpe. Operasjonell (kortere, ingen eierskap) eller finansiell (lengre, vei mot eierskap). Bevarer likviditet, gir skattefradrag på leie. Factoring: Selge kundefordringer til finanshus mot rabatt. Får cash umiddelbart. Norske aktører: SG Finans, Nordea Finance, DNB Finans. Brukes mye i byggebransjen og industri. Kostnad: 1-3% av fakturabeløp + rente.',
    subpoints: [
      { label: 'KAPITALFRI', text: 'Leasing og factoring frigjør EK til vekst.' },
      { label: 'KOSTNAD', text: 'Bekvemmelighet koster — vurder mot egen finansiering.' },
    ],
    practical: 'Bruker bedriften din leasing eller factoring?',
    exercises: [
      {
        id: 'ent217-5-1',
        icon: '🚛',
        title: 'Leasing',
        question: 'Hva er leasing?',
        choices: [
          { id: 'a', label: 'Bare lån', isCorrect: false, feedback: 'Annen form.' },
          { id: 'b', label: 'Leie av eiendel mot periodisk betaling i stedet for kjøp', isCorrect: true, feedback: 'Riktig! Definisjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansieringsform.' },
        ],
        espenTip: 'Yrkeskjøretøy og maskiner ofte leaset. Frigjør kapital og gir fleksibilitet.',
      },
      {
        id: 'ent217-5-2',
        icon: '🚛',
        title: 'Factoring',
        question: 'Hva er factoring?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret tjeneste.' },
          { id: 'b', label: 'Salg av kundefordringer til finanshus for raskere cash', isCorrect: true, feedback: 'Riktig! Likviditetstjeneste.' },
          { id: 'c', label: 'Bare lån', isCorrect: false, feedback: 'Annen mekanisme.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansiell tjeneste.' },
        ],
        espenTip: 'Factoring uten regress = finanshuset tar tap. Med regress = du har risikoen om kunde ikke betaler.',
      },
      {
        id: 'ent217-5-3',
        icon: '🚛',
        title: 'Når',
        question: 'Når egner factoring seg?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Egner seg i visse tilfeller.' },
          { id: 'b', label: 'Lange kundekreditter, vekstklemme, sesongbasert virksomhet', isCorrect: true, feedback: 'Riktig! Praktiske bruksområder.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Praktisk verktøy.' },
        ],
        espenTip: 'Bygg- og industribedrifter med 60-90 dagers kreditt får vital cash via factoring.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '⚖️',
    title: 'Kapitalstruktur (giring)',
    quote: 'Riktig blanding av gjeld og egenkapital.',
    content: 'Kapitalstruktur er forholdet mellom egenkapital (EK) og gjeld (D). Giring = D/EK. Høyere giring = høyere avkastning på EK i gode tider, men høyere risiko. Modigliani-Miller: Med skatt finnes optimal struktur — gjeld gir skatteskjold, men risikerer konkurs. Norske industribedrifter har typisk 30-50% EK. Banker krever ofte minimum EK-andel i covenants. Pecking order: Internt cash først, deretter gjeld, EK sist.',
    subpoints: [
      { label: 'OPTIMUM', text: 'For mye gjeld = konkursrisiko, for lite = unytter skattefradrag.' },
      { label: 'COVENANTS', text: 'Lånebetingelser begrenser videre giring.' },
    ],
    practical: 'Hva er forholdet mellom EK og gjeld i din bedrift?',
    exercises: [
      {
        id: 'ent217-6-1',
        icon: '⚖️',
        title: 'Giring',
        question: 'Hva er giring?',
        choices: [
          { id: 'a', label: 'Bare overskudd', isCorrect: false, feedback: 'Forholdsmål.' },
          { id: 'b', label: 'Forholdet mellom gjeld og egenkapital', isCorrect: true, feedback: 'Riktig! Gearing ratio.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansmål.' },
        ],
        espenTip: 'Norske banker har typisk giring 10-15. Industribedrifter 0.5-2.0. Ulike normer.',
      },
      {
        id: 'ent217-6-2',
        icon: '⚖️',
        title: 'MM',
        question: 'Hva sa Modigliani-Miller?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Klassisk teori.' },
          { id: 'b', label: 'Med skatt: Optimal struktur balanserer skatteskjold mot konkursrisiko', isCorrect: true, feedback: 'Riktig! Trade-off teori.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Finansteori.' },
          { id: 'd', label: 'Bare en', isCorrect: false, feedback: 'Komplekst rammeverk.' },
        ],
        espenTip: 'Nobelpris til Modigliani 1985, Miller 1990. Fortsatt grunnstein i corporate finance.',
      },
      {
        id: 'ent217-6-3',
        icon: '⚖️',
        title: 'Covenants',
        question: 'Hva er låne-covenants?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Lånebetingelser.' },
          { id: 'b', label: 'Vilkår i låneavtalen som låntaker må overholde — f.eks. minimum EK-grad', isCorrect: true, feedback: 'Riktig! Beskytter banken.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Avtalemessig.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Avtalevilkår.' },
        ],
        espenTip: 'Brudd på covenants = banken kan kalle hele lånet. Sjekk dem før du tar opp ny gjeld.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '💱',
    title: 'Valutarisiko',
    quote: 'Norske kroner inn, dollar ut.',
    content: 'Valutarisiko oppstår når inntekter og kostnader er i ulike valutaer, eller når balansen har valuta-eksponering. Eksempel: Tomra fakturerer i euro, har norske lønnskostnader. Hvis NOK styrkes, krymper marginen. Sikringsverktøy: Forwardkontrakter (lås kurs på fremtidig dato), valutaopsjoner (rett, ikke plikt), naturlige sikringer (matche valuta). DNB Markets, Nordea Markets tilbyr disse til bedrifter. Selv små eksportører trenger valutastrategi.',
    subpoints: [
      { label: 'EKSPONERING', text: 'Identifiser hvor du har valuta-mismatch.' },
      { label: 'SIKRING', text: 'Forwards låser kurs, opsjoner gir fleksibilitet mot premie.' },
    ],
    practical: 'Hvor mye av bedriftens omsetning er i utenlandsk valuta?',
    exercises: [
      {
        id: 'ent217-7-1',
        icon: '💱',
        title: 'Risiko',
        question: 'Hva er valutarisiko?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'b', label: 'Risiko for at valutakursendring påvirker bedriftens resultat', isCorrect: true, feedback: 'Riktig! Klassisk definisjon.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsrisiko.' },
          { id: 'd', label: 'Bare salg', isCorrect: false, feedback: 'Bredere.' },
        ],
        espenTip: 'NOK svinger ofte 10-20% mot USD/EUR i året. Stor effekt på marginer.',
      },
      {
        id: 'ent217-7-2',
        icon: '💱',
        title: 'Forward',
        question: 'Hva er en forwardkontrakt?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Finansinstrument.' },
          { id: 'b', label: 'Avtale om å kjøpe/selge valuta til avtalt kurs på fremtidig dato', isCorrect: true, feedback: 'Riktig! Sikringsverktøy.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Konkret instrument.' },
          { id: 'd', label: 'Bare aksjer', isCorrect: false, feedback: 'Valuta.' },
        ],
        espenTip: 'Eksportør med USD-faktura om 90 dager kan låse kursen i dag. Eliminerer valutarisiko.',
      },
      {
        id: 'ent217-7-3',
        icon: '💱',
        title: 'Naturlig',
        question: 'Hva er naturlig valutasikring?',
        choices: [
          { id: 'a', label: 'Bare ingenting', isCorrect: false, feedback: 'Aktiv strategi.' },
          { id: 'b', label: 'Matche valuta-inntekter og kostnader internt', isCorrect: true, feedback: 'Riktig! Strukturell sikring.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Equinor har dollar-inntekter og dollar-investeringer — naturlig sikring uten finansielle instrumenter.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '📊',
    title: 'Renterisiko',
    quote: 'Når renten stiger, blir gjeld dyrere.',
    content: 'Renterisiko oppstår fra flytende-rente-lån eller fra reinvestering av obligasjoner. Norge: Kraftig renteøkning fra 2022 (0% til 4.5%) traff bedrifter med flytende lån hardt. Sikring: Renteswap (bytte flytende mot fast), rente-cap (tak), lån med fast rente. Vurder: Hvor lenge skal lånet løpe? Hva tåler bedriften av renteøkning? Norske banker tilbyr renteswapper fra noen mill kr. Renterisiko øker med gjeldsgrad.',
    subpoints: [
      { label: 'STRESSTEST', text: 'Hva tåler dere ved 5% renteøkning?' },
      { label: 'BLANDING', text: 'Mix av fast og flytende reduserer eksponering.' },
    ],
    practical: 'Hva er andelen fast vs flytende rente på din bedrifts gjeld?',
    exercises: [
      {
        id: 'ent217-8-1',
        icon: '📊',
        title: 'Risiko',
        question: 'Hva skaper renterisiko?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'b', label: 'Flytende-rente-lån som blir dyrere ved renteøkning', isCorrect: true, feedback: 'Riktig! Klassisk eksponering.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsrisiko.' },
          { id: 'd', label: 'Bare salg', isCorrect: false, feedback: 'Finansrisiko.' },
        ],
        espenTip: 'Norge gikk fra 0% til 4.5% rente på to år. Mange bedrifter doblet rentebelastning.',
      },
      {
        id: 'ent217-8-2',
        icon: '📊',
        title: 'Swap',
        question: 'Hva er en renteswap?',
        choices: [
          { id: 'a', label: 'Bare lån', isCorrect: false, feedback: 'Sikringsinstrument.' },
          { id: 'b', label: 'Bytte av flytende rente mot fast (eller motsatt)', isCorrect: true, feedback: 'Riktig! Standard sikring.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret instrument.' },
          { id: 'd', label: 'Bare aksjer', isCorrect: false, feedback: 'Rente, ikke aksjer.' },
        ],
        espenTip: 'Bedriften betaler fast rente til banken, banken betaler flytende rente til bedriften. Netto = fast eksponering.',
      },
      {
        id: 'ent217-8-3',
        icon: '📊',
        title: 'Strategi',
        question: 'Hvordan håndteres renterisiko best?',
        choices: [
          { id: 'a', label: 'Aldri tenke på det', isCorrect: false, feedback: 'Aktiv styring.' },
          { id: 'b', label: 'Mix av fast/flytende basert på risikoappetitt og tålegrense', isCorrect: true, feedback: 'Riktig! Balansert.' },
          { id: 'c', label: 'Bare flytende', isCorrect: false, feedback: 'Full eksponering.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert valg.' },
        ],
        espenTip: 'Mange norske bedrifter binder 30-50% av gjelden — gir balanse mellom fleksibilitet og forutsigbarhet.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚠️',
    title: 'Kredittrisiko og motpartsrisiko',
    quote: 'Stor kunde betaler ikke = stort problem.',
    content: 'Kredittrisiko er risiko for at kunder ikke betaler. Konsentrasjonsrisiko: Hvis 50% av omsetning kommer fra én kunde — eksistensiell risiko ved konkurs. Verktøy: Kredittsjekk (Experian, Bisnode), kredittforsikring (Atradius, Euler Hermes), forskuddsbetaling, faktoring uten regress. Norske bedrifter taper milliarder årlig på dårlig kredittstyring. Spesielt utsatt: Bygg, anlegg, transport. Strukturer kredittpolicy med klare grenser.',
    subpoints: [
      { label: 'KONSENTRASJON', text: 'Diversifiser kundebase for å redusere risiko.' },
      { label: 'POLICY', text: 'Klare regler for kredittsjekk og maks-eksponering per kunde.' },
    ],
    practical: 'Hvor mye av din omsetning kommer fra de 3 største kundene?',
    exercises: [
      {
        id: 'ent217-9-1',
        icon: '⚠️',
        title: 'Risiko',
        question: 'Hva er kredittrisiko?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert risiko.' },
          { id: 'b', label: 'Risiko for at motpart ikke kan/vil oppfylle finansielle forpliktelser', isCorrect: true, feedback: 'Riktig! Klassisk definisjon.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Finansrisiko.' },
          { id: 'd', label: 'Bare lager', isCorrect: false, feedback: 'Annen risiko.' },
        ],
        espenTip: 'Trening: Sjekk Brønnøysund-tall + last ned regnskap før du tar stor ordre.',
      },
      {
        id: 'ent217-9-2',
        icon: '⚠️',
        title: 'Forsikring',
        question: 'Hva er kredittforsikring?',
        choices: [
          { id: 'a', label: 'Bare bil', isCorrect: false, feedback: 'Annet område.' },
          { id: 'b', label: 'Forsikring som dekker tap når kunde ikke betaler', isCorrect: true, feedback: 'Riktig! Risikooverføring.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret produkt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Forsikringstype.' },
        ],
        espenTip: 'Atradius og Euler Hermes er de største. Premie 0.1-0.5% av omsetning, dekker 70-90% av tap.',
      },
      {
        id: 'ent217-9-3',
        icon: '⚠️',
        title: 'Konsentrasjon',
        question: 'Hva er konsentrasjonsrisiko?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Risikobegrep.' },
          { id: 'b', label: 'For stor andel av omsetning fra få kunder', isCorrect: true, feedback: 'Riktig! Eksistensiell risiko.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'd', label: 'Bare lager', isCorrect: false, feedback: 'Kundekonsentrasjon.' },
        ],
        espenTip: 'Tommel-fingerregel: Ingen enkelt kunde over 20% av omsetning. Strategi: Aktiv diversifisering.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '📈',
    title: 'Investorrapportering og kommunikasjon',
    quote: 'Eieren vil vite — hold dem oppdatert.',
    content: 'God investorrelasjon (IR) gir tilgang til ny kapital og fleksibilitet i kriser. Standard rapportering: Kvartalsrapport (KPIer, regnskap, kommentarer), årsrapport, styremøter (8-10 per år). Børsnoterte: Strenge IFRS-regler, Oslo Børs-krav om åpenhet. VC-eide: Månedlige investor-updates med metrics. Equinor og DNB har omfattende IR-funksjoner. Hovedregel: Ærlig kommunikasjon, særlig når ting går dårlig — investorer hater overraskelser.',
    subpoints: [
      { label: 'TRANSPARENS', text: 'Åpenhet bygger tillit og fremtidig finansiering.' },
      { label: 'PROAKTIV', text: 'Forklar dårlige nyheter selv — før investor finner ut.' },
    ],
    practical: 'Hva slags rapportering forventer dine investorer?',
    exercises: [
      {
        id: 'ent217-10-1',
        icon: '📈',
        title: 'Frekvens',
        question: 'Hvor ofte rapporterer børsnoterte selskaper?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Lovpålagt.' },
          { id: 'b', label: 'Kvartalsvis (Q-rapporter) + årsrapport', isCorrect: true, feedback: 'Riktig! Standard.' },
          { id: 'c', label: 'Bare årlig', isCorrect: false, feedback: 'Oftere.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Oslo Børs har redusert krav til halvårlig for noen segmenter, men de fleste rapporterer kvartal.',
      },
      {
        id: 'ent217-10-2',
        icon: '📈',
        title: 'Tillit',
        question: 'Hvordan håndtere dårlige nyheter?',
        choices: [
          { id: 'a', label: 'Skjul', isCorrect: false, feedback: 'Risikabelt — ulovlig for noterte.' },
          { id: 'b', label: 'Kommuniser tidlig, tydelig, med plan for forbedring', isCorrect: true, feedback: 'Riktig! Bygger tillit.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Best practice.' },
        ],
        espenTip: 'Investorer kan tilgi dårlige resultater. De tilgir aldri overraskelser eller skjulte problemer.',
      },
      {
        id: 'ent217-10-3',
        icon: '📈',
        title: 'IR',
        question: 'Hva er Investor Relations?',
        choices: [
          { id: 'a', label: 'Bare PR', isCorrect: false, feedback: 'Spesialisert.' },
          { id: 'b', label: 'Strategisk kommunikasjon med investorer og kapitalmarkedet', isCorrect: true, feedback: 'Riktig! Egen funksjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Funksjon.' },
        ],
        espenTip: 'Større børsnoterte har egen IR-direktør. Mindre: CFO eller CEO håndterer.',
      },
    ],
  },
]

export default function LikviditetsstyringFinansrisikoModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-17"
      moduleTitle="Likviditetsstyring og finansrisiko"
      moduleIcon="💸"
      storageKey="learning-ent2-likviditetsstyring-finansrisiko"
      completeRoute="/learning/ent2/likviditetsstyring-finansrisiko/complete"
      phases={phases}
      intro="Bedriftens kontantflyt under vekst — arbeidskapital, VC/PE/IPO, lånefinansiering, leasing, kapitalstruktur og valuta-/renterisiko."
      vissteduAt="Norske scaleups som Oda har hentet over 2 milliarder NOK i flere kapitalrunder. Likviditet og kapitalstruktur er make-or-break for vekst."
      espenSier="Overskudd er en mening — kontanter er et faktum. Hold alltid blikket på cash, særlig når dere vokser raskt."
      presentationLink={{ route: '/learning/presentations/ent2/likviditetsstyring-finansrisiko', description: 'Likviditetsstyring og finansrisiko — 10 slides' }}
    />
  )
}
