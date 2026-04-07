import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/auth'
import { useHouseholdStore } from './store/household'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Wizard } from './pages/Wizard'
import { Assets } from './pages/Assets'
import { Pension } from './pages/Pension'
import { Tax } from './pages/Tax'
import { Reports } from './pages/Reports'
import { Admin } from './pages/Admin'

interface ProtectedRouteProps {
  element: React.ReactNode
  requiredRole?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{element}</>
}

const App: React.FC = () => {
  const { loadStoredAuth, isAuthenticated } = useAuthStore()
  const { fetchHouseholds } = useHouseholdStore()

  useEffect(() => {
    loadStoredAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchHouseholds()
    }
  }, [isAuthenticated])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        <Route
          path="/wizard"
          element={<ProtectedRoute element={<Wizard />} />}
        />

        <Route
          path="/assets"
          element={<ProtectedRoute element={<Assets />} />}
        />

        <Route
          path="/pension"
          element={<ProtectedRoute element={<Pension />} />}
        />

        <Route
          path="/tax"
          element={<ProtectedRoute element={<Tax />} />}
        />

        <Route
          path="/reports"
          element={<ProtectedRoute element={<Reports />} />}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute element={<Admin />} requiredRole="ADMIN" />}
        />

        {/* Placeholder routes for other pages */}
        <Route
          path="/households"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/liabilities"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/cashflow"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/withdrawal"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/forms"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
