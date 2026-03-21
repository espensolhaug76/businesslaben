import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, GameButton, AnimatedNumber } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const sources = [
  {
    id: 'own',
    icon: '💰',
    title: 'Egenkapital',
    description: 'Egne oppsparte midler',
    pros: 'Ingen renter, full kontroll',
    cons: 'Risikerer egne sparepenger',
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    title: 'Familie / venner',
    description: 'Lån fra familie eller bekjente',
    pros: 'Fleksible vilkår, lav rente',
    cons: 'Personlige relasjoner kan påvirkes',
  },
  {
    id: 'bank',
    icon: '🏦',
    title: 'Banklån',
    description: 'Næringslån fra banken',
    pros: 'Profesjonelt, store beløp mulig',
    cons: 'Krever sikkerhet, renter 6-12%',
  },
  {
    id: 'investor',
    icon: '🎯',
    title: 'Investor / angel',
    description: 'Investor tar eierandel',
    pros: 'Mentorskap, nettverk, kompetanse',
    cons: 'Gir fra seg eierskap (20-40%)',
  },
  {
    id: 'grant',
    icon: '🏛️',
    title: 'Innovasjon Norge',
    description: 'Offentlig tilskudd (maks 100 000 kr)',
    pros: 'Trenger ikke betales tilbake',
    cons: 'Krever bærekraftsfokus, søknadsprosess',
  },
]

export default function FinancingScreen() {
  const navigate = useNavigate()
  const budgetStartup = useGameStore((s) => s.budgetStartup)
  const budgetMonthly = useGameStore((s) => s.budgetMonthly)
  const existing = useGameStore((s) => s.financingPlan)
  const sustainabilityProfile = useGameStore((s) => s.sustainabilityProfile)

  const totalStartup = budgetStartup ? Object.values(budgetStartup).reduce((s, v) => s + v, 0) : 0
  const totalMonthly = budgetMonthly ? Object.values(budgetMonthly).reduce((s, v) => s + v, 0) : 0
  const totalNeeded = totalStartup + totalMonthly * 3 // 3 months buffer

  const [ownCapital, setOwnCapital] = useState(existing?.ownCapital || 0)
  const [familyLoan, setFamilyLoan] = useState(existing?.familyLoan || 0)
  const [familyInterest, setFamilyInterest] = useState(existing?.familyInterest || 2)
  const [bankLoan, setBankLoan] = useState(existing?.bankLoan || 0)
  const [bankInterest, setBankInterest] = useState(existing?.bankInterest || 8)
  const [investorAmount, setInvestorAmount] = useState(existing?.investorAmount || 0)
  const [investorEquity, setInvestorEquity] = useState(existing?.investorEquity || 25)
  const [grantAmount, setGrantAmount] = useState(existing?.grantAmount || 0)

  const totalFinancing = ownCapital + familyLoan + bankLoan + investorAmount + grantAmount
  const gap = totalNeeded - totalFinancing
  const monthlyLoanPayment = Math.round((familyLoan * (familyInterest / 100) / 12) + (familyLoan / 36)
    + (bankLoan * (bankInterest / 100) / 12) + (bankLoan / 36))

  const canGetGrant = sustainabilityProfile === 'sustainable'
  const canProceed = totalFinancing >= totalNeeded * 0.8 // Allow 80% coverage

  function handleNext() {
    if (!canProceed) return
    useGameStore.setState({
      financingPlan: {
        ownCapital,
        familyLoan,
        familyInterest,
        bankLoan,
        bankInterest,
        investorAmount,
        investorEquity,
        grantAmount: canGetGrant ? grantAmount : 0,
      },
      // Set starting capital based on total financing
      startingMoney: totalFinancing,
      currentMoney: totalFinancing - totalStartup,
      // Set monthly loan payment
      monthlyLoanPayment,
      currentLoan: familyLoan + bankLoan,
    })
    navigate('/city')
  }

  function parseNum(val: string): number {
    return parseInt(val.replace(/\D/g, '')) || 0
  }

  return (
    <PageTransition>
      <div className="py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Finansieringsplan</h1>
          <p className="text-slate-400">
            Du trenger ca. {formatKr(totalNeeded)} for oppstart + 3 mnd buffer
          </p>
        </motion.div>

        {/* Financing sources */}
        <div className="space-y-3 mb-6">
          {sources.map((source, i) => {
            const isGrant = source.id === 'grant'
            const disabled = isGrant && !canGetGrant

            let value = 0
            let setValue: (v: number) => void = () => {}
            switch (source.id) {
              case 'own': value = ownCapital; setValue = setOwnCapital; break
              case 'family': value = familyLoan; setValue = setFamilyLoan; break
              case 'bank': value = bankLoan; setValue = setBankLoan; break
              case 'investor': value = investorAmount; setValue = setInvestorAmount; break
              case 'grant': value = grantAmount; setValue = setGrantAmount; break
            }

            return (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                className={`bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 ${disabled ? 'opacity-40' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{source.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm">{source.title}</div>
                    <div className="text-xs text-slate-400">{source.description}</div>
                    <div className="flex gap-4 mt-1">
                      <span className="text-[10px] text-emerald-400">+ {source.pros}</span>
                      <span className="text-[10px] text-red-400">- {source.cons}</span>
                    </div>

                    {disabled && (
                      <div className="text-[10px] text-amber-400 mt-1">
                        ⚠️ Krever bærekraftig profil. Du valgte en annen profil.
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-32">
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        disabled={disabled}
                        value={value || ''}
                        onChange={(e) => {
                          let n = parseNum(e.target.value)
                          if (isGrant) n = Math.min(n, 100000)
                          setValue(n)
                        }}
                        placeholder="0"
                        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm text-right focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none disabled:opacity-50"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">kr</span>
                    </div>

                    {/* Extra fields for loans */}
                    {source.id === 'family' && familyLoan > 0 && (
                      <div className="mt-2">
                        <label className="text-[10px] text-slate-500">Rente %</label>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={familyInterest}
                          onChange={(e) => setFamilyInterest(Number(e.target.value))}
                          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs text-right focus:border-teal-500 outline-none"
                        />
                      </div>
                    )}
                    {source.id === 'bank' && bankLoan > 0 && (
                      <div className="mt-2">
                        <label className="text-[10px] text-slate-500">Rente %</label>
                        <input
                          type="number"
                          min={4}
                          max={15}
                          value={bankInterest}
                          onChange={(e) => setBankInterest(Number(e.target.value))}
                          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs text-right focus:border-teal-500 outline-none"
                        />
                      </div>
                    )}
                    {source.id === 'investor' && investorAmount > 0 && (
                      <div className="mt-2">
                        <label className="text-[10px] text-slate-500">Eierandel %</label>
                        <input
                          type="number"
                          min={5}
                          max={50}
                          value={investorEquity}
                          onChange={(e) => setInvestorEquity(Number(e.target.value))}
                          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs text-right focus:border-teal-500 outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-5 mb-6"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">Finansieringsoversikt</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Kapitalbehov</span>
              <span className="text-white font-medium">{formatKr(totalNeeded)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total finansiering</span>
              <span className="font-bold text-lg text-teal-400">
                <AnimatedNumber value={totalFinancing} />
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Differanse</span>
              <span className={`font-bold ${gap <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {gap <= 0 ? 'Dekket ✓' : `Mangler ${formatKr(gap)}`}
              </span>
            </div>
            {monthlyLoanPayment > 0 && (
              <div className="flex justify-between border-t border-teal-500/20 pt-2">
                <span className="text-slate-400">Månedlig lånekostnad</span>
                <span className="text-amber-400 font-medium">{formatKr(monthlyLoanPayment)}/mnd</span>
              </div>
            )}
            {investorAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-400">Du eier av bedriften</span>
                <span className="text-white font-medium">{100 - investorEquity}%</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-between"
        >
          <GameButton
            onClick={() => navigate('/budget-planning')}
            className="px-6 py-3 rounded-xl font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
          >
            ← Tilbake
          </GameButton>
          <GameButton
            onClick={handleNext}
            disabled={!canProceed}
            pulse={canProceed}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              canProceed
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            Neste →
          </GameButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
