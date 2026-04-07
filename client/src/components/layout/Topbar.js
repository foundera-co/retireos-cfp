import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useHouseholdStore } from '../../store/household';
import { useNavigate } from 'react-router-dom';
export const Topbar = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout } = useAuthStore();
    const { currentHousehold } = useHouseholdStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (_jsxs("div", { className: "bg-surface border-b border-surface-light px-6 py-4 flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsx("h2", { className: "text-lg font-semibold text-cream", children: currentHousehold?.name || 'RetireOS CFP' }) }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("button", { className: "text-cream hover:text-gold transition", children: _jsx(Bell, { size: 20 }) }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowUserMenu(!showUserMenu), className: "flex items-center gap-3 hover:opacity-80 transition", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gold flex items-center justify-center", children: _jsx(User, { size: 20, className: "text-navy" }) }), _jsx("span", { className: "text-cream hidden sm:inline", children: user?.name })] }), showUserMenu && (_jsxs("div", { className: "absolute right-0 top-full mt-2 bg-surface rounded-lg shadow-lg border border-surface-light w-48 py-2 z-50", children: [_jsxs("button", { className: "w-full text-right px-4 py-2 text-cream hover:bg-surface-light transition flex items-center justify-end gap-2", onClick: () => {
                                            navigate('/profile');
                                            setShowUserMenu(false);
                                        }, children: [_jsx("span", { children: "\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC" }), _jsx(User, { size: 18 })] }), _jsxs("button", { className: "w-full text-right px-4 py-2 text-red-400 hover:bg-surface-light transition flex items-center justify-end gap-2", onClick: handleLogout, children: [_jsx("span", { children: "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA" }), _jsx(LogOut, { size: 18 })] })] }))] })] })] }));
};
