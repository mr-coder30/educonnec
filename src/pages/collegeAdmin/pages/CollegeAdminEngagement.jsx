import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeAdminData } from '../../../context/AdminDataContext'

const reactionPalette = {
  reactions: 'from-blue-500 via-indigo-500 to-purple-500',
  comments: 'from-emerald-500 via-teal-500 to-cyan-500',
  follows: 'from-amber-500 via-orange-500 to-pink-500'
}

const CollegeAdminEngagement = () => {
  const { engagement, wallPosts } = useCollegeAdminData()
  const [selectedTrack, setSelectedTrack] = useState('all')
  const [searchStudent, setSearchStudent] = useState('')

  const filteredStudents = useMemo(() => {
    return engagement.activeStudents
      .filter((student) => (selectedTrack === 'all' ? true : student.track === selectedTrack))
      .filter((student) => {
        if (!searchStudent.trim()) return true
        return student.name.toLowerCase().includes(searchStudent.trim().toLowerCase())
      })
  }, [engagement.activeStudents, searchStudent, selectedTrack])

  const availableTracks = useMemo(() => {
    const set = new Set(engagement.activeStudents.map((student) => student.track))
    return Array.from(set)
  }, [engagement.activeStudents])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_32px_70px_-40px_rgba(59,130,246,0.55)] backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">Engagement insights</p>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">How your campus is responding</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Review momentum across wall posts, interactive programs, and rising community champions.</p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 self-start rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
            >
              <Icon name="document" className="h-4 w-4" />
              Export report
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(engagement.trends).map(([key, item]) => (
              <div key={key} className={`relative overflow-hidden rounded-3xl border border-transparent bg-gradient-to-br ${reactionPalette[key] ?? 'from-blue-500 to-purple-500'} p-5 text-white shadow-[0_30px_65px_-42px_rgba(59,130,246,0.75)]`}>
                <div className="absolute inset-0 bg-white/10" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">{key}</p>
                  <p className="text-3xl font-semibold">{item.value.toLocaleString()}</p>
                  <p className="text-xs text-white/80">Change: <span className="font-semibold">+{item.change}%</span> vs last cycle</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[28px] border border-blue-100/70 bg-white/90 p-6 shadow-inner shadow-blue-500/20 dark:border-slate-800/70 dark:bg-slate-900/80">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Rising community champions</h2>
                <p className="text-sm text-slate-500 dark:text-slate-300">Students driving the highest engagement across your initiatives.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-2xl border border-blue-100/60 bg-white/70 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-800/70 dark:bg-slate-900/70">
                  <Icon name="search" className="h-4 w-4 text-blue-500" />
                  <input
                    type="text"
                    value={searchStudent}
                    onChange={(event) => setSearchStudent(event.target.value)}
                    placeholder="Search student"
                    className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTrack('all')}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    selectedTrack === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'border border-blue-100/70 text-blue-500 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-900/30'
                  }`}
                >
                  All tracks
                </button>
                {availableTracks.map((track) => (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setSelectedTrack(track)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      selectedTrack === track
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'border border-blue-100/70 text-blue-500 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {filteredStudents.map((student) => (
                <div key={student.id} className="rounded-2xl border border-blue-100/60 bg-white/70 px-4 py-4 shadow-inner shadow-blue-500/15 dark:border-slate-800/60 dark:bg-slate-900/70">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-500 dark:text-slate-300">
                    <span>{student.track}</span>
                    <span className="text-blue-500 dark:text-blue-300">{student.interactions} touches</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{student.name}</p>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <p className="rounded-2xl border border-blue-100/60 bg-white/60 px-4 py-4 text-sm text-slate-500 shadow-inner shadow-blue-500/10 dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-300">
                  No students found for the selected filter.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_30px_70px_-40px_rgba(129,140,248,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">Top wall performers</p>
              <ul className="mt-3 space-y-3">
                {engagement.topPosts.map((post) => {
                  const wallMeta = wallPosts.find((item) => item.id === post.id)
                  const totalReactions = wallMeta ? Object.values(wallMeta.reactions).reduce((sum, value) => sum + value, 0) : 0
                  return (
                    <li key={post.id} className="rounded-2xl border border-blue-100/60 bg-white/70 px-4 py-3 text-sm shadow-inner shadow-blue-500/15 dark:border-slate-800/60 dark:bg-slate-900/70">
                      <p className="font-semibold text-slate-900 dark:text-white">{post.title}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Engagement score {post.score} • {totalReactions} reactions</p>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100/70 bg-white/80 px-5 py-4 shadow-inner shadow-blue-500/20 dark:border-slate-800/60 dark:bg-slate-900/70">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Next steps</p>
              <ul className="mt-3 space-y-2 text-xs text-slate-500 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-900/40 dark:text-blue-200">
                    <Icon name="sparkles" className="h-4 w-4" />
                  </span>
                  Encourage your top posts to convert into upcoming events.
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-900/40 dark:text-blue-200">
                    <Icon name="aiAssistant" className="h-4 w-4" />
                  </span>
                  Share insights with representatives to drive focussed outreach.
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-900/40 dark:text-blue-200">
                    <Icon name="document" className="h-4 w-4" />
                  </span>
                  Export weekly digests for leadership review.
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default CollegeAdminEngagement
