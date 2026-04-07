import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const formatCurrency = (value) => {
    if (value >= 1000000) {
        return `₪${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `₪${(value / 1000).toFixed(0)}K`;
    }
    return `₪${value.toFixed(0)}`;
};
export const NetWorthChart = ({ data }) => {
    return (_jsxs("div", { className: "w-full h-96 bg-surface rounded-xl p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-cream mb-4", children: "\u05E9\u05D5\u05D5\u05D9 \u05E0\u05D8\u05D5 \u05DE\u05D5\u05E7\u05E8\u05DF" }), _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: data, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorAssets", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#d4af37", stopOpacity: 0.8 }), _jsx("stop", { offset: "95%", stopColor: "#d4af37", stopOpacity: 0.1 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e2a40" }), _jsx(XAxis, { dataKey: "year", stroke: "#8892a4", style: { fontSize: '12px' } }), _jsx(YAxis, { stroke: "#8892a4", style: { fontSize: '12px' }, tickFormatter: formatCurrency }), _jsx(Tooltip, { contentStyle: {
                                backgroundColor: '#1a2235',
                                border: '1px solid #d4af37',
                                borderRadius: '8px',
                                color: '#f5f0e8',
                            }, formatter: (value) => [formatCurrency(value), 'שווי נטו'], labelFormatter: (label) => `שנה ${label}` }), _jsx(Area, { type: "monotone", dataKey: "totalAssets", stroke: "#d4af37", fillOpacity: 1, fill: "url(#colorAssets)" })] }) })] }));
};
