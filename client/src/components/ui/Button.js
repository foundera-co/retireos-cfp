import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const variantClasses = {
    primary: 'bg-gold text-navy hover:bg-gold-light',
    secondary: 'bg-surface border border-surface-light text-cream hover:bg-surface-light',
    ghost: 'bg-transparent text-cream hover:bg-surface-light',
    danger: 'bg-red-600 text-cream hover:bg-red-700',
};
const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};
export const Button = ({ variant = 'primary', size = 'md', isLoading = false, disabled = false, children, className = '', ...props }) => {
    return (_jsx("button", { className: `
        rounded-lg font-medium
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `, disabled: disabled || isLoading, ...props, children: isLoading ? (_jsxs("span", { className: "flex items-center gap-2", children: [_jsxs("svg", { className: "animate-spin h-4 w-4", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] }), children] })) : (children) }));
};
