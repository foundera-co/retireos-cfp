import React, { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Users, Settings, FileText, Upload } from 'lucide-react'

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users')

  const tabs = [
    { id: 'users', label: 'משתמשים', icon: Users },
    { id: 'organization', label: 'ארגון', icon: Settings },
    { id: 'rulesets', label: 'רשימות מס', icon: FileText },
    { id: 'import', label: 'ייבוא נתונים', icon: Upload },
  ]

  const users = [
    { id: '1', email: 'admin@retireos.co.il', name: 'Admin User', role: 'ADMIN' },
    { id: '2', email: 'advisor@retireos.co.il', name: 'David Advisor', role: 'ADVISOR' },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-cream">ניהול מערכת</h1>
          <p className="text-text-muted mt-1">ניהול משתמשים, הגדרות וחוקי מס</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-surface-light overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 border-b-2 transition
                  ${
                    activeTab === tab.id
                      ? 'border-gold text-gold'
                      : 'border-transparent text-text-muted hover:text-cream'
                  }
                `}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <h2 className="text-xl font-bold text-cream mb-4">משתמשים בארגון</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-light">
                    <th className="text-right py-3 px-4 text-text-muted">שם</th>
                    <th className="text-right py-3 px-4 text-text-muted">אימייל</th>
                    <th className="text-right py-3 px-4 text-text-muted">תפקיד</th>
                    <th className="text-center py-3 px-4 text-text-muted">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-surface-light hover:bg-surface-light">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge severity={user.role === 'ADMIN' ? 'warning' : 'info'}>
                          {user.role === 'ADMIN' ? 'מנהל' : 'יועץ'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-gold hover:text-gold-light transition text-sm">
                          עריכה
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-light">
              <Button variant="primary" size="sm">
                הוסף משתמש חדש
              </Button>
            </div>
          </Card>
        )}

        {/* Organization Tab */}
        {activeTab === 'organization' && (
          <Card>
            <h2 className="text-xl font-bold text-cream mb-4">הגדרות ארגון</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cream mb-2">שם הארגון</label>
                <input
                  type="text"
                  defaultValue="RetireOS Demo"
                  className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cream mb-2">אימייל הארגון</label>
                <input
                  type="email"
                  defaultValue="admin@retireos.co.il"
                  className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cream mb-2">אזור זמן</label>
                <input
                  type="text"
                  defaultValue="Asia/Jerusalem"
                  className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream"
                />
              </div>

              <Button variant="primary" size="sm">
                שמור שינויים
              </Button>
            </div>
          </Card>
        )}

        {/* Rulesets Tab */}
        {activeTab === 'rulesets' && (
          <Card>
            <h2 className="text-xl font-bold text-cream mb-4">רשימות מס פעילות</h2>
            <div className="space-y-4">
              <div className="bg-surface-light rounded-lg p-4 border border-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gold">רשימת המס 2026</h3>
                  <Badge severity="success">פעיל</Badge>
                </div>
                <p className="text-sm text-text-muted mb-3">
                  סולם מס ישראלי 2026 עם סעיפי ביטוח לאומי
                </p>
                <Button variant="secondary" size="sm">
                  צפה בפרטים
                </Button>
              </div>

              <div className="pt-4 border-t border-surface-light">
                <p className="text-text-muted text-sm mb-4">צור רשימת מס חדשה:</p>
                <Button variant="secondary" size="sm">
                  רשימת מס חדשה
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Import Tab */}
        {activeTab === 'import' && (
          <Card>
            <h2 className="text-xl font-bold text-cream mb-4">ייבוא נתונים</h2>
            <p className="text-text-muted mb-6">ייבא נתוני משפחה ותכניות מחוץ לארגון</p>

            <div className="border-2 border-dashed border-surface-light rounded-lg p-8 text-center">
              <Upload className="mx-auto text-text-muted mb-4" size={32} />
              <p className="text-cream font-medium mb-2">גרור קבצים כאן</p>
              <p className="text-text-muted text-sm mb-4">או לחץ לבחירת קבצים</p>
              <Button variant="secondary" size="sm">
                בחר קבצים
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg">
              <p className="text-blue-200 text-sm">
                <strong>פורמטים נתמכים:</strong> CSV, Excel (XLSX)
              </p>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  )
}
