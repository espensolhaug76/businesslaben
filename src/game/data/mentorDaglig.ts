// ─── LÆRINGSLAGET — mentorens DAGLIGE refleksjon (dagsoppgjøret) ───────────────
// Når dagsoppgjøret lukkes leser Espen dagens data og kommenterer DET STØRSTE
// signalet — ett per dag, refleksjon (aldri fasit). Prioritert rekkefølge: tar
// FØRSTE som treffer terskelen (terskler i BALANCE.mentorDaglig). Datavakt: fyrer
// ALDRI på tomt grunnlag — en rød/flat dag uten tydelig signal gir null (ingen
// melding). Meldingene bruker [[GLOSSARY_ID|tekst]]-fagordtokens (renderes i
// Mentor.tsx). Beregnes reducer-side (CLOSE_DAY) og lagres i state.mentorDagligHint
// så den overlever at lastDayResult nullstilles ved dagsbytte.

import type { DayResult } from '../types'
import { BALANCE } from './balance'

export type DagligSignal = 'ko' | 'svinn' | 'overpris' | 'tomt' | 'anerkjennelse'

export interface DagligRefleksjon {
  /** Hvilket signal som vant prioriteringen (spilltest + telemetri). */
  signal: DagligSignal
  /** Espens melding (bokmål, med fagordtokens). */
  melding: string
}

const kr = (n: number) => `${Math.round(n).toLocaleString('nb-NO')} kr`

/** Velg dagens refleksjon fra dagsoppgjøret. `forrigeDag` = forrige dags resultat
 *  (for «svinn to dager på rad»). `personaleSynlig` = Personale-fanen synlig (delt
 *  FD+M ⇒ FD ELLER M på) — bemannings-/kø-signalet kommenteres bare da
 *  (fagfilter/datavakt). */
export function dagligRefleksjon(
  r: DayResult,
  forrigeDag: DayResult | undefined,
  personaleSynlig: boolean,
): DagligRefleksjon | null {
  const T = BALANCE.mentorDaglig

  // 1. KØ-TAP (kun når Personale-fanen er synlig — ellers finnes ikke bemanning
  //    for eleven, jf. DEL 2). Terskel: flere enn koTapKunder gikk.
  if (personaleSynlig && r.koKunder > T.koTapKunder) {
    return {
      signal: 'ko',
      melding: `I dag ga ${r.koKunder} kunder opp og gikk fordi køen ble for lang — det er tapt salg. Én på gulvet rekker bare så mange. Hva ville skjedd om du satte flere på vakt i de travle timene?`,
    }
  }

  // 2. SAMME VARE I SVINN ≥ 2 DAGER PÅ RAD → bestillingsspørsmål.
  if (forrigeDag) {
    const iGaar = new Set(forrigeDag.svinnProdukter.filter(s => s.stk > 0).map(s => s.navn))
    const gjenganger = r.svinnProdukter.find(s => s.stk > 0 && iGaar.has(s.navn))
    if (gjenganger) {
      return {
        signal: 'svinn',
        melding: `${gjenganger.navn} har gått i [[ECO_018|svinn]] to dager på rad — hva sier det om etterspørselen? Kanskje bestille litt mindre av akkurat den?`,
      }
    }
  }

  // 3. PRISET OVER MARKED med ≥ overprisAvstatt avståtte på én vare → prisrefleksjon.
  const verstOverpris = [...r.overprisProdukter].sort((a, b) => b.tapte - a.tapte)[0]
  if (verstOverpris && verstOverpris.tapte >= T.overprisAvstatt) {
    return {
      signal: 'overpris',
      melding: `${verstOverpris.navn} koster ${kr(verstOverpris.pris)} hos deg — rundt ${kr(verstOverpris.marked)} nedi gata, og ${verstOverpris.tapte} kunder avsto i dag. Hva tror du [[ECO_011|påslaget]] ditt gjør med etterspørselen?`,
    }
  }

  // 4. GIKK TOMT på ≥ tomtVarer ulike varer → dybde/bredde-spørsmål.
  if (r.tomtProdukter.length >= T.tomtVarer) {
    return {
      signal: 'tomt',
      melding: `Du gikk tom for ${r.tomtProdukter.length} ulike varer i dag — tomt trau er tapte salg. Er det [[MKT_004|dybden]] (nok av hver) som skranter, eller sprer du deg for [[MKT_003|bredt]]?`,
    }
  }

  // 5. ELLERS, ved plussdag: kort anerkjennelse + ett åpent spørsmål.
  if (r.resultat > 0) {
    return {
      signal: 'anerkjennelse',
      melding: `Fin dag — ${kr(r.resultat)} i pluss i dag. Hva tror du var det viktigste du gjorde riktig?`,
    }
  }

  // DATAVAKT: ingen terskel truffet og ingen plussdag ⇒ ingenting å kommentere.
  return null
}
