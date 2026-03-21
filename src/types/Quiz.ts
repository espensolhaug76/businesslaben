// ─── Quiz system ─────────────────────────────────────────

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Quiz {
  id: string
  question: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: QuizOption[]
  explanation: string
  relatedTerm?: string
}
