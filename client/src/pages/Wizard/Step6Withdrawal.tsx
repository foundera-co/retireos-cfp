import React from 'react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Check } from 'lucide-react'

interface Step6Props {
  data: any
  onChange: (data: any) => void
}

export const Step6Withdrawal: React.FC<Step6Props> = ({ data, onChange }) => {
  const strategies = [
    {
      id: 'taxable_first',
      name: 'משיכה מנכסים חייבים קודם',
      description: 'משוך תחילה מחשבונות בני אומה ונדל״ן, כדי להעביר כסף לקרן פנסיה בשלבים מאוחרים יותר.',
      pros: ['מיעוט המס בשנים המוקדמות', 'גידול פוטנציאלי בקרן פנסיה'],
      cons: ['שיעור מס גבוה יותר בשלבים מאוחרים', 'יכול להשפיע על זכויות סוציאליות'],
    },
    {
      id: 'pension_first',
      name: 'משיכה מפנסיה קודם',
      description: 'משוך תחילה מקרן הפנסיה כדי להעביר כסף לנכסים חייבים.',
      pros: ['משיכה מהקרן עם הנחות מסיות', 'מימוש זכויות סוציאליות'],
      cons: ['אפשרות קצבה נמוכה בעתיד', 'סיכון להוצאה מוקדמת של כספים'],
    },
    {
      id: 'pro_rata',
      name: 'משיכה יחסית',
      description: 'משוך באופן יחסי מכל מקורות ההכנסה (מומלץ).',
      pros: ['איזון מס אופטימלי', 'גדישה אחידה'],
      cons: ['פחות גמישות אישית'],
    },
  ]

  const selected = data.withdrawalStrategy || 'pro_rata'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cream mb-4">אסטרטגיית משיכה</h2>
        <p className="text-text-muted mb-6">בחר אסטרטגיית משיכה למימוש ההכנסה בפרישה</p>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy) => (
          <Card
            key={strategy.id}
            className={`cursor-pointer transition-all ${
              selected === strategy.id
                ? 'border-2 border-gold ring-2 ring-gold ring-opacity-30'
                : 'hover:border-gold'
            }`}
            onClick={() => onChange({ withdrawalStrategy: strategy.id })}
          >
            <div className="flex items-start gap-4">
              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                  ${selected === strategy.id
                    ? 'border-gold bg-gold'
                    : 'border-surface-light'
                  }
                `}
              >
                {selected === strategy.id && <Check size={16} className="text-navy" />}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-cream mb-2">{strategy.name}</h3>
                <p className="text-text-muted text-sm mb-4">{strategy.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-cream font-semibold mb-2">יתרונות:</p>
                    <ul className="space-y-1">
                      {strategy.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-green-300 flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs text-cream font-semibold mb-2">חסרונות:</p>
                    <ul className="space-y-1">
                      {strategy.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-red-300 flex items-start gap-2">
                          <span className="text-red-400">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selected === 'pro_rata' && (
        <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            <strong>מומלץ:</strong> אסטרטגיה זו היא האיזונית ביותר וביטוחה מפני סיכונים בשיעור מס גבוה או נמוך לא צפוי.
          </p>
        </div>
      )}
    </div>
  )
}
