import React from 'react'
import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { FileText, Download } from 'lucide-react'

export const Reports: React.FC = () => {
  const reports = [
    {
      id: 'retirement_plan',
      name: 'תוכנית פרישה מלאה',
      description: 'דוח מקיף הכולל ניתוח הכנסות, הוצאות, מיסוי ודוגמאות תחזוקה',
      icon: FileText,
    },
    {
      id: 'tax_analysis',
      name: 'ניתוח מיסוי מפורט',
      description: 'פירוט חישובי המס ללבחור אסטרטגיות להקטנת יודתות מסית',
      icon: FileText,
    },
    {
      id: 'pension_projection',
      name: 'תחזוקת פנסיה',
      description: 'הערכה של קצבאות פנסיה משתי התקופות - לפני ואחרי הפרישה',
      icon: FileText,
    },
    {
      id: 'cashflow_analysis',
      name: 'ניתוח תזרים מזומנים',
      description: 'תחזוקה שנתית של הכנסות, הוצאות וחיסכון לכל שנת הפרישה',
      icon: FileText,
    },
    {
      id: 'asset_allocation',
      name: 'הקצאת נכסים אופטימלית',
      description: 'המלצות לחלוקת נכסים ביחס לסיכון ותשואה',
      icon: FileText,
    },
    {
      id: 'goal_tracking',
      name: 'מעקב אחר יעדים',
      description: 'זהוי הערדות יעדים פיננסיים וסטטוס התקדמות',
      icon: FileText,
    },
  ]

  const handleGenerateReport = (reportId: string) => {
    alert(`דוח "${reports.find(r => r.id === reportId)?.name}" הופק בהצלחה!`)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-cream">דוחות</h1>
          <p className="text-text-muted mt-1">יצר דוחות מפורטים לניתוח תכנון הפרישה שלך</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const IconComponent = report.icon
            return (
              <Card key={report.id} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-cream mb-2">{report.name}</h3>
                    <p className="text-sm text-text-muted">{report.description}</p>
                  </div>
                  <IconComponent className="text-gold opacity-30 flex-shrink-0" size={32} />
                </div>

                <div className="mt-auto pt-4 border-t border-surface-light">
                  <Button
                    onClick={() => handleGenerateReport(report.id)}
                    variant="primary"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    <span>הפק דוח</span>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="bg-blue-900 bg-opacity-30 border border-blue-500">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">עצות לדוחות</h3>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li>• דוחות משודכים בכל פעם שאתה משנה נתונים בתכנית</li>
            <li>• אתה יכול להדפיס דוחות ישירות מהדפדפן</li>
            <li>• שמור עותק של הדוחות למעקב בעתיד</li>
            <li>• שתף דוחות עם יועציך הפיננסיים</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  )
}
