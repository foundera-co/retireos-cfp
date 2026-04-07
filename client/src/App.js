import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { useHouseholdStore } from './store/household';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Wizard } from './pages/Wizard';
import { Assets } from './pages/Assets';
import { Pension } from './pages/Pension';
import { Tax } from './pages/Tax';
import { Reports } from './pages/Reports';
import { Admin } from './pages/Admin';
const ProtectedRoute = ({ element, requiredRole }) => {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (requiredRole && user?.role !== requiredRole) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(_Fragment, { children: element });
};
const App = () => {
    const { loadStoredAuth, isAuthenticated } = useAuthStore();
    const { fetchHouseholds } = useHouseholdStore();
    useEffect(() => {
        loadStoredAuth();
    }, []);
    useEffect(() => {
        if (isAuthenticated) {
            fetchHouseholds();
        }
    }, [isAuthenticated]);
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/wizard", element: _jsx(ProtectedRoute, { element: _jsx(Wizard, {}) }) }), _jsx(Route, { path: "/assets", element: _jsx(ProtectedRoute, { element: _jsx(Assets, {}) }) }), _jsx(Route, { path: "/pension", element: _jsx(ProtectedRoute, { element: _jsx(Pension, {}) }) }), _jsx(Route, { path: "/tax", element: _jsx(ProtectedRoute, { element: _jsx(Tax, {}) }) }), _jsx(Route, { path: "/reports", element: _jsx(ProtectedRoute, { element: _jsx(Reports, {}) }) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { element: _jsx(Admin, {}), requiredRole: "ADMIN" }) }), _jsx(Route, { path: "/households", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/liabilities", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/cashflow", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/withdrawal", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/forms", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }));
};
export default App;
