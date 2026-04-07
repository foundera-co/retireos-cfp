import React from 'react'
import { useHouseholdStore } from '../store/household'
import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Landmark, TrendingUp } from 'lucide-react'

export const Pension: React.FC = () => {
  const { currentHousehold } = useHouseholdStore()
  const scenario = currentHousehold?.plans?.[0]?.scenarios?.[0]

  const pensionAssets = scenario?.assets?.filter((a) => a.type === 'pension') || []

  // Mock calculation
  const calculatePensionAtAge = (currentBalance: number, monthlyContrib: number, targetAge: number, currentAge: number = 48) => {
    const years = targetAge - currentAge
    const returnRate = 0.05
    const accumulated = currentBalance * Math.pow(1 + returnRate, years) +
      monthlyContrib * 12 * ((Math.pow(1 + returnRate, years) - 1) / returnRate)
    return Math.round(accumulated)
  }

  const calculateMonthlyPension = (accumulation: number) => {
    return Math.round(accumulation / 200)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-cream">פנסיה וקצבאות</h1>
          <p className="text-text-muted mt-1">תכנון קצבאות הפרישה</p>
        </div>

        {/* Pension Funds */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-cream">קרנות פנסיה</h2>
          {pensionAssets.length === 0 ? (
            <Card>
              <p className="text-text-muted">לא נמצאו קרנות פנסיה</p>
            </Card>
          ) : (
            pensionAssets.map((asset) => {
              const pensionAt55 = calculatePensionAtAge(asset.value, 5000, 55)
              const monthlyAt55 = calculateMonthlyPension(pensionAt55)
              const pensionAt60 = calculatePensionAtAge(asset.value, 5000, 60)
              const monthlyAt60 = calculateMonthlyPension(pensionAt60)
              const pensionAt65 = calculatePensionAtAge(asset.value, 5000, 65)
              const monthlyAt65 = calculateMonthlyPension(pensionAt65)

              return (
                <Card key={asset.id}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-cream">{asset.name}</h3>
                      <p className="text-text-muted text-sm">יתרה נוכחית: ₪{(asset.value / 1000000).toFixed(1)}M</p>
                    </div>
                    <Landmark className="text-gold opacity-50" size={32} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-surface-light rounded-lg p-4">
                      <p className="text-text-muted text-sm mb-1">גיל 55</p>
                      <p className="text-2xl font-bold text-gold">₪{monthlyAt55.toLocaleString()}</p>
                      <p className="text-xs text-text-muted mt-2">קצבה חודשית</p>
                    </div>
                    <div className="bg-surface-light rounded-lg p-4">
                      <p className="text-text-muted text-sm mb-1">גיל 60</p>
                      <p className="text-2xl font-bold text-gold">₪{monthlyAt60.toLocaleString()}</p>
                      <p className="text-xs text-text-muted mt-2">קצבה חודשית</p>
                    </div>
                    <div className="bg-surface-light rounded-lg p-4">
                      <p className="text-text-muted text-sm mb-1">גיל 65</p>
                      <p className="text-2xl font-bold text-gold">₪{monthlyAt65.toLocaleString()}</p>
                      <p className="text-xs text-text-muted mt-2">קצבה חודשית</p>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>

        {/* Form 161 Info */}
        <Card className="bg-gold bg-opacity-10 border border-gold">
          <h3 className="text-lg font-semibold text-gold mb-3">קיבוע זכויות - טופס 161</h3>
          <div className="space-y-3 text-sm text-gold">
            <p>קיבוע זכויות מאפשר פטור ממס על עד ₪9,430 בחודש מהקצבה בתנאים מסוימים:</p>
            <ul className="space-y-2 mr-4">
              <li>✓ רכשת את הקצבה בתרומות שלך בלבד</li>
              <li>✓ הקצבה משולמת לאדם או לבן זוג בעלי זכויות</li>
              <li>✓ עמדת בדרישות ההכנסה והגבלות נכסים</li>
            </ul>
          </div>
        </Card>

        {/* National Insurance Benefits */}
        <Card>
          <h3 className="text-lg font-semibold text-cream mb-4">קצבת ביטוח לאומי</h3>
          <p className="text-text-muted mb-4">קצבת זקנה (ביטוח לאומי) משולמת כחלק משטח הביטחון החברתי:</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-muted text-sm mb-2">גבר בגיל 70+</p>
              <p className="text-2xl font-bold text-gold mb-1">₪5,385</p>
              <p className="text-xs text-text-muted">קצבה חודשית בסיסית</p>
            </div>
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-muted text-sm mb-2">אישה בגיל 65+</p>
              <p className="text-2xl font-bold text-gold mb-1">₪5,385</p>
              <p className="text-xs text-text-muted">קצבה חודשית בסיסית</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg">
            <p className="text-blue-200 text-sm">
              הקצבה יכולה להיות גבוהה יותר בהתאם לשנות ביטוח כנגד סיכונים סוציאליים.
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
