// ─── TEMAER (tema-fundament, KODEKART steg 1) ────────────────────────────────
// Tunbar katalog over TEMA-er som en lærer kan aktivere per klasse (VG1/VG2).
// Aktiveringen lever i Firebase RTDB: klasser/{klassekode}/temaAktivering/{temaId}
// = { aktiv: boolean, nivaa: 'vg1' | 'vg2' } — skrives fra «Spillet»-fanen i
// TeacherDashboard og leses av spillklienten (GameContext abonnerer).
//
// Selve tema-INNHOLDET (hub-moduler, hendelser, oppgaver) kommer i egne jobber;
// her definerer vi kun METADATA + hvilke hub-moduler temaet peker på.

import type { FagKode } from './fag'

export type TemaNivaa = 'vg1' | 'vg2'

/** Definisjon av ett tema (metadata + hub-modul-referanser). */
export interface TemaDef {
  id: string
  navn: string
  /** Programfaget temaet hører til (docs/TEMAER_OG_KOMPETANSEMAL.md). Er fagets
   *  bryter av (fagAktivering), regnes temaet som inaktivt uansett temaAktivering
   *  — det skjules i både lærerpanelet og spillet. */
  fag: FagKode
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
  /** Når true følger temaet «Elevenes nivå» fra klasselinja i stedet for et
   *  fast nivå. `nivaa` holdes uansett synkronisert med det gjeldende nivået,
   *  slik at spillklienten kan lese `nivaa` uendret. */
  folgerKlassen?: boolean
}

// ── Registeret ────────────────────────────────────────────────────────────────
export const TEMAER: TemaDef[] = [
  {
    id: 'beredskap',
    navn: 'Beredskap',
    fag: 'fd',   // HMS/beredskap ligger under Forretningsdrift (VG1) / HMS (VG2)
    nivaaer: ['vg1', 'vg2'],
    // VG1 (Forretningsdrift): Contingency + Risikovurdering.
    // VG2 (HMS): Beredskap + Brannvern + Risikoanalyse. Vises som «📚 Lær mer»
    // i HMS-fanen per nivå (se HUB_LENKER i data/beredskap.ts).
    hubModulRefs: [
      '/learning/forretningsdrift/contingency',
      '/learning/forretningsdrift/risikovurdering',
      '/learning/vg2/hms/beredskap',
      '/learning/vg2/hms/brannvern',
      '/learning/vg2/hms/risikoanalyse',
    ],
    beskrivelse: 'Kriseberedskap og beredskapsplaner — håndtering av uventede ' +
      'hendelser i bedriften. Innhold bygges i egen jobb; her kun definisjon.',
  },
  {
    id: 'budsjett',
    navn: 'Budsjett og avvik',
    fag: 'fd',
    nivaaer: ['vg1', 'vg2'],
    // VG1: enkelt budsjett + «traff du planen?». VG2: i tillegg avvikskommentar.
    // Hub: VG1 Budsjettering · VG2 Regnskapsanalyse (se HUB_LENKER i data/budsjett.ts).
    hubModulRefs: [
      '/learning/forretningsdrift/budgeting',
      '/learning/vg2/okonomi/regnskapsanalyse',
    ],
    beskrivelse: 'Sett opp et enkelt budsjett for neste måned og sammenlign med ' +
      'de faktiske tallene i månedsoppgjøret. VG2 kommenterer avvikene.',
  },
  {
    id: 'nokkeltall',
    navn: 'Nøkkeltall og lønnsomhet',
    fag: 'fd',
    nivaaer: ['vg2'],   // KUN VG2 — VG1 skal aldri se nøkkeltall (LK20-nivåregel)
    // Hub: VG2 Nøkkeltall/lønnsomhet · Pris og kalkulasjon.
    hubModulRefs: [
      '/learning/vg2/okonomi/nokkeltall-lonnsomhet',
      '/learning/vg2/okonomi/pris-og-kalkulasjon',
    ],
    beskrivelse: 'Eleven regner selv ut bruttofortjeneste, dekningsgrad og ' +
      'resultatgrad og sammenligner med de bokførte tallene. Kun VG2.',
  },
  {
    id: 'kampanje',
    navn: 'Kampanje og markedsplan',
    fag: 'm',
    nivaaer: ['vg1', 'vg2'],
    // VG1: enkel markedsplan + kampanje med begrunnelse. VG2: ROI + A/B.
    // Hub: Markedsplan · Kommunikasjonskanaler · Markedsføringsloven · (VG2)
    // Markedsføringskampanjer. Kanal×segment-tabellen bor i hub-en, aldri i spillet.
    hubModulRefs: [
      '/learning/mfi/markedsplan',
      '/learning/mfi/kommunikasjon-kanaler',
      '/learning/mfi/markedsforingsloven',
      '/learning/vg2/kommunikasjon/markedsforingskampanjer',
    ],
    beskrivelse: 'Eleven planlegger en markedsføringskampanje (mål, målgruppe, ' +
      'kanal, budsjett, periode) i Markedsføring-fanen og evaluerer effekten etterpå. ' +
      'Salgskampanje-varianten håndhever førpris-regelen.',
  },
  {
    id: 'reiseliv',
    navn: 'Reiseliv og vertskap',
    fag: 'ks',
    nivaaer: ['vg1', 'vg2'],
    // VG1: vertskapsrollen + kulturforståelse i kundemøter. VG2: reiselivsprodukt
    // + internasjonale markeder (light). Aktivering slår på TURISTSESONG (egne
    // turist-scenarier + turistkontor/hotell i sentrum). Hub-lenker per nivå.
    hubModulRefs: [
      '/learning/kultur/vertskapsrollen',
      '/learning/kultur/kulturforstaelse',
      '/learning/vg2/kommunikasjon/reiselivsprodukt',
      '/learning/vg2/kommunikasjon/internasjonale-markeder',
    ],
    beskrivelse: 'Turistsesong med egne kundetyper (turister) og vertskaps-scenarier: ' +
      'språkbarriere, kulturforståelse, anbefale lokale opplevelser, tax-free. ' +
      'Turistkontoret og byhotellet i sentrum gir sesongprognose og en B2B-gjestepakke.',
  },
]

const TEMA_BY_ID: Record<string, TemaDef> = Object.fromEntries(TEMAER.map(t => [t.id, t]))
export const temaById = (id: string): TemaDef | undefined => TEMA_BY_ID[id]
