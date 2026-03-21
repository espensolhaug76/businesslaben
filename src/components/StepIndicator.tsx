const steps = [
  { num: 1, label: 'Oppstart' },
  { num: 2, label: 'Målgruppe' },
  { num: 3, label: 'Modell' },
  { num: 4, label: 'Produkter' },
  { num: 5, label: 'Priser' },
  { num: 6, label: 'Dashboard' },
]

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center gap-1 sm:gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                step.num < currentStep
                  ? 'bg-indigo-400 text-white'
                  : step.num === currentStep
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-gray-300 text-gray-500'
              }`}
            >
              {step.num < currentStep ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </span>
            <span className="text-xs text-gray-500 mt-1 hidden sm:block">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 sm:w-8 h-0.5 mb-4 sm:mb-5 ${
                step.num < currentStep ? 'bg-indigo-400' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
