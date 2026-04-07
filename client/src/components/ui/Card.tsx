import React from 'react'

interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({ children, header, footer, className = '', onClick }) => {
  return (
    <div className={`bg-surface rounded-xl p-6 ${className}`} onClick={onClick}>
      {header && (
        <div className="border-b border-surface-light pb-4 mb-4">
          {header}
        </div>
      )}
      {children}
      {footer && (
        <div className="border-t border-surface-light pt-4 mt-4">
          {footer}
        </div>
      )}
    </div>
  )
}
