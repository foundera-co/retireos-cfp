import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Menu, X } from 'lucide-react';
export const AppShell = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "flex h-screen bg-navy", children: [_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "fixed top-4 left-4 z-50 md:hidden text-cream bg-surface rounded-lg p-2", children: sidebarOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) }), _jsx("div", { className: `
          fixed md:relative w-64 h-screen bg-surface-light border-l border-surface
          transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `, children: _jsx(Sidebar, { onClose: () => setSidebarOpen(false) }) }), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx(Topbar, {}), _jsx("main", { className: "flex-1 overflow-auto p-4 md:p-6", children: children })] }), sidebarOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 md:hidden z-30", onClick: () => setSidebarOpen(false) }))] }));
};
