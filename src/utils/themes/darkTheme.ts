/**
 * Dark mode theme values with variations for Sales, Delivery, and Quality Assurance
 */

// Base dark theme
const darkBase = {
  // Base colors
  colors: {
    background: '#1e293b',
    surface: '#0f172a',
    surfaceAlt: '#1e293b',
    border: '#334155',
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      inverted: '#0f172a',
    },
    // Brand colors that stay consistent regardless of theme
    brand: {
      primary: '#10b981', // Emerald for Converge logo
      secondary: '#14b8a6', // Teal for accents
      badge: '#34d399',
      avatar: '#065f46'
    },
    // Theme-specific colors that remain consistent regardless of active theme
    themeSpecific: {
      sales: {
        primary: '#10b981',       // Emerald
        secondary: '#14b8a6',     // Teal
        gradient: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
        light: '#34d399',
        dark: '#059669',
        label: {
          bg: '#064e3b',
          text: '#34d399',
        }
      },
      delivery: {
        primary: '#3b82f6',       // Blue
        secondary: '#60a5fa',     // Light blue
        gradient: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
        light: '#60a5fa',
        dark: '#2563eb',
        label: {
          bg: '#1e40af',
          text: '#60a5fa',
        }
      },
      qa: {
        primary: '#a855f7',       // Purple
        secondary: '#c084fc',     // Light purple
        gradient: 'linear-gradient(90deg, #a855f7 0%, #c084fc 100%)',
        light: '#c084fc',
        dark: '#9333ea',
        label: {
          bg: '#6b21a8',
          text: '#c084fc',
        }
      }
    }
  },
};

// Sales theme (emerald/teal) - Dark mode
const salesDark = {
  ...darkBase,
  name: 'sales',
  colors: {
    ...darkBase.colors,
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrast: '#f1f5f9',
    },
    secondary: {
      main: '#14b8a6',
      light: '#2dd4bf',
      dark: '#0d9488',
      contrast: '#f1f5f9',
    },
    accent: '#047857',
    
    gradients: {
      banner: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
      header: 'linear-gradient(90deg, #064e3b 0%, #0f766e 100%)',
      button: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
      buttonHover: 'linear-gradient(90deg, #059669 0%, #0d9488 100%)',
    },
  },
  
  components: {
    // Toolkit header
    header: {
      background: '#0f172a',
      borderColor: '#334155',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      themeButton: {
        selected: {
          bg: '#064e3b',
          text: '#34d399',
          border: '#065f46',
        },
        normal: {
          bg: 'transparent',
          text: '#cbd5e1',
          border: 'transparent',
        },
        hover: {
          bg: '#1e293b',
          text: '#34d399',
          border: '#064e3b',
        },
      },
      feedbackButton: {
        bg: '#1e293b',
        bgHover: '#064e3b',
        border: '#334155',
        borderHover: '#065f46',
        text: '#cbd5e1',
        textHover: '#34d399',
        icon: '#cbd5e1',
        iconHover: '#34d399',
      },
      profileMenu: {
        bg: '#0f172a',
        border: '#334155',
        divider: '#1e293b',
        text: '#cbd5e1',
        hoverBg: '#1e293b',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      },
    },
    
    // Filter and search
    filter: {
      background: '#0f172a',
      border: '#334155',
      inputBg: '#1e293b',
      inputText: '#f1f5f9',
      inputPlaceholder: '#64748b',
      iconColor: '#94a3b8',
      button: {
        bg: '#1e293b',
        bgHover: '#064e3b',
        border: '#334155',
        borderHover: '#065f46',
        text: '#cbd5e1',
        textHover: '#34d399',
      },
      dropdown: {
        bg: '#0f172a',
        border: '#334155',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        itemHover: '#1e293b',
        text: '#cbd5e1',
      },
    },
    
    // FilterBar component
    filterBar: {
      background: '#0f172a',
      searchBackground: '#1e293b',
      panelBackground: '#0f172a',
      buttonBackground: '#1e293b',
      activeButtonBackground: '#064e3b',
      dropdownBackground: '#0f172a',
      dropdownButtonBackground: '#1e293b',
      dropdownHoverBackground: '#1e293b',
    },
    
    // Base card
    baseCard: {
      background: '#0f172a',
      border: '#334155',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
      themeLabel: {
        bg: '#064e3b',
        text: '#34d399',
      },
      categoryLabel: {
        bg: '#1e293b',
        text: '#cbd5e1',
      },
      tags: {
        bg: '#064e3b',
        text: '#34d399',
        border: '#065f46',
      },
    },
    
    // Shared card components
    cardComponents: {
      gradientBanner: {
        height: '0.25rem',
        gradient: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
      },
      header: {
        bg: 'linear-gradient(90deg, #064e3b 0%, #0f766e 100%)',
        text: '#f1f5f9',
        closeButtonBg: 'transparent',
        closeButtonBgHover: '#1e293b',
        closeButtonColor: '#94a3b8',
        closeButtonColorHover: '#cbd5e1',
      },
      footer: {
        bg: '#0f172a',
        border: '#334155',
        text: '#94a3b8',
        versionBg: '#1e293b',
        versionBorder: '#334155',
        versionText: '#cbd5e1',
      },
      materialsSection: {
        containerBg: '#0f172a',
        containerBorder: '#334155',
        headerText: '#f1f5f9',
        itemBg: '#1e293b',
        itemBorder: '#334155',
        itemHoverBg: '#334155',
        icons: {
          pdf: '#f87171',
          zip: '#facc15',
          xls: '#4ade80',
          docx: '#60a5fa',
          ppt: '#fb923c',
          yaml: '#c084fc',
          json: '#94a3b8',
          default: '#60a5fa',
        },
        text: '#f1f5f9',
        badgeBg: '#1e293b',
        badgeText: '#cbd5e1',
      },
      scrollableContent: {
        thumbColor: '#475569',
        thumbHoverColor: '#64748b',
        trackColor: '#1e293b',
      },
    },
    
    // Feedback card
    feedbackCard: {
      form: {
        fieldBg: '#1e293b',
        fieldBorder: '#334155',
        fieldText: '#f1f5f9',
        labelText: '#cbd5e1',
      },
      starRating: {
        emptyColor: '#475569',
        filledColor: '#fbbf24',
        hoverColor: '#f59e0b',
        size: '1.5rem',
      },
      submitButton: {
        bg: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
        bgHover: 'linear-gradient(90deg, #059669 0%, #0d9488 100%)',
        text: '#f1f5f9',
        disabledBg: '#334155',
        disabledText: '#64748b',
      },
    },
    
    // Detailed card
    detailedCard: {
      accessSection: {
        bg: '#1e293b',
        border: '#334155',
        iconBg: '#10b981',
        iconColor: '#f1f5f9',
        headingText: '#f1f5f9',
        bodyText: '#cbd5e1',
        buttonBg: '#10b981',
        buttonText: '#f1f5f9',
        buttonHoverBg: '#059669',
      },
    },
    
    // Expanded card
    expandedCard: {
      tabs: {
        bg: '#0f172a',
        borderBottom: '#334155',
        active: {
          text: '#34d399',
          indicator: '#10b981',
        },
        inactive: {
          text: '#94a3b8',
          hover: '#cbd5e1',
        },
      },
      contactTab: {
        sectionHeaderText: '#f1f5f9',
        sectionDivider: '#334155',
        iconColor: '#94a3b8',
      },
      codeTab: {
        bg: '#0f172a',
        text: '#f1f5f9',
        lineNumbers: '#64748b',
        highlightColor: {
          keyword: '#93c5fd',
          string: '#86efac',
          comment: '#64748b',
          function: '#c4b5fd',
          operator: '#f1f5f9',
        },
        copyButtonBg: 'rgba(255, 255, 255, 0.05)',
        copyButtonHoverBg: 'rgba(255, 255, 255, 0.1)',
        copyButtonText: '#f1f5f9',
      },
    },
  },
};

// Delivery theme (blue/indigo) - Dark mode
const deliveryDark = {
  ...darkBase,
  name: 'delivery',
  colors: {
    ...darkBase.colors,
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrast: '#f1f5f9',
    },
    secondary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrast: '#f1f5f9',
    },
    accent: '#1d4ed8',
    
    gradients: {
      banner: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      header: 'linear-gradient(90deg, #1e3a8a 0%, #312e81 100%)',
      button: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      buttonHover: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
    },
  },
  
  components: {
    // Toolkit header (blue themed)
    header: {
      background: '#0f172a',
      borderColor: '#334155',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      themeButton: {
        selected: {
          bg: '#1e3a8a',
          text: '#60a5fa',
          border: '#1e40af',
        },
        normal: {
          bg: 'transparent',
          text: '#cbd5e1',
          border: 'transparent',
        },
        hover: {
          bg: '#1e293b',
          text: '#60a5fa',
          border: '#1e3a8a',
        },
      },
      feedbackButton: {
        bg: '#1e293b',
        bgHover: '#1e3a8a',
        border: '#334155',
        borderHover: '#1e40af',
        text: '#cbd5e1',
        textHover: '#60a5fa',
        icon: '#cbd5e1',
        iconHover: '#60a5fa',
      },
      profileMenu: {
        bg: '#0f172a',
        border: '#334155',
        divider: '#1e293b',
        text: '#cbd5e1',
        hoverBg: '#1e293b',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      },
    },
    
    // Filter and search (blue themed)
    filter: {
      background: '#0f172a',
      border: '#334155',
      inputBg: '#1e293b',
      inputText: '#f1f5f9',
      inputPlaceholder: '#64748b',
      iconColor: '#94a3b8',
      button: {
        bg: '#1e293b',
        bgHover: '#1e3a8a',
        border: '#334155',
        borderHover: '#1e40af',
        text: '#cbd5e1',
        textHover: '#60a5fa',
      },
      dropdown: {
        bg: '#0f172a',
        border: '#334155',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        itemHover: '#1e293b',
        text: '#cbd5e1',
      },
    },
    
    // FilterBar component
    filterBar: {
      background: '#0f172a',
      searchBackground: '#1e293b',
      panelBackground: '#0f172a',
      buttonBackground: '#1e293b',
      activeButtonBackground: '#064e3b',
      dropdownBackground: '#0f172a',
      dropdownButtonBackground: '#1e293b',
      dropdownHoverBackground: '#1e293b',
    },
    
    // Base card (blue themed)
    baseCard: {
      background: '#0f172a',
      border: '#334155',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
      themeLabel: {
        bg: '#1e3a8a',
        text: '#60a5fa',
      },
      categoryLabel: {
        bg: '#1e293b',
        text: '#cbd5e1',
      },
      tags: {
        bg: '#1e3a8a',
        text: '#60a5fa',
        border: '#1e40af',
      },
    },
    
    // Shared card components (blue themed)
    cardComponents: {
      gradientBanner: {
        height: '0.25rem',
        gradient: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      },
      header: {
        bg: 'linear-gradient(90deg, #1e3a8a 0%, #312e81 100%)',
        text: '#f1f5f9',
        closeButtonBg: 'transparent',
        closeButtonBgHover: '#1e293b',
        closeButtonColor: '#94a3b8',
        closeButtonColorHover: '#cbd5e1',
      },
      footer: {
        bg: '#0f172a',
        border: '#334155',
        text: '#94a3b8',
        versionBg: '#1e293b',
        versionBorder: '#334155',
        versionText: '#cbd5e1',
      },
      materialsSection: {
        containerBg: '#0f172a',
        containerBorder: '#334155',
        headerText: '#f1f5f9',
        itemBg: '#1e293b',
        itemBorder: '#334155',
        itemHoverBg: '#334155',
        icons: {
          pdf: '#f87171',
          zip: '#facc15',
          xls: '#4ade80',
          docx: '#60a5fa',
          ppt: '#fb923c',
          yaml: '#c084fc',
          json: '#94a3b8',
          default: '#60a5fa',
        },
        text: '#f1f5f9',
        badgeBg: '#1e293b',
        badgeText: '#cbd5e1',
      },
      scrollableContent: {
        thumbColor: '#475569',
        thumbHoverColor: '#64748b',
        trackColor: '#1e293b',
      },
    },
    
    // Feedback card (blue themed)
    feedbackCard: {
      form: {
        fieldBg: '#1e293b',
        fieldBorder: '#334155',
        fieldText: '#f1f5f9',
        labelText: '#cbd5e1',
      },
      starRating: {
        emptyColor: '#475569',
        filledColor: '#fbbf24',
        hoverColor: '#f59e0b',
        size: '1.5rem',
      },
      submitButton: {
        bg: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
        bgHover: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
        text: '#f1f5f9',
        disabledBg: '#334155',
        disabledText: '#64748b',
      },
    },
    
    // Detailed card (blue themed)
    detailedCard: {
      accessSection: {
        bg: '#1e293b',
        border: '#334155',
        iconBg: '#3b82f6',
        iconColor: '#f1f5f9',
        headingText: '#f1f5f9',
        bodyText: '#cbd5e1',
        buttonBg: '#3b82f6',
        buttonText: '#f1f5f9',
        buttonHoverBg: '#2563eb',
      },
    },
    
    // Expanded card (blue themed)
    expandedCard: {
      tabs: {
        bg: '#0f172a',
        borderBottom: '#334155',
        active: {
          text: '#60a5fa',
          indicator: '#3b82f6',
        },
        inactive: {
          text: '#94a3b8',
          hover: '#cbd5e1',
        },
      },
      contactTab: {
        sectionHeaderText: '#f1f5f9',
        sectionDivider: '#334155',
        iconColor: '#94a3b8',
      },
      codeTab: {
        bg: '#0f172a',
        text: '#f1f5f9',
        lineNumbers: '#64748b',
        highlightColor: {
          keyword: '#93c5fd',
          string: '#86efac',
          comment: '#64748b',
          function: '#c4b5fd',
          operator: '#f1f5f9',
        },
        copyButtonBg: 'rgba(255, 255, 255, 0.05)',
        copyButtonHoverBg: 'rgba(255, 255, 255, 0.1)',
        copyButtonText: '#f1f5f9',
      },
    },
  },
};

// Quality Assurance theme (purple/fuchsia) - Dark mode
const qaDark = {
  ...darkBase,
  name: 'qualityAssurance',
  colors: {
    ...darkBase.colors,
    primary: {
      main: '#a855f7',
      light: '#c084fc',
      dark: '#9333ea',
      contrast: '#f1f5f9',
    },
    secondary: {
      main: '#d946ef',
      light: '#e879f9',
      dark: '#c026d3',
      contrast: '#f1f5f9',
    },
    accent: '#7e22ce',
    
    gradients: {
      banner: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
      header: 'linear-gradient(90deg, #581c87 0%, #86198f 100%)',
      button: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
      buttonHover: 'linear-gradient(90deg, #9333ea 0%, #c026d3 100%)',
    },
  },
  
  components: {
    // Toolkit header (purple themed)
    header: {
      background: '#0f172a',
      borderColor: '#334155',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      themeButton: {
        selected: {
          bg: '#581c87',
          text: '#c084fc',
          border: '#6b21a8',
        },
        normal: {
          bg: 'transparent',
          text: '#cbd5e1',
          border: 'transparent',
        },
        hover: {
          bg: '#1e293b',
          text: '#c084fc',
          border: '#581c87',
        },
      },
      feedbackButton: {
        bg: '#1e293b',
        bgHover: '#581c87',
        border: '#334155',
        borderHover: '#6b21a8',
        text: '#cbd5e1',
        textHover: '#c084fc',
        icon: '#cbd5e1',
        iconHover: '#c084fc',
      },
      profileMenu: {
        bg: '#0f172a',
        border: '#334155',
        divider: '#1e293b',
        text: '#cbd5e1',
        hoverBg: '#1e293b',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      },
    },
    
    // Filter and search (purple themed)
    filter: {
      background: '#0f172a',
      border: '#334155',
      inputBg: '#1e293b',
      inputText: '#f1f5f9',
      inputPlaceholder: '#64748b',
      iconColor: '#94a3b8',
      button: {
        bg: '#1e293b',
        bgHover: '#581c87',
        border: '#334155',
        borderHover: '#6b21a8',
        text: '#cbd5e1',
        textHover: '#c084fc',
      },
      dropdown: {
        bg: '#0f172a',
        border: '#334155',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        itemHover: '#1e293b',
        text: '#cbd5e1',
      },
    },
    
    // FilterBar component
    filterBar: {
      background: '#0f172a',
      searchBackground: '#1e293b',
      panelBackground: '#0f172a',
      buttonBackground: '#1e293b',
      activeButtonBackground: '#064e3b',
      dropdownBackground: '#0f172a',
      dropdownButtonBackground: '#1e293b',
      dropdownHoverBackground: '#1e293b',
    },
    
    // Base card (purple themed)
    baseCard: {
      background: '#0f172a',
      border: '#334155',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
      themeLabel: {
        bg: '#581c87',
        text: '#c084fc',
      },
      categoryLabel: {
        bg: '#1e293b',
        text: '#cbd5e1',
      },
      tags: {
        bg: '#581c87',
        text: '#c084fc',
        border: '#6b21a8',
      },
    },
    
    // Shared card components (purple themed)
    cardComponents: {
      gradientBanner: {
        height: '0.25rem',
        gradient: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
      },
      header: {
        bg: 'linear-gradient(90deg, #581c87 0%, #86198f 100%)',
        text: '#f1f5f9',
        closeButtonBg: 'transparent',
        closeButtonBgHover: '#1e293b',
        closeButtonColor: '#94a3b8',
        closeButtonColorHover: '#cbd5e1',
      },
      footer: {
        bg: '#0f172a',
        border: '#334155',
        text: '#94a3b8',
        versionBg: '#1e293b',
        versionBorder: '#334155',
        versionText: '#cbd5e1',
      },
      materialsSection: {
        containerBg: '#0f172a',
        containerBorder: '#334155',
        headerText: '#f1f5f9',
        itemBg: '#1e293b',
        itemBorder: '#334155',
        itemHoverBg: '#334155',
        icons: {
          pdf: '#f87171',
          zip: '#facc15',
          xls: '#4ade80',
          docx: '#60a5fa',
          ppt: '#fb923c',
          yaml: '#c084fc',
          json: '#94a3b8',
          default: '#60a5fa',
        },
        text: '#f1f5f9',
        badgeBg: '#1e293b',
        badgeText: '#cbd5e1',
      },
      scrollableContent: {
        thumbColor: '#475569',
        thumbHoverColor: '#64748b',
        trackColor: '#1e293b',
      },
    },
    
    // Feedback card (purple themed)
    feedbackCard: {
      form: {
        fieldBg: '#1e293b',
        fieldBorder: '#334155',
        fieldText: '#f1f5f9',
        labelText: '#cbd5e1',
      },
      starRating: {
        emptyColor: '#475569',
        filledColor: '#fbbf24',
        hoverColor: '#f59e0b',
        size: '1.5rem',
      },
      submitButton: {
        bg: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
        bgHover: 'linear-gradient(90deg, #9333ea 0%, #c026d3 100%)',
        text: '#f1f5f9',
        disabledBg: '#334155',
        disabledText: '#64748b',
      },
    },
    
    // Detailed card (purple themed)
    detailedCard: {
      accessSection: {
        bg: '#1e293b',
        border: '#334155',
        iconBg: '#a855f7',
        iconColor: '#f1f5f9',
        headingText: '#f1f5f9',
        bodyText: '#cbd5e1',
        buttonBg: '#a855f7',
        buttonText: '#f1f5f9',
        buttonHoverBg: '#9333ea',
      },
    },
    
    // Expanded card (purple themed)
    expandedCard: {
      tabs: {
        bg: '#0f172a',
        borderBottom: '#334155',
        active: {
          text: '#c084fc',
          indicator: '#a855f7',
        },
        inactive: {
          text: '#94a3b8',
          hover: '#cbd5e1',
        },
      },
      contactTab: {
        sectionHeaderText: '#f1f5f9',
        sectionDivider: '#334155',
        iconColor: '#94a3b8',
      },
      codeTab: {
        bg: '#0f172a',
        text: '#f1f5f9',
        lineNumbers: '#64748b',
        highlightColor: {
          keyword: '#93c5fd',
          string: '#86efac',
          comment: '#64748b',
          function: '#c4b5fd',
          operator: '#f1f5f9',
        },
        copyButtonBg: 'rgba(255, 255, 255, 0.05)',
        copyButtonHoverBg: 'rgba(255, 255, 255, 0.1)',
        copyButtonText: '#f1f5f9',
      },
    },
  },
};

// Export dark themes
export const darkThemes = {
  sales: salesDark,
  delivery: deliveryDark,
  qualityAssurance: qaDark,
}; 