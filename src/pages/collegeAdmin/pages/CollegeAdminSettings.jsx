import React, { useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeAdminData } from '../../../context/AdminDataContext'

const CollegeAdminSettings = () => {
  const {
    profile,
    settings,
    updateSettings,
    updateWallPrivacy,
    updateProfile
  } = useCollegeAdminData()

  const [generalForm, setGeneralForm] = useState({
    collegeName: settings.general.collegeName,
    tagline: settings.general.tagline,
    website: settings.general.website,
    supportEmail: settings.general.supportEmail
  })

  const [accountForm, setAccountForm] = useState({
    contactEmail: settings.account.contactEmail,
    contactPhone: settings.account.contactPhone,
    timezone: settings.account.timezone
  })

  const handleGeneralChange = (event) => {
    const { name, value } = event.target
    setGeneralForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleAccountChange = (event) => {
    const { name, value } = event.target
    setAccountForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleGeneralSubmit = (event) => {
    event.preventDefault()
    updateSettings('general', generalForm)
    updateProfile({ collegeName: generalForm.collegeName })
  }

  const handleAccountSubmit = (event) => {
    event.preventDefault()
    updateSettings('account', accountForm)
  }

  const togglePermission = (key) => {
    updateSettings('permissions', { [key]: !settings.permissions[key] })
  }

  const toggleNotification = (key) => {
    updateSettings('notifications', { [key]: !settings.notifications[key] })
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="relative overflow-hidden rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_32px_70px_-40px_rgba(59,130,246,0.55)] backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/80">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white/40 to-purple-100/60 dark:from-slate-950/60 dark:via-slate-950/30 dark:to-slate-900/60" aria-hidden="true"></div>
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">Institution profile</p>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Customize how {profile.collegeName} appears</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Refresh fronts-facing information, contact routes, and student-facing permissions.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-500 shadow-inner shadow-blue-500/15 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-blue-200">
            <Icon name="settings" className="h-4 w-4" />
            Last synced automatically
          </span>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <form onSubmit={handleGeneralSubmit} className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_28px_60px_-38px_rgba(59,130,246,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">General information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">College name *</span>
              <input
                type="text"
                name="collegeName"
                value={generalForm.collegeName}
                onChange={handleGeneralChange}
                required
                className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Tagline</span>
              <input
                type="text"
                name="tagline"
                value={generalForm.tagline}
                onChange={handleGeneralChange}
                className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Website</span>
              <input
                type="url"
                name="website"
                value={generalForm.website}
                onChange={handleGeneralChange}
                placeholder="https://"
                className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Support email</span>
              <input
                type="email"
                name="supportEmail"
                value={generalForm.supportEmail}
                onChange={handleGeneralChange}
                placeholder="support@college.edu"
                className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
              />
            </label>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
            >
              <Icon name="save" className="h-4 w-4" />
              Save general details
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_28px_60px_-38px_rgba(129,140,248,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Wall visibility</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Control how your college wall appears to the EduConnect network.</p>
            <div className="mt-4 space-y-3">
              {['public', 'network', 'private'].map((privacy) => (
                <button
                  key={privacy}
                  type="button"
                  onClick={() => updateWallPrivacy(privacy)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    settings.wallPrivacy === privacy
                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-200'
                      : 'border-blue-100/70 text-slate-600 hover:border-blue-200 hover:bg-blue-50/60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="capitalize">{privacy}</span>
                  {settings.wallPrivacy === privacy && <Icon name="check" className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleAccountSubmit} className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_28px_60px_-38px_rgba(129,140,248,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Account & contact</h2>
            <div className="mt-4 space-y-4">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Primary email</span>
                <input
                  type="email"
                  name="contactEmail"
                  value={accountForm.contactEmail}
                  onChange={handleAccountChange}
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Contact phone</span>
                <input
                  type="tel"
                  name="contactPhone"
                  value={accountForm.contactPhone}
                  onChange={handleAccountChange}
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Timezone</span>
                <input
                  type="text"
                  name="timezone"
                  value={accountForm.timezone}
                  onChange={handleAccountChange}
                  placeholder="Asia/Kolkata"
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
              >
                <Icon name="save" className="h-4 w-4" />
                Save account
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_28px_60px_-38px_rgba(59,130,246,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Permissions</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Choose what representatives can manage.</p>
          <div className="mt-4 space-y-3">
            {[
              { key: 'allowEventCreation', label: 'Allow event creation', description: 'Representatives can create and update campus events.' },
              { key: 'allowWallPosting', label: 'Allow wall posting', description: 'Representatives can publish updates to the college wall.' },
              { key: 'allowCollabRequests', label: 'Allow collaboration requests', description: 'Representatives can initiate partnership drafts.' }
            ].map((permission) => (
              <div key={permission.key} className="flex items-start justify-between gap-4 rounded-2xl border border-blue-100/70 bg-white/80 px-5 py-4 shadow-inner shadow-blue-500/15 dark:border-slate-800/70 dark:bg-slate-900/70">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{permission.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{permission.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePermission(permission.key)}
                  className={`flex h-10 w-16 items-center rounded-full border px-1 transition ${
                    settings.permissions[permission.key]
                      ? 'border-blue-500 bg-blue-500 text-white justify-end'
                      : 'border-blue-200 bg-white text-blue-500 justify-start dark:border-slate-700 dark:bg-slate-900 dark:text-blue-200'
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-500 shadow dark:bg-slate-800 dark:text-blue-200">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_28px_60px_-38px_rgba(129,140,248,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notifications</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Decide how your team receives important alerts.</p>
          <div className="mt-4 space-y-3">
            {[
              { key: 'email', label: 'Email updates' },
              { key: 'sms', label: 'SMS notifications' },
              { key: 'push', label: 'Push notifications' },
              { key: 'weeklyDigest', label: 'Weekly digest summary' }
            ].map((notification) => (
              <label key={notification.key} className="flex items-center justify-between gap-3 rounded-2xl border border-blue-100/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-600 shadow-inner shadow-blue-500/15 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">
                <span>{notification.label}</span>
                <input
                  type="checkbox"
                  checked={settings.notifications[notification.key]}
                  onChange={() => toggleNotification(notification.key)}
                  className="h-5 w-5"
                />
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CollegeAdminSettings
