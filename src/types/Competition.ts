// ── Competition types ──────────────────────────────────────────────────────────

export interface Competition {
  id: string
  title: string
  code: string
  questions: CompetitionQuestion[]
  status: 'waiting' | 'active' | 'question_active' | 'showing_results' | 'finished'
  currentQuestionIndex: number
  createdAt: string
  canRepeat: boolean
  /** Fag-ID fra MINE_FAG_OPTIONS (ssr_fd_vg1, ml1, ent2, …). Tom = ufaget. */
  subject?: string
  /** Opt-in: del klassens snitt på nasjonalt leaderboard når runet er ferdig. */
  shareToLeaderboard?: boolean
  /** True for de 24 ferdiglagde standardkonkurransene (kode-prefikset «std-»). */
  isStandard?: boolean
  /** Hvis denne konkurransen er en lærer-instans av en standardkonkurranse, peker
   *  dette til kilde-IDen («std-…»). Brukes for å samle cross-school leaderboard
   *  på tvers av alle lærer-instanser. */
  standardParentId?: string
}

export interface CompetitionQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  timeSeconds: number
  /** Fag-ID som spørsmålet hører til. Ennå ikke utfylt for QUESTION_BANK. */
  subject?: string
  /** Vanskelighetsgrad — kun satt for standardkonkurranser. */
  difficulty?: 'lett' | 'middels' | 'vanskelig'
  /** Pedagogisk forklaring som vises etter at riktig svar er avslørt. */
  explanation?: string
}

export interface PlayerEntry {
  competitionId: string
  runId: string
  studentName: string
  className: string
  totalPoints: number
  answers: PlayerAnswer[]
}

export interface PlayerAnswer {
  questionId: string
  answer: number
  timeUsed: number
  points: number
}

export interface CompetitionRun {
  runId: string
  competitionId: string
  code: string
  status: 'waiting' | 'question_active' | 'showing_results' | 'finished'
  currentQuestionIndex: number
  questionStartedAt: string | null
  timeSeconds: number
}

export interface RunHistory {
  runId: string
  completedAt: string
  entries: PlayerEntry[]
}

// ── Storage keys ───────────────────────────────────────────────────────────────

export function competitionsKey(): string {
  return 'adventure-competitions'
}

export function competitionRunKey(code: string): string {
  return `adventure-competition-run-${code}`
}

export function competitionEntriesKey(runId: string): string {
  return `adventure-competition-entries-${runId}`
}

export function competitionHistoryKey(code: string): string {
  return `adventure-competition-history-${code}`
}

// ── Scoring ────────────────────────────────────────────────────────────────────

export function calcPoints(correct: boolean, timeUsed: number): number {
  if (!correct) return 0
  return Math.max(0, 1000 - Math.round(timeUsed * 20))
}

// ── Question bank ──────────────────────────────────────────────────────────────

export const QUESTION_BANK: CompetitionQuestion[] = [
  { id: 'q1', question: 'Hva er de 5 P-ene i markedsføringsmiksen?', options: ['Produkt, Pris, Plass, Påvirkning, Personale', 'Plan, Pris, Produkt, Profitt, People', 'Produkt, Pris, Profitt, Sted, Salg', 'Pris, Posisjon, Påvirkning, Plan, Personale'], correct: 0, timeSeconds: 20 },
  { id: 'q2', question: 'Hva betyr dekningsbidrag?', options: ['Salgspris minus variable kostnader', 'Total omsetning', 'Fortjeneste etter skatt', 'Faste kostnader'], correct: 0, timeSeconds: 20 },
  { id: 'q3', question: 'Hvilken lov beskytter forbrukere ved netthandel?', options: ['Forbrukerkjøpsloven', 'Markedsføringsloven', 'Arbeidsmiljøloven', 'Bokføringsloven'], correct: 0, timeSeconds: 20 },
  { id: 'q4', question: 'Hva er Maslows behovspyramides øverste nivå?', options: ['Selvrealisering', 'Trygghet', 'Sosiale behov', 'Fysiologiske behov'], correct: 0, timeSeconds: 20 },
  { id: 'q5', question: 'Hva er USP?', options: ['Unique Selling Point', 'Universal Sales Plan', 'User Segment Profile', 'Unified Service Process'], correct: 0, timeSeconds: 20 },
  { id: 'q6', question: 'Hva er yield management?', options: ['Dynamisk prissetting basert på etterspørsel', 'Fast prissetting', 'Kostbasert prissetting', 'Rabattsystem'], correct: 0, timeSeconds: 20 },
  { id: 'q7', question: 'Hva kalles direkte salg uten mellomledd?', options: ['Direkte distribusjon', 'Intensiv distribusjon', 'Eksklusiv distribusjon', 'Selektiv distribusjon'], correct: 0, timeSeconds: 20 },
  { id: 'q8', question: 'Hva er Triple Bottom Line?', options: ['People, Planet, Profit', 'Price, Product, Place', 'Plan, Process, Profit', 'People, Price, Place'], correct: 0, timeSeconds: 20 },
  { id: 'q9', question: 'Hva betyr grønnvasking?', options: ['Falske miljøpåstander i markedsføring', 'Miljøvennlig produksjon', 'Grønn emballasje', 'Resirkulering av produkter'], correct: 0, timeSeconds: 20 },
  { id: 'q10', question: 'Hvilken modell beskriver kjøpsprosessen?', options: ['AIDA', 'SWOT', 'PEST', 'BCG'], correct: 0, timeSeconds: 20 },
  { id: 'q11', question: 'Hva er en tariffavtale?', options: ['Felles regler for lønn og arbeidsvilkår', 'En skatteavtale', 'En leverandøravtale', 'En markedsavtale'], correct: 0, timeSeconds: 20 },
  { id: 'q12', question: 'Hva betyr CSR?', options: ['Corporate Social Responsibility', 'Customer Sales Record', 'Cost and Sales Revenue', 'Creative Sales Ratio'], correct: 0, timeSeconds: 20 },
  { id: 'q13', question: 'Hva er Service Recovery Paradox?', options: ['Kunde som får løst klage blir mer lojal', 'God service = ingen klager', 'Klager er alltid negative', 'Service og salg er det samme'], correct: 0, timeSeconds: 20 },
  { id: 'q14', question: 'Hvilken lov gir 14 dagers angrerett ved netthandel?', options: ['Angrerettloven', 'Forbrukerkjøpsloven', 'Markedsføringsloven', 'Kjøpsloven'], correct: 0, timeSeconds: 20 },
  { id: 'q15', question: 'Hva er psykologisk prissetting?', options: ['Bruke priser som 199,- i stedet for 200,-', 'Sette pris basert på psykolog-råd', 'Gratis prøveperiode', 'Dynamisk prising'], correct: 0, timeSeconds: 20 },
  { id: 'q16', question: 'Hva er SWOT-analysens fire elementer?', options: ['Styrker, Svakheter, Muligheter, Trusler', 'Strategi, Vekst, Omsetning, Tid', 'Salg, Varer, Omsorg, Tid', 'System, Vekst, Organisasjon, Tid'], correct: 0, timeSeconds: 20 },
  { id: 'q17', question: 'Hva er en forretningsplan?', options: ['Skriftlig plan for bedriftens strategi og økonomi', 'Regnskap for bedriften', 'En markedsplan', 'Budsjett for neste år'], correct: 0, timeSeconds: 20 },
  { id: 'q18', question: 'Hva betyr bærekraftig utvikling?', options: ['Møter dagens behov uten å ødelegge for fremtiden', 'Kun fokus på økonomi', 'Teknologisk utvikling', 'Rask vekst'], correct: 0, timeSeconds: 20 },
  { id: 'q19', question: 'Hva er HMS?', options: ['Helse, Miljø og Sikkerhet', 'Human Management System', 'Handel, Marked og Service', 'Hjelp, Marked, Støtte'], correct: 0, timeSeconds: 20 },
  { id: 'q20', question: 'Hva er en organisasjonsstruktur?', options: ['Formell fordeling av roller og ansvar', 'Bedriftens logo og navn', 'Salgsstrategi', 'Markedsplan'], correct: 0, timeSeconds: 20 },
  { id: 'q21', question: 'Hva er nettverksmarkedsføring?', options: ['Salg gjennom personlige nettverk', 'Markedsføring på internett', 'Reklame på TV', 'E-postmarkedsføring'], correct: 0, timeSeconds: 20 },
  { id: 'q22', question: 'Hva er et verdiforslag?', options: ['Hva bedriften lover å levere til kunden', 'Prisen på produktet', 'Bedriftens misjon', 'Kundeservice'], correct: 0, timeSeconds: 20 },
  { id: 'q23', question: 'Hva er Customer Journey?', options: ['Kundens opplevelse fra behov til kjøp', 'Kundens reisemål', 'Leveringsrute', 'Kundekort'], correct: 0, timeSeconds: 20 },
  { id: 'q24', question: 'Hva er lojalitetsprogram?', options: ['Belønning for gjentatte kjøp', 'Rabatt ved første kjøp', 'Gratis frakt', 'Årsabonnement'], correct: 0, timeSeconds: 20 },
  { id: 'q25', question: 'Hva betyr segmentering?', options: ['Dele markedet inn i grupper', 'Sette en pris', 'Lage reklame', 'Bygge et team'], correct: 0, timeSeconds: 20 },
  { id: 'q26', question: 'Hva er verdikjeden?', options: ['Alle aktiviteter som skaper verdi for kunden', 'Leverandørenes nettverk', 'Priskjeden', 'Salgsprosessen'], correct: 0, timeSeconds: 20 },
  { id: 'q27', question: 'Hva er en konkurrentanalyse?', options: ['Analyse av konkurrenters styrker og svakheter', 'Analyse av egne styrker', 'Markedsanalyse', 'Prisanalyse'], correct: 0, timeSeconds: 20 },
  { id: 'q28', question: 'Hva er målgruppe?', options: ['Gruppen bedriften retter seg mot', 'Salgsbudsjett', 'Produktkategori', 'Leverandørgruppe'], correct: 0, timeSeconds: 20 },
  { id: 'q29', question: 'Hva er digital markedsføring?', options: ['Markedsføring via digitale kanaler', 'Papirreklame', 'TV-reklame', 'Telemarketing'], correct: 0, timeSeconds: 20 },
  { id: 'q30', question: 'Hva er en pitch?', options: ['Kort presentasjon av forretningsidé', 'Et salg', 'En kontrakt', 'En reklamasjonsklage'], correct: 0, timeSeconds: 20 },
]
