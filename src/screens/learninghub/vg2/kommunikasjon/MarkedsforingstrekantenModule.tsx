import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔺',
    title: 'Markedsføringstrekanten — Samspillet som skaper kvalitet',
    quote: '«Markedsføring er ikke bare det som skjer på skjermen.»',
    content: 'I tjenesteytende næringer er markedsføring tredelt: det handler om hva du lover kunden, hva du gjør internt for å holde løftet, og selve møtet der løftet holdes eller brytes. Alle tre sidene av trekanten må fungere.',
    subpoints: [
      { label: 'Ekstern markedsføring', text: 'Løftet gitt til kunden gjennom reklame, sosiale medier, nettside.' },
      { label: 'Intern markedsføring', text: 'Opplæring, motivasjon og kultur — forberedelse av ansatte til å levere løftet.' },
      { label: 'Interaktiv markedsføring', text: 'Sannhetens øyeblikk — møtet mellom ansatt og kunde der løftet leveres eller brytes.' },
    ],
    practical: 'Tenk på en serviceopplevelse der du ble skuffet. Hvilken side av trekanten sviktet?',
    exercises: [
      {
        id: 'MT1-1',
        icon: '🔺',
        title: 'Trekantens tre sider',
        question: 'Hva er de tre sidene i markedsføringstrekanten?',
        choices: [
          { id: 'a', label: 'Produkt, pris og plass', isCorrect: false, feedback: 'Det er tre av de fire P-ene, ikke trekanten. Trekanten handler om relasjonene mellom bedrift, ansatt og kunde.' },
          { id: 'b', label: 'Ekstern, intern og interaktiv markedsføring', isCorrect: true, feedback: 'Riktig! Ekstern = løftet til markedet. Intern = forberedelse av ansatte. Interaktiv = leveransen i møtet med kunden.' },
          { id: 'c', label: 'Digital, print og muntlig markedsføring', isCorrect: false, feedback: 'Det er kanaltyper, ikke trekantens sider.' },
        ],
        espenTip: 'Trekanten = 3 relasjoner: Bedrift→Kunde (ekstern), Bedrift→Ansatt (intern), Ansatt→Kunde (interaktiv).',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📢',
    title: 'Ekstern markedsføring — Å gi løftet',
    quote: '«Du kan ikke holde et løfte du ikke har gitt — og du kan ikke gi et løfte du ikke kan holde.»',
    content: 'Ekstern markedsføring er kommunikasjonen fra bedriften til markedet — reklame, sosiale medier, nettsider, PR. Det er her du gir løftet til potensielle kunder.',
    subpoints: [
      { label: 'Formålet', text: 'Tiltrekke kunder, posisjonere merkevaren og kommunisere verdiløftet.' },
      { label: 'Kanaler', text: 'TV, sosiale medier, søkemotorer, innhold, PR, annonser.' },
      { label: 'Konsistens', text: 'Budskapet må være konsistent på tvers av alle kanaler.' },
      { label: 'Faren ved overdrivelse', text: 'Løfter som ikke kan holdes skaper skuffede kunder og ødelegger omdømmet.' },
    ],
    practical: 'Finn et eksempel der ekstern markedsføring overlovet leveransen. Hva var konsekvensen?',
    exercises: [
      {
        id: 'MT2-1',
        icon: '📢',
        title: 'Ekstern markedsføring',
        question: 'Et spa-hotell publiserer fantastiske bilder av luksusrike rom og storstilte fasiliteter. Hva er konsekvensen hvis de faktiske rommene er middelmådige?',
        choices: [
          { id: 'a', label: 'Ingenting — bilder er bilder, kunden vet det', isCorrect: false, feedback: 'Nei — bilder setter forventninger. Brutte forventninger er en av de sterkeste driverne for negative anmeldelser.' },
          { id: 'b', label: 'Kunden ankommer med høye forventninger, opplever skuffelse, og skriver dårlige anmeldelser', isCorrect: true, feedback: 'Riktig! Dette er det klassiske "over-love, under-levere"-problemet. Ekstern markedsføring setter forventninger — disse MÅ den interne og interaktive markedsføringen innfri.' },
          { id: 'c', label: 'Det er opp til kunden å sjekke anmeldelser — hotellet er ikke ansvarlig', isCorrect: false, feedback: 'Juridisk er bedriften ansvarlig for villedende markedsføring etter markedsføringsloven.' },
        ],
        espenTip: 'Huskeregelen: Lov aldri mer enn du kan levere. Kundens forventning = ditt løfte − virkeligheten.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🏋️',
    title: 'Intern markedsføring — Å muliggjøre løftet',
    quote: '«De ansatte er bedriftens første marked.»',
    content: 'Intern markedsføring handler om å gjøre de ansatte i stand til å levere på løftet gitt til kunden. Det er ledelsens ansvar å sørge for riktig opplæring, motivasjon og kultur.',
    subpoints: [
      { label: 'Opplæring', text: 'Ansatte trenger kunnskap om produktet, servicestandarder og bedriftens verdier.' },
      { label: 'Motivasjon', text: 'Engasjerte ansatte leverer bedre service — ledelse, anerkjennelse og meningsfull jobb er nøkkelen.' },
      { label: 'Bedriftskultur', text: 'En servicekultur der ansatte genuint ønsker å hjelpe, lar seg ikke tvinge frem — den må bygges.' },
      { label: 'Empowerment', text: 'Ansatte bør ha mandat til å løse kundeproblemer på stedet uten å spørre lederen.' },
    ],
    practical: 'Du er ny leder på et hotell. Hvilke tre tiltak setter du i gang for å styrke intern markedsføring?',
    exercises: [
      {
        id: 'MT3-1',
        icon: '🏋️',
        title: 'Intern markedsføring',
        question: 'Et hotell tar inn nye resepsjonister og gir dem kun teknisk opplæring (datasystem, betalingsløsning). Hva mangler i den interne markedsføringen?',
        choices: [
          { id: 'a', label: 'Ingenting — teknisk kompetanse er tilstrekkelig for å betjene gjester', isCorrect: false, feedback: 'Teknisk kompetanse er nødvendig men ikke tilstrekkelig. Serviceholdning og merkevarens verdiløfte må også formidles.' },
          { id: 'b', label: 'Opplæring i servicestandarder, hotellets merkevare, verdier og typiske gjestescenarier', isCorrect: true, feedback: 'Riktig! Intern markedsføring handler om å gi ansatte verktøyene til å levere merkevarens løfte — ikke bare bruke datasystemet.' },
          { id: 'c', label: 'Kurs i salgsteknikker for mersalg', isCorrect: false, feedback: 'Mersalg er viktig, men det er ikke det mest kritiske som mangler.' },
        ],
        espenTip: 'Spør deg: "Vet de ansatte HVA vi lover kundene?" Uten den kunnskapen kan de ikke levere det.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '⚡',
    title: 'Interaktiv markedsføring — Sannhetens øyeblikk',
    quote: '«Sannhetens øyeblikk kan ikke produseres på forhånd.»',
    content: 'Interaktiv markedsføring er møtepunktet mellom den ansatte og kunden — det øyeblikket der alle løfter fra ekstern og all forberedelse fra intern markedsføring enten leveres eller brytes. Dette er sannhetens øyeblikk.',
    subpoints: [
      { label: 'Begrepets opphav', text: 'Jan Carlzon (SAS) introduserte begrepet i 1987: hvert møte med en ansatt er et "Moment of Truth".' },
      { label: 'Unikhet', text: 'Tjenesten skapes og forbrukes i samme øyeblikk — den kan ikke lagres, returneres eller repareres i ettertid.' },
      { label: 'Frontlinjens kritikalitet', text: 'Den minst betalte ansatte tar oftest den viktigste avgjørelsen — møtet med kunden.' },
      { label: 'Recovery', text: 'Håndtering av et problem kan faktisk skape sterkere kundelojalitet enn om problemet aldri oppstod.' },
    ],
    practical: 'Beskriv et "sannhetens øyeblikk" der en ansatt reddet en mislykket kundeopplevelse gjennom ypperlig service.',
    exercises: [
      {
        id: 'MT4-1',
        icon: '⚡',
        title: 'Sannhetens øyeblikk',
        question: 'En hotellgjest ankommer og har fått feil rom. Resepsjonisten beklager, oppgraderer gjesten til suitenivå og gir gratis frokost. Hva har skjedd?',
        choices: [
          { id: 'a', label: 'En feil er dekket over — hotellet har hatt et tap', isCorrect: false, feedback: 'Fra et snevert regnskapsperspektiv kan det stemme, men i serviceledelse kalles dette en vellykket "service recovery".' },
          { id: 'b', label: 'En mislykket servicelevering ble reddet av god interaktiv markedsføring — gjesten kan bli mer lojal enn om intet hadde gått galt', isCorrect: true, feedback: 'Riktig! Forskning viser at vellykket service recovery kan skape sterkere lojalitet enn feilfri service. Gjesten husker løsningen, ikke problemet.' },
          { id: 'c', label: 'Resepsjonisten har handlet utover sin myndighet og bør irettesettes', isCorrect: false, feedback: 'Tvert imot — empowerment til å løse problemer på stedet er et kjennetegn på fremragende servicekultur.' },
        ],
        espenTip: '"Service recovery paradox": riktig håndtert problem kan gi mer lojale kunder enn perfekt service fra start.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '⚙️',
    title: 'Tjenesteproduksjon — Samtid og sårbarhet',
    quote: '«En tjeneste kan ikke produseres på forhånd, lagres, og returneres.»',
    content: 'Tjenester er fundamentalt annerledes enn varer. De produseres og konsumeres i samme øyeblikk. Dette gjør tjenestekvaliteten uforutsigbar og avhengig av mennesker.',
    subpoints: [
      { label: 'Inseparability', text: 'Produksjon og forbruk skjer samtidig — du kan ikke kvalitetssikre en middag som allerede er spist.' },
      { label: 'Variability', text: 'Tjenester varierer mellom leveranser, ansatte og dager — ulik fra standardiserte produkter.' },
      { label: 'Intangibility', text: 'Tjenester kan ikke ses, luktes eller prøves før kjøp — kjøperen stoler på merkevarens løfte.' },
      { label: 'Perishability', text: 'Et tomt hotellrom i natt kan ikke "lagres" til morgen — verdien går tapt.' },
    ],
    practical: 'Hvilke av disse egenskapene er størst utfordring for et frisørsalong? Og for et flyselskap?',
    exercises: [
      {
        id: 'MT5-1',
        icon: '⚙️',
        title: 'Tjenestens særtrekk',
        question: 'Hva menes med at tjenester er "perishable"?',
        choices: [
          { id: 'a', label: 'At tjenester har begrenset holdbarhet, som mat', isCorrect: false, feedback: 'Det er i riktig retning, men "perishable" i tjenestekontekst handler om at ubrukt kapasitet ikke kan lagres.' },
          { id: 'b', label: 'At ubrukt tjenestekapasitet (som tomme flyseter) ikke kan lagres og selges senere — verdien er tapt', isCorrect: true, feedback: 'Riktig! Et tomt flysete på avgang kl. 10:00 kan ikke "lagres" og selges til kl. 11:00. Dette er grunnen til dynamisk prissetting.' },
          { id: 'c', label: 'At tjenester forringes over tid og blir dårligere jo lenger de brukes', isCorrect: false, feedback: 'Det beskriver ikke "perishability" i servicemarkedsføring.' },
        ],
        espenTip: '"Perishability" forklarer hvorfor hoteller og flyselskaper bruker dynamisk prissetting — det er bedre å selge til halv pris enn ikke å selge i det hele tatt.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🏔️',
    title: 'Høyfjellshotellet — Fra Instagram til virkelig mottakelse',
    quote: '«Forventningen settes av markedsavdelingen. Innfrielsen er resepsjonistens ansvar.»',
    content: 'Et høyfjellshotell publiserer spektakulære bilder av naturomgivelser, luksuriøs spa og skreddersydd service på Instagram. Hotelldirektøren kurser ansatte i vin, lokal mat og servicestandarder. Gjesten ankommer til varmt smil og uoppfordret romoppgradering.',
    subpoints: [
      { label: 'Ekstern', text: 'Instagram-bilder og reisebloggere setter forventningen: eksklusivt naturhotell med skreddersydd service.' },
      { label: 'Intern', text: 'Direktøren investerer i kurs: vin, lokal matkultur, servicefilosofi, gjestescenarier.' },
      { label: 'Interaktiv', text: 'Resepsjonisten husker gjestens navn fra booking, gir romoppgradering og introduserer til lokal tur.' },
      { label: 'Resultatet', text: 'Alle tre sider av trekanten virker — gjesten legger ut rave reviews og bookingene øker.' },
    ],
    practical: 'Hva ville skjedd dersom bare den eksterne markedsføringen var god, men intern og interaktiv var svak?',
    exercises: [
      {
        id: 'MT6-1',
        icon: '🏔️',
        title: 'Trekantens balanse',
        question: 'Hotellet har flott ekstern markedsføring, men ansatte er uopptrente og uengasjerte. Hva er den sannsynlige konsekvensen?',
        choices: [
          { id: 'a', label: 'God ekstern markedsføring kompenserer for dårlig service', isCorrect: false, feedback: 'Nei — god markedsføring skaper høye forventninger, som uventa dårlig service gjør enda mer smertefullt.' },
          { id: 'b', label: 'Gjestene ankommer med høye forventninger og opplever en enda større skuffelse — noe som gir svært negative anmeldelser', isCorrect: true, feedback: 'Riktig! Dette er det verste som kan skje: god ekstern markedsføring som skaper forventninger ingen kan innfri. Anmeldelsene vil reflektere gap mellom løfte og virkelighet.' },
          { id: 'c', label: 'Bedriften vil tiltrekke feil kundesegment', isCorrect: false, feedback: 'Det kan skje, men den primære konsekvensen er skuffede kunder som har forventet mer.' },
        ],
        espenTip: 'Trekanten er kun så sterk som dens svakeste side. Bruten intern eller interaktiv markedsføring ødelegger effekten av den dyreste reklamekampanjen.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '💥',
    title: 'Sannhetens øyeblikk — Frontlinjens makt',
    quote: '«Den ansatte som svarer telefonen, representerer hele selskapet.»',
    content: 'Jan Carlzon, tidligere SAS-sjef, lærte at hvert møte mellom en SAS-ansatt og en passasjer var et "Moment of Truth". SAS hadde 10 millioner passasjerer, og de møtte i snitt fem ansatte. Det ga 50 millioner sannhetens øyeblikk per år.',
    subpoints: [
      { label: 'Frontlinjeansatte er kritiske', text: 'De sitter nærmest kunden og har mest direkte innflytelse på opplevelsen.' },
      { label: 'Konsistens er krevende', text: 'Med mange ansatte og millioner av møter er konsistens den store utfordringen.' },
      { label: 'Empowerment er løsningen', text: 'Carlzon ga de ansatte mandat til å ta egne beslutninger i møtet med kunden — uten å spørre ledelsen.' },
      { label: 'Skriftlige servicestandarder', text: 'Klare standarder hjelper, men kan ikke erstatte et genuint ønske om å hjelpe.' },
    ],
    practical: 'Du er daglig leder. En servitør gir en utilfreds gjest en gratis dessert uten å spørre deg. Hva gjør du?',
    exercises: [
      {
        id: 'MT7-1',
        icon: '💥',
        title: 'Empowerment i praksis',
        question: 'Hva er "service empowerment" i tjenestemarkedsføring?',
        choices: [
          { id: 'a', label: 'At lederne tar alle kundebeslutninger for å sikre konsistens', isCorrect: false, feedback: 'Tvert imot — sentralisert beslutningstaking gjør service treg og stiv.' },
          { id: 'b', label: 'At frontlinjeansatte gis mandat til å ta selvstendige beslutninger i møtet med kunden', isCorrect: true, feedback: 'Riktig! Empowerment betyr at en resepsjonist kan gi romoppgradering, eller at en servitør kan fjerne en rett fra regningen — uten å måtte spørre leder.' },
          { id: 'c', label: 'At kunden gis mer makt til å bestemme prisen', isCorrect: false, feedback: 'Det handler om ansattes myndighet, ikke kundenes prismakt.' },
        ],
        espenTip: 'Empowerment + god opplæring + klare verdier = konsistent, fremragende service uten mikrostyring.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Misforståelse — Markedsføring er ikke bare reklame',
    quote: '«Uniformen, smilet og produktkunnskapen er den sterkeste markedsføringskanalen.»',
    content: 'Den vanligste misforståelsen blant markedsføringsstudenter er å likestille markedsføring med reklame og sosiale medier. I tjenesteytende næringer er frontlinjepersonalet den viktigste markedsføringskanalen.',
    subpoints: [
      { label: 'Myte: Markedsføring = reklame', text: 'Reklame er ekstern markedsføring — én av tre sider av trekanten.' },
      { label: 'Virkeligheten', text: 'Et smil fra servitøren, riktig kaffetemperatur og rask løsning av problemer er mer verdifull markedsføring enn en TV-spot.' },
      { label: 'Vareprat', text: 'En fornøyd gjest som anbefaler hotellet til fem venner er gratis og troverdig markedsføring.' },
      { label: 'Konsekvensen for ansatte', text: 'Alle ansatte er markedsførere — ikke bare markedsavdelingen.' },
    ],
    practical: 'Estimer: Hva er verdien av én positiv TripAdvisor-anmeldelse for et hotell med 100 rom?',
    exercises: [
      {
        id: 'MT8-1',
        icon: '⚠️',
        title: 'Markedsføring i vid forstand',
        question: 'En restaurantkjede bruker 2 millioner kr på reklamekampanje, men har dårlig service og ikke utdannede ansatte. Hva er sannsynlig utfall?',
        choices: [
          { id: 'a', label: 'Reklamen tiltrekker nye kunder som vil spre positive anmeldelser', isCorrect: false, feedback: 'Reklamen tiltrekker kunder — men dårlig service sørger for at de skriver negative anmeldelser og aldri kommer tilbake.' },
          { id: 'b', label: 'Kampanjen skaper trafikk, men dårlig service ødelegger omdømmet via negative anmeldelser og manglende gjenkjøp', isCorrect: true, feedback: 'Riktig! Reklame uten servicelevering er penger i do. Kampanjen gir trafikk, men dårlig interaktiv markedsføring sørger for at disse kundene aldri kommer tilbake.' },
          { id: 'c', label: 'Bedriften bør heller øke reklamebudsjettet', isCorrect: false, feedback: 'Mer reklame forsterker problemet — det bringer inn enda flere kunder til en dårlig opplevelse.' },
        ],
        espenTip: 'Sats på intern markedsføring FØR du øker reklamebudsjettet. Fikse service gir mer avkastning enn mer reklame.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Markedsføringsloven og dens krav',
    quote: '«Løftene dine er juridisk bindende.»',
    content: 'Markedsføringsloven regulerer ekstern markedsføring i Norge. Loven forbyr villedende reklame, urimelige handelsmetoder og stiller krav til korrekt prisinformasjon.',
    subpoints: [
      { label: 'Forbud mot villedende reklame', text: 'Påstander i reklame må være sanne og ikke skape feilaktige inntrykk.' },
      { label: 'Forbud mot grønnvasking', text: 'Miljøpåstander uten dokumentasjon er ulovlig.' },
      { label: 'Merking av reklame', text: 'Influensere og innholdsmarkedsføring skal tydelig merkes som reklame.' },
      { label: 'Forbrukertilsynet', text: 'Håndhevingsorgan som kan gi pålegg og overtredelsesgebyr.' },
    ],
    practical: 'Et hotel annonserer: "Vinneren av årets beste spa." Hva krever markedsføringsloven av slike påstander?',
    exercises: [
      {
        id: 'MT9-1',
        icon: '⚖️',
        title: 'Markedsføringsloven',
        question: 'En matblogg publiserer en "ærlig anmeldelse" av en restaurant uten å opplyse om at restauranten betalte for besøket. Hva er problemet?',
        choices: [
          { id: 'a', label: 'Ingenting — bloggeren kan skrive hva de vil', isCorrect: false, feedback: 'Nei — kommersielle ytringer er regulert. Betalt omtale MÅ merkes som reklame etter markedsføringsloven.' },
          { id: 'b', label: 'Betalt innhold uten reklamemerknad er brudd på markedsføringsloven og villedende for leserne', isCorrect: true, feedback: 'Riktig! Forbrukertilsynet håndhever kravet om at betalt innhold (influensere, bloggere, ambassadører) tydelig skal merkes "Annonse" eller "Reklame".' },
          { id: 'c', label: 'Det er uetisk men ikke ulovlig', isCorrect: false, feedback: 'Det er begge deler — det er faktisk ulovlig etter markedsføringsloven.' },
        ],
        espenTip: 'Forbrukertilsynet er aktive med influenser-reklame. #annonse, #sponset eller #reklame er påkrevd.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Alle tre sider må fungere',
    quote: '«Trekanten er sterkest når alle tre sider holder.»',
    content: 'Markedsføringstrekanten er en kraftig modell for å forstå serviceledelse. Den minner oss om at markedsføring er mye mer enn reklame — det er en total leveranse der alle deler av organisasjonen bidrar.',
    subpoints: [
      { label: 'Ekstern', text: 'Gi riktige løfter — verken for store eller for små.' },
      { label: 'Intern', text: 'Forbered ansatte til å holde løftene gjennom opplæring, kultur og empowerment.' },
      { label: 'Interaktiv', text: 'Levere i sannhetens øyeblikk — og redde situasjonen med god service recovery.' },
      { label: 'Alle er markedsførere', text: 'I tjenesteytende næringer er alle ansatte merkevarebærere.' },
    ],
    practical: 'Designet en komplett markedsføringsstrategi for et lite reisebyrå med fokus på alle tre sidene av trekanten.',
    exercises: [
      {
        id: 'MT10-1',
        icon: '✅',
        title: 'Helhetsforståelse',
        question: 'Et flyselskap har upåklagelig ekstern markedsføring og god intern opplæring, men fly er alltid forsinket. Hvilken side av trekanten svikter?',
        choices: [
          { id: 'a', label: 'Ekstern markedsføring — de lover for mye', isCorrect: false, feedback: 'Problemet er ikke løftene i seg selv — det er den interaktive leveransen som svikter.' },
          { id: 'b', label: 'Interaktiv markedsføring — leveransen i sannhetens øyeblikk møter ikke løftet', isCorrect: true, feedback: 'Riktig! Forsinkelsene er den faktiske tjenesteleveransen — det er der løftet brytes. God reklame og opplæring kan ikke kompensere for faktiske forsinkelser.' },
          { id: 'c', label: 'Intern markedsføring — de ansatte er dårlig opplært', isCorrect: false, feedback: 'Opplæringen er god i dette eksempelet. Problemet er den operative leveransen — punktlighet.' },
        ],
        espenTip: 'Sannhetens øyeblikk: hvert punkt der kunden møter bedriften. For et flyselskap er punktlighet det viktigste sannhetens øyeblikk.',
      },
    ],
  },
]

export default function MarkedsforingstrekantenModule() {
  return (
    <DrawerModule
      moduleCode="MK-VG2-2"
      moduleTitle="Markedsføringstrekanten"
      moduleIcon="🔺"
      storageKey="learning-vg2-markedsforingstrekan"
      completeRoute="/learning/vg2/kommunikasjon/markedsforingstrekan/complete"
      phases={phases}
      intro="Forstå samspillet mellom ekstern, intern og interaktiv markedsføring — og hvorfor alle ansatte er markedsførere."
      vissteduAt="Jan Carlzon, tidligere SAS-sjef, identifiserte 50 millioner 'sannhetens øyeblikk' per år — hvert møte mellom en SAS-ansatt og en passasjer."
      espenSier="En reklamekampanje for millioner er verdiløs hvis resepsjonisten er sur mandag morgen. Intern markedsføring er den viktigste investeringen du gjør."
      presentationLink={{ route: '/learning/presentations/markedsforingstrekanten', description: 'Markedsføringstrekanten — en visuell presentasjon' }}
    />
  )
}
