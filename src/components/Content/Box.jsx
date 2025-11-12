import React from 'react'

/**
 * Box Component
 *
 * Renders a styled box with title and content.
 * Used for special sections like "Diagnóstico", "Legal", "Example", etc.
 *
 * @param {'diagnosis'|'legal'|'example'|'principle'} variant - Box type
 * @param {string} title - Box title (uppercase, small)
 * @param {React.ReactNode} children - Box content
 * @param {string} className - Additional CSS classes
 */
export default function Box({ variant = 'diagnosis', title, children, className = '' }) {
  const variantClasses = {
    diagnosis: 'box-diagnosis',
    legal: 'box-legal',
    example: 'box-example',
    principle: 'box-principle',
  }

  const variantClass = variantClasses[variant] || variantClasses.diagnosis

  return (
    <div className={`box ${variantClass} ${className}`}>
      {title && <div className="box-title">{title}</div>}
      <div className="box-content">
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  )
}
