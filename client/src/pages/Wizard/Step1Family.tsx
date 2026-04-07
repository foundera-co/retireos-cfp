import React from 'react'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

interface Step1Props {
  data: any
  onChange: (data: any) => void
}

export const Step1Family: React.FC<Step1Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cream mb-4">מידע משפחתי</h2>
        <p className="text-text-muted mb-6">בואו נתחיל בכמה פרטים בסיסיים על המשפחה שלך</p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">בן/בת הזוג הראשי</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="שם"
            placeholder="דן"
            value={data.primaryName || ''}
            onChange={(e) => handleChange('primaryName', e.target.value)}
          />
          <Input
            label="גיל"
            type="number"
            placeholder="48"
            value={data.primaryAge || ''}
            onChange={(e) => handleChange('primaryAge', e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-cream mb-2">מין</label>
            <select
              value={data.primaryGender || ''}
              onChange={(e) => handleChange('primaryGender', e.target.value)}
              className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
            >
              <option value="">בחר...</option>
              <option value="male">גבר</option>
              <option value="female">אישה</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-cream mb-2">סטטוס העסקה</label>
            <select
              value={data.primaryEmployment || ''}
              onChange={(e) => handleChange('primaryEmployment', e.target.value)}
              className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
            >
              <option value="">בחר...</option>
              <option value="employed">מועסק</option>
              <option value="self_employed">עצמאי</option>
              <option value="retired">פרוש</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">בן/בת הזוג השני (אופציונלי)</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="שם"
            placeholder="קרן"
            value={data.spouseName || ''}
            onChange={(e) => handleChange('spouseName', e.target.value)}
          />
          <Input
            label="גיל"
            type="number"
            placeholder="46"
            value={data.spouseAge || ''}
            onChange={(e) => handleChange('spouseAge', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">יעדי פרישה</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="גיל פרישה מתוכנן"
            type="number"
            placeholder="55"
            value={data.retirementAge || ''}
            onChange={(e) => handleChange('retirementAge', e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-cream mb-2">סיכון בתיקייה</label>
            <select
              value={data.riskTolerance || ''}
              onChange={(e) => handleChange('riskTolerance', e.target.value)}
              className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
            >
              <option value="">בחר...</option>
              <option value="low">נמוך</option>
              <option value="medium">בינוני</option>
              <option value="high">גבוה</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  )
}
