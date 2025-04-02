import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, getThemeSpecificValue as getSpecificTheme, applyCSSVariables, ThemeType } from '../utils/themeUtils';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  isDarkMode: boolean;
  currentThemeCategory: ThemeType;
  toggleTheme: () => void;
  setThemeCategory: (category: ThemeType) => void;
  getThemeValue: (path: string) => any;
  getThemeSpecificValue: (themeName: ThemeType, path: string) => any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Get initial theme from localStorage or system preference
const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light'; // default theme
};

// Get initial theme category from localStorage or default
const getInitialThemeCategory = (): ThemeType => {
  if (typeof window !== 'undefined') {
    const savedCategory = localStorage.getItem('themeCategory') as ThemeType;
    if (savedCategory && ['Sales', 'Delivery', 'Quality Assurance'].includes(savedCategory)) {
      return savedCategory;
    }
  }
  return 'Sales'; // default category
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [currentThemeCategory, setCurrentThemeCategory] = useState<ThemeType>(getInitialThemeCategory);
  const isDarkMode = theme === 'dark';

  // Apply the theme whenever it changes
  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem('theme', theme);
    localStorage.setItem('themeCategory', currentThemeCategory);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply CSS variables from our theme system
    applyCSSVariables(theme, currentThemeCategory);
  }, [theme, currentThemeCategory]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const setThemeCategory = (category: ThemeType) => {
    setCurrentThemeCategory(category);
  };
  
  // Helper function to get a value from the current theme
  const getThemeValue = (path: string) => {
    return getTheme(theme, currentThemeCategory, path);
  };

  // Helper function to get a value for a specific theme category regardless of active theme
  const getThemeSpecificValue = (themeName: ThemeType, path: string) => {
    return getSpecificTheme(theme, themeName, path);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      isDarkMode, 
      currentThemeCategory,
      toggleTheme, 
      setThemeCategory,
      getThemeValue,
      getThemeSpecificValue
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 