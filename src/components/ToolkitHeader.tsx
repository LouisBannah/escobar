import React, { useState } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { User } from '../types';

interface ToolkitHeaderProps {
  user: User | null;
  onLogout: () => void;
  activeThemeFilters: string[];
  onThemeFilterChange: (theme: string) => void;
}

const ToolkitHeader: React.FC<ToolkitHeaderProps> = ({
  user,
  onLogout,
  activeThemeFilters = [],
  onThemeFilterChange
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="w-full max-w-screen-xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-3xl tracking-tight font-['Open_Sans']">
              <span className="font-bold text-[#079669]">Converge</span>
              <span className="font-light text-gray-800 dark:text-gray-200">Toolkit</span>
            </h1>
          </div>

          {/* Theme Filter Buttons - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
            {(['Sales', 'Delivery', 'Quality Assurance'] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => onThemeFilterChange(theme)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-medium relative overflow-hidden ${
                  activeThemeFilters.includes(theme)
                    ? 'text-white shadow-lg border-none transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm hover:shadow-inner border border-gray-200 hover:border-gray-300'
                }`}
                style={
                  activeThemeFilters.includes(theme)
                    ? theme === 'Sales'
                      ? { 
                          background: 'linear-gradient(135deg, #05ED04, #24920D)',
                          boxShadow: '0 8px 16px -2px rgba(5, 237, 4, 0.15), 0 3px 6px -2px rgba(36, 146, 13, 0.1)',
                        }
                      : theme === 'Delivery'
                      ? { 
                          background: 'linear-gradient(135deg, #36DAB3, #00A0DE)',
                          boxShadow: '0 8px 16px -2px rgba(54, 218, 179, 0.15), 0 3px 6px -2px rgba(0, 160, 222, 0.1)',
                        }
                      : { 
                          background: 'linear-gradient(135deg, #D41EDE, #B38EEF)',
                          boxShadow: '0 8px 16px -2px rgba(212, 30, 222, 0.15), 0 3px 6px -2px rgba(179, 142, 239, 0.1)',
                        }
                    : {}
                }
              >
                {activeThemeFilters.includes(theme) && (
                  <>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent top-0 left-0" style={{ height: '50%' }}></span>
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"></span>
                  </>
                )}
                <span className="relative z-10 font-semibold">{theme}</span>
              </button>
            ))}
          </div>

          {/* Right side navigation items */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Profile dropdown */}
            {user && (
              <div className="relative">
                <div>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center max-w-xs rounded-full text-sm focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                      {user.avatar ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.avatar}
                          alt=""
                        />
                      ) : (
                        user.name && user.name.charAt(0)
                      )}
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300 hidden md:block">
                      {user.name || user.email.split('@')[0]}
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                {showProfileMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        Settings
                      </a>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        role="menuitem"
                        onClick={onLogout}
                      >
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ToolkitHeader; 