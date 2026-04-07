import React, { useEffect, useState } from 'react'
import { useHouseholdStore } from '../store/household'
import { useAuthStore } from '../store/auth'
import { simulationApi } from '../api/client'
import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { NetWorthChart } from '../components/charts/NetWorthChart'
import { CashflowChart } from '../components/charts/CashflowChart'
import { Briefcase, TrendingUp, CreditCard, AlertCircle } from 'lucide-react'
import type { SimulationRun } from '../types'

export const Dashboard: React.FC = () => {
  const { currentHousehold, fetchHouseholds } = useHouseholdStore()
  const user = useAuthStore((state) => state.user)
  const [simulationRun, setSimulationRun] = useState<SimulationRun | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchHouseholds()
  }, [fetchHouseholds])

  const baseScenario = currentHousehold?.plans?.[0]?.scenarios?.[0]

  const handleRunSimulation = async () => {
    if (!baseScenario) return

    setIsRunning(true)
    setError('')

    try {
      const result = await simulationApi.run(baseScenario.id)
      const run = await simulationApi.getRun(result.runId)
      setSimulationRun(run)
    } catch (err: any) {
      setError('כשל בהפעלת הסימולציה')
      console.error(err)
    } finally {
      setIsRunning(false)
    }
  }

  const netWorth = simulationRun?.yearResults
    ? simulationRun.yearResults[simulationRun.yearResults.length - 1]?.totalAssets || 0
    : 0

  const monthlyIncome = simulationRun?.yearResults?.[0]?.totalIncome
    ? Math.round(simulationRun.yearResults[0].totalIncome / 12)
    : 0

  const monthlyExpense = baseScenario?.expenseStreams?.[0]?.monthlyAmount || 0

  const retirementSecurityPercent = netWorth > 0
    ? Math.min(100, Math.round((netWorth / 5000000) * 100))
    : 0

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-cream mb-2">
            שלום, {user?.name}
          </h1>
          <p className="text-text-muted">
            לוח בקרה - {currentHousehold?.name}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">שווי נטו</p>
                <p className="text-2xl font-bold text-gold mt-2">
                  ₪{(netWorth / 1000000).toFixed(1)}M
                </p>
              </div>
              <Briefcase className="text-gold opacity-30" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">הכנסה חודשית</p>
                <p className="text-2xl font-bold text-gold mt-2">
                  ₪{(monthlyIncome / 1000).toFixed(0)}K
                </p>
              </div>
              <TrendingUp className="text-gold opacity-30" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">הוצאה חודשית</p>
                <p className="text-2xl font-bold text-gold mt-2">
                  ₪{(monthlyExpense / 1000).toFixed(0)}K
                </p>
              </div>
              <CreditCard className="text-gold opacity-30" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">ביטחון פרישה</p>
                <p className="text-2xl font-bold text-gold mt-2">
                  {retirementSecurityPercent}%
                </p>
              </div>
              <AlertCircle className="text-gold opacity-30" size={32} />
            </div>
          </Card>
        </div>

        {/* Simulation Button */}
        <div>
          <Button
            onClick={handleRunSimulation}
            isLoading={isRunning}
            variant="primary"
            size="lg"
          >
            הפעל סימולציה
          </Button>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Charts */}
        {simulationRun && simulationRun.yearResults.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NetWorthChart data={simulationRun.yearResults} />
            </div>

            <div>
              <CashflowChart data={simulationRun.yearResults} />
            </div>
          </div>
        )}

        {/* Insights */}
        {simulationRun && simulationRun.insights && simulationRun.insights.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-cream">תובנות</h2>
            <div className="grid gap-4">
              {simulationRun.insights.map((insight, idx) => (
                <Card key={idx}>
                  <div className="flex items-start gap-4">
                    <Badge severity={insight.severity === 'high' ? 'warning' : insight.type === 'success' ? 'success' : 'info'}>
                      {insight.type}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="font-semibold text-cream">{insight.title}</h3>
                      <p className="text-text-muted text-sm mt-1">{insight.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
