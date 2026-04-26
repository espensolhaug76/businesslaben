/**
 * Cross-skole leaderboard — Firebase-hjelpere og typer.
 *
 * GDPR-kritisk:
 *  - Skriv ALDRI individuelle elevnavn eller individuelle svar til /shared_competitions.
 *  - Kun klasse-aggregerte tall (snitt, antall) lagres her.
 *  - Hver klasse har én entry per konkurranse — ny innsending overskriver tidligere.
 */
import { ref, set, get, remove, onValue, serverTimestamp } from 'firebase/database'
import { db } from './firebase'

export interface CompetitionMeta {
  id: string                 // slugified title
  title: string              // f.eks. quiz-spørsmålet
  subject: string            // fagkode (ssr_fd_vg1, ml1, …) — eller '' hvis ukjent
  createdAt: number
  createdBy: string          // skolenavn til den som skapte konkurransen
}

export interface CompetitionParticipant {
  entryId: string            // klassekode (sanitert) — én entry per klasse
  className: string
  schoolName: string
  teacherName?: string       // valgfritt
  classroomCode: string      // beholdt for sanity-check
  averageScore: number       // 0–100
  studentCount: number
  completedAt: number
}

/** Rens streng for Firebase-key-bruk. */
function sanitizeKey(s: string): string {
  return s.replace(/[.#$/\[\]]/g, '_')
}

/** Lag deterministisk competition-ID fra tittel slik at klasser på tvers konkurrerer. */
export function slugifyTitle(title: string): string {
  return sanitizeKey(
    title.toLowerCase()
      .replace(/[æå]/g, 'a')
      .replace(/ø/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60),
  ) || 'untitled'
}

/**
 * Skriv klassens aggregerte resultat til en delt konkurranse.
 * Oppretter konkurranse-meta hvis den ikke finnes.
 * Overskriver eksisterende entry for samme klassekode.
 */
export async function submitResult(args: {
  title: string
  subject: string
  schoolName: string
  className: string
  teacherName?: string
  classroomCode: string
  averageScore: number
  studentCount: number
}): Promise<{ competitionId: string; entryId: string }> {
  const competitionId = slugifyTitle(args.title)
  const entryId = sanitizeKey(args.classroomCode)

  // Opprett meta hvis ikke finnes (idempotent — set() med eksisterende key er trygt
  // å gjenta så lenge feltene er stabile).
  const metaRef = ref(db, `shared_competitions/${competitionId}/meta`)
  const snap = await get(metaRef)
  if (!snap.exists()) {
    const meta: Omit<CompetitionMeta, 'id'> = {
      title: args.title,
      subject: args.subject,
      createdAt: Date.now(),
      createdBy: args.schoolName || 'Ukjent skole',
    }
    await set(metaRef, meta)
  }

  const participant: Omit<CompetitionParticipant, 'entryId'> = {
    className: args.className,
    schoolName: args.schoolName || 'Ukjent skole',
    teacherName: args.teacherName?.trim() || undefined,
    classroomCode: args.classroomCode,
    averageScore: Math.max(0, Math.min(100, Math.round(args.averageScore))),
    studentCount: Math.max(0, Math.round(args.studentCount)),
    completedAt: Date.now(),
  }
  // Strip undefined-felter så Firebase ikke krasjer
  const cleaned: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(participant)) {
    if (v !== undefined) cleaned[k] = v
  }
  await set(ref(db, `shared_competitions/${competitionId}/participants/${entryId}`), cleaned)
  // Bumper updatedAt slik at lista kan sortere på sist aktive
  await set(ref(db, `shared_competitions/${competitionId}/meta/updatedAt`), serverTimestamp())

  return { competitionId, entryId }
}

/** Slett en klasses entry fra en konkurranse. */
export async function deleteParticipation(competitionId: string, entryId: string): Promise<void> {
  await remove(ref(db, `shared_competitions/${competitionId}/participants/${entryId}`))
}

/** Subscribe til alle konkurranse-meta. Returnerer unsubscribe. */
export function subscribeToCompetitions(cb: (list: CompetitionMeta[]) => void): () => void {
  return onValue(ref(db, 'shared_competitions'), snap => {
    const val = snap.val() as Record<string, { meta?: Omit<CompetitionMeta, 'id'> & { updatedAt?: number } }> | null
    if (!val) { cb([]); return }
    const list: CompetitionMeta[] = Object.entries(val)
      .filter(([, v]) => v?.meta?.title)
      .map(([id, v]) => ({
        id,
        title: v.meta!.title,
        subject: v.meta!.subject ?? '',
        createdAt: v.meta!.createdAt ?? 0,
        createdBy: v.meta!.createdBy ?? '',
      }))
    list.sort((a, b) => b.createdAt - a.createdAt)
    cb(list)
  })
}

/** Subscribe til deltakerne i én konkurranse. Returnerer unsubscribe. */
export function subscribeToParticipants(
  competitionId: string,
  cb: (list: CompetitionParticipant[]) => void,
): () => void {
  return onValue(ref(db, `shared_competitions/${competitionId}/participants`), snap => {
    const val = snap.val() as Record<string, Omit<CompetitionParticipant, 'entryId'>> | null
    if (!val) { cb([]); return }
    const list: CompetitionParticipant[] = Object.entries(val).map(([entryId, p]) => ({
      entryId,
      ...p,
    }))
    list.sort((a, b) => b.averageScore - a.averageScore || a.completedAt - b.completedAt)
    cb(list)
  })
}
