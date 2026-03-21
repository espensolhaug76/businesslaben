// ─── Email system ─────────────────────────────────────────

export interface EmailChoice {
  id: string
  label: string
  icon: string
  cost?: number
  effect: {
    reputation?: number
    demand?: number
    money?: number
    awareness?: number
  }
}

export interface GameEmail {
  id: string
  from: string
  fromIcon: string
  subject: string
  body: string
  type: 'opportunity' | 'supplier' | 'complaint' | 'marketing' | 'regulatory' | 'competitor'
  month: number  // Which month to deliver
  read: boolean
  responded: boolean
  choices: EmailChoice[]
  deadline?: string
}

// ─── News system ──────────────────────────────────────────

export interface NewsArticle {
  id: string
  category: 'political' | 'economic' | 'social' | 'technological' | 'industry'
  categoryIcon: string
  headline: string
  body: string
  effect?: string
  tip?: string
  month: number  // Which month it appears
  read: boolean
}
