import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Card = ({ children, header, footer, className = '' }) => {
    return (_jsxs("div", { className: `bg-surface rounded-xl p-6 ${className}`, children: [header && (_jsx("div", { className: "border-b border-surface-light pb-4 mb-4", children: header })), children, footer && (_jsx("div", { className: "border-t border-surface-light pt-4 mt-4", children: footer }))] }));
};
