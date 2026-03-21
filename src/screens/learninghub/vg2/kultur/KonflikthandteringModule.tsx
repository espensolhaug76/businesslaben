import DrawerModule from '../../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '⚡',
    title: 'Hva er en konflikt og hvordan oppstår den?',
    quote: 'Ikke all konflikt er destruktiv — det er mangelen på kunnskap om å håndtere den som er problemet.',
    content: 'En konflikt oppstår når to eller flere parter opplever uforenlige mål, interesser eller behov. Oppgavekonflikter (uenighet om arbeidsmåter) kan være produktive. Relasjonskonflikter (personlige motsetninger) er nesten alltid skadelige. Vanligste årsaker: knappe ressurser, uklare roller, verdiforskjeller og kommunikasjonssvikt.',
    subpoints: [
      'OPPGAVEKONFLIKT: Faglig uenighet om løsninger og prioriteringer kan drive innovasjon',
      'RELASJONSKONFLIKT: Personlige motsetninger er smittsomt og bør adresseres tidlig',
      'UKLARE ROLLER: En skriftlig stillingsbeskrivelse er det billigste konfliktforebyggende tiltaket',
    ],
    practical: 'Neste gang du kjenner at det er noe «i luften» med en kollega, ta tak i det med en gang — jo lenger du venter, jo mer tid har konflikten til å vokse seg stor.',
    exercises: [
      {
        id: 'kh-1-1',
        question: 'Hva er en oppgavekonflikt?',
        choices: [
          { id: 'a', text: 'Personlig antipati mellom to ansatte' },
          { id: 'b', text: 'Faglig uenighet om arbeidsmåter, prioriteringer eller beslutninger' },
          { id: 'c', text: 'En konflikt om lønn og feriepenger' },
          { id: 'd', text: 'Uenighet om hvem som skal bruke kontoret' },
        ],
        correctId: 'b',
        explanation: 'Oppgavekonflikter handler om faglig uenighet — arbeidsmåter, prioriteringer, beslutninger. De kan faktisk være produktive ved å tvinge gruppen til å vurdere alternativer.',
      },
      {
        id: 'kh-1-2',
        question: 'Hva er den viktigste forskjellen mellom oppgavekonflikt og relasjonskonflikt?',
        choices: [
          { id: 'a', text: 'Det er ingen praktisk forskjell' },
          { id: 'b', text: 'Oppgavekonflikter kan være produktive; relasjonskonflikter er nesten alltid skadelige' },
          { id: 'c', text: 'Relasjonskonflikter er alltid lettere å løse' },
          { id: 'd', text: 'Oppgavekonflikter involverer alltid penger' },
        ],
        correctId: 'b',
        explanation: 'Oppgavekonflikter kan drive frem bedre løsninger, mens relasjonskonflikter — personlige motsetninger og mistillit — nesten alltid er skadelige og bør løses raskt.',
      },
      {
        id: 'kh-1-3',
        question: 'Hva er en av de vanligste årsakene til konflikter på arbeidsplassen?',
        choices: [
          { id: 'a', text: 'For hyppige lønnsforhandlinger' },
          { id: 'b', text: 'For mange ansatte' },
          { id: 'c', text: 'Uklare roller og forventninger' },
          { id: 'd', text: 'For hyppige møter' },
        ],
        correctId: 'c',
        explanation: 'Uklare roller og forventninger er en av de hyppigste rotårsakene til konflikter — mange konflikter skyldes ikke vond vilje men uklare forventninger.',
      },
      {
        id: 'kh-1-4',
        question: 'Hva er det billigste konfliktforebyggende tiltaket som finnes?',
        choices: [
          { id: 'a', text: 'Team-building aktiviteter' },
          { id: 'b', text: 'Ekstern mediator' },
          { id: 'c', text: 'En skriftlig stillingsbeskrivelse' },
          { id: 'd', text: 'Hyppigere lønnssamtaler' },
        ],
        correctId: 'c',
        explanation: 'En skriftlig stillingsbeskrivelse er det billigste konfliktforebyggende tiltaket — den klargjør roller og forventninger som ellers kan bli kilde til misforståelser.',
      },
      {
        id: 'kh-1-5',
        question: 'Hvorfor bør konflikter tas tak i tidlig?',
        choices: [
          { id: 'a', text: 'For å vise lederskap overfor kollegaer' },
          { id: 'b', text: 'Fordi loven krever det' },
          { id: 'c', text: 'Fordi konflikter som ignoreres vanligvis eskalerer og blir vanskeligere å løse' },
          { id: 'd', text: 'Det er bedre å vente — konflikter løser seg selv' },
        ],
        correctId: 'c',
        explanation: 'Konflikter som ignoreres vokser seg større over tid. En liten misforståelse kan eskalere til sykemeldinger og oppsigelser hvis den ikke håndteres tidlig.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🧭',
    title: 'Thomas-Kilmann konfliktstiler',
    quote: 'Den som alltid bruker samme konfliktstil, bruker feil stil halvparten av tiden.',
    content: 'Thomas og Kilmann identifiserte fem konfliktstiler basert på påståelighet og samarbeidsvilje: konkurrering (win-lose), samarbeid (win-win), kompromiss (middelvei), unngåelse (lose-lose som standard) og ettergivenhet. Faren er å ha én standardstil uansett kontekst.',
    subpoints: [
      'KONKURRERING: Brukes riktig i kriser, ikke i daglig drift',
      'SAMARBEID: Det optimale resultatet — men krever at begge deler informasjon',
      'UNNGÅELSE: Strategisk unngåelse kan være klokt; permanent unngåelse er en lederfeil',
    ],
    practical: 'Tenk på den siste konfliktsituasjonen du var i — hvilken stil brukte du, og var det den optimale stilen for situasjonen?',
    glossaryTerm: 'Konfliktstiler (Thomas-Kilmann)',
    exercises: [
      {
        id: 'kh-2-1',
        question: 'Hvilken konfliktstil er best beskrevet som win-win?',
        choices: [
          { id: 'a', text: 'Konkurrering' },
          { id: 'b', text: 'Unngåelse' },
          { id: 'c', text: 'Ettergivenhet' },
          { id: 'd', text: 'Samarbeid' },
        ],
        correctId: 'd',
        explanation: 'Samarbeid er win-win-stilen — begge parter jobber konstruktivt mot en løsning som ivaretar alles interesser. Det krever tillit og tid.',
      },
      {
        id: 'kh-2-2',
        question: 'Når er konkurreringsstilen hensiktsmessig?',
        choices: [
          { id: 'a', text: 'I daglige interne diskusjoner' },
          { id: 'b', text: 'I kriser der en rask beslutning må tas' },
          { id: 'c', text: 'Alltid, fordi det viser styrke' },
          { id: 'd', text: 'Aldri — det skaper alltid fiender' },
        ],
        correctId: 'b',
        explanation: 'Konkurreringsstilen fungerer i kriser der tid er kritisk og en beslutning må tas raskt, men som standardrespons i daglig drift ødelegger den teamets engasjement.',
      },
      {
        id: 'kh-2-3',
        question: 'Hva er de to aksene i Thomas-Kilmann modellen?',
        choices: [
          { id: 'a', text: 'Logikk og følelser' },
          { id: 'b', text: 'Makt og autoritet' },
          { id: 'c', text: 'Påståelighet og samarbeidsvilje' },
          { id: 'd', text: 'Konflikttype og alvorlighetsgrad' },
        ],
        correctId: 'c',
        explanation: 'Modellen er basert på to akser: påståelighet (hvor mye du forfølger dine egne interesser) og samarbeidsvilje (hvor mye du ivaretar andres interesser).',
      },
      {
        id: 'kh-2-4',
        question: 'Hva er risikoen ved å alltid bruke samme konfliktstil?',
        choices: [
          { id: 'a', text: 'Du blir kjent som konsistent og forutsigbar — noe positivt' },
          { id: 'b', text: 'Du bruker feil stil i halvparten av situasjonene' },
          { id: 'c', text: 'Det er ingen risiko — konsistens er alltid en fordel' },
          { id: 'd', text: 'Du mister respekt fra kollegaer' },
        ],
        correctId: 'b',
        explanation: 'Ulike situasjoner krever ulike konfliktstiler. Å bruke én standardstil uansett kontekst gjør deg forutsigbar og betyr at du bruker feil tilnærming i mange situasjoner.',
      },
      {
        id: 'kh-2-5',
        question: 'Hva er ettergivenhetsstilen (accommodating) best egnet for?',
        choices: [
          { id: 'a', text: 'Når du har sterk ekspertise og vet at du har rett' },
          { id: 'b', text: 'Når relasjonen er viktigere enn saken, eller den andre parten vet bedre' },
          { id: 'c', text: 'Alltid — å gi etter er alltid profesjonelt' },
          { id: 'd', text: 'Kun i forhandlinger med ekstern part' },
        ],
        correctId: 'b',
        explanation: 'Ettergivenhet passer når relasjonen er viktigere enn den konkrete saken, eller når den andre parten faktisk har bedre kunnskap om temaet.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '⚖️',
    title: 'Mekling og tredjepart',
    quote: 'En god megler tar ikke side — men hjelper begge sider å finne sin vei til løsningen.',
    content: 'Mekling (mediation) skiller seg fra voldgift: mekleren bestemmer ikke hvem som har rett — vedkommende fasiliterer en prosess der partene selv finner løsningen. Norges Forliksråd er et lavterskeltilbud. En løsning partene selv har kommet frem til, respekteres bedre over tid.',
    subpoints: [
      'MEKLERENS ROLLE: Stiller spørsmål som hjelper partene å høre hverandre — ikke kommentarer om hvem som har rett',
      'FORLIKSRÅDET: Behandler over 130 000 saker per år og er gratis for privatpersoner',
      'HR-MEKLING: Skriftlig avtale etter mekling er viktig — muntlige løsninger glemmes',
    ],
    practical: 'Hvis du en dag er i en konflikt der dere sitter fast, foreslå en mekler — det er et tegn på modenhet, ikke svakhet.',
    exercises: [
      {
        id: 'kh-3-1',
        question: 'Hva er den viktigste forskjellen mellom mekling og voldgift?',
        choices: [
          { id: 'a', text: 'Mekling er dyrere enn voldgift' },
          { id: 'b', text: 'I mekling fasiliterer tredjeparten en løsning; i voldgift bestemmer tredjeparten løsningen' },
          { id: 'c', text: 'Voldgift er kun for store selskaper' },
          { id: 'd', text: 'Det er ingen praktisk forskjell' },
        ],
        correctId: 'b',
        explanation: 'I mekling hjelper mekleren partene å finne sin egen løsning. I voldgift (arbitration) tar tredjeparten en beslutning om hvem som har rett — som en privat domstol.',
      },
      {
        id: 'kh-3-2',
        question: 'Hvorfor er løsninger partene selv har kommet frem til bedre enn pålagte løsninger?',
        choices: [
          { id: 'a', text: 'De er alltid mer rettferdige' },
          { id: 'b', text: 'De respekteres bedre over tid fordi partene eier dem' },
          { id: 'c', text: 'De er billigere å implementere' },
          { id: 'd', text: 'De er juridisk bindende på en annen måte' },
        ],
        correctId: 'b',
        explanation: 'En løsning partene har funnet selv har mye større sjanse for å bli respektert og holdt over tid, sammenlignet med en løsning som er tredd nedover hodet på dem.',
      },
      {
        id: 'kh-3-3',
        question: 'Hva er Norges Forliksråd?',
        choices: [
          { id: 'a', text: 'En privat meklingsinstitusjon for store selskaper' },
          { id: 'b', text: 'Et lavterskeltilbud for sivile tvister, gratis for privatpersoner' },
          { id: 'c', text: 'Et faglig utvalg under Arbeidstilsynet' },
          { id: 'd', text: 'En domstol kun for arbeidskonflikter' },
        ],
        correctId: 'b',
        explanation: 'Norges Forliksråd er et lavterskeltilbud for sivile tvister under 200 000 kroner og er gratis for privatpersoner. De behandler over 130 000 saker per år.',
      },
      {
        id: 'kh-3-4',
        question: 'Hva er meklerens viktigste rolle?',
        choices: [
          { id: 'a', text: 'Å avgjøre hvem som har rett' },
          { id: 'b', text: 'Å fasilitere prosessen der partene selv finner løsningen' },
          { id: 'c', text: 'Å representere den svakeste parten' },
          { id: 'd', text: 'Å skrive juridisk bindende dokumenter' },
        ],
        correctId: 'b',
        explanation: 'Meklerens rolle er å fasilitere prosessen — stille gode spørsmål, sikre at begge parter blir hørt, og hjelpe dem å se hverandres perspektiver.',
      },
      {
        id: 'kh-3-5',
        question: 'Hvorfor er skriftlig avtale viktig etter mekling?',
        choices: [
          { id: 'a', text: 'Det er et lovkrav' },
          { id: 'b', text: 'Muntlige løsninger huskes ulikt og glemmes lettere' },
          { id: 'c', text: 'For å ha noe å vise til forsikringsselskapet' },
          { id: 'd', text: 'Skriftlighet er ikke viktigere enn muntlighet' },
        ],
        correctId: 'b',
        explanation: 'Muntlige løsninger glemmes, tolkes ulikt og kan skape nye konflikter. En skriftlig avtale begge signerer forplikter og fungerer som referanse fremover.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🏢',
    title: 'Konflikter mellom ansatt og leder',
    quote: 'Maktubalanse i en konflikt betyr ikke at den svake parten er rettsløs — det betyr at systemet må kompensere.',
    content: 'Konflikter mellom ansatte og ledere er særlig utfordrende fordi maktubalansen er strukturell. Arbeidsmiljøloven § 4 gir sterke rettigheter. Bruk «jeg»-formuleringer fremfor «du»-anklager. Varslervern: AML §§ 2A-1 til 2A-7 forbyr gjengjeldelse mot varsler.',
    subpoints: [
      'AML § 4: Psykososialt arbeidsmiljø er lovpålagt — trakassering er lovbrudd, ikke «lederens stil»',
      'JEG-FORMULERINGER: Si «Jeg opplever at...» fremfor «Du er alltid...» — inviterer til dialog',
      'VARSLERVERN: AML §§ 2A-1 til 2A-7 gir rett til å si fra uten å frykte gjengjeldelse',
    ],
    practical: 'Skriv ned tre konkrete, observerbare hendelser FØR du tar opp en konflikt med en leder — «du er alltid urettferdig» er ikke håndterbart, «mandag 3. mars fikk jeg ikke beskjed om møtet» er det.',
    exercises: [
      {
        id: 'kh-4-1',
        question: 'Hva gir Arbeidsmiljølovens § 4 ansatte rett til?',
        choices: [
          { id: 'a', text: 'Å bestemme sin egen arbeidstid' },
          { id: 'b', text: 'Vern mot dårlig psykososialt arbeidsmiljø' },
          { id: 'c', text: 'Å nekte alle arbeidsoppgaver de ikke liker' },
          { id: 'd', text: 'Lønnsforhandlinger direkte med styret' },
        ],
        correctId: 'b',
        explanation: 'AML § 4 sier at det psykososiale arbeidsmiljøet skal ivaretas — trakassering, utfrysing og systematisk latterliggjøring er lovbrudd, ikke bare «lederens stil».',
      },
      {
        id: 'kh-4-2',
        question: 'Hva er fordelen med å bruke «jeg»-formuleringer i en konfliktsamtale?',
        choices: [
          { id: 'a', text: 'Det høres mer formelt og profesjonelt ut' },
          { id: 'b', text: 'Det inviterer til dialog fremfor å sette motparten på defensiven' },
          { id: 'c', text: 'Det er juridisk sikrere' },
          { id: 'd', text: 'Det viser at du er villig til å gi etter' },
        ],
        correctId: 'b',
        explanation: '«Jeg opplever at...» beskriver din opplevelse uten å anklage direkte — det åpner for dialog. «Du er alltid...» setter motparten på defensiven og eskalerer konflikten.',
      },
      {
        id: 'kh-4-3',
        question: 'Hva er riktig eskaleringssti hvis dialog med leder ikke fungerer?',
        choices: [
          { id: 'a', text: 'Direkte til media med anklagene' },
          { id: 'b', text: 'Dialog med leder → HR → Arbeidstilsynet ved behov' },
          { id: 'c', text: 'Umiddelbart til tingretten' },
          { id: 'd', text: 'Si opp jobben og gå videre' },
        ],
        correctId: 'b',
        explanation: 'Riktig rekkefølge: forsøk dialog med leder, deretter involver HR, og hvis det ikke løser seg kan Arbeidstilsynet kontaktes for arbeidsmiljøsaker.',
      },
      {
        id: 'kh-4-4',
        question: 'Hva er varsling (whistleblowing)?',
        choices: [
          { id: 'a', text: 'Å klage på lønnen sin' },
          { id: 'b', text: 'Å si ifra om kritikkverdige forhold som regelbrudd, korrupsjon eller trakassering' },
          { id: 'c', text: 'Å fortelle kollegaer om ledelsens planer' },
          { id: 'd', text: 'Å bruke bedriftens ressurser til private formål' },
        ],
        correctId: 'b',
        explanation: 'Varsling er å si ifra om kritikkverdige forhold — regelbrudd, korrupsjon, trakassering. AML §§ 2A-1 til 2A-7 gir varsler sterk lovbeskyttelse.',
      },
      {
        id: 'kh-4-5',
        question: 'Hvorfor er det viktig å dokumentere konkrete hendelser i en konflikt med en leder?',
        choices: [
          { id: 'a', text: 'For å ha bevis i en mulig rettssak fra dag én' },
          { id: 'b', text: 'Konkrete observerbare hendelser er håndterbare; vage generelle påstander er det ikke' },
          { id: 'c', text: 'For å vise at du har god hukommelse' },
          { id: 'd', text: 'Dokumentasjon er ikke nødvendig hvis du er ærlig' },
        ],
        correctId: 'b',
        explanation: '«Du er alltid urettferdig» er ikke håndterbart. «Mandag 3. mars fikk jeg ikke beskjed om møtet» er konkret og kan adresseres. Konkrete hendelser gir grunnlag for konstruktiv dialog.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🛡️',
    title: 'Forebygging gjennom psykologisk trygghet og klare roller',
    quote: 'De beste arbeidsplassene er ikke dem uten konflikter — de er dem der folk tør å si ifra før konflikten eskalerer.',
    content: 'Amy Edmondson ved Harvard viste at de beste teamene ikke var de med flest feil — de var de som rapporterte flest feil, fordi det var trygt å si ifra. Psykologisk trygghet handler om å tørre å stille spørsmål, innrømme feil og utfordre beslutninger uten å frykte ydmykelse.',
    subpoints: [
      'PSYKOLOGISK TRYGGHET: Teams der folk tør si «jeg er usikker» løser problemer raskere',
      'KLARE FORVENTNINGER: En skriftlig stillingsbeskrivelse forhindrer mer konflikt enn all teambuilding',
      'EQUINOR-MODELLEN: «Stop Work Authority» — enhver ansatt kan stoppe en usikker operasjon',
    ],
    practical: 'Be om en skriftlig oppsummering av forventninger til din rolle. Hvis den ikke finnes, foreslå å lage en — det er en profesjonell, ikke en krevende, forespørsel.',
    exercises: [
      {
        id: 'kh-5-1',
        question: 'Hva er psykologisk trygghet på arbeidsplassen?',
        choices: [
          { id: 'a', text: 'At alle ansatte er venner privat' },
          { id: 'b', text: 'At man kan si sin mening, stille spørsmål og innrømme feil uten å frykte negative konsekvenser' },
          { id: 'c', text: 'At arbeidsplassen har fysisk sikring og alarmsystemer' },
          { id: 'd', text: 'At ingen noensinne er uenige' },
        ],
        correctId: 'b',
        explanation: 'Psykologisk trygghet handler om å tørre å si «jeg vet ikke», innrømme feil og utfordre beslutninger — uten å frykte ydmykelse, straff eller ekskludering.',
      },
      {
        id: 'kh-5-2',
        question: 'Hva viste Amy Edmondsons forskning om psykologisk trygghet i team?',
        choices: [
          { id: 'a', text: 'De beste teamene hadde færrest feil' },
          { id: 'b', text: 'De beste teamene rapporterte flest feil fordi det var trygt å si ifra' },
          { id: 'c', text: 'Psykologisk trygghet reduserer produktiviteten' },
          { id: 'd', text: 'Team uten konflikter er alltid de beste' },
        ],
        correctId: 'b',
        explanation: 'Edmondsons forskning fant at de beste teamene ikke var de med færrest feil, men de som rapporterte og håndterte flest feil — fordi de hadde en trygg kultur.',
      },
      {
        id: 'kh-5-3',
        question: 'Hva er de tre vanligste rotårsakene til konflikter på arbeidsplassen?',
        choices: [
          { id: 'a', text: 'Dårlig lønn, lange arbeidsdager og kjedelig arbeid' },
          { id: 'b', text: 'Uklare forventninger, inkonsistent ledelse og favorisering' },
          { id: 'c', text: 'For mange ansatte, for lite plass og støyende kontormiljø' },
          { id: 'd', text: 'Dårlig kaffe, mangel på parkering og for kaldt kontor' },
        ],
        correctId: 'b',
        explanation: 'De tre vanligste rotårsakene er: uklare forventninger til roller, inkonsistent ledelse og favorisering — alle forebyggbare med tydelig ledelse og klare strukturer.',
      },
      {
        id: 'kh-5-4',
        question: 'Hva er Equinors «Stop Work Authority»?',
        choices: [
          { id: 'a', text: 'En komité som godkjenner alle arbeidsoperasjoner' },
          { id: 'b', text: 'Retten til enhver ansatt å stoppe en operasjon de mener er usikker, uten å trenge godkjenning' },
          { id: 'c', text: 'En HMS-manual for offshore-arbeid' },
          { id: 'd', text: 'Et system for å rapportere konflikter anonymt' },
        ],
        correctId: 'b',
        explanation: 'Equinors «Stop Work Authority» gir enhver ansatt rett til å stoppe en operasjon de mener er usikker — uten å trenge godkjenning ovenfra. Det er psykologisk trygghet i praksis.',
      },
      {
        id: 'kh-5-5',
        question: 'Hva er det effektiveste forebyggende tiltaket mot konflikter på arbeidsplassen?',
        choices: [
          { id: 'a', text: 'Hyppige team-building aktiviteter' },
          { id: 'b', text: 'Fri drikke og kantineordning' },
          { id: 'c', text: 'Klare roller, tydelige forventninger og transparente prosesser' },
          { id: 'd', text: 'Strengere disiplinærprosedyrer' },
        ],
        correctId: 'c',
        explanation: 'Klare roller, tydelige forventninger og transparente beslutningsprosesser forebygger de fleste konflikter. Dette er billigere og mer effektivt enn reaktiv konflikthåndtering.',
      },
    ],
  },
];

export default function KonflikthandteringModule() {
  return (
    <DrawerModule
      moduleCode="KK-VG2-2"
      moduleTitle="Konflikthåndtering"
      moduleIcon="🤜"
      storageKey="learning-vg2-konflikthandtering"
      completeRoute="/learning/vg2/kultur/konflikthåndtering/complete"
      phases={phases}
      intro="Konflikter er uunngåelige der mennesker arbeider sammen — spørsmålet er ikke om de oppstår, men hvordan de håndteres. Riktig håndtert kan konflikt faktisk styrke et team."
      vissteduAt="En norsk undersøkelse fra STAMI viser at ca. 15 % av norske arbeidstakere opplever konflikter på arbeidsplassen hvert år. Kostnaden av en uløst konflikt som ender i oppsigelse og nyansettelse er anslått til mellom 500 000 og 1 million kroner."
      espenSier="Jeg har sett bedrifter der den reelle kostnaden av konflikter var større enn kostnaden av konkurrentene. De lederne jeg kjenner som er best på dette, er de som er raskest til å ta en vanskelig samtale tidlig."
      presentationLink={{ route: '/learning/presentations/konflikt-nod', description: 'Konflikt og nød — en visuell gjennomgang av deeskalering og konflikthåndtering' }}
    />
  );
}
