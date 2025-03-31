/**
 * Theme utilities for consistent styling across components
 */

/**
 * Get the theme colors based on theme type and mode
 */
export const getThemeColors = (theme: 'Sales' | 'Delivery' | 'Quality Assurance', isDarkMode = false) => {
  // Common styles that don't change between light/dark modes
  const commonStyles = {
    // Shared structural elements
    banner: theme === 'Sales'
      ? 'bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400'
      : theme === 'Delivery'
        ? 'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400'
        : 'bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400'
  };

  // Light mode theme colors
  if (!isDarkMode) {
    switch (theme) {
      case 'Sales':
        return {
          ...commonStyles,
          header: 'bg-gradient-to-r from-emerald-100/100 to-teal-200/100 backdrop-blur-sm',
          contentBox: 'bg-gradient-to-r from-emerald-100/90 to-teal-100/90 backdrop-blur-sm',
          materialBoxBackground: 'bg-gradient-to-r from-emerald-50/90 to-teal-50/90 backdrop-blur-sm',
          materialBoxBorder: 'border-emerald-200',
          materialBoxText: 'text-emerald-800',
          bulletBackground: 'bg-emerald-200',
          boxSubHeader: 'text-emerald-800',
          border: 'border-emerald-800',
          tabButton: 'bg-emerald-600 hover:bg-emerald-700',
          success: 'bg-emerald-50',
          tabText: 'text-emerald-900',
          titleText: 'text-emerald-900',
          themeLabel: 'bg-emerald-200 text-emerald-800 border-emerald-200',
          boxTitle: 'text-emerald-900',
          contentText: 'text-emerald-800',
          tagBackground: 'bg-slate-50',
          tagText: 'text-emerald-900',
          tagBorder: 'border-emerald-400/60',
          numberBackground: 'bg-emerald-600',
          numberText: 'text-white',
          light: 'bg-emerald-100',
          lighter: 'bg-emerald-50',
          medium: 'bg-emerald-200',
          text: 'text-emerald-800',
          button: 'bg-emerald-600 hover:bg-emerald-700',
          cardText: 'text-emerald-800',
        };
      case 'Delivery':
        return {
          ...commonStyles,
          header: 'bg-gradient-to-r from-blue-100/70 to-indigo-200/70 backdrop-blur-sm',
          contentBox: 'bg-gradient-to-r from-blue-100/90 to-indigo-100/90 backdrop-blur-sm',
          materialBoxBackground: 'bg-gradient-to-r from-blue-50/90 to-indigo-50/90 backdrop-blur-sm',
          materialBoxBorder: 'border-blue-200',
          materialBoxText: 'text-blue-800',
          bulletBackground: 'bg-blue-200',
          boxSubHeader: 'text-blue-800',
          border: 'border-blue-200',
          tabButton: 'bg-blue-600 hover:bg-blue-700',
          success: 'bg-blue-50',
          tabText: 'text-gray-900',
          titleText: 'text-blue-900',
          themeLabel: 'bg-blue-200 text-blue-800 border-blue-200',
          boxTitle: 'text-blue-900',
          contentText: 'text-blue-800',
          tagBackground: 'bg-blue-50',
          tagText: 'text-slate-700',
          tagBorder: 'border-blue-100',
          numberBackground: 'bg-blue-600',
          numberText: 'text-white',
          light: 'bg-blue-100',
          lighter: 'bg-blue-50',
          medium: 'bg-blue-200',
          text: 'text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700',
          cardText: 'text-blue-800',
        };
      default: // Quality Assurance
        return {
          ...commonStyles,
          header: 'bg-gradient-to-r from-purple-100/70 to-fuchsia-200/70 backdrop-blur-sm',
          contentBox: 'bg-gradient-to-r from-purple-100/90 to-fuchsia-100/90 backdrop-blur-sm',
          materialBoxBackground: 'bg-gradient-to-r from-purple-50/90 to-fuchsia-50/90 backdrop-blur-sm',
          materialBoxBorder: 'border-purple-200',
          materialBoxText: 'text-purple-800',
          bulletBackground: 'bg-purple-200',
          boxSubHeader: 'text-purple-800',
          border: 'border-purple-200',
          tabButton: 'bg-purple-600 hover:bg-purple-700',
          success: 'bg-purple-50',
          tabText: 'text-gray-900',
          titleText: 'text-purple-900',
          themeLabel: 'bg-purple-200 text-purple-800 border-purple-200',
          boxTitle: 'text-purple-900',
          contentText: 'text-purple-800',
          tagBackground: 'bg-purple-50',
          tagText: 'text-purple-700',
          tagBorder: 'border-purple-100',
          numberBackground: 'bg-purple-600',
          numberText: 'text-white',
          light: 'bg-purple-100',
          lighter: 'bg-purple-50',
          medium: 'bg-purple-200',
          text: 'text-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700',
          cardText: 'text-purple-800',
        };
    }
  } 
  // Dark mode theme colors
  else {
    switch (theme) {
      case 'Sales':
        return {
          ...commonStyles,
          header: 'bg-gradient-to-r from-emerald-900/100 to-teal-800/100 backdrop-blur-sm',
          contentBox: 'bg-gradient-to-r from-emerald-800/40 to-teal-700/40 backdrop-blur-sm',
          materialBoxBackground: 'bg-gradient-to-r from-emerald-900/30 to-teal-800/30 backdrop-blur-sm',
          materialBoxBorder: 'border-emerald-700',
          materialBoxText: 'text-emerald-200',
          bulletBackground: 'bg-emerald-700',
          boxSubHeader: 'text-emerald-200',
          border: 'border-emerald-700',
          tabButton: 'bg-emerald-500 hover:bg-emerald-400',
          success: 'bg-emerald-900',
          tabText: 'text-gray-100',
          titleText: 'text-emerald-100',
          themeLabel: 'bg-emerald-700 text-emerald-200 border-emerald-700',
          boxTitle: 'text-emerald-100',
          contentText: 'text-emerald-200',
          tagBackground: 'bg-emerald-900/50',
          tagText: 'text-emerald-200',
          tagBorder: 'border-emerald-800',
          numberBackground: 'bg-emerald-500',
          numberText: 'text-white',
          light: 'bg-emerald-800',
          lighter: 'bg-emerald-700',
          medium: 'bg-emerald-600',
          text: 'text-emerald-200',
          button: 'bg-emerald-500 hover:bg-emerald-400',
          cardText: 'text-emerald-200',
        };
      case 'Delivery':
        return {
          ...commonStyles,
          header: 'bg-gradient-to-r from-blue-900/70 to-indigo-800/70 backdrop-blur-sm',
          contentBox: 'bg-gradient-to-r from-blue-800/40 to-indigo-700/40 backdrop-blur-sm',
          materialBoxBackground: 'bg-gradient-to-r from-blue-900/30 to-indigo-800/30 backdrop-blur-sm',
          materialBoxBorder: 'border-blue-700',
          materialBoxText: 'text-blue-200',
          bulletBackground: 'bg-blue-700',
          boxSubHeader: 'text-blue-200',
          border: 'border-blue-700',
          tabButton: 'bg-blue-500 hover:bg-blue-400',
          success: 'bg-blue-900',
          tabText: 'text-gray-100',
          titleText: 'text-blue-100',
          themeLabel: 'bg-blue-700 text-blue-200 border-blue-700',
          boxTitle: 'text-blue-100',
          contentText: 'text-blue-200',
          tagBackground: 'bg-blue-900/50',
          tagText: 'text-blue-200',
          tagBorder: 'border-blue-800',
          numberBackground: 'bg-blue-500',
          numberText: 'text-white',
          light: 'bg-blue-800',
          lighter: 'bg-blue-700',
          medium: 'bg-blue-600',
          text: 'text-blue-200',
          button: 'bg-blue-500 hover:bg-blue-400',
          cardText: 'text-blue-200',
        };
      default: // Quality Assurance
        return {
          ...commonStyles,
          header: 'bg-gradient-to-r from-purple-900/70 to-fuchsia-800/70 backdrop-blur-sm',
          contentBox: 'bg-gradient-to-r from-purple-800/40 to-fuchsia-700/40 backdrop-blur-sm',
          materialBoxBackground: 'bg-gradient-to-r from-purple-900/30 to-fuchsia-800/30 backdrop-blur-sm',
          materialBoxBorder: 'border-purple-700',
          materialBoxText: 'text-purple-200',
          bulletBackground: 'bg-purple-700',
          boxSubHeader: 'text-purple-200',
          border: 'border-purple-700',
          tabButton: 'bg-purple-500 hover:bg-purple-400',
          success: 'bg-purple-900',
          tabText: 'text-gray-100',
          titleText: 'text-purple-100',
          themeLabel: 'bg-purple-700 text-purple-200 border-purple-700',
          boxTitle: 'text-purple-100',
          contentText: 'text-purple-200',
          tagBackground: 'bg-purple-900/50',
          tagText: 'text-purple-200',
          tagBorder: 'border-purple-800',
          numberBackground: 'bg-purple-500',
          numberText: 'text-white',
          light: 'bg-purple-800',
          lighter: 'bg-purple-700',
          medium: 'bg-purple-600',
          text: 'text-purple-200',
          button: 'bg-purple-500 hover:bg-purple-400',
          cardText: 'text-purple-200',
        };
    }
  }
};

// Export theme-related constants and types
export type ThemeType = 'Sales' | 'Delivery' | 'Quality Assurance';
export type ThemeColors = {
  banner: string;
  header: string;
  contentBox: string;
  materialBoxBackground: string;
  materialBoxBorder: string;
  materialBoxText: string;
  bulletBackground: string;
  boxSubHeader: string;
  border: string;
  tabButton: string;
  success: string;
  tabText: string;
  titleText: string;
  themeLabel: string;
  boxTitle: string;
  contentText: string;
  tagBackground: string;
  tagText: string;
  tagBorder: string;
  numberBackground: string;
  numberText: string;
  // Legacy color properties
  medium: string;
  text: string;
  button: string;
  cardText: string;
}; 