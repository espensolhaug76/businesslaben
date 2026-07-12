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

// ── DEL 3/5 — BRANNALARM som REKKEFØLGE-ØVELSE ───────────────────────────────
export type BrannalarmKvalitet = 'good' | 'bad'   // trygg evakuering vs kaos

export interface BrannalarmKort {
  id: string
  tekst: string
  /** Riktig plass (1–5) i planen. Distraktor hvis udefinert. */
  riktigPlass?: number
}

/** 7 handlingskort — 5 riktige (speiler beredskapsplanens brann-punkter) + 2
 *  distraktorer som frister, men er gale. Tunbare. Stokkes før visning. */
export const BRANNALARM_KORT: BrannalarmKort[] = [
  { id: 'varsle', tekst: '📣 Varsle: rop «brann» og trykk brannalarmen', riktigPlass: 1 },
  { id: 'evakuer', tekst: '🚶 Evakuer kunder og ansatte ut nærmeste utgang', riktigPlass: 2 },
  { id: 'moteplass', tekst: '📍 Møteplass på fortauet — tell opp at alle er ute', riktigPlass: 3 },
  { id: 'slukk', tekst: '🧯 Slukk KUN hvis det er trygt (fri fluktvei)', riktigPlass: 4 },
  { id: 'ring', tekst: '📞 Ring 110', riktigPlass: 5 },
  { id: 'kassa', tekst: '💰 Redd kassaoppgjøret først' },
  { id: 'story', tekst: '📱 Post en story om brannen' },
]

/** Riktig rekkefølge (kort-id 1..5). */
export const BRANNALARM_FASIT = ['varsle', 'evakuer', 'moteplass', 'slukk', 'ring']
/** Nedtelling i sekunder (tunbar). Går tiden ut løses øvelsen med det som ligger. */
export const BRANNALARM_SEKUNDER = 60

export const BRANNALARM = {
  type: 'beredskap' as const,
  tittel: '🔥 Brannalarmen går!',
  intro: 'Brannalarmen uler gjennom butikken. Legg de riktige handlingene inn i planen — i riktig rekkefølge. Du har dårlig tid!',
  ekteBrann: 'Det viste seg å være en overopphetet kaffemaskin — raskt under kontroll.',
  falskAlarm: 'Det var falsk alarm denne gangen.',
  utfallTrygg: 'Du handlet raskt og i riktig rekkefølge — varsling først, så evakuering og opptelling. {ekte} Alle kom trygt ut og tapet ble lite. Akkurat slik en øvelse skal sitte.',
  utfallKaos: 'Det ble kaos. {ekte} Feil prioritering under en alarm koster dyrt — folk må UT først, ting kan erstattes. Ryktet fikk en trøkk.',
  konsekvens: { good: { rep: 3, money: -300 }, bad: { rep: -8, money: -500 } } as Record<BrannalarmKvalitet, { rep: number; money: number }>,
  /** VG2: brannøvelse-evaluering etter håndtert alarm (dekker brannøvelse-målet). */
  evalSporsmal: [
    'Hva fungerte godt i måten du håndterte alarmen på?',
    'Hva ville du gjort annerledes neste gang?',
  ],
  // ── ØVELSESMODUS (DEL 4, fiksrunde 2) — samme øvelse, men uten konsekvens. ──
  utfallOvelseTrygg: 'Godt øvd! Du varslet først, så evakuering og opptelling — akkurat rekkefølgen som får folk trygt ut. Dette er en øvelse, så ingen penger eller rykte står på spill; men det er nettopp derfor vi øver til det sitter.',
  utfallOvelseKaos: 'I en øvelse gjør det ikke vondt å bomme — det er hele poenget med å øve. Men se på rekkefølgen: folk må UT først, ting kan erstattes. Kjør en ny øvelse til varsling og evakuering kommer før alt annet.',
}

/** Ett øvelsesmodus-forsøk (ikke skarp alarm) — historikk i state.beredskap.
 *  Ingen penge-/rykteeffekt; kun refleksjon og grønn/rød sammenligning etterpå. */
export interface BrannovelseForsok {
  rekkefolge: string[]
  kvalitet: BrannalarmKvalitet
  /** Spilltidspunkt (in-game) for forsøket. */
  dag: number
  maaned: number
  aar: number
}

export type BrannalarmVurdering = { kvalitet: BrannalarmKvalitet; distraktorBrukt: boolean; varslingForst: boolean }

/** Vurder elevens rekkefølge (5 kort-id-er) UTEN å avsløre fasit underveis:
 *  distraktor valgt ELLER varsling ikke først ⇒ kaos; ellers trygg. */
export function vurderBrannalarm(rekkefolge: string[]): BrannalarmVurdering {
  const distraktorBrukt = rekkefolge.some(id => id && !BRANNALARM_FASIT.includes(id))
  const varslingForst = rekkefolge[0] === 'varsle'
  const kvalitet: BrannalarmKvalitet = (distraktorBrukt || !varslingForst) ? 'bad' : 'good'
  return { kvalitet, distraktorBrukt, varslingForst }
}

export function brannalarmKort(id: string): BrannalarmKort | undefined {
  return BRANNALARM_KORT.find(k => k.id === id)
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
