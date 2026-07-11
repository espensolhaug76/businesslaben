// ─── TEMAER (tema-fundament, KODEKART steg 1) ────────────────────────────────
// Tunbar katalog over TEMA-er som en lærer kan aktivere per klasse (VG1/VG2).
// Aktiveringen lever i Firebase RTDB: klasser/{klassekode}/temaAktivering/{temaId}
// = { aktiv: boolean, nivaa: 'vg1' | 'vg2' } — skrives fra «Spillet»-fanen i
// TeacherDashboard og leses av spillklienten (GameContext abonnerer).
//
// Selve tema-INNHOLDET (hub-moduler, hendelser, oppgaver) kommer i egne jobber;
// her definerer vi kun METADATA + hvilke hub-moduler temaet peker på.

export type TemaNivaa = 'vg1' | 'vg2'

/** Definisjon av ett tema (metadata + hub-modul-referanser). */
export interface TemaDef {
  id: string
  navn: string
  /** Hvilke nivåer temaet finnes for (styrer vg1/vg2-velgeren i læreren). */
  nivaaer: TemaNivaa[]
  /** teacherModuleRegistry-id-er (TEACHER_MODULE_PHASES-nøkler = rute-stier) som
   *  temaet henter hub-innhold fra. Fylles ut når innholdet bygges. */
  hubModulRefs: string[]
  beskrivelse: string
}

/** Aktiveringstilstand for ett tema i én klasse (RTDB-nodens verdi). */
export interface TemaAktivering {
  aktiv: boolean
  nivaa: TemaNivaa
}

// ── Registeret ────────────────────────────────────────────────────────────────
export const TEMAER: TemaDef[] = [
  {
    id: 'beredskap',
    navn: 'Beredskap',
    nivaaer: ['vg1', 'vg2'],
    // VG1 (Forretningsdrift: beredskap) + VG2 (HMS: beredskap). Innhold i egen jobb.
    hubModulRefs: [
      '/learning/forretningsdrift/contingency',
      '/learning/vg2/hms/beredskap',
    ],
    beskrivelse: 'Kriseberedskap og beredskapsplaner — håndtering av uventede ' +
      'hendelser i bedriften. Innhold bygges i egen jobb; her kun definisjon.',
  },
]

const TEMA_BY_ID: Record<string, TemaDef> = Object.fromEntries(TEMAER.map(t => [t.id, t]))
export const temaById = (id: string): TemaDef | undefined => TEMA_BY_ID[id]
