import React, { useMemo, useState } from 'react'

import Icon from './Icon'
import { useDashboardData } from '../../context/DashboardDataContext'

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { isFollowing, toggleFollow } = useDashboardData()
  const isCollegePost = post.author?.role?.toLowerCase() === 'college'

  const followEntity = useMemo(() => {
    if (!isCollegePost) return null
    const baseId = post.author?.id ?? post.college ?? post.author?.name
    if (!baseId) return null
    const slug = String(baseId).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return {
      id: `college-${slug}`,
      name: post.author?.name ?? post.college ?? 'College',
      descriptor: post.college ?? '',
      badge: 'College',
      icon: 'organization',
      type: 'college',
      meta: {
        postId: post.id,
        category: post.category ?? ''
      }
    }
  }, [isCollegePost, post])

  const isFollowingCollege = followEntity ? isFollowing(followEntity.id) : false

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/90 p-4 shadow-lg shadow-blue-500/10 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-[32px] sm:p-6 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/40">
      <div className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-purple-200/30 blur-2xl" aria-hidden="true"></div>

      {/* Header */}
      <header className="relative mb-4 flex flex-col items-start gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="rounded-2xl border border-blue-100 p-1 shadow-inner shadow-blue-500/20 sm:p-1.5 dark:border-slate-700">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-9 w-9 rounded-xl sm:h-10 sm:w-10"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
              {post.author.name}
            </h3>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {post.author.role} • {post.timeAgo}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3 sm:ml-auto">
          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            {post.category}
          </span>
          {isCollegePost && followEntity && (
            <button
              type="button"
              onClick={() => toggleFollow(followEntity)}
              className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                isFollowingCollege
                  ? 'border-green-400 bg-green-100/80 text-green-700 shadow-inner shadow-green-400/20 dark:border-green-500 dark:bg-green-900/30 dark:text-green-200'
                  : 'border-blue-100 bg-white/80 text-blue-600 shadow-sm hover:border-blue-300 hover:bg-blue-100/60 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200'
              }`}
            >
              <span>{isFollowingCollege ? '✓ Following' : '+ Follow'}</span>
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="relative mb-4 flex-1 space-y-4 sm:mb-5">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
            {post.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {post.description}
          </p>
        </div>

        {post.image && (
          <div className="overflow-hidden rounded-[18px] border border-blue-100/60 bg-blue-50/40 shadow-inner shadow-blue-500/10 sm:rounded-[20px] dark:border-slate-700 dark:bg-slate-900/60">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-3 rounded-2xl border border-blue-100/60 bg-blue-50/40 p-3 text-xs text-gray-600 shadow-inner shadow-blue-500/10 sm:p-4 sm:text-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-gray-300">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {post.college && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/60 px-3 py-1 text-[11px] font-medium text-blue-600 sm:text-xs dark:bg-slate-900/70 dark:text-blue-200">
                <Icon name="organization" className="h-4 w-4" />
                {post.college}
              </span>
            )}
            {post.organizer && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/60 px-3 py-1 text-[11px] font-medium text-blue-600 sm:text-xs dark:bg-slate-900/70 dark:text-blue-200">
                <Icon name="organizer" className="h-4 w-4" />
                {post.organizer}
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/60 px-3 py-1 text-[11px] font-medium text-blue-600 sm:text-xs dark:bg-slate-900/70 dark:text-blue-200">
              <Icon name="duration" className="h-4 w-4" />
              {post.duration}
            </span>
            {post.website && (
              <a
                href={post.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/60 px-3 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 sm:text-xs dark:bg-slate-900/70 dark:text-blue-300"
              >
                <Icon name="globe" className="h-4 w-4" />
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <footer className="relative mt-auto flex flex-col gap-3 border-t border-blue-100/60 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition ${
              isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Icon name={isLiked ? 'likeSolid' : 'like'} className={`h-4 w-4 ${isLiked ? '' : 'text-current'}`} />
            <span>{post.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Icon name="comment" className="h-4 w-4" />
            <span>{post.comments}</span>
          </button>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Icon name="share" className="h-4 w-4" />
            <span>{post.shares}</span>
          </button>
        </div>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-sm font-semibold transition sm:self-auto ${
            isSaved
              ? 'border-yellow-400 bg-yellow-100/80 text-yellow-600 shadow-inner shadow-yellow-400/20 dark:border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-200'
              : 'border-blue-100 bg-white/80 text-blue-600 shadow-sm hover:border-blue-300 hover:bg-blue-100/60 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200'
          }`}
        >
          <Icon name={isSaved ? 'badge' : 'save'} className="h-4 w-4" />
          Save
        </button>
      </footer>
    </article>
  )
}

export default PostCard