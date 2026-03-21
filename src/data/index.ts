import type { Product, ProductsData, GlossaryEntry, GlossaryData } from '../types'
import productsJson from './products.json'
import glossaryJson from './glossary.json'

const productsData = productsJson as unknown as ProductsData
const glossaryData = glossaryJson as unknown as GlossaryData

export const products: Product[] = productsData.products
export const glossary: GlossaryEntry[] = glossaryData.glossary

export function getProductsByIndustry(industry: string): Product[] {
  return products.filter((p) => p.industry === industry)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getGlossaryByCategory(category: string): GlossaryEntry[] {
  return glossary.filter((g) => g.category === category)
}
