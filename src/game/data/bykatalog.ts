// ─── BYKATALOGEN — byens aktiviteter og tilbud (delt datakilde) ──────────────
// Spor C DEL 4/4b. Byen som VERTSKAPSARENA: den delte kilden hotellets
// gjestescenarier anbefaler fra, og som (ved merge) også skal drive reiseliv-
// temaets pakkebygger. Alle oppføringer er FIKTIVE (aldri ekte navn), skalert til
// en Lillehammer-klasse småby (VERDENSMODELL som ramme).
//
// KOMPATIBILITET MED PAKKEBYGGEREN (spor-a/tema-reiseliv, IKKE merget): feltnavna
// `id`/`navn`/`beskrivelse`/`varighet`/`prisklasse`/`egenskaper` er IDENTISKE med
// reiseliv-grenens `Opplevelse`, så pakkebyggeren kan pekes HIT ved merge uten å
// røre A-grenen (defensiv kobling — dokumentert i docs/rapporter/spor-c.md).
// `egenskaper` er et SUPERSETT: mandatets behovs-tagger PLUSS A-grenens synonymer
// (`familie` ≈ barnevennlig, `natur` ≈ uteliv) så pakkebyggerens profil-matching
// (`liker: ['familie','natur',…]`) fortsatt treffer. Utvidelser utover A-grenen:
// `sesong`, `kategori`, `bookbar`, `provisjonsProsent`.

/** Behovs-tagger (mandatet) + A-grenens synonymer (`familie`,`natur`) for
 *  pakkebygger-kompatibilitet. */
export type ByTag =
  | 'barnevennlig' | 'aktiv' | 'rolig' | 'kultur' | 'mat' | 'uteliv'
  | 'tilgjengelig' | 'kort-tid' | 'heldag'
  | 'familie' | 'natur'   // A-grenens synonymer (barnevennlig / uteliv)

export type BySesong = 'helår' | 'vinter' | 'sommer'
/** aktivitet = byens tilbud (bookbart, gir provisjon). hotell = hotellets EGNE
 *  tilbud (egen omsetning, INGEN provisjon). partner = elevens kafé o.l. */
export type ByKategori = 'aktivitet' | 'hotell' | 'partner'

export interface ByTilbud {
  id: string
  navn: string
  beskrivelse: string
  /** Timer (A-grenens `Opplevelse.varighet`). */
  varighet: number
  /** 1 = rimelig, 3 = dyrt (A-grenens `prisklasse`). */
  prisklasse: 1 | 2 | 3
  sesong: BySesong
  /** Behovs-tagger (superset — se ByTag). Samme feltnavn som A-grenens `egenskaper`. */
  egenskaper: ByTag[]
  kategori: ByKategori
  /** DEL 4b: kan hotellet booke det for gjesten? Hotellets egne tilbud = false. */
  bookbar: boolean
  /** DEL 4b: formidlingsprovisjon i % (tunbar; 10–20 % variasjon MELLOM tilbydere
   *  — noen gir mer enn andre, det er poenget). Hotellets egne tilbud + gratis/
   *  ikke-bookbare = 0. */
  provisjonsProsent: number
  /** Grov pris i kr (for provisjonsberegning + «koster N kr»-følelse). */
  pris: number
}

// Provisjon MELLOM tilbydere varierer bevisst (10–20 %). Fjellstien/torghandelen/
// akebakken er GRATIS/ikke-bookbare (provisjon 0) — de er ofte BEST for gjesten,
// men gir hotellet ingenting: kjernen i provisjons-spenningen (DEL 4b c).
export const BYKATALOG: ByTilbud[] = [
  // ── Aktiviteter (bookbare der det gir mening) ──────────────────────────────
  { id: 'utsiktspunktet', navn: 'Utsiktsheisen', beskrivelse: 'Stolheis opp til byfjellets topp med utsikt over hele dalen.',
    varighet: 2, prisklasse: 2, sesong: 'helår', egenskaper: ['uteliv', 'natur', 'rolig', 'tilgjengelig', 'kort-tid'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 15, pris: 220 },
  { id: 'bymuseum', navn: 'Bymuseet', beskrivelse: 'Byens historie under ett tak — smått, trivelig og lett å gå i.',
    varighet: 2, prisklasse: 1, sesong: 'helår', egenskaper: ['kultur', 'rolig', 'tilgjengelig', 'kort-tid'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 12, pris: 140 },
  { id: 'kunstgalleri', navn: 'Kunstgalleriet', beskrivelse: 'Skiftende utstillinger av lokale og tilreisende kunstnere.',
    varighet: 2, prisklasse: 1, sesong: 'helår', egenskaper: ['kultur', 'rolig', 'tilgjengelig'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 10, pris: 120 },
  { id: 'klatrepark', navn: 'Klatreparken', beskrivelse: 'Klatreløyper i trærne for store og små — full fart og litt spenning.',
    varighet: 3, prisklasse: 2, sesong: 'sommer', egenskaper: ['aktiv', 'barnevennlig', 'familie', 'uteliv', 'natur', 'heldag'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 18, pris: 320 },
  { id: 'badeland', navn: 'Badelandet', beskrivelse: 'Sklier og bassenger innendørs — en fulltreffer for barna uansett vær.',
    varighet: 3, prisklasse: 2, sesong: 'helår', egenskaper: ['barnevennlig', 'familie', 'aktiv', 'tilgjengelig'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 15, pris: 260 },
  { id: 'kanefart', navn: 'Kanefart', beskrivelse: 'Rolig hesteskyss i pledd langs den islagte elva — kort og koselig.',
    varighet: 1, prisklasse: 2, sesong: 'vinter', egenskaper: ['rolig', 'barnevennlig', 'familie', 'uteliv', 'natur', 'kort-tid'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 20, pris: 240 },
  { id: 'fjellsti', navn: 'Fjellstien', beskrivelse: 'Merket, gratis tursti opp til utsiktspunktet — går man selv, når man vil.',
    varighet: 4, prisklasse: 1, sesong: 'sommer', egenskaper: ['aktiv', 'uteliv', 'natur', 'heldag', 'barnevennlig', 'familie'], kategori: 'aktivitet', bookbar: false, provisjonsProsent: 0, pris: 0 },
  { id: 'gagate-vandring', navn: 'Gågate-vandringen', beskrivelse: 'Guidet rusletur gjennom den gamle bykjernen — rolig og lærerikt.',
    varighet: 1, prisklasse: 1, sesong: 'helår', egenskaper: ['kultur', 'rolig', 'tilgjengelig', 'kort-tid'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 10, pris: 100 },
  { id: 'gardsbesok', navn: 'Gårdsbesøket', beskrivelse: 'Dyr å klappe og gårdsmat å smake, i rolig tempo — trygt for de minste.',
    varighet: 2, prisklasse: 1, sesong: 'helår', egenskaper: ['barnevennlig', 'familie', 'rolig', 'mat', 'uteliv'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 8, pris: 150 },
  { id: 'torghandel', navn: 'Torghandelen', beskrivelse: 'Lokale råvarer og håndverk på torget — helgemarked, gratis å vandre i.',
    varighet: 1, prisklasse: 1, sesong: 'helår', egenskaper: ['mat', 'kultur', 'rolig', 'kort-tid', 'tilgjengelig'], kategori: 'aktivitet', bookbar: false, provisjonsProsent: 0, pris: 0 },
  { id: 'lokalbryggeri', navn: 'Bryggeriomvisningen', beskrivelse: 'Omvisning og smaksprøver på det lille lokale bryggeriet (18+).',
    varighet: 2, prisklasse: 2, sesong: 'helår', egenskaper: ['mat', 'kultur'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 18, pris: 280 },
  { id: 'kirkekonsert', navn: 'Kirkekonserten', beskrivelse: 'Stemningsfull kveldskonsert i den gamle trekirka.',
    varighet: 2, prisklasse: 1, sesong: 'helår', egenskaper: ['kultur', 'rolig', 'tilgjengelig', 'kort-tid'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 12, pris: 160 },
  { id: 'akebakken', navn: 'Akebakken', beskrivelse: 'Lang, gratis akebakke med utlånskjelker — ren vinterglede for hele familien.',
    varighet: 2, prisklasse: 1, sesong: 'vinter', egenskaper: ['barnevennlig', 'familie', 'aktiv', 'uteliv', 'natur', 'kort-tid'], kategori: 'aktivitet', bookbar: false, provisjonsProsent: 0, pris: 0 },
  { id: 'elvepadling', navn: 'Elvepadlingen', beskrivelse: 'Guidet kajakktur på den rolige elva nedenfor byen (fra 12 år).',
    varighet: 4, prisklasse: 2, sesong: 'sommer', egenskaper: ['aktiv', 'uteliv', 'natur', 'heldag'], kategori: 'aktivitet', bookbar: true, provisjonsProsent: 18, pris: 340 },

  // ── Hotellets EGNE tilbud (egen omsetning, INGEN provisjon) ─────────────────
  { id: 'hotell-frokost', navn: 'Frokostbuffet (hotellet)', beskrivelse: 'Rikholdig frokost i hotellets spisesal — rolig start på dagen.',
    varighet: 1, prisklasse: 1, sesong: 'helår', egenskaper: ['mat', 'rolig', 'tilgjengelig', 'kort-tid'], kategori: 'hotell', bookbar: false, provisjonsProsent: 0, pris: 195 },
  { id: 'hotell-spa', navn: 'Hotellets spa', beskrivelse: 'Basseng, badstue og massasje i hotellets egen spa-avdeling.',
    varighet: 3, prisklasse: 3, sesong: 'helår', egenskaper: ['rolig', 'tilgjengelig'], kategori: 'hotell', bookbar: false, provisjonsProsent: 0, pris: 690 },
  { id: 'hotell-restaurant', navn: 'Hotellrestauranten', beskrivelse: 'Kortreist meny og pen anretning i hotellets restaurant om kvelden.',
    varighet: 2, prisklasse: 3, sesong: 'helår', egenskaper: ['mat', 'rolig'], kategori: 'hotell', bookbar: false, provisjonsProsent: 0, pris: 540 },

  // ── Partner: elevens kafé ──────────────────────────────────────────────────
  { id: 'elev-kafe', navn: 'Kaféen din', beskrivelse: 'Elevens egen kafé i sentrum — kaffe og ferske bakervarer, kort vei innom.',
    varighet: 1, prisklasse: 1, sesong: 'helår', egenskaper: ['mat', 'rolig', 'kort-tid', 'tilgjengelig'], kategori: 'partner', bookbar: false, provisjonsProsent: 0, pris: 90 },
]

const BY_ID: Record<string, ByTilbud> = Object.fromEntries(BYKATALOG.map(t => [t.id, t]))
export const byTilbudById = (id: string): ByTilbud | undefined => BY_ID[id]

/** Hvor mange av `oensket`-taggene tilbudet dekker (behovstreff, 0..oensket.length). */
export function tagTreff(tilbud: ByTilbud, oensket: ByTag[]): number {
  return oensket.filter(t => tilbud.egenskaper.includes(t)).length
}

/** Dekker tilbudet ALLE de ønskede taggene? (full behovstreff). */
export function dekkerBehov(tilbud: ByTilbud, oensket: ByTag[]): boolean {
  return oensket.every(t => tilbud.egenskaper.includes(t))
}

/** Provisjon i kr for en booking (avrundet). Ikke-bookbare/egne tilbud ⇒ 0. */
export function provisjonKr(tilbud: ByTilbud): number {
  if (!tilbud.bookbar || tilbud.provisjonsProsent <= 0) return 0
  return Math.round(tilbud.pris * tilbud.provisjonsProsent / 100)
}
