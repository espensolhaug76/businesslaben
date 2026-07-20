// ─── KROK 2 — STAMKUNDER: gjenkjenningsdialoger ──────────────────────────────
// Et LAG oppå de eksisterende salgsscenariene: når en kunde eleven kjenner
// kommer igjen, hilser hen med en referanse til forrige møtes tema. Selve
// scenariet (scenarios.ts) er UENDRET — hilsenen vises kun som en ekstra
// åpningslinje ved møtestart. 6 av de mest særpregede kafékundene. Varmt,
// naturlig bokmål — aldri kleint.
//
// Hilsen velges på kundens minne (state.stamkunder[scenarioId]): varm ved
// fornøyd historikk (stamkunde), kjøligere ved «misfornøyd sist». Nøytral/
// førstegangs → ingen hilsen (scenariet starter som før).

export interface StamkundeHilsen {
  scenarioId: string
  /** 2–3 varme varianter (refererer forrige møtes TEMA). */
  fornoyd: string[]
  /** 1 kjøligere variant ved misfornøyd historikk (service recovery-sjanse). */
  misfornoyd: string
}

export const STAMKUNDE_HILSEN: StamkundeHilsen[] = [
  {
    scenarioId: 'likeverd', // Live (svaksynt, m/førerhund)
    fornoyd: [
      'Hei igjen! Du tok deg virkelig tid til meg sist — det betyr mye.',
      'Godt å høre stemmen din igjen. Sist fant vi en god løsning sammen.',
      'Hei! Førerhunden min kjenner seg nesten hjemme her nå.',
    ],
    misfornoyd: 'Hei … sist ble jeg litt overkjørt. Håper det går roligere i dag.',
  },
  {
    scenarioId: 'den-usikre', // Maren
    fornoyd: [
      'Hei igjen! Du hjalp meg å velge sist — det ble kjempebra.',
      'Å, det er deg! Sist var jeg så usikker, men du gjorde det lett.',
    ],
    misfornoyd: 'Hei … jeg er litt usikker igjen. Håper det går bedre denne gangen.',
  },
  {
    scenarioId: 'prutekunden', // Roger
    fornoyd: [
      'Hei igjen! Vi ble jo enige om en grei pris sist — klar for runde to?',
      'Der er du! Sist fikk vi til en real handel, du og jeg.',
    ],
    misfornoyd: 'Hm. Sist ble jeg ikke helt fornøyd med prisen. Vi får se i dag.',
  },
  {
    scenarioId: 'reklamasjonen', // Tom
    fornoyd: [
      'Hei! Du ordnet så fint opp i saken min sist — takk igjen.',
      'Godt å se deg. Sist løste du problemet kjapt og greit.',
    ],
    misfornoyd: 'Hei. Sist gikk det litt trått med klagen min …',
  },
  {
    scenarioId: 'allergikeren', // Sunniva
    fornoyd: [
      'Hei igjen! Du fant jo den glutenfrie til meg sist — reddet dagen.',
      'Å, det er deg! Sist tok du allergien min på alvor. Takk for det.',
    ],
    misfornoyd: 'Hei … jeg håper dere har tenkt på allergien min denne gangen.',
  },
  {
    scenarioId: 'storbestillingen', // Fredrik
    fornoyd: [
      'Hei igjen! Sist storbestilling gikk på skinner — jeg har en ny til deg.',
      'Der er du! Kontoret snakker fortsatt om leveringen din sist.',
    ],
    misfornoyd: 'Hei. Sist klaffet ikke storbestillingen helt. Håper på bedre flyt i dag.',
  },
]

const HILSEN_BY_ID: Record<string, StamkundeHilsen> = Object.fromEntries(STAMKUNDE_HILSEN.map(h => [h.scenarioId, h]))

/** Kundens minne (fra state.stamkunder[scenarioId]) — kun feltene hilsenen bruker. */
export interface StamkundeMinne {
  antallMoter: number
  sisteUtfall: 'fornoyd' | 'noytral' | 'misfornoyd'
  erStamkunde: boolean
}

/** Åpningshilsen ved møtestart, eller null (ukjent kunde / nøytral historikk →
 *  scenariet starter som før). `seed` gir deterministisk variant. */
export function stamkundeHilsen(scenarioId: string, minne: StamkundeMinne | undefined, seed: number): string | null {
  if (!minne || minne.antallMoter < 1) return null
  const h = HILSEN_BY_ID[scenarioId]
  if (!h) return null
  if (minne.sisteUtfall === 'misfornoyd') return h.misfornoyd
  if (minne.erStamkunde) return h.fornoyd[(seed >>> 0) % h.fornoyd.length]!
  return null
}
