import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🤝',
    title: 'Profesjonelt salg — Kunsten å hjelpe kunden å kjøpe',
    quote: '«Den beste selgeren selger ikke — de hjelper kunden å ta en god beslutning.»',
    content: 'Profesjonelt salg er et håndverk og en strategisk prosess. Det handler ikke om å overtale noen til å kjøpe noe de ikke trenger — det handler om å forstå kundens behov og tilby den beste løsningen.',
    subpoints: [
      { label: 'Relasjonssalg', text: 'Målet er ikke et engangssalg, men gjensalg gjennom tillit og langvarig relasjon.' },
      { label: 'Rådgivermodellen', text: 'Selgeren er en rådgiver, ikke en overtaler.' },
      { label: 'Salgsmiljøet', text: 'Atmosfære, lys, vareeksponering og musikk støtter salgsprosessen.' },
    ],
    practical: 'Tenk på en gang en selger imponerte deg. Hva gjorde de som skilte seg ut fra en vanlig ekspedient?',
    exercises: [
      {
        id: 'SP1-1',
        icon: '🤝',
        title: 'Hva er profesjonelt salg?',
        question: 'Hva er det viktigste kjennetegnet på profesjonelt salg vs. enkel ekspedisjon?',
        choices: [
          { id: 'a', label: 'Profesjonelle selgere snakker mer og er mer overtydende', isCorrect: false, feedback: 'Tvert imot — den beste selgeren lytter mer enn de snakker. 70/30-regelen: lytt 70 %, snakk 30 %.' },
          { id: 'b', label: 'Profesjonelle selgere avdekker kundens behov aktivt og tilbyr løsninger — ikke bare svarer på spørsmål', isCorrect: true, feedback: 'Riktig! En ekspedient venter på at kunden spør. En selger tar initiativ til å forstå behovet og guide kunden til riktig løsning.' },
          { id: 'c', label: 'Profesjonelle selgere er bedre på å overtale kunder til å kjøpe dyre produkter', isCorrect: false, feedback: 'God salg handler om å selge riktig produkt — ikke nødvendigvis det dyreste.' },
        ],
        espenTip: '70/30-regelen: En god selger lytter 70 % av tiden og snakker 30 %. Spørsmålstegnene er selgerens viktigste verktøy.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🗺️',
    title: 'Salgsprosessens faser — Fra forberedelse til oppfølging',
    quote: '«Mange taper salget i forberedelsene — ikke i møtet.»',
    content: 'En strukturert salgsprosess er mer pålitelig enn improvisasjon. De seks fasene gir selgeren et kart gjennom hele salgssyklus.',
    subpoints: [
      { label: '1. Forberedelse', text: 'Kjenn produktet, kunden og markedet. Ingen unnskyldning for å komme uforberedt.' },
      { label: '2. Kontaktskaping', text: 'Førsteinntrykket er kritisk. Smil, navn, øyekontakt.' },
      { label: '3. Behovsavdekking', text: 'Den viktigste fasen. Still åpne spørsmål og lytt aktivt.' },
      { label: '4. Argumentasjon og presentasjon', text: 'Knytt produktets fordeler til kundens spesifikke behov.' },
      { label: '5. Avslutning', text: 'Gjenkjenn kjøpssignaler og be om ordren.' },
      { label: '6. Oppfølging', text: 'Bekreft kjøpet, sjekk tilfredshet, legg grunnlag for gjensalg.' },
    ],
    practical: 'Rollespill: En kunde kommer inn i en sportsbutikk og sier "jeg leter etter noe til hike". Gå gjennom alle seks fasene.',
    exercises: [
      {
        id: 'SP2-1',
        icon: '🗺️',
        title: 'Salgsprosessens rekkefølge',
        question: 'Hva er den VIKTIGSTE fasen i salgsprosessen, og hvorfor?',
        choices: [
          { id: 'a', label: 'Forberedelsen — fordi uten produktkunnskap kan du ikke selge', isCorrect: false, feedback: 'Forberedelse er nødvendig, men ikke den viktigste fasen for salgssuksess.' },
          { id: 'b', label: 'Behovsavdekkingen — fordi uten å forstå kundens behov kan du ikke presentere riktig løsning', isCorrect: true, feedback: 'Riktig! Behovsavdekking er selgerens aller viktigste kompetanse. Uten den selger du feil produkt til rett kunde — eller rett produkt til feil grunn.' },
          { id: 'c', label: 'Avslutningen — fordi det er her salget faktisk skjer', isCorrect: false, feedback: 'Avslutningen er kritisk, men den er et naturlig resultat av god behovsavdekking. Uten riktig behovsavdekking er avslutningen vanskelig uansett.' },
        ],
        espenTip: 'Huskeregel: Spørsmål → Lytt → Foreslå. Ikke: Snakk → Overtal → Press.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔍',
    title: 'Behovsavdekking — Den viktigste fasen',
    quote: '«Du kan ikke treffe et mål du ikke kan se.»',
    content: 'Behovsavdekking er prosessen med å avdekke kundens egentlige behov gjennom målrettede spørsmål og aktiv lytting. Det er det som skiller rådgivende salg fra transaksjonsbasert ekspedisjon.',
    subpoints: [
      { label: 'Åpne spørsmål', text: 'Starter med: hva, hvorfor, hvordan, hvem, hvilken. Gir utdypende svar.' },
      { label: 'Lukkede spørsmål', text: 'Gir ja/nei-svar. Brukes til å bekrefte forståelse eller lede mot avslutning.' },
      { label: 'Aktiv lytting', text: 'Nikking, oppsummering ("Så forstår jeg det riktig at..."), taushet.' },
      { label: 'Underliggende behov', text: 'Kunden sier "jeg trenger nye sko" — men det underliggende behovet er kanskje knær-smerte eller en bestemt aktivitet.' },
    ],
    practical: 'Øvelse: Stilt BARE åpne spørsmål i 3 minutter til en "kunde" som vil ha en kaffemaskin. Hva finner du ut?',
    exercises: [
      {
        id: 'SP3-1',
        icon: '🔍',
        title: 'Åpne vs. lukkede spørsmål',
        question: 'Hvilken av disse er et ÅPENT spørsmål?',
        choices: [
          { id: 'a', label: '"Leter du etter ryggsekk?" ', isCorrect: false, feedback: 'Dette er et lukket spørsmål — kunden kan svare "ja" eller "nei" uten å gi mer informasjon.' },
          { id: 'b', label: '"Hva slags turer bruker du ryggsekk til?"', isCorrect: true, feedback: 'Riktig! Dette er et åpent spørsmål — det inviterer til et utdypende svar om kundens behov og brukssituasjon.' },
          { id: 'c', label: '"Vil du ha den i blå eller svart?"', isCorrect: false, feedback: 'Dette er et lukket spørsmål med to faste alternativer. Brukes i avslutningsfasen, ikke behovsavdekking.' },
        ],
        espenTip: 'Test deg selv: Hvis svaret kan være "ja" eller "nei", er spørsmålet lukket. Åpne spørsmål gir deg informasjon.',
      },
      {
        id: 'SP3-2',
        icon: '🎧',
        title: 'Aktiv lytting',
        question: '70/30-regelen i salg sier at selgeren bør lytte 70 % og snakke 30 %. Hva er poenget?',
        choices: [
          { id: 'a', label: 'Selgeren er sjenert og foretrekker å lytte', isCorrect: false, feedback: 'Det handler ikke om personlighetstype. Det er en bevisst strategi.' },
          { id: 'b', label: 'Kunden avslører sine behov når de snakker — selgerens jobb er å samle informasjon for å tilby riktig løsning', isCorrect: true, feedback: 'Riktig! Jo mer kunden snakker, jo mer informasjon om behov og prioriteringer avslører de. Selgeren kan deretter tilby en presist tilpasset løsning.' },
          { id: 'c', label: 'Fordi kunden trenger å høre seg selv snakke for å bli trygg nok til å kjøpe', isCorrect: false, feedback: 'Delvis sant psykologisk, men det primære poenget er informasjonsinnhenting.' },
        ],
        espenTip: 'Taushet er undervurdert i salg. La kunden fylle pausene — de avslører ofte det viktigste i de øyeblikkene.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💬',
    title: 'Argumentasjon — Fordeler kobles til behov',
    quote: '«Ikke selg drill — selg hullet i veggen.»',
    content: 'God produktpresentasjon kobler produktets egenskaper direkte til kundens spesifikke behov avdekket i forrige fase. FAB-modellen (Feature, Advantage, Benefit) er et kraftfullt verktøy.',
    subpoints: [
      { label: 'Feature (Egenskap)', text: 'Hva produktet har: "Denne støvelen har Gore-Tex-membran."' },
      { label: 'Advantage (Fordel)', text: 'Hva egenskapen gjør: "Den holder vann ute og lar svette slippe ut."' },
      { label: 'Benefit (Nytte for kunden)', text: '"Det betyr at du holder føttene tørre og komfortable hele dagen på tur."' },
      { label: 'Kundetilpasset', text: 'Benefit tilpasses det kunden fortalte: "Du nevnte at du får kalde føtter — dette løser det."' },
    ],
    practical: 'Øvelse: Bruk FAB-modellen til å presentere en smartklokke for tre ulike kunder: en løper, en student og en forretningsmann.',
    exercises: [
      {
        id: 'SP4-1',
        icon: '💬',
        title: 'FAB-modellen',
        question: 'En kunde forteller at de sliter med å holde oversikt over alle møtene sine. Hvilken presentasjon er best?',
        choices: [
          { id: 'a', label: '"Denne telefonen har 512GB lagringsplass."', isCorrect: false, feedback: 'Det er en Feature, men den er ikke koblet til kundens behov (møteoversikt).' },
          { id: 'b', label: '"Denne telefonen har Google Kalender (Feature), som synkroniserer alle møter automatisk (Advantage) — du slipper å huske alt selv (Benefit)."', isCorrect: true, feedback: 'Riktig! FAB-formelen i perfekt rekkefølge, og benefit er koblet direkte til kundens behov.' },
          { id: 'c', label: '"Du bør kjøpe denne — den er veldig populær."', isCorrect: false, feedback: 'Popularitet er ikke koblet til kundens spesifikke problem. Social proof er et tilleggsargument, ikke et behovsbasert argument.' },
        ],
        espenTip: 'Nøkkelsetningen: "Du nevnte at... og dette hjelper deg med det fordi..."',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📈',
    title: 'Mersalg og kryss-salg — Øke verdien for kunde og bedrift',
    quote: '«Mersalg er ikke manipulasjon — det er å hjelpe kunden å se hva de ikke visste de trengte.»',
    content: 'Mersalg og kryss-salg er to strategier for å øke gjennomsnittlig ordrestørrelse. Begge er legitime og skaper verdi for kunden dersom de gjøres riktig.',
    subpoints: [
      { label: 'Mersalg (upselling)', text: 'Oppgradere til en bedre versjon av det kunden allerede vil kjøpe. ("Vil du heller ha den med Gore-Tex?")'  },
      { label: 'Kryss-salg (cross-selling)', text: 'Selge relaterte produkter fra annen kategori. ("Vil du ha refleksvest i tillegg til støvlene?")'  },
      { label: 'Timing', text: 'Mersalg skjer tidlig i prosessen, kryss-salg gjerne mot slutten.' },
      { label: 'Kundeverdien', text: 'Kunden som kjøper riktig utstyr er mer fornøyd og kommer tilbake.' },
    ],
    practical: 'Øvelse: En kunde kjøper campingutstyr. List opp tre mersalg-muligheter og tre kryss-salg-muligheter.',
    exercises: [
      {
        id: 'SP5-1',
        icon: '📈',
        title: 'Mersalg vs. kryss-salg',
        question: 'En gjest bestiller standardrom på hotell. Resepsjonisten tilbyr junior suite til 200 kr ekstra. Hva er dette?',
        choices: [
          { id: 'a', label: 'Kryss-salg — det er et annet produkt i en annen kategori', isCorrect: false, feedback: 'Nei — et romoppgradering er i samme kategori (overnattingsvom) bare på et høyere nivå.' },
          { id: 'b', label: 'Mersalg — en oppgradering til bedre versjon av det kunden allerede kjøper', isCorrect: true, feedback: 'Riktig! Mersalg = samme produktkategori, høyere verdi/kvalitet. Her er det samme: overnatting, bare i bedre rom.' },
          { id: 'c', label: 'Produktpresentasjon — resepsjonisten viser bare hva som er tilgjengelig', isCorrect: false, feedback: 'Det er en aktiv salgsteknikk der resepsjonisten prøver å øke verdien av kjøpet. Det er klassisk mersalg.' },
        ],
        espenTip: 'Enkel huskeregel: Mersalg = bedre versjon av SAMME produkt. Kryss-salg = ANNET produkt som kompletterer.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🚗',
    title: 'Møller Bil — Oppfølging tre uker etter kjøp',
    quote: '«Salget avsluttes ikke ved overlevering — det begynner der.»',
    content: 'Møller Bil er kjent for sin systematiske oppfølging. Selgeren ringer kunden tre uker etter billevering for å høre om kunden er fornøyd. Dette er et strategisk grep for lojalitetsbygging og gjensalg.',
    subpoints: [
      { label: 'Formålet', text: 'Verifisere tilfredshet, fange opp eventuelle problemer tidlig, og befeste relasjonen.' },
      { label: 'Gjensalg', text: 'En fornøyd kunde som husker selgerens navn, er langt mer sannsynlig å bruke samme selger ved neste bilkjøp.' },
      { label: 'Vareprat', text: 'En fornøyd kunde som anbefaler selgeren til tre venner er mer verdifull enn ti annonser.' },
      { label: 'Customer lifetime value', text: 'En bilkunde kan representere 4–5 kjøp over 20 år. Relasjonen er verdt å investere i.' },
    ],
    practical: 'Design en oppfølgingsrutine for en reisebyrå-selger. Hva gjør de dagen etter, en uke etter og en måned etter at kunden kjøpte turen?',
    exercises: [
      {
        id: 'SP6-1',
        icon: '🚗',
        title: 'Verdien av oppfølging',
        question: 'Møller Bil ringer kunder tre uker etter billevering. Hva er det primære forretningsmessige formålet?',
        choices: [
          { id: 'a', label: 'Å sjekke om bilen har tekniske problemer for garantiformål', isCorrect: false, feedback: 'Dette kan avdekkes, men det er ikke det primære formålet.' },
          { id: 'b', label: 'Å bygge en langsiktig relasjon som øker sannsynligheten for gjensalg og videreanbefaling', isCorrect: true, feedback: 'Riktig! Customer lifetime value er nøkkelen. En bilkunde kan gi 4–5 kjøp over 20 år. Oppfølgingen investerer i den langsiktige relasjonen.' },
          { id: 'c', label: 'Å samle inn data til bedriftens CRM-system', isCorrect: false, feedback: 'Data kan samles, men det er et sekundærformål. Primærformålet er relasjonsbygging.' },
        ],
        espenTip: 'Customer lifetime value (CLV): Hva er en kunde verdt totalt over hele relasjonen? En bilkjøper kan representere 500 000–2 mill. kr i totalt salg.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🔨',
    title: 'Obs Bygg — Behovsavdekking i praksis',
    quote: '«Hva skal du male på?» — tre ord som kan selge tre produkter.»',
    content: 'En dyktig fagarbeider hos Obs Bygg starter alltid med å stille spørsmål fremfor å peke på reolen. "Hva skal du male på?" avdekker behovet og åpner for mersalg av grunning, riktig rull og maskeringstape.',
    subpoints: [
      { label: 'Åpent spørsmål', text: '"Hva skal du male på?" — avdekker brukssituasjon, type underlag, volum.' },
      { label: 'Produktanbefalingen', text: 'Basert på svaret anbefales riktig maling, grunning, rull og tape.' },
      { label: 'Mersalg med faglig begrunnelse', text: 'Kunden ser verdi i anbefalingen fordi den løser et problem de ikke visste de hadde.' },
      { label: 'Faglig troverdighet', text: 'Kunden stoler på anbefalingen fordi den er basert på behov, ikke på provisjon.' },
    ],
    practical: 'Rollespill: En kunde kommer inn og sier "Jeg trenger malingskoster". Behovsavdekk og anbefal deretter.',
    exercises: [
      {
        id: 'SP7-1',
        icon: '🔨',
        title: 'Behovsbasert mersalg',
        question: 'En byggvarehus-medarbeider hjelper en kunde med å velge maling. Etter å ha avdekket at kunden skal male utendørs i høst, tilbyr medarbeideren maling med frost-beskyttelse. Er dette etisk mersalg?',
        choices: [
          { id: 'a', label: 'Nei — det er manipulasjon for å øke prisen', isCorrect: false, feedback: 'Nei — her er mersalget basert på kundens faktiske behov (utemaling om høst krever frostbeskyttelse). Det er faglig rådgivning, ikke manipulasjon.' },
          { id: 'b', label: 'Ja — mersalget er basert på kundens behov og tilbyr en løsning på et reelt problem', isCorrect: true, feedback: 'Riktig! Mersalg er etisk og verdifullt når det er behovsbasert. Kunden får bedre resultat, selger bygger tillit.' },
          { id: 'c', label: 'Det er uetisk fordi kunden ikke spurte om frostbeskyttelse', isCorrect: false, feedback: 'Kunden vet ikke alltid hva de trenger. Proaktiv faglig rådgivning er en del av god salgsservice.' },
        ],
        espenTip: 'Test for etisk mersalg: Hjelper dette kunden å oppnå sitt mål bedre? Ja → etisk. Nei → manipulasjon.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Misforståelse — Den gode selgeren prater ikke mye',
    quote: '«En god selger er ikke den som kan snakke seg ut av alt — men den som lytter seg inn.»',
    content: 'Den vanligste misforståelsen om salg er at den beste selgeren er utadvendt, brautende og snakker kunden "i senk". De dyktigste selgerne kjennetegnes faktisk av det motsatte.',
    subpoints: [
      { label: 'Myte: Gode selgere er utadvendte pratmakere', text: 'Forskning viser ingen sammenheng mellom ekstroversjon og salgssuksess.' },
      { label: 'Virkeligheten', text: 'De beste selgerne stiller smarte spørsmål og lytter systematisk.' },
      { label: 'Manipulasjon er kortsiktig', text: 'Presset salg gir utilfredse kunder, retur og dårlige anmeldelser.' },
      { label: 'Tillit som fundament', text: 'Langvarig salgsuksess bygger på tillit — ikke triks og press.' },
    ],
    practical: 'Observer en god selger i en butikk. Regn forholdet mellom snakking og lytting. Stemmer 70/30 med det du ser?',
    exercises: [
      {
        id: 'SP8-1',
        icon: '⚠️',
        title: 'Selgermyten',
        question: 'En selger snakker sammenhengende i 5 minutter om produktets egenskaper uten å stille ett spørsmål. Hva er problemet?',
        choices: [
          { id: 'a', label: 'Ingenting — kunden trenger mye informasjon for å ta en beslutning', isCorrect: false, feedback: 'For mye informasjon uten kontekst er overveldende — ikke hjelpsomt.' },
          { id: 'b', label: 'Selgeren vet ikke kundens behov og presenterer sannsynligvis irrelevante egenskaper', isCorrect: true, feedback: 'Riktig! Uten behovsavdekking vet selgeren ikke hva som er relevant for kunden. Resultatet er ofte at kunden presenteres egenskaper som ikke løser problemet deres.' },
          { id: 'c', label: 'Kunden blir for godt informert og pruter mer', isCorrect: false, feedback: 'For mye informasjon er demotiverende, ikke for mye makt til kunden.' },
        ],
        espenTip: 'Huskeregel: Du lærer ingenting mens du snakker. Still spørsmål og hold kjeft.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Muntlige løfter er bindende',
    quote: '«Det du sier, er det du selger.»',
    content: 'Forbrukerkjøpsloven slår fast at muntlige løfter og garantier fra selger er juridisk bindende. Dette har store konsekvenser for selgerrollen.',
    subpoints: [
      { label: 'Muntlige løfter er bindende', text: 'Hvis selger sier "batteriet holder 20 timer" og det holder 10, er det en mangel.' },
      { label: 'Reklamasjonsretten', text: 'Forbrukeren har rett til å reklamere på feil eller mangler i 2 eller 5 år.' },
      { label: 'Salgsmaterialets krav', text: 'Katalogbeskrivelser og annonseløfter er også bindende — de er en del av avtalen.' },
      { label: 'Angrerettloven', text: 'Ved fjernsalg (nett, telefon, dør) har kunden 14 dagers angrerett.' },
    ],
    practical: 'En kunde reklamerer på et produkt du solgte, og viser til noe du sa i salgssamtalen. Hva gjør du?',
    exercises: [
      {
        id: 'SP9-1',
        icon: '⚖️',
        title: 'Selgerens ansvar',
        question: 'En selger lover at malingen "vil dekke perfekt uten grunning". Malingen dekker dårlig. Hva kan kunden kreve?',
        choices: [
          { id: 'a', label: 'Ingenting — kunden burde ha sjekket produktbeskrivelsen', isCorrect: false, feedback: 'Selgerens muntlige løfte er juridisk bindende etter forbrukerkjøpsloven — det trumfer produktbeskrivelsen.' },
          { id: 'b', label: 'Retting, omlevering eller prisavslag — selgerens løfte er juridisk bindende', isCorrect: true, feedback: 'Riktig! Forbrukerkjøpsloven §16 sier at varen må samsvare med beskrivelser gitt av selger. Muntlige løfter er bindende.' },
          { id: 'c', label: 'Kunden kan bare reklamere skriftlig, ikke muntlig', isCorrect: false, feedback: 'Reklamasjon kan skje muntlig. Det er selgerens løfte (ikke reklamasjonsformen) som er relevant her.' },
        ],
        espenTip: 'Tenk deg om FØR du lover noe. "Dette er den beste ryggsekken" er en subjektiv påstand. "Dette holder tørt i 10 timer" er et faktapåstand og er bindende.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Tillit er fundamentet for alt salg',
    quote: '«Salg er ikke et spill du vinner — det er en relasjon du bygger.»',
    content: 'Profesjonelt salg handler om å forstå kunden, tilby riktige løsninger og bygge relasjoner for gjensalg. Manipulasjon og press er ikke bare uetisk — det er dårlig business.',
    subpoints: [
      { label: 'Salgsprosessens 6 faser', text: 'Forberedelse → Kontakt → Behovsavdekking → Argumentasjon → Avslutning → Oppfølging.' },
      { label: 'Behovsavdekking er nøkkelen', text: 'Åpne spørsmål + aktiv lytting = innsikt i kundens reelle behov.' },
      { label: 'FAB-modellen', text: 'Koble egenskaper til fordeler til nytte for kunden.' },
      { label: 'Mersalg og kryss-salg', text: 'Etisk og verdiskapende når basert på kundens behov.' },
      { label: 'Tillit over tid', text: 'Gjensalg og vareprat er mer verdifullt enn ethvert engangssalg.' },
    ],
    practical: 'Sammendrag-øvelse: Gå gjennom en komplett fiktiv salgssamtale fra forberedelse til oppfølging — skriv ned nøkkelpunktene fra hvert steg.',
    exercises: [
      {
        id: 'SP10-1',
        icon: '✅',
        title: 'Salgsforståelse',
        question: 'En kunde forlater butikken uten å kjøpe. Selgeren hadde gjort en grundig behovsavdekking og presentert to relevante produkter. Hva er den BESTE reaksjonen?',
        choices: [
          { id: 'a', label: 'Stoppe kunden og tilby rabatt for å redde salget', isCorrect: false, feedback: 'Å presse på rabatt signaliserer despersjon og kan skade merkevarens posisjon. Ikke riktig reaksjon.' },
          { id: 'b', label: 'La kunden gå med takk, og sørge for at de vet at de er velkomne tilbake — kunden kan komme tilbake', isCorrect: true, feedback: 'Riktig! Ikke alle kjøp skjer i dag. En god serviceopplevelse gir kunden lyst til å komme tilbake. Presser du dem ut, mister du dem for godt.' },
          { id: 'c', label: 'Evaluere om behovsavdekkingen var for dårlig og gjøre det bedre neste gang', isCorrect: false, feedback: 'Evaluering er godt, men det er ikke den "beste reaksjonen" overfor den aktuelle kunden.' },
        ],
        espenTip: 'Salg er ikke et kappløp til kassen — det er en invitasjon til en relasjon. La kunden gå, og sørg for at de husker deg positivt.',
      },
      {
        id: 'SP10-2',
        icon: '🎯',
        title: 'FAB i handling',
        question: 'Kunden sier: "Jeg vil ha en god vinterfrakk, men er bekymret for at jeg svetter for mye." Hvilken argumentasjon er best?',
        choices: [
          { id: 'a', label: '"Denne jakken er veldig populær og koster 2 499 kr."', isCorrect: false, feedback: 'Ingen kobling til kundens spesifikke bekymring om svette. Popularitet og pris er ikke relevant her.' },
          { id: 'b', label: '"Denne jakken har Polartec-membran (Feature), som regulerer kroppstemperatur og leder fuktighet ut (Advantage) — du holder deg varm uten å svette (Benefit)."', isCorrect: true, feedback: 'Riktig! Perfekt FAB-formelen koblet til kundens spesifikke bekymring. Benefit svarer direkte på "er bekymret for at jeg svetter".' },
          { id: 'c', label: '"Alle vinterjakkene våre er av høy kvalitet."', isCorrect: false, feedback: 'En generell kvalitetspåstand uten kobling til kundens behov er svak argumentasjon.' },
        ],
        espenTip: '"Du nevnte at du er bekymret for... og denne jakken løser nettopp det fordi..." — Alltid koble benefit til det kunden faktisk sa.',
      },
    ],
  },
]

export default function SalgsprosessenVg2Module() {
  return (
    <DrawerModule
      moduleCode="MK-VG2-6"
      moduleTitle="Salgsprosessen"
      moduleIcon="🤝"
      storageKey="learning-vg2-salgsprosessen"
      completeRoute="/learning/vg2/kommunikasjon/salgsprosessen-vg2/complete"
      phases={phases}
      intro="Mestre salgsprosessens seks faser, FAB-modellen og 70/30-regelen — fra behovsavdekking til gjensalg."
      vissteduAt="Forskning viser at den beste prediktoren for salgssuksess ikke er personlighet eller utadvendthet — det er antall åpne spørsmål stilt i en salgssamtale."
      espenSier="Ikke prøv å overbevise kunden — hjelp dem å ta en god beslutning. Den kunden som kjøper noe de faktisk trenger, kommer alltid tilbake. Den som ble presset, gjør det ikke."
      presentationLink={{ route: '/learning/presentations/salgsprosessen-vg2', description: 'Salgsprosessen — en visuell presentasjon' }}
    />
  )
}
