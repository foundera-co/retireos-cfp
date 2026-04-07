import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const formatCurrency = (value) => {
    if (value >= 1000000) {
        return `₪${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `₪${(value / 1000).toFixed(0)}K`;
    }
    return `₪${value.toFixed(0)}`;
};
export const CashflowChart = ({ data }) => {
    return (_jsxs("div", { className: "w-full h-96 bg-surface rounded-xl p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-cream mb-4", children: "\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05DE\u05D5\u05DC \u05D4\u05D5\u05E6\u05D0\u05D5\u05EA" }), _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: data, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e2a40" }), _jsx(XAxis, { dataKey: "year", stroke: "#8892a4", style: { fontSize: '12px' } }), _jsx(YAxis, { stroke: "#8892a4", style: { fontSize: '12px' }, tickFormatter: formatCurrency }), _jsx(Tooltip, { contentStyle: {
                                backgroundColor: '#1a2235',
                                border: '1px solid #d4af37',
                                borderRadius: '8px',
                                color: '#f5f0e8',
                            }, formatter: (value) => formatCurrency(value) }), _jsx(Legend, { wrapperStyle: { color: '#8892a4' } }), _jsx(Bar, { dataKey: "totalIncome", name: "\u05D4\u05DB\u05E0\u05E1\u05D4", fill: "#10b981" }), _jsx(Bar, { dataKey: "totalExpenses", name: "\u05D4\u05D5\u05E6\u05D0\u05D4", fill: "#ef4444" })] }) })] }));
};
