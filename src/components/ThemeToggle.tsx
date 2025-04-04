import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, getThemeValue } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{ 
        transition: 'all 0.2s ease',
        backgroundColor: 'transparent',
        color: theme === 'light' ? '#4b5563' : '#cbd5e1'
      }}
      className="p-2 rounded-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onMouseOver={(e) => {
        // In light mode, use the standard light mode hover style
        if (theme === 'light') {
          e.currentTarget.style.backgroundColor = getThemeValue('components.header.feedbackButton.bgHover');
        } else {
          e.currentTarget.style.backgroundColor = '#1e293b';
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle; 