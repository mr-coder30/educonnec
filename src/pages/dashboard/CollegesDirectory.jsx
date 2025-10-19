import React, { useMemo, useState } from 'react'
import { useDashboardData } from '../../context/DashboardDataContext'

const collegesList = [
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    location: 'Mumbai, India',
    logo: '/logos/iitb.png',
    focus: ['Engineering', 'Innovation'],
    wallHighlights: [
      {
        id: 'highlight-1',
        title: 'Techfest mentorship cycle live',
        description: 'Apply before Nov 05 to pair with industry mentors for your hardware builds.'
      },
      {
        id: 'highlight-2',
        title: 'Campus makerspace extended hours',
        description: 'Lab stays open till 2 AM this week for prototype sprint teams.'
      }
    ]
  },
  {
    id: 'mit',
    name: 'MIT',
    location: 'Cambridge, USA',
    logo: '/logos/mit.png',
    focus: ['AI Research', 'Entrepreneurship'],
    wallHighlights: [
      {
        id: 'highlight-3',
        title: 'AI for Social Good showcase',
        description: 'Join teams presenting real-world experiments solving civic challenges.'
      },
      {
        id: 'highlight-4',
        title: 'Sandbox accelerator Q&A',
        description: 'Founders share learnings from building impact startups on campus.'
      }
    ]
  },
  {
    id: 'ntu',
    name: 'NTU Singapore',
    location: 'Singapore',
    logo: '/logos/ntu.png',
    focus: ['Sustainability', 'Smart Cities'],
    wallHighlights: [
      {
        id: 'highlight-5',
        title: 'Green campus sprint winners',
        description: 'Congrats to the hybrid energy storage team for clinching top honours.'
      }
    ]
  },
  {
    id: 'srishti',
    name: 'Srishti Institute of Art, Design and Technology',
    location: 'Bengaluru, India',
    logo: '/logos/srishti.png',
    focus: ['Design', 'Storytelling'],
    wallHighlights: [
      {
        id: 'highlight-6',
        title: 'Community storytelling studio',
        description: 'Open call for visual storytellers to document social innovations.'
      }
    ]
  },
  {
    id: 'ucla',
    name: 'UCLA',
    location: 'Los Angeles, USA',
    logo: '/logos/ucla.png',
    focus: ['Media Labs', 'Biotech'],
    wallHighlights: [
      {
        id: 'highlight-7',
        title: 'BioDesign bootcamp registrations',
        description: 'Secure a seat to learn wet lab prototyping fused with product thinking.'
      }
    ]
  },
  {
    id: 'imperial',
    name: 'Imperial College London',
    location: 'London, UK',
    logo: '/logos/imperial.png',
    focus: ['Robotics', 'Healthcare'],
    wallHighlights: [
      {
        id: 'highlight-8',
        title: 'MedTech incubator demos',
        description: 'Pilot devices tackling surgical recovery are looking for beta users.'
      }
    ]
  }
]

const CollegesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCollege, setSelectedCollege] = useState(null)
  const { isFollowing, toggleFollow } = useDashboardData()

  const slugify = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const buildFollowEntity = (college) => {
    const base = college.id || college.name
    const slug = slugify(base)
    return {
      id: `college-${slug}`,
      name: college.name,
      descriptor: college.location,
      badge: 'College',
      icon: 'organization',
      type: 'college',
      meta: {
        focus: college.focus,
        logo: college.logo
      }
    }
  }

  const filteredColleges = useMemo(() => {
    if (!searchTerm) return collegesList
    return collegesList.filter(({ name, location, focus }) => {
      const haystack = `${name} ${location} ${focus.join(' ')}`.toLowerCase()
      return haystack.includes(searchTerm.toLowerCase())
    })
  }, [searchTerm])

  const closeWall = () => setSelectedCollege(null)

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-20 sm:px-6 lg:px-8">
      <header className="rounded-[28px] border border-amber-200/60 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 p-6 text-white shadow-lg sm:p-8">
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">Campus atlas</p>
            <h1 className="text-3xl font-bold">All colleges</h1>
          </div>
          <p className="text-sm text-white/85 sm:text-base">
            Follow campuses you care about, peek into their walls, and stay in sync with cross-college energy.
          </p>
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by college, location, or track…"
              className="w-full rounded-3xl border border-amber-200/80 bg-white/95 px-4 py-3 text-sm text-gray-800 shadow-inner shadow-amber-400/20 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:border-amber-900/50 dark:bg-slate-950/80 dark:text-gray-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-amber-400">🔎</span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredColleges.map((college) => {
          const followEntity = buildFollowEntity(college)
          const isFollowingCollege = isFollowing(followEntity.id)
          return (
            <article
              key={college.id}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-[26px] border border-amber-100 bg-white/95 p-4 shadow-sm shadow-amber-500/10 transition duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/20 dark:border-amber-900/40 dark:bg-slate-900/90"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-1 items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-lg font-semibold text-amber-600 dark:border-amber-900/60 dark:bg-amber-900/30 dark:text-amber-200">
                      {college.logo ? (
                        <img src={college.logo} alt={college.name} className="h-12 w-12 rounded-2xl object-cover" />
                      ) : (
                        college.name.charAt(0)
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-tight text-gray-900 break-words whitespace-normal dark:text-white sm:text-base">
                        {college.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{college.location}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFollow(followEntity)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                      isFollowingCollege
                        ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                        : 'border-amber-200 bg-white text-amber-600 hover:border-amber-400 hover:bg-amber-50 dark:border-amber-800 dark:bg-slate-900/70 dark:text-amber-200'
                    }`}
                  >
                    {isFollowingCollege ? 'Following' : 'Follow'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-amber-500 dark:text-amber-300">
                  {college.focus.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 shadow-inner dark:border-amber-900/50 dark:bg-amber-900/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelectedCollege({ ...college, followEntity })}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-600 transition hover:border-amber-400 hover:bg-amber-50 dark:border-amber-800 dark:bg-slate-900/70 dark:text-amber-200"
                >
                  View wall
                  <span aria-hidden="true" className="text-amber-400">→</span>
                </button>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Swipe or scroll through cards to discover more campuses.
                </p>
              </div>
              <span className="pointer-events-none absolute inset-0 rounded-[26px] border border-amber-200 opacity-0 transition group-hover:opacity-100 dark:border-amber-500/40"></span>
            </article>
          )
        })}
      </section>

      {filteredColleges.length === 0 && (
        <div className="rounded-[26px] border border-dashed border-amber-200 bg-white/80 p-10 text-center text-sm text-gray-500 shadow-inner dark:border-amber-900/40 dark:bg-slate-900/70 dark:text-gray-400">
          No colleges found. Try a different keyword or explore trending campuses.
        </div>
      )}

      {selectedCollege && (
        <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md border-l border-amber-200/60 bg-white/98 shadow-2xl shadow-amber-500/30 transition-transform duration-200 dark:border-amber-900/40 dark:bg-slate-950/95">
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between border-b border-amber-100 px-5 py-5 dark:border-amber-900/40">
              <div className="space-y-1">
                <h2 className="text-base font-semibold leading-tight text-gray-900 break-words whitespace-normal dark:text-white sm:text-lg">
                  {selectedCollege.name}
                </h2>
                <p className="text-xs uppercase tracking-wide text-amber-500 dark:text-amber-300">Campus wall</p>
              </div>
              <button
                type="button"
                onClick={closeWall}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 transition hover:border-gray-400 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
              {selectedCollege.followEntity && (
                <button
                  type="button"
                  onClick={() => toggleFollow(selectedCollege.followEntity)}
                  className={`w-full rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isFollowing(selectedCollege.followEntity.id)
                      ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                      : 'border-amber-200 bg-white text-amber-600 hover:border-amber-400 hover:bg-amber-50 dark:border-amber-800 dark:bg-slate-900/70 dark:text-amber-200'
                  }`}
                >
                  {isFollowing(selectedCollege.followEntity.id) ? 'Following' : 'Follow this college'}
                </button>
              )}
              {selectedCollege.wallHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-sm text-gray-700 shadow-sm shadow-amber-500/10 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-gray-200"
                >
                  <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-200">{highlight.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-amber-700/80 dark:text-amber-200/80 break-words">{highlight.description}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-dashed border-amber-200/60 bg-white/80 p-4 text-xs text-gray-400 dark:border-amber-900/40 dark:bg-slate-900/60 dark:text-gray-500">
                Campus admins can publish long-form updates, media reels, and pinned notices here.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollegesDirectory
