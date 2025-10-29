import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeAdminData } from '../../../context/AdminDataContext'

const reactionOptions = [
  { key: 'likes', label: 'Applaud', icon: 'like' },
  { key: 'celebrates', label: 'Celebrate', icon: 'sparkles' },
  { key: 'curious', label: 'Curious', icon: 'idea' }
]

const emptyForm = {
  title: '',
  description: '',
  image: '',
  createdBy: ''
}

const CollegeAdminWall = () => {
  const {
    wallPosts,
    profile,
    createWallPost,
    deleteWallPost,
    toggleWallReaction,
    addWallComment,
    toggleWallPin,
    editWallPost
  } = useCollegeAdminData()

  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [commentDrafts, setCommentDrafts] = useState({})
  const [editingPost, setEditingPost] = useState(null)

  const stats = useMemo(() => {
    const totalReactions = wallPosts.reduce((sum, post) => sum + Object.values(post.reactions).reduce((acc, value) => acc + value, 0), 0)
    const totalComments = wallPosts.reduce((sum, post) => sum + post.comments.length, 0)
    const pinnedCount = wallPosts.filter((post) => post.pinned).length
    return {
      totalPosts: wallPosts.length,
      totalReactions,
      totalComments,
      pinnedCount
    }
  }, [wallPosts])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingPost(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setSubmitting(true)
    try {
      if (editingPost) {
        editWallPost(editingPost.id, {
          title: form.title.trim(),
          description: form.description.trim(),
          image: form.image?.trim() || null
        })
      } else {
        createWallPost({
          title: form.title.trim(),
          description: form.description.trim(),
          image: form.image?.trim() || null,
          createdBy: form.createdBy.trim() || profile.adminName
        })
      }
      resetForm()
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setForm({
      title: post.title,
      description: post.description,
      image: post.image ?? '',
      createdBy: post.createdBy ?? profile.adminName
    })
  }

  const handleCommentChange = (postId, value) => {
    setCommentDrafts((previous) => ({ ...previous, [postId]: value }))
  }

  const handleCommentSubmit = (event, postId) => {
    event.preventDefault()
    const message = commentDrafts[postId]?.trim()
    if (!message) return
    addWallComment(postId, message)
    setCommentDrafts((previous) => ({ ...previous, [postId]: '' }))
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_28px_60px_-38px_rgba(59,130,246,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white/40 to-purple-100/60 dark:from-slate-950/60 dark:via-slate-950/30 dark:to-slate-900/60" aria-hidden="true"></div>
          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">Create notice</p>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Share what\'s new with campus</h2>
              </div>
              {editingPost && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-blue-200/70 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-white dark:border-blue-500/40 dark:bg-transparent dark:text-blue-200"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Title *</span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Innovation week kickoff"
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Creator</span>
                <input
                  type="text"
                  name="createdBy"
                  value={form.createdBy}
                  onChange={handleInputChange}
                  placeholder={profile.adminName}
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
              <label className="sm:col-span-2 space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Description *</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Include agenda, timeline, or links students should know."
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                ></textarea>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Cover image URL</span>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                disabled={submitting}
                className="rounded-2xl border border-blue-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-blue-500/40 dark:bg-transparent dark:text-blue-200"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Icon name={editingPost ? 'edit' : 'plus'} className="h-4 w-4" />
                {editingPost ? 'Update notice' : 'Publish notice'}
              </button>
            </div>
          </div>
        </form>

        <aside className="rounded-[32px] border border-blue-100/70 bg-white/85 p-6 shadow-[0_28px_60px_-38px_rgba(129,140,248,0.55)] backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/80">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">Wall health</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Community pulse</h3>
          <ul className="mt-5 space-y-3">
            {[{
              label: 'Published notices',
              value: stats.totalPosts,
              icon: 'posts'
            }, {
              label: 'Total reactions',
              value: stats.totalReactions,
              icon: 'sparkles'
            }, {
              label: 'Comments gathered',
              value: stats.totalComments,
              icon: 'comment'
            }, {
              label: 'Pinned updates',
              value: stats.pinnedCount,
              icon: 'bookmark'
            }].map((item) => (
              <li key={item.label} className="flex items-center justify-between rounded-2xl border border-blue-100/50 bg-white/75 px-4 py-3 text-sm shadow-inner shadow-blue-500/15 dark:border-slate-800/50 dark:bg-slate-900/70">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <p className="font-semibold text-slate-600 dark:text-slate-300">{item.label}</p>
                </div>
                <span className="text-base font-semibold text-slate-900 dark:text-white">{item.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="space-y-6">
        {wallPosts.length === 0 ? (
          <div className="rounded-[32px] border border-blue-100/70 bg-white/85 p-10 text-center text-slate-500 shadow-[0_25px_60px_-40px_rgba(59,130,246,0.5)] dark:border-slate-800/70 dark:bg-slate-900/80 dark:text-slate-300">
            <p>No notices published yet. Start by sharing your next campus highlight.</p>
          </div>
        ) : (
          wallPosts.map((post) => (
            <article
              key={post.id}
              className="relative overflow-hidden rounded-[32px] border border-blue-100/70 bg-white/90 p-6 shadow-[0_30px_70px_-40px_rgba(59,130,246,0.45)] backdrop-blur-sm transition hover:border-blue-200 dark:border-slate-800/70 dark:bg-slate-900/80"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-50/40 dark:from-slate-950/40 dark:via-transparent dark:to-slate-900/40" aria-hidden="true"></div>
              <div className="relative z-10 space-y-5">
                <header className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 dark:text-blue-300">
                      <span>{post.createdBy ?? profile.adminName}</span>
                      <span className="text-blue-200 dark:text-blue-700">•</span>
                      <time dateTime={post.createdAt} className="text-[11px] normal-case text-slate-400 dark:text-slate-500">
                        {new Date(post.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </time>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{post.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {post.description}
                    </p>
                    {post.image && (
                      <div className="mt-4 overflow-hidden rounded-3xl border border-blue-100/70 shadow-inner shadow-blue-500/20 dark:border-slate-800/70">
                        <img src={post.image} alt={post.title} className="h-64 w-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    {post.pinned && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-700/40 dark:bg-amber-900/30 dark:text-amber-200">
                        <Icon name="bookmark" className="h-4 w-4" />Pinned
                      </span>
                    )}
                    <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => toggleWallPin(post.id)}
                        className="rounded-2xl border border-blue-200/70 px-3 py-1 text-blue-600 transition hover:border-blue-300 hover:bg-white dark:border-blue-500/40 dark:text-blue-200"
                      >
                        {post.pinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(post)}
                        className="rounded-2xl border border-purple-200/70 px-3 py-1 text-purple-600 transition hover:border-purple-300 hover:bg-white dark:border-purple-600/40 dark:text-purple-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteWallPost(post.id)}
                        className="rounded-2xl border border-slate-200/70 px-3 py-1 text-slate-500 transition hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:text-slate-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </header>

                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 text-sm shadow-inner shadow-blue-500/20 dark:border-slate-800/70 dark:bg-slate-900/70">
                  {reactionOptions.map((reaction) => (
                    <button
                      key={reaction.key}
                      type="button"
                      onClick={() => toggleWallReaction(post.id, reaction.key)}
                      className="flex items-center gap-2 rounded-2xl border border-transparent px-3 py-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50/60 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-900/30"
                    >
                      <Icon name={reaction.icon} className="h-4 w-4 text-blue-500" />
                      <span>{reaction.label}</span>
                      <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-200">
                        {post.reactions[reaction.key]}
                      </span>
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                      <Icon name="sparkles" className="h-4 w-4" />
                      {Object.values(post.reactions).reduce((sum, value) => sum + value, 0)} reactions
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="comment" className="h-4 w-4" />
                      {post.comments.length} comments
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="saved" className="h-4 w-4" />
                      {post.analytics?.saves ?? 0} saves
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <form onSubmit={(event) => handleCommentSubmit(event, post.id)} className="flex items-center gap-3 rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-3 shadow-inner shadow-blue-500/20 dark:border-slate-800/70 dark:bg-slate-900/70">
                    <input
                      type="text"
                      value={commentDrafts[post.id] ?? ''}
                      onChange={(event) => handleCommentChange(post.id, event.target.value)}
                      placeholder="Share a quick update or answer a question"
                      className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/30"
                    >
                      <Icon name="send" className="h-4 w-4" />
                      Post
                    </button>
                  </form>

                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="rounded-2xl border border-blue-100/50 bg-white/80 px-4 py-3 text-sm shadow-inner shadow-blue-500/10 dark:border-slate-800/60 dark:bg-slate-900/70">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 dark:text-blue-300">
                          <span>{comment.author}</span>
                          <span className="text-blue-200 dark:text-blue-700">•</span>
                          <span className="text-[10px] normal-case text-slate-400 dark:text-slate-500">{comment.role}</span>
                          <span className="text-blue-200 dark:text-blue-700">•</span>
                          <time dateTime={comment.postedAt} className="text-[10px] normal-case text-slate-400 dark:text-slate-500">
                            {new Date(comment.postedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                          </time>
                        </div>
                        <p className="mt-2 text-slate-600 dark:text-slate-200">{comment.message}</p>
                      </div>
                    ))}
                    {post.comments.length === 0 && (
                      <p className="rounded-2xl border border-blue-100/50 bg-white/60 px-4 py-3 text-xs text-slate-500 shadow-inner shadow-blue-500/10 dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-300">
                        No comments yet. Start the conversation by posting an update.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  )
}

export default CollegeAdminWall
