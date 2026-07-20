// ─── KROK 6 — «ESPEN SPØR» (kunnskapsquiz via mentoren) ──────────────────────
// Mentor-Espen stiller fagspørsmål gjennom den vanlige mentor-køen (badge, eleven
// klikker når hen vil — aldri avbrytende popup). Riktig svar gir en LITEN
// pengebelønning (kunnskapsbonus, egen linje i dagsoppgjøret); feil svar koster
// ingenting og gir forklaring. Fasit + forklaring vises ALLTID ETTER svar
// (brannalarm-prinsippet: beslutning først, sannheten etterpå).
//
// Innhold på bokmål; MÅ ALDRI motsi glossary.json. Forklaringer kan bruke
// [[GLOSSARY_ID|tekst]]-tokens (renderes klikkbare i mentor-bobla).

import type { GameState } from '../types'

export type EspenKategori = 'kalkyle' | 'malgruppe' | 'markedsmiks' | 'forbrukerlov' | 'drift'
export type EspenNivaa = 'vg1' | 'vg2'

/** Det byggede spørsmålet (statisk konstant ELLER avledet av elevens tall). */
export interface EspenBygg {
  tekst: string
  alternativer: string[]     // 3–4 stk
  riktigIndex: number
  forklaring: string         // kan bruke [[GLOSSARY_ID|tekst]]
}

export interface EspenSporsmal {
  id: string
  temaId?: string            // uten temaId = grunnpool (alltid aktiv)
  nivaa: EspenNivaa
  kategori: EspenKategori
  /** null = ikke stillbar nå (mangler nødvendige data i state). */
  bygg: (state: GameState) => EspenBygg | null
  glossaryId?: string        // 📚-lenke i forklaringen (informativt)
}

// ── Byggehjelpere ────────────────────────────────────────────────────────────
/** Statisk spørsmål (ignorerer state). */
function stat(
  id: string, nivaa: EspenNivaa, kategori: EspenKategori,
  tekst: string, alternativer: string[], riktigIndex: number, forklaring: string,
  glossaryId?: string, temaId?: string,
): EspenSporsmal {
  return { id, nivaa, kategori, glossaryId, temaId, bygg: () => ({ tekst, alternativer, riktigIndex, forklaring }) }
}

/** Numeriske alternativer: dedupliser, sorter stigende (deterministisk posisjon),
 *  formatér med enhet. riktig MÅ være blant tallene. */
function numAlt(riktig: number, distraktorer: number[], enhet = 'kr'): { alternativer: string[]; riktigIndex: number } {
  const uniq: number[] = []
  for (const v of [riktig, ...distraktorer]) if (!uniq.includes(v)) uniq.push(v)
  const sorted = [...uniq].sort((a, b) => a - b)
  return { alternativer: sorted.map(v => `${v} ${enhet}`), riktigIndex: sorted.indexOf(riktig) }
}

/** Et priset hovedprodukt å regne på (hovedprodukt, ellers første prisede). */
function regneVare(state: GameState) {
  return state.products.find(p => p.id === state.mainProductId && p.retailPrice > 0)
    ?? state.products.find(p => p.retailPrice > 0)
    ?? null
}

// ── GRUNNPOOL — statiske spørsmål (hovedvekt VG1) ────────────────────────────
export const ESPEN_SPORSMAL: EspenSporsmal[] = [
  // — kalkyle —
  stat('kalk_db_fast', 'vg1', 'kalkyle',
    'Du selger en vare for 30 kr. Den kostet deg 12 kr i innkjøp. Hva er dekningsbidraget per stk?',
    ['12 kr', '18 kr', '30 kr', '42 kr'], 1,
    'Dekningsbidrag = pris − varekost = 30 − 12 = 18 kr. Det er pengene som skal dekke de faste kostnadene og gi overskudd. [[ECO_001|Dekningsbidraget]] er kjernen i all prising.',
    'ECO_001'),
  stat('kalk_fast', 'vg1', 'kalkyle',
    'Hva kjennetegner en FAST kostnad?',
    ['Den påløper uansett hvor mye du selger', 'Den øker for hver vare du selger', 'Den forsvinner når du selger lite', 'Den betales bare i desember'],
    0,
    'Faste kostnader (husleie, forsikring, eierlønn) løper uansett omsetning. Variable kostnader følger salget. [[ECO_007|Faste kostnader]] må dekkes selv på en stille dag.',
    'ECO_007'),
  stat('kalk_variabel', 'vg1', 'kalkyle',
    'Hvilket er et eksempel på en VARIABEL kostnad i kaféen?',
    ['Innkjøpsprisen på varene du selger', 'Husleien', 'Eierlønn', 'Forsikring'],
    0,
    'Variable kostnader endrer seg med salget — selger du flere boller, kjøper du inn mer mel. Husleie/lønn/forsikring er faste. Se [[ECO_006|variable kostnader]].',
    'ECO_006'),
  // — drift —
  stat('drift_svinn', 'vg1', 'drift',
    'Du kaster usolgt ferskvare på slutten av dagen. Hva kaller vi det?',
    ['Svinn', 'Avanse', 'Dekningsbidrag', 'Omsetning'],
    0,
    'Usolgt ferskvare som kastes er [[ECO_018|svinn]] — det spiser rett av overskuddet. Bestill mindre av det som blir stående.',
    'ECO_018'),
  stat('drift_tapt', 'vg1', 'drift',
    'En vare er utsolgt, og kunden går uten å kjøpe. Hva er dette?',
    ['Tapt salg', 'Svinn', 'Rabatt', 'Reklamasjon'],
    0,
    '[[SAL_002|Tapt salg]] er inntekt du aldri får igjen fordi varen var tom (eller køen for lang). Det vises ikke i kassa, men det er ekte penger tapt.',
    'SAL_002'),
  stat('drift_mengderabatt', 'vg1', 'drift',
    'Hva betyr mengderabatt?',
    ['Lavere pris per enhet når kunden kjøper mange', 'Høyere pris ved store kjøp', 'Rabatt bare til stamkunder', 'Gratis frakt'],
    0,
    '[[SAL_003|Mengderabatt]] gir lavere stykkpris ved store kjøp — men regn alltid på at totalen fortsatt dekker varekost og fortjeneste.',
    'SAL_003'),
  // — markedsmiks —
  stat('mm_4p', 'vg1', 'markedsmiks',
    'De fire P-ene i markedsmiksen er Produkt, Pris, Plass og …?',
    ['Påvirkning (promosjon)', 'Personale', 'Profitt', 'Plassering i hylla'],
    0,
    'De 4 P-ene er Produkt, Pris, Plass (distribusjon) og Påvirkning (markedskommunikasjon). Se [[MKT_001|markedsmiksen]].',
    'MKT_001'),
  stat('mm_plass', 'vg1', 'markedsmiks',
    '«Plass» i de 4 P-ene handler om …?',
    ['Hvordan varen gjøres tilgjengelig for kunden (distribusjon)', 'Hvor kassa står', 'Hvor stor butikken er', 'Prisen på varen'],
    0,
    '«Plass» = distribusjon: veien varen tar ut til kunden. En bestilling levert til et kontor er en egen [[MKT_006|distribusjonskanal]] utenom disken.',
    'MKT_006'),
  stat('mm_psyk', 'vg1', 'markedsmiks',
    'En pris satt til 99 kr i stedet for 100 kr er et eksempel på …?',
    ['Psykologisk prising', 'Kostnadsbasert prising', 'Mengderabatt', 'Førpris'],
    0,
    '99-priser føles billigere enn de er — det er [[MKT_013|psykologisk prising]]. Et lite dytt, men bruk det bevisst.',
    'MKT_013'),
  stat('mm_kanal_bestilling', 'vg1', 'markedsmiks',
    'En bakevare-bestilling levert til et kontor er salg gjennom …?',
    ['En distribusjonskanal utenom disken', 'Reklame', 'En kampanje', 'Et lån'],
    0,
    'Å selge utenom disken (bestillinger, utkjøring) er en ny [[MKT_006|distribusjonskanal]] — mer volum uten flere kunder inn døra.',
    'MKT_006'),
  // — malgruppe —
  stat('mg_segment', 'vg1', 'malgruppe',
    'Å dele markedet inn i grupper etter alder, bosted og interesser kalles …?',
    ['Segmentering', 'Posisjonering', 'Distribusjon', 'Prisdifferensiering'],
    0,
    '[[MKT_020|Segmentering]] deler markedet i grupper så du kan snakke til de rette folkene i stedet for «alle».',
    'MKT_020'),
  stat('mg_hvorfor', 'vg1', 'malgruppe',
    'Hvorfor velge en målgruppe i stedet for «alle»?',
    ['Så markedsføringen treffer de rette og ikke sløses bort', 'Fordi loven krever det', 'For å ta høyere pris av alle', 'Det er tilfeldig hvem som kommer'],
    0,
    'Med en klar [[MKT_020|målgruppe]] når hver markedsføringskrone lenger — du betaler ikke for å nå folk som aldri kommer.',
    'MKT_020'),
  // — forbrukerlov —
  stat('fl_angre', 'vg1', 'forbrukerlov',
    'Kjøper en kunde en vare på nett, har hen normalt … til å angre?',
    ['14 dagers angrerett', 'Ingen angrerett', 'Ett års angrerett', '3 dagers angrerett'],
    0,
    'Ved netthandel gjelder [[JUS_002|angrerett]] i 14 dager. I fysisk butikk er bytte/angre en frivillig kundeservice, ikke en plikt.',
    'JUS_002'),
  stat('fl_reklamasjon', 'vg1', 'forbrukerlov',
    'En vare du solgte viste seg å være ødelagt. Kunden kan …?',
    ['Klage og kreve retting eller ny vare (reklamasjon)', 'Ingenting — salget er endelig', 'Bare få 10 % avslag', 'Kun bytte samme dag'],
    0,
    '[[JUS_003|Reklamasjonsretten]] gir kunden krav på retting, omlevering eller prisavslag når varen har en mangel.',
    'JUS_003'),
  stat('fl_forbrukerkjop', 'vg1', 'forbrukerlov',
    'Loven som beskytter kunden når hen handler som privatperson heter …?',
    ['Forbrukerkjøpsloven', 'Aksjeloven', 'Regnskapsloven', 'Arbeidsmiljøloven'],
    0,
    '[[JUS_001|Forbrukerkjøpsloven]] gjelder salg fra næringsdrivende til privatpersoner — den gir kunden sterke rettigheter.',
    'JUS_001'),

  // — TEMA-GATET eksempel (vises kun når Kampanje-temaet er aktivt) —
  stat('mm_kampanje_kanal', 'vg1', 'markedsmiks',
    'I en kampanje bør du velge kanal etter …?',
    ['Hvor målgruppa faktisk er', 'Hva som er billigst', 'Tilfeldig', 'Hva naboen gjør'],
    0,
    'En kampanje virker bare der målgruppa er. Velg [[MKT_006|kanal]] etter hvem du vil nå, ikke etter pris alene.',
    'MKT_006', 'kampanje'),

  // ── DYNAMISKE — bruker elevens egne tall (null hvis data mangler) ──────────
  {
    id: 'dyn_db', nivaa: 'vg1', kategori: 'kalkyle', glossaryId: 'ECO_001',
    bygg: (s) => {
      const v = regneVare(s); if (!v) return null
      const db = v.retailPrice - v.costPrice
      const { alternativer, riktigIndex } = numAlt(db, [v.retailPrice, v.costPrice, v.retailPrice + v.costPrice])
      return {
        tekst: `Du satte prisen på «${v.name}» til ${v.retailPrice} kr. Varekosten er ${v.costPrice} kr. Hva er dekningsbidraget per stk?`,
        alternativer, riktigIndex,
        forklaring: `${v.retailPrice} − ${v.costPrice} = ${db} kr i [[ECO_001|dekningsbidrag]] per stk — det som skal dekke faste kostnader og gi overskudd.`,
      }
    },
  },
  {
    id: 'dyn_dg', nivaa: 'vg1', kategori: 'kalkyle', glossaryId: 'ECO_002',
    bygg: (s) => {
      const v = regneVare(s); if (!v || v.retailPrice <= 0) return null
      const db = v.retailPrice - v.costPrice
      const dg = Math.round((db / v.retailPrice) * 100)
      const { alternativer, riktigIndex } = numAlt(dg, [Math.round((v.costPrice / v.retailPrice) * 100), Math.min(100, dg + 20), Math.max(0, dg - 20)], '%')
      return {
        tekst: `«${v.name}»: dekningsbidraget er ${db} kr og prisen ${v.retailPrice} kr. Hva er dekningsgraden (avrundet)?`,
        alternativer, riktigIndex,
        forklaring: `[[ECO_002|Dekningsgrad]] = DB / pris × 100 = ${db} / ${v.retailPrice} × 100 ≈ ${dg} %. Den viser hvor stor andel av prisen som er dekningsbidrag.`,
      }
    },
  },
  {
    id: 'dyn_paaslag', nivaa: 'vg1', kategori: 'kalkyle', glossaryId: 'ECO_011',
    bygg: (s) => {
      const v = regneVare(s); if (!v || v.costPrice <= 0) return null
      const paaslag = Math.round(((v.retailPrice - v.costPrice) / v.costPrice) * 100)
      const { alternativer, riktigIndex } = numAlt(paaslag, [Math.round(((v.retailPrice - v.costPrice) / v.retailPrice) * 100), paaslag + 25, Math.max(0, paaslag - 25)], '%')
      return {
        tekst: `«${v.name}» koster ${v.costPrice} kr i innkjøp og selges for ${v.retailPrice} kr. Hvor stort er påslaget (avansen) på varekosten?`,
        alternativer, riktigIndex,
        forklaring: `[[ECO_011|Påslag/avanse]] regnes av VAREKOSTEN: (${v.retailPrice} − ${v.costPrice}) / ${v.costPrice} × 100 ≈ ${paaslag} %. (Dekningsgrad regnes derimot av prisen.)`,
      }
    },
  },
  {
    id: 'dyn_svinn', nivaa: 'vg1', kategori: 'drift', glossaryId: 'ECO_018',
    bygg: (s) => {
      const r = s.lastDayResult; if (!r) return null
      const solgt = r.soldStk + r.bakgrunnStk
      const kastet = r.svinnStk
      const handtert = solgt + kastet
      if (kastet <= 0 || handtert <= 0) return null
      const pst = Math.round((kastet / handtert) * 100)
      const { alternativer, riktigIndex } = numAlt(pst, [Math.min(100, pst + 15), Math.max(0, pst - 10), Math.round((kastet / Math.max(1, solgt)) * 100)], '%')
      return {
        tekst: `I går solgte du ${solgt} enheter og kastet ${kastet}. Hvor mange prosent svinn er det (av alt du hadde ute)?`,
        alternativer, riktigIndex,
        forklaring: `[[ECO_018|Svinn]] i % = kastet / (solgt + kastet) × 100 = ${kastet} / ${handtert} × 100 ≈ ${pst} %. Høyt svinn? Bestill litt mindre ferskvare.`,
      }
    },
  },
  {
    id: 'dyn_malgruppe', nivaa: 'vg1', kategori: 'malgruppe', glossaryId: 'MKT_020',
    bygg: (s) => {
      const seg = s.targetAudience.ageGroups
      if (!seg.length) return null
      return {
        tekst: `Du har valgt målgruppa ${seg.join(', ')}. Hva er lurt når du velger markedsføringskanal?`,
        alternativer: ['Velge kanalen målgruppa faktisk bruker', 'Velge den billigste uansett', 'Være på alle kanaler likt', 'Velge den du selv liker best'],
        riktigIndex: 0,
        forklaring: `Kanalvalget bør følge [[MKT_020|målgruppa]]: der ${seg.join(', ')} faktisk er, når hver krone lengst. Rett budskap på feil kanal er bortkastet.`,
      }
    },
  },

  // ── VG2 — vises kun ved klasseNivaa/temaNivaa 'vg2' ────────────────────────
  stat('vg2_dg_begrep', 'vg2', 'kalkyle',
    'Hva forteller dekningsgraden?',
    ['Hvor stor andel av salgsprisen som er dekningsbidrag', 'Hvor mange varer du solgte', 'Din totale omsetning', 'Hvor mye skatt du betaler'],
    0,
    '[[ECO_002|Dekningsgrad]] = DB / pris × 100. Den sier hvor mye av HVER krone i salg som blir igjen til å dekke faste kostnader — nyttig for å sammenligne varer.',
    'ECO_002'),
  stat('vg2_betalt_omtale', 'vg2', 'forbrukerlov',
    'En influenser får betalt for å omtale kaféen. Hva krever loven?',
    ['At omtalen merkes tydelig som reklame', 'Ingenting spesielt', 'At influenseren eier produktet', 'At prisen alltid oppgis'],
    0,
    '[[JUS_008|Betalt omtale]] SKAL merkes som reklame (markedsføringsloven). Skjult reklame er ulovlig og svekker tilliten.',
    'JUS_008'),
  stat('vg2_forpris', 'vg2', 'markedsmiks',
    'Førpris-regelen ved et salg betyr at …?',
    ['Varen faktisk må ha hatt den «gamle» prisen en periode før', 'Du kan sette gammel pris fritt', 'Prisen må ende på 9', 'Tilbud er forbudt'],
    0,
    '[[MKT_054|Førpris]]: den «før»-prisen du reklamerer med må være reell — varen skal ha kostet det en periode. Ellers er tilbudet villedende.',
    'MKT_054'),
  stat('vg2_pristilbud', 'vg2', 'drift',
    'Et skriftlig pristilbud til en bedriftskunde bør inneholde …?',
    ['Pris, vilkår og en frist', 'Bare prisen', 'Bare leveringsdato', 'Ingenting bindende'],
    0,
    'Et godt [[SAL_004|pristilbud]] er tydelig: pris, vilkår og hvor lenge det gjelder. Det beskytter både deg og kunden mot misforståelser.',
    'SAL_004'),
]

// ── Eligibilitet + valg (rene funksjoner, brukt av reduceren) ────────────────
export interface EspenKontekst {
  nivaa: EspenNivaa
  aktiveTemaIds: string[]
  besvarteIds: string[]
  feilCooldown: Record<string, number>
  absDag: number
  kategoriHint?: EspenKategori
}

/** Spørsmål som KAN stilles nå (nivå, tema, ikke besvart, ikke i cooldown, har
 *  data). Foretrekker kategoriHint hvis noen passer. */
export function finnKandidater(state: GameState, ctx: EspenKontekst): EspenSporsmal[] {
  const kand = ESPEN_SPORSMAL.filter(q => {
    if (q.nivaa === 'vg2' && ctx.nivaa !== 'vg2') return false
    if (q.temaId && !ctx.aktiveTemaIds.includes(q.temaId)) return false
    if (ctx.besvarteIds.includes(q.id)) return false
    const cd = ctx.feilCooldown[q.id]
    if (cd != null && cd > ctx.absDag) return false
    return q.bygg(state) !== null
  })
  if (ctx.kategoriHint) {
    const foretrukket = kand.filter(q => q.kategori === ctx.kategoriHint)
    if (foretrukket.length) return foretrukket
  }
  return kand
}

export const espenSporsmalById = (id: string): EspenSporsmal | undefined =>
  ESPEN_SPORSMAL.find(q => q.id === id)
