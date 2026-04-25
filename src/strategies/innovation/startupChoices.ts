// ── Innovation Strategy: Startup Choices Data ─────────────────────────────────

import type { BransjeOption, FinansieringOption, PersonlighetOption } from './types'

export type { BransjeOption, FinansieringOption, PersonlighetOption }
// Alias used in StartupChoiceScreen
export type FinansjeringOption = FinansieringOption

export const BRANSJE_OPTIONS: BransjeOption[] = [
  {
    id: 'tech',
    navn: 'Tech-app',
    startkapital: 80_000,
    fordel: 'Skalerbar fra dag 1',
    ulempe: 'Krever utvikler-kompetanse',
    icon: '💻',
  },
  {
    id: 'baerekraftig',
    navn: 'Bærekraftig produkt',
    startkapital: 120_000,
    fordel: 'Lett å få medieomtale',
    ulempe: 'Lang produksjonstid',
    icon: '🌱',
  },
  {
    id: 'mat',
    navn: 'Mat & drikke',
    startkapital: 150_000,
    fordel: 'Lokalmarked tilgjengelig',
    ulempe: 'Lavere marginer',
    icon: '🍽️',
  },
  {
    id: 'tjeneste',
    navn: 'Tjeneste',
    startkapital: 60_000,
    fordel: 'Lavt kapitalbehov',
    ulempe: 'Vanskelig å skalere',
    icon: '🤝',
  },
  {
    id: 'hardware',
    navn: 'Hardware',
    startkapital: 200_000,
    fordel: 'Høy verdi per salg',
    ulempe: 'Lange leveransekjeder',
    icon: '🔧',
  },
]

export const FINANSIERING_OPTIONS: FinansieringOption[] = [
  {
    id: 'familie',
    navn: 'Familie',
    beloep: 50_000,
    bonus: 'Ingen renter',
    skjultKostnad: 'Setter tookFamilyLoan → fremtidige kriser',
    icon: '👨‍👩‍👧',
  },
  {
    id: 'bank',
    navn: 'Bank',
    beloep: 50_000,
    bonus: 'Profesjonelt nettverk',
    skjultKostnad: '8% rente, kvartalsrapporter',
    icon: '🏦',
  },
  {
    id: 'sparepenger',
    navn: 'Sparepenger',
    beloep: 30_000,
    bonus: '100% kontroll',
    skjultKostnad: 'Mindre buffer',
    icon: '🐷',
  },
  {
    id: 'crowdfund',
    navn: 'Crowdfunding',
    beloep: 75_000,
    bonus: '200 første kunder gratis',
    skjultKostnad: 'Må levere på løfter, mediepress',
    icon: '🌐',
  },
  {
    id: 'ingen',
    navn: 'Ingen ekstra',
    beloep: 0,
    bonus: 'Maks fleksibilitet',
    skjultKostnad: 'Kort runway fra start',
    icon: '🎯',
  },
]

export const PERSONLIGHET_OPTIONS: PersonlighetOption[] = [
  {
    id: 'tekniker',
    navn: 'Tekniker',
    bonus: 'Kan bygge MVP selv (-20 000 kr i kostnad)',
    ulempe: '-20% i salgssamtaler',
    icon: '⚙️',
    flagBonus: {},
  },
  {
    id: 'selger',
    navn: 'Selger',
    bonus: '+30% pitch-score',
    ulempe: 'Tech-investeringer koster mer',
    icon: '📈',
    flagBonus: {},
  },
  {
    id: 'kreativ',
    navn: 'Kreativ',
    bonus: 'Markedsføring +30% effekt',
    ulempe: 'Analytiske valg er vanskeligere',
    icon: '🎨',
    flagBonus: {},
  },
  {
    id: 'analytisk',
    navn: 'Analytisk',
    bonus: 'Bedre data i dashboards',
    ulempe: 'Saktere i pressede situasjoner',
    icon: '📊',
    flagBonus: {},
  },
  {
    id: 'nettverk',
    navn: 'Nettverk',
    bonus: 'Kjenner 3 ekstra NPCs i Kongsvinger',
    ulempe: 'Liten praktisk erfaring',
    icon: '🌐',
    flagBonus: { hasMentor: false }, // Økt sjanse for E003
  },
]
