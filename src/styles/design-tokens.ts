/**
 * Sana.ai Design System Tokens
 * Extracted from https://sana.ai/SpzBFFuhzghj/tasks
 *
 * Color System: Dark mode with subtle gray palette
 * Typography: Sana Sans (custom) with system fallbacks
 * Spacing: 4px base unit (0.25rem)
 */

export const colors = {
  // Background colors
  background: {
    primary: '#131314',      // Main background (paper)
    secondary: '#1e1f20',    // Secondary background
    secondaryHover: '#242628',
    tertiary: '#353536',     // Cards, elevated surfaces
    tertiaryHover: '#4c4c4d',
    muted: '#000000ed',      // Overlay background
    accent: '#cdfe00',       // Accent/brand color (neon green)
  },

  // Foreground/Text colors
  foreground: {
    primary: '#e8e8e8',      // Primary text
    secondary: 'rgba(232, 232, 232, 0.6)',   // 60% opacity
    secondarySolid: '#8b8b8b',
    muted: 'rgba(232, 232, 232, 0.4)',       // 40% opacity
    mutedSolid: '#5d5d5d',
    accent: '#0a1217',       // Text on accent background
    accentAlt: '#fd2d55',    // Alternative accent (red)
  },

  // Opacity variants (for precise control)
  opacity: {
    0: 'rgba(232, 232, 232, 0)',
    3: 'rgba(232, 232, 232, 0.03)',
    5: 'rgba(232, 232, 232, 0.05)',
    10: 'rgba(232, 232, 232, 0.1)',
    15: 'rgba(232, 232, 232, 0.15)',
    20: 'rgba(232, 232, 232, 0.2)',
    25: 'rgba(232, 232, 232, 0.25)',
    30: 'rgba(232, 232, 232, 0.3)',
    40: 'rgba(232, 232, 232, 0.4)',
    50: 'rgba(232, 232, 232, 0.5)',
    60: 'rgba(232, 232, 232, 0.6)',
    70: 'rgba(232, 232, 232, 0.7)',
    80: 'rgba(232, 232, 232, 0.8)',
    90: 'rgba(232, 232, 232, 0.9)',
    95: 'rgba(232, 232, 232, 0.95)',
  },

  // Brand colors
  brand: {
    neon: '#cdfe00',         // Primary brand (neon green)
    lime: '#0d0',
    wasabi: '#e5ff78',
    lemon: '#ff0',
    butter: '#fffd6e',
    zest: '#ffffa1',
    sunflower: '#fe0',
    sunset: '#fb0',
    orange: '#ff5102',
    scarlet: '#fa0019',
    crimson: '#9b0018',
    maroon: '#640042',
    oxblood: '#401220',
    pink: '#ff8cfd',
    bubblegum: '#ff4bde',
    cottonCandy: '#ffd9f7',
    fuschia: '#ef029f',
    royal: '#0057f3',
    sky: '#6acde3',
    ice: '#e4eff7',
    mist: '#a9efff',
    forest: '#040',
    darkNeon: '#007c1b',
    midnight: '#09102b',
    peach: '#ffd6c4',
  },

  // Semantic colors
  alert: {
    default: '#ff3b30',
    background: 'rgba(255, 59, 48, 0.06)',
  },
  warning: {
    default: '#ffa82f',
    background: 'rgba(255, 168, 47, 0.1)',
    hover: 'rgba(255, 168, 47, 0.8)',
  },
};

export const typography = {
  // Font families
  fontFamily: {
    sans: '"Sana Sans", -apple-system, BlinkMacSystemFont, "Sana Serif", Roboto, Inter, system-ui, sans-serif, Avenir, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    serif: '"Sana Serif"',
    mono: '"IBM Plex Mono", monospace',
  },

  // Font sizes with optical sizing and line heights
  fontSize: {
    xs: {
      size: '12px',
      lineHeight: '1.3',
      opticalSize: '14',
    },
    sm: {
      size: '14px',
      lineHeight: '1.4',
      opticalSize: '15.1',
    },
    base: {
      size: '16px',
      lineHeight: '1.5',
      opticalSize: '16.2',
    },
    lg: {
      size: '18px',
      lineHeight: '1.6',
      opticalSize: '17.3',
    },
    xl: {
      size: '20px',
      lineHeight: '1.6',
      opticalSize: '18.4',
    },
    '2xl': {
      size: '24px',
      lineHeight: '1.4',
      opticalSize: '20.5',
    },
    '3xl': {
      size: '34px',
      lineHeight: '1.15',
      opticalSize: '26',
    },
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    book: '450',
    medium: '500',
    semibold: '600',
    bold: '500', // Note: Sana uses 500 for bold
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },

  // Line heights
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
};

export const spacing = {
  // Base unit: 4px (0.25rem)
  base: '0.25rem',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

export const borderRadius = {
  xs: '0.125rem',   // 2px
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  '4xl': '2rem',    // 32px
  full: '9999px',   // Pill shape
};

export const container = {
  xs: '20rem',     // 320px
  sm: '24rem',     // 384px
  md: '28rem',     // 448px
  lg: '32rem',     // 512px
  xl: '36rem',     // 576px
  '2xl': '42rem',  // 672px
  '4xl': '56rem',  // 896px
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  insetFocus: 'rgba(0, 0, 0, 0) 0px 0px 0px 2px inset',
};

export const blur = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
};

export const transitions = {
  duration: {
    default: '150ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
  },
  timing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const zIndex = {
  dropdown: '10',
  modalOverlay: '20',
  modal: '30',
  tooltip: '40',
  toast: '50',
};

// Animation keyframes
export const animations = {
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  growBorder: 'growBorder 0.5s ease-in-out forwards',
};

// Sidebar dimensions
export const layout = {
  sidebarWidth: '280px',
  sidebarWidthCollapsed: '64px',
  headerHeight: '56px',
  inputHeight: '44px',
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  container,
  shadows,
  blur,
  transitions,
  zIndex,
  animations,
  layout,
};
