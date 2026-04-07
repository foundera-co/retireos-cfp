import React from 'react'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

interface Step3Props {
  data: any
  onChange: (data: any) => void
}

export const Step3Income: React.FC<Step3Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cream mb-4">הכנסות והוצאות</h2>
        <p className="text-text-muted mb-6">פרט את הכנסות ההוצאות החודשיות של המשפחה</p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">הכנסות חודשיות</h3>
        <div className="space-y-4">
          <Input
            label="שכר דן (₪)"
            type="number"
            placeholder="16000"
            value={data.primarySalary || ''}
            onChange={(e) => handleChange('primarySalary', e.target.value)}
          />
          <Input
            label="שכר קרן (₪)"
            type="number"
            placeholder="20000"
            value={data.spouseSalary || ''}
            onChange={(e) => handleChange('spouseSalary', e.target.value)}
          />
          <Input
            label="הכנסה משכרה נוספת (₪)"
            type="number"
            placeholder="0"
            value={data.otherIncome || ''}
            onChange={(e) => handleChange('otherIncome', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">הוצאות חודשיות</h3>
        <div className="space-y-4">
          <Input
            label="הוצאות חיים בסיסיות (₪)"
            type="number"
            placeholder="20000"
            value={data.livingExpenses || ''}
            onChange={(e) => handleChange('livingExpenses', e.target.value)}
            helperText="דיור, מזון, תחבורה, בריאות וכו׳"
          />
          <Input
            label="פיקדון חודשי (₪)"
            type="number"
            placeholder="5000"
            value={data.monthlyDeposit || ''}
            onChange={(e) => handleChange('monthlyDeposit', e.target.value)}
            helperText="סכום שאתם חוסכים כל חודש"
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-cream mb-4">הוצאות מיוחדות</h3>
        <div className="space-y-4">
          <Input
            label="הוצאה לחינוך (₪)"
            type="number"
            placeholder="0"
            value={data.educationExpenses || ''}
            onChange={(e) => handleChange('educationExpenses', e.target.value)}
          />
          <Input
            label="הוצאה לנסיעות (₪)"
            type="number"
            placeholder="0"
            value={data.travelExpenses || ''}
            onChange={(e) => handleChange('travelExpenses', e.target.value)}
          />
        </div>
      </Card>
    </div>
  )
}
