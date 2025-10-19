import React, { useMemo } from 'react'
import { useDashboardData } from '../../context/DashboardDataContext'

const activeColleges = [
  {
    id: 'iitb-fest',
    college: 'IIT Bombay',
    location: 'Mumbai, India',
    logo: '/logos/iitb.png',
    eventName: 'Techfest 2025',
    eventType: 'Fest',
    endsIn: '3d 12h',
    heroImage: '/events/techfest.jpg'
  },
  {
    id: 'mit-hack',
    college: 'MIT',
    location: 'Cambridge, USA',
    logo: '/logos/mit.png',
    eventName: 'HackMIT Climate Sprint',
    eventType: 'Hackathon',
    endsIn: '18h',
    heroImage: '/events/hackmit.jpg'
  },
  {
    id: 'ntu-workshop',
    college: 'NTU Singapore',
    location: 'Singapore',
    logo: '/logos/ntu.png',
    eventName: 'Smart City Systems Lab',
    eventType: 'Workshop',
    endsIn: '5d 4h',
    heroImage: '/events/smart-city.jpg'
  },
  {
    id: 'ucla-film',
    college: 'UCLA',
    location: 'Los Angeles, USA',
    logo: '/logos/ucla.png',
    eventName: 'Media Lab Film Residency',
    eventType: 'Residency',
    endsIn: '7d',
    heroImage: '/events/film-residency.jpg'
  }
]

const eventPillColor = {
  Fest: 'from-orange-500 via-amber-500 to-yellow-400',
  Hackathon: 'from-blue-600 via-indigo-600 to-purple-600',
  Workshop: 'from-emerald-500 via-teal-500 to-cyan-500',
  Residency: 'from-pink-500 via-rose-500 to-purple-500'
}

const slugify = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const buildFollowEntity = (item) => {
  const base = item.id || item.college
  const slug = slugify(base)
  return {
    id: `college-${slug}`,
    name: item.college,
    descriptor: item.location,
    badge: 'College',
    icon: 'organization',
    type: 'college',
    meta: {
      eventName: item.eventName,
      eventType: item.eventType,
      logo: item.logo
    }
  }
}

const CollegesActive = () => {
  const { isFollowing, toggleFollow } = useDashboardData()

  const scrollerItems = useMemo(() => activeColleges, [])

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:px-8">
      <header className="rounded-[28px] border border-emerald-200/70 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white shadow-lg sm:p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">Live right now</p>
          <h1 className="text-3xl font-bold">Active colleges</h1>
          <p className="text-sm text-white/85 sm:text-base">Catch the campuses currently hosting fests, hackathons, workshops, and collab sprints.</p>
        </div>
      </header>

      <div className="hidden gap-4 lg:flex">
        <section className="-mx-4 flex w-full gap-4 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {scrollerItems.map((item) => {
            const followEntity = buildFollowEntity(item)
            const isFollowingCollege = isFollowing(followEntity.id)
            const gradient = eventPillColor[item.eventType] ?? 'from-slate-500 to-slate-700'
            return (
              <article
                key={item.id}
                className="group relative flex w-[320px] flex-none flex-col justify-between overflow-hidden rounded-[26px] border border-emerald-100 bg-white/95 p-5 shadow-sm shadow-emerald-500/10 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/20 dark:border-emerald-900/40 dark:bg-slate-900/90"
              >
                {item.heroImage && (
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-80" style={{ backgroundImage: `url(${item.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-hidden="true"></div>
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-lg font-semibold text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-200">
                        {item.logo ? <img src={item.logo} alt={item.college} className="h-12 w-12 rounded-2xl object-cover" /> : item.college.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold leading-tight text-gray-900 break-words whitespace-normal dark:text-white sm:text-base">
                          {item.college}
                        </h3>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{item.location}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-md shadow-emerald-500/20`}>{item.eventType}</span>
                  </div>
                  <div className="text-right text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                    <span className="block text-[11px] text-emerald-500/70">Ends in</span>
                    {item.endsIn}
                  </div>
                </div>
                <div className="relative mt-5 space-y-4">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.eventName}</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFollow(followEntity)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        isFollowingCollege
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'border-emerald-200 bg-white text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-900/70 dark:text-emerald-200'
                      }`}
                    >
                      {isFollowingCollege ? 'Following' : 'Follow'}
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-xs font-semibold text-emerald-600 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-700 dark:bg-slate-900/70 dark:text-emerald-200"
                    >
                      View event
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </div>

      <div className="space-y-4 lg:hidden">
        {activeColleges.map((item) => {
          const followEntity = buildFollowEntity(item)
          const isFollowingCollege = isFollowing(followEntity.id)
          const gradient = eventPillColor[item.eventType] ?? 'from-slate-500 to-slate-700'
          return (
            <article
              key={item.id}
              className="rounded-[24px] border border-emerald-100 bg-white/95 p-4 shadow-sm shadow-emerald-500/10 dark:border-emerald-900/40 dark:bg-slate-900/80"
            >
              <div className="flex items-start justify-between gap-3 overflow-hidden">
                <div className="flex flex-1 items-center gap-3 overflow-hidden">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-lg font-semibold text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-200">
                    {item.logo ? <img src={item.logo} alt={item.college} className="h-12 w-12 rounded-2xl object-cover" /> : item.college.charAt(0)}
                  </span>
                  <div className="min-w-0 overflow-hidden">
                    <h3 className="text-sm font-semibold leading-tight text-gray-900 break-words whitespace-normal dark:text-white sm:text-base">
                      {item.college}
                    </h3>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{item.location}</p>
                    <span className={`mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow`}>{item.eventType}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-500 dark:text-emerald-300">{item.endsIn}</div>
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{item.eventName}</p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => toggleFollow(followEntity)}
                  className={`w-full rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isFollowingCollege
                      ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'border-emerald-200 bg-white text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-900/70 dark:text-emerald-200'
                  }`}
                >
                  {isFollowingCollege ? 'Following' : 'Follow'}
                </button>
                <button
                  type="button"
                  className="w-full rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-700 dark:bg-slate-900/70 dark:text-emerald-200"
                >
                  View event
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default CollegesActive
