// --- Per-product sales breakdown ---

export interface ProductSalesResult {
  productId: string
  productName: string
  unitsSold: number
  revenue: number
  cogs: number
  demand: number
  stockRemaining?: number
}

// --- Monthly result ---

export interface MonthResult {
  month: number
  year?: number
  totalSales: number
  totalRevenue?: number
  totalCosts: number
  profit: number
  unitsSold: number
  customerCount?: number
  pestEvent: string | null
  productResults: ProductSalesResult[]
  marketingSpend?: number
  personnelCost?: number
  rentCost?: number
  otherCosts?: number
}
