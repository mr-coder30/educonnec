import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const Settings = () => {
  const { profile, settings, updateSettings, updateProfile } = useCollegeRepData()

  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    role: profile.role,
    department: settings.profile.department,
    contactEmail: settings.profile.contactEmail,
    phone: settings.profile.phone
  })

  const [notificationPrefs, setNotificationPrefs] = useState({ ...settings.notifications })
  const [privacyPrefs, setPrivacyPrefs] = useState({ ...settings.privacy })
  const [timezone, setTimezone] = useState(settings.account.timezone)

  const preview = useMemo(() => ({
    displayName: profileForm.name,
    role: profileForm.role,
    department: profileForm.department,
    email: profileForm.contactEmail
  }), [profileForm])

  const handleProfileSubmit = (event) => {
    event.preventDefault()
    updateProfile({
      name: profileForm.name,
      department: profileForm.department,
      email: profileForm.contactEmail,
      phone: profileForm.phone
    })
    updateSettings('profile', profileForm)
  }

  const handleNotificationSubmit = (event) => {
    event.preventDefault()
    updateSettings('notifications', notificationPrefs)
  }

  const handlePrivacySubmit = (event) => {
    event.preventDefault()
    updateSettings('privacy', privacyPrefs)
    updateSettings('account', { timezone })
  }

  return (
    <div className="space-y-8">
      <header className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/85">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Update your representative profile, manage notifications, and adjust privacy controls for wall and event visibility.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <form onSubmit={handleProfileSubmit} className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Profile info</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Share the details students will see when you post or collaborate.</p>
              </div>
              <Icon name="profile" className="h-6 w-6 text-emerald-500" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(event) => setProfileForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Role / title</label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(event) => setProfileForm((prev) => ({ ...prev, role: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Department</label>
                <input
                  type="text"
                  value={profileForm.department}
                  onChange={(event) => setProfileForm((prev) => ({ ...prev, department: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Contact email</label>
                <input
                  type="email"
                  value={profileForm.contactEmail}
                  onChange={(event) => setProfileForm((prev) => ({ ...prev, contactEmail: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Phone</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(event) => setProfileForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setProfileForm({
                  name: profile.name,
                  role: profile.role,
                  department: settings.profile.department,
                  contactEmail: settings.profile.contactEmail,
                  phone: settings.profile.phone
                })}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
              >
                <Icon name="plus" className="h-4 w-4" />
                Save profile
              </button>
            </div>
          </form>

          <form onSubmit={handleNotificationSubmit} className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notification preferences</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Choose the updates you receive from wall activity, collaborations, and events.</p>
              </div>
              <Icon name="notification" className="h-6 w-6 text-emerald-500" />
            </div>

            <div className="mt-6 space-y-4">
              {Object.entries(notificationPrefs).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  <span className="capitalize">{key}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(event) => setNotificationPrefs((prev) => ({ ...prev, [key]: event.target.checked }))}
                    className="h-5 w-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setNotificationPrefs({ ...settings.notifications })}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
              >
                <Icon name="plus" className="h-4 w-4" />
                Save preferences
              </button>
            </div>
          </form>

          <form onSubmit={handlePrivacySubmit} className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Privacy & controls</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Set who can see your posts and collaborate with your college.</p>
              </div>
              <Icon name="settings" className="h-6 w-6 text-emerald-500" />
            </div>

            <div className="mt-6 space-y-4">
              {Object.entries(privacyPrefs).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(event) => setPrivacyPrefs((prev) => ({ ...prev, [key]: event.target.checked }))}
                    className="h-5 w-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                  />
                </label>
              ))}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setPrivacyPrefs({ ...settings.privacy })
                  setTimezone(settings.account.timezone)
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
              >
                <Icon name="plus" className="h-4 w-4" />
                Save privacy
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live preview</h3>
            <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">display name</span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">{preview.displayName}</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-slate-400">role</span>
              <span>{preview.role}</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-slate-400">department</span>
              <span>{preview.department}</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-slate-400">contact</span>
              <span>{preview.email}</span>
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-100 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-lg shadow-emerald-500/30 dark:border-emerald-800">
            <h3 className="text-lg font-semibold">Need to deactivate?</h3>
            <p className="mt-2 text-sm text-white/80">Contact your college admin to suspend or reassign representative access.</p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/30"
            >
              <Icon name="mail" className="h-4 w-4" />
              Message admin
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default Settings
