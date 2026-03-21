import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP =
  '⚠️ Bærekraft er ikke bare miljø — det handler om folk og økonomi også. Alle tre bena må stå stødig!'

export const BAEREKRAFT_EXERCISES: QuizExercise[] = [
  {
    id: 'baer-01',
    icon: '🌍',
    title: 'Triple Bottom Line',
    context:
      'Studentbedriften GreenBite skal pitche forretningsideen sin for en investor. Investoren spør: "Hva betyr Triple Bottom Line for dere, og hvordan reflekteres det i forretningsmodellen?"',
    question: 'Hva er den korrekte forståelsen av Triple Bottom Line (TBL)?',
    choices: [
      {
        id: 'a',
        label: 'TBL betyr at bedriften skal ha tre inntektsstrømmer for finansiell stabilitet.',
        isCorrect: false,
        feedback:
          'Feil. Triple Bottom Line handler ikke om antall inntektsstrømmer. Begrepet ble introdusert av John Elkington i 1994 og handler om tre dimensjoner av bærekraft, ikke finansiell diversifisering.',
      },
      {
        id: 'b',
        label: 'TBL betyr at bedriften skal gi tre ganger pengene tilbake til samfunnet.',
        isCorrect: false,
        feedback:
          'Feil. TBL er ikke en forpliktelse til å betale tilbake en bestemt andel. Det er et rammeverk for å måle og rapportere bedriftens totale påvirkning — ikke bare den finansielle.',
      },
      {
        id: 'c',
        label: 'TBL betyr People (sosiale hensyn), Planet (miljøhensyn) og Profit (økonomi) — alle tre dimensjoner må balanseres for langsiktig bærekraft.',
        isCorrect: true,
        feedback:
          'Riktig! Triple Bottom Line er et av de viktigste rammeverkene i moderne forretningsdrift. People handler om ansatte, lokalsamfunn og sosial rettferdighet. Planet handler om miljøpåvirkning og naturressurser. Profit handler om økonomisk levedyktighet. Alle tre må fungere for at en bedrift skal være genuint bærekraftig.',
      },
      {
        id: 'd',
        label: 'TBL er et regnskapsformat kun for store, børsnoterte selskaper.',
        isCorrect: false,
        feedback:
          'Feil. TBL er et konseptuelt rammeverk som kan og bør brukes av bedrifter i alle størrelser — fra studentbedrifter til multinasjonale konsern. Det er ikke et spesifikt regnskapsformat.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'baer-02',
    icon: '☕',
    title: 'Bærekraftig verdiforslag',
    context:
      'Tre gründere åpner en kafé i Bergen og vil profilere seg som bærekraftige. De diskuterer hvilket verdiforslag som vil resonere best hos kundene og faktisk utgjøre en forskjell.',
    question: 'Hvilket verdiforslag er sterkest og mest troverdig?',
    choices: [
      {
        id: 'a',
        label: '"Vi er opptatt av miljøet og gjør vårt beste for planeten."',
        isCorrect: false,
        feedback:
          'Feil. Dette er et vagt, udokumentert utsagn uten konkret innhold. Forbrukere er stadig mer kritiske til generelle "vi er grønne"-påstander. Uten konkrete tiltak er dette grenseland til greenwashing.',
      },
      {
        id: 'b',
        label: '"Vi bruker kun lokale råvarer, har nullsvinn-mål og komposterer alt organisk avfall — og prisen er på nivå med konkurrentene."',
        isCorrect: true,
        feedback:
          'Riktig! Dette er et sterkt verdiforslag fordi det er konkret (lokale råvarer, nullsvinn, kompostering), målbart, og eliminerer den vanligste barrieren for bærekraftig konsum: høyere pris. Det viser at bærekraft ikke nødvendigvis koster mer for kunden.',
      },
      {
        id: 'c',
        label: '"Vi planter ett tre for hvert kopp kaffe som selges."',
        isCorrect: false,
        feedback:
          'Feil. "Plant et tre"-tiltak er blitt kritisert for å være symbolsk og ineffektiv klimakompensasjon. Det kalles ofte "karbonoffset-vasking". Det løser heller ikke de umiddelbare problemene i verdikjeden (transport, avfall, energibruk).',
      },
      {
        id: 'd',
        label: '"Vi serverer kun vegansk mat fordi kjøtt er dårlig for klimaet."',
        isCorrect: false,
        feedback:
          'Feil. Vegansk profil kan være en del av et bærekraftig konsept, men et ekskluderende "kjøtt er dårlig"-budskap alienerer mange potensielle kunder og er ikke et helhetlig bærekraftsverdiforslag. Det mangler også de andre dimensjonene av TBL.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'baer-03',
    icon: '🚚',
    title: 'Målgruppe for bærekraftig streetfood',
    context:
      'Gründerne bak "GreenStreet" planlegger å lansere en bærekraftig streetfood-truck i Oslo. De bruker lokale leverandører, nullsvinn-meny og biologisk nedbrytbar emballasje. Prisene er 15–20% høyere enn vanlig streetfood.',
    question: 'Hvem er den mest realistiske primærmålgruppen for GreenStreet?',
    choices: [
      {
        id: 'a',
        label: 'Barnefamilier med to inntekter — de har råd til litt dyrere mat.',
        isCorrect: false,
        feedback:
          'Feil. Barnefamilier er en bred og heterogen gruppe. Streetfood passer heller ikke naturlig inn i barnefamiliers spisemønster, og bærekraft er ikke nødvendigvis primær kjøpsdrivkraft for denne gruppen.',
      },
      {
        id: 'b',
        label: 'Pensjonister med god pensjon — de har tid og penger til å spise ute.',
        isCorrect: false,
        feedback:
          'Feil. Pensjonister er ikke primærmålgruppen for urban streetfood. Streetfood-konseptet (hurtig, stående, urban) passer bedre for en yngre, mobil urban befolkning.',
      },
      {
        id: 'c',
        label: 'Alle i Oslo — bærekraft er noe alle bryr seg om nå.',
        isCorrect: false,
        feedback:
          'Feil. "Alle" er aldri en målgruppe. Selv om bærekraftsbevissthet øker, er betalingsvilligheten for bærekraftige premiumvarer ikke jevnt fordelt. En uklar målgruppe gir uklar kommunikasjon og svak posisjonering.',
      },
      {
        id: 'd',
        label: 'Urbane forbrukere 20–35 år, høyere utdanning, verdibevisste og villige til å betale premiumpriser for bærekraftige produkter.',
        isCorrect: true,
        feedback:
          'Riktig! Forskning viser at betalingsvilligheten for bærekraftige produkter er høyest blant unge, urbane og høyere utdannede forbrukere. Dette segmentet er også overrepresentert i Oslo sentrum og på campus. De er GreenStreets "early adopters" og ambassadører.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'baer-04',
    icon: '👗',
    title: 'Sirkulær inntektsmodell',
    context:
      'NordicThread vil starte en bærekraftig klesmerke. De diskuterer hvilken inntektsmodell som best støtter bærekraftmålet om å redusere tekstilavfall og holde klær i bruk lengst mulig.',
    question: 'Hvilken inntektsmodell er mest i tråd med sirkulærøkonomi og bærekraft?',
    choices: [
      {
        id: 'a',
        label: 'Fast fashion-modell med nye kolleksjoner hver uke til lave priser.',
        isCorrect: false,
        feedback:
          'Feil. Fast fashion er det motsatte av bærekraft. Det er basert på overforbruk, rask utskifting og masseproduksjon med lav kvalitet — modellen som er primærårsaken til tekstilindustriens enorme miljøavtrykk.',
      },
      {
        id: 'b',
        label: 'Abonnementsmodell med klesbytting og leasing — kunden "eier" tilgang, ikke produktet, noe som holder klær i sirkulasjon og reduserer avfall.',
        isCorrect: true,
        feedback:
          'Riktig! En abonnements- og leasingmodell er kjernen i sirkulærøkonomi: i stedet for at kunden kjøper og kaster, leier de tilgang til klær som sirkulerer mellom mange brukere. Det gir bedriften insentiv til å lage klær som varer (de eier dem fortsatt), og reduserer tekstilavfall drastisk.',
      },
      {
        id: 'c',
        label: 'Donasjon-modell der kunden bestemmer hva de vil betale.',
        isCorrect: false,
        feedback:
          'Feil. Donasjon-baserte modeller (pay-what-you-want) er sjelden bærekraftige som forretningsmodell for et klesmerke. Inntektene blir uforutsigbare og ofte for lave til å dekke produksjonskostnader. God bærekraft krever en lønnsom bedrift.',
      },
      {
        id: 'd',
        label: 'Engangssalg av dyre, eksklusiv klær til premiumpriser.',
        isCorrect: false,
        feedback:
          'Feil. Høy pris alene gjør ikke en forretningsmodell bærekraftig. Engangssalg gir fortsatt kunden eierskap og ingen insentiv for sirkulasjon. Klærne kan fortsatt ende som avfall etter bruk.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'baer-05',
    icon: '🌿',
    title: 'Greenwashing',
    context:
      'Bedrift A lanserer en stor reklamekampanje med slagordet "100% grønn drift — vi tar ansvar for planeten!" I virkeligheten foregår 90% av produksjonen i fabrikker drevet av kullkraft i Sørøst-Asia. De resirkulerer bare en liten mengde emballasje i Norge.',
    question: 'Hva kalles det Bedrift A driver med, og hva er konsekvensen?',
    choices: [
      {
        id: 'a',
        label: 'Dette er vanlig markedsføring — alle bedrifter overdriver litt.',
        isCorrect: false,
        feedback:
          'Feil. Det er en fundamental forskjell mellom positiv fremstilling og å aktivt villede forbrukere om bedriftens miljøpåvirkning. "100% grønn" når 90% av produksjonen er kullkraftdrevet er ikke "litt overdrivelse" — det er en konkret, usann påstand.',
      },
      {
        id: 'b',
        label: 'Dette er akseptabelt så lenge de jobber mot bærekraftmål på sikt.',
        isCorrect: false,
        feedback:
          'Feil. Fremtidige intensjoner fritar ikke en bedrift fra ansvaret for falske påstander i dag. Markedsføringsloven og Forbrukertilsynet vurderer påstander basert på fakta nå — ikke planer for fremtiden.',
      },
      {
        id: 'c',
        label: 'Greenwashing — villedende miljøpåstander uten faktisk dekning. Dette er ulovlig etter markedsføringsloven og kan medføre bøter fra Forbrukertilsynet.',
        isCorrect: true,
        feedback:
          'Riktig! Greenwashing er når bedrifter fremstiller seg som mer miljøvennlige enn de faktisk er. Det er ulovlig etter markedsføringsloven §7 (villedende markedsføring) og §6 (utilbørlig handelspraksis). EU er i ferd med å innføre enda strengere regler (Green Claims Directive) for å bekjempe greenwashing.',
      },
      {
        id: 'd',
        label: 'Lovlig, men uetisk — det finnes ingen regler mot miljøpåstander i reklame.',
        isCorrect: false,
        feedback:
          'Feil. Det finnes klare regler. Markedsføringsloven §3 krever at all markedsføring er korrekt og ikke villedende. Forbrukertilsynet har sanksjonert flere norske selskaper for nettopp udokumenterte eller overdrevne miljøpåstander i reklame.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
