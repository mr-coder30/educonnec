import React, { useMemo, useState } from 'react'

const joinedCollabs = [
  {
    id: 'ui-sprint',
    title: 'UI Sprint Hub',
    progress: 74,
    teamSize: 9,
    description: 'Designing unified dashboard widgets for the campus launchpad.',
    gradient: 'from-blue-600 via-cyan-500 to-emerald-500',
    tags: ['Design', 'Prototyping']
  },
  {
    id: 'ml-lab',
    title: 'ML Ops Lab',
    progress: 52,
    teamSize: 6,
    description: 'Serving trained models for hackathon-ready experiences.',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    tags: ['ML', 'Infra']
  },
  {
    id: 'iot-campus',
    title: 'IoT Campus Mesh',
    progress: 33,
    teamSize: 5,
    description: 'Deploying low-power sensors for real-time campus metrics.',
    gradient: 'from-emerald-500 via-lime-500 to-yellow-400',
    tags: ['IoT', 'Research']
  }
]

const createdCollabs = [
  {
    id: 'xr-lab',
    title: 'XR Futures Studio',
    applicants: 21,
    teamSize: 8,
    description: 'Curating immersive AR/VR demos for the innovation expo.',
    gradient: 'from-purple-600 via-fuchsia-500 to-rose-500',
    tags: ['AR/VR', 'Experience']
  },
  {
    id: 'open-source',
    title: 'Open Source Campus',
    applicants: 14,
    teamSize: 10,
    description: 'Maintaining shared libraries and tooling for student dev teams.',
    gradient: 'from-slate-800 via-slate-700 to-slate-600',
    tags: ['OSS', 'DevOps']
  }
]

const StudentCollabMy = () => {
  const [activeTab, setActiveTab] = useState('joined')
  const [isJoinedOpen, setIsJoinedOpen] = useState(true)
  const [isCreatedOpen, setIsCreatedOpen] = useState(false)

  const activeDataset = useMemo(() => (activeTab === 'joined' ? joinedCollabs : createdCollabs), [activeTab])

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-teal-200/70 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-6 text-white shadow-lg sm:p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">My collaborations</h1>
          <p className="text-sm text-white/85">Track your teams, manage contributions, and jump back into the rooms that energize you.</p>
        </div>
      </div>

      <div className="hidden space-y-6 sm:block">
        <div className="flex items-center gap-2 rounded-full border border-teal-100 bg-white/95 p-1 text-sm font-semibold text-teal-600 shadow-sm dark:border-teal-900/40 dark:bg-slate-900/80 dark:text-teal-200">
          <button
            type="button"
            onClick={() => setActiveTab('joined')}
            className={`w-full rounded-full px-5 py-2 transition ${
              activeTab === 'joined'
                ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white shadow-md shadow-teal-500/30'
                : 'text-teal-600 dark:text-teal-200'
            }`}
          >
            Joined collabs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('created')}
            className={`w-full rounded-full px-5 py-2 transition ${
              activeTab === 'created'
                ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white shadow-md shadow-teal-500/30'
                : 'text-teal-600 dark:text-teal-200'
            }`}
          >
            Created collabs
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {activeDataset.map(collab => (
            <article
              key={collab.id}
              className="group relative overflow-hidden rounded-[24px] border border-teal-100 bg-white/95 p-5 shadow-sm shadow-teal-500/10 transition hover:-translate-y-1 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 dark:border-teal-900/40 dark:bg-slate-900/80"
            >
              <div className={`pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-80 ${collab.gradient} blur-3xl`} aria-hidden="true"></div>
              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{collab.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{collab.description}</p>
                  </div>
                  <div className="flex flex-col items-end text-xs font-semibold uppercase tracking-wide text-teal-500 dark:text-teal-300">
                    <span>Team</span>
                    <span>{collab.teamSize} members</span>
                  </div>
                </div>
                {'progress' in collab ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{collab.progress}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-teal-50 dark:bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500" style={{ width: `${collab.progress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-2xl border border-teal-100/70 bg-teal-50/70 px-3 py-2 text-xs font-semibold text-teal-600 shadow-inner dark:border-teal-900/50 dark:bg-teal-900/30 dark:text-teal-200">
                    <span>Applicants</span>
                    <span>{collab.applicants}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {collab.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600 dark:border-teal-900/60 dark:bg-teal-900/30 dark:text-teal-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"></span>
                    Active
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {'progress' in collab ? (
                      <>
                        <button
                          type="button"
                          className="translate-y-2 rounded-full border border-teal-200 px-4 py-2 text-xs font-semibold text-teal-600 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 hover:border-teal-400 hover:bg-teal-50 dark:border-teal-500/40 dark:text-teal-200 dark:hover:bg-teal-500/10"
                        >
                          Open chat
                        </button>
                        <button
                          type="button"
                          className="translate-y-2 rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-500 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 hover:border-rose-300 hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10"
                        >
                          Leave collab
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="translate-y-2 rounded-full border border-teal-200 px-4 py-2 text-xs font-semibold text-teal-600 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 hover:border-teal-400 hover:bg-teal-50 dark:border-teal-500/40 dark:text-teal-200 dark:hover:bg-teal-500/10"
                        >
                          Manage
                        </button>
                        <button
                          type="button"
                          className="translate-y-2 rounded-full border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-600 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-500/10"
                        >
                          View members
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-4 sm:hidden">
        <section className="rounded-[24px] border border-teal-100 bg-white/95 p-4 shadow-sm dark:border-teal-900/40 dark:bg-slate-900/80">
          <button
            type="button"
            onClick={() => setIsJoinedOpen(prev => !prev)}
            className="flex w-full items-center justify-between text-sm font-semibold text-teal-600 dark:text-teal-200"
          >
            Joined collabs
            <span className={`text-xs transition ${isJoinedOpen ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {isJoinedOpen && (
            <div className="mt-4 space-y-3">
              {joinedCollabs.map(collab => (
                <article
                  key={collab.id}
                  className="rounded-2xl border border-teal-100 bg-white/95 p-4 shadow-sm dark:border-teal-900/40 dark:bg-slate-900/70"
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{collab.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{collab.description}</p>
                    </div>
                    <div className="h-2 rounded-full bg-teal-50 dark:bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500" style={{ width: `${collab.progress}%` }}></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {collab.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-semibold text-teal-600 dark:border-teal-900/40 dark:bg-teal-900/30 dark:text-teal-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="w-full rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                    >
                      Open chat
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-500"
                    >
                      Leave collab
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[24px] border border-teal-100 bg-white/95 p-4 shadow-sm dark:border-teal-900/40 dark:bg-slate-900/80">
          <button
            type="button"
            onClick={() => setIsCreatedOpen(prev => !prev)}
            className="flex w-full items-center justify-between text-sm font-semibold text-teal-600 dark:text-teal-200"
          >
            Created collabs
            <span className={`text-xs transition ${isCreatedOpen ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {isCreatedOpen && (
            <div className="mt-4 space-y-3">
              {createdCollabs.map(collab => (
                <article
                  key={collab.id}
                  className="rounded-2xl border border-teal-100 bg-white/95 p-4 shadow-sm dark:border-teal-900/40 dark:bg-slate-900/70"
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{collab.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{collab.description}</p>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-teal-100/70 bg-teal-50/70 px-3 py-2 text-xs font-semibold text-teal-600 dark:border-teal-900/50 dark:bg-teal-900/30 dark:text-teal-200">
                      <span>Applicants</span>
                      <span>{collab.applicants}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {collab.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-semibold text-teal-600 dark:border-teal-900/40 dark:bg-teal-900/30 dark:text-teal-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="w-full rounded-2xl border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-600"
                    >
                      Manage
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-2xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600"
                    >
                      View members
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default StudentCollabMy
