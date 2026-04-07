import React, { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Button } from '../../components/ui/Button'
import { Step1Family } from './Step1Family'
import { Step2Assets } from './Step2Assets'
import { Step3Income } from './Step3Income'
import { Step4Tax } from './Step4Tax'
import { Step5Pension } from './Step5Pension'
import { Step6Withdrawal } from './Step6Withdrawal'
import { Step7Results } from './Step7Results'

const STEPS = ['משפחה', 'נכסים', 'הכנסות', 'מיסוי', 'פנסיה', 'משיכה', 'תוצאות']

export const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState({})

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDataChange = (data: any) => {
    setWizardData((prev) => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1Family data={wizardData} onChange={handleDataChange} />
      case 1:
        return <Step2Assets data={wizardData} onChange={handleDataChange} />
      case 2:
        return <Step3Income data={wizardData} onChange={handleDataChange} />
      case 3:
        return <Step4Tax data={wizardData} onChange={handleDataChange} />
      case 4:
        return <Step5Pension data={wizardData} onChange={handleDataChange} />
      case 5:
        return <Step6Withdrawal data={wizardData} onChange={handleDataChange} />
      case 6:
        return <Step7Results data={wizardData} />
      default:
        return null
    }
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-cream mb-2">אשף תכנון פרישה</h1>
          <p className="text-text-muted">בנו תכנית פרישה מותאמת אישית בשבעה שלבים פשוטים</p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

        <div className="bg-surface rounded-xl p-8 min-h-[500px]">
          {renderStep()}
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            חזור
          </Button>

          <div className="text-sm text-text-muted">
            שלב {currentStep + 1} מתוך {STEPS.length}
          </div>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === STEPS.length - 1}
          >
            הבא
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
