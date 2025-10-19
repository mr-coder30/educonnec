import React, { useMemo, useState } from 'react'

import Icon from '../../../components/common/Icon'
import { useCollegeRepData } from '../../../context/CollegeRepDataContext'

const filters = ['All', 'Active', 'Pinned', 'Archived']
const tagOptions = ['Notice', 'Event', 'Announcement']
const visibilityOptions = ['Public', 'College only']

const getStatusBadgeClasses = (status) => {
  if (status === 'Active') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
  if (status === 'Archived') return 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'
  return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200'
}

const MyPosts = () => {
  const {
    posts,
    createPost,
    updatePost,
    deletePost,
    togglePostPin
  } = useCollegeRepData()

  const [activeFilter, setActiveFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [formState, setFormState] = useState({
    title: '',
    body: '',
    tag: tagOptions[0],
    visibility: visibilityOptions[0],
    attachments: ''
  })

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return posts
    if (activeFilter === 'Pinned') return posts.filter((post) => post.pinned)
    return posts.filter((post) => post.status === activeFilter)
  }, [activeFilter, posts])

  const resetForm = () => {
    setFormState({
      title: '',
      body: '',
      tag: tagOptions[0],
      visibility: visibilityOptions[0],
      attachments: ''
    })
    setSelectedPost(null)
  }

  const openCreateModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (post) => {
    setSelectedPost(post)
    setFormState({
      title: post.title,
      body: post.body,
      tag: post.tag,
      visibility: post.visibility,
      attachments: (post.attachments || []).join('\n')
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const attachments = formState.attachments
      ? formState.attachments.split('\n').map((line) => line.trim()).filter(Boolean)
      : []

    if (selectedPost) {
      updatePost(selectedPost.id, {
        title: formState.title,
        body: formState.body,
        tag: formState.tag,
        visibility: formState.visibility,
        attachments
      })
    } else {
      createPost({
        title: formState.title,
        body: formState.body,
        tag: formState.tag,
        visibility: formState.visibility,
        attachments
      })
    }

    setIsModalOpen(false)
    resetForm()
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-white/95 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/85 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My posts</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage official notices, announcements, and updates shared with the campus community.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
        >
          <Icon name="plus" className="h-4 w-4" />
          Create post
        </button>
      </header>

      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeFilter === filter
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-white/80 text-slate-500 hover:bg-white dark:bg-slate-900/70 dark:text-slate-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="flex h-full flex-col rounded-[24px] border border-slate-100 bg-white/95 p-5 shadow-lg shadow-slate-200/30 transition hover:-translate-y-1 hover:shadow-emerald-200/40 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{post.tag}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{post.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => togglePostPin(post.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  post.pinned
                    ? 'border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/60'
                }`}
              >
                {post.pinned ? 'Pinned' : 'Pin'}
              </button>
            </div>

            <p className="mt-4 flex-1 text-sm text-slate-600 dark:text-slate-300">{post.body}</p>

            {post.attachments?.length ? (
              <div className="mt-4 space-y-2 text-xs font-semibold text-emerald-600 dark:text-emerald-200">
                {post.attachments.map((attachment) => (
                  <a key={attachment} href={attachment} className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 hover:bg-emerald-100 dark:bg-emerald-900/40">
                    <Icon name="document" className="h-4 w-4" />
                    {attachment.split('/').pop()}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 ${getStatusBadgeClasses(post.status)}`}>{post.status}</span>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><Icon name="like" className="h-4 w-4" />{post.reactions}</span>
                <span className="inline-flex items-center gap-1"><Icon name="comment" className="h-4 w-4" />{post.comments}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => openEditModal(post)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
              >
                <Icon name="edit" className="h-4 w-4" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => deletePost(post.id)}
                className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-rose-700 transition hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
              >
                <Icon name="modalClose" className="h-4 w-4" />
                Delete
              </button>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Icon name="arrowRight" className="h-4 w-4" />
                View
              </button>
            </div>
          </article>
        ))}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedPost ? 'Edit post' : 'Create post'}</h3>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon name="modalClose" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Title</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Body</label>
                <textarea
                  required
                  rows={4}
                  value={formState.body}
                  onChange={(event) => setFormState((prev) => ({ ...prev, body: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tag</label>
                  <select
                    value={formState.tag}
                    onChange={(event) => setFormState((prev) => ({ ...prev, tag: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {tagOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Visibility</label>
                  <select
                    value={formState.visibility}
                    onChange={(event) => setFormState((prev) => ({ ...prev, visibility: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {visibilityOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Attachments (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formState.attachments}
                  onChange={(event) => setFormState((prev) => ({ ...prev, attachments: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">Provide URLs for images, PDFs, or other resources.</p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
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
                  {selectedPost ? 'Save changes' : 'Publish post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPosts
