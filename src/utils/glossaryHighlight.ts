/**
 * Utility for finding glossary terms within theory text.
 * Returns matched term names found in a given text string.
 * These can be used to render GlossaryTermBadge components
 * alongside the text that contains them.
 */

let _glossaryTerms: string[] | null = null

/**
 * Lazy-loads the glossary term list.
 * Returns an array of all known glossary term strings.
 */
export async function getGlossaryTerms(): Promise<string[]> {
  if (_glossaryTerms) return _glossaryTerms
  try {
    const { glossary } = await import('../data')
    _glossaryTerms = glossary.map((g: { term: string }) => g.term)
    return _glossaryTerms
  } catch {
    return []
  }
}

/**
 * Synchronous version using a pre-loaded term list.
 * Pass the already-imported glossary array.
 */
export function findGlossaryTermsInText(
  text: string,
  terms: string[],
): string[] {
  const lower = text.toLowerCase()
  return terms.filter((term) => {
    const idx = lower.indexOf(term.toLowerCase())
    if (idx === -1) return false
    // Ensure it's a whole-word match (not part of another word)
    const before = idx > 0 ? lower[idx - 1] : ' '
    const after = idx + term.length < lower.length ? lower[idx + term.length] : ' '
    return /[\s,.:;!?"'()\-–—]/.test(before) || idx === 0
      ? /[\s,.:;!?"'()\-–—]/.test(after) || idx + term.length === lower.length
      : false
  })
}

/**
 * Given a list of theory phase texts, returns unique glossary terms
 * that appear across all texts. Useful for suggesting which
 * GlossaryTermBadges to add to a theory phase.
 */
export function extractGlossaryTermsFromPhases(
  texts: string[],
  terms: string[],
): string[] {
  const found = new Set<string>()
  for (const text of texts) {
    for (const term of findGlossaryTermsInText(text, terms)) {
      found.add(term)
    }
  }
  return Array.from(found)
}
