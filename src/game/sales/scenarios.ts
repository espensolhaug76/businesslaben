// ─── SALGSSITUASJON-MOTOR — scenariodata ─────────────────────────────────────
//
// v1 starter med ÉN godkjent scenario: «Morgenkunden» for café-sortimentet
// (kaffe / bakevarer / m.m.). Anbefal-steget (kind:'recommend') leser elevens
// faktiske sortiment — se SalesScenarioOverlay. Flere scenarier legges til som
// nye elementer i SCENARIOS uten endringer ellers.

import type { SalesScenario } from './types'
import type { ScenarioMix } from '../data/dayConfig'

/** Nøkkelord som identifiserer kundens hovedbehov (oppkvikkende drikke). */
const KAFFE_TAGS = ['kaffe', 'coffee', 'espresso', 'cappuccino', 'latte']
/** Nøkkelord for tilleggssalg (noe spiselig til kaffen). */
const BAKEVARE_TAGS = ['bakevarer', 'pastry', 'croissant', 'bolle', 'muffin', 'sandwich', 'kake', 'cake']

export const MORGENKUNDEN: SalesScenario = {
  id: 'morgenkunden',
  customerName: 'Morgenkunden',
  personaTag: 'Karriereorienterte',
  sprite: '/assets/raw/customers/kari.png',
  description: 'En stresset pendler på vei til jobb. Vil ha noe raskt og oppkvikkende, og setter pris på effektiv, vennlig service.',
  hiddenNeed: 'Trenger noe som vekker — helst en kaffe å ta med. Har dårlig tid og vil bli sett.',
  steps: [
    {
      id: 'inn',
      customerLine: '(skynder seg inn) Hei … jeg har skikkelig dårlig tid, må rekke bussen.',
      note: 'Førsteinntrykket settes nå.',
      choices: [
        { id: 'inn_a', text: 'God morgen! Hva kan jeg friste med?', quality: 'good',
          feedback: 'Vennlig og effektiv — kunden slapper litt av og føler seg velkommen.' },
        { id: 'inn_b', text: '(fortsetter å tørke disken) Mhm.', quality: 'warn',
          feedback: 'Du virker uoppmerksom. Kunden føler seg litt oversett når tiden er knapp.' },
        { id: 'inn_c', text: 'Du må stille deg i kø som alle andre.', quality: 'bad',
          feedback: 'Unødvendig brysk. En dårlig start som farger resten av møtet.' },
      ],
    },
    {
      id: 'behov',
      customerLine: 'Jeg er ikke helt våken enda, for å si det sånn …',
      note: 'Kunden gir et hint om behovet sitt.',
      choices: [
        { id: 'behov_a', text: 'Skal det være noe oppkvikkende? Vi har nytraktet kaffe.', quality: 'good',
          feedback: 'Du fanger opp signalet og leder samtalen mot det kunden faktisk trenger.' },
        { id: 'behov_b', text: 'Vi har tilbud på kake i dag, vil du ha?', quality: 'warn',
          feedback: 'Du selger det DU vil bli kvitt, ikke det kunden trenger. Litt tidlig å pushe.' },
        { id: 'behov_c', text: 'Det er ikke akkurat mitt problem.', quality: 'bad',
          feedback: 'Avvisende. Kunden mister tilliten til at du vil hjelpe.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: KAFFE_TAGS,
      customerLine: 'Hva anbefaler du — noe som funker når man er trøtt?',
      note: 'Anbefal fra det du faktisk fører i sortimentet.',
    },
    {
      id: 'mersalg',
      customerLine: 'Takk! … (kikker bort på disken)',
      note: 'En mulighet for naturlig mersalg.',
      choices: [
        { id: 'mer_a', text: 'Vil du ha noe nybakt å spise til?', quality: 'good',
          sell: { needTags: BAKEVARE_TAGS, addon: true },
          feedback: 'Naturlig mersalg som faktisk hjelper en sulten morgenkunde.' },
        { id: 'mer_b', text: 'Det blir det. Neste!', quality: 'warn',
          feedback: 'Helt greit, men du går glipp av et enkelt og relevant mersalg.' },
        { id: 'mer_c', text: 'Du BØR ta tre croissanter, de er kjempegode!', quality: 'bad',
          feedback: 'For pågående. Kunden føler seg presset og får dårligere opplevelse.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Supert, da tar jeg det.',
      note: 'Sisteinntrykket avgjør om kunden kommer tilbake.',
      choices: [
        { id: 'slutt_a', text: 'Vær så god — ha en fin dag på jobb!', quality: 'good',
          feedback: 'Varm avslutning. Kunden går fornøyd ut og husker stedet.' },
        { id: 'slutt_b', text: 'Værsågod.', quality: 'warn',
          feedback: 'Litt flat avslutning, men helt grei.' },
        { id: 'slutt_c', text: '(rekker ut hånda uten å se opp)', quality: 'bad',
          feedback: 'Du mister sjansen til et godt sisteinntrykk.' },
      ],
    },
  ],
}

// ─── «Reklamasjonen» ─────────────────────────────────────────────────────────
// Service/klage-scenario (ikke salg): Tom kommer tilbake med en dårlig
// bursdagskake. KJERNE er rettighets-steget — en mangel gir rett til
// omlevering/heving SELV UTEN kvittering når kjøpet kan sannsynliggjøres
// (forbrukerkjøpsloven). Hovedmetrikken er RYKTE, ikke salg (se DEL 3:
// outcomeKind 'service' + kostnad på en god løsning).
//
// persona-tag 'Familieorienterte' (far som handler til familien) — gir
// målgruppe-bonus mot psychographics; hans misfornøyde tilstand ligger i
// description/replikkene, ikke i taggen.

/** Kostnad (kr) ved omlevering av bursdagskaka (DEL 3). Kaka er en
 *  BESTILLINGSVARE — den inngår ikke i det løpende sortimentet — derfor en fast
 *  kostpris her framfor et sortiment-oppslag. Lett å justere ved
 *  økonomi-balansering. */
export const REKLAMASJON_OMLEVERING_KOST = 250

export const REKLAMASJONEN: SalesScenario = {
  id: 'reklamasjonen',
  customerName: 'Tom',
  personaTag: 'Familieorienterte',
  sprite: '/assets/raw/customers/tom.png',
  outcomeKind: 'service',   // hovedmetrikk = rykte (DEL 3), ikke salg
  description: 'En far som kjøpte bursdagskake til datteren. Kaka var sur, og han er tydelig skuffet og irritert. Vil bli tatt på alvor og få en ordentlig løsning.',
  hiddenNeed: 'Vil bli hørt og få en rettferdig løsning på en reell mangel — ikke bli avvist på formaliteter som manglende kvittering.',
  steps: [
    {
      id: 'mot',
      customerLine: '(setter en kakeeske hardt i disken) Den her kaka var sur! Datteras bursdag ble ødelagt.',
      note: 'Han er opprørt. Tonen din nå avgjør mye.',
      choices: [
        { id: 'mot_a', text: 'Så leit å høre — det skal vi finne ut av sammen. Fortell hva som skjedde.', quality: 'good',
          feedback: 'Rolig og empatisk. Du anerkjenner følelsen uten å gå i forsvar, og Tom roer seg litt.' },
        { id: 'mot_b', text: 'Oi. Er du sikker på at det var noe galt med den?', quality: 'warn',
          feedback: 'Du sår tvil med en gang. Det føles avvisende, selv om du ikke mente det vondt.' },
        { id: 'mot_c', text: 'Sånt skjer. Hva vil du jeg skal gjøre med det?', quality: 'bad',
          feedback: 'Likegyldig og defensiv. Tom føler seg ikke tatt på alvor.' },
      ],
    },
    {
      id: 'forsta',
      customerLine: 'Den smakte gjæret allerede da vi skar i den — midt i selskapet!',
      note: 'Få fram fakta før du konkluderer.',
      choices: [
        { id: 'fs_a', text: 'Det høres ut som en klar feil på varen. Når kjøpte du den?', quality: 'good',
          feedback: 'Du lytter, bekrefter og kartlegger — ryddig og profesjonelt.' },
        { id: 'fs_b', text: 'Kaker kan jo bli sure hvis de står for varmt hjemme …', quality: 'warn',
          feedback: 'Du antyder at det er kundens feil uten grunnlag. Det provoserer.' },
        { id: 'fs_c', text: 'Du har sikkert oppbevart den feil.', quality: 'bad',
          feedback: 'Du anklager kunden direkte. Nå er han enda mer opprørt.' },
      ],
    },
    {
      id: 'rettigheter',
      customerLine: 'Jeg har ikke kvitteringen lenger, altså. Betyr det at jeg er sjanseløs?',
      note: 'KJERNE: hva sier forbrukerretten?',
      choices: [
        { id: 'rt_a', text: 'Nei. En mangel gir deg rett til omlevering eller pengene tilbake — kvittering er fint, men ikke et absolutt krav når kjøpet kan sannsynliggjøres.', quality: 'good',
          feedback: 'Riktig. Ved en mangel har kunden krav på retting/omlevering; manglende kvittering stenger ikke døra når kjøpet kan sannsynliggjøres. Faglig trygt.' },
        { id: 'rt_b', text: 'Hmm, jeg er ikke helt sikker på reglene … la meg sjekke litt.', quality: 'warn',
          feedback: 'Ærlig, men vinglete. Usikkerheten svekker tilliten — kunne du forbrukerrettene, sto du tryggere.' },
        { id: 'rt_c', text: 'Uten kvittering kan jeg dessverre ikke gjøre noe for deg.', quality: 'bad',
          feedback: 'Faktafeil. En mangel gir rettigheter selv uten kvittering når kjøpet kan sannsynliggjøres — å avvise på formalitet er både feil og dårlig service.' },
      ],
    },
    {
      id: 'losning',
      customerLine: 'Ok … så hva kan dere gjøre, da?',
      note: 'Velg en konkret løsning.',
      choices: [
        { id: 'ls_a', text: 'Du får en helt ny kake nå, og en liten unnskyldning på huset.', quality: 'good',
          cost: REKLAMASJON_OMLEVERING_KOST,   // omlevering: kroner ut av kassa (DEL 3)
          feedback: 'Raus og ryddig omlevering. Det koster litt der og da, men gjør en skuffet kunde til en lojal en.' },
        { id: 'ls_b', text: 'Jeg kan gi deg 20 % avslag på neste kjøp.', quality: 'warn',
          feedback: 'Bedre enn ingenting, men det løser ikke den faktiske mangelen her og nå.' },
        { id: 'ls_c', text: 'Jeg kan dessverre ikke gjøre noe uten kvittering.', quality: 'bad',
          feedback: 'Du står på formaliteten og lar kunden sitte med tapet. Ryktet ditt tar skade.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: '(litt mildere) Greit. Takk for det.',
      note: 'Sisteinntrykket avgjør om han kommer tilbake.',
      choices: [
        { id: 'av_a', text: 'Beklager bryderiet, Tom — hils datteren din fra oss. Velkommen tilbake!', quality: 'good',
          feedback: 'Varmt og personlig. Du snur en klage til en god historie han forteller videre.' },
        { id: 'av_b', text: 'Værsågod. Ha en fin dag.', quality: 'warn',
          feedback: 'Korrekt, men litt flatt etter en sånn sak.' },
        { id: 'av_c', text: '(snur deg mot neste kunde uten å si mer)', quality: 'bad',
          feedback: 'Kald avslutning. Han går misfornøyd uansett hva som ble sagt før.' },
      ],
    },
  ],
}

// ─── «Allergikeren» ──────────────────────────────────────────────────────────
// Service-aktig salgsscenario: tillit/rykte veier tyngre enn selve salget.
// KJERNE: ved allergener skal man ALDRI gjette — «jeg må sjekke» er alltid
// riktig svar, uansett hvor sikker man FØLER seg. Matinformasjonsforskriften
// nevnes eksplisitt i feedback på kjerne-steget.

export const ALLERGIKEREN: SalesScenario = {
  id: 'allergikeren',
  customerName: 'Sunniva',
  personaTag: 'Helsebevisste',
  sprite: '/assets/raw/customers/allergikeren.png',
  outcomeKind: 'service',
  description: 'En kunde som er tydelig opptatt av hva som er i bakevarene — nevner med en gang cøliaki og at kjæresten har nøtteallergi.',
  hiddenNeed: 'Trenger et ÆRLIG svar om innhold — vil heller høre «jeg må sjekke» enn et gjettet «ja, det går helt fint».',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei! Jeg lurte på om det er gluten i noen av bakevarene deres — jeg har cøliaki. Og kjæresten min er allergisk mot nøtter.',
      note: 'Et helt vanlig og viktig spørsmål — svaret ditt avgjør om hun tør å handle her i det hele tatt.',
      choices: [
        { id: 'inn_a', text: 'Godt spørsmål — la meg sjekke ingredienslisten nøye før jeg svarer deg.', quality: 'good',
          feedback: 'Akkurat riktig holdning: ved allergener skal du ALDRI gjette. Matinformasjonsforskriften krever korrekt allergeninformasjon, og «jeg må sjekke» er alltid et trygt svar.' },
        { id: 'inn_b', text: 'Hmm, det er nok stort sett greit, tror jeg?', quality: 'warn',
          feedback: '«Tror» er farlig når det gjelder allergi. Usikkerhet bør alltid følges av en faktisk sjekk, ikke en antagelse.' },
        { id: 'inn_c', text: 'Nei nei, ingen av våre varer inneholder gluten eller nøtter.', quality: 'bad',
          feedback: 'Farlig og sannsynligvis feil — å garantere noe du ikke faktisk vet kan skade kunden alvorlig, og er brudd på matinformasjonsforskriften.' },
      ],
    },
    {
      id: 'sjekk',
      customerLine: 'Jeg setter stor pris på at du er nøye — det er ikke alltid man opplever det.',
      note: 'Bygg videre på tilliten du nettopp fikk.',
      choices: [
        { id: 'sj_a', text: 'Vi merker alltid allergener tydelig på prislappene — og er du usikker, spør oss gjerne igjen.', quality: 'good',
          feedback: 'Du viser at dette er en FAST rutine hos dere, ikke noe du fant på her og nå. Det bygger varig tillit.' },
        { id: 'sj_b', text: 'Ja, vi prøver å være flinke til det meste.', quality: 'warn',
          feedback: 'Vagt og lite konkret — hun sitter fortsatt litt usikker på om dere faktisk har gode rutiner.' },
        { id: 'sj_c', text: 'Det er vel greit, folk overdriver ofte sånt.', quality: 'bad',
          feedback: 'Nedlatende holdning til en reell helserisiko. Dette kan skremme bort en hel kundegruppe — og er rett og slett farlig.' },
      ],
    },
    {
      id: 'spesifikk',
      customerLine: 'Jeg har lyst på en kanelbolle, da. Er du helt sikker på at den ikke inneholder nøtter?',
      note: 'KJERNEN gjentar seg — sjekk PER VARE, gjett ikke, selv etter et godt svar tidligere.',
      choices: [
        { id: 'sp_a', text: 'La meg dobbeltsjekke akkurat den varen for deg nå, så du er helt trygg.', quality: 'good',
          feedback: 'Perfekt — du sjekker DENNE spesifikke varen i stedet for å generalisere fra et tidligere svar. Det er reell risikohåndtering.' },
        { id: 'sp_b', text: 'Den er nok samme som resten, helt fin.', quality: 'warn',
          feedback: 'Du generaliserer fra en tidligere samtale i stedet for å sjekke DENNE varen. Risikabelt, selv om du mener det godt.' },
        { id: 'sp_c', text: 'Jo da, spis i vei!', quality: 'bad',
          feedback: 'Du garanterer noe du ikke har sjekket. Går det galt, kan konsekvensene bli alvorlige — og ansvaret er ditt.' },
      ],
    },
    {
      id: 'velg',
      kind: 'recommend',
      recommendNeed: BAKEVARE_TAGS,
      customerLine: 'Da tar jeg gjerne noe søtt, siden du har vært så grundig for meg.',
      note: 'Anbefal fra det du faktisk fører i sortimentet.',
    },
    {
      id: 'avslutt',
      customerLine: 'Tusen takk for at du tok deg tid — det er ikke alle steder som er like nøye.',
      note: 'Sisteinntrykket avgjør om hun tør å komme tilbake.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — kom gjerne innom igjen, så sjekker vi like nøye neste gang også!', quality: 'good',
          feedback: 'Varm avslutning som bekrefter at grundigheten er en vane, ikke et unntak. Hun går trygg og fornøyd ut.' },
        { id: 'av_b', text: 'Bare hyggelig.', quality: 'warn',
          feedback: 'Grei, men litt flat avslutning etter en så viktig samtale.' },
        { id: 'av_c', text: '(nikker og teller opp neste kunde)', quality: 'bad',
          feedback: 'Kald avslutning som svekker den tilliten du nettopp bygde opp gjennom hele samtalen.' },
      ],
    },
  ],
}

// ─── «Prutekunden» ───────────────────────────────────────────────────────────
// KJERNE: forsvar verdi rolig (good) — ikke gi rabatt reflektorisk (warn) —
// ikke bli defensiv (bad). Replikkene leser elevens FAKTISKE retailPrice på
// kaffe via {price:coffee}-tokenet (se engine.ts interpolateTokens og
// SalesScenarioOverlay, som kjører interpoleringen på all kunde-/valgtekst).

const KAFFETILBEHOR_TAGS = ['kaffe', 'coffee', 'espresso', 'cappuccino', 'latte']

export const PRUTEKUNDEN: SalesScenario = {
  id: 'prutekunden',
  customerName: 'Roger',
  personaTag: 'Prisbevisste',
  sprite: '/assets/raw/customers/prutekunden.png',
  description: 'En kunde som alltid prøver å forhandle ned prisen — sammenligner høylytt med Rema og forventer rabatt før han i det hele tatt har bestilt.',
  hiddenNeed: 'Vil egentlig bare kjøpe varen — men tester om du gir etter for press. Respekterer selgere som står stødig og forklarer verdien, uten å bli avvisende.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hallo! Jeg så at dere tar {price:coffee} for en kaffe — det er jo dobbelt så mye som Rema tar for sin.',
      note: 'Første prisinnvending. Ikke gå i forsvar med en gang.',
      choices: [
        { id: 'inn_a', text: 'Vi bruker nytraktet kaffe av høy kvalitet, og du får den ferdig laget her og nå — det er en litt annen opplevelse enn en pose kaffebønner i butikkhylla.', quality: 'good',
          feedback: 'Rolig og saklig verdiforklaring — du korrigerer sammenligningen uten å bli defensiv eller avvisende.' },
        { id: 'inn_b', text: 'Jaja, jeg kan gi deg 10 % rabatt da, bare denne ene gangen.', quality: 'warn',
          feedback: 'Du gir etter reflektorisk uten engang å prøve å forklare verdien først. Det signaliserer at prisen egentlig ikke er «ekte».' },
        { id: 'inn_c', text: 'Det er ikke min sak hva Rema tar, dette er prisen her.', quality: 'bad',
          feedback: 'Avvisende og lite kundevennlig — du vinner kanskje krangelen, men mister kundens velvilje.' },
      ],
    },
    {
      id: 'press',
      customerLine: 'Kom igjen, det er jo bare kaffebønner og vann. Kan du ikke gi meg en pris i nærheten av det de tar?',
      note: 'Presset øker — KJERNEN i scenarioet: stå stødig uten å bli avvisende.',
      choices: [
        { id: 'pr_a', text: 'Jeg forstår at det kan virke mye, men prisen dekker råvarer, arbeidstid og lokalet — jeg holder heller en ærlig pris enn å gi en rabatt jeg ikke kan forsvare.', quality: 'good',
          feedback: 'Du forklarer HVORFOR prisen er som den er, rolig og med respekt for kunden. Akkurat kjernen i god verdiforsvaring.' },
        { id: 'pr_b', text: 'Ok, jeg kan møte deg litt på pris hvis du handler mer.', quality: 'warn',
          feedback: 'En mellomting — du unngår full rabatt, men lar deg fortsatt presse inn i en forhandling du egentlig ikke burde gå med på.' },
        { id: 'pr_c', text: 'Hvis du synes det er for dyrt, kan du jo handle et annet sted.', quality: 'bad',
          feedback: 'Defensivt og avvisende — akkurat det kjernen advarer mot. Du risikerer å miste kunden helt, og ryktet med det.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: KAFFETILBEHOR_TAGS,
      customerLine: 'Ok, ok — hva ville du anbefalt da, siden du er så stolt av kvaliteten?',
      note: 'Anbefal fra det du faktisk fører — vis at prisen følger med en reell vare.',
    },
    {
      id: 'bestem',
      customerLine: 'Greit, jeg biter på. Men jeg vil ikke ha noe ekstra pushet på meg nå, altså.',
      note: 'Respekter grensen han setter — men en lavmælt mersalgs-sjanse kan fortsatt finnes.',
      choices: [
        { id: 'be_a', text: 'Skjønner det godt — bare si ifra om du skulle ville ha noe attåt.', quality: 'good',
          sell: { needTags: BAKEVARE_TAGS, addon: true },
          feedback: 'Du respekterer grensen hans uten å presse — og nettopp derfor blir tilbudet ditt tatt godt imot, ikke avvist.' },
        { id: 'be_b', text: 'Er du sikker? Vi har en kjempegod kanelbolle akkurat nå …', quality: 'warn',
          feedback: 'Du prøver deg litt for hardt rett etter at han ba deg om å ikke gjøre nettopp det.' },
        { id: 'be_c', text: 'Du burde virkelig ta en bolle også, alle gjør det.', quality: 'bad',
          feedback: 'Direkte i strid med det han nettopp ba om. Oppleves pågående og respektløst.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: '(betaler) Grei prat, du står i alle fall for det du selger.',
      note: 'Sisteinntrykket avgjør om han kommer tilbake — og forteller andre om stedet.',
      choices: [
        { id: 'av_a', text: 'Takk for at du ga meg sjansen — velkommen tilbake!', quality: 'good',
          feedback: 'Varm og bekreftende avslutning — du har snudd en skeptisk kunde til en som stoler på prisen din.' },
        { id: 'av_b', text: 'Bra, ha det.', quality: 'warn',
          feedback: 'Grei, men litt anonym avslutning etter en så krevende samtale.' },
        { id: 'av_c', text: '(teller opp pengene uten å si noe)', quality: 'bad',
          feedback: 'Kald avslutning som ikke bygger videre på tilliten du nettopp brukte hele samtalen på å bygge.' },
      ],
    },
  ],
}

// ─── «Den usikre» ────────────────────────────────────────────────────────────
// KJERNE: åpne spørsmål FØR anbefaling — ikke anbefal noe tilfeldig før du
// vet noe om anledningen. Recommend-steget mot sortimentet, mersalg naturlig
// (hun spør selv om hun trenger noe mer).

// Barnevennlig drikke (mottaker-tilpasset mersalg til Maren — barnebursdag):
// leser drikkesortimentet, men styrer unna kaffe/te.
const BARNEVENNLIG_DRIKKE_TAGS = ['saft', 'juice', 'smoothie', 'brus', 'mineralvann', 'iste']
const KAKE_BOLLE_TAGS = ['kake', 'bolle', 'muffin', 'skolebrod', 'kanelbolle', 'cake']

export const DEN_USIKRE: SalesScenario = {
  id: 'den-usikre',
  customerName: 'Maren',
  personaTag: 'Familieorienterte',
  sprite: '/assets/raw/customers/usikre.png',
  description: 'En kunde som skal kjøpe til en barnebursdag i morgen, men aner ikke hva hun vil ha. Trenger noen å tenke høyt sammen med.',
  hiddenNeed: 'Vil ha noen som stiller spørsmål og hjelper henne finne ut hva hun faktisk trenger — ikke bare kaste ut et tilfeldig forslag med en gang.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei … jeg skal ha noe til en barnebursdag i morgen, men jeg aner faktisk ikke hva jeg burde velge.',
      note: 'Førsteinntrykk — vis at du vil hjelpe, ikke bare selge noe raskt.',
      choices: [
        { id: 'inn_a', text: 'Så gøy! Fortell litt — hvor mange skal dere være, og er det noen med spesielle ønsker?', quality: 'good',
          feedback: 'Du stiller åpne spørsmål med en gang i stedet for å anta. Akkurat det en usikker kunde trenger.' },
        { id: 'inn_b', text: 'Vi har jo alt mulig, bare se deg rundt.', quality: 'warn',
          feedback: 'Passivt — hun ba egentlig om hjelp, og «se deg rundt» gir henne ingen retning i det hele tatt.' },
        { id: 'inn_c', text: 'Ta bare noe kaker, det pleier å funke.', quality: 'bad',
          feedback: 'Et tilfeldig forslag uten å vite noe om anledningen. Kan fort bli helt feil for akkurat dette selskapet.' },
      ],
    },
    {
      id: 'behov',
      customerLine: 'Vi er vel rundt åtte stykker, mest barn. Ingen allergier så vidt jeg vet.',
      note: 'Kartlegg litt til før du anbefaler noe.',
      choices: [
        { id: 'be_a', text: 'Da høres noe søtt og lett å dele ut fint — liker de mest boller, kaker, eller litt av begge deler?', quality: 'good',
          feedback: 'Du bygger videre på informasjonen og snevrer inn sammen med henne — akkurat riktig rekkefølge.' },
        { id: 'be_b', text: 'Ok, da tar vi bare noe standard.', quality: 'warn',
          feedback: 'Du bruker ikke informasjonen hun nettopp ga deg. Anbefalingen blir generisk i stedet for tilpasset anledningen.' },
        { id: 'be_c', text: 'Åtte stykker, det blir sikkert dyrt for deg.', quality: 'bad',
          feedback: 'Malplassert kommentar om pris hun ikke har bedt om — kan oppleves nedlatende og gjør henne usikker på nytt.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: KAKE_BOLLE_TAGS,
      // Selskap for 8 — hovedsalget skal være 8 stk, ikke 1 (Salgsmotor-
      // oppgaven, DEL 2). Klemmes mot faktisk stock i chooseProduct
      // (delsalg om lageret ikke strekker til 8).
      recommendQty: 8,
      customerLine: 'Det høres bra ut — hva vil du anbefale da, basert på det jeg har fortalt deg?',
      note: 'Anbefal fra sortimentet, tilpasset det hun akkurat fortalte deg. Husk: selskapet er 8 stykker.',
    },
    {
      id: 'mersalg',
      customerLine: 'Åh, det passer sikkert bra! Trenger jeg noe mer, tror du?',
      note: 'Naturlig mersalgs-mulighet — hun spør faktisk deg selv.',
      choices: [
        // Mottaker-tilpasset valg (barnebursdag), etter David-mønsteret: begge
        // drikke-valgene leser elevens FAKTISKE drikkesortiment via sell-
        // direktivet (klemmes mot lager). Barnevennlig drikke treffer (good),
        // kaffe er en warn — ikke hovedbehovet for et barneselskap.
        { id: 'me_a', text: 'Kanskje litt saft eller juice til barna også?', quality: 'good',
          sell: { needTags: BARNEVENNLIG_DRIKKE_TAGS, addon: true, qty: 8 },
          feedback: 'Naturlig, ønsket mersalg — og barnevennlig. Saft, juice eller smoothie passer en barnebursdag mye bedre enn kaffe eller te.' },
        { id: 'me_b', text: 'Skal jeg slenge med litt kaffe til alle sammen?', quality: 'warn',
          sell: { needTags: KAFFE_TAGS, addon: true, qty: 8 },
          feedback: 'Kaffe til et barneselskap? Barna kan jo ikke drikke det — saft eller juice er et tryggere valg. Litt kaffe til de voksne kan være greit, men det er ikke hovedbehovet her.' },
        { id: 'me_c', text: 'Du bør uansett kjøpe litt mer enn du tror du trenger.', quality: 'bad',
          feedback: 'Vagt og pushy uten noen konkret begrunnelse. Hjelper henne ikke videre i det hele tatt.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Tusen takk, du reddet dagen min!',
      note: 'Sisteinntrykket — hun kommer garantert tilbake om du avslutter varmt.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — lykke til med selskapet, og gratulerer til den som fyller år!', quality: 'good',
          feedback: 'Varm og personlig avslutning som får henne til å huske stedet ditt med et smil.' },
        { id: 'av_b', text: 'Bare hyggelig.', quality: 'warn',
          feedback: 'Helt grei, men en sjanse til å gjøre en allerede god avslutning enda varmere glapp.' },
        { id: 'av_c', text: '(nikker og går videre til neste kunde)', quality: 'bad',
          feedback: 'Kald avslutning rett etter at du hjalp henne godt — synd å miste det gode inntrykket helt på tampen.' },
      ],
    },
  ],
}

// ─── «Storbestillingen» ──────────────────────────────────────────────────────
// KJERNE 1: sjekk LAGER før du lover noe (kind:'stock-commit' — UI slår opp
// faktisk stock for varen og bygger valg der kvaliteten avhenger av om
// lageret faktisk dekker bestillingen). KJERNE 2: volumpris-vurdering
// (kind:'margin-discount' — kvaliteten avhenger av varens FAKTISKE margin).

const RUNDSTYKKE_TAGS = ['rundstykke']

export const STORBESTILLINGEN: SalesScenario = {
  id: 'storbestillingen',
  customerName: 'Fredrik',
  personaTag: 'Karriereorienterte',
  sprite: '/assets/raw/customers/storbestiller.png',
  description: 'En kontoransatt som skal bestille bakst til et stort møte i morgen tidlig — og haster.',
  hiddenNeed: 'Trenger et ÆRLIG svar om hva du faktisk kan levere — vil heller ha et realistisk antall eller en delleveranse enn et løfte som sprekker i morgen.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei! Vi trenger 40 rundstykker til et møte i morgen tidlig — går det an?',
      note: 'Førsteinntrykket — vis at du tar en stor bestilling seriøst.',
      choices: [
        { id: 'inn_a', text: 'Det høres gjørbart ut — la meg sjekke hva vi faktisk har på lager før jeg lover deg noe.', quality: 'good',
          feedback: 'Klokt! Du sjekker heller enn å love blindt — dette er alltid riktig prosess, uansett hva lageret faktisk viser seg å inneholde.' },
        { id: 'inn_b', text: 'Skal nok gå fint, vi har alltid mye på lager.', quality: 'warn',
          feedback: 'Du antar i stedet for å sjekke. Går det bra denne gangen er det flaks, ikke god rutine.' },
        { id: 'inn_c', text: 'Selvsagt, 40 stykker er ingen sak i det hele tatt!', quality: 'bad',
          feedback: 'Et løfte gitt uten å sjekke noe som helst. Skulle lageret ikke strekke til, står du ansvarlig for et løfte du aldri burde gitt.' },
      ],
    },
    {
      id: 'lager',
      kind: 'stock-commit',
      recommendNeed: RUNDSTYKKE_TAGS,
      commitQty: 40,
      customerLine: 'Så, går det — 40 stk til i morgen tidlig?',
      note: 'KJERNE: svaret ditt bør reflektere det FAKTISKE lageret, se tallet under.',
    },
    {
      id: 'volum',
      kind: 'margin-discount',
      recommendNeed: RUNDSTYKKE_TAGS,
      customerLine: 'Siden det er en stor bestilling — er det mulig med litt kvantumsrabatt?',
      note: 'KJERNE: volumrabatt bør vurderes mot VARENS FAKTISKE margin, ikke gis reflektorisk.',
    },
    {
      id: 'bekreft',
      customerLine: 'Supert, da bestiller vi det. Kan dere levere til kontoret, eller henter vi?',
      note: 'En vanlig praktisk oppfølging — hold tonen profesjonell og løsningsorientert.',
      choices: [
        { id: 'bk_a', text: 'Dere henter hos oss klokka åtte, så er alt klart og ferskt til møtet.', quality: 'good',
          feedback: 'Konkret, ryddig og realistisk — du gir henne akkurat den informasjonen hun trenger for å planlegge morgenen.' },
        { id: 'bk_b', text: 'Det finner vi nok ut av på en eller annen måte.', quality: 'warn',
          feedback: 'Vagt svar til en kunde som tydelig planlegger i detalj. Skaper unødvendig usikkerhet rett før en viktig leveranse.' },
        { id: 'bk_c', text: 'Det er ditt problem å finne ut av, vi bare baker.', quality: 'bad',
          feedback: 'Avvisende og lite profesjonelt — akkurat den typen svar en bedriftskunde ikke kommer tilbake etter.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Takk for hjelpen — dette gir meg en ting mindre å bekymre meg for i dag.',
      note: 'Sisteinntrykket — en fornøyd bedriftskunde bestiller ofte igjen.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — lykke til med møtet, si ifra om dere trenger mer en annen gang!', quality: 'good',
          feedback: 'Varm og fremtidsrettet avslutning som åpner for faste bedriftsbestillinger videre.' },
        { id: 'av_b', text: 'Bare hyggelig, ha det.', quality: 'warn',
          feedback: 'Grei, men nøytral avslutning på et forhold som kunne blitt til gjentatte, større bestillinger.' },
        { id: 'av_c', text: '(nikker kort og går tilbake til disken)', quality: 'bad',
          feedback: 'Kald avslutning på en ellers god bedriftsleveranse — en forspilt sjanse til å sikre en fast kunde.' },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// NYE KAFÉ-SCENARIER (kv1011/kv1012 — salg, service, forbrukervern)
// Samme motor og konvensjoner som de seks over: base 50, good +10 / warn −3 /
// bad −12, behovstreff +8 (via kind:'recommend'), personaMatch = ren XP-bonus.
// SPRITE: egne kundesprites splittet fra customers-ark-03/04-raw.png
// (scripts/split-product-sheet.py, dagjobb 2026-07-08) — customers/<navn>.png.
// ═══════════════════════════════════════════════════════════════════════════

const LUNSJ_TAGS = ['lunsj', 'wrap', 'salat', 'salad', 'focaccia', 'baguette', 'sandwich', 'kylling']
const SOT_TAGS = ['bolle', 'kanel', 'muffin', 'skolebrød', 'skolebrod', 'croissant', 'kake', 'cake', 'gulrot']
const KALD_DRIKKE_TAGS = ['juice', 'iste', 'smoothie', 'saft', 'mineralvann', 'brus']
const VARM_DRIKKE_TAGS = ['kaffe', 'coffee', 'cappuccino', 'latte', 'espresso', 'sjokolade', 'chocolate', 'tea']

// ─── «Kryssalget» ────────────────────────────────────────────────────────────
// KJERNE: et RELEVANT og godt timet kryssalg (drikke til maten) hjelper kunden
// og øker snittsalget — men presset eller irrelevant mersalg ødelegger
// opplevelsen. Forgrening: et pushy valg sender samtalen til et gjenopprettings-
// steg der du enten redder stemningen eller graver dypere.
export const KRYSSALGET: SalesScenario = {
  id: 'kryssalget',
  customerName: 'Amira',
  personaTag: 'Karriereorienterte',
  sprite: '/assets/raw/customers/amira.png',
  description: 'En kontoransatt på lunsjpause. Vil ha noe mettende raskt, og er åpen for et godt tips hvis det føles ekte og ikke som en pushet ekstrasalgs-runde.',
  hiddenNeed: 'Vil ha en enkel, mettende lunsj — og setter pris på et naturlig kryssalg (noe å drikke til) så lenge det ikke oppleves som pushing.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei! Jeg skal ha litt lunsj — har dere noe som faktisk metter?',
      note: 'Førsteinntrykk — vis at du vil hjelpe henne finne noe godt.',
      choices: [
        { id: 'inn_a', text: 'Absolutt — vi har både varme og kalde alternativer. Er du sulten-sulten, eller mest småsulten?', quality: 'good',
          feedback: 'Du åpner med et lite behovsspørsmål i stedet for å gjette. Det gjør at anbefalingen treffer bedre.' },
        { id: 'inn_b', text: 'Det ligger noe i disken der borte.', quality: 'warn',
          feedback: 'Passivt — hun må finne ut av alt selv, og du mister sjansen til å hjelpe og selge.' },
        { id: 'inn_c', text: 'Vi har det vi har, bare pek på noe.', quality: 'bad',
          feedback: 'Uinteressert tone. Kunden føler at du ikke gidder å hjelpe.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: LUNSJ_TAGS,
      customerLine: 'Ja, jeg er ganske sulten. Hva vil du anbefale av det mettende?',
      note: 'Anbefal en lunsjvare fra det du faktisk fører.',
    },
    {
      id: 'kryssalg',
      customerLine: '(ser ned i disken) Det tar jeg. Er det noe mer jeg burde ha?',
      note: 'Her ligger et naturlig kryssalg — men les tonen: hjelp, ikke press.',
      choices: [
        { id: 'kry_a', text: 'Mange liker noe å drikke til — skal jeg friste med det?', quality: 'good',
          sell: { needTags: KALD_DRIKKE_TAGS, addon: true },
          next: 'avslutt',
          feedback: 'Lærebok-kryssalg: en relevant vare (drikke til maten), tilbudt lavmælt. Øker salget og hjelper kunden samtidig.' },
        { id: 'kry_b', text: 'Nei, det holder nok med det.', quality: 'warn',
          next: 'avslutt',
          feedback: 'Helt greit, men du lot et åpenbart og relevant kryssalg gå — hun spurte til og med selv.' },
        { id: 'kry_c', text: 'Du BØR ta både drikke, kake OG en bolle — det er kjempegod deal!', quality: 'bad',
          feedback: 'Du dynger på uten å lese henne. Nå trekker hun seg — for mye, for fort.' },
      ],
    },
    {
      id: 'gjenoppr',
      customerLine: 'Åh … nei, det blir litt mye for en vanlig tirsdag, altså.',
      note: 'Du presset for hardt. Kan du redde stemningen?',
      choices: [
        { id: 'gj_a', text: 'Så klart — jeg ble litt ivrig. Bare maten, da, så er du i gang.', quality: 'good',
          feedback: 'Du tar et skritt tilbake og respekterer henne. En ærlig innrømmelse redder mye.' },
        { id: 'gj_b', text: 'Ok, men bare så du vet det, tilbudet er skikkelig bra …', quality: 'warn',
          feedback: 'Du slipper ikke helt taket. Hun kjøper maten, men følte seg litt maset.' },
        { id: 'gj_c', text: 'De fleste tar hele pakka, men greit for meg.', quality: 'bad',
          feedback: 'En liten stikk til slutt. Det får henne til å føle at hun valgte «feil».' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Supert, da tar jeg det.',
      note: 'Sisteinntrykket avgjør om lunsjkunden blir en fast en.',
      choices: [
        { id: 'av_a', text: 'Vær så god — god lunsj, og velkommen tilbake!', quality: 'good',
          feedback: 'Varm avslutning. En fornøyd lunsjkunde er en av de mest lojale du kan få.' },
        { id: 'av_b', text: 'Værsågod.', quality: 'warn',
          feedback: 'Grei, men litt flat avslutning på et ellers hyggelig møte.' },
        { id: 'av_c', text: '(skyver brettet mot henne uten å se opp)', quality: 'bad',
          feedback: 'Kald avslutning som visker ut det gode inntrykket fra samtalen.' },
      ],
    },
  ],
}

// ─── «Angreretten» ───────────────────────────────────────────────────────────
// KJERNE (forbrukervern): angrerett gjelder FJERNSALG (nett/utenfor butikk),
// IKKE et kjøp gjort i fysisk butikk. Butikken har ingen PLIKT til å ta varen
// tilbake ved ombestemthet (ingen mangel), men kan tilby BYTTE som kulanse.
// To feilmåter: rigid avvisning UTEN service, og å bekrefte en «angrerett» som
// ikke finnes. Ender i et kulanse-bytte (recommend av erstatningsvare).
export const ANGRERETTEN: SalesScenario = {
  id: 'angreretten',
  customerName: 'Bjørn',
  personaTag: 'Familieorienterte',
  sprite: '/assets/raw/customers/bjorn.png',
  description: 'En kunde som kjøpte en presangeske i går og har ombestemt seg. Krever pengene tilbake og viser til «14 dagers angrerett». Ingenting er i veien med varen.',
  hiddenNeed: 'Vil løses på en ryddig måte — men tror feilaktig at han har lovpålagt angrerett på et butikkjøp. Trenger en ærlig forklaring OG en serviceinnstilt løsning.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei, jeg kjøpte denne her i går, men jeg trenger den ikke likevel. Jeg har jo 14 dagers angrerett, så jeg vil ha pengene tilbake.',
      note: 'Han er sikker i sin sak. Møt ham rolig før du forklarer.',
      choices: [
        { id: 'inn_a', text: 'Så klart vi finner ut av det sammen — la meg bare forklare hvordan reglene faktisk henger sammen.', quality: 'good',
          feedback: 'Rolig og imøtekommende. Du avviser ikke, men signaliserer at du kan reglene.' },
        { id: 'inn_b', text: 'Nei, kjøpt er kjøpt. Det går ikke.', quality: 'warn',
          feedback: 'Du har rett i at han ikke har krav på refusjon, men den bråe tonen lukker samtalen unødvendig.' },
        { id: 'inn_c', text: 'Angrerett? Her er det ingen som får pengene tilbake fordi de ombestemmer seg.', quality: 'bad',
          feedback: 'Avvisende og litt hånlig. Selv når du har rett i sak, taper du kunden på tonen.' },
      ],
    },
    {
      id: 'rettigheter',
      customerLine: 'Hva mener du? Man har jo alltid 14 dagers angrerett, det vet da alle.',
      note: 'KJERNE: hva sier angrerettloven egentlig?',
      choices: [
        { id: 'rt_a', text: 'Angreretten gjelder når du handler på nett eller utenfor butikk — ikke når du kjøper i en fysisk butikk. Da har vi ingen plikt til å ta varen tilbake, men vi hjelper deg gjerne med et bytte.', quality: 'good',
          feedback: 'Riktig og trygt. Angrerettloven gjelder fjernsalg/salg utenom faste lokaler; et butikkjøp uten mangel gir ingen angrerett. Du følger opp med kulanse — faglig sterkt.' },
        { id: 'rt_b', text: 'Hmm, jeg er faktisk ikke helt sikker på om det gjelder i butikk … la meg tenke.', quality: 'warn',
          feedback: 'Ærlig, men vinglete. Kunne du regelen, sto du tryggere og fremsto mer profesjonell.' },
        { id: 'rt_c', text: 'Jo, du har helt rett — selvsagt får du pengene tilbake, her.', quality: 'bad',
          feedback: 'Faktafeil. Du bekrefter en angrerett som ikke finnes på butikkjøp. Å gi feil informasjon (og gi bort penger på feil grunnlag) er ikke god service — det er bare feil.' },
      ],
    },
    {
      id: 'losning',
      customerLine: 'Ok … så jeg får altså ikke pengene tilbake?',
      note: 'Vis at «nei til refusjon» ikke betyr «nei til hjelp».',
      choices: [
        { id: 'ls_a', text: 'Ikke penger tilbake, nei — men du får gjerne bytte den i noe annet du får glede av. Skal vi finne noe?', quality: 'good',
          feedback: 'Du skiller klart mellom plikt (ingen refusjon) og service (bytte i kulanse). Det snur en skuffelse til en grei opplevelse.' },
        { id: 'ls_b', text: 'Jeg kan vel gi deg et tilgodelapp på halve summen, kanskje.', quality: 'warn',
          feedback: 'En halvveis løsning uten forankring i noen regel — virker litt tilfeldig og kan skape presedens du ikke vil ha.' },
        { id: 'ls_c', text: 'Nei. Da får du bare beholde den.', quality: 'bad',
          feedback: 'Teknisk innafor, men helt uten kulanse. Han går misfornøyd og forteller det gjerne videre.' },
      ],
    },
    {
      id: 'bytte',
      kind: 'recommend',
      recommendNeed: SOT_TAGS,
      customerLine: 'Greit, da bytter jeg heller i noe jeg faktisk får brukt. Hva foreslår du?',
      note: 'Anbefal en erstatningsvare fra sortimentet — gjør byttet til noe positivt.',
    },
    {
      id: 'avslutt',
      customerLine: '(litt lettere til sinns) Det var jo egentlig en grei løsning.',
      note: 'Sisteinntrykket avgjør om han husker deg som ryddig eller sur.',
      choices: [
        { id: 'av_a', text: 'Så bra! Godt vi fant noe. Velkommen tilbake, Bjørn.', quality: 'good',
          feedback: 'Varmt og profesjonelt. Du håndterte en misforståelse uten å gi etter på fakta — og beholdt kunden.' },
        { id: 'av_b', text: 'Greit. Ha det.', quality: 'warn',
          feedback: 'Korrekt, men litt flatt etter en sak der du faktisk løste det fint.' },
        { id: 'av_c', text: '(trekker på skuldrene og snur deg vekk)', quality: 'bad',
          feedback: 'Kald avslutning som gjør at han husker friksjonen, ikke løsningen.' },
      ],
    },
  ],
}

// ─── «Hastverkskunden» ───────────────────────────────────────────────────────
// KJERNE: les tidsrammen og tilpass tilbudet til den — en grab-and-go-vare, rask
// betaling, INGEN mersalg som stjeler tid. Kontrast til Morgenkunden (der et
// mersalg var naturlig): her er tid selve behovet, og pushing er feilen.
// Forgrening: et mersalgsforsøk sender samtalen til et irritasjons-steg.
export const HASTVERKSKUNDEN: SalesScenario = {
  id: 'hastverkskunden',
  customerName: 'Camilla',
  personaTag: 'Karriereorienterte',
  sprite: '/assets/raw/customers/camilla.png',
  description: 'En kunde med under to minutter før toget går. Vil ha noe kjapt å ta med, og har null tid til overs — men husker godt hvem som hjalp henne effektivt.',
  hiddenNeed: 'Trenger noe raskt hun kan ta med UTEN venting — tid er behovet. Et mersalg som forsinker henne er det verste du kan gjøre nå.',
  steps: [
    {
      id: 'inn',
      customerLine: '(stresset) Hei, jeg har halvannet minutt før toget — noe kjapt jeg bare kan gripe med meg?',
      note: 'Førsteinntrykk under tidspress — vær rolig og effektiv.',
      choices: [
        { id: 'inn_a', text: 'Ja! Skal du ha noe søtt eller mettende? Så plukker jeg noe ferdig med en gang.', quality: 'good',
          feedback: 'Du tar tidspresset på alvor og styrer rett mot en ferdigvare. Nøyaktig det hun trenger.' },
        { id: 'inn_b', text: 'Vi kan lage en fersk latte, den er straks klar …', quality: 'warn',
          feedback: 'Godt ment, men noe som må LAGES tar tid hun ikke har. Du leser ikke situasjonen.' },
        { id: 'inn_c', text: 'Du får stille deg i køen som alle andre.', quality: 'bad',
          feedback: 'Brysk og lite hjelpsomt akkurat når hun trenger fart. Dårlig start.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: BAKEVARE_TAGS,
      customerLine: 'Noe mettende jeg kan spise på toget. Hva går raskest?',
      note: 'Anbefal en ferdig vare hun kan ta med seg med en gang.',
    },
    {
      id: 'fristelse',
      customerLine: 'Perfekt, den tar jeg. (leter etter kortet)',
      note: 'Fristelsen: skal du prøve et mersalg nå? Les klokka.',
      choices: [
        { id: 'fr_a', text: 'Kort her — så er du klar. Ha en fin togtur!', quality: 'good',
          next: 'avslutt',
          feedback: 'Du prioriterer farten hennes framfor et ekstrasalg. Det er riktig prioritering akkurat nå — og hun husker det.' },
        { id: 'fr_b', text: 'Vil du ha en kaffe med på veien også, kjapt?', quality: 'warn',
          next: 'avslutt',
          feedback: 'Fristende, men et mersalg her risikerer å forsinke henne. Timing er alt — dette var feil øyeblikk.' },
        { id: 'fr_c', text: 'Vent, du MÅ smake den nye smoothien vår først, den lager jeg kjapt!', quality: 'bad',
          feedback: 'Du stjeler tiden hennes med et mersalg hun ikke har rom for. Nå stresser hun for alvor.' },
      ],
    },
    {
      id: 'irritasjon',
      customerLine: '(ser på klokka) Nei nei, jeg REKKER ikke det — jeg må løpe!',
      note: 'Du forsinket henne. Redd det du kan.',
      choices: [
        { id: 'ir_a', text: 'Beklager! Her — bare løp, så er dette unnagjort. Lykke til!', quality: 'good',
          feedback: 'Du innser feilen og får henne raskt av gårde. En kjapp unnskyldning demper skaden.' },
        { id: 'ir_b', text: 'Det tar jo bare et sekund, da …', quality: 'warn',
          feedback: 'Du holder fortsatt på henne. Hun rekker det så vidt, men gikk stresset ut.' },
        { id: 'ir_c', text: 'Slapp av, toget venter sikkert.', quality: 'bad',
          feedback: 'Du bagatelliserer stresset hennes helt. Det oppleves respektløst.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Takk — det var kjapt!',
      note: 'Et effektivt møte kan gi en kunde som kommer tilbake nettopp fordi det gikk fort.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — velkommen tilbake når du har det travelt igjen!', quality: 'good',
          feedback: 'Varm og treffende avslutning. Du gjorde farten til et konkurransefortrinn.' },
        { id: 'av_b', text: 'Ha det.', quality: 'warn',
          feedback: 'Grei, men litt anonym avslutning.' },
        { id: 'av_c', text: '(er allerede opptatt med neste)', quality: 'bad',
          feedback: 'Du glemmer henne før hun er ute av døra — synd etter en ellers rask ekspedering.' },
      ],
    },
  ],
}

// ─── «Gavekjøpet» ────────────────────────────────────────────────────────────
// KJERNE: når kunden kjøper til NOEN ANDRE, må du avdekke MOTTAKERENS behov — i
// TO LEDD: hvem/anledning, så hva mottakeren liker. Feilen er å anbefale ut fra
// kjøperens egen smak. Nøytral, mottaker-tilpasset anbefaling til slutt.
export const GAVEKJOPET: SalesScenario = {
  id: 'gavekjopet',
  customerName: 'David',
  personaTag: 'Familieorienterte',
  sprite: '/assets/raw/customers/david.png',
  description: 'En kunde som skal kjøpe en avskjedsgave til en kollega, men vet ikke helt hva. Kjenner mottakeren litt, men trenger hjelp til å tenke ut fra HENNE.',
  hiddenNeed: 'Kjøper til en annen — trenger hjelp til å avdekke MOTTAKERENS smak (ikke sin egen) før han velger. To ledd: hvem/anledning, så hva hun liker.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei, jeg skal kjøpe noe til noen andre, men jeg vet ærlig talt ikke hva jeg skal velge.',
      note: 'Førsteinntrykk — start med å forstå gaven, ikke å foreslå noe.',
      choices: [
        { id: 'inn_a', text: 'Så hyggelig — fortell litt: hvem er det til, og hva er anledningen?', quality: 'good',
          feedback: 'Du starter i riktig ende: hvem gaven er TIL. Det er første ledd i å treffe en mottaker du ikke kjenner.' },
        { id: 'inn_b', text: 'Jeg ville tatt en kaffe og en bolle, det liker jo jeg.', quality: 'warn',
          feedback: 'Du anbefaler ut fra DIN smak, ikke mottakerens. En gave handler om den som skal få den.' },
        { id: 'inn_c', text: 'Bare ta noe kake, det funker til alt.', quality: 'bad',
          feedback: 'Et tilfeldig forslag uten å vite noe om mottakeren. Kan fort bli helt feil gave.' },
      ],
    },
    {
      id: 'hvem',
      customerLine: 'Det er til en kollega som slutter hos oss. Jeg vil gi noe litt koselig.',
      note: 'Første ledd er på plass — grav videre etter mottakerens smak.',
      choices: [
        { id: 'hv_a', text: 'Så fint. Vet du hva hun liker — er hun typen for søtt, eller mer sunt og lett?', quality: 'good',
          feedback: 'Andre ledd i behovsavdekkingen: hva liker MOTTAKEREN. Nå er du på god vei til å treffe.' },
        { id: 'hv_b', text: 'Ok, da tar vi bare noe pent innpakket.', quality: 'warn',
          feedback: 'Du hopper over det viktigste — hva hun faktisk liker. Innpakning redder ikke feil innhold.' },
        { id: 'hv_c', text: 'En som slutter? Da spiller det vel ikke så stor rolle.', quality: 'bad',
          feedback: 'Nedvurderer både gaven og kollegaen. Det gjør David usikker på om han bør handle her.' },
      ],
    },
    {
      id: 'hva',
      customerLine: 'Hun elsker søtsaker, men hun drikker faktisk ikke kaffe i det hele tatt.',
      note: 'Nå har du to konkrete holdepunkter — bruk dem BEGGE i anbefalingen.',
      choices: [
        { id: 'ha_a', text: 'Da styrer vi unna kaffe og finner noe skikkelig godt og søtt til henne.', quality: 'good',
          feedback: 'Du bruker BEGGE opplysningene: søtt ja, kaffe nei. Det er å lytte hele veien, ikke bare halvveis.' },
        { id: 'ha_b', text: 'Alle liker jo en god kaffe egentlig, den tar vi med.', quality: 'bad',
          feedback: 'Du overkjører det hun akkurat sa (drikker ikke kaffe). Da bommer gaven fullstendig.' },
        { id: 'ha_c', text: 'Søtt, ok. Vi tar noe standard søtt, da.', quality: 'warn',
          feedback: 'Du fanget «søtt», men ganske generisk. Litt mer omtanke hadde gjort gaven mer personlig.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: SOT_TAGS,
      customerLine: 'Ja! Noe søtt hun kan kose seg med. Hva vil du anbefale?',
      note: 'Anbefal en søt vare tilpasset mottakeren — ikke kaffe.',
    },
    {
      id: 'mersalg',
      customerLine: 'Perfekt. Trenger jeg noe mer for at det skal føles som en ordentlig gave?',
      note: 'Et relevant mersalg kan løfte gaven — men det skal passe mottakeren, ikke bare øke summen.',
      choices: [
        { id: 'me_a', text: 'Kanskje noe kaldt og godt å drikke til, siden hun ikke tar kaffe?', quality: 'good',
          sell: { needTags: KALD_DRIKKE_TAGS, addon: true },
          feedback: 'Et mersalg som fortsatt respekterer mottakeren (ikke kaffe). Det gjør gaven mer komplett, ikke bare dyrere.' },
        { id: 'me_b', text: 'Nei, det holder fint med det.', quality: 'warn',
          feedback: 'Helt greit, men han spurte selv — et lite, mottaker-tilpasset tillegg hadde vært naturlig.' },
        { id: 'me_c', text: 'Ta med en kaffe også, så har du litt å velge i.', quality: 'bad',
          feedback: 'Igjen kaffe, til en som ikke drikker det. Du glemmer mottakeren for å få opp salget.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Tusen takk, dette blir en fin gave!',
      note: 'En kunde du hjalp med en gave, husker deg neste gang han skal gi noe.',
      choices: [
        { id: 'av_a', text: 'Så hyggelig — jeg håper hun blir glad, og lykke til med avskjeden!', quality: 'good',
          feedback: 'Varm, personlig avslutning som knytter gaven til øyeblikket. Sterkt sisteinntrykk.' },
        { id: 'av_b', text: 'Bare hyggelig.', quality: 'warn',
          feedback: 'Grei, men en sjanse til å gjøre en fin gavehandel enda varmere glapp.' },
        { id: 'av_c', text: '(pakker det ned uten et ord)', quality: 'bad',
          feedback: 'Kald avslutning som tar litt av gleden ut av gavekjøpet.' },
      ],
    },
  ],
}

// ─── «Studentrabatten» ───────────────────────────────────────────────────────
// KJERNE: konsistent prispolitikk og likebehandling. En saklig rabatt-forespørsel
// (studentrabatt) møtes med ærlighet — enten har dere en ordning eller ikke — og
// en RETTFERDIG verdi (lojalitetskort), ALDRI en tilfeldig «hysj-rabatt» som
// undergraver prisintegriteten og forskjellsbehandler. Kontrast til Prutekunden
// (aggressiv pruting): dette er et rimelig spørsmål, ikke et press.
export const STUDENTRABATTEN: SalesScenario = {
  id: 'studentrabatten',
  customerName: 'Emil',
  personaTag: 'Prisbevisste',
  sprite: '/assets/raw/customers/emil.png',
  description: 'En student som lurer på om dere har studentrabatt. Han maser ikke — det er et ærlig spørsmål fra en med stram økonomi.',
  hiddenNeed: 'Vil egentlig bare vite om det finnes en ordning, og bli møtt med respekt. En rettferdig verdi (lojalitetskort) treffer bedre enn en tilfeldig rabatt som forskjellsbehandler.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei! Har dere studentrabatt? Alt er ganske dyrt når man er student, liksom.',
      note: 'Et rimelig spørsmål. Svaret ditt handler like mye om tone som om pris.',
      choices: [
        { id: 'inn_a', text: 'Godt spørsmål! La meg si det som det er — så finner vi ut hva som lønner seg for deg.', quality: 'good',
          feedback: 'Vennlig og ærlig åpning. Du tar spørsmålet på alvor uten å love noe ennå.' },
        { id: 'inn_b', text: 'Eh … nei? Eller, jo, kanskje litt, vet ikke helt.', quality: 'warn',
          feedback: 'Vinglete. Uklarhet rundt egne priser gjør deg utrygg å handle hos.' },
        { id: 'inn_c', text: 'Har du ikke råd, får du la være å kjøpe.', quality: 'bad',
          feedback: 'Nedlatende og unødvendig. Du mister en potensiell stamkunde på et helt vanlig spørsmål.' },
      ],
    },
    {
      id: 'politikk',
      customerLine: 'Så … finnes det en rabatt, eller?',
      note: 'KJERNE: hva er en ryddig prispolitikk her?',
      choices: [
        { id: 'po_a', text: 'Vi har ikke egen studentrabatt — prisen er den samme for alle. Men vi har et kaffekort: hver tiende kaffe er gratis. Er du innom ofte, lønner det seg godt.', quality: 'good',
          feedback: 'Ryddig prispolitikk: samme pris for alle, men en RETTFERDIG verdi som gjelder likt for alle kunder. Det bygger lojalitet uten å undergrave prisen.' },
        { id: 'po_b', text: 'Egentlig ikke, men jeg kan gi deg ti prosent i smug — ikke si det til de andre.', quality: 'warn',
          feedback: 'En «hysj-rabatt» forskjellsbehandler og undergraver din egen prisintegritet. Det som virker snilt nå, skaper trøbbel når andre hører om det.' },
        { id: 'po_c', text: 'Nei. Ingen rabatt, punktum.', quality: 'bad',
          feedback: 'Du har rett i at dere ikke MÅ gi rabatt, men den avvisende tonen — uten å tilby noe som helst — sender en grei kunde ut døra.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: KAFFE_TAGS,
      customerLine: 'Kaffekort, det var jo smart. Hva vil du anbefale da?',
      note: 'Anbefal fra sortimentet — vis at prisen følger med en ekte vare og verdi.',
    },
    {
      id: 'lojalitet',
      customerLine: 'Ok, jeg tar den. Og det kaffekortet, det er gratis å få?',
      note: 'Lojalitetstilbud er et mersalg som binder kunden uten å gi bort marginen.',
      choices: [
        { id: 'lo_a', text: 'Helt gratis — her får du kortet, så stempler vi det hver gang du er innom.', quality: 'good',
          feedback: 'Du gjør lojalitetsordningen konkret og enkel. Nå har du en grunn til at han kommer tilbake — uten å ha kuttet prisen.' },
        { id: 'lo_b', text: 'Ja da, det ligger vel et sted her.', quality: 'warn',
          feedback: 'Du tilbyr det halvhjertet. En god lojalitetsordning fortjener litt mer entusiasme for å faktisk virke.' },
        { id: 'lo_c', text: 'Glem det kortet, det er egentlig litt kronglete.', quality: 'bad',
          feedback: 'Du snakker ned din egen ordning og mister det ene verktøyet som kunne gjort ham til stamkunde.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Fett, takk! Da blir det nok flere kaffe her.',
      note: 'En student som føler seg rettferdig behandlet, blir gjerne en trofast kunde i årevis.',
      choices: [
        { id: 'av_a', text: 'Det håper jeg — velkommen tilbake, så fyller vi opp kortet!', quality: 'good',
          feedback: 'Varm avslutning som bekrefter lojalitetsløftet. Du vant en langsiktig kunde uten å røre prisen.' },
        { id: 'av_b', text: 'Bra, ha det.', quality: 'warn',
          feedback: 'Grei, men litt flat avslutning på et møte som gikk fint.' },
        { id: 'av_c', text: '(nikker mot neste i køen)', quality: 'bad',
          feedback: 'Kald avslutning som svekker den gode følelsen du nettopp bygde.' },
      ],
    },
  ],
}

// ─── «Likeverd» ──────────────────────────────────────────────────────────────
// KJERNE (universell utforming/service): møt en kunde med nedsatt funksjonsevne
// likeverdig og kompetent. Live er svaksynt og har førerhund. Snakk til HENNE
// (ikke om henne), les menyen høyt, tilby praktisk hjelp uten å umyndiggjøre.
// Førerhund har adgang også der dyr ellers ikke slippes inn. RYKTE er metrikken.
export const LIKEVERD: SalesScenario = {
  id: 'likeverd',
  customerName: 'Live',
  personaTag: 'Familieorienterte',
  sprite: '/assets/raw/customers/live.png',
  outcomeKind: 'service',
  description: 'En svaksynt kunde som kommer inn med førerhund. Hun kan ikke lese menyen selv, og merker fort om hun blir møtt som en likeverdig kunde eller som et problem.',
  hiddenNeed: 'Vil handle som alle andre — bli snakket TIL (ikke om), få menyen lest opp, og få praktisk hjelp uten å bli umyndiggjort eller avvist på grunn av hunden.',
  steps: [
    {
      id: 'inn',
      customerLine: '(med førerhund) Hei! Er det greit at hunden er med? Og kan noen lese opp hva dere har? Jeg ser dessverre ikke menyen.',
      note: 'Førsteinntrykk — dette avgjør om hun føler seg velkommen i det hele tatt.',
      choices: [
        { id: 'inn_a', text: 'Hjertelig velkommen — førerhund er selvsagt greit. Jeg leser gjerne opp hele menyen for deg, i ro og mak.', quality: 'good',
          feedback: 'Akkurat riktig: førerhund har adgang også der dyr ellers ikke slipper inn, og du tilbyr å lese menyen som en selvfølge. Hun føler seg velkommen med en gang.' },
        { id: 'inn_b', text: 'Hunden … ja, det går vel greit. Menyen henger jo der oppe.', quality: 'warn',
          feedback: 'Nølingen rundt hunden og «den henger jo der» hjelper henne ikke — hun sa jo nettopp at hun ikke ser den.' },
        { id: 'inn_c', text: 'Beklager, vi har ikke dyr inne her. Og menyen er over disken.', quality: 'bad',
          feedback: 'Feil og ekskluderende. Å nekte førerhund adgang er å stenge ute en kunde med rett til å ha den med — og «menyen er der» ignorerer at hun ikke kan lese den.' },
      ],
    },
    {
      id: 'les',
      customerLine: 'Så snilt. Hva har dere av varmt å drikke, for eksempel?',
      note: 'Les opp og beskriv — gi henne det samme grunnlaget for å velge som alle andre får.',
      choices: [
        { id: 'le_a', text: 'Vi har kaffe, cappuccino, latte, te og varm sjokolade. Vil du at jeg beskriver noen av dem nærmere?', quality: 'good',
          feedback: 'Tydelig, rolig og fullstendig. Du gir henne reelle valgmuligheter og lar HENNE bestemme.' },
        { id: 'le_b', text: 'Vi har det meste, vanlig kafégreier.', quality: 'warn',
          feedback: 'Altfor vagt. «Vanlig kafégreier» gir henne ingenting å velge ut fra.' },
        { id: 'le_c', text: 'Bare ta en kaffe, det er enklest for oss begge.', quality: 'bad',
          feedback: 'Du velger FOR henne for å spare tid. Det umyndiggjør en voksen kunde som helt fint kan velge selv.' },
      ],
    },
    {
      id: 'verdighet',
      customerLine: '(en annen kunde bak henne sukker utålmodig)',
      note: 'KJERNE: la ikke tidspress gjøre deg nedlatende — behandle henne som hvilken som helst kunde.',
      choices: [
        { id: 've_a', text: '(rolig, til Live) Ta den tiden du trenger. (til køen) Kollegaen min tar neste, bare kom.', quality: 'good',
          feedback: 'Forbilledlig: du lar henne beholde verdigheten OG løser køen praktisk. Ingen får følelsen av å være til bry.' },
        { id: 've_b', text: '(til Live, høyt og sakte) SKAL. DU. HA. KAFFE?', quality: 'bad',
          feedback: 'Svaksynt betyr ikke at hun hører eller forstår dårlig. Å snakke overtydelig og høyt er nedlatende, ikke hjelpsomt.' },
        { id: 've_c', text: '(til kunden bak) Beklager, dette tar litt tid, hun ser jo ikke.', quality: 'warn',
          feedback: 'Du snakker OM henne til andre, som om hun ikke er til stede. Selv velment blir det umyndiggjørende.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: VARM_DRIKKE_TAGS,
      customerLine: 'Da tar jeg gjerne noe varmt — hva vil du anbefale?',
      note: 'Anbefal fra sortimentet, som til hvilken som helst kunde.',
    },
    {
      id: 'avslutt',
      customerLine: 'Tusen takk. Det er ikke alle steder man blir møtt så greit.',
      note: 'Tilby praktisk hjelp videre — men spør, ikke overta.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig! Vil du at jeg bærer den til et bord, eller ordner du deg fint selv?', quality: 'good',
          feedback: 'Du tilbyr hjelp OG lar henne velge om hun vil ha den. Det er kjernen i likeverdig service — velkommen tilbake-følelsen sitter.' },
        { id: 'av_b', text: 'Bare hyggelig.', quality: 'warn',
          feedback: 'Grei, men du kunne tilbudt den lille praktiske hånda som gjør besøket helt sømløst.' },
        { id: 'av_c', text: '(tar armen hennes og drar henne mot et bord uten å spørre)', quality: 'bad',
          feedback: 'Aldri ta tak i noen uten å spørre først. Velment, men det fratar henne kontrollen — det motsatte av god hjelp.' },
      ],
    },
  ],
}

// ─── «Ventetiden» ────────────────────────────────────────────────────────────
// KJERNE (service recovery UTEN reklamasjonseskalering): en lang kø er ingen
// mangel — men et servicetap. Erkjenn, beklag ærlig UTEN bortforklaring, gjør et
// konkret tiltak, og gi en RIMELIG (ikke overdådig) kompensasjon. RYKTE er
// metrikken; en liten gest koster litt her og da (cost).
export const VENTETIDEN: SalesScenario = {
  id: 'ventetiden',
  customerName: 'Petter',
  personaTag: 'Karriereorienterte',
  sprite: '/assets/raw/customers/petter.png',
  outcomeKind: 'service',
  description: 'En kunde som har stått lenge i kø og er tydelig irritert. Ingenting er galt med varen — det er ventetiden og følelsen av å ikke bli prioritert som svir.',
  hiddenNeed: 'Vil bli hørt og få en ærlig beklagelse — ikke bortforklaringer. En liten, oppriktig gest veier tyngre enn en stor unnskyldning full av «men».',
  steps: [
    {
      id: 'inn',
      customerLine: '(irritert) Jeg har stått i kø i et kvarter for én kaffe. Dette er rett og slett for dårlig.',
      note: 'Han er oppgitt. Det første du sier avgjør om det roer seg eller eskalerer.',
      choices: [
        { id: 'inn_a', text: 'Du har helt rett, og det beklager jeg oppriktig. Et kvarter er altfor lenge å vente.', quality: 'good',
          feedback: 'Du eier problemet uten unnskyldninger. En ærlig beklagelse tar mye av brodden med en gang.' },
        { id: 'inn_b', text: 'Beklager, men vi er jo underbemannet i dag, så …', quality: 'warn',
          feedback: 'Beklagelsen drukner i en bortforklaring. «Men» gjør at det høres ut som det er hans problem å forstå.' },
        { id: 'inn_c', text: 'Alle andre venter jo også, det er ikke bare deg.', quality: 'bad',
          feedback: 'Defensivt og avvisende. Du gjør ham til problemet i stedet for å ta ansvar for ventetiden.' },
      ],
    },
    {
      id: 'tiltak',
      customerLine: 'Ja, for det er jo ikke akkurat første gang det er treigt her.',
      note: 'Vis at du gjør noe KONKRET med det, ikke bare beklager i det tomme.',
      choices: [
        { id: 'ti_a', text: 'Jeg henter en kollega til kassa nå med en gang, så løsner køen. Din kaffe tar jeg først.', quality: 'good',
          feedback: 'Konkret handling slår tomme ord. Du viser at beklagelsen betyr noe i praksis.' },
        { id: 'ti_b', text: 'Vi skal prøve å bli flinkere framover.', quality: 'warn',
          feedback: 'Godt ment, men vagt. Et løfte om «framover» hjelper ham ikke akkurat nå.' },
        { id: 'ti_c', text: 'Det er ikke stort jeg får gjort med bemanningen, altså.', quality: 'bad',
          feedback: 'Du fraskriver deg ansvaret helt. Selv en liten handling hadde vært bedre enn en skuldertrekning.' },
      ],
    },
    {
      id: 'kompensasjon',
      customerLine: '(litt mildere) Vel … greit at du tar det på alvor, i hvert fall.',
      note: 'KJERNE: en RIMELIG gest kan gjenopprette tilliten — men den skal stå i forhold til saken.',
      choices: [
        { id: 'ko_a', text: 'Kaffen er på huset i dag — som en liten unnskyldning for ventetiden.', quality: 'good',
          cost: 39,
          feedback: 'En liten, passende gest. Det koster lite her og da, men forteller ham at han er verdt noe for dere.' },
        { id: 'ko_b', text: 'Beklager igjen, men jeg kan dessverre ikke gi deg noe for bryet.', quality: 'warn',
          feedback: 'Ærlig, men du lot en billig sjanse til å gjenopprette tilliten gå. En liten gest hadde snudd stemningen helt.' },
        { id: 'ko_c', text: 'Vet du hva, ta gratis kaffe HELE uka, og en kake, og —', quality: 'bad',
          feedback: 'Overkompensasjon. Å gi bort altfor mye virker desperat og spiser marginen unødig — gesten skal stå i forhold til saken.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Det setter jeg pris på. Da var det ikke så ille likevel.',
      note: 'En godt håndtert klage kan gjøre en misfornøyd kunde MER lojal enn før.',
      choices: [
        { id: 'av_a', text: 'Takk for tålmodigheten, Petter — og velkommen tilbake, forhåpentlig til kortere kø!', quality: 'good',
          feedback: 'Varm avslutning som snur en dårlig opplevelse til en god historie. Slikt husker folk.' },
        { id: 'av_b', text: 'Ha en fin dag videre.', quality: 'warn',
          feedback: 'Grei, men litt flat etter en sak du faktisk reddet fint.' },
        { id: 'av_c', text: '(er allerede i gang med neste kunde)', quality: 'bad',
          feedback: 'Kald avslutning som visker ut gjenopprettingen du nettopp gjorde.' },
      ],
    },
  ],
}

// ─── «Førstegangskunden» ─────────────────────────────────────────────────────
// KJERNE: møt en usikker førstegangskunde der hun er — oversett fagsjargong
// (flat white, cortado) til vanlig språk, spør om smak, anbefal ut fra det. Ikke
// nedlatende, ikke sjargong-skryt. Variant 2 av «Den usikre»: her er usikkerheten
// SPRÅKLIG/terskel-basert, ikke anledning-basert (som Marens selskap).
export const FORSTEGANGSKUNDEN: SalesScenario = {
  id: 'forstegangskunden',
  customerName: 'Oda',
  personaTag: 'Helsebevisste',
  sprite: '/assets/raw/customers/oda.png',
  description: 'En ung kunde som aldri har vært på en «ordentlig» kaffebar før. Menyen med flat white og cortado føles fremmed, og hun er redd for å spørre dumt.',
  hiddenNeed: 'Vil ha hjelp til å forstå menyen i vanlige ord og finne noe hun faktisk vil like — uten å bli møtt med sjargong eller en nedlatende tone.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei … jeg har egentlig aldri vært på en sånn kaffebar før. Jeg skjønner ikke helt alt på menyen — flat white, cortado og sånt.',
      note: 'Førsteinntrykk — senk terskelen, ikke hev den.',
      choices: [
        { id: 'inn_a', text: 'Så hyggelig at du prøver oss! Ikke tenk på de fine navnene — vi finner noe du liker sammen.', quality: 'good',
          feedback: 'Du ufarliggjør situasjonen med en gang. En trygg førstegangskunde blir ofte en fast en.' },
        { id: 'inn_b', text: 'En flat white er jo bare espresso med lettskummet melk i mikroskum, da.', quality: 'warn',
          feedback: 'Du svarer med enda mer sjargong. Godt ment, men det gjør henne bare mer usikker.' },
        { id: 'inn_c', text: 'Det står jo på menyen. Det er egentlig ganske basic.', quality: 'bad',
          feedback: 'Nedlatende. «Basic» får henne til å føle seg dum for at hun spurte — motsatt av det du vil.' },
      ],
    },
    {
      id: 'oversett',
      customerLine: 'Ja, jeg vil jo ikke bestille noe jeg ender opp med å ikke like …',
      note: 'KJERNE: oversett til smak, ikke teknikk. Spør om det hun FAKTISK kan svare på.',
      choices: [
        { id: 'ov_a', text: 'Helt enkelt: vil du ha noe sterkt og lite, eller mildt med mye melk? Så tar vi det derfra.', quality: 'good',
          feedback: 'Du gjør et sjargong-problem om til et smaks-spørsmål hun lett kan svare på. Akkurat sånn man møter en nybegynner.' },
        { id: 'ov_b', text: 'Bare velg noe, du kan jo bytte om du ikke liker det.', quality: 'warn',
          feedback: 'Passivt — hun ba nettopp om hjelp til å slippe å gjette. Du overlater henne til seg selv igjen.' },
        { id: 'ov_c', text: 'De fleste tar bare en latte, ta det du også.', quality: 'bad',
          feedback: 'Du velger for henne uten å vite hva hun liker. Treffer det ikke, sitter hun igjen med en dårlig førsteopplevelse.' },
      ],
    },
    {
      id: 'preferanse',
      customerLine: 'Jeg liker vel egentlig ikke så bitre ting … noe mildt, kanskje?',
      note: 'Nå ga hun deg et konkret holdepunkt — bruk det.',
      choices: [
        { id: 'pr_a', text: 'Da har jeg akkurat det for deg — noe mildt og lettdrikkelig, perfekt for en start.', quality: 'good',
          feedback: 'Du bygger direkte på det hun sa (mild). Hun føler seg hørt og tør å stole på anbefalingen.' },
        { id: 'pr_b', text: 'Mildt, ok. Vi tar noe standard, da.', quality: 'warn',
          feedback: 'Du fanget «mild», men litt likegyldig. Hun hadde fortjent litt mer omtanke på sitt første besøk.' },
        { id: 'pr_c', text: 'Du burde egentlig prøve den sterkeste vi har, den er best.', quality: 'bad',
          feedback: 'Du overkjører smaken hennes (hun sa mild). En bitter espresso først kan skremme henne fra kaffebarer for godt.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: VARM_DRIKKE_TAGS,
      customerLine: 'Ja takk, noe mildt! Hva anbefaler du?',
      note: 'Anbefal en mild, nybegynnervennlig drikke fra sortimentet.',
    },
    {
      id: 'avslutt',
      customerLine: 'Åh, den var jo faktisk kjempegod! Takk for hjelpen.',
      note: 'Et godt første møte avgjør om hun noen gang kommer tilbake til en kaffebar.',
      choices: [
        { id: 'av_a', text: 'Så gøy at du likte den! Nå kan du menyen litt bedre — velkommen tilbake når som helst.', quality: 'good',
          feedback: 'Varm og myndiggjørende avslutning. Du gjorde en usikker nybegynner til en trygg gjest.' },
        { id: 'av_b', text: 'Bare hyggelig.', quality: 'warn',
          feedback: 'Grei, men du kunne forsterket mestringsfølelsen hun nettopp fikk.' },
        { id: 'av_c', text: '(nikker og rydder disken)', quality: 'bad',
          feedback: 'Kald avslutning som ikke bygger videre på den fine opplevelsen hun akkurat hadde.' },
      ],
    },
  ],
}

export const SCENARIOS: SalesScenario[] = [
  MORGENKUNDEN, REKLAMASJONEN, ALLERGIKEREN, PRUTEKUNDEN, DEN_USIKRE, STORBESTILLINGEN,
  KRYSSALGET, ANGRERETTEN, HASTVERKSKUNDEN, GAVEKJOPET, STUDENTRABATTEN, LIKEVERD, VENTETIDEN, FORSTEGANGSKUNDEN,
]

/** BRANSJE-DEFINISJON — id-ene kafeens IndustryDefinition.scenariePool peker
 *  til (industryDefinition.ts). Alle scenarier i SCENARIOS er kafé-scenarier
 *  i dag, så listen er foreløpig identisk med SCENARIOS sine id-er — men
 *  eksplisitt her (ikke utledet inline i industryDefinition.ts), så en
 *  fremtidig bransje 2 med EGNE scenarier ikke ved et uhell arver kafeens. */
// ═══════════════════════════════════════════════════════════════════════════
// KLESBUTIKK-SCENARIER (bransje 2 — kv1011/kv1012)
// Skrevet mot KLESBUTIKK-definisjonen. AKTIVERES IKKE (KLESBUTIKK er ikke
// registrert i INDUSTRY_DEFINITIONS) — de skal bare FINNES og TYPESJEKKE.
// Samme motor/konvensjoner som kafeen.
// PRODUKTREFERANSER: needTags treffer BÅDE katalog-id OG bokmålsnavn (+ vanlige
// synonymer), så oppslaget er robust om id-er justeres. Antatt fashion-katalog:
// hoodie/tshirt/jeans/sneakers/cap/bag — se antakelser i rapporten.
// SPRITE: peker til /assets/raw/customers/fashion/*.png (finnes ikke ennå, men
// rendres aldri siden bransjen er inaktiv) — se rapport.
// ═══════════════════════════════════════════════════════════════════════════

const OVERDEL_TAGS = ['hettegenser', 'hoodie', 'genser', 't-skjorte', 'tshirt', 'skjorte', 'topp', 'overdel']
const BUKSE_TAGS = ['jeans', 'bukse', 'bukser', 'denim']
const ACCESSOAR_TAGS = ['caps', 'lue', 'veske', 'bag', 'sekk', 'accessoar', 'tilbehør']
const PLAGG_TAGS = ['hettegenser', 'hoodie', 'genser', 't-skjorte', 'tshirt', 'skjorte', 'jeans', 'bukse', 'sneakers', 'sko', 'caps', 'veske', 'bag', 'plagg']

// ─── «Størrelsesrådet» ───────────────────────────────────────────────────────
// KJERNE: hjelp med passform uten å GJETTE størrelse (kan såre) — spør om ønsket
// passform og tilby prøving. Størrelse er sensitivt; prøverommet er verktøyet.
export const STORRELSESRAADET: SalesScenario = {
  id: 'storrelsesraadet',
  customerName: 'Selma',
  personaTag: 'Trendbevisste',
  sprite: '/assets/raw/customers/fashion/selma.png',
  description: 'En kunde som vil ha en genser, men er alltid usikker på egen størrelse og redd for å velge feil.',
  hiddenNeed: 'Vil ha hjelp til å finne riktig størrelse og passform — uten å bli gjettet på eller kommentert på kroppen. Prøving føles tryggest.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei! Jeg har lyst på en genser, men jeg er alltid så usikker på hvilken størrelse jeg skal ta.',
      note: 'Førsteinntrykk — gjør det trygt, ikke ubehagelig.',
      choices: [
        { id: 'inn_a', text: 'Det hjelper jeg deg gjerne med — vi finner størrelsen sammen, og du kan prøve så mye du vil.', quality: 'good',
          feedback: 'Trygt og imøtekommende. Du gjør størrelsesvalget til et samarbeid i stedet for en test hun kan «bestå» eller «stryke» på.' },
        { id: 'inn_b', text: 'Du er vel en medium, vil jeg tro?', quality: 'warn',
          feedback: 'Å gjette størrelse høyt kan treffe skjevt og oppleves ubehagelig — selv når du mener det hjelpsomt.' },
        { id: 'inn_c', text: 'Med den byggen der er du nok en large.', quality: 'bad',
          feedback: 'En kommentar om kroppen hennes, ikke plagget. Det er sårende og helt unødvendig.' },
      ],
    },
    {
      id: 'passform',
      customerLine: 'Jeg vet ikke helt … noen gensere føles så trange, andre altfor store.',
      note: 'Snevre inn på PASSFORM, ikke på antatt størrelse.',
      choices: [
        { id: 'pa_a', text: 'Vil du ha den tettsittende, eller mer avslappet og oversized? Det styrer hvilken størrelse vi starter med.', quality: 'good',
          feedback: 'Du gjør usikkerheten om til et konkret valg hun kan svare på — passform først, størrelse følger.' },
        { id: 'pa_b', text: 'De fleste tar bare sin vanlige størrelse, det ordner seg.', quality: 'warn',
          feedback: 'Lite hjelpsomt — hun sa jo nettopp at «vanlig størrelse» varierer for henne.' },
        { id: 'pa_c', text: 'Bare ta medium, det passer jo alle sånn cirka.', quality: 'bad',
          feedback: '«Passer alle» stemmer sjelden, og du overser ønsket hennes om riktig passform helt.' },
      ],
    },
    {
      id: 'prov',
      customerLine: 'Avslappet, tror jeg. Men jeg tør nesten ikke velge feil …',
      note: 'KJERNE: la plagget bevise seg i prøverommet framfor at du garanterer noe.',
      choices: [
        { id: 'pr_a', text: 'Da tar jeg med to størrelser til prøverommet, så kjenner du selv hva som sitter best — helt uforpliktende.', quality: 'good',
          feedback: 'Perfekt: prøving fjerner gjettingen og gir henne kontroll. Ingen kan føle seg presset til feil størrelse.' },
        { id: 'pr_b', text: 'Den ser passe ut på deg, tror jeg den holder.', quality: 'warn',
          feedback: 'Du gjetter igjen i stedet for å la henne prøve. Hun sitter fortsatt usikker.' },
        { id: 'pr_c', text: 'Bare kjøp den, du kan jo bytte hvis den ikke passer.', quality: 'bad',
          feedback: 'Du skyver risikoen over på henne. Et enkelt prøverom-tilbud hadde løst det med en gang.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: OVERDEL_TAGS,
      customerLine: 'Ok, det tør jeg. Hvilken vil du anbefale at jeg prøver?',
      note: 'Anbefal en overdel fra sortimentet å prøve.',
    },
    {
      id: 'avslutt',
      customerLine: 'Den sitter jo kjempefint! Så deilig å slippe å gjette.',
      note: 'En kunde du gjorde trygg på størrelse, kommer tilbake nettopp derfor.',
      choices: [
        { id: 'av_a', text: 'Så bra den satt! Nå vet du passformen din her — velkommen tilbake.', quality: 'good',
          feedback: 'Varm avslutning som gir henne trygghet til neste kjøp også.' },
        { id: 'av_b', text: 'Bra. Værsågod.', quality: 'warn',
          feedback: 'Grei, men litt flat etter en fin prøve-runde.' },
        { id: 'av_c', text: '(bretter sammen og rekker fram posen)', quality: 'bad',
          feedback: 'Kald avslutning som ikke bygger videre på tryggheten du nettopp ga henne.' },
      ],
    },
  ],
}

// ─── «Gavebyttet» ────────────────────────────────────────────────────────────
// KJERNE: et plagg fått i gave med feil størrelse byttes på KULANSE — ingen
// mangel, ingen lovpålagt rett, men byttekvittering gjør det smidig og god
// service løser det uansett. Skille plikt (ingen) fra service (bytte).
export const GAVEBYTTET: SalesScenario = {
  id: 'gavebyttet',
  customerName: 'Kristoffer',
  personaTag: 'Familieorienterte',
  sprite: '/assets/raw/customers/fashion/kristoffer.png',
  description: 'En kunde som fikk et plagg i gave, men det er feil størrelse. Vil bytte det til noe som passer.',
  hiddenNeed: 'Vil bytte til riktig størrelse uten stress. Trenger å møtes med kulanse — et gavebytte er service, ikke en lovpålagt rett, men god butikk løser det greit.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei, jeg fikk denne i gave, men den er dessverre feil størrelse. Kan jeg bytte den?',
      note: 'Førsteinntrykk — møt ønsket positivt før du sjekker detaljene.',
      choices: [
        { id: 'inn_a', text: 'Så klart vi prøver å finne en løsning — har du byttekvittering, går det helt smertefritt.', quality: 'good',
          feedback: 'Imøtekommende OG konkret. Du signaliserer ja til hjelp og forklarer hva som gjør byttet enkelt.' },
        { id: 'inn_b', text: 'Kvittering?', quality: 'warn',
          feedback: 'Ettordssvar på et hyggelig spørsmål. Litt kjølig start på noe som burde være enkelt.' },
        { id: 'inn_c', text: 'Uten kvittering blir det nei, det.', quality: 'bad',
          feedback: 'Du stenger døra før du har hørt hele saken — dårlig service på en enkel byttesituasjon.' },
      ],
    },
    {
      id: 'kulanse',
      customerLine: 'Jeg har en byttelapp som lå i posen, ja. Men er dette noe jeg har KRAV på?',
      note: 'KJERNE: skille mellom hva dere MÅ og hva dere gjør som service.',
      choices: [
        { id: 'ku_a', text: 'Et bytte fordi størrelsen er feil er ikke noe du har lovkrav på — men det gjør vi gjerne, og med byttelappen er det helt kurant.', quality: 'good',
          feedback: 'Ærlig og profesjonelt: ingen mangel gir ingen lovpålagt bytterett, men kulanse + byttekvittering gjør det enkelt. Du kan forskjellen på plikt og service.' },
        { id: 'ku_b', text: 'Ja, du har full bytterett på alt, alltid.', quality: 'warn',
          feedback: 'Ikke helt riktig — det finnes ingen generell lovpålagt bytterett i butikk. Det dere tilbyr er kulanse, og det er greit å si som det er.' },
        { id: 'ku_c', text: 'Egentlig ikke, så du er heldig som får lov.', quality: 'bad',
          feedback: 'Å gjøre kunden «heldig som får lov» er nedlatende. Kulanse skal gis med et smil, ikke som en tjeneste han skylder deg for.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: PLAGG_TAGS,
      customerLine: 'Så fint. Da vil jeg gjerne bytte til noe som faktisk passer — hva foreslår du?',
      note: 'Anbefal en erstatning i riktig størrelse fra sortimentet.',
    },
    {
      id: 'avslutt',
      customerLine: 'Perfekt, denne passer mye bedre. Takk for hjelpen!',
      note: 'Et smidig gavebytte gir ofte en helt ny kunde på kjøpet.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — så fint at giveren traff med tanken, om ikke størrelsen! Velkommen tilbake.', quality: 'good',
          feedback: 'Varmt og lunt. Du gjorde et bytte til en god opplevelse — og giveren slipper å vite noe.' },
        { id: 'av_b', text: 'Greit, værsågod.', quality: 'warn',
          feedback: 'Grei, men litt flat etter et bytte som gikk fint.' },
        { id: 'av_c', text: '(legger det gamle plagget til side uten et ord)', quality: 'bad',
          feedback: 'Kald avslutning som gjør at han husker byttet som tungt, selv om det egentlig gikk greit.' },
      ],
    },
  ],
}

// ─── «Sesongsalget» ──────────────────────────────────────────────────────────
// KJERNE: ærlighet om prispolitikk/sesong. Ikke lyv om at noe «aldri» settes ned,
// ikke skrem med falsk knapphet — legg fram avveiningen ærlig (sikre plagget nå
// vs. sjanse på salg der størrelsen kan være utsolgt). Kobler til svinnRegel
// 'sesong/kolleksjon'.
export const SESONGSALGET: SalesScenario = {
  id: 'sesongsalget',
  customerName: 'Ada',
  personaTag: 'Prisbevisste',
  sprite: '/assets/raw/customers/fashion/ada.png',
  description: 'En kunde som liker en jakke, men lurer på om hun bør vente på sesongsalget for å få den billigere.',
  hiddenNeed: 'Vil ha et ærlig svar om prisutviklingen, ikke et salgstriks. Trenger å forstå avveiningen: sikre plagget nå, eller sjanse på salg med risiko for at størrelsen er borte.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Jeg liker denne jakka … men blir den ikke billigere på sesongsalget snart? Da kan jeg jo bare vente.',
      note: 'Et ærlig spørsmål om pris. Fristelsen er å presse — motstå den.',
      choices: [
        { id: 'inn_a', text: 'Godt spørsmål — la meg svare deg ærlig, så kan du bestemme hva som lønner seg for deg.', quality: 'good',
          feedback: 'Du inviterer til en ærlig prat om pris i stedet for å presse et kjøp. Det bygger tillit uansett hva hun velger.' },
        { id: 'inn_b', text: 'Nei, den her blir aldri satt ned, så du bør kjøpe nå.', quality: 'warn',
          feedback: 'Et pressgrep som fort viser seg å ikke stemme. Hvis hun ser den på salg senere, mister du all troverdighet.' },
        { id: 'inn_c', text: 'Alle vil ha den, den er sikkert utsolgt i morgen!', quality: 'bad',
          feedback: 'Falsk knapphet. Slike salgstriks gjennomskues raskt og gir stedet et pushy rykte.' },
      ],
    },
    {
      id: 'politikk',
      customerLine: 'Ok, så … blir den billigere eller ikke?',
      note: 'KJERNE: legg fram avveiningen ærlig, med både fordel og risiko.',
      choices: [
        { id: 'po_a', text: 'Den KAN bli satt ned mot slutten av sesongen — men da er størrelsen din ofte utsolgt. Vil du sikre den nå, eller ta sjansen på salg?', quality: 'good',
          feedback: 'Ærlig og balansert: du forteller om både muligheten for lavere pris OG risikoen. Det er å behandle kunden som en voksen som kan velge selv.' },
        { id: 'po_b', text: 'Kanskje, kanskje ikke, det er vanskelig å si.', quality: 'warn',
          feedback: 'Litt for vagt — du sitter tross alt på kunnskapen om hvordan sesongen deres pleier å gå. Hun fortjener et reelt råd.' },
        { id: 'po_c', text: 'Vet ikke, jeg bare selger dem.', quality: 'bad',
          feedback: 'Avvisende og lite hjelpsomt. Du gir henne ingenting å ta en beslutning på.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: OVERDEL_TAGS,
      customerLine: 'Da vil jeg heller sikre meg noe nå. Hva vil du anbefale?',
      note: 'Anbefal et plagg fra sortimentet — hun velger å kjøpe nå, informert.',
    },
    {
      id: 'avslutt',
      customerLine: 'Takk for at du var ærlig — det gjorde det faktisk lettere å bestemme seg.',
      note: 'Ærlighet om pris gir en kunde som stoler på deg neste gang også.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — jeg vil heller at du er trygg på kjøpet enn at du angrer. Velkommen tilbake!', quality: 'good',
          feedback: 'Varm avslutning som forsterker tilliten. En ærlig selger huskes lenger enn en billig pris.' },
        { id: 'av_b', text: 'Fint. Ha det.', quality: 'warn',
          feedback: 'Grei, men litt flat etter en samtale der ærligheten din var poenget.' },
        { id: 'av_c', text: '(slår inn beløpet uten å si mer)', quality: 'bad',
          feedback: 'Kald avslutning som ikke bygger på tilliten du nettopp etablerte.' },
      ],
    },
  ],
}

// ─── «Plaggreklamasjonen» ────────────────────────────────────────────────────
// KJERNE (forbrukervern, enkel — INGEN eskalering): en søm/glidelås som ryker
// raskt er en MANGEL (produksjonsfeil), ikke normal slitasje — kunden har
// reklamasjonsrett. Skille mangel fra slitasje. RYKTE er metrikken.
export const PLAGGREKLAMASJONEN: SalesScenario = {
  id: 'plaggreklamasjonen',
  customerName: 'Vetle',
  personaTag: 'Kvalitetsbevisste',
  sprite: '/assets/raw/customers/fashion/vetle.png',
  outcomeKind: 'service',
  description: 'En kunde hvis genser fikk hull i sømmen etter bare et par ukers bruk. Han er skuffet, men rolig — vil bare ha en rettferdig løsning.',
  hiddenNeed: 'Vil at en tydelig produksjonsfeil skal anerkjennes som en mangel, ikke avvises som slitasje. Trenger reklamasjonsretten sin respektert, uten mas.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei. Denne genseren kjøpte jeg her for to uker siden, og nå har sømmen ryknet opp i siden. Det er vel ikke sånn det skal være?',
      note: 'Han er skuffet, men saklig. Møt ham like saklig.',
      choices: [
        { id: 'inn_a', text: 'Så kjedelig — det skal absolutt ikke skje etter to uker. La meg se på den, så finner vi ut av det.', quality: 'good',
          feedback: 'Rolig og løsningsorientert. Du anerkjenner problemet og undersøker før du konkluderer.' },
        { id: 'inn_b', text: 'Har du vasket den på riktig program, da?', quality: 'warn',
          feedback: 'Du antyder at det er hans feil før du har sett på plagget. Det virker avvisende.' },
        { id: 'inn_c', text: 'Klær slites jo, det er ikke noe vi kan noe for.', quality: 'bad',
          feedback: 'Du avviser saken på autopilot. En søm som ryker etter to uker er ikke normal slitasje.' },
      ],
    },
    {
      id: 'vurder',
      customerLine: 'Jeg har brukt den helt vanlig og vasket etter vaskelappen. Sømmen bare gikk opp.',
      note: 'KJERNE: er dette en mangel eller slitasje?',
      choices: [
        { id: 'vu_a', text: 'En søm som ryker så raskt ved normal bruk er en produksjonsfeil — altså en mangel. Da har du full rett til å reklamere, det er helt kurant.', quality: 'good',
          feedback: 'Riktig: en feil som skyldes produksjonen (ikke bruken) er en mangel, og gir reklamasjonsrett etter forbrukerkjøpsloven. Trygt og korrekt.' },
        { id: 'vu_b', text: 'Hmm, jeg vet ikke helt om dette regnes som en reklamasjon …', quality: 'warn',
          feedback: 'Usikkerheten din svekker tilliten. En tydelig produksjonsfeil er nettopp det reklamasjonsretten dekker.' },
        { id: 'vu_c', text: 'Etter to ukers bruk regnes det nok som slitasje, dessverre.', quality: 'bad',
          feedback: 'Faktafeil. Normal slitasje tar måneder og år — en søm som ryker på to uker er en mangel, ikke slitasje.' },
      ],
    },
    {
      id: 'losning',
      customerLine: 'Så hva gjør vi med det, da?',
      note: 'Velg en konkret, ryddig løsning på mangelen.',
      choices: [
        { id: 'ls_a', text: 'Du får en ny genser i samme størrelse nå med en gang — beklager bryet.', quality: 'good',
          cost: 250,
          feedback: 'Ryddig omlevering på en reell mangel. Det koster litt her og da, men er både riktig og god service.' },
        { id: 'ls_b', text: 'Jeg kan gi deg 20 % avslag på en ny genser, da.', quality: 'warn',
          feedback: 'Ved en mangel har han krav på retting eller omlevering — ikke bare en liten rabatt på å kjøpe det samme på nytt.' },
        { id: 'ls_c', text: 'Du kan jo prøve å sy den igjen selv?', quality: 'bad',
          feedback: 'Du skyver ansvaret for en produksjonsfeil over på kunden. Det er verken riktig eller god service.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: '(fornøyd) Det var jo en helt grei løsning, faktisk.',
      note: 'En ryddig reklamasjon gjør ofte en skuffet kunde mer lojal enn før.',
      choices: [
        { id: 'av_a', text: 'Så bra — og takk for at du sa fra. Da vet vi det, og du vet at vi ordner opp. Velkommen tilbake!', quality: 'good',
          feedback: 'Varmt og profesjonelt. Du snudde en feil til et bevis på at butikken tar ansvar.' },
        { id: 'av_b', text: 'Greit. Ha en fin dag.', quality: 'warn',
          feedback: 'Korrekt, men litt flatt etter en sak du løste helt fint.' },
        { id: 'av_c', text: '(rekker fram den nye uten å si mer)', quality: 'bad',
          feedback: 'Kald avslutning som visker ut den gode håndteringen.' },
      ],
    },
  ],
}

// ─── «Stilrådet» ─────────────────────────────────────────────────────────────
// KJERNE: råd mot ANLEDNING og behov, ikke mot egen smak eller siste trend.
// Avdekk hva plagget skal brukes til, tenk HELHET (antrekk), og gjør et relevant
// kryssalg som fullfører looken.
export const STILRAADET: SalesScenario = {
  id: 'stilraadet',
  customerName: 'Ronja',
  personaTag: 'Trendbevisste',
  sprite: '/assets/raw/customers/fashion/ronja.png',
  description: 'En kunde som skal på jobbintervju og er usikker på hva hun bør ha på seg. Vil framstå ryddig og trygg.',
  hiddenNeed: 'Trenger råd tilpasset ANLEDNINGEN (et jobbintervju), ikke bare det trendy. Vil ha en helhet hun føler seg trygg i.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei … jeg skal på jobbintervju i morgen, og jeg aner ikke hva jeg skal ha på meg.',
      note: 'Førsteinntrykk — forstå anledningen før du foreslår noe.',
      choices: [
        { id: 'inn_a', text: 'Så spennende! Fortell litt — hva slags jobb er det, og hvor formelt er stedet?', quality: 'good',
          feedback: 'Du starter med anledningen. Et intervju i en bank krever noe annet enn et i en kafé — konteksten styrer rådet.' },
        { id: 'inn_b', text: 'Da tar vi det som er mest på trend akkurat nå.', quality: 'warn',
          feedback: 'Trend er ikke det samme som riktig for et intervju. Du hopper over hva hun faktisk trenger.' },
        { id: 'inn_c', text: 'Bare ta på deg noe du synes er kult, det går sikkert fint.', quality: 'bad',
          feedback: 'Uforpliktende og lite hjelpsomt til en som er nervøs og ba om konkret hjelp.' },
      ],
    },
    {
      id: 'anledning',
      customerLine: 'Det er på et litt seriøst kontor. Jeg vil se ryddig ut, men ikke stiv.',
      note: 'Bruk anledningen til å styre mot noe passe pent, ikke ekstremt.',
      choices: [
        { id: 'an_a', text: 'Da satser vi på noe rent og pent som sitter godt — ryddig, men fortsatt deg. La oss bygge et antrekk.', quality: 'good',
          feedback: 'Du oversetter «ryddig, men ikke stiv» til et konkret uttrykk og tenker helhet. Akkurat det hun ba om.' },
        { id: 'an_b', text: 'Bare ta en pen skjorte, så er du good.', quality: 'warn',
          feedback: 'Et enkelt plagg er en start, men du tenker ikke helhet — antrekket er mer enn ett plagg.' },
        { id: 'an_c', text: 'Kontor er kjedelig, du burde skille deg ut med noe tøft.', quality: 'bad',
          feedback: 'Du overstyrer behovet hennes (trygg og ryddig) med din egen smak. Feil råd for anledningen.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: OVERDEL_TAGS,
      customerLine: 'Ja, hjelp meg gjerne å bygge et antrekk. Hva starter vi med?',
      note: 'Anbefal et passende plagg til intervjuet fra sortimentet.',
    },
    {
      id: 'helhet',
      customerLine: 'Fin! Trenger jeg noe mer for at det skal se komplett ut?',
      note: 'Et relevant kryssalg fullfører looken — men det skal kle anledningen.',
      choices: [
        { id: 'he_a', text: 'En pen bukse til, så er antrekket helt komplett og gjennomtenkt.', quality: 'good',
          sell: { needTags: BUKSE_TAGS, addon: true },
          feedback: 'Et kryssalg som faktisk fullfører helheten hun ba om. Relevant mersalg som hjelper, ikke bare øker summen.' },
        { id: 'he_b', text: 'Nei, det holder med den ene.', quality: 'warn',
          feedback: 'Hun spurte selv om helheten — et passende tillegg hadde løftet antrekket og salget.' },
        { id: 'he_c', text: 'Ta en caps til, det er kult.', quality: 'bad',
          feedback: 'En caps passer dårlig til et seriøst intervju. Kryssalget må kle anledningen, ikke bryte med den.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Tusen takk — nå føler jeg meg faktisk klar for i morgen!',
      note: 'En kunde du ga trygghet før noe viktig, glemmer deg ikke.',
      choices: [
        { id: 'av_a', text: 'Så bra! Lykke til på intervjuet — du kommer til å gjøre det kjempefint. Kom og fortell hvordan det gikk!', quality: 'good',
          feedback: 'Varm, personlig avslutning som knytter plagget til øyeblikket. Sterkt sisteinntrykk.' },
        { id: 'av_b', text: 'Lykke til. Værsågod.', quality: 'warn',
          feedback: 'Grei, men en sjanse til å gjøre avslutningen like varm som rådet glapp.' },
        { id: 'av_c', text: '(pakker det ned og ser mot neste kunde)', quality: 'bad',
          feedback: 'Kald avslutning rett etter at du hjalp henne med noe viktig — synd å miste det på tampen.' },
      ],
    },
  ],
}

// ─── «Budsjettkunden» ────────────────────────────────────────────────────────
// KJERNE: respekter et satt budsjett — finn best mulig verdi INNENFOR rammen,
// vær ærlig, og IKKE oppsell over grensa. Å hjelpe noen finne mest for pengene
// bygger mer lojalitet enn å presse dem over budsjettet.
export const BUDSJETTKUNDEN: SalesScenario = {
  id: 'budsjettkunden',
  customerName: 'Sander',
  personaTag: 'Prisbevisste',
  sprite: '/assets/raw/customers/fashion/sander.png',
  description: 'En kunde med en klar, stram ramme: 500 kroner, ikke mer. Vil ha hjelp til å finne noe fint innenfor det.',
  hiddenNeed: 'Vil bli respektert for budsjettet sitt og hjulpet til best mulig verdi innenfor det — ikke presset oppover eller møtt med nedlatenhet.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei! Jeg har 500 kroner å bruke, ikke en krone mer. Kan du hjelpe meg finne noe fint innafor det?',
      note: 'Et tydelig budsjett er en gave — det gjør jobben din enklere, ikke vanskeligere.',
      choices: [
        { id: 'inn_a', text: 'Absolutt — 500 er en helt fin ramme å jobbe med. La meg vise deg det som gir mest for pengene.', quality: 'good',
          feedback: 'Du tar budsjettet på alvor og gjør det til utgangspunktet. Kunden slapper av og stoler på deg.' },
        { id: 'inn_b', text: 'Vel, det meste kult her koster jo litt mer enn det …', quality: 'warn',
          feedback: 'Du antyder at rammen hans er for lav før du har prøvd å hjelpe. Det er både unødvendig og litt nedlatende.' },
        { id: 'inn_c', text: '500? Da har du ikke akkurat mye å velge mellom her.', quality: 'bad',
          feedback: 'Du avviser budsjettet hans direkte. Nå føler han seg både flau og lite velkommen.' },
      ],
    },
    {
      id: 'verdi',
      customerLine: 'Jeg vil helst ha noe jeg får brukt mye, ikke bare noe billig for å ha noe.',
      note: 'KJERNE: hjelp ham finne VERDI innenfor rammen, ikke bare noe under prisgrensa.',
      choices: [
        { id: 've_a', text: 'Klokt tenkt. Da ser vi etter noe holdbart og allsidig innafor 500 — kvalitet per krone, ikke bare lav pris.', quality: 'good',
          feedback: 'Du løfter samtalen fra «billig» til «verdi». Det hjelper ham å bruke pengene sine godt — akkurat det han ba om.' },
        { id: 've_b', text: 'Da tar vi bare det billigste vi har, så er du trygt innafor.', quality: 'warn',
          feedback: 'Billigst er ikke det samme som best verdi. Han sa jo nettopp at han vil ha noe han får brukt mye.' },
        { id: 've_c', text: 'For litt mer kunne du fått noe MYE bedre, altså.', quality: 'bad',
          feedback: 'Du presser mot budsjettgrensa han var helt tydelig på. Det er å ikke lytte.' },
      ],
    },
    {
      id: 'anbefal',
      kind: 'recommend',
      recommendNeed: ACCESSOAR_TAGS,
      customerLine: 'Det høres bra ut. Hva vil du anbefale innafor 500?',
      note: 'Anbefal noe med god verdi innenfor budsjettet fra sortimentet.',
    },
    {
      id: 'avslutt',
      customerLine: 'Perfekt, og fortsatt innafor! Takk for at du ikke prøvde å presse meg oppover.',
      note: 'En kunde du respekterte budsjettet til, kommer tilbake nettopp derfor.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — det viktigste er at du er fornøyd med det du gikk for. Velkommen tilbake!', quality: 'good',
          feedback: 'Varm avslutning som bekrefter at du sto på hans side. Respekt for budsjett bygger ekte lojalitet.' },
        { id: 'av_b', text: 'Fint. Ha det.', quality: 'warn',
          feedback: 'Grei, men litt flat etter et kjøp der du gjorde alt riktig.' },
        { id: 'av_c', text: 'Du kunne fått mer for litt mer, men greit.', quality: 'bad',
          feedback: 'En siste stikk mot budsjettet hans akkurat idet han var fornøyd. Det ødelegger et ellers godt salg.' },
      ],
    },
  ],
}

export const FASHION_SCENARIOS: SalesScenario[] = [
  STORRELSESRAADET, GAVEBYTTET, SESONGSALGET, PLAGGREKLAMASJONEN, STILRAADET, BUDSJETTKUNDEN,
]

/** BRANSJE 2 (KLESBUTIKK) — egne scenario-id-er, IKKE del av kafeens SCENARIOS/
 *  CAFE_SCENARIO_IDS. Aktiveres ikke i dag (KLESBUTIKK er ikke registrert i
 *  INDUSTRY_DEFINITIONS) — de skal bare finnes og typesjekke, klare til en
 *  fremtidig bransje-2-aktivering. Samme mønster som CAFE_SCENARIO_IDS. */
export const FASHION_SCENARIO_IDS: string[] = FASHION_SCENARIOS.map(s => s.id)

export const CAFE_SCENARIO_IDS: string[] = SCENARIOS.map(s => s.id)

/** Alle scenarier på tvers av bransjer — for oppslag (getScenario). SCENARIOS
 *  (kafé) holdes UENDRET, så eksisterende motorbruk (dev-pool, randomScenario,
 *  scenariosForMix-fallbacks) er upåvirket; fashion legges kun til i oppslaget. */
const ALLE_SCENARIER: SalesScenario[] = [...SCENARIOS, ...FASHION_SCENARIOS]

export function getScenario(id: string): SalesScenario | undefined {
  return ALLE_SCENARIER.find(s => s.id === id)
}

/** Velg et tilfeldig scenario fra en gitt pool (default: hele SCENARIOS).
 *  Math.random ligger i denne rene modulen (ikke i React-render), så
 *  kallstedet (useState-initialisering i InteriorView) forblir lint-rent. */
export function randomScenario(pool: SalesScenario[] = SCENARIOS): SalesScenario {
  return pool[Math.floor(Math.random() * pool.length)]!
}

/** BRANSJE-DEFINISJON — slår opp en bransjes scenariePool (liste med id-er,
 *  f.eks. CAFE_SCENARIO_IDS) til faktiske SalesScenario-objekter. Ukjente
 *  id-er (skrivefeil e.l.) filtreres bort i stedet for å krasje. */
export function scenariosForIndustry(scenarioIds: string[]): SalesScenario[] {
  const found = scenarioIds.map(getScenario).filter((s): s is SalesScenario => !!s)
  return found.length > 0 ? found : SCENARIOS
}

/** DAGSSYKLUS (DEL 1/2) — filtrer en bransjes scenario-pool etter
 *  DAY_CONFIG.scenarioMix. 'alle' er reservert for FREMTIDIGE scenariotyper
 *  utover salg/service — i dag identisk med 'salgOgService' siden bare de to
 *  outcomeKind-verdiene finnes ennå. `pool` er allerede bransje-filtrert av
 *  kalleren (scenariosForIndustry) — denne funksjonen filtrerer KUN på
 *  utfallstype, ikke på bransje. Tom pool (umulig i dag, men defensivt)
 *  faller tilbake til hele SCENARIOS så InteriorView aldri står uten noen å
 *  spawne. */
export function scenariosForMix(pool: SalesScenario[], mix: ScenarioMix): SalesScenario[] {
  const filtered = mix === 'kunSalg'
    ? pool.filter(s => (s.outcomeKind ?? 'sale') === 'sale')
    : pool
  return filtered.length > 0 ? filtered : SCENARIOS
}
