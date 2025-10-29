import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeAdminData } from '../../../context/AdminDataContext'

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'Active', label: 'Active' },
  { id: 'Proposed', label: 'Proposed' },
  { id: 'Completed', label: 'Completed' }
]

const emptyCollab = {
  partnerCollege: '',
  event: '',
  duration: '',
  contact: '',
  status: 'Proposed'
}

const CollegeAdminCollaborations = () => {
  const {
    collaborations,
    requestCollaboration,
    updateCollaborationStatus,
    deleteCollaboration
  } = useCollegeAdminData()

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyCollab)

  const stats = useMemo(() => {
    const totals = collaborations.reduce((acc, collab) => {
      acc[collab.status] = (acc[collab.status] ?? 0) + 1
      return acc
    }, { Active: 0, Proposed: 0, Completed: 0 })
    return {
      total: collaborations.length,
      active: totals.Active,
      proposed: totals.Proposed,
      completed: totals.Completed
    }
  }, [collaborations])

  const filteredCollabs = useMemo(() => {
    return collaborations
      .filter((collab) => (filter === 'all' ? true : collab.status === filter))
      .filter((collab) => {
        if (!search.trim()) return true
        const target = `${collab.partnerCollege} ${collab.event} ${collab.contact}`.toLowerCase()
        return target.includes(search.trim().toLowerCase())
      })
  }, [collaborations, filter, search])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.partnerCollege.trim() || !form.event.trim()) return

    requestCollaboration({
      partnerCollege: form.partnerCollege.trim(),
      event: form.event.trim(),
      duration: form.duration.trim() || 'TBD',
      contact: form.contact.trim() || 'info@college.edu'
    })

    setShowForm(false)
    setForm(emptyCollab)
  }

  const handleStatusChange = (collabId, nextStatus) => {
    updateCollaborationStatus(collabId, nextStatus)
  }

  const handleDelete = (collabId) => {
    if (window.confirm('Remove this collaboration from the tracker?')) {
      deleteCollaboration(collabId)
    }
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="w-full">
        <div className="relative overflow-hidden rounded-[36px] border border-blue-100/70 bg-white/90 p-6 shadow-[0_36px_80px_-42px_rgba(59,130,246,0.6)] backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_55%)] opacity-80 dark:bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.25),_transparent_55%)]" aria-hidden="true"></div>
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-blue-500 dark:border-blue-500/40 dark:bg-blue-900/30 dark:text-blue-200">
                <Icon name="collaboration" className="h-4 w-4" /> Partner network
              </p>
              <h1 className="text-2xl font-semibold leading-snug text-slate-900 dark:text-white sm:text-3xl">Build alliances that multiply campus impact</h1>
              <p className="max-w-xl text-sm text-slate-500 dark:text-slate-300">Track every proposal, nurture active programs, and celebrate the collabs that delivered lasting value.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
            >
              <Icon name="plus" className="h-4 w-4" />
              Draft partnership
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[{
              label: 'Total collaborations',
              value: stats.total,
              icon: 'collaboration'
            }, {
              label: 'Active',
              value: stats.active,
              icon: 'sparkles'
            }, {
              label: 'Proposed',
              value: stats.proposed,
              icon: 'studentCollab'
            }, {
              label: 'Completed',
              value: stats.completed,
              icon: 'badge'
            }].map((card) => (
              <div key={card.label} className="relative overflow-hidden rounded-2xl border border-blue-100/60 bg-white/85 px-4 py-4 shadow-inner shadow-blue-500/20 transition hover:-translate-y-1 hover:border-blue-200 dark:border-slate-800/60 dark:bg-slate-900/75">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)] opacity-70" aria-hidden="true"></div>
                <div className="relative z-10 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200">
                    <Icon name={card.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{card.label}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-blue-100/60 bg-white/80 px-4 py-4 shadow-inner shadow-blue-500/20 dark:border-slate-800/70 dark:bg-slate-900/70 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 rounded-2xl border border-blue-100/60 bg-white/70 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-800/70 dark:bg-slate-900/70">
              <Icon name="search" className="h-4 w-4 text-blue-500" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search partners or initiatives"
                className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {statusFilters.map((status) => (
                <button
                  key={status.id}
                  type="button"
                  onClick={() => setFilter(status.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    filter === status.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'border border-blue-100/70 text-blue-500 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {filteredCollabs.length === 0 ? (
              <div className="rounded-2xl border border-blue-100/60 bg-white/70 px-6 py-8 text-center text-sm text-slate-500 shadow-inner shadow-blue-500/15 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">
                No collaborations match the current filters. Try adjusting filters or draft a new partnership.
              </div>
            ) : (
              filteredCollabs.map((collab) => (
                <article key={collab.id} className="flex h-full flex-col gap-4 rounded-2xl border border-blue-100/60 bg-white/85 p-5 shadow-inner shadow-blue-500/15 transition hover:-translate-y-1 hover:border-blue-200 dark:border-slate-800/70 dark:bg-slate-900/75">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">
                        <span>{collab.partnerCollege}</span>
                        <span className="text-blue-200 dark:text-blue-700">•</span>
                        <span className="text-[11px] normal-case text-slate-400 dark:text-slate-500">{collab.duration}</span>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{collab.event}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-300">{collab.contact}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <div className={`rounded-full px-3 py-1 ${
                        collab.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-200'
                          : collab.status === 'Proposed'
                            ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200'
                            : 'bg-slate-500/10 text-slate-600 dark:bg-slate-900/40 dark:text-slate-200'
                      }`}> {collab.status}</div>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(collab.id, collab.status === 'Active' ? 'Completed' : collab.status === 'Proposed' ? 'Active' : 'Active')}
                        className="rounded-2xl border border-blue-200/70 px-3 py-1 text-blue-600 transition hover:border-blue-300 hover:bg-white dark:border-blue-500/40 dark:text-blue-200"
                      >
                        Mark as {collab.status === 'Proposed' ? 'Active' : collab.status === 'Active' ? 'Completed' : 'Active'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(collab.id)}
                        className="rounded-2xl border border-slate-200/70 px-3 py-1 text-slate-500 transition hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:text-slate-300"
                      >
                        Remove
                      </button>
                    </div>
                  </header>
                </article>
              ))
            )}
          </div>
        </div>

      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-24 backdrop-blur-md lg:pl-72 lg:pt-16">
          <div className="absolute inset-0" onClick={() => { setShowForm(false); setForm(emptyCollab) }} />
          <div className="relative w-full max-w-2xl rounded-[28px] border border-blue-100/70 bg-white p-8 shadow-[0_40px_100px_-60px_rgba(59,130,246,0.8)] dark:border-slate-800/70 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setForm(emptyCollab)
              }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              aria-label="Close modal"
            >
              <Icon name="modalClose" className="h-5 w-5" />
            </button>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Draft new collaboration</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Connect with partner institutions to expand your campus impact.</p>
            </div>
            <form onSubmit={handleSubmit} className="max-h-[calc(100vh-240px)] space-y-4 overflow-y-auto pr-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Partner college *</span>
                <input
                  type="text"
                  name="partnerCollege"
                  value={form.partnerCollege}
                  onChange={handleFormChange}
                  required
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Joined program *</span>
                <input
                  type="text"
                  name="event"
                  value={form.event}
                  onChange={handleFormChange}
                  required
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Timeline</span>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleFormChange}
                  placeholder="Oct 2025 – Dec 2025"
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Point of contact</span>
                <input
                  type="email"
                  name="contact"
                  value={form.contact}
                  onChange={handleFormChange}
                  placeholder="partnerships@college.edu"
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
                >
                  <Icon name="plus" className="h-4 w-4" />
                  Add collaboration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollegeAdminCollaborations
