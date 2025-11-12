import React from 'react'
import LegalReference from './LegalReference'

/**
 * Question Component
 *
 * Renders an OAB exam question with proper formatting.
 * Includes exam number, question text, alternatives, and legal reference.
 *
 * @param {string} exam - Exam identifier (e.g., "EXAME XXVII")
 * @param {string} number - Question number (e.g., "Q.62")
 * @param {string} text - Question text
 * @param {Array<{letter: string, text: string}>} alternatives - Answer alternatives
 * @param {string} answer - Correct answer letter (optional)
 * @param {string} article - Legal reference article
 * @param {string} law - Legal reference law name
 * @param {string} className - Additional CSS classes
 */
export default function Question({
  exam,
  number,
  text,
  alternatives = [],
  answer,
  article,
  law,
  className = '',
}) {
  return (
    <div
      className={`border-2 border-gray-200 rounded-lg overflow-hidden my-6 ${className}`}
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
    >
      {/* Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
            {exam}
          </div>
          <div className="font-bold text-primary-600">{number}</div>
        </div>
      </div>

      {/* Question Text */}
      <div className="px-6 py-4">
        <div className="text-body whitespace-pre-line">{text}</div>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div className="px-6 pb-4">
          <div className="space-y-3">
            {alternatives.map((alt, index) => (
              <div
                key={index}
                className={`p-4 rounded-md border-2 transition-colors ${
                  answer && alt.letter === answer
                    ? 'bg-green-50 border-green-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 font-bold text-sm">
                      {alt.letter}
                    </span>
                  </div>
                  <div className="flex-1 text-body text-sm whitespace-pre-line">
                    {alt.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legal Reference */}
      {article && (
        <div className="px-6 pb-4">
          <LegalReference article={article} law={law} block />
        </div>
      )}
    </div>
  )
}
