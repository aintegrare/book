import React from 'react'

/**
 * List Component
 *
 * Renders a styled list with proper indentation and markers.
 * Supports different types of markers.
 *
 * @param {'bullet'|'check'|'cross'|'ordered'} type - List marker type
 * @param {Array<string|React.ReactNode>} items - List items
 * @param {boolean} hanging - Use hanging indent for wrapped lines
 * @param {string} className - Additional CSS classes
 */
export default function List({ type = 'bullet', items = [], hanging = false, className = '' }) {
  const typeClasses = {
    bullet: 'list-styled',
    check: 'list-styled list-check',
    cross: 'list-styled list-cross',
    ordered: '', // Use native ordered list
  }

  const listClass = typeClasses[type] || typeClasses.bullet
  const hangingClass = hanging ? 'list-hanging' : ''

  if (type === 'ordered') {
    return (
      <ol className={`rhythm-list ${className}`}>
        {items.map((item, index) => (
          <li key={index} className="text-body">
            {item}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className={`${listClass} ${hangingClass} rhythm-list ${className}`}>
      {items.map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}
