import React from 'react'

type Severity = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface BadgeProps {
  severity?: Severity
  children: React.ReactNode
}

const severityClasses: Record<Severity, string> = {
  success: 'bg-green-900 text-green-200',
  warning: 'bg-amber-900 text-amber-200',
  error: 'bg-red-900 text-red-200',
  info: 'bg-blue-900 text-blue-200',
  neutral: 'bg-gray-700 text-gray-200',
}

export const Badge: React.FC<BadgeProps> = ({ severity = 'neutral', children }) => {
  return (
    <span className={`
      inline-block px-2 py-1 rounded text-xs font-medium
      ${severityClasses[severity]}
    `}>
      {children}
    </span>
  )
}
