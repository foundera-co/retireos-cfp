import React, { useState } from 'react'
import { Bell, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../../store/auth'
import { useHouseholdStore } from '../../store/household'
import { useNavigate } from 'react-router-dom'

export const Topbar: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuthStore()
  const { currentHousehold } = useHouseholdStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="bg-surface border-b border-surface-light px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-cream">
          {currentHousehold?.name || 'RetireOS CFP'}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="text-cream hover:text-gold transition">
          <Bell size={20} />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
              <User size={20} className="text-navy" />
            </div>
            <span className="text-cream hidden sm:inline">{user?.name}</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 bg-surface rounded-lg shadow-lg border border-surface-light w-48 py-2 z-50">
              <button
                className="w-full text-right px-4 py-2 text-cream hover:bg-surface-light transition flex items-center justify-end gap-2"
                onClick={() => {
                  navigate('/profile')
                  setShowUserMenu(false)
                }}
              >
                <span>פרופיל</span>
                <User size={18} />
              </button>
              <button
                className="w-full text-right px-4 py-2 text-red-400 hover:bg-surface-light transition flex items-center justify-end gap-2"
                onClick={handleLogout}
              >
                <span>התנתקות</span>
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
