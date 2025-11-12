/**
 * Design Tokens - LaTeX-Quality Typography System
 *
 * This file defines the foundational design tokens for achieving
 * professional, LaTeX-quality typography in the digital library.
 */

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Type Scale (modular scale based on 16px base)
  scale: {
    xs: '0.75rem',      // 12px - Legal references, small text
    sm: '0.875rem',     // 14px - Captions, metadata
    base: '1rem',       // 16px - Body text
    lg: '1.125rem',     // 18px - Lead paragraphs
    xl: '1.25rem',      // 20px - Subsections
    '2xl': '1.5rem',    // 24px - Sections
    '3xl': '1.875rem',  // 30px - Chapter titles
    '4xl': '2.25rem',   // 36px - Book titles
  },

  // Font Weights
  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights (vertical rhythm)
  lineHeight: {
    tight: 1.25,      // Headings
    snug: 1.375,      // Subheadings
    normal: 1.5,      // UI text
    relaxed: 1.625,   // Body text
    loose: 1.75,      // Lead paragraphs
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',  // Large headings
    tight: '-0.025em',   // Regular headings
    normal: '0',         // Body text
    wide: '0.025em',     // Small caps
    wider: '0.05em',     // All caps
    widest: '0.1em',     // Loose all caps
  },

  // Font Families
  family: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: '"Merriweather", Georgia, Cambria, "Times New Roman", Times, serif',
    mono: '"Roboto Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace',
  },
}

// ============================================================================
// SPACING (Baseline Grid)
// ============================================================================

// Base unit: 8px
// All vertical spacing should be multiples of this baseline
export const spacing = {
  baseline: 8, // px

  // Rhythm function: returns spacing as multiple of baseline
  rhythm: (multiplier) => `${8 * multiplier}px`,

  // Common spacing values (in baseline units)
  xxs: '0.25rem',  // 4px  = 0.5× baseline
  xs: '0.5rem',    // 8px  = 1× baseline
  sm: '0.75rem',   // 12px = 1.5× baseline
  md: '1rem',      // 16px = 2× baseline
  lg: '1.5rem',    // 24px = 3× baseline
  xl: '2rem',      // 32px = 4× baseline
  '2xl': '3rem',   // 48px = 6× baseline
  '3xl': '4rem',   // 64px = 8× baseline
  '4xl': '6rem',   // 96px = 12× baseline
}

// Element-specific spacing (in baseline units)
export const elementSpacing = {
  // Sections
  section: {
    marginTop: spacing.rhythm(6),    // 48px
    marginBottom: spacing.rhythm(3), // 24px
  },

  // Subsections
  subsection: {
    marginTop: spacing.rhythm(4),    // 32px
    marginBottom: spacing.rhythm(2), // 16px
  },

  // Paragraphs
  paragraph: {
    marginBottom: spacing.rhythm(2), // 16px
  },

  // Lists
  list: {
    marginBottom: spacing.rhythm(2),   // 16px
    itemSpacing: spacing.rhythm(0.75), // 6px
    indent: spacing.rhythm(3),         // 24px
  },

  // Callouts and Boxes
  callout: {
    marginTop: spacing.rhythm(3),    // 24px
    marginBottom: spacing.rhythm(3), // 24px
    padding: spacing.rhythm(2.5),    // 20px
  },

  box: {
    marginTop: spacing.rhythm(3),    // 24px
    marginBottom: spacing.rhythm(3), // 24px
    padding: spacing.rhythm(2.5),    // 20px
  },
}

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Text colors
  text: {
    primary: '#1a202c',      // Dark gray - body text
    secondary: '#4a5568',    // Medium gray - secondary text
    tertiary: '#718096',     // Light gray - metadata
    inverse: '#ffffff',      // White - text on dark backgrounds
    link: '#2b6cb0',         // Blue - links
    linkHover: '#2c5282',    // Darker blue - link hover
  },

  // Background colors
  bg: {
    primary: '#ffffff',      // White - main background
    secondary: '#f7fafc',    // Very light gray - subtle backgrounds
    tertiary: '#edf2f7',     // Light gray - section backgrounds
  },

  // Border colors
  border: {
    light: '#e2e8f0',        // Light border
    medium: '#cbd5e0',       // Medium border
    dark: '#a0aec0',         // Dark border
  },

  // Callout variants
  callout: {
    quote: {
      bg: '#f7fafc',
      border: '#cbd5e0',
      text: '#2d3748',
    },
    tip: {
      bg: '#f0fff4',
      border: '#68d391',
      text: '#22543d',
    },
    warning: {
      bg: '#fffaf0',
      border: '#ed8936',
      text: '#7c2d12',
    },
    important: {
      bg: '#fff5f5',
      border: '#fc8181',
      text: '#742a2a',
    },
  },

  // Box variants
  box: {
    diagnosis: {
      bg: '#edf2f7',
      border: '#4299e1',
      text: '#2c5282',
    },
    legal: {
      bg: '#fffaf0',
      border: '#ed8936',
      text: '#7c2d12',
    },
    example: {
      bg: '#f0fff4',
      border: '#68d391',
      text: '#22543d',
    },
    principle: {
      bg: '#faf5ff',
      border: '#9f7aea',
      text: '#553c9a',
    },
  },

  // Question components
  question: {
    bg: '#ffffff',
    border: '#e2e8f0',
    headerBg: '#f7fafc',
    alternativeBg: '#ffffff',
    alternativeHover: '#f7fafc',
    answerBg: '#f0fff4',
    answerBorder: '#68d391',
  },
}

// ============================================================================
// MEASURE (Line Width)
// ============================================================================

export const measure = {
  // Optimal line length in characters (based on typography research)
  optimal: '65ch',      // 65 characters - ideal
  wide: '75ch',         // 75 characters - acceptable maximum
  narrow: '55ch',       // 55 characters - acceptable minimum

  // In pixels (fallback)
  optimalPx: '40rem',   // ~640px
  widePx: '48rem',      // ~768px
  narrowPx: '32rem',    // ~512px
}

// ============================================================================
// ELEVATION (Shadows)
// ============================================================================

export const elevation = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
}

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  full: '9999px',    // Fully rounded
}

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transition = {
  duration: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
  },

  timing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
}

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ============================================================================
// CONTENT WIDTH
// ============================================================================

export const contentWidth = {
  // Reading content should be narrower
  reading: {
    min: '320px',
    max: '42rem',     // ~672px - optimal for reading
    padding: '1.5rem', // Side padding
  },

  // UI content can be wider
  ui: {
    min: '320px',
    max: '80rem',     // ~1280px
    padding: '2rem',
  },
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {
  typography,
  spacing,
  elementSpacing,
  colors,
  measure,
  elevation,
  borderRadius,
  transition,
  breakpoints,
  contentWidth,
}
