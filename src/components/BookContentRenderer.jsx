import React from 'react'
import Section from './Typography/Section'
import Paragraph from './Typography/Paragraph'
import List from './Typography/List'
import Callout from './Content/Callout'
import Box from './Content/Box'
import LegalReference from './Content/LegalReference'
import Question from './Content/Question'

/**
 * BookContentRenderer
 *
 * Renders structured book content using semantic components.
 * Accepts an array of content blocks and renders appropriate components.
 *
 * Content block types:
 * - section: { type: 'section', level, number, title }
 * - paragraph: { type: 'paragraph', variant?, text }
 * - list: { type: 'list', listType?, items }
 * - callout: { type: 'callout', variant?, content }
 * - box: { type: 'box', variant?, title?, content }
 * - legal: { type: 'legal', article, law?, block? }
 * - question: { type: 'question', exam, number, text, alternatives, answer?, article?, law? }
 * - separator: { type: 'separator', bold? }
 * - string: Plain text (for backward compatibility)
 *
 * @param {Array} content - Array of content blocks
 * @param {string} className - Additional CSS classes
 */
export default function BookContentRenderer({ content, className = '' }) {
  // Fallback for old string-based content
  if (typeof content === 'string') {
    return (
      <div className={`content-reading ${className}`}>
        <div className="text-body whitespace-pre-line">{content}</div>
      </div>
    )
  }

  // Handle new structured content
  if (!Array.isArray(content)) {
    console.error('BookContentRenderer: content must be an array or string')
    return null
  }

  return (
    <div className={`content-reading ${className}`}>
      {content.map((block, index) => {
        // Handle plain string blocks
        if (typeof block === 'string') {
          return (
            <Paragraph key={index} variant="normal">
              {block}
            </Paragraph>
          )
        }

        // Handle structured blocks
        switch (block.type) {
          case 'section':
            return (
              <Section
                key={index}
                level={block.level || 2}
                number={block.number}
                title={block.title}
              />
            )

          case 'paragraph':
            return (
              <Paragraph key={index} variant={block.variant || 'normal'}>
                {block.text}
              </Paragraph>
            )

          case 'list':
            return (
              <List
                key={index}
                type={block.listType || 'bullet'}
                items={block.items || []}
                hanging={block.hanging}
              />
            )

          case 'callout':
            return (
              <Callout key={index} variant={block.variant || 'quote'}>
                {block.content}
              </Callout>
            )

          case 'box':
            return (
              <Box key={index} variant={block.variant || 'diagnosis'} title={block.title}>
                {block.content}
              </Box>
            )

          case 'legal':
            return (
              <LegalReference
                key={index}
                article={block.article}
                law={block.law}
                block={block.block}
              />
            )

          case 'question':
            return (
              <Question
                key={index}
                exam={block.exam}
                number={block.number}
                text={block.text}
                alternatives={block.alternatives || []}
                answer={block.answer}
                article={block.article}
                law={block.law}
              />
            )

          case 'separator':
            return (
              <hr
                key={index}
                className={block.bold ? 'separator-bold' : 'separator'}
              />
            )

          default:
            console.warn(`Unknown block type: ${block.type}`, block)
            return null
        }
      })}
    </div>
  )
}
