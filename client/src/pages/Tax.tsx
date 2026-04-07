import React from 'react'
import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export const Tax: React.FC = () => {
  // Mock tax data based on Israeli tax brackets 2026
  const taxBrackets = [
    { from: 0, to: 81480, rate: 10 },
    { from: 81480, to: 116760, rate: 14 },
    { from: 116760, to: 187440, rate: 20 },
    { from: 187440, to: 260520, rate: 31 },
    { from: 260520, to: 542160, rate: 35 },
    { from: 542160, to: Infinity, rate: 47 },
  ]

  // Mock calculation for example income
  const exampleIncome = 384000 // ₪32,000/month
  const creditPoints = 2
  const creditValue = 2820 * creditPoints

  const calculateTax = (income: number) => {
    let tax = 0
    let previousCeiling = 0

    for (const bracket of taxBrackets) {
      const taxableUpToBracket = Math.min(income, bracket.to)
      const bracketIncome = taxableUpToBracket - previousCeiling

      if (bracketIncome > 0) {
        tax += bracketIncome * (bracket.rate / 100)
      }

      previousCeiling = bracket.to

      if (income <= bracket.to) {
        break
      }
    }

    return Math.max(0, tax - creditValue)
  }

  const annualTax = calculateTax(exampleIncome)
  const netIncome = exampleIncome - annualTax
  const effectiveRate = (annualTax / exampleIncome) * 100

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-cream">ניתוח מיסוי</h1>
          <p className="text-text-muted mt-1">חישוב מס על הכנסה ותכנון מס אופטימלי</p>
        </div>

        {/* Current Year Tax Calculation */}
        <Card>
          <h2 className="text-lg font-bold text-cream mb-4">חישוב מס - שנה קלנדרית 2026</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-muted text-sm">הכנסה חודשית</p>
              <p className="text-2xl font-bold text-gold">₪32,000</p>
            </div>
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-muted text-sm">הכנסה שנתית</p>
              <p className="text-2xl font-bold text-gold">₪384,000</p>
            </div>
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-muted text-sm">נקודות זיכוי</p>
              <p className="text-2xl font-bold text-gold">2</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-surface-light pt-4">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">הכנסה חודשית</span>
              <span className="font-semibold text-cream">₪32,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">מס שנתי (לפני זיכוי)</span>
              <span className="font-semibold text-cream">₪{Math.round(calculateTax(exampleIncome) + creditValue).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">ערך נקודות זיכוי</span>
              <span className="font-semibold text-gold">-₪{creditValue.toLocaleString()}</span>
            </div>
            <div className="border-t border-surface-light pt-3 flex items-center justify-between">
              <span className="font-bold text-cream">סה״כ מס שנתי</span>
              <span className="text-2xl font-bold text-gold">₪{annualTax.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-cream">הכנסה נטו שנתית</span>
              <span className="text-2xl font-bold text-gold">₪{netIncome.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between bg-surface-light rounded p-2">
              <span className="font-bold text-cream">שיעור מס יעיל</span>
              <span className="text-xl font-bold text-gold">{effectiveRate.toFixed(1)}%</span>
            </div>
          </div>
        </Card>

        {/* Tax Brackets */}
        <Card>
          <h2 className="text-lg font-bold text-cream mb-4">סולם מס 2026 בישראל</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-light">
                  <th className="text-right py-3 px-4 text-text-muted">בטווח (₪)</th>
                  <th className="text-right py-3 px-4 text-text-muted">עד (₪)</th>
                  <th className="text-right py-3 px-4 text-text-muted">שיעור מס</th>
                </tr>
              </thead>
              <tbody>
                {taxBrackets.map((bracket, idx) => (
                  <tr key={idx} className="border-b border-surface-light hover:bg-surface-light">
                    <td className="py-3 px-4">{bracket.from.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      {bracket.to === Infinity ? 'ומעלה' : bracket.to.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gold">{bracket.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Capital Gains */}
        <Card>
          <h2 className="text-lg font-bold text-cream mb-4">מס על רווח הון</h2>
          <div className="space-y-4">
            <div className="bg-surface-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cream font-semibold">רווח הון רגיל</span>
                <Badge severity="warning">25%</Badge>
              </div>
              <p className="text-sm text-text-muted">מחיר קנייה נמוך מהשווי הנוכחי</p>
            </div>
            <div className="bg-surface-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cream font-semibold">רווח הון מעודכן</span>
                <Badge severity="success">15%</Badge>
              </div>
              <p className="text-sm text-text-muted">מחיר קנייה עם התאמה لאינפלציה</p>
            </div>
          </div>
        </Card>

        {/* Pension Tax Benefits */}
        <Card className="bg-green-900 bg-opacity-20 border border-green-500">
          <h2 className="text-lg font-bold text-green-300 mb-4">הטבות מס על קצבאות פנסיה</h2>
          <div className="space-y-3 text-sm text-green-200">
            <p>
              <strong>קיבוע זכויות (טופס 161):</strong> הנחה על קצבה של עד ₪9,430 בחודש מהכנסה חייבת.
            </p>
            <p>
              <strong>שיעור מס נמוך:</strong> קצבאות פנסיה בדרך כלל מחויבות בשיעור מס נמוך יותר מאשר משכורת.
            </p>
            <p>
              <strong>טיוב אישי:</strong> אפשר לבחור באסטרטגיית משיכה מנכסים שונים כדי להקטין את היזמות המסית הכוללת.
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
