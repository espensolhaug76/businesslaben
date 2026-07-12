// ─── TEMA 1: BEREDSKAP OG RISIKO — tunbart innhold ───────────────────────────
// Alt gates på useErTemaAktivt('beredskap'); nivå via useTemaNivaa('beredskap').
// Prinsipp: refleksjon, ALDRI fasit. Ingen poeng for «riktig» — konsekvens og
// spørsmål er belønningen. All tekst her er tunbar.

export type Sannsynlighet = 'lav' | 'middels' | 'høy'
export type Konsekvens = 'lav' | 'middels' | 'høy'

/** Én rad i risikoskjemaet (DEL 1b). */
export interface RisikoRad {
  id: string
  fare: string
  sannsynlighet: Sannsynlighet
  konsekvens: Konsekvens
  tiltak: string
  /** VG2: rad lagt til av eleven selv (kan slettes). */
  egen?: boolean
}

export const NIVAA_VALG: { verdi: Sannsynlighet; label: string }[] = [
  { verdi: 'lav', label: 'Lav' },
  { verdi: 'middels', label: 'Middels' },
  { verdi: 'høy', label: 'Høy' },
]

// ── DEL 1a — BEREDSKAPSPLAN (enkel, ferdig plan for butikken) ─────────────────
export interface BeredskapsplanSeksjon {
  id: string
  ikon: string
  tittel: string
  punkter: string[]
}

export const BEREDSKAPSPLAN: BeredskapsplanSeksjon[] = [
  {
    id: 'brann', ikon: '🔥', tittel: 'Brann',
    punkter: [
      'Varsle: rop «brann» høyt og trykk på brannalarmen.',
      'Evakuer kunder og ansatte ut nærmeste trygge utgang.',
      'Møteplass utenfor: fortauet foran butikken — tell opp at alle er ute.',
      'Slukk KUN hvis det er trygt (liten brann, fri fluktvei bak deg). Ring 110.',
    ],
  },
  {
    id: 'ulykke', ikon: '🚑', tittel: 'Ulykke / skade',
    punkter: [
      'Sikre stedet så ingen flere blir skadet.',
      'Gi førstehjelp så langt du kan, og ring 113 ved alvorlig skade.',
      'Bli hos den skadde til hjelp kommer.',
      'Skriv ned hva som skjedde (avviksmelding) etterpå.',
    ],
  },
  {
    id: 'trussel', ikon: '⚠️', tittel: 'Trussel / ran',
    punkter: [
      'Din og andres sikkerhet FØRST — ikke gjør motstand.',
      'Gjør som ranerne sier; merk deg kjennetegn (klær, høyde, stemme).',
      'Utløs stille alarm hvis butikken har det.',
      'Ring 112 så snart det er trygt, og skjerm åstedet.',
    ],
  },
]

/** VG2-tillegg til beredskapsplan-seksjonen: to refleksjonsfelt (fritekst). */
export const PLAN_REFLEKSJON_VG2: { felt: 'storsteRisiko' | 'leggeTil'; sporsmal: string }[] = [
  { felt: 'storsteRisiko', sporsmal: 'Hva er den største risikoen i DIN butikk?' },
  { felt: 'leggeTil', sporsmal: 'Hva ville du lagt til i planen?' },
]

// ── DEL 1b — RISIKOSKJEMA (4 faste startrader) ───────────────────────────────
export const RISIKO_RADER_DEFAULT: RisikoRad[] = [
  { id: 'brann', fare: 'Brann', sannsynlighet: 'lav', konsekvens: 'høy', tiltak: '' },
  { id: 'fall', fare: 'Fall / skade', sannsynlighet: 'middels', konsekvens: 'middels', tiltak: '' },
  { id: 'svinn', fare: 'Svinn / tyveri', sannsynlighet: 'middels', konsekvens: 'lav', tiltak: '' },
  { id: 'strom', fare: 'Strømbrudd', sannsynlighet: 'lav', konsekvens: 'middels', tiltak: '' },
]

// ── DEL 3 — BRANNALARM-HENDELSE ──────────────────────────────────────────────
export type BrannalarmKvalitet = 'good' | 'warn' | 'bad'

export interface BrannalarmValg {
  id: string
  tekst: string
  kvalitet: BrannalarmKvalitet
  reputationDelta: number
  moneyDelta: number
  /** Utfallstekst; {ekte} interpoleres til ekte-brann/falsk-alarm-varianten. */
  utfall: string
}

export const BRANNALARM = {
  type: 'beredskap' as const,
  tittel: '🔥 Brannalarmen går!',
  intro: 'Brannalarmen uler gjennom butikken. Kundene ser seg forvirret rundt. Du har sekunder på å bestemme deg — heldigvis kjenner du beredskapsplanen.',
  valg: [
    {
      id: 'plan', tekst: '📋 Følg planen: evakuer kundene til møteplassen og varsle', kvalitet: 'good',
      reputationDelta: 3, moneyDelta: -300,
      utfall: 'Du evakuerer rolig og bestemt til møteplassen og varsler. {ekte} Kundene følte seg trygge og ivaretatt — akkurat slik planen sier. Dagen tok en kort pause, men tapet ble lite.',
    },
    {
      id: 'selg', tekst: '💰 Fortsett å selge — «det er sikkert falsk alarm»', kvalitet: 'bad',
      reputationDelta: -8, moneyDelta: 0,
      utfall: 'Du lar kundene stå igjen mens alarmen uler. {ekte} Folk ble utrygge, og noen klaget høylytt. Å gamble med sikkerheten er nettopp grunnen til at planen finnes.',
    },
    {
      id: 'slukk', tekst: '🧯 Grip slukkeapparatet uansett', kvalitet: 'warn',
      reputationDelta: 0, moneyDelta: -150,
      utfall: 'Du løper etter slukkeapparatet. {ekte} Husk planen: slukk KUN hvis det er trygt og du har fri fluktvei — ellers er det å evakuere og varsle viktigere enn å slukke selv.',
    },
  ] as BrannalarmValg[],
  ekteBrann: 'Det viste seg å være en overopphetet kaffemaskin — raskt under kontroll.',
  falskAlarm: 'Det var falsk alarm denne gangen.',
  /** VG2: brannøvelse-evaluering etter håndtert alarm (dekker brannøvelse-målet). */
  evalSporsmal: [
    'Hva fungerte godt i måten du håndterte alarmen på?',
    'Hva ville du gjort annerledes neste gang?',
  ],
}

export function brannalarmValg(id: string): BrannalarmValg | undefined {
  return BRANNALARM.valg.find(v => v.id === id)
}

// ── DEL 5 — HUB-KOBLING (📚 Lær mer) ─────────────────────────────────────────
// Læringshub-modulene temaet peker på, per nivå. Rutene finnes i App.tsx.
export const HUB_LENKER: Record<'vg1' | 'vg2', { rute: string; navn: string }[]> = {
  vg1: [
    { rute: '/learning/forretningsdrift/contingency', navn: 'Beredskap (Contingency)' },
    { rute: '/learning/forretningsdrift/risikovurdering', navn: 'Risikovurdering' },
  ],
  vg2: [
    { rute: '/learning/vg2/hms/beredskap', navn: 'Beredskap' },
    { rute: '/learning/vg2/hms/brannvern', navn: 'Brannvern' },
    { rute: '/learning/vg2/hms/risikoanalyse', navn: 'Risikoanalyse' },
  ],
}
