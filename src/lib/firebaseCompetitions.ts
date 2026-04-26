/**
 * Firebase-API for Konkurranser-systemet (Kahoot-stil 15-spørsmåls-konkurranse).
 *
 * Skjema:
 *  /competitions/{code}/
 *    definition          — Competition (uten run-state)
 *    currentRun          — { runId, currentQuestionIndex, status, questionStartedAt, timeSeconds }
 *    runs/{runId}/
 *      meta              — { startedAt, finishedAt }
 *      entries/{playerId} — { studentName, className, totalPoints, answers: { [qIdx]: PlayerAnswer } }
 *
 * Cross-device: alle deltakere snakker mot samme Firebase-noder, så lærer og
 * elever trenger ikke være på samme enhet (tidligere localStorage-only).
 *
 * Backward-compat: gamle konkurranser i localStorage kan migreres ved å kalle
 * saveCompetition() med dem (idempotent skriv).
 */
import { ref, set, get, update, onValue, serverTimestamp } from 'firebase/database'
import { db } from './firebase'
import type {
  Competition,
  CompetitionRun,
  PlayerAnswer,
  PlayerEntry,
} from '../types/Competition'

function clean<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v
  }
  return out
}

/** Sanitiser en string for bruk som Firebase-key. */
function sanitizeKey(s: string): string {
  return s.replace(/[.#$/\[\]]/g, '_')
}

/** Deterministisk player-id ut fra navn + klasse. */
export function playerId(studentName: string, className: string): string {
  return sanitizeKey(`${studentName.trim()}__${className.trim()}`) || 'ukjent'
}

// ── Definition ──────────────────────────────────────────────────────────────

/**
 * Skriv (eller overskriv) konkurransedefinisjonen til Firebase.
 * Idempotent — trygt å kalle for migrasjon.
 */
export async function saveCompetition(c: Competition): Promise<void> {
  await set(ref(db, `competitions/${c.code}/definition`), clean({
    id: c.id,
    title: c.title,
    code: c.code,
    questions: c.questions,
    createdAt: c.createdAt,
    canRepeat: c.canRepeat,
  }))
}

/** Hent konkurransedefinisjonen for én kode. */
export async function getCompetitionDefinition(code: string): Promise<Competition | null> {
  const snap = await get(ref(db, `competitions/${code}/definition`))
  return snap.val() as Competition | null
}

/** Subscribe til konkurransedefinisjonen (én kode). Returnerer unsubscribe. */
export function subscribeToCompetitionDefinition(
  code: string,
  cb: (c: Competition | null) => void,
): () => void {
  return onValue(ref(db, `competitions/${code}/definition`), snap => {
    cb(snap.val() as Competition | null)
  })
}

/** Subscribe til alle konkurranser. Returnerer unsubscribe. */
export function subscribeToAllCompetitions(cb: (list: Competition[]) => void): () => void {
  return onValue(ref(db, 'competitions'), snap => {
    const val = snap.val() as Record<string, { definition?: Competition }> | null
    if (!val) { cb([]); return }
    const list: Competition[] = Object.values(val)
      .map(v => v?.definition)
      .filter((c): c is Competition => Boolean(c?.code && Array.isArray(c.questions)))
    list.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
    cb(list)
  })
}

// ── Run state ───────────────────────────────────────────────────────────────

/** Start en ny runde — overskriver currentRun og oppretter runs/{runId}/meta. */
export async function startNewRun(
  code: string,
  competitionId: string,
  runId: string,
  timeSeconds: number,
): Promise<void> {
  await set(ref(db, `competitions/${code}/currentRun`), {
    runId,
    competitionId,
    code,
    status: 'waiting',
    currentQuestionIndex: 0,
    questionStartedAt: null,
    timeSeconds,
  })
  await set(ref(db, `competitions/${code}/runs/${runId}/meta/startedAt`), serverTimestamp())
}

/** Oppdater currentRun med en partial — typisk status/index/questionStartedAt. */
export async function updateCurrentRun(
  code: string,
  partial: Partial<CompetitionRun>,
): Promise<void> {
  await update(ref(db, `competitions/${code}/currentRun`), clean(partial as Record<string, unknown>))
}

/** Subscribe til currentRun for én kode. Returnerer unsubscribe. */
export function subscribeToCurrentRun(
  code: string,
  cb: (r: CompetitionRun | null) => void,
): () => void {
  return onValue(ref(db, `competitions/${code}/currentRun`), snap => {
    cb(snap.val() as CompetitionRun | null)
  })
}

/** Skriv finishedAt-timestamp på run-meta. Kalles når runet ender. */
export async function markRunFinished(code: string, runId: string): Promise<void> {
  await set(ref(db, `competitions/${code}/runs/${runId}/meta/finishedAt`), serverTimestamp())
}

// ── Entries (deltakere + svar) ──────────────────────────────────────────────

interface FirebaseEntry {
  studentName: string
  className: string
  totalPoints?: number
  answers?: Record<string, PlayerAnswer>
}

/** Registrer eleven på et run. Idempotent — overskriver eksisterende entry. */
export async function joinAsPlayer(
  code: string,
  runId: string,
  studentName: string,
  className: string,
): Promise<string> {
  const pid = playerId(studentName, className)
  await update(ref(db, `competitions/${code}/runs/${runId}/entries/${pid}`), clean({
    studentName,
    className,
    totalPoints: 0,
  }))
  return pid
}

/**
 * Skriv et svar + oppdater totalPoints atomisk.
 * qIdx blir Firebase-key (string) under entries/{pid}/answers/.
 */
export async function submitPlayerAnswer(
  code: string,
  runId: string,
  pid: string,
  qIdx: number,
  answer: PlayerAnswer,
  newTotalPoints: number,
): Promise<void> {
  await update(ref(db, `competitions/${code}/runs/${runId}/entries/${pid}`), {
    [`answers/${qIdx}`]: answer,
    totalPoints: newTotalPoints,
  })
}

/** Subscribe til alle entries i et run. Returnerer unsubscribe. */
export function subscribeToEntries(
  code: string,
  runId: string,
  cb: (entries: PlayerEntry[]) => void,
): () => void {
  return onValue(ref(db, `competitions/${code}/runs/${runId}/entries`), snap => {
    const val = snap.val() as Record<string, FirebaseEntry> | null
    if (!val) { cb([]); return }
    const list: PlayerEntry[] = Object.values(val).map(e => ({
      competitionId: code,
      runId,
      studentName: e.studentName,
      className: e.className,
      totalPoints: e.totalPoints ?? 0,
      answers: e.answers
        ? Object.entries(e.answers)
            .map(([k, a]) => ({ idx: parseInt(k, 10), a }))
            .sort((x, y) => x.idx - y.idx)
            .map(x => x.a)
        : [],
    }))
    cb(list)
  })
}

/** Hent én elevs entry (for sesjon-restore i Join-skjermen). */
export async function getPlayerEntry(
  code: string,
  runId: string,
  pid: string,
): Promise<PlayerEntry | null> {
  const snap = await get(ref(db, `competitions/${code}/runs/${runId}/entries/${pid}`))
  const e = snap.val() as FirebaseEntry | null
  if (!e) return null
  return {
    competitionId: code,
    runId,
    studentName: e.studentName,
    className: e.className,
    totalPoints: e.totalPoints ?? 0,
    answers: e.answers
      ? Object.entries(e.answers)
          .map(([k, a]) => ({ idx: parseInt(k, 10), a }))
          .sort((x, y) => x.idx - y.idx)
          .map(x => x.a)
      : [],
  }
}

// ── History (runs/*/meta) ────────────────────────────────────────────────────

export interface RunSummary {
  runId: string
  startedAt: number
  finishedAt: number | null
  entries: PlayerEntry[]
}

/** Subscribe til alle runs for én kode (inkludert pågående). */
export function subscribeToRuns(
  code: string,
  cb: (runs: RunSummary[]) => void,
): () => void {
  return onValue(ref(db, `competitions/${code}/runs`), snap => {
    const val = snap.val() as Record<string, {
      meta?: { startedAt?: number; finishedAt?: number | null }
      entries?: Record<string, FirebaseEntry>
    }> | null
    if (!val) { cb([]); return }
    const list: RunSummary[] = Object.entries(val).map(([runId, r]) => ({
      runId,
      startedAt: r.meta?.startedAt ?? 0,
      finishedAt: r.meta?.finishedAt ?? null,
      entries: r.entries
        ? Object.values(r.entries).map(e => ({
            competitionId: code,
            runId,
            studentName: e.studentName,
            className: e.className,
            totalPoints: e.totalPoints ?? 0,
            answers: e.answers
              ? Object.entries(e.answers)
                  .map(([k, a]) => ({ idx: parseInt(k, 10), a }))
                  .sort((x, y) => x.idx - y.idx)
                  .map(x => x.a)
              : [],
          }))
        : [],
    }))
    list.sort((a, b) => b.startedAt - a.startedAt)
    cb(list)
  })
}
