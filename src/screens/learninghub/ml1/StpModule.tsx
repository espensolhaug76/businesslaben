import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🗂️',
    title: 'Segmentering — de fire kriteriene',
    quote: 'Hva gjør en god segmentering?',
    content: 'Et segment er BARE nyttig hvis det er målbart, tilgjengelig, lønnsomt, differensierbart og handlingsbart. De beste segmenteringene kombinerer FLERE kriterier — demografisk, geografisk, psykografisk og adferdsbasert.',
    subpoints: [
      'GEOGRAFISK: Land, region, by, klima — Burger King tilpasser meny etter land',
      'DEMOGRAFISK: Alder, kjønn, inntekt, utdanning — lettest å måle, men alene sjelden tilstrekkelig',
      'PSYKOGRAFISK: Livsstil, verdier, personlighet — Spotify bruker musikk-psykografi',
      'ADFERDSBASERT: Kjøpsfrekvens, lojalitetsstatus, bruksanledning — Amazon identifiserer heavy buyers',
    ],
    practical: 'Nikes segment "urban mannlig 18–35 som trener aktivt og følger basketball" = demografisk + geografisk + adferd.',
    glossaryTerm: 'Segmentering',
    exercises: [
      {
        id: 'st-1-1',
        question: 'Hva er segmentering i markedsføring?',
        choices: [
          { id: 'a', text: 'Å dele markedet inn i grupper med like behov og kjennetegn' },
          { id: 'b', text: 'Å sette pris på produkter for ulike markeder' },
          { id: 'c', text: 'Å velge kommunikasjonskanaler for reklame' },
          { id: 'd', text: 'Å analysere konkurrentenes strategier' },
        ],
        correctId: 'a',
        explanation: 'Segmentering betyr å dele markedet inn i grupper (segmenter) av forbrukere som har like behov, kjennetegn eller atferd — for å kunne tilpasse tilbudet til hvert segment.',
      },
      {
        id: 'st-1-2',
        question: 'Burger King tilpasser menyen etter land (India vegetarisk, Japan teriyaki). Dette er...',
        choices: [
          { id: 'a', text: 'Demografisk segmentering' },
          { id: 'b', text: 'Geografisk segmentering' },
          { id: 'c', text: 'Psykografisk segmentering' },
          { id: 'd', text: 'Adferdsbasert segmentering' },
        ],
        correctId: 'b',
        explanation: 'Å tilpasse produkter etter land eller region er geografisk segmentering — man tar hensyn til geografiske faktorer som kultur, klima og lokale preferanser.',
      },
      {
        id: 'st-1-3',
        question: 'Hva er psykografisk segmentering?',
        choices: [
          { id: 'a', text: 'Segmentering basert på alder og kjønn' },
          { id: 'b', text: 'Segmentering basert på livsstil, verdier og personlighet' },
          { id: 'c', text: 'Segmentering basert på kjøpsfrekvens' },
          { id: 'd', text: 'Segmentering basert på geografisk plassering' },
        ],
        correctId: 'b',
        explanation: 'Psykografisk segmentering deler markedet basert på livsstil, verdier, personlighet og interesser — det handler om hvem folk er og hva de tror på, ikke bare demografiske fakta.',
      },
      {
        id: 'st-1-4',
        question: 'Amazon identifiserer «heavy buyers» via kjøpsdata og gir dem Prime-fordeler. Dette er...',
        choices: [
          { id: 'a', text: 'Psykografisk segmentering' },
          { id: 'b', text: 'Geografisk segmentering' },
          { id: 'c', text: 'Adferdsbasert segmentering' },
          { id: 'd', text: 'Demografisk segmentering' },
        ],
        correctId: 'c',
        explanation: 'Adferdsbasert segmentering bruker faktisk kjøpsatferd — kjøpsfrekvens, lojalitetsstatus, bruksanledning — for å identifisere og betjene segmenter.',
      },
      {
        id: 'st-1-5',
        question: 'Hva kjennetegner et GODT segment?',
        choices: [
          { id: 'a', text: 'Det må være størst mulig' },
          { id: 'b', text: 'Det må være målbart, tilgjengelig, lønnsomt, differensierbart og handlingsbart' },
          { id: 'c', text: 'Det må ha kun én demografisk kjennetegn' },
          { id: 'd', text: 'Det må bestå av premium-kunder' },
        ],
        correctId: 'b',
        explanation: 'Et godt segment er målbart (kan kvantifiseres), tilgjengelig (kan nås med markedsføring), lønnsomt (stort nok), differensierbart (reagerer annerledes) og handlingsbart (kan betjenes).',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🎯',
    title: 'Valg av målgruppe — tre strategier',
    quote: 'Nå alle, noen, eller én?',
    content: 'Etter segmentering velger bedriften hvilke segmenter den vil henvende seg til. Tre strategier: udifferensiert (én kampanje til alle), differensiert (ulike tilbud til ulike segmenter) og niche/konsentrert (alt fokus på ett smalt segment).',
    subpoints: [
      'UDIFFERENSIERT: Én kampanje til alle — fungerer best for universelle produkter som salt og bensin',
      'DIFFERENSIERT: Ulike tilbud til ulike segmenter — Mercedes A-klasse, E-klasse, G-klasse',
      'NICHE (KONSENTRERT): ALL ressurs fokusert på ett smalt segment — Ferrari kun for ultra-rike kjøreentusiaster',
    ],
    practical: 'Tine Lettmelk (helse-bevisste) og Tine Seterrømme (mat-interesserte) = differensiert strategi mot to segmenter.',
    glossaryTerm: 'Targeting',
    exercises: [
      {
        id: 'st-2-1',
        question: 'Hva er en differensiert målgruppestrategi?',
        choices: [
          { id: 'a', text: 'Én kampanje som treffer alle segmenter likt' },
          { id: 'b', text: 'Ulike tilbud og kampanjer tilpasset ulike segmenter' },
          { id: 'c', text: 'Alt fokus på ett smalt, lønnssomt segment' },
          { id: 'd', text: 'Å ikke ha noen spesifikk målgruppe' },
        ],
        correctId: 'b',
        explanation: 'Differensiert strategi betyr å lage ulike tilbud og kommunikasjon tilpasset ulike segmenter — dyrt å gjennomføre, men svært effektivt fordi hvert segment føler budskapet er laget for dem.',
      },
      {
        id: 'st-2-2',
        question: 'Ferrari fokuserer globalt kun på ultra-rike kjøreentusiaster. Hvilken strategi er dette?',
        choices: [
          { id: 'a', text: 'Udifferensiert strategi' },
          { id: 'b', text: 'Differensiert strategi' },
          { id: 'c', text: 'Niche/konsentrert strategi' },
          { id: 'd', text: 'Global massemarkedsstrategi' },
        ],
        correctId: 'c',
        explanation: 'Ferrari bruker niche/konsentrert strategi — alle ressurser fokuseres på ett svært smalt, lønnssomt segment. Fordelen er dyp forståelse; risikoen er total avhengighet av dette segmentet.',
      },
      {
        id: 'st-2-3',
        question: 'Hva er ulempen med udifferensiert strategi?',
        choices: [
          { id: 'a', text: 'Den er dyr å gjennomføre' },
          { id: 'b', text: 'Den treffer alle segmenter dårlig — ingen føler seg spesielt adressert' },
          { id: 'c', text: 'Den krever for mye markedsanalyse' },
          { id: 'd', text: 'Den er vanskelig å måle' },
        ],
        correctId: 'b',
        explanation: 'Udifferensiert strategi er billig og enkel, men treffer alle segmenter dårlig fordi budskapet er laget for ingen spesielt — ingen føler at kommunikasjonen er rettet mot dem.',
      },
      {
        id: 'st-2-4',
        question: 'Hva betyr det at Rema 1000 «aktivt velger bort» gourmet-segmentet?',
        choices: [
          { id: 'a', text: 'De selger ikke mat av høy kvalitet' },
          { id: 'b', text: 'De har bevisst valgt å ikke henvende seg til dette segmentet' },
          { id: 'c', text: 'De har ikke råd til å markedsføre mot gourmet-kunder' },
          { id: 'd', text: 'Gourmet-kunder er ikke lønnsomme' },
        ],
        correctId: 'b',
        explanation: 'Bevisst ekskludering er like viktig som inkludering. Rema vet at å forsøke å nå gourmet-entusiaster ville svekke deres "enkelt og billig"-posisjonering og forvirre kjernemålgruppen.',
      },
      {
        id: 'st-2-5',
        question: 'Hva er risikoen ved niche/konsentrert strategi?',
        choices: [
          { id: 'a', text: 'For mange kunder å betjene' },
          { id: 'b', text: 'Total avhengighet av ett segment — hvis det endrer seg, faller hele bedriften' },
          { id: 'c', text: 'For lav lønnsomhet per kunde' },
          { id: 'd', text: 'For høye markedsføringskostnader' },
        ],
        correctId: 'b',
        explanation: 'Niche-strategi gir dyp forståelse og sterk posisjon, men bedriften er totalt avhengig av ett segment. Hvis segmentet skrumper eller endrer seg drastisk, har bedriften få alternativer.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📍',
    title: 'Posisjonering — finn din unike plass',
    quote: 'Posisjonering er ikke hva du gjør med produktet — det er hva du gjør med kundens hjerne',
    content: 'Effektiv posisjonering er konsistent, troverdig, differensiert og relevant. Verdiforslaget er en klar uttalelse om hvilken verdi du leverer og hvorfor du er bedre. Et perceptual map viser tomme hvite flekker — muligheter for ny posisjonering.',
    subpoints: [
      'VERDIFORSLAG: Klar uttalelse om verdi, til hvem, og hvorfor bedre enn alternativet (Volvo: "Sikkerhet for familien")',
      'REPOSITIONERING: Endre markedsposisjon — Old Spice fra bestefars deodorant til viral ungdomshumor (omsetning doblet)',
      'PERCEPTUAL MAP: Kart over hvordan kunder oppfatter konkurrenter — den tomme hvite flekken er en mulighet',
    ],
    practical: 'Volvo eier "sikkerhet". BMW eier "kjøreglede". Mercedes eier "prestige". Hvert merke eier ett ord i kundens sinn.',
    glossaryTerm: 'Posisjonering',
    exercises: [
      {
        id: 'st-3-1',
        question: 'Hva er posisjonering i markedsføring?',
        choices: [
          { id: 'a', text: 'Å bestemme prisen på et produkt' },
          { id: 'b', text: 'Å skape et distinkt bilde av merkevaren i kundens bevissthet' },
          { id: 'c', text: 'Å velge geografisk plassering av butikker' },
          { id: 'd', text: 'Å utvikle nye produkter' },
        ],
        correctId: 'b',
        explanation: 'Posisjonering handler om å skape et klart, distinkt og ønsket bilde av merkevaren i målgruppens bevissthet — i forhold til konkurrentene.',
      },
      {
        id: 'st-3-2',
        question: 'Volvo er i over 40 år konsekvent assosiert med "sikkerhet". Hva kalles dette?',
        choices: [
          { id: 'a', text: 'Merkevaresegmentering' },
          { id: 'b', text: 'Sterk og konsistent posisjonering' },
          { id: 'c', text: 'Differensiert targeting' },
          { id: 'd', text: 'Produkt-posisjonering i BCG' },
        ],
        correctId: 'b',
        explanation: 'Volvo er et eksempel på sterk og konsistent posisjonering — «sikkerhet for familien» er konsistent, troverdig og differensiert fra konkurrentene i over 40 år.',
      },
      {
        id: 'st-3-3',
        question: 'Hva er repositionering?',
        choices: [
          { id: 'a', text: 'Å bytte målgruppe uten å endre produktet' },
          { id: 'b', text: 'Å endre merkevares markedsposisjon — f.eks. Old Spice fra bestefars til unge menn' },
          { id: 'c', text: 'Å flytte produktene til nye geografiske markeder' },
          { id: 'd', text: 'Å endre distribusjonsstrategi' },
        ],
        correctId: 'b',
        explanation: 'Repositionering betyr å endre merkevarens posisjon i markedet. Old Spice gikk fra «bestefars deodorant» til viral ungdomshumor — omsetningen doblet seg på ett år.',
      },
      {
        id: 'st-3-4',
        question: 'Hva er et perceptual map?',
        choices: [
          { id: 'a', text: 'Et kart over distribusjonskanalene' },
          { id: 'b', text: 'Et geografisk kart over kundenes plassering' },
          { id: 'c', text: 'En visuell fremstilling av hvordan kunder oppfatter merkevarer på to dimensjoner' },
          { id: 'd', text: 'Et kart over produktsortimentet' },
        ],
        correctId: 'c',
        explanation: 'Et perceptual map visualiserer hvordan kunder oppfatter ulike merker på to dimensjoner (f.eks. pris vs. kvalitet). Den tomme «hvite flekken» er en mulighet for ny posisjonering.',
      },
      {
        id: 'st-3-5',
        question: 'Hva er et verdiforslag?',
        choices: [
          { id: 'a', text: 'En prisgaranti til kundene' },
          { id: 'b', text: 'En klar uttalelse om hvilken verdi du leverer, til hvem, og hvorfor du er bedre enn alternativet' },
          { id: 'c', text: 'En markedsplan for ett år' },
          { id: 'd', text: 'En beskrivelse av produktets tekniske egenskaper' },
        ],
        correctId: 'b',
        explanation: 'Et verdiforslag er en klar, konsist uttalelse som forklarer hvem kunden er, hvilken verdi produktet leverer, og hvorfor det er bedre enn alternativet. Det er kjernen i posisjoneringen.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🧑',
    title: 'Persona — gi målgruppen et ansikt',
    quote: 'Fra statistikk til levende menneske',
    content: 'En persona er en semi-fiktiv representasjon av din ideelle kunde, basert på data og innsikt. En god persona gjør det mulig for hele organisasjonen å ta bedre beslutninger. Like viktig er anti-personaen — hvem du IKKE vil selge til.',
    subpoints: [
      'BYGG EN PERSONA: Navn, foto, demografi, mål, frustrasjoner, medievaner og kjøpsmotivasjon',
      'EKSEMPEL NIKE: «Marte, 32, Oslo, personlig trener, trener 5x/uke, vil ha funksjonelt klær som ser bra ut»',
      'ANTI-PERSONA: Vet hvem du IKKE vil selge til — Rema 1000 vil ikke ha gourmet-entusiaster',
    ],
    practical: '"Skriv til én person, ikke til en statistikk — da treffer du alle som ligner på den personen."',
    glossaryTerm: 'Persona',
    exercises: [
      {
        id: 'st-4-1',
        question: 'Hva er en markedsføringspersona?',
        choices: [
          { id: 'a', text: 'En ekte kunde bedriften har intervjuet' },
          { id: 'b', text: 'En semi-fiktiv representasjon av den ideelle kunden, basert på data' },
          { id: 'c', text: 'En ansatt som representerer kundene internt' },
          { id: 'd', text: 'En juridisk person som representerer kundegruppen' },
        ],
        correctId: 'b',
        explanation: 'En persona er en semi-fiktiv arketyp som representerer et kundisegment — ikke en ekte person, men en datainformert representasjon av en typisk kunde i segmentet.',
      },
      {
        id: 'st-4-2',
        question: 'Hva er hensikten med å gi personaen et navn og bilde?',
        choices: [
          { id: 'a', text: 'For juridiske formål' },
          { id: 'b', text: 'For å gjøre den mer virkelig og menneskelig, slik at hele organisasjonen kan relatere til den' },
          { id: 'c', text: 'For å søke etter eksisterende kunder med det navnet' },
          { id: 'd', text: 'Det er kun for presentasjonsformål' },
        ],
        correctId: 'b',
        explanation: 'Et navn og bilde gjør personaen mer konkret og menneskelig — det er lettere å ta beslutninger for «Marte, 32 år» enn for «kvinner 28–35 i urbane strøk».',
      },
      {
        id: 'st-4-3',
        question: 'Hva er en anti-persona?',
        choices: [
          { id: 'a', text: 'En kunde som har hatt en dårlig opplevelse' },
          { id: 'b', text: 'En beskrivelse av hvem bedriften IKKE ønsker å selge til' },
          { id: 'c', text: 'En negativ beskrivelse av en konkurrents kunde' },
          { id: 'd', text: 'Et segment bedriften har mislyktes med' },
        ],
        correctId: 'b',
        explanation: 'Anti-personaen definerer hvem bedriften IKKE ønsker å nå. Rema 1000s anti-persona er gourmet-entusiaster — å forsøke å nå dem ville svekke Remas "enkelt og billig"-posisjonering.',
      },
      {
        id: 'st-4-4',
        question: 'Hva inkluderes typisk i en persona?',
        choices: [
          { id: 'a', text: 'Kun alder og kjønn' },
          { id: 'b', text: 'Navn, demografi, mål, frustrasjoner, medievaner og kjøpsmotivasjon' },
          { id: 'c', text: 'Kun økonomi og geografisk plassering' },
          { id: 'd', text: 'Kun informasjon om kjøpshistorikk' },
        ],
        correctId: 'b',
        explanation: 'En god persona inkluderer navn og foto, demografi (alder, bosted, yrke), mål og ambisjoner, frustrasjoner (pain points), medievaner og kjøpsmotivasjon.',
      },
      {
        id: 'st-4-5',
        question: 'Forskning viser at markedsføring mot spesifikke personas genererer...',
        choices: [
          { id: 'a', text: 'Likt som generisk massemarkedsføring' },
          { id: 'b', text: '18x mer omsetning enn generisk massemarkedsføring' },
          { id: 'c', text: 'Litt bedre resultater, men ikke signifikant' },
          { id: 'd', text: 'Lavere kostnader men ikke bedre resultater' },
        ],
        correctId: 'b',
        explanation: 'HubSpot har vist at markedsføring rettet mot spesifikke personas genererer 18x mer omsetning enn generisk massemarkedsføring. Bedrifter med klare personas konverterer 2,5x bedre.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🔄',
    title: 'STP i praksis — Rema 1000',
    quote: 'Ett eksempel gjennom hele STP-prosessen',
    content: 'Rema 1000 er et eksempel på konsistent STP i 40+ år. Segmentering: prisfokuserte barnefamilier og unge med tidsklemme. Targeting: aktivt bortvalg av gourmet-segmentet. Posisjonering: "Det enkle er ofte det beste" — færre produkter (350 vs 3 000), raskere handel.',
    subpoints: [
      'STP-REMA: Segmentering → Targeting → Posisjonering henger logisk og strategisk sammen',
      'BEVISST EKSKLUDERING: Rema velger aktivt bort premiumprodukter og gourmet-segmentet',
      'KONSISTENS: 40+ år med konsistent STP har bygget en av Norges sterkeste merkevarer',
    ],
    practical: 'STP er ikke en engangsøvelse — reanalysér hvert 2–3 år. Markedet endrer seg, og posisjoneringen bør følge med.',
    glossaryTerm: 'STP',
    exercises: [
      {
        id: 'st-5-1',
        question: 'Hva er STP-modellen?',
        choices: [
          { id: 'a', text: 'Sales, Trade, Promotion' },
          { id: 'b', text: 'Segmentering, Targeting, Posisjonering' },
          { id: 'c', text: 'Strategy, Tactics, Planning' },
          { id: 'd', text: 'Segment, Target, Price' },
        ],
        correctId: 'b',
        explanation: 'STP står for Segmentering (dele markedet i grupper), Targeting (velge hvilke segmenter) og Posisjonering (skape en distinkt plass i kundens bevissthet).',
      },
      {
        id: 'st-5-2',
        question: 'Rema 1000 har 350 varer mens Meny har 3 000. Hva kommuniserer dette om Remas posisjonering?',
        choices: [
          { id: 'a', text: 'Rema er en liten butikk' },
          { id: 'b', text: 'Rema prioriterer enkelhet og oversikt fremfor bredt utvalg' },
          { id: 'c', text: 'Rema har ikke råd til flere varer' },
          { id: 'd', text: 'Rema selger kun norske produkter' },
        ],
        correctId: 'b',
        explanation: 'Remas smalere sortiment er en strategisk posisjoneringsavgjørelse — «Det enkle er ofte det beste» betyr færre produkter = lettere å handle, raskere, less stress. Det er en styrke, ikke en svakhet.',
      },
      {
        id: 'st-5-3',
        question: 'Hva er Rema 1000s primære målgruppe (targeting)?',
        choices: [
          { id: 'a', text: 'Velstående matglade nordmenn' },
          { id: 'b', text: 'Prisfokuserte barnefamilier og unge voksne med tidsklemme' },
          { id: 'c', text: 'Eldre pensjonister på budsjett' },
          { id: 'd', text: 'Internasjonale turister' },
        ],
        correctId: 'b',
        explanation: 'Rema 1000s primærsegment er prisfokuserte barnefamilier og unge voksne som vil handle raskt og billig. Demografisk: lav-til-middelinntekt. Psykografisk: effektivitetsorienterte.',
      },
      {
        id: 'st-5-4',
        question: 'Hvorfor er konsistens over tid viktig for en posisjoneringsstrategi?',
        choices: [
          { id: 'a', text: 'Det er billigere å ikke endre strategi' },
          { id: 'b', text: 'Konsistens over tid bygger troverdighet og sterk merkevareassosiasjon i kundens sinn' },
          { id: 'c', text: 'Loven krever at posisjonering ikke endres' },
          { id: 'd', text: 'Konkurrentene kopierer hvis man endrer' },
        ],
        correctId: 'b',
        explanation: 'Remas 40+ år med konsistent "enkelt og billig"-posisjonering har bygget en av Norges sterkeste merkevarer. Konsistens over tid skaper sterke og klare assosiasjoner i kundenes bevissthet.',
      },
      {
        id: 'st-5-5',
        question: 'Hva betyr «STP er ikke en engangsøvelse»?',
        choices: [
          { id: 'a', text: 'Man må analysere STP minst to ganger per dag' },
          { id: 'b', text: 'Bedrifter bør reanalysere segmenter og posisjonering regelmessig etter hvert som markedet endrer seg' },
          { id: 'c', text: 'STP er for komplekst til å gjøre bare én gang' },
          { id: 'd', text: 'Alle ansatte må lære STP' },
        ],
        correctId: 'b',
        explanation: 'Markedet og kundene endrer seg over tid — STP bør reanalyseres hvert 2–3 år for å sikre at segmentering, valg av målgruppe og posisjonering fortsatt er relevante.',
      },
    ],
  },
];

export default function StpModule() {
  return (
    <DrawerModule
      moduleCode="ML1-04"
      moduleTitle="Segmentering, målgruppe og posisjonering (STP)"
      moduleIcon="🎯"
      storageKey="learning-ml1-stp"
      completeRoute="/learning/ml1/stp/complete"
      phases={phases}
      intro="STP — Segmentering, Targeting og Posisjonering — er markedsføringens kjernestrategi. Uten tydelig STP er du ingenting til alle. Med tydelig STP er du alt til noen."
      vissteduAt="Bedrifter med klart definerte personas konverterer 2,5x bedre på digitale flater. HubSpot har vist at markedsføring rettet mot spesifikke personas genererer 18x mer omsetning enn generisk massemarkedsføring."
      espenSier="STP er ikke et akademisk rammeverk — det er en beslutningsprosess. Uten tydelig segment og posisjon er du ingenting til alle. Med tydelig STP er du alt til noen."
      presentationLink={{ route: '/learning/presentations/forbrukeratferd', description: 'Forbrukeratferd — en visuell gjennomgang av segmentering og personas' }}
    />
  );
}
