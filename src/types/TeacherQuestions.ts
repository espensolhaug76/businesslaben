export type QuestionType = 'multiple_choice' | 'open_ended'

export interface TeacherQuestion {
  id: string
  type: QuestionType
  questionText: string
  modelAnswer?: string       // Only for open_ended, only shown to teacher
  options?: string[]         // Only for multiple_choice
  correctOptionIndex?: number // Only for multiple_choice
  createdAt: string
  subject: string
  moduleRoute?: string       // Route of linked module, e.g. /learning/forretningsdrift/budgeting
}

export interface StudentAnswer {
  questionId: string
  studentName: string
  answerText: string
  selectedOptionIndex?: number // For multiple_choice
  submittedAt: string
  teacherComment?: string
}
