import React from 'react'

/**
 * Paragraph Component
 *
 * Renders a paragraph with proper typography and spacing.
 * Supports different variants for different contexts.
 *
 * @param {'normal'|'lead'|'small'} variant - Paragraph variant
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Paragraph content
 */
export default function Paragraph({ variant = 'normal', className = '', children }) {
  const variantClasses = {
    normal: 'text-body rhythm-paragraph',
    lead: 'text-lead',
    small: 'text-small',
  }

  const variantClass = variantClasses[variant] || variantClasses.normal

  return (
    <p className={`${variantClass} ${className}`}>
      {children}
    </p>
  )
}
