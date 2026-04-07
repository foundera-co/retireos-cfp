import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
export const Login = () => {
    const [email, setEmail] = useState('advisor@retireos.co.il');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.message || 'כשל בכניסה');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-navy flex items-center justify-center p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gold mb-2", children: "RetireOS CFP" }), _jsx("p", { className: "text-text-muted", children: "\u05EA\u05DB\u05E0\u05D5\u05DF \u05E4\u05D9\u05E0\u05E0\u05E1\u05D9 \u05D5\u05E4\u05E8\u05D9\u05E9\u05D4 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9\u05EA" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(Input, { label: "\u05D3\u05D5\u05D0\u05F4\u05DC", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@retireos.co.il", required: true }), _jsx(Input, { label: "\u05E1\u05D9\u05E1\u05DE\u05D4", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u05D4\u05D6\u05DF \u05E1\u05D9\u05E1\u05DE\u05D4", required: true }), error && (_jsx("div", { className: "p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg text-red-200 text-sm", children: error })), _jsx(Button, { type: "submit", variant: "primary", size: "md", isLoading: isLoading, className: "w-full", children: "\u05DB\u05E0\u05D9\u05E1\u05D4 \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA" })] }), _jsx("div", { className: "mt-6 pt-6 border-t border-surface-light", children: _jsx("p", { className: "text-xs text-text-muted text-center", children: "\u05D2\u05E8\u05E1\u05D4 1.0 \u2022 RetireOS Demo" }) })] }) }));
};
