import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../components/ui/Card';
import { Check } from 'lucide-react';
export const Step6Withdrawal = ({ data, onChange }) => {
    const strategies = [
        {
            id: 'taxable_first',
            name: 'משיכה מנכסים חייבים קודם',
            description: 'משוך תחילה מחשבונות בני אומה ונדל״ן, כדי להעביר כסף לקרן פנסיה בשלבים מאוחרים יותר.',
            pros: ['מיעוט המס בשנים המוקדמות', 'גידול פוטנציאלי בקרן פנסיה'],
            cons: ['שיעור מס גבוה יותר בשלבים מאוחרים', 'יכול להשפיע על זכויות סוציאליות'],
        },
        {
            id: 'pension_first',
            name: 'משיכה מפנסיה קודם',
            description: 'משוך תחילה מקרן הפנסיה כדי להעביר כסף לנכסים חייבים.',
            pros: ['משיכה מהקרן עם הנחות מסיות', 'מימוש זכויות סוציאליות'],
            cons: ['אפשרות קצבה נמוכה בעתיד', 'סיכון להוצאה מוקדמת של כספים'],
        },
        {
            id: 'pro_rata',
            name: 'משיכה יחסית',
            description: 'משוך באופן יחסי מכל מקורות ההכנסה (מומלץ).',
            pros: ['איזון מס אופטימלי', 'גדישה אחידה'],
            cons: ['פחות גמישות אישית'],
        },
    ];
    const selected = data.withdrawalStrategy || 'pro_rata';
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-cream mb-4", children: "\u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D9\u05EA \u05DE\u05E9\u05D9\u05DB\u05D4" }), _jsx("p", { className: "text-text-muted mb-6", children: "\u05D1\u05D7\u05E8 \u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D9\u05EA \u05DE\u05E9\u05D9\u05DB\u05D4 \u05DC\u05DE\u05D9\u05DE\u05D5\u05E9 \u05D4\u05D4\u05DB\u05E0\u05E1\u05D4 \u05D1\u05E4\u05E8\u05D9\u05E9\u05D4" })] }), _jsx("div", { className: "space-y-4", children: strategies.map((strategy) => (_jsx(Card, { className: `cursor-pointer transition-all ${selected === strategy.id
                        ? 'border-2 border-gold ring-2 ring-gold ring-opacity-30'
                        : 'hover:border-gold'}`, onClick: () => onChange({ withdrawalStrategy: strategy.id }), children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `
                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                  ${selected === strategy.id
                                    ? 'border-gold bg-gold'
                                    : 'border-surface-light'}
                `, children: selected === strategy.id && _jsx(Check, { size: 16, className: "text-navy" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-semibold text-cream mb-2", children: strategy.name }), _jsx("p", { className: "text-text-muted text-sm mb-4", children: strategy.description }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-cream font-semibold mb-2", children: "\u05D9\u05EA\u05E8\u05D5\u05E0\u05D5\u05EA:" }), _jsx("ul", { className: "space-y-1", children: strategy.pros.map((pro, idx) => (_jsxs("li", { className: "text-xs text-green-300 flex items-start gap-2", children: [_jsx("span", { className: "text-green-400", children: "\u2713" }), _jsx("span", { children: pro })] }, idx))) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-cream font-semibold mb-2", children: "\u05D7\u05E1\u05E8\u05D5\u05E0\u05D5\u05EA:" }), _jsx("ul", { className: "space-y-1", children: strategy.cons.map((con, idx) => (_jsxs("li", { className: "text-xs text-red-300 flex items-start gap-2", children: [_jsx("span", { className: "text-red-400", children: "\u2717" }), _jsx("span", { children: con })] }, idx))) })] })] })] })] }) }, strategy.id))) }), selected === 'pro_rata' && (_jsx("div", { className: "bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4", children: _jsxs("p", { className: "text-blue-200 text-sm", children: [_jsx("strong", { children: "\u05DE\u05D5\u05DE\u05DC\u05E5:" }), " \u05D0\u05E1\u05D8\u05E8\u05D8\u05D2\u05D9\u05D4 \u05D6\u05D5 \u05D4\u05D9\u05D0 \u05D4\u05D0\u05D9\u05D6\u05D5\u05E0\u05D9\u05EA \u05D1\u05D9\u05D5\u05EA\u05E8 \u05D5\u05D1\u05D9\u05D8\u05D5\u05D7\u05D4 \u05DE\u05E4\u05E0\u05D9 \u05E1\u05D9\u05DB\u05D5\u05E0\u05D9\u05DD \u05D1\u05E9\u05D9\u05E2\u05D5\u05E8 \u05DE\u05E1 \u05D2\u05D1\u05D5\u05D4 \u05D0\u05D5 \u05E0\u05DE\u05D5\u05DA \u05DC\u05D0 \u05E6\u05E4\u05D5\u05D9."] }) }))] }));
};
