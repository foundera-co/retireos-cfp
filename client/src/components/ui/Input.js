import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ label, error, helperText, className = '', ...props }) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: "block text-sm font-medium text-cream mb-2", children: label })), _jsx("input", { className: `
          w-full px-4 py-2
          bg-surface border border-surface-light
          text-cream placeholder-text-muted
          rounded-lg
          focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20
          transition-colors duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `, ...props }), error && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: error })), helperText && !error && (_jsx("p", { className: "mt-1 text-sm text-text-muted", children: helperText }))] }));
};
