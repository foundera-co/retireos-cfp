import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ProgressBar = ({ currentStep, totalSteps, steps }) => {
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (_jsxs("div", { className: "w-full", children: [_jsx("div", { className: "w-full bg-surface-light rounded-full h-2 mb-6", children: _jsx("div", { className: "bg-gold h-2 rounded-full transition-all duration-300", style: { width: `${progressPercentage}%` } }) }), _jsx("div", { className: "flex justify-between", children: steps.map((step, index) => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: `
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                transition-colors duration-200
                ${index < currentStep
                                ? 'bg-gold text-navy'
                                : index === currentStep
                                    ? 'bg-gold text-navy'
                                    : 'bg-surface-light text-text-muted'}
              `, children: index + 1 }), _jsx("p", { className: "text-xs text-text-muted mt-2 text-center max-w-[80px]", children: step })] }, index))) })] }));
};
