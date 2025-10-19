import React from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeAdminData } from '../../../context/AdminDataContext'

const quickActions = [
  {
    id: 'create-event',
    label: 'Create Event',
    icon: 'calendar',
    description: 'Schedule fests, hackathons, and workshops in minutes.',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500'
  },
  {
    id: 'post-notice',
    label: 'Post Notice',
    icon: 'sparkles',
    description: 'Broadcast updates instantly to your campus wall.',
    gradient: 'from-pink-500 via-rose-500 to-amber-500'
  },
  {
    id: 'invite-rep',
    label: 'Invite Representative',
    icon: 'studentCollab',
    description: 'Onboard community builders and manage permissions easily.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500'
  },
  {
    id: 'export-report',
    label: 'Export Report',
    icon: 'document',
    description: 'Download engagement analytics and activity summaries.',
    gradient: 'from-amber-500 via-orange-500 to-red-500'
  }
]

const CollegeAdminOverview = () => {
  const { profile, stats, upcomingEvents, activeInteractionsSummary } = useCollegeAdminData()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-900/80 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 opacity-70 dark:from-slate-950/60 dark:via-slate-950/40 dark:to-slate-900/60" aria-hidden="true"></div>
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-2xl border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-blue-600 dark:border-blue-600/40 dark:bg-blue-900/40 dark:text-blue-200">Admin</span>
              <p className="text-sm font-semibold text-blue-500 dark:text-blue-300">Welcome back, {profile.adminName} 👋</p>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Keep {profile.collegeName} collaborations thriving
            </h2>
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Monitor your representatives, events, and student engagement from one place. Launch new initiatives faster with shortcuts tailored for your team.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.slice(0, 2).map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className={`group flex items-center justify-between gap-3 rounded-3xl border border-transparent bg-gradient-to-r ${action.gradient} px-5 py-4 text-left text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5`}
                >
                  <div>
                    <p className="text-sm font-semibold">{action.label}</p>
                    <p className="text-xs text-white/80">{action.description}</p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-lg font-bold">
                    <Icon name={action.icon} className="h-5 w-5 text-white" />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-inner shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-900/80">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Campus snapshot</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Representatives</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.representatives}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Pending approvals</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.pendingRepresentatives}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Wall posts</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.posts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Events</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.events}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Collaborations</span>
                <span className="font-semibold text-slate-900 dark:text-white">{stats.collaborations}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <article className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-lg shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500 dark:text-blue-300">Upcoming events</p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your next launchpad</h3>
            </div>
            <button
              type="button"
              className="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:border-blue-400 hover:bg-blue-50/70 dark:border-blue-500/30 dark:text-blue-200"
            >
              Manage events
            </button>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="mt-4 rounded-3xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              No upcoming events scheduled.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {upcomingEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-inner shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-300">
                    <span>{event.type}</span>
                    <span>{event.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{event.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{event.timeframe}</p>
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-500 dark:text-blue-300">
                    <span className="inline-flex items-center gap-2">
                      <Icon name="organization" className="h-4 w-4" />
                      Participants
                    </span>
                    <span>{event.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-lg shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500 dark:text-purple-300">Student interactions</p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Engagement pulse</h3>
            </div>
            <button
              type="button"
              className="rounded-full border border-purple-200 px-3 py-1 text-xs font-semibold text-purple-600 transition hover:border-purple-400 hover:bg-purple-50/70 dark:border-purple-600/40 dark:text-purple-200"
            >
              View analytics
            </button>
          </div>
          <div className="mt-4 grid gap-4">
            <div className="rounded-3xl border border-purple-200/60 bg-purple-50/80 p-5 shadow-inner shadow-purple-500/10 dark:border-purple-800/60 dark:bg-purple-900/30">
              <div className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-200">Total reactions</div>
              <p className="mt-2 text-2xl font-semibold text-purple-700 dark:text-purple-100">{activeInteractionsSummary.reactions.toLocaleString()}</p>
              <p className="text-xs text-purple-600/80 dark:text-purple-200/80">Across wall posts and events this month.</p>
            </div>
            <div className="rounded-3xl border border-blue-200/60 bg-blue-50/80 p-5 shadow-inner shadow-blue-500/10 dark:border-blue-800/60 dark:bg-blue-900/30">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">Comments</div>
              <p className="mt-2 text-2xl font-semibold text-blue-700 dark:text-blue-100">{activeInteractionsSummary.comments.toLocaleString()}</p>
              <p className="text-xs text-blue-600/80 dark:text-blue-200/80">Student conversations across notices.</p>
            </div>
            <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/80 p-5 shadow-inner shadow-emerald-500/10 dark:border-emerald-800/60 dark:bg-emerald-900/30">
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-200">Trending post</div>
              <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-100">{activeInteractionsSummary.trendingPost}</p>
              <p className="text-xs text-emerald-600/80 dark:text-emerald-200/80">Plan a follow-up update to maintain momentum.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-4 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-lg shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Quick actions</p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Administrative shortcuts</h3>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-100/70 dark:border-slate-700 dark:text-slate-200"
          >
            Customize shortcuts
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${card.gradient} p-4 text-left text-sm text-white shadow-inner shadow-blue-500/10 transition hover:-translate-y-0.5 dark:border-slate-800/70`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 text-white">
                <Icon name={card.icon} className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-semibold">{card.label}</p>
              <p className="mt-1 text-xs text-white/80">{card.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CollegeAdminOverview
