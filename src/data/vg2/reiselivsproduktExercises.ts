import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const REISELIVSPRODUKT_EXERCISES: QuizExercise[] = [
  {
    id: 'reiseliv-vg2-01',
    icon: '⛵',
    title: 'Hovedelementer i reiselivsproduktet',
    context:
      'Bedriften Fjord Magic AS planlegger å lansere en helhetlig fjordopplevelsespakke fra Bergen til Flåm. Produktet skal selges som én samlet pakke til internasjonale turister.',
    question:
      'Hvilke fem hovedelementer må være på plass for at et reiselivsprodukt skal fungere som en helhetlig opplevelse?',
    choices: [
      {
        id: 'a',
        label:
          'Overnatting + mat + transport + pris + markedsføring — alt handler om å selge og levere et sted å sove og spise.',
        isCorrect: false,
        feedback:
          'Pris og markedsføring er viktige for å selge produktet, men er ikke hovedelementer i selve leveransen av opplevelsen. Guide/service og aktivitet/opplevelse mangler.',
      },
      {
        id: 'b',
        label:
          'Transport + overnatting + mat og drikke + aktivitet/opplevelse + guide og service. Alle fem må fungere sømløst for at totalopplevelsen blir god.',
        isCorrect: true,
        feedback:
          'Riktig! Det er et kjent prinsipp i reiseliv at pakken er like sterk som det svakeste leddet. En perfekt fjordkryssing ødelegges av dårlig frokost eller en uengasjert guide.',
      },
      {
        id: 'c',
        label:
          'Transport + overnatting + wifi — moderne turister prioriterer digital tilkobling over alt annet.',
        isCorrect: false,
        feedback:
          'Feil. Wifi er en hygienefaktor, ikke et hovedelement i et reiselivsprodukt. Aktivitet/opplevelse, mat/drikke og guide/service mangler i denne listen.',
      },
      {
        id: 'd',
        label:
          'Kun overnatting og transport — resten ordner turistene selv og foretrekker frihet.',
        isCorrect: false,
        feedback:
          'Feil. Et helhetlig reiselivsprodukt nettopp er at alle elementene er pakket og koordinert. Turister som vil ordne alt selv kjøper ikke pakkereiser.',
      },
    ],
    espenTip:
      '⚠️ Opplevelsen selges som en helhet — det svakeste leddet ødelegger hele pakken!',
  },
  {
    id: 'reiseliv-vg2-02',
    icon: '🧮',
    title: 'Priskalkulasjon med fortjenestemargin',
    context:
      'Fjord Magic AS har beregnet kostnadene per person for fjordpakken: transport 800 kr, overnatting 1 200 kr, aktivitet 600 kr, mat og drikke 400 kr, guide 500 kr. Styret ønsker en bruttomargin på 35 %.',
    question: 'Hva bør salgsprisen per person settes til?',
    choices: [
      {
        id: 'a',
        label:
          '4 725 kr — legg til 35 % av kostnaden (3 500 × 1,35 = 4 725 kr).',
        isCorrect: false,
        feedback:
          'Feil metode. Å legge til 35 % av kostnaden (markup) gir en margin på 26 %, ikke 35 %. Margin beregnes av salgsprisen, ikke kostprisen.',
      },
      {
        id: 'b',
        label:
          '5 385 kr (avrundet 5 400 kr) — beregnet som kostnad ÷ (1 − 0,35) = 3 500 ÷ 0,65 ≈ 5 385 kr.',
        isCorrect: true,
        feedback:
          'Riktig! Bruttomargin beregnes av salgspris: Salgspris = Kostnad ÷ (1 − ønsket margin) = 3 500 ÷ 0,65 = 5 384,6 kr ≈ 5 400 kr. Dette gir en margin på 35 % av salgsprisen.',
      },
      {
        id: 'c',
        label:
          '3 500 kr — dekningsbidrag er null, men du tjener på volum og fremtidig vekst.',
        isCorrect: false,
        feedback:
          'Feil. Å selge til kostpris gir null fortjeneste. Dette er ikke bærekraftig drift, og "tjene på volum" uten margin er et rent tap.',
      },
      {
        id: 'd',
        label:
          '6 000 kr — rund opp til nærmeste tusen for å maksimere inntektene.',
        isCorrect: false,
        feedback:
          'Feil fremgangsmåte. Priskalkulasjon skal baseres på kostnader og ønsket margin, ikke vilkårlig avrunding. 6 000 kr gir ikke 35 % margin — det gir 41,7 %.',
      },
    ],
    espenTip:
      '⚠️ Opplevelsen selges som en helhet — det svakeste leddet ødelegger hele pakken!',
  },
  {
    id: 'reiseliv-vg2-03',
    icon: '📱',
    title: 'Distribusjonsstrategi for reiselivspakker',
    context:
      'Fjord Magic AS har ferdigstilt fjordopplevelsespakken og skal nå bestemme seg for hvordan pakken skal selges og distribueres til internasjonale turister.',
    question: 'Hvilken distribusjonsstrategi er best for fjordopplevelsespakken?',
    choices: [
      {
        id: 'a',
        label:
          'Selg kun gjennom lokale reisebyråer i Bergen — de har allerede kunderelasjoner og gjør jobben for deg.',
        isCorrect: false,
        feedback:
          'Å stole på én kanal er risikabelt og gir lavere margin (reisebyråer tar 15–25 % provisjon). Du mister også direkte kundekontakt og data.',
      },
      {
        id: 'b',
        label:
          'Selg kun via din egen nettside — unngå mellomledd og behold all fortjeneste.',
        isCorrect: false,
        feedback:
          'Direkte salg er kostnadseffektivt, men gir liten rekkevidde internasjonalt. Uten synlighet på globale plattformer vil internasjonale turister ikke finne deg.',
      },
      {
        id: 'c',
        label:
          'Kombinasjonsstrategi: direkte booking på eget nettsted (lavest kostnad) + Booking.com og Airbnb Experiences (global rekkevidde) + reisebyråer for gruppe- og bedriftsmarkedet.',
        isCorrect: true,
        feedback:
          'Riktig! En flerkanalsstrategi balanserer kostnad og rekkevidde. Direkte booking gir best margin, globale plattformer gir synlighet, og reisebyråer åpner grupper og B2B-markedet.',
      },
      {
        id: 'd',
        label:
          'Selg kun på messer og gjennom flyers på hoteller i Bergen — personlig kontakt er viktigst i reiselivet.',
        isCorrect: false,
        feedback:
          'Messer og lokale flyers har svært begrenset rekkevidde og er ikke skalerbart. Moderne reiselivsdistribusjon er primært digital.',
      },
    ],
    espenTip:
      '⚠️ Opplevelsen selges som en helhet — det svakeste leddet ødelegger hele pakken!',
  },
  {
    id: 'reiseliv-vg2-04',
    icon: '⚖️',
    title: 'Pakkereiseloven og kundenes rettigheter',
    context:
      'En gjest har betalt for en guidet fjordopplevelse som del av en pakkereise fra Fjord Magic AS. Dagen for turen blir den guidede delen avlyst uten varsel på grunn av intern planleggingsfeil.',
    question: 'Hva sier pakkereiseloven om arrangørens ansvar i denne situasjonen?',
    choices: [
      {
        id: 'a',
        label:
          'Kunden har ingen juridiske rettigheter fordi force majeure dekker alle kanselleringer.',
        isCorrect: false,
        feedback:
          'Feil. Force majeure dekker uforutsette hendelser utenfor arrangørens kontroll (naturkatastrofer, krig). En intern planleggingsfeil er ikke force majeure.',
      },
      {
        id: 'b',
        label:
          'Arrangøren er fullt ansvarlig for alle deler av pakkeproduktet. Kunden har krav på erstatning eller et likeverdig alternativt produkt i henhold til pakkereiseloven §§ 21–28.',
        isCorrect: true,
        feedback:
          'Riktig! Pakkereiseloven slår fast at arrangøren er ansvarlig for hele pakken, uavhengig av hvilken underleverandør som sviktet. Kunden skal tilbys erstatning, refusjon eller tilsvarende alternativ.',
      },
      {
        id: 'c',
        label:
          'Kunden kan klage til Forbrukertilsynet, men må vente 6 måneder på behandling.',
        isCorrect: false,
        feedback:
          'Forbrukertilsynet kan bistå i klagesaker, men arrangørens primære plikt er å håndtere saken direkte med kunden etter pakkereiseloven — ikke overlate det til tilsynet.',
      },
      {
        id: 'd',
        label:
          'Kun guiden er ansvarlig, siden det var guiden som ikke møtte opp. Fjord Magic AS kan ikke holdes ansvarlig for underentreprenører.',
        isCorrect: false,
        feedback:
          'Feil. Pakkereiseloven fastslår at arrangøren har helhetlig ansvar uansett hvem som leverer de ulike delene. Kunden forholder seg til én arrangør.',
      },
    ],
    espenTip:
      '⚠️ Opplevelsen selges som en helhet — det svakeste leddet ødelegger hele pakken!',
  },
  {
    id: 'reiseliv-vg2-05',
    icon: '🌿',
    title: 'Bærekraft i reiselivsbedriften',
    context:
      'Et fjordhotell i Aurland ønsker å profilere seg som bærekraftig og tiltrekke seg miljøbevisste turister fra Europa. Styret diskuterer ulike tiltak.',
    question: 'Hva er det mest konkrete og troverdige bærekraftstiltaket hotellet kan iverksette?',
    choices: [
      {
        id: 'a',
        label:
          'Endre nettsidene til grønn farge og skrive at hotellet "elsker naturen".',
        isCorrect: false,
        feedback:
          'Dette er klassisk greenwashing — tomme påstander uten dokumentasjon. Det skader troverdigheten og kan være i strid med markedsføringsloven.',
      },
      {
        id: 'b',
        label:
          'Henge opp skilt om å gjenbruke håndklær og slukke lyset — enkle tiltak som alle gjør.',
        isCorrect: false,
        feedback:
          'Håndklær-skilt er hygienefaktorer som alle hoteller gjør. Det differensierer ikke og gir ingen reell bærekraftsprofil overfor krevende miljøbevisste turister.',
      },
      {
        id: 'c',
        label:
          'Kun bytte ut engangsprodukter med gjenbrukbare — ett tiltak av gangen er mest realistisk.',
        isCorrect: false,
        feedback:
          'Enkeltmessige produktbytter er ikke nok til å bygge en troverdig bærekraftsprofil. Det trengs en helhetlig og dokumentert strategi.',
      },
      {
        id: 'd',
        label:
          'Sertifisering (Svanemerket eller Eco-Lighthouse), innkjøp fra lokale leverandører, dokumentert energieffektivisering og konkrete null-svinn-mål — alt med målbare tall.',
        isCorrect: true,
        feedback:
          'Riktig! Tredjeparts sertifisering gir ekstern troverdighet. Lokale leverandører reduserer transport og støtter lokalsamfunnet. Dokumenterte mål gjør påstandene etterprøvbare. Dette er det internasjonale miljøbevisste markedet faktisk krever.',
      },
    ],
    espenTip:
      '⚠️ Opplevelsen selges som en helhet — det svakeste leddet ødelegger hele pakken!',
  },
]
