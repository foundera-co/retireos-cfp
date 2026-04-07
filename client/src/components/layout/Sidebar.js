import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { LayoutDashboard, Users, Banknote, TrendingDown, CreditCard, Landmark, FileText, BarChart3, Settings, ArrowUpDown, PieChart, } from 'lucide-react';
export const Sidebar = ({ onClose = () => { } }) => {
    const user = useAuthStore((state) => state.user);
    const navItems = [
        { icon: LayoutDashboard, label: 'לוח בקרה', path: '/dashboard' },
        { icon: Users, label: 'לקוחות', path: '/households' },
        { icon: Banknote, label: 'נכסים', path: '/assets' },
        { icon: TrendingDown, label: 'התחייבויות', path: '/liabilities' },
        { icon: CreditCard, label: 'תזרים מזומנים', path: '/cashflow' },
        { icon: Landmark, label: 'פנסיה וקצבאות', path: '/pension' },
        { icon: PieChart, label: 'מיסוי', path: '/tax' },
        { icon: ArrowUpDown, label: 'אסטרטגיית משיכה', path: '/withdrawal' },
        { icon: FileText, label: 'טפסים', path: '/forms' },
        { icon: BarChart3, label: 'דוחות', path: '/reports' },
        ...(user?.role === 'ADMIN'
            ? [{ icon: Settings, label: 'ניהול', path: '/admin' }]
            : []),
    ];
    return (_jsxs("div", { className: "flex flex-col h-full p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-bold text-gold", children: "RetireOS" }), _jsx("p", { className: "text-xs text-text-muted mt-1", children: "\u05EA\u05DB\u05E0\u05D5\u05DF \u05E4\u05D9\u05E0\u05E0\u05E1\u05D9 \u05D5\u05E4\u05E8\u05D9\u05E9\u05D4" })] }), _jsx("nav", { className: "flex-1 space-y-2", children: navItems.map((item) => {
                    const Icon = item.icon;
                    return (_jsxs(NavLink, { to: item.path, onClick: onClose, className: ({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors duration-200
                ${isActive
                            ? 'bg-gold text-navy font-medium border-r-4 border-gold'
                            : 'text-cream hover:bg-surface'}
              `, children: [_jsx(Icon, { size: 20 }), _jsx("span", { className: "text-sm", children: item.label })] }, item.path));
                }) }), _jsx("div", { className: "border-t border-surface pt-4", children: _jsxs("div", { className: "text-sm", children: [_jsx("p", { className: "text-text-muted", children: "\u05DE\u05E9\u05EA\u05DE\u05E9" }), _jsx("p", { className: "text-cream font-medium truncate", children: user?.name })] }) })] }));
};
