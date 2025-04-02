/**
 * Shared theme values that don't change between light/dark modes or theme categories
 */

export const shared = {
  // Base sizing and spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
    card: '0.75rem',
    button: '0.5rem',
    tag: '9999px',
  },
  
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    popup: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
  
  // Animation and transitions
  animation: {
    transition: {
      fast: 'all 0.15s ease',
      normal: 'all 0.3s ease',
      slow: 'all 0.5s ease',
    },
  },
  
  // Component specific shared values
  components: {
    // Toolkit layout
    toolkit: {
      maxWidth: '1280px',
      padding: {
        x: '1rem',
        y: '1rem',
      },
    },
    
    // Base card
    baseCard: {
      width: '100%',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      transition: 'all 0.3s ease',
    },
    
    // Scrollable content
    scrollableContent: {
      scrollbarWidth: 'thin',
      scrollbarTrackRadius: '9999px',
      scrollbarThumbRadius: '9999px',
    },
    
    // Overlay backdrop
    overlay: {
      backdropFilter: 'blur(4px)',
    },
    
    // Focus states
    focusRing: {
      width: '2px',
      style: 'solid',
    },
  },
}; 