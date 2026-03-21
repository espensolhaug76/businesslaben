import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔗',
    title: 'Porters verdikjede',
    quote: 'Verdien skapes ikke i ett ledd — den bygges opp gjennom hele kjeden.',
    content:
      'Michael Porter beskrev i 1985 verdikjeden som et verktøy for å kartlegge alle aktivitetene en bedrift utfører for å skape verdi for kunden. Kjeden deles i primæraktiviteter (som produksjon, salg og service) og støtteaktiviteter (som innkjøp, HR og teknologiutvikling). For en servicebedrift kan primæraktivitetene se slik ut: mottak av varer → lagring → salg → kundehåndtering → reklamasjonsbehandling. Støtteaktiviteter som opplæring av ansatte og innkjøpssystemer gjør primæraktivitetene mer effektive. Målet med å analysere verdikjeden er å finne ut hvor det skapes størst verdi — og hvor det finnes unødvendige kostnader eller svakheter.',
    subpoints: [
      { label: 'PRIMÆRAKTIVITETER', text: 'De aktivitetene som direkte berører produktet eller tjenesten: inngående logistikk, produksjon/drift, utgående logistikk, markedsføring og salg, og service.' },
      { label: 'STØTTEAKTIVITETER', text: 'Aktiviteter som støtter primærleddet: innkjøp, teknologiutvikling, personalledelse og bedriftens infrastruktur (ledelse, økonomi, jus).' },
      { label: 'MARGIN', text: 'Differansen mellom den verdien kunden opplever og de totale kostnadene — dette er bedriftens fortjeneste.' },
    ],
    practical:
      'Tegn en enkel verdikjede for en kafé: råvarer inn → tilbereding → servering → betaling → gjestehåndtering. Diskuter hvor kafeen kan redusere sløsing eller øke verdien for gjesten.',
    exercises: [
      {
        id: 'vk-1-1',
        question: 'Hva er hensikten med å analysere en bedrifts verdikjede?',
        choices: [
          { id: 'a', text: 'Å finne ut hvem som er bedriftens konkurrenter' },
          { id: 'b', text: 'Å kartlegge aktiviteter og identifisere hvor verdiskaping og kostnader oppstår' },
          { id: 'c', text: 'Å beregne bedriftens årsregnskap' },
          { id: 'd', text: 'Å lage et organisasjonskart for bedriften' },
        ],
        correctId: 'b',
        explanation: 'Verdikjedeanalyse avdekker hvilke aktiviteter som skaper verdi for kunden og hvilke som genererer unødvendige kostnader — et viktig verktøy for å styrke konkurranseevnen.',
      },
      {
        id: 'vk-1-2',
        question: 'Hvilken av følgende er en STØTTEAKTIVITET i Porters verdikjede?',
        choices: [
          { id: 'a', text: 'Salg og markedsføring' },
          { id: 'b', text: 'Inngående logistikk (varemottak)' },
          { id: 'c', text: 'Personalledelse og opplæring' },
          { id: 'd', text: 'Kundeservice etter salg' },
        ],
        correctId: 'c',
        explanation: 'Personalledelse og opplæring er en støtteaktivitet — den støtter primæraktivitetene uten selv å produsere varen eller tjenesten direkte.',
      },
      {
        id: 'vk-1-3',
        question: 'En hotellkjede oppdager at rengjøringsrutinene tar dobbelt så lang tid som hos konkurrentene. Hva sier verdikjedeanalysen om dette?',
        choices: [
          { id: 'a', text: 'Det er alltid bra å bruke mer tid på rengjøring — det øker kvaliteten' },
          { id: 'b', text: 'Dette er en ineffektivitet i en primæraktivitet som øker kostnadene uten tilsvarende verdiøkning' },
          { id: 'c', text: 'Rengjøring er en støtteaktivitet og påvirker ikke verdikjeden' },
          { id: 'd', text: 'Verdikjedeanalyse kan ikke brukes på hotell' },
        ],
        correctId: 'b',
        explanation: 'I et hotell er rengjøring en primæraktivitet (del av driften). Ineffektivitet her øker kostnader uten at kunden nødvendigvis opplever mer verdi — det bør effektiviseres.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '♻️',
    title: 'Bærekraft i verdikjeden',
    quote: 'En bedrift som ødelegger naturen den lever av, sager av grenen den sitter på.',
    content:
      'Bærekraftig forretningsdrift handler om å drive lønnsomt uten å forringe miljø, sosiale forhold eller fremtidige generasjoners muligheter — det FN kaller Triple Bottom Line: Planet, People, Profit. I verdikjeden betyr dette å se på hvert ledd: Hvem produserer råvarene? Hvilke arbeidsforhold gjelder? Hvor mye CO₂ slipper transporten ut? Norske reiselivsbedrifter er særlig avhengige av ren natur — og dermed sterkt motivert for bærekraft. FNs 17 bærekraftsmål gir bedrifter konkrete mål å jobbe mot. Mål 12 (ansvarlig forbruk og produksjon) og mål 13 (klimahandling) er spesielt relevante for servicenæringen.',
    subpoints: [
      { label: 'TRIPLE BOTTOM LINE', text: 'Bedriften måles på tre bunnlinjer: økonomi (profit), miljø (planet) og sosiale forhold (people). Alle tre må ivaretas.' },
      { label: 'FNs BÆREKRAFTSMÅL', text: '17 globale mål vedtatt av FN i 2015 — bedrifter bruker disse som rammeverk for sin bærekraftstrategi.' },
      { label: 'GRØNNVASKING', text: 'Når en bedrift fremstiller seg som mer miljøvennlig enn den faktisk er. Dette er ulovlig og ødelegger tilliten — vær konkret og dokumenter påstander.' },
    ],
    practical:
      'Finn et norsk reiselivsselskap og se på hjemmesiden deres bærekraftsrapport. Hva gjør de konkret for miljøet? Er påstandene dokumentert, eller minner det om grønnvasking?',
    exercises: [
      {
        id: 'vk-2-1',
        question: 'Hva menes med "Triple Bottom Line" i bærekraftig forretningsdrift?',
        choices: [
          { id: 'a', text: 'At bedriften skal ha tre ulike budsjetter' },
          { id: 'b', text: 'At bedriften måles på økonomi, miljø og sosiale forhold — ikke bare profitt' },
          { id: 'c', text: 'At bedriften skal selge tre forskjellige produktkategorier' },
          { id: 'd', text: 'At bedriften har tre aksjonærer' },
        ],
        correctId: 'b',
        explanation: 'Triple Bottom Line (planet, people, profit) betyr at bedriften har ansvar for mer enn bare finansielt resultat — miljøpåvirkning og sosiale forhold er like viktige.',
      },
      {
        id: 'vk-2-2',
        question: 'Hva er grønnvasking (greenwashing)?',
        choices: [
          { id: 'a', text: 'En miljøvennlig vaskemetode for industrien' },
          { id: 'b', text: 'Når en bedrift fremstiller seg som mer miljøvennlig enn den faktisk er' },
          { id: 'c', text: 'Sertifisering for bærekraftige bedrifter' },
          { id: 'd', text: 'En type miljøavgift bedrifter betaler' },
        ],
        correctId: 'b',
        explanation: 'Grønnvasking er villedende markedsføring av bærekraft uten reell dekning — noe som er ulovlig etter markedsføringsloven og undergraver forbrukertilliten.',
      },
      {
        id: 'vk-2-3',
        question: 'Hvilket FN-bærekraftsmål handler om ansvarlig forbruk og produksjon?',
        choices: [
          { id: 'a', text: 'Mål 1 — Utrydde fattigdom' },
          { id: 'b', text: 'Mål 8 — Anstendig arbeid og økonomisk vekst' },
          { id: 'c', text: 'Mål 12 — Ansvarlig forbruk og produksjon' },
          { id: 'd', text: 'Mål 17 — Samarbeid for å nå målene' },
        ],
        correctId: 'c',
        explanation: 'FNs bærekraftsmål 12 handler spesifikt om å sikre bærekraftige forbruks- og produksjonsmønstre — svært relevant for bedrifter i servicenæringen.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🌿',
    title: 'Sirkulær økonomi og grønn omstilling',
    quote: 'Avfall er en designfeil — i naturen finnes det ikke søppel.',
    content:
      'Den tradisjonelle lineære økonomien fungerer slik: ta → produser → kast. Sirkulær økonomi bryter med dette ved å holde ressurser i bruk så lenge som mulig: reduser forbruk, gjenbruk produkter og materialer, og resirkuler det som ikke kan gjenbrukes. For servicebedrifter kan sirkulær økonomi bety: redusere matsvinn i restauranter, tilby reparasjonstjenester, bruke emballasje som kan komposteres, eller kjøpe brukt utstyr fremfor nytt. Grønn omstilling handler om å innføre disse prinsippene trinn for trinn — og kommunisere dem ærlig til kundene. Bedrifter som lykkes med dette opplever lavere kostnader, sterkere merkevare og bedre rekruttering.',
    subpoints: [
      { label: 'LINEÆR VS SIRKULÆR', text: 'Lineær: produser → bruk → kast. Sirkulær: design for gjenbruk, reparasjon og materialgjenvinning — ressursene holdes i kretsløpet.' },
      { label: 'REDUCE-REUSE-RECYCLE', text: 'Hierarki for ressursbruk: best er å redusere forbruket, deretter gjenbruke, og til sist resirkulere som siste utvei.' },
      { label: 'GRØNN OMSTILLING', text: 'Prosessen med å endre driften mot mer bærekraftige løsninger — inkluderer energieffektivisering, grønn innkjøpspolitikk og klimaregnskap.' },
    ],
    practical:
      'Tenk på en restaurant du kjenner. List tre konkrete tiltak de kan innføre for å bevege seg mot sirkulær økonomi (f.eks. matsvinnreduksjon, kompostering, lokale leverandører).',
    exercises: [
      {
        id: 'vk-3-1',
        question: 'Hva kjennetegner en sirkulær økonomi sammenlignet med en lineær økonomi?',
        choices: [
          { id: 'a', text: 'Sirkulær økonomi produserer mer, lineær økonomi produserer mindre' },
          { id: 'b', text: 'I sirkulær økonomi holdes ressurser i bruk lengst mulig gjennom gjenbruk og resirkulering' },
          { id: 'c', text: 'Sirkulær økonomi er dyrere og gir lavere fortjeneste' },
          { id: 'd', text: 'Lineær økonomi er den mest bærekraftige modellen' },
        ],
        correctId: 'b',
        explanation: 'Sirkulær økonomi erstatter "ta-produser-kast" med kretsløpstenkning der råvarer og produkter holdes i bruk så lenge som mulig gjennom gjenbruk, reparasjon og resirkulering.',
      },
      {
        id: 'vk-3-2',
        question: 'En klesbutikk begynner å ta imot brukte klær, reparere dem og selge dem på nytt. Dette er et eksempel på:',
        choices: [
          { id: 'a', text: 'Lineær økonomi' },
          { id: 'b', text: 'Grønnvasking' },
          { id: 'c', text: 'Sirkulær økonomi i praksis' },
          { id: 'd', text: 'Prisreduksjon som konkurransemiddel' },
        ],
        correctId: 'c',
        explanation: 'Å ta imot, reparere og videreselge brukte produkter er et klassisk eksempel på sirkulær økonomi — ressursene holdes i bruk fremfor å kastes.',
      },
      {
        id: 'vk-3-3',
        question: 'Hva er den viktigste fordelen for en bedrift som lykkes med grønn omstilling?',
        choices: [
          { id: 'a', text: 'De slipper å betale skatt' },
          { id: 'b', text: 'De får lavere kostnader, sterkere merkevare og bedre rekruttering i tillegg til miljøgevinsten' },
          { id: 'c', text: 'De kan sette høyere priser uten at kundene klager' },
          { id: 'd', text: 'De får automatisk miljøsertifisering' },
        ],
        correctId: 'b',
        explanation: 'Bærekraftige bedrifter opplever gjerne både kostnadsbesparelser (f.eks. redusert energibruk), sterkere merkevare hos bevisste forbrukere og lettere rekruttering av unge kandidater.',
      },
    ],
  },
]

export default function VerdikjedenModule() {
  return (
    <DrawerModule
      moduleCode="FD6"
      moduleTitle="Verdikjeden og bærekraftig utvikling"
      moduleIcon="🔗"
      storageKey="learning-verdikjeden"
      completeRoute="/learning/forretningsdrift/verdikjeden/complete"
      phases={phases}
      intro="Verdikjeden viser hvordan en bedrift skaper verdi — fra råvare til ferdig tjeneste. Bærekraft handler om å gjøre dette uten å ødelegge kloden vi lever på."
      vissteduAt="Norsk reiseliv er 100% avhengig av ren natur og bærekraftig drift — uten det har vi ikke noe å selge til gjestene."
      espenSier="Bærekraft er ikke idealistisk tull — det er god forretningsstrategi. Bedrifter som ignorerer dette i 2025 vil slite med å overleve til 2035."
      presentationLink={{ route: '/learning/presentations/verdikjeden', description: 'Verdikjeden — en visuell gjennomgang av verdikjede og bærekraft' }}
    />
  )
}
