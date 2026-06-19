// ─── SALGSSITUASJON-MOTOR — scenariodata ─────────────────────────────────────
//
// v1 starter med ÉN godkjent scenario: «Morgenkunden» for café-sortimentet
// (kaffe / bakevarer / m.m.). Anbefal-steget (kind:'recommend') leser elevens
// faktiske sortiment — se SalesScenarioOverlay. Flere scenarier legges til som
// nye elementer i SCENARIOS uten endringer ellers.

import type { SalesScenario } from './types'

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

export const SCENARIOS: SalesScenario[] = [MORGENKUNDEN, REKLAMASJONEN]

export function getScenario(id: string): SalesScenario | undefined {
  return SCENARIOS.find(s => s.id === id)
}

/** Velg et tilfeldig scenario fra poolen. Math.random ligger i denne rene
 *  modulen (ikke i React-render), så kallstedet (useState-initialisering i
 *  InteriorView) forblir lint-rent. */
export function randomScenario(): SalesScenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]!
}
