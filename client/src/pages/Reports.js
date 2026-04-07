import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download } from 'lucide-react';
export const Reports = () => {
    const reports = [
        {
            id: 'retirement_plan',
            name: 'תוכנית פרישה מלאה',
            description: 'דוח מקיף הכולל ניתוח הכנסות, הוצאות, מיסוי ודוגמאות תחזוקה',
            icon: FileText,
        },
        {
            id: 'tax_analysis',
            name: 'ניתוח מיסוי מפורט',
            description: 'פירוט חישובי המס ללבחור אסטרטגיות להקטנת יודתות מסית',
            icon: FileText,
        },
        {
            id: 'pension_projection',
            name: 'תחזוקת פנסיה',
            description: 'הערכה של קצבאות פנסיה משתי התקופות - לפני ואחרי הפרישה',
            icon: FileText,
        },
        {
            id: 'cashflow_analysis',
            name: 'ניתוח תזרים מזומנים',
            description: 'תחזוקה שנתית של הכנסות, הוצאות וחיסכון לכל שנת הפרישה',
            icon: FileText,
        },
        {
            id: 'asset_allocation',
            name: 'הקצאת נכסים אופטימלית',
            description: 'המלצות לחלוקת נכסים ביחס לסיכון ותשואה',
            icon: FileText,
        },
        {
            id: 'goal_tracking',
            name: 'מעקב אחר יעדים',
            description: 'זהוי הערדות יעדים פיננסיים וסטטוס התקדמות',
            icon: FileText,
        },
    ];
    const handleGenerateReport = (reportId) => {
        alert(`דוח "${reports.find(r => r.id === reportId)?.name}" הופק בהצלחה!`);
    };
    return (_jsx(AppShell, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-cream", children: "\u05D3\u05D5\u05D7\u05D5\u05EA" }), _jsx("p", { className: "text-text-muted mt-1", children: "\u05D9\u05E6\u05E8 \u05D3\u05D5\u05D7\u05D5\u05EA \u05DE\u05E4\u05D5\u05E8\u05D8\u05D9\u05DD \u05DC\u05E0\u05D9\u05EA\u05D5\u05D7 \u05EA\u05DB\u05E0\u05D5\u05DF \u05D4\u05E4\u05E8\u05D9\u05E9\u05D4 \u05E9\u05DC\u05DA" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: reports.map((report) => {
                        const IconComponent = report.icon;
                        return (_jsxs(Card, { className: "flex flex-col", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-bold text-cream mb-2", children: report.name }), _jsx("p", { className: "text-sm text-text-muted", children: report.description })] }), _jsx(IconComponent, { className: "text-gold opacity-30 flex-shrink-0", size: 32 })] }), _jsx("div", { className: "mt-auto pt-4 border-t border-surface-light", children: _jsxs(Button, { onClick: () => handleGenerateReport(report.id), variant: "primary", size: "sm", className: "w-full flex items-center justify-center gap-2", children: [_jsx(Download, { size: 16 }), _jsx("span", { children: "\u05D4\u05E4\u05E7 \u05D3\u05D5\u05D7" })] }) })] }, report.id));
                    }) }), _jsxs(Card, { className: "bg-blue-900 bg-opacity-30 border border-blue-500", children: [_jsx("h3", { className: "text-lg font-semibold text-blue-300 mb-3", children: "\u05E2\u05E6\u05D5\u05EA \u05DC\u05D3\u05D5\u05D7\u05D5\u05EA" }), _jsxs("ul", { className: "space-y-2 text-blue-200 text-sm", children: [_jsx("li", { children: "\u2022 \u05D3\u05D5\u05D7\u05D5\u05EA \u05DE\u05E9\u05D5\u05D3\u05DB\u05D9\u05DD \u05D1\u05DB\u05DC \u05E4\u05E2\u05DD \u05E9\u05D0\u05EA\u05D4 \u05DE\u05E9\u05E0\u05D4 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D1\u05EA\u05DB\u05E0\u05D9\u05EA" }), _jsx("li", { children: "\u2022 \u05D0\u05EA\u05D4 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05D3\u05E4\u05D9\u05E1 \u05D3\u05D5\u05D7\u05D5\u05EA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05DE\u05D4\u05D3\u05E4\u05D3\u05E4\u05DF" }), _jsx("li", { children: "\u2022 \u05E9\u05DE\u05D5\u05E8 \u05E2\u05D5\u05EA\u05E7 \u05E9\u05DC \u05D4\u05D3\u05D5\u05D7\u05D5\u05EA \u05DC\u05DE\u05E2\u05E7\u05D1 \u05D1\u05E2\u05EA\u05D9\u05D3" }), _jsx("li", { children: "\u2022 \u05E9\u05EA\u05E3 \u05D3\u05D5\u05D7\u05D5\u05EA \u05E2\u05DD \u05D9\u05D5\u05E2\u05E6\u05D9\u05DA \u05D4\u05E4\u05D9\u05E0\u05E0\u05E1\u05D9\u05D9\u05DD" })] })] })] }) }));
};
