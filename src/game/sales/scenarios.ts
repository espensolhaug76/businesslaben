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

const DRIKKE_TAGS = ['juice', 'iste', 'smoothie', 'saft', 'mineralvann', 'kaffe', 'sjokolade']
const KAKE_BOLLE_TAGS = ['kake', 'bolle', 'muffin', 'skolebrod', 'kanelbolle', 'cake']

export const DEN_USIKRE: SalesScenario = {
  id: 'den-usikre',
  customerName: 'Maren',
  personaTag: 'Familieorienterte',
  sprite: '/assets/raw/customers/usikre.png',
  description: 'En kunde som skal kjøpe til et bursdagsselskap i morgen, men aner ikke hva hun vil ha. Trenger noen å tenke høyt sammen med.',
  hiddenNeed: 'Vil ha noen som stiller spørsmål og hjelper henne finne ut hva hun faktisk trenger — ikke bare kaste ut et tilfeldig forslag med en gang.',
  steps: [
    {
      id: 'inn',
      customerLine: 'Hei … jeg skal ha noe til et bursdagsselskap i morgen, men jeg aner faktisk ikke hva jeg burde velge.',
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
        // Nøytral formulering («ved siden av», ikke «til barna») + ærlig
        // feedback-flagg om drikkeutvalget (Salgsmotor-oppgaven, DEL 2):
        // dagens kafé-sortiment har typisk kaffe/te/smoothie — ikke
        // nødvendigvis det mest barnevennlige valget, og choice-teksten skal
        // ikke late som om ETHVERT treff i DRIKKE_TAGS automatisk passer et
        // barneselskap.
        { id: 'me_a', text: 'Kanskje noe å drikke ved siden av også?', quality: 'good',
          sell: { needTags: DRIKKE_TAGS, addon: true, qty: 8 },
          feedback: 'Naturlig og hjelpsomt mersalg — hun spurte selv. Til et barneselskap er juice/saft/brus ofte et bedre valg enn kaffe eller te; vurder om drikkeutvalget ditt faktisk passer denne kundegruppen.' },
        { id: 'me_b', text: 'Nei, det tror jeg går fint.', quality: 'warn',
          feedback: 'Helt grei, men du går glipp av en åpenbar og ønsket mersalgsmulighet siden hun faktisk spurte deg.' },
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

export const SCENARIOS: SalesScenario[] = [
  MORGENKUNDEN, REKLAMASJONEN, ALLERGIKEREN, PRUTEKUNDEN, DEN_USIKRE, STORBESTILLINGEN,
]

/** BRANSJE-DEFINISJON — id-ene kafeens IndustryDefinition.scenariePool peker
 *  til (industryDefinition.ts). Alle scenarier i SCENARIOS er kafé-scenarier
 *  i dag, så listen er foreløpig identisk med SCENARIOS sine id-er — men
 *  eksplisitt her (ikke utledet inline i industryDefinition.ts), så en
 *  fremtidig bransje 2 med EGNE scenarier ikke ved et uhell arver kafeens. */
export const CAFE_SCENARIO_IDS: string[] = SCENARIOS.map(s => s.id)

export function getScenario(id: string): SalesScenario | undefined {
  return SCENARIOS.find(s => s.id === id)
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
