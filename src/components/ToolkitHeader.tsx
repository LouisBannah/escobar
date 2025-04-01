import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, LogOut, User as UserIcon, Settings, MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { User } from '../types';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
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
  const { getThemeValue, setThemeCategory } = useTheme();
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
    <header 
      style={{
        background: getThemeValue('components.header.background'),
        borderBottom: `1px solid ${getThemeValue('components.header.borderColor')}`,
        boxShadow: getThemeValue('components.header.boxShadow'),
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}
    >
      <div className="w-full max-w-screen-xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-3xl tracking-tight font-['Open_Sans']">
              <span style={{ fontWeight: 'bold', color: getThemeValue('colors.primary.main') }}>Converge</span>
              <span style={{ fontWeight: 'light', color: getThemeValue('colors.text.primary') }}>Toolkit</span>
            </h1>
          </div>

          {/* Theme Filter Buttons - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
            {(['Sales', 'Delivery', 'Quality Assurance'] as const).map((theme) => {
              // Temporarily set the theme category to get the correct styles
              const isActive = activeThemeFilters.includes(theme);
              
              // Get the correct theme button styling based on active state
              const buttonStyle = isActive
                ? {
                    background: getThemeValue('colors.gradients.button'),
                    color: getThemeValue('colors.primary.contrast'),
                    boxShadow: getThemeValue('shared.boxShadow.md'),
                    border: 'none',
                    transform: 'scale(1.05)'
                  }
                : {
                    background: 'transparent',
                    color: getThemeValue('components.header.themeButton.normal.text'),
                    border: `1px solid ${getThemeValue('components.header.themeButton.normal.border')}`,
                    boxShadow: getThemeValue('shared.boxShadow.sm')
                  };
              
              return (
                <button
                  key={theme}
                  onClick={() => {
                    setThemeCategory(theme);
                    onThemeFilterChange(theme);
                  }}
                  className="px-6 py-2 rounded-lg transition-all duration-300 font-medium relative overflow-hidden"
                  style={buttonStyle}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = getThemeValue('components.header.themeButton.hover.bg');
                      e.currentTarget.style.color = getThemeValue('components.header.themeButton.hover.text');
                      e.currentTarget.style.borderColor = getThemeValue('components.header.themeButton.hover.border');
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = getThemeValue('components.header.themeButton.normal.text');
                      e.currentTarget.style.borderColor = getThemeValue('components.header.themeButton.normal.border');
                    }
                  }}
                >
                  {isActive && (
                    <>
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent top-0 left-0" style={{ height: '50%' }}></span>
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"></span>
                    </>
                  )}
                  <span className="relative z-10 font-semibold">{theme}</span>
                </button>
              );
            })}
          </div>

          {/* Right side navigation items */}
          <div className="flex items-center gap-4">
            {/* Feedback Button */}
            <button
              onClick={() => setShowFeedback(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.375rem 0.75rem',
                background: getThemeValue('components.header.feedbackButton.bg'),
                border: `1px solid ${getThemeValue('components.header.feedbackButton.border')}`,
                borderRadius: '0.375rem',
                color: getThemeValue('components.header.feedbackButton.text'),
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = getThemeValue('components.header.feedbackButton.bgHover');
                e.currentTarget.style.borderColor = getThemeValue('components.header.feedbackButton.borderHover');
                e.currentTarget.style.color = getThemeValue('components.header.feedbackButton.textHover');
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = getThemeValue('components.header.feedbackButton.bg');
                e.currentTarget.style.borderColor = getThemeValue('components.header.feedbackButton.border');
                e.currentTarget.style.color = getThemeValue('components.header.feedbackButton.text');
              }}
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
                    <div className="h-8 w-8 rounded-full flex items-center justify-center"
                      style={{ 
                        background: getThemeValue('colors.primary.light'),
                        color: getThemeValue('colors.primary.main')
                      }}
                    >
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
                    <span className="ml-2 hidden md:block"
                      style={{ color: getThemeValue('colors.text.primary') }}
                    >
                      {user.name || user.email.split('@')[0]}
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4" style={{ color: getThemeValue('colors.text.tertiary') }} />
                  </button>
                </div>
                {showProfileMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg"
                    style={{ 
                      background: getThemeValue('components.header.profileMenu.bg'),
                      borderColor: getThemeValue('components.header.profileMenu.border'),
                      boxShadow: getThemeValue('components.header.profileMenu.shadow'),
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >
                    <div className="px-4 py-3" style={{ borderBottom: `1px solid ${getThemeValue('components.header.profileMenu.divider')}` }}>
                      <p className="text-sm font-medium" style={{ color: getThemeValue('colors.text.primary') }}>
                        {user?.name || user?.email.split('@')[0]}
                      </p>
                      <p className="text-xs truncate" style={{ color: getThemeValue('colors.text.tertiary') }}>
                        {user?.email}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{ 
                            background: getThemeValue('colors.primary.light'),
                            color: getThemeValue('colors.primary.main')
                          }}
                        >
                          Level {user?.accessLevel} Access
                        </span>
                      </div>
                    </div>
                    <div className="py-1" style={{ borderBottom: `1px solid ${getThemeValue('components.header.profileMenu.divider')}` }}>
                      <label className="flex items-center px-4 py-2 text-sm cursor-pointer"
                        style={{ color: getThemeValue('colors.text.secondary') }}
                      >
                        <input
                          type="checkbox"
                          checked={user?.accessLevel === 2}
                          onChange={toggleAccessLevel}
                          className="h-4 w-4 mr-3 rounded"
                          style={{ 
                            color: getThemeValue('colors.primary.main'),
                            borderColor: getThemeValue('colors.border')
                          }}
                        />
                        Authorized
                      </label>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm"
                        style={{ color: getThemeValue('colors.text.secondary') }}
                        role="menuitem"
                      >
                        <UserIcon className="h-4 w-4 mr-3" style={{ color: getThemeValue('colors.text.tertiary') }} />
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm"
                        style={{ color: getThemeValue('colors.text.secondary') }}
                        role="menuitem"
                      >
                        <Settings className="h-4 w-4 mr-3" style={{ color: getThemeValue('colors.text.tertiary') }} />
                        Settings
                      </a>
                    </div>
                    <div className="py-1">
                      <div
                        className="flex items-center px-4 py-2 text-sm cursor-pointer"
                        style={{ color: '#ef4444' }}
                        role="menuitem"
                        onClick={onLogout}
                      >
                        <LogOut className="h-4 w-4 mr-3" style={{ color: '#ef4444' }} />
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