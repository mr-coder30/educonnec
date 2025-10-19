import React, { useMemo, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const wallNotices = [
  {
    id: 'notice-1',
    college: 'IIT Bombay',
    logo: '/logos/iitb.png',
    title: 'Makerspace extended hours',
    description: 'Prototype sprint teams can access the makerspace till 2 AM throughout the Techfest build cycle. Swipe in using your campus ID.',
    media: '/wall/makerspace.jpg',
    postedAt: '2h ago',
    reactions: { like: 24, heart: 12 },
    comments: [
      { id: 'comment-1', author: 'Anika (EEE)', message: 'Perfect timing! We needed late access for our robotics rig.', postedAt: '1h ago' }
    ]
  },
  {
    id: 'notice-2',
    college: 'IIT Bombay',
    logo: '/logos/iitb.png',
    title: 'Guest lecture: Sustainable AI systems',
    description: 'Join Dr. Meera Kapoor this Friday for a deep dive into energy-aware model design and responsible deployment strategies.',
    media: null,
    postedAt: '6h ago',
    reactions: { like: 45, heart: 19 },
    comments: [
      { id: 'comment-2', author: 'Raj (CSE)', message: 'Will slides be shared afterwards?', postedAt: '4h ago' },
      { id: 'comment-3', author: 'Faculty Desk', message: 'Yes! Slides and recording will be posted on the wall.', postedAt: '3h ago' }
    ]
  }
]

const CollegesWall = () => {
  const { user } = useAuth()
  const isAdmin = useMemo(() => user?.role === 'college_admin', [user])
  const [feed] = useState(wallNotices)
  const [expandedComments, setExpandedComments] = useState(() => new Set())
  const [reactionState, setReactionState] = useState(() =>
    wallNotices.reduce((acc, notice) => {
      acc[notice.id] = { like: false, heart: false }
      return acc
    }, {})
  )

  const toggleComments = (noticeId) => {
    setExpandedComments(prev => {
      const next = new Set(prev)
      if (next.has(noticeId)) next.delete(noticeId)
      else next.add(noticeId)
      return next
    })
  }

  const toggleReaction = (noticeId, type) => {
    setReactionState(prev => ({
      ...prev,
      [noticeId]: {
        ...prev[noticeId],
        [type]: !prev[noticeId][type]
      }
    }))
  }

  return (
    <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 sm:px-6 lg:px-8">
      <header className="rounded-[28px] border border-sky-200/70 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">Campus voices</p>
            <h1 className="text-3xl font-bold">My college wall</h1>
            <p className="text-sm text-white/85 sm:max-w-xl">
              Scroll through live announcements, celebrate wins, and collaborate via campus shoutouts.
            </p>
          </div>
          {isAdmin && (
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-white/25"
            >
              ✏️ Create notice
            </button>
          )}
        </div>
      </header>

      {isAdmin && (
        <button
          type="button"
          className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-2xl shadow-blue-500/40 transition hover:scale-105 sm:hidden"
        >
          ✏️
        </button>
      )}

      <section className="space-y-4">
        {feed.map((notice) => {
          const reactions = reactionState[notice.id]
          const commentsOpen = expandedComments.has(notice.id)
          return (
            <article
              key={notice.id}
              className="rounded-[28px] border border-sky-100 bg-white/95 p-5 shadow-sm shadow-sky-500/10 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-lg font-semibold text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300">
                    {notice.logo ? <img src={notice.logo} alt={notice.college} className="h-12 w-12 rounded-2xl object-cover" /> : notice.college.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{notice.college}</h3>
                    <p className="truncate text-xs uppercase tracking-wide text-sky-500 dark:text-sky-300">{notice.postedAt}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-600 transition hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:text-sky-200 dark:hover:bg-slate-800"
                >
                  Save
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{notice.title}</h4>
                <p className="break-words text-sm leading-relaxed text-gray-600 dark:text-gray-300">{notice.description}</p>
                {notice.media && (
                  <div className="overflow-hidden rounded-3xl border border-sky-100 shadow-inner shadow-sky-500/10 dark:border-slate-700">
                    <img src={notice.media} alt={notice.title} className="h-48 w-full object-cover sm:h-64" />
                  </div>
                )}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-sky-100 pt-4 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:border-slate-800 dark:text-gray-500">
                <button
                  type="button"
                  onClick={() => toggleReaction(notice.id, 'like')}
                  className={`flex items-center gap-1 rounded-full border px-3 py-1 transition ${
                    reactions.like
                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:border-blue-400 dark:text-blue-300'
                      : 'border-sky-100 text-gray-500 hover:border-blue-300 hover:text-blue-500 dark:border-slate-700'
                  }`}
                >
                  👍 {notice.reactions.like + (reactions.like ? 1 : 0)}
                </button>
                <button
                  type="button"
                  onClick={() => toggleReaction(notice.id, 'heart')}
                  className={`flex items-center gap-1 rounded-full border px-3 py-1 transition ${
                    reactions.heart
                      ? 'border-rose-500 bg-rose-500/10 text-rose-500 dark:border-rose-400 dark:text-rose-300'
                      : 'border-sky-100 text-gray-500 hover:border-rose-300 hover:text-rose-500 dark:border-slate-700'
                  }`}
                >
                  ❤️ {notice.reactions.heart + (reactions.heart ? 1 : 0)}
                </button>
                <button
                  type="button"
                  onClick={() => toggleComments(notice.id)}
                  className="ml-auto flex items-center gap-1 rounded-full border border-sky-100 px-3 py-1 text-gray-500 transition hover:border-sky-300 hover:text-sky-500 dark:border-slate-700 dark:text-gray-400"
                >
                  💬 {notice.comments.length} comments
                </button>
              </div>
              {commentsOpen && (
                <div className="mt-4 space-y-3 rounded-3xl border border-sky-100 bg-sky-50/60 p-4 text-sm text-gray-600 shadow-inner dark:border-slate-800 dark:bg-slate-900/70 dark:text-gray-300">
                  {notice.comments.map((comment) => (
                    <div key={comment.id} className="rounded-2xl border border-sky-100/60 bg-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-sky-500 dark:text-sky-300">
                        <span>{comment.author}</span>
                        <span className="text-gray-400 dark:text-gray-500">{comment.postedAt}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{comment.message}</p>
                    </div>
                  ))}
                  <form className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment (mock)"
                      className="flex-1 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200"
                    />
                    <button
                      type="button"
                      className="rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}

export default CollegesWall
