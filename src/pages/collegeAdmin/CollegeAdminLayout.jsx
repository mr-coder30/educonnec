import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../components/common/Icon';
import { useTheme } from '../../hooks/useTheme';
import { useCollegeAdminData } from '../../context/AdminDataContext';

const basePath = '/collegeadmin';

const navItems = [
  { label: 'Dashboard', icon: 'home', path: `${basePath}` },
  { label: 'Representatives', icon: 'studentCollab', path: `${basePath}/representatives` },
  { label: 'College Wall', icon: 'posts', path: `${basePath}/wall` },
  { label: 'Events', icon: 'calendar', path: `${basePath}/events` },
  { label: 'Collaborations', icon: 'collaboration', path: `${basePath}/collaborations` },
  { label: 'Engagement', icon: 'stats', path: `${basePath}/engagement` },
  { label: 'Settings', icon: 'settings', path: `${basePath}/settings` }
];

const quickActions = [
  {
    id: 'create-event',
    label: 'Create event',
    icon: 'calendar',
    description: 'Plan your next campus activity.',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    path: `${basePath}/events`
  },
  {
    id: 'invite-rep',
    label: 'Invite representative',
    icon: 'studentCollab',
    description: 'Onboard community builders quickly.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    path: `${basePath}/representatives`
  },
  {
    id: 'view-analytics',
    label: 'View analytics',
    icon: 'stats',
    description: 'Review engagement performance.',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    path: `${basePath}/engagement`
  }
];

const QuickActionsMenu = ({ onSelect }) => (
  <div className="w-72 rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl shadow-blue-500/20 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/95">
    <div className="space-y-3">
      {quickActions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onSelect(action.path)}
          className={`flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent bg-gradient-to-r ${action.gradient} px-4 py-3 text-left text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5`}
        >
          <div className="text-sm">
            <p className="font-semibold">{action.label}</p>
            <p className="text-xs text-white/80">{action.description}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Icon name={action.icon} className="h-5 w-5" />
          </span>
        </button>
      ))}
    </div>
  </div>
)

const TopBar = ({ profile, isDark, toggleTheme, onMenuToggle, onProfileClick, showProfileDropdown, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-blue-100/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu button and title */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onMenuToggle}
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300 lg:hidden"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
            <div className="hidden items-center lg:flex">
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Icon name="sun" className="h-5 w-5" />
              ) : (
                <Icon name="moon" className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={toggleNotifications}
                className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                aria-label="Notifications"
              >
                <Icon name="bell" className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800">
                  <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                    No new notifications
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={onProfileClick}
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

              {showProfileDropdown && (
                <div
                  className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-slate-800 dark:bg-slate-800 dark:ring-slate-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-slate-900 dark:text-white" role="none">
                      {profile?.collegeName || 'College Admin'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400" role="none">
                      College Admin
                    </p>
                  </div>
                  <div className="py-1" role="none">
                    <button
                      onClick={onLogout}
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

const Sidebar = ({ isOpen, onClose, activeItem, onItemClick }) => {
  return (
    <aside 
      className={`w-full h-full flex flex-col border-r border-blue-100/70 bg-white/90 dark:border-slate-800 dark:bg-slate-900/95`}
    >
      <div className="flex-1 flex flex-col gap-4 px-4 py-6 overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200/60 bg-gradient-to-tr from-blue-600 to-purple-500 text-xl font-bold text-white shadow-lg shadow-blue-500/30 dark:border-transparent">
            {activeItem?.collegeName?.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">College</p>
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
              Aurora Institute
            </p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onItemClick(item)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-normal transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50'
                }`
              }
            >
              <Icon name={item.icon} className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

const CollegeAdminLayout = () => {
  const { profile, isLoading } = useCollegeAdminData();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close quick actions and profile dropdown when navigating
  useEffect(() => {
    setIsQuickOpen(false);
    setShowProfileDropdown(false);
  }, [location.pathname]);

  const handleQuickSelect = (path) => {
    navigate(path);
    setIsQuickOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Top Bar - Fixed at the top with college name */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <TopBar 
          profile={profile}
          isDark={isDark}
          toggleTheme={toggleTheme}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onProfileClick={() => setShowProfileDropdown(!showProfileDropdown)}
          showProfileDropdown={showProfileDropdown}
          onLogout={handleLogout}
        />
      </div>

      <div className="flex h-[calc(100vh-4rem)] pt-16">
        {/* Sidebar - Fixed on the left below top bar */}
        <div 
          className={`fixed top-16 left-0 bottom-0 z-20 w-60 transform transition-transform duration-200 ease-in-out bg-white dark:bg-slate-800 shadow-lg lg:shadow-none ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } lg:static lg:w-56`}
          style={{
            height: 'calc(100vh - 4rem)',
            overflowY: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onItemClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main Content - Takes remaining space */}
        <div 
          className={`flex-1 overflow-hidden transition-all duration-200 ${
            isSidebarOpen ? 'lg:ml-56' : 'lg:ml-0'
          }`}
        >
          <main className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-900">
            <div className="p-4 sm:p-6">
              <Outlet context={{ profile }} />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Fixed at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-slate-200 bg-white/90 px-2 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/90 lg:hidden">
        {[
          { label: 'Home', icon: 'home', path: basePath },
          { label: 'Wall', icon: 'posts', path: `${basePath}/wall` },
          { label: 'Events', icon: 'calendar', path: `${basePath}/events` },
          { label: 'Collabs', icon: 'collaboration', path: `${basePath}/collaborations` }
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`
            }
          >
            <Icon name={item.icon} className="h-5 w-5" />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
        
        {/* Centered Plus Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
          <button
            type="button"
            onClick={() => setIsQuickOpen(!isQuickOpen)}
            className="flex h-14 w-14 -translate-y-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-xl shadow-blue-500/40"
            aria-label={isQuickOpen ? 'Close quick actions' : 'Open quick actions'}
          >
            <Icon name={isQuickOpen ? 'modalClose' : 'plus'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Quick Actions Menu */}
      {isQuickOpen && (
        <div className="fixed bottom-24 right-6 z-40">
          <QuickActionsMenu onSelect={handleQuickSelect} />
        </div>
      )}
    </div>
  );
};

export default CollegeAdminLayout;
