import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('advisor@retireos.co.il')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'כשל בכניסה')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold mb-2">RetireOS CFP</h1>
          <p className="text-text-muted">תכנון פיננסי ופרישה ישראלית</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="דוא״ל"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@retireos.co.il"
            required
          />

          <Input
            label="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הזן סיסמה"
            required
          />

          {error && (
            <div className="p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="w-full"
          >
            כניסה למערכת
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-surface-light">
          <p className="text-xs text-text-muted text-center">
            גרסה 1.0 • RetireOS Demo
          </p>
        </div>
      </Card>
    </div>
  )
}
