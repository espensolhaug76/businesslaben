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

  // ── TEMA 1: BEREDSKAP (kun når temaet er aktivt) ────────────────────────────
  {
    id: 'tema_beredskap_aktivert',
    betingelse: 'Temaet Beredskap slås på (via lærerens Spillet-fane)',
    melding: 'Klassen din jobber med beredskap nå — sjekk den nye 🦺 HMS-fanen i dashbordet. Start med [[RST_003|beredskapsplanen]], så du vet hva du gjør hvis noe skjer.',
  },
  {
    id: 'beredskap_plan_bekreftet',
    betingelse: 'Eleven bekrefter beredskapsplanen',
    melding: 'Bra — nå kjenner du planen. Neste steg: fyll ut [[RST_002|risikovurderingen]] i HMS-fanen. Hva kan gå galt i akkurat DIN butikk?',
  },
  {
    id: 'beredskap_risiko_levert',
    betingelse: 'Eleven har fylt inn tiltak i risikoskjemaet (dynamisk melding leser skjemaet)',
    melding: 'Du har vurdert risikoen i butikken. Hva er det viktigste tiltaket ditt?',
  },
  {
    id: 'beredskap_brannalarm_handtert',
    betingelse: 'Eleven har håndtert brannalarmen (dynamisk melding leser valget)',
    melding: 'Du håndterte brannalarmen. Tenk gjennom hva du gjorde.',
  },
  {
    id: 'beredskap_ovelse_etter_feil',
    betingelse: 'Første gang eleven kjører en brannØVELSE etter en feilet skarp alarm (dynamisk melding leser om øvelsen gikk bra)',
    melding: 'Fint at du øver videre — den første alarmen gikk ikke helt på skinner, og det er helt greit. Hva ville du gjort først neste gang?',
  },

  // ── TEMA 2 Budsjett + TEMA 3 Nøkkeltall ─────────────────────────────────────
  {
    id: 'tema_budsjett_aktivert',
    betingelse: 'Temaet Budsjett slås på (via lærerens Spillet-fane) — fyres straks ved aktivering under spilling, ellers ved første dashbord-åpning',
    melding: 'Læreren har åpnet [[ECO_008|budsjett]]-temaet — du finner det øverst i Økonomi-fanen. Sett opp et budsjett for måneden, så sammenligner vi med de faktiske tallene.',
  },
  {
    id: 'tema_nokkeltall_aktivert',
    betingelse: 'Temaet Nøkkeltall slås på (VG2) — samme timing som budsjett-temaet',
    melding: 'Læreren har åpnet nøkkeltall-temaet — du finner det i Økonomi-fanen. Der regner du ut bruttofortjeneste, [[ECO_002|dekningsgrad]] og resultatgrad selv.',
  },
  {
    id: 'budsjett_avvik_storst',
    betingelse: 'Etter et månedsoppgjør der eleven hadde satt budsjett — dynamisk melding leser linja med STØRST absolutt avvik',
    melding: 'Se budsjettet ditt mot de faktiske tallene — hvilken linje bommet mest, og hva tror du skjedde?',
  },
  {
    id: 'nokkeltall_dekningsgrad_avvik',
    betingelse: 'VG2: elevens beregnede dekningsgrad avviker >5 prosentpoeng fra bokført (dynamisk) — spør om HVILKE tall, ikke fasit',
    melding: 'Dekningsgraden du regnet ut ligger et stykke fra den bokførte. Hvilke tall brukte du i regnestykket?',
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
    betingelse: 'Første gang Personale-fanen åpnes (viser steg 1 «Hvem gjør hva?»)',
    fane: 'personale',
    melding: 'Start med «Hvem gjør hva?» — i en liten bedrift har som regel én person flere roller. Dra oppgavene på deg selv og de ansatte, eller sett regnskapet ut. Folk er både god service OG en [[ECO_007|fast kostnad]]. Hvem skal gjøre hva hos DEG?',
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
