import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import {
  LayoutDashboard,
  Users,
  Banknote,
  TrendingDown,
  CreditCard,
  Landmark,
  FileText,
  BarChart3,
  Settings,
  ArrowUpDown,
  PieChart,
} from 'lucide-react'

interface SidebarProps {
  onClose?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose = () => {} }) => {
  const user = useAuthStore((state) => state.user)

  const navItems = [
    { icon: LayoutDashboard, label: 'לוח בקרה', path: '/dashboard' },
    { icon: Users, label: 'לקוחות', path: '/households' },
    { icon: Banknote, label: 'נכסים', path: '/assets' },
    { icon: TrendingDown, label: 'התחייבויות', path: '/liabilities' },
    { icon: CreditCard, label: 'תזרים מזומנים', path: '/cashflow' },
    { icon: Landmark, label: 'פנסיה וקצבאות', path: '/pension' },
    { icon: PieChart, label: 'מיסוי', path: '/tax' },
    { icon: ArrowUpDown, label: 'אסטרטגיית משיכה', path: '/withdrawal' },
    { icon: FileText, label: 'טפסים', path: '/forms' },
    { icon: BarChart3, label: 'דוחות', path: '/reports' },
    ...(user?.role === 'ADMIN'
      ? [{ icon: Settings, label: 'ניהול', path: '/admin' }]
      : []),
  ]

  return (
    <div className="flex flex-col h-full p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gold">RetireOS</h1>
        <p className="text-xs text-text-muted mt-1">תכנון פיננסי ופרישה</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors duration-200
                ${
                  isActive
                    ? 'bg-gold text-navy font-medium border-r-4 border-gold'
                    : 'text-cream hover:bg-surface'
                }
              `}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* User info */}
      <div className="border-t border-surface pt-4">
        <div className="text-sm">
          <p className="text-text-muted">משתמש</p>
          <p className="text-cream font-medium truncate">{user?.name}</p>
        </div>
      </div>
    </div>
  )
}
