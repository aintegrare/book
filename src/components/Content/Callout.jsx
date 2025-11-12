import React from 'react'

/**
 * Callout Component
 *
 * Renders a styled callout box for quotes, tips, warnings, etc.
 * Uses subtle backgrounds and colored borders for visual distinction.
 *
 * @param {'quote'|'tip'|'warning'|'important'} variant - Callout type
 * @param {React.ReactNode} children - Callout content
 * @param {string} className - Additional CSS classes
 */
export default function Callout({ variant = 'quote', children, className = '' }) {
  const variantClasses = {
    quote: 'callout-quote',
    tip: 'callout-tip',
    warning: 'callout-warning',
    important: 'callout-important',
  }

  const variantClass = variantClasses[variant] || variantClasses.quote

  return (
    <div className={`callout ${variantClass} ${className}`}>
      {typeof children === 'string' ? <p className="text-body">{children}</p> : children}
    </div>
  )
}
