import React from 'react'

/**
 * Section Component
 *
 * Renders a section heading with proper hierarchy, numbering, and styling.
 * Follows LaTeX-quality typography principles.
 *
 * @param {1|2|3|4} level - Hierarchy level (1=chapter, 2=section, 3=subsection, 4=paragraph)
 * @param {string} number - Section number (e.g., "1.1", "2.3.1")
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 */
export default function Section({ level = 2, number, title, className = '' }) {
  const headingClasses = {
    1: 'heading-chapter',
    2: 'heading-section',
    3: 'heading-subsection',
    4: 'heading-paragraph',
  }

  const Tag = level === 4 ? 'h4' : level === 3 ? 'h3' : level === 1 ? 'h1' : 'h2'
  const headingClass = headingClasses[level] || headingClasses[2]

  return (
    <Tag className={`${headingClass} ${className}`}>
      {number && <span className="section-number">§ {number}</span>}
      {title}
    </Tag>
  )
}
