import React from 'react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface Step7Props {
  data: any
}

export const Step7Results: React.FC<Step7Props> = ({ data }) => {
  const totalAssets = (data.assets || []).reduce((sum: number, a: any) => sum + a.value, 0)
  const retirementAge = Number(data.retirementAge) || 55
  const currentAge = Number(data.primaryAge) || 48
  const yearsToRetirement = retirementAge - currentAge

  const recommendations = [
    {
      title: 'הגדיל את החיסכון',
      description: `בהנחה שתוכל להגדיל את החיסכון החודשי ב₪2,000, תוכל להגדיל את הקרן שלך ב₪${(2000 * 12 * yearsToRetirement / 1000000).toFixed(1)}M עד הפרישה.`,
      severity: 'info',
    },
    {
      title: 'בדוק את תיקיית ההשקעות',
      description: 'בהנחה שהתיקייה שלך מחזירה 5% בשנה, הנכסים שלך צפויים לגדול ל₪' + (totalAssets * Math.pow(1.05, yearsToRetirement) / 1000000).toFixed(1) + 'M בגיל הפרישה.',
      severity: 'success',
    },
    {
      title: 'תכננו את קצבת הפרישה',
      description: 'בהתאם לחוק 161, תוכל לקבל קצבה של עד ₪9,430 בחודש ללא מס מקרן הפנסיה.',
      severity: 'info',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cream mb-4">תוצאות התכנון</h2>
        <p className="text-text-muted mb-6">סיכום הנתונים שלך ותחזוקה ראשונית</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-text-muted text-sm">סה״כ נכסים נוכחיים</p>
            <p className="text-3xl font-bold text-gold mt-2">
              ₪{(totalAssets / 1000000).toFixed(1)}M
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-text-muted text-sm">שנים עד לפרישה</p>
            <p className="text-3xl font-bold text-gold mt-2">{yearsToRetirement}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-text-muted text-sm">גיל פרישה</p>
            <p className="text-3xl font-bold text-gold mt-2">{retirementAge}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-text-muted text-sm">נכסים צפויים בפרישה</p>
            <p className="text-3xl font-bold text-gold mt-2">
              ₪{(totalAssets * Math.pow(1.05, yearsToRetirement) / 1000000).toFixed(1)}M
            </p>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-cream mb-4">המלצות</h3>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <Card key={idx}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {rec.severity === 'success' ? (
                    <CheckCircle className="text-green-400" size={24} />
                  ) : (
                    <AlertCircle className="text-blue-400" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-cream">{rec.title}</h4>
                    <Badge severity={rec.severity === 'success' ? 'success' : 'info'}>
                      {rec.severity}
                    </Badge>
                  </div>
                  <p className="text-text-muted text-sm">{rec.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <Card className="bg-gold bg-opacity-10 border border-gold">
        <h3 className="text-lg font-semibold text-gold mb-3">שלב הבא</h3>
        <ul className="space-y-2 text-gold text-sm">
          <li className="flex items-center gap-2">
            <span>✓</span>
            <span>בדוק את תוצאות הסימולציה לשנים הקרובות</span>
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span>
            <span>שמור תעודות של כל הנכסים והקרנות שלך</span>
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span>
            <span>זמן פגישה עם יועץ פיננסי לייעוץ מקצועי</span>
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span>
            <span>עדכן את התכנית שלך בחצי שנה</span>
          </li>
        </ul>
      </Card>

      <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
        <p className="text-blue-200 text-sm">
          <strong>הערה חשובה:</strong> התחזוקה זו היא הערכה בלבד המבוססת על הנתונים שסיפקת. לקבלת ייעוץ מקצועי מלא, אנא הצטרף ליועץ פיננסי מוסמך.
        </p>
      </div>
    </div>
  )
}
