/**
 * Theme utilities for consistent styling across components
 */

import { shared, lightThemes, darkThemes } from './themes';
import get from 'lodash.get';

export type ThemeType = 'Sales' | 'Delivery' | 'Quality Assurance';

/**
 * Theme colors interface for backward compatibility
 */
export interface ThemeColors {
  // Main colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Background gradients
  banner: string;
  header: string;
  contentBox: string;
  materialBoxBackground: string;
  
  // Text colors
  titleText: string;
  contentText: string;
  cardText: string;
  materialBoxText: string;
  boxTitle: string;
  tabText: string;
  text: string;
  
  // Accent elements
  button: string;
  buttonHover: string;
  tabButton: string;
  themeLabel: string;
  tagBackground: string;
  tagText: string;
  tagBorder: string;
  materialBoxBorder: string;
  bulletBackground: string;
  numberBackground: string;
  numberText: string;
  
  // Borders and utility
  border: string;
  light: string;
  medium: string;
  success: string;
  lightBg: string;
}

/**
 * Get theme object for the specified mode and theme
 * @param mode Light or dark mode
 * @param themeName Theme name (sales, delivery, qualityAssurance)
 * @param path Optional path to get a specific value from the theme
 * @returns The theme object or a specific value if path is provided
 */
export const getTheme = (mode: 'light' | 'dark', themeName: string, path?: string) => {
  const themes = mode === 'light' ? lightThemes : darkThemes;
  // Normalize theme name to match object keys
  const normalizedThemeName = themeName.toLowerCase().replace(/\s+/g, '');
  
  // Get the full theme object
  const themeObj = {
    ...shared,
    ...(themes[normalizedThemeName as keyof typeof themes] || themes.sales)
  };
  
  // Return specific path or the whole theme object
  return path ? get(themeObj, path) : themeObj;
};

/**
 * Legacy function for backward compatibility
 * Get the theme colors based on theme type and mode
 */
export const getThemeColors = (theme: string, isDarkMode: boolean = false): ThemeColors => {
  // For backward compatibility, convert the new theme format to the old ThemeColors interface
  const normalizedThemeName = theme.toLowerCase().replace(/\s+/g, '');
  const mode = isDarkMode ? 'dark' : 'light';
  const themeObj = getTheme(mode, normalizedThemeName);
  
  // Map new theme structure to the old ThemeColors interface
  if (theme === 'Sales') {
    return {
      // Main colors
      primary: 'emerald-500',
      secondary: 'teal-400',
      accent: 'emerald-600',
      
      // Background gradients
      banner: 'bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400',
      header: 'bg-gradient-to-r from-emerald-50 to-teal-50',
      contentBox: 'bg-white',
      materialBoxBackground: 'bg-white',
      
      // Text colors
      titleText: 'text-gray-800',
      contentText: 'text-gray-700',
      cardText: 'text-gray-600',
      materialBoxText: 'text-gray-700',
      boxTitle: 'text-emerald-800',
      tabText: 'text-gray-500',
      text: 'text-emerald-800',
      
      // Accent elements
      button: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      buttonHover: 'from-emerald-600 to-teal-600',
      tabButton: 'bg-emerald-500 hover:bg-emerald-600',
      themeLabel: 'bg-emerald-100 text-emerald-700',
      tagBackground: 'bg-emerald-50',
      tagText: 'text-emerald-700',
      tagBorder: 'border-emerald-200',
      materialBoxBorder: 'border-gray-100',
      bulletBackground: 'bg-emerald-100',
      numberBackground: 'bg-emerald-500',
      numberText: 'text-white',
      
      // Borders and utility
      border: 'border-gray-200',
      light: 'bg-emerald-50',
      medium: 'bg-emerald-100',
      success: 'bg-gradient-to-r from-emerald-50 to-teal-50',
      lightBg: 'bg-emerald-50/40'
    };
  } else if (theme === 'Delivery') {
    return {
      // Main colors
      primary: 'blue-500',
      secondary: 'indigo-400',
      accent: 'blue-600',
      
      // Background gradients
      banner: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400',
      header: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      contentBox: 'bg-white',
      materialBoxBackground: 'bg-white',
      
      // Text colors
      titleText: 'text-gray-800',
      contentText: 'text-gray-700',
      cardText: 'text-gray-600',
      materialBoxText: 'text-gray-700',
      boxTitle: 'text-blue-800',
      tabText: 'text-gray-500',
      text: 'text-blue-800',
      
      // Accent elements
      button: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      buttonHover: 'from-blue-600 to-indigo-600',
      tabButton: 'bg-blue-500 hover:bg-blue-600',
      themeLabel: 'bg-blue-100 text-blue-700',
      tagBackground: 'bg-blue-50',
      tagText: 'text-blue-700',
      tagBorder: 'border-blue-200',
      materialBoxBorder: 'border-gray-100',
      bulletBackground: 'bg-blue-100',
      numberBackground: 'bg-blue-500',
      numberText: 'text-white',
      
      // Borders and utility
      border: 'border-gray-200',
      light: 'bg-blue-50',
      medium: 'bg-blue-100',
      success: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      lightBg: 'bg-blue-50/40'
    };
  } else { // Quality Assurance
    return {
      // Main colors
      primary: 'purple-500',
      secondary: 'fuchsia-400',
      accent: 'purple-600',
      
      // Background gradients
      banner: 'bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400',
      header: 'bg-gradient-to-r from-purple-50 to-fuchsia-50',
      contentBox: 'bg-white',
      materialBoxBackground: 'bg-white',
      
      // Text colors
      titleText: 'text-gray-800',
      contentText: 'text-gray-700',
      cardText: 'text-gray-600',
      materialBoxText: 'text-gray-700',
      boxTitle: 'text-purple-800',
      tabText: 'text-gray-500',
      text: 'text-purple-800',
      
      // Accent elements
      button: 'bg-gradient-to-r from-purple-500 to-fuchsia-500',
      buttonHover: 'from-purple-600 to-fuchsia-600',
      tabButton: 'bg-purple-500 hover:bg-purple-600',
      themeLabel: 'bg-purple-100 text-purple-700',
      tagBackground: 'bg-purple-50',
      tagText: 'text-purple-700',
      tagBorder: 'border-purple-200',
      materialBoxBorder: 'border-gray-100',
      bulletBackground: 'bg-purple-100',
      numberBackground: 'bg-purple-500',
      numberText: 'text-white',
      
      // Borders and utility
      border: 'border-gray-200',
      light: 'bg-purple-50',
      medium: 'bg-purple-100',
      success: 'bg-gradient-to-r from-purple-50 to-fuchsia-50',
      lightBg: 'bg-purple-50/40'
    };
  }
};

/**
 * Apply CSS variables for the theme to the document root
 * @param mode Light or dark mode
 * @param themeName Theme name (sales, delivery, qualityAssurance)
 */
export const applyCSSVariables = (mode: 'light' | 'dark', themeName: string) => {
  const theme = getTheme(mode, themeName);
  
  // Helper function to recursively set CSS variables
  const setCSSVars = (obj: any, prefix = '') => {
    for (const key in obj) {
      const value = obj[key];
      
      if (typeof value === 'object' && value !== null) {
        // Recursively process nested objects
        setCSSVars(value, `${prefix}${key}-`);
      } else if (typeof value === 'string' || typeof value === 'number') {
        // Set CSS variable for primitive values
        document.documentElement.style.setProperty(`--${prefix}${key}`, value.toString());
      }
    }
  };
  
  // Apply all theme variables
  setCSSVars(theme);
  
  // Also set a theme and mode identifier CSS variables
  document.documentElement.style.setProperty('--theme', themeName);
  document.documentElement.style.setProperty('--mode', mode);
}; 