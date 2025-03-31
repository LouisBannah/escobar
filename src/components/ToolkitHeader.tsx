import React, { useState } from 'react';
import { Search, ChevronDown, Bell, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { User } from '../types';

interface ToolkitHeaderProps {
  user: User | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
}

const ToolkitHeader: React.FC<ToolkitHeaderProps> = ({
  user,
  searchQuery,
  onSearchChange,
  onLogout
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="/documents/logo_inverted.png"
              alt="Toolkit"
            />
            <span className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
              Converge Toolkit
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm text-gray-900 dark:text-gray-100"
                placeholder="Search for tools, resources, materials..."
              />
            </div>
          </div>

          {/* Right side navigation items */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Notification Button */}
            <button className="rounded-full p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            {user && (
              <div className="ml-3 relative">
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