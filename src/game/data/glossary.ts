// ─── LÆRINGSLAGET — fagord-adapter over src/data/glossary.json ────────────────
// Typet, indeksert oppslag over de 141 begrepene. Dataene DUPLISERES IKKE — de
// leses fra JSON-en og normaliseres KUN ved innlasting (Ø/Æ/Å). JSON-en er
// blandet kodet: noen felt bruker ekte å/ø/æ, andre en ASCII-translitterasjon
// (å=aa, ø=oe, æ=ae). Vi erstatter digrafene per ORD, med en kuratert
// unntaksliste for ord der digrafen er EKTE (noe/poeng/naboen …) eller der
// kilden har en skrivefeil (rettes eksplisitt). Kategorinavn normaliseres via
// et lite kart (f.eks. «Okonomi» → «Økonomi» — ingen digraf å slå på).

import glossaryRaw from '../../data/glossary.json'

export type GlossaryLevel = 'VG1' | 'VG2'

export interface GlossaryTerm {
  id: string
  /** Normalisert visningsterm. */
  term: string
  /** RÅ kategorinøkkel (stabil, for filtrering/gruppering). Bruk categoryLabel() for visning. */
  category: string
  level: GlossaryLevel
  definition: string
  example: string | null
  formula: string | null
  /** Normaliserte navn på relaterte begreper (kan slås opp med byTerm). */
  related: string[]
  commonMistake: string | null
}

interface RawTerm {
  id: string
  term: string
  category: string
  level: string
  definition: string
  example: string | null
  formula: string | null
  related_terms: string[]
  common_mistake: string | null
}

// Ord der digraf-erstatning IKKE skal gjøres (ekte oe/ae/aa), eller der kilden
// har en kjent skrivefeil som rettes til korrekt bokmål. Nøkkel = lowercase.
const ORD_UNNTAK: Record<string, string> = {
  // EKTE digrafer — skal IKKE konverteres
  noe: 'noe', noen: 'noen', naboen: 'naboen', videoer: 'videoer',
  poeng: 'poeng', poenget: 'poenget', poengene: 'poengene', fakturaen: 'fakturaen',
  // KILDEFEIL i JSON-en — rettes eksplisitt
  markedsfooeringsloven: 'markedsføringsloven',
  ooekosystem: 'økosystem',
  noevendigvis: 'nødvendigvis',
  brannoeevelser: 'brannøvelser',
  kroppssspraak: 'kroppsspråk',
  sirkulaerokonomi: 'sirkulærøkonomi',
  skjoenhetsblogger: 'skjønnhetsblogger',
}

const CATEGORY_LABEL: Record<string, string> = {
  Okonomi: 'Økonomi',            // ingen digraf i kilden — må mappes manuelt
  Markedsfoering: 'Markedsføring',
  Baerekraft: 'Bærekraft',
  Kulturforstaelse: 'Kulturforståelse',
}

function digrafer(w: string): string {
  return w
    .replace(/Aa/g, 'Å').replace(/aa/g, 'å')
    .replace(/Ae/g, 'Æ').replace(/ae/g, 'æ')
    .replace(/Oe/g, 'Ø').replace(/oe/g, 'ø')
}

function medStorForbokstav(orig: string, repl: string): string {
  if (orig.length > 0 && orig[0] === orig[0]!.toUpperCase() && repl.length > 0) {
    return repl.charAt(0).toUpperCase() + repl.slice(1)
  }
  return repl
}

/** Normaliser Ø/Æ/Å i en tekst, ord for ord, med unntakslista. Ren funksjon. */
export function normaliser(s: string | null | undefined): string {
  if (!s) return ''
  return s.replace(/[A-Za-zÀ-ÿ]+/g, w => {
    const unntak = ORD_UNNTAK[w.toLowerCase()]
    return unntak !== undefined ? medStorForbokstav(w, unntak) : digrafer(w)
  })
}

/** Kategoriens visningsnavn (normalisert). */
export function categoryLabel(cat: string): string {
  return CATEGORY_LABEL[cat] ?? normaliser(cat)
}

// ── Bygg det normaliserte, indekserte datasettet ÉN gang ─────────────────────

const RAW = (glossaryRaw as { glossary: RawTerm[] }).glossary

export const GLOSSARY: GlossaryTerm[] = RAW.map(t => ({
  id: t.id,
  term: normaliser(t.term),
  category: t.category,
  level: (t.level === 'VG2' ? 'VG2' : 'VG1') as GlossaryLevel,
  definition: normaliser(t.definition),
  example: t.example ? normaliser(t.example) : null,
  formula: t.formula ? normaliser(t.formula) : null,
  related: (t.related_terms ?? []).map(normaliser),
  commonMistake: t.common_mistake ? normaliser(t.common_mistake) : null,
}))

const BY_ID = new Map(GLOSSARY.map(t => [t.id, t]))
const BY_TERM = new Map(GLOSSARY.map(t => [t.term.toLowerCase(), t]))

/** Slå opp et begrep på id (f.eks. «ECO_001»). */
export function byId(id: string): GlossaryTerm | undefined {
  return BY_ID.get(id)
}

/** Slå opp på term (case-ufølsomt, mot normalisert visningsterm). */
export function byTerm(term: string): GlossaryTerm | undefined {
  return BY_TERM.get(normaliser(term).toLowerCase())
}

/** Fritekstsøk i term + definisjon (case-ufølsomt). Tom query ⇒ alt. */
export function search(query: string): GlossaryTerm[] {
  const q = query.trim().toLowerCase()
  if (!q) return GLOSSARY
  return GLOSSARY.filter(t =>
    t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q))
}

/** Filtrer på kategori (rå nøkkel) og/eller nivå. */
export function filter(opts: { category?: string; level?: GlossaryLevel } = {}): GlossaryTerm[] {
  return GLOSSARY.filter(t =>
    (!opts.category || t.category === opts.category) &&
    (!opts.level || t.level === opts.level))
}

/** Kategoriene som finnes, som { value (rå), label (visning) }, alfabetisk på label. */
export const CATEGORIES: { value: string; label: string }[] = [...new Set(GLOSSARY.map(t => t.category))]
  .map(c => ({ value: c, label: categoryLabel(c) }))
  .sort((a, b) => a.label.localeCompare(b.label, 'nb'))
