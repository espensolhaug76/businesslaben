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
  /** KONTEKSTBUNDET til en dashbord-fane (Tab-id). Fane-triggere vises KUN
   *  mens fanen er aktiv (egen kanal, ikke køen) og re-armes hvis de ikke rekker
   *  frem — se Mentor.tsx. Uten `fane` er triggeren en HENDELSE (kø + peker). */
  fane?: string
}

/** Fane-triggere for en gitt dashbord-fane, i definisjonsrekkefølge. */
export function faneTriggere(fane: string): MentorTrigger[] {
  return MENTOR_TRIGGERS.filter(t => t.fane === fane)
}

export const MENTOR_TRIGGERS: MentorTrigger[] = [
  {
    id: 'forste_prising',
    betingelse: 'Første gang Priser-fanen åpnes',
    fane: 'priser',
    melding: 'Nå setter du priser! Prisen minus det varen koster deg er dekningsbidraget — pengene som faktisk skal dekke husleie og lønn. Setter du for lavt, jobber du gratis.',
  },
  {
    id: 'forste_apning',
    betingelse: 'Første gang butikken åpnes (dagen går til «åpen»)',
    melding: 'Da åpner vi! Nå ruller klokka og kundene kommer innom. Ta godt imot dem — hvert møte er en sjanse til både et salg og et bedre rykte.',
  },
  {
    id: 'forste_bestilling_levert',
    betingelse: 'Første gang bestilte varer ankommer (ved dagstart, før åpning)',
    melding: 'Varene du bestilte i går er her — still dem ut i disken før du åpner. Bestillinger du legger i dag kommer i morgen tidlig.',
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

  // ── FANE-TRIGGERE (kontekstbundne) ──────────────────────────────────────────
  // Én per dashbord-fane (`fane`-feltet), første besøk. Vises KUN mens fanen er
  // aktiv (mentor:fane-kanalen i Mentor.tsx), re-armes hvis de ikke rekker frem.
  // Refleksjon, aldri fasit.
  {
    id: 'produkter_fane',
    betingelse: 'Første gang Produkter-fanen åpnes',
    fane: 'produkter',
    melding: 'Nå bygger du sortimentet. [[MKT_003|Bredde]] er hvor mange ulike kategorier du fører, [[MKT_004|dybde]] er hvor mange varianter i hver. Bredt og grunt frister mange; smalt og dypt gjør deg til spesialist. Hva slags butikk vil DU være?',
  },
  {
    id: 'priser_fane',
    betingelse: 'Første gang Priser-fanen åpnes (prissettingsstrategier)',
    fane: 'priser',
    melding: 'Det finnes flere måter å sette pris på: [[MKT_048|kostnadsbasert]] (kostnad pluss påslag), [[MKT_049|konkurransebasert]] (se på naboene) og [[MKT_050|verdibasert]] (hva kunden synes den er verdt). [[MKT_013|Psykologisk prising]] med 99-priser kan gi et ekstra dytt. Hvilken strategi passer DIN butikk?',
  },
  {
    id: 'malgruppe_fane',
    betingelse: 'Første gang Målgruppe-fanen åpnes',
    fane: 'malgruppe',
    melding: 'Å dele markedet i grupper — [[MKT_020|segmentering]] — hjelper deg å snakke til de rette folkene. Alder, hvor de bor og hva de er opptatt av former hva de kjøper. Hvem er DIN typiske kunde?',
  },
  {
    id: 'marked_fane',
    betingelse: 'Første gang Markedsføring-fanen åpnes',
    fane: 'markedsforing',
    melding: 'Markedsføring virker bare der målgruppa di faktisk er. Noen lever på sosiale medier og [[MKT_035|influensere]], andre nås best gjennom [[MKT_036|innhold]] eller oppslag i nærmiljøet. Hvilke kanaler når DIN kunde billigst?',
  },
  {
    id: 'personale_fane',
    betingelse: 'Første gang Personale-fanen åpnes',
    fane: 'personale',
    melding: 'Folk på jobb er både god service OG en [[ECO_007|fast kostnad]] som løper uansett omsetning. Flere hender gir mer kapasitet i rushet, men lønna skal betales hver dag. Hvor mange trenger du egentlig?',
  },
  {
    id: 'okonomi_fane',
    betingelse: 'Første gang Økonomi-fanen åpnes',
    fane: 'okonomi',
    melding: 'Pass på forskjellen: [[ECO_010|resultatet]] viser om du tjener penger over tid, mens [[ECO_013|kontantstrømmen]] viser om det er penger på konto akkurat nå. En god butikk kan gå tom for cash — [[ECO_005|likviditet]] er å ha penger når regningene forfaller. Har du nok buffer?',
  },
  {
    id: 'forretningsplan_fane',
    betingelse: 'Første gang Forretningsplan-fanen åpnes',
    fane: 'forretningsplan',
    melding: '[[STRAT_002|Forretningsplanen]] er ikke bare en skoleoppgave — det er dokumentet banken leser før de sier ja til lån. Den viser at du har tenkt gjennom kunder, kostnader og inntekter. Hva ville overbevist DEG om å låne ut penger?',
  },
  {
    id: 'lokasjon_fane',
    betingelse: 'Første gang Lokasjon-fanen åpnes',
    fane: 'lokasjon',
    melding: 'Lokasjon er en avveining: en sentral, folksom adresse gir flere kunder forbi, men høyere [[ECO_007|husleie]] hver måned. En billig krok sparer penger — men får du nok folk innom? Hva veier tyngst for DIN butikk?',
  },
]

export function mentorMelding(id: string): string | undefined {
  return MENTOR_TRIGGERS.find(t => t.id === id)?.melding
}

/** INTRO-SEKVENS ved første spillstart (én gang per lagring): stor Espen midt på
 *  skjermen, 3 steg med «Neste», kan hoppes over — så krymper han til hjørnet.
 *  Tunbar tekst (samme mønster som triggerne); [[GLOSSARY_ID|ord]] blir klikkbare.
 *  Rendres av Mentor.tsx. */
export const MENTOR_INTRO: string[] = [
  'Hei! Jeg er Espen — jeg følger deg gjennom hele bedriften din.',
  'Slik kommer du i gang: finn et ledig lokale i byen, bestill varer, still dem ut i disken — og så åpner du butikken.',
  'Tre hjelpere er alltid med deg: 💻 Dashbord oppe til høyre, meg her nede i hjørnet, og 📖-boka mi når du lurer på hva et ord betyr.',
]
