import React from 'react'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

interface Step5Props {
  data: any
  onChange: (data: any) => void
}

export const Step5Pension: React.FC<Step5Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cream mb-4">פנסיה וקצבאות</h2>
        <p className="text-text-muted mb-6">מידע על קרנות הפנסיה שלכם וקצבאות צפויות</p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">קרן פנסיה - דן</h3>
        <div className="space-y-4">
          <Input
            label="יתרה נוכחית (₪)"
            type="number"
            placeholder="1,800,000"
            value={data.primaryPensionBalance || ''}
            onChange={(e) => handleChange('primaryPensionBalance', e.target.value)}
          />
          <Input
            label="תרומה חודשית (₪)"
            type="number"
            placeholder="5000"
            value={data.primaryPensionMonthly || ''}
            onChange={(e) => handleChange('primaryPensionMonthly', e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-cream mb-2">סוג קרן</label>
            <select
              value={data.primaryPensionType || ''}
              onChange={(e) => handleChange('primaryPensionType', e.target.value)}
              className="w-full px-4 py-2 bg-surface-light border border-surface rounded-lg text-cream"
            >
              <option value="">בחר...</option>
              <option value="employer">קרן מעסיק</option>
              <option value="personal">קרן אישית</option>
              <option value="union">קרן בחברה כלל</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">קרן פנסיה - קרן</h3>
        <div className="space-y-4">
          <Input
            label="יתרה נוכחית (₪)"
            type="number"
            placeholder="1,200,000"
            value={data.spousePensionBalance || ''}
            onChange={(e) => handleChange('spousePensionBalance', e.target.value)}
          />
          <Input
            label="תרומה חודשית (₪)"
            type="number"
            placeholder="6000"
            value={data.spousePensionMonthly || ''}
            onChange={(e) => handleChange('spousePensionMonthly', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">קיבוע זכויות (טופס 161)</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={data.useForm161 || false}
              onChange={(e) => handleChange('useForm161', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-cream">אגיש קיבוע זכויות בהתאם לסעיף 161</span>
          </label>
          {data.useForm161 && (
            <div className="bg-gold bg-opacity-10 border border-gold rounded-lg p-4">
              <p className="text-sm text-gold">
                קיבוע זכויות מאפשר הנחה מסית על עד ₪9,430 בחודש מהקצבה.
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">ביטוח לאומי</h3>
        <div className="space-y-4">
          <Input
            label="גיל תחילת קצבת זקנה - דן (בדרך כלל 70)"
            type="number"
            placeholder="70"
            value={data.primaryNIAge || ''}
            onChange={(e) => handleChange('primaryNIAge', e.target.value)}
          />
          <Input
            label="גיל תחילת קצבת זקנה - קרן (בדרך כלל 65)"
            type="number"
            placeholder="65"
            value={data.spouseNIAge || ''}
            onChange={(e) => handleChange('spouseNIAge', e.target.value)}
          />
        </div>
      </Card>
    </div>
  )
}
