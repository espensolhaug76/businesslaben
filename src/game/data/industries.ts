// ─── AdVenture 3.0 — Industry Catalog ────────────────────────────────────
// Product templates (before ordering) per industry.
// Én vare = ETT costPrice + ETT markedsPris (se Prisflyt-opprydding
// 2026-07-06: tier-per-vare er PARKET, ikke slettet — se `tiers` under).

import type { Industry, Product, ProductCategory } from '../types'

export interface IndustryCatalogItem {
  id: string
  name: string
  icon: string
  maxDemandPerMonth: number // at recommended price + middels location
  quality: number        // 1-10
  sustainability: number // 1-10
  /** Egnet for vindusutstilling — utelatt = true. Drikkevarer i kopp/glass
   *  (kaffe, smoothie, te) er false: urealistisk i et butikkvindu. */
  windowDisplay?: boolean
  /** Varegruppe (frokost/lunsj/brod/kaker/drikke). */
  category?: ProductCategory
  /** Filsti til vare-utklipp (fra split-product-sheet). Undefined ⇒ placeholder. */
  sprite?: string
  /** true = trau-vare (mat i disk-monterens trau). Drikke = false. */
  trauVare?: boolean
  /** Trau-flis-størrelse for DENNE varen (multiplikator, default 1.0) —
   *  flis-størrelse i monteren = trauets egen skala × displayScale. Ulike
   *  varer har ulik fysisk størrelse (et brød ≠ en croissant), så dette
   *  justeres per vare, ikke per trau. */
  displayScale?: number
  /** Trau-flis-rotasjon for DENNE varen i grader (default 0°) — lagt til
   *  flisens egen små jitter-rotasjon. Brukes for avlange varer (baguette
   *  o.l.) som naturlig ligger på skrå i trauet. */
  displayRotation?: number
  /** Innkjøpspris (kr) — DEN ene prisen varen kjøpes inn for. Leses av
   *  catalogToProduct() og ProdukterTab-bestillingen. */
  costPrice: number
  /** Anbefalt utsalgspris (kr) — startverdi for elevens `retailPrice`
   *  (Product), IKKE en fast pris. Elevens Priser-fane skriver over denne. */
  markedsPris: number
  /** PARKET (Prisflyt-opprydding 2026-07-06) — prisnivå-varianter
   *  (Premium/Standard/Budget) PER VARE kolliderte med resten av spillet,
   *  som modellerer én vare som ETT costPrice/markedsPris/retailPrice
   *  (trau-prislapper, tavlemeny, salgsmotor). IKKE slettet: gjenbrukes i en
   *  kommende designrunde som LEVERANDØR-/MERKEKATALOG — fiktive
   *  merker/leverandører med ulik markedsposisjon, der INNKJØPSPRISEN
   *  signaliserer kvalitet (i stedet for at eleven velger tier per vare).
   *  Bærende mekanikk for bransje 2 (klesbutikk). Leses IKKE lenger av
   *  catalogToProduct() eller noe UI — kun historiske tall bevart her. */
  tiers?: {
    premium:  { costPrice: number; markedsPris: number }
    standard: { costPrice: number; markedsPris: number }
    budget:   { costPrice: number; markedsPris: number }
  }
  /** DAGSSYKLUS (DEL 3, Svinn) — true = ferskvare (bakevarer, salat, wrap,
   *  sandwich). Usolgt lager av ferskvare kastes ved stenging (CLOSE_DAY).
   *  Drikke er IKKE ferskvare — lager beholdes over natten. Utelatt = false. */
  ferskvare?: boolean
}

/** Generisk bygger for trau-/ferskvarer (BRANSJE-DEFINISJON: generalisert fra
 *  den tidligere kafé-spesifikke `bakeryItem` — samme felt, samme atferd,
 *  nøytralt navn så en fremtidig bransje med egne ferskvarer/trau-varer kan
 *  bruke DENNE byggeren i stedet for å skrive en ny). `id` brukes som både
 *  katalog-id og utklipp-filnavn (/assets/raw/products/<id>.png), så det
 *  matcher split-product-sheet. `display` (valgfri) justerer trau-visningen —
 *  utelatt ⇒ default (scale 1.0, rotation 0°). Ett sted å finpusse visuell
 *  størrelse/vinkel per vare (Espen finpusser videre).
 *  `tiers` (premium/budget avledet av std-tallene) er PARKET — se
 *  kommentaren ved IndustryCatalogItem.tiers — beholdt kun som historiske
 *  tall til leverandør-/merkekatalog-runden. */
function catalogItem(
  id: string, name: string, icon: string, category: ProductCategory,
  maxDemand: number, costStd: number, priceStd: number,
  display?: { scale?: number; rotation?: number },
): IndustryCatalogItem {
  return {
    id, name, icon, category, trauVare: true, ferskvare: true,
    sprite: `/assets/raw/products/${id}.png`,
    maxDemandPerMonth: maxDemand, quality: 7, sustainability: 6,
    displayScale: display?.scale ?? 1.0,
    displayRotation: display?.rotation ?? 0,
    costPrice: costStd, markedsPris: priceStd,
    tiers: {
      premium:  { costPrice: Math.round(costStd * 1.5), markedsPris: Math.round(priceStd * 1.4) },
      standard: { costPrice: costStd, markedsPris: priceStd },
      budget:   { costPrice: Math.round(costStd * 0.7), markedsPris: Math.round(priceStd * 0.7) },
    },
  }
}

export const INDUSTRY_CATALOG: Record<Industry, IndustryCatalogItem[]> = {
  tech: [
    { id: 'earbuds',   name: 'Trådløse ørepropper', icon: '🎧', maxDemandPerMonth: 90,  quality: 9, sustainability: 5,
      costPrice: 220, markedsPris: 549,
      tiers: { premium: { costPrice: 380, markedsPris: 999 }, standard: { costPrice: 220, markedsPris: 549 }, budget: { costPrice: 90, markedsPris: 249 } } /* PARKET */ },
    { id: 'smartwatch',name: 'Smartklokke',          icon: '⌚', maxDemandPerMonth: 50,  quality: 9, sustainability: 5,
      costPrice: 500, markedsPris: 1299,
      tiers: { premium: { costPrice: 850, markedsPris: 2299 }, standard: { costPrice: 500, markedsPris: 1299 }, budget: { costPrice: 200, markedsPris: 549 } } /* PARKET */ },
    { id: 'powerbank', name: 'Powerbank',             icon: '🔋', maxDemandPerMonth: 120, quality: 7, sustainability: 6,
      costPrice: 100, markedsPris: 279,
      tiers: { premium: { costPrice: 180, markedsPris: 499 }, standard: { costPrice: 100, markedsPris: 279 }, budget: { costPrice: 45, markedsPris: 129 } } /* PARKET */ },
    { id: 'charger',   name: 'Hurtiglader / Kabel',  icon: '🔌', maxDemandPerMonth: 200, quality: 7, sustainability: 5,
      costPrice: 55, markedsPris: 149,
      tiers: { premium: { costPrice: 90, markedsPris: 299 }, standard: { costPrice: 55, markedsPris: 149 }, budget: { costPrice: 25, markedsPris: 69 } } /* PARKET */ },
    { id: 'speaker',   name: 'Bluetooth-høyttaler',  icon: '🔊', maxDemandPerMonth: 70,  quality: 8, sustainability: 6,
      costPrice: 250, markedsPris: 599,
      tiers: { premium: { costPrice: 420, markedsPris: 999 }, standard: { costPrice: 250, markedsPris: 599 }, budget: { costPrice: 110, markedsPris: 299 } } /* PARKET */ },
    { id: 'accessory', name: 'Mobiltilbehør',        icon: '📱', maxDemandPerMonth: 250, quality: 6, sustainability: 4,
      costPrice: 35, markedsPris: 99,
      tiers: { premium: { costPrice: 55, markedsPris: 199 }, standard: { costPrice: 35, markedsPris: 99 }, budget: { costPrice: 15, markedsPris: 49 } } /* PARKET */ },
  ],
  fashion: [
    { id: 'hoodie',    name: 'Hettegenser', icon: '👕', maxDemandPerMonth: 80,  quality: 8, sustainability: 7,
      costPrice: 250, markedsPris: 649,
      tiers: { premium: { costPrice: 450, markedsPris: 1199 }, standard: { costPrice: 250, markedsPris: 649 }, budget: { costPrice: 120, markedsPris: 299 } } /* PARKET */ },
    { id: 'tshirt',    name: 'T-skjorte',   icon: '👚', maxDemandPerMonth: 150, quality: 7, sustainability: 6,
      costPrice: 150, markedsPris: 399,
      tiers: { premium: { costPrice: 280, markedsPris: 699 }, standard: { costPrice: 150, markedsPris: 399 }, budget: { costPrice: 60, markedsPris: 169 } } /* PARKET */ },
    { id: 'jeans',     name: 'Jeans',       icon: '👖', maxDemandPerMonth: 60,  quality: 8, sustainability: 6,
      costPrice: 300, markedsPris: 799,
      tiers: { premium: { costPrice: 500, markedsPris: 1299 }, standard: { costPrice: 300, markedsPris: 799 }, budget: { costPrice: 140, markedsPris: 399 } } /* PARKET */ },
    { id: 'sneakers',  name: 'Sneakers',    icon: '👟', maxDemandPerMonth: 50,  quality: 9, sustainability: 5,
      costPrice: 350, markedsPris: 899,
      tiers: { premium: { costPrice: 600, markedsPris: 1599 }, standard: { costPrice: 350, markedsPris: 899 }, budget: { costPrice: 150, markedsPris: 449 } } /* PARKET */ },
    { id: 'cap',       name: 'Caps',        icon: '🧢', maxDemandPerMonth: 100, quality: 7, sustainability: 6,
      costPrice: 100, markedsPris: 249,
      tiers: { premium: { costPrice: 180, markedsPris: 449 }, standard: { costPrice: 100, markedsPris: 249 }, budget: { costPrice: 40, markedsPris: 119 } } /* PARKET */ },
    { id: 'bag',       name: 'Veske',       icon: '👜', maxDemandPerMonth: 40,  quality: 8, sustainability: 7,
      costPrice: 400, markedsPris: 999,
      tiers: { premium: { costPrice: 700, markedsPris: 1899 }, standard: { costPrice: 400, markedsPris: 999 }, budget: { costPrice: 180, markedsPris: 499 } } /* PARKET */ },
  ],
  cafe: [
    // Eksisterende generiske varer (beholdt), nå tagget med gruppe/trau-flagg.
    { id: 'coffee',    name: 'Kaffe',       icon: '☕', maxDemandPerMonth: 600, quality: 8, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 14, markedsPris: 50,
      tiers: { premium: { costPrice: 22, markedsPris: 65 }, standard: { costPrice: 14, markedsPris: 50 }, budget: { costPrice: 9, markedsPris: 35 } } /* PARKET */ },
    { id: 'smoothie',  name: 'Smoothie',    icon: '🥤', maxDemandPerMonth: 200, quality: 9, sustainability: 8, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 18, markedsPris: 45,
      tiers: { premium: { costPrice: 30, markedsPris: 75 }, standard: { costPrice: 18, markedsPris: 45 }, budget: { costPrice: 10, markedsPris: 29 } } /* PARKET */ },
    { id: 'tea',       name: 'Te',          icon: '🍵', maxDemandPerMonth: 180, quality: 8, sustainability: 8, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 12, markedsPris: 29,
      tiers: { premium: { costPrice: 20, markedsPris: 49 }, standard: { costPrice: 12, markedsPris: 29 }, budget: { costPrice: 6, markedsPris: 19 } } /* PARKET */ },

    // Utvidet drikkesortiment (standard cafe/bakeri-meny) — samme mønster
    // som over: windowDisplay:false, category:'drikke', trauVare:false (vises
    // på tavla i /inne, ikke i trau/vindu). Ingen `tiers` her — feltet er
    // PARKET (se IndustryCatalogItem.tiers), ikke nødvendig å fylle ut på nye
    // varer.
    { id: 'cappuccino',    name: 'Cappuccino',      icon: '☕', maxDemandPerMonth: 250, quality: 8, sustainability: 6, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 18, markedsPris: 45 },
    { id: 'latte',         name: 'Café Latte',      icon: '☕', maxDemandPerMonth: 220, quality: 8, sustainability: 6, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 18, markedsPris: 45 },
    { id: 'espresso',      name: 'Espresso',        icon: '☕', maxDemandPerMonth: 150, quality: 8, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 12, markedsPris: 32 },
    { id: 'hot-chocolate', name: 'Varm sjokolade',  icon: '🍫', maxDemandPerMonth: 140, quality: 7, sustainability: 6, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 15, markedsPris: 39 },
    { id: 'iste',          name: 'Iste',            icon: '🧊', maxDemandPerMonth: 120, quality: 7, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 12, markedsPris: 35 },
    { id: 'juice',         name: 'Juice',           icon: '🧃', maxDemandPerMonth: 150, quality: 8, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 14, markedsPris: 39 },
    { id: 'mineralvann',   name: 'Mineralvann',     icon: '🥤', maxDemandPerMonth: 180, quality: 6, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 10, markedsPris: 29 },

    // Spesifikke trau-bakevarer (sprite-utklipp fra split-product-sheet).
    // display: { scale, rotation } — startverdier, Espen finpusser visuelt.
    // Ark 1
    catalogItem('croissant',       'Croissant',        '🥐', 'frokost', 220, 19, 57, { scale: 0.55 }),
    catalogItem('muffin-blabaer',  'Blåbærmuffins',    '🧁', 'kaker',   180, 19, 57, { scale: 0.55 }),
    catalogItem('kanelbolle',      'Kanelbolle',       '🥮', 'frokost', 260, 18, 54, { scale: 0.65 }),
    catalogItem('skolebrod',       'Skolebrød',        '🍩', 'frokost', 200, 17, 50, { scale: 0.65 }),
    catalogItem('rundstykke-grovt','Grovt rundstykke', '🥖', 'brod',    300, 5,  19, { scale: 0.55 }),
    catalogItem('gulrotkake',      'Gulrotkake',       '🍰', 'kaker',   120, 14, 49, { scale: 0.65 }),
    // Ark 2
    catalogItem('baguette',        'Baguette',         '🥖', 'brod',    160, 10, 39, { scale: 0.9, rotation: -12 }),
    catalogItem('focaccia',        'Focaccia',         '🫓', 'lunsj',   140, 12, 45, { scale: 0.9, rotation: -8 }),
    catalogItem('wrap-kylling',    'Kyllingwrap',      '🌯', 'lunsj',   180, 18, 59, { scale: 0.8 }),
    catalogItem('salat',           'Salat',            '🥗', 'lunsj',   150, 20, 69, { scale: 0.8 }),
    catalogItem('grovbrod',        'Grovbrød',         '🍞', 'brod',    140, 14, 45),
    catalogItem('surdeigsbrod',    'Surdeigsbrød',     '🍞', 'brod',    120, 18, 59),
  ],
  sports: [
    { id: 'shoes',     name: 'Løpesko',          icon: '👟', maxDemandPerMonth: 40,  quality: 9, sustainability: 6,
      costPrice: 400, markedsPris: 999,
      tiers: { premium: { costPrice: 700, markedsPris: 1799 }, standard: { costPrice: 400, markedsPris: 999 }, budget: { costPrice: 180, markedsPris: 449 } } /* PARKET */ },
    { id: 'outfit',    name: 'Treningsklær sett', icon: '🩱', maxDemandPerMonth: 60,  quality: 8, sustainability: 7,
      costPrice: 280, markedsPris: 699,
      tiers: { premium: { costPrice: 500, markedsPris: 1299 }, standard: { costPrice: 280, markedsPris: 699 }, budget: { costPrice: 130, markedsPris: 349 } } /* PARKET */ },
    { id: 'yoga_mat',  name: 'Yogamatte',         icon: '🧘', maxDemandPerMonth: 80,  quality: 7, sustainability: 8,
      costPrice: 130, markedsPris: 329,
      tiers: { premium: { costPrice: 250, markedsPris: 599 }, standard: { costPrice: 130, markedsPris: 329 }, budget: { costPrice: 50, markedsPris: 149 } } /* PARKET */ },
    { id: 'bottle',    name: 'Vannflaske',         icon: '💧', maxDemandPerMonth: 150, quality: 7, sustainability: 9,
      costPrice: 90, markedsPris: 229,
      tiers: { premium: { costPrice: 180, markedsPris: 399 }, standard: { costPrice: 90, markedsPris: 229 }, budget: { costPrice: 30, markedsPris: 89 } } /* PARKET */ },
    { id: 'bag',       name: 'Treningsbag',        icon: '🎒', maxDemandPerMonth: 50,  quality: 8, sustainability: 7,
      costPrice: 220, markedsPris: 549,
      tiers: { premium: { costPrice: 400, markedsPris: 999 }, standard: { costPrice: 220, markedsPris: 549 }, budget: { costPrice: 100, markedsPris: 279 } } /* PARKET */ },
    { id: 'weights',   name: 'Håndvekter',         icon: '🏋️', maxDemandPerMonth: 70,  quality: 8, sustainability: 8,
      costPrice: 200, markedsPris: 499,
      tiers: { premium: { costPrice: 350, markedsPris: 799 }, standard: { costPrice: 200, markedsPris: 499 }, budget: { costPrice: 80, markedsPris: 229 } } /* PARKET */ },
  ],
}

export const INDUSTRY_META: Record<Industry, { name: string; emoji: string; description: string; startingMoney: number }> = {
  cafe:    { name: 'Kafé & Bakeri',    emoji: '☕', description: 'Start din egen kafé. Selg kaffe, bakst og lunsj til sultne kunder.', startingMoney: 200_000 },
  fashion: { name: 'Klesbutikk',       emoji: '👗', description: 'Åpne en trendy klesbutikk. Velg produkter, sett priser og tiltrekk motebevisste kunder.', startingMoney: 250_000 },
  tech:    { name: 'Tech & Gadgets',   emoji: '💻', description: 'Selg elektronikk og teknologiprodukter. Høye marginer, men krevende kunder.', startingMoney: 300_000 },
  sports:  { name: 'Sports & Fritid',  emoji: '⚽', description: 'Utstyr for sport og friluftsliv. Sterk sesongvariasjon, men trofaste kunder.', startingMoney: 200_000 },
}

/** SPILLBARE bransjer på main. Bare disse kan velges i oppstarten — de øvrige
 *  vises nedtonet med «Kommer». Tunbar: legg til f.eks. 'fashion' når
 *  klesbutikk-grenen merges inn. */
export const ACTIVE_INDUSTRIES: Industry[] = ['cafe']
export function isIndustryActive(id: Industry): boolean {
  return ACTIVE_INDUSTRIES.includes(id)
}

/** Build a Product from a catalog item (initial stock = 0, retailPrice =
 *  markedsPris — eleven endrer den videre i Priser-fanen). Tier-valg er
 *  PARKET (se IndustryCatalogItem.tiers) — én katalogvare gir nå ETT
 *  Product, ikke ett per tier; `Product.tier` er derfor alltid 'standard'
 *  (feltet beholdes for typekompatibilitet med personas.ts sin
 *  målgruppe-matching, som fortsatt kan lese det senere). */
export function catalogToProduct(item: IndustryCatalogItem): Product {
  return {
    id: item.id,
    name: item.name,
    icon: item.icon,
    tier: 'standard',
    costPrice: item.costPrice,
    // UPRISET ved oppstart (DEL 7): eleven setter utsalgspris selv fra blankt
    // felt. markedsPris beholdes som markedsanker (elastisitet + konkurrentpris).
    retailPrice: 0,
    markedsPris: item.markedsPris,
    stock: 0,
    quality: item.quality,
    sustainability: item.sustainability,
    windowDisplay: item.windowDisplay !== false,
    category: item.category,
    sprite: item.sprite,
    trauVare: item.trauVare,
    displayScale: item.displayScale,
    displayRotation: item.displayRotation,
    maxDemandPerMonth: item.maxDemandPerMonth,
    ferskvare: item.ferskvare,
  }
}
