import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📣',
    title: 'Kampanjeutvikling — Å nå igjennom i en travel hverdag',
    quote: '«Du konkurrerer ikke med konkurrentene dine — du konkurrerer med alt som krever oppmerksomhet.»',
    content: 'En markedsføringskampanje er en koordinert, tidsbegrenset innsats for å oppnå et spesifikt markedsføringsmål. I dag er konkurransen om oppmerksomhet knivskarp — riktig budskap, riktig kanal og riktig timing er avgjørende.',
    subpoints: [
      { label: 'Definisjon', text: 'En kampanje er koordinert kommunikasjon med klart mål, tidsramme og budsjett.' },
      { label: 'Datadrevet tilnærming', text: 'Moderne kampanjer bygger på data om forbrukeratferd, ikke magefølelse.' },
      { label: 'Multikanal', text: 'Konsistent budskap på tvers av relevante kanaler øker effekten.' },
    ],
    practical: 'Tenk på den siste reklamen du faktisk husker. Hva gjorde den minneverdig? Kanal? Budskap? Timing?',
    exercises: [
      {
        id: 'MK1-1',
        icon: '📣',
        title: 'Hva er en kampanje?',
        question: 'Hva skiller en markedsføringskampanje fra vanlig løpende markedsføring?',
        choices: [
          { id: 'a', label: 'En kampanje bruker sosiale medier, vanlig markedsføring gjør ikke det', isCorrect: false, feedback: 'Begge kan bruke sosiale medier. Kanal er ikke det som definerer en kampanje.' },
          { id: 'b', label: 'En kampanje er tidsbegrenset med et spesifikt mål og koordinert innsats, i motsetning til kontinuerlig løpende aktivitet', isCorrect: true, feedback: 'Riktig! En kampanje har start, slutt, klart mål (øke salg med 20 %, lansere nytt produkt) og koordinert budsjett.' },
          { id: 'c', label: 'En kampanje er dyrere og med høyere produksjonskvalitet', isCorrect: false, feedback: 'Budsjett og kvalitet varierer enormt. Definisjonsmessig er det målet og koordineringen som skiller.' },
        ],
        espenTip: 'En god kampanje har alltid: klart mål, definert målgruppe, passende kanaler, og en konkret evalueringsmetrikk.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🧠',
    title: 'Forbrukeratferd — Hvorfor kjøper folk?',
    quote: '«Kunden tror de handler rasjonelt. Hjerneforskerne vet bedre.»',
    content: 'Forbrukeratferd studerer prosessene folk går gjennom når de velger, kjøper, bruker og kvitter seg med produkter. Det er påvirket av interne faktorer (motivasjon, holdninger) og eksterne faktorer (kultur, sosiale grupper).',
    subpoints: [
      { label: 'Kjøpsprosessen', text: 'Behovserkjennelse → Informasjonssøk → Vurdering → Kjøp → Ettersalg.' },
      { label: 'Interne faktorer', text: 'Motivasjon, holdninger, livsstil, verdier, personlighet.' },
      { label: 'Sosiale faktorer', text: 'Kultur, referansegrupper (familie, venner, influensere), sosial klasse.' },
      { label: 'Situasjonsfaktorer', text: 'Tid, humør, sted, tilgjengelig penger.' },
    ],
    practical: 'Beskriv din siste impulsive kjøpsbeslutning. Hvilke faktorer påvirket deg?',
    exercises: [
      {
        id: 'MK2-1',
        icon: '🧠',
        title: 'Referansegrupper',
        question: 'En 16-åring kjøper den samme skomodellen som vennegjengen. Hvilken faktor påvirker kjøpet?',
        choices: [
          { id: 'a', label: 'Motivasjon — personen er motivert til å kjøpe sko', isCorrect: false, feedback: 'Motivasjon er bredere. Den spesifikke påvirkningen her er mer presis.' },
          { id: 'b', label: 'Referansegruppen (venner) — sosial påvirkning fra jevnaldrende', isCorrect: true, feedback: 'Riktig! Referansegrupper er mennesker vi identifiserer oss med som påvirker våre holdninger og kjøpsatferd. For ungdom er venner en av de sterkeste påvirkningskildene.' },
          { id: 'c', label: 'Kultur — norsk ungdomskultur', isCorrect: false, feedback: 'Kultur er en bakgrunnsfaktor, men den direkte påvirkningen er referansegruppen (vennene).' },
        ],
        espenTip: 'Referansegrupper er en av de kraftigste driverne bak kjøp — det er grunnen til at influensermarkedsføring er så effektiv.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🤝',
    title: 'Influensermarkedsføring — Troverdige tredjeparter',
    quote: '«Folk stoler mer på en person de liker enn på en bedrift de kjenner.»',
    content: 'Influensermarkedsføring bruker enkeltpersoner med en dedikert tilhengerskare til å markedsføre produkter. Troverdigheten kommer fra at influenseren er en uavhengig tredjepart — ikke avsender direkte.',
    subpoints: [
      { label: 'Mega-influensere', text: 'Over 1 million følgere. Stor rekkevidde, lav engasjementsrate.' },
      { label: 'Makro-influensere', text: '100k–1M. God balanse mellom rekkevidde og engasjement.' },
      { label: 'Mikro-influensere', text: '1k–100k. Høy engasjementsrate, svært troverdig i nisjemarkedet.' },
      { label: 'Nano-influensere', text: 'Under 1000. Lokal troverdighet, koster lite, men smal rekkevidde.' },
    ],
    practical: 'Du skal markedsføre en ny outdoor-tur i Lofoten med begrenset budsjett. Hvilken type influenser velger du og hvorfor?',
    exercises: [
      {
        id: 'MK3-1',
        icon: '🤝',
        title: 'Influensertyper',
        question: 'Et norsk reiselivs-startup med lite budsjett vil nå ivrige friluftsentusiaster. Hvilken influenser er mest kostnadseffektiv?',
        choices: [
          { id: 'a', label: 'En mega-influenser med 2 millioner følgere for maksimal rekkevidde', isCorrect: false, feedback: 'Mega-influensere er dyre og har lav engasjementsrate. For en nisje som friluftsliv er mikro-influensere mer kostnadseffektive.' },
          { id: 'b', label: 'Flere mikro-influensere (5–50k følgere) med sterk profil innen friluftsliv og høy engasjementsrate', isCorrect: true, feedback: 'Riktig! Mikro-influensere er billigere, mer troverdige i sin nisje og har høyere engasjementsrate enn mega-influensere. For et startup er dette den optimale tilnærmingen.' },
          { id: 'c', label: 'Ingen influensere — sosiale medier er mer effektivt', isCorrect: false, feedback: 'Organisk rekkevidde på sosiale medier er kraftig begrenset uten annonsebudsjettet. Influensere gir raskere tilgang til riktig målgruppe.' },
        ],
        espenTip: 'Husk: Engasjementsrate (likes + kommentarer / følgere) er viktigere enn antall følgere. En mikro-influenser med 10 % engasjement er mer verdifull enn en mega-influenser med 0,5 %.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '📱',
    title: 'Kanalvalg — Riktig budskap på riktig kanal',
    quote: '«Det er ikke nok å ha riktig budskap — det må leveres i riktig kanal til riktig tid.»',
    content: 'Ulike kanaler når ulike målgrupper med ulik effekt. Kanalvalg er en av de viktigste beslutningene i en kampanje — en feilrettet kanal sløser bort budsjettet.',
    subpoints: [
      { label: 'TV/radio', text: 'Bred rekkevidde, passiv mottakelse, høy kostnad, svak målretting.' },
      { label: 'Google Ads / søk', text: 'Treffer folk aktivt søkende etter et behov. Svært høy intensjon.' },
      { label: 'Facebook/Instagram', text: 'Bred demografi, sterk bildebasert kommunikasjon, Reels-format vekster.' },
      { label: 'TikTok', text: 'Under 30, høy engasjementsrate, videoformat, viral potensial.' },
      { label: 'E-post', text: 'Eksisterende kunder, personalisering, høy ROI, lav kostnad per konvertering.' },
    ],
    practical: 'Kanalplan: Du skal markedsføre "Fjellfestival i Hemsedal" for tre ulike segmenter: familier (40+), unge voksne (20–30), aktive pensjonister. Hvilke kanaler bruker du for hvem?',
    exercises: [
      {
        id: 'MK4-1',
        icon: '📱',
        title: 'Riktig kanal',
        question: 'En kaffebrenner vil nå kaffeligenter mellom 25–40 år i Oslo. Hvilke to kanaler er mest effektive?',
        choices: [
          { id: 'a', label: 'Nasjonal TV og riksdekkende avis', isCorrect: false, feedback: 'TV og riksavis er for brede — de treffer mange utenfor målgruppen og er for dyre for en smal nisje.' },
          { id: 'b', label: 'Instagram (visuell, urban demografi) og Google Ads (fanger de aktivt søkende etter kaffe)', isCorrect: true, feedback: 'Riktig! Instagram treffer urban, visuell demografisk gruppe. Google Ads fanger de som allerede søker etter "spesialkaffe Oslo". Kombinasjonen er kostnadseffektiv.' },
          { id: 'c', label: 'TikTok og Snap', isCorrect: false, feedback: 'TikTok og Snap er dominert av under-25 demografi. For 25–40-åringer er Instagram og Google bedre valg.' },
        ],
        espenTip: 'Kanalvalg = match mellom målgruppens medievaner og kanalens styrker. Begynn alltid med: "Hvor er målgruppen min?"',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📊',
    title: 'Datadriven kampanje — Målretting og evaluering',
    quote: '«Halvparten av reklamebudsjettet er bortkastet — problemet er å vite hvilken halvdel.»',
    content: 'Moderne digitale kanaler gir mulighet for presis målretting og nær-sanntidsevaluering. Konverteringsrate og kostnad per klikk (CPC) er nøkkelmetrikker.',
    subpoints: [
      { label: 'Mikromålretting', text: 'Facebook-annonser kan målrettes på alder, sted, interesser, atferd — nesten kirurgisk presist.' },
      { label: 'A/B-testing', text: 'Test to versjoner av en annonse parallelt — behold den som konverterer best.' },
      { label: 'Konverteringsrate', text: 'Andelen som utfører ønsket handling (klikk, kjøp) av de eksponerte.' },
      { label: 'CPC (kostnad per klikk)', text: 'Hva betaler du for hvert klikk på annonsen? Lavere er bedre.' },
      { label: 'ROAS (return on ad spend)', text: 'Inntekter generert per krone brukt på annonser.' },
    ],
    practical: 'En annonse ble vist 10 000 ganger, 200 klikket, og 10 kjøpte. Hva er klikkraten og konverteringsraten?',
    exercises: [
      {
        id: 'MK5-1',
        icon: '📊',
        title: 'Kampanjemetrikk',
        question: 'En kampanje brukte 5 000 kr og genererte 20 000 kr i salg. Hva er ROAS?',
        choices: [
          { id: 'a', label: '4 — for hver krone brukt fikk bedriften 4 kr tilbake', isCorrect: true, feedback: 'Riktig! ROAS = Inntekter / Annonsebudsjett = 20 000 / 5 000 = 4. En ROAS over 3 anses generelt som god.' },
          { id: 'b', label: '15 000 kr — fortjenesten', isCorrect: false, feedback: '15 000 er fortjenesten i kroner (20 000 − 5 000). ROAS er et forholdstall, ikke et kronebeløp.' },
          { id: 'c', label: '25 % — andelen av inntektene som gikk til annonser', isCorrect: false, feedback: '25 % er annonsekostnaden som andel av inntekter (5 000 / 20 000). Det er et annet nøkkeltall, ikke ROAS.' },
        ],
        espenTip: 'ROAS = Inntekter / Annonsebudsjett. ROAS på 4 betyr 4 kr tilbake for hver investerte krone.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🚢',
    title: 'Hurtigruten — Google Ads internasjonalt',
    quote: '«Snakk til folk på det språket de søker — ikke det du foretrekker.»',
    content: 'Hurtigruten bruker Google Ads internasjonalt for å nå kunder som søker aktivt etter opplevelser. De annonserer på søkeord som "Polarlichter Norwegen" for tyske turister — på tysk, ikke norsk.',
    subpoints: [
      { label: 'Høy kjøpsintensjon', text: 'Søkeord-annonser treffer folk som aktivt leter — de er allerede i kjøpsmodus.' },
      { label: 'Lokalisering', text: 'Annonser på søkerens eget språk og med lokale referanser øker klikkraten dramatisk.' },
      { label: 'Long-tail søkeord', text: 'Spesifikke søkeord ("nordlys cruise fra Tromsø") konverterer bedre enn brede ord.' },
      { label: 'Budsjettfleksibilitet', text: 'Google Ads kan skaleres opp og ned basert på sesong og resultater.' },
    ],
    practical: 'Lag fem Google Ads søkeord for en norsk fjord-cruise for britiske turister.',
    exercises: [
      {
        id: 'MK6-1',
        icon: '🚢',
        title: 'Søkeordsannonsering',
        question: 'Hvorfor annonserer Hurtigruten på søkeord som "Polarlichter Norwegen" (tysk) fremfor bare "Northern Lights Norway" (engelsk)?',
        choices: [
          { id: 'a', label: 'Fordi tyske turister ikke søker på engelsk', isCorrect: false, feedback: 'Mange søker på begge, men søk på eget morsmål er mye vanligere og konverterer bedre.' },
          { id: 'b', label: 'Fordi annonsering på morsmålet er langt mer troverdig og relevant — og dermed billigere og mer konverterende', isCorrect: true, feedback: 'Riktig! Søk på eget språk er mer naturlig, og annonsene på samme språk oppleves som mer relevante. I tillegg er konkurransen om tyske søkeord lavere, noe som gir lavere CPC.' },
          { id: 'c', label: 'Fordi Google Ads krever at man annonserer på søkerens eget språk', isCorrect: false, feedback: 'Google krever det ikke, men det er best-practice av ytelsesgrunner.' },
        ],
        espenTip: 'Lokaliserte annonser konverterer bedre. Snakk til kunden på deres eget språk og med referanser til det de kjenner.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🎽',
    title: 'XXL Sport — Ulike kanaler til ulike segmenter',
    quote: '«Samme produkt, ulikt budskap, ulik kanal, ulik målgruppe.»',
    content: 'XXL Sport kjører "Back to school"-kampanjer med ulik kanalstrategi for to segmenter: Facebook for foreldre (kjøpsbesluttakere), TikTok for ungdom (brukerne). Budskapet er ulikt, men produktet er det samme.',
    subpoints: [
      { label: 'For foreldre (Facebook)', text: 'Fokus på pris, kvalitet, praktisk innkjøp. Bilde-annonser med tydelig CTA.' },
      { label: 'For ungdom (TikTok)', text: 'Fokus på stil, community, drikkevarer. Viral video med trend-lyd.' },
      { label: 'Målgruppevalidering', text: 'Facebook-demografien er 30–50 år. TikTok er dominert av 13–25 år.' },
      { label: 'Koordinert lansering', text: 'Begge kampanjer kjøres parallelt for å treffe kjøpsbeslutningen.' },
    ],
    practical: 'Designen en kampanje for treningssko med ulike annonser for tre segmenter: skolebarn, studenter og aktive pensjonister.',
    exercises: [
      {
        id: 'MK7-1',
        icon: '🎽',
        title: 'Segmentbasert kanalstrategi',
        question: 'Hvorfor bruker XXL ulike kanaler for foreldre og ungdom i samme kampanje?',
        choices: [
          { id: 'a', label: 'For å spare penger ved å ikke kjøpe dyre TV-spots', isCorrect: false, feedback: 'Kanaldifferensiering handler om effektivitet, ikke primært om kostnadsbesparelser.' },
          { id: 'b', label: 'Fordi de to segmentene har ulike medievaner og responds ulikt på budskap', isCorrect: true, feedback: 'Riktig! Foreldres medievaner (Facebook) og tenåringers medievaner (TikTok) er fundamentalt ulike. Riktig kanal til riktig segment gir høyere konvertering.' },
          { id: 'c', label: 'Fordi loven krever ulik reklame til ulike aldersgrupper', isCorrect: false, feedback: 'Det er ingen slik lov. Det er en strategisk valg basert på mediaatferd.' },
        ],
        espenTip: 'En kampanje bør aldri prøve å nå "alle" i samme kanal. Segmenter målgruppen og tilpass kanal + budskap for hvert segment.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '⚠️',
    title: 'Misforståelse — "Likes" er ikke salg',
    quote: '«Å ha 100 000 følgere som aldri kjøper er verdien av null.»',
    content: 'Den vanligste feilen i digital markedsføring er å fokusere på "forfengelighetsmetrikker" — antall likes, følgere og kommentarer — fremfor konverteringsdata som faktisk påvirker bunnlinjen.',
    subpoints: [
      { label: 'Forfengelighetsmetrikk', text: 'Likes, følgere, visninger — ser bra ut, men sier ingenting om salgspåvirkning.' },
      { label: 'Konverteringsmetrikk', text: 'Kjøp, registreringer, bookinger, nedlastinger — faktisk handling.' },
      { label: 'Engasjementsrate', text: 'Engasjement / følgere × 100. Bedre mål enn absolutt antall likes.' },
      { label: 'Attribusjon', text: 'Hvilken kanal og hvilken annonse bidro faktisk til kjøpet?' },
    ],
    practical: 'En kampanje fikk 50 000 likes men bare 10 salg. En annen fikk 500 likes men 200 salg. Hvilken var mer effektiv?',
    exercises: [
      {
        id: 'MK8-1',
        icon: '⚠️',
        title: 'Forfengelighetsmetrikk',
        question: 'En influenserkampanje genererte 100 000 visninger og 8 000 likes. Salgsdataen viser 12 faktiske kjøp. Hva er det viktigste å vurdere?',
        choices: [
          { id: 'a', label: '100 000 visninger er imponerende og kampanjen var vellykket', isCorrect: false, feedback: 'Visninger og likes er forfengelighetsmetrikker. Det kritiske spørsmålet er om kampanjen var lønnsom.' },
          { id: 'b', label: 'Om 12 kjøp rettferdiggjør kostnaden av kampanjen — og om konverteringsraten kan forbedres', isCorrect: true, feedback: 'Riktig! Det som betyr noe er kostnad vs. inntekt fra de 12 salgene. Var det lønnsomt? Hva er konverteringsraten, og hva kan forbedres?' },
          { id: 'c', label: 'Om influenseren hadde for lav engasjementsrate', isCorrect: false, feedback: 'Engasjementsrate er relevant, men den primære vurderingen er om kampanjen var lønnsom.' },
        ],
        espenTip: 'Fokuser alltid på: Kostnad per konvertering, ROAS, og Customer Acquisition Cost — ikke på likes og visninger.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — Markedsføringsloven og reklameregler',
    quote: '«Reklame skal være synlig som reklame.»',
    content: 'Markedsføringsloven regulerer all kommersiell kommunikasjon i Norge. Reglene er særlig strenge for markedsføring rettet mot barn og for merking av influenserinnhold.',
    subpoints: [
      { label: 'Skjult reklame er forbudt', text: 'All betalt markedsføring skal tydelig merkes med "Annonse", "Reklame" eller "Sponset".' },
      { label: 'Influensere plikter å merke', text: 'Forbrukertilsynet håndhever dette aktivt mot norske influensere.' },
      { label: 'Barnevern', text: 'Skjult markedsføring mot barn er strengt forbudt. Under 18 år = ekstra vern.' },
      { label: 'Villedende reklame', text: 'Påstander i reklame må være sanne og ikke gi feilaktig inntrykk.' },
    ],
    practical: 'En norsk influenser poste en "dagdrøm om Paris" med en klespakke i bildet uten reklamemerknad. Hva er problemet?',
    exercises: [
      {
        id: 'MK9-1',
        icon: '⚖️',
        title: 'Reklameregler',
        question: 'Hva er konsekvensen for en influenser som gjentatte ganger ikke merker betalt innhold med "Annonse"?',
        choices: [
          { id: 'a', label: 'Ingenting — Forbrukertilsynet har ikke ressurser til å kontrollere alle', isCorrect: false, feedback: 'Feil — Forbrukertilsynet følger aktivt opp, spesielt etter klager. Overtredelsesgebyr kan ilegges.' },
          { id: 'b', label: 'Pålegg om å rette forholdet og eventuelt overtredelsesgebyr fra Forbrukertilsynet', isCorrect: true, feedback: 'Riktig! Forbrukertilsynet kan gi pålegg, tvangsmulkt og overtredelsesgebyr. Gjentatte brudd øker risikoen betydelig.' },
          { id: 'c', label: 'Tap av følgere — det sosiale "straff" er strengere enn myndighetenes', isCorrect: false, feedback: 'Sosial straff kan skje, men myndighetenes reaksjoner er juridisk bindende og potensielt mer alvorlige.' },
        ],
        espenTip: 'Forbrukertilsynets nettside publiserer saker mot influensere. Reklamemerking er ikke valgfritt.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Oppsummering — Riktig budskap, riktig kanal',
    quote: '«Den beste kampanjen er den riktige kunden finner relevant på riktig tidspunkt.»',
    content: 'Effektiv markedsføring handler om forståelse av målgruppen, valg av riktig kanal, datadrevet optimering og måling av faktiske konverteringer — ikke forfengelighetsmetrikker.',
    subpoints: [
      { label: 'Forbrukeratferd', text: 'Forstå hva som driver kjøpsbeslutningen — kultur, referansegrupper, motivasjon.' },
      { label: 'Kanalvalg', text: 'Match kanalen til målgruppens medievaner.' },
      { label: 'Konvertering fremfor likes', text: 'Mål det som betyr noe: kjøp, bookinger, leads.' },
      { label: 'Lovkrav', text: 'All betalt innhold skal merkes — influensere og bedrifter.' },
    ],
    practical: 'Lag en komplett kampanjeplan for å nå 20–35 åringer til en norsk festival. Inkluder: mål, kanaler, budsjett, og suksesskriterier.',
    exercises: [
      {
        id: 'MK10-1',
        icon: '🎯',
        title: 'Kampanjeforståelse',
        question: 'En kampanje for fjelltur-utstyr har ROAS = 2, mens kravet for lønnsomhet er ROAS = 3. Hva bør bedriften gjøre?',
        choices: [
          { id: 'a', label: 'Avslutte kampanjen umiddelbart — den er tapsgivende', isCorrect: false, feedback: 'ROAS 2 betyr 2 kr inntekt per investerte krone, ikke tap. Men det er under kravet. Tiltak bør vurderes, ikke avslutning.' },
          { id: 'b', label: 'A/B-teste annonser, justere kanalvalg og målgruppe for å forbedre konverteringsraten', isCorrect: true, feedback: 'Riktig! Diagnosen er at kampanjen underleverer. Løsningen er optimering: test nytt budskap, smal inn målgruppen, bytt kanal eller tidspunkt.' },
          { id: 'c', label: 'Øke budsjettet for å skaffe flere visninger', isCorrect: false, feedback: 'Å øke budsjettet uten å fikse konverteringsraten vil bare gi et større tap.' },
        ],
        espenTip: 'Husk: mer budsjett × dårlig konverteringsrate = større tap. Fiks konverteringen FØRST — deretter skaler.',
      },
    ],
  },
]

export default function MarkedsforingskampanjerModule() {
  return (
    <DrawerModule
      moduleCode="MK-VG2-5"
      moduleTitle="Markedsføringskampanjer"
      moduleIcon="📣"
      storageKey="learning-vg2-markedsforingskampanjer"
      completeRoute="/learning/vg2/kommunikasjon/markedsforingskampanjer/complete"
      phases={phases}
      intro="Fra forbrukeratferd til kanalvalg — lær å bygge datadrevne kampanjer og mål det som faktisk teller: konverteringer, ikke likes."
      vissteduAt="En typisk Facebook-bruker ser over 1 500 mulige innlegg hver dag. Algoritmene viser bare ~150 av dem. Det betyr at du konkurrerer med tusenvis av andre for oppmerksomheten."
      espenSier="Likes er ego-boost, ikke business-impact. Fokuser på konverteringsraten og ROAS — det er der pengene vises."
      presentationLink={{ route: '/learning/presentations/markedsforingskampanjer', description: 'Markedsføringskampanjer — en visuell presentasjon' }}
    />
  )
}
