import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useHouseholdStore } from '../store/household';
import { useAuthStore } from '../store/auth';
import { simulationApi } from '../api/client';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { NetWorthChart } from '../components/charts/NetWorthChart';
import { CashflowChart } from '../components/charts/CashflowChart';
import { Briefcase, TrendingUp, CreditCard, AlertCircle } from 'lucide-react';
export const Dashboard = () => {
    const { currentHousehold, fetchHouseholds } = useHouseholdStore();
    const user = useAuthStore((state) => state.user);
    const [simulationRun, setSimulationRun] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchHouseholds();
    }, [fetchHouseholds]);
    const baseScenario = currentHousehold?.plans?.[0]?.scenarios?.[0];
    const handleRunSimulation = async () => {
        if (!baseScenario)
            return;
        setIsRunning(true);
        setError('');
        try {
            const result = await simulationApi.run(baseScenario.id);
            const run = await simulationApi.getRun(result.runId);
            setSimulationRun(run);
        }
        catch (err) {
            setError('כשל בהפעלת הסימולציה');
            console.error(err);
        }
        finally {
            setIsRunning(false);
        }
    };
    const netWorth = simulationRun?.yearResults
        ? simulationRun.yearResults[simulationRun.yearResults.length - 1]?.totalAssets || 0
        : 0;
    const monthlyIncome = simulationRun?.yearResults?.[0]?.totalIncome
        ? Math.round(simulationRun.yearResults[0].totalIncome / 12)
        : 0;
    const monthlyExpense = baseScenario?.expenseStreams?.[0]?.monthlyAmount || 0;
    const retirementSecurityPercent = netWorth > 0
        ? Math.min(100, Math.round((netWorth / 5000000) * 100))
        : 0;
    return (_jsx(AppShell, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-cream mb-2", children: ["\u05E9\u05DC\u05D5\u05DD, ", user?.name] }), _jsxs("p", { className: "text-text-muted", children: ["\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4 - ", currentHousehold?.name] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(Card, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-text-muted text-sm", children: "\u05E9\u05D5\u05D5\u05D9 \u05E0\u05D8\u05D5" }), _jsxs("p", { className: "text-2xl font-bold text-gold mt-2", children: ["\u20AA", (netWorth / 1000000).toFixed(1), "M"] })] }), _jsx(Briefcase, { className: "text-gold opacity-30", size: 32 })] }) }), _jsx(Card, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-text-muted text-sm", children: "\u05D4\u05DB\u05E0\u05E1\u05D4 \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA" }), _jsxs("p", { className: "text-2xl font-bold text-gold mt-2", children: ["\u20AA", (monthlyIncome / 1000).toFixed(0), "K"] })] }), _jsx(TrendingUp, { className: "text-gold opacity-30", size: 32 })] }) }), _jsx(Card, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-text-muted text-sm", children: "\u05D4\u05D5\u05E6\u05D0\u05D4 \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA" }), _jsxs("p", { className: "text-2xl font-bold text-gold mt-2", children: ["\u20AA", (monthlyExpense / 1000).toFixed(0), "K"] })] }), _jsx(CreditCard, { className: "text-gold opacity-30", size: 32 })] }) }), _jsx(Card, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-text-muted text-sm", children: "\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF \u05E4\u05E8\u05D9\u05E9\u05D4" }), _jsxs("p", { className: "text-2xl font-bold text-gold mt-2", children: [retirementSecurityPercent, "%"] })] }), _jsx(AlertCircle, { className: "text-gold opacity-30", size: 32 })] }) })] }), _jsxs("div", { children: [_jsx(Button, { onClick: handleRunSimulation, isLoading: isRunning, variant: "primary", size: "lg", children: "\u05D4\u05E4\u05E2\u05DC \u05E1\u05D9\u05DE\u05D5\u05DC\u05E6\u05D9\u05D4" }), error && (_jsx("p", { className: "text-red-400 text-sm mt-2", children: error }))] }), simulationRun && simulationRun.yearResults.length > 0 && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(NetWorthChart, { data: simulationRun.yearResults }) }), _jsx("div", { children: _jsx(CashflowChart, { data: simulationRun.yearResults }) })] })), simulationRun && simulationRun.insights && simulationRun.insights.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-bold text-cream", children: "\u05EA\u05D5\u05D1\u05E0\u05D5\u05EA" }), _jsx("div", { className: "grid gap-4", children: simulationRun.insights.map((insight, idx) => (_jsx(Card, { children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Badge, { severity: insight.severity === 'high' ? 'warning' : insight.type === 'success' ? 'success' : 'info', children: insight.type }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-cream", children: insight.title }), _jsx("p", { className: "text-text-muted text-sm mt-1", children: insight.description })] })] }) }, idx))) })] }))] }) }));
};
