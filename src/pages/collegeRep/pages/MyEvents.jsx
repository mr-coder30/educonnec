import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const statusFilters = ['Upcoming', 'Ongoing', 'Completed']
const eventTypes = ['Festival', 'Hackathon', 'Seminar', 'Workshop', 'Meetup']

const statusBadgeClasses = {
  Upcoming: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200',
  Ongoing: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
  Completed: 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'
}

const MyEvents = () => {
  const {
    events,
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent
  } = useCollegeRepData()

  const [activeFilter, setActiveFilter] = useState('Upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [formState, setFormState] = useState({
    title: '',
    type: eventTypes[0],
    date: '',
    status: 'Upcoming',
    participants: '',
    location: '',
    registrationLink: '',
    collaborators: '',
    description: ''
  })

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => (activeFilter ? event.status === activeFilter : true))
      .filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [activeFilter, events, searchQuery])

  const resetForm = () => {
    setFormState({
      title: '',
      type: eventTypes[0],
      date: '',
      status: 'Upcoming',
      participants: '',
      location: '',
      registrationLink: '',
      collaborators: '',
      description: ''
    })
    setSelectedEvent(null)
  }

  const openCreateModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (eventItem) => {
    setSelectedEvent(eventItem)
    setFormState({
      title: eventItem.title,
      type: eventItem.type,
      date: eventItem.date,
      status: eventItem.status,
      participants: String(eventItem.participants || ''),
      location: eventItem.location,
      registrationLink: eventItem.registrationLink || '',
      collaborators: (eventItem.collaborators || []).join('\n'),
      description: eventItem.description || ''
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const collaborators = formState.collaborators
      ? formState.collaborators.split('\n').map((line) => line.trim()).filter(Boolean)
      : []

    const payload = {
      title: formState.title,
      type: formState.type,
      date: formState.date,
      status: formState.status,
      participants: formState.participants,
      location: formState.location,
      registrationLink: formState.registrationLink,
      collaborators,
      description: formState.description
    }

    if (selectedEvent) {
      updateEvent(selectedEvent.id, payload)
    } else {
      createEvent(payload)
    }

    setIsModalOpen(false)
    resetForm()
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/85 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My events</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Launch, monitor, and share campus experiences with collaborators and students.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
        >
          <Icon name="plus" className="h-4 w-4" />
          Create event
        </button>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <Icon name="search" className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search event"
            className="ml-2 bg-transparent text-sm text-slate-600 focus:outline-none dark:text-slate-200"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                  : 'bg-white/80 text-slate-500 hover:bg-white dark:bg-slate-900/70 dark:text-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <section className="overflow-x-auto rounded-[24px] border border-slate-100 bg-white/95 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.3em] text-slate-400">
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Participants</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600 dark:divide-slate-800 dark:text-slate-300">
            {filteredEvents.map((eventItem) => (
              <tr key={eventItem.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 align-top">
                  <p className="font-semibold text-slate-900 dark:text-white">{eventItem.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{eventItem.location}</p>
                </td>
                <td className="px-6 py-4 align-top">{eventItem.type}</td>
                <td className="px-6 py-4 align-top">{new Date(eventItem.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 align-top">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses[eventItem.status]}`}>{eventItem.status}</span>
                </td>
                <td className="px-6 py-4 align-top">{eventItem.participants}</td>
                <td className="px-6 py-4 align-top">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(eventItem)}
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                    >
                      <Icon name="edit" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => updateEventStatus(eventItem.id, eventItem.status === 'Completed' ? 'Upcoming' : 'Completed')}
                      className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-200"
                    >
                      <Icon name="arrowRight" className="h-4 w-4" />
                      {eventItem.status === 'Completed' ? 'Mark upcoming' : 'Mark complete'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEvent(eventItem.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                    >
                      <Icon name="modalClose" className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 lg:hidden">
        {filteredEvents.map((eventItem) => (
          <div key={eventItem.id} className="rounded-[24px] border border-slate-100 bg-white/95 p-5 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{eventItem.type}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{eventItem.title}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses[eventItem.status]}`}>{eventItem.status}</span>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{eventItem.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2"><Icon name="calendar" className="h-4 w-4" />{new Date(eventItem.date).toLocaleDateString()}</span>
              <span className="inline-flex items-center gap-2"><Icon name="marker" className="h-4 w-4" />{eventItem.location}</span>
              <span className="inline-flex items-center gap-2"><Icon name="teams" className="h-4 w-4" />{eventItem.participants} participants</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {eventItem.collaborators?.map((collaborator) => (
                <span key={collaborator} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">{collaborator}</span>
              ))}
            </div>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={() => openEditModal(eventItem)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
              >
                <Icon name="edit" className="h-4 w-4" />
                Edit event
              </button>
              <button
                type="button"
                onClick={() => updateEventStatus(eventItem.id, eventItem.status === 'Completed' ? 'Upcoming' : 'Completed')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-200"
              >
                <Icon name="arrowRight" className="h-4 w-4" />
                {eventItem.status === 'Completed' ? 'Mark upcoming' : 'Mark complete'}
              </button>
              <button
                type="button"
                onClick={() => deleteEvent(eventItem.id)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
              >
                <Icon name="modalClose" className="h-4 w-4" />
                Delete event
              </button>
            </div>
          </div>
        ))}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedEvent ? 'Edit event' : 'Create event'}</h3>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon name="modalClose" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Event title</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Type</label>
                  <select
                    value={formState.type}
                    onChange={(event) => setFormState((prev) => ({ ...prev, type: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Date</label>
                  <input
                    type="date"
                    required
                    value={formState.date}
                    onChange={(event) => setFormState((prev) => ({ ...prev, date: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Status</label>
                  <select
                    value={formState.status}
                    onChange={(event) => setFormState((prev) => ({ ...prev, status: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {statusFilters.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Participants</label>
                  <input
                    type="number"
                    min="0"
                    value={formState.participants}
                    onChange={(event) => setFormState((prev) => ({ ...prev, participants: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Description</label>
                <textarea
                  rows={4}
                  value={formState.description}
                  onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Location</label>
                  <input
                    type="text"
                    value={formState.location}
                    onChange={(event) => setFormState((prev) => ({ ...prev, location: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Registration link</label>
                  <input
                    type="url"
                    value={formState.registrationLink}
                    onChange={(event) => setFormState((prev) => ({ ...prev, registrationLink: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Collaborators (one per line)</label>
                <textarea
                  rows={3}
                  value={formState.collaborators}
                  onChange={(event) => setFormState((prev) => ({ ...prev, collaborators: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
                >
                  <Icon name="plus" className="h-4 w-4" />
                  {selectedEvent ? 'Save changes' : 'Publish event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyEvents
