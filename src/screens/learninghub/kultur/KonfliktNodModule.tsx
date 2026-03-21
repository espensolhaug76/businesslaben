import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔥',
    title: 'Konflikter på arbeidsplassen',
    quote: 'En konflikt som ikke håndteres, vokser. En konflikt som håndteres tidlig, kan styrke relasjoner.',
    content:
      'Konflikter på arbeidsplassen er normalt og uunngåelig — det er ikke konflikten i seg selv som er problemet, men hvordan den håndteres. Vi skiller mellom sakskonflikter (uenighet om arbeidsoppgaver, rutiner eller beslutninger) og relasjonskonflikter (personlige motsetninger mellom individer). Sakaonflikter kan faktisk være positive — de fører til bedre beslutninger når de håndteres konstruktivt. Relasjonskonflikter er mer belastende og krever raskere intervensjon. I servicenæringen kan konflikter oppstå mellom kolleger, mellom ansatt og leder, eller mellom ansatt og kunde. Arbeidsmiljøloven § 4-3 gir alle ansatte rett til et arbeidsmiljø fritt for trakassering og utilbørlig atferd.',
    subpoints: [
      { label: 'SAKSKONFLIKT', text: 'Uenighet om arbeidsinnhold, rutiner, beslutninger eller ressurser. Kan være konstruktiv hvis håndtert godt — fører til bedre løsninger.' },
      { label: 'RELASJONSKONFLIKT', text: 'Personlige motsetninger, mistillit eller fiendtlighet mellom individer. Ødelegger arbeidsmiljø og produktivitet — krever rask håndtering.' },
      { label: 'TRAKASSERING', text: 'Gjentatte negative handlinger rettet mot en person som skaper et fiendtlig arbeidsmiljø. Forbudt ved lov (AML § 4-3) og en leders plikt å stoppe.' },
    ],
    practical:
      'Diskuter: En kollega tar alltid de beste vaktene fordi han/hun er venn med lederen. En annen ansatt begynner å klage over dette til alle andre ansatte i stedet for å ta det opp direkte. Hva slags konflikt er dette, og hvem har ansvar for å løse det?',
    exercises: [
      {
        id: 'kn-1-1',
        question: 'Hva er forskjellen mellom en sakskonflikt og en relasjonskonflikt?',
        choices: [
          { id: 'a', text: 'Det er ingen forskjell — alle konflikter er like alvorlige' },
          { id: 'b', text: 'Sakskonflikt handler om arbeidsinnhold/rutiner; relasjonskonflikt handler om personlige motsetninger mellom mennesker' },
          { id: 'c', text: 'Sakskonflikt er alltid positiv; relasjonskonflikt er alltid negativ' },
          { id: 'd', text: 'Sakskonflikt er mellom ansatte; relasjonskonflikt er mellom ansatt og leder' },
        ],
        correctId: 'b',
        explanation: 'Sakskonflikter handler om arbeid og kan gi bedre beslutninger ved god håndtering. Relasjonskonflikter er personlige og mer belastende — de krever raskere og mer sensitiv intervensjon.',
      },
      {
        id: 'kn-1-2',
        question: 'Hva sier Arbeidsmiljøloven om trakassering på arbeidsplassen?',
        choices: [
          { id: 'a', text: 'Det er ansattes eget ansvar å stoppe trakassering' },
          { id: 'b', text: 'Trakassering er forbudt ved lov, og arbeidsgiver plikter å sørge for et arbeidsmiljø fritt for dette' },
          { id: 'c', text: 'Trakassering er bare forbudt hvis det er gjentatt mer enn 10 ganger' },
          { id: 'd', text: 'Loven regulerer kun fysisk trakassering, ikke psykisk' },
        ],
        correctId: 'b',
        explanation: 'AML § 4-3 gir alle ansatte rett til å bli behandlet med verdighet. Trakassering — inkludert psykisk trakassering — er forbudt, og arbeidsgiver har aktivt ansvar for å forebygge og håndtere dette.',
      },
      {
        id: 'kn-1-3',
        question: 'To kollegaer er uenige om hva som er den beste rutinen for å håndtere reklamasjoner. De diskuterer høylytt, men er saklige. Hva er dette?',
        choices: [
          { id: 'a', text: 'En relasjonskonflikt som bør stoppes umiddelbart' },
          { id: 'b', text: 'Trakassering av arbeidskollegaen' },
          { id: 'c', text: 'En sakskonflikt som kan føre til bedre rutiner hvis håndtert konstruktivt' },
          { id: 'd', text: 'En situasjon som lederen alltid bør avgjøre' },
        ],
        correctId: 'c',
        explanation: 'En høylytt men saklig uenighet om rutiner er en sakskonflikt. Slike konflikter er naturlige og kan faktisk forbedre arbeidsmiljøet og rutinene hvis de håndteres konstruktivt.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🕊️',
    title: 'Deeskalering og konfliktløsning',
    quote: 'Den som vinner en krangel, taper ofte en relasjon. Den som løser konflikten, beholder begge deler.',
    content:
      'Deeskalering betyr å redusere spenningsnivået i en konflikt — å gjøre det lettere å finne løsninger. I møte med en sint kunde eller en opphetet kollegasituasjon er det tre viktige steg: (1) Anerkjenn følelsene — "Jeg forstår at dette er frustrerende". (2) Ta ansvar der det er rimelig — ikke kast skyld. (3) Fokuser på løsning — hva kan vi gjøre NÅ? Thomas-Kilmann-modellen beskriver fem konfliktstrategier: unngå (ingen vinner, ingen taper), tilpasse (gi etter), konkurrere (vinne for enhver pris), kompromiss (begge gir litt), og samarbeide (finne en løsning som faktisk fungerer for begge). I servicenæringen er samarbeid og kompromiss de mest hensiktsmessige strategiene — unngåing forverrer konflikter.',
    subpoints: [
      { label: 'DEESKALERING', text: 'Teknikker for å redusere spenning: rolig stemme, lyttende kroppsspråk, anerkjenne den andres følelse, unngå defensiv atferd.' },
      { label: 'THOMAS-KILMANN', text: 'Fem konfliktstrategier: unngå, tilpasse, konkurrere, kompromiss, samarbeide. Samarbeid gir beste langtidsresultat; unngåing gir verste.' },
      { label: 'AKTIV LYTTING', text: 'Gi full oppmerksomhet, oppsummer det du hørte ("Så du mener at..."), unngå avbrytelser, still oppklarende spørsmål. Essensielt for god konfliktløsning.' },
    ],
    practical:
      'Rollespill: Én er en sint kunde som klager på en feil bestilling. Én er den ansatte. Øv på deeskalering — anerkjenn følelsene, ta ansvar og tilby en løsning. Bytt roller og diskuter hva som fungerte.',
    exercises: [
      {
        id: 'kn-2-1',
        question: 'En kunde er rasende og sier: "Dette er helt skandaløst! Aldri har jeg opplevd så dårlig service!" Hva er det BESTE første svaret?',
        choices: [
          { id: 'a', text: '"Dette er ikke vår feil — det er faktisk kunden som har gjort noe galt."' },
          { id: 'b', text: '"Det er selvfølgelig beklagelig. Jeg forstår at dette er frustrerende — kan du fortelle meg hva som skjedde?"' },
          { id: 'c', text: '"Vær så snill å roe deg ned — vi ordner dette."' },
          { id: 'd', text: '"Andre kunder har aldri klaget på dette."' },
        ],
        correctId: 'b',
        explanation: 'Å anerkjenne følelsen ("Jeg forstår at dette er frustrerende") og invitere til dialog er kjernen i deeskalering. Å avvise, forsvare eller be om å "roe seg ned" øker spenningen.',
      },
      {
        id: 'kn-2-2',
        question: 'Ifølge Thomas-Kilmann-modellen: Hva er den MINST effektive strategien for konfliktløsning på arbeidsplassen over tid?',
        choices: [
          { id: 'a', text: 'Samarbeid — tar for lang tid' },
          { id: 'b', text: 'Kompromiss — ingen er egentlig fornøyde' },
          { id: 'c', text: 'Unngåing — konflikten løses ikke og vokser seg større' },
          { id: 'd', text: 'Tilpasning — man gir alltid etter' },
        ],
        correctId: 'c',
        explanation: 'Unngåing fører til at konflikten "legges under teppet" og vokser. Samarbeid er det beste alternativet — begge parter bidrar til en løsning som faktisk fungerer for begge.',
      },
      {
        id: 'kn-2-3',
        question: 'Hva innebærer aktiv lytting i en konfliktsituasjon?',
        choices: [
          { id: 'a', text: 'Å notere ned alt den andre sier' },
          { id: 'b', text: 'Å gi full oppmerksomhet, oppsummere det du hørte og stille oppklarende spørsmål uten å avbryte' },
          { id: 'c', text: 'Å vente tålmodig på at den andre er ferdig, deretter si sin mening' },
          { id: 'd', text: 'Å ta video av samtalen for dokumentasjon' },
        ],
        correctId: 'b',
        explanation: 'Aktiv lytting er å vise med ord og kropp at du virkelig hører den andre. Oppsummering ("Så du mener at...") viser at du forstår, og oppklarende spørsmål sikrer at du ikke har misforstått.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🚨',
    title: 'Nødssituasjoner i servicenæringen',
    quote: 'I en nødsituasjon er den roligste personen i rommet den som er best forberedt.',
    content:
      'Servicenæringen — hotell, restaurant, arrangementslokaler, turistattraksjoner — er steder der nødssituasjoner kan oppstå. Brann, medisinsk nødhjelp (hjertestans, allergisjokk, bevisstløshet), trusler og evakuering er situasjoner alle ansatte bør ha grunnleggende kunnskap om. Norsk lov krever at arbeidsgivere har beredskapsplaner og at ansatte kjenner dem. Evakueringsrutiner skal gjennomgås jevnlig. Alle norske arbeidstakere bør kunne ringe 110 (brann), 112 (politi) og 113 (ambulanse). DHLR-aksjonen (Defibrillatorer Hjelper Liv Reddes) betyr at hjertestarter nå finnes på mange norske steder — og alle bør vite hvordan den brukes. Beroligelse av gjester i panikk er en sentral kompetanse: snakk rolig, ta kommando og gi klare instruksjoner.',
    subpoints: [
      { label: 'NØDNUMRE', text: '110 = Brann, 112 = Politi, 113 = Ambulanse. Lær disse og sørg for at alle ansatte kjenner dem. Ring 112 ved akutt fare.' },
      { label: 'EVAKUERINGSPLAN', text: 'Alle virksomheter skal ha evakueringsplan med merkede fluktruter, møteplass og utpekte brannverter/evakueringsledere.' },
      { label: 'HLR OG HJERTESTARTER', text: 'Hjerte-lunge-redning (HLR) og hjertestarter er kompetanse som kan redde liv. Norsk Folkehjelp tilbyr kurs. Hjertestarterregisteret viser nærmeste hjertestarter.' },
    ],
    practical:
      'Finn evakueringsplanen for skolen din eller en arbeidsplass du kjenner. Identifiser: Hvor er brannslokkerne? Hva er møteplassen ved evakuering? Kjenner du alle nødnumrene utenat?',
    exercises: [
      {
        id: 'kn-3-1',
        question: 'Hva er nødnummeret for ambulanse i Norge?',
        choices: [
          { id: 'a', text: '110' },
          { id: 'b', text: '112' },
          { id: 'c', text: '113' },
          { id: 'd', text: '116 117' },
        ],
        correctId: 'c',
        explanation: '113 er nødnummeret for ambulanse i Norge. 110 er brann, 112 er politi. 116 117 er legevakt for ikke-akutte henvendelser utenfor fastlegens åpningstid.',
      },
      {
        id: 'kn-3-2',
        question: 'En gjest på hotellet din mister bevisstheten i resepsjonen. Hva er den RIKTIGE handlingsrekkefølgen?',
        choices: [
          { id: 'a', text: 'Ring hotellets leder, vent på instruksjoner, ring deretter ambulanse' },
          { id: 'b', text: 'Ring 113 umiddelbart, sjekk om personen puster, start HLR hvis nødvendig, hent hjertestarter' },
          { id: 'c', text: 'Legg personen i stabilt sideleie og vent — de våkner sikkert snart' },
          { id: 'd', text: 'Evakuer alle gjester fra hotellet først' },
        ],
        correctId: 'b',
        explanation: 'Ved bevisstløshet: Ring 113 umiddelbart (de gir instruksjoner), sjekk pust, start HLR hvis personen ikke puster, hent hjertestarter. Hvert sekund teller ved hjertestans — ikke vent.',
      },
      {
        id: 'kn-3-3',
        question: 'Brannalarmen går på restauranten. Gjestene begynner å bli panikk-slagene. Hva er din viktigste oppgave som ansatt?',
        choices: [
          { id: 'a', text: 'Finne ut om det faktisk er brann før du gjør noe' },
          { id: 'b', text: 'Redde kassebeholdningen og verdisaker' },
          { id: 'c', text: 'Beholde roen, ta kommando med klar stemme, lede gjestene til nærmeste nødutgang og til møteplassen' },
          { id: 'd', text: 'Ringe politiet og vente på instruksjoner' },
        ],
        correctId: 'c',
        explanation: 'Den ansatte er gjestens guide i en nødsituasjon. Klar og rolig kommunikasjon smitter — panikk smitter også. Ta kommando, bruk klare instruksjoner og led gjestene til sikkerhet.',
      },
    ],
  },
]

export default function KonfliktNodModule() {
  return (
    <DrawerModule
      moduleCode="KS7"
      moduleTitle="Konflikt- og nødssituasjonshåndtering"
      moduleIcon="🚨"
      storageKey="learning-kultur-konflikt-nod"
      completeRoute="/learning/kultur/konflikt-nodssituasjon/complete"
      phases={PHASES}
      intro="Konflikter og nødssituasjoner er en del av arbeidslivet i servicenæringen. De som er forberedt, håndterer dem bedre — og beskytter både seg selv og gjestene."
      vissteduAt="Norsk Folkehjelp tilbyr gratis HLR-kurs for alle. HLR utført av tilstedeværende person innen 4 minutter tredobler sjansen for overlevelse ved hjertestans."
      espenSier="Den verste forberedelsen til en brann er å tenke 'det skjer ikke oss'. Øv på evakuering, lær nødnumrene og ta et HLR-kurs — det tar 3 timer og kan redde et liv."
      presentationLink={{ route: '/learning/presentations/konflikt-nod', description: 'Konflikt og nød — en visuell gjennomgang av deeskalering og beredskap' }}
    />
  )
}
