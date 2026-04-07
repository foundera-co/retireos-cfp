import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
  year: number
  age: number
  totalAssets: number
}

interface NetWorthChartProps {
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

export const NetWorthChart: React.FC<NetWorthChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96 bg-surface rounded-xl p-6">
      <h3 className="text-lg font-semibold text-cream mb-4">שווי נטו מוקרן</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#d4af37" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
            formatter={(value: any) => [formatCurrency(value), 'שווי נטו']}
            labelFormatter={(label) => `שנה ${label}`}
          />
          <Area
            type="monotone"
            dataKey="totalAssets"
            stroke="#d4af37"
            fillOpacity={1}
            fill="url(#colorAssets)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
