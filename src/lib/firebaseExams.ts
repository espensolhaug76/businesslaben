/**
 * Firebase-API for Prøver-systemet.
 *
 * Skjema — samme navnekonvensjon som /competitions/{code}/… i
 * firebaseCompetitions.ts:
 *
 *  /exams/{examCode}/
 *    definition               — Exam (kun publiserte prøver; utkast blir lokalt)
 *    progress/{studentId}     — { studentName, startedAt, answeredCount,
 *                                 totalQuestions, status, examVersion }
 *    submissions/{studentId}  — ExamSubmission (+ manualScores fra læreren)
 *
 * Cross-device: lærer og elev snakker mot samme noder. Før dette leste
 * ExamSession prøven fra sin egen localStorage og skrev innleveringen dit,
 * så prøvemodus fungerte bare hvis lærer og elev satt på samme maskin.
 *
 * PERSONVERN: `progress` inneholder ANTALL besvarte spørsmål, aldri svarene.
 * Selve svarene skrives kun ved innlevering, til `submissions`.
 *
 * Backward-compat: utkast (status 'draft') skrives ikke hit. Gamle prøver i
 * localStorage blir liggende; publiserer læreren en av dem, skrives den til
 * RTDB da (publishExam er idempotent).
 */
import { ref, set, get, update, remove, onValue } from 'firebase/database'
import { db } from './firebase'
import type { Exam, ExamSubmission } from '../types/Exam'

/** Fjern undefined rekursivt — Firebase avviser undefined-verdier. */
function deepClean<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(v => deepClean(v)) as unknown as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v !== undefined) out[k] = deepClean(v)
    }
    return out as T
  }
  return value
}

/** Sanitiser en string for bruk som Firebase-key. Samme regel som konkurransene. */
function sanitizeKey(s: string): string {
  return s.replace(/[.#$/[\]]/g, '_')
}

/** Prøvekode elevene taster inn. Samme format som byggeren har brukt. */
export function generateExamCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'EXAM-' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

/** Deterministisk elev-id ut fra navn — én entry per elev per prøve. */
export function examStudentId(studentName: string): string {
  return sanitizeKey(studentName.trim()) || 'ukjent'
}

// ── Definisjon ──────────────────────────────────────────────────────────────

/**
 * Publiser prøven under examCode med status 'active'.
 *
 * Idempotent — trygt å kalle på nytt når læreren redigerer en publisert prøve.
 * `version` telles opp ved hver skriving. Elever som allerede er i gang holder
 * på den versjonen de hentet ved start (se fetchExamByCode); elever som ikke
 * har startet, får den nye.
 */
export async function publishExam(exam: Exam): Promise<Exam> {
  if (!exam.examCode) throw new Error('Prøven mangler examCode og kan ikke publiseres.')
  const node = ref(db, `exams/${exam.examCode}/definition`)
  const forrige = (await get(node)).val() as Exam | null
  const publisert: Exam = {
    ...exam,
    status: 'active',
    version: (forrige?.version ?? 0) + 1,
  }
  await set(node, deepClean(publisert))
  return publisert
}

/**
 * Elevens oppslag på prøvekode. Kalles ÉN gang når elevens økt åpnes, og
 * resultatet holdes i komponent-state resten av økta — det er dette som gjør
 * at en lærer som redigerer underveis ikke bytter prøven under føttene på
 * elever som er i gang.
 */
export async function fetchExamByCode(code: string): Promise<Exam | null> {
  const snap = await get(ref(db, `exams/${code}/definition`))
  return (snap.val() as Exam | null) ?? null
}

/** Sett status på en publisert prøve (f.eks. 'closed' når læreren avslutter). */
export async function setExamStatus(code: string, status: Exam['status']): Promise<void> {
  await update(ref(db, `exams/${code}/definition`), { status })
}

/** Slett prøven med alt av fremdrift og innleveringer. */
export async function deleteExam(code: string): Promise<void> {
  await remove(ref(db, `exams/${code}`))
}

/** Abonner på prøvedefinisjonen (læreren, for å se status live). */
export function subscribeToExamDefinition(
  code: string,
  cb: (exam: Exam | null) => void,
): () => void {
  return onValue(ref(db, `exams/${code}/definition`), snap => {
    cb((snap.val() as Exam | null) ?? null)
  })
}

// ── Fremdrift (elevene som er i gang) ───────────────────────────────────────

export type ExamProgressStatus = 'pagar' | 'levert' | 'tid-ute'

export interface ExamProgress {
  studentId: string
  studentName: string
  startedAt: string
  answeredCount: number
  totalQuestions: number
  status: ExamProgressStatus
  /** Hvilken versjon av prøva eleven startet på. */
  examVersion?: number
}

/**
 * Eleven melder seg på når prøven starter. Erstatter localStorage-skrivingen
 * som lå i ExamSession. Idempotent — starter eleven på nytt, beholdes
 * opprinnelig starttidspunkt.
 */
export async function registerExamStart(
  code: string,
  studentName: string,
  opts: { totalQuestions: number; examVersion?: number },
): Promise<string> {
  const sid = examStudentId(studentName)
  const node = ref(db, `exams/${code}/progress/${sid}`)
  const fra_for = (await get(node)).val() as ExamProgress | null
  await set(node, deepClean<Omit<ExamProgress, 'studentId'>>({
    studentName,
    startedAt: fra_for?.startedAt ?? new Date().toISOString(),
    answeredCount: fra_for?.answeredCount ?? 0,
    totalQuestions: opts.totalQuestions,
    status: 'pagar',
    examVersion: opts.examVersion,
  }))
  return sid
}

/**
 * Oppdater hvor mange spørsmål eleven har besvart. Kalles ÉN gang per spørsmål
 * som går fra ubesvart til besvart — ikke på timer eller intervall. Skriver
 * aldri selve svaret.
 */
export async function updateExamProgress(
  code: string,
  studentName: string,
  answeredCount: number,
): Promise<void> {
  const sid = examStudentId(studentName)
  await update(ref(db, `exams/${code}/progress/${sid}`), { answeredCount })
}

/** Marker eleven som ferdig. `tid-ute` når prøven ble levert automatisk. */
export async function markExamProgressDone(
  code: string,
  studentName: string,
  status: Exclude<ExamProgressStatus, 'pagar'>,
  answeredCount: number,
): Promise<void> {
  const sid = examStudentId(studentName)
  await update(ref(db, `exams/${code}/progress/${sid}`), { status, answeredCount })
}

/** Lærerens live-liste over elever som har startet. */
export function subscribeToExamProgress(
  code: string,
  cb: (list: ExamProgress[]) => void,
): () => void {
  return onValue(ref(db, `exams/${code}/progress`), snap => {
    const val = snap.val() as Record<string, Omit<ExamProgress, 'studentId'>> | null
    if (!val) { cb([]); return }
    const list: ExamProgress[] = Object.entries(val).map(([studentId, p]) => ({
      studentId,
      studentName: p.studentName,
      startedAt: p.startedAt,
      answeredCount: p.answeredCount ?? 0,
      totalQuestions: p.totalQuestions ?? 0,
      status: p.status ?? 'pagar',
      examVersion: p.examVersion,
    }))
    list.sort((a, b) => a.startedAt.localeCompare(b.startedAt))
    cb(list)
  })
}

// ── Innleveringer ───────────────────────────────────────────────────────────

/** Elevens innlevering. Én entry per elev; ny innlevering overskriver. */
export async function submitExamAnswers(
  code: string,
  submission: ExamSubmission,
): Promise<void> {
  const sid = examStudentId(submission.studentName)
  await set(ref(db, `exams/${code}/submissions/${sid}`), deepClean(submission))
}

/** Lærerens live-abonnement på innleveringene. */
export function subscribeToExamSubmissions(
  code: string,
  cb: (list: ExamSubmission[]) => void,
): () => void {
  return onValue(ref(db, `exams/${code}/submissions`), snap => {
    const val = snap.val() as Record<string, ExamSubmission> | null
    if (!val) { cb([]); return }
    const list = Object.values(val).map(s => ({
      ...s,
      answers: s.answers ?? [],
      suspiciousActivity: s.suspiciousActivity ?? [],
    }))
    list.sort((a, b) => (a.submittedAt ?? '').localeCompare(b.submittedAt ?? ''))
    cb(list)
  })
}

/** Lærerens manuelle poeng på kortsvar/case. Skrives tilbake til innleveringen. */
export async function saveManualScores(
  code: string,
  studentName: string,
  manualScores: NonNullable<ExamSubmission['manualScores']>,
): Promise<void> {
  const sid = examStudentId(studentName)
  await update(ref(db, `exams/${code}/submissions/${sid}`), { manualScores: deepClean(manualScores) })
}
