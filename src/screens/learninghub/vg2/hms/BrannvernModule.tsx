import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔥',
    title: 'Brannvern — det mest regulerte sikkerhetsaspektet',
    quote: '"Brann er en av de raskest eskalerende farene i et bygg — men også en av de best forståtte."',
    content: 'Brannvern er det sikkerhetsaspektet som er hardest regulert i norsk arbeidsliv. Alle virksomheter er forpliktet til å ha fungerende rømningsveier, gjennomføre jevnlige brannøvelser og sørge for at riktig slokkemiddel er tilgjengelig. Kunnskap om brannteori gjør deg i stand til å reagere riktig — og unngå de farligste feilene.',
    subpoints: [
      { label: 'Alle virksomheter', text: 'er lovpålagt å ha brannforebyggende tiltak etter Brann- og eksplosjonsvernloven' },
      { label: 'Brannøvelse', text: 'skal gjennomføres minst én gang i året i alle virksomheter' },
      { label: 'Brannsjefen', text: 'er daglig leder — det juridiske ansvaret for brannvern ligger hos virksomhetens øverste leder' },
      { label: 'Raskest', text: 'Brann kan fylle et rom med røyk på under 2 minutter. Røyk er farligst — ikke flammene' },
    ],
    practical: 'Finn ut nå: Vet du hvem som er brannansvarlig på din arbeidsplass? Vet du hvor rømningsveiene er? Vet du hvilken brannslukker som finnes og hvordan du bruker den?',
    exercises: [
      {
        id: 'bv1-1',
        icon: '🔥',
        title: 'Brannansvar',
        question: 'Hvem har det juridiske ansvaret for brannvern i en virksomhet?',
        choices: [
          { id: 'a', label: 'Verneombudet', isCorrect: false, feedback: 'Verneombudet overvåker arbeidsmiljøet, men har ikke juridisk brannvernansvar.' },
          { id: 'b', label: 'Kommunens brannvesen', isCorrect: false, feedback: 'Brannvesenet er en ekstern ressurs. Internkontrollen og ansvaret ligger hos virksomheten.' },
          { id: 'c', label: 'Daglig leder', isCorrect: true, feedback: 'Riktig! Daglig leder bærer det juridiske ansvaret for at brannvern er på plass.' },
          { id: 'd', label: 'Arbeidstakerne kollektivt', isCorrect: false, feedback: 'Alle har ansvar for å følge rutinene, men ansvaret for at rutinene finnes, ligger hos ledelsen.' },
        ],
        espenTip: 'I HMS generelt gjelder dette: juridisk ansvar = daglig leder. Verneombud og ansatte har medvirkningsplikt, ikke juridisk ansvar.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔺',
    title: 'Branntrekanten — forstå hvorfor brann oppstår',
    quote: '"Fjern én side av trekanten, og brannen slukker."',
    content: 'Branntrekanten er det grunnleggende fysiske prinsippet bak all brann og slokking. For at en brann skal oppstå og holde seg i live, må tre elementer være til stede samtidig. Kunnskap om dette gjør deg i stand til å velge riktig slokkemetode.',
    subpoints: [
      { label: 'Oksygen', text: 'Tilgjengelig luft er nødvendig for forbrenning. Fjern oksygen → brann slukker (kveling)' },
      { label: 'Varme', text: 'Tenntemperatur må nås og opprettholdes. Fjern varme → brann slukner (avkjøling)' },
      { label: 'Brennbart materiale', text: 'Papir, tekstil, olje, gass. Fjern brennstoffet → brann slukner' },
      { label: 'Praktisk konsekvens', text: 'Brannteppe kveler. Vann avkjøler. CO2-slukker fjerner oksygen. Skumslukker kveler og avkjøler' },
    ],
    practical: 'Husk: Hvert slokkemiddel angriper en side av trekanten. Når du velger slokkemiddel, tenk: hvilken side kan jeg fjerne?',
    exercises: [
      {
        id: 'bv2-1',
        icon: '🔺',
        title: 'Branntrekanten',
        question: 'Et stearinlys slukkes ved å blåse på det. Hvilken side av branntrekanten angripes?',
        choices: [
          { id: 'a', label: 'Brennbart materiale', isCorrect: false, feedback: 'Stearinet er fortsatt der etter blåsing. Materialet er ikke fjernet.' },
          { id: 'b', label: 'Varme — blåsingen avkjøler flammen under tenntemperatur', isCorrect: true, feedback: 'Riktig! Blåsing avkjøler stearin-gassen under tenntemperaturen.' },
          { id: 'c', label: 'Oksygen — blåsingen tilfører oksygen og slukker dermed brannen', isCorrect: false, feedback: 'Blåsing tilfører faktisk oksygen, men virker ved avkjøling på en liten flamme.' },
          { id: 'd', label: 'Ingen side — det er bare flaks', isCorrect: false, feedback: 'Det er konsekvent fysikk — avkjøling under tenntemperatur.' },
        ],
        espenTip: 'Branntrekanten er grunnlaget for alle brannslukningsmetoder. Lær den og du forstår logikken bak alle slokkere.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📢',
    title: 'Varsle – Redde – Slokke',
    quote: '"Rekkefølgen redder liv. Slokke er siste prioritet — ikke første."',
    content: 'Handlingsregelen "Varsle – Redde – Slokke" er universell i norsk brannvern og gjelder i alle situasjoner. Rekkefølgen er ikke tilfeldig — den er nøye gjennomtenkt ut fra hva som redder flest liv.',
    subpoints: [
      { label: 'VARSLE', text: 'Utløs brannalarmen og/eller ring 110 umiddelbart. Varsle kolleger og kunder' },
      { label: 'REDDE', text: 'Hjelp folk ut av bygget. Prioriter de nærmeste og de mest sårbare (barn, eldre, funksjonshemmede)' },
      { label: 'SLOKKE', text: 'Kun hvis brannen er liten, du har riktig slokkemiddel, og ruten til rømningsveien er klar' },
      { label: 'Viktig', text: 'Lukk dører bak deg under evakuering — dører holder røyk og flammer tilbake og gir minutter ekstra' },
    ],
    practical: 'Huskeregel: VRS — Varsle, Redde, Slokke. Lik rekkefølge som førstehjelp: varsle 113 alltid først. Aldri start med slokking uten at varsling og redding er sikret.',
    exercises: [
      {
        id: 'bv3-1',
        icon: '📢',
        title: 'Riktig prioritering',
        question: 'Det brenner i et lagerrom på jobben. Du oppdager brannen. Hva gjør du først?',
        choices: [
          { id: 'a', label: 'Henter brannslukker og prøver å slokke', isCorrect: false, feedback: 'Slokking er siste prioritet. Varsling og redning av personer må skje først.' },
          { id: 'b', label: 'Løper ut og venter på brannvesenet', isCorrect: false, feedback: 'Du må varsle kolleger og bistå evakuering — ikke bare redde deg selv.' },
          { id: 'c', label: 'Utløser brannalarmen, varsler kolleger, hjelper alle ut', isCorrect: true, feedback: 'Riktig! Varsle → Redde, deretter eventuelt Slokke om det er trygt.' },
          { id: 'd', label: 'Ringer sjefen for å spørre hva du skal gjøre', isCorrect: false, feedback: 'Ring 110 og utløs alarmen — ikke ring sjefen. Sekunder teller.' },
        ],
        espenTip: 'VRS-rekkefølgen er identisk for brann og medisinsk nød: Varsle alltid først. Hjelp alltid andre. Slokke/behandle til slutt.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🧯',
    title: 'Slokkemidler — riktig verktøy for riktig brann',
    quote: '"Feil slokkemiddel kan forvandle en liten brann til en katastrofe."',
    content: 'Det finnes fire vanlige typer slokkemiddel, og de er ikke utskiftbare. Å velge feil kan føre til elektrisk støt, eksplosiv damp eller spredning av brennende materiale. Kunnskap om dette er livsviktig i en servicevirksomhet.',
    subpoints: [
      { label: 'Pulverslukker', text: 'Allsidig. Brukes mot papir, treverk, bensin og elektrisk brann (klasse A, B, C, E)' },
      { label: 'Skumslukker', text: 'Mot væskebrann og papirbrann. ALDRI mot elektrisk — skum leder strøm' },
      { label: 'CO2-slukker', text: 'Beste mot elektrisk utstyr og elektronikk. Kveler brannen uten å skade utstyr' },
      { label: 'Vann', text: 'Mot papir og treverk. ALDRI mot olje (eksploderer) eller elektrisk (strømgjennomgang)' },
    ],
    practical: 'Husketips: Elektrisk brann → CO2 (ingen skade på utstyr). Olje/kjøkken → pulver eller brannteppe. Vann er ALDRI riktig på kjøkkenet.',
    exercises: [
      {
        id: 'bv4-1',
        icon: '🧯',
        title: 'Riktig slokkemiddel',
        question: 'Det tar fyr i et sikringsskap med elektrisk utstyr. Hvilket slokkemiddel bruker du?',
        choices: [
          { id: 'a', label: 'Vann — kjøler ned utstyret effektivt', isCorrect: false, feedback: 'Vann leder strøm og gir elektrisk støt. Livsfarlig mot elektrisk brann!' },
          { id: 'b', label: 'Skum — dekker brannen og kveler den', isCorrect: false, feedback: 'Skum leder strøm. Aldri bruk skumslukker på elektrisk utstyr.' },
          { id: 'c', label: 'CO2 — kveler brannen uten å lede strøm', isCorrect: true, feedback: 'Riktig! CO2 er det beste valget mot elektrisk brann — ingen ledningsevne og skader ikke utstyret.' },
          { id: 'd', label: 'Brannteppe — legg over sikringsskapet', isCorrect: false, feedback: 'Brannteppe fungerer mot olje og koketopp, ikke mot et sikringsskap.' },
        ],
        espenTip: 'Sjekk slokkeren: CO2 = grønt eller svart hode. Pulver = blått. Skum = kremgult. Finn disse på arbeidsplassen din.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🚪',
    title: 'Rømningsveier og evakuering',
    quote: '"En rømningsvei som er blokkert, er verre enn ingen rømningsvei — den gir falsk trygghet."',
    content: 'Rømningsveier er den viktigste livreddende infrastrukturen i et bygg. Alle ansatte må kjenne rutene, og ingen ting skal noensinne blokkere en rømningsvei. En evakueringsøvelse er ikke bare en lovpålagt formalitet — den er en livreddende rutine.',
    subpoints: [
      { label: 'Rømningsvei', text: 'Forhåndsdefinert rute fra alle rom til samlingsplass utenfor bygget. Må alltid være fri og merket' },
      { label: 'Nødutgang', text: 'Dør med grønt nødskilt. Må åpne innenfra uten nøkkel. Aldri blokkert' },
      { label: 'Samlingsplass', text: 'Fast punkt utenfor bygget hvor alle møter. Gjør det mulig å telle hvem som er ute' },
      { label: 'Evakueringsøvelse', text: 'Gjennomføres minimum én gang i året. Evalueres etterpå for å lære av svakheter' },
    ],
    practical: 'Oppgave: Gå gjennom din arbeidsplass/skole og finn alle rømningsveier. Er alle fri? Vet du hvor samlingsplassen er? Fins det noen paller, kasser eller møbler som blokkerer?',
    exercises: [
      {
        id: 'bv5-1',
        icon: '🚪',
        title: 'Rømningsveier',
        question: 'En ansatt oppdager at en vareleveranse blokkerer nødutgangen ved lagerrommet. Hva gjør hun?',
        choices: [
          { id: 'a', label: 'Rapporterer det til sjefen neste dag på morgenmøtet', isCorrect: false, feedback: 'Blokkert nødutgang er et akutt HMS-problem som må utbedres umiddelbart, ikke vente til neste dag.' },
          { id: 'b', label: 'Ignorerer det — lagerrom brukes sjelden', isCorrect: false, feedback: 'Brann kan starte akkurat i lagerrommet. Nødutganger må alltid være fri.' },
          { id: 'c', label: 'Fjerner hindringen umiddelbart og melder avvik', isCorrect: true, feedback: 'Riktig! Akutt utbedring + avviksmelding for å forebygge gjentakelse.' },
          { id: 'd', label: 'Setter opp et skilt som sier "nødutgang — hold fri"', isCorrect: false, feedback: 'Et skilt løser ikke problemet. Hindringen må fjernes.' },
        ],
        espenTip: 'Blokkert nødutgang = brudd på brannvernforskriften. Du kan melde avvik anonymt via Arbeidstilsynet om leder ikke handler.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '👕',
    title: 'Cubus-eksemplet — ansvar i butikkhverdagen',
    quote: '"Brannvern er ikke brannvesenets jobb — det er butikksjefens."',
    content: 'I en Cubus-butikk har butikksjefen det fulle ansvaret for at ingen paller, stativer eller kasser blokkerer nødutgangene. Dette gjelder selv midt i en hektisk varemottak-periode. Eksemplet illustrerer at brannvern ikke er "noe som skjer en gang i året under øvelsen" — det er en daglig operativ rutine.',
    subpoints: [
      { label: 'Varemottak', text: 'En klassisk risikosituasjon. Paller settes midlertidig foran nødutgang "bare i fem minutter"' },
      { label: 'Brudd på forskriften', text: 'Blokkert nødutgang er brudd på Forskrift om brannforebygging — kan medføre bøter og stengning' },
      { label: 'Daglig sjekkliste', text: 'Gode butikker har brannvern som punkt på den daglige åpnings- eller stengningssjekklisten' },
      { label: 'Ansattes medvirkning', text: 'Alle ansatte plikter å melde fra om blokkerte nødutganger — ikke bare leder' },
    ],
    practical: 'Diskuter: Hvorfor er "fem minutter" foran nødutgangen et reelt problem? Hva er sannsynligheten for brann akkurat i de fem minuttene? Lav — men konsekvensen ved brann er katastrofal.',
    exercises: [
      {
        id: 'bv6-1',
        icon: '👕',
        title: 'Ansvar i butikkhverdagen',
        question: 'En lærling setter en varepall foran nødutgangen under varemottak. Hvem er ansvarlig om det oppstår brann?',
        choices: [
          { id: 'a', label: 'Bare lærlingen som satte pallen dit', isCorrect: false, feedback: 'Lærlingen har et ansvar, men butikksjefen bærer det juridiske ansvaret for brannvernsystemet.' },
          { id: 'b', label: 'Butikksjefen, som ikke hadde etablert klare rutiner for varemottak', isCorrect: true, feedback: 'Riktig! Daglig leder er juridisk ansvarlig. Gode rutiner er lederens ansvar.' },
          { id: 'c', label: 'Leverandøren som leverte varene', isCorrect: false, feedback: 'Leverandøren er ikke ansvarlig for interne HMS-rutiner i butikken.' },
          { id: 'd', label: 'Ingen — det er force majeure', isCorrect: false, feedback: 'Blokkert nødutgang er et brudd på brannvernforskriften og medfører ansvar.' },
        ],
        espenTip: 'HMS-ansvar følger lederhierarkiet. Daglig leder → avdelingsleder → den som utfører oppgaven. Alle har ansvar, men det stiger oppover.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🍳',
    title: 'Restaurantkjøkken-eksemplet — olje og feil valg',
    quote: '"Vann på brennende olje er ikke slokking — det er en eksplosjon."',
    content: 'På et restaurantkjøkken tar olje fyr i en frityrgryte. Instinktet er å kaste vann — men det er en av de farligste feilene man kan gjøre. Vann fordamper eksplosivt og slynger brennende olje utover et stort område. Dette eksemplet viser at feil slokkemiddel er verre enn ingen slokking.',
    subpoints: [
      { label: 'Hva skjer med vann på olje?', text: 'Vannets kokepunkt (100 °C) er langt lavere enn oljebrannens temperatur (360 °C+). Vannet fordamper umiddelbart og ekspanderer 1700 ganger i volum — brennende oljedamp sprutes utover' },
      { label: 'Riktig tiltak', text: 'Brannteppe lagt forsiktig over frityrgryta (kveling) — eller AF-slukker (spesialslukker for fettvarer)' },
      { label: 'Aldri flytte gryta', text: 'Brennende olje i bevegelse = brannspredning. La den stå og kvelé brannen' },
      { label: 'Slå av varmen', text: 'Første tiltak: Slå av kokeplate og varme. Fjern varme-siden av trekanten' },
    ],
    practical: 'Tenk igjennom: Hva er slokkemidlene på kjøkkenet du jobber på? Er det brannteppe? Pulverslukker? Vet du hvordan du bruker dem? Hvem er opplært?',
    exercises: [
      {
        id: 'bv7-1',
        icon: '🍳',
        title: 'Kjøkkenbrann',
        question: 'En frityrgryte tar fyr. Du er alene på kjøkkenet. Hva gjør du?',
        choices: [
          { id: 'a', label: 'Kaster en kjele med vann over frityrgryten', isCorrect: false, feedback: 'Ekstremt farlig! Vann fordamper eksplosivt og sprer brennende olje. Aldri vann på oljebann!' },
          { id: 'b', label: 'Slår av varmen og legger brannteppet forsiktig over gryten', isCorrect: true, feedback: 'Riktig! Slå av varmen (fjern varme), legg teppe over (kvel). Forlat rommet og varsle.' },
          { id: 'c', label: 'Tar gryten og løper ut med den', isCorrect: false, feedback: 'Aldri flytt brennende olje. Risikoen for å søle er enorm.' },
          { id: 'd', label: 'Bruker CO2-slokkeren', isCorrect: false, feedback: 'CO2 er for elektrisk brann. AF-slukker eller brannteppe er riktig for oljebann.' },
        ],
        espenTip: 'Kjøkkenbrann-rekkefølge: 1) Slå av varmen, 2) Legg brannteppe over FORSIKTIG (ikke slenge), 3) Varsle og evakuer.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🚫',
    title: 'Vanlige misforståelser — slokkere er ikke like',
    quote: '"En brannslukker er ikke et universalverktøy — det er et spesialistverktøy."',
    content: 'Den vanligste misforståelsen om brannvern er at alle brannslokkere er identiske og kan brukes på alle branntypeer. Den nest vanligste er at ansatte prioriterer å redde verdier (kasseapparater, laptoper) før de selv evakuerer. Begge feil kan koste liv.',
    subpoints: [
      { label: 'Myte 1', text: '"Alle brannslokkere er like." Feil — CO2, pulver, skum og vann er svært forskjellige og delvis farlige feil valgt' },
      { label: 'Myte 2', text: '"Jeg redder kasseapparatet først." Feil — menneskeliv alltid foran ting. Forsikringen dekker utstyret' },
      { label: 'Myte 3', text: '"Nødutgangen kan være låst for sikkerhetens skyld." Feil — nødutganger er alltid ulåst fra innsiden' },
      { label: 'Myte 4', text: '"Røyk er bare et problem for lungene." Feil — 80 % av branndødsfall skyldes røykforgiftning, ikke flammer' },
    ],
    practical: 'Sjekk på din arbeidsplass: Hvilke typer brannslokkere finnes? Er det tydelig merket hva de brukes mot? Er dette forklart i opplæringen?',
    exercises: [
      {
        id: 'bv8-1',
        icon: '🚫',
        title: 'Misforståelse om prioritering',
        question: 'En ansatt vil redde laptopen fra kontoret under en brannalarm. Hva er riktig respons?',
        choices: [
          { id: 'a', label: 'Det er greit hvis det går raskt', isCorrect: false, feedback: 'Forsinkelse i evakuering er livsfarlig. Røyk kan fylle rommet på sekunder.' },
          { id: 'b', label: 'Greit bare laptopen er viktig for virksomheten', isCorrect: false, feedback: 'Ingen ting er verdt å risikere livet for. Forsikringen dekker utstyret.' },
          { id: 'c', label: 'Aldri forsinkelse — forlat umiddelbart ved brannalarm', isCorrect: true, feedback: 'Riktig! Evakuer umiddelbart. Ingen materielle verdier er verdt et liv.' },
          { id: 'd', label: 'Det avhenger av om brannen er nær eller langt unna', isCorrect: false, feedback: 'Brann sprer seg uforutsigbart. Aldri forsink evakuering for å redde ting.' },
        ],
        espenTip: 'Brannøvelsens viktigste lærdom: Mennesker ut ALLTID. Ting kan erstattes. Livet kan ikke.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Brann- og eksplosjonsvernloven',
    quote: '"Brannvern er ikke et valg — det er en lovpålagt plikt for alle virksomheter."',
    content: 'Det norske regelverket for brannvern er klart og strengt. Brann- og eksplosjonsvernloven og Forskrift om brannforebygging gir konkrete krav til alle virksomheter. Tilsynsmyndigheten er det lokale brannvesenet, som kan gjennomføre uanmeldte tilsyn.',
    subpoints: [
      { label: 'Brann- og eksplosjonsvernloven', text: 'Fastslår plikten til brannforebygging, rømningsveier og opplæring for alle virksomheter' },
      { label: 'Forskrift om brannforebygging', text: 'Konkretiserer kravene: slokkemidler, øvelser, rømningsveier, brannalarmer' },
      { label: 'Tilsyn', text: 'Lokalt brannvesen kan gjennomføre uanmeldte tilsyn og ilegge pålegg og bøter' },
      { label: 'Sanksjoner', text: 'Brudd kan medføre bøter, midlertidig stengning eller straffansvar for leder' },
    ],
    practical: 'Sjekk: Er din virksomhet registrert i brannvesenets tilsynssystem? Er siste brannøvelse dokumentert? Er brannslokkere sjekket siste 12 måneder?',
    exercises: [
      {
        id: 'bv9-1',
        icon: '⚖️',
        title: 'Lovverket',
        question: 'Hva kan konsekvensen være om brannvesenet finner blokkerte rømningsveier under tilsyn?',
        choices: [
          { id: 'a', label: 'En advarsel som ikke har juridisk kraft', isCorrect: false, feedback: 'Pålegg fra brannvesenet er juridisk bindende og må utbedres innen en frist.' },
          { id: 'b', label: 'Bøter, pålegg om utbedring, og i alvorlige tilfeller midlertidig stengning', isCorrect: true, feedback: 'Riktig! Brannvesenet har myndighet til alle disse reaksjonene.' },
          { id: 'c', label: 'Ingenting — brannvern er frivillig', isCorrect: false, feedback: 'Feil. Brannvern er lovpålagt og brudd er straffbart.' },
          { id: 'd', label: 'Kun et krav om ny brannøvelse', isCorrect: false, feedback: 'Blokkerte rømningsveier er alvorlig og kan medføre mer enn bare krav om øvelse.' },
        ],
        espenTip: 'Brannvernforskriften er spesifikk og streng. Les gjerne en kortversjon på DSB.no for å forstå hva din arbeidsplass er forpliktet til.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌟',
    title: 'Oppsummering — brannvern som daglig rutine',
    quote: '"Brannvern er ikke unntakstilstand — det er hverdagssikkerhet."',
    content: 'Brannkunnskap er en av de mest praktisk anvendbare ferdighetene du lærer i fagopplæringen. Den kombinerer teori (branntrekanten, slokkemidler) med konkrete handlingsregler (VRS, evakuering) og juridisk forpliktelse (Brann- og eksplosjonsvernloven). Gode servicearbeidere har dette innarbeidet som en naturlig del av arbeidshverdagen.',
    subpoints: [
      { label: 'Branntrekanten', text: 'Oksygen + Varme + Brennstoff. Fjern én → brann slukner' },
      { label: 'Varsle – Redde – Slokke', text: 'Alltid i denne rekkefølgen. Aldri slokke uten at varsling er gjort' },
      { label: 'Slokkemidler', text: 'CO2 for elektrisk, pulver allsidig, skum for væske, vann for treverk/papir. Aldri vann på olje' },
      { label: 'Rømningsveier', text: 'Alltid frie. Aldri blokkert. Alle ansatte kjenner rutene' },
      { label: 'Ansvar', text: 'Daglig leder har juridisk ansvar. Alle ansatte har medvirkningsplikt' },
    ],
    practical: 'Neste steg: Gjennomfør en mental brannøvelse. Tenk: "Brannalarm går NÅ." Hva gjør du? Hvilken vei går du? Hvem teller folk ut? Er du klar?',
    exercises: [
      {
        id: 'bv10-1',
        icon: '🌟',
        title: 'Oppsummering',
        question: 'Hvilke to faktorer er vanligste årsak til branndødsfall ifølge brannteorien?',
        choices: [
          { id: 'a', label: 'Flammer og varme', isCorrect: false, feedback: '80 % av branndødsfall skyldes røykforgiftning, ikke direkte kontakt med flammer.' },
          { id: 'b', label: 'Røykforgiftning og for langsom evakuering', isCorrect: true, feedback: 'Riktig! Røyk er den største drapsmannen. Rask evakuering er det viktigste tiltaket.' },
          { id: 'c', label: 'Manglende slokkere og feil plasserte alarmer', isCorrect: false, feedback: 'Viktig, men røykforgiftning og sen evakuering er de vanligste direkte dødsfaktorene.' },
          { id: 'd', label: 'Elektrisk brann og plastmaterialer', isCorrect: false, feedback: 'Disse er vanlige årsaker til at brann oppstår, men ikke de vanligste dødsfaktorene.' },
        ],
        espenTip: 'Husk: Røyk dreper raskere enn flammer. Rask evakuering = det viktigste du kan gjøre. Resten er sekundært.',
      },
    ],
  },
]

export default function BrannvernModule() {
  return (
    <DrawerModule
      moduleCode="HMS-VG2-5"
      moduleTitle="Brannvern og brannøving"
      moduleIcon="🔥"
      storageKey="learning-vg2-brannvern"
      completeRoute="/learning/vg2/hms/brannvern/complete"
      phases={phases}
      intro="Brannteori og planlegging, gjennomføring og evaluering av brannøving."
      vissteduAt="Rundt 80 % av branndødsfall i Norge skyldes røykforgiftning, ikke selve flammene. Det er derfor rask evakuering — ikke slokking — er det viktigste tiltaket i brannvern."
      espenSier="Røyk dreper raskere enn flammer. Rask evakuering er det viktigste du kan gjøre — resten er sekundært. En god brannøving lærer deg å handle på instinkt før hodet rekker å analysere."
      presentationLink={{ route: '/learning/presentations/brannvern', description: 'Brannvern — en visuell presentasjon' }}
    />
  )
}
