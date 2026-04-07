import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="w-full bg-surface-light rounded-full h-2 mb-6">
        <div
          className="bg-gold h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                transition-colors duration-200
                ${
                  index < currentStep
                    ? 'bg-gold text-navy'
                    : index === currentStep
                    ? 'bg-gold text-navy'
                    : 'bg-surface-light text-text-muted'
                }
              `}
            >
              {index + 1}
            </div>
            <p className="text-xs text-text-muted mt-2 text-center max-w-[80px]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
