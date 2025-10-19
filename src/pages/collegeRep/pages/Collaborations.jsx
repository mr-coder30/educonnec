import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const tabs = ['All', 'Pending', 'Active', 'Past']

const statusPillMap = {
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
  Past: 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'
}

const Collaborations = () => {
  const {
    collaborations,
    createCollaboration,
    updateCollaborationStatus
  } = useCollegeRepData()

  const [activeTab, setActiveTab] = useState('All')
  const [isRequestSheetOpen, setIsRequestSheetOpen] = useState(false)
  const [formState, setFormState] = useState({
    partner: '',
    event: '',
    timeline: '',
    notes: ''
  })

  const filteredCollaborations = useMemo(() => {
    if (activeTab === 'All') return collaborations
    return collaborations.filter((collab) => collab.status === activeTab)
  }, [activeTab, collaborations])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formState.partner || !formState.event) return
    createCollaboration(formState)
    setFormState({ partner: '', event: '', timeline: '', notes: '' })
    setIsRequestSheetOpen(false)
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/85 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Collaborations</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Build inter-college partnerships and keep incoming requests organized.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsRequestSheetOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5"
        >
          <Icon name="plus" className="h-4 w-4" />
          Request collaboration
        </button>
      </header>

      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                : 'bg-white/80 text-slate-500 hover:bg-white dark:bg-slate-900/70 dark:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCollaborations.map((collab) => (
          <div
            key={collab.id}
            className="flex h-full flex-col rounded-[24px] border border-slate-100 bg-white/95 p-5 shadow-lg shadow-slate-200/30 transition hover:-translate-y-1 hover:shadow-purple-200/40 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Partner college</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{collab.partner}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{collab.event}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPillMap[collab.status]}`}>{collab.status}</span>
            </div>

            <p className="mt-4 flex-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-4">{collab.notes || 'No additional notes provided.'}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
              {collab.status === 'Pending' && (
                <>
                  <button
                    type="button"
                    onClick={() => updateCollaborationStatus(collab.id, 'Active')}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                  >
                    <Icon name="check" className="h-4 w-4" />
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCollaborationStatus(collab.id, 'Past')}
                    className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-rose-700 transition hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                  >
                    <Icon name="modalClose" className="h-4 w-4" />
                    Decline
                  </button>
                </>
              )}
              {collab.status === 'Active' && (
                <button
                  type="button"
                  onClick={() => updateCollaborationStatus(collab.id, 'Past')}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Icon name="arrowRight" className="h-4 w-4" />
                  Mark as past
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      {isRequestSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur sm:items-center">
          <div className="w-full rounded-t-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:max-w-xl sm:rounded-3xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Request collaboration</h3>
              <button
                type="button"
                onClick={() => setIsRequestSheetOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon name="modalClose" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Partner college</label>
                <input
                  type="text"
                  required
                  value={formState.partner}
                  onChange={(event) => setFormState((prev) => ({ ...prev, partner: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Event</label>
                <input
                  type="text"
                  required
                  value={formState.event}
                  onChange={(event) => setFormState((prev) => ({ ...prev, event: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Timeline</label>
                <input
                  type="text"
                  value={formState.timeline}
                  onChange={(event) => setFormState((prev) => ({ ...prev, timeline: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Message / notes</label>
                <textarea
                  rows={4}
                  value={formState.notes}
                  onChange={(event) => setFormState((prev) => ({ ...prev, notes: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsRequestSheetOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5"
                >
                  <Icon name="plus" className="h-4 w-4" />
                  Send request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Collaborations
