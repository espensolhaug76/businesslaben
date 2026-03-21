// ─── Marketing campaign ──────────────────────────────────

export const MarketingChannel = {
  SocialMedia: 'social_media',
  TV: 'tv',
  Influencer: 'influencer',
  Print: 'print',
  Online: 'online',
  Outdoor: 'outdoor',
} as const
export type MarketingChannel = (typeof MarketingChannel)[keyof typeof MarketingChannel]

export interface Campaign {
  id: string
  name: string
  channel: MarketingChannel
  monthlyBudget: number
  startMonth: number
  durationMonths: number
  targetReach: number
  isActive: boolean
}
