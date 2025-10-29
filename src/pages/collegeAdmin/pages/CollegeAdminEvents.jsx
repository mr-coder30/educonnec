import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeAdminData } from '../../../context/AdminDataContext'

const statuses = [
  { id: 'all', label: 'All statuses' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'past', label: 'Completed' }
]

const emptyEvent = {
  title: '',
  type: 'Workshop',
  date: '',
  timeframe: '',
  participants: '',
  status: 'upcoming',
  poster: ''
}

const CollegeAdminEvents = () => {
  const {
    events,
    createEvent,
    updateEventStatus,
    deleteEvent,
    editEvent
  } = useCollegeAdminData()

  const [filter, setFilter] = useState('upcoming')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [form, setForm] = useState(emptyEvent)

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => (filter === 'all' ? true : event.status === filter))
      .filter((event) => {
        if (!search.trim()) return true
        const target = `${event.title} ${event.type} ${event.timeframe}`.toLowerCase()
        return target.includes(search.trim().toLowerCase())
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [events, filter, search])

  const stats = useMemo(() => {
    const totals = events.reduce((acc, event) => {
      acc[event.status] = (acc[event.status] ?? 0) + 1
      return acc
    }, { upcoming: 0, ongoing: 0, past: 0 })
    const audience = events.reduce((sum, event) => sum + (Number(event.participants) || 0), 0)
    return {
      total: events.length,
      audience,
      upcoming: totals.upcoming,
      ongoing: totals.ongoing,
      past: totals.past
    }
  }, [events])

  const resetForm = () => {
    setForm(emptyEvent)
    setEditingEvent(null)
  }

  const openCreate = () => {
    resetForm()
    setShowForm(true)
  }

  const openEdit = (event) => {
    setEditingEvent(event)
    setForm({
      title: event.title,
      type: event.type,
      date: event.date,
      timeframe: event.timeframe,
      participants: event.participants.toString(),
      status: event.status,
      poster: event.poster ?? ''
    })
    setShowForm(true)
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.date) return

    const payload = {
      title: form.title.trim(),
      type: form.type.trim() || 'Workshop',
      date: form.date,
      timeframe: form.timeframe.trim() || new Date(form.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      participants: Number(form.participants) || 0,
      status: form.status,
      poster: form.poster.trim() || undefined
    }

    if (editingEvent) {
      editEvent(editingEvent.id, payload)
    } else {
      createEvent(payload)
    }

    setShowForm(false)
    resetForm()
  }

  const handleStatusChange = (eventId, nextStatus) => {
    updateEventStatus(eventId, nextStatus)
  }

  const handleDelete = (eventId) => {
    if (window.confirm('Remove this event from the schedule?')) {
      deleteEvent(eventId)
    }
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="w-full">
        <div className="relative overflow-hidden rounded-[36px] border border-blue-100/70 bg-white/90 p-6 shadow-[0_36px_80px_-42px_rgba(59,130,246,0.6)] backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_55%)] opacity-80 dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.25),_transparent_55%)]" aria-hidden="true"></div>
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-blue-500 dark:border-blue-500/40 dark:bg-blue-900/30 dark:text-blue-200">
                <Icon name="calendar" className="h-3.5 w-3.5" /> Event board
              </p>
              <h1 className="text-2xl font-semibold leading-snug text-slate-900 dark:text-white sm:text-3xl">Curate, launch, and celebrate every campus moment</h1>
              <p className="max-w-xl text-sm text-slate-500 dark:text-slate-300">Spotlight signature programs, move ideas from planning to production, and keep stakeholders aligned with live status tracking.</p>
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-purple-500/30"
            >
              <Icon name="plus" className="h-4 w-4" />
              Schedule event
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[{
              label: 'Total events',
              value: stats.total,
              icon: 'calendar'
            }, {
              label: 'Upcoming',
              value: stats.upcoming,
              icon: 'sparkles'
            }, {
              label: 'Ongoing',
              value: stats.ongoing,
              icon: 'signal'
            }, {
              label: 'Audience reached',
              value: stats.audience,
              icon: 'growth'
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
                placeholder="Search event or track"
                className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {statuses.map((status) => (
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
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-blue-100/60 bg-white/70 px-6 py-8 text-center text-sm text-slate-500 shadow-inner shadow-blue-500/15 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">
                No events match the current filters. Try adjusting the status or search keywords.
              </div>
            ) : (
              filteredEvents.map((event) => (
                <article key={event.id} className="flex h-full flex-col gap-4 rounded-2xl border border-blue-100/60 bg-white/85 p-5 shadow-inner shadow-blue-500/15 transition hover:-translate-y-1 hover:border-blue-200 dark:border-slate-800/70 dark:bg-slate-900/75">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">
                        <span>{event.type}</span>
                        <span className="text-blue-200 dark:text-blue-700">•</span>
                        <time dateTime={event.date} className="text-[11px] normal-case text-slate-400 dark:text-slate-500">
                          {new Date(event.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{event.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-300">{event.timeframe}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <div className={`rounded-full px-3 py-1 ${
                        event.status === 'upcoming'
                          ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200'
                          : event.status === 'ongoing'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-200'
                            : 'bg-slate-500/10 text-slate-600 dark:bg-slate-900/40 dark:text-slate-200'
                      }`}> {event.status}</div>
                      <span className="rounded-full border border-blue-100/60 px-3 py-1 text-slate-500 dark:border-slate-800/70 dark:text-slate-300">
                        {event.participants} registered
                      </span>
                    </div>
                  </header>

                  {event.poster && (
                    <div className="overflow-hidden rounded-2xl border border-blue-100/60 shadow-inner shadow-blue-500/20 dark:border-slate-800/70">
                      <img src={event.poster} alt={event.title} className="h-52 w-full object-cover" />
                    </div>
                  )}

                  <footer className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                    <div className="flex items-center gap-2 rounded-2xl border border-blue-100/60 px-3 py-1 text-blue-500 dark:border-blue-500/40 dark:text-blue-200">
                      <Icon name="calendar" className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(event.id, event.status === 'upcoming' ? 'ongoing' : event.status === 'ongoing' ? 'past' : 'upcoming')}
                      className="rounded-2xl border border-blue-200/70 px-3 py-1 text-blue-600 transition hover:border-blue-300 hover:bg-white dark:border-blue-500/40 dark:text-blue-200"
                    >
                      Mark as {event.status === 'upcoming' ? 'Ongoing' : event.status === 'ongoing' ? 'Completed' : 'Upcoming'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(event)}
                      className="rounded-2xl border border-purple-200/70 px-3 py-1 text-purple-600 transition hover:border-purple-300 hover:bg-white dark:border-purple-600/40 dark:text-purple-200"
                    >
                      Edit details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(event.id)}
                      className="rounded-2xl border border-slate-200/70 px-3 py-1 text-slate-500 transition hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:text-slate-300"
                    >
                      Remove event
                    </button>
                  </footer>
                </article>
              ))
            )}
          </div>
        </div>

      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-24 backdrop-blur-md lg:pl-72 lg:pt-16">
          <div className="absolute inset-0" onClick={() => { setShowForm(false); resetForm() }} />
          <div className="relative w-full max-w-2xl rounded-[28px] border border-blue-100/70 bg-white p-8 shadow-[0_40px_100px_-60px_rgba(59,130,246,0.8)] dark:border-slate-800/70 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                resetForm()
              }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              aria-label="Close modal"
            >
              <Icon name="modalClose" className="h-5 w-5" />
            </button>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{editingEvent ? 'Edit event' : 'Schedule new event'}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill in the details to {editingEvent ? 'update' : 'create'} your campus event.</p>
            </div>
            <form onSubmit={handleSubmit} className="max-h-[calc(100vh-240px)] space-y-4 overflow-y-auto pr-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Event title *</span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  required
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Type *</span>
                  <input
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleFormChange}
                    className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Event date *</span>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Time / venue</span>
                  <input
                    type="text"
                    name="timeframe"
                    value={form.timeframe}
                    onChange={handleFormChange}
                    placeholder="Nov 04 • Innovation Lab"
                    className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Expected participants</span>
                  <input
                    type="number"
                    min="0"
                    name="participants"
                    value={form.participants}
                    onChange={handleFormChange}
                    className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Status *</span>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="past">Completed</option>
                </select>
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Poster URL</span>
                <input
                  type="url"
                  name="poster"
                  value={form.poster}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    resetForm()
                  }}
                  className="rounded-2xl border border-blue-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-white dark:border-blue-500/40 dark:bg-transparent dark:text-blue-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
                >
                  <Icon name={editingEvent ? 'edit' : 'plus'} className="h-4 w-4" />
                  {editingEvent ? 'Save changes' : 'Create event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollegeAdminEvents
