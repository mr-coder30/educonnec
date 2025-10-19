import React, { useMemo, useState } from 'react'

const ownedCollabs = [
  {
    id: 'xr-studio',
    title: 'XR Futures Studio',
    status: 'Open',
    category: 'Hackathon',
    deadline: '2025-12-12',
    description: 'Crafting immersive AR/VR demos for the innovation expo. Seeking shader experts and storytellers.',
    members: ['Hailey', 'Jordan', 'Priya']
  },
  {
    id: 'open-source',
    title: 'Open Source Campus',
    status: 'Open',
    category: 'Project',
    deadline: '2025-11-30',
    description: 'Maintaining shared campus libraries with CI/CD workflows. Looking for docs champions and maintainers.',
    members: ['Aarya', 'Leo', 'Fatima', 'Sasha']
  },
  {
    id: 'ai-safety',
    title: 'Campus AI Safety Council',
    status: 'Closed',
    category: 'Research',
    deadline: '2025-10-01',
    description: 'Drafting AI safety best practices and publishing open guidelines across universities.',
    members: ['Zara', 'Mateo']
  }
]

const categoryOptions = ['Hackathon', 'Project', 'Research', 'Study Group', 'Startup']
const statusOptions = ['Open', 'Closed']

const StudentCollabSettings = () => {
  const [selectedId, setSelectedId] = useState(ownedCollabs[0]?.id ?? null)
  const [formState, setFormState] = useState(() => ownedCollabs[0] ?? {})
  const [initialState, setInitialState] = useState(() => ownedCollabs[0] ?? {})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const selectedCollab = useMemo(() => ownedCollabs.find(collab => collab.id === selectedId), [selectedId])

  const hasChanges = useMemo(() => {
    return JSON.stringify(formState) !== JSON.stringify(initialState)
  }, [formState, initialState])

  const handleSelectChange = (event) => {
    const nextId = event.target.value
    setSelectedId(nextId)
    const nextCollab = ownedCollabs.find(collab => collab.id === nextId)
    if (nextCollab) {
      setFormState(nextCollab)
      setInitialState(nextCollab)
      setStatusMessage('')
    }
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleMemberAdd = () => {
    const placeholder = `Member ${formState.members.length + 1}`
    setFormState(prev => ({ ...prev, members: [...prev.members, placeholder] }))
  }

  const handleMemberRemove = (member) => {
    setFormState(prev => ({ ...prev, members: prev.members.filter(name => name !== member) }))
  }

  const handleSave = (event) => {
    event.preventDefault()
    if (!hasChanges) return
    setInitialState(formState)
    setStatusMessage('Changes saved locally (mock).')
  }

  if (!selectedCollab) {
    return (
      <div className="mx-auto max-w-4xl rounded-[28px] border border-blue-100 bg-white/95 p-6 text-sm text-gray-600 shadow-inner shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:text-gray-300">
        No owned collaborations yet. Create one to access settings.
      </div>
    )
  }

  return (
    <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 sm:px-0">
      <div className="rounded-[28px] border border-blue-200/70 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-lg sm:p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Collab settings</h1>
          <p className="text-sm text-white/80">Manage the workstreams you lead — rename, adjust scope, update status, and keep collaborators in sync.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 rounded-[28px] border border-blue-100 bg-white/95 p-6 shadow-lg shadow-blue-500/10 dark:border-blue-900/30 dark:bg-slate-900">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_200px]">
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Manage collab
            <select
              value={selectedId}
              onChange={handleSelectChange}
              className="w-full rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-600 shadow-inner shadow-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-blue-800 dark:bg-slate-950 dark:text-blue-200"
            >
              {ownedCollabs.map(collab => (
                <option key={collab.id} value={collab.id}>
                  {collab.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Status
            <select
              name="status"
              value={formState.status}
              onChange={handleFieldChange}
              className="w-full rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-600 shadow-inner shadow-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-blue-800 dark:bg-slate-950 dark:text-blue-200"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
          Title
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleFieldChange}
            className="w-full rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-inner shadow-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-blue-800 dark:bg-slate-950 dark:text-gray-100"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
          Description
          <textarea
            name="description"
            value={formState.description}
            onChange={handleFieldChange}
            rows={4}
            className="w-full rounded-3xl border border-blue-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-800 shadow-inner shadow-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-blue-800 dark:bg-slate-950 dark:text-gray-100"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Category
            <select
              name="category"
              value={formState.category}
              onChange={handleFieldChange}
              className="w-full rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-600 shadow-inner shadow-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-blue-800 dark:bg-slate-950 dark:text-blue-200"
            >
              {categoryOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Deadline
            <input
              type="date"
              name="deadline"
              value={formState.deadline}
              onChange={handleFieldChange}
              className="w-full rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-inner shadow-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-blue-800 dark:bg-slate-950 dark:text-gray-100"
            />
          </label>
        </div>

        <div className="space-y-3 rounded-3xl border border-blue-100/70 bg-blue-50/80 p-5 text-sm text-blue-700 shadow-inner dark:border-blue-900/40 dark:bg-blue-900/30 dark:text-blue-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide">Members</p>
            <button
              type="button"
              onClick={handleMemberAdd}
              className="rounded-full border border-blue-300 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:border-blue-400 hover:bg-white dark:border-blue-600 dark:bg-blue-900/50 dark:text-blue-200"
            >
              Add member
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formState.members.map(member => (
              <span
                key={member}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-600/50 dark:bg-blue-900/40 dark:text-blue-200"
              >
                {member}
                <button type="button" onClick={() => handleMemberRemove(member)} className="text-blue-400 hover:text-blue-600">×</button>
              </span>
            ))}
            {formState.members.length === 0 && (
              <span className="text-xs text-blue-400">No members added yet.</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {hasChanges ? 'Unsaved changes detected.' : 'All changes synced.'}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:border-rose-400 hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10"
            >
              Delete collab
            </button>
            <button
              type="submit"
              disabled={!hasChanges}
              className={`rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition ${
                hasChanges ? 'hover:-translate-y-0.5 hover:shadow-blue-500/50' : 'opacity-60'
              }`}
            >
              Save changes
            </button>
          </div>
        </div>
        {statusMessage && (
          <p className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            {statusMessage}
          </p>
        )}
      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md space-y-4 rounded-3xl border border-rose-200 bg-white p-6 text-sm text-gray-600 shadow-2xl dark:border-rose-500/40 dark:bg-slate-900 dark:text-gray-300">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delete this collab?</h2>
            <p>Removing `{formState.title}` will archive access for all members. This is a mock action — no data will be lost.</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-400 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false)
                  setStatusMessage('Delete collab triggered (mock).')
                }}
                className="rounded-2xl border border-rose-300 bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
              >
                Delete collab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentCollabSettings
