import React, { useMemo } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const ReportsAndInsights = () => {
  const { analytics, events, posts } = useCollegeRepData()

  const kpiCards = analytics.kpi || []

  const trendData = analytics.eventParticipationTrend || []
  const maxParticipants = Math.max(...trendData.map((item) => item.participants), 1)

  const topPerforming = useMemo(() => (
    analytics.topPerforming?.map((entry) => {
      const postMatch = posts.find((post) => post.id === entry.id)
      const eventMatch = events.find((event) => event.id === entry.id)
      return {
        id: entry.id,
        title: entry.title,
        score: entry.score,
        type: postMatch ? 'Post' : eventMatch ? 'Event' : 'Wall'
      }
    }) || []
  ), [analytics.topPerforming, events, posts])

  const downloads = [
    { label: 'Download wall engagement (CSV)', type: 'CSV' },
    { label: 'Download wall engagement (PDF)', type: 'PDF' },
    { label: 'Event participation list', type: 'CSV' }
  ]

  return (
    <div className="space-y-8">
      <header className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/85">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & insights</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Track engagement across posts, events, and collaborations. Export snapshots to share progress with college leadership.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <div
            key={card.id}
            className="rounded-[24px] border border-emerald-100 bg-white/95 p-5 shadow-lg shadow-emerald-100/40 transition hover:-translate-y-1 hover:shadow-emerald-200/50 dark:border-emerald-800 dark:bg-emerald-900/30"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500 dark:text-emerald-200">
              <span>{card.label}</span>
              <Icon name="growth" className="h-4 w-4" />
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-200">{card.change}% vs last cycle</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Event participation trend</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Comparing registrations across recent months.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <Icon name="calendar" className="h-4 w-4" />
              Last 6 months
            </div>
          </div>
          <div className="mt-6 grid grid-cols-6 items-end gap-4">
            {trendData.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div
                  className="flex w-full items-end justify-center rounded-t-2xl bg-gradient-to-t from-emerald-200 via-teal-200 to-cyan-300 dark:from-emerald-900/20 dark:via-teal-800/30 dark:to-cyan-700/40"
                  style={{ height: `${(item.participants / maxParticipants) * 180 || 8}px` }}
                >
                  <span className="mb-2 text-xs text-emerald-700 dark:text-emerald-200">{item.participants}</span>
                </div>
                <span>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Top performing</h3>
            <div className="mt-4 space-y-3">
              {topPerforming.map((item) => (
                <div key={item.id} className="flex items-start justify-between rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.type}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-200">Score {item.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/85">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Downloads</h3>
            <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              {downloads.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:-translate-y-1 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <span>{item.label}</span>
                  <Icon name="document" className="h-5 w-5 text-emerald-500" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default ReportsAndInsights
