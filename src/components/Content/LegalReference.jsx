import React from 'react'

/**
 * LegalReference Component
 *
 * Renders a legal reference (article, law, etc.) with proper styling.
 * Can be inline or block-level.
 *
 * @param {string} article - Article reference (e.g., "Art. 121, §2º, II")
 * @param {string} law - Law name (e.g., "Código Penal")
 * @param {boolean} block - Render as block (default: inline)
 * @param {string} className - Additional CSS classes
 */
export default function LegalReference({ article, law, block = false, className = '' }) {
  if (block) {
    return (
      <div className={`legal-ref-block ${className}`}>
        <div className="legal-ref-label">Fundamentação Legal</div>
        <div className="legal-ref-content">
          {article}
          {law && (
            <>
              <br />
              {law}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <span className={`legal-ref ${className}`}>
      {article}
      {law && ` - ${law}`}
    </span>
  )
}
