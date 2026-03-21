// --- Supplier tier ---

export interface SupplierTier {
  brand: string
  cost_per_unit: number
  quality: string
  lead_time_days: number
  sustainability_score: number
}

// --- Production options ---

export interface ProductionCountryOption {
  cost_modifier: number
  lead_time_days: number
}

export interface ProductionOptions {
  raw_material: {
    premium: string
    medium: string
    budget: string
  }
  countries: Record<string, ProductionCountryOption | undefined>
}

// --- Product (catalog definition from data) ---

export interface Product {
  id: string
  industry: string
  name: string
  category: string
  comment?: string
  supplier_tiers: {
    premium: SupplierTier
    medium: SupplierTier
    budget: SupplierTier
  }
  production_options: ProductionOptions
  typical_retail_price: number
  target_audience_match: string[]
  baseAppeal?: number
  kids_price_ratio?: number
}

export interface ProductsData {
  products: Product[]
}

// --- Purchased product (player inventory) ---

export interface PurchasedProduct {
  productId: string
  productName: string
  tierName: string
  brandName: string
  costPerUnitAdult: number
  costPerUnitKids: number
  typicalRetailPrice: number
  retailPriceAdult: number
  retailPriceKids: number
  discountPercent: number
  campaignPriceAdult?: number
  campaignPriceKids?: number
  stockWomen: number
  stockMen: number
  stockKids: number
  isPriced: boolean
  quality: number
  sustainability: number
  leadTimeDays: number
}

// --- Product pricing ---

export interface ProductPricing {
  productId: string
  productName: string
  targetGroup: string
  price: number
  estimatedSales: number
  revenue: number
  cost: number
  profit: number
}
