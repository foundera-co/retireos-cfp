import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { Step1Family } from './Step1Family';
import { Step2Assets } from './Step2Assets';
import { Step3Income } from './Step3Income';
import { Step4Tax } from './Step4Tax';
import { Step5Pension } from './Step5Pension';
import { Step6Withdrawal } from './Step6Withdrawal';
import { Step7Results } from './Step7Results';
const STEPS = ['משפחה', 'נכסים', 'הכנסות', 'מיסוי', 'פנסיה', 'משיכה', 'תוצאות'];
export const Wizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [wizardData, setWizardData] = useState({});
    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const handleDataChange = (data) => {
        setWizardData((prev) => ({ ...prev, ...data }));
    };
    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return _jsx(Step1Family, { data: wizardData, onChange: handleDataChange });
            case 1:
                return _jsx(Step2Assets, { data: wizardData, onChange: handleDataChange });
            case 2:
                return _jsx(Step3Income, { data: wizardData, onChange: handleDataChange });
            case 3:
                return _jsx(Step4Tax, { data: wizardData, onChange: handleDataChange });
            case 4:
                return _jsx(Step5Pension, { data: wizardData, onChange: handleDataChange });
            case 5:
                return _jsx(Step6Withdrawal, { data: wizardData, onChange: handleDataChange });
            case 6:
                return _jsx(Step7Results, { data: wizardData });
            default:
                return null;
        }
    };
    return (_jsx(AppShell, { children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-cream mb-2", children: "\u05D0\u05E9\u05E3 \u05EA\u05DB\u05E0\u05D5\u05DF \u05E4\u05E8\u05D9\u05E9\u05D4" }), _jsx("p", { className: "text-text-muted", children: "\u05D1\u05E0\u05D5 \u05EA\u05DB\u05E0\u05D9\u05EA \u05E4\u05E8\u05D9\u05E9\u05D4 \u05DE\u05D5\u05EA\u05D0\u05DE\u05EA \u05D0\u05D9\u05E9\u05D9\u05EA \u05D1\u05E9\u05D1\u05E2\u05D4 \u05E9\u05DC\u05D1\u05D9\u05DD \u05E4\u05E9\u05D5\u05D8\u05D9\u05DD" })] }), _jsx(ProgressBar, { currentStep: currentStep, totalSteps: STEPS.length, steps: STEPS }), _jsx("div", { className: "bg-surface rounded-xl p-8 min-h-[500px]", children: renderStep() }), _jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx(Button, { variant: "secondary", onClick: handleBack, disabled: currentStep === 0, children: "\u05D7\u05D6\u05D5\u05E8" }), _jsxs("div", { className: "text-sm text-text-muted", children: ["\u05E9\u05DC\u05D1 ", currentStep + 1, " \u05DE\u05EA\u05D5\u05DA ", STEPS.length] }), _jsx(Button, { variant: "primary", onClick: handleNext, disabled: currentStep === STEPS.length - 1, children: "\u05D4\u05D1\u05D0" })] })] }) }));
};
