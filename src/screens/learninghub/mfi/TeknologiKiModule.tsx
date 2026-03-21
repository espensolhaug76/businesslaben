import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '💻',
    title: 'Digital teknologi i salg',
    quote: 'Teknologi erstatter ikke den gode selgeren — den frigjør selgeren til å gjøre det teknologi ikke kan.',
    content:
      'Digitalisering har fundamentalt endret måten vi selger på. CRM-systemer (Customer Relationship Management) lar bedrifter samle all kundeinformasjon på ett sted — kjøpshistorikk, preferanser, kontakthistorikk og notater fra selgere. Dette gjør at enhver ansatt kan gi personlig service, ikke bare den som kjenner kunden fra før. Nettbutikker har gjort det mulig å selge 24/7 uten at en selger er tilstede. Betalingsløsninger som Vipps, Stripe og Apple Pay gjør kjøpsprosessen friksjonsfri. Sosiale medier er blitt salgskanaler — Instagram Shopping, TikTok Shop og Facebook Marketplace er eksempler. I Norge handler nær 80% av befolkningen på nett jevnlig, og trenden øker.',
    subpoints: [
      { label: 'CRM-SYSTEM', text: 'Customer Relationship Management — et system for å administrere kunderelasjoner. Eksempler: Salesforce, HubSpot, Lime CRM. Samler data fra alle kontaktpunkter.' },
      { label: 'OMNIKANAL-SALG', text: 'Salg skjer simultant i fysisk butikk, nettbutikk, app og sosiale medier — kunden forventer sømløs opplevelse på tvers av kanalene.' },
      { label: 'KONVERTERINGSRATE', text: 'Andelen besøkende som faktisk kjøper. En nettbutikk med 2% konvertering betyr at 2 av 100 besøkende gjennomfører kjøp. Teknologi brukes aktivt for å øke denne.' },
    ],
    practical:
      'Undersøk en norsk nettbutikk (f.eks. power.no eller komplett.no). Identifiser tre teknologiske funksjoner som er designet for å øke salg eller forbedre kundeopplevelsen.',
    exercises: [
      {
        id: 'tki-1-1',
        question: 'Hva er et CRM-system?',
        choices: [
          { id: 'a', text: 'Et kassesystem for butikker' },
          { id: 'b', text: 'Et system for å administrere kunderelasjoner og samle kundedata på ett sted' },
          { id: 'c', text: 'Et regnskapssystem for bedrifter' },
          { id: 'd', text: 'En app for å lage markedsplaner' },
        ],
        correctId: 'b',
        explanation: 'CRM (Customer Relationship Management) samler all informasjon om kunder — kjøpshistorikk, preferanser og kontakthistorikk — slik at alle ansatte kan gi personlig og konsistent service.',
      },
      {
        id: 'tki-1-2',
        question: 'Hva menes med omnikanal-salg?',
        choices: [
          { id: 'a', text: 'At bedriften kun selger gjennom én kanal for å holde fokus' },
          { id: 'b', text: 'At bedriften selger simultant i fysisk butikk, nettbutikk og sosiale medier med sømløs kundeopplevelse' },
          { id: 'c', text: 'At bedriften sender reklame på alle kanaler' },
          { id: 'd', text: 'At bedriften har én kunderådgiver per salgskanal' },
        ],
        correctId: 'b',
        explanation: 'Omnikanal betyr at alle salgskanaler er integrert — kunden kan starte et kjøp på nett, fortsette i app og fullføre i butikk uten å miste informasjon.',
      },
      {
        id: 'tki-1-3',
        question: 'Hva er konverteringsrate i digital handel?',
        choices: [
          { id: 'a', text: 'Antall besøkende på nettsiden per dag' },
          { id: 'b', text: 'Andelen besøkende som gjennomfører et kjøp' },
          { id: 'c', text: 'Prisen på å konvertere valuta i nettbutikken' },
          { id: 'd', text: 'Antall produkter som er tilgjengelige i nettbutikken' },
        ],
        correctId: 'b',
        explanation: 'Konverteringsraten viser hvor effektiv nettbutikken er til å gjøre besøkende om til kjøpere. En typisk e-handelsrate er 1–3%. Teknologi brukes aktivt for å forbedre denne.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🤖',
    title: 'Kunstig intelligens (KI) i markedsføring og salg',
    quote: 'KI er ikke smartere enn oss — den er bare uendelig mer tålmodig og aldri trøtt.',
    content:
      'Kunstig intelligens (KI) brukes allerede i norske bedrifter på mange måter. Chatbots svarer på kundehenvendelser 24/7 uten menneskelig innsats. Produktanbefalingssystemer (som Netflix og Amazon bruker) analyserer kjøpshistorikk og foreslår relevante produkter — dette øker gjennomsnittskjøpet betydelig. Personalisert e-postmarkedsføring sender rett innhold til rett person til rett tid. Prisoptimalisering: flyselskaper og hoteller bruker KI til dynamisk prissetting basert på etterspørsel og tilgjengelighet. Sentimentanalyse leser kundeomtaler og sosiale medier for å fange opp trender og klager tidlig. For en VG1-elev i servicenæringen er det viktig å vite at KI er et verktøy — ikke en erstatning for menneskelig empati og relasjonskompetanse.',
    subpoints: [
      { label: 'CHATBOT', text: 'Et KI-drevet program som simulerer menneskelig samtale. Brukes til kundestøtte, bestillinger og FAQ. Best til enkle, repeterende henvendelser.' },
      { label: 'PRODUKTANBEFALINGER', text: '"Kunder som kjøpte dette, kjøpte også..." — KI-algoritmer analyserer mønstre i millioner av transaksjoner og foreslår relevante produkter.' },
      { label: 'DYNAMISK PRISSETTING', text: 'KI justerer priser i sanntid basert på etterspørsel, tilgjengelighet og konkurrenters priser. Vanlig i reiseliv og hotellbransjen.' },
    ],
    practical:
      'Gå inn på en nettbutikk og legg noe i handlekurven uten å kjøpe. Observer hva som skjer over neste 24 timer (e-poster, annonser). Diskuter hvilke KI-mekanismer som er i bruk.',
    exercises: [
      {
        id: 'tki-2-1',
        question: 'Hva er en chatbot, og hva er den best egnet til i kundeservice?',
        choices: [
          { id: 'a', text: 'En menneskelig kundeserviceagent som chatter på nett' },
          { id: 'b', text: 'Et KI-program som svarer automatisk — best til enkle, repeterende spørsmål som åpningstider og ordrestatus' },
          { id: 'c', text: 'Et system for å sende masseutsendelser av e-post' },
          { id: 'd', text: 'En robot som pakker varer i lageret' },
        ],
        correctId: 'b',
        explanation: 'Chatbots er KI-drevne programmer som simulerer samtale. De er effektive for FAQ og enkle henvendelser, men bør overføre til menneskelig hjelp ved komplekse eller sensitive saker.',
      },
      {
        id: 'tki-2-2',
        question: 'Et flyselskap endrer billettprisene automatisk basert på hvor mange seter som er igjen og når avgangen er. Dette er et eksempel på:',
        choices: [
          { id: 'a', text: 'Skimmingprisstrategi' },
          { id: 'b', text: 'Dynamisk prissetting ved hjelp av KI' },
          { id: 'c', text: 'Penetrasjonsprisstrategi' },
          { id: 'd', text: 'Psykologisk prissetting' },
        ],
        correctId: 'b',
        explanation: 'Dynamisk prissetting bruker KI til å justere priser i sanntid basert på etterspørsel, resterende kapasitet og andre faktorer. Dette er standard i luftfarten og hotellbransjen.',
      },
      {
        id: 'tki-2-3',
        question: 'Hva er den viktigste begrensningen ved KI i salg og kundeservice?',
        choices: [
          { id: 'a', text: 'KI er for dyrt for de fleste bedrifter' },
          { id: 'b', text: 'KI kan ikke analysere data raskt nok' },
          { id: 'c', text: 'KI mangler menneskelig empati og relasjonskompetanse — spesielt viktig i komplekse og sensitive situasjoner' },
          { id: 'd', text: 'KI fungerer bare på engelsk' },
        ],
        correctId: 'c',
        explanation: 'KI er svært effektiv på mønstre og repetisjon, men mangler ekte empati. I servicenæringen — der menneskelig kontakt og relasjon er kjernen — er menneskelig kompetanse fremdeles avgjørende.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🚀',
    title: 'Fremtidens salg',
    quote: 'Den som forstår teknologien, eier ikke fremtiden — den som forstår mennesket bak teknologien gjør det.',
    content:
      'Salgsfaget er i rask endring. Augmented Reality (AR) gjør det mulig å "prøve" møbler i stuen din via mobilkamera (IKEA Place-appen) eller se hvordan klær ser ut uten å ta dem på. Voice commerce — kjøp via stemmeassistenter som Siri eller Google Assistant — er i vekst. Sosiale medier har blitt direktesalgskanaler: live shopping på TikTok og Instagram er allerede stort i Asia og vokser raskt i Europa. Bærekraftig forbruk påvirker også salg: unge forbrukere undersøker bedriftens miljøprofil og etiske praksis før de kjøper. Fremtidens selger kombinerer digital kompetanse med sterk relasjonskompetanse — og forstår at teknologi er et verktøy, ikke et mål i seg selv.',
    subpoints: [
      { label: 'AUGMENTED REALITY (AR)', text: 'Teknologi som legger digitale elementer på den virkelige verden via kamera. IKEA Place lar kunden "plassere" møbler i rommet sitt før kjøp — reduserer retur.' },
      { label: 'LIVE SHOPPING', text: 'Direktesendt salg på sosiale medier der produkter presenteres og kan kjøpes i sanntid. Enormt populært i Kina (TikTok-eier), vokser i Europa.' },
      { label: 'SOSIALE BEVIS', text: 'Anmeldelser, stjerneskår og "X andre ser på dette nå" brukes strategisk for å utnytte at vi stoler mer på andres erfaringer enn på reklame.' },
    ],
    practical:
      'Last ned IKEA Place-appen (gratis) og test AR-funksjonen. Diskuter: Hvordan kan denne teknologien redusere returer og øke kjøpsglede? Hvilke andre bransjer kan bruke lignende teknologi?',
    exercises: [
      {
        id: 'tki-3-1',
        question: 'Hva er augmented reality (AR) i sammenheng med salg?',
        choices: [
          { id: 'a', text: 'En type virtuell valuta brukt i nettbutikker' },
          { id: 'b', text: 'Teknologi som legger digitale elementer på den virkelige verden via kamera, f.eks. for å "prøve" produkter' },
          { id: 'c', text: 'En avansert form for chatbot-kommunikasjon' },
          { id: 'd', text: 'Et system for automatisert lagerbehandling' },
        ],
        correctId: 'b',
        explanation: 'AR i salg lar kunden visualisere produkter i sin egen kontekst — som IKEA Place der du kan se møbler i ditt eget rom. Dette reduserer usikkerhet og kan øke salget og redusere returer.',
      },
      {
        id: 'tki-3-2',
        question: 'Hva er "sosiale bevis" (social proof) og hvordan brukes det i digital markedsføring?',
        choices: [
          { id: 'a', text: 'Bevis på at bedriften er registrert i Enhetsregisteret' },
          { id: 'b', text: 'Anmeldelser, stjernekarakterer og "X andre kjøpte dette" — brukes strategisk fordi vi stoler mer på andres erfaringer enn reklame' },
          { id: 'c', text: 'Dokumentasjon på at produktet er miljøsertifisert' },
          { id: 'd', text: 'Sponset innhold på sosiale medier' },
        ],
        correctId: 'b',
        explanation: 'Sosiale bevis utnytter at mennesker ser til andre for å ta beslutninger. Anmeldelser, stjernekarakterer, "bestselger"-merker og "andre ser på dette" er bevisste salgsteknikker basert på dette prinsippet.',
      },
      {
        id: 'tki-3-3',
        question: 'Hva karakteriserer fremtidens selger best?',
        choices: [
          { id: 'a', text: 'En som kan bruke alle sosiale medieplattformer' },
          { id: 'b', text: 'En som kan programmere KI-systemer' },
          { id: 'c', text: 'En som kombinerer digital kompetanse med sterk relasjonskompetanse og forstår teknologi som verktøy, ikke mål' },
          { id: 'd', text: 'En som spesialiserer seg utelukkende på netthandel' },
        ],
        correctId: 'c',
        explanation: 'Fremtidens selger trenger begge deler: digital kompetanse til å bruke teknologien effektivt, og menneskelig relasjonskompetanse til å bygge tillit og forstå kundebehov — noe KI ikke kan erstatte.',
      },
    ],
  },
]

export default function TeknologiKiModule() {
  return (
    <DrawerModule
      moduleCode="MFI11"
      moduleTitle="Teknologi og KI i salg"
      moduleIcon="🤖"
      storageKey="learning-mfi-teknologi-ki"
      completeRoute="/learning/mfi/teknologi-ki/complete"
      phases={phases}
      intro="Teknologi endrer salg raskere enn noen gang. Men verktøyene er bare så gode som den som bruker dem — forstå teknologien, og du blir en bedre selger."
      vissteduAt="80% av nordmenn handler på nett jevnlig. I 2030 forventes over halvparten av alt salg å skje digitalt eller gjennom KI-drevne kanaler."
      espenSier="Chatbots og algoritmer er kule — men kunden som er lei seg, syk eller forvirret trenger fremdeles et ekte menneske. Lær teknologien, men glem aldri mennesket."
      presentationLink={{ route: '/learning/presentations/teknologi-ki', description: 'Teknologi og KI — en visuell gjennomgang av digital transformasjon' }}
    />
  )
}
