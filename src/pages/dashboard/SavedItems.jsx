import React, { useMemo, useState } from 'react'

const categories = ['All', 'Hackathons', 'Workshops', 'Tech Fests', 'Cultural Fests', 'Seminars']

const savedPosts = [
  {
    id: 1,
    title: 'Build a mental well-being companion app',
    cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    tags: ['Hackathons'],
    organization: 'NIT Surat Innovators',
    duration: 'Jul 12 – Aug 2'
  },
  {
    id: 2,
    title: 'Campus founder showcase night',
    cover: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80',
    tags: ['Tech Fests'],
    organization: 'IIT Bombay E-Cell',
    duration: 'One-night event • Aug 18'
  },
  {
    id: 3,
    title: 'AR prototyping bootcamp',
    cover: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
    tags: ['Workshops'],
    organization: 'SRM Space Labs',
    duration: '4-day sprint • Sep 7-10'
  },
  {
    id: 4,
    title: 'Design prompts for social impact apps',
    cover: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    tags: ['Seminars'],
    organization: 'Design Futures Lab',
    duration: 'Deep dive • Oct 3'
  }
]

const SavedItems = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const tagThemes = {
    default: {
      badge: 'from-blue-500/80 via-indigo-500/80 to-purple-500/80',
      chip: 'bg-blue-50/70 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 shadow-inner shadow-blue-500/10',
      border: 'border-white/40 dark:border-slate-800',
      shadow: 'shadow-blue-500/10 dark:shadow-black/40',
      overlay: 'from-slate-900/80 via-slate-900/20 to-transparent'
    },
    Hackathons: {
      badge: 'from-orange-500/90 via-pink-500/90 to-yellow-500/90',
      chip: 'bg-gradient-to-r from-orange-100 via-rose-100 to-yellow-100 text-orange-700 dark:from-orange-900/50 dark:via-rose-900/40 dark:to-yellow-900/30 dark:text-orange-200 shadow-inner shadow-orange-400/10',
      border: 'border-orange-200/70 dark:border-orange-500/30',
      shadow: 'shadow-orange-500/30 dark:shadow-orange-900/40',
      overlay: 'from-orange-900/70 via-orange-500/10 to-transparent'
    },
    Workshops: {
      badge: 'from-emerald-500/90 via-teal-500/90 to-cyan-500/90',
      chip: 'bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 text-emerald-700 dark:from-emerald-900/50 dark:via-teal-900/40 dark:to-cyan-900/40 dark:text-emerald-200 shadow-inner shadow-emerald-400/10',
      border: 'border-emerald-200/70 dark:border-emerald-500/30',
      shadow: 'shadow-emerald-500/30 dark:shadow-emerald-900/40',
      overlay: 'from-emerald-900/70 via-emerald-500/10 to-transparent'
    },
    'Tech Fests': {
      badge: 'from-sky-500/90 via-blue-500/90 to-indigo-500/90',
      chip: 'bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100 text-sky-700 dark:from-sky-900/50 dark:via-blue-900/40 dark:to-indigo-900/40 dark:text-sky-200 shadow-inner shadow-sky-400/10',
      border: 'border-sky-200/70 dark:border-sky-500/30',
      shadow: 'shadow-sky-500/30 dark:shadow-sky-900/40',
      overlay: 'from-sky-900/70 via-sky-500/10 to-transparent'
    },
    'Cultural Fests': {
      badge: 'from-fuchsia-500/90 via-rose-500/90 to-amber-500/90',
      chip: 'bg-gradient-to-r from-fuchsia-100 via-rose-100 to-amber-100 text-fuchsia-700 dark:from-fuchsia-900/50 dark:via-rose-900/40 dark:to-amber-900/40 dark:text-fuchsia-200 shadow-inner shadow-fuchsia-400/10',
      border: 'border-fuchsia-200/70 dark:border-fuchsia-500/30',
      shadow: 'shadow-fuchsia-500/30 dark:shadow-fuchsia-900/40',
      overlay: 'from-fuchsia-900/70 via-fuchsia-500/10 to-transparent'
    },
    Seminars: {
      badge: 'from-purple-500/90 via-indigo-500/90 to-blue-500/90',
      chip: 'bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 text-purple-700 dark:from-purple-900/50 dark:via-indigo-900/40 dark:to-blue-900/40 dark:text-purple-200 shadow-inner shadow-purple-400/10',
      border: 'border-purple-200/70 dark:border-purple-500/30',
      shadow: 'shadow-purple-500/30 dark:shadow-purple-900/40',
      overlay: 'from-purple-900/70 via-purple-500/10 to-transparent'
    }
  }

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return savedPosts
    return savedPosts.filter((post) => post.tags.includes(activeCategory))
  }, [activeCategory])

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" aria-hidden="true"></div>
      <div className="relative max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-blue-500 dark:text-blue-300">Curated vault</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Saved posts</h1>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-blue-200">
            <span className="text-base">⭐</span>
            Spotlight ready
          </span>
        </div>

        <section className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-medium shadow-sm transition ${
                    isActive
                      ? 'border-blue-500 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-700 dark:border-blue-400 dark:from-blue-900/50 dark:via-purple-900/50 dark:to-pink-900/40 dark:text-blue-100'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-gray-300 dark:hover:border-blue-700'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white/70 p-10 text-center text-sm text-gray-500 shadow-lg shadow-blue-500/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 dark:text-gray-400">
              No saved posts in this category yet.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => {
                const theme = tagThemes[post.tags[0]] ?? tagThemes.default
                return (
                  <article
                    key={post.id}
                    className={`group overflow-hidden rounded-[28px] border bg-white/80 backdrop-blur transition hover:-translate-y-1 ${theme.border} ${theme.shadow}`}
                  >
                    <div className="relative h-48">
                      <img src={post.cover} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${theme.overlay}`}></div>
                      <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1 text-xs font-semibold text-white backdrop-blur bg-gradient-to-r ${theme.badge}`}>
                        <span className="text-sm">📌</span>
                        {post.tags[0]}
                      </span>
                    </div>
                    <div className="space-y-3 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-blue-500 dark:text-blue-300">{post.tags.join(' • ')}</p>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                      <div className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-medium ${theme.chip}`}>
                        <span className="text-base">🏛️</span>
                        {post.organization}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{post.duration}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default SavedItems
