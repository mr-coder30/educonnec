import React, { useState, useEffect } from 'react'

const EditProfileModal = ({ isOpen, onClose, profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    college: '',
    department: '',
    bio: '',
    links: ''
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? '',
        username: profile.username ?? '',
        college: profile.college ?? '',
        department: profile.department ?? '',
        bio: profile.bio ?? '',
        links: profile.links ?? ''
      })
    }
  }, [profile])

  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Updated profile:', formData)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-2xl mx-4 sm:mx-0"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-lg" aria-hidden="true"></div>
        <div className="relative flex max-h-[90vh] flex-col overflow-hidden rounded-[2rem] border border-white/30 bg-white/95 shadow-2xl dark:border-slate-800/80 dark:bg-slate-950/90">
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6 space-y-6">
            <div className="sticky top-0 z-20 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b border-blue-100/60 bg-white/95 backdrop-blur sm:-mx-8 sm:px-8 dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:bg-blue-900/40 dark:text-blue-200">
                    Edit profile
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Update your presence
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Refresh your details so collaborators know what you are building next.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200/60 text-gray-400 transition hover:text-gray-600 dark:border-slate-800 dark:text-gray-300 dark:hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  College
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Department / Year
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Short bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
              />
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Summarize your mission, recent wins, or the collaborations you are looking for.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Links
              </label>
              <input
                type="text"
                name="links"
                value={formData.links}
                onChange={handleChange}
                placeholder="Portfolio, LinkedIn, or personal site"
                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-2xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 sm:w-auto dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:shadow-purple-500/50 sm:w-auto"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
