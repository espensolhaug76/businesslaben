/**
 * Teacher subject options + backward-compat mapping for legacy IDs.
 *
 * Used by TeacherDashboard (klasseopprettelse, fag-pill) og LiveOktTab
 * (auto-filtrering av presentasjonsliste).
 */

export interface MineFagOption {
  id: string
  label: string
  short: string
  lessonSubject: string | null   // maps to Lesson['subject']
  moduleKey: string | null       // ssrSubject for SSR-fag, eller `${subject}-${level}` for ML/ENT
  sporsmalFag: string | null
}

export const MINE_FAG_OPTIONS: MineFagOption[] = [
  // VG1 SSR
  { id: 'ssr_fd_vg1', label: 'Forretningsdrift VG1 (SSR-FD)',          short: 'SSR-FD',  lessonSubject: 'ssr_fd', moduleKey: 'forretningsdrift-vg1', sporsmalFag: 'forretningsdrift' },
  { id: 'ssr_mi_vg1', label: 'Markedsføring og innovasjon VG1 (SSR-MI)', short: 'SSR-MI', lessonSubject: 'ssr_mi', moduleKey: 'mfi-vg1',              sporsmalFag: 'mfi' },
  { id: 'ssr_ks_vg1', label: 'Kultur og samhandling VG1 (SSR-KS)',     short: 'SSR-KS',  lessonSubject: 'ssr_ks', moduleKey: 'kultur-vg1',           sporsmalFag: 'kultur' },
  // VG2 SSR (nye fagnavn fra SSR02-01)
  { id: 'ok_vg2',  label: 'Økonomi og administrasjon VG2',         short: 'ØK-VG2',  lessonSubject: null, moduleKey: 'okonomi',       sporsmalFag: 'okonomi' },
  { id: 'kom_vg2', label: 'Kommunikasjon og markedsføring VG2',    short: 'KOM-VG2', lessonSubject: null, moduleKey: 'kommunikasjon', sporsmalFag: 'kommunikasjon' },
  { id: 'hms_vg2', label: 'Helse, miljø og sikkerhet VG2',         short: 'HMS-VG2', lessonSubject: null, moduleKey: 'hms',           sporsmalFag: 'hms' },
  // VG2/VG3 studiespesialisering
  { id: 'ml1',  label: 'Markedsføring og ledelse 1 (ML1)', short: 'ML1',  lessonSubject: 'mfl1', moduleKey: 'ml1-vg2', sporsmalFag: 'ml1' },
  { id: 'ml2',  label: 'Markedsføring og ledelse 2 (ML2)', short: 'ML2',  lessonSubject: null,   moduleKey: 'ml-vg3',  sporsmalFag: null },
  { id: 'ent1', label: 'Entreprenørskap 1 (ENT1)',         short: 'ENT1', lessonSubject: 'ent1', moduleKey: 'ent-vg2', sporsmalFag: null },
  { id: 'ent2', label: 'Entreprenørskap 2 (ENT2)',         short: 'ENT2', lessonSubject: null,   moduleKey: 'ent-vg3', sporsmalFag: null },
]

/** Map gamle VG2 SSR-IDer til nye. Brukes ved lesing — ingen Firebase-migrasjon. */
export const LEGACY_SUBJECT_MAP: Record<string, string> = {
  fd_vg2:  'ok_vg2',
  inn_vg2: 'kom_vg2',
  kul_vg2: 'hms_vg2',
}

/** Normaliser legacy fag-IDer til gjeldende skjema. */
export function normalizeSubjectId(id: string | null | undefined): string {
  if (!id) return ''
  return LEGACY_SUBJECT_MAP[id] ?? id
}

/**
 * Map fag-ID → seksjonsnøkkel som matcher PRESENTATION_SECTIONS.
 * Returner null hvis IDen ikke har en åpenbar default-seksjon.
 */
export function subjectToSectionKey(id: string | null | undefined): string | null {
  const normalized = normalizeSubjectId(id)
  const m: Record<string, string> = {
    ssr_fd_vg1: 'vg1|ssr|forretningsdrift',
    ssr_mi_vg1: 'vg1|ssr|mfi',
    ssr_ks_vg1: 'vg1|ssr|kultur',
    ok_vg2:     'vg2|ssr|okonomi',
    kom_vg2:    'vg2|ssr|kommunikasjon',
    hms_vg2:    'vg2|ssr|hms',
    ml1:        'vg2|ml|',
    ml2:        'vg3|ml|',
    ent1:       'vg2|ent|',
    ent2:       'vg3|ent|',
  }
  return m[normalized] ?? null
}
