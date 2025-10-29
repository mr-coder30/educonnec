import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import Icon from '../../components/common/Icon'
import { useTheme } from '../../hooks/useTheme'
import { useCollegeRepData } from '../../context/CollegeRepDataContext'

const navItems = [
  { label: 'Dashboard', icon: 'home', path: '.' },
  { label: 'My Posts', icon: 'posts', path: 'posts' },
  { label: 'My Events', icon: 'calendar', path: 'events' },
  { label: 'Collaborations', icon: 'collaboration', path: 'collaborations' },
  { label: 'Reports', icon: 'stats', path: 'reports' },
  { label: 'College Wall', icon: 'organization', path: 'wall' },
  { label: 'Requests', icon: 'collabRequests', path: 'requests' },
  { label: 'Settings', icon: 'settings', path: 'settings' }
]

const QuickActionMenu = ({ onClose }) => {
  const navigate = useNavigate()
  return (
    <div className="rounded-3xl border border-emerald-200/60 bg-white/95 p-4 shadow-2xl shadow-emerald-500/20 backdrop-blur dark:border-emerald-700/50 dark:bg-slate-900/95">
      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => {
            navigate('posts')
            onClose?.()
          }}
          className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200"
        >
          <span>Create post</span>
          <Icon name="plus" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            navigate('events')
            onClose?.()
          }}
          className="flex items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-200"
        >
          <span>Create event</span>
          <Icon name="calendar" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            navigate('collaborations')
            onClose?.()
          }}
          className="flex items-center justify-between gap-3 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-200"
        >
          <span>Invite collaboration</span>
          <Icon name="collaboration" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const CollegeRepLayout = () => {
  const { isDark, toggleTheme } = useTheme()
  const { profile, notifications } = useCollegeRepData()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isQuickOpen, setIsQuickOpen] = useState(false)

  const activeLabel = useMemo(() => {
    const match = navItems.find((item) => {
      if (item.path === '.') {
        return location.pathname.endsWith('/collegerep')
      }
      return location.pathname.includes(item.path)
    })
    return match?.label ?? 'Dashboard'
  }, [location.pathname])

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  )

  useEffect(() => {
    setIsQuickOpen(false)
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
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-bold text-white shadow-lg shadow-emerald-600/30">
              {profile.collegeName.split(' ').map((word) => word[0]).join('').slice(0, 2)}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Representative</p>
              <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{profile.collegeName}</p>
            </div>
          </button>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map(({ label, icon, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '.'}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-slate-500 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:bg-slate-800/70'
                  }`
                }
              >
                <Icon name={icon} className="h-5 w-5" />
                <span className="truncate">{label}</span>
              </NavLink>
            ))}
            <NavLink
              to="notifications"
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-slate-500 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:bg-slate-800/70'
                }`
              }
            >
              <Icon name="notification" className="h-5 w-5" />
              <span className="truncate">Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-auto inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-emerald-500 px-2 text-xs font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          </nav>

          <div className="rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white shadow-lg shadow-emerald-500/20 dark:border-emerald-700/80">
            <p className="text-sm font-semibold">Invite another representative</p>
            <p className="mt-1 text-xs text-white/80">Collaborate across departments by inviting co-reps with tailored permissions.</p>
            <NavLink
              to="collaborations"
              onClick={() => setIsSidebarOpen(false)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/30"
            >
              <Icon name="collaboration" className="h-4 w-4" />
              Manage collaborations
            </NavLink>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-100/70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <span className="hidden h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-white text-xl font-bold shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex">
                <img src={profile.logo || '/default-college.png'} alt={profile.collegeName} className="h-full w-full object-cover" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{profile.collegeName}</p>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">{activeLabel}</h1>
              </div>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <p className="max-w-xl truncate text-sm font-semibold text-slate-600 dark:text-slate-300">
              {profile.welcomeMessage}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <NavLink
              to="notifications"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-100/70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Icon name="notification" className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </NavLink>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-100/70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Icon name={isDark ? 'sun' : 'moon'} className="h-5 w-5" />
            </button>
            <div className="hidden items-center rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 sm:flex">
              {profile.name}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-slate-50 to-slate-100 px-4 py-6 dark:from-transparent dark:via-slate-950 dark:to-slate-950 lg:px-8">
          <Outlet context={{ setIsQuickOpen }} />
        </main>

        <div className="fixed bottom-6 right-6 z-30 hidden flex-col items-end gap-3 lg:flex">
          {isQuickOpen && (
            <QuickActionMenu onClose={() => setIsQuickOpen(false)} />
          )}
          <button
            type="button"
            onClick={() => setIsQuickOpen((previous) => !previous)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/30"
            aria-label={isQuickOpen ? 'Close quick actions' : 'Open quick actions'}
          >
            <Icon name={isQuickOpen ? 'modalClose' : 'plus'} className="h-7 w-7" />
          </button>
        </div>

        <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3 lg:hidden">
          {isQuickOpen && (
            <QuickActionMenu onClose={() => setIsQuickOpen(false)} />
          )}
          <button
            type="button"
            onClick={() => setIsQuickOpen((previous) => !previous)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/40"
            aria-label={isQuickOpen ? 'Close quick actions' : 'Open quick actions'}
          >
            <Icon name={isQuickOpen ? 'modalClose' : 'plus'} className="h-6 w-6" />
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

export default CollegeRepLayout
