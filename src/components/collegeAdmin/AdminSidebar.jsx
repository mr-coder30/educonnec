import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCollegeAdminData } from '../../context/AdminDataContext';
import Icon from '../common/Icon';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { profile } = useCollegeAdminData();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [expandedSection, setExpandedSection] = useState(null);

  const MENU_ITEMS = [
    { name: 'Dashboard', icon: 'home', path: '/collegeadmin' },
    {
      name: 'Representatives',
      icon: 'studentCollab',
      path: '/collegeadmin/representatives'
    },
    { name: 'College Wall', icon: 'posts', path: '/collegeadmin/wall' },
    { name: 'Events', icon: 'calendar', path: '/collegeadmin/events' },
    { 
      name: 'Collaborations', 
      icon: 'collaboration', 
      path: '/collegeadmin/collaborations' 
    },
    { 
      name: 'Engagement', 
      icon: 'stats', 
      path: '/collegeadmin/engagement' 
    },
    { name: 'Settings', icon: 'settings', path: '/collegeadmin/settings' }
  ];

  useEffect(() => {
    const currentItem = MENU_ITEMS.find(item => 
      location.pathname.startsWith(item.path)
    );
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    if (onClose) onClose();
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-blue-100/70 bg-white/90 shadow-[0_20px_60px_-35px_rgba(37,99,235,0.65)] backdrop-blur-md transition-transform duration-200 ease-in-out dark:border-slate-800 dark:bg-slate-900/95 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200/60 bg-gradient-to-tr from-blue-600 to-purple-500 text-xl font-bold text-white shadow-lg shadow-blue-500/30 dark:border-transparent">
            {profile?.collegeName?.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Admin Console</p>
            <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
              {profile?.collegeName || 'College Admin'}
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => handleItemClick(item)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-500 hover:bg-white/70 dark:text-slate-400 dark:hover:bg-slate-800/70'
                }`
              }
            >
              <Icon name={item.icon} className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
