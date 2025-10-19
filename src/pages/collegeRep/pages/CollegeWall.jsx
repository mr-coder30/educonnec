import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const reactionPresets = [
  { key: 'celebrate', label: 'Celebrate', icon: 'sparkles' },
  { key: 'curious', label: 'Curious', icon: 'idea' },
  { key: 'support', label: 'Support', icon: 'heart' }
]

const CollegeWall = () => {
  const {
    wall,
    createWallPost,
    addWallComment,
    reactToWallPost
  } = useCollegeRepData()

  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [composerState, setComposerState] = useState({
    title: '',
    body: '',
    attachments: ''
  })
  const [commentDrafts, setCommentDrafts] = useState({})

  const sortedWall = useMemo(() => [...wall].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [wall])

  const handleComposerSubmit = (event) => {
    event.preventDefault()
    if (!composerState.title || !composerState.body) return
    const attachments = composerState.attachments
      ? composerState.attachments.split('\n').map((line) => line.trim()).filter(Boolean)
      : []
    createWallPost({
      title: composerState.title,
      body: composerState.body,
      attachments
    })
    setComposerState({ title: '', body: '', attachments: '' })
    setIsComposerOpen(false)
  }

  const handleCommentSubmit = (postId) => {
    const draft = commentDrafts[postId]?.trim()
    if (!draft) return
    addWallComment(postId, draft)
    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }))
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/85 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">College wall</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Share updates, respond to students, and stay connected with campus conversations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsComposerOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
        >
          <Icon name="plus" className="h-4 w-4" />
          Create notice
        </button>
      </header>

      <section className="space-y-5">
        {sortedWall.map((post) => (
          <article
            key={post.id}
            className="rounded-[24px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{post.role}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{post.title}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{post.author} • {new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsComposerOpen(true)}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Reply as notice
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{post.body}</p>

            {post.attachments?.length ? (
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-emerald-600 dark:text-emerald-200">
                {post.attachments.map((attachment) => (
                  <a key={attachment} href={attachment} className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 hover:bg-emerald-100 dark:bg-emerald-900/40">
                    <Icon name="document" className="h-4 w-4" />
                    {attachment.split('/').pop()}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {reactionPresets.map((reaction) => (
                <button
                  key={reaction.key}
                  type="button"
                  onClick={() => reactToWallPost(post.id, reaction.key)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <Icon name={reaction.icon} className="h-4 w-4" />
                  {reaction.label}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {post.reactions[reaction.key] || 0}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                  <p className="font-semibold text-slate-900 dark:text-white">{comment.author}</p>
                  <p className="mt-2 whitespace-pre-wrap">{comment.message}</p>
                  <p className="mt-2 text-xs text-slate-400">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/70">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Reply</label>
              <textarea
                rows={3}
                value={commentDrafts[post.id] ?? ''}
                onChange={(event) => setCommentDrafts((prev) => ({ ...prev, [post.id]: event.target.value }))}
                placeholder="Share an update or answer a question"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <div className="mt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCommentDrafts((prev) => ({ ...prev, [post.id]: '' }))}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleCommentSubmit(post.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md"
                >
                  <Icon name="send" className="h-4 w-4" />
                  Post comment
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Create notice</h3>
              <button
                type="button"
                onClick={() => {
                  setIsComposerOpen(false)
                  setComposerState({ title: '', body: '', attachments: '' })
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
            <form onSubmit={handleComposerSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Title</label>
                <input
                  type="text"
                  required
                  value={composerState.title}
                  onChange={(event) => setComposerState((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Body</label>
                <textarea
                  required
                  rows={4}
                  value={composerState.body}
                  onChange={(event) => setComposerState((prev) => ({ ...prev, body: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Attachments (one per line)</label>
                <textarea
                  rows={3}
                  value={composerState.attachments}
                  onChange={(event) => setComposerState((prev) => ({ ...prev, attachments: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">Share image, PDF, or resource links.</p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsComposerOpen(false)
                    setComposerState({ title: '', body: '', attachments: '' })
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
                >
                  <Icon name="plus" className="h-4 w-4" />
                  Publish notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollegeWall
