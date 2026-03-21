import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { Employee } from '../types/Employee'
import { EmployeeRole, EmployeeLevel } from '../types/Employee'
import { PageTransition, StaggerContainer, StaggerItem, GameButton } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const ARBEIDSGIVERAVGIFT = 0.141

const roleConfig = [
  {
    role: EmployeeRole.Sales,
    label: 'Salg',
    icon: '🛒',
    description: 'Øker salgsvolum og kundetilfang. Viktig for fysisk butikk.',
    salaries: {
      [EmployeeLevel.Junior]: 28_000,
      [EmployeeLevel.Senior]: 42_000,
      [EmployeeLevel.Expert]: 58_000,
    },
    efficiencies: {
      [EmployeeLevel.Junior]: 0.6,
      [EmployeeLevel.Senior]: 0.85,
      [EmployeeLevel.Expert]: 1.0,
    },
  },
  {
    role: EmployeeRole.Marketing,
    label: 'Markedsføring',
    icon: '📣',
    description: 'Forbedrer kampanjeeffekt og merkevarebygging.',
    salaries: {
      [EmployeeLevel.Junior]: 30_000,
      [EmployeeLevel.Senior]: 45_000,
      [EmployeeLevel.Expert]: 62_000,
    },
    efficiencies: {
      [EmployeeLevel.Junior]: 0.6,
      [EmployeeLevel.Senior]: 0.85,
      [EmployeeLevel.Expert]: 1.0,
    },
  },
  {
    role: EmployeeRole.Finance,
    label: 'Økonomi',
    icon: '📊',
    description: 'Gir bedre innsikt i kostnader og lønnsomhet.',
    salaries: {
      [EmployeeLevel.Junior]: 32_000,
      [EmployeeLevel.Senior]: 48_000,
      [EmployeeLevel.Expert]: 65_000,
    },
    efficiencies: {
      [EmployeeLevel.Junior]: 0.6,
      [EmployeeLevel.Senior]: 0.85,
      [EmployeeLevel.Expert]: 1.0,
    },
  },
] as const

const levelLabels: Record<string, string> = {
  [EmployeeLevel.Junior]: 'Junior',
  [EmployeeLevel.Senior]: 'Senior',
  [EmployeeLevel.Expert]: 'Ekspert',
}

let nextEmployeeId = 1

export default function PersonnelScreen() {
  const employees = useGameStore((s) => s.employees)
  const monthlyPersonnelCost = useGameStore((s) => s.monthlyPersonnelCost)
  const hireEmployee = useGameStore((s) => s.hireEmployee)
  const fireEmployee = useGameStore((s) => s.fireEmployee)
  const workingAlone = useGameStore((s) => s.workingAlone)

  const [selectedLevels, setSelectedLevels] = useState<Record<string, EmployeeLevel>>({
    [EmployeeRole.Sales]: EmployeeLevel.Junior,
    [EmployeeRole.Marketing]: EmployeeLevel.Junior,
    [EmployeeRole.Finance]: EmployeeLevel.Junior,
  })

  const totalWithTax = Math.round(monthlyPersonnelCost * (1 + ARBEIDSGIVERAVGIFT))

  function handleToggleWorkAlone() {
    useGameStore.setState({ workingAlone: !workingAlone })
    if (!workingAlone) {
      for (const emp of employees) {
        fireEmployee(emp.id)
      }
    }
  }

  function handleLevelChange(role: string, level: EmployeeLevel) {
    setSelectedLevels((prev) => ({ ...prev, [role]: level }))
  }

  function handleHire(config: typeof roleConfig[number]) {
    const level = selectedLevels[config.role] ?? EmployeeLevel.Junior
    const salary = config.salaries[level]
    const efficiency = config.efficiencies[level]

    const employee: Employee = {
      id: `emp-${nextEmployeeId++}`,
      name: `${config.label} (${levelLabels[level]})`,
      role: config.role,
      level,
      salary,
      efficiency,
      active: true,
    }
    hireEmployee(employee)
  }

  function handleFire(employeeId: string) {
    fireEmployee(employeeId)
  }

  const hiredByRole = (role: string) => employees.filter((e) => e.role === role)

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">Personale</h1>
        <p className="text-sm text-gray-400 mb-6">Ansett medarbeidere for å styrke bedriften din.</p>
      </motion.div>

      {/* Work alone toggle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="mb-6 rounded-xl bg-gray-900 border border-gray-800 p-5 flex items-center justify-between"
      >
        <div>
          <div className="font-semibold text-white">Jobb alene</div>
          <div className="text-sm text-gray-400">Spar lønnskostnader, men med redusert kapasitet og effektivitet.</div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleWorkAlone}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            workingAlone ? 'bg-teal-500' : 'bg-gray-700'
          }`}
        >
          <motion.div
            animate={{ x: workingAlone ? 28 : 2 }}
            transition={{ type: 'spring' as const, stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow"
          />
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {!workingAlone ? (
          <motion.div
            key="team"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Role cards */}
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {roleConfig.map((config) => {
                const level = selectedLevels[config.role] ?? EmployeeLevel.Junior
                const salary = config.salaries[level]
                const salaryWithTax = Math.round(salary * (1 + ARBEIDSGIVERAVGIFT))
                const hired = hiredByRole(config.role)

                return (
                  <StaggerItem key={config.role}>
                    <div className="rounded-xl bg-gray-900 border border-gray-800 p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{config.icon}</span>
                        <div>
                          <div className="font-bold text-white text-lg">{config.label}</div>
                          <div className="text-xs text-gray-400">{config.description}</div>
                        </div>
                      </div>

                      {/* Level selector */}
                      <div className="flex gap-1 mb-3">
                        {([EmployeeLevel.Junior, EmployeeLevel.Senior, EmployeeLevel.Expert] as const).map((lvl) => (
                          <motion.button
                            key={lvl}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLevelChange(config.role, lvl)}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                              level === lvl
                                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                            }`}
                          >
                            {levelLabels[lvl]}
                          </motion.button>
                        ))}
                      </div>

                      {/* Salary info */}
                      <div className="text-sm space-y-1 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bruttolønn</span>
                          <span className="text-gray-200">{formatKr(salary)}/mnd</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">+ Arbeidsgiveravgift (14,1%)</span>
                          <span className="text-gray-200">{formatKr(salaryWithTax - salary)}/mnd</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-800 pt-1 font-medium">
                          <span className="text-gray-300">Total kostnad</span>
                          <span className="text-amber-400">{formatKr(salaryWithTax)}/mnd</span>
                        </div>
                      </div>

                      {/* Hire button */}
                      <GameButton
                        onClick={() => handleHire(config)}
                        className="w-full py-2 rounded-lg bg-teal-500 text-gray-950 font-semibold text-sm hover:bg-teal-400 transition-colors"
                      >
                        + Ansett {config.label.toLowerCase()}
                      </GameButton>

                      {/* Hired list */}
                      <AnimatePresence>
                        {hired.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 space-y-2"
                          >
                            {hired.map((emp) => (
                              <motion.div
                                key={emp.id}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                className="flex items-center justify-between rounded-lg bg-gray-800 px-3 py-2"
                              >
                                <div>
                                  <div className="text-sm text-white">{emp.name}</div>
                                  <div className="text-xs text-gray-400">{formatKr(emp.salary)}/mnd</div>
                                </div>
                                <GameButton
                                  onClick={() => handleFire(emp.id)}
                                  className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                                >
                                  Si opp
                                </GameButton>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>

            {/* Total cost summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Ansatte</span>
                <span className="font-medium text-white">{employees.length} person(er)</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Sum bruttolønninger</span>
                <span className="text-gray-200">{formatKr(monthlyPersonnelCost)}/mnd</span>
              </div>
              <div className="flex items-center justify-between border-t border-teal-500/20 pt-2">
                <span className="font-semibold text-teal-400">Total personalkostnad (inkl. avgift)</span>
                <span className="font-bold text-xl text-teal-300">{formatKr(totalWithTax)}/mnd</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="alone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-gray-900 border border-gray-800 p-8 text-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
              className="text-4xl mb-3"
            >
              👤
            </motion.div>
            <div className="font-bold text-white text-lg mb-2">Du jobber alene</div>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Du sparer lønnskostnader, men har begrenset kapasitet. Du kan ansette medarbeidere
              når som helst ved å slå av &quot;Jobb alene&quot;.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
