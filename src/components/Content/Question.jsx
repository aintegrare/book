import React from 'react'
import LegalReference from './LegalReference'

/**
 * Question Component - Premium Design
 *
 * Renders an OAB exam question with professional formatting.
 * Features elegant styling, clear hierarchy, and premium typography.
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
      className={`rhythm-question border-3 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {/* Header - Premium styling */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-8 py-5 border-b-2 border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest letter-spacing-wider">
              {exam}
            </div>
            <div className="h-6 w-px bg-blue-300 dark:bg-blue-600"></div>
            <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
              {number}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Questão de Prova</span>
          </div>
        </div>
      </div>

      {/* Question Text - Enhanced typography */}
      <div className="px-8 py-6 bg-white dark:bg-gray-800">
        <div className="text-body whitespace-pre-line leading-relaxed">
          {text}
        </div>
      </div>

      {/* Alternatives - Premium grid */}
      {alternatives.length > 0 && (
        <div className="px-8 pb-6 pt-2 bg-white dark:bg-gray-800">
          <div className="space-y-3">
            {alternatives.map((alt, index) => {
              const isCorrect = answer && alt.letter === answer;

              return (
                <div
                  key={index}
                  className={`group relative p-5 rounded-xl border-2 transition-all duration-200 ${
                    isCorrect
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-400 dark:border-green-600 shadow-md'
                      : 'bg-gray-50/50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                  }`}
                >
                  {/* Correct answer indicator */}
                  {isCorrect && (
                    <div className="absolute top-3 right-3 flex items-center space-x-1 text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800/50 px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Correta</span>
                    </div>
                  )}

                  <div className="flex items-start">
                    {/* Letter badge */}
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-base shadow-sm transition-all ${
                        isCorrect
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white ring-4 ring-green-200 dark:ring-green-700'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 dark:group-hover:from-gray-500 dark:group-hover:to-gray-600'
                      }`}>
                        {alt.letter}
                      </span>
                    </div>

                    {/* Alternative text */}
                    <div className={`flex-1 pt-1.5 text-base leading-relaxed whitespace-pre-line ${
                      isCorrect
                        ? 'text-gray-900 dark:text-gray-100 font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {alt.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legal Reference - Enhanced */}
      {article && (
        <div className="px-8 pb-6 bg-white dark:bg-gray-800">
          <LegalReference article={article} law={law} block />
        </div>
      )}
    </div>
  )
}
