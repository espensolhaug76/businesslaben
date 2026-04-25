import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import ThemeToggle from '../../components/ui/ThemeToggle'
import GlossaryPopup from '../../components/ui/GlossaryPopup'

export type Level = 'vg1' | 'vg2' | 'vg3'
export type Subject = 'ssr' | 'ml' | 'ent'
export type SsrSubject =
  | 'forretningsdrift' | 'mfi' | 'kultur'      // VG1
  | 'okonomi' | 'kommunikasjon' | 'hms'        // VG2

export interface ModuleCard {
  icon: string
  title: string
  description: string
  route: string
  color: string
  storageKey?: string
  level: Level
  subject: Subject
  ssrSubject?: SsrSubject
  presentationRoute?: string
}

// ── VG1 Forretningsdrift (uendret) ──────────────────────────────────────────────────────
const FD_VG1: ModuleCard[] = [
  {
    icon: '🏢',
    title: 'Ansvarsfordeling, roller og organisasjonskart',
    description: 'Roller, ansvar og organisasjonsstruktur',
    route: '/learning/forretningsdrift/organization',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-organization',
    level: 'vg1',
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
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
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
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
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
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
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
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
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
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
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
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
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
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
    subject: 'ssr',
    ssrSubject: 'forretningsdrift',
    presentationRoute: '/learning/presentations/regler-lovverk',
  },
]

// ── VG1 Markedsføring og innovasjon ───────────────────────────────────────────
const MFI_VG1: ModuleCard[] = [
  {
    icon: '🛍️',
    title: 'Produkt og behov',
    description: 'Kjerneproduktet, Maslow, livssyklus og sortiment',
    route: '/learning/mfi/produkt-behov',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-mfi-produkt-behov',
    level: 'vg1',
    subject: 'ssr',
    ssrSubject: 'mfi',
    presentationRoute: '/learning/presentations/produkt',
  },
  {
    icon: '💰',
    title: 'Prisstrategier',
    description: 'Kostnadsbasert, verdibasert, psykologisk prising og break-even',
    route: '/learning/mfi/prisstrategier',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-mfi-prisstrategier',
    level: 'vg1',
    subject: 'ssr',
    ssrSubject: 'mfi',
    presentationRoute: '/learning/presentations/prissetting',
  },
  {
    icon: '🚚',
    title: 'Distribusjon',
    description: 'Direkte/indirekte, distribusjonsgrad og omnikanal',
    route: '/learning/mfi/distribusjon',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-mfi-distribusjon',
    level: 'vg1',
    subject: 'ssr',
    ssrSubject: 'mfi',
    presentationRoute: '/learning/presentations/distribusjon',
  },
  {
    icon: '📣',
    title: 'Markedsføringskampanje',
    description: 'AIDA, mediekanaler og kampanjestrategi',
    route: '/learning/mfi/kommunikasjon-kanaler',
    color: 'from-pink-600/20 to-pink-500/10 border-pink-500/30',
    storageKey: 'learning-mfi-kommunikasjon-kanaler',
    level: 'vg1',
    subject: 'ssr',
    ssrSubject: 'mfi',
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
    subject: 'ssr',
    ssrSubject: 'mfi',
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
    subject: 'ssr',
    ssrSubject: 'mfi',
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
    subject: 'ssr',
    ssrSubject: 'mfi',
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
    subject: 'ssr',
    ssrSubject: 'mfi',
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
    subject: 'ssr',
    ssrSubject: 'mfi',
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
    subject: 'ssr',
    ssrSubject: 'mfi',
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
    subject: 'ssr',
    ssrSubject: 'kultur',
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
    subject: 'ssr',
    ssrSubject: 'kultur',
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
    subject: 'ssr',
    ssrSubject: 'kultur',
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
    subject: 'ssr',
    ssrSubject: 'kultur',
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
    subject: 'ssr',
    ssrSubject: 'kultur',
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
    subject: 'ssr',
    ssrSubject: 'kultur',
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
    subject: 'ssr',
    ssrSubject: 'kultur',
    presentationRoute: '/learning/presentations/konflikt-nod',
  },
]

// ── VG2 Økonomi og administrasjon ──────────────────────────────────────────────────────
const FD_VG2: ModuleCard[] = [
  {
    icon: '📑',
    title: 'Forretningsplan',
    description: 'Bygg en komplett og realistisk forretningsplan',
    route: '/learning/vg2/okonomi/forretningsplan',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-vg2-forretningsplan',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
    presentationRoute: '/learning/presentations/forretningsidee',
  },
  {
    icon: '💸',
    title: 'Lønn og personalkostnader',
    description: 'Beregn lønn, skatt og totale personalkostnader',
    route: '/learning/vg2/okonomi/lonn-personalkostnader',
    color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30',
    storageKey: 'learning-vg2-lonn-personalkostnader',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
    presentationRoute: '/learning/presentations/administrative-funksjoner',
  },
  {
    icon: '📈',
    title: 'Regnskapsanalyse',
    description: 'Les og tolk regnskap og nøkkeltall',
    route: '/learning/vg2/okonomi/regnskapsanalyse',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-vg2-regnskapsanalyse',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
    presentationRoute: '/learning/presentations/regnskap',
  },
  {
    icon: '🛡️',
    title: 'Svinnforebygging',
    description: 'Tiltak mot svinn og tap i varehandel',
    route: '/learning/vg2/okonomi/svinnforebygging',
    color: 'from-red-600/20 to-red-500/10 border-red-500/30',
    storageKey: 'learning-vg2-svinnforebygging',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
    presentationRoute: '/learning/presentations/verdikjeden',
  },
  {
    icon: '👥',
    title: 'Rekrutteringsprosesser',
    description: 'Fra jobbanalyse til onboarding — finn de rette menneskene',
    route: '/learning/vg2/okonomi/rekrutteringsprosesser',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-vg2-rekrutteringsprosesser',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
  },
  {
    icon: '📊',
    title: 'Nøkkeltall og lønnsomhet',
    description: 'Rentabilitet, likviditet, soliditet og dekningsgrad',
    route: '/learning/vg2/okonomi/nokkeltall-lonnsomhet',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-vg2-nokkeltall-lonnsomhet',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
  },
  {
    icon: '🌍',
    title: 'Bærekraft i verdikjeden',
    description: 'Scope 3, sporbarhet og Åpenhetsloven',
    route: '/learning/vg2/okonomi/baerekraft-verdikjede',
    color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30',
    storageKey: 'learning-vg2-baerekraft-verdikjede',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
  },
  {
    icon: '🌱',
    title: 'Trender, forretningsmodeller og bærekraft',
    description: 'Lokale trender og forretningsmodeller i et bærekraftsperspektiv',
    route: '/learning/vg2/okonomi/trender-forretningsmodeller',
    color: 'from-green-600/20 to-green-500/10 border-green-500/30',
    storageKey: 'learning-vg2-trender-forretningsmodeller',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
  },
  {
    icon: '🧮',
    title: 'Pris og kalkulasjon',
    description: 'Beregn pris på produkter og tjenester',
    route: '/learning/vg2/okonomi/pris-og-kalkulasjon',
    color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30',
    storageKey: 'learning-vg2-pris-og-kalkulasjon',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
  },
  {
    icon: '⚖️',
    title: 'Regelverk for servicebedrifter',
    description: 'Lover og regler som styrer drift av servicebedrifter',
    route: '/learning/vg2/okonomi/regelverk-servicebedrifter',
    color: 'from-slate-600/20 to-slate-500/10 border-slate-500/30',
    storageKey: 'learning-vg2-regelverk-servicebedrifter',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
  },
  {
    icon: '💻',
    title: 'Digitale system og kundeoppfølging',
    description: 'CRM, booking og digitale verktøy for kundehåndtering',
    route: '/learning/vg2/okonomi/digitale-system-kundeoppfolging',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-vg2-digitale-system-kundeoppfolging',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'okonomi',
  },
]

// ── VG2 Kommunikasjon og markedsføring ───────────────────────────────────────────
const INNOVASJON_VG2: ModuleCard[] = [
  {
    icon: '⭐',
    title: 'Merkevare',
    description: 'Bygg og posisjonér en sterk merkevare',
    route: '/learning/vg2/kommunikasjon/merkevare',
    color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30',
    storageKey: 'learning-vg2-merkevare',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
    presentationRoute: '/learning/presentations/forretningsidee',
  },
  {
    icon: '🔎',
    title: 'Markedsundersøkelse',
    description: 'Design og gjennomfør en markedsundersøkelse',
    route: '/learning/vg2/kommunikasjon/markedsundersokelse',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-vg2-markedsundersokelse',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
    presentationRoute: '/learning/presentations/markedsplan',
  },
  {
    icon: '✈️',
    title: 'Reiselivsprodukt',
    description: 'Utvikle og pakke reiselivsprodukter',
    route: '/learning/vg2/kommunikasjon/reiselivsprodukt',
    color: 'from-sky-600/20 to-sky-500/10 border-sky-500/30',
    storageKey: 'learning-vg2-reiselivsprodukt',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
    presentationRoute: '/learning/presentations/vertskapsrollen',
  },
  {
    icon: '📍',
    title: 'Posisjonering',
    description: 'Strategisk posisjonering i markedet',
    route: '/learning/vg2/kommunikasjon/posisjonering',
    color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30',
    storageKey: 'learning-vg2-posisjonering',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '🔺',
    title: 'Markedsføringstrekanten',
    description: 'Ekstern, intern og interaktiv markedsføring i tjenester',
    route: '/learning/vg2/kommunikasjon/markedsforingstrekan',
    color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',
    storageKey: 'learning-vg2-markedsforingstrekan',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
  },
  {
    icon: '💡',
    title: 'Innovasjon og produktutvikling',
    description: 'Fra idé til verdi — inkrementell og radikal innovasjon',
    route: '/learning/vg2/kommunikasjon/innovasjon-produktutvikling',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-vg2-innovasjon-produktutvikling',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
  },
  {
    icon: '📣',
    title: 'Markedsføringskampanjer',
    description: 'Forbrukeratferd, kanalvalg og datadrevet kampanje',
    route: '/learning/vg2/kommunikasjon/markedsforingskampanjer',
    color: 'from-pink-600/20 to-pink-500/10 border-pink-500/30',
    storageKey: 'learning-vg2-markedsforingskampanjer',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
  },
  {
    icon: '🤝',
    title: 'Salgsprosessen',
    description: 'FAB-modellen, behovsavdekking og 70/30-regelen',
    route: '/learning/vg2/kommunikasjon/salgsprosessen-vg2',
    color: 'from-green-600/20 to-green-500/10 border-green-500/30',
    storageKey: 'learning-vg2-salgsprosessen',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'kommunikasjon',
  },
]

// ── VG2 Helse, miljø og sikkerhet (tidl. Kultur og kommunikasjon) ───────────────────────────────────────────────
const KULTUR_VG2: ModuleCard[] = [
  {
    icon: '🎙️',
    title: 'Profesjonell kommunikasjon',
    description: 'Kommunikasjon i møter, presentasjoner og e-post',
    route: '/learning/vg2/kommunikasjon/profesjonell-kommunikasjon',
    color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/30',
    storageKey: 'learning-vg2-profesjonell-kommunikasjon',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
    presentationRoute: '/learning/presentations/kommunikasjon',
  },
  {
    icon: '🤜',
    title: 'Konflikthåndtering',
    description: 'Løs konflikter konstruktivt på arbeidsplassen',
    route: '/learning/vg2/hms/konflikthandtering',
    color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',
    storageKey: 'learning-vg2-konflikthandtering',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
    presentationRoute: '/learning/presentations/konflikt-nod',
  },
  {
    icon: '🧩',
    title: 'Etiske dilemmaer',
    description: 'Analyser og håndter krevende etiske situasjoner',
    route: '/learning/vg2/hms/etiske-dilemmaer',
    color: 'from-lime-600/20 to-lime-500/10 border-lime-500/30',
    storageKey: 'learning-vg2-etiske-dilemmaer',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
    presentationRoute: '/learning/presentations/etikk-baerekraft',
  },
  {
    icon: '🔍',
    title: 'Risikoanalyse',
    description: 'Identifiser og vurder risiko i en bedrift',
    route: '/learning/vg2/hms/risikoanalyse',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-vg2-risikoanalyse',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
    presentationRoute: '/learning/presentations/regler-lovverk',
  },
  {
    icon: '🌐',
    title: 'Internasjonale markeder',
    description: 'Kultur, kommunikasjon og handel over landegrenser',
    route: '/learning/vg2/kommunikasjon/internasjonale-markeder',
    color: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/30',
    storageKey: 'learning-vg2-internasjonale-markeder',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
    presentationRoute: '/learning/presentations/relasjonsbygging',
  },
  {
    icon: '📜',
    title: 'Arbeidslivets spilleregler',
    description: 'Rettigheter, plikter og normer i arbeidslivet',
    route: '/learning/vg2/okonomi/arbeidslivets-spilleregler',
    color: 'from-zinc-600/20 to-zinc-500/10 border-zinc-500/30',
    storageKey: 'learning-vg2-arbeidslivets-spilleregler',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
    presentationRoute: '/learning/presentations/partene-arbeidslivet',
  },
  {
    icon: '🚨',
    title: 'Beredskap og krisehåndtering',
    description: 'Beredskapsplaner, sikkerhetstiltak og krisekommunikasjon',
    route: '/learning/vg2/hms/beredskap',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-vg2-beredskap',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
  },
  {
    icon: '🚑',
    title: 'Førstehjelp og skadested',
    description: 'Livreddende førstehjelp og ansvar på et skadested',
    route: '/learning/vg2/hms/forstehjelp',
    color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',
    storageKey: 'learning-vg2-forstehjelp',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
  },
  {
    icon: '🔥',
    title: 'Brannvern og brannøving',
    description: 'Brannteori og gjennomføring av brannøvelse',
    route: '/learning/vg2/hms/brannvern',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-vg2-brannvern',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
  },
  {
    icon: '🦺',
    title: 'HMS-arbeid og roller',
    description: 'Systematisk HMS-arbeid, internkontroll og verneombud',
    route: '/learning/vg2/hms/hms-arbeid-roller',
    color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30',
    storageKey: 'learning-vg2-hms-arbeid-roller',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
  },
  {
    icon: '🔒',
    title: 'Digital sikkerhet og personvern',
    description: 'GDPR, personvern og cybersikkerhet i bedriften',
    route: '/learning/vg2/hms/digital-sikkerhet-personvern',
    color: 'from-slate-600/20 to-slate-500/10 border-slate-500/30',
    storageKey: 'learning-vg2-digital-sikkerhet-personvern',
    level: 'vg2',
    subject: 'ssr',
    ssrSubject: 'hms',
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
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '🔍',
    title: 'Situasjonsanalyse',
    description: 'SWOT, PESTEL, Porters fem krefter og BCG-matrisen',
    route: '/learning/ml1/situasjonsanalyse',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-ml1-situasjonsanalyse',
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/markedsplan',
  },
  {
    icon: '🛒',
    title: 'Forbrukeratferd',
    description: 'Kjøpsprosess, motivasjon og B2B vs B2C',
    route: '/learning/ml1/forbrukeratferd',
    color: 'from-purple-600/20 to-purple-500/10 border-purple-500/30',
    storageKey: 'learning-ml1-forbrukeratferd',
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '🎯',
    title: 'Segmentering, målgruppe og posisjonering (STP)',
    description: 'De fire segmenteringskriteriene, targeting og persona',
    route: '/learning/ml1/stp',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-ml1-stp',
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/forbrukeratferd',
  },
  {
    icon: '📦',
    title: 'Produktstrategi',
    description: 'PLC, sortiment, merkevarearkitektur og emballasje',
    route: '/learning/ml1/produktstrategi',
    color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30',
    storageKey: 'learning-ml1-produktstrategi',
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/konkurransemidlene',
  },
  {
    icon: '💰',
    title: 'Prisstrategi',
    description: 'Priselastisitet, prispsykologi og dynamisk prising',
    route: '/learning/ml1/prisstrategi',
    color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30',
    storageKey: 'learning-ml1-prisstrategi',
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/prissetting',
  },
  {
    icon: '🚚',
    title: 'Distribusjonsstrategi',
    description: 'Kanaler, franchising, e-handel og omnikanal',
    route: '/learning/ml1/distribusjonsstrategi',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-ml1-distribusjonsstrategi',
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/konkurransemidlene',
  },
  {
    icon: '📣',
    title: 'Markedskommunikasjon',
    description: 'AIDA, IMK, PR og innholdsmarkedsføring',
    route: '/learning/ml1/markedskommunikasjon',
    color: 'from-pink-600/20 to-pink-500/10 border-pink-500/30',
    storageKey: 'learning-ml1-markedskommunikasjon',
    level: 'vg2',
    subject: 'ml',
    presentationRoute: '/learning/presentations/kampanje',
  },
  {
    icon: '🏪',
    title: 'Markeder',
    description: 'Markedstyper, mellomledd og struktur — fra B2C og B2B til offentlige og internasjonale markeder.',
    route: '/learning/ml1/markeder',
    color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',
    storageKey: 'learning-ml1-markeder',
    level: 'vg2',
    subject: 'ml',
  },
  {
    icon: '🏛️',
    title: 'Profesjonelle markeder',
    description: 'B2B-markeder i dybden — innkjøpsenhet (DMU), anbudsprosesser og langsiktig relasjonsbygging.',
    route: '/learning/ml1/profesjonelle-markeder',
    color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',
    storageKey: 'learning-ml1-profesjonelle-markeder',
    level: 'vg2',
    subject: 'ml',
  },
  {
    icon: '🤝',
    title: 'Salg og personlig kommunikasjon',
    description: 'Personlig salg som relasjonsbygger — salgsprosessen, behovsanalyse, innvendingsbehandling, ikke-verbal kommunikasjon, mersalg og oppsalg.',
    route: '/learning/ml1/salg-personlig-kommunikasjon',
    color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30',
    storageKey: 'learning-ml1-salg-personlig-kommunikasjon',
    level: 'vg2',
    subject: 'ml',
  },
  {
    icon: '📺',
    title: 'Reklame og medieplanlegging',
    description: 'Strategisk synlighet — fra medieplanleggingens faser via dekning og frekvens til digital annonsering, influencer marketing og reklameetikk.',
    route: '/learning/ml1/reklame-medieplanlegging',
    color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',
    storageKey: 'learning-ml1-reklame-medieplanlegging',
    level: 'vg2',
    subject: 'ml',
  },
  {
    icon: '🌐',
    title: 'Direkte markedsføring og internett',
    description: 'En-til-en-kommunikasjon i digital tidsalder — SEO, SEM, innholdsmarkedsføring, sosiale medier, konvertering (CRO), big data og GDPR.',
    route: '/learning/ml1/direkte-markedsforing-internett',
    color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',
    storageKey: 'learning-ml1-direkte-markedsforing-internett',
    level: 'vg2',
    subject: 'ml',
  },
  {
    icon: '⚖️',
    title: 'Markedsføringens lovverk og etikk',
    description: 'Spillereglene i markedet — markedsføringsloven, angrerettloven, åpenhetsloven, beskyttelse av barn, grønnvasking og samfunnsansvar (CSR).',
    route: '/learning/ml1/markedsforings-lovverk-etikk',
    color: 'from-slate-600/20 to-slate-500/10 border-slate-500/30',
    storageKey: 'learning-ml1-markedsforings-lovverk-etikk',
    level: 'vg2',
    subject: 'ml',
  },
  {
    icon: '🏢',
    title: 'Organisering av markedsføringen',
    description: 'Struktur for gjennomføring — funksjonell, produktbasert, markedsbasert og prosjektorganisering, samt bedriftskultur og endringsledelse.',
    route: '/learning/ml1/organisering-markedsforing',
    color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30',
    storageKey: 'learning-ml1-organisering-markedsforing',
    level: 'vg2',
    subject: 'ml',
  },
]

// ── ML2 (VG3 Markedsføring og ledelse 2) ─────────────────────────────────────
const ML2_MODULES: ModuleCard[] = [
  { icon: '🎯', title: 'Strategisk planlegging',                           description: 'Fra visjon til handling — strategiprosessen som binder sammen marked, organisasjon og økonomi.', route: '/learning/ml2/strategisk-planlegging',                  color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',     storageKey: 'learning-ml2-strategisk-planlegging',                  level: 'vg3', subject: 'ml' },
  { icon: '🌟', title: 'Visjon og mål',                                    description: 'Visjon, forretningsidé og SMARTE mål — slik styres en bedrift mot ønsket fremtid.',           route: '/learning/ml2/visjon-og-mal',                            color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',     storageKey: 'learning-ml2-visjon-og-mal',                            level: 'vg3', subject: 'ml' },
  { icon: '🔍', title: 'Markeds- og bransjeanalyse',                       description: 'PESTEL, SWOT og Porters fem krefter — verktøyene for å forstå marked og konkurranse på dypt nivå.', route: '/learning/ml2/markeds-og-bransjeanalyse',               color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30', storageKey: 'learning-ml2-markeds-og-bransjeanalyse',                level: 'vg3', subject: 'ml' },
  { icon: '👤', title: 'Lederens rolle',                                   description: 'Lederstil, motivasjon og endringsledelse — hva som skiller en god leder fra en effektiv leder.', route: '/learning/ml2/lederens-rolle',                          color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',  storageKey: 'learning-ml2-lederens-rolle',                          level: 'vg3', subject: 'ml' },
  { icon: '🌱', title: 'Samfunnsansvar, bærekraft og omdømme',             description: 'CSR, ESG og Triple Bottom Line — bærekraft som strategisk fortrinn og omdømmebygger.',         route: '/learning/ml2/samfunnsansvar-baerekraft-omdomme',        color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30', storageKey: 'learning-ml2-samfunnsansvar-baerekraft-omdomme',     level: 'vg3', subject: 'ml' },
  { icon: '⚖️', title: 'Etikk i markedsføringen',                          description: 'Etiske dilemmaer i reklame, salg og dataetikk — grensen mellom påvirkning og manipulasjon.',  route: '/learning/ml2/etikk-i-markedsforingen',                 color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',     storageKey: 'learning-ml2-etikk-i-markedsforingen',                 level: 'vg3', subject: 'ml' },
  { icon: '⭐', title: 'Merkevarestrategi',                                description: 'Brand equity, merkevarearkitektur og posisjonering — hvordan sterke merker bygges over tid.',  route: '/learning/ml2/merkevarestrategi',                        color: 'from-pink-600/20 to-pink-500/10 border-pink-500/30',     storageKey: 'learning-ml2-merkevarestrategi',                        level: 'vg3', subject: 'ml' },
  { icon: '📦', title: 'Produktstrategi (avansert)',                       description: 'PLC, innovasjon og ettermarked — produktledelse på VG3-nivå med fokus på porteføljeteknikk.', route: '/learning/ml2/produktstrategi-avansert',                color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30', storageKey: 'learning-ml2-produktstrategi-avansert',                 level: 'vg3', subject: 'ml' },
  { icon: '💰', title: 'Prisstrategi (avansert)',                          description: 'Verdibasert prising, dynamiske modeller og prisdiskriminering — pris som strategisk styringsverktøy.', route: '/learning/ml2/prisstrategi-avansert',                color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',     storageKey: 'learning-ml2-prisstrategi-avansert',                    level: 'vg3', subject: 'ml' },
  { icon: '🚚', title: 'Distribusjonsstrategi (avansert)',                 description: 'Omnikanal, plattformøkonomi og direct-to-consumer — distribusjon som konkurransefortrinn.',     route: '/learning/ml2/distribusjonsstrategi-avansert',          color: 'from-blue-600/20 to-blue-500/10 border-blue-500/30',     storageKey: 'learning-ml2-distribusjonsstrategi-avansert',           level: 'vg3', subject: 'ml' },
  { icon: '📣', title: 'Kommunikasjonsstrategier',                         description: 'IMC, digital kundereise og innholdsmarkedsføring — å nå riktig kunde med riktig budskap.',     route: '/learning/ml2/kommunikasjonsstrategier',                color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30', storageKey: 'learning-ml2-kommunikasjonsstrategier',                 level: 'vg3', subject: 'ml' },
  { icon: '📊', title: 'Markedsmiks og effektmåling',                      description: 'KPI, ROI og ROAS — hvordan måle om markedsføringen faktisk virker, og styre etter data.',      route: '/learning/ml2/markedsmiks-og-effektmaling',             color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',  storageKey: 'learning-ml2-markedsmiks-og-effektmaling',              level: 'vg3', subject: 'ml' },
  { icon: '🏢', title: 'Organisering og ledelse (strategisk)',             description: 'Organisasjonsstruktur, kultur og endringsledelse — slik støtter organisasjonen strategien.',  route: '/learning/ml2/organisering-og-ledelse-strategisk',      color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/30', storageKey: 'learning-ml2-organisering-og-ledelse-strategisk',    level: 'vg3', subject: 'ml' },
  { icon: '👥', title: 'Personaladministrasjon og HRM',                    description: 'Rekruttering, kompetanseutvikling og lønn — strategisk human resource management i praksis.', route: '/learning/ml2/personaladministrasjon-hrm',              color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/30',     storageKey: 'learning-ml2-personaladministrasjon-hrm',               level: 'vg3', subject: 'ml' },
  { icon: '🌐', title: 'Internasjonal markedsføring',                      description: 'Eksport, kulturforståelse og global merkevarebygging — markedsføring over landegrenser.',     route: '/learning/ml2/internasjonal-markedsforing',             color: 'from-pink-600/20 to-pink-500/10 border-pink-500/30',     storageKey: 'learning-ml2-internasjonal-markedsforing',              level: 'vg3', subject: 'ml' },
  { icon: '📈', title: 'Økonomistyring, kalkulasjon og budsjettering',     description: 'Bidragskalkyle, selvkost og budsjettoppfølging — økonomistyring som beslutningsgrunnlag.',     route: '/learning/ml2/okonomistyring-kalkulasjon-budsjettering', color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30', storageKey: 'learning-ml2-okonomistyring-kalkulasjon-budsjettering', level: 'vg3', subject: 'ml' },
  { icon: '📋', title: 'Markedsplanen',                                    description: 'Den helhetlige markedsplanen — slik bindes analyse, mål, strategi, tiltak og budsjett sammen.', route: '/learning/ml2/markedsplanen',                            color: 'from-teal-600/20 to-teal-500/10 border-teal-500/30',     storageKey: 'learning-ml2-markedsplanen',                            level: 'vg3', subject: 'ml' },
]

// ── ENT1 (VG2 Entreprenørskap 1) ─────────────────────────────────────────────
const ENT1_MODULES: ModuleCard[] = [
  { icon: '🧑‍💼', title: 'Innovatøren og entreprenøren',          description: 'Hvem er entreprenøren, hvilke egenskaper kjennetegner innovatøren, og hva driver folk til å starte for seg selv.', route: '/learning/ent1/innovatoren-og-entreprenoren', color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',   storageKey: 'learning-ent1-innovatoren-og-entreprenoren', level: 'vg2', subject: 'ent' },
  { icon: '💡',     title: 'Kreativitet og idéutvikling',           description: 'Idémyldring, design thinking og hvordan en god forretningsidé kjennes igjen tidlig.',                                  route: '/learning/ent1/kreativitet-ideutvikling',     color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30', storageKey: 'learning-ent1-kreativitet-ideutvikling',     level: 'vg2', subject: 'ent' },
  { icon: '🎯',     title: 'Behov, marked og segmentering',         description: 'Identifiser et reelt kundebehov, beskriv målgruppen og test ideen mot faktisk marked.',                              route: '/learning/ent1/behov-marked-segmentering',    color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30', storageKey: 'learning-ent1-behov-marked-segmentering',    level: 'vg2', subject: 'ent' },
  { icon: '🗺️',    title: 'Forretningsmodell og BMC',              description: 'Business Model Canvas — verktøyet som kondenserer en forretningsidé til ni byggeklosser.',                          route: '/learning/ent1/forretningsmodell-bmc',        color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',     storageKey: 'learning-ent1-forretningsmodell-bmc',        level: 'vg2', subject: 'ent' },
  { icon: '🏛️',    title: 'Etablering og selskapsformer',          description: 'AS, ENK eller ANS? Slik velger du riktig selskapsform og kommer deg gjennom Brønnøysund.',                          route: '/learning/ent1/etablering-selskapsformer',    color: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/30', storageKey: 'learning-ent1-etablering-selskapsformer', level: 'vg2', subject: 'ent' },
  { icon: '💰',     title: 'Finansiering og tilskudd',              description: 'Egenkapital, lån, Innovasjon Norge og crowdfunding — finansieringskildene en gründer bør kjenne.',                  route: '/learning/ent1/finansiering-tilskudd',        color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',   storageKey: 'learning-ent1-finansiering-tilskudd',        level: 'vg2', subject: 'ent' },
  { icon: '📊',     title: 'Økonomisk planlegging og budsjett',     description: 'Likviditetsbudsjett, resultatbudsjett og break-even — slik holder du styr på pengene fra dag én.',                  route: '/learning/ent1/okonomisk-planlegging-budsjett', color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30', storageKey: 'learning-ent1-okonomisk-planlegging-budsjett', level: 'vg2', subject: 'ent' },
  { icon: '📣',     title: 'Markedsføring og salg for nystartede',  description: 'Lavbudsjett-markedsføring, første salg og kundeanskaffelse når merkevaren er ukjent.',                                route: '/learning/ent1/markedsforing-salg-nystartede', color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30', storageKey: 'learning-ent1-markedsforing-salg-nystartede', level: 'vg2', subject: 'ent' },
  { icon: '⚖️',    title: 'Lovverk, avtaler og HMS',               description: 'Aksjeloven, avtaler med kunder og leverandører, og HMS-krav fra første ansatt.',                                     route: '/learning/ent1/lovverk-avtaler-hms',          color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',     storageKey: 'learning-ent1-lovverk-avtaler-hms',          level: 'vg2', subject: 'ent' },
  { icon: '🤝',     title: 'Samarbeid og teambygging',              description: 'Cofoundere, ansvarsfordeling og teamdynamikk — slik unngår dere konflikter som dreper bedriften.',                  route: '/learning/ent1/samarbeid-teambygging',        color: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/30', storageKey: 'learning-ent1-samarbeid-teambygging',     level: 'vg2', subject: 'ent' },
]

// ── ENT2 (VG3 Entreprenørskap 2) ─────────────────────────────────────────────
const ENT2_MODULES: ModuleCard[] = [
  { icon: '📈',  title: 'Strategisk planlegging for vekst',                description: 'Fra etablert drift til skalerbar bedrift — strategisk planlegging i vekstfase.',                              route: '/learning/ent2/strategisk-planlegging-vekst',           color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',   storageKey: 'learning-ent2-strategisk-planlegging-vekst',           level: 'vg3', subject: 'ent' },
  { icon: '🚀',  title: 'Forretningsutvikling og skalering',               description: 'Pivotering, nye markeder og hvordan skalere uten å miste kvalitet eller kultur.',                              route: '/learning/ent2/forretningsutvikling-skalering',          color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30', storageKey: 'learning-ent2-forretningsutvikling-skalering',          level: 'vg3', subject: 'ent' },
  { icon: '🔍',  title: 'Markedsanalyse og posisjonering',                 description: 'Avansert markedsanalyse og strategisk posisjonering for vekstbedrifter.',                                       route: '/learning/ent2/markedsanalyse-posisjonering',           color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30', storageKey: 'learning-ent2-markedsanalyse-posisjonering',           level: 'vg3', subject: 'ent' },
  { icon: '🏢',  title: 'Ledelse og organisasjonskultur',                  description: 'Lederrollen i en voksende bedrift — bygging av kultur som tåler skala.',                                       route: '/learning/ent2/ledelse-organisasjonskultur',            color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',     storageKey: 'learning-ent2-ledelse-organisasjonskultur',            level: 'vg3', subject: 'ent' },
  { icon: '👥',  title: 'Personaladministrasjon og HRM (strategisk)',     description: 'Strategisk HRM — rekruttering, utvikling og fastholdelse av nøkkelkompetanse.',                                 route: '/learning/ent2/personaladministrasjon-hrm-strategisk',  color: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/30', storageKey: 'learning-ent2-personaladministrasjon-hrm-strategisk', level: 'vg3', subject: 'ent' },
  { icon: '📊',  title: 'Investeringsanalyse og lønnsomhet',               description: 'Beslutningsverktøy for investeringer — tidsverdien av penger, NPV, internrente, payback, risikojustert avkastning og følsomhetsanalyse.', route: '/learning/ent2/investeringsanalyse',                color: 'from-amber-600/20 to-amber-500/10 border-amber-500/30',   storageKey: 'learning-ent2-investeringsanalyse',                  level: 'vg3', subject: 'ent' },
  { icon: '💸',  title: 'Likviditetsstyring og finansrisiko',              description: 'Bedriftens kontantflyt under vekst — arbeidskapital, VC/PE/IPO, lånefinansiering, leasing, kapitalstruktur og valuta-/renterisiko.', route: '/learning/ent2/likviditetsstyring-finansrisiko',     color: 'from-orange-600/20 to-orange-500/10 border-orange-500/30', storageKey: 'learning-ent2-likviditetsstyring-finansrisiko',      level: 'vg3', subject: 'ent' },
  { icon: '🌱',  title: 'CSR og etikk',                                    description: 'Corporate social responsibility, etiske dilemmaer og bærekraftsrapportering for vekstbedrifter.',           route: '/learning/ent2/csr-etikk',                              color: 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30', storageKey: 'learning-ent2-csr-etikk',                              level: 'vg3', subject: 'ent' },
  { icon: '🌐',  title: 'Internasjonalisering og eksport',                 description: 'Veien ut av Norge — markedsvalg, eksportstrategier og tilpasning til nye kulturer.',                          route: '/learning/ent2/internasjonalisering-eksport',           color: 'from-rose-600/20 to-rose-500/10 border-rose-500/30',     storageKey: 'learning-ent2-internasjonalisering-eksport',           level: 'vg3', subject: 'ent' },
  { icon: '⚖️', title: 'Jus og tvisteløsning',                            description: 'Avtalerett, immaterielle rettigheter og tvisteløsning når konflikter oppstår.',                                route: '/learning/ent2/jus-tvistelosning',                      color: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/30', storageKey: 'learning-ent2-jus-tvistelosning',                      level: 'vg3', subject: 'ent' },
  { icon: '📋',  title: 'Markedsplanen for etablerte bedrifter',           description: 'Den strategiske markedsplanen — hensikt, innhold, TOWS-matrise, SMART-mål med KPIer, ressursallokering, årshjul og oppfølging.', route: '/learning/ent2/markedsplanen-etablerte-bedrifter',  color: 'from-violet-600/20 to-violet-500/10 border-violet-500/30', storageKey: 'learning-ent2-markedsplanen-etablerte-bedrifter',    level: 'vg3', subject: 'ent' },
]

export const ALL_MODULES = [
  ...FD_VG1, ...MFI_VG1, ...KULTUR_VG1,
  ...FD_VG2, ...INNOVASJON_VG2, ...KULTUR_VG2,
  ...ML1_MODULES, ...ENT1_MODULES,
  ...ML2_MODULES, ...ENT2_MODULES,
]

// SSR-fag (underfag) har distinkt farge per fag — ML/ENT har én farge per hovedfag.
const SSR_THUMBNAIL_STYLE: Record<SsrSubject, string> = {
  forretningsdrift: 'linear-gradient(135deg, #e1f5ee, #9fe1cb)',
  mfi:              'linear-gradient(135deg, #faeeda, #fac775)',
  kultur:           'linear-gradient(135deg, #eeedfe, #afa9ec)',
  okonomi:          'linear-gradient(135deg, #e1f5ee, #9fe1cb)',
  kommunikasjon:    'linear-gradient(135deg, #faeeda, #fac775)',
  hms:              'linear-gradient(135deg, #ffe4e6, #fda4af)',
}

const SUBJECT_THUMBNAIL_STYLE: Record<Subject, string> = {
  ssr: 'linear-gradient(135deg, #f3f4f6, #d1d5db)',
  ml:  'linear-gradient(135deg, #e6f1fb, #b5d4f4)',
  ent: 'linear-gradient(135deg, #fef3c7, #fcd34d)',
}

function getThumbnailStyle(mod: ModuleCard): string {
  if (mod.subject === 'ssr' && mod.ssrSubject) return SSR_THUMBNAIL_STYLE[mod.ssrSubject]
  return SUBJECT_THUMBNAIL_STYLE[mod.subject]
}

export interface ModuleSection {
  title: string
  icon: string
  level: Level
  subject: Subject
  ssrSubject?: SsrSubject
}

export const MODULE_SECTIONS: ModuleSection[] = [
  // VG1 SSR
  { title: 'Forretningsdrift — VG1',                            icon: '📦', level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { title: 'Markedsføring og innovasjon — VG1',                 icon: '📣', level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { title: 'Kultur og samhandling — VG1',                       icon: '🤝', level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  // VG2 SSR
  { title: 'Økonomi og administrasjon — VG2',                   icon: '📦', level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { title: 'Kommunikasjon og markedsføring — VG2',              icon: '📣', level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { title: 'Helse, miljø og sikkerhet — VG2',                   icon: '🦺', level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  // VG2 Studiespesialisering
  { title: 'Markedsføring og ledelse 1 — Studiespesialisering', icon: '🎓', level: 'vg2', subject: 'ml' },
  { title: 'Entreprenørskap 1 — Studiespesialisering',          icon: '🚀', level: 'vg2', subject: 'ent' },
  // VG3 Studiespesialisering
  { title: 'Markedsføring og ledelse 2 — VG3',                  icon: '🎓', level: 'vg3', subject: 'ml' },
  { title: 'Entreprenørskap 2 — VG3',                           icon: '🚀', level: 'vg3', subject: 'ent' },
]

// Which LearningHub subjects a student sees based on their classroom subject id
const STUDENT_SUBJECT_FILTER: Record<string, Subject[]> = {
  mfl1:   ['ml'],
  ssr_mi: ['ssr'],
  ssr_fd: ['ssr'],
  ent1:   ['ssr'],
}

type LevelFilter = 'alle' | Level
type SubjectFilter = 'alle' | Subject
type SsrSubjectFilter = 'alle' | SsrSubject
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
        style={{ background: getThumbnailStyle(mod) }}
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
  disabled = false,
  comingSoon = false,
  children,
}: {
  active: boolean
  onClick: () => void
  disabled?: boolean
  comingSoon?: boolean
  children: React.ReactNode
}) {
  const handleClick = () => { if (!disabled) onClick() }
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
        disabled
          ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
          : active
            ? 'text-white'
            : 'bg-white text-gray-500 hover:text-gray-800'
      }`}
      style={
        disabled
          ? { border: '0.5px solid rgba(0,0,0,0.06)', opacity: 0.6 }
          : active
            ? { backgroundColor: '#0d9488' }
            : { border: '0.5px solid rgba(0,0,0,0.12)' }
      }
    >
      {children}
      {comingSoon && (
        <span className="ml-1 inline-block text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-gray-400 align-middle">
          Kommer
        </span>
      )}
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
  const vg3Modules = withKey.filter(m => m.level === 'vg3')

  const vg1Done = vg1Modules.filter(m => getCompletion(m.storageKey)).length
  const vg2Done = vg2Modules.filter(m => getCompletion(m.storageKey)).length
  const vg3Done = vg3Modules.filter(m => getCompletion(m.storageKey)).length

  const vg1Pct = vg1Modules.length > 0 ? Math.round((vg1Done / vg1Modules.length) * 100) : 0
  const vg2Pct = vg2Modules.length > 0 ? Math.round((vg2Done / vg2Modules.length) * 100) : 0
  const vg3Pct = vg3Modules.length > 0 ? Math.round((vg3Done / vg3Modules.length) * 100) : 0

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
            { label: 'VG3', done: vg3Done, total: vg3Modules.length, pct: vg3Pct, accent: 'text-amber-600', bg: 'bg-amber-50' },
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
  const [ssrSubjectFilter, setSsrSubjectFilter] = useState<SsrSubjectFilter>('alle')
  const [sortOrder, setSortOrder] = useState<SortOrder>('standard')

  // Reset underfag når fag eller trinn endres så valgt SSR-underfag ikke "låner seg" videre
  const selectLevel = (l: LevelFilter) => { setLevelFilter(l); setSsrSubjectFilter('alle') }
  const selectSubject = (s: SubjectFilter) => { setSubjectFilter(s); setSsrSubjectFilter('alle') }

  // Hva slags fag/underfag finnes faktisk for valgt trinn? (Brukes til disabled/Kommer-knapper.)
  const moduleCounts = useMemo(() => {
    const inLevel = (m: ModuleCard) => levelFilter === 'alle' || m.level === levelFilter
    return {
      ssr:           ALL_MODULES.filter(m => inLevel(m) && m.subject === 'ssr').length,
      ml:            ALL_MODULES.filter(m => inLevel(m) && m.subject === 'ml').length,
      ent:           ALL_MODULES.filter(m => inLevel(m) && m.subject === 'ent').length,
      forretningsdrift: ALL_MODULES.filter(m => inLevel(m) && m.ssrSubject === 'forretningsdrift').length,
      mfi:              ALL_MODULES.filter(m => inLevel(m) && m.ssrSubject === 'mfi').length,
      kultur:           ALL_MODULES.filter(m => inLevel(m) && m.ssrSubject === 'kultur').length,
      okonomi:          ALL_MODULES.filter(m => inLevel(m) && m.ssrSubject === 'okonomi').length,
      kommunikasjon:    ALL_MODULES.filter(m => inLevel(m) && m.ssrSubject === 'kommunikasjon').length,
      hms:              ALL_MODULES.filter(m => inLevel(m) && m.ssrSubject === 'hms').length,
    }
  }, [levelFilter])

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
      if (ssrSubjectFilter !== 'alle' && m.ssrSubject !== ssrSubjectFilter) return false
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
  }, [studentBaseModules, levelFilter, subjectFilter, ssrSubjectFilter, sortOrder, isStudentMode])

  // Sections: always shown in student mode; teacher mode only in standard sort
  const showSections = isStudentMode || sortOrder === 'standard'

  const sectionsToShow = useMemo(() => {
    return MODULE_SECTIONS
      .filter((g) => {
        if (isStudentMode) return true
        if (levelFilter !== 'alle' && g.level !== levelFilter) return false
        if (subjectFilter !== 'alle' && g.subject !== subjectFilter) return false
        if (ssrSubjectFilter !== 'alle' && g.ssrSubject !== ssrSubjectFilter) return false
        return true
      })
      .map((g) => ({
        ...g,
        modules: filteredAndSorted.filter((m) =>
          m.level === g.level &&
          m.subject === g.subject &&
          (g.ssrSubject ? m.ssrSubject === g.ssrSubject : true)
        ),
      }))
      .filter((g) => g.modules.length > 0)
  }, [filteredAndSorted, levelFilter, subjectFilter, ssrSubjectFilter, isStudentMode])

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

          {/* Trinn-rad */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-widest w-14 sm:w-16 shrink-0">Trinn</span>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              <FilterBtn active={levelFilter === 'alle'} onClick={() => selectLevel('alle')}>Alle</FilterBtn>
              <FilterBtn active={levelFilter === 'vg1'} onClick={() => selectLevel('vg1')}>VG1</FilterBtn>
              <FilterBtn active={levelFilter === 'vg2'} onClick={() => selectLevel('vg2')}>VG2</FilterBtn>
              <FilterBtn active={levelFilter === 'vg3'} onClick={() => selectLevel('vg3')}>VG3</FilterBtn>
            </div>
          </div>

          {/* Fag-rad — kontekstavhengig basert på trinn-valg.
              Fag uten innhold for valgt trinn vises som disabled med "Kommer"-badge. */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-widest w-14 sm:w-16 shrink-0">Fag</span>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap flex-1">
              <FilterBtn active={subjectFilter === 'alle'} onClick={() => selectSubject('alle')}>Alle fag</FilterBtn>
              {/* SSR vises bare for VG1/VG2 — ikke for VG3 */}
              {(levelFilter === 'alle' || levelFilter === 'vg1' || levelFilter === 'vg2') && (
                <FilterBtn
                  active={subjectFilter === 'ssr'}
                  onClick={() => selectSubject('ssr')}
                  disabled={moduleCounts.ssr === 0}
                  comingSoon={moduleCounts.ssr === 0}
                >
                  SSR
                </FilterBtn>
              )}
              {/* M&L: VG2 = M&L1, VG3 = M&L2 */}
              {(levelFilter === 'alle' || levelFilter === 'vg2' || levelFilter === 'vg3') && (
                <FilterBtn
                  active={subjectFilter === 'ml'}
                  onClick={() => selectSubject('ml')}
                  disabled={moduleCounts.ml === 0}
                  comingSoon={moduleCounts.ml === 0}
                >
                  {levelFilter === 'vg3' ? 'M&L2' : levelFilter === 'vg2' ? 'M&L1' : 'M&L'}
                </FilterBtn>
              )}
              {/* ENT: VG2 = ENT1, VG3 = ENT2 */}
              {(levelFilter === 'alle' || levelFilter === 'vg2' || levelFilter === 'vg3') && (
                <FilterBtn
                  active={subjectFilter === 'ent'}
                  onClick={() => selectSubject('ent')}
                  disabled={moduleCounts.ent === 0}
                  comingSoon={moduleCounts.ent === 0}
                >
                  {levelFilter === 'vg3' ? 'ENT2' : levelFilter === 'vg2' ? 'ENT1' : 'ENT'}
                </FilterBtn>
              )}
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

          {/* Underfag-rad — vises kun når SSR er valgt. Skiller VG1- og VG2-underfag basert på trinn. */}
          {subjectFilter === 'ssr' && (levelFilter === 'alle' || levelFilter === 'vg1' || levelFilter === 'vg2') && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-widest w-14 sm:w-16 shrink-0">SSR</span>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap flex-1">
                <FilterBtn active={ssrSubjectFilter === 'alle'} onClick={() => setSsrSubjectFilter('alle')}>Alle SSR</FilterBtn>
                {(levelFilter === 'alle' || levelFilter === 'vg1') && <>
                  <FilterBtn
                    active={ssrSubjectFilter === 'forretningsdrift'}
                    onClick={() => setSsrSubjectFilter('forretningsdrift')}
                    disabled={moduleCounts.forretningsdrift === 0}
                  >Forretningsdrift</FilterBtn>
                  <FilterBtn
                    active={ssrSubjectFilter === 'mfi'}
                    onClick={() => setSsrSubjectFilter('mfi')}
                    disabled={moduleCounts.mfi === 0}
                  >MFI</FilterBtn>
                  <FilterBtn
                    active={ssrSubjectFilter === 'kultur'}
                    onClick={() => setSsrSubjectFilter('kultur')}
                    disabled={moduleCounts.kultur === 0}
                  >Kultur</FilterBtn>
                </>}
                {(levelFilter === 'alle' || levelFilter === 'vg2') && <>
                  <FilterBtn
                    active={ssrSubjectFilter === 'okonomi'}
                    onClick={() => setSsrSubjectFilter('okonomi')}
                    disabled={moduleCounts.okonomi === 0}
                  >Økonomi</FilterBtn>
                  <FilterBtn
                    active={ssrSubjectFilter === 'kommunikasjon'}
                    onClick={() => setSsrSubjectFilter('kommunikasjon')}
                    disabled={moduleCounts.kommunikasjon === 0}
                  >Kommunikasjon</FilterBtn>
                  <FilterBtn
                    active={ssrSubjectFilter === 'hms'}
                    onClick={() => setSsrSubjectFilter('hms')}
                    disabled={moduleCounts.hms === 0}
                  >HMS</FilterBtn>
                </>}
              </div>
            </div>
          )}
        </div>
      </div>}

      {/* Module list */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {showSections ? (
            <motion.div key="sections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {sectionsToShow.map((s, i) => {
                const prev = i > 0 ? sectionsToShow[i - 1] : null
                const showDivider = isStudentMode || levelFilter === 'alle'
                // Trinn-skifte (VG1 → VG2 → VG3)
                const levelChanged = prev && prev.level !== s.level
                // Innen samme trinn: SSR → ML/ENT (studiespesialisering)
                const subjectChanged = prev && prev.level === s.level && prev.subject !== s.subject
                let dividerLabel: string | null = null
                if (showDivider && levelChanged) {
                  dividerLabel = s.level.toUpperCase()
                } else if (showDivider && subjectChanged) {
                  if (s.subject === 'ml')  dividerLabel = 'Studiespesialisering — Markedsføring og ledelse'
                  if (s.subject === 'ent') dividerLabel = 'Entreprenørskap'
                }
                return (
                  <div key={s.title}>
                    {dividerLabel && (
                      <div className="flex items-center gap-4 my-8 sm:my-10">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border border-gray-200 bg-white">
                          {dividerLabel}
                        </span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                    )}
                    <Section title={s.title} icon={s.icon} modules={s.modules} />
                  </div>
                )
              })}
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
