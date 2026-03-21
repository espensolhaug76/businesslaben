import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, GameButton } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

// Channel definitions with target audience match hints
const CHANNELS = [
  {
    id: 'instagram',
    name: 'Instagram',
    storeKey: 'Instagram',
    description: 'Visuell plattform for mote, mat og livsstil',
    bestFor: ['youth', 'young_adult', 'trendsetter', 'eco_friendly'],
    icon: '📸',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    storeKey: 'Facebook',
    description: 'Bred rekkevidde, spesielt 30+ aldersgruppen',
    bestFor: ['adult', 'senior', 'quality_conscious', 'price_conscious'],
    icon: '📘',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    storeKey: 'TV', // Reuse TV budget field for TikTok in this version
    description: 'Kort videoinnhold for unge, viral spredning',
    bestFor: ['youth', 'young_adult', 'trendsetter'],
    icon: '🎵',
  },
  {
    id: 'google',
    name: 'Google Ads',
    storeKey: 'Print', // Reuse Print budget field for Google Ads
    description: 'Søkemotorannonsering, treffer folk med kjøpsintensjon',
    bestFor: ['adult', 'quality_conscious', 'price_conscious'],
    icon: '🔍',
  },
  {
    id: 'influencer',
    name: 'Influencer',
    storeKey: 'Influencer',
    description: 'Samarbeid med profiler som når din målgruppe',
    bestFor: ['youth', 'young_adult', 'trendsetter', 'eco_friendly'],
    icon: '⭐',
  },
  {
    id: 'tv',
    name: 'TV / Radio',
    storeKey: 'TV',
    description: 'Tradisjonelle medier, bred rekkevidde blant eldre',
    bestFor: ['adult', 'senior', 'quality_conscious'],
    icon: '📺',
  },
  {
    id: 'print',
    name: 'Print / Avis',
    storeKey: 'Print',
    description: 'Magasiner og aviser, troverdighet og merkevarebygging',
    bestFor: ['adult', 'senior', 'quality_conscious'],
    icon: '📰',
  },
] as const

const APPEAL_TYPES = [
  {
    id: 'rasjonell',
    label: 'Rasjonell',
    description: 'Fakta, kvalitet og funksjonalitet. Appellerer til fornuft og logikk.',
    icon: '🧠',
  },
  {
    id: 'emosjonell',
    label: 'Emosjonell',
    description: 'Følelser, drømmer og identitet. Skaper en følelsesmessig tilknytning.',
    icon: '❤️',
  },
  {
    id: 'etisk',
    label: 'Etisk',
    description: 'Bærekraft, rettferdighet og verdier. Appellerer til samvittigheten.',
    icon: '🌱',
  },
] as const

const MAX_BUDGET_PER_CHANNEL = 50000

export default function MarketingScreen() {
  const navigate = useNavigate()
  const store = useGameStore()

  const {
    marketingBudgetFacebook,
    marketingBudgetTV,
    marketingBudgetInfluencer,
    marketingBudgetPrint,
    marketingBudgetInstagram,
    appealType,
    targetSegments,
    setMarketingBudget,
    setAppealType,
  } = store

  // Local state for channel budgets (mapped to store fields)
  const budgetMap: Record<string, number> = {
    instagram: marketingBudgetInstagram,
    facebook: marketingBudgetFacebook,
    tiktok: marketingBudgetTV, // Shares TV field
    google: marketingBudgetPrint, // Shares Print field
    influencer: marketingBudgetInfluencer,
    tv: marketingBudgetTV,
    print: marketingBudgetPrint,
  }

  // Enabled channels — only allow one per store key to avoid double-counting
  const [enabledChannels, setEnabledChannels] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (marketingBudgetInstagram > 0) initial.add('instagram')
    if (marketingBudgetFacebook > 0) initial.add('facebook')
    if (marketingBudgetTV > 0) initial.add('tv')
    if (marketingBudgetInfluencer > 0) initial.add('influencer')
    if (marketingBudgetPrint > 0) initial.add('print')
    return initial
  })

  const primarySegment = targetSegments.find((s) => s.isPrimary) ?? targetSegments[0]

  // Calculate target match for a channel
  function getMatchLevel(bestFor: readonly string[]): 'god' | 'middels' | 'svak' {
    if (!primarySegment) return 'middels'
    const playerTags = [
      ...primarySegment.ageGroups,
      ...primarySegment.psychographics,
    ]
    const matches = bestFor.filter((tag) => playerTags.includes(tag)).length
    if (matches >= 2) return 'god'
    if (matches >= 1) return 'middels'
    return 'svak'
  }

  function getMatchColor(level: 'god' | 'middels' | 'svak'): string {
    switch (level) {
      case 'god': return 'text-emerald-400'
      case 'middels': return 'text-amber-400'
      case 'svak': return 'text-red-400'
    }
  }

  function getMatchLabel(level: 'god' | 'middels' | 'svak'): string {
    switch (level) {
      case 'god': return 'God match'
      case 'middels': return 'Middels match'
      case 'svak': return 'Svak match'
    }
  }

  function handleToggleChannel(channelId: string) {
    const newEnabled = new Set(enabledChannels)
    if (newEnabled.has(channelId)) {
      newEnabled.delete(channelId)
      // Reset budget for this channel
      const channel = CHANNELS.find((c) => c.id === channelId)
      if (channel) {
        setMarketingBudget(channel.storeKey.toLowerCase(), 0)
      }
    } else {
      newEnabled.add(channelId)
    }
    setEnabledChannels(newEnabled)
  }

  function handleBudgetChange(channelId: string, value: number) {
    const channel = CHANNELS.find((c) => c.id === channelId)
    if (!channel) return
    const clamped = Math.min(MAX_BUDGET_PER_CHANNEL, Math.max(0, value))
    setMarketingBudget(channel.storeKey.toLowerCase(), clamped)
  }

  // Calculate total from store values
  const totalBudget =
    marketingBudgetFacebook +
    marketingBudgetTV +
    marketingBudgetInfluencer +
    marketingBudgetPrint +
    marketingBudgetInstagram

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white">Markedskommunikasjon</h1>
          <p className="text-slate-400 mt-1">
            Velg markedsføringskanaler og sett budsjett for å nå din målgruppe
          </p>
        </motion.div>

        {/* Appeal type selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6"
        >
          <h2 className="font-bold text-white mb-1">Appell-type</h2>
          <p className="text-sm text-slate-400 mb-4">
            Velg hvilken type budskap du vil bruke i markedsføringen
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {APPEAL_TYPES.map((appeal) => {
              const isSelected = appealType === appeal.id
              return (
                <motion.button
                  key={appeal.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setAppealType(appeal.id)}
                  className={`p-4 rounded-xl border text-left transition-colors ${
                    isSelected
                      ? 'border-teal-500 bg-teal-500/10 ring-1 ring-teal-500/30'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }`}
                >
                  <motion.div
                    animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-2xl mb-2"
                  >
                    {appeal.icon}
                  </motion.div>
                  <div className={`font-semibold mb-1 ${isSelected ? 'text-teal-400' : 'text-white'}`}>
                    {appeal.label}
                  </div>
                  <div className="text-xs text-slate-400">{appeal.description}</div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Channel selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6"
        >
          <h2 className="font-bold text-white mb-1">Markedsføringskanaler</h2>
          <p className="text-sm text-slate-400 mb-4">
            Aktiver kanaler og juster budsjettet (0 - {formatKr(MAX_BUDGET_PER_CHANNEL)}/mnd per kanal)
          </p>

          <div className="space-y-3">
            {CHANNELS.map((channel, i) => {
              const isEnabled = enabledChannels.has(channel.id)
              const matchLevel = getMatchLevel(channel.bestFor)
              const budget = budgetMap[channel.id] ?? 0

              return (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                  className={`rounded-xl border p-4 transition-colors ${
                    isEnabled
                      ? 'border-teal-500/40 bg-slate-700/60'
                      : 'border-slate-700 bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Toggle */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleToggleChannel(channel.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isEnabled
                          ? 'bg-teal-500 border-teal-500'
                          : 'border-slate-500 hover:border-slate-400'
                      }`}
                    >
                      {isEnabled && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </motion.button>

                    {/* Channel info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{channel.icon}</span>
                        <span className={`font-semibold ${isEnabled ? 'text-white' : 'text-slate-400'}`}>
                          {channel.name}
                        </span>
                        {primarySegment && (
                          <span className={`text-xs font-medium ${getMatchColor(matchLevel)}`}>
                            {getMatchLabel(matchLevel)}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{channel.description}</div>
                    </div>

                    {/* Budget */}
                    {isEnabled && (
                      <div className="text-right flex-shrink-0 w-28">
                        <div className="text-xs text-slate-400 mb-1">{formatKr(budget)}/mnd</div>
                      </div>
                    )}
                  </div>

                  {/* Budget slider */}
                  <AnimatePresence>
                    {isEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pl-8"
                      >
                        <input
                          type="range"
                          min={0}
                          max={MAX_BUDGET_PER_CHANNEL}
                          step={1000}
                          value={budget}
                          onChange={(e) => handleBudgetChange(channel.id, parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>0 kr</span>
                          <span>{formatKr(MAX_BUDGET_PER_CHANNEL)}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Total budget summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">Total markedsføringskostnad</h3>
              <p className="text-xs text-slate-400">Belastes kontoen din hver måned</p>
            </div>
            <div className={`text-2xl font-bold ${totalBudget > 0 ? 'text-teal-400' : 'text-slate-500'}`}>
              {formatKr(totalBudget)}/mnd
            </div>
          </div>
          <AnimatePresence>
            {totalBudget === 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
              >
                <p className="text-sm text-amber-400">
                  Uten markedsføring vil etterspørselen være ca. 20% lavere. Vurder å investere i minst en kanal.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between"
        >
          <GameButton
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all"
          >
            Tilbake til dashboard
          </GameButton>
          <GameButton
            onClick={() => navigate('/dashboard')}
            pulse
            className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30 transition-all"
          >
            Lagre og fortsett
          </GameButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
