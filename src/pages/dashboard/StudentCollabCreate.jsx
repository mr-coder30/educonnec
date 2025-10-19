import React, { useMemo, useState } from 'react'

const categoryOptions = ['Hackathon', 'Project', 'Research', 'Study Group', 'Startup']

const skillsPalette = ['React', 'Node.js', 'Figma', 'TensorFlow', 'IoT', 'Unity', 'Solidity', 'Strategy', 'Marketing']

const StudentCollabCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Hackathon',
    skills: [],
    teamSize: 4,
    deadline: '',
    statusMessage: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasChanges = useMemo(() => {
    return formData.title || formData.description || formData.skills.length || formData.statusMessage
  }, [formData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(item => item !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData(prev => ({ ...prev, statusMessage: 'Collab draft saved locally (mock).' }))
    }, 600)
  }

  const previewDescription = formData.description || 'A concise summary will appear here once you start typing your collaboration brief.'

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-purple-200/70 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Create a collaboration</h1>
          <p className="text-sm text-white/80">
            Share your vision, outline key roles, and publish a collab brief to attract multi-campus talent.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-purple-100 bg-white/95 p-6 shadow-lg shadow-purple-500/10 dark:border-purple-900/30 dark:bg-slate-900">
          <div className="grid gap-5 lg:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
              Title
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Campus-wide innovation sprint"
                className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-inner shadow-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:border-purple-800 dark:bg-slate-950 dark:text-gray-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm font-medium text-purple-600 shadow-inner shadow-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:border-purple-800 dark:bg-slate-950 dark:text-purple-200"
              >
                {categoryOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              placeholder="Detail the mission, timeline, and collaboration expectations."
              className="w-full rounded-3xl border border-purple-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-800 shadow-inner shadow-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:border-purple-800 dark:bg-slate-950 dark:text-gray-100"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
              Skills required
              <div className="flex flex-wrap gap-2">
                {skillsPalette.map(skill => {
                  const isActive = formData.skills.includes(skill)
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                        isActive
                          ? 'border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/40'
                          : 'border-purple-200 bg-white text-purple-600 hover:border-purple-400 dark:border-purple-800 dark:bg-slate-950 dark:text-purple-200'
                      }`}
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Team size
                <input
                  type="number"
                  min={1}
                  max={24}
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-inner shadow-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:border-purple-800 dark:bg-slate-950 dark:text-gray-100"
                />
              </label>
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Deadline
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-inner shadow-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:border-purple-800 dark:bg-slate-950 dark:text-gray-100"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Preview updates live as you type.</span>
            <button
              type="submit"
              disabled={isSubmitting || !hasChanges}
              className={`w-full rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition sm:w-auto ${
                isSubmitting || !hasChanges ? 'opacity-60' : 'hover:-translate-y-0.5 hover:shadow-purple-500/50'
              }`}
            >
              {isSubmitting ? 'Posting…' : 'Create collab'}
            </button>
          </div>
          {formData.statusMessage && (
            <p className="rounded-2xl border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-600 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
              {formData.statusMessage}
            </p>
          )}
        </form>

        <aside className="space-y-4 rounded-[28px] border border-purple-100 bg-white/95 p-6 shadow-lg shadow-purple-500/10 dark:border-purple-900/30 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Preview</h2>
            <span className="rounded-full border border-purple-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-600 dark:border-purple-800 dark:text-purple-200">
              Live
            </span>
          </div>
          <div className="rounded-3xl border border-purple-200/70 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-5 text-gray-800 shadow-inner dark:border-purple-900/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-gray-100">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/60 text-sm font-semibold text-purple-600 dark:border-purple-500/40 dark:bg-purple-900/40 dark:text-purple-200">
                {formData.title ? formData.title.charAt(0).toUpperCase() : 'C'}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">You • Educonnect</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Creator</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {formData.title || 'Collab title preview'}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-500 dark:text-purple-300">
                {formData.category} • Team of {formData.teamSize}
              </p>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {previewDescription}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skills.length > 0 ? (
                  formData.skills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full border border-purple-300 bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600 dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 dark:text-gray-500">Add skills to highlight required expertise.</span>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{formData.deadline ? `Deadline: ${formData.deadline}` : 'Set a deadline to display timelines.'}</span>
                <span>Applications open</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
            >
              Post collab
            </button>
          </div>
        </aside>
      </div>

      <div className="rounded-[28px] border border-purple-100 bg-white/95 p-5 text-sm text-gray-500 shadow-inner shadow-purple-500/10 dark:border-purple-900/30 dark:bg-slate-900/80 dark:text-gray-300 sm:hidden">
        <p className="font-semibold text-gray-700 dark:text-gray-200">Preview</p>
        <p className="mt-2 text-xs">
          On mobile, the form appears first. Scroll to see the live preview of your collab brief.
        </p>
      </div>
    </div>
  )
}

export default StudentCollabCreate
