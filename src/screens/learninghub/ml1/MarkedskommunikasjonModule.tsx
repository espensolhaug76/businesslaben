import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📡',
    title: 'Kommunikasjonsprosessen og støy',
    quote: 'Alt vi kommuniserer er kodet — og mottakeren dekoder det gjennom sine egne filtre.',
    content: 'Kommunikasjonsprosessen beskriver hvordan et budskap sendes fra avsender til mottaker. Støy er alt som forstyrrer budskapet underveis — teknisk, semantisk eller psykologisk.',
    subpoints: [
      'SENDER: Den som initierer kommunikasjonen og koder budskapet',
      'KODING: Å omforme tanker til ord, bilder eller symboler',
      'KANAL: Mediet som bærer budskapet (TV, sosiale medier, tale)',
      'STØY: Alt som forstyrrer budskapet — teknisk, kulturelt eller psykologisk',
      'FEEDBACK: Mottakerens respons som bekrefter om budskapet ble forstått',
    ],
    practical: 'En bedrift sender en reklamekampanje (sender). De bruker humor og bilder (koding) via Instagram (kanal). Algoritmene filtrerer bort annonsen for noen (støy). Likes og kommentarer er feedback.',
    glossaryTerm: 'Kommunikasjonsprosessen',
    exercises: [
      {
        id: 'mk-1-1',
        question: 'Hva er "støy" i kommunikasjonsprosessen?',
        choices: [
          { id: 'a', text: 'Høy musikk i bakgrunnen av en reklame' },
          { id: 'b', text: 'Alt som forstyrrer at budskapet oppfattes korrekt' },
          { id: 'c', text: 'En feil i avsenders koding av budskapet' },
          { id: 'd', text: 'Manglende feedback fra mottaker' },
        ],
        correctId: 'b',
        explanation: 'Støy er alt som hindrer at budskapet oppfattes slik avsenderen mente — det kan være teknisk (dårlig lyd), semantisk (misforståtte ord) eller psykologisk (mottaker er uinteressert).',
      },
      {
        id: 'mk-1-2',
        question: 'Hva menes med "koding" i kommunikasjonsprosessen?',
        choices: [
          { id: 'a', text: 'Å kryptere informasjon slik at konkurrenter ikke kan lese den' },
          { id: 'b', text: 'Å oversette tanker til programmerings-kode' },
          { id: 'c', text: 'Å omforme tanker og ideer til ord, bilder eller symboler' },
          { id: 'd', text: 'Å velge riktig distribusjonskanal for budskapet' },
        ],
        correctId: 'c',
        explanation: 'Koding er prosessen der avsenderen omformer sitt budskap til en form som kan sendes — for eksempel ved å velge ord, bilder, farger og tone som formidler ønsket mening.',
      },
      {
        id: 'mk-1-3',
        question: 'En bedrift sender en e-post til kunder, men halvparten av e-postene havner i søppelpost. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', text: 'Dårlig feedback' },
          { id: 'b', text: 'Feil målgruppe' },
          { id: 'c', text: 'Teknisk støy' },
          { id: 'd', text: 'Semantisk støy' },
        ],
        correctId: 'c',
        explanation: 'E-poster som havner i søppelpost er et eksempel på teknisk støy — en teknisk barriere som hindrer budskapet fra å nå mottakeren.',
      },
      {
        id: 'mk-1-4',
        question: 'Hva er feedback i kommunikasjonsprosessen?',
        choices: [
          { id: 'a', text: 'Avsenderens vurdering av sitt eget budskap' },
          { id: 'b', text: 'Mottakerens respons som viser om budskapet ble forstått' },
          { id: 'c', text: 'Kanalens evne til å formidle budskapet uten tap' },
          { id: 'd', text: 'En evalueringsrapport fra markedsavdelingen' },
        ],
        correctId: 'b',
        explanation: 'Feedback er signalene mottakeren sender tilbake til avsenderen — for eksempel et svar på e-post, en kommentar på sosiale medier, eller et kjøp etter en annonse.',
      },
      {
        id: 'mk-1-5',
        question: 'Hvilken av disse er et eksempel på semantisk støy?',
        choices: [
          { id: 'a', text: 'Dårlig internetttilkobling som bryter opp en videosamtale' },
          { id: 'b', text: 'Et faguttrykk i en annonse som målgruppen ikke forstår' },
          { id: 'c', text: 'En reklame som spilles på feil tidspunkt' },
          { id: 'd', text: 'At mottaker ikke er interessert i produktet' },
        ],
        correctId: 'b',
        explanation: 'Semantisk støy oppstår når avsenderen bruker ord, begreper eller symboler som mottakeren tolker annerledes enn tiltenkt — for eksempel fagterminologi rettet mot lekfolk.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📈',
    title: 'AIDA og kjøpstrappen',
    quote: 'AIDA beskriver reisen fra å ikke vite om produktet til å bli en lojal kunde.',
    content: 'AIDA-modellen (Attention, Interest, Desire, Action) beskriver kjøpsprosessen fra uvitenhet til handling. Kjøpstrappen legger til Loyalty som femte trinn.',
    subpoints: [
      'ATTENTION: Fange oppmerksomheten — med overskrift, farge eller humor',
      'INTEREST: Skape interesse — vise at produktet er relevant for deg',
      'DESIRE: Vekke lyst — la kunden forestille seg nytten eller gleden',
      'ACTION: Utløse handling — "Kjøp nå", "Meld deg på", "Ring oss"',
      'LOYALTY: Gjøre kunden til gjenkjøper og ambassadør for merkevaren',
    ],
    practical: 'En matvarekjede sender ut nyhetsbrev: Fengslende bilde av pizza (Attention) → "Laget av ferske råvarer fra lokale bønder" (Interest) → "Se for deg fredagskvelden" (Desire) → "Bestill nå og få gratis levering" (Action) → Lojalitetsprogram (Loyalty).',
    glossaryTerm: 'AIDA',
    exercises: [
      {
        id: 'mk-2-1',
        question: 'Hva er formålet med "Attention"-fasen i AIDA-modellen?',
        choices: [
          { id: 'a', text: 'Å få kunden til å kjøpe produktet umiddelbart' },
          { id: 'b', text: 'Å forklare produktets egenskaper i detalj' },
          { id: 'c', text: 'Å fange mottakerens oppmerksomhet' },
          { id: 'd', text: 'Å bygge langsiktig kundelojalitet' },
        ],
        correctId: 'c',
        explanation: 'Attention-fasen handler om å stoppe mottakeren og få dem til å legge merke til budskapet — uten dette skjer ingenting av de andre trinnene.',
      },
      {
        id: 'mk-2-2',
        question: 'En annonse sier: "Se for deg å slappe av på en solrik strand i Hellas neste sommer." Hvilket AIDA-trinn treffer dette best?',
        choices: [
          { id: 'a', text: 'Attention' },
          { id: 'b', text: 'Interest' },
          { id: 'c', text: 'Desire' },
          { id: 'd', text: 'Action' },
        ],
        correctId: 'c',
        explanation: 'Å be kunden forestille seg selv i en positiv situasjon er en klassisk Desire-teknikk — man vekker lysten og lengselen etter produktet eller opplevelsen.',
      },
      {
        id: 'mk-2-3',
        question: 'Hva er Loyalty-trinnet i kjøpstrappen?',
        choices: [
          { id: 'a', text: 'Å få kunden til å kjøpe for første gang' },
          { id: 'b', text: 'Å gjøre kunden til en gjenkjøper og ambassadør' },
          { id: 'c', text: 'Å samle inn kundedata for fremtidig markedsføring' },
          { id: 'd', text: 'Å tilby rabatter for å øke salget' },
        ],
        correctId: 'b',
        explanation: 'Loyalty handler om å bygge langsiktige relasjoner slik at kunden kjøper igjen og anbefaler merket til andre — dette er det mest lønnsomme stadiet i kjøpsprosessen.',
      },
      {
        id: 'mk-2-4',
        question: 'En nettbutikk bruker knappen "Kjøp nå — tilbudet gjelder kun i dag!". Hvilket AIDA-trinn er dette?',
        choices: [
          { id: 'a', text: 'Attention' },
          { id: 'b', text: 'Interest' },
          { id: 'c', text: 'Desire' },
          { id: 'd', text: 'Action' },
        ],
        correctId: 'd',
        explanation: 'Call-to-action med hastverk ("kun i dag") er en klassisk Action-teknikk for å utløse det endelige kjøpet.',
      },
      {
        id: 'mk-2-5',
        question: 'Hva skiller AIDA fra kjøpstrappen?',
        choices: [
          { id: 'a', text: 'Kjøpstrappen inkluderer Loyalty som femte trinn' },
          { id: 'b', text: 'AIDA er kun for digital markedsføring' },
          { id: 'c', text: 'Kjøpstrappen starter med Interest, ikke Attention' },
          { id: 'd', text: 'AIDA inkluderer After-sales som femte trinn' },
        ],
        correctId: 'a',
        explanation: 'Kjøpstrappen bygger på AIDA ved å legge til Loyalty som femte trinn — noe som reflekterer at målet ikke bare er et kjøp, men langsiktig kundelojalitet.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📺',
    title: 'Reklame — former og effektmåling',
    quote: 'Reklame er betalt kommunikasjon. Spørsmålet er ikke om vi betaler — men om vi får nok tilbake.',
    content: 'Reklame er betalt, upersonlig kommunikasjon via massemedier. Effektiviteten måles ulikt for tradisjonell og digital reklame.',
    subpoints: [
      'FORMER: TV, radio, avis, utendørs, display-annonser, søkemotorreklame',
      'EFFEKTMÅLING: Rekkevidde (reach), frekvens, GRP (Gross Rating Points)',
      'DIGITAL EFFEKTMÅLING: CTR (click-through rate), konverteringsrate, ROI',
      'ATTENTION ECONOMY: Kampen om oppmerksomhet — gjennomsnittlig annonsepåvirkning er 4000+ per dag',
    ],
    practical: 'Nike kjører en TV-kampanje med 80% rekkevidde og 5 ganger frekvens = 400 GRP. Digitalt måler de CTR på 2% og konverteringsrate på 3% — 1000 klikk gir 30 salg.',
    glossaryTerm: 'Reklame',
    exercises: [
      {
        id: 'mk-3-1',
        question: 'Hva måler GRP (Gross Rating Points)?',
        choices: [
          { id: 'a', text: 'Antall klikk på en digital annonse' },
          { id: 'b', text: 'Rekkevidde multiplisert med frekvens for en kampanje' },
          { id: 'c', text: 'Fortjeneste per investert reklamekrone' },
          { id: 'd', text: 'Antall ganger en annonse vises på TV' },
        ],
        correctId: 'b',
        explanation: 'GRP = Rekkevidde (%) × Frekvens. 70% rekkevidde med 5 ganger frekvens = 350 GRP. Brukes særlig for TV og radio for å sammenligne kampanjers "tyngde".',
      },
      {
        id: 'mk-3-2',
        question: 'Hva er CTR (Click-Through Rate)?',
        choices: [
          { id: 'a', text: 'Andelen som kjøper etter å ha klikket på en annonse' },
          { id: 'b', text: 'Andelen som klikker på annonsen av de som ser den' },
          { id: 'c', text: 'Total rekkevidde for en digital kampanje' },
          { id: 'd', text: 'Kostnaden per tusen visninger' },
        ],
        correctId: 'b',
        explanation: 'CTR = Antall klikk / Antall visninger × 100%. En CTR på 2% betyr at 2 av 100 som ser annonsen klikker på den. Gjennomsnittlig CTR for display-annonser er under 0,5%.',
      },
      {
        id: 'mk-3-3',
        question: 'Hva kjennetegner "attention economy"?',
        choices: [
          { id: 'a', text: 'At oppmerksomhet er en begrenset ressurs og det konkurreres om den' },
          { id: 'b', text: 'At reklame alltid skal fange oppmerksomhet med humor' },
          { id: 'c', text: 'At kunder betaler ekstra for reklamefrie opplevelser' },
          { id: 'd', text: 'At oppmerksomhetsspenn øker med mer digital eksponering' },
        ],
        correctId: 'a',
        explanation: 'Attention economy er begrepet for at menneskelig oppmerksomhet er en begrenset og verdifull ressurs. Vi eksponeres for 4000+ reklamebudskaper daglig, og kampen om oppmerksomheten er intens.',
      },
      {
        id: 'mk-3-4',
        question: 'En bedrift bruker 100 000 kr på en kampanje og tjener 300 000 kr ekstra. Hva er ROI?',
        choices: [
          { id: 'a', text: '33%' },
          { id: 'b', text: '100%' },
          { id: 'c', text: '200%' },
          { id: 'd', text: '300%' },
        ],
        correctId: 'c',
        explanation: 'ROI = (Gevinst − Investering) / Investering × 100% = (300 000 − 100 000) / 100 000 × 100% = 200%. En ROI på 200% betyr at for hver investerte krone fikk man tilbake 3 kr.',
      },
      {
        id: 'mk-3-5',
        question: 'Hva er rekkevidde (reach) i reklamemåling?',
        choices: [
          { id: 'a', text: 'Antall ganger en person ser en annonse' },
          { id: 'b', text: 'Andelen av målgruppen som eksponeres for kampanjen minst én gang' },
          { id: 'c', text: 'Geografisk område en kampanje dekker' },
          { id: 'd', text: 'Totalt antall annonsekroner brukt' },
        ],
        correctId: 'b',
        explanation: 'Rekkevidde er andelen av den definerte målgruppen som minst én gang eksponeres for reklamebudskapet i løpet av kampanjeperioden — måles i prosent.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📱',
    title: 'PR, sosiale medier og innholdsmarkedsføring',
    quote: 'Reklame er det du betaler for. PR er det du fortjener. Innhold er det du eier.',
    content: 'PESO-modellen deler medier i Paid, Earned, Shared og Owned. PR skaper troverdighet, sosiale medier dialog, og innholdsmarkedsføring lojalitet.',
    subpoints: [
      'PR: Ufortjent omtale i medier — pressedekning, anmeldelser, krisehåndtering',
      'OWNED MEDIA: Kanalene bedriften kontrollerer — nettside, blogg, nyhetsbrev',
      'EARNED MEDIA: Omtale bedriften fortjener — presse, anbefalinger, del-innhold',
      'INNHOLDSMARKEDSFØRING: Skape verdifullt innhold som tiltrekker — ikke avbryter — kunder',
    ],
    practical: 'Red Bull eier ikke bare en drikke — de eier mediekanaler (Red Bull TV, Red Bull Media House). De lager ekstremsporthendelser (Earned Media), YouTube-kanaler (Owned) og sponsede innlegg (Paid/Shared).',
    glossaryTerm: 'Innholdsmarkedsføring',
    exercises: [
      {
        id: 'mk-4-1',
        question: 'Hva er "Earned Media" i PESO-modellen?',
        choices: [
          { id: 'a', text: 'Betalte annonser i sosiale medier' },
          { id: 'b', text: 'Bedriftens egne nettsider og blogger' },
          { id: 'c', text: 'Omtale og anbefalinger bedriften fortjener gjennom god innsats' },
          { id: 'd', text: 'Samarbeid med influencere mot betaling' },
        ],
        correctId: 'c',
        explanation: 'Earned Media er ufortjent (men fortjent!) omtale — pressedekning, positive anmeldelser, brukernes del-innhold. Det er ansett som mest troverdig fordi det ikke er betalt.',
      },
      {
        id: 'mk-4-2',
        question: 'Hva kjennetegner innholdsmarkedsføring?',
        choices: [
          { id: 'a', text: 'Å kjøpe reklameplass for å avbryte målgruppen' },
          { id: 'b', text: 'Å lage verdifullt innhold som tiltrekker og bygger tillit hos kunder' },
          { id: 'c', text: 'Å sende masseutsendelser via e-post' },
          { id: 'd', text: 'Å bruke betalte influencere til å promotere produkter' },
        ],
        correctId: 'b',
        explanation: 'Innholdsmarkedsføring handler om å lage relevant og verdifullt innhold — artikler, videoer, podcaster — som tiltrekker kunder naturlig i stedet for å avbryte dem med reklame.',
      },
      {
        id: 'mk-4-3',
        question: 'En bedrift publiserer guider, videoer og podcaster for å hjelpe kundene — uten å selge direkte. Dette er eksempel på:',
        choices: [
          { id: 'a', text: 'Betalte annonser (Paid Media)' },
          { id: 'b', text: 'Innholdsmarkedsføring' },
          { id: 'c', text: 'Tradisjonell PR' },
          { id: 'd', text: 'Direkte markedsføring' },
        ],
        correctId: 'b',
        explanation: 'Å skape verdifullt innhold for å tiltrekke og beholde kunder uten direkte salgspåtrykk er definisjonen på innholdsmarkedsføring (content marketing).',
      },
      {
        id: 'mk-4-4',
        question: 'Hva er "Owned Media"?',
        choices: [
          { id: 'a', text: 'Medieomtale som bedriften fortjener' },
          { id: 'b', text: 'Betalte annonseplasser i redaksjonelle medier' },
          { id: 'c', text: 'Kanaler bedriften selv kontrollerer — nettside, nyhetsbrev, blogg' },
          { id: 'd', text: 'Innlegg i sosiale medier fra fornøyde kunder' },
        ],
        correctId: 'c',
        explanation: 'Owned Media er kanalene bedriften selv eier og kontrollerer — nettsiden, bloggen, nyhetsbrevet og appen. Disse er verdifulle fordi de ikke er avhengig av tredjeparts algoritmer.',
      },
      {
        id: 'mk-4-5',
        question: 'Hvorfor anses PR (presseomtale) som mer troverdig enn betalt reklame?',
        choices: [
          { id: 'a', text: 'Fordi det er billigere å gjennomføre' },
          { id: 'b', text: 'Fordi det kommer fra en uavhengig tredjepart, ikke fra bedriften selv' },
          { id: 'c', text: 'Fordi det når flere mennesker enn reklame' },
          { id: 'd', text: 'Fordi det alltid er positivt' },
        ],
        correctId: 'b',
        explanation: 'PR er mer troverdig fordi det er en uavhengig journalist eller redaksjon som omtaler bedriften — ikke bedriften som reklamerer for seg selv. Kilden gir troverdighet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🔄',
    title: 'Integrert markedskommunikasjon (IMK)',
    quote: 'IMK er ikke et valg — det er en nødvendighet. Kundene møter deg på 8-12 touch points før de kjøper.',
    content: 'IMK betyr å koordinere alle kommunikasjonskanaler slik at kunden opplever et helhetlig og konsistent budskap — uansett hvor de møter merkevaren.',
    subpoints: [
      'HVORFOR IMK: Kunder møter merkevaren på mange kanaler — budskapet må henge sammen',
      'TOUCH POINTS: Alle steder kunden møter merkevaren — annonse, nettside, butikk, kundeservice',
      'EKSEMPEL IKEA: Samme tone, farger og budskap i TV-reklame, katalog, app og butikk',
      'FREMTIDEN: Personalisering og data gjør IMK mer presist — riktig budskap, riktig tid, riktig kanal',
    ],
    practical: 'Coca-Cola bruker samme "Open Happiness"-tema på TV, plakatrekke, emballasje, sosiale medier og events — alle kanaler forsterker hverandre og skaper en sterk, sammenhengende merkevareopplevelse.',
    glossaryTerm: 'Integrert markedskommunikasjon',
    exercises: [
      {
        id: 'mk-5-1',
        question: 'Hva er kjernen i integrert markedskommunikasjon (IMK)?',
        choices: [
          { id: 'a', text: 'Å bruke alle tilgjengelige mediekanaler uavhengig av hverandre' },
          { id: 'b', text: 'Å koordinere alle kommunikasjonskanaler til et helhetlig og konsistent budskap' },
          { id: 'c', text: 'Å integrere markedsavdelingen med salgsavdelingen' },
          { id: 'd', text: 'Å bruke kun digitale kanaler for markedsføring' },
        ],
        correctId: 'b',
        explanation: 'IMK handler om å sikre at alle kommunikasjonskanaler — reklame, PR, sosiale medier, emballasje, kundeservice — sender et sammenhengende og konsistent budskap.',
      },
      {
        id: 'mk-5-2',
        question: 'Hva er et "touch point" i markedskommunikasjon?',
        choices: [
          { id: 'a', text: 'En teknisk feil i kommunikasjonssystemet' },
          { id: 'b', text: 'Et sted eller en situasjon der kunden møter merkevaren' },
          { id: 'c', text: 'En type digital annonse på berøringsskjermer' },
          { id: 'd', text: 'Antall ganger en kunde klikker på en annonse' },
        ],
        correctId: 'b',
        explanation: 'Touch points er alle kontaktpunkter mellom kunden og merkevaren — fra annonser og nettsider til emballasje, butikkopplevelse og kundeservice. Forskning viser 8-12 touch points før kjøp.',
      },
      {
        id: 'mk-5-3',
        question: 'Hvorfor er konsistens viktig i IMK?',
        choices: [
          { id: 'a', text: 'Det reduserer kostnadene ved å lage én versjon av innholdet' },
          { id: 'b', text: 'Det hindrer konkurrenter fra å kopiere kampanjen' },
          { id: 'c', text: 'Inkonsistente budskap skaper forvirring og svekker merkevareidentiteten' },
          { id: 'd', text: 'Myndigheter krever konsistent markedsføring' },
        ],
        correctId: 'c',
        explanation: 'Inkonsistente budskap på tvers av kanaler forvirrer kunden og svekker merkevaren. Konsistens skaper gjenkjennelse og tillit — kunden skal kjenne igjen merkevaren uansett kanal.',
      },
      {
        id: 'mk-5-4',
        question: 'En bedrift bruker samme farger, logo og slagord på TV, nettside, emballasje og i butikk. Dette er et eksempel på:',
        choices: [
          { id: 'a', text: 'Innholdsmarkedsføring' },
          { id: 'b', text: 'Integrert markedskommunikasjon' },
          { id: 'c', text: 'Viral markedsføring' },
          { id: 'd', text: 'Direkte markedsføring' },
        ],
        correctId: 'b',
        explanation: 'Å bruke konsistente visuelle og verbale elementer på tvers av alle kanaler er kjernen i IMK — bedriften sikrer at kunden opplever en helhetlig og gjenkjennbar merkevareidentitet.',
      },
      {
        id: 'mk-5-5',
        question: 'Hvordan bidrar data og personalisering til fremtidens IMK?',
        choices: [
          { id: 'a', text: 'De erstatter behovet for kreativ kommunikasjon' },
          { id: 'b', text: 'De gjør det mulig å sende riktig budskap, til riktig person, på riktig tid og kanal' },
          { id: 'c', text: 'De gjør tradisjonelle medier som TV og radio irrelevante' },
          { id: 'd', text: 'De reduserer behovet for integrering av kanaler' },
        ],
        correctId: 'b',
        explanation: 'Data og AI gjør IMK mer presist ved å muliggjøre personalisering — du kan nå den riktige personen med det riktige budskapet på det riktige tidspunktet og i den riktige kanalen.',
      },
    ],
  },
]

export default function MarkedskommunikasjonModule() {
  return (
    <DrawerModule
      moduleCode="ML1-08"
      moduleTitle="Markedskommunikasjon"
      moduleIcon="📣"
      storageKey="learning-ml1-markedskommunikasjon"
      completeRoute="/learning/ml1/markedskommunikasjon/complete"
      phases={PHASES}
      intro="Markedskommunikasjon handler om å nå kunden med riktig budskap, på riktig kanal, til riktig tid. Fra TV-reklame til TikTok — prinsippene er de samme, men verktøyene endrer seg."
      vissteduAt="Old Spice sin 'The Man Your Man Could Smell Like'-kampanje (2010) økte salget med 107% på 3 måneder — og kostnadene ble halvert fordi viral spredning erstattet betalt media."
      espenSier="Integrert markedskommunikasjon er ikke et valg — det er en nødvendighet. Kundene møter deg på 8-12 touch points før de kjøper. Hvis ikke alle disse forteller samme historie, mister du dem."
      presentationLink={{ route: '/learning/presentations/ml1/markedskommunikasjon', description: 'Markedskommunikasjon — 10 slides' }}
    />
  )
}
