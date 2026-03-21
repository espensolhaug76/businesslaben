import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📣',
    title: 'AIDA-modellen',
    quote: 'Kunden går gjennom fire faser før kjøp — du må møte dem der de er',
    practical:
      'Attention: fang oppmerksomheten (stor overskrift, provokativt bilde). Interest: bygg nysgjerrighet (fortell historien, beskriv fordelen). Desire: skap et ønske (testimonials, demonstrasjon). Action: gjør det lett å handle (CTA-knapp, rabattkode). Eks: Rema 1000-plakat (A) → nettside (I+D) → "Finn butikk"-knapp (A for Action).',
    glossaryTerm: 'AIDA-modellen',
    exercises: [
      {
        id: 'kk-1-1',
        question: 'Hva er den riktige rekkefølgen i AIDA-modellen?',
        choices: [
          { id: 'a', text: 'Action → Interest → Desire → Attention' },
          { id: 'b', text: 'Attention → Interest → Desire → Action' },
          { id: 'c', text: 'Awareness → Intention → Decision → Action' },
          { id: 'd', text: 'Attention → Decision → Interest → Action' },
        ],
        correctId: 'b',
        explanation: 'AIDA er Attention → Interest → Desire → Action — kunden beveger seg fra å legge merke til noe, til å handle.',
      },
      {
        id: 'kk-1-2',
        question: 'En nettbutikk skriver «SISTE SJANSE — 70% rabatt utløper midnatt!» øverst på siden. Hvilken AIDA-fase treffer dette?',
        choices: [
          { id: 'a', text: 'Interest' },
          { id: 'b', text: 'Desire' },
          { id: 'c', text: 'Action' },
          { id: 'd', text: 'Attention' },
        ],
        correctId: 'c',
        explanation: 'En tidsbegrenset CTA (Call to Action) med «siste sjanse» er designet for å utløse handling — det er Action-fasen.',
      },
      {
        id: 'kk-1-3',
        question: 'Kundeanmeldelser og produktvideoer hjelper primært med hvilken AIDA-fase?',
        choices: [
          { id: 'a', text: 'Attention' },
          { id: 'b', text: 'Interest' },
          { id: 'c', text: 'Desire' },
          { id: 'd', text: 'Action' },
        ],
        correctId: 'c',
        explanation: 'Testimonials og demonstrasjoner skaper et ønske om produktet (Desire) ved å vise at andre er fornøyde og at produktet fungerer.',
      },
      {
        id: 'kk-1-4',
        question: 'Hvorfor er «Kan jeg hjelpe deg?» en dårlig åpning i butikksalg sett fra AIDA-perspektiv?',
        choices: [
          { id: 'a', text: 'Det fanger for mye attention' },
          { id: 'b', text: 'Det trigger automatisk «Nei takk» og forhindrer videre bevegelse gjennom modellen' },
          { id: 'c', text: 'Det er ulovlig' },
          { id: 'd', text: 'Det hopper over Desire-fasen' },
        ],
        correctId: 'b',
        explanation: 'Et lukket spørsmål som «Kan jeg hjelpe?» gir kunden mulighet til å si nei og stenger samtalen — motsatt av hva AIDA krever.',
      },
      {
        id: 'kk-1-5',
        question: 'Hvilken fase representerer en «Kjøp nå»-knapp på en nettside?',
        choices: [
          { id: 'a', text: 'Attention' },
          { id: 'b', text: 'Interest' },
          { id: 'c', text: 'Desire' },
          { id: 'd', text: 'Action' },
        ],
        correctId: 'd',
        explanation: 'En CTA-knapp som «Kjøp nå» eller «Bestill» er Action-elementet — det gjør det lett for kunden å ta det siste steget.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔄',
    title: 'Push vs pull-markedsføring',
    quote: 'Push avbryter — pull tiltrekker. Begge er nødvendige, men pull er fremtiden',
    practical:
      'Push: budskapet presses til folk som ikke ba om det (TV-reklame, Display Ads, cold calls). Pull: innhold og tilstedeværelse trekker folk som søker aktivt (SEO, YouTube, blogg, sosiale medier). Nike bruker push-annonser for eksponeering og pull-innhold (løpetips, treningsvideoer) for konvertering.',
    exercises: [
      {
        id: 'kk-2-1',
        question: 'En bedrift sender uønskede e-poster til potensielle kunder. Hva er dette?',
        choices: [
          { id: 'a', text: 'Pull-markedsføring' },
          { id: 'b', text: 'Push-markedsføring' },
          { id: 'c', text: 'Earned media' },
          { id: 'd', text: 'Organisk markedsføring' },
        ],
        correctId: 'b',
        explanation: 'Uoppfordret kommunikasjon som presses til mottakere (cold calls, spam, display-annonser til folk som ikke søkte) er push-markedsføring.',
      },
      {
        id: 'kk-2-2',
        question: 'En bedrift publiserer nyttige bloggartikler om et tema slik at folk som søker informasjonen finner dem. Hva er dette?',
        choices: [
          { id: 'a', text: 'Push-markedsføring' },
          { id: 'b', text: 'Pull-markedsføring' },
          { id: 'c', text: 'Paid media' },
          { id: 'd', text: 'Aggressiv markedsføring' },
        ],
        correctId: 'b',
        explanation: 'Innhold som tiltrekker folk som aktivt søker informasjon er pull — kunden oppsøker bedriften, ikke omvendt.',
      },
      {
        id: 'kk-2-3',
        question: 'Hvorfor sies det at pull er «fremtiden» i markedsføring?',
        choices: [
          { id: 'a', text: 'Fordi det er rimeligere å produsere' },
          { id: 'b', text: 'Fordi forbrukere i stadig større grad unngår og blokkerer påtrengende push-reklame' },
          { id: 'c', text: 'Fordi myndighetene forbyr push-markedsføring' },
          { id: 'd', text: 'Fordi push ikke fungerer lenger' },
        ],
        correctId: 'b',
        explanation: 'Adblock, Netflix og Spotify Premium viser at folk aktivt betaler for å slippe push-reklame — pull-innhold som folk oppsøker frivillig er mer effektivt.',
      },
      {
        id: 'kk-2-4',
        question: 'Nike publiserer løpetips og treningsvideoer på YouTube. Hva er dette?',
        choices: [
          { id: 'a', text: 'Push-markedsføring' },
          { id: 'b', text: 'Pull-markedsføring' },
          { id: 'c', text: 'Aggressiv salgsstrategi' },
          { id: 'd', text: 'Direkte distribusjon' },
        ],
        correctId: 'b',
        explanation: 'Nyttig innhold som trekker folk til merket uten å selge direkte er pull — folk søker aktivt etter løpetips og finner Nike.',
      },
      {
        id: 'kk-2-5',
        question: 'Hva er ulempen med å bruke kun pull-markedsføring for et nytt ukjent produkt?',
        choices: [
          { id: 'a', text: 'Det er for dyrt' },
          { id: 'b', text: 'Folk kan ikke søke etter noe de ikke vet eksisterer' },
          { id: 'c', text: 'Pull fungerer ikke på sosiale medier' },
          { id: 'd', text: 'Det krever altfor mye teknisk kompetanse' },
        ],
        correctId: 'b',
        explanation: 'Pull forutsetter at folk aktivt søker — nye produkter uten kjennskap trenger push for å skape bevissthet (Awareness i AIDA) før pull kan fungere.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📰',
    title: 'Betalte, fortjente og eide medier',
    quote: 'Betalt gir rekkevidde, fortjent gir troverdighet, eid gir kontroll',
    practical:
      'Paid (betalt): annonser du betaler for (Google Ads, Instagram-annonser, TV-reklame). Earned (fortjent): omtale du ikke betaler for (pressedekning, deling, anmeldelser). Owned (eid): egne kanaler du kontrollerer (nettside, e-postliste, Instagram-konto). Red Bull-strategien: paid (TV-sponsing) + earned (viral sport-videoer) + owned (Red Bull Media House).',
    exercises: [
      {
        id: 'kk-3-1',
        question: 'En journalist skriver en artikkel om din bedrift uten at du betalte for det. Hva er dette?',
        choices: [
          { id: 'a', text: 'Paid media' },
          { id: 'b', text: 'Owned media' },
          { id: 'c', text: 'Earned media' },
          { id: 'd', text: 'Sponsored content' },
        ],
        correctId: 'c',
        explanation: 'Pressedekning, deling og anmeldelser som oppstår organisk er earned media — du har «tjent» oppmerksomheten gjennom kvalitet eller nyhetsverdighet.',
      },
      {
        id: 'kk-3-2',
        question: 'Din bedrifts nettside og nyhetsbrevliste er eksempler på...',
        choices: [
          { id: 'a', text: 'Paid media' },
          { id: 'b', text: 'Owned media' },
          { id: 'c', text: 'Earned media' },
          { id: 'd', text: 'Viral media' },
        ],
        correctId: 'b',
        explanation: 'Owned media er kanaler du kontrollerer fullt ut — nettside, e-postliste, apper. Ingen algoritme kan ta dem fra deg.',
      },
      {
        id: 'kk-3-3',
        question: 'Hvorfor er earned media særlig verdifullt for merkevarebygging?',
        choices: [
          { id: 'a', text: 'Fordi det er gratis' },
          { id: 'b', text: 'Fordi tredjeparters anbefalinger oppfattes som mer troverdige enn bedriftens egne påstander' },
          { id: 'c', text: 'Fordi det gir størst rekkevidde' },
          { id: 'd', text: 'Fordi det er lettest å kontrollere' },
        ],
        correctId: 'b',
        explanation: 'Forbrukere stoler mer på andres anbefalinger enn på reklame — det er grunnen til at en positiv VG-artikkel er mer verdifull enn en tilsvarende annonse.',
      },
      {
        id: 'kk-3-4',
        question: 'Red Bull Media House produserer egne filmer og videoer. Hvilken medietype er dette?',
        choices: [
          { id: 'a', text: 'Paid media' },
          { id: 'b', text: 'Earned media' },
          { id: 'c', text: 'Owned media' },
          { id: 'd', text: 'Shared media' },
        ],
        correctId: 'c',
        explanation: 'Red Bulls eget mediehus med eget innhold er owned media — de kontrollerer fullstendig hva som publiseres og til hvem.',
      },
      {
        id: 'kk-3-5',
        question: 'Google Ads og Instagram-annonser er eksempler på...',
        choices: [
          { id: 'a', text: 'Earned media' },
          { id: 'b', text: 'Owned media' },
          { id: 'c', text: 'Paid media' },
          { id: 'd', text: 'Pull-markedsføring' },
        ],
        correctId: 'c',
        explanation: 'Annonser du betaler for på tredjeparts plattformer er paid media — du leier plass i andres kanaler.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🤖',
    title: 'Algoritmer og organisk rekkevidde',
    quote: 'Du lager ikke innhold for følgerne dine — du lager innhold for algoritmen som viser det til nye folk',
    practical:
      'Algoritmer (Instagram, TikTok, YouTube) prioriterer innhold med høyt engasjement: lagringer > delinger > kommentarer > likes. Organisk rekkevidde synker år for år på de fleste plattformer — Meta har redusert organisk rekkevidde fra 16% (2012) til ~3% (2024). Løsningen: innhold som trigger ekte reaksjoner, ikke rekkevidde-hacking.',
    exercises: [
      {
        id: 'kk-4-1',
        question: 'Hva prioriterer sosiale mediers algoritmer mest?',
        choices: [
          { id: 'a', text: 'Antall likes' },
          { id: 'b', text: 'Lagringer og delinger' },
          { id: 'c', text: 'Antall følgere' },
          { id: 'd', text: 'Publiseringsfrekvens' },
        ],
        correctId: 'b',
        explanation: 'Algoritmer rangerer engasjement slik: lagring > deling > kommentar > like. Lagringer og delinger signaliserer høyest verdi for algoritmen.',
      },
      {
        id: 'kk-4-2',
        question: 'Organisk rekkevidde på Meta er redusert fra 16% (2012) til ~3% (2024). Hva betyr dette for bedrifter?',
        choices: [
          { id: 'a', text: 'At de fleste følgere ikke ser innholdet med mindre det booostes eller betales for' },
          { id: 'b', text: 'At Meta-plattformer er ubrukelige for markedsføring' },
          { id: 'c', text: 'At alle bedrifter bør forlate Meta' },
          { id: 'd', text: 'At man bør publisere mer sjelden' },
        ],
        correctId: 'a',
        explanation: '~3% organisk rekkevidde betyr at av 1000 følgere ser kun ~30 innholdet organisk — resten krever betalt eksponering eller ekstraordinært innhold.',
      },
      {
        id: 'kk-4-3',
        question: 'Hva er den mest effektive måten å øke organisk rekkevidde på sosiale medier?',
        choices: [
          { id: 'a', text: 'Publisere mer innhold oftere' },
          { id: 'b', text: 'Bruke mange hashtags' },
          { id: 'c', text: 'Lage innhold som trigger ekte reaksjoner og engasjement' },
          { id: 'd', text: 'Kjøpe følgere' },
        ],
        correctId: 'c',
        explanation: 'Algoritmer belønner ekte engasjement — innhold folk deler, lagrer og kommenterer på. Rekkevidde-hacking og kjøpte følgere gir motsatt effekt.',
      },
      {
        id: 'kk-4-4',
        question: 'Hva betyr «organisk rekkevidde»?',
        choices: [
          { id: 'a', text: 'Rekkevidde oppnådd gjennom betalte annonser' },
          { id: 'b', text: 'Rekkevidde fra influencer-samarbeid' },
          { id: 'c', text: 'Antall folk som ser innholdet ditt uten at du betaler for eksponeringen' },
          { id: 'd', text: 'Rekkevidde fra presseomtale' },
        ],
        correctId: 'c',
        explanation: 'Organisk rekkevidde er gratis eksponering som algoritmen gir innholdet basert på engasjement — i motsetning til betalt rekkevidde fra annonser.',
      },
      {
        id: 'kk-4-5',
        question: 'TikTok-algoritmen viser innhold til folk som ikke følger deg basert på engasjement. Hva gjør dette mulig?',
        choices: [
          { id: 'a', text: 'At man trenger mange følgere for å nå nye folk' },
          { id: 'b', text: 'At nytt innhold med høyt tidlig engasjement kan nå millioner selv uten etablert publikum' },
          { id: 'c', text: 'At betalt promotering alltid er nødvendig' },
          { id: 'd', text: 'At kun kjente merkevarer kan bli virale' },
        ],
        correctId: 'b',
        explanation: 'TikToks «For You Page»-algoritme er demokratiserende — et nytt konto kan nå millioner hvis det tidlige engasjementet er sterkt nok.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🦆',
    title: 'Viral strategi: Duolingos TikTok-strategi',
    quote: 'Duolingo brøt alle regler for «profesjonell merkevare» på TikTok — og vant',
    practical:
      'Duolingo ga sin maskot (ugla Duo) en egen personlighet: selvironisk, humoristisk og trendbevisst. De svarte på kommentarer med memes, laget innhold om egen «obsessive» natur og deltok i TikTok-trender. Resultat: 10M+ følgere organisk, tonnevis av earned media og unge brukere som faktisk liker merkevaren. Leksjonen: autentisitet og plattform-fit slår produksjonskvalitet.',
    exercises: [
      {
        id: 'kk-5-1',
        question: 'Hva er kjernen i Duolingos suksess på TikTok?',
        choices: [
          { id: 'a', text: 'Store annonsekroner på betalt promotering' },
          { id: 'b', text: 'Autentisk, plattform-tilpasset innhold med humor og selvbevissthet' },
          { id: 'c', text: 'Høy produksjonskvalitet og profesjonelle videoer' },
          { id: 'd', text: 'Mange kjendissamarbeid' },
        ],
        correctId: 'b',
        explanation: 'Duolingo beviste at autentisitet og plattform-fit (lage innhold som føles «native» til TikTok) slår budsjett og produksjonskvalitet.',
      },
      {
        id: 'kk-5-2',
        question: 'Hva er «plattform-fit» i markedsføringskontekst?',
        choices: [
          { id: 'a', text: 'At en bedrift er aktiv på alle plattformer' },
          { id: 'b', text: 'At innholdet er tilpasset den spesifikke plattformens kultur, format og brukervaner' },
          { id: 'c', text: 'At innholdet er teknisk optimert for mobilvisning' },
          { id: 'd', text: 'At man bruker alle tilgjengelige funksjoner på plattformen' },
        ],
        correctId: 'b',
        explanation: 'Plattform-fit betyr å lage innhold som føles naturlig og hjemme på den spesifikke plattformen — ikke bare å dele samme innhold overalt.',
      },
      {
        id: 'kk-5-3',
        question: 'Hvorfor er Duolingos strategi vanskelig å kopiere for tradisjonelle bedrifter?',
        choices: [
          { id: 'a', text: 'Fordi det krever en stor markedsføringsavdeling' },
          { id: 'b', text: 'Fordi det krever at bedriften er villig til å gi slipp på full kontroll over merkevaren og tørre å være morsom og selvbevisst' },
          { id: 'c', text: 'Fordi det er for dyrt' },
          { id: 'd', text: 'Fordi det kun fungerer for app-selskaper' },
        ],
        correctId: 'b',
        explanation: 'Tradisjonelle bedrifter er ofte for redde for risiko og «merkevare-konsistens» til å tørre den typen selvbevisst humor Duolingo bruker.',
      },
      {
        id: 'kk-5-4',
        question: 'Duolingo fikk «earned media» fra TikTok-strategien sin. Hva betyr dette?',
        choices: [
          { id: 'a', text: 'De betalte medier for dekning' },
          { id: 'b', text: 'Pressen og folk omtalte strategien frivillig, uten at Duolingo betalte for det' },
          { id: 'c', text: 'De eier egne mediekanaler' },
          { id: 'd', text: 'De tjente penger på innholdet sitt' },
        ],
        correctId: 'b',
        explanation: 'Earned media er gratis omtale — artikler, delinger og diskusjoner om Duolingos TikTok-strategi som oppstod organisk fordi strategien var bemerkelsesverdig.',
      },
      {
        id: 'kk-5-5',
        question: 'Hva er den viktigste lærdommen fra Duolingos TikTok-strategi for norske SMB-er?',
        choices: [
          { id: 'a', text: 'At alle bedrifter bør bruke humor og memes' },
          { id: 'b', text: 'At du alltid bør delta i trender' },
          { id: 'c', text: 'At autentisk innhold tilpasset plattformens kultur kan gi stor rekkevidde uten stort budsjett' },
          { id: 'd', text: 'At TikTok er den viktigste markedsføringsplattformen' },
        ],
        correctId: 'c',
        explanation: 'Duolingo viser at kreativitet og plattform-forståelse kan erstatte store annonsekroner — noe som er spesielt relevant for SMB-er med begrenset markedsføringsbudsjett.',
      },
    ],
  },
]

export default function KommunikasjonKanalerModule() {
  return (
    <DrawerModule
      moduleCode="MFI-KK"
      moduleTitle="Kommunikasjon og kanaler"
      moduleIcon="📣"
      storageKey="learning-mfi-kommunikasjon-kanaler"
      completeRoute="/learning/mfi/kommunikasjon-kanaler/complete"
      phases={PHASES}
      intro="Markedsføring uten kommunikasjon eksisterer ikke. Men i en verden med tusenvis av reklamebudskap per dag er spørsmålet ikke lenger «hvordan når vi kundene?» — det er «hvorfor skal de bry seg om det vi sier?» Fra AIDA til viral TikTok-strategi: her er kommunikasjonsverktøykassa."
      vissteduAt="En gjennomsnittlig norsk voksen ser over 4 000 reklamebudskap per dag — og husker færre enn 100 av dem. Kun innhold som vekker følelser eller nysgjerrighet bryter gjennom."
      espenSier="Neste gang du scroller gjennom TikTok eller Instagram, analyser ett stykke innhold du stoppet opp ved: hvilken AIDA-fase treffer det deg i? Og er det push eller pull? Du vil aldri se sosiale medier på samme måte igjen."
      presentationLink={{ route: '/learning/presentations/kampanje', description: 'Markedsføringskampanje — en visuell gjennomgang av kanalvalg og KPIer' }}
    />
  )
}
