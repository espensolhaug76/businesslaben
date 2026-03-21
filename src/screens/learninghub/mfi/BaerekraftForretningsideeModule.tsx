import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🌱',
    title: 'Hva er bærekraftig forretningsdrift?',
    quote: 'Vi er ikke i business for å selge klær — vi er i business for å redde planeten vår.',
    content: 'Bærekraftig forretningsdrift betyr å drive en bedrift som skaper langsiktig verdi for eiere, ansatte, kunder og samfunn — uten å tære på ressurser som fremtidige generasjoner er avhengige av. I Norge har Stormberg fra Kristiansand bygget bærekraft inn i sin DNA fra dag én: de ansetter aktivt mennesker som sliter med å komme inn på arbeidsmarkedet, de bruker resirkulerte materialer og de er åpne om sin miljøpåvirkning.',
    subpoints: [
      { label: 'VERDIKJEDEPERSPEKTIV', text: 'Bærekraft gjelder hele verdikjeden — fra råvareleverandør til produksjon, transport, salg og hva som skjer med produktet etter bruk.' },
      { label: 'LANGSIKTIG TENKNING', text: 'Bærekraftige bedrifter ofrer kortsiktig profitt for langsiktig soliditet — Stormberg ga avkall på billigere produksjon for å sikre etisk leverandørkjede.' },
    ],
    practical: 'Begynn med å kartlegge din bedrifts største miljø- og samfunnspåvirkning — du kan ikke forbedre det du ikke har oversikt over.',
    exercises: [
      {
        id: 'bf-1-1',
        question: 'Hva betyr bærekraftig forretningsdrift?',
        choices: [
          { id: 'a', text: 'Å drive så lønnsomt som mulig' },
          { id: 'b', text: 'Å drive en bedrift som skaper langsiktig verdi uten å ødelegge ressurser fremtidige generasjoner trenger' },
          { id: 'c', text: 'Å bruke kun grønne farger i markedsføringen' },
          { id: 'd', text: 'Å donere 1% av overskuddet til veldedighet' },
        ],
        correctId: 'b',
        explanation: 'Bærekraftig forretningsdrift handler om å skape verdi på lang sikt — for eiere, ansatte, kunder, samfunn og miljø — uten å ødelegge ressurser for fremtiden.',
      },
      {
        id: 'bf-1-2',
        question: 'Stormberg ansetter aktivt mennesker som sliter med å komme inn på arbeidsmarkedet. Hvilken dimensjon av bærekraft er dette?',
        choices: [
          { id: 'a', text: 'Miljødimensjonen' },
          { id: 'b', text: 'Den sosiale/menneskelige dimensjonen' },
          { id: 'c', text: 'Den økonomiske dimensjonen' },
          { id: 'd', text: 'Sirkulærøkonomidimensjonen' },
        ],
        correctId: 'b',
        explanation: 'Inkluderende rekruttering som gir marginaliserte grupper en sjanse er et eksempel på den sosiale/menneskelige dimensjonen av bærekraft.',
      },
      {
        id: 'bf-1-3',
        question: 'Patagonia oppfordrer kunder til å kjøpe MINDRE av produktene sine. Hva er forretningslogikken bak dette?',
        choices: [
          { id: 'a', text: 'Det er en feil strategi som skader dem' },
          { id: 'b', text: 'Det bygger sterk autentisk merkeidentitet og lojalitet blant verdibevisste kunder som betaler mer og forblir lojale' },
          { id: 'c', text: 'Det reduserer produksjonskostnader' },
          { id: 'd', text: 'Det er påkrevd av myndighetene' },
        ],
        correctId: 'b',
        explanation: 'Patagonias radikale ærlighet gjør dem til et foretrukket merke for miljøbevisste kunder — troverdighet og verdier skaper sterkere lojalitet enn tradisjonell markedsføring.',
      },
      {
        id: 'bf-1-4',
        question: 'Hva betyr et «verdikjedeperspektiv» på bærekraft?',
        choices: [
          { id: 'a', text: 'At kun sluttproduktets bærekraft teller' },
          { id: 'b', text: 'At bærekraft vurderes gjennom hele kjeden fra råvare til etter bruk, ikke bare i produksjonsleddet' },
          { id: 'c', text: 'At kun forhandlerleddets praksis er relevant' },
          { id: 'd', text: 'At man fokuserer kun på logistikk' },
        ],
        correctId: 'b',
        explanation: 'Bærekraft i hele verdikjeden betyr at selv om ditt produkt er «grønt», spiller det ingen rolle hvis leverandørene dine bruker barnearbeid eller forurenser.',
      },
      {
        id: 'bf-1-5',
        question: 'Hvorfor er bærekraft en konkurransefordel, ikke bare en kostnad?',
        choices: [
          { id: 'a', text: 'Fordi myndighetene gir skattefordeler' },
          { id: 'b', text: 'Fordi verdibevisste forbrukere, spesielt yngre, er villige til å betale mer og forbli lojale til merkevarer som deler verdiene deres' },
          { id: 'c', text: 'Fordi bærekraft reduserer produksjonskostnader alltid' },
          { id: 'd', text: 'Det er ikke en konkurransefordel i praksis' },
        ],
        correctId: 'b',
        explanation: 'Bærekraft appellerer spesielt til yngre forbrukere som aktivt velger merkevarer basert på verdier — dette skaper sterkere lojalitet og høyere betalingsvillighet.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '⚖️',
    title: 'Triple Bottom Line — People, Planet, Profit',
    quote: 'En bedrift som er god for mennesker og planet, er til slutt også god for lommeboken.',
    content: 'Triple Bottom Line-modellen sier at bedrifter bør måle suksess langs tre dimensjoner: menneskelig (People), miljømessig (Planet) og økonomisk (Profit). De tre dimensjonene forsterker hverandre over tid — en bedrift som behandler ansatte godt har lavere turnover, og en bedrift som bruker færre ressurser har lavere kostnader.',
    subpoints: [
      { label: 'PEOPLE', text: 'Ansattes arbeidsforhold, leverandørers arbeidere, lokalsamfunn og kunders velferd — Fairtrade-sertifiserte kaffe-importører er et eksempel på People i praksis.' },
      { label: 'PLANET', text: 'Klimaavtrykk, ressursbruk, avfall og biologisk mangfold — Bergans dokumenterer karbonregnskapet for hvert produkt i sin bærekraftsrapport.' },
      { label: 'PROFIT', text: 'Finansiell lønnsomhet er ikke fienden til de to andre — det er forutsetningen for at bedriften kan fortsette å skape positiv påvirkning over tid.' },
    ],
    practical: 'Bruk Triple Bottom Line som linse når du vurderer en forretningsbeslutning: hva er konsekvensene for mennesker, miljø og økonomi?',
    glossaryTerm: 'Triple Bottom Line',
    exercises: [
      {
        id: 'bf-2-1',
        question: 'Hva er de tre dimensjonene i Triple Bottom Line?',
        choices: [
          { id: 'a', text: 'Produkt, Pris, Promosjon' },
          { id: 'b', text: 'People, Planet, Profit' },
          { id: 'c', text: 'Planlegging, Produksjon, Profil' },
          { id: 'd', text: 'Persons, Plan, Perform' },
        ],
        correctId: 'b',
        explanation: 'Triple Bottom Line måler bedriftssuksess langs tre akser: People (sosial), Planet (miljø) og Profit (økonomi) — alle tre må ivaretas.',
      },
      {
        id: 'bf-2-2',
        question: 'Too Good To Go redder mat som ellers ville blitt kastet. Hvilke TBL-dimensjoner treffer dette?',
        choices: [
          { id: 'a', text: 'Kun Planet' },
          { id: 'b', text: 'Kun Profit' },
          { id: 'c', text: 'Planet (reduserer matsvinn) og Profit (tjener penger på det)' },
          { id: 'd', text: 'Kun People' },
        ],
        correctId: 'c',
        explanation: 'Too Good To Go er et eksempel på at Planet og Profit henger perfekt sammen — de reduserer matsvinn (Planet) og tjener penger på det (Profit) samtidig.',
      },
      {
        id: 'bf-2-3',
        question: 'Bergans har et leieprogram for fjellvettrekk utstyr. Hva er den primære TBL-dimensjonen dette adresserer?',
        choices: [
          { id: 'a', text: 'People' },
          { id: 'b', text: 'Planet' },
          { id: 'c', text: 'Profit' },
          { id: 'd', text: 'Alle tre likt' },
        ],
        correctId: 'b',
        explanation: 'Leiemodellen reduserer behovet for å produsere og kjøpe nye varer — det er primært en Planet-dimensjonsinitiativ som reduserer ressursbruk og avfall.',
      },
      {
        id: 'bf-2-4',
        question: 'Hvorfor er Profit en legitim del av Triple Bottom Line og ikke dens motsetning?',
        choices: [
          { id: 'a', text: 'Fordi bedrifter alltid bør prioritere profitt over alt annet' },
          { id: 'b', text: 'Fordi en bedrift uten lønnsomhet ikke kan overleve og dermed heller ikke skape positiv påvirkning på lengre sikt' },
          { id: 'c', text: 'Fordi profitt er det samme som bærekraft' },
          { id: 'd', text: 'Fordi eiere fortjener avkastning' },
        ],
        correctId: 'b',
        explanation: 'Lønnsomhet er forutsetningen — en bedrift som går konkurs kan ikke lenger hjelpe ansatte, lokalsamfunn eller miljøet. Profit muliggjør positiv påvirkning over tid.',
      },
      {
        id: 'bf-2-5',
        question: 'Stormberg er kjent for å ansette tidligere innsatte og langtidsarbeidsledige. Hvilken TBL-dimensjon demonstrerer dette tydeligst?',
        choices: [
          { id: 'a', text: 'Planet' },
          { id: 'b', text: 'Profit' },
          { id: 'c', text: 'People' },
          { id: 'd', text: 'Alle tre like mye' },
        ],
        correctId: 'c',
        explanation: 'Inkluderende rekruttering — å gi marginaliserte grupper arbeidsmuligheter — er et People-initiativ som bidrar til sosial bærekraft og redusert utenforskap.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🌍',
    title: 'FNs bærekraftsmål i næringslivet',
    quote: 'De 17 bærekraftsmålene er ikke bare politikernes ansvar — de er næringslivets veikart.',
    content: 'FNs 17 bærekraftsmål (SDG-ene) er vedtatt av alle FNs medlemsland og gir et felles rammeverk for å løse verdens største utfordringer innen 2030. For en butikk eller servicebedrift er spesielt SDG 12 (Ansvarlig forbruk og produksjon) og SDG 8 (Anstendig arbeid) relevante.',
    subpoints: [
      { label: 'SDG 12 — ANSVARLIG FORBRUK', text: 'Reduser matsvinn, trekk tilbake produkter med farlige kjemikalier, tilby reparasjonstjenester — Elkjøps resirkuleringsordning er et godt norsk eksempel.' },
      { label: 'SDG 8 — ANSTENDIG ARBEID', text: 'Gode arbeidsforhold, rettferdig lønn og mulighet for faglig utvikling — Rema 1000 sine franchiseavtaler gir selvstendig næringsdrivende en strukturert vei til bedriftseierskap.' },
      { label: 'SDG 13 — KLIMAHANDLING', text: 'Kutt i egne utslipp og støtte til leverandørers klimaarbeid — Posten Norge har satt mål om utslippsfri levering i alle norske byer innen 2025.' },
    ],
    practical: 'Velg 2–3 SDG-er som er relevante for din bransje og definer konkrete tiltak — det er bedre å gjøre tre ting godt enn å hevde å bidra til alle 17.',
    exercises: [
      {
        id: 'bf-3-1',
        question: 'Hva er FNs bærekraftsmål (SDG-ene)?',
        choices: [
          { id: 'a', text: 'Et sett med regler kun for norske statsbedrifter' },
          { id: 'b', text: 'Et globalt rammeverk med 17 mål for å løse verdens største utfordringer innen 2030, vedtatt av alle FNs medlemsland' },
          { id: 'c', text: 'En frivillig standard for store multinasjonale selskaper' },
          { id: 'd', text: 'En norsk klimaplan' },
        ],
        correctId: 'b',
        explanation: 'SDG-ene (Sustainable Development Goals) er vedtatt av alle 193 FN-land og gjelder for alle aktører — inkludert næringslivet.',
      },
      {
        id: 'bf-3-2',
        question: 'Hvilket SDG er mest relevant for en norsk dagligvarebutikk som ønsker å redusere matsvinn?',
        choices: [
          { id: 'a', text: 'SDG 4 — God utdanning' },
          { id: 'b', text: 'SDG 12 — Ansvarlig forbruk og produksjon' },
          { id: 'c', text: 'SDG 16 — Fred og rettferdighet' },
          { id: 'd', text: 'SDG 1 — Utrydde fattigdom' },
        ],
        correctId: 'b',
        explanation: 'SDG 12 handler direkte om ansvarlig forbruk og produksjon — reduksjon av matsvinn er et av de mest konkrete tiltakene under dette målet.',
      },
      {
        id: 'bf-3-3',
        question: 'Hva betyr det å «operasjonalisere» et SDG for en bedrift?',
        choices: [
          { id: 'a', text: 'Å sette SDG-logoer i årsrapporten' },
          { id: 'b', text: 'Å sette konkrete mål, måle fremgang og faktisk endre praksis basert på SDG-et' },
          { id: 'c', text: 'Å donere til FN' },
          { id: 'd', text: 'Å bli sertifisert som bærekraftig bedrift' },
        ],
        correctId: 'b',
        explanation: 'Operasjonalisering betyr å gå fra ord til handling — sette mål, måle det og faktisk endre adferd. Bare å liste opp SDG-logoer er ikke operasjonalisering.',
      },
      {
        id: 'bf-3-4',
        question: 'Posten Norge har satt mål om utslippsfri levering i alle norske byer. Hvilke SDG-er støtter dette?',
        choices: [
          { id: 'a', text: 'SDG 3 — God helse' },
          { id: 'b', text: 'SDG 13 — Klimahandling' },
          { id: 'c', text: 'SDG 1 — Utrydde fattigdom' },
          { id: 'd', text: 'SDG 5 — Likestilling' },
        ],
        correctId: 'b',
        explanation: 'Kutt i klimagassutslipp fra transport støtter direkte SDG 13 (Klimahandling) — ett av de mest presserende globale målene.',
      },
      {
        id: 'bf-3-5',
        question: 'Hvorfor anbefales det å velge 2–3 SDG-er fremfor å hevde å bidra til alle 17?',
        choices: [
          { id: 'a', text: 'Fordi det er billigere' },
          { id: 'b', text: 'Fordi det gir mer troverdig og målbar påvirkning enn spredt, overflatisk innsats på alle 17' },
          { id: 'c', text: 'Fordi det er et lovkrav' },
          { id: 'd', text: 'Fordi det er umulig å bidra til mer enn 3 SDG-er' },
        ],
        correctId: 'b',
        explanation: 'Fokus gir dybde — en bedrift som gjør tre ting virkelig godt er mer troverdig og har større påvirkning enn en som hevder å jobbe med alle 17 uten substans.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '♻️',
    title: 'Sirkulær økonomi vs lineær økonomi',
    quote: 'Det finnes ingen avfall i naturen — bare ressurser på feil sted.',
    content: 'Den lineære økonomien følger modellen ta–lag–kast. Den sirkulære økonomien er designet for å holde ressurser i bruk lengst mulig, gjennom reparasjon, gjenbruk, ombygging og til slutt materialgjenvinning. IKEA har lansert et tilbakekjøpsprogram der kunder kan selge tilbake brukte møbler.',
    subpoints: [
      { label: 'REPARASJON OG GJENBRUK', text: 'Repair café-bevegelsen i Norge (over 60 lokale repair cafeer) viser etterspørselen for reparasjonstjenester — en nisje mange butikker undervurderer.' },
      { label: 'PRODUKT SOM TJENESTE', text: 'I stedet for å selge en vaskemaskin selger Electrolux vask-som-tjeneste — kunden betaler per vask, Electrolux eier maskinen og er ansvarlig for vedlikehold.' },
      { label: 'MATERIALSIRKULARITET', text: 'Norsk plastgjenvinning er en voksende industri — Grønt Punkt Norge koordinerer innsamling og gjenvinning av emballasje fra norske bedrifter.' },
    ],
    practical: 'Spør deg: hva skjer med produktet vi selger etter at kunden er ferdig med det? Svaret avslører potensialet for sirkulære forretningsmodeller.',
    glossaryTerm: 'Sirkulaerokonomi',
    exercises: [
      {
        id: 'bf-4-1',
        question: 'Hva beskriver modellen «ta–lag–kast»?',
        choices: [
          { id: 'a', text: 'Sirkulær økonomi' },
          { id: 'b', text: 'Lineær økonomi' },
          { id: 'c', text: 'Bærekraftig økonomi' },
          { id: 'd', text: 'Digital økonomi' },
        ],
        correctId: 'b',
        explanation: 'Lineær økonomi er ta–lag–kast: hent ut råvarer, produser, selg, kast. Dette er den dominerende modellen i dag, men ikke bærekraftig på sikt.',
      },
      {
        id: 'bf-4-2',
        question: 'IKEAs tilbakekjøpsprogram der kunder kan selge tilbake møbler er et eksempel på...',
        choices: [
          { id: 'a', text: 'Lineær økonomi' },
          { id: 'b', text: 'Grønnvasking' },
          { id: 'c', text: 'Sirkulær økonomi' },
          { id: 'd', text: 'Push-strategi' },
        ],
        correctId: 'c',
        explanation: 'IKEA-programmet holder ressursene i bruk lenger — møbler som ellers ville blitt kastet pusses opp og selges videre, i tråd med sirkulær økonomi.',
      },
      {
        id: 'bf-4-3',
        question: 'Electrolux selger vask-som-tjeneste fremfor vaskemaskiner. Hva er den sirkulærøkonomiske logikken?',
        choices: [
          { id: 'a', text: 'Det er billigere for kunden' },
          { id: 'b', text: 'Electrolux har incentiv til å lage holdbare maskiner og reparere dem, siden de eier dem — reduserer ressursbruk' },
          { id: 'c', text: 'Det er lettere å markedsføre' },
          { id: 'd', text: 'Det gir høyere profitt alltid' },
        ],
        correctId: 'b',
        explanation: 'Når produsenten beholder eierskap, har de incentiv til å lage holdbare produkter og reparere dem — motsatt av lineær modell der produsenten tjener på at produktet ryker.',
      },
      {
        id: 'bf-4-4',
        question: 'Finn.no bidrar til sirkulær økonomi ved å...',
        choices: [
          { id: 'a', text: 'Selge nye produkter til lave priser' },
          { id: 'b', text: 'Gjøre det enkelt å kjøpe og selge brukte varer, som forlenger produkters levetid' },
          { id: 'c', text: 'Donere til gjenvinningsselskaper' },
          { id: 'd', text: 'Produsere bærekraftige produkter' },
        ],
        correctId: 'b',
        explanation: 'En bruktmarkedsplass som Finn.no forlenger produkters levetid — en brukt sykkel som byttes mellom tre eiere krever ikke tre nye sykkelproduksjoner.',
      },
      {
        id: 'bf-4-5',
        question: 'Hva er det viktigste spørsmålet en bedrift bør stille seg for å finne muligheter i sirkulær økonomi?',
        choices: [
          { id: 'a', text: 'Hva koster det å implementere?' },
          { id: 'b', text: 'Hva skjer med produktet etter at kunden er ferdig med det?' },
          { id: 'c', text: 'Hvilke konkurrenter gjør det samme?' },
          { id: 'd', text: 'Hva mener myndighetene vi bør gjøre?' },
        ],
        correctId: 'b',
        explanation: 'Svaret på «hva skjer med produktet etter bruk» avslører om det finnes sirkulære muligheter — reparasjon, gjenbruk, leie, tilbakekjøp eller materialgjenvinning.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🚨',
    title: 'Grønnvasking — hva er det og hvordan unngå det?',
    quote: 'Det er bedre å gjøre lite ekte enn å kommunisere mye falskt.',
    content: 'Grønnvasking er når bedrifter fremstiller seg som mer bærekraftige enn de faktisk er. Fra 2026 er det ulovlig i EU å gjøre vage miljøpåstander uten dokumentasjon. Den beste måten å unngå grønnvasking på er å kommunisere konkret og ærlig om hva du faktisk gjør.',
    subpoints: [
      { label: 'VAGE PÅSTANDER', text: 'Ord som «miljøvennlig», «grønn» og «bærekraftig» uten konkret innhold er klassisk grønnvasking — hva betyr det egentlig, og kan det dokumenteres?' },
      { label: 'IRRELEVANTE SERTIFISERINGER', text: 'Å vise frem en sertifisering som ikke er relevant for det produktet påstår — som en vannflaske sertifisert som "fri for CFC-gasser" (noe all plast er).' },
      { label: 'EKTE BÆREKRAFTSKOMMUNIKASJON', text: 'Stormbergs årsrapport er et forbilde: de viser konkrete tall på hva de har oppnådd, hva de ikke har nådd og hva de jobber med å forbedre.' },
    ],
    practical: 'Kommuniser alltid med konkrete tall og fakta bak bærekraftspåstander — «vi bruker 30% resirkulert polyester i vår vinterkolleksjon» er troverdig, «vi bryr oss om planeten» er ikke.',
    glossaryTerm: 'Grønnvasking',
    exercises: [
      {
        id: 'bf-5-1',
        question: 'Hva er grønnvasking?',
        choices: [
          { id: 'a', text: 'En legitim markedsføringsstrategi for bærekraftige produkter' },
          { id: 'b', text: 'Når bedrifter fremstiller seg som mer bærekraftige enn de faktisk er, gjennom villedende eller overdrevne påstander' },
          { id: 'c', text: 'En type grønn emballasje' },
          { id: 'd', text: 'En metode for å vaske maskiner miljøvennlig' },
        ],
        correctId: 'b',
        explanation: 'Grønnvasking er villedende kommunikasjon om bærekraft — enten bevisst eller gjennom overdrivelse — som gir et falsk inntrykk av bedriftens miljøinnsats.',
      },
      {
        id: 'bf-5-2',
        question: 'Et flyselskap kaller sine flyvninger «klimanøytrale» basert på karbonkvoter av tvilsom kvalitet. Hva er dette?',
        choices: [
          { id: 'a', text: 'Lovlig og ærlig kommunikasjon' },
          { id: 'b', text: 'Grønnvasking — påstanden er villedende fordi grunnlaget ikke holder' },
          { id: 'c', text: 'En god bærekraftsstrategi' },
          { id: 'd', text: 'Sirkulær økonomi' },
        ],
        correctId: 'b',
        explanation: 'Å bruke tvilsomme karbonkvoter til å kalle flyvninger «klimanøytrale» er et klassisk grønnvaskingseksempel — påstanden er ikke faktabasert.',
      },
      {
        id: 'bf-5-3',
        question: 'Fra 2026 er det ulovlig i EU å gjøre vage miljøpåstander uten dokumentasjon. Hva betyr dette for norske bedrifter?',
        choices: [
          { id: 'a', text: 'Ingenting — Norge er ikke EU-land' },
          { id: 'b', text: 'Alle miljøpåstander i markedsføringen må kunne dokumenteres og underbygges med konkrete data' },
          { id: 'c', text: 'Det er kun relevant for industribedrifter' },
          { id: 'd', text: 'Bedrifter kan ikke lenger bruke grønn farge i markedsføringen' },
        ],
        correctId: 'b',
        explanation: 'Selv om Norge ikke er EU-medlem, selger de fleste norske bedrifter i EU-markedet og følger EØS-regelverket — nye EU-krav påvirker norsk næringsliv.',
      },
      {
        id: 'bf-5-4',
        question: 'Hva gjør Stormbergs bærekraftskommunikasjon troverdig?',
        choices: [
          { id: 'a', text: 'De bruker mange grønne farger i markedsføringen' },
          { id: 'b', text: 'De viser konkrete tall på hva de har oppnådd, hva de ikke har nådd og hva de jobber med — inkludert egne utfordringer' },
          { id: 'c', text: 'De er sertifisert av mange organisasjoner' },
          { id: 'd', text: 'De donerer mye til miljøorganisasjoner' },
        ],
        correctId: 'b',
        explanation: 'Stormberg er et forbilde fordi de er transparente om både suksesser og fiaskoer — ærlighet om begrensninger er det som gjør dem troverdige.',
      },
      {
        id: 'bf-5-5',
        question: 'Hva er forskjellen mellom disse to påstandene: «Vi bryr oss om planeten» vs «Vi bruker 30% resirkulert polyester i vinterkolleksjonen»?',
        choices: [
          { id: 'a', text: 'Den første er bedre fordi den er enklere å forstå' },
          { id: 'b', text: 'Den andre er konkret og verifiserbar, den første er en vag påstand som ikke kan dokumenteres' },
          { id: 'c', text: 'De kommuniserer det samme' },
          { id: 'd', text: 'Den første er mer ærlig' },
        ],
        correctId: 'b',
        explanation: 'Vage påstander («vi bryr oss») kan ikke verifiseres og er klassisk grønnvasking. Konkrete tall («30% resirkulert polyester») er spesifikke, målbare og troverdige.',
      },
    ],
  },
]

export default function BaerekraftForretningsideeModule() {
  return (
    <DrawerModule
      moduleCode="MFI5"
      moduleTitle="Bærekraftig forretningsidé"
      moduleIcon="🌱"
      storageKey="learning-mfi-baerekraft-forretningsidee"
      completeRoute="/learning/mfi/baerekraft-forretningsidee/complete"
      phases={PHASES}
      intro="Bærekraft i næringslivet handler ikke om å plante et tre for å kompensere for klimasynder — det handler om å bygge forretningsmodeller som skaper verdi uten å ødelegge planeten og samfunnet de er en del av. Norske forbrukere og myndigheter stiller stadig høyere krav til bedrifters bærekraftsarbeid, og bedrifter som ikke tar dette på alvor risikerer ikke bare omdømmetap, men også å bli utkonkurrert av aktører med bedre svar på fremtidens utfordringer."
      vissteduAt="Norge er blant verdens beste land på gjenvinning av plastemballasje, med en panteandel for plastflasker på over 92%. Pantesystemet, som ble innført på 1970-tallet, er et klassisk eksempel på sirkulær økonomi som fungerer — og det ble bygget opp gjennom samarbeid mellom næringslivet og myndighetene, ikke påtvunget fra den ene parten alene."
      espenSier="Jeg rådgir mange bedrifter som vil «gjøre noe med bærekraft», og den største feilen jeg ser er at de begynner med kommunikasjonen istedenfor praksisen. Finn ett konkret område der din bedrift kan gjøre en reell forskjell, gjør det skikkelig, dokumenter det — og kommuniser deretter. Det er den eneste troverdige veien."
      presentationLink={{ route: '/learning/presentations/forretningsidee', description: 'Forretningsidé — en visuell gjennomgang av innovasjon og USP' }}
    />
  )
}
