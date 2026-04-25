import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🌱',
    title: 'Megatrender som driver næringslivet fremover',
    quote: '"En megatrend er ikke en mote — den er en uunngåelig kraft som omformer hele bransjer."',
    content: 'Det moderne næringslivet drives fremover av langsiktige, globale krefter som kalles megatrender. Disse er ikke kortvarige motesvingninger — de er dyptgående endringer i samfunnet som tvinger alle virksomheter til å tilpasse seg, uansett bransje eller størrelse. For servicebedrifter i salg og reiseliv er det særlig tre megatrender som er avgjørende.',
    subpoints: [
      { label: 'Digitalisering', text: 'Teknologi endrer alt: kundeadferd, distribusjon, kommunikasjon og forretningsmodeller' },
      { label: 'Demografiske endringer', text: 'Aldrende befolkning, urbanisering og generasjonsskifter endrer hvem kundene er og hva de vil ha' },
      { label: 'Sirkulær økonomi', text: 'Overgang fra "ta-lag-kast" til et system der ressurser holdes i omløp lengst mulig' },
      { label: 'Konsekvens', text: 'Bedrifter som ikke tilpasser seg disse trendene, mister konkurransekraft — uavhengig av kvaliteten på eksisterende produkter' },
    ],
    practical: 'Tenk over: Hvilken av disse tre megatrendene påvirker bransjen du er interessert i jobbe i, mest? Hva gjør de ledende aktørene for å tilpasse seg?',
    exercises: [
      {
        id: 'tf1-1',
        icon: '🌱',
        title: 'Forstå megatrender',
        question: 'Hva skiller en megatrend fra en normal trend?',
        choices: [
          { id: 'a', label: 'En megatrend varer bare noen måneder lenger enn en normal trend', isCorrect: false, feedback: 'Megatrender er ikke bare lengre — de er fundamentalt transformerende for hele samfunnsstrukturen.' },
          { id: 'b', label: 'En megatrend er en langsiktig, global kraft som omformer samfunn og næringsliv', isCorrect: true, feedback: 'Riktig! Megatrender er tiår-lange skifter som ingen bedrift kan ignorere.' },
          { id: 'c', label: 'En megatrend er bare aktuell for store multinasjonale selskaper', isCorrect: false, feedback: 'Megatrender påvirker alle — inkludert den lokale kiosken og den lille reiselivsbedriften.' },
          { id: 'd', label: 'Megatrender er forutsigbare og enkle å tilpasse seg til', isCorrect: false, feedback: 'Megatrender kan observeres tidlig, men tilpasning krever ofte grunnleggende endringer i forretningsmodell.' },
        ],
        espenTip: 'Tre megatrender å huske: Digitalisering, Demografi, Sirkulær økonomi. Alle tre henger sammen — digitaliseringen gjør sirkulær økonomi mulig i stor skala.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔄',
    title: 'Sirkulærøkonomi — ressurser i omløp',
    quote: '"I den lineære økonomien er avfall et problem. I sirkulærøkonomien er avfall en ressurs."',
    content: 'Den tradisjonelle lineære økonomien fungerer etter prinsippet "ta ressurser → lag produkt → kast". Sirkulærøkonomien er designet for å holde ressurser i omløp lengst mulig — gjennom gjenbruk, reparasjon, oppgradering og resirkulering. For servicebransjen betyr dette en fundamental endring i hva man tilbyr kundene.',
    subpoints: [
      { label: 'Lineær økonomi', text: 'Råmaterialer → produksjon → bruk → avfall. Ressurser brukes én gang' },
      { label: 'Sirkulær økonomi', text: 'Produkter designet for å repareres, deles, oppgraderes og resirkuleres. Avfall minimeres' },
      { label: 'Praktiske eksempler', text: 'Leie fremfor kjøp (Kiloutou), reparasjonstjenester, gjenbrukshandel, refill-stasjoner' },
      { label: 'Konkurransefortrinn', text: 'Kunder som velger sirkulære alternativer er lojale og betalingsvillige' },
    ],
    practical: 'Finn et eksempel: Hvilke virksomheter i ditt lokalmiljø jobber etter sirkulære prinsipper? Bruktbutikk? Sykkelreparasjon? Leie-tjenester?',
    exercises: [
      {
        id: 'tf2-1',
        icon: '🔄',
        title: 'Sirkulærøkonomi i praksis',
        question: 'Et klesmerke tilbyr "kjøp tilbake"-ordning der kunder kan levere inn brukte klær og få rabatt på neste kjøp. Hva illustrerer dette?',
        choices: [
          { id: 'a', label: 'En vanlig salgsfremmende kampanje uten bærekraftsverdi', isCorrect: false, feedback: 'Ordningen holder ressurser i omløp — definisjon på sirkulær økonomi.' },
          { id: 'b', label: 'Sirkulær økonomi — holder klærne i omløp lenger og reduserer avfall', isCorrect: true, feedback: 'Riktig! Tilbakekjøp + gjenbruk/resirkulering er et klassisk sirkulært forretningskonsept.' },
          { id: 'c', label: 'Grønnvasking — de bytter ikke egentlig ut forretningsmodellen', isCorrect: false, feedback: 'Ordningen er en ekte sirkulær handling — ikke bare markedsføring.' },
          { id: 'd', label: 'En ny leverandørmodell som ikke påvirker kunden', isCorrect: false, feedback: 'Kunden er aktivt involvert — det er en del av forretningsmodellen.' },
        ],
        espenTip: 'Sirkulær økonomi i service = leie, reparere, ta tilbake, resirkulere. Se etter disse elementene i virksomheter du kjenner.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📦',
    title: 'Abonnementsmodellen — forutsigbar inntekt',
    quote: '"Abonnement snur relasjonen: kunden er ikke et salg — kunden er en varig forbindelse."',
    content: 'Abonnementsmodellen erstatter i økende grad tradisjonelt engangs-varesalg. I stedet for å selge et produkt én gang, selger bedriften tilgang til en tjeneste for en fast, gjentakende betaling. Modellen gir forutsigbar inntekt for bedriften og kontinuerlig verdi for kunden.',
    subpoints: [
      { label: 'Definisjon', text: 'Kunden betaler fast, gjentakende beløp (månedlig, årlig) for kontinuerlig tilgang til produkt eller tjeneste' },
      { label: 'Fordeler for bedriften', text: 'Forutsigbar inntekt, lavere churn (kundefrafall), enklere planlegging av produksjon og bemanning' },
      { label: 'Fordeler for kunden', text: 'Lavere inngangsterskel, automatisk oppdatering, alltid tilgang uten å eie' },
      { label: 'Eksempler', text: 'Netflix, Spotify, matboks-levering, treningssenter, SaaS-programvare' },
    ],
    practical: 'Tell: Hvor mange abonnementstjenester betaler du for? Hva er den månedlige totalkostnaden? Hva ville engangs-kjøp av disse tjenestene kostet?',
    exercises: [
      {
        id: 'tf3-1',
        icon: '📦',
        title: 'Abonnementsmodell',
        question: 'En restaurant tilbyr månedlig "ubegrenset lunsj"-abonnement for 1 500 kr. Hva er forretningslogikken?',
        choices: [
          { id: 'a', label: 'Restauranten mister penger — kunder spiser mer enn abonnementet er verdt', isCorrect: false, feedback: 'Restauranten kjenner gjennomsnittlig forbruk og priser abonnementet tilsvarende — dessuten kommer mange sjeldnere.' },
          { id: 'b', label: 'Forutsigbar inntekt, lojalitet, og muligheten til å planlegge kjøp og bemanning bedre', isCorrect: true, feedback: 'Riktig! Abonnementsmodellen gir restauranten forutsigbarhet og økt kundelojalitet.' },
          { id: 'c', label: 'Modellen fungerer bare for digitale tjenester', isCorrect: false, feedback: 'Abonnement fungerer for mange fysiske tjenester: treningssenter, klesleie, bilpool.' },
          { id: 'd', label: 'Kunden betaler mer enn nødvendig og er ikke tjent med modellen', isCorrect: false, feedback: 'Kunden betaler for trygghet og bekvemmelighet — verdien er reell.' },
        ],
        espenTip: 'Abonnement = forutsigbarhet for begge parter. Bedriften planlegger bedre. Kunden bruker uten å tenke på pris per gang. En vinn-vinn modell.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🚗',
    title: 'Delingsøkonomi — utnytt det uutnyttede',
    quote: '"Airbnb er verdens største hotellkjede uten å eie ett eneste rom."',
    content: 'Delingsøkonomien er basert på å utnytte underutnyttede ressurser ved å formidle dem mellom de som har og de som trenger. Digitale plattformer gjør dette mulig i stor skala. Modellen har disrupert hotellbransjen (Airbnb), taxi (Uber) og nå mange andre sektorer.',
    subpoints: [
      { label: 'Grunnprinsipp', text: 'Underutnyttede eiendeler (bil, bolig, kunnskap, tid) formidles til de som trenger dem — mot betaling' },
      { label: 'Plattformøkonomi', text: 'Digitale plattformer (Airbnb, Finn.no, Nabobil) er formidlere — de eier verken product eller tjeneste' },
      { label: 'Disrupsjon', text: 'Delingsøkonomi utkonkurrerer tradisjonelle modeller på pris og bekvemmelighet' },
      { label: 'Utfordringer', text: 'Regulering (skattelovgivning, forsikring), kvalitetssikring og arbeiderrettigheter' },
    ],
    practical: 'Diskuter: Hvem er taperne og hvem er vinnerne i delingsøkonomien? Hva bør tradisjonelle hoteller gjøre for å møte Airbnb-konkurransen?',
    exercises: [
      {
        id: 'tf4-1',
        icon: '🚗',
        title: 'Delingsøkonomi',
        question: 'Nabobil.no lar folk leie ut bilen sin til naboer. Hva er nøkkelressursen de utnytter?',
        choices: [
          { id: 'a', label: 'Bilprodusentenes overkapasitet i fabrikker', isCorrect: false, feedback: 'Nabobil jobber med eksisterende biler hos privatpersoner, ikke produsenter.' },
          { id: 'b', label: 'Privat biler som står parkert store deler av dagen', isCorrect: true, feedback: 'Riktig! En gjennomsnittlig bil brukes bare 4 % av tiden. Nabobil utnytter de resterende 96 %.' },
          { id: 'c', label: 'Leiebilselskapenes overkapasitet', isCorrect: false, feedback: 'Nabobil er P2P (person-til-person) — ikke en videreformidler av kommersielle leiebilselskaper.' },
          { id: 'd', label: 'Parkeringsplasser i byene', isCorrect: false, feedback: 'Parkeringsplasser er en bieffekt. Selve ressursen er bilen og dens ledigkapasitet.' },
        ],
        espenTip: '"Sharing economy" = utnyttelse av ledigkapasitet. Spør alltid: "Hva er den underutnyttede ressursen?" — det er kjerneproduktet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '⚖️',
    title: 'Den tredoble bunnlinjen — mennesker, planet, profit',
    quote: '"En bedrift som bare måler profitt, ser bare én tredjedel av bildet."',
    content: 'Den tredoble bunnlinjen (Triple Bottom Line) er et rammeverk som utvider det tradisjonelle lønnsomhetsmålet til å inkludere sosiale og miljømessige resultater. Bærekraft er ikke utelukkende synonymt med klimavern — det handler om alle tre dimensjonene i balanse.',
    subpoints: [
      { label: 'Profit (Økonomi)', text: 'Bedriftens finansielle lønnsomhet. Nødvendig for langsiktig overlevelse' },
      { label: 'People (Sosial)', text: 'Ansattes arbeidsforhold, lønnsomhet, mangfold, lokalmiljø og leverandørkjede' },
      { label: 'Planet (Miljø)', text: 'Klimaavtrykk, ressursbruk, avfallshåndtering og biodiversitet' },
      { label: 'Balansen', text: 'Alle tre veier like tungt. Høy profitt på bekostning av mennesker eller planet er ikke bærekraftig' },
    ],
    practical: 'Vurder: En kjent norsk virksomhet du bruker — hva gjør de bra innen alle tre dimensjonene? Hva kan forbedres? Søk etter deres bærekraftsrapport.',
    exercises: [
      {
        id: 'tf5-1',
        icon: '⚖️',
        title: 'Tredoble bunnlinjen',
        question: 'En tekstilbedrift tjener god profitt, men bruker fabrikker med dårlige arbeidsforhold i Asia. Hvordan scorer de på tredoble bunnlinjen?',
        choices: [
          { id: 'a', label: 'Bra — de oppfyller bunnlinjen siden de er lønnsomme', isCorrect: false, feedback: 'Profitt er bare én av tre dimensjoner. Dårlige arbeidsforhold er brudd på "People"-dimensjonen.' },
          { id: 'b', label: 'Svakt på "People"-dimensjonen — tredoble bunnlinjen er ikke oppfylt', isCorrect: true, feedback: 'Riktig! Høy profitt kompenserer ikke for brudd på sosiale standarder i den tredoble bunnlinjen.' },
          { id: 'c', label: 'Bra på profitt og planet, svakt på sosial', isCorrect: false, feedback: 'Vi vet ikke noe om miljødimensjonen fra informasjonen gitt. Og "svakt på sosial" er nøkkelsvaret.' },
          { id: 'd', label: 'Det er loven som definerer hva som er godt nok — ikke noe konsept', isCorrect: false, feedback: 'Tredoble bunnlinjen er et strategisk rammeverk, og loven (Åpenhetsloven) krever nettopp vurdering av leverandørenes arbeidsforhold.' },
        ],
        espenTip: 'Åpenhetsloven (2022) krever at norske virksomheter dokumenterer sosiale standarder i leverandørkjeden. Tredoble bunnlinjen er ikke lenger bare et konsept — det er lovpålagt rapportering.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '👗',
    title: 'Voice-eksemplet — tekstil møter bærekraft',
    quote: '"Å integrere bærekraft i forretningsmodellen er ikke kostnad — det er investering i fremtidig relevans."',
    content: 'Kleskonsernet Voice (som eier Match og VIC) har måttet tilpasse seg tekstilmarkedets dreining mot bærekraft. Eksemplet illustrerer hvordan en etablert aktør integrerer sirkulære løsninger og reduserer klima- og miljøpåvirkning som respons på megatrender — ikke bare som markedsføring, men som strukturell forretningsendring.',
    subpoints: [
      { label: 'Utgangspunktet', text: 'Tradisjonell klesforhandler med lineær modell: selge nye klær, kast de gamle' },
      { label: 'Endringen', text: 'Integrerte sirkulære løsninger: tilbakekjøp, gjenbruk, produsent-ansvar for materialer' },
      { label: 'Driveren', text: 'Megatrender: forbrukerne (særlig unge) forventer bærekraft og belønner det med kjøp og lojalitet' },
      { label: 'Resultatet', text: 'Redusert klimaavtrykk, økt kundelojalitet, og differensiering i et mett marked' },
    ],
    practical: 'Undersøk: Se etter Voice/Match sin bærekraftsrapport. Hva er de konkrete tiltakene? Er det grønnvasking eller ekte endring? Hva er kriteriene for å skille?',
    exercises: [
      {
        id: 'tf6-1',
        icon: '👗',
        title: 'Tilpasning til megatrender',
        question: 'Hva er den strategiske begrunnelsen for at Voice integrerer bærekraft i forretningsmodellen?',
        choices: [
          { id: 'a', label: 'Kun for å oppfylle lovkrav', isCorrect: false, feedback: 'Lovkrav er én driver, men Voice-eksemplet handler om å svare på markedets etterspørsel og sikre fremtidig konkurransekraft.' },
          { id: 'b', label: 'Å svare på megatrender og bevare konkurransekraft i et marked der forbrukere forventer bærekraft', isCorrect: true, feedback: 'Riktig! Bærekraft som strategisk respons på megatrender — ikke bare regulatorisk etterlevelse.' },
          { id: 'c', label: 'Fordi konkurrentene tvinger dem til det gjennom prispress', isCorrect: false, feedback: 'Prispress alene forklarer ikke strukturelle endringer i forretningsmodellen.' },
          { id: 'd', label: 'For å spare kostnader på råmaterialer', isCorrect: false, feedback: 'Bærekraftstilpasning kan redusere kostnader, men det er ikke den primære strategiske begrunnelsen.' },
        ],
        espenTip: 'Megatrender skaper muligheter for de som tilpasser seg og trusler for de som ikke gjør det. Voice eksemplet: bærekraft er ikke kostnad — det er fremtidig inntektsstrøm.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🛒',
    title: 'NorgesGruppen-eksemplet — markedsmakt for bærekraft',
    quote: '"Størst i markedet har størst ansvar — og størst påvirkningskraft."',
    content: 'NorgesGruppen (Kiwi, Meny, Spar) er Norges største dagligvarekjede og utfordrer sine 1 400 leverandører til å kutte utslipp og redusere matsvinn. Eksemplet viser hvordan en aktør kan bruke markedsmakt til å drive bærekraft oppover og nedover i verdikjeden.',
    subpoints: [
      { label: 'Markedsmakten', text: 'NorgesGruppen representerer 43 % av norsk dagligvaresalg — leverandører MÅ forholde seg til dem' },
      { label: 'Kravene', text: 'Karbonnøytralitet i leverandørkjeden, matsvinnreduksjon, og transparent klimarapportering' },
      { label: 'Effekten', text: '1 400 leverandører endrer praksiser — samlet effekt er langt større enn NorgesGruppen alene' },
      { label: 'Bærekraft som krav', text: 'Leverandører som ikke møter kravene, risikerer å miste den viktigste norske distributøren' },
    ],
    practical: 'Analyser: Finn NorgesGruppens siste bærekraftsrapport. Hva er de tre viktigste klimatiltakene? Er noen av disse virksomhetsovergripende (dvs. de tvinger leverandørene til å endre seg)?',
    exercises: [
      {
        id: 'tf7-1',
        icon: '🛒',
        title: 'Verdikjedepress',
        question: 'NorgesGruppen krever at alle leverandører halverer sin klimaemisjon innen 2030. Hva er det strategiske begrepet for dette?',
        choices: [
          { id: 'a', label: 'Vertikalt monopol', isCorrect: false, feedback: 'Vertikalt monopol er ikke et bærekraftsbegrep. Markedsmakt til å drive bærekraft i verdikjeden er det relevante konseptet.' },
          { id: 'b', label: 'Verdikjedebærekraft — bruk av markedsmakt til å drive bærekraft gjennom hele forsyningskjeden', isCorrect: true, feedback: 'Riktig! Å bruke kjøpermakt til å stille krav til leverandørers bærekraftspraksis.' },
          { id: 'c', label: 'Grønnvasking på leverandørnivå', isCorrect: false, feedback: 'Grønnvasking er å fremstille seg som mer bærekraftig enn man er. Her stiller NorgesGruppen reelle krav.' },
          { id: 'd', label: 'Åpenhetsloven-etterlevelse', isCorrect: false, feedback: 'Åpenhetsloven krever vurdering av leverandørers arbeidsforhold, men NorgesGruppen-eksemplet handler om klimakrav.' },
        ],
        espenTip: 'Scope 3-utslipp (leverandørkjeden) er i gjennomsnitt 5–10 ganger større enn en bedrifts egne utslipp. Å stille krav til leverandørene gir størst klimaeffekt.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🚫',
    title: 'Misforståelse — bærekraft er ikke bare klima',
    quote: '"Å plante et tre kompenserer ikke for dårlige arbeidsforhold i leverandørkjeden."',
    content: 'Den vanligste og mest begrensende misforståelsen om bærekraft er at det utelukkende handler om klimavern og resirkulering. Denne snevre forståelsen fører til at bedrifter ignorerer de like viktige sosiale og økonomiske dimensjonene — og at forbrukere belønner "grønn" markedsføring uten å stille spørsmål ved de andre aspektene.',
    subpoints: [
      { label: 'Myten', text: '"Bærekraft = klimavern + resirkulering." Kun én av tre dimensjoner.' },
      { label: 'Den sosiale dimensjonen', text: 'Arbeidsforhold hos leverandører, likestilling, mangfold, lokalsamfunns-påvirkning' },
      { label: 'Den økonomiske dimensjonen', text: 'Rimelige arbeidsforhold, rettferdige priser, ansvarlig skatteetterlevelse' },
      { label: 'Grønnvasking', text: 'Å fremstille seg som bærekraftig gjennom markedsføring uten ekte endring. Forbrukertilsynet slår ned på dette' },
    ],
    practical: 'Kritisk blikk: Finn en reklame som bruker bærekraft som argument. Hva er det faktiske tiltaket? Er det alle tre dimensjoner, eller bare én? Er det reellt eller grønnvasking?',
    exercises: [
      {
        id: 'tf8-1',
        icon: '🚫',
        title: 'Grønnvasking vs ekte bærekraft',
        question: 'Et flyselskap kaller seg "bærekraftig" fordi de har plantet 100 000 trær. Hva er problemet?',
        choices: [
          { id: 'a', label: 'Ingenting — treplanting er et effektivt klimatiltak', isCorrect: false, feedback: 'Treplanting er bra, men et flyselskaps kjerneaktivitet genererer store utslipp som ikke kompenseres av trær.' },
          { id: 'b', label: 'Potensielt grønnvasking — treplanting oppveier ikke flyselskapets kjernevirksomhets klimaavtrykk', isCorrect: true, feedback: 'Riktig! Markedsføringsloven og Forbrukertilsynet håndhever forbud mot villedende bærekraftspåstander.' },
          { id: 'c', label: 'Problematisk fordi treplanting kun handler om biologisk mangfold, ikke klima', isCorrect: false, feedback: 'Treplanting er faktisk et klimatiltak, men problemet er uforholdsmessigheten og den villedende markedsføringen.' },
          { id: 'd', label: 'Akseptabelt om de planter nok trær til å kompensere for alle utslipp', isCorrect: false, feedback: 'Karbonkompensering gjennom treplanting er omdiskutert faglig, og "tilstrekkelig kompensering" er vanskelig å verifisere.' },
        ],
        espenTip: 'Grønnvasking-test: Er tiltaket proporsjonalt med virksomhetens faktiske miljøpåvirkning? Er det dokumentert og verifiserbart? Nei = mulig grønnvasking.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Åpenhetsloven og Markedsføringsloven',
    quote: '"Bærekraft er ikke lenger frivillig — det er juridisk forpliktelse."',
    content: 'Norsk lovgivning har fanget opp bærekraft-megatrenden og gjort deler av den til lovkrav. To lover er særlig relevante for servicebedrifter: Åpenhetsloven (sosial bærekraft i leverandørkjeden) og Markedsføringsloven (forbud mot grønnvasking).',
    subpoints: [
      { label: 'Åpenhetsloven (2022)', text: 'Pålegger større norske virksomheter å utføre aktsomhetsvurderinger knyttet til menneskerettigheter og arbeidsforhold i leverandørkjeden' },
      { label: 'Rapporteringsplikt', text: 'Virksomheter underlagt Åpenhetsloven plikter å publisere aktsomhetsvurdering og svare på innsynsforespørsler' },
      { label: 'Markedsføringsloven', text: 'Forbyr villedende markedsføring — inkludert udokumenterte bærekraftspåstander (grønnvasking)' },
      { label: 'Forbrukertilsynet', text: 'Håndhever Markedsføringsloven og slår ned på grønnvasking i reklame' },
    ],
    practical: 'Ressurs: Etikkinformasjon.no har en guide til Åpenhetsloven med konkrete eksempler på hva som kreves av ulike virksomhetsstørrelser.',
    exercises: [
      {
        id: 'tf9-1',
        icon: '⚖️',
        title: 'Åpenhetsloven',
        question: 'Hva krever Åpenhetsloven av virksomheter den gjelder for?',
        choices: [
          { id: 'a', label: 'Kun å publisere et bærekraftsmål', isCorrect: false, feedback: 'Åpenhetsloven krever mer enn en målsetting — det er en plikt til faktisk aktsomhetsvurdering og dokumentasjon.' },
          { id: 'b', label: 'Aktsomhetsvurdering av menneskerettigheter og arbeidsforhold i leverandørkjeden, med rapporteringsplikt', isCorrect: true, feedback: 'Riktig! Åpenhetsloven krever konkret kartlegging av sosiale risikoer i verdikjeden.' },
          { id: 'c', label: 'At alle produkter er klimanøytrale', isCorrect: false, feedback: 'Åpenhetsloven handler om menneskerettigheter og arbeidsforhold — ikke klimanøytralitet.' },
          { id: 'd', label: 'Kun å svare på myndigheters forespørsler', isCorrect: false, feedback: 'Virksomheten plikter å proaktivt gjennomføre vurderingene, ikke bare svare reaktivt.' },
        ],
        espenTip: 'Åpenhetsloven = sosial bærekraft + åpenhet. Markedsføringsloven = miljøbærekraft i kommunikasjon. To ulike lover, to ulike dimensjoner av bærekraft.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌟',
    title: 'Oppsummering — tilpasning er overlevelse',
    quote: '"Det er ikke de sterkeste som overlever, men de som er best til å tilpasse seg forandring." — Charles Darwin',
    content: 'Megatrender er uunngåelige krefter som omformer næringslivet. Bedrifter som forstår og tilpasser seg disse trendene er bedre rustet for fremtiden. Som fagarbeider er det å forstå trender ikke bare nyttig — det er en del av den profesjonelle kompetansen som skiller gode fagarbeidere fra de virkelig gode.',
    subpoints: [
      { label: 'Megatrender', text: 'Digitalisering, demografiske endringer, sirkulær økonomi. Langsiktige krefter som former alle bransjer' },
      { label: 'Forretningsmodeller', text: 'Abonnement, delingsøkonomi, sirkulære modeller erstatter tradisjonelt engangs-varesalg' },
      { label: 'Tredoble bunnlinjen', text: 'Profit + People + Planet. Bærekraft er alle tre dimensjonene, ikke bare klimavern' },
      { label: 'Grønnvasking', text: 'Villedende bærekraftspåstander er forbudt etter Markedsføringsloven' },
      { label: 'Lovverk', text: 'Åpenhetsloven (sosial bærekraft) + Markedsføringsloven (anti-grønnvasking)' },
    ],
    practical: 'Neste steg: Les DFØ (Direktoratet for forvaltning og økonomi) sine eksempelsamlinger om bærekraftig forretningsutvikling på dfo.no.',
    exercises: [
      {
        id: 'tf10-1',
        icon: '🌟',
        title: 'Oppsummering',
        question: 'En student sier: "Bærekraft er viktig for naturen, men ikke for forretningsdriften." Hva er det mest presise motargumentet?',
        choices: [
          { id: 'a', label: 'Forretningsfolk bør også bry seg om naturen', isCorrect: false, feedback: 'Sant, men ikke det sterkeste faglige motargumentet.' },
          { id: 'b', label: 'Bærekraft er en juridisk forpliktelse (Åpenhetsloven) og en markedsdriver — ikke bare etikk', isCorrect: true, feedback: 'Riktig! Bærekraft er lovpålagt, forbrukerdrevet og strategisk nødvendig — ikke valgfri idealisme.' },
          { id: 'c', label: 'Det er dyrt å ikke være bærekraftig på sikt', isCorrect: false, feedback: 'Riktig, men dette er ett av mange motargumenter. Det juridiske og strategiske aspektet er sterkere.' },
          { id: 'd', label: 'Forbrukerne bryr seg om det', isCorrect: false, feedback: 'Sant, men studenten trengte det juridiske og strategiske argumentet, ikke bare markedsargumentet.' },
        ],
        espenTip: 'Bærekraft er: 1) Lovpålagt (Åpenhetsloven), 2) Markedsdrevet (forbrukerkrav), 3) Strategisk (fremtidig konkurransekraft). Alle tre grunner gjelder forretningsdrift.',
      },
    ],
  },
]

export default function TrenderForretningsmodellerModule() {
  return (
    <DrawerModule
      moduleCode="OK-VG2-6"
      moduleTitle="Trender, forretningsmodeller og bærekraft"
      moduleIcon="🌱"
      storageKey="learning-vg2-trender-forretningsmodeller"
      completeRoute="/learning/vg2/okonomi/trender-forretningsmodeller/complete"
      phases={phases}
      intro="Utforsk lokale trender og forretningsmodeller, og hvordan disse påvirker bærekraft og miljø."
      presentationLink={{ route: '/learning/presentations/trender-forretningsmodeller', description: 'Trender og forretningsmodeller — en visuell presentasjon' }}
    />
  )
}
