import React, { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const DashboardOverview = () => {
  const { profile, derivedStats, wall, events, collaborations } = useCollegeRepData()
  const outletContext = useOutletContext()
  const setIsQuickOpen = outletContext?.setIsQuickOpen ?? (() => {})

  const sortedWall = useMemo(() => [...wall].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [wall])
  const upcomingEvents = useMemo(() => events.filter((event) => event.status === 'Upcoming').slice(0, 3), [events])
  const activeCollabs = useMemo(() => collaborations.filter((collab) => collab.status !== 'Past').slice(0, 3), [collaborations])

  const overviewCards = [
    {
      label: 'My posts',
      value: derivedStats.activePosts,
      icon: 'posts',
      accent: 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    {
      label: 'Events hosted',
      value: derivedStats.hostedEvents,
      icon: 'calendar',
      accent: 'from-sky-500 via-blue-500 to-indigo-500'
    },
    {
      label: 'Engagement (reactions)',
      value: derivedStats.engagementReactions,
      icon: 'sparkles',
      accent: 'from-purple-500 via-fuchsia-500 to-pink-500'
    },
    {
      label: 'Pending collaborations',
      value: derivedStats.pendingCollabs,
      icon: 'collaboration',
      accent: 'from-amber-500 via-orange-500 to-rose-500'
    }
  ]

  const shortcuts = [
    { label: 'Create post', action: () => setIsQuickOpen(true), icon: 'plus' },
    { label: 'Create event', action: () => setIsQuickOpen(true), icon: 'calendar' },
    { label: 'Invite collaboration', action: () => setIsQuickOpen(true), icon: 'collaboration' }
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-emerald-200/60 bg-white/90 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur dark:border-emerald-800/60 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-200">{profile.collegeName}</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {profile.name.split(' ')[0]}</h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{profile.welcomeMessage}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white text-xl font-semibold shadow-lg shadow-emerald-500/30">
              <Icon name="organization" className="h-8 w-8" />
            </div>
            <div className="hidden items-center gap-3 rounded-2xl border border-emerald-200 bg-white/70 px-4 py-3 text-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-700 dark:bg-slate-900/70 dark:text-emerald-200 lg:flex">
              <Icon name="collabRequests" className="h-5 w-5" />
              Collaborations this week: {derivedStats.pendingCollabs}
            </div>
          </div>
        </div>
        <div className="mt-8 -mx-2 flex snap-x gap-4 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:pb-0 lg:grid-cols-4">
          {overviewCards.map((card) => (
            <div
              key={card.label}
              className="min-w-[260px] snap-start rounded-3xl border border-slate-100 bg-white/90 p-5 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-emerald-200/40 dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow`}> 
                <Icon name={card.icon} className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent wall activity</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Stay on top of comments and reactions across your posts.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickOpen(true)}
                className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 lg:flex"
              >
                <Icon name="plus" className="h-4 w-4" />
                New notice
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {sortedWall.slice(0, 4).map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm shadow-slate-200/20 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{post.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{post.author} • {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1"><Icon name="like" className="h-4 w-4" />{Object.values(post.reactions).reduce((acc, value) => acc + value, 0)}</span>
                      <span className="inline-flex items-center gap-1"><Icon name="comment" className="h-4 w-4" />{post.comments.length}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{post.body}</p>
                  <div className="mt-3 flex gap-2 overflow-x-auto text-xs font-semibold text-emerald-600 dark:text-emerald-200">
                    {post.comments.slice(0, 2).map((comment) => (
                      <span key={comment.id} className="rounded-full bg-emerald-50 px-3 py-1 dark:bg-emerald-900/40">{comment.author}: {comment.message}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick actions</h3>
              <button
                type="button"
                onClick={() => setIsQuickOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <Icon name="plus" className="h-4 w-4" />
                Open menu
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {shortcuts.map((shortcut) => (
                <button
                  type="button"
                  key={shortcut.label}
                  onClick={shortcut.action}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <span>{shortcut.label}</span>
                    <Icon name={shortcut.icon} className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upcoming events</h3>
            <div className="mt-4 space-y-3">
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">No upcoming events scheduled.</p>
              )}
              {upcomingEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{event.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{event.type} • {new Date(event.date).toLocaleDateString()}</p>
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-200">{event.location}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Active collaborations</h3>
            <div className="mt-4 space-y-3">
              {activeCollabs.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">No active collaborations at the moment.</p>
              )}
              {activeCollabs.map((collab) => (
                <div key={collab.id} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">
                  <p className="font-semibold">{collab.partner}</p>
                  <p className="mt-1 text-xs">{collab.event}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em]">{collab.status}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default DashboardOverview
