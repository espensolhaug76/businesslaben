import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '✈️',
    title: 'Hva er et reiselivsprodukt?',
    quote: 'Et reiselivsprodukt kan ikke legges på lager — det leves, ikke eies.',
    content: 'Reiselivsproduktet skiller seg fra fysiske produkter langs fire dimensjoner kalt IHIP: Immaterielt (du kan ikke kjenne på det), Inseparabilitet (produksjon og konsum skjer samtidig), Perishability (et tomt hotellrom er tapt inntekt) og Variabilitet (ingen to opplevelser er identiske).',
    subpoints: [
      'IMMATERIELT: Kunden kjøper et løfte om en opplevelse — tillit og omdømme er ekstra viktig',
      'FORGJENGELIGHET: Et ledig sete på et fly som letter er mistet inntekt for alltid',
      'VARIABILITET: Standardisering gjennom opplæring er bransjens viktigste kvalitetssikringsverktøy',
    ],
    practical: 'Evaluer et reiselivsprodukt: hvilken av de fire IHIP-utfordringene er størst, og håndterer bedriften den godt?',
    exercises: [
      {
        id: 'rl-1-1',
        question: 'Hva er IHIP i reiselivskontekst?',
        choices: [
          { id: 'a', text: 'En type hotellbooking' },
          { id: 'b', text: 'Fire særtrekk: Immaterielt, Inseparabilitet, Perishability, Variabilitet' },
          { id: 'c', text: 'En pakkereise-modell' },
          { id: 'd', text: 'En bærekraftsstandard' },
        ],
        correctId: 'b',
        explanation: 'IHIP beskriver de fire grunnleggende særtrekkene som skiller tjenester (inkl. reiseliv) fra fysiske produkter.',
      },
      {
        id: 'rl-1-2',
        question: 'Et hotellrom er tomt denne natten. Hva er konsekvensen?',
        choices: [
          { id: 'a', text: 'Rommet kan selges billigere neste natt for å kompensere' },
          { id: 'b', text: 'Inntekten er tapt for alltid — dette er Perishability' },
          { id: 'c', text: 'Ingen konsekvens — tomme rom er normalt' },
          { id: 'd', text: 'Rommet kan lagres til neste sesong' },
        ],
        correctId: 'b',
        explanation: 'Perishability betyr at usolgte kapasitetsenheter (rommet, setet, turen) forsvinner for alltid — de kan ikke lagres.',
      },
      {
        id: 'rl-1-3',
        question: 'Hva betyr "inseparabilitet" i reiselivssammenheng?',
        choices: [
          { id: 'a', text: 'At produktet ikke kan deles opp' },
          { id: 'b', text: 'Produksjon og konsum skjer samtidig — guiden og gjesten er begge til stede' },
          { id: 'c', text: 'At reiselivsprodukter ikke kan separeres fra prisen' },
          { id: 'd', text: 'At transport og overnatting alltid pakkes sammen' },
        ],
        correctId: 'b',
        explanation: 'Inseparabilitet betyr at tjenesten produseres og konsumeres samtidig — det er ingen mulighet til å kontrollere produktet før kunden mottar det.',
      },
      {
        id: 'rl-1-4',
        question: 'Variabilitet er en utfordring i reiseliv. Hva er det viktigste tiltaket?',
        choices: [
          { id: 'a', text: 'Å bruke roboter i stedet for mennesker' },
          { id: 'b', text: 'Standardisering gjennom opplæring og prosedyrer' },
          { id: 'c', text: 'Å redusere antall ansatte' },
          { id: 'd', text: 'Å la kundene styre sine egne opplevelser' },
        ],
        correctId: 'b',
        explanation: 'Siden mennesker er involvert, vil ingen to opplevelser være helt identiske. Systematisk opplæring og prosedyrer er det viktigste verktøyet for å redusere variabilitet.',
      },
      {
        id: 'rl-1-5',
        question: 'Flåmsbanen forvandlet en lokal togtur til et globalt reiselivsprodukt. Hva er den viktigste årsaken?',
        choices: [
          { id: 'a', text: 'Lavere priser enn konkurrentene' },
          { id: 'b', text: 'De pakket tog, landskap, kulturhistorie og fotomuligheter til ett helhetlig produkt' },
          { id: 'c', text: 'Norges lengste togtur' },
          { id: 'd', text: 'Gratis WiFi om bord' },
        ],
        correctId: 'b',
        explanation: 'Flåmsbanen lyktes fordi de forstod at kunden ikke kjøper en togbillett — de kjøper en komposisjon av opplevelser.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🌟',
    title: 'Opplevelsesøkonomi (Pine & Gilmore)',
    quote: 'Arbeid er en scene, og bedriften iscenesetter opplevelser — ikke bare selger tjenester.',
    content: 'Pine og Gilmore identifiserte fire opplevelsesriker alle sterke reiselivsprodukter bør kombinere: Underholdning (passiv), Utdanning (aktiv kunnskap), Estetikk (passive omgivelser) og Eskapisme (aktiv deltakelse i annet miljø).',
    subpoints: [
      'UNDERHOLDNING: Passiv absorpsjon — kunden ser og lytter',
      'ESKAPISME: Aktiv deltakelse i et annet univers — rafting, klatring, rollespill',
      'SWEET SPOT: Produkter som kombinerer alle fire riker oppnår høyest betalingsvilje',
    ],
    practical: 'Plasser et reiselivsprodukt du kjenner i opplevelsesrikene. Hvilke riker er svake, og hva ville det koste å styrke dem?',
    glossaryTerm: 'Opplevelsesøkonomi',
    exercises: [
      {
        id: 'rl-2-1',
        question: 'Hvilke fire opplevelsesriker identifiserte Pine og Gilmore?',
        choices: [
          { id: 'a', text: 'Transport, overnatting, mat og aktiviteter' },
          { id: 'b', text: 'Underholdning, Utdanning, Estetikk og Eskapisme' },
          { id: 'c', text: 'Natur, Kultur, Gastronomi og Sport' },
          { id: 'd', text: 'Luksus, Budsjett, Eventyr og Familie' },
        ],
        correctId: 'b',
        explanation: 'Pine og Gilmores «The Experience Economy» definerer fire opplevelsesriker som sterke reiselivsprodukter bør kombinere.',
      },
      {
        id: 'rl-2-2',
        question: 'Rafting og klatring er eksempler på hvilket opplevelsesrike?',
        choices: [
          { id: 'a', text: 'Underholdning' },
          { id: 'b', text: 'Utdanning' },
          { id: 'c', text: 'Eskapisme' },
          { id: 'd', text: 'Estetikk' },
        ],
        correctId: 'c',
        explanation: 'Eskapisme er aktiv deltakelse i et annet univers — rafting og klatring involverer fysisk og mental deltakelse i et ikke-hverdagslig miljø.',
      },
      {
        id: 'rl-2-3',
        question: 'Nærøyfjordens UNESCO-status tredoblet prisene for fjordopplevelser over ti år. Hva er årsaken?',
        choices: [
          { id: 'a', text: 'Høyere driftskostnader' },
          { id: 'b', text: 'Statusen ga produktet ny dimensjon av autentisitet og knapphet som økte betalingsviljen' },
          { id: 'c', text: 'Norges turistprisindeks steg' },
          { id: 'd', text: 'Færre konkurrenter i markedet' },
        ],
        correctId: 'b',
        explanation: 'UNESCO-status signaliserer eksklusivitet og autentisitet, som øker betalingsviljen dramatisk — folk betaler mer for noe unikt og anerkjent.',
      },
      {
        id: 'rl-2-4',
        question: 'Hva er "sweet spot" i Pine og Gilmores modell?',
        choices: [
          { id: 'a', text: 'Den laveste prisen i markedet' },
          { id: 'b', text: 'Produkter som kombinerer alle fire opplevelsesriker og oppnår høyest betalingsvilje' },
          { id: 'c', text: 'Den best beliggende turistattraksjonen' },
          { id: 'd', text: 'Høysesong for reiseliv' },
        ],
        correctId: 'b',
        explanation: 'Sweet spot er der alle fire opplevelsesriker kombineres — produkter som treffer alle riker (som Flåmsbanen) oppnår høyest betalingsvilje.',
      },
      {
        id: 'rl-2-5',
        question: 'Hurtigruten kombinerer underholdning, utdanning og eskapisme. Hva gjør dette til et sterkt produkt?',
        choices: [
          { id: 'a', text: 'Det er det billigste alternativet langs norgeskysten' },
          { id: 'b', text: 'Kombinasjonen av opplevelsesriker gir en rik, helhetlig opplevelse som berettiger premium-prising' },
          { id: 'c', text: 'Det er det raskeste transportalternativet' },
          { id: 'd', text: 'Det er eksklusivt for norske borgere' },
        ],
        correctId: 'b',
        explanation: 'Hurtigruten er ikke bare transport — det er en hel fortelling om norsk natur, kultur og hverdagsliv som kombinerer flere opplevelsesriker.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📦',
    title: 'Pakkereiser og komponentstruktur',
    quote: 'Pakkereisen er mer enn summen av delene — det er bekvemmelighet solgt som produkt.',
    content: 'En klassisk pakkereise består av transport, overnatting, aktiviteter, guiding og måltider til én pris. Bundling skaper bekvemmelighet og marginforbedring for arrangøren. Internett forandret alt med dynamiske pakker.',
    subpoints: [
      'KOMPONENTSTRUKTUR: Transport + overnatting + aktiviteter + guiding + måltider',
      'BUNDLINGSMARGIN: Arrangøren tjener på å bære risikoen og koordinere det kunden ikke orker',
      'DYNAMISKE PAKKER: OTA-er som Expedia tilbyr sanntidsprising og utfordrer tradisjonelle arrangører',
    ],
    practical: 'Sammenlign prisen på en pakkereise til Kreta fra Apollo med å bestille alle komponentene separat. Hva er prisforskjellen?',
    exercises: [
      {
        id: 'rl-3-1',
        question: 'Hva er de fem standardkomponentene i en klassisk pakkereise?',
        choices: [
          { id: 'a', text: 'Fly, buss, tog, båt og hotell' },
          { id: 'b', text: 'Transport, overnatting, aktiviteter, guiding og måltider' },
          { id: 'c', text: 'Visumhjelp, forsikring, valuta, transport og mat' },
          { id: 'd', text: 'Fly, hotell, guidebook, kart og transfer' },
        ],
        correctId: 'b',
        explanation: 'De fem standardkomponentene i en pakkereise er transport, overnatting, aktiviteter, guiding og måltider — alt pakket til én pris.',
      },
      {
        id: 'rl-3-2',
        question: 'Hva er "bundling" i reiselivssammenheng?',
        choices: [
          { id: 'a', text: 'Å transportere bagasje' },
          { id: 'b', text: 'Å pakke flere komponenter til ett produkt til én pris' },
          { id: 'c', text: 'En type grupperabatt' },
          { id: 'd', text: 'Å dele opp betalingen' },
        ],
        correctId: 'b',
        explanation: 'Bundling er å kombinere flere tjenester (fly + hotell + aktiviteter) til ett produkt til én pris — skaper bekvemmelighet og marginforbedring.',
      },
      {
        id: 'rl-3-3',
        question: 'Hva er den viktigste verdiskapingen til tradisjonelle pakkereisearrangører som Apollo?',
        choices: [
          { id: 'a', text: 'De er alltid billigst' },
          { id: 'b', text: 'De bærer risikoen for at alle delene passer sammen og kunden betaler for trygghet' },
          { id: 'c', text: 'De tilbyr eksklusiv transport' },
          { id: 'd', text: 'De har egne hoteller' },
        ],
        correctId: 'b',
        explanation: 'Apollo tar risikoen for at fly, hotell og transfer er koordinert. Kunden betaler for denne tryggheten og bekvemmeligheten — ikke nødvendigvis billigste pris.',
      },
      {
        id: 'rl-3-4',
        question: 'Hva er en OTA (Online Travel Agency)?',
        choices: [
          { id: 'a', text: 'En offline reisebyrå' },
          { id: 'b', text: 'Digitale plattformer som Expedia og Booking.com der kunder setter sammen egne pakker' },
          { id: 'c', text: 'Et norsk reiseselskap' },
          { id: 'd', text: 'En type flyselskap' },
        ],
        correctId: 'b',
        explanation: 'OTA (Online Travel Agency) er digitale plattformer der kunder kan søke, sammenligne og booke reiser fra ulike leverandører — dynamiske pakker i sanntid.',
      },
      {
        id: 'rl-3-5',
        question: 'Dynamiske pakker fra OTA-er er en utfordring for tradisjonelle arrangører. Hvorfor?',
        choices: [
          { id: 'a', text: 'OTA-er er alltid billigere på alt' },
          { id: 'b', text: 'OTA-er tilbyr "selvbetjent bundling" til lavere pris og utfordrer tradisjonelle arrangørers forretningsmodell' },
          { id: 'c', text: 'OTA-er har bedre kvalitet' },
          { id: 'd', text: 'OTA-er er ikke en reell konkurrent' },
        ],
        correctId: 'b',
        explanation: 'OTA-er gjør det enkelt for kunder å sette sammen egne pakker, noe som utfordrer den tradisjonelle verdiskapingen til pakkereisearrangørene.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💰',
    title: 'Yield management og dynamisk prising',
    quote: 'Riktig pris til riktig person til riktig tidspunkt — det er yield management.',
    content: 'Yield management er en prisstrategi som maksimerer inntekten fra fast kapasitet ved å variere prisen etter etterspørsel. Bergen-hoteller er 4× dyrere i juli enn i januar — dette er bevisst strategi, ikke tilfeldighet.',
    subpoints: [
      'RevPAR: Revenue Per Available Room — bransjens nøkkeltall for hoteller',
      'BESTILLINGSVINDU: Tidlig bestilling belønnes med lavere pris',
      'OVERBOOKING: Statistisk styrt basert på historiske no-show-rater — lovlig når alternativ tilbys',
    ],
    practical: 'Søk på samme hotellrom i Bergen for én uke i februar og én uke i juli. Beregn prisforskjellen og diskuter hva som driver den.',
    glossaryTerm: 'Yield management',
    exercises: [
      {
        id: 'rl-4-1',
        question: 'Hva er yield management?',
        choices: [
          { id: 'a', text: 'En type budsjetteringsmetode' },
          { id: 'b', text: 'En prisstrategi som varierer prisen etter etterspørsel og tid til levering for å maksimere inntekten' },
          { id: 'c', text: 'En metode for å redusere kostnader' },
          { id: 'd', text: 'En type kundelojalitetsprogram' },
        ],
        correctId: 'b',
        explanation: 'Yield management er strategisk prissetting som varierer pris etter etterspørsel, sesong og bestillingsvindu for å maksimere inntekten fra fast kapasitet.',
      },
      {
        id: 'rl-4-2',
        question: 'Hva er RevPAR?',
        choices: [
          { id: 'a', text: 'Gjennomsnittsprisen per rom' },
          { id: 'b', text: 'Revenue Per Available Room — total rominntekt delt på antall tilgjengelige rom' },
          { id: 'c', text: 'Antall gjester per natt' },
          { id: 'd', text: 'Hotellstjerners vurderingssystem' },
        ],
        correctId: 'b',
        explanation: 'RevPAR = Total rominntekt / Antall tilgjengelige rom. Det forteller om hotellet utnytter kapasiteten godt, ikke bare om prisene er høye.',
      },
      {
        id: 'rl-4-3',
        question: 'Et hotellrom koster 800 kr i januar og 3200 kr i juli. Hva er årsaken?',
        choices: [
          { id: 'a', text: 'Hotellet har høyere driftskostnader om sommeren' },
          { id: 'b', text: 'Yield management — algoritmen justerer pris etter etterspørsel og historiske beleggsmønstre' },
          { id: 'c', text: 'Tilfeldig prisøkning' },
          { id: 'd', text: 'Sommeren er kortere enn vinteren' },
        ],
        correctId: 'b',
        explanation: 'Prisvariasjonen er bevisst yield management — høyere etterspørsel om sommeren justeres automatisk av algoritmen til å gi høyere pris.',
      },
      {
        id: 'rl-4-4',
        question: 'Hva er logikken bak at tidlig bestilling gir lavere pris?',
        choices: [
          { id: 'a', text: 'Bedriften sparer administrasjonskostnader' },
          { id: 'b', text: 'Bedriften sikrer inntekt tidlig og reduserer risikoen for ledige plasser' },
          { id: 'c', text: 'Kunden er mer verdifull ved tidlig bestilling' },
          { id: 'd', text: 'Det er en reklamekampanje' },
        ],
        correctId: 'b',
        explanation: 'Tidlig bestilling gir hotellet/flyselskapet sikkerhet for inntekt og reduserer risiko — dette "belønnes" med lavere pris som incentiv.',
      },
      {
        id: 'rl-4-5',
        question: 'Hva er overbooking i hotell- og flyindustrien?',
        choices: [
          { id: 'a', text: 'En feil i bookingsystemet' },
          { id: 'b', text: 'Bevisst strategi basert på statistiske no-show-rater for å unngå tomme rom/seter' },
          { id: 'c', text: 'Ulovlig dobbeltbooking' },
          { id: 'd', text: 'At et hotell tar imot flere bestillinger enn de har rom' },
        ],
        correctId: 'b',
        explanation: 'Overbooking er en bevisst yield management-strategi basert på historisk kunnskap om no-show-rater. Det er lovlig i Norge når alternativ innkvartering tilbys.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🌿',
    title: 'Bærekraftig reiseliv og overtourism',
    quote: 'Turismen som ødelegger det den kom for å se, biter seg selv i halen.',
    content: 'Overtourism oppstår når turiststrømmen overstiger destinasjonens bæreevne. Norge tar grep: Geiranger begrenser cruiseskip, Preikestolen vurderer besøkstaksmeter, og Svanemerket brukes som konkurransefortrinn.',
    subpoints: [
      'BÆREEVNE: Hver destinasjon har fysisk, sosial og psykologisk kapasitetsgrense',
      'SVANEMERKET: Norsk bærekraftssertifisering for reiseliv — brukes aktivt i markedsføringen',
      'KONKURRANSEFORTRINN: Bærekraft går fra CSR-nisje til kjøpskriterium for voksende andel turister',
    ],
    practical: 'Velg en norsk naturattraksjon og lag en enkel bærekraftsvurdering: kapasitetsgrense, tiltak innført, og hva som mangler.',
    exercises: [
      {
        id: 'rl-5-1',
        question: 'Hva er overtourism?',
        choices: [
          { id: 'a', text: 'For mye reklame for en destinasjon' },
          { id: 'b', text: 'Når turiststrømmen overstiger destinasjonens bæreevne sosialt, miljømessig og infrastrukturelt' },
          { id: 'c', text: 'At turister betaler for mye' },
          { id: 'd', text: 'Sesongbaserte variasjoner i turisttrafikk' },
        ],
        correctId: 'b',
        explanation: 'Overtourism oppstår når turiststrømmen overstiger det destinasjonen tåler — da synker opplevelseskvaliteten og lokalmiljøet påvirkes negativt.',
      },
      {
        id: 'rl-5-2',
        question: 'Hva er Svanemerket i norsk reiselivssammenheng?',
        choices: [
          { id: 'a', text: 'En rangering av de beste norske turistattraksjonene' },
          { id: 'b', text: 'En bærekraftssertifisering for hoteller og opplevelsesleverandører' },
          { id: 'c', text: 'En type forsikring for reisende' },
          { id: 'd', text: 'Et statlig reisevåpen' },
        ],
        correctId: 'b',
        explanation: 'Svanemerket er Nordens offisielle miljømerke og brukes av hoteller, campingplasser og opplevelsesoperatører som signal om miljøansvar.',
      },
      {
        id: 'rl-5-3',
        question: 'Geiranger har innført begrensninger på cruiseskip med svovelutslipp. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', text: 'Proteksjonisme mot utenlandsk turisme' },
          { id: 'b', text: 'Konkret tiltak for å beskytte destinasjonens bæreevne og miljøkvalitet' },
          { id: 'c', text: 'Prisdiskriminering' },
          { id: 'd', text: 'Et markedsføringsstunt' },
        ],
        correctId: 'c',
        explanation: 'Begrensninger på forurensende skip er en direkte reaksjon på overtourism og miljøbelastning — for å beskytte den naturkvaliteten som er selve grunnlaget for turistproduktet.',
      },
      {
        id: 'rl-5-4',
        question: 'Hva er den grunnleggende paradoksen med overtourism?',
        choices: [
          { id: 'a', text: 'For mange turister tjener ingen penger' },
          { id: 'b', text: 'Turismen ødelegger de samme naturlige og kulturelle verdiene som attraktor til å starte med' },
          { id: 'c', text: 'Overtourism eksisterer bare i fattige land' },
          { id: 'd', text: 'Det er ingen real problem' },
        ],
        correctId: 'b',
        explanation: 'Paradokset er at turismen som kommer for å oppleve noe unikt og autentisk, kan ødelegge nettopp det — og dermed eliminere grunnlaget for seg selv.',
      },
      {
        id: 'rl-5-5',
        question: 'Bærekraft er i ferd med å bli et kjøpskriterium for turister. Hva betyr dette for norske reiselivsbedrifter?',
        choices: [
          { id: 'a', text: 'Det er bare relevant for store internasjonale kjeder' },
          { id: 'b', text: 'Bærekraftssertifisering og dokumentert miljøansvar kan gi konkurransefortrinn' },
          { id: 'c', text: 'Det øker kostnadene uten å øke inntektene' },
          { id: 'd', text: 'Norske turister bryr seg ikke om bærekraft' },
        ],
        correctId: 'b',
        explanation: 'En voksende andel internasjonale turister prioriterer bærekraftige reisemål og leverandører. Dette gir norske bedrifter med Svanemerket og dokumentert miljøansvar et konkurransefortrinn.',
      },
    ],
  },
]

export default function ReiseligsprodukModule() {
  return (
    <DrawerModule
      moduleCode="IMF-VG2-3"
      moduleTitle="Helhetlige reiselivsprodukter"
      moduleIcon="✈️"
      storageKey="learning-vg2-reiselivsprodukt"
      completeRoute="/learning/vg2/kommunikasjon/reiselivsprodukt/complete"
      phases={phases}
      intro="Reiselivsproduktet er et av de mest komplekse produktene i næringslivet — sammensatt, immaterielt og forgjengelighet. Norge har noen av verdens sterkeste reiselivsprodukter, fra Flåmsbanen til Geirangerfjorden."
      vissteduAt="Norge ble i 2019 kåret til verdens mest bærekraftige reisemål av World Economic Forum. Flåmsbanen er rangert blant verdens beste togreiser."
      espenSier="Et dårlig måltid på siste dag kan ødelegge en ellers perfekt reise, men en uventet solnedgang over Nærøyfjorden kan forvandle en middelmådig tur til noe folk snakker om resten av livet."
      presentationLink={{ route: '/learning/presentations/reiselivsprodukt-vg2', description: 'Reiselivsprodukt — en visuell gjennomgang av destinasjoner og bærekraft' }}
    />
  )
}
