/**
 * Light mode theme values with variations for Sales, Delivery, and Quality Assurance
 */

// Base light theme
const lightBase = {
  // Base colors
  colors: {
    background: '#ffffff',
    surface: '#f9fafb',
    surfaceAlt: '#f3f4f6',
    border: '#e5e7eb',
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      tertiary: '#6b7280',
      inverted: '#ffffff',
    },
    // Brand colors that stay consistent regardless of theme
    brand: {
      primary: '#10b981', // Emerald for Converge logo
      secondary: '#14b8a6', // Teal for accents
      badge: '#10b981',
      avatar: '#5eead4'
    },
    // Theme-specific colors that remain consistent regardless of active theme
    themeSpecific: {
      sales: {
        primary: '#10b981',       // Emerald
        secondary: '#14b8a6',     // Teal
        gradient: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
        light: '#5eead4',
        dark: '#047857',
        label: {
          bg: '#ecfdf5',
          text: '#059669',
        }
      },
      delivery: {
        primary: '#3b82f6',       // Blue
        secondary: '#60a5fa',     // Light blue
        gradient: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
        light: '#93c5fd',
        dark: '#1d4ed8',
        label: {
          bg: '#eff6ff',
          text: '#2563eb',
        }
      },
      qa: {
        primary: '#a855f7',       // Purple
        secondary: '#c084fc',     // Light purple
        gradient: 'linear-gradient(90deg, #a855f7 0%, #c084fc 100%)',
        light: '#d8b4fe',
        dark: '#7e22ce',
        label: {
          bg: '#faf5ff',
          text: '#9333ea',
        }
      }
    }
  },
};

// Sales theme (emerald/teal)
const salesLight = {
  ...lightBase,
  name: 'sales',
  colors: {
    ...lightBase.colors,
    primary: {
      main: '#10b981',
      light: '#5eead4',
      dark: '#047857',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#14b8a6',
      light: '#99f6e4',
      dark: '#0f766e',
      contrast: '#ffffff',
    },
    accent: '#059669',
    
    gradients: {
      banner: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
      header: 'linear-gradient(90deg, #ecfdf5 0%, #ccfbf1 100%)',
      button: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
      buttonHover: 'linear-gradient(90deg, #059669 0%, #0d9488 100%)',
    },
  },
  
  components: {
    // Toolkit header
    header: {
      background: '#ffffff',
      borderColor: '#e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      themeButton: {
        selected: {
          bg: '#ecfdf5',
          text: '#059669',
          border: '#a7f3d0',
        },
        normal: {
          bg: 'transparent',
          text: '#4b5563',
          border: 'transparent',
        },
        hover: {
          bg: '#f9fafb',
          text: '#059669',
          border: '#d1fae5',
        },
      },
      feedbackButton: {
        bg: '#ffffff',
        bgHover: '#ecfdf5',
        border: '#e5e7eb',
        borderHover: '#a7f3d0',
        text: '#4b5563',
        textHover: '#059669',
        icon: '#4b5563',
        iconHover: '#059669',
      },
      profileMenu: {
        bg: '#ffffff',
        border: '#e5e7eb',
        divider: '#f3f4f6',
        text: '#4b5563',
        hoverBg: '#f9fafb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    
    // Filter and search
    filter: {
      background: '#ffffff',
      border: '#e5e7eb',
      inputBg: '#f9fafb',
      inputText: '#111827',
      inputPlaceholder: '#9ca3af',
      iconColor: '#6b7280',
      button: {
        bg: '#ffffff',
        bgHover: '#ecfdf5',
        border: '#e5e7eb',
        borderHover: '#a7f3d0',
        text: '#4b5563',
        textHover: '#059669',
      },
      dropdown: {
        bg: '#ffffff',
        border: '#e5e7eb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        itemHover: '#f9fafb',
        text: '#4b5563',
      },
    },
    
    // FilterBar component
    filterBar: {
      background: '#ffffff',
      searchBackground: '#ffffff',
      panelBackground: '#f9fafb',
      buttonBackground: '#ffffff',
      activeButtonBackground: '#f0fdf4',
      dropdownBackground: '#ffffff',
      dropdownButtonBackground: '#ffffff',
      dropdownHoverBackground: '#f9fafb',
    },
    
    // Base card
    baseCard: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      themeLabel: {
        bg: '#ecfdf5',
        text: '#059669',
      },
      categoryLabel: {
        bg: '#f3f4f6',
        text: '#4b5563',
      },
      tags: {
        bg: '#ecfdf5',
        text: '#059669',
        border: '#d1fae5',
      },
    },
    
    // Shared card components
    cardComponents: {
      gradientBanner: {
        height: '0.25rem',
        gradient: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
      },
      header: {
        bg: 'linear-gradient(90deg, #ecfdf5 0%, #ccfbf1 100%)',
        text: '#111827',
        closeButtonBg: 'transparent',
        closeButtonBgHover: '#f3f4f6',
        closeButtonColor: '#6b7280',
        closeButtonColorHover: '#4b5563',
      },
      footer: {
        bg: '#f9fafb',
        border: '#e5e7eb',
        text: '#6b7280',
        versionBg: '#ffffff',
        versionBorder: '#e5e7eb',
        versionText: '#4b5563',
      },
      materialsSection: {
        containerBg: '#ffffff',
        containerBorder: '#e5e7eb',
        headerText: '#111827',
        itemBg: '#ffffff',
        itemBorder: '#e5e7eb',
        itemHoverBg: '#f9fafb',
        icons: {
          pdf: '#ef4444',
          zip: '#eab308',
          xls: '#22c55e',
          docx: '#3b82f6',
          ppt: '#f97316',
          yaml: '#a855f7',
          json: '#6b7280',
          default: '#3b82f6',
        },
        text: '#111827',
        badgeBg: '#f3f4f6',
        badgeText: '#4b5563',
      },
      scrollableContent: {
        thumbColor: '#d1d5db',
        thumbHoverColor: '#9ca3af',
        trackColor: '#f3f4f6',
      },
    },
    
    // Feedback card
    feedbackCard: {
      form: {
        fieldBg: '#f9fafb',
        fieldBorder: '#e5e7eb',
        fieldText: '#111827',
        labelText: '#4b5563',
      },
      starRating: {
        emptyColor: '#d1d5db',
        filledColor: '#fbbf24',
        hoverColor: '#f59e0b',
        size: '1.5rem',
      },
      submitButton: {
        bg: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
        bgHover: 'linear-gradient(90deg, #059669 0%, #0d9488 100%)',
        text: '#ffffff',
        disabledBg: '#e5e7eb',
        disabledText: '#9ca3af',
      },
    },
    
    // Detailed card
    detailedCard: {
      accessSection: {
        bg: '#f9fafb',
        border: '#e5e7eb',
        iconBg: '#10b981',
        iconColor: '#ffffff',
        headingText: '#111827',
        bodyText: '#4b5563',
        buttonBg: '#10b981',
        buttonText: '#ffffff',
        buttonHoverBg: '#059669',
      },
    },
    
    // Expanded card
    expandedCard: {
      tabs: {
        bg: '#ffffff',
        borderBottom: '#e5e7eb',
        active: {
          text: '#10b981',
          indicator: '#10b981',
        },
        inactive: {
          text: '#6b7280',
          hover: '#4b5563',
        },
      },
      contactTab: {
        sectionHeaderText: '#111827',
        sectionDivider: '#e5e7eb',
        iconColor: '#6b7280',
      },
      codeTab: {
        bg: '#1e293b',
        text: '#e2e8f0',
        lineNumbers: '#64748b',
        highlightColor: {
          keyword: '#93c5fd',
          string: '#86efac',
          comment: '#64748b',
          function: '#c4b5fd',
          operator: '#e2e8f0',
        },
        copyButtonBg: 'rgba(255, 255, 255, 0.1)',
        copyButtonHoverBg: 'rgba(255, 255, 255, 0.2)',
        copyButtonText: '#e2e8f0',
      },
    },
  },
};

// Delivery theme (blue/indigo)
const deliveryLight = {
  ...lightBase,
  name: 'delivery',
  colors: {
    ...lightBase.colors,
    primary: {
      main: '#3b82f6',
      light: '#93c5fd',
      dark: '#1d4ed8',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#6366f1',
      light: '#a5b4fc',
      dark: '#4338ca',
      contrast: '#ffffff',
    },
    accent: '#2563eb',
    
    gradients: {
      banner: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      header: 'linear-gradient(90deg, #eff6ff 0%, #eef2ff 100%)',
      button: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      buttonHover: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
    },
  },
  
  components: {
    // Toolkit header
    header: {
      background: '#ffffff',
      borderColor: '#e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      themeButton: {
        selected: {
          bg: '#eff6ff',
          text: '#2563eb',
          border: '#bfdbfe',
        },
        normal: {
          bg: 'transparent',
          text: '#4b5563',
          border: 'transparent',
        },
        hover: {
          bg: '#f9fafb',
          text: '#2563eb',
          border: '#dbeafe',
        },
      },
      feedbackButton: {
        bg: '#ffffff',
        bgHover: '#eff6ff',
        border: '#e5e7eb',
        borderHover: '#bfdbfe',
        text: '#4b5563',
        textHover: '#2563eb',
        icon: '#4b5563',
        iconHover: '#2563eb',
      },
      profileMenu: {
        bg: '#ffffff',
        border: '#e5e7eb',
        divider: '#f3f4f6',
        text: '#4b5563',
        hoverBg: '#f9fafb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    
    // Filter and search (similar structure as sales but with blue theme)
    filter: {
      background: '#ffffff',
      border: '#e5e7eb',
      inputBg: '#f9fafb',
      inputText: '#111827',
      inputPlaceholder: '#9ca3af',
      iconColor: '#6b7280',
      button: {
        bg: '#ffffff',
        bgHover: '#eff6ff',
        border: '#e5e7eb',
        borderHover: '#bfdbfe',
        text: '#4b5563',
        textHover: '#2563eb',
      },
      dropdown: {
        bg: '#ffffff',
        border: '#e5e7eb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        itemHover: '#f9fafb',
        text: '#4b5563',
      },
    },
    
    // FilterBar component
    filterBar: {
      background: '#ffffff',
      searchBackground: '#ffffff',
      panelBackground: '#f9fafb',
      buttonBackground: '#ffffff',
      activeButtonBackground: '#f0fdf4',
      dropdownBackground: '#ffffff',
      dropdownButtonBackground: '#ffffff',
      dropdownHoverBackground: '#f9fafb',
    },
    
    // Base card (blue themed)
    baseCard: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      themeLabel: {
        bg: '#eff6ff',
        text: '#2563eb',
      },
      categoryLabel: {
        bg: '#f3f4f6',
        text: '#4b5563',
      },
      tags: {
        bg: '#eff6ff',
        text: '#2563eb',
        border: '#dbeafe',
      },
    },
    
    // Shared card components (blue themed)
    cardComponents: {
      gradientBanner: {
        height: '0.25rem',
        gradient: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      },
      header: {
        bg: 'linear-gradient(90deg, #eff6ff 0%, #eef2ff 100%)',
        text: '#111827',
        closeButtonBg: 'transparent',
        closeButtonBgHover: '#f3f4f6',
        closeButtonColor: '#6b7280',
        closeButtonColorHover: '#4b5563',
      },
      footer: {
        bg: '#f9fafb',
        border: '#e5e7eb',
        text: '#6b7280',
        versionBg: '#ffffff',
        versionBorder: '#e5e7eb',
        versionText: '#4b5563',
      },
      materialsSection: {
        containerBg: '#ffffff',
        containerBorder: '#e5e7eb',
        headerText: '#111827',
        itemBg: '#ffffff',
        itemBorder: '#e5e7eb',
        itemHoverBg: '#f9fafb',
        icons: {
          pdf: '#ef4444',
          zip: '#eab308',
          xls: '#22c55e',
          docx: '#3b82f6',
          ppt: '#f97316',
          yaml: '#a855f7',
          json: '#6b7280',
          default: '#3b82f6',
        },
        text: '#111827',
        badgeBg: '#f3f4f6',
        badgeText: '#4b5563',
      },
      scrollableContent: {
        thumbColor: '#d1d5db',
        thumbHoverColor: '#9ca3af',
        trackColor: '#f3f4f6',
      },
    },
    
    // Feedback card (blue themed)
    feedbackCard: {
      form: {
        fieldBg: '#f9fafb',
        fieldBorder: '#e5e7eb',
        fieldText: '#111827',
        labelText: '#4b5563',
      },
      starRating: {
        emptyColor: '#d1d5db',
        filledColor: '#fbbf24',
        hoverColor: '#f59e0b',
        size: '1.5rem',
      },
      submitButton: {
        bg: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
        bgHover: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
        text: '#ffffff',
        disabledBg: '#e5e7eb',
        disabledText: '#9ca3af',
      },
    },
    
    // Detailed card (blue themed)
    detailedCard: {
      accessSection: {
        bg: '#f9fafb',
        border: '#e5e7eb',
        iconBg: '#3b82f6',
        iconColor: '#ffffff',
        headingText: '#111827',
        bodyText: '#4b5563',
        buttonBg: '#3b82f6',
        buttonText: '#ffffff',
        buttonHoverBg: '#2563eb',
      },
    },
    
    // Expanded card (blue themed)
    expandedCard: {
      tabs: {
        bg: '#ffffff',
        borderBottom: '#e5e7eb',
        active: {
          text: '#3b82f6',
          indicator: '#3b82f6',
        },
        inactive: {
          text: '#6b7280',
          hover: '#4b5563',
        },
      },
      contactTab: {
        sectionHeaderText: '#111827',
        sectionDivider: '#e5e7eb',
        iconColor: '#6b7280',
      },
      codeTab: {
        bg: '#1e293b',
        text: '#e2e8f0',
        lineNumbers: '#64748b',
        highlightColor: {
          keyword: '#93c5fd',
          string: '#86efac',
          comment: '#64748b',
          function: '#c4b5fd',
          operator: '#e2e8f0',
        },
        copyButtonBg: 'rgba(255, 255, 255, 0.1)',
        copyButtonHoverBg: 'rgba(255, 255, 255, 0.2)',
        copyButtonText: '#e2e8f0',
      },
    },
  },
};

// Quality Assurance theme (purple/fuchsia)
const qaLight = {
  ...lightBase,
  name: 'qualityAssurance',
  colors: {
    ...lightBase.colors,
    primary: {
      main: '#a855f7',
      light: '#d8b4fe',
      dark: '#7e22ce',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#d946ef',
      light: '#f5d0fe',
      dark: '#a21caf',
      contrast: '#ffffff',
    },
    accent: '#9333ea',
    
    gradients: {
      banner: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
      header: 'linear-gradient(90deg, #faf5ff 0%, #fdf4ff 100%)',
      button: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
      buttonHover: 'linear-gradient(90deg, #9333ea 0%, #c026d3 100%)',
    },
  },
  
  components: {
    // Toolkit header (purple themed)
    header: {
      background: '#ffffff',
      borderColor: '#e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      themeButton: {
        selected: {
          bg: '#faf5ff',
          text: '#9333ea',
          border: '#e9d5ff',
        },
        normal: {
          bg: 'transparent',
          text: '#4b5563',
          border: 'transparent',
        },
        hover: {
          bg: '#f9fafb',
          text: '#9333ea',
          border: '#f3e8ff',
        },
      },
      feedbackButton: {
        bg: '#ffffff',
        bgHover: '#faf5ff',
        border: '#e5e7eb',
        borderHover: '#e9d5ff',
        text: '#4b5563',
        textHover: '#9333ea',
        icon: '#4b5563',
        iconHover: '#9333ea',
      },
      profileMenu: {
        bg: '#ffffff',
        border: '#e5e7eb',
        divider: '#f3f4f6',
        text: '#4b5563',
        hoverBg: '#f9fafb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    
    // Filter and search (purple themed)
    filter: {
      background: '#ffffff',
      border: '#e5e7eb',
      inputBg: '#f9fafb',
      inputText: '#111827',
      inputPlaceholder: '#9ca3af',
      iconColor: '#6b7280',
      button: {
        bg: '#ffffff',
        bgHover: '#faf5ff',
        border: '#e5e7eb',
        borderHover: '#e9d5ff',
        text: '#4b5563',
        textHover: '#9333ea',
      },
      dropdown: {
        bg: '#ffffff',
        border: '#e5e7eb',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        itemHover: '#f9fafb',
        text: '#4b5563',
      },
    },
    
    // FilterBar component
    filterBar: {
      background: '#ffffff',
      searchBackground: '#ffffff',
      panelBackground: '#f9fafb',
      buttonBackground: '#ffffff',
      activeButtonBackground: '#f0fdf4',
      dropdownBackground: '#ffffff',
      dropdownButtonBackground: '#ffffff',
      dropdownHoverBackground: '#f9fafb',
    },
    
    // Base card (purple themed)
    baseCard: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      themeLabel: {
        bg: '#faf5ff',
        text: '#9333ea',
      },
      categoryLabel: {
        bg: '#f3f4f6',
        text: '#4b5563',
      },
      tags: {
        bg: '#faf5ff',
        text: '#9333ea',
        border: '#f3e8ff',
      },
    },
    
    // Shared card components (purple themed)
    cardComponents: {
      gradientBanner: {
        height: '0.25rem',
        gradient: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
      },
      header: {
        bg: 'linear-gradient(90deg, #faf5ff 0%, #fdf4ff 100%)',
        text: '#111827',
        closeButtonBg: 'transparent',
        closeButtonBgHover: '#f3f4f6',
        closeButtonColor: '#6b7280',
        closeButtonColorHover: '#4b5563',
      },
      footer: {
        bg: '#f9fafb',
        border: '#e5e7eb',
        text: '#6b7280',
        versionBg: '#ffffff',
        versionBorder: '#e5e7eb',
        versionText: '#4b5563',
      },
      materialsSection: {
        containerBg: '#ffffff',
        containerBorder: '#e5e7eb',
        headerText: '#111827',
        itemBg: '#ffffff',
        itemBorder: '#e5e7eb',
        itemHoverBg: '#f9fafb',
        icons: {
          pdf: '#ef4444',
          zip: '#eab308',
          xls: '#22c55e',
          docx: '#3b82f6',
          ppt: '#f97316',
          yaml: '#a855f7',
          json: '#6b7280',
          default: '#3b82f6',
        },
        text: '#111827',
        badgeBg: '#f3f4f6',
        badgeText: '#4b5563',
      },
      scrollableContent: {
        thumbColor: '#d1d5db',
        thumbHoverColor: '#9ca3af',
        trackColor: '#f3f4f6',
      },
    },
    
    // Feedback card (purple themed)
    feedbackCard: {
      form: {
        fieldBg: '#f9fafb',
        fieldBorder: '#e5e7eb',
        fieldText: '#111827',
        labelText: '#4b5563',
      },
      starRating: {
        emptyColor: '#d1d5db',
        filledColor: '#fbbf24',
        hoverColor: '#f59e0b',
        size: '1.5rem',
      },
      submitButton: {
        bg: 'linear-gradient(90deg, #a855f7 0%, #d946ef 100%)',
        bgHover: 'linear-gradient(90deg, #9333ea 0%, #c026d3 100%)',
        text: '#ffffff',
        disabledBg: '#e5e7eb',
        disabledText: '#9ca3af',
      },
    },
    
    // Detailed card (purple themed)
    detailedCard: {
      accessSection: {
        bg: '#f9fafb',
        border: '#e5e7eb',
        iconBg: '#a855f7',
        iconColor: '#ffffff',
        headingText: '#111827',
        bodyText: '#4b5563',
        buttonBg: '#a855f7',
        buttonText: '#ffffff',
        buttonHoverBg: '#9333ea',
      },
    },
    
    // Expanded card (purple themed)
    expandedCard: {
      tabs: {
        bg: '#ffffff',
        borderBottom: '#e5e7eb',
        active: {
          text: '#a855f7',
          indicator: '#a855f7',
        },
        inactive: {
          text: '#6b7280',
          hover: '#4b5563',
        },
      },
      contactTab: {
        sectionHeaderText: '#111827',
        sectionDivider: '#e5e7eb',
        iconColor: '#6b7280',
      },
      codeTab: {
        bg: '#1e293b',
        text: '#e2e8f0',
        lineNumbers: '#64748b',
        highlightColor: {
          keyword: '#93c5fd',
          string: '#86efac',
          comment: '#64748b',
          function: '#c4b5fd',
          operator: '#e2e8f0',
        },
        copyButtonBg: 'rgba(255, 255, 255, 0.1)',
        copyButtonHoverBg: 'rgba(255, 255, 255, 0.2)',
        copyButtonText: '#e2e8f0',
      },
    },
  },
};

// Export light themes
export const lightThemes = {
  sales: salesLight,
  delivery: deliveryLight, 
  qualityAssurance: qaLight,
}; 