import React, { useMemo, useState } from 'react'

const eventsCatalogue = [
  {
    id: 'ev-1',
    title: 'Techfest 2025',
    dateRange: 'Mar 12-14, 2025',
    status: 'Upcoming',
    banner: '/events/techfest-banner.jpg',
    college: 'IIT Bombay',
    summary: 'Asia’s largest student-led science and technology festival with 60+ tracks.',
    accent: 'from-orange-500 via-amber-500 to-yellow-400'
  },
  {
    id: 'ev-2',
    title: 'Sustainable AI Summit',
    dateRange: 'Live now',
    status: 'Ongoing',
    banner: '/events/ai-summit.jpg',
    college: 'MIT',
    summary: 'Workshops and panels focused on energy-aware ML systems.',
    accent: 'from-green-500 via-emerald-500 to-teal-500'
  },
  {
    id: 'ev-3',
    title: 'Campus Cultural Fest',
    dateRange: 'Feb 01-03, 2025',
    status: 'Upcoming',
    banner: '/events/cultural-fest.jpg',
    college: 'UCLA',
    summary: 'A global celebration of art, dance, music, and food with exchange teams.',
    accent: 'from-pink-500 via-rose-500 to-purple-500'
  },
  {
    id: 'ev-4',
    title: 'AI for Social Good Hackathon',
    dateRange: 'Nov 2024',
    status: 'Past',
    banner: '/events/hackmit.jpg',
    college: 'MIT',
    summary: '24-hour sprint that produced civic tech prototypes for local partners.',
    accent: 'from-blue-600 via-indigo-600 to-purple-600'
  },
  {
    id: 'ev-5',
    title: 'Smart City Systems Lab',
    dateRange: 'Mar 01-28, 2025',
    status: 'Ongoing',
    banner: '/events/smart-city.jpg',
    college: 'NTU Singapore',
    summary: 'Hands-on weekly builds for IoT and data infrastructure in urban spaces.',
    accent: 'from-cyan-500 via-sky-500 to-blue-500'
  }
]

const tabs = ['All', 'Ongoing', 'Upcoming', 'Past']

const statusBadge = {
  Ongoing: 'bg-emerald-100 text-emerald-600 border-emerald-300',
  Upcoming: 'bg-amber-100 text-amber-600 border-amber-300',
  Past: 'bg-slate-100 text-slate-600 border-slate-300'
}

const CollegesEvents = () => {
  const [activeTab, setActiveTab] = useState('All')

  const filteredEvents = useMemo(() => {
    if (activeTab === 'All') return eventsCatalogue
    return eventsCatalogue.filter(event => event.status === activeTab)
  }, [activeTab])

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-20 sm:px-6 lg:px-8">
      <header className="rounded-[28px] border border-rose-200/70 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 p-6 text-white shadow-lg sm:p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">Plan your calendar</p>
          <h1 className="text-3xl font-bold">My college events</h1>
          <p className="text-sm text-white/85 sm:text-base">Filter upcoming, ongoing, and past showcases from your campus and partner colleges.</p>
        </div>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-rose-100 bg-white/95 p-1 text-sm font-semibold text-rose-500 shadow-sm shadow-rose-500/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-rose-900/40 dark:bg-slate-900/80 dark:text-rose-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-full px-5 py-2 transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white shadow-md shadow-rose-500/30'
                  : 'text-rose-500 dark:text-rose-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-full border border-rose-100 bg-white px-4 py-2 text-xs font-semibold text-rose-500 shadow-sm transition hover:border-rose-300 hover:bg-rose-50 dark:border-rose-900/40 dark:bg-slate-900/80 dark:text-rose-200"
        >
          📅 Add to calendar
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {filteredEvents.map((event) => (
          <article
            key={event.id}
            className="group relative flex flex-col overflow-hidden rounded-[28px] border border-rose-100 bg-white/95 shadow-sm shadow-rose-500/10 transition hover:-translate-y-1 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/30 dark:border-rose-900/40 dark:bg-slate-900"
          >
            <div className="relative h-48 overflow-hidden sm:h-44">
              {event.banner ? (
                <img src={event.banner} alt={event.title} className="h-full w-full object-cover transition duration-200 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-slate-500 to-slate-700 text-white">Event visual</div>
              )}
              <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusBadge[event.status] ?? 'bg-slate-100 text-slate-600 border-slate-300'}`}>
                {event.status}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                <p className="text-xs uppercase tracking-wide text-rose-500 dark:text-rose-300">{event.dateRange}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{event.summary}</p>
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  <span>{event.college}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 px-3 py-1 text-[10px] text-white shadow-sm">Featured</span>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-500 transition hover:border-rose-400 hover:bg-rose-50 dark:border-rose-900/40 dark:bg-slate-900/80 dark:text-rose-200"
                >
                  View details
                </button>
              </div>
            </div>
            <span className={`pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition group-hover:opacity-100`} style={{ boxShadow: 'inset 0 0 0 1px rgba(244,114,182,0.25)' }}></span>
          </article>
        ))}
      </section>

      {filteredEvents.length === 0 && (
        <div className="rounded-[28px] border border-dashed border-rose-200 bg-white/80 p-10 text-center text-sm text-gray-500 shadow-inner dark:border-rose-900/40 dark:bg-slate-900/70 dark:text-gray-400">
          No events in this filter yet. Check back soon or explore another timeframe.
        </div>
      )}

      <section className="hidden rounded-[28px] border border-rose-100 bg-white/95 p-6 shadow-inner shadow-rose-500/10 dark:border-rose-900/40 dark:bg-slate-900/80 lg:block">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-500 dark:text-rose-300">Calendar preview</h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">Grid view mock</span>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-3 text-center text-xs text-gray-400 dark:text-gray-600">
          {Array.from({ length: 14 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-rose-100/70 bg-white/90 p-3 dark:border-rose-900/30 dark:bg-slate-900/60">
              <span className="block text-[10px] font-semibold uppercase tracking-wide">Day {index + 1}</span>
              <span className="mt-2 inline-flex h-6 w-full items-center justify-center rounded-full bg-gradient-to-r from-rose-500/20 via-red-500/20 to-orange-500/20 text-[10px] font-semibold text-rose-500/80">
                Holds
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CollegesEvents
