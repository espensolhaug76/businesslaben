import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔒',
    title: 'Digital sikkerhet — 90 % er menneskelige feil',
    quote: '"Den dyreste brannmuren i verden hjelper ikke hvis en ansatt klikker på feil lenke."',
    content: 'Digitaliseringen har dramatisk økt risikoen for datainnbrudd, identitetstyveri og kundelekkasje. Den viktigste statistikken å forstå: 90 % av alle vellykkede dataangrep utnytter menneskelige feil — ikke tekniske svakheter. Det betyr at din atferd er den viktigste sikkerhetsmekanismen i virksomheten.',
    subpoints: [
      { label: '90 %', text: 'av datainnbrudd starter med menneskelig feil: klikk på phishing-lenke, svakt passord, låst PC' },
      { label: 'Trusselbildet', text: 'Phishing-epost, falske nettsider, sosial manipulering og ransomware er de vanligste angrepsvektorene' },
      { label: 'Konsekvenser', text: 'Bøter etter GDPR (opp til 4 % av global omsetning), kunder mister tillit, tapt data' },
      { label: 'Hvem er mål?', text: 'Alle virksomheter. Små og mellomstore bedrifter er hyppigere mål enn store fordi de har svakere forsvar' },
    ],
    practical: 'Test deg selv: Åpne epostinnboksen. Finn en epost du ikke forventet fra en ukjent avsender. Klikker du på lenken? Hvilke signaler ser du på at den kan være phishing?',
    exercises: [
      {
        id: 'ds1-1',
        icon: '🔒',
        title: 'Mennesket som sikkerhetsrisiko',
        question: 'Hva er den vanligste årsaken til vellykkede dataangrep mot norske bedrifter?',
        choices: [
          { id: 'a', label: 'Hackers bruker avansert kvantedata-krypteringsangrep', isCorrect: false, feedback: 'Avanserte tekniske angrep er sjeldne. Menneskelige feil er langt vanligere og enklere å utnytte.' },
          { id: 'b', label: 'Menneskelige feil som phishing-klikk og svake passord', isCorrect: true, feedback: 'Riktig! 90 % av datainnbrudd utnytter menneskelig atferd, ikke tekniske hull.' },
          { id: 'c', label: 'Utdatert antivirusprogramvare', isCorrect: false, feedback: 'Viktig, men det er menneskelige feil som er den dominerende faktoren.' },
          { id: 'd', label: 'For svakt WiFi-passord', isCorrect: false, feedback: 'Svake WiFi-passord er ett problem, men phishing og sosial manipulering er mye vanligere angrepsvektorer.' },
        ],
        espenTip: '90 % menneskelig feil = 90 % kan forebygges med opplæring og gode rutiner. Du er virksomhetens viktigste sikkerhetsbarriere.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🇪🇺',
    title: 'GDPR — dine rettigheter og bedriftens plikter',
    quote: '"GDPR er ikke en hindring for virksomheten — det er en rettighet for kunden."',
    content: 'GDPR (General Data Protection Regulation) er EUs personvernforordning, implementert i norsk lov som Personopplysningsloven. Den gir enkeltpersoner kontroll over egne data og pålegger bedrifter strenge krav til hvordan personopplysninger samles inn, lagres og brukes.',
    subpoints: [
      { label: 'Behandlingsgrunnlag', text: 'Du kan kun behandle persondata hvis du har et lovlig grunnlag: samtykke, kontrakt, lov eller berettiget interesse' },
      { label: 'Dataminimering', text: 'Samle BARE de dataene du faktisk trenger. Ikke samle "for sikkerhets skyld"' },
      { label: 'Formålsbegrensning', text: 'Data kan kun brukes til det formålet de ble samlet inn for. Kundeepost kan ikke videreselges' },
      { label: 'Individets rettigheter', text: 'Innsyn, retting, sletting og dataportabilitet — kunden kan kreve dette av virksomheten' },
    ],
    practical: 'Tenk over: Hvilke personopplysninger samler virksomheten din inn? Er alle nødvendige? Hva er behandlingsgrunnlaget? Hvem har tilgang?',
    exercises: [
      {
        id: 'ds2-1',
        icon: '🇪🇺',
        title: 'GDPR-prinsippet',
        question: 'En nettbutikk samler inn fødselsdato, telefonnummer og bostedsadresse ved kunderegistrering. De bruker bare epostadressen til kommunikasjon. Hva er problemet?',
        choices: [
          { id: 'a', label: 'Ingen problem — mer data er bedre for fremtidig bruk', isCorrect: false, feedback: 'Dette er nettopp det GDPR forbyr: samle data "for sikkerhets skyld" uten klart formål.' },
          { id: 'b', label: 'De samler mer data enn nødvendig — brudd på datamineringsprinsippet', isCorrect: true, feedback: 'Riktig! Dataminimering krever at du kun samler inn det som er nødvendig for det spesifikke formålet.' },
          { id: 'c', label: 'GDPR gjelder ikke for nettbutikker', isCorrect: false, feedback: 'GDPR gjelder alle virksomheter som behandler personopplysninger om EU-/EØS-borgere.' },
          { id: 'd', label: 'Det er OK hvis de oppbevarer dataene sikkert', isCorrect: false, feedback: 'Sikker oppbevaring er nødvendig men ikke tilstrekkelig — innsamlingen selv er ulovlig.' },
        ],
        espenTip: 'GDPR-tommelregel: Kan du begrunne HVORFOR du trenger hvert datafelt? Nei = ikke samle. Ja = dokumenter grunnlaget.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🎣',
    title: 'Phishing — gjenkjenning og forebygging',
    quote: '"Hackere angriper ikke systemer — de angriper mennesker."',
    content: 'Phishing er den vanligste formen for sosial manipulering i arbeidslivet. Angripere sender falske epost, SMS eller meldinger som ser ut til å komme fra legitime avsendere for å lure mottakeren til å klikke på lenker, oppgi passord eller overføre penger.',
    subpoints: [
      { label: 'Kjennetegn på phishing', text: 'Hastebudskap ("handl nå!"), ukjent avsender, mistenkelig lenke-URL, stavefeil, ber om passord' },
      { label: 'Spear phishing', text: 'Målrettede angrep mot spesifikke ansatte — angriperen kjenner navn, stilling og kollegaer fra LinkedIn' },
      { label: 'Vishing', text: 'Phishing via telefon — noen utgir seg for å være IT-support og ber om passord' },
      { label: 'Hva gjøres', text: 'Klikk aldri på lenker i uventede epost. Sjekk URL ved å holde musen over (ikke klikke). Rapporter til IT' },
    ],
    practical: 'Huskeregel: STOP. THINK. CLICK. Stopp deg selv, tenk "forventer jeg denne eposten?", og klikk bare hvis du er sikker. Ikke klarer du å bestemme? Ring avsenderen på et kjent nummer.',
    exercises: [
      {
        id: 'ds3-1',
        icon: '🎣',
        title: 'Gjenkjenne phishing',
        question: 'Du mottar en epost fra "IT-avdelingen@firma-intern.no" som sier: "Passordet ditt utløper om 2 timer. Klikk her for å fornye det nå." Hva gjør du?',
        choices: [
          { id: 'a', label: 'Klikker på lenken fordi det ser offisielt ut', isCorrect: false, feedback: 'Domenet "firma-intern.no" er sannsynligvis falskt. Ikke klikk på lenker i hastebudskap om passord.' },
          { id: 'b', label: 'Videresender eposten til alle kolleger for å advare dem', isCorrect: false, feedback: 'Ikke spre potensielle phishing-lenker. Rapporter til IT-avdelingen i stedet.' },
          { id: 'c', label: 'Ringer IT-avdelingen på det kjente nummeret for å verifisere', isCorrect: true, feedback: 'Riktig! Verifiser alltid via kjent kanal. IT vil aldri be om passord via epost.' },
          { id: 'd', label: 'Sletter eposten uten å gjøre noe', isCorrect: false, feedback: 'Sletting er tryggere enn klikking, men du bør rapportere til IT slik at de kan advare andre.' },
        ],
        espenTip: 'Gylden regel: IT-avdelingen vil ALDRI be om passord via epost. Aldri. Ikke én gang.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔑',
    title: 'Passordsikkerhet — grunnmuren i digital sikkerhet',
    quote: '"Passordet 123456 beskytter ingenting. Det er som å låse sykkelen med et tau."',
    content: 'Svake passord er den vanligste enkeltfaktoren i datainnbrudd. Passordsikkerhet handler ikke bare om å velge et godt passord — det handler om å ha unike passord for ulike tjenester og å beskytte dem systematisk.',
    subpoints: [
      { label: 'Sterkt passord', text: 'Minimum 12 tegn, kombinasjon av store/små bokstaver, tall og spesialtegn. Unngå ord fra ordboken' },
      { label: 'Unikhet', text: 'Aldri bruk samme passord på to tjenester. Brudd på én tjeneste kompromitterer alle' },
      { label: 'Passordbehandler', text: 'Bruk et verktøy som KeePass, 1Password eller Bitwarden for å lagre og generere passord' },
      { label: 'To-faktorautentisering (2FA)', text: 'Ekstra sikkerhetslag: passord + SMS-kode eller autentiseringsapp. Aktiver der det er mulig' },
    ],
    practical: 'Sjekk: Bruker du samme passord på jobb som privat? Bruker du samme passord på e-post som nettbank? Hvis ja: bytt nå og aktiver 2FA.',
    exercises: [
      {
        id: 'ds4-1',
        icon: '🔑',
        title: 'Passordpraksis',
        question: 'En ansatt bruker passordet "Komplett2024!" på både jobbsystemet og privat e-post. Hva er risikoen?',
        choices: [
          { id: 'a', label: 'Ingen risiko — passordet er sterkt nok', isCorrect: false, feedback: 'Passordet er middels sterkt, men gjenbruk er det virkelige problemet.' },
          { id: 'b', label: 'Om ett system blir kompromittert, kan angriperen bruke passordet på det andre', isCorrect: true, feedback: 'Riktig! "Credential stuffing" er å prøve stjålne passord på andre tjenester. Unikhet er avgjørende.' },
          { id: 'c', label: 'Det er trygt fordi det inneholder tall og tegn', isCorrect: false, feedback: 'Kompleksitet hjelper, men gjenbruk nullstiller fordelene.' },
          { id: 'd', label: 'Risikoen er minimal fordi den private eposten ikke er jobb-relatert', isCorrect: false, feedback: 'Angripere bryr seg ikke om kontekst — de prøver et kompromittert passord overalt.' },
        ],
        espenTip: 'Passordbehandler løser gjenbruksproblemet. Bruk én god app, husk ett masterpassord, og la appen generere unike passord for alt annet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🗑️',
    title: 'Sletterutiner — rydding er sikkerhet',
    quote: '"Data du ikke trenger er ikke bare bortkastet lagringsplass — det er en sikkerhetsrisiko."',
    content: 'GDPR pålegger virksomheter å slette personopplysninger når formålet med lagringen har opphørt. Gode sletterutiner er ikke bare juridisk korrekt — det reduserer mengden data som kan stjeles ved et datainnbrudd.',
    subpoints: [
      { label: 'Formålsbegrensning', text: 'Når formålet er oppfylt, skal data slettes. Kundeopplysninger etter avsluttet avtale: slett' },
      { label: 'Unntak', text: 'Bokføringsloven krever at regnskapsdata beholdes i 5 år. Arbeidsavtaler beholdes i opptil 5 år' },
      { label: 'Slettingsrutine', text: 'Dokumenter en prosedyre: hvilke data slettes, når og av hvem. Dette er GDPR-dokumentasjon' },
      { label: 'Fysisk sletting', text: 'Papirdokumenter med personopplysninger makuleres — ikke kastes i papirkurven' },
    ],
    practical: 'Spør på jobben: Har virksomheten en dokumentert sletterutine? Vet HR hva som skjer med ansattes personopplysninger etter de slutter?',
    exercises: [
      {
        id: 'ds5-1',
        icon: '🗑️',
        title: 'Sletterutiner og unntak',
        question: 'En ansatt slutter. HR ønsker å beholde alle personopplysningene for alltid "i tilfelle de trenger det". Er dette lovlig?',
        choices: [
          { id: 'a', label: 'Ja — ansattopplysninger kan beholdes evig', isCorrect: false, feedback: 'Nei. GDPR krever sletting når formålet er oppfylt. "I tilfelle" er ikke et lovlig formål.' },
          { id: 'b', label: 'Nei — GDPR krever sletting når formålet er oppfylt, med unntak for lovpålagte krav', isCorrect: true, feedback: 'Riktig! Dokumenter beholdes i henhold til lov (f.eks. 5 år etter Bokføringsloven), deretter slettes.' },
          { id: 'c', label: 'Ja, men kun om personen har underskrevet en samtykke-erklæring', isCorrect: false, feedback: 'Samtykke er et behandlingsgrunnlag, men det kan ikke overstyre prinsippet om formålsbegrensning.' },
          { id: 'd', label: 'Avhenger av hva slags opplysninger det er', isCorrect: false, feedback: 'Prinsippet gjelder for alle personopplysninger — typen påvirker lagringstiden, ikke plikten til sletting.' },
        ],
        espenTip: 'GDPR-lagringstider: Regnskapsdata 5 år (Bokføringsloven). Vitnemål opp til 5 år. Rene personopplysninger (adresse, navn) etter avsluttet formål: slett.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '👤',
    title: 'HR-eksemplet — riktig håndtering av ansattdata',
    quote: '"Personopplysninger er ikke eiendom — de er data du forvalter på vegne av andre."',
    content: 'En HR-avdeling håndterer de mest sensitive personopplysningene i en virksomhet. Eksemplet illustrerer de vanligste GDPR-utfordringene og viser hva korrekt praksis er.',
    subpoints: [
      { label: 'Ansettelse', text: 'Kun samle inn det som er nødvendig for stillingsvurderingen. CV, vitnemål og attester. Ikke politiattest uten lovhjemmel' },
      { label: 'Under ansettelse', text: 'Begrenset tilgang til personopplysninger — bare de som trenger dem for jobben' },
      { label: 'Etter oppsigelse', text: 'Vitnemål og attester beholdes opptil 5 år (for å verne arbeidstakers rettigheter). Øvrig slettes' },
      { label: 'Praktisk konsekvens', text: 'HR-systemet bør ha automatiske varsler for slettefrister. Ikke slett manuelt — sett opp rutiner' },
    ],
    practical: 'Diskuter: Hva om en tidligere ansatt ber om innsyn i alle personopplysninger HR har om dem? Hva er virksomhetens plikt? (Svar: de har rett til innsyn og kopi innen 30 dager.)',
    exercises: [
      {
        id: 'ds6-1',
        icon: '👤',
        title: 'Ansattas rettigheter',
        question: 'En tidligere ansatt ber om å se alle personopplysninger virksomheten har om dem. Hva plikter virksomheten å gjøre?',
        choices: [
          { id: 'a', label: 'Ingenting — de er ikke lenger ansatt', isCorrect: false, feedback: 'GDPR gjelder uavhengig av ansettelsesforholdet. Alle individer har innsynsrett.' },
          { id: 'b', label: 'Gi innsyn og kopi av all data innen 30 dager, kostnadsfritt', isCorrect: true, feedback: 'Riktig! GDPR artikkel 15 gir innsynsrett med 30 dagers svarfrist.' },
          { id: 'c', label: 'Gi innsyn kun om de betaler et behandlingsgebyr', isCorrect: false, feedback: 'Innsyn er kostnadsfritt etter GDPR. Gebyr kan kun tas i unntakstilfeller.' },
          { id: 'd', label: 'Informere dem om at data er slettet uten å dokumentere dette', isCorrect: false, feedback: 'Virksomheten plikter å dokumentere all databehandling, inkludert sletting.' },
        ],
        espenTip: 'Individets fem rettigheter etter GDPR: 1) Innsyn, 2) Retting, 3) Sletting, 4) Begrensning, 5) Dataportabilitet. Alle kan kreves gratis innen 30 dager.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '💻',
    title: 'Den ulåste PC-en — daglige sikkerhetsrutiner',
    quote: '"30 sekunder med ulåst skjerm kan koste et kundedatabrud og million-kroner i bøter."',
    content: 'De daglige sikkerhetsrutinene er enkle men kritiske. Den vanligste sikkerhetsbristen i service-yrker er ikke hacking — det er ansatte som forlater arbeidsstasjonene sine uten å låse skjermen. Dette gir alle som passerer tilgang til kundeopplysninger.',
    subpoints: [
      { label: 'Skjermlås', text: 'Alltid låse skjerm når du forlater PC-en. Windows+L. Mac: Ctrl+Command+Q. 3 sekunder — ingen unnskyldning' },
      { label: 'Ren skrivebord-policy', text: 'Post-it med passord, kundedokumenter synlig, åpne fakturaer — alt dette er sikkerhetsbrudd' },
      { label: 'Offentlig WiFi', text: 'Aldri bruk kundedatabaser eller jobbsystemer på usikret WiFi uten VPN' },
      { label: 'Lading og USB', text: 'Aldri plugg ukjente USB-enheter inn i jobbmaskinen — de kan inneholde malware' },
    ],
    practical: 'Handling: Neste gang du forlater PC-en — trykk Windows+L. Gjør det til en automatisk vane. Lær kollegaer det samme.',
    exercises: [
      {
        id: 'ds7-1',
        icon: '💻',
        title: 'Ulåst skjerm',
        question: 'En selger løper til lunch og glemmer å låse skjermen. Kunderegisteret er åpent. Hva er det juridiske problemet?',
        choices: [
          { id: 'a', label: 'Ingen — det er bare et internt disiplinsproblem', isCorrect: false, feedback: 'Eksponering av kundeopplysninger kan utgjøre et GDPR-brudd med meldeplikt og bøtepotensial.' },
          { id: 'b', label: 'Potensielt GDPR-brudd som må rapporteres til Datatilsynet om data er eksponert', isCorrect: true, feedback: 'Riktig! Utilsiktet tilgang til personopplysninger er et datainnbrudd som kan utløse meldeplikt.' },
          { id: 'c', label: 'Kun et problem om noen faktisk så dataene', isCorrect: false, feedback: 'Potensiell eksponering er nok — virksomheten kan ikke vite om noen så det eller ikke.' },
          { id: 'd', label: 'Det er selgerens personlige ansvar, ikke virksomhetens', isCorrect: false, feedback: 'Virksomheten (databehandleren) er ansvarlig for ansattes handlinger under GDPR.' },
        ],
        espenTip: 'GDPR-meldeplikt: Datainnbrudd som medfører risiko for individers rettigheter, MÅ meldes til Datatilsynet innen 72 timer. Ulåst skjerm kan utløse dette.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🚫',
    title: 'Vanlige misforståelser om GDPR og personvern',
    quote: '"GDPR er ikke et forbud mot å bruke data — det er et krav om å bruke dem ansvarlig."',
    content: 'GDPR er omgitt av misforståelser som fører til enten panikk (vi kan ikke gjøre noe!) eller likegyldighet (vi er for små). Begge er gale. GDPR er en praktisk lov som handler om ansvarlighet, ikke byråkrati.',
    subpoints: [
      { label: 'Myte 1', text: '"GDPR forbyr all lagring av kundedata." Feil — lovlig grunnlag og dataminimering er nøkkelen' },
      { label: 'Myte 2', text: '"Vi er for små for GDPR." Feil — alle virksomheter som behandler personopplysninger er underlagt GDPR' },
      { label: 'Myte 3', text: '"Rett til å bli slettet" er absolutt." Feil — Bokføringsloven krever at kvitteringsdetaljer beholdes i 5 år' },
      { label: 'Myte 4', text: '"GDPR er bare IT-avdelingens problem." Feil — alle som behandler personopplysninger er ansvarlige' },
    ],
    practical: 'Refleksjon: Hvilken av disse mytene trodde du faktisk var sann? Hva betyr korreksjonen for din atferd på jobb?',
    exercises: [
      {
        id: 'ds8-1',
        icon: '🚫',
        title: 'Myte om sletterett',
        question: 'En kunde krever at nettbutikken sletter ALT om dem, inkludert kjøpshistorikken fra i fjor. Kan nettbutikken slette alt?',
        choices: [
          { id: 'a', label: 'Ja, rett til sletting er absolutt', isCorrect: false, feedback: '"Retten til å bli glemt" har viktige unntak, spesielt for rettslige forpliktelser.' },
          { id: 'b', label: 'Nei, de plikter å beholde regnskapsrelaterte data i 5 år etter Bokføringsloven', isCorrect: true, feedback: 'Riktig! Bokføringsloven overgår sletteretten for transaksjonsdata. Resterende slettes.' },
          { id: 'c', label: 'Nei, nettbutikker er unntatt fra sletteretten', isCorrect: false, feedback: 'Nettbutikker er ikke unntatt. Bokføringsloven er unntaket — ikke bransjen.' },
          { id: 'd', label: 'Det er nettbutikkens valg om de vil slette', isCorrect: false, feedback: 'Sletteretten er lovfestet. Nettbutikken plikter å slette det som ikke er underlagt Bokføringsloven.' },
        ],
        espenTip: 'GDPR vs Bokføringsloven: GDPR vinner normalt, men Bokføringsloven er spesiallov for transaksjonsdata. Fem-årsregelen gjelder regnskapsdata.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Personopplysningsloven og GDPR',
    quote: '"Datatilsynet kan ilegge bøter opp til 4 % av global årsomsetning — det er ingen bagatell."',
    content: 'Personopplysningsloven implementerer GDPR i norsk rett. Datatilsynet er tilsynsmyndigheten og kan ilegge både advarsler, pålegg og betydelige bøter. For ansatte i salg og service er det viktig å kjenne til de praktiske pliktene som følger av loven.',
    subpoints: [
      { label: 'Personopplysningsloven', text: 'Norsk lov som inkorporerer GDPR. Datatilsynet fører tilsyn og håndhever regelverket' },
      { label: 'Bøtesatser', text: 'Opp til 20 millioner euro eller 4 % av global årsomsetning — det høyeste av disse' },
      { label: 'Meldeplikt', text: 'Datainnbrudd med risiko for individer MÅ meldes til Datatilsynet innen 72 timer' },
      { label: 'Personvernombud', text: 'Virksomheter som behandler store mengder persondata plikter å ha et personvernombud (DPO)' },
    ],
    practical: 'Ressurs: Datatilsynet.no har veiledere for små og mellomstore bedrifter som forklarer GDPR i praksis på norsk. Gratis og nyttig.',
    exercises: [
      {
        id: 'ds9-1',
        icon: '⚖️',
        title: 'Meldeplikt ved datainnbrudd',
        question: 'En ansatt oppdager at en USB-pinne med kundeopplysninger er borte. Hva MÅ virksomheten gjøre etter GDPR?',
        choices: [
          { id: 'a', label: 'Ingenting — USB-pinnen kan ha falt ned i pulten', isCorrect: false, feedback: 'Usikker datafeil er et potensielt brudd som utløser undersøkelsesplikt og eventuell meldeplikt.' },
          { id: 'b', label: 'Kun informere kunder hvis det er sikkert at data er stjålet', isCorrect: false, feedback: 'Meldeplikt til Datatilsynet inntrer ved risiko, ikke bare sikker kunnskap om misbruk.' },
          { id: 'c', label: 'Vurdere risiko, og melde til Datatilsynet innen 72 timer om det er risiko for individers rettigheter', isCorrect: true, feedback: 'Riktig! 72-timersregelen er absolutt. Usikkerhet er ikke et unntak.' },
          { id: 'd', label: 'Vente to uker og se om det dukker opp', isCorrect: false, feedback: 'To uker er dramatisk for sent. Fristen er 72 timer.' },
        ],
        espenTip: '72-timersregelen er streng. Start risikovurderingen umiddelbart ved et mulig brudd. Dokumenter prosessen — det viser Datatilsynet at du handler ansvarlig.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌟',
    title: 'Oppsummering — digital sikkerhet som kulturbygning',
    quote: '"Sikkerhet er ikke ett tiltak — det er summen av tusen daglige valg."',
    content: 'Digital sikkerhet og personvern er ikke IT-avdelingens eneansvar. Det er en kulturell forpliktelse der alle ansatte bidrar. De tekniske systemene er bare så sterke som de svakeste menneskelige leddene. Din atferd teller.',
    subpoints: [
      { label: 'GDPR', text: 'Behandlingsgrunnlag, dataminimering, formålsbegrensning, individets rettigheter' },
      { label: 'Phishing', text: 'STOP. THINK. CLICK. Verifiser alltid via kjent kanal. Rapporter til IT' },
      { label: 'Passord', text: 'Sterke, unike passord + passordbehandler + 2FA. Aldri gjenbruk' },
      { label: 'Sletterutiner', text: 'Slett når formålet er oppfylt. Dokumenter unntak (Bokføringsloven 5 år)' },
      { label: 'Daglige rutiner', text: 'Lås skjerm, rent bord, aldri usikret WiFi, aldri ukjente USB-enheter' },
    ],
    practical: 'Neste steg: Aktiver 2FA på jobb-epost og viktige private tjenester i dag. Dette er den enkelthandlingen som mest effektivt øker din digitale sikkerhet.',
    exercises: [
      {
        id: 'ds10-1',
        icon: '🌟',
        title: 'Oppsummering',
        question: 'Hva er den mest effektive enkelthandlingen en virksomhet kan gjøre for å redusere datainnbrudd?',
        choices: [
          { id: 'a', label: 'Kjøpe den dyreste brannmuren', isCorrect: false, feedback: 'Tekniske tiltak er nødvendige, men 90 % av angrep utnytter menneskelige feil — ikke tekniske hull.' },
          { id: 'b', label: 'Opplæring av ansatte i phishing-gjenkjenning og passordsikkerhet', isCorrect: true, feedback: 'Riktig! Siden 90 % av brudd skyldes menneskelig feil, er opplæring det mest kostnadseffektive tiltaket.' },
          { id: 'c', label: 'Forby alle ansatte å bruke e-post', isCorrect: false, feedback: 'Upraktisk og urealistisk. Opplæring i sikker bruk er langt mer effektiv.' },
          { id: 'd', label: 'Ansette en CISO (Chief Information Security Officer)', isCorrect: false, feedback: 'En CISO er verdifull, men ikke like kostnadseffektiv som bred ansattopplæring.' },
        ],
        espenTip: 'Kulturen er sterkere enn teknologien. Ansatte som er bevisste og opplærte er din beste forsvarslinje — bedre enn enhver brannmur.',
      },
    ],
  },
]

export default function DigitalSikkerhetPersonvernModule() {
  return (
    <DrawerModule
      moduleCode="HMS-VG2-8"
      moduleTitle="Digital sikkerhet og personvern"
      moduleIcon="🔒"
      storageKey="learning-vg2-digital-sikkerhet-personvern"
      completeRoute="/learning/vg2/hms/digital-sikkerhet-personvern/complete"
      phases={phases}
      intro="GDPR, personvern og digital sikkerhet — bedriftens ansvar for å beskytte data og ansatte."
      vissteduAt="Rundt 90 % av alle datainnbrudd skyldes menneskelig feil — ikke avansert hacking. Et klikk på en phishing-lenke eller et gjenbrukt passord er som regel inngangsporten."
      espenSier="Kulturen er sterkere enn teknologien. Ansatte som er bevisste og opplærte er din beste forsvarslinje — bedre enn enhver brannmur. IT-avdelingen vil aldri be om passord via epost. Aldri."
      presentationLink={{ route: '/learning/presentations/digital-sikkerhet-personvern', description: 'Digital sikkerhet og personvern — en visuell presentasjon' }}
    />
  )
}
