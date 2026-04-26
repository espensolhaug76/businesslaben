/**
 * Auto-generated from src/App.tsx routes + presentation files.
 * Do not hand-edit — regenerate with /tmp/gen_pres_registry.py if routes change.
 */

export type PresentationLevel = 'vg1' | 'vg2' | 'vg3'
export type PresentationSubject = 'ssr' | 'ml' | 'ent'
export type PresentationSsrSubject =
  | 'forretningsdrift' | 'mfi' | 'kultur'   // VG1
  | 'okonomi' | 'kommunikasjon' | 'hms'     // VG2

export interface PresentationEntry {
  id: string
  title: string
  route: string
  level: PresentationLevel
  subject: PresentationSubject
  ssrSubject?: PresentationSsrSubject
}

export const ALL_PRESENTATIONS: PresentationEntry[] = [
  { id: 'beredskapsplaner', title: 'Beredskapsplaner', route: '/learning/presentations/beredskapsplaner', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'hms', title: 'HMS', route: '/learning/presentations/hms', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'prissetting', title: 'Prissetting', route: '/learning/presentations/prissetting', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'regler-lovverk', title: 'Regler og lovverk', route: '/learning/presentations/regler-lovverk', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'regnskap', title: 'Regnskap og lønnsomhet', route: '/learning/presentations/regnskap', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'risikovurdering', title: 'Risikovurdering og forebygging', route: '/learning/presentations/risikovurdering', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'organisasjon', title: 'Roller og organisasjon', route: '/learning/presentations/organisasjon', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'verdikjeden', title: 'Verdikjeden og bærekraft', route: '/learning/presentations/verdikjeden', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { id: 'administrative-funksjoner', title: 'Administrative funksjoner', route: '/learning/presentations/administrative-funksjoner', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'distribusjon', title: 'Distribusjon — Plass', route: '/learning/presentations/distribusjon', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'forretningsidee', title: 'Forretningsidéen', route: '/learning/presentations/forretningsidee', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'konkurransemidlene', title: 'Konkurransemidlene', route: '/learning/presentations/konkurransemidlene', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'kampanje', title: 'Markedskampanje', route: '/learning/presentations/kampanje', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'markedsplan', title: 'Markedsplan', route: '/learning/presentations/markedsplan', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'produkt', title: 'Produkt — det 1. P', route: '/learning/presentations/produkt', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'regelverk-markedsforing', title: 'Regelverk for markedsføring', route: '/learning/presentations/regelverk-markedsforing', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'salg', title: 'Salg er problemløsning', route: '/learning/presentations/salg', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'teknologi-ki', title: 'Teknologi og KI', route: '/learning/presentations/teknologi-ki', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'etikk-baerekraft', title: 'Etikk og bærekraft', route: '/learning/presentations/etikk-baerekraft', level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { id: 'kommunikasjon', title: 'Kommunikasjon', route: '/learning/presentations/kommunikasjon', level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { id: 'konflikt-nod', title: 'Konflikt og nødssituasjoner', route: '/learning/presentations/konflikt-nod', level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { id: 'partene-arbeidslivet', title: 'Partene i arbeidslivet', route: '/learning/presentations/partene-arbeidslivet', level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { id: 'relasjonsbygging', title: 'Relasjonsbygging', route: '/learning/presentations/relasjonsbygging', level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { id: 'vertskapsrollen', title: 'Vertskapsrollen', route: '/learning/presentations/vertskapsrollen', level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { id: 'forbrukeratferd', title: 'Forbrukeratferd', route: '/learning/presentations/forbrukeratferd', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { id: 'baerekraft-verdikjede', title: 'Bærekraft og verdikjede', route: '/learning/presentations/baerekraft-verdikjede', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'digitale-system-kundeoppfolging', title: 'Digitale system og kundeoppfølging', route: '/learning/presentations/digitale-system-kundeoppfolging', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'forretningsplan-vg2', title: 'Forretningsplanen', route: '/learning/presentations/forretningsplan-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'lonn-personalkostnader', title: 'Lønn og personalkostnader', route: '/learning/presentations/lonn-personalkostnader', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'nokkeltall-lonnsomhet', title: 'Nøkkeltall og lønnsomhet', route: '/learning/presentations/nokkeltall-lonnsomhet', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'pris-og-kalkulasjon', title: 'Pris og kalkulasjon', route: '/learning/presentations/pris-og-kalkulasjon', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'regelverk-servicebedrifter', title: 'Regelverk for servicebedrifter', route: '/learning/presentations/regelverk-servicebedrifter', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'rekrutteringsprosesser', title: 'Rekrutteringsprosesser', route: '/learning/presentations/rekrutteringsprosesser', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'svinnforebygging', title: 'Svinnforebygging', route: '/learning/presentations/svinnforebygging', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'trender-forretningsmodeller', title: 'Trender og forretningsmodeller', route: '/learning/presentations/trender-forretningsmodeller', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { id: 'innovasjon-produktutvikling', title: 'Innovasjon og produktutvikling', route: '/learning/presentations/innovasjon-produktutvikling', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'internasjonale-markeder-vg2', title: 'Internasjonale markeder', route: '/learning/presentations/internasjonale-markeder-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'markedsforingskampanjer', title: 'Markedsføringskampanjer', route: '/learning/presentations/markedsforingskampanjer', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'markedsforingstrekanten', title: 'Markedsføringstrekantet', route: '/learning/presentations/markedsforingstrekanten', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'markedsundersokelse-vg2', title: 'Markedsundersøkelse', route: '/learning/presentations/markedsundersokelse-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'merkevare-vg2', title: 'Merkevare', route: '/learning/presentations/merkevare-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'posisjonering-vg2', title: 'Merkevarebygging og posisjonering', route: '/learning/presentations/posisjonering-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'profesjonell-kommunikasjon-vg2', title: 'Profesjonell kommunikasjon', route: '/learning/presentations/profesjonell-kommunikasjon-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'reiselivsprodukt-vg2', title: 'Reiselivsproduktet', route: '/learning/presentations/reiselivsprodukt-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'salgsprosessen-vg2', title: 'Salgsprosessen', route: '/learning/presentations/salgsprosessen-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { id: 'beredskap', title: 'Beredskap', route: '/learning/presentations/beredskap', level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { id: 'brannvern', title: 'Brannvern', route: '/learning/presentations/brannvern', level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { id: 'digital-sikkerhet-personvern', title: 'Digital sikkerhet og personvern', route: '/learning/presentations/digital-sikkerhet-personvern', level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { id: 'hms-arbeid-roller', title: 'HMS-roller og internkontroll', route: '/learning/presentations/hms-arbeid-roller', level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { id: 'forstehjelp', title: 'Livreddende førstehjelp', route: '/learning/presentations/forstehjelp', level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { id: 'risikoanalyse-vg2', title: 'Risikoanalyse', route: '/learning/presentations/risikoanalyse-vg2', level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { id: 'ml1/direkte-markedsforing-internett', title: 'Direkte markedsføring og internett', route: '/learning/presentations/ml1/direkte-markedsforing-internett', level: 'vg2', subject: 'ml' },
  { id: 'ml1/distribusjonsstrategi', title: 'Konkurransemiddelet Distribusjon', route: '/learning/presentations/ml1/distribusjonsstrategi', level: 'vg2', subject: 'ml' },
  { id: 'ml1/markedskommunikasjon', title: 'Konkurransemiddelet Markedskommunikasjon', route: '/learning/presentations/ml1/markedskommunikasjon', level: 'vg2', subject: 'ml' },
  { id: 'ml1/prisstrategi', title: 'Konkurransemiddelet Pris', route: '/learning/presentations/ml1/prisstrategi', level: 'vg2', subject: 'ml' },
  { id: 'ml1/produktstrategi', title: 'Konkurransemiddelet Produkt', route: '/learning/presentations/ml1/produktstrategi', level: 'vg2', subject: 'ml' },
  { id: 'ml1/markeder', title: 'Markeder', route: '/learning/presentations/ml1/markeder', level: 'vg2', subject: 'ml' },
  { id: 'ml1', title: 'Markedsføring og ledelse', route: '/learning/presentations/ml1', level: 'vg2', subject: 'ml' },
  { id: 'ml1/markedsforing-fag', title: 'Markedsføring som fag og tankesett', route: '/learning/presentations/ml1/markedsforing-fag', level: 'vg2', subject: 'ml' },
  { id: 'ml1/markedsforings-lovverk-etikk', title: 'Markedsføringens lovverk og etikk', route: '/learning/presentations/ml1/markedsforings-lovverk-etikk', level: 'vg2', subject: 'ml' },
  { id: 'ml1/situasjonsanalyse', title: 'Markedsinformasjon og MIS', route: '/learning/presentations/ml1/situasjonsanalyse', level: 'vg2', subject: 'ml' },
  { id: 'ml1/stp', title: 'Markedssegmentering og målgruppevalg (STP)', route: '/learning/presentations/ml1/stp', level: 'vg2', subject: 'ml' },
  { id: 'ml1/organisering-markedsforing', title: 'Organisering av markedsføringen', route: '/learning/presentations/ml1/organisering-markedsforing', level: 'vg2', subject: 'ml' },
  { id: 'ml1/profesjonelle-markeder', title: 'Profesjonelle markeder', route: '/learning/presentations/ml1/profesjonelle-markeder', level: 'vg2', subject: 'ml' },
  { id: 'ml1/forbrukeratferd', title: 'Psykologi og kjøpsatferd', route: '/learning/presentations/ml1/forbrukeratferd', level: 'vg2', subject: 'ml' },
  { id: 'ml1/reklame-medieplanlegging', title: 'Reklame og medieplanlegging', route: '/learning/presentations/ml1/reklame-medieplanlegging', level: 'vg2', subject: 'ml' },
  { id: 'ml1/salg-personlig-kommunikasjon', title: 'Salg og personlig kommunikasjon', route: '/learning/presentations/ml1/salg-personlig-kommunikasjon', level: 'vg2', subject: 'ml' },
  { id: 'ent1/behov-marked-segmentering', title: 'Behov, marked og segmentering', route: '/learning/presentations/ent1/behov-marked-segmentering', level: 'vg2', subject: 'ent' },
  { id: 'ent1/etablering-selskapsformer', title: 'Etablering og selskapsformer', route: '/learning/presentations/ent1/etablering-selskapsformer', level: 'vg2', subject: 'ent' },
  { id: 'ent1/finansiering-tilskudd', title: 'Finansiering og tilskudd', route: '/learning/presentations/ent1/finansiering-tilskudd', level: 'vg2', subject: 'ent' },
  { id: 'ent1/forretningsmodell-bmc', title: 'Forretningsmodellen (BMC)', route: '/learning/presentations/ent1/forretningsmodell-bmc', level: 'vg2', subject: 'ent' },
  { id: 'ent1/innovatoren-og-entreprenoren', title: 'Innovatøren og entreprenøren', route: '/learning/presentations/ent1/innovatoren-og-entreprenoren', level: 'vg2', subject: 'ent' },
  { id: 'ent1', title: 'Innovatøren og entreprenøren', route: '/learning/presentations/ent1', level: 'vg2', subject: 'ent' },
  { id: 'ent1/kreativitet-ideutvikling', title: 'Kreativitet og idéutvikling', route: '/learning/presentations/ent1/kreativitet-ideutvikling', level: 'vg2', subject: 'ent' },
  { id: 'ent1/lovverk-avtaler-hms', title: 'Lovverk, avtaler og HMS', route: '/learning/presentations/ent1/lovverk-avtaler-hms', level: 'vg2', subject: 'ent' },
  { id: 'ent1/markedsforing-salg-nystartede', title: 'Markedsføring og salg for nystartede', route: '/learning/presentations/ent1/markedsforing-salg-nystartede', level: 'vg2', subject: 'ent' },
  { id: 'ent1/samarbeid-teambygging', title: 'Samarbeid og teambygging', route: '/learning/presentations/ent1/samarbeid-teambygging', level: 'vg2', subject: 'ent' },
  { id: 'ent1/okonomisk-planlegging-budsjett', title: 'Økonomisk planlegging og budsjett', route: '/learning/presentations/ent1/okonomisk-planlegging-budsjett', level: 'vg2', subject: 'ent' },
  { id: 'ml2/distribusjonsstrategi-avansert', title: 'Distribusjonsstrategier (avansert)', route: '/learning/presentations/ml2/distribusjonsstrategi-avansert', level: 'vg3', subject: 'ml' },
  { id: 'ml2/etikk-i-markedsforingen', title: 'Etikk i markedsføringen', route: '/learning/presentations/ml2/etikk-i-markedsforingen', level: 'vg3', subject: 'ml' },
  { id: 'ml2/kommunikasjonsstrategier', title: 'Kommunikasjonsstrategier', route: '/learning/presentations/ml2/kommunikasjonsstrategier', level: 'vg3', subject: 'ml' },
  { id: 'ml2/lederens-rolle', title: 'Lederens rolle og funksjon', route: '/learning/presentations/ml2/lederens-rolle', level: 'vg3', subject: 'ml' },
  { id: 'ml2/markeds-og-bransjeanalyse', title: 'Markeds- og bransjeanalyse', route: '/learning/presentations/ml2/markeds-og-bransjeanalyse', level: 'vg3', subject: 'ml' },
  { id: 'ml2/internasjonal-markedsforing', title: 'Markedsføring på internasjonale markeder', route: '/learning/presentations/ml2/internasjonal-markedsforing', level: 'vg3', subject: 'ml' },
  { id: 'ml2/markedsmiks-og-effektmaling', title: 'Markedsmiks og effektmåling', route: '/learning/presentations/ml2/markedsmiks-og-effektmaling', level: 'vg3', subject: 'ml' },
  { id: 'ml2/markedsplanen', title: 'Markedsplanen', route: '/learning/presentations/ml2/markedsplanen', level: 'vg3', subject: 'ml' },
  { id: 'ml2/merkevarestrategi', title: 'Merkevarestrategier', route: '/learning/presentations/ml2/merkevarestrategi', level: 'vg3', subject: 'ml' },
  { id: 'ml2/organisering-og-ledelse-strategisk', title: 'Organisering og ledelse (strategisk nivå)', route: '/learning/presentations/ml2/organisering-og-ledelse-strategisk', level: 'vg3', subject: 'ml' },
  { id: 'ml2/personaladministrasjon-hrm', title: 'Personaladministrasjon og HRM', route: '/learning/presentations/ml2/personaladministrasjon-hrm', level: 'vg3', subject: 'ml' },
  { id: 'ml2/prisstrategi-avansert', title: 'Prisstrategier (avansert)', route: '/learning/presentations/ml2/prisstrategi-avansert', level: 'vg3', subject: 'ml' },
  { id: 'ml2/produktstrategi-avansert', title: 'Produktstrategi (avansert)', route: '/learning/presentations/ml2/produktstrategi-avansert', level: 'vg3', subject: 'ml' },
  { id: 'ml2/samfunnsansvar-baerekraft-omdomme', title: 'Samfunnsansvar, bærekraft og omdømme', route: '/learning/presentations/ml2/samfunnsansvar-baerekraft-omdomme', level: 'vg3', subject: 'ml' },
  { id: 'ml2', title: 'Strategisk markedsføring ML2', route: '/learning/presentations/ml2', level: 'vg3', subject: 'ml' },
  { id: 'ml2/strategisk-planlegging', title: 'Strategisk planlegging', route: '/learning/presentations/ml2/strategisk-planlegging', level: 'vg3', subject: 'ml' },
  { id: 'ml2/visjon-og-mal', title: 'Visjon, mål og overordnede strategier', route: '/learning/presentations/ml2/visjon-og-mal', level: 'vg3', subject: 'ml' },
  { id: 'ml2/okonomistyring-kalkulasjon-budsjettering', title: 'Økonomistyring, kalkulasjon og budsjettering', route: '/learning/presentations/ml2/okonomistyring-kalkulasjon-budsjettering', level: 'vg3', subject: 'ml' },
  { id: 'ent2/csr-etikk', title: 'Bedriftens samfunnsansvar (CSR) og etikk', route: '/learning/presentations/ent2/csr-etikk', level: 'vg3', subject: 'ent' },
  { id: 'ent2/forretningsutvikling-skalering', title: 'Forretningsutvikling og skalering', route: '/learning/presentations/ent2/forretningsutvikling-skalering', level: 'vg3', subject: 'ent' },
  { id: 'ent2/internasjonalisering-eksport', title: 'Internasjonalisering og eksport', route: '/learning/presentations/ent2/internasjonalisering-eksport', level: 'vg3', subject: 'ent' },
  { id: 'ent2/investeringsanalyse', title: 'Investeringsanalyse og lønnsomhet', route: '/learning/presentations/ent2/investeringsanalyse', level: 'vg3', subject: 'ent' },
  { id: 'ent2/jus-tvistelosning', title: 'Jus og tvisteløsning i forretningslivet', route: '/learning/presentations/ent2/jus-tvistelosning', level: 'vg3', subject: 'ent' },
  { id: 'ent2/ledelse-organisasjonskultur', title: 'Ledelse og organisasjonskultur', route: '/learning/presentations/ent2/ledelse-organisasjonskultur', level: 'vg3', subject: 'ent' },
  { id: 'ent2/likviditetsstyring-finansrisiko', title: 'Likviditetsstyring og finansrisiko', route: '/learning/presentations/ent2/likviditetsstyring-finansrisiko', level: 'vg3', subject: 'ent' },
  { id: 'ent2/markedsanalyse-posisjonering', title: 'Markedsanalyse og posisjonering', route: '/learning/presentations/ent2/markedsanalyse-posisjonering', level: 'vg3', subject: 'ent' },
  { id: 'ent2/markedsplanen-etablerte-bedrifter', title: 'Markedsplanen for etablerte bedrifter', route: '/learning/presentations/ent2/markedsplanen-etablerte-bedrifter', level: 'vg3', subject: 'ent' },
  { id: 'ent2/personaladministrasjon-hrm-strategisk', title: 'Personaladministrasjon og HRM (strategisk)', route: '/learning/presentations/ent2/personaladministrasjon-hrm-strategisk', level: 'vg3', subject: 'ent' },
  { id: 'ent2', title: 'Strategi og skalering', route: '/learning/presentations/ent2', level: 'vg3', subject: 'ent' },
  { id: 'ent2/strategisk-planlegging-vekst', title: 'Strategisk planlegging og vekst', route: '/learning/presentations/ent2/strategisk-planlegging-vekst', level: 'vg3', subject: 'ent' },
]

export interface PresentationSection {
  title: string
  level: PresentationLevel
  subject: PresentationSubject
  ssrSubject?: PresentationSsrSubject
}

export const PRESENTATION_SECTIONS: PresentationSection[] = [
  { title: 'Forretningsdrift — VG1',                 level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { title: 'Markedsføring og innovasjon — VG1',      level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { title: 'Kultur og samhandling — VG1',            level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { title: 'Økonomi og administrasjon — VG2',        level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { title: 'Kommunikasjon og markedsføring — VG2',   level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { title: 'Helse, miljø og sikkerhet — VG2',        level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { title: 'Markedsføring og ledelse 1 — VG2',       level: 'vg2', subject: 'ml' },
  { title: 'Entreprenørskap 1 — VG2',                level: 'vg2', subject: 'ent' },
  { title: 'Markedsføring og ledelse 2 — VG3',       level: 'vg3', subject: 'ml' },
  { title: 'Entreprenørskap 2 — VG3',                level: 'vg3', subject: 'ent' },
]

/** Look up a presentation by id (slug). Returns null if unknown. */
export function findPresentation(id: string): PresentationEntry | null {
  return ALL_PRESENTATIONS.find(p => p.id === id) ?? null
}
