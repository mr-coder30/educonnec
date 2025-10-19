import React, { useEffect, useMemo, useState } from 'react'

const collabSuggestions = [
  'AI research collective',
  'Web dev sprint',
  'IoT campus sensors',
  'Design critique circle',
  'AR/VR showcase',
  'Blockchain lab series'
]

const collabFilters = ['AI', 'Web Dev', 'IoT', 'Design', 'AR/VR', 'Blockchain']

const collabRoster = [
  {
    id: 'ai-collective',
    title: 'AI Research Collective',
    description: 'Exploring multimodal learning models to assist campus accessibility services across partner universities.',
    tags: ['AI', 'Research', 'Accessibility'],
    creator: 'Zara • KITE University',
    category: 'Research',
    commitment: '6-8 hrs/week'
  },
  {
    id: 'web-for-good',
    title: 'Web for Good Sprint',
    description: 'Rapid sprint to build a full-stack volunteering platform for cross-campus community impact initiatives.',
    tags: ['Web Dev', 'Full Stack', 'Impact'],
    creator: 'Ravi • NIT Surathkal',
    category: 'Project',
    commitment: 'Weekend focus'
  },
  {
    id: 'iot-green',
    title: 'IoT Green Campus Network',
    description: 'Deploying low-power sensors for air-quality and energy tracking with data dashboards for sustainability councils.',
    tags: ['IoT', 'Sustainability', 'Data'],
    creator: 'Mei • HKUST',
    category: 'Startup',
    commitment: '4 hrs/week'
  },
  {
    id: 'design-guild',
    title: 'Design Systems Guild',
    description: 'Weekly design critique and pattern library building across multiple product verticals and device breakpoints.',
    tags: ['Design', 'UI/UX', 'Figma'],
    creator: 'Imran • Srishti Institute',
    category: 'Study Group',
    commitment: '2 hrs/week'
  },
  {
    id: 'xr-studio',
    title: 'XR Campus Studio',
    description: 'Collaborative lab to craft immersive AR/VR installations for upcoming innovation expos and visitor demos.',
    tags: ['AR/VR', 'Unity', '3D'],
    creator: 'Hailey • SCAD',
    category: 'Hackathon',
    commitment: 'Event prep'
  },
  {
    id: 'chain-collective',
    title: 'Blockchain Credential Collective',
    description: 'Building verifiable credential tooling for university hackathons and showcasing secure talent portfolios.',
    tags: ['Blockchain', 'Security', 'DevOps'],
    creator: 'Arnav • VIT',
    category: 'Startup',
    commitment: 'Flexible'
  }
]

const StudentCollabFind = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(4)
  const [selectedCollab, setSelectedCollab] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timeout)
  }, [])

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return collabSuggestions
    return collabSuggestions.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  const filteredCollabs = useMemo(() => {
    return collabRoster.filter(collab => {
      const matchesSearch = searchTerm
        ? collab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collab.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        : true

      const matchesFilter = selectedFilter === 'All'
        ? true
        : collab.tags.some(tag => tag.toLowerCase() === selectedFilter.toLowerCase())

      return matchesSearch && matchesFilter
    })
  }, [searchTerm, selectedFilter])

  const visibleCollabs = filteredCollabs.slice(0, visibleCount)

  const handleFilterToggle = (filter) => {
    setSelectedFilter(prev => (prev === filter ? 'All' : filter))
  }

  const handleSuggestionSelect = (value) => {
    setSearchTerm(value)
    setIsSuggestionsOpen(false)
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  return (
    <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-3 pb-20 sm:px-6 lg:px-0">
      <div className="relative overflow-hidden rounded-[24px] border border-blue-100 bg-white/95 px-3 pb-4 pt-4 shadow-md shadow-blue-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:rounded-[30px] sm:px-5 lg:sticky lg:top-[72px] lg:z-30">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/40 via-blue-50/40 to-purple-50/30 opacity-80 dark:from-slate-900/60 dark:via-slate-900/50 dark:to-slate-900/40" aria-hidden="true"></div>
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 rounded-3xl border border-blue-200 bg-white px-4 py-3 shadow-inner shadow-blue-200/30 focus-within:ring-2 focus-within:ring-blue-400 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/30">
            <span className="text-blue-500 dark:text-blue-300">🔍</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setIsSuggestionsOpen(true)}
              placeholder="Search for a collab, skill, or domain…"
              className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none dark:text-gray-100"
            />
          </div>
          {isSuggestionsOpen && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-500/10 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-black/40">
              <ul className="max-h-48 overflow-y-auto py-2 text-sm text-gray-700 dark:text-gray-200">
                {filteredSuggestions.map(item => (
                  <li key={item}>
                    <button
                      type="button"
                      onMouseDown={() => handleSuggestionSelect(item)}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-blue-50 dark:hover:bg-slate-800/60"
                    >
                      <span className="text-blue-400">•</span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-1 text-sm font-medium text-gray-600 [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => setSelectedFilter('All')}
            className={`whitespace-nowrap rounded-full border px-4 py-2 transition ${
              selectedFilter === 'All'
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'border-blue-200 bg-white text-blue-600 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200'
            }`}
          >
            All
          </button>
          {collabFilters.map(filter => {
            const isActive = selectedFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterToggle(filter)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 transition ${
                  isActive
                    ? 'border-blue-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'border-blue-200 bg-white text-blue-600 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>

      <section className="space-y-4">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-blue-100/70 bg-white/80 p-5 shadow-inner shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="h-4 w-3/4 rounded-full bg-blue-100/70 dark:bg-slate-800"></div>
                <div className="mt-3 h-3 w-full rounded-full bg-blue-50/60 dark:bg-slate-800"></div>
                <div className="mt-2 h-3 w-2/3 rounded-full bg-blue-50/50 dark:bg-slate-800"></div>
                <div className="mt-6 flex gap-2">
                  <span className="h-6 w-20 rounded-full bg-blue-100/70 dark:bg-slate-800"></span>
                  <span className="h-6 w-16 rounded-full bg-blue-100/70 dark:bg-slate-800"></span>
                </div>
                <div className="mt-6 h-10 w-full rounded-2xl bg-blue-100/80 dark:bg-slate-800"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleCollabs.map(collab => (
                <article
                  key={collab.id}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-blue-100/70 bg-white/95 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{collab.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-300">
                        {collab.category} • {collab.commitment}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="block h-[3.5rem] overflow-hidden">
                        {collab.description}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {collab.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-500/40 dark:bg-blue-900/30 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {collab.creator}
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:shadow-blue-500/50 sm:w-auto"
                      >
                        Join collab
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedCollab(collab)}
                        className="w-full rounded-2xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-400 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-200 dark:hover:bg-blue-500/10 sm:w-auto"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {visibleCollabs.length === 0 && (
              <div className="rounded-3xl border border-dashed border-blue-200 bg-white/80 p-10 text-center text-sm text-gray-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-gray-400">
                No collaborations match your filters yet. Try adjusting the search or skill focus.
              </div>
            )}
            {visibleCollabs.length < filteredCollabs.length && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 dark:border-blue-500/40 dark:bg-slate-900/80 dark:text-blue-200"
                >
                  Load more matches
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-blue-200 bg-white p-6 shadow-2xl dark:border-blue-500/30 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedCollab.title}</h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-300">
                  {selectedCollab.category} • {selectedCollab.commitment}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCollab(null)}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 transition hover:border-gray-400 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {selectedCollab.description}
            </p>
            <div className="mt-6 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Created by {selectedCollab.creator}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCollab.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-500/40 dark:bg-blue-900/30 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Apply soon to reserve your spot.</span>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:shadow-blue-500/50 sm:w-auto"
                >
                  Join collab
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCollab(null)}
                  className="w-full rounded-2xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-400 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 sm:w-auto"
                >
                  Close window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentCollabFind
