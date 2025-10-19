import React, { useEffect, useMemo, useRef, useState } from 'react'

import { useAuth } from '../../hooks/useAuth'

const Toggle = ({ id, enabled, onChange }) => (
  <button
    type="button"
    id={id}
    role="switch"
    aria-checked={enabled}
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-7 w-12 items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 ${
      enabled ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' : 'bg-gray-300 dark:bg-slate-700'
    }`}
  >
    <span
      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${
        enabled ? 'translate-x-5' : 'translate-x-1'
      }`}
    />
  </button>
)

const eventCategoryOptions = [
  { id: 'hackathons', label: 'Hackathons', emoji: '🚀', description: 'High-energy sprints and build jams.' },
  { id: 'workshops', label: 'Workshops', emoji: '🛠️', description: 'Deep dives and hands-on sessions.' },
  { id: 'tech-fests', label: 'Tech Fests', emoji: '💡', description: 'Campus-wide showcases and expos.' },
  { id: 'cultural', label: 'Cultural', emoji: '🎭', description: 'Arts, literature, and campus showcases.' },
  { id: 'seminars', label: 'Seminars', emoji: '🎤', description: 'Talks, panel discussions, and keynotes.' },
  { id: 'competitions', label: 'Competitions', emoji: '🏆', description: 'Pitch days and problem-solving leagues.' }
]

const summaryOptions = [
  { id: 'minimal', title: 'Minimal', description: 'One-line pulse with the essentials.' },
  { id: 'concise', title: 'Concise', description: 'Quick overview with next steps.' },
  { id: 'detailed', title: 'Detailed', description: 'Full context, highlights, and recommendations.' }
]

const DashboardSettings = () => {
  const { user } = useAuth()

  const defaultEmail = useMemo(() => user?.email ?? 'alex.carter@educonnect.com', [user])

  const [basicForm, setBasicForm] = useState(() => ({
    email: defaultEmail,
    currentPassword: '',
    newPassword: ''
  }))
  const [selectedEventCategories, setSelectedEventCategories] = useState(() => eventCategoryOptions.map(option => option.id))
  const [notificationPreferences, setNotificationPreferences] = useState({
    collabInvites: true,
    collegeAnnouncements: true,
    emailNotifications: true
  })
  const [summaryPreference, setSummaryPreference] = useState('concise')
  const [allowCollabRequests, setAllowCollabRequests] = useState(true)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  const categoryDropdownRef = useRef(null)

  useEffect(() => {
    setBasicForm(prev => ({ ...prev, email: defaultEmail }))
  }, [defaultEmail])

  useEffect(() => {
    if (!isCategoryDropdownOpen) return
    const handleClickOutside = (event) => {
      if (!categoryDropdownRef.current?.contains(event.target)) {
        setIsCategoryDropdownOpen(false)
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [isCategoryDropdownOpen])

  const handleBasicChange = (event) => {
    const { name, value } = event.target
    setBasicForm(prev => ({ ...prev, [name]: value }))
  }

  const handleBasicSubmit = (event) => {
    event.preventDefault()
    console.log('Updated basic settings', basicForm)
  }

  const handleDeleteAccount = () => {
    const shouldDelete = window.confirm('This will permanently remove your account and collaborations. Continue?')
    if (shouldDelete) {
      console.log('Account deletion requested')
    }
  }

  const handleLogout = () => {
    console.log('Logout triggered')
  }

  const toggleCategory = (categoryId) => {
    setSelectedEventCategories(prev => (
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    ))
  }

  const toggleNotificationPreference = (key) => {
    setNotificationPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="relative mx-auto max-w-5xl space-y-8 px-4 pb-20 sm:px-6 lg:px-0">
      <section className="rounded-[28px] border border-gray-200 bg-white/95 p-6 shadow-lg shadow-blue-500/10 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic settings</h2>
        </div>
        <form onSubmit={handleBasicSubmit} className="mt-6 space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Email address</label>
              <input
                type="email"
                name="email"
                value={basicForm.email}
                onChange={handleBasicChange}
                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Current password</label>
              <input
                type="password"
                name="currentPassword"
                value={basicForm.currentPassword}
                onChange={handleBasicChange}
                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">New password</label>
              <input
                type="password"
                name="newPassword"
                value={basicForm.newPassword}
                onChange={handleBasicChange}
                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between dark:border-slate-800">
            <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="rounded-2xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:text-red-300 dark:hover:bg-red-500/10"
              >
                Delete account
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:shadow-purple-500/50"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="rounded-[28px] border border-gray-200 bg-white/95 p-6 shadow-lg shadow-blue-500/10 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification settings</h2>
        </div>
        <div className="mt-6 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Event categories</h3>
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600 dark:border-blue-500/40 dark:bg-blue-900/30 dark:text-blue-200">
                {selectedEventCategories.length} selected
              </span>
            </div>
            <div className="space-y-3" ref={categoryDropdownRef}>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white/90 px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-gray-200 dark:hover:border-blue-500/40"
                >
                  <span>Manage categories</span>
                  <span className={`text-xs transition ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute z-30 mt-3 w-full rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl shadow-blue-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/30">
                    <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                      {eventCategoryOptions.map(option => {
                        const isSelected = selectedEventCategories.includes(option.id)
                        return (
                          <label
                            key={option.id}
                            className={`flex items-start gap-3 rounded-2xl px-3 py-2 transition hover:bg-blue-50/80 dark:hover:bg-slate-800/60 ${
                              isSelected ? 'bg-blue-50/80 dark:bg-slate-800/80' : ''
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleCategory(option.id)}
                              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900"
                            />
                            <div className="space-y-1 text-left">
                              <p className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
                                <span>{option.emoji}</span>
                                {option.label}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{option.description}</p>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {eventCategoryOptions.filter(option => selectedEventCategories.includes(option.id)).map(option => (
                  <span
                    key={option.id}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/40 dark:bg-blue-900/40 dark:text-blue-200"
                  >
                    <span>{option.emoji}</span>
                    {option.label}
                  </span>
                ))}
                {selectedEventCategories.length === 0 && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">No categories selected yet.</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Collab invites</p>
              </div>
              <Toggle
                id="collab-invites"
                enabled={notificationPreferences.collabInvites}
                onChange={() => toggleNotificationPreference('collabInvites')}
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">College announcements</p>
              </div>
              <Toggle
                id="college-announcements"
                enabled={notificationPreferences.collegeAnnouncements}
                onChange={() => toggleNotificationPreference('collegeAnnouncements')}
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Email summaries</p>
              </div>
              <Toggle
                id="email-notifications"
                enabled={notificationPreferences.emailNotifications}
                onChange={() => toggleNotificationPreference('emailNotifications')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-gray-200 bg-white/95 p-6 shadow-lg shadow-blue-500/10 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI preferences</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {summaryOptions.map(option => {
            const isActive = summaryPreference === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSummaryPreference(option.id)}
                className={`flex h-full flex-col items-start gap-2 rounded-3xl border px-5 py-5 text-left transition hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:border-blue-500/40 ${
                  isActive
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-blue-700 dark:border-blue-500/60 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-pink-900/20 dark:text-blue-200'
                    : 'border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-gray-300'
                }`}
              >
                <span className="text-sm font-semibold capitalize">{option.title}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{option.description}</p>
                <span className={`mt-auto inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                  isActive
                    ? 'bg-blue-600/90 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-300'
                }`}
                >
                  {isActive ? 'Active' : 'Select'}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-[28px] border border-gray-200 bg-white/95 p-6 shadow-lg shadow-blue-500/10 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Privacy & security</h2>
        </div>
        <div className="mt-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Allow collab requests</p>
            </div>
            <Toggle
              id="allow-collab-requests"
              enabled={allowCollabRequests}
              onChange={setAllowCollabRequests}
            />
          </div>

          <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-blue-50 p-5 text-sm text-gray-600 shadow-inner dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 dark:text-gray-300">
            <p className="font-semibold text-gray-900 dark:text-white">Device sessions</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Active session</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-500/10"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardSettings
