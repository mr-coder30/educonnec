import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../common/Icon';

const AdminHeader = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-blue-100/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu button for mobile */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300 lg:hidden"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              College Admin Dashboard
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Icon name="sun" className="h-5 w-5" />
              ) : (
                <Icon name="moon" className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <Icon name="bell" className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-full p-1 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                  <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
                    <Icon name="user" className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-slate-800 dark:bg-slate-800 dark:ring-slate-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-slate-900 dark:text-white" role="none">
                      College Admin
                    </p>
                  </div>
                  <div className="py-1" role="none">
                    <button
                      onClick={handleLogout}
                      className="flex w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100 dark:text-red-400 dark:hover:bg-slate-700"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
