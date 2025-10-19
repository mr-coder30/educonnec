import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import Icon from './Icon'

const studentCollabLinks = [
  { name: 'Find Collab', path: '/dashboard/student-collab/find' },
  { name: 'Create Collab', path: '/dashboard/student-collab/create' },
  { name: 'My Collab', path: '/dashboard/student-collab/my' },
  { name: 'Collaboration Settings', path: '/dashboard/student-collab/settings' }
]

const collegeLinks = [
  { name: 'All Colleges', path: '/dashboard/colleges' },
  { name: 'Active Now', path: '/dashboard/colleges/active' },
  { name: 'College Wall', path: '/dashboard/colleges/wall' },
  { name: 'Events', path: '/dashboard/colleges/events' },
  { name: 'College Collabs', path: '/dashboard/colleges/collabs' }
]

const Header = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isStudentCollabOpen, setIsStudentCollabOpen] = useState(true)
  const [isCollegesOpen, setIsCollegesOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const avatarRef = useRef(null)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickAway = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [])

  const handleNavigate = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
    setShowDropdown(false)
  }

  return (
    <header className="relative z-40 border-b border-blue-100/60 bg-white/80 shadow-[0_10px_40px_-24px_rgba(59,130,246,0.5)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-blue-100/40 via-transparent to-purple-100/40 dark:from-slate-900/70 dark:via-transparent dark:to-slate-900/70" aria-hidden="true"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-blue-200/60 bg-white/80 shadow-inner shadow-blue-500/20 flex items-center justify-center overflow-hidden">
              <img src="https://i.postimg.cc/c1tHCRSr/STUD-CONNECT-1-removebg-preview.png" alt="Educonnec" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Educonnec
            </span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <label className="relative flex items-center">
                <span className="absolute left-4 text-blue-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search collaborations, colleges, events..."
                  className="w-full rounded-full border border-blue-100 bg-white/80 px-12 py-3 text-sm text-gray-700 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-gray-200"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
                  >
                    <Icon name="modalClose" className="h-4 w-4" />
                  </button>
                )}
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-blue-50/70 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50 transition"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavigate('/dashboard/notifications')}
              className="flex p-2 rounded-xl bg-blue-50/70 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50 transition"
            >
              <span className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 8a6 6 0 10-12 0c0 3.478-1.04 4.742-2.09 6.05-.332.42-.497.63-.494.86.004.266.186.512.548 1.004A2 2 0 006.463 17H12" />
                </svg>
                <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-pink-500"></span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl border border-blue-200/60 bg-white/80 text-blue-600 shadow-sm hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200 dark:hover:bg-slate-900/50 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div
              ref={avatarRef}
              className="relative hidden md:block"
            >
              <button
                type="button"
                onClick={() => setShowDropdown((prev) => !prev)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setShowDropdown(false)
                  }
                }}
                aria-haspopup="menu"
                aria-expanded={showDropdown}
                className="group flex items-center space-x-3 rounded-2xl border border-transparent bg-white/60 px-3 py-1.5 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900/60"
              >
                <img
                  className="h-9 w-9 rounded-2xl border border-blue-100 object-cover group-hover:scale-[1.02] transition dark:border-slate-800"
                  src={user?.profilePicture || '/default-avatar.png'}
                  alt={user?.name}
                />
                <div className="text-left">
                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {user?.name}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.22em] text-blue-500 dark:text-blue-300">
                    Creator
                  </span>
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur shadow-2xl dark:border-slate-800 dark:bg-slate-950/95 z-50"
                  role="menu"
                  tabIndex={-1}
                >
                  <div className="flex items-center gap-3 border-b border-slate-200/70 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-transparent px-4 py-3 dark:border-slate-800/80">
                    <img
                      className="h-12 w-12 rounded-2xl border border-blue-100 object-cover dark:border-slate-700"
                      src={user?.profilePicture || '/default-avatar.png'}
                      alt={user?.name}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ready to spark something epic
                        <Icon name="sparkles" className="ml-1 inline h-4 w-4 align-middle text-blue-500 dark:text-blue-300" />
                      </p>
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleNavigate('/dashboard/profile')}
                      className="flex w-full items-center justify-between rounded-2xl border border-transparent bg-blue-50/80 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/40"
                      role="menuitem"
                    >
                      <span>View profile</span>
                      <Icon name="arrowRight" className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate('/dashboard/settings')}
                      className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800"
                      role="menuitem"
                    >
                      <span>Dashboard settings</span>
                      <Icon name="settings" className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="border-t border-slate-200/70 bg-slate-50/80 px-4 py-3 text-xs text-gray-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-gray-400">
                    <button
                      onClick={() => {
                        setShowDropdown(false)
                        logout()
                      }}
                      className="w-full rounded-2xl border border-transparent px-3 py-2 text-left font-medium text-pink-600 transition hover:border-pink-200 hover:bg-pink-50 dark:text-pink-300 dark:hover:bg-pink-900/30"
                      role="menuitem"
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

      {isMobileMenuOpen && (
        <div className="absolute inset-x-4 top-[64px] z-50 md:hidden">
          <div className="rounded-3xl bg-white/95 dark:bg-slate-950/92 border border-gray-200 dark:border-slate-800/80 shadow-xl shadow-blue-500/10 dark:shadow-black/40 p-4 space-y-4 backdrop-blur">
            <button
              type="button"
              onClick={() => handleNavigate('/dashboard')}
              className="w-full flex items-center justify-between rounded-2xl border border-blue-100/80 dark:border-slate-800/70 bg-blue-50/60 dark:bg-slate-900/65 px-4 py-3 text-sm font-semibold text-blue-600 dark:text-white shadow-sm"
            >
              <span className="flex items-center gap-3 text-base font-semibold">
                <Icon name="home" className="h-5 w-5" />
                Home
              </span>
            </button>

            <div className="space-y-3 rounded-2xl border border-blue-100/80 dark:border-slate-800/70 p-3 bg-blue-50/40 dark:bg-slate-900/60 shadow-inner shadow-blue-500/10 dark:shadow-black/20">
              <button
                type="button"
                onClick={() => setIsStudentCollabOpen((prev) => !prev)}
                className="w-full flex items-center gap-3 text-sm font-semibold text-blue-700 dark:text-blue-200"
              >
                <Icon name="studentCollab" className="h-5 w-5" />
                <span className="flex items-center gap-2">
                  Student Collab
                  <span className="text-base">{isStudentCollabOpen ? '−' : '+'}</span>
                </span>
              </button>
              {isStudentCollabOpen && (
                <div className="space-y-2 pl-9">
                  {studentCollabLinks.map((link) => (
                    <button
                      key={link.path}
                      type="button"
                      onClick={() => handleNavigate(link.path)}
                      className="block w-full rounded-xl px-3 py-2 text-left text-xs uppercase tracking-wide text-blue-600 dark:text-blue-100 hover:text-blue-500 dark:hover:bg-slate-800/60"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 rounded-2xl border border-purple-100/80 dark:border-slate-800/70 p-3 bg-purple-50/40 dark:bg-slate-900/60 shadow-inner shadow-purple-500/10 dark:shadow-black/20">
              <button
                type="button"
                onClick={() => setIsCollegesOpen((prev) => !prev)}
                className="w-full flex items-center gap-3 text-sm font-semibold text-purple-700 dark:text-purple-200"
              >
                <Icon name="colleges" className="h-5 w-5" />
                <span className="flex items-center gap-2">
                  Colleges
                  <span className="text-base">{isCollegesOpen ? '−' : '+'}</span>
                </span>
              </button>
              {isCollegesOpen && (
                <div className="space-y-2 pl-9">
                  {collegeLinks.map((link) => (
                    <button
                      key={link.path}
                      type="button"
                      onClick={() => handleNavigate(link.path)}
                      className="block w-full rounded-xl px-3 py-2 text-left text-xs uppercase tracking-wide text-purple-600 dark:text-purple-100 hover:text-purple-500 dark:hover:bg-slate-800/60"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavigate('/dashboard/settings')}
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Settings
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                logout()
              }}
              className="w-full rounded-2xl border border-red-200 text-red-500 py-3 text-sm font-semibold hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header