import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50", onClick: onClose, children: _jsxs("div", { className: "bg-surface rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [title && _jsx("h2", { className: "text-xl font-bold text-cream", children: title }), _jsx("button", { onClick: onClose, className: "ltr:ml-auto rtl:mr-auto text-text-muted hover:text-cream transition", children: _jsx(X, { size: 24 }) })] }), children] }) }));
};
