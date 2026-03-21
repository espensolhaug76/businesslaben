// ─── PEST event system ───────────────────────────────────

export const PESTCategory = {
  Political: 'political',
  Economic: 'economic',
  Social: 'social',
  Technological: 'technological',
} as const
export type PESTCategory = (typeof PESTCategory)[keyof typeof PESTCategory]

export interface EventConsequence {
  description: string
  demandModifier: number
  costModifier: number
  reputationModifier: number
  duration: number // months
}

export interface EventChoice {
  id: string
  label: string
  description: string
  consequence: EventConsequence
}

export interface PESTEvent {
  id: string
  title: string
  description: string
  category: PESTCategory
  severity: 'low' | 'medium' | 'high'
  month?: number
  choices: EventChoice[]
}

// ─── Inbox message ───────────────────────────────────────

export interface InboxMessage {
  id: string
  month: number
  year: number
  title: string
  body: string
  type: 'event' | 'tip' | 'result' | 'warning'
  read: boolean
}
