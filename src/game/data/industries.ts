// ─── AdVenture 3.0 — Industry Catalog ────────────────────────────────────
// Product templates (before ordering) per industry.
// Én vare = ETT costPrice + ETT recommendedPrice (se Prisflyt-opprydding
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
  recommendedPrice: number
  /** PARKET (Prisflyt-opprydding 2026-07-06) — prisnivå-varianter
   *  (Premium/Standard/Budget) PER VARE kolliderte med resten av spillet,
   *  som modellerer én vare som ETT costPrice/recommendedPrice/retailPrice
   *  (trau-prislapper, tavlemeny, salgsmotor). IKKE slettet: gjenbrukes i en
   *  kommende designrunde som LEVERANDØR-/MERKEKATALOG — fiktive
   *  merker/leverandører med ulik markedsposisjon, der INNKJØPSPRISEN
   *  signaliserer kvalitet (i stedet for at eleven velger tier per vare).
   *  Bærende mekanikk for bransje 2 (klesbutikk). Leses IKKE lenger av
   *  catalogToProduct() eller noe UI — kun historiske tall bevart her. */
  tiers?: {
    premium:  { costPrice: number; recommendedPrice: number }
    standard: { costPrice: number; recommendedPrice: number }
    budget:   { costPrice: number; recommendedPrice: number }
  }
}

/** Kompakt bygger for trau-bakevarer. `id` brukes som både katalog-id og
 *  utklipp-filnavn (/assets/raw/products/<id>.png), så det matcher
 *  split-product-sheet. `display` (valgfri) justerer trau-visningen —
 *  utelatt ⇒ default (scale 1.0, rotation 0°). Ett sted å finpusse visuell
 *  størrelse/vinkel per vare (Espen finpusser videre).
 *  `tiers` (premium/budget avledet av std-tallene) er PARKET — se
 *  kommentaren ved IndustryCatalogItem.tiers — beholdt kun som historiske
 *  tall til leverandør-/merkekatalog-runden. */
function bakeryItem(
  id: string, name: string, icon: string, category: ProductCategory,
  maxDemand: number, costStd: number, priceStd: number,
  display?: { scale?: number; rotation?: number },
): IndustryCatalogItem {
  return {
    id, name, icon, category, trauVare: true,
    sprite: `/assets/raw/products/${id}.png`,
    maxDemandPerMonth: maxDemand, quality: 7, sustainability: 6,
    displayScale: display?.scale ?? 1.0,
    displayRotation: display?.rotation ?? 0,
    costPrice: costStd, recommendedPrice: priceStd,
    tiers: {
      premium:  { costPrice: Math.round(costStd * 1.5), recommendedPrice: Math.round(priceStd * 1.4) },
      standard: { costPrice: costStd, recommendedPrice: priceStd },
      budget:   { costPrice: Math.round(costStd * 0.7), recommendedPrice: Math.round(priceStd * 0.7) },
    },
  }
}

export const INDUSTRY_CATALOG: Record<Industry, IndustryCatalogItem[]> = {
  tech: [
    { id: 'earbuds',   name: 'Trådløse ørepropper', icon: '🎧', maxDemandPerMonth: 90,  quality: 9, sustainability: 5,
      costPrice: 220, recommendedPrice: 549,
      tiers: { premium: { costPrice: 380, recommendedPrice: 999 }, standard: { costPrice: 220, recommendedPrice: 549 }, budget: { costPrice: 90, recommendedPrice: 249 } } /* PARKET */ },
    { id: 'smartwatch',name: 'Smartklokke',          icon: '⌚', maxDemandPerMonth: 50,  quality: 9, sustainability: 5,
      costPrice: 500, recommendedPrice: 1299,
      tiers: { premium: { costPrice: 850, recommendedPrice: 2299 }, standard: { costPrice: 500, recommendedPrice: 1299 }, budget: { costPrice: 200, recommendedPrice: 549 } } /* PARKET */ },
    { id: 'powerbank', name: 'Powerbank',             icon: '🔋', maxDemandPerMonth: 120, quality: 7, sustainability: 6,
      costPrice: 100, recommendedPrice: 279,
      tiers: { premium: { costPrice: 180, recommendedPrice: 499 }, standard: { costPrice: 100, recommendedPrice: 279 }, budget: { costPrice: 45, recommendedPrice: 129 } } /* PARKET */ },
    { id: 'charger',   name: 'Hurtiglader / Kabel',  icon: '🔌', maxDemandPerMonth: 200, quality: 7, sustainability: 5,
      costPrice: 55, recommendedPrice: 149,
      tiers: { premium: { costPrice: 90, recommendedPrice: 299 }, standard: { costPrice: 55, recommendedPrice: 149 }, budget: { costPrice: 25, recommendedPrice: 69 } } /* PARKET */ },
    { id: 'speaker',   name: 'Bluetooth-høyttaler',  icon: '🔊', maxDemandPerMonth: 70,  quality: 8, sustainability: 6,
      costPrice: 250, recommendedPrice: 599,
      tiers: { premium: { costPrice: 420, recommendedPrice: 999 }, standard: { costPrice: 250, recommendedPrice: 599 }, budget: { costPrice: 110, recommendedPrice: 299 } } /* PARKET */ },
    { id: 'accessory', name: 'Mobiltilbehør',        icon: '📱', maxDemandPerMonth: 250, quality: 6, sustainability: 4,
      costPrice: 35, recommendedPrice: 99,
      tiers: { premium: { costPrice: 55, recommendedPrice: 199 }, standard: { costPrice: 35, recommendedPrice: 99 }, budget: { costPrice: 15, recommendedPrice: 49 } } /* PARKET */ },
  ],
  fashion: [
    { id: 'hoodie',    name: 'Hettegenser', icon: '👕', maxDemandPerMonth: 80,  quality: 8, sustainability: 7,
      costPrice: 250, recommendedPrice: 649,
      tiers: { premium: { costPrice: 450, recommendedPrice: 1199 }, standard: { costPrice: 250, recommendedPrice: 649 }, budget: { costPrice: 120, recommendedPrice: 299 } } /* PARKET */ },
    { id: 'tshirt',    name: 'T-skjorte',   icon: '👚', maxDemandPerMonth: 150, quality: 7, sustainability: 6,
      costPrice: 150, recommendedPrice: 399,
      tiers: { premium: { costPrice: 280, recommendedPrice: 699 }, standard: { costPrice: 150, recommendedPrice: 399 }, budget: { costPrice: 60, recommendedPrice: 169 } } /* PARKET */ },
    { id: 'jeans',     name: 'Jeans',       icon: '👖', maxDemandPerMonth: 60,  quality: 8, sustainability: 6,
      costPrice: 300, recommendedPrice: 799,
      tiers: { premium: { costPrice: 500, recommendedPrice: 1299 }, standard: { costPrice: 300, recommendedPrice: 799 }, budget: { costPrice: 140, recommendedPrice: 399 } } /* PARKET */ },
    { id: 'sneakers',  name: 'Sneakers',    icon: '👟', maxDemandPerMonth: 50,  quality: 9, sustainability: 5,
      costPrice: 350, recommendedPrice: 899,
      tiers: { premium: { costPrice: 600, recommendedPrice: 1599 }, standard: { costPrice: 350, recommendedPrice: 899 }, budget: { costPrice: 150, recommendedPrice: 449 } } /* PARKET */ },
    { id: 'cap',       name: 'Caps',        icon: '🧢', maxDemandPerMonth: 100, quality: 7, sustainability: 6,
      costPrice: 100, recommendedPrice: 249,
      tiers: { premium: { costPrice: 180, recommendedPrice: 449 }, standard: { costPrice: 100, recommendedPrice: 249 }, budget: { costPrice: 40, recommendedPrice: 119 } } /* PARKET */ },
    { id: 'bag',       name: 'Veske',       icon: '👜', maxDemandPerMonth: 40,  quality: 8, sustainability: 7,
      costPrice: 400, recommendedPrice: 999,
      tiers: { premium: { costPrice: 700, recommendedPrice: 1899 }, standard: { costPrice: 400, recommendedPrice: 999 }, budget: { costPrice: 180, recommendedPrice: 499 } } /* PARKET */ },
  ],
  cafe: [
    // Eksisterende generiske varer (beholdt), nå tagget med gruppe/trau-flagg.
    { id: 'coffee',    name: 'Kaffe',       icon: '☕', maxDemandPerMonth: 600, quality: 8, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 15, recommendedPrice: 39,
      tiers: { premium: { costPrice: 25, recommendedPrice: 59 }, standard: { costPrice: 15, recommendedPrice: 39 }, budget: { costPrice: 8, recommendedPrice: 25 } } /* PARKET */ },
    { id: 'smoothie',  name: 'Smoothie',    icon: '🥤', maxDemandPerMonth: 200, quality: 9, sustainability: 8, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 18, recommendedPrice: 45,
      tiers: { premium: { costPrice: 30, recommendedPrice: 75 }, standard: { costPrice: 18, recommendedPrice: 45 }, budget: { costPrice: 10, recommendedPrice: 29 } } /* PARKET */ },
    { id: 'tea',       name: 'Te / Spesial',icon: '🍵', maxDemandPerMonth: 180, quality: 8, sustainability: 8, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 12, recommendedPrice: 29,
      tiers: { premium: { costPrice: 20, recommendedPrice: 49 }, standard: { costPrice: 12, recommendedPrice: 29 }, budget: { costPrice: 6, recommendedPrice: 19 } } /* PARKET */ },

    // Utvidet drikkesortiment (standard cafe/bakeri-meny) — samme mønster
    // som over: windowDisplay:false, category:'drikke', trauVare:false (vises
    // på tavla i /inne, ikke i trau/vindu). Ingen `tiers` her — feltet er
    // PARKET (se IndustryCatalogItem.tiers), ikke nødvendig å fylle ut på nye
    // varer.
    { id: 'cappuccino',    name: 'Cappuccino',      icon: '☕', maxDemandPerMonth: 250, quality: 8, sustainability: 6, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 18, recommendedPrice: 45 },
    { id: 'latte',         name: 'Café Latte',      icon: '☕', maxDemandPerMonth: 220, quality: 8, sustainability: 6, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 18, recommendedPrice: 45 },
    { id: 'espresso',      name: 'Espresso',        icon: '☕', maxDemandPerMonth: 150, quality: 8, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 12, recommendedPrice: 32 },
    { id: 'hot-chocolate', name: 'Varm sjokolade',  icon: '🍫', maxDemandPerMonth: 140, quality: 7, sustainability: 6, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 15, recommendedPrice: 39 },
    { id: 'iste',          name: 'Iste',            icon: '🧊', maxDemandPerMonth: 120, quality: 7, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 12, recommendedPrice: 35 },
    { id: 'juice',         name: 'Juice',           icon: '🧃', maxDemandPerMonth: 150, quality: 8, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 14, recommendedPrice: 39 },
    { id: 'mineralvann',   name: 'Mineralvann',     icon: '🥤', maxDemandPerMonth: 180, quality: 6, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      costPrice: 10, recommendedPrice: 29 },

    // Spesifikke trau-bakevarer (sprite-utklipp fra split-product-sheet).
    // display: { scale, rotation } — startverdier, Espen finpusser visuelt.
    // Ark 1
    bakeryItem('croissant',       'Croissant',        '🥐', 'frokost', 220, 9,  35, { scale: 0.55 }),
    bakeryItem('muffin-blabaer',  'Blåbærmuffins',    '🧁', 'kaker',   180, 8,  32, { scale: 0.55 }),
    bakeryItem('kanelbolle',      'Kanelbolle',       '🥮', 'frokost', 260, 7,  29, { scale: 0.65 }),
    bakeryItem('skolebrod',       'Skolebrød',        '🍩', 'frokost', 200, 8,  32, { scale: 0.65 }),
    bakeryItem('rundstykke-grovt','Grovt rundstykke', '🥖', 'brod',    300, 5,  19, { scale: 0.55 }),
    bakeryItem('gulrotkake',      'Gulrotkake',       '🍰', 'kaker',   120, 14, 49, { scale: 0.65 }),
    // Ark 2
    bakeryItem('baguette',        'Baguette',         '🥖', 'brod',    160, 10, 39, { scale: 0.9, rotation: -12 }),
    bakeryItem('focaccia',        'Focaccia',         '🫓', 'lunsj',   140, 12, 45, { scale: 0.9, rotation: -8 }),
    bakeryItem('wrap-kylling',    'Kyllingwrap',      '🌯', 'lunsj',   180, 18, 59, { scale: 0.8 }),
    bakeryItem('salat',           'Salat',            '🥗', 'lunsj',   150, 20, 69, { scale: 0.8 }),
    bakeryItem('grovbrod',        'Grovbrød',         '🍞', 'brod',    140, 14, 45),
    bakeryItem('surdeigsbrod',    'Surdeigsbrød',     '🍞', 'brod',    120, 18, 59),
  ],
  sports: [
    { id: 'shoes',     name: 'Løpesko',          icon: '👟', maxDemandPerMonth: 40,  quality: 9, sustainability: 6,
      costPrice: 400, recommendedPrice: 999,
      tiers: { premium: { costPrice: 700, recommendedPrice: 1799 }, standard: { costPrice: 400, recommendedPrice: 999 }, budget: { costPrice: 180, recommendedPrice: 449 } } /* PARKET */ },
    { id: 'outfit',    name: 'Treningsklær sett', icon: '🩱', maxDemandPerMonth: 60,  quality: 8, sustainability: 7,
      costPrice: 280, recommendedPrice: 699,
      tiers: { premium: { costPrice: 500, recommendedPrice: 1299 }, standard: { costPrice: 280, recommendedPrice: 699 }, budget: { costPrice: 130, recommendedPrice: 349 } } /* PARKET */ },
    { id: 'yoga_mat',  name: 'Yogamatte',         icon: '🧘', maxDemandPerMonth: 80,  quality: 7, sustainability: 8,
      costPrice: 130, recommendedPrice: 329,
      tiers: { premium: { costPrice: 250, recommendedPrice: 599 }, standard: { costPrice: 130, recommendedPrice: 329 }, budget: { costPrice: 50, recommendedPrice: 149 } } /* PARKET */ },
    { id: 'bottle',    name: 'Vannflaske',         icon: '💧', maxDemandPerMonth: 150, quality: 7, sustainability: 9,
      costPrice: 90, recommendedPrice: 229,
      tiers: { premium: { costPrice: 180, recommendedPrice: 399 }, standard: { costPrice: 90, recommendedPrice: 229 }, budget: { costPrice: 30, recommendedPrice: 89 } } /* PARKET */ },
    { id: 'bag',       name: 'Treningsbag',        icon: '🎒', maxDemandPerMonth: 50,  quality: 8, sustainability: 7,
      costPrice: 220, recommendedPrice: 549,
      tiers: { premium: { costPrice: 400, recommendedPrice: 999 }, standard: { costPrice: 220, recommendedPrice: 549 }, budget: { costPrice: 100, recommendedPrice: 279 } } /* PARKET */ },
    { id: 'weights',   name: 'Håndvekter',         icon: '🏋️', maxDemandPerMonth: 70,  quality: 8, sustainability: 8,
      costPrice: 200, recommendedPrice: 499,
      tiers: { premium: { costPrice: 350, recommendedPrice: 799 }, standard: { costPrice: 200, recommendedPrice: 499 }, budget: { costPrice: 80, recommendedPrice: 229 } } /* PARKET */ },
  ],
}

export const INDUSTRY_META: Record<Industry, { name: string; emoji: string; description: string; startingMoney: number }> = {
  cafe:    { name: 'Kafé & Bakeri',    emoji: '☕', description: 'Start din egen kafé. Selg kaffe, bakst og lunsj til sultne kunder.', startingMoney: 150_000 },
  fashion: { name: 'Klesbutikk',       emoji: '👗', description: 'Åpne en trendy klesbutikk. Velg produkter, sett priser og tiltrekk motebevisste kunder.', startingMoney: 250_000 },
  tech:    { name: 'Tech & Gadgets',   emoji: '💻', description: 'Selg elektronikk og teknologiprodukter. Høye marginer, men krevende kunder.', startingMoney: 300_000 },
  sports:  { name: 'Sports & Fritid',  emoji: '⚽', description: 'Utstyr for sport og friluftsliv. Sterk sesongvariasjon, men trofaste kunder.', startingMoney: 200_000 },
}

/** Build a Product from a catalog item (initial stock = 0, retailPrice =
 *  recommendedPrice — eleven endrer den videre i Priser-fanen). Tier-valg er
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
    retailPrice: item.recommendedPrice,
    recommendedPrice: item.recommendedPrice,
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
  }
}
