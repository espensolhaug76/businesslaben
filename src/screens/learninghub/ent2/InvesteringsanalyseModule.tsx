import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📊',
    title: 'Hva er investeringsanalyse?',
    quote: 'Tall fjerner følelser fra tunge valg.',
    content: 'Investeringsanalyse er strukturert vurdering av om en investering er lønnsom. Brukes ved kjøp av maskiner, lansering av produkter, oppkjøp eller markedsekspansjon. Hovedspørsmål: Er forventet avkastning høyere enn alternativ bruk av kapitalen? Norske selskaper som Equinor, DNB og Aker bruker omfattende investeringsanalyse før hver større beslutning. Verktøyene (NPV, IRR, payback) gir felles språk og strukturert sammenligning.',
    subpoints: [
      { label: 'STRUKTUR', text: 'Sammenlign alternativer på samme grunnlag.' },
      { label: 'BESLUTNING', text: 'Tall + skjønn — ikke tall alene.' },
    ],
    practical: 'Hva er den største investeringen din bedrift har gjort siste året?',
    exercises: [
      {
        id: 'ent216-1-1',
        icon: '📊',
        title: 'Definisjon',
        question: 'Hva er kjernen i investeringsanalyse?',
        choices: [
          { id: 'a', label: 'Bare regnskap', isCorrect: false, feedback: 'Annet område.' },
          { id: 'b', label: 'Strukturert vurdering av om investeringen lønner seg', isCorrect: true, feedback: 'Riktig! Beslutningsgrunnlag.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansiell analyse.' },
        ],
        espenTip: 'Investeringsbeslutninger uten analyse er gambling. Strukturen disiplinerer tenkningen.',
      },
      {
        id: 'ent216-1-2',
        icon: '📊',
        title: 'Bruk',
        question: 'Når brukes investeringsanalyse?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Ofte.' },
          { id: 'b', label: 'Maskinkjøp, oppkjøp, FoU, markedsekspansjon, IT-systemer', isCorrect: true, feedback: 'Riktig! Bredt brukt.' },
          { id: 'c', label: 'Bare ved IPO', isCorrect: false, feedback: 'Mye bredere.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Mange anvendelser.' },
        ],
        espenTip: 'Equinors havvind-investeringer går gjennom omfattende NPV-analyser før godkjenning.',
      },
      {
        id: 'ent216-1-3',
        icon: '📊',
        title: 'Begrensning',
        question: 'Hva er svakheten med investeringsanalyse?',
        choices: [
          { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Har begrensninger.' },
          { id: 'b', label: 'Tallene er bare så gode som forutsetningene', isCorrect: true, feedback: 'Riktig! Garbage in, garbage out.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret begrensning.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Modell-begrensning.' },
        ],
        espenTip: 'Følsomhetsanalyse er nettopp for å håndtere usikre forutsetninger.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '⏳',
    title: 'Tidsverdien av penger',
    quote: '100 kroner i dag er mer verdt enn 100 kroner om ett år.',
    content: 'Penger har tidsverdi: 100 kr i dag kan settes i banken, investeres eller brukes nå. Diskontering oversetter fremtidige beløp til dagens verdi: PV = FV / (1 + r)^n. Diskonteringsrenten r er forventet alternativavkastning. Med r = 8% er 100 kr om 5 år verdt 68 kr i dag. Inflasjon, risiko og likviditetspreferanse gjør at vi krever kompensasjon for å vente. Grunnlaget for all investeringsanalyse.',
    subpoints: [
      { label: 'DISKONTERING', text: 'Fremtidige kroner må regnes om til dagens verdi.' },
      { label: 'RENTEN', text: 'Høyere rente = lavere nåverdi av fremtidige beløp.' },
    ],
    practical: 'Hva ville du tatt: 1000 kr i dag eller 1100 kr om ett år (rente 8%)?',
    exercises: [
      {
        id: 'ent216-2-1',
        icon: '⏳',
        title: 'Prinsipp',
        question: 'Hvorfor er en krone i dag verdt mer enn en krone i morgen?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'b', label: 'Inflasjon, alternativavkastning, risiko og likviditetspreferanse', isCorrect: true, feedback: 'Riktig! Fire grunner.' },
          { id: 'c', label: 'Bare inflasjon', isCorrect: false, feedback: 'Flere grunner.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Økonomisk prinsipp.' },
        ],
        espenTip: 'Selv uten inflasjon ville renten vært positiv — folk foretrekker å forbruke nå.',
      },
      {
        id: 'ent216-2-2',
        icon: '⏳',
        title: 'Formel',
        question: 'Nåverdiformelen?',
        choices: [
          { id: 'a', label: 'PV = FV', isCorrect: false, feedback: 'Mangler diskontering.' },
          { id: 'b', label: 'PV = FV / (1 + r)^n', isCorrect: true, feedback: 'Riktig! Diskontering over n år.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Standardformel.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Matematisk formel.' },
        ],
        espenTip: 'Excel: =NV(rente; periode; ; -fremtidigverdi). Kalkulator også tilgjengelig.',
      },
      {
        id: 'ent216-2-3',
        icon: '⏳',
        title: 'Beregning',
        question: '100 kr om 3 år ved 10% rente — dagens verdi?',
        choices: [
          { id: 'a', label: '100 kr', isCorrect: false, feedback: 'Må diskonteres.' },
          { id: 'b', label: 'Ca 75 kr (100/1.1^3)', isCorrect: true, feedback: 'Riktig! Cirka.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Matematisk.' },
          { id: 'd', label: '0 kr', isCorrect: false, feedback: 'Diskontering reduserer, fjerner ikke.' },
        ],
        espenTip: 'Tommel-fingerregel: 10% rente halverer verdien hvert 7. år (regel om 72).',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💰',
    title: 'Nåverdimetoden (NPV)',
    quote: 'Sum av diskonterte kontantstrømmer.',
    content: 'NPV (Net Present Value) summerer alle fremtidige kontantstrømmer diskontert til dagens verdi, minus initialinvesteringen. Positiv NPV = lønnsom investering. NPV på 0 = akkurat avkastning som krevd. Negativ NPV = ulønnsom. Sammenligner ulike prosjekter på likt grunnlag. Mest brukte metode i finans-industrien. NPV er prinsipielt korrekt — IRR og payback har svakheter.',
    subpoints: [
      { label: 'POSITIV', text: 'NPV > 0 = investeringen øker bedriftens verdi.' },
      { label: 'STANDARD', text: 'Mest anerkjent metode globalt.' },
    ],
    practical: 'Hvilken diskonteringsrente bruker bedriften din i sine NPV-beregninger?',
    exercises: [
      {
        id: 'ent216-3-1',
        icon: '💰',
        title: 'Definisjon',
        question: 'Hva er NPV?',
        choices: [
          { id: 'a', label: 'Bare overskudd', isCorrect: false, feedback: 'Mer presist.' },
          { id: 'b', label: 'Sum av diskonterte fremtidige kontantstrømmer minus initialinvestering', isCorrect: true, feedback: 'Riktig! Komplett definisjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare omsetning', isCorrect: false, feedback: 'Kontantstrøm.' },
        ],
        espenTip: 'Fokus på kontantstrøm (cash), ikke regnskapsmessig overskudd. Forskjellen er ofte stor.',
      },
      {
        id: 'ent216-3-2',
        icon: '💰',
        title: 'Beslutning',
        question: 'Når investerer man ifølge NPV-regelen?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Ved positiv NPV.' },
          { id: 'b', label: 'Når NPV > 0', isCorrect: true, feedback: 'Riktig! Verdiøkende.' },
          { id: 'c', label: 'Når NPV < 0', isCorrect: false, feedback: 'Da taper man verdi.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Klar regel.' },
        ],
        espenTip: 'Ved valg mellom prosjekter — velg det med høyest NPV.',
      },
      {
        id: 'ent216-3-3',
        icon: '💰',
        title: 'Fordel',
        question: 'Hvorfor er NPV bedre enn payback?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret fordel.' },
          { id: 'b', label: 'Tar hensyn til hele levetiden og tidsverdien av penger', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Bare enklere', isCorrect: false, feedback: 'Tvert imot — mer komplekst.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Metodisk fordel.' },
        ],
        espenTip: 'Payback ignorerer alt etter tilbakebetalingstidspunktet — kan favorisere kortsiktige prosjekter.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📈',
    title: 'Internrentemetoden (IRR)',
    quote: 'Hvilken avkastning gir investeringen?',
    content: 'IRR (Internal Rate of Return) er den diskonteringsrenten som gjør NPV = 0. Tolkning: IRR er prosjektets faktiske avkastning. Sammenlignes med kravavkastning (hurdle rate): Hvis IRR > kravavkastning, invester. Fordel: Lett å kommunisere ("denne investeringen gir 15% avkastning"). Svakhet: Antar reinvestering til IRR-rente, kan gi flere løsninger ved skiftende kontantstrømmer. Brukt mye i private equity og prosjekt-finans.',
    subpoints: [
      { label: 'PROSENT', text: 'Lett å kommunisere mot avkastningskrav.' },
      { label: 'FELLE', text: 'Kan villede ved ujevne kontantstrømmer.' },
    ],
    practical: 'Hvilken IRR krever investorer i din bransje typisk?',
    exercises: [
      {
        id: 'ent216-4-1',
        icon: '📈',
        title: 'Definisjon',
        question: 'Hva er IRR?',
        choices: [
          { id: 'a', label: 'Bare omsetningsvekst', isCorrect: false, feedback: 'Annen indikator.' },
          { id: 'b', label: 'Diskonteringsrenten som gjør NPV = 0', isCorrect: true, feedback: 'Riktig! Matematisk definisjon.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansmål.' },
        ],
        espenTip: 'Excel: =IR(serie_av_kontantstrømmer). Krever endring i fortegn for å virke.',
      },
      {
        id: 'ent216-4-2',
        icon: '📈',
        title: 'Beslutning',
        question: 'Når investerer man basert på IRR?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Ved IRR over krav.' },
          { id: 'b', label: 'Når IRR > kravavkastning', isCorrect: true, feedback: 'Riktig! Hurdle rate-test.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Klar regel.' },
          { id: 'd', label: 'Bare positiv', isCorrect: false, feedback: 'Ikke nok — må over krav.' },
        ],
        espenTip: 'Norske VC-er krever ofte 25-30% IRR. PE-fond ofte 15-25%.',
      },
      {
        id: 'ent216-4-3',
        icon: '📈',
        title: 'Svakhet',
        question: 'Hva er problemet med IRR?',
        choices: [
          { id: 'a', label: 'Ingen', isCorrect: false, feedback: 'Har svakheter.' },
          { id: 'b', label: 'Antar reinvestering til IRR, kan gi flere løsninger', isCorrect: true, feedback: 'Riktig! Klassiske fallgruver.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret problem.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Metodisk svakhet.' },
        ],
        espenTip: 'Modifisert IRR (MIRR) løser noen av problemene — bruker eksplisitt reinvesteringsrente.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '⏱️',
    title: 'Tilbakebetalingsmetoden (Payback)',
    quote: 'Hvor lang tid før vi får pengene tilbake?',
    content: 'Payback regner ut hvor lang tid det tar før akkumulert kontantstrøm dekker initialinvesteringen. Enkel tommel-fingermetode: Kortere payback = lavere risiko og raskere likviditet. Brukes ofte som tilleggskriterium til NPV. Svakhet: Ignorerer tidsverdien av penger og kontantstrømmer etter payback-punkt. Diskontert payback løser tidsverdi-problemet. Mye brukt for små investeringer eller i bedrifter med likviditetsutfordringer.',
    subpoints: [
      { label: 'ENKELT', text: 'Lett å forklare, intuitivt.' },
      { label: 'RISIKO', text: 'Kort payback = mindre eksponering for usikkerhet.' },
    ],
    practical: 'Hvor lang payback aksepterer din bedrift typisk?',
    exercises: [
      {
        id: 'ent216-5-1',
        icon: '⏱️',
        title: 'Beregning',
        question: 'Investering 100, årlig kontantstrøm 25 — payback?',
        choices: [
          { id: 'a', label: '1 år', isCorrect: false, feedback: 'For kort.' },
          { id: 'b', label: '4 år', isCorrect: true, feedback: 'Riktig! 100/25 = 4.' },
          { id: 'c', label: '8 år', isCorrect: false, feedback: 'For langt.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Matematisk.' },
        ],
        espenTip: 'Ved jevne kontantstrømmer er det enkel divisjon. Ved ujevne: akkumuler til breakeven.',
      },
      {
        id: 'ent216-5-2',
        icon: '⏱️',
        title: 'Bruk',
        question: 'Når egner payback seg best?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Egnet i visse tilfeller.' },
          { id: 'b', label: 'Likviditetsfokus, små investeringer, høy usikkerhet', isCorrect: true, feedback: 'Riktig! Praktiske situasjoner.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare for store prosjekter', isCorrect: false, feedback: 'Tvert imot.' },
        ],
        espenTip: 'Mange små bedrifter krever payback under 3 år — likviditet trumfer langsiktig avkastning.',
      },
      {
        id: 'ent216-5-3',
        icon: '⏱️',
        title: 'Svakhet',
        question: 'Hva er hovedproblemet med payback?',
        choices: [
          { id: 'a', label: 'For komplekst', isCorrect: false, feedback: 'Tvert imot — for enkelt.' },
          { id: 'b', label: 'Ignorerer tidsverdi og kontantstrømmer etter payback', isCorrect: true, feedback: 'Riktig! Klassiske svakheter.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Metodisk problem.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Metodisk.' },
        ],
        espenTip: 'Et prosjekt med payback 4 år men kjempestor avkastning år 5-10 kan tape mot kortsiktig prosjekt.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '⚠️',
    title: 'Risiko og kravavkastning',
    quote: 'Høyere risiko, høyere avkastning.',
    content: 'WACC (Weighted Average Cost of Capital) er bedriftens vektede kapitalkostnad — vanligste utgangspunkt for diskonteringsrente. CAPM beregner egenkapitalkostnad: re = rf + β(rm - rf). Risikoeksponering reflekteres i beta (β). Norske industribedrifter har β rundt 1.0-1.3, tech-scaleups 1.5-2.0. Risikable prosjekter krever høyere avkastningskrav. Ulike investeringer i samme bedrift kan ha ulik risiko og ulik diskonteringsrente.',
    subpoints: [
      { label: 'WACC', text: 'Vektet kapitalkostnad — utgangspunkt for diskontering.' },
      { label: 'BETA', text: 'Risikomål relativt til markedet.' },
    ],
    practical: 'Hva er din beste estimerte WACC for din bedrift?',
    exercises: [
      {
        id: 'ent216-6-1',
        icon: '⚠️',
        title: 'WACC',
        question: 'Hva er WACC?',
        choices: [
          { id: 'a', label: 'Bare lånerente', isCorrect: false, feedback: 'Vektet snitt.' },
          { id: 'b', label: 'Vektet snitt av egenkapitalkrav og lånekostnad', isCorrect: true, feedback: 'Riktig! Standard kapitalkostnad.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansmål.' },
        ],
        espenTip: 'WACC = (E/V)·re + (D/V)·rd·(1-t). Skattefradraget på rente (1-t) er sentralt.',
      },
      {
        id: 'ent216-6-2',
        icon: '⚠️',
        title: 'CAPM',
        question: 'Hva er CAPM-formelen?',
        choices: [
          { id: 'a', label: 're = rf', isCorrect: false, feedback: 'Mangler risikopremie.' },
          { id: 'b', label: 're = rf + β(rm - rf)', isCorrect: true, feedback: 'Riktig! Klassisk CAPM.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Standardformel.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansmodell.' },
        ],
        espenTip: 'rf = risikofri rente (10-årig statsobligasjon), rm-rf = markedsrisikopremie (5-7% i Norge).',
      },
      {
        id: 'ent216-6-3',
        icon: '⚠️',
        title: 'Bruk',
        question: 'Hvorfor varierer kravavkastningen?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'b', label: 'Ulik risiko gir ulik kompensasjon investorer krever', isCorrect: true, feedback: 'Riktig! Risiko-avkastning.' },
          { id: 'c', label: 'Bare politikk', isCorrect: false, feedback: 'Markedsforhold.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansprinsipp.' },
        ],
        espenTip: 'Ny tech-startup: 25-35%. Etablert utility: 6-8%. Stor forskjell.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🎲',
    title: 'Følsomhetsanalyse',
    quote: 'Hva om vi tar feil?',
    content: 'Følsomhetsanalyse tester hvor robust NPV er mot endringer i forutsetninger: Hva skjer hvis salget blir 10% lavere? Hvis kostnadene øker 15%? Hvis renten stiger til 10%? Tre teknikker: Enkel sensitivitet (én variabel av gangen), scenario-analyse (best case, base, worst), Monte Carlo-simulering (statistisk fordeling). Equinor og Statkraft kjører Monte Carlo-modeller for store prosjekter. Avslører kritiske drivere.',
    subpoints: [
      { label: 'ROBUSTHET', text: 'Tester om beslutningen holder under usikkerhet.' },
      { label: 'DRIVERE', text: 'Identifiserer hvilke variabler som påvirker resultatet mest.' },
    ],
    practical: 'Hvilken forutsetning er mest usikker i din neste investering?',
    exercises: [
      {
        id: 'ent216-7-1',
        icon: '🎲',
        title: 'Hensikt',
        question: 'Hva er formålet med følsomhetsanalyse?',
        choices: [
          { id: 'a', label: 'Bare statistikk', isCorrect: false, feedback: 'Beslutningsstøtte.' },
          { id: 'b', label: 'Forstå hvor robust beslutningen er mot endringer i forutsetninger', isCorrect: true, feedback: 'Riktig! Risikoforståelse.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Analyseteknikk.' },
        ],
        espenTip: 'En NPV på 100 mill kan bli -50 mill hvis salget blir 20% lavere. Vis dette eksplisitt.',
      },
      {
        id: 'ent216-7-2',
        icon: '🎲',
        title: 'Metoder',
        question: 'Hvilke teknikker brukes?',
        choices: [
          { id: 'a', label: 'Bare gjetting', isCorrect: false, feedback: 'Strukturerte metoder.' },
          { id: 'b', label: 'Enkel sensitivitet, scenarier (best/base/worst), Monte Carlo', isCorrect: true, feedback: 'Riktig! Tre standardteknikker.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare en', isCorrect: false, feedback: 'Flere teknikker.' },
        ],
        espenTip: 'Excel klarer enkel sensitivitet og scenarier. Monte Carlo krever spesialverktøy som @Risk eller Crystal Ball.',
      },
      {
        id: 'ent216-7-3',
        icon: '🎲',
        title: 'Drivere',
        question: 'Hva avslører følsomhetsanalysen?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert info.' },
          { id: 'b', label: 'Kritiske drivere — hvilke variabler påvirker NPV mest', isCorrect: true, feedback: 'Riktig! Prioritering.' },
          { id: 'c', label: 'Bare overskudd', isCorrect: false, feedback: 'Drivere.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Innsikt.' },
        ],
        espenTip: 'Hvis salget er kritisk driver: Sett ressurser på markedsundersøkelse. Hvis kostnadene: Forhandle leverandørkontrakter.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🧠',
    title: 'Investering i immaterielle verdier',
    quote: 'Hjernekraft, merker og data — vanskelig å verdsette, viktig å investere.',
    content: 'Immaterielle investeringer: FoU, merkevare, kompetanse, software, data. Vanskelig å regne på fordi avkastning er usikker og langsiktig. Norske kunnskapsbedrifter har 60-80% av verdien i immaterielle eiendeler. Verktøy: ROI på FoU (men måler bare økonomisk), reell-opsjons-tenkning (verdsetter fleksibilitet), brand valuation. Equinors FoU-investering i flytende havvind hadde lav NPV i begynnelsen — strategisk verdi var større.',
    subpoints: [
      { label: 'USIKKERT', text: 'Avkastning på FoU er ofte langsiktig og uforutsigbar.' },
      { label: 'STRATEGISK', text: 'Reell-opsjoner: investering åpner fremtidige muligheter.' },
    ],
    practical: 'Hva er den viktigste immaterielle eiendelen i din bedrift?',
    exercises: [
      {
        id: 'ent216-8-1',
        icon: '🧠',
        title: 'Eksempler',
        question: 'Hva er immaterielle eiendeler?',
        choices: [
          { id: 'a', label: 'Bare maskiner', isCorrect: false, feedback: 'Det er materielt.' },
          { id: 'b', label: 'Merkevare, kompetanse, software, data, patenter', isCorrect: true, feedback: 'Riktig! Bredt spekter.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Eiendelstype.' },
        ],
        espenTip: 'Mange unicorns har minimale fysiske eiendeler — verdien ligger i kode, brand, data.',
      },
      {
        id: 'ent216-8-2',
        icon: '🧠',
        title: 'Reell-opsjon',
        question: 'Hva er reell-opsjons-tenkning?',
        choices: [
          { id: 'a', label: 'Bare aksjer', isCorrect: false, feedback: 'Konsept fra finans.' },
          { id: 'b', label: 'Investering gir muligheter for fremtidige beslutninger — har egenverdi', isCorrect: true, feedback: 'Riktig! Fleksibilitetsverdi.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konseptuelt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Finansteori.' },
        ],
        espenTip: 'Pilotinvestering i AI gir muligheten til å skalere senere — selv om pilot ikke gir overskudd direkte.',
      },
      {
        id: 'ent216-8-3',
        icon: '🧠',
        title: 'Strategisk',
        question: 'Hvorfor invester i FoU med negativ NPV?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Strategiske grunner finnes.' },
          { id: 'b', label: 'Lærings- og opsjonsverdi som ikke fanges av enkel NPV', isCorrect: true, feedback: 'Riktig! Strategisk perspektiv.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk vurdering.' },
        ],
        espenTip: 'Equinor brukte mange år på flytende havvind før det ble lønnsomt — nå er Hywind globalt ledende.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '📉',
    title: 'Avskrivninger',
    quote: 'Fordel kostnaden over levetiden.',
    content: 'Avskrivninger fordeler kostnaden av en eiendel over dens økonomiske levetid. Lineær avskrivning: lik andel hvert år. Saldoavskrivning: prosent av restverdi (skattemessig). Eksempel: Maskin 1 mill kr, levetid 5 år, lineær = 200.000 kr per år. Avskrivninger er ikke kontantstrøm men reduserer skattbart overskudd — gir skattefordel. I NPV bruk kontantstrøm direkte og legg til skattebesparelse fra avskrivninger.',
    subpoints: [
      { label: 'IKKE-CASH', text: 'Avskrivninger er regnskapsmessig, ikke kontant.' },
      { label: 'SKATTESKJOLD', text: 'Avskrivning gir skattefradrag som har reell cash-verdi.' },
    ],
    practical: 'Bruker bedriften din lineær eller saldo-avskrivning?',
    exercises: [
      {
        id: 'ent216-9-1',
        icon: '📉',
        title: 'Definisjon',
        question: 'Hva er avskrivning?',
        choices: [
          { id: 'a', label: 'Bare nedskriving', isCorrect: false, feedback: 'Annet konsept.' },
          { id: 'b', label: 'Fordeling av eiendelens kostnad over levetiden', isCorrect: true, feedback: 'Riktig! Periodiseringsprinsipp.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Regnskapsteknikk.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Regnskapsregel.' },
        ],
        espenTip: 'Matcher kostnaden med inntekten den genererer — periodiseringsprinsippet i regnskap.',
      },
      {
        id: 'ent216-9-2',
        icon: '📉',
        title: 'Metoder',
        question: 'Lineær vs saldo?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjellig.' },
          { id: 'b', label: 'Lineær = lik per år; saldo = prosent av restverdi', isCorrect: true, feedback: 'Riktig! Begge brukt.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Beregningsmetoder.' },
        ],
        espenTip: 'Skatteloven har fastsatte saldogrupper med satser (10-30%). Brukes uavhengig av regnskapsmessig avskrivning.',
      },
      {
        id: 'ent216-9-3',
        icon: '📉',
        title: 'Skatteskjold',
        question: 'Hva er avskrivnings-skatteskjold?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Konkret effekt.' },
          { id: 'b', label: 'Skattefradrag fra avskrivninger reduserer skattebetaling = cash-besparelse', isCorrect: true, feedback: 'Riktig! Reell verdi.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Skatteeffekt.' },
          { id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Alle bedrifter.' },
        ],
        espenTip: 'Avskrivning 100 + skattesats 22% = skattefradrag 22 i cash. Inkluder dette i NPV.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🎯',
    title: 'Beslutning og kommunikasjon',
    quote: 'Tall + skjønn + kommunikasjon = god beslutning.',
    content: 'God investeringsanalyse støtter, ikke erstatter, beslutning. Norske styrer bruker investeringsmaler: Investeringsbeskrivelse, kontantstrøm-prognose, NPV/IRR/payback, følsomhet, risikofaktorer, strategisk fit. Aksjeloven §6-12 setter ansvar på styret. Kommunikasjon avgjørende: Visualiser sensitivitetsanalyse, vis worst case eksplisitt, identifiser kritiske antakelser. Equinor og DNB har strenge investeringsprosesser med flere beslutningsporter.',
    subpoints: [
      { label: 'PROSESS', text: 'Strukturert beslutningsprosess gir bedre kvalitet.' },
      { label: 'KOMMUNIKASJON', text: 'Tallene må kommuniseres så de forstås.' },
    ],
    practical: 'Hva er beslutningsprosessen for store investeringer i din bedrift?',
    exercises: [
      {
        id: 'ent216-10-1',
        icon: '🎯',
        title: 'Innhold',
        question: 'Hva må en investeringssak inneholde?',
        choices: [
          { id: 'a', label: 'Bare NPV', isCorrect: false, feedback: 'Mer.' },
          { id: 'b', label: 'NPV/IRR/payback, sensitivitet, risiko, strategisk fit', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Investeringscase.' },
        ],
        espenTip: 'En god mal har 5-10 sider — ikke 50. Tvinger frem klart språk og prioritering.',
      },
      {
        id: 'ent216-10-2',
        icon: '🎯',
        title: 'Aksjeloven',
        question: 'Hvem har ansvar for store investeringer?',
        choices: [
          { id: 'a', label: 'Bare daglig leder', isCorrect: false, feedback: 'Styret også.' },
          { id: 'b', label: 'Styret — særlig ved beløp over fullmaktsgrense', isCorrect: true, feedback: 'Riktig! Aksjeloven §6-12.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Lovregulert.' },
          { id: 'd', label: 'Bare aksjonærer', isCorrect: false, feedback: 'Generalforsamling kun ved svært store.' },
        ],
        espenTip: 'Styret kan bli personlig erstatningsansvarlig ved uforsvarlige investeringer.',
      },
      {
        id: 'ent216-10-3',
        icon: '🎯',
        title: 'Skjønn',
        question: 'Erstatter tallene skjønn?',
        choices: [
          { id: 'a', label: 'Ja', isCorrect: false, feedback: 'Tvert imot.' },
          { id: 'b', label: 'Nei — tall støtter skjønn, men strategiske valg krever vurdering', isCorrect: true, feedback: 'Riktig! Komplementært.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert syn.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Beslutningsteori.' },
        ],
        espenTip: 'Buffett: "I prefer to be approximately right than precisely wrong." Tall hjelper, men forutsetninger styrer alt.',
      },
    ],
  },
]

export default function InvesteringsanalyseModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-16"
      moduleTitle="Investeringsanalyse og lønnsomhet"
      moduleIcon="📊"
      storageKey="learning-ent2-investeringsanalyse"
      completeRoute="/learning/ent2/investeringsanalyse/complete"
      phases={phases}
      intro="Beslutningsverktøy for investeringer — tidsverdien av penger, NPV, internrente, payback, risikojustert avkastning og følsomhetsanalyse."
      vissteduAt="Equinor bruker omfattende NPV- og Monte Carlo-modeller før hver større investering. Selv små bedrifter kan bruke samme metodikk i mindre skala."
      espenSier="Investeringsanalyse erstatter ikke skjønn — men disiplinerer det. Du tvinges til å bli eksplisitt om antakelser."
      presentationLink={{ route: '/learning/presentations/ent2/investeringsanalyse', description: 'Investeringsanalyse og lønnsomhet — 10 slides' }}
    />
  )
}
