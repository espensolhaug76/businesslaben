// ─── AdVenture 3.0 — Industry Catalog ────────────────────────────────────
// Product templates (before ordering) per industry.
// costPrice / recommendedPrice vary by tier: premium / standard / budget

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
  tiers: {
    premium:  { costPrice: number; recommendedPrice: number }
    standard: { costPrice: number; recommendedPrice: number }
    budget:   { costPrice: number; recommendedPrice: number }
  }
}

/** Kompakt bygger for trau-bakevarer: standard-tier + avledet premium/budget.
 *  `id` brukes som både katalog-id og utklipp-filnavn
 *  (/assets/raw/products/<id>.png), så det matcher split-product-sheet. */
function bakeryItem(
  id: string, name: string, icon: string, category: ProductCategory,
  maxDemand: number, costStd: number, priceStd: number,
): IndustryCatalogItem {
  return {
    id, name, icon, category, trauVare: true,
    sprite: `/assets/raw/products/${id}.png`,
    maxDemandPerMonth: maxDemand, quality: 7, sustainability: 6,
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
      tiers: { premium: { costPrice: 380, recommendedPrice: 999 }, standard: { costPrice: 220, recommendedPrice: 549 }, budget: { costPrice: 90,  recommendedPrice: 249 } } },
    { id: 'smartwatch',name: 'Smartklokke',          icon: '⌚', maxDemandPerMonth: 50,  quality: 9, sustainability: 5,
      tiers: { premium: { costPrice: 850, recommendedPrice: 2299}, standard: { costPrice: 500, recommendedPrice: 1299}, budget: { costPrice: 200, recommendedPrice: 549 } } },
    { id: 'powerbank', name: 'Powerbank',             icon: '🔋', maxDemandPerMonth: 120, quality: 7, sustainability: 6,
      tiers: { premium: { costPrice: 180, recommendedPrice: 499 }, standard: { costPrice: 100, recommendedPrice: 279 }, budget: { costPrice: 45,  recommendedPrice: 129 } } },
    { id: 'charger',   name: 'Hurtiglader / Kabel',  icon: '🔌', maxDemandPerMonth: 200, quality: 7, sustainability: 5,
      tiers: { premium: { costPrice: 90,  recommendedPrice: 299 }, standard: { costPrice: 55,  recommendedPrice: 149 }, budget: { costPrice: 25,  recommendedPrice: 69  } } },
    { id: 'speaker',   name: 'Bluetooth-høyttaler',  icon: '🔊', maxDemandPerMonth: 70,  quality: 8, sustainability: 6,
      tiers: { premium: { costPrice: 420, recommendedPrice: 999 }, standard: { costPrice: 250, recommendedPrice: 599 }, budget: { costPrice: 110, recommendedPrice: 299 } } },
    { id: 'accessory', name: 'Mobiltilbehør',        icon: '📱', maxDemandPerMonth: 250, quality: 6, sustainability: 4,
      tiers: { premium: { costPrice: 55,  recommendedPrice: 199 }, standard: { costPrice: 35,  recommendedPrice: 99  }, budget: { costPrice: 15,  recommendedPrice: 49  } } },
  ],
  fashion: [
    { id: 'hoodie',    name: 'Hettegenser', icon: '👕', maxDemandPerMonth: 80,  quality: 8, sustainability: 7,
      tiers: { premium: { costPrice: 450, recommendedPrice: 1199}, standard: { costPrice: 250, recommendedPrice: 649 }, budget: { costPrice: 120, recommendedPrice: 299 } } },
    { id: 'tshirt',    name: 'T-skjorte',   icon: '👚', maxDemandPerMonth: 150, quality: 7, sustainability: 6,
      tiers: { premium: { costPrice: 280, recommendedPrice: 699 }, standard: { costPrice: 150, recommendedPrice: 399 }, budget: { costPrice: 60,  recommendedPrice: 169 } } },
    { id: 'jeans',     name: 'Jeans',       icon: '👖', maxDemandPerMonth: 60,  quality: 8, sustainability: 6,
      tiers: { premium: { costPrice: 500, recommendedPrice: 1299}, standard: { costPrice: 300, recommendedPrice: 799 }, budget: { costPrice: 140, recommendedPrice: 399 } } },
    { id: 'sneakers',  name: 'Sneakers',    icon: '👟', maxDemandPerMonth: 50,  quality: 9, sustainability: 5,
      tiers: { premium: { costPrice: 600, recommendedPrice: 1599}, standard: { costPrice: 350, recommendedPrice: 899 }, budget: { costPrice: 150, recommendedPrice: 449 } } },
    { id: 'cap',       name: 'Caps',        icon: '🧢', maxDemandPerMonth: 100, quality: 7, sustainability: 6,
      tiers: { premium: { costPrice: 180, recommendedPrice: 449 }, standard: { costPrice: 100, recommendedPrice: 249 }, budget: { costPrice: 40,  recommendedPrice: 119 } } },
    { id: 'bag',       name: 'Veske',       icon: '👜', maxDemandPerMonth: 40,  quality: 8, sustainability: 7,
      tiers: { premium: { costPrice: 700, recommendedPrice: 1899}, standard: { costPrice: 400, recommendedPrice: 999 }, budget: { costPrice: 180, recommendedPrice: 499 } } },
  ],
  cafe: [
    // Eksisterende generiske varer (beholdt), nå tagget med gruppe/trau-flagg.
    { id: 'coffee',    name: 'Kaffe',       icon: '☕', maxDemandPerMonth: 600, quality: 8, sustainability: 7, windowDisplay: false, category: 'drikke', trauVare: false,
      tiers: { premium: { costPrice: 25, recommendedPrice: 59  }, standard: { costPrice: 15, recommendedPrice: 39  }, budget: { costPrice: 8,  recommendedPrice: 25  } } },
    { id: 'smoothie',  name: 'Smoothie',    icon: '🥤', maxDemandPerMonth: 200, quality: 9, sustainability: 8, windowDisplay: false, category: 'drikke', trauVare: false,
      tiers: { premium: { costPrice: 30, recommendedPrice: 75  }, standard: { costPrice: 18, recommendedPrice: 45  }, budget: { costPrice: 10, recommendedPrice: 29  } } },
    { id: 'tea',       name: 'Te / Spesial',icon: '🍵', maxDemandPerMonth: 180, quality: 8, sustainability: 8, windowDisplay: false, category: 'drikke', trauVare: false,
      tiers: { premium: { costPrice: 20, recommendedPrice: 49  }, standard: { costPrice: 12, recommendedPrice: 29  }, budget: { costPrice: 6,  recommendedPrice: 19  } } },

    // Spesifikke trau-bakevarer (sprite-utklipp fra split-product-sheet).
    // Ark 1
    bakeryItem('croissant',       'Croissant',        '🥐', 'frokost', 220, 9,  35),
    bakeryItem('muffin-blabaer',  'Blåbærmuffins',    '🧁', 'kaker',   180, 8,  32),
    bakeryItem('kanelbolle',      'Kanelbolle',       '🥮', 'frokost', 260, 7,  29),
    bakeryItem('skolebrod',       'Skolebrød',        '🍩', 'frokost', 200, 8,  32),
    bakeryItem('rundstykke-grovt','Grovt rundstykke', '🥖', 'brod',    300, 5,  19),
    bakeryItem('gulrotkake',      'Gulrotkake',       '🍰', 'kaker',   120, 14, 49),
    // Ark 2
    bakeryItem('baguette',        'Baguette',         '🥖', 'brod',    160, 10, 39),
    bakeryItem('focaccia',        'Focaccia',         '🫓', 'lunsj',   140, 12, 45),
    bakeryItem('wrap-kylling',    'Kyllingwrap',      '🌯', 'lunsj',   180, 18, 59),
    bakeryItem('salat',           'Salat',            '🥗', 'lunsj',   150, 20, 69),
    bakeryItem('grovbrod',        'Grovbrød',         '🍞', 'brod',    140, 14, 45),
    bakeryItem('surdeigsbrod',    'Surdeigsbrød',     '🍞', 'brod',    120, 18, 59),
  ],
  sports: [
    { id: 'shoes',     name: 'Løpesko',          icon: '👟', maxDemandPerMonth: 40,  quality: 9, sustainability: 6,
      tiers: { premium: { costPrice: 700, recommendedPrice: 1799}, standard: { costPrice: 400, recommendedPrice: 999 }, budget: { costPrice: 180, recommendedPrice: 449 } } },
    { id: 'outfit',    name: 'Treningsklær sett', icon: '🩱', maxDemandPerMonth: 60,  quality: 8, sustainability: 7,
      tiers: { premium: { costPrice: 500, recommendedPrice: 1299}, standard: { costPrice: 280, recommendedPrice: 699 }, budget: { costPrice: 130, recommendedPrice: 349 } } },
    { id: 'yoga_mat',  name: 'Yogamatte',         icon: '🧘', maxDemandPerMonth: 80,  quality: 7, sustainability: 8,
      tiers: { premium: { costPrice: 250, recommendedPrice: 599 }, standard: { costPrice: 130, recommendedPrice: 329 }, budget: { costPrice: 50,  recommendedPrice: 149 } } },
    { id: 'bottle',    name: 'Vannflaske',         icon: '💧', maxDemandPerMonth: 150, quality: 7, sustainability: 9,
      tiers: { premium: { costPrice: 180, recommendedPrice: 399 }, standard: { costPrice: 90,  recommendedPrice: 229 }, budget: { costPrice: 30,  recommendedPrice: 89  } } },
    { id: 'bag',       name: 'Treningsbag',        icon: '🎒', maxDemandPerMonth: 50,  quality: 8, sustainability: 7,
      tiers: { premium: { costPrice: 400, recommendedPrice: 999 }, standard: { costPrice: 220, recommendedPrice: 549 }, budget: { costPrice: 100, recommendedPrice: 279 } } },
    { id: 'weights',   name: 'Håndvekter',         icon: '🏋️', maxDemandPerMonth: 70,  quality: 8, sustainability: 8,
      tiers: { premium: { costPrice: 350, recommendedPrice: 799 }, standard: { costPrice: 200, recommendedPrice: 499 }, budget: { costPrice: 80,  recommendedPrice: 229 } } },
  ],
}

export const INDUSTRY_META: Record<Industry, { name: string; emoji: string; description: string; startingMoney: number }> = {
  cafe:    { name: 'Kafé & Bakeri',    emoji: '☕', description: 'Start din egen kafé. Selg kaffe, bakst og lunsj til sultne kunder.', startingMoney: 150_000 },
  fashion: { name: 'Klesbutikk',       emoji: '👗', description: 'Åpne en trendy klesbutikk. Velg produkter, sett priser og tiltrekk motebevisste kunder.', startingMoney: 250_000 },
  tech:    { name: 'Tech & Gadgets',   emoji: '💻', description: 'Selg elektronikk og teknologiprodukter. Høye marginer, men krevende kunder.', startingMoney: 300_000 },
  sports:  { name: 'Sports & Fritid',  emoji: '⚽', description: 'Utstyr for sport og friluftsliv. Sterk sesongvariasjon, men trofaste kunder.', startingMoney: 200_000 },
}

/** Build a Product from a catalog item + tier (initial stock = 0, price = recommendedPrice) */
export function catalogToProduct(item: IndustryCatalogItem, tier: Product['tier']): Product {
  const t = item.tiers[tier]
  return {
    id: `${item.id}_${tier}`,
    name: tier === 'premium' ? `${item.name} (Premium)` : tier === 'standard' ? item.name : `${item.name} (Budget)`,
    icon: item.icon,
    tier,
    costPrice: t.costPrice,
    retailPrice: t.recommendedPrice,
    recommendedPrice: t.recommendedPrice,
    stock: 0,
    quality: tier === 'premium' ? Math.min(10, item.quality + 1) : tier === 'budget' ? Math.max(1, item.quality - 2) : item.quality,
    sustainability: item.sustainability,
    windowDisplay: item.windowDisplay !== false,
    category: item.category,
    sprite: item.sprite,
    trauVare: item.trauVare,
    maxDemandPerMonth: tier === 'premium'
      ? Math.round(item.maxDemandPerMonth * 0.5)
      : tier === 'budget'
      ? Math.round(item.maxDemandPerMonth * 1.4)
      : item.maxDemandPerMonth,
  }
}
