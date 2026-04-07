import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DataPoint {
  year: number
  totalIncome: number
  totalExpenses: number
}

interface CashflowChartProps {
  data: DataPoint[]
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₪${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `₪${(value / 1000).toFixed(0)}K`
  }
  return `₪${value.toFixed(0)}`
}

export const CashflowChart: React.FC<CashflowChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96 bg-surface rounded-xl p-6">
      <h3 className="text-lg font-semibold text-cream mb-4">הכנסות מול הוצאות</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a40" />
          <XAxis
            dataKey="year"
            stroke="#8892a4"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#8892a4"
            style={{ fontSize: '12px' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a2235',
              border: '1px solid #d4af37',
              borderRadius: '8px',
              color: '#f5f0e8',
            }}
            formatter={(value: any) => formatCurrency(value)}
          />
          <Legend
            wrapperStyle={{ color: '#8892a4' }}
          />
          <Bar dataKey="totalIncome" name="הכנסה" fill="#10b981" />
          <Bar dataKey="totalExpenses" name="הוצאה" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
