// ─── KROK 2 (REDESIGN) — STAMKUNDER: personen som UTVIKLER seg ────────────────
// Prinsipp: salgsscenariet (scenarios.ts) er en ENGANGS pedagogisk situasjon —
// det spilles én gang og gjentas ALDRI. Stamkunden er PERSONEN, som kommer
// tilbake i egne, korte GJENKJENNINGSMØTER (møtetype 'stamkundemote') med tydelig
// UTVIKLING — aldri en reprise av scenariet.
//
// Tre utviklingstrinn per kunde (state.stamkunder[id].utviklingstrinn):
//   trinn 1 — gjenkjennelse: refererer forrige møtes TEMA, «du hjalp meg sist».
//   trinn 2 — personen har UTVIKLET seg: den usikre er tryggere, den travle tar
//             seg tid, prutekunden har sluttet å mase om pris.
//   trinn 3 — kunden ANBEFALER deg: tar med en venn/kollega → +1 ekstra kjøp.
// Negativ kurve (sisteUtfall === 'misfornoyd'): én kjøligere kortvariant, og
// vekt ned i kundemiksen (som før). Et GODT stamkundemøte løfter kurven igjen
// (service recovery: sisteUtfall → fornøyd, trinnet stiger).
//
// Replikkene er skrevet på personlighetene fra scenariodataene (scenarios.ts):
// varmt, naturlig bokmål — aldri kleint, aldri moraliserende.

export interface StamkundeUtvikling {
  scenarioId: string
  /** Trinn 1 — gjenkjennelse (2–4 replikker vist etter hverandre). */
  trinn1: string[]
  /** Trinn 2 — tydelig utvikling av personen. */
  trinn2: string[]
  /** Trinn 3 — kunden anbefaler deg / tar med venn eller kollega (+1 kjøp). */
  trinn3: string[]
  /** Kjøligere variant ved «misfornøyd sist» (service recovery-sjanse). */
  kjolig: string
}

export const STAMKUNDE_UTVIKLING: StamkundeUtvikling[] = [
  {
    scenarioId: 'likeverd', // Live (svaksynt, m/førerhund)
    trinn1: [
      'Hei igjen! Jeg kjente igjen stemmen din med en gang.',
      'Sist tok du deg tid til å lese opp hele menyen for meg — det glemmer jeg ikke.',
      'Kan jeg få det samme som sist? Jeg stoler på deg.',
    ],
    trinn2: [
      'Hei! Nå kjenner både jeg og førerhunden oss nesten hjemme her.',
      'Du gjorde det så trygt sist at jeg tør å bestille helt selv i dag.',
    ],
    trinn3: [
      'Hei! I dag har jeg med meg en venninne — jeg har skrytt sånn av stedet.',
      'Hun er også svaksynt, og jeg lovte henne at her blir man møtt som et helt menneske.',
      'Vi tar to av det vanlige, takk.',
    ],
    kjolig: 'Hei … sist følte jeg meg litt overkjørt. Jeg håper det går roligere i dag.',
  },
  {
    scenarioId: 'den-usikre', // Maren
    trinn1: [
      'Å, det er deg! Du hjalp meg å velge til barnebursdagen sist.',
      'Det ble en kjempesuksess — alle spurte hvor jeg hadde kjøpt det.',
      'Kan du hjelpe meg igjen i dag?',
    ],
    trinn2: [
      'Hei! I dag vet jeg faktisk hva jeg vil ha — tenk det.',
      'Du lærte meg å tenke gjennom hva jeg trenger før jeg spør. Så nyttig.',
    ],
    trinn3: [
      'Hei! Jeg har tatt med en venninne som også skal ha selskap.',
      'Jeg sa til henne at du er den beste til å hjelpe folk som er litt usikre.',
      'Vi tar to i dag.',
    ],
    kjolig: 'Hei … jeg ble litt usikker på om jeg valgte riktig sist. Vi får se i dag.',
  },
  {
    scenarioId: 'prutekunden', // Roger
    trinn1: [
      'Der er du! Vi fikk til en real handel sist, du og jeg.',
      'Du ga deg ikke på prisen — det respekterer jeg faktisk.',
      'Skal vi ta en runde til?',
    ],
    trinn2: [
      'Hei igjen. Jeg har sluttet å mase om prisene hos de andre, ser du.',
      'Kvalitet koster, det har jeg skjønt. Gi meg det vanlige.',
    ],
    trinn3: [
      'Hei! Jeg tok med en kollega — han trodde ikke på meg da jeg sa det er verdt pengene.',
      'Nå får han se selv. Vi tar to.',
    ],
    kjolig: 'Hm. Jeg synes prisen ble litt stiv sist. Vi får se om du kan overbevise meg i dag.',
  },
  {
    scenarioId: 'reklamasjonen', // Tom
    trinn1: [
      'Hei! Du ordnet så fint opp i kakesaken min sist.',
      'Du hørte på meg i stedet for å vise til regler — det betydde mye.',
      'Nå handler jeg gjerne her igjen.',
    ],
    trinn2: [
      'Hei igjen. Jeg anbefaler stedet til alle på jobben nå.',
      'En butikk som tar en klage på alvor, den blir man trofast mot.',
    ],
    trinn3: [
      'Hei! Jeg har med kona i dag — hun ville se stedet jeg skryter sånn av.',
      'Vi skal ha to, og denne gangen er alt som det skal, det vet jeg.',
    ],
    kjolig: 'Hei. Jeg satt igjen med en litt vond følelse etter klagen sist …',
  },
  {
    scenarioId: 'allergikeren', // Sunniva
    trinn1: [
      'Hei igjen! Du fant jo den glutenfrie til meg sist — reddet dagen.',
      'Og du var ærlig da du måtte sjekke innholdet. Det stoler jeg på.',
      'Har du noe trygt til meg i dag også?',
    ],
    trinn2: [
      'Hei! Nå vet jeg at jeg kan spørre deg om hva som helst i innholdet.',
      'Kjæresten min med nøtteallergi tør å bli med hit nå, takket være deg.',
    ],
    trinn3: [
      'Hei! I dag har jeg med kjæresten — han med nøtteallergien.',
      'Jeg lovte ham at her får man ærlige svar. Vi tar to trygge.',
    ],
    kjolig: 'Hei … jeg ble litt utrygg på om dere tok allergien min på alvor sist.',
  },
  {
    scenarioId: 'storbestillingen', // Fredrik
    trinn1: [
      'Hei igjen! Storbestillingen til møtet gikk på skinner sist.',
      'Du var ærlig om hva du faktisk kunne levere — det holdt hele veien.',
      'Jeg har en ny bestilling til deg.',
    ],
    trinn2: [
      'Hei! Kontoret bestiller fast herfra nå — du leverer alltid som avtalt.',
      'Ingen overraskelser, det er gull verdt for oss.',
    ],
    trinn3: [
      'Hei! Jeg tok med en kollega fra nabokontoret — de trenger også en fast leverandør.',
      'Jeg garanterte for deg. Vi legger inn to bestillinger i dag.',
    ],
    kjolig: 'Hei. Storbestillingen klaffet ikke helt sist — jeg håper på bedre flyt i dag.',
  },
]

const UTVIKLING_BY_ID: Record<string, StamkundeUtvikling> =
  Object.fromEntries(STAMKUNDE_UTVIKLING.map(u => [u.scenarioId, u]))

/** Kundens minne (fra state.stamkunder[scenarioId]). */
export interface StamkundeMinne {
  antallMoter: number
  sisteUtfall: 'fornoyd' | 'noytral' | 'misfornoyd'
  erStamkunde: boolean
  /** 0 = ikke returnerende ennå; 1/2/3 = utviklingstrinn (se toppen). */
  utviklingstrinn: number
}

export interface StamkundeMoteReplikker {
  trinn: 1 | 2 | 3
  /** Replikkene som spilles i gjenkjenningsmøtet (2–4 for varme, 1 for kjølig). */
  replikker: string[]
  /** Kjøligere variant (misfornøyd sist) — service recovery-sjanse. */
  erKjolig: boolean
  /** Trinn 3: kunden tar med venn/kollega → +1 ekstra kjøp i møtet. */
  venn: boolean
  /** Kort statuslabel («Ny stamkunde» / «Trygg stamkunde» / «Anbefaler deg»). */
  trinnLabel: string
}

const TRINN_LABEL: Record<1 | 2 | 3, string> = {
  1: 'Ny stamkunde',
  2: 'Trygg stamkunde',
  3: 'Anbefaler deg',
}

/** Gjenkjenningsmøtets replikker for kundens gjeldende trinn, eller null hvis
 *  kunden ikke er en kjent/returnerende kunde (aldri møtt, eller uten dialogdata). */
export function stamkundeMote(scenarioId: string, minne: StamkundeMinne | undefined): StamkundeMoteReplikker | null {
  if (!minne || minne.antallMoter < 1) return null
  const u = UTVIKLING_BY_ID[scenarioId]
  if (!u) return null
  if (minne.sisteUtfall === 'misfornoyd') {
    return { trinn: 1, replikker: [u.kjolig], erKjolig: true, venn: false, trinnLabel: 'Trenger en ny sjanse' }
  }
  const trinn = Math.min(3, Math.max(1, minne.utviklingstrinn)) as 1 | 2 | 3
  const replikker = trinn === 1 ? u.trinn1 : trinn === 2 ? u.trinn2 : u.trinn3
  return { trinn, replikker, erKjolig: false, venn: trinn === 3, trinnLabel: TRINN_LABEL[trinn] }
}

/** Er kunden en kjent, returnerende stamkunde (kan få et stamkundemøte)?
 *  Ja hvis møtt før OG enten har et utviklingstrinn ELLER kommer kjølig tilbake
 *  (misfornøyd sist → service recovery-sjanse, vektet ned i kundemiksen). */
export function kanReturnere(minne: StamkundeMinne | undefined): boolean {
  if (!minne || minne.antallMoter < 1) return false
  return minne.utviklingstrinn >= 1 || minne.sisteUtfall === 'misfornoyd'
}

/** Statuslabel for Målgruppe-fanen (alltid TEKST, aldri kun farge). */
export function stamkundeTrinnLabel(minne: StamkundeMinne): { label: string; farge: string; ikon: string } {
  if (minne.sisteUtfall === 'misfornoyd') return { label: 'Misfornøyd sist', farge: '#f59e0b', ikon: '💬' }
  const t = minne.utviklingstrinn
  if (t >= 3) return { label: 'Anbefaler deg', farge: '#2dd4bf', ikon: '🌟' }
  if (t === 2) return { label: 'Trygg stamkunde', farge: '#2dd4bf', ikon: '💚' }
  if (t === 1) return { label: 'Ny stamkunde', farge: '#38bdf8', ikon: '👋' }
  return { label: 'Kjenner deg', farge: '#94a3b8', ikon: '👋' }
}
