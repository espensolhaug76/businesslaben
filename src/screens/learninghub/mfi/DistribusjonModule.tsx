import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔗',
    title: 'Direkte vs indirekte distribusjon',
    quote: 'Direkte gir kontroll — indirekte gir rekkevidde',
    practical:
      'Direkte: produsenten selger rett til forbruker (Tesla showroom, IKEA.no). Indirekte: produsenten selger via mellomledd (grossist → forhandler → forbruker). Toyota-forhandlere er indirekte. Direkte = mer kontroll, høyere kostnad. Indirekte = bredere dekning, lavere kostnad per salgspunkt.',
    glossaryTerm: 'Distribusjonskanal',
    exercises: [
      {
        id: 'di-1-1',
        question: 'Hva er den viktigste fordelen med direkte distribusjon?',
        choices: [
          { id: 'a', text: 'Lavere kostnad per salgspunkt' },
          { id: 'b', text: 'Mer kontroll over kunderelasjonen' },
          { id: 'c', text: 'Bredere geografisk dekning' },
          { id: 'd', text: 'Raskere skalering' },
        ],
        correctId: 'b',
        explanation: 'Direkte distribusjon gir produsenten full kontroll over pris, presentasjon og kundeopplevelse — på bekostning av bredde og skalerbarhet.',
      },
      {
        id: 'di-1-2',
        question: 'Tesla bruker kun egne showroom og nettside. Hvilken distribusjonsform er dette?',
        choices: [
          { id: 'a', text: 'Indirekte distribusjon' },
          { id: 'b', text: 'Intensiv distribusjon' },
          { id: 'c', text: 'Direkte distribusjon' },
          { id: 'd', text: 'Selektiv distribusjon' },
        ],
        correctId: 'c',
        explanation: 'Tesla selger direkte fra produsent til forbruker uten mellomledd — et klassisk eksempel på direkte distribusjon.',
      },
      {
        id: 'di-1-3',
        question: 'Hva er ulempen med indirekte distribusjon sammenlignet med direkte?',
        choices: [
          { id: 'a', text: 'Lavere salgsvolum' },
          { id: 'b', text: 'Høyere produksjonskostnader' },
          { id: 'c', text: 'Mindre kontroll over kunderelasjonen' },
          { id: 'd', text: 'Færre salgspunkter' },
        ],
        correctId: 'c',
        explanation: 'Med mellomledd mister produsenten direkte kontakt med sluttkunden og kan ikke styre kundeopplevelsen like godt.',
      },
      {
        id: 'di-1-4',
        question: 'Hvilket selskap er et godt eksempel på indirekte distribusjon?',
        choices: [
          { id: 'a', text: 'Tesla (egne showroom)' },
          { id: 'b', text: 'Toyota (via forhandlere)' },
          { id: 'c', text: 'IKEA (egne varehus)' },
          { id: 'd', text: 'Amazon (eget lager og levering)' },
        ],
        correctId: 'b',
        explanation: 'Toyota selger via selvstendige forhandlere — produsenten selger til forhandler, som selger videre til forbruker.',
      },
      {
        id: 'di-1-5',
        question: 'Hva betyr det at distribusjonskjeden har mellomledd?',
        choices: [
          { id: 'a', text: 'Produsenten selger direkte på nett' },
          { id: 'b', text: 'Det er aktører mellom produsent og forbruker, som grossister og forhandlere' },
          { id: 'c', text: 'Produktet leveres kun til bedrifter' },
          { id: 'd', text: 'Det er kun én salgskanal' },
        ],
        correctId: 'b',
        explanation: 'Mellomledd er aktører som grossister, distributører og forhandlere som produktet passerer gjennom på veien til forbrukeren.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🥤',
    title: 'Intensiv, selektiv, eksklusiv',
    quote: 'Coca-Cola er overalt. Rolex er nesten ingensteds. Begge strategier er rette for sine merkevarer.',
    practical:
      'Intensiv: maksimal tilgjengelighet i alle mulige kanaler (Coca-Cola, melk, tyggegummi). Selektiv: utvalgte forhandlere som møter kvalitetskrav (Nike i utvalgte sportbutikker). Eksklusiv: svært begrenset antall forhandlere — skaper kunstig knapphet og prestisje (Rolex, Tesla i showroom).',
    exercises: [
      {
        id: 'di-2-1',
        question: 'Hvilken distribusjonsstrategi passer best for en luksusklokke?',
        choices: [
          { id: 'a', text: 'Intensiv distribusjon' },
          { id: 'b', text: 'Selektiv distribusjon' },
          { id: 'c', text: 'Eksklusiv distribusjon' },
          { id: 'd', text: 'Direkte distribusjon via nett' },
        ],
        correctId: 'c',
        explanation: 'Eksklusiv distribusjon med svært få utsalgssteder skaper kunstig knapphet og opprettholder luksusprestige — som Rolex gjør.',
      },
      {
        id: 'di-2-2',
        question: 'Coca-Cola selges overalt — kiosker, bensinstasjoner, matbutikker, restauranter. Hvilken strategi er dette?',
        choices: [
          { id: 'a', text: 'Eksklusiv distribusjon' },
          { id: 'b', text: 'Selektiv distribusjon' },
          { id: 'c', text: 'Intensiv distribusjon' },
          { id: 'd', text: 'Push-strategi' },
        ],
        correctId: 'c',
        explanation: 'Intensiv distribusjon handler om å gjøre produktet tilgjengelig i flest mulig salgspunkter for å maksimere tilgjengeligheten.',
      },
      {
        id: 'di-2-3',
        question: 'Nike selger sine premium-sko kun i utvalgte sportbutikker som møter visse krav. Hva heter denne strategien?',
        choices: [
          { id: 'a', text: 'Intensiv distribusjon' },
          { id: 'b', text: 'Selektiv distribusjon' },
          { id: 'c', text: 'Eksklusiv distribusjon' },
          { id: 'd', text: 'Direktesalg' },
        ],
        correctId: 'b',
        explanation: 'Selektiv distribusjon betyr at man velger forhandlere nøye basert på kvalitetskriterier — mellom intensiv og eksklusiv.',
      },
      {
        id: 'di-2-4',
        question: 'Hva er hovedformålet med eksklusiv distribusjon?',
        choices: [
          { id: 'a', text: 'Redusere distribusjonskostnader' },
          { id: 'b', text: 'Nå flest mulig kunder' },
          { id: 'c', text: 'Skape prestisje og kontrollere merkevareopplevelsen' },
          { id: 'd', text: 'Øke antall salgspunkter' },
        ],
        correctId: 'c',
        explanation: 'Eksklusiv distribusjon skaper kunstig knapphet, opprettholder høy pris og gir produsenten full kontroll over hvordan merkevaren presenteres.',
      },
      {
        id: 'di-2-5',
        question: 'Hvilke produkter passer best for intensiv distribusjon?',
        choices: [
          { id: 'a', text: 'Luksusvarer med høy pris' },
          { id: 'b', text: 'Dagligvarer og impulskjøpsprodukter' },
          { id: 'c', text: 'Spesialiserte B2B-produkter' },
          { id: 'd', text: 'Håndlagede eksklusive varer' },
        ],
        correctId: 'b',
        explanation: 'Dagligvarer og impulskjøp (brus, tyggegummi, sjokolade) tjener på å være overalt — tilgjengelighet er konkurransefordelen.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📱',
    title: 'Omnikanal vs multikanal',
    quote: 'Kunden tenker ikke i kanaler — de forventer en sømløs opplevelse overalt',
    practical:
      'Multikanal: selger via nett OG butikk, men kanalene er separate. Omnikanal: alle kanaler er integrert — kunden kan begynne handelen på nett, fortsette i app og avslutte i butikk. IKEA og Zalando er gode eksempler på vellykket omnikanal-handel i Norge.',
    exercises: [
      {
        id: 'di-3-1',
        question: 'Hva er den viktigste forskjellen mellom multikanal og omnikanal?',
        choices: [
          { id: 'a', text: 'Antall kanaler som brukes' },
          { id: 'b', text: 'Om kanalene er integrerte og gir en sømløs opplevelse' },
          { id: 'c', text: 'Om man selger på nett eller i butikk' },
          { id: 'd', text: 'Størrelsen på bedriften' },
        ],
        correctId: 'b',
        explanation: 'Omnikanal handler om integrasjon — kunden opplever en sømløs helhet på tvers av alle kanaler, ikke separate siloer.',
      },
      {
        id: 'di-3-2',
        question: 'En kunde legger varer i handlekurven på nett og kan hente dem i butikk. Dette er et kjennetegn på...',
        choices: [
          { id: 'a', text: 'Multikanal-handel' },
          { id: 'b', text: 'Omnikanal-handel' },
          { id: 'c', text: 'Direkte distribusjon' },
          { id: 'd', text: 'Push-strategi' },
        ],
        correctId: 'b',
        explanation: 'Å kunne starte på nett og avslutte i butikk (click-and-collect) er et typisk kjennetegn på omnikanal, der alle kanaler er koblet sammen.',
      },
      {
        id: 'di-3-3',
        question: 'Et selskap har nettbutikk og fysiske butikker, men de to systemene deler ikke lagerstatus eller kundeprofil. Hva er dette?',
        choices: [
          { id: 'a', text: 'Omnikanal' },
          { id: 'b', text: 'Multikanal' },
          { id: 'c', text: 'Eksklusiv distribusjon' },
          { id: 'd', text: 'Pull-strategi' },
        ],
        correctId: 'b',
        explanation: 'Separate systemer som ikke snakker sammen er multikanal — bedriften er til stede på flere kanaler, men de er ikke integrerte.',
      },
      {
        id: 'di-3-4',
        question: 'Hvorfor er omnikanal blitt viktigere for norske forhandlere de siste årene?',
        choices: [
          { id: 'a', text: 'Fordi det reduserer antall ansatte' },
          { id: 'b', text: 'Fordi kundene forventer sømløse opplevelser på tvers av nett, app og butikk' },
          { id: 'c', text: 'Fordi det er billigere enn multikanal' },
          { id: 'd', text: 'Fordi myndighetene krever det' },
        ],
        correctId: 'b',
        explanation: 'Moderne kunder skifter naturlig mellom kanaler og forventer at bedriften henger med — de tenker ikke på kanalgrenser.',
      },
      {
        id: 'di-3-5',
        question: 'Hvilke norske selskaper er kjent for god omnikanal-implementering?',
        choices: [
          { id: 'a', text: 'Rolex og Ferrari' },
          { id: 'b', text: 'IKEA og Zalando' },
          { id: 'c', text: 'Red Bull og Duolingo' },
          { id: 'd', text: 'Tesla og Apple' },
        ],
        correctId: 'b',
        explanation: 'IKEA og Zalando nevnes spesifikt som vellykkede eksempler på omnikanal-handel i det norske markedet.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '⏱️',
    title: 'Logistikk og lead time',
    quote: 'Amazon Prime lovet 2-dagers levering og endret kundenes forventninger til alle nettbutikker',
    practical:
      'Lead time = tid fra bestilling til leveranse. Jo kortere lead time, jo høyere forventninger. Lagerstyring, 3PL (tredjepartslogistikk) og lokale lagre er verktøy for å redusere lead time. Norske nettbutikker sliter med å konkurrere mot Amazon på leveringshastighet.',
    exercises: [
      {
        id: 'di-4-1',
        question: 'Hva betyr begrepet "lead time" i distribusjonskontekst?',
        choices: [
          { id: 'a', text: 'Tid det tar å produsere et produkt' },
          { id: 'b', text: 'Tid fra bestilling til leveranse' },
          { id: 'c', text: 'Tid fra idé til markedslansering' },
          { id: 'd', text: 'Tid fra markedsføring til første salg' },
        ],
        correctId: 'b',
        explanation: 'Lead time er ventetiden kunden opplever — fra de trykker "kjøp" til pakken er i hånden deres.',
      },
      {
        id: 'di-4-2',
        question: 'Hva er 3PL?',
        choices: [
          { id: 'a', text: 'En type distribusjonskanal med tre mellomledd' },
          { id: 'b', text: 'Tredjepartslogistikk — outsourcing av lager og transport til ekstern leverandør' },
          { id: 'c', text: 'Et mål for lead time under tre dager' },
          { id: 'd', text: 'En omnikanal-strategi med tre kanaler' },
        ],
        correctId: 'b',
        explanation: '3PL (Third Party Logistics) betyr at bedriften outsourcer lager, pakking og levering til en spesialist, som Bring eller PostNord.',
      },
      {
        id: 'di-4-3',
        question: 'Amazon Prime endret kundenes forventninger med 2-dagers levering. Hva er konsekvensen for andre nettbutikker?',
        choices: [
          { id: 'a', text: 'De kan ignorere leveringstid siden de ikke konkurrerer med Amazon' },
          { id: 'b', text: 'Kunder forventer nå rask levering fra alle nettbutikker, ikke bare Amazon' },
          { id: 'c', text: 'Leveringstid er blitt mindre viktig for norske kunder' },
          { id: 'd', text: 'Kun store nettbutikker trenger å bekymre seg for lead time' },
        ],
        correctId: 'b',
        explanation: 'Når Amazon setter ny standard, heves kundenes forventninger generelt — alle nettbutikker måles mot den nye normen.',
      },
      {
        id: 'di-4-4',
        question: 'Hvordan kan en nettbutikk redusere sin lead time?',
        choices: [
          { id: 'a', text: 'Ved å selge færre produkter' },
          { id: 'b', text: 'Ved å øke prisen' },
          { id: 'c', text: 'Ved å bruke lokale lagre nærmere kunden og optimere lagerstyring' },
          { id: 'd', text: 'Ved å redusere antall kanaler' },
        ],
        correctId: 'c',
        explanation: 'Lokale lagre nærmere kundene og god lagerstyring (riktig vare på riktig sted) er de viktigste verktøyene for kortere lead time.',
      },
      {
        id: 'di-4-5',
        question: 'Hvilken utfordring møter norske nettbutikker spesielt i konkurransen om leveringshastighet?',
        choices: [
          { id: 'a', text: 'Manglende internettdekning i Norge' },
          { id: 'b', text: 'Vanskeligheter med å konkurrere mot Amazon på leveringshastighet' },
          { id: 'c', text: 'For mange 3PL-aktører i markedet' },
          { id: 'd', text: 'Kunder ønsker ikke rask levering' },
        ],
        correctId: 'b',
        explanation: 'Norske nettbutikker har verken Amazons infrastruktur eller skalafordeler, noe som gjør det vanskelig å matche deres leveringshastighet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🔄',
    title: 'Push vs pull i distribusjon',
    quote: 'Push presser produktet til kunden — pull trekker kunden til produktet',
    practical:
      'Push: produsenten betaler forhandlere for hylleplass og kampanjeeksponering. Pull: markedsføring til forbrukerne som skaper etterspørsel nedover i kjeden. Red Bull kombinerer begge: betaler for hylleplass (push) og bruker ekstremsport-sponsing for å skape merkevare-suging (pull).',
    exercises: [
      {
        id: 'di-5-1',
        question: 'Hva er en push-strategi i distribusjon?',
        choices: [
          { id: 'a', text: 'Markedsføring direkte til forbrukere for å skape etterspørsel' },
          { id: 'b', text: 'Produsenten betaler forhandlere for hylleplass og kampanjeeksponering' },
          { id: 'c', text: 'Kunder drar til butikken og ber om produktet' },
          { id: 'd', text: 'Produktet selges kun på nett' },
        ],
        correctId: 'b',
        explanation: 'Push betyr at produsenten presser produktet nedover i kjeden via incentiver til forhandlere — betaling for hylleplass og kampanjer.',
      },
      {
        id: 'di-5-2',
        question: 'Et selskap satser tungt på TV-reklame og influencer-marketing for å få forbrukere til å etterspørre produktet. Hva er dette?',
        choices: [
          { id: 'a', text: 'Push-strategi' },
          { id: 'b', text: 'Pull-strategi' },
          { id: 'c', text: 'Intensiv distribusjon' },
          { id: 'd', text: '3PL-strategi' },
        ],
        correctId: 'b',
        explanation: 'Pull-strategi skaper etterspørsel hos forbrukerne, som da trekker produktet gjennom distribusjonskjeden ved å etterspørre det hos forhandlere.',
      },
      {
        id: 'di-5-3',
        question: 'Hvordan kombinerer Red Bull push og pull?',
        choices: [
          { id: 'a', text: 'De selger direkte og indirekte samtidig' },
          { id: 'b', text: 'De betaler for hylleplass (push) og sponser ekstremsport for å bygge merkevare (pull)' },
          { id: 'c', text: 'De bruker intensiv distribusjon (push) og eksklusiv distribusjon (pull)' },
          { id: 'd', text: 'De har egne butikker (push) og nettbutikk (pull)' },
        ],
        correctId: 'b',
        explanation: 'Red Bull er et lærebokeksempel: betaler for hylleplass i butikker (push) og bygger et sterkt merkevare gjennom ekstremsport-sponsing som skaper forbrukerefterspørsel (pull).',
      },
      {
        id: 'di-5-4',
        question: 'Hva er fordelen med en pull-strategi fremfor push?',
        choices: [
          { id: 'a', text: 'Rimeligere å gjennomføre' },
          { id: 'b', text: 'Forhandlere er mer motiverte til å selge produktet når kunder aktivt etterspør det' },
          { id: 'c', text: 'Krever færre distribusjonsledd' },
          { id: 'd', text: 'Fungerer bedre for dagligvarer' },
        ],
        correctId: 'b',
        explanation: 'Når forbrukerne etterspør produktet, er forhandlerne motiverte til å ha det på lager — det reduserer behovet for kostbare forhandlerincentiver.',
      },
      {
        id: 'di-5-5',
        question: 'Hvilken situasjon passer push-strategi best for?',
        choices: [
          { id: 'a', text: 'Sterke merkevarer med stor forbrukerkjennskap' },
          { id: 'b', text: 'Nye produkter som trenger å komme inn i butikkhyllene' },
          { id: 'c', text: 'Eksklusivt distribuerte luksusprodukter' },
          { id: 'd', text: 'Kun digitale produkter' },
        ],
        correctId: 'b',
        explanation: 'Nye produkter uten etablert forbrukerkjennskap trenger push for å i det hele tatt komme på hyllen — forhandlere tar ikke inn ukjente produkter uten incentiver.',
      },
    ],
  },
]

export default function DistribusjonModule() {
  return (
    <DrawerModule
      moduleCode="MFI-DIST"
      moduleTitle="Distribusjon"
      moduleIcon="🚚"
      storageKey="learning-mfi-distribusjon"
      completeRoute="/learning/mfi/distribusjon/complete"
      phases={PHASES}
      intro="Et godt produkt til riktig pris er verdiløst om det ikke når kunden. Distribusjon handler om å velge riktig vei fra produsent til forbruker — og den valgte veien kommuniserer like mye om merkevaren som reklamen gjør. Rolex og Coca-Cola selger begge globalt, men på helt ulike måter."
      vissteduAt="Distribusjonskostnader utgjør i snitt 10–30% av et produkts totale kostnad. For dagligvarer kan distribusjonen koste mer enn selve produksjonen."
      espenSier="Neste gang du handler på nett, tenk over alle leddene produktet har gått gjennom for å nå deg: produsent, grossist, lager, budtjeneste. Hvert ledd tar sin del — det er derfor nettpriser ikke alltid er mye billigere enn i butikk."
      presentationLink={{ route: '/learning/presentations/distribusjon', description: 'Distribusjon — direkte/indirekte, distribusjonsgrad og omnikanal' }}
    />
  )
}
