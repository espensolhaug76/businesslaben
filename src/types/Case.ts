// ─── Case study / scenario ───────────────────────────────

export interface CaseOption {
  id: string
  label: string
  explanation: string
  isCorrect: boolean
  feedback: string
}

export interface Case {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: CaseOption[]
  learningObjective: string
}
