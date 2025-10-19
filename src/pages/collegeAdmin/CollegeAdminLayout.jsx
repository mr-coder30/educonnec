import React, { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import Icon from '../../components/common/Icon'
import { useTheme } from '../../hooks/useTheme'
import { useCollegeAdminData } from '../../context/AdminDataContext'

const basePath = '/collegeadmin'

const navItems = [
  { label: 'Dashboard', icon: 'home', path: `${basePath}` },
  { label: 'Manage Representatives', icon: 'studentCollab', path: `${basePath}/representatives` },
  { label: 'My College Wall', icon: 'posts', path: `${basePath}/wall` },
  { label: 'My Events', icon: 'calendar', path: `${basePath}/events` },
  { label: 'College Collaborations', icon: 'collaboration', path: `${basePath}/collaborations` },
  { label: 'Student Engagement', icon: 'stats', path: `${basePath}/engagement` },
  { label: 'Settings', icon: 'settings', path: `${basePath}/settings` }
]

const CollegeAdminLayout = () => {
  const { isDark, toggleTheme } = useTheme()
  const { profile } = useCollegeAdminData()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeLabel = useMemo(() => {
    const match = navItems.find((item) => location.pathname === item.path)
    return match?.label ?? 'Dashboard'
  }, [location.pathname])

  return (
    <div className="relative flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white/95 backdrop-blur transition-transform duration-200 ease-in-out dark:border-slate-800 dark:bg-slate-900/95 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-6">
          <button
            type="button"
            className="flex items-center gap-3 text-left"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow-lg shadow-slate-900/30 dark:bg-slate-800">
              {profile.collegeName.split(' ').map((word) => word[0]).join('').slice(0, 2)}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Admin Console</p>
              <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{profile.collegeName}</p>
            </div>
          </button>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map(({ label, icon, path }) => (
              <NavLink
                key={path}
                to={path}
                end
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-500 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:bg-slate-800/70'
                  }`
                }
              >
                <Icon name={icon} className="h-5 w-5" />
                <span className="truncate">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-5 text-white shadow-lg shadow-blue-500/20 dark:border-slate-700/80">
            <p className="text-sm font-semibold">Need to update campus info?</p>
            <p className="mt-1 text-xs text-white/80">Jump into settings to refresh your college profile and permissions in seconds.</p>
            <NavLink
              to="settings"
              onClick={() => setIsSidebarOpen(false)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/30"
            >
              <Icon name="settings" className="h-4 w-4" />
              Open settings
            </NavLink>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-100/70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Admin Control</p>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{activeLabel}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-100/70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Icon name="notification" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-100/70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Icon name={isDark ? 'sun' : 'moon'} className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-left shadow-sm transition hover:border-slate-400 hover:bg-slate-100/60 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                <img src={profile.logo || '/default-college.png'} alt={profile.collegeName} className="h-full w-full object-cover" />
              </span>
              <span className="hidden text-sm font-semibold text-slate-700 dark:text-slate-100 sm:inline">{profile.adminName}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-slate-50 to-slate-100 px-4 py-6 dark:from-transparent dark:via-slate-950 dark:to-slate-950 lg:px-8">
          <Outlet />
        </main>

        <div className="fixed bottom-6 right-6 z-30 flex lg:hidden">
          <button
            type="button"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow-xl shadow-blue-500/40"
          >
            <Icon name="plus" className="h-7 w-7" />
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></button>
      )}
    </div>
  )
}

export default CollegeAdminLayout
