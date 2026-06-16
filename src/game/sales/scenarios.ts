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

export const SCENARIOS: SalesScenario[] = [MORGENKUNDEN]

export function getScenario(id: string): SalesScenario | undefined {
  return SCENARIOS.find(s => s.id === id)
}
