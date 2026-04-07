import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useHouseholdStore } from '../store/household';
import { assetsApi } from '../api/client';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
export const Assets = () => {
    const { currentHousehold } = useHouseholdStore();
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', type: 'stocks', value: 0, annualReturn: 0.05 });
    const scenarioId = currentHousehold?.plans?.[0]?.scenarios?.[0]?.id;
    useEffect(() => {
        if (scenarioId) {
            loadAssets();
        }
    }, [scenarioId]);
    const loadAssets = async () => {
        if (!scenarioId)
            return;
        setIsLoading(true);
        try {
            const data = await assetsApi.list(scenarioId);
            setAssets(data);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleAddAsset = async () => {
        if (!scenarioId || !formData.name)
            return;
        try {
            const newAsset = await assetsApi.create(scenarioId, formData);
            setAssets([...assets, newAsset]);
            setFormData({ name: '', type: 'stocks', value: 0, annualReturn: 0.05 });
            setIsModalOpen(false);
        }
        catch (error) {
            console.error('Failed to add asset:', error);
        }
    };
    const handleDeleteAsset = async (id) => {
        try {
            await assetsApi.delete(id);
            setAssets(assets.filter((a) => a.id !== id));
        }
        catch (error) {
            console.error('Failed to delete asset:', error);
        }
    };
    const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
    const assetTypes = {
        pension: 'קרן פנסיה',
        provident: 'קרן השתלמות',
        study_fund: 'קרן לחינוך',
        stocks: 'מניות',
        real_estate: 'נדל״ן',
        cash: 'מזומנים',
    };
    return (_jsxs(AppShell, { children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-cream", children: "\u05E0\u05DB\u05E1\u05D9\u05DD" }), _jsx("p", { className: "text-text-muted mt-1", children: "\u05E0\u05D9\u05D4\u05D5\u05DC \u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05E0\u05DB\u05E1\u05D9\u05DD \u05E9\u05DC \u05D4\u05DE\u05E9\u05E4\u05D7\u05D4" })] }), _jsx(Button, { onClick: () => setIsModalOpen(true), variant: "primary", size: "lg", children: "\u05D4\u05D5\u05E1\u05E3 \u05E0\u05DB\u05E1" })] }), _jsx(Card, { children: isLoading ? (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-text-muted", children: "\u05D8\u05D5\u05E2\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD..." }) })) : assets.length === 0 ? (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-text-muted", children: "\u05D0\u05D9\u05DF \u05E0\u05DB\u05E1\u05D9\u05DD \u05E8\u05E9\u05D5\u05DE\u05D9\u05DD" }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-surface-light", children: [_jsx("th", { className: "text-right py-3 px-4 text-text-muted", children: "\u05E1\u05D5\u05D2" }), _jsx("th", { className: "text-right py-3 px-4 text-text-muted", children: "\u05E9\u05DD" }), _jsx("th", { className: "text-right py-3 px-4 text-text-muted", children: "\u05E2\u05E8\u05DA (\u20AA)" }), _jsx("th", { className: "text-right py-3 px-4 text-text-muted", children: "\u05EA\u05E9\u05D5\u05D0\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA" }), _jsx("th", { className: "text-center py-3 px-4 text-text-muted", children: "\u05E4\u05E2\u05D5\u05DC\u05D4" })] }) }), _jsx("tbody", { children: assets.map((asset) => (_jsxs("tr", { className: "border-b border-surface-light hover:bg-surface-light", children: [_jsx("td", { className: "py-3 px-4", children: assetTypes[asset.type] || asset.type }), _jsx("td", { className: "py-3 px-4", children: asset.name }), _jsxs("td", { className: "py-3 px-4 font-semibold text-gold", children: ["\u20AA", (asset.value / 1000).toFixed(0), "K"] }), _jsxs("td", { className: "py-3 px-4", children: [(asset.annualReturn * 100).toFixed(1), "%"] }), _jsx("td", { className: "py-3 px-4 text-center", children: _jsx("button", { onClick: () => handleDeleteAsset(asset.id), className: "text-red-400 hover:text-red-300 transition", children: "\u05DE\u05D7\u05E7" }) })] }, asset.id))) })] }) }), _jsx("div", { className: "mt-4 pt-4 border-t border-surface-light flex items-center justify-between", children: _jsxs("div", { children: [_jsx("p", { className: "text-text-muted text-sm", children: "\u05E1\u05D4\u05F4\u05DB \u05E0\u05DB\u05E1\u05D9\u05DD" }), _jsxs("p", { className: "text-2xl font-bold text-gold", children: ["\u20AA", (totalValue / 1000000).toFixed(1), "M"] })] }) })] })) })] }), _jsx(Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "\u05D4\u05D5\u05E1\u05E3 \u05E0\u05DB\u05E1 \u05D7\u05D3\u05E9", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "\u05E9\u05DD \u05D4\u05E0\u05DB\u05E1", placeholder: "\u05E7\u05E8\u05DF \u05E4\u05E0\u05E1\u05D9\u05D4", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-cream mb-2", children: "\u05E1\u05D5\u05D2 \u05E0\u05DB\u05E1" }), _jsx("select", { value: formData.type, onChange: (e) => setFormData({ ...formData, type: e.target.value }), className: "w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream", children: Object.entries(assetTypes).map(([key, label]) => (_jsx("option", { value: key, children: label }, key))) })] }), _jsx(Input, { label: "\u05E2\u05E8\u05DA (\u20AA)", type: "number", placeholder: "1000000", value: formData.value, onChange: (e) => setFormData({ ...formData, value: Number(e.target.value) }) }), _jsx(Input, { label: "\u05EA\u05E9\u05D5\u05D0\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA \u05E6\u05E4\u05D5\u05D9\u05D4 (%)", type: "number", placeholder: "5", step: "0.1", value: formData.annualReturn * 100, onChange: (e) => setFormData({ ...formData, annualReturn: Number(e.target.value) / 100 }) }), _jsx(Button, { onClick: handleAddAsset, variant: "primary", className: "w-full", children: "\u05D4\u05D5\u05E1\u05E3 \u05E0\u05DB\u05E1" })] }) })] }));
};
