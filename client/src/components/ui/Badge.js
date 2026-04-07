import { jsx as _jsx } from "react/jsx-runtime";
const severityClasses = {
    success: 'bg-green-900 text-green-200',
    warning: 'bg-amber-900 text-amber-200',
    error: 'bg-red-900 text-red-200',
    info: 'bg-blue-900 text-blue-200',
    neutral: 'bg-gray-700 text-gray-200',
};
export const Badge = ({ severity = 'neutral', children }) => {
    return (_jsx("span", { className: `
      inline-block px-2 py-1 rounded text-xs font-medium
      ${severityClasses[severity]}
    `, children: children }));
};
