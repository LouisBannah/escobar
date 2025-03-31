import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, LogOut, User as UserIcon, Settings, MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { User } from '../types';
import { useUser } from '../contexts/UserContext';
import FeedbackCard from './FeedbackCard';

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
  const [showFeedback, setShowFeedback] = useState(false);
  const { setUser } = useUser();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    // Add event listener when dropdown is open
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const toggleAccessLevel = () => {
    if (user) {
      setUser({
        ...user,
        accessLevel: user.accessLevel === 1 ? 2 : 1
      });
    }
  };

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
            {/* Feedback Button */}
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors"
              title="Provide Feedback"
            >
              <MessageSquare size={14} className="flex-shrink-0" />
              <span>Feedback</span>
            </button>
            
            <ThemeToggle />

            {/* Profile dropdown */}
            {user && (
              <div className="relative" ref={profileDropdownRef}>
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
                  <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user?.name || user?.email.split('@')[0]}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100">
                          Level {user?.accessLevel} Access
                        </span>
                      </div>
                    </div>
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <label className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user?.accessLevel === 2}
                          onChange={toggleAccessLevel}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mr-3"
                        />
                        Authorized
                      </label>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        <UserIcon className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        <Settings className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                        Settings
                      </a>
                    </div>
                    <div
                      className="py-1"
                    >
                      <div
                        className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-10 cursor-pointer"
                        role="menuitem"
                        onClick={onLogout}
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign out
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackCard 
          item={{
            id: 'feedback',
            theme: 'Delivery',
            category: 'General',
            shortTitle: 'Toolkit Feedback'
          }}
          onClose={() => setShowFeedback(false)} 
        />
      )}
    </header>
  );
};

export default ToolkitHeader; 