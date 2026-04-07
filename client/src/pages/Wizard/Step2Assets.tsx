import React, { useState } from 'react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Trash2 } from 'lucide-react'

interface Asset {
  id: string
  type: string
  name: string
  value: number
}

interface Step2Props {
  data: any
  onChange: (data: any) => void
}

export const Step2Assets: React.FC<Step2Props> = ({ data, onChange }) => {
  const [assets, setAssets] = useState<Asset[]>(data.assets || [
    { id: '1', type: 'pension', name: 'קרן פנסיה', value: 1800000 },
    { id: '2', type: 'real_estate', name: 'דירה בתל אביב', value: 3500000 },
  ])

  const handleAddAsset = () => {
    const newAsset = {
      id: String(Date.now()),
      type: 'stocks',
      name: '',
      value: 0,
    }
    setAssets([...assets, newAsset])
  }

  const handleUpdateAsset = (id: string, field: string, value: any) => {
    const updated = assets.map((a) =>
      a.id === id ? { ...a, [field]: value } : a
    )
    setAssets(updated)
    onChange({ assets: updated })
  }

  const handleDeleteAsset = (id: string) => {
    const updated = assets.filter((a) => a.id !== id)
    setAssets(updated)
    onChange({ assets: updated })
  }

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0)

  const assetTypes = [
    { value: 'pension', label: 'קרן פנסיה' },
    { value: 'provident', label: 'קרן השתלמות' },
    { value: 'study_fund', label: 'קרן לחינוך' },
    { value: 'stocks', label: 'מניות' },
    { value: 'real_estate', label: 'נדל״ן' },
    { value: 'cash', label: 'מזומנים' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cream mb-4">נכסים</h2>
        <p className="text-text-muted mb-6">רשום את כל הנכסים הפיננסיים של המשפחה</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-light">
                <th className="text-right py-3 px-4 text-text-muted">סוג</th>
                <th className="text-right py-3 px-4 text-text-muted">שם</th>
                <th className="text-right py-3 px-4 text-text-muted">ערך (₪)</th>
                <th className="text-center py-3 px-4 text-text-muted">פעולה</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-surface-light hover:bg-surface-light">
                  <td className="py-3 px-4">
                    <select
                      value={asset.type}
                      onChange={(e) => handleUpdateAsset(asset.id, 'type', e.target.value)}
                      className="bg-surface border border-surface-light rounded text-cream text-sm px-2 py-1"
                    >
                      {assetTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={asset.name}
                      onChange={(e) => handleUpdateAsset(asset.id, 'name', e.target.value)}
                      className="bg-surface border border-surface-light rounded text-cream w-full px-2 py-1"
                      placeholder="שם הנכס"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={asset.value}
                      onChange={(e) => handleUpdateAsset(asset.id, 'value', Number(e.target.value))}
                      className="bg-surface border border-surface-light rounded text-cream w-full px-2 py-1"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 size={18} />
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
            <p className="text-xl font-bold text-gold">₪{(totalValue / 1000000).toFixed(1)}M</p>
          </div>
          <Button onClick={handleAddAsset} variant="secondary" size="sm">
            הוסף נכס
          </Button>
        </div>
      </Card>
    </div>
  )
}
