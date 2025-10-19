import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const statusClasses = {
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
  Declined: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200'
}

const filters = ['All', 'Pending', 'Approved', 'Declined']

const CollabRequests = () => {
  const { requests, respondToRequest } = useCollegeRepData()
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedRequest, setExpandedRequest] = useState(null)
  const [messageDrafts, setMessageDrafts] = useState({})

  const filteredRequests = useMemo(() => {
    if (activeFilter === 'All') return requests
    return requests.filter((request) => request.status === activeFilter)
  }, [activeFilter, requests])

  const handleRespond = (requestId, status) => {
    respondToRequest(requestId, status)
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/85 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Collaboration requests</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review and respond to invitations from partner colleges for joint events.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <Icon name="collabRequests" className="h-4 w-4" />
          {requests.filter((request) => request.status === 'Pending').length} pending
        </div>
      </header>

      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeFilter === filter
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-white/80 text-slate-500 hover:bg-white dark:bg-slate-900/70 dark:text-slate-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="overflow-x-auto rounded-[24px] border border-slate-100 bg-white/95 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-600 dark:divide-slate-800 dark:text-slate-300">
          <thead className="text-xs uppercase tracking-[0.3em] text-slate-400">
            <tr>
              <th className="px-6 py-4">College</th>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{request.college}</td>
                <td className="px-6 py-4">{request.event}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    View message
                    <Icon name={expandedRequest === request.id ? 'chevronDown' : 'chevronUp'} className="h-4 w-4" />
                  </button>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{new Date(request.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[request.status] || 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'}`}>{request.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRespond(request.id, 'Approved')}
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                    >
                      <Icon name="check" className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRespond(request.id, 'Declined')}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                    >
                      <Icon name="modalClose" className="h-4 w-4" />
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 lg:hidden">
        {filteredRequests.map((request) => (
          <div key={request.id} className="rounded-[24px] border border-slate-100 bg-white/95 p-5 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{request.event}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{request.college}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[request.status] || 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'}`}>{request.status}</span>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{new Date(request.date).toLocaleDateString()}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{request.message}</p>
            <div className="mt-4 space-y-2">
              <textarea
                rows={3}
                placeholder="Optional note back to the requester"
                value={messageDrafts[request.id] ?? ''}
                onChange={(event) => setMessageDrafts((prev) => ({ ...prev, [request.id]: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleRespond(request.id, 'Approved')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                >
                  <Icon name="check" className="h-4 w-4" />
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => handleRespond(request.id, 'Declined')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                >
                  <Icon name="modalClose" className="h-4 w-4" />
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {expandedRequest && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 px-4 py-6 backdrop-blur sm:items-center">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Request message</h3>
              <button
                type="button"
                onClick={() => setExpandedRequest(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon name="modalClose" className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
              {requests.find((request) => request.id === expandedRequest)?.message}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollabRequests
