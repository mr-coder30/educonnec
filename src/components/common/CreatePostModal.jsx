import React, { useState } from 'react'

const CreatePostModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    eventName: '',
    collegeName: '',
    image: null,
    websiteUrl: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const categories = [
    'Hackathon',
    'Workshop',
    'Technical Fest',
    'Cultural Fest',
    'Conference',
    'Seminar',
    'Competition',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Post data:', formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-xl mx-4 sm:mx-0"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-lg" aria-hidden="true"></div>
        <div className="relative flex max-h-[90vh] flex-col overflow-hidden rounded-[2rem] border border-white/30 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/90 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6 space-y-6">
            <div className="sticky top-0 z-20 -mx-6 sm:-mx-8 -mt-6 px-6 sm:px-8 pt-6 pb-4 border-b border-blue-100/60 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    New spotlight
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create an event post
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Share an upcoming opportunity with the Educonnec community.
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
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                  Category *
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    📂
                  </span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-9 py-3 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                College / Organization Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                  Website URL
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                  Upload cover image
                </label>
                <label className="flex h-16 cursor-pointer items-center justify-between rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 px-4 text-sm font-medium text-blue-600 transition hover:border-blue-300 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📷</span>
                    {formData.image ? formData.image.name : 'Tap to add image'}
                  </span>
                  <span className="text-xs uppercase tracking-wide">Browse</span>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 block">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Highlight what makes this experience special. Markdown supported soon.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto rounded-2xl border border-gray-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:shadow-purple-500/50"
              >
                Publish spotlight
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal