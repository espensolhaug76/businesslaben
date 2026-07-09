// ─── LÆRINGSLAGET — mentor-triggere (tunbar data) ─────────────────────────────
// Espens stemme: vennlig, direkte, aldri belærende. Hver melding er KORT (2–3
// setninger) og peker gjerne mot et fagord. `betingelse` er en HUMAN beskrivelse
// av når triggeren fyrer — selve sjekken ligger i Mentor.tsx (nøklet på id), så
// denne fila kan finpusses (meldinger/rekkefølge) uten å røre logikken.
// Hver trigger fyres MAKS ÉN GANG (persistert sett, se Mentor.tsx).

export interface MentorTrigger {
  id: string
  /** Menneskelig beskrivelse av utløseren (dokumentasjon — ikke kode). */
  betingelse: string
  /** Meldingen mentoren sier (bokmål, maks 2–3 setninger). */
  melding: string
}

export const MENTOR_TRIGGERS: MentorTrigger[] = [
  {
    id: 'forste_prising',
    betingelse: 'Første gang Priser-fanen åpnes',
    melding: 'Nå setter du priser! Prisen minus det varen koster deg er dekningsbidraget — pengene som faktisk skal dekke husleie og lønn. Setter du for lavt, jobber du gratis.',
  },
  {
    id: 'forste_apning',
    betingelse: 'Første gang butikken åpnes (dagen går til «åpen»)',
    melding: 'Da åpner vi! Nå ruller klokka og kundene kommer innom. Ta godt imot dem — hvert møte er en sjanse til både et salg og et bedre rykte.',
  },
  {
    id: 'forste_tomt_trau',
    betingelse: 'Første dagsoppgjør der en vare gikk tom',
    melding: 'Du gikk tom for en vare i dag. Tomt trau er tapte salg du aldri får igjen. Se hva som gikk unna, og bestill nok til i morgen.',
  },
  {
    id: 'forste_manedsoppgjor',
    betingelse: 'Første månedsrull (månedsoppgjør vises)',
    melding: 'Første måned i boks! Månedsresultatet er alt du tjente minus de faste kostnadene. Røde tall betyr at noe må endres — pris, kostnader eller volum.',
  },
  {
    id: 'forste_laan',
    betingelse: 'Første lån godtatt',
    melding: 'Du tok opp et lån — brukt smart kan det gi butikken fart. Men renter og avdrag skal betales hver måned uansett hvordan det går, så hold øye med kontantstrømmen.',
  },
  {
    id: 'forste_ko',
    betingelse: 'Første dag med kø (kunder tapt pga. for lav kapasitet)',
    melding: 'I dag sto det kunder i kø som ga opp og gikk. Kø er tapt salg. Én person på gulvet rekker bare så mange — vurder å sette flere på vakt i de travle timene.',
  },
  {
    id: 'forste_svinn',
    betingelse: 'Første dagsoppgjør med svinn (usolgt ferskvare kastet)',
    melding: 'Du måtte kaste usolgt vare i dag — det er svinn, og det spiser rett av overskuddet. Litt er normalt for ferskvare, men bestill litt mindre av det som blir stående.',
  },

  // ── KONTEKSTUELLE (flate-baserte) triggere ──────────────────────────────────
  // Fagord i meldingen skrives som [[GLOSSARY_ID|visningstekst]] og blir klikkbare
  // i snakkebobla (se Mentor.tsx). Refleksjonsmønsteret: still gjerne et spørsmål.
  {
    id: 'forste_disk_stell',
    betingelse: 'Første gang disk-/monterflaten åpnes for styling',
    melding: 'Tenk som kunden: legg like varer sammen — bakevarer for seg, søtt for seg. [[MKT_003|Bredde]] er hvor mange [[MKT_047|kategorier]] du fører, [[MKT_004|dybde]] er hvor mange varianter i hver. Hva ville du selv stoppet opp ved?',
  },
  {
    id: 'forste_vindu',
    betingelse: 'Første gang vindusstyling åpnes',
    melding: 'Vinduet er butikkens ansikt utad — det første forbipasserende ser. Hva vil du at de skal stoppe for og komme inn for?',
  },
  {
    id: 'forste_p_fullfort',
    betingelse: 'Første gang en av de fire P-ene fullføres',
    melding: 'Din første P i [[MKT_001|markedsmiksen]] er på plass! De fire — Produkt, Pris, Plass og Promosjon — bygger på hverandre. Hvilken tar du fatt på nå?',
  },
  {
    id: 'alle_p_fullfort',
    betingelse: 'Alle fire P-ene fullført',
    melding: 'Gratulerer — alle fire P-ene er på plass! Husk at de henger sammen: rett produkt til feil [[ECO_031|pris]], eller på feil plass, selger dårlig uansett. Nå er butikken klar til å møte kundene.',
  },
  {
    id: 'forste_bykart',
    betingelse: 'Første gang bykartet åpnes',
    melding: 'Her er byen — og hvor du legger butikken betyr mye. Sentrale, folksomme steder koster mer i leie, men gir flere kunder forbi. Hvor tror du folk går mest?',
  },
]

export function mentorMelding(id: string): string | undefined {
  return MENTOR_TRIGGERS.find(t => t.id === id)?.melding
}
