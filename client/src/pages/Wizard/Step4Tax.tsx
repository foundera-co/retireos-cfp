import React from 'react'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

interface Step4Props {
  data: any
  onChange: (data: any) => void
}

export const Step4Tax: React.FC<Step4Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cream mb-4">מיסוי וניכויים</h2>
        <p className="text-text-muted mb-6">מידע נדרש לחישוב המס וניכויים משכר</p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">דן</h3>
        <div className="space-y-4">
          <Input
            label="נקודות זיכוי"
            type="number"
            placeholder="2"
            value={data.primaryCreditPoints || ''}
            onChange={(e) => handleChange('primaryCreditPoints', e.target.value)}
            helperText="כל נקודה שווה ₪2,820 בשנה (₪235 בחודש)"
          />
          <Input
            label="סוכנות עבודה (אם קיים הסכם)"
            type="number"
            placeholder="0"
            value={data.primaryEmploymentAgency || ''}
            onChange={(e) => handleChange('primaryEmploymentAgency', e.target.value)}
            helperText="ניכוי עבור תרומה לקרן פנסיה / השתלמות"
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">קרן</h3>
        <div className="space-y-4">
          <Input
            label="נקודות זיכוי"
            type="number"
            placeholder="2"
            value={data.spouseCreditPoints || ''}
            onChange={(e) => handleChange('spouseCreditPoints', e.target.value)}
            helperText="כל נקודה שווה ₪2,820 בשנה (₪235 בחודש)"
          />
          <Input
            label="סוכנות עבודה (אם קיים הסכם)"
            type="number"
            placeholder="0"
            value={data.spouseEmploymentAgency || ''}
            onChange={(e) => handleChange('spouseEmploymentAgency', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">מידע כללי</h3>
        <div className="space-y-4">
          <Input
            label="הכנסה צפויה נוספת (כשיו בתיים וכדומה)"
            type="number"
            placeholder="0"
            value={data.capitalGains || ''}
            onChange={(e) => handleChange('capitalGains', e.target.value)}
          />
          <Input
            label="חיסכון שנתי בתכנית פנסיה (₪)"
            type="number"
            placeholder="0"
            value={data.pensionContribution || ''}
            onChange={(e) => handleChange('pensionContribution', e.target.value)}
          />
        </div>
      </Card>

      <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4 text-blue-200 text-sm">
        <p><strong>הערה:</strong> חישובי המס משתמשים בסולם מס 2026 הישראלי, כולל יחידות זיכוי בערך ₪2,820 בשנה.</p>
      </div>
    </div>
  )
}
