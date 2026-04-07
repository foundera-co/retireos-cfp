import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Trash2 } from 'lucide-react';
export const Step2Assets = ({ data, onChange }) => {
    const [assets, setAssets] = useState(data.assets || [
        { id: '1', type: 'pension', name: 'קרן פנסיה', value: 1800000 },
        { id: '2', type: 'real_estate', name: 'דירה בתל אביב', value: 3500000 },
    ]);
    const handleAddAsset = () => {
        const newAsset = {
            id: String(Date.now()),
            type: 'stocks',
            name: '',
            value: 0,
        };
        setAssets([...assets, newAsset]);
    };
    const handleUpdateAsset = (id, field, value) => {
        const updated = assets.map((a) => a.id === id ? { ...a, [field]: value } : a);
        setAssets(updated);
        onChange({ assets: updated });
    };
    const handleDeleteAsset = (id) => {
        const updated = assets.filter((a) => a.id !== id);
        setAssets(updated);
        onChange({ assets: updated });
    };
    const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
    const assetTypes = [
        { value: 'pension', label: 'קרן פנסיה' },
        { value: 'provident', label: 'קרן השתלמות' },
        { value: 'study_fund', label: 'קרן לחינוך' },
        { value: 'stocks', label: 'מניות' },
        { value: 'real_estate', label: 'נדל״ן' },
        { value: 'cash', label: 'מזומנים' },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-cream mb-4", children: "\u05E0\u05DB\u05E1\u05D9\u05DD" }), _jsx("p", { className: "text-text-muted mb-6", children: "\u05E8\u05E9\u05D5\u05DD \u05D0\u05EA \u05DB\u05DC \u05D4\u05E0\u05DB\u05E1\u05D9\u05DD \u05D4\u05E4\u05D9\u05E0\u05E0\u05E1\u05D9\u05D9\u05DD \u05E9\u05DC \u05D4\u05DE\u05E9\u05E4\u05D7\u05D4" })] }), _jsxs(Card, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-surface-light", children: [_jsx("th", { className: "text-right py-3 px-4 text-text-muted", children: "\u05E1\u05D5\u05D2" }), _jsx("th", { className: "text-right py-3 px-4 text-text-muted", children: "\u05E9\u05DD" }), _jsx("th", { className: "text-right py-3 px-4 text-text-muted", children: "\u05E2\u05E8\u05DA (\u20AA)" }), _jsx("th", { className: "text-center py-3 px-4 text-text-muted", children: "\u05E4\u05E2\u05D5\u05DC\u05D4" })] }) }), _jsx("tbody", { children: assets.map((asset) => (_jsxs("tr", { className: "border-b border-surface-light hover:bg-surface-light", children: [_jsx("td", { className: "py-3 px-4", children: _jsx("select", { value: asset.type, onChange: (e) => handleUpdateAsset(asset.id, 'type', e.target.value), className: "bg-surface border border-surface-light rounded text-cream text-sm px-2 py-1", children: assetTypes.map((t) => (_jsx("option", { value: t.value, children: t.label }, t.value))) }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("input", { type: "text", value: asset.name, onChange: (e) => handleUpdateAsset(asset.id, 'name', e.target.value), className: "bg-surface border border-surface-light rounded text-cream w-full px-2 py-1", placeholder: "\u05E9\u05DD \u05D4\u05E0\u05DB\u05E1" }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("input", { type: "number", value: asset.value, onChange: (e) => handleUpdateAsset(asset.id, 'value', Number(e.target.value)), className: "bg-surface border border-surface-light rounded text-cream w-full px-2 py-1", placeholder: "0" }) }), _jsx("td", { className: "py-3 px-4 text-center", children: _jsx("button", { onClick: () => handleDeleteAsset(asset.id), className: "text-red-400 hover:text-red-300 transition", children: _jsx(Trash2, { size: 18 }) }) })] }, asset.id))) })] }) }), _jsxs("div", { className: "mt-4 pt-4 border-t border-surface-light flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-text-muted text-sm", children: "\u05E1\u05D4\u05F4\u05DB \u05E0\u05DB\u05E1\u05D9\u05DD" }), _jsxs("p", { className: "text-xl font-bold text-gold", children: ["\u20AA", (totalValue / 1000000).toFixed(1), "M"] })] }), _jsx(Button, { onClick: handleAddAsset, variant: "secondary", size: "sm", children: "\u05D4\u05D5\u05E1\u05E3 \u05E0\u05DB\u05E1" })] })] })] }));
};
