import React, { useEffect, useState } from 'react'
import { useHouseholdStore } from '../store/household'
import { assetsApi } from '../api/client'
import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import type { Asset } from '../types'

export const Assets: React.FC = () => {
  const { currentHousehold } = useHouseholdStore()
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', type: 'stocks', value: 0, annualReturn: 0.05 })

  const scenarioId = currentHousehold?.plans?.[0]?.scenarios?.[0]?.id

  useEffect(() => {
    if (scenarioId) {
      loadAssets()
    }
  }, [scenarioId])

  const loadAssets = async () => {
    if (!scenarioId) return
    setIsLoading(true)
    try {
      const data = await assetsApi.list(scenarioId)
      setAssets(data)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAsset = async () => {
    if (!scenarioId || !formData.name) return
    try {
      const newAsset = await assetsApi.create(scenarioId, formData as any)
      setAssets([...assets, newAsset])
      setFormData({ name: '', type: 'stocks', value: 0, annualReturn: 0.05 })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to add asset:', error)
    }
  }

  const handleDeleteAsset = async (id: string) => {
    try {
      await assetsApi.delete(id)
      setAssets(assets.filter((a) => a.id !== id))
    } catch (error) {
      console.error('Failed to delete asset:', error)
    }
  }

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0)

  const assetTypes: { [key: string]: string } = {
    pension: 'קרן פנסיה',
    provident: 'קרן השתלמות',
    study_fund: 'קרן לחינוך',
    stocks: 'מניות',
    real_estate: 'נדל״ן',
    cash: 'מזומנים',
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cream">נכסים</h1>
            <p className="text-text-muted mt-1">ניהול רשימת הנכסים של המשפחה</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg">
            הוסף נכס
          </Button>
        </div>

        <Card>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-text-muted">טוען נתונים...</p>
            </div>
          ) : assets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-muted">אין נכסים רשומים</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-light">
                      <th className="text-right py-3 px-4 text-text-muted">סוג</th>
                      <th className="text-right py-3 px-4 text-text-muted">שם</th>
                      <th className="text-right py-3 px-4 text-text-muted">ערך (₪)</th>
                      <th className="text-right py-3 px-4 text-text-muted">תשואה שנתית</th>
                      <th className="text-center py-3 px-4 text-text-muted">פעולה</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.id} className="border-b border-surface-light hover:bg-surface-light">
                        <td className="py-3 px-4">{assetTypes[asset.type] || asset.type}</td>
                        <td className="py-3 px-4">{asset.name}</td>
                        <td className="py-3 px-4 font-semibold text-gold">
                          ₪{(asset.value / 1000).toFixed(0)}K
                        </td>
                        <td className="py-3 px-4">{(asset.annualReturn * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            מחק
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t border-surface-light flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm">סה״כ נכסים</p>
                  <p className="text-2xl font-bold text-gold">₪{(totalValue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="הוסף נכס חדש">
        <div className="space-y-4">
          <Input
            label="שם הנכס"
            placeholder="קרן פנסיה"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-cream mb-2">סוג נכס</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream"
            >
              {Object.entries(assetTypes).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <Input
            label="ערך (₪)"
            type="number"
            placeholder="1000000"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
          />

          <Input
            label="תשואה שנתית צפויה (%)"
            type="number"
            placeholder="5"
            step="0.1"
            value={formData.annualReturn * 100}
            onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) / 100 })}
          />

          <Button onClick={handleAddAsset} variant="primary" className="w-full">
            הוסף נכס
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}
