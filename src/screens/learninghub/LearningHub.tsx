import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import ThemeToggle from '../../components/ui/ThemeToggle'
import GlossaryPopup from '../../components/ui/GlossaryPopup'

export interface ModuleCard {
  icon: string
  title: string
  description: string
  route: string
  color: string
  storageKey?: string
  level: 'vg1' | 'vg2' | 'ml1'
  subject: 'forretningsdrift' | 'mfi' | 'kultur' | 'ml1'
  presentationRoute?: string
}

// ── VG1 Forretningsdrift ──────────────────────────────────────────────────────
const FD_VG1: ModuleCard[] = [
  {
    icon: '🏢',
    title: 'Ansvarsfordeling, roller og organisasjonskart',
    description: 'Roller, ansvar og organisasjonsstruktur',
    route: '/learning/forretningsdrift/organization',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-organization',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/organisasjon',
  },
  {
    icon: '🧮',
    title: 'Prissetting',
    description: 'Kalkyle, påslag og dekningsgrad med MVA',
    route: '/learning/forretningsdrift/pricing-calculator',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-pricing-calculator',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/prissetting',
  },
  {
    icon: '📊',
    title: 'Regnskap, budsjett og lønnsomhet',
    description: 'Budsjett vs. regnskap og avviksanalyse',
    route: '/learning/forretningsdrift/budgeting',
    color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30',
    storageKey: 'learning-budgeting',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/regnskap',
  },
  {
    icon: '🦺',
    title: 'Helse, miljø og sikkerhet',
    description: 'HMS-krav, arbeidsmiljøloven og vernearbeid',
    route: '/learning/forretningsdrift/hms',
    color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30',
    storageKey: 'learning-hms',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/hms',
  },
  {
    icon: '🚨',
    title: 'Beredskapsplaner',
    description: 'Krisehåndtering og beredskapsplaner',
    route: '/learning/forretningsdrift/contingency',
    color: 'from-red-600/20 to-red-500/10 border-red-500/30',
    storageKey: 'learning-contingency',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/beredskapsplaner',
  },
  {
    icon: '🔗',
    title: 'Verdikjeden og bærekraftig utvikling',
    description: 'Porters verdikjede, sirkulær økonomi og bærekraft',
    route: '/learning/forretningsdrift/verdikjeden',
    color: 'from-green-600/20 to-green-500/10 border-green-500/30',
    storageKey: 'learning-verdikjeden',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/verdikjeden',
  },
  {
    icon: '⚠️',
    title: 'Risikovurdering og forebyggende tiltak',
    description: 'Risikomatrise, tiltakshierarkiet og HMS-dokumentasjon',
    route: '/learning/forretningsdrift/risikovurdering',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-risikovurdering',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/risikovurdering',
  },
  {
    icon: '⚖️',
    title: 'Regler og lovverk for servicenæringen',
    description: 'Arbeidsmiljøloven, forbrukervern og næringslovgivning',
    route: '/learning/forretningsdrift/regler-lovverk',
    color: 'from-slate-600/20 to-slate-500/10 border-slate-500/30',
    storageKey: 'learning-regler-lovverk',
    level: 'vg1',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/regler-lovverk',
  },
]

// ── VG1 Markedsføring og innovasjon ───────────────────────────────────────────
const MFI_VG1: ModuleCard[] = [
  {
    icon: '🛍️',
    title: 'Forbrukeratferd og målgrupper',
    description: 'Kundebehov, Maslow, segmentering og persona',
    route: '/learning/mfi/produkt-behov',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-mfi-produkt-behov',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '💰',
    title: 'Konkurransemidler',
    description: 'Prisstrategier, dekningsgrad og konkurransefortrinn',
    route: '/learning/mfi/prisstrategier',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-mfi-prisstrategier',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/konkurransemidlene',
  },
  {
    icon: '🚚',
    title: 'Distribusjon',
    description: 'Salgskanaler og distribusjonsvalg',
    route: '/learning/mfi/distribusjon',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-mfi-distribusjon',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/konkurransemidlene',
  },
  {
    icon: '📣',
    title: 'Markedsføringskampanje',
    description: 'AIDA, mediekanaler og kampanjestrategi',
    route: '/learning/mfi/kommunikasjon-kanaler',
    color: 'from-pink-600/20 to-pink-500/10 border-pink-500/30',
    storageKey: 'learning-mfi-kommunikasjon-kanaler',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/kampanje',
  },
  {
    icon: '📋',
    title: 'Markedsplan',
    description: 'Lag og vurder en strukturert markedsplan',
    route: '/learning/mfi/markedsplan',
    color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30',
    storageKey: 'learning-mfi-markedsplan',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/markedsplan',
  },
  {
    icon: '🤝',
    title: 'Salg',
    description: 'Salgsprosessen steg-for-steg, FAB og innvendingshåndtering',
    route: '/learning/mfi/salgsprosessen',
    color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/30',
    storageKey: 'learning-mfi-salgsprosessen',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/salg',
  },
  {
    icon: '🌱',
    title: 'Forretningsidé',
    description: 'Bærekraftig forretningsdrift og grønn strategi',
    route: '/learning/mfi/baerekraft-forretningsidee',
    color: 'from-green-600/20 to-green-500/10 border-green-500/30',
    storageKey: 'learning-mfi-baerekraft-forretningsidee',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/forretningsidee',
  },
  {
    icon: '🗂️',
    title: 'Administrative funksjoner',
    description: 'Orden, dokumentasjon og daglige rutiner',
    route: '/learning/mfi/administrative-rutiner',
    color: 'from-zinc-600/20 to-zinc-500/10 border-zinc-500/30',
    storageKey: 'learning-mfi-administrative-rutiner',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/administrative-funksjoner',
  },
  {
    icon: '⚖️',
    title: 'Regelverk for markedsføring og salg',
    description: 'Markedsføringsloven, GDPR og forbrukervern',
    route: '/learning/mfi/markedsforingsloven',
    color: 'from-slate-600/20 to-slate-500/10 border-slate-500/30',
    storageKey: 'learning-mfi-markedsforingsloven',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/regelverk-markedsforing',
  },
  {
    icon: '🤖',
    title: 'Teknologi og KI i salg',
    description: 'CRM, kunstig intelligens og fremtidens salg',
    route: '/learning/mfi/teknologi-ki',
    color: 'from-purple-600/20 to-purple-500/10 border-purple-500/30',
    storageKey: 'learning-mfi-teknologi-ki',
    level: 'vg1',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/teknologi-ki',
  },
]

// ── VG1 Kultur og samhandling ─────────────────────────────────────────────────
const KULTUR_VG1: ModuleCard[] = [
  {
    icon: '💬',
    title: 'Kommunikasjon og kundebehandling',
    description: 'Verbal og non-verbal kommunikasjon i arbeidslivet',
    route: '/learning/kultur/kommunikasjon',
    color: 'from-sky-600/20 to-sky-500/10 border-sky-500/30',
    storageKey: 'learning-kultur-kommunikasjon',
    level: 'vg1',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/kommunikasjon',
  },
  {
    icon: '📩',
    title: 'Klagehåndtering og konfliktforebygging',
    description: 'Håndter klager profesjonelt og forebygg konflikter',
    route: '/learning/kultur/klagebehandling',
    color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',
    storageKey: 'learning-kultur-klagebehandling',
    level: 'vg1',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/klaghandtering',
  },
  {
    icon: '🌍',
    title: 'Relasjonsbygging og nettverk',
    description: 'Bygg relasjoner på tvers av kulturer og bakgrunner',
    route: '/learning/kultur/kulturforstaelse',
    color: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/30',
    storageKey: 'learning-kultur-kulturforstaelse',
    level: 'vg1',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/relasjonsbygging',
  },
  {
    icon: '🧭',
    title: 'Etikk og bærekraft',
    description: 'Verdier, normer og etisk atferd i arbeidslivet',
    route: '/learning/kultur/etikk',
    color: 'from-lime-600/20 to-lime-500/10 border-lime-500/30',
    storageKey: 'learning-kultur-etikk',
    level: 'vg1',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/etikk-baerekraft',
  },
  {
    icon: '👥',
    title: 'Partene i arbeidslivet',
    description: 'Fagforeninger, arbeidsgivere og arbeidslivets regler',
    route: '/learning/kultur/teamarbeid',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-kultur-teamarbeid',
    level: 'vg1',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/partene-arbeidslivet',
  },
  {
    icon: '🏨',
    title: 'Vertskapsrollen',
    description: 'Profesjonell velkomst, gjestehåndtering og opplevelsesøkonomi',
    route: '/learning/kultur/vertskapsrollen',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-kultur-vertskapsrollen',
    level: 'vg1',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/vertskapsrollen',
  },
  {
    icon: '🚨',
    title: 'Konflikt- og nødssituasjonshåndtering',
    description: 'Deeskalering, konfliktløsning og beredskap',
    route: '/learning/kultur/konflikt-nodssituasjon',
    color: 'from-red-600/20 to-red-500/10 border-red-500/30',
    storageKey: 'learning-kultur-konflikt-nod',
    level: 'vg1',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/konflikt-nod',
  },
]

// ── VG2 Forretningsdrift ──────────────────────────────────────────────────────
const FD_VG2: ModuleCard[] = [
  {
    icon: '📑',
    title: 'Forretningsplan',
    description: 'Bygg en komplett og realistisk forretningsplan',
    route: '/learning/vg2/forretningsdrift/forretningsplan',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-vg2-forretningsplan',
    level: 'vg2',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/forretningsidee',
  },
  {
    icon: '💸',
    title: 'Lønn og personalkostnader',
    description: 'Beregn lønn, skatt og totale personalkostnader',
    route: '/learning/vg2/forretningsdrift/lonn-personalkostnader',
    color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30',
    storageKey: 'learning-vg2-lonn-personalkostnader',
    level: 'vg2',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/administrative-funksjoner',
  },
  {
    icon: '📈',
    title: 'Regnskapsanalyse',
    description: 'Les og tolk regnskap og nøkkeltall',
    route: '/learning/vg2/forretningsdrift/regnskapsanalyse',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-vg2-regnskapsanalyse',
    level: 'vg2',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/regnskap',
  },
  {
    icon: '🔍',
    title: 'Risikoanalyse',
    description: 'Identifiser og vurder risiko i en bedrift',
    route: '/learning/vg2/forretningsdrift/risikoanalyse',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-vg2-risikoanalyse',
    level: 'vg2',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/regler-lovverk',
  },
  {
    icon: '🛡️',
    title: 'Svinnforebygging',
    description: 'Tiltak mot svinn og tap i varehandel',
    route: '/learning/vg2/forretningsdrift/svinnforebygging',
    color: 'from-red-600/20 to-red-500/10 border-red-500/30',
    storageKey: 'learning-vg2-svinnforebygging',
    level: 'vg2',
    subject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/verdikjeden',
  },
]

// ── VG2 Innovasjon og markedsføring ───────────────────────────────────────────
const INNOVASJON_VG2: ModuleCard[] = [
  {
    icon: '⭐',
    title: 'Merkevare',
    description: 'Bygg og posisjonér en sterk merkevare',
    route: '/learning/vg2/innovasjon/merkevare',
    color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30',
    storageKey: 'learning-vg2-merkevare',
    level: 'vg2',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/forretningsidee',
  },
  {
    icon: '🔎',
    title: 'Markedsundersøkelse',
    description: 'Design og gjennomfør en markedsundersøkelse',
    route: '/learning/vg2/innovasjon/markedsundersokelse',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-vg2-markedsundersokelse',
    level: 'vg2',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/markedsplan',
  },
  {
    icon: '✈️',
    title: 'Reiselivsprodukt',
    description: 'Utvikle og pakke reiselivsprodukter',
    route: '/learning/vg2/innovasjon/reiselivsprodukt',
    color: 'from-sky-600/20 to-sky-500/10 border-sky-500/30',
    storageKey: 'learning-vg2-reiselivsprodukt',
    level: 'vg2',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/vertskapsrollen',
  },
  {
    icon: '🚨',
    title: 'Beredskapsledelse',
    description: 'Lede en organisasjon gjennom krise',
    route: '/learning/vg2/innovasjon/beredskapsledelse',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-vg2-beredskapsledelse',
    level: 'vg2',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/konflikt-nod',
  },
  {
    icon: '📍',
    title: 'Posisjonering',
    description: 'Strategisk posisjonering i markedet',
    route: '/learning/vg2/innovasjon/posisjonering',
    color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30',
    storageKey: 'learning-vg2-posisjonering',
    level: 'vg2',
    subject: 'mfi',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
]

// ── VG2 Kultur og kommunikasjon ───────────────────────────────────────────────
const KULTUR_VG2: ModuleCard[] = [
  {
    icon: '🎙️',
    title: 'Profesjonell kommunikasjon',
    description: 'Kommunikasjon i møter, presentasjoner og e-post',
    route: '/learning/vg2/kultur/profesjonell-kommunikasjon',
    color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/30',
    storageKey: 'learning-vg2-profesjonell-kommunikasjon',
    level: 'vg2',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/kommunikasjon',
  },
  {
    icon: '🤜',
    title: 'Konflikthåndtering',
    description: 'Løs konflikter konstruktivt på arbeidsplassen',
    route: '/learning/vg2/kultur/konflikthåndtering',
    color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',
    storageKey: 'learning-vg2-konflikthandtering',
    level: 'vg2',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/konflikt-nod',
  },
  {
    icon: '🧩',
    title: 'Etiske dilemmaer',
    description: 'Analyser og håndter krevende etiske situasjoner',
    route: '/learning/vg2/kultur/etiske-dilemmaer',
    color: 'from-lime-600/20 to-lime-500/10 border-lime-500/30',
    storageKey: 'learning-vg2-etiske-dilemmaer',
    level: 'vg2',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/etikk-baerekraft',
  },
  {
    icon: '🌐',
    title: 'Internasjonale markeder',
    description: 'Kultur, kommunikasjon og handel over landegrenser',
    route: '/learning/vg2/kultur/internasjonale-markeder',
    color: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/30',
    storageKey: 'learning-vg2-internasjonale-markeder',
    level: 'vg2',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/relasjonsbygging',
  },
  {
    icon: '📜',
    title: 'Arbeidslivets spilleregler',
    description: 'Rettigheter, plikter og normer i arbeidslivet',
    route: '/learning/vg2/kultur/arbeidslivets-spilleregler',
    color: 'from-zinc-600/20 to-zinc-500/10 border-zinc-500/30',
    storageKey: 'learning-vg2-arbeidslivets-spilleregler',
    level: 'vg2',
    subject: 'kultur',
    presentationRoute: '/learning/presentations/partene-arbeidslivet',
  },
]

// ── ML1 Markedsføring og ledelse 1 (Studiespesialisering) ─────────────────────
const ML1_MODULES: ModuleCard[] = [
  {
    icon: '📚',
    title: 'Markedsføring som fag og tankesett',
    description: 'Fra salg til relasjonstenkning, Kodak vs Instagram',
    route: '/learning/ml1/markedsforingfag',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-ml1-markedsforingfag',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '🔍',
    title: 'Situasjonsanalyse',
    description: 'SWOT, PESTEL, Porters fem krefter og BCG-matrisen',
    route: '/learning/ml1/situasjonsanalyse',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-ml1-situasjonsanalyse',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/markedsplan',
  },
  {
    icon: '🛒',
    title: 'Forbrukeratferd',
    description: 'Kjøpsprosess, motivasjon og B2B vs B2C',
    route: '/learning/ml1/forbrukeratferd',
    color: 'from-purple-600/20 to-purple-500/10 border-purple-500/30',
    storageKey: 'learning-ml1-forbrukeratferd',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '🎯',
    title: 'Segmentering, målgruppe og posisjonering (STP)',
    description: 'De fire segmenteringskriteriene, targeting og persona',
    route: '/learning/ml1/stp',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-ml1-stp',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '📦',
    title: 'Produktstrategi',
    description: 'PLC, sortiment, merkevarearkitektur og emballasje',
    route: '/learning/ml1/produktstrategi',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-ml1-produktstrategi',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/konkurransemidlene',
  },
  {
    icon: '💰',
    title: 'Prisstrategi',
    description: 'Priselastisitet, prispsykologi og dynamisk prising',
    route: '/learning/ml1/prisstrategi',
    color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30',
    storageKey: 'learning-ml1-prisstrategi',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/prissetting',
  },
  {
    icon: '🚚',
    title: 'Distribusjonsstrategi',
    description: 'Kanaler, franchising, e-handel og omnikanal',
    route: '/learning/ml1/distribusjonsstrategi',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-ml1-distribusjonsstrategi',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/konkurransemidlene',
  },
  {
    icon: '📣',
    title: 'Markedskommunikasjon',
    description: 'AIDA, IMK, PR og innholdsmarkedsføring',
    route: '/learning/ml1/markedskommunikasjon',
    color: 'from-pink-600/20 to-pink-500/10 border-pink-500/30',
    storageKey: 'learning-ml1-markedskommunikasjon',
    level: 'ml1',
    subject: 'ml1',
    presentationRoute: '/learning/presentations/kampanje',
  },
]

export const ALL_MODULES = [...FD_VG1, ...MFI_VG1, ...KULTUR_VG1, ...FD_VG2, ...INNOVASJON_VG2, ...KULTUR_VG2, ...ML1_MODULES]

const SUBJECT_THUMBNAIL_STYLE: Record<ModuleCard['subject'], string> = {
  forretningsdrift: 'linear-gradient(135deg, #e1f5ee, #9fe1cb)',
  mfi: 'linear-gradient(135deg, #faeeda, #fac775)',
  kultur: 'linear-gradient(135deg, #eeedfe, #afa9ec)',
  ml1: 'linear-gradient(135deg, #e6f1fb, #b5d4f4)',
}

// const SUBJECT_LABELS: Record<ModuleCard['subject'], string> = {
//   forretningsdrift: 'Forretningsdrift',
//   mfi: 'Markedsføring og innovasjon',
//   kultur: 'Kultur og samhandling',
//   ml1: 'Markedsføring og ledelse 1',
// }

export interface ModuleSection {
  title: string
  icon: string
  level: ModuleCard['level']
  subject: ModuleCard['subject']
}

export const MODULE_SECTIONS: ModuleSection[] = [
  { title: 'Forretningsdrift — VG1',                            icon: '📦', level: 'vg1', subject: 'forretningsdrift' },
  { title: 'Markedsføring og innovasjon — VG1',                 icon: '📣', level: 'vg1', subject: 'mfi' },
  { title: 'Kultur og samhandling — VG1',                       icon: '🤝', level: 'vg1', subject: 'kultur' },
  { title: 'Forretningsdrift — VG2',                            icon: '📦', level: 'vg2', subject: 'forretningsdrift' },
  { title: 'Innovasjon og markedsføring — VG2',                 icon: '📣', level: 'vg2', subject: 'mfi' },
  { title: 'Kultur og kommunikasjon — VG2',                     icon: '🤝', level: 'vg2', subject: 'kultur' },
  { title: 'Markedsføring og ledelse 1 — Studiespesialisering', icon: '🎓', level: 'ml1', subject: 'ml1' },
]

// Which LearningHub subjects a student sees based on their classroom subject id
const STUDENT_SUBJECT_FILTER: Record<string, ModuleCard['subject'][]> = {
  mfl1:   ['ml1'],
  ssr_mi: ['forretningsdrift', 'mfi', 'kultur'],
  ssr_fd: ['forretningsdrift', 'mfi', 'kultur'],
  ent1:   ['forretningsdrift', 'mfi', 'kultur'],
}

type LevelFilter = 'alle' | 'vg1' | 'vg2' | 'ml1'
type SubjectFilter = 'alle' | ModuleCard['subject']
type SortOrder = 'standard' | 'az' | 'fullfort'
type AppTheme = 'dark' | 'light' | 'warm' | 'blue' | 'green'

const BG_PRESETS: { id: AppTheme; color: string; label: string }[] = [
  { id: 'dark',  color: '#0f172a', label: 'Mørk' },
  { id: 'light', color: '#ffffff', label: 'Lys' },
  { id: 'warm',  color: '#F5F0E8', label: 'Varm' },
  { id: 'blue',  color: '#EFF6FF', label: 'Blå' },
  { id: 'green', color: '#F0FDF4', label: 'Grønn' },
]

export function BgColorPicker() {
  const theme = useGameStore((s) => s.theme) ?? 'light'
  const setTheme = useGameStore((s) => s.setTheme)
  return (
    <div className="flex items-center gap-1.5" title="Velg bakgrunnsfarge">
      {BG_PRESETS.map((p) => (
        <button
          key={p.id}
          onClick={() => setTheme(p.id)}
          title={p.label}
          className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
            theme === p.id ? 'border-teal-400 scale-110' : 'border-slate-500/60'
          }`}
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  )
}

function getCompletion(storageKey?: string): boolean {
  if (!storageKey) return false
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return false
    return JSON.parse(raw)?.completed === true
  } catch {
    return false
  }
}

function getLastActivity(modules: ModuleCard[]): { title: string; date: string } | null {
  let latest: { title: string; date: string; ts: number } | null = null
  for (const mod of modules) {
    if (!mod.storageKey) continue
    try {
      const raw = localStorage.getItem(mod.storageKey)
      if (!raw) continue
      const data = JSON.parse(raw)
      if (data?.date) {
        const ts = new Date(data.date).getTime()
        if (!latest || ts > latest.ts) {
          latest = { title: mod.title, date: data.date, ts }
        }
      }
    } catch {
      // ignore
    }
  }
  if (!latest) return null
  const d = new Date(latest.date)
  const formatted = d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' })
  return { title: latest.title, date: formatted }
}

function ModuleCardButton({ mod }: { mod: ModuleCard }) {
  const navigate = useNavigate()
  const done = getCompletion(mod.storageKey)
  return (
    <motion.button
      onClick={() => navigate(mod.route)}
      whileHover={{ y: -2, boxShadow: '0 4px 14px rgba(0,0,0,0.10)' }}
      whileTap={{ scale: 0.99 }}
      layout
      className="relative text-left rounded-xl overflow-hidden flex flex-col cursor-pointer bg-white"
      style={{ border: '0.5px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      {/* Colored thumbnail 80px */}
      <div
        className="h-20 flex items-center justify-center relative shrink-0"
        style={{ background: SUBJECT_THUMBNAIL_STYLE[mod.subject] }}
      >
        <span className="text-2xl drop-shadow-sm">{mod.icon}</span>
        {done && (
          <span className="absolute top-2 right-2 text-[10px] font-medium text-white bg-emerald-500 px-2 py-0.5 rounded-full">
            Fullført
          </span>
        )}
      </div>
      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full self-start">
          {mod.level.toUpperCase()}
        </span>
        <h3 className="font-medium text-gray-900 text-[14px] leading-snug line-clamp-2">{mod.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{mod.description}</p>
      </div>
    </motion.button>
  )
}

function SectionProgressBar({ modules }: { modules: ModuleCard[] }) {
  const withKey = modules.filter(m => m.storageKey)
  if (withKey.length === 0) return null
  const done = withKey.filter(m => getCompletion(m.storageKey)).length
  const pct = Math.round((done / withKey.length) * 100)
  if (pct === 0) return null
  return (
    <div className="h-[3px] bg-gray-100 rounded-full mb-4">
      <div
        className="h-[3px] rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: '#0d9488' }}
      />
    </div>
  )
}

function Section({ title, modules }: { title: string; icon: string; modules: ModuleCard[] }) {
  if (modules.length === 0) return null
  const withKey = modules.filter(m => m.storageKey)
  const doneCount = withKey.filter(m => getCompletion(m.storageKey)).length
  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-900">{title}</h2>
        <span className="text-xs text-gray-400 shrink-0 ml-3">{modules.length} moduler · {doneCount}/{withKey.length} fullført</span>
      </div>
      <SectionProgressBar modules={modules} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {modules.map((mod) => (
          <ModuleCardButton key={mod.route} mod={mod} />
        ))}
      </div>
    </div>
  )
}

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
        active ? 'text-white' : 'bg-white text-gray-500 hover:text-gray-800'
      }`}
      style={active
        ? { backgroundColor: '#0d9488' }
        : { border: '0.5px solid rgba(0,0,0,0.12)' }
      }
    >
      {children}
    </button>
  )
}

function ProgressDashboard({ modules }: { modules: ModuleCard[] }) {
  const withKey = modules.filter(m => m.storageKey)
  const total = withKey.length
  const done = withKey.filter(m => getCompletion(m.storageKey)).length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  const vg1Modules = withKey.filter(m => m.level === 'vg1')
  const vg2Modules = withKey.filter(m => m.level === 'vg2')
  const ml1Modules = withKey.filter(m => m.level === 'ml1')

  const vg1Done = vg1Modules.filter(m => getCompletion(m.storageKey)).length
  const vg2Done = vg2Modules.filter(m => getCompletion(m.storageKey)).length
  const ml1Done = ml1Modules.filter(m => getCompletion(m.storageKey)).length

  const vg1Pct = vg1Modules.length > 0 ? Math.round((vg1Done / vg1Modules.length) * 100) : 0
  const vg2Pct = vg2Modules.length > 0 ? Math.round((vg2Done / vg2Modules.length) * 100) : 0
  const ml1Pct = ml1Modules.length > 0 ? Math.round((ml1Done / ml1Modules.length) * 100) : 0

  const lastActivity = getLastActivity(modules)

  if (done === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 pt-5"
    >
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest mb-0.5">Din fremgang</p>
            <p className="text-gray-900 font-medium text-lg">{done} av {total} moduler fullført</p>
          </div>
          <div className="text-3xl sm:text-4xl font-medium text-teal-600">{pct}%</div>
        </div>

        {/* Overall progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2">
          <motion.div
            className="bg-teal-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Per-level stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: 'VG1', done: vg1Done, total: vg1Modules.length, pct: vg1Pct, accent: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'VG2', done: vg2Done, total: vg2Modules.length, pct: vg2Pct, accent: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'ML1', done: ml1Done, total: ml1Modules.length, pct: ml1Pct, accent: 'text-amber-600', bg: 'bg-amber-50' },
          ].map(lvl => (
            <div key={lvl.label} className={`${lvl.bg} rounded-xl p-2 sm:p-3 text-center`}>
              <p className={`text-xs font-medium ${lvl.accent} mb-0.5`}>{lvl.label}</p>
              <p className="text-gray-900 font-medium text-sm">{lvl.pct}%</p>
              <p className="text-gray-400 text-[10px]">{lvl.done}/{lvl.total}</p>
            </div>
          ))}
        </div>

        {lastActivity && (
          <p className="text-xs text-gray-400">
            Siste aktivitet: <span className="text-gray-600 font-medium">{lastActivity.title}</span> — {lastActivity.date}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function LearningHub() {
  const navigate = useNavigate()

  // Student mode: read once at mount from localStorage
  const [studentSubject] = useState<string | null>(() => localStorage.getItem('adventure-student-subject'))
  const [studentCode]    = useState<string | null>(() => localStorage.getItem('student-classroom-code'))
  const isStudentMode = !!studentSubject
  const [studentName, setStudentName] = useState<string>(() => localStorage.getItem('student-name') ?? '')
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState('')

  const [levelFilter, setLevelFilter] = useState<LevelFilter>('alle')
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>('alle')
  const [sortOrder, setSortOrder] = useState<SortOrder>('standard')

  // Modules visible to the student (subject filter + teacher per-module overrides)
  const studentBaseModules: ModuleCard[] = useMemo(() => {
    if (!isStudentMode || !studentSubject) return ALL_MODULES
    const subjects = STUDENT_SUBJECT_FILTER[studentSubject] ?? []
    let teacherVis: Record<string, boolean> = {}
    if (studentCode) {
      try { teacherVis = JSON.parse(localStorage.getItem(`adventure-modules-${studentCode}`) ?? '{}') } catch { /* */ }
    }
    return ALL_MODULES.filter(m => subjects.includes(m.subject) && teacherVis[m.route] !== false)
  }, [isStudentMode, studentSubject, studentCode])

  const filteredAndSorted = useMemo(() => {
    // Student mode: no UI filters, already filtered by subject
    if (isStudentMode) return studentBaseModules

    let mods = ALL_MODULES.filter((m) => {
      if (levelFilter !== 'alle' && m.level !== levelFilter) return false
      if (subjectFilter !== 'alle' && m.subject !== subjectFilter) return false
      return true
    })

    if (sortOrder === 'az') {
      mods = [...mods].sort((a, b) => a.title.localeCompare(b.title, 'nb'))
    } else if (sortOrder === 'fullfort') {
      mods = [...mods].sort((a, b) => {
        const da = getCompletion(a.storageKey) ? 1 : 0
        const db = getCompletion(b.storageKey) ? 1 : 0
        return db - da
      })
    }

    return mods
  }, [studentBaseModules, levelFilter, subjectFilter, sortOrder, isStudentMode])

  // Sections: always shown in student mode; teacher mode only in standard sort
  const showSections = isStudentMode || sortOrder === 'standard'

  const sectionsToShow = useMemo(() => {
    return MODULE_SECTIONS
      .filter((g) => {
        if (isStudentMode) return true
        if (levelFilter !== 'alle' && g.level !== levelFilter) return false
        if (subjectFilter !== 'alle' && g.subject !== subjectFilter) return false
        return true
      })
      .map((g) => ({
        ...g,
        modules: filteredAndSorted.filter((m) => m.level === g.level && m.subject === g.subject),
      }))
      .filter((g) => g.modules.length > 0)
  }, [filteredAndSorted, levelFilter, subjectFilter, isStudentMode])

  // const totalCount = filteredAndSorted.length

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="bg-white px-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)', height: '52px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 w-full">
          <span className="text-base font-medium shrink-0" style={{ color: '#0d9488' }}>Businesslaben</span>
          {!isStudentMode && (
            <nav className="hidden sm:flex items-center gap-6">
              <span className="text-sm font-medium" style={{ color: '#0d9488', borderBottom: '2px solid #0d9488', paddingBottom: '2px' }}>Læringsmoduler</span>
              <button onClick={() => navigate('/teacher')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Lærer</button>
              <button onClick={() => navigate('/desktop')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Spillet</button>
              <button onClick={() => navigate('/student')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Elever →</button>
            </nav>
          )}
          <div className="flex items-center gap-2 shrink-0">
            {!isStudentMode && <ThemeToggle />}
          </div>
        </div>
      </div>

      {/* Student mode banner */}
      {isStudentMode && (
        <div className="bg-teal-50 border-b border-teal-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-teal-600 text-base">👤</span>
              {studentName && !editingName ? (
                <span className="text-sm text-teal-700">
                  Hei <strong>{studentName}</strong> · Klasse <strong className="tracking-wide">{studentCode}</strong>
                  <button
                    onClick={() => { setNameInput(studentName); setEditingName(true) }}
                    className="ml-2 text-teal-500 hover:text-teal-700 text-xs underline underline-offset-2"
                    title="Endre navn"
                  >
                    ✏️
                  </button>
                </span>
              ) : editingName ? (
                <span className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="Skriv inn ditt navn"
                    className="text-sm border border-teal-300 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter' && nameInput.trim()) {
                        const name = nameInput.trim()
                        localStorage.setItem('student-name', name)
                        setStudentName(name)
                        setEditingName(false)
                      }
                      if (e.key === 'Escape') setEditingName(false)
                    }}
                  />
                  <button
                    onClick={() => {
                      const name = nameInput.trim()
                      if (name) {
                        localStorage.setItem('student-name', name)
                        setStudentName(name)
                      }
                      setEditingName(false)
                    }}
                    className="text-xs bg-teal-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-teal-700"
                  >
                    Lagre
                  </button>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="Skriv inn ditt navn"
                    className="text-sm border border-teal-300 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && nameInput.trim()) {
                        const name = nameInput.trim()
                        localStorage.setItem('student-name', name)
                        setStudentName(name)
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const name = nameInput.trim()
                      if (name) {
                        localStorage.setItem('student-name', name)
                        setStudentName(name)
                      }
                    }}
                    className="text-xs bg-teal-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-teal-700"
                  >
                    Lagre
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('adventure-student-subject')
                localStorage.removeItem('student-classroom-code')
                localStorage.removeItem('student-name')
                navigate('/student-questions')
              }}
              className="text-xs text-teal-600 hover:text-teal-800 font-semibold underline underline-offset-2 shrink-0"
            >
              Bytt klasse
            </button>
          </div>
        </div>
      )}

      {/* Progress dashboard — shown when user has completions */}
      <ProgressDashboard modules={isStudentMode ? studentBaseModules : ALL_MODULES} />

      {/* Filter & Sort bar — teacher/browse mode only */}
      {!isStudentMode && <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">

          {/* Level filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-widest w-12 sm:w-14 shrink-0">Trinn</span>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              <FilterBtn active={levelFilter === 'alle'} onClick={() => setLevelFilter('alle')}>Alle</FilterBtn>
              <FilterBtn active={levelFilter === 'vg1'} onClick={() => setLevelFilter('vg1')}>VG1</FilterBtn>
              <FilterBtn active={levelFilter === 'vg2'} onClick={() => setLevelFilter('vg2')}>VG2</FilterBtn>
              <FilterBtn active={levelFilter === 'ml1'} onClick={() => setLevelFilter('ml1')}>ML1</FilterBtn>
            </div>
          </div>

          {/* Subject filter + Sort */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-widest w-12 sm:w-14 shrink-0">Fag</span>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap flex-1">
              <FilterBtn active={subjectFilter === 'alle'} onClick={() => setSubjectFilter('alle')}>Alle fag</FilterBtn>
              <FilterBtn active={subjectFilter === 'forretningsdrift'} onClick={() => setSubjectFilter('forretningsdrift')}>
                Forretning
              </FilterBtn>
              <FilterBtn active={subjectFilter === 'mfi'} onClick={() => setSubjectFilter('mfi')}>
                Markedsf.
              </FilterBtn>
              <FilterBtn active={subjectFilter === 'kultur'} onClick={() => setSubjectFilter('kultur')}>
                Kultur
              </FilterBtn>
              <FilterBtn active={subjectFilter === 'ml1'} onClick={() => setSubjectFilter('ml1')}>
                ML1
              </FilterBtn>
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mr-1 hidden sm:inline">Sorter</span>
              <button
                onClick={() => setSortOrder('standard')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortOrder === 'standard' ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setSortOrder('az')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortOrder === 'az' ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                A–Å
              </button>
              <button
                onClick={() => setSortOrder('fullfort')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortOrder === 'fullfort' ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                Fullført
              </button>
            </div>
          </div>
        </div>
      </div>}

      {/* Module list */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {showSections ? (
            <motion.div key="sections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {sectionsToShow.map((s, i) => (
                <div key={s.title}>
                  {/* VG2 divider */}
                  {i > 0 && sectionsToShow[i - 1].level === 'vg1' && s.level === 'vg2' && (isStudentMode || levelFilter === 'alle') && (
                    <div className="flex items-center gap-4 my-8 sm:my-10">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border border-gray-200 bg-white">
                        VG2
                      </span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                  )}
                  {/* ML1 divider */}
                  {i > 0 && sectionsToShow[i - 1].level !== 'ml1' && s.level === 'ml1' && (isStudentMode || levelFilter === 'alle') && (
                    <div className="flex items-center gap-4 my-8 sm:my-10">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border border-gray-200 bg-white">
                        Studiespesialisering
                      </span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                  )}
                  <Section title={s.title} icon={s.icon} modules={s.modules} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="flat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              {filteredAndSorted.map((mod) => (
                <ModuleCardButton key={mod.route} mod={mod} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">Ingen moduler matcher valgte filtre</p>
          </div>
        )}
      </div>

      {/* Glossary popup available from LearningHub */}
      <GlossaryPopup />
    </div>
  )
}
