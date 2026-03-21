// ─── Glossary ────────────────────────────────────────────

export interface GlossaryEntry {
  id: string
  term: string
  category: string
  level: string
  definition: string
  example: string
  formula: string | null
  related_terms: string[]
  common_mistake: string
  espenTips?: string
}

export interface GlossaryData {
  glossary: GlossaryEntry[]
}
