// ── Exam types ────────────────────────────────────────────────────────────────

export interface CaseSubQuestion {
  id: string
  question: string
  suggestedAnswer?: string
  maxPoints?: number
}

export interface ExamQuestion {
  id: string
  type: 'multiple_choice' | 'open' | 'case'
  question: string
  // multiple_choice only:
  options?: string[]
  correct?: number
  points?: number
  penaltyPoints?: number  // default -0.5
  /** Fasitforklaring. Følger med fra standardprøvene (spor D). */
  explanation?: string
  /** Vanskegrad fra standardkonkurransene: styrer rekkefølgen i prøva. */
  difficulty?: 'lett' | 'middels' | 'vanskelig'
  // open/case only:
  suggestedAnswer?: string  // only visible to teacher
  maxPoints?: number
  // case only:
  subQuestions?: CaseSubQuestion[]
}

export interface Exam {
  id: string
  title: string
  classCode: string
  subjects: string[]
  moduleId?: string
  timeMinutes: number
  questions: ExamQuestion[]
  scoringRules: {
    correctPoints: number      // default 1
    wrongPenalty: number       // default -0.5
    unansweredPoints: number   // default 0
  }
  gradeThresholds: {           // Norwegian 1-6 scale
    grade6: number             // % needed for 6, default 90
    grade5: number             // default 75
    grade4: number             // default 60
    grade3: number             // default 45
    grade2: number             // default 30
    // below grade2 = grade 1
  }
  status: 'draft' | 'active' | 'closed'
  examCode?: string
  createdAt: string
  /** Telles opp ved hver publisering. Eleven låser versjonen ved oppstart. */
  version?: number
}

/**
 * Ferdiglaget standardprøve (spor D). Ikke en `Exam`: den har verken klasse,
 * status eller prøvekode, fordi den er en MAL. Læreren tar en kopi via
 * `examFromStandard()`, og malen selv endres aldri.
 */
export interface StandardExam {
  id: string
  code: string
  title: string
  /** Fag-ID fra MINE_FAG_OPTIONS. */
  subject: string
  timeMinutes: number
  scoringRules: Exam['scoringRules']
  questions: ExamQuestion[]
  createdAt: string
}

/** Standard karaktergrenser — samme verdier som ExamBuilder bruker. */
export const DEFAULT_GRADE_THRESHOLDS: Exam['gradeThresholds'] = {
  grade6: 90, grade5: 75, grade4: 60, grade3: 45, grade2: 30,
}

/**
 * Lager lærerens egen, redigerbare kopi av en standardprøve. Kopien får ny
 * ID og opprettelsestid; malen røres ikke.
 */
export function examFromStandard(
  mal: StandardExam,
  opts: { id: string; classCode: string; createdAt: string },
): Exam {
  return {
    id: opts.id,
    title: mal.title,
    classCode: opts.classCode,
    subjects: [mal.subject],
    timeMinutes: mal.timeMinutes,
    questions: mal.questions.map(q => ({ ...q })),
    scoringRules: { ...mal.scoringRules },
    gradeThresholds: { ...DEFAULT_GRADE_THRESHOLDS },
    status: 'draft',
    createdAt: opts.createdAt,
  }
}

export interface SuspiciousEvent {
  type: string
  timestamp: string
}

export interface ExamSubmission {
  examId: string
  studentName: string
  answers: Array<{ questionId: string; answer: string | number }>
  startedAt: string
  submittedAt: string
  autoScore?: number          // calculated from multiple choice
  manualScores?: Array<{ questionId: string; points: number }>
  totalPoints?: number
  grade?: number              // 1-6
  suspiciousActivity?: SuspiciousEvent[]
}

// ── Helper functions ──────────────────────────────────────────────────────────

export function getMaxPoints(exam: Exam): number {
  return exam.questions.reduce((sum, q) => {
    if (q.type === 'multiple_choice') return sum + (q.points ?? exam.scoringRules.correctPoints)
    if (q.type === 'open') return sum + (q.maxPoints ?? 5)
    if (q.type === 'case') {
      const subTotal = (q.subQuestions ?? []).reduce((s, sq) => s + (sq.maxPoints ?? 5), 0)
      return sum + subTotal
    }
    return sum
  }, 0)
}

export function calculateGrade(percentage: number, thresholds: Exam['gradeThresholds']): number {
  if (percentage >= thresholds.grade6) return 6
  if (percentage >= thresholds.grade5) return 5
  if (percentage >= thresholds.grade4) return 4
  if (percentage >= thresholds.grade3) return 3
  if (percentage >= thresholds.grade2) return 2
  return 1
}

export function submissionsKey(examCode: string): string {
  return `adventure-exam-submissions-${examCode}`
}

export function startTrackingKey(examCode: string) {
  return `adventure-exam-started-${examCode}`
}
