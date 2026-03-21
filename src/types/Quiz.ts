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

// ─── Quiz exercise types (used by data/vg2/* exercise files) ─────────────────

export interface QuizChoice {
  id: string
  label: string
  isCorrect: boolean
  feedback?: string
}

export interface QuizExercise {
  id: string
  icon?: string
  title?: string
  context?: string
  question: string
  choices: QuizChoice[]
  espenTip?: string
}
